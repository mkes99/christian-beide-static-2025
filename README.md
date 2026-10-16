# Christian Biede

Website for Christian Biede, tattoo artist at Dead West Tattoo Studio in Tucson, AZ.
A static [Astro](https://astro.build) site with one Cloudflare Pages Function that sends the contact form email.

- Live site: https://christianbiede.com
- Hosting: Cloudflare Pages
- Email: [Resend](https://resend.com)
- Spam protection: Google reCAPTCHA v3

## Requirements

- Node 22.12.0 or newer (`.node-version` pins 22.12.0)
- npm

## Commands

| Command           | What it does                             |
| ----------------- | ---------------------------------------- |
| `npm install`     | Install dependencies                     |
| `npm run dev`     | Start the dev server at `localhost:4321` |
| `npm run build`   | Build the site into `dist/`              |
| `npm run preview` | Serve the built `dist/` folder locally   |

`npm run dev` serves the pages only. To test the contact form locally, build the site and run it with Wrangler, which also serves `functions/`:

```sh
npm run build
npx wrangler pages dev dist
```

## Project layout

```
src/
  pages/        index, the-process, contact, privacy-policy, terms-and-conditions,
                and [gallery].astro (builds all four gallery pages)
  layouts/      BaseLayout.astro (header, footer, title bar, back-to-top)
  components/   ContactForm, Gallery, Offerings, SectionHeading, site/ (header, footer, nav, logo)
  data/         site.ts, navLinks.ts, galleries.ts, processSteps.ts
  scripts/      menu, lightbox, masonry, backToTop, contactForm
  styles/       global.css (the only stylesheet)
  assets/       images and fonts, processed by Astro at build time
functions/
  formsend.js   POST /formsend: validates the form and emails it through Resend
  api/status.ts GET /api/status: returns the current UTC time as JSON
public/         favicon, robots.txt, and _headers (long cache for built assets)
```

Imports use the `@/` alias for `src/` (for example `@/data/site`).

## Editing content

- **Studio name, address, email, hours, social links, reCAPTCHA site key:** `src/data/site.ts` (the key itself comes from `PUBLIC_RECAPTCHA_SITEKEY`)
- **Navigation:** `src/data/navLinks.ts`. The Galleries submenu is generated from `galleries.ts`.
- **Process page steps:** `src/data/processSteps.ts`
- **Gallery photos:** put images in `src/assets/gallery/<slug>/`. They show in filename order, so
  prefix names with numbers (`01-`, `02-`, ...). The four galleries are listed in
  `src/data/galleries.ts`; the slug is both the folder name and the page URL.
- **Page descriptions:** each page passes a `description` to `BaseLayout`; the default is in `src/data/site.ts`.
- **Fonts:** Oswald and Open Sans are downloaded at build time and served from the site (set up in `astro.config.mjs`). The sitemap is generated at build time too.
- **Styles:** everything is in `src/styles/global.css`.

## Deploying (Cloudflare Pages)

| Setting                | Value                     |
| ---------------------- | ------------------------- |
| Framework preset       | Astro                     |
| Build command          | `npm run build`           |
| Build output directory | `dist`                    |
| Node version           | 22 (from `.node-version`) |

The `functions/` folder at the repo root is deployed automatically as Pages Functions.

## Environment variables

Set these in Cloudflare Pages under Settings, Variables and Secrets. Add them for both the
Production and Preview environments, and store the keys as secrets.

| Variable               | Used by                 | Purpose                                                              |
| ---------------------- | ----------------------- | -------------------------------------------------------------------- |
| `RESEND_API_KEY`       | `functions/formsend.js` | Resend API key used to send the email                                |
| `EMAIL_FROM_ADDRESS`   | `functions/formsend.js` | Sender address, on a domain verified in Resend                       |
| `EMAIL_TO_ADDRESS`     | `functions/formsend.js` | Inbox that receives contact form messages                            |
| `RECAPTCHA_SECRET_KEY` | `functions/formsend.js` | reCAPTCHA v3 secret key, used to verify the form token on the server |

The reCAPTCHA **site key** is public. It is read at build time from `PUBLIC_RECAPTCHA_SITEKEY`, so set
it in Cloudflare Pages (Production and Preview) as a build variable, and in a git-ignored `.env` file
for local builds. The matching **secret key** is `RECAPTCHA_SECRET_KEY` and must never be committed.

For local testing with Wrangler, put the same variables in a `.dev.vars` file at the repo root
(already git-ignored):

```
RESEND_API_KEY=re_xxxxxxxx
EMAIL_FROM_ADDRESS=Christian Biede <forms@example.com>
EMAIL_TO_ADDRESS=inbox@example.com
RECAPTCHA_SECRET_KEY=xxxxxxxx
```

## Contact form

The form (`src/components/ContactForm`) posts to `/formsend` with these fields: `name`, `email`,
`tel`, `date`, `textarea`, an optional `file`, and `recaptchaToken` (reCAPTCHA v3, action
`contactform`).

- Name and a valid email are required.
- The attachment must be an image, 5 MB at most.
- Text fields are length-limited and HTML-escaped before they go into the email.
- The reCAPTCHA token is verified with Google before anything else. The function rejects the
  request (403) unless the check succeeds, the action is `contactform`, and the score is 0.5 or higher.
- If any of the four environment variables is missing, the function returns a 500 error.
