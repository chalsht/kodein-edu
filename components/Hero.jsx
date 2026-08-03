"use client";

// =====================================================
// HERO SECTION
// =====================================================

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import {
  FiCpu,
  FiMonitor,
  FiAward,
  FiUsers,
} from "react-icons/fi";
export default function Hero() {

  return (

<section
  id="home"
  className="min-h-screen flex items-center bg-white pt-24 pb-10"
>
  <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 w-full">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ===================================
              BAGIAN KIRI
          =================================== */}

          <motion.div

            initial={{ opacity:0, x:-60 }}

            animate={{ opacity:1, x:0 }}

            transition={{ duration:0.8 }}

          >

            {/* Badge */}

            <span className="bg-sky-100 text-sky-600 px-5 py-2 rounded-full font-semibold">

              🚀 Kodein Edu Center

            </span>

            {/* Judul */}

            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-slate-800">

              Belajar

              <span className="text-orange-500">

                {" "}Coding{" "}

              </span>

              Lebih Mudah

              <br />

              Bersama Mentor

              <span className="text-red-500">

                {" "}Profesional

              </span>

            </h1>

           {/* Deskripsi */}

<p className="mt-5 max-w-xl text-gray-600 text-base md:text-lg leading-7 md:leading-8">

  Kodein Edu Center membantu siswa mempelajari dunia
  pemrograman, robotik, desain, dan teknologi digital
  melalui pembelajaran yang interaktif, menyenangkan,
  dan berbasis proyek.

</p>

{/* Keunggulan */}
<div className="mt-4 border-t border-gray-200 pt-5">

  <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-center">

    <div className="flex flex-col items-center">
      <FiCpu className="text-3xl md:text-4xl text-indigo-600" />
      <h4 className="font-bold text-slate-800 text-sm uppercase">
        Praktis
      </h4>
      <p className="text-sm text-gray-500">
        dan Seru
      </p>
    </div>

    <div className="flex flex-col items-center">
      <FiMonitor className="text-3xl md:text-4xl text-orange-500" />
      <h4 className="font-bold text-slate-800 text-sm uppercase">
        Berbasis
      </h4>
      <p className="text-sm text-gray-500">
        Proyek Nyata
      </p>
    </div>

    <div className="flex flex-col items-center">
      <FiAward className="text-3xl md:text-4xl text-indigo-600" />
      <h4 className="font-bold text-slate-800 text-sm uppercase">
        Mentor
      </h4>
      <p className="text-sm text-gray-500">
        Berpengalaman
      </p>
    </div>

    <div className="flex flex-col items-center">
      <FiUsers className="text-3xl md:text-4xl text-orange-500" />
      <h4 className="font-bold text-slate-800 text-sm uppercase">
        Siap Hadapi
      </h4>
      <p className="text-sm text-gray-500">
        Dunia Digital
      </p>
    </div>

  </div>

</div>
{/* Tombol */}

<div className="flex flex-col sm:flex-row gap-4 mt-8">

  <a
    href="#program"
    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl flex items-center gap-3 shadow-lg hover:shadow-orange-300 duration-300"
  >
    Jelajahi Program
    <FaArrowRight />
  </a>

  <a
    href="/pendaftaran"
    className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-sky-300 duration-300"
  >
    Daftar Sekarang
  </a>

</div>
          </motion.div>

          {/* ===================================
              BAGIAN KANAN
          =================================== */}

          <motion.div

            initial={{ opacity:0, x:60 }}

            animate={{ opacity:1, x:0 }}

            transition={{ duration:1 }}

            className="relative flex justify-center mt-10 lg:mt-0"

          >

            {/* Lingkaran */}

          <div className="absolute w-64 h-64 md:w-80 md:h-80 lg:w-[360px] lg:h-[360px] rounded-full bg-orange-100"></div>

            <div className="absolute top-8 right-0 w-24 h-24 md:w-32 md:h-32 rounded-full bg-sky-200"></div>

            <div className="absolute bottom-4 left-0 w-16 h-16 md:w-20 md:h-20 rounded-full bg-red-200"></div>

            {/* Gambar */}

<Image
  src="/images/tentang.jpeg"
  alt="Kodein Edu Center"
  width={450}
  height={450}
  priority
  className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto rounded-3xl shadow-2xl"
/>

          </motion.div>

        </div>

      </div>

    </section>

  );

}