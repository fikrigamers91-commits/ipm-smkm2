"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { organisasi } from "@/data/organisasi";

type Props = {
  currentSlug: string;
};

export default function PreviewBidang({ currentSlug }: Props) {
  const bidangLain = organisasi.bidang.filter(
    (item) => item.slug !== currentSlug
  );

  const data = [
    {
      slug: "bph",
      nama: organisasi.bph.title,
      slogan: organisasi.bph.slogan,
      banner: organisasi.bph.banner,
      href: "/organisasi/bph",
    },
    ...bidangLain.map((item) => ({
      slug: item.slug,
      nama: item.nama,
      slogan: item.slogan,
      banner: item.banner,
      href: `/organisasi/${item.slug}`,
    })),
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % data.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [data.length]);

  const item = data[active];

  return (
    <section className="py-12 sm:py-20 md:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 sm:mb-12 text-center">
          <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[4px] sm:tracking-[6px] text-ipm-blue">
            Bidang Lain
          </p>

          <h2 className="mt-2 sm:mt-4 text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Jelajahi Bidang Lain
          </h2>

          <div className="mx-auto mt-3 sm:mt-5 h-1 w-16 sm:w-24 rounded-full bg-linear-to-r from-[#005BAC] via-[#00A651] to-[#F4C430]" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={item.slug}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Link href={item.href} className="group block">
              <div className="relative min-h-80 sm:min-h-90 md:h-80 overflow-hidden rounded-3xl sm:rounded-[36px] bg-slate-900">
                <Image
                  src={item.banner}
                  alt={item.nama}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105 opacity-60"
                  priority
                />

                <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 md:flex-row md:items-center">
                  <div className="max-w-2xl">
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight"
                    >
                      {item.nama}
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mt-2 sm:mt-3 text-xs sm:text-base italic text-white/80 line-clamp-2"
                    >
                      &ldquo;{item.slogan}&rdquo;
                    </motion.p>
                  </div>

                  <motion.div
                    whileHover={{ x: 6 }}
                    className="mt-6 md:mt-0 self-start md:self-auto flex items-center gap-2 rounded-2xl bg-ipm-blue px-6 py-3 text-xs sm:text-sm font-extrabold text-white shadow-lg transition group-hover:bg-blue-700"
                  >
                    <span>Selengkapnya</span>
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </div>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 sm:mt-8 flex justify-center gap-2">
          {data.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                active === index
                  ? "w-8 bg-ipm-blue"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}