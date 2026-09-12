// Todo el copy vive aquí para que puedas reemplazarlo por el tuyo
// sin tocar los componentes.

export const site = {
  name: "Alonso Salguero",
  role: "Desarrollador Fullstack",
  tagline: "Accesibilidad web y herramientas open source para asistentes de IA.",
  email: "alonso.jasc@hotmail.com",
  social: {
    github: "https://github.com/jasc66",
    linkedin: "https://linkedin.com/in/alonso-salguero",
    npm: "https://www.npmjs.com/~jalonsc66",
  },
  cvUrl: "/cv-alonso-salguero.pdf",
};

export const nav = [
  { label: "GitHub", href: site.social.github, external: true },
  { label: "Archivo", href: "/archivo" },
  { label: "Especialidades", href: "#intereses" },
  { label: "Sobre mí", href: "#sobre-mi" },
];

export const heroTopics = [
  {
    label: "Construir",
    text: "18+ años de TI en el sector público costarricense: sistemas institucionales de requerimientos a producción.",
  },
  {
    label: "Auditar",
    text: "Autor de wcag-agent y @jalonsc66/a11y-ci, herramientas open source de accesibilidad WCAG 2.2 AA en npm.",
  },
];

export const declaracion = {
  eyebrow: "Ver proyectos",
  lines: ["Código", "Accesible", "En cada", "Línea", "Que escribo."],
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
    title: "Accesibilidad web (WCAG 2.2 AA)",
    words: ["Accesibilidad", "Web", "WCAG 2.2"],
    image: "/images/interes-1.png",
    alt: "Auditoría de accesibilidad sobre una interfaz web, en blanco y negro con textura granulada",
    href: "/archivo/institucionales",
  },
  {
    number: "02",
    title: "Agentes de IA y automatización",
    words: ["Agentes", "De IA y", "Automatización"],
    image: "/images/interes-2.png",
    alt: "Diagrama de agentes de IA conectados a bases de conocimiento, en blanco y negro con textura granulada",
    href: "/archivo/open-source",
  },
  {
    number: "03",
    title: "Sistemas fullstack institucionales",
    words: ["Sistemas", "Fullstack", "Institucionales"],
    image: "/images/interes-3.png",
    alt: "Código y arquitectura de sistemas sobre fotografía en blanco y negro con textura granulada",
    href: "/archivo/personales",
  },
];

export const proyectos = {
  herramientas: [
    { label: "wcag-agent — auditor WCAG 2.2 para asistentes de IA", href: "https://www.npmjs.com/package/wcag-agent" },
    { label: "@jalonsc66/a11y-ci — accesibilidad en el pipeline CI/CD", href: "https://www.npmjs.com/package/@jalonsc66/a11y-ci" },
    { label: "scroll-flyover — skill de Claude Code para scroll 3D", href: "https://github.com/jasc66/scroll-flyover" },
  ],
  produccion: [
    { label: "Reconstrucción integral DGSC — en desarrollo, diciembre 2026", href: "#" },
    { label: "CMS headless institucional DGSC — en producción", href: "#" },
    { label: "Sitio Restaurante De La Finca — en producción", href: "https://de-lafinca.com" },
  ],
};

export type Proyecto = {
  title: string;
  status: string;
  stack: string;
  description: string;
  href?: string;
};

export type ArchivoGrupo = {
  slug: string;
  number: string;
  heading: string;
  intro: string;
  proyectos: Proyecto[];
};

export const archivo: ArchivoGrupo[] = [
  {
    slug: "institucionales",
    number: "01",
    heading: "Institucionales (DGSC)",
    intro:
      "Proyectos desarrollados en la Dirección General del Servicio Civil: accesibilidad WCAG 2.2 AA, CMS headless y la reconstrucción integral del sitio institucional.",
    proyectos: [
      {
        title: "Reconstrucción Integral del Sitio Web Institucional DGSC",
        status: "En desarrollo · lanzamiento previsto diciembre 2026",
        stack: "Next.js",
        description:
          "Reemplazo completo de la plataforma anterior: gestión de boletines y avisos, flujo formal de denuncias con trazabilidad, sección de Igualdad y Accesibilidad como eje de navegación de primer nivel, biblioteca de documentos y buscador unificado con respaldo estático ante fallos. Entorno de prueba en producción para wcag-agent, en el proceso de alcanzar WCAG 2.2 AA.",
      },
      {
        title: "Adecuación de Accesibilidad WCAG 2.2 AA — Sitio Institucional DGSC",
        status: "En producción",
        stack: "dgsc.go.cr",
        description:
          "Ajustes de accesibilidad WCAG 2.2 AA y SEO técnico sobre la plataforma institucional existente, por directriz presidencial. Será reemplazado por la reconstrucción integral.",
        href: "https://www.dgsc.go.cr",
      },
      {
        title: "CMS Headless Institucional DGSC",
        status: "En producción",
        stack: "React · Next.js · TypeScript · Tailwind · MySQL",
        description:
          "Sistema headless de gestión de contenidos con WCAG 2.2 AA, SEO técnico y arquitectura fullstack propia — 18 colecciones de contenido, en producción en el portal oficial del Servicio Civil de Costa Rica.",
      },
    ],
  },
  {
    slug: "open-source",
    number: "02",
    heading: "Herramientas open source (npm)",
    intro:
      "Herramientas publicadas en npm y GitHub bajo licencia abierta, nacidas de necesidades reales de accesibilidad y automatización en mi trabajo diario.",
    proyectos: [
      {
        title: "wcag-agent — Agente de accesibilidad para asistentes de IA",
        status: "OSS (MIT) · v1.4.1",
        stack: "Node.js · WCAG 2.2",
        description:
          "Instala un auditor WCAG 2.2 en el asistente de IA del desarrollador (Claude Code, Cursor, Copilot, Windsurf, Zed y más — 10 plataformas). Audita React/Next.js y Vue/Nuxt desde el código fuente, sin servidor, cero dependencias externas.",
        href: "https://www.npmjs.com/package/wcag-agent",
      },
      {
        title: "@jalonsc66/a11y-ci — Accesibilidad como parte del build",
        status: "OSS",
        stack: "Node.js · axe-core · IBM Equal Access · CI/CD",
        description:
          "CLI que integra la auditoría WCAG 2.2 AA al pipeline: tres motores en una pasada, exit code según severidad y detección automática de entornos locales. Recetas para GitHub Actions y GitLab CI.",
        href: "https://www.npmjs.com/package/@jalonsc66/a11y-ci",
      },
      {
        title: "scroll-flyover — Skill de Claude Code para experiencias 3D de scroll",
        status: "OSS (MIT)",
        stack: "Three.js / WebGL · npm",
        description:
          "Construye páginas con vuelo de cámara 3D continuo sincronizado al scroll, con geometría, materiales y cielos generados por código — sin generación de imagen/video por IA, costo cero por build. Incluye motor de scroll portable y seis arquetipos de cámara documentados.",
        href: "https://github.com/jasc66/scroll-flyover",
      },
    ],
  },
  {
    slug: "personales",
    number: "03",
    heading: "Proyectos personales",
    intro:
      "Producto propio y para clientes, desarrollado por iniciativa personal fuera de mi rol institucional: agentes de IA, plataformas SaaS y sitios para negocios.",
    proyectos: [
      {
        title: "Prototipo Accesible DGSC — Dashboard de Auditorías con Agentes de IA",
        status: "Personal · iniciativa propia · base de tesis",
        stack: "Next.js 15 · Supabase · NVIDIA NIM · Recharts",
        description:
          "Dashboard de auditorías WCAG 2.2 AA con tres agentes de IA: uno conversacional que responde dudas sobre los hallazgos, uno clasificador que los categoriza y uno generador que construye el backlog de remediación. Métricas de cumplimiento y seguimiento histórico por campañas.",
      },
      {
        title: "Nexo — Gestor de Proyectos SaaS",
        status: "Personal · iniciativa propia",
        stack: "React 18 · Node.js · MongoDB · Socket.io · Stripe",
        description:
          "Plataforma SaaS multi-tenant para gestión de proyectos con vistas Kanban/Gantt, tiempo real vía WebSockets, IA integrada, automatizaciones, 2FA/TOTP y facturación Stripe.",
      },
      {
        title: "ChatBot — Servicio Civil / Chatbot Institucional MAG",
        status: "Iniciativa personal (no encargados por las instituciones)",
        stack: "Next.js 15 · pgvector / Neon · RAG multi-modelo",
        description:
          "Asistentes conversacionales con RAG sobre bases de conocimiento de trámites y normativa. Arquitectura multi-modelo con conmutación automática entre tres proveedores de IA para evitar puntos únicos de falla. Panel administrativo con registro de auditoría y carga de documentos que se convierten en base de conocimiento sin reentrenamiento manual.",
      },
      {
        title: "Las Aventuras de Noah — Juego Educativo",
        status: "Web · iOS (Capacitor)",
        stack: "Playwright / WebKit",
        description:
          "Aplicación educativa multiplataforma: mapa navegable de 9 escenas y 10 minijuegos que enseñan conteo, formas, colores, vocales, consonantes, secuencias y rutinas diarias. Validada jugando en cada iteración con pruebas automatizadas sobre motor WebKit real.",
      },
      {
        title: "Sitio Web Restaurante De La Finca",
        status: "En producción · Freelance",
        stack: "Next.js · Supabase · Framer Motion",
        description:
          "Sitio completo con panel de administración de menú e imágenes, multiidioma ES/EN, carrusel, integración con Google Maps, formulario de contacto, reseñas y galería. Autenticación y base de datos con Supabase.",
        href: "https://de-lafinca.com",
      },
    ],
  },
  {
    slug: "trayectoria",
    number: "04",
    heading: "Experiencia y formación",
    intro:
      "Más de 18 años en TI del sector público costarricense, con formación continua en ingeniería informática.",
    proyectos: [
      {
        title: "Dirección General del Servicio Civil (DGSC) — Analista de Sistemas Informáticos",
        status: "Junio 2024 — Actualidad",
        stack: "React · Next.js · TypeScript · Tailwind · MySQL",
        description:
          "Liderazgo de accesibilidad WCAG 2.2 AA sobre el sitio institucional y su reconstrucción integral. Desarrollo del CMS headless institucional propio (18 colecciones de contenido). Administración de servidores Windows y bases de datos MySQL; soporte de sistemas críticos (Salarios, CECADES, Gestor Documental, CIDSECI).",
      },
      {
        title: "Coopealianza R.L. — Analista Programador Mid",
        status: "Diciembre 2023 — Mayo 2024",
        stack: "Oracle Forms · PL/SQL",
        description:
          "Desarrollo de módulos e interfaces en Oracle Forms y procedimientos PL/SQL para sistemas financieros críticos. Implementación de flujo de estados de oportunidades financieras, APIs REST, QA funcional y coordinación de pases a producción.",
      },
      {
        title: "Ministerio de Agricultura y Ganadería (MAG) — Programador II · En propiedad",
        status: "Septiembre 2008 — Diciembre 2023",
        stack: "MERN · Power BI · Power Automate",
        description:
          "15 años diseñando e implementando sistemas institucionales de requerimientos a producción: SeguimientoMAG (PWA de indicadores PNDIP con reportes PDF/Excel), intranet para 8 Direcciones Regionales, dashboards Power BI y un sistema MERN de itinerarios y reportes de actividades.",
      },
      {
        title: "Ministerio de Educación Pública — IPEC — Profesor de Enseñanza Técnico Profesional en Informática",
        status: "Marzo 2006 — Septiembre 2008",
        stack: "Docencia técnica",
        description:
          "Diseño e impartición de cursos técnicos en Introducción a Informática, Word, Excel, PowerPoint y Bases de Datos para jóvenes y adultos.",
      },
      {
        title: "Licenciatura en Ingeniería Informática — Gerencia Informática",
        status: "Universidad Central · 2026",
        stack: "Formación académica",
        description:
          "Sobre una base de Bachillerato en Ingeniería de Sistemas Informáticos (Universidad Latina, 2019), Licenciatura en Informática Educativa (Universidad Latina, 2009) y Bachillerato en Ciencias de la Educación — Informática Educativa (Universidad Latina, 2003).",
      },
    ],
  },
];

export const marqueeWords = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "WCAG 2.2",
  "Three.js",
];

export const sobreMi = {
  heading: "Sobre mí",
  name: site.name,
  paragraphs: [
    "Desarrollador fullstack con más de 18 años de experiencia en TI del sector público costarricense, especializado en React, Next.js, Node.js, PHP/MySQL y accesibilidad digital (WCAG 2.2 AA). Licenciatura en Ingeniería Informática (Gerencia Informática) en curso, sobre una base de Bachillerato en Ingeniería de Sistemas y formación previa en Informática Educativa.",
    "Autor de tres herramientas open source publicadas en npm: wcag-agent, agente de auditoría de accesibilidad para asistentes de IA (Claude Code, Cursor, Copilot, Windsurf y más); @jalonsc66/a11y-ci, que lleva esa misma auditoría al pipeline de CI/CD; y scroll-flyover, un skill de Claude Code para construir experiencias 3D de scroll con Three.js sin costo de generación por build.",
    "Actualmente en la Dirección General del Servicio Civil (DGSC), donde lidero la accesibilidad WCAG 2.2 AA del sitio institucional y su reconstrucción integral rumbo a diciembre de 2026, además de haber desarrollado el CMS headless institucional propio con 18 colecciones de contenido. Antes, 15 años en el Ministerio de Agricultura y Ganadería diseñando sistemas institucionales de principio a fin.",
    "En paralelo, desarrollo producto propio y para clientes: un ecosistema de agentes de IA (conversacionales, de clasificación de hallazgos y de generación automática de tareas), asistentes con RAG multi-modelo, plataformas SaaS y sitios para negocios.",
  ],
};
