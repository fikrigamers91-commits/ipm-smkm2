"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
  nama: string;
  jabatan: string;
  foto: string;
  angkatan: string;
  quote: string;
  onClick: () => void;
};

export default function PengurusCard({
  nama,
  jabatan,
  foto,
  angkatan,
  quote,
  onClick,
}: Props) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs transition hover:shadow-xl hover:border-ipm-blue/30 flex flex-col justify-between"
    >
      {/* FOTO RESPONSIF */}
      <div className="relative aspect-3/4 w-full overflow-hidden bg-slate-50">
        <Image
          src={foto}
          alt={nama}
          fill
          className="object-cover object-top transition duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, 33vw"
        />

        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-white via-white/70 to-transparent pointer-events-none" />
      </div>

      {/* CONTENT */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest text-ipm-blue">
            {jabatan}
          </p>

          <h3 className="mt-1 text-xl font-black text-slate-900 group-hover:text-ipm-blue transition line-clamp-1">
            {nama}
          </h3>

          <span className="mt-2 inline-block rounded-full bg-ipm-blue/10 px-3 py-0.5 text-xs font-bold text-ipm-blue">
            Angkatan {angkatan}
          </span>

          <div className="mt-4 rounded-2xl bg-slate-50 p-3.5 border border-slate-100">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Motto
            </p>
            <p className="mt-1 line-clamp-3 text-xs italic leading-relaxed text-slate-600 font-medium">
              &ldquo;{quote}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}