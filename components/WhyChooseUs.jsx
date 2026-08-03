"use client";

import {
  FaChalkboardTeacher,
  FaBullseye,
  FaBriefcase,
  FaAward,
  FaClock,
} from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const features = [
  {
    icon: <FaChalkboardTeacher />,
    title: "Pengajar Profesional",
    desc: "Berpengalaman di bidangnya",
  },
  {
    icon: <FaBullseye />,
    title: "Kurikulum Komprehensif",
    desc: "Materi up-to-date dan terstruktur",
  },
  {
    icon: <FaBriefcase />,
    title: "Project Nyata",
    desc: "Belajar langsung membuat karya dan solusi nyata",
  },
  {
    icon: <FaAward />,
    title: "Sertifikat Kompetensi",
    desc: "Menambah nilai untuk pendidikan dan karier",
  },
  {
    icon: <FaClock />,
    title: "Fleksibel",
    desc: "Pilih kelas dan jadwal yang fleksibel",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        {/* Judul */}
        <div className="mb-12">
          <div className="flex-1 h-[2px] bg-gray-200"></div>

          <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
  KENAPA MEMILIH
  <br className="md:hidden" />
  <span className="text-orange-500">
    {" "}KODEIN EDU CENTER?
  </span>
</h2>

          <div className="flex-1 h-[2px] bg-gray-200"></div>
        </div>

        {/* Slider */}
        <Swiper
          className="px-2 md:px-0"
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          spaceBetween={30}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
        >
          {features.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white border border-gray-200 rounded-3xl p-8 min-h-[300px] flex flex-col items-center justify-center text-center shadow-lg hover:shadow-2xl hover:-translate-y-2 duration-300">

                <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-4xl mb-6">
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-7">
                  {item.desc}
                </p>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}