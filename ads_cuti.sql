-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 22, 2024 at 02:31 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ads_cuti`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cutis`
--

CREATE TABLE `cutis` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tgl_cuti` date NOT NULL,
  `lama_cuti` int(11) NOT NULL,
  `keterangan` varchar(255) NOT NULL,
  `id_karyawan` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cutis`
--

INSERT INTO `cutis` (`id`, `tgl_cuti`, `lama_cuti`, `keterangan`, `id_karyawan`, `created_at`, `updated_at`) VALUES
(1, '2024-08-21', 2, 'sakit', 10, '2024-08-21 02:24:29', '2024-08-21 02:24:29'),
(2, '2024-08-28', 10, 'sakit juga', 7, '2024-08-21 02:37:58', '2024-08-21 02:37:58'),
(4, '2024-08-29', 5, 'Nikah', 1, '2024-08-21 02:56:53', '2024-08-21 05:40:04'),
(5, '2024-08-22', 5, 'ngantuk', 15, '2024-08-21 07:14:27', '2024-08-21 07:14:41');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `no_induk` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `tgl_lahir` date NOT NULL,
  `tgl_bergabung` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `no_induk`, `nama`, `alamat`, `tgl_lahir`, `tgl_bergabung`, `created_at`, `updated_at`) VALUES
(1, 'IP06001', 'Agus', 'Jln Gaja Mungkur no 12, Surabaya', '1980-01-11', '2005-08-07', '2024-08-21 00:20:31', '2024-08-21 05:41:50'),
(2, 'IP06002', 'Amin', 'Jln Imam Bonjol no 11, Mojokerto', '1977-09-03', '2005-08-07', '2024-08-21 00:20:31', '2024-08-21 00:20:31'),
(3, 'IP06003', 'Yusuf', 'Jln A Yani Raya 15 No 14 Malang', '1973-08-09', '2006-08-06', '2024-08-21 00:20:31', '2024-08-21 00:20:31'),
(4, 'IP06004', 'Alyssa', 'Jln Bungur Sari V no 166, Bandung', '1983-03-18', '2006-09-06', '2024-08-21 00:20:31', '2024-08-21 00:20:31'),
(5, 'IP06005', 'Maulana', 'Jln Candi Agung, No 78 Gg 5, Jakarta', '1978-11-10', '2006-09-10', '2024-08-21 00:20:31', '2024-08-21 00:20:31'),
(6, 'IP06006', 'Agfika', 'Jln Nangka, Jakarta Timur', '1979-02-07', '2007-01-02', '2024-08-21 00:20:31', '2024-08-21 05:41:31'),
(7, 'IP06007', 'James', 'Jln Merpati, 8 Surabaya', '1989-05-18', '2007-04-07', '2024-08-21 00:20:31', '2024-08-21 00:20:31'),
(8, 'IP06008', 'Octavanus', 'Jln A Yani 17, B 08 Sidoarjo', '1985-04-14', '2007-05-19', '2024-08-21 00:20:31', '2024-08-21 00:20:31'),
(9, 'IP06009', 'Nugroho', 'Jln Duren tiga 167, Jakarta Selatan', '1984-01-01', '2008-01-16', '2024-08-21 00:20:31', '2024-08-21 00:20:31'),
(10, 'IP06010', 'Raisa', 'Jln Kelapa Sawit, Jakarta Selatan', '1990-12-17', '2008-08-16', '2024-08-21 00:20:31', '2024-08-21 00:20:31'),
(12, 'IP06012', 'Rizzaqy Nasghifar Ramadhan', 'Rumahnya sendiri', '2024-08-20', '2024-08-14', '2024-08-21 01:02:28', '2024-08-21 07:10:35'),
(15, 'IP06014', 'Abidzar Muhamad Alghifari', 'rumahnya sendiri', '2024-08-19', '2024-08-22', '2024-08-21 07:03:40', '2024-08-21 07:10:14');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_08_12_151603_create_personal_access_tokens_table', 1),
(5, '2024_08_12_154603_create_employees_table', 1),
(6, '2024_08_21_071656_create_cutis_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(2, 'App\\Models\\User', 1, 'Personal Access Token', 'c049a5af88288acc2f912abdd71a9ebef8a1e9b02ff112586cbe410edf986faf', '[\"*\"]', '2024-08-21 00:58:27', NULL, '2024-08-21 00:38:00', '2024-08-21 00:58:27'),
(3, 'App\\Models\\User', 1, 'Personal Access Token', 'ed230df420044ca109b946913285e0bee45b056e275c44e4056718a0f93611f2', '[\"*\"]', '2024-08-21 01:41:47', NULL, '2024-08-21 00:59:08', '2024-08-21 01:41:47'),
(4, 'App\\Models\\User', 1, 'Personal Access Token', '05118a915aab8752a95e38cfe09e71926e8a6f1a74aced6c4dc6b9c614bcef96', '[\"*\"]', '2024-08-21 01:02:23', NULL, '2024-08-21 01:01:30', '2024-08-21 01:02:23'),
(5, 'App\\Models\\User', 1, 'Personal Access Token', 'daa77bcf0460cb523cdc9cab661905a3add2f49a69e4d8ebdd62eef1f76d4dca', '[\"*\"]', '2024-08-21 01:45:51', NULL, '2024-08-21 01:43:11', '2024-08-21 01:45:51'),
(6, 'App\\Models\\User', 1, 'Personal Access Token', 'a768dee2c3115b42989967ecb4390a005759fa36385caa1eba10cdbb7ed6f48d', '[\"*\"]', '2024-08-21 06:26:39', NULL, '2024-08-21 01:48:19', '2024-08-21 06:26:39'),
(7, 'App\\Models\\User', 1, 'Personal Access Token', '0082dc69189eacf81f98baaf3e12a8172d87a7cc5c15f781098f8add6ed71034', '[\"*\"]', '2024-08-21 07:15:05', NULL, '2024-08-21 06:47:44', '2024-08-21 07:15:05'),
(8, 'App\\Models\\User', 1, 'Personal Access Token', '2b04f18471ec0b05af80366cb4f03d8b717ed6af307df7f02a7e1409a17e2af7', '[\"*\"]', '2024-08-21 07:20:32', NULL, '2024-08-21 07:15:24', '2024-08-21 07:20:32'),
(9, 'App\\Models\\User', 1, 'Personal Access Token', '6bfee8553577293b155b9d64f96e93b6df275b6eb203aff3a22590c3fedb9365', '[\"*\"]', '2024-08-21 07:33:30', NULL, '2024-08-21 07:33:29', '2024-08-21 07:33:30'),
(10, 'App\\Models\\User', 1, 'Personal Access Token', '63e114f6892ef1e7c134d661e6df303fc763f8085a473a909f74cf4afe5be2c9', '[\"*\"]', '2024-08-21 07:37:32', NULL, '2024-08-21 07:37:31', '2024-08-21 07:37:32'),
(11, 'App\\Models\\User', 1, 'Personal Access Token', 'b6f1ba24d6a490095f7c50c0a5ef6c40094cb46e189eeafd4bcc91b2dac0c174', '[\"*\"]', '2024-08-21 07:38:07', NULL, '2024-08-21 07:38:06', '2024-08-21 07:38:07'),
(12, 'App\\Models\\User', 1, 'Personal Access Token', '81573b872c99d89ee6f99e585dc4a3368eae143d84d1f13a64d292afcab4c021', '[\"*\"]', '2024-08-21 07:38:34', NULL, '2024-08-21 07:38:33', '2024-08-21 07:38:34'),
(13, 'App\\Models\\User', 1, 'Personal Access Token', '9f0eae9ae56f48b3646a7ffc67643541b7c5b0b734c00ed5e80e3044ff7f9c15', '[\"*\"]', '2024-08-21 17:42:29', NULL, '2024-08-21 07:39:41', '2024-08-21 17:42:29'),
(14, 'App\\Models\\User', 1, 'Personal Access Token', 'a77b115d05497544edf77509a4e966ae383d6994a85a2e3832a56ef7e82caa6c', '[\"*\"]', '2024-08-21 17:49:17', NULL, '2024-08-21 17:44:48', '2024-08-21 17:49:17'),
(15, 'App\\Models\\User', 1, 'Personal Access Token', '73a360066b38d20f04370daa8cea7e3af9038e0dee652c30aaef5058f7acbc76', '[\"*\"]', '2024-08-21 22:21:47', NULL, '2024-08-21 18:19:09', '2024-08-21 22:21:47'),
(16, 'App\\Models\\User', 1, 'Personal Access Token', 'fa9b1d027d7ae4b6ed726630222822c80eea8a0481357b1343e0759201ed09f1', '[\"*\"]', '2024-08-22 04:43:29', NULL, '2024-08-22 03:59:40', '2024-08-22 04:43:29'),
(17, 'App\\Models\\User', 1, 'Personal Access Token', '18ce732915671cb60015b2e1bcc18dceaaf4605919036aa5231aa7070dab2a0a', '[\"*\"]', '2024-08-22 05:21:15', NULL, '2024-08-22 05:21:13', '2024-08-22 05:21:15');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `phone`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin User', 'admin', '1234567890', 'admin@example.com', '2024-08-21 00:20:30', '$2y$12$FfmjjXjqIzAprpEDzcZ2O.nEUjNS9xOPkXdw8lj/kHTdp5BpOZf6S', 'zpABVhwnfA', '2024-08-21 00:20:31', '2024-08-21 00:20:31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cutis`
--
ALTER TABLE `cutis`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cutis`
--
ALTER TABLE `cutis`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
