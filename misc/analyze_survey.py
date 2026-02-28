#!/usr/bin/env python3
"""Analyze spring 2026 survey results."""

import csv
import statistics
from collections import Counter

INPUT_FILE = "spring-26-survey-results.csv"
OUTPUT_FILE = "spring-26-interest-rankings.csv"

def load_data(path):
    with open(path, newline="", encoding="utf-8") as f:
        reader = csv.reader(f)
        headers = next(reader)
        rows = list(reader)
    return headers, rows

def print_text_responses(headers, rows):
    # Text columns: indices 1-5 (skipping timestamp at 0)
    text_cols = [1, 2, 3, 4, 5]

    for col_idx in text_cols:
        title = headers[col_idx]
        print("=" * 80)
        print(f"  {title}")
        print("=" * 80)
        responses = []
        for row in rows:
            # Handle rows that got split across lines in the CSV
            if col_idx < len(row):
                responses.append(row[col_idx].strip())
        for i, resp in enumerate(responses, 1):
            print(f"  {i:>2}. {resp}")
        print()

def summarize_interests(headers, rows):
    # Interest columns: indices 6 onward
    interest_cols = list(range(6, len(headers)))
    results = []

    for col_idx in interest_cols:
        name = headers[col_idx]
        scores = []
        for row in rows:
            if col_idx < len(row):
                try:
                    scores.append(int(row[col_idx].strip()))
                except ValueError:
                    pass
        if not scores:
            continue
        mean = statistics.mean(scores)
        med = statistics.median(scores)
        sd = statistics.stdev(scores) if len(scores) > 1 else 0
        dist = Counter(scores)
        results.append({
            "topic": name,
            "mean": mean,
            "median": med,
            "stdev": sd,
            "min": min(scores),
            "max": max(scores),
            "n": len(scores),
            "distribution": dist,
        })

    # Sort highest mean first
    results.sort(key=lambda r: r["mean"], reverse=True)

    # Print summary table
    print("=" * 80)
    print("  INTEREST SURVEY RANKINGS (1-10 scale, sorted by mean)")
    print("=" * 80)
    print(f"  {'Topic':<40} {'Mean':>5} {'Med':>4} {'SD':>5} {'Min':>4} {'Max':>4} {'N':>3}")
    print("  " + "-" * 70)
    for r in results:
        print(f"  {r['topic']:<40} {r['mean']:>5.2f} {r['median']:>4.1f} {r['stdev']:>5.2f} {r['min']:>4} {r['max']:>4} {r['n']:>3}")
    print()

    # Print score distributions
    print("=" * 80)
    print("  SCORE DISTRIBUTIONS")
    print("=" * 80)
    for r in results:
        bars = []
        for score in range(1, 11):
            count = r["distribution"].get(score, 0)
            bars.append(f"{score:>2}: {'█' * count} ({count})")
        print(f"\n  {r['topic']}")
        for b in bars:
            print(f"    {b}")
    print()

    return results

def write_rankings_csv(results, path):
    with open(path, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["Rank", "Topic", "Mean", "Median", "Std Dev", "Min", "Max", "N"])
        for rank, r in enumerate(results, 1):
            writer.writerow([
                rank,
                r["topic"],
                f"{r['mean']:.2f}",
                f"{r['median']:.1f}",
                f"{r['stdev']:.2f}",
                r["min"],
                r["max"],
                r["n"],
            ])
    print(f"Rankings written to {path}")

def main():
    headers, rows = load_data(INPUT_FILE)
    print_text_responses(headers, rows)
    results = summarize_interests(headers, rows)
    write_rankings_csv(results, OUTPUT_FILE)

if __name__ == "__main__":
    main()
