"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MateriUser() {
  const [materi, setMateri] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMateri = async () => {
      try {
        const email = localStorage.getItem("email");
        if (!email) return setLoading(false);

        const res = await fetch(
          `/api/belajar?email=${encodeURIComponent(email)}`
        );
        const data = await res.json();

        setMateri(data.materi || []);
      } catch (error) {
        console.error(error);
        setMateri([]);
      } finally {
        setLoading(false);
      }
    };

    getMateri();
  }, []);

  if (loading)
    return (
      <main className="min-h-screen bg-slate-100 pt-28 flex justify-center">
        <p className="text-gray-500">Memuat materi...</p>
      </main>
    );

  return (
    <main className="min-h-screen bg-slate-100 pt-28 pb-16 px-5">
      <div className="max-w-6xl mx-auto">

        <Link
          href="/belajar"
          className="text-blue-500 font-semibold hover:text-blue-600"
        >
          ← Kembali ke Dashboard
        </Link>

        <h1 className="text-4xl font-bold text-slate-800 mt-5">
          📚 Materi Pembelajaran
        </h1>

        <p className="text-gray-500 mt-2 mb-8">
          Pelajari materi yang tersedia untuk program kamu.
        </p>

        {materi.length ? (
          <div className="grid md:grid-cols-2 gap-5">
            {materi.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <span className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                  {item.kategori}
                </span>

                <h2 className="text-2xl font-bold text-slate-800 mt-4">
                  {item.judul}
                </h2>

                <p className="text-gray-500 mt-2">
                  {item.deskripsi}
                </p>

                <div className="flex flex-wrap gap-2 mt-5">
                  {item.file_materi && (
                    <a
                      href={item.file_materi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
                    >
                      📖 Buka Materi
                    </a>
                  )}

                  <Link
                    href={`/belajar/quiz?materi=${item.id}`}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
                  >
                    ❓ Quiz
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
            <div className="text-5xl">📚</div>
            <h2 className="text-2xl font-bold text-slate-800 mt-3">
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