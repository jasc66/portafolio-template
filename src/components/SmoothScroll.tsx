"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenisInstance } from "@/lib/lenis";

// Scroll suave con inercia en toda la página. No renderiza nada: solo
// engancha Lenis al ciclo de rAF mientras el componente está montado.
export default function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });
    setLenisInstance(lenis);

    // Evita el doble easing entre el "scroll-behavior: smooth" nativo
    // (usado por los anclajes de navegación) y la inercia de Lenis.
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    let rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      setLenisInstance(null);
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
    };
  }, []);

  return null;
}
