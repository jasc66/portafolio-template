"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

export default function Header() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("[data-hero-section]");
    if (!hero) return;

    const checkScroll = () => {
      const rect = hero.getBoundingClientRect();
      setVisible(rect.bottom <= 0);
    };

    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  return (
    <header
      inert={!visible}
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 text-[11px] uppercase tracking-wider transition-opacity duration-300 md:px-10 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="font-mono font-medium text-ink"
      >
        {site.name}
      </a>
      <nav
        aria-label="Redes y contacto"
        className="flex items-center gap-6"
      >
        <a
          href={site.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="underline-link text-ink transition-colors hover:text-ink-dim"
        >
          Instagram
        </a>
        <a
          href={`mailto:${site.email}`}
          className="underline-link text-ink transition-colors hover:text-ink-dim"
        >
          Contacto
        </a>
        <a
          href={site.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="underline-link text-ink transition-colors hover:text-ink-dim"
        >
          LinkedIn
        </a>
      </nav>
    </header>
  );
}
