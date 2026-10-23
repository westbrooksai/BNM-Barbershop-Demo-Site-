# DESIGN.md — BNM Barbershop (Demo Site)

> Demo site for Brick-n-Mortar AI. "BNM Barbershop" is a fictional business. Do not use any real shop's name, logo, photos, or people.

## 1. Purpose
Build a modern, premium, mobile-first website for a barbershop. The site should look like the shop feels in person, so a visitor who books online and then walks in recognizes it right away. The look, colors, lighting, and materials on the site should match the physical space.

## 2. The physical space (what the site must echo)
- Bright, clean, white walls with black ceilings and dark wood-look floors.
- Signature feature: a glowing **hexagon LED grid** across the ceiling.
- Black barber stations with mirrors, shelving, and warm white strip lights above each mirror.
- Polished **chrome and black leather** barber chairs.
- Black capes with **gold** lettering.
- Storefront: big glass windows, brick base, illuminated sign with white and gold lettering, a classic barber pole.
- Mood: sharp, confident, modern, welcoming. Precision and clean fades. Not vintage, not rustic.

## 3. Brand
- **Name:** BNM Barbershop
- **Tagline options:** "Sharp Cuts. Clean Lines." / "Precision Every Chair."
- **Logo direction:** a gold monogram "B" inside a circle, paired with a white wordmark. Text-based placeholder logo is fine.
- **Voice:** short, confident, friendly. Plain language. No slang overload.

## 4. Color palette
| Role | Color | Hex |
|---|---|---|
| Background (dark sections) | Ceiling black | #0B0B0D |
| Surface / cards | Station black | #16171A |
| Light sections | Wall white | #F7F7F5 |
| Primary accent | Sign gold | #F2C230 |
| Accent hover / deep gold | Cape gold | #C9A13B |
| Metal / borders | Chrome silver | #C8CCD2 |
| LED glow | Cool white glow | #EAF4FF |
| Body text on dark | | #E6E6E6 |
| Body text on light | | #1A1A1A |

Rules:
- Alternate dark sections (like the ceiling) with bright white sections (like the walls).
- Gold is the accent only: buttons, key words, icons, dividers. Never large gold backgrounds.
- All text must meet WCAG AA contrast (4.5:1 body, 3:1 large text). Dark gold text on white fails, so use gold on black, and black text on gold buttons.

## 5. Typography
- **Headings:** a bold, geometric or condensed sans, such as "Oswald" or "Bebas Neue" (Google Fonts). Uppercase for main headings, wide letter spacing.
- **Body:** "Inter" or "Manrope" (Google Fonts), regular weight, 16px minimum on mobile.
- Max two font families.

## 6. Signature motif: the hexagon LED grid
This is the visual thread between the shop and the site.
- Hero background: a subtle hexagon line pattern that glows softly (CSS or SVG, thin white lines with a soft glow).
- Section dividers: a thin row of hexagon outlines.
- Icons and barber headshots framed in hexagon shapes.
- Buttons can have a faint glow on hover, like the LED lights.
- Keep it subtle. It should feel like the ceiling, not a sci-fi theme.

## 7. Materials and details
- Chrome: thin silver borders and subtle metallic gradients on cards.
- Leather: deep black surfaces with very soft shadows.
- Mirror lights: a thin warm white bar at the top of cards or images.
- Rounded corners kept small (6–10px). Sharp and clean.

## 8. Page structure (single page with anchor links, plus optional pages)
1. **Sticky header:** logo, nav (Services, Barbers, Gallery, Reviews, Visit), and a gold "Book Now" button.
2. **Hero:** full-width background video or image of the shop interior with the hexagon lights. Headline, short subline, two buttons: "Book Now" (gold) and "Call Now" (outline chrome).
3. **Services and prices:** cards for Haircut, Skin Fade, Beard Trim, Haircut + Beard, Kids Cut, Lineup, Hot Towel Shave. Each shows price, time, and a "Book" link.
4. **Meet the barbers:** 3–4 barbers, hexagon-framed photo, name, specialty, and a "Book with [Name]" button.
5. **Gallery:** grid of finished cuts (fades, lineups, beard work). Lightbox on click.
6. **The shop:** short paragraph about the space, plus 2–3 interior images so visitors know what to expect when they walk in.
7. **Reviews:** 3 short testimonials with star ratings.
8. **Visit us:** address, hours table, embedded map, click-to-call, parking note.
9. **Footer:** logo, hours, phone, social links, privacy policy link, "Website by Brick-n-Mortar AI."
10. **Mobile:** a sticky bottom bar with "Book" and "Call" buttons.

## 9. Booking, calls, and payments
- Booking uses **Square Appointments**. Use a placeholder link: `https://square.site/book/PLACEHOLDER`. Every "Book" button points there. Optionally embed the booking widget in a "Book" section.
- Click-to-call: `tel:+13015550123` (placeholder).
- Do not build a custom booking or payment system. Do not collect card data.

## 10. Placeholder content
- Address: 123 Main Street, Frederick, MD 21701
- Phone: (301) 555-0123
- Hours: Tue–Fri 10am–8pm, Sat 9am–6pm, Sun 10am–3pm, Mon closed
- Prices: Haircut $35, Skin Fade $40, Beard Trim $20, Haircut + Beard $50, Kids Cut (12 and under) $25, Lineup $15, Hot Towel Shave $35
- Barbers: Marco (fades), Andre (beard work), Luis (designs and kids cuts)

## 11. Media
- Images go in `/images`, videos in `/videos`. Use descriptive filenames.
- All media is AI-generated or licensed. No real customers' faces from other businesses.
- Compress images to WebP; videos to MP4 under ~10 MB each, with a poster image.
- Hero video: muted, looping, autoplay, with a pause button.
- Until real media is added, use tasteful placeholders that match the palette.

## 12. Accessibility (WCAG 2.1 AA)
- Meaningful alt text on every image; decorative patterns marked as decorative.
- Captions for any video with speech.
- Full keyboard navigation with visible focus outlines (gold).
- Proper heading order, one H1.
- Respect `prefers-reduced-motion`: turn off glow animations and autoplay.
- No accessibility overlay widgets.

## 13. Performance, SEO, and security
- Mobile-first, responsive at 360px, 768px, 1024px, 1440px.
- Lighthouse target 90+ in every category on mobile.
- Page title: "BNM Barbershop | Fades, Beard Trims & Haircuts in Frederick, MD".
- Name, address, and phone in text in the footer, matching the Google listing.
- Add LocalBusiness / HairSalon structured data (JSON-LD) with hours and address.
- Static site, no database. Host on Netlify with HTTPS.
- Simple privacy policy page if analytics are added.

## 14. Do's and don'ts
**Do:** keep it clean and bright like the shop, use gold sparingly, make booking reachable in one tap from anywhere, echo the hexagon lights.
**Don't:** use vintage or rustic barbershop clichés, crowd the page, use more than two fonts, put gold text on white, add flashy animations that slow the page.

## 15. Build notes for Claude Code
- Plain HTML, CSS, and minimal vanilla JavaScript unless told otherwise.
- Put all colors and fonts in CSS variables at the top of the stylesheet so this file can be swapped for the next client.
- Start a local preview when done and list anything still using placeholders.
