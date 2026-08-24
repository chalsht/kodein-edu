"use client";

import { useEffect, useState } from "react";

export default function Nilai() {
  const [nilai, setNilai] = useState([]);

  useEffect(() => {
    const load = async () => {
      const email = localStorage.getItem("email");
      const res = await fetch(`/api/nilai?email=${email}`);
      setNilai(await res.json());
    };

    load();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-8">Nilai Quiz</h1>

      <table className="w-full bg-white shadow rounded-xl">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="p-3">No</th>
            <th>Materi</th>
            <th>Nilai</th>
          </tr>
        </thead>

        <tbody>
          {nilai.map((item, index) => (
            <tr key={item.id} className="border-b">
              <td className="p-3">{index + 1}</td>
              <td>{item.judul}</td>
              <td>{item.nilai}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}