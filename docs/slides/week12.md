# Draft — Needs Review {.draft-notice}

> ⚠️ Auto-converted from a previous slide format. All content still needs review and editing before use in class.

---

# Nudges and Dark Design Patterns {.title-slide}

<!-- NOTICE: Draft from old-slides/pdf-versions/21 Nudges.pdf and 20 Dark Patterns.pdf. Review and edit before use. -->

CS 377 · Week 12, Day 1 · 🟦 Logan Square 🟦

---

# Topic Title Placeholder {.title-slide .photo-title data-state="photo-title" background-image="../assets/blue-line-stops/stop24-logan-square-a.jpg" background-size="cover"}

CS 377 · Week 12, Day 1 · 🟦 Logan Square 🟦

<!-- image source: Image via CDOT, Jacobs Engineering -->

---

# Administrivia

:::: columns
::: {.column width="55%"}
- More grades incoming!
- Presentations start Wednesday
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
- Mini-lecture: Nudges and Dark Design Patterns
- Outdoor activity: find a nudge on campus
- Presentation tips
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

# Table Discussion: Book Check-in

- How much have you read? What helps you read? (Where? When? What else?)
- How are you taking notes / keeping track of what you're learning?
- What are your ideas for your presentation?
- What does your reading schedule look like for the next few weeks?
- (If time) What ideas do you have for your personal ethics commitments?

---

# Mini-Lecture: "Nudging" and Dark Design Patterns

---

# Dolls and Puppets

<!-- image: photo of puppet/doll — Study Breaks Magazine, Danielle Kuzel — connecting to the earlier rag-doll exercise -->
- TODO: add image — *photo of puppet/doll — Study Breaks Magazine, Danielle Kuzel — connecting to the earlier rag-doll exercise*

---

# Poll: Screen Time

- "I would like to spend less time on my phone and more time doing other activities"
  - Strong disagree / Disagree / Not sure / Agree / Strong agree

---

# Poll: Average Daily Screen Time

- What is your average daily screen time?
  - iOS: Settings → Screen Time → See All App & Website Activity
  - Android: Settings → Digital Wellbeing & parental controls → Dashboard
  - Answer in minutes (e.g. 1hr = 60 mins)

---

# "Persuasive Design"

- Also referred to as "Captology" (Computers as Persuasive Technology)
- More broadly about behavior change
- "It's not complicated, it's systematic"
- Three key ingredients for behavior change:
  - **Motivation**
  - **Ability**
  - **Trigger / Call to Action** ("Now!")

*BJ Fogg, Stanford Persuasive Technology Lab*

---

# Common Examples of Dark/Deceptive Design

::: {.incremental}
- False urgency ("Only 2 left!")
- Infinite scroll (no natural stopping point)
- Variable reward in notifications (slot machine design)
- Notifications as triggers (interruption as mechanism)
- Preselected defaults (opt-out instead of opt-in)
- "Confirmation shaming" ("No thanks, I don't want to save money")
- Visual interference (making the "no" option hard to find)
:::

*See [darkpatterns.uxp2.com](https://darkpatterns.uxp2.com/)*

---

# "Nudging" toward Habits and Virtues

- Positive habit-building can also be done persuasively
- "Humane design," "value-centered design," etc.
- Also called "nudging"

---

# A Nudge Defined {.quote-slide}

> "A nudge is an intervention that maintains freedom of choice but steers people
> in a particular direction."
>
> — Cass Sunstein

---

# Nudging Examples

Basketball-style cues to encourage recycling

<!-- image: basketball hoop over recycling bin -->
- TODO: add image — *basketball hoop over recycling bin*

---

# Nudging Examples

<!-- image: bike-friendly speed bump on the Alameda Ridge (Jonathan Maus / BikePortland) -->
- TODO: add image — *bike-friendly speed bump on the Alameda Ridge (Jonathan Maus / BikePortland)*

---

# Nudging Examples

Staircase of the James B. Hunt Library, North Carolina State University (Snøhetta, 2013)

<!-- image: Hunt Library staircase — designed to encourage stair use (LMN Architects / Booth Hansen, Architect of Record) -->
- TODO: add image — *Hunt Library staircase — designed to encourage stair use (LMN Architects / Booth Hansen, Architect of Record)*

---

# Nudges for Behavior Change

<!-- image: summary diagram of nudges for behavior change -->
- TODO: add image — *summary diagram of nudges for behavior change*

---

# Other Nudges

- Doors or barriers guiding walking paths
- Grocery store layouts (prominence of produce)
- Shopping mall layouts (encourage wandering)
- Seating arrangements that encourage or discourage certain behaviors
- Road design to slow down drivers ("traffic calming")

---

# BJ Fogg

- "Persuasive Technology Lab" at Stanford
- Taught in the 2000s
- "Working in teams of three, the 75 students created apps that collectively had 16 million users in just 10 weeks."
- Many apps designed for Facebook

---

# Group Activity: Find a Nudge on Campus

- Find a design nudge (or hook) somewhere on campus
- Take a picture of the nudge or hook in action, using group members as actors
- Email it to Dr. Bandy (jxb@uic.edu)
- Come back in 15 minutes to share
- **Signage does not count!**

---

# Your Examples

<!-- image: group photos — placeholders for student submissions, organized by section (12:30, 2:00, 3:30) and group number -->
- TODO: add image — *group photos — placeholders for student submissions, organized by section (12:30, 2:00, 3:30) and group number*

---

# Table Discussion: Hooks and Nudges

- Explore examples at [consciouspatterns.in](https://www.consciouspatterns.in/ethical-gallery)
- What's your experience with hooks and nudges?
- Which apps/products have hooks that you notice?
- Which apps/products have more virtue-building "nudges"?
- How would you approach this as a developer?
- Have you developed anything with hooks or nudges?

---

# Case Study: ChatGPT Age Verification

<!-- image: ChatGPT age verification flow using Yoti -->
- TODO: add image — *ChatGPT age verification flow using Yoti*

---

# Discussion: What Could Go Wrong?

<!-- image: age verification discussion slide — what failure modes exist? -->
- TODO: add image — *age verification discussion slide — what failure modes exist?*

---

# Yoti Security Testing

| Materials | Cost | Status |
|---|---|---|
| NIST Level 1: Normal home or office items | <$30 | ✅ bypassed |
| NIST Level 2: Masks, 3D printers, latex | <$300 | ✅ bypassed |

*Results from third-party testing for attack detection*

---

# Yoti Privacy Testing

- By default, advertising IDs and IP addresses submitted to third parties without consent:
  - Google (Firebase)
  - Adjust Analytics
  - Snowplow Analytics
- "Likely a violation of the GDPR"

*Source: "Redakteur" Schafers blogging for Mint Secure*

---

# Yoti Bias Testing

<!-- image: Yoti bias testing results — accuracy disparities by skin tone / demographics -->
- TODO: add image — *Yoti bias testing results — accuracy disparities by skin tone / demographics*

---

# Evolution of OpenAI

| Period | Status | Leadership | Valuation | Revenue |
|---|---|---|---|---|
| 2015–2018 | Pure nonprofit | Altman, Brockman, Musk | Minimal | Minimal |
| 2019–2021 | Split: nonprofit + capped-profit | Elon Musk departs | $1B from Microsoft | ~$3B |
| 2022–Mid 2025 | Capped profit | Sam Altman (briefly fired) | ~$30B → ~$300B | ~$13B |
| Late 2025 | Split: for-profit PBC + nonprofit | Sam Altman | $500B+ | — |

---

# Connecting to Ethical Theories

- **Virtue ethics**: Is a nudge virtuous? Does it help us become better people?
- **Deontological**: Does a nudge respect autonomy? Is manipulation ever permissible?
- **Utilitarian**: If a nudge increases aggregate well-being, is it justified even without consent?
- **Care ethics**: Who benefits from the nudge? Who bears the cost?

---

# Presentation Tips

---

# What Makes a Strong Book Presentation?

- **Clear thesis**: what is the book's central argument?
- **Specific evidence**: concrete examples and quotes
- **Ethical analysis**: which theory or theories help explain the stakes?
- **Personal reflection**: what did you learn? What changed your thinking?
- **Engagement**: how will you get the class involved?

---

# Reminders

- Continue reading your book!
- More grades incoming!
- Check Canvas, email with questions
- See you Wednesday for presentations!

---

# That's all for today!

See you Wednesday!

---

# Book Presentations + Intro to Fairness {.title-slide}

CS 377 · Week 12, Day 2 · 🟦 Belmont 🟦

---

# Topic Title Placeholder {.title-slide .photo-title data-state="photo-title" background-image="../assets/blue-line-stops/stop25-belmont-a.jpg" background-size="cover"}

CS 377 · Week 12, Day 2 · 🟦 Belmont 🟦

---

# Administrivia

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

# Agenda for Today

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

# Book Presentations

*See Canvas for the presentation schedule.*

---

# Discussion Protocol

- Listen actively — one presenter at a time
- Questions should be genuine and respectful
- Connect the book to course themes where you can

---

# Overview: Fairness Definitions Exercise

---

# What Is Algorithmic Fairness?

Fairness in algorithmic systems is not a single concept — it is a family of competing definitions.

---

# Warm-Up Discussion: Debrief Fairness Definitions

- Which definition did you choose? What made you choose it? Did others stick out?
- Which moral and/or political values did you see in this definition? What is the underlying ethical theory?
- Can it be modeled mathematically? If so, how?
- What was your case study?
- Other thoughts on the tutorial presentation? Fairness?

---

# Definitions Covered

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

# Opening Example: Rory Fresco

- Rory Fresco's "Lowkey" had ~5k plays on SoundCloud
- January 8, 2016: Kanye West releases "Real Friends" on SoundCloud
- Rory Fresco's "Lowkey" racked up millions of plays and he signed with Epic Records
- Example of **algorithmic privileging** — one definition of bias
- SoundCloud and Spotify now use more randomness in recommendations to counter this

---

# What Are the Stakes of Algorithmic Bias?

| Harm Type | Example |
|---|---|
| Representational harms | Amplification or suppression of information |
| Allocative harms | Lending opportunities |
| Quality of service harms | Medical school acceptance, educational opportunities |
| Interpersonal harms | Incorrect inferences and/or disclosures about people |
| Social system harms | Setting bail, sentencing limits |

---

# (In)Famous Examples of Algorithmic Bias

---

# Example: ChatGPT Salary Advice

<!-- image: "ChatGPT advises women to ask for lower salaries, study finds" — The Next Web -->
- TODO: add image — *"ChatGPT advises women to ask for lower salaries, study finds" — The Next Web*

---

# Example: Apple Card

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

# Example: Twitter Image Cropping

<!-- image: Twitter image cropping examples showing systematic bias toward lighter-skinned faces (series of 4 images) -->
- TODO: add image — *Twitter image cropping examples showing systematic bias toward lighter-skinned faces (series of 4 images)*

---

# Bias Bounty

<!-- image: Twitter Bias Bounty competition announcement -->
- TODO: add image — *Twitter Bias Bounty competition announcement*

---

# Bias Bounty: Student Submission by Bogdan Kulynych

<!-- image: Kulynych's bias bounty submission showing systematic cropping bias -->
- TODO: add image — *Kulynych's bias bounty submission showing systematic cropping bias*

---

# "Machine Bias" in COMPAS

- "Will this person re-offend?"

---

# The COMPAS System

- Used for **recidivism prediction** — predicting likelihood of re-offending
- Supposed to help judges determine whether a defendant should remain in jail until trial
- "Risk assessment tool" with 137 questions
- Weights based on observed data
- ProPublica analysis: "Machine Bias" (2016)

---

# COMPAS: Prediction Disparities

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

# Legacy of "Machine Bias"

- Pulitzer Prize Finalist in Explanatory Reporting
- Wisconsin Supreme Court allowed COMPAS as long as warnings given
- Northpointe changed name to Equivant; now publishes more assessment details

---

# "Old School" Bias (1996)

Examples from earlier automated systems:

- Airline reservation systems
- Residential matching program for medical students
- Loan approval systems

---

# *Weapons of Math Destruction* (Cathy O'Neil)

Examples from WMD:

- Going to College (ranking algorithms affecting admissions)
- Online Advertising (recidivism, poverty)
- Predictive Policing
- Getting a Job / Working on the Job
- Landing Credit
- Getting Insurance

---

# A bit about Cathy O'Neil

- Education: UC Berkeley, Harvard (PhD)
- Alice T. Schafer Prize winner (1993) — for "excellence in mathematics"
- Left academia in 2007
- Participated in Occupy Wall Street, exploring alternative banking
- *WMD* was on the National Book Awards Nonfiction Longlist (2016)
- 2022 book: *The Shame Machine*

---

# (Un)Fairness as (In)Equality: The Gini Coefficient

---

# Measuring Inequality

- "The top 1% own 26.5% of household wealth in the U.S." (Dec 2023)
- "Three people own more wealth than the bottom half of society" (Jan 2024)
- What if we could combine all these statistics into one metric?

<!-- image: photos from Occupy Wall Street -->
- TODO: add image — *photos from Occupy Wall Street*

---

# Gini Coefficient

- Max Lorenz (American economist) → Lorenz curve
- Corrado Gini (Italian statistician), *Variabilità e mutabilità* (1912)
- Line of perfect equality vs. actual distribution curve
- Live demo: yellkey.com/clearly

<!-- image: Lorenz Curve for Net Worth in the U.S. as of 2019 (Federal Reserve) -->
- TODO: add image — *Lorenz Curve for Net Worth in the U.S. as of 2019 (Federal Reserve)*

---

# Gini as Equality (versus Equity)

<!-- image: equality vs. equity illustration -->
- TODO: add image — *equality vs. equity illustration*

---

# U.S. Income Gini Trends

<!-- image: Census Bureau, "Income in the United States: 2024" — Gini coefficient trend chart -->
- TODO: add image — *Census Bureau, "Income in the United States: 2024" — Gini coefficient trend chart*

---

# Fairness Definitions Exercise

- Choose one fairness definition from the tutorial
- Identify the underlying ethical theory and values
- Apply it to a real case study of your choosing
- Due before next class — see Canvas for details

---

# That's all for today!

See you next week for more presentations!

---

# References & Credits {.sources}

1. BJ Fogg, ["Persuasive Computers: Perspectives and Research Directions"](https://dl.acm.org/doi/10.1145/274644.274677), *CHI 1998*.
2. Thomas Mildner, ["Cheat Sheet of Dark Design Patterns"](https://thomasessmeyer.com/darkpatterns.html); [darkpatterns.uxp2.com](https://darkpatterns.uxp2.com/).
3. ASCI Academy, [Gallery of "Conscious" Design Patterns](https://www.consciouspatterns.in/ethical-gallery).
4. ProPublica, ["Machine Bias"](https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing), 2016.
5. Cathy O'Neil, [*Weapons of Math Destruction*](https://weaponsofmathdestructionbook.com/) (2016).
6. Chouldechova, A. (2017). ["Fair Prediction with Disparate Impact."](https://doi.org/10.1089/big.2016.0047) *Big Data.*
7. Census Bureau, ["Income in the United States: 2024"](https://www.census.gov/library/publications/2024/demo/p60-282.html).
8. Slide deck built with [Quarto](https://quarto.org/) and Reveal.js.
