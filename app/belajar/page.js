"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Belajar() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const email = localStorage.getItem("email");
        if (!email) return;

        const res = await fetch(
          `/api/belajar?email=${encodeURIComponent(email)}`
        );
        setData(await res.json());
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const logout = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("email");
    window.dispatchEvent(new Event("login"));
    window.location.href = "/";
  };

  if (loading)
    return (
      <main className="min-h-screen bg-slate-50 pt-28 flex justify-center items-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin mx-auto" />
          <p className="text-gray-500 mt-4">Memuat data...</p>
        </div>
      </main>
    );

  if (!data?.user)
    return (
      <main className="min-h-screen bg-slate-50 pt-28 px-5">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm p-10 text-center">
          <div className="text-4xl">🔐</div>
          <h1 className="text-2xl font-bold text-slate-800 mt-4">
            Silakan Login Terlebih Dahulu
          </h1>
          <p className="text-gray-500 mt-2">
            Login untuk mengakses dashboard belajar.
          </p>
          <Link
            href="/login"
            className="inline-block mt-6 bg-blue-500 hover:bg-blue-600 text-white px-7 py-3 rounded-xl font-semibold transition"
          >
            Login
          </Link>
        </div>
      </main>
    );

  return (
    <main className="min-h-screen bg-slate-50 pt-28 pb-16 px-5">
      <div className="max-w-6xl mx-auto animate-[fadeIn_.7s_ease]">

        {/* HEADER */}
        <section className="relative overflow-hidden bg-white rounded-3xl shadow-sm border border-slate-100 p-7 md:p-8 mb-6">
          <div className="absolute -right-20 -top-20 w-52 h-52 bg-blue-50 rounded-full" />
          <div className="absolute right-36 -bottom-20 w-32 h-32 bg-orange-50 rounded-full" />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex gap-3 items-center">
                <div className="w-1.5 h-12 bg-red-500 rounded-full" />

                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                    Halo, {data.user.nama} 👋
                  </h1>
                  <p className="text-gray-500 mt-2">
                    Selamat datang di Dashboard Belajar Kodein Edu Center.
                  </p>
                </div>
              </div>

              <div className="mt-4 ml-4">
                <span className="text-gray-500 text-sm">Program:</span>
                <span className="ml-2 px-3 py-1 bg-red-50 text-red-500 rounded-full text-sm font-bold">
                  {data.user.program}
                </span>
              </div>
            </div>

            {/* FOTO + LOGOUT */}
            <div className="flex items-center gap-3">
              <img
                src="/images/laptop.png"
                alt="Belajar"
                className="w-36 md:w-48 object-contain transition-transform duration-500 hover:scale-105"
              />

              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                Logout
              </button>
            </div>
          </div>
        </section>

        {/* MENU */}
        <section className="grid md:grid-cols-3 gap-5 mb-6">
          <MenuCard
            href="/belajar/materi"
            icon="📚"
            title="Materi"
            text="Pelajari materi pembelajaran yang tersedia."
            color="blue"
          />
          <MenuCard
            href="/belajar/quiz"
            icon="❓"
            title="Quiz"
            text="Kerjakan quiz untuk menguji pemahamanmu."
            color="red"
          />
          <MenuCard
            href="/belajar/sertifikat"
            icon="🏆"
            title="Sertifikat"
            text="Lihat sertifikat yang kamu dapatkan."
            color="orange"
          />
        </section>

        {/* MATERI */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                Materi Terbaru
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Materi pembelajaran yang tersedia untukmu
              </p>
            </div>

            <Link
              href="/belajar/materi"
              className="text-blue-500 font-semibold text-sm hover:text-blue-600"
            >
              Lihat Semua →
            </Link>
          </div>

          <div className="space-y-3">
            {data.materi?.length ? (
              data.materi.map((item, i) => (
                <div
                  key={item.id}
                  className="group border border-slate-100 rounded-2xl p-4 md:p-5 hover:border-blue-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                  style={{ animation: `fadeIn .5s ease ${i * .1}s both` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex gap-4 items-start">
                      <div className="w-11 h-11 shrink-0 rounded-xl bg-blue-50 flex items-center justify-center text-xl">
                        📄
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-800">
                          {item.judul}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">
                          {item.deskripsi}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      {item.file_materi && (
                        <a
                          href={item.file_materi}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition hover:-translate-y-0.5"
                        >
                          📖 Buka Materi
                        </a>
                      )}

                      <Link
                        href={`/belajar/quiz?materi=${item.id}`}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition hover:-translate-y-0.5"
                      >
                        ❓ Quiz
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <div className="text-3xl">📚</div>
                <p className="text-gray-500 mt-2">
                  Belum ada materi tersedia.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}

function MenuCard({ href, icon, title, text, color }) {
  const c = {
    blue: ["bg-blue-50", "text-blue-500", "group-hover:bg-blue-500", "border-blue-50"],
    red: ["bg-red-50", "text-red-500", "group-hover:bg-red-500", "border-red-50"],
    orange: ["bg-orange-50", "text-orange-500", "group-hover:bg-orange-500", "border-orange-50"],
  }[color];

  return (
    <Link
      href={href}
      className={`group bg-white ${c[3]} border rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300`}
    >
      <div className="flex justify-between items-center">
        <div className={`w-12 h-12 ${c[0]} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition`}>
          {icon}
        </div>

        <div className={`w-9 h-9 rounded-full ${c[0]} ${c[1]} flex items-center justify-center font-bold ${c[2]} group-hover:text-white transition`}>
          →
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mt-5">{title}</h2>
      <p className="text-gray-500 text-sm mt-2 leading-relaxed">{text}</p>
    </Link>
  );
}