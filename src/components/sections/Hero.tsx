import Image from "next/image";

const bubbles = [
  "Jen si to potřebujete ZVĚDOMIT.",
  "Koučování vám dá prostor zastavit se, uvědomit si, rozhodnout se.",
  "Nejlepší rada je totiž ta, kterou si dáte sami.",
];

export function Hero() {
  return (
    <>
      {/* ─── MOBILE (below md) ─── */}
      {/* Proportions match the Figma 403×765 frame exactly via aspect-ratio */}
      <section
        className="md:hidden relative w-full overflow-hidden bg-background"
        style={{ aspectRatio: "403 / 765" }}
      >
        {/* Background blobs */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          aria-hidden="true"
          src="/Hero Background.svg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        />

        {/* Watermark M — SVG already has fill-opacity 0.1 built in */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          aria-hidden="true"
          src="/hero_background_logo.svg"
          alt=""
          className="absolute pointer-events-none select-none"
          style={{ left: "3.47%", top: "29.15%", width: "94.54%" }}
        />

        {/* Photo — fills exactly to the bottom of the frame */}
        <div
          className="absolute"
          style={{ left: "1.99%", top: "35.95%", width: "95.78%" }}
        >
          <Image
            src="/vojta_standing 1.png"
            alt="Vojtěch Majer, kouč zvědomit"
            width={658}
            height={836}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Headline */}
        <h1
          className="absolute inset-x-0 text-h1-mobile font-medium text-foreground text-center"
          style={{ top: "7.58%" }}
        >
          Máte to<br />v sobě
        </h1>

        {/* Bubble 1 — left, just above photo top */}
        <div
          className="absolute z-10 bg-white/90 rounded-[13px] shadow-bubble py-3 px-3"
          style={{ left: "27.5%", top: "31.76%", width: "41.94%" }}
        >
          <p className="text-[13px] leading-snug text-left">{bubbles[0]}</p>
        </div>

        {/* Bubble 2 — right, over photo */}
        <div
          className="absolute z-10 bg-white/90 rounded-[13px] shadow-bubble py-3 px-3"
          style={{ left: "53.8%", top: "60.92%", width: "41.94%" }}
        >
          <p className="text-[13px] leading-snug text-left">{bubbles[2]}</p>
        </div>

        {/* Bubble 3 — left, over photo lower */}
        <div
          className="absolute z-10 bg-white/90 rounded-[13px] shadow-bubble py-3 px-3"
          style={{ left: "3.97%", top: "74.12%", width: "41.94%" }}
        >
          <p className="text-[13px] leading-snug text-left">{bubbles[1]}</p>
        </div>

        {/* Bottom fade + blur */}
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            top: "89.54%",
            height: "10.46%",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.27) 100%)",
            backdropFilter: "blur(25px)",
          }}
        />
      </section>

      {/* ─── DESKTOP (md and up) ─── */}
      <section className="hidden md:block relative overflow-x-hidden bg-background min-h-screen">
        {/* Background blobs */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          aria-hidden="true"
          src="/Hero Background.svg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        />

        {/* Watermark M */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          aria-hidden="true"
          src="/hero_background_logo.svg"
          alt=""
          className="absolute left-1/2 -translate-x-1/2 top-[clamp(60px,8vw,140px)] w-[57%] pointer-events-none select-none"
        />

        <div className="relative z-10 flex flex-col items-center pt-10 px-[var(--px)]">
          <h1 className="font-medium text-foreground text-center text-h1 w-full">
            Máte to v sobě
          </h1>

          {/* Photo + absolute xl+ bubbles */}
          <div className="relative mx-auto mt-6 w-full max-w-[clamp(280px,36vw,580px)]">
            <Image
              src="/vojta_standing 1.png"
              alt="Vojtěch Majer, kouč zvědomit"
              width={658}
              height={836}
              className="relative z-10 w-full h-auto"
              priority
            />

            <div className="hidden xl:flex absolute left-[-34%] top-[60%] z-0 w-[280px] bg-white/90 rounded-card shadow-bubble items-center py-4 px-3">
              <p className="text-body text-left">{bubbles[0]}</p>
            </div>
            <div className="hidden xl:flex absolute left-[71%] top-[39%] z-20 w-[280px] bg-white/90 rounded-card shadow-bubble items-center py-4 px-3">
              <p className="text-body text-left">{bubbles[1]}</p>
            </div>
            <div className="hidden xl:flex absolute left-[83%] top-[69%] z-20 w-[280px] bg-white/90 rounded-card shadow-bubble items-center py-4 px-3">
              <p className="text-body text-left">{bubbles[2]}</p>
            </div>
          </div>

          {/* Column bubbles — md to xl */}
          <div className="xl:hidden flex flex-col gap-3 mt-6 pb-12">
            {bubbles.map((text) => (
              <div
                key={text}
                className="w-[280px] bg-white/90 rounded-card shadow-bubble flex items-center py-4 px-3"
              >
                <p className="text-body text-left">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
