# Pointing svabekwedding.com at your site

Your site is already live on GitHub's servers — I've tested every page. The only
thing left is telling the internet that **svabekwedding.com** should lead there.

Your domain is registered at **Namecheap**, and right now it points at their
"parking page." We're going to change that.

---

## Where to go

1. Sign in to **[namecheap.com](https://www.namecheap.com)**
2. **Domain List** in the left sidebar
3. Find **svabekwedding.com** → click **Manage**
4. Click the **Advanced DNS** tab

---

## Step 1 — Delete what's already there

You'll see two or three existing records, something like:

| Type | Host | Value |
|---|---|---|
| A Record | @ | 162.255.119.142 |
| CNAME Record | www | parkingpage.namecheap.com. |

**Delete all of them** using the trash icon on the right. These are just
Namecheap's placeholder page.

---

## Step 2 — Add these five records

Click **ADD NEW RECORD** for each one. Set TTL to **Automatic** on all of them.

| Type | Host | Value |
|---|---|---|
| A Record | `@` | `185.199.108.153` |
| A Record | `@` | `185.199.109.153` |
| A Record | `@` | `185.199.110.153` |
| A Record | `@` | `185.199.111.153` |
| CNAME Record | `www` | `dhpinkdh.github.io.` |

Yes — four A records, all with `@` as the host. That's not a mistake; it's how
the four GitHub servers share the load.

The `@` means "the domain itself" (svabekwedding.com). The CNAME makes
www.svabekwedding.com work too.

Click the green **✓ SAVE ALL CHANGES**.

---

## Step 3 — Wait

Namecheap usually updates within **30 minutes**, though it can take a few hours.
Nothing is broken while you wait — it just takes time to spread around the world.

Test it by visiting **svabekwedding.com**.

---

## Step 4 — Turn on the padlock

Once the site loads at your domain, tell me and I'll switch on HTTPS — the
padlock icon in the browser bar. GitHub issues the security certificate
automatically, but it can only do that *after* the domain is pointing at them,
which is why it's last.

Until then you may see a "Not secure" warning. That's expected and temporary.

---

## Optional: IPv6

If you want to be thorough, you can also add these four **AAAA Records**, all
with host `@`. Not required — everything works without them.

```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

---

## Updating the site later

Once you've edited your words, added the registry links, or connected the RSVP
form, publish the changes with one command:

```bash
npm --prefix site run deploy
```

Takes about twenty seconds. Your domain and settings stay exactly as they are.
