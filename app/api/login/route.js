import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request) {

  try {

    // =====================================
    // AMBIL DATA LOGIN
    // =====================================

    const { account, password } = await request.json();

    // =====================================
    // LOGIN ADMIN
    // =====================================

    const [admin] = await db.execute(

      "SELECT * FROM admin WHERE username = ? AND password = ?",

      [account, password]

    );

    if (admin.length > 0) {

      return NextResponse.json({

        success: true,
        role: "admin",
        message: "Login Admin Berhasil",

      });

    }

    // =====================================
    // LOGIN USER
    // =====================================

    const [user] = await db.execute(

      "SELECT * FROM users WHERE email = ? AND password = ? AND status='Aktif'",

      [account, password]

    );

    if (user.length > 0) {

      return NextResponse.json({

  success: true,
  role: "user",
  message: "Login User Berhasil",
  email: user[0].email

});

    }

    // =====================================
    // LOGIN GAGAL
    // =====================================

    return NextResponse.json({

      success: false,
      message: "Email / Username atau Password salah",

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(

      {

        success: false,
        message: "Server Error",

      },

      {

        status: 500,

      }

    );

  }

}