import { createClient } from '@/lib/supabase/client'; // Sesuaikan path jika di lib/supabase/client
import { programKerja as staticProgramKerja } from '@/data/program-kerja';

export type StatusProker =
  | 'terjadwal'
  | 'tentatif'
  | 'belum_ditentukan'
  | 'insidental'
  | 'selesai';

export type ProgramKerja = {
  id: string;
  nama: string;
  bidang: string;
  bulan: number[];
  tanggal?: number | null;
  status: StatusProker;
};

// Ambil data gabungan: Supabase (data dinamis terbaru) + Data Statis (fallback)
export async function getProgramKerja(): Promise<ProgramKerja[]> {
  const supabase = createClient();
  const { data: dbData, error } = await supabase
    .from('program_kerja')
    .select('*');

  if (error) {
    console.error('Error fetching program kerja from Supabase:', error);
    return staticProgramKerja;
  }

  // Jika belum ada data sama sekali di Supabase, pakai data statis lengkap
  if (!dbData || dbData.length === 0) {
    return staticProgramKerja;
  }

  // Buat Map dari data database untuk pencarian cepat berdasarkan ID
  const dbMap = new Map<string, ProgramKerja>();
  dbData.forEach((item) => {
    dbMap.set(item.id, item as ProgramKerja);
  });

  // Gabungkan: jika ada di Supabase pakai data Supabase, jika belum ada pakai data statis
  const mergedData = staticProgramKerja.map((staticItem) => {
    if (dbMap.has(staticItem.id)) {
      return dbMap.get(staticItem.id)!;
    }
    return staticItem;
  });

  return mergedData;
}

// Simpan/Upsert 1 proker ke Supabase
export async function updateProgramKerja(proker: ProgramKerja) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('program_kerja')
    .upsert({
      id: proker.id,
      nama: proker.nama,
      bidang: proker.bidang,
      bulan: proker.bulan || [],
      tanggal: proker.tanggal || null,
      status: proker.status,
    })
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}