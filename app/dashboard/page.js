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
    const router = useRouter();
    // ===========================================
    // AMBIL DATA
    // ===========================================

    useEffect(()=>{

        getProgram();
        getPesan();
        getPendaftar();


    },[]);

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

            </div>

        </div>

    );

}