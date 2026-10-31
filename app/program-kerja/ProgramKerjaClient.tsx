"use client";

import { useState, useEffect, useMemo } from "react";
import { getProgramKerja, ProgramKerja } from "@/lib/supabase/program-kerja";
import { programKerja as staticProgramKerja } from "@/data/program-kerja";
import PageHero from "@/components/ui/PageHero";
import {
  Search,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Bookmark,
  Filter,
  X,
  Info,
  PieChart,
  ArrowUpDown,
  Layers,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

const BULAN_NAMES: Record<number, string> = {
  1: "Januari",
  2: "Februari",
  3: "Maret",
  4: "April",
  5: "Mei",
  6: "Juni",
  7: "Juli",
  8: "Agustus",
  9: "September",
  10: "Oktober",
  11: "November",
  12: "Desember",
};

const LIST_STATUS = [
  { label: "Semua Status", value: "semua" },
  { label: "Selesai", value: "selesai" },
  { label: "Terjadwal", value: "terjadwal" },
  { label: "Tentatif", value: "tentatif" },
  { label: "Insidental", value: "insidental" },
];

export default function ProgramKerjaClient() {
  const [prokers, setProkers] = useState<ProgramKerja[]>(staticProgramKerja);
  const [loading, setLoading] = useState<boolean>(true);

  // State Filter, Search, & Sort
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedBidang, setSelectedBidang] = useState<string>("Semua");
  const [selectedStatus, setSelectedStatus] = useState<string>("semua");
  const [sortBy, setSortBy] = useState<"bulan" | "nama" | "status">("bulan");

  // State Detail Modal
  const [activeModalProker, setActiveModalProker] = useState<ProgramKerja | null>(null);

  useEffect(() => {
    async function fetchProkerData() {
      try {
        const data = await getProgramKerja();
        if (data && data.length > 0) {
          const combinedMap = new Map<string | number, ProgramKerja>();
          data.forEach((item) => combinedMap.set(item.id, item));
          staticProgramKerja.forEach((item) => {
            if (!combinedMap.has(item.id)) {
              combinedMap.set(item.id, item);
            }
          });
          setProkers(Array.from(combinedMap.values()));
        }
      } catch (err) {
        console.warn("Menggunakan data program kerja fallback statis.", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProkerData();
  }, []);

  const listBidang = ["Semua", ...Array.from(new Set(prokers.map((item) => item.bidang)))];

  // Statistik formal
  const stats = useMemo(() => {
    const total = prokers.length;
    const selesai = prokers.filter((p) => p.status?.toLowerCase() === "selesai").length;
    const terjadwal = prokers.filter((p) => p.status?.toLowerCase() === "terjadwal").length;
    const tentatif = total - (selesai + terjadwal);
    const persentaseSelesai = total > 0 ? Math.round((selesai / total) * 100) : 0;

    return { total, selesai, terjadwal, tentatif, persentaseSelesai };
  }, [prokers]);

  // Filtering dan Sorting Data
  const filteredAndSortedProkers = useMemo(() => {
    const filtered = prokers.filter((item) => {
      const matchesSearch =
        item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.bidang.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBidang = selectedBidang === "Semua" || item.bidang === selectedBidang;
      const matchesStatus = selectedStatus === "semua" || item.status === selectedStatus;

      return matchesSearch && matchesBidang && matchesStatus;
    });

    return filtered.sort((a, b) => {
      if (sortBy === "nama") {
        return a.nama.localeCompare(b.nama);
      }
      if (sortBy === "status") {
        return (a.status || "").localeCompare(b.status || "");
      }
      // Default: Urutkan berdasarkan bulan pertama
      const minBulanA = a.bulan && a.bulan.length > 0 ? Math.min(...a.bulan) : 99;
      const minBulanB = b.bulan && b.bulan.length > 0 ? Math.min(...b.bulan) : 99;
      return minBulanA - minBulanB;
    });
  }, [prokers, searchQuery, selectedBidang, selectedStatus, sortBy]);

  const hasActiveFilters = searchQuery !== "" || selectedBidang !== "Semua" || selectedStatus !== "semua";

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedBidang("Semua");
    setSelectedStatus("semua");
  };

  return (
    <main className="w-full min-h-screen bg-[#F8FAFC] text-slate-900 pt-20 pb-24 font-sans">
      {/* PAGE HERO */}
      <PageHero
        title="Daftar Program Kerja"
        highlightTitle="PR IPM SMK Muda"
        description="Agenda resmi, status keterlaksanaan, serta matriks jadwal kegiatan PR IPM SMK Muhammadiyah 2 Cileungsi Periode 2026–2027."
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        
        {/* RINGKASAN STATISTIK EKSEKUTIF */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs flex flex-col justify-between">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Layers size={13} className="text-blue-600" /> Total Proker
            </span>
            <div className="mt-2 text-2xl sm:text-3xl font-black text-slate-900">{stats.total}</div>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 shadow-2xs flex flex-col justify-between">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 size={13} className="text-emerald-600" /> Selesai
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-emerald-950">{stats.selesai}</span>
              <span className="text-xs font-bold text-emerald-700">({stats.persentaseSelesai}%)</span>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4 shadow-2xs flex flex-col justify-between">
            <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider flex items-center gap-1">
              <Clock size={13} className="text-blue-600" /> Terjadwal
            </span>
            <div className="mt-2 text-2xl sm:text-3xl font-black text-blue-950">{stats.terjadwal}</div>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 shadow-2xs flex flex-col justify-between">
            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1">
              <PieChart size={13} className="text-amber-600" /> Tentatif / Lainnya
            </span>
            <div className="mt-2 text-2xl sm:text-3xl font-black text-amber-950">{stats.tentatif}</div>
          </div>
        </div>

        {/* PANEL KONTROL PENCARIAN, FILTER, DAN PENGURUTAN */}
        <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-2xs space-y-4">
          <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari program kerja atau nama bidang..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-9 py-2.5 text-xs font-medium text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-600 focus:bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Selector Status & Urutan */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 text-xs w-full sm:w-auto">
                <Filter size={13} className="text-slate-400 shrink-0" />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="bg-transparent font-bold text-slate-800 outline-none cursor-pointer w-full"
                >
                  {LIST_STATUS.map((st) => (
                    <option key={st.value} value={st.value}>
                      {st.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 text-xs w-full sm:w-auto">
                <ArrowUpDown size={13} className="text-slate-400 shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "bulan" | "nama" | "status")}
                  className="bg-transparent font-bold text-slate-800 outline-none cursor-pointer w-full"
                >
                  <option value="bulan">Urut: Bulan Terdekat</option>
                  <option value="nama">Urut: Nama (A-Z)</option>
                  <option value="status">Urut: Status</option>
                </select>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition cursor-pointer w-full sm:w-auto"
                  title="Reset Filter"
                >
                  <RotateCcw size={13} />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Filter Bidang Horizontal Scrollable Pills */}
          <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
              Bidang:
            </span>
            {listBidang.map((bid) => (
              <button
                key={bid}
                onClick={() => setSelectedBidang(bid)}
                className={`shrink-0 px-3 py-1.5 rounded-xl text-[11px] font-bold transition cursor-pointer ${
                  selectedBidang === bid
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {bid}
              </button>
            ))}
          </div>
        </div>

        {/* DAFTAR KARTU PROGRAM KERJA */}
        {loading ? (
          <div className="py-20 text-center font-bold text-xs text-slate-400">
            Memuat pendataan program kerja...
          </div>
        ) : filteredAndSortedProkers.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-dashed border-slate-200 space-y-3">
            <Bookmark size={40} className="mx-auto text-slate-300" />
            <p className="text-sm font-bold text-slate-800">Program kerja tidak ditemukan</p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Tidak ada agenda kerja yang sesuai dengan kata kunci pencarian atau filter yang dipilih.
            </p>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition cursor-pointer"
              >
                <RotateCcw size={13} />
                <span>Tampilkan Semua Proker</span>
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredAndSortedProkers.map((item) => {
              const status = item.status?.toLowerCase() || "tentatif";
              let badgeColor = "bg-slate-100 text-slate-600 border-slate-200";
              let StatusIcon = Clock;

              if (status === "selesai") {
                badgeColor = "bg-emerald-50 text-emerald-800 border-emerald-200";
                StatusIcon = CheckCircle2;
              } else if (status === "terjadwal") {
                badgeColor = "bg-blue-50 text-blue-800 border-blue-200";
                StatusIcon = Clock;
              } else if (status === "tentatif") {
                badgeColor = "bg-amber-50 text-amber-800 border-amber-200";
                StatusIcon = AlertCircle;
              } else if (status === "insidental") {
                badgeColor = "bg-purple-50 text-purple-800 border-purple-200";
                StatusIcon = Bookmark;
              }

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveModalProker(item)}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-500/40 transition flex flex-col justify-between gap-4 cursor-pointer group"
                >
                  <div className="space-y-3">
                    {/* Header Badges */}
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 max-w-[65%] truncate">
                        {item.bidang}
                      </span>

                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold capitalize border shrink-0 ${badgeColor}`}
                      >
                        <StatusIcon size={12} />
                        {status.replace("_", " ")}
                      </span>
                    </div>

                    {/* Judul Proker */}
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                      {item.nama}
                    </h3>
                  </div>

                  {/* Footer Card */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                    <div className="flex items-center gap-1.5 truncate pr-2">
                      <Calendar size={14} className="text-slate-400 shrink-0" />
                      <span className="text-[11px] font-medium text-slate-600 truncate">
                        {item.bulan && item.bulan.length > 0
                          ? item.bulan.map((b) => BULAN_NAMES[b]).join(", ")
                          : "Bulan belum ditentukan"}
                      </span>
                    </div>

                    <span className="text-[11px] font-bold text-blue-600 opacity-80 group-hover:opacity-100 flex items-center shrink-0">
                      Detail <ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* MODAL POPUP DETAIL PROGRAM KERJA */}
      {activeModalProker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-3xl border border-slate-200 shadow-2xl overflow-hidden p-6 space-y-5 relative">
            <button
              onClick={() => setActiveModalProker(null)}
              className="absolute top-5 right-5 h-8 w-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="space-y-2 pr-8">
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                {activeModalProker.bidang}
              </span>
              <h2 className="text-lg font-black text-slate-900 leading-snug">
                {activeModalProker.nama}
              </h2>
            </div>

            <div className="space-y-3 border-t border-b border-slate-100 py-4 text-xs">
              <div className="flex items-start gap-3">
                <Clock size={16} className="text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-700 block">Status Pelaksanaan</span>
                  <span className="capitalize font-semibold text-slate-900">
                    {activeModalProker.status?.replace("_", " ") || "Belum Ditentukan"}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar size={16} className="text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-700 block">Lini Masa / Bulan</span>
                  <span className="font-semibold text-slate-900">
                    {activeModalProker.bulan && activeModalProker.bulan.length > 0
                      ? activeModalProker.bulan.map((b) => BULAN_NAMES[b]).join(", ")
                      : "Belum Ditentukan"}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Info size={16} className="text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-700 block">Penanggung Jawab Utama</span>
                  <span className="font-semibold text-slate-900">
                    Pimpinan Ranting IPM SMK Muda Cileungsi ({activeModalProker.bidang})
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={() => setActiveModalProker(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition cursor-pointer"
              >
                Tutup Informasi
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}