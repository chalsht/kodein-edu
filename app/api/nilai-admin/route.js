import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows] = await db.execute(`
      SELECT
        users.id,
        users.nama,
        users.email,
        COUNT(hasil_quiz.id) AS jumlah_quiz_dikerjakan,
        ROUND(AVG(hasil_quiz.nilai), 0) AS rata_rata
      FROM users
      LEFT JOIN hasil_quiz
        ON hasil_quiz.user_id = users.id
      GROUP BY users.id, users.nama, users.email
      ORDER BY users.nama ASC
    `);

    // jumlah seluruh quiz yang tersedia
    const [quizRows] = await db.execute(`
      SELECT COUNT(*) AS total_quiz
      FROM quiz
    `);

    const totalQuiz = quizRows[0]?.total_quiz || 0;

    const data = rows.map((user) => ({
      ...user,
      jumlah_quiz_dikerjakan: Number(user.jumlah_quiz_dikerjakan),
      rata_rata: user.rata_rata !== null ? Number(user.rata_rata) : 0,
      total_quiz: totalQuiz,
      status:
        totalQuiz > 0 &&
        Number(user.jumlah_quiz_dikerjakan) >= totalQuiz
          ? "Tuntas"
          : "Belum Tuntas",
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error nilai-admin:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}