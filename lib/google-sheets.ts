export type FormMasukanData = {
  tipe: "Kritik & Saran" | "Pertanyaan" | "Kerja Sama";
  nama: string;
  instansi?: string;
  kontak?: string;
  pesan: string;
};

export async function submitToGoogleSheets(formData: FormMasukanData) {
  const googleSheetUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;

  if (!googleSheetUrl) {
    throw new Error("URL Google Sheet belum dikonfigurasi di .env.local");
  }

  // Kirim data langsung ke Google Apps Script
  await fetch(googleSheetUrl, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify({
      tipe: formData.tipe,
      nama: formData.nama,
      instansi: formData.instansi || "-",
      kontak: formData.kontak || "-",
      pesan: formData.pesan,
    }),
  });

  return { result: "success" };
}