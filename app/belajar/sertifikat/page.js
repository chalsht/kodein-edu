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

      setData(hasil);

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

  return (

    <div className="p-10">

      <div className="bg-white rounded-xl shadow p-10 text-center">

        <h1 className="text-4xl font-bold">

          Sertifikat

        </h1>

        <p className="mt-5">

          Nomor :

          {data[0].nomor_sertifikat}

        </p>

        <p>

          Tanggal :

          {data[0].tanggal}

        </p>

        <button
          className="mt-8 bg-blue-600 text-white px-6 py-3 rounded"
          onClick={() => window.print()}
        >

          Download / Cetak

        </button>

      </div>

    </div>

  );

}