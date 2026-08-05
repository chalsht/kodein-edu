"use client";

// =====================================================
// FILE : app/dashboard/program/page.js
// HALAMAN CRUD PROGRAM ADMIN
// =====================================================

import { useEffect, useState } from "react";

export default function ProgramAdmin() {

  // ==========================
  // STATE
  // ==========================

const [namaProgram, setNamaProgram] = useState("");
const [kategori, setKategori] = useState("Program Unggulan");
const [deskripsi, setDeskripsi] = useState("");
const [gambar, setGambar] = useState(null);

  // Menyimpan semua data program
  const [program, setProgram] = useState([]);

  // Menyimpan id ketika edit
  const [editId, setEditId] = useState(null);

  // ==========================
  // Ambil data program
  // ==========================

  async function getProgram() {

    const res = await fetch("/api/program");

    const data = await res.json();

    setProgram(data);

  }

  useEffect(() => {

    getProgram();

  }, []);

  // ==========================
  // Simpan & Update
  // ==========================

async function simpan(e) {

  e.preventDefault();

  const formData = new FormData();

formData.append("nama_program", namaProgram);
formData.append("kategori", kategori);
formData.append("deskripsi", deskripsi);

  if (gambar) {
    formData.append("gambar", gambar);
  }

  let res;

  if (editId) {

    formData.append("id", editId);

    res = await fetch("/api/program", {

      method: "PUT",

      body: formData

    });

  } else {

    res = await fetch("/api/program", {

      method: "POST",

      body: formData

    });

  }

  const data = await res.json();

  alert(data.message);

setNamaProgram("");
setKategori("Program Unggulan");
setDeskripsi("");
setGambar(null);

  setEditId(null);

  getProgram();

}

  // ==========================
  // Edit
  // ==========================

  function edit(item) {

    setEditId(item.id);

setNamaProgram(item.nama_program);
setKategori(item.kategori);
setDeskripsi(item.deskripsi);
setGambar(null);

    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });

  }

  // ==========================
  // Hapus
  // ==========================

  async function hapus(id) {

    const yakin = confirm("Yakin ingin menghapus program?");

    if (!yakin) return;

    const res = await fetch("/api/program", {

      method: "DELETE",

      headers: {

        "Content-Type": "application/json"

      },

      body: JSON.stringify({

        id

      })

    });

    const data = await res.json();

    alert(data.message);

    getProgram();

  }

  return (

    <div className="max-w-7xl mx-auto p-10">

      <h1 className="text-4xl font-bold text-slate-800">

        Kelola Program

      </h1>

      <p className="text-gray-500 mt-2">

        Tambah, Edit, dan Hapus Program.

      </p>

     <form
  onSubmit={simpan}
  className="bg-white rounded-xl shadow-lg p-8 mt-8 space-y-5"
>
        {/* ==========================================
            Nama Program
        ========================================== */}

        <div>

          <label className="block mb-2 font-medium">

            Nama Program

          </label>

          <input

            type="text"

            value={namaProgram}

            onChange={(e)=>setNamaProgram(e.target.value)}

            placeholder="Contoh : Web Development"

            className="w-full border rounded-lg p-3"

            required

          />

        </div>

        <div>

  <label className="block mb-2 font-medium">
    Kategori
  </label>

  <select
    value={kategori}
    onChange={(e) => setKategori(e.target.value)}
    className="w-full border rounded-lg p-3"
    required
  >
    <option value="Program Unggulan">
      Program Unggulan
    </option>

    <option value="Bimbel Akademik">
      Bimbel Akademik
    </option>

  </select>

</div>
        {/* ==========================================
            Deskripsi
        ========================================== */}

        <div>

          <label className="block mb-2 font-medium">

            Deskripsi

          </label>

          <textarea

            value={deskripsi}

            onChange={(e)=>setDeskripsi(e.target.value)}

            placeholder="Masukkan deskripsi program"

            className="w-full border rounded-lg p-3 h-40"

            required

          />

        </div>


        {/* ==========================================
            Nama File Gambar
        ========================================== */}

        <div>

         <div>

  <label className="block mb-2 font-medium">
    Upload Gambar
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e)=>setGambar(e.target.files[0])}
    className="w-full border rounded-lg p-3"
  />

{
  gambar && (
    <img
      src={URL.createObjectURL(gambar)}
      alt="Preview"
      className="w-48 mt-4 rounded-lg border"
    />
  )
}

</div>

        </div>

        {/* ==========================================
            Tombol Simpan
        ========================================== */}

        <button

          type="submit"

          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg"

        >

          {editId ? "Update Program" : "Tambah Program"}

        </button>

      </form>
          {/* ======================================================
          TABEL DATA PROGRAM
      ====================================================== */}

      <div className="mt-10 overflow-x-auto">
  <div className="bg-white shadow-lg rounded-xl inline-block min-w-full">

  <table className="w-full border-collapse">

          {/* ==========================
              Header Tabel
          ========================== */}

          <thead className="bg-slate-900 text-white">

 <tr>
  <th className="p-4 w-16">No</th>
  <th className="p-4 w-32">Gambar</th>
  <th className="p-4 w-56">Nama Program</th>
  <th className="p-4 w-48">Kategori</th>
  <th className="p-4">Deskripsi</th>
  <th className="p-4 w-40">Aksi</th>
</tr>

</thead>
          {/* ==========================
              Isi Tabel
          ========================== */}

          <tbody>

            {

              program.length === 0 ?

              (

                <tr>

                  <td
  colSpan="6"
  className="text-center py-10 text-gray-500"
>

                    Belum ada data program.

                  </td>

                </tr>

              )

              :

              (

                program.map((item,index)=>(

                  <tr
                    key={item.id}
                    className="border-b hover:bg-orange-50"
                  >

                    {/* Nomor */}

                    <td className="p-4">

                      {index+1}

                    </td>

                    {/* Gambar */}

                    <td>

                <img src={`/images/${item.gambar}`}alt={item.nama_program} className="w-24 h-16 object-cover rounded-lg" />

                    </td>

                   {/* Nama Program */}

<td className="font-semibold">

  {item.nama_program}

</td>

{/* Kategori */}

<td>

  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
    item.kategori === "Program Unggulan"
      ? "bg-orange-100 text-orange-700"
      : "bg-blue-100 text-blue-700"
  }`}>
    {item.kategori}
  </span>

</td>

{/* Deskripsi */}

<td className="p-4 align-top">
  <div className="max-w-md">
    {item.deskripsi}
  </div>
</td>
                    {/* Tombol */}

                    <td className="p-4">
                      <div className="flex gap-2 whitespace-nowrap">

                      {/* Tombol Edit */}

                      <button

                        type="button"

                        onClick={() => edit(item)}

                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"

                      >

                        Edit

                      </button>

                      {/* Tombol Hapus */}

                      <button

                        type="button"

                        onClick={() => hapus(item.id)}

                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"

                      >

                        Hapus

                      </button>
                      </div>

                    </td>

                  </tr>

                ))

              )

            }

          </tbody>

        </table>

      </div>
          {/* ======================================================
          AKHIR HALAMAN
      ====================================================== */}

    </div>
    </div>
    

  );

}