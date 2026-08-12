import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {

  try {

    const { searchParams } = new URL(request.url);

    const email = searchParams.get("email");
    const materi_id = searchParams.get("materi");

    const [user] = await db.execute(
      "SELECT id FROM users WHERE email=?",
      [email]
    );

    if (!user.length)
      return NextResponse.json({
        success: false,
        message: "User tidak ditemukan"
      });

    const [hasil] = await db.execute(
      `SELECT nilai, jawaban
       FROM hasil_quiz
       WHERE user_id=? AND materi_id=?
       LIMIT 1`,
      [user[0].id, materi_id]
    );

    if (!hasil.length)
      return NextResponse.json({
        success: true,
        sudahMengerjakan: false
      });

    return NextResponse.json({
      success: true,
      sudahMengerjakan: true,
      nilai: hasil[0].nilai,
      jawaban: hasil[0].jawaban
        ? JSON.parse(hasil[0].jawaban)
        : {}
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Server Error"
    });

  }

}


export async function POST(request) {

  try {

    const {
      email,
      materi_id,
      nilai,
      jawaban
    } = await request.json();

    const [user] = await db.execute(
      "SELECT id FROM users WHERE email=?",
      [email]
    );

    if (!user.length)
      return NextResponse.json({
        success: false,
        message: "User tidak ditemukan"
      });

    const [cek] = await db.execute(
      `SELECT id
       FROM hasil_quiz
       WHERE user_id=? AND materi_id=?`,
      [user[0].id, materi_id]
    );

    if (cek.length)
      return NextResponse.json({
        success: false,
        message: "Quiz ini sudah pernah dikerjakan."
      });

    await db.execute(
      `INSERT INTO hasil_quiz
       (user_id, materi_id, nilai, jawaban)
       VALUES (?, ?, ?, ?)`,
      [
        user[0].id,
        materi_id,
        nilai,
        JSON.stringify(jawaban)
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Quiz berhasil disimpan."
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Server Error"
    });

  }

}