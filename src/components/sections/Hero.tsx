"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const bubbles = [
  "Jen si to potřebujete ZVĚDOMIT.",
  "Koučování vám dá prostor zastavit se, uvědomit si, rozhodnout se.",
  "Nejlepší rada je totiž ta, kterou si dáte sami.",
];

// Pro column layout (md–xl) — bubliny jsou pod foldem
function ColumnBubble({ text, delay }: { text: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="w-[280px] bg-white/90 rounded-card shadow-bubble flex items-center py-4 px-3"
    >
      {visible
        ? <p className="text-body text-left animate-bubble-in" style={{ animationDelay: `${delay}ms` }}>{text}</p>
        : <p className="text-body text-left opacity-0">{text}</p>
      }
    </div>
  );
}

const BUBBLE_SCROLL_STEP = 220;
// Výška navu na desktopu: logo 33px + py-4 (2×16px) = 65px
const NAV_HEIGHT = 65;
// Výška navu na mobilu: logo 26px + py-4 (2×16px) = 58px
const NAV_HEIGHT_MOBILE = 58;
// Extra scroll prostor pro mobilní bubliny (thresholds: 80, 200, 350px)
const MOBILE_EXTRA_SCROLL = 450;

export function Hero() {
  const [visibleCount, setVisibleCount] = useState(0);
  const stickyWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const startY = window.scrollY;

    function update() {
      const desktopEl = stickyWrapperRef.current;

      if (desktopEl && desktopEl.offsetHeight > 0) {
        // Desktop: měřím jak daleko se sticky wrapper posunul za horní hranu viewportu
        const scrolledIn = Math.max(0, -desktopEl.getBoundingClientRect().top);
        setVisibleCount(
          [1, 2, 3].filter((_, i) => scrolledIn >= (i + 1) * BUBBLE_SCROLL_STEP).length
        );
      } else {
        // Mobil: stickyWrapper je display:none, takže getBoundingClientRect vrací nuly
        // Místo toho používám delta od výchozí pozice scrollu
        const delta = Math.max(0, window.scrollY - startY);
        setVisibleCount([80, 200, 350].filter((t) => delta >= t).length);
      }
    }

    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const extraScroll = BUBBLE_SCROLL_STEP * 3 + 100;

  return (
    <>
      {/* ─── MOBILE (below md) — sticky wrapper drží hero na místě dokud přiletí všechny bubliny ─── */}
      <div
        className="md:hidden"
        style={{ height: `calc(100vw * 765 / 403 + ${MOBILE_EXTRA_SCROLL}px)` }}
      >
        <section
          className="relative w-full overflow-hidden bg-background"
          style={{
            aspectRatio: "403 / 765",
            position: "sticky",
            top: `${NAV_HEIGHT_MOBILE}px`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img aria-hidden="true" src="/Hero Background.svg" alt=""
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img aria-hidden="true" src="/hero_background_logo.svg" alt=""
            className="absolute pointer-events-none select-none"
            style={{ left: "3.47%", top: "29.15%", width: "94.54%" }} />
          {/* Fotka nad bublinou 0 (z-20) */}
          <div className="absolute z-20" style={{ left: "1.99%", top: "35.95%", width: "95.78%" }}>
            <Image src="/vojta_standing 1.png" alt="Vojtěch Majer, kouč zvědomit"
              width={658} height={836} className="w-full h-auto" priority />
          </div>
          <h1 className="absolute inset-x-0 text-h1-mobile font-medium text-foreground text-center"
            style={{ top: "7.58%" }}>
            Máte to<br />v sobě
          </h1>
          {/* Bublina 0 — za hlavou (z-[1], pod fotkou) */}
          {visibleCount > 0 && (
            <div className="absolute z-[1] bg-white/90 rounded-[13px] shadow-bubble py-3 px-3 animate-bubble-in"
              style={{ left: "27.5%", top: "31.76%", width: "41.94%" }}>
              <p className="text-[13px] leading-snug text-left">{bubbles[0]}</p>
            </div>
          )}
          {visibleCount > 1 && (
            <div className="absolute z-10 bg-white/90 rounded-[13px] shadow-bubble py-3 px-3 animate-bubble-in"
              style={{ left: "3.97%", top: "74.12%", width: "41.94%" }}>
              <p className="text-[13px] leading-snug text-left">{bubbles[1]}</p>
            </div>
          )}
          {visibleCount > 2 && (
            <div className="absolute z-10 bg-white/90 rounded-[13px] shadow-bubble py-3 px-3 animate-bubble-in"
              style={{ left: "53.8%", top: "60.92%", width: "41.94%" }}>
              <p className="text-[13px] leading-snug text-left">{bubbles[2]}</p>
            </div>
          )}
          <div className="absolute left-0 right-0 bottom-0 z-30 pointer-events-none"
            style={{ height: "30%", background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)" }} />
        </section>
      </div>

      {/* ─── DESKTOP — sticky scroll wrapper ─── */}
      {/* Výška wrapperu = výška sekce + extra scroll prostor pro bubliny */}
      <div
        ref={stickyWrapperRef}
        className="hidden md:block"
        style={{ height: `calc(100vh - ${NAV_HEIGHT}px + ${extraScroll}px)` }}
      >
        {/* sticky top = výška navu → sekce okamžitě přilne a nehýbe se */}
        <section
          className="overflow-hidden bg-background"
          style={{
            position: "sticky",
            top: `${NAV_HEIGHT}px`,
            height: `calc(100vh - ${NAV_HEIGHT}px)`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img aria-hidden="true" src="/Hero Background.svg" alt=""
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img aria-hidden="true" src="/hero_background_logo.svg" alt=""
            className="absolute left-1/2 -translate-x-1/2 top-[clamp(60px,8vw,140px)] w-[57%] pointer-events-none select-none" />

          <div className="relative z-10 flex flex-col items-center pt-10 px-[var(--px)] h-full">
            <h1 className="font-medium text-foreground text-center text-h1 w-full">
              Máte to v sobě
            </h1>

            {/* Photo + absolute xl+ bubbles */}
            <div className="relative mx-auto mt-6 w-full max-w-[clamp(280px,36vw,580px)]">
              <Image src="/vojta_standing 1.png" alt="Vojtěch Majer, kouč zvědomit"
                width={658} height={836} className="relative z-10 w-full h-auto" priority />

              {visibleCount > 0 && (
                <div className="hidden xl:flex absolute left-[-34%] top-[60%] z-0 w-[280px] bg-white/90 rounded-card shadow-bubble items-center py-4 px-3 animate-bubble-in">
                  <p className="text-body text-left">{bubbles[0]}</p>
                </div>
              )}
              {visibleCount > 1 && (
                <div className="hidden xl:flex absolute left-[71%] top-[39%] z-20 w-[280px] bg-white/90 rounded-card shadow-bubble items-center py-4 px-3 animate-bubble-in">
                  <p className="text-body text-left">{bubbles[1]}</p>
                </div>
              )}
              {visibleCount > 2 && (
                <div className="hidden xl:flex absolute left-[83%] top-[69%] z-20 w-[280px] bg-white/90 rounded-card shadow-bubble items-center py-4 px-3 animate-bubble-in">
                  <p className="text-body text-left">{bubbles[2]}</p>
                </div>
              )}
            </div>

            {/* Column bubbles — md to xl */}
            <div className="xl:hidden flex flex-col gap-3 mt-6 pb-12">
              {bubbles.map((text, i) => (
                <ColumnBubble key={text} text={text} delay={i * 150} />
              ))}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
            style={{ height: "60px", background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)" }} />
        </section>
      </div>
    </>
  );
}
