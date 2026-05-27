import Image from "next/image";

interface SpeechBubbleProps {
  text: string;
  className?: string;
}

function SpeechBubble({ text, className = "" }: SpeechBubbleProps) {
  return (
    <div className={`bg-white/90 rounded-card shadow-bubble w-[280px] flex items-center justify-center py-4 px-3 ${className}`}>
      <p className="text-body text-left">{text}</p>
    </div>
  );
}

const bubbles = [
  "Jen si to potřebujete ZVĚDOMIT.",
  "Koučování vám dá prostor zastavit se, uvědomit si, rozhodnout se.",
  "Nejlepší rada je totiž ta, kterou si dáte sami.",
];

export function Hero() {
  return (
    <section className="relative overflow-x-hidden bg-background min-h-screen">

      {/* Colorful background blobs */}
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
        className="absolute hidden md:block left-1/2 -translate-x-1/2 top-[clamp(60px,8vw,140px)] w-[57%] pointer-events-none select-none"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        aria-hidden="true"
        src="/hero_background_logo.svg"
        alt=""
        className="absolute md:hidden left-0 top-[clamp(100px,12vw,200px)] w-full pointer-events-none select-none"
      />

      <div className="relative z-10 flex flex-col items-center pt-10 px-5 md:px-[var(--px)]">

        {/* Headline */}
        <h1 className="font-medium text-foreground text-center text-h1 w-full">
          Máte to<br className="md:hidden" /> v sobě
        </h1>

        {/* Photo container — relative so absolute bubbles position against it */}
        <div className="relative mx-auto mt-6 w-full max-w-[clamp(280px,36vw,580px)]">
          <Image
            src="/vojta_standing 1.png"
            alt="Vojtěch Majer, kouč zvědomit"
            width={658}
            height={836}
            className="relative z-10 w-full h-auto"
            priority
          />

          {/* Desktop absolute bubbles — xl+ only */}
          <SpeechBubble
            text={bubbles[0]}
            className="hidden xl:block absolute left-[-34%] top-[60%] z-0"
          />
          <SpeechBubble
            text={bubbles[1]}
            className="hidden xl:block absolute left-[71%] top-[39%] z-20"
          />
          <SpeechBubble
            text={bubbles[2]}
            className="hidden xl:block absolute left-[83%] top-[69%] z-20"
          />
        </div>

        {/* Column bubbles — mobile and tablet (below xl) */}
        <div className="xl:hidden flex flex-col gap-3 mt-6 pb-12">
          {bubbles.map((text) => (
            <SpeechBubble key={text} text={text} />
          ))}
        </div>

      </div>
    </section>
  );
}
