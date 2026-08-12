"use client";

// =====================================================
// HERO SECTION
// Halaman pertama yang dilihat pengunjung
// =====================================================

import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

import {
  FiCpu,
  FiMonitor,
  FiAward,
  FiUsers,
} from "react-icons/fi";

export default function Hero() {

  // ==========================================
  // DATA KEUNGGULAN
  // ==========================================

  const keunggulan = [
    {
      icon: FiCpu,
      warna: "text-orange-500",
      judul: "Praktis",
      deskripsi: "dan Seru",
    },
    {
      icon: FiMonitor,
      warna: "text-sky-500",
      judul: "Berbasis",
      deskripsi: "Proyek Nyata",
    },
    {
      icon: FiAward,
      warna: "text-red-500",
      judul: "Mentor",
      deskripsi: "Berpengalaman",
    },
    {
      icon: FiUsers,
      warna: "text-orange-500",
      judul: "Siap Hadapi",
      deskripsi: "Dunia Digital",
    },
  ];

  return (

    <section
      id="home"
      className="
        relative
        min-h-screen
        flex
        items-center
        overflow-hidden
        bg-white
        pt-28
        pb-16
      "
    >

      {/* =================================================
          BACKGROUND DECORATION
      ================================================= */}

      <div className="absolute inset-0 pointer-events-none">

        {/* Lingkaran orange */}

        <motion.div
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -top-32
            -right-32
            w-80
            h-80
            rounded-full
            bg-orange-100
            blur-2xl
          "
        />

        {/* Lingkaran biru */}

        <motion.div
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            bottom-0
            -left-32
            w-80
            h-80
            rounded-full
            bg-sky-100
            blur-2xl
          "
        />

        {/* Lingkaran merah kecil */}

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
          className="
            absolute
            top-40
            left-[45%]
            w-8
            h-8
            rounded-full
            bg-red-400/30
          "
        />

      </div>


      {/* =================================================
          CONTAINER
      ================================================= */}

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 w-full relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">


          {/* =================================================
              BAGIAN KIRI
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -60,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >

            {/* ==========================================
                BADGE
            ========================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: -15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
              }}
              className="
                inline-flex
                items-center
                gap-2
                bg-sky-50
                border
                border-sky-100
                text-sky-600
                px-5
                py-2.5
                rounded-full
                font-semibold
                shadow-sm
              "
            >

              <span className="animate-pulse">
                🚀
              </span>

              Kodein Edu Center

            </motion.div>


            {/* ==========================================
                JUDUL
            ========================================== */}

            <h1
              className="
                mt-6
                text-4xl
                sm:text-5xl
                lg:text-6xl
                xl:text-7xl
                font-black
                leading-[1.1]
                text-slate-800
              "
            >

              Belajar

              <span className="text-orange-500">
                {" "}Coding{" "}
              </span>

              Lebih Mudah

              <br />

              Bersama Mentor

              <span className="text-red-500">
                {" "}Profesional
              </span>

            </h1>


            {/* ==========================================
                GARIS AKSEN
            ========================================== */}

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 90 }}
              transition={{
                delay: 0.7,
                duration: 0.6,
              }}
              className="
                h-1.5
                bg-orange-500
                rounded-full
                mt-6
              "
            />


            {/* ==========================================
                DESKRIPSI
            ========================================== */}

            <p
              className="
                mt-5
                max-w-xl
                text-gray-600
                text-base
                md:text-lg
                leading-7
                md:leading-8
              "
            >

              Kodein Edu Center membantu siswa mempelajari
              dunia pemrograman, robotik, desain, dan teknologi
              digital melalui pembelajaran yang interaktif,
              menyenangkan, dan berbasis proyek.

            </p>


            {/* ==========================================
                KEUNGGULAN
            ========================================== */}

            <div
              className="
                mt-7
                border-t
                border-slate-200
                pt-6
              "
            >

              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

                {keunggulan.map((item, index) => {

                  const Icon = item.icon;

                  return (

                    <motion.div
                      key={item.judul}
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.4 + index * 0.1,
                      }}
                      whileHover={{
                        y: -5,
                      }}
                      className="
                        flex
                        flex-col
                        items-center
                        text-center
                        cursor-default
                      "
                    >

                      <motion.div
                        whileHover={{
                          scale: 1.15,
                          rotate: 5,
                        }}
                        className={`
                          text-3xl
                          md:text-4xl
                          ${item.warna}
                          mb-2
                        `}
                      >
                        <Icon />
                      </motion.div>

                      <h4
                        className="
                          font-bold
                          text-slate-800
                          text-sm
                          uppercase
                        "
                      >
                        {item.judul}
                      </h4>

                      <p className="text-sm text-gray-500">
                        {item.deskripsi}
                      </p>

                    </motion.div>

                  );

                })}

              </div>

            </div>


            {/* ==========================================
                TOMBOL
            ========================================== */}

            <div className="flex flex-col sm:flex-row gap-4 mt-9">

              {/* JELAJAHI PROGRAM */}

              <motion.a
                href="#program"
                whileHover={{
                  scale: 1.04,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="
                  bg-orange-500
                  hover:bg-orange-600
                  text-white
                  px-8
                  py-4
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  gap-3
                  shadow-lg
                  shadow-orange-200
                  transition
                  duration-300
                  font-bold
                "
              >

                Jelajahi Program

                <FaArrowRight />

              </motion.a>


              {/* DAFTAR SEKARANG */}

              <motion.a
                href="/pendaftaran"
                whileHover={{
                  scale: 1.04,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="
                  bg-sky-500
                  hover:bg-sky-600
                  text-white
                  px-8
                  py-4
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  gap-3
                  shadow-lg
                  shadow-sky-200
                  transition
                  duration-300
                  font-bold
                "
              >

                <FaCheckCircle />

                Daftar Sekarang

              </motion.a>

            </div>

          </motion.div>


          {/* =================================================
              BAGIAN KANAN
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 60,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="
              relative
              flex
              justify-center
              mt-10
              lg:mt-0
            "
          >

            {/* ==========================================
                LINGKARAN UTAMA
            ========================================== */}

            <motion.div
              animate={{
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                w-64
                h-64
                md:w-80
                md:h-80
                lg:w-[390px]
                lg:h-[390px]
                rounded-full
                bg-orange-100
              "
            />


            {/* ==========================================
                LINGKARAN BIRU
            ========================================== */}

            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                top-0
                right-0
                w-24
                h-24
                md:w-32
                md:h-32
                rounded-full
                bg-sky-200
              "
            />


            {/* ==========================================
                LINGKARAN MERAH
            ========================================== */}

            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                bottom-2
                left-0
                w-16
                h-16
                md:w-20
                md:h-20
                rounded-full
                bg-red-200
              "
            />


            {/* ==========================================
                GAMBAR
            ========================================== */}

            <motion.div
              whileHover={{
                scale: 1.02,
              }}
              transition={{
                duration: 0.3,
              }}
              className="relative z-10"
            >

              <Image
                src="/images/tentang.jpeg"
                alt="Kodein Edu Center"
                width={450}
                height={450}
                priority
                className="
                  w-full
                  max-w-xs
                  sm:max-w-sm
                  md:max-w-md
                  lg:max-w-lg
                  h-auto
                  rounded-[2rem]
                  shadow-2xl
                  border-4
                  border-white
                "
              />

            </motion.div>


            {/* ==========================================
                FLOATING CARD 1
            ========================================== */}

            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                z-20
                left-0
                top-10
                bg-white
                rounded-2xl
                shadow-xl
                px-4
                py-3
                flex
                items-center
                gap-3
                border
                border-slate-100
              "
            >

              <div className="
                w-10
                h-10
                rounded-xl
                bg-orange-100
                text-orange-500
                flex
                items-center
                justify-center
              ">
                <FiCpu className="text-xl" />
              </div>

              <div>

                <p className="font-bold text-slate-800 text-sm">
                  Belajar Teknologi
                </p>

                <p className="text-xs text-gray-500">
                  Berbasis proyek
                </p>

              </div>

            </motion.div>


            {/* ==========================================
                FLOATING CARD 2
            ========================================== */}

            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                z-20
                right-0
                bottom-10
                bg-white
                rounded-2xl
                shadow-xl
                px-4
                py-3
                flex
                items-center
                gap-3
                border
                border-slate-100
              "
            >

              <div className="
                w-10
                h-10
                rounded-xl
                bg-sky-100
                text-sky-500
                flex
                items-center
                justify-center
              ">
                <FiAward className="text-xl" />
              </div>

              <div>

                <p className="font-bold text-slate-800 text-sm">
                  Mentor Profesional
                </p>

                <p className="text-xs text-gray-500">
                  Siap membimbing
                </p>

              </div>

            </motion.div>

          </motion.div>

        </div>

      </div>

    </section>

  );

}