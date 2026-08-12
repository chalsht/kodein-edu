// ==========================================
// AKTIVASI PESERTA
// ==========================================

import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {

  try {

    const { id } = await request.json();

    // Ambil data pendaftar
    const [rows] = await db.execute(
      "SELECT * FROM pendaftaran WHERE id=?",
      [id]
    );

    if (rows.length === 0) {

      return NextResponse.json({
        success: false,
        message: "Data tidak ditemukan"
      });

    }

    const peserta = rows[0];

    // Password awal
    const password = "123456";

    // Simpan ke tabel users
    await db.execute(

      `INSERT INTO users
      (nama,email,password,program,status)
      VALUES(?,?,?,?,?)`,

      [
        peserta.nama,
        peserta.email,
        password,
        peserta.program,
        "Aktif"
      ]

    );

    // Update status pendaftaran
    await db.execute(

      "UPDATE pendaftaran SET status='Aktif' WHERE id=?",

      [id]

    );

    return NextResponse.json({

      success: true,
      message: "Peserta berhasil diaktifkan"

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({

      success: false,
      message: "Server Error"

    });

  }

}