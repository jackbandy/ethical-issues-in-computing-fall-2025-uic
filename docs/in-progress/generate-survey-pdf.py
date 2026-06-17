#!/usr/bin/env python3
"""
Generate a 16-page PDF of the survey with 8 randomized versions (2 pages each).
Usage: python3 generate-survey-pdf.py
Output: survey-versions.pdf
"""

import random
import re
from pathlib import Path

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib import colors
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    PageTemplate,
    Paragraph,
    Spacer,
    PageBreak,
    Table,
    TableStyle,
)

# ── Config ──────────────────────────────────────────────────────────────────
INPUT_MD = Path(__file__).parent / "survey-questions.md"
OUTPUT_PDF = Path(__file__).parent / "survey-multiple-versions.pdf"
NUM_VERSIONS = 8
RANDOM_SEED = 42  # remove or change for different shuffles each run

# ── Parse questions from markdown ───────────────────────────────────────────
def load_questions(path: Path) -> list[str]:
    questions = []
    for line in path.read_text(encoding="utf-8").splitlines():
        # Match unordered list items (* or -)
        m = re.match(r"^[\*\-]\s+(.+)", line)
        if m:
            questions.append(m.group(1).strip())
    return questions

# ── Styles ───────────────────────────────────────────────────────────────────
def make_styles():
    base = getSampleStyleSheet()
    title_style = ParagraphStyle(
        "SurveyTitle",
        parent=base["Heading1"],
        fontSize=13,
        leading=16,
        spaceAfter=0,
        textColor=colors.HexColor("#333333"),
    )
    subtitle_style = ParagraphStyle(
        "SurveySubtitle",
        parent=base["Normal"],
        fontSize=8.5,
        leading=11,
        spaceAfter=16,
        textColor=colors.HexColor("#555555"),
    )
    question_style = ParagraphStyle(
        "Question",
        parent=base["Normal"],
        fontSize=12,
        leading=15,
        spaceAfter=14,
        leftIndent=0,
    )
    version_style = ParagraphStyle(
        "VersionLabel",
        parent=base["Normal"],
        fontSize=8,
        leading=16,  # match title leading so they align vertically
        spaceAfter=0,
        textColor=colors.HexColor("#888888"),
        alignment=TA_RIGHT,
    )
    return title_style, subtitle_style, question_style, version_style

# ── Page header (title left, version right on same line) ─────────────────────
def page_header(title_text: str, version_text: str, title_s, version_s, doc_width: float):
    row = [[Paragraph(title_text, title_s), Paragraph(version_text, version_s)]]
    t = Table(row, colWidths=[doc_width * 0.65, doc_width * 0.35])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    return t

# ── Build PDF ─────────────────────────────────────────────────────────────────
def build_pdf(questions: list[str], output: Path):
    rng = random.Random(RANDOM_SEED)

    title_s, subtitle_s, q_s, version_s = make_styles()

    doc = BaseDocTemplate(
        str(output),
        pagesize=letter,
        leftMargin=0.85 * inch,
        rightMargin=0.85 * inch,
        topMargin=0.75 * inch,
        bottomMargin=0.65 * inch,
    )
    frame = Frame(
        doc.leftMargin, doc.bottomMargin,
        doc.width, doc.height,
        id="body",
    )
    doc.addPageTemplates([PageTemplate(id="main", frames=frame)])

    story = []
    header_text = "Spring 2026 Attitudes Intake Survey"
    instructions = (
        "Earlier this semester, you rated your agreement with each statement on a 1–5 scale. "
        "(Strongly Disagree to Strongly Agree)"
    )

    for v in range(1, NUM_VERSIONS + 1):
        shuffled = questions[:]
        rng.shuffle(shuffled)
        half = len(shuffled) // 2
        first_half = shuffled[:half]
        second_half = shuffled[half:]

        # ── Page 1 of this version ──
        story.append(page_header(header_text, f"Version {v} · Page 1 of 2", title_s, version_s, doc.width))
        story.append(Paragraph(instructions, subtitle_s))

        for i, q in enumerate(first_half, start=1):
            story.append(Paragraph(f"<b>{i}.</b> {q}", q_s))

        story.append(PageBreak())

        # ── Page 2 of this version ──
        story.append(page_header(header_text, f"Version {v} · Page 2 of 2", title_s, version_s, doc.width))
        story.append(Spacer(1, 0.12 * inch))

        for i, q in enumerate(second_half, start=len(first_half) + 1):
            story.append(Paragraph(f"<b>{i}.</b> {q}", q_s))

        if v < NUM_VERSIONS:
            story.append(PageBreak())

    doc.build(story)
    print(f"Saved {NUM_VERSIONS} versions ({NUM_VERSIONS * 2} pages) → {output}")

if __name__ == "__main__":
    questions = load_questions(INPUT_MD)
    if not questions:
        raise SystemExit("No questions found in survey-questions.md")
    print(f"Loaded {len(questions)} questions")
    build_pdf(questions, OUTPUT_PDF)

