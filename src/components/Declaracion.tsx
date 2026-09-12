import Link from "next/link";
import { declaracion } from "@/data/site";

// Offsets en zigzag para que el bloque se vea como una escalera irregular.
// Ninguna línea arranca en el margen ni llega al borde derecho: el conjunto
// queda centrado con aire a ambos lados. En móvil el escalonado es mucho
// menor porque una línea ya ocupa casi todo el ancho.
const LINE_OFFSETS = [
  { mobile: "13vw", desktop: "10vw" },
  { mobile: "25vw", desktop: "56vw" },
  { mobile: "17vw", desktop: "24vw" },
  { mobile: "30vw", desktop: "62vw" },
  { mobile: "8vw", desktop: "26vw" },
];

export default function Declaracion() {
  return (
    <section className="px-6 py-24 md:px-10 md:py-36">
      <h2 className="sr-only">{declaracion.eyebrow}</h2>
      <div className="flex flex-col gap-2 md:gap-3">
        {declaracion.lines.map((line, i) => {
          const offset = LINE_OFFSETS[i % LINE_OFFSETS.length];
          return (
            <span
              key={i}
              className="font-poster ml-(--offset-mobile) text-[13vw] uppercase leading-[0.95] tracking-wide text-ink md:ml-(--offset-desktop) md:text-[8.5vw]"
              style={
                {
                  "--offset-mobile": offset.mobile,
                  "--offset-desktop": offset.desktop,
                } as React.CSSProperties
              }
            >
              {line}
            </span>
          );
        })}
      </div>
      <Link href="/archivo" className="frame-button mt-10 px-6 py-3 text-sm">
        <span className="frame-line frame-line--top" />
        <span className="frame-line frame-line--left" />
        <span className="frame-line frame-line--right" />
        <span className="frame-line frame-line--bottom" />
        {declaracion.eyebrow}
      </Link>
    </section>
  );
}
