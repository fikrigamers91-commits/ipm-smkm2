"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, Sparkles, Target, Compass } from "lucide-react";

export default function PesanKetua() {
  return (
    <section className="relative overflow-hidden bg-slate-50/50 py-16 sm:py-24">
      {/* Background Ambient Halus (Tanpa Blur Berat) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-50/40 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Header Judul */}
        <div className="text-center max-w-xl mx-auto">
          <span className="inline-block rounded-full bg-blue-50 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-widest text-emerald-700 border border-blue-100/80">
            Kepemimpinan Pelajar
          </span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Pesan Ketua Umum
          </h2>
          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-emerald-600" />
        </div>

        {/* Card Utama */}
        <div className="mt-10 sm:mt-12 rounded-3xl border border-slate-200/70 bg-white p-6 sm:p-10 shadow-sm transition-all hover:shadow-md">
          <div className="grid gap-8 lg:grid-cols-12 items-center">
            
            {/* Foto Ketum */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-5 relative flex justify-center"
            >
              <div className="relative h-72 w-60 sm:h-88 sm:w-68 overflow-hidden rounded-2xl border border-slate-200/80 shadow-xs bg-slate-100 group">
                <Image
                  src="/anggota/bph/rendy-rafif-santoso.png"
                  alt="Rendy Rafif Santoso"
                  fill
                  sizes="(max-width: 640px) 240px, 272px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/75 via-transparent to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 text-center">
                  <span className="inline-block rounded-xl bg-slate-900/85 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-white border border-white/10">
                    Ketua Umum 2026/2027
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Kutipan & Deskripsi */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="lg:col-span-7 space-y-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-500 border border-amber-200/60">
                <Quote size={20} />
              </div>

              <blockquote className="text-lg sm:text-2xl font-black italic leading-snug text-slate-800">
                &ldquo;Jangan takut gagal, takutlah jika kamu tidak pernah mencoba melangkah untuk kebaikan.&rdquo;
              </blockquote>

              <div>
                <h3 className="text-base font-extrabold text-slate-900">Rendy Rafif Santoso</h3>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  PR IPM SMK Muhammadiyah 2 Cileungsi
                </p>
              </div>

              <hr className="border-slate-100" />

              {/* 3 Pilar Arah Gerak */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 px-3.5 py-2.5 border border-slate-200/60 transition hover:border-slate-300">
                  <Compass className="text-emerald-700 shrink-0" size={16} />
                  <span className="text-xs font-bold text-slate-700">Religius & Inovatif</span>
                </div>
                <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 px-3.5 py-2.5 border border-slate-200/60 transition hover:border-slate-300">
                  <Target className="text-emerald-700 shrink-0" size={16} />
                  <span className="text-xs font-bold text-slate-700">Kader Produktif</span>
                </div>
                <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 px-3.5 py-2.5 border border-slate-200/60 transition hover:border-slate-300">
                  <Sparkles className="text-amber-500 shrink-0" size={16} />
                  <span className="text-xs font-bold text-slate-700">Dampak Nyata</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}