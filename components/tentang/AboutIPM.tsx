"use client";

import Image from "next/image";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function AboutIPM() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section ref={ref} className="bg-white py-12 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-semibold uppercase tracking-[3px] sm:tracking-[5px] text-xs sm:text-sm text-ipm-green">
            Tentang Kami
          </p>
          <h2 className="mt-3 text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            PR IPM SMK Muhammadiyah 2 Cileungsi
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 sm:w-24 rounded-full bg-linear-to-r from-[#005BAC] via-[#00A651] to-[#F4C430]" />
        </div>

        {/* Content */}
        <div className="mt-12 sm:mt-16 md:mt-20 grid items-center gap-8 sm:gap-12 lg:grid-cols-2">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="rounded-3xl sm:rounded-[40px] bg-[#F8FCFF] p-6 sm:p-10 md:p-12 shadow-xl border border-slate-100">
              <Image
                src="/logo/logo-ipm.png"
                alt="Logo IPM"
                width={220}
                height={220}
                className="w-44 h-44 sm:w-60 sm:h-60 object-contain drop-shadow-xl"
              />
            </div>
          </div>

          {/* Text */}
          <div className="text-slate-600 text-base sm:text-lg leading-relaxed sm:leading-8 space-y-4">
            <p>
            Ikatan Pelajar Muhammadiyah adalah organisasi otonom Muhammadiyah yang merupakan gerakan Islam, dakwah amar ma’ruf nahi mungkar di kalangan pelajar, berakidah Islam dan bersumber pada Al-Qur’an dan Al-Sunnah. IPM saat ini terdapat di 34 provinsi se-Indonesia. IPM memiliki lambang organisasi berupa segi lima berbentuk pena yang berwarna hijau yang berarti keabadian dan keilahian, bergambar matahari berwarna kuning (melambangkan ortom Muhammadiyah dan keangungan) dan buku ditengahnya berwarna putih (melambangkan pengetahuan dan kesucian). Pada bulatan matahari terdapat tulisan Nuu Wal Qalami Wamaa Yasthuruun (demi pena dan apa yang dituliskannya) yang merupakan semboyan IPM.
            </p>
            <p>
            Latar belakang berdirinya IPM tidak terlepas dari latar belakang berdirinya Muhammadiyah. Didirikannya IPM  diperlukan Muhammadiyah untuk mendukung misi Muhammadiyah  di tengah situasi dan kondisi politik Indonesia masa Orde Lama yang sedemikan berat dan sulit. Rintisan pendirian organisasi pelajar Muhammadiyah tahun 1985 di Garut ditetapkan bahwa organisasi Pelajar Muhammadiyah berada dalam pengawasan Pemuda Muhammadiyah.
            </p>
          </div>
        </div>

        {/* Statistik */}
        <div className="mt-16 sm:mt-20 md:mt-24 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3">
          {[
            { value: 47, title: "Anggota Aktif", color: "#005BAC" },
            { value: 8, title: "Bidang", color: "#00A651" },
            { value: 57, title: "Program Kerja", color: "#F4C430" },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl sm:rounded-[30px] bg-[#F8FCFF] p-6 sm:p-8 text-center shadow-md transition hover:-translate-y-2 hover:shadow-xl border border-slate-100"
            >
              <h3
                className="text-4xl sm:text-5xl font-black"
                style={{ color: item.color }}
              >
                {inView && <CountUp end={item.value} duration={2} separator="," />}
              </h3>
              <p className="mt-2 text-sm sm:text-base font-medium text-slate-600">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}