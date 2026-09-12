import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-10 md:px-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <nav
          aria-label="Redes y enlaces del pie"
          className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.08em] text-ink-dim"
        >
          <a
            href={site.social.linktree}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-ink"
          >
            Linktree
          </a>
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-ink"
          >
            Instagram
          </a>
          <a
            href={site.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-ink"
          >
            LinkedIn
          </a>
          <a
            href={site.cvUrl}
            className="transition-colors hover:text-ink"
          >
            CV
          </a>
        </nav>
        <p className="font-mono text-xs text-ink-dim">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
