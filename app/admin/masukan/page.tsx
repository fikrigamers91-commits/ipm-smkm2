'use client';

import Link from 'next/link';
import { 
  ArrowLeft, 
  MessageSquare, 
  ExternalLink, 
  RefreshCw,
  FileSpreadsheet,
  Info
} from 'lucide-react';
import { useState } from 'react';

// URL Google Sheets resmi untuk tampilan Admin Iframe
const GOOGLE_SHEETS_VIEW_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_VIEW_URL || "";

const getEmbedUrl = (url: string) => {
  if (!url) return "";
  // Mengubah URL Google Sheets standar menjadi format preview iframe
  if (url.includes("docs.google.com/spreadsheets")) {
    return url.replace(/\/edit.*$/, "/htmlview");
  }
  return url;
};

export default function AdminMasukanPage() {
  const [iframeKey, setIframeKey] = useState(0);

  const handleRefresh = () => {
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* HEADER */}
      <div className="bg-ipm-blue text-white py-6 px-4 sm:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Link 
              href="/admin" 
              className="inline-flex items-center gap-2 text-sm text-blue-100 hover:text-white mb-2 transition"
            >
              <ArrowLeft className="w-4 h-4" /> Kembali ke Dashboard Admin
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold font-montserrat">Kritik, Saran & Masukan</h1>
                <p className="text-blue-100 text-sm mt-0.5">
                  Rekapitulasi pesan publik dari form Kontak & Masukan
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={handleRefresh}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2.5 rounded-xl transition border border-white/20 font-medium"
            >
              <RefreshCw className="w-4 h-4" /> Reload Embed
            </button>
            
            {GOOGLE_SHEETS_VIEW_URL && (
              <a
                href={GOOGLE_SHEETS_VIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ipm-green hover:bg-emerald-600 text-white text-sm px-4 py-2.5 rounded-xl transition font-bold shadow-sm"
              >
                <FileSpreadsheet className="w-4 h-4" /> Buka Google Sheets
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-8">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-6 flex items-start gap-4 text-sm text-slate-700">
          <Info className="w-5 h-5 text-ipm-blue shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-ipm-blue">Penyimpanan Data Terpusat di Google Sheets</p>
            <p className="mt-1 text-slate-600 leading-relaxed">
              Seluruh masukan dari form publik otomatis tersimpan secara real-time di Google Sheets resmi organisasi.
            </p>
          </div>
        </div>

        {/* GOOGLE SHEETS EMBED */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-150 flex flex-col">
          <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between bg-slate-50/50">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Live Spreadsheet View
            </span>
            <span className="text-xs text-slate-400">
              Otomatis terbarui saat form dikirim
            </span>
          </div>

          {GOOGLE_SHEETS_VIEW_URL ? (
            <iframe
              key={iframeKey}
              src={getEmbedUrl(GOOGLE_SHEETS_VIEW_URL)}
              className="w-full flex-1 min-h-145 border-none"
              title="Data Masukan Google Sheets"
            />
          ) : (
            <div className="flex-1 py-24 px-6 text-center text-slate-500 flex flex-col items-center justify-center">
              <FileSpreadsheet className="w-12 h-12 text-slate-300 mb-4" />
              <p className="text-base font-bold text-slate-700">URL Google Sheet Belum Dikonfigurasi</p>
              <p className="text-xs text-slate-400 max-w-md mt-1">
                Tambahkan variabel <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">NEXT_PUBLIC_GOOGLE_SHEETS_VIEW_URL</code> ke file <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">.env.local</code>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}