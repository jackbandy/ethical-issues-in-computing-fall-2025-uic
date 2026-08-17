#!/usr/bin/env python3
"""Generate docs/dilemmas-data.js from the .md files in this folder.

The .md files are the source of truth. Each needs a frontmatter block:

    ---
    summary: One-line description shown on the card.
    ---

Run after adding or editing a dilemma:

    python3 dilemmas/build-dilemmas-data.py

Local images referenced by a dilemma (e.g. the trolley diagrams) are copied
to docs/images/dilemmas/ and their src rewritten accordingly.

Besides docs/dilemmas-data.js, this also writes:
  - docs/dilemmas/<slug>.html  — one Jekyll page per dilemma (/dilemmas/<slug>/)
  - docs/_includes/dilemmas-about.html — the "Read more" blurb, rendered from
    dilemmas/dilemmas-about.md
"""
import html
import json
import re
import shutil
from pathlib import Path

DILEMMAS_DIR = Path(__file__).resolve().parent
DOCS_DIR = DILEMMAS_DIR.parent / "docs"
IMAGES_DIR = DOCS_DIR / "images" / "dilemmas"
OUTPUT = DOCS_DIR / "dilemmas-data.js"
# One Jekyll page per dilemma is generated here (served at /dilemmas/<slug>/).
PAGES_DIR = DOCS_DIR / "dilemmas"
# The "Read more" blurb on the dilemmas index. Source markdown lives alongside
# the dilemmas; its rendered HTML is written to this include for dilemmas.html.
ABOUT_SOURCE = DILEMMAS_DIR / "dilemmas-about.md"
ABOUT_OUTPUT = DOCS_DIR / "_includes" / "dilemmas-about.html"

SOURCE_PREFIXES = ("source:", "sources:", "see also:", "related:",
                   "image source:", "text source:", "older source:")
# Lines that begin the "sources and context" part. A "Context:" paragraph is
# usually preceded by a source line, but it can also come first — either way it
# belongs behind the toggle. It is not styled as a source, hence the separate
# tuple.
CONTEXT_PREFIXES = SOURCE_PREFIXES + ("context:",)


def parse_frontmatter(text):
    if not text.startswith("---\n"):
        return {}, text
    end = text.find("\n---", 4)
    if end == -1:
        return {}, text
    meta = {}
    for line in text[4:end].splitlines():
        if ":" in line:
            key, value = line.split(":", 1)
            meta[key.strip()] = value.strip()
    return meta, text[end + 4:].lstrip("\n")


def split_context(body):
    """Split the body into the dilemma itself and its "sources and context":
    everything from the first source-prefixed line (or the first sub-heading,
    e.g. "## A note on the real case") to the end. The context part is shown
    behind a "Show sources and context" toggle on the dilemma page."""
    lines = body.splitlines()
    split = None
    for i, raw in enumerate(lines):
        stripped = raw.strip()
        if (stripped.lstrip("_*").lower().startswith(CONTEXT_PREFIXES)
                or re.match(r'#{2,6}\s', stripped)):
            split = i
            break
    if split is None:
        return body, ""
    # Pull an immediately preceding hr / blank lines into the hidden part so
    # the visible body doesn't end with a dangling rule, then drop them.
    while split > 0 and (not lines[split - 1].strip()
                         or re.fullmatch(r'-{3,}', lines[split - 1].strip())):
        split -= 1
    context = lines[split:]
    while context and (not context[0].strip()
                       or re.fullmatch(r'-{3,}', context[0].strip())):
        context.pop(0)
    return "\n".join(lines[:split]).rstrip(), "\n".join(context).strip()


def convert_inline(text, images):
    """Inline markdown -> HTML. `text` must already be HTML-escaped."""
    tokens = []

    def stash(fragment):
        tokens.append(fragment)
        return f"\x00{len(tokens) - 1}\x00"

    def image_repl(m):
        alt, src = m.group(1), m.group(2)
        if not src.startswith(("http://", "https://", "/")):
            images.add(src)
            src = f"/images/dilemmas/{src}"
        return stash(f'<img src="{src}" alt="{alt}">')

    def link_repl(m):
        label, url = m.group(1), m.group(2)
        return stash(f'<a href="{url}" target="_blank" rel="noopener">{emphasize(label)}</a>')

    def emphasize(text):
        text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
        text = re.sub(r'\*([^*\n]+)\*', r'<em>\1</em>', text)
        return re.sub(r'(?<![\w\x00])_([^_\n]+)_(?![\w\x00])', r'<em>\1</em>', text)

    text = re.sub(r'!\[([^\]]*)\]\(([^)\s]+)(?:\s+&quot;[^&]*&quot;)?\)', image_repl, text)
    text = re.sub(r'\[([^\]]+)\]\(([^)\s]+)\)', link_repl, text)
    text = emphasize(text)
    text = re.sub(r'\x00(\d+)\x00', lambda m: tokens[int(m.group(1))], text)
    return text


def split_row(line):
    """Cells of a markdown table row, dropping the leading/trailing pipes."""
    return [c.strip() for c in line.strip().strip("|").split("|")]


def is_table_divider(line):
    cells = split_row(line)
    return bool(cells) and all(re.fullmatch(r':?-{3,}:?', c) for c in cells)


def cell_alignments(divider):
    aligns = []
    for c in split_row(divider):
        left, right = c.startswith(":"), c.endswith(":")
        aligns.append("center" if left and right else
                      "right" if right else
                      "left" if left else None)
    return aligns


def convert_cell(text, images, aligns, index, tag):
    html_out = convert_inline(html.escape(text), images)
    # <br> is the only raw HTML these tables use; unescape it so payoff cells
    # can stack two lines.
    html_out = html_out.replace("&lt;br&gt;", "<br>").replace("&lt;br/&gt;", "<br>")
    align = aligns[index] if index < len(aligns) else None
    attr = f' style="text-align: {align}"' if align else ""
    return f"<{tag}{attr}>{html_out}</{tag}>"


def convert_table(rows, images):
    """rows: header line, divider line, then zero or more body lines."""
    aligns = cell_alignments(rows[1])
    out = ['<div class="dilemma-table-wrap">', "<table>", "<thead>", "<tr>"]
    for i, cell in enumerate(split_row(rows[0])):
        out.append(convert_cell(cell, images, aligns, i, "th"))
    out += ["</tr>", "</thead>", "<tbody>"]
    for row in rows[2:]:
        out.append("<tr>")
        for i, cell in enumerate(split_row(row)):
            # A leading empty cell in a payoff matrix labels the row, so keep
            # the first column as a header cell when it carries text.
            tag = "th" if i == 0 and cell else "td"
            out.append(convert_cell(cell, images, aligns, i, tag))
        out.append("</tr>")
    out += ["</tbody>", "</table>", "</div>"]
    return "\n".join(out)


def convert_markdown(text, images):
    """Minimal markdown -> HTML for the subset these dilemma files use:
    headings, paragraphs, ordered/unordered lists, tables, ---, links, images,
    bold, italics. Single newlines inside a paragraph become <br>."""
    out = []
    paragraph = []
    list_tag = None

    def flush_paragraph():
        if paragraph:
            first = re.sub(r'<[^>]+>', '', paragraph[0]).strip().lower()
            classes = ' class="dilemma-source"' if first.startswith(SOURCE_PREFIXES) else ""
            out.append(f"<p{classes}>" + "<br>\n".join(paragraph) + "</p>")
            paragraph.clear()

    def close_list():
        nonlocal list_tag
        if list_tag:
            out.append(f"</{list_tag}>")
            list_tag = None

    lines = text.splitlines()
    i = 0
    while i < len(lines):
        line = lines[i].rstrip()
        stripped = line.strip()
        i += 1
        if not stripped:
            flush_paragraph()
            close_list()
            continue
        if re.fullmatch(r'-{3,}', stripped):
            flush_paragraph()
            close_list()
            out.append("<hr>")
            continue
        heading = re.match(r'(#{1,6})\s+(.*)', stripped)
        if heading:
            flush_paragraph()
            close_list()
            level = len(heading.group(1))
            out.append(f"<h{level}>{convert_inline(html.escape(heading.group(2)), images)}</h{level}>")
            continue
        if (stripped.startswith("|") and i < len(lines)
                and is_table_divider(lines[i])):
            flush_paragraph()
            close_list()
            rows = [stripped, lines[i].strip()]
            i += 1
            while i < len(lines) and lines[i].strip().startswith("|"):
                rows.append(lines[i].strip())
                i += 1
            out.append(convert_table(rows, images))
            continue
        ordered = re.match(r'\d+\.\s+(.*)', stripped)
        unordered = re.match(r'[*-]\s+(.*)', stripped)
        if ordered or unordered:
            flush_paragraph()
            tag = "ol" if ordered else "ul"
            if list_tag != tag:
                close_list()
                out.append(f"<{tag}>")
                list_tag = tag
            item = (ordered or unordered).group(1)
            out.append(f"<li>{convert_inline(html.escape(item), images)}</li>")
            continue
        close_list()
        paragraph.append(convert_inline(html.escape(stripped), images))
    flush_paragraph()
    close_list()
    return "\n".join(out)


def main():
    dilemmas = []
    images = set()
    missing_summaries = []

    for path in sorted(DILEMMAS_DIR.glob("*.md")):
        if path.name in ("README.md", ABOUT_SOURCE.name):
            continue
        meta, body = parse_frontmatter(path.read_text(encoding="utf-8"))
        if not meta.get("summary"):
            missing_summaries.append(path.name)
            continue
        title_match = re.search(r'^#\s+(.*)$', body, re.MULTILINE)
        title = title_match.group(1).strip() if title_match else path.stem
        if title_match:
            body = body[:title_match.start()] + body[title_match.end():]
        main_body, context_body = split_context(body.strip())
        dilemmas.append({
            "slug": path.stem,
            "title": title,
            "summary": meta["summary"],
            "html": convert_markdown(main_body, images),
            "context": convert_markdown(context_body, images) if context_body else "",
        })

    if missing_summaries:
        raise SystemExit(f"Missing 'summary:' frontmatter in: {', '.join(missing_summaries)}")

    dilemmas.sort(key=lambda d: d["title"].lower())

    IMAGES_DIR.mkdir(parents=True, exist_ok=True)
    for name in sorted(images):
        src = DILEMMAS_DIR / name
        if not src.exists():
            raise SystemExit(f"Referenced image not found: {name}")
        shutil.copy2(src, IMAGES_DIR / name)
        print(f"copied image: {name}")

    payload = json.dumps(dilemmas, indent=2, ensure_ascii=False)
    OUTPUT.write_text(
        "// Generated by dilemmas/build-dilemmas-data.py — do not edit by hand.\n"
        f"const dilemmas = {payload};\n",
        encoding="utf-8",
    )
    print(f"wrote {OUTPUT.relative_to(DOCS_DIR.parent)} ({len(dilemmas)} dilemmas)")

    write_about()
    write_pages(dilemmas)


def write_about():
    """Render the 'Read more' blurb to docs/_includes/dilemmas-about.html."""
    _, body = parse_frontmatter(ABOUT_SOURCE.read_text(encoding="utf-8"))
    html_out = convert_markdown(body.strip(), set())
    ABOUT_OUTPUT.write_text(
        "<!-- Generated from dilemmas/dilemmas-about.md — do not edit by hand. -->\n"
        + html_out + "\n",
        encoding="utf-8",
    )
    print(f"wrote {ABOUT_OUTPUT.relative_to(DOCS_DIR.parent)}")


def write_pages(dilemmas):
    """Write one Jekyll page per dilemma to docs/dilemmas/<slug>.html.

    Each page uses the `dilemma` layout and carries the pre-rendered body as
    its content. The whole directory is regenerated so removed dilemmas don't
    leave stale pages behind."""
    PAGES_DIR.mkdir(parents=True, exist_ok=True)
    for stale in PAGES_DIR.glob("*.html"):
        stale.unlink()

    for d in dilemmas:
        # frontmatter values are single-line here, so JSON-quoting keeps any
        # colons or quotes in the title/summary safe for YAML.
        # Jekyll requires frontmatter at the very top, so the "generated"
        # note lives just after it.
        front = (
            "---\n"
            "layout: dilemma\n"
            f"permalink: /dilemmas/{d['slug']}/\n"
            f"title: {json.dumps(d['title'], ensure_ascii=False)}\n"
            f"summary: {json.dumps(d['summary'], ensure_ascii=False)}\n"
            "---\n"
            "<!-- Generated by dilemmas/build-dilemmas-data.py — do not edit by hand. -->\n"
        )
        content = d["html"]
        if d["context"]:
            content += (
                '\n<p class="context-toggle-row"><button type="button" class="context-toggle"'
                ' aria-expanded="false" aria-controls="dilemmaContext">'
                "Show sources and context</button></p>\n"
                '<div class="dilemma-context" id="dilemmaContext" hidden>\n'
                + d["context"]
                + "\n</div>"
            )
        (PAGES_DIR / f"{d['slug']}.html").write_text(
            front + content + "\n",
            encoding="utf-8",
        )
    print(f"wrote {len(dilemmas)} pages to {PAGES_DIR.relative_to(DOCS_DIR.parent)}/")


if __name__ == "__main__":
    main()
