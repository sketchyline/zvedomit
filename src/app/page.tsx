import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { WhyZvedomit } from "@/components/sections/WhyZvedomit";
import { MyJourney } from "@/components/sections/MyJourney";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

/*
 * Bloby jsou pozicovány v koordinátovém systému Figma designu.
 * Horizontálně: left: calc(50% - halfWidth + cx)
 *   Desktop: halfWidth=960  (design 1920px)
 *   Mobil:   halfWidth=201  (design 402px)
 * Vertikálně: top v % výšky stránky (cy / výška SVG)
 */
function Blob({
  cx,
  top,
  size,
  color,
  halfWidth = 960,
}: {
  cx: number;
  top: string;
  size: number;
  color: string;
  halfWidth?: number;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top,
        left: `calc(50% - ${halfWidth}px + ${cx}px)`,
        width: size,
        height: size,
        transform: "translate(-50%, -50%)",
        borderRadius: "50%",
        background: color,
        filter: "blur(80px)",
        pointerEvents: "none",
      }}
    />
  );
}

export default function Home() {
  return (
    <div className="relative">

      {/* ── Desktop blob layer (md+) ── */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 0 }}
      >
        {/* 1. Zelený, vlevo — mezi Proč koučování a Osobní příběh */}
        <Blob cx={257} top="37%" size={936} color="#EBFFF4" />
        {/* 2. Modrý, vpravo — uprostřed timeline */}
        <Blob cx={1643} top="50%" size={868} color="#EBFFFE" />
        {/* 3. Zelený, vlevo — u nadpisu Reference */}
        <Blob cx={214} top="66%" size={952} color="#EBFFF4" />
        {/* 4. Modrý, vlevo — pod fotografií/logem M */}
        <Blob cx={249} top="95%" size={1300} color="#EBFFFE" />
        {/* 5. Zelený, vpravo — pod fotografií/logem M */}
        <Blob cx={1607} top="95%" size={1272} color="#EBFFF4" />
      </div>

      {/* ── Mobile blob layer (do md) ── */}
      {/* SVG design: 402 × 4034px → halfWidth=201, top = cy/4034 */}
      <div
        aria-hidden="true"
        className="md:hidden absolute inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 0 }}
      >
        {/* 1. Zelený, vlevo — cy=377 → 9% */}
        <Blob cx={100} top="9%" size={466} color="#EBFFF4" halfWidth={201} />
        {/* 2. Modrý, vpravo — cy=1256 → 31% */}
        <Blob cx={401} top="31%" size={555} color="#EBFFFE" halfWidth={201} />
        {/* 3. Zelený, vlevo — cy=2062 → 51% */}
        <Blob cx={46} top="51%" size={419} color="#EBFFF4" halfWidth={201} />
        {/* 4. Zelený, vpravo — cy=3420 → 85% */}
        <Blob cx={419} top="85%" size={588} color="#EBFFF4" halfWidth={201} />
        {/* 5. Modrý, vlevo — cy=3611 → 90% */}
        <Blob cx={0} top="90%" size={555} color="#EBFFFE" halfWidth={201} />
      </div>

      {/* ── Content layer — nad bloby ── */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navigation />
        <main>
          <Hero />
          <WhyZvedomit />
          <MyJourney />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
