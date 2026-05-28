import Image from "next/image";

interface TimelineItemData {
  number: number;
  icon: string;
  color: "teal" | "green";
  text: string;
}

const timelineItems: TimelineItemData[] = [
  {
    number: 1,
    icon: "/smile_icon.svg",
    color: "teal",
    text: "Už během studia na VŠE jsem se věnoval hraní pokeru, od kterého jsem se později dostal k proprietary tradingu v investiční bance Wood & Company. Obě prostředí mají společné jedno — práci s nejistotou, tlakem a emocemi. Velmi brzy jsem pochopil, že pokud se v nich chci dlouhodobě pohybovat, musím vědomě pracovat sám na sobě.",
  },
  {
    number: 2,
    icon: "/graph_icon.svg",
    color: "green",
    text: "Z pozice tradera jsem se posunul do role vedoucího operativy tradingu v Quantlane. Pečuji o firemní vztahy, podporuji tradery v jejich rozvoji a propojuji je s týmem vývojářů. Koučovací principy využívám denně — empatii, kladení přesných otázek a schopnost zachytit to podstatné, i když to třeba není na první pohled vidět.",
  },
  {
    number: 3,
    icon: "/bulb_icon.svg",
    color: "teal",
    text: "Postupně jsem začal vnímat, že koučování neovlivňuje jen jednu oblast života, ale proměňuje způsob, jakým člověk přemýšlí a funguje napříč rolemi, které v životě má. Pomohlo mi to přijmout roli otce, ve které jsem si zpočátku nebyl jistý a spíš v ní trpěl, narovnat svůj vztah k alkoholu a učit se být lepším partnerem i vědomějším člověkem.",
  },
  {
    number: 4,
    icon: "/study_icon.svg",
    color: "green",
    text: "Výcvik v individuálním koučování (QED Group, 2024), vedený Radvanem Bahbouhem a akreditovaný u EMCC, byl přirozeným pokračováním mojí růstové cesty. Práce s klienty mi dala ještě větší respekt k procesu, ve kterém si člověk hledá vlastní odpovědi.",
  },
  {
    number: 5,
    icon: "/play_icon.svg",
    color: "teal",
    text: "Aktuálně navazuji výcvikem v týmovém koučování a facilitaci (QED Group, 2026), abych mohl pracovat i s dynamikou týmů, nejen jednotlivců.",
  },
];

function TimelineItem({ item }: { item: TimelineItemData }) {
  const numColor = item.color === "teal" ? "text-accent-teal" : "text-accent-green";

  return (
    <div className="w-full lg:max-w-[27rem]">
      {/* Icon — centrovaná nad odstavcem */}
      <div className="flex justify-center mb-3 lg:mb-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.icon} alt="" aria-hidden="true" className="w-8 h-8" />
      </div>

      {/* Odstavec + číslo v pozadí, spodní hrana za prvním řádkem */}
      <div className="relative isolate">
        <span
          className={`absolute left-0 -z-10 text-[9.4rem] lg:text-[14rem] font-medium leading-none select-none pointer-events-none ${numColor}`}
          style={{ bottom: "calc(100% - 3.5rem)" }}
          aria-hidden="true"
        >
          {item.number}
        </span>
        <p className="text-[14px] lg:text-body leading-relaxed text-foreground">
          {item.text}
        </p>
      </div>
    </div>
  );
}

export function MyJourney() {
  return (
    <section id="osobni-pribeh" className="relative bg-background py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Teal background blob top-left */}
      <div
        className="pointer-events-none absolute -z-10"
        style={{
          left: 0,
          top: 0,
          width: "clamp(300px, 40vw, 700px)",
          height: "clamp(300px, 40vw, 700px)",
          background: "radial-gradient(ellipse at top left, #EBFFFE 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="px-5 lg:px-[var(--px)]">

        {/* Eyebrow */}
        <p className="text-center text-[13px] lg:text-[15px] uppercase tracking-[0.15em] font-normal text-foreground mb-3 lg:mb-4">
          OSOBNÍ PŘÍBĚH
        </p>

        {/* Heading */}
        <h2 className="text-[3rem] lg:text-h2 font-medium text-foreground text-center leading-tight mb-10 lg:mb-14">
          Moje cesta
        </h2>

        {/* Quote block — avatar fixed-width left, text column right with quotes at its edges */}
        <blockquote className="flex flex-col lg:flex-row lg:items-center lg:gap-[5rem] mb-16 lg:mb-24">
          <Image
            src="/story_pic.png"
            alt="Vojtěch Majer"
            width={202}
            height={202}
            className="rounded-full w-[140px] h-[140px] lg:w-[202px] lg:h-[202px] object-cover mx-auto lg:mx-0 mb-3 lg:mb-0 flex-shrink-0"
          />
          <div className="lg:flex-1 lg:max-w-[52rem]">
            <span
              className="block text-[4rem] lg:text-[6rem] font-extrabold leading-none mb-1 lg:mb-4 text-foreground"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <p className="text-h3 font-normal text-foreground leading-snug text-center lg:text-left">
              Strávil jsem desítky hodin v koučování a terapii, které mi pomohly najít udržitelnou cestu v práci i k sobě samému. Výcvik a následná práce s klienty pak ještě víc proměnily způsob, jakým přemýšlím o sobě, vztazích i životě obecně.
            </p>
            <span
              className="block text-[4rem] lg:text-[6rem] font-extrabold leading-none text-right mt-3 lg:mt-4 text-foreground"
              aria-hidden="true"
            >
              &rdquo;
            </span>
          </div>
        </blockquote>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop center line SVG */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/timeline.svg"
            alt=""
            aria-hidden="true"
            className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 h-full w-auto pointer-events-none select-none"
          />

          <ol
            className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-12"
            aria-label="Časová osa osobní cesty"
          >
            {timelineItems.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <li
                  key={item.number}
                  className={isLeft ? "lg:col-start-1 lg:pr-8 lg:flex lg:justify-end" : "lg:col-start-2 lg:pl-8"}
                  style={{ gridRow: i + 1 }}
                >
                  <TimelineItem item={item} />
                </li>
              );
            })}
          </ol>
        </div>

      </div>
    </section>
  );
}
