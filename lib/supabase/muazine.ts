import { createBrowserClient } from "@supabase/ssr";
import { artikel as staticArtikel } from "@/data/artikel";

export type StatusMuazine = "draft" | "terbit";

export type Muazine = {
  id?: string;
  judul: string;
  slug: string;
  penulis: string;
  isi: string;
  gambar: string | null;
  status: StatusMuazine;
  created_at?: string;
  kategori?: string;
  tanggal?: string;
};

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getPublicMuazine(): Promise<Muazine[]> {
  const { data, error } = await supabase
    .from("muazine")
    .select("*")
    .eq("status", "terbit")
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("Gagal mengambil data muazine dari Supabase:", error);
    return staticArtikel as unknown as Muazine[];
  }

  return [...(data as Muazine[]), ...(staticArtikel as unknown as Muazine[])];
}

export async function getMuazineBySlug(slug: string): Promise<Muazine | null> {
  const { data, error } = await supabase
    .from("muazine")
    .select("*")
    .eq("slug", slug)
    .eq("status", "terbit")
    .maybeSingle();

  if (data && !error) {
    return data as Muazine;
  }

  const foundStatic = (staticArtikel as unknown as Muazine[]).find(
    (item) => item.slug === slug
  );

  return foundStatic || null;
}