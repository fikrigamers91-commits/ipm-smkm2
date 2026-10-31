import { createClient } from "@/lib/supabase/client";

// Wajib: Paksa Next.js me-render sitemap secara dinamis (mencegah error saat npm run build)
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function sitemap() {
  const supabase = createClient();
  
  const { data: artikels } = await supabase.from("muazine").select("slug, updated_at");

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://website.ipmsmkmuda.my.id";

  const staticPages = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/muazine`, lastModified: new Date() },
    { url: `${baseUrl}/presensi`, lastModified: new Date() },
  ];

  const dynamicPages = (artikels || []).map((item) => ({
    url: `${baseUrl}/muazine/${item.slug}`,
    lastModified: new Date(item.updated_at),
  }));

  return [...staticPages, ...dynamicPages];
}