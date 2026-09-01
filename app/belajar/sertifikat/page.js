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
      <div className="min-h-[calc(100vh-100px)] flex items-center justify-center bg-gray-50">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-800">
          Sertifikat Belum Tersedia
        </h1>
      </div>
    );
  }

  const file = data[0].file_sertifikat;

  return (
    <div className="min-h-[calc(100vh-100px)] bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow">
        <h1 className="mb-6 text-center text-3xl font-bold text-slate-800">
          Sertifikat Saya
        </h1>

        <div className="flex justify-center">
          {file?.toLowerCase().endsWith(".pdf") ? (
            <iframe
              src={file}
              title="Sertifikat"
              className="h-[450px] w-full max-w-3xl rounded-lg border"
            />
          ) : (
            <img
              src={file}
              alt="Sertifikat"
              className="w-full max-w-3xl rounded-lg border shadow-sm"
            />
          )}
        </div>

        <div className="mt-6 text-center">
          <a
            href={file}
            download="Sertifikat-Kodein.pdf"
            className="inline-block rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
          >
            ↓ Download Sertifikat
          </a>
        </div>
      </div>
    </div>
  );
}
