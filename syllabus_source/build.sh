#!/usr/bin/env bash
set -euo pipefail

SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUTPUT_DIR="$SOURCE_DIR/../docs/syllabus"
INPUT="$SOURCE_DIR/syllabus.md"
CREATED="$(TZ=America/Chicago date '+%B %-d, %Y at %-I:%M %p %Z')"

for command in pandoc xelatex; do
  if ! command -v "$command" >/dev/null 2>&1; then
    echo "Error: $command is required to build the syllabus." >&2
    exit 1
  fi
done

mkdir -p "$OUTPUT_DIR"

pandoc "$INPUT" \
  --from markdown+smart \
  --lua-filter "$SOURCE_DIR/schedule.lua" \
  --lua-filter "$SOURCE_DIR/signal.lua" \
  --standalone \
  --template "$SOURCE_DIR/template.html" \
  --metadata created="$CREATED" \
  --toc \
  --toc-depth=1 \
  -o "$OUTPUT_DIR/index.html"

pandoc "$INPUT" \
  --from markdown+smart \
  --lua-filter "$SOURCE_DIR/schedule.lua" \
  --lua-filter "$SOURCE_DIR/signal.lua" \
  --template "$SOURCE_DIR/template.tex" \
  --pdf-engine=xelatex \
  --metadata created="$CREATED" \
  --resource-path "$SOURCE_DIR:$OUTPUT_DIR" \
  -o "$OUTPUT_DIR/syllabus.pdf"

cp "$SOURCE_DIR/arendt.jpg" "$OUTPUT_DIR/arendt.jpg"

echo "Published $OUTPUT_DIR/index.html"
echo "Published $OUTPUT_DIR/syllabus.pdf"
