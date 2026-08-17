// ─────────────────────────────────────────────────────────────────────────────
// Visual Seat Shuffle — sends every student to a new table.
//
// THE CONSTRAINTS
//
// A shuffle is only ever shown if it satisfies all of these at once. When they
// can't all be met, the tool says so (⚠️ in the header) rather than quietly
// breaking one. See generateAssignment() for how they are solved.
//
//   1. Nobody stays put.
//      A seat's destination is never its own table.
//
//   2. Tablemates split up.
//      The occupied seats at one table all go to different destinations, so no
//      two people travel together.
//
//   3. No lonely tables.
//      A table that receives anyone receives at least MIN_PER_TABLE of them.
//      A destination of one or two people isn't a table discussion.
//
//   4. Nobody stands.
//      A table receives at most SEATS_PER_TABLE students — it has that many
//      chairs whether or not anyone is sitting in them today.
//
//   5. No wasted tables.
//      As many tables are used as rules 1–4 allow. A table only goes empty
//      when there genuinely aren't enough students to fill it.
//
//   6. Erased seats sit out.
//      A seat clicked to "erase" it is an absent student. It gets no
//      destination and sends nobody. The chair still counts toward rule 4,
//      because the chair is still there.
//
//   7. Erasing a whole table removes it from the room.
//      A table with every seat erased receives nobody at all — it is the one
//      way to take a table out of rules 4 and 5.
//
//   8. Reproducible.
//      The same seed with the same seats erased always produces the same
//      assignment. Changing either changes the result.
//
// Rules 2 and 3 are the ones that fight each other: a table of four splits four
// ways, and those four destinations need 4 × MIN_PER_TABLE students between
// them. A small room can therefore be genuinely impossible to shuffle.
// ─────────────────────────────────────────────────────────────────────────────

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
  '#dcc800', // 8 Yellow (between golden and bright CTA yellow)
];

// Destination marker (pill) geometry — lifted above the table's top edge so it
// clears the "TABLE N" label instead of sitting on top of it.
const PILL_R    = 8;
const PILL_LIFT = 8;

// Origin marker at each occupied seat: a colored dot on a white halo. Sized to
// stay legible when the colors layer is on by itself, with no line to follow.
const DOT_RING_R = 13;
const DOT_R      = 8.5;

// Grid positions (row, col) for tables in DOM order: t1…t8
const TABLE_GRID = [
  {row:0, col:1}, {row:0, col:2},
  {row:1, col:0}, {row:1, col:1}, {row:1, col:2},
  {row:2, col:0}, {row:2, col:1}, {row:2, col:2},
];

// Room shape.
const NUM_TABLES      = 8;
const SEATS_PER_TABLE = 4;
const NUM_SEATS       = NUM_TABLES * SEATS_PER_TABLE;

// A table either receives nobody or receives at least this many students —
// a destination of one or two people isn't a table discussion.
const MIN_PER_TABLE = 3;

// Seats erased by clicking them: absent students, or a corner of the room that
// isn't in use today. Indexed ti * SEATS_PER_TABLE + si.
const erasedSeats = new Array(NUM_SEATS).fill(false);

// Last computed assignment; used by drawOverlay so it does not rely on live DOM
// text. Each entry is a destination table number (1–8), or null for an erased
// seat.
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
// Every active seat is sent to a table other than its own, the active seats at
// any one table all go to different destinations, and any table that receives
// students receives at least MIN_PER_TABLE of them and never more than its
// SEATS_PER_TABLE chairs. As many tables are used as those rules allow, so a
// table only goes empty when there genuinely aren't enough students to fill it.
//
// Same seed + same erased seats always produces the same result.

function generateAssignment(seed) {
  // Active seats per table.
  const cap = [];
  for (let t = 0; t < NUM_TABLES; t++) {
    let c = 0;
    for (let s = 0; s < SEATS_PER_TABLE; s++) {
      if (!erasedSeats[t * SEATS_PER_TABLE + s]) c++;
    }
    cap.push(c);
  }
  const total = cap.reduce((a, b) => a + b, 0);

  if (total === 0) {
    return { ok: false, reason: 'Every seat is erased — click a seat to bring it back.' };
  }
  if (total < MIN_PER_TABLE) {
    return {
      ok: false,
      reason: `Only ${total} seat${total === 1 ? '' : 's'} left, and a table needs at least ${MIN_PER_TABLE}.`,
    };
  }

  const rand = mulberry32(seedFor(seed));

  // Try each workable set of destination tables, the fullest room first.
  for (const dests of candidateDestinations(cap, total, rand)) {
    for (let attempt = 0; attempt < 40; attempt++) {
      const incoming = distribute(dests, total, rand);
      if (!incoming) break;
      const sets = solveRouting(cap, dests, incoming);
      if (!sets) continue;
      diversify(sets, cap, rand);
      return { ok: true, assignment: layOutSeats(sets, rand), cap };
    }
  }

  // Both usual culprits trace back to the biggest table: its students split
  // one per destination, so it needs that many other tables to send them to,
  // and each of those tables needs MIN_PER_TABLE students of its own.
  const biggest   = Math.max(...cap);
  const liveCount = cap.filter(c => c > 0).length;

  if (biggest > liveCount - 1) {
    return {
      ok: false,
      reason: `A table of ${biggest} splits ${biggest} ways, but only ${liveCount - 1} other table${liveCount - 1 === 1 ? '' : 's'} ${liveCount - 1 === 1 ? 'is' : 'are'} still in the room. Erase a seat at one of the fullest tables, or restore a table.`,
    };
  }
  if (MIN_PER_TABLE * biggest > total) {
    return {
      ok: false,
      reason: `A table of ${biggest} splits ${biggest} ways, and ${biggest} tables need ${MIN_PER_TABLE * biggest} students between them — there are ${total}. Erase a seat at one of the fullest tables.`,
    };
  }
  return {
    ok: false,
    reason: `No arrangement of ${total} students puts ${MIN_PER_TABLE}+ at every table in use — try erasing a seat at a full table, or restoring one elsewhere.`,
  };
}

// Mix the erased-seat pattern into the seed, so the same seed number with a
// different set of erased seats is a different (but still reproducible) shuffle.
function seedFor(seed) {
  let h = Math.imul(seed | 0, 0x9E3779B1) | 0;
  for (let i = 0; i < NUM_SEATS; i++) {
    if (erasedSeats[i]) h = Math.imul(h ^ (i + 1), 0x85EBCA6B) | 0;
  }
  return h;
}

// Every set of destination tables that could work, ordered by size — largest
// first, because we want as few empty tables as possible. Ties are broken by
// the seeded PRNG, so the choice varies between seeds but stays reproducible.
//
// An erased seat marks an absent student, not a chair that has been taken
// away, so a destination table still seats SEATS_PER_TABLE. A table with every
// seat erased is the exception: it has been taken out of the room, so nobody
// is routed to it.
function candidateDestinations(cap, total, rand) {
  const live = [];
  for (let t = 0; t < NUM_TABLES; t++) if (cap[t] > 0) live.push(t);

  const out = [];
  for (let mask = 1; mask < (1 << live.length); mask++) {
    const dests = live.filter((_, i) => mask & (1 << i));

    // The room must have enough students to give every destination its minimum...
    if (MIN_PER_TABLE * dests.length > total) continue;
    // ...and enough chairs between them to seat everybody.
    if (SEATS_PER_TABLE * dests.length < total) continue;
    // Each table's students split up, so it needs that many destinations open
    // to it — its own table doesn't count.
    const inDests = new Set(dests);
    if (live.some(s => cap[s] > dests.length - (inDests.has(s) ? 1 : 0))) continue;

    out.push({ dests, key: rand() });
  }

  out.sort((a, b) => b.dests.length - a.dests.length || a.key - b.key);
  return out.map(o => o.dests);
}

// Split `total` students across the destination tables: MIN_PER_TABLE each to
// start, then hand out the remainder at random among tables with a chair left.
function distribute(dests, total, rand) {
  const incoming = {};
  dests.forEach(t => { incoming[t] = MIN_PER_TABLE; });

  for (let left = total - MIN_PER_TABLE * dests.length; left > 0; left--) {
    const room = dests.filter(t => incoming[t] < SEATS_PER_TABLE);
    if (!room.length) return null;
    incoming[room[Math.floor(rand() * room.length)]]++;
  }
  return incoming;
}

// Max-flow on a tiny network: each source table supplies its seated students,
// each destination table demands `incoming[t]`, and every source→destination
// arc has capacity 1, which is what forces a table's students to split up. A
// flow that saturates the supply is a valid routing; anything less means this
// particular split can't be seated.
//
// Returns one Set of destination tables per source table, or null.
function solveRouting(cap, dests, incoming) {
  const SRC = 0;
  const SNK = 2 * NUM_TABLES + 1;
  const n   = SNK + 1;
  const dst = t => NUM_TABLES + 1 + t;

  const res = Array.from({ length: n }, () => new Array(n).fill(0));

  let supply = 0;
  for (let s = 0; s < NUM_TABLES; s++) {
    if (!cap[s]) continue;
    res[SRC][s + 1] = cap[s];
    supply += cap[s];
    dests.forEach(t => { if (t !== s) res[s + 1][dst(t)] = 1; });
  }
  dests.forEach(t => { res[dst(t)][SNK] = incoming[t]; });

  // Edmonds–Karp.
  let flow = 0;
  for (;;) {
    const prev = new Array(n).fill(-1);
    prev[SRC] = SRC;
    const queue = [SRC];
    while (queue.length && prev[SNK] === -1) {
      const u = queue.shift();
      for (let v = 0; v < n; v++) {
        if (prev[v] === -1 && res[u][v] > 0) { prev[v] = u; queue.push(v); }
      }
    }
    if (prev[SNK] === -1) break;

    let bottleneck = Infinity;
    for (let v = SNK; v !== SRC; v = prev[v]) bottleneck = Math.min(bottleneck, res[prev[v]][v]);
    for (let v = SNK; v !== SRC; v = prev[v]) {
      res[prev[v]][v] -= bottleneck;
      res[v][prev[v]] += bottleneck;
    }
    flow += bottleneck;
  }

  if (flow !== supply) return null;

  // A unit-capacity arc with no residual left is an arc that carried a student.
  const sets = Array.from({ length: NUM_TABLES }, () => new Set());
  for (let s = 0; s < NUM_TABLES; s++) {
    if (!cap[s]) continue;
    dests.forEach(t => { if (t !== s && res[s + 1][dst(t)] === 0) sets[s].add(t); });
  }
  return sets;
}

// Walk the solution to a random point in the space of valid solutions. Trading
// one destination between two source tables leaves every constraint intact:
// both tables keep the same number of distinct destinations, neither picks up
// its own table, and both destinations keep the same head count.
function diversify(sets, cap, rand) {
  const live = [];
  for (let t = 0; t < NUM_TABLES; t++) if (cap[t] > 0) live.push(t);
  if (live.length < 2) return;

  for (let i = 0; i < 400; i++) {
    const s1 = live[Math.floor(rand() * live.length)];
    const s2 = live[Math.floor(rand() * live.length)];
    if (s1 === s2) continue;

    const from1 = [...sets[s1]].filter(d => d !== s2 && !sets[s2].has(d));
    const from2 = [...sets[s2]].filter(d => d !== s1 && !sets[s1].has(d));
    if (!from1.length || !from2.length) continue;

    const d1 = from1[Math.floor(rand() * from1.length)];
    const d2 = from2[Math.floor(rand() * from2.length)];
    sets[s1].delete(d1); sets[s1].add(d2);
    sets[s2].delete(d2); sets[s2].add(d1);
  }
}

// Drop each table's destinations onto its un-erased seats in random order.
function layOutSeats(sets, rand) {
  const assignment = new Array(NUM_SEATS).fill(null);
  for (let t = 0; t < NUM_TABLES; t++) {
    const dests = [...sets[t]].map(d => d + 1);
    fisherYates(dests, rand);
    let k = 0;
    for (let s = 0; s < SEATS_PER_TABLE; s++) {
      const i = t * SEATS_PER_TABLE + s;
      if (!erasedSeats[i]) assignment[i] = dests[k++];
    }
  }
  return assignment;
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
// pool: the table numbers worth flashing during the spin — tables that have
//   been erased out of the room never appear.
// token: invalidated if the user clicks Shuffle again before this seat finishes.
// onDone: called once the seat has settled on its final value.

function animateSeat(seatEl, finalValue, pool, token, onDone) {
  const totalMs = 2000 + Math.random() * 2500; // 2.0 – 4.5 s per seat
  const spinMs  = totalMs * (0.30 + Math.random() * 0.15); // 30–45 % spinning
  const flash   = () => pool[Math.floor(Math.random() * pool.length)];

  seatEl.style.color = 'rgba(255,255,255,0.30)';

  const spinInterval = setInterval(() => {
    if (shuffleToken !== token) { clearInterval(spinInterval); return; }
    seatEl.textContent = flash();
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
          seatEl.textContent = flash();
        }
      }, delay);
    });
  }, spinMs);
}

// ── Draw overlay ──────────────────────────────────────────────────────────────
// Two independent layers, each with its own checkbox:
//
//   Colors — the tables take their CTA line color and every occupied seat gets
//            a dot in the color of the table it is heading to. Enough to read
//            the room at a glance without a line to trace.
//   Paths  — the routed lines, and the pill each route arrives in.
//
// Both are built from the same geometry, so one pass produces either or both.

function showColors() { return document.getElementById('colors-cb').checked; }
function showPaths()  { return document.getElementById('paths-cb').checked; }

function drawOverlay() {
  const existing = document.getElementById('lines-svg');
  if (existing) existing.remove();
  document.querySelectorAll('.table').forEach(t => { t.style.background = ''; });

  const wantColors = showColors();
  const wantPaths  = showPaths();
  if (!currentAssignment || (!wantColors && !wantPaths)) return;

  if (statusClearTimeout) { clearTimeout(statusClearTimeout); statusClearTimeout = null; }
  document.getElementById('shuffle-status').className = 'status-loading';

  const tables = Array.from(document.querySelectorAll('.table'));
  if (wantColors) {
    tables.forEach((t, ti) => {
      if (t.classList.contains('table-off')) return; // erased out of the room
      t.style.background = CTA_TABLE_COLORS[ti];
    });
  }

  const room     = document.querySelector('.room');
  const roomRect = room.getBoundingClientRect();

  // The SVG overlay is a child of .room, so its own coordinate system is
  // .room's pre-transform (local) box — but getBoundingClientRect reports
  // post-transform (visual) pixels. Divide screen-space deltas by the
  // current scale to convert them back into the SVG's local space.
  const scale = currentRoomScale || 1;

  // Full rect for each table (room-relative, in SVG-local units)
  const tRects = tables.map(t => {
    const r    = t.getBoundingClientRect();
    const left = (r.left - roomRect.left) / scale, right  = (r.right  - roomRect.left) / scale;
    const top  = (r.top  - roomRect.top)  / scale, bottom = (r.bottom - roomRect.top)  / scale;
    return { left, right, top, bottom, midX: (left+right)/2, midY: (top+bottom)/2 };
  });

  // Individual seat centers (room-relative, in SVG-local units)
  const allSeats = tables.map(t => Array.from(t.querySelectorAll('.seat')));
  const seatCenters = tables.map((_, ti) =>
    allSeats[ti].map(s => {
      const r = s.getBoundingClientRect();
      return [(r.left - roomRect.left + r.width/2) / scale, (r.top - roomRect.top + r.height/2) / scale];
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
    for (let si = 0; si < SEATS_PER_TABLE; si++) {
      const group    = currentAssignment[ti * SEATS_PER_TABLE + si];
      if (group === null) continue;   // erased seat — nobody sitting there
      if (ti === group - 1) continue; // stationarys ruled out by generateAssignment
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

  // Lane-packing only matters when the lines are actually drawn. Skipping it
  // also leaves each route's first point exactly on its seat's outer edge,
  // which is where the colors layer wants its dot.
  if (wantPaths) {
    // Offset lines sharing an aisle so they run as adjacent parallel tracks
    applyParallelOffsets(routes, aisles);

    // The parallel-lane offset above can push a route's approach-aisle segment
    // as low as (or lower than) its own destination pill when many routes share
    // an aisle — which would make the final segment climb into the pill from
    // below instead of dropping into it from above. Re-clamp the last "lane"
    // waypoint (and its horizontal partner) so the final descent always has a
    // safe, strictly-downward run into the pill's top.
    clampApproachDescents(routes);
  }

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
    const color = CTA_COLORS[group - 1];

    if (wantPaths) {
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
    }

    if (wantColors) {
      // Origin marker: white ring with colored dot on top
      const [ox, oy] = pts[0];
      const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      ring.setAttribute('cx', ox); ring.setAttribute('cy', oy);
      ring.setAttribute('r', DOT_RING_R); ring.setAttribute('fill', 'white');
      ring.setAttribute('stroke', '#bbb'); ring.setAttribute('stroke-width', '1');
      ringElems.push(ring);

      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx', ox); dot.setAttribute('cy', oy);
      dot.setAttribute('r', DOT_R); dot.setAttribute('fill', color);
      dotElems.push(dot);
    }
  });

  // One horizontal pill per destination table, lifted clear of the table label.
  // A pill marks where routes arrive, so it belongs to the paths layer.
  const pillGroups = {};
  if (wantPaths) {
    routes.forEach(({ dti, pts }) => {
      const [ex] = pts[pts.length - 1]; // entryX at the pill's top edge
      if (!pillGroups[dti]) pillGroups[dti] = { top: tRects[dti].top - PILL_LIFT, exs: [] };
      pillGroups[dti].exs.push(ex);
    });
  }
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

  // Nothing to animate when only the colors layer is on — the dots are already
  // on screen, so the shuffle is done.
  if (!wantPaths) { setStatusDone(); return; }

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

// Guarantee the final approach-to-pill segment always descends. Each route's
// points are [exit, vAisle@exitY, vAisle@approach, entry@approach, entry@pillTop];
// the parallel-lane offset above can push the "@approach" pair as low as (or
// below) pillTop when many routes share that aisle, so clamp both to stay a
// fixed margin above it.
function clampApproachDescents(routes) {
  const MIN_GAP = 6;
  routes.forEach(({ pts }) => {
    const n = pts.length;
    const pillY = pts[n - 1][1];
    const safeY = Math.min(pts[n - 2][1], pillY - MIN_GAP);
    pts[n - 2][1] = safeY;
    pts[n - 3][1] = safeY;
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
    [entryX, dst.top - PILL_LIFT - PILL_R],
  ];
}

// ── Shuffle ───────────────────────────────────────────────────────────────────

function shuffle() {
  clearLines();

  // Invalidate any in-flight animations from a prior shuffle
  shuffleToken++;
  const token = shuffleToken;

  const seed   = parseInt(document.getElementById('seed').value, 10);
  const result = generateAssignment(Number.isFinite(seed) ? seed : 0);

  if (!result.ok) {
    currentAssignment = null;
    clearSeatText();
    showMessage(result.reason);
    document.getElementById('shuffle-status').className = 'status-error';
    return;
  }

  showMessage('');
  currentAssignment = result.assignment;

  // Numbers the spinner is allowed to flash: tables still in the room.
  const pool = [];
  for (let t = 0; t < NUM_TABLES; t++) if (result.cap[t] > 0) pool.push(t + 1);

  // Show loading spinner
  const statusEl = document.getElementById('shuffle-status');
  statusEl.className = 'status-loading';

  pendingSeats = currentAssignment.reduce((n, v) => v === null ? n : n + 1, 0);

  document.querySelectorAll('.table').forEach((table, ti) => {
    table.querySelectorAll('.seat').forEach((seat, si) => {
      const value = currentAssignment[ti * SEATS_PER_TABLE + si];
      if (value === null) { seat.textContent = ''; return; } // erased
      animateSeat(seat, value, pool, token, () => {
        if (shuffleToken !== token) return; // superseded shuffle
        pendingSeats--;
        if (pendingSeats === 0) {
          if (showColors() || showPaths()) {
            // drawOverlay owns the status transition (loading → ✅ → clear)
            drawOverlay();
          } else {
            setStatusDone();
          }
        }
      });
    });
  });
}

// ── Erasing seats ─────────────────────────────────────────────────────────────
// Clicking a seat erases it — the student is absent, or that corner of the room
// isn't in use — and clicking it again brings it back.

function toggleSeat(i) {
  erasedSeats[i] = !erasedSeats[i];

  // Erasing or restoring a seat changes the arithmetic for the whole room, so
  // whatever is on screen is no longer a valid assignment. Wipe it and wait for
  // a fresh shuffle rather than leaving a stale one up.
  shuffleToken++; // cancels any in-flight seat animations
  currentAssignment = null;
  clearLines();
  clearSeatText();
  showMessage('');
  refreshSeats();
}

function clearSeatText() {
  document.querySelectorAll('.seat').forEach(seat => {
    seat.textContent = '';
    seat.style.color = '';
  });
}

// Reflect the erased set in the DOM: an erased seat reads as a hole punched
// through the table, and a table with every seat erased drops out of the room.
function refreshSeats() {
  document.querySelectorAll('.table').forEach((table, ti) => {
    let live = 0;
    table.querySelectorAll('.seat').forEach((seat, si) => {
      const erased = erasedSeats[ti * SEATS_PER_TABLE + si];
      seat.classList.toggle('erased', erased);
      seat.setAttribute('aria-label', `Table ${ti + 1}, seat ${si + 1} — ` +
        (erased ? 'erased, click to restore' : 'click to erase'));
      seat.setAttribute('aria-pressed', erased ? 'true' : 'false');
      if (!erased) live++;
    });
    table.classList.toggle('table-off', live === 0);
  });
}

// The reason a shuffle couldn't run lives behind the ⚠️ in the header corner,
// not inline — an impossible room is rare, and the header stays quiet when the
// tool is working.
function showMessage(text) {
  document.getElementById('shuffle-tip-why').textContent =
    text ? `(Can't meet the constraints: ${text})` : '';
  const status = document.getElementById('shuffle-status');
  if (text) {
    status.setAttribute('tabindex', '0');   // reachable without a mouse
    status.setAttribute('aria-label', `Shuffle seats another day! Can't meet the constraints: ${text}`);
  } else {
    status.removeAttribute('tabindex');
    status.removeAttribute('aria-label');
  }
}

// ── Fit room to viewport ───────────────────────────────────────────────────────
// The room's contents have fixed pixel sizes. Scale it to fill as much of the
// space between header and footer as possible — up when there's room to
// spare, down when the window is small — bounded by whichever of width/height
// is tighter so it never overflows sideways either.

let roomNaturalSize = null; // cached; the room's own content size never changes
let currentRoomScale = 1;   // last scale factor applied to .room; used by drawOverlay()

function fitRoom() {
  const wrapper = document.getElementById('room-scale');
  const room    = document.querySelector('.room');
  if (!wrapper || !room) return;

  if (!roomNaturalSize) {
    room.style.transform = 'none';
    roomNaturalSize = { w: room.offsetWidth, h: room.offsetHeight };
  }

  const header = document.querySelector('.header');
  const footer = document.querySelector('.footnotes');
  const page   = document.querySelector('.page');

  const bodyStyle = getComputedStyle(document.body);
  const padX = parseFloat(bodyStyle.paddingLeft) + parseFloat(bodyStyle.paddingRight);
  const padY = parseFloat(bodyStyle.paddingTop)  + parseFloat(bodyStyle.paddingBottom);
  const pageGap = parseFloat(getComputedStyle(page).rowGap || getComputedStyle(page).gap) || 0;

  const availW = window.innerWidth - padX;

  // Forcing the header to the room's width can make it wrap onto a second
  // line, which changes its own height — and thus how much vertical space is
  // left for the room. Iterate a couple of times so that feedback settles
  // before committing to a final scale.
  let scale = currentRoomScale;
  for (let i = 0; i < 3; i++) {
    const availH = window.innerHeight - padY - header.offsetHeight - footer.offsetHeight - pageGap;
    scale = Math.min(availW / roomNaturalSize.w, availH / roomNaturalSize.h);
    header.style.width = `${roomNaturalSize.w * scale}px`;
  }

  currentRoomScale = scale;
  room.style.transform = `scale(${scale})`;
  wrapper.style.width  = `${roomNaturalSize.w * scale}px`;
  wrapper.style.height = `${roomNaturalSize.h * scale}px`;
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

function setUpSeats() {
  document.querySelectorAll('.table').forEach((table, ti) => {
    table.querySelectorAll('.seat').forEach((seat, si) => {
      const i = ti * SEATS_PER_TABLE + si;
      seat.setAttribute('role', 'button');
      seat.setAttribute('tabindex', '0');
      seat.addEventListener('click', () => toggleSeat(i));
      seat.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSeat(i); }
      });
    });
  });
  refreshSeats();
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('seed').value = Math.floor(Math.random() * 1001);
  document.getElementById('shuffle-btn').addEventListener('click', shuffle);
  setUpSeats();
  showMessage('');
  ['colors-cb', 'paths-cb'].forEach(id => {
    document.getElementById(id).addEventListener('change', () => {
      if (showColors() || showPaths()) drawOverlay(); else clearLines();
    });
  });

  document.getElementById('about-link').addEventListener('click', e => { e.preventDefault(); openPanel(); });
  document.getElementById('panel-close').addEventListener('click', closePanel);
  document.getElementById('overlay').addEventListener('click', closePanel);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePanel(); });

  fitRoom();
  window.addEventListener('resize', () => {
    fitRoom();
    if (showColors() || showPaths()) drawOverlay();
  });
});
