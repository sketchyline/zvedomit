# Zvědomit — projekt dokumentace

## Stack

- **Framework:** Next.js 14 (App Router)
- **Jazyk:** TypeScript
- **Stylování:** Tailwind CSS v3 (JIT), arbitrary values pro pixel-perfect spacing
- **Fonty:** Gabarito (hlavní, Google Fonts), Roboto (drobný text — copyright, podmínky)
- **Ikony:** Lucide React (Phone, Mail, ChevronLeft, ChevronRight)
- **Zdroj designu:** Figma (file key: `3rTnaq8VYCr8IBp0RRNPVa`)
- **Deploy:** Vercel (zvedomit.vercel.app)
- **Repozitář:** https://github.com/sketchyline/zvedomit, branch `main`

## Struktura projektu

```
src/
  app/
    layout.tsx          — root layout, načítání fontů, CSS proměnné
    page.tsx            — hlavní stránka (skládá sekce)
    globals.css         — CSS custom properties (--px, --font-*)
  components/
    sections/
      Navigation.tsx    — fixní navigace s blur efektem po scrollu
      Hero.tsx          — úvodní sekce, desktop + mobile layout
      WhyZvedomit.tsx   — sekce "Proč koučování"
      MyJourney.tsx     — sekce "Osobní příběh"
      Testimonials.tsx  — reference klientů (3-card peek carousel)
      Contact.tsx       — kontaktní sekce
      Footer.tsx        — patička (foto + tmavá karta)
public/
  nav_logo.svg                      — logo v navigaci
  footer-logo.svg                   — bílé logo v patičce (bez mezer v názvu!)
  footer_vojta 1.png                — portrét Vojty (průhledné pozadí)
  background_logo.svg               — watermark logo za fotkou (desktop footer)
  footer_background_logo_mobile.svg — watermark logo za fotkou (mobil footer)
  stars.svg                         — hvězdičky v referencích
  whatsapp_icon.svg                 — WhatsApp ikona v kontaktu
```

## Design tokeny (tailwind.config.ts)

| Token          | Hodnota   | Použití                    |
|----------------|-----------|----------------------------|
| `background`   | `#FFFFFF` | Pozadí stránek             |
| `foreground`   | `#000000` | Text, tmavé plochy         |
| `surface`      | `#F5F5F5` | Světlé karty               |
| `accent-teal`  | `#EBFFFE` | (zatím nepoužito)          |
| `accent-green` | `#EBFFF4` | (zatím nepoužito)          |
| `accent-gold`  | `#EAB843` | Akcenty                    |
| `muted`        | `#3C3C3C` | Tlumený text               |

## CSS proměnné (globals.css)

```css
--px: clamp(1.25rem, 13.8vw, 16.5625rem)  /* horizontální okraj stránek */
```

Používá se jako `px-[var(--px)]` v sekcích.

## Typography (tailwind.config.ts)

| Třída          | Velikost                          |
|----------------|-----------------------------------|
| `text-h1`      | `clamp(2.5rem, 5.5vw, 6.5rem)`    |
| `text-h2`      | `clamp(2.5rem, 5.5vw, 6rem)`      |
| `text-h3`      | `clamp(1.5rem, 3vw, 2rem)`        |
| `text-body`    | `1.125rem`                        |

## Sekce

| Sekce         | Figma node (desktop) | Figma node (mobil) |
|---------------|----------------------|--------------------|
| Navigation    | —                    | —                  |
| Hero          | —                    | —                  |
| WhyZvedomit   | `153-27`             | —                  |
| MyJourney     | —                    | —                  |
| Testimonials  | —                    | —                  |
| Contact       | `153-29`             | `153-42`           |
| Footer        | `153-31`             | `153-44`           |

## Klíčové implementační detaily

### Responsive přístup
Každá sekce má **dvě verze layoutu** — mobile (`lg:hidden`) a desktop (`hidden lg:...`). Breakpoint je `lg` = 1024px.

### Testimonials — 3-card peek carousel
- State: `activeIndex` (1 = střed), vizualizuje `[prev, active, next]`
- Mobile: `overflow-hidden -mx-5` s `justify-center` — boční karty vyčnívají
- Desktop: `items-stretch` na flex řadě — všechny karty stejná výška
- Inactive overlay: `bg-white/[0.72]` přes neaktivní karty

### Footer — struktura
```
<footer>
  <div bg-white overflow-hidden>         ← foto oblast
    background_logo.svg (desktop)        ← absolute, w-[992px]
    <svg inline> (mobile)                ← absolute, w-full, fillOpacity 0.18
    <Image foto Vojty>                   ← z-10, max-w-[642px] mx-auto
  </div>
  <div mx-[14px] mb-[14px]              ← tmavá karta
       lg:mx-[37px] lg:mb-[37px]>       ← bez horního marginu (foto přisazena)
    mobile layout
    desktop layout
  </div>
</footer>
```

- **Footer logo soubor:** `/public/footer-logo.svg` (bez mezer — Vercel/Linux je case-sensitive)
- **Foto:** `footer_vojta 1.png` má průhledné pozadí, kontejner `bg-white`
- **Mobile watermark logo:** inline SVG (ne `<img>`), `fillOpacity={0.18}` — soubor s 10% opacity je na bílém pozadí neviditelný

### Vercel / Linux gotchas
- Mezery v názvech souborů způsobují 404 na Vercelu (macOS je case-insensitive, Linux ne)
- Řešení: `footer-logo.svg` místo `Footer Logo.svg`
- `next/image` s SVG: nutný prop `unoptimized`

### Contact — ikony
- Telefon, Email: Lucide React ikony
- WhatsApp: vlastní `/public/whatsapp_icon.svg` (ne Lucide `MessageCircle`)

## Navigace (navLinks)

| Label           | href               |
|-----------------|--------------------|
| Úvod            | `#`                |
| Proč koučování  | `#proc-koucovani`  |
| Osobní příběh   | `#osobni-pribeh`   |
| Reference       | `#reference`       |
| Kontakt         | `#kontakt`         |

## Kontaktní informace (obsah webu)

- Kouč: **Vojtěch Majer**
- Tel: +420 737 649 994
- Email: vojtech.majer@zvedomit.cz
- WhatsApp: wa.me/420737649994
