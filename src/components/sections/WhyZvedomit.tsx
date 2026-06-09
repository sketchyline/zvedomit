import Image from "next/image";

interface FeatureCardProps {
  icon: string;
  heading: string;
  body: string;
  bg: string;
}

function FeatureCard({ icon, heading, body, bg }: FeatureCardProps) {
  return (
    <div className={`${bg} rounded-3xl lg:rounded-[45px] p-6 lg:p-8 flex flex-col gap-3`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={icon} alt="" aria-hidden="true" className="w-8 h-8" />
      <p className="font-bold text-base lg:text-[20px] leading-snug">{heading}</p>
      <p className="text-[14px] lg:text-body leading-relaxed text-foreground">{body}</p>
    </div>
  );
}

const featureCards = [
  {
    icon: "/question_mark_icon.svg",
    heading:
      "Stalo se vám už, že po dosažení nějakého cíle přišla menší radost, než jste očekávali?",
    body: "Koučování pomáhá být přítomnější ve způsobu, jakým přemýšlíte a rozhodujete se už po cestě — místo abyste čekali na radost až za dalším milníkem.",
    bg: "bg-accent-teal",
  },
  {
    icon: "/brain_icon.svg",
    heading:
      "Do koučování přináším kombinaci strukturovaného myšlení, empatie a klidné přítomnosti.",
    body: "Vytvářím bezpečný prostor pro otevřenost. Nevedu vás svou cestou. Pomáhám vám najít tu vaši — a zároveň vás vybavit nástroji, jak na ní být spokojenější a příště si umět poradit sami.",
    bg: "bg-surface",
  },
  {
    icon: "/center_arrow_icon.svg",
    heading: "Koučování jako personalizovaný kurz zvyšování všímavosti",
    body: "K sobě, vlastním pocitům, tomu, co vás pohání, a tomu, co vás naopak brzdí. Pomocí přesně mířených otázek a koučovacích technik vám pomohu najít kroky vpřed, které vycházejí z vašich hodnot a přesvědčení. Pomohu vám zachytit vaše AHA momenty a dát jim směr.",
    bg: "bg-accent-green",
  },
];

export function WhyZvedomit() {
  return (
    <section id="proc-koucovani" className="bg-background py-20 lg:py-28">
      <div className="px-5 lg:px-[var(--px)]">
        <div className="lg:grid lg:grid-cols-[3fr_2fr] lg:gap-12 lg:items-start">

          {/* Left column: eyebrow + heading + photo */}
          <div>
            <p className="text-[13px] lg:text-[15px] uppercase tracking-[0.15em] font-normal text-foreground mb-3 lg:mb-4">
              PROČ KOUČOVÁNÍ
            </p>
            <h2 className="text-h2 font-medium text-foreground leading-tight mb-8 lg:mb-10">
              Cesta ke&nbsp;štěstí?<br />Cesta je&nbsp;štěstí.
            </h2>
            <div className="flex justify-center lg:justify-start">
              <Image
                src="/vojta_why_coaching_pic.png"
                alt="Vojtěch Majer — kouč"
                width={503}
                height={611}
                className="w-full max-w-[400px] lg:max-w-[500px] h-auto rounded-3xl lg:rounded-[45px]"
              />
            </div>
          </div>

          {/* Right column: 3 feature cards */}
          <div className="mt-10 lg:mt-0">
            {/* Mobile: horizontal swipe */}
            <div className="lg:hidden -mx-5 px-5 scroll-pl-5 flex gap-4 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
              {featureCards.map((card) => (
                <div key={card.icon} className="snap-start shrink-0 w-[80vw]">
                  <FeatureCard {...card} />
                </div>
              ))}
            </div>
            {/* Desktop: vertical stack */}
            <div className="hidden lg:flex flex-col gap-5">
              {featureCards.map((card) => (
                <FeatureCard key={card.icon} {...card} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
