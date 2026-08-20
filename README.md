# Sara & Michael — Wedding Website

Friday, May 21, 2027 · Thornewood Castle Inn & Gardens, Lakewood, WA

---

## Seeing it

The site is already running in the preview panel. If you ever need to start it
again yourself, run this from this folder:

```bash
npm --prefix site run dev
```

Then open **http://localhost:5173** in a browser.

---

## Changing the words

**Almost everything you'd want to edit lives in one file:**

```
site/src/data/site.js
```

Open it and you'll find your names, the date, the timeline, your story, the
hotels, the registry links, and every FAQ — each one labelled, in plain English.
Change the text between the quote marks, save, and the page updates instantly.

You never need to touch anything else to change copy.

### A few things worth knowing

- **`story.chapters`** is the Our Story page. Each block is one moment. Add a
  new one by copying an existing block; delete one by removing it. The layout
  alternates left/right automatically, and the numbering renumbers itself.
- **`registry.links`** — paste your real links in. Any entry with an empty
  link is simply hidden, so you can fill them in as you get them.
- **`faqs`** — add or remove questions freely.

---

## Changing the photos

Web-ready copies of your photos live in **`site/public/photos/`**. They're named
`p11.jpg`, `p101.jpg` and so on, matching the numbers on your originals.

To swap a photo, find the filename in `site/src/data/site.js` (for Our Story) or
in the relevant page file, and change it to a different one.

To add a *new* photo, drop the original in the top-level `photos/` folder and
run this to make a web-sized copy:

```bash
sips -Z 2000 -s format jpeg -s formatOptions 72 "photos/YOURFILE.jpg" --out "site/public/photos/pNEW.jpg"
```

The originals are 5–7 MB each — far too heavy for guests on phones. The copies
in `site/public/photos/` are around 400 KB and visually identical on screen.

---

## The RSVP form

Right now the form is beautiful but not yet connected. Guests who submit it get
a polite message offering to email you instead, so nothing is ever lost.

**To connect it to a spreadsheet, follow `RSVP-SETUP.md`.** It's about five
minutes of copying and pasting, no coding.

---

## What's on each page

| Page | What's there |
|---|---|
| **Home** | Hero, the date, key facts, countdown, photo strip, evening timeline, RSVP call, FAQ |
| **Our Story** | Nine chapters with scroll-triggered photos and a reading-progress bar |
| **Location** | Thornewood Castle history, address, live map, practical notes, running order |
| **Accommodation & Travel** | Shuttle times, both hotels, airports, weather and getting-around notes |
| **RSVP** | The form — questions adapt depending on whether a guest is coming |
| **Registry** | Your gift links, a separate dark band for the three cash funds, and a thank-you note |

---

## Things you may still want to fill in

- [ ] **Registry + fund links** — set up Joy and paste the links into
      `site/src/data/site.js`. See **`REGISTRY-SETUP.md`** for why Joy and how.
- [ ] **The medical passage in Our Story** — chapter 02 is written with care,
      but it's your story. Read it and change anything that doesn't sound like you.
- [ ] **The RSVP deadline** — currently March 21, 2027. Change `rsvpDeadline`
      in `site/src/data/site.js` if you'd like a different date.
- [ ] **Wedding party page** — not built, since there were no names yet. Easy to add.
- [ ] **Dress code detail** — currently folded into the FAQ. Could be its own page.

---

## Design notes

- **Type:** Instrument Serif for display, Inter for everything else — the same
  pairing as the Webflow template you liked.
- **Colour:** drawn from your photos — cream paper `#F6F4EC`, warm ink `#211E1A`,
  oxblood `#5E2626` (your dress), brass `#A98A54`, sage `#7C8471`.
- All colours and type sizes are defined once at the top of
  **`site/src/styles.css`**, so changing one line restyles the whole site.
- Motion respects "reduce motion" accessibility settings — animations turn
  themselves off for guests who need that.
