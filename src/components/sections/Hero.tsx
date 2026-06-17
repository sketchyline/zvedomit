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

      {/* ─── DESKTOP ─── */}
      <section
        className="hidden md:block relative overflow-hidden bg-background"
        style={{ height: `calc(100vh - ${NAV_HEIGHT}px)` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img aria-hidden="true" src="/Hero Background.svg" alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img aria-hidden="true" src="/hero_background_logo.svg" alt=""
          className="absolute left-1/2 -translate-x-1/2 top-[clamp(60px,8vw,140px)] w-[57%] pointer-events-none select-none" />

        {/* Heading + md–xl photo + md–xl column bubbles */}
        <div className="relative z-10 flex flex-col items-center pt-10 px-[var(--px)] h-full">
          <h1 className="font-medium text-foreground text-center text-h1 w-full">
            Máte to v sobě
          </h1>

          {/* Photo — md to xl (in flow, above column bubbles) */}
          <div className="xl:hidden relative mx-auto mt-6 w-full max-w-[clamp(280px,36vw,660px)]">
            <div
              className="w-full overflow-hidden"
              style={{ maxHeight: `calc(100vh - ${NAV_HEIGHT}px - 11rem)` }}
            >
              <Image src="/vojta_standing_2.png" alt="Vojtěch Majer, kouč zvědomit"
                width={2528} height={1684} className="relative z-10 w-full h-auto object-cover object-[45%_top]"
                style={{ aspectRatio: "658/836" }} priority />
            </div>
          </div>

          {/* Column bubbles — md to xl */}
          <div className="xl:hidden flex flex-col gap-3 mt-6 pb-12">
            {bubbles.map((text, i) => (
              <div key={text} className="w-[280px] bg-white/90 rounded-card shadow-bubble flex items-center py-4 px-3 animate-bubble-in"
                style={{ animationDelay: `${BUBBLE_DELAYS[i]}ms` }}>
                <p className="text-body text-left">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Photo + xl+ bubbles — absolute bottom-0, vždy přilne ke spodní hraně hero */}
        <div
          className="hidden xl:block absolute bottom-0 left-1/2 -translate-x-1/2 z-10 w-[clamp(280px,36vw,660px)]"
        >
          {/* max-height zabrání překryvu nadpisu na krátkých viewportech */}
          <div
            className="w-full overflow-hidden"
            style={{ maxHeight: `calc(100vh - ${NAV_HEIGHT}px - 11rem)` }}
          >
            <Image src="/vojta_standing_2.png" alt="Vojtěch Majer, kouč zvědomit"
              width={2528} height={1684} className="relative z-10 w-full h-auto object-cover object-[45%_top]"
              style={{ aspectRatio: "658/836" }} priority />
          </div>

          <div className="absolute left-[-34%] top-[60%] z-0 w-[280px] bg-white/90 rounded-card shadow-bubble flex items-center py-4 px-3 animate-bubble-in"
            style={{ animationDelay: `${BUBBLE_DELAYS[0]}ms` }}>
            <p className="text-body text-left">{bubbles[0]}</p>
          </div>
          <div className="absolute left-[71%] top-[39%] z-20 w-[280px] bg-white/90 rounded-card shadow-bubble flex items-center py-4 px-3 animate-bubble-in"
            style={{ animationDelay: `${BUBBLE_DELAYS[1]}ms` }}>
            <p className="text-body text-left">{bubbles[1]}</p>
          </div>
          <div className="absolute left-[83%] top-[69%] z-20 w-[280px] bg-white/90 rounded-card shadow-bubble flex items-center py-4 px-3 animate-bubble-in"
            style={{ animationDelay: `${BUBBLE_DELAYS[2]}ms` }}>
            <p className="text-body text-left">{bubbles[2]}</p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
          style={{ height: "60px", background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)" }} />
      </section>
    </>
  );
}
