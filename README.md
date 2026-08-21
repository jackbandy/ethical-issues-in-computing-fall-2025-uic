# 🟦 Blue Line Ethics 🟦
## Ethical Issues in Computing (CS 377), UIC

![Trolley to 74181](docs/assets/trolley-to-74181.png)
The trolley problem is only the beginning.

These are the materials for a section of CS 377 (Ethical Issues in Computing) at the University of Illinois Chicago. This repository is intended to be a central and accessible source for slides, syllabus, in-class dilemmas, out-of-class exercises, and the "read a book" exercises.

The public-facing site, [doethics.fun](https://doethics.fun/), lives in the `docs/` folder and is deployed via GitHub Pages.

## Overview

This repo holds the raw files (mostly markdown) that get assembled and published automatically. The goal is to keep materials portable, accessible, and **easily editable**: edit a text file, commit, and push, then everything else happens on its own.

| What | Edit this | Shows up at |
| --- | --- | --- |
| Slides | `docs/slides/week*.md` | [/slides/](https://doethics.fun/slides/) |
| Syllabus text | `syllabus_source/syllabus.md` | [/syllabus/](https://doethics.fun/syllabus/) |
| Week-by-week schedule | `docs/_includes/schedule.csv` | [/schedule.html](https://doethics.fun/schedule.html) + syllabus |
| What happens each day | `docs/_includes/schedule-topics.md` | [/schedule.html](https://doethics.fun/schedule.html) + syllabus |
| Dilemmas | `dilemmas/*.md` | [/dilemmas/](https://doethics.fun/dilemmas/) |
| FAQ | `docs/faq.md` | [/faq.html](https://doethics.fun/faq.html) |
| Reading assignment | `read-a-book/*.md` | [/read-a-book/](https://doethics.fun/read-a-book/) |
| Out-of-class exercises | `out-of-class-exercises/*.md` | `/exercises/` |

To preview the site locally:

```bash
cd docs
bundle install          # first time only, or after Gemfile changes
bundle exec jekyll serve # then open http://127.0.0.1:4000
```

Technical details of each build are in the collapsible sections at the bottom.

## Course topics

The semester generally proceeds in three units, one for each major segment/branch of the Blue Line, with a station for each class meeting:

* **Unit 1: Ethical Theories** 🟦 Forest Park Branch 🟦
  * Virtue ethics
  * Deontological ethics
  * Utilitarian ethics
  * Care ethics
* **Unit 2: Stories** 🟦 Milwaukee–Dearborn Subway 🟦
  * Short stories: ("Here and Now," "Message in a Bottle," "Codename Delphi", more)
  * Famous case studies (e.g. Therac-25)
* **Unit 3: Contemporary Issues** 🟦 O'Hare Branch 🟦
  * Algorithmic feeds, ranking, and content moderation
  * Inequality, justice, and the digital divide
  * Privacy, contextual integrity, and privacy in data
  * Facial recognition and fairness
  * Computing and war
  * Medical technology and cybersecurity
  * Large language models
  * Intellectual property and enshittification
  * Nudges and dark design patterns
  * Book presentations

The "ground truth" for the week-by-week schedule is [`docs/_includes/schedule.csv`](docs/_includes/schedule.csv) and [`docs/_includes/schedule-topics.md`](docs/_includes/schedule-topics.md) — see the schedule section below.

## Note on AI/LLM use

The `sandbox/` folder is a quarantine zone for anything modified by an AI/LLM system. My philosophy on LLM usage is [here](https://jackbandy.com/text/llm-code-philosophy.html), but in short: I use them sparingly, and with caution, sort of like a credit card. If I do not have sufficient "money" (understanding) to "pay back" (explain, modify, rewrite, etc.) what I "buy" (generate), I probably should use a different tool, or do some learning.

I do not use LLMs to draft or design the teaching materials themselves. I do use them for the supporting code that serves those materials — Jekyll workflows, the build scripts, formatting, and much of the HTML/CSS on this site.

So for example, while would not prompt an LLM with "draft the slides for week 4," I sometimes give prompts like "Add a slide in week 4 with the picture at https://commons.wikimedia.org/wiki/File:Therac_25.png and add two blank placeholder slides with 'Therac-25' as the title"

Files that were substantially modified by an LLM say so in a header, e.g. `NOTICE: This file modified by an LLM coding system...` or something like that.

I willingly take responsibility for what is in this repository, including files which were modified by LLMs. Any issues are my fault (please contact me if you notice any 🙂).

All other materials hand-typed with 🩵 in Chicago, IL.

## License

By default, the materials here are shared under [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-nc-sa/4.0/) (CC BY-NC-SA 4.0).

Their purpose is to educate, so feel free to use them, remix them, teach with them, etc., given:

- **Attribution** — credit the source, e.g. *"Blue Line Ethics," https://github.com/jackbandy/ethical-issues-in-computing-uic*
  - Of course, credit the upstream source if you're using something that this repo got from somewhere else
- **NonCommercial** — not for commercial / profit-driven use. plz.
- **ShareAlike** — distribute your adaptations under this license

**Third-party materials keep their own terms.** The decks include photos, figures, and diagrams from other people under their own licenses (various CC BY-SA versions, a few images used under fair use). Those are credited on each deck's Sources slide and are not covered by the blanket license above.

---

# Technical details

<details>
<summary><strong>Repository layout</strong></summary>

```text
ethical-issues-in-computing-uic/
├── .github/workflows/           # build-slides.yml, build-dilemmas.yml
├── docs/                        # Public-facing site root (GitHub Pages)
│   ├── index.html               # Landing page
│   ├── schedule.md              # Schedule page (front matter only)
│   ├── faq.md                   # FAQ source (Jekyll renders it to /faq.html)
│   ├── books.html               # Book gallery
│   ├── dilemmas.html            # Dilemma gallery
│   ├── _config.yml              # Jekyll config
│   ├── _includes/               # schedule.csv, schedule-topics.md, nav, masthead, footer, head tags
│   ├── _layouts/                # page, schedule, dilemma, exercise, read-a-book
│   ├── css/                     # Shared stylesheets
│   ├── assets/, images/         # Photos, figures, station maps
│   ├── assets/branding/         # Favicon + preview card, and the script that builds them
│   ├── favicon.ico, site.webmanifest  # Generated by assets/branding/sandbox/make_branding.py
│   ├── slides/                  # Quarto decks (week*.md), theme, build tooling
│   ├── syllabus/                # Generated syllabus output
│   ├── dilemmas/, exercises/    # Generated per-item pages
│   ├── read-a-book/             # Reading-assignment pages
│   ├── timer/, in-progress/     # Small in-class web tools
│   └── CNAME                    # domain config
├── dilemmas/                    # Dilemma .md sources + build-dilemmas-data.py
├── read-a-book/                 # Reading-assignment sources
├── out-of-class-exercises/      # Exercise sources and worksheet PDFs
├── syllabus_source/             # Syllabus markdown, pandoc templates, lua filters
├── syllabus_archive/            # Previous semesters' schedules
├── galleries/, misc/            # Supporting one-offs and scratch analysis
├── sandbox/                     # Quarantine for LLM-modified or experimental content
├── TODO.md                      # Working notes and planning
└── README.md                    # This file
```

</details>

<details>
<summary><strong>The schedule (two files)</strong></summary>

The published schedule is at [doethics.fun/schedule.html](https://doethics.fun/schedule.html). No table is ever written by hand, as the schedule page and the syllabus both read two files:
- a spreadsheet-shaped calendar
- a markdown file with day-by-day details

### `docs/_includes/schedule.csv` — the calendar

One row per class meeting. This is the file to change when the course moves to a new semester.

| Column | Notes |
|:--|:--|
| `Unit`, `Branch` | Repeated on every row of the unit. |
| `Week` | Groups the rows. Also the deck number — week *N* is deck *N*. |
| `Date` | ISO `YYYY-MM-DD`; the page formats it as "Monday, August 24, 2026". |
| `Station` | Blank on no-class days, which drops the 🟦 marker. |
| `Due` | Work due that day. Feeds the syllabus's "Readings / Work Due" column. |
| `Notes` | Scratch column (nothing publishes it at the moment) |
| `Topic` | One short phrase summarizing the day. Feeds the Topics column of the [slides index](https://doethics.fun/slides/); blank on no-class days. |

**Add new columns only at the end.** `syllabus_source/schedule.lua` validates the header positionally, and the schedule layout addresses the first five columns by index, so inserting a column in the middle breaks both.

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

A few notes on this setup:
- `Week N, Day M` is the join key
- a new semester's dates change in the CSV (not the md file)
- Bullets above `### Sources` are the day's topics
- everything below becomes the collapsed "Source materials" list
- Both files sit in `_includes/` because `{% include %}` is the only way to give Liquid their raw text

### What reads them

- **The schedule page** — `docs/_layouts/schedule.html` renders the units, weeks, stations, and source materials. `docs/schedule.md` is front matter only. Slide links are derived from the week number and appear only for weeks whose deck has been built.
- **The syllabus** — `syllabus_source/schedule.lua` expands the empty ` ```schedule ` block in `syllabus.md` into a per-week table, merging each week's two meetings and keeping only top-level topics.
- **The slides index** — `docs/slides/sync_slide_index.py` reads the `Station` and `Topic` columns so every class meeting gets a stop on that page, including the ones with no slides.

</details>

<details>
<summary><strong>Slide build</strong></summary>

The decks are written in Markdown and rendered to Reveal.js HTML with Quarto:

```text
 [docs/slides/week0 ... week11  (.md)]
                    |
          +---------+---------+
          |                   |
          v                   v
 [Reveal.js HTML]          [PDF]
```

- Decks are `docs/slides/week0.md` onward. Shared configuration (theme, footer, slide level) lives in `docs/slides/_metadata.yml` rather than in each file.
- `_metadata.yml` sets `slide-level: 2`, so `#` headings are section dividers — day title slides, `{.section-header}` topic dividers, and the closing sources slide — and `##` headings are the ordinary slides grouped under them.
- Every class day opens with a `# Title {.title-slide}` slide whose next line reads `CS 377, Week N, Day M 🟦 Station 🟦`, followed by a full-bleed station photo and a map of that week's stop from `docs/assets/blue-line-map-stops/`.
- Decks are configured with `embed-resources: true`, so each generated `.html` is self-contained and can be committed without a bulky `*_files/` directory.
- Slides use SVGs and other vector formats whenever possible.
- More complicated than Google Slides? Yes. Worth it for freedom, portability, accessibility, etc.? For now, yes.
- Edit the Quarto decks under `docs/slides/`. GitHub Actions builds the slide HTML on pushes to `main`; run `docs/slides/build.sh` locally when you want to preview changes or generate PDFs. PDFs are gitignored.
- `week0.md` is the starter deck — copy it when beginning a new week.

**The slides index.** `docs/slides/sync_slide_index.py` rewrites the generated blocks in `docs/slides/index.html` after rendering, so the decks stay the only place that wording is edited:

- one entry per class day, from the day's `CS 377, Week N, Day M 🟦 Station 🟦` subtitle line
- one topic bullet per `{.section-header}` heading, deep-linked to that slide (add `.no-index` to leave a header off the list)
- meetings the decks say nothing about still get a stop, from the schedule: a cancelled class shows the reason from `schedule-topics.md`, and a class whose slides are not written yet is marked "slides to come"
- the summary table's Topics column comes from the `Topic` column of `schedule.csv`
- do not hand-edit anything between the markers in `index.html` — it is overwritten on the next build

**To build slides locally:**

```bash
cd docs/slides
./build.sh                  # HTML only (default)
BUILD_PDFS=true ./build.sh  # Include PDFs
```

The local build requires Quarto, Node.js 22+, Python with PyMuPDF, and Chrome or Chromium. Set `CHROME` to a browser executable if it is not found automatically.

</details>

<details>
<summary><strong>Syllabus build</strong></summary>

Sources are in `syllabus_source/`; outputs go to `docs/syllabus/`.

```text
[syllabus_source/syllabus.md]
            |
            |  (pandoc + schedule.lua)
            |     docs/_includes/schedule.csv ------+
            |     docs/_includes/schedule-topics.md +--> per-week table
            |
   +--------+--------+
   v                 v
[template.html]  [template.tex]
   v                 v
[docs/syllabus/index.html]  [docs/syllabus/syllabus.pdf]
```

- Edit `syllabus_source/syllabus.md`, then run `syllabus_source/build.sh` to publish HTML and PDF versions under `docs/syllabus/`.
- `schedule.lua` expands the empty ` ```schedule ` block into the per-week table, so no schedule table is written by hand.
- The build needs `pandoc` and `xelatex`.
- To preview locally, run `syllabus_source/build.sh` before `jekyll serve` — a fresh clone will have no `docs/syllabus/` until the build script runs.

</details>

<details>
<summary><strong>Dilemmas build</strong></summary>

The `.md` files in `dilemmas/` are the source of truth. Each one needs a front matter block with a `summary:` line, which becomes the card text in the gallery.

`dilemmas/build-dilemmas-data.py` (standard library only) generates:

- `docs/dilemmas-data.js` — the gallery data
- `docs/dilemmas/<slug>.html` — one Jekyll page per dilemma, published at `/dilemmas/<slug>/`
- `docs/_includes/dilemmas-about.html` — the "Read more" blurb
- `docs/images/dilemmas/` — local images copied out of the sources, with their `src` rewritten

Run it after adding or editing a dilemma:

```bash
python3 dilemmas/build-dilemmas-data.py
```

`build-dilemmas.yml` also runs it on pushes to `main` and commits the output.

</details>

<details>
<summary><strong>Other published content</strong></summary>

- The "read a book" assignment pages are published from `docs/read-a-book/*.md` (each one records the `read-a-book/` file it came from in its front matter). Out-of-class exercise pages work the same way, from `docs/exercises/*.md`.
- Book gallery covers are self-hosted in `docs/assets/book-cover-cache/`. `books.csv` keeps the original Bookshop URLs as the provenance record; run `python3 docs/fetch-book-covers.py` after adding a book to download its cover and point `books-data.js` at the local copy.

</details>

<details>
<summary><strong>Site layouts and nav</strong></summary>

The header/nav (`docs/_includes/site-nav.html`), masthead, and footer each live in exactly one file, so every page reads the same. Pass `nav_current` from a page to mark its link as active; it accepts `home`, `schedule`, `syllabus`, `slides`, `dilemmas`, `books`, or `faq`.

Layouts in `docs/_layouts/`:

- `page.html` — plain prose pages. This is the default choice for a new page, and what `docs/faq.md` uses:

  ```yaml
  ---
  layout: page
  title: FAQ
  nav_current: faq
  ---
  ```

- `schedule.html` — the schedule page specifically; it renders the two schedule sources itself.
- `dilemma.html`, `exercise.html`, `read-a-book.html` — the generated per-item pages.

`docs/index.html`, `docs/books.html`, and `docs/slides/index.html` are standalone HTML with their own `<head>`, since each carries page-specific meta or scripts.

</details>

<details>
<summary><strong>Previewing the site locally</strong></summary>

```bash
cd docs
bundle install          # first time only, or after Gemfile changes
bundle exec jekyll serve # then open http://127.0.0.1:4000
```

`jekyll serve` rebuilds on save, so edits to the two schedule sources, the layouts, or the CSS show up on refresh. Anything that goes through a build script — the syllabus (`syllabus_source/build.sh`), the slide decks (`docs/slides/build.sh`), and the dilemmas (`dilemmas/build-dilemmas-data.py`) — needs that script run first; Jekyll only serves what those scripts have already written into `docs/`. Add `--port 4011` (or any free port) to run alongside another Jekyll site. Output lands in `docs/_site/`, which is gitignored.

The includes are assembled by Jekyll, so a plain static file server will show `{% include ... %}` as literal text — use `bundle exec jekyll serve`.

</details>
