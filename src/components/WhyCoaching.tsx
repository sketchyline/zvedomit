/**
 * Section – Why Coaching
 *
 * Pixel-perfect against Figma 1920×1080 canvas.
 * All positions converted to vw: px / 1920 * 100
 *
 *   Label:        top=121px→6.302vw   left=265px→var(--px)
 *   H2:           top=180px→9.375vw   left=265px→var(--px)   font=96px→5vw
 *   Body:         top=180px→9.375vw   left=calc(50%+285px)→calc(50%+14.844vw)  w=410px→21.354vw
 *   Placeholder:  top=483px→25.156vw  left=405px→21.094vw    w=503px→26.198vw  h=611px→31.823vw
 *   Section h:    ~1174px→61.15vw
 */
export function WhyCoaching() {
  return (
    <section
      id="why-coaching"
      style={{
        position: "relative",
        width: "100%",
        height: "clamp(40rem, 61.15vw, 1174px)",
        backgroundColor: "#fff",
      }}
    >
      {/* ── Label ──────────────────────────────────────────────
          Figma: top=121px, left=265px (= var(--px))           */}
      <p
        style={{
          position: "absolute",
          top: "6.302vw",
          left: "var(--px)",
          fontFamily: "var(--font-gabarito), sans-serif",
          fontWeight: 400,
          fontSize: "clamp(0.875rem, 0.9375vw, 1.125rem)",
          lineHeight: "normal",
          color: "#000",
          textTransform: "uppercase",
          margin: 0,
        }}
      >
        Proč koučování
      </p>

      {/* ── Heading ────────────────────────────────────────────
          Figma: top=180px, left=265px, font Medium 96px       */}
      <h2
        style={{
          position: "absolute",
          top: "9.375vw",
          left: "var(--px)",
          fontFamily: "var(--font-gabarito), sans-serif",
          fontWeight: 500,
          fontSize: "clamp(2.25rem, 5vw, 6rem)",
          lineHeight: "normal",
          color: "#000",
          margin: 0,
        }}
      >
        Cesta ke štěstí?
        <br />
        Cesta je štěstí.
      </h2>

      {/* ── Body copy ──────────────────────────────────────────
          Figma: top=180px, left=calc(50%+285px), w=410px      */}
      <div
        style={{
          position: "absolute",
          top: "9.375vw",
          left: "calc(50% + 14.844vw)",
          width: "21.354vw",
          fontFamily: "var(--font-gabarito), sans-serif",
          fontWeight: 400,
          fontSize: "clamp(0.875rem, 0.9375vw, 1.125rem)",
          lineHeight: "normal",
          color: "#000",
        }}
      >
        <p style={{ margin: 0 }}>
          Stalo se vám už, že po dosažení nějakého cíle přišla menší radost,
          než jste očekávali? Koučování pomáhá být přítomnější ve způsobu,
          jakým přemýšlíte a rozhodujete se už po cestě — místo abyste čekali
          na radost až za dalším milníkem.
        </p>
        <p style={{ margin: "1.333em 0 0" }}>
          Do koučování přináším kombinaci strukturovaného myšlení, empatie a
          klidné přítomnosti. Vytvářím bezpečný prostor pro otevřenost. Nevedu
          vás svou cestou. Pomáhám vám najít tu vaši — a zároveň vás vybavit
          nástroji, jak na ní být spokojenější a příště si umět poradit sami.
        </p>
        <p style={{ margin: "1.333em 0 0" }}>
          Koučování je personalizovaný kurz zvyšování všímavosti — k sobě,
          vlastním pocitům, tomu, co vás pohání, a tomu, co vás naopak brzdí.
          Pomocí přesně mířených otázek a koučovacích technik vám pomohu najít
          kroky vpřed, které vycházejí z vašich hodnot a přesvědčení. Pomohu
          vám zachytit vaše AHA momenty a dát jim směr.
        </p>
      </div>

      {/* ── Image placeholder ──────────────────────────────────
          Figma: top=483px, left=405px, w=503px, h=611px, r=45px */}
      <div
        style={{
          position: "absolute",
          top: "25.156vw",
          left: "21.094vw",
          width: "26.198vw",
          height: "31.823vw",
          borderRadius: "clamp(1rem, 2.344vw, 45px)",
          backgroundColor: "#d9d9d9",
        }}
        role="img"
        aria-label="Ilustrační fotografie"
      />
    </section>
  );
}
