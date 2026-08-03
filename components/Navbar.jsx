"use client";

// ===================================================
// FILE : components/Navbar.jsx
// NAVBAR
// ===================================================

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";

export default function Navbar() {

  // ==========================================
  // STATE
  // ==========================================

  const [open, setOpen] = useState(false);

  const [login, setLogin] = useState(false);

  const [scroll, setScroll] = useState(false);

  // Mengetahui halaman aktif
  const pathname = usePathname();

  // ==========================================
  // CEK LOGIN
  // ==========================================

  useEffect(() => {

    const cekLogin = () => {

      const status = localStorage.getItem("login");

      setLogin(status === "admin");

    };

    cekLogin();

    window.addEventListener("login", cekLogin);

    return () => {

      window.removeEventListener("login", cekLogin);

    };

  }, []);

  // ==========================================
  // EFEK SCROLL
  // ==========================================

  useEffect(() => {

    function handleScroll() {

      setScroll(window.scrollY > 30);

    }

    window.addEventListener("scroll", handleScroll);

    return () => {

      window.removeEventListener("scroll", handleScroll);

    };

  }, []);

  // ==========================================
  // STYLE MENU
  // ==========================================

  const menu =
    "hover:text-orange-500 duration-300 font-semibold";

  return (

    <nav
      className={`
      fixed
      top-0
      left-0
      w-full
      z-50
      duration-300
      ${
        scroll
          ? "bg-white shadow-lg"
          : "bg-white/90 backdrop-blur"
      }
      `}
    >

      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        {/* ===========================
            LOGO
        =========================== */}

        <Link href="/">

          <Image
            src="/images/kodein.png"
            alt="Kodein"
            width={65}
            height={65}
          />

        </Link>

        {/* ===========================
            MENU DESKTOP
        =========================== */}

        <ul className="hidden md:flex items-center gap-10 text-slate-700">

          {/* HOME */}

          <li>

            {

              pathname === "/"

              ?

              <a href="#home" className={menu}>

                Home

              </a>

              :

              <Link href="/#home" className={menu}>

                Home

              </Link>

            }

          </li>

          {/* TENTANG */}

          <li>

            {

              pathname === "/"

              ?

              <a href="#tentang" className={menu}>

                Tentang

              </a>

              :

              <Link href="/#tentang" className={menu}>

                Tentang

              </Link>

            }

          </li>

          {/* PROGRAM */}

          <li>

            {

              pathname === "/"

              ?

              <a href="#program" className={menu}>

                Program

              </a>

              :

              <Link href="/#program" className={menu}>

                Program

              </Link>

            }

          </li>
                    {/* ===========================
              KONTAK
          =========================== */}

          <li>

            {

              pathname === "/"

              ?

              <a href="#kontak" className={menu}>

                Kontak

              </a>

              :

              <Link href="/#kontak" className={menu}>

                Kontak

              </Link>

            }

          </li>

          {/* ===========================
              LOGIN ADMIN
          =========================== */}

          {

            login

            ?

            (

              <li>

                <Link

                  href="/dashboard"

                  className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-xl"

                >

                  Profil

                </Link>

              </li>

            )

            :

            (

              <li>

                <Link

                  href="/pendaftaran"

                  className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl"

                >

                  Daftar Sekarang

                </Link>

              </li>

            )

          }

        </ul>

        {/* ===========================
            HAMBURGER
        =========================== */}

        <button

          onClick={() => setOpen(!open)}

          className="md:hidden text-3xl"

        >

          {

            open

            ?

            <HiX/>

            :

            <HiOutlineMenuAlt3/>

          }

        </button>

      </div>

      {/* ===========================
          MOBILE MENU
      =========================== */}

      {

        open && (

          <div className="md:hidden bg-white shadow-lg">

            <div className="flex flex-col gap-5 p-6">

              {

                pathname === "/"

                ?

                <a href="#home" onClick={()=>setOpen(false)}>

                  Home

                </a>

                :

                <Link href="/#home" onClick={()=>setOpen(false)}>

                  Home

                </Link>

              }

              {

                pathname === "/"

                ?

                <a href="#tentang" onClick={()=>setOpen(false)}>

                  Tentang

                </a>

                :

                <Link href="/#tentang" onClick={()=>setOpen(false)}>

                  Tentang

                </Link>

              }

              {

                pathname === "/"

                ?

                <a href="#program" onClick={()=>setOpen(false)}>

                  Program

                </a>

                :

                <Link href="/#program" onClick={()=>setOpen(false)}>

                  Program

                </Link>

              }

              {

                pathname === "/"

                ?

                <a href="#kontak" onClick={()=>setOpen(false)}>

                  Kontak

                </a>

                :

                <Link href="/#kontak" onClick={()=>setOpen(false)}>

                  Kontak

                </Link>

              }

              {

                login

                ?

                (

                  <Link

                    href="/dashboard"

                    onClick={()=>setOpen(false)}

                  >

                    Profil

                  </Link>

                )

                :

                (

                  <Link

                    href="/pendaftaran"

                    onClick={()=>setOpen(false)}

                    className="bg-orange-500 text-white py-3 rounded-xl text-center"

                  >

                    Daftar Sekarang

                  </Link>

                )

              }

            </div>

          </div>

        )

      }

    </nav>

  );

}