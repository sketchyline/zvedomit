import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WhyCoaching } from "@/components/WhyCoaching";
import { MyStory } from "@/components/MyStory";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhyCoaching />
        <MyStory />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
