import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Declaracion from "@/components/Declaracion";
import Intereses from "@/components/Intereses";
import Proyectos from "@/components/Proyectos";
import MarqueeBand from "@/components/MarqueeBand";
import SobreMi from "@/components/SobreMi";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Declaracion />
        <Intereses />
        <Proyectos />
        <MarqueeBand />
        <SobreMi />
      </main>
      <Footer />
    </>
  );
}
