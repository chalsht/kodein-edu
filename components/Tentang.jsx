"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaCode,
  FaLightbulb,
  FaGraduationCap,
  FaCertificate,
  FaChartLine,
} from "react-icons/fa";

export default function Tentang() {
  const keunggulan = [
    {
      icon: FaGraduationCap,
      title: "Mentor Profesional",
      desc: "Dibimbing oleh mentor berpengalaman di bidang teknologi",
      color: "blue",
    },
    {
      icon: FaCode,
      title: "Belajar Praktis",
      desc: "Materi berbasis project dan studi kasus nyata",
      color: "orange",
    },
    {
      icon: FaChartLine,
      title: "Perkembangan Terukur",
      desc: "Evaluasi rutin untuk memantau perkembanganmu",
      color: "blue",
    },
    {
      icon: FaCertificate,
      title: "Sertifikat Resmi",
      desc: "Dapatkan sertifikat setelah menyelesaikan program",
      color: "orange",
    },
  ];

  return (
    <section
      id="tentang"
      className="relative bg-white overflow-hidden py-20 lg:py-24"
    >

      {/* =========================
          BACKGROUND DECORATION
      ========================= */}

      <div className="absolute top-0 right-0 w-[380px] h-[300px] bg-sky-50 rounded-bl-[180px] -z-0" />

      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[-100px] top-40 w-64 h-64 rounded-full bg-orange-100 blur-3xl opacity-60"
      />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">

        {/* =========================
            MAIN CONTENT
        ========================= */}

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* =========================
              LEFT - TEXT
          ========================= */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >

            {/* TITLE */}

            <h2 className="mt-6 text-4xl md:text-5xl lg:text-[56px] font-black leading-[1.08] text-slate-800">
              Belajar Teknologi
              <br />

              <span className="text-orange-500">
                Dengan Cara
              </span>

              <br />

              <span className="text-orange-500">
                Menyenangkan
              </span>
            </h2>

            {/* DESCRIPTION */}

            <p className="mt-7 text-gray-600 text-base lg:text-[17px] leading-8 max-w-xl">
              Kodein Edu Center merupakan lembaga pelatihan teknologi
              yang menyediakan berbagai program pembelajaran mulai dari
              coding, robotik, desain digital hingga pengembangan website.
            </p>

            <p className="mt-2 text-gray-600 text-base lg:text-[17px] leading-8 max-w-xl">
              Kami percaya bahwa belajar teknologi harus menyenangkan,
              interaktif, dan menghasilkan karya nyata.
            </p>

          </motion.div>


          {/* =========================
              RIGHT - IMAGE
          ========================= */}

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >

            {/* BLUE SHAPE */}

            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-20 -top-10 w-72 h-56 bg-blue-600 rounded-[40%] -z-10"
            />

            {/* ORANGE CIRCLE */}

            <motion.div
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -left-12 bottom-0 w-48 h-48 bg-orange-500 rounded-full -z-10"
            />

            {/* DOTS */}

            <div className="absolute -left-10 top-24 grid grid-cols-4 gap-2">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.span
                  key={i}
                  animate={{
                    opacity: [0.25, 1, 0.25],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.08,
                    repeat: Infinity,
                  }}
                  className="w-1.5 h-1.5 bg-sky-400 rounded-full"
                />
              ))}
            </div>

            {/* IMAGE */}

            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [0, 1, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10"
            >
              <Image
                src="/images/tentang.jpeg"
                alt="Tentang Kodein Edu Center"
                width={700}
                height={520}
                priority
                className="w-full h-[350px] lg:h-[450px] object-cover rounded-[30px] shadow-2xl"
              />
            </motion.div>


            {/* =========================
                BADGE BELAJAR
            ========================= */}

            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute z-20 -top-5 left-[-20px] lg:left-[-30px] bg-white rounded-2xl shadow-xl px-4 py-4 flex items-center gap-3"
            >

              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                <FaGraduationCap className="text-blue-600 text-xl" />
              </div>

              <div>
                <p className="font-bold text-slate-800 text-sm">
                  Belajar Interaktif
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Materi praktis dan mudah dipahami
                </p>
              </div>

            </motion.div>


            {/* =========================
                BADGE PROJECT
            ========================= */}

            <motion.div
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute z-20 -bottom-6 right-[-10px] lg:right-[-30px] bg-white rounded-2xl shadow-xl px-4 py-4 flex items-center gap-3"
            >

              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
                <FaLightbulb className="text-orange-500 text-xl" />
              </div>

              <div>
                <p className="font-bold text-slate-800 text-sm">
                  Project Nyata
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Buat karya dan bangun portfolio terbaikmu
                </p>
              </div>

            </motion.div>

          </motion.div>

        </div>


        {/* =========================
            KEUNGGULAN
        ========================= */}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mt-24 bg-white rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 px-6 lg:px-8 py-8"
        >

          <div className="grid sm:grid-cols-2 lg:grid-cols-4">

            {keunggulan.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.15,
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  className={`flex items-center gap-4 px-5 py-4
                    ${
                      index !== 0
                        ? "lg:border-l border-gray-200"
                        : ""
                    }
                  `}
                >

                  <div
                    className={`min-w-14 h-14 rounded-full flex items-center justify-center
                    ${
                      item.color === "blue"
                        ? "bg-blue-50"
                        : "bg-orange-50"
                    }`}
                  >
                    <Icon
                      className={`text-xl ${
                        item.color === "blue"
                          ? "text-blue-600"
                          : "text-orange-500"
                      }`}
                    />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">
                      {item.title}
                    </h3>

                    <p className="text-xs text-gray-500 leading-5 mt-1">
                      {item.desc}
                    </p>
                  </div>

                </motion.div>
              );
            })}

          </div>

        </motion.div>

      </div>
    </section>
  );
}