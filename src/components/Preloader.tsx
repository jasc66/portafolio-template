"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

const GRID_SIZE = 12;
const CELLS = GRID_SIZE * GRID_SIZE;

// El plugin debe registrarse antes de llamar a CustomEase.create() — si no,
// GSAP emite un warning ("Please gsap.registerPlugin(CustomEase)") incluso
// aunque el registro posterior en el efecto haga que funcione igual.
gsap.registerPlugin(CustomEase);

// Curva de easing propia: arranque muy rápido ("snap") y llegada suave,
// para que el dissolve se sienta como un golpe seco, no una transición lineal.
CustomEase.create("pixelSnap", "M0,0 C0.1,0.6 0.2,1 1,1");

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Arranca igual en servidor y primer render de cliente (evita mismatch de
  // hidratación); el efecto de abajo decide si hay que saltar la animación,
  // sin volver a llamar setState de forma síncrona en su cuerpo.
  const [done, setDone] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      // Sin animación: se resuelve en un microtask, no en el cuerpo del
      // efecto, para no disparar un setState síncrono en el mismo commit.
      queueMicrotask(() => setDone(true));
      return;
    }

    const cells = Array.from(container.querySelectorAll<HTMLDivElement>(".preloader-cell"));

    const tl = gsap.timeline({
      onComplete: () => setDone(true),
    });

    tl.to(cells, {
      opacity: 0,
      scale: 0,
      duration: 0.5,
      ease: "pixelSnap",
      stagger: {
        each: 0.35 / CELLS,
        from: "random",
      },
    });

    return () => {
      tl.kill();
    };
  }, []);

  if (done) return null;

  const cells = Array.from({ length: CELLS });

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 z-[100] grid grid-cols-12 grid-rows-12"
    >
      {cells.map((_, i) => (
        <div key={i} className="preloader-cell border-2 border-ink bg-accent" />
      ))}
      <p className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-sm font-semibold uppercase tracking-[0.2em] text-bg md:text-base">
        Cargando el archivo…
      </p>
    </div>
  );
}
