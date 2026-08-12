"use client";

// ===================================================
// FILE : components/Navbar.jsx
// NAVBAR KODEIN EDU CENTER
// ===================================================

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {

  // ==========================================
  // STATE
  // ==========================================

  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [role, setRole] = useState("");
  const [scroll, setScroll] = useState(false);

  const pathname = usePathname();

  // ==========================================
  // CEK STATUS LOGIN
  // ==========================================

  useEffect(() => {

    const cekLogin = () => {

      const status = localStorage.getItem("login");

      setRole(status || "");

      setLogin(
        status === "admin" || status === "user"
      );

    };

    // Cek saat pertama halaman dibuka
    cekLogin();

    // Cek perubahan login
    window.addEventListener("login", cekLogin);
    window.addEventListener("storage", cekLogin);

    return () => {
      window.removeEventListener("login", cekLogin);
      window.removeEventListener("storage", cekLogin);
    };

  }, []);

  // ==========================================
  // EFEK SCROLL
  // ==========================================

  useEffect(() => {

    const handleScroll = () => {
      setScroll(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []);

  // ==========================================
  // MENU NAVBAR
  // ==========================================

  const menu = [
    ["Home", "home"],
    ["Tentang", "tentang"],
    ["Program", "program"],
    ["Kontak", "kontak"],
  ];

  // ==========================================
  // RETURN
  // ==========================================

  return (

    <nav
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-300
        ${
          scroll
            ? "bg-white shadow-lg py-2"
            : "bg-white/95 backdrop-blur-md py-3"
        }
      `}
    >

      {/* ==========================================
          NAVBAR UTAMA
      ========================================== */}

      <div className="max-w-7xl mx-auto px-5 md:px-8">

        <div className="flex items-center justify-between">

          {/* ==========================================
              LOGO
          ========================================== */}

          <Link
            href="/"
            className="group"
          >

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >

              <Image
                src="/images/kodein.png"
                alt="Kodein Edu Center"
                width={60}
                height={60}
                className="object-contain"
              />

            </motion.div>

          </Link>


          {/* ==========================================
              MENU DESKTOP
          ========================================== */}

          <div className="hidden md:flex items-center gap-3">

            {/* MENU UTAMA */}

            {menu.map(([nama, id]) => (

              <Link
                key={id}
                href={`/#${id}`}
                className="
                  relative
                  px-4 py-2
                  text-slate-700
                  font-semibold
                  group
                  transition-colors
                  duration-300
                  hover:text-orange-500
                "
              >

                {nama}

                {/* GARIS ANIMASI */}

                <span
                  className="
                    absolute
                    left-4
                    right-4
                    bottom-0
                    h-[2px]
                    bg-orange-500
                    scale-x-0
                    group-hover:scale-x-100
                    transition-transform
                    duration-300
                    origin-center
                  "
                />

              </Link>

            ))}


            {/* ==========================================
                PEMBATAS
            ========================================== */}

            <div className="w-px h-7 bg-slate-200 mx-2" />


            {/* ==========================================
                BELUM LOGIN
            ========================================== */}

            {!login && (

              <>

                {/* DAFTAR SEKARANG */}

                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >

                  <Link
                    href="/pendaftaran"
                    className="
                      inline-flex
                      items-center
                      bg-orange-500
                      hover:bg-orange-600
                      text-white
                      px-5
                      py-2.5
                      rounded-xl
                      font-bold
                      shadow-md
                      shadow-orange-200
                      transition
                      duration-300
                    "
                  >
                    Daftar Sekarang
                  </Link>

                </motion.div>


                {/* LOGIN */}

                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >

                  <Link
                    href="/login"
                    className="
                      inline-flex
                      items-center
                      border-2
                      border-sky-400
                      text-sky-500
                      hover:bg-sky-400
                      hover:text-white
                      px-5
                      py-2
                      rounded-xl
                      font-bold
                      transition
                      duration-300
                    "
                  >
                    Login
                  </Link>

                </motion.div>

              </>

            )}


            {/* ==========================================
                SUDAH LOGIN
            ========================================== */}

            {login && (

              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >

                <Link
                  href={
                    role === "admin"
                      ? "/dashboard"
                      : "/belajar"
                  }
                  className="
                    inline-flex
                    items-center
                    bg-sky-400
                    hover:bg-sky-500
                    text-white
                    px-6
                    py-2.5
                    rounded-xl
                    font-bold
                    shadow-md
                    shadow-sky-100
                    transition
                    duration-300
                  "
                >
                  Profil
                </Link>

              </motion.div>

            )}

          </div>


          {/* ==========================================
              HAMBURGER MOBILE
          ========================================== */}

          <button
            onClick={() => setOpen(!open)}
            className="
              md:hidden
              w-11
              h-11
              rounded-xl
              bg-orange-50
              text-orange-500
              flex
              items-center
              justify-center
              text-3xl
              hover:bg-orange-100
              transition
            "
            aria-label="Menu"
          >

            {open ? <HiX /> : <HiOutlineMenuAlt3 />}

          </button>

        </div>

      </div>


      {/* ==========================================
          MOBILE MENU
      ========================================== */}

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{
              opacity: 0,
              height: 0
            }}

            animate={{
              opacity: 1,
              height: "auto"
            }}

            exit={{
              opacity: 0,
              height: 0
            }}

            className="
              md:hidden
              overflow-hidden
              border-t
              border-slate-100
              bg-white
            "
          >

            <div className="px-5 py-6 space-y-2">

              {/* MENU */}

              {menu.map(([nama, id]) => (

                <Link
                  key={id}
                  href={`/#${id}`}
                  onClick={() => setOpen(false)}
                  className="
                    block
                    px-4
                    py-3
                    rounded-xl
                    text-slate-700
                    font-semibold
                    hover:bg-orange-50
                    hover:text-orange-500
                    transition
                  "
                >
                  {nama}
                </Link>

              ))}


              {/* GARIS */}

              <div className="h-px bg-slate-100 my-3" />


              {/* ==========================================
                  BELUM LOGIN
              ========================================== */}

              {!login && (

                <div className="grid grid-cols-1 gap-3">

                  {/* DAFTAR */}

                  <Link
                    href="/pendaftaran"
                    onClick={() => setOpen(false)}
                    className="
                      text-center
                      bg-orange-500
                      hover:bg-orange-600
                      text-white
                      py-3
                      rounded-xl
                      font-bold
                      transition
                    "
                  >
                    Daftar Sekarang
                  </Link>


                  {/* LOGIN */}

                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="
                      text-center
                      border-2
                      border-sky-400
                      text-sky-500
                      hover:bg-sky-400
                      hover:text-white
                      py-3
                      rounded-xl
                      font-bold
                      transition
                    "
                  >
                    Login
                  </Link>

                </div>

              )}


              {/* ==========================================
                  SUDAH LOGIN
              ========================================== */}

              {login && (

                <Link
                  href={
                    role === "admin"
                      ? "/dashboard"
                      : "/belajar"
                  }
                  onClick={() => setOpen(false)}
                  className="
                    block
                    text-center
                    bg-sky-400
                    hover:bg-sky-500
                    text-white
                    py-3
                    rounded-xl
                    font-bold
                    transition
                  "
                >
                  Profil
                </Link>

              )}

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </nav>

  );
}