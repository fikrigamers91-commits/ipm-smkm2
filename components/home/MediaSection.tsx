"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Play, FolderOpen } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const documentation = [
  { title: "Rapat Kerja Pimpinan", image: "/media/rakerpim.jpg", drive: "https://drive.google.com/drive/folders/1NzOMtiWd0w5djxcmem-jsd8vjv17zIHJ" },
  { title: "Pra Fortasi", image: "/media/prafor.jpg", drive: "https://drive.google.com/drive/folders/1WCq3bSOyGOiuHPctxnDCn5QQLBH68AtK" },
  { title: "FORTASI 2026", image: "/media/fortasi1.jpg", drive: "https://drive.google.com/drive/folders/1osDpYYU7WICzOpHuwWE4dlNmHtJ17SRb" },
  { title: "Classmeet Futsal", image: "/media/classmeetfutsal.jpg", drive: "https://drive.google.com/drive/folders/1WSGffv0_zpxjnFH0HzxIB914WhpLjWk8" },
];

export default function MediaSection() {
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#12163A] pt-24 pb-20 text-white">
      {/* TRANSISI WAVE LENGKUNGAN */}
      <div className="absolute left-0 top-0 h-16 sm:h-24 w-full overflow-hidden leading-none z-10 pointer-events-none">
        <svg viewBox="0 0 1440 120" className="h-full w-full fill-[#F4F6FB]" preserveAspectRatio="none">
          <path d="M0,0 L1440,0 L1440,30 C1080,110 360,10 0,60 Z" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-6 z-20">
        <div className="mb-12 text-center">
          <span className="font-bold uppercase tracking-[3px] text-amber-400 text-xs sm:text-sm">
            Galeri & Media
          </span>
          <h2 className="mt-2 text-3xl font-black md:text-5xl tracking-tight text-white">
            Dokumentasi & Highlight Video
          </h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-linear-to-r from-blue-500 via-emerald-400 to-amber-400" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* YOUTUBE LAZY FACADE */}
          <div className="lg:col-span-7 relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/90 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 bg-slate-950/80">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                <Play size={14} className="text-red-500 fill-red-500" />
                <span>Tonton Video Terbaru di YouTube Kami</span>
              </div>
              <span className="rounded-full bg-red-500/20 px-2.5 py-0.5 text-[10px] font-extrabold uppercase text-red-400 border border-red-500/30">
                YouTube
              </span>
            </div>

            <div className="relative aspect-video w-full bg-black">
              {!playVideo ? (
                <button
                  onClick={() => setPlayVideo(true)}
                  className="group relative h-full w-full flex items-center justify-center overflow-hidden"
                  aria-label="Play YouTube Video"
                >
                  <Image
                    src="https://img.youtube.com/vi/cYE3bU4Pc4w/maxresdefault.jpg"
                    alt="Thumbnail Video YouTube"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
                  />
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-2xl transition-transform duration-300 group-hover:scale-110">
                    <Play size={28} className="fill-white translate-x-0.5" />
                  </div>
                </button>
              ) : (
                <iframe
                  src="https://www.youtube.com/embed/cYE3bU4Pc4w?autoplay=1"
                  title="Tonton Video Terbaru di YouTube Kami"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              )}
            </div>
          </div>

          {/* SLIDER DOKUMENTASI FOTO */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <FolderOpen size={16} className="text-emerald-400" />
                Album Foto Terbaru
              </h3>
            </div>

            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              loop
              slidesPerView={1}
              spaceBetween={16}
              className="pb-10"
            >
              {documentation.map((item) => (
                <SwiperSlide key={item.title}>
                  <Link
                    href={item.drive}
                    target="_blank"
                    className="group relative block h-72 overflow-hidden rounded-3xl border border-white/10 shadow-lg"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 400px"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                          Google Drive
                        </span>
                        <h4 className="text-base font-bold text-white leading-tight mt-0.5">
                          {item.title}
                        </h4>
                      </div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-xs transition group-hover:bg-emerald-500">
                        <ExternalLink size={15} />
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}