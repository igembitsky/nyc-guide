# NYC Walking Guide — Design Spec

## Overview

A mobile-first, static travel guide website showcasing 5 curated walking routes through NYC, plus a bonus section. Built as a personal pocket guide to share with friends. Hosted on GitHub Pages.

The design is bold, dark, editorial — inspired by Condé Nast Traveler and premium city guide apps — with an MTA subway-inspired accent color system and typography rooted in the Helvetica tradition.

## Tech Stack

- **Astro** — Static site generator. Ships zero JS by default, hydrates interactive islands (maps, navigation). Outputs pure static HTML for GitHub Pages.
- **Leaflet.js** — Free, open-source interactive maps. No API key required. Used as Astro client islands.
- **Google Fonts** — Space Grotesk (display), Inter (body), JetBrains Mono (labels/meta).
- **GitHub Pages** — Hosting via `astro build` output to `docs/` or GitHub Actions deploy.

No framework runtime shipped to the client. CSS custom properties for theming. Vanilla JS for navigation state.

## Source Material

5 Zight screen recording videos (transcribed locally via whisper-cpp) + 6 Google Maps route links + explicit place mentions. All transcripts stored in `/tmp/nyc-videos/*_transcript.txt`.

### Video Inventory

| # | Video ID | Topic | Duration | Transcript File |
|---|----------|-------|----------|-----------------|
| 1 | xQu5zZJw | Brooklyn Bridge area | ~9.5 min | brooklyn_bridge_transcript.txt |
| 2 | NQuXxbnX | World Trade Center | ~8 min | wtc_transcript.txt |
| 3 | L1uwW4wk | Financial District | ~4 min | financial_district_transcript.txt |
| 4 | 12u8058b | Village, SoHo, East Village, High Line, Midtown, Central Park | ~21 min | video4_transcript.txt |
| 5 | E0uvo81j | Museums, Roosevelt Island, Brighton Beach | ~5 min | video5_transcript.txt |

### Google Maps Routes (with extracted stops)

**Route 1 — Brooklyn Bridge:**
La Bagel Delight (40.7024, -73.9887) → DUMBO Manhattan Bridge View (40.7033, -73.9896) → Pebble Beach (40.7044, -73.9906) → Jane's Carousel (40.7045, -73.9924) → Brooklyn Bridge Lookout (40.7035, -73.9953) → The Granite Prospect (40.7020, -73.9974) → NYC Elevated View Point / Squibb Park Bridge (40.7009, -73.9960) → Brooklyn Heights Promenade (40.6964, -73.9977)

**Route 2 — WTC:**
Ground Zero (40.7116, -74.0132) → World Trade Center / Oculus (40.7113, -74.0111) → Brookfield Place / Winter Garden (40.7131, -74.0154) → Belvedere Plaza (40.7139, -74.0172) → Tom Otterness Sculptures (40.7181, -74.0154)

**Route 3 — Village / SoHo:**
Washington Square Park (40.7309, -73.9973) → Caffe Reggio (40.7303, -74.0004) → Mamoun's Falafel (40.7302, -74.0004) → Apple SoHo (40.7251, -73.9990) → Mulberry Street Library (40.7241, -73.9956) → Prince Street Pizza (40.7231, -73.9945) → Blue Ribbon Sushi Izakaya (40.7221, -73.9884)

**Individual places:**
- KENKA (40.7291, -73.9885) — Japanese restaurant, East Village
- Miznon (40.7425, -74.0064) — Chelsea Market area
- Vessel (40.7538, -74.0022) — Hudson Yards
- Katz's Delicatessen — explicitly mentioned, iconic deli on Houston St

## Design System

### Typography

| Role | Font | Weight | Tracking | Usage |
|------|------|--------|----------|-------|
| Display | Space Grotesk | 800 | -2px to -3px | Hero titles, route names |
| Heading | Space Grotesk | 700 | -1px | Section titles, stop names |
| Body | Inter | 400 | normal | Descriptions, commentary |
| Body Emphasis | Inter | 600 | normal | Inline bold, key phrases |
| Label | Space Grotesk | 700 | 2-3px uppercase | Section labels, meta |
| Mono | JetBrains Mono | 400-500 | 1-2px uppercase | Route numbers, walk times, tags |

**Type Scale:** 11 / 13 / 16 / 18 / 24 / 32 / 44 / 56 / 80px
**Body line-height:** 1.6. Display line-height: 1.0–1.1.

### Color Palette

**Surfaces:**

| Token | Hex | Usage |
|-------|-----|-------|
| --black | #0A0A0A | Page background |
| --surface-1 | #111111 | Card backgrounds |
| --surface-2 | #1A1A1A | Nested cards, inputs |
| --surface-3 | #222222 | Hover states |
| --border | #2A2A2A | Default borders |
| --border-light | #333333 | Lighter separators |

**Text:**

| Token | Hex | Usage |
|-------|-----|-------|
| --text-primary | #F5F5F5 | Headings, key content |
| --text-secondary | #999999 | Body text, descriptions |
| --text-muted | #666666 | Meta, timestamps |

**MTA Subway Accents (one per route):**

| Color | Hex | MTA Lines | Route Assignment |
|-------|-----|-----------|-----------------|
| Orange | #FF6319 | B/D/F/M | Walk 01 — Brooklyn Bridge (also primary CTA color) |
| Blue | #0039A6 | A/C/E | Walk 02 — World Trade Center |
| Green | #00933C | 4/5/6 | Walk 03 — Financial District |
| Red | #EE352E | 1/2/3 | Walk 04 — Village & SoHo |
| Purple | #B933AD | 7 | Walk 05 — High Line to Midtown |
| Gray | #808183 | L | Bonus — Museums & Day Trips |

Each route uses its accent color for: route icon background, stop number circles, progress dots, tags, and tip callout borders.

**Primary/functional:**
- Primary (CTAs, links): --accent-orange #FF6319
- Primary hover: #FF7A3D
- Primary dim (tag backgrounds): rgba(255, 99, 25, 0.15)

### Spacing

8px grid: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96px

### Border Radius

- sm: 4px (small tags)
- md: 8px (buttons, small cards)
- lg: 12px (cards, map containers)
- xl: 16px (large containers)
- full: 9999px (pills, badges)

### Transitions

- Duration fast: 150ms (hover states, micro-interactions)
- Duration normal: 250ms (page transitions, expand/collapse)
- Duration slow: 400ms (map animations)
- Easing: cubic-bezier(0.16, 1, 0.3, 1) — ease-out for entering

## Pages & Components

### Page 1: Home

**URL:** `/`

**Layout:**
- Hero section: "Walk the City." headline, subtitle ("5 curated walking routes through the real New York..."), subtle radial gradient glow
- Route list: 5 route cards + 1 bonus card
- Each route card: MTA-colored number badge (01–05), route name, stop count / duration / start→end summary, chevron

**Behavior:**
- Tap route card → navigate to route overview page
- No JavaScript required on this page

### Page 2: Route Overview

**URL:** `/routes/brooklyn-bridge/` (one per route)

**Layout (top to bottom):**
1. Back link ("← All Routes")
2. Route number label (e.g., "WALK 01 / 05")
3. Route title — big bold display type
4. Tagline — one-liner summary in user's voice
5. Stats bar — stops count, duration estimate, distance, budget indicator
6. Tags — FOOD, VIEWS, ICONIC, MORNING etc.
7. **Interactive Leaflet map** — all stops plotted as numbered markers, connected by a route polyline. Dark map tiles (CartoDB Dark Matter or similar free dark tiles). Map fits to show all stops.
8. **Stops timeline** — vertical timeline with numbered circles, stop name, short description (1-2 sentences), "Open in Maps" button, "Details ›" button, walking time to next stop

**Map behavior (Astro client island):**
- Leaflet with dark tile layer (free CartoDB tiles, no API key)
- Custom markers styled as orange/colored circles with stop numbers
- Polyline connecting stops in order
- Tap marker → scroll to corresponding stop in timeline below
- Map is scrollable/zoomable

**Stop timeline behavior:**
- "Open in Maps" → opens Google Maps directions link (`https://www.google.com/maps/dir/?api=1&destination={lat},{lng}`)
- "Details ›" → navigates to stop detail page

### Page 3: Stop Detail (Point-by-Point Mode)

**URL:** `/routes/brooklyn-bridge/stops/3-pebble-beach/` (route + stops + index-slug)

**Layout (top to bottom):**
1. **Sticky progress bar** — dots for each stop, filled/current/empty states, route name. Stays at top while scrolling.
2. Stop number label (e.g., "STOP 03")
3. Stop name — large display type
4. Tags — category tags for this stop
5. **Commentary** — 2-3 paragraphs written in Igor's voice/style. Direct, opinionated, fun, practical. Generated from transcripts. Uses bold for key phrases.
6. **"Igor's Tip" callout** — orange left-border card with a practical tip (timing, what to order, what to avoid)
7. **Get Directions section** — two large tap targets: "Google Maps" and "Apple Maps" buttons
   - Google Maps: `https://www.google.com/maps/dir/?api=1&destination={lat},{lng}&travelmode=walking`
   - Apple Maps: `maps://maps.apple.com/?daddr={lat},{lng}&dirflg=w`
8. Next stop preview line — "Next stop: Jane's Carousel · 5 min walk"
9. **Sticky bottom navigation** — Prev button (ghost style, stop name) + Next button (primary orange, stop name)

**Progress bar behavior:**
- Shows all stops as dots connected by lines
- Past stops: dimmed orange
- Current stop: full orange, slightly larger
- Future stops: gray
- Tapping a dot navigates to that stop

**Navigation behavior:**
- Prev/Next buttons navigate between stops within the same route
- At first stop: no Prev button, just Next
- At last stop: Next becomes "Back to Overview" or "Finish Walk"
- Swipe left/right also navigates (touch gesture)

### Bonus Page: Museums & Day Trips

**URL:** `/bonus/`

**Layout:** Similar to route overview but without a sequential timeline. Cards for each recommendation grouped by category:
- Museums: Met Cloisters, MoMA, Natural History Museum
- Unique Experiences: Roosevelt Island Cable Car, Staten Island Ferry
- Neighborhoods: Brighton Beach, Coney Island, Williamsburg
- Midtown essentials: Bryant Park / NY Public Library, Grand Central, Top of the Rock

Each card has commentary + maps link.

## Content Generation Guidelines

All stop commentary must be written in Igor's voice. Key characteristics from the transcripts:

- **Direct and conversational** — "Dude, this place is sick", "trust me on this", "damn it's good"
- **Practical with strong opinions** — tells you what to order, when to go, what to skip
- **Personal stories and context** — historical tidbits, personal connections, why places matter
- **Honest about downsides** — mentions crowds, long lines, expensive prices
- **Enthusiastic but not fake** — genuine excitement, not marketing copy

For each stop, generate:
1. **Short description** (1-2 sentences for timeline view)
2. **Full commentary** (2-3 paragraphs for detail view)
3. **Igor's Tip** (1-2 sentences, practical advice)

The tone should feel like a friend texting you recommendations, not a guidebook.

## Walking Time Estimates

Estimate walking time between consecutive stops using straight-line distance × 1.4 (Manhattan grid factor) at 3 mph walking pace, rounded to nearest minute. Add 1-2 minutes buffer for crossings.

These are rough estimates displayed as "~X MIN WALK" between stops in the timeline view.

## Route Duration Estimates

Total route duration = walking time + suggested dwell time per stop:
- Food stops: 20-30 min
- Photo/view stops: 10-15 min
- Museum/attraction stops: 45-90 min
- Walk-through stops: 5-10 min

Displayed as approximate ranges (e.g., "~3 hrs").

## Responsive Behavior

**Mobile-first (375px base):**
- Single column layout throughout
- Full-width cards, maps, and buttons
- Touch targets minimum 44×44px
- Bottom navigation sticky with safe area padding
- Maps take ~50% of viewport height

**Tablet (768px+):**
- Route overview: map and timeline side-by-side (60/40 split)
- Home: route cards in 2-column grid
- Wider content max-width (680px for text)

**Desktop (1024px+):**
- Max content width: 1200px, centered
- Home: route cards in 2-column grid with hero taking full width
- Route overview: map pinned left, timeline scrolls right
- Stop detail: centered column (max 680px) for readability

## Accessibility

- Contrast: all text meets WCAG AA (4.5:1 for body, 3:1 for large text) — verified against dark surfaces
- Focus rings: visible 2px outlines on all interactive elements
- Keyboard navigation: tab order follows visual order
- Semantic HTML: proper heading hierarchy (h1 per page, h2 sections, h3 stops)
- Alt text: descriptive labels on map markers and icons
- Reduced motion: respect `prefers-reduced-motion` for transitions
- Skip links: "Skip to content" on each page

## Performance

- Zero JS on home page (pure static HTML/CSS)
- Leaflet maps loaded as Astro client:visible islands (lazy hydrated when scrolled into view)
- Font loading: `font-display: swap` with system font fallbacks
- All pages pre-rendered at build time
- Dark map tiles are lightweight (~10-20KB per tile)
- Target: <1s FCP on 4G mobile

## File Structure

```
nyc-guide/
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro          # Shared HTML shell, meta, fonts, CSS vars
│   ├── components/
│   │   ├── RouteCard.astro           # Home page route list item
│   │   ├── RouteMap.astro            # Leaflet map island (client:visible)
│   │   ├── StopTimeline.astro        # Vertical timeline of stops
│   │   ├── StopDetail.astro          # Full stop detail content
│   │   ├── ProgressBar.astro         # Sticky stop progress indicator
│   │   ├── MapsButton.astro          # Google/Apple Maps deep link buttons
│   │   ├── NavigationBar.astro       # Prev/Next sticky bottom nav
│   │   └── TipCallout.astro          # "Igor's Tip" styled callout
│   ├── pages/
│   │   ├── index.astro               # Home
│   │   ├── routes/
│   │   │   ├── brooklyn-bridge.astro
│   │   │   ├── world-trade-center.astro
│   │   │   ├── financial-district.astro
│   │   │   ├── village-soho.astro
│   │   │   └── highline-midtown.astro
│   │   │   │                          # Each route file renders overview + generates stop subpages
│   │   └── bonus.astro               # Museums & day trips
│   ├── data/
│   │   └── routes.json               # All route/stop data (coords, descriptions, tips)
│   └── styles/
│       └── global.css                # Design system CSS custom properties + base styles
├── public/
│   └── favicon.svg
├── astro.config.mjs
├── package.json
└── docs/                             # Build output for GitHub Pages
```

## Data Model (routes.json)

```json
{
  "routes": [
    {
      "id": "brooklyn-bridge",
      "number": 1,
      "title": "Brooklyn Bridge",
      "tagline": "Start with a bagel. End with a view.",
      "color": "#FF6319",
      "colorName": "orange",
      "duration": "~3 hrs",
      "distance": "4.2 mi",
      "budget": "$$",
      "tags": ["food", "views", "iconic", "morning"],
      "stops": [
        {
          "id": "la-bagel-delight",
          "number": 1,
          "name": "La Bagel Delight",
          "lat": 40.7024,
          "lng": -73.9887,
          "shortDesc": "Bacon egg and cheese on a toasted, buttered everything bagel. This is your fuel.",
          "commentary": "...(2-3 paragraphs in Igor's voice)...",
          "tip": "Ask them to toast AND butter the bagel. Don't skip this step.",
          "tags": ["food"],
          "walkTimeToNext": 2
        }
      ]
    }
  ],
  "bonus": {
    "museums": [...],
    "experiences": [...],
    "neighborhoods": [...]
  }
}
```

## Deployment

1. `npm run build` → outputs static site
2. GitHub Actions workflow: on push to main, build and deploy to GitHub Pages
3. Custom domain optional (can configure later via CNAME)

## Out of Scope

- User accounts / personalization
- Backend / API
- Offline PWA (nice-to-have later, not v1)
- Photo galleries (no photos in source material)
- Comments / reviews
- Multi-language support
