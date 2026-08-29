"use client";

import { useEffect, useState } from "react";

export default function DataPeserta() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setRows(data));
  }, []);

  return (
    <div className="p-5 md:p-10">
      <h1 className="text-3xl font-bold mb-8">Data Peserta</h1>

      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="w-full">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-3">No</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Program</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((item, index) => (
              <tr key={item.id} className="border-b">
                <td className="p-3 text-center">{index + 1}</td>
                <td>{item.nama}</td>
                <td>{item.email}</td>
                <td>{item.program}</td>
                <td
                  className={
                    item.status === "Aktif"
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }
                >
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}