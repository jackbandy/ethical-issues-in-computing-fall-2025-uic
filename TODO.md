# Summer 2026 To-Do List

## GitHub Pages
- [ ] Seat shuffler needs way to mark absences / empty seats
- [x] Book gallery takes too long to load (remote images) — covers are now self-hosted in `docs/assets/book-cover-cache/`, fetched by `docs/fetch-book-covers.py`, and the grid lazy-loads
- [x] Convert schedule/home page to Jekyll / GitHub Pages — `docs/schedule.md` renders at `/schedule.html`
  - [x] Add navigation/index for all course materials — site menu in `docs/_includes/site-nav.html`
  - [ ] Link PDFs from pages — slide PDFs and the syllabus PDF are linked; worksheet/dilemma PDFs are not
  - [ ] Verify source materials

## LaTeX Versions of Existing PDFs
Convert the PDFs to have markdown/LaTeX source files (similar to syllabus):
- [ ] `dilemmas/create-your-own-trolley-problem.pdf`
- [ ] `galleries/doll-gallery.pdf`
- [ ] `out-of-class-exercises/01-food-in-your-feed-worksheet.pdf`
- [ ] `out-of-class-exercises/make-up-sheets/midpoint-check-in-spring-2026.pdf`
- [ ] `out-of-class-exercises/make-up-sheets/ranking-spring-2026.pdf`
- [ ] `out-of-class-exercises/make-up-sheets/therac-25.pdf`
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
- [ ] Tweak/polish the Visual Seat Shuffle embedding in `week0.md` (scale, layout, sizing)
- [ ] Make slide PDFs for each week/unit
  - [ ] Week 1: Ethical Theories
  - [ ] Week 2: Ethical Theories
  - [ ] Week 3: Ethical Theories
  - [ ] Week 4: Algorithmic Feeds, Dark Patterns
  - [ ] Week 5: Digital Rights, Facial Recognition
  - [ ] Week 6: Algorithmic Fairness/Bias, Privacy Fundamentals
  - [ ] Week 7: Privacy, Intellectual Property
  - [ ] Week 8: Digital Inequality, Labor
  - [ ] Week 9: Large Language Models
  - [ ] Week 10: Big Tech
  - [x] Week 11: Student Presentations
  - [x] Week 12: Student Presentations
  - [x] Week 13: Student Presentations
  - [x] Week 14: Student Presentations
  - [ ] Week 15: Synthesis

