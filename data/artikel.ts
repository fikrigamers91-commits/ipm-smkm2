export type Artikel = {
  slug: string;
  judul: string;
  kategori: string;
  tanggal: string;
  penulis: string;
  cover: string;
  preview: string;
  isi: string[];
  gambar?: string;
};

export const artikel: Artikel[] = [];