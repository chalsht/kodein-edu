import { NextResponse } from "next/server";
import db from "@/lib/db";

// ==========================
// Ambil semua pesan
// ==========================
export async function GET() {

  try {

    const [rows] = await db.execute(
      "SELECT * FROM pesan ORDER BY id DESC"
    );

    return NextResponse.json(rows);

  } catch (error) {

    return NextResponse.json({
      success: false,
      message: error.message
    });

  }

}

// ==========================
// Simpan pesan
// ==========================
export async function POST(req) {

  try {

    const {
      nama,
      email,
      subjek,
      pesan
    } = await req.json();

    await db.execute(
      `INSERT INTO pesan
      (nama,email,subjek,pesan)
      VALUES (?,?,?,?)`,
      [
        nama,
        email,
        subjek,
        pesan
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Pesan berhasil dikirim."
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      message: error.message
    });

  }

}

// ==========================
// Hapus pesan
// ==========================
export async function DELETE(req) {

  try {

    const { id } = await req.json();

    await db.execute(
      "DELETE FROM pesan WHERE id=?",
      [id]
    );

    return NextResponse.json({
      success: true,
      message: "Pesan berhasil dihapus."
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      message: error.message
    });

  }

}