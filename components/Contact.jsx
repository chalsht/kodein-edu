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

  const kontak = [
    [FaMapMarkerAlt, "Alamat", <>Jl. Pendidikan No. 123<br />Kota Bandung, Jawa Barat 40123</>, "text-blue-600 bg-blue-50"],
    [FaPhoneAlt, "Telepon / WhatsApp", "0812-3456-7890", "text-green-600 bg-green-50"],
    [FaEnvelope, "Email", "info@kodeinedu.com", "text-red-600 bg-red-50"],
  ];

  async function kirimPesan(e) {
    e.preventDefault();

    try {
      const res = await fetch("/api/pesan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      alert(data.message);

      if (data.success)
        setForm({ nama: "", email: "", subjek: "", pesan: "" });
    } catch {
      alert("Terjadi kesalahan saat mengirim pesan.");
    }
  }

  const animasi = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <section className="relative bg-white py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5">

        {/* Judul */}
        <motion.div {...animasi} className="text-center mb-10">
          <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">
            HUBUNGI KAMI
          </span>

          <h1 className="mt-4 text-3xl md:text-5xl font-black text-slate-900">
            Kami Siap Menjawab{" "}
            <span className="text-blue-600">Pertanyaanmu</span>
          </h1>

          <p className="mt-4 text-slate-600 leading-7">
            Punya pertanyaan, butuh informasi lebih lanjut, atau ingin bekerja sama?
            <br />
            Jangan ragu untuk menghubungi kami.
            <br />
            Kami akan dengan senang hati membantu Anda.
          </p>
        </motion.div>

        {/* Kontak */}
        <div className="grid lg:grid-cols-2 gap-10">

          {/* Form */}
          <motion.form
            {...animasi}
            onSubmit={kirimPesan}
            className="border border-slate-200 rounded-2xl p-6 shadow-sm"
          >
            <h2 className="text-2xl font-black">Kirim Pesan</h2>
            <div className="w-8 h-1 bg-red-600 rounded-full my-3 mb-5" />

            <div className="grid md:grid-cols-2 gap-4">
              {["nama", "email"].map((f) => (
                <div key={f}>
                  <label className="text-sm font-semibold">
                    {f === "nama" ? "Nama Lengkap" : "Email"}
                  </label>
                  <input
                    type={f === "email" ? "email" : "text"}
                    placeholder={
                      f === "nama"
                        ? "Masukkan nama lengkap Anda"
                        : "Masukkan email Anda"
                    }
                    value={form[f]}
                    onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                    className="w-full mt-1.5 p-3 border rounded-lg outline-none focus:border-blue-500"
                    required
                  />
                </div>
              ))}
            </div>

            <label className="block text-sm font-semibold mt-4">
              No. Telepon
            </label>
            <input
              placeholder="Masukkan nomor telepon Anda"
              value={form.subjek}
              onChange={(e) => setForm({ ...form, subjek: e.target.value })}
              className="w-full mt-1.5 p-3 border rounded-lg outline-none focus:border-blue-500"
            />

            <label className="block text-sm font-semibold mt-4">
              Pesan
            </label>
            <textarea
              rows="4"
              placeholder="Tulis pesan Anda di sini..."
              value={form.pesan}
              onChange={(e) => setForm({ ...form, pesan: e.target.value })}
              className="w-full mt-1.5 p-3 border rounded-lg outline-none focus:border-blue-500 resize-none"
              required
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full mt-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold flex justify-center gap-3"
            >
              <FaPaperPlane /> Kirim Pesan
            </motion.button>
          </motion.form>

          {/* Informasi Kontak - tanpa kotak */}
          <motion.div
            {...animasi}
            className="lg:py-5 lg:px-4"
          >
            <h2 className="text-2xl font-black">Informasi Kontak</h2>
            <div className="w-8 h-1 bg-red-600 rounded-full my-3 mb-5" />

            <div>
              {kontak.map(([Icon, title, text, warna], i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  whileHover={{ x: 8 }}
                  className="flex gap-4 py-4 border-b border-slate-200"
                >
                  <div className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center ${warna}`}>
                    <Icon />
                  </div>

                  <div>
                    <h3 className="font-bold">{title}</h3>
                    <p className="text-sm text-slate-600 mt-1">{text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mt-10 min-h-[190px] overflow-hidden rounded-2xl bg-blue-700"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="relative z-10 p-7 md:p-10"
          >
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Siap Memulai Perjalanan Belajarmu?
            </h2>

            <p className="text-white/90 mt-2 leading-7">
              Bergabung sekarang dan wujudkan masa depan cerah
              <br />
              bersama Kodein Edu Center!
            </p>

            <motion.a
              href="/daftar"
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 mt-4 bg-white text-blue-600 px-5 py-3 rounded-lg font-bold"
            >
              Daftar Sekarang <FaArrowRight />
            </motion.a>
          </motion.div>

          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute right-0 bottom-0 hidden md:block w-[48%] h-full"
          >
            <Image
              src="/images/tangan.png"
              alt="Belajar coding"
              fill
              className="object-contain object-bottom"
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}