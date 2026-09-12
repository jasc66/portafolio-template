import Link from "next/link";
import { declaracion } from "@/data/site";

// Offsets en zigzag para que el bloque se vea como una escalera irregular
// en vez de una diagonal uniforme.
const LINE_OFFSETS = ["0vw", "14vw", "5vw", "18vw", "0vw"];

export default function Declaracion() {
  return (
    <section className="flex min-h-svh flex-col items-center justify-center px-6 py-24 md:px-10 md:py-36">
      <h2 className="sr-only">{declaracion.eyebrow}</h2>
      <div className="flex w-full max-w-[92vw] flex-col gap-3 md:gap-5">
        {declaracion.lines.map((line, i) => (
          <span
            key={i}
            className="font-poster text-[12vw] uppercase leading-[0.95] tracking-wide text-ink md:text-[7.2vw]"
            style={{ marginLeft: LINE_OFFSETS[i % LINE_OFFSETS.length] }}
          >
            {line}
          </span>
        ))}
      </div>
      <Link href="/archivo" className="frame-button mt-14 px-6 py-3 text-sm">
        <span className="frame-line frame-line--top" />
        <span className="frame-line frame-line--left" />
        <span className="frame-line frame-line--right" />
        <span className="frame-line frame-line--bottom" />
        {declaracion.eyebrow}
      </Link>
    </section>
  );
}
