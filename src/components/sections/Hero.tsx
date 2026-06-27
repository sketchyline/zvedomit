import Image from "next/image";

const bubbles = [
  "Jen si to potřebujete ZVĚDOMIT.",
  "Koučování vám dá prostor zastavit se, uvědomit si, rozhodnout se.",
  "Nejlepší rada je totiž ta, kterou si dáte sami.",
];

const BUBBLE_DELAYS = [500, 900, 1300];

const NAV_HEIGHT = 65;

export function Hero() {
  return (
    <>
      {/* ─── MOBILE (below md) ─── */}
      <section
        className="md:hidden relative w-full overflow-hidden bg-background"
        style={{ aspectRatio: "403 / 765" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img aria-hidden="true" src="/Hero Background.svg" alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img aria-hidden="true" src="/hero_background_logo.svg" alt=""
          className="absolute pointer-events-none select-none"
          style={{ left: "3.47%", top: "29.15%", width: "94.54%" }} />
        <div className="absolute z-20" style={{ left: "1.99%", top: "35.95%", width: "95.78%" }}>
          <Image src="/vojta_standing_2.png" alt="Vojtěch Majer, kouč zvědomit"
            width={2528} height={1684} className="w-full h-auto object-cover object-[45%_top]"
            style={{ aspectRatio: "658/836" }} priority />
        </div>
        <h1 className="absolute inset-x-0 text-h1-mobile font-medium text-foreground text-center"
          style={{ top: "7.58%" }}>
          Máte to<br />v sobě
        </h1>
        {/* Bublina 0 — za hlavou (z-[1], pod fotkou z-20) */}
        <div className="absolute z-[1] bg-white/90 rounded-[13px] shadow-bubble py-3 px-3 animate-bubble-in"
          style={{ left: "27.5%", top: "31.76%", width: "41.94%", animationDelay: `${BUBBLE_DELAYS[0]}ms` }}>
          <p className="text-[13px] leading-snug text-left">{bubbles[0]}</p>
        </div>
        <div className="absolute z-30 bg-white/90 rounded-[13px] shadow-bubble py-3 px-3 animate-bubble-in"
          style={{ left: "3.97%", top: "74.12%", width: "41.94%", animationDelay: `${BUBBLE_DELAYS[1]}ms` }}>
          <p className="text-[13px] leading-snug text-left">{bubbles[1]}</p>
        </div>
        <div className="absolute z-30 bg-white/90 rounded-[13px] shadow-bubble py-3 px-3 animate-bubble-in"
          style={{ left: "53.8%", top: "60.92%", width: "41.94%", animationDelay: `${BUBBLE_DELAYS[2]}ms` }}>
          <p className="text-[13px] leading-snug text-left">{bubbles[2]}</p>
        </div>
        <div className="absolute left-0 right-0 bottom-0 z-30 pointer-events-none"
          style={{ height: "15%", background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)" }} />
      </section>

      {/* ─── DESKTOP (md+) ─── */}
      <section
        className="hidden md:block relative overflow-hidden bg-background"
        style={{ minHeight: `max(calc(100dvh - ${NAV_HEIGHT}px), calc(clamp(280px, 36vw, 660px) * 1.271 + 11rem))` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img aria-hidden="true" src="/Hero Background.svg" alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img aria-hidden="true" src="/hero_background_logo.svg" alt=""
          className="absolute left-1/2 -translate-x-1/2 top-[clamp(60px,8vw,140px)] w-[57%] pointer-events-none select-none" />

        <div className="relative z-10 flex flex-col items-center pt-10 px-[var(--px)]">
          <h1 className="font-medium text-foreground text-center text-h1 w-full">
            Máte to v sobě
          </h1>
        </div>

        {/* Photo + surrounding bubbles — single proportional composition for all md+ */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 w-[clamp(280px,36vw,660px)]"
          style={{ aspectRatio: "658/836", containerType: "inline-size" }}
        >
          {/* relative wrapper = containing block; top:% resolves against photo height */}
          <div className="relative w-full h-full">
            <Image src="/vojta_standing_2.png" alt="Vojtěch Majer, kouč zvědomit"
              width={2528} height={1684} className="relative z-10 w-full h-full object-cover object-[45%_top]"
              priority />

            {/* Bubble 0 — behind photo (z-0) */}
            <div
              className="absolute z-0 bg-white/90 shadow-bubble animate-bubble-in"
              style={{
                left: "max(-60cqw, -220px)",
                top: "76.2cqw",
                width: "min(76cqw, 280px)",
                borderRadius: "min(5.15cqw, 19px)",
                padding: "min(4.3cqw, 16px) min(3.25cqw, 12px)",
                fontSize: "min(4.9cqw, 18px)",
                lineHeight: "1.5",
                animationDelay: `${BUBBLE_DELAYS[0]}ms`,
              }}
            >
              <p className="text-left">{bubbles[0]}</p>
            </div>

            {/* Bubble 1 — in front of photo (z-20) */}
            <div
              className="absolute z-20 bg-white/90 shadow-bubble animate-bubble-in"
              style={{
                left: "71cqw",
                top: "49.5cqw",
                width: "min(76cqw, 280px)",
                borderRadius: "min(5.15cqw, 19px)",
                padding: "min(4.3cqw, 16px) min(3.25cqw, 12px)",
                fontSize: "min(4.9cqw, 18px)",
                lineHeight: "1.5",
                animationDelay: `${BUBBLE_DELAYS[1]}ms`,
              }}
            >
              <p className="text-left">{bubbles[1]}</p>
            </div>

            {/* Bubble 2 — in front of photo (z-20) */}
            <div
              className="absolute z-20 bg-white/90 shadow-bubble animate-bubble-in"
              style={{
                left: "83cqw",
                top: "87.7cqw",
                width: "min(76cqw, 280px)",
                borderRadius: "min(5.15cqw, 19px)",
                padding: "min(4.3cqw, 16px) min(3.25cqw, 12px)",
                fontSize: "min(4.9cqw, 18px)",
                lineHeight: "1.5",
                animationDelay: `${BUBBLE_DELAYS[2]}ms`,
              }}
            >
              <p className="text-left">{bubbles[2]}</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
          style={{ height: "60px", background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)" }} />
      </section>
    </>
  );
}
