import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import BackgroundAnimation from "@/components/BackgroundAnimation";

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Nombre Apellido | Diseño hacia la memoria",
  description:
    "Plantilla editorial para portafolio personal: pedagogía, investigación y diseño de acciones territoriales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${plexMono.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:bg-bg focus-visible:px-4 focus-visible:py-2 focus-visible:text-ink"
        >
          Saltar al contenido principal
        </a>
        <BackgroundAnimation />
        {children}
      </body>
    </html>
  );
}
