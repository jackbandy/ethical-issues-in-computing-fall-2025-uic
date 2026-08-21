---
layout: page
title: FAQ
nav_current: faq
description: Frequently asked questions about this section of CS 377, Ethical Issues in Computing at UIC.
---


## The CTA Theme

**Q: Why is it all themed around the Blue Line?**

A: It was originally just a connection to the trolley problem, one of the most well-known motifs in ethics.

On top of that, the course meets in Chicago, the semester has a fixed number of class meetings, and the CTA Blue Line has a fixed number of stations. Each class day gets a stop, in order, running from Forest Park out to O'Hare. 

The Blue Line has 33 stations end to end, and the semester has 30 class meetings, two of which are holidays. This leaves 28 stops to visit. Right now the five skipped stations are Harlem (on the Forest Park branch), Austin, Pulaski, Kedzie-Homan, and Monroe.

The [CTA Trademark Guidelines](https://www.transitchicago.com/developers/branding/) ask projects to use the proper CTA 'L' route colors, to follow the official style guide, and to say plainly when a project is inspired by Chicago's transit system — hence this answer. This site uses the official Blue Line color (#00A1DE). This is an educational project. It is not official, authorized, or endorsed by the CTA, and it does not use CTA logos, names, or marks in any way meant to suggest an official affiliation.

## Phones and Laptops

**Q: Why can't I use my laptop in class?**

A: My experience as a student as an instructor, as well as a good amount of experimental evidence, suggests that in-class device usage hurts learning (including for the people sitting near you). The full reasoning, along with links to peer-reviewed studies, is in the [syllabus](syllabus/). The short version is that in-class device use is consistently found to be distracting and to reduce long-term retention, even for students who feel they multitask well ([Glass & Kang, 2019](https://doi.org/10.1080/01443410.2018.1489046)).

You will be given paper for notes. If you would rather take notes on a device that lies flat on the table and you are confident it will not distract you or anyone else, we can make an arrangement. The policy is revisited with students over the semester and can change based on feedback and evidence.

## Student AI Use

**Q: Can I use ChatGPT, Claude, or similar tools for this class?**

A: It depends on the exercise. Many exercises are deliberately in-class, on paper, and/or in-person. For the rest, the policy is marked with a CTA rail signal aspect rather than the usual red-yellow-green traffic light (see the [1973 CTA rulebook page](assets/signals/CTA-rulebook-1973.pdf) these aspects come from). Every exercise on Canvas carries one of the three signals below, and the full policy is in the [syllabus](syllabus/).

### Double red: no AI/LLM-based tools

<div class="signal-aspect" markdown="1">
![Two red lamps stacked vertically. CTA rulebook: "Stop and stay."](assets/signals/signal-01-stop-stay.svg)
<div class="signal-aspect-body" markdown="1">
"Stop and stay." No AI usage at all (although I have no means to really police this). This is the default for the course, and it covers all in-class work, all pre-class reflections, and the "read a book" exercises. In my view and the view of many other educators, there are some concepts that should be fully learned and absorbed before you reach for a tool that will help you. As with many other tools, one needs a foundational understanding of some domain in order to have the [discernment necessary for effectively using AI](https://pluralistic.net/2026/07/28/hitl-ers/).
</div>
</div>

### Yellow over red: limited, specific use of AI/LLM-based tools

<div class="signal-aspect" markdown="1">
![A yellow lamp above a red lamp. CTA rulebook: "Proceed with caution on main route, prepared to stop at next signal."](assets/signals/signal-02-caution-main.svg)
<div class="signal-aspect-body" markdown="1">
"Proceed with caution on main route, prepared to stop at next signal." A specific, carefully-scoped set of tasks where use of AI/LLM-based tools is allowed (but not required), usually to scrutinize, evaluate, and/or critique the system in some way. Take the marshmallow test and see how you do. See how the tool fails, and decide if/when you find it useful, and pay close attention! Cite whatever you used.
</div>
</div>

### Double yellow: choose carefully where you use it, use it carefully

<div class="signal-aspect" markdown="1">
![Two yellow lamps stacked vertically. CTA rulebook: "Proceed with caution at restricted speed."](assets/signals/signal-09-caution-restricted.svg)
<div class="signal-aspect-body" markdown="1">
"Proceed with caution at restricted speed." You choose where AI/LLM-based tools fit into your own workflow. Every use is still at "reduced speed and full attention," you should be prepared to justify it, and you should cite it.
</div>
</div>

The double-yellow exercises matter because they seem to be the default setup in the real world -- you will eventually choose your own adventure. It thus seems important to have some experience with this kind of open-ended judgment call in a communal learning environment - let's talk about it and think about it together before you go out into the real world.

When the signal is yellow-over-red or double yellow and you do use a tool, cite it: what tool and version, what you asked it to do, and what you did with the output. The [syllabus](syllabus/) has the exact wording.

As with the "instructor AI use" section, my ideas/opinions on this topic continue to evolve, and I am especially curious about any evidence-based viewpoints on this one.

## Instructor AI/LLM Use

**Q: Were these materials made with AI/LLMs?**

A: I do not use AI/LLMs to draft or design teaching materials. For the supporting code that serves that material, I do use AI/LLMs (i.e. to write the html/javascript for many parts of this website). For example, I used LLM-based coding tools to set up the Jekyll workflow that automatically serves the plain-text .md file for each ethical dilemma as its own .html page.

I also sometimes use AI/LLM-based tools to convert between formats, if I have materials I have already made. E.g. for Fall 2026, I am moving away from Keynote/PowerPoint/Google Slides, so I asked an LLM-based coding tool to write a script that auto-converted PDF exports of my old slides into .md draft versions that can be built by quarto slides. I review/vet/edit these conversions before using them in class.

More of my thinking and philosophy on AI/LLM usage is [here](https://jackbandy.com/text/llm-code-philosophy.html). One of my rules of thumb is to treat generated work like a credit card, i.e. to avoid generating anything I cannot "pay back" (i.e. explain, modify, or rewrite myself).

Files have a `NOTICE:` header of some kind if an LLM substantially wrote or modified it. I take responsibility for everything here in the repo (i.e. any mistakes are my fault).

## Why a Book

**Q: Why does this class make me read a whole book?**

A: At least four reasons, which we go over in [Week 3](slides/week3.html#/choosing-a-book):

- Feed and follow your curiosity.
- Get used to self-directed learning.
- Learn from human experts.
- Escape in-depth

You choose the book yourself, and the [book gallery](books.html) shows what students have picked in past semesters.

## Why Short Stories

**Q: What do science fiction stories have to do with computing ethics? Why are we reading short stories in a CS class?**

A: Many reasons! For one, they let us practice ethical decision-making on recognizable situations that do not yet have the real-world stakes. Fictional stories are also valuable in that they  *defamiliarize*, detaching us from preconceptions and sometimes revealing assumptions we did not initially recognize. Stories can also be quite fun!

The approach follows Burton, Goldsmith, and Mattei (2018), ["How to teach computer ethics through science fiction"](https://doi.org/10.1145/3230977), *Communications of the ACM*.

## The Dilemmas

**Q: What is the dilemmas page for?**

A: The [dilemmas](dilemmas/) are the short case studies and examples from class, e.g. the Heinz dilemma, the porcupine and the moles, the trolley variants, and others. Each one has its own page with supporting sources.

## Slides and Materials

**Q: Why are the slides built this way instead of Google Slides or PowerPoint?**

A: The decks are written in Markdown and rendered with [Quarto](https://quarto.org/), which is free and open-source. Keeping the content in plain text (and SVG files) means the slides can be recreated, ported, and/or moved to a different host later. It also makes it easier to read and edit the source of any deck (at least for me, I would rather edit one long text file instead of clicking through a bunch of different slides).

Every slide deck is listed on the [slides page](slides/), and each one links its own source on GitHub.

## Using and Reusing These Materials

**Q: Can I reuse these materials?**

A: The materials are shared under [CC BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/) unless a page says otherwise. Basically, you can remix/reuse/reshare anything as long as you're not trying to make a profit, as long as you cite the source, and as long as you distribute those materials under a similar license.

The whole site is [on GitHub](https://github.com/jackbandy/ethical-issues-in-computing-uic), and direct corrections/ suggestions are welcome!

Note that some linked materials (and some materials in Canvas) are copyrighted and are not redistributable — please help protect copyright integrity for those.

## Something Else

**Q: My question isn't here.**

A: Ask in class or over email! Someone else might have the same question.
