import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM pendaftaran ORDER BY created_at DESC"
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { nama, email, no_hp, program } = await request.json();

    const [cek] = await db.execute(
      `SELECT id FROM pendaftaran
       WHERE nama = ? AND email = ? AND no_hp = ? AND program = ?`,
      [nama, email, no_hp, program]
    );

    if (cek.length > 0) {
      return NextResponse.json({
        success: false,
        message: "Kamu sudah terdaftar pada program ini.",
      });
    }

    await db.execute(
      `INSERT INTO pendaftaran (nama, email, no_hp, program)
       VALUES (?, ?, ?, ?)`,
      [nama, email, no_hp, program]
    );

    return NextResponse.json({
      success: true,
      message: "Pendaftaran berhasil",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan" },
      { status: 500 }
    );
  }
}