"use client";

import { motion } from "framer-motion";
import { Plus, Image as ImageIcon, Loader2, CheckCircle2, ArrowLeft, Upload, HardDrive, FileImage } from "lucide-react";
import { useState, FormEvent, useEffect, ChangeEvent } from "react";
import Link from "next/link";
import { uploadMedia, getMediaList, MediaItem } from "@/lib/media";

export default function AdminAddMediaPage() {
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("Kegiatan");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [driveUrl, setDriveUrl] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [fetching, setFetching] = useState(true);

  const loadMedia = async () => {
    setFetching(true);
    const data = await getMediaList();
    setMediaList(data);
    setFetching(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadMedia();
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("Ukuran gambar terlalu besar! Maksimal 5MB.");
        return;
      }
      setCoverFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleReset = () => {
    setJudul("");
    setKategori("Kegiatan");
    setCoverFile(null);
    setPreviewUrl("");
    setDriveUrl("");
    setDeskripsi("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!coverFile) {
      alert("Silakan pilih file gambar cover!");
      return;
    }

    setLoading(true);

    try {
      await uploadMedia(coverFile, {
        judul,
        kategori,
        drive_url: driveUrl,
        deskripsi,
      });

      setSubmitted(true);
      handleReset();
      loadMedia();
    } catch (err: unknown) {
      console.error("Upload Media Error:", err);
      const message = err instanceof Error ? err.message : "Gagal meng-upload media.";
      alert(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full rounded-xl border border-slate-700/80 bg-slate-900/90 px-4 py-3 text-sm text-white placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";

  return (
    <main className="min-h-screen bg-[#0B132B] text-slate-100 pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        
        {/* HEADER */}
        <div className="mb-8">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-400 transition mb-2"
          >
            <ArrowLeft size={14} /> Kembali ke Dashboard
          </Link>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Tambah Media Galeri (Supabase)
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Upload file cover gambar langsung ke Supabase Storage & cantumkan link Google Drive.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            {submitted ? (
              <div className="rounded-3xl border border-slate-800 bg-[#1C2541] p-10 text-center shadow-2xl">
                <CheckCircle2 size={56} className="mx-auto text-amber-400 mb-4" />
                <h3 className="text-2xl font-bold text-white">Media Berhasil Di-upload!</h3>
                <p className="mt-2 text-sm text-slate-300">
                  File cover tersimpan aman di Supabase Storage.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3 text-xs font-bold text-white shadow-lg transition hover:bg-blue-500"
                >
                  <Plus size={16} /> Upload Media Lagi
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-slate-800/80 bg-[#1C2541]/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
                <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <ImageIcon className="text-amber-400" size={20} /> Form Upload Media
                </h2>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-300">
                    Judul Media / Kegiatan <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                    placeholder="Contoh: Pelantikan Pengurus Periode 2026/2027"
                    required
                    className={inputStyle}
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-slate-300">
                      Kategori <span className="text-amber-400">*</span>
                    </label>
                    <select
                      value={kategori}
                      onChange={(e) => setKategori(e.target.value)}
                      className={inputStyle}
                    >
                      <option value="Kegiatan">Kegiatan</option>
                      <option value="Proker">Proker / Agenda</option>
                      <option value="Prestasi">Prestasi</option>
                      <option value="Dokumentasi">Dokumentasi</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-semibold text-slate-300">
                      Upload File Cover Image <span className="text-amber-400">*</span>
                    </label>
                    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-700 bg-slate-900/90 px-4 py-3 text-xs font-semibold text-slate-300 hover:border-blue-500 hover:bg-slate-800 transition">
                      <Upload size={16} className="text-amber-400" />
                      <span className="truncate">
                        {coverFile ? coverFile.name : "Pilih Gambar (PC/HP)"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-300">
                    URL Folder Google Drive Foto HD (Opsional)
                  </label>
                  <input
                    type="url"
                    value={driveUrl}
                    onChange={(e) => setDriveUrl(e.target.value)}
                    placeholder="https://drive.google.com/drive/folders/xxxxxx"
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-300">
                    Deskripsi Singkat <span className="text-amber-400">*</span>
                  </label>
                  <textarea
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    rows={4}
                    required
                    placeholder="Jelaskan ringkasan kegiatan ini..."
                    className="w-full resize-none rounded-xl border border-slate-700/80 bg-slate-900/90 p-4 text-sm text-white placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="rounded-full border border-slate-700/80 px-6 py-3 text-xs font-semibold text-slate-300 transition hover:bg-slate-800"
                  >
                    Batal
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3 text-xs font-bold text-white shadow-lg transition hover:bg-blue-500 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        Uploading... <Loader2 className="animate-spin" size={16} />
                      </>
                    ) : (
                      <>
                        Simpan ke Supabase <Plus size={16} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* PREVIEW */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="rounded-3xl border border-slate-800/80 bg-[#1C2541]/90 p-6 shadow-2xl backdrop-blur-xl">
              <h3 className="text-sm font-bold text-slate-300 mb-4 flex items-center gap-2">
                <FileImage size={16} className="text-amber-400" /> Preview File Cover
              </h3>

              <div className="overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900 aspect-video flex items-center justify-center relative">
                {previewUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-center p-6 text-slate-500">
                    <Upload size={40} className="mx-auto mb-2 opacity-50 text-amber-400" />
                    <p className="text-xs">Pilih file gambar dari komputer untuk preview</p>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <span className="inline-block rounded-full bg-amber-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400 border border-amber-400/20">
                  {kategori}
                </span>
                <h4 className="mt-2 text-base font-bold text-white">
                  {judul || "Judul Media Draf"}
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-400 line-clamp-2">
                  {deskripsi || "Deskripsi media akan tampil di sini..."}
                </p>

                {driveUrl && (
                  <div className="mt-4 pt-3 border-t border-slate-800">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                      <HardDrive size={14} /> Terhubung ke Google Drive
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

        </div>

        {/* LIST MEDIA */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-white mb-6">
            Daftar Media Ter-upload ({mediaList.length})
          </h2>

          {fetching ? (
            <div className="flex items-center gap-2 text-slate-400 text-sm py-8">
              <Loader2 className="animate-spin" size={18} /> Memuat data dari Supabase...
            </div>
          ) : mediaList.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-[#1C2541]/50 p-8 text-center text-slate-400 text-sm">
              Belum ada data media yang tersimpan di Supabase.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {mediaList.map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-2xl border border-slate-800 bg-[#1C2541] shadow-lg transition hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="h-40 w-full overflow-hidden bg-slate-900 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image_url}
                        alt={item.judul}
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute top-2 right-2 rounded-full bg-slate-950/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-amber-400 border border-amber-400/20">
                        {item.kategori}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-bold text-white line-clamp-1">{item.judul}</h3>
                      <p className="mt-1 text-xs text-slate-400 line-clamp-2">{item.deskripsi}</p>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    {item.drive_url && item.drive_url !== "-" && (
                      <a
                        href={item.drive_url}
                        target="_blank"
                        rel="noreferrer"
                        className="mb-2 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-600/20 border border-emerald-500/30 py-2 text-xs font-bold text-emerald-400 hover:bg-emerald-600 hover:text-white transition"
                      >
                        <HardDrive size={13} /> Buka Google Drive
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}