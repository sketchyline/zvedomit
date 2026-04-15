/* eslint-disable @next/next/no-img-element */
"use client";

/**
 * Footer — black rounded card (node 34:52)
 *
 * Pixel-perfect against Figma 1920×1080 canvas.
 * All positions in vw: px / 1920 * 100  (footer-div-relative)
 *
 *   Footer wrapper:  h≈666px→34.688vw   bg-white
 *   Black card:      top=68px→3.542vw   left=30px→1.563vw
 *                    w=1846px→96.146vw  h=550px→28.646vw  r=45px→2.344vw
 *
 *   Logo:            top≈136px→7.073vw  left=258px→13.4375vw  w≈270px→14.063vw
 *
 *   Nav links:       top=134px→6.979vw  left=calc(50%+389px)→calc(50%+20.26vw)
 *   Social links:    top=134px→6.979vw  left=calc(50%+591px)→calc(50%+30.781vw)
 *   Link gap:        41px→2.135vw
 *
 *   Tagline:         top=366px→19.063vw left=calc(50%-735px)→calc(50%-38.281vw)
 *                    w=1456px→75.833vw  font=80px→4.167vw
 *
 *   Bottom bar:      top=581px→30.26vw
 *     Copyright:     left=258px→13.4375vw
 *     Podmínky:      left=1384px→72.083vw
 *     Cookies:       left=1533px→79.844vw
 */

const IMG_FOOTER_LOGO =
  "https://www.figma.com/api/mcp/asset/76c2ea3c-a0f6-40f6-b81a-61700371310a";

// top values pre-computed (134px + n×41px) / 1920 * 100 vw
// 134→6.979  175→9.115  216→11.25  257→13.385
const navLinks = [
  { label: "Úvod",           href: "#hero",         bold: true,  top: "6.979vw"  },
  { label: "Proč koučování", href: "#why-coaching", bold: false, top: "9.115vw"  },
  { label: "Osobní příběh",  href: "#my-story",     bold: false, top: "11.25vw"  },
  { label: "Kontakt",        href: "#contact",      bold: false, top: "13.385vw" },
];

const socialLinks = [
  { label: "Instagram", href: "#", top: "9.115vw"  },
  { label: "Facebook",  href: "#", top: "11.25vw"  },
  { label: "LinkedIn",  href: "#", top: "13.385vw" },
];

const baseLink: React.CSSProperties = {
  fontFamily: "var(--font-gabarito), sans-serif",
  fontSize: "clamp(0.875rem, 0.9375vw, 1.125rem)",
  lineHeight: "normal",
  color: "#fff",
  textDecoration: "none",
  transition: "opacity 0.2s",
};

export function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        width: "100%",
        height: "clamp(20rem, 34.688vw, 666px)",
        backgroundColor: "#fff",
        overflow: "hidden",
      }}
    >
      {/* ── Black card ─────────────────────────────────────────
          top=68px→3.542vw  left=30px→1.563vw
          1846×550px        r=45px→2.344vw                     */}
      <div
        style={{
          position: "absolute",
          top: "3.542vw",
          left: "1.563vw",
          width: "96.146vw",
          height: "28.646vw",
          borderRadius: "clamp(1.25rem, 2.344vw, 45px)",
          backgroundColor: "#000",
        }}
      />

      {/* ── Footer logo ────────────────────────────────────────
          top≈136px→7.073vw  left=258px→13.4375vw  w≈270px    */}
      <a
        href="#"
        style={{ position: "absolute", top: "7.073vw", left: "13.4375vw" }}
      >
        <img
          src={IMG_FOOTER_LOGO}
          alt="zvědomit"
          style={{
            width: "clamp(7rem, 14.063vw, 270px)",
            height: "auto",
            display: "block",
          }}
        />
      </a>

      {/* ── Nav links ──────────────────────────────────────────
          top=134px→6.979vw  left=calc(50%+389px)→calc(50%+20.26vw)
          gap=41px→2.135vw                                      */}
      <nav aria-label="Patička — navigace">
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            style={{
              ...baseLink,
              position: "absolute",
              top: link.top,
              left: "calc(50% + 20.26vw)",
              fontWeight: link.bold ? 700 : 400,
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = "0.6")}
            onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* ── Social links ───────────────────────────────────────
          top=134px→6.979vw  left=calc(50%+591px)→calc(50%+30.781vw)
          gap=41px→2.135vw                                      */}
      <p
        style={{
          ...baseLink,
          position: "absolute",
          top: "6.979vw",
          left: "calc(50% + 30.781vw)",
          fontWeight: 700,
          margin: 0,
        }}
      >
        Sledujte mě
      </p>
      {socialLinks.map((link, i) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...baseLink,
            position: "absolute",
            top: link.top,
            left: "calc(50% + 30.781vw)",
            fontWeight: 400,
          }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = "0.6")}
          onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
        >
          {link.label}
        </a>
      ))}

      {/* ── Tagline ────────────────────────────────────────────
          top=366px→19.063vw  centred, forced to one line       */}
      <p
        style={{
          position: "absolute",
          top: "19.063vw",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-gabarito), sans-serif",
          fontWeight: 400,
          fontSize: "clamp(1.5rem, 4.167vw, 5rem)",
          lineHeight: "normal",
          color: "#fff",
          margin: 0,
          whiteSpace: "nowrap",
        }}
      >
        Nejlepší rada je totiž ta, kterou si dáte sami.
      </p>

      {/* ── Bottom bar ─────────────────────────────────────────
          top=581px→30.26vw
          Copyright: left=258px→13.4375vw
          Podmínky:  left=1384px→72.083vw
          Cookies:   left=1533px→79.844vw                       */}
      <p
        style={{
          position: "absolute",
          top: "30.26vw",
          left: "13.4375vw",
          fontFamily: "var(--font-roboto), sans-serif",
          fontWeight: 400,
          fontSize: 14,
          lineHeight: 1.5,
          color: "#fff",
          margin: 0,
        }}
      >
        © 2026 Zvědomit. Všechna práva vyhrazena.
      </p>
      {/* Podmínky + Cookies — flex row so they never overlap */}
      <div
        style={{
          position: "absolute",
          top: "30.26vw",
          right: "4.063vw", // mirrors card right margin (1920-1846-30=44px → 44/1920=2.292vw + inner padding)
          display: "flex",
          gap: 24,
          fontFamily: "var(--font-roboto), sans-serif",
          fontWeight: 400,
          fontSize: 14,
          lineHeight: 1.5,
        }}
      >
        <a
          href="#"
          style={{ color: "#fff", textDecoration: "underline" }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = "0.6")}
          onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Podmínky používání
        </a>
        <a
          href="#"
          style={{ color: "#fff", textDecoration: "underline" }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = "0.6")}
          onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Nastavení cookies
        </a>
      </div>
    </footer>
  );
}
