/* eslint-disable @next/next/no-img-element */
"use client";

/**
 * Section – Testimonials
 *
 * Pixel-perfect against Figma 1920×1080 canvas.
 * All positions in vw: px / 1920 * 100
 *
 *   Label:   top=121px→6.302vw   left=265px→var(--px)
 *   H2:      top=180px→9.375vw   left=265px→var(--px)
 *
 *   Cards (3×): top=470px→24.479vw  w=397px→20.677vw  h=482px→25.104vw  r=45px→2.344vw
 *     Card 1 (Anna):  left=341px→17.76vw
 *     Card 2 (Zuzka): left=761px→39.635vw   ← active by default
 *     Card 3 (Marek): left=1181px→61.51vw
 *
 *   Inside each card (section-relative):
 *     Quote mark:  top=470px=24.479vw   left varies  font=128px→6.667vw
 *     Stars:       top=527px=27.448vw   left varies  w=130px→6.771vw
 *     Body text:   top=568px=29.583vw   left varies  w=317px→16.51vw
 *     Name/Role:   top=879px=45.781vw   left varies
 *
 *   Carousel: top=994px→51.771vw  left btn=871px→45.365vw  right btn=969px→50.469vw
 *   Section h: ~1154px→60.1vw
 */

import { useState } from "react";

/* Figma MCP assets */
const IMG_STARS =
  "https://www.figma.com/api/mcp/asset/8bffda7f-3689-4acd-8753-6fcc03c217b7";
const IMG_BTN_CIRCLE =
  "https://www.figma.com/api/mcp/asset/33c7b784-3b9b-4332-a0aa-82a65ce9cad3";
const IMG_ARROW_LEFT =
  "https://www.figma.com/api/mcp/asset/3cc78b06-9e06-4fbb-9e86-893b27c6c14b";
const IMG_BTN_RIGHT =
  "https://www.figma.com/api/mcp/asset/96c0ded4-faaa-4798-bfe6-f64ff01a9284";
const IMG_ARROW_RIGHT =
  "https://www.figma.com/api/mcp/asset/f417894f-2eca-4a23-9322-43f078369ef0";

const QUOTE =
  "Vojtu jsem potkala, když jsem se ocitla na křižovatce a potřebovala učinit životní rozhodnutí, na které jsem těžko sbírala odvahu. Velice příjemným, inteligentním a nenásilným způsobem mi pomohl zodpovědět si všechny potřebné otázky a vyloučit strachy, které mi toto rozhodnutí bránily učinit. Za tuto zkušenost jsem velice vděčná a doporučila bych ji všem, kteří mají pocit, že by se v životě někam rádi posunuli, ale neví zatím přesně, kterou stezkou se v upřímnosti k sobě samému vydat.";

/* Per-card section-relative horizontal positions */
const cards = [
  {
    name: "ANNA M.",
    role: "architektka",
    quote: QUOTE,
    cardLeft: "17.76vw",         // 341px
    quoteLeft: "calc(50% - 30.208vw)", // calc(50%-580px)
    starsLeft: "29.74vw",        // 571px
    contentLeft: "calc(50% - 30vw)",   // calc(50%-576px)
  },
  {
    name: "ZUZKA Š.",
    role: "podnikatelka a investorka",
    quote: QUOTE,
    cardLeft: "39.635vw",        // 761px
    quoteLeft: "calc(50% - 8.333vw)",  // calc(50%-160px)
    starsLeft: "51.615vw",       // 991px
    contentLeft: "calc(50% - 8.125vw)", // calc(50%-156px)
  },
  {
    name: "MAREK Z.",
    role: "podnikatel a designer",
    quote: QUOTE,
    cardLeft: "61.51vw",         // 1181px
    quoteLeft: "calc(50% + 13.542vw)", // calc(50%+260px)
    starsLeft: "73.49vw",        // 1411px
    contentLeft: "calc(50% + 13.75vw)", // calc(50%+264px)
  },
];

export function Testimonials() {
  // offset = index of the card currently shown in the LEFT slot.
  // Centre slot (index 1 relative to offset) is always the active card.
  const [offset, setOffset] = useState(0);

  const prev = () => setOffset((o) => (o - 1 + cards.length) % cards.length);
  const next = () => setOffset((o) => (o + 1) % cards.length);

  // Cards in display order: left, centre (active), right
  const visible = [0, 1, 2].map((i) => cards[(offset + i) % cards.length]);

  return (
    <section
      id="testimonials"
      style={{
        position: "relative",
        width: "100%",
        height: "clamp(35rem, 60.1vw, 1154px)",
        backgroundColor: "#fff",
      }}
    >
      {/* ── Label ──────────────────────────────────────────────
          Figma: top=121px, left=265px (var(--px))             */}
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
        Reference
      </p>

      {/* ── Heading ────────────────────────────────────────────
          Figma: top=180px, left=265px, Medium 96px            */}
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
        Upřímná zpětná
        <br />
        vazba od klientů
      </h2>

      {/* ── Cards ─────────────────────────────────────────── */}
      {visible.map((card, i) => (
        <div key={`${card.name}-${i}`}>
          {/* Card border box */}
          <div
            style={{
              position: "absolute",
              top: "24.479vw",
              left: card.cardLeft,
              width: "20.677vw",
              height: "25.104vw",
              border: "1px solid #000",
              borderRadius: "clamp(1rem, 2.344vw, 45px)",
              backgroundColor: "#fff",
            }}
          />

          {/* Quote mark — top=470px=24.479vw, font Bold 128px */}
          <p
            style={{
              position: "absolute",
              top: "24.479vw",
              left: card.quoteLeft,
              fontFamily: "var(--font-gabarito), sans-serif",
              fontWeight: 700,
              fontSize: "clamp(3rem, 6.667vw, 8rem)",
              lineHeight: "normal",
              color: "#000",
              margin: 0,
            }}
            aria-hidden
          >
            &ldquo;
          </p>

          {/* Stars — top=527px=27.448vw, w=130px=6.771vw */}
          <img
            src={IMG_STARS}
            alt="hodnocení"
            style={{
              position: "absolute",
              top: "27.448vw",
              left: card.starsLeft,
              width: "6.771vw",
              height: "auto",
            }}
          />

          {/* Body text — top=568px=29.583vw, w=317px=16.51vw */}
          <p
            style={{
              position: "absolute",
              top: "29.583vw",
              left: card.contentLeft,
              width: "16.51vw",
              fontFamily: "var(--font-gabarito), sans-serif",
              fontWeight: 400,
              fontSize: "clamp(0.75rem, 0.9375vw, 1.125rem)",
              lineHeight: "normal",
              color: "#000",
              margin: 0,
            }}
          >
            {card.quote}
          </p>

          {/* Name + Role — top=879px=45.781vw */}
          <div
            style={{
              position: "absolute",
              top: "45.781vw",
              left: card.contentLeft,
              fontFamily: "var(--font-gabarito), sans-serif",
              fontSize: "clamp(0.75rem, 0.9375vw, 1.125rem)",
              lineHeight: "normal",
              color: "#000",
            }}
          >
            <p style={{ margin: 0, fontWeight: 700 }}>{card.name}</p>
            <p style={{ margin: 0, fontWeight: 400 }}>{card.role}</p>
          </div>

          {/* Inactive overlay — centre slot (i === 1) is always active */}
          {i !== 1 && (
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: "24.479vw",
                left: card.cardLeft,
                width: "20.677vw",
                height: "25.104vw",
                borderRadius: "clamp(1rem, 2.344vw, 45px)",
                backgroundColor: "rgba(255,255,255,0.72)",
                pointerEvents: "none",
              }}
            />
          )}
        </div>
      ))}

      {/* ── Carousel controls ──────────────────────────────────
          Figma: top=994px→51.771vw
          Left btn: left=871px→45.365vw
          Right btn: left=969px→50.469vw                       */}

      {/* Left button */}
      <button
        onClick={prev}
        aria-label="Předchozí"
        style={{
          position: "absolute",
          top: "51.771vw",
          left: "45.365vw",
          width: "4.167vw",
          height: "4.167vw",
          minWidth: 48,
          minHeight: 48,
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
        }}
      >
        <img
          src={IMG_BTN_CIRCLE}
          alt=""
          aria-hidden
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", transform: "rotate(180deg)" }}
        />
        <img
          src={IMG_ARROW_LEFT}
          alt=""
          aria-hidden
          style={{
            position: "absolute",
            top: "35%", left: "41.25%",
            width: "17.5%", height: "28.75%",
            transform: "rotate(180deg)",
          }}
        />
      </button>

      {/* Right button */}
      <button
        onClick={next}
        aria-label="Další"
        style={{
          position: "absolute",
          top: "51.771vw",
          left: "50.469vw",
          width: "4.167vw",
          height: "4.167vw",
          minWidth: 48,
          minHeight: 48,
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
        }}
      >
        <img
          src={IMG_BTN_RIGHT}
          alt=""
          aria-hidden
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
        <img
          src={IMG_ARROW_RIGHT}
          alt=""
          aria-hidden
          style={{
            position: "absolute",
            top: "36.25%", left: "41.25%",
            width: "17.5%", height: "29%",
          }}
        />
      </button>
    </section>
  );
}
