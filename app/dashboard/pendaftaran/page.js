"use client";

// ==========================================
// HALAMAN DATA PENDAFTAR
// ==========================================

import { useEffect, useState } from "react";

export default function DataPendaftar() {

  // ==========================================
  // STATE
  // ==========================================

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  // ==========================================
  // AMBIL DATA PENDAFTAR
  // ==========================================

  const getData = async () => {

    const res = await fetch("/api/pendaftaran");

    const result = await res.json();

    setData(result);

    setLoading(false);

  };

  useEffect(() => {

    getData();

  }, []);

  // ==========================================
  // AKTIFKAN PESERTA
  // ==========================================

  const aktifkan = async (item) => {

    const password = prompt(
      `Masukkan password untuk ${item.nama}`
    );

    if (!password) return;

    const res = await fetch("/api/peserta", {

      method: "POST",

      headers: {

        "Content-Type": "application/json",

      },

      body: JSON.stringify({

        nama: item.nama,
        email: item.email,
        password,
        program: item.program,

      }),

    });

    const hasil = await res.json();

alert(hasil.message);

// Refresh tabel
getData();

  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="p-10">

        Memuat data...

      </div>

    );

  }

  // ==========================================
  // TAMPILAN
  // ==========================================

  return (

    <div className="p-5 md:p-10">

      <h1 className="text-4xl font-bold mb-8">

        Data Pendaftar

      </h1>

      <div className="overflow-x-auto">

        <table className="min-w-full bg-white shadow rounded-xl">

          <thead className="bg-slate-800 text-white">

            <tr>

  <th className="p-3">No</th>

  <th>Nama</th>

  <th>Email</th>

  <th>No HP</th>

  <th>Program</th>

  <th>Status</th>

  <th>Aksi</th>

</tr>

          </thead>

          <tbody>

            {data.map((item, index) => (

              <tr
                key={item.id}
                className="border-b"
              >

                <td className="p-3">

                  {index + 1}

                </td>

                <td>{item.nama}</td>

                <td>{item.email}</td>

                <td>{item.no_hp}</td>

                <td>{item.program}</td>

                <td>{item.status}</td>

<td>

  {item.status}

</td>

<td>

  {item.status === "Aktif" ? (

    <span className="text-green-600 font-semibold">

      Sudah Aktif

    </span>

  ) : (

    <button
      onClick={() => aktifkan(item)}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
    >

      Aktifkan

    </button>

  )}

</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}