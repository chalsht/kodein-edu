"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaGraduationCap, FaBookOpen, FaRocket, FaTrophy,
  FaEye, FaBullseye, FaCheckCircle, FaRobot, FaVideo, FaMicrochip
} from "react-icons/fa";

export default function Tentang() {
  const keunggulan = [
    [FaGraduationCap, "Pembelajaran", "Berkualitas", "bg-blue-600"],
    [FaBookOpen, "Metode", "Interaktif", "bg-orange-500"],
    [FaRocket, "Kurikulum", "Up-to-date", "bg-red-500"],
    [FaTrophy, "Sertifikat", "Setiap Prestasi", "bg-blue-600"],
  ];

  const misi = [
    "Menyediakan program belajar berkualitas dan terjangkau",
    "Menggunakan metode belajar yang interaktif dan menyenangkan",
    "Mendorong siswa untuk berinovasi dan berkarya",
    "Membekali siswa dengan keterampilan digital yang relevan",
  ];

  return (
    <main id="tentang" className="min-h-screen overflow-hidden bg-white">
      <section className="flex min-h-[calc(100vh-70px)] items-center px-6 py-10 sm:px-10 lg:px-14">
        <div className="mx-auto grid w-full max-w-[1450px] items-center gap-10 lg:grid-cols-[1.05fr_1fr_1.15fr]">

          {/* TENTANG */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:pt-8"
          >
            <h1 className="text-5xl font-extrabold leading-[1.02] text-slate-900 xl:text-6xl">
              Tentang
              <br />
              <span className="text-blue-600">
                Kodein Edu Center
              </span>
            </h1>

            <p className="mt-5 max-w-[500px] text-base leading-7 text-slate-600 xl:text-[17px]">
              Kodein Edu Center hadir sebagai platform pembelajaran digital
              yang membantu siapa saja menguasai teknologi, mengembangkan
              keterampilan, dan siap menghadapi masa depan.
            </p>

            <div className="mt-7 max-w-[500px] overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
              <div className="grid min-h-[135px] grid-cols-4">
                {keunggulan.map(([Icon, title, desc, color], i) => (
                  <div
                    key={title}
                    className={`flex flex-col items-center justify-center text-center ${
                      i ? "border-l border-slate-200" : ""
                    }`}
                  >
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-lg ${color}`}
                    >
                      <Icon className="text-white" />
                    </div>

                    <p className="mt-2 text-[10px] font-bold leading-4 text-slate-700">
                      {title}
                      <br />
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* VISI MISI */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:pt-8"
          >
            <h2 className="text-3xl font-extrabold text-slate-900 xl:text-4xl">
              Visi & Misi
            </h2>

            <div className="my-3 flex gap-1">
              <div className="h-[3px] w-7 rounded-full bg-orange-500" />
              <div className="h-[3px] w-9 rounded-full bg-orange-100" />
            </div>

            <div className="space-y-4">

              {/* VISI */}
              <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600">
                    <FaEye className="text-white" />
                  </div>

                  <h3 className="text-lg font-extrabold text-blue-700">
                    VISI
                  </h3>
                </div>

                <p className="text-[11px] leading-5 text-slate-700">
                  Menjadi lembaga pendidikan digital terdepan yang mencetak
                  generasi kreatif, inovatif, dan siap menghadapi tantangan
                  dunia teknologi.
                </p>
              </div>

              {/* MISI */}
              <div className="rounded-2xl border border-orange-100 bg-orange-50/50 p-5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500">
                    <FaBullseye className="text-white" />
                  </div>

                  <h3 className="text-lg font-extrabold text-orange-600">
                    MISI
                  </h3>
                </div>

                <div className="space-y-3">
                  {misi.map((item) => (
                    <div key={item} className="flex gap-2">
                      <FaCheckCircle className="mt-1 shrink-0 text-[10px] text-orange-500" />

                      <p className="text-[10px] leading-4 text-slate-700">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>

          {/* FOTO */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative flex items-center justify-center lg:pt-8"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute right-[5%] top-[5%] z-20 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg"
            >
              <FaRobot />
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity }}
              className="absolute bottom-[8%] left-[3%] z-20 flex h-11 w-11 items-center justify-center rounded-xl bg-red-500 text-white shadow-lg"
            >
              <FaVideo />
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity }}
              className="absolute left-[6%] top-[20%] z-20 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg"
            >
              <FaMicrochip />
            </motion.div>

            <Image
              src="/images/tentang.png"
              alt="Laptop dan buku"
              width={1000}
              height={800}
              priority
              className="relative z-10 w-full max-w-[620px] object-contain"
            />
          </motion.div>

        </div>
      </section>
    </main>
  );
}