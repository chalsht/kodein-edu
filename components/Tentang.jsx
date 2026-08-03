"use client";

// ======================================================
// FILE : components/Tentang.jsx
// SECTION TENTANG
// ======================================================

import Image from "next/image";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

export default function Tentang() {

  return (

    <section

      id="tentang"

      className="py-16 lg:py-24 bg-white overflow-hidden"

    >

      <div className="max-w-7xl mx-auto px-5 lg:px-8">

       <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ===================================
              GAMBAR
          =================================== */}

          <motion.div

            initial={{ opacity:0, x:-50 }}

            whileInView={{ opacity:1, x:0 }}

            viewport={{ once:true }}

          >
            <Image
  src="/images/tentang.jpeg"
  alt="Tentang Kodein"
  width={600}
  height={500}
  className="w-full rounded-3xl shadow-xl"
/>

          </motion.div>

          {/* ===================================
              INFORMASI
          =================================== */}

          <motion.div

            initial={{ opacity:0, x:50 }}

            whileInView={{ opacity:1, x:0 }}

            viewport={{ once:true }}

          >

            <span className="bg-sky-100 text-sky-600 px-4 py-2 rounded-full font-semibold">

              Tentang Kami

            </span>

            <h2 className="mt-6 text-4xl md:text-5xl font-black text-slate-800 leading-tight">

              Belajar Teknologi

              <span className="text-orange-500">

                {" "}Dengan Cara Menyenangkan

              </span>

            </h2>

            <p className="text-gray-600 text-base leading-8 mt-6">

              Kodein Edu Center merupakan lembaga pelatihan

              teknologi yang menyediakan berbagai program

              pembelajaran mulai dari coding, robotik,

              desain digital hingga pengembangan website.

              Kami percaya bahwa belajar teknologi harus

              menyenangkan, interaktif, dan menghasilkan

              karya nyata.

            </p>

            {/* ==========================
                KEUNGGULAN
            ========================== */}

            <div className="space-y-5 mt-10">

              <div className="flex gap-4">

                <FaCheckCircle className="text-orange-500 text-2xl"/>

                <p>

                  Mentor profesional dan berpengalaman

                </p>

              </div>

              <div className="flex gap-4">

                <FaCheckCircle className="text-orange-500 text-2xl"/>

                <p>

                  Belajar berbasis project nyata

                </p>

              </div>

              <div className="flex gap-4">

                <FaCheckCircle className="text-orange-500 text-2xl"/>

                <p>

                  Materi mengikuti perkembangan teknologi

                </p>

              </div>

              <div className="flex gap-4">

                <FaCheckCircle className="text-orange-500 text-2xl"/>

                <p>

                  Mendapat sertifikat setelah menyelesaikan program

                </p>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>

  );

}