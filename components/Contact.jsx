"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaPaperPlane,
  FaArrowRight,
} from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    subjek: "",
    pesan: "",
  });

  const kirim = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/pesan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message);

    if (data.success)
      setForm({ nama: "", email: "", subjek: "", pesan: "" });
  };

  const kontak = [
    [FaMapMarkerAlt, "Alamat", "Jl. Pendidikan No. 123, Kota Bandung"],
    [FaPhoneAlt, "Telepon / WhatsApp", "0812-3456-7890"],
    [FaEnvelope, "Email", "info@kodeinedu.com"],
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-5">

        {/* Judul */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-xs font-bold">
            HUBUNGI KAMI
          </span>

          <h1 className="text-3xl md:text-5xl font-black mt-4">
            Kami Siap Menjawab{" "}
            <span className="text-blue-600">Pertanyaanmu</span>
          </h1>

          <p className="text-slate-600 mt-4">
            Punya pertanyaan atau butuh informasi lebih lanjut?
            <br />Jangan ragu untuk menghubungi kami.
          </p>
        </motion.div>

        {/* Form & Kontak */}
        <div className="grid md:grid-cols-2 gap-10">

          <motion.form
            onSubmit={kirim}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="border rounded-2xl p-6 shadow-sm"
          >
            <h2 className="text-2xl font-black">Kirim Pesan</h2>
            <div className="w-8 h-1 bg-red-600 my-3" />

            <div className="grid md:grid-cols-2 gap-4">
              <input
                required
                placeholder="Nama Lengkap"
                value={form.nama}
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
                className="p-3 border rounded-lg"
              />

              <input
                required
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="p-3 border rounded-lg"
              />
            </div>

            <input
              placeholder="No. Telepon"
              value={form.subjek}
              onChange={(e) => setForm({ ...form, subjek: e.target.value })}
              className="w-full mt-4 p-3 border rounded-lg"
            />

            <textarea
              required
              rows="4"
              placeholder="Tulis pesan Anda di sini..."
              value={form.pesan}
              onChange={(e) => setForm({ ...form, pesan: e.target.value })}
              className="w-full mt-4 p-3 border rounded-lg resize-none"
            />

            <button className="w-full mt-4 py-3 bg-red-600 text-white rounded-lg font-bold flex justify-center gap-2">
              <FaPaperPlane /> Kirim Pesan
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-black">Informasi Kontak</h2>
            <div className="w-8 h-1 bg-red-600 my-3" />

            {kontak.map(([Icon, title, text]) => (
              <div key={title} className="flex gap-4 py-5 border-b">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Icon />
                </div>
                <div>
                  <b>{title}</b>
                  <p className="text-sm text-slate-600">{text}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Banner */}
        <div className="relative mt-10 h-[190px] rounded-2xl bg-blue-700 overflow-hidden">
          <div className="relative z-10 p-7 md:p-9 text-white">
            <h2 className="text-2xl md:text-3xl font-black">
              Siap Memulai Perjalanan Belajarmu?
            </h2>

            <p className="mt-2 text-sm">
              Bergabung sekarang dan wujudkan masa depan cerah
              <br />
              bersama Kodein Edu Center!
            </p>

            <a
              href="/pendaftaran"
              className="inline-flex items-center gap-3 mt-4 bg-white text-blue-600 px-5 py-3 rounded-lg font-bold hover:scale-105 transition"
            >
              Daftar Sekarang <FaArrowRight />
            </a>
          </div>

          <Image
            src="/images/tangan.png"
            alt="Belajar coding"
            fill
            className="object-contain object-right-bottom pointer-events-none"
          />
        </div>

      </div>
    </section>
  );
}