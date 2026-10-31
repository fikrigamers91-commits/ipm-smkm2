"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

type Props = {
  title: string;
  items: string[];
};

export default function WhatWeDo({ title, items }: Props) {
  return (
    <section className="relative overflow-hidden bg-slate-50/80 py-12 sm:py-20 md:py-24">
      <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 rounded-full bg-ipm-blue/5 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-64 w-64 rounded-full bg-ipm-green/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[4px] sm:tracking-[6px] text-ipm-green">
            What We Do
          </p>

          <h2 className="mt-2 sm:mt-4 text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Apa yang Dilakukan {title}?
          </h2>

          <div className="mx-auto mt-3 sm:mt-5 h-1 w-16 sm:w-24 rounded-full bg-linear-to-r from-[#005BAC] via-[#00A651] to-[#F4C430]" />

          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-xs sm:text-base leading-relaxed text-slate-600 font-medium">
            Berikut beberapa fokus utama yang menjadi tanggung jawab bidang ini selama satu periode kepengurusan.
          </p>
        </motion.div>

        <div className="mt-10 sm:mt-16 grid gap-4 sm:gap-6 md:grid-cols-2">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-7 shadow-xs hover:shadow-md transition"
            >
              <div className="flex gap-4 items-start">
                <CheckCircle2
                  size={22}
                  className="mt-0.5 shrink-0 text-ipm-green"
                />
                <p className="text-xs sm:text-sm leading-relaxed text-slate-700 font-medium">
                  {item}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}