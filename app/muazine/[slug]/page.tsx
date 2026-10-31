import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { artikel as staticArtikel } from "@/data/artikel";
import ReadingProgress from "@/components/artikel/ReadingProgress";
import ShareButtons from "@/components/artikel/ShareButtons";
import { createClient } from "@supabase/supabase-js";
import { Clock, ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

type ArtikelItem = {
  slug: string;
  judul: string;
  penulis: string;
  tanggal: string;
  kategori: string;
  cover: string;
  isi: string[];
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 1. Ambil Artikel Utama berdasarkan Slug
async function getArtikelBySlug(slug: string): Promise<ArtikelItem | null> {
  const { data, error } = await supabase
    .from("muazine")
    .select("*")
    .eq("slug", slug)
    .eq("status", "terbit")
    .maybeSingle();

  if (data && !error) {
    const isiArray =
      typeof data.isi === "string"
        ? data.isi.split("\n\n")
        : Array.isArray(data.isi)
        ? data.isi
        : [];

    return {
      slug: data.slug,
      judul: data.judul,
      penulis: data.penulis,
      tanggal: data.created_at
        ? new Date(data.created_at).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : "Terbaru",
      kategori: data.kategori || "Berita",
      cover: data.gambar || "/muazine/default.jpg",
      isi: isiArray,
    };
  }

  const foundStatic = staticArtikel.find((item) => item.slug === slug);
  if (foundStatic) {
    return {
      ...foundStatic,
      cover: foundStatic.cover || foundStatic.gambar || "/muazine/default.jpg",
      isi: Array.isArray(foundStatic.isi) ? foundStatic.isi : [foundStatic.isi],
    } as ArtikelItem;
  }

  return null;
}

// 2. Ambil Daftar Muazine Lainnya Secara Otomatis dari Supabase
async function getMuazineLainnya(currentSlug: string): Promise<ArtikelItem[]> {
  try {
    const { data } = await supabase
      .from("muazine")
      .select("*")
      .eq("status", "terbit")
      .neq("slug", currentSlug)
      .order("created_at", { ascending: false })
      .limit(4);

    const dbArticles: ArtikelItem[] = (data || []).map((item) => ({
      slug: item.slug,
      judul: item.judul,
      penulis: item.penulis,
      tanggal: new Date(item.created_at || Date.now()).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      kategori: item.kategori || "Berita",
      cover: item.gambar || "/muazine/default.jpg",
      isi: [],
    }));

    const combined = [...dbArticles];
    staticArtikel.forEach((stat) => {
      if (stat.slug !== currentSlug && !combined.some((a) => a.slug === stat.slug)) {
        combined.push({
          ...stat,
          cover: stat.cover || stat.gambar || "/muazine/default.jpg",
          isi: [],
        } as ArtikelItem);
      }
    });

    return combined.slice(0, 3);
  } catch {
    return staticArtikel.filter((item) => item.slug !== currentSlug).slice(0, 3) as ArtikelItem[];
  }
}

export default async function DetailMuazine({ params }: Props) {
  const { slug } = await params;
  const data = await getArtikelBySlug(slug);

  if (!data) notFound();

  const muazineLain = await getMuazineLainnya(slug);

  // Hitung Estimasi Waktu Baca
  const totalWords = data.isi.join(" ").split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(totalWords / 200));

  return (
    <>
      <ReadingProgress />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#005BAC] via-[#0A74CF] to-[#00A651] py-20 sm:py-28 text-white">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-ipm-yellow/20 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <Link
            href="/muazine"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs sm:text-sm font-semibold backdrop-blur transition hover:bg-white/20"
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Muazine</span>
          </Link>

          <div className="mt-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-white/20 px-3.5 py-1 text-xs sm:text-sm font-bold uppercase tracking-wider">
                {data.kategori}
              </span>

              <span className="flex items-center gap-1.5 rounded-full bg-black/20 px-3 py-1 text-xs font-medium text-slate-100 backdrop-blur">
                <Clock size={14} />
                <span>{readingTime} min baca</span>
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
              {data.judul}
            </h1>

            <p className="mt-4 text-xs sm:text-sm font-medium text-blue-100">
              Oleh <span className="font-bold text-white">{data.penulis}</span> • {data.tanggal}
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-white" />
      </section>

      {/* CONTENT & SIDEBAR */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_340px]">

          {/* ARTIKEL UTAMA */}
          <article className="min-w-0">
            {data.cover && (
              <div className="relative mb-8 h-64 sm:h-96 w-full overflow-hidden rounded-3xl border border-slate-100 shadow-lg">
                <Image
                  src={data.cover}
                  alt={data.judul}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            )}

            <div className="prose prose-lg max-w-none text-slate-800">
              {data.isi.map((item, index) => {
                if (item.startsWith("# ")) {
                  return (
                    <h2 key={index} className="mt-10 mb-4 text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                      {item.replace("# ", "")}
                    </h2>
                  );
                }

                if (item.startsWith("## ")) {
                  return (
                    <h3 key={index} className="mt-8 mb-3 text-xl sm:text-2xl font-bold text-slate-800">
                      {item.replace("## ", "")}
                    </h3>
                  );
                }

                // Gambar Inline (FIXED: Bebas Potong, Ukuran Proporsional)
                if (item.startsWith("![")) {
                  const caption = item.match(/\[(.*?)\]/)?.[1] ?? "";
                  let src = item.match(/\((.*?)\|/)?.[1] ?? item.match(/\((.*?)\)/)?.[1] ?? "";
                  const source = item.match(/\|(.*?)\)/)?.[1] ?? "";

                  src = src.trim();
                  const validSrc = src.startsWith("http") || src.startsWith("/") ? src : "/muazine/default.jpg";

                  return (
                    <figure key={index} className="my-8 flex flex-col items-center">
                      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/50 shadow-md">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={validSrc}
                          alt={caption || "Gambar Muazine"}
                          className="mx-auto h-auto max-h-137.5 w-full object-contain"
                        />
                      </div>
                      {caption && (
                        <figcaption className="mt-3 text-center text-xs sm:text-sm italic font-medium text-slate-600">
                          {caption}
                        </figcaption>
                      )}
                      {source && (
                        <p className="mt-0.5 text-center text-xs text-slate-400">
                          Sumber: {source}
                        </p>
                      )}
                    </figure>
                  );
                }

                if (item.startsWith("> ")) {
                  return (
                    <blockquote key={index} className="my-8 rounded-2xl border-l-4 border-ipm-green bg-emerald-50/40 p-5 italic text-slate-700 sm:p-6">
                      {item.replace("> ", "")}
                    </blockquote>
                  );
                }

                if (item.startsWith("! ")) {
                  return (
                    <div key={index} className="my-8 rounded-2xl border border-blue-200 bg-blue-50/60 p-5 sm:p-6">
                      <h4 className="mb-1 text-sm font-bold text-ipm-blue">💡 Informasi Penting</h4>
                      <p className="text-sm sm:text-base text-slate-700">{item.replace("! ", "")}</p>
                    </div>
                  );
                }

                if (item === "---") {
                  return <hr key={index} className="my-10 border-slate-200" />;
                }

                return (
                  <p key={index} className="text-left text-base sm:text-lg leading-relaxed sm:leading-8 text-slate-700 mb-6">
                    {item}
                  </p>
                );
              })}
            </div>

            <ShareButtons title={data.judul} />
          </article>

          {/* SIDEBAR ARTIKEL LAINNYA */}
          <aside>
            <div className="sticky top-28 rounded-3xl border border-slate-100 bg-slate-50 p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">📰 Muazine Lainnya</h3>

              <div className="mt-6 space-y-4">
                {muazineLain.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/muazine/${item.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="relative h-36 w-full overflow-hidden bg-slate-100">
                      <Image
                        src={item.cover}
                        alt={item.judul}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-ipm-green">
                        {item.kategori}
                      </span>

                      <h4 className="mt-1.5 text-sm font-bold text-slate-900 leading-snug group-hover:text-ipm-blue transition">
                        {item.judul}
                      </h4>

                      <p className="mt-2 text-xs text-slate-400">
                        {item.tanggal}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </section>
    </>
  );
}