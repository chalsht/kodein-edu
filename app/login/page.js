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

    if (data.role === "user")
      localStorage.setItem("email", data.email);

    window.dispatchEvent(new Event("login"));
    alert(data.message);

    window.location.href =
      data.role === "admin" ? "/dashboard" : "/belajar";
  };

  return (
    <section className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-slate-800">
          Login
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Login sebagai Admin atau User
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              Email / Username
            </label>

            <input
              type="text"
              placeholder="Masukkan Email atau Username"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Masukkan Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold duration-300"
          >
            Login
          </button>

        </form>
      </div>
    </section>
  );
}