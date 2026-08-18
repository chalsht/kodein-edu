import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    const [rows] = await db.execute(
      `SELECT
        sertifikat.id,
        sertifikat.nomor_sertifikat,
        sertifikat.tanggal,
        sertifikat.status,
        sertifikat.file_sertifikat,
        users.nama,
        users.email,
        users.program
      FROM sertifikat
      JOIN users
        ON sertifikat.user_id = users.id
      WHERE users.email = ?
      ORDER BY sertifikat.id DESC`,
      [email]
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