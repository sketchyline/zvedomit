# Zvědomit — projekt dokumentace

## Stack

- **Framework:** Next.js 14 (App Router)
- **Jazyk:** TypeScript
- **Stylování:** Inline styles (vw-based pixel-perfect positioning)
- **Fonty:** Gabarito (hlavní), Roboto (drobný text)
- **Zdroj designu:** Figma (canvas 1920×1080)

## Struktura projektu

```
src/
  app/
    layout.tsx       — root layout, CSS proměnné, načítání fontů
    page.tsx         — hlavní stránka (skládá sekce)
  components/
    Navbar.tsx       — fixní navigace s frosted-glass efektem po scrollu
    Hero.tsx         — fullscreen úvodní sekce s portrétem
    WhyCoaching.tsx  — sekce "Proč koučování"
    MyStory.tsx      — sekce "Moje cesta" (3 story bloky)
    Testimonials.tsx — reference klientů (infinity carousel)
    Contact.tsx      — kontaktní sekce
    Footer.tsx       — patička (černá karta)
  components/ui/
    Button.tsx       — sdílená komponenta tlačítka
public/
  Nav Logo.svg
  Hero Portrait.png
  Background Letter (velké _M_).svg
  hero-bg.png
  footer-logo.png
  stars.png
```

## Pozicování

Všechny sekce používají `position: absolute` s hodnotami v `vw`:

```
horizontálně: px / 1920 * 100  → vw
vertikálně:   px / 1080 * 100  → vw  (nebo % pro Hero s height: 100vh)
```

CSS proměnná `--px` = `clamp(1.25rem, 13.8vw, 16.5625rem)` — levý okraj stránek.

## Sekce a jejich výšky

| Sekce         | Výška                              |
|---------------|------------------------------------|
| Hero          | `100vh` (min 600px)                |
| WhyCoaching   | `clamp(40rem, 61.15vw, 1174px)`    |
| MyStory       | `clamp(60rem, 109.01vw, 2093px)`   |
| Testimonials  | `clamp(35rem, 60.1vw, 1154px)`     |
| Contact       | `clamp(30rem, 51.094vw, 981px)`    |
| Footer        | `clamp(20rem, 34.688vw, 666px)`    |

## Klíčové poznámky

- **`"use client"`** je nutné pro komponenty s `onMouseOver`/`onMouseOut` nebo `useState` (Contact, Footer, Testimonials, Navbar).
- **Infinity carousel** (Testimonials): `offset` state rotuje data, střední slot (index 1 z `visible`) je vždy aktivní karta.
- **Figma MCP URL** expirují za 7 dní — nahradit lokálními soubory z `/public`.
- **`calc()` s násobením** (`calc(n * Xvw)`) má problém v Chrome — použít předpočítané hodnoty.
- **Hero portrait**: `bottom: 0; height: 65.19vh; left: 50%; transform: translateX(-50%)` — kotven ke spodnímu okraji Hero sekce.

## Kontaktní informace (obsah webu)

- Kouč: **Vojtěch Majer**
- Tel: +420 737 649 994
- Email: majer.vojta@gmail.com
- WhatsApp: wa.me/420737649994

## Barvy

| Token       | Hodnota   |
|-------------|-----------|
| Pozadí      | `#ffffff` |
| Text        | `#000000` |
| Navbar text | `#3c3c3c` |
| Footer karta| `#000000` |
| CTA button  | `#000000` |
