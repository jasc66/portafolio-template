import Link from "next/link";
import { declaracion } from "@/data/site";

// Offsets en zigzag para que el bloque se vea como una escalera irregular
// y se distribuya por todo el ancho de la pantalla en vez de quedar
// pegado a la izquierda.
const LINE_OFFSETS = ["0vw", "20vw", "8vw", "30vw", "14vw"];

export default function Declaracion() {
  return (
    <section className="flex min-h-svh flex-col justify-center px-6 py-24 md:px-10 md:py-36">
      <h2 className="sr-only">{declaracion.eyebrow}</h2>
      <div className="flex flex-col gap-3 md:gap-5">
        {declaracion.lines.map((line, i) => (
          <span
            key={i}
            className="font-poster text-[13vw] uppercase leading-[0.95] tracking-wide text-ink md:text-[6.8vw]"
            style={{ marginLeft: LINE_OFFSETS[i % LINE_OFFSETS.length] }}
          >
            {line}
          </span>
        ))}
      </div>
      <Link
        href="/archivo"
        className="frame-button mt-10 self-start px-6 py-3 text-sm"
        style={{ marginLeft: LINE_OFFSETS[(declaracion.lines.length - 1) % LINE_OFFSETS.length] }}
      >
        <span className="frame-line frame-line--top" />
        <span className="frame-line frame-line--left" />
        <span className="frame-line frame-line--right" />
        <span className="frame-line frame-line--bottom" />
        {declaracion.eyebrow}
      </Link>
    </section>
  );
}
