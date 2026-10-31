"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Member } from "@/data/organisasi";

type Props = {
  anggota: Member[];
  onSelect: (anggota: Member) => void;
};

export default function AnggotaGrid({ anggota, onSelect }: Props) {
  return (
    <section className="bg-white py-12 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[4px] sm:tracking-[6px] text-ipm-blue">
            Anggota Bidang
          </p>

          <h2 className="mt-2 sm:mt-4 text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Tim Kami
          </h2>

          <div className="mx-auto mt-3 sm:mt-5 h-1 w-16 sm:w-24 rounded-full bg-linear-to-r from-[#005BAC] via-[#00A651] to-[#F4C430]" />
        </div>

        <div className="mt-10 sm:mt-16 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {anggota.map((item, index) => (
            <motion.div
              key={item.nama}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(item)}
              className="group cursor-pointer overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs transition hover:shadow-xl hover:border-ipm-blue/30 flex flex-col justify-between"
            >
              {/* FOTO RESPONGSIF */}
              <div className="relative aspect-3/4 w-full overflow-hidden bg-slate-50">
                <Image
                  src={item.foto}
                  alt={item.nama}
                  fill
                  className="object-cover object-top transition duration-500 group-hover:scale-105"
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                />

                <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-white via-white/70 to-transparent pointer-events-none" />
              </div>

              {/* CONTENT */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-ipm-blue transition line-clamp-1">
                    {item.nama}
                  </h3>

                  <span className="mt-2 inline-block rounded-full bg-ipm-green/10 px-3 py-1 text-xs font-bold text-ipm-green">
                    {item.jabatan}
                  </span>

                  <div className="mt-4 rounded-2xl bg-slate-50 p-3.5 border border-slate-100">
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                      Motto
                    </p>
                    <p className="mt-1.5 line-clamp-2 text-xs italic leading-relaxed text-slate-600 font-medium">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-5 w-full rounded-2xl bg-ipm-blue py-3 text-xs font-bold text-white transition hover:bg-[#00458E] shadow-xs active:scale-95 cursor-pointer"
                >
                  Lihat Biodata
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}