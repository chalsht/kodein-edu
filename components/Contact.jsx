"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({
    nama: "", email: "", subjek: "", pesan: ""
  });

  const kontak = [
    [FaMapMarkerAlt, "Alamat", "Harvest City, Jl. Orchid Raya A, Ragemanunggal, Setu, Kabupaten Bekasi.", "text-sky-500 bg-sky-50"],
    [FaPhoneAlt, "Telepon", "0812-3456-7890", "text-orange-500 bg-orange-50"],
    [FaEnvelope, "Email", "info@kodeinedu.com", "text-red-500 bg-red-50"],
  ];

  async function kirimPesan(e) {
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
  }

  return (
    <section id="kontak" className="relative py-24 bg-white overflow-hidden">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-sky-50 rounded-full blur-3xl" />
      <div className="max-w-6xl mx-auto px-5 relative">

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="bg-sky-50 text-sky-600 px-4 py-2 rounded-full text-sm font-semibold">
            Hubungi Kami
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-black text-slate-800">
            Kami Siap <span className="text-orange-500">Membantu Anda</span>
          </h2>

          <p className="mt-4 text-gray-500">
            Kirim pesan kepada kami dan kami akan segera membantu Anda.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-7"
          >
            {kontak.map(([Icon, title, text, style], i) => (
              <motion.div
                key={title}
                whileHover={{ x: 6 }}
                className="flex gap-4 items-start"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${style}`}>
                  <Icon className="text-xl" />
                </div>

                <div>
                  <h3 className="font-bold text-slate-800">{title}</h3>
                  <p className="text-sm text-gray-500 mt-1 max-w-sm">{text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.form
            onSubmit={kirimPesan}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-7 rounded-3xl border border-gray-100 shadow-xl"
          >
            {["nama", "email", "subjek"].map((field) => (
              <input
                key={field}
                type={field === "email" ? "email" : "text"}
                placeholder={field === "nama" ? "Nama Lengkap" : field[0].toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="w-full mb-4 p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-sky-400"
                required
              />
            ))}

            <textarea
              rows="5"
              placeholder="Pesan"
              value={form.pesan}
              onChange={(e) => setForm({ ...form, pesan: e.target.value })}
              className="w-full mb-4 p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-sky-400 resize-none"
              required
            />

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold"
            >
              Kirim Pesan
            </motion.button>
          </motion.form>

        </div>
      </div>
    </section>
  );
}