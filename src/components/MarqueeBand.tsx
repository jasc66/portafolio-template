import Link from "next/link";
import { marqueeWords } from "@/data/site";

export default function MarqueeBand() {
  const track = [...marqueeWords, ...marqueeWords, ...marqueeWords];

  return (
    <section className="border-y border-line bg-bg-raised py-8">
      <div className="overflow-hidden">
        <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap font-mono text-sm uppercase tracking-[0.08em] text-ink-dim">
          {track.map((word, i) => (
            <span key={i} className="flex items-center gap-8">
              {word}
              <span className="text-accent-on-dark">•</span>
            </span>
          ))}
        </div>
      </div>
      <div className="mt-8 px-6 md:px-10">
        <Link href="/archivo" className="frame-button px-6 py-3 text-sm">
          <span className="frame-line frame-line--top" />
          <span className="frame-line frame-line--left" />
          <span className="frame-line frame-line--right" />
          <span className="frame-line frame-line--bottom" />
          Consulta mi archivo
        </Link>
      </div>
    </section>
  );
}
