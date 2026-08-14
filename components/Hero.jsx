"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { FiCpu, FiMonitor, FiAward, FiUsers } from "react-icons/fi";

export default function Hero() {
  const keunggulan = [
    { icon: FiCpu, warna: "text-orange-500", judul: "Praktis", deskripsi: "dan Seru" },
    { icon: FiMonitor, warna: "text-sky-500", judul: "Berbasis", deskripsi: "Proyek Nyata" },
    { icon: FiAward, warna: "text-red-500", judul: "Mentor", deskripsi: "Berpengalaman" },
    { icon: FiUsers, warna: "text-orange-500", judul: "Siap Hadapi", deskripsi: "Dunia Digital" },
  ];

  return (
    <section
      id="home"
      className="
        relative min-h-0 lg:min-h-screen
        flex items-center overflow-hidden
        bg-white pt-24 sm:pt-28 pb-14 lg:pb-16
      "
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="
            absolute -top-32 -right-32
            w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80
            rounded-full bg-orange-100 blur-2xl
          "
        />

        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="
            absolute bottom-0 -left-32
            w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80
            rounded-full bg-sky-100 blur-2xl
          "
        />

        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="
            absolute top-32 left-[45%]
            w-6 h-6 sm:w-8 sm:h-8
            rounded-full bg-red-400/30
          "
        />
      </div>

      {/* CONTAINER */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-20 items-center">

          {/* KIRI */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            {/* BADGE */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="
                inline-flex items-center gap-2
                bg-sky-50 border border-sky-100
                text-sky-600 px-4 sm:px-5 py-2 sm:py-2.5
                rounded-full font-semibold shadow-sm text-sm sm:text-base
              "
            >
              <span className="animate-pulse">🚀</span>
              Kodein Edu Center
            </motion.div>

            {/* JUDUL */}
            <h1
              className="
                mt-5 sm:mt-6
                text-4xl sm:text-5xl lg:text-6xl
                font-black leading-[1.08]
                text-slate-800
              "
            >
              Belajar
              <span className="text-orange-500"> Coding </span>
              Lebih Mudah
              <br />
              Bersama Mentor
              <span className="text-red-500"> Profesional</span>
            </h1>

            {/* GARIS */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 90 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="h-1.5 bg-orange-500 rounded-full mt-5 sm:mt-6"
            />

            {/* DESKRIPSI */}
            <p
              className="
                mt-5 max-w-xl
                text-gray-600 text-sm sm:text-base md:text-lg
                leading-6 sm:leading-7 md:leading-8
              "
            >
              Kodein Edu Center membantu siswa mempelajari dunia
              pemrograman, robotik, desain, dan teknologi digital
              melalui pembelajaran yang interaktif, menyenangkan,
              dan berbasis proyek.
            </p>

            {/* KEUNGGULAN */}
            <div className="mt-6 sm:mt-7 border-t border-slate-200 pt-5 sm:pt-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
                {keunggulan.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.judul}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="flex flex-col items-center text-center"
                    >
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        className={`${item.warna} text-3xl md:text-4xl mb-2`}
                      >
                        <Icon />
                      </motion.div>

                      <h4 className="font-bold text-slate-800 text-xs sm:text-sm uppercase">
                        {item.judul}
                      </h4>

                      <p className="text-xs sm:text-sm text-gray-500">
                        {item.deskripsi}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* BUTTON */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-9">
              <motion.a
                href="#program"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="
                  bg-orange-500 hover:bg-orange-600
                  text-white px-7 sm:px-8 py-3.5 sm:py-4
                  rounded-xl flex items-center justify-center
                  gap-3 shadow-lg shadow-orange-200
                  transition duration-300 font-bold
                "
              >
                Jelajahi Program
                <FaArrowRight />
              </motion.a>

              <motion.a
                href="/pendaftaran"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="
                  bg-sky-500 hover:bg-sky-600
                  text-white px-7 sm:px-8 py-3.5 sm:py-4
                  rounded-xl flex items-center justify-center
                  gap-3 shadow-lg shadow-sky-200
                  transition duration-300 font-bold
                "
              >
                <FaCheckCircle />
                Daftar Sekarang
              </motion.a>
            </div>
          </motion.div>

          {/* KANAN */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="
              relative flex justify-center items-center
              w-full mt-8 lg:mt-0
              min-h-[350px] sm:min-h-[450px] lg:min-h-[500px]
            "
          >
            {/* LINGKARAN UTAMA */}
            <motion.div
              animate={{ scale: [1, 1.03, 1] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                w-60 h-60
                sm:w-72 sm:h-72
                md:w-80 md:h-80
                lg:w-[390px] lg:h-[390px]
                rounded-full bg-orange-100
              "
            />

            {/* LINGKARAN BIRU */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute top-2 right-[5%] sm:right-[8%] lg:right-0
                w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32
                rounded-full bg-sky-200
              "
            />

            {/* LINGKARAN MERAH */}
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute bottom-4 left-[5%] sm:left-[8%] lg:left-0
                w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20
                rounded-full bg-red-200
              "
            />

            {/* GAMBAR KODEIN */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 w-full flex justify-center"
            >
              <Image
                src="/images/kodein.png"
                alt="Kodein Edu Center"
                width={500}
                height={500}
                priority
                className="
                  w-full
                  max-w-[280px]
                  sm:max-w-sm
                  md:max-w-md
                  lg:max-w-[500px]
                  xl:max-w-[540px]
                  h-auto
                  rounded-[2rem]
                  shadow-2xl
                  border-4 border-white
                "
              />
            </motion.div>

            {/* CARD 1 */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute z-20
                left-0 sm:left-2 lg:left-0
                top-8 sm:top-12
                scale-[0.78] sm:scale-90 md:scale-100
                origin-left
                bg-white rounded-2xl shadow-xl
                px-3 sm:px-4 py-2.5 sm:py-3
                flex items-center gap-2 sm:gap-3
                border border-slate-100
              "
            >
              <div className="
                w-9 h-9 sm:w-10 sm:h-10
                rounded-xl bg-orange-100 text-orange-500
                flex items-center justify-center shrink-0
              ">
                <FiCpu className="text-lg sm:text-xl" />
              </div>

              <div>
                <p className="font-bold text-slate-800 text-xs sm:text-sm whitespace-nowrap">
                  Belajar Teknologi
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500">
                  Berbasis proyek
                </p>
              </div>
            </motion.div>

            {/* CARD 2 */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute z-20
                right-0 sm:right-2 lg:right-0
                bottom-8 sm:bottom-12
                scale-[0.78] sm:scale-90 md:scale-100
                origin-right
                bg-white rounded-2xl shadow-xl
                px-3 sm:px-4 py-2.5 sm:py-3
                flex items-center gap-2 sm:gap-3
                border border-slate-100
              "
            >
              <div className="
                w-9 h-9 sm:w-10 sm:h-10
                rounded-xl bg-sky-100 text-sky-500
                flex items-center justify-center shrink-0
              ">
                <FiAward className="text-lg sm:text-xl" />
              </div>

              <div>
                <p className="font-bold text-slate-800 text-xs sm:text-sm whitespace-nowrap">
                  Mentor Profesional
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500">
                  Siap membimbing
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}