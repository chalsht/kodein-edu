import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {

  const [rows] = await db.execute(

`SELECT

users.nama,

users.email,

ROUND(AVG(hasil_quiz.nilai),0) AS rata_rata

FROM hasil_quiz

JOIN users

ON hasil_quiz.user_id = users.id

GROUP BY users.id`

);

  return NextResponse.json(rows);

}