import type { Metadata } from "next";
import KebijakanPrivasiClient from "./KebijakanPrivasiClient";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | PR IPM SMK Muhammadiyah 2 Cileungsi",
  description:
    "Kebijakan privasi resmi pengolahan data pribadi, transparansi formulir aspirasi, dan keamanan informasi di website PR IPM SMK Muhammadiyah 2 Cileungsi.",
  openGraph: {
    title: "Kebijakan Privasi | PR IPM SMK Muhammadiyah 2 Cileungsi",
    description:
      "Informasi lengkap mengenai perlindungan data pribadi dan transparansi penggunaan informasi di website PR IPM SMK Muda Cileungsi.",
    url: "/kebijakan-privasi",
  },
};

export default function KebijakanPrivasiPage() {
  return <KebijakanPrivasiClient />;
}