"use client";

import { useEffect, useState } from "react";

const programs = {
  "Program Unggulan": ["Programmer", "Multimedia", "IoT & Robotik"],
  "Bimbel Akademik": ["Fisika", "B.Indonesia", "Matematika", "IPA", "B.Inggris"],
};

export default function MateriAdmin() {
  const [kategori, setKategori] = useState("Program Unggulan");
  const [program, setProgram] = useState("Programmer");
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [fileMateri, setFileMateri] = useState(null);
  const [materi, setMateri] = useState([]);
  const [editId, setEditId] = useState(null);

  const getMateri = async () => {
    try {
      const res = await fetch("/api/materi");
      const data = await res.json();
      setMateri(Array.isArray(data) ? data : []);
    } catch {
      setMateri([]);
    }
  };

  useEffect(() => {
    getMateri();
  }, []);

  const ubahKategori = (e) => {
    const value = e.target.value;
    setKategori(value);
    setProgram(programs[value][0]);
  };

  const simpan = async (e) => {
    e.preventDefault();

    if (!editId && !fileMateri) {
      alert("Silakan pilih file materi terlebih dahulu.");
      return;
    }

    const formData = new FormData();
    formData.append("program", program);
    formData.append("kategori", kategori);
    formData.append("judul", judul);
    formData.append("deskripsi", deskripsi);

    if (fileMateri) formData.append("file_materi", fileMateri);

    const res = await fetch(
      editId ? `/api/materi/${editId}` : "/api/materi",
      {
        method: editId ? "PUT" : "POST",
        body: formData,
      }
    );

    const hasil = await res.json();
    alert(hasil.message);

    if (hasil.success) {
      setEditId(null);
      setKategori("Program Unggulan");
      setProgram("Programmer");
      setJudul("");
      setDeskripsi("");
      setFileMateri(null);
      document.getElementById("fileMateri").value = "";
      getMateri();
    }
  };

  const editMateri = (item) => {
    setEditId(item.id);
    setKategori(item.kategori);
    setProgram(item.program);
    setJudul(item.judul);
    setDeskripsi(item.deskripsi);
    setFileMateri(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hapusMateri = async (id) => {
    if (!confirm("Hapus materi?")) return;

    const res = await fetch(`/api/materi/${id}`, {
      method: "DELETE",
    });

    const hasil = await res.json();
    alert(hasil.message);

    if (hasil.success) getMateri();
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-8">Kelola Materi</h1>

      <form
        onSubmit={simpan}
        className="bg-white shadow rounded-xl p-6 space-y-4"
      >
        {/* Kategori */}
        <select
          value={kategori}
          onChange={ubahKategori}
          className="w-full border p-3 rounded-lg"
        >
          <option>Program Unggulan</option>
          <option>Bimbel Akademik</option>
        </select>

        {/* Program */}
        <select
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          className="w-full border p-3 rounded-lg"
        >
          {programs[kategori].map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Judul Materi"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />

        <textarea
          placeholder="Deskripsi"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          id="fileMateri"
          type="file"
          accept=".pdf,.mp4,.webm"
          onChange={(e) => setFileMateri(e.target.files?.[0] || null)}
          className="w-full border p-3 rounded-lg"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          {editId ? "Update Materi" : "Simpan Materi"}
        </button>
      </form>

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
              <tr key={item.id} className="border-b">
                <td className="p-3 text-center">{index + 1}</td>
                <td className="text-center">{item.program}</td>
                <td className="text-center">{item.kategori}</td>
                <td>{item.judul}</td>

                <td className="text-center">
                  {item.file_materi ? (
                    <a
                      href={item.file_materi}
                      target="_blank"
                      className="text-blue-600"
                    >
                      Lihat File
                    </a>
                  ) : "-"}
                </td>

                <td className="text-center">
                  <button
                    onClick={() => editMateri(item)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => hapusMateri(item.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
