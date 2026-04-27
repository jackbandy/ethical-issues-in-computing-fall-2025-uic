// CTA line colors assigned to groups 1–8
const CTA_COLORS = [
  '#c60c30', // 1 Red
  '#00a1de', // 2 Blue
  '#62361b', // 3 Brown
  '#009b3a', // 4 Green
  '#f47920', // 5 Orange (shifted from red-orange toward true orange)
  '#e27ea6', // 6 Pink
  '#522398', // 7 Purple
  '#f9e300', // 8 Yellow
];

// Table background colors — readable with white text; vivid where possible.
const CTA_TABLE_COLORS = [
  '#c60c30', // 1 Red
  '#00a1de', // 2 Blue
  '#62361b', // 3 Brown
  '#009b3a', // 4 Green
  '#e06000', // 5 Orange (dark enough for white text, clearly orange not red)
  '#e27ea6', // 6 Pink
  '#522398', // 7 Purple
  '#c09000', // 8 Yellow (golden yellow, not brown)
];

// Grid positions (row, col) for tables in DOM order: t1…t8
const TABLE_GRID = [
  {row:0, col:1}, {row:0, col:2},
  {row:1, col:0}, {row:1, col:1}, {row:1, col:2},
  {row:2, col:0}, {row:2, col:1}, {row:2, col:2},
];

// Base assignment: each row is a set of 4 distinct groups for one table.
// Every group 1–8 appears in exactly 4 of the 8 rows.
const BASE = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [1, 2, 5, 6],
  [3, 4, 7, 8],
  [1, 3, 5, 7],
  [2, 4, 6, 8],
  [1, 4, 6, 7],
  [2, 3, 5, 8],
];

// Last computed assignment; used by drawLines so it doesn't rely on live DOM text.
let currentAssignment = null;

// Incremented on each shuffle to cancel in-flight animations from prior shuffles.
let shuffleToken = 0;

// Seats remaining before animation is fully complete (used for status indicator).
let pendingSeats = 0;

// Timeout ID for auto-clearing the ✅ status after 5 s.
let statusClearTimeout = null;

// ── Status helpers ────────────────────────────────────────────────────────────

function setStatusDone() {
  if (statusClearTimeout) { clearTimeout(statusClearTimeout); statusClearTimeout = null; }
  const el = document.getElementById('shuffle-status');
  el.className = 'status-done';
  statusClearTimeout = setTimeout(() => {
    el.className = '';
    statusClearTimeout = null;
  }, 5000);
}

// Remove SVG paths and reset table backgrounds; also clears the status indicator.
function clearLines() {
  const svg = document.getElementById('lines-svg');
  if (svg) svg.remove();
  document.querySelectorAll('.table').forEach(t => { t.style.background = ''; });
  if (statusClearTimeout) { clearTimeout(statusClearTimeout); statusClearTimeout = null; }
  document.getElementById('shuffle-status').className = '';
}

// ── PRNG ──────────────────────────────────────────────────────────────────────

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function fisherYates(arr, rand) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// ── Constrained assignment ────────────────────────────────────────────────────
// Guarantees every table has 4 seats assigned to 4 *different* groups.
// Same seed always produces the same result.

function generateAssignment(seed) {
  const rand = mulberry32(seed);

  // 1. Permute group labels: relabel groups 1–8 with a random bijection
  const groupPerm = [1, 2, 3, 4, 5, 6, 7, 8];
  fisherYates(groupPerm, rand);

  // 2. Permute which BASE row each physical table uses
  const tableOrder = [0, 1, 2, 3, 4, 5, 6, 7];
  fisherYates(tableOrder, rand);

  // 3. For each physical table, apply the group relabeling and shuffle seat order
  const result = [];
  for (let ti = 0; ti < 8; ti++) {
    const seats = BASE[tableOrder[ti]].map(g => groupPerm[g - 1]);
    fisherYates(seats, rand);
    result.push(...seats);
  }

  repairStationary(result);
  return result; // 32 values, no stationarys, constraint guaranteed
}

// Remove any "stationary" seats (where assigned group === home table number).
// Deterministic: iterates ti 0→7, tj 0→7, picks the first valid swap.
// Same seed always produces the same repaired output.
function repairStationary(assignment) {
  for (let ti = 0; ti < 8; ti++) {
    const homeGroup = ti + 1;
    for (let si = 0; si < 4; si++) {
      if (assignment[ti * 4 + si] !== homeGroup) continue;
      let fixed = false;
      for (let tj = 0; tj < 8 && !fixed; tj++) {
        if (tj === ti) continue;
        for (let sj = 0; sj < 4 && !fixed; sj++) {
          const gj = assignment[tj * 4 + sj];
          if (gj === homeGroup) continue; // ti would still be stationary
          // Ensure both tables keep 4 distinct groups after the swap
          const tiNew = assignment.slice(ti * 4, ti * 4 + 4).map((g, k) => k === si ? gj : g);
          const tjNew = assignment.slice(tj * 4, tj * 4 + 4).map((g, k) => k === sj ? homeGroup : g);
          if (new Set(tiNew).size < 4) continue;
          if (new Set(tjNew).size < 4) continue;
          // Valid swap — gj into ti, homeGroup into tj (homeGroup ≠ tj+1 since ti ≠ tj)
          assignment[ti * 4 + si] = gj;
          assignment[tj * 4 + sj] = homeGroup;
          fixed = true;
        }
      }
    }
  }
}

// ── DOM helpers ───────────────────────────────────────────────────────────────

function centerOf(el, ref) {
  const r = el.getBoundingClientRect();
  return {
    x:      r.left - ref.left + r.width  / 2,
    y:      r.top  - ref.top  + r.height / 2,
    top:    r.top    - ref.top,
    bottom: r.bottom - ref.top,
  };
}

// ── Seat spinner animation ────────────────────────────────────────────────────
// Each seat gets its own random spin + deceleration duration (2–4.5 s total).
// token: invalidated if the user clicks Shuffle again before this seat finishes.
// onDone: called once the seat has settled on its final value.

function animateSeat(seatEl, finalValue, token, onDone) {
  const totalMs = 2000 + Math.random() * 2500; // 2.0 – 4.5 s per seat
  const spinMs  = totalMs * (0.30 + Math.random() * 0.15); // 30–45 % spinning

  seatEl.style.color = 'rgba(255,255,255,0.30)';

  const spinInterval = setInterval(() => {
    if (shuffleToken !== token) { clearInterval(spinInterval); return; }
    seatEl.textContent = Math.floor(Math.random() * 8) + 1;
  }, 70);

  setTimeout(() => {
    clearInterval(spinInterval);
    if (shuffleToken !== token) return;

    // Build a deceleration schedule over the remaining time.
    // t² spacing: gaps START small and GROW → updates slow down naturally.
    const decelMs  = totalMs - spinMs;
    const numSteps = 9;
    const schedule = Array.from({length: numSteps + 1}, (_, i) => {
      const t = i / numSteps;
      return Math.round(decelMs * t * t);
    });

    schedule.forEach((delay, i) => {
      setTimeout(() => {
        if (shuffleToken !== token) return;
        if (i === schedule.length - 1) {
          seatEl.textContent = finalValue;
          seatEl.style.color = ''; // restore full-white
          onDone();
        } else {
          seatEl.textContent = Math.floor(Math.random() * 8) + 1;
        }
      }, delay);
    });
  }, spinMs);
}

// ── Draw paths ────────────────────────────────────────────────────────────────

function drawLines() {
  const existing = document.getElementById('lines-svg');
  if (existing) existing.remove();
  if (!currentAssignment) return;

  if (statusClearTimeout) { clearTimeout(statusClearTimeout); statusClearTimeout = null; }
  document.getElementById('shuffle-status').className = 'status-loading';

  const tables = Array.from(document.querySelectorAll('.table'));
  tables.forEach((t, ti) => { t.style.background = CTA_TABLE_COLORS[ti]; });

  const room     = document.querySelector('.room');
  const roomRect = room.getBoundingClientRect();

  // Full rect for each table (room-relative)
  const tRects = tables.map(t => {
    const r    = t.getBoundingClientRect();
    const left = r.left - roomRect.left, right  = r.right  - roomRect.left;
    const top  = r.top  - roomRect.top,  bottom = r.bottom - roomRect.top;
    return { left, right, top, bottom, midX: (left+right)/2, midY: (top+bottom)/2 };
  });

  // Individual seat centers (room-relative)
  const allSeats = tables.map(t => Array.from(t.querySelectorAll('.seat')));
  const seatCenters = tables.map((_, ti) =>
    allSeats[ti].map(s => {
      const r = s.getBoundingClientRect();
      return [r.left - roomRect.left + r.width/2, r.top - roomRect.top + r.height/2];
    })
  );

  // Vertical aisle x-positions (col0 = ti 2,5 | col1 = ti 0,3,6 | col2 = ti 1,4,7)
  const aisleX_L  = tRects[2].left  - 30;
  const aisleX_01 = (tRects[2].right  + tRects[0].left)  / 2;
  const aisleX_12 = (tRects[0].right  + tRects[1].left)  / 2;
  const aisleX_R  = tRects[1].right  + 30;

  // Horizontal aisle y-positions
  const aisleY_01 = (Math.max(tRects[0].bottom, tRects[1].bottom) +
                     Math.min(tRects[2].top, tRects[3].top, tRects[4].top)) / 2;
  const aisleY_12 = (Math.max(tRects[2].bottom, tRects[3].bottom, tRects[4].bottom) +
                     Math.min(tRects[5].top, tRects[6].top, tRects[7].top)) / 2;

  // Virtual aisle above row 0 — approach lane for row-0 destinations
  const aisleY_top = Math.min(tRects[0].top, tRects[1].top) - 30;

  const aisles = { aisleX_L, aisleX_01, aisleX_12, aisleX_R, aisleY_01, aisleY_12, aisleY_top };

  // HSEP: horizontal spread for multiple routes entering the same destination top
  const HSEP = 14;

  // Pass 1: collect raw route metadata
  const rawRoutes = [];
  for (let ti = 0; ti < 8; ti++) {
    const { col } = TABLE_GRID[ti];
    for (let si = 0; si < 4; si++) {
      const group    = currentAssignment[ti * 4 + si];
      if (ti === group - 1) continue; // stationarys removed by repairStationary
      const dti      = group - 1;
      const exitLeft = (si % 2 === 0);
      const exitY    = seatCenters[ti][si][1]; // seat y-center
      const vAisle   = exitLeft ? leftOf(col, aisles) : rightOf(col, aisles);
      rawRoutes.push({ ti, si, group, dti, exitY, exitLeft, vAisle });
    }
  }

  // Spread exitY for routes sharing the same V-aisle at the same natural y-level,
  // so no two horizontal exit segments ever overlap.
  const VSEP = 7;
  const byVAisleY = {};
  rawRoutes.forEach((r, ri) => {
    const key = `${r.vAisle.toFixed(1)}_${r.exitY.toFixed(1)}`;
    if (!byVAisleY[key]) byVAisleY[key] = [];
    byVAisleY[key].push(ri);
  });
  Object.values(byVAisleY).forEach(grp => {
    if (grp.length < 2) return;
    grp.sort((a, b) => rawRoutes[a].group - rawRoutes[b].group);
    grp.forEach((ri, i) => { rawRoutes[ri].exitY += (i - (grp.length - 1) / 2) * VSEP; });
  });

  // Pass 2: spread entry x-positions horizontally at each destination's top edge
  const byDest = Array.from({ length: 8 }, () => []);
  rawRoutes.forEach((r, ri) => byDest[r.dti].push({ ri, group: r.group }));
  const entryXArr = rawRoutes.map(r => tRects[r.dti].midX);
  byDest.forEach((arr) => {
    if (arr.length < 2) return;
    arr.sort((a, b) => a.group - b.group);
    arr.forEach((item, i) => {
      entryXArr[item.ri] = tRects[rawRoutes[item.ri].dti].midX + (i - (arr.length - 1) / 2) * HSEP;
    });
  });

  // Pass 3: build full routes — dot on outer table edge, first segment horizontal
  const routes = rawRoutes.map(({ ti, si, group, dti, exitY, exitLeft }, ri) => {
    const entryX = entryXArr[ri];
    const pts    = computeRoute(ti, dti, tRects, aisles, exitY, entryX, exitLeft);
    return { ti, si, group, dti, pts };
  });

  // Offset lines sharing an aisle so they run as adjacent parallel tracks
  applyParallelOffsets(routes, aisles);

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.id = 'lines-svg';
  Object.assign(svg.style, {
    position: 'absolute', top: '0', left: '0',
    width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible',
  });
  room.appendChild(svg);

  // Collect SVG elements grouped by layer
  const outlineElems = [];
  const lineElems    = [];
  const ringElems    = []; // white halos behind origin dots
  const dotElems     = []; // colored origin dots
  const pillElems    = []; // destination pills

  routes.forEach(({ group, pts }) => {
    const color     = CTA_COLORS[group - 1];
    const pointsStr = pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

    const outline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    outline.setAttribute('points', pointsStr);
    outline.setAttribute('stroke', 'white');
    outline.setAttribute('stroke-width', '8');
    outline.setAttribute('fill', 'none');
    outline.setAttribute('stroke-linecap', 'round');
    outline.setAttribute('stroke-linejoin', 'round');
    outlineElems.push(outline);

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    line.setAttribute('points', pointsStr);
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width', '4.5');
    line.setAttribute('fill', 'none');
    line.setAttribute('stroke-linecap', 'round');
    line.setAttribute('stroke-linejoin', 'round');
    lineElems.push(line);

    // Origin marker: white ring with colored dot on top
    const [ox, oy] = pts[0];
    const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    ring.setAttribute('cx', ox); ring.setAttribute('cy', oy);
    ring.setAttribute('r', '8'); ring.setAttribute('fill', 'white');
    ring.setAttribute('stroke', '#bbb'); ring.setAttribute('stroke-width', '1');
    ringElems.push(ring);

    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', ox); dot.setAttribute('cy', oy);
    dot.setAttribute('r', '5'); dot.setAttribute('fill', color);
    dotElems.push(dot);
  });

  // One horizontal pill per destination table, straddling the top edge
  const PILL_R = 8;
  const pillGroups = {};
  routes.forEach(({ dti, pts }) => {
    const [ex] = pts[pts.length - 1]; // entryX at dst.top
    if (!pillGroups[dti]) pillGroups[dti] = { top: tRects[dti].top, exs: [] };
    pillGroups[dti].exs.push(ex);
  });
  Object.values(pillGroups).forEach(({ top, exs }) => {
    const minX = Math.min(...exs) - PILL_R;
    const maxX = Math.max(...exs) + PILL_R;
    const pill = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    pill.setAttribute('x',      minX.toFixed(1));
    pill.setAttribute('y',      (top - PILL_R).toFixed(1));
    pill.setAttribute('width',  (maxX - minX).toFixed(1));
    pill.setAttribute('height', (2 * PILL_R).toString());
    pill.setAttribute('rx',     PILL_R.toString());
    pill.setAttribute('ry',     PILL_R.toString());
    pill.setAttribute('fill',   'white');
    pill.setAttribute('stroke', '#555');
    pill.setAttribute('stroke-width', '2');
    pillElems.push(pill);
  });

  // Z-order: outlines → colored lines → rings → dots → pills
  // (dots and pills appear immediately; lines animate on top of them)
  outlineElems.forEach(el => svg.appendChild(el));
  lineElems.forEach(el => svg.appendChild(el));
  ringElems.forEach(el => svg.appendChild(el));
  dotElems.forEach(el => svg.appendChild(el));
  pillElems.forEach(el => svg.appendChild(el));

  // Compute lengths (requires elements in DOM)
  const lengths = lineElems.map(el => el.getTotalLength());

  // Start lines invisible
  lengths.forEach((len, ri) => {
    [outlineElems[ri], lineElems[ri]].forEach(el => {
      el.style.strokeDasharray  = len;
      el.style.strokeDashoffset = len;
    });
  });

  // Reflow — dots/pills are visible before lines start drawing
  svg.getBoundingClientRect();

  // Stagger line animations; START_DELAY lets dots appear first
  const START_DELAY = 0.4;
  let delay = START_DELAY;
  routes.forEach((_, ri) => {
    [outlineElems[ri], lineElems[ri]].forEach(el => {
      el.style.transition      = `stroke-dashoffset 1.2s ease ${delay.toFixed(2)}s`;
      el.style.strokeDashoffset = '0';
    });
    delay += 0.06;
  });

  setTimeout(setStatusDone, (delay + 1.2) * 1000);
}

// Offset lines sharing the same aisle so they run as adjacent parallel tracks.
// Works by shifting aisle-coordinate points perpendicularly by (rank - mid) * STRIDE.
function applyParallelOffsets(routes, aisles) {
  const STRIDE = 7;
  const TOL    = 2;
  const { aisleX_L, aisleX_01, aisleX_12, aisleX_R, aisleY_01, aisleY_12, aisleY_top } = aisles;
  const vAs = [aisleX_L, aisleX_01, aisleX_12, aisleX_R];
  const hAs = [aisleY_01, aisleY_12, aisleY_top];

  // Find which routes touch each aisle (by having a waypoint on it)
  const vUsers = vAs.map(() => []);
  const hUsers = hAs.map(() => []);
  routes.forEach((route, ri) => {
    const seenV = new Set(), seenH = new Set();
    route.pts.forEach(([x, y]) => {
      vAs.forEach((ax, ai) => {
        if (Math.abs(x - ax) < TOL && !seenV.has(ai)) {
          seenV.add(ai);
          vUsers[ai].push({ ri, group: route.group });
        }
      });
      hAs.forEach((ay, hi) => {
        if (Math.abs(y - ay) < TOL && !seenH.has(hi)) {
          seenH.add(hi);
          hUsers[hi].push({ ri, group: route.group });
        }
      });
    });
  });

  // Assign perpendicular offsets, sorted by group for determinism
  const vAO = routes.map(() => vAs.map(() => 0));
  const hAO = routes.map(() => hAs.map(() => 0));
  vAs.forEach((_, ai) => {
    const u = vUsers[ai]; if (u.length < 2) return;
    u.sort((a, b) => a.group - b.group);
    u.forEach((item, i) => { vAO[item.ri][ai] = (i - (u.length - 1) / 2) * STRIDE; });
  });
  hAs.forEach((_, hi) => {
    const u = hUsers[hi]; if (u.length < 2) return;
    u.sort((a, b) => a.group - b.group);
    u.forEach((item, i) => { hAO[item.ri][hi] = (i - (u.length - 1) / 2) * STRIDE; });
  });

  // Apply: shift each waypoint that sits on an aisle coordinate
  routes.forEach((route, ri) => {
    route.pts = route.pts.map(([x, y]) => {
      let nx = x, ny = y;
      vAs.forEach((ax, ai) => { if (Math.abs(x - ax) < TOL) nx = ax + vAO[ri][ai]; });
      hAs.forEach((ay, hi) => { if (Math.abs(y - ay) < TOL) ny = ay + hAO[ri][hi]; });
      return [nx, ny];
    });
  });
}

// V-aisle immediately to the right / left of column c
function rightOf(c, a) { return [a.aisleX_01, a.aisleX_12, a.aisleX_R][c]; }
function leftOf(c, a)  { return [a.aisleX_L,  a.aisleX_01, a.aisleX_12][c]; }

// H-aisle immediately above the destination table's row.
function getApproachAisle(dti, aisles) {
  const r = TABLE_GRID[dti].row;
  if (r === 1) return aisles.aisleY_01;
  if (r === 2) return aisles.aisleY_12;
  return aisles.aisleY_top; // virtual aisle above row 0
}

// Build the most direct H/V route from table ti to the top of table dti.
// Starts horizontal from the outer table edge; ends at dst.top from above.
function computeRoute(ti, dti, tRects, aisles, exitY, entryX, exitLeft) {
  const { col: c1 } = TABLE_GRID[ti];
  const src           = tRects[ti];
  const dst           = tRects[dti];
  const approachAisle = getApproachAisle(dti, aisles);
  const exitX         = exitLeft ? src.left  : src.right;
  const vA            = exitLeft ? leftOf(c1, aisles) : rightOf(c1, aisles);
  return [
    [exitX,  exitY],
    [vA,     exitY],
    [vA,     approachAisle],
    [entryX, approachAisle],
    [entryX, dst.top],
  ];
}

// ── Shuffle ───────────────────────────────────────────────────────────────────

function shuffle() {
  clearLines();

  // Invalidate any in-flight animations from a prior shuffle
  shuffleToken++;
  const token = shuffleToken;

  const seed = parseInt(document.getElementById('seed').value, 10);
  currentAssignment = generateAssignment(seed);

  // Show loading spinner
  const statusEl = document.getElementById('shuffle-status');
  statusEl.className = 'status-loading';

  pendingSeats = 32;

  document.querySelectorAll('.table').forEach((table, ti) => {
    table.querySelectorAll('.seat').forEach((seat, si) => {
      animateSeat(seat, currentAssignment[ti * 4 + si], token, () => {
        if (shuffleToken !== token) return; // superseded shuffle
        pendingSeats--;
        if (pendingSeats === 0) {
          if (document.getElementById('paths-cb').checked) {
            // drawLines will own the status transition (loading → ✅ → clear)
            drawLines();
          } else {
            setStatusDone();
          }
        }
      });
    });
  });
}

// ── Info panel ────────────────────────────────────────────────────────────────

let panelContentLoaded = false;

function openPanel() {
  document.getElementById('side-panel').classList.add('open');
  document.getElementById('overlay').classList.add('visible');

  if (!panelContentLoaded) {
    panelContentLoaded = true;
    fetch('seat-shuffle-about.md')
      .then(r => r.text())
      .then(md => {
        document.getElementById('panel-content').innerHTML = marked.parse(md);
      })
      .catch(() => {
        document.getElementById('panel-content').innerHTML = '<p>Could not load content.</p>';
      });
  }
}

function closePanel() {
  document.getElementById('side-panel').classList.remove('open');
  document.getElementById('overlay').classList.remove('visible');
}

// ── Init ──────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('seed').value = Math.floor(Math.random() * 1001);
  document.getElementById('shuffle-btn').addEventListener('click', shuffle);
  document.getElementById('paths-cb').addEventListener('change', e => {
    if (e.target.checked) {
      drawLines();
    } else {
      clearLines();
    }
  });

  document.getElementById('about-link').addEventListener('click', e => { e.preventDefault(); openPanel(); });
  document.getElementById('panel-close').addEventListener('click', closePanel);
  document.getElementById('overlay').addEventListener('click', closePanel);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePanel(); });
});
