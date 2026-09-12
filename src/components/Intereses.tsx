import Link from "next/link";
import { intereses } from "@/data/site";

// Offsets horizontales por palabra, para que el título se vea "desalineado"
// en vez de un bloque de texto centrado — igual que la referencia.
const WORD_OFFSETS = ["-10%", "12%", "-8%"];

// Cuadros decorativos por tarjeta: posición + si quedan por encima (z-10) o
// por debajo (z-0) de la imagen cuando aparece.
const SQUARES = [
  [
    { className: "top-[28%] right-[20%] z-10 h-14 w-14 md:h-16 md:w-16" },
    { className: "top-[42%] left-[16%] z-10 h-10 w-10 md:h-12 md:w-12" },
    { className: "bottom-[26%] left-[24%] h-12 w-12 rotate-90 md:h-14 md:w-14" },
  ],
  [
    { className: "top-[30%] left-[18%] z-10 h-12 w-12 md:h-14 md:w-14" },
    { className: "bottom-[32%] right-[14%] h-10 w-10 md:h-12 md:w-12" },
  ],
  [
    { className: "top-[24%] right-[8%] z-10 h-12 w-12 md:h-14 md:w-14" },
    { className: "bottom-[28%] left-[8%] z-10 h-14 w-14 md:h-16 md:w-16" },
    { className: "bottom-[20%] left-[16%] h-10 w-10 md:h-12 md:w-12" },
  ],
];

export default function Intereses() {
  return (
    <section id="intereses" className="bg-bg-raised text-accent-on-dark">
      <h2 className="sr-only">Intereses</h2>
      <ol className="grid grid-cols-1 md:grid-cols-3">
        {intereses.map((item, i) => (
          <li key={item.number} className="group relative">
            <Link
              href={item.href}
              aria-label={item.title}
              className="relative flex h-[70svh] w-full flex-col items-center justify-center overflow-hidden md:h-[85svh] focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-on-dark focus-visible:outline-offset-4"
            >
              <h3 className="sr-only">{item.title}</h3>

              {/* Imagen de fondo: oculta hasta hover/focus, ocupa toda la celda */}
              <span className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-visible:opacity-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.alt}
                  className="h-full w-full object-cover grayscale contrast-125"
                />
              </span>

              {/* Cuadros decorativos */}
              {SQUARES[i]?.map((sq, si) => (
                <span
                  key={si}
                  aria-hidden="true"
                  className={`absolute border-2 border-accent-on-dark transition-transform duration-300 ease-out group-hover:scale-110 ${sq.className}`}
                />
              ))}

              {/* Número, en badge blanco/negro según tema */}
              <span
                aria-hidden="true"
                className="absolute top-[10%] right-[26%] z-10 bg-bg px-2 py-1 font-mono text-sm text-bg-raised md:right-[20%]"
              >
                {item.number}
              </span>

              {/* Título fragmentado en palabras, cada una en su recuadro */}
              <div className="relative z-3 flex flex-col items-center gap-1.5 transition-transform duration-500 ease-out group-hover:scale-[1.08]">
                {item.words.map((word, wi) => (
                  <span
                    key={word}
                    aria-hidden="true"
                    style={{ transform: `translateX(${WORD_OFFSETS[wi % WORD_OFFSETS.length]})` }}
                    className="border border-accent-on-dark bg-bg-raised px-2.5 py-1.5 font-display text-lg uppercase leading-tight text-accent-on-dark transition-colors duration-200 md:text-2xl group-hover:bg-accent-on-dark group-hover:text-bg-raised"
                  >
                    {word}
                  </span>
                ))}
              </div>

              {/* Botón "Ver": aparece con el hover */}
              <span className="relative z-3 mt-6 translate-y-1 bg-accent-on-dark px-4 py-2 font-mono text-xs font-medium uppercase text-bg-raised opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                Ver
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
