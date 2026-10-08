/* ============================================================
   ALL THE WORDS ON YOUR WEBSITE LIVE IN THIS ONE FILE.
   Change anything between the quote marks and the site updates.
   Lines starting with  //  are notes to you — they never show up.
   ============================================================ */

export const couple = {
  her: 'Sara',
  him: 'Michael',
  herFull: 'Sara Stewart',
  himFull: 'Michael Svabek',
  monogram: 'S & M',
};

export const wedding = {
  dateLong: 'Friday, May 21, 2027',
  dateShort: '5.21.2027',
  dateStacked: { day: 'Friday', date: 'May 21', year: '2027' },
  arrival: '4:30 PM',
  ceremony: '5:00 PM',
  endTime: '9:30 PM',
  attire: 'Black Tie Optional / Formal',
  venue: 'Thornewood Castle Inn & Gardens',
  venueShort: 'Thornewood Castle',
  address: '8601 N. Thorne Lane SW',
  cityState: 'Lakewood, WA 98498',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Thornewood+Castle+Inn+%26+Gardens+8601+N+Thorne+Lane+SW+Lakewood+WA+98498',
  // Used by the "Add to calendar" button. Times are Pacific.
  calStart: '20270521T163000',
  calEnd: '20270521T213000',
};

export const hero = {
  eyebrow: 'We’re getting married',
  intro:
    'Two and a half years, one very fast chapter, and a small person named Evelyn later — we’re making it official. Come celebrate with us at a castle in the Washington woods.',
};

/* ---------- THE DAY (home page timeline) ---------- */
export const timeline = [
  {
    time: '4:30 PM',
    title: 'Arrival',
    body: 'Please arrive by 4:30 so everyone is seated and settled. Parking at the venue is limited — the hotel shuttle is your friend.',
  },
  {
    time: '5:00 PM',
    title: 'Ceremony',
    body: 'The part we’ve been practicing. Thirty minutes in the castle gardens, weather permitting.',
  },
  {
    time: '5:30 PM',
    title: 'Cocktails & Photos',
    body: 'Drinks, hors d’oeuvres, and a wander through the castle gardens while we steal away for photos.',
  },
  {
    time: '6:00 PM',
    title: 'Reception',
    body: 'Dinner and toasts outdoors, weather permitting, then dancing in the Great Hall.',
  },
  {
    time: '9:30 PM',
    title: 'Last Dance',
    body: 'The evening wraps at 9:30 PM, and the shuttle heads back to the hotels.',
  },
];

/* ---------- OUR STORY ----------
   Each block below is one moment on the page.
   `photos` are filenames from the /public/photos folder.
   `layout` can be: 'right', 'left', 'wide', or 'stack'.
------------------------------------------------ */
export const story = {
  intro:
    'People keep telling us we did this fast. We appreciate a good speedrun. Here is how the past two and a half years unfolded into this party.',
  chapters: [
    {
      year: 'Spring 2024',
      title: 'The first date',
      body: [
        'We were neighbors who met on Hinge. The night ended with a downpour and a kiss.',
      ],
      photos: ['first-date-1.jpg', 'first-date-2.jpg'],
      layout: 'right',
    },
    {
      year: 'Summer',
      title: 'The near-death miss',
      body: [
        'A routine procedure went badly wrong, and what should have been a small thing turned into a stint in the hospital.',
        'Michael met Sara’s family right after, then spent the next couple of weeks helping her recover.',
      ],
      photos: ['p133.jpg', 'p135.jpg'],
      layout: 'left',
    },
    {
      year: 'Fall',
      title: 'Penn State, a tailgate, and the whole family',
      body: [
        'After moving in together, we drove east so Sara could meet Michael’s family, his friends, and his hometown — and learn exactly how seriously Penn State takes a tailgate.',
      ],
      photos: ['p119.jpg', 'p129.jpg'],
      layout: 'right',
    },
    {
      kicker: '1 year in',
      title: 'We knew we wanted kids',
      body: [
        'Evelyn was conceived shortly thereafter. We are efficient people.',
      ],
      photos: ['p163.jpg', 'p160.jpg'],
      layout: 'left',
    },
    {
      kicker: 'The proposal',
      title: 'Tennessee Whiskey, by T-Pain',
      body: [
        'The ring, it turns out, had been sitting in Michael’s peacoat pocket for a while. He proposed to Tennessee Whiskey — the T-Pain version.',
        'If you know, you know. If you don’t, ask us at the reception and we will happily play it for you.',
      ],
      photos: ['p156.jpg', 'p179.jpg'],
      layout: 'right',
    },
    {
      year: '2025',
      title: 'A new job and a move',
      body: [
        'Michael got his dream job at Nintendo, so we moved up to Kirkland.',
      ],
      photos: ['p114.jpg', 'p11.jpg'],
      layout: 'left',
    },
    {
      year: '2026',
      title: 'A baby and a house',
      body: [
        'Baby Evelyn now has a big room at our home in Maple Valley.',
      ],
      photos: ['p149.jpg', 'p152.jpg'],
      layout: 'right',
    },
    {
      kicker: 'Which brings us here',
      title: 'Now we’re excited to celebrate with you all in a castle!',
      body: [],
      photos: ['p159.jpg', 'p150.jpg'],
      layout: 'wide',
    },
  ],
};

/* ---------- LOCATION ---------- */
export const location = {
  intro:
    'In 1907 a Tacoma financier named Chester Thorne bought a 400-year-old Elizabethan manor in England, had it taken apart brick by brick, and shipped it around Cape Horn to the shore of American Lake. Four years later it was standing again here in Lakewood. It is exactly as unlikely and as beautiful as that sounds.',
  // A little colour for the curious — shown as small cards on the page
  lore: [
    { n: '1911', t: 'Finally finished', b: 'Four years of reassembly, three ships of English brick and carved oak, and one very determined architect.' },
    { n: '54', t: 'Rooms', b: 'Twenty-eight bedrooms and twenty-two baths across 27,000 square feet of Gothic manor.' },
    { n: '2002', t: 'Rose Red', b: 'Stephen King filmed his haunted-house miniseries here. We have been assured the ghosts are friendly.' },
  ],
  facts: [
    { label: 'Getting there', body: 'About 45 minutes south of Seattle and 20 minutes south of Tacoma, just off I-5 in Lakewood.' },
    { label: 'Parking', body: 'Very limited on site. Please use the hotel shuttle if you can, or carpool with someone who is.' },
    { label: 'Ceremony & dinner', body: 'Both outdoors in the gardens, weather permitting, with the Great Hall ready as a backup — and dancing in there regardless.' },
    { label: 'Ground & shoes', body: 'Grass, gravel paths, and a few stone steps. Block heels beat stilettos here — ask anyone who has tried.' },
  ],
};

/* ---------- TRAVEL & ACCOMMODATION ---------- */
export const shuttle = {
  toVenue: '4:15 PM',
  toHotels: '9:30 PM',
  note: 'Complimentary shuttle service runs between both hotels below and the venue on the wedding day. Parking at the castle is genuinely limited, so please plan accordingly.',
};

export const hotels = [
  {
    name: 'Holiday Inn Express & Suites',
    sub: 'Tacoma South — Lakewood',
    address: '8601 S Hosmer St, Tacoma, WA 98444',
    phone: '(253) 539-2020',
    phoneHref: 'tel:+12535392020',
    url: 'https://www.ihg.com/holidayinnexpress/hotels/us/en/tacoma/tcmhh/hoteldetail',
    note: 'Rooms with multiple beds available. Best choice if you’re travelling with family.',
    recommended: true,
  },
  {
    name: 'Candlewood Suites Tacoma Mall',
    sub: 'by IHG',
    address: 'S Hosmer St, Tacoma, WA',
    phone: '(253) 507-8711',
    phoneHref: 'tel:+12535078711',
    url: 'https://www.ihg.com/candlewood/hotels/us/en/reservation',
    note: 'Single beds only — book the Holiday Inn instead if you need more than one bed.',
    recommended: false,
  },
];

export const airports = [
  { name: 'Seattle–Tacoma International (SEA)', body: 'The main option. About 30 minutes north of the hotels.' },
  { name: 'Portland International (PDX)', body: 'Roughly a 2 hour 15 minute drive south, occasionally cheaper.' },
];

export const travelNotes = [
  { label: 'Getting around', body: 'Rideshare works well in Tacoma and Lakewood. A rental car is nice if you want to explore, but you won’t need one for the wedding itself.' },
  { label: 'Weather in May', body: 'Expect 60–70°F and a real chance of a light shower. Bring a wrap or a jacket — it cools off quickly once the sun goes down.' },
  { label: 'Make a weekend of it', body: 'Point Defiance Park, the Museum of Glass, and Mount Rainier are all within easy reach. Seattle is 45 minutes north.' },
];

/* ---------- REGISTRY ---------- */
export const registry = {
  note:
    'Truly, the only thing we want is you in the room. We have a house and, at this point, most of the things that go in it. But several of you have asked, so here is where to look.',
  // TODO Sara: paste your Joy registry link here once it's set up.
  // Any entry with an empty link is hidden automatically, so you can
  // fill these in one at a time.
  links: [
    { name: 'Our Registry on Joy', desc: 'The full wish list.', url: 'https://withjoy.com/svabeks/registry' },
    // Add more here if you register anywhere else — empty ones stay hidden.
    { name: 'Amazon', desc: 'The practical list.', url: '' },
  ],
};

/* The deep link that opens the cash-fund contribution box directly.
   To find it again: open your Joy registry, click the fund, and copy
   the address bar — it's the registry link plus "?pid=..." on the end. */
const JOY_FUND = 'https://withjoy.com/svabeks/registry?pid=cdbbbb7f-a0b7-41b7-886f-2b7db8791055';

/* ---------- THE FUND ----------
   Shown as its own section, separate from the registry above.
   Guests giving through Joy with Venmo, PayPal or Cash App pay no fee.
   Delete any fund you don't want — the layout adjusts on its own.
------------------------------------------------ */
export const funds = {
  eyebrow: 'Something else entirely',
  title: 'The fund',
  note:
    'We did most of the last two and a half years in a hurry — a move, a job, a baby, a house, all of it at once. There are a few things we skipped along the way. If you would rather put something toward one of those than send us a serving dish, this is where it goes.',
  // TODO Sara: paste the link to each fund from your Joy registry.
  items: [
    {
      name: 'The honeymoon we never took',
      desc: 'We went straight from engaged to parents without stopping. We would like to stop.',
      url: JOY_FUND,
    },
    {
      name: 'The house',
      desc: 'It came with a yard, a mortgage, and a list. We are slowly working down the list.',
      url: JOY_FUND,
    },
    {
      name: 'Evelyn’s fund',
      desc: 'Something set aside for the small person who made all of this happen faster.',
      url: JOY_FUND,
    },
  ],
  footnote:
    'All three lead to the same place, so pick whichever you like the sound of — we’ll know what you meant. Giving through Venmo, PayPal or Cash App costs you nothing extra; card payments add a small processing fee.',
};

/* ---------- FAQ ---------- */
export const faqs = [
  {
    q: 'What is the dress code?',
    a: 'Black tie optional, or formal. Long gowns and elevated cocktail dresses; a tuxedo or a very dark, well-tailored suit with a tie. When in doubt, dress like the castle deserves it.',
  },
  {
    q: 'Can I take photos during the ceremony?',
    a: 'Please don’t — we’d love to look out and see your faces rather than your phones. We have a wonderful photographer and videographer covering it. During the reception, take as many photos and videos as you like.',
  },
  {
    q: 'What time should I arrive?',
    a: 'By 4:30 PM. The ceremony begins promptly at 5:00 PM, and the doors close when it does.',
  },
  {
    q: 'Is there parking at the venue?',
    a: 'Only a little, which is why we’re running a shuttle from both hotels. It leaves for the castle at 4:15 PM and returns at 9:30 PM. If you must drive, please carpool.',
  },
  {
    q: 'Are children invited?',
    a: 'Yes — please bring them. We have a small one of our own, and we would much rather have your children there than not. If it helps, the shuttle back to the hotels leaves at 9:30 PM, which is a reasonable bedtime for everyone involved.',
  },
  {
    q: 'Can I bring a plus one?',
    a: 'If your invitation includes a guest, absolutely — just add their name when you RSVP. If you’re unsure, ask us and we’ll check the list.',
  },
  {
    q: 'What about dietary restrictions?',
    a: 'Tell us in the RSVP form. Vegetarian, vegan, gluten-free, and allergy-safe options are all available, and we’d much rather know now than on the night.',
  },
  {
    q: 'When should I RSVP by?',
    a: 'By March 21, 2027 — two months before the wedding. Earlier is lovelier.',
  },
];

export const rsvpDeadline = 'March 21, 2027';

export const credits = {
  photographer: 'Rachel Syrisko',
  photographerUrl: '',
};
