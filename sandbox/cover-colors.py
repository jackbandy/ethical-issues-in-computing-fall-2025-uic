#!/usr/bin/env python3
"""Give every book in the gallery the dominant color of its cover.

The gallery draws a placeholder block for each book while "Show Covers" is off.
A flat gray told you nothing; the jacket's dominant color makes the shelf
recognizable at a glance — pink for Severance, near-black for Meme Wars, pale
gray for Do Androids Dream of Electric Sheep.

This reads the covers already cached in docs/assets/book-cover-cache/ (put
there by docs/fetch-book-covers.py) and writes a `color:` field into
docs/books-data.js.

Run it from anywhere:

    python3 sandbox/cover-colors.py            # fill in colors that are missing
    python3 sandbox/cover-colors.py --force    # recompute every color

Like the `Image:` paths, `color:` is derived from the cover art rather than
entered by hand, so this script owns that field. Run it again after adding
books.

NOTICE: this file was largely written by an LLM (Claude Code).
"""

import argparse
import re
import sys
from collections import Counter
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow is required: pip3 install Pillow")

# This script lives in sandbox/ (the quarantine zone for LLM-written code), so
# it reaches sideways into docs/ for the gallery data and the cached covers.
DOCS = Path(__file__).resolve().parent.parent / "docs"
DATA_PATH = DOCS / "books-data.js"
COVER_DIR = DOCS / "assets" / "book-cover-cache"

# Palette size for the octree quantizer. Small enough that flat jacket areas
# collapse into one bucket, large enough to keep a second color in reserve.
NUM_BUCKETS = 8
# Anything brighter than this in every channel reads as "white paper".
WHITE_FLOOR = 235
# A white bucket only wins if it really is most of the jacket, rather than a
# scan margin outvoting the art.
WHITE_SHARE = 0.60


def dominant_color(path):
    """Return (#rrggbb, share) for the most prevalent color in a cover."""
    im = Image.open(path).convert("RGB")

    # Trim a thin border: scans often carry a white edge that isn't the jacket.
    w, h = im.size
    margin = max(1, int(min(w, h) * 0.04))
    im = im.crop((margin, margin, w - margin, h - margin))
    im.thumbnail((100, 150))

    quantized = im.quantize(colors=NUM_BUCKETS, method=Image.FASTOCTREE)
    palette = quantized.getpalette()
    counts = Counter(quantized.getdata())
    total = sum(counts.values())

    ranked = [
        (n, (palette[i * 3], palette[i * 3 + 1], palette[i * 3 + 2]))
        for i, n in counts.most_common()
    ]

    def near_white(c):
        return min(c) > WHITE_FLOOR

    count, color = ranked[0]
    if near_white(color) and count / total < WHITE_SHARE:
        for n, c in ranked[1:]:
            if not near_white(c):
                count, color = n, c
                break

    return "#%02x%02x%02x" % color, count / total


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--force", action="store_true",
                    help="recompute colors that are already set")
    args = ap.parse_args()

    data = DATA_PATH.read_text()
    # Each entry: the ISBN identifies it, the Image line is what we colored.
    entries = re.findall(r'    ISBN: "(\d+)",', data)
    print(f"{len(entries)} books in books-data.js")

    added = skipped = missing = 0
    for isbn in entries:
        cover = COVER_DIR / f"{isbn}.jpg"
        if not cover.exists():
            print(f"  !! no cached cover for {isbn}")
            missing += 1
            continue

        block = re.search(
            rf'(    ISBN: "{isbn}",\n    Link: "[^"]*",\n    Image: "[^"]*",\n)'
            rf'(    color: "[^"]*",\n)?',
            data,
        )
        if block and block.group(2) and not args.force:
            skipped += 1
            continue

        hexcolor, share = dominant_color(cover)
        replacement = f'{block.group(1)}    color: "{hexcolor}",\n'
        data = data[:block.start()] + replacement + data[block.end():]
        print(f"  {hexcolor}  {share:4.0%}  {isbn}")
        added += 1

    DATA_PATH.write_text(data)
    print(f"colors: {added} written, {skipped} already set, {missing} without a cover")


if __name__ == "__main__":
    main()
