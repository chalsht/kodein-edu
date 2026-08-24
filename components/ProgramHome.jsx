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
    <section id="program" className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* PROGRAM UNGGULAN */}
        <h2 className="text-4xl font-bold text-center text-slate-800 mb-12">
          Program Unggulan
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {unggulan.slice(0, 3).map((item, i) => (
            <Card key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* BIMBEL AKADEMIK */}
        <div className="mt-24">
          <h2 className="text-4xl font-bold text-center text-slate-800 mb-12">
            Bimbel Akademik
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tampil.map((item, i) => (
              <Card key={item.id} item={item} index={i} />
            ))}
          </div>

          {/* TOMBOL */}
          {bimbel.length > 3 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-8 py-4 border border-gray-200 rounded-2xl
                text-gray-500 font-semibold hover:shadow-md
                hover:border-gray-300 transition"
              >
                {showAll ? "Lihat lebih sedikit" : "Lihat lebih banyak"}
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

function Card({ item, index }) {
  const icon = ["◆", "★", "●"][index % 3];
  const color = ["text-orange-500", "text-red-500", "text-blue-600"][index % 3];

  return (
    <div
      className="group bg-white border border-gray-200 rounded-3xl
      overflow-hidden hover:-translate-y-2 hover:shadow-xl
      transition-all duration-300"
    >
      <div className="relative p-2">
        <img
          src={`/images/${item.gambar}`}
          alt={item.nama_program}
          className="w-full h-56 object-cover rounded-2xl
          group-hover:scale-[1.02] transition duration-500"
        />

        <div
          className={`absolute bottom-5 left-5 w-16 h-16 bg-white
          rounded-2xl shadow-lg flex items-center justify-center
          text-2xl ${color}`}
        >
          {icon}
        </div>
      </div>

      <div className="px-6 pt-5 pb-7">
        <h3 className="text-2xl font-bold text-slate-800">
          {item.nama_program}
        </h3>

        <p className="text-gray-500 mt-3 leading-7 line-clamp-3">
          {item.deskripsi}
        </p>
      </div>
    </div>
  );
}