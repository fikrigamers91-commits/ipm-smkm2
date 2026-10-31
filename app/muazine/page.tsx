import type { Metadata } from "next";
import MuazineClient from "./MuazineClient";

export const metadata: Metadata = {
  title: "Muazine - Buletin & Artikel | PR IPM SMK Muda Cileungsi",
  description: "Wadah kreativitas, opini, berita, dan karya literasi kader PR IPM SMK Muhammadiyah 2 Cileungsi.",
};

export default function MuazinePage() {
  return <MuazineClient />;
}