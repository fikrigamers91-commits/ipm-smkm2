import { createClient } from "@/lib/supabase/client";

export interface MediaItem {
  id?: string;
  judul: string;
  deskripsi?: string;
  image_url?: string;
  drive_url?: string;
  kategori?: string;
  created_at?: string;
}

// 1. Fungsi Mengambil Daftar Media
export async function getMediaList(): Promise<MediaItem[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("media")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching media:", error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Unexpected error in getMediaList:", err);
    return [];
  }
}

// 2. Fungsi Upload / Tambah Data Media Baru
export async function uploadMedia(coverFile: File, item: Omit<MediaItem, "id" | "created_at">) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("media")
      .insert([item])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, data };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Gagal mengunggah media";
    console.error("Error uploading media:", errorMessage);
    return { success: false, error: errorMessage };
  }
}