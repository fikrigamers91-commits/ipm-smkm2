import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroTentang() {
  return (
    <section className="relative w-full overflow-hidden bg-linear-to-r from-[#005BAC] via-[#0A74CF] to-[#00A651] pt-28 pb-20 sm:pt-32 sm:pb-24">
      {/* BACKGROUND BLUEPRINT GRID PATTERN */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* GLOW ACCENT BLUR */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-10 -top-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute right-10 bottom-10 h-80 w-80 rounded-full bg-yellow-400/20 blur-3xl" />
      </div>

      {/* KONTEN HERO (RATA TENGAH SAMA PERSIS PAGEHERO) */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        
        {/* SUB-JUDUL / BADGE KUNING */}
        <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[3px] text-yellow-400 mb-3">
          TENTANG KAMI
        </p>

        {/* JUDUL UTAMA */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight text-white tracking-tight">
          PR IPM SMK Muhammadiyah 2{" "}
          <span className="text-yellow-400 block sm:inline">
            Cileungsi
          </span>
        </h1>

        {/* DESKRIPSI */}
        <p className="mt-5 mx-auto max-w-2xl text-xs sm:text-base md:text-lg leading-relaxed text-blue-100/90 font-normal">
          PR IPM SMK Muhammadiyah 2 Cileungsi merupakan organisasi pelajar
          Muhammadiyah yang menjadi wadah kaderisasi, pengembangan potensi,
          kepemimpinan, serta pembentukan karakter pelajar Islami yang
          berilmu, berprestasi, dan berkemajuan.
        </p>

        {/* ACTION BUTTONS */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <Link
            href="/organisasi/bph"
            className="rounded-full bg-white px-6 py-3 text-center text-xs sm:text-sm font-bold text-slate-900 shadow-lg transition duration-300 hover:bg-yellow-400 hover:-translate-y-0.5"
          >
            Lihat Semua Pengurus Kami!
          </Link>

          <Link
            href="/muazine"
            className="flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-xs sm:text-sm font-semibold text-white transition duration-300 hover:bg-white/10"
          >
            Baca Muazine Sekarang!
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>

      {/* GELOMBANG / WAVE PUTIH MENTOK */}
      <div className="absolute inset-x-0 bottom-0 z-20 overflow-hidden leading-none">
        <svg
          className="relative block w-full h-12 sm:h-20 text-white fill-current"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C150,90 350,-40 500,40 C650,120 900,20 1200,60 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
}