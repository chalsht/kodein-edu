import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request){

  const {searchParams}=new URL(request.url);

  const email=searchParams.get("email");

  const [rows]=await db.execute(

`SELECT
hasil_quiz.id,
hasil_quiz.nilai,
materi.judul
FROM hasil_quiz
JOIN users
ON hasil_quiz.user_id=users.id
JOIN materi
ON hasil_quiz.materi_id=materi.id
WHERE users.email=?`,

[email]

);

return NextResponse.json(rows);

}