import db from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

export default async function DetailProgram({ params }) {
  const { id } = await params;

  const [rows] = await db.execute(
    "SELECT * FROM program WHERE id = ?",
    [id]
  );

  if (rows.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Program tidak ditemukan
        </h1>
      </div>
    );
  }

  const program = rows[0];

  return (
    <main className="min-h-screen bg-slate-100">

     {/* Hero */}
<section className="bg-slate-900 py-24 text-center">

  <h1 className="text-5xl font-bold text-white">
    Detail Program
  </h1>

  <p className="mt-4 text-xl text-gray-300">
    Informasi lengkap mengenai program yang kamu pilih.
  </p>

</section>
      {/* Card */}
     <div className="max-w-6xl mx-auto -mt-12 px-6 relative z-10">

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          <div className="grid lg:grid-cols-2 items-center">

            {/* Gambar */}
            <div className="relative h-[420px]">

              <Image
                src={`/images/${program.gambar}`}
                alt={program.nama_program}
                fill
                className="object-cover"
              />

            </div>

            {/* Informasi */}
            <div className="p-10">

              <h2 className="text-4xl font-extrabold text-slate-800">
                {program.nama_program}
              </h2>

              <p className="mt-6 text-gray-600 leading-8">
                {program.deskripsi}
              </p>

              {/* Tombol */}
              <div className="mt-10">

              <Link
                href="/#program"
                className="inline-block px-8 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white transition duration-300"
                > Kembali
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}