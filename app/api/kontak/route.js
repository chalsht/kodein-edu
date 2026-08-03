// ===============================================
// FILE : app/api/kontak/route.js
// Fungsi : API untuk halaman kontak
// POST   -> Menyimpan pesan
// GET    -> Menampilkan semua pesan
// DELETE -> Menghapus pesan
// ===============================================

import { NextResponse } from "next/server";
import db from "@/lib/db";

// ===============================================
// Mengambil semua pesan
// ===============================================
export async function GET() {

  const [rows] = await db.execute(

    "SELECT * FROM kontak ORDER BY id DESC"

  );

  return NextResponse.json(rows);

}

// ===============================================
// Menyimpan pesan dari pengunjung
// ===============================================
export async function POST(req) {

  const {

    nama,

    email,

    pesan

  } = await req.json();

  await db.execute(

    `INSERT INTO kontak
    (nama,email,pesan)
    VALUES (?,?,?)`,

    [

      nama,

      email,

      pesan

    ]

  );

  return NextResponse.json({

    success: true,

    message: "Pesan berhasil dikirim."

  });

}

// ===============================================
// Menghapus pesan
// ===============================================
export async function DELETE(req) {

  const {

    id

  } = await req.json();

  await db.execute(

    "DELETE FROM kontak WHERE id=?",

    [

      id

    ]

  );

  return NextResponse.json({

    success: true,

    message: "Pesan berhasil dihapus."

  });

}