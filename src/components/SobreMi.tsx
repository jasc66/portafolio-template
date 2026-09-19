import Link from "next/link";
import { sobreMi } from "@/data/site";

// Delay escalonado por letra (ms) para que el color se propague letra por
// letra en vez de cambiar todo el bloque a la vez.
const LETTER_STEP_MS = 30;

export default function SobreMi() {
  const letters = sobreMi.heading.split("");

  return (
    <section
      id="sobre-mi"
      className="flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center md:px-10 md:py-32"
    >
      <Link
        href="/archivo"
        aria-label={`${sobreMi.heading} — ver archivo completo`}
        className="group flex w-fit flex-col items-center"
      >
        <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.08em] text-ink-dim transition-colors group-hover:text-ink">
          Consulta {sobreMi.heading}
        </h2>
        <span className="font-poster text-[20vw] uppercase leading-[0.8] tracking-wide text-ink-dim md:text-[12vw]">
          {letters.map((letter, i) => (
            <span
              key={i}
              aria-hidden="true"
              style={{ transitionDelay: `${i * LETTER_STEP_MS}ms` }}
              className="inline-block transition-colors duration-200 group-hover:text-ink"
            >
              {letter === " " ? " " : letter}
            </span>
          ))}
          <span className="sr-only">{sobreMi.heading}</span>
        </span>

        {/* Figura decorativa: rombo que gira e invierte color en hover */}
        <span
          aria-hidden="true"
          className="mt-8 h-6 w-6 rotate-45 border-2 border-ink-dim transition-all duration-300 group-hover:rotate-[225deg] group-hover:border-ink group-hover:bg-ink md:h-8 md:w-8"
        />

        <span className="mt-8 flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-ink-dim transition-colors group-hover:text-ink">
          Ver archivo
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </Link>
    </section>
  );
}
