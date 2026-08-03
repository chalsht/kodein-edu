"use client";

import { useState } from "react";

export default function Login() {

  // Menyimpan input username
  const [username, setUsername] = useState("");

  // Menyimpan input password
  const [password, setPassword] = useState("");

  // Fungsi ketika tombol login ditekan
const handleLogin = async (e) => {
  e.preventDefault();

  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const data = await response.json();

// =====================================
// Jika login berhasil
// =====================================
if (data.success) {

    // ==========================
    // Simpan status login
    // ==========================
    localStorage.setItem("login", "admin");

    // Beri tahu Navbar bahwa status login berubah
    window.dispatchEvent(new Event("login"));

    alert("Login Berhasil");

    window.location.href = "/dashboard";

}

// =====================================
// Jika login gagal
// =====================================
else {

  alert(data.message);

}
};
  return (
    <section className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-slate-800">
          Login Admin
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Silakan login untuk masuk ke dashboard.
        </p>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >

          {/* Username */}
          <div>

            <label className="block mb-2 font-medium">
              Username
            </label>

            <input
              type="text"
              placeholder="Masukkan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

          </div>

          {/* Password */}
          <div>

            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

          </div>

          {/* Tombol Login */}
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