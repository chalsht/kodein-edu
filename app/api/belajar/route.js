// ==========================================
// API DASHBOARD USER
// ==========================================

import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {

    // ==========================================
    // Ambil email dari URL
    // ==========================================

    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({
        success: false,
        message: "Email tidak ditemukan",
        user: null,
        materi: [],
      });
    }

    // ==========================================
    // Cari user
    // ==========================================

    const [user] = await db.execute(
      `
      SELECT *
      FROM users
      WHERE email = ?
      LIMIT 1
      `,
      [email]
    );

    if (user.length === 0) {
      return NextResponse.json({
        success: false,
        message: "User tidak ditemukan",
        user: null,
        materi: [],
      });
    }

    // ==========================================
    // Ambil materi sesuai program user
    // ==========================================

    const [materi] = await db.execute(
      `
      SELECT *
      FROM materi
      WHERE TRIM(program) = TRIM(?)
      OR kategori = 'Bimbel Akademik'
      ORDER BY id DESC
      `,
      [user[0].program]
    );

    // ==========================================
    // HASIL
    // ==========================================

    return NextResponse.json({
      success: true,

      user: user[0],

      materi: materi,
    });

  } catch (error) {

    console.error("API BELAJAR ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
        user: null,
        materi: [],
      },
      {
        status: 500,
      }
    );
  }
}