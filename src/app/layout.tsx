import type { Metadata } from "next";
import { Bebas_Neue, IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-poster",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Alonso Salguero Ceballos | Desarrollador Fullstack & Accesibilidad Web",
  description:
    "Portafolio de Alonso Salguero Ceballos: desarrollador fullstack especializado en React, Next.js y accesibilidad WCAG 2.2 AA. Herramientas open source, proyectos institucionales y freelance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${plexMono.variable} ${spaceGrotesk.variable} ${bebasNeue.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:bg-bg focus-visible:px-4 focus-visible:py-2 focus-visible:text-ink"
        >
          Saltar al contenido principal
        </a>
        <Preloader />
        <SmoothScroll />
        <BackgroundAnimation />
        {children}
      </body>
    </html>
  );
}
