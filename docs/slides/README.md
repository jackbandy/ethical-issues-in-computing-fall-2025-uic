# Slides

The slide sources use [Quarto](https://quarto.org/) Reveal.js.

GitHub Actions renders the slide HTML for commits to `main` using
`.github/workflows/build-slides.yml`. The decks are configured with
`embed-resources: true`, so the generated `.html` files are self-contained and
can be committed without the bulky `*_files/` support directories.

Run `./build.sh` locally when you want to preview changes before pushing or
when you want to generate PDFs on-device. The local build requires Quarto,
Node.js 22+, Python with PyMuPDF, and Chrome or Chromium. Set `CHROME` to a
browser executable if it is not found automatically, or set
`BUILD_PDFS=false` for HTML-only local builds.

HTML output is CI-managed. PDFs are generated locally and ignored by default.

## Deck structure

`_metadata.yml` sets `slide-level: 2`, so the two heading levels do different
jobs:

- `#` opens a section: the day title slides (`{.title-slide}` and
  `{.title-slide .photo-title}`), the topic dividers
  (`# Topic {.title-slide .section-header}`), and the closing sources slide.
- `##` is an ordinary slide, grouped under the section above it.

Sections show up as a vertical stack per topic and as the grouping in the
navigation menu (press `M` while presenting). Navigation stays linear, so the
arrow keys still walk the deck in order.

`week0.md` is the starter deck. Copy it when beginning a new week and update
the title, footer, URL, and content.

The build script also accepts `.qmd` decks, but this repository uses `.md` for
slide sources.
