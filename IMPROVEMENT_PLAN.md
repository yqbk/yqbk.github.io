# Website Improvement Plan

Audit date: 2026-04-21. Items ordered by priority within each phase. Check off each item as it is completed.

---

## Phase 1 — Accessibility ✅

- [x] **cv.html: Add `<h1>` heading** — page has no h1, breaking semantic hierarchy
- [x] **index.html + cv.html: Add CSS `:focus-visible` styles** — keyboard users get no visual feedback on focused links
- [x] **index.html: Add `aria-label` to social icon links** — icon-only links (`github`, `linkedin`, etc.) have no accessible name
- [x] **index.html: Improve profile image alt text** — change `alt="my profile picture"` to `alt="Jakub Syrek, Senior Frontend Engineer"`
- [x] **index.html + cv.html: Add a skip-to-content link** — `<a href="#main" class="skip-link">Skip to content</a>` at top of body
- [x] **index.html: Add `aria-hidden="true"` to decorative icon `<i>` elements**

---

## Phase 2 — Semantic HTML ✅

- [x] **index.html: Wrap page content in `<main id="main">`**
- [x] **index.html: Wrap social links in `<nav aria-label="Social links">`**
- [x] **cv.html: Promote section titles to `<h2 class="title">`** — full `<section>` wrappers skipped; flat CSS Grid requires direct children, `display:contents` would be fragile
- [x] **cv.html: Wrap individual job entries in `<article class="entry">` with `display:contents`**
- [x] **index.html: Remove decorative `#left`, `#right`, `#top`, `#bottom` divs** — had no CSS rules, were fully inert

---

## Phase 3 — SEO ✅

- [x] **Add `robots.txt`** — minimal file allowing all crawlers and pointing to sitemap
- [x] **Add `sitemap.xml`** — list `index.html` and `cv.html` with `<lastmod>`
- [x] **index.html + cv.html: Add Open Graph tags** — `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- [x] **index.html + cv.html: Add Twitter Card tags** — `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- [x] **index.html + cv.html: Add `<link rel="canonical">`**
- [x] **index.html: Fix `meta name="Description"` capitalisation** — attribute value should be lowercase `description`
- [x] **cv.html: Add JSON-LD structured data** — `schema.org/Person` with name, job title, url, sameAs (social profiles)
- [x] **index.html + cv.html: Expand meta descriptions** — current ones are very short; aim for 120–160 characters

---

## Phase 4 — CSS Modernisation ✅

- [x] **style.css + cv.css: Introduce CSS custom properties** — `--color-accent`, `--color-text`, `--color-muted`, `--color-hover`, `--font-family` in `:root` on both files
- [x] **style.css: Remove outdated vendor prefixes** — all `-webkit-`, `-moz-`, `-ms-` flexbox and animation prefixes removed
- [x] **style.css: Consolidate duplicate `@keyframes`** — `fadeIn` and `pulse` reduced to single standard definitions each
- [x] **style.css: Adopt mobile-first media queries** — column layout is now the default; `@media (orientation: landscape)` layers on the row layout
- [x] **style.css: Remove `font-size: 0` hack on `ul`** — replaced with flexbox + `justify-content: center`
- [x] **CSS naming convention: rename `.yellow` → `.highlight`** — updated in style.css and all occurrences in index.html

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
