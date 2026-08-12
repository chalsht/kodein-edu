// ==========================================
// API EDIT & HAPUS MATERI
// ==========================================

import db from "@/lib/db";
import { NextResponse } from "next/server";

import fs from "fs/promises";
import path from "path";

// ==========================================
// UPDATE MATERI
// ==========================================

export async function PUT(request, { params }) {

  try {

    const { id } = await params;

    const formData = await request.formData();

    const program = formData.get("program");
    const kategori = formData.get("kategori");
    const judul = formData.get("judul");
    const deskripsi = formData.get("deskripsi");

    const file = formData.get("file_materi");

    // ======================================
    // AMBIL DATA FILE LAMA
    // ======================================

    const [rows] = await db.execute(

      "SELECT file_materi FROM materi WHERE id=?",

      [id]

    );

    if (rows.length === 0) {

      return NextResponse.json(
        {
          success: false,
          message: "Materi tidak ditemukan.",
        },
        {
          status: 404,
        }
      );

    }

    let fileMateri = rows[0].file_materi;

    // ======================================
    // KALAU ADA FILE BARU
    // ======================================

    if (file && typeof file !== "string") {

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
            message: "Format file tidak didukung.",
          },
          {
            status: 400,
          }
        );

      }

      // ====================================
      // FOLDER
      // ====================================

      const folderPath = path.join(
        process.cwd(),
        "public",
        "materi"
      );

      await fs.mkdir(folderPath, {
        recursive: true,
      });

      // ====================================
      // NAMA FILE BARU
      // ====================================

      const namaAman =
        `${Date.now()}-${namaFile}`
          .replace(/[^a-zA-Z0-9._-]/g, "-");

      const filePath = path.join(
        folderPath,
        namaAman
      );

      // ====================================
      // SIMPAN FILE BARU
      // ====================================

      const buffer = Buffer.from(
        await file.arrayBuffer()
      );

      await fs.writeFile(
        filePath,
        buffer
      );

      const fileBaru =
        `/materi/${namaAman}`;

      // ====================================
      // HAPUS FILE LAMA
      // ====================================

      if (fileMateri) {

        const fileLamaPath = path.join(
          process.cwd(),
          "public",
          fileMateri.replace(/^\/+/, "")
        );

        try {

          await fs.unlink(fileLamaPath);

        } catch {

          console.log(
            "File lama tidak ditemukan."
          );

        }

      }

      fileMateri = fileBaru;

    }

    // ======================================
    // UPDATE DATABASE
    // ======================================

    await db.execute(

      `
      UPDATE materi
      SET
        program=?,
        kategori=?,
        judul=?,
        deskripsi=?,
        file_materi=?
      WHERE id=?
      `,

      [
        program,
        kategori,
        judul,
        deskripsi,
        fileMateri,
        id,
      ]

    );

    return NextResponse.json({

      success: true,

      message: "Materi berhasil diubah.",

    });

  } catch (error) {

    console.error(
      "PUT MATERI ERROR:",
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

// ==========================================
// HAPUS MATERI
// ==========================================

export async function DELETE(request, { params }) {

  try {

    const { id } = await params;

    // ======================================
    // AMBIL FILE
    // ======================================

    const [rows] = await db.execute(

      "SELECT file_materi FROM materi WHERE id=?",

      [id]

    );

    if (rows.length === 0) {

      return NextResponse.json(
        {
          success: false,
          message: "Materi tidak ditemukan.",
        },
        {
          status: 404,
        }
      );

    }

    const fileMateri =
      rows[0].file_materi;

    // ======================================
    // HAPUS FILE DARI FOLDER
    // ======================================

    if (fileMateri) {

      const filePath = path.join(
        process.cwd(),
        "public",
        fileMateri.replace(/^\/+/, "")
      );

      try {

        await fs.unlink(filePath);

      } catch {

        console.log(
          "File materi tidak ditemukan."
        );

      }

    }

    // ======================================
    // HAPUS DATABASE
    // ======================================

    await db.execute(

      "DELETE FROM materi WHERE id=?",

      [id]

    );

    return NextResponse.json({

      success: true,

      message: "Materi berhasil dihapus.",

    });

  } catch (error) {

    console.error(
      "DELETE MATERI ERROR:",
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