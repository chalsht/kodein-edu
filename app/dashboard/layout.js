"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SidebarAdmin from "@/components/SidebarAdmin";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const login = localStorage.getItem("login");

    if (login !== "admin") {
      router.push("/login");
    }
  }, []);

  return (
    <div className="flex min-h-screen">
      <SidebarAdmin />

      <main className="flex-1 bg-slate-100 p-5 md:p-10 pt-20 md:pt-10">
        {children}
      </main>
    </div>
  );
}