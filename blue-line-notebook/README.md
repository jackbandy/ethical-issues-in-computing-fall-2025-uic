# Blue Line Notebook

Two blank dot-grid pages for each of the 33 CTA Blue Line stops, plus a front
cover and a blank back cover — 68 pages, which folds as one signature.

```
python3 build_notebook.py
```

Outputs (both regenerated from scratch every run):

- `blue-line-notebook.pdf` — 68 half-letter (5.5×8.5") pages in reading order
- `blue-line-notebook-booklet.pdf` — 34 letter-landscape sheets, imposed 2-up

Print the booklet PDF double-sided, **flip on short edge**, then fold the
17-sheet stack in half.

Stop names come from `../misc/cta-blue-line-stops.csv`. `Harlem` and `Western`
appear on both branches, so those four pages carry a branch label.

Useful flags: `--dot-pitch` / `--dot-size` (grid spacing and dot size),
`--title` / `--subtitle`, `--signature 8` (fold in smaller groups
instead of one thick signature), `--keep-tex`.

Intermediate `.tex` and PDFs land in `_build/`.
