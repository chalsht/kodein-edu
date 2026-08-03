"use client";

// =============================================
// LAYOUT DASHBOARD
// =============================================

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SidebarAdmin from "@/components/SidebarAdmin";

export default function DashboardLayout({ children }) {

  const router = useRouter();

  // Cek Login
  useEffect(() => {

    const login = localStorage.getItem("login");

    if (login !== "admin") {

      router.push("/login");

    }

  }, []);

  return (

    <div className="flex">

      {/* Sidebar */}

      <SidebarAdmin/>

      {/* Isi Halaman */}

      <main className="ml-72 flex-1 bg-slate-100 min-h-screen p-10">

        {children}

      </main>

    </div>

  );

}