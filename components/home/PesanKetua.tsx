"use client";

import Image from "next/image";
import { Quote, Sparkles, Target, Compass } from "lucide-react";

export default function PesanKetua() {
  return (
    <section className="relative overflow-hidden bg-[#F4F6FB] pt-20 pb-28 border-b border-slate-200/60">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 z-10">
        <div className="text-center max-w-xl mx-auto">
          <span className="inline-block rounded-full bg-blue-100/80 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-widest text-ipm-blue border border-blue-200/60">
            Kepemimpinan Pelajar
          </span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Pesan Ketua Umum
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-linear-to-r from-[#005BAC] via-[#00A651] to-[#F4C430]" />
        </div>

        <div className="mt-10 sm:mt-12 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs">
          <div className="grid gap-8 lg:grid-cols-12 items-center">
            {/* Foto Ketum (No Priority agar hemat bandwidth) */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative h-72 w-60 sm:h-88 sm:w-68 overflow-hidden rounded-2xl border border-slate-200 shadow-xs bg-slate-100 group">
                <Image
                  src="/anggota/bph/rendy-rafif-santoso.png"
                  alt="Rendy Rafif Santoso"
                  fill
                  sizes="(max-width: 640px) 240px, 272px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-center">
                  <span className="inline-block rounded-xl bg-slate-900/90 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-white border border-white/10">
                    Ketua Umum 2026/2027
                  </span>
                </div>
              </div>
            </div>

            {/* Kutipan & Deskripsi */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-500 border border-amber-200/60">
                <Quote size={20} />
              </div>

              <blockquote className="text-lg sm:text-2xl font-black italic leading-snug text-slate-800">
                &ldquo;Jika periode saya gagal, itu murni kesalahan saya. Tapi jika periode saya berhasil, itu karena pengurus saya yang hebat. Jadi jangan pernah untuk takut mencoba.&rdquo;
              </blockquote>

              <div>
                <h3 className="text-base font-extrabold text-slate-900">Rendy Rafif Santoso</h3>
                <p className="text-xs font-bold uppercase tracking-wider text-ipm-blue">
                  PR IPM SMK Muhammadiyah 2 Cileungsi
                </p>
              </div>

              <hr className="border-slate-100" />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 px-3.5 py-2.5 border border-slate-200/80">
                  <Compass className="text-ipm-blue shrink-0" size={16} />
                  <span className="text-xs font-bold text-slate-700">Religius & Inovatif</span>
                </div>
                <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 px-3.5 py-2.5 border border-slate-200/80">
                  <Target className="text-ipm-green shrink-0" size={16} />
                  <span className="text-xs font-bold text-slate-700">Kader Produktif</span>
                </div>
                <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 px-3.5 py-2.5 border border-slate-200/80">
                  <Sparkles className="text-amber-500 shrink-0" size={16} />
                  <span className="text-xs font-bold text-slate-700">Dampak Nyata</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}