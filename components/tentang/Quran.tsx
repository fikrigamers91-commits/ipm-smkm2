import { BookMarked } from "lucide-react";

export default function Quran() {
  return (
    <section className="bg-slate-50 py-12 sm:py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-ipm-blue text-white shadow-xl">
            <BookMarked className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>

          <p className="mt-4 sm:mt-6 font-semibold uppercase tracking-[3px] sm:tracking-[5px] text-xs sm:text-sm text-[#00A651]">
            Landasan Al-Quran
          </p>

          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-slate-900">
            QS. Al-Qalam Ayat 1
          </h2>
        </div>

        <div className="mt-8 sm:mt-12 rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-10 shadow-xl border border-slate-100">
          <p className="text-center text-3xl sm:text-5xl leading-loose sm:leading-loose text-ipm-blue font-serif dir-rtl">
            ن ۚ وَالْقَلَمِ وَمَا يَسْطُرُونَ
          </p>

          <p className="mt-6 sm:mt-8 text-center text-base sm:text-xl italic text-slate-600">
            &ldquo;Nun. Demi pena dan apa yang mereka tuliskan.&rdquo;
          </p>

          <div className="my-6 sm:my-8 h-px bg-slate-200" />

          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Makna Ayat
          </h3>

          <div className="mt-4 space-y-4 text-sm sm:text-base leading-relaxed sm:leading-8 text-slate-600">
            <p>
              Ayat ini menunjukkan betapa pentingnya ilmu pengetahuan,
              pendidikan, serta budaya membaca dan menulis dalam kehidupan
              seorang muslim. Pena menjadi simbol lahirnya ilmu yang bermanfaat,
              sedangkan tulisan menjadi sarana menyebarkan kebaikan kepada
              sesama.
            </p>
            <p>
              Sebagai organisasi pelajar Muhammadiyah, PR IPM SMK
              Muhammadiyah 2 Cileungsi menjadikan semangat tersebut sebagai
              dasar dalam membangun pelajar yang gemar belajar, berpikir kritis,
              berakhlak mulia, serta mampu memberikan manfaat bagi sekolah
              maupun masyarakat.
            </p>
          </div>

          <div className="mt-8 rounded-xl sm:rounded-2xl border-l-4 border-[#00A651] bg-ipm-green/5 p-4 sm:p-6">
            <p className="text-sm sm:text-base leading-relaxed text-slate-700">
              <span className="font-bold text-[#00A651]">
                Nilai yang dapat dipetik:
              </span>{" "}
              ilmu merupakan cahaya kehidupan, dan setiap pelajar memiliki
              tanggung jawab untuk terus belajar, berkarya, serta menyebarkan
              manfaat melalui ilmu yang dimilikinya.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}