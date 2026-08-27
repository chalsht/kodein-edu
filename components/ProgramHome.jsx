"use client";

import { useEffect, useState } from "react";

export default function ProgramHome() {
  const [program, setProgram] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("/api/program")
      .then((res) => res.json())
      .then((data) => setProgram(Array.isArray(data) ? data : []))
      .catch(() => setProgram([]));
  }, []);

  const unggulan = program.filter(
    (x) => x.kategori === "Program Unggulan"
  );

  const bimbel = program.filter(
    (x) => x.kategori === "Bimbel Akademik"
  );

  const tampil = showAll ? bimbel : bimbel.slice(0, 3);

  return (
    <section
      id="program"
      className="relative overflow-hidden bg-white py-24"
    >
      {/* ================= DECORATION ================= */}
      <div className="absolute top-20 left-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-60" />

      <div className="absolute top-1/3 right-0 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-60" />

      <div className="absolute bottom-20 left-10 w-24 h-24 bg-red-100 rounded-full blur-3xl opacity-50" />

      {/* DOT PATTERN */}
      <div className="absolute top-28 right-16 grid grid-cols-5 gap-2 opacity-40">
        {Array.from({ length: 25 }).map((_, i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-blue-500"
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* ================= PROGRAM UNGGULAN ================= */}
        <div className="text-center mb-14">

          <span className="inline-block px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-bold tracking-wide mb-4">
            PROGRAM UNGGULAN
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            Pilihan Program
          </h2>

          <h2 className="text-4xl md:text-5xl font-extrabold mt-1">
            <span className="text-orange-500">Terbaik</span>{" "}
            <span className="text-slate-900">untuk Kamu</span>
          </h2>

          <p className="text-gray-500 max-w-2xl mx-auto mt-5 leading-7">
            Pilih program belajar yang sesuai dengan kebutuhanmu
            dan mulai kembangkan kemampuan bersama Kodein Edu Center.
          </p>
        </div>

        {/* CARD UNGGULAN */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {unggulan.slice(0, 3).map((item, i) => (
            <Card key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* ================= BIMBEL AKADEMIK ================= */}
        <div className="mt-28">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-5">

            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-orange-50 text-orange-500 text-sm font-bold tracking-wide mb-4">
                BIMBEL AKADEMIK
              </span>

              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
                Belajar Lebih{" "}
                <span className="text-blue-600">Mudah</span>
              </h2>

              <p className="text-gray-500 mt-4 max-w-xl leading-7">
                Tingkatkan pemahamanmu dengan berbagai pilihan
                bimbingan akademik yang menarik dan terstruktur.
              </p>
            </div>

            {/* Dekorasi kecil */}
            <div className="hidden md:flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 rotate-6 animate-pulse" />
              <div className="w-8 h-8 rounded-xl bg-orange-500 -rotate-12" />
              <div className="w-5 h-5 rounded-full bg-red-500" />
            </div>

          </div>

          {/* CARD BIMBEL */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {tampil.map((item, i) => (
              <Card key={item.id} item={item} index={i} />
            ))}
          </div>

          {/* TOMBOL */}
          {bimbel.length > 3 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAll(!showAll)}
                className="
                  group relative overflow-hidden
                  px-8 py-4
                  bg-blue-600
                  text-white
                  rounded-2xl
                  font-bold
                  shadow-lg shadow-blue-200
                  hover:bg-blue-700
                  hover:-translate-y-1
                  transition-all duration-300
                "
              >
                <span className="relative z-10">
                  {showAll
                    ? "Lihat lebih sedikit"
                    : "Lihat lebih banyak"}
                </span>

                <span
                  className="
                    absolute inset-0
                    bg-orange-500
                    translate-y-full
                    group-hover:translate-y-0
                    transition-transform duration-300
                  "
                />
              </button>
            </div>
          )}

        </div>

      </div>

      {/* ================= BOTTOM SHAPE ================= */}
      <div className="absolute bottom-0 left-0 w-40 h-20 bg-blue-600 rounded-tr-[100px]" />

      <div className="absolute bottom-0 right-0 w-32 h-16 bg-orange-500 rounded-tl-[100px]" />

    </section>
  );
}


/* =========================================================
   CARD PROGRAM
========================================================= */

function Card({ item, index }) {

  const colors = [
    {
      accent: "text-blue-600",
      bg: "bg-blue-50",
      border: "group-hover:border-blue-200",
      button: "bg-blue-600",
    },
    {
      accent: "text-orange-500",
      bg: "bg-orange-50",
      border: "group-hover:border-orange-200",
      button: "bg-orange-500",
    },
    {
      accent: "text-red-500",
      bg: "bg-red-50",
      border: "group-hover:border-red-200",
      button: "bg-red-500",
    },
  ];

  const theme = colors[index % colors.length];

  return (
    <div
      className={`
        group relative
        bg-white
        border border-gray-200
        ${theme.border}
        rounded-[28px]
        overflow-hidden
        shadow-sm
        hover:shadow-2xl
        hover:-translate-y-3
        transition-all
        duration-500
      `}
    >

      {/* TOP IMAGE */}
      <div className="relative p-3">

        <div className="relative overflow-hidden rounded-[22px]">

          <img
            src={`/images/${item.gambar}`}
            alt={item.nama_program}
            className="
              w-full
              h-56
              object-cover
              group-hover:scale-110
              transition-transform
              duration-700
            "
          />

          {/* IMAGE OVERLAY */}
          <div
            className="
              absolute inset-0
              bg-gradient-to-t
              from-black/30
              via-transparent
              to-transparent
              opacity-0
              group-hover:opacity-100
              transition-opacity
              duration-500
            "
          />

        </div>

        {/* NUMBER */}
        <div
          className={`
            absolute
            top-6
            left-6
            w-11
            h-11
            rounded-2xl
            ${theme.bg}
            ${theme.accent}
            flex
            items-center
            justify-center
            font-extrabold
            text-lg
            shadow-sm
            group-hover:scale-110
            group-hover:rotate-6
            transition-all
            duration-300
          `}
        >
          0{index + 1}
        </div>

      </div>


      {/* CONTENT */}
      <div className="px-6 pt-4 pb-7">

        <div className="flex items-center gap-2 mb-3">

          <span
            className={`
              w-8 h-1 rounded-full
              ${theme.button}
            `}
          />

          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
            KODEIN EDU
          </span>

        </div>

        <h3
          className="
            text-2xl
            font-extrabold
            text-slate-900
            group-hover:text-blue-600
            transition-colors
            duration-300
          "
        >
          {item.nama_program}
        </h3>

        <p className="text-gray-500 mt-3 leading-7 line-clamp-3">
          {item.deskripsi}
        </p>

        {/* BOTTOM */}
        <div className="flex items-center justify-between mt-6">

          <span
            className={`
              text-sm
              font-bold
              ${theme.accent}
            `}
          >
            Mulai Belajar
          </span>

          <div
            className={`
              w-10
              h-10
              rounded-xl
              ${theme.bg}
              ${theme.accent}
              flex
              items-center
              justify-center
              font-bold
              group-hover:translate-x-2
              transition-transform
              duration-300
            `}
          >
            →
          </div>

        </div>

      </div>

      {/* COLOR LINE */}
      <div
        className={`
          absolute
          bottom-0
          left-0
          w-full
          h-1
          ${theme.button}
          scale-x-0
          group-hover:scale-x-100
          origin-left
          transition-transform
          duration-500
        `}
      />

    </div>
  );
}