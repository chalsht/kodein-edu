import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const [rows] = await db.execute(
      "SELECT * FROM admin WHERE username = ? AND password = ?",
      [username, password]
    );

    if (rows.length > 0) {
      return NextResponse.json({
        success: true,
        message: "Login berhasil",
      });
    }

    return NextResponse.json({
      success: false,
      message: "Username atau password salah",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan pada server",
      },
      { status: 500 }
    );
  }
}