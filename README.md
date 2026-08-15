# 🟦 Blue Line Ethics 🟦
## Ethical Issues in Computing (CS 377), UIC

The published schedule is at [doethics.fun/schedule.html](https://doethics.fun/schedule.html).

## The schedule lives in two files

Split by how you edit them: a spreadsheet-shaped calendar, and a markdown file of what actually happens. The schedule page and the syllabus both read both files, so no table is ever written by hand.

### `docs/_includes/schedule.csv` — the calendar

One row per class meeting. This is the file you change when the course moves to a new semester.

| Column | Notes |
|:--|:--|
| `Unit`, `Branch` | Repeated on every row of the unit; the first row's values win. |
| `Week` | Groups the rows. Also the deck number — week *N* is deck *N*. |
| `Date` | ISO `YYYY-MM-DD`; the page formats it as "Monday, August 24, 2026". |
| `Station` | Blank on no-class days, which drops the 🟦 marker. |
| `Due` | Work due that day. Feeds the syllabus's "Readings / Work Due" column. |
| `Notes` | Scratch column for you — room changes, displaced topics, things to confirm. Nothing publishes it. |

### `docs/_includes/schedule-topics.md` — the content

Plain nested bullet lists, in sections keyed by week and day:

```markdown
## Week 1, Day 2 (2026-08-26)

* Introduction to Virtue Ethics

### Sources

* [Virtue Ethics, Stanford Encyclopedia of Philosophy](https://plato.stanford.edu/entries/ethics-virtue/)
* [Adventures from the Book of Virtues, IMDB](https://www.imdb.com/title/tt0227868/)
  * Some episodes available online, e.g. [Generosity](https://archive.org/details/adventures-from-the-book-of-virtues-generosity-full-true-1997-vhs-rip-converted)
```

`Week N, Day M` is the join key — the date in parentheses is for readers, so a new semester's dates change in the CSV and this file stays put. Bullets above `### Sources` are the day's topics; everything below becomes the collapsed "Source materials" list. Nest by indenting, as deep as you like.

Both files sit in `_includes/` because `{% include %}` is the only way to hand Liquid their raw text: Jekyll's `_data` loader ignores `.md` outright, and renders whatever it does load to HTML before a layout can see it. The tradeoff is that `docs/_layouts/schedule.html` parses the CSV by hand, so **the first five columns must not contain commas**. `Due` is last and unused by the page, so a comma there is harmless.

### What reads them

- **The schedule page** — `docs/_layouts/schedule.html` renders the units, weeks, stations, and source materials. `docs/schedule.md` is front matter only. Slide links are derived from the week number and appear only for weeks whose deck has been built.
- **The syllabus** — `syllabus_source/schedule.lua` expands the empty ` ```schedule ` block in `syllabus.md` into a per-week table, merging each week's two meetings and keeping only top-level topics.

Other publishing sources:

- Edit `syllabus_source/syllabus.md`, then run `syllabus_source/build.sh` to publish HTML and PDF versions under `docs/syllabus/`.
- Edit the Quarto decks under `docs/slides/`. GitHub Actions builds the slide HTML on pushes to `main`; run `docs/slides/build.sh` locally when you want to preview changes or generate PDFs.

- The "read a book" assignment pages are published from `docs/read-a-book/*.md` (each one records the `read-a-book/` file it came from in its front matter). Out-of-class exercise pages work the same way, from `docs/exercises/*.md`.
- Book gallery covers are self-hosted in `docs/assets/book-cover-cache/`. `books.csv` keeps the original Bookshop URLs as the provenance record; run `python3 docs/fetch-book-covers.py` after adding a book to download its cover and point `books-data.js` at the local copy.

Previewing the site locally:

```bash
cd docs
bundle install          # first time only, or after Gemfile changes
bundle exec jekyll serve # then open http://127.0.0.1:4000
```

`jekyll serve` rebuilds on save, so edits to the two schedule sources, the layouts, or the CSS show up on refresh. Anything that goes through a build script — the syllabus (`syllabus_source/build.sh`) and the slide decks (`docs/slides/build.sh`) — needs that script run first; Jekyll only serves what those scripts have already written into `docs/`. Add `--port 4011` (or any free port) to run alongside another Jekyll site. Output lands in `docs/_site/`, which is gitignored.

![Trolley to 74181](docs/assets/trolley-to-74181.png)
The trolley problem is only the beginning.
