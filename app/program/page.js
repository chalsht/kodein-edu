"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Program() {
  const [program, setProgram] = useState([]);

  // ==========================================
  // AMBIL DATA PROGRAM
  // ==========================================
  useEffect(() => {
    getProgram();
  }, []);

  async function getProgram() {
    try {
      const res = await fetch("/api/program");

      if (!res.ok) {
        throw new Error("Gagal mengambil data program");
      }

      const data = await res.json();

      setProgram(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error:", error);
      setProgram([]);
    }
  }

  // ==========================================
  // FILTER KATEGORI
  // ==========================================
  const unggulan = program.filter(
    (item) => item.kategori === "Program Unggulan"
  );

  const bimbel = program.filter(
    (item) => item.kategori === "Bimbel Akademik"
  );

  return (
    <main className="min-h-screen bg-slate-100">

      {/* ==========================================
          HEADER
      ========================================== */}
      <section className="bg-slate-900 py-24 text-center">

        <h1 className="text-6xl font-bold text-white">
          Program Kami
        </h1>

        <p className="text-gray-300 text-xl mt-4">
          Pilih program yang sesuai dengan minatmu.
        </p>

      </section>


      {/* ==========================================
          PROGRAM UNGGULAN
      ========================================== */}
      <section className="max-w-6xl mx-auto px-8 py-20">

        <h2 className="text-4xl font-bold text-slate-800 text-center mb-12">
          ⭐ Program Unggulan
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">

          {unggulan.length > 0 ? (

            unggulan.map((item) => (

              <div
                key={item.id}
                className="w-80 h-[340px] bg-white rounded-2xl shadow-lg overflow-hidden hover:-translate-y-2 duration-300 flex flex-col"
              >

                {/* GAMBAR */}
                <img
                  src={`/images/${item.gambar}`}
                  alt={item.nama_program}
                  className="w-full h-44 object-cover"
                />

                {/* ISI */}
                <div className="p-6 flex flex-col flex-1">

                  <h3 className="text-xl font-bold text-slate-800">
                    {item.nama_program}
                  </h3>

                  <p className="text-gray-500 mt-2 line-clamp-3">
                    {item.deskripsi}
                  </p>

                  <Link
                    href={`/program/${item.id}`}
                    className="mt-auto text-center bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl"
                  >
                    Lihat Detail
                  </Link>

                </div>

              </div>

            ))

          ) : (

            <p className="text-gray-500">
              Belum ada Program Unggulan.
            </p>

          )}

        </div>

      </section>


      {/* ==========================================
          BIMBEL AKADEMIK
      ========================================== */}
      <section className="max-w-6xl mx-auto px-8 pb-24">

        <h2 className="text-4xl font-bold text-slate-800 text-center mb-12">
          📚 Bimbel Akademik
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">

          {bimbel.length > 0 ? (

            bimbel.map((item) => (

              <div
                key={item.id}
                className="w-80 h-[340px] bg-white rounded-2xl shadow-lg overflow-hidden hover:-translate-y-2 duration-300 flex flex-col"
              >

                {/* GAMBAR */}
                <img
                  src={`/images/${item.gambar}`}
                  alt={item.nama_program}
                  className="w-full h-44 object-cover"
                />

                {/* ISI */}
                <div className="p-6 flex flex-col flex-1">

                  <h3 className="text-xl font-bold text-slate-800">
                    {item.nama_program}
                  </h3>

                  <p className="text-gray-500 mt-2 line-clamp-3">
                    {item.deskripsi}
                  </p>

                  <Link
                    href={`/program/${item.id}`}
                    className="mt-auto text-center bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-xl"
                  >
                    Lihat Detail
                  </Link>

                </div>

              </div>

            ))

          ) : (

            <p className="text-gray-500">
              Belum ada Bimbel Akademik.
            </p>

          )}

        </div>

      </section>

    </main>
  );
}