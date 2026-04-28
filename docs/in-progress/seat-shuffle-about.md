# About the Seat Shuffler

bell hooks [said](https://www.goodreads.com/quotes/8383318-the-classroom-remains-the-most-radical-space-of-possibility-in) that "The classroom remains the most radical space of possibility in the academy."

What characteristics of the classroom help create this radical possibility?

From what I have observed in dozens of classrooms, as well as what I have read in scholarship of teaching and learning (SoTL), one such characteristic is the chance to meet and learn from other people -- especially people you would not otherwise have met. To support this, I expend some of my authority in the classroom towards regularly making students shuffle seats. I have been experimenting with different methods for this since the first time I taught in 2022. This is the current approach.

(When the "groups" are partners, I use a different approach to cycle through the different combinations and avoid repeats.)

## How It Works

The algorithm itself is pretty simple. Each table has four seats, so the basic goal is to create four "slips" for each destination table (e.g. four slips that say "table 1"), shuffle them around, and then give a random slip to each seat.

If people were literally drawing slips from a hat, there is a possibility that they would end up at the same table where they are currently sitting. They might also migrate to a different table with the same people from their original table. This tool has constraints to prevent both such scenarios.

The "loading" is purely for entertainment / amusement. The shuffle itself runs quickly (in constant time), but the spinner effect is fun to watch for a few seconds. Same with the drawing animation. If you want more details, check out the javascript (`shuffle.js`) in the repository. It was largely coded by Copilot.

## Constraints

For now, this tool works for a single use case: there are eight tables with four seats each. When the seats are shuffled...
- At any table, all four seats go to **different** destination tables.
- The destination table is always different from the current table.
- Every table (1–8) receives exactly **four** assignments.
- The same seed number always produces the same assignment.

## TODO

Write more about the pedagogy behind the tool, the algorithm itself, the number of possibilities, etc.
