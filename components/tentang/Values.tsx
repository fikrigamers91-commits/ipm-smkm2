import { BookOpen, GraduationCap, Handshake, Rocket } from "lucide-react";

const values = [
  {
    icon: BookOpen,
    title: "Islami",
    desc: "Menjadikan Al-Qur'an dan As-Sunnah sebagai pedoman dalam setiap aktivitas organisasi.",
    color: "text-ipm-blue",
    bg: "bg-ipm-blue/10",
  },
  {
    icon: GraduationCap,
    title: "Berilmu",
    desc: "Mendorong budaya belajar, berpikir kritis, dan terus mengembangkan wawasan.",
    color: "text-[#00A651]",
    bg: "bg-ipm-green/10",
  },
  {
    icon: Handshake,
    title: "Kolaboratif",
    desc: "Mengutamakan kerja sama, saling menghargai, dan semangat gotong royong.",
    color: "text-[#F4C430]",
    bg: "bg-[#F4C430]/15",
  },
  {
    icon: Rocket,
    title: "Berkemajuan",
    desc: "Berani berinovasi serta mampu memberikan manfaat bagi sekolah maupun masyarakat.",
    color: "text-ipm-blue",
    bg: "bg-ipm-blue/10",
  },
];

export default function Values() {
  return (
    <section className="bg-white py-12 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <p className="font-semibold uppercase tracking-[3px] sm:tracking-[5px] text-xs sm:text-sm text-[#00A651]">
            Nilai-Nilai
          </p>

          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-slate-900">
            Nilai yang Kami Junjung
          </h2>

          <p className="mx-auto mt-3 sm:mt-5 max-w-3xl text-sm sm:text-lg text-slate-600">
            Setiap kegiatan dan program kerja PR IPM SMK Muhammadiyah 2
            Cileungsi berlandaskan nilai-nilai yang menjadi identitas pelajar
            Muhammadiyah.
          </p>
        </div>

        <div className="mt-10 sm:mt-16 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div
                  className={`flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl ${item.bg}`}
                >
                  <Icon
                    size={28}
                    className={`${item.color} transition duration-300 group-hover:scale-110`}
                  />
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