import Link from "next/link";
import {
  Construction,
  ArrowLeft,
  Music2,
} from "lucide-react";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";

export default function KontenPage() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-linear-to-br from-[#005BAC] via-[#0A74CF] to-[#00A651]">

      {/* Background */}
      <div className="absolute inset-0">

        <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute right-0 bottom-10 h-112.5 w-112.5 rounded-full bg-ipm-yellow/20 blur-3xl" />

      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center">

        <div className="rounded-full bg-white/15 p-6 backdrop-blur">
          <Construction
            size={60}
            className="text-white"
          />
        </div>

        <p className="mt-8 text-sm font-semibold uppercase tracking-[5px] text-blue-100">
          Coming Soon
        </p>

        <h1 className="mt-4 text-5xl font-black text-white md:text-6xl">
          Halaman Konten
          <br />
          Sedang Dikembangkan
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-blue-100">
          Kami sedang menyiapkan halaman khusus yang berisi seluruh
          konten PR IPM SMK Muhammadiyah 2 Cileungsi mulai dari
          Instagram, YouTube, hingga TikTok.
          Nantikan pembaruannya ya!
        </p>

        {/* Preview */}
        <div className="mt-14 grid w-full max-w-3xl gap-5 md:grid-cols-3">

          <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur">
            <FaInstagram
              className="mx-auto text-pink-300"
              size={40}
            />

            <h3 className="mt-5 text-xl font-bold text-white">
              Instagram
            </h3>

            <p className="mt-2 text-sm text-blue-100">
              Dokumentasi kegiatan, poster, dan informasi terbaru.
            </p>
          </div>

          <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur">
            <FaYoutube
              className="mx-auto text-red-300"
              size={40}
            />

            <h3 className="mt-5 text-xl font-bold text-white">
              YouTube
            </h3>

            <p className="mt-2 text-sm text-blue-100">
              Video kegiatan, aftermovie, dan dokumentasi.
            </p>
          </div>

          <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur">
            <Music2
              className="mx-auto text-cyan-300"
              size={40}
            />

            <h3 className="mt-5 text-xl font-bold text-white">
              TikTok
            </h3>

            <p className="mt-2 text-sm text-blue-100">
              Konten kreatif, reels, dan video singkat.
            </p>
          </div>

        </div>

        <Link
          href="/"
          className="mt-14 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 font-semibold text-ipm-blue transition hover:-translate-y-1 hover:shadow-2xl"
        >
          <ArrowLeft size={18} />
          Kembali ke Beranda
        </Link>

      </div>

      {/* Fade putih */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-linear-to-b from-transparent to-white" />

    </section>
  );
}