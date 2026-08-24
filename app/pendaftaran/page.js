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
    } else {
      alert(data.message);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 pt-28 pb-16 px-5">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg p-8 md:p-10">

        <h1 className="text-4xl font-bold text-center text-slate-800">
          Form Pendaftaran
        </h1>

        <p className="text-center text-gray-500 mt-3 mb-10">
          Silakan isi data diri untuk mendaftar program KODEIN.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          <Input
            label="Nama Lengkap"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            placeholder="Masukkan nama lengkap"
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Masukkan email"
          />

          <Input
            label="Nomor HP"
            name="no_hp"
            value={form.no_hp}
            onChange={handleChange}
            placeholder="08xxxxxxxxxx"
          />

          <div>
            <label className="font-semibold">Program</label>

            <select
              name="program"
              value={form.program}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 mt-2"
              required
            >
              <option value="">-- Pilih Program --</option>
              <option value="Programmer">Programmer</option>
              <option value="IoT & Robotik">IoT & Robotik</option>
              <option value="Multimedia">Multimedia</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl"
          >
            Daftar
          </button>

        </form>
      </div>
    </main>
  );
}

function Input({ label, name, type = "text", value, onChange, placeholder }) {
  return (
    <div>
      <label className="font-semibold">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border rounded-xl p-3 mt-2"
        required
      />
    </div>
  );
}