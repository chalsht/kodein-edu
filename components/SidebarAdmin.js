"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function SidebarAdmin() {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function logout() {
    localStorage.removeItem("login");
    router.push("/");
  }

 const menu = [
  {
    href: "/dashboard",
    icon: "🏠",
    label: "Dashboard",
  },

  {
    href: "/dashboard/program",
    icon: "📚",
    label: "Kelola Program",
  },

  {
    href: "/dashboard/materi",
    icon: "📖",
    label: "Kelola Materi",
  },

  {
    href: "/dashboard/quiz",
    icon: "❓",
    label: "Kelola Quiz",
  },

  {
    href: "/dashboard/pendaftaran",
    icon: "📝",
    label: "Data Pendaftar",
  },

  {
    href: "/dashboard/peserta",
    icon: "👨‍🎓",
    label: "Data Peserta",
  },

  {
    href: "/dashboard/sertifikat",
    icon: "🏆",
    label: "Sertifikat",
  },

  {
    href: "/dashboard/pesan",
    icon: "📩",
    label: "Pesan Masuk",
  },
];

  return (
    <>
      {/* Tombol Mobile */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-5 left-5 z-50 md:hidden bg-slate-900 text-white px-3 py-2 rounded-lg"
      >
        ☰
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          bg-slate-900 text-white
          w-72 p-6 flex-shrink-0

          fixed top-0 left-0 h-screen z-50
          transition-transform duration-300

          ${open ? "translate-x-0" : "-translate-x-full"}

          md:static
          md:translate-x-0
          md:h-auto
          md:min-h-full
        `}
      >
        <h1 className="text-3xl font-bold text-orange-400">
          Kodein Edu
        </h1>

        <p className="text-gray-400 mt-2">
          Dashboard Admin
        </p>

        <nav className="mt-10 space-y-3">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-3 rounded-lg transition ${
                pathname === item.href
                  ? "bg-orange-500"
                  : "hover:bg-orange-500"
              }`}
            >
              {item.icon} {item.label}
            </Link>
          ))}

          <button
            onClick={logout}
            className="w-full mt-6 bg-red-500 hover:bg-red-600 py-3 rounded-lg"
          >
            🚪 Logout
          </button>
        </nav>
      </aside>
    </>
  );
}