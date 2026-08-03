"use client";

// ======================================================
// FILE : components/ProgramHome.jsx
// MENAMPILKAN PROGRAM DARI DATABASE
// ======================================================

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";


export default function ProgramHome() {

  // ==========================================
  // STATE
  // ==========================================

  const [program, setProgram] = useState([]);

// ==========================================
// MEMISAHKAN PROGRAM BERDASARKAN KATEGORI
// ==========================================

const programUnggulan = program.filter(

  (item) => item.kategori === "Program Unggulan"

);

const bimbelAkademik = program.filter(

  (item) => item.kategori === "Bimbel Akademik"

);

  // ==========================================
  // AMBIL DATA DARI DATABASE
  // ==========================================

  async function getProgram() {

    const res = await fetch("/api/program");

    const data = await res.json();

    setProgram(data);

  }

  // ==========================================
  // LOAD DATA
  // ==========================================

  useEffect(() => {
    
    getProgram();

  }, []);

  return (

    <section

      id="program"

      className="py-28 bg-slate-50"

    >

      <div className="max-w-7xl mx-auto px-8">

        {/* ===============================
            JUDUL
        =============================== */}

        <div className="text-center mb-20">

          <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-semibold">

            Program Kami

          </span>

          <h2 className="text-5xl font-black text-slate-800 mt-6">

            Pilih Program

            <span className="text-sky-500">

              {" "}Terbaik Untukmu

            </span>

          </h2>

        </div>

        {/* ==========================================
    PROGRAM UNGGULAN
========================================== */}

<h2 className="text-4xl font-bold text-slate-800 mb-10">

  Program Unggulan

</h2>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

  {

    programUnggulan.map((item)=>(

      <motion.div

        key={item.id}

        whileHover={{y:-10}}

        className="bg-white rounded-3xl shadow-lg overflow-hidden"

      >

        <Image

          src={`/images/${item.gambar}`}

          alt={item.nama_program}

          width={500}

          height={300}

          className="w-full h-60 object-cover"

        />

        <div className="p-6">

          <h3 className="text-2xl font-bold">

            {item.nama_program}

          </h3>

          <p className="text-gray-500 mt-3 line-clamp-3">

            {item.deskripsi}

          </p>

          <Link

            href={`/program/${item.id}`}

            className="inline-block mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl"

          >

            Lihat Detail

          </Link>

        </div>

      </motion.div>

    ))

  }

</div>

{/* ==========================================
    BIMBEL AKADEMIK
========================================== */}

<h2 className="text-4xl font-bold text-slate-800 mt-24 mb-10">

  Bimbel Akademik

</h2>

<Swiper

modules={[Navigation,Autoplay]}

navigation

autoplay={{

delay:3000,

disableOnInteraction:false

}}

loop

spaceBetween={25}

breakpoints={{

0:{slidesPerView:1},

768:{slidesPerView:2},

1024:{slidesPerView:3}

}}

>

{

bimbelAkademik.map((item)=>(

<SwiperSlide key={item.id}>

<div className="bg-white rounded-3xl shadow-lg overflow-hidden">

<Image

src={`/images/${item.gambar}`}

alt={item.nama_program}

width={500}

height={300}

className="w-full h-56 object-cover"

/>

<div className="p-6">

<h3 className="text-2xl font-bold">

{item.nama_program}

</h3>

<p className="text-gray-500 mt-3 line-clamp-3">

{item.deskripsi}

</p>

<Link

href={`/program/${item.id}`}

className="inline-block mt-6 bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-xl"

>

Lihat Detail

</Link>

</div>

</div>

</SwiperSlide>

))

}

</Swiper>
              

        

      </div>

    </section>

  );

}