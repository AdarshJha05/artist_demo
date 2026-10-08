# Kajal Mehta Portfolio - Complete Project Context

This document provides a comprehensive overview of the Kajal Mehta Portfolio project, including its architecture, tech stack, design decisions, and maintenance instructions.

## 1. Project Overview
The project is a premium, single-page portfolio website for Kajal Mehta, a Visual Artist pursuing her BFA at Delhi College of Art. The design goal was to create an Awwwards-level, gallery-grade experience that feels highly editorial, immersive, and elegant. 

## 2. Architecture & Tech Stack
The project was built intentionally with **Zero Build Steps**. It uses vanilla web technologies and runs simply by opening `index.html` in any modern web browser.
- **HTML5:** Semantic markup, SEO meta tags (Open Graph, Twitter Cards), and JSON-LD structured data for rich search results.
- **CSS3:** Built completely with custom CSS Variables (design tokens), `clamp()` for fluid responsive typography, and native CSS media queries. No Tailwind or Bootstrap was used, maximizing bespoke control.
- **JavaScript (Vanilla + GSAP):** 
  - Vanilla JS is used for basic interactivity (form validation, theme toggling, lightbox logic).
  - **GSAP & ScrollTrigger (via CDN):** Used exclusively for high-performance, scroll-linked animations like the horizontal filmstrip gallery, staggering hero collage, and scroll reveals.
- **Hosting/Deployment:** Ready to be deployed via GitHub Pages, Vercel, or any static file server without compilation.

## 3. File Structure
```text
c:\Users\jhash\Downloads\Demo_Artist\
├── index.html       # The main entry point containing all semantic sections
├── README.md        # Basic repository information
├── context.md       # This file (Project Context)
├── css/
│   └── styles.css   # Contains all design tokens, global resets, and component styles
├── js/
│   └── main.js      # Contains the 'portfolioData' block and all interactive logic
└── assets/          # Contains cropped, optimized images in WebP and JPG fallback
    ├── artist-portrait.jpg/.webp
    ├── artwork-1.jpg/.webp
    ├── artwork-2.jpg/.webp
    ├── artwork-3.jpg/.webp
    ├── artwork-4.jpg/.webp
    └── favicon.svg
```

## 4. Key Features & Enhancements
- **Cinematic Hero:** Features a staggered collage of artworks with mouse-move depth parallax, scroll parallax, split-line typography masks, and an SVG rotating text badge.
- **Filmstrip Gallery:** The "Selected Works" section turns into a horizontal scrolling filmstrip on desktop (via GSAP), while degrading gracefully to a masonry grid on mobile.
- **Enhanced Lightbox:** A full-screen gallery viewer supporting keyboard navigation (Arrows, Escape), focus trapping, and mobile swipe gestures.
- **Exhibition Pass:** The "Featured At" section is styled like a perforated ticket. Its status ("Upcoming", "Now Showing", "Recently Featured") automatically updates based on the current date via JS, and includes a generated `.ics` calendar download.
- **Dark Mode:** A manual Light/Dark toggle in the navigation header that automatically persists user preference to `localStorage`.
- **Accessibility & Performance:** Respects `prefers-reduced-motion` to disable heavy animations for sensitive users. Uses `<link rel="preload">` to load critical fonts and the hero image instantly.

## 5. Maintenance & Content Updating
To ensure the client (or a non-developer) can easily update the site without breaking complex HTML or GSAP logic, all variable content has been abstracted into a central JavaScript object.

### How to update content:
1. Open `js/main.js`.
2. Locate the `const portfolioData` object at the very top of the file.
3. Update the fields within this object. For example, to change an artwork title, edit the `title` string for that specific item.

### Handling Placeholders:
- **Artworks:** Titles, Mediums, and Years are currently placeholders (e.g., "Artwork Title 1", "Medium Placeholder", "2026").
- **Contact Email:** Set as `studio@kajalmehta.art (Placeholder)`. If the email string is left empty in `main.js`, the direct email link in the footer will intelligently hide itself to maintain a clean layout.
