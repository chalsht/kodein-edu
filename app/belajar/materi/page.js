"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MateriUser() {

  const [materi, setMateri] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // AMBIL MATERI
  // ==========================================

  const getMateri = async () => {

    try {

      const email = localStorage.getItem("email");

      if (!email) {
        setLoading(false);
        return;
      }

      const res = await fetch(
        `/api/belajar?email=${encodeURIComponent(email)}`
      );

      const data = await res.json();

      if (data.materi) {

        setMateri(data.materi);

      } else {

        setMateri([]);

      }

    } catch (error) {

      console.error(error);

      setMateri([]);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    getMateri();

  }, []);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <main className="min-h-screen bg-slate-100 pt-28 pb-16 px-5">

        <div className="max-w-6xl mx-auto">

          <p className="text-center text-gray-500">
            Memuat materi...
          </p>

        </div>

      </main>

    );

  }

  // ==========================================
  // TAMPILAN
  // ==========================================

  return (

    <main className="min-h-screen bg-slate-100 pt-28 pb-16 px-5">

      <div className="max-w-6xl mx-auto">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="mb-8">

          <Link
            href="/belajar"
            className="text-orange-500 hover:text-orange-600 font-semibold"
          >
            ← Kembali ke Dashboard
          </Link>

          <h1 className="text-4xl font-bold text-slate-800 mt-5">
            📚 Materi Pembelajaran
          </h1>

          <p className="text-gray-500 mt-2">
            Pelajari materi yang tersedia untuk program kamu.
          </p>

        </div>

        {/* ==========================================
            MATERI
        ========================================== */}

        {materi.length > 0 ? (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {materi.map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg p-7"
              >

                {/* KATEGORI */}

                <span className="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">

                  {item.kategori}

                </span>

                {/* JUDUL */}

                <h2 className="text-2xl font-bold text-slate-800 mt-4">

                  {item.judul}

                </h2>

                {/* DESKRIPSI */}

                <p className="text-gray-500 mt-3">

                  {item.deskripsi}

                </p>

                {/* BUTTON */}

                <div className="flex flex-wrap gap-3 mt-6">

                  {item.file_materi && (

                    <a
                      href={item.file_materi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                    >
                      📖 Buka Materi
                    </a>

                  )}

                  <Link
                    href={`/belajar/quiz?materi=${item.id}`}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg"
                  >
                    ❓ Kerjakan Quiz
                  </Link>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="bg-white rounded-2xl shadow p-10 text-center">

            <div className="text-5xl mb-4">
              📚
            </div>

            <h2 className="text-2xl font-bold text-slate-800">
              Belum Ada Materi
            </h2>

            <p className="text-gray-500 mt-2">
              Materi untuk program kamu belum tersedia.
            </p>

          </div>

        )}

      </div>

    </main>

  );

}