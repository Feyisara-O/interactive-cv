# Okunola Mofeyisara — Interactive CV Website

A professionally designed, fully responsive interactive CV website built with vanilla HTML, CSS, and JavaScript. No frameworks. No dependencies. Just clean, purposeful code.

**Live Demo:** [feyisaracodes.com/cv](https://feyisara-o.github.io/interactive-cv/) &nbsp;|&nbsp; **Portfolio:** [feyisaracodes.com](https://feyisara-o.github.io/feyisara-porfolio/) &nbsp;|&nbsp; **GitHub:** [@Feyisara-o](https://github.com/Feyisara-O)

---

## Overview

This project is the interactive web version of my professional CV — designed to give clients, collaborators, and recruiters a more engaging and memorable experience than a static PDF. It is built entirely without frameworks, demonstrating core frontend engineering and UI design skills at production level.

The design direction is **clean editorial with a luxury gold accent system** — professional enough for corporate clients, refined enough for fashion and lifestyle brands.

---

## Features

### User Experience
- **Dark / Light mode toggle** — smooth theme transition with `localStorage` persistence so the user's preference is remembered across sessions
- **Sticky navigation bar** — section jump links (Experience, Projects, Skills, Education) always accessible as the user scrolls
- **Hamburger menu** — on mobile, the desktop nav collapses into a full-screen overlay menu with large, elegant navigation links
- **Scroll-reveal animations** — each section fades and slides into view as it enters the viewport using `IntersectionObserver`
- **Profile photo placeholder** — circular LinkedIn-style photo with an initials fallback if no image is loaded
- **Download PDF button** — triggers the browser print dialogue for clean PDF export directly from the page

### Design
- **Two-font pairing** — Cormorant Garamond (editorial serif) for headings, DM Mono (monospace) for labels and metadata, Outfit for body text
- **Gold accent system** — consistent `#c4a46c` (dark mode) / `#8b693c` (light mode) accent applied across borders, tags, labels, and interactive states
- **Grain texture overlay** — subtle SVG noise pattern rendered as a fixed `body::before` element for depth without GPU cost
- **Pulsing availability indicator** — animated dot on the availability strip using a pure CSS `@keyframes` pulse
- **Hover states** — every interactive element (cards, links, pills) has a deliberate hover transition

### Performance
- **Non-blocking font loading** — Google Fonts loaded with `media="print"` swap technique to prevent render-blocking
- **No layout thrash** — all animations use `transform` and `opacity` only, keeping the browser on the compositor thread
- **IntersectionObserver** — scroll reveals are powered by the native browser API, not scroll event listeners
- **Single HTTP request per asset** — three clean files, no build step, no bundler overhead

---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Structure  | HTML5 (semantic, accessible)      |
| Styling    | CSS3 (custom properties, grid, flexbox) |
| Behaviour  | Vanilla JavaScript (ES6+)         |
| Fonts      | Google Fonts (non-blocking)       |
| Deployment | GitHub Pages                      |

**Zero external dependencies.** No React. No Tailwind. No jQuery.

---

## File Structure

```
cv/
├── index.html      # Semantic HTML structure — no inline styles or scripts
├── style.css       # All styles, organised into 19 commented sections
└── script.js       # Theme toggle + hamburger menu + scroll reveal (IIFE modules)
```

Each file has a single responsibility. CSS and JavaScript are fully external — no inline styles, no `<style>` tags, no `<script>` blocks in the HTML. This separation of concerns makes the codebase maintainable, readable, and scalable.

---

## CSS Architecture

`style.css` is organised into clearly labelled sections:

```
1.  Tokens / CSS Variables   — all colours, transitions, radii defined in :root
2.  Reset                    — box-sizing, margin, padding, overflow
3.  Layout                   — page max-width and padding
4.  Topbar & Nav             — sticky navigation bar
5.  Theme Toggle             — pill toggle with sliding dot
6.  Hamburger                — animated three-line → X transition
7.  Mobile Menu Drawer       — full-screen overlay for mobile nav
8.  Hero                     — photo, name, headline, contact grid
9.  Summary                  — editorial serif summary block
10. Section Base             — shared section styles + scroll reveal state
11. Work Experience          — card with bullet list and tags
12. Projects Grid            — two-column mosaic card grid
13. Skills Grid              — three-column grouped skill list
14. Education Grid           — two-column education cards
15. Languages                — four-column language badges
16. Availability             — strip with pulsing dot indicator
17. Links & Download         — pill links + gold download button
18. Animations               — @keyframes fadeUp
19. Responsive — Tablet      — 768px breakpoint
20. Responsive — Mobile      — 480px breakpoint
21. Print Styles             — clean PDF output via browser print
```

All colour values are defined as CSS custom properties on `:root` and overridden per theme — making the dark/light mode a clean token swap with no JavaScript style manipulation.

---

## JavaScript Architecture

`script.js` uses the **IIFE (Immediately Invoked Function Expression)** module pattern throughout. Each feature is self-contained with its own scope — no global variable pollution.

```js
// Three independent modules, zero shared globals

(function () { /* Theme Toggle   */ })();
(function () { /* Hamburger Menu */ })();
(function () { /* Scroll Reveal  */ })();
```

### Theme Toggle
Reads from `localStorage` on page load to apply the saved theme before the first paint, preventing a flash of the wrong theme. Writes back on every toggle.

### Hamburger Menu
- Locks `document.body` scroll when the menu is open (`overflow: hidden`)
- Closes on link tap, closes on `Escape` keypress
- Updates `aria-expanded` and `aria-hidden` for screen reader accessibility

### Scroll Reveal
Uses a single `IntersectionObserver` instance watching all `.section` elements. Once a section intersects the viewport at 8% threshold, the `visible` class is added and the element is unobserved — no wasted observation cycles.

---

## Responsive Design

Built **mobile-first**. Base styles target small screens; larger layouts are added through `min-width` breakpoints.

| Breakpoint | Behaviour |
|---|---|
| Default (mobile) | Single column, hamburger menu, stacked hero |
| 480px+ | Two-column language grid, contact row wraps |
| 768px+ | Full desktop nav visible, three-column skills grid, two-column hero |

Common mobile pitfalls avoided:
- No `white-space: nowrap` on overflowing containers
- No fixed pixel widths on fluid elements
- Topbar uses `flex-wrap` with the hamburger replacing nav links below 768px
- All touch targets are minimum 44px

---

## Dark / Light Mode

Theme switching is handled entirely through a `data-theme` attribute on the `<html>` element and CSS custom properties — no JavaScript style injection.

```css
[data-theme="dark"]  { --bg: #0b0b0e; --accent: #c4a46c; ... }
[data-theme="light"] { --bg: #f7f4ef; --accent: #8b693c; ... }
```

All transitions are driven by `transition: background var(--transition), color var(--transition)` — smooth and GPU-friendly.

---

## Design Decisions

**Why no framework?**
Vanilla HTML/CSS/JS demonstrates deeper understanding of the platform than framework code does. It also produces smaller, faster, more portable output — important for a CV site that needs to load instantly on any connection.

**Why single-file fonts via Google Fonts?**
The `media="print"` loading technique makes the font request non-blocking, so the page renders immediately and fonts swap in without layout shift.

**Why IIFE pattern in JavaScript?**
IIFEs are a deliberate choice over ES modules for a GitHub Pages deployment — no bundler required, no `type="module"` CORS issues, works in all browsers without configuration.

**Why two-column project grid on desktop?**
Five projects in a single column creates excessive scrolling. Two columns creates a visual mosaic that draws the eye across the page and groups projects naturally.

---

## Getting Started

Clone and open locally — no build step, no install:

```bash
git clone https://github.com/Feyisara-o/cv.git
cd cv
open index.html
```

To deploy to GitHub Pages, push to your repository and enable Pages from the repository settings. All asset paths are relative — no path configuration needed.

---

## Author

**Okunola Mofeyisara Abiola** — Frontend Developer & UI Designer

- Portfolio: [feyisaracodes.com](https://feyisara-o.github.io/feyisara-porfolio/)
- GitHub: [@Feyisara-o](https://github.com/Feyisara-O)
- LinkedIn: [linkedin.com/in/yourhandle](https://www.linkedin.com/in/mofeyisara-okunola-73121b277?utm_source=share_via&utm_content=profile&utm_medium=member_android
)

---

*Built with vanilla HTML, CSS, and JavaScript. No frameworks. No shortcuts.*
