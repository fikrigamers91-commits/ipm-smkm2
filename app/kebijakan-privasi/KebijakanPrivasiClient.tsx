"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  ArrowLeft,
  Search,
  Globe,
  Printer,
  Copy,
  Check,
  UserCheck,
  Server,
  Mail,
  HelpCircle,
  Clock,
  Sparkles,
} from "lucide-react";

type Language = "id" | "en";

export default function KebijakanPrivasiClient() {
  const [lang, setLang] = useState<Language>("id");
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Teks & Konten Kebijakan Privasi dalam Dua Bahasa (ID & EN)
  const content = useMemo(() => {
    if (lang === "en") {
      return {
        tag: "Data Transparency & Security",
        title: "Privacy Policy",
        subtitle:
          "This Privacy Policy describes how PR IPM SMK Muhammadiyah 2 Cileungsi collects, uses, stores, and protects personal information submitted through this official website.",
        lastUpdated: "Last Updated: October 24, 2026",
        searchPlaceholder: "Search policy topics...",
        tocTitle: "Table of Contents",
        sections: [
          {
            id: "informasi-dikumpulkan",
            icon: Eye,
            title: "1. Information We Collect",
            items: [
              "Personal Identity Information: Full name, student/entity origin, and contact details (email or WhatsApp) submitted via forms.",
              "Public or Anonymous Options: Users may submit feedback or suggestions anonymously on specific contact options.",
              "Proposal & Inquiry Content: Text content, attachments, or collaboration details submitted through user inquiries.",
              "Technical System Data: IP address, device type, browser characteristics, and interaction metrics logged for security auditing.",
            ],
          },
          {
            id: "penggunaan-informasi",
            icon: FileText,
            title: "2. How We Use Information",
            items: [
              "Responding directly to student feedback, grievances, inquiries, and official school aspirations.",
              "Evaluating sponsorship proposals, event partnerships, and institutional cooperation requests.",
              "Analyzing aggregated usage data to improve organizational performance, accessibility, and web features.",
              "Preventing spam, unauthorized access, and maintaining system integrity across our digital portal.",
            ],
          },
          {
            id: "pemrosesan-otomatis",
            icon: Server,
            title: "3. System Transparency & Automated Processing",
            items: [
              "Forms integrated with automated storage (Supabase & Google Workspace) operate under strict access policies.",
              "Honeypot mechanisms and automated filters are implemented to prevent malicious bot submissions.",
              "We do not sell, rent, or trade personal information to commercial third parties or external marketing networks.",
            ],
          },
          {
            id: "keamanan-data",
            icon: Lock,
            title: "4. Data Security & Storage",
            items: [
              "Form responses are stored securely in cloud infrastructure with encrypted transit protocols (HTTPS/TLS).",
              "Access to submitted data is strictly restricted to authorized student executive committee members (BPH).",
              "Data is retained only as long as necessary to fulfill communication or regulatory record-keeping objectives.",
            ],
          },
          {
            id: "hak-pengguna",
            icon: UserCheck,
            title: "5. User Rights & Data Requests",
            items: [
              "Right to Access & Rectify: Request a copy or correct inaccurate personal submission data.",
              "Right to Erasure: Submit a request to remove past submission records or contact information from our databases.",
              "Opt-Out / Consent Withdrawal: Withdraw consent for institutional communication at any time.",
            ],
          },
          {
            id: "privasi-pelajar",
            icon: ShieldCheck,
            title: "6. Student & Minor Privacy",
            items: [
              "Our platform serves high school students (SMK) and the general public in an educational context.",
              "We do not intentionally collect sensitive personal identification numbers or financial details from minors.",
            ],
          },
          {
            id: "hubungi-kami",
            icon: Mail,
            title: "7. Inquiries & Contact Information",
            items: [
              "For privacy concerns or data removal requests, contact PR IPM SMK Muhammadiyah 2 Cileungsi via email at ipmsmkmuda2024@gmail.com or via the official Contact page.",
            ],
          },
        ],
      };
    }

    return {
      tag: "Transparansi & Keamanan Data",
      title: "Kebijakan Privasi",
      subtitle:
        "Kebijakan Privasi ini menjelaskan bagaimana Pimpinan Ranting IPM SMK Muhammadiyah 2 Cileungsi mengumpulkan, menggunakan, menyimpan, dan melindungi informasi pribadi yang Anda kirimkan melalui website resmi ini.",
      lastUpdated: "Terakhir Diperbarui: 24 Oktober 2026",
      searchPlaceholder: "Cari topik kebijakan...",
      tocTitle: "Daftar Isi Kebijakan",
      sections: [
        {
          id: "informasi-dikumpulkan",
          icon: Eye,
          title: "1. Informasi yang Kami Kumpulkan",
          items: [
            "Informasi Identitas Diri: Nama lengkap, asal sekolah/instansi, dan kontak (email atau nomor WhatsApp) yang Anda masukkan melalui formulir.",
            "Opsi Pengiriman Anonim: Pengguna memiliki pilihan untuk mengirimkan masukan atau kritik tanpa mencantumkan identitas pribadi.",
            "Isi Pesan & Proposal: Konten pertanyaan, masukan, tanggapan, atau draf penawaran kerja sama yang Anda tuliskan.",
            "Data Teknis & Perangkat: Alamat IP, jenis perangkat, karakteristik peramban (browser), dan log interaksi untuk keperluan analisis keamanan.",
          ],
        },
        {
          id: "penggunaan-informasi",
          icon: FileText,
          title: "2. Bagaimana Kami Menggunakan Informasi",
          items: [
            "Merespons secara langsung pertanyaan, saran, kritik, dan aspirasi dari siswa maupun masyarakat umum.",
            "Menindaklanjuti proposal sponsorship, kemitraan acara, dan ajakan kerja sama antar-organisasi.",
            "Evaluasi kinerja kepengurusan serta peningkatan mutu layanan dan fitur pada portal digital organisasi.",
            "Mencegah tindakan penyalahgunaan, spam, dan menjaga integritas keamanan sistem.",
          ],
        },
        {
          id: "pemrosesan-otomatis",
          icon: Server,
          title: "3. Transparansi Sistem & Pemrosesan Otomatis",
          items: [
            "Formulir terintegrasi secara aman dengan infrastruktur penyimpanan terstruktur (Supabase & Google Workspace) dengan aturan hak akses terbatasi.",
            "Sistem dilengkapi proteksi honeypot otomatis untuk memblokir pengiriman spam dari bot tanpa mengganggu pengalaman pengguna.",
            "Kami tidak pernah menjual, menyewakan, atau memperdagangkan data pribadi pengguna kepada pihak ketiga mana pun.",
          ],
        },
        {
          id: "keamanan-data",
          icon: Lock,
          title: "4. Keamanan & Penyimpanan Data",
          items: [
            "Seluruh data formulir dikirimkan menggunakan enkripsi standar industri (HTTPS/TLS) demi mencegah penyadapan.",
            "Akses terhadap arsip data formulir dibatasi secara ketat khusus untuk Badan Pengurus Harian (BPH) yang berwenang.",
            "Data disimpan hanya selama diperlukan untuk menyelesaikan tindak lanjut komunikasi atau kebutuhan kearsipan organisasi.",
          ],
        },
        {
          id: "hak-pengguna",
          icon: UserCheck,
          title: "5. Hak Pengguna & Pengaduan Data",
          items: [
            "Hak Akses & Pembaruan: Mengajukan salinan atau memperbarui kekeliruan data pribadi yang pernah dikirimkan.",
            "Hak Penghapusan Data: Meminta penghapusan riwayat identitas atau pesan pribadi Anda dari basis data kami.",
            "Penarikan Persetujuan: Membatalkan izin tindak lanjut komunikasi organisasi sewaktu-waktu.",
          ],
        },
        {
          id: "privasi-pelajar",
          icon: ShieldCheck,
          title: "6. Privasi Pelajar & Anak",
          items: [
            "Website ini dirancang untuk pelajar SMK Muhammadiyah 2 Cileungsi dan publik dalam bingkai pendidikan keorganisasian.",
            "Kami tidak dengan sengaja meminta atau mengumpulkan nomor identitas resmi pemerintah atau data finansial dari anak di bawah umur.",
          ],
        },
        {
          id: "hubungi-kami",
          icon: Mail,
          title: "7. Kontak Resmi & Layanan Pengaduan",
          items: [
            "Jika Anda memiliki pertanyaan terkait privasi atau ingin mengajukan permohonan penghapusan data, silakan hubungi tim kami via email di ipmsmkmuda2024@gmail.com atau melalui halaman Kontak Resmi.",
          ],
        },
      ],
    };
  }, [lang]);

  // Filter pasal berdasarkan kata kunci pencarian
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return content.sections;
    const q = searchQuery.toLowerCase();
    return content.sections.filter(
      (sec) =>
        sec.title.toLowerCase().includes(q) ||
        sec.items.some((item) => item.toLowerCase().includes(q))
    );
  }, [content, searchQuery]);

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 pt-24 pb-20 px-4 sm:px-6 lg:px-8 font-sans print:bg-white print:pt-4">
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* NAVIGASI ATAS & KONTROL BANTUAN */}
        <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition"
          >
            <ArrowLeft size={16} />
            <span>{lang === "en" ? "Back to Home" : "Kembali ke Beranda"}</span>
          </Link>

          {/* OPSI SAKELAR BAHASA (ID / EN) & ACTION BUTTONS */}
          <div className="flex items-center gap-2">
            {/* Switch Bahasa */}
            <div className="inline-flex items-center rounded-xl border border-slate-200 bg-white p-1 shadow-2xs">
              <button
                onClick={() => setLang("id")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  lang === "id"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Globe size={13} />
                <span>ID</span>
              </button>

              <button
                onClick={() => setLang("en")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  lang === "en"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Globe size={13} />
                <span>EN</span>
              </button>
            </div>

            {/* Tombol Salin Tautan */}
            <button
              onClick={handleCopyLink}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              title={lang === "en" ? "Copy Page Link" : "Salin Tautan Halaman"}
            >
              {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            </button>

            {/* Tombol Cetak Dokumen */}
            <button
              onClick={handlePrint}
              className="hidden sm:flex h-8 w-8 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              title={lang === "en" ? "Print Policy" : "Cetak Dokumen"}
            >
              <Printer size={14} />
            </button>
          </div>
        </div>

        {/* HEADER SECTION */}
        <div className="space-y-3 border-b border-slate-200 pb-8">
          <p className="text-xs font-bold uppercase tracking-[3px] text-blue-600 flex items-center gap-2">
            <ShieldCheck size={16} /> {content.tag}
          </p>

          <h1 className="text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl tracking-tight leading-tight">
            {content.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-2xl">
            {content.subtitle}
          </p>

          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono pt-1">
            <Clock size={14} />
            <span>{content.lastUpdated}</span>
          </div>
        </div>

        {/* DAFTAR ISI & KOTAK PENCARIAN RELEVAN */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 print:hidden">
          
          {/* Quick Search */}
          <div className="md:col-span-5 relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={content.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-xs font-medium text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 shadow-2xs"
            />
          </div>

          {/* Table of Contents Quick Jump Chips */}
          <div className="md:col-span-7 flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">
              {content.tocTitle}:
            </span>
            {content.sections.map((sec, idx) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="rounded-xl bg-white border border-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:border-blue-500 hover:text-blue-600 transition shadow-2xs"
              >
                Passage {idx + 1}
              </a>
            ))}
          </div>
        </div>

        {/* PASAL KEBIJAKAN PRIVASI */}
        <div className="space-y-6 text-sm text-slate-700 leading-relaxed font-medium">
          {filteredSections.length === 0 ? (
            <div className="py-12 text-center bg-white rounded-2xl border border-dashed border-slate-200">
              <HelpCircle size={40} className="mx-auto text-slate-300" />
              <p className="mt-3 text-sm font-bold text-slate-800">
                {lang === "en" ? "No topics found" : "Topik tidak ditemukan"}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {lang === "en"
                  ? "Try using different keywords for your search query."
                  : "Coba gunakan kata kunci pencarian yang lain."}
              </p>
            </div>
          ) : (
            filteredSections.map((sec) => {
              const IconComp = sec.icon;
              return (
                <section
                  key={sec.id}
                  id={sec.id}
                  className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xs scroll-mt-28"
                >
                  <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base border-b border-slate-100 pb-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <IconComp size={18} />
                    </div>
                    <h2>{sec.title}</h2>
                  </div>

                  <ul className="space-y-2 text-slate-600 pt-1">
                    {sec.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                        <span className="text-blue-600 font-bold mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })
          )}
        </div>

        {/* BANNER BANTUAN & PENGADUAN */}
        <div className="rounded-2xl border border-blue-200 bg-linear-to-r from-blue-50 to-emerald-50 p-6 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles size={16} className="text-blue-600" />
              <span>{lang === "en" ? "Have Questions About Privacy?" : "Memiliki Pertanyaan Privasi?"}</span>
            </h3>
            <p className="text-xs text-slate-600">
              {lang === "en"
                ? "Our organizational executive committee is ready to assist with any data management inquiries."
                : "Tim Badan Pengurus Harian (BPH) kami siap membantu permohonan hak data Anda."}
            </p>
          </div>

          <Link
            href="/kontak"
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition shrink-0 cursor-pointer"
          >
            <Mail size={14} />
            <span>{lang === "en" ? "Contact Team" : "Hubungi Pengurus"}</span>
          </Link>
        </div>

      </div>
    </main>
  );
}