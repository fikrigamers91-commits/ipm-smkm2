"use client";

import { FormEvent, useState } from "react";
import { Eye, EyeOff, LockKeyhole, LogIn, ArrowLeft, CheckCircle2, AlertCircle, X } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Toast Notification
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

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (loginError) {
      const msg = loginError.message.includes("Invalid login credentials")
        ? "Email atau kata sandi tidak cocok."
        : loginError.message;
      setError(msg);
      showToast("error", msg);
      setLoading(false);
      return;
    }

    if (data?.session) {
      showToast("success", "Login berhasil! Mengalihkan ke portal...");
      setTimeout(() => {
        window.location.href = "/admin";
      }, 800);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-6 py-12 text-slate-900 font-sans">
      
      {/* POP-UP TOAST NOTIFICATION */}
      {toast.show && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
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

      {/* Background Glow Soft */}
      <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Back Link */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition"
        >
          <ArrowLeft size={16} />
          Kembali ke Website Utama
        </Link>

        {/* Card Login */}
        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl sm:p-9">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
              <LockKeyhole size={28} />
            </div>

            <h1 className="mt-5 text-2xl font-black text-slate-900 tracking-tight">
              Login Pengurus
            </h1>

            <p className="mx-auto mt-2 max-w-sm text-xs text-slate-500 font-medium">
              Akses khusus Portal Admin PR IPM SMK Muda
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            {/* Email */}
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ipmsmkmuda.or.id"
                autoComplete="email"
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-xs font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10"
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">
                  Password
                </label>

                <button
                  type="button"
                  onClick={() => alert("Silakan hubungi Sekretaris Umum untuk mereset kata sandi admin.")}
                  className="text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer"
                >
                  Lupa password?
                </button>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 pr-12 text-xs font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error Inline Message */}
            {error && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3.5 text-xs font-semibold text-rose-600">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3.5 text-xs font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 cursor-pointer disabled:opacity-60"
            >
              <LogIn size={16} />
              {loading ? "Memproses Autentifikasi..." : "Masuk ke Portal Admin"}
            </button>
          </form>
        </div>

        <p className="mt-5 text-center text-[10px] text-slate-400 font-medium">
          PR IPM SMK Muhammadiyah 2 Cileungsi
        </p>
      </div>
    </main>
  );
}