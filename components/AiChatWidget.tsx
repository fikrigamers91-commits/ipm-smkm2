"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);
  const [input, setInput] = useState("");
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Halo! Saya Asisten AI-PMuda 🤖. Ada yang bisa saya bantu terkait program kerja, surat organisasi, atau materi rapat hari ini? Katakan padaku ya!",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-hide Pop-up Sapaan dalam 5 Detik
  useEffect(() => {
    if (showGreeting) {
      const timer = setTimeout(() => {
        setShowGreeting(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showGreeting]);

  // Mendengarkan status kemunculan BackToTop via Custom Event
  useEffect(() => {
    const handleBackToTopEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsBackToTopVisible(customEvent.detail.isVisible);
    };

    window.addEventListener("backToTopVisibility", handleBackToTopEvent);
    return () => {
      window.removeEventListener("backToTopVisibility", handleBackToTopEvent);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Maaf banget nih, server sedang gangguan...😭🙏" },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Ups... Koneksi internet kamu gaada nih, dicek dulu ya!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed right-4 sm:right-6 z-50 font-sans transition-all duration-300 ${
        isBackToTopVisible ? "bottom-21 sm:bottom-22" : "bottom-6"
      }`}
    >
      {/* POP-UP SAPAAN KECIL (AUTO HIDE 5 DETIK) */}
      <AnimatePresence>
        {!isOpen && showGreeting && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute bottom-16 right-0 mb-2 w-64 sm:w-72 rounded-3xl bg-slate-950/90 p-4 text-white shadow-2xl backdrop-blur-xl border border-white/10"
          >
            <div className="flex items-start justify-between gap-2.5">
              <div className="space-y-1.5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-blue-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                  AI-PMuda
                </span>
                <p className="text-xs font-semibold text-slate-200 leading-snug">
                  Masih bingung soal ke-IPM-an? Tanya AI-PMuda yuk! 👋
                </p>
              </div>
              <button
                onClick={() => setShowGreeting(false)}
                className="text-slate-400 hover:text-white transition p-1 rounded-full hover:bg-white/10 cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>
            {/* Panah Ekor Bubble */}
            <div className="absolute -bottom-1.5 right-5 sm:right-7 h-3 w-3 rotate-45 bg-slate-950 border-r border-b border-white/10" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOMBOL PELAYANG (RESPONSIF MOBILE: IKON SAJA) */}
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(true);
            setShowGreeting(false);
          }}
          className="group relative flex items-center justify-center rounded-full bg-linear-to-r from-[#005BAC] via-blue-600 to-[#00A651] p-0.5 shadow-2xl transition cursor-pointer"
        >
          <div className="flex items-center gap-2.5 rounded-full bg-slate-950 p-3 sm:px-4 sm:py-3.5 text-white transition group-hover:bg-slate-900">
            <div className="relative">
              <Bot size={22} className="text-blue-400 animate-bounce" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
            </div>
            <span className="hidden sm:inline text-xs font-extrabold tracking-wide">
              Tanya AI-PMuda
            </span>
          </div>
        </motion.button>
      )}

      {/* KOTAK JENDELA CHAT MODAL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex flex-col w-[92vw] sm:w-96 h-135 rounded-3xl bg-white shadow-2xl border border-slate-200/80 overflow-hidden"
          >
            {/* HEADER */}
            <div className="relative bg-slate-950 px-5 py-4 text-white flex items-center justify-between border-b border-white/10">
              <div className="absolute -left-8 top-0 h-32 w-32 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />
              
              <div className="flex items-center gap-3 relative z-10">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-linear-to-tr from-[#005BAC] to-[#00A651] text-white shadow-md">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="text-xs font-black tracking-tight">Asisten AI-PMuda</h3>
                  <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1.5 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Aktif & Siap Membantu
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="relative z-10 text-slate-400 hover:text-white transition p-1.5 rounded-full hover:bg-white/10 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* CHAT MESSAGES CONTAINER */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/70">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed font-medium shadow-2xs whitespace-pre-line ${
                      m.role === "user"
                        ? "bg-blue-600 text-white rounded-br-xs"
                        : "bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {/* LOADING TYPING INDICATOR */}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl bg-white border border-slate-200/80 px-4 py-3 shadow-2xs">
                    <span className="h-2 w-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 rounded-full bg-blue-600 animate-bounce" />
                    <span className="text-[11px] font-semibold text-slate-400 ml-1">Tunggu bentar yaa!</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* INPUT FORM */}
            <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
              <input
                type="text"
                placeholder="Tulis pertanyaan kamu disini!"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-xs font-medium text-slate-900 outline-none focus:border-blue-600 focus:bg-white transition"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="inline-flex items-center justify-center rounded-2xl bg-blue-600 hover:bg-blue-700 px-4 py-3 text-white transition disabled:opacity-40 cursor-pointer shadow-md shadow-blue-600/20"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}