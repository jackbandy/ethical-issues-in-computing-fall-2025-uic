# Summer 2026 To-Do List

## GitHub Pages
- [ ] Seat shuffler needs way to mark absences / empty seats
- [x] Book gallery takes too long to load (remote images) — covers are now self-hosted in `docs/assets/book-cover-cache/`, fetched by `docs/fetch-book-covers.py`, and the grid lazy-loads
- [x] Convert schedule/home page to Jekyll / GitHub Pages — `docs/schedule.md` renders at `/schedule.html`
  - [x] Add navigation/index for all course materials — site menu in `docs/_includes/site-nav.html`
  - [ ] Link PDFs from pages
    - [ ] `docs/exercises/food-in-your-feed.md` links `../out-of-class-exercises/01-food-in-your-feed-worksheet.pdf`, which lives at the repo root, outside `docs/` — the link 404s on the published site
    - [ ] `docs/schedule.md` links `slides/weekN.pdf` for every week with a deck; none of those PDFs exist yet (see Slides)
    - [ ] Worksheet and dilemma PDFs are not linked at all
  - [ ] Verify source materials

## LaTeX Versions of Existing PDFs
Convert the PDFs to have markdown/LaTeX source files (similar to syllabus):
- [ ] `dilemmas/create-your-own-trolley-problem.pdf`
- [ ] `galleries/doll-gallery.pdf`
- [ ] `out-of-class-exercises/01-food-in-your-feed-worksheet.pdf`
- [ ] `out-of-class-exercises/make-up-sheets/01-ranking-spring-2026.pdf`
- [ ] `out-of-class-exercises/make-up-sheets/02-privacy-policy.pdf`
- [ ] `out-of-class-exercises/make-up-sheets/03-midpoint-check-in-spring-2026.pdf`
- [ ] `out-of-class-exercises/make-up-sheets/04-therac-25.pdf`
- [ ] `out-of-class-exercises/make-up-sheets/05-speculative-fiction.pdf`
- [ ] `out-of-class-exercises/make-up-sheets/06-license-analysis.pdf`
- [ ] Group exercises

## Out-of-Class Exercises
- [ ] Create pages for exercises that only exist as markdown:
  - [x] `02-online-account-biopsy.md`
  - [x] `03-online-account-rag-doll.md`
  - [x] `04-speculative-fiction.md`
  - [x] `05-fairness-definition.md`
  - [x] `06-personal-commitments.md`
  - [ ] `07-automated-decisions.md`

## Read-a-Book Materials
- [ ] Update book gallery
- [ ] Update prompts for book assignments
- [x] Create pages for read-a-book markdown files — published at `/read-a-book/`, sources in `docs/read-a-book/`:
  - [x] `01-select-a-book.md`
  - [x] `02-book-report.md`
  - [x] `03-book-presentation.md`
  - [x] `04-public-communication.md`
  - [x] `05-read-the-book.md`

## Slides
- [x] Fix timer embed in slides - added `data-external="1"` to the iframe in `week0.md`; Quarto skips embedding it and loads from jackbandy.com directly
- [ ] Point the "Embedded Web Page" timer slide in `week0.md` at `/timer/` like the "Discussion Template" slide below it — the jackbandy.com copy doesn't have the embed-aware styling (hidden footnotes, "Open in new tab" link)
- [ ] Tweak/polish the Visual Seat Shuffle embedding in `week0.md` (scale, layout, sizing)

### Review drafted decks
Every deck below is drafted in `docs/slides/weekN.md` and built to HTML. Each one
carries a `NOTICE: Draft from ...` comment naming the old PDF it came from, and
2–3 `Topic Title Placeholder` slides that still need real titles. Reviewing means:
replace the placeholders, check the draft against the week's topics on the
schedule, then drop the notice.
- [ ] Week 0: tech demo / course mechanics deck (no draft notice — written fresh)
- [ ] Week 1: Conocimiento warm-up; Virtue Ethics — from `01 Day 1, Day 2.pdf`
- [ ] Week 2: Deontological Ethics (Monday is MLK Day, no class) — from `03 Deontological Ethics.pdf`
- [ ] Week 3: Utilitarian Ethics; Care Ethics — from `05 Care Ethics.pdf`
- [ ] Week 4: Theory review; Ethics in Algorithmic Feeds — from `06 Theory Review.pdf`
- [ ] Week 5: Feeds and Content Moderation; Intro to Privacy — from `07b Moderating Feeds.pdf`
- [ ] Week 6: Privacy; "Here and Now" (Wednesday is asynchronous — SIGCSE) — from `09 Here and Now.pdf`
- [ ] Week 7: Inequality and Justice; Faces and Fairness — from `10 Message in a Bottle.pdf`
- [ ] Week 8: Computing and War; Medical tech; Intro to Cybersecurity — from `15 War.pdf`
- [ ] Week 9: Ethical Challenges from LLMs — from `17 Intro to LLMs.pdf`
- [ ] Week 10: Intellectual Property (both days) — from `19 Intellectual Property.pdf`
- [ ] Week 12: "Hooks" and "Nudges"; Presentation Tips — from `21 Nudges.pdf`

### Decks not yet drafted
- [ ] Week 16: Synthesis and conclusions — no `week16.md` yet
- Week 11 is spring vacation; weeks 13–15 are book presentations. No decks needed.

### Export
- [ ] Generate the slide PDFs — `BUILD_PDFS=true docs/slides/build.sh` (needs Node, Chrome, and PyMuPDF). `docs/schedule.md` already links them, so those links stay broken until this runs.
