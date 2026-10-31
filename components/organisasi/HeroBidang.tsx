"use client";

import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import DecorShapes from "@/components/ui/DecorShapes";

interface HeroBidangProps {
  nama: string;
  slogan: string;
  gambar?: string;
}

export default function HeroBidang({ nama, slogan }: HeroBidangProps) {
  return (
    <section className="relative flex min-h-[85vh] sm:min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-[#002E5B] via-[#0B3D91] to-[#20245C] py-16 px-4">
      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-size-[35px_35px] sm:bg-size-[45px_45px]" />

      <DecorShapes variant="dark" />

      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs sm:text-sm font-extrabold uppercase tracking-[4px] sm:tracking-[7px] text-ipm-yellow"
          >
            Bidang-Bidang IPM SMK Muda
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-3 sm:mt-6 text-3xl sm:text-5xl md:text-6xl font-black leading-tight text-white tracking-tight"
          >
            {nama}
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="mx-auto mt-4 sm:mt-8 h-1 w-20 sm:w-28 origin-center rounded-full bg-linear-to-r from-[#005BAC] via-[#00A651] to-[#F4C430]"
          />

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mx-auto mt-4 sm:mt-8 max-w-2xl text-xs sm:text-base md:text-lg leading-relaxed text-slate-200 font-medium"
          >
            {slogan}
          </motion.p>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80"
      >
        <ChevronDown size={32} className="sm:h-10 sm:w-10" />
      </motion.div>
    </section>
  );
}