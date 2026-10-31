"use client";

import Image from "next/image";
import { X, Quote, Calendar, MapPin, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type Member = {
  nama: string;
  jabatan: string;
  foto: string;
  angkatan: string;
  ttl: string;
  alasan: string;
  motivasi: string;
  quote: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  data: Member | null;
};

export default function BiodataModal({ open, onClose, data }: Props) {
  return (
    <AnimatePresence>
      {open && data && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-3 sm:p-6 backdrop-blur-sm overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl border border-slate-100"
          >
            {/* TOMBOL CLOSE */}
            <button
              onClick={onClose}
              className="absolute right-3.5 top-3.5 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/60 text-white backdrop-blur-md transition hover:bg-rose-500 cursor-pointer sm:right-5 sm:top-5 sm:h-10 sm:w-10"
              aria-label="Tutup modal"
            >
              <X size={18} />
            </button>

            <div className="grid lg:grid-cols-12">
              {/* FOTO HEADER (PADA MOBILE: TERKONTROL) */}
              <div className="relative h-64 sm:h-80 lg:h-full lg:min-h-105 lg:col-span-5 bg-slate-100 overflow-hidden">
                <Image
                  src={data.foto || "/placeholder-user.jpg"}
                  alt={data.nama}
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent lg:hidden" />
                <div className="absolute bottom-3 left-4 right-4 lg:hidden">
                  <span className="inline-flex items-center gap-1 rounded-full bg-ipm-green/90 px-3 py-0.5 text-[10px] font-extrabold uppercase text-white backdrop-blur-md">
                    {data.jabatan}
                  </span>
                  <h3 className="text-xl font-black text-white mt-1 line-clamp-1">{data.nama}</h3>
                </div>
              </div>

              {/* KONTEN BIODATA */}
              <div className="p-5 sm:p-8 lg:col-span-7 flex flex-col justify-between space-y-5">
                <div>
                  <div className="hidden lg:inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-extrabold text-ipm-blue border border-blue-100 uppercase tracking-wider">
                    <Sparkles size={12} />
                    <span>{data.jabatan}</span>
                  </div>

                  <h2 className="hidden lg:block mt-2 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {data.nama}
                  </h2>

                  {/* INFO ANGKATAN & TTL */}
                  <div className="grid gap-3 grid-cols-2">
                    <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 border border-slate-100">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-ipm-blue">
                        <Calendar size={16} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Angkatan</p>
                        <p className="text-xs font-extrabold text-slate-900 truncate">{data.angkatan || "-"}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 border border-slate-100">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-ipm-green">
                        <MapPin size={16} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">TTL</p>
                        <p className="text-xs font-extrabold text-slate-900 truncate">{data.ttl || "-"}</p>
                      </div>
                    </div>
                  </div>

                  {/* ALASAN & MOTIVASI */}
                  <div className="mt-4 space-y-3.5">
                    <div className="space-y-0.5">
                      <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Alasan Bergabung</h3>
                      <p className="text-xs leading-relaxed text-slate-700 font-medium">{data.alasan || "-"}</p>
                    </div>

                    <div className="space-y-0.5">
                      <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Motivasi</h3>
                      <p className="text-xs leading-relaxed text-slate-700 font-medium">{data.motivasi || "-"}</p>
                    </div>
                  </div>
                </div>

                {/* MOTTO HIDUP CARD */}
                <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#005BAC] to-[#00A651] p-4 text-white shadow-lg">
                  <Quote className="absolute -right-2 -bottom-2 text-white/10" size={70} />
                  <div className="relative z-10">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-blue-200">Motto Hidup</p>
                    <p className="mt-1 text-xs sm:text-sm font-bold italic leading-snug">
                      &ldquo;{data.quote || "-"}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}