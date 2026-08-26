# Demo Slide Deck {.title-slide}

Jack Bandy, CS 377, UIC

---


# Content Slides {.title-slide .section-header}

---

## A Content Slide

Use this template for:

- a concise claim or question
- five or six bullets
- links and citations near relevant material

---

## Incremental Discussion

::: {.incremental}
1. First
2. Second
3. Third
4. Fourth
5. Fifth
:::

---

## Two Columns

:::: columns
::: {.column width="48%"}
### Left

- A
- B
- C
- D
:::

::: {.column width="48%"}
### Right

- E
- F
- G
- H
:::
::::

---

# Embeds and Activities {.title-slide .section-header}

---

## Embedded Web Page {.embed-slide}

::: {.embed-layout}
::: {.embed-copy}
<h2>CTA-style Timer</h2>

- Live page in the deck
- Interactive without leaving the presentation
- For timed discussions and group exercises

[Open timer in a new tab](https://jackbandy.com/extras/cta-style-timer.html)
:::

::: {.embed-frame}
<iframe
  src="https://jackbandy.com/extras/cta-style-timer.html"
  title="CTA-style countdown timer"
  loading="lazy"
  data-external="1">
</iframe>
:::
:::

---

## Discussion Template w Timer {.embed-slide}

::: {.embed-layout .golden-columns}
::: {.embed-copy}
1. Demo question 1
2. Demo question 2
3. Demo question 3
:::

::: {.embed-frame}
<iframe
  src="../timer/index.html"
  title="CTA-style countdown timer"
  loading="lazy"
  data-external="1">
</iframe>
:::
:::

---

## Visual Seat Shuffle {.embed-slide}

::: {.embed-layout}
::: {.embed-copy}
<h2>Visual Seat Shuffle</h2>

- Classroom seating chart, shown live in the deck
- Enter a seed and shuffle to assign tables
- "Draw Paths" kinda chaotic

[Open in a new tab](https://doethics.fun/in-progress/visual-seat-shuffle.html)
:::

<!-- TODO: tweak/polish the seat shuffle embedding (scale, sizing, layout) -->
::: {.embed-frame style="position:absolute;top:0;right:0;width:49%;height:100%;margin:0;border-radius:0 6px 6px 0;border:2px solid #d8d8d8;"}
<div style="width:100%;height:100%;overflow:hidden;">
<div style="width:1060px;height:1200px;transform:scale(0.55);transform-origin:0 0;">
<iframe
  src="https://doethics.fun/in-progress/visual-seat-shuffle.html"
  title="Visual Seat Shuffle"
  style="width:100%;height:100%;border:none;display:block;"
  data-external="1">
</iframe>
</div>
</div>
:::
:::

---

## Kranzberg's First Law {.quote-slide}

> Technology is neither good nor bad; nor is it neutral.
>
— Melvin Kranzberg [@kranzberg1986, 545]

---

## Full-Screen Webpage {.embed-slide}

::: {.embed-layout .embed-full}
::: {.embed-frame style="width:100%;height:100%;margin:0;"}
<iframe
  src="https://plato.stanford.edu"
  title="Embedded webpage"
  loading="lazy"
  style="width:100%;height:100%;border:none;display:block;"
  data-external="1">
</iframe>
:::

::: {.embed-overlay}
[Open in new tab](https://plato.stanford.edu)
:::
:::

---

# References & Credits {.sources}

::: {#refs}
:::

1. GitHub source: <https://github.com/jackbandy/ethical-issues-in-computing-uic/blob/main/docs/slides/week0.md>.
2. Slide deck built with [Quarto](https://quarto.org/) and Reveal.js.
3. Theme colors and interface cues adapt the CTA-style timer at
   [jackbandy.com/timer](https://jackbandy.com/timer).
4. CTA Blue: `#00A1DE`; CTA interface blue: `#005DAA`; body ink: `#231F20`.
