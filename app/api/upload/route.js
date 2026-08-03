// ==============================================
// FILE : app/api/upload/route.js
// Upload gambar ke public/uploads
// ==============================================

import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(request) {

  try {

    // Mengambil file dari form
    const data = await request.formData();

    const file = data.get("file");

    if (!file) {

      return NextResponse.json({

        success: false,

        message: "File tidak ditemukan."

      });

    }

    // Mengubah file menjadi buffer
    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    // Nama file baru
    const fileName = Date.now() + "-" + file.name;

    // Lokasi penyimpanan
    const uploadPath = path.join(

      process.cwd(),

      "public",

      "uploads",

      fileName

    );

    // Menyimpan file
    await writeFile(uploadPath, buffer);

    // Mengirim nama file ke frontend
    return NextResponse.json({

      success: true,

      filename: fileName

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({

      success: false,

      message: "Upload gagal."

    });

  }

}