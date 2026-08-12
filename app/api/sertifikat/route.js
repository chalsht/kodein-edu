// ==========================================
// API SERTIFIKAT
// ==========================================

import db from "@/lib/db";
import { NextResponse } from "next/server";

// ==========================================
// GET
// ==========================================

export async function GET() {

  try {

    const [rows] = await db.execute(

      `SELECT
      sertifikat.id,
      users.nama,
      users.email,
      users.program,
      sertifikat.nomor_sertifikat,
      sertifikat.tanggal,
      sertifikat.status
      FROM sertifikat
      JOIN users
      ON sertifikat.user_id = users.id
      ORDER BY sertifikat.id DESC`

    );

    return NextResponse.json(rows);

  } catch (error) {

    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Server Error",
    });

  }

}

// ==========================================
// POST
// ==========================================

export async function POST(request) {

  try {

    const { email } = await request.json();

    const [user] = await db.execute(

      "SELECT * FROM users WHERE email=?",

      [email]

    );

    if (user.length === 0) {

      return NextResponse.json({

        success: false,
        message: "User tidak ditemukan"

      });

    }

    const nomor = "KDEC-" + Date.now();

    await db.execute(

      `INSERT INTO sertifikat
      (user_id,nomor_sertifikat,tanggal,status)
      VALUES(?,?,CURDATE(),'Terbit')`,

      [

        user[0].id,
        nomor

      ]

    );

    return NextResponse.json({

      success: true,
      message: "Sertifikat berhasil diterbitkan"

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({

      success: false,
      message: "Server Error"

    });

  }

}