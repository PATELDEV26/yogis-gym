import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Playground from "@/components/Playground";
import Stats from "@/components/Stats";
import Facilities from "@/components/Facilities";
import Pricing from "@/components/Pricing";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import ParallaxSection from "@/components/ParallaxSection";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <ParallaxSection />
      <Playground />
      <Stats />
      <div id="facilities">
        <Facilities />
      </div>
      <div id="pricing">
        <Pricing />
      </div>
      <Gallery />
      <div id="contact">
        <Contact />
      </div>
      <Marquee />
      <Footer />
    </main>
  );
}
