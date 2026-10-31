export type StatusProker =
  | "terjadwal"
  | "tentatif"
  | "belum_ditentukan"
  | "insidental"
  | "selesai";

export type ProgramKerja = {
  id: string;
  nama: string;
  bidang: string;
  bulan: number[];
  status: StatusProker;
};

export const programKerja: ProgramKerja[] = [
  // =========================
  // KEPEMIMPINAN
  // =========================
  {
    id: "evaluasi-briefing-awal-bulan",
    nama: "Evaluasi dan Briefing Awal Bulan",
    bidang: "Kepemimpinan",
    bulan: [4, 5, 6, 7, 8, 9],
    status: "terjadwal",
  },
  {
    id: "rapat-pleno",
    nama: "Rapat Pleno",
    bidang: "Kepemimpinan",
    bulan: [],
    status: "belum_ditentukan",
  },
  {
    id: "rakerpim",
    nama: "Rapat Kerja Pimpinan (RAKERPIM)",
    bidang: "Kepemimpinan",
    bulan: [5],
    status: "terjadwal",
  },
  {
    id: "musyran",
    nama: "Mengadakan MUSYRAN",
    bidang: "Kepemimpinan",
    bulan: [],
    status: "belum_ditentukan",
  },
  {
    id: "rapat-audensi",
    nama: "Rapat Audensi Dengan Pihak Sekolah",
    bidang: "Kepemimpinan",
    bulan: [5],
    status: "terjadwal",
  },
  {
    id: "musyda",
    nama: "Mengikuti MUSYDA",
    bidang: "Kepemimpinan",
    bulan: [],
    status: "belum_ditentukan",
  },

  // =========================
  // KESEKRETARIATAN
  // =========================
  {
    id: "sistem-administrasi",
    nama: "Pelaksanaan sistem administrasi IPM",
    bidang: "Kesekretariatan",
    bulan: [4],
    status: "insidental",
  },
  {
    id: "mentanfidzkan-musyran",
    nama: "Mentanfidzkan hasil MUSYRAN",
    bidang: "Kesekretariatan",
    bulan: [4],
    status: "terjadwal",
  },
  {
    id: "database-kader",
    nama: "Membuat database kader masing-masing pengurus PR IPM SMK Muhammadiyah 2 Cileungsi",
    bidang: "Kesekretariatan",
    bulan: [5],
    status: "terjadwal",
  },
  {
    id: "struktur-organisasi",
    nama: "Membuat struktur organisasi",
    bidang: "Kesekretariatan",
    bulan: [4],
    status: "selesai",
  },
  {
    id: "inventaris-aset",
    nama: "Menginventariskan aset-aset IPM",
    bidang: "Kesekretariatan",
    bulan: [4],
    status: "insidental",
  },
  {
    id: "pelatihan-administrasi",
    nama: "Mengadakan dan mengikuti Pelatihan Administrasi Kesekretariatan",
    bidang: "Kesekretariatan",
    bulan: [4],
    status: "insidental",
  },
  {
    id: "koordinasi-sekbid",
    nama: "Koordinasi dengan sekretaris bidang",
    bidang: "Kesekretariatan",
    bulan: [5, 7, 9],
    status: "terjadwal",
  },

  // =========================
  // KEUANGAN
  // =========================
  {
    id: "optimalisasi-dana",
    nama: "Optimalisasi penggalian, pengelolaan dan pemanfaatan dana organisasi",
    bidang: "Keuangan",
    bulan: [4, 5, 6, 7, 8, 9],
    status: "terjadwal",
  },
  {
    id: "iuran-kas",
    nama: "Menggerakkan iuran kas pengurus PR IPM SMK Muhammadiyah 2 Cileungsi",
    bidang: "Keuangan",
    bulan: [4, 5, 6, 7, 8, 9],
    status: "terjadwal",
  },
  {
    id: "mendata-keuangan",
    nama: "Mendata pemasukan dan pengeluaran anggaran dana dalam kegiatan ranting",
    bidang: "Keuangan",
    bulan: [4, 5, 6, 7, 8, 9],
    status: "terjadwal",
  },
  {
    id: "wirausaha-pkk",
    nama: "Mengkoordinir kegiatan ranting di bidang wirausaha bersama ketua bidang PKK",
    bidang: "Keuangan",
    bulan: [4],
    status: "tentatif",
  },
  {
    id: "pelatihan-monef",
    nama: "Mengikuti pelatihan monef PC ipm Cileungsi",
    bidang: "Keuangan",
    bulan: [],
    status: "belum_ditentukan",
  },
  {
    id: "laporan-keuangan-rapbr",
    nama: "Membuat laporan keuangan / kas dan menyusun Rancangan Anggaran Pengeluaran dan Belanja Ranting (RAPBR)",
    bidang: "Keuangan",
    bulan: [4],
    status: "terjadwal",
  },

  // =========================
  // PERKADERAN
  // =========================
  {
    id: "fasilitator-fortasi",
    nama: "Turut serta menjadi fasilitator Fortasi",
    bidang: "Perkaderan",
    bulan: [7],
    status: "terjadwal",
  },
  {
    id: "toff",
    nama: "Mengikuti TOFF ",
    bidang: "Perkaderan",
    bulan: [6],
    status: "terjadwal",
  },
  {
    id: "mapecap",
    nama: "Mengadakan Mapecap",
    bidang: "Perkaderan",
    bulan: [9],
    status: "terjadwal",
  },
  {
    id: "pkdtm-1",
    nama: "Mengikuti PKDTM 1",
    bidang: "Perkaderan",
    bulan: [],
    status: "belum_ditentukan",
  },
  {
    id: "mip-ipm",
    nama: "Mengadakan MIP IPM",
    bidang: "Perkaderan",
    bulan: [9],
    status: "terjadwal",
  },
  {
    id: "upgrading",
    nama: "Mengadakan Upgrading",
    bidang: "Perkaderan",
    bulan: [9],
    status: "terjadwal",
  },
  {
    id: "pengkajian-kader",
    nama: "Pengkajian Kader",
    bidang: "Perkaderan",
    bulan: [],
    status: "belum_ditentukan",
  },

  // =========================
  // KDI
  // =========================
  {
    id: "kajian-islam",
    nama: "Mengadakan kajian islam",
    bidang: "Kajian Dakwah Islam",
    bulan: [],
    status: "belum_ditentukan",
  },
  {
    id: "shalat-dzuhur-kultum",
    nama: "Mengkoordinasi shalat dzuhur berjamaah serta kultum dzuhur",
    bidang: "Kajian Dakwah Islam",
    bulan: [4, 5, 6, 7, 8, 9],
    status: "terjadwal",
  },
  {
    id: "dana-infak-mingguan",
    nama: "Berkoordinasi Dengan Pihak Sekolah Untuk Membantu Menarik Dana Infak Mingguan",
    bidang: "Kajian Dakwah Islam",
    bulan: [4, 5, 6, 7, 8, 9],
    status: "terjadwal",
  },
  {
    id: "buletin-dakwah",
    nama: "Mengadakan buletin dakwah",
    bidang: "Kajian Dakwah Islam",
    bulan: [4, 5, 6, 7, 8, 9],
    status: "terjadwal",
  },
  {
    id: "jumat-berkah",
    nama: "Mengadakan jumat berkah",
    bidang: "Kajian Dakwah Islam",
    bulan: [],
    status: "belum_ditentukan",
  },
  {
    id: "tadarus-rutinan",
    nama: "Tadarus Rutinan",
    bidang: "Kajian Dakwah Islam",
    bulan: [4, 5, 6, 7, 8, 9],
    status: "terjadwal",
  },

  // =========================
  // PIP
  // =========================
  {
    id: "mading",
    nama: "Membuat dan Mengelola Mading",
    bidang: "Pengkajian Ilmu Pengetahuan",
    bulan: [7],
    status: "terjadwal",
  },
  {
    id: "study-banding",
    nama: "Melakukan Study Banding",
    bidang: "Pengkajian Ilmu Pengetahuan",
    bulan: [8, 9],
    status: "terjadwal",
  },
  {
    id: "media-sosial",
    nama: "Membuat dan Mengoptimalkan Media Sosial",
    bidang: "Pengkajian Ilmu Pengetahuan",
    bulan: [4, 5, 6, 7, 8, 9],
    status: "terjadwal",
  },
  {
    id: "taman-baca",
    nama: "Membuat Taman Baca",
    bidang: "Pengkajian Ilmu Pengetahuan",
    bulan: [4],
    status: "insidental",
  },

  // =========================
  // ASBO
  // =========================
  {
    id: "classmeeting",
    nama: "Mengadakan classmeeting",
    bidang: "Apresiasi Seni Budaya & Olahraga",
    bulan: [6],
    status: "terjadwal",
  },
  {
    id: "kelas-seni",
    nama: "Mengadakan kelas seni( bekerjasama dengan bidang ipmawati)",
    bidang: "Apresiasi Seni Budaya & Olahraga",
    bulan: [9],
    status: "terjadwal",
  },
  {
    id: "membuat-atribut",
    nama: "Membuat atribut",
    bidang: "Apresiasi Seni Budaya & Olahraga",
    bulan: [7],
    status: "terjadwal",
  },
  {
    id: "hari-proklamasi",
    nama: "Memperingati hari proklamasi",
    bidang: "Apresiasi Seni Budaya & Olahraga",
    bulan: [8],
    status: "terjadwal",
  },
  {
    id: "bulan-bahasa",
    nama: "Bekerjasama dengan pihak sekolah dalam Bulan Bahasa",
    bidang: "Apresiasi Seni Budaya & Olahraga",
    bulan: [],
    status: "belum_ditentukan",
  },
  {
    id: "fun-sport",
    nama: "Mengadakan Fun Sport",
    bidang: "Apresiasi Seni Budaya & Olahraga",
    bulan: [9],
    status: "terjadwal",
  },
  {
    id: "pentas-seni",
    nama: "Mengadakan Pentas Seni",
    bidang: "Apresiasi Seni Budaya & Olahraga",
    bulan: [],
    status: "belum_ditentukan",
  },
  {
    id: "hari-pahlawan",
    nama: "Mengadakan Hari Pahlawan",
    bidang: "Apresiasi Seni Budaya & Olahraga",
    bulan: [],
    status: "belum_ditentukan",
  },

  // =========================
  // PKK
  // =========================
  {
    id: "bazar",
    nama: "Mengadakan bazar",
    bidang: "Pengembangan Kreativitas & Kewirausahaan",
    bulan: [9],
    status: "terjadwal",
  },
  {
    id: "workshop-kewirausahaan",
    nama: "Mengadakan workshop dan seminar yang berkaitan dengan kewirausahaan",
    bidang: "Pengembangan Kreativitas & Kewirausahaan",
    bulan: [],
    status: "belum_ditentukan",
  },
  {
    id: "berjualan-online",
    nama: "Berjualan online",
    bidang: "Pengembangan Kreativitas & Kewirausahaan",
    bulan: [6, 7, 8, 9],
    status: "terjadwal",
  },
  {
    id: "optimalisasi-media-sosial-pkk",
    nama: "Mengoptimalkan media sosial",
    bidang: "Pengembangan Kreativitas & Kewirausahaan",
    bulan: [6, 7, 8, 9],
    status: "terjadwal",
  },
  {
    id: "kerja-sama-bendahara",
    nama: "Bekerja sama dengan bendahara",
    bidang: "Pengembangan Kreativitas & Kewirausahaan",
    bulan: [6],
    status: "terjadwal",
  },

  // =========================
  // IPMAWATI
  // =========================
  {
    id: "demo-masak",
    nama: "Mengadakan Demo Masak",
    bidang: "Keipmawatian",
    bulan: [],
    status: "belum_ditentukan",
  },
  {
    id: "keputrian",
    nama: "Mengadakan keputrian Setiap Hari Jumat",
    bidang: "Keipmawatian",
    bulan: [4, 5, 6, 7, 8, 9],
    status: "terjadwal",
  },
  {
    id: "kerajinan-tangan",
    nama: "Pembuatan Kerajinan Tangan (Workshop)",
    bidang: "Keipmawatian",
    bulan: [9],
    status: "terjadwal",
  },
  {
    id: "konten-edukasi-perempuan",
    nama: "Membuat konten edukasi terkhusus perempuan",
    bidang: "Keipmawatian",
    bulan: [5, 8],
    status: "terjadwal",
  },

  // =========================
  // ADVOKASI
  // =========================
  {
    id: "kotak-saran",
    nama: "Membuat & mengoptimalkan kotak saran untuk menyalurkan aspirasi siswa/I SMK Muhammadiyah 2 Cileungsi",
    bidang: "Advokasi",
    bulan: [4, 5, 6, 7, 8, 9],
    status: "terjadwal",
  },
  {
    id: "seminar-penyuluhan",
    nama: "Mengadakan seminar penyuluhan pelajar",
    bidang: "Advokasi",
    bulan: [9],
    status: "terjadwal",
  },
  {
    id: "short-movie",
    nama: "Membuat short movie",
    bidang: "Advokasi",
    bulan: [4],
    status: "insidental",
  },
  {
    id: "ipm-mengajar",
    nama: "IPM mengajar",
    bidang: "Advokasi",
    bulan: [],
    status: "belum_ditentukan",
  },
];