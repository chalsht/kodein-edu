-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 03, 2026 at 01:04 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kodein_edu`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1, 'admin', 'admin123');

-- --------------------------------------------------------

--
-- Table structure for table `kontak`
--

CREATE TABLE `kontak` (
  `id` int NOT NULL,
  `nama` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `pesan` text COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kontak`
--

INSERT INTO `kontak` (`id`, `nama`, `email`, `pesan`, `created_at`) VALUES
(1, 'tes', 'tes123@gmail.com', 'tesss', '2026-07-28 09:15:53');

-- --------------------------------------------------------

--
-- Table structure for table `pendaftaran`
--

CREATE TABLE `pendaftaran` (
  `id` int NOT NULL,
  `nama` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `no_hp` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `program` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pendaftaran`
--

INSERT INTO `pendaftaran` (`id`, `nama`, `email`, `no_hp`, `program`, `created_at`) VALUES
(3, 'Aisyah Inara', 'ayud1a1824@gmail.com', '0977090', 'Robotik', '2026-07-30 06:08:40'),
(4, 'Aisyah Inara', 'ayud1a1824@gmail.com', '00087', 'Robotik', '2026-07-30 06:43:25'),
(5, 'chaca', 'chaca9266@gmail.com', '098990890', 'Web Development', '2026-07-30 12:01:44'),
(6, 'chaca', 'chaca9266@gmail.com', '09988', 'Robotik', '2026-07-31 01:27:06'),
(7, 'inara', 'inara15@gmail.com', '099876564', 'Web Development', '2026-07-31 01:38:38'),
(8, 'ayudia', 'ayud1a1824@gmail.com', '0987767', 'Web Development', '2026-07-31 01:54:04');

-- --------------------------------------------------------

--
-- Table structure for table `pesan`
--

CREATE TABLE `pesan` (
  `id` int NOT NULL,
  `nama` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `subjek` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `pesan` text COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pesan`
--

INSERT INTO `pesan` (`id`, `nama`, `email`, `subjek`, `pesan`, `created_at`) VALUES
(1, 'inara', 'chaca9266@gmail.com', 'programming', 'kapan aja ada nya\n', '2026-07-31 03:20:25');

-- --------------------------------------------------------

--
-- Table structure for table `program`
--

CREATE TABLE `program` (
  `id` int NOT NULL,
  `nama_program` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `deskripsi` text COLLATE utf8mb4_general_ci NOT NULL,
  `gambar` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `kategori` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `program`
--

INSERT INTO `program` (`id`, `nama_program`, `deskripsi`, `gambar`, `created_at`, `kategori`) VALUES
(4, 'IOT & ROBOTIK', 'Membuat robot dan perangkat pintar berbasis IoT dan sensor\r\n-> Robot Building\r\n-> IoT & Smart Device\r\n->AI & Smart Automation', '1785398265388_robotik.png', '2026-07-30 07:24:33', 'Program Unggulan'),
(5, 'PROGRAMMING', 'Belajar coding dari dasar hingga mahir membuat aplikasi dan game.\r\n -> Web Development \r\n-> Game Development \r\n-> Mobile App Development \r\n-> Algorithm & Problem Solving', '1785468760896_coding.jpeg', '2026-07-30 07:26:54', 'Program Unggulan'),
(6, 'MULTIMEDIA', 'Mengasah kreativitas di dunia digital seperti video, animasi, dan desain\r\n-> Desain Grafis\r\n-> Video Editing\r\n-> Animasi 2D/3D\r\n-> Digital Content Creator', '1785398212563_edit.jpeg', '2026-07-30 07:30:59', 'Program Unggulan'),
(7, 'MATEMATIKA', 'Bimbingan belajar matematika untuk siswa SD, SMP, dan SMA, membantu memahami konsep secara mendalam, meningkatkan nilai sekolah, dan mempersiapkan ujian (UTS, UAS, ujian sekolah, hingga UTBK). Materi mencakup aljabar, geometri, trigonometri, statistika, dan kalkulus dasar, diajarkan oleh pengajar berpengalaman dengan pendekatan yang interaktif dan mudah dipahami.', '1785400643490_download (9).jpg', '2026-07-30 08:37:23', 'Bimbel Akademik'),
(8, 'IPA', 'Bimbingan belajar IPA untuk siswa SD dan SMP, membantu memahami konsep sains secara mudah dan aplikatif, mulai dari biologi, fisika dasar, hingga kimia dasar. Cocok untuk memperkuat pemahaman materi sekolah, persiapan ulangan, dan menumbuhkan rasa ingin tahu terhadap sains.', '1785400745325_CHEMICAL-018.jpg', '2026-07-30 08:39:05', 'Bimbel Akademik'),
(9, 'FISIKA', 'Bimbingan belajar fisika untuk siswa SMP dan SMA, fokus pada pemahaman konsep dasar hingga penerapan rumus dalam soal-soal HOTS. Membantu siswa menghadapi ulangan, ujian sekolah, hingga persiapan UTBK/SBMPTN. Materi mencakup mekanika, listrik-magnet, gelombang, termodinamika, dan fisika modern, diajarkan dengan metode yang sistematis dan mudah dipahami.', '1785400780070_Dynamic Atom Molecule Science Symbol vector icon _ Minimalist science symbol, Atom symbol design, Science icons.jpg', '2026-07-30 08:39:40', 'Bimbel Akademik'),
(10, 'BAHASA INDONESIA', 'Bimbingan belajar Bahasa Indonesia untuk siswa SD, SMP, dan SMA, mencakup tata bahasa, membaca pemahaman, menulis, hingga sastra. Membantu meningkatkan kemampuan berbahasa yang baik dan benar, mempersiapkan ujian sekolah, serta menumbuhkan minat membaca dan menulis siswa.', '1785400838787_download (10).jpg', '2026-07-30 08:40:38', 'Bimbel Akademik'),
(11, 'BAHASA INGGRIS', 'Bimbingan belajar Bahasa Inggris untuk semua jenjang, mencakup grammar, vocabulary, reading, writing, listening, dan speaking. Membantu siswa meningkatkan kepercayaan diri berbahasa Inggris, mempersiapkan ujian sekolah, TOEFL/IELTS dasar, hingga kebutuhan komunikasi sehari-hari. Tersedia kelas privat, kelompok kecil, maupun online.', '1785400864462_idioma inglés línea icono vector ilustración.jpg', '2026-07-30 08:41:04', 'Bimbel Akademik');

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `kontak`
--
ALTER TABLE `kontak`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pendaftaran`
--
ALTER TABLE `pendaftaran`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `pesan`
--
ALTER TABLE `pesan`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `program`
--
ALTER TABLE `program`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
