# BUILD-BRIEF.md — BNM Barbershop Demo Site

> Read this together with **DESIGN.md** in the same folder. DESIGN.md sets the colors, fonts, hexagon motif, and accessibility rules. This brief sets what the site contains and how it behaves. If the two ever disagree, DESIGN.md wins on look; this brief wins on content and features.

**Task for Claude Code:** Create a new site, **BNM Barbershop Demo**, following both files. Plain HTML, CSS, and minimal vanilla JavaScript. Host-ready for Netlify. When finished, start a local preview and list every placeholder still in use.

---

## 1. Look and feel

**Elegant type**
- Headings: a refined, high-contrast display face. Use "Playfair Display" or "Cormorant Garamond" for large headlines, paired with a clean sans ("Inter" or "Manrope") for body and buttons. This overrides the condensed-sans suggestion in DESIGN.md.
- Uppercase small labels with wide letter spacing (0.2em) above section titles, like "THE MENU" or "THE CHAIR".
- Generous line height (1.6 body) and plenty of empty space. Elegance comes from restraint.

**Urban / sleek details**
- Black and chrome base with gold accents, as in DESIGN.md.
- Thin 1px gold or chrome hairlines between sections instead of heavy boxes.
- Subtle hexagon LED glow pattern echoing the shop ceiling.
- Hard-edged photography with high contrast. Small corner radius (6px max).
- A faint film-grain texture over dark sections (very light, under 4% opacity).

---

## 2. The visit, from top to bottom

**2.1 Brand opening**
- A short intro: the gold "B" monogram fades in, the hexagon lines glow on, then it reveals the page.
- Under 1.5 seconds total. Plays only on the first visit in a session. A "Skip" control is visible. Skipped automatically when the visitor has reduced motion turned on.

**2.2 Full-screen video**
- Full-viewport hero video of the shop interior: hexagon ceiling lights, a chrome chair turning, clippers at work. Muted, looping, autoplay, `playsinline`.
- Dark gradient overlay so text stays readable. Headline: "BNM BARBERSHOP" with the tagline "Sharp Cuts. Clean Lines."
- Two buttons: **Book Now** (gold) and **Call** (chrome outline).
- A visible pause button. A poster image loads first. Video file under ~10 MB, with a smaller version for phones.

**2.3 Welcome paragraph that lights up word by word**
- A 2–3 sentence welcome, large type. As the visitor scrolls, each word brightens from dim grey to white, like the LED panels switching on. Key words ("precision", "welcome", "Frederick") brighten to gold.
- Text must be fully readable and present in the HTML from the start (for screen readers and Google). The effect is visual only.
- With reduced motion on, show the paragraph fully lit.

Sample copy:
> Welcome to BNM Barbershop. Every chair here is built for precision, from the cleanest skin fade to the sharpest lineup. Pull up, sit back, and leave looking like the best version of you.

**2.4 Scrolling ribbon of haircut styles**
- A slow, continuous horizontal ribbon of style names separated by small gold hexagons: Skin Fade · Taper · Burst Fade · Drop Fade · Lineup · Crop · Textured Top · Waves · Twists · Beard Sculpt · Bob · Silk Press · Braids.
- Pauses on hover and on keyboard focus. Has a pause button. Stops under reduced motion. Duplicate items are hidden from screen readers.

**2.5 Full list of services (barber and salon)**
Show as a clean two-column menu with dotted leaders between name and price, grouped by category. Each item: name, short description, time, price, "Book" link.

*Barber*
- Haircut — $35 · 45 min
- Skin Fade — $40 · 45 min
- Kids Cut (12 and under) — $25 · 30 min
- Lineup / Edge-Up — $15 · 15 min
- Beard Trim & Shape — $20 · 20 min
- Haircut + Beard — $50 · 60 min
- Hot Towel Shave — $35 · 40 min
- Hair Design — from $10 · add-on

*Salon (women's services)*
- Women's Cut & Style — $55 · 60 min
- Blowout — $45 · 45 min
- Silk Press — $75 · 90 min
- Color (single process) — from $85 · 90 min
- Highlights — from $120 · 2 hr
- Deep Conditioning Treatment — $30 · 30 min
- Braids (consultation required) — from $120

*Add-ons*
- Eyebrow Shape — $10
- Scalp Treatment — $20
- Black Mask Facial — $15

**2.6 Other products at the shop**
- A "Shop the Chair" strip of 4–6 retail products sold in store: pomade, beard oil, edge control, shampoo, wave brush, gift card.
- Each card: product image, name, price, "Ask your barber" note. No online checkout. Gift cards link to a Square gift card placeholder.

**2.7 The barber's story**
- Founder story section, split layout: portrait on one side, story on the other.
- Fictional founder: **Marco Reyes**, cutting hair since age 15, opened BNM after a decade in shops across Baltimore and D.C. Theme: craft, community, every client leaves sharper than they came in.
- Include a short pull quote in large elegant type, and a gold signature-style name.
- Below it, the team: Marco (fades), Andre (beard work), Luis (designs and kids), Simone (salon services). Hexagon-framed photos with a "Book with [name]" button each.

**2.8 Photo gallery**
- Masonry grid of finished cuts, beard work, salon styles, and shop interior. Filter buttons: All · Fades · Beards · Salon · The Shop.
- Accessible lightbox: opens on click or Enter, arrow keys move, Esc closes, focus returns to the thumbnail.
- Lazy-load images, WebP format, meaningful alt text.

**2.9 Guest reviews**
- 4–6 short reviews with first name and last initial, star rating, and service received. Simple fade carousel with previous/next buttons and a pause, or a static grid on mobile.
- An overall rating line ("4.9 average from 200+ reviews") and a "Read more on Google" placeholder link.

**2.10 Plan your visit**
- Address, embedded map (loads only after consent or on click, see section 4), hours table, parking note, "Walk-ins welcome, appointments recommended."
- Buttons: Get Directions, Call, Book Now.
- Small FAQ: Do you take walk-ins? What forms of payment? Cancellation policy? Do you cut kids' hair?

---

## 3. Small touches that make it feel premium

1. **Live "Open now" badge.** A small gold-dot badge in the header that reads "Open now · closes 8pm" or "Closed · opens Tue 10am", calculated from the hours in the page. Instantly useful and feels high-end.
2. **Before-and-after slider.** In the gallery, 2–3 drag sliders showing a cut before and after. Works with mouse, touch, and arrow keys.
3. **LED progress line.** A thin glowing gold line across the top of the screen that fills as you scroll, like the ceiling lights switching on. Hidden under reduced motion.
4. **Gift card and loyalty callout.** An elegant black card-style banner: "Give the gift of a fresh cut" and "Every 10th cut is on us", both linking to Square placeholders. Adds perceived value and a reason to return.
5. **Polished micro-interactions.** Buttons get a soft LED glow on hover and focus; service rows highlight with a gold hairline; images ease in gently as they scroll into view. All subtle, all under 300ms, all switched off under reduced motion.

---

## 4. Works for everyone

**Mobile-friendly**
- Mobile-first layout, tested at 360px, 768px, 1024px, 1440px.
- Sticky bottom bar on phones with **Book** and **Call**.
- Tap targets at least 44×44px. No sideways scrolling.

**Accessible (WCAG 2.1 AA)**
- Everything in DESIGN.md section 12, plus:
- Every moving element (video, ribbon, carousel, word animation) can be paused, and all respect `prefers-reduced-motion`.
- Skip-to-content link, one H1, logical heading order, visible gold focus rings.
- Lightbox, cookie banner, and menus are fully keyboard-operable and trap/return focus correctly.
- Captions on any video with speech. No accessibility overlay widgets.

---

## 5. Privacy, security, and speed

**Cookie banner with real choices**
- Shows on first visit. Three equal-weight buttons: **Accept all**, **Reject all**, **Customize**.
- Categories: Necessary (always on), Analytics (off by default), Maps and embedded media (off by default).
- No analytics scripts or Google Maps load until the visitor allows them. Until then, the map shows a static image with "Load map" button.
- Choice saved in localStorage; a "Cookie settings" link in the footer reopens the banner.
- Link to a simple Privacy Policy page explaining what is collected.

**Spam protection**
- The contact form (name, phone, message) uses **Netlify Forms** with a hidden honeypot field (`netlify-honeypot`).
- Add basic validation and a simple timing check (reject submissions under 3 seconds).
- Optional later: Cloudflare Turnstile. Do not add Google reCAPTCHA by default.

**Security settings**
- Add a Netlify `_headers` file with: Content-Security-Policy (allow only the domains actually used: self, Google Fonts, Square, Google Maps when consented), Strict-Transport-Security, X-Content-Type-Options: nosniff, X-Frame-Options: DENY, Referrer-Policy: strict-origin-when-cross-origin, Permissions-Policy (disable camera, microphone, geolocation).
- HTTPS only. No secrets or API keys in the code. No card data collected anywhere.
- External links use `rel="noopener noreferrer"`.

**Easy to host**
- Static site, no database, no build step required. Deploys to Netlify straight from GitHub.
- Include a `netlify.toml` with sensible defaults and a custom 404 page in the brand style.
- Speed targets: Lighthouse 90+ in all categories on mobile; self-host or preload fonts; WebP images; lazy-load below the fold; total page weight under ~3 MB excluding the hero video.

---

## 6. Special features

**Booking calendar**
- "Book" section with an embedded **Square Appointments** booking widget (placeholder URL `https://square.site/book/PLACEHOLDER`).
- Every Book button across the site scrolls to or opens this section. Individual barber buttons pre-select that barber where Square allows.
- Fallback link opens Square booking in a new tab if the embed fails.

**Click to call**
- Phone link `tel:+13015550123` in the header, hero, Plan Your Visit, footer, and mobile sticky bar.
- Show the number as text too, so desktop visitors can read it.

---

## 7. Be upfront with the client

Add a small, tasteful "Demo notice" line in the footer, and include these points in the handoff notes:

- The photos and hero video are **AI-generated for this concept**. A real launch would use their own photography and video of their shop, barbers, and work.
- The menu, prices, reviews, team names, founder story, address, and phone number are **sample content** to be replaced with theirs.
- The **booking, gift card, and phone links are placeholders**. They go live once connected to the shop's own Square account and business phone number.
- Reviews on the live site must be **real reviews from real customers**, ideally pulled from or linked to their Google profile. Sample reviews are never published as genuine.

---

## 8. Placeholder content (from DESIGN.md)
- Name: BNM Barbershop
- Address: 123 Main Street, Frederick, MD 21701
- Phone: (301) 555-0123
- Hours: Tue–Fri 10am–8pm · Sat 9am–6pm · Sun 10am–3pm · Mon closed

## 9. File layout
```
/index.html
/privacy.html
/404.html
/css/styles.css      (colors and fonts as CSS variables at the top)
/js/main.js
/images/             (WebP)
/videos/             (MP4 + poster)
/_headers
/netlify.toml
/DESIGN.md
/BUILD-BRIEF.md
```
