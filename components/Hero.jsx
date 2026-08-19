"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { FiCpu, FiMonitor, FiAward, FiUsers } from "react-icons/fi";

export default function Hero() {
  const keunggulan = [
    [FiCpu, "PRAKTIS", "dan Seru", "text-orange-500"],
    [FiMonitor, "BERBASIS", "Proyek Nyata", "text-sky-500"],
    [FiAward, "MENTOR", "Berpengalaman", "text-red-500"],
    [FiUsers, "SIAP HADAPI", "Dunia Digital", "text-orange-500"],
  ];

  return (
    <section
      id="home"
      className="min-h-screen bg-white flex items-center pt-20 pb-10"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* ================= KIRI ================= */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Judul */}
            <h1 className="mt-6 text-5xl md:text-6xl lg:text-[64px] font-black leading-[1.03] text-slate-800">
              Belajar{" "}
              <span className="text-orange-500">Coding</span>
              <br />
              Lebih Mudah
              <br />
              Bersama Mentor{" "}
              <span className="text-red-500">Profesional</span>
            </h1>

            {/* Garis */}
            <div className="w-16 h-1.5 bg-orange-500 rounded-full mt-6" />

            {/* Deskripsi */}
            <p className="mt-6 max-w-xl text-gray-500 leading-7">
              Kodein Edu Center membantu siswa mempelajari dunia
              pemrograman, robotik, desain, dan teknologi digital melalui
              pembelajaran yang interaktif, menyenangkan, dan berbasis proyek.
            </p>

            {/* Keunggulan */}
            <div className="border-t border-gray-200 mt-7 pt-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                {keunggulan.map(([Icon, title, desc, color]) => (
                  <div key={title} className="text-center">
                    <Icon className={`text-3xl mx-auto mb-2 ${color}`} />

                    <h4 className="font-bold text-xs sm:text-sm text-slate-800">
                      {title}
                    </h4>

                    <p className="text-xs sm:text-sm text-gray-500">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ================= BUTTON ================= */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">

              {/* Jelajahi Program - BIRU */}
              <motion.a
                href="#program"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="
                  bg-sky-500
                  hover:bg-sky-600
                  text-white
                  px-7
                  py-3.5
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  gap-3
                  font-bold
                  shadow-md
                  transition
                "
              >
                Jelajahi Program
                <FaArrowRight />
              </motion.a>

              {/* Daftar Sekarang - ORANGE */}
              <motion.a
                href="/pendaftaran"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="
                  bg-orange-500
                  hover:bg-orange-600
                  text-white
                  px-7
                  py-3.5
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  gap-3
                  font-bold
                  shadow-md
                  transition
                "
              >
                <FaCheckCircle />
                Daftar Sekarang
              </motion.a>

            </div>
          </motion.div>


          {/* ================= KANAN ================= */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center items-center w-full"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="w-full flex justify-center"
            >
              <Image
                src="/images/kodein.png"
                alt="Kodein Edu Center"
                width={700}
                height={700}
                priority
                className="
                  w-full
                  max-w-[650px]
                  lg:max-w-[700px]
                  xl:max-w-[750px]
                  h-auto
                  object-contain
                "
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}