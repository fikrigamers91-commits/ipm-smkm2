"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowUpRight, BookOpen } from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";

type MuazineItem = {
  slug: string;
  judul: string;
  cover: string;
  kategori: string;
  tanggal: string;
};

const DEFAULT_ARTIKEL: MuazineItem[] = [
  {
    slug: "muazine-edisi-1",
    judul: "Selamat Datang di Website Resmi PR IPM SMK Muhammadiyah 2 Cileungsi",
    cover: "/muazine/default.jpg",
    kategori: "MUAZINE",
    tanggal: "25 Agustus 2026",
  },
  {
    slug: "fortasi-2026",
    judul: "Keseruan Pelaksanaan FORTASI SMK Muda Cileungsi Periode Ini",
    cover: "/muazine/default.jpg",
    kategori: "BERITA",
    tanggal: "20 Agustus 2026",
  },
  {
    slug: "kajian-pelajar",
    judul: "Kajian Rutin Pelajar: Membangun Karakter Berjiwa Islami",
    cover: "/muazine/default.jpg",
    kategori: "KDI",
    tanggal: "15 Agustus 2026",
  },
];

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function HomeMuazine() {
  const [articles, setArticles] = useState<MuazineItem[]>(DEFAULT_ARTIKEL);

  useEffect(() => {
    async function getLatestMuazine() {
      try {
        const { data } = await supabase
          .from("muazine")
          .select("*")
          .eq("status", "terbit")
          .order("created_at", { ascending: false })
          .limit(3);

        if (data && data.length > 0) {
          const mapped = data.map((item) => ({
            slug: item.slug || "artikel",
            judul: item.judul || "Judul Artikel",
            cover: item.gambar || "/muazine/default.jpg",
            kategori: (item.kategori || "BERITA").toUpperCase(),
            tanggal: new Date(item.created_at || Date.now()).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
          }));
          setArticles(mapped);
        }
      } catch {
        // Tetap menggunakan DEFAULT_ARTIKEL tanpa merusak tata letak
      }
    }
    getLatestMuazine();
  }, []);

  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="font-bold uppercase tracking-[4px] text-ipm-blue text-xs sm:text-sm">
              Muazine & Literasi
            </span>
            <h2 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl tracking-tight">
              Kabar & Opini Terbaru
            </h2>
          </div>
          <Link
            href="/muazine"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ipm-blue hover:underline"
          >
            <span>Lihat Semua Artikel</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((item) => (
            <Link
              key={item.slug}
              href={`/muazine/${item.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-50/50 shadow-xs transition duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative h-48 w-full overflow-hidden bg-slate-200">
                <Image
                  src={item.cover}
                  alt={item.judul}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 rounded-full bg-slate-950/80 px-3 py-1 text-[10px] font-extrabold text-white backdrop-blur-md">
                  {item.kategori}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between p-5">
                <h3 className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-ipm-blue transition leading-snug">
                  {item.judul}
                </h3>

                <div className="mt-4 flex items-center justify-between text-[11px] font-semibold text-slate-400 pt-3 border-t border-slate-200/60">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    <span>{item.tanggal}</span>
                  </div>
                  <div className="flex items-center gap-1 text-ipm-blue font-bold">
                    <BookOpen size={13} />
                    <span>Baca</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}