"use client";

import { use, useMemo, useState } from "react";
import { notFound } from "next/navigation";

import { organisasi } from "@/data/organisasi";
import { bidangInfo } from "@/data/bidangInfo";

import HeroBidang from "@/components/organisasi/HeroBidang";
import TentangBidang from "@/components/organisasi/TentangBidang";
import PengurusInti from "@/components/organisasi/PengurusInti";
import AnggotaGrid from "@/components/organisasi/AnggotaGrid";
import BiodataModal from "@/components/organisasi/BiodataModal";
import WhatWeDo from "@/components/organisasi/WhatWeDo";
import PreviewBidang from "@/components/organisasi/PreviewBidang";

import type { Member } from "@/data/organisasi";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default function BidangPage({ params }: Props) {
  const { slug } = use(params);

  const bidang = useMemo(() => {
    return organisasi.bidang.find((item) => item.slug === slug);
  }, [slug]);

  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [open, setOpen] = useState(false);

  // Jika slug bidang tidak ada di data organisasi, baru return 404
  if (!bidang) return notFound();

  // Ambil info tambahan jika ada, kalau belum ada fallback ke bidang.tugas
  const info = bidangInfo[slug as keyof typeof bidangInfo];
  const whatWeDoItems = info?.whatWeDo || bidang.tugas || [];

  const openModal = (member: Member) => {
    setSelectedMember(member);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedMember(null);
  };

  // Filter anggota selain ketua & sekretaris dengan aman
  const anggota = (bidang.anggota || []).filter(
    (item) =>
      item.nama !== bidang.ketua?.nama &&
      item.nama !== bidang.sekretaris?.nama
  );

  return (
    <main className="bg-white min-h-screen">
      {/* HERO */}
      <HeroBidang
        nama={bidang.nama}
        slogan={bidang.slogan}
        gambar={bidang.banner}
      />

      {/* TENTANG */}
      <TentangBidang
        deskripsi={bidang.deskripsi}
        tugas={bidang.tugas}
      />

      {/* PENGURUS INTI */}
      {bidang.ketua && bidang.sekretaris && (
        <PengurusInti
          ketua={{
            ...bidang.ketua,
            onClick: () => openModal(bidang.ketua),
          }}
          sekretaris={{
            ...bidang.sekretaris,
            onClick: () => openModal(bidang.sekretaris),
          }}
        />
      )}

      {/* ANGGOTA */}
      {anggota.length > 0 && (
        <AnggotaGrid
          anggota={anggota}
          onSelect={openModal}
        />
      )}

      {/* WHAT WE DO */}
      {whatWeDoItems.length > 0 && (
        <WhatWeDo
          title={bidang.nama}
          items={whatWeDoItems}
        />
      )}

      {/* PREVIEW BIDANG LAIN */}
      <PreviewBidang
        currentSlug={slug}
      />

      {/* MODAL BIODATA */}
      <BiodataModal
        open={open}
        onClose={closeModal}
        data={selectedMember}
      />
    </main>
  );
}