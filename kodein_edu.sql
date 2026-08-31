-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 31, 2026 at 11:27 PM
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
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1, 'admin', 'admin123');

-- --------------------------------------------------------

--
-- Table structure for table `hasil_quiz`
--

CREATE TABLE `hasil_quiz` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `materi_id` int DEFAULT NULL,
  `quiz_id` int DEFAULT NULL,
  `nilai` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `jawaban` text COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hasil_quiz`
--

INSERT INTO `hasil_quiz` (`id`, `user_id`, `materi_id`, `quiz_id`, `nilai`, `created_at`, `jawaban`) VALUES
(2, 2, NULL, NULL, NULL, '2026-08-12 01:13:26', NULL),
(3, 2, 1, NULL, 100, '2026-08-12 01:31:47', NULL),
(4, 2, 1, NULL, 50, '2026-08-12 01:32:06', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `kontak`
--

CREATE TABLE `kontak` (
  `id` int NOT NULL,
  `nama` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `pesan` text COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kontak`
--

INSERT INTO `kontak` (`id`, `nama`, `email`, `pesan`, `created_at`) VALUES
(1, 'tes', 'tes123@gmail.com', 'tesss', '2026-07-28 09:15:53');

-- --------------------------------------------------------

--
-- Table structure for table `materi`
--

CREATE TABLE `materi` (
  `id` int NOT NULL,
  `program` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `kategori` enum('Bimbel Akademik','Program Unggulan') COLLATE utf8mb4_general_ci NOT NULL,
  `judul` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `deskripsi` text COLLATE utf8mb4_general_ci,
  `file_materi` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `materi`
--

INSERT INTO `materi` (`id`, `program`, `kategori`, `judul`, `deskripsi`, `file_materi`, `created_at`) VALUES
(1, 'Programmer', 'Program Unggulan', 'html', 'html dasar', 'https://youtu.be/hMDJyb7VkYw?si=Wrfu5V35KANvmG-D', '2026-08-06 06:46:46');

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
  `status` enum('Menunggu','Aktif') COLLATE utf8mb4_general_ci DEFAULT 'Menunggu'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pendaftaran`
--

INSERT INTO `pendaftaran` (`id`, `nama`, `email`, `no_hp`, `program`, `created_at`, `status`) VALUES
(9, 'chaca', 'chaca9266@gmail.com', '999999999986666', 'Programmer', '2026-08-10 03:42:05', 'Aktif');

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
  `kategori` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL
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

-- --------------------------------------------------------

--
-- Table structure for table `quiz`
--

CREATE TABLE `quiz` (
  `id` int NOT NULL,
  `materi_id` int NOT NULL,
  `pertanyaan` text COLLATE utf8mb4_general_ci NOT NULL,
  `opsi_a` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `opsi_b` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `opsi_c` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `opsi_d` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `jawaban_benar` char(1) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sertifikat`
--

CREATE TABLE `sertifikat` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `nomor_sertifikat` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tanggal` date DEFAULT NULL,
  `status` enum('Belum','Terbit') COLLATE utf8mb4_general_ci DEFAULT 'Belum',
  `file_sertifikat` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sertifikat`
--

INSERT INTO `sertifikat` (`id`, `user_id`, `nomor_sertifikat`, `tanggal`, `status`, `file_sertifikat`) VALUES
(1, 2, 'KDEC-1786673746888', '2026-08-14', 'Terbit', NULL),
(2, 2, 'KDEC-1786673759394', '2026-08-14', 'Terbit', NULL),
(3, 2, 'KDEC-1786674609752', '2026-08-14', 'Terbit', '/sertifikat/KDEC-1786674609752-2.jpg'),
(4, 2, 'KDEC-1787023470716', '2026-08-18', 'Terbit', '/sertifikat/KDEC-1787023470716-2.png');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `nama` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `program` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `status` enum('Menunggu Pembayaran','Aktif') COLLATE utf8mb4_general_ci DEFAULT 'Menunggu Pembayaran',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nama`, `email`, `password`, `program`, `status`, `created_at`) VALUES
(1, 'ayudia', 'ayud1a1824@gmail.com', 'ayudia18', 'Web Development', 'Aktif', '2026-08-06 06:47:57'),
(2, 'chaca', 'chaca9266@gmail.com', 'chaca15', 'Programmer', 'Aktif', '2026-08-10 03:43:04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hasil_quiz`
--
ALTER TABLE `hasil_quiz`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `quiz_id` (`quiz_id`),
  ADD KEY `fk_hasil_materi` (`materi_id`);

--
-- Indexes for table `kontak`
--
ALTER TABLE `kontak`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `materi`
--
ALTER TABLE `materi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pendaftaran`
--
ALTER TABLE `pendaftaran`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `program`
--
ALTER TABLE `program`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quiz`
--
ALTER TABLE `quiz`
  ADD PRIMARY KEY (`id`),
  ADD KEY `materi_id` (`materi_id`);

--
-- Indexes for table `sertifikat`
--
ALTER TABLE `sertifikat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `hasil_quiz`
--
ALTER TABLE `hasil_quiz`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `kontak`
--
ALTER TABLE `kontak`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `materi`
--
ALTER TABLE `materi`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pendaftaran`
--
ALTER TABLE `pendaftaran`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `program`
--
ALTER TABLE `program`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `quiz`
--
ALTER TABLE `quiz`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sertifikat`
--
ALTER TABLE `sertifikat`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `hasil_quiz`
--
ALTER TABLE `hasil_quiz`
  ADD CONSTRAINT `fk_hasil_materi` FOREIGN KEY (`materi_id`) REFERENCES `materi` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `hasil_quiz_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `hasil_quiz_ibfk_2` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `quiz`
--
ALTER TABLE `quiz`
  ADD CONSTRAINT `quiz_ibfk_1` FOREIGN KEY (`materi_id`) REFERENCES `materi` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `sertifikat`
--
ALTER TABLE `sertifikat`
  ADD CONSTRAINT `sertifikat_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
