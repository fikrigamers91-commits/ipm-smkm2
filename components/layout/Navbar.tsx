'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import {
  ChevronDown,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  Home,
  Info,
  BookOpen,
  Users,
  Grid,
  CalendarDays,
  Images,
  Phone,
  QrCode,
  User,
  LogIn,
  ClipboardList,
  RefreshCw,
  UserCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

// Daftar Bidang Organisasi
const bidangList = [
  { name: "Badan Pengurus Harian (BPH)", href: "/organisasi/bph" },
  { name: "Perkaderan", href: "/organisasi/perkaderan" },
  { name: "Kajian Dakwah Islam (KDI)", href: "/organisasi/kdi" },
  { name: "Pengkajian Ilmu Pengetahuan (PIP)", href: "/organisasi/pip" },
  { name: "Apresiasi Seni Budaya & Olahraga (ASBO)", href: "/organisasi/asbo" },
  { name: "Pengembangan Kreativitas & Kewirausahaan (PKK)", href: "/organisasi/pkk" },
  { name: "Advokasi", href: "/organisasi/advokasi" },
  { name: "Ke-IPMAWATIAN", href: "/organisasi/ipmawati" },
];

// Daftar Menu Lainnya
const lainnyaList = [
  { name: "Daftar Program Kerja", href: "/program-kerja", icon: CalendarDays },
  { name: "Media & Dokumentasi", href: "/media", icon: Images },
  { name: "Hubungi Kontak", href: "/kontak", icon: Phone },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openBidangMobile, setOpenBidangMobile] = useState(false);
  const [openLainnyaMobile, setOpenLainnyaMobile] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Pop-up Hint Presensi (Muncul 10 Detik)
  const [showPresensiHint, setShowPresensiHint] = useState(true);

  // State untuk deteksi scroll
  const [isScrolled, setIsScrolled] = useState(false);

  // Auth State
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Timer 10 Detik Auto-Hide Pop-up Hint Presensi
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPresensiHint(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const supabase = createClient();

    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // OPTIMASI SCROLL: Gunakan requestAnimationFrame agar tidak spam re-render di HP
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 20;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Pengunci Scroll Layar Saat Mobile Menu Terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setActiveDropdown(null);
    setIsOpen(false);
  };

  // Sembunyikan navbar di area admin & login
  if (pathname.startsWith("/admin") || pathname === "/login") return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-0 sm:px-4 pt-0 sm:pt-2 transform-gpu">
      <header
        className={`w-full max-w-7xl bg-white/98 sm:bg-white/95 sm:backdrop-blur-md border-b sm:border border-slate-200/80 transition-all duration-200 transform-gpu ${
          isScrolled
            ? "py-2 sm:rounded-b-3xl sm:rounded-t-2xl shadow-md border-emerald-500/20"
            : "py-3 sm:rounded-b-3xl shadow-xs"
        }`}
      >
        <div className="mx-auto flex items-center justify-between px-4 sm:px-6">
          
          {/* LOGO & BRANDING */}
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2.5 group active:scale-95 transition-transform">
            <div className="relative flex items-center justify-center">
              <Image
                src="/logo/logoipmsmk2.png"
                alt="Logo IPM SMK Muda"
                width={isScrolled ? 28 : 32}
                height={isScrolled ? 28 : 32}
                className="object-contain transition-all duration-200"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className={`font-heading font-extrabold text-slate-900 tracking-wider uppercase leading-none transition-all duration-200 ${
                isScrolled ? "text-xs sm:text-sm" : "text-sm sm:text-base"
              }`}>
                IPM <span className="text-emerald-600">SMK Muda</span>
              </span>
              <span className={`text-slate-500 font-sans tracking-tight font-medium transition-all duration-200 ${
                isScrolled ? "text-[9px]" : "text-[10px] mt-0.5"
              }`}>
                SMK Muhammadiyah 2 Cileungsi
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav aria-label="Navigasi Utama Desktop" className={`hidden md:flex items-center font-semibold text-slate-700 ${
            isScrolled ? "gap-6 text-xs" : "gap-8 text-sm"
          }`}>
            <Link
              href="/"
              className={`py-1 relative transition-colors ${
                pathname === '/' ? 'text-emerald-600 font-bold' : 'hover:text-emerald-600'
              }`}
            >
              Beranda
              {pathname === '/' && (
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-emerald-600 rounded-full" />
              )}
            </Link>

            <Link
              href="/tentang"
              className={`py-1 relative transition-colors ${
                pathname === '/tentang' ? 'text-emerald-600 font-bold' : 'hover:text-emerald-600'
              }`}
            >
              Tentang Kami
              {pathname === '/tentang' && (
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-emerald-600 rounded-full" />
              )}
            </Link>

            {/* DROPDOWN BIDANG DESKTOP */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("bidang")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 py-1 cursor-pointer hover:text-emerald-600 transition-colors uppercase text-xs font-bold tracking-wider">
                <span>Bidang</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === "bidang" ? "rotate-180 text-emerald-600" : "text-slate-500"}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === "bidang" && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.1 }}
                    className="absolute top-full left-0 w-64 rounded-xl bg-white border border-slate-200 p-1.5 shadow-lg text-xs flex flex-col gap-0.5"
                  >
                    {bidangList.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-emerald-600 text-slate-700 font-medium transition"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/muazine"
              className={`py-1 relative transition-colors ${
                pathname === '/muazine' ? 'text-emerald-600 font-bold' : 'hover:text-emerald-600'
              }`}
            >
              Muazine
              {pathname === '/muazine' && (
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-emerald-600 rounded-full" />
              )}
            </Link>

            {/* DROPDOWN LAINNYA DESKTOP */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("lainnya")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 py-1 cursor-pointer hover:text-emerald-600 transition-colors">
                <span>Lainnya</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === "lainnya" ? "rotate-180 text-emerald-600" : "text-slate-500"}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === "lainnya" && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.1 }}
                    className="absolute top-full right-0 w-52 rounded-xl bg-white border border-slate-200 p-1.5 shadow-lg text-xs flex flex-col gap-0.5"
                  >
                    {lainnyaList.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-emerald-600 text-slate-700 font-medium transition flex items-center gap-2"
                      >
                        <item.icon size={14} className="text-slate-400" />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* DESKTOP & MOBILE RIGHT ACTION BUTTONS */}
          <div className="flex items-center gap-2" ref={dropdownRef}>
            
            {/* AKUN DROPDOWN (DESKTOP) */}
            <div className="hidden md:block relative">
              <button
                onClick={() => {
                  setActiveDropdown(activeDropdown === "account" ? null : "account");
                  setShowPresensiHint(false);
                }}
                className={`flex items-center gap-2 p-1.5 px-3 rounded-full border transition cursor-pointer ${
                  user
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className={`flex h-7 w-7 items-center justify-center rounded-full ${
                  user ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-600"
                }`}>
                  {user ? <UserCheck size={14} /> : <User size={14} />}
                </div>
                <span className="text-xs font-bold">
                  {user ? "Akun Pengurus" : "Akun"}
                </span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === "account" ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === "account" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.1 }}
                    className="absolute top-full right-0 mt-2 w-60 rounded-2xl bg-white border border-slate-200 p-2 shadow-xl text-xs flex flex-col gap-1 z-50"
                  >
                    {user ? (
                      /* MENU SAAT SUDAH LOGIN */
                      <>
                        <div className="px-3 py-2 bg-slate-50 rounded-xl mb-1 border border-slate-100">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Terautentikasi</p>
                          <p className="text-xs font-extrabold text-slate-800 truncate">{user.email}</p>
                        </div>

                        <Link
                          href="/admin"
                          onClick={() => setActiveDropdown(null)}
                          className="px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-bold transition flex items-center gap-2.5"
                        >
                          <ShieldCheck size={16} className="text-emerald-600" />
                          <span>Dashboard</span>
                        </Link>

                        <Link
                          href="/presensi"
                          onClick={() => setActiveDropdown(null)}
                          className="px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-bold transition flex items-center gap-2.5"
                        >
                          <QrCode size={16} className="text-blue-600" />
                          <span>Absensi Kegiatan</span>
                        </Link>

                        <Link
                          href="/admin/presensi"
                          onClick={() => setActiveDropdown(null)}
                          className="px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-bold transition flex items-center gap-2.5"
                        >
                          <ClipboardList size={16} className="text-amber-500" />
                          <span>Kelola Absensi</span>
                        </Link>

                        <Link
                          href="/login"
                          onClick={() => setActiveDropdown(null)}
                          className="px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-bold transition flex items-center gap-2.5"
                        >
                          <RefreshCw size={16} className="text-slate-500" />
                          <span>Beralih Akun</span>
                        </Link>

                        <hr className="my-1 border-slate-100" />

                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-rose-50 text-rose-600 font-bold transition flex items-center gap-2.5 cursor-pointer"
                        >
                          <LogOut size={16} />
                          <span>Keluar</span>
                        </button>
                      </>
                    ) : (
                      /* MENU SAAT BELUM LOGIN */
                      <>
                        <Link
                          href="/login"
                          onClick={() => setActiveDropdown(null)}
                          className="px-3 py-2.5 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-bold transition flex items-center gap-2.5"
                        >
                          <LogIn size={16} className="text-emerald-600" />
                          <span>Login Admin</span>
                        </Link>

                        <Link
                          href="/presensi"
                          onClick={() => setActiveDropdown(null)}
                          className="px-3 py-2.5 rounded-xl hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-bold transition flex items-center gap-2.5"
                        >
                          <QrCode size={16} className="text-blue-600" />
                          <span>Absensi Kegiatan</span>
                        </Link>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Hamburger Button Mobile */}
            <button
              onClick={() => {
                setIsOpen(!isOpen);
                setShowPresensiHint(false);
              }}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-slate-50 text-slate-800 md:hidden active:scale-95 transition cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* POP-UP TOOLTIP HINT PRESENSI (10 DETIK AUTO HIDE) */}
        <AnimatePresence>
          {showPresensiHint && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full right-4 sm:right-6 mt-2.5 z-50 w-72 sm:w-80 rounded-2xl bg-slate-900 text-white p-3.5 shadow-xl border border-emerald-500/40 transform-gpu"
            >
              {/* Panah Penunjuk ke Atas */}
              <div className="absolute -top-1.5 right-6 sm:right-12 h-3 w-3 rotate-45 bg-slate-900 border-t border-l border-emerald-500/40" />

              <div className="relative z-10 flex items-start justify-between gap-2.5">
                <div className="flex items-start gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                    <QrCode size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">Petunjuk Akses</p>
                    <p className="text-xs font-medium text-slate-200 leading-snug mt-0.5">
                      Mau cari presensi? Klik ikon <span className="font-bold text-white bg-white/15 px-1.5 py-0.5 rounded-md">Akun</span> lalu pilih <span className="font-bold text-emerald-400">Absensi</span> yaa! ✨
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowPresensiHint(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer shrink-0"
                  aria-label="Tutup petunjuk"
                >
                  <X size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MOBILE MENU DRAWER (Ringan Tanpa Reflow Berat) */}
        {isOpen && (
          <div className="border-t border-slate-100 bg-white px-4 py-3 md:hidden max-h-[82vh] overflow-y-auto mt-2 rounded-b-2xl shadow-xl transform-gpu">
            <div className="flex flex-col gap-1 text-xs font-medium text-slate-800">
              
              {/* CARD AKUN MOBILE */}
              <div className="mb-2 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                {user ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white shrink-0">
                        <UserCheck size={16} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Status: Login</p>
                        <p className="text-xs font-extrabold text-slate-800 truncate">{user.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-200/60">
                      <Link
                        href="/admin"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-emerald-600 text-white font-bold text-[11px]"
                      >
                        <ShieldCheck size={14} />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        href="/presensi"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-blue-600 text-white font-bold text-[11px]"
                      >
                        <QrCode size={14} />
                        <span>Absensi</span>
                      </Link>
                      <Link
                        href="/admin/presensi"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-amber-500 text-white font-bold text-[11px]"
                      >
                        <ClipboardList size={14} />
                        <span>Kelola Absensi</span>
                      </Link>
                      <Link
                        href="/login"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-slate-200 text-slate-800 font-bold text-[11px]"
                      >
                        <RefreshCw size={14} />
                        <span>Beralih</span>
                      </Link>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full mt-1 py-1.5 rounded-xl bg-rose-50 text-rose-600 font-bold border border-rose-200 text-[11px] flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <LogOut size={13} />
                      <span>Keluar Akun</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-slate-500" />
                      <span className="font-bold text-slate-700">Akses Akun & Absensi</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <Link
                        href="/login"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                      >
                        <LogIn size={14} />
                        <span>Login Admin</span>
                      </Link>
                      <Link
                        href="/presensi"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
                      >
                        <QrCode size={14} />
                        <span>Absensi</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigasi Utama */}
              <Link 
                href="/" 
                onClick={() => setIsOpen(false)} 
                className={`flex items-center gap-2.5 py-2.5 px-3 rounded-xl transition ${
                  pathname === '/' ? 'bg-emerald-50/80 font-bold text-emerald-700 border border-emerald-100' : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Home size={16} className={pathname === '/' ? 'text-emerald-600' : 'text-slate-400'} />
                <span>Beranda</span>
              </Link>

              <Link 
                href="/tentang" 
                onClick={() => setIsOpen(false)} 
                className={`flex items-center gap-2.5 py-2.5 px-3 rounded-xl transition ${
                  pathname === '/tentang' ? 'bg-emerald-50/80 font-bold text-emerald-700 border border-emerald-100' : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Info size={16} className={pathname === '/tentang' ? 'text-emerald-600' : 'text-slate-400'} />
                <span>Tentang Kami</span>
              </Link>

              {/* Accordion Struktur Bidang */}
              <div className="rounded-xl border border-slate-200/80 overflow-hidden my-0.5 bg-slate-50/40">
                <button
                  onClick={() => setOpenBidangMobile(!openBidangMobile)}
                  className="flex w-full items-center justify-between py-2.5 px-3 text-slate-800 font-bold text-xs uppercase tracking-wider bg-slate-50 cursor-pointer"
                >
                  <div className="flex items-center gap-2 text-emerald-700">
                    <Users size={15} />
                    <span>Struktur Bidang</span>
                  </div>
                  <ChevronDown size={14} className={`transition-transform duration-200 text-slate-500 ${openBidangMobile ? "rotate-180" : ""}`} />
                </button>

                {openBidangMobile && (
                  <div className="flex flex-col gap-0.5 p-1.5 bg-white border-t border-slate-200/60">
                    {bidangList.map((item) => (
                      <Link 
                        key={item.href} 
                        href={item.href} 
                        onClick={() => setIsOpen(false)} 
                        className={`py-2 px-2.5 rounded-lg font-medium transition ${
                          pathname === item.href ? 'bg-emerald-50 font-bold text-emerald-700' : 'text-slate-600 hover:bg-slate-50 hover:text-emerald-600'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link 
                href="/muazine" 
                onClick={() => setIsOpen(false)} 
                className={`flex items-center gap-2.5 py-2.5 px-3 rounded-xl transition ${
                  pathname === '/muazine' ? 'bg-emerald-50/80 font-bold text-emerald-700 border border-emerald-100' : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <BookOpen size={16} className={pathname === '/muazine' ? 'text-emerald-600' : 'text-slate-400'} />
                <span>Muazine (Buletin)</span>
              </Link>

              {/* Accordion Menu Lainnya */}
              <div className="rounded-xl border border-slate-200/80 overflow-hidden my-0.5 bg-slate-50/40">
                <button
                  onClick={() => setOpenLainnyaMobile(!openLainnyaMobile)}
                  className="flex w-full items-center justify-between py-2.5 px-3 text-slate-800 font-bold text-xs uppercase tracking-wider bg-slate-50 cursor-pointer"
                >
                  <div className="flex items-center gap-2 text-slate-700">
                    <Grid size={15} />
                    <span>Menu Lainnya</span>
                  </div>
                  <ChevronDown size={14} className={`transition-transform duration-200 text-slate-500 ${openLainnyaMobile ? "rotate-180" : ""}`} />
                </button>

                {openLainnyaMobile && (
                  <div className="flex flex-col gap-0.5 p-1.5 bg-white border-t border-slate-200/60">
                    {lainnyaList.map((item) => {
                      const IconComp = item.icon;
                      return (
                        <Link 
                          key={item.href} 
                          href={item.href} 
                          onClick={() => setIsOpen(false)} 
                          className={`flex items-center gap-2 py-2 px-2.5 rounded-lg font-medium transition ${
                            pathname === item.href ? 'bg-emerald-50 font-bold text-emerald-700' : 'text-slate-600 hover:bg-slate-50 hover:text-emerald-600'
                          }`}
                        >
                          <IconComp size={14} className="text-slate-400 shrink-0" />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}
      </header>
    </div>
  );
}