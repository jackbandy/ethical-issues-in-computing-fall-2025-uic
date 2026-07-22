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

- `syllabus.md` — the syllabus content (paste schedule updates into the table
  in the Course Schedule section; `schedule.csv` holds the same rows for
  spreadsheet editing, but is not yet wired into the build)
- `template.tex` — PDF template, styled after Jakob Eriksson's UIC syllabus
  template (gray boxed section headings, CMU Serif/Sans)
- `template.html` — HTML template with matching section styling
- `arendt.jpg` — photo used on the last page (copied to the output dir)

Both templates include a DRAFT watermark; remove the `AddToShipoutPictureBG`
block in `template.tex` and the `body::before` rule in `template.html` when
the syllabus is final.

Old syllabi (and the retired hand-written LaTeX output `SP26_CS377_jxb.pdf`
this design came from) are in `../syllabus_archive/`.
