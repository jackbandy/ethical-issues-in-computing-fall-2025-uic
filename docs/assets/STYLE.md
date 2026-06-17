# Style Guide — `ethical-issues-in-computing` assets

> _Note: this guide was edited by an LLM._

Visual conventions for figures, diagrams, and slide assets. 

## Colors

From `docs/slides/theme/blue-line.scss`. CTA blue = brand accent; rest is neutral.

- `#00a1de` — CTA blue (brand) · `$cta-blue`
- `#005daa` — CTA blue dark (links / hover) · `$cta-blue-dark`
- `#003087` — CTA blue deep (emphasis) · `$cta-blue-deep`
- `#c60c30` — CTA red (sparing accent) · `$cta-red`
- `#231f20` — ink (headings, strong text) · `$ink`
- `#333` — charcoal · `$charcoal`
- `#666` — muted · `$muted`
- `#aaa` — quiet · `$quiet`
- `#fff` — paper / background · `$paper`
- `#f4f4f4` — soft (code/panels) · `$soft`
- `#d8d8d8` — border · `$border`

Figures:
- default to grayscale neutrals; blue as an accent on the focal element
- diagram primitives: stroke/text `#111111`, neutral fill `#EEEEEE`, highlight fill `#222222` with `#FFFFFF` text, white background

## Golden-ratio figures

- lay figures out in a golden-ratio rectangle when content allows
- `PHI = (1 + 5**0.5) / 2`; derive short side from long, e.g. 1000 × 618 (`round(WIDTH / PHI)`)

## Arrows

Defaults (shared with `data-adventures`):
- color `#111111`; weight `stroke-width="3"`
- arrowhead: filled triangle marker (`M 0 0 L 5 2.5 L 0 5 z`), size ≈ 5, `markerUnits="strokeWidth"`, `orient="auto"`, refX/refY centered
- shaft ends ~4px short of the node (small gap, not touching)
- entry / external arrows: dashed shaft `stroke-dasharray="9 8"`, same weight + head
- curved edges = cubic Béziers, same stroke; parallel arrows into one target fanned apart

## Fonts

- headings: `"Arial Narrow", "Helvetica Neue Condensed", FreeSans, sans-serif`
- body: `FreeSans, Helvetica, Arial, sans-serif`
- code: `"IBM Plex Mono", "Courier New", monospace`
- figures: Helvetica (existing SVGs); headings bold, text regular

## Other norms

- **SVG-first** — diagrams are vector; raster only for photos/source imagery
- **`SOURCES.md` per folder** — any dir with third-party/remixed material lists each file's source + license
- **Versioned remixes** — adapted figures keep a numbered lineage (e.g. `deontic-square` → `-remix` → `-remix-v2`) rather than overwriting the original
- **Rounded-rect nodes** — `rx="6"`, 3px stroke, neutral fill, centered multi-line text
- **Generated variant sets** — step figures come from a Python generator emitting numbered variants (`v0` plain, `v1…vN` each highlighting one step); keep the script as source of truth
- **Blue-line transit motif** — Chicago / CTA Blue Line is the recurring theme
