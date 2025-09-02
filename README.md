# Jakub Syrek - Personal Website

A simplified, modern personal website built with HTML and CSS.

## Project Structure

```
├── index.html          # Home page
├── cv.html            # CV/Resume page
├── stylesheets/
│   ├── main.css       # Consolidated styles (home + CV)
│   └── fontello.css   # Icon fonts
├── images/            # Profile and icon images
├── manifest.json      # PWA manifest
└── sw.js             # Service worker
```

## Simplifications Made

### CSS Consolidation

- **Before**: Separate `style.css` and `cv.css` files
- **After**: Single `main.css` file with organized sections
- **Benefits**: Easier maintenance, reduced HTTP requests, better organization

### Code Cleanup

- Removed vendor prefixes (no longer needed for modern browsers)
- Consolidated duplicate CSS rules
- Simplified animations and keyframes
- Removed unused CSS classes and rules

### HTML Simplification

- Removed unnecessary wrapper divs
- Consolidated JavaScript into single blocks
- Cleaner, more semantic structure
- Removed unused elements

### Performance Improvements

- Single CSS file reduces HTTP requests
- Removed redundant CSS rules
- Cleaner, more maintainable code
- Better organized styles with clear sections

## Features

- **Responsive Design**: Works on all device orientations
- **Print Optimization**: CV prints cleanly with proper page breaks
- **Modern CSS**: Uses CSS Grid and Flexbox for layouts
- **PWA Ready**: Includes service worker and manifest
- **Clean Typography**: Montserrat font family for readability

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox support required
- Graceful degradation for older browsers

## Development

To modify styles, edit `stylesheets/main.css`. The file is organized into clear sections:

- Main styles (body, typography)
- Home page styles
- CV styles
- Print styles
- Animations
