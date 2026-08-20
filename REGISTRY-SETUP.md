# Setting up your registry and your fund

**Short version:** use **Joy** ([withjoy.com](https://withjoy.com)) for both. It's
free, and it's the only major platform where cash gifts cost nobody anything.
Your site then links out to it — the fund appears as its own separate section,
not buried in the gift list.

---

## Why Joy

You told me two things: you have a house and most of the things that go in it,
and you want a cash fund kept separate from the registry. That combination makes
fees the deciding factor, because most of your gifts will be money.

| | Fee on cash gifts | Physical gift registry | Cost to you |
|---|---|---|---|
| **Joy** | **0%** via Venmo, PayPal, Cash App | Yes, from any store | Free |
| Zola | 0% Venmo, 2.5% card | Yes, big catalogue | Free |
| The Knot | ~2.5% | Yes | Free |
| Honeyfund | 0% to gift card, ~2.2% to Venmo/PayPal | Limited | Free |
| MyRegistry | 0% | Yes, universal | Free |

On $8,000 of cash gifts, that 2.5% is about **$200** that quietly disappears.
Joy and MyRegistry are the two that don't take it. Joy is much better looking
and easier to use, so that's my recommendation.

You don't need a second platform for the fund. Joy lets you create named cash
funds inside the same registry — we just present them separately on your site.

---

## Step 1 — Create the registry

1. Go to **[withjoy.com](https://withjoy.com)** and sign up.
2. It will offer to build you a wedding website. **Skip that** — you have one.
   You only want the registry.
3. Add whatever physical gifts you actually want. Joy lets you add items from
   any store on the internet with a browser button, so you're not stuck in one
   catalogue.

## Step 2 — Create your three funds

In the registry, add a **Cash Fund** three times, once for each:

- **The honeymoon we never took**
- **The house**
- **Evelyn's fund**

(Rename or delete any of these — they're my suggestions based on your story,
not a prescription.)

Connect **Venmo and/or PayPal** when it asks. This is the step that makes gifts
fee-free. If you skip it, guests can only pay by card and lose 2.5%.

## Step 3 — Put the links into your site

Open **`site/src/data/site.js`** and find these two sections:

```js
export const registry = { ... links: [...] }
export const funds = { ... items: [...] }
```

Paste each link between the empty quote marks. For example:

```js
{ name: 'Our Registry on Joy', desc: 'Everything in one place.', url: 'https://withjoy.com/sara-and-michael/registry' },
```

Save. Anything still empty stays hidden, so you can add them one at a time as
you go.

---

## A note on wording

Etiquette on cash funds has relaxed a lot, and asking is completely normal now —
but the framing matters. Two rules worth keeping:

1. **Never put a registry link on the invitation itself.** The website is the
   right place for it. That's why it lives here.
2. **Lead with "your presence is the gift"** and let the fund be an answer to a
   question guests asked, rather than a request you made.

The copy I've written already does both. The registry page opens with *"Truly,
the only thing we want is you in the room"*, and the fund section is framed as
*"if you would rather put something toward one of those than send us a serving
dish"* — an option, not an ask.

---

## Sources

- [Joy — zero-fee cash registry](https://withjoy.com/cash-fund-registry/)
- [Zola vs Joy comparison](https://withjoy.com/blog/zola-vs-joy/)
- [Best zero-fee wedding registries 2026 — Donum](https://www.trydonum.com/blog/best-zero-fee-wedding-registries-2026)
- [Honeyfund fee structure](https://www.honeyfund.com/)
