import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import BidangSection from "@/components/home/BidangSection";
import PesanKetua from "@/components/home/PesanKetua";
import MediaSection from "@/components/home/MediaSection";
import HomeMuazine from "@/components/home/HomeMuazine";
import InstagramFeed from "@/components/home/InstagramFeed"

export const metadata: Metadata = {
  title: "PR IPM SMK Muhammadiyah 2 Cileungsi | Official Website",
  description: "Website Resmi Pimpinan Ranting Ikatan Pelajar Muhammadiyah SMK Muhammadiyah 2 Cileungsi.",
};

export default function Home() {
  return (
    <main className="w-full overflow-hidden">
      <Hero />
      <About />
      <BidangSection />
      <PesanKetua />
      <MediaSection />
      <HomeMuazine />
      <InstagramFeed />
    </main>
  );
}