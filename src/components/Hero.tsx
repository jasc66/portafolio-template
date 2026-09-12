import { heroTopics, nav, site } from "@/data/site";
import BrandMark from "@/components/BrandMark";
import AnchorLink from "@/components/AnchorLink";

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
  const frameClassName = `frame-button whitespace-nowrap px-4 py-2 text-xs md:text-sm ${className}`;
  const frameLines = (
    <>
      <span className="frame-line frame-line--top" />
      <span className="frame-line frame-line--left" />
      <span className="frame-line frame-line--right" />
      <span className="frame-line frame-line--bottom" />
      {children}
    </>
  );

  // Los anclajes internos (#intereses, #sobre-mi) pasan por Lenis para
  // conservar la inercia del scroll; los demás son enlaces normales.
  if (href.startsWith("#")) {
    return (
      <AnchorLink href={href} className={frameClassName}>
        {frameLines}
      </AnchorLink>
    );
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={frameClassName}
    >
      {frameLines}
    </a>
  );
}

export default function Hero() {
  const [github, archivo, intereses, sobreMi] = nav;

  return (
    <section
      data-hero-section=""
      className="relative flex min-h-svh flex-col justify-between overflow-hidden px-6 pb-10 pt-28 md:px-10 md:pb-14 md:pt-16"
    >
      {/* Top: navegación de acciones a la derecha */}
      <div className="flex w-full items-start justify-end">
        <div className="flex flex-wrap items-center justify-end gap-3">
          <FrameButton href={archivo.href}>{archivo.label}</FrameButton>
          <FrameButton href={intereses.href}>{intereses.label}</FrameButton>
          <FrameButton href={sobreMi.href}>{sobreMi.label}</FrameButton>
          <FrameButton href={github.href} external={github.external}>
            {github.label}
          </FrameButton>
        </div>
      </div>

      {/* Middle: nombre y rol centrados para aprovechar el ancho de pantalla */}
      <div className="mx-auto flex w-full max-w-[95vw] flex-col items-center gap-8 py-6 text-center">
        <h1 className="font-poster text-[17vw] uppercase leading-[0.88] tracking-wide text-ink md:text-[11.5vw]">
          {site.name}
        </h1>
        <p className="max-w-lg font-mono text-sm uppercase tracking-wider text-ink-dim md:text-base">
          {site.role} — {site.tagline}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 text-left sm:grid-cols-2 md:max-w-3xl">
          {heroTopics.map((topic) => (
            <div key={topic.label} className="flex max-w-sm flex-col gap-2 border-l border-line pl-4">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-ink">
                {topic.label}
              </p>
              <p className="text-sm leading-relaxed text-ink-dim">{topic.text}</p>
            </div>
          ))}
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
            href={site.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-link transition-colors hover:text-ink"
          >
            GitHub
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
