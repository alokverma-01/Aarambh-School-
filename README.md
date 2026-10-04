# Aarambh Public School website

A colourful, animated website for an Indian CBSE school, built with React, Vite and Framer Motion.

## Run it on your computer

```bash
npm install
npm run dev
```

Open the address it prints (usually http://localhost:5173).

## Put in your school's details (do this first)

Open `src/data/site.js` and change:

- `name`, `shortName`, `tagline`, `established`, `session`
- `whatsapp`: country code + number, digits only. Example: `919876543210`
- `phone`, `phoneHref`, `email`
- `address` and `mapQuery` (what the embedded Google Map searches for)
- `affiliationNo`, `schoolCode`, `socials`, `googleReviewUrl`

Every page reads from this one file, so the WhatsApp buttons, footer, contact page and map all update together.

## Replace the sample content

`src/data/content.js` holds notices, reviews, stats, history, the principal's letter, facilities and FAQs. Everything marked **SAMPLE** is placeholder text: replace it with your school's real information before going live, especially reviews and board results.

**Adding a notice:** add an object to the `notices` list. Dates are `YYYY-MM-DD`. Set `pinned: true` to keep it on top. Notices from the last 7 days get a "New" badge automatically.

## Photos

Photos are free Unsplash images loaded from Unsplash's CDN (`src/data/images.js`). To use your own:

1. Put files in `public/photos/`, for example `public/photos/assembly.jpg`
2. In `src/data/images.js`, change a key's value to `'/photos/assembly.jpg'`

## Deploy on Vercel

1. Push this folder to a GitHub repository.
2. On vercel.com choose **Add New → Project** and import the repository.
3. Vercel detects Vite automatically. Click **Deploy**.

`vercel.json` is included so page links like `/admissions` work when opened directly.

## How the WhatsApp enquiries work

There is no server or database. The floating WhatsApp button and the forms on the Admissions and Contact pages open WhatsApp with the parent's details already typed in. The parent presses send, and the message arrives on the school's number.

## What's inside

| Path | What it is |
| --- | --- |
| `src/pages/` | One file per page: Home, About, Academics, Admissions, Facilities, Gallery, Notices, Reviews, Contact, Disclosure, 404 |
| `src/sections/` | Home page sections, including the 3D scroll effects (`StagesStack3D`, `FacilitiesRail3D`, `GalleryRing3D`) |
| `src/components/` | Shared pieces: navbar, footer, custom cursor, WhatsApp button, page transitions, forms |
| `src/styles/` | `base.css` (colours, buttons), `layout.css`, `home.css`, `pages.css` |

## Accessibility

- Visitors who turn on "reduce motion" on their device get a calm version: 3D scroll effects become simple layouts and looping animations stop.
- The custom cursor only appears with a mouse; phones and tablets keep the normal touch behaviour.
- Keyboard focus is visible everywhere, forms announce errors, and the photo viewer works with arrow keys and Escape.

## Credits

Photos by Raj Rana, Church of the King, stem.T4L, Swastik Arora, CIMT Hooghly, Nikhita S, Jeswin Thomas, jaikishan patel, amol sonar, Dilip Sharma, Muhammad Zaid, Yogendra Singh and Aman Shrivastava on Unsplash.
