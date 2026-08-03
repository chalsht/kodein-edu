"use client";

import { useState } from "react";

export default function Pendaftaran() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    no_hp: "",
    program: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/pendaftaran", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      alert("Pendaftaran berhasil!");

      setForm({
        nama: "",
        email: "",
        no_hp: "",
        program: "",
      });

    } else {
      alert(data.message);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 pt-28 pb-16">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-4xl font-bold text-center text-slate-800">
          Form Pendaftaran
        </h1>

        <p className="text-center text-gray-500 mt-3 mb-10">
          Silakan isi data diri untuk mendaftar program KODEIN.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="font-semibold">Nama Lengkap</label>

            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              className="w-full border rounded-xl p-3 mt-2"
              required
            />
          </div>

          <div>
            <label className="font-semibold">Email</label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Masukkan email"
              className="w-full border rounded-xl p-3 mt-2"
              required
            />
          </div>

          <div>
            <label className="font-semibold">Nomor HP</label>

            <input
              type="text"
              name="no_hp"
              value={form.no_hp}
              onChange={handleChange}
              placeholder="08xxxxxxxxxx"
              className="w-full border rounded-xl p-3 mt-2"
              required
            />
          </div>

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
              <option value="Robotik">Robotik</option>
              <option value="Web Development">Web Development</option>
              <option value="UI/UX Design">UI/UX Design</option>
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