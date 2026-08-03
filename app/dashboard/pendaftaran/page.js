import db from "@/lib/db";

export default async function DataPendaftar() {

  const [rows] = await db.execute(
    "SELECT * FROM pendaftaran ORDER BY created_at DESC"
  );

  return (
    <div className="ml-72 p-10">
      <h1 className="text-4xl font-bold mb-8">
        Data Pendaftar
      </h1>

      <table className="w-full bg-white shadow rounded-xl">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="p-3">No</th>
            <th>Nama</th>
            <th>Email</th>
            <th>No HP</th>
            <th>Program</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((item, index) => (
            <tr key={item.id} className="border-b">
              <td className="p-3">{index + 1}</td>
              <td>{item.nama}</td>
              <td>{item.email}</td>
              <td>{item.no_hp}</td>
              <td>{item.program}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}