"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { intereses } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

// Offsets horizontales por palabra en reposo, para que el título se vea
// "desalineado" en vez de un bloque de texto centrado.
const WORD_OFFSETS = ["-10%", "12%", "-8%"];

// Desplazamiento adicional en hover: cada línea se mueve una distancia y
// dirección propia ("shuffle"), nunca todas para el mismo lado ni la misma
// magnitud.
const HOVER_SHUFFLE_X = ["-32px", "70px", "-45px"];

// Cuadros decorativos por tarjeta: posición + si quedan por encima (z-10) o
// por debajo (z-0) de la imagen cuando aparece. El primer cuadro de cada
// tarjeta es el que aloja el número índice (ver INDEX_POSITION), de modo
// que el badge queda encajado sobre uno de los cuadros.
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
// sobre él en vez de flotar suelto en la esquina.
const INDEX_POSITION = [
  "top-[28%] right-[20%]",
  "top-[30%] left-[18%]",
  "top-[24%] right-[8%]",
];

// Desfases de margen-izquierdo por línea de título en la versión mobile,
// para que el bloque de texto se vea "marcado a mano" en vez de
// perfectamente alineado.
const LINE_OFFSETS = ["0", "1.5rem", "0.5rem"];

// Nota mobile: el contenedor y cada tarjeta usan `dvh` (dynamic viewport
// height) de forma consistente, nunca mezclado con `vh`/`svh`. La barra de
// direcciones de Safari/Chrome mobile cambia la altura real del viewport al
// aparecer/ocultarse; si el padre mide en una unidad y las tarjetas sticky
// en otra, se desincronizan y aparecen huecos entre tarjetas al hacer
// scroll. Con `dvh` en ambos, se recalculan juntos.
const ACCENTS = [
  ["top-[18%] right-[12%] h-12 w-12", "bottom-[22%] left-[8%] h-8 w-8 rotate-12"],
  ["top-[16%] left-[10%] h-10 w-10 rotate-6", "bottom-[20%] right-[14%] h-14 w-14"],
  ["top-[20%] right-[18%] h-9 w-9 -rotate-6", "bottom-[18%] left-[12%] h-11 w-11"],
];

export default function Intereses() {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = stackRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // El apilado en sí es CSS sticky puro (ver className del <li> mobile
    // abajo). GSAP/ScrollTrigger solo anima el CONTENIDO dentro de cada
    // tarjeta al entrar en viewport — nunca hace pin ni controla el layout.
    // matchMedia() propio de GSAP para que el efecto solo corra en mobile
    // (donde vive el bloque `md:hidden`) y se limpie al cruzar a desktop.
    const mm = gsap.matchMedia();
    mm.add("(max-width: 767px)", () => {
      const cards = root.querySelectorAll<HTMLElement>(".stack-card");
      cards.forEach((card) => {
        const targets = card.querySelectorAll(".stack-reveal");
        if (reducedMotion) {
          gsap.set(targets, { opacity: 1, y: 0 });
          return;
        }
        gsap.set(targets, { opacity: 0, y: 24 });
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      });

      return () => {
        gsap.set(root.querySelectorAll(".stack-reveal"), { clearProps: "all" });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="intereses" className="bg-bg-raised text-accent-on-dark">
      <h2 className="sr-only">Intereses</h2>

      {/* Desktop / tablet: tarjetas a pantalla completa reveladas con hover
          (sin hover real en táctil, así que este bloque se oculta en mobile). */}
      <ol className="hidden md:grid md:grid-cols-3">
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
                  Se posiciona sobre el primer cuadro decorativo de la tarjeta
                  en vez de flotar suelto. */}
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

      {/* Mobile: mismas tarjetas, pero apiladas con scroll (sticky puro) en
          vez de hover, que no existe en táctil. */}
      <div
        ref={stackRef}
        className="relative md:hidden"
        style={{ height: `${intereses.length * 100}dvh` }}
      >
        <ul className="relative">
          {intereses.map((item, i) => (
            <li
              key={item.number}
              className="stack-card sticky top-0 flex h-dvh w-full flex-col justify-end overflow-hidden"
            >
              {/* Imagen a pantalla completa, alto contraste blanco/negro */}
              <div className="absolute inset-0 z-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.alt}
                  className="h-full w-full object-cover grayscale contrast-125"
                />
                <div className="absolute inset-0 bg-bg-raised/35" aria-hidden="true" />
              </div>

              {/* Acentos decorativos: solo borde, sin relleno */}
              {ACCENTS[i]?.map((cls, ai) => (
                <span
                  key={ai}
                  aria-hidden="true"
                  className={`stack-reveal absolute z-10 border-2 border-accent-on-dark ${cls}`}
                />
              ))}

              {/* Número de índice */}
              <span
                aria-hidden="true"
                className="stack-reveal absolute left-6 top-24 z-10 bg-bg px-3 py-1.5 font-mono text-lg text-bg-raised"
              >
                {item.number}
              </span>

              <div className="relative z-10 flex flex-col gap-4 px-6 pb-16">
                {/* Título en líneas independientes con fondo sólido de acento,
                    desfasadas entre sí para simular marcado a mano. */}
                <div className="flex flex-col items-start gap-1.5">
                  {item.words.map((word, wi) => (
                    <span
                      key={word}
                      className="stack-reveal inline-block bg-accent-on-dark px-3 py-1 font-display text-2xl uppercase leading-tight text-bg-raised"
                      style={{ marginLeft: LINE_OFFSETS[wi % LINE_OFFSETS.length] }}
                    >
                      {word}
                    </span>
                  ))}
                </div>

                <Link
                  href={item.href}
                  aria-label={`Ver ${item.title}`}
                  className="stack-reveal inline-flex w-fit items-center bg-accent-on-dark px-4 py-2 font-mono text-xs font-medium uppercase text-bg-raised transition-opacity hover:opacity-90"
                >
                  Ver
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
