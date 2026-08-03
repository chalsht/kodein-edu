import db from "@/lib/db";
import { NextResponse } from "next/server";

// =====================================
// GET : Ambil semua data pendaftar
// =====================================
export async function GET() {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM pendaftaran ORDER BY created_at DESC"
    );

    return NextResponse.json(rows);

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data"
      },
      { status: 500 }
    );

  }
}

// =====================================
// POST : Simpan data pendaftaran
// =====================================
export async function POST(request) {

  try {

    const body = await request.json();

    const { nama, email, no_hp, program } = body;

    await db.execute(
      `INSERT INTO pendaftaran
      (nama, email, no_hp, program)
      VALUES (?, ?, ?, ?)`,
      [nama, email, no_hp, program]
    );

    return NextResponse.json({
      success: true,
      message: "Pendaftaran berhasil"
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan"
      },
      { status: 500 }
    );

  }
}