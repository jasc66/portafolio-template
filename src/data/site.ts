// Todo el copy vive aquí para que puedas reemplazarlo por el tuyo
// sin tocar los componentes.

export const site = {
  name: "Nombre Apellido",
  tagline: "¿Qué tan huidizas son las memorias?",
  email: "info@tudominio.co",
  social: {
    instagram: "https://instagram.com/tuusuario",
    linkedin: "https://linkedin.com/in/tuusuario",
    linktree: "https://linktr.ee/tuusuario",
  },
  cvUrl: "#",
};

export const nav = [
  { label: "Linktree", href: site.social.linktree, external: true },
  { label: "Archivo", href: "/archivo" },
  { label: "Manifiesto", href: "#manifiesto" },
  { label: "Intereses", href: "#intereses" },
  { label: "Sobre mí", href: "#sobre-mi" },
];

export const heroTopics = [
  {
    label: "Explorar",
    text: "Buscando la libertad de expresión individual con una intención de incidencia en el movimiento colectivo.",
  },
  {
    label: "Enfocar",
    text: "Habitando la desobediencia como cuerpo en resistencia digital desde la memoria.",
  },
];

export const declaracion = {
  eyebrow: "Declaración",
  lines: ["Diseños", "Soberanos", "Y acciones", "Para la", "Memoria."],
};

export const manifiesto = {
  glyphs: "𓆱 𓇕 † 🝎 𓁰 🜪 𓁟 🜚 ⏧ ⚐ ⌱ ⬭ 🝏 𓄧",
  paragraphs: [
    "Declaro que mi identidad digital no define mi identidad como persona. Esta plantilla es un punto de partida para quien quiera construir un manifiesto propio, con su propia voz y sus propias razones.",
    "Reemplaza este texto por tu declaración: lo que te mueve, lo que defiendes, lo que no estás dispuesto a ceder en tu trabajo.",
    "El formato invita a un tono íntimo y directo, en primera persona, con párrafos cortos separados por espacio en blanco.",
  ],
};

export type Interes = {
  number: string;
  title: string;
  words: string[];
  image: string;
  alt: string;
  href: string;
};

export const intereses: Interes[] = [
  {
    number: "01",
    title: "Cultura y otras pedagogías",
    words: ["Cultura", "Y otras", "Pedagogías"],
    image: "/images/interes-1.svg",
    alt: "Retrato en blanco y negro con textura granulada",
    href: "/archivo",
  },
  {
    number: "02",
    title: "Memoria, pedagogía y creación",
    words: ["Memoria", "Pedagogía y", "Creación"],
    image: "/images/interes-2.svg",
    alt: "Composición abstracta en blanco y negro",
    href: "/archivo",
  },
  {
    number: "03",
    title: "Soberanía social en la plaza de mercado",
    words: ["Soberanía", "Social en la", "Plaza de mercado"],
    image: "/images/interes-3.svg",
    alt: "Silla de plástico vacía en alto contraste",
    href: "/archivo",
  },
];

export const llamados = {
  iniciativas: [
    { label: "Iniciativa uno", href: "#" },
    { label: "Iniciativa dos", href: "#" },
  ],
  eventos: [
    { label: "Curso — Agosto a diciembre 2026", href: "#" },
    { label: "Taller — 12 de agosto de 2026", href: "#" },
    { label: "Encuentro — 21 de octubre de 2026", href: "#" },
  ],
};

export const marqueeWords = [
  "Compártalo",
  "Cópielo",
  "Repártalo",
  "Distribúyalo",
  "Rótelo",
  "Difúndalo",
];

export const sobreMi = {
  heading: "Sobre mí",
  name: site.name,
  paragraphs: [
    "Cuenta aquí tu formación: qué estudiaste, en qué te especializaste y qué investigaciones o maestrías marcaron tu forma de trabajar.",
    "Describe las redes, colectivos o proyectos que has cofundado o donde colaboras actualmente, y qué las mueve.",
    "Enumera brevemente las organizaciones o instituciones donde has trabajado y el enfoque de tu labor allí.",
    "Cierra con lo que investigas, diseñas o enseñas en este momento, y desde qué territorio o comunidad lo haces.",
  ],
};
