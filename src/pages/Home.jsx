import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import Features from "../components/sections/Features";
import Templates from "../components/sections/Templates";
import CTA from "../components/sections/CTA";
import Footer from "../components/layout/Footer";
import Pricing from "../components/sections/Pricing";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <div id="features">
        <Features />
      </div>
      <div id="pricing">
        <Pricing />
      </div>
      <div id="contact">
        <CTA />
      </div>
      <Footer />
    </>
  );
}
