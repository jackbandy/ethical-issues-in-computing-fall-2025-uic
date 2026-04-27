// CTA line colors assigned to groups 1–8
const CTA_COLORS = [
  '#c60c30', // 1 Red
  '#00a1de', // 2 Blue
  '#62361b', // 3 Brown
  '#009b3a', // 4 Green
  '#f9461c', // 5 Orange
  '#e27ea6', // 6 Pink
  '#522398', // 7 Purple
  '#f9e300', // 8 Yellow
];

// Darkened versions used as table backgrounds when "Draw Paths" is active.
const CTA_TABLE_COLORS = [
  '#6e0a1a', // 1 Red
  '#005878', // 2 Blue
  '#3d2010', // 3 Brown
  '#00521e', // 4 Green
  '#9b3110', // 5 Orange
  '#7a3b56', // 6 Pink
  '#2e1268', // 7 Purple
  '#6b6200', // 8 Yellow/Gold
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

  return result; // 32 values, constraint guaranteed
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

  // Show loading spinner while paths animate
  if (statusClearTimeout) { clearTimeout(statusClearTimeout); statusClearTimeout = null; }
  document.getElementById('shuffle-status').className = 'status-loading';

  // Color each table with its CTA line color
  const tables  = Array.from(document.querySelectorAll('.table'));
  tables.forEach((t, ti) => { t.style.background = CTA_TABLE_COLORS[ti]; });

  const room = document.querySelector('.room');
  const roomRect = room.getBoundingClientRect();

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.id = 'lines-svg';
  Object.assign(svg.style, {
    position: 'absolute', top: '0', left: '0',
    width: '100%', height: '100%',
    pointerEvents: 'none', overflow: 'visible',
  });
  room.appendChild(svg);

  const allSeats = tables.map(t => Array.from(t.querySelectorAll('.seat')));
  const centers  = tables.map(t => centerOf(t, roomRect));

  // Center of the .table-seats 2×2 grid for each table — used as path endpoint + end dot.
  const seatGridCenters = tables.map(t => centerOf(t.querySelector('.table-seats'), roomRect));

  // Compute horizontal aisle y-midpoints from rendered positions
  const row0bot  = Math.max(centers[0].bottom, centers[1].bottom);
  const row1top  = Math.min(centers[2].top, centers[3].top, centers[4].top);
  const row1bot  = Math.max(centers[2].bottom, centers[3].bottom, centers[4].bottom);
  const row2top  = Math.min(centers[5].top, centers[6].top, centers[7].top);
  const aisleY01 = (row0bot + row1top) / 2;
  const aisleY12 = (row1bot + row2top) / 2;

  let delay = 0;

  for (let ti = 0; ti < 8; ti++) {
    const srcGrid = TABLE_GRID[ti];
    for (let si = 0; si < 4; si++) {
      const group = currentAssignment[ti * 4 + si];
      if (ti === group - 1) continue; // seat stays at same table

      const dti     = group - 1;
      const dstGrid = TABLE_GRID[dti];
      const color   = CTA_COLORS[group - 1];

      const src = centerOf(allSeats[ti][si], roomRect);
      const dst = seatGridCenters[dti]; // converge on center of destination table's 2×2 grid

      // Route through horizontal aisle between source and destination rows
      let aisleY;
      if (srcGrid.row !== dstGrid.row) {
        aisleY = Math.min(srcGrid.row, dstGrid.row) === 0 ? aisleY01 : aisleY12;
      } else {
        aisleY = srcGrid.row === 2 ? aisleY12 : aisleY01;
      }

      const d = `M ${src.x} ${src.y} C ${src.x} ${aisleY} ${dst.x} ${aisleY} ${dst.x} ${dst.y}`;

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      path.setAttribute('stroke', color);
      path.setAttribute('stroke-width', '2.5');
      path.setAttribute('fill', 'none');
      path.setAttribute('opacity', '0.42');
      path.setAttribute('stroke-linecap', 'round');
      svg.appendChild(path);

      const len = path.getTotalLength();
      path.style.strokeDasharray = len;
      path.style.strokeDashoffset = len;
      path.getBoundingClientRect(); // force reflow
      path.style.transition = `stroke-dashoffset 0.65s ease ${delay.toFixed(2)}s`;
      path.style.strokeDashoffset = '0';

      // Dot at source seat center
      const startDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      startDot.setAttribute('cx', src.x);
      startDot.setAttribute('cy', src.y);
      startDot.setAttribute('r', '4');
      startDot.setAttribute('fill', color);
      startDot.setAttribute('opacity', '0.65');
      svg.appendChild(startDot);

      // Dot at destination table's 2×2 grid center
      const endDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      endDot.setAttribute('cx', dst.x);
      endDot.setAttribute('cy', dst.y);
      endDot.setAttribute('r', '4');
      endDot.setAttribute('fill', color);
      endDot.setAttribute('opacity', '0.65');
      svg.appendChild(endDot);

      delay += 0.035;
    }
  }

  // Once all path animations finish, flip to ✅ then auto-clear after 5 s
  setTimeout(setStatusDone, (delay + 0.65) * 1000);
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
});
