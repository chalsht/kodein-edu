"use client";

// ===========================================
// DASHBOARD ADMIN
// FILE : app/dashboard/page.js
// ===========================================

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function Dashboard(){

    // ===========================================
    // STATE
    // ===========================================

    const [jumlahProgram,setJumlahProgram]=useState(0);
    const [jumlahPesan,setJumlahPesan]=useState(0);
    const [jumlahPendaftar,setJumlahPendaftar]=useState(0);
    const [jumlahPeserta, setJumlahPeserta] = useState(0);
    const [jumlahMateri, setJumlahMateri] = useState(0);
    const [jumlahQuiz, setJumlahQuiz] = useState(0);
    const [jumlahSertifikat, setJumlahSertifikat] = useState(0);
    const router = useRouter();
   // ===========================================
// AMBIL DATA
// ===========================================

useEffect(() => {

    getProgram();
    getPesan();
    getPendaftar();
    getPeserta();
    getMateri();
    getQuiz();
    getSertifikat();

}, []);

    // ===========================================
    // HITUNG PROGRAM
    // ===========================================


    async function getProgram(){

        const res=await fetch("/api/program");

        const data=await res.json();

        setJumlahProgram(data.length);

    }

    // ===========================================
    // HITUNG PESAN
    // ===========================================

    async function getPesan(){

        const res=await fetch("/api/pesan");

        const data=await res.json();

        setJumlahPesan(data.length);

    }

    // ===========================================
// HITUNG PENDAFTAR
// ===========================================

async function getPendaftar(){

    const res = await fetch("/api/pendaftaran");

    const data = await res.json();

    setJumlahPendaftar(data.length);

}
// ===========================================
// HITUNG PESERTA
// ===========================================

async function getPeserta(){

    const res = await fetch("/api/users");

    const data = await res.json();

    setJumlahPeserta(data.length);

}

// ===========================================
// HITUNG MATERI
// ===========================================

async function getMateri(){

    const res = await fetch("/api/materi");

    const data = await res.json();

    setJumlahMateri(data.length);

}

// ===========================================
// HITUNG QUIZ
// ===========================================

async function getQuiz(){

    const res = await fetch("/api/quiz");

    const data = await res.json();

    setJumlahQuiz(data.length);

}

// ===========================================
// HITUNG SERTIFIKAT
// ===========================================

async function getSertifikat(){

    const res = await fetch("/api/sertifikat");

    const data = await res.json();

    setJumlahSertifikat(data.length);

}
// ===========================================
// LOGOUT
// ===========================================

function logout() {

    localStorage.removeItem("login");

    window.dispatchEvent(new Event("login"));

    router.push("/");

}
    return(

        <div>

            {/* ========================= */}
            {/* JUDUL */}
            {/* ========================= */}

            <h1 className="text-2xl md:text-4xl font-bold">
                Dashboard Admin

            </h1>
<div className="mt-2">
    <p className="text-gray-500">
    Selamat datang di Dashboard Kodein Edu Center.
</p>
</div>

            {/* ========================= */}
            {/* CARD */}
            {/* ========================= */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">

                {/* Program */}

                <div className="bg-white rounded-xl shadow-lg p-8">

                    <h2 className="text-xl text-gray-500">

                        Total Program

                    </h2>

                    <p className="text-4xl md:text-5xl font-bold text-orange-500 mt-4">

                        {jumlahProgram}

                    </p>

                </div>

                {/* Pesan */}

                <div className="bg-white rounded-xl shadow-lg p-8">

                    <h2 className="text-xl text-gray-500">

                        Pesan Masuk

                    </h2>

                    <p className="text-4xl md:text-5xl font-bold text-blue-500 mt-4">

                        {jumlahPesan}

                    </p>

                </div>
{/* Total Pendaftar */}

<div className="bg-white rounded-xl shadow-lg p-8">

    <h2 className="text-xl text-gray-500">

        Total Pendaftar

    </h2>

    <p className="text-4xl md:text-5xl font-bold text-green-500 mt-4">

        {jumlahPendaftar}

    </p>

</div>
{/* Total Peserta */}

<div className="bg-white rounded-xl shadow-lg p-8">

    <h2 className="text-xl text-gray-500">

        Total Peserta

    </h2>

    <p className="text-4xl md:text-5xl font-bold text-purple-500 mt-4">

        {jumlahPeserta}

    </p>

</div>

{/* Total Materi */}

<div className="bg-white rounded-xl shadow-lg p-8">

    <h2 className="text-xl text-gray-500">

        Total Materi

    </h2>

    <p className="text-4xl md:text-5xl font-bold text-cyan-500 mt-4">

        {jumlahMateri}

    </p>

</div>

{/* Total Quiz */}

<div className="bg-white rounded-xl shadow-lg p-8">

    <h2 className="text-xl text-gray-500">

        Total Quiz

    </h2>

    <p className="text-4xl md:text-5xl font-bold text-pink-500 mt-4">

        {jumlahQuiz}

    </p>

</div>

{/* Total Sertifikat */}

<div className="bg-white rounded-xl shadow-lg p-8">

    <h2 className="text-xl text-gray-500">

        Total Sertifikat

    </h2>

    <p className="text-4xl md:text-5xl font-bold text-emerald-500 mt-4">

        {jumlahSertifikat}

    </p>

</div>

            </div>

        </div>

    );

}