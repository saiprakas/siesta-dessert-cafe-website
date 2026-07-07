# 🧁 Siesta Dessert Cafe — WEBSITE (static)

The public website for Google searches: story, food photos, hours, map & directions,
and contact (call / WhatsApp / Instagram). **100% static — no backend, no forms,
no connection to the Ops panel.** The QR menu is a separate project in
`D:\SIESTA DESSERT CAFE`.

## Run locally

```bash
npm install     # first time only
npm run dev     # open http://localhost:5173
```

## Change any detail (phone, hours, address, about text)

Edit **`src/siteConfig.js`**, then rebuild:

```bash
npm run build
```

Website photos: edit the image URLs at the top of `src/Home.jsx` (the `SHOWCASE` list) —
replace them with your own dish photos anytime.

## Put it online (free)

1. `npm run build` → creates the `dist` folder.
2. Go to https://app.netlify.com/drop and drag `dist` onto it.
3. Share the link (e.g. `https://siesta-cafe.netlify.app`) and add it to your
   Google Business profile so customers find it on Google & Maps.

Built with React 19 + Vite. Made with 💛 for Siesta — Sweet Moments • Warm Memories • Just a Siesta Away.
