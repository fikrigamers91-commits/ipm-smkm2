"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Trophy, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-24">
      {/* Background Blob Dekoratif */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-16 top-12 h-40 w-40 rounded-full bg-ipm-green/10 pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -right-16 top-10 h-40 w-40 rounded-full bg-ipm-blue/10 pointer-events-none"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* HEADER SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="font-bold uppercase tracking-[4px] text-ipm-blue text-xs sm:text-sm">
            Tentang Kami
          </span>

          <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl md:text-5xl tracking-tight">
            Tempat Berkembang dan Berkarya
          </h2>

          <div className="mx-auto mt-4 h-1.5 w-20 rounded-full bg-linear-to-r from-[#005BAC] via-[#00A651] to-[#F4C430]" />

          <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-slate-600 font-medium sm:text-base md:text-lg">
            PR IPM SMK Muhammadiyah 2 Cileungsi hadir sebagai wadah bagi pelajar
            untuk belajar memimpin, mengembangkan potensi, serta berkarya
            bersama dalam semangat Islam Berkemajuan.
          </p>
        </motion.div>

        {/* 3 POIN UTAMA (RESPONSIVE GRID WITH MOBILE STAGGER) */}
        <div className="mt-12 sm:mt-16 grid gap-6 sm:gap-8 md:grid-cols-3">
          {/* POIN 1 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="group text-center p-6 rounded-3xl transition duration-300 hover:bg-slate-50/80 border border-transparent hover:border-slate-100"
          >
            <div className="mx-auto flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-ipm-blue/10 transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white shadow-xs">
              <HeartHandshake className="text-ipm-blue transition-colors group-hover:text-white" size={28} />
            </div>

            <h3 className="mt-4 text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              Berjiwa Islami
            </h3>

            <p className="mt-2.5 leading-relaxed text-slate-600 text-xs sm:text-sm font-medium">
              Menanamkan nilai-nilai Islam dalam setiap kegiatan, sehingga
              terbentuk karakter pelajar yang berakhlak dan bertanggung jawab.
            </p>
          </motion.div>

          {/* POIN 2 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -4 }}
            className="group text-center p-6 rounded-3xl transition duration-300 hover:bg-slate-50/80 border border-transparent hover:border-slate-100"
          >
            <div className="mx-auto flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-ipm-green/10 transition-transform duration-300 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white shadow-xs">
              <Sparkles className="text-ipm-green transition-colors group-hover:text-white" size={28} />
            </div>

            <h3 className="mt-4 text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
              Berkembang Bersama
            </h3>

            <p className="mt-2.5 leading-relaxed text-slate-600 text-xs sm:text-sm font-medium">
              Menjadi ruang belajar kepemimpinan, komunikasi, kreativitas,
              hingga pengalaman organisasi bagi seluruh anggota.
            </p>
          </motion.div>

          {/* POIN 3 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -4 }}
            className="group text-center p-6 rounded-3xl transition duration-300 hover:bg-slate-50/80 border border-transparent hover:border-slate-100"
          >
            <div className="mx-auto flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-ipm-yellow/20 transition-transform duration-300 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white shadow-xs">
              <Trophy className="text-[#D4A000] transition-colors group-hover:text-white" size={28} />
            </div>

            <h3 className="mt-4 text-lg sm:text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
              Berorientasi Prestasi
            </h3>

            <p className="mt-2.5 leading-relaxed text-slate-600 text-xs sm:text-sm font-medium">
              Mendorong setiap kader untuk terus berprestasi, berkarya,
              dan memberikan manfaat bagi sekolah maupun masyarakat.
            </p>
          </motion.div>
        </div>

        {/* BUTTON ACTION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-10 sm:mt-14 flex justify-center"
        >
          <Link
            href="/tentang"
            className="group inline-flex items-center gap-2.5 rounded-full border-2 border-ipm-blue px-6 py-3.5 sm:px-8 sm:py-4 text-xs sm:text-sm font-bold text-ipm-blue shadow-sm transition-all duration-300 hover:bg-ipm-blue hover:text-white hover:shadow-md"
          >
            <span>Yuk, Kenali Kami Lebih Dekat!</span>
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}