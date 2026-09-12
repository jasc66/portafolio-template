import { declaracion } from "@/data/site";

// Offsets en zigzag para que el bloque se vea como una escalera irregular
// en vez de una diagonal uniforme — igual que la referencia.
const LINE_OFFSETS = ["0vw", "22vw", "8vw", "30vw", "0vw"];

export default function Declaracion() {
  return (
    <section className="px-6 py-24 md:px-10 md:py-36">
      <h2 className="sr-only">{declaracion.eyebrow}</h2>
      <div className="flex flex-col gap-1">
        {declaracion.lines.map((line, i) => (
          <span
            key={i}
            className="font-display text-[11vw] font-medium uppercase leading-[0.95] tracking-tight text-ink md:text-[6.5vw]"
            style={{ marginLeft: LINE_OFFSETS[i % LINE_OFFSETS.length] }}
          >
            {line}
          </span>
        ))}
      </div>
      <a href="#manifiesto" className="frame-button mt-10 px-6 py-3 text-sm">
        <span className="frame-line frame-line--top" />
        <span className="frame-line frame-line--left" />
        <span className="frame-line frame-line--right" />
        <span className="frame-line frame-line--bottom" />
        {declaracion.eyebrow}
      </a>
    </section>
  );
}
