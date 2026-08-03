import { NextResponse } from "next/server";
import db from "@/lib/db";
import fs from "fs";
import path from "path";

// ==============================================
// GET
// ==============================================
export async function GET() {
  const [rows] = await db.execute(
    "SELECT * FROM program ORDER BY id DESC"
  );

  return NextResponse.json(rows);
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
    namaFile
  ]
);

    return NextResponse.json({
      success: true,
      message: "Program berhasil ditambahkan."
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message
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
    id
  ]
);
    } else {

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
    id
  ]
);

    }

    return NextResponse.json({
      success: true,
      message: "Program berhasil diperbarui."
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message
      },
      { status: 500 }
    );

  }
}

// ==============================================
// DELETE
// ==============================================
export async function DELETE(req) {

  const { id } = await req.json();

  await db.execute(
    "DELETE FROM program WHERE id=?",
    [id]
  );

  return NextResponse.json({
    success: true,
    message: "Program berhasil dihapus."
  });

}