"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ProgramHome() {
  const [program, setProgram] = useState([]);

  // ==========================================
  // AMBIL DATA PROGRAM DARI DATABASE
  // ==========================================
  async function getProgram() {
    try {
      const res = await fetch("/api/program");

      if (!res.ok) {
        throw new Error("Gagal mengambil data program");
      }

      const data = await res.json();

      setProgram(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error mengambil program:", error);
      setProgram([]);
    }
  }

  // ==========================================
  // LOAD DATA
  // ==========================================
  useEffect(() => {
    getProgram();
  }, []);

  // ==========================================
  // PISAHKAN BERDASARKAN KATEGORI
  // ==========================================
  const programUnggulan = program.filter(
    (item) => item.kategori === "Program Unggulan"
  );

  const bimbelAkademik = program.filter(
    (item) => item.kategori === "Bimbel Akademik"
  );

  // ==========================================
  // HOMEPAGE HANYA MENAMPILKAN 3
  // ==========================================
  const unggulanTampil = programUnggulan.slice(0, 3);

  const bimbelTampil = bimbelAkademik.slice(0, 3);

  return (
    <section
      id="program"
      className="py-28 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-8">

        {/* ==========================================
            JUDUL UTAMA
        ========================================== */}
        <div className="text-center mb-20">

          <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-semibold">
            Program Kami
          </span>

          <h2 className="text-5xl font-black text-slate-800 mt-6">
            Pilih Program{" "}
            <span className="text-sky-500">
              Terbaik Untukmu
            </span>
          </h2>

          <p className="text-gray-500 mt-5 max-w-2xl mx-auto">
            Temukan program pembelajaran yang sesuai dengan
            kebutuhan dan minatmu.
          </p>

        </div>


        {/* ==================================================
            PROGRAM UNGGULAN
        ================================================== */}
        <section>

          <div className="flex items-center justify-between mb-10">

            <div>
              <h2 className="text-4xl font-bold text-slate-800">
                Program Unggulan
              </h2>

              <p className="text-gray-500 mt-2">
                Program pilihan terbaik untuk mengembangkan kemampuanmu.
              </p>
            </div>

          </div>


          {/* CARD PROGRAM UNGGULAN */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {unggulanTampil.length > 0 ? (

              unggulanTampil.map((item) => (

                <motion.div
                  key={item.id}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden"
                >

                  {/* GAMBAR */}
                  <Image
                    src={`/images/${item.gambar}`}
                    alt={item.nama_program}
                    width={500}
                    height={300}
                    className="w-full h-56 object-cover"
                  />

                  {/* ISI CARD */}
                  <div className="p-6">

                    <h3 className="text-2xl font-bold text-slate-800">
                      {item.nama_program}
                    </h3>

                    <p className="text-gray-500 mt-3 line-clamp-3">
                      {item.deskripsi}
                    </p>

                    <Link
                      href={`/program/${item.id}`}
                      className="inline-block mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl transition"
                    >
                      Lihat Detail
                    </Link>

                  </div>

                </motion.div>

              ))

            ) : (

              <p className="text-gray-500">
                Belum ada Program Unggulan.
              </p>

            )}

          </div>

        </section>


        {/* ==================================================
            BIMBEL AKADEMIK
        ================================================== */}
        <section className="mt-24">

          <div className="flex items-center justify-between mb-10">

            <div>

              <h2 className="text-4xl font-bold text-slate-800">
                Bimbel Akademik
              </h2>

              <p className="text-gray-500 mt-2">
                Tingkatkan kemampuan akademikmu bersama kami.
              </p>

            </div>

          </div>


          {/* CARD BIMBEL */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {bimbelTampil.length > 0 ? (

              bimbelTampil.map((item) => (

                <motion.div
                  key={item.id}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden"
                >

                  {/* GAMBAR */}
                  <Image
                    src={`/images/${item.gambar}`}
                    alt={item.nama_program}
                    width={500}
                    height={300}
                    className="w-full h-56 object-cover"
                  />

                  {/* ISI CARD */}
                  <div className="p-6">

                    <h3 className="text-2xl font-bold text-slate-800">
                      {item.nama_program}
                    </h3>

                    <p className="text-gray-500 mt-3 line-clamp-3">
                      {item.deskripsi}
                    </p>

                    <Link
                      href={`/program/${item.id}`}
                      className="inline-block mt-6 bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-xl transition"
                    >
                      Lihat Detail
                    </Link>

                  </div>

                </motion.div>

              ))

            ) : (

              <p className="text-gray-500">
                Belum ada Bimbel Akademik.
              </p>

            )}

          </div>


          {/* ==================================================
              TOMBOL LIHAT LEBIH BANYAK
          ================================================== */}

          {bimbelAkademik.length > 3 && (

            <div className="flex justify-center mt-12">

              <Link
                href="/program"
                className="inline-flex items-center justify-center px-8 py-4 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl shadow-sm hover:bg-slate-100 hover:shadow-md transition"
              >
                Lihat lebih banyak
              </Link>

            </div>

          )}

        </section>

      </div>
    </section>
  );
}