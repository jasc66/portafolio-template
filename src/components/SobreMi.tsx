import { sobreMi } from "@/data/site";

export default function SobreMi() {
  return (
    <section id="sobre-mi" className="px-6 py-24 md:px-10 md:py-32">
      <h2 className="mb-10 font-mono text-xs uppercase tracking-[0.08em] text-ink-dim">
        {sobreMi.heading}
      </h2>
      <p className="mb-8 font-display text-2xl uppercase text-ink md:text-4xl">
        {sobreMi.name}
      </p>
      <div className="flex flex-col gap-6 md:max-w-2xl">
        {sobreMi.paragraphs.map((p, i) => (
          <p key={i} className="text-base leading-relaxed text-ink-dim md:text-lg">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
