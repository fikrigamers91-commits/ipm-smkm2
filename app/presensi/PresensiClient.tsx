"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  X,
  QrCode,
  UserCheck,
  KeyRound,
  MapPin,
  Navigation,
  FileText,
  Loader2,
  ShieldCheck,
  CalendarCheck2,
  Copy,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Anggota = { id: string; nama: string; bidang: string; poin: number };
type SesiAktif = { id: string; nama_kegiatan: string; waktu_tutup: string };

// Titik Koordinat Presisi Rapat/Sekolah
const TARGET_LAT = -6.4307877443825925;
const TARGET_LNG = 106.96295062175803;
const MAX_RADIUS_METERS = 500; // Radius maksimal 500 meter

function getDistanceInMeters(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function PresensiClient() {
  const [anggotaList, setAnggotaList] = useState<Anggota[]>([]);
  const [sesiAktif, setSesiAktif] = useState<SesiAktif | null>(null);
  const [selectedAnggota, setSelectedAnggota] = useState("");
  const [kodeAkses, setKodeAkses] = useState("");
  const [status, setStatus] = useState<"hadir" | "izin" | "sakit">("hadir");
  const [keterangan, setKeterangan] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingInit, setLoadingInit] = useState(true);

  // State Geolocation
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [gettingLocation, setGettingLocation] = useState(false);

  const [toast, setToast] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
    show: false,
    type: "success",
    message: "",
  });

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 4500);
  };

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      const supabase = createClient();
      
      const [{ data: dataAnggota }, { data: dataSesi }] = await Promise.all([
        supabase.from("anggota").select("*").order("nama", { ascending: true }),
        supabase
          .from("sesi_presensi")
          .select("id, nama_kegiatan, waktu_tutup")
          .eq("is_active", true)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle(),
      ]);

      if (isMounted) {
        if (dataAnggota) setAnggotaList(dataAnggota);
        if (dataSesi) setSesiAktif(dataSesi);
        setLoadingInit(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Fungsi Deteksi Lokasi Manual (Hanya dipanggil saat tombol dipencet)
  const requestLocation = () => {
    if (!navigator.geolocation) {
      setGpsError("Perangkat kamu tidak mendukung fitur lokasi/GPS.");
      return;
    }

    setGettingLocation(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setUserCoords({ lat, lng });

        const dist = getDistanceInMeters(lat, lng, TARGET_LAT, TARGET_LNG);
        setDistance(Math.round(dist));
        setGettingLocation(false);
      },
      (err) => {
        setGettingLocation(false);
        if (err.code === err.PERMISSION_DENIED) {
          setGpsError("Akses lokasi ditolak. Silakan nyalakan GPS dan izinkan lokasi di browser HP kamu.");
        } else {
          setGpsError("Gagal mengambil lokasi GPS. Pastikan GPS HP kamu sudah aktif.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleStatusChange = (st: "hadir" | "izin" | "sakit") => {
    setStatus(st);
  };

  const copyMyCoords = () => {
    if (userCoords) {
      const coordStr = `${userCoords.lat.toFixed(6)}, ${userCoords.lng.toFixed(6)}`;
      navigator.clipboard.writeText(coordStr);
      showToast("success", `Koordinat disalin: ${coordStr}`);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!sesiAktif) {
      showToast("error", "Belum ada sesi rapat yang dibuka oleh pengurus.");
      return;
    }

    if (!selectedAnggota) {
      showToast("error", "Pilih nama kamu terlebih dahulu.");
      return;
    }

    if (status === "hadir") {
      if (!kodeAkses.trim()) {
        showToast("error", "Masukkan 6 digit kode presensi rapat.");
        return;
      }

      if (!userCoords) {
        showToast("error", "Silakan klik tombol 'Deteksi Lokasi Saya' terlebih dahulu.");
        return;
      }

      if (distance !== null && distance > MAX_RADIUS_METERS) {
        showToast(
          "error",
          `Kamu berada di luar radius rapat! Jarak kamu: ${distance} meter (Maksimal ${MAX_RADIUS_METERS}m).`
        );
        return;
      }
    } else {
      if (!keterangan.trim()) {
        showToast("error", "Tuliskan alasan izin/sakit secara singkat.");
        return;
      }
    }

    setLoading(true);
    const supabase = createClient();

    if (status === "hadir") {
      const { data: sesiValid, error: sesiErr } = await supabase
        .from("sesi_presensi")
        .select("*")
        .eq("id", sesiAktif.id)
        .eq("kode_akses", kodeAkses.trim())
        .eq("is_active", true)
        .single();

      if (sesiErr || !sesiValid) {
        setLoading(false);
        showToast("error", "Kode presensi salah atau sesi rapat sudah ditutup.");
        return;
      }

      if (new Date() > new Date(sesiValid.waktu_tutup)) {
        setLoading(false);
        showToast("error", "Waktu presensi untuk sesi rapat ini telah habis.");
        return;
      }
    }

    const { error: logErr } = await supabase.from("log_presensi").insert([
      {
        sesi_id: sesiAktif.id,
        anggota_id: selectedAnggota,
        status,
        keterangan: status !== "hadir" ? keterangan : "Hadir Terverifikasi GPS (Radius <= 500m)",
        latitude: userCoords?.lat || null,
        longitude: userCoords?.lng || null,
      },
    ]);

    setLoading(false);

    if (logErr) {
      if (logErr.code === "23505") {
        showToast("error", "Kamu sudah mengisi presensi pada sesi rapat ini.");
      } else {
        showToast("error", `Gagal menyimpan: ${logErr.message || logErr.details || "Periksa RLS Supabase"}`);
      }
    } else {
      showToast(
        "success",
        status === "hadir"
          ? "Presensi Berhasil! Terverifikasi di area rapat (+10 Poin)."
          : "Pengajuan izin/sakit berhasil dikirim."
      );
      setKodeAkses("");
      setSelectedAnggota("");
      setKeterangan("");
      setUserCoords(null);
      setDistance(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 pt-24 pb-16 px-4 sm:px-6 font-sans">
      
      {/* TOAST NOTIFIKASI */}
      {toast.show && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div
            className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 shadow-md border text-xs sm:text-sm font-bold ${
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
            <span className="flex-1 leading-snug">{toast.message}</span>
            <button
              type="button"
              onClick={() => setToast({ ...toast, show: false })}
              className="p-1 hover:opacity-70 transition cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-md space-y-5">
        
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition"
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Beranda Utama</span>
        </Link>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 border border-blue-100 text-blue-600">
              <QrCode size={28} />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Presensi Kegiatan
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Sistem Kehadiran Digital PR IPM SMK Muda
            </p>
          </div>

          {/* INFORMASI RAPAT AKTIF */}
          {loadingInit ? (
            <div className="py-4 text-center text-xs font-bold text-slate-400 flex items-center justify-center gap-2">
              <Loader2 size={15} className="animate-spin text-blue-600" />
              <span>Memeriksa sesi rapat aktif...</span>
            </div>
          ) : sesiAktif ? (
            <div className="rounded-2xl bg-blue-50/80 border border-blue-100 p-3.5 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-2xs">
                <CalendarCheck2 size={20} />
              </div>
              <div className="space-y-0.5 overflow-hidden">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">
                  Sesi Rapat Patokan
                </span>
                <h3 className="text-xs font-bold text-slate-900 truncate">
                  {sesiAktif.nama_kegiatan}
                </h3>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-center text-xs font-bold text-amber-800">
              Belum ada sesi rapat yang sedang dibuka oleh pengurus.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Pilih Anggota */}
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <UserCheck size={14} className="text-blue-600" /> Nama Anggota
              </label>
              <select
                value={selectedAnggota}
                onChange={(e) => setSelectedAnggota(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-3 text-xs font-bold text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white"
              >
                <option value="">Pilih nama kamu...</option>
                {anggotaList.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.nama} ({a.bidang})
                  </option>
                ))}
              </select>
            </div>

            {/* Status Kehadiran */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Status Kehadiran</label>
              <div className="grid grid-cols-3 gap-2">
                {(["hadir", "izin", "sakit"] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => handleStatusChange(st)}
                    className={`py-2.5 rounded-xl text-xs font-bold capitalize border transition cursor-pointer ${
                      status === st
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {status === "hadir" ? (
              <>
                {/* Status GPS Real-time */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="flex items-center gap-1.5 text-slate-700">
                      <MapPin size={14} className="text-emerald-600" /> Lokasi GPS (Maks 500m)
                    </span>
                    {userCoords && (
                      <button
                        type="button"
                        onClick={requestLocation}
                        disabled={gettingLocation}
                        className="text-[11px] text-blue-600 hover:underline flex items-center gap-1 cursor-pointer font-bold"
                      >
                        <Navigation size={11} />
                        <span>{gettingLocation ? "Mendeteksi..." : "Cek Ulang"}</span>
                      </button>
                    )}
                  </div>

                  {gettingLocation ? (
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium py-2">
                      <Loader2 size={14} className="animate-spin text-blue-600" />
                      <span>Mendeteksi posisi GPS kamu...</span>
                    </div>
                  ) : distance !== null && userCoords ? (
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className={distance <= MAX_RADIUS_METERS ? "text-emerald-600" : "text-rose-600"}>
                          {distance <= MAX_RADIUS_METERS ? "✓ Dalam Area Rapat" : "✕ Di Luar Radius 500m"}
                        </span>
                        <span className="font-mono text-slate-500">{distance} Meter</span>
                      </div>

                      <div className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-lg border border-slate-200/80 text-[10px] font-mono text-slate-600">
                        <span>
                          {userCoords.lat.toFixed(5)}, {userCoords.lng.toFixed(5)}
                        </span>
                        <button
                          type="button"
                          onClick={copyMyCoords}
                          className="text-blue-600 font-bold hover:underline flex items-center gap-1"
                          title="Salin titik GPS kamu"
                        >
                          <Copy size={11} />
                          <span>Salin</span>
                        </button>
                      </div>
                    </div>
                  ) : gpsError ? (
                    <div className="space-y-2 pt-1">
                      <p className="text-[11px] text-rose-600 font-medium leading-snug">
                        {gpsError}
                      </p>
                      <button
                        type="button"
                        onClick={requestLocation}
                        className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Navigation size={13} />
                        <span>Coba Deteksi Lagi</span>
                      </button>
                    </div>
                  ) : (
                    /* DEFAULT STATE PERTAMA KALI KETIKA BELUM DITEKAN */
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={requestLocation}
                        className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Navigation size={14} />
                        <span>Deteksi Lokasi Saya</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Kode Akses 6 Digit */}
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <KeyRound size={14} className="text-blue-600" /> Kode Akses Sesi (6 Digit)
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    placeholder="Contoh: 849201"
                    value={kodeAkses}
                    onChange={(e) => setKodeAkses(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-center text-base font-black tracking-widest text-slate-900 placeholder:tracking-normal placeholder-slate-400 outline-none transition focus:border-blue-600 focus:bg-white"
                  />
                </div>
              </>
            ) : (
              /* Input Alasan Izin/Sakit */
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <FileText size={14} className="text-amber-600" /> Alasan {status === "izin" ? "Izin" : "Sakit"}
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder={`Tuliskan alasan ${status} kamu...`}
                  value={keterangan}
                  onChange={(e) => setKeterangan(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-xs font-medium text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white resize-none"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !sesiAktif}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 py-3.5 text-xs font-bold text-white transition disabled:opacity-50 shadow-xs cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  <span>Memproses Data...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  <span>{status === "hadir" ? "Kirim Presensi (Cek GPS)" : "Kirim Pengajuan " + status}</span>
                </>
              )}
            </button>
          </form>

        </div>

        <p className="text-center text-[11px] font-medium text-slate-400">
          Sistem Presensi Digital • PR IPM SMK Muda Cileungsi
        </p>

      </div>
    </main>
  );
}