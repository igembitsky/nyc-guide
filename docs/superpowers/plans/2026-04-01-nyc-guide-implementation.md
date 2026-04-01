# NYC Walking Guide Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-first, dark-themed NYC walking guide website with 5 curated routes, interactive maps, point-by-point navigation, and "open in maps" deep links — hosted on GitHub Pages.

**Architecture:** Astro static site with Leaflet map islands. All route/stop data lives in a single `routes.json`. Pages are pre-rendered at build time. Zero JS on home page; Leaflet hydrated on route pages via `client:visible`. Design system as CSS custom properties in a global stylesheet.

**Tech Stack:** Astro 4.x, Leaflet.js, Google Fonts (Space Grotesk, Inter, JetBrains Mono), GitHub Pages, CartoDB Dark Matter tiles.

**Design Spec:** `docs/superpowers/specs/2026-04-01-nyc-guide-design.md`

**Transcripts:** `transcripts/*.txt` (source material for generating commentary)

---

## File Structure

```
nyc-guide/
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro            # HTML shell, meta, fonts, global CSS import
│   ├── components/
│   │   ├── RouteCard.astro             # Home page route list item
│   │   ├── RouteMap.astro              # Leaflet map (client:visible island)
│   │   ├── StopTimeline.astro          # Vertical stop timeline for route overview
│   │   ├── StopTimelineItem.astro      # Single stop in the timeline
│   │   ├── ProgressBar.astro           # Sticky dot progress indicator
│   │   ├── MapsButtons.astro           # Google Maps + Apple Maps deep link buttons
│   │   ├── TipCallout.astro            # "Igor's Tip" styled callout box
│   │   └── StopNav.astro              # Prev/Next sticky bottom navigation
│   ├── pages/
│   │   ├── index.astro                 # Home page
│   │   ├── routes/
│   │   │   └── [route]/
│   │   │       ├── index.astro         # Route overview page
│   │   │       └── stops/
│   │   │           └── [stop].astro    # Stop detail page
│   │   └── bonus.astro                 # Museums & day trips
│   ├── data/
│   │   └── routes.ts                   # All route/stop data with types
│   └── styles/
│       └── global.css                  # Design system tokens + base styles
├── public/
│   └── favicon.svg                     # NYC-themed favicon
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `src/styles/global.css`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/pages/index.astro` (placeholder)
- Create: `public/favicon.svg`

- [ ] **Step 1: Initialize Astro project**

```bash
cd /Users/igor/projects/fun/nyc-guide
npm create astro@latest . -- --template minimal --no-install --typescript strict
```

If prompted about overwriting, allow it (the project dir only has docs).

- [ ] **Step 2: Install dependencies**

```bash
npm install
npm install leaflet
npm install -D @types/leaflet
```

- [ ] **Step 3: Configure Astro for GitHub Pages**

Write `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/nyc-guide',
  output: 'static',
  build: {
    assets: '_assets',
  },
});
```

- [ ] **Step 4: Write the design system CSS**

Write `src/styles/global.css` with the full design system from the spec:

```css
/* === NYC Guide Design System === */
/* MTA-inspired dark editorial theme */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  /* Core Palette */
  --black: #0A0A0A;
  --surface-1: #111111;
  --surface-2: #1A1A1A;
  --surface-3: #222222;
  --border: #2A2A2A;
  --border-light: #333333;
  --text-primary: #F5F5F5;
  --text-secondary: #999999;
  --text-muted: #666666;

  /* MTA Subway Accents */
  --accent-orange: #FF6319;
  --accent-blue: #0039A6;
  --accent-green: #00933C;
  --accent-red: #EE352E;
  --accent-yellow: #FCCC0A;
  --accent-purple: #B933AD;
  --accent-gray: #808183;

  /* Functional */
  --primary: var(--accent-orange);
  --primary-hover: #FF7A3D;
  --primary-dim: rgba(255, 99, 25, 0.15);

  /* Typography */
  --font-display: 'Space Grotesk', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  --font-body: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  --font-mono: 'JetBrains Mono', 'Courier New', monospace;

  /* Type Scale */
  --text-xs: 0.6875rem;
  --text-sm: 0.8125rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.5rem;
  --text-2xl: 2rem;
  --text-3xl: 2.75rem;
  --text-4xl: 3.5rem;

  /* Spacing (8px grid) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* Transitions */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 150ms;
  --duration-normal: 250ms;
}

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--black);
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100dvh;
}

a {
  color: inherit;
  text-decoration: none;
}

a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

img {
  max-width: 100%;
  display: block;
}

/* Utility: route accent color override */
[data-accent="orange"]  { --route-accent: var(--accent-orange); --route-dim: rgba(255, 99, 25, 0.15); }
[data-accent="blue"]    { --route-accent: var(--accent-blue);   --route-dim: rgba(0, 57, 166, 0.15); }
[data-accent="green"]   { --route-accent: var(--accent-green);  --route-dim: rgba(0, 147, 60, 0.15); }
[data-accent="red"]     { --route-accent: var(--accent-red);    --route-dim: rgba(238, 53, 46, 0.15); }
[data-accent="purple"]  { --route-accent: var(--accent-purple); --route-dim: rgba(185, 51, 173, 0.15); }
[data-accent="gray"]    { --route-accent: var(--accent-gray);   --route-dim: rgba(128, 129, 131, 0.15); }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  html { scroll-behavior: auto; }
}
```

- [ ] **Step 5: Write the base layout**

Write `src/layouts/BaseLayout.astro`:

```astro
---
interface Props {
  title: string;
  description?: string;
}

const { title, description = "5 curated walking routes through the real New York, from a local who actually lives here." } = Astro.props;
const base = import.meta.env.BASE_URL;
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content={description}>
  <meta name="theme-color" content="#0A0A0A">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <link rel="icon" type="image/svg+xml" href={`${base}favicon.svg`}>
  <title>{title} | Igor's NYC Guide</title>
</head>
<body>
  <slot />
</body>
</html>

<style>
  @import '../styles/global.css';
</style>
```

- [ ] **Step 6: Create favicon**

Write `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#0A0A0A"/>
  <text x="16" y="23" text-anchor="middle" font-family="Helvetica Neue, sans-serif" font-weight="800" font-size="18" fill="#FF6319">NY</text>
</svg>
```

- [ ] **Step 7: Create placeholder home page**

Write `src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Walk the City">
  <main style="padding: 48px 24px; text-align: center;">
    <h1 style="font-family: var(--font-display); font-size: var(--text-4xl); font-weight: 800; letter-spacing: -2px;">
      Walk the City<span style="color: var(--primary);">.</span>
    </h1>
    <p style="color: var(--text-secondary); margin-top: 16px;">Coming soon</p>
  </main>
</BaseLayout>
```

- [ ] **Step 8: Verify dev server works**

```bash
npm run dev
```

Expected: Server starts, opening `http://localhost:4321/nyc-guide/` shows "Walk the City." on dark background.

- [ ] **Step 9: Commit**

```bash
git init
echo "node_modules/\ndist/\n.astro/\n.DS_Store\n.superpowers/" > .gitignore
git add -A
git commit -m "feat: scaffold Astro project with design system"
```

---

## Task 2: Route Data

**Files:**
- Create: `src/data/routes.ts`

This is the most critical task — all route and stop data with coordinates, commentary in Igor's voice, and tips. Generated from the transcripts.

- [ ] **Step 1: Write the complete routes data file**

Write `src/data/routes.ts` with all 5 routes, all stops, all commentary, all coordinates. This file is the single source of truth for the entire site.

```typescript
export interface Stop {
  id: string;
  number: number;
  name: string;
  lat: number;
  lng: number;
  shortDesc: string;
  commentary: string;
  tip: string;
  tags: string[];
  walkTimeToNext: number | null; // minutes, null for last stop
}

export interface Route {
  id: string;
  number: number;
  title: string;
  tagline: string;
  color: string;
  colorName: string;
  duration: string;
  distance: string;
  budget: string;
  tags: string[];
  stops: Stop[];
}

export interface BonusItem {
  id: string;
  name: string;
  lat: number;
  lng: number;
  category: string;
  commentary: string;
  tip: string;
}

export const routes: Route[] = [
  {
    id: "brooklyn-bridge",
    number: 1,
    title: "Brooklyn Bridge",
    tagline: "Start with a bagel. End with a view. Cross the bridge before the crowds hit.",
    color: "#FF6319",
    colorName: "orange",
    duration: "~3 hrs",
    distance: "4.2 mi",
    budget: "$$",
    tags: ["food", "views", "iconic", "morning"],
    stops: [
      {
        id: "la-bagel-delight",
        number: 1,
        name: "La Bagel Delight",
        lat: 40.7024,
        lng: -73.9887,
        shortDesc: "Bacon egg and cheese on a toasted, buttered everything bagel. This is your fuel for the day.",
        commentary: `This is where your day starts, and you're going to start it right. Walk into La Bagel Delight in DUMBO and order a bacon egg and cheese bagel. Here's the key — ask them to toast it AND butter it. Pick whatever bagel you want, but everything or sesame is the move.\n\nDon't eat it here. I repeat: do not eat this bagel yet. You're going to carry it with you to one of the most beautiful spots in the city. Trust me, the payoff is worth the wait.\n\nThis place is no-frills, fast, and exactly what a bagel shop should be. Get in, order with confidence, get out. You've got places to be.`,
        tip: "Ask them to toast AND butter your bagel. Get bacon egg and cheese. Don't eat it yet — take it with you to Pebble Beach.",
        tags: ["food"],
        walkTimeToNext: 2,
      },
      {
        id: "dumbo-bridge-view",
        number: 2,
        name: "DUMBO Manhattan Bridge View",
        lat: 40.7033,
        lng: -73.9896,
        shortDesc: "That iconic Manhattan Bridge shot between the brick buildings. Get here early — it gets crowded.",
        commentary: `Two minutes from the bagel shop, you're going to hit one of the most photographed spots in all of New York. You'll see the Manhattan Bridge perfectly framed between those old brick warehouse buildings on Washington Street. It's iconic, it's incredible, and yes — you've definitely seen this shot on Instagram a thousand times.\n\nBut seeing it in person hits different. The bridge is massive, the cobblestone street is gorgeous, and if you're here early enough, you might actually get the shot without thirty people in it.\n\nJump in the air, do your poses, get it out of your system. Then keep moving — the best is still ahead.`,
        tip: "Get here before 9am for the best light and fewest tourists. The view faces west, so morning light is behind you — perfect for photos.",
        tags: ["views", "photo-op"],
        walkTimeToNext: 3,
      },
      {
        id: "pebble-beach",
        number: 3,
        name: "Pebble Beach",
        lat: 40.7044,
        lng: -73.9906,
        shortDesc: "Sit on the rocks with your bagel. Manhattan between two bridges. The most beautiful way to start your day.",
        commentary: `This is where you eat that bagel. Don't you dare have touched it before now.\n\nWalk down to Pebble Beach, find a spot on the rocks, and sit there looking at Manhattan framed perfectly between the Brooklyn Bridge and the Manhattan Bridge. The whole skyline is right there across the East River, and you're just sitting on these rocks with the best bagel in Brooklyn.\n\nI'm telling you — this is going to be the most beautiful, intense, almost spiritual experience to start your day. Take your time. No rush. Sit there, eat your bagel, soak it all in. This is the New York moment that makes the whole trip worth it.`,
        tip: "Get here early — before 9am. The light is better, the crowds haven't arrived, and you'll have the beach mostly to yourself.",
        tags: ["views", "food-spot"],
        walkTimeToNext: 5,
      },
      {
        id: "janes-carousel",
        number: 4,
        name: "Jane's Carousel",
        lat: 40.7045,
        lng: -73.9924,
        shortDesc: "Beautiful carousel in a glass pavilion on the waterfront. Explore the old warehouse buildings nearby.",
        commentary: `As you walk along the waterfront from Pebble Beach, you'll come up on Jane's Carousel — this beautiful old carousel sitting inside a glass pavilion right on the water. It's nice, it's photogenic, and if you're into it, ride the thing.\n\nBut the real move here is to explore the area around it. These old warehouse buildings have been turned into all sorts of cool spaces — shops, galleries, creative offices. Try to get into one and climb to the top floor. You'll get some really nice views of the city from up there that most tourists never see.\n\nThis whole area is always changing. There's probably cool stuff here that I don't even know about yet. Just wander and see what you find.`,
        tip: "Check out the old warehouse buildings around the carousel — climb to upper floors for hidden city views.",
        tags: ["landmark", "explore"],
        walkTimeToNext: 8,
      },
      {
        id: "brooklyn-bridge-lookout",
        number: 5,
        name: "Brooklyn Bridge Lookout",
        lat: 40.7035,
        lng: -73.9953,
        shortDesc: "Views from under the bridge. Shake Shack nearby. Flea market and food stands in the alcove.",
        commentary: `Walk along the waterfront path and under the Brooklyn Bridge to this lookout area. Don't take the direct route on the map — walk around the waterfront, it's way nicer.\n\nUnder the bridge, there's this cool alcove that's been turned into a space with food stands and vendors. Depending on what day you're here, there might be a flea market. It's always different, always worth checking out.\n\nIf you're getting hungry again (you just had a bagel, but I'm not judging), Shake Shack is right here. Born in New York, incredible burgers. It's a really good option. But honestly, the area itself is just bumping — lots of cool food options, lots of energy. Just wander around and see what catches your eye.`,
        tip: "Walk the waterfront path, not the direct street route. If hungry, Shake Shack is right here — get the ShackBurger.",
        tags: ["views", "food"],
        walkTimeToNext: 5,
      },
      {
        id: "granite-prospect",
        number: 6,
        name: "The Granite Prospect",
        lat: 40.7020,
        lng: -73.9974,
        shortDesc: "Walk the harbor area and connect to the new elevated park via Squibb Park Bridge.",
        commentary: `Keep walking along to the Granite Prospect and the harbor area. It's a nice spot to take in the views and catch your breath before the next section.\n\nWhat's really cool here is that they recently built this awesome little bridge — the Squibb Park Bridge — that connects you up to the elevated walkway. It used to be kind of a pain in the ass to get up to the promenade from here, but now there's this beautiful modern walkway that takes you right up.\n\nThe whole area is a showcase of what New York does best — taking old, neglected infrastructure and turning it into something beautiful. You'll see what I mean when you get up there.`,
        tip: "Look for the Squibb Park Bridge — it's the new wooden walkway that connects you up to the promenade. Way better than the old route.",
        tags: ["views", "walking"],
        walkTimeToNext: 5,
      },
      {
        id: "elevated-viewpoint",
        number: 7,
        name: "Squibb Park Bridge & Elevated Viewpoint",
        lat: 40.7009,
        lng: -73.9960,
        shortDesc: "New elevated walkway with stunning views. Connects to the Brooklyn Heights Promenade.",
        commentary: `Take the Squibb Park Bridge up to the elevated viewpoint. This is a totally new, beautiful space — a big wooden walkway that takes you above the highway and gives you these incredible views of the harbor and Manhattan.\n\nI love what they've done with this area. It's modern, it's clean, it's the kind of public space that makes you proud of New York. You can see the whole lower Manhattan skyline from up here, and it's a totally different perspective than what you had down at the waterfront.\n\nFrom here, you're going to connect onto the Brooklyn Heights Promenade. Just follow the path — you can't miss it.`,
        tip: "Stop at the top of the bridge for photos — the Manhattan skyline from up here is a completely different angle than the waterfront views.",
        tags: ["views"],
        walkTimeToNext: 5,
      },
      {
        id: "brooklyn-heights-promenade",
        number: 8,
        name: "Brooklyn Heights Promenade",
        lat: 40.6964,
        lng: -73.9977,
        shortDesc: "The famous promenade with million-dollar views. Walk past some of NYC's most expensive real estate.",
        commentary: `The Brooklyn Heights Promenade. This is the crown jewel of this walk. A long, beautiful walkway with benches, incredible views of lower Manhattan, and some of the most expensive real estate in all of New York right behind you.\n\nAs you walk, look at the houses on the other side. These are massive, gorgeous brownstones and townhouses owned by old money, new money, barons and tycoons. You'll see why they paid what they paid — the views from those windows are absolutely insane.\n\nThe whole neighborhood of Brooklyn Heights is worth exploring if you have time. It's a beautiful, established neighborhood — very pretty, very well-kept. Just a lovely area to wander around.\n\nWhen you're done here, head back toward Front Street to find the staircase up onto the Brooklyn Bridge. Walk across the bridge — the earlier the better, because it gets crowded later in the day. This is roughly an hour walk straight across, but with all your stops, you've probably spent 2-3 hours by now. Enjoy the crossing — you've earned it.`,
        tip: "After the promenade, head to Front Street to find the staircase onto the Brooklyn Bridge. Cross it — the pedestrian walkway is above the cars. Go early, it gets packed.",
        tags: ["views", "iconic"],
        walkTimeToNext: null,
      },
    ],
  },
  {
    id: "world-trade-center",
    number: 2,
    title: "World Trade Center",
    tagline: "From the Oculus to the Esplanade. A walk through remembrance and rebirth.",
    color: "#0039A6",
    colorName: "blue",
    duration: "~2.5 hrs",
    distance: "2.1 mi",
    budget: "$$$",
    tags: ["history", "architecture", "walking", "views"],
    stops: [
      {
        id: "the-oculus",
        number: 1,
        name: "The Oculus",
        lat: 40.7113,
        lng: -74.0111,
        shortDesc: "The stunning white transportation hub at the World Trade Center. Incredible architecture inside and out.",
        commentary: `Start your day at the Oculus. This is the transportation hub that was built after all the infrastructure around the World Trade Center was destroyed on September 11th. And holy shit, did they build something incredible.\n\nIt was designed by Santiago Calatrava — this massive, white, wing-like structure that looks like nothing else in the city. When you walk inside, it's awe-inspiring. Huge open space, white marble, soaring ceiling. It's a transportation hub that feels like a cathedral.\n\nThere's a food court in here too, so it might be a good place to grab breakfast before you start walking. Get here via the Cortlandt Street stop — multiple subway lines will get you here. Just look up when you arrive. You can't miss this thing.`,
        tip: "Get here via the E train to World Trade Center or the 1 to Cortlandt St. The building is even more impressive from inside than outside.",
        tags: ["architecture", "landmark"],
        walkTimeToNext: 5,
      },
      {
        id: "ground-zero-memorial",
        number: 2,
        name: "Ground Zero Memorial & Museum",
        lat: 40.7116,
        lng: -74.0132,
        shortDesc: "Two massive reflecting pools where the towers stood. Powerful, beautiful memorial park.",
        commentary: `Walk from the Oculus over to the 9/11 Memorial. This is where the Twin Towers used to stand, and now there are these two enormous reflecting pools — huge square holes in the ground with water pouring down into them. The names of everyone who died are inscribed around the edges.\n\nIt's a heavy place. Beautiful, incredibly well done, and it really makes you think. You'll also get a great view of One World Trade Center from here — the new tower rising right next to the memorial. The contrast between the pools and the tower is powerful.\n\nI really recommend going into the underground museum. Get your tickets early — it takes you through the actual foundations of the towers, and they did an incredible job bringing that day to life and showing what it felt like for New Yorkers. It's not a huge museum, but it's one of the best memorials I've ever been to.`,
        tip: "Buy museum tickets online in advance. Get there early to avoid lines. The outdoor memorial park is free — the museum is ticketed.",
        tags: ["history", "museum"],
        walkTimeToNext: 5,
      },
      {
        id: "brookfield-place",
        number: 3,
        name: "Brookfield Place & Winter Garden",
        lat: 40.7131,
        lng: -74.0154,
        shortDesc: "Glass-domed Winter Garden with palm trees and marble floors. Unexpected oasis of calm.",
        commentary: `From the memorial, head west to Brookfield Place. You'll see this glass facade building — walk in and prepare to be surprised. Inside, it's this incredible space called the Winter Garden. Marble floors, palm trees growing inside, a soaring glass atrium. It's basically a high-end mall, but it feels like something else entirely.\n\nThere's a really cool, almost sterile beauty to it — fast and clean and modern. You don't expect it when you walk in from the street. "Whoa, what is this?" is exactly what you'll say.\n\nThere's an Amazon Go store in here if you're into the whole no-cashier futuristic store thing. But mostly, just walk through and take it in. The space itself is the attraction.`,
        tip: "The entrance from the WTC side is through a glass-enclosed walkway — you'll see it. Walk all the way through to the harbor side.",
        tags: ["architecture"],
        walkTimeToNext: 3,
      },
      {
        id: "belvedere-plaza",
        number: 4,
        name: "Belvedere Plaza & Harbor",
        lat: 40.7139,
        lng: -74.0172,
        shortDesc: "Waterfront plaza with views of Jersey City. Start of the beautiful Esplanade walk.",
        commentary: `Come out of Brookfield Place on the harbor side and you're at Belvedere Plaza. This is a beautiful little waterfront area with views across to Jersey City. Take a breath here — the water, the boats, the skyline across the river. It's a nice moment of calm.\n\nFrom here, you're going to walk the Esplanade. The Esplanade is fucking awesome. It's this beautiful waterfront walkway heading north, and it's one of those iconic New York spots you've probably seen in movies without realizing it.\n\nAs you walk, you'll get really nice views of Jersey City to your left and the Financial District behind you. It's just a gorgeous walk, and depending on the time of day, the light on the water can be stunning.`,
        tip: "The Esplanade heading north is the star here. Take your time walking it — the views get better as you go.",
        tags: ["views", "walking"],
        walkTimeToNext: 10,
      },
      {
        id: "tom-otterness-sculptures",
        number: 5,
        name: "Tom Otterness Sculptures",
        lat: 40.7181,
        lng: -74.0154,
        shortDesc: "Whimsical bronze sculptures scattered along the waterfront. Art meets playground.",
        commentary: `As you continue up the Esplanade, keep your eyes open for the Tom Otterness sculptures — these playful bronze figures scattered around the park area. They're whimsical, kind of surreal, and a fun surprise when you stumble on them.\n\nThis whole area along the waterfront is just really pleasant to walk through. There are benches, green spaces, and usually a pretty chill vibe. You can spend quite a lot of time just wandering through here and being inspired by the space.\n\nThis is a good endpoint for the WTC walk. From here, you can head east to explore the Financial District, take the subway somewhere else, or just keep walking north toward Tribeca if you're feeling it.`,
        tip: "Look for the little bronze figures — they're easy to miss if you're not looking. Kids love them, and honestly, so will you.",
        tags: ["art", "walking"],
        walkTimeToNext: null,
      },
    ],
  },
  {
    id: "financial-district",
    number: 3,
    title: "Financial District",
    tagline: "Wall Street, old New York, and the best free ferry ride in the city.",
    color: "#00933C",
    colorName: "green",
    duration: "~2 hrs",
    distance: "1.8 mi",
    budget: "$",
    tags: ["history", "free", "walking", "views"],
    stops: [
      {
        id: "wall-street",
        number: 1,
        name: "Wall Street & NYSE",
        lat: 40.7069,
        lng: -74.0089,
        shortDesc: "The famous street that's actually named after a wall. See the New York Stock Exchange up close.",
        commentary: `Wall Street is called Wall Street because this is where the original wall was — the one the Dutch built to protect their colony of New Amsterdam from the Native Americans. That's right, this whole area is where New York started.\n\nWalk down Wall Street and check out the New York Stock Exchange on Broad Street. The building is impressive — all those columns, all that history. This is where fortunes are made and lost. You can't go inside, but standing in front of it, you can feel the weight of American capitalism.\n\nThe whole area around here is worth wandering. Old churches, narrow streets, historic buildings everywhere. It feels different from the rest of Manhattan — more European, more old-world.`,
        tip: "Wall Street is the street, NYSE is actually on Broad Street. Look up as you walk — the old architecture here is stunning.",
        tags: ["history", "landmark"],
        walkTimeToNext: 5,
      },
      {
        id: "delmonicos",
        number: 2,
        name: "Delmonico's",
        lat: 40.7052,
        lng: -74.0103,
        shortDesc: "America's first fine dining restaurant, open since 1837. Old-school Wall Street power lunch territory.",
        commentary: `Delmonico's. This place has been around since 1837. That's not a typo — eighteen thirty-seven. It's one of the oldest restaurants in America and basically invented the concept of fine dining in this country.\n\nI've never actually eaten here, but I was watching The Gilded Age and they mentioned it, so now I feel like I know the place intimately. It's old-school Wall Street, the kind of place where power lunches have been happening for almost two centuries.\n\nEven if you don't eat here (it's pricey), walk by and appreciate the building. The area around it — the Financial District, or FiDi as people call it — has all these incredible old buildings, churches, and narrow streets. The Fraunces Tavern is nearby too, and the First Huguenot Church in New York.`,
        tip: "If you want to eat here, go for lunch — it's slightly less expensive than dinner and you get the full old-world atmosphere.",
        tags: ["food", "history"],
        walkTimeToNext: 8,
      },
      {
        id: "bowling-green",
        number: 3,
        name: "Bowling Green",
        lat: 40.7041,
        lng: -74.0135,
        shortDesc: "The first public park in New York City. Small, historic, and right next to the Charging Bull.",
        commentary: `Bowling Green is the first public park in New York City. It's small — don't expect Central Park — but it's historic as hell. This little green space has been here since the 1700s, and the area around it is really nice.\n\nThe Charging Bull statue is nearby (you've seen it, everyone's seen it). It's cool to check out in person. The National Museum of the American Indian is right here too if you're into that, though I wouldn't put it at the top of my list.\n\nWhat I would recommend is just taking a moment to appreciate where you are. This is where New York City began. The Dutch were right here, trading beaver pelts and building a city that would become the center of the world. Pretty wild when you think about it.`,
        tip: "The Charging Bull is a 2-minute walk south on Broadway. Get your photo, but don't spend too long — it's always mobbed.",
        tags: ["history", "landmark"],
        walkTimeToNext: 5,
      },
      {
        id: "battery-park",
        number: 4,
        name: "Battery Park & Castle Clinton",
        lat: 40.7033,
        lng: -74.0170,
        shortDesc: "Beautiful waterfront park with dramatic Manhattan views behind you. Castle Clinton National Monument.",
        commentary: `Battery Park is a really nice park to walk around. Right on the southern tip of Manhattan, you've got water on three sides and the city rising up behind you. The views are dramatic — turn around and look at the skyline from here.\n\nCastle Clinton is in the park — it's this old stone fort that's now a national monument. Nice to walk through, very atmospheric. The park itself is well-kept and pleasant, with gardens and memorials scattered throughout.\n\nFrom here you can see the Statue of Liberty across the harbor, and Governors Island — which is a cool pedestrian-only island worth visiting if you have time. Ellis Island is out there too, the old immigrant processing center. Lots of history visible from this one spot.`,
        tip: "Stand at the south end of the park for the best Statue of Liberty views. Free and no ferry needed — just look.",
        tags: ["views", "walking"],
        walkTimeToNext: 5,
      },
      {
        id: "staten-island-ferry",
        number: 5,
        name: "Staten Island Ferry Terminal",
        lat: 40.6433,
        lng: -74.0720,
        shortDesc: "Free ferry ride with incredible harbor views. Pass right by the Statue of Liberty.",
        commentary: `Here's a pro move: the Staten Island Ferry is completely free. It runs 24/7, takes about 25 minutes each way, and passes right by the Statue of Liberty. It's basically a free harbor cruise.\n\nFun history — the Vanderbilts, one of the great American tycoon families, started their fortune by running this ferry. It used to be private. They charged nothing one way and made people pay to go back. Pretty clever.\n\nGrab a sandwich or some food before you board, find a spot on the right side of the boat (that's the Liberty side), and enjoy the ride. Go to Staten Island and take the next boat back. It's a nice, chill experience and the views are incredible. The whole thing takes about an hour round trip.\n\nThis is a great way to end the Financial District walk — just floating on the harbor, taking it all in.`,
        tip: "Sit on the RIGHT side of the boat going out (starboard) for the best Statue of Liberty views. The ferry is completely free — no ticket needed.",
        tags: ["free", "views", "iconic"],
        walkTimeToNext: null,
      },
    ],
  },
  {
    id: "village-soho",
    number: 4,
    title: "Village & SoHo",
    tagline: "The best deli in America, the best falafel, and streets that never sleep.",
    color: "#EE352E",
    colorName: "red",
    duration: "~4 hrs",
    distance: "3.5 mi",
    budget: "$$$",
    tags: ["food", "shopping", "nightlife", "culture"],
    stops: [
      {
        id: "katzs-deli",
        number: 1,
        name: "Katz's Delicatessen",
        lat: 40.7223,
        lng: -73.9874,
        shortDesc: "The most legendary deli in America. Enormous sandwiches. Chaotic ordering. Absolutely unforgettable.",
        commentary: `Katz's Deli. Dude. This is probably the most unforgettable food experience you'll have on this entire trip.\n\nHere's how it works: you walk in, they hand you a ticket. Do NOT lose this ticket — they will charge you a fortune if you do. Then you go up to the counter where these enormous guys are hand-cutting meat right in front of you. Point at what you want. The pastrami is the classic, but the roast beef is incredible too.\n\nIt's going to be chaotic. There will be a line. You're going to feel confused about the ordering process. If you're any kind of introvert, this is exposure therapy. But damn, is it worth it. These sandwiches are HUGE, piled high with the most perfectly seasoned meat you've ever tasted.\n\nYes, it's going to be one of the most expensive sandwiches of your life. Yes, you're going to tip the cutter. And yes, it's fucking amazing. Don't skip this.`,
        tip: "Get the pastrami on rye. Don't lose your ticket. Tip the guy cutting your meat — they'll give you a taste while you wait. Cash is easier here.",
        tags: ["food", "iconic"],
        walkTimeToNext: 15,
      },
      {
        id: "washington-square-park",
        number: 2,
        name: "Washington Square Park",
        lat: 40.7309,
        lng: -73.9973,
        shortDesc: "NYC's most vibrant park. Chess hustlers, street performers, NYU students, and the iconic arch.",
        commentary: `Washington Square Park is probably my favorite park-slash-square in all of New York. It's the heart of Greenwich Village, right in the middle of the NYU campus, and it has this energy that you just can't find anywhere else.\n\nThe iconic Washington Square Arch is here — beautiful, grand, very photogenic. But the real show is the people. Chess players hustling tourists for money, street musicians, skateboarders, NYU students, creative types, homeless philosophers — it's all happening here, all the time.\n\nIt's hip, it's a little grimy, it's very much alive. This is the kind of New York that I love — not polished and perfect, but real and buzzing with creative energy. Walk around, sit on a bench, people-watch. This place is a vibe.`,
        tip: "Best in the afternoon or early evening when it really comes alive. The southwest corner usually has the best chess action.",
        tags: ["culture", "landmark"],
        walkTimeToNext: 3,
      },
      {
        id: "caffe-reggio",
        number: 3,
        name: "Caffe Reggio",
        lat: 40.7303,
        lng: -74.0004,
        shortDesc: "Historic Italian cafe on MacDougal Street. Old-world vibes with original espresso machine from 1927.",
        commentary: `Caffe Reggio on MacDougal Street. This is one of those places where you walk in and feel like you've stepped back in time. It's been here since 1927, and they claim to have served the first cappuccino in America.\n\nThe interior is dark, cozy, packed with old paintings and antiques. It's the kind of cafe that makes you want to sit there for hours pretending you're a beat poet. Grab an espresso or a cappuccino and just soak in the atmosphere.\n\nMacDougal Street itself is a great area — lots of restaurants, bars, and that classic Village energy. But Caffe Reggio is the standout. It's a piece of old New York that somehow hasn't been ruined yet.`,
        tip: "Get a cappuccino and sit inside — the interior is the whole experience. It's small, so go during off-peak hours if you want a seat.",
        tags: ["food", "culture"],
        walkTimeToNext: 1,
      },
      {
        id: "mamouns-falafel",
        number: 4,
        name: "Mamoun's Falafel",
        lat: 40.7302,
        lng: -74.0004,
        shortDesc: "Iconic falafel joint. Fast, cheap, delicious. A Village institution since 1971.",
        commentary: `Literally right next to Caffe Reggio is Mamoun's Falafel. This place is iconic — it's been serving falafel on MacDougal since 1971, and it's still one of the best cheap eats in the city.\n\nGet the falafel sandwich. It's fast, it's cheap, it's delicious, and it's the kind of place that just makes you feel like a New Yorker. No pretense, no nonsense — just damn good falafel.\n\nSo here's your move: coffee at Caffe Reggio, falafel at Mamoun's, then walk around the Village. You're living the dream right now.`,
        tip: "Get the falafel sandwich — it's like $5 and it's perfect. Combo it with a coffee from Caffe Reggio next door.",
        tags: ["food"],
        walkTimeToNext: 5,
      },
      {
        id: "bleecker-soho",
        number: 5,
        name: "Bleecker Street & SoHo",
        lat: 40.7280,
        lng: -73.9990,
        shortDesc: "Walk down Bleecker Street through boutique SoHo. Beautiful cast-iron architecture and high-end shopping.",
        commentary: `Walk down Bleecker Street. This is one of the best streets in New York — it's happening, it's lively, and it connects the Village to SoHo in the most enjoyable way possible.\n\nBleecker is full of restaurants, bars, and shops. You can zigzag through the side streets too — Minetta Lane, Minetta Street — these quiet, narrow little streets that feel like a secret. Walk through them and appreciate how different they feel from the rest of Manhattan.\n\nAs you head into SoHo, the vibe shifts to more upscale. Beautiful cast-iron architecture, cobblestone streets, high-end boutiques. If you're into shopping — designer stuff, posh boutiques — SoHo is gangbusters for that. Even if you're not buying, the architecture alone is worth the walk. The Apple SoHo store is a cool one to pop into.`,
        tip: "Take the side streets — Minetta Lane is a hidden gem. SoHo is best for window shopping unless your wallet is feeling brave.",
        tags: ["shopping", "walking"],
        walkTimeToNext: 8,
      },
      {
        id: "prince-street-pizza",
        number: 6,
        name: "Prince Street Pizza",
        lat: 40.7231,
        lng: -73.9945,
        shortDesc: "Famous for their spicy spring pepperoni square. Get a slice — or three.",
        commentary: `Prince Street Pizza. This place is known for their pepperoni square — the spicy spring, specifically. There's usually a line, and it's worth the wait.\n\nGet a slice. You're in New York. This is what you do. The pizza here is a cut above your average slice joint — thick, crispy, with those little pepperoni cups that get all crispy and pool up with spicy oil. It's glorious.\n\nLook, there's amazing pizza everywhere in this city, and I could argue about the best slice all day. But Prince Street is a damn good answer, and it's right on your route. Don't overthink it — just eat.`,
        tip: "Get the spicy spring pepperoni square. The line moves fast. Cash speeds things up.",
        tags: ["food"],
        walkTimeToNext: 12,
      },
      {
        id: "st-marks-place",
        number: 7,
        name: "St. Mark's Place",
        lat: 40.7286,
        lng: -73.9895,
        shortDesc: "The East Village's legendary strip. Gentrified but still cool. Walk from Tompkins Square Park down to 8th Street.",
        commentary: `St. Mark's Place. In my youth, this was THE most alternative, countercultural strip in all of New York. Every punk, artist, and weirdo in the city would hang out here. It's where the cool kids were.\n\nHas it been gentrified? Obviously. Has it lost some of its edge? Sure. But it's still a great street to walk down, especially if you start from Tompkins Square Park and walk west toward 8th Street. The East Village energy is still here — tattoo shops, ramen joints, vintage stores, dive bars.\n\nThis whole area from Tompkins Square Park down is worth exploring. It's a different flavor of New York than the Village or SoHo — rougher around the edges, more real.`,
        tip: "Better in the evening when the neon comes on and the bars fill up. Start at Tompkins Square Park and walk west.",
        tags: ["culture", "nightlife"],
        walkTimeToNext: 3,
      },
      {
        id: "kenka",
        number: 8,
        name: "KENKA",
        lat: 40.7291,
        lng: -73.9885,
        shortDesc: "Surreal, cheap, chaotic Japanese izakaya in the East Village. An experience more than a restaurant.",
        commentary: `KENKA. Dude, this place is surreal. It's a Japanese izakaya in the East Village that's like walking into some kind of fever dream. The decor is insane, the menu is huge, the prices are shockingly cheap, and the whole experience is just... different.\n\nIt's not fancy. It's not trying to be. It's like a Japanese McDonald's — except that description doesn't do it justice at all. The food is actually pretty great, the atmosphere is wild, and you're going to leave wondering what just happened.\n\nDefinitely worth eating here. It's cheap, it's fun, and it's the kind of place you'll tell stories about. KENKA is pure East Village.`,
        tip: "Come hungry — everything is cheap so you can try a bunch of stuff. The takoyaki and curry rice are solid bets.",
        tags: ["food", "culture"],
        walkTimeToNext: null,
      },
    ],
  },
  {
    id: "highline-midtown",
    number: 5,
    title: "High Line to Midtown",
    tagline: "The elevated park, the best views in the city, and a cocktail at the top of Rockefeller.",
    color: "#B933AD",
    colorName: "purple",
    duration: "~4 hrs",
    distance: "4.8 mi",
    budget: "$$$",
    tags: ["views", "food", "landmarks", "culture"],
    stops: [
      {
        id: "miznon-chelsea-market",
        number: 1,
        name: "Miznon & Chelsea Market",
        lat: 40.7425,
        lng: -74.0064,
        shortDesc: "Israeli street food at Miznon inside Chelsea Market. Incredible cauliflower. High Line entrance nearby.",
        commentary: `Start at Chelsea Market, which is this awesome food hall built inside a former Nabisco factory (yes, where Oreos were invented). It's cool, industrial, and packed with great food options.\n\nBut the place you want is Miznon. This is an Israeli street food spot, and it is very, very good. Their whole roasted cauliflower is legendary — trust me on this one. It's the kind of food that's simple but just perfectly done. Really highly recommended.\n\nChelsea Market itself is worth walking through even after you eat. There are other cool shops and food spots. And conveniently, the High Line entrance is right nearby, which is where you're heading next.`,
        tip: "Get the roasted cauliflower at Miznon — it's their signature dish and it's unreal. Chelsea Market gets crowded on weekends; go weekday if you can.",
        tags: ["food"],
        walkTimeToNext: 5,
      },
      {
        id: "the-high-line",
        number: 2,
        name: "The High Line",
        lat: 40.7420,
        lng: -74.0048,
        shortDesc: "Elevated park built on old railroad tracks. Walk above the city through gardens and art installations.",
        commentary: `The High Line. This is one of the coolest things New York has done in the last 20 years. They took an old, abandoned elevated railroad track and turned it into this beautiful linear park floating above the streets of Manhattan.\n\nGet on around Washington Street — I think that's one of the best entry points. Then just walk it. You're above the city, walking through gardens and landscaped sections, passing art installations, and getting views you can't get from street level.\n\nThe architecture around the High Line is incredible too — some of the most interesting modern buildings in the city have been built along this corridor specifically because of the park. It's a masterclass in urban renewal, and it's just a really pleasant walk.`,
        tip: "Walk south to north for the best experience. The observation deck window that looks down on 10th Avenue traffic is a crowd favorite.",
        tags: ["walking", "views", "art"],
        walkTimeToNext: 15,
      },
      {
        id: "the-vessel",
        number: 3,
        name: "The Vessel & Hudson Yards",
        lat: 40.7538,
        lng: -74.0022,
        shortDesc: "The honeycomb-shaped climbing structure and the Edge observation deck. Ultra-modern Hudson Yards development.",
        commentary: `At the north end of the High Line, you'll hit Hudson Yards — this massive, brand new development that's like a city within a city. It's ultra-modern, very shiny, and kind of surreal.\n\nThe Vessel is the centerpiece — this giant honeycomb-shaped structure made of interconnected staircases. It's cool to look at and even cooler to climb. They closed it for a while after some incidents, but it may be open again with new rules — look it up before you go.\n\nThe Edge is also here — an observation deck that might actually be a better experience than One World Trade Center for views. It's high up, it's dramatic, and the glass floor section will test your nerve. I'd actually recommend this over the WTC observation deck if you're going to pick one.\n\nHudson Yards as a whole is interesting — it's the newest major development in Manhattan. Very cool, very modern, worth walking around even if you don't go up anything.`,
        tip: "Check if the Vessel is open before going — entry rules have changed. The Edge is worth the ticket price for the views and the glass floor.",
        tags: ["landmark", "views"],
        walkTimeToNext: 20,
      },
      {
        id: "bryant-park-library",
        number: 4,
        name: "Bryant Park & NY Public Library",
        lat: 40.7536,
        lng: -73.9832,
        shortDesc: "Beautiful midtown park behind the iconic Beaux-Arts library. Go up to the library's top floor.",
        commentary: `Bryant Park is a really nice midtown oasis — green, well-maintained, surrounded by impressive buildings. It's a good spot to rest your feet and people-watch for a bit.\n\nBut the real gem here is the New York Public Library. The main branch — the one with the two lion statues out front — is a monument. Go inside. Go up to the top floor. The reading rooms are absolutely stunning — soaring painted ceilings, massive windows, rows of wooden desks. It's the kind of space that makes you want to sit down and read a book.\n\nSeriously, don't skip the library. It's free, it's beautiful, and the top floor spaces are some of the most impressive interiors in all of New York. Sit there, put on headphones, scroll Instagram — whatever. Just be in that space for a few minutes.`,
        tip: "Go to the top floor of the library — the Rose Main Reading Room is one of the most beautiful rooms in New York. It's free.",
        tags: ["culture", "landmark"],
        walkTimeToNext: 8,
      },
      {
        id: "grand-central",
        number: 5,
        name: "Grand Central Terminal",
        lat: 40.7527,
        lng: -73.9772,
        shortDesc: "Iconic Beaux-Arts train station. The main concourse ceiling is painted with constellations.",
        commentary: `Grand Central Terminal. Even if you're not taking a train anywhere, this building is worth visiting. The main concourse is massive — that famous ceiling painted with constellations, the grand staircases, the information booth with the four-faced clock. It's one of the most beautiful train stations in the world.\n\nThere are also good food options here. The lower level has a food court that's actually pretty decent. It's a good place to grab something if you're hungry.\n\nJust walk through, look up at that ceiling, and appreciate the craftsmanship. They don't build things like this anymore.`,
        tip: "Stand in the middle of the main concourse and look up. The constellation ceiling is best appreciated from the center of the room.",
        tags: ["landmark", "architecture"],
        walkTimeToNext: 10,
      },
      {
        id: "times-square",
        number: 6,
        name: "Times Square",
        lat: 40.7580,
        lng: -73.9855,
        shortDesc: "Love it or hate it, you have to walk through it. The sensory overload of massive LED screens.",
        commentary: `Times Square. Look, I'm not going to pretend this is some hidden gem. It's the most touristy spot in the entire city. But you're here, so walk through it.\n\nThe screens are insane — massive, bright, overwhelming. It's a sensory overload in the best and worst ways. Walk around, take it in, feel the energy. It's New York at its most excessive and unapologetic.\n\nDon't eat here. Don't shop here. Don't stop at the guy selling "comedy show" tickets. Just walk through, experience the chaos, and keep moving toward Rockefeller Center.`,
        tip: "Walk through, don't stop. Don't eat here — everything is overpriced tourist food. Best at night when all the screens are blazing.",
        tags: ["landmark"],
        walkTimeToNext: 8,
      },
      {
        id: "rockefeller-center",
        number: 7,
        name: "Rockefeller Center & Top of the Rock",
        lat: 40.7587,
        lng: -73.9787,
        shortDesc: "The observation deck with the best views in NYC. Go for cocktails at the bar instead of the tourist deck.",
        commentary: `Rockefeller Center is where you want to end up, and Top of the Rock is the payoff. This is my favorite rooftop spot in all of New York.\n\nHere's the pro move: instead of buying tickets to the observation deck (which is fine, it's great), see if you can just go up to the bar and have a cocktail. You get basically the same views, you're sitting there with a drink in your hand, and it might even be cheaper than the observation deck ticket. Call ahead and ask.\n\nThe views from up here are incredible — you can see the Empire State Building, Central Park stretching north, the whole city laid out below you. St. Patrick's Cathedral is right across the street and looks amazing from above. You can even spot hidden rooftop terraces on nearby buildings.\n\nI've had cocktails up here with friends many times. It's always a great experience.`,
        tip: "Call ahead to ask about just getting drinks at the bar — you get the views without the observation deck ticket price. Sunset is the best time.",
        tags: ["views", "drinks", "iconic"],
        walkTimeToNext: 10,
      },
      {
        id: "fifth-avenue",
        number: 8,
        name: "Fifth Avenue & Apple Store",
        lat: 40.7639,
        lng: -73.9730,
        shortDesc: "Walk the most famous shopping street in the world. The glass cube Apple Store is worth a visit.",
        commentary: `Fifth Avenue. The most famous shopping street in the world. Walk up from Rockefeller Center and just enjoy the energy. High-end stores, impressive buildings, well-dressed people everywhere.\n\nThe Apple Fifth Avenue store is a must-see even if you're not buying anything. It's this iconic glass cube entrance that takes you down into an underground store. I think it's the most beautiful Apple store in the world. The architecture is incredible.\n\nFrom here, Central Park is just a block east. You've been walking for hours at this point, so the park is going to feel amazing.`,
        tip: "The Apple Store is open late and is a cool place to rest, charge your phone, and use free WiFi before heading into Central Park.",
        tags: ["shopping", "landmark"],
        walkTimeToNext: 5,
      },
      {
        id: "central-park",
        number: 9,
        name: "Central Park Highlights",
        lat: 40.7736,
        lng: -73.9712,
        shortDesc: "Bethesda Fountain, The Mall, Belvedere Castle, turtle pond, Shakespeare Garden, and rowboats on the lake.",
        commentary: `Central Park. There's so much to do here that I could make a whole separate guide just for the park. But here are the highlights for the south end, which is where all the best stuff is.\n\nBethesda Fountain and The Mall — this is the iconic Central Park view you've seen in every movie. The tree-lined walkway, the fountain, the lake. It's beautiful. Sit here for a while.\n\nBelvedere Castle — hike up to this little castle overlooking Turtle Pond. You'll see actual turtles. It's a great viewpoint over the park. The Shakespeare Garden is nearby too — it has all the flowers mentioned in Shakespeare's plays, and it's surprisingly peaceful.\n\nAlice in Wonderland statue — cool bronze sculpture, especially if you're into that. The Ramble is a nice wooded area to walk through if you want to feel like you've left the city for a minute.\n\nIf you have the energy, rent a rowboat from the Loeb Boathouse and take it out on the lake. It's a classic Central Park experience and a really nice way to end a long day of walking.`,
        tip: "Rent a rowboat at the Loeb Boathouse — it's the most relaxing thing you can do after a full day of walking. Belvedere Castle is the best viewpoint in the park.",
        tags: ["walking", "landmark", "culture"],
        walkTimeToNext: null,
      },
    ],
  },
];

export const bonusItems: BonusItem[] = [
  {
    id: "met-cloisters",
    name: "The Met Cloisters",
    lat: 40.8649,
    lng: -73.9318,
    category: "museums",
    commentary: `The Met Cloisters. Dude, this place is SICK. It's a medieval art museum way up in northern Manhattan, in Fort Tryon Park, and it's one of my favorite places in the entire city.\n\nThe building itself is assembled from actual medieval European cloisters — they literally shipped pieces of old monasteries across the Atlantic and rebuilt them here. The setting is incredible too, up on this hilly, wooded area overlooking the Hudson River. It feels like you've left New York entirely.\n\nFair warning: it's far. Like, really far uptown. It's basically a different country. But if you have time and want something completely different from everything else on this list, the Cloisters is it. The art is stunning, the gardens are beautiful, and the views from the park are unreal.`,
    tip: "Take the A train to 190th St. It's far, but worth the trip. Best combined with a walk through Fort Tryon Park. Check for High Bridge while you're up there — a stunning pedestrian bridge.",
  },
  {
    id: "moma",
    name: "MoMA",
    lat: 40.7614,
    lng: -73.9776,
    category: "museums",
    commentary: `The Museum of Modern Art. It's good if you're into modern and contemporary art. Big, beautiful building in midtown Manhattan. Starry Night is here, Warhols, Picassos — all the hits.\n\nI'd say it's worth going if you're an art person. If you're not, the building itself and the sculpture garden are still cool to walk through.`,
    tip: "Free on Friday evenings. The sculpture garden is accessible without going through the full museum.",
  },
  {
    id: "natural-history",
    name: "American Museum of Natural History",
    lat: 40.7813,
    lng: -73.9740,
    category: "museums",
    commentary: `The Natural History Museum. If you've seen Night at the Museum, you've seen this building. It's massive, it's classic, and the dinosaur halls are legitimately impressive.\n\nGood option if you want a break from walking around outside, especially on a rainy day. It's right next to Central Park, so you can combine the two.`,
    tip: "The admission is technically \"suggested\" — you can pay what you want. The dinosaur halls on the 4th floor are the highlight.",
  },
  {
    id: "roosevelt-island-cable-car",
    name: "Roosevelt Island Cable Car",
    lat: 40.7613,
    lng: -73.9495,
    category: "experiences",
    commentary: `Here's something that not too many New Yorkers even know about — the Roosevelt Island Tramway. It's an aerial cable car that takes you from the Upper East Side across the East River to Roosevelt Island. It costs the same as a subway ride.\n\nRoosevelt Island itself is cool. There's a nice park, great views of both Manhattan and Queens, and you can walk all the way down to the southern tip. Do this earlier in the day because the park closes in the evening.\n\nThe cable car ride itself is the real attraction — you're floating above the river with the city on both sides. Take the tram over, walk the island, then just hop on the subway to go back. It's a unique, fun experience.`,
    tip: "Use your MetroCard or OMNY — it's the same price as the subway. Go during daylight for the best views. The park at the south tip closes at dusk.",
  },
  {
    id: "staten-island-ferry-bonus",
    name: "Staten Island Ferry",
    lat: 40.6433,
    lng: -74.0720,
    category: "experiences",
    commentary: `Already covered in the Financial District walk, but worth repeating: the Staten Island Ferry is free, runs all day, and gives you incredible views of the Statue of Liberty, the harbor, and lower Manhattan. It's essentially a free cruise. Round trip takes about an hour.`,
    tip: "Right side going out for Statue of Liberty views. Bring food — there's nothing great on the Staten Island end.",
  },
  {
    id: "brighton-beach",
    name: "Brighton Beach & Coney Island",
    lat: 40.5776,
    lng: -73.9614,
    category: "neighborhoods",
    commentary: `Brighton Beach — this is where I grew up, right by the ocean. This is Little Russia. You'll hear Russian everywhere, the restaurants serve borscht and blini, and the boardwalk connects to Coney Island.\n\nConey Island has Luna Park — the amusement park with the Cyclone roller coaster and all that. It's fun, it's kitschy, and the beach is right there. Nathan's Famous hot dogs is here too — they do the eating contest every July 4th.\n\nThis is far from Manhattan (end of the Q or B train), but if you want to see a completely different side of New York, this is it. Bring a towel — the beach is actually pretty nice.`,
    tip: "Take the Q train to Brighton Beach, walk the boardwalk to Coney Island. Get a hot dog at Nathan's. Budget half a day for this trip.",
  },
  {
    id: "williamsburg",
    name: "Williamsburg",
    lat: 40.7081,
    lng: -73.9571,
    category: "neighborhoods",
    commentary: `Williamsburg is Brooklyn's hipster neighborhood. It's got great food, cool bars, street art, vintage shops, and a good view of the Manhattan skyline from the waterfront. Take the L train to Bedford Avenue and just wander.\n\nIt's a cool neighborhood, but honestly, the walks I've outlined cover more ground and more variety. Come here if you have extra time and want a chill Brooklyn afternoon.`,
    tip: "Bedford Avenue is the main drag. The waterfront park has great Manhattan views. Smorgasburg food market is here on weekends (seasonal).",
  },
];

export function getRoute(id: string): Route | undefined {
  return routes.find(r => r.id === id);
}

export function getRouteStop(routeId: string, stopId: string): { route: Route; stop: Stop; stopIndex: number } | undefined {
  const route = getRoute(routeId);
  if (!route) return undefined;
  const stopIndex = route.stops.findIndex(s => s.id === stopId);
  if (stopIndex === -1) return undefined;
  return { route, stop: route.stops[stopIndex], stopIndex };
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx astro check
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/routes.ts
git commit -m "feat: add complete route data with all stops, commentary, and coordinates"
```

---

## Task 3: Home Page

**Files:**
- Create: `src/components/RouteCard.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write RouteCard component**

Write `src/components/RouteCard.astro`:

```astro
---
interface Props {
  number: number;
  title: string;
  color: string;
  detail: string;
  href: string;
  dimmed?: boolean;
}

const { number, title, color, detail, href, dimmed = false } = Astro.props;
const label = number > 0 ? String(number).padStart(2, '0') : '+';
---

<a href={href} class:list={["route-card", { dimmed }]}>
  <div class="route-card-icon" style={`background: ${color}`}>
    {label}
  </div>
  <div class="route-card-info">
    <div class="route-card-name">{title}</div>
    <div class="route-card-detail">{detail}</div>
  </div>
  <div class="route-card-arrow">&rsaquo;</div>
</a>

<style>
  .route-card {
    display: flex;
    gap: 14px;
    align-items: center;
    background: var(--surface-2);
    border-radius: var(--radius-lg);
    padding: 16px;
    margin-bottom: 10px;
    transition: background var(--duration-fast) var(--ease-out);
    cursor: pointer;
  }

  .route-card:hover {
    background: var(--surface-3);
  }

  .route-card.dimmed {
    opacity: 0.7;
  }

  .route-card-icon {
    width: 44px;
    height: 44px;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display);
    font-weight: 800;
    font-size: 16px;
    color: white;
    flex-shrink: 0;
  }

  .route-card-info {
    flex: 1;
    min-width: 0;
  }

  .route-card-name {
    font-weight: 700;
    font-size: 15px;
    margin-bottom: 2px;
  }

  .route-card-detail {
    font-size: 12px;
    color: var(--text-muted);
  }

  .route-card-arrow {
    color: var(--text-muted);
    font-size: 20px;
    flex-shrink: 0;
  }
</style>
```

- [ ] **Step 2: Write full home page**

Write `src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import RouteCard from '../components/RouteCard.astro';
import { routes } from '../data/routes';

const base = import.meta.env.BASE_URL;
---

<BaseLayout title="Walk the City">
  <main class="home">
    <section class="home-hero">
      <div class="home-tag">IGOR'S NYC GUIDE</div>
      <h1 class="home-title">Walk the<br>City<span class="accent">.</span></h1>
      <p class="home-subtitle">5 curated walking routes through the real New York. No tourist traps. No bullshit. Just the good stuff, from someone who actually lives here.</p>
    </section>

    <section class="home-routes">
      <h2 class="section-label">Walking Routes</h2>
      {routes.map((route) => (
        <RouteCard
          number={route.number}
          title={route.title}
          color={route.color}
          detail={`${route.stops.length} stops \u00B7 ${route.duration} \u00B7 ${route.stops[0].name} \u2192 ${route.stops[route.stops.length - 1].name}`}
          href={`${base}routes/${route.id}/`}
        />
      ))}

      <h2 class="section-label" style="margin-top: 24px;">Bonus</h2>
      <RouteCard
        number={0}
        title="Museums & Day Trips"
        color="#808183"
        detail="Met Cloisters \u00B7 Roosevelt Island \u00B7 Coney Island"
        href={`${base}bonus/`}
        dimmed
      />
    </section>
  </main>
</BaseLayout>

<style>
  .home {
    max-width: 600px;
    margin: 0 auto;
  }

  .home-hero {
    padding: 60px 20px 32px;
    position: relative;
    overflow: hidden;
  }

  .home-hero::before {
    content: '';
    position: absolute;
    top: -40px;
    right: -60px;
    width: 260px;
    height: 260px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 99, 25, 0.12), transparent 70%);
    pointer-events: none;
  }

  .home-tag {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--primary);
    letter-spacing: 2px;
    margin-bottom: 12px;
  }

  .home-title {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 10vw, 3.5rem);
    font-weight: 800;
    letter-spacing: -2px;
    line-height: 1.0;
    margin-bottom: 12px;
  }

  .accent {
    color: var(--primary);
  }

  .home-subtitle {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.5;
    max-width: 320px;
  }

  .home-routes {
    padding: 0 16px 100px;
  }

  .section-label {
    font-family: var(--font-display);
    font-size: var(--text-xs);
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 12px;
    padding-top: 8px;
  }
</style>
```

- [ ] **Step 3: Verify home page renders**

```bash
npm run dev
```

Open `http://localhost:4321/nyc-guide/`. Expected: Dark page with "Walk the City." hero, 5 route cards with colored badges, bonus card.

- [ ] **Step 4: Commit**

```bash
git add src/components/RouteCard.astro src/pages/index.astro
git commit -m "feat: build home page with route cards"
```

---

## Task 4: Route Overview Page

**Files:**
- Create: `src/components/StopTimelineItem.astro`
- Create: `src/components/StopTimeline.astro`
- Create: `src/components/RouteMap.astro`
- Create: `src/pages/routes/[route]/index.astro`

- [ ] **Step 1: Write StopTimelineItem component**

Write `src/components/StopTimelineItem.astro`:

```astro
---
import type { Stop } from '../data/routes';

interface Props {
  stop: Stop;
  routeId: string;
  routeColor: string;
  isLast: boolean;
}

const { stop, routeId, routeColor, isLast } = Astro.props;
const base = import.meta.env.BASE_URL;
const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${stop.lat},${stop.lng}&travelmode=walking`;
const detailUrl = `${base}routes/${routeId}/stops/${stop.number}-${stop.id}/`;
---

<div class="stop-item">
  <div class="stop-track">
    <div class="stop-num" style={`background: ${routeColor}`}>{stop.number}</div>
    {!isLast && <div class="stop-line"></div>}
  </div>
  <div class="stop-body">
    <h3 class="stop-name">{stop.name}</h3>
    <p class="stop-desc">{stop.shortDesc}</p>
    <div class="stop-actions">
      <a href={mapsUrl} target="_blank" rel="noopener noreferrer" class="stop-btn stop-btn-maps">
        Open in Maps
      </a>
      <a href={detailUrl} class="stop-btn stop-btn-detail">
        Details &rsaquo;
      </a>
    </div>
    {stop.walkTimeToNext && (
      <div class="stop-walk-time">
        <span class="walk-arrow">&darr;</span> ~{stop.walkTimeToNext} min walk
      </div>
    )}
  </div>
</div>

<style>
  .stop-item {
    display: flex;
    gap: 12px;
  }

  .stop-track {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 28px;
    flex-shrink: 0;
  }

  .stop-num {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display);
    font-weight: 800;
    font-size: 12px;
    flex-shrink: 0;
  }

  .stop-line {
    width: 2px;
    flex: 1;
    min-height: 20px;
    background: var(--border);
  }

  .stop-body {
    flex: 1;
    padding-bottom: 20px;
  }

  .stop-name {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 15px;
    margin-bottom: 3px;
  }

  .stop-desc {
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.45;
    margin-bottom: 8px;
  }

  .stop-actions {
    display: flex;
    gap: 6px;
  }

  .stop-btn {
    padding: 6px 12px;
    border-radius: var(--radius-full);
    font-size: 11px;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    transition: opacity var(--duration-fast) var(--ease-out);
  }

  .stop-btn:hover {
    opacity: 0.8;
  }

  .stop-btn-maps {
    background: var(--primary-dim);
    color: var(--primary);
  }

  .stop-btn-detail {
    background: var(--surface-3);
    color: var(--text-secondary);
  }

  .stop-walk-time {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-muted);
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 10px 0 6px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .walk-arrow {
    color: var(--border-light);
  }
</style>
```

- [ ] **Step 2: Write StopTimeline component**

Write `src/components/StopTimeline.astro`:

```astro
---
import type { Stop } from '../data/routes';
import StopTimelineItem from './StopTimelineItem.astro';

interface Props {
  stops: Stop[];
  routeId: string;
  routeColor: string;
}

const { stops, routeId, routeColor } = Astro.props;
---

<div class="timeline">
  <h2 class="timeline-title">Stops Along the Way</h2>
  {stops.map((stop, i) => (
    <StopTimelineItem
      stop={stop}
      routeId={routeId}
      routeColor={routeColor}
      isLast={i === stops.length - 1}
    />
  ))}
</div>

<style>
  .timeline {
    padding: 0 16px 100px;
  }

  .timeline-title {
    font-family: var(--font-display);
    font-size: var(--text-xs);
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text-muted);
    margin: 16px 0 16px;
  }
</style>
```

- [ ] **Step 3: Write RouteMap component (Leaflet island)**

Write `src/components/RouteMap.astro`:

```astro
---
import type { Stop } from '../data/routes';

interface Props {
  stops: Stop[];
  routeColor: string;
}

const { stops, routeColor } = Astro.props;
const stopsJson = JSON.stringify(stops.map(s => ({ lat: s.lat, lng: s.lng, number: s.number, name: s.name })));
---

<div class="map-container" id="route-map"
  data-stops={stopsJson}
  data-color={routeColor}>
</div>

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

<script>
  import L from 'leaflet';

  function initMap() {
    const container = document.getElementById('route-map');
    if (!container) return;

    const stops = JSON.parse(container.dataset.stops || '[]');
    const color = container.dataset.color || '#FF6319';

    if (stops.length === 0) return;

    const map = L.map(container, {
      zoomControl: true,
      attributionControl: false,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Add markers
    const markers: L.LatLng[] = [];
    stops.forEach((stop: { lat: number; lng: number; number: number; name: string }) => {
      const latlng = L.latLng(stop.lat, stop.lng);
      markers.push(latlng);

      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: ${color};
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 800;
          font-size: 11px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
          border: 2px solid rgba(255,255,255,0.2);
        ">${stop.number}</div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      L.marker(latlng, { icon })
        .bindPopup(`<strong>${stop.number}. ${stop.name}</strong>`)
        .addTo(map);
    });

    // Draw route line
    if (markers.length > 1) {
      L.polyline(markers, {
        color: color,
        weight: 3,
        opacity: 0.6,
        dashArray: '8, 8',
      }).addTo(map);
    }

    // Fit bounds
    const bounds = L.latLngBounds(markers);
    map.fitBounds(bounds, { padding: [30, 30] });

    // Enable scroll zoom after first interaction
    map.on('click', () => {
      map.scrollWheelZoom.enable();
    });
  }

  // Init when visible
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMap);
  } else {
    initMap();
  }
</script>

<style>
  .map-container {
    margin: 16px;
    height: 250px;
    border-radius: var(--radius-lg);
    border: 1px solid var(--border);
    overflow: hidden;
    z-index: 0;
  }

  :global(.custom-marker) {
    background: none !important;
    border: none !important;
  }

  :global(.leaflet-popup-content-wrapper) {
    background: var(--surface-2);
    color: var(--text-primary);
    border-radius: var(--radius-md);
    font-family: var(--font-body);
    font-size: 13px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
  }

  :global(.leaflet-popup-tip) {
    background: var(--surface-2);
  }

  @media (min-width: 768px) {
    .map-container {
      height: 350px;
    }
  }
</style>
```

- [ ] **Step 4: Write route overview page**

Write `src/pages/routes/[route]/index.astro`:

```astro
---
import BaseLayout from '../../../layouts/BaseLayout.astro';
import RouteMap from '../../../components/RouteMap.astro';
import StopTimeline from '../../../components/StopTimeline.astro';
import { routes } from '../../../data/routes';

export function getStaticPaths() {
  return routes.map((route) => ({
    params: { route: route.id },
  }));
}

const { route: routeId } = Astro.params;
const route = routes.find(r => r.id === routeId)!;
const base = import.meta.env.BASE_URL;

const tagColors: Record<string, string> = {
  food: 'var(--accent-orange)',
  views: 'var(--accent-green)',
  iconic: 'var(--accent-blue)',
  history: 'var(--accent-blue)',
  architecture: 'var(--accent-blue)',
  culture: 'var(--accent-purple)',
  shopping: 'var(--accent-yellow)',
  nightlife: 'var(--accent-red)',
  walking: 'var(--accent-gray)',
  free: 'var(--accent-green)',
  morning: 'var(--accent-gray)',
  landmarks: 'var(--accent-blue)',
  drinks: 'var(--accent-purple)',
};
---

<BaseLayout title={route.title} description={route.tagline}>
  <main class="route-page" data-accent={route.colorName}>
    <div class="route-header">
      <a href={`${base}`} class="route-back">&lsaquo; All Routes</a>
      <div class="route-number">WALK {String(route.number).padStart(2, '0')} / {String(routes.length).padStart(2, '0')}</div>
      <h1 class="route-title">{route.title}</h1>
      <p class="route-tagline">{route.tagline}</p>

      <div class="route-stats">
        <div class="stat">
          <div class="stat-value">{route.stops.length}</div>
          <div class="stat-label">Stops</div>
        </div>
        <div class="stat">
          <div class="stat-value">{route.duration.replace('~', '')}</div>
          <div class="stat-label">Duration</div>
        </div>
        <div class="stat">
          <div class="stat-value">{route.distance.replace(' mi', '')}</div>
          <div class="stat-label">Miles</div>
        </div>
        <div class="stat">
          <div class="stat-value">{route.budget}</div>
          <div class="stat-label">Budget</div>
        </div>
      </div>

      <div class="route-tags">
        {route.tags.map((tag) => {
          const color = tagColors[tag] || 'var(--accent-gray)';
          return (
            <span class="tag" style={`background: color-mix(in srgb, ${color} 15%, transparent); color: ${color};`}>
              {tag}
            </span>
          );
        })}
      </div>
    </div>

    <RouteMap stops={route.stops} routeColor={route.color} />

    <StopTimeline stops={route.stops} routeId={route.id} routeColor={route.color} />
  </main>
</BaseLayout>

<style>
  .route-page {
    max-width: 600px;
    margin: 0 auto;
  }

  .route-header {
    padding: 48px 20px 20px;
  }

  .route-back {
    font-size: 13px;
    color: var(--route-accent, var(--primary));
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 16px;
    transition: opacity var(--duration-fast);
  }

  .route-back:hover { opacity: 0.7; }

  .route-number {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--route-accent, var(--primary));
    letter-spacing: 2px;
    margin-bottom: 6px;
  }

  .route-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 9vw, 2.75rem);
    font-weight: 800;
    letter-spacing: -2px;
    line-height: 1.0;
    margin-bottom: 8px;
  }

  .route-tagline {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.4;
    margin-bottom: 16px;
  }

  .route-stats {
    display: flex;
    gap: 20px;
    padding: 12px 0;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .stat { text-align: center; }

  .stat-value {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: 20px;
  }

  .stat-label {
    font-size: 10px;
    color: var(--text-muted);
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .route-tags {
    display: flex;
    gap: 6px;
    padding: 12px 0 0;
    flex-wrap: wrap;
  }

  .tag {
    padding: 4px 10px;
    border-radius: var(--radius-full);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
</style>
```

- [ ] **Step 5: Verify route page renders with map**

```bash
npm run dev
```

Navigate to `http://localhost:4321/nyc-guide/routes/brooklyn-bridge/`. Expected: Route header with stats, dark Leaflet map with numbered markers and dashed route line, stop timeline below.

- [ ] **Step 6: Commit**

```bash
git add src/components/StopTimelineItem.astro src/components/StopTimeline.astro src/components/RouteMap.astro src/pages/routes/
git commit -m "feat: build route overview page with Leaflet map and stop timeline"
```

---

## Task 5: Stop Detail Page (Point-by-Point Mode)

**Files:**
- Create: `src/components/ProgressBar.astro`
- Create: `src/components/MapsButtons.astro`
- Create: `src/components/TipCallout.astro`
- Create: `src/components/StopNav.astro`
- Create: `src/pages/routes/[route]/stops/[stop].astro`

- [ ] **Step 1: Write ProgressBar component**

Write `src/components/ProgressBar.astro`:

```astro
---
interface Props {
  totalStops: number;
  currentStop: number;
  routeColor: string;
  routeName: string;
}

const { totalStops, currentStop, routeColor, routeName } = Astro.props;
const stops = Array.from({ length: totalStops }, (_, i) => i + 1);
---

<div class="progress-bar-container">
  <div class="progress-dots">
    {stops.map((num, i) => (
      <>
        <div
          class:list={["progress-dot", {
            done: num < currentStop,
            active: num === currentStop,
          }]}
          style={num <= currentStop ? `background: ${routeColor}` : ''}
        />
        {i < stops.length - 1 && (
          <div
            class:list={["progress-seg", { done: num < currentStop }]}
            style={num < currentStop ? `background: ${routeColor}` : ''}
          />
        )}
      </>
    ))}
  </div>
  <div class="progress-labels">
    <span>STOP {currentStop} OF {totalStops}</span>
    <span class="progress-route" style={`color: ${routeColor}`}>{routeName.toUpperCase()}</span>
  </div>
</div>

<style>
  .progress-bar-container {
    position: sticky;
    top: 0;
    z-index: 50;
    background: rgba(10, 10, 10, 0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    padding: 48px 16px 12px;
    border-bottom: 1px solid var(--border);
  }

  .progress-dots {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 8px;
  }

  .progress-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--border-light);
    flex-shrink: 0;
    transition: all var(--duration-fast) var(--ease-out);
  }

  .progress-dot.done {
    opacity: 0.4;
  }

  .progress-dot.active {
    width: 10px;
    height: 10px;
  }

  .progress-seg {
    flex: 1;
    height: 2px;
    background: var(--border);
  }

  .progress-seg.done {
    opacity: 0.4;
  }

  .progress-labels {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-muted);
    letter-spacing: 1px;
    display: flex;
    justify-content: space-between;
  }
</style>
```

- [ ] **Step 2: Write MapsButtons component**

Write `src/components/MapsButtons.astro`:

```astro
---
interface Props {
  lat: number;
  lng: number;
  name: string;
}

const { lat, lng, name } = Astro.props;
const googleUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=&travelmode=walking`;
const appleUrl = `maps://maps.apple.com/?daddr=${lat},${lng}&dirflg=w&t=m`;
---

<div class="maps-section">
  <div class="maps-label">Get Directions</div>
  <div class="maps-buttons">
    <a href={googleUrl} target="_blank" rel="noopener noreferrer" class="maps-btn">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" stroke-width="2" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
      Google Maps
    </a>
    <a href={appleUrl} class="maps-btn">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" stroke-width="2" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
      Apple Maps
    </a>
  </div>
</div>

<style>
  .maps-section {
    margin: 24px 0;
  }

  .maps-label {
    font-size: 11px;
    color: var(--text-muted);
    letter-spacing: 1px;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .maps-buttons {
    display: flex;
    gap: 8px;
  }

  .maps-btn {
    flex: 1;
    padding: 14px;
    border-radius: var(--radius-lg);
    border: 1px solid var(--border);
    background: var(--surface-2);
    font-weight: 600;
    font-size: 13px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    transition: background var(--duration-fast) var(--ease-out);
  }

  .maps-btn:hover {
    background: var(--surface-3);
  }
</style>
```

- [ ] **Step 3: Write TipCallout component**

Write `src/components/TipCallout.astro`:

```astro
---
interface Props {
  tip: string;
  color?: string;
}

const { tip, color = 'var(--primary)' } = Astro.props;
---

<div class="tip-callout" style={`border-left-color: ${color}`}>
  <div class="tip-label" style={`color: ${color}`}>Igor's Tip</div>
  <p>{tip}</p>
</div>

<style>
  .tip-callout {
    background: var(--surface-2);
    border-radius: var(--radius-lg);
    padding: 14px 16px;
    margin-bottom: 24px;
    border-left: 3px solid;
  }

  .tip-label {
    font-family: var(--font-display);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  .tip-callout p {
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.5;
  }
</style>
```

- [ ] **Step 4: Write StopNav component**

Write `src/components/StopNav.astro`:

```astro
---
interface Props {
  prevHref?: string;
  prevLabel?: string;
  nextHref?: string;
  nextLabel?: string;
  routeColor: string;
}

const { prevHref, prevLabel, nextHref, nextLabel, routeColor } = Astro.props;
---

<nav class="stop-nav">
  {prevHref ? (
    <a href={prevHref} class="nav-btn nav-btn-prev">
      &lsaquo; {prevLabel}
    </a>
  ) : (
    <div></div>
  )}
  {nextHref ? (
    <a href={nextHref} class="nav-btn nav-btn-next" style={`background: ${routeColor}`}>
      {nextLabel} &rsaquo;
    </a>
  ) : (
    <a href={prevHref?.replace(/stops\/.*/, '') || '#'} class="nav-btn nav-btn-next" style={`background: ${routeColor}`}>
      Back to Overview
    </a>
  )}
</nav>

<style>
  .stop-nav {
    position: sticky;
    bottom: 0;
    padding: 12px 20px calc(12px + env(safe-area-inset-bottom, 0px));
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-top: 1px solid var(--border);
    display: flex;
    gap: 10px;
    z-index: 40;
  }

  .nav-btn {
    flex: 1;
    padding: 14px;
    border-radius: var(--radius-lg);
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 13px;
    text-align: center;
    transition: opacity var(--duration-fast) var(--ease-out);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .nav-btn:hover {
    opacity: 0.85;
  }

  .nav-btn-prev {
    background: var(--surface-2);
    color: var(--text-secondary);
    border: 1px solid var(--border);
    flex: 0.8;
  }

  .nav-btn-next {
    color: white;
  }
</style>
```

- [ ] **Step 5: Write stop detail page**

Write `src/pages/routes/[route]/stops/[stop].astro`:

```astro
---
import BaseLayout from '../../../../layouts/BaseLayout.astro';
import ProgressBar from '../../../../components/ProgressBar.astro';
import MapsButtons from '../../../../components/MapsButtons.astro';
import TipCallout from '../../../../components/TipCallout.astro';
import StopNav from '../../../../components/StopNav.astro';
import { routes } from '../../../../data/routes';

export function getStaticPaths() {
  return routes.flatMap((route) =>
    route.stops.map((stop) => ({
      params: {
        route: route.id,
        stop: `${stop.number}-${stop.id}`,
      },
    }))
  );
}

const { route: routeId, stop: stopParam } = Astro.params;
const route = routes.find(r => r.id === routeId)!;
const stopIndex = route.stops.findIndex(s => `${s.number}-${s.id}` === stopParam);
const stop = route.stops[stopIndex];

const base = import.meta.env.BASE_URL;
const prevStop = stopIndex > 0 ? route.stops[stopIndex - 1] : null;
const nextStop = stopIndex < route.stops.length - 1 ? route.stops[stopIndex + 1] : null;

const prevHref = prevStop ? `${base}routes/${route.id}/stops/${prevStop.number}-${prevStop.id}/` : undefined;
const nextHref = nextStop ? `${base}routes/${route.id}/stops/${nextStop.number}-${nextStop.id}/` : undefined;

const tagColors: Record<string, string> = {
  food: 'var(--accent-orange)',
  'food-spot': 'var(--accent-orange)',
  views: 'var(--accent-green)',
  'photo-op': 'var(--accent-green)',
  iconic: 'var(--accent-blue)',
  history: 'var(--accent-blue)',
  landmark: 'var(--accent-blue)',
  architecture: 'var(--accent-blue)',
  museum: 'var(--accent-blue)',
  culture: 'var(--accent-purple)',
  nightlife: 'var(--accent-red)',
  shopping: 'var(--accent-yellow)',
  walking: 'var(--accent-gray)',
  explore: 'var(--accent-gray)',
  free: 'var(--accent-green)',
  art: 'var(--accent-purple)',
  drinks: 'var(--accent-purple)',
};

const commentaryParagraphs = stop.commentary.split('\n').filter(p => p.trim());
---

<BaseLayout title={`${stop.name} — ${route.title}`} description={stop.shortDesc}>
  <main class="stop-page" data-accent={route.colorName}>
    <ProgressBar
      totalStops={route.stops.length}
      currentStop={stop.number}
      routeColor={route.color}
      routeName={route.title}
    />

    <div class="stop-content">
      <div class="stop-number">STOP {String(stop.number).padStart(2, '0')}</div>
      <h1 class="stop-name">{stop.name}</h1>

      <div class="stop-tags">
        {stop.tags.map((tag) => {
          const color = tagColors[tag] || 'var(--accent-gray)';
          return (
            <span class="tag" style={`background: color-mix(in srgb, ${color} 15%, transparent); color: ${color};`}>
              {tag}
            </span>
          );
        })}
      </div>

      <div class="stop-commentary">
        {commentaryParagraphs.map((p) => (
          <p set:html={p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')} />
        ))}
      </div>

      <TipCallout tip={stop.tip} color={route.color} />

      <MapsButtons lat={stop.lat} lng={stop.lng} name={stop.name} />

      {nextStop && (
        <div class="next-preview">
          <span>Next stop:</span>
          <strong>{nextStop.name}</strong>
          {stop.walkTimeToNext && <span>· ~{stop.walkTimeToNext} min walk</span>}
        </div>
      )}
    </div>

    <StopNav
      prevHref={prevHref}
      prevLabel={prevStop?.name}
      nextHref={nextHref}
      nextLabel={nextStop?.name}
      routeColor={route.color}
    />
  </main>
</BaseLayout>

<style>
  .stop-page {
    max-width: 600px;
    margin: 0 auto;
  }

  .stop-content {
    padding: 20px 20px 24px;
  }

  .stop-number {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--route-accent, var(--primary));
    letter-spacing: 2px;
    margin-bottom: 6px;
  }

  .stop-name {
    font-family: var(--font-display);
    font-size: clamp(1.75rem, 7vw, 2rem);
    font-weight: 800;
    letter-spacing: -1px;
    line-height: 1.1;
    margin-bottom: 12px;
  }

  .stop-tags {
    display: flex;
    gap: 6px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .tag {
    padding: 4px 10px;
    border-radius: var(--radius-full);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .stop-commentary {
    margin-bottom: 24px;
  }

  .stop-commentary p {
    font-size: 15px;
    color: var(--text-secondary);
    line-height: 1.65;
    margin-bottom: 16px;
  }

  .stop-commentary :global(strong) {
    color: var(--text-primary);
    font-weight: 600;
  }

  .next-preview {
    display: flex;
    gap: 6px;
    font-size: 12px;
    color: var(--text-muted);
    padding: 8px 0 80px;
    flex-wrap: wrap;
  }

  .next-preview strong {
    color: var(--text-secondary);
  }
</style>
```

- [ ] **Step 6: Verify stop detail page**

```bash
npm run dev
```

Navigate to `http://localhost:4321/nyc-guide/routes/brooklyn-bridge/stops/3-pebble-beach/`. Expected: Sticky progress bar, stop title, commentary in Igor's voice, tip callout, maps buttons, prev/next navigation.

- [ ] **Step 7: Commit**

```bash
git add src/components/ProgressBar.astro src/components/MapsButtons.astro src/components/TipCallout.astro src/components/StopNav.astro src/pages/routes/
git commit -m "feat: build stop detail page with progress bar, maps links, and navigation"
```

---

## Task 6: Bonus Page

**Files:**
- Create: `src/pages/bonus.astro`

- [ ] **Step 1: Write bonus page**

Write `src/pages/bonus.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import TipCallout from '../components/TipCallout.astro';
import { bonusItems } from '../data/routes';

const base = import.meta.env.BASE_URL;

const categories = [
  { id: 'museums', label: 'Museums', color: 'var(--accent-blue)' },
  { id: 'experiences', label: 'Unique Experiences', color: 'var(--accent-purple)' },
  { id: 'neighborhoods', label: 'Neighborhoods & Day Trips', color: 'var(--accent-green)' },
];
---

<BaseLayout title="Museums & Day Trips">
  <main class="bonus-page">
    <div class="bonus-header">
      <a href={`${base}`} class="bonus-back">&lsaquo; All Routes</a>
      <div class="bonus-label">BONUS</div>
      <h1 class="bonus-title">Museums &<br>Day Trips</h1>
      <p class="bonus-subtitle">Not part of the main walks, but worth your time if you've got it.</p>
    </div>

    {categories.map((cat) => {
      const items = bonusItems.filter(b => b.category === cat.id);
      if (items.length === 0) return null;
      return (
        <section class="bonus-section">
          <h2 class="bonus-section-title" style={`color: ${cat.color}`}>{cat.label}</h2>
          {items.map((item) => {
            const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}&travelmode=transit`;
            const paras = item.commentary.split('\n').filter((p: string) => p.trim());
            return (
              <div class="bonus-card">
                <h3 class="bonus-card-name">{item.name}</h3>
                <div class="bonus-card-commentary">
                  {paras.map((p: string) => <p>{p}</p>)}
                </div>
                <TipCallout tip={item.tip} color={cat.color} />
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" class="bonus-maps-btn">
                  Open in Google Maps
                </a>
              </div>
            );
          })}
        </section>
      );
    })}
  </main>
</BaseLayout>

<style>
  .bonus-page {
    max-width: 600px;
    margin: 0 auto;
    padding-bottom: 100px;
  }

  .bonus-header {
    padding: 48px 20px 20px;
  }

  .bonus-back {
    font-size: 13px;
    color: var(--accent-gray);
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 16px;
  }

  .bonus-label {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--accent-gray);
    letter-spacing: 2px;
    margin-bottom: 6px;
  }

  .bonus-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 9vw, 2.75rem);
    font-weight: 800;
    letter-spacing: -2px;
    line-height: 1.0;
    margin-bottom: 8px;
  }

  .bonus-subtitle {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.4;
  }

  .bonus-section {
    padding: 0 16px;
    margin-top: 32px;
  }

  .bonus-section-title {
    font-family: var(--font-display);
    font-size: var(--text-xs);
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  .bonus-card {
    background: var(--surface-1);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 20px;
    margin-bottom: 12px;
  }

  .bonus-card-name {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 12px;
  }

  .bonus-card-commentary p {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 12px;
  }

  .bonus-maps-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: var(--radius-full);
    background: var(--primary-dim);
    color: var(--primary);
    font-size: 12px;
    font-weight: 600;
    transition: opacity var(--duration-fast);
  }

  .bonus-maps-btn:hover { opacity: 0.8; }
</style>
```

- [ ] **Step 2: Verify bonus page**

```bash
npm run dev
```

Navigate to `http://localhost:4321/nyc-guide/bonus/`. Expected: Bonus page with cards grouped by category.

- [ ] **Step 3: Commit**

```bash
git add src/pages/bonus.astro
git commit -m "feat: build bonus page with museums, experiences, and neighborhoods"
```

---

## Task 7: Build & Deploy Setup

**Files:**
- Modify: `astro.config.mjs` (verify config)
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: Builds successfully, outputs to `dist/`. Check that all routes are generated.

- [ ] **Step 2: Preview production build**

```bash
npm run preview
```

Navigate through the site. Verify: home → route overview → stop detail → maps links → prev/next navigation → bonus page. All working.

- [ ] **Step 3: Create GitHub Actions deploy workflow**

Write `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 4: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "feat: add GitHub Actions workflow for Pages deployment"
```

---

## Task 8: Final Polish & QA

**Files:**
- May modify: any component for fixes found during QA

- [ ] **Step 1: Run full build and verify no errors**

```bash
npm run build 2>&1
```

Expected: Clean build, zero warnings.

- [ ] **Step 2: Test all routes render**

```bash
ls dist/routes/*/index.html
ls dist/routes/*/stops/*/index.html
ls dist/bonus/index.html
```

Expected: One index.html per route, one per stop, one for bonus.

- [ ] **Step 3: Verify mobile responsiveness**

Open dev tools, test at 375px width. Check:
- Home page cards fit
- Route map is usable
- Stop detail is readable
- Bottom nav doesn't overlap content
- Maps buttons are tap-target sized (44px+)

- [ ] **Step 4: Verify map tiles load on dark theme**

Navigate to any route overview page. Map should show dark tiles with colored markers and dashed route line.

- [ ] **Step 5: Verify maps deep links**

On a stop detail page, click "Google Maps" — should open Google Maps with walking directions to the stop coordinates. Click "Apple Maps" — should attempt to open Apple Maps (works on macOS/iOS).

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "chore: final QA polish"
```
