"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Newspaper, Search, X, Clock, ArrowRight, User, Sparkles, Filter } from "lucide-react";

import PageHero from "@/components/ui/PageHero";
import { artikel as staticArtikel } from "@/data/artikel";
import { createBrowserClient } from "@supabase/ssr";

type MuazineItem = {
  slug: string;
  judul: string;
  cover: string;
  kategori: string;
  preview: string;
  tanggal: string;
  penulis?: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "";

const supabase = createBrowserClient(supabaseUrl, supabaseKey);

const LIST_KATEGORI = [
  "Semua",
  "Berita",
  "Pengumuman",
  "Prestasi",
  "Opini",
  "Edukasi",
  "Dokumentasi",
];

function MuazineContent() {
  const searchParams = useSearchParams();
  const searchFromQuery = searchParams.get("search") || "";

  const [artikelList, setArtikelList] = useState<MuazineItem[]>(staticArtikel);
  const [selectedKategori, setSelectedKategori] = useState<string>("Semua");
  const [searchInput, setSearchInput] = useState<string>("");

  // DERIVED STATE: Menggabungkan input lokal & URL query tanpa useEffect (Menghilangkan Error Cascading Render)
  const activeSearch = searchInput || searchFromQuery;

  useEffect(() => {
    let isMounted = true;

    async function fetchMuazineFromSupabase() {
      try {
        const { data, error } = await supabase
          .from("muazine")
          .select("*")
          .eq("status", "terbit")
          .order("created_at", { ascending: false });

        if (error || !data) return;

        const dbArticles: MuazineItem[] = data.map((item) => {
          const rawDate = item.created_at || item.tanggal || new Date().toISOString();
          const formattedDate = new Date(rawDate).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });

          return {
            slug: item.slug,
            judul: item.judul,
            cover: item.gambar || "/muazine/default.jpg",
            kategori: item.kategori || "Berita",
            preview: item.isi ? item.isi.replace(/[#*>!-]/g, "").slice(0, 150) + "..." : "",
            tanggal: formattedDate,
            penulis: item.penulis || "Redaksi IPM Muda",
          };
        });

        if (isMounted) {
          const combinedMap = new Map<string, MuazineItem>();

          dbArticles.forEach((art) => combinedMap.set(art.slug, art));
          staticArtikel.forEach((art) => {
            if (!combinedMap.has(art.slug)) {
              combinedMap.set(art.slug, art);
            }
          });

          setArtikelList(Array.from(combinedMap.values()));
        }
      } catch (err) {
        console.warn("Menggunakan artikel statis fallback:", err);
      }
    }

    fetchMuazineFromSupabase();

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter artikel menggunakan useMemo
  const filteredArticles = useMemo(() => {
    return artikelList.filter((item) => {
      const matchesKategori =
        selectedKategori === "Semua" ||
        item.kategori?.toLowerCase() === selectedKategori.toLowerCase();

      const query = activeSearch.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.judul.toLowerCase().includes(query) ||
        item.preview.toLowerCase().includes(query) ||
        (item.penulis && item.penulis.toLowerCase().includes(query));

      return matchesKategori && matchesSearch;
    });
  }, [artikelList, selectedKategori, activeSearch]);

  // Cek artikel unggulan (featured) saat tanpa pencarian & kategori 'Semua'
  const isDefaultView = selectedKategori === "Semua" && !activeSearch;
  const featuredArticle = isDefaultView && filteredArticles.length > 0 ? filteredArticles[0] : null;
  const regularArticles = featuredArticle ? filteredArticles.slice(1) : filteredArticles;

  return (
    <main className="w-full overflow-hidden bg-white text-slate-900 font-sans">
      <PageHero
        badge="MUAZINE & ARTIKEL"
        title="Muazine PR IPM SMK Muhammadiyah 2"
        highlightTitle="Cileungsi"
        description="Muazine merupakan media publikasi resmi PR IPM SMK Muhammadiyah 2 Cileungsi yang menyajikan berita, opini, dokumentasi, serta informasi kegiatan organisasi."
      />

      <section className="relative pt-10 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* BRANDING HEADER LOGO */}
          <div className="mx-auto mb-8 flex max-w-4xl flex-col items-center text-center">
            <div className="relative w-56 sm:w-72 md:w-96 -mb-2">
              <Image
                src="/logo/muazine.png"
                alt="Logo Muazine"
                width={800}
                height={300}
                priority
                className="w-full h-auto drop-shadow-md transition duration-300 hover:scale-105 object-contain"
              />
            </div>

            <h2 className="px-2 text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight">
              Karya Literasi & Kabar Kegiatan Pelajar
            </h2>
          </div>

          {/* FILTER BAR & SEARCH BOX (SUPER CLEAN & COMPACT) */}
          <div className="mb-10 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              
              {/* Input Pencarian */}
              <div className="relative w-full sm:w-80">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari kata kunci atau judul..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-9 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
                />
                {activeSearch && (
                  <button
                    onClick={() => setSearchInput("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5"
                    title="Hapus pencarian"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Counter Total Data */}
              <div className="text-xs font-semibold text-slate-500 self-end sm:self-center">
                Menampilkan <strong className="text-slate-900 font-bold">{filteredArticles.length}</strong> artikel
              </div>
            </div>

            {/* Filter Pills Kategori */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200/60">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
                <Filter size={12} /> Kategori:
              </span>
              {LIST_KATEGORI.map((kat) => {
                const isActive = selectedKategori === kat;
                return (
                  <button
                    key={kat}
                    onClick={() => setSelectedKategori(kat)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-bold transition duration-200 cursor-pointer ${
                      isActive
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {kat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* FEATURED ARTICLE BANNER (Hanya tampil di tampilan default 'Semua') */}
          {featuredArticle && (
            <div className="mb-10">
              <Link
                href={`/muazine/${featuredArticle.slug}`}
                className="group relative grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:shadow-lg hover:border-blue-500/40"
              >
                <div className="relative h-64 lg:h-auto lg:col-span-7 bg-slate-100 overflow-hidden">
                  <Image
                    src={featuredArticle.cover}
                    alt={featuredArticle.judul}
                    width={1000}
                    height={600}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-bold text-white shadow-xs">
                      <Sparkles size={12} /> Artikel Utama
                    </span>
                    <span className="rounded-full bg-slate-900/80 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-white">
                      {featuredArticle.kategori}
                    </span>
                  </div>
                </div>

                <div className="flex lg:col-span-5 flex-col justify-between p-6 sm:p-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock size={13} className="text-slate-400" />
                        {featuredArticle.tanggal}
                      </span>
                      {featuredArticle.penulis && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <User size={13} className="text-slate-400" />
                            {featuredArticle.penulis}
                          </span>
                        </>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-blue-600 transition leading-snug">
                      {featuredArticle.judul}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {featuredArticle.preview}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                    <span>Baca Selengkapnya</span>
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* GRID LIST ARTIKEL BIASA */}
          {filteredArticles.length === 0 ? (
            <div className="py-16 text-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
              <Newspaper size={44} className="mx-auto text-slate-300" />
              <p className="mt-3 text-sm font-bold text-slate-700">
                Tidak ada artikel yang cocok
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Coba sesuaikan katakunci pencarian atau pilih kategori lain.
              </p>
              {activeSearch && (
                <button
                  onClick={() => setSearchInput("")}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
                >
                  <X size={14} /> Reset Pencarian
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {regularArticles.map((item, idx) => (
                <Link
                  key={item.slug || idx}
                  href={`/muazine/${item.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-xs transition duration-300 hover:-translate-y-1 hover:shadow-md hover:border-blue-500/30"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={item.cover}
                      alt={item.judul}
                      width={900}
                      height={600}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-slate-900/80 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold text-white">
                      {item.kategori}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                        <span>{item.tanggal}</span>
                        {item.penulis && <span className="truncate max-w-30">{item.penulis}</span>}
                      </div>

                      <h3 className="text-base font-extrabold text-slate-900 transition group-hover:text-blue-600 leading-snug">
                        {item.judul}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {item.preview}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-bold text-blue-600">
                      <span>Baca Artikel</span>
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>
      </section>
    </main>
  );
}

export default function MuazineClient() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white pt-40 text-center text-xs font-bold text-slate-400">Memuat Muazine...</div>}>
      <MuazineContent />
    </Suspense>
  );
}