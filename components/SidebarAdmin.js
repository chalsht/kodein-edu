"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function SidebarAdmin() {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  console.log("Sidebar open:", open);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function logout() {
    localStorage.removeItem("login");
    router.push("/");
  }

  const menu = [
    { href: "/dashboard", icon: "🏠", label: "Dashboard" },
    { href: "/dashboard/program", icon: "📚", label: "Kelola Program" },
    { href: "/dashboard/pesan", icon: "📩", label: "Pesan Masuk" },
    { href: "/dashboard/pendaftaran", icon: "📝", label: "Data Pendaftar" },
  ];

  return (
    <>
      {/* Tombol Menu Mobile */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-5 left-5 z-50 md:hidden bg-slate-900 text-white p-2 rounded-lg shadow-lg"
      >
        ☰
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
  <aside
  className={`
    bg-slate-900 text-white p-6 w-72
    md:static md:h-auto md:min-h-screen
    fixed top-0 h-screen z-50
    transition-all duration-300
    ${open ? "left-0" : "-left-72"}
  `}
>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-orange-400">
              Kodein Edu
            </h1>
            <p className="text-gray-400 mt-1">
              Dashboard Admin
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-2xl"
          >
            ✕
          </button>
        </div>

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
            className="w-full mt-6 bg-red-500 hover:bg-red-600 rounded-lg py-3"
          >
            🚪 Logout
          </button>
        </nav>
      </aside>
    </>
  );
}