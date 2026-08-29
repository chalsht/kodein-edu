"use client";

import { useEffect, useState } from "react";

export default function DataPendaftar() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const res = await fetch("/api/pendaftaran");
    setData(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const aktifkan = async (item) => {
    const password = prompt(`Masukkan password untuk ${item.nama}`);
    if (!password) return;

    const res = await fetch("/api/peserta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nama: item.nama,
        email: item.email,
        password,
        program: item.program,
      }),
    });

    const hasil = await res.json();
    alert(hasil.message);
    getData();
  };

  if (loading) return <div className="p-10">Memuat data...</div>;

  return (
    <div className="p-5 md:p-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">
        Data Pendaftar
      </h1>

      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="w-full">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-4">No</th>
              <th>Nama</th>
              <th>Email</th>
              <th>No HP</th>
              <th>Program</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className="border-b hover:bg-orange-50">
                <td className="p-4">{index + 1}</td>
                <td>{item.nama}</td>
                <td>{item.email}</td>
                <td>{item.no_hp}</td>
                <td>{item.program}</td>

                <td className="p-3">
                  {item.status === "Aktif" ? (
                    <span className="font-semibold text-green-600">
                      ✓ Sudah Aktif
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