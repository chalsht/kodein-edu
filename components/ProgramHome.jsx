"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import "swiper/css";

export default function ProgramHome() {
  const [program, setProgram] = useState([]);

  useEffect(() => {
    fetch("/api/program")
      .then((r) => r.json())
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
    <main className="min-h-screen bg-white py-20">

      {/* PROGRAM UNGGULAN */}
      <section className="max-w-7xl mx-auto px-6">
        <Title
          title="Program Unggulan"
          desc="Program pilihan untuk mengasah skill digital dan teknologi masa kini."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {unggulan.slice(0, 3).map((item, i) => (
            <Card key={item.id} item={item} i={i} />
          ))}
        </div>
      </section>

      {/* BIMBEL AKADEMIK */}
      <section className="max-w-7xl mx-auto px-6 mt-28">
        <Title
          title="Bimbel Akademik"
          desc="Pendampingan belajar akademik untuk meningkatkan pemahaman dan prestasi."
        />

        <div className="relative px-3">

          {/* KIRI */}
          <button
            className="bimbel-prev absolute z-20 left-[-5px]
            top-1/2 -translate-y-1/2 w-12 h-12 rounded-full
            bg-white shadow-lg flex items-center justify-center
            text-blue-600 hover:bg-blue-600 hover:text-white transition"
          >
            <FaArrowLeft />
          </button>

          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".bimbel-prev",
              nextEl: ".bimbel-next",
            }}
            slidesPerView={1}
            spaceBetween={18}
            speed={700}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {bimbel.map((item, i) => (
              <SwiperSlide key={item.id} className="!h-auto">
                <Card item={item} i={i} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* KANAN */}
          <button
            className="bimbel-next absolute z-20 right-[-5px]
            top-1/2 -translate-y-1/2 w-12 h-12 rounded-full
            bg-white shadow-lg flex items-center justify-center
            text-blue-600 hover:bg-blue-600 hover:text-white transition"
          >
            <FaArrowRight />
          </button>

        </div>
      </section>

    </main>
  );
}

function Title({ title, desc }) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl font-extrabold text-slate-900">
        {title}
      </h2>

      <div className="flex justify-center gap-1 my-4">
        <span className="w-8 h-[3px] bg-blue-600 rounded-full" />
        <span className="w-2 h-[3px] bg-orange-400 rounded-full" />
      </div>

      <p className="text-slate-600">
        {desc}
      </p>
    </div>
  );
}

function Card({ item, i }) {
  const colors = [
    "text-blue-600",
    "text-orange-500",
    "text-red-500",
  ];

  return (
    <div
      className="group h-[500px] bg-white rounded-3xl
      border border-slate-100 overflow-hidden shadow-sm
      hover:-translate-y-2 hover:shadow-xl
      transition-all duration-300"
    >
      <img
        src={`/images/${item.gambar}`}
        alt={item.nama_program}
        className="w-full h-[255px] object-cover
        group-hover:scale-[1.02] transition duration-500"
      />

      <div className="p-6">
        <h3 className={`text-xl font-extrabold ${colors[i % 3]}`}>
          {item.nama_program}
        </h3>

        <div className="w-7 h-[3px] bg-current mt-3 mb-4" />

        <p className="text-sm text-slate-600 leading-7 line-clamp-6">
          {item.deskripsi}
        </p>
      </div>
    </div>
  );
}