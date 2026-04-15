/**
 * Section – My Story
 *
 * Pixel-perfect against Figma 1920×1080 canvas.
 * All positions converted to vw: px / 1920 * 100
 *
 *   Label:       top=121px→6.302vw    centered
 *   H2:          top=161px→8.385vw    centered
 *
 *   Block 1 (text left, image right):
 *     Image:  top=363px→18.906vw  left=1009px→52.552vw  506×550px→26.354×28.646vw
 *     Text:   top=525px→27.344vw  left=calc(50%-552px)→calc(50%-28.75vw)  w=407px→21.198vw
 *
 *   Block 2 (image left, text right):
 *     Image:  top=913px→47.552vw  left=408px→21.25vw    506×550px→26.354×28.646vw
 *     Text:   top=1033px→53.802vw left=calc(50%+145px)→calc(50%+7.552vw) w=410px→21.354vw
 *
 *   Block 3 (text left, image right):
 *     Image:  top=1463px→76.198vw left=1019px→53.073vw  506×550px→26.354×28.646vw
 *     Text:   top=1637px→85.26vw  left=calc(50%-555px)→calc(50%-28.906vw) w=410px→21.354vw
 *
 *   Section h: ~2013px+80 = 2093px → 109.01vw
 */
export function MyStory() {
  return (
    <section
      id="my-story"
      style={{
        position: "relative",
        width: "100%",
        height: "clamp(60rem, 109.01vw, 2093px)",
        backgroundColor: "#fff",
      }}
    >
      {/* ── Label ──────────────────────────────────────────────
          Figma: top=121px, centered                           */}
      <p
        style={{
          position: "absolute",
          top: "6.302vw",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-gabarito), sans-serif",
          fontWeight: 400,
          fontSize: "clamp(0.875rem, 0.9375vw, 1.125rem)",
          lineHeight: "normal",
          color: "#000",
          textTransform: "uppercase",
          margin: 0,
          whiteSpace: "nowrap",
        }}
      >
        Osobní příběh
      </p>

      {/* ── Heading ────────────────────────────────────────────
          Figma: top=161px, left=calc(50%-232px) ≈ centered   */}
      <h2
        style={{
          position: "absolute",
          top: "8.385vw",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-gabarito), sans-serif",
          fontWeight: 500,
          fontSize: "clamp(2.25rem, 5vw, 6rem)",
          lineHeight: "normal",
          color: "#000",
          margin: 0,
          whiteSpace: "nowrap",
        }}
      >
        Moje cesta
      </h2>

      {/* ── Block 1 — text left, image right ──────────────── */}

      {/* Image: top=363px→18.906vw, left=1009px→52.552vw */}
      <div
        style={{
          position: "absolute",
          top: "18.906vw",
          left: "52.552vw",
          width: "26.354vw",
          height: "28.646vw",
          borderRadius: "clamp(1rem, 2.344vw, 45px)",
          backgroundColor: "#d9d9d9",
        }}
        role="img"
        aria-label="Fotografie"
      />

      {/* Text: top=525px→27.344vw, left=calc(50%-552px)→calc(50%-28.75vw) */}
      <p
        style={{
          position: "absolute",
          top: "27.344vw",
          left: "calc(50% - 28.75vw)",
          width: "21.198vw",
          fontFamily: "var(--font-gabarito), sans-serif",
          fontWeight: 400,
          fontSize: "clamp(0.875rem, 0.9375vw, 1.125rem)",
          lineHeight: "normal",
          color: "#000",
          margin: 0,
        }}
      >
        Už během studia na VŠE jsem se věnoval hraní pokeru, od kterého jsem se
        později dostal k proprietary tradingu v investiční bance Wood &amp;
        Company. Obě prostředí mají společné jedno — práci s nejistotou, tlakem
        a emocemi. Velmi brzy jsem pochopil, že pokud se v nich chci
        dlouhodobě pohybovat, musím vědomě pracovat sám na sobě. Strávil jsem
        desítky hodin v koučování a terapii, které mi pomohly najít udržitelnou
        cestu v práci i k sobě samému.
      </p>

      {/* ── Block 2 — image left, text right ──────────────── */}

      {/* Image: top=913px→47.552vw, left=408px→21.25vw */}
      <div
        style={{
          position: "absolute",
          top: "47.552vw",
          left: "21.25vw",
          width: "26.354vw",
          height: "28.646vw",
          borderRadius: "clamp(1rem, 2.344vw, 45px)",
          backgroundColor: "#d9d9d9",
        }}
        role="img"
        aria-label="Fotografie"
      />

      {/* Text: top=1033px→53.802vw, left=calc(50%+145px)→calc(50%+7.552vw) */}
      <p
        style={{
          position: "absolute",
          top: "53.802vw",
          left: "calc(50% + 7.552vw)",
          width: "21.354vw",
          fontFamily: "var(--font-gabarito), sans-serif",
          fontWeight: 400,
          fontSize: "clamp(0.875rem, 0.9375vw, 1.125rem)",
          lineHeight: "normal",
          color: "#000",
          margin: 0,
        }}
      >
        Z pozice tradera jsem se posunul do role vedoucího operativy tradingu v
        Quantlane. Pečuji o firemní vztahy, podporuji tradery v jejich rozvoji a
        propojuji je s týmem vývojářů. Koučovací principy využívám denně —
        empatii, kladení přesných otázek a schopnost zachytit to podstatné, i
        když to třeba není na první pohled vidět. Postupně jsem začal vnímat, že
        koučování neovlivňuje jen jednu oblast života, ale proměňuje způsob,
        jakým člověk přemýšlí a funguje napříč rolemi, které v životě má.
        Pomohlo mi to přijmout roli otce, ve které jsem si zpočátku nebyl jistý
        a spíš v ní trpěl, narovnat svůj vztah k alkoholu a učit se být lepším
        partnerem i vědomějším člověkem.
      </p>

      {/* ── Block 3 — text left, image right ──────────────── */}

      {/* Image: top=1463px→76.198vw, left=1019px→53.073vw */}
      <div
        style={{
          position: "absolute",
          top: "76.198vw",
          left: "53.073vw",
          width: "26.354vw",
          height: "28.646vw",
          borderRadius: "clamp(1rem, 2.344vw, 45px)",
          backgroundColor: "#d9d9d9",
        }}
        role="img"
        aria-label="Fotografie"
      />

      {/* Text: top=1637px→85.26vw, left=calc(50%-555px)→calc(50%-28.906vw) */}
      <p
        style={{
          position: "absolute",
          top: "85.26vw",
          left: "calc(50% - 28.906vw)",
          width: "21.354vw",
          fontFamily: "var(--font-gabarito), sans-serif",
          fontWeight: 400,
          fontSize: "clamp(0.875rem, 0.9375vw, 1.125rem)",
          lineHeight: "normal",
          color: "#000",
          margin: 0,
        }}
      >
        Výcvik v individuálním koučování (QED Group, 2024), vedený Radvanem
        Bahbouhem a akreditovaný u EMCC, byl přirozeným pokračováním mojí
        růstové cesty. Práce s klienty mi dala ještě větší respekt k procesu, ve
        kterém si člověk hledá vlastní odpovědi. Aktuálně navazuji výcvikem v
        týmovém koučování a facilitaci (QED Group, 2026), abych mohl pracovat i
        s dynamikou týmů, nejen jednotlivců.
      </p>
    </section>
  );
}
