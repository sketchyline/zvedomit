/* eslint-disable @next/next/no-img-element */

/**
 * Hero — full-viewport section.
 *
 * All positions are expressed as percentages of the hero container
 * (width=100vw, height=100vh) matching the Figma 1920×1080 canvas exactly:
 *
 *   horizontal % = x / 1920 * 100
 *   vertical   % = y / 1080 * 100
 *
 * Font sizes scale with vw: px / 1920 * 100 vw
 *   128px → 6.667vw  |  18px → 0.9375vw
 */

const IMG_BG =
  "https://www.figma.com/api/mcp/asset/0bdafe6c-f792-42d1-b842-ed92e5e6d0b4";
const IMG_M =
  "https://www.figma.com/api/mcp/asset/3122489f-628f-4f12-a995-2cd0a4ea4e99";
const IMG_PORTRAIT = "/Hero%20Portrait.png";

export function Hero() {
  return (
    <section
      id="hero"
      style={{ position: "relative", width: "100%", height: "100vh", minHeight: 600, overflow: "hidden" }}
    >
      {/* ── Background gradient (Mask group) ──────────────────
          Figma: 1920×1080, left=0, top=0                      */}
      <img
        src={IMG_BG}
        alt=""
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />

      {/* ── Background M lettermark ───────────────────────────
          Figma: x=402 y=217.9 w=1116 h=858 at 1920×1080
          → left=20.94%  top=20.18%  width=58.125%          */}
      <img
        src={IMG_M}
        alt=""
        aria-hidden
        style={{
          position: "absolute",
          top: "20.18%",
          left: "20.94%",
          width: "58.125%",
          height: "auto",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
      />

      {/* ── Headline ──────────────────────────────────────────
          Figma: left=calc(50%-421px), top=100px (9.26%)
          Font: Gabarito Medium 128px → 6.667vw               */}
      <h1
        style={{
          position: "absolute",
          top: "9.26%",
          left: "calc(50% - 21.927vw)",
          fontFamily: "var(--font-gabarito), sans-serif",
          fontWeight: 500,
          fontSize: "6.667vw",
          lineHeight: "normal",
          color: "#000",
          whiteSpace: "nowrap",
          margin: 0,
        }}
      >
        Máte to v&nbsp;sobě
      </h1>

      {/* ── Subtext ───────────────────────────────────────────
          Figma: left=calc(50%-252px)→36.875%, top=263px→24.35%
          width=517px→26.93%, Font: Gabarito Regular 18px→0.9375vw */}
      <div
        style={{
          position: "absolute",
          top: "24.35%",
          left: "calc(50% - 13.125vw)",
          width: "26.927vw",
          fontFamily: "var(--font-gabarito), sans-serif",
          fontWeight: 400,
          fontSize: "0.9375vw",
          lineHeight: "normal",
          color: "#000",
        }}
      >
        <p style={{ margin: 0 }}>
          Odpovědi, směr, sílu, motivaci. Jen si to potřebujete zvědomit.
        </p>
        <p style={{ margin: 0 }}>
          Koučování vám dá prostor zastavit se, uvědomit si, rozhodnout se.
        </p>
        <p style={{ margin: 0 }}>
          Nepřináším řešení, pomáhám vám najít ta vaše. Nejlepší rada je totiž
          ta, kterou si dáte sami.
        </p>
      </div>

      {/* ── Hero portrait ─────────────────────────────────────
          Center-bottom anchored; section overflow:hidden crops
          cleanly at the section's bottom edge.                 */}
      <img
        src={IMG_PORTRAIT}
        alt="Vojtěch Majer – kouč"
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          height: "65.19vh",
          width: "auto",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 1,
        }}
      />

      {/* ── Bottom fade — do ztracena ─────────────────────────
          Tall smooth dissolve from transparent into the
          background colour so both portrait and M lettermark
          melt into the section below with no hard edge.       */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "45%",
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.55) 60%, rgba(255,255,255,0.85) 80%, rgba(255,255,255,1) 100%)",
          pointerEvents: "none",
        }}
      />
    </section>
  );
}
