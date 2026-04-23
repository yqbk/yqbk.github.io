

## Industry-Standard Audit (2026-04-23)

### Executive verdict
Current state is **good**, but not yet “best industry standard.”

- Overall maturity: **7.8 / 10**
- Strengths: modern metadata, good baseline accessibility, clean static architecture, no framework bloat.
- Main gap to close: runtime resilience and long-term maintainability (especially service worker strategy and content freshness guarantees).

### What already aligns with modern standards

- `index.html`, `cv.html`, and `404.html` now use split light/dark `theme-color` metadata.
- `index.html` and `cv.html` include canonical URLs and Open Graph/Twitter metadata with explicit image dimensions.
- Core accessibility features are present: skip links, focus-visible styles, ARIA labels on social links.
- Font loading pattern is non-blocking (`preload` + `noscript`) across all pages.
- Robots and sitemap files are syntactically valid and discoverable.
- PWA baseline exists (`manifest.json` + `sw.js`) with installable icon set.

### New findings (not covered above)

#### High priority

1. **Service worker uses unconditional cache-first for all requests**
   - Evidence: `sw.js` lines 39-45.
   - Risk: stale HTML/CSS can persist indefinitely until service worker version is bumped manually; users may not get critical fixes quickly.
   - Why this is below best practice: modern PWAs usually use route-specific strategies (network-first for HTML, stale-while-revalidate for static assets).
   - Recommendation:
     - Apply strategy by request destination:
       - Document/navigation: network-first with cache fallback.
       - CSS/JS/images/fonts: stale-while-revalidate.
     - Add explicit versioning or content-hash approach for static assets.

2. **No immediate activation of new service worker versions**
   - Evidence: `sw.js` has `install`/`activate`, but no `self.skipWaiting()` and no `clients.claim()`.
   - Risk: fixed assets may not become active until old tabs are closed, delaying rollout.
   - Recommendation:
     - Add `self.skipWaiting()` in install and `self.clients.claim()` in activate.
     - Optionally implement an update notification flow in the UI.

#### Medium priority

3. **External links open in the same tab and are not explicitly marked as external**
   - Evidence: multiple outbound links in `index.html` and `cv.html`, no icon/text cue, no policy.
   - Risk: UX inconsistency and reduced predictability for keyboard/screen reader users.
   - Recommendation:
     - Define one consistent policy:
       - Keep same-tab (current behavior) but label external destinations clearly in copy/ARIA, or
       - Open in new tab with `target="_blank"` + `rel="noopener noreferrer"`.

4. **`display: contents` used on semantic grouping wrapper (`.entry`)**
   - Evidence: `stylesheets/cv.css` line 132.
   - Risk: historically inconsistent accessibility tree behavior in some browser/screen-reader combinations.
   - Recommendation:
     - Replace with explicit grid placement on child elements while keeping a normal block wrapper, or
     - Validate with NVDA + Firefox and VoiceOver + Safari before keeping it.

5. **Experience year display rounds up (`Math.ceil`) and can overstate tenure**
   - Evidence: `cv.html` line 385.
   - Risk: factual accuracy concern (e.g., 9 years + 1 month shown as 10+).
   - Recommendation:
     - Use floor for conservative reporting, or
     - Render “9+” only after full year boundary.

6. **No explicit social preview fallback for Twitter/X if OG image fetch fails**
   - Evidence: only single image URL used in `index.html` and `cv.html`.
   - Risk: brittle unfurl behavior on transient image/CDN failures.
   - Recommendation:
     - Add absolute image URL health checks in release checklist.
     - Optionally provide an additional `twitter:image:alt` for accessibility and richer previews.

#### Low priority

7. **PWA manifest color settings are light-theme only**
   - Evidence: `manifest.json` has `background_color: "#fff"`, `theme_color: "#ffdb3a"`.
   - Risk: install/splash visuals may not match dark mode preference.
   - Recommendation:
     - Decide whether install experience should remain brand-yellow (acceptable), or
     - Publish dark-aware manifest variants if dark install UX is desired.

8. **Sitemap `lastmod` values are manual and can drift from actual content updates**
   - Evidence: `sitemap.xml` lines 5 and 11.
   - Risk: search crawlers receive stale freshness signals.
   - Recommendation:
     - Update `lastmod` on content changes via a lightweight release checklist or script.

### Compliance snapshot

- **SEO fundamentals**: strong
- **Accessibility baseline**: strong, with one medium-risk CSS pattern (`display: contents`)
- **Performance**: strong for static render path; medium for update freshness due to SW strategy
- **PWA quality**: good baseline, not yet production-grade lifecycle handling
- **Operational readiness**: medium (manual steps still required for versioning and metadata freshness)

### Suggested roadmap to reach “best industry standard”

1. Refactor `sw.js` to route-aware caching + immediate activation.
2. Decide and enforce a single external-link policy site-wide.
3. Replace or validate `display: contents` behavior with assistive tech testing.
4. Correct experience-year rounding policy in `cv.html`.
5. Add a small release checklist: `sitemap lastmod`, social preview image check, service worker cache version review.

### Definition of done (target state)

- Lighthouse SEO/Best Practices/Accessibility consistently >= 95.
- No stale-content incidents after deploys.
- Verified keyboard + screen reader pass on home and CV pages.
- Deterministic metadata and sitemap updates on each content release.
