"use client";

import { useState } from "react";

import { organisasi } from "@/data/organisasi";
import type { Member } from "@/data/organisasi";

import HeroBidang from "@/components/organisasi/HeroBidang";
import TentangBidang from "@/components/organisasi/TentangBidang";
import BiodataModal from "@/components/organisasi/BiodataModal";
import PengurusCard from "@/components/organisasi/PengurusCard";
import PreviewBidang from "@/components/organisasi/PreviewBidang";

export default function BPHPage() {
  const bph = organisasi.bph;

  const [selected, setSelected] = useState<Member | null>(null);
  const [open, setOpen] = useState(false);

  const openModal = (member: Member) => {
    setSelected(member);
    setOpen(true);
  };

  return (
    <main className="bg-white">

      <HeroBidang
        nama={bph.title}
        slogan={bph.slogan}
        gambar={bph.banner}
      />

      <TentangBidang
        deskripsi={bph.deskripsi}
        tugas={bph.tugas}
      />

<section className="bg-slate-50 py-24">

  <div className="mx-auto max-w-7xl px-6">

    <div className="text-center">

      <p className="font-semibold uppercase tracking-[6px] text-ipm-green">
        Badan Pengurus Harian
      </p>

      <h2 className="mt-4 text-5xl font-black text-slate-900">
        Ketua, Sekretaris & Bendahara
      </h2>

      <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-linear-to-r from-[#005BAC] via-[#00A651] to-[#F4C430]" />

    </div>

    <div className="mt-20 grid gap-8 lg:grid-cols-3">

      <PengurusCard
        {...bph.ketua}
        onClick={() => openModal(bph.ketua)}
      />

      <PengurusCard
        {...bph.sekretaris}
        onClick={() => openModal(bph.sekretaris)}
      />

      <PengurusCard
        {...bph.bendahara}
        onClick={() => openModal(bph.bendahara)}
      />

    </div>

  </div>

</section>

      <PreviewBidang currentSlug="bph" />

      <BiodataModal
        open={open}
        onClose={() => setOpen(false)}
        data={selected}
      />

    </main>
  );
}