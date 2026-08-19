"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProgramHome() {
  const [program, setProgram] = useState([]);

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
      console.error("Gagal mengambil program:", error);
      setProgram([]);
    }
  }

  // Filter berdasarkan kategori
  const programUnggulan = program.filter(
    (item) => item.kategori === "Program Unggulan"
  );

  const bimbelAkademik = program.filter(
    (item) => item.kategori === "Bimbel Akademik"
  );

  // Homepage hanya menampilkan 3
  const unggulanTampil = programUnggulan.slice(0, 3);
  const bimbelTampil = bimbelAkademik.slice(0, 3);

  return (
    <section id="program" className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* ==========================================
            PROGRAM UNGGULAN
        ========================================== */}

        <h2 className="text-4xl md:text-5xl font-bold text-black text-center mb-12">
          Program Unggulan
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {unggulanTampil.map((item) => (
            <div
              key={item.id}
              className="
                bg-white
                border
                border-gray-200
                rounded-2xl
                overflow-hidden
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-lg
              "
            >

              {/* GAMBAR */}
              <div className="p-2 pb-0">
                <img
                  src={`/images/${item.gambar}`}
                  alt={item.nama_program}
                  className="
                    w-full
                    h-[180px]
                    object-cover
                    rounded-xl
                  "
                />
              </div>

              {/* ISI CARD */}
              <div className="px-5 pt-5 pb-6">

                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {item.nama_program}
                </h3>

                <p className="text-sm leading-6 text-gray-500 line-clamp-3">
                  {item.deskripsi}
                </p>

              </div>

            </div>
          ))}

        </div>


        {/* ==========================================
            BIMBEL AKADEMIK
        ========================================== */}

        <div className="mt-24">

          <h2 className="text-4xl md:text-5xl font-bold text-black text-center mb-12">
            Bimbel Akademik
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {bimbelTampil.map((item) => (
              <div
                key={item.id}
                className="
                  bg-white
                  border
                  border-gray-200
                  rounded-2xl
                  overflow-hidden
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                "
              >

                {/* GAMBAR */}
                <div className="p-2 pb-0">
                  <img
                    src={`/images/${item.gambar}`}
                    alt={item.nama_program}
                    className="
                      w-full
                      h-[180px]
                      object-cover
                      rounded-xl
                    "
                  />
                </div>

                {/* ISI CARD */}
                <div className="px-5 pt-5 pb-6">

                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {item.nama_program}
                  </h3>

                  <p className="text-sm leading-6 text-gray-500 line-clamp-3">
                    {item.deskripsi}
                  </p>

                </div>

              </div>
            ))}

          </div>


          {/* ==========================================
              LIHAT LEBIH BANYAK
          ========================================== */}

          {bimbelAkademik.length > 3 && (
            <div className="flex justify-center mt-12">

              <Link
                href="/program"
                className="
                  min-w-[150px]
                  text-center
                  px-6
                  py-3
                  bg-white
                  border
                  border-gray-200
                  rounded-xl
                  text-gray-500
                  text-sm
                  font-medium
                  hover:bg-gray-50
                  hover:border-gray-300
                  transition
                "
              >
                Lihat lebih banyak
              </Link>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}