"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Newspaper,
  CalendarDays,
  MessageSquareText,
  Images,
  LogOut,
  ArrowUpRight,
  UserCheck,
  Layers,
  Activity,
  Globe,
  Search,
  PlusCircle,
  QrCode,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const menuPortal = [
  {
    title: "Muazine & Artikel",
    subtitle: "Publikasi Berita & Opini",
    description: "Kelola rilis buletin Muazine, artikel opini kader, dan berita kegiatan sekolah secara interaktif.",
    icon: Newspaper,
    href: "/admin/muazine",
    quickActionHref: "/admin/muazine",
    quickActionLabel: "Tulis Artikel",
    badge: "Media & Pers",
    accent: "bg-blue-600 text-white",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    title: "Program Kerja",
    subtitle: "Manajemen Timeline & Status",
    description: "Atur jadwal bulanan, penanggung jawab bidang, serta progres keterlaksanaan proker organisasi.",
    icon: CalendarDays,
    href: "/admin/program-kerja",
    quickActionHref: "/admin/program-kerja",
    quickActionLabel: "Kelola Proker",
    badge: "Kaderisasi",
    accent: "bg-emerald-600 text-white",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    title: "Presensi Digital",
    subtitle: "Sesi Rapat & Rekap Keaktifan",
    description: "Buka sesi presensi kegiatan dengan kode 6 digit dan pantau rekapitulasi poin keaktifan kader secara real-time.",
    icon: QrCode,
    href: "/admin/presensi",
    quickActionHref: "/admin/presensi",
    quickActionLabel: "Buka Sesi",
    badge: "Keanggotaan",
    accent: "bg-purple-600 text-white",
    badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    title: "Kritik & Saran",
    subtitle: "Kotak Aspirasi & Masukan",
    description: "Pantau masukan anonim, saran pembangunan, serta kiriman form kontak dari siswa dan umum.",
    icon: MessageSquareText,
    href: "/admin/masukan",
    quickActionHref: "/admin/masukan",
    quickActionLabel: "Cek Pesan",
    badge: "Advokasi",
    accent: "bg-amber-500 text-white",
    badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    title: "Galeri Media",
    subtitle: "Dokumentasi & Cloud Drive",
    description: "Unggah album foto kegiatan terbaru dan tautan arsip Google Drive resmi organisasi.",
    icon: Images,
    href: "/admin/media",
    quickActionHref: "/admin/media",
    quickActionLabel: "Update Media",
    badge: "Dokumentasi",
    accent: "bg-cyan-600 text-white",
    badgeBg: "bg-cyan-50 text-cyan-700 border-cyan-200",
  },
];

export default function PortalAdminPage() {
  const [email, setEmail] = useState<string>("");
  const [checking, setChecking] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const supabase = createClient();

    async function checkAdminAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        window.location.href = "/login";
        return;
      }

      setEmail(session.user.email ?? "");
      setChecking(false);
    }

    checkAdminAuth();
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  const filteredMenu = menuPortal.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.badge.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 pt-20 px-4">
        <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-3.5 border border-slate-200 shadow-xs">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
          <span className="text-xs font-bold text-slate-700">Memverifikasi Otentikasi Admin...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-16 text-slate-900 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* TOP BAR ACTION */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center sm:justify-start gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-700 border border-slate-200 hover:bg-slate-100 transition shadow-2xs active:scale-98"
          >
            <Globe size={15} className="text-blue-600 shrink-0" />
            <span>Kembali ke Website Utama</span>
          </Link>

          <div className="flex items-center justify-between sm:justify-end gap-2.5">
            {email && (
              <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 border border-slate-200 text-xs font-medium text-slate-600 shadow-2xs min-w-0 flex-1 sm:flex-initial">
                <UserCheck size={15} className="text-emerald-600 shrink-0" />
                <span className="font-bold text-slate-800 truncate text-[11px] sm:text-xs">{email}</span>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 px-3.5 py-2 text-xs font-bold transition shadow-2xs cursor-pointer active:scale-98 shrink-0"
            >
              <LogOut size={15} />
              <span>Keluar</span>
            </button>
          </div>
        </div>

        {/* HERO BANNER */}
        <div className="rounded-2xl sm:rounded-3xl border border-blue-700/20 bg-linear-to-br from-blue-700 via-blue-600 to-emerald-600 p-6 sm:p-10 shadow-md relative overflow-hidden text-white">
          <div className="space-y-2.5 max-w-2xl relative z-10">
            <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] sm:text-[11px] font-bold text-white tracking-wider">
              PORTAL ADMINISTRASI RESMI
            </span>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              Pusat Kendali Website
            </h1>

            <p className="text-xs sm:text-sm leading-relaxed text-blue-100 font-medium">
              Kelola seluruh materi berita, presensi rapat, arsip media kegiatan, kritik masukan, dan jadwal agenda kerja PR IPM SMK Muhammadiyah 2 Cileungsi dari satu tempat.
            </p>
          </div>
        </div>

        {/* SECTION MODUL DENGAN FITUR PENCARIAN & QUICK ACTION */}
        <div className="mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
            <div>
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-[2px] text-blue-600 mb-0.5">
                <Layers size={14} />
                <span>Modul Manajemen</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Pilih Area Kerja
              </h2>
            </div>

            {/* Filter Search Input */}
            <div className="relative w-full sm:w-64">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari modul..."
                className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* GRID MODUL CARD */}
          <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2">
            {filteredMenu.map((menu) => {
              const Icon = menu.icon;

              return (
                <div
                  key={menu.href}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 transition-all duration-200 hover:border-blue-500/40 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${menu.badgeBg}`}>
                        {menu.badge}
                      </span>

                      <Link
                        href={menu.href}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-colors group-hover:bg-blue-600 group-hover:text-white"
                        title="Buka Modul Utama"
                      >
                        <ArrowUpRight size={18} />
                      </Link>
                    </div>

                    <div className="mt-3.5 flex items-center gap-3">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${menu.accent} shadow-2xs`}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                          {menu.title}
                        </h3>
                        <p className="text-xs font-semibold text-slate-500">
                          {menu.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-slate-600 font-medium">
                      {menu.description}
                    </p>
                  </div>

                  {/* BOTTOM ACTION BUTTONS */}
                  <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                    <Link
                      href={menu.href}
                      className="text-xs font-bold text-blue-600 hover:underline py-1"
                    >
                      Buka Modul →
                    </Link>

                    <Link
                      href={menu.quickActionHref}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-[11px] font-bold text-slate-700 hover:bg-blue-600 hover:text-white transition active:scale-95"
                    >
                      <PlusCircle size={13} />
                      <span>{menu.quickActionLabel}</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* DATABASE STATUS BAR */}
        <div className="mt-8 rounded-xl bg-white p-3.5 shadow-2xs border border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-600 font-medium">
            <Activity size={15} className="text-emerald-500 shrink-0" />
            <span className="text-[11px] sm:text-xs">Koneksi Database Supabase: <strong className="text-slate-900 font-bold">Terhubung Real-time</strong></span>
          </div>
          <span className="font-mono text-[10px] text-slate-400">v2.6</span>
        </div>

      </div>
    </main>
  );
}