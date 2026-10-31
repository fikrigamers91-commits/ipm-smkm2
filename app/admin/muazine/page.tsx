'use client';

import { useEffect, useState, ChangeEvent, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Eye,
  FileText,
  ImagePlus,
  Pencil,
  Plus,
  Save,
  Trash2,
  X,
  Quote,
  Heading2,
  Heading3,
  Info,
  Minus,
  Upload,
  Loader2,
  ChevronUp,
  ChevronDown,
  Tag,
  Search,
  Copy,
  Clock,
  BookOpen,
  CheckCircle2,
  FileEdit,
  Sparkles,
} from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";

type StatusMuazine = "draft" | "terbit";

type Muazine = {
  id: string;
  judul: string;
  slug: string;
  penulis: string;
  kategori?: string;
  isi: string;
  gambar: string | null;
  status: StatusMuazine;
  created_at: string;
};

type Block =
  | { type: "paragraph"; content: string }
  | { type: "h2"; content: string }
  | { type: "h3"; content: string }
  | { type: "quote"; content: string }
  | { type: "info"; content: string }
  | { type: "divider"; content: "" }
  | { type: "image"; src: string; caption: string; source: string };

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function buatSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function parseIsi(isi: string): Block[] {
  if (!isi.trim()) return [];

  return isi.split("\n\n").map((item) => {
    if (item.startsWith("# ")) return { type: "h2", content: item.replace("# ", "") };
    if (item.startsWith("## ")) return { type: "h3", content: item.replace("## ", "") };
    if (item.startsWith("> ")) return { type: "quote", content: item.replace("> ", "") };
    if (item.startsWith("! ")) return { type: "info", content: item.replace("! ", "") };
    if (item === "---") return { type: "divider", content: "" };
    if (item.startsWith("![")) {
      const caption = item.match(/\[(.*?)\]/)?.[1] ?? "";
      const src = item.match(/\((.*?)\|/)?.[1] ?? "";
      const source = item.match(/\|(.*?)\)/)?.[1] ?? "";
      return { type: "image", src, caption, source };
    }
    return { type: "paragraph", content: item };
  });
}

function blocksToIsi(blocks: Block[]) {
  return blocks
    .map((block) => {
      switch (block.type) {
        case "h2": return `# ${block.content}`;
        case "h3": return `## ${block.content}`;
        case "quote": return `> ${block.content}`;
        case "info": return `! ${block.content}`;
        case "divider": return "---";
        case "image": return `![${block.caption}](${block.src}|${block.source})`;
        default: return block.content;
      }
    })
    .join("\n\n");
}

export default function AdminMuazinePage() {
  const [data, setData] = useState<Muazine[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [judul, setJudul] = useState("");
  const [penulis, setPenulis] = useState("");
  const [kategori, setKategori] = useState("Berita");
  const [cover, setCover] = useState("");
  const [uploadingCover, setUploadingCover] = useState(false);
  const [blocks, setBlocks] = useState<Block[]>([{ type: "paragraph", content: "" }]);

  const [status, setStatus] = useState<StatusMuazine>("draft");
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterKategori, setFilterKategori] = useState("semua");

  const [imageModal, setImageModal] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [imageCaption, setImageCaption] = useState("");
  const [imageSource, setImageSource] = useState("");
  const [uploadingInline, setUploadingInline] = useState(false);

  async function loadData() {
    const { data, error } = await supabase
      .from("muazine")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Gagal memuat data:", error);
      setLoading(false);
      return;
    }
    setData(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    let isMounted = true;

    async function initData() {
      const { data, error } = await supabase
        .from("muazine")
        .select("*")
        .order("created_at", { ascending: false });

      if (!isMounted) return;

      if (error) {
        console.error("Gagal memuat data:", error);
      } else {
        setData(data ?? []);
      }
      setLoading(false);
    }

    initData();

    return () => {
      isMounted = false;
    };
  }, []);

  const totalWords = useMemo(() => {
    const fullText = blocks
      .map((b) => ("content" in b ? b.content : ""))
      .join(" ");
    return fullText.trim() ? fullText.trim().split(/\s+/).length : 0;
  }, [blocks]);

  const readingTime = useMemo(() => {
    return Math.max(1, Math.ceil(totalWords / 200));
  }, [totalWords]);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchSearch =
        item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.penulis.toLowerCase().includes(searchQuery.toLowerCase());
      const matchKategori =
        filterKategori === "semua" || (item.kategori || "Berita") === filterKategori;
      return matchSearch && matchKategori;
    });
  }, [data, searchQuery, filterKategori]);

  const stats = useMemo(() => {
    const total = data.length;
    const terbit = data.filter((d) => d.status === "terbit").length;
    const draft = data.filter((d) => d.status === "draft").length;
    return { total, terbit, draft };
  }, [data]);

  async function uploadFileToSupabase(file: File): Promise<string | null> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `artikel/${fileName}`;

      const { error } = await supabase.storage
        .from('muazine')
        .upload(filePath, file);

      if (error) {
        alert(`Gagal upload gambar: ${error.message}`);
        return null;
      }

      const { data: publicUrlData } = supabase.storage
        .from('muazine')
        .getPublicUrl(filePath);

      return publicUrlData.publicUrl;
    } catch {
      alert("Terjadi kesalahan saat upload gambar.");
      return null;
    }
  }

  const handleCoverUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploadingCover(true);
    const publicUrl = await uploadFileToSupabase(file);
    if (publicUrl) {
      setCover(publicUrl);
    }
    setUploadingCover(false);
  };

  const handleInlineImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploadingInline(true);
    const publicUrl = await uploadFileToSupabase(file);
    if (publicUrl) {
      setImageSrc(publicUrl);
    }
    setUploadingInline(false);
  };

  function resetForm() {
    setJudul("");
    setPenulis("");
    setKategori("Berita");
    setCover("");
    setBlocks([{ type: "paragraph", content: "" }]);
    setStatus("draft");
    setEditingId(null);
    setPreview(false);
    setImageModal(false);
    setImageSrc("");
    setImageCaption("");
    setImageSource("");
  }

  function openCreate() {
    resetForm();
    setShowForm(true);
  }

  function openEdit(item: Muazine) {
    setEditingId(item.id);
    setJudul(item.judul);
    setPenulis(item.penulis);
    setKategori(item.kategori || "Berita");
    setCover(item.gambar ?? "");
    setBlocks(parseIsi(item.isi));
    setStatus(item.status);
    setPreview(false);
    setShowForm(true);
  }

  function duplicateMuazine(item: Muazine) {
    setEditingId(null);
    setJudul(`${item.judul} (Salinan)`);
    setPenulis(item.penulis);
    setKategori(item.kategori || "Berita");
    setCover(item.gambar ?? "");
    setBlocks(parseIsi(item.isi));
    setStatus("draft");
    setPreview(false);
    setShowForm(true);
  }

  function updateBlock(index: number, content: string) {
    setBlocks((current) =>
      current.map((block, i): Block => {
        if (i !== index || block.type === "divider") return block;
        return { ...block, content } as Block;
      })
    );
  }

  function addParagraph() {
    setBlocks((current) => [...current, { type: "paragraph", content: "" }]);
  }

  function addHeading(type: "h2" | "h3") {
    setBlocks((current) => [...current, { type, content: "" }]);
  }

  function addQuote() {
    setBlocks((current) => [...current, { type: "quote", content: "" }]);
  }

  function addInfo() {
    setBlocks((current) => [...current, { type: "info", content: "" }]);
  }

  function addDivider() {
    setBlocks((current) => [...current, { type: "divider", content: "" }]);
  }

  function openImageModal() {
    setImageSrc("");
    setImageCaption("");
    setImageSource("");
    setImageModal(true);
  }

  function addImage() {
    if (!imageSrc || !imageCaption) {
      alert("Gambar dan keterangan wajib diisi.");
      return;
    }

    setBlocks((current) => [
      ...current,
      {
        type: "image",
        src: imageSrc,
        caption: imageCaption,
        source: imageSource || "Dokumentasi PR IPM",
      },
    ]);
    setImageModal(false);
  }

  function removeBlock(index: number) {
    setBlocks((current) => current.filter((_, i) => i !== index));
  }

  function moveBlock(index: number, direction: "up" | "down") {
    setBlocks((current) => {
      const newBlocks = [...current];
      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= newBlocks.length) return current;

      const temp = newBlocks[index];
      newBlocks[index] = newBlocks[targetIndex];
      newBlocks[targetIndex] = temp;

      return newBlocks;
    });
  }

  async function handleSave() {
    if (!judul.trim() || !penulis.trim()) {
      alert("Judul dan penulis wajib diisi.");
      return;
    }

    const isi = blocksToIsi(blocks);

    if (!isi.trim()) {
      alert("Isi Muazine belum diisi.");
      return;
    }

    setSaving(true);

    const payload = {
      judul,
      slug: buatSlug(judul),
      penulis,
      kategori,
      isi,
      gambar: cover.trim() || null,
      status,
      updated_at: new Date().toISOString(),
    };

    let error;

    if (editingId) {
      const result = await supabase.from("muazine").update(payload).eq("id", editingId);
      error = result.error;
    } else {
      const result = await supabase.from("muazine").insert(payload);
      error = result.error;
    }

    if (error) {
      alert(error.message);
      setSaving(false);
      return;
    }

    await loadData();
    setSaving(false);
    setShowForm(false);
    resetForm();
  }

  async function handleDelete(id: string) {
    const yakin = confirm("Yakin ingin menghapus Muazine ini?");
    if (!yakin) return;

    const { error } = await supabase.from("muazine").delete().eq("id", id);
    if (error) {
      alert(error.message);
      return;
    }
    loadData();
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* HEADER BAR */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/admin"
              className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ipm-blue hover:underline"
            >
              <ArrowLeft size={14} />
              Kembali ke Dashboard
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100/80 text-ipm-blue shadow-xs">
                <FileText size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-black text-slate-900 sm:text-3xl">
                  Muazine & Artikel
                </h1>
                <p className="text-xs font-medium text-slate-500 sm:text-sm">
                  Kelola dan publikasikan seluruh konten artikel website.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={openCreate}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-ipm-blue px-5 py-3.5 text-xs font-bold text-white shadow-lg transition hover:bg-blue-700 hover:shadow-xl cursor-pointer"
          >
            <Plus size={18} />
            Tambah Muazine Baru
          </button>
        </div>

        {/* STATS OVERVIEW CARDS */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Artikel</p>
              <p className="mt-1 text-2xl font-black text-slate-900">{stats.total}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <BookOpen size={20} />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Artikel Terbit</p>
              <p className="mt-1 text-2xl font-black text-emerald-600">{stats.terbit}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={20} />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Draf Disimpan</p>
              <p className="mt-1 text-2xl font-black text-amber-600">{stats.draft}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <FileEdit size={20} />
            </div>
          </div>
        </div>

        {/* LIST & FILTER SECTION */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs">
          {/* CONTROL BAR */}
          <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <span>Daftar Muazine</span>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600">
                {filteredData.length}
              </span>
            </h2>

            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
              {/* SEARCH INPUT */}
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari judul atau penulis..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2 text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-ipm-blue sm:w-60"
                />
              </div>

              {/* FILTER KATEGORI */}
              <select
                value={filterKategori}
                onChange={(e) => setFilterKategori(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-ipm-blue cursor-pointer"
              >
                <option value="semua">Semua Kategori</option>
                <option value="Berita">Berita</option>
                <option value="Pengumuman">Pengumuman</option>
                <option value="Prestasi">Prestasi</option>
                <option value="Opini">Opini</option>
                <option value="Edukasi">Edukasi</option>
                <option value="Dokumentasi">Dokumentasi</option>
              </select>
            </div>
          </div>

          {/* LIST ITEMS */}
          {loading ? (
            <div className="flex items-center justify-center p-12 text-xs font-semibold text-slate-500 gap-2">
              <Loader2 className="animate-spin text-ipm-blue" size={18} />
              <span>Memuat data Muazine...</span>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="p-12 text-center">
              <FileText size={40} className="mx-auto text-slate-300" />
              <p className="mt-3 text-sm font-bold text-slate-700">Tidak ada Muazine ditemukan.</p>
              <p className="mt-1 text-xs text-slate-400">Coba ubah kata kunci pencarian atau buat artikel baru.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredData.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 p-5 transition hover:bg-slate-50/80 md:flex-row md:items-center md:justify-between"
                >
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900 truncate max-w-xl">{item.judul}</h3>
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-ipm-blue">
                        <Tag size={10} />
                        {item.kategori || "Berita"}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${
                          item.status === "terbit"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {item.status === "terbit" ? "Terbit" : "Draft"}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-500">
                      Penulis: <span className="font-semibold text-slate-700">{item.penulis}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.status === "terbit" && (
                      <Link
                        href={`/muazine/${item.slug}`}
                        target="_blank"
                        title="Lihat Artikel"
                        className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                      >
                        <Eye size={16} />
                      </Link>
                    )}
                    <button
                      onClick={() => duplicateMuazine(item)}
                      title="Duplikasi Artikel"
                      className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
                    >
                      <Copy size={16} />
                    </button>
                    <button
                      onClick={() => openEdit(item)}
                      title="Edit Artikel"
                      className="rounded-xl border border-slate-200 bg-white p-2.5 text-ipm-blue transition hover:bg-blue-50 cursor-pointer"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      title="Hapus Artikel"
                      className="rounded-xl border border-red-100 bg-white p-2.5 text-red-500 transition hover:bg-red-50 cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            {/* MODAL HEADER */}
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4.5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ipm-blue/10 text-ipm-blue">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h2 className="text-base font-black text-slate-900">
                    {editingId ? "Edit Muazine" : "Tambah Muazine Baru"}
                  </h2>
                  <p className="text-xs font-medium text-slate-500">
                    Kelola struktur paragraf dan elemen media artikel.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-3 text-xs font-semibold text-slate-500 border-r border-slate-200 pr-4">
                  <span className="flex items-center gap-1">
                    <Clock size={13} className="text-slate-400" />
                    ~{readingTime} min baca
                  </span>
                  <span>•</span>
                  <span>{totalWords} kata</span>
                </div>

                <button
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-6">
              {!preview ? (
                <div className="space-y-6">
                  {/* JUDUL & PENULIS */}
                  <div className="grid gap-5 md:grid-cols-3">
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Judul Artikel
                      </label>
                      <input
                        type="text"
                        value={judul}
                        onChange={(e) => setJudul(e.target.value)}
                        placeholder="Masukkan judul Muazine yang menarik..."
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 placeholder:text-slate-400 outline-none focus:border-ipm-blue focus:ring-2 focus:ring-ipm-blue/10"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Penulis / Redaksi
                      </label>
                      <input
                        type="text"
                        value={penulis}
                        onChange={(e) => setPenulis(e.target.value)}
                        placeholder="Nama penulis"
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 placeholder:text-slate-400 outline-none focus:border-ipm-blue focus:ring-2 focus:ring-ipm-blue/10"
                      />
                    </div>
                  </div>

                  {/* KATEGORI */}
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Kategori / Badge Artikel
                    </label>
                    <select
                      value={kategori}
                      onChange={(e) => setKategori(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-ipm-blue focus:ring-2 focus:ring-ipm-blue/10 cursor-pointer"
                    >
                      <optgroup label="Berita Utama">
                        <option value="Berita">Berita</option>
                        <option value="Pengumuman">Pengumuman</option>
                        <option value="Prestasi">Prestasi</option>
                      </optgroup>
                      <optgroup label="Karya Tulis & Gagasan">
                        <option value="Opini">Opini</option>
                        <option value="Edukasi">Edukasi</option>
                        <option value="Dokumentasi">Dokumentasi</option>
                      </optgroup>
                    </select>
                  </div>

                  {/* COVER UPLOAD */}
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Cover Muazine
                    </label>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-xs font-bold text-slate-700 hover:bg-slate-100 transition">
                        {uploadingCover ? <Loader2 className="animate-spin text-ipm-blue" size={16} /> : <Upload size={16} />}
                        {uploadingCover ? "Mengunggah..." : "Pilih Gambar Dari Perangkat"}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleCoverUpload}
                          disabled={uploadingCover}
                          className="hidden"
                        />
                      </label>
                      <input
                        type="text"
                        value={cover}
                        onChange={(e) => setCover(e.target.value)}
                        placeholder="Atau tempelkan URL Gambar di sini..."
                        className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-ipm-blue"
                      />
                    </div>
                    {Boolean(cover?.trim()) && (
                      <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 max-h-48">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={cover} alt="Cover Preview" className="h-48 w-full object-cover" />
                      </div>
                    )}
                  </div>

                  {/* TOOLBAR EDITOR */}
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Isi & Blok Artikel
                      </label>
                      <span className="text-xs font-semibold text-slate-400">
                        {blocks.length} Blok Ditambahkan
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2.5">
                      <button type="button" onClick={addParagraph} className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-100 cursor-pointer">
                        <FileText size={14} /> Paragraf
                      </button>
                      <button type="button" onClick={() => addHeading("h2")} className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-100 cursor-pointer">
                        <Heading2 size={14} /> Heading
                      </button>
                      <button type="button" onClick={() => addHeading("h3")} className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-100 cursor-pointer">
                        <Heading3 size={14} /> Sub Heading
                      </button>
                      <button type="button" onClick={openImageModal} className="inline-flex items-center gap-1.5 rounded-xl bg-ipm-blue px-3 py-2 text-xs font-bold text-white shadow-2xs hover:bg-blue-700 cursor-pointer">
                        <ImagePlus size={14} /> Tambah Gambar
                      </button>
                      <button type="button" onClick={addQuote} className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-100 cursor-pointer">
                        <Quote size={14} /> Quote
                      </button>
                      <button type="button" onClick={addInfo} className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-100 cursor-pointer">
                        <Info size={14} /> Info Box
                      </button>
                      <button type="button" onClick={addDivider} className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-100 cursor-pointer">
                        <Minus size={14} /> Pembatas
                      </button>
                    </div>

                    {/* BLOK EDITOR CONTAINER */}
                    <div className="mt-4 space-y-3.5">
                      {blocks.map((block, index) => (
                        <div key={index} className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs">
                          <div className="mb-2.5 flex items-center justify-between">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                              Blok #{index + 1} — {block.type}
                            </span>
                            
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                disabled={index === 0}
                                onClick={() => moveBlock(index, "up")}
                                title="Geser ke Atas"
                                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-20 cursor-pointer"
                              >
                                <ChevronUp size={16} />
                              </button>
                              <button
                                type="button"
                                disabled={index === blocks.length - 1}
                                onClick={() => moveBlock(index, "down")}
                                title="Geser ke Bawah"
                                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-20 cursor-pointer"
                              >
                                <ChevronDown size={16} />
                              </button>
                              <button
                                type="button"
                                onClick={() => removeBlock(index)}
                                title="Hapus Blok"
                                className="ml-1 rounded-lg p-1 text-red-400 hover:bg-red-50 hover:text-red-600 cursor-pointer"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </div>

                          {block.type === "image" ? (
                            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                              {Boolean(block.src?.trim()) && (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img src={block.src} alt={block.caption} className="mb-3 max-h-52 w-full rounded-xl object-cover" />
                              )}
                              <p className="text-xs font-bold text-slate-800">{block.caption}</p>
                              <p className="mt-0.5 text-[11px] text-slate-400">Sumber: {block.source}</p>
                            </div>
                          ) : block.type === "divider" ? (
                            <hr className="my-2 border-slate-200" />
                          ) : (
                            <textarea
                              value={block.content}
                              onChange={(e) => updateBlock(index, e.target.value)}
                              rows={block.type === "paragraph" ? 4 : 2}
                              placeholder={`Ketik isi ${block.type}...`}
                              className="w-full resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-ipm-blue focus:ring-1 focus:ring-ipm-blue/20"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* STATUS SELECT */}
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Status Publikasi
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as StatusMuazine)}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-slate-900 outline-none focus:border-ipm-blue cursor-pointer"
                    >
                      <option value="draft">Draft — belum ditampilkan di publik</option>
                      <option value="terbit">Terbit — langsung tampil di website</option>
                    </select>
                  </div>

                  {/* FOOTER ACTIONS */}
                  <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                    <button
                      onClick={() => setPreview(true)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      <Eye size={16} /> Pratinjau Tampilan
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-ipm-blue px-5 py-3.5 text-xs font-bold text-white hover:bg-blue-700 disabled:opacity-50 cursor-pointer shadow-md shadow-blue-600/20"
                    >
                      <Save size={16} /> {saving ? "Menyimpan..." : "Simpan Muazine"}
                    </button>
                  </div>
                </div>
              ) : (
                /* PREVIEW AREA */
                <div>
                  <button
                    onClick={() => setPreview(false)}
                    className="mb-6 inline-flex items-center gap-2 text-xs font-bold text-ipm-blue hover:underline cursor-pointer"
                  >
                    <ArrowLeft size={15} /> Kembali ke Editor Artikel
                  </button>

                  <article className="mx-auto max-w-3xl space-y-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-2xs">
                    <span className="inline-block rounded-lg bg-ipm-blue px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white">
                      {kategori}
                    </span>

                    <h1 className="text-2xl font-black text-slate-900 sm:text-3xl leading-snug">
                      {judul || "Judul Artikel"}
                    </h1>
                    
                    <div className="flex items-center gap-3 text-xs font-medium text-slate-500 border-b border-slate-100 pb-4">
                      <span>Oleh <strong className="text-slate-800">{penulis || "Penulis"}</strong></span>
                      <span>•</span>
                      <span>{readingTime} min baca</span>
                    </div>

                    {Boolean(cover?.trim()) && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={cover} alt={judul} className="my-6 max-h-96 w-full rounded-2xl object-cover shadow-sm" />
                    )}

                    <div className="space-y-4 text-xs sm:text-sm text-slate-800 leading-relaxed">
                      {blocks.map((block, idx) => {
                        switch (block.type) {
                          case "h2":
                            return <h2 key={idx} className="text-xl font-black text-slate-900 pt-3">{block.content}</h2>;
                          case "h3":
                            return <h3 key={idx} className="text-lg font-bold text-slate-900 pt-2">{block.content}</h3>;
                          case "paragraph":
                            return <p key={idx} className="whitespace-pre-line leading-relaxed text-slate-700">{block.content}</p>;
                          case "quote":
                            return (
                              <blockquote key={idx} className="border-l-4 border-ipm-blue bg-blue-50/60 p-4 italic text-slate-700 rounded-r-2xl my-3">
                                {block.content}
                              </blockquote>
                            );
                          case "info":
                            return (
                              <div key={idx} className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-xs font-medium text-amber-900 my-3">
                                💡 {block.content}
                              </div>
                            );
                          case "divider":
                            return <hr key={idx} className="my-6 border-slate-200" />;
                          case "image":
                            return (
                              <figure key={idx} className="my-6">
                                {Boolean(block.src?.trim()) && (
                                  /* eslint-disable-next-line @next/next/no-img-element */
                                  <img src={block.src} alt={block.caption} className="max-h-96 w-full rounded-2xl object-cover shadow-sm" />
                                )}
                                {(block.caption || block.source) && (
                                  <figcaption className="mt-2 text-center text-[11px] text-slate-500">
                                    {block.caption} {block.source && <span className="italic">({block.source})</span>}
                                  </figcaption>
                                )}
                              </figure>
                            );
                          default:
                            return null;
                        }
                      })}
                    </div>
                  </article>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* INLINE IMAGE MODAL UPLOAD */}
      {imageModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900">Tambahkan Gambar Artikel</h3>
              <button onClick={() => setImageModal(false)} className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">Unggah Gambar</label>
                <label className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-xs font-bold text-slate-700 hover:bg-slate-100 transition">
                  {uploadingInline ? <Loader2 className="animate-spin text-ipm-blue" size={16} /> : <Upload size={16} />}
                  {uploadingInline ? "Mengunggah..." : "Pilih File Gambar"}
                  <input type="file" accept="image/*" onChange={handleInlineImageUpload} disabled={uploadingInline} className="hidden" />
                </label>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">URL Gambar</label>
                <input
                  type="text"
                  value={imageSrc}
                  onChange={(e) => setImageSrc(e.target.value)}
                  placeholder="URL otomatis terisi setelah diunggah"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-ipm-blue"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">Keterangan Gambar</label>
                <input
                  type="text"
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  placeholder="Contoh: Suasana Pelatihan Administrasi"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-ipm-blue"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">Sumber Gambar</label>
                <input
                  type="text"
                  value={imageSource}
                  onChange={(e) => setImageSource(e.target.value)}
                  placeholder="Dokumentasi PR IPM"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-ipm-blue"
                />
              </div>

              <button
                onClick={addImage}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-ipm-blue px-5 py-3.5 text-xs font-bold text-white hover:bg-blue-700 cursor-pointer shadow-md shadow-blue-600/20"
              >
                <ImagePlus size={16} /> Sisipkan Ke Artikel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}