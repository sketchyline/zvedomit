import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { WhyZvedomit } from "@/components/sections/WhyZvedomit";
import { MyJourney } from "@/components/sections/MyJourney";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <WhyZvedomit />
        <MyJourney />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
