"use client";

import { useEffect, useRef } from "react";

// Motor de ruido tipo Perlin (implementación propia y ligera, sin dependencias)
// que dibuja una grilla de celdas ASCII y "enciende" celdas en el color de acento
// cuando el ruido supera un umbral. Fondo generativo en Canvas 2D puro.
function createNoise() {
  const perm = new Uint8Array(512);
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a: number, b: number, t: number) => a + t * (b - a);
  const grad = (hash: number, x: number, y: number, z: number) => {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  };

  function rawNoise(x: number, y: number, z: number) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const Z = Math.floor(z) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    z -= Math.floor(z);
    const u = fade(x);
    const v = fade(y);
    const w = fade(z);
    const A = perm[X] + Y;
    const AA = perm[A] + Z;
    const AB = perm[A + 1] + Z;
    const B = perm[X + 1] + Y;
    const BA = perm[B] + Z;
    const BB = perm[B + 1] + Z;
    const res = lerp(
      lerp(
        lerp(grad(perm[AA], x, y, z), grad(perm[BA], x - 1, y, z), u),
        lerp(grad(perm[AB], x, y - 1, z), grad(perm[BB], x - 1, y - 1, z), u),
        v
      ),
      lerp(
        lerp(grad(perm[AA + 1], x, y, z - 1), grad(perm[BA + 1], x - 1, y, z - 1), u),
        lerp(
          grad(perm[AB + 1], x, y - 1, z - 1),
          grad(perm[BB + 1], x - 1, y - 1, z - 1),
          u
        ),
        v
      ),
      w
    );
    return (res + 1) / 2;
  }

  // Suma de octavas (fBm) con los valores por defecto de p5.noise():
  // 4 octavas, falloff 0.5 — esto es lo que le da al ruido su aspecto
  // "orgánico" en vez de ruido de alta frecuencia uniforme.
  return function noise3(x: number, y: number, z: number) {
    let total = 0;
    let amp = 0.5;
    let freq = 1;
    let maxAmp = 0;
    for (let i = 0; i < 4; i++) {
      total += rawNoise(x * freq, y * freq, z * freq) * amp;
      maxAmp += amp;
      amp *= 0.5;
      freq *= 2;
    }
    return total / maxAmp;
  };
}

const RAMPA = " .,:;-=+*#%@";

export default function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Colores leídos de las CSS custom properties (definidas en globals.css)
    // en vez de hardcodeados, para que el canvas siga la paleta del proyecto
    // si esta cambia.
    const rootStyles = getComputedStyle(document.documentElement);
    const COLOR_ACENTO = rootStyles.getPropertyValue("--accent-soft").trim() || "#a3bdec";
    const COLOR_FONDO = rootStyles.getPropertyValue("--bg").trim() || "#f4f1ea";

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const noise = createNoise();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let escala = 0.05;
    let cols = 141;
    let rows = 79;
    let GRANO = escala * 3;
    const BOIL = 0.35;
    const VEL_HERVOR = 0.8;
    const SWEEP_EVERY = 20;
    const SWEEP_DUR = 2.0;
    const SWEEP_BAND = 0.09;
    const SWEEP_AMT = 0.35;
    const SWEEP_DIR: [number, number] = [0.72, 0.28];
    const THRESH_MAIN = 0.46;
    const THRESH_TEXT = 0.52;
    const DESV = 0.85;
    const velocidad = 0.01;

    let cellW = 0;
    let cellH = 0;
    let estela = new Float32Array(0);
    let tiempo = 0;
    let mouseX = -1000;
    let mouseY = -1000;
    let rafId = 0;

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (!canvas || !ctx) return;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (w < 768) {
        cols = 48;
        escala = 0.1;
      } else if (w < 1280) {
        cols = 80;
        escala = 0.07;
      } else {
        cols = 141;
        escala = 0.05;
      }
      rows = Math.round(cols * (h / w));
      GRANO = escala * 3;
      cellW = w / cols;
      cellH = h / rows;
      estela = new Float32Array(cols * rows);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `${cellH * 0.9}px ui-monospace, monospace`;
    }

    function handleMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    function draw() {
      if (!ctx) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.fillStyle = COLOR_FONDO;
      ctx.fillRect(0, 0, w, h);

      const t = performance.now() / 1000;
      let sweepPos = -99;
      const ciclo = t % SWEEP_EVERY;
      if (ciclo < SWEEP_DUR) sweepPos = -0.2 + (ciclo / SWEEP_DUR) * 1.4;
      const hasSweep = sweepPos > -1;
      const hxOff = t * VEL_HERVOR;
      const hyOff = -t * VEL_HERVOR * 0.72;

      const mi = Math.floor(mouseX / cellW);
      const mj = Math.floor(mouseY / cellH);
      if (mi >= 0 && mi < cols && mj >= 0 && mj < rows) {
        estela[mi * rows + mj] = 1;
      }

      ctx.fillStyle = COLOR_ACENTO;
      ctx.beginPath();
      for (let i = 0; i < cols; i++) {
        const iEscala = i * escala;
        const iGrano = i * GRANO;
        const ix = i * cellW;
        const suI = (i / cols) * SWEEP_DIR[0];
        for (let j = 0; j < rows; j++) {
          const jy = j * cellH;
          const n = noise(iEscala, j * escala, tiempo);
          const hervor = noise(iGrano + hxOff, j * GRANO + hyOff, 0) - 0.5;
          const val = n * 0.7 + hervor * BOIL;
          if (val > THRESH_MAIN) {
            ctx.rect(ix, jy, cellW, cellH);
          } else if (n > THRESH_TEXT) {
            let boost = 0;
            if (hasSweep) {
              const s = suI + (j / rows) * SWEEP_DIR[1];
              const dd = Math.abs(s - sweepPos);
              if (dd < SWEEP_BAND) boost = SWEEP_AMT * (1 - dd / SWEEP_BAND);
            }
            const tt = (n + boost - THRESH_TEXT) / (1 - THRESH_TEXT);
            const idx = Math.min(
              Math.max(Math.floor(tt * (RAMPA.length - 1)), 0),
              RAMPA.length - 1
            );
            if (RAMPA[idx] !== " ") {
              ctx.save();
              ctx.fillStyle = "rgba(0,0,0,0.45)";
              ctx.fillText(RAMPA[idx], ix + cellW / 2, jy + cellH / 2);
              ctx.restore();
            }
          }
        }
      }
      ctx.fill();

      ctx.fillStyle = COLOR_FONDO;
      ctx.beginPath();
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const flatIdx = i * rows + j;
          if (estela[flatIdx] > 0) {
            ctx.rect(i * cellW, j * cellH, cellW, cellH);
            estela[flatIdx] *= DESV;
            if (estela[flatIdx] < 0.01) estela[flatIdx] = 0;
          }
        }
      }
      ctx.fill();

      tiempo += velocidad;
      if (!reducedMotion) rafId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="bg-animation" />;
}
