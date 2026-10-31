"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaInstagram, FaYoutube, FaSpotify, FaTiktok } from "react-icons/fa6";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  // Sembunyikan Footer di halaman admin dan login
  if (pathname.startsWith("/admin") || pathname === "/login") return null;

  const socials = [
    {
      href: "https://www.instagram.com/ipmsmkmuda_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      label: "Instagram",
      Icon: FaInstagram,
    },
    {
      href: "https://youtube.com/@ipmsmkmuda326?si=KgX_7_ztd8QlxFVm",
      label: "YouTube",
      Icon: FaYoutube,
    },
    {
      href: "https://open.spotify.com/playlist/5yzwdSWNxZz8X2h7zLa9JF?si=vuVNa95cTx608fr8q8ybbA",
      label: "Spotify",
      Icon: FaSpotify,
    },
  ];

  return (
    <footer className="w-full bg-slate-50 pt-10 pb-0 px-2 sm:px-4">
      {/* CONTAINER UTAMA (Melengkung atas, bawah rapat tanpa celah) */}
      <div className="relative mx-auto max-w-[98%] overflow-hidden rounded-t-[2.5rem] rounded-b-none bg-linear-to-br from-blue-600 via-blue-700 to-emerald-600 px-6 sm:px-12 pt-14 pb-8 text-white shadow-2xl">
        
        {/* Latar Belakang Dekoratif Motif Pola Halus */}
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-between gap-10 lg:flex-row lg:items-center">
          
          {/* SISI KIRI: HEADLINE UTAMA */}
          <div className="max-w-2xl space-y-4">
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
              Terhubung dengan Kami
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-blue-100/90 font-medium max-w-xl">
              Jadilah bagian dari ikatan pelajar yang berilmu, berprestasi, dan berakhlak mulia. Dapatkan berita dan dokumentasi kegiatan terbaru langsung dari media resmi kami.
            </p>
          </div>

          {/* SISI KANAN: SOSIAL MEDIA & TOMBOL KONTAK */}
          <div className="flex flex-col gap-6 lg:items-end">
            
            {/* Tombol Kontak Kami */}
            <Link
              href="/kontak"
              className="inline-flex items-center gap-2.5 self-start lg:self-end rounded-full bg-white px-7 py-3 text-sm font-bold text-slate-900 shadow-lg transition duration-300 hover:bg-amber-400 hover:text-slate-950 hover:-translate-y-1"
            >
              <span>Kontak Kami</span>
              <ArrowRight size={18} />
            </Link>

            {/* Ikon Sosial Media Putih Bulat */}
            <div className="flex flex-wrap items-center gap-3">
              {socials.map(({ href, label, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-900 shadow-md transition duration-300 hover:-translate-y-1 hover:bg-amber-400 hover:text-slate-950"
                >
                  <Icon size={19} />
                </Link>
              ))}

              {/* TikTok Disabled Badge */}
              <span
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white/50 backdrop-blur-sm cursor-not-allowed"
                title="TikTok Segera Hadir"
              >
                <FaTiktok size={19} />
              </span>
            </div>

            {/* Navigasi Privasi & Syarat */}
            <div className="flex flex-wrap gap-5 text-xs font-semibold text-blue-100/80 pt-1">
              <Link href="/tentang" className="hover:text-amber-300 transition underline underline-offset-4">
                Tentang Kami
              </Link>
              <span>•</span>
              <Link href="/program-kerja" className="hover:text-amber-300 transition underline underline-offset-4">
                Program Kerja
              </Link>
              <span>•</span>
              <Link href="/media" className="hover:text-amber-300 transition underline underline-offset-4">
                Galeri Media
              </Link>
              <span>•</span>
              <Link href="/kebijakan-privasi" className="hover:text-amber-300 transition underline underline-offset-4">
                Kebijakan Privasi
              </Link>
            </div>
          </div>
        </div>

        {/* GARIS PEMBATAS & COPYRIGHT */}
        <div className="mt-12 border-t border-white/15 pt-6 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-medium text-blue-100/70">
          <p>© 2026 PR IPM SMK Muhammadiyah 2 Cileungsi. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}