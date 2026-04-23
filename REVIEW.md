# Site Review & Improvement Plan

> Audit date: 2026-04-23  
> Auditor: Claude (Sonnet 4.6)  
> Lighthouse mobile run: throttled, moto g power (Android 11)

---

## Current Lighthouse Scores

| Page | Accessibility | Best Practices | SEO | Performance |
|------|:---:|:---:|:---:|:---:|
| `/` desktop | 100 | 100 | 100 | — |
| `/cv.html` desktop | 97 | 100 | 100 | — |
| `/` mobile throttled | 100 | 100 | 100 | **89** |

The baseline is strong. The homepage is clean, semantic, and scores perfectly on a11y, SEO, and best practices. Performance on mobile is the primary gap.

---

## Mobile Performance Metrics (current)

| Metric | Current | Target |
|--------|---------|--------|
| First Contentful Paint | 2.9s | < 1.8s |
| Largest Contentful Paint | 2.9s | < 2.5s |
| Speed Index | 3.6s | < 3.4s |
| Time to Interactive | 2.9s | < 3.8s ✓ |

Root cause: two render-blocking requests (style.css + Google Fonts) chain together and delay first paint on slow mobile connections.

---

## Phase 1 — Critical Fixes (bugs and quick wins)

### 1.1 Add `<main>` landmark to `cv.html`
- **Issue:** `cv.html` has no `<main>` element. Screen readers cannot navigate to primary content. Costs 3 Lighthouse accessibility points.
- **Fix:** Wrap the `.cv` div contents in `<main>`.

### 1.2 Remove dead Universal Analytics tag
- **Issue:** `gtag("config", "UA-123417196-1")` — Google shut down Universal Analytics in July 2024. It collects no data and still loads a script on every page visit.
- **Fix:** Remove the `<script async src="https://www.googletagmanager.com/gtag/js?id=UA-...">` block entirely, or migrate to a GA4 property.

### 1.3 Add `fetchpriority="high"` to the LCP image
- **Issue:** The profile photo is the LCP element but the browser discovers and fetches it with default priority. LCP is 2.9s on mobile.
- **Fix:** Add `fetchpriority="high"` to the `<img class="profile-photo">` tag inside the `<picture>` element.

### 1.4 Fix fontello `@font-face` missing woff2
- **Issue:** `fontello.woff` and `fontello.woff2` exist on disk but are not listed in the `@font-face` src in `fontello.css`. Only EOT, TTF, and SVG are referenced. Browsers prefer woff2 — without it they fall back to the larger TTF.
- **Fix:** Add woff and woff2 entries to the `@font-face` src list (highest priority, before the existing formats).

### 1.5 Fix title inconsistency
- **Issue:** `index.html` `<title>` and meta description say "Software Developer". The CV and JSON-LD schema say "Senior Software Engineer".
- **Fix:** Update the homepage title/description to "Senior Software Engineer" for consistency.

---

## Phase 2 — Performance (FCP + LCP improvement)

### 2.1 Inline `style.css` into `<head>`
- **Issue:** `style.css` (1,640 bytes) is a render-blocking external stylesheet. Every page load waits for this round-trip before painting anything.
- **Fix:** Move the entire contents of `style.css` into a `<style>` tag in `<head>`. At 1.6KB it is well within the recommended inline threshold (~14KB). Estimated savings: **~1,920ms** on mobile.

### 2.2 Async Google Fonts loading
- **Issue:** `fonts.googleapis.com` stylesheet is render-blocking — the browser stalls first paint waiting for it.
- **Fix:** Use the same async pattern already used for fontello:
  ```html
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap"></noscript>
  ```

### 2.3 Add `fonts.gstatic.com` preconnect
- **Issue:** Loading Google Fonts creates a two-hop chain: page → `fonts.googleapis.com` → `fonts.gstatic.com`. Only the first origin has a preconnect hint.
- **Fix:** Add a second preconnect:
  ```html
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  ```

### 2.4 Resize profile photo
- **Issue:** `me.webp` is served at its original dimensions, but it renders at 165×165px (330×330 at 2x retina). The source file is larger than needed — Lighthouse estimates ~53KB savings.
- **Fix:** Export `me.webp` at 330×330px. Update `me.jpg` to match. Keep the `<picture>` element with both sources.

### 2.5 Extend cache lifetime via CDN
- **Issue:** GitHub Pages forces `Cache-Control: max-age=600` (10 minutes) on all assets. The profile photo (58KB), fonts, and stylesheets are re-fetched on every return visit after 10 minutes.
- **Fix:** Route the site through Cloudflare (free tier). Cloudflare caches static assets at the edge with longer TTLs, serves from global PoPs, and adds HTTP/2 push support — without changing the GitHub Pages deployment workflow.

---

## Phase 3 — Code Quality & Correctness

### 3.1 Replace JS photo border with pure CSS
- **Issue:** The profile photo border color is set via `window.onload` JavaScript, reading the CSS variable and setting an inline style with a 2,500ms transition. This creates a late repaint on an already-visible element.
- **Fix:** Set the border directly in CSS using `border: 4px solid var(--color-accent)`. The CSS variable already handles theme switching — no JavaScript needed.

### 3.2 Expand service worker asset caching
- **Issue:** `sw.js` pre-caches only `/`, `/index.html`, and `/cv.html`. CSS, fonts, and images are not pre-cached. Offline visits return unstyled pages.
- **Fix:** Add the critical assets to the `CACHED_URLS` array:
  - `/stylesheets/style.css`
  - `/stylesheets/cv.css`
  - `/stylesheets/fontello.css`
  - `/font/fontello.woff2`
  - `/images/me.webp`
  - `/images/favicon-32.png`

### 3.3 Use `data-tooltip` instead of `aria-label` for the CSS tooltip
- **Issue:** The `.theme-toggle` CSS tooltip reads `content: attr(aria-label)`. `aria-label` is for assistive technology — using it as a display source couples two separate concerns.
- **Fix:** Add a `data-tooltip` attribute and change the CSS to `content: attr(data-tooltip)`. Keep `aria-label` for screen readers.

### 3.4 Fix `<article>` + `display: contents` in `cv.html`
- **Issue:** Each job entry is `<article class="entry">` with `display: contents`. This removes the article from the accessibility tree — the element becomes invisible to screen readers as a landmark.
- **Fix:** Change entry wrappers to `<div class="entry">`. The semantic meaning is not lost (the section heading provides context), and the grid layout is preserved.

### 3.5 Add `"purpose": "maskable"` to manifest icons
- **Issue:** `manifest.json` icons lack the `"purpose"` field. Android adaptive icon slots will show a letterbox fallback instead of filling the icon shape.
- **Fix:** Add `"purpose": "any maskable"` to each icon entry (or generate a dedicated maskable icon with safe-zone padding using maskable.app).

---

## Phase 4 — Cleanup & Maintenance

### 4.1 Remove `font/Montserrat-Light.otf`
- **Issue:** An 89KB font file sits in `/font/` but is never referenced by any CSS. Montserrat is loaded exclusively from Google Fonts.
- **Fix:** Delete the file.

### 4.2 Remove or update `_config.yml`
- **Issue:** `_config.yml` contains only `theme: jekyll-theme-minimal`. The site is standalone HTML and does not use the Jekyll theme at all. It adds confusion for anyone reading the repo.
- **Fix:** Either delete the file (GitHub Pages will still serve Jekyll) or replace its content with only the necessary config (`exclude`, `plugins`, etc.).

### 4.3 Update `README.md`
- **Issue:** The README references `stylesheets/main.css` (a consolidated file that was never created). The actual files are `style.css` and `cv.css`.
- **Fix:** Update the README to reflect the actual file structure.

### 4.4 Verify experience year rounding
- **Issue:** `cv.html` uses `Math.ceil()` to calculate experience years. As of April 2026, this rounds 9 years 11 months up to **10**, displaying "10+ years" before the 10-year mark is actually reached.
- **Note:** This may be intentional ("at least X years" framing) — worth confirming and adding a comment to the code if so.

### 4.5 Audit sub-apps
- **Issue:** `stock_tracker/` and `weather/` are CRA builds from ~2018 using Workbox 3.6.3 loaded from `storage.googleapis.com`. The API keys embedded in the compiled bundles may be expired. These sub-apps are not listed in `sitemap.xml`.
- **Action:** Decide whether to keep, rebuild, or remove these apps. If keeping, update Workbox and verify API connectivity.

---

## Summary Table

| # | Item | Phase | Category | Effort |
|---|------|-------|----------|--------|
| 1.1 | Add `<main>` to cv.html | 1 | Accessibility | 1 line |
| 1.2 | Remove dead GA Universal Analytics | 1 | Correctness | 1 line |
| 1.3 | Add `fetchpriority="high"` to LCP image | 1 | Performance | 1 line |
| 1.4 | Fix fontello woff2 in @font-face | 1 | Performance | 2 lines |
| 1.5 | Align title to "Senior Software Engineer" | 1 | Content | 1 line |
| 2.1 | Inline style.css | 2 | Performance | 5 min |
| 2.2 | Async Google Fonts loading | 2 | Performance | 5 min |
| 2.3 | Add fonts.gstatic.com preconnect | 2 | Performance | 1 line |
| 2.4 | Resize me.webp to 330×330px | 2 | Performance | 5 min |
| 2.5 | Add Cloudflare CDN for cache headers | 2 | Performance | Setup |
| 3.1 | Replace JS photo border with CSS | 3 | Code quality | 5 min |
| 3.2 | Expand service worker asset caching | 3 | Offline / PWA | 10 min |
| 3.3 | Use data-tooltip for CSS tooltip | 3 | Accessibility | 2 lines |
| 3.4 | Fix article + display:contents in cv.html | 3 | Accessibility | refactor |
| 3.5 | Add purpose:maskable to manifest icons | 3 | PWA | 1 line |
| 4.1 | Delete unused Montserrat-Light.otf | 4 | Cleanup | delete |
| 4.2 | Remove/update _config.yml | 4 | Cleanup | 5 min |
| 4.3 | Update README.md | 4 | Cleanup | 5 min |
| 4.4 | Verify experience year rounding intent | 4 | Correctness | review |
| 4.5 | Audit or remove stock_tracker / weather sub-apps | 4 | Maintenance | TBD |
