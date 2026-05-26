# Zvědomit — projekt dokumentace

## Stack

- **Framework:** Next.js 14 (App Router)
- **Jazyk:** TypeScript
- **Stylování:** Inline styles (vw-based pixel-perfect positioning)
- **Fonty:** Gabarito (hlavní), Roboto (drobný text)
- **Zdroj designu:** Figma (canvas 1920×1080, file key: `3rTnaq8VYCr8IBp0RRNPVa`)

## Struktura projektu

```
src/
  app/
    layout.tsx         — root layout, CSS proměnné, načítání fontů
    page.tsx           — hlavní stránka (skládá sekce)
    globals.css        — globální styly a CSS custom properties
  components/
    Navbar.tsx         — fixní navigace s frosted-glass efektem po scrollu
    Hero.tsx           — fullscreen úvodní sekce s portrétem
    WhyCoaching.tsx    — sekce "Proč koučování"
    MyStory.tsx        — sekce "Moje cesta" (3 story bloky)
    Testimonials.tsx   — reference klientů (infinity carousel)
    Contact.tsx        — kontaktní sekce
    Footer.tsx         — patička (černá karta)
  components/ui/
    Button.tsx         — sdílená komponenta tlačítka
public/
  Nav Logo.svg                       — logo v navigaci
  Hero Portrait.png                  — portrét na Hero sekci
  Background Letter (velké _M_).svg  — pozadí Hero sekce
  hero-bg.png                        — gradientní pozadí Hero
  footer-logo.png                    — bílé logo v patičce
  stars.png                          — ikona hvězdiček (testimonials)
  arrow-left.png                     — šipka vlevo (carousel)
  arrow-right.png                    — šipka vpravo (carousel)
  btn-circle.png                     — pozadí tlačítka carousel (vlevo)
  btn-right.png                      — pozadí tlačítka carousel (vpravo)
```

## Pozicování

Všechny sekce používají `position: absolute` s hodnotami v `vw`:

```
horizontálně: px / 1920 * 100  → vw
vertikálně:   px / 1080 * 100  → vw  (nebo % pro Hero s height: 100vh)
```

CSS proměnná `--px` = `clamp(1.25rem, 13.8vw, 16.5625rem)` — levý/pravý okraj stránek.

## Sekce a jejich výšky

| Sekce         | Výška                              | Figma node  |
|---------------|------------------------------------|-------------|
| Hero          | `100vh` (min 600px)                | `19:375`    |
| WhyCoaching   | `clamp(40rem, 61.15vw, 1174px)`    | `19:416`    |
| MyStory       | `clamp(60rem, 109.01vw, 2093px)`   | `23:431`    |
| Testimonials  | `clamp(35rem, 60.1vw, 1154px)`     | `23:483`    |
| Contact       | `clamp(30rem, 51.094vw, 981px)`    | `23:503`    |
| Footer        | `clamp(20rem, 34.688vw, 666px)`    | `34:52`     |

## Klíčové poznámky

- **`"use client"`** je nutné pro komponenty s `onMouseOver`/`onMouseOut` nebo `useState` — platí pro: Navbar, Testimonials, Contact, Footer.
- **Infinity carousel** (Testimonials): `offset` state rotuje data přes 3 pevné poziční sloty. Index 1 z `visible` pole je vždy aktivní (střední) karta.
- **Figma MCP URL** expirují za 7 dní — všechny assety jsou stažené do `/public` a používají se lokální cesty.
- **`calc()` s násobením** (`calc(n * Xvw)`) způsobuje problémy v Chrome — používat předpočítané hodnoty jako plain `vw` string.
- **Hero portrait**: `bottom: 0; height: 65.19vh; left: 50%; transform: translateX(-50%)` — kotven ke spodnímu okraji sekce, section `overflow: hidden` ořízne spodní okraj.
- **Footer tagline**: `whiteSpace: nowrap` + `left: 50%; transform: translateX(-50%)` — nutné pro zobrazení na jednom řádku.
- **Footer bottom links**: zabaleny do flex divu s `gap: 24` pozicovaného od pravého okraje — zabraňuje překrývání při menších viewportech.

## Navigace (navLinks)

| Label           | href            |
|-----------------|-----------------|
| Proč koučování  | `#why-coaching` |
| Moje cesta      | `#my-story`     |
| Kontakt         | `#contact`      |
| Reference       | `#testimonials` |

## Kontaktní informace (obsah webu)

- Kouč: **Vojtěch Majer**
- Tel: +420 737 649 994
- Email: majer.vojta@gmail.com
- WhatsApp: wa.me/420737649994

## Barvy

| Token        | Hodnota   |
|--------------|-----------|
| Pozadí       | `#ffffff` |
| Text         | `#000000` |
| Navbar text  | `#3c3c3c` |
| Footer karta | `#000000` |
| CTA button   | `#000000` |

## Git

- Repozitář: https://github.com/sketchyline/zvedomit
- Branch: `main`
- `.gitignore` vylučuje: `node_modules`, `.next`, `.DS_Store`, `.env*`, `next-env.d.ts`, `*.tsbuildinfo`
