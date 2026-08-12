// ==========================================
// API HAPUS PESERTA
// ==========================================

import db from "@/lib/db";
import { NextResponse } from "next/server";

// ==========================================
// DELETE
// ==========================================

export async function DELETE(request, { params }) {

  try {

    const { id } = params;

    // ==========================================
    // Hapus data user
    // ==========================================

    await db.execute(

      "DELETE FROM users WHERE id=?",

      [id]

    );

    return NextResponse.json({

      success: true,
      message: "Peserta berhasil dihapus"

    });

  }

  catch (error) {

    console.log(error);

    return NextResponse.json({

      success: false,
      message: "Server Error"

    });

  }

}
