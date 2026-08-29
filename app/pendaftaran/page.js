"use client";

import { useState } from "react";

export default function Pendaftaran() {
  const empty = { nama: "", email: "", no_hp: "", program: "" };
  const [form, setForm] = useState(empty);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/pendaftaran", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (data.success) {
      alert("Pendaftaran berhasil!");
      setForm(empty);
    } else alert(data.message);
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-5 py-24 relative overflow-hidden">
      <div className="absolute top-32 left-0 w-72 h-32 bg-blue-100 rounded-r-full -rotate-6" />
      <div className="absolute bottom-0 right-0 w-64 h-40 bg-blue-500 rounded-tl-full" />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-lg p-8 sm:p-10">
        <div className="text-center mb-8">
          <div className="text-2xl font-bold text-blue-700 mb-6">
            ● KODEIN
            <p className="text-sm text-red-500">EDU CENTER</p>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">
            Daftar Sekarang
          </h1>
          <p className="text-slate-500 mt-2">
            Silakan isi data diri untuk mendaftar program KODEIN.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            ["Nama Lengkap", "nama", "text", "Masukkan nama lengkap"],
            ["Email", "email", "email", "Masukkan email"],
            ["Nomor HP", "no_hp", "text", "08xxxxxxxxxx"],
          ].map(([label, name, type, placeholder]) => (
            <div key={name}>
              <label className="font-semibold">{label}</label>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full border border-slate-300 rounded-xl p-3 mt-2 outline-none focus:border-blue-500"
                required
              />
            </div>
          ))}

          <div>
            <label className="font-semibold">Program</label>
            <select
              name="program"
              value={form.program}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl p-3 mt-2 outline-none focus:border-blue-500"
              required
            >
              <option value="">-- Pilih Program --</option>
              <option value="Programmer">Programmer</option>
              <option value="IoT & Robotik">IoT & Robotik</option>
              <option value="Multimedia">Multimedia</option>
            </select>
          </div>

          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition">
            Daftar
          </button>
        </form>
      </div>
    </main>
  );
}