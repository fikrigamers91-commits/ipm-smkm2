"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const bidang = [
  { nama: "Badan Pengurus Harian", gambar: "/kelompok/bph-gabungan.png", href: "/organisasi/bph", warna: "from-amber-600/80" },
  { nama: "Perkaderan", gambar: "/kelompok/perkaderan-gabungan.png", href: "/organisasi/perkaderan", warna: "from-blue-600/80" },
  { nama: "KDI", gambar: "/kelompok/kdi-gabungan.png", href: "/organisasi/kdi", warna: "from-green-600/80" },
  { nama: "PIP", gambar: "/kelompok/pip-gabungan.png", href: "/organisasi/pip", warna: "from-yellow-500/80" },
  { nama: "ASBO", gambar: "/kelompok/asbo-gabungan.png", href: "/organisasi/asbo", warna: "from-purple-600/80" },
  { nama: "PKK", gambar: "/kelompok/pkk-gabungan.png", href: "/organisasi/pkk", warna: "from-pink-600/80" },
  { nama: "Advokasi", gambar: "/kelompok/advokasi-gabungan.png", href: "/organisasi/advokasi", warna: "from-cyan-600/80" },
  { nama: "Ke-IPMAWATIAN", gambar: "/kelompok/ipmawati-gabungan.png", href: "/organisasi/ipmawati", warna: "from-rose-600/80" },
];

export default function BidangSection() {
  return (
    <section className="relative overflow-hidden bg-[#20245C] py-28">
      {/* Wave Atas */}
      <div className="absolute left-0 top-0 h-28 w-full overflow-hidden pointer-events-none">
        <svg viewBox="0 0 1440 140" className="h-full w-full fill-white" preserveAspectRatio="none">
          <path d="M0,20 C350,120 1050,-20 1440,70 L1440,0 L0,0Z" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="mt-4 text-3xl font-black text-white sm:text-5xl">
            Bidang PR IPM SMK Muda Cileungsi
          </h2>
          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-linear-to-r from-[#005BAC] via-[#00A651] to-[#F4C430]" />
          <p className="mx-auto mt-8 max-w-3xl text-sm sm:text-lg leading-8 text-slate-300">
            Setiap bidang memiliki peran dan tanggung jawab yang berbeda, namun semuanya bekerja sama untuk mencapai tujuan organisasi.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bidang.map((item) => (
            <div key={item.nama}>
              <Link
                href={item.href}
                className="group relative block overflow-hidden rounded-2xl border border-white/10 shadow-xl transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative h-60 w-full">
                  <Image
                    src={item.gambar}
                    alt={item.nama}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className={`absolute inset-0 bg-linear-to-t ${item.warna} via-black/30 to-black/60 transition-opacity duration-300 group-hover:opacity-90`} />

                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-2xl font-black text-white drop-shadow-md">
                    {item.nama}
                  </h3>

                  <div className="mt-4 flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="font-semibold text-white text-sm">Pelajari Bidang</span>
                    <ArrowRight size={16} className="text-white" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}