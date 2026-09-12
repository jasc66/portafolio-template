import Link from "next/link";
import { marqueeWords } from "@/data/site";
import CollectiveBackground from "@/components/CollectiveBackground";

export default function MarqueeBand() {
  const track = [...marqueeWords, ...marqueeWords, ...marqueeWords];

  return (
    <section className="relative isolate overflow-hidden border-y border-line bg-bg-raised py-14 md:py-20">
      <CollectiveBackground />
      <div className="relative z-10 overflow-hidden">
        <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap font-display text-3xl uppercase tracking-[0.03em] text-accent-on-dark md:text-5xl">
          {track.map((word, i) => (
            <span key={i} className="flex items-center gap-10">
              {word}
              <span className="text-ink-dim">•</span>
            </span>
          ))}
        </div>
      </div>
      <div className="relative z-10 mt-10 px-6 md:px-10">
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
