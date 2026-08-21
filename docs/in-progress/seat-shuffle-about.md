# About the Seat Shuffler

bell hooks [said](https://www.goodreads.com/quotes/8383318-the-classroom-remains-the-most-radical-space-of-possibility-in) that "The classroom remains the most radical space of possibility in the academy."

What characteristics of the classroom help create this radical possibility?

From what I have observed in dozens of classrooms, as well as what I have read in scholarship of teaching and learning (SoTL), one such characteristic is the chance to meet and learn from other people -- especially people you would not otherwise have met. To support this, I expend some of my authority in the classroom towards regularly making students shuffle seats. I have been experimenting with different methods for this since the first time I taught in 2022. This is the current approach.

(When the "groups" are partners, I use a different approach to cycle through the different combinations and avoid repeats.)

## How It Works

The basic goal is to create a "slip" for each seat naming a destination table, shuffle them around, and then give a random slip to each occupied seat.

If people were literally drawing slips from a hat, there is a possibility that they would end up at the same table where they are currently sitting. They might also migrate to a different table with the same people from their original table. This tool has constraints to prevent both such scenarios.

Because of these constraints, the tool does not actually "draw slips." The pseudocode is as follows:
* Check absences / missing seats
* Figure out how many students each destination table should receive
* Route as a small "max-flow" problem, where each table supplies the students sitting at it, each destination demands its share, and every table-to-table link has capacity one (that forces a table's students to split up).
* Any flow that moves everybody is a valid seating.
* The result is then randomly walked around the space of valid seatings by trading destinations between pairs of tables, which keeps every constraint intact while spreading the result across the many valid seatings a room allows, rather than always returning the first one the solver happens to find.

## Showing the Result

Two checkboxes control how much of the answer is drawn. **Colors** paints each table in its CTA line color and puts a dot at every occupied seat in the color of the table that seat is heading to, which is enough to read the room at a glance. **Paths** draws the actual routes, each one running through the aisles to the table it arrives at. They are independent, so you can use either, both, or neither.

## Erasing Seats

Click any seat to erase it, and click it again to bring it back. An erased seat is a student who is not there today — an absence, or a corner of the room you are not using. Erased seats are left out of the shuffle.

The chair itself does not disappear, though, so a table with an erased seat can still *receive* a full four students. The exception is a table where every seat is erased: that table is out of the room entirely, and nobody is sent to it.

With enough seats erased the constraints can become impossible to satisfy at once — a table of four has to split four ways, and those four destinations need at least twelve students between them. When that happens a ⚠️ appears in the top-right corner; hover it for an explanation of which rule ran out of room. The tool would rather say so than quietly break one of its own rules.

The "loading" is purely for entertainment / amusement. The shuffle itself finishes in a few milliseconds (I think it's an NP problem, but the room is fixed at eight tables, so there is never too much to search) but the spinner effect is fun to watch for a few seconds. Same with the drawing animation. If you want more details, check out the javascript (`shuffle.js`) in the repository. It was largely written by Copilot.

## Constraints

This tool assumes a room of eight tables with four seats each, with any number of those seats erased. When the seats are shuffled...
- At any table, the occupied seats all go to **different** destination tables.
- The destination table is always different from the current table.
- Any table that receives students receives **at least three** of them — never a lone student or a pair — and never more than four.
- No table sits empty unless there genuinely aren't enough students to fill it under the rules above.
- A table with every seat erased is out of the room, and receives nobody.
- The same seed number, with the same seats erased, always produces the same assignment.

## TODO

Write more about the pedagogy behind the tool, the algorithm itself, the number of possibilities, etc.
