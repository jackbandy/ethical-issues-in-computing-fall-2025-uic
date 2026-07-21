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

SOURCE_PREFIXES = ("source:", "sources:", "see also:", "related:",
                   "image source:", "text source:", "older source:")


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


def convert_markdown(text, images):
    """Minimal markdown -> HTML for the subset these dilemma files use:
    headings, paragraphs, ordered/unordered lists, ---, links, images,
    bold, italics. Single newlines inside a paragraph become <br>."""
    out = []
    paragraph = []
    list_tag = None

    def flush_paragraph():
        if paragraph:
            classes = ' class="dilemma-source"' if paragraph[0].strip().lower().startswith(SOURCE_PREFIXES) else ""
            out.append(f"<p{classes}>" + "<br>\n".join(paragraph) + "</p>")
            paragraph.clear()

    def close_list():
        nonlocal list_tag
        if list_tag:
            out.append(f"</{list_tag}>")
            list_tag = None

    for raw in text.splitlines():
        line = raw.rstrip()
        stripped = line.strip()
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
        if path.name == "README.md":
            continue
        meta, body = parse_frontmatter(path.read_text(encoding="utf-8"))
        if not meta.get("summary"):
            missing_summaries.append(path.name)
            continue
        title_match = re.search(r'^#\s+(.*)$', body, re.MULTILINE)
        title = title_match.group(1).strip() if title_match else path.stem
        if title_match:
            body = body[:title_match.start()] + body[title_match.end():]
        dilemmas.append({
            "slug": path.stem,
            "title": title,
            "summary": meta["summary"],
            "html": convert_markdown(body.strip(), images),
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


if __name__ == "__main__":
    main()
