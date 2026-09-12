import { llamados } from "@/data/site";
import CollectiveBackground from "@/components/CollectiveBackground";

export default function LlamadosColectivos() {
  return (
    <section className="relative isolate flex flex-col justify-center overflow-hidden border-t border-line bg-bg-raised px-6 py-24 text-accent-on-dark md:px-10 md:py-32">
      <CollectiveBackground />
      <div className="relative z-10">
        <h2 className="mb-12 font-display text-3xl uppercase tracking-[0.03em] text-accent-on-dark md:text-4xl">
          Llamados colectivos
        </h2>
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.08em] text-white/70">
              Iniciativas
            </h3>
            <ul className="flex flex-col gap-3">
              {llamados.iniciativas.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="underline-link text-lg text-white transition-colors hover:text-accent-on-dark"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.08em] text-white/70">
              Eventos
            </h3>
            <ul className="flex flex-col gap-3">
              {llamados.eventos.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="underline-link text-lg text-white transition-colors hover:text-accent-on-dark"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
