"use client";

import { useState } from "react";

export default function Login() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ account, password }),
    });

    const data = await res.json();
    if (!data.success) return alert(data.message);

    localStorage.setItem("login", data.role);
    if (data.role === "user") localStorage.setItem("email", data.email);

    window.dispatchEvent(new Event("login"));
    alert(data.message);
    window.location.href = data.role === "admin" ? "/dashboard" : "/belajar";
  };

  return (
    <section className="min-h-screen bg-white flex items-center justify-center px-5 py-24 relative overflow-hidden">
      <div className="absolute top-32 left-0 w-72 h-32 bg-blue-100 rounded-r-full -rotate-6" />
      <div className="absolute top-40 right-12 w-7 h-7 border-4 border-blue-600 rounded-full" />
      <div className="absolute bottom-0 right-0 w-64 h-40 bg-blue-500 rounded-tl-full" />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-lg p-8 sm:p-12">

        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-2 mb-8">
            <div className="text-2xl font-bold text-blue-700">
              ● KODEIN
              <p className="text-sm text-red-500">EDU CENTER</p>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-slate-900">Login</h1>
          <p className="text-slate-500 mt-2">
            Login sebagai Admin atau User
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">Email / Username</label>
            <input
              type="text"
              placeholder="Masukkan Email atau Username"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-4 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Password</label>
            <input
              type="password"
              placeholder="Masukkan Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-4 outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold transition"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}