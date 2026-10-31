'use client';

import { useState } from "react";
import { Share2, Copy, Check, MessageCircle, Send } from "lucide-react";

export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  // 1. Native Share (HP Menu Bawaan)
  const handleNativeShare = async () => {
    const shareData = {
      title: title,
      text: `Baca artikel "${title}" di Website Resmi PR IPM SMK Muda Cileungsi:`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Share dibatalkan:", err);
      }
    } else {
      handleCopyLink();
    }
  };

  // 2. Direct Share WhatsApp
  const handleShareWA = () => {
    const url = window.location.href;
    const text = `Baca artikel "${title}" di Website Resmi PR IPM SMK Muda Cileungsi:\n${url}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  // 3. Direct Share Telegram
  const handleShareTelegram = () => {
    const url = window.location.href;
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, "_blank");
  };

  // 4. Direct Share Facebook
  const handleShareFB = () => {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
  };

  // 5. Direct Share X (Twitter)
  const handleShareTwitter = () => {
    const url = window.location.href;
    const text = `Baca "${title}" via PR IPM SMK Muda:`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank");
  };

  // 6. Copy Link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-b border-slate-100 py-6">
      <span className="text-sm font-bold text-slate-700">
        Bagikan Artikel Ini:
      </span>

      <div className="flex flex-wrap items-center gap-2.5">
        {/* WhatsApp */}
        <button
          onClick={handleShareWA}
          title="Bagikan ke WhatsApp"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm transition hover:scale-110 hover:bg-[#20ba5a]"
        >
          <MessageCircle size={18} />
        </button>

        {/* Telegram */}
        <button
          onClick={handleShareTelegram}
          title="Bagikan ke Telegram"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0088cc] text-white shadow-sm transition hover:scale-110 hover:bg-[#0077b5]"
        >
          <Send size={18} />
        </button>

        {/* X (Twitter) - SVG INLINE */}
        <button
          onClick={handleShareTwitter}
          title="Bagikan ke X / Twitter"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white shadow-sm transition hover:scale-110 hover:bg-slate-800"
        >
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>

        {/* Facebook - SVG INLINE */}
        <button
          onClick={handleShareFB}
          title="Bagikan ke Facebook"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-sm transition hover:scale-110 hover:bg-[#1565c0]"
        >
          <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </button>

        {/* Native Share / Medsos Lainnya */}
        <button
          onClick={handleNativeShare}
          title="Opsi Berbagi Lainnya"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-ipm-blue text-white shadow-sm transition hover:scale-110 hover:bg-blue-700"
        >
          <Share2 size={18} />
        </button>

        {/* Salin Link */}
        <button
          onClick={handleCopyLink}
          title="Salin Tautan Artikel"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-700 shadow-sm transition hover:scale-110 hover:bg-slate-200"
        >
          {copied ? <Check size={18} className="text-emerald-600" /> : <Copy size={17} />}
        </button>
      </div>
    </div>
  );
}