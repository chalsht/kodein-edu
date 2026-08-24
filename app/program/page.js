import db from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

export default async function Program() {
  const [program] = await db.execute(
    "SELECT * FROM program ORDER BY id DESC"
  );

  return (
    <main className="min-h-screen bg-slate-100 pt-28 pb-16 px-5">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-800">
            Program KODEIN
          </h1>

          <p className="text-gray-500 mt-3">
            Pilih program belajar yang sesuai dengan minatmu.
          </p>
        </div>

        {program.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {program.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:-translate-y-1 hover:shadow-xl transition"
              >
                <div className="relative h-52">
                  <Image
                    src={`/images/${item.gambar}`}
                    alt={item.nama_program}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  <h2 className="text-2xl font-bold text-slate-800">
                    {item.nama_program}
                  </h2>

                  <p className="text-gray-500 mt-3 line-clamp-3">
                    {item.deskripsi}
                  </p>

                  <Link
                    href={`/pendaftaran?program=${encodeURIComponent(
                      item.nama_program
                    )}`}
                    className="inline-block mt-5 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold transition"
                  >
                    Daftar Sekarang
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-10 text-center shadow">
            <p className="text-gray-500">
              Belum ada program tersedia.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}