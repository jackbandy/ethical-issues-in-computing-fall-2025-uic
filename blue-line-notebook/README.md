# Blue Line Notebook

Two near-blank pages for each of the 33 CTA Blue Line stops, plus a front
cover and a blank back cover — 68 pages, which folds to make a noteboo

The type is Big Shoulders, a condensed grotesque drawn for Chicago and named
for Sandburg's "City of the Big Shoulders."

```
python3 build_notebook.py
```

Outputs (all regenerated from scratch every run):

- `blue-line-notebook.pdf` — 68 half-letter (5.5×8.5") pages in reading order
- `blue-line-notebook-booklet-flip-SHORT-edge.pdf` — 34 letter-landscape
  sheets, imposed 2-up
- `blue-line-notebook-booklet-flip-LONG-edge.pdf` — the same sheets with every
  back pre-rotated 180°

Print one of the two booklet PDFs double-sided and fold the 17-sheet stack in
half. Pick the file that matches the duplex setting

Stop names come from `../misc/cta-blue-line-stops.csv`

`Harlem` and `Western` appear on both branches, so those four pages have a branch label.

Useful flags:
 `--dot-size` (grid dot diameter),
`--title` / `--subtitle`, `--signature 8` (fold in smaller groups
instead of one thick signature), `--keep-tex`.

Intermediate `.tex` and PDFs land in `_build/`.
