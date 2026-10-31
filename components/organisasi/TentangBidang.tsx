"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

type TentangBidangProps = {
  deskripsi: string;
  tugas: string[];
};

export default function TentangBidang({
  deskripsi,
  tugas,
}: TentangBidangProps) {
  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-20 md:py-24">
      <div className="pointer-events-none absolute -left-24 top-10 h-56 w-56 rounded-full bg-ipm-blue/5 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-ipm-green/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[4px] sm:tracking-[6px] text-ipm-blue">
            Tentang Bidang
          </p>

          <h2 className="mt-2 sm:mt-4 text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Apa Peran Bidang Ini?
          </h2>

          <div className="mx-auto mt-3 sm:mt-5 h-1 w-16 sm:w-24 rounded-full bg-linear-to-r from-[#005BAC] via-[#00A651] to-[#F4C430]" />
        </motion.div>

        <div className="mt-10 sm:mt-16 grid gap-8 lg:grid-cols-2 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-slate-100 bg-slate-50/50 p-6 sm:p-8"
          >
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Deskripsi Bidang
            </h3>

            <p className="mt-4 text-xs sm:text-base leading-relaxed text-slate-600 font-medium">
              {deskripsi}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs"
          >
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Tugas Utama
            </h3>

            <div className="mt-6 space-y-4">
              {tugas.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-ipm-green"
                  />
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-700 font-medium">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}