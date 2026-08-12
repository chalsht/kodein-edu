// ==========================================
// API EDIT & HAPUS QUIZ
// ==========================================

import db from "@/lib/db";
import { NextResponse } from "next/server";

// ==========================================
// UPDATE QUIZ
// ==========================================

export async function PUT(request, { params }) {

  try {

    const { id } = params;

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

    await db.execute(

      `UPDATE quiz
      SET
      materi_id=?,
      pertanyaan=?,
      opsi_a=?,
      opsi_b=?,
      opsi_c=?,
      opsi_d=?,
      jawaban_benar=?
      WHERE id=?`,

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

    return NextResponse.json({

      success: true,
      message: "Quiz berhasil diubah",

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({

      success: false,
      message: "Server Error",

    });

  }

}

// ==========================================
// HAPUS QUIZ
// ==========================================

export async function DELETE(request, { params }) {

  try {

    const { id } = params;

    await db.execute(

      "DELETE FROM quiz WHERE id=?",

      [id]

    );

    return NextResponse.json({

      success: true,
      message: "Quiz berhasil dihapus",

    });

  }

  catch (error) {

    console.log(error);

    return NextResponse.json({

      success: false,
      message: "Server Error",

    });

  }

}