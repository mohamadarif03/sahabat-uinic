import type { Metadata, Viewport } from "next";
import { Outfit, Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "SAHABAT - Mulai Perjalananmu Bersama Al-Qur'an",
  description: "Temukan pengalaman membaca dan mempelajari Al-Qur'an yang lebih nyaman, terarah, dan bermakna bersama SAHABAT.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SAHABAT",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#15803D",
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${outfit.variable} ${playfair.variable} ${montserrat.variable} scroll-smooth`}
    >
      <body className="antialiased selection:bg-[#86EFAC]/40 selection:text-[#15803D]">
        {children}
        <PWAInstallPrompt />
      </body>
    </html>
  );
}
