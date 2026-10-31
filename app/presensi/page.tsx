import type { Metadata } from "next";
import PresensiClient from "./PresensiClient";

export const metadata: Metadata = {
  title: "Presensi Digital | PR IPM SMK Muda Cileungsi",
  description: "Layanan presensi rapat dan kegiatan organisasi PR IPM SMK Muhammadiyah 2 Cileungsi.",
};

export default function PresensiPage() {
  return <PresensiClient />;
}