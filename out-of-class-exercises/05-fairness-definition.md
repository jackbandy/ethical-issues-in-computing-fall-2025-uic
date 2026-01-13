# Fairness Definition

## Background on Algorithmic Bias
In 2016, ProPublica released a report titled [Machine Bias](https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing). Public interest in the topic has steadily grown since then, according to [Google trends](https://trends.google.com/trends/explore?date=all&geo=US&q=machine%20bias,algorithmic%20bias,AI%20bias&hl=en), with swelling interest in terms like "algorithmic bias" and "AI bias." 

In particular, searches for "AI Bias" have seen a significant spike since Fall 2022, I seem to remember some kind of app or product released around that time... Still, the term "algorithmic bias" is [winning out in books](https://books.google.com/ngrams/graph?content=algorithmic+bias%2Calgorithmic+fairness%2Cmachine+bias%2CAI+bias&year_start=1990&year_end=2022&corpus=en&smoothing=3). 

So, what is [algorithmic bias](https://en.wikipedia.org/wiki/Algorithmic_bias)? Wikipedia editors have settled on the following definition: `a systematic and repeatable harmful tendency in a computerized sociotechnical system to create "unfair" outcomes, such as "privileging" one category over another in ways different from the intended function of the algorithm.`

That's a great place to start, and the [Wikipedia article](https://en.wikipedia.org/wiki/Algorithmic_bias) includes some high-profile examples:
* Stereotypes in language models (e.g. [anti-muslim bias in GPT-3](https://doi.org/10.1145/3461702.3462624))
* Automated hiring tools (e.g. [Amazon's automated resume screening discriminated against women](https://www.aclu.org/news/womens-rights/why-amazons-automated-hiring-tool-discriminated-against))
* Discrimination in computer vision (e.g. Google's photos app [mistakenly labeling Black couples as gorillas](https://www.bbc.com/news/technology-33347866))
* Gender bias in machine translation (e.g. [defaulting to different pronouns based on professional/domestic roles](https://blog.google/products/translate/reducing-gender-bias-google-translate/))
* Facial analysis tools (e.g. [higher error rates for darker-skinned women](http://gendershades.org/index.html))
* Healthcare algorithms (e.g. [underestimating health needs of Black patients](https://www.science.org/doi/10.1126/science.aax2342))
* Credit scoring and finance (e.g. [Apple offering higher credit limits to men than to women](https://www.bbc.com/news/business-50365609), even when their profiles are otherwise similar)

## Your Exercise
For this exercise, I was inspired by Walter Maner's [provocation](https://link.springer.com/article/10.1007/BF02583549) that "conceptual shock therapy" might not be the best way to approach computer ethics. In particular, `A litany of horror stories does not itself provide a coherent concept of computer ethics.` We seem to have broad agreement around the "litany of horror stories" when it comes to algorithmic bias, and the shock of these case studies hopefully grabs your attention.

To nudge us toward a more constructive approach, for this exercise we will be defining "the opposite of bias."

Specifically, you will:
* **Watch Arvind Narayanan's presentation, "[21 fairness definitions and their politics](https://www.youtube.com/watch?v=jIXIuYdnyyk)"**
* Write out at least ten of the definitions mentioned
  * Include the name and a brief summary, e.g. "group parity: people in different groups have equal probabilities of being assigned to the positive predicted class"
* Identify one definition that you found especially compelling, and answer the following questions:
  * Why did you find this definition (the most) compelling?
  * According to the presentation, each definition is associated with moral and/or political values. Which values do you see in the definition you chose?
  * Can this definition be faithfully translated to a mathematical formula?
    * If so, what is it?
    * If not, why not?
  * Give a specific real-world case study where this definition could be used. Explain in detail what "fairness" would mean in this context, and what "bias" would mean.
* Turn in your work through Gradescope



