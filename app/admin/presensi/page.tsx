"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Clock,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  X,
  FileText,
  Printer,
  Loader2,
  UserPlus,
  Bell,
  BellRing,
  Filter,
  Users,
  Check,
  Timer,
  Hourglass,
  AlertTriangle,
  Search,
  Trash2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Sesi = {
  id: string;
  nama_kegiatan: string;
  kode_akses: string;
  waktu_buka: string;
  waktu_tutup: string;
  is_active: boolean;
};

type Anggota = {
  id: string;
  nama: string;
  bidang: string;
};

type RekapRow = {
  anggota_id: string;
  nama: string;
  bidang: string;
  total_hadir: number;
  total_izin: number;
  total_sakit: number;
};

type LogDetail = {
  id: string;
  sesi_id: string;
  anggota_id: string;
  status: "hadir" | "izin" | "sakit";
  keterangan: string | null;
  waktu_absen: string;
  created_at?: string;
  anggota?: { nama: string; bidang: string };
};

export default function AdminPresensiPage() {
  const [activeTab, setActiveTab] = useState<"sesi" | "manual" | "rekap">("rekap");
  const [rekapSubTab, setRekapSubTab] = useState<"per_sesi" | "keseluruhan">("per_sesi");

  const [sesiList, setSesiList] = useState<Sesi[]>([]);
  const [anggotaList, setAnggotaList] = useState<Anggota[]>([]);
  const [rekapList, setRekapList] = useState<RekapRow[]>([]);
  const [selectedSesiFilter, setSelectedSesiFilter] = useState<string>("");
  const [logSesiList, setLogSesiList] = useState<LogDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Search Bar
  const [searchKeseluruhan, setSearchKeseluruhan] = useState<string>("");
  const [searchPerSesi, setSearchPerSesi] = useState<string>("");

  // Form Sesi Baru
  const [namaKegiatan, setNamaKegiatan] = useState("");
  const [durasiMenit, setDurasiMenit] = useState<number>(15);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Presensi Manual
  const [selectedSesiManual, setSelectedSesiManual] = useState("");
  const [selectedAnggotaManual, setSelectedAnggotaManual] = useState("");
  const [statusManual, setStatusManual] = useState<"hadir" | "izin" | "sakit">("hadir");

  // State Hapus Rapat
  const [deletingSesi, setDeletingSesi] = useState<Sesi | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Real-time State
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [realtimePopup, setRealtimePopup] = useState<{
    show: boolean;
    nama: string;
    status: string;
    keterangan: string;
  }>({ show: false, nama: "", status: "", keterangan: "" });

  // Countdown & Modal Extension
  const [sisaDetikMap, setSisaDetikMap] = useState<Record<string, number>>({});
  const [showExtendModal, setShowExtendModal] = useState<boolean>(false);
  const [activePromptSesiId, setActivePromptSesiId] = useState<string | null>(null);
  const [dismissedSesiPrompts, setDismissedSesiPrompts] = useState<Set<string>>(new Set());
  const [tambahanMenit, setTambahanMenit] = useState<number>(5);

  const [toast, setToast] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
    show: false,
    type: "success",
    message: "",
  });

  const selectedSesiFilterRef = useRef(selectedSesiFilter);
  useEffect(() => {
    selectedSesiFilterRef.current = selectedSesiFilter;
  }, [selectedSesiFilter]);

  // Map Anggota ID ke Object Anggota
  const anggotaMap = useMemo(() => {
    const map = new Map<string, Anggota>();
    anggotaList.forEach((a) => map.set(a.id, a));
    return map;
  }, [anggotaList]);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3500);
  };

  // Fetch Log Per Sesi Rapat
  const fetchLogSesi = useCallback(async (sesiId: string) => {
    if (!sesiId) {
      setLogSesiList([]);
      return;
    }
    const supabase = createClient();
    const { data } = await supabase
      .from("log_presensi")
      .select("*")
      .eq("sesi_id", sesiId);

    if (data) {
      const sorted = (data as LogDetail[]).sort((a, b) => {
        const timeA = new Date(a.waktu_absen || a.created_at || 0).getTime();
        const timeB = new Date(b.waktu_absen || b.created_at || 0).getTime();
        return timeB - timeA;
      });
      setLogSesiList(sorted);
    } else {
      setLogSesiList([]);
    }
  }, []);

  // Fetch Data Utama
  const loadData = useCallback(async () => {
    const supabase = createClient();
    const [{ data: sesiData }, { data: rekapData }, { data: anggotaData }] = await Promise.all([
      supabase.from("sesi_presensi").select("*").order("created_at", { ascending: false }),
      supabase.from("vw_rekap_presensi").select("*"),
      supabase.from("anggota").select("id, nama, bidang").order("nama", { ascending: true }),
    ]);

    if (sesiData) {
      setSesiList(sesiData);
      if (sesiData.length > 0) {
        const isStillExist = sesiData.some((s) => s.id === selectedSesiFilterRef.current);
        const targetId = isStillExist ? selectedSesiFilterRef.current : sesiData[0].id;
        
        selectedSesiFilterRef.current = targetId;
        setSelectedSesiFilter(targetId);
        fetchLogSesi(targetId);
      } else {
        selectedSesiFilterRef.current = "";
        setSelectedSesiFilter("");
        setLogSesiList([]);
      }
    }

    if (rekapData) setRekapList(rekapData);
    if (anggotaData) setAnggotaList(anggotaData);
    setLoading(false);
  }, [fetchLogSesi]);

  // Initial Fetch
  useEffect(() => {
    let isMounted = true;
    const initFetch = async () => {
      if (isMounted) {
        await loadData();
      }
    };
    initFetch();
    return () => {
      isMounted = false;
    };
  }, [loadData]);

  // Countdown Timer
  useEffect(() => {
    const interval = setInterval(() => {
      const newMap: Record<string, number> = {};
      const now = Date.now();

      sesiList.forEach((s) => {
        if (s.is_active) {
          const diffSeconds = Math.max(0, Math.floor((new Date(s.waktu_tutup).getTime() - now) / 1000));
          newMap[s.id] = diffSeconds;

          if (diffSeconds > 0 && diffSeconds <= 60 && !dismissedSesiPrompts.has(s.id) && !showExtendModal) {
            setActivePromptSesiId(s.id);
            setShowExtendModal(true);
          }
        }
      });

      setSisaDetikMap(newMap);
    }, 1000);

    return () => clearInterval(interval);
  }, [sesiList, dismissedSesiPrompts, showExtendModal]);

  // Real-time Listener Presensi Baru
  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel("admin_realtime_presensi")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "log_presensi" },
        async (payload) => {
          setUnreadCount((prev) => prev + 1);

          const { data: newLog } = await supabase
            .from("log_presensi")
            .select("*")
            .eq("id", payload.new.id)
            .single();

          if (newLog) {
            const memberInfo = anggotaMap.get(newLog.anggota_id);
            const namaSiswa = memberInfo?.nama || "Anggota";
            
            setRealtimePopup({
              show: true,
              nama: namaSiswa,
              status: newLog.status,
              keterangan: newLog.keterangan || "-",
            });

            setTimeout(() => {
              setRealtimePopup((prev) => ({ ...prev, show: false }));
            }, 6000);
          }

          loadData();
          if (selectedSesiFilterRef.current) {
            fetchLogSesi(selectedSesiFilterRef.current);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadData, fetchLogSesi, anggotaMap]);

  // Handler Dropdown Sesi
  const handleSelectSesiChange = (sesiId: string) => {
    selectedSesiFilterRef.current = sesiId;
    setSelectedSesiFilter(sesiId);
    fetchLogSesi(sesiId);
  };

  // Buat Sesi Baru
  async function handleBuatSesi(e: React.FormEvent) {
    e.preventDefault();
    if (durasiMenit <= 0) {
      showToast("error", "Durasi sesi minimal 1 menit.");
      return;
    }

    setIsSubmitting(true);
    const supabase = createClient();

    await supabase.from("sesi_presensi").update({ is_active: false }).eq("is_active", true);

    const kodeRandom = Math.floor(100000 + Math.random() * 900000).toString();
    const waktuBuka = new Date();
    const waktuTutup = new Date(waktuBuka.getTime() + durasiMenit * 60000);

    const { error } = await supabase.from("sesi_presensi").insert([
      {
        nama_kegiatan: namaKegiatan,
        kode_akses: kodeRandom,
        waktu_buka: waktuBuka.toISOString(),
        waktu_tutup: waktuTutup.toISOString(),
        is_active: true,
      },
    ]);

    setIsSubmitting(false);

    if (error) {
      showToast("error", `Gagal: ${error.message}`);
    } else {
      showToast("success", `Rapat dibuka (${durasiMenit} menit)! Kode Akses: ${kodeRandom}`);
      setNamaKegiatan("");
      loadData();
    }
  }

  // Perpanjang Sesi
  async function handlePerpanjangSesi() {
    if (!activePromptSesiId || tambahanMenit <= 0) return;

    const targetSesi = sesiList.find((s) => s.id === activePromptSesiId);
    if (!targetSesi) return;

    const supabase = createClient();
    const currentWaktuTutup = new Date(targetSesi.waktu_tutup).getTime();
    const waktuTutupBaru = new Date(Math.max(Date.now(), currentWaktuTutup) + tambahanMenit * 60000);

    const { error } = await supabase
      .from("sesi_presensi")
      .update({ waktu_tutup: waktuTutupBaru.toISOString(), is_active: true })
      .eq("id", activePromptSesiId);

    if (error) {
      showToast("error", "Gagal memperpanjang waktu sesi.");
    } else {
      showToast("success", `Sesi diperpanjang +${tambahanMenit} menit!`);
      setShowExtendModal(false);
      setActivePromptSesiId(null);
      loadData();
    }
  }

  function handleTolakPerpanjang() {
    if (activePromptSesiId) {
      setDismissedSesiPrompts((prev) => new Set(prev).add(activePromptSesiId));
    }
    setShowExtendModal(false);
    setActivePromptSesiId(null);
  }

  // Presensi Susulan Manual
  async function handlePresensiManual(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedSesiManual || !selectedAnggotaManual) {
      showToast("error", "Pilih sesi kegiatan dan nama anggota.");
      return;
    }

    setIsSubmitting(true);
    const supabase = createClient();

    const { error } = await supabase.from("log_presensi").insert([
      {
        sesi_id: selectedSesiManual,
        anggota_id: selectedAnggotaManual,
        status: statusManual,
        keterangan: "Input Manual oleh Admin (Susulan)",
      },
    ]);

    setIsSubmitting(false);

    if (error) {
      if (error.code === "23505") {
        showToast("error", "Anggota ini sudah terdata pada sesi tersebut.");
      } else {
        showToast("error", `Gagal: ${error.message}`);
      }
    } else {
      showToast("success", "Presensi susulan berhasil disimpan.");
      setSelectedAnggotaManual("");
      loadData();
      if (selectedSesiFilterRef.current) {
        fetchLogSesi(selectedSesiFilterRef.current);
      }
    }
  }

  // Tutup Sesi
  async function handleTutupSesi(id: string) {
    const supabase = createClient();
    await supabase.from("sesi_presensi").update({ is_active: false }).eq("id", id);
    showToast("success", "Sesi presensi ditutup.");
    loadData();
  }

  // Hapus Rapat & Seluruh Log Presensi Terkait
  async function handleHapusSesi() {
    if (!deletingSesi) return;

    setIsDeleting(true);
    const supabase = createClient();
    const deletedId = deletingSesi.id;

    // 1. Hapus log kehadiran pada rapat ini
    const { error: logError } = await supabase
      .from("log_presensi")
      .delete()
      .eq("sesi_id", deletedId);

    if (logError) {
      showToast("error", `Gagal menghapus log presensi: ${logError.message}`);
      setIsDeleting(false);
      return;
    }

    // 2. Hapus sesi rapat itu sendiri
    const { error: sesiError } = await supabase
      .from("sesi_presensi")
      .delete()
      .eq("id", deletedId);

    if (sesiError) {
      showToast("error", `Gagal menghapus rapat: ${sesiError.message}`);
      setIsDeleting(false);
      return;
    }

    if (selectedSesiFilterRef.current === deletedId) {
      selectedSesiFilterRef.current = "";
      setSelectedSesiFilter("");
      setLogSesiList([]);
    }

    setIsDeleting(false);
    setDeletingSesi(null);

    showToast("success", "Rapat dan seluruh data kehadirannya berhasil dihapus.");
    await loadData();
  }

  const formatTimeRemaining = (totalSeconds: number) => {
    if (totalSeconds <= 0) return "Waktu Habis";
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds < 10 ? "0" : ""}${seconds}s`;
  };

  const formatWaktuRealtime = (isoString?: string) => {
    if (!isoString) return "-";
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "-";
    return (
      date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }) + " WIB"
    );
  };

  // Filter Data Rekap Keseluruhan
  const filteredRekapList = rekapList.filter(
    (r) =>
      r.nama.toLowerCase().includes(searchKeseluruhan.toLowerCase()) ||
      r.bidang.toLowerCase().includes(searchKeseluruhan.toLowerCase())
  );

  // Filter Data Log Per Sesi
  const filteredLogSesiList = logSesiList.filter((l) => {
    const member = l.anggota || anggotaMap.get(l.anggota_id);
    const nama = member?.nama || "";
    const bidang = member?.bidang || "";
    const keyword = searchPerSesi.toLowerCase();

    return (
      nama.toLowerCase().includes(keyword) ||
      bidang.toLowerCase().includes(keyword) ||
      l.status.toLowerCase().includes(keyword)
    );
  });

  // Ekspor PDF
  const handleExportPDF = () => {
    const docTitle = "rekapitulasi data kehadiran seluruh anggota PR. IPM SMKM2 Cileungsi";
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    let tableHtml = "";

    if (rekapSubTab === "keseluruhan") {
      tableHtml = `
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="margin: 0; font-size: 18px; text-transform: uppercase;">Rekapitulasi Akumulasi Kehadiran Anggota</h2>
          <p style="margin: 4px 0 0 0; font-size: 13px; font-weight: bold; color: #2563eb;">PR IPM SMK Muhammadiyah 2 Cileungsi</p>
        </div>
        <table>
          <thead>
            <tr>
              <th style="width: 40px; text-align: center;">No</th>
              <th>Nama Anggota</th>
              <th>Bidang</th>
              <th style="text-align: center;">Hadir</th>
              <th style="text-align: center;">Izin</th>
              <th style="text-align: center;">Sakit</th>
            </tr>
          </thead>
          <tbody>
            ${filteredRekapList
              .map(
                (r, idx) => `
              <tr>
                <td style="text-align: center;">${idx + 1}</td>
                <td><strong>${r.nama}</strong></td>
                <td>${r.bidang}</td>
                <td style="text-align: center; color: #059669; font-weight: bold;">${r.total_hadir}</td>
                <td style="text-align: center; color: #2563eb; font-weight: bold;">${r.total_izin}</td>
                <td style="text-align: center; color: #d97706; font-weight: bold;">${r.total_sakit}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      `;
    } else {
      const sesiSelected = sesiList.find((s) => s.id === selectedSesiFilter);
      const namaSesi = sesiSelected ? sesiSelected.nama_kegiatan : "Sesi Rapat";
      tableHtml = `
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="margin: 0; font-size: 18px; text-transform: uppercase;">Rekapitulasi Presensi Rapat</h2>
          <h3 style="margin: 4px 0; font-size: 15px; color: #2563eb;">"${namaSesi}"</h3>
          <p style="margin: 0; font-size: 12px; font-weight: bold; color: #64748b;">PR IPM SMK Muhammadiyah 2 Cileungsi</p>
        </div>
        <table>
          <thead>
            <tr>
              <th style="width: 40px; text-align: center;">No</th>
              <th>Nama Anggota</th>
              <th>Bidang</th>
              <th style="text-align: center;">Status</th>
              <th>Keterangan / Alasan</th>
              <th style="text-align: right;">Waktu Absen</th>
            </tr>
          </thead>
          <tbody>
            ${filteredLogSesiList
              .map((l, idx) => {
                const member = l.anggota || anggotaMap.get(l.anggota_id);
                const nama = member?.nama || "-";
                const bidang = member?.bidang || "-";
                const waktu = formatWaktuRealtime(l.waktu_absen || l.created_at);
                return `
                <tr>
                  <td style="text-align: center;">${idx + 1}</td>
                  <td><strong>${nama}</strong></td>
                  <td>${bidang}</td>
                  <td style="text-align: center; font-weight: bold; text-transform: uppercase;">${l.status}</td>
                  <td>${l.keterangan || "-"}</td>
                  <td style="text-align: right; font-family: monospace;">${waktu}</td>
                </tr>
              `;
              })
              .join("")}
          </tbody>
        </table>
      `;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${docTitle}</title>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; padding: 20px; color: #0f172a; }
            table { width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 15px; }
            th, td { border: 1px solid #cbd5e1; padding: 8px 10px; text-align: left; }
            th { background-color: #f1f5f9; font-weight: bold; color: #334155; text-transform: uppercase; font-size: 10px; }
            tr:nth-child(even) { background-color: #f8fafc; }
            @page { size: auto; margin: 15mm; }
          </style>
        </head>
        <body>
          ${tableHtml}
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const idAnggotaSudahAbsen = new Set(logSesiList.map((l) => l.anggota_id));
  const anggotaBelumAbsen = anggotaList
    .filter((a) => !idAnggotaSudahAbsen.has(a.id))
    .filter(
      (a) =>
        a.nama.toLowerCase().includes(searchPerSesi.toLowerCase()) ||
        a.bidang.toLowerCase().includes(searchPerSesi.toLowerCase())
    );

  const activePromptSesi = sesiList.find((s) => s.id === activePromptSesiId);

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 pt-20 pb-20 px-4 sm:px-6 lg:px-8 font-sans relative">
      
      {/* MODAL KONFIRMASI HAPUS RAPAT */}
      {deletingSesi && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-rose-50 border border-rose-200">
                <Trash2 size={22} />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">Hapus Rapat Ini?</h3>
                <p className="text-xs text-rose-600 font-semibold">Tindakan ini tidak dapat dibatalkan!</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              Menghapus rapat <strong className="text-slate-900">&quot;{deletingSesi.nama_kegiatan}&quot;</strong> akan otomatis menghapus seluruh data kehadiran anggota yang terdata pada rapat ini dari rekapitulasi.
            </p>

            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeletingSesi(null)}
                className="rounded-xl border border-slate-200 bg-slate-100 hover:bg-slate-200 py-2.5 text-xs font-bold text-slate-700 transition cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleHapusSesi}
                className="rounded-xl bg-rose-600 hover:bg-rose-700 py-2.5 text-xs font-bold text-white transition shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                {isDeleting ? <Loader2 size={15} className="animate-spin" /> : "Ya, Hapus Rapat"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PERPANJANG SESI */}
      {showExtendModal && activePromptSesi && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 text-amber-600">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-50 border border-amber-200">
                <AlertTriangle size={22} />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">Sesi Absensi Mau Habis!</h3>
                <p className="text-xs text-slate-500 font-medium">Sisa waktu kurang dari 1 menit.</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              Sesi <strong className="text-slate-900">&quot;{activePromptSesi.nama_kegiatan}&quot;</strong> akan otomatis ditutup dalam waktu dekat. Apakah Anda mau menambahkan durasi sesi?
            </p>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Tambah Durasi (Menit)</label>
              <input
                type="number"
                min={1}
                max={120}
                value={tambahanMenit}
                onChange={(e) => setTambahanMenit(parseInt(e.target.value) || 1)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs font-bold text-slate-900 outline-none focus:border-blue-600 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleTolakPerpanjang}
                className="rounded-xl border border-slate-200 bg-slate-100 hover:bg-slate-200 py-2.5 text-xs font-bold text-slate-700 transition cursor-pointer"
              >
                Tidak, Biarkan
              </button>
              <button
                type="button"
                onClick={handlePerpanjangSesi}
                className="rounded-xl bg-blue-600 hover:bg-blue-700 py-2.5 text-xs font-bold text-white transition shadow-xs cursor-pointer"
              >
                Iya, Tambah Waktu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP NOTIFIKASI REAL-TIME */}
      {realtimePopup.show && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 animate-in fade-in slide-in-from-top-6 duration-300">
          <div className="rounded-2xl bg-slate-900 text-white p-4 shadow-2xl border border-blue-500/40 flex items-start justify-between gap-3 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white animate-bounce">
                <BellRing size={20} />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-400">Presensi Baru Masuk</span>
                  <span className={`px-2 py-0.2 rounded-full text-[9px] font-bold uppercase ${
                    realtimePopup.status === "hadir" ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"
                  }`}>
                    {realtimePopup.status}
                  </span>
                </div>
                <p className="text-xs font-extrabold text-white">{realtimePopup.nama}</p>
                <p className="text-[11px] text-slate-300 font-medium">Alasan/Keterangan: &quot;{realtimePopup.keterangan}&quot;</p>
              </div>
            </div>
            <button
              onClick={() => setRealtimePopup((prev) => ({ ...prev, show: false }))}
              className="text-slate-400 hover:text-white transition p-1"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* TOAST SYSTEM */}
      {toast.show && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-40 animate-in fade-in slide-in-from-top-4 duration-300">
          <div
            className={`flex items-center gap-3 rounded-2xl px-5 py-3.5 shadow-md border text-xs sm:text-sm font-bold transition-all ${
              toast.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                : "bg-rose-50 border-rose-200 text-rose-900"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle size={18} className="text-rose-600 shrink-0" />
            )}
            <span>{toast.message}</span>
            <button
              type="button"
              onClick={() => setToast({ ...toast, show: false })}
              className="ml-2 p-1 hover:opacity-70 transition cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* Header Admin */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition mb-2"
            >
              <ArrowLeft size={16} />
              <span>Kembali ke Dashboard Admin</span>
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Manajemen Presensi Digital
              </h1>
              
              {unreadCount > 0 && (
                <button
                  onClick={() => setUnreadCount(0)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1 text-xs font-black text-white shadow-xs hover:bg-blue-700 transition"
                  title="Klik untuk menandai dibaca"
                >
                  <Bell size={13} />
                  <span>+{unreadCount} Baru</span>
                  <Check size={12} className="ml-0.5 text-blue-200" />
                </button>
              )}
            </div>
          </div>

          <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-2xs">
            <button
              onClick={() => setActiveTab("rekap")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === "rekap" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600"
              }`}
            >
              Rekapitulasi Data
            </button>
            <button
              onClick={() => setActiveTab("sesi")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === "sesi" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600"
              }`}
            >
              Buka Sesi Rapat
            </button>
            <button
              onClick={() => setActiveTab("manual")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === "manual" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600"
              }`}
            >
              Input Susulan
            </button>
          </div>
        </div>

        {/* TAB REKAPITULASI DATA */}
        {activeTab === "rekap" && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xs space-y-6">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-black text-slate-900">Rekapitulasi Presensi Anggota</h2>
                <p className="text-xs text-slate-500">
                  Pantau kehadiran kader per acara kegiatan maupun akumulasi keseluruhan.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200/80">
                  <button
                    onClick={() => setRekapSubTab("per_sesi")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      rekapSubTab === "per_sesi" ? "bg-white text-blue-600 shadow-2xs" : "text-slate-600"
                    }`}
                  >
                    Per Acara Rapat
                  </button>
                  <button
                    onClick={() => setRekapSubTab("keseluruhan")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      rekapSubTab === "keseluruhan" ? "bg-white text-blue-600 shadow-2xs" : "text-slate-600"
                    }`}
                  >
                    Akumulasi Keseluruhan
                  </button>
                </div>

                <button
                  onClick={handleExportPDF}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition cursor-pointer"
                >
                  <FileText size={14} /> Ekspor PDF
                </button>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition cursor-pointer"
                >
                  <Printer size={14} /> Cetak
                </button>
              </div>
            </div>

            {/* SUB-TAB 1: PER ACARA RAPAT */}
            {rekapSubTab === "per_sesi" && (
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <Filter size={15} className="text-blue-600" />
                    <span>Pilih Acara Kegiatan:</span>
                  </div>
                  <select
                    value={selectedSesiFilter}
                    onChange={(e) => handleSelectSesiChange(e.target.value)}
                    className="rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-900 outline-none focus:border-blue-600"
                  >
                    {sesiList.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.nama_kegiatan} {s.is_active ? "(Sesi Aktif)" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                {/* SEARCH BAR PER ACARA */}
                <div className="relative max-w-sm">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari nama anggota atau bidang..."
                    value={searchPerSesi}
                    onChange={(e) => setSearchPerSesi(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-3.5 py-2 text-xs font-bold text-slate-900 outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
                      <Users size={14} /> Daftar Anggota Absen ({filteredLogSesiList.length} Orang)
                    </h3>
                  </div>

                  {filteredLogSesiList.length === 0 ? (
                    <div className="py-8 text-center text-xs font-bold text-slate-400">
                      {searchPerSesi ? "Nama anggota tidak ditemukan dalam pencarian." : "Belum ada presensi yang masuk untuk sesi kegiatan ini."}
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase text-[10px]">
                          <tr>
                            <th className="py-3 px-4">Nama Anggota</th>
                            <th className="py-3 px-4">Bidang</th>
                            <th className="py-3 px-4 text-center">Status</th>
                            <th className="py-3 px-4">Alasan / Keterangan</th>
                            <th className="py-3 px-4 text-right">Waktu Absen Realtime</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {filteredLogSesiList.map((log) => {
                            const memberInfo = log.anggota || anggotaMap.get(log.anggota_id);
                            return (
                              <tr key={log.id} className="hover:bg-slate-50/80">
                                <td className="py-3 px-4 font-bold text-slate-900">{memberInfo?.nama || "Anggota"}</td>
                                <td className="py-3 px-4 text-slate-600">{memberInfo?.bidang || "-"}</td>
                                <td className="py-3 px-4 text-center">
                                  <span
                                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                      log.status === "hadir"
                                        ? "bg-emerald-100 text-emerald-800"
                                        : log.status === "izin"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-amber-100 text-amber-800"
                                    }`}
                                  >
                                    {log.status}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-slate-600">{log.keterangan || "-"}</td>
                                <td className="py-3 px-4 text-right text-blue-600 font-mono font-bold text-[11px]">
                                  {formatWaktuRealtime(log.waktu_absen || log.created_at)}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {anggotaBelumAbsen.length > 0 && (
                    <div className="mt-6 border-t border-slate-100 pt-4">
                      <h4 className="text-xs font-black uppercase tracking-wider text-rose-600 mb-2">
                        Belum Absen ({anggotaBelumAbsen.length} Orang)
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {anggotaBelumAbsen.map((a) => (
                          <span key={a.id} className="px-2.5 py-1 rounded-lg bg-slate-100 text-[11px] font-bold text-slate-600">
                            {a.nama}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SUB-TAB 2: REKAP AKUMULASI KESELURUHAN */}
            {rekapSubTab === "keseluruhan" && (
              <div className="space-y-4">
                <div className="relative max-w-sm">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari nama anggota atau bidang..."
                    value={searchKeseluruhan}
                    onChange={(e) => setSearchKeseluruhan(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-3.5 py-2 text-xs font-bold text-slate-900 outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                {loading ? (
                  <div className="py-10 text-center font-bold text-xs text-slate-400 flex items-center justify-center gap-2">
                    <Loader2 size={16} className="animate-spin text-blue-600" /> Memuat data rekapitulasi...
                  </div>
                ) : filteredRekapList.length === 0 ? (
                  <div className="py-10 text-center text-xs font-bold text-slate-400">
                    {searchKeseluruhan ? "Nama anggota atau bidang tidak ditemukan." : "Belum ada data rekapitulasi."}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase text-[10px]">
                        <tr>
                          <th className="py-3 px-4">Nama Anggota</th>
                          <th className="py-3 px-4">Bidang</th>
                          <th className="py-3 px-4 text-center">Total Hadir</th>
                          <th className="py-3 px-4 text-center">Total Izin</th>
                          <th className="py-3 px-4 text-center">Total Sakit</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {filteredRekapList.map((r) => (
                          <tr key={r.anggota_id} className="hover:bg-slate-50/80">
                            <td className="py-3 px-4 font-bold text-slate-900">{r.nama}</td>
                            <td className="py-3 px-4 text-slate-600">{r.bidang}</td>
                            <td className="py-3 px-4 text-center text-emerald-600 font-bold">{r.total_hadir}</td>
                            <td className="py-3 px-4 text-center text-blue-600 font-bold">{r.total_izin}</td>
                            <td className="py-3 px-4 text-center text-amber-600 font-bold">{r.total_sakit}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        {/* TAB BUKA SESI RAPAT */}
        {activeTab === "sesi" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Plus size={18} className="text-blue-600" /> Buka Sesi Rapat Baru
              </h2>

              <form onSubmit={handleBuatSesi} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Kegiatan Rapat</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Rapat Evaluasi Proker"
                    value={namaKegiatan}
                    onChange={(e) => setNamaKegiatan(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs font-medium text-slate-900 outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Durasi Sesi (Menit)</label>
                  <input
                    type="number"
                    min={1}
                    max={1440}
                    required
                    placeholder="Masukkan angka menit (misal: 15)"
                    value={durasiMenit || ""}
                    onChange={(e) => setDurasiMenit(parseInt(e.target.value) || 0)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 py-3 text-xs font-bold text-white transition shadow-xs cursor-pointer"
                >
                  {isSubmitting ? "Membuka Rapat..." : "Buka Sesi Rapat Baru"}
                </button>
              </form>
            </div>

            <div className="lg:col-span-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Clock size={18} className="text-blue-600" /> Daftar & Riwayat Sesi
              </h2>

              {sesiList.length === 0 ? (
                <div className="py-10 text-center text-xs font-bold text-slate-400">
                  Belum ada sesi rapat yang dibuat.
                </div>
              ) : (
                <div className="space-y-3">
                  {sesiList.map((s) => {
                    const sisaDetik = sisaDetikMap[s.id] ?? 0;

                    return (
                      <div
                        key={s.id}
                        className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                s.is_active ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-600"
                              }`}
                            >
                              {s.is_active ? "Sesi Patokan Aktif" : "Selesai"}
                            </span>
                            <span className="text-xs font-mono font-bold text-blue-600 flex items-center gap-1">
                              <KeyRound size={12} /> Kode: {s.kode_akses}
                            </span>
                          </div>

                          <h3 className="text-sm font-bold text-slate-900">{s.nama_kegiatan}</h3>

                          {s.is_active && (
                            <div className="flex items-center gap-1.5 text-xs font-bold pt-1">
                              <Timer size={14} className={sisaDetik <= 60 ? "text-rose-600 animate-pulse" : "text-blue-600"} />
                              <span className="text-slate-500 font-medium">Sisa Waktu:</span>
                              <span className={`font-mono ${sisaDetik <= 60 ? "text-rose-600 font-black" : "text-blue-700"}`}>
                                {formatTimeRemaining(sisaDetik)}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                          {s.is_active && (
                            <>
                              <button
                                onClick={() => {
                                  setActivePromptSesiId(s.id);
                                  setShowExtendModal(true);
                                }}
                                className="px-3 py-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold hover:bg-blue-100 transition cursor-pointer flex items-center gap-1"
                              >
                                <Hourglass size={13} />
                                <span>+ Waktu</span>
                              </button>
                              <button
                                onClick={() => handleTutupSesi(s.id)}
                                className="px-3 py-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold hover:bg-amber-100 transition cursor-pointer"
                              >
                                Tutup
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => setDeletingSesi(s)}
                            className="px-3 py-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold hover:bg-rose-100 transition cursor-pointer flex items-center gap-1"
                            title="Hapus Rapat"
                          >
                            <Trash2 size={13} />
                            <span>Hapus</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB INPUT SUSULAN */}
        {activeTab === "manual" && (
          <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xs space-y-5">
            <div>
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <UserPlus size={18} className="text-blue-600" /> Presensi Susulan oleh Admin
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Gunakan fitur ini untuk memasukkan kehadiran anggota yang datang terlambat secara manual.
              </p>
            </div>

            <form onSubmit={handlePresensiManual} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Pilih Sesi Kegiatan</label>
                <select
                  value={selectedSesiManual}
                  onChange={(e) => setSelectedSesiManual(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-blue-600 focus:bg-white"
                >
                  <option value="">-- Pilih Sesi Kegiatan --</option>
                  {sesiList.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nama_kegiatan} {s.is_active ? "(Aktif)" : "(Selesai)"}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Pilih Nama Anggota</label>
                <select
                  value={selectedAnggotaManual}
                  onChange={(e) => setSelectedAnggotaManual(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-blue-600 focus:bg-white"
                >
                  <option value="">-- Pilih Anggota --</option>
                  {anggotaList.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.nama} ({a.bidang})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Status Kehadiran</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["hadir", "izin", "sakit"] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setStatusManual(st)}
                      className={`py-2.5 rounded-xl text-xs font-bold capitalize border transition cursor-pointer ${
                        statusManual === st
                          ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 py-3 text-xs font-bold text-white transition shadow-xs cursor-pointer"
              >
                {isSubmitting ? "Menyimpan Data..." : "Simpan Presensi Susulan"}
              </button>
            </form>
          </div>
        )}

      </div>
    </main>
  );
}