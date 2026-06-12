# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server on localhost:3000
npm run build    # production build
npm run lint     # ESLint
npx tsc --noEmit # type-check without building
```

No test suite is configured (Playwright is installed as a dependency but no tests exist).

## Stack

- **Next.js 14** — App Router, server components by default; `"use client"` only where needed
- **TypeScript** with strict mode
- **Tailwind CSS v3** — JIT, arbitrary values for pixel-perfect spacing
- **Font:** Gabarito via `next/font/google`, exposed as `--font-gabarito` CSS var
- **Deploy:** Vercel at `zvedomit.vercel.app` — Linux file system, case-sensitive paths, spaces in filenames cause 404s
- **Design source:** Figma file key `3rTnaq8VYCr8IBp0RRNPVa`

## Architecture

Single-page marketing site. One route (`src/app/page.tsx`) renders all sections in order:

```
Navigation → Hero → WhyZvedomit → MyJourney → Testimonials → Contact → Footer
```

### page.tsx — blob background layer

`page.tsx` owns the full-page background decoration (5 blurred CSS blobs). The layering is:

```tsx
<div className="relative">
  <div style={{ zIndex: 0 }}>  {/* blob layer — absolute, inset-0 */}
  <div style={{ zIndex: 1 }}>  {/* content layer — all sections */}
```

**Critical:** blobs use `z-index: 0`, content uses `z-index: 1`. Using `z-index: -1` on blobs would hide them behind `body`'s stacking context. Sections that should let blobs show through must have **no** `bg-*` class (WhyZvedomit, MyJourney, Testimonials, Contact, Footer photo area).

Blob horizontal positioning: `left: calc(50% - ${halfWidth}px + ${cx}px)` where `halfWidth` is 960 for desktop (1920px design) and 201 for mobile (402px design). Desktop and mobile blobs are separate layers toggled with `hidden md:block` / `md:hidden`.

## Design Tokens

Defined in `tailwind.config.ts`:

| Token | Value |
|-------|-------|
| `background` | `#FFFFFF` |
| `foreground` | `#000000` |
| `surface` | `#F5F5F5` |
| `accent-teal` | `#EBFFFE` |
| `accent-green` | `#EBFFF4` |
| `muted` | `#3C3C3C` |

Typography scale:

| Class | Size |
|-------|------|
| `text-h1` | `clamp(2.5rem, 5.5vw, 6.5rem)` / lh 0.9 |
| `text-h2` | `clamp(2.5rem, 5.5vw, 6rem)` / lh 1 |
| `text-h3` | `clamp(1.5rem, 3vw, 2rem)` / lh 1.2 |
| `text-body` | `1.125rem` / lh 1.5 |
| `text-h1-mobile` | `4.75rem` / lh `3.75rem` |

`--px: clamp(1.25rem, 13.8vw, 16.5625rem)` — horizontal section padding, used as `px-[var(--px)]`.

`animate-bubble-in` — 600ms slide-up from `translateY(24px)`, `animation-fill-mode: both` (invisible before start).

## Key Implementation Details

### Navigation — frosted glass

`backdrop-blur-md` is intentionally on an **inner child div**, not on `<nav>` itself. `backdrop-filter` on an element makes `position: fixed` descendants position relative to that element instead of the viewport — the mobile fullscreen overlay would only cover the 65px nav bar. The `<nav>` element itself has no `backdrop-filter`, so `fixed inset-0` on the overlay works correctly.

- Desktop nav height: **65px** (logo 33px + `py-4` 32px) — used as `NAV_HEIGHT` in Hero
- Mobile nav height: **58px** (logo 26px + `py-4` 32px)

### Hero — load-time bubble animation

Bubbles fly in automatically on page load using CSS `animation-delay`, **not** scroll-triggered. No `useState`/`useEffect` — pure server component.

```tsx
const BUBBLE_DELAYS = [500, 900, 1300]; // ms after page load
```

**Desktop (≥md):** Section is `height: calc(100vh - 65px)`, bubbles positioned absolutely around the photo.

- `xl+` (≥1280px): 3 bubbles absolutely positioned around photo (`left-[-34%]`, `left-[71%]`, `left-[83%]`)
- `md–xl`: 3 bubbles in a column below the photo (in-flow)

**Photo height constraint** — at short viewports (13" laptops ~700px tall), the portrait-cropped landscape photo overflows. An inner wrapper constrains it:

```tsx
<div style={{ maxHeight: `calc(100vh - 65px - 11rem)`, overflow: 'hidden' }}>
  <Image ... />
</div>
```

The wrapper is inside the outer photo container but the absolutely-positioned bubbles are **siblings** of the wrapper (not inside it), so `overflow: hidden` does not clip them. Bubble `top` percentages are computed against the outer container's constrained height.

**Photo file:** `vojta_standing_2.png` is landscape (2528×1684). Portrait crop is achieved via `style={{ aspectRatio: "658/836" }}` + `object-cover object-[45%_top]`.

**Z-index in xl+ layout:**
- Bubble "Jen si to..." at `z-0` → appears **behind** photo (z-10) — peeks from behind Vojta's head
- Other two bubbles at `z-20` → appear in **front** of photo

**Mobile (below md):** Section uses `aspectRatio: "403 / 765"` (natural height, not sticky). Same bubble delays apply.

### ScrollRevealText

`src/components/ScrollRevealText.tsx` — word-by-word opacity reveal driven by scroll position.

- Reveal starts when element top reaches 85% of viewport height
- `setProgress(prev => Math.max(prev, next))` — progress only ever increases; words stay visible when scrolling back up
- Used in `MyJourney` for the Vojta quote blockquote

### WhyZvedomit — sticky photo + equal-height cards

Photo wrapper uses `lg:sticky lg:top-[85px]`. The section itself has `lg:pb-0`; instead, the **right column** carries `lg:pb-28` to extend the grid so the photo has room to scroll before reaching the next section.

`equalizeHeights()` runs on mount and resize to set all feature cards to `minHeight` of the tallest card. Each card uses `h-full` + `mt-auto` on the body text (pins text to the bottom of the card).

### MyJourney — timeline animation

`TimelineItem` uses `IntersectionObserver` with `threshold: 0.25`. The observer **stays connected** (bidirectional) — items slide out when scrolling up. Left items (even index) slide in from the right (+60px), right items from the left (-60px).

### Testimonials — 3-card peek carousel

State: `activeIndex` (default 1 = center card). Mobile uses `overflow-hidden -mx-5` with `justify-center` — side cards peek in from edges. Inactive cards get a `bg-white/[0.72]` overlay.

### Footer — scroll-driven photo reveal

Photo starts at `translateY(300px)` and animates to `translateY(0)` as the footer scrolls into view. Dark card overlaps the photo by 50px (`-mt-[50px] relative z-10`) — intentionally covers feet but leaves hands visible.

`footer-logo.svg` — no spaces in filename (Linux/Vercel case-sensitive). SVG images need `unoptimized` prop on `next/image`.
