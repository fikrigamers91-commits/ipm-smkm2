import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
  '';

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ipmsmkmudacils.netlify.app';

  // Tarik daftar artikel Muazine yang terbit
  const { data: articles } = await supabase
    .from('muazine')
    .select('slug, updated_at, created_at')
    .eq('status', 'terbit');

  const articleUrls = (articles || []).map((item) => ({
    url: `${baseUrl}/muazine/${item.slug}`,
    lastModified: new Date(item.updated_at || item.created_at || Date.now()),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Daftar halaman statis resmi PR IPM SMK Muda Cileungsi
  const staticPages = [
    '',
    '/tentang',
    '/muazine',
    '/kontak',
    '/program-kerja',
    '/media',
    '/organisasi/bph',
    '/organisasi/perkaderan',
    '/organisasi/kdi',
    '/organisasi/pip',
    '/organisasi/asbo',
    '/organisasi/pkk',
    '/organisasi/advokasi',
    '/organisasi/ipmawati',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.9,
  }));

  return [...staticPages, ...articleUrls];
}