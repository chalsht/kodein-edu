// ==========================================
// API USERS
// FILE : app/api/users/route.js
// ==========================================

import db from "@/lib/db";
import { NextResponse } from "next/server";

// ==========================================
// GET : Ambil semua data user
// ==========================================

export async function GET() {

  try {

    const [rows] = await db.execute(

      `SELECT
      id,
      nama,
      email,
      program,
      status
      FROM users
      ORDER BY id DESC`

    );

    return NextResponse.json(rows);

  }

  catch (error) {

    console.log(error);

    return NextResponse.json(

      {
        success: false,
        message: "Gagal mengambil data user",
      },

      {
        status: 500,
      }

    );

  }

}