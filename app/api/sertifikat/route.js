// ==========================================
// API SERTIFIKAT
// ==========================================

import db from "@/lib/db";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// ==========================================
// GET
// ==========================================

export async function GET() {
  try {
    const [rows] = await db.execute(`
      SELECT
        sertifikat.id,
        users.nama,
        users.email,
        users.program,
        sertifikat.nomor_sertifikat,
        sertifikat.tanggal,
        sertifikat.status,
        sertifikat.file_sertifikat
      FROM sertifikat
      JOIN users
        ON sertifikat.user_id = users.id
      ORDER BY sertifikat.id DESC
    `);

    return NextResponse.json(rows);

  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Server Error",
    });
  }
}

// ==========================================
// POST - UPLOAD SERTIFIKAT
// ==========================================

export async function POST(request) {
  try {
    const formData = await request.formData();

    const email = formData.get("email");
    const file = formData.get("file");

    if (!email || !file) {
      return NextResponse.json({
        success: false,
        message: "Email dan file wajib diisi",
      });
    }

    // ==========================================
    // CEK USER
    // ==========================================

    const [user] = await db.execute(
      "SELECT * FROM users WHERE email=?",
      [email]
    );

    if (user.length === 0) {
      return NextResponse.json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    // ==========================================
    // CEK FILE
    // ==========================================

    const allowedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({
        success: false,
        message: "File harus PDF, PNG, atau JPG",
      });
    }

    // ==========================================
    // FOLDER SERTIFIKAT
    // ==========================================

    const folder = path.join(
      process.cwd(),
      "public",
      "sertifikat"
    );

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, {
        recursive: true,
      });
    }

    // ==========================================
    // NAMA FILE
    // ==========================================

    const extension =
      file.name.split(".").pop();

    const nomor =
      "KDEC-" + Date.now();

    const namaFile =
      `${nomor}-${user[0].id}.${extension}`;

    const filePath =
      path.join(folder, namaFile);

    // ==========================================
    // SIMPAN FILE
    // ==========================================

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    fs.writeFileSync(filePath, buffer);

    // ==========================================
    // PATH FILE
    // ==========================================

    const fileUrl =
      `/sertifikat/${namaFile}`;

    // ==========================================
    // SIMPAN DATABASE
    // ==========================================

    await db.execute(
      `INSERT INTO sertifikat
      (
        user_id,
        nomor_sertifikat,
        tanggal,
        status,
        file_sertifikat
      )
      VALUES (?, ?, CURDATE(), ?, ?)`,
      [
        user[0].id,
        nomor,
        "Terbit",
        fileUrl,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Sertifikat berhasil diupload",
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Server Error",
    });
  }
}