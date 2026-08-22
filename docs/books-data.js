// Source of truth for the book gallery — edit this file directly.
// Add reviews in the `reviews:` array of the book you're reviewing.
// `Image:` (local cover path) and `color:` are written by the scripts in
// docs/fetch-book-covers.py and sandbox/cover-colors.py — don't hand-edit those.

const books = [
  {
    id: "unmasking-ai--my-mission-to-protect-what-is-human-in-a-world",
    Title: "Unmasking AI: My Mission to Protect What Is Human in a World of Machines",
    Author: "Joy Buolamwini",
    ISBN: "9780593241837",
    Link: "https://bookshop.org/p/books/unmasking-ai-a-story-of-hope-and-justice-in-a-world-of-algorithms-joy-buolamwini/20010838?ean=9780593241844",
    Image: "assets/book-cover-cache/9780593241837.jpg",
    color: "#0b0408",
    sourceImage: "https://images-us.bookshop.org/ingram/9780593241844.jpg?height=500&v=v2-3af71f0ecb94b12d8f377e16e7a299df",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "cobalt-red--how-the-blood-of-the-congo-powers-our-lives",
    Title: "Cobalt Red: How the Blood of the Congo Powers Our Lives",
    Author: "Siddharth Kara",
    ISBN: "9781250322159",
    Link: "https://bookshop.org/p/books/cobalt-red-how-the-blood-of-the-congo-powers-our-lives-siddharth-kara/18411025?ean=9781250322159",
    Image: "assets/book-cover-cache/9781250322159.jpg",
    color: "#9c6855",
    sourceImage: "https://images-us.bookshop.org/ingram/9781250322159.jpg?height=500&v=v2-d313fec179460fd37e88bda775b0ffb4",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "empire-of-ai--dreams-and-nightmares-in-sam-altman-s-openai",
    Title: "Empire of AI: Dreams and Nightmares in Sam Altman's OpenAI",
    Author: "Karen Hao",
    ISBN: "9780593657508",
    Link: "https://bookshop.org/p/books/empire-of-ai-dreams-and-nightmares-in-sam-altman-s-openai-karen-hao/22156498?ean=9780593657508",
    Image: "assets/book-cover-cache/9780593657508.jpg",
    color: "#cbcedc",
    sourceImage: "https://images-us.bookshop.org/ingram/9780593657508.jpg?height=500&v=v2-58322673ac904ac76869519a5910af4c",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "alone-together--why-we-expect-more-from-technology-and-less-",
    Title: "Alone Together: Why We Expect More from Technology and Less from Each Other",
    Author: "Sherry Turkle",
    ISBN: "9780465093656",
    Link: "https://bookshop.org/search?keywords=9780465093656",
    Image: "assets/book-cover-cache/9780465093656.jpg",
    color: "#f68f36",
    sourceImage: "https://images-us.bookshop.org/ingram/9780465093656.jpg?height=500&v=v2",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "breaking-the-social-media-prism--how-to-make-our-platforms-l",
    Title: "Breaking the Social Media Prism: How to Make Our Platforms Less Polarizing",
    Author: "Chris Bail",
    ISBN: "9780691203423",
    Link: "https://bookshop.org/search?keywords=9780691203423",
    Image: "assets/book-cover-cache/9780691203423.jpg",
    color: "#dde5e8",
    sourceImage: "https://images-us.bookshop.org/ingram/9780691203423.jpg?height=500&v=v2",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "amusing-ourselves-to-death--public-discourse-in-the-age-of-s",
    Title: "Amusing Ourselves to Death: Public Discourse in the Age of Show Business",
    Author: "Neil Postman and Andrew Postman",
    ISBN: "9780143036531",
    Link: "https://bookshop.org/p/books/amusing-ourselves-to-death-public-discourse-in-the-age-of-show-business-neil-postman/6781325?ean=9780143036531",
    Image: "assets/book-cover-cache/9780143036531.jpg",
    color: "#fa1e21",
    sourceImage: "https://images-us.bookshop.org/ingram/9780143036531.jpg?height=500&v=v2-c7d5465cc6e0031b506bae12ee7768bb",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "digital-minimalism--choosing-a-focused-life-in-a-noisy-world",
    Title: "Digital Minimalism: Choosing a Focused Life in a Noisy World",
    Author: "Cal Newport",
    ISBN: "9780525536512",
    Link: "https://bookshop.org/p/books/digital-minimalism-choosing-a-focused-life-in-a-noisy-world-cal-newport/12081448?ean=9780525536512",
    Image: "assets/book-cover-cache/9780525536512.jpg",
    color: "#f9ca14",
    sourceImage: "https://images-us.bookshop.org/ingram/9780525536512.jpg?height=500&v=v2-e2220c4f0251619e7025bddcce051139",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "the-shallows--what-the-internet-is-doing-to-our-brains",
    Title: "The Shallows: What the Internet Is Doing to Our Brains",
    Author: "Nicholas Carr",
    ISBN: "9780393357820",
    Link: "https://bookshop.org/p/books/the-shallows-what-the-internet-is-doing-to-our-brains-nicholas-carr/15563044?ean=9780393357820",
    Image: "assets/book-cover-cache/9780393357820.jpg",
    color: "#ecb832",
    sourceImage: "https://images-us.bookshop.org/ingram/9780393357820.jpg?height=500&v=v2-8e1c1d03c07d41f894d11e6667bb33bc",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "altered-carbon",
    Title: "Altered Carbon",
    Author: "Richard K. Morgan",
    ISBN: "9780345457684",
    Link: "https://bookshop.org/search?keywords=9780345457684",
    Image: "assets/book-cover-cache/9780345457684.jpg",
    color: "#0a080a",
    sourceImage: "https://images-us.bookshop.org/ingram/9780345457684.jpg?height=500&v=v2",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "a-hacker-s-mind--how-the-powerful-bend-society-s-rules--and-",
    Title: "A Hacker's Mind: How the Powerful Bend Society's Rules, and How to Bend Them Back",
    Author: "Bruce Schneier",
    ISBN: "9781324074533",
    Link: "https://bookshop.org/search?keywords=9781324074533",
    Image: "assets/book-cover-cache/9781324074533.jpg",
    color: "#9ad9ef",
    sourceImage: "https://images-us.bookshop.org/ingram/9781324074533.jpg?height=500&v=v2",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "i-am-a-fugitive-from-a-georgia-chain-gang",
    Title: "I am a Fugitive from a Georgia Chain Gang!",
    Author: "Robert E. Burns",
    ISBN: "9781610273763",
    Link: "https://bookshop.org/search?keywords=9781610273763",
    Image: "assets/book-cover-cache/9781610273763.jpg",
    color: "#201f1f",
    sourceImage: "https://images-us.bookshop.org/ingram/9781610273763.jpg?height=500&v=v2",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "robopocalipsis---robopocalypse",
    Title: "Robopocalipsis / Robopocalypse",
    Author: "Daniel H. Wilson",
    ISBN: "9780307949103",
    Link: "https://bookshop.org/search?keywords=9780307949103",
    Image: "assets/book-cover-cache/9780307949103.jpg",
    color: "#dae0e3",
    sourceImage: "https://images-us.bookshop.org/ingram/9780307949103.jpg?height=500&v=v2",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "irresistible--the-rise-of-addictive-technology-and-the-busin",
    Title: "Irresistible: The Rise of Addictive Technology and the Business of Keeping Us Hooked",
    Author: "Adam Alter",
    ISBN: "9780735222847",
    Link: "https://bookshop.org/search?keywords=9780735222847",
    Image: "assets/book-cover-cache/9780735222847.jpg",
    color: "#10192e",
    sourceImage: "https://images-us.bookshop.org/ingram/9780735222847.jpg?height=500&v=v2",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "the-machine-question--critical-perspectives-on-ai--robots--a",
    Title: "The Machine Question: Critical Perspectives on AI, Robots, and Ethics",
    Author: "David J. Gunkel",
    ISBN: "9780262304511",
    Link: "https://bookshop.org/search?keywords=9780262304511",
    Image: "assets/book-cover-cache/9780262304511.jpg",
    color: "#cacccb",
    sourceImage: "https://images-us.bookshop.org/ingram/9780262304511.jpg?height=500&v=v2",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
       {
         reviewer: "Neel Patel",
         rating: 4,          // 1-5
         text: "A thought-provoking book that tackles a question we rarely stop to consider: do AI and robots deserve moral consideration? Gunkel walks through the history of philosophy and ethics to explore whether machines can be moral agents or moral patients. The book challenges the assumption that technology is just a tool, and connects AI ethics to broader philosophical debates about rights and personhood. Highly recommended for anyone interested in the ethical implications of AI."
       },
    ]
  },
  {
    id: "klara-and-the-sun--a-gma-book-club-pick",
    Title: "Klara and the Sun: A GMA Book Club Pick",
    Author: "Kazuo Ishiguro",
    ISBN: "9780593318188",
    Link: "https://bookshop.org/search?keywords=9780593318188",
    Image: "assets/book-cover-cache/9780593318188.jpg",
    color: "#ec3537",
    sourceImage: "https://images-us.bookshop.org/ingram/9780593318188.jpg?height=500&v=v2",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "when-breath-becomes-air",
    Title: "When Breath Becomes Air",
    Author: "Paul Kalanithi",
    ISBN: "9780812988413",
    Link: "https://bookshop.org/search?keywords=9780812988413",
    Image: "assets/book-cover-cache/9780812988413.jpg",
    color: "#fcf5ee",
    sourceImage: "https://images-us.bookshop.org/ingram/9780812988413.jpg?height=500&v=v2",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "1984",
    Title: "1984",
    Author: "George Orwell",
    ISBN: "9780452262935",
    Link: "https://bookshop.org/search?keywords=9780452262935",
    Image: "assets/book-cover-cache/9780452262935.jpg",
    color: "#e20203",
    sourceImage: "https://images-us.bookshop.org/ingram/9780452262935.jpg?height=500&v=v2",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "the-chaos-machine--the-inside-story-of-how-social-media-rewi",
    Title: "The Chaos Machine: The Inside Story of How Social Media Rewired Our Minds and Our World",
    Author: "Max Fisher",
    ISBN: "9780316703307",
    Link: "https://bookshop.org/search?keywords=9780316703307",
    Image: "assets/book-cover-cache/9780316703307.jpg",
    color: "#080707",
    sourceImage: "https://images-us.bookshop.org/ingram/9780316703307.jpg?height=500&v=v2",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "algospeak",
    Title: "Algospeak",
    Author: "Adam Aleksic",
    ISBN: "9780593804087",
    Link: "https://bookshop.org/search?keywords=9780593804087",
    Image: "assets/book-cover-cache/9780593804087.jpg",
    color: "#f2f2e5",
    sourceImage: "https://images-us.bookshop.org/ingram/9780593804087.jpg?height=500&v=v2",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "snow-crash",
    Title: "Snow Crash",
    Author: "Neal Stephenson",
    ISBN: "9780553898194",
    Link: "https://bookshop.org/search?keywords=9780553898194",
    Image: "assets/book-cover-cache/9780553898194.jpg",
    color: "#070f11",
    sourceImage: "https://images-us.bookshop.org/ingram/9780553898194.jpg?height=500&v=v2",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "who-knows-you-by-heart--a-novel",
    Title: "Who Knows You by Heart: A Novel",
    Author: "C. J. Farley",
    ISBN: "9780063418660",
    Link: "https://bookshop.org/search?keywords=9780063418660",
    Image: "assets/book-cover-cache/9780063418660.jpg",
    color: "#093524",
    sourceImage: "https://images-us.bookshop.org/ingram/9780063418660.jpg?height=500&v=v2",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "accelerando",
    Title: "Accelerando",
    Author: "Charles Stross",
    ISBN: "9781101208472",
    Link: "https://bookshop.org/search?keywords=9781101208472",
    Image: "assets/book-cover-cache/9781101208472.jpg",
    color: "#261210",
    sourceImage: "https://images-us.bookshop.org/ingram/9781101208472.jpg?height=500&v=v2",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "the-internet-con--how-to-seize-the-means-of-computation",
    Title: "The Internet Con: How to Seize the Means of Computation",
    Author: "Cory Doctorow",
    ISBN: "9781804292143",
    Link: "https://bookshop.org/p/books/the-internet-con-how-to-seize-the-means-of-computation-cory-doctorow/18771891?ean=9781804292143",
    Image: "assets/book-cover-cache/9781804292143.jpg",
    color: "#eae8e6",
    sourceImage: "https://images-us.bookshop.org/ingram/9781804292143.jpg?height=500&v=v2-51a8e25efb2e0954626ea1677d11059c",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "uglies-reissue",
    Title: "Uglies(Reissue)",
    Author: "Scott Westerfeld",
    ISBN: "9781442419810",
    Link: "https://bookshop.org/search?keywords=9781442419810",
    Image: "assets/book-cover-cache/9781442419810.jpg",
    color: "#171310",
    sourceImage: "https://images-us.bookshop.org/ingram/9781442419810.jpg?height=500&v=v2",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "in-a-different-voice--psychological-theory-and-women-s-devel",
    Title: "In a Different Voice: Psychological Theory and Women's Development",
    Author: "Carol Gilligan",
    ISBN: "9780674970960",
    Link: "https://bookshop.org/search?keywords=9780674970960",
    Image: "assets/book-cover-cache/9780674970960.jpg",
    color: "#ab0a3c",
    sourceImage: "https://images-us.bookshop.org/ingram/9780674970960.jpg?height=500&v=v2",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "the-alignment-problem--machine-learning-and-human-values",
    Title: "The Alignment Problem: Machine Learning and Human Values",
    Author: "Brian Christian",
    ISBN: "9780393635836",
    Link: "https://bookshop.org/search?keywords=9780393635836",
    Image: "assets/book-cover-cache/9780393635836.jpg",
    color: "#efeee9",
    sourceImage: "https://images-us.bookshop.org/ingram/9780393635836.jpg?height=500&v=v2",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "platform-socialism--how-to-reclaim-our-digital-future-from-b",
    Title: "Platform Socialism: How to Reclaim Our Digital Future from Big Tech",
    Author: "James Muldoon",
    ISBN: "9780745346953",
    Link: "https://bookshop.org/search?keywords=9780745346953",
    Image: "assets/book-cover-cache/9780745346953.jpg",
    color: "#d85758",
    sourceImage: "https://images-us.bookshop.org/ingram/9780745346953.jpg?height=500&v=v2",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "the-creative-act",
    Title: "The Creative Act",
    Author: "Rick Rubin",
    ISBN: "9780593653425",
    Link: "https://bookshop.org/search?keywords=9780593653425",
    Image: "assets/book-cover-cache/9780593653425.jpg",
    color: "#cacec5",
    sourceImage: "https://images-us.bookshop.org/ingram/9780593653425.jpg?height=500&v=v2",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      {
        reviewer: "Musa Tahir",
        rating: 2,          // 1-5
        text: "Out of all art forms, I love music the most. So when I had the opportunity to read a book written by a well-established producer in the industry who could give me insight on their creative process, I was really excited. I was expecting to see some technical processes, how Rubin might interpret different sounds, etc., but as I read through the book, it felt more like his 'spiritual' connection with creativity. As I read the book, I did some research on him and his label. I felt that he was sort of contradicting himself, or maybe I interpreted his words differently. Either way I personall had a negative experience with the book. With that being said, if I just interpret his words the way I want to, and ignore his actions/beliefs outside the book, then I did enjoy some aspects of it, especially the chapter about intention in art. But as of now, I would give the book a 2 out of 5. rating"
      },
    ]
  },
  {
    id: "ghost-in-the-wires--my-adventures-as-the-world-s-most-wanted",
    Title: "Ghost in the Wires: My Adventures as the World's Most Wanted Hacker",
    Author: "Kevin Mitnick and William L. Simon",
    ISBN: "9780316037723",
    Link: "https://bookshop.org/search?keywords=9780316037723",
    Image: "assets/book-cover-cache/9780316037723.jpg",
    color: "#050505",
    sourceImage: "https://images-us.bookshop.org/ingram/9780316037723.jpg?height=500&v=v2",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "trustworthy-ai--a-business-guide-for-navigating-trust-and-et",
    Title: "Trustworthy AI: A Business Guide for Navigating Trust and Ethics in AI",
    Author: "Beena Ammanath",
    ISBN: "9781119867920",
    Link: "https://bookshop.org/search?keywords=9781119867920",
    Image: "assets/book-cover-cache/9781119867920.jpg",
    color: "#0a0a13",
    sourceImage: "https://images-us.bookshop.org/ingram/9781119867920.jpg?height=500&v=v2",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "i-have-no-mouth--and-i-must-scream",
    Title: "I Have No Mouth, and I Must Scream",
    Author: "Harlan Ellison",
    ISBN: "9781454969280",
    Link: "https://bookshop.org/search?keywords=9781454969280",
    Image: "assets/book-cover-cache/9781454969280.jpg",
    color: "#141810",
    sourceImage: "https://images-us.bookshop.org/ingram/9781454969280.jpg?height=500&v=v2",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "a-gift-of-fire--social--legal--and-ethical-issues-for-comput",
    Title: "A Gift of Fire: Social, Legal, and Ethical Issues for Computing Technology",
    Author: "Timothy Henry and Sara Baase",
    ISBN: "9780134615271",
    Link: "https://bookshop.org/p/books/a-gift-of-fire-social-legal-and-ethical-issues-for-computing-technology-timothy-henry/9446498?ean=9780134615271",
    Image: "assets/book-cover-cache/9780134615271.jpg",
    color: "#070709",
    sourceImage: "https://images-us.bookshop.org/ingram/9780134615271.jpg?height=500&v=v2",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "addiction-by-design--machine-gambling-in-las-vegas",
    Title: "Addiction by Design: Machine Gambling in Las Vegas",
    Author: "Natasha Dow Sch\u00fcll",
    ISBN: "9780691160887",
    Link: "https://bookshop.org/p/books/addiction-by-design-machine-gambling-in-las-vegas-natasha-dow-schull/8970988?ean=9780691160887",
    Image: "assets/book-cover-cache/9780691160887.jpg",
    color: "#060605",
    sourceImage: "https://images-us.bookshop.org/ingram/9780691160887.jpg?height=500&v=v2-3b6baf93e1753354aa729a78344df1b7",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "ai-2041--ten-visions-for-our-future",
    Title: "AI 2041: Ten Visions for Our Future",
    Author: "Kai-Fu Lee and Chen Qiufan",
    ISBN: "9780593238318",
    Link: "https://bookshop.org/p/books/ai-2041-ten-visions-for-our-future-kai-fu-lee/15911526?ean=9780593238318",
    Image: "assets/book-cover-cache/9780593238318.jpg",
    color: "#140c66",
    sourceImage: "https://images-us.bookshop.org/ingram/9780593238318.jpg?height=500&v=v2-9b50a89a985d2bbcd45af70c7e20551a",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "ai-snake-oil--what-artificial-intelligence-can-do--what-it-c",
    Title: "AI Snake Oil: What Artificial Intelligence Can Do, What It Can't, and How to Tell the Difference",
    Author: "Sayash Kapoor and Arvind Narayanan",
    ISBN: "9780691249148",
    Link: "https://bookshop.org/p/books/ai-snake-oil-what-artificial-intelligence-can-do-what-it-can-t-and-how-to-tell-the-difference-arvind-narayanan/21324674?ean=9780691249148",
    Image: "assets/book-cover-cache/9780691249148.jpg",
    color: "#c53920",
    sourceImage: "https://images-us.bookshop.org/ingram/9780691249148.jpg?height=500&v=v2-ef5d757aa9ceec699f9da5cb493fb9c1",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "algorithms-of-oppression--how-search-engines-reinforce-racis",
    Title: "Algorithms of Oppression: How Search Engines Reinforce Racism",
    Author: "Safiya Umoja Noble",
    ISBN: "9781479837243",
    Link: "https://bookshop.org/p/books/algorithms-of-oppression-how-search-engines-reinforce-racism-safiya-umoja-noble/966821?ean=9781479837243",
    Image: "assets/book-cover-cache/9781479837243.jpg",
    color: "#f0f1f1",
    sourceImage: "https://images-us.bookshop.org/ingram/9781479837243.jpg?height=500&v=v2-3512467cb0fa5407dbfec0b29d68874f",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "algorithms-to-live-by--the-computer-science-of-human-decisio",
    Title: "Algorithms to Live by: The Computer Science of Human Decisions",
    Author: "Tom Griffiths and Brian Christian",
    ISBN: "9781250118363",
    Link: "https://bookshop.org/p/books/algorithms-to-live-by-the-computer-science-of-human-decisions-tom-griffiths/230238?ean=9781250118363",
    Image: "assets/book-cover-cache/9781250118363.jpg",
    color: "#fafbfb",
    sourceImage: "https://images-us.bookshop.org/ingram/9781250118363.jpg?height=500&v=v2-4ae616b6ea5d3fc72146bbffa0ea898a",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "all-systems-red",
    Title: "All Systems Red",
    Author: "Martha Wells",
    ISBN: "9780765397539",
    Link: "https://bookshop.org/p/books/all-systems-red-martha-wells/7104100?ean=9780765397539",
    Image: "assets/book-cover-cache/9780765397539.jpg",
    color: "#252b25",
    sourceImage: "https://images-us.bookshop.org/ingram/9780765397539.jpg?height=500&v=v2-f65a450467e18ffba3d7ae555786acbf",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      {
        reviewer: "Samira Ali",
        rating: 5,          // 1-5
        text: "I really enjoyed this book! If you have not read it yet I highly recommend it because it will completely change the way you see technology and make you question what it even means to be human. There is so much to digest in this story that you will keep coming back for more. I cannot wait to read the rest of the series!"
      },
      {
        reviewer: "Asher Theys",
        rating: 5,          // 1-5
        text: "I really enjoyed this book! It's a relatively short science fiction book without a lot of academic or technical language so it was pretty quick and easy to read. I enjoy connecting fiction stories to real life more than reading nonfiction, and even though it's short there's still lots of things you could analyze relating to ethics and technology in our world depending on what stood out to you specifically."
      },
    ]
  },
  {
    id: "atlas-of-ai--power--politics--and-the-planetary-costs-of-art",
    Title: "Atlas of AI: Power, Politics, and the Planetary Costs of Artificial Intelligence",
    Author: "Kate Crawford",
    ISBN: "9780300264630",
    Link: "https://bookshop.org/p/books/atlas-of-ai-power-politics-and-the-planetary-costs-of-artificial-intelligence-kate-crawford/17465404?ean=9780300264630",
    Image: "assets/book-cover-cache/9780300264630.jpg",
    color: "#f9ded4",
    sourceImage: "https://images-us.bookshop.org/ingram/9780300264630.jpg?height=500&v=v2-b383bd51a9084bc667ae28bf97822552",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "automation-and-the-future-of-work",
    Title: "Automation and the Future of Work",
    Author: "Aaron Benanav",
    ISBN: "9781839761324",
    Link: "https://bookshop.org/p/books/automation-and-the-future-of-work-aaron-benanav/14654313?ean=9781839761324",
    Image: "assets/book-cover-cache/9781839761324.jpg",
    color: "#0b0908",
    sourceImage: "https://images-us.bookshop.org/ingram/9781839761324.jpg?height=500&v=v2",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "code-dependent--living-in-the-shadow-of-ai",
    Title: "Code Dependent: Living in the Shadow of AI",
    Author: "Madhumita Murgia",
    ISBN: "9781250867391",
    Link: "https://bookshop.org/p/books/code-dependent-our-lives-with-algorithms-madhumita-murgia/19995380?ean=9781250867391",
    Image: "assets/book-cover-cache/9781250867391.jpg",
    color: "#d1a8a3",
    sourceImage: "https://images-us.bookshop.org/ingram/9781250867391.jpg?height=500&v=v2-61b7cfec704afeb1e11573ec9fc369d5",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "code-work--hacking-across-the-us-méxico-techno-borderlands",
    Title: "Code Work: Hacking Across the Us/M\u00e9xico Techno-Borderlands",
    Author: "H\u00e9ctor Beltr\u00e1n",
    ISBN: "9780691245041",
    Link: "https://bookshop.org/p/books/code-work-hacking-across-the-us-mexico-techno-borderlands-hector-beltran/19947891?ean=9780691245041",
    Image: "assets/book-cover-cache/9780691245041.jpg",
    color: "#fbf6ec",
    sourceImage: "https://images-us.bookshop.org/ingram/9780691245041.jpg?height=500&v=v2-44f9f3d73fdb9bb43dbedf3dd1faea11",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "command-and-control--nuclear-weapons--the-damascus-accident-",
    Title: "Command and Control: Nuclear Weapons, the Damascus Accident, and the Illusion of Safety",
    Author: "Eric Schlosser",
    ISBN: "9780143125785",
    Link: "https://bookshop.org/p/books/command-and-control-nuclear-weapons-the-damascus-accident-and-the-illusion-of-safety-eric-schlosser/6676064?ean=9780143125785",
    Image: "assets/book-cover-cache/9780143125785.jpg",
    color: "#69a4ae",
    sourceImage: "https://images-us.bookshop.org/ingram/9780143125785.jpg?height=500&v=v2-17d15bed5efbf187a07f2165d9c3e2ff",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "countdown-to-zero-day--stuxnet-and-the-launch-of-the-world-s",
    Title: "Countdown to Zero Day: Stuxnet and the Launch of the World's First Digital Weapon",
    Author: "Kim Zetter",
    ISBN: "9780770436193",
    Link: "https://bookshop.org/p/books/countdown-to-zero-day-stuxnet-and-the-launch-of-the-world-s-first-digital-weapon-kim-zetter/7650650?ean=9780770436193",
    Image: "assets/book-cover-cache/9780770436193.jpg",
    color: "#676352",
    sourceImage: "https://images-us.bookshop.org/ingram/9780770436193.jpg?height=500&v=v2-908f1e101179113ddbfecff88ac4d8b2",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "data-and-goliath--the-hidden-battles-to-collect-your-data-an",
    Title: "Data and Goliath: The Hidden Battles to Collect Your Data and Control Your World",
    Author: "Bruce Schneier",
    ISBN: "9780393352177",
    Link: "https://bookshop.org/p/books/data-and-goliath-the-hidden-battles-to-collect-your-data-and-control-your-world-bruce-schneier/8771636?ean=9780393352177",
    Image: "assets/book-cover-cache/9780393352177.jpg",
    color: "#0dadd6",
    sourceImage: "https://images-us.bookshop.org/ingram/9780393352177.jpg?height=500&v=v2",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "data-feminism",
    Title: "Data Feminism",
    Author: "Catherine D'Ignazio and Lauren F. Klein",
    ISBN: "9780262547185",
    Link: "https://bookshop.org/p/books/data-feminism-lauren-f-klein/13050994?ean=9780262547185",
    Image: "assets/book-cover-cache/9780262547185.jpg",
    color: "#ecebea",
    sourceImage: "https://images-us.bookshop.org/ingram/9780262547185.jpg?height=500&v=v2-beac2e16af66c276bd83fc8e247c4cbc",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "data-versus-democracy--how-big-data-algorithms-shape-opinion",
    Title: "Data Versus Democracy: How Big Data Algorithms Shape Opinions and Alter the Course of History",
    Author: "Kris Shaffer",
    ISBN: "9781484245392",
    Link: "https://bookshop.org/p/books/data-versus-democracy-how-big-data-algorithms-shape-opinions-and-alter-the-course-of-history-kris-shaffer/8862690?ean=9781484245392",
    Image: "assets/book-cover-cache/9781484245392.jpg",
    color: "#05adeb",
    sourceImage: "https://images-us.bookshop.org/ingram/9781484245392.jpg?height=500&v=v2",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "digital-disconnect--how-capitalism-is-turning-the-internet-a",
    Title: "Digital Disconnect: How Capitalism Is Turning the Internet Against Democracy",
    Author: "Robert W. McChesney",
    ISBN: "9781620970317",
    Link: "https://bookshop.org/p/books/digital-disconnect-how-capitalism-is-turning-the-internet-against-democracy-robert-w-mcchesney/594496?ean=9781620970317",
    Image: "assets/book-cover-cache/9781620970317.jpg",
    color: "#312f30",
    sourceImage: "https://images-us.bookshop.org/ingram/9781620970317.jpg?height=500&v=v2",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "ethical-and-legal-aspects-of-computing--a-professional-persp",
    Title: "Ethical and Legal Aspects of Computing: A Professional Perspective from Software Engineering (2024)",
    Author: "Gerard O'Regan",
    ISBN: "9783031526633",
    Link: "https://bookshop.org/p/books/ethical-and-legal-aspects-of-computing-a-professional-perspective-from-software-engineering-2024-gerard-o-regan/20985526?ean=9783031526633",
    Image: "assets/book-cover-cache/9783031526633.jpg",
    color: "#04a4b9",
    sourceImage: "https://images-us.bookshop.org/ingram/9783031526633.jpg?height=500&v=v2-a3f5f385e970f93e71fefaecd15643c8",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "extremely-online--the-untold-story-of-fame--influence--and-p",
    Title: "Extremely Online: The Untold Story of Fame, Influence, and Power on the Internet",
    Author: "Taylor Lorenz",
    ISBN: "9781982146870",
    Link: "https://bookshop.org/p/books/extremely-online-the-untold-story-of-fame-influence-and-power-on-the-internet-taylor-lorenz/19718842?ean=9781982146870",
    Image: "assets/book-cover-cache/9781982146870.jpg",
    color: "#fbb42a",
    sourceImage: "https://images-us.bookshop.org/ingram/9781982146870.jpg?height=500&v=v2-a160420cd941e665c1a751541612e4a3",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "fahrenheit-451--reissue",
    Title: "Fahrenheit 451 (Reissue)",
    Author: "Ray Bradbury",
    ISBN: "9781451673319",
    Link: "https://bookshop.org/p/books/fahrenheit-451-ray-d-bradbury/18152942?ean=9781451673319",
    Image: "assets/book-cover-cache/9781451673319.jpg",
    color: "#d5272e",
    sourceImage: "https://images-us.bookshop.org/ingram/9781451673319.jpg?height=500&v=v2-dc65e30376a0b848ad515d65993e1aed",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "flowers-for-algernon",
    Title: "Flowers for Algernon",
    Author: "Daniel Keyes",
    ISBN: "9780156030304",
    Link: "https://bookshop.org/p/books/flowers-for-algernon-daniel-keyes/6683258?ean=9780156030304",
    Image: "assets/book-cover-cache/9780156030304.jpg",
    color: "#1f2c53",
    sourceImage: "https://images-us.bookshop.org/ingram/9780156030304.jpg?height=500&v=v2-908ea7c6953b52a6a0dda40027640be4",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "governing-the-commons--the-evolution-of-institutions-for-collective-action",
    Title: "Governing the Commons: The Evolution of Institutions for Collective Action",
    Author: "Elinor Ostrom",
    ISBN: "9781107569782",
    Link: "https://bookshop.org/p/books/governing-the-commons-the-evolution-of-institutions-for-collective-action-dr-elinor-ostrom/3ad6822c1832b1cd?ean=9781107569782",
    Image: "assets/book-cover-cache/9781107569782.jpg",
    color: "#e3e2e3",
    sourceImage: "https://images-us.bookshop.org/ingram/9781107569782.jpg?height=500&v=v2",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "if-then--how-the-simulmatics-corporation-invented-the-future",
    Title: "If Then: How the Simulmatics Corporation Invented the Future",
    Author: "Jill Lepore",
    ISBN: "9781324091127",
    Link: "https://bookshop.org/p/books/if-then-how-the-simulmatics-corporation-invented-the-future-jill-lepore/14327786?ean=9781324091127",
    Image: "assets/book-cover-cache/9781324091127.jpg",
    color: "#faf45e",
    sourceImage: "https://images-us.bookshop.org/ingram/9781324091127.jpg?height=500&v=v2",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "igen--why-today-s-super-connected-kids-are-growing-up-less-r",
    Title: "iGen: Why Today's Super-Connected Kids Are Growing Up Less Rebellious, More Tolerant, Less Happy--And Completely Unprepared for Adulthood--And What Th",
    Author: "Jean M. Twenge",
    ISBN: "9781501152016",
    Link: "https://bookshop.org/p/books/igen-why-today-s-super-connected-kids-are-growing-up-less-rebellious-more-tolerant-less-happy-and-completely-unprepared-jean-m-twenge/6690796?ean=9781501152016",
    Image: "assets/book-cover-cache/9781501152016.jpg",
    color: "#eb1b32",
    sourceImage: "https://images-us.bookshop.org/ingram/9781501152016.jpg?height=500&v=v2-6cc34e832703a6c943c682ebf500a4a4",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "life-3-0--being-human-in-the-age-of-artificial-intelligence",
    Title: "Life 3.0: Being Human in the Age of Artificial Intelligence",
    Author: "Max Tegmark",
    ISBN: "9781101970317",
    Link: "https://bookshop.org/p/books/life-3-0-being-human-in-the-age-of-artificial-intelligence-max-tegmark/7482820?ean=9781101970317",
    Image: "assets/book-cover-cache/9781101970317.jpg",
    color: "#140c1a",
    sourceImage: "https://images-us.bookshop.org/ingram/9781101970317.jpg?height=500&v=v2-6cb92d5fd4289b2160ef8bf9ca3a4191",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "likewar--the-weaponization-of-social-media",
    Title: "Likewar: The Weaponization of Social Media",
    Author: "P. W. Singer and Emerson T Brooking",
    ISBN: "9780358108474",
    Link: "https://bookshop.org/p/books/likewar-the-weaponization-of-social-media-p-w-singer/6961043?ean=9780358108474",
    Image: "assets/book-cover-cache/9780358108474.jpg",
    color: "#eb432f",
    sourceImage: "https://images-us.bookshop.org/ingram/9780358108474.jpg?height=500&v=v2-4faa76c96ff8c1558d16a273ad8e5a51",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "meme-wars--the-untold-story-of-the-online-battles-upending-d",
    Title: "Meme Wars: The Untold Story of the Online Battles Upending Democracy in America",
    Author: "Joan Donovan, Emily Dreyfuss, et al.",
    ISBN: "9781635578638",
    Link: "https://bookshop.org/p/books/meme-wars-the-untold-story-of-the-online-battles-upending-democracy-in-america-joan-donovan/17875088?ean=9781635578638",
    Image: "assets/book-cover-cache/9781635578638.jpg",
    color: "#161712",
    sourceImage: "https://images-us.bookshop.org/ingram/9781635578638.jpg?height=500&v=v2-d6f6c37394fd3fe3319066bf2a5fa0f5",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "more-than-a-glitch--confronting-race--gender--and-ability-bi",
    Title: "More Than a Glitch: Confronting Race, Gender, and Ability Bias in Tech",
    Author: "Meredith Broussard",
    ISBN: "9780262548328",
    Link: "https://bookshop.org/p/books/more-than-a-glitch-confronting-race-gender-and-ability-bias-in-tech-meredith-broussard/20870739?ean=9780262548328",
    Image: "assets/book-cover-cache/9780262548328.jpg",
    color: "#141518",
    sourceImage: "https://images-us.bookshop.org/ingram/9780262548328.jpg?height=500&v=v2-fe8905a47d6aacce2511e32f03a352f6",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "neuromancer",
    Title: "Neuromancer",
    Author: "William Gibson",
    ISBN: "9780441007462",
    Link: "https://bookshop.org/p/books/neuromancer-william-gibson/7503287?ean=9780441007462",
    Image: "assets/book-cover-cache/9780441007462.jpg",
    color: "#04dc05",
    sourceImage: "https://images-us.bookshop.org/ingram/9780441007462.jpg?height=500&v=v2",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "ready-player-one",
    Title: "Ready Player One",
    Author: "Ernest Cline",
    ISBN: "9780307887443",
    Link: "https://bookshop.org/p/books/ready-player-one-ernest-cline/228873?ean=9780307887443",
    Image: "assets/book-cover-cache/9780307887443.jpg",
    color: "#eae7e2",
    sourceImage: "https://images-us.bookshop.org/ingram/9780307887443.jpg?height=500&v=v2-dad53e23bfdc141ee88cdb4798534045",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "technically-wrong--sexist-apps--biased-algorithms--and-other",
    Title: "Technically Wrong: Sexist Apps, Biased Algorithms, and Other Threats of Toxic Tech",
    Author: "Sara Wachter-Boettcher",
    ISBN: "9780393356045",
    Link: "https://bookshop.org/p/books/technically-wrong-sexist-apps-biased-algorithms-and-other-threats-of-toxic-tech-sara-wachter-boettcher/11186625?ean=9780393356045",
    Image: "assets/book-cover-cache/9780393356045.jpg",
    color: "#faf9ec",
    sourceImage: "https://images-us.bookshop.org/ingram/9780393356045.jpg?height=500&v=v2",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "the-ai-con--how-to-fight-big-tech-s-hype-and-create-the-futu",
    Title: "The AI Con: How to Fight Big Tech's Hype and Create the Future We Want",
    Author: "Emily M. Bender and Alex Hanna",
    ISBN: "9780063418561",
    Link: "https://bookshop.org/p/books/the-ai-con-how-to-fight-big-tech-s-hype-and-create-the-future-we-want-alex-hanna/22044744?ean=9780063418561",
    Image: "assets/book-cover-cache/9780063418561.jpg",
    color: "#101010",
    sourceImage: "https://images-us.bookshop.org/ingram/9780063418561.jpg?height=500&v=v2-4bdfd16707e1d28d8c04ea12ba6c83b5",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "the-ai-mirror--how-to-reclaim-our-humanity-in-an-age-of-mach",
    Title: "The AI Mirror: How to Reclaim Our Humanity in an Age of Machine Thinking",
    Author: "Shannon Vallor",
    ISBN: "9780197759066",
    Link: "https://bookshop.org/p/books/the-ai-mirror-how-to-reclaim-our-humanity-in-an-age-of-machine-thinking-shannon-vallor/20842432?ean=9780197759066",
    Image: "assets/book-cover-cache/9780197759066.jpg",
    color: "#dbdde2",
    sourceImage: "https://images-us.bookshop.org/ingram/9780197759066.jpg?height=500&v=v2",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "the-algorithm--how-ai-decides-who-gets-hired--monitored--pro",
    Title: "The Algorithm: How AI Decides Who Gets Hired, Monitored, Promoted, and Fired and Why We Need to Fight Back Now",
    Author: "Hilke Schellmann",
    ISBN: "9780306827341",
    Link: "https://bookshop.org/p/books/the-algorithm-how-ai-decides-who-get-hired-monitored-promoted-and-fired-and-why-we-need-to-fight-back-now-hilke-schellmann/20055224?ean=9780306827341",
    Image: "assets/book-cover-cache/9780306827341.jpg",
    color: "#f0d824",
    sourceImage: "https://images-us.bookshop.org/ingram/9780306827341.jpg?height=500&v=v2-d712839470cb3c2eb104e71cef298606",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "the-diamond-age--or--a-young-lady-s-illustrated-primer",
    Title: "The Diamond Age: Or, a Young Lady's Illustrated Primer",
    Author: "Neal Stephenson",
    ISBN: "9780553380965",
    Link: "https://bookshop.org/p/books/the-diamond-age-or-a-young-lady-s-illustrated-primer-neal-stephenson/8466804?ean=9780553380965",
    Image: "assets/book-cover-cache/9780553380965.jpg",
    color: "#110607",
    sourceImage: "https://images-us.bookshop.org/ingram/9780553380965.jpg?height=500&v=v2-c041df464430345e0f9335f3e293d585",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "the-ethical-algorithm--the-science-of-socially-aware-algorit",
    Title: "The Ethical Algorithm: The Science of Socially Aware Algorithm Design",
    Author: "Michael Kearns and Aaron Roth",
    ISBN: "9780190948207",
    Link: "https://bookshop.org/p/books/the-ethical-algorithm-the-science-of-socially-aware-algorithm-design-michael-kearns/11705689?ean=9780190948207",
    Image: "assets/book-cover-cache/9780190948207.jpg",
    color: "#edf7fc",
    sourceImage: "https://images-us.bookshop.org/ingram/9780190948207.jpg?height=500&v=v2-6d02da94294b0595b0f5facd0532abc2",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "the-glass-cage--how-our-computers-are-changing-us",
    Title: "The Glass Cage: How Our Computers Are Changing Us",
    Author: "Nicholas Carr",
    ISBN: "9780393351637",
    Link: "https://bookshop.org/p/books/the-glass-cage-how-our-computers-are-changing-us-nicholas-carr/8769635?ean=9780393351637",
    Image: "assets/book-cover-cache/9780393351637.jpg",
    color: "#f8fafa",
    sourceImage: "https://images-us.bookshop.org/ingram/9780393351637.jpg?height=500&v=v2",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "the-myth-of-artificial-intelligence--why-computers-can-t-thi",
    Title: "The Myth of Artificial Intelligence: Why Computers Can't Think the Way We Do",
    Author: "Erik J. Larson",
    ISBN: "9780674278660",
    Link: "https://bookshop.org/p/books/the-myth-of-artificial-intelligence-why-computers-can-t-think-the-way-we-do-erik-j-larson/18467605?ean=9780674278660",
    Image: "assets/book-cover-cache/9780674278660.jpg",
    color: "#fdfdfd",
    sourceImage: "https://images-us.bookshop.org/ingram/9780674278660.jpg?height=500&v=v2-a2b0f99387e02160d7d276c3b9dec6ac",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "the-promises-and-perils-of-ai-in-education--ethics-and-equit",
    Title: "The Promises and Perils of AI in Education: Ethics and Equity Have Entered The Chat",
    Author: "Dee Lanier and Ken Shelton",
    ISBN: "9798990840508",
    Link: "https://bookshop.org/p/books/the-promises-and-perils-of-ai-in-education-ethics-and-equity-have-entered-the-chat-ken-shelton/22161072?ean=9798990840508",
    Image: "assets/book-cover-cache/9798990840508.jpg",
    color: "#0b0b0b",
    sourceImage: "https://images-us.bookshop.org/ingram/9798990840508.jpg?height=500&v=v2-4266c395fc4cd7a5227723ba63ac581d",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "custodians-of-the-internet--platforms--content-moderation--an",
    Title: "Custodians of the Internet: Platforms, Content Moderation, and the Hidden Decisions That Shape Social Media",
    Author: "Tarleton Gillespie",
    ISBN: "9780300261431",
    Link: "https://bookshop.org/p/books/custodians-of-the-internet-platforms-content-moderation-and-the-hidden-decisions-that-shape-social-media-tarleton-gillespie/ebca8ee6033c0f53?ean=9780300261431",
    Image: "assets/book-cover-cache/9780300261431.jpg",
    color: "#231f20",
    sourceImage: "https://images-us.bookshop.org/ingram/9780300261431.jpg?height=500&v=v2",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "enshittification--why-everything-suddenly-got-worse-and-what",
    Title: "Enshittification: Why Everything Suddenly Got Worse and What to Do About It",
    Author: "Cory Doctorow",
    ISBN: "9780374619329",
    Link: "https://bookshop.org/p/books/enshittification-why-everything-suddenly-got-worse-and-what-to-do-about-it-cory-doctorow/d3f8483b158906ce?ean=9780374619329",
    Image: "assets/book-cover-cache/9780374619329.jpg",
    color: "#040708",
    sourceImage: "https://images-us.bookshop.org/ingram/9780374619329.jpg?height=500&v=v2",
    curated: false,
    reviews: [
      {
        reviewer: "Jack Bandy",
        rating: 3,
        text: "Solid book that synthesizes a lot of arguments from Cory's talks and blog posts. I really liked the 'what do we do about it' section and I wish there was more!"
      }
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "doorbells-danger-and-dead-batteries-user-research-war-stories",
    Title: "Doorbells, Danger, and Dead Batteries: User Research War Stories",
    Author: "Steve Portigal",
    ISBN: "9781933820347",
    Link: "https://bookshop.org/p/books/doorbells-danger-and-dead-batteries-user-research-war-stories-steve-portigal/ade90384212ba5d0?ean=9781933820347&next=t",
    Image: "assets/book-cover-cache/9781933820347.jpg",
    color: "#6e6a56",
    sourceImage: "https://images-us.bookshop.org/ingram/9781933820347.jpg?height=500&v=v2",
    curated: false,
    reviews: [
      {
        reviewer: "Trenton Coleman",
        rating: 5,
        text: "Surprisingly humorous yet informative book about research! Changed the way I viewed research and how to build better, more 'human' UX thinking. Recommend if you want a good blend of humor and anthropology."
      }
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "weapons-of-math-destruction--how-big-data-increases-inequali",
    Title: "Weapons of Math Destruction: How Big Data Increases Inequality and Threatens Democracy",
    Author: "Cathy O'Neil",
    ISBN: "9780553418835",
    Link: "https://bookshop.org/p/books/weapons-of-math-destruction-how-big-data-increases-inequality-and-threatens-democracy-cathy-o-neil/ffc2bb128e435cfd?ean=9780553418835",
    Image: "assets/book-cover-cache/9780553418835.jpg",
    color: "#faef10",
    sourceImage: "https://images-us.bookshop.org/ingram/9780553418835.jpg?height=500",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "the-age-of-surveillance-capitalism--the-fight-for-a-human-fu",
    Title: "The Age of Surveillance Capitalism: The Fight for a Human Future at the New Frontier of Power",
    Author: "Shoshana Zuboff",
    ISBN: "9781541758001",
    Link: "https://bookshop.org/p/books/the-age-of-surveillance-capitalism-the-fight-for-a-human-future-at-the-new-frontier-of-power-shoshana-zuboff/7889d7dd8f793aeb?ean=9781541758001",
    Image: "assets/book-cover-cache/9781541758001.jpg",
    color: "#fdfbe6",
    sourceImage: "https://images-us.bookshop.org/ingram/9781541758001.jpg?height=500",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "race-after-technology--abolitionist-tools-for-the-new-jim-co",
    Title: "Race After Technology: Abolitionist Tools for the New Jim Code",
    Author: "Ruha Benjamin",
    ISBN: "9781509526406",
    Link: "https://bookshop.org/p/books/race-after-technology-abolitionist-tools-for-the-new-jim-code-ruha-benjamin/02977b73851a0b67?ean=9781509526406",
    Image: "assets/book-cover-cache/9781509526406.jpg",
    color: "#151618",
    sourceImage: "https://images-us.bookshop.org/ingram/9781509526406.jpg?height=500",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "automating-inequality--how-high-tech-tools-profile--police",
    Title: "Automating Inequality: How High-Tech Tools Profile, Police, and Punish the Poor",
    Author: "Virginia Eubanks",
    ISBN: "9781250215789",
    Link: "https://bookshop.org/p/books/automating-inequality-how-high-tech-tools-profile-police-and-punish-the-poor-virginia-eubanks/df3bdb7ddf18f167?ean=9781250215789",
    Image: "assets/book-cover-cache/9781250215789.jpg",
    color: "#1f1a1d",
    sourceImage: "https://images-us.bookshop.org/ingram/9781250215789.jpg?height=500",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "artificial-unintelligence--how-computers-misunderstand-the-w",
    Title: "Artificial Unintelligence: How Computers Misunderstand the World",
    Author: "Meredith Broussard",
    ISBN: "9780262537018",
    Link: "https://bookshop.org/p/books/artificial-unintelligence-how-computers-misunderstand-the-world-meredith-broussard/0df211dbaf6c2918?ean=9780262537018",
    Image: "assets/book-cover-cache/9780262537018.jpg",
    color: "#dce359",
    sourceImage: "https://images-us.bookshop.org/ingram/9780262537018.jpg?height=500",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "design-justice--community-led-practices-to-build-the-worlds",
    Title: "Design Justice: Community-Led Practices to Build the Worlds We Need",
    Author: "Sasha Costanza-Chock",
    ISBN: "9780262043458",
    Link: "https://bookshop.org/p/books/design-justice-community-led-practices-to-build-the-worlds-we-need-sasha-costanza-chock/419ded55094591f4?ean=9780262043458",
    Image: "assets/book-cover-cache/9780262043458.jpg",
    color: "#0e0709",
    sourceImage: "https://images-us.bookshop.org/ingram/9780262043458.jpg?height=500",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "ghost-work--how-to-stop-silicon-valley-from-building-a-new-g",
    Title: "Ghost Work: How to Stop Silicon Valley from Building a New Global Underclass",
    Author: "Mary L. Gray and Siddharth Suri",
    ISBN: "9781665127059",
    Link: "https://bookshop.org/p/books/ghost-work-how-to-stop-silicon-valley-from-building-a-new-global-underclass-mary-l-gray/7eadba749745ebef?ean=9781665127059",
    Image: "assets/book-cover-cache/9781665127059.jpg",
    color: "#0b1113",
    sourceImage: "https://images-us.bookshop.org/ingram/9781665127059.jpg?height=500",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "twitter-and-tear-gas--the-power-and-fragility-of-networked-p",
    Title: "Twitter and Tear Gas: The Power and Fragility of Networked Protest",
    Author: "Zeynep Tufekci",
    ISBN: "9780300234176",
    Link: "https://bookshop.org/p/books/twitter-and-tear-gas-the-power-and-fragility-of-networked-protest-zeynep-tufekci/5d4fbbb6d9272be4?ean=9780300234176",
    Image: "assets/book-cover-cache/9780300234176.jpg",
    color: "#a5582c",
    sourceImage: "https://images-us.bookshop.org/ingram/9780300234176.jpg?height=500",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "technopoly--the-surrender-of-culture-to-technology",
    Title: "Technopoly: The Surrender of Culture to Technology",
    Author: "Neil Postman",
    ISBN: "9780679745402",
    Link: "https://bookshop.org/p/books/technopoly-the-surrender-of-culture-to-technology-neil-postman/411fadc13061d77a?ean=9780679745402",
    Image: "assets/book-cover-cache/9780679745402.jpg",
    color: "#9a9e9f",
    sourceImage: "https://images-us.bookshop.org/ingram/9780679745402.jpg?height=500",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "do-androids-dream-of-electric-sheep",
    Title: "Do Androids Dream of Electric Sheep?",
    Author: "Philip K. Dick",
    ISBN: "9780345404473",
    Link: "https://bookshop.org/p/books/do-androids-dream-of-electric-sheep-the-inspiration-for-the-films-blade-runner-and-blade-runner-2049-philip-k-dick/718ef0ab48ecf273?ean=9780345404473",
    Image: "assets/book-cover-cache/9780345404473.jpg",
    color: "#d7dadd",
    sourceImage: "https://images-us.bookshop.org/ingram/9780345404473.jpg?height=500",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "exhalation--stories",
    Title: "Exhalation: Stories",
    Author: "Ted Chiang",
    ISBN: "9781101972083",
    Link: "https://bookshop.org/p/books/exhalation-stories-ted-chiang/d563593d55c2670f?ean=9781101972083",
    Image: "assets/book-cover-cache/9781101972083.jpg",
    color: "#0f181f",
    sourceImage: "https://images-us.bookshop.org/ingram/9781101972083.jpg?height=500",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "little-brother",
    Title: "Little Brother",
    Author: "Cory Doctorow",
    ISBN: "9780765323118",
    Link: "https://bookshop.org/p/books/little-brother-cory-doctorow/3ddcdf6e667f5b6d?ean=9780765323118",
    Image: "assets/book-cover-cache/9780765323118.jpg",
    color: "#f8f7f7",
    sourceImage: "https://images-us.bookshop.org/ingram/9780765323118.jpg?height=500",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "frankenstein--the-1818-text",
    Title: "Frankenstein: The 1818 Text",
    Author: "Mary Shelley",
    ISBN: "9780143131847",
    Link: "https://bookshop.org/p/books/frankenstein-the-1818-text-mary-shelley/4bf26b6b69b17441?ean=9780143131847",
    Image: "assets/book-cover-cache/9780143131847.jpg",
    color: "#0b1315",
    sourceImage: "https://images-us.bookshop.org/ingram/9780143131847.jpg?height=500",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "parable-of-the-sower",
    Title: "Parable of the Sower",
    Author: "Octavia E. Butler",
    ISBN: "9781538732182",
    Link: "https://bookshop.org/p/books/parable-of-the-sower-a-novel-octavia-e-butler/251d041cc94c99c2?ean=9781538732182",
    Image: "assets/book-cover-cache/9781538732182.jpg",
    color: "#f8f5ea",
    sourceImage: "https://images-us.bookshop.org/ingram/9781538732182.jpg?height=500",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "autonomous--a-novel",
    Title: "Autonomous: A Novel",
    Author: "Annalee Newitz",
    ISBN: "9780765392084",
    Link: "https://bookshop.org/p/books/autonomous-a-novel-annalee-newitz/2aef20994294838a?ean=9780765392084",
    Image: "assets/book-cover-cache/9780765392084.jpg",
    color: "#64bb04",
    sourceImage: "https://images-us.bookshop.org/ingram/9780765392084.jpg?height=500",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "severance--a-novel",
    Title: "Severance: A Novel",
    Author: "Ling Ma",
    ISBN: "9781250214997",
    Link: "https://bookshop.org/p/books/severance-a-novel-ling-ma/c738b1415221c430?ean=9781250214997",
    Image: "assets/book-cover-cache/9781250214997.jpg",
    color: "#f9cdd8",
    sourceImage: "https://images-us.bookshop.org/ingram/9781250214997.jpg?height=500",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "wool--book-one-of-the-silo-series",
    Title: "Wool: Book One of the Silo Series",
    Author: "Hugh Howey",
    ISBN: "9780358447849",
    Link: "https://bookshop.org/p/books/wool-book-one-of-the-silo-series-hugh-howey/51ab742c4dadfcbd?ean=9780358447849",
    Image: "assets/book-cover-cache/9780358447849.jpg",
    color: "#b3161b",
    sourceImage: "https://images-us.bookshop.org/ingram/9780358447849.jpg?height=500",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "the-three-body-problem",
    Title: "The Three-Body Problem",
    Author: "Cixin Liu",
    ISBN: "9780765382030",
    Link: "https://bookshop.org/p/books/the-three-body-problem-cixin-liu/55470a297b196134?ean=9780765382030",
    Image: "assets/book-cover-cache/9780765382030.jpg",
    color: "#275a9a",
    sourceImage: "https://images-us.bookshop.org/ingram/9780765382030.jpg?height=500",
    curated: true,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
  {
    id: "project-hail-mary--a-novel",
    Title: "Project Hail Mary: A Novel",
    Author: "Andy Weir",
    ISBN: "9780593135228",
    Link: "https://bookshop.org/p/books/project-hail-mary-a-novel-andy-weir/00f52c9d7f2ed7f2?ean=9780593135228",
    Image: "assets/book-cover-cache/9780593135228.jpg",
    color: "#15110b",
    sourceImage: "https://images-us.bookshop.org/ingram/9780593135228.jpg?height=500",
    curated: false,
    reviews: [
      // ---- To add a review, uncomment the block below and fill it in ----
      // {
      //   reviewer: "Your Name",
      //   rating: 5,          // 1-5
      //   text: "Write your review here."
      // },
    ]
  },
];
