# BNM Barbershop — Barbershop Website Concept

A sharp, modern website concept for BNM Barbershop, a fictional barbershop and salon in Frederick, Maryland. The design is meant to look like the shop feels in person: bright white walls, a black ceiling lit by a glowing hexagon LED grid, black stations with warm mirror lights, and chrome and leather chairs. A visitor who books online should recognize the place the moment they walk in.

Concept / spec design. The interior, portrait, haircut, salon and product photography and the hero video were generated with AI (Higgsfield: GPT Image 2.5 stills and a Seedance 2.5 video) for this concept. The map preview is still an illustrated placeholder. The menu, prices, team, founder story, reviews, address and contact details are sample content. The booking, gift card and loyalty links point to Square placeholders, and the contact form only sends when the site is deployed on Netlify.

Live demo: https://bnm-barbershop-demo-site.netlify.app/

## Highlights

**Design**

- Ceiling-black and wall-white sections, with chrome silver details and sign-gold accents used sparingly
- Playfair Display headlines paired with Inter body text
- Hexagon LED motif throughout: a glowing hero pattern, hexagon dividers, hexagon-framed barber portraits and a faint film-grain texture over dark sections
- Warm "mirror light" bars across the tops of cards and photos

**Motion & effects** (vanilla JavaScript, no libraries)

- Branded intro: the gold "B" monogram fades in as the hexagon lines glow on. It runs under 1.5 seconds, once per visit, and can be skipped
- Full-screen hero video with a pause button and a poster image that loads first
- Welcome paragraph that lights up word by word as you scroll, with key words turning gold
- Continuously scrolling ribbon of haircut styles, which pauses on hover, on focus or with a button
- Thin glowing gold progress line across the top of the screen
- Live "Open now · closes 8pm" badge worked out from the shop's hours on Frederick (Eastern) time
- Gallery with filters, a keyboard-friendly lightbox, before-and-after drag sliders and a fading reviews carousel

**Sections**

Hero · Welcome and the shop · Style ribbon · Services and prices (barber, salon and add-ons) · Shop the Chair products · Founder story · Meet the barbers · Gallery and before/after · Reviews · Gift cards and loyalty · Book (Square Appointments) · Plan your visit (hours, map, FAQ, contact form)

## Accessibility (aimed at WCAG 2.1 AA)

- Skip link, one H1, logical heading order and descriptive alt text for every photo
- Full keyboard support with gold focus rings; focus stays inside the mobile menu, lightbox and cookie settings while they're open, then returns to where it was
- Every moving element (video, ribbon, carousel, word effect) can be paused, and all of them switch off for "reduce motion" users
- Labeled form fields with error messages that screen readers announce
- AA color contrast (gold text only on black, black text on gold buttons)
- Tap targets of at least 44×44px, a sticky Book / Call bar on phones, and no sideways scrolling at 360px or 1440px

## Privacy & security

- Cookie consent banner with three equal choices (Accept all, Reject all, Customize) and per-category settings. The choice is saved, and a "Cookie settings" link in the footer reopens it
- The Google Map loads only after consent or a click on "Load map"; until then a static preview is shown
- Respects Global Privacy Control: if the browser sends it, analytics stay off automatically
- Google Analytics 4 is wired in but switched off until a measurement ID is added in `js/main.js`. It only loads after consent, and turning consent off deletes its cookies
- Privacy policy and terms and conditions
- Nothing loads from another company until the visitor accepts: fonts and all site files are self-hosted
- Security headers for Netlify (Content-Security-Policy, HSTS, nosniff, frame denial, referrer and permissions policies) in `_headers`. The CSP allows no inline scripts or styles
- Spam protection on the contact form: honeypot field, a minimum fill time of 3 seconds and field validation
- No card data is collected anywhere; booking and payments are handed off to Square

## Built with

HTML, CSS and vanilla JavaScript · Playfair Display & Inter (self-hosted, SIL Open Font License; see `fonts/`)

No build step: open `index.html` in a browser, or serve the folder with any static host. It's set up for Netlify; see `netlify.toml`.

## Files

| File | Purpose |
|---|---|
| `index.html` | Main one-page site |
| `privacy.html`, `terms.html`, `404.html` | Privacy policy, terms and conditions, and branded "page not found" |
| `css/styles.css` | All styles, including responsive and reduced-motion rules. Colors and fonts are variables at the top |
| `js/main.js` | Interactions, cookie consent, map gate, booking links and form checks |
| `js/intro.js` | Small head script that decides whether the brand intro plays |
| `_headers`, `netlify.toml` | Netlify security headers and site configuration |
| `sitemap.xml`, `robots.txt` | Search engine sitemap and crawler rules |
| `fonts/` | Self-hosted WOFF2 fonts and their licenses |
| `images/`, `videos/` | Compressed WebP photos, design SVGs and the hero video |
| `DESIGN.md`, `BUILD-BRIEF.md` | The design system and build brief this site follows |
| `HANDOFF.md` | Client handoff notes, the full placeholder list and the hero video prompt |
