"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaBookOpen,
  FaRocket,
  FaTrophy,
  FaEye,
  FaBullseye,
  FaCheckCircle,
} from "react-icons/fa";

export default function Tentang() {
  const keunggulan = [
    [FaGraduationCap, "Pembelajaran", "Berkualitas", "blue"],
    [FaBookOpen, "Metode","Interaktif", "orange"],
    [FaRocket, "Kurikulum", "Up-to-date", "red"],
    [FaTrophy, "Sertifikat untuk", "Setiap Prestasi", "blue"],
  ];

  const misi = [
    "Menyediakan program belajar berkualitas dan terjangkau",
    "Menggunakan metode belajar yang interaktif",
    "Mendorong siswa untuk berinovasi dan berkarya",
    "Membekali siswa dengan keterampilan digital yang relevan",
  ];

  return (
    <section className="bg-white px-4 sm:px-6 py-6 lg:py-10">
      <div className="max-w-[1480px] mx-auto rounded-[26px] bg-white shadow-[0_8px_35px_rgba(15,23,42,.07)] overflow-hidden">
        
        <div className="grid lg:grid-cols-[.9fr_1.15fr_.8fr] gap-8 items-center px-6 lg:px-12 py-10">

          {/* TENTANG */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-bold">
              TENTANG KAMI
            </span>

            <h1 className="mt-4 text-4xl lg:text-[40px] font-extrabold leading-[1.1] text-slate-900">
              Tentang
              <br />
              <span className="text-blue-600">Kodein Edu Center</span>
            </h1>

            <p className="mt-5 max-w-[400px] text-sm leading-6 text-slate-600">
              Kodein Edu Center hadir sebagai platform pembelajaran digital
              yang bertujuan membantu siapa saja untuk menguasai teknologi,
              mengembangkan keterampilan, dan siap menghadapi masa depan.
            </p>

            {/* KEUNGGULAN */}
            <div className="mt-6 rounded-2xl bg-white border border-slate-100 shadow-[0_5px_22px_rgba(15,23,42,.06)]">
              <div className="grid grid-cols-4 h-[145px]">
                {keunggulan.map(([Icon, title, desc, color], i) => (
                  <div
                    key={title}
                    className={`flex flex-col items-center justify-center text-center px-2 ${
                      i ? "border-l border-slate-200" : ""
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        color === "blue"
                          ? "bg-blue-600"
                          : color === "orange"
                          ? "bg-orange-500"
                          : "bg-red-500"
                      }`}
                    >
                      <Icon className="text-white" />
                    </div>

                    <p className="mt-3 text-[9px] font-bold leading-4 text-slate-700">
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
          >
            <h2 className="text-2xl font-extrabold text-slate-900">
              Visi &amp; Misi
            </h2>

            <div className="mt-2 mb-4 w-10 h-[3px] bg-orange-500 rounded-full" />

            <div className="grid sm:grid-cols-[.75fr_1.25fr] gap-3">
              
              {/* VISI */}
              <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                    <FaEye className="text-white" />
                  </div>
                  <h3 className="font-extrabold text-blue-700">VISI</h3>
                </div>

                <p className="text-[10px] leading-5 text-slate-700">
                  Menjadi lembaga pendidikan digital terdepan yang mencetak
                  generasi kreatif, inovatif, dan siap menghadapi tantangan
                  dunia teknologi.
                </p>
              </div>

              {/* MISI */}
              <div className="rounded-2xl border border-orange-100 bg-orange-50/50 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                    <FaBullseye className="text-white" />
                  </div>
                  <h3 className="font-extrabold text-orange-600">MISI</h3>
                </div>

                <div className="space-y-3">
                  {misi.map((item) => (
                    <div key={item} className="flex gap-2">
                      <FaCheckCircle className="mt-1 flex-shrink-0 text-orange-500 text-[10px]" />
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
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <Image
              src="/images/about.png"
              alt="Kodein Edu Center"
              width={700}
              height={520}
              priority
              className="
                w-full
                max-w-[420px]
                h-auto
                object-contain
                mix-blend-multiply
              "
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}