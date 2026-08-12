// ==========================================
// API DASHBOARD ADMIN
// ==========================================

import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {

  try {

    // ==========================================
    // Hitung jumlah data
    // ==========================================

    const [[program]] = await db.execute(
      "SELECT COUNT(*) AS total FROM program"
    );

    const [[pendaftar]] = await db.execute(
      "SELECT COUNT(*) AS total FROM pendaftaran"
    );

    const [[peserta]] = await db.execute(
      "SELECT COUNT(*) AS total FROM users"
    );

    const [[materi]] = await db.execute(
      "SELECT COUNT(*) AS total FROM materi"
    );

    const [[quiz]] = await db.execute(
      "SELECT COUNT(*) AS total FROM quiz"
    );

    const [[sertifikat]] = await db.execute(
      "SELECT COUNT(*) AS total FROM sertifikat"
    );

    return NextResponse.json({

      program: program.total,
      pendaftar: pendaftar.total,
      peserta: peserta.total,
      materi: materi.total,
      quiz: quiz.total,
      sertifikat: sertifikat.total,

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );

  }

}