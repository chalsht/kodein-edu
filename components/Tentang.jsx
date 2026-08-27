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
  FaRobot,
  FaVideo,
  FaMicrochip,
  FaGamepad,
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
    <main
      id="tentang"
      className="relative min-h-screen w-full overflow-hidden bg-white"
    >
      <section className="relative flex min-h-screen items-center px-5 pt-24 pb-10 sm:px-8 lg:px-12">

        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-10 lg:grid-cols-3">

          {/* ================= TENTANG ================= */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700"
            >
              TENTANG KAMI
            </motion.span>

            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] text-slate-900 sm:text-5xl">
              Tentang
              <br />
              <span className="text-blue-600">Kodein Edu Center</span>
            </h1>

            <p className="mt-5 max-w-[430px] text-sm leading-6 text-slate-600">
              Kodein Edu Center hadir sebagai platform pembelajaran digital
              yang membantu siapa saja menguasai teknologi, mengembangkan
              keterampilan, dan siap menghadapi masa depan.
            </p>

            {/* ================= KEUNGGULAN ================= */}
            <div className="mt-7 max-w-[430px] overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_5px_22px_rgba(15,23,42,.06)]">
              <div className="grid min-h-[125px] grid-cols-4">
                {keunggulan.map(([Icon, title, desc, color], i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 25, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.25 + i * 0.12,
                    }}
                    whileHover={{ y: -6 }}
                    className={`flex flex-col items-center justify-center px-1 text-center ${
                      i ? "border-l border-slate-200" : ""
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.12, rotate: 5 }}
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}
                    >
                      <Icon className="text-sm text-white sm:text-base" />
                    </motion.div>

                    <p className="mt-2 text-[8px] font-bold leading-4 text-slate-700 sm:text-[9px]">
                      {title}
                      <br />
                      {desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>


          {/* ================= VISI & MISI ================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-extrabold text-slate-900 sm:text-3xl"
            >
              Visi &amp; Misi
            </motion.h2>

            <div className="mb-5 mt-2 flex gap-1">
              <div className="h-[3px] w-6 rounded-full bg-orange-500" />
              <div className="h-[3px] w-8 rounded-full bg-orange-100" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[.75fr_1.25fr]">

              {/* VISI */}
              <motion.div
                initial={{ opacity: 0, x: -35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5"
              >
                <div className="mb-4 flex items-center gap-3">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600"
                  >
                    <FaEye className="text-white" />
                  </motion.div>

                  <h3 className="font-extrabold text-blue-700">VISI</h3>
                </div>

                <p className="text-[10px] leading-5 text-slate-700 sm:text-[11px]">
                  Menjadi lembaga pendidikan digital terdepan yang mencetak
                  generasi kreatif, inovatif, dan siap menghadapi tantangan
                  dunia teknologi.
                </p>
              </motion.div>


              {/* MISI */}
              <motion.div
                initial={{ opacity: 0, x: 35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-orange-100 bg-orange-50/50 p-5"
              >
                <div className="mb-4 flex items-center gap-3">
                  <motion.div
                    whileHover={{ rotate: -10, scale: 1.1 }}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500"
                  >
                    <FaBullseye className="text-white" />
                  </motion.div>

                  <h3 className="font-extrabold text-orange-600">MISI</h3>
                </div>

                <div className="space-y-3">
                  {misi.map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: 15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.25 + i * 0.1 }}
                      className="flex gap-2"
                    >
                      <FaCheckCircle className="mt-1 shrink-0 text-[10px] text-orange-500" />

                      <p className="text-[9px] leading-4 text-slate-700 sm:text-[10px]">
                        {item}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            </div>
          </motion.div>


          {/* ================= FOTO ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 40 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex min-h-[420px] items-center justify-center"
          >

            {/* Robotik */}
            <motion.div
              animate={{ y: [0, -12, 0], rotate: [0, 6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-[8%] top-[5%] z-20 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-xl shadow-orange-200"
            >
              <FaRobot className="text-2xl" />
            </motion.div>

            {/* Multimedia */}
            <motion.div
              animate={{ y: [0, 10, 0], rotate: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[12%] left-[3%] z-20 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500 text-white shadow-xl shadow-red-200"
            >
              <FaVideo className="text-xl" />
            </motion.div>

            {/* Microchip */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-[8%] top-[25%] z-20 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200"
            >
              <FaMicrochip />
            </motion.div>

            {/* FOTO */}
            <Image
              src="/images/tentang.png"
              alt="Laptop dan buku"
              width={1000}
              height={800}
              priority
              className="relative z-10 w-full max-w-[680px] scale-110 object-contain"
            />

          </motion.div>

        </div>
      </section>
    </main>
  );
}