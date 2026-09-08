# mcgconstruction.uk

Website for MCG Construction Group Ltd — roofing, Buxton & the Peak District.

## What this is
A single static HTML page. No framework, no build step, no dependencies.
Netlify serves this directory exactly as it is.

## Files
- `index.html`   — the entire site. Styles and scripts are inline at the top/bottom.
- `img/`         — photographs (Tom's own job photos) and the logo.
- `favicon.png`  — browser tab icon, from the MCG logo.
- `robots.txt`   — allows indexing, points to the sitemap.
- `sitemap.xml`  — single URL, the homepage.
- `_headers`     — caching and security headers (mirrored in netlify.toml).
- `netlify.toml` — Netlify config.

## How to change something
Edit `index.html` and redeploy. Everything is in one file, in this order:
head/SEO → styles → header → hero → stats → "why roofs fail" → services →
materials table → estimator → process → gallery → reviews → surveys →
areas → contact form → footer → scripts.

## The enquiry form
A Netlify form named `enquiry`, with a honeypot field (`bot-field`) for spam.
Netlify detects the form by parsing this HTML at deploy time — if you rename
the form or remove `data-netlify="true"`, submissions stop working.
The field named `email` is what sets Reply-To on notification emails.

## The estimator
Rates live in the `RATE` and `EX` objects in the script at the bottom of
`index.html`. They are indicative market figures plus 10%, signed off Sept 2026 —
not MCG's own cost base. Roof area is worked from footprint ÷ cos(pitch).

## Hosting
Netlify project `mcg-construction`. Domain DNS stays at GoDaddy —
only the apex A record points at Netlify (75.2.60.5). The MX, SPF and
autodiscover records are Microsoft 365 email and must not be touched.
Never move this domain to Netlify DNS: it would break the email.
