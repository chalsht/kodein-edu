"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function QuizContent() {
  const params = useSearchParams();
  const materiId = params.get("materi");

  const [materi, setMateri] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [jawaban, setJawaban] = useState({});
  const [hasil, setHasil] = useState(null);
  const [loading, setLoading] = useState(true);

  const email = typeof window !== "undefined"
    ? localStorage.getItem("email")
    : null;

  useEffect(() => {
    const load = async () => {
      try {
        if (email) {
          const r = await fetch(
            `/api/belajar?email=${encodeURIComponent(email)}`
          );
          const d = await r.json();
          setMateri(Array.isArray(d.materi) ? d.materi : []);
        }

        if (materiId) {
          const r = await fetch(`/api/belajar/quiz?materi=${materiId}`);
          const d = await r.json();
          setQuiz(Array.isArray(d) ? d : []);

          if (email) {
            const r2 = await fetch(
              `/api/hasil-quiz?email=${encodeURIComponent(email)}&materi=${materiId}`
            );
            const d2 = await r2.json();

            if (d2.sudahMengerjakan) {
              setHasil(d2);
              setJawaban(d2.jawaban || {});
            }
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [materiId, email]);

  const pilih = (id, nilai) => {
    if (!hasil) {
      setJawaban((prev) => ({ ...prev, [id]: nilai }));
    }
  };

  const selesai = async () => {
    if (!quiz.length) return alert("Quiz belum tersedia.");

    if (quiz.some((item) => !jawaban[item.id])) {
      return alert("Silakan jawab semua soal terlebih dahulu.");
    }

    let benar = 0;

    quiz.forEach((item) => {
      if (String(jawaban[item.id]) === String(item.jawaban_benar)) {
        benar++;
      }
    });

    const nilai = Math.round((benar / quiz.length) * 100);

    try {
      const res = await fetch("/api/hasil-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          materi_id: materiId,
          nilai,
          jawaban,
        }),
      });

      const data = await res.json();

      if (!data.success) return alert(data.message);

      setHasil({
        sudahMengerjakan: true,
        nilai,
        jawaban,
      });

      alert(`Quiz selesai!\n\nNilai Anda: ${nilai}`);
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan hasil quiz.");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-100 pt-28 p-6">
        <p className="text-gray-500">Memuat quiz...</p>
      </main>
    );
  }

  if (!materiId) {
    return (
      <main className="min-h-screen bg-slate-100 pt-28 pb-16 px-5">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-800">Quiz</h1>
          <p className="text-gray-500 mt-2 mb-8">
            Pilih materi untuk melihat quiz.
          </p>

          {materi.length === 0 ? (
            <div className="bg-white rounded-2xl shadow p-8">
              Belum ada materi tersedia.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {materi.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow p-6"
                >
                  <div className="text-4xl">❓</div>

                  <h2 className="text-xl font-bold mt-4">
                    {item.judul}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {item.deskripsi}
                  </p>

                  <Link
                    href={`/belajar/quiz?materi=${item.id}`}
                    className="inline-block mt-5 bg-orange-500 text-white px-5 py-3 rounded-xl"
                  >
                    Lihat Quiz
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    );
  }

  const namaMateri =
    materi.find((item) => String(item.id) === String(materiId))?.judul ||
    "Quiz";

  if (hasil?.sudahMengerjakan) {
    return (
      <main className="min-h-screen bg-slate-100 pt-28 pb-16 px-5">
        <div className="max-w-4xl mx-auto">
          <Link href="/belajar/quiz" className="text-orange-500">
            ← Kembali
          </Link>

          <h1 className="text-4xl font-bold mt-5">Hasil Quiz</h1>
          <p className="text-gray-500 mt-2 mb-8">{namaMateri}</p>

          <div className="bg-white rounded-2xl shadow p-8 mb-8">
            <p className="text-gray-500">Nilai Anda</p>
            <p className="text-6xl font-bold text-green-600">
              {hasil.nilai}
            </p>
          </div>

          {quiz.map((item, index) => {
            const user = hasil.jawaban?.[item.id];

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow p-5 mb-5"
              >
                <h3 className="font-semibold">
                  {index + 1}. {item.pertanyaan}
                </h3>

                {["A", "B", "C", "D"].map((opsi) => {
                  const teks = item[`opsi_${opsi.toLowerCase()}`];
                  const benar = opsi === item.jawaban_benar;
                  const dipilih = opsi === user;

                  return (
                    <div
                      key={opsi}
                      className={`border rounded-lg p-3 mt-2 ${
                        benar
                          ? "bg-green-100 border-green-500"
                          : dipilih
                          ? "bg-red-100 border-red-500"
                          : ""
                      }`}
                    >
                      <b>{opsi}.</b> {teks}
                      {dipilih && " ← Jawaban Anda"}
                      {benar && " ✓ Jawaban Benar"}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </main>
    );
  }

  if (!quiz.length) {
    return (
      <main className="min-h-screen bg-slate-100 pt-28 px-5">
        <div className="max-w-4xl mx-auto">
          <Link href="/belajar/quiz" className="text-orange-500">
            ← Kembali
          </Link>

          <div className="bg-white rounded-2xl shadow p-8 mt-5">
            <h1 className="text-2xl font-bold">{namaMateri}</h1>
            <p className="text-gray-500 mt-3">
              Belum ada quiz untuk materi ini.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 pt-28 pb-16 px-5">
      <div className="max-w-4xl mx-auto">
        <Link href="/belajar/quiz" className="text-orange-500">
          ← Kembali
        </Link>

        <h1 className="text-4xl font-bold mt-5">Quiz</h1>
        <p className="text-gray-500 mt-2 mb-8">{namaMateri}</p>

        {quiz.map((item, index) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow p-5 mb-5"
          >
            <h2 className="font-semibold text-lg">
              {index + 1}. {item.pertanyaan}
            </h2>

            {["A", "B", "C", "D"].map((opsi) => {
              const teks = item[`opsi_${opsi.toLowerCase()}`];

              return (
                <label
                  key={opsi}
                  className="block border rounded-lg p-3 mt-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`soal-${item.id}`}
                    checked={jawaban[item.id] === opsi}
                    onChange={() => pilih(item.id, opsi)}
                  />

                  <span className="ml-2">
                    <b>{opsi}.</b> {teks}
                  </span>
                </label>
              );
            })}
          </div>
        ))}

        <button
          onClick={selesai}
          className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold"
        >
          Selesai
        </button>
      </div>
    </main>
  );
}

export default function QuizPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-100 pt-28 p-6">
          <p className="text-gray-500">Memuat quiz...</p>
        </main>
      }
    >
      <QuizContent />
    </Suspense>
  );
}