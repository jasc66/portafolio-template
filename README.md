# Portafolio — Alonso Salguero Ceballos

Portafolio personal construido en Next.js (App Router) + Tailwind CSS.
Sitio editorial de una sola página con hero tipográfico, archivo de
proyectos por categorías y fondo generativo en Canvas 2D.

## Empezar

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Estructura

- `src/data/site.ts` — todo el contenido editable (nombre, redes, textos,
  intereses, proyectos, archivo). Empieza por aquí para actualizar el copy.
- `src/components/` — una sección por archivo: `Header`, `Hero`,
  `Declaracion`, `Intereses` (hover en desktop, sticky-stack en mobile),
  `Proyectos`, `MarqueeBand`, `SobreMi`, `Footer`, más `Preloader`,
  `SmoothScroll`, `BackgroundAnimation` y `CollectiveBackground` como
  efectos globales.
- `src/app/page.tsx` — ensambla las secciones de la home.
- `src/app/archivo/page.tsx` — índice de categorías del archivo.
- `src/app/archivo/[slug]/page.tsx` — detalle de cada categoría
  (institucionales, open-source, personales, trayectoria), generado
  estáticamente vía `generateStaticParams`.
- `public/images/` — imágenes de las tarjetas de Intereses.
- `public/cv-alonso-salguero.pdf` — CV enlazado desde el footer.

## Diseño

- Paleta: fondo crema (`#f4f1ea`), tinta (`#1a1714`), acento azul
  (`#1d3a8f` / `#5b8cff` sobre fondo oscuro) — definida como variables
  CSS en `globals.css` y expuesta a Tailwind vía `@theme inline`.
- Tipografía: IBM Plex Mono (navegación, cuerpo, metadatos), Space
  Grotesk (`font-display`, títulos de sección) y Bebas Neue
  (`font-poster`, títulos grandes tipo cartel: Hero, Declaración, Sobre
  mí).
- `BackgroundAnimation` lee sus colores de las CSS custom properties
  (`--bg`, `--accent-soft`) en vez de tenerlos hardcodeados, para seguir
  la paleta si esta cambia.

## Interacción

- `Preloader`: overlay de grilla 12×12 que se disuelve con GSAP
  (`CustomEase`) al cargar la página.
- `SmoothScroll`: scroll con inercia vía Lenis; `AnchorLink`
  (`src/components/AnchorLink.tsx`) enruta los enlaces internos
  (`#intereses`, `#sobre-mi`) a través de Lenis en vez del salto nativo.
- `Intereses` combina dos vistas del mismo dato: hover a pantalla
  completa en desktop (≥768px) y tarjetas apiladas por scroll (CSS
  `sticky` puro + GSAP/ScrollTrigger solo para el fade-in del contenido)
  en mobile.
- Todas las animaciones respetan `prefers-reduced-motion`.

## Notas

- El build requiere acceso a `fonts.googleapis.com` (Next/font descarga
  las fuentes en build time). Si compilas detrás de un proxy o sin red,
  cambia a `next/font/local` o usa fuentes del sistema.
- Gestor de paquetes: npm (`package-lock.json`). No usar pnpm/yarn en
  este repo para evitar lockfiles duplicados.
