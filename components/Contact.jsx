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
    <main id="kontak" className="min-h-screen bg-white overflow-hidden">
      <section className="px-5 pt-28 pb-12 sm:px-8 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-black text-slate-900">
            Kami Siap Menjawab{" "}
            <span className="text-blue-600">Pertanyaanmu</span>
          </h1>

          <p className="mt-4 text-slate-600 leading-6">
            Punya pertanyaan atau butuh informasi lebih lanjut?
            <br />
            Jangan ragu untuk menghubungi kami.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">

          <motion.form
            onSubmit={kirim}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border border-slate-200 rounded-2xl p-6 shadow-sm"
          >
            <h2 className="text-2xl font-black text-slate-900">
              Kirim Pesan
            </h2>

            <div className="w-8 h-1 bg-red-500 my-3" />

            <div className="grid md:grid-cols-2 gap-4">
              <input
                required
                placeholder="Nama Lengkap"
                value={form.nama}
                onChange={(e) =>
                  setForm({ ...form, nama: e.target.value })
                }
                className="p-3 border rounded-lg outline-none focus:border-blue-500"
              />

              <input
                required
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="p-3 border rounded-lg outline-none focus:border-blue-500"
              />
            </div>

            <textarea
              required
              rows="5"
              placeholder="Tulis pesan Anda di sini..."
              value={form.pesan}
              onChange={(e) =>
                setForm({ ...form, pesan: e.target.value })
              }
              className="w-full mt-4 p-3 border rounded-lg resize-none outline-none focus:border-blue-500"
            />

            <button className="w-full mt-4 py-3 bg-red-500 text-white rounded-lg font-bold flex justify-center items-center gap-2 hover:bg-red-600 hover:scale-[1.02] transition">
              <FaPaperPlane />
              Kirim Pesan
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-black text-slate-900">
              Informasi Kontak
            </h2>

            <div className="w-8 h-1 bg-red-500 my-3" />

            {kontak.map(([Icon, title, text]) => (
              <motion.div
                key={title}
                whileHover={{ x: 5 }}
                className="flex gap-4 py-5 border-b"
              >
                <div className="w-11 h-11 shrink-0 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Icon />
                </div>

                <div>
                  <b className="text-slate-900">{title}</b>
                  <p className="text-sm text-slate-600 mt-1">{text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative max-w-6xl mx-auto mt-10 h-[190px] rounded-2xl bg-blue-700 overflow-hidden"
        >
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
              Daftar Sekarang
              <FaArrowRight />
            </a>
          </div>

          <Image
            src="/images/tangan.png"
            alt="Belajar coding"
            fill
            className="object-contain object-right-bottom pointer-events-none"
          />
        </motion.div>

      </section>
    </main>
  );
}