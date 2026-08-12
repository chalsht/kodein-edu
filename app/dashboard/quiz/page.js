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

  // ==========================================
  // AMBIL DATA
  // ==========================================

  const getMateri = async () => {
    try {
      const res = await fetch("/api/materi");
      const data = await res.json();

      setMateri(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

  const getQuiz = async () => {
    try {
      const res = await fetch("/api/quiz");
      const data = await res.json();

      setQuiz(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMateri();
    getQuiz();
  }, []);

  // ==========================================
  // MATERI YANG DITAMPILKAN
  // ==========================================

  const materiFiltered = materi.filter((item) => {
    if (jenis === "Program Unggulan") {
      return item.program === program;
    }

    if (jenis === "Bimbel Akademik") {
      return (
        item.program === "Bimbel Akademik" &&
        item.kategori === kategori
      );
    }

    return false;
  });

  // ==========================================
  // RESET FORM
  // ==========================================

  const resetForm = () => {
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
  };

  // ==========================================
  // SIMPAN / UPDATE
  // ==========================================

  const simpan = async (e) => {
    e.preventDefault();

    if (!materiId) {
      alert("Pilih materi terlebih dahulu.");
      return;
    }

    const url = editId
      ? `/api/quiz/${editId}`
      : "/api/quiz";

    const method = editId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
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
      });

      const data = await res.json();

      alert(data.message);

      resetForm();
      getQuiz();
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan quiz.");
    }
  };

  // ==========================================
  // EDIT
  // ==========================================

  const editQuiz = (item) => {
    const dataMateri = materi.find(
      (m) => Number(m.id) === Number(item.materi_id)
    );

    setEditId(item.id);
    setMateriId(item.materi_id);
    setPertanyaan(item.pertanyaan);
    setA(item.opsi_a);
    setB(item.opsi_b);
    setC(item.opsi_c);
    setD(item.opsi_d);
    setJawaban(item.jawaban_benar);

    if (dataMateri) {
      if (dataMateri.program === "Bimbel Akademik") {
        setJenis("Bimbel Akademik");
        setProgram("");
        setKategori(dataMateri.kategori);
      } else {
        setJenis("Program Unggulan");
        setProgram(dataMateri.program);
        setKategori("");
      }
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================================
  // HAPUS
  // ==========================================

  const hapusQuiz = async (id) => {
    if (!confirm("Hapus quiz?")) return;

    try {
      const res = await fetch(`/api/quiz/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      alert(data.message);
      getQuiz();
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus quiz.");
    }
  };

  return (
    <div className="p-10">

      <h1 className="text-4xl font-bold mb-8">
        Kelola Quiz
      </h1>

      {/* ==========================================
          FORM
      ========================================== */}

      <form
        onSubmit={simpan}
        className="bg-white shadow rounded-xl p-6 space-y-4"
      >

        {/* JENIS */}

        <div>
          <label className="block font-semibold mb-2">
            Jenis Program
          </label>

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
            <option value="">
              -- Pilih Jenis --
            </option>

            <option value="Program Unggulan">
              Program Unggulan
            </option>

            <option value="Bimbel Akademik">
              Bimbel Akademik
            </option>
          </select>
        </div>


        {/* PROGRAM UNGGULAN */}

        {jenis === "Program Unggulan" && (
          <div>
            <label className="block font-semibold mb-2">
              Program Unggulan
            </label>

            <select
              value={program}
              onChange={(e) => {
                setProgram(e.target.value);
                setMateriId("");
              }}
              className="w-full border p-3 rounded-lg"
              required
            >
              <option value="">
                -- Pilih Program --
              </option>

              <option value="Programmer">
                Programmer
              </option>

              <option value="IoT & Robotik">
                IoT & Robotik
              </option>

              <option value="Multimedia">
                Multimedia
              </option>
            </select>
          </div>
        )}


        {/* BIMBEL AKADEMIK */}

        {jenis === "Bimbel Akademik" && (
          <div>
            <label className="block font-semibold mb-2">
              Mata Pelajaran
            </label>

            <select
              value={kategori}
              onChange={(e) => {
                setKategori(e.target.value);
                setMateriId("");
              }}
              className="w-full border p-3 rounded-lg"
              required
            >
              <option value="">
                -- Pilih Mata Pelajaran --
              </option>

              <option value="Bahasa Indonesia">
                Bahasa Indonesia
              </option>

              <option value="Bahasa Inggris">
                Bahasa Inggris
              </option>

              <option value="Fisika">
                Fisika
              </option>

              <option value="IPA">
                IPA
              </option>

              <option value="Matematika">
                Matematika
              </option>
            </select>
          </div>
        )}


        {/* MATERI */}

        {jenis && (
          <div>
            <label className="block font-semibold mb-2">
              Materi
            </label>

            <select
              value={materiId}
              onChange={(e) => setMateriId(e.target.value)}
              className="w-full border p-3 rounded-lg"
              required
            >
              <option value="">
                -- Pilih Materi --
              </option>

              {materiFiltered.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.judul}
                </option>
              ))}
            </select>

            {materiFiltered.length === 0 &&
              (program || kategori) && (
                <p className="text-red-500 text-sm mt-2">
                  Belum ada materi untuk pilihan ini.
                </p>
              )}
          </div>
        )}


        {/* PERTANYAAN */}

        <textarea
          placeholder="Pertanyaan"
          value={pertanyaan}
          onChange={(e) => setPertanyaan(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />


        {/* OPSI */}

        <input
          placeholder="Opsi A"
          value={a}
          onChange={(e) => setA(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          placeholder="Opsi B"
          value={b}
          onChange={(e) => setB(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          placeholder="Opsi C"
          value={c}
          onChange={(e) => setC(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          placeholder="Opsi D"
          value={d}
          onChange={(e) => setD(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />


        {/* JAWABAN */}

        <select
          value={jawaban}
          onChange={(e) => setJawaban(e.target.value)}
          className="w-full border p-3 rounded-lg"
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>


        {/* BUTTON */}

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


      {/* ==========================================
          TABEL QUIZ
      ========================================== */}

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

              const dataMateri = materi.find(
                (m) =>
                  Number(m.id) ===
                  Number(item.materi_id)
              );

              return (
                <tr
                  key={item.id}
                  className="border-b"
                >

                  <td className="p-3 text-center">
                    {index + 1}
                  </td>

                  <td className="p-3">
                    {dataMateri?.program || "-"}
                  </td>

                  <td className="p-3">
                    {dataMateri?.judul || "-"}
                  </td>

                  <td className="p-3">
                    {item.pertanyaan}
                  </td>

                  <td className="p-3 text-center">
                    {item.jawaban_benar}
                  </td>

                  <td className="p-3">

                    <div className="flex justify-center gap-2">

                      <button
                        type="button"
                        onClick={() => editQuiz(item)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => hapusQuiz(item.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Hapus
                      </button>

                    </div>

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