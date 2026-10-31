"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const visible = window.scrollY > 300;
      setIsVisible(visible);
      
      // Kirim event custom agar AiChatWidget tahu status BackToTop
      window.dispatchEvent(
        new CustomEvent("backToTopVisibility", { detail: { isVisible: visible } })
      );
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Kembali ke atas"
      className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl border border-white/20 transition-all duration-300 hover:bg-yellow-400 hover:text-slate-900 hover:scale-110 active:scale-95 cursor-pointer ${
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-10 opacity-0 pointer-events-none"
      }`}
    >
      <ArrowUp size={22} strokeWidth={2.5} />
    </button>
  );
}