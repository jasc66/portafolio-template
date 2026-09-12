import { manifiesto } from "@/data/site";

export default function Manifiesto() {
  return (
    <section
      id="manifiesto"
      className="border-t border-line bg-bg-raised px-6 py-24 text-white md:px-10 md:py-32"
    >
      <h2 className="font-mono text-xs uppercase tracking-[0.08em] text-accent-on-dark">
        Manifiesto
      </h2>
      <p aria-hidden="true" className="mt-6 max-w-2xl text-lg text-white/40 md:text-xl">
        {manifiesto.glyphs}
      </p>
      <div className="mt-10 flex flex-col gap-8 md:max-w-2xl">
        {manifiesto.paragraphs.map((p, i) => (
          <p key={i} className="font-display text-lg leading-relaxed text-white md:text-xl">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
