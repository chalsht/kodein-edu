import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const {
      materi_id,
      pertanyaan,
      opsi_a,
      opsi_b,
      opsi_c,
      opsi_d,
      jawaban_benar,
    } = body;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID quiz tidak ditemukan",
        },
        { status: 400 }
      );
    }

    const [result] = await db.execute(
      `UPDATE quiz
       SET materi_id = ?,
           pertanyaan = ?,
           opsi_a = ?,
           opsi_b = ?,
           opsi_c = ?,
           opsi_d = ?,
           jawaban_benar = ?
       WHERE id = ?`,
      [
        materi_id,
        pertanyaan,
        opsi_a,
        opsi_b,
        opsi_c,
        opsi_d,
        jawaban_benar,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Quiz tidak ditemukan",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Quiz berhasil diubah",
    });
  } catch (error) {
    console.error("UPDATE QUIZ ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Server Error",
      },
      { status: 500 }
    );
  }
}