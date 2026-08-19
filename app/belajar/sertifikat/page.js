"use client";

import { useEffect, useState } from "react";

export default function Sertifikat() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const load = async () => {
      const email = localStorage.getItem("email");

      const res = await fetch(`/api/sertifikat-user?email=${email}`);

      const hasil = await res.json();
      setData(Array.isArray(hasil) ? hasil : []);
    };

    load();
  }, []);

  if (data.length === 0) {
    return (
      <div className="p-10">
        <h1 className="text-3xl font-bold">
          Sertifikat Belum Tersedia
        </h1>
      </div>
    );
  }

  const sertifikat = data[0];
  const fileSertifikat = sertifikat.file_sertifikat;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow">

        {/* Judul */}
        <h1 className="mb-6 text-center text-3xl font-bold">
          Sertifikat Saya
        </h1>

        {/* Preview Sertifikat */}
        <div className="flex justify-center">
          {fileSertifikat?.toLowerCase().endsWith(".pdf") ? (
            <iframe
              src={fileSertifikat}
              className="h-[450px] w-full max-w-3xl rounded-lg border"
              title="Sertifikat"
            />
          ) : (
            <img
              src={fileSertifikat}
              alt="Sertifikat"
              className="w-full max-w-3xl rounded-lg border shadow-sm"
            />
          )}
        </div>

        {/* Tombol Download */}
        <div className="mt-6 flex justify-center">
          <a
            href={fileSertifikat}
            download="Sertifikat-Kodein.pdf"
            className="rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
          >
            ↓ Download Sertifikat
          </a>
        </div>

      </div>
    </div>
  );
}