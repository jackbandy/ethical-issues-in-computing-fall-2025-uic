#!/bin/bash
set -e
xelatex SP26_CS377_jxb.tex
xelatex SP26_CS377_jxb.tex  # second pass for cross-references
