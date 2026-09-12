"use client";

import { smoothScrollTo } from "@/lib/lenis";

// Enlace a un ancla dentro de la misma página que usa la inercia de Lenis
// en vez del salto instantáneo del navegador (necesario porque SmoothScroll
// desactiva `scroll-behavior: smooth` nativo mientras Lenis está activo).
export default function AnchorLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        if (!href.startsWith("#")) return;
        e.preventDefault();
        smoothScrollTo(href);
      }}
    >
      {children}
    </a>
  );
}
