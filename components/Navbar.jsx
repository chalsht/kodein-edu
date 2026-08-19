"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [role, setRole] = useState("");
  const [scroll, setScroll] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const cekLogin = () => {
      const status = localStorage.getItem("login");
      setRole(status || "");
      setLogin(status === "admin" || status === "user");
    };

    cekLogin();
    window.addEventListener("login", cekLogin);
    window.addEventListener("storage", cekLogin);

    return () => {
      window.removeEventListener("login", cekLogin);
      window.removeEventListener("storage", cekLogin);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 30);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menu = [
    ["Home", "home"],
    ["Tentang", "tentang"],
    ["Program", "program"],
    ["Kontak", "kontak"],
  ];

  const linkClass = `
    relative px-4 py-2 text-slate-700 font-semibold
    hover:text-orange-500 transition
    group
  `;

  const buttonClass =
    "inline-flex items-center px-5 py-2.5 rounded-xl font-bold transition";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        scroll
          ? "bg-white shadow-lg py-2"
          : "bg-white/95 backdrop-blur-md py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <Link href="/">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Image
                src="/images/kodein.png"
                alt="Kodein Edu Center"
                width={60}
                height={60}
                className="object-contain"
              />
            </motion.div>
          </Link>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center gap-3">
            {menu.map(([nama, id]) => (
              <Link key={id} href={`/#${id}`} className={linkClass}>
                {nama}
                <span className="absolute left-4 right-4 bottom-0 h-[2px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform" />
              </Link>
            ))}

            <div className="w-px h-7 bg-slate-200 mx-2" />

            {!login ? (
              <>
                <Link
                  href="/pendaftaran"
                  className={`${buttonClass} bg-red-500 hover:bg-red-600 text-white`}
                >
                  Daftar Sekarang
                </Link>

                <Link
                  href="/login"
                  className={`${buttonClass} border-2 border-sky-400 text-sky-500 hover:bg-sky-400 hover:text-white`}
                >
                  Login
                </Link>
              </>
            ) : (
              <Link
                href={role === "admin" ? "/dashboard" : "/belajar"}
                className={`${buttonClass} bg-sky-400 hover:bg-sky-500 text-white px-6`}
              >
                Profil
              </Link>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-11 h-11 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center text-3xl"
            aria-label="Menu"
          >
            {open ? <HiX /> : <HiOutlineMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-t border-slate-100 bg-white"
          >
            <div className="px-5 py-6 space-y-2">

              {menu.map(([nama, id]) => (
                <Link
                  key={id}
                  href={`/#${id}`}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-xl text-slate-700 font-semibold hover:bg-orange-50 hover:text-orange-500"
                >
                  {nama}
                </Link>
              ))}

              <div className="h-px bg-slate-100 my-3" />

              {!login ? (
                <div className="grid gap-3">
                  <Link
                    href="/pendaftaran"
                    onClick={() => setOpen(false)}
                    className="text-center bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold"
                  >
                    Daftar Sekarang
                  </Link>

                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="text-center border-2 border-sky-400 text-sky-500 hover:bg-sky-400 hover:text-white py-3 rounded-xl font-bold"
                  >
                    Login
                  </Link>
                </div>
              ) : (
                <Link
                  href={role === "admin" ? "/dashboard" : "/belajar"}
                  onClick={() => setOpen(false)}
                  className="block text-center bg-sky-400 hover:bg-sky-500 text-white py-3 rounded-xl font-bold"
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