"use client";

/**
 * Section – Contact
 *
 * Pixel-perfect against Figma 1920×1080 canvas (node 23:503).
 * All positions in vw: px / 1920 * 100
 *
 *   Label:          top=121px→6.302vw    left=265px→var(--px)
 *   H2:             top=180px→9.375vw    left=265px→var(--px)   font=96px→5vw
 *   Body copy:      top=448px→23.333vw   left=265px→var(--px)   w=408px→21.25vw
 *
 *   Contact details (right column):
 *     TELEFON label: top=448px→23.333vw   left=calc(50%+145px)→calc(50%+7.552vw)
 *     Phone value:   top=478px→24.896vw
 *     EMAIL label:   top=448px→23.333vw   left=calc(50%+425px)→calc(50%+22.135vw)
 *     Email value:   top=478px→24.896vw
 *     WHATSAPP label:top=532px→27.708vw   left=calc(50%+145px)→calc(50%+7.552vw)
 *     WhatsApp value:top=562px→29.271vw
 *
 *   Section h: 981px→51.094vw (footer starts immediately after)
 */
export function Contact() {
  return (
    <section
      id="contact"
      style={{
        position: "relative",
        width: "100%",
        height: "clamp(30rem, 51.094vw, 981px)",
        backgroundColor: "#fff",
      }}
    >
      {/* ── Label ──────────────────────────────────────────────
          Figma: top=121px, left=265px                          */}
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
        Kontakt
      </p>

      {/* ── Heading ────────────────────────────────────────────
          Figma: top=180px, left=265px, Medium 96px             */}
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
        Pojďme
        <br />
        si promluvit
      </h2>

      {/* ── Body copy ──────────────────────────────────────────
          Figma: top=448px, left=265px, w=408px, Regular 18px   */}
      <div
        style={{
          position: "absolute",
          top: "23.333vw",
          left: "var(--px)",
          width: "21.25vw",
          fontFamily: "var(--font-gabarito), sans-serif",
          fontWeight: 400,
          fontSize: "clamp(0.875rem, 0.9375vw, 1.125rem)",
          lineHeight: "normal",
          color: "#000",
        }}
      >
        <p style={{ margin: 0 }}>
          Je čas na změnu, ať už v práci nebo v osobním životě? Začít s něčím,
          co delší dobu odkládáte, přitom vlastně ani nevíte proč?
        </p>
        <p style={{ margin: "1.333em 0 0" }}>
          Nebo si jen potřebujete utřídit myšlenky a ujasnit, co je pro vás
          teď důležité?
        </p>
        <p style={{ margin: "1.333em 0 0" }}>
          Ozvěte se. První setkání je prostorem, kde získáte všechny informace
          pro rozhodnutí, jestli vám spolupráce se mnou dává smysl.
        </p>
      </div>

      {/* ── Contact details — right column ─────────────────────
          Figma: TELEFON + EMAIL on same row, WHATSAPP below    */}

      {/* TELEFON — top=448px, left=calc(50%+145px) */}
      <div
        style={{
          position: "absolute",
          top: "23.333vw",
          left: "calc(50% + 7.552vw)",
          fontFamily: "var(--font-gabarito), sans-serif",
          fontSize: "clamp(0.875rem, 0.9375vw, 1.125rem)",
          lineHeight: "normal",
          color: "#000",
        }}
      >
        <p style={{ margin: 0, fontWeight: 700 }}>TELEFON</p>
        <a
          href="tel:+420737649994"
          style={{
            display: "block",
            marginTop: "1.563vw",
            fontWeight: 400,
            color: "#000",
            textDecoration: "none",
          }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = "0.6")}
          onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
        >
          +420 737 649 994
        </a>
      </div>

      {/* EMAIL — top=448px, left=calc(50%+425px) */}
      <div
        style={{
          position: "absolute",
          top: "23.333vw",
          left: "calc(50% + 22.135vw)",
          fontFamily: "var(--font-gabarito), sans-serif",
          fontSize: "clamp(0.875rem, 0.9375vw, 1.125rem)",
          lineHeight: "normal",
          color: "#000",
        }}
      >
        <p style={{ margin: 0, fontWeight: 700 }}>EMAIL</p>
        <a
          href="mailto:majer.vojta@gmail.com"
          style={{
            display: "block",
            marginTop: "1.563vw",
            fontWeight: 400,
            color: "#000",
            textDecoration: "none",
          }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = "0.6")}
          onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
        >
          majer.vojta@gmail.com
        </a>
      </div>

      {/* WHATSAPP — top=532px, left=calc(50%+145px) */}
      <div
        style={{
          position: "absolute",
          top: "27.708vw",
          left: "calc(50% + 7.552vw)",
          fontFamily: "var(--font-gabarito), sans-serif",
          fontSize: "clamp(0.875rem, 0.9375vw, 1.125rem)",
          lineHeight: "normal",
          color: "#000",
        }}
      >
        <p style={{ margin: 0, fontWeight: 700 }}>WHATSAPP</p>
        <a
          href="https://wa.me/420737649994"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            marginTop: "1.563vw",
            fontWeight: 400,
            color: "#000",
            textDecoration: "none",
          }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = "0.6")}
          onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Napište mi a domluvíme se
        </a>
      </div>
    </section>
  );
}
