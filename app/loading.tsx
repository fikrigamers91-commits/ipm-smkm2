"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <main className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-slate-50/95 backdrop-blur-xs">
      
      {/* Dynamic Ambient Background Glow (Warna Hex Langsung & Ringan) */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: "easeInOut",
        }}
        className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-ipm-blue/20 blur-3xl transform-gpu pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.15, 1, 1.15],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: "easeInOut",
          delay: 1.75,
        }}
        className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-ipm-green/20 blur-3xl transform-gpu pointer-events-none"
      />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center px-4">
        
        {/* Logo Container dengan Aura Pulsing Warna-warni */}
        <div className="relative flex items-center justify-center">
          {/* Outer Pulsing Ring */}
          <motion.div
            animate={{
              scale: [0.95, 1.12, 0.95],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
            className="absolute h-32 w-32 rounded-3xl bg-linear-to-tr from-[#005BAC]/30 via-[#00A651]/30 to-[#F4C430]/30 blur-md"
          />

          {/* Frame Utama Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative flex h-28 w-28 items-center justify-center rounded-3xl border border-slate-200/80 bg-white p-3 shadow-xl shadow-slate-200/60"
          >
            <Image
              src="/logo/logo-ipm.png"
              alt="Logo IPM"
              width={85}
              height={85}
              priority
              className="object-contain"
            />
          </motion.div>
        </div>

        {/* Circular Spinner Warna-Warni (Biru & Hijau IPM) */}
        <div className="relative mt-7 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 0.8,
              ease: "linear",
            }}
            className="h-10 w-10 rounded-full border-3 border-slate-200 border-t-ipm-blue border-r-ipm-green shadow-2xs"
          />
        </div>

        {/* Status Loading Text */}
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="mt-3.5 text-xs font-bold tracking-wide text-slate-600"
        >
          Memuat halaman...
        </motion.p>
      </div>
    </main>
  );
}