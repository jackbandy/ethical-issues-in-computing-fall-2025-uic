#!/usr/bin/env bash
# Build the CS 377 worksheets. With no arguments, builds every NN-*.tex in this
# directory except the shared template; otherwise builds only the named files.
set -euo pipefail

SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
AUX_DIR="$SOURCE_DIR/.build"

if ! command -v latexmk >/dev/null 2>&1; then
  echo "Error: latexmk is required to build the worksheets." >&2
  exit 1
fi

if [ "$#" -gt 0 ]; then
  sources=("$@")
else
  sources=()
  for tex in "$SOURCE_DIR"/[0-9][0-9]-*.tex; do
    [ -e "$tex" ] || continue
    case "$(basename "$tex")" in
      00-template.tex) continue ;;
    esac
    sources+=("$tex")
  done
fi

if [ "${#sources[@]}" -eq 0 ]; then
  echo "No worksheets to build." >&2
  exit 1
fi

mkdir -p "$AUX_DIR"

for tex in "${sources[@]}"; do
  echo "Building $(basename "$tex")..."
  latexmk -pdf -interaction=nonstopmode -halt-on-error \
    -outdir="$AUX_DIR" \
    -cd "$tex"
  cp "$AUX_DIR/$(basename "${tex%.tex}").pdf" "$SOURCE_DIR/"
  echo "Published $SOURCE_DIR/$(basename "${tex%.tex}").pdf"
done
