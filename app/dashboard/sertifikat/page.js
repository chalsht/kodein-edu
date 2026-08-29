"use client";

import { useEffect, useState } from "react";

export default function SertifikatAdmin() {
  const [peserta, setPeserta] = useState([]);
  const [uploading, setUploading] = useState("");

  const load = async () => {
    const res = await fetch("/api/nilai-admin");
    setPeserta(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  const uploadSertifikat = async (email, file) => {
    if (!file) return;
    setUploading(email);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("file", file);

    try {
      const res = await fetch("/api/sertifikat", {
        method: "POST",
        body: formData,
      });

      const hasil = await res.json();
      alert(hasil.message);
    } catch {
      alert("Gagal mengupload sertifikat");
    } finally {
      setUploading("");
    }
  };

  return (
    <div className="p-5 md:p-10">
      <h1 className="mb-8 text-3xl md:text-4xl font-bold">
        Sertifikat Peserta
      </h1>

      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="w-full">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-3">No</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {peserta.map((item, index) => (
              <tr key={item.email} className="border-b">
                <td className="p-3">{index + 1}</td>
                <td>{item.nama}</td>
                <td>{item.email}</td>

                <td>
                  <span
                    className={
                      item.status === "Tuntas"
                        ? "font-semibold text-green-600"
                        : "font-semibold text-red-500"
                    }
                  >
                    {item.status === "Tuntas" ? "✓ Tuntas" : "Belum Tuntas"}
                  </span>

                  <div className="text-xs text-gray-500">
                    {item.jumlah_quiz_dikerjakan}/{item.total_quiz} Quiz
                  </div>
                </td>

                <td className="p-3">
                  <label className="cursor-pointer rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                    {uploading === item.email ? "Uploading..." : "Upload"}

                    <input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      className="hidden"
                      disabled={uploading === item.email}
                      onChange={(e) =>
                        uploadSertifikat(item.email, e.target.files[0])
                      }
                    />
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}