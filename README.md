# mcgconstruction.uk

Website for MCG Construction Group Ltd — roofing, Buxton & the Peak District.

## What this is
A static multi-page site. No framework, no build step, no dependencies.
Netlify serves this directory exactly as it is.

## Pages
- `index.html`            — Home: hero, stats, "why roofs fail", services summary, reviews
- `services/index.html`   — full services grid, "beyond the roof", six-step process
- `materials/index.html`  — roof coverings table
- `estimate/index.html`   — the estimator
- `our-work/index.html`   — gallery and reviews
- `surveys/index.html`    — survey and quote options
- `areas/index.html`      — towns covered, yard and hours
- `contact/index.html`    — enquiry form and contact details

## Shared files
- `css/site.css`  — all styles, used by every page.
- `js/site.js`    — mobile menu, estimator, enquiry form.
- `img/`          — photographs (Tom's own job photos) and `logo.png`.
- `favicon.png`   — browser tab icon, from the MCG logo.
- `robots.txt`    — allows indexing, points to the sitemap.
- `sitemap.xml`   — one URL per page. Add a line when adding a page.
- `_headers`      — caching and security headers (mirrored in netlify.toml).
- `netlify.toml`  — Netlify config.

## How to change something
Edit the page and redeploy. The header (logo, menu, phone) and the footer are
repeated in every page, so a change to either has to be made in all eight files.
Reviews appear on both the home page and Our Work.
Old one-page links such as `/#contact` are forwarded to the new pages by a
small script in the head of `index.html`.

## The enquiry form
A Netlify form named `enquiry`, with a honeypot field (`bot-field`) for spam.
Netlify detects the form by parsing this HTML at deploy time — if you rename
the form or remove `data-netlify="true"`, submissions stop working.
The field named `email` is what sets Reply-To on notification emails.
The form lives on `contact/index.html`.

## The estimator
Rates live in the `RATE` and `EX` objects in `js/site.js`. They are indicative market figures plus 10%, signed off Sept 2026 —
not MCG's own cost base. Roof area is worked from footprint ÷ cos(pitch).

## Hosting
Netlify project `mcg-construction`. Domain DNS stays at GoDaddy —
only the apex A record points at Netlify (75.2.60.5). The MX, SPF and
autodiscover records are Microsoft 365 email and must not be touched.
Never move this domain to Netlify DNS: it would break the email.
