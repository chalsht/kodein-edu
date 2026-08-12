"use client";

// ==========================================
// DASHBOARD SERTIFIKAT
// ==========================================

import { useEffect, useState } from "react";

export default function SertifikatAdmin() {

  const [peserta, setPeserta] = useState([]);

  // ==========================================
  // LOAD DATA
  // ==========================================

  const load = async () => {

    const res = await fetch("/api/nilai-admin");

    const data = await res.json();

    setPeserta(data);

  };

  useEffect(() => {

    load();

  }, []);

  // ==========================================
  // TERBITKAN
  // ==========================================

  const terbitkan = async (email) => {

    const res = await fetch("/api/sertifikat", {

      method: "POST",

      headers: {

        "Content-Type": "application/json"

      },

      body: JSON.stringify({

        email

      })

    });

    const hasil = await res.json();

    alert(hasil.message);

  };

  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-8">

        Sertifikat Peserta

      </h1>

      <table className="w-full bg-white rounded-xl shadow">

        <thead className="bg-slate-800 text-white">

          <tr>

            <th className="p-3">No</th>

            <th>Nama</th>

            <th>Email</th>

            <th>Nilai</th>

            <th>Aksi</th>

          </tr>

        </thead>

        <tbody>

          {

            peserta.map((item,index)=>(

              <tr
              key={item.email}
              className="border-b"
              >

                <td className="p-3">

                  {index+1}

                </td>

                <td>{item.nama}</td>

                <td>{item.email}</td>

                <td>{item.rata_rata}</td>

                <td>

                  <button
                    onClick={()=>terbitkan(item.email)}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >

                    Terbitkan

                  </button>

                </td>

              </tr>

            ))

          }

        </tbody>

      </table>

    </div>

  );

}