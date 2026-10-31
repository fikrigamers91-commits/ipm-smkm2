'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Search, 
  CheckCircle2, 
  Save, 
  Loader2, 
  Filter,
  RefreshCw,
  Sparkles,
  X,
  AlertTriangle,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProgramKerja, updateProgramKerja, ProgramKerja, StatusProker } from '@/lib/supabase/program-kerja';
import { programKerja as fallbackData } from '@/data/program-kerja';

const BULAN_LIST = [
  { value: 1, label: 'Jan' },
  { value: 2, label: 'Feb' },
  { value: 3, label: 'Mar' },
  { value: 4, label: 'Apr' },
  { value: 5, label: 'Mei' },
  { value: 6, label: 'Jun' },
  { value: 7, label: 'Jul' },
  { value: 8, label: 'Agu' },
  { value: 9, label: 'Sep' },
  { value: 10, label: 'Okt' },
  { value: 11, label: 'Nov' },
  { value: 12, label: 'Des' },
];

const BIDANG_LIST = [
  'Semua Bidang',
  'Kepemimpinan',
  'Kesekretariatan',
  'Keuangan',
  'Perkaderan',
  'Kajian Dakwah Islam',
  'Pengkajian Ilmu Pengetahuan',
  'Apresiasi Seni Budaya & Olahraga',
  'Pengembangan Kreativitas & Kewirausahaan',
  'Keipmawatian',
  'Advokasi',
];

export default function AdminProgramKerjaPage() {
  const router = useRouter();
  const [prokerList, setProkerList] = useState<ProgramKerja[]>(fallbackData);
  const [loading, setLoading] = useState<boolean>(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBidang, setSelectedBidang] = useState<string>('Semua Bidang');
  const [selectedStatus, setSelectedStatus] = useState<string>('semua');
  
  // Floating Toast Notification
  const [toast, setToast] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Unsaved Changes Tracking & Modal
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [showLeaveModal, setShowLeaveModal] = useState<boolean>(false);

  // Auto-hide Toast Notification dalam 5 Detik
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const fetchProker = async () => {
    setLoading(true);
    try {
      const data = await getProgramKerja();
      if (data && data.length > 0) {
        setProkerList(data);
        setIsDirty(false);
      }
    } catch {
      setToast({ type: 'error', text: 'Gagal memuat data program kerja.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    
    async function initFetch() {
      setLoading(true);
      try {
        const data = await getProgramKerja();
        if (isMounted && data && data.length > 0) {
          setProkerList(data);
        }
      } catch {
        if (isMounted) {
          setToast({ type: 'error', text: 'Gagal memuat data program kerja.' });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    initFetch();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleToggleBulan = (id: string, bulanNum: number) => {
    setIsDirty(true);
    setProkerList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const currentBulan = item.bulan || [];
          const updatedBulan = currentBulan.includes(bulanNum)
            ? currentBulan.filter((b) => b !== bulanNum)
            : [...currentBulan, bulanNum].sort((a, b) => a - b);
          
          let updatedStatus = item.status;
          if (updatedBulan.length === 0 && item.status === 'terjadwal') {
            updatedStatus = 'belum_ditentukan';
          } else if (updatedBulan.length > 0 && item.status === 'belum_ditentukan') {
            updatedStatus = 'terjadwal';
          }

          return { ...item, bulan: updatedBulan, status: updatedStatus };
        }
        return item;
      })
    );
  };

  const handleStatusChange = (id: string, newStatus: StatusProker) => {
    setIsDirty(true);
    setProkerList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const handleSave = async (proker: ProgramKerja) => {
    setSavingId(proker.id);
    try {
      await updateProgramKerja(proker);
      setIsDirty(false);
      setToast({ type: 'success', text: `Proker "${proker.nama}" berhasil diperbarui!` });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Terjadi kesalahan';
      setToast({ type: 'error', text: `Gagal memperbarui: ${errorMsg}` });
    } finally {
      setSavingId(null);
    }
  };

  const handleQuickToggleSelesai = async (proker: ProgramKerja) => {
    const newStatus: StatusProker = proker.status === 'selesai' ? 'terjadwal' : 'selesai';
    const updatedProker = { ...proker, status: newStatus };
    
    setProkerList((prev) => prev.map((p) => (p.id === proker.id ? updatedProker : p)));
    setSavingId(proker.id);
    
    try {
      await updateProgramKerja(updatedProker);
      setIsDirty(false);
      setToast({ 
        type: 'success', 
        text: `Proker "${proker.nama}" ditandai ${newStatus === 'selesai' ? 'selesai' : 'terjadwal'}!` 
      });
    } catch {
      fetchProker();
      setToast({ type: 'error', text: 'Gagal memperbarui status proker.' });
    } finally {
      setSavingId(null);
    }
  };

  const handleBackToDashboard = (e: React.MouseEvent) => {
    if (isDirty) {
      e.preventDefault();
      setShowLeaveModal(true);
    }
  };

  const filteredProker = prokerList.filter((item) => {
    const matchSearch = item.nama.toLowerCase().includes(searchQuery.toLowerCase());
    const matchBidang = selectedBidang === 'Semua Bidang' || item.bidang === selectedBidang;
    const matchStatus = selectedStatus === 'semua' || item.status === selectedStatus;
    return matchSearch && matchBidang && matchStatus;
  });

  return (
    <div className="relative min-h-screen bg-slate-100/70 pb-20">
      
      {/* FLOATING TOAST NOTIFICATION (DI ATAS & HILANG 5 DETIK) */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -40, x: '-50%', scale: 0.95 }}
            animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
            exit={{ opacity: 0, y: -20, x: '-50%', scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-5 left-1/2 z-50 w-[90vw] max-w-md pointer-events-auto"
          >
            <div
              className={`flex items-center justify-between gap-3 p-4 rounded-2xl shadow-2xl border backdrop-blur-xl ${
                toast.type === 'success'
                  ? 'bg-slate-950/90 text-white border-emerald-500/40'
                  : 'bg-slate-950/90 text-white border-rose-500/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-xl text-white font-bold shrink-0 ${
                    toast.type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}
                >
                  {toast.type === 'success' ? <Check size={18} /> : <AlertTriangle size={18} />}
                </div>
                <p className="text-xs sm:text-sm font-semibold leading-snug">
                  {toast.text}
                </p>
              </div>

              <button
                onClick={() => setToast(null)}
                className="text-slate-400 hover:text-white transition p-1 rounded-full hover:bg-white/10 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER SECTION */}
      <div className="bg-linear-to-r from-blue-700 via-blue-600 to-emerald-600 text-white py-8 px-4 sm:px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Link 
              href="/admin" 
              onClick={handleBackToDashboard}
              className="inline-flex items-center gap-2 text-xs font-semibold text-blue-100 hover:text-white mb-3 transition bg-white/10 px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-sm cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Dashboard
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2.5">
              <span>Pengelolaan Program Kerja</span>
              <Sparkles className="w-6 h-6 text-amber-300 shrink-0" />
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm mt-1">
              Atur bulan pelaksanaan dan status proker PR IPM SMK Muda 2026–2027
            </p>
          </div>
          
          <button
            onClick={fetchProker}
            disabled={loading}
            className="self-start md:self-auto inline-flex items-center gap-2 bg-white text-slate-900 font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-md hover:bg-amber-400 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Reload Data
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-8">
        {/* SEARCH & FILTER BAR */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-3 justify-between items-center">
          <div className="relative w-full md:flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama program kerja..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition"
            />
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-2.5 w-full md:w-auto">
            <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/50 text-xs w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-500 shrink-0" />
              <select
                value={selectedBidang}
                onChange={(e) => setSelectedBidang(e.target.value)}
                className="bg-transparent focus:outline-none text-slate-900 font-bold cursor-pointer w-full"
              >
                {BIDANG_LIST.map((bidang) => (
                  <option key={bidang} value={bidang}>{bidang}</option>
                ))}
              </select>
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/50 text-xs focus:outline-none text-slate-900 font-bold cursor-pointer w-full sm:w-auto"
            >
              <option value="semua">Semua Status</option>
              <option value="belum_ditentukan">Belum Ditentukan</option>
              <option value="tentatif">Tentatif</option>
              <option value="terjadwal">Terjadwal</option>
              <option value="insidental">Insidental</option>
              <option value="selesai">Selesai</option>
            </select>
          </div>
        </div>

        {/* DATA CONTAINER */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-500 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              <p className="text-sm font-bold text-slate-700">Memuat data program kerja...</p>
            </div>
          ) : filteredProker.length === 0 ? (
            <div className="py-16 text-center text-slate-500">
              <p className="text-base font-bold text-slate-800">Program kerja tidak ditemukan</p>
              <p className="text-xs text-slate-400 mt-1">Sesuaikan kata kunci pencarian atau filter bidang/status.</p>
            </div>
          ) : (
            <>
              {/* 1. TAMPILAN MOBILE: KARTU BERTUMPUK */}
              <div className="block md:hidden divide-y divide-slate-100">
                {filteredProker.map((proker) => {
                  const isSaving = savingId === proker.id;
                  return (
                    <div key={proker.id} className="p-4 space-y-3.5">
                      {/* Top Header: Bidang & Status */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="bg-slate-100 text-slate-800 px-2.5 py-1 rounded-full text-[10px] font-bold border border-slate-200">
                          {proker.bidang}
                        </span>

                        <select
                          value={proker.status}
                          onChange={(e) =>
                            handleStatusChange(proker.id, e.target.value as StatusProker)
                          }
                          className={`border rounded-xl text-[11px] px-2.5 py-1 font-bold focus:outline-none cursor-pointer ${
                            proker.status === 'selesai'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : proker.status === 'terjadwal'
                              ? 'bg-blue-50 text-blue-800 border-blue-300'
                              : 'bg-slate-50 text-slate-900 border-slate-300'
                          }`}
                        >
                          <option value="belum_ditentukan">Belum Ditentukan</option>
                          <option value="tentatif">Tentatif</option>
                          <option value="terjadwal">Terjadwal</option>
                          <option value="insidental">Insidental</option>
                          <option value="selesai">Selesai</option>
                        </select>
                      </div>

                      {/* Judul Proker */}
                      <h3 className="font-bold text-slate-900 text-sm leading-snug">
                        {proker.nama}
                      </h3>

                      {/* Bulan Pelaksanaan Toggle */}
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                          Bulan Pelaksanaan
                        </span>
                        <div className="grid grid-cols-6 gap-1">
                          {BULAN_LIST.map((b) => {
                            const isSelected = proker.bulan?.includes(b.value);
                            return (
                              <button
                                key={b.value}
                                type="button"
                                onClick={() => handleToggleBulan(proker.id, b.value)}
                                className={`text-[10px] py-1 rounded-lg font-bold border transition duration-150 cursor-pointer text-center ${
                                  isSelected
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                                    : 'bg-slate-100/70 text-slate-500 border-slate-200/70 hover:bg-slate-200 hover:text-slate-800'
                                }`}
                              >
                                {b.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Tombol Aksi Bottom */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleQuickToggleSelesai(proker)}
                          disabled={isSaving}
                          className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                            proker.status === 'selesai'
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{proker.status === 'selesai' ? 'Selesai' : 'Tandai Selesai'}</span>
                        </button>

                        <button
                          onClick={() => handleSave(proker)}
                          disabled={isSaving}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 px-3 rounded-xl transition font-bold shadow-xs cursor-pointer disabled:opacity-50"
                        >
                          {isSaving ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Save className="w-3.5 h-3.5" />
                          )}
                          <span>Simpan</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 2. TAMPILAN DESKTOP: TABEL */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase text-[11px] tracking-wider">
                      <th className="py-4 px-6">Program Kerja</th>
                      <th className="py-4 px-4">Bidang</th>
                      <th className="py-4 px-4">Bulan Pelaksanaan</th>
                      <th className="py-4 px-4">Status</th>
                      <th className="py-4 px-6 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProker.map((proker) => {
                      const isSaving = savingId === proker.id;
                      return (
                        <tr key={proker.id} className="hover:bg-slate-50/80 transition">
                          <td className="py-4 px-6 font-bold text-slate-900 max-w-xs leading-snug">
                            {proker.nama}
                          </td>

                          <td className="py-4 px-4 text-xs font-bold text-slate-700">
                            <span className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full border border-slate-200/80 inline-block font-semibold">
                              {proker.bidang}
                            </span>
                          </td>

                          <td className="py-4 px-4">
                            <div className="grid grid-cols-6 gap-1 max-w-xs">
                              {BULAN_LIST.map((b) => {
                                const isSelected = proker.bulan?.includes(b.value);
                                return (
                                  <button
                                    key={b.value}
                                    type="button"
                                    onClick={() => handleToggleBulan(proker.id, b.value)}
                                    className={`text-[10px] py-1 rounded-lg font-bold border transition duration-150 cursor-pointer text-center ${
                                      isSelected
                                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                                        : 'bg-slate-100/70 text-slate-500 border-slate-200/70 hover:bg-slate-200 hover:text-slate-800'
                                    }`}
                                  >
                                    {b.label}
                                  </button>
                                );
                              })}
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <select
                              value={proker.status}
                              onChange={(e) =>
                                handleStatusChange(proker.id, e.target.value as StatusProker)
                              }
                              className={`border rounded-xl text-xs px-3 py-1.5 font-bold focus:outline-none cursor-pointer ${
                                proker.status === 'selesai'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : proker.status === 'terjadwal'
                                  ? 'bg-blue-50 text-blue-800 border-blue-300'
                                  : 'bg-slate-50 text-slate-900 border-slate-300'
                              }`}
                            >
                              <option value="belum_ditentukan" className="text-slate-900">Belum Ditentukan</option>
                              <option value="tentatif" className="text-slate-900">Tentatif</option>
                              <option value="terjadwal" className="text-slate-900">Terjadwal</option>
                              <option value="insidental" className="text-slate-900">Insidental</option>
                              <option value="selesai" className="text-slate-900">Selesai</option>
                            </select>
                          </td>

                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleQuickToggleSelesai(proker)}
                                disabled={isSaving}
                                title={proker.status === 'selesai' ? 'Tandai Belum Selesai' : 'Tandai Selesai'}
                                className={`p-2 rounded-xl border transition cursor-pointer ${
                                  proker.status === 'selesai'
                                    ? 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700'
                                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                                }`}
                              >
                                <CheckCircle2 className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => handleSave(proker)}
                                disabled={isSaving}
                                className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3.5 py-2 rounded-xl transition font-bold shadow-xs cursor-pointer disabled:opacity-50"
                              >
                                {isSaving ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                  <Save className="w-3.5 h-3.5" />
                                )}
                                Simpan
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      {/* POP-UP MODAL FULLSCREEN: UNSAVED CHANGES CONFIRMATION */}
      <AnimatePresence>
        {showLeaveModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100"
            >
              <div className="flex items-center gap-3 text-amber-500 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 border border-amber-200 shrink-0">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Ada Perubahan Belum Disimpan!</h3>
                  <p className="text-xs font-semibold text-slate-500">Perhatian sebelum keluar</p>
                </div>
              </div>

              <p className="text-xs font-medium text-slate-600 leading-relaxed mb-6">
                Kamu telah mengubah beberapa status atau bulan pelaksanaan program kerja. Jika keluar sekarang tanpa menyimpan, perubahan tersebut akan hilang.
              </p>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setShowLeaveModal(false)}
                  className="flex-1 py-3 px-4 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 transition cursor-pointer"
                >
                  Batal & Lanjut Edit
                </button>
                <button
                  onClick={() => {
                    setIsDirty(false);
                    setShowLeaveModal(false);
                    router.push('/admin');
                  }}
                  className="flex-1 py-3 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-xs font-bold text-white transition shadow-md cursor-pointer"
                >
                  Keluar Tanpa Menyimpan
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}