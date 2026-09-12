import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Archivo() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-svh px-6 pt-32 pb-24 md:px-10">
        <h1 className="font-display text-5xl italic text-ink md:text-7xl">
          Archivo
        </h1>
        <p className="mt-6 max-w-lg text-ink-dim">
          Página de ejemplo para listar proyectos, publicaciones o piezas de
          archivo. Sustituye este contenido por tu propia colección.
        </p>
      </main>
      <Footer />
    </>
  );
}
