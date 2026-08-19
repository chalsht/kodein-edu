import { NextResponse } from "next/server";
import db from "@/lib/db";
import fs from "fs";
import path from "path";

// ==============================================
// GET
// ==============================================
export async function GET() {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM program ORDER BY id DESC"
    );

    return NextResponse.json(rows);

  } catch (error) {

    console.error("GET PROGRAM ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}


// ==============================================
// POST
// ==============================================
export async function POST(req) {
  try {

    const formData = await req.formData();

    const nama_program = formData.get("nama_program");
    const kategori = formData.get("kategori");
    const deskripsi = formData.get("deskripsi");
    const file = formData.get("gambar");

    let namaFile = "";

    // ==========================================
    // UPLOAD GAMBAR
    // ==========================================
    if (file && file.name) {

      namaFile = Date.now() + "_" + file.name;

      const bytes = await file.arrayBuffer();

      const buffer = Buffer.from(bytes);

      const uploadPath = path.join(
        process.cwd(),
        "public",
        "images",
        namaFile
      );

      fs.writeFileSync(uploadPath, buffer);
    }

    // ==========================================
    // INSERT DATABASE
    // ==========================================
    await db.execute(
      `INSERT INTO program
      (
        nama_program,
        kategori,
        deskripsi,
        gambar
      )
      VALUES (?, ?, ?, ?)`,
      [
        nama_program,
        kategori,
        deskripsi,
        namaFile,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Program berhasil ditambahkan.",
    });

  } catch (error) {

    console.error("POST PROGRAM ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}


// ==============================================
// PUT
// ==============================================
export async function PUT(req) {
  try {

    const formData = await req.formData();

    const id = formData.get("id");
    const nama_program = formData.get("nama_program");
    const kategori = formData.get("kategori");
    const deskripsi = formData.get("deskripsi");
    const file = formData.get("gambar");

    // ==========================================
    // JIKA UPLOAD GAMBAR BARU
    // ==========================================
    if (file && file.name) {

      const namaFile = Date.now() + "_" + file.name;

      const bytes = await file.arrayBuffer();

      const buffer = Buffer.from(bytes);

      const uploadPath = path.join(
        process.cwd(),
        "public",
        "images",
        namaFile
      );

      fs.writeFileSync(uploadPath, buffer);

      await db.execute(
        `UPDATE program
         SET nama_program=?,
             kategori=?,
             deskripsi=?,
             gambar=?
         WHERE id=?`,
        [
          nama_program,
          kategori,
          deskripsi,
          namaFile,
          id,
        ]
      );

    } else {

      // ==========================================
      // JIKA TIDAK GANTI GAMBAR
      // ==========================================
      await db.execute(
        `UPDATE program
         SET nama_program=?,
             kategori=?,
             deskripsi=?
         WHERE id=?`,
        [
          nama_program,
          kategori,
          deskripsi,
          id,
        ]
      );
    }

    return NextResponse.json({
      success: true,
      message: "Program berhasil diperbarui.",
    });

  } catch (error) {

    console.error("PUT PROGRAM ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}


// ==============================================
// DELETE
// ==============================================
export async function DELETE(req) {
  try {

    const { id } = await req.json();

    await db.execute(
      "DELETE FROM program WHERE id=?",
      [id]
    );

    return NextResponse.json({
      success: true,
      message: "Program berhasil dihapus.",
    });

  } catch (error) {

    console.error("DELETE PROGRAM ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}