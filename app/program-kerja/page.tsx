import type { Metadata } from "next";
import ProgramKerjaClient from "./ProgramKerjaClient";

export const metadata: Metadata = {
  title: "Program Kerja | PR IPM SMK Muhammadiyah 2 Cileungsi",
  description: "Daftar program kerja, rencana kegiatan, dan agenda unggulan PR IPM SMK Muhammadiyah 2 Cileungsi.",
  openGraph: {
    title: "Program Kerja | PR IPM SMK Muhammadiyah 2 Cileungsi",
    description: "Daftar program kerja, rencana kegiatan, dan agenda unggulan PR IPM SMK Muhammadiyah 2 Cileungsi.",
    url: "/program-kerja",
  },
};

export default function ProgramKerjaPage() {
  return <ProgramKerjaClient />;
}