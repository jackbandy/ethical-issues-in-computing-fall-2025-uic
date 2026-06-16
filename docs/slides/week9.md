# Draft — Needs Review {.draft-notice}

> ⚠️ Auto-converted from a previous slide format. All content still needs review and editing before use in class.

---

# Ethical Challenges from LLMs {.title-slide}

<!-- NOTICE: Draft from old-slides/pdf-versions/17 Intro to LLMs.pdf. Review and edit before use. -->

CS 377 · Week 9, Day 1 · 🟦 Division 🟦

---

# Topic Title Placeholder {.title-slide .photo-title data-state="photo-title" background-image="../assets/blue-line-stops/stop20-division-a.jpg" background-size="cover"}

CS 377 · Week 9, Day 1 · 🟦 Division 🟦

<!-- image source: picture from altusworks.com -->

---

# {.photo-only data-state="photo-only" background-image="../assets/blue-line-stops/stop20-division-a.jpg" background-size="cover"}

---

# Administrivia

:::: columns
::: {.column width="55%"}
- Read "If an Algorithm Can Cast a Shadow" for Wednesday
- Keep reading your book!
- Keep an eye on published grades
:::

::: {.column width="40%"}
![](../assets/blue-line-full-path.svg)
:::
::::

---

# Agenda for Today

:::: columns
::: {.column width="55%"}
- Shuffle seats
- Speculative fiction activity
- What is a (large) language model?
- "Stochastic Parrots" — four key issues
:::

::: {.column width="40%"}
![](../assets/blue-line-full-path-tweak.svg)
:::
::::

---

# 🔀 Seat Shuffle

<!-- image: room diagram — lectern "0", tables 1–8, projector screens, door -->
- TODO: add image — *room diagram — lectern "0", tables 1–8, projector screens, door*

---

# Table Activity: Speculative Fiction

<!-- image: student speculative fiction submissions / vote slide -->
- TODO: add image — *student speculative fiction submissions / vote slide*

---

# What Is a (Large) Language Model?

---

# A Simple Language Model

Training text: *"it was the best of times"*

- Model: predicts the next token based on preceding context

::: {.fragment}
Training text: *"it was the best of times, it was the worst of times"*

- Model now has more transitions to learn from
:::

---

# From Text to Model

<!-- image: diagram showing training text → next-token probability model (Dickens example) -->
- TODO: add image — *diagram showing training text → next-token probability model (Dickens example)*

---

# LM Definition {.quote-slide}

> "Systems which are trained on string prediction tasks: that is, predicting the
> likelihood of a token (character, word, or string) given its preceding context."
>
> — Bender and Gebru et al., "Stochastic Parrots" (2021)

---

# 🦜 Stochastic Parrots

- Bender, Gebru et al. (2021)
- Paper drafted via Twitter DMs in Fall 2020
- Google admin asked that the paper be retracted
- Published in February 2021 at FAccT

<!-- image: photos of the four authors (Emily Bender, Timnit Gebru, Angelina McMillan-Major, Shmargaret Shmitchell) -->
- TODO: add image — *photos of the four authors (Emily Bender, Timnit Gebru, Angelina McMillan-Major, Shmargaret Shmitchell)*

---

# Behind the Research: AI Ethics at Google

<!-- image: context on Timnit Gebru's departure from Google and the broader story of AI ethics research in industry -->
- TODO: add image — *context on Timnit Gebru's departure from Google and the broader story of AI ethics research in industry*

---

# Table Activity: Learn About the Authors

- Education? Early life?
- Previous jobs / positions?
- Major contributions / projects?

---

# Four Key Issues in "Stochastic Parrots"

::: {.incremental}
1. **Cost** — environmental and financial
2. **"Unfathomable" training data** — scale makes auditing impossible
3. **Misdirected research** — opportunity cost of pursuing scale
4. **Human interactions** — the "ELIZA effect" and dangerous queries
:::

---

# Environmental Costs of LLMs

- Thousands of GPUs for initial training
- "Training a single BERT base model on GPUs was estimated to require as much energy as a trans-American flight"
- Data center energy: cooling systems, water use, land

---

# Financial Costs of LLMs

- As of 2020: $150k for every 0.1 increase in BLEU score (Strubell et al.)
- Exact costs difficult to know; relative costs fairly clear

---

# "Unfathomable" Training Data (2 of 4)

| Model | Year | Training Data |
|---|---|---|
| GPT-1 | 2018 | BookCorpus — 7,000 free books |
| GPT-2 | 2019 | WebText — Reddit posts (>2 karma), 8B web pages |
| GPT-3 | 2020 | WebText2 + 500B tokens |
| GPT-4 | 2023 | Undisclosed |

---

# Why "Unfathomable"?

::: {.incremental}
- Larger text datasets are more difficult to understand, analyze, and audit
- Training data from the Internet is often not representative
  - Over-representation of men on Reddit (~67%), Wikipedia (~90%)
- Efforts to "clean" datasets can have unintended consequences
  - e.g. removing all pages mentioning the word "rapist"
  - ["List of Dirty, Naughty, Obscene, and Otherwise Bad Words"](https://github.com/LDNOOBW/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words)
:::

---

# On Filtering Marginalized Voices {.quote-slide}

> "If we filter out the discourse of marginalized populations, we fail to provide
> training data that reclaims slurs and otherwise describes marginalized identities
> in a positive light."
>
> — Bender and Gebru et al., "Stochastic Parrots" (2021)

---

# Misdirected Research (3 of 4)

- Statistical language models are just one approach to AI
- Other approaches emphasize understanding and structure
  - Knowledge graphs, structured reasoning
  - Example: passing AP exams posted on the internet
- Scaling LLMs consumes resources that could be directed elsewhere

<!-- image: chart via Stanford HAI showing research investment distribution -->
- TODO: add image — *chart via Stanford HAI showing research investment distribution*

---

# Human Interactions (4 of 4)

<!-- image: ELIZA interface screenshot -->
- TODO: add image — *ELIZA interface screenshot*

---

# Human Interactions (4 of 4)

- "Humans are prepared to interpret strings belonging to languages they speak as meaningful"
- But "an LM is a system for haphazardly stitching together sequences of linguistic forms it has observed in its vast training data"
- We project meaning onto things — sometimes erroneously
- Early example: **ELIZA** (1966, Joseph Weizenbaum)
  - Users became emotionally attached even knowing it was a program
  - Weizenbaum was disturbed by this

*Try ELIZA: [ELIZA Archaeology](https://sites.google.com/view/elizaarchaeology/try-eliza)*

---

# Dangerous Queries

::: {.incremental}
- "Users might query LMs for 'dangerous knowledge'"
- Examples:
  - Tax avoidance
  - Self-harm
  - Weapon building
  - Malicious / manipulative content
  - Theft of identity and/or likeness
  - Hacking / cybersecurity circumventions
:::

::: {.fragment}
Red-teaming activity (if time allows): [lmarena.ai](https://lmarena.ai)
:::

---

# Reminders

- Read "If an Algorithm Can Cast a Shadow" by Claire Jia-Wen
- Audio version is ~34 minutes (link in Canvas)
- See you Wednesday!

---

# LLMs, Continued {.title-slide}

CS 377 · Week 9, Day 2 · 🟦 Damen 🟦

---

# Topic Title Placeholder {.title-slide .photo-title data-state="photo-title" background-image="../assets/blue-line-stops-better/stop21-damen-c.jpg" background-size="cover"}

CS 377 · Week 9, Day 2 · 🟦 Damen 🟦

<!-- image source: photo by Graham Garfield -->

---

# {.photo-only data-state="photo-only" background-image="../assets/blue-line-stops-better/stop21-damen-c.jpg" background-size="cover"}

---

# Administrivia

:::: columns
::: {.column width="55%"}
- Keep reading your book!
- Grades incoming
- Canvas updates
:::

::: {.column width="40%"}
![](../assets/blue-line-full-path.svg)
:::
::::

---

# Agenda for Today

:::: columns
::: {.column width="55%"}
- Book check-in
- Continue "Stochastic Parrots"
- LLMs in the news
- Discuss "If an Algorithm Can Cast a Shadow"
- Preview next week (Intellectual Property)
:::

::: {.column width="40%"}
![](../assets/blue-line-full-path-tweak.svg)
:::
::::

---

# Invitation

Turn off phones, laptops, and other distractions

---

# Table Discussion: Book Check-in

- How much have you read? What helps you read?
- How are you taking notes / keeping track of what you're learning?
- What are your ideas for your presentation?
- What does your reading schedule look like for the next few weeks?

---

# Returning to "Stochastic Parrots"

<!-- image: stochastic parrots paper cover / overview slide -->
- TODO: add image — *stochastic parrots paper cover / overview slide*

---

# Review: Four Key Issues

::: {.incremental}
1. **Cost** — environmental and financial
2. **"Unfathomable" training data**
3. **Opportunity cost** (misdirected research)
4. **Human interactions**
   - ELIZA effect
   - Dangerous information
:::

---

# Human Interactions: "Digital Doubles?"

<!-- image: news example of AI "digital double" or companion AI relationship -->
- TODO: add image — *news example of AI "digital double" or companion AI relationship*

- People form attachments to AI systems
- What happens when AI systems are designed to encourage this?
- What duties do companies have toward users who become dependent on AI companions?

---

# LLMs In the News: Dangerous Queries

<!-- image: news screenshot on OpenAI and Canada shooting suspect -->
- TODO: add image — *news screenshot on OpenAI and Canada shooting suspect*

June 2025: *"Posts flagged by an automated review system alarmed employees at OpenAI… OpenAI leaders ultimately decided not to contact authorities."*

- *Wall Street Journal*: [OpenAI Employees Raised Alarms About Canada Shooting Suspect Months Ago](https://archive.ph/5WWdU)
- Laura Cress (BBC): [Family of child injured in Canada school shooting sues OpenAI](https://www.bbc.com/news/articles/c309y25prnlo)

---

# LLMs and Education

- Futurism: ["New AI Agent Logs Directly Into Canvas to Do Your Homework for You"](https://futurism.com/artificial-intelligence/ai-agent-canvas-homework)
- Matthew Gault: ["What's the Point of School When AI Can Do Your Homework?"](https://www.404media.co/whats-the-point-of-school-when-ai-can-do-your-homework/)
- Chronicle: ["'Einstein' May Have Been a Prank. But the Agentic AI Tool Put Higher Ed on Notice."](https://www.chronicle.com/article/einstein-may-have-been-a-prank-but-the-agentic-ai-tool-put-higher-ed-on-notice)

---

# LLMs at Work

- Financial Times: ["Amazon service was taken down by AI coding bot"](https://archive.ph/msZJ3)
- Casey Newton: ["Grammarly turned me into an AI editor against my will and I hate it"](https://www.platformer.news/grammarly-expert-review-reviewed/)
- Open to Debate: [Andrew Yang and Chris Hughes, "Will AI Make Work Obsolete?"](https://www.c-span.org/program/public-affairs-event/fmr-presidential-candidate-andrew-yang-on-artificial-intelligence-workforce-debate/674030)

---

# Discuss: "If an Algorithm Can Cast a Shadow"

---

# Story Overview

- Who are the characters?
- What is a "digital double"?
- What are the "tiers"?
- What is your impression of the town of Glencreek?
- What is the general plot?

---

# Table Discussion: Your Questions

- Share and discuss your questions from Canvas
- Choose one or two you would like to pose to the whole class

---

# Preview: Intellectual Property (Week 10)

- Guest lecture details coming in Canvas
- **Maurine Jo Neiberg** — Intellectual Property Attorney
  - Expert in patent, computer law, copyright, trademark
  - Software engineer in applied research in AI
  - Wrote software for bond traders at Goldman Sachs
- Zoom lectures available (see Canvas for times)
- "Pre-class reflection" will be due before Wednesday's class

---

# That's all for today!

See you next week!

---

# References & Credits {.sources}

1. Bender, E.M., Gebru, T., McMillan-Major, A., & Shmitchell, S. (2021). ["On the Dangers of Stochastic Parrots: Can Language Models Be Too Big?"](https://doi.org/10.1145/3442188.3445922) *FAccT 2021*.
2. [List of Dirty, Naughty, Obscene, and Otherwise Bad Words](https://github.com/LDNOOBW/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words), GitHub.
3. [ELIZA Archaeology](https://sites.google.com/view/elizaarchaeology/try-eliza).
4. Chiang and Zheng et al., ["An Open Platform for Evaluating LLMs by Human Preference"](https://openreview.net/forum?id=3MW8GKNyzI); [LMArena](https://lmarena.ai).
5. Wall Street Journal, [OpenAI Employees Raised Alarms About Canada Shooting Suspect Months Ago](https://archive.ph/5WWdU).
6. Slide deck built with [Quarto](https://quarto.org/) and Reveal.js.
