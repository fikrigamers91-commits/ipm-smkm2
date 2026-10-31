"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Pengurus = {
  nama: string;
  jabatan: string;
  foto: string;
  angkatan: string;
  quote: string;
  onClick: () => void;
};

type Props = {
  ketua: Pengurus;
  sekretaris: Pengurus;
};

function Card({ data }: { data: Pengurus }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
      onClick={data.onClick}
      className="group cursor-pointer overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs transition hover:shadow-xl hover:border-ipm-blue/30 flex flex-col justify-between"
    >
      {/* FOTO RESPONSIF */}
      <div className="relative aspect-3/4 w-full overflow-hidden bg-slate-50">
        <Image
          src={data.foto}
          alt={`Foto ${data.nama}`}
          fill
          className="object-cover object-top transition duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, 50vw"
        />

        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-white via-white/70 to-transparent pointer-events-none" />
      </div>

      {/* CONTENT */}
      <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest text-ipm-blue">
            {data.jabatan}
          </p>

          <h3 className="mt-1 text-2xl font-black text-slate-900 group-hover:text-ipm-blue transition line-clamp-1">
            {data.nama}
          </h3>

          <span className="mt-2 inline-block rounded-full bg-ipm-blue/10 px-3 py-1 text-xs font-bold text-ipm-blue">
            Angkatan {data.angkatan}
          </span>

          <div className="mt-4 rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Motto
            </p>
            <p className="mt-1.5 line-clamp-3 text-xs italic leading-relaxed text-slate-600 font-medium">
              &ldquo;{data.quote}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function PengurusInti({ ketua, sekretaris }: Props) {
  return (
    <section className="bg-slate-50/80 py-12 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[4px] sm:tracking-[6px] text-ipm-green">
            Pengurus Inti
          </p>

          <h2 className="mt-2 sm:mt-4 text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Ketua & Sekretaris Bidang
          </h2>

          <div className="mx-auto mt-3 sm:mt-5 h-1 w-16 sm:w-24 rounded-full bg-linear-to-r from-[#005BAC] via-[#00A651] to-[#F4C430]" />

          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-xs sm:text-base leading-relaxed text-slate-600 font-medium">
            Dua sosok yang menjadi motor penggerak bidang ini dalam merancang program, mengoordinasikan anggota, dan menjalankan amanah organisasi.
          </p>
        </div>

        <div className="mt-10 sm:mt-16 grid gap-6 sm:gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          <Card data={ketua} />
          <Card data={sekretaris} />
        </div>
      </div>
    </section>
  );
}