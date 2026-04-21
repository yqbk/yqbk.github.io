# Website Improvement Plan

Audit date: 2026-04-21. Items ordered by priority within each phase. Check off each item as it is completed.

---

## Phase 1 — Accessibility (High Impact, Low Risk)

- [ ] **cv.html: Add `<h1>` heading** — page has no h1, breaking semantic hierarchy
- [ ] **index.html + cv.html: Add CSS `:focus-visible` styles** — keyboard users get no visual feedback on focused links
- [ ] **index.html: Add `aria-label` to social icon links** — icon-only links (`github`, `linkedin`, etc.) have no accessible name
- [ ] **index.html: Improve profile image alt text** — change `alt="my profile picture"` to `alt="Jakub Syrek, Senior Frontend Engineer"`
- [ ] **index.html + cv.html: Add a skip-to-content link** — `<a href="#main" class="skip-link">Skip to content</a>` at top of body
- [ ] **index.html: Add `aria-hidden="true"` to decorative icon `<i>` elements**

---

## Phase 2 — Semantic HTML

- [ ] **index.html: Wrap page content in `<main id="main">`**
- [ ] **index.html: Wrap social links in `<nav aria-label="Social links">`**
- [ ] **cv.html: Wrap each CV section (Experience, Education, Skills, Languages) in `<section>` with an appropriate `<h2>`**
- [ ] **cv.html: Wrap individual job entries in `<article>`**
- [ ] **index.html: Move decorative `#left`, `#right`, `#top`, `#bottom` divs to pure CSS** (pseudo-elements or box-shadow) and remove them from HTML

---

## Phase 3 — SEO

- [ ] **Add `robots.txt`** — minimal file allowing all crawlers and pointing to sitemap
- [ ] **Add `sitemap.xml`** — list `index.html` and `cv.html` with `<lastmod>`
- [ ] **index.html + cv.html: Add Open Graph tags** — `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- [ ] **index.html + cv.html: Add Twitter Card tags** — `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- [ ] **index.html + cv.html: Add `<link rel="canonical">`**
- [ ] **index.html: Fix `meta name="Description"` capitalisation** — attribute value should be lowercase `description`
- [ ] **cv.html: Add JSON-LD structured data** — `schema.org/Person` with name, job title, url, sameAs (social profiles)
- [ ] **index.html + cv.html: Expand meta descriptions** — current ones are very short; aim for 120–160 characters

---

## Phase 4 — CSS Modernisation

- [ ] **style.css + cv.css: Introduce CSS custom properties** — extract all hardcoded colours (`#ffdb3a`, `#000`, `#757575`, etc.) and key spacing values into `:root` variables
- [ ] **style.css: Remove outdated vendor prefixes** — `-webkit-`, `-moz-`, `-ms-` flexbox and animation prefixes are no longer needed for modern browsers
- [ ] **style.css: Consolidate duplicate `@keyframes`** — `fadeIn` and `pulse` are each defined 3–4 times; keep one standard definition each
- [ ] **style.css + cv.css: Adopt mobile-first media queries** — invert current desktop-first approach; base styles target small screens, `min-width` queries layer on top
- [ ] **style.css: Remove `font-size: 0` hack on `ul`** — use a proper gap/margin solution instead
- [ ] **Apply consistent CSS naming convention** — settle on BEM or a simple utility approach; rename classes like `.yellow`, `.link`, `#left`, `#right` to descriptive names

---

## Phase 5 — Performance

- [ ] **index.html: Add `width` and `height` attributes to profile `<img>`** — prevents Cumulative Layout Shift (CLS)
- [ ] **sw.js: Remove `console.log` statement** — debug output should not ship in production
- [ ] **Remove `cache-polyfill.js`** — polyfill targets Chrome <45 / Firefox <39 (2015); all supported browsers have native Cache API
- [ ] **index.html: Add `preconnect` hints for Google Fonts** — cv.html already has them; index.html is missing them
- [ ] **index.html: Fix non-standard `defer="defer"` on inline `<script>`** — `defer` has no effect on inline scripts; either move to an external file or remove the attribute
- [ ] **images: Provide WebP versions of `me.jpg` and icons** — add `<picture>` element with WebP source and JPEG fallback
- [ ] **index.html: Add font subsetting parameter to Google Fonts URL** — load only the character ranges actually used

---

## Phase 6 — Polish & Completeness

- [ ] **Add custom `404.html`** — GitHub Pages will serve it automatically; should match site design and link back to home
- [ ] **cv.html: Add `preconnect` for any remaining external origins** (already done for fonts; verify no others are missing)
- [ ] **cv.html: Simplify print-metadata-removal script** — `querySelectorAll` loop can replace 25 lines of repeated `querySelector` calls
- [ ] **sw.js: Add `.catch()` to service worker registration** — currently only `.then()` is handled
- [ ] **manifest.json: Update `start_url`** — change `"."` to `"/"` for clarity and to match canonical URL
- [ ] **Favicon: Replace 512px PNG shortcut icon with a proper `favicon.ico` or 32px PNG** — 512px is unnecessarily large for a favicon
- [ ] **index.html + cv.html: Add `dns-prefetch` for Google Analytics** — `<link rel="dns-prefetch" href="//www.google-analytics.com">`

---

## Notes

- Each phase can be executed independently as a separate PR/commit.
- Phases 1–3 are the highest-leverage changes for real-world impact (accessibility compliance, discoverability).
- Phase 4 (CSS) is the most involved; tackle vendor-prefix removal and variables as separate commits.
- No third-party dependencies are introduced by any item above — all changes are vanilla HTML/CSS/JS.
