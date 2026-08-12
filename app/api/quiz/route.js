// ==========================================
// API QUIZ
// ==========================================

import db from "@/lib/db";
import { NextResponse } from "next/server";

// ==========================================
// GET
// ==========================================

export async function GET() {

  try {

    const [rows] = await db.execute(

      `SELECT
      quiz.*,
      materi.judul
      FROM quiz
      JOIN materi
      ON quiz.materi_id = materi.id
      ORDER BY quiz.id DESC`

    );

    return NextResponse.json(rows);

  }

  catch (error) {

    console.log(error);

    return NextResponse.json({

      success:false,
      message:"Server Error",

    });

  }

}

// ==========================================
// POST
// ==========================================

export async function POST(request){

  try{

    const body=await request.json();

    const{

      materi_id,
      pertanyaan,
      opsi_a,
      opsi_b,
      opsi_c,
      opsi_d,
      jawaban_benar

    }=body;

    await db.execute(

      `INSERT INTO quiz
      (
      materi_id,
      pertanyaan,
      opsi_a,
      opsi_b,
      opsi_c,
      opsi_d,
      jawaban_benar
      )
      VALUES(?,?,?,?,?,?,?)`,

      [

        materi_id,
        pertanyaan,
        opsi_a,
        opsi_b,
        opsi_c,
        opsi_d,
        jawaban_benar

      ]

    );

    return NextResponse.json({

      success:true,
      message:"Quiz berhasil ditambahkan"

    });

  }

  catch(error){

    console.log(error);

    return NextResponse.json({

      success:false,
      message:"Server Error"

    });

  }

}