import { heroTopics, nav, site } from "@/data/site";
import BrandMark from "@/components/BrandMark";

function FrameButton({
  href,
  children,
  className = "",
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`frame-button whitespace-nowrap px-4 py-2 text-xs md:text-sm ${className}`}
    >
      <span className="frame-line frame-line--top" />
      <span className="frame-line frame-line--left" />
      <span className="frame-line frame-line--right" />
      <span className="frame-line frame-line--bottom" />
      {children}
    </a>
  );
}

export default function Hero() {
  const [linktree, archivo, intereses, sobreMi] = nav;

  return (
    <section
      data-hero-section=""
      className="relative flex min-h-svh flex-col items-center justify-between overflow-hidden px-6 pb-10 pt-28 md:px-10 md:pb-14 md:pt-16"
    >
      {/* Top: tagline a la izquierda + Explorar/Enfocar a la derecha */}
      <div className="flex w-full flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <p className="max-w-[16rem] font-mono text-xs uppercase tracking-wider text-ink-dim">
          {site.tagline}
        </p>
        <div className="flex flex-col gap-6 md:flex-row md:gap-16">
          {heroTopics.map((topic) => (
            <div key={topic.label} className="flex max-w-[16rem] flex-col gap-2">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-ink">
                {topic.label}
              </p>
              <p className="text-sm leading-relaxed text-ink-dim">{topic.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Middle: nombre centrado + botones "marco" alrededor */}
      <div className="flex w-full max-w-5xl flex-col items-center gap-8 py-6">
        <div className="hidden w-full items-center justify-between md:flex">
          <FrameButton href={archivo.href}>{archivo.label}</FrameButton>
          <FrameButton href={sobreMi.href}>{sobreMi.label}</FrameButton>
        </div>

        <h1 className="font-display text-center text-[13vw] font-medium uppercase leading-[0.9] tracking-tight text-ink md:text-[6.5vw]">
          {site.name}
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-3 md:hidden">
          <FrameButton href={archivo.href}>{archivo.label}</FrameButton>
          <FrameButton href={sobreMi.href}>{sobreMi.label}</FrameButton>
          <FrameButton href={linktree.href} external={linktree.external}>
            {linktree.label}
          </FrameButton>
          <FrameButton href={intereses.href}>{intereses.label}</FrameButton>
        </div>

        <div className="hidden w-full items-center justify-between md:flex">
          <FrameButton href={linktree.href} external={linktree.external}>
            {linktree.label}
          </FrameButton>
          <FrameButton href={intereses.href}>{intereses.label}</FrameButton>
        </div>
      </div>

      {/* Bottom: isotipo a la izquierda + redes a la derecha */}
      <div className="flex w-full items-center justify-between">
        <BrandMark initial={site.name.trim().charAt(0).toUpperCase() || "N"} />
        <nav
          aria-label="Redes y contacto"
          className="flex items-center gap-6 font-mono text-xs uppercase tracking-wider text-ink-dim"
        >
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-link transition-colors hover:text-ink"
          >
            Instagram
          </a>
          <a
            href={`mailto:${site.email}`}
            className="underline-link transition-colors hover:text-ink"
          >
            Contacto
          </a>
          <a
            href={site.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-link transition-colors hover:text-ink"
          >
            LinkedIn
          </a>
        </nav>
      </div>
    </section>
  );
}
