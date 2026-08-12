#!/usr/bin/env bash
set -euo pipefail

SLIDES_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DOCS_DIR="$(cd "$SLIDES_DIR/.." && pwd)"
QUARTO="${QUARTO_CMD:-quarto}"
BUILD_PDFS="${BUILD_PDFS:-false}"
PORT="${QUARTO_PORT:-}"
# Python resolves its user site-packages under HOME, so pinning HOME to the
# build sandbox below would hide pip --user installs (PyMuPDF, needed for PDF
# export). Resolve the real user base first and keep pointing at it.
export PYTHONUSERBASE="${PYTHONUSERBASE:-$(python3 -m site --user-base 2>/dev/null || true)}"
export HOME="${QUARTO_BUILD_HOME:-$SLIDES_DIR/.quarto/home}"
export XDG_CACHE_HOME="${XDG_CACHE_HOME:-$SLIDES_DIR/.quarto/cache}"
export DENO_DIR="${DENO_DIR:-$SLIDES_DIR/.quarto/deno}"
mkdir -p "$HOME" "$XDG_CACHE_HOME" "$DENO_DIR"

if ! command -v "$QUARTO" >/dev/null 2>&1; then
  echo "Error: quarto is required to build slides." >&2
  exit 1
fi

find_chrome() {
  if [[ -n "${CHROME:-}" && -x "$CHROME" ]]; then
    printf '%s\n' "$CHROME"
    return
  fi

  local candidates=(
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    "/Applications/Chromium.app/Contents/MacOS/Chromium"
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"
  )
  local candidate
  for candidate in "${candidates[@]}"; do
    if [[ -x "$candidate" ]]; then
      printf '%s\n' "$candidate"
      return
    fi
  done

  for candidate in google-chrome chromium chromium-browser chrome; do
    if command -v "$candidate" >/dev/null 2>&1; then
      command -v "$candidate"
      return
    fi
  done
}

if [[ "$BUILD_PDFS" == "false" ]]; then
  echo "Building HTML only. To generate PDFs, use: BUILD_PDFS=true $0"
fi

shopt -s nullglob
decks=("$SLIDES_DIR"/*.md "$SLIDES_DIR"/*.qmd)
filtered_decks=()
for deck in "${decks[@]}"; do
  [[ "$(basename "$deck")" == "README.md" ]] && continue
  filtered_decks+=("$deck")
done
decks=("${filtered_decks[@]}")

if [[ ${#decks[@]} -eq 0 ]]; then
  echo "No .md or .qmd slide decks found in $SLIDES_DIR"
  exit 0
fi

for deck in "${decks[@]}"; do
  base_md="$(basename "$deck")"
  echo "Rendering $base_md"
  # Stamp the compile time into the Sources slide of a throwaway copy, render,
  # then restore the pristine source so the timestamp never gets committed.
  cp "$deck" "$deck.stampbak"
  python3 "$SLIDES_DIR/stamp_source_note.py" "$deck" \
    || { mv -f "$deck.stampbak" "$deck"; exit 1; }
  (
    cd "$SLIDES_DIR"
    "$QUARTO" render "$base_md" --to revealjs
  ) || { mv -f "$deck.stampbak" "$deck"; exit 1; }
  mv -f "$deck.stampbak" "$deck"
done

if [[ "$BUILD_PDFS" == "false" ]]; then
  echo "Skipping PDF generation."
  exit 0
fi

if ! command -v node >/dev/null 2>&1; then
  echo "Error: Node.js is required for PDF export." >&2
  exit 1
fi

if ! python3 -c "import fitz" >/dev/null 2>&1; then
  echo "Error: PyMuPDF is required for PDF export (python3 -m pip install pymupdf)." >&2
  exit 1
fi

CHROME_CMD="$(find_chrome || true)"
if [[ -z "$CHROME_CMD" ]]; then
  echo "Error: Chrome/Chromium is required for PDF export. Set CHROME or use BUILD_PDFS=false to skip PDF generation." >&2
  exit 1
fi

if [[ -z "$PORT" ]]; then
  PORT="$(python3 - <<'PY'
import socket

with socket.socket() as sock:
    sock.bind(("127.0.0.1", 0))
    print(sock.getsockname()[1])
PY
)"
fi

SERVER_PID=""
TMP_DIR=""
cleanup() {
  if [[ -n "$SERVER_PID" ]]; then
    kill "$SERVER_PID" >/dev/null 2>&1 || true
    wait "$SERVER_PID" 2>/dev/null || true
  fi
  if [[ -n "$TMP_DIR" && -d "$TMP_DIR" ]]; then
    rm -rf "$TMP_DIR"
  fi
}
trap cleanup EXIT

python3 -m http.server "$PORT" \
  --bind 127.0.0.1 \
  --directory "$DOCS_DIR" \
  >"${TMPDIR:-/tmp}/quarto-slides-server.log" 2>&1 &
SERVER_PID="$!"

python3 - <<PY
import socket
import sys
import time

port = int("$PORT")
deadline = time.time() + 10
while time.time() < deadline:
    try:
        with socket.create_connection(("127.0.0.1", port), timeout=0.25):
            sys.exit(0)
    except OSError:
        time.sleep(0.1)
sys.exit("Timed out waiting for the slide PDF server")
PY

TMP_DIR="$(mktemp -d "${TMPDIR:-/tmp}/quarto-slides-pdf.XXXXXX")"

for deck in "${decks[@]}"; do
  base="$(basename "${deck%.*}")"
  html_out="$SLIDES_DIR/$base.html"
  html_export="$SLIDES_DIR/.$base-pdf-export.html"
  pdf_out="$SLIDES_DIR/$base.pdf"
  slide_dir="$TMP_DIR/$base"
  mkdir -p "$slide_dir"

  slide_count="$(python3 - <<PY
from pathlib import Path
import re

html = Path("$html_out").read_text(encoding="utf-8")
print(len(re.findall(r'<section\\b[^>]*class="[^"]*\\bslide\\b', html)))
PY
)"
  if [[ "$slide_count" -eq 0 ]]; then
    echo "Error: no Reveal.js slides found in $html_out" >&2
    exit 1
  fi

  python3 - <<PY
from pathlib import Path

html_path = Path("$html_out")
export_path = Path("$html_export")
html = html_path.read_text(encoding="utf-8")
css = """
<style>
.reveal .slide-menu-button,
.reveal .controls,
.reveal .progress {
  display: none !important;
}
</style>
"""
export_path.write_text(html.replace("</head>", css + "</head>", 1), encoding="utf-8")
PY

  echo "Generating $base.pdf"
  CHROME_CMD="$CHROME_CMD" \
  PDF_BASE_URL="http://127.0.0.1:$PORT/slides/.$base-pdf-export.html" \
  PDF_SLIDE_COUNT="$slide_count" \
  PDF_SLIDE_DIR="$slide_dir" \
    node "$SLIDES_DIR/export-pdf.js"

  python3 - <<PY
from pathlib import Path
import fitz

slide_dir = Path("$slide_dir")
pdf_out = Path("$pdf_out")
merged = fitz.open()
for path in sorted(slide_dir.glob("*.pdf")):
    page_pdf = fitz.open(path)
    merged.insert_pdf(page_pdf)
    page_pdf.close()
if merged.page_count == 0:
    raise SystemExit("No slide PDF pages were generated")
merged.save(pdf_out)
merged.close()
PY

  rm -f "$html_export"
done
