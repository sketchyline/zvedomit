"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  isActive: boolean;
}

const testimonials = [
  {
    quote:
      "S Vojtou jsem navázala spolupráci v dubnu 2024. Absolvovali jsme dva cykly po pěti osobních setkáních a obě série mi opravdu hodně pomohly v ujasnění si nejen kariérního směřování. Od září 2025 jsme pak na moji žádost v pravidelném týdenním kontaktu a systematicky pracujeme na posunu mých záměrů v několika jasně definovaných oblastech. Za ty necelé dva roky jsem se posunula o spoustu kroků dopředu a velkou zásluhu na tom má rozhodně právě Vojta, kterého s radostí doporučuji.",
    author: "Zuzka Š.",
    role: "podnikatelka a investorka",
    rating: 5,
  },
  {
    quote:
      "Vojtu jsem potkala, když jsem se ocitla na křižovatce a potřebovala učinit životní rozhodnutí, na které jsem těžko sbírala odvahu. Velice příjemným, inteligentním a nenásilným způsobem mi pomohl zodpovědět si všechny potřebné otázky a vyloučit strachy, které mi toto rozhodnutí bránily učinit. Za tuto zkušenost jsem velice vděčná a doporučila bych ji všem, kteří mají pocit, že by se v životě někam rádi posunuli, ale neví zatím přesně, kterou stezkou se v upřímnosti k sobě samému vydat.",
    author: "Anna M.",
    role: "architektka",
    rating: 5,
  },
  {
    quote:
      "Naprostý gamechanger v mém uvědomění si toho, co od svého pracovního a soukromého života očekávám. Vojta mi pomohl utřídit myšlenky a nasměrovat správným směrem. Jedním z důležitých aspektů, které mi sezení přinášejí je odbourávání strachu dělat velká rozhodnutí. Cítím se vždy více sebevědomější, klidnější a připravený na další životní výzvy! Navíc vše s Vojtou probíhá naprosto lidsky, přátelsky a od prvního setkání se cítíte komfortně.",
    author: "Marek Z.",
    role: "podnikatel a designer",
    rating: 5,
  },
];

function TestimonialCard({ quote, author, role, isActive }: TestimonialCardProps) {
  return (
    <div className="relative flex-shrink-0 w-[225px] lg:w-[397px]">
      {/* Card bg — inset-0 so it always matches the card's actual height */}
      <div className="absolute inset-0 bg-white border border-foreground rounded-[24px] lg:rounded-image pointer-events-none" />

      {/* Decorative quote mark — absolute, own layer */}
      <span
        className="absolute top-0 left-[22px] lg:left-[39px] text-[4rem] lg:text-[8rem] font-bold leading-none text-foreground select-none pointer-events-none"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* Stars — absolute, own layer */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/stars.svg"
        alt=""
        role="img"
        aria-label="Hodnocení 5 z 5"
        className="absolute top-[26px] left-[130px] w-[74px] lg:top-[57px] lg:left-[230px] lg:w-[130px] h-auto pointer-events-none"
      />

      {/* Content in normal flow — pt pushes text below quote/stars */}
      <div className="relative flex flex-col h-full min-h-[395px] pt-[52px] pb-[18px] px-[22px] lg:min-h-[482px] lg:pt-[98px] lg:pb-[30px] lg:px-[40px]">
        <p className="flex-1 text-[13px] lg:text-body text-foreground">
          {quote}
        </p>
        <cite className="not-italic mt-4 lg:mt-6 flex-shrink-0">
          <span className="block font-bold text-[13px] lg:text-base text-foreground">
            {author}
          </span>
          <span className="block font-normal text-[13px] lg:text-base text-foreground/60">
            {role}
          </span>
        </cite>
      </div>

      {/* Inactive overlay — rgba(255,255,255,0.72) per Figma */}
      {!isActive && (
        <div className="absolute inset-0 rounded-[24px] lg:rounded-image bg-white/[0.72] pointer-events-none" />
      )}
    </div>
  );
}

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(1);
  const total = testimonials.length;

  const prev = () => setActiveIndex((i) => (i - 1 + total) % total);
  const next = () => setActiveIndex((i) => (i + 1) % total);

  const visibleIndices = [
    (activeIndex - 1 + total) % total,
    activeIndex,
    (activeIndex + 1) % total,
  ];

  return (
    <section id="reference" className="bg-background py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="px-5 lg:px-[var(--px)]">

        {/* Header */}
        <div className="flex items-end justify-between mb-7 lg:mb-[60px]">
          <div className="text-center lg:text-left w-full lg:w-auto">
            <p className="text-[13px] lg:text-[15px] uppercase tracking-[0.15em] font-normal text-foreground mb-3 lg:mb-4">
              REFERENCE
            </p>
            <h2 className="text-[3rem] lg:text-h2 font-medium text-foreground leading-tight">
              Zpětná vazba<br />od klientů
            </h2>
          </div>
          <div className="hidden lg:flex gap-3 flex-shrink-0">
            <button
              onClick={prev}
              aria-label="Předchozí recenze"
              className="w-20 h-20 rounded-full bg-foreground text-background flex items-center justify-center hover:opacity-80 transition-opacity duration-150"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={next}
              aria-label="Další recenze"
              className="w-20 h-20 rounded-full bg-foreground text-background flex items-center justify-center hover:opacity-80 transition-opacity duration-150"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>

        {/* Desktop: 3 cards — items-stretch makes all cards the same height */}
        <div className="hidden lg:flex gap-6 justify-center items-stretch">
          {visibleIndices.map((idx, position) => (
            <TestimonialCard
              key={`${idx}-${position}`}
              {...testimonials[idx]}
              isActive={position === 1}
            />
          ))}
        </div>

        {/* Mobile: 1 active card + arrows below */}
        <div className="lg:hidden flex flex-col items-center">
          <TestimonialCard
            key={activeIndex}
            {...testimonials[activeIndex]}
            isActive={true}
          />
          <div className="flex gap-3 mt-6">
            <button
              onClick={prev}
              aria-label="Předchozí recenze"
              className="w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center hover:opacity-80 transition-opacity duration-150"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              aria-label="Další recenze"
              className="w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center hover:opacity-80 transition-opacity duration-150"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
