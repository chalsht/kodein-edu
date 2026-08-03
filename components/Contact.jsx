"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Contact() {

  const [nama,setNama]=useState("");
  const [email,setEmail]=useState("");
  const [subjek,setSubjek]=useState("");
  const [pesan,setPesan]=useState("");

async function kirimPesan(e){

  e.preventDefault();

  console.log("Klik Kirim");

  const res = await fetch("/api/pesan",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      nama,
      email,
      subjek,
      pesan
    })
  });

  console.log("Status :",res.status);

  const data = await res.json();

  console.log("Response :",data);

  alert(data.message);

  if(data.success){

    setNama("");
    setEmail("");
    setSubjek("");
    setPesan("");

  }

}

  return(

<section
id="kontak"
className="py-28 bg-white"
>

<div className="max-w-7xl mx-auto px-8">

<div className="text-center mb-20">

<span className="bg-red-100 text-red-500 px-4 py-2 rounded-full font-semibold">

Hubungi Kami

</span>

<h2 className="text-5xl font-black text-slate-800 mt-6">

Kami Siap

<span className="text-orange-500">

{" "}Membantu Anda

</span>

</h2>

</div>

<div className="grid lg:grid-cols-2 gap-16">

<motion.div
initial={{opacity:0,x:-50}}
whileInView={{opacity:1,x:0}}
viewport={{once:true}}
>

<div className="space-y-10">

<div className="flex gap-5">

<div className="w-14 h-14 rounded-full bg-sky-100 flex items-center justify-center">

<FaMapMarkerAlt className="text-sky-500 text-2xl"/>

</div>

<div>

<h3 className="font-bold text-xl">

Alamat

</h3>

<p className="text-gray-600">

Harvest City, Jl. Orchid Raya A, Ragemanunggal, Setu, Kabupaten Bekasi.

</p>

</div>

</div>

<div className="flex gap-5">

<div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center">

<FaPhoneAlt className="text-orange-500 text-2xl"/>

</div>

<div>

<h3 className="font-bold text-xl">

Telepon

</h3>

<p className="text-gray-600">

0812-3456-7890

</p>

</div>

</div>

<div className="flex gap-5">

<div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">

<FaEnvelope className="text-red-500 text-2xl"/>

</div>

<div>

<h3 className="font-bold text-xl">

Email

</h3>

<p className="text-gray-600">

info@kodeinedu.com

</p>

</div>

</div>

</div>

</motion.div>

<motion.form

onSubmit={kirimPesan}

initial={{opacity:0,x:50}}

whileInView={{opacity:1,x:0}}

viewport={{once:true}}

className="bg-slate-50 rounded-3xl shadow-xl p-10"

>

<input

type="text"

placeholder="Nama Lengkap"

value={nama}

onChange={(e)=>setNama(e.target.value)}

className="w-full border rounded-xl p-4 mb-5 outline-none focus:border-orange-500"

required

/>

<input

type="email"

placeholder="Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

className="w-full border rounded-xl p-4 mb-5 outline-none focus:border-orange-500"

required

/>

<input

type="text"

placeholder="Subjek"

value={subjek}

onChange={(e)=>setSubjek(e.target.value)}

className="w-full border rounded-xl p-4 mb-5 outline-none focus:border-orange-500"

required

/>

<textarea

rows="6"

placeholder="Pesan"

value={pesan}

onChange={(e)=>setPesan(e.target.value)}

className="w-full border rounded-xl p-4 mb-5 outline-none focus:border-orange-500"

required

/>

<button

type="submit"

className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold"

>

Kirim Pesan

</button>

</motion.form>

</div>

</div>

</section>

  );

}