import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import LiveActivityToasts from "@/components/Notifications/LiveActivityToasts";

export const metadata: Metadata = {
  title: "NOCTURNE // Haute Luxury Streetwear Atelier",
  description:
    "Contemporary luxury streetwear atelier modeled after the Nocturne digital aesthetic, engineered through heavyweight cottons, architectural silhouettes, and precision hardware. Explore latest drops, polo season, and the archive blind box vault.",
  keywords: [
    "Nocturne",
    "Luxury Streetwear",
    "Streetwear Atelier",
    "Blind Box",
    "Heavyweight Cotton",
    "Polo Season",
    "Cargos",
    "Nocturne Racing Club",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Syne:wght@700;800;900&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#070707] text-[#f4f4f4] min-h-screen selection:bg-brand-orange selection:text-white">
        <StoreProvider>
          {children}
          {/* Real-time drop notifications (Phase 3) */}
          <LiveActivityToasts />
        </StoreProvider>
      </body>
    </html>
  );
}
