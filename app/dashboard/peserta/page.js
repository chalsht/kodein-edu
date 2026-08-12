"use client";

import { useEffect, useState } from "react";

export default function DataPeserta() {

  // ==========================
  // STATE
  // ==========================

  const [rows, setRows] = useState([]);

  // ==========================
  // AMBIL DATA
  // ==========================

  async function getPeserta() {

    const res = await fetch("/api/users");

    const data = await res.json();

    setRows(data);

  }

  useEffect(() => {

    getPeserta();

  }, []);

  // ==========================
  // HAPUS PESERTA
  // ==========================

  async function hapusPeserta(id) {

    const yakin = confirm("Yakin ingin menghapus peserta?");

    if (!yakin) return;

    const res = await fetch(`/api/peserta/${id}`, {

      method: "DELETE",

    });

    const hasil = await res.json();

    alert(hasil.message);

    getPeserta();

  }

  return (

    <div className="p-5 md:p-10">

      <h1 className="text-4xl font-bold mb-8">

        Data Peserta

      </h1>

      <table className="w-full bg-white shadow rounded-xl">

        <thead className="bg-slate-800 text-white">

          <tr>

            <th className="p-3">No</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Program</th>
            <th>Status</th>
            <th>Aksi</th>

          </tr>

        </thead>

        <tbody>

          {rows.map((item, index) => (

            <tr key={item.id} className="border-b">

              <td className="p-3">{index + 1}</td>

              <td>{item.nama}</td>

              <td>{item.email}</td>

              <td>{item.program}</td>

              <td>

                <span
                  className={
                    item.status === "Aktif"
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }
                >
                  {item.status}
                </span>

              </td>

              <td>

                <button
                  onClick={() => hapusPeserta(item.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  Hapus
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}