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
- **Vercel Analytics & Speed Insights** — `@vercel/analytics` and `@vercel/speed-insights` installed; `<Analytics />` and `<SpeedInsights />` rendered at end of `<body>` in `layout.tsx`
- **Design source:** Figma file key `3rTnaq8VYCr8IBp0RRNPVa`

## Architecture

Single-page marketing site. One route (`src/app/page.tsx`) renders all sections in order:

```
Navigation → Hero → WhyZvedomit → MyJourney → Testimonials → Contact → Footer
```

### page.tsx — layout structure

`page.tsx` owns the full-page background decoration (5 blurred CSS blobs) and controls which sections are full-width vs. max-width constrained. The structure is:

```tsx
<div className="relative">                         {/* full viewport width */}
  <div style={{ zIndex: 0 }}>                      {/* blob layer — absolute inset-0, full width */}
  <div style={{ zIndex: 1 }}>                      {/* content layer */}
    <Navigation />                                  {/* full width */}
    <main>
      <Hero />                                      {/* full width */}
      <div className="max-w-[1920px] mx-auto">      {/* centered, transparent sections */}
        <WhyZvedomit /><MyJourney />...
      </div>
    </main>
    <div className="max-w-[1920px] mx-auto">        {/* footer centered */}
      <Footer />
    </div>
  </div>
</div>
```

**Why Navigation and Hero are full-width:** Hero has `bg-background` (white) + `overflow-hidden` with its own SVG background (`Hero Background.svg`). If Hero is inside a `max-w-[1920px]` wrapper, the SVG gradient is clipped at 1920px and wider viewports see white gutters. Navigation is full-width so its `bg-white/90` background extends edge to edge.

**Why middle sections use max-w-[1920px]:** WhyZvedomit, MyJourney, Testimonials, Contact are transparent — page-level blobs show through them. Content is already horizontally bounded by `px-[var(--px)]` padding; the max-w prevents layouts from stretching unusably wide on very large monitors.

**Critical:** blobs use `z-index: 0`, content uses `z-index: 1`. Using `z-index: -1` on blobs would hide them behind `body`'s stacking context. Sections that should let blobs show through must have **no** `bg-*` class (WhyZvedomit, MyJourney, Testimonials, Contact, Footer photo area).

Blob horizontal positioning: `left: calc(50% - ${halfWidth}px + ${cx}px)` where `halfWidth` is 960 for desktop (1920px design) and 201 for mobile (402px design). Desktop and mobile blobs are separate layers toggled with `hidden md:block` / `md:hidden`.

**GPU performance:** Each blob has `transform: "translate(-50%,-50%) translateZ(0)"` and `willChange: "transform"` — promotes each blob to its own compositor layer so `filter: blur()` is cached rather than recomputed on every scroll frame. Both parent blob containers have `transform: "translateZ(0)"` and `isolation: "isolate"` — creates a single composite layer for the whole group, preventing blob repaints from affecting the rest of the page.

**Blur radius is responsive** via CSS class `.blob-bg` in `globals.css`:
- Mobile (< 768px): `blur(30px)` — reduced GPU load during scroll
- Desktop (md+): `blur(80px)` — full visual quality

Do **not** add `backdrop-filter` / `backdrop-blur` anywhere — even on non-sticky elements it creates extra compositor layers. On sticky/fixed elements (like the nav) it forces the browser to repaint the entire area below on every scroll frame, causing severe jank on iOS Safari.

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

### Navigation

Nav uses `sticky top-0 z-50`. Background is a plain `bg-white/90` inner div — **no `backdrop-filter`/`backdrop-blur`**. Frosted glass was removed because `backdrop-filter` on a sticky element forces iOS Safari to repaint the entire viewport below it on every scroll frame.

The background div is still on a **child element** (not `<nav>` itself) because `backdrop-filter` on an element would make `position: fixed` descendants position relative to it — which would break the mobile fullscreen overlay. Even without blur, keeping the background on a child preserves this safe structure.

- Desktop nav height: **65px** (logo 33px + `py-4` 32px) — used as `NAV_HEIGHT` in Hero
- Mobile nav height: **58px** (logo 26px + `py-4` 32px)

### Hero — load-time bubble animation

Bubbles fly in automatically on page load using CSS `animation-delay`, **not** scroll-triggered. No `useState`/`useEffect` — pure server component.

```tsx
const BUBBLE_DELAYS = [500, 900, 1300]; // ms after page load
```

**Desktop (≥md) — single proportional layout:** There is no breakpoint-based layout switch. The same photo+bubbles composition is used for all `md+` viewports, just proportionally smaller or larger.

Section height is exactly `calc(100dvh - 65px)` — fills the viewport below the nav, always.

**Photo sizing — dual constraint:**

```
width: min(clamp(280px, 36vw, 660px), calc((100dvh - 215px) * 0.7871))
```

- `clamp(280px, 36vw, 660px)` — width-based cap (same as original design)
- `calc((100dvh - 215px) * 0.7871)` — height-based cap: available viewport height minus nav (65px) and heading space (~150px), multiplied by `658/836` (photo aspect ratio) to get the max width that fits without overflow
- `0.7871 = 658/836` (photo aspect ratio — width/height)
- On tall viewports (>~760px): width constraint wins → same as original design
- On short viewports (e.g. Dell Latitude 5430 at 150% Windows scaling: 1280×580 CSS px): height constraint wins → photo shrinks so all three bubbles fit in the viewport without scrolling

**Photo block** (`absolute bottom-0 left-1/2 -translate-x-1/2`):

The outer div has `containerType: "inline-size"` — establishes a container query context. Height is derived from width via `aspectRatio: "658/836"`. Inside is a `relative w-full h-full` wrapper that is the **containing block for all three bubbles**.

```
Do NOT move bubbles outside the relative wrapper — cqw/top positions on a
sibling of the photo would resolve incorrectly and shift with viewport changes.
```

**Bubble sizing — `cqw` units with px cap:**

All bubble dimensions are expressed in `cqw` (1cqw = 1% of photo container width), capped at original design values via CSS `min()`:

| Property | Value |
|---|---|
| width | `min(76cqw, 280px)` |
| font-size | `min(4.9cqw, 18px)` |
| border-radius | `min(5.15cqw, 19px)` |
| padding | `min(4.3cqw, 16px) min(3.25cqw, 12px)` |

Below ~1024px viewport width the photo is narrower than 368px → cqw values are below the px caps → bubbles scale down proportionally. Above ~1024px the px caps kick in → bubbles stay at original 280px/18px regardless of photo size.

**Bubble positions** (all in `cqw`, origin = top-left of photo block):

| Bubble | left | top | z-index |
|---|---|---|---|
| 0 "Jen si to…" | `max(-60cqw, -220px)` | `76.2cqw` | z-0 — **behind** photo |
| 1 "Koučování…" | `71cqw` | `49.5cqw` | z-20 — in front |
| 2 "Nejlepší rada…" | `83cqw` | `87.7cqw` | z-20 — in front |

`top` in cqw is derived from original `%` of photo height: `top_pct × (836/658) = top_pct × 1.2705`. E.g. `top: 60%` of photo height → `60 × 1.2705 = 76.2cqw`.

Bubble 0 `left: max(-60cqw, -220px)` — never goes further left than 220px from photo edge (original design value), but scales inward proportionally on small photos.

**Photo file:** `vojta_standing_2.png` is landscape (2528×1684). Portrait crop via `object-cover object-[45%_top]` in a container with `aspectRatio: "658/836"`.

**Mobile (below md):** Section uses `aspectRatio: "403 / 765"` (natural height, not viewport-relative). Same bubble delays apply.

### ScrollRevealText

`src/components/ScrollRevealText.tsx` — word-by-word opacity reveal triggered by IntersectionObserver.

- Single IO observer on the `<p>` element; fires once when 15% of it enters the viewport, then disconnects
- All words fade in with CSS `transition-delay` stagger: **30 ms/word** for > 30 words, **40 ms** for > 20, **55 ms** otherwise (caps total cascade at ~1.5 s)
- One-way: words never hide again (`observer.disconnect()` after trigger)
- `prefers-reduced-motion`: all words shown instantly with no transition
- Used in `MyJourney` for the Vojta quote blockquote

**Do not** revert to scroll-event + `getBoundingClientRect()` — iOS Safari throttles scroll events during momentum scrolling, causing stale rect values and frozen animations.

### WhyZvedomit — sticky photo + equal-height cards

Photo wrapper uses `lg:sticky lg:top-[85px]`. The section itself has `lg:pb-0`; instead, the **right column** carries `lg:pb-28` to extend the grid so the photo has room to scroll before reaching the next section.

`equalizeHeights()` runs on mount and resize to set all feature cards to `minHeight` of the tallest card. Each card uses `h-full` + `mt-auto` on the body text (pins text to the bottom of the card).

**Feature card order:** green (`bg-accent-green`) → gray (`bg-surface`) → teal (`bg-accent-teal`).

### MyJourney — timeline animation

`TimelineItem` uses `IntersectionObserver` with `threshold: 0.25`. One-way: `observer.disconnect()` after first trigger — items never slide back out when scrolling up.

- Left items (even index, `isLeft: true`): slide in from right (`+60px`), animate immediately on trigger
- Right items (odd index): slide in from left (`−60px`), 100 ms delay — staggers paired items within the same grid row
- Transition: `opacity 900ms ease-out, transform 900ms ease-out`
- `prefers-reduced-motion`: items shown instantly

### Contact — two-column layout with contact items

Desktop (`lg+`): flex row — left column has label + heading (`Kam dál?`) + body paragraphs, right column has contact items (`ContactItem`) bottom-aligned via `justify-end`. Mobile: single column, same content stacked.

`ContactItem` renders icon + bold label + linked value. Contact methods: phone (`tel:`), email (`mailto:`), WhatsApp (`https://wa.me/...`). Desktop shows phone+email in a wrapped row, WhatsApp below; mobile lists all three vertically.

Section has `id="kontakt"` for nav anchor. No animations or state — pure server component.

### Testimonials — 3-card peek carousel

State: `activeIndex` (default 1 = center card). Mobile uses `overflow-hidden -mx-5` with `justify-center` — side cards peek in from edges. Inactive cards get a `bg-white/[0.72]` overlay.

### Footer — photo reveal + tagline

**Photo animation:** starts at `translateY(300px)`, animates to `translateY(0)` triggered by IntersectionObserver on the photo wrapper div.
- One-way: `observer.disconnect()` after trigger — photo stays up when scrolling back
- Trigger: `rootMargin: "0px 0px 150px 0px"` — fires when photo is 150px below the viewport edge (slightly before the footer enters view)
- Duration: `1.5s cubic-bezier(0.22, 1, 0.36, 1)`
- `prefers-reduced-motion`: photo shown instantly at `translateY(0)`

**Dark card** overlaps the photo by 50px (`-mt-[50px] relative z-10`) — intentionally covers feet but leaves hands visible.

**Desktop tagline:** `text-[clamp(1.5rem,3.5vw,4.5rem)] whitespace-nowrap text-center`

**Bottom bar:** copyright line only — no links (podmínky používání and nastavení cookies were removed).

`footer-logo.svg` — no spaces in filename (Linux/Vercel case-sensitive). SVG images need `unoptimized` prop on `next/image`.

### Scroll restoration

`layout.tsx` `<head>` contains an inline script that runs before React hydration:

```js
history.scrollRestoration = "manual";
window.scrollTo(0, 0);
window.addEventListener("pageshow", function(e) { if (e.persisted) window.scrollTo(0, 0) });
```

`history.scrollRestoration = "manual"` prevents the browser from restoring scroll position on refresh. The `pageshow` listener handles iOS Safari's bfcache (Back-Forward Cache) — when a page is restored from bfcache, `pageshow` fires with `e.persisted = true` and the page scrolls back to top.
