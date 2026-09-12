import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { archivo, site, type Proyecto } from "@/data/site";
import BrandMark from "@/components/BrandMark";

export function generateStaticParams() {
  return archivo.map((grupo) => ({ slug: grupo.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const grupo = archivo.find((g) => g.slug === slug);
  if (!grupo) return {};
  return {
    title: `${grupo.heading} | ${site.name}`,
    description: grupo.intro,
  };
}

function ProyectoBloque({ proyecto }: { proyecto: Proyecto }) {
  const content = (
    <>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="font-display text-xl uppercase tracking-tight text-ink md:text-2xl">
          {proyecto.title}
        </h3>
        <span className="shrink-0 font-mono text-xs uppercase tracking-wider text-ink-dim">
          {proyecto.status}
        </span>
      </div>
      <p className="font-mono text-xs uppercase tracking-wider text-ink-dim">
        {proyecto.stack}
      </p>
      <p className="max-w-2xl text-sm leading-relaxed text-ink-dim">
        {proyecto.description}
      </p>
    </>
  );

  if (proyecto.href) {
    return (
      <a
        href={proyecto.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col gap-2 py-8 transition-colors hover:text-accent [&_h3]:group-hover:text-accent"
      >
        {content}
      </a>
    );
  }

  return <div className="flex flex-col gap-2 py-8">{content}</div>;
}

export default async function ArchivoDetalle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const grupo = archivo.find((g) => g.slug === slug);
  if (!grupo) notFound();

  const index = archivo.findIndex((g) => g.slug === slug);
  const anterior = archivo[index - 1];
  const siguiente = archivo[index + 1];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex flex-col gap-3 px-6 py-5 text-[11px] uppercase tracking-wider md:px-10">
        <div className="flex items-center justify-between">
          <Link href="/archivo" className="flex items-center gap-2 font-mono font-medium text-ink">
            <BrandMark initial={site.name.trim().charAt(0).toUpperCase() || "N"} />
            <span aria-hidden="true">←</span> Volver
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="underline-link font-mono text-ink hover:text-accent">
              Inicio
            </Link>
            <p className="font-mono text-ink-dim">{site.name}</p>
          </div>
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-ink-dim">
          Archivo de consulta — {site.role}
        </p>
      </header>

      <main id="main-content" className="min-h-svh px-6 pb-28 pt-40 md:px-10">
        <div className="grid gap-10 md:grid-cols-[auto_1fr] md:gap-16">
          <div className="md:sticky md:top-40 md:self-start">
            <span className="font-display block text-7xl leading-none text-ink md:text-8xl">
              {grupo.number}
            </span>
            <h1 className="mt-6 inline-block bg-ink px-3 py-1.5 font-display text-xl uppercase tracking-tight text-bg md:text-2xl">
              {grupo.heading}
            </h1>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink-dim">
              {grupo.intro}
            </p>
          </div>

          <div>
            <ul className="flex flex-col divide-y divide-line border-t border-line">
              {grupo.proyectos.map((proyecto) => (
                <li key={proyecto.title}>
                  <ProyectoBloque proyecto={proyecto} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      <nav
        aria-label="Navegación entre grupos del archivo"
        className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-between border-t border-line bg-bg px-6 py-5 font-mono text-xs uppercase tracking-wider text-ink-dim md:px-10"
      >
        {anterior ? (
          <Link href={`/archivo/${anterior.slug}`} className="underline-link hover:text-ink">
            ← {anterior.heading}
          </Link>
        ) : (
          <span />
        )}
        {siguiente ? (
          <Link href={`/archivo/${siguiente.slug}`} className="underline-link hover:text-ink">
            {siguiente.heading} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </>
  );
}
