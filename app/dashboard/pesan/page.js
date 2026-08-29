"use client";

import { useEffect, useState } from "react";

export default function PesanPage() {
  const [pesan, setPesan] = useState([]);

  async function getPesan() {
    const res = await fetch("/api/pesan");
    const data = await res.json();
    setPesan(data);
  }

  useEffect(() => {
    getPesan();
  }, []);

  async function hapus(id) {
    if (!confirm("Yakin ingin menghapus pesan?")) return;

    const res = await fetch("/api/pesan", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();
    alert(data.message);
    getPesan();
  }

  return (
    <div className="p-5 md:p-10">
      <h1 className="text-3xl font-bold text-slate-800">Pesan Masuk</h1>
      <p className="text-gray-500 mt-2">
        Semua pesan dari halaman kontak.
      </p>

      <div className="bg-white shadow-lg rounded-xl mt-8 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="p-4">No</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Pesan</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {pesan.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-500">
                  Belum ada pesan.
                </td>
              </tr>
            ) : (
              pesan.map((item, index) => (
                <tr key={item.id} className="border-b hover:bg-orange-50">
                  <td className="p-4">{index + 1}</td>
                  <td>{item.nama}</td>
                  <td>{item.email}</td>
                  <td className="max-w-sm">{item.pesan}</td>
                  <td>
                    <button
                      onClick={() => hapus(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}