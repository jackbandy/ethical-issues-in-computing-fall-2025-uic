# Style Guide — `ethical-issues-in-computing` assets

> _Note: this guide was edited by an LLM._

Visual conventions for figures, diagrams, and slide assets. 

## Colors

From `docs/slides/theme/blue-line.scss`. CTA blue = brand accent; rest is neutral.

- `#00a1de` — CTA blue (brand), `$cta-blue`
- `#005daa` — CTA blue dark (links / hover), `$cta-blue-dark`
- `#003087` — CTA blue deep (emphasis), `$cta-blue-deep`
- `#c60c30` — CTA red (sparing accent), `$cta-red`
- `#231f20` — ink (headings, strong text), `$ink`
- `#333` — charcoal, `$charcoal`
- `#666` — muted, `$muted`
- `#aaa` — quiet, `$quiet`
- `#fff` — paper / background, `$paper`
- `#f4f4f4` — soft (code/panels), `$soft`
- `#d8d8d8` — border, `$border`

Figures:
- default to grayscale neutrals; blue as an accent on the focal element
- diagram primitives: stroke/text `#111111`, neutral fill `#EEEEEE`, highlight fill `#222222` with `#FFFFFF` text, white background

## CTA branding

We follow the [CTA Trademark Guidelines for Developers](https://www.transitchicago.com/developers/branding/). The aesthetic is a **minimal** read of the CTA system: the official route color as a sparing accent, everything else neutral.

- **Official `'L'` route colors** — CTA explicitly encourages developers to use these "to help people immediately associate the output of your application with…the same visual cues." This repo's accent is the **Blue Line `#00A1DE`** (matches `$cta-blue` exactly); **Red `#C60C30`** (= `$cta-red`) is the official Red Line color, used sparingly. Full spec for reference: Red `#C60C30`, Blue `#00A1DE`, Brown `#62361B`, Green `#009B3A`, Orange `#F9461C`, Purple `#522398`, Pink `#E27EA6`, Yellow `#F9E300`; **Sign Grey `#565A5C`** (official neutral). (`$cta-blue-dark`/`$cta-blue-deep` are derived UI shades, not official line colors.)
- **No CTA logos or marks** — per the guidelines, "Don't use any CTA logo…or any approximations thereof" (incl. the CTA circle logo and text-based logos). Use route *colors* + an original transit motif only; never imply CTA affiliation.
- **Minimal by default** — blue as an accent on the focal element; neutrals carry everything else.

## Golden-ratio figures

- lay figures out in a golden-ratio rectangle when content allows
- `PHI = (1 + 5**0.5) / 2`; derive short side from long, e.g. 1000 × 618 (`round(WIDTH / PHI)`)

## Arrows

Defaults (shared with `data-science-fun`):
- color `#111111`; weight `stroke-width="3"`
- arrowhead: filled triangle marker (`M 0 0 L 5 2.5 L 0 5 z`), size ≈ 5, `markerUnits="strokeWidth"`, `orient="auto"`, refX/refY centered
- shaft ends ~4px short of the node (small gap, not touching)
- entry / external arrows: dashed shaft `stroke-dasharray="9 8"`, same weight + head
- curved edges = cubic Béziers, same stroke; parallel arrows into one target fanned apart

## Fonts

- **Slides & figures** (`docs/slides/theme/blue-line.scss`): headings Big Shoulders (`"Big Shoulders", "Arial Narrow", "Helvetica Neue Condensed", sans-serif`); body Mulish (`"Mulish", FreeSans, Helvetica, Arial, sans-serif`); code `"IBM Plex Mono", "Courier New", monospace`. Figures: Big Shoulders headings + Mulish text (older SVGs use Helvetica); headings 700, text 400.
- **Site pages** (`docs/css/index.css`, `docs/css/exercise.css` — homepage, exercise pages): Libre Franklin / ITC Franklin Gothic for body copy, Nunito for the homepage sign-icon numeral.
- If adding a new page, match whichever surface it belongs to rather than introducing a third stack.

## The "closed sign" panel

The homepage (`docs/css/index.css` `.sign`/`.sign-top`/`.sign-bottom`) renders a literal transit-style "closed" sign — dark header bar with a circular icon badge, white body — as the page's one illustrative element. It's the only place ornamentation is allowed to be playful; everything else (exercise pages, syllabus) stays plain text on white/neutral with the blue accent doing all the work (labels, links, dividers — see `docs/css/exercise.css`).

## Other norms

- **SVG-first** — diagrams are vector; raster only for photos/source imagery
- **Self-hosted embedded fonts** — fonts live in `assets/fonts/` (OFL, with `OFL.txt`), never a CDN; the slide theme `@font-face`s them (Big Shoulders `.woff2`, Mulish variable `.ttf`)
- **og:image rasters** — social scrapers don't render SVG, so the homepage `og:image` (`assets/blue-line-full-path.png`) is a PNG derived from the source SVG, which stays canonical: render at ~4× (`cairosvg --scale 4`), then `magick … -trim +repage -bordercolor none -border <~5% of long side> -strip -define png:compression-level=9` — trims transparent edges, re-adds an equal margin to keep the art centered, strips metadata, max-compresses; keep the transparent background
- **`SOURCES.md` per folder** — any dir with third-party/remixed material lists each file's source + license
- **Versioned remixes** — adapted figures keep a numbered lineage (e.g. `deontic-square` → `-remix` → `-remix-v2`) rather than overwriting the original
- **Rounded-rect nodes** — `rx="6"`, 3px stroke, neutral fill, centered multi-line text
- **Generated variant sets** — step figures come from a Python generator emitting numbered variants (`v0` plain, `v1…vN` each highlighting one step); keep the script as source of truth
- **Blue-line transit motif** — Chicago / CTA Blue Line is the recurring theme
