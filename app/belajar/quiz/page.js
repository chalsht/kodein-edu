"use client";

import { useEffect, useState } from "react";

export default function QuizPage() {
  const [materiId, setMateriId] = useState(null);
  const [email, setEmail] = useState(null);
  const [materi, setMateri] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [jawaban, setJawaban] = useState({});
  const [hasil, setHasil] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ambil data dari browser
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setMateriId(params.get("materi"));
    setEmail(localStorage.getItem("email"));
  }, []);

  // Ambil data
  useEffect(() => {
    if (email === null || materiId === undefined) return;

    const load = async () => {
      setLoading(true);

      try {
        // Ambil materi
        if (email) {
          const res = await fetch(
            `/api/belajar?email=${encodeURIComponent(email)}`
          );

          const data = await res.json();
          setMateri(Array.isArray(data.materi) ? data.materi : []);
        }

        // Kalau sudah pilih materi
        if (materiId) {
          const res = await fetch(
            `/api/belajar/quiz?materi=${materiId}`
          );

          const data = await res.json();
          setQuiz(Array.isArray(data) ? data : []);

          // Cek hasil quiz
          if (email) {
            const resHasil = await fetch(
              `/api/hasil-quiz?email=${encodeURIComponent(
                email
              )}&materi=${materiId}`
            );

            const dataHasil = await resHasil.json();

            if (dataHasil.sudahMengerjakan) {
              setHasil(dataHasil);
              setJawaban(dataHasil.jawaban || {});
            }
          }
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [email, materiId]);

  const pilih = (id, nilai) => {
    if (hasil) return;

    setJawaban((prev) => ({
      ...prev,
      [id]: nilai,
    }));
  };

  const selesai = async () => {
    if (!quiz.length) {
      alert("Quiz belum tersedia.");
      return;
    }

    if (quiz.some((item) => !jawaban[item.id])) {
      alert("Silakan jawab semua soal terlebih dahulu.");
      return;
    }

    let benar = 0;

    quiz.forEach((item) => {
      if (
        String(jawaban[item.id]) ===
        String(item.jawaban_benar)
      ) {
        benar++;
      }
    });

    const nilai = Math.round((benar / quiz.length) * 100);

    try {
      const res = await fetch("/api/hasil-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          materi_id: materiId,
          nilai,
          jawaban,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

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

  // Loading
  if (loading) {
    return (
      <main className="min-h-screen bg-slate-100 pt-28 p-6">
        <p className="text-gray-500">Memuat quiz...</p>
      </main>
    );
  }

  // Cari nama materi
  const namaMateri =
    materi.find(
      (item) => String(item.id) === String(materiId)
    )?.judul || "Quiz";

  // =========================================
  // DAFTAR MATERI
  // =========================================

  if (!materiId) {
    return (
      <main className="min-h-screen bg-slate-100 pt-28 pb-16 px-5">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-800">
            Quiz
          </h1>

          <p className="text-gray-500 mt-2 mb-8">
            Pilih materi untuk melihat quiz.
          </p>

          {materi.length === 0 ? (
            <div className="bg-white rounded-2xl shadow p-8">
              <p className="text-gray-500">
                Belum ada materi tersedia.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {materi.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow p-6"
                >
                  <div className="text-4xl mb-4">❓</div>

                  <h2 className="text-xl font-bold">
                    {item.judul}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {item.deskripsi}
                  </p>

                  <a
                    href={`/belajar/quiz?materi=${item.id}`}
                    className="inline-block mt-5 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl"
                  >
                    Lihat Quiz
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    );
  }

  // =========================================
  // HASIL QUIZ
  // =========================================

  if (hasil?.sudahMengerjakan) {
    return (
      <main className="min-h-screen bg-slate-100 pt-28 pb-16 px-5">
        <div className="max-w-4xl mx-auto">
          <a
            href="/belajar/quiz"
            className="text-orange-500 font-semibold"
          >
            ← Kembali
          </a>

          <h1 className="text-4xl font-bold text-slate-800 mt-5">
            Hasil Quiz
          </h1>

          <p className="text-gray-500 mt-2 mb-8">
            {namaMateri}
          </p>

          <div className="bg-white rounded-2xl shadow p-8 mb-8">
            <p className="text-gray-500">
              Nilai Anda
            </p>

            <p className="text-6xl font-bold text-green-600 mt-2">
              {hasil.nilai}
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-5">
            Jawaban Sebelumnya
          </h2>

          {quiz.map((item, index) => {
            const jawabanUser =
              hasil.jawaban?.[item.id];

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow p-5 mb-5"
              >
                <h3 className="font-semibold text-lg">
                  {index + 1}. {item.pertanyaan}
                </h3>

                {["A", "B", "C", "D"].map((opsi) => {
                  const teks =
                    item[`opsi_${opsi.toLowerCase()}`];

                  const benar =
                    opsi === item.jawaban_benar;

                  const dipilih =
                    opsi === jawabanUser;

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

                      {dipilih && (
                        <span className="ml-2">
                          ← Jawaban Anda
                        </span>
                      )}

                      {benar && (
                        <span className="ml-2">
                          ✓ Jawaban Benar
                        </span>
                      )}
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

  // =========================================
  // BELUM ADA QUIZ
  // =========================================

  if (quiz.length === 0) {
    return (
      <main className="min-h-screen bg-slate-100 pt-28 px-5">
        <div className="max-w-4xl mx-auto">
          <a
            href="/belajar/quiz"
            className="text-orange-500 font-semibold"
          >
            ← Kembali
          </a>

          <div className="bg-white rounded-2xl shadow p-8 mt-5">
            <h1 className="text-2xl font-bold">
              {namaMateri}
            </h1>

            <p className="text-gray-500 mt-3">
              Belum ada quiz untuk materi ini.
            </p>
          </div>
        </div>
      </main>
    );
  }

  // =========================================
  // KERJAKAN QUIZ
  // =========================================

  return (
    <main className="min-h-screen bg-slate-100 pt-28 pb-16 px-5">
      <div className="max-w-4xl mx-auto">
        <a
          href="/belajar/quiz"
          className="text-orange-500 font-semibold"
        >
          ← Kembali
        </a>

        <h1 className="text-4xl font-bold text-slate-800 mt-5">
          Quiz
        </h1>

        <p className="text-gray-500 mt-2 mb-8">
          {namaMateri}
        </p>

        {quiz.map((item, index) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow p-5 mb-5"
          >
            <h2 className="font-semibold text-lg">
              {index + 1}. {item.pertanyaan}
            </h2>

            {["A", "B", "C", "D"].map((opsi) => {
              const teks =
                item[`opsi_${opsi.toLowerCase()}`];

              return (
                <label
                  key={opsi}
                  className="block border rounded-lg p-3 mt-2 cursor-pointer hover:bg-slate-50"
                >
                  <input
                    type="radio"
                    name={`soal-${item.id}`}
                    checked={jawaban[item.id] === opsi}
                    onChange={() =>
                      pilih(item.id, opsi)
                    }
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
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
        >
          Selesai
        </button>
      </div>
    </main>
  );
}