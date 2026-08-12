// ==========================================
// API MATERI
// ==========================================

import db from "@/lib/db";
import { NextResponse } from "next/server";

import fs from "fs/promises";
import path from "path";

// ==========================================
// GET
// ==========================================

export async function GET() {

  try {

    const [rows] = await db.execute(
      `
      SELECT *
      FROM materi
      ORDER BY id DESC
      `
    );

    return NextResponse.json(rows);

  } catch (error) {

    console.error("GET MATERI ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );

  }

}

// ==========================================
// POST
// TAMBAH MATERI
// ==========================================

export async function POST(request) {

  try {

    // ======================================
    // AMBIL FORM DATA
    // ======================================

    const formData = await request.formData();

    const program = formData.get("program");
    const kategori = formData.get("kategori");
    const judul = formData.get("judul");
    const deskripsi = formData.get("deskripsi");

    const file = formData.get("file_materi");

    // ======================================
    // CEK FILE
    // ======================================

    if (!file || typeof file === "string") {

      return NextResponse.json(
        {
          success: false,
          message: "File materi wajib dipilih.",
        },
        {
          status: 400,
        }
      );

    }

    // ======================================
    // CEK FORMAT
    // ======================================

    const namaFile = file.name;

    const extension = path
      .extname(namaFile)
      .toLowerCase();

    const allowedExtensions = [
      ".pdf",
      ".mp4",
      ".webm",
    ];

    if (!allowedExtensions.includes(extension)) {

      return NextResponse.json(
        {
          success: false,
          message: "Format file tidak didukung. Gunakan PDF, MP4, atau WEBM.",
        },
        {
          status: 400,
        }
      );

    }

    // ======================================
    // BUAT FOLDER
    // public/materi
    // ======================================

    const folderPath = path.join(
      process.cwd(),
      "public",
      "materi"
    );

    await fs.mkdir(folderPath, {
      recursive: true,
    });

    // ======================================
    // BUAT NAMA FILE AMAN
    // ======================================

    const namaAman =
      `${Date.now()}-${namaFile}`
        .replace(/[^a-zA-Z0-9._-]/g, "-");

    const filePath = path.join(
      folderPath,
      namaAman
    );

    // ======================================
    // SIMPAN FILE
    // ======================================

    const buffer = Buffer.from(
      await file.arrayBuffer()
    );

    await fs.writeFile(
      filePath,
      buffer
    );

    // ======================================
    // PATH YANG DISIMPAN DATABASE
    // ======================================

    const fileMateri =
      `/materi/${namaAman}`;

    // ======================================
    // SIMPAN DATABASE
    // ======================================

    await db.execute(

      `
      INSERT INTO materi
      (
        program,
        kategori,
        judul,
        deskripsi,
        file_materi
      )
      VALUES (?, ?, ?, ?, ?)
      `,

      [
        program,
        kategori,
        judul,
        deskripsi,
        fileMateri,
      ]

    );

    return NextResponse.json({

      success: true,

      message: "Materi berhasil ditambahkan.",

    });

  } catch (error) {

    console.error(
      "POST MATERI ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );

  }

}