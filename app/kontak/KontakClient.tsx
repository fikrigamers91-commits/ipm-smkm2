"use client";

import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle2, Handshake, Mail, Phone, MapPin, AlertCircle, X } from "lucide-react";
import { useState, FormEvent } from "react";
import { submitToGoogleSheets } from "@/lib/google-sheets";

type KategoriPesan = "Kritik & Saran" | "Pertanyaan" | "Kerja Sama";

export default function KontakClient() {
  const [kategori, setKategori] = useState<KategoriPesan>("Kritik & Saran");
  const [namaMode, setNamaMode] = useState<"publik" | "anonim">("publik");
  const [nama, setNama] = useState("");
  const [asal, setAsal] = useState("");
  const [asalLainnya, setAsalLainnya] = useState("");
  const [pesan, setPesan] = useState("");
  const [honeypot, setHoneypot] = useState(""); // Anti-spam hidden field

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // State Pop-up Toast Melayang
  const [toast, setToast] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
    show: false,
    type: "success",
    message: "",
  });

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 4000);
  };

  const handleReset = () => {
    setNama("");
    setAsal("");
    setAsalLainnya("");
    setPesan("");
    setNamaMode("publik");
    setHoneypot("");
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Proteksi Honeypot Anti-Spam: jika field tersembunyi terisi bot, hentikan eksekusi
    if (honeypot) return;

    let finalNama = nama;
    if (kategori === "Kritik & Saran" && namaMode === "anonim") {
      finalNama = "Anonim";
    }

    let finalInstansi = asal;
    if (asal === "Lainnya") {
      finalInstansi = asalLainnya;
    }

    if (kategori === "Kerja Sama") {
      const nomorWA = "6283870319730";
      const teksWA = `Assalamu'alaikum PR IPM SMK Muhammadiyah 2 Cileungsi,\nPerkenalkan saya ${finalNama || "..."} dari perwakilan ${finalInstansi || "..."}. Sehubungan dengan keperluan kami, kami ingin mengajukan kerja sama/sponsorship.\n\n*Detail Pesan:*\n${pesan}`;
      const urlWA = `https://wa.me/${nomorWA}?text=${encodeURIComponent(teksWA)}`;
      
      window.open(urlWA, "_blank");
      showToast("success", "Mengarahkan ke WhatsApp resmi IPM Muda...");
      setSubmitted(true);
      handleReset();
      return;
    }

    setLoading(true);

    try {
      await submitToGoogleSheets({
        tipe: kategori,
        nama: finalNama || "Anonim",
        instansi: finalInstansi || "-",
        pesan,
      });

      showToast("success", "Pesan dan aspirasi Anda berhasil terkirim!");
      setSubmitted(true);
      handleReset();
    } catch (err: unknown) {
      console.error("Submit Error:", err);
      const errorMessage = err instanceof Error ? err.message : "Terjadi kesalahan pada server.";
      showToast("error", `Gagal mengirim pesan: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full rounded-xl border border-slate-700/80 bg-slate-900/90 px-4 py-3 text-sm text-white placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";

  return (
    <main className="min-h-screen bg-[#0B132B] text-slate-100 pt-20 overflow-hidden relative">
      
      {/* POP-UP TOAST NOTIFICATION MELAYANG */}
      {toast.show && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div
            className={`flex items-center gap-3 rounded-2xl px-5 py-3.5 shadow-2xl border text-xs sm:text-sm font-bold backdrop-blur-md transition-all ${
              toast.type === "success"
                ? "bg-emerald-950/90 border-emerald-500/50 text-emerald-200"
                : "bg-rose-950/90 border-rose-500/50 text-rose-200"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle size={18} className="text-rose-400 shrink-0" />
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

      {/* SECTION 1: HERO & FORM */}
      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl items-center px-6 py-12 lg:px-12">
        <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[4px] text-amber-400">
              Terhubung dengan kami disini!
            </p>
            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              Butuh Bantuan?
            </h1>
            <p className="mt-3 text-2xl font-semibold text-slate-300">
              Silahkan Hubungi Kepengurusan Kami!
            </p>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-slate-400">
              Sampaikan pertanyaan, kritik, saran, maupun ajakan kerja sama secara langsung kepada kami.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            {submitted ? (
              <div className="rounded-3xl border border-slate-800 bg-[#1C2541] p-10 text-center shadow-2xl">
                <CheckCircle2 size={56} className="mx-auto text-amber-400 mb-4" />
                <h3 className="text-2xl font-bold text-white">Pesan Terkirim!</h3>
                <p className="mt-3 text-sm text-slate-300">
                  {kategori === "Kerja Sama"
                    ? "Halaman WhatsApp telah dibuka. Silakan lanjutkan pesan kamu di WhatsApp."
                    : "Terima kasih! Pesan kamu telah tersimpan di sistem kami."}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 rounded-full bg-blue-600 px-8 py-3 text-sm font-bold text-white transition hover:bg-blue-500 cursor-pointer"
                >
                  Kirim Pesan Lagi
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5 rounded-3xl border border-slate-800/80 bg-[#1C2541]/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
                
                {/* HONEYPOT SPAM PROTECTION (HIDDEN INPUT) */}
                <input
                  type="text"
                  name="user_website_hp"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-slate-300">
                      Kategori <span className="text-amber-400">*</span>
                    </label>
                    <select
                      value={kategori}
                      onChange={(e) => setKategori(e.target.value as KategoriPesan)}
                      className={inputStyle}
                    >
                      <option value="Kritik & Saran">Kritik & Saran</option>
                      <option value="Pertanyaan">Pertanyaan</option>
                      <option value="Kerja Sama">Kerja Sama / Sponsorship</option>
                    </select>
                  </div>

                  {kategori === "Kritik & Saran" ? (
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-slate-300">
                        Opsi Tampilan Nama <span className="text-amber-400">*</span>
                      </label>
                      <select
                        value={namaMode}
                        onChange={(e) => setNamaMode(e.target.value as "publik" | "anonim")}
                        className={inputStyle}
                      >
                        <option value="publik">Tampilkan Nama Lengkap</option>
                        <option value="anonim">Kirim Secara Anonim</option>
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-slate-300">
                        Nama Lengkap <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        placeholder="Tuliskan nama Anda"
                        required
                        className={inputStyle}
                      />
                    </div>
                  )}
                </div>

                {kategori === "Kritik & Saran" && namaMode === "publik" && (
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-slate-300">
                      Nama Anda <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      placeholder="Tuliskan nama Anda"
                      required
                      className={inputStyle}
                    />
                  </div>
                )}

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-300">
                    Asal Sekolah <span className="text-amber-400">*</span>
                  </label>
                  <select
                    value={asal}
                    onChange={(e) => setAsal(e.target.value)}
                    required
                    className={inputStyle}
                  >
                    <option value="">Pilih asal sekolah</option>
                    <option value="SMK Muhammadiyah 2 Cileungsi">SMK Muhammadiyah 2 Cileungsi</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>

                  {asal === "Lainnya" && (
                    <input
                      type="text"
                      value={asalLainnya}
                      onChange={(e) => setAsalLainnya(e.target.value)}
                      placeholder="Tuliskan nama instansi / organisasi Anda"
                      required
                      className={`${inputStyle} mt-3`}
                    />
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-300">
                    Pesan <span className="text-amber-400">*</span>
                  </label>
                  <textarea
                    value={pesan}
                    onChange={(e) => setPesan(e.target.value)}
                    rows={5}
                    required
                    placeholder={
                      kategori === "Kerja Sama"
                        ? "Jelaskan bentuk penawaran kerja sama / sponsorship..."
                        : "Tuliskan pesan Anda..."
                    }
                    className="w-full resize-none rounded-xl border border-slate-700/80 bg-slate-900/90 p-4 text-sm text-white placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="rounded-full border border-slate-700/80 px-6 py-3 text-xs font-semibold text-slate-300 transition hover:bg-slate-800 cursor-pointer"
                  >
                    Hapus Isian
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-xs font-bold text-slate-900 shadow-lg transition hover:bg-amber-400 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        Mengirim... <Loader2 className="animate-spin" size={16} />
                      </>
                    ) : kategori === "Kerja Sama" ? (
                      <>
                        Lanjut ke WhatsApp <Handshake size={16} />
                      </>
                    ) : (
                      <>
                        Kirim Pesan <Send size={16} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* SECTION 2: MAPS */}
      <section className="border-t border-slate-800/80 bg-[#1C2541] py-16 text-slate-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="text-center">
            <p className="text-sm font-medium text-slate-300 sm:text-base">
              Anda juga bisa menghubungi tim <span className="font-extrabold text-amber-400">IPM MUDA</span> melalui cara di bawah :
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:ipmsmkmuda2024@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-xs font-semibold text-white border border-slate-700 shadow-md transition hover:bg-blue-600"
              >
                <Mail size={14} className="text-amber-400" /> ipmsmkmuda2024@gmail.com
              </a>
              <a
                href="tel:+6283870319730"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-xs font-semibold text-white border border-slate-700 shadow-md transition hover:bg-blue-600"
              >
                <Phone size={14} className="text-amber-400" /> +62 838-7031-9730
              </a>
            </div>
          </div>

          <div className="relative mt-12 overflow-hidden rounded-3xl border border-slate-800 bg-[#0B132B] shadow-2xl">
            <iframe
              title="Lokasi SMK Muhammadiyah 2 Cileungsi"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.8327914844397!2d106.974443!3d-6.4155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69931b268f7633%3A0xb35e16544a4d6f85!2sSMK%20Muhammadiyah%202%20Cileungsi!5e0!3m2!1sid!2sid!4v1710000000000!5m2!1sid!2sid"
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
            <div className="absolute bottom-0 inset-x-0 flex flex-col items-start justify-between gap-4 bg-[#0B132B]/90 p-6 backdrop-blur-md sm:flex-row sm:items-center sm:p-8">
              <div>
                <h4 className="text-base font-bold text-white sm:text-lg">
                  SMK Muhammadiyah 2 Cileungsi
                </h4>
                <p className="mt-1 text-xs text-slate-400">
                  Jl. Akses Desa Dayeuh Cikahuripan No. 97B, Cileungsi Kidul, Kec. Cileungsi, Kab. Bogor, Jawa Barat 16820
                </p>
              </div>
              <a
                href="https://maps.app.goo.gl/6Vi1UVr5ggBv4FzG7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-xs font-bold text-white shadow-lg transition hover:bg-blue-500"
              >
                <MapPin size={16} /> Lihat di Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}