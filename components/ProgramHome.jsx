"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import {
  FaArrowLeft, FaArrowRight, FaVideo, FaCode, FaRobot,
  FaLanguage, FaBookOpen, FaAtom, FaFlask, FaCalculator
} from "react-icons/fa";
import "swiper/css";

const icons = [FaVideo, FaCode, FaRobot];
const bIcons = [FaLanguage, FaBookOpen, FaAtom, FaFlask, FaCalculator];
const colors = ["text-blue-600", "text-red-500", "text-orange-500"];
const backs = ["bg-blue-600", "bg-red-500", "bg-orange-500"];

export default function ProgramHome() {
  const [program, setProgram] = useState([]);

  useEffect(() => {
    fetch("/api/program")
      .then((r) => r.ok ? r.json() : [])
      .then((d) => setProgram(Array.isArray(d) ? d : []))
      .catch(() => setProgram([]));
  }, []);

  const unggulan = program.filter(
    (x) => x.kategori === "Program Unggulan"
  );

  const bimbel = program.filter(
    (x) => x.kategori === "Bimbel Akademik"
  );

  return (
    <main className="min-h-screen bg-white pt-28 pb-20 overflow-hidden">

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative text-center max-w-6xl mx-auto px-6 mb-20"
      >
        <span className="text-blue-600 font-bold tracking-widest">
          PROGRAM KAMI
        </span>

        <div className="flex justify-center gap-2 my-5">
          <i className="w-10 h-1 bg-blue-600" />
          <i className="w-6 h-1 bg-orange-500" />
          <i className="w-6 h-1 bg-red-500" />
        </div>

        <h1 className="text-5xl md:text-6xl font-black text-slate-950">
          Program Terbaik untuk{" "}
          <span className="text-blue-600">Masa</span>{" "}
          <span className="text-orange-500">Depan</span>
        </h1>

        <p className="max-w-2xl mx-auto mt-6 text-slate-600 leading-7">
          Kodein Edu Center menyediakan berbagai program berkualitas
          untuk membekali kamu dengan skill dan pengetahuan terbaik.
        </p>

        <motion.div
          animate={{ y: [0, -10, 0], rotate: [45, 50, 45] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute left-0 top-10 w-10 h-10 border-4 border-blue-500 opacity-20"
        />

        <motion.div
          animate={{ y: [0, 10, 0], rotate: [10, -5, 10] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute right-0 bottom-0 w-10 h-10 bg-orange-400 opacity-20"
        />
      </motion.section>


      {/* PROGRAM UNGGULAN */}
      <Title
        title="PROGRAM"
        highlight="UNGGULAN"
        desc="Program berbasis teknologi untuk membekali kamu dengan keterampilan masa depan."
        color="blue"
      />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6 mb-24">
        {unggulan.slice(0, 3).map((item, i) => (
          <Card key={item.id} item={item} i={i} />
        ))}
      </div>


      {/* BIMBEL AKADEMIK */}
      <Title
        title="BIMBEL"
        highlight="AKADEMIK"
        desc="Program pendamping sekolah untuk membantu meningkatkan pemahaman dan prestasi belajar."
        color="red"
      />

      <div className="max-w-7xl mx-auto px-6 relative">

        <button className="bprev absolute z-20 left-[-5px] top-1/2 -translate-y-1/2
          w-11 h-11 bg-white border shadow-md text-red-500
          flex items-center justify-center hover:bg-red-500
          hover:text-white transition">
          <FaArrowLeft />
        </button>

        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".bprev",
            nextEl: ".bnext",
          }}
          slidesPerView={1}
          spaceBetween={24}
          speed={700}
          breakpoints={{
            768: { slidesPerView: 2 },
            1100: { slidesPerView: 3 },
          }}
        >
          {bimbel.map((item, i) => (
            <SwiperSlide key={item.id}>
              <Card item={item} i={i} academic />
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="bnext absolute z-20 right-[-5px] top-1/2 -translate-y-1/2
          w-11 h-11 bg-white border shadow-md text-red-500
          flex items-center justify-center hover:bg-red-500
          hover:text-white transition">
          <FaArrowRight />
        </button>

      </div>

    </main>
  );
}


/* TITLE */
function Title({ title, highlight, desc, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -25 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-6 mb-8"
    >
      <div className="flex items-center gap-4">
        <span
          className={`w-2 h-8 ${
            color === "red" ? "bg-red-500" : "bg-blue-600"
          }`}
        />

        <h2 className="text-2xl md:text-3xl font-black text-slate-950">
          {title}{" "}
          <span
            className={
              color === "red"
                ? "text-red-500"
                : "text-blue-600"
            }
          >
            {highlight}
          </span>
        </h2>
      </div>

      <p className="ml-6 mt-3 text-slate-600 text-sm md:text-base">
        {desc}
      </p>
    </motion.div>
  );
}


/* CARD */
function Card({ item, i, academic }) {
  const Icon = academic ? bIcons[i % 5] : icons[i % 3];
  const color = colors[i % 3];
  const bg = backs[i % 3];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      whileHover={{ y: -7 }}
      className="group h-[235px] flex bg-white border border-slate-200
        rounded-xl overflow-hidden shadow-sm hover:shadow-xl
        transition-shadow duration-300"
    >

      <div className="w-[48%] overflow-hidden">
        <img
          src={`/images/${item.gambar}`}
          alt={item.nama_program}
          className="w-full h-full object-cover
          group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      <div className="w-[52%] p-5 flex flex-col justify-center relative">

        <div className={`w-11 h-11 ${bg} text-white
          flex items-center justify-center mb-4`}>
          <Icon />
        </div>

        <h3 className={`text-lg font-extrabold uppercase ${color}`}>
          {item.nama_program}
        </h3>

        <p className="mt-2 text-xs text-slate-600 leading-5 line-clamp-4">
          {item.deskripsi}
        </p>

        <span className={`absolute bottom-0 left-0 w-full h-1 ${bg}`} />

      </div>
    </motion.div>
  );
}