# Plantilla editorial — Next.js + Tailwind

Plantilla inspirada en la estructura y el lenguaje visual de un portafolio
personal editorial (hero tipográfico grande, texto en movimiento, manifiesto,
grilla de intereses numerada, sección "sobre mí"). Todo el copy es de
marcador — reemplázalo por el tuyo en `src/data/site.ts`.

## Empezar

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Estructura

- `src/data/site.ts` — todo el contenido editable (nombre, redes, textos,
  intereses, eventos). Empieza por aquí.
- `src/components/` — una sección por archivo (Header, Hero, IntroScroll,
  Declaracion, Manifiesto, Intereses, MarqueeBand, LlamadosColectivos,
  SobreMi, Footer).
- `src/app/page.tsx` — ensambla las secciones de la home.
- `src/app/archivo/page.tsx` — página de ejemplo para listar proyectos.
- `public/images/` — reemplaza los SVG de marcador por tus fotos/imágenes
  reales (mismo nombre de archivo o actualiza las rutas en `site.ts`).

## Diseño

- Fondo casi negro (`#0d0d0b`), texto hueso (`#ede8dd`), acento rojo óxido
  (`#c1401f`) — definidos como variables en `globals.css`.
- Tipografía: Fraunces (serif, itálica) para titulares, IBM Plex Mono para
  navegación, etiquetas y cuerpo — tono de archivo/manifiesto.
- El marquee de texto respeta `prefers-reduced-motion`.

## Notas

- El build requiere acceso a `fonts.googleapis.com` (Next/font descarga las
  fuentes en build time). Si compilas detrás de un proxy o sin red, cambia a
  `next/font/local` o usa fuentes del sistema.
- Los archivos en `public/images/` son SVG de marcador — sustitúyelos por
  fotografías reales en producción.
