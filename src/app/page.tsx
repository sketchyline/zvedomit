import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { WhyZvedomit } from "@/components/sections/WhyZvedomit";
import { MyJourney } from "@/components/sections/MyJourney";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

/*
 * Bloby jsou pozicovány v 1920px koordinátovém systému (jako ve Figmě).
 * Horizontálně: left: calc(50% - 960px + cx)  →  centrováno na stránce
 * Vertikálně: top v % výšky stránky (odhadnuto ze sekčních výšek)
 */
function Blob({
  cx,
  top,
  size,
  color,
}: {
  cx: number;
  top: string;
  size: number;
  color: string;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top,
        left: `calc(50% - 960px + ${cx}px)`,
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
      {/* Blob layer — pod obsahem */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 0 }}
      >
        {/* 1. Zelený, vlevo — mezi Proč koučování a Osobní příběh */}
        <Blob cx={257} top="37%" size={936} color="#EBFFF4" />
        {/* 2. Modrý, vpravo — uprostřed timeline */}
        <Blob cx={1643} top="50%" size={868} color="#EBFFFE" />
        {/* 3. Zelený, vlevo — u nadpisu Reference */}
        <Blob cx={214} top="66%" size={952} color="#EBFFF4" />
        {/* 4. Modrý, vlevo — pod fotografií/logem M, částečně pod patičkou */}
        <Blob cx={249} top="95%" size={1300} color="#EBFFFE" />
        {/* 5. Zelený, vpravo — pod fotografií/logem M, částečně pod patičkou */}
        <Blob cx={1607} top="95%" size={1272} color="#EBFFF4" />
      </div>

      {/* Content layer — nad bloby */}
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
