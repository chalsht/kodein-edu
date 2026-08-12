// ==========================================
// API AKTIVASI PESERTA
// ==========================================

import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request) {

  try {

    // ==========================================
    // Ambil data dari form
    // ==========================================

    const {

      nama,
      email,
      password,
      program

    } = await request.json();

    // ==========================================
    // Cek apakah email sudah ada
    // ==========================================

    const [cek] = await db.execute(

      "SELECT * FROM users WHERE email=?",

      [email]

    );

    if (cek.length > 0) {

      return NextResponse.json({

        success: false,
        message: "Email sudah digunakan"

      });

    }

    // ==========================================
// CEK STATUS PENDAFTAR
// ==========================================

const [pendaftar] = await db.execute(

  "SELECT status FROM pendaftaran WHERE email=?",

  [email]

);

if (pendaftar.length > 0 && pendaftar[0].status === "Aktif") {
// ==========================================
// AKUN BERHASIL DIBUAT
// STATUS PENDAFTAR DIUBAH MENJADI AKTIF
// ==========================================
  return NextResponse.json({

    success: false,
    message: "Peserta sudah aktif"

  });

}
    // ==========================================
    // Simpan akun user
    // ==========================================

    await db.execute(

      `INSERT INTO users
      (nama,email,password,program,status)
      VALUES (?,?,?,?,?)`,

      [

        nama,
        email,
        password,
        program,
        "Aktif"

      ]

    );
// ==========================================
// UBAH STATUS PENDAFTAR
// ==========================================

await db.execute(

  "UPDATE pendaftaran SET status='Aktif' WHERE email=?",

  [email]

);
    return NextResponse.json({

      success: true,
      message: "Peserta berhasil diaktifkan"

    });

  }

  catch (error) {

    console.log(error);

    return NextResponse.json({

      success: false,
      message: "Server Error"

    });

  }

}