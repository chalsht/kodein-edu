"use client";

import { useEffect, useState } from "react";

export default function QuizAdmin() {
  const [materi, setMateri] = useState([]);
  const [quiz, setQuiz] = useState([]);

  const [jenis, setJenis] = useState("");
  const [program, setProgram] = useState("");
  const [kategori, setKategori] = useState("");
  const [materiId, setMateriId] = useState("");

  const [editId, setEditId] = useState(null);
  const [pertanyaan, setPertanyaan] = useState("");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [d, setD] = useState("");
  const [jawaban, setJawaban] = useState("A");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [materiRes, quizRes] = await Promise.all([
        fetch("/api/materi"),
        fetch("/api/quiz"),
      ]);

      const materiData = await materiRes.json();
      const quizData = await quizRes.json();

      setMateri(Array.isArray(materiData) ? materiData : []);
      setQuiz(Array.isArray(quizData) ? quizData : []);
    } catch (error) {
      console.error(error);
    }
  }

  const materiFiltered = materi.filter((item) => {
    if (jenis === "Program Unggulan")
      return item.program === program;

    if (jenis === "Bimbel Akademik")
      return (
        item.program === "Bimbel Akademik" &&
        item.kategori === kategori
      );

    return false;
  });

  function resetForm() {
    setEditId(null);
    setJenis("");
    setProgram("");
    setKategori("");
    setMateriId("");
    setPertanyaan("");
    setA("");
    setB("");
    setC("");
    setD("");
    setJawaban("A");
  }

  async function simpan(e) {
    e.preventDefault();

    if (!materiId) {
      alert("Pilih materi terlebih dahulu.");
      return;
    }

    try {
      const res = await fetch(
        editId ? `/api/quiz/${editId}` : "/api/quiz",
        {
          method: editId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            materi_id: materiId,
            pertanyaan,
            opsi_a: a,
            opsi_b: b,
            opsi_c: c,
            opsi_d: d,
            jawaban_benar: jawaban,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Gagal menyimpan quiz.");
        return;
      }

      alert(data.message || "Quiz berhasil disimpan.");
      resetForm();
      loadData();
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menyimpan quiz.");
    }
  }

  function editQuiz(item) {
    const m = materi.find(
      (x) => Number(x.id) === Number(item.materi_id)
    );

    setEditId(item.id);
    setMateriId(item.materi_id);
    setPertanyaan(item.pertanyaan || "");
    setA(item.opsi_a || "");
    setB(item.opsi_b || "");
    setC(item.opsi_c || "");
    setD(item.opsi_d || "");
    setJawaban(item.jawaban_benar || "A");

    if (m?.program === "Bimbel Akademik") {
      setJenis("Bimbel Akademik");
      setProgram("");
      setKategori(m.kategori || "");
    } else {
      setJenis("Program Unggulan");
      setProgram(m?.program || "");
      setKategori("");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-8">Kelola Quiz</h1>

      <form
        onSubmit={simpan}
        className="bg-white shadow rounded-xl p-6 space-y-4"
      >
        {/* Jenis */}
        <select
          value={jenis}
          onChange={(e) => {
            setJenis(e.target.value);
            setProgram("");
            setKategori("");
            setMateriId("");
          }}
          className="w-full border p-3 rounded-lg"
          required
        >
          <option value="">-- Pilih Jenis --</option>
          <option value="Program Unggulan">Program Unggulan</option>
          <option value="Bimbel Akademik">Bimbel Akademik</option>
        </select>

        {/* Program */}
        {jenis === "Program Unggulan" && (
          <select
            value={program}
            onChange={(e) => {
              setProgram(e.target.value);
              setMateriId("");
            }}
            className="w-full border p-3 rounded-lg"
            required
          >
            <option value="">-- Pilih Program --</option>
            <option value="Programmer">Programmer</option>
            <option value="IoT & Robotik">IoT & Robotik</option>
            <option value="Multimedia">Multimedia</option>
          </select>
        )}

        {/* Mata Pelajaran */}
        {jenis === "Bimbel Akademik" && (
          <select
            value={kategori}
            onChange={(e) => {
              setKategori(e.target.value);
              setMateriId("");
            }}
            className="w-full border p-3 rounded-lg"
            required
          >
            <option value="">-- Pilih Mata Pelajaran --</option>
            <option value="Bahasa Indonesia">Bahasa Indonesia</option>
            <option value="Bahasa Inggris">Bahasa Inggris</option>
            <option value="Fisika">Fisika</option>
            <option value="IPA">IPA</option>
            <option value="Matematika">Matematika</option>
          </select>
        )}

        {/* Materi */}
        {jenis && (
          <select
            value={materiId}
            onChange={(e) => setMateriId(e.target.value)}
            className="w-full border p-3 rounded-lg"
            required
          >
            <option value="">-- Pilih Materi --</option>

            {materiFiltered.map((item) => (
              <option key={item.id} value={item.id}>
                {item.judul}
              </option>
            ))}
          </select>
        )}

        {/* Pertanyaan & Opsi */}
        <textarea
          placeholder="Pertanyaan"
          value={pertanyaan}
          onChange={(e) => setPertanyaan(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />

        {[
          ["Opsi A", a, setA],
          ["Opsi B", b, setB],
          ["Opsi C", c, setC],
          ["Opsi D", d, setD],
        ].map(([placeholder, value, setter]) => (
          <input
            key={placeholder}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setter(e.target.value)}
            className="w-full border p-3 rounded-lg"
            required
          />
        ))}

        {/* Jawaban */}
        <select
          value={jawaban}
          onChange={(e) => setJawaban(e.target.value)}
          className="w-full border p-3 rounded-lg"
        >
          {["A", "B", "C", "D"].map((x) => (
            <option key={x} value={x}>
              {x}
            </option>
          ))}
        </select>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            {editId ? "Update Quiz" : "Simpan Quiz"}
          </button>

          {editId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
            >
              Batal
            </button>
          )}
        </div>
      </form>

      {/* Tabel */}
      <div className="mt-10 overflow-x-auto">
        <table className="w-full bg-white shadow rounded-xl">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-3">No</th>
              <th>Program</th>
              <th>Materi</th>
              <th>Pertanyaan</th>
              <th>Jawaban</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {quiz.map((item, index) => {
              const m = materi.find(
                (x) => Number(x.id) === Number(item.materi_id)
              );

              return (
                <tr key={item.id} className="border-b">
                  <td className="p-3 text-center">
                    {index + 1}
                  </td>
                  <td className="p-3">
                    {m?.program || "-"}
                  </td>
                  <td className="p-3">
                    {m?.judul || "-"}
                  </td>
                  <td className="p-3">
                    {item.pertanyaan}
                  </td>
                  <td className="p-3 text-center">
                    {item.jawaban_benar}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      type="button"
                      onClick={() => editQuiz(item)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}