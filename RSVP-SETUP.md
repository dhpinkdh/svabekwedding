# Connecting your RSVP form to a spreadsheet

This takes about five minutes, once. You'll copy a short piece of text into
Google, click a few buttons, and paste one link back into your website.

You don't need to understand the code — just move it from A to B.

---

## Step 1 — Make the spreadsheet

1. Go to **sheets.google.com** and create a **Blank spreadsheet**.
2. Name it something like **Wedding RSVPs**.

That's it. Leave it empty — the form fills in the column headings for you.

---

## Step 2 — Add the little program that receives replies

1. In that spreadsheet, click **Extensions → Apps Script** in the top menu.
   A new tab opens with a code editor and a small amount of sample text in it.
2. Select everything in that editor and delete it.
3. Open the file **`rsvp-google-script.js`** (it's sitting next to this guide
   in your project folder), copy **all** of it, and paste it into the empty editor.
4. Click the **save icon** (💾) near the top.

---

## Step 3 — Publish it

1. Click the blue **Deploy** button, top right → **New deployment**.
2. Click the **gear icon** next to "Select type" and choose **Web app**.
3. Fill in the two dropdowns:
   - **Execute as:** *Me*
   - **Who has access:** **Anyone** ← this matters. Your guests aren't signed
     in to your Google account, so the form needs to be reachable by anyone.
4. Click **Deploy**.
5. Google will ask you to **Authorize access**. Click through it. You'll hit a
   scary-looking screen that says "Google hasn't verified this app" — that's
   normal, because *you* just wrote it. Click **Advanced**, then
   **Go to Wedding RSVPs (unsafe)**, then **Allow**.
6. Copy the **Web app URL** it gives you. It looks like:

   ```
   https://script.google.com/macros/s/AKfycb................/exec
   ```

---

## Step 4 — Paste it into your website

Open **`site/src/data/rsvp-config.js`** and paste the link between the quote marks:

```js
export const RSVP_ENDPOINT = 'https://script.google.com/macros/s/AKfycb..../exec';
```

Save. Done — replies now land in your spreadsheet as rows.

---

## Step 5 — Test it

Go to your RSVP page, fill it in as if you were a guest, and send it.
A new row should appear in the spreadsheet within a couple of seconds.

---

## Optional: get an email whenever someone replies

In the Apps Script editor, find this line near the top:

```js
const NOTIFY_EMAIL = '';
```

Put your email address between the quote marks, save, and then
**Deploy → Manage deployments → pencil icon → Version: New version → Deploy**.

You'll get a note every time someone RSVPs.

---

## Updating the script later

If I ever add a new question to the form, you'll need to give the script the
matching column — otherwise that answer arrives and is quietly thrown away.

1. Open your spreadsheet → **Extensions → Apps Script**
2. Select everything in the editor, delete it, and paste in the current
   **`rsvp-google-script.js`** from your project folder
3. Save (💾)
4. **Deploy → Manage deployments → pencil icon → Version: New version → Deploy**

Step 4 is the one people miss. Saving alone changes nothing for guests — only a
*new version* goes live.

The current script adds any missing columns to your sheet by itself, including
to a sheet that already has replies in it. So this should be the last time you
need to do this.

---

## If something goes wrong

**Replies aren't appearing.** Nine times out of ten, "Who has access" got left
on *Only myself*. Go to **Deploy → Manage deployments**, click the pencil, and
set it to **Anyone**.

**You changed the script and nothing happened.** Apps Script only publishes when
you make a *new version*: **Deploy → Manage deployments → pencil → Version:
New version → Deploy**.

**Guests see the "we couldn't send that" message.** The link in
`rsvp-config.js` is missing or mistyped. It must end in `/exec` — not `/dev`.

Nothing is ever lost: if the connection fails, the form offers guests a
pre-filled email instead, so a reply always reaches you one way or another.
