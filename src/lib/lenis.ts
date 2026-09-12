import type Lenis from "lenis";

// Singleton simple para acceder a la instancia de Lenis desde cualquier
// componente (p. ej. para animar el scroll a un ancla al hacer click en
// el nav) sin necesidad de prop-drilling ni Context.
let instance: Lenis | null = null;

export function setLenisInstance(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenisInstance() {
  return instance;
}

// Hace scroll a un elemento usando Lenis si está disponible (respeta su
// inercia); si Lenis no arrancó (prefers-reduced-motion), cae a la API
// nativa del navegador.
export function smoothScrollTo(target: string | HTMLElement) {
  if (instance) {
    instance.scrollTo(target, { offset: 0 });
    return;
  }
  const el = typeof target === "string" ? document.querySelector(target) : target;
  el?.scrollIntoView({ behavior: "smooth" });
}
