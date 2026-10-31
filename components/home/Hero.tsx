"use client";

import { useState, useEffect, memo } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const WORDS = [
  "Pimpinan Ranting",
  "IPM SMK Muhammadiyah 2 Cileungsi",
  "Berjiwa Islami",
  "Berorientasi, Prestasi!"
];

// Sub-komponen terisolasi agar re-render 40ms TIDAK mengganggu induk Hero!
const Typewriter = memo(function Typewriter() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === WORDS[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 1500);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      const timeout = setTimeout(() => {
        setReverse(false);
        setIndex((prev) => (prev + 1) % WORDS.length);
      }, 300);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(
      () => setSubIndex((prev) => prev + (reverse ? -1 : 1)),
      reverse ? 40 : 80
    );

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <span className="mt-2 block min-h-[1.2em] text-ipm-yellow">
      {`${WORDS[index].substring(0, subIndex)}`}
      <span className="animate-pulse text-white">|</span>
    </span>
  );
});

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-ipm-blue">
      {/* BACKGROUND HERO - TUNGGAL DENGAN PRIORITY */}
      <div className="absolute inset-0">
        <Image
          src="/hero/hero.jpg"
          alt="PR IPM SMK Muhammadiyah 2 Cileungsi"
          fill
          priority
          sizes="100vw"
          quality={75}
          className="scale-105 object-cover object-center blur-[2px]"
        />

        <div className="absolute inset-0 bg-ipm-blue/55" />
        <div className="absolute inset-0 bg-linear-to-br from-[#005BAC]/70 via-[#005BAC]/25 to-[#00A651]/60" />

        <div
          className="
            absolute inset-0 opacity-[0.06]
            bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
            bg-size-[45px_45px]
          "
        />

        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-ipm-blue/40 blur-3xl pointer-events-none" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-ipm-green/40 blur-3xl pointer-events-none" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto min-h-screen max-w-7xl px-8 sm:px-12 lg:px-16">
        <div className="flex min-h-screen w-full flex-col justify-center pb-24 pt-12 text-center lg:w-[52%] lg:items-start lg:justify-center lg:pb-12 lg:pt-0 lg:text-left">
          <h1 className="text-3xl font-black leading-[1.05] text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Welcome to
            <Typewriter />
            <span className="mt-2 block">Official Website!</span>
          </h1>

          <a
            href="https://forms.gle/5kLd5hHJN1vmwrXn7"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-fit self-center items-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-ipm-blue shadow-2xl transition-transform hover:scale-105 active:scale-95 hover:bg-ipm-yellow sm:px-8 sm:py-4 sm:text-base lg:self-start"
          >
            Join Us
            <ArrowRight size={18} />
          </a>
        </div>

        {/* FOTO KETUM (HANYA MUNCUL DI DESKTOP - TANPA PRIORITY) */}
        <div className="absolute bottom-0 right-0 z-20 hidden h-[92vh] w-[55%] lg:block pointer-events-none">
          <Image
            src="/anggota/bph/rendy-rafif-santoso.png"
            alt="Ketua Umum PR IPM SMK Muhammadiyah 2 Cileungsi"
            fill
            sizes="55vw"
            quality={80}
            className="object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.45)]"
          />
        </div>
      </div>

      {/* WAVE */}
      <div className="pointer-events-none absolute -bottom-px left-0 z-30 w-full leading-none overflow-hidden">
        <svg
          className="block h-24 w-full sm:h-28 lg:h-32"
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            fill="white"
            d="M0 110 C180 125 300 155 480 150 C650 145 760 125 960 112 C1140 100 1270 88 1440 78 L1440 185 L0 185 Z"
          />
        </svg>
      </div>
    </section>
  );
}