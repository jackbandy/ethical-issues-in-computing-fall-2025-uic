# Syllabus Source

`syllabus.md` is the editable syllabus (single source of truth). Run:

```bash
./build.sh
```

The build uses Pandoc and XeLaTeX to publish:

- `../docs/syllabus/index.html`
- `../docs/syllabus/syllabus.pdf`

Both outputs are intended to be committed so GitHub Pages serves them at
`https://doethics.fun/syllabus/`.

## Files

- `syllabus.md` — the syllabus content. The Course Schedule section holds an
  empty ` ```schedule ` block, not a table; do not type one there.
- `schedule.lua` — Pandoc filter that expands that block into the per-week
  table, reading `../docs/_includes/schedule.csv` (weeks, dates, work due) and
  `../docs/_includes/schedule-topics.md` (what happens each day). The website's
  schedule page reads the same two files. Edit those, never the table.
- `template.tex` — PDF template, styled after Jakob Eriksson's UIC syllabus
  template (gray boxed section headings, CMU Serif/Sans). The build stamp and
  the HTML/course-site links live in a `fancyhdr` running footer on every page,
  alongside the page number — not in the title block.
- `template.html` — HTML template with matching section styling
- `arendt.jpg` — photo used on the last page (copied to the output dir)

The "Use of Generative AI" section pulls the three CTA signal aspects from
`../docs/assets/signals/` as `../assets/signals/*.svg`. That path resolves
directly for the HTML (which lands in `docs/syllabus/`), and for the PDF
because `build.sh` puts `$OUTPUT_DIR` on Pandoc's `--resource-path`. Rendering
those SVGs into the PDF needs `rsvg-convert` (`brew install librsvg`) in
addition to Pandoc and XeLaTeX.

Both templates include a DRAFT watermark; remove the `AddToShipoutPictureBG`
block in `template.tex` and the `body::before` rule in `template.html` when
the syllabus is final.

Old syllabi (and the retired hand-written LaTeX output `SP26_CS377_jxb.pdf`
this design came from) are in `../syllabus_archive/`.
