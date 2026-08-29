"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaArrowRight,
  FaLaptopCode,
  FaProjectDiagram,
  FaUserTie,
  FaGlobe,
} from "react-icons/fa";

export default function Hero() {
  const keunggulan = [
    [FaLaptopCode, "Praktis", "dan Seru", "bg-blue-600"],
    [FaProjectDiagram, "Berbasis Proyek", "Nyata", "bg-orange-500"],
    [FaUserTie, "Mentor", "Berpengalaman", "bg-red-500"],
    [FaGlobe, "Siap Hadapi", "Dunia Digital", "bg-blue-600"],
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-white pt-20 sm:pt-24 lg:pt-16"
    >
      {/* Dekorasi */}
      <div className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-blue-50 sm:h-96 sm:w-96 lg:h-[430px] lg:w-[430px]" />

      <div className="absolute left-1/2 top-28 hidden lg:block">
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className="h-1 w-1 rounded-full bg-blue-600" />
          ))}
        </div>
      </div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute right-5 top-36 h-8 w-8 rounded-full bg-orange-500"
      />

      <div className="absolute right-4 top-64 hidden h-7 w-7 rounded-full border-[5px] border-blue-600 lg:block" />

      <div className="absolute -left-24 bottom-0 h-44 w-44 rounded-full bg-orange-500" />
      <div className="absolute -left-20 bottom-0 h-20 w-48 rotate-12 bg-red-500" />
      <div className="absolute -right-20 bottom-0 h-40 w-[420px] rounded-t-[100%] bg-blue-600" />

      {/* Container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid min-h-[calc(100vh-80px)] items-center gap-6 lg:grid-cols-2 lg:gap-0">

          {/* Kiri */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-20"
          >
            <h1 className="max-w-2xl text-4xl font-black leading-[1.08] text-[#101b3d] sm:text-5xl lg:text-[52px]">
              Belajar Koding,
              <br />
              <span className="text-orange-500">Bangun Masa Depan</span>
              <br />
              Bersama
              <br />
              <span className="text-blue-600">Kodein Edu Center</span>
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
              Tempat terbaik untuk belajar teknologi, koding, dan
              pengembangan diri dengan cara yang seru dan menyenangkan.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <motion.a
                href="#program"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-3 rounded-lg bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
              >
                Jelajahi Program <FaArrowRight />
              </motion.a>

              <motion.a
                href="/pendaftaran"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-3 rounded-lg bg-red-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-500/20 hover:bg-red-600"
              >
                Daftar Sekarang <FaArrowRight />
              </motion.a>
            </div>

            {/* Keunggulan */}
            <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {keunggulan.map(([Icon, title, desc, color], i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white ${color}`}
                  >
                    <Icon />
                  </div>

                  <div className="leading-tight">
                    <p className="text-[10px] font-bold text-[#101b3d]">
                      {title}
                    </p>
                    <p className="text-[10px] font-semibold text-[#101b3d]">
                      {desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Kanan */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex min-h-[380px] items-center justify-center sm:min-h-[450px] lg:min-h-[560px]"
          >
            <div className="absolute right-0 top-1/2 h-[320px] w-[320px] -translate-y-1/2 rounded-full bg-blue-50 sm:h-[420px] sm:w-[420px] lg:h-[500px] lg:w-[500px]" />

            {/* Bubble */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute left-4 top-24 z-20 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-xl font-black text-white shadow-lg sm:left-8 sm:h-14 sm:w-14 lg:top-28"
            >
              {"{}"}
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity }}
              className="absolute right-2 top-20 z-20 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-xl font-black text-white shadow-lg sm:right-4 sm:h-16 sm:w-16 lg:top-24"
            >
              {"</>"}
            </motion.div>

            {/* Titik */}
            <div className="absolute bottom-24 left-2 hidden sm:block">
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 12 }).map((_, i) => (
                  <span key={i} className="h-1 w-1 rounded-full bg-blue-500" />
                ))}
              </div>
            </div>

            {/* Diamond */}
            <motion.div
              animate={{ rotate: [0, 90, 180, 270, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute left-14 top-64 z-20 h-3 w-3 rotate-45 bg-orange-500 sm:left-20 sm:top-72"
            />

            {/* Foto */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative z-10 w-full max-w-[560px] sm:max-w-[620px] lg:max-w-[650px]"
            >
              <Image
                src="/images/coding.png"
                alt="Siswa sedang belajar coding"
                width={700}
                height={700}
                priority
                className="h-auto w-full object-contain"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}