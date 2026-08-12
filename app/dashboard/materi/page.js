"use client";

// ==========================================
// HALAMAN MATERI ADMIN
// ==========================================

import { useEffect, useState } from "react";

export default function MateriAdmin() {

  // ==========================================
  // STATE
  // ==========================================

  const [program, setProgram] = useState("Programmer");
  const [kategori, setKategori] = useState("Program Unggulan");
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  // File yang dipilih
  const [fileMateri, setFileMateri] = useState(null);

  const [materi, setMateri] = useState([]);

  // ID EDIT
  const [editId, setEditId] = useState(null);

  // ==========================================
  // AMBIL DATA
  // ==========================================

  const getMateri = async () => {

    try {

      const res = await fetch("/api/materi");

      const data = await res.json();

      console.log("DATA API:", data);

      if (Array.isArray(data)) {

        setMateri(data);

      } else {

        console.error("API mengembalikan:", data);

        setMateri([]);

      }

    } catch (error) {

      console.error(error);

      setMateri([]);

    }

  };

  useEffect(() => {

    getMateri();

  }, []);

  // ==========================================
  // SIMPAN / UPDATE
  // ==========================================

  const simpan = async (e) => {

    e.preventDefault();

    // ==============================
    // CEK FILE SAAT TAMBAH
    // ==============================

    if (!editId && !fileMateri) {

      alert("Silakan pilih file materi terlebih dahulu.");

      return;

    }

    try {

      const formData = new FormData();

      formData.append("program", program);
      formData.append("kategori", kategori);
      formData.append("judul", judul);
      formData.append("deskripsi", deskripsi);

      // Kalau ada file baru
      if (fileMateri) {

        formData.append("file_materi", fileMateri);

      }

      const url = editId
        ? `/api/materi/${editId}`
        : "/api/materi";

      const method = editId
        ? "PUT"
        : "POST";

      const res = await fetch(url, {

        method,

        body: formData,

      });

      const hasil = await res.json();

      alert(hasil.message);

      if (hasil.success) {

        setEditId(null);

        setProgram("Programmer");
        setKategori("Program Unggulan");
        setJudul("");
        setDeskripsi("");
        setFileMateri(null);

        // reset input file
        const inputFile = document.getElementById("fileMateri");

        if (inputFile) {

          inputFile.value = "";

        }

        getMateri();

      }

    } catch (error) {

      console.error(error);

      alert("Terjadi kesalahan saat menyimpan materi.");

    }

  };

  // ==========================================
  // EDIT
  // ==========================================

  const editMateri = (item) => {

    setEditId(item.id);

    setProgram(item.program);

    setKategori(item.kategori);

    setJudul(item.judul);

    setDeskripsi(item.deskripsi);

    // Saat edit, file baru belum dipilih
    setFileMateri(null);

    // Reset input file
    const inputFile = document.getElementById("fileMateri");

    if (inputFile) {

      inputFile.value = "";

    }

    window.scrollTo({

      top: 0,

      behavior: "smooth",

    });

  };

  // ==========================================
  // BATAL EDIT
  // ==========================================

  const batalEdit = () => {

    setEditId(null);

    setProgram("Programmer");
    setKategori("Program Unggulan");
    setJudul("");
    setDeskripsi("");
    setFileMateri(null);

    const inputFile = document.getElementById("fileMateri");

    if (inputFile) {

      inputFile.value = "";

    }

  };

  // ==========================================
  // HAPUS
  // ==========================================

  const hapusMateri = async (id) => {

    if (!confirm("Hapus materi?")) return;

    try {

      const res = await fetch(

        `/api/materi/${id}`,

        {

          method: "DELETE",

        }

      );

      const hasil = await res.json();

      alert(hasil.message);

      if (hasil.success) {

        getMateri();

      }

    } catch (error) {

      console.error(error);

      alert("Gagal menghapus materi.");

    }

  };

  // ==========================================
  // RETURN
  // ==========================================

  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-8">

        Kelola Materi

      </h1>

      <form
        onSubmit={simpan}
        className="bg-white shadow rounded-xl p-6 space-y-4"
      >

        {/* ==================================
            PROGRAM
        ================================== */}

        <select
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          className="w-full border p-3 rounded-lg"
        >

          <option>Programmer</option>

          <option>Multimedia</option>

          <option>IoT & Robotik</option>

        </select>

        {/* ==================================
            KATEGORI
        ================================== */}

        <select
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          className="w-full border p-3 rounded-lg"
        >

          <option>Bimbel Akademik</option>

          <option>Program Unggulan</option>

        </select>

        {/* ==================================
            JUDUL
        ================================== */}

        <input
          type="text"
          placeholder="Judul Materi"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />

        {/* ==================================
            DESKRIPSI
        ================================== */}

        <textarea
          placeholder="Deskripsi"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        {/* ==================================
            FILE MATERI
        ================================== */}

        <div>

          <label className="block font-semibold mb-2">

            File Materi

          </label>

          <input
            id="fileMateri"
            type="file"
            accept=".pdf,.mp4,.webm"
            onChange={(e) => {

              setFileMateri(
                e.target.files?.[0] || null
              );

            }}
            className="w-full border p-3 rounded-lg"
          />

          <p className="text-sm text-gray-500 mt-2">

            Format yang didukung: PDF, MP4, WEBM

          </p>

          {editId && (

            <p className="text-sm text-orange-500 mt-2">

              Kosongkan jika tidak ingin mengganti file lama.

            </p>

          )}

          {fileMateri && (

            <p className="text-sm text-green-600 mt-2">

              File dipilih: {fileMateri.name}

            </p>

          )}

        </div>

        {/* ==================================
            BUTTON
        ================================== */}

        <div className="flex gap-3">

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >

            {editId
              ? "Update Materi"
              : "Simpan Materi"
            }

          </button>

          {editId && (

            <button
              type="button"
              onClick={batalEdit}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
            >

              Batal

            </button>

          )}

        </div>

      </form>

      {/* ======================================
          TABEL MATERI
      ====================================== */}

      <div className="mt-10 overflow-x-auto">

        <table className="w-full bg-white shadow rounded-xl">

          <thead className="bg-slate-800 text-white">

            <tr>

              <th className="p-3">No</th>

              <th>Program</th>

              <th>Kategori</th>

              <th>Judul</th>

              <th>File</th>

              <th>Aksi</th>

            </tr>

          </thead>

          <tbody>

            {materi.map((item, index) => (

              <tr
                key={item.id}
                className="border-b"
              >

                <td className="p-3 text-center">

                  {index + 1}

                </td>

                <td className="text-center">

                  {item.program}

                </td>

                <td className="text-center">

                  {item.kategori}

                </td>

                <td>

                  {item.judul}

                </td>

                <td className="text-center">

                  {item.file_materi ? (

                    <a
                      href={item.file_materi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >

                      Lihat File

                    </a>

                  ) : (

                    "-"

                  )}

                </td>

                <td>

                  <div className="flex gap-2 justify-center">

                    <button
                      type="button"
                      onClick={() => editMateri(item)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >

                      Edit

                    </button>

                    <button
                      type="button"
                      onClick={() => hapusMateri(item.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >

                      Hapus

                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}