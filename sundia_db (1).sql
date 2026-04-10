-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 28, 2026 at 04:16 AM
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
-- Database: `sundia_db`
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

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('sundia-cache-quitoleschristian22@gmail.com|127.0.0.1', 'i:1;', 1773981797),
('sundia-cache-quitoleschristian22@gmail.com|127.0.0.1:timer', 'i:1773981797;', 1773981797);

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
-- Table structure for table `career_culture_cards`
--

CREATE TABLE `career_culture_cards` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `display_order` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `career_culture_cards`
--

INSERT INTO `career_culture_cards` (`id`, `title`, `body`, `image_path`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Empowering Excellence', 'We invest in training, mentorship, and tools so every teammate can grow skills, share ideas, and deliver their best work.', '/coordination.jpg', 0, 1, '2026-03-27 18:50:30', '2026-03-27 18:50:30'),
(2, 'Elevate Your Work Experience', 'Modern facilities, clear processes, and supportive leadership help you focus on meaningful work in a professional environment.', '/2026 Sundia lobby.png', 1, 1, '2026-03-27 18:50:30', '2026-03-27 18:50:30'),
(3, 'Cultivating Unity and Respect', 'Team outings, celebrations, and open communication reinforce trust, inclusion, and pride in what we build together.', '/lineup.jpg', 2, 1, '2026-03-27 18:50:30', '2026-03-27 18:50:30');

-- --------------------------------------------------------

--
-- Table structure for table `career_jobs`
--

CREATE TABLE `career_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `employment_type` varchar(255) NOT NULL DEFAULT 'Full-time',
  `location` varchar(255) NOT NULL,
  `summary` text NOT NULL,
  `responsibilities` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`responsibilities`)),
  `icon_variant` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `display_order` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `career_jobs`
--

INSERT INTO `career_jobs` (`id`, `title`, `employment_type`, `location`, `summary`, `responsibilities`, `icon_variant`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Production Operator', 'Full-time', 'Santa Rosa, Laguna', 'Support daily production operations to ensure quality, safety, and on-time delivery.', '[\"Follow SOP and safety procedures\",\"Perform basic machine operation\",\"Maintain clean and organized work areas\"]', 1, 0, 1, '2026-03-27 18:50:30', '2026-03-27 18:50:30'),
(2, 'Quality Assurance Officer', 'Full-time', 'Santa Rosa, Laguna', 'Monitor product quality and compliance through inspections, documentation, and continuous improvement.', '[\"Conduct incoming and in-process checks\",\"Support corrective and preventive actions\",\"Maintain quality records\"]', 2, 1, 1, '2026-03-27 18:50:30', '2026-03-27 18:50:30'),
(3, 'Sales Representative', 'Full-time', 'Metro Manila', 'Build customer relationships, promote Sundia products, and help achieve sales targets.', '[\"Identify customer needs and opportunities\",\"Prepare proposals and quotations\",\"Coordinate with operations for fulfillment\"]', 3, 2, 1, '2026-03-27 18:50:30', '2026-03-27 18:50:30'),
(4, 'Maintenance Technician', 'Full-time', 'Santa Rosa, Laguna', 'Ensure equipment readiness through preventive maintenance, troubleshooting, and timely repairs.', '[\"Perform preventive maintenance schedules\",\"Troubleshoot equipment and utilities\",\"Coordinate repairs to minimize downtime\"]', 4, 3, 1, '2026-03-27 18:50:30', '2026-03-27 18:50:30');

-- --------------------------------------------------------

--
-- Table structure for table `contact_infos`
--

CREATE TABLE `contact_infos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(32) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `value` text DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `display_order` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contact_infos`
--

INSERT INTO `contact_infos` (`id`, `type`, `title`, `value`, `icon`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Address', 'ADDRESS', '123 Business District, Metro\\nManila, Philippines', 'address', 0, 1, '2026-03-18 20:27:56', '2026-03-23 19:07:59'),
(2, 'Phone', 'PHONE', '+63 900 000 0000', 'phone', 1, 1, '2026-03-18 20:27:56', '2026-03-18 20:27:56'),
(3, 'Email', 'EMAIL', 'info@sundia.com', 'email', 2, 1, '2026-03-18 20:27:56', '2026-03-18 20:27:56'),
(4, 'Hours', 'HOURS', 'Mon - Fri\\n8:00 AM - 5:00 PM', 'hours', 3, 1, '2026-03-18 20:27:56', '2026-03-18 20:27:56');

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
-- Table structure for table `homepage_videos`
--

CREATE TABLE `homepage_videos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `video_path` varchar(255) DEFAULT NULL,
  `thumbnail_path` varchar(255) DEFAULT NULL,
  `overlay_enabled` tinyint(1) NOT NULL DEFAULT 1,
  `overlay_image_path` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
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
(4, '2026_03_06_000003_add_is_admin_to_users_table', 2),
(5, '2026_03_16_000000_create_sundias_table', 2),
(6, '2026_03_16_000100_add_content_to_sundias_table', 2),
(7, '2026_03_17_000000_create_homepage_videos_table', 3),
(8, '2026_03_17_000100_create_mission_vision_table', 4),
(9, '2026_03_17_010000_create_subsidiaries_table', 5),
(10, '2026_03_17_020000_create_team_members_table', 6),
(11, '2026_03_17_030000_create_trusted_companies_table', 7),
(12, '2026_03_19_000000_create_contact_infos_table', 8),
(13, '2026_03_19_010000_create_siams_table', 9),
(14, '2026_03_20_000000_create_siampage_videos_table', 10),
(16, '2026_03_20_020000_create_tpsmis_table', 12),
(17, '2026_03_20_020100_create_tpsmipage_videos_table', 12),
(18, '2026_03_20_030000_create_tpsmi_products_table', 13),
(19, '2026_03_23_000000_create_topoffroads_table', 14),
(20, '2026_03_23_000100_create_topoffroadpage_videos_table', 14),
(21, '2026_03_23_000200_create_topoffroad_products_table', 15),
(22, '2026_03_24_000000_add_category_to_topoffroad_products_table', 16),
(23, '2026_03_25_100000_restructure_siam_and_topoffroad_categories', 17),
(24, '2026_03_20_010000_create_siam_products_table', 18),
(25, '2026_03_26_000000_create_popup_siam_products_table', 19),
(26, '2026_03_28_100000_restructure_siam_categories_and_products', 20),
(27, '2026_03_28_120000_align_siam_product_categories_columns', 21),
(28, '2026_03_28_200000_create_upcoming_events_table', 22),
(29, '2026_03_28_210000_create_career_culture_cards_table', 23),
(30, '2026_03_28_210100_create_career_jobs_table', 23);

-- --------------------------------------------------------

--
-- Table structure for table `mission_vision`
--

CREATE TABLE `mission_vision` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `mission_text` longtext DEFAULT NULL,
  `vision_text` longtext DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `mission_vision`
--

INSERT INTO `mission_vision` (`id`, `mission_text`, `vision_text`, `created_at`, `updated_at`) VALUES
(1, 'Commits to provide solutions to every clients\' need through continual improvement in every aspect of its business, efficient approach to Research and Development, and maximize use of its network while continuously expanding and building bridges among and beyond the industries it caters.', 'To be chosen as one of the premiere partners by our clients in each of the subsidiaries products and services for every major industry played upon.', '2026-03-16 19:16:23', '2026-03-16 19:20:38');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `password_reset_tokens`
--

INSERT INTO `password_reset_tokens` (`email`, `token`, `created_at`) VALUES
('quitoleschristian37@gmail.com', '$2y$12$udET/Bc3zarIeEe8xjZAZOYDjyiiPRoYDdCX0YLomX9i2M2L43HpO', '2026-03-19 19:25:53');

-- --------------------------------------------------------

--
-- Table structure for table `popup_siam_products`
--

CREATE TABLE `popup_siam_products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `short_description` text DEFAULT NULL,
  `display_order` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `popup_siam_products`
--

INSERT INTO `popup_siam_products` (`id`, `title`, `description`, `image_path`, `category`, `short_description`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'AHAHHAHHAHA', 'AHAHHAHHA', '/storage/popup-siam-products/Bm2eJf65UdJbidHlF9rPDX8CDmbla9WSXSEPFJhb.png', 'HAHHAHHAHHA', 'AHHAHHAHHA', 0, 1, '2026-03-25 23:07:04', '2026-03-25 23:07:04');

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

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('EYQuupj9JuG3svAukNkgwyzJsLvtcx4iV2L8oZO9', 2, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiVTZyYzM5MExjaDJqSEhYR0VBYzlQalM0OEs5b2pkZkRxbGI2MnlzSCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9jYXJlZXJzIjtzOjU6InJvdXRlIjtzOjc6ImNhcmVlcnMiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjM6InVybCI7YTowOnt9czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6Mjt9', 1774667550),
('kPMPG42KvLy7PurhonJtb0gkZzflry1WXhMfii4X', 2, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoicXZrR0FRdWFZZ1A2STBhc3U3em9YSVVicW5aRmxNcVkzUGY0aHRweSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9jYXJlZXJzIjtzOjU6InJvdXRlIjtzOjc6ImNhcmVlcnMiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToyO30=', 1774663904);

-- --------------------------------------------------------

--
-- Table structure for table `siampage_videos`
--

CREATE TABLE `siampage_videos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `video_path` varchar(255) DEFAULT NULL,
  `thumbnail_path` varchar(255) DEFAULT NULL,
  `overlay_enabled` tinyint(1) NOT NULL DEFAULT 1,
  `overlay_image_path` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `siams`
--

CREATE TABLE `siams` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `logo_path` varchar(255) DEFAULT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`content`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `siams`
--

INSERT INTO `siams` (`id`, `logo_path`, `content`, `created_at`, `updated_at`) VALUES
(1, NULL, '{\"stats_title_line1\":\"WHAT\",\"stats_title_line2\":\"WE\",\"stats_title_line3\":\"DO?\",\"stats_items\":[{\"value\":\"25+\",\"label\":\"Years Experience\"},{\"value\":\"5\",\"label\":\"Affiliated Companies\"},{\"value\":\"500+\",\"label\":\"Team Members\"},{\"value\":\"1000+\",\"label\":\"Projects Completed\"}]}', '2026-03-19 19:31:21', '2026-03-19 19:33:30');

-- --------------------------------------------------------

--
-- Table structure for table `siam_category_products`
--

CREATE TABLE `siam_category_products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `siam_product_category_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT 0,
  `display_order` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `siam_category_products`
--

INSERT INTO `siam_category_products` (`id`, `siam_product_category_id`, `title`, `description`, `image_path`, `is_featured`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(8, 1, 'TRY', 'HAHHAHHAHHAHHAH', '/storage/siam-category-products/JZLDEy6iOGCIsJPmILpWBXX4FAs8KB7lHsVTQe3b.png', 0, 0, 1, '2026-03-27 16:43:58', '2026-03-27 16:43:58'),
(9, 1, 'TRY', 'HAHHAHHAHHAHHAH', '/storage/siam-category-products/e6tHZ4FLLQvKKL5VjBscTn2IHj2l9eZZtwXieh7i.png', 0, 1, 1, '2026-03-27 16:47:55', '2026-03-27 16:47:55'),
(10, 1, 'TRY', 'HAHHAHHAHHAHHAH', '/storage/siam-category-products/ZeZTG2ucj4BfmoBQJ3XpQz7NMNrMEu243BFY8U65.png', 0, 2, 1, '2026-03-27 16:48:12', '2026-03-27 16:48:12'),
(11, 2, 'TRY', 'HAHHAHHAHHAHHAH', '/storage/siam-category-products/RdTqUoOBAnnzyvQwTX5KRjTjDlju0ALzIBr2FWlL.png', 0, 0, 1, '2026-03-27 16:53:55', '2026-03-27 16:53:55');

-- --------------------------------------------------------

--
-- Table structure for table `siam_product_categories`
--

CREATE TABLE `siam_product_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) NOT NULL,
  `display_order` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `card_description` text DEFAULT NULL,
  `card_image_path` varchar(255) DEFAULT NULL,
  `modal_short_description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `siam_product_categories`
--

INSERT INTO `siam_product_categories` (`id`, `name`, `slug`, `display_order`, `is_active`, `created_at`, `updated_at`, `card_description`, `card_image_path`, `modal_short_description`) VALUES
(1, 'PANDEMIC PRODUCTS', 'pandemic-products', 0, 1, '2026-03-19 21:03:10', '2026-03-27 16:41:41', 'Essential safety and protective products designed to promote health and prevent the spread of infection.', '/storage/siam-product-categories/O5tikeo9LzhD0ay9apVNkYAT3pTE8tPPNGnb7W1B.png', NULL),
(2, 'METAL FABRICATION', 'metal-fabrication', 1, 1, '2026-03-19 21:03:10', '2026-03-19 21:03:10', 'Custom metal works crafted with precision and durability for industrial, commercial, and personal use.', 'MetalFabrication.png', 'Custom metal works crafted with precision and durability for industrial, commercial, and personal use.'),
(3, 'TROPHIES & SIGNAGES', 'trophies-signages', 2, 1, '2026-03-19 21:03:10', '2026-03-19 21:03:10', 'High-quality custom trophies and signages designed for events, businesses, and special recognition.', 'Trophies.png', 'High-quality custom trophies and signages designed for events, businesses, and special recognition.'),
(4, 'BOXES & OFFICE SUPPLIES', 'boxes-office-supplies', 3, 1, '2026-03-19 21:03:10', '2026-03-19 21:03:10', 'Durable packaging boxes and reliable office essentials for everyday business needs.', 'Boxes.png', 'Durable packaging boxes and reliable office essentials for everyday business needs.'),
(5, 'CONSTRUCTION MATERIALS', 'construction-materials', 4, 1, '2026-03-19 21:03:10', '2026-03-19 21:05:50', 'Quality materials built for strength, safety, and reliable construction projects.', '/storage/siam-products/BQSy5lpFXEuKXaRj0uX57hMIA7Z6sI0AeYNttaXh.png', 'Quality materials built for strength, safety, and reliable construction projects.'),
(6, 'OTHER CONSUMABLES', 'other-consumables', 5, 1, '2026-03-19 21:03:10', '2026-03-19 21:03:10', 'Essential everyday supplies designed for continuous use in various industries and businesses.', 'https://placehold.co/350x269', 'Essential everyday supplies designed for continuous use in various industries and businesses.');

-- --------------------------------------------------------

--
-- Table structure for table `subsidiaries`
--

CREATE TABLE `subsidiaries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `logo_path` varchar(255) DEFAULT NULL,
  `background_path` varchar(255) DEFAULT NULL,
  `display_style` varchar(255) NOT NULL DEFAULT 'light',
  `display_order` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subsidiaries`
--

INSERT INTO `subsidiaries` (`id`, `name`, `description`, `logo_path`, `background_path`, `display_style`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'SD TRADING CO.', 'Founded in 1982 and forged an exclusive partnership with Sunstar of Japan, started supplying windshield sealers to local automotive OEMs. Other products introduced include body sealers, D/G, primers, and adhesives', '/sd-remove.png', '/SD.JPG', 'dark', 0, 1, '2026-03-16 20:44:02', '2026-03-16 21:15:29'),
(2, 'SIAM DIRECT CORPORATION', 'Established in 2010 to handle distribution of manufacturing consumables. We also stand as the sales and marketing arm of the whole Sundia group.', '/siam.png', NULL, 'light', 1, 1, '2026-03-16 20:44:02', '2026-03-16 22:57:48'),
(3, 'TPMSI', 'Offer a broad range of packaging solutions to meet our customer needs and continuously improve our operations to better respond to those needs.', '/Tpsmilogo.png', '/Tpsmiprod.JPG', 'dark', 2, 1, '2026-03-16 20:44:02', '2026-03-16 20:44:02'),
(4, 'R2R', 'A primary painting contractor of automotive, motorcycle, and electronic components that includes ED painting, powder coating, and automotive plastic painting.', '/Sundialogo.png', NULL, 'light', 3, 1, '2026-03-16 20:44:02', '2026-03-16 20:44:02'),
(5, 'TOP OFFROAD', 'TOP Offroad Philippines have become a major player in the distribution and installation of outdoor and off-road vehicle accessories. We continuously expand our product line to help our customers enjoy the outdoor experience.', '/topoffroadlogo.png', '/ford.jpg', 'dark', 4, 1, '2026-03-16 20:44:02', '2026-03-16 20:44:02');

-- --------------------------------------------------------

--
-- Table structure for table `sundias`
--

CREATE TABLE `sundias` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `logo_path` varchar(255) DEFAULT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`content`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sundias`
--

INSERT INTO `sundias` (`id`, `logo_path`, `content`, `created_at`, `updated_at`) VALUES
(1, '/storage/logos/QInrrwlFdbtrrS6YsNvzHuThRneKgBH83DsVYScz.png', '{\"stats_title_line1\":\"WHAT\",\"stats_title_line2\":\"WE\",\"stats_title_line3\":\"DO?\",\"stats_items\":[{\"value\":\"25+\",\"label\":\"Years Experience\"},{\"value\":\"5\",\"label\":\"Affiliated Companies\"},{\"value\":\"500+\",\"label\":\"Team Members\"},{\"value\":\"1000+\",\"label\":\"Projects Completed\"}],\"video\":{\"title\":null,\"url\":null,\"thumbnail\":null,\"active\":\"1\"}}', '2026-03-15 21:34:38', '2026-03-27 17:28:06');

-- --------------------------------------------------------

--
-- Table structure for table `team_members`
--

CREATE TABLE `team_members` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `profile_image_path` varchar(255) DEFAULT NULL,
  `company_logo` varchar(255) DEFAULT NULL,
  `display_order` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `team_members`
--

INSERT INTO `team_members` (`id`, `name`, `title`, `company`, `profile_image_path`, `company_logo`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'MR. DANTE LAMANDO', 'CHAIRMAN', 'SUNDIA', '/storage/team-members/sFujmx3JGx9VAkIYS46K9fOgePU5iM7EyjQbvtLh.jpg', 'sundia', 0, 1, '2026-03-16 22:09:07', '2026-03-16 22:22:57'),
(2, 'MR. JEP BERNAS', 'PRESIDENT', 'TPSMI', NULL, 'tpsmi', 1, 1, '2026-03-16 22:09:07', '2026-03-16 22:09:07'),
(3, 'MR. GENER DOCTORA', 'VICE PRESIDENT', 'TOP OFFROAD', NULL, 'top', 2, 1, '2026-03-16 22:09:07', '2026-03-16 22:09:07'),
(4, 'MS. RHOMAY ANTONIO', 'ASST. PLANT MANAGER', 'SUNDIA', NULL, 'sundia', 3, 1, '2026-03-16 22:09:07', '2026-03-16 22:09:07'),
(5, 'MR. RD ELIZONDO', 'MARKETING MANAGER', 'SUNDIA', NULL, 'sundia', 4, 1, '2026-03-16 22:09:07', '2026-03-16 22:09:07'),
(6, 'MR. ROMEO AMORES, JR.', 'SR. ACCOUNTS OFFICER', 'SUNDIA', NULL, 'sundia', 5, 1, '2026-03-16 22:09:07', '2026-03-16 22:09:07');

-- --------------------------------------------------------

--
-- Table structure for table `topoffroadpage_videos`
--

CREATE TABLE `topoffroadpage_videos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `video_path` varchar(255) DEFAULT NULL,
  `thumbnail_path` varchar(255) DEFAULT NULL,
  `overlay_enabled` tinyint(1) NOT NULL DEFAULT 1,
  `overlay_image_path` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `topoffroadpage_videos`
--

INSERT INTO `topoffroadpage_videos` (`id`, `title`, `video_url`, `video_path`, `thumbnail_path`, `overlay_enabled`, `overlay_image_path`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'TOP OFFROAD Page Video', '/2024%20TOP%20Offroad%20presentation.mp4', NULL, NULL, 1, NULL, 1, '2026-03-22 19:40:19', '2026-03-22 19:40:19');

-- --------------------------------------------------------

--
-- Table structure for table `topoffroads`
--

CREATE TABLE `topoffroads` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `logo_path` varchar(255) DEFAULT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`content`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `topoffroads`
--

INSERT INTO `topoffroads` (`id`, `logo_path`, `content`, `created_at`, `updated_at`) VALUES
(1, '/topoffroadlogo.png', '{\"stats_title_line1\":\"WHATHA\",\"stats_title_line2\":\"WE\",\"stats_title_line3\":\"DO?\",\"stats_items\":[{\"value\":\"25+\",\"label\":\"Years Experience\"},{\"value\":\"5\",\"label\":\"Affiliated Companies\"},{\"value\":\"500+\",\"label\":\"Team Members\"},{\"value\":\"1000+\",\"label\":\"Projects Completed\"}],\"video\":{\"title\":\"TOP OFFROAD Page Video\",\"url\":\"\\/2024%20TOP%20Offroad%20presentation.mp4\",\"thumbnail\":null,\"active\":true}}', '2026-03-22 19:40:19', '2026-03-23 00:02:08');

-- --------------------------------------------------------

--
-- Table structure for table `topoffroad_products`
--

CREATE TABLE `topoffroad_products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category` varchar(64) NOT NULL DEFAULT 'car-accessories',
  `topoffroad_product_category_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT 0,
  `display_order` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `topoffroad_products`
--

INSERT INTO `topoffroad_products` (`id`, `category`, `topoffroad_product_category_id`, `title`, `description`, `image_path`, `is_featured`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'car-accessories', 1, 'ADJUSTABLE HEADREST', '360° Adjustable, Memory foam comfort, Easy installation', '/adjustable-headrest.png', 0, 0, 1, '2026-03-22 20:03:38', '2026-03-22 20:07:15'),
(2, 'car-accessories', 1, 'EXTREME BLAST HORN', 'High decibel, Compact design, Easy installation', '/extreme-blast-horn.png', 0, 1, 1, '2026-03-22 20:03:38', '2026-03-22 20:03:38'),
(3, 'car-accessories', 1, 'DIFFERENTIAL BREATHER KIT', 'Off-road ready, Water protection, Easy installation', '/differential-breather-kit.png', 0, 2, 1, '2026-03-22 20:03:38', '2026-03-22 20:03:38'),
(4, 'car-accessories', 1, 'RUGGED CASE', 'Heavy-duty build, Weather resistant, Lockable latches', '/rugged-case.png', 0, 3, 1, '2026-03-22 20:03:38', '2026-03-22 20:03:38'),
(5, 'car-accessories', 1, 'FRONT BUMPER', 'Winch ready, Steel construction, Easy installation', '/front-bumper.png', 0, 4, 1, '2026-03-22 20:03:38', '2026-03-22 20:03:38'),
(6, 'car-accessories', 1, 'SECURITY STRAP', 'Heavy-duty hooks, High load rating, Easy storage', '/security-strap.png', 0, 5, 1, '2026-03-22 20:03:38', '2026-03-22 20:03:38'),
(7, 'car-accessories', 1, 'CASE', 'Keeps gear cold, Durable shell, Secure latches', '/case.png', 0, 6, 1, '2026-03-22 20:03:38', '2026-03-22 20:03:38'),
(8, 'car-accessories', 1, 'RAMPAGE LEAF SPRING', 'Improved load, Smoother ride, Durable steel', '/rampage-leaf-spring.png', 0, 7, 1, '2026-03-22 20:03:38', '2026-03-22 20:03:38'),
(9, 'car-accessories', 1, 'COIL SPRING', 'Lift ready, Enhanced control, Easy fitment', '/coil-spring.png', 0, 8, 1, '2026-03-22 20:03:38', '2026-03-22 20:03:38'),
(11, 'mags-tires', 2, 'TIRES', 'MATIBAY', '/storage/topoffroad-products/DsVOzpe7QX67gWJzhhGV2Md5K1INZO83Gj7KOBgP.png', 0, 0, 1, '2026-03-23 19:20:20', '2026-03-23 19:20:20'),
(12, 'lights', 3, 'TRY', 'TRY', '/storage/topoffroad-products/4VsK5TFsj0YVnE39W8DAKYz5Tuf5mhVwyaZbUYgO.png', 0, 0, 1, '2026-03-27 16:29:52', '2026-03-27 16:29:52');

-- --------------------------------------------------------

--
-- Table structure for table `topoffroad_product_categories`
--

CREATE TABLE `topoffroad_product_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `slug` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `short_description` text DEFAULT NULL,
  `page_intro` text DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `display_order` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `topoffroad_product_categories`
--

INSERT INTO `topoffroad_product_categories` (`id`, `slug`, `title`, `short_description`, `page_intro`, `image_path`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'car-accessories', 'Car Accessories', 'Interior and exterior accessories built for durability and everyday driving.', 'Explore our car accessories including headrests, horns, storage, and more — engineered for comfort and reliability on every drive.', '/case.png', 0, 1, '2026-03-22 20:43:08', '2026-03-22 20:43:08'),
(2, 'mags-tires', 'Mags & Tires', 'Wheels and tires selected for performance and road presence.', 'Quality mags and tires for street and trail — balanced fitment options for your build.', '/case.png', 1, 1, '2026-03-22 20:43:08', '2026-03-22 20:43:08'),
(3, 'lights', 'Lights', 'Lighting upgrades for visibility and style.', 'LED and auxiliary lighting solutions for safer night driving and a bold look.', '/case.png', 2, 1, '2026-03-22 20:43:08', '2026-03-22 20:43:08'),
(4, 'tints', 'Tints', 'Window films for privacy, UV protection, and comfort.', 'Professional-grade tint options to reduce glare and heat while enhancing privacy.', '/case.png', 3, 1, '2026-03-22 20:43:08', '2026-03-22 20:43:08'),
(5, 'camping-gears', 'Camping Gears', 'Outdoor and overland essentials for your next trip.', 'Camping and recovery gear to support adventure-ready vehicles and crews.', '/case.png', 4, 1, '2026-03-22 20:43:08', '2026-03-22 20:43:08');

-- --------------------------------------------------------

--
-- Table structure for table `tpsmipage_videos`
--

CREATE TABLE `tpsmipage_videos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `video_path` varchar(255) DEFAULT NULL,
  `thumbnail_path` varchar(255) DEFAULT NULL,
  `overlay_enabled` tinyint(1) NOT NULL DEFAULT 1,
  `overlay_image_path` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tpsmipage_videos`
--

INSERT INTO `tpsmipage_videos` (`id`, `title`, `video_url`, `video_path`, `thumbnail_path`, `overlay_enabled`, `overlay_image_path`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'TPSMI Page Video', '/2025%20Sundia%20Company%20video.mp4', NULL, NULL, 1, NULL, 1, '2026-03-19 21:25:12', '2026-03-19 21:25:12');

-- --------------------------------------------------------

--
-- Table structure for table `tpsmis`
--

CREATE TABLE `tpsmis` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `logo_path` varchar(255) DEFAULT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`content`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tpsmis`
--

INSERT INTO `tpsmis` (`id`, `logo_path`, `content`, `created_at`, `updated_at`) VALUES
(1, NULL, '{\"stats_title_line1\":\"WHAT\",\"stats_title_line2\":\"WE\",\"stats_title_line3\":\"DO?\",\"stats_items\":[{\"value\":\"25+\",\"label\":\"Years Experience\"},{\"value\":\"3\",\"label\":\"Affiliated Companies\"},{\"value\":\"500+\",\"label\":\"Team Members\"},{\"value\":\"1000+\",\"label\":\"Projects Completed\"}],\"video\":{\"title\":\"TPSMI Page Video\",\"url\":\"\\/2025%20Sundia%20Company%20video.mp4\",\"thumbnail\":null,\"active\":true}}', '2026-03-19 21:25:12', '2026-03-19 21:35:54');

-- --------------------------------------------------------

--
-- Table structure for table `tpsmi_products`
--

CREATE TABLE `tpsmi_products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `display_order` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tpsmi_products`
--

INSERT INTO `tpsmi_products` (`id`, `title`, `description`, `image_path`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'CORRUGATED BOX', 'Durable, Custom sizes, Eco-friendly', '/CORRUGATED BOX.png', 0, 1, '2026-03-19 22:09:34', '2026-03-19 22:09:34'),
(2, 'BILAO BOX', 'Food-grade, Stackable, Secure fit', '/Bilao Box.png', 1, 1, '2026-03-19 22:09:34', '2026-03-19 22:09:34'),
(3, 'BELLY BOX', 'Heavy duty, Versatile, Cost-effective', '/BELLY BOX.png', 2, 1, '2026-03-19 22:09:34', '2026-03-19 23:41:18'),
(4, 'ANTI-STATIC BUBBLE SHEET POUCH', 'ESD protection, Reusable, Tear resistant', '/AntiStatic.png', 3, 1, '2026-03-19 22:09:34', '2026-03-19 22:09:34'),
(5, 'PE FOAM POUCH', 'Cushioning, Lightweight, Flexible', '/PE FOAM PoUCH.png', 4, 1, '2026-03-19 22:09:34', '2026-03-19 22:09:34'),
(6, 'BUBBLE SHEET SLEEVES', 'Easy to use, Protective, Multiple sizes', '/BUBBLE SHEET SLEEVES.png', 5, 1, '2026-03-19 22:09:34', '2026-03-19 23:41:07'),
(9, 'HAHAHHAHHAHA', 'AHHAHHHAHHAHHA', '/storage/tpsmi-products/EMNLxYxw7xvB7X5o7JWuUGUDkUtxSC3vPWcyKiNK.png', 6, 1, '2026-03-25 20:15:45', '2026-03-25 20:15:45'),
(11, 'HAHAHHAHHAHA', 'AHHAHHHAHHAHHA', '/storage/tpsmi-products/qQmIb9vL01tzvBw42R0ui3HKQsUWxAoY1TCjTRdF.png', 7, 1, '2026-03-25 20:22:57', '2026-03-25 20:22:57'),
(12, 'HAHAHHAHHAHA', 'AHHAHHHAHHAHHA', '/storage/tpsmi-products/B3xrAPzIg6ADNcmRRBRRwhPkCCzqH0Cr7aGmuAF4.png', 8, 1, '2026-03-25 20:23:01', '2026-03-25 20:23:01'),
(13, 'HAHAHHAHHAHA', 'AHHAHHHAHHAHHA', '/storage/tpsmi-products/0jlliEK7Kobivp5qUAdHwPxRi0IHttg71tmKct38.png', 9, 1, '2026-03-25 20:23:07', '2026-03-25 20:23:07'),
(14, 'HAHAHHAHHAHA', 'AHHAHHHAHHAHHA', '/storage/tpsmi-products/k9c9xiTv09uXokkntITs1KnA6QoqkOYguKiYS28V.png', 10, 1, '2026-03-25 20:23:15', '2026-03-25 20:23:15');

-- --------------------------------------------------------

--
-- Table structure for table `trusted_companies`
--

CREATE TABLE `trusted_companies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `logo_path` varchar(255) DEFAULT NULL,
  `display_order` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `trusted_companies`
--

INSERT INTO `trusted_companies` (`id`, `name`, `logo_path`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'SIAM', '/storage/trusted-companies/bTB0PzuqiiJXVppMrLw2s7AuGNgn2zRlFLzIhMGT.png', 0, 1, '2026-03-18 19:56:26', '2026-03-18 19:58:45'),
(12, 'TPSMI', '/storage/trusted-companies/M6WIfDSloUhjXHBFKAp80Gc1cf4zG4NBMtLDdoZi.png', 1, 1, '2026-03-19 23:49:45', '2026-03-19 23:49:45'),
(13, 'TOP OFFROAD', '/storage/trusted-companies/BHgEpA0NzuNMEi6NLaWttzKtusUbkYht5AwN9jR5.png', 2, 1, '2026-03-19 23:50:32', '2026-03-19 23:50:32');

-- --------------------------------------------------------

--
-- Table structure for table `upcoming_events`
--

CREATE TABLE `upcoming_events` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `month_label` varchar(12) NOT NULL,
  `day_label` varchar(8) NOT NULL,
  `display_order` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `upcoming_events`
--

INSERT INTO `upcoming_events` (`id`, `title`, `location`, `month_label`, `day_label`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(5, 'SUNDIA OUTING', 'Lobo Batanggas', 'APR', '30', 0, 1, '2026-03-27 17:39:28', '2026-03-27 17:54:18'),
(6, 'TOP OFFROAD OUTREACH', 'Taal', 'MAR', '30', 0, 1, '2026-03-27 17:55:13', '2026-03-27 17:55:13'),
(7, 'TOP OFFROAD OUTREACH', 'Taal', 'MAR', '30', 0, 1, '2026-03-27 17:55:48', '2026-03-27 17:55:48'),
(8, 'TOP OFFROAD OUTREACH', 'Taal', 'MAR', '30', 0, 1, '2026-03-27 17:55:50', '2026-03-27 17:55:50'),
(9, 'TOP OFFROAD OUTREACH', 'Taal', 'MAR', '30', 0, 1, '2026-03-27 17:56:04', '2026-03-27 17:56:04'),
(10, 'TOP OFFROAD OUTREACH', 'Taal', 'MAR', '30', 0, 1, '2026-03-27 17:56:05', '2026-03-27 17:56:05'),
(11, 'TOP OFFROAD OUTREACH', 'Taal', 'MAR', '30', 0, 1, '2026-03-27 17:56:06', '2026-03-27 17:56:06');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `is_admin`, `remember_token`, `created_at`, `updated_at`) VALUES
(2, 'Quitoles, Christian A.', 'quitoleschristian37@gmail.com', NULL, '$2y$12$peZIc/yGsHOheopx6rkgqeJYfWZ01QE3pJXCkQiPzvWVfOt0Cmsa.', 0, NULL, '2026-03-19 19:28:06', '2026-03-19 19:28:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `career_culture_cards`
--
ALTER TABLE `career_culture_cards`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `career_jobs`
--
ALTER TABLE `career_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_infos`
--
ALTER TABLE `contact_infos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contact_infos_is_active_display_order_id_index` (`is_active`,`display_order`,`id`),
  ADD KEY `contact_infos_type_index` (`type`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `homepage_videos`
--
ALTER TABLE `homepage_videos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `homepage_videos_is_active_index` (`is_active`);

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
-- Indexes for table `mission_vision`
--
ALTER TABLE `mission_vision`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `popup_siam_products`
--
ALTER TABLE `popup_siam_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `popup_siam_products_is_active_display_order_id_index` (`is_active`,`display_order`,`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `siampage_videos`
--
ALTER TABLE `siampage_videos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `siampage_videos_is_active_index` (`is_active`);

--
-- Indexes for table `siams`
--
ALTER TABLE `siams`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `siam_category_products`
--
ALTER TABLE `siam_category_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `siam_category_products_siam_product_category_id_foreign` (`siam_product_category_id`);

--
-- Indexes for table `siam_product_categories`
--
ALTER TABLE `siam_product_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `siam_product_categories_slug_unique` (`slug`),
  ADD KEY `siam_product_categories_is_active_display_order_id_index` (`is_active`,`display_order`,`id`);

--
-- Indexes for table `subsidiaries`
--
ALTER TABLE `subsidiaries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subsidiaries_is_active_display_order_index` (`is_active`,`display_order`),
  ADD KEY `subsidiaries_display_order_index` (`display_order`),
  ADD KEY `subsidiaries_is_active_index` (`is_active`);

--
-- Indexes for table `sundias`
--
ALTER TABLE `sundias`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `team_members`
--
ALTER TABLE `team_members`
  ADD PRIMARY KEY (`id`),
  ADD KEY `team_members_is_active_display_order_id_index` (`is_active`,`display_order`,`id`);

--
-- Indexes for table `topoffroadpage_videos`
--
ALTER TABLE `topoffroadpage_videos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `topoffroadpage_videos_is_active_index` (`is_active`);

--
-- Indexes for table `topoffroads`
--
ALTER TABLE `topoffroads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `topoffroad_products`
--
ALTER TABLE `topoffroad_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `topoffroad_products_is_active_display_order_id_index` (`is_active`,`display_order`,`id`),
  ADD KEY `topoffroad_products_category_is_active_display_order_index` (`is_active`,`display_order`),
  ADD KEY `topoffroad_products_topoffroad_product_category_id_foreign` (`topoffroad_product_category_id`);

--
-- Indexes for table `topoffroad_product_categories`
--
ALTER TABLE `topoffroad_product_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `topoffroad_product_categories_slug_unique` (`slug`),
  ADD KEY `tor_prod_cat_active_ord_idx` (`is_active`,`display_order`,`id`);

--
-- Indexes for table `tpsmipage_videos`
--
ALTER TABLE `tpsmipage_videos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tpsmipage_videos_is_active_index` (`is_active`);

--
-- Indexes for table `tpsmis`
--
ALTER TABLE `tpsmis`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tpsmi_products`
--
ALTER TABLE `tpsmi_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tpsmi_products_is_active_display_order_id_index` (`is_active`,`display_order`,`id`);

--
-- Indexes for table `trusted_companies`
--
ALTER TABLE `trusted_companies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `trusted_companies_is_active_display_order_id_index` (`is_active`,`display_order`,`id`);

--
-- Indexes for table `upcoming_events`
--
ALTER TABLE `upcoming_events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `upcoming_events_is_active_display_order_id_index` (`is_active`,`display_order`,`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_is_admin_index` (`is_admin`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `career_culture_cards`
--
ALTER TABLE `career_culture_cards`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `career_jobs`
--
ALTER TABLE `career_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `contact_infos`
--
ALTER TABLE `contact_infos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `homepage_videos`
--
ALTER TABLE `homepage_videos`
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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `mission_vision`
--
ALTER TABLE `mission_vision`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `popup_siam_products`
--
ALTER TABLE `popup_siam_products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `siampage_videos`
--
ALTER TABLE `siampage_videos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `siams`
--
ALTER TABLE `siams`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `siam_category_products`
--
ALTER TABLE `siam_category_products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `siam_product_categories`
--
ALTER TABLE `siam_product_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `subsidiaries`
--
ALTER TABLE `subsidiaries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `sundias`
--
ALTER TABLE `sundias`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `team_members`
--
ALTER TABLE `team_members`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `topoffroadpage_videos`
--
ALTER TABLE `topoffroadpage_videos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `topoffroads`
--
ALTER TABLE `topoffroads`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `topoffroad_products`
--
ALTER TABLE `topoffroad_products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `topoffroad_product_categories`
--
ALTER TABLE `topoffroad_product_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tpsmipage_videos`
--
ALTER TABLE `tpsmipage_videos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tpsmis`
--
ALTER TABLE `tpsmis`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tpsmi_products`
--
ALTER TABLE `tpsmi_products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `trusted_companies`
--
ALTER TABLE `trusted_companies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `upcoming_events`
--
ALTER TABLE `upcoming_events`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `siam_category_products`
--
ALTER TABLE `siam_category_products`
  ADD CONSTRAINT `siam_category_products_siam_product_category_id_foreign` FOREIGN KEY (`siam_product_category_id`) REFERENCES `siam_product_categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `topoffroad_products`
--
ALTER TABLE `topoffroad_products`
  ADD CONSTRAINT `topoffroad_products_topoffroad_product_category_id_foreign` FOREIGN KEY (`topoffroad_product_category_id`) REFERENCES `topoffroad_product_categories` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
