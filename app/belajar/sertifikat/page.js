"use client";

import { useEffect, useState } from "react";

export default function Sertifikat() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const load = async () => {
      const email = localStorage.getItem("email");

      const res = await fetch(
        `/api/sertifikat-user?email=${email}`
      );

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

  return (
    <div className="p-6 md:p-10">
      <div className="rounded-2xl bg-white p-6 shadow">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Sertifikat Saya
        </h1>

        <div className="flex justify-center">
          {sertifikat.file_sertifikat?.endsWith(".pdf") ? (
            <iframe
              src={sertifikat.file_sertifikat}
              className="h-[700px] w-full max-w-5xl rounded-lg border"
              title="Sertifikat"
            />
          ) : (
            <img
              src={sertifikat.file_sertifikat}
              alt="Sertifikat"
              className="w-full max-w-5xl rounded-lg shadow"
            />
          )}
        </div>
      </div>
    </div>
  );
}