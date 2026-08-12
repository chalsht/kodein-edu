"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Belajar() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // LOAD DATA USER
  // ==========================================

  const loadData = async () => {

    try {

      const email = localStorage.getItem("email");

      if (!email) {
        setLoading(false);
        return;
      }

      const res = await fetch(
        `/api/belajar?email=${encodeURIComponent(email)}`
      );

      const hasil = await res.json();

      setData(hasil);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadData();

  }, []);

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {

    localStorage.removeItem("login");
    localStorage.removeItem("email");

    window.dispatchEvent(new Event("login"));

    window.location.href = "/";

  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <main className="min-h-screen bg-slate-100 pt-28 pb-16 px-5">

        <div className="max-w-6xl mx-auto">

          <p className="text-center text-gray-500">
            Memuat data...
          </p>

        </div>

      </main>

    );

  }

  // ==========================================
  // BELUM LOGIN
  // ==========================================

  if (!data || !data.user) {

    return (

      <main className="min-h-screen bg-slate-100 pt-28 pb-16 px-5">

        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-10 text-center">

          <h1 className="text-2xl font-bold text-slate-800">
            Silakan Login Terlebih Dahulu
          </h1>

          <Link
            href="/login"
            className="inline-block mt-5 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl"
          >
            Login
          </Link>

        </div>

      </main>

    );

  }

  return (

    <main className="min-h-screen bg-slate-100 pt-28 pb-16 px-5">

      <div className="max-w-6xl mx-auto">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">

          <div className="flex flex-col md:flex-row justify-between items-start gap-5">

            <div>

              <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                Halo, {data.user.nama} 👋
              </h1>

              <p className="text-gray-500 mt-3">
                Selamat datang di Dashboard Belajar Kodein Edu Center.
              </p>

              <div className="mt-5">

                <span className="text-gray-500">
                  Program:
                </span>

                <span className="font-bold text-orange-500 ml-2">
                  {data.user.program}
                </span>

              </div>

            </div>

            {/* LOGOUT */}

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl font-semibold"
            >
              Logout
            </button>

          </div>

        </div>

        {/* ==========================================
            MENU USER
        ========================================== */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          {/* MATERI */}

          <Link
            href="/belajar/materi"
            className="bg-white rounded-2xl shadow-lg p-7 hover:shadow-xl hover:-translate-y-1 transition"
          >

            <div className="text-4xl mb-4">
              📚
            </div>

            <h2 className="text-2xl font-bold text-slate-800">
              Materi
            </h2>

            <p className="text-gray-500 mt-2">
              Pelajari materi pembelajaran yang tersedia.
            </p>

          </Link>

          {/* QUIZ */}

          <Link
            href="/belajar/quiz"
            className="bg-white rounded-2xl shadow-lg p-7 hover:shadow-xl hover:-translate-y-1 transition"
          >

            <div className="text-4xl mb-4">
              ❓
            </div>

            <h2 className="text-2xl font-bold text-slate-800">
              Quiz
            </h2>

            <p className="text-gray-500 mt-2">
              Kerjakan quiz untuk menguji pemahamanmu.
            </p>

          </Link>

          {/* SERTIFIKAT */}

          <Link
            href="/belajar/sertifikat"
            className="bg-white rounded-2xl shadow-lg p-7 hover:shadow-xl hover:-translate-y-1 transition"
          >

            <div className="text-4xl mb-4">
              🏆
            </div>

            <h2 className="text-2xl font-bold text-slate-800">
              Sertifikat
            </h2>

            <p className="text-gray-500 mt-2">
              Lihat sertifikat yang kamu dapatkan.
            </p>

          </Link>

        </div>

        {/* ==========================================
            MATERI TERSEDIA
        ========================================== */}

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-bold text-slate-800">
              Materi Terbaru
            </h2>

            <Link
              href="/belajar/materi"
              className="text-orange-500 font-semibold hover:text-orange-600"
            >
              Lihat Semua
            </Link>

          </div>

          <div className="space-y-4">

            {data.materi && data.materi.length > 0 ? (

              data.materi.map((item) => (

                <div
                  key={item.id}
                  className="border rounded-xl p-5 hover:shadow-md transition"
                >

                  <h3 className="text-xl font-bold text-slate-800">
                    {item.judul}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    {item.deskripsi}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-4">

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

              ))

            ) : (

              <p className="text-gray-500">
                Belum ada materi tersedia.
              </p>

            )}

          </div>

        </div>

      </div>

    </main>

  );

}