// ==========================================
// API QUIZ USER
// ==========================================

import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {

  try {

    // ==========================================
    // Ambil id materi
    // ==========================================

    const { searchParams } = new URL(request.url);

    const materiId = searchParams.get("materi");

    const [rows] = await db.execute(

      "SELECT * FROM quiz WHERE materi_id=?",

      [materiId]

    );

    return NextResponse.json(rows);

  }

  catch(error){

    console.log(error);

    return NextResponse.json({

      success:false,
      message:"Server Error"

    });

  }

}