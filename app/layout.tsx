import type { Metadata } from "next";
import { Sora, Manrope, Space_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import BackToTop from "@/components/ui/BackToTop";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/PageTransition";
import AiChatWidget from "@/components/AiChatWidget";

// Sora & Manrope adalah Variable Fonts (array weight dihapus agar kompilasi Turbopack lancar)
const sora = Sora({ 
  subsets: ["latin"], 
  variable: "--font-sora", 
  display: "swap" 
});

const manrope = Manrope({ 
  subsets: ["latin"], 
  variable: "--font-manrope", 
  display: "swap" 
});

// Space Mono bukan variable font, jadi tetap pakai opsi weight
const spaceMono = Space_Mono({ 
  subsets: ["latin"], 
  weight: ["400", "700"], 
  variable: "--font-space-mono", 
  display: "swap" 
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ipm-smkm2.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PR IPM SMK Muhammadiyah 2 Cileungsi | Website Resmi IPM SMK Muda",
    template: "%s | PR IPM SMK Muhammadiyah 2 Cileungsi",
  },
  description:
    "Website Resmi Pimpinan Ranting Ikatan Pelajar Muhammadiyah (PR IPM) SMK Muhammadiyah 2 Cileungsi (SMK Muda). Pusat informasi kegiatan, artikel Muazine, media, dan program kerja organisasi.",
  icons: {
    icon: "/logo/logoipmsmk2.png",
    shortcut: "/logo/logoipmsmk2.png",
    apple: "/logo/logoipmsmk2.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PR IPM SMK Muhammadiyah 2 Cileungsi",
    description: "Portal resmi Pimpinan Ranting IPM SMK Muhammadiyah 2 Cileungsi.",
    url: siteUrl,
    siteName: "PR IPM SMK Muda Cileungsi",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PR IPM SMK Muhammadiyah 2 Cileungsi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PR IPM SMK Muhammadiyah 2 Cileungsi",
    description: "Portal resmi Pimpinan Ranting IPM SMK Muhammadiyah 2 Cileungsi.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${sora.variable} ${manrope.variable} ${spaceMono.variable} overflow-x-hidden`}
    >
      <body className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-slate-950 text-slate-100 transition-colors duration-300 selection:bg-emerald-500 selection:text-slate-950">
        <Navbar />

        <main className="flex-1 w-full overflow-x-hidden">
          <PageTransition>
            {children}
          </PageTransition>
        </main>

        <BackToTop />
        <AiChatWidget />
        <Footer />
      </body>
    </html>
  );
}