import { Target, CheckCircle2 } from "lucide-react";

export default function Purpose() {
  return (
    <section className="bg-slate-50 py-12 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 sm:mb-14 text-center">
          <p className="font-semibold uppercase tracking-[3px] sm:tracking-[5px] text-xs sm:text-sm text-[#00A651]">
            Tujuan IPM
          </p>
          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-slate-900">
            Mengapa IPM Hadir?
          </h2>
        </div>

        <div className="grid items-center gap-8 lg:gap-12 grid-cols-1 lg:grid-cols-[160px_1fr]">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="flex h-28 w-28 sm:h-36 sm:w-36 items-center justify-center rounded-full bg-ipm-blue shadow-lg">
              <Target size={56} className="text-white sm:w-16 sm:h-16" />
            </div>
          </div>

          {/* Content */}
          <div className="rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-10 shadow-xl border border-slate-100">
            <p className="text-base sm:text-xl leading-relaxed sm:leading-10 text-slate-700">
              Terbentuknya pelajar muslim yang{" "}
              <span className="font-bold text-ipm-blue">berilmu,</span>{" "}
              <span className="font-bold text-[#00A651]">berakhlak mulia,</span>{" "}
              serta{" "}
              <span className="font-bold text-[#F4C430]">terampil</span> dalam
              rangka menegakkan dan menjunjung tinggi nilai-nilai ajaran Islam
              sehingga terwujud masyarakat Islam yang sebenar-benarnya.
            </p>

            <div className="mt-8 sm:mt-10 grid gap-4 grid-cols-1 sm:grid-cols-3 pt-6 border-t border-slate-100">
              {["Berilmu", "Berakhlak Mulia", "Terampil"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="text-[#00A651] shrink-0" size={20} />
                  <span className="font-semibold text-slate-800 text-sm sm:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}