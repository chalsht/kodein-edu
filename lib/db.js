// =============================================
// FILE : lib/db.js
// Fungsi : Menghubungkan Next.js dengan
// Database MySQL yang ada di Laragon
// =============================================

// Mengimpor library mysql2
import mysql from "mysql2/promise";

// Membuat koneksi ke database
const db = mysql.createPool({

  // Host database
  host: "localhost",

  // Username bawaan Laragon
  user: "root",

  // Password Laragon
  // Kosongkan jika tidak memakai password
  password: "",

  // Nama database yang sudah dibuat di phpMyAdmin
  database: "kodein_edu",

  // Jumlah koneksi maksimal
  waitForConnections: true,

  connectionLimit: 10,

  queueLimit: 0

});

// Mengekspor koneksi agar bisa dipakai
// di file route.js
export default db;