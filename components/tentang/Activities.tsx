import {
  GraduationCap,
  BookOpen,
  Megaphone,
  HeartHandshake,
  Trophy,
  Users,
} from "lucide-react";

const activities = [
  {
    icon: GraduationCap,
    title: "Perkaderan",
    desc: "Membentuk karakter dan kepemimpinan pelajar melalui berbagai kegiatan kaderisasi.",
    color: "bg-ipm-blue/10 text-ipm-blue",
  },
  {
    icon: BookOpen,
    title: "Keilmuan",
    desc: "Mendorong budaya literasi, diskusi, kajian, dan pengembangan wawasan.",
    color: "bg-ipm-green/10 text-[#00A651]",
  },
  {
    icon: Megaphone,
    title: "Media & Informasi",
    desc: "Menyebarkan informasi kegiatan melalui media sosial dan platform digital.",
    color: "bg-[#F4C430]/15 text-[#F4C430]",
  },
  {
    icon: HeartHandshake,
    title: "Dakwah & Sosial",
    desc: "Menanamkan nilai Islami melalui kajian, aksi sosial, dan kepedulian sesama.",
    color: "bg-ipm-blue/10 text-ipm-blue",
  },
  {
    icon: Trophy,
    title: "Prestasi",
    desc: "Mengembangkan potensi pelajar melalui lomba, olahraga, seni, dan kreativitas.",
    color: "bg-ipm-green/10 text-[#00A651]",
  },
  {
    icon: Users,
    title: "Kolaborasi",
    desc: "Membangun kerja sama dengan sekolah, ortom Muhammadiyah, dan masyarakat.",
    color: "bg-[#F4C430]/15 text-[#F4C430]",
  },
];

export default function Activities() {
  return (
    <section className="bg-white py-12 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <p className="font-semibold uppercase tracking-[3px] sm:tracking-[5px] text-xs sm:text-sm text-ipm-green">
            Aktivitas Kami
          </p>

          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-slate-900">
            Apa yang Dilakukan IPM?
          </h2>

          <p className="mx-auto mt-3 sm:mt-5 max-w-3xl text-sm sm:text-lg text-slate-600">
            PR IPM SMK Muhammadiyah 2 Cileungsi menghadirkan berbagai program
            yang mendukung pembentukan pelajar Islami, berprestasi, kreatif,
            serta berjiwa kepemimpinan.
          </p>
        </div>

        <div className="mt-10 sm:mt-16 grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {activities.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-ipm-blue/20 hover:shadow-xl"
              >
                <div
                  className={`flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl ${item.color}`}
                >
                  <Icon size={28} />
                </div>

                <h3 className="mt-5 text-xl sm:text-2xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm sm:text-base leading-relaxed sm:leading-7 text-slate-600">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}