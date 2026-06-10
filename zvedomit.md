# Zvědomit — projekt dokumentace

## Stack

- **Framework:** Next.js 14 (App Router)
- **Jazyk:** TypeScript
- **Stylování:** Tailwind CSS v3 (JIT), arbitrary values pro pixel-perfect spacing
- **Fonty:** Gabarito (hlavní, Google Fonts)
- **Ikony:** Lucide React (X pro close button)
- **Zdroj designu:** Figma (file key: `3rTnaq8VYCr8IBp0RRNPVa`)
- **Deploy:** Vercel (zvedomit.vercel.app)
- **Repozitář:** https://github.com/sketchyline/zvedomit, branch `main`

## Struktura projektu

```
src/
  app/
    layout.tsx              — root layout, načítání fontů, CSS proměnné
    page.tsx                — hlavní stránka + BackgroundDecoration blob overlay
    globals.css             — CSS custom properties (--px)
  components/
    ScrollRevealText.tsx    — scroll-driven word reveal (quote v MyJourney)
    sections/
      Navigation.tsx        — sticky nav, frosted glass, mobilní fullscreen menu
      Hero.tsx              — úvodní sekce, desktop sticky + mobile sticky scroll efekt s bubliny
      WhyZvedomit.tsx       — sekce "Proč koučování", sticky foto, JS equalizeHeights
      MyJourney.tsx         — sekce "Osobní příběh", ScrollRevealText quote, timeline
      Testimonials.tsx      — reference klientů (3-card peek carousel)
      Contact.tsx           — kontaktní sekce
      Footer.tsx            — patička (foto scroll reveal + tmavá karta), LinkedIn odkaz
public/
  Nav Logo.svg                        — logo v navigaci
  footer-logo.svg                     — bílé logo v patičce (bez mezer v názvu!)
  footer_vojta 1.png                  — portrét Vojty v patičce (průhledné pozadí)
  background_logo.svg                 — watermark logo za fotkou (desktop footer)
  footer_background_logo_mobile.svg   — watermark logo za fotkou (mobil footer)
  BackgroundDecoration.svg            — 5 rozmazaných elips, desktop (1920×5912px, Figma node 153-32)
  BackgroundDecoration_mobile.svg     — 5 rozmazaných elips, mobil (402×4034px, Figma node 153-45)
  stars.svg                           — hvězdičky v referencích
  whatsapp_icon.svg                   — WhatsApp ikona v kontaktu
  Hero Background.svg                 — gradient pozadí hero sekce
  hero_background_logo.svg            — velký M watermark v hero
  vojta_standing_2.png                — fotka Vojty v hero (landscape 2528×1684, průhledné pozadí)
  vojta_why_coaching_pic.png          — fotka Vojty v WhyZvedomit
  timeline.svg                        — svislá čára mezi timeline položkami (desktop)
  story_pic.png                       — kruhová fotka pro quote v MyJourney
```

## Design tokeny (tailwind.config.ts)

| Token          | Hodnota   | Použití                            |
|----------------|-----------|------------------------------------|
| `background`   | `#FFFFFF` | Pozadí stránek                     |
| `foreground`   | `#000000` | Text, tmavé plochy                 |
| `surface`      | `#F5F5F5` | Světlé karty (střední feature card)|
| `accent-teal`  | `#EBFFFE` | Feature card + timeline tečka      |
| `accent-green` | `#EBFFF4` | Feature card (zelená)              |
| `accent-gold`  | `#EAB843` | Akcenty                            |
| `muted`        | `#3C3C3C` | Tlumený text v navu                |

### Animace (tailwind.config.ts)

```ts
keyframes: {
  "bubble-in": {
    "0%":   { opacity: "0", transform: "translateY(24px)" },
    "100%": { opacity: "1", transform: "translateY(0px)" },
  },
},
animation: {
  "bubble-in": "bubble-in 600ms cubic-bezier(0.22, 1, 0.36, 1) both",
},
```

`animate-bubble-in` — přiletění bubliny zdola, používá se v Hero.

## CSS proměnné (globals.css)

```css
--px: clamp(1.25rem, 13.8vw, 16.5625rem)  /* horizontální okraj stránek */
```

Používá se jako `px-[var(--px)]` v sekcích.

## Typography (tailwind.config.ts)

| Třída            | Velikost                          |
|------------------|-----------------------------------|
| `text-h1`        | `clamp(2.5rem, 5.5vw, 6.5rem)`    |
| `text-h1-mobile` | `4.75rem` / line-height `3.75rem` |
| `text-h2`        | `clamp(2.5rem, 5.5vw, 6rem)`      |
| `text-h3`        | `clamp(1.5rem, 3vw, 2rem)`        |
| `text-body`      | `1.125rem`                        |

## Klíčové implementační detaily

### BackgroundDecoration — blob overlay

Pět rozmazaných elips v pozadí stránky implementovaných jako CSS div bloby v `page.tsx`.

**Proč ne SVG jako `background-image` na body:**  
Sekce mají bílá pozadí (`bg-background`), která SVG zakrývají. CSS background-image je vždy pod
všemi potomky elementu, ale sekce s `bg-background` i tak bloby zakryjí. Navíc SVG má fixní
pixelové pozice pro konkrétní výšku stránky (5912px) — na různých viewportech neseděly pozice
ke skutečným sekcím.

**Správná implementace v `page.tsx`:**
```tsx
// Blob komponenta — 1920px nebo 402px koordinátový systém
function Blob({ cx, top, size, color, halfWidth = 960 }) {
  return <div style={{
    position: "absolute",
    top,                                      // % výšky stránky
    left: `calc(50% - ${halfWidth}px + ${cx}px)`,  // centrováno dle designu
    width: size, height: size,
    transform: "translate(-50%, -50%)",
    borderRadius: "50%",
    background: color,
    filter: "blur(80px)",
    pointerEvents: "none",
  }} />;
}

export default function Home() {
  return (
    <div className="relative">
      {/* Desktop blob layer (md+) — hidden md:block */}
      <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <Blob cx={257}  top="37%" size={936}  color="#EBFFF4" />  {/* zelený vlevo — před Osobní příběh */}
        <Blob cx={1643} top="50%" size={868}  color="#EBFFFE" />  {/* modrý vpravo — střed timeline */}
        <Blob cx={214}  top="66%" size={952}  color="#EBFFF4" />  {/* zelený vlevo — nadpis Reference */}
        <Blob cx={249}  top="95%" size={1300} color="#EBFFFE" />  {/* modrý vlevo — pod fotkou */}
        <Blob cx={1607} top="95%" size={1272} color="#EBFFF4" />  {/* zelený vpravo — pod fotkou */}
      </div>

      {/* Mobile blob layer (do md) — md:hidden, halfWidth=201 pro 402px design */}
      <div className="md:hidden absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <Blob cx={100} top="38%" size={466} color="#EBFFF4" halfWidth={201} />  {/* zelený — Osobní příběh */}
        <Blob cx={401} top="50%" size={555} color="#EBFFFE" halfWidth={201} />  {/* modrý — střed timeline */}
        <Blob cx={46}  top="61%" size={419} color="#EBFFF4" halfWidth={201} />  {/* zelený — Reference */}
        <Blob cx={419} top="88%" size={588} color="#EBFFF4" halfWidth={201} />  {/* zelený — pod fotkou */}
        <Blob cx={0}   top="89%" size={555} color="#EBFFFE" halfWidth={201} />  {/* modrý — pod fotkou */}
      </div>

      {/* Content layer — nad bloby */}
      <div style={{ position: "relative", zIndex: 1 }}>
        ...sekce...
      </div>
    </div>
  );
}
```

**Zásadní pravidlo stacking context:**  
- Blob layer: `z-index: 0` (absolutní, page-level)
- Content layer: `z-index: 1` (relativní, page-level)
- Sekce s průhledným pozadím (WhyZvedomit, MyJourney, Testimonials, Contact) → bloby prosvítají ✓
- Hero sekce má `bg-background` → bloby NEZOBRAZÍ (správně — hero má vlastní design)
- Footer photo container: bez `bg-white` → bloby prosvítají za fotkou ✓

**Sekce bez background-color (průhledné pro bloby):**
- `WhyZvedomit`: odstraněno `bg-background` ze `<section>`
- `MyJourney`: odstraněno `bg-background` ze `<section>`
- `Testimonials`: odstraněno `bg-white` ze `<section>`
- `Contact`: odstraněno `bg-background` ze `<section>`
- `Footer` photo container: odstraněno `bg-white`

**Proč ne z-index: -1 na blob elementu:**  
`body` s `overflow-x: hidden` a `position: relative` vytváří nový stacking context →
`z-index: -1` skryje element za bílé pozadí body. Řešení: blob layer na `z-index: 0`,
content layer na `z-index: 1` — oba siblové, správně vrstveni.

---

### Navigation — frosted glass + mobilní menu

```tsx
<nav className="sticky top-0 z-50">
  {/* backdrop-blur JE ZÁMĚRNĚ NA POTOMKOVI, ne na <nav> */}
  <div className="absolute inset-0 bg-white/70 backdrop-blur-md pointer-events-none" />
  ...
  {/* Mobile overlay — fixed inset-0 funguje správně, protože nav nemá backdrop-filter */}
  <div className="fixed inset-0 z-40 bg-background ...">
```

**Proč backdrop-filter na potomkovi?**  
`backdrop-filter` na elementu způsobuje v Chromu/Safarim, že `position: fixed` potomci
se napozicují vůči tomuto elementu místo viewportu. Overlay by pokrýval jen 58px navu
místo celé obrazovky. Řešení: blur na vnitřním `absolute` divu, `<nav>` samotný
backdrop-filter nemá.

- Nav výška mobil: `58px` (logo 26px + py-4 = 32px)
- Nav výška desktop: `65px` (logo 33px + py-4 = 32px)
- Overlay obsahuje logo (absolute top-left) + X button (absolute top-right)

### Hero — scroll-driven bubble efekt

**Konstanty:**
```ts
const BUBBLE_SCROLL_STEP = 220;   // desktop: krok scrollu na jednu bublinu
const NAV_HEIGHT = 65;            // výška navu na desktopu
const NAV_HEIGHT_MOBILE = 58;     // výška navu na mobilu
const MOBILE_EXTRA_SCROLL = 450;  // extra scroll prostor pro mobilní bubliny
```

**Desktop (hidden md:block):**
- Wrapper div výšky `calc(100vh - 65px + 760px)` — přebytečná výška = scroll prostor
- Section uvnitř: `position: sticky; top: 65px; height: calc(100vh - 65px)` — přilne ihned pod nav
- `stickyWrapperRef` měří `getBoundingClientRect().top` → `scrolledIn` → bubliny při 220/440/660px
- xl bubliny: absolutně pozicované kolem fotky, podmíněně renderované (`visibleCount > N`)
- md–xl bubliny: `ColumnBubble` s IntersectionObserver (pod foldem)

**Mobile (md:hidden):**
- Wrapper div výšky `calc(100vw * 765/403 + 450px)` — stejný princip jako desktop
- Section: `position: sticky; top: 58px; aspectRatio: 403/765`
- Scroll fallback: `stickyWrapperRef` je `display:none` → `offsetHeight = 0` → detekce přes `window.scrollY - startY`
- Bubliny se zobrazí při 80 / 200 / 350px scrollu
- Bublina 0: `z-[1]` (za hlavou — fotka má `z-20`)
- Bubliny 1 a 2: `z-30` (v popředí nad fotkou)

**Fotka:**
```tsx
<Image src="/vojta_standing_2.png" width={2528} height={1684}
  className="... object-cover object-[45%_top]"
  style={{ aspectRatio: "658/836" }} priority />
```
Fotka je landscape (2528×1684), portrait crop přes `aspectRatio: "658/836"` + `object-cover`.

**Podmíněné renderování místo opacity:0:**  
Bubliny se renderují jen pokud `visibleCount > N` — přidání do DOM spustí `animate-bubble-in`.
Oproti `opacity: 0` je toto bulletproof vůči SSR/hydration.

### ScrollRevealText

`src/components/ScrollRevealText.tsx` — "use client" komponenta.

- Text se rozdělí na slova
- Každé slovo má threshold `i / words.length`
- `opacity` se interpoluje od 0 do 1 na základě scroll progress
- Reveal začíná když top elementu dorazí na 85% výšky viewportu
- Žádný "ghost text" — slova jsou prostě neviditelná (opacity: 0) dokud nezačne reveal

Používá se v `MyJourney.tsx` pro citát Vojty.

### MyJourney — timeline slide-in animace

Každý `TimelineItem` má IntersectionObserver s `threshold: 0.25`, animace je **bidirectionální**
(observer se neodpojuje → při scrollu nahoru prvky opět zmizí):

```tsx
style={{
  opacity: visible ? 1 : 0,
  transform: visible ? "translateX(0)" : `translateX(${isLeft ? "60px" : "-60px"})`,
  transition: "opacity 900ms ease-out, transform 900ms ease-out",
}}
```

Levé položky (sudý index) přijíždí zprava (+60px), pravé zleva (-60px).

### WhyZvedomit — sticky foto + equal-height cards

**Sticky foto:**
```tsx
{/* Levý sloupec — self-stretch aby fotka měla prostor scrollovat */}
<div className="lg:self-stretch">
  <p>PROČ KOUČOVÁNÍ</p>
  <h2>...</h2>
  {/* Pouze foto wrapper je sticky, ne nadpis */}
  <div className="lg:sticky lg:top-[85px]">
    <Image ... />
  </div>
</div>

{/* Pravý sloupec — pb-28 nahrazuje spodní padding sekce, prodlužuje grid */}
<div className="mt-10 lg:mt-0 lg:pb-28">
  ...
</div>
```

Sekce má `lg:pb-0` (bez spodního paddingu), pravý sloupec nese `lg:pb-28` —
tím se grid prodlouží a fotka má kam scrollovat až k sekci "Osobní příběh".

**Equal-height cards:**
```ts
function equalizeHeights() {
  const cards = Array.from(container.children) as HTMLElement[];
  cards.forEach((c) => (c.style.minHeight = ""));
  const maxH = Math.max(...cards.map((c) => c.offsetHeight));
  cards.forEach((c) => (c.style.minHeight = `${maxH}px`));
}
```
Spouští se na mount + resize. Každá karta má `h-full` a `mt-auto` na odstavci (text u spodního okraje).

### Footer — foto scroll reveal + struktura

```
<footer>
  <div ref={photoContainerRef} overflow-hidden>   ← foto oblast (BEZ bg-white — bloby prosvítají)
    background_logo.svg (desktop)                 ← absolute, w-[992px]
    <svg inline> (mobile)                         ← absolute, w-full, fillOpacity 0.18
    <div style={{ transform: translateY(photoY) }}>
      <Image footer_vojta 1.png />                ← vyjíždí zpoda při scrollu
    </div>
  </div>
  <div -mt-[50px] relative z-10>                 ← tmavá karta, překrývá 50px spodku fotky
    mobile layout
    desktop layout
  </div>
</footer>
```

**Scroll reveal animace:**
```tsx
const [photoY, setPhotoY] = useState(300);  // startovní offset

useEffect(() => {
  function update() {
    const rect = photoContainerRef.current.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.75)));
    setPhotoY(Math.round((1 - progress) * 300));
  }
  window.addEventListener("scroll", update, { passive: true });
}, []);
```
Fotka vyjíždí 300px zdola, tmavá karta překrývá jen 50px spodku (nohy/chodidla) → ruce viditelné.

- **LinkedIn odkaz:** `https://www.linkedin.com/in/vojtech-majer/` — v "Sledujte mě" sekci
- **Footer logo soubor:** `/public/footer-logo.svg` (bez mezer — Vercel/Linux je case-sensitive)
- **Mobile watermark logo:** inline SVG (ne `<img>`), `fillOpacity={0.18}`

### Responsive přístup

Většina sekcí má **dvě verze layoutu** — mobile a desktop. Breakpoint je `lg` = 1024px,
v Hero a BackgroundDecoration je klíčový `md` = 768px.

### Vercel / Linux gotchas

- Mezery v názvech souborů způsobují 404 na Vercelu (macOS je case-insensitive, Linux ne)
- Příklad: `footer-logo.svg` místo `Footer Logo.svg`
- `next/image` s SVG: nutný prop `unoptimized`

### Testimonials — 3-card peek carousel

- State: `activeIndex` (1 = střed), vizualizuje `[prev, active, next]`
- Mobile: `overflow-hidden -mx-5` s `justify-center` — boční karty vyčnívají
- Desktop: `items-stretch` na flex řadě — všechny karty stejná výška
- Inactive overlay: `bg-white/[0.72]` přes neaktivní karty

## Navigace (navLinks)

| Label           | href               |
|-----------------|--------------------|
| Proč koučování  | `#proc-koucovani`  |
| Osobní příběh   | `#osobni-pribeh`   |
| Reference       | `#reference`       |
| Kontakt         | `#kontakt`         |

## Kontaktní informace (obsah webu)

- Kouč: **Vojtěch Majer**
- Tel: +420 737 649 994
- Email: vojtech.majer@zvedomit.cz
- WhatsApp: wa.me/420737649994
- LinkedIn: https://www.linkedin.com/in/vojtech-majer/
