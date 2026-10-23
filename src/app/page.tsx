import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Services } from "@/components/sections/Services";
import { Benefits } from "@/components/sections/Benefits";
import { Methodology } from "@/components/sections/Methodology";
import { Collaborations } from "@/components/sections/Collaborations";
import { About } from "@/components/sections/About";
import { Difference } from "@/components/sections/Difference";
import { CtaBand } from "@/components/sections/CtaBand";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="contenido">
        <Hero />
        <TrustBar />
        <Services />
        <Benefits />
        <Methodology />
        <Collaborations />
        <About />
        <Difference />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
