#!/usr/bin/env python3
"""Download the book-gallery cover images and point the gallery at local copies.

The covers used to be hotlinked from Bookshop's CDN, which meant the gallery
opened 70+ cross-origin requests before it could show anything. This script
fetches each cover once into docs/assets/book-cover-cache/<isbn>.jpg and rewrites the
`Image:` fields in books-data.js to those local paths.

Run it from anywhere:

    python3 docs/fetch-book-covers.py           # fetch what's missing, rewrite paths
    python3 docs/fetch-book-covers.py --force   # re-download every cover

books-data.js is the single source of truth for the gallery. Each entry keeps
its original Bookshop URL in `sourceImage:` — that field is the provenance
record and where this script looks for anything it hasn't downloaded yet, while
`Image:` holds the local path the page actually loads.

NOTICE: this file was largely written by an LLM (Claude Code).
"""

import argparse
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path

DOCS = Path(__file__).resolve().parent
DATA_PATH = DOCS / "books-data.js"
COVER_DIR = DOCS / "assets" / "book-cover-cache"
# Path as written into books-data.js, relative to books.html at the docs root.
COVER_HREF = "assets/book-cover-cache/{isbn}.jpg"

# Bookshop's CDN 403s the default urllib agent.
USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/120.0 Safari/537.36"
)


RECORD_FIELD = r'{field}:\s*"(?P<{field}>[^"]*)"'


def read_books():
    """Pull Title / ISBN / sourceImage out of each record in books-data.js."""
    text = DATA_PATH.read_text(encoding="utf-8")
    books = []
    for chunk in text.split("\n  {")[1:]:
        book = {}
        for field in ("Title", "ISBN", "sourceImage"):
            match = re.search(RECORD_FIELD.format(field=field), chunk)
            book[field] = match.group(field) if match else ""
        books.append(book)
    return books


def download(url, dest):
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=30) as response:
        data = response.read()
    if len(data) < 1000:
        raise ValueError(f"suspiciously small response ({len(data)} bytes)")
    dest.write_bytes(data)
    return len(data)


def fetch_covers(books, force):
    COVER_DIR.mkdir(parents=True, exist_ok=True)
    fetched = skipped = 0
    failures = []

    for book in books:
        isbn = book["ISBN"].strip()
        url = book["sourceImage"].strip()
        if not isbn or not url:
            failures.append((book["Title"], "missing ISBN or sourceImage URL"))
            continue

        dest = COVER_DIR / f"{isbn}.jpg"
        if dest.exists() and not force:
            skipped += 1
            continue

        try:
            size = download(url, dest)
        except (urllib.error.URLError, ValueError, TimeoutError) as error:
            failures.append((book["Title"], str(error)))
            continue
        print(f"  fetched {dest.name} ({size // 1024} KB) — {book['Title'][:50]}")
        fetched += 1

    return fetched, skipped, failures


def rewrite_data_file(books):
    """Point each book's Image field at its local cover.

    Matches on the ISBN line that precedes the Image line in each record, so a
    book whose Bookshop URL carries a different EAN than its ISBN still gets the
    right file.
    """
    text = DATA_PATH.read_text(encoding="utf-8")
    known = {book["ISBN"].strip() for book in books}
    rewritten = 0

    def replace(match):
        nonlocal rewritten
        isbn, image = match.group("isbn"), match.group("image")
        if isbn not in known:
            return match.group(0)
        local = COVER_HREF.format(isbn=isbn)
        if image == local:
            return match.group(0)
        if not (COVER_DIR / f"{isbn}.jpg").exists():
            return match.group(0)   # never point at a cover we failed to fetch
        rewritten += 1
        return match.group(0).replace(f'"{image}"', f'"{local}"')

    pattern = re.compile(
        r'ISBN:\s*"(?P<isbn>[^"]+)",\s*\n'
        r'(?P<between>(?:\s*\w+:\s*"[^"]*",\s*\n)*?)'
        r'\s*Image:\s*"(?P<image>[^"]*)",'
    )
    text = pattern.sub(replace, text)
    DATA_PATH.write_text(text, encoding="utf-8")
    return rewritten


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--force", action="store_true", help="re-download covers that already exist"
    )
    args = parser.parse_args()

    books = read_books()
    print(f"{len(books)} books in {DATA_PATH.name}")

    fetched, skipped, failures = fetch_covers(books, args.force)
    print(f"covers: {fetched} fetched, {skipped} already present, {len(failures)} failed")

    rewritten = rewrite_data_file(books)
    print(f"{DATA_PATH.name}: {rewritten} Image paths pointed at local copies")

    if failures:
        print("\nFailed — these still hotlink Bookshop:", file=sys.stderr)
        for title, reason in failures:
            print(f"  {title}: {reason}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
