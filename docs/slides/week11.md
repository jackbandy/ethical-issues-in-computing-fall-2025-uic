# Draft — Needs Review {.draft-notice}

> ⚠️ Auto-converted from a previous slide format. All content still needs review and editing before use in class.

---

# Book Presentations + Intro to Fairness {.title-slide}

CS 377, Week 11, Day 1 🟦 Belmont 🟦

---

# Book Presentations + Intro to Fairness {.title-slide .photo-title data-state="photo-title" background-image="../assets/blue-line-stops/stop25-belmont-a.jpg" background-size="cover"}

CS 377, Week 11, Day 1 🟦 Belmont 🟦

---

## {.photo-only data-state="photo-only" background-image="../assets/blue-line-stops/stop25-belmont-a.jpg" background-size="cover"}

---

## Administrivia

:::: columns
::: {.column width="55%"}
- Canvas updates
- Fairness definitions exercise overview
- Questions?
:::

::: {.column width="40%"}
![](../assets/blue-line-full-path.svg)
:::
::::

---

## Agenda for Today

:::: columns
::: {.column width="55%"}
- Book Presentations
- Overview of Fairness Definitions Exercise
:::

::: {.column width="40%"}
![](../assets/blue-line-full-path-tweak.svg)
:::
::::

---

# Book Presentations {.title-slide .section-header}

---

## Book Presentations

*See Canvas for the presentation schedule.*

---

## Discussion Protocol

- Listen actively — one presenter at a time
- Questions should be genuine and respectful
- Connect the book to course themes where you can

---

# Algorithmic Fairness {.title-slide .section-header}

---

## Overview: Fairness Definitions Exercise

---

## What Is Algorithmic Fairness?

Fairness in algorithmic systems is not a single concept — it is a family of competing definitions.

---

## Warm-Up Discussion: Debrief Fairness Definitions

- Which definition did you choose? What made you choose it? Did others stick out?
- Which moral and/or political values did you see in this definition? What is the underlying ethical theory?
- Can it be modeled mathematically? If so, how?
- What was your case study?
- Other thoughts on the tutorial presentation? Fairness?

---

## Definitions Covered

:::: columns
::: {.column width="48%"}
- Statistical Bias
- Group Fairness / Demographic Parity
- Equal Positive Predictive Value
- Equal Negative Predictive Value
- Equal False Positive Rate
- Equal False Negative Rate
- Accuracy equity
- Blindness
- Individual fairness / Equal thresholds
:::

::: {.column width="48%"}
- Similarity metric
- Process fairness (feature rating)
- Diversity (various definitions)
- Representational harms
- Stereotype mirroring / exaggeration
- Cross-dataset generalization
- Bias in representation learning
- Bias amplification
:::
::::

---

# Examples of Algorithmic Bias {.title-slide .section-header}

---

## Opening Example: Rory Fresco

- Rory Fresco's "Lowkey" had ~5k plays on SoundCloud
- January 8, 2016: Kanye West releases "Real Friends" on SoundCloud
- Rory Fresco's "Lowkey" racked up millions of plays and he signed with Epic Records
- Example of **algorithmic privileging** — one definition of bias
- SoundCloud and Spotify now use more randomness in recommendations to counter this

---

## What Are the Stakes of Algorithmic Bias?

| Harm Type | Example |
|---|---|
| Representational harms | Amplification or suppression of information |
| Allocative harms | Lending opportunities |
| Quality of service harms | Medical school acceptance, educational opportunities |
| Interpersonal harms | Incorrect inferences and/or disclosures about people |
| Social system harms | Setting bail, sentencing limits |

---

## (In)Famous Examples of Algorithmic Bias

---

## Example: ChatGPT Salary Advice

<!-- image: "ChatGPT advises women to ask for lower salaries, study finds" — The Next Web -->
- TODO: add image — *"ChatGPT advises women to ask for lower salaries, study finds" — The Next Web*

---

## Example: Apple Card

- Launched August 2019
- People noticed smaller lines of credit to women than to men

::: {.fragment}
"It doesn't even use gender as an input. How could the bank discriminate if no one ever tells it which customers are women and which are men?"

— *Wired*, "The Apple Card Didn't 'See' Gender—and That's the Problem"
:::

::: {.fragment}
- March 2021: NY DFS did not find evidence of discrimination (400k applicants)
- But: absence of evidence ≠ evidence of absence
:::

---

## Example: Twitter Image Cropping

<!-- image: Twitter image cropping examples showing systematic bias toward lighter-skinned faces (series of 4 images) -->
- TODO: add image — *Twitter image cropping examples showing systematic bias toward lighter-skinned faces (series of 4 images)*

---

## Bias Bounty

<!-- image: Twitter Bias Bounty competition announcement -->
- TODO: add image — *Twitter Bias Bounty competition announcement*

---

## Bias Bounty: Student Submission by Bogdan Kulynych

<!-- image: Kulynych's bias bounty submission showing systematic cropping bias -->
- TODO: add image — *Kulynych's bias bounty submission showing systematic cropping bias*

---

# COMPAS and Machine Bias {.title-slide .section-header}

---

## "Machine Bias" in COMPAS

- "Will this person re-offend?"

---

## The COMPAS System

- Used for **recidivism prediction** — predicting likelihood of re-offending
- Supposed to help judges determine whether a defendant should remain in jail until trial
- "Risk assessment tool" with 137 questions
- Weights based on observed data
- ProPublica analysis: "Machine Bias" (2016)

---

## COMPAS: Prediction Disparities

::: {.incremental}
- **61% overall accuracy**
- **False negatives** (labeled low risk but did re-offend):
  - 47.7% for white defendants
  - 28.0% for Black defendants
- **False positives** (labeled high risk but did NOT re-offend):
  - 23.5% for white defendants
  - 44.9% for Black defendants
:::

---

## Legacy of "Machine Bias"

- Pulitzer Prize Finalist in Explanatory Reporting
- Wisconsin Supreme Court allowed COMPAS as long as warnings given
- Northpointe changed name to Equivant; now publishes more assessment details

---

## "Old School" Bias (1996)

Examples from earlier automated systems:

- Airline reservation systems
- Residential matching program for medical students
- Loan approval systems

---

# Weapons of Math Destruction {.title-slide .section-header}

---

## *Weapons of Math Destruction* (Cathy O'Neil)

Examples from WMD:

- Going to College (ranking algorithms affecting admissions)
- Online Advertising (recidivism, poverty)
- Predictive Policing
- Getting a Job / Working on the Job
- Landing Credit
- Getting Insurance

---

## A bit about Cathy O'Neil

- Education: UC Berkeley, Harvard (PhD)
- Alice T. Schafer Prize winner (1993) — for "excellence in mathematics"
- Left academia in 2007
- Participated in Occupy Wall Street, exploring alternative banking
- *WMD* was on the National Book Awards Nonfiction Longlist (2016)
- 2022 book: *The Shame Machine*

---

# Measuring Inequality {.title-slide .section-header}

---

## (Un)Fairness as (In)Equality: The Gini Coefficient

---

## Measuring Inequality

- "The top 1% own 26.5% of household wealth in the U.S." (Dec 2023)
- "Three people own more wealth than the bottom half of society" (Jan 2024)
- What if we could combine all these statistics into one metric?

<!-- image: photos from Occupy Wall Street -->
- TODO: add image — *photos from Occupy Wall Street*

---

## Gini Coefficient

- Max Lorenz (American economist) → Lorenz curve
- Corrado Gini (Italian statistician), *Variabilità e mutabilità* (1912)
- Line of perfect equality vs. actual distribution curve
- Live demo: yellkey.com/clearly

<!-- image: Lorenz Curve for Net Worth in the U.S. as of 2019 (Federal Reserve) -->
- TODO: add image — *Lorenz Curve for Net Worth in the U.S. as of 2019 (Federal Reserve)*

---

## Gini as Equality (versus Equity)

<!-- image: equality vs. equity illustration -->
- TODO: add image — *equality vs. equity illustration*

---

## U.S. Income Gini Trends

<!-- image: Census Bureau, "Income in the United States: 2024" — Gini coefficient trend chart -->
- TODO: add image — *Census Bureau, "Income in the United States: 2024" — Gini coefficient trend chart*

---

## Fairness Definitions Exercise

- Choose one fairness definition from the tutorial
- Identify the underlying ethical theory and values
- Apply it to a real case study of your choosing
- Due before next class — see Canvas for details

---

## That's all for today!

See you next week for more presentations!

---

# References & Credits {.sources}

1. GitHub source: <https://github.com/jackbandy/ethical-issues-in-computing-uic/blob/main/docs/slides/week11.md>.
2. ProPublica, ["Machine Bias"](https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing), 2016.
3. Cathy O'Neil, [*Weapons of Math Destruction*](https://weaponsofmathdestructionbook.com/) (2016).
4. Chouldechova, A. (2017). ["Fair Prediction with Disparate Impact."](https://doi.org/10.1089/big.2016.0047) *Big Data.*
5. Census Bureau, ["Income in the United States: 2024"](https://www.census.gov/library/publications/2024/demo/p60-282.html).
6. Slide deck built with [Quarto](https://quarto.org/) and Reveal.js.
