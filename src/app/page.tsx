import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { WhyZvedomit } from "@/components/sections/WhyZvedomit";
import { MyJourney } from "@/components/sections/MyJourney";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <WhyZvedomit />
        <MyJourney />
      </main>
    </>
  );
}
