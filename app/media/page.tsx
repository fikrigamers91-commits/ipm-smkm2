'use client';

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Images, Loader2, Search } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { getMediaList, MediaItem } from "@/lib/media";

function MediaContent() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchMediaData() {
      try {
        const data = await getMediaList();
        setMediaList(data || []);
      } catch (err) {
        console.warn("Gagal memuat data media:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMediaData();
  }, []);

  // Filter hanya berdasarkan query pencarian
  const filteredMedia = mediaList.filter((item) => {
    const matchesTitle = item.judul?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDesc = item.deskripsi?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTitle || matchesDesc;
  });

  return (
    <main className="w-full overflow-hidden bg-slate-50 text-slate-900 pb-24">
      {/* PAGE HERO UTAMA */}
      <PageHero
        badge="MEDIA & DOKUMENTASI"
        title="Media Kegiatan"
        highlightTitle="PR IPM SMK Muda"
        description="Seluruh arsip dokumentasi kegiatan PR IPM SMK Muhammadiyah 2 Cileungsi tersimpan dan dapat diakses secara resmi."
      />

      {/* KONTEN ALBUM & SEARCH */}
      <section className="relative pt-10 px-4 sm:px-6 mx-auto max-w-7xl">
        
        {/* KOTAK SEARCH BAR */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-slate-200/80 mb-10">
          <div className="relative w-full max-w-xl mx-auto">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Cari dokumentasi kegiatan / album foto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-full pl-11 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-all"
            />
          </div>
        </div>

        {/* LIST ALBUM MEDIA */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
            <Loader2 className="animate-spin text-blue-600" size={36} />
            <p className="text-sm font-semibold">Memuat dokumentasi media...</p>
          </div>
        ) : filteredMedia.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-sm">
            <Images className="mx-auto mb-3 opacity-40 text-blue-600" size={48} />
            <p className="text-lg font-bold text-slate-800">
              {searchQuery ? "Dokumentasi tidak ditemukan" : "Belum Ada Media Ter-upload"}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {searchQuery
                ? `Tidak ada dokumentasi dengan kata kunci "${searchQuery}".`
                : "Silakan upload dokumentasi melalui Dashboard Admin."}
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {filteredMedia.map((item) => (
              <a
                key={item.id}
                href={item.drive_url && item.drive_url !== "-" ? item.drive_url : "#"}
                target={item.drive_url && item.drive_url !== "-" ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-xl flex flex-col justify-between"
              >
                <div className="relative overflow-hidden bg-slate-100">
                  {/* COVER IMAGE */}
                  {item.image_url ? (
                    <Image
                      src={item.image_url}
                      alt={item.judul}
                      width={900}
                      height={600}
                      className="h-72 sm:h-80 w-full object-cover transition duration-700 group-hover:scale-105"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-72 sm:h-80 w-full items-center justify-center bg-slate-100 text-slate-400">
                      <Images size={48} />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-1.5 text-xs font-bold text-blue-700 backdrop-blur-md shadow-md">
                    📸 {item.kategori || "Album"}
                  </div>

                  <h2 className="absolute bottom-6 left-6 right-6 text-2xl font-black text-white sm:text-3xl line-clamp-2 leading-tight">
                    {item.judul}
                  </h2>
                </div>

                <div className="flex items-center justify-between p-6 sm:p-7">
                  <div>
                    <p className="text-sm font-semibold text-slate-700 line-clamp-2">
                      {item.deskripsi}
                    </p>
                    <p className="mt-1 text-xs font-medium text-slate-400">
                      {item.drive_url && item.drive_url !== "-"
                        ? "Klik untuk membuka Google Drive HD"
                        : "Dokumentasi Kegiatan"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-blue-600 p-3.5 text-white transition group-hover:bg-blue-700 shrink-0 ml-4 shadow-md">
                    <ExternalLink size={20} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* QUOTE SECTION */}
      <section className="mt-20 py-16 bg-white border-y border-slate-200/60">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Images className="mx-auto text-blue-600 mb-6" size={42} />

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Setiap Momen Memiliki Cerita
          </h2>

          <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600 max-w-3xl mx-auto">
            Dokumentasi bukan sekadar kumpulan foto. Ia menjadi jejak perjalanan,
            semangat kaderisasi, serta bukti nyata setiap langkah PR IPM SMK
            Muhammadiyah 2 Cileungsi dalam berkarya dan berkontribusi.
          </p>
        </div>
      </section>

      {/* CTA GOOGLE DRIVE */}
      <section className="pt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="rounded-3xl bg-linear-to-r from-[#005BAC] via-[#0B74CF] to-[#00A651] px-8 py-12 sm:px-12 sm:py-16 text-center text-white shadow-2xl relative overflow-hidden">
            <span className="inline-block rounded-full bg-white/15 px-5 py-2 text-xs sm:text-sm font-semibold backdrop-blur border border-white/20">
              📁 Google Drive Resmi
            </span>

            <h2 className="mt-6 text-3xl sm:text-5xl font-black tracking-tight">
              Ingin Melihat Semua Dokumentasi?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm sm:text-base leading-relaxed text-blue-100/90 font-normal">
              Masih banyak dokumentasi kegiatan lainnya yang belum ditampilkan pada
              halaman ini. Seluruh album foto dan video dapat diakses melalui Google
              Drive resmi kami.
            </p>

            <Link
              href="https://drive.google.com/drive/folders/1Wcl7MnDLuxuRg-U0owTPjbdjPHSP1N1B?usp=sharing"
              target="_blank"
              className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-sm sm:text-base font-bold text-slate-900 transition duration-300 hover:bg-yellow-400 hover:-translate-y-0.5 shadow-lg"
            >
              Buka Google Drive HD
              <ExternalLink size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function MediaPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 pt-40 text-center font-medium">Memuat Media...</div>}>
      <MediaContent />
    </Suspense>
  );
}