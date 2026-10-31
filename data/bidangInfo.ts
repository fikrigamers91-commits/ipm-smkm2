export type BidangDetail = {
  deskripsi: string;
  whatWeDo: string[];
};

export const bidangInfo: Record<string, BidangDetail> = {
  perkaderan: {
    deskripsi:
      "Jantung regenerasi organisasi yang bertugas membentuk, membina, dan mengembangkan karakter kepemimpinan kader IPM.",
    whatWeDo: [
      "Mengoptimalkan pencarian dan pembentukan kader ikatan, serta regenerasi kepemimpinan.",
      "Mengembangkan pelatihan rekrutmen dan kapasitas kader agar siap menjadi penggerak ikatan.",
      "Mengembangkan forum-forum diskusi untuk melatih intelektual kader dan daya analisa.",
      "Membentuk alur pembinaan dan regenerasi kepengurusan organisasi secara berkelanjutan.",
    ],
  },
  kdi: {
    deskripsi:
      "Pusat pembinaan nilai-nilai keislaman dan dakwah kreatif pelajar di lingkungan sekolah.",
    whatWeDo: [
      "Mengintensifkan kajian, pemahaman, serta pengembangan wawasan keislaman pimpinan dan anggota.",
      "Mengembangkan kegiatan yang berorientasi pada penanaman nilai-nilai keislaman.",
      "Monitoring terhadap penerapan amaliyah keislaman pimpinan dan anggota.",
      "Membangun dan mengoptimalkan pembentukan dai-dai pelajar.",
    ],
  },
  pip: {
    deskripsi:
      "Wadah pengembangan nalar kritis, wawasan IPTEK, literasi, jurnalisme, dan media publikasi pelajar.",
    whatWeDo: [
      "Mengembangkan kemampuan anggota dalam penguasaan IPTEK serta diskusi ilmiah isu keilmuan.",
      "Mengembangkan budaya membaca & menulis pelajar (Gerakan Iqra', Jurnalistik, dan KIR).",
      "Mengelola & mengoptimalkan media publikasi digital (Instagram, TikTok, Web Muazine, dll.).",
      "Memfasilitasi edukasi ilmu pengetahuan dan penalaran kritis kader.",
    ],
  },
  asbo: {
    deskripsi:
      "Wadah berekspresi, mengasah bakat seni, budaya lokal/Islam, serta kebugaran olahraga.",
    whatWeDo: [
      "Pengkajian, penggalian, dan pengembangan seni serta budaya Islam maupun lokal.",
      "Melakukan kegiatan untuk mengembangkan dan mempertahankan seni, budaya, serta olahraga.",
      "Melakukan grouping (pengelompokan) serta pendampingan potensi olahraga anggota.",
      "Wadah apresiasi karya kreatif, kompetisi, dan ekspresi positif kader IPM.",
    ],
  },
  pkk: {
    deskripsi:
      "Pusat pembekalan skill praktis, kemandirian finansial, dan jiwa wirausaha kader muda.",
    whatWeDo: [
      "Mengelola usaha mandiri ranting (koperasi/merchandise IPM).",
      "Pelatihan skill praktis (desain, wirausaha muda, dan ekonomi kreatif).",
      "Menanamkan jiwa kemandirian finansial kader dan organisasi.",
      "Mengadakan bazaar atau pameran karya kewirausahaan siswa.",
    ],
  },
  advokasi: {
    deskripsi:
      "Garda terdepan pengawalan hak-hak siswa, ruang aspirasi, dan kepedulian sosial pelajar.",
    whatWeDo: [
      "Menampung dan memperjuangkan aspirasi serta hak-hak siswa.",
      "Mengedukasi kesadaran hukum, bahaya bullying, dan kesehatan mental.",
      "Menjadi jembatan komunikasi antara pelajar, organisasi dan pihak sekolah.",
      "Mengadakan aksi sosial, tanggap bencana, dan pengabdian masyarakat.",
    ],
  },
  ipmawati: {
    deskripsi:
      "Wadah pemberdayaan, ruang aman, dan peningkatan peran aktif kader pelajar perempuan.",
    whatWeDo: [
      "Pelatihan kepemimpinan dan penguatan peran kader perempuan.",
      "Kajian isu gender, perlindungan perempuan, dan kesehatan reproduksi.",
      "Mengembangkan keterampilan khusus dan kemandirian kader ipmawati.",
      "Membangun ruang aman dan saling mendukung sesama pelajar putri.",
    ],
  },
};