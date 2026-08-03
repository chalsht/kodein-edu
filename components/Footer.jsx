"use client";

// ======================================================
// FILE : components/Footer.jsx
// FOOTER WEBSITE
// ======================================================

import Link from "next/link";
import Image from "next/image";
import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaTiktok,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {

  return (

    <footer className="bg-slate-900 text-white">

      <div className="max-w-7xl mx-auto px-8 py-16">

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

          {/* =====================================
              LOGO
          ===================================== */}

          <div>

            <Image
              src="/images/kodein.png"
              alt="Kodein Edu Center"
              width={90}
              height={90}
            />

            <h2 className="text-2xl font-bold mt-5">

              Kodein Edu Center

            </h2>

            <p className="text-gray-400 mt-5 leading-7">

              Tempat belajar coding, robotik, desain digital,
              dan teknologi untuk generasi masa depan.

            </p>

          </div>

          {/* =====================================
              MENU
          ===================================== */}

          <div>

            <h3 className="text-xl font-bold mb-6">

              Menu

            </h3>

            <div className="flex flex-col gap-4">

              <a href="#home" className="hover:text-orange-400">

                Home

              </a>

              <a href="#tentang" className="hover:text-orange-400">

                Tentang

              </a>

              <a href="#program" className="hover:text-orange-400">

                Program

              </a>

              <a href="#kontak" className="hover:text-orange-400">

                Kontak

              </a>

            </div>

          </div>

          {/* =====================================
              KONTAK
          ===================================== */}

          <div>

            <h3 className="text-xl font-bold mb-6">

              Kontak

            </h3>

            <div className="space-y-5">

              <div className="flex gap-4">

                <FaMapMarkerAlt className="text-orange-400 mt-1"/>

                <p>

                  Harvest City, Jl. Orchid Raya A, Ragemanunggal, Setu, Kabupaten Bekasi.
                </p>

              </div>

              <div className="flex gap-4">

                <FaPhoneAlt className="text-orange-400 mt-1"/>

                <p>

                  0812-3456-7890

                </p>

              </div>

              <div className="flex gap-4">

                <FaEnvelope className="text-orange-400 mt-1"/>

                <p>

                  info@kodeinedu.com

                </p>

              </div>

            </div>

          </div>

          {/* =====================================
              SOSIAL MEDIA
          ===================================== */}

          <div>

            <h3 className="text-xl font-bold mb-6">
              Ikuti Kami
            </h3>

            <div className="flex gap-5 text-3xl">

              <Link
                href="https://www.instagram.com/kodein.sch"
                target="_blank"
              >
                <FaInstagram className="hover:text-pink-500 duration-300"/>
              </Link>

              <Link
                href="https://www.facebook.com/kodein.707884"
                target="_blank"
              >
                <FaFacebook className="hover:text-blue-500 duration-300"/>
              </Link>

              <Link
                href="https://www.youtube.com/@sekolahITkodein"
                target="_blank"
              >
                <FaYoutube className="hover:text-red-500 duration-300"/>
              </Link>

              <Link
                href="https://www.tiktok.com/@kodein.sch"
                target="_blank"
              >
                <FaTiktok className="hover:text-white duration-300"/>
              </Link>

            </div>

          </div>

        </div>

        {/* =====================================
            COPYRIGHT
        ===================================== */}

        <div className="border-t border-slate-700 mt-12 pt-8 text-center text-gray-400">

          © {new Date().getFullYear()} Kodein Edu Center.
          All Rights Reserved.

        </div>

      </div>

    </footer>

  );

}