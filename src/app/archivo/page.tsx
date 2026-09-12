import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { archivo, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Sobre mí | Alonso Salguero Ceballos",
  description:
    "Proyectos institucionales, herramientas open source, proyectos personales y trayectoria profesional de Alonso Salguero Ceballos.",
};

export default function ArchivoIndice() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 text-[11px] uppercase tracking-wider md:px-10">
        <Link href="/" className="underline-link font-mono font-medium text-ink hover:text-accent">
          <span aria-hidden="true">←</span> Inicio
        </Link>
        <p className="font-mono text-ink-dim">{site.name}</p>
      </header>
      <main id="main-content" className="min-h-svh px-6 pt-32 pb-24 md:px-10">
        <div className="grid gap-10 md:grid-cols-[auto_1fr] md:gap-16">
          <div className="md:sticky md:top-32 md:max-w-xs md:self-start">
            <h1 className="font-display text-5xl uppercase text-ink md:text-7xl">
              Sobre mí
            </h1>
            <p className="mt-6 max-w-lg text-ink-dim">
              El archivo completo: proyectos institucionales, herramientas
              open source, proyectos personales y trayectoria profesional.
            </p>
          </div>

          <ul className="flex flex-col divide-y divide-line border-t border-line">
            {archivo.map((grupo) => (
              <li key={grupo.slug}>
                <Link
                  href={`/archivo/${grupo.slug}`}
                  className="group flex items-baseline gap-6 py-8 transition-colors hover:text-accent"
                >
                  <span className="font-mono text-sm text-ink-dim">{grupo.number}</span>
                  <span className="flex-1">
                    <h2 className="font-display text-2xl uppercase tracking-tight text-ink group-hover:text-accent md:text-3xl">
                      {grupo.heading}
                    </h2>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-dim">
                      {grupo.intro}
                    </p>
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-mono text-xs uppercase tracking-wider text-ink-dim transition-transform group-hover:translate-x-1"
                  >
                    Ver →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
