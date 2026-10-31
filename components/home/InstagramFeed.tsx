"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaInstagram } from "react-icons/fa6";

export default function InstagramFeed() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 border-t border-slate-200/80">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-tr from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white shadow-lg mb-4">
          <FaInstagram size={24} />
        </div>

        <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
          Ikuti Perkembangan Kami di Instagram
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm font-medium text-slate-600">
          Dapatkan dokumentasi harian, info keseruan acara, dan konten kreatif langsung di akun resmi @ipmsmkmuda_
        </p>

        <div className="mt-6 flex justify-center">
          <Link
            href="https://www.instagram.com/ipmsmkmuda_/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-2xl bg-slate-950 px-6 py-3.5 text-xs font-bold text-white shadow-lg transition hover:bg-slate-800 hover:-translate-y-0.5"
          >
            <FaInstagram size={16} />
            <span>@ipmsmkmuda_</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}