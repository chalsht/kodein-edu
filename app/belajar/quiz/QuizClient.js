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

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    setMateriId(p.get("materi"));
    setEmail(localStorage.getItem("email"));
  }, []);

  useEffect(() => {
    if (email === null || materiId === undefined) return;

    const load = async () => {
      try {
        if (email) {
          const r = await fetch(
            `/api/belajar?email=${encodeURIComponent(email)}`
          );
          const d = await r.json();
          setMateri(d.materi || []);
        }

        if (materiId) {
          const r = await fetch(`/api/belajar/quiz?materi=${materiId}`);
          setQuiz(await r.json());

          if (email) {
            const r = await fetch(
              `/api/hasil-quiz?email=${encodeURIComponent(email)}&materi=${materiId}`
            );
            const d = await r.json();

            if (d.sudahMengerjakan) {
              setHasil(d);
              setJawaban(d.jawaban || {});
            }
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [email, materiId]);

  const pilih = (id, value) => {
    if (!hasil)
      setJawaban((p) => ({ ...p, [id]: value }));
  };

  const selesai = async () => {
    if (!quiz.length)
      return alert("Quiz belum tersedia.");

    if (quiz.some((q) => !jawaban[q.id]))
      return alert("Silakan jawab semua soal terlebih dahulu.");

    const benar = quiz.filter(
      (q) => String(jawaban[q.id]) === String(q.jawaban_benar)
    ).length;

    const nilai = Math.round((benar / quiz.length) * 100);

    try {
      const r = await fetch("/api/hasil-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          materi_id: materiId,
          nilai,
          jawaban,
        }),
      });

      const d = await r.json();

      if (!d.success) return alert(d.message);

      setHasil({ sudahMengerjakan: true, nilai, jawaban });
      alert(`Quiz selesai!\n\nNilai Anda: ${nilai}`);
    } catch (e) {
      console.error(e);
      alert("Gagal menyimpan hasil quiz.");
    }
  };

  if (loading)
    return (
      <main className="min-h-screen bg-slate-100 pt-28 p-6">
        <p className="text-gray-500">Memuat quiz...</p>
      </main>
    );

  const namaMateri =
    materi.find((m) => String(m.id) === String(materiId))?.judul || "Quiz";

  if (!materiId)
    return (
      <Page>
        <h1 className="title">Quiz</h1>
        <p className="desc">Pilih materi untuk melihat quiz.</p>

        {!materi.length ? (
          <Box>Belum ada materi tersedia.</Box>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {materi.map((m) => (
              <Box key={m.id}>
                <div className="text-4xl">❓</div>
                <h2 className="text-xl font-bold mt-3">{m.judul}</h2>
                <p className="text-gray-500 mt-2">{m.deskripsi}</p>
                <a
                  href={`/belajar/quiz?materi=${m.id}`}
                  className="inline-block mt-5 bg-orange-500 text-white px-5 py-3 rounded-xl"
                >
                  Lihat Quiz
                </a>
              </Box>
            ))}
          </div>
        )}
      </Page>
    );

  if (hasil?.sudahMengerjakan)
    return (
      <Page>
        <a href="/belajar/quiz" className="text-orange-500 font-semibold">
          ← Kembali
        </a>

        <h1 className="title">Hasil Quiz</h1>
        <p className="desc">{namaMateri}</p>

        <Box>
          <p className="text-gray-500">Nilai Anda</p>
          <p className="text-6xl font-bold text-green-600 mt-2">
            {hasil.nilai}
          </p>
        </Box>

        <h2 className="text-2xl font-bold mb-5">
          Jawaban Sebelumnya
        </h2>

        {quiz.map((q, i) => (
          <Box key={q.id}>
            <h3 className="font-semibold text-lg">
              {i + 1}. {q.pertanyaan}
            </h3>

            {["A", "B", "C", "D"].map((o) => {
              const benar = o === q.jawaban_benar;
              const dipilih = o === hasil.jawaban?.[q.id];

              return (
                <div
                  key={o}
                  className={`border rounded-lg p-3 mt-2 ${
                    benar
                      ? "bg-green-100 border-green-500"
                      : dipilih
                      ? "bg-red-100 border-red-500"
                      : ""
                  }`}
                >
                  <b>{o}.</b> {q[`opsi_${o.toLowerCase()}`]}
                  {dipilih && <span className="ml-2">← Jawaban Anda</span>}
                  {benar && <span className="ml-2">✓ Jawaban Benar</span>}
                </div>
              );
            })}
          </Box>
        ))}
      </Page>
    );

  if (!quiz.length)
    return (
      <Page>
        <a href="/belajar/quiz" className="text-orange-500 font-semibold">
          ← Kembali
        </a>

        <Box>
          <h1 className="text-2xl font-bold">{namaMateri}</h1>
          <p className="text-gray-500 mt-3">
            Belum ada quiz untuk materi ini.
          </p>
        </Box>
      </Page>
    );

  return (
    <Page>
      <a href="/belajar/quiz" className="text-orange-500 font-semibold">
        ← Kembali
      </a>

      <h1 className="title">Quiz</h1>
      <p className="desc">{namaMateri}</p>

      {quiz.map((q, i) => (
        <Box key={q.id}>
          <h2 className="font-semibold text-lg">
            {i + 1}. {q.pertanyaan}
          </h2>

          {["A", "B", "C", "D"].map((o) => (
            <label
              key={o}
              className="block border rounded-lg p-3 mt-2 cursor-pointer hover:bg-slate-50"
            >
              <input
                type="radio"
                name={`soal-${q.id}`}
                checked={jawaban[q.id] === o}
                onChange={() => pilih(q.id, o)}
              />
              <span className="ml-2">
                <b>{o}.</b> {q[`opsi_${o.toLowerCase()}`]}
              </span>
            </label>
          ))}
        </Box>
      ))}

      <button
        onClick={selesai}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
      >
        Selesai
      </button>
    </Page>
  );
}

function Page({ children }) {
  return (
    <main className="min-h-screen bg-slate-100 pt-28 pb-16 px-5">
      <div className="max-w-4xl mx-auto">{children}</div>
    </main>
  );
}

function Box({ children }) {
  return (
    <div className="bg-white rounded-2xl shadow p-5 mb-5">
      {children}
    </div>
  );
}