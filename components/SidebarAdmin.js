"use client";

// =============================================
// SIDEBAR ADMIN
// File : components/SidebarAdmin.js
// =============================================

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SidebarAdmin() {

  // Router Next.js
  const router = useRouter();

  // =============================================
  // Logout
  // =============================================

  function logout() {

    // Hapus status login
    localStorage.removeItem("login");

    alert("Logout berhasil.");

    router.push("/");

  }

  return (

    <aside className="w-72 bg-slate-900 text-white min-h-screen p-6 fixed">

      {/* Logo */}

      <h1 className="text-3xl font-bold text-orange-400">

        Kodein Edu

      </h1>

      <p className="text-gray-400 mt-2">

        Dashboard Admin

      </p>

      {/* Menu */}

      <nav className="mt-10 space-y-3">

        {/* Dashboard */}

        <Link
          href="/dashboard"
          className="block px-4 py-3 rounded-lg hover:bg-orange-500 duration-300"
        >

          🏠 Dashboard

        </Link>

        {/* Kelola Program */}

        <Link
          href="/dashboard/program"
          className="block px-4 py-3 rounded-lg hover:bg-orange-500 duration-300"
        >

          📚 Kelola Program

        </Link>

        {/* Pesan Masuk */}

        <Link
          href="/dashboard/pesan"
          className="block px-4 py-3 rounded-lg hover:bg-orange-500 duration-300"
        >

          📩 Pesan Masuk

        </Link>

        {/* Data Pendaftar */}

<Link
  href="/dashboard/pendaftaran"
  className="block px-4 py-3 rounded-lg hover:bg-orange-500 duration-300"
>
  📝 Data Pendaftar
</Link>

        {/* Logout */}

        <button
          onClick={logout}
          className="w-full text-left px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 duration-300"
        >

          🚪 Logout

        </button>

      </nav>

    </aside>

  );

}