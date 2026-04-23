# Jakub Syrek — Personal Website

Personal website and CV at [yqbk.github.io](https://yqbk.github.io), built with plain HTML and CSS. No build step.

## Structure

```
├── index.html              # Home / business card page
├── cv.html                 # Full CV / résumé page
├── 404.html                # Custom 404 page
├── sw.js                   # Service worker (PWA, cache-first)
├── manifest.json           # PWA manifest
├── robots.txt
├── sitemap.xml
├── stylesheets/
│   ├── style.css           # Home + 404 styles
│   ├── cv.css              # CV page styles (CSS Grid, print)
│   └── fontello.css        # Icon font declarations
├── font/                   # Fontello icon font files
└── images/                 # Profile photo and PWA icons
```

## Features

- Dark / light mode toggle with `localStorage` persistence and `prefers-color-scheme` fallback
- PWA — installable, offline-capable via service worker
- Print-optimised CV with A4 grid layout and page-break control
- Accessible: skip link, ARIA labels, keyboard focus styles, landmark regions
- No framework, no build tooling, no dependencies
