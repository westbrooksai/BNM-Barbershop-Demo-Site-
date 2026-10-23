# BNM Barbershop: Demo Handoff Notes

## Be upfront with the client
- **Photos and hero video are AI-generated for this concept** (Higgsfield: GPT Image 2.5 for stills, Seedance 2.5 for the video). The people, shop and products are fictional. A real launch uses the shop's own photos and video of their space, barbers and work.
- **Sample content.** The menu, prices, products, reviews, team names, founder story, address, phone number and hours are samples to be replaced with the shop's own.
- **Placeholder links.** Booking, gift card, loyalty, social and Google review links go live once they're connected to the shop's own Square account, phone number and profiles.
- **Reviews must be real.** Never publish the sample reviews as genuine. Use real reviews from real customers, ideally pulled from or linked to their Google Business Profile.

## Placeholders to replace

| Item | Where | Current value |
|---|---|---|
| Square booking URL | `index.html` → `#book` (`data-embed-url` and the "Open Booking" link) | `https://square.site/book/PLACEHOLDER` |
| Square gift cards | Shop the Chair card, gift banner, footer | `https://squareup.com/gift/PLACEHOLDER/order` |
| Square loyalty | Loyalty banner | `https://squareup.com/loyalty/PLACEHOLDER` |
| Phone | Header, hero, book, visit, footer, mobile bar, privacy, 404, JSON-LD | `(301) 555-0123` / `tel:+13015550123` |
| Address | Visit, footer, map, JSON-LD, privacy | 123 Main Street, Frederick, MD 21701 |
| Hours | Hours table (`data-open`/`data-close`, which also drive the Open-now badge), footer, JSON-LD | Tue–Fri 10–8, Sat 9–6, Sun 10–3, Mon closed |
| Hero video | `videos/hero-shop-interior.mp4` (15 s, 854×480, 1.6 MB, silent). Phones use the same file. | AI-generated concept video |
| Hero poster | `images/hero-poster-shop-interior.webp` | AI-generated concept still |
| Interior photos (3) | `images/shop-interior-*.webp` | AI-generated concept stills |
| Founder + barber portraits (5) | `images/founder-*.webp`, `images/barber-*.webp` | AI-generated fictional people |
| Gallery (11) + before/after (4) | `images/gallery-*.webp`, `images/before-after-*.webp` | AI-generated concept stills |
| Products (6) | `images/product-*.webp` | AI-generated, sample prices |
| Static map preview | `images/map-static-placeholder.svg` | Illustrated placeholder |
| Reviews (6) + "4.9 from 200+" | Reviews section | Sample text, labelled as sample on the page |
| Google reviews link | Reviews section | Generic Maps search URL |
| Social links | Footer | Instagram, Facebook and TikTok home pages |
| Canonical / share URLs + share image | `index.html` head, JSON-LD, `images/og-share.jpg` (1200×630) | `https://westbrooksai.github.io/BNM-Barbershop-Demo-Site-/` |
| Analytics | `loadAnalytics()` in `js/main.js` | None installed. Add the provider here so it loads only after consent. |
| Privacy policy | `privacy.html` | Sample text. The shop should review it. |

## When swapping in real media
1. Export photos to WebP and overwrite the files with the same names in `/images`.
2. Update the `width`/`height` attributes to the new aspect ratios to avoid layout shift.
3. Hero video: muted, no speech (no captions needed), under ~10 MB. For a separate phone cut, add `videos/hero-shop-interior-mobile.mp4` and point `data-src-mobile` in `index.html` at it.
4. Self-host the fonts (Playfair Display + Inter as WOFF2 in `/fonts`) for the best Lighthouse score, then remove the Google Fonts entries from the CSP.

## Deploy (Netlify)
- Connect the GitHub repo. No build command; the publish directory is the repo root (already set in `netlify.toml`).
- `_headers` sets CSP, HSTS, nosniff, frame-deny, referrer and permissions policies.
- Netlify Forms picks up the `contact` form automatically on the first deploy. Turn on email notifications under Forms.
- After the real Square booking URL is set, check that the embed loads. If Square uses a different domain, add it to `frame-src` in `_headers`.

## Re-skinning for the next client
All colors and fonts are CSS variables at the top of `css/styles.css`. Client settings for JS (time zone, consent key, form timing) are in `CONFIG` at the top of `js/main.js`.

## Hero video prompt (Seedance 2.5 · 16:9 · 15 s · 480p · omni-reference)
References: `@hero-poster-shop-interior` (the hero still) and `@barber-marco` (Marco's portrait). Audio off.

```
A 15-second, 16:9, silent website hero loop inside BNM Barbershop: the empty shop under its glowing hexagon LED ceiling, a chrome barber chair turning, Marco fading a client's sides with clippers, then a pull-back that ends on the same wide view the clip opens on, so the loop joins cleanly. Four shots joined by hard cuts.
Opens on the empty shop at evening, every light already on.

REFERENCES
@hero-poster-shop-interior — the shop itself: bright white walls, matte black ceiling covered by a glowing honeycomb grid of white LED hexagon tubes, four black stations on the right wall with large mirrors and a thin warm-white strip light above each mirror, polished chrome and black leather barber chairs, dark wood-look plank floor. Take the room, the geometry and the light. This plate's camera angle IS the first shot's angle.
@barber-marco — Marco's face, short black hair with a high skin fade, short trimmed beard, black cape-style smock over a black t-shirt with small gold "BNM". Take face and clothes only; ignore the portrait's framing and background.

LOOK
Wide lenses (24–35 mm), clean modern digital cinema look, deep clean blacks, punchy contrast, crisp white walls, cool-white glow from the hexagon ceiling with a soft bloom, warm-white strip light over each mirror, chrome with bright specular highlights. Rich and saturated in every shot, never washed out, faded, hazy or pastel. Smooth, slow, confident camera moves; calm and premium, not flashy.

CHARACTERS
Marco — master barber, early 30s, focused and calm, precise hands, eyes on the hair the whole time. Never looks at the camera. Never speaks.
Client — man in a black cape, seen from behind and in profile, face mostly turned away from camera, sits still.

PROP RULE
Clippers: black cordless clippers with a chrome blade, only in Marco's right hand, only in shot 3.

WHERE EVERYONE IS — fixed for the whole clip
The room as seen from the entrance: stations along the right wall, the open floor and a long black bench on the left, the hexagon ceiling across the top of frame.
Shot 3 only: Marco stands screen-left of the second station's chair; the client sits in that chair facing the mirror, screen-right of Marco.

WHAT IS BEHIND EACH OF THEM — so they land in the right seats
Behind Marco: the open floor and white wall of the shop, hexagon ceiling glow at the top of frame. Behind the client: the station mirror with its warm-white strip light and black shelves.

SHOTS
0.0–4.0s — THE VERY FIRST FRAME OF THE CLIP IS THIS: exactly the angle of @hero-poster-shop-interior, 24 mm, eye height at the entrance, the whole empty room in view. A slow, steady push-in down the length of the room that never stops. No people. BACKGROUND: the far wall and the dark street windows at the end of the room, the stations and chairs on the right, the hexagon ceiling glowing across the top, reflections of the lights sliding along the floor as the camera moves. Hard cut at 4.0s.

4.0–8.0s — Low angle, 35 mm, on one empty chrome and black leather barber chair in front of its station. The chair rotates slowly on its chrome base, about a half turn, from facing the camera to facing the mirror, while the camera eases slightly to the right. BACKGROUND: the black station and mirror with its warm-white strip light behind the chair, white wall, the edge of the hexagon ceiling glowing at the top of frame; the hexagon lights reflect as moving highlights in the chrome. Hard cut at 8.0s.

8.0–12.5s — Medium close-up, 35 mm, side angle at shoulder height. Marco, screen-left, runs the clippers upward along the side of the client's head, creating a clean skin fade; short hairs fall onto the black cape. His left hand rests lightly on the top of the client's head. The client sits screen-right, facing the mirror, face mostly turned away from camera. The camera travels slowly left to right along them and never stops. BACKGROUND: behind the client, the station mirror with its warm-white strip light and black shelves; behind Marco, the white wall and the open floor, hexagon ceiling glow at the top of frame. Marco's eyes stay on the fade. Hard cut at 12.5s.

12.5–15.0s — 24 mm, starting at the stations and pulling back smoothly toward the entrance, rising slightly, until at 15.0s the frame matches the opening angle of @hero-poster-shop-interior: the full room, the hexagon ceiling glowing across the top, stations on the right. Marco and the client are small at the second station, Marco still working. BACKGROUND: the far wall and windows at the end of the room. The move eases to a stop exactly on the last frame.

SOUND
Silent clip: no music, no ambience, no voices, no effects. The website plays it muted.

KEEP CONSISTENT
The clip opens on the empty wide shop at exactly the angle of @hero-poster-shop-interior, never on a close-up.
The last frame matches the first frame's angle so the loop joins cleanly.
The hexagon LED ceiling glows cool white in every shot that shows the ceiling; it never flickers or changes shape.
Walls are bright white, the ceiling is matte black, the floor is dark wood-look planks, and the stations are black with a warm-white strip light over each mirror.
Marco's face and clothes exactly as @barber-marco; he appears only from 8.0s on.
The clippers are only in Marco's right hand, only from 8.0s on.
The client's face stays mostly turned away from camera.
Nobody looks at the camera. Nobody speaks.
Three hard cuts, at 4.0s, 8.0s and 12.5s; no dissolves, flashes or morphs.
The camera keeps moving through every shot.
Rich, saturated, deep blacks in every shot, never washed out or hazy.
No subtitles, no on-screen text, no logos other than the small gold "BNM" on Marco's shirt.
```
