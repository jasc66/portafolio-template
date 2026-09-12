import Link from "next/link";
import { intereses } from "@/data/site";

// Offsets horizontales por palabra en reposo, para que el título se vea
// "desalineado" en vez de un bloque de texto centrado — igual que la referencia.
const WORD_OFFSETS = ["-10%", "12%", "-8%"];

// Desplazamiento adicional en hover: cada línea se mueve una distancia y
// dirección propia ("shuffle"), nunca todas para el mismo lado ni la misma
// magnitud — efecto de kevinfonseca.co replicado como mecanismo, no colores.
const HOVER_SHUFFLE_X = ["-32px", "70px", "-45px"];

// Cuadros decorativos por tarjeta: posición + si quedan por encima (z-10) o
// por debajo (z-0) de la imagen cuando aparece. El primer cuadro de cada
// tarjeta es el que aloja el número índice (ver INDEX_POSITION), igual que
// en la referencia, donde el badge queda encajado sobre uno de los cuadros.
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

// Posición del badge del número: coincide con el primer cuadro decorativo
// de cada tarjeta (mismo top/right o top/left), para que quede encajado
// sobre él como en la referencia, en vez de flotar suelto en la esquina.
const INDEX_POSITION = [
  "top-[28%] right-[20%]",
  "top-[30%] left-[18%]",
  "top-[24%] right-[8%]",
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
              className="relative flex h-svh w-full flex-col items-center justify-center overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-on-dark focus-visible:outline-offset-4"
            >
              <h3 className="sr-only">{item.title}</h3>

              {/* Imagen de fondo: oculta hasta hover/focus, ocupa toda la celda */}
              <span className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.38,0.005,0.215,1)] group-hover:opacity-100 group-focus-visible:opacity-100">
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

              {/* Número, en badge blanco/negro según tema — rota 90° en hover.
                  Se posiciona sobre el primer cuadro decorativo de la tarjeta,
                  como en la referencia, en vez de flotar suelto. */}
              <span
                aria-hidden="true"
                className={`index-badge absolute z-20 bg-bg px-3 py-1.5 font-mono text-lg text-bg-raised md:text-xl ${INDEX_POSITION[i]}`}
              >
                {item.number}
              </span>

              {/* Título fragmentado en palabras, cada una en su recuadro.
                  En hover cada línea hace un "shuffle" horizontal independiente
                  (translateX propio por línea) además de invertir sus colores.
                  El transform se controla 100% por CSS custom properties (--x)
                  para que la clase group-hover pueda sobreescribirlo: un inline
                  style con `transform` fijo bloquearía cualquier clase de Tailwind. */}
              <div className="relative z-[3] flex flex-col items-center gap-1.5">
                {item.words.map((word, wi) => (
                  <span
                    key={word}
                    aria-hidden="true"
                    style={
                      {
                        "--x": WORD_OFFSETS[wi % WORD_OFFSETS.length],
                        "--hover-x": HOVER_SHUFFLE_X[wi % HOVER_SHUFFLE_X.length],
                      } as React.CSSProperties
                    }
                    className="word-shuffle border border-accent-on-dark bg-bg-raised px-2.5 py-1.5 font-display text-lg uppercase leading-tight text-accent-on-dark md:text-2xl group-hover:bg-accent-on-dark group-hover:text-bg-raised"
                  >
                    {word}
                  </span>
                ))}
              </div>

              {/* Botón "Ver": aparece con el hover */}
              <span className="relative z-[3] mt-6 translate-y-1 bg-accent-on-dark px-4 py-2 font-mono text-xs font-medium uppercase text-bg-raised opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                Ver
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
