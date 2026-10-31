export interface Member {
  nama: string;
  jabatan: string;
  foto: string;
  angkatan: string;
  ttl: string;
  alasan: string;
  motivasi: string;
  quote: string;
}

export interface Bidang {
  slug: string;
  nama: string;
  banner: string; // sebelumnya hero
  slogan: string;
  deskripsi: string;
  tugas: string[];
  ketua: Member;
  sekretaris: Member;
  anggota: Member[];
}

export interface BPH {
  title: string;
  banner: string; // sebelumnya hero
  slogan: string;
  deskripsi: string;
  tugas: string[];
  ketua: Member;
  sekretaris: Member;
  bendahara: Member;
  anggota: Member[];
}

export const organisasi: { bph: BPH; bidang: Bidang[] } = {
  bph: {
    title: "Badan Pengurus Harian",
    banner: "/kelompok/bph-gabungan.png",
    slogan: "Menatap Masa Depan dengan Kepemimpinan yang Solid, Amanah, dan Berdampak.",
    deskripsi:
      "Badan Pengurus Harian (BPH) merupakan pimpinan tertinggi dalam struktur PR IPM SMK Muhammadiyah 2 Cileungsi. BPH bertugas mengordinasikan seluruh kebijakan, mengawasi jalannya roda organisasi, serta memastikan ketercapaian visi dan misi gerakan IPM.",
    tugas: [
      "Mengordinasikan dan mengawasi seluruh kegiatan bidang organisasi",
      "Mengelola administrasi dan keuangan pimpinan secara efisien dan transparan",
      "Menentukan arah kebijakan strategis organisasi selama satu periode",
      "Menjalin hubungan internal dan eksternal dengan pihak sekolah serta pimpinan setingkat"
    ],
    ketua: {
      nama: "Rendy Rafif Santoso",
      jabatan: "Ketua Umum",
      foto: "/anggota/bph/rendy-rafif-santoso.png",
      angkatan: "2024/2025",
      ttl: "Jakarta, 5 Mei 2008",
      alasan: "Karena ingin mengembangkan soft skill serta cari pengalaman dan relasi di kalangan pelajar, lalu ingin menciptakan suatu kaderisasi yang bertanggung jawab dan berkompeten",
      motivasi: "",
      quote: "Jika periode saya gagal, itu murni kesalahan saya. Tapi jika periode saya berhasil, itu karena pengurus saya yang hebat. Jadi jangan pernah untuk takut mencoba, karena suatu kegagalan datang dari orang yang berani mengambil langkah, dibanding yang tidak berani sama sekali"
    },
    sekretaris: {
      nama: "Casey Indriyana",
      jabatan: "Sekretaris Umum",
      foto: "/anggota/bph/casey-indriyana.png",
      angkatan: "",
      ttl: "",
      alasan: "",
      motivasi: "",
      quote: ""
    },
    bendahara: {
      nama: "Tisya Cahaya Ramadhani",
      jabatan: "Bendahara Umum",
      foto: "/anggota/bph/tisya-cahaya-ramadhani.png",
      angkatan: "",
      ttl: "",
      alasan: "",
      motivasi: "",
      quote: ""
    },
    anggota: []
  },

  bidang: [
    {
      slug: "perkaderan",
      nama: "Perkaderan",
      banner: "/kelompok/perkaderan-gabungan.png",
      slogan: "Membentuk Kader Pelajar Muhammadiyah yang Berkarakter, Militan, dan Berprestasi.",
      deskripsi:
        "Bidang Perkaderan merupakan jantung dari keberlangsungan organisasi IPM. Bidang ini berfokus pada pembinaan, pendampingan, serta pengembangan potensi kepemimpinan para pelajar melalui sistem perkaderan yang terstruktur.",
      tugas: [
        "Merekrut dan membina kader baru di lingkungan SMK Muhammadiyah 2 Cileungsi",
        "Menyelenggarakan Pelatihan Kader Taruna Melati I (PKTM I)",
        "Memantau dan mengevaluasi perkembangan kepemimpinan anggota",
        "Menyusun strategi sistematis dalam penguatan sistem perkaderan sekolah"
      ],
      ketua: {
        nama: "Muhammad Rifki",
        jabatan: "Ketua Bidang",
        foto: "/anggota/perkaderan/muhammad-rifki.png",
        angkatan: "2024/2025",
        ttl: "Bogor, 26 Desember 2008",
        alasan: "Ingin menjadi pribadi yang lebih baik",
        motivasi: "",
        quote: "Barangsiapa yang bersungguh-sungguh,maka dapatlah dia."
      },
      sekretaris: {
        nama: "Lutfiyah Nurajijah",
        jabatan: "Sekretaris Bidang",
        foto: "/anggota/perkaderan/lutfiyah-nurajijah.png",
        angkatan: "",
        ttl: "",
        alasan: "",
        motivasi: "",
        quote: ""
      },
      anggota: [
        {
          nama: "Fikri Althaf Arrafif",
          jabatan: "Anggota",
          foto: "/anggota/perkaderan/fikri-althaf-arrafif.png",
          angkatan: "",
          ttl: "",
          alasan: "",
          motivasi: "",
          quote: ""
        },
        {
          nama: "Labib Musyaffa Zainudin",
          jabatan: "Anggota",
          foto: "/anggota/perkaderan/labib-musyaffa-zainudin.png",
          angkatan: "",
          ttl: "",
          alasan: "",
          motivasi: "",
          quote: ""
        },
        {
          nama: "Nabilla Aulia",
          jabatan: "Anggota",
          foto: "/anggota/perkaderan/nabilla-aulia.png",
          angkatan: "",
          ttl: "",
          alasan: "",
          motivasi: "",
          quote: ""
        },
        {
          nama: "Raisya Fayza Ramadhani",
          jabatan: "Anggota",
          foto: "/anggota/perkaderan/raisya-fayza-ramadhani.png",
          angkatan: "2024/2025",
          ttl: "Bogor, 5 Oktober 2008",
          alasan: "untuk memperluas relasi pertemanan, belajar bertanggung jawab, dan memperluas wawasan.",
          motivasi: "",
          quote: "Masa depan adalah milik mereka yang menyiapkan hari ini!"
        },
        {
          nama: "Rizki Robbi Rodhiya",
          jabatan: "Anggota",
          foto: "/anggota/perkaderan/rizki-robbi-rodhiya.png",
          angkatan: "2025/2026",
          ttl: "Jakarta, 08 Juli 2009",
          alasan: "Saya ingin berorganisasi karena ingin belajar menjadi pribadi yang lebih bertanggung jawab, menambah pengalaman, melatih jiwa kepemimpinan, serta memberikan manfaat bagi sekolah dan teman-teman.",
          motivasi: "",
          quote: "Dunia di ciptakan bukan hanya untukmu, maka terbiasalah dengan hal-hal yang jarang berpihak kepadamu"
        }
      ]
    },

    {
      slug: "kdi",
      nama: "Kajian Dakwah Islam",
      banner: "/kelompok/kdi-gabungan.png",
      slogan: "Memperkuat Keislaman dan Kedakwahan Kreatif di Kalangan Pelajar.",
      deskripsi:
        "Bidang Kajian Dakwah Islam (KDI) bertugas membina pemahaman keagamaan serta membumikan nilai-nilai Islam di kalangan pelajar. Melalui pendekatan dakwah yang kreatif dan kontekstual, KDI berupaya menciptakan lingkungan sekolah yang religius.",
      tugas: [
        "Menyelenggarakan kajian keislaman rutin untuk pelajar",
        "Mengelola kegiatan keagamaan dan peringatan hari besar Islam",
        "Mengembangkan sarana dakwah kreatif berbasis media digital",
        "Meningkatkan kualitas ibadah dan akhlak santun di lingkungan sekolah"
      ],
      ketua: {
        nama: "Vikry Achmad Asytar",
        jabatan: "Ketua Bidang",
        foto: "/anggota/kdi/vikry-achmad-asytar.png",
        angkatan: "2024/2025",
        ttl: "Jakarta, 20 Mei 2009",
        alasan: "Ingin Mengenal IPM.",
        motivasi: "",
        quote: "selagi masih belajar jangan takut untuk mencoba"
      },
      sekretaris: {
        nama: "Aldyansyah Harib",
        jabatan: "Sekretaris Bidang",
        foto: "/anggota/kdi/aldyansyah-harib.png",
        angkatan: "",
        ttl: "",
        alasan: "",
        motivasi: "",
        quote: ""
      },
      anggota: [
        {
          nama: "Abdul Rahman Rayhan",
          jabatan: "Anggota",
          foto: "/anggota/kdi/abdul-rahman-rayhan.png",
          angkatan: "2025/2026",
          ttl: "Jakarta, 22 Desember 2008",
          alasan: "Ingin menjadi lebih baik dan belajar tidak menjadi introvert yang ga guna.",
          motivasi: "",
          quote: "awali bismillah amin akhiri dengan alhamdulillah amin"
        },
        {
          nama: "Muhammad Andrea Dinata",
          jabatan: "Anggota",
          foto: "/anggota/kdi/muhammad-andrea-dinata.png",
          angkatan: "2025/2026",
          ttl: "Bogor, 24 April 2009",
          alasan: "Untuk menambah ilmu wawasan.",
          motivasi: "",
          quote: "Tetap semangat!"
        },
        {
          nama: "Restu Sulung Agustin",
          jabatan: "Anggota",
          foto: "/anggota/kdi/restu-sulung-agustin.png",
          angkatan: "2024/2025",
          ttl: "Bogor, 17 Juni 2007",
          alasan: "Motivasi saya mau berubah sikap.",
          motivasi: "Berubah lebih baik lagi!",
          quote: "Berubah lebih baik lagi!"
        },
        {
          nama: "Sulthan Ramdhani",
          jabatan: "Anggota",
          foto: "/anggota/kdi/sulthan-ramdhani.png",
          angkatan: "",
          ttl: "",
          alasan: "",
          motivasi: "",
          quote: ""
        }
      ]
    },

    {
      slug: "pip",
      nama: "Pengkajian Ilmu Pengetahuan",
      banner: "/kelompok/pip-gabungan.png",
      slogan: "Mengembangkan Tradisi Literasi dan Inovasi Iptek Pelajar.",
      deskripsi:
        "Bidang Pengkajian Ilmu Pengetahuan (PIP) berfokus pada penguatan budaya literasi, pengembangan wawasan keilmuan, serta pemanfaatan teknologi bagi para pelajar. PIP berkomitmen mendorong daya kritis dan wawasan luas di era modern.",
      tugas: [
        "Mengembangkan gerakan literasi dan budaya membaca di sekolah",
        "Menyelenggarakan workshop dan pelatihan berbasis sains serta teknologi",
        "Mengelola media publikasi pengetahuan dan majalah/buletin pelajar",
        "Mendorong diskusi kritis dan pengkajian isu-isu edukatif"
      ],
      ketua: {
        nama: "Rafi Nudin Mukti",
        jabatan: "Ketua Bidang",
        foto: "/anggota/pip/rafi-nudin-mukti.png",
        angkatan: "2025/2026",
        ttl: "Bekasi, 4 Mei 2010",
        alasan: "Melanjutkan organisasi.",
        motivasi: "",
        quote: "Yang penting makan."
      },
      sekretaris: {
        nama: "Muhammad Fikri Haikal",
        jabatan: "Sekretaris Bidang",
        foto: "/anggota/pip/muhammad-fikri-haikal.png",
        angkatan: "2024/2025",
        ttl: "Kendari, 9 Februari 2009",
        alasan: "Memperbanyak relasi, memperbanyak ilmu dan wawasan di non akademik. Selain itu, saya ingin memperdalam ilmu problem solving saya dan public speaking saya.",
        motivasi: "",
        quote: "If you want to shine like sun first you have to burn like it."
      },
      anggota: [
        {
          nama: "Aulia Futri",
          jabatan: "Anggota",
          foto: "/anggota/pip/aulia-futri.png",
          angkatan: "",
          ttl: "",
          alasan: "",
          motivasi: "",
          quote: ""
        },
        {
          nama: "Dinar Putri Syahidah",
          jabatan: "Anggota",
          foto: "/anggota/pip/dinar-putri-syahidah.png",
          angkatan: "2025/2026",
          ttl: "Lampung, 11 Juli 2010",
          alasan: "Sejujurnya aku cuma fomo cuma semakin dijalanin karna memiliki rasa tanggung jawab.",
          motivasi: "",
          quote: "Lecet tertinggi mencintai diri sendiri adalah tidak takut sendirian."
        },
        {
          nama: "Erie Triana Sari",
          jabatan: "Anggota",
          foto: "/anggota/pip/erie-triana-sari.png",
          angkatan: "2025/2026",
          ttl: "Bogor, 14 Juni 2010",
          alasan: "Alasan ber-ipm adalah membangun jiwa sosialisasi dan keluar dari zona nyaman. Motivasi nya jangan pernah mempedulikan apa kata orang lain.",
          motivasi: "jangan pernah mempedulikan apa kata orang lain.",
          quote: "you're you, i am me."
        },
        {
          nama: "Keisha Aristawidya",
          jabatan: "Anggota",
          foto: "/anggota/pip/keisha-aristawidya.png",
          angkatan: "2025/2026",
          ttl: "Samarinda, 17 Oktober 2009",
          alasan: "Karena saya ingin memperluas relasi dan menambah pengalaman",
          motivasi: "",
          quote: "jika allah menjauhkan sesuatu darimu, maka percayalah itu adalah jalan yg terbaik"
        },
        {
          nama: "Merry Annisa Fitri",
          jabatan: "Anggota",
          foto: "/anggota/pip/merry-annisa-fitri.png",
          angkatan: "2025/2026",
          ttl: "Bogor, 17 Januari 2010",
          alasan: "Pengen nyoba hal baru, temen² ny pada support, bisa ketemu sama temen smp.",
          motivasi: "",
          quote: "Bertumbuh bersama, berdampak untuk sesama."
        },
        {
          nama: "Sera Mita Pratiwi",
          jabatan: "Anggota",
          foto: "/anggota/pip/sera-mita-pratiwi.png",
          angkatan: "",
          ttl: "",
          alasan: "",
          motivasi: "",
          quote: ""
        },
        {
          nama: "Wahyu Tri Pujiati",
          jabatan: "Anggota",
          foto: "/anggota/pip/wahyu-tri-pujiati.png",
          angkatan: "",
          ttl: "",
          alasan: "",
          motivasi: "",
          quote: ""
        }
      ]
    },

    {
      slug: "asbo",
      nama: "Apresiasi Seni, Budaya, dan Olahraga",
      banner: "/kelompok/asbo-gabungan.png",
      slogan: "Mewadahi Apresiasi Seni, Budaya, dan Olahraga Pelajar yang Sportif.",
      deskripsi:
        "Bidang Apresiasi Seni, Budaya, dan Olahraga (ASBO) bergerak dalam wadah minat dan bakat non-akademik siswa. Melalui kompetisi dan pentas kreativitas, ASBO bertujuan membentuk pelajar yang sehat, sportif, serta berjiwa seni.",
      tugas: [
        "Menyelenggarakan kegiatan turnamen olahraga antar kelas/pelajar",
        "Mendukung serta memfasilitasi minat bakat seni pelajar",
        "Mengadakan pementasan budaya atau kompetisi kreativitas siswa",
        "Menanamkan nilai-nilai kebersamaan dan kedisiplinan melalui olahraga"
      ],
      ketua: {
        nama: "Rafa Fairuz Fadhilah",
        jabatan: "Ketua Bidang",
        foto: "/anggota/asbo/rafa-fairuz-fadhilah.png",
        angkatan: "2025/2026",
        ttl: "Bogor, 28 Juni 2010",
        alasan: "Melatih rasa tanggung jawab,ingin belajar lebih dalam tentang ke organisasian.",
        motivasi: "",
        quote: "Bergerak bersama, berkontribusi nyata, dan menginspirasi sesama demi kemajuan organisasi, satu tujuan seribu gerakan"
      },
      sekretaris: {
        nama: "Muhammad Rizki Fadhilah",
        jabatan: "Sekretaris Bidang",
        foto: "/anggota/asbo/muhammad-rizki-fadhilah.png",
        angkatan: "2024/2025",
        ttl: "Bogor, 4 Juli 2008",
        alasan: "Saya juga tidak tahu.",
        motivasi: "",
        quote: "Berfikir 2x sebelum bertindak."
      },
      anggota: [
        {
          nama: "Adelia Yunita",
          jabatan: "Anggota",
          foto: "/anggota/asbo/adelia-yunita.png",
          angkatan: "",
          ttl: "",
          alasan: "",
          motivasi: "",
          quote: ""
        },
        {
          nama: "Arla Kaliani Ramadhani",
          jabatan: "Anggota",
          foto: "/anggota/asbo/arla-kaliani-ramadhani.png",
          angkatan: "",
          ttl: "",
          alasan: "",
          motivasi: "",
          quote: ""
        },
        {
          nama: "Novelita Putri Khairunnisa",
          jabatan: "Anggota",
          foto: "/anggota/asbo/novelita-putri-khairunnisa.png",
          angkatan: "",
          ttl: "",
          alasan: "",
          motivasi: "",
          quote: ""
        },
        {
          nama: "Zivana Aulia Putri",
          jabatan: "Anggota",
          foto: "/anggota/asbo/zivana-aulia-putri.png",
          angkatan: "",
          ttl: "",
          alasan: "",
          motivasi: "",
          quote: ""
        }
      ]
    },

    {
      slug: "pkk",
      nama: "Pengembangan Kreativitas dan Kewirausahaan",
      banner: "/kelompok/pkk-gabungan.png",
      slogan: "Mendorong Kemandirian dan Semangat Kewirausahaan Pelajar.",
      deskripsi:
        "Bidang Pengembangan Kreativitas dan Kewirausahaan (PKK) dirancang untuk menumbuhkan jiwa entrepreneurship di kalangan pelajar SMK. Dengan latihan kemandirian finansial dan inovasi bisnis, PKK melatih kemampuan ekonomi kreatif sejak dini.",
      tugas: [
        "Mengelola unit usaha dan merchandise resmi IPM sekolah",
        "Menyelenggarakan pelatihan kewirausahaan dan bisnis digital pelajar",
        "Melatih kemandirian pendanaan organisasi melalui proyek kreatif",
        "Menjalin kerja sama bisnis dan kemitraan dengan pihak eksternal"
      ],
      ketua: {
        nama: "Puji Maulida Bilqis",
        jabatan: "Ketua Bidang",
        foto: "/anggota/pkk/puji-maulida-bilqis.png",
        angkatan: "",
        ttl: "",
        alasan: "",
        motivasi: "",
        quote: ""
      },
      sekretaris: {
        nama: "Nadin Putri Utami",
        jabatan: "Sekretaris Bidang",
        foto: "/anggota/pkk/nadin-putri-utami.png",
        angkatan: "2025/2026",
        ttl: "Bogor, 30 Desember 2009",
        alasan: "Pengembangan karakter dan kepemimpinan",
        motivasi: "",
        quote: "Jangan takut gagal, karena dari kegagalanlah kepercayaan diri tumbuh"
      },
      anggota: [
        {
          nama: "Gaisan Hanif Shuja",
          jabatan: "Anggota",
          foto: "/anggota/pkk/gaisan-hanif-shuja.png",
          angkatan: "",
          ttl: "",
          alasan: "",
          motivasi: "",
          quote: ""
        },
        {
          nama: "Muhammad Faisal Pratama",
          jabatan: "Anggota",
          foto: "/anggota/pkk/muhammad-faisal-pratama.png",
          angkatan: "2025/2026",
          ttl: "Bogor, 13 November 2009",
          alasan: "Kenal temen dari sekolah lain, cabang, daerah, bahkan nasional.",
          motivasi: "",
          quote: "Di ipm kita belajar bukan cuma buat nilai tapi buat jadi pelapor kebaikan."
        },
        {
          nama: "Noval Syafiqul Anam",
          jabatan: "Anggota",
          foto: "/anggota/pkk/noval-syafiqul-anam.png",
          angkatan: "2025/2026",
          ttl: "Jakarta, 9 November 2009",
          alasan: "Motivasi saya ber-IPM adalah ingin belajar menjadi pribadi yang lebih bertanggung jawab, disiplin, dan mampu bekerja sama dalam tim. Saya ingin mengembangkan kemampuan kepemimpinan, komunikasi, serta memberikan manfaat bagi sekolah, teman-teman, dan masyarakat. Selain itu, saya ingin menjadikan IPM sebagai wadah untuk meningkatkan ilmu, pengalaman berorganisasi, dan mengamalkan nilai-nilai Islam serta Muhammadiyah dalam kehidupan sehari-hari.",
          motivasi: "Ingin belajar menjadi pribadi yang lebih bertanggung jawab, disiplin, dan mampu bekerja sama dalam tim.",
          quote: "IPM mengajarkan bahwa kepemimpinan bukan tentang jabatan, melainkan tentang tanggung jawab dan pengabdian"
        },
        {
          nama: "Zacky Alvian",
          jabatan: "Anggota",
          foto: "/anggota/pkk/zacky-alvian.png",
          angkatan: "",
          ttl: "",
          alasan: "",
          motivasi: "",
          quote: ""
        }
      ]
    },

    {
      slug: "advokasi",
      nama: "Advokasi",
      banner: "/kelompok/advokasi-gabungan.png",
      slogan: "Menyuarakan Aspirasi dan Menjaga Hak Hak Pelajar secara Inklusif.",
      deskripsi:
        "Bidang Advokasi bertindak sebagai jembatan komunikasi antara siswa dengan pihak pimpinan sekolah. Bidang ini berfokus pada pengawalan aspirasi pelajar, pendampingan masalah siswa, serta sosialisasi hak-hak pelajar.",
      tugas: [
        "Menampung dan memperjuangkan aspirasi pelajar kepada pihak sekolah",
        "Menyelenggarakan sosialisasi tentang hak, kewajiban, dan kesadaran hukum",
        "Memberikan pendampingan serta ruang bantuan bagi siswa bermasalah",
        "Mengadakan kajian isu-isu sosial dan kebijakan pendidikan di lingkungan sekolah"
      ],
      ketua: {
        nama: "Pinkan Nuraeni",
        jabatan: "Ketua Bidang",
        foto: "/anggota/advokasi/pinkan-nuraeni.png",
        angkatan: "2025/2026",
        ttl: "Bogor, 30 Oktober 2009",
        alasan: "Karena di IPM aku banyak belajar hal baru, aku ingin terus belajar dan berkarya agar bisa menjadi generasi muda yang bermanfaat.",
        motivasi: "",
        quote: " (مَنْ صَبَرَ ظَفِرَ) "
      },
      sekretaris: {
        nama: "Puzi Dwi Rahayu",
        jabatan: "Sekretaris Bidang",
        foto: "/anggota/advokasi/puzi-dwi-rahayu.png",
        angkatan: "2025/2026",
        ttl: "Bogor, 08 Juli 2009",
        alasan: "Sebagai pencinta lagu, aku suka sama lagu ipm 🥺",
        motivasi: "",
        quote: "Jika tak bisa jadi baik, jangan jadi orang jahat"
      },
      anggota: [
        {
          nama: "Alzena Zahra Kirani",
          jabatan: "Anggota",
          foto: "/anggota/advokasi/alzena-zahra-kirani.png",
          angkatan: "",
          ttl: "",
          alasan: "",
          motivasi: "",
          quote: ""
        },
        {
          nama: "Anisa Fitria Wulandari",
          jabatan: "Anggota",
          foto: "/anggota/advokasi/anisa-fitria-wulandari.png",
          angkatan: "2025/2026",
          ttl: "Jakarta Barat, 15 Agustus 2010",
          alasan: "Mencari pengalaman berorganisasi, menambah relasi, dan mengembangkan diri.",
          motivasi: "",
          quote: "Tak semua usaha itu dipermudah tapi semua yg berusaha pasti akan berbuah"
        },
        {
          nama: "Fajar Imam Adi Saputra",
          jabatan: "Anggota",
          foto: "/anggota/advokasi/fajar-imam.png",
          angkatan: "2025/2026",
          ttl: "Jakarta, 23 Oktober 2009",
          alasan: "Pengen jadi pemimpin!",
          motivasi: "",
          quote: "perasaan bukan halangan untuk kemajuan."
        },
        {
          nama: "Khalishah Janeeta",
          jabatan: "Anggota",
          foto: "/anggota/advokasi/khalishah-janeeta.png",
          angkatan: "2025/2026",
          ttl: "Jakarta, 16 Mei 2010",
          alasan: "Untuk bersosialisasi dan menambah pengalaman.",
          motivasi: "",
          quote: "jangan tinggalkan shalat, karena shalat adalah tiang agama"
        }
      ]
    },

    {
      slug: "ipmawati",
      nama: "Ipmawati",
      banner: "/kelompok/ipmawati-gabungan.png",
      slogan: "Menguatkan Peran Ipmawati yang Mandiri, Berprestasi, dan Berkemajuan.",
      deskripsi:
        "Bidang Ke-IPM-awatian khusus berfokus pada pembinaan keputrian, isu kewanitaan, dan pemberdayaan pelajar putri. Bidang ini bertujuan membentuk Ipmawati yang percaya diri, mandiri, serta berkarakter Islam berperspektif perempuan.",
      tugas: [
        "Menyelenggarakan kajian berkala mengenai isu kewanitaan dan keputrian",
        "Mengadakan pelatihan keterampilan serta pemberdayaan untuk Ipmawati",
        "Mendampingi serta melindungi pelajar putri dalam ranah sosial sekolah",
        "Membangun jaringan komunikasi aktif antar-pelajar putri di sekolah"
      ],
      ketua: {
        nama: "Salsa Azzahra Ramadhani",
        jabatan: "Ketua Bidang",
        foto: "/anggota/ipmawati/salsa-azzahra-ramadhani.png",
        angkatan: "2024/2025",
        ttl: "Jakarta, 19 September 2008",
        alasan: "karena di IPM aku ngerasa terus berkembang dan jadi lebih berani untuk keluar dari zona nyaman.",
        motivasi: "",
        quote: "you never know unless you go."
      },
      sekretaris: {
        nama: "Seraviana Aminarti",
        jabatan: "Sekretaris Bidang",
        foto: "/anggota/ipmawati/seraviana-aminarti.png",
        angkatan: "",
        ttl: "",
        alasan: "",
        motivasi: "",
        quote: ""
      },
      anggota: [
        {
          nama: "Amelia Putri",
          jabatan: "Anggota",
          foto: "/anggota/ipmawati/amelia-putri.png",
          angkatan: "2025/2026",
          ttl: "Bogor, 6 Juli 2009",
          alasan: "Karena ingin mendapat pengalaman baru, bisa bergaul sama teman dari beda kelas, memperlancar public speaking. ",
          motivasi: "",
          quote: "selalu semangat, jangan jadi pribadi yang gampang menyerah"
        },
        {
          nama: "Nur Octavia",
          jabatan: "Anggota",
          foto: "/anggota/ipmawati/nur-octavia.png",
          angkatan: "2025/2026",
          ttl: "Bogor, 6 Oktober 2009",
          alasan: "Alasan ber-ipm Ingin keluar dari zona nyaman dengan membangun jaringan pertemanan yang positif dan produktif. Motivasi ber-ipm saya ingin mengasah keterampilan public speaking, dan keberanian berpendapat.",
          motivasi: "Ingin mengasah keterampilan public speaking, dan keberanian berpendapat.",
          quote: "Proses tidak pernah mengkhianati hasil, melangkah perlahan lebih baik daripada tidak bergerak sama sekali."
        }
      ]
    }
  ]
};