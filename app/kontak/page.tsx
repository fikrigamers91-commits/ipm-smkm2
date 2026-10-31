import type { Metadata } from "next";
import KontakClient from "./KontakClient";

export const metadata: Metadata = {
  title: "Hubungi Kami | PR IPM SMK Muhammadiyah 2 Cileungsi",
  description: "Kirim pesan, kritik, saran, atau pertanyaan ke pengurus PR IPM SMK Muhammadiyah 2 Cileungsi.",
};

export default function KontakPage() {
  return <KontakClient />;
}