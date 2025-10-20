-- ================================================================
-- Database untuk Website Desa Wukirsari
-- ================================================================
-- Dibuat untuk: phpMyAdmin (MySQL)
-- Deskripsi: Database sistem informasi desa dengan multiple menu
-- ================================================================

-- Create Database
CREATE DATABASE IF NOT EXISTS `wukirsari_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `wukirsari_db`;

-- ================================================================
-- Table: users
-- Deskripsi: Menyimpan data pengguna (admin dan user)
-- ================================================================
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `nama` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_username` (`username`),
  KEY `idx_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default users
INSERT INTO `users` (`id`, `username`, `password`, `role`, `nama`, `email`) VALUES
(1, 'admin', MD5('admin123'), 'admin', 'Administrator Desa', 'admin@wukirsari.desa.id'),
(2, 'user1', MD5('user123'), 'user', 'Petugas Sekretariat', 'sekretariat@wukirsari.desa.id'),
(3, 'user2', MD5('user123'), 'user', 'Petugas Kamituwa', 'kamituwa@wukirsari.desa.id'),
(4, 'user3', MD5('user123'), 'user', 'Petugas Ulu-Ulu', 'uluulu@wukirsari.desa.id'),
(5, 'user4', MD5('user123'), 'user', 'Petugas Danarta', 'danarta@wukirsari.desa.id'),
(6, 'user5', MD5('user123'), 'user', 'Petugas Jagabaya', 'jagabaya@wukirsari.desa.id');

-- ================================================================
-- Table: active_sessions
-- Deskripsi: Tracking user online sessions
-- ================================================================
CREATE TABLE IF NOT EXISTS `active_sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `session_token` varchar(255) NOT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text,
  `login_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_activity` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_session_token` (`session_token`),
  CONSTRAINT `fk_sessions_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- Table: menu_sekretariat
-- Deskripsi: Menu items untuk Sekretariat
-- ================================================================
CREATE TABLE IF NOT EXISTS `menu_sekretariat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `description` text,
  `url` varchar(500) DEFAULT NULL,
  `icon` varchar(10) DEFAULT '📄',
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_created_by` (`created_by`),
  CONSTRAINT `fk_sekretariat_user` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `menu_sekretariat` (`id`, `title`, `description`, `url`, `icon`, `created_by`) VALUES
(1, 'Surat Masuk', 'Pengelolaan surat masuk dari masyarakat dan instansi', 'pages/sekretariat/surat-masuk.html', '📨', 1),
(2, 'Surat Keluar', 'Pengelolaan surat keluar untuk masyarakat dan instansi', 'pages/sekretariat/surat-keluar.html', '📤', 1),
(3, 'Undangan Masuk', 'Daftar undangan yang diterima oleh desa', 'pages/sekretariat/undangan-masuk.html', '📬', 1),
(4, 'Undangan Keluar', 'Undangan yang dikeluarkan oleh pemerintah desa', 'pages/sekretariat/undangan-keluar.html', '📮', 1),
(5, 'Registrasi Peraturan Kalurahan', 'Database peraturan dan regulasi desa', 'pages/sekretariat/registrasi-peraturan.html', '📋', 1);

-- ================================================================
-- Table: menu_tatalaksana
-- Deskripsi: Menu items untuk Tata Laksana
-- ================================================================
CREATE TABLE IF NOT EXISTS `menu_tatalaksana` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `description` text,
  `url` varchar(500) DEFAULT NULL,
  `icon` varchar(10) DEFAULT '📄',
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_created_by` (`created_by`),
  CONSTRAINT `fk_tatalaksana_user` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `menu_tatalaksana` (`id`, `title`, `description`, `url`, `icon`, `created_by`) VALUES
(1, 'Profil Kependudukan Bulanan', 'Data statistik kependudukan per bulan', 'pages/tatalaksana/profil-kependudukan.html', '📊', 1),
(2, 'Jumlah Layanan', 'Total layanan administrasi yang diberikan', 'pages/tatalaksana/jumlah-layanan.html', '🔢', 1),
(3, 'Analisis Data Kependudukan', 'Analisis mendalam data kependudukan desa', 'pages/tatalaksana/analisis-data.html', '📈', 1),
(4, 'Penggunaan Ruangan', 'Jadwal dan statistik penggunaan ruangan kantor desa', 'pages/tatalaksana/penggunaan-ruangan.html', '🏢', 1);

-- ================================================================
-- Table: menu_danarta
-- Deskripsi: Menu items untuk Danarta
-- ================================================================
CREATE TABLE IF NOT EXISTS `menu_danarta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `description` text,
  `url` varchar(500) DEFAULT NULL,
  `icon` varchar(10) DEFAULT '📄',
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_created_by` (`created_by`),
  CONSTRAINT `fk_danarta_user` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `menu_danarta` (`id`, `title`, `description`, `url`, `icon`, `created_by`) VALUES
(1, 'Registrasi Pencarian SPP', 'Sistem pencarian dan registrasi SPP', 'pages/danarta/registrasi-spp.html', '🔍', 1),
(2, 'Dana Bantuan Sosial', 'Informasi bantuan sosial untuk masyarakat', 'pages/danarta/dana-bantuan.html', '💰', 1);

-- ================================================================
-- Table: menu_pangripta
-- Deskripsi: Menu items untuk Pangripta
-- ================================================================
CREATE TABLE IF NOT EXISTS `menu_pangripta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `description` text,
  `url` varchar(500) DEFAULT NULL,
  `icon` varchar(10) DEFAULT '📄',
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_created_by` (`created_by`),
  CONSTRAINT `fk_pangripta_user` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `menu_pangripta` (`id`, `title`, `description`, `url`, `icon`, `created_by`) VALUES
(1, 'RPJM Desa', 'Rencana Pembangunan Jangka Menengah Desa', 'pages/pangripta/rpjm-desa.html', '📝', 1),
(2, 'Profil Kelurahan', 'Profil lengkap Kalurahan Wukirsari', 'pages/pangripta/profil-kelurahan.html', '🏘️', 1),
(3, 'Publikasi Potensi Kalurahan', 'Dokumentasi potensi dan keunggulan desa', 'pages/pangripta/publikasi-potensi.html', '📚', 1);

-- ================================================================
-- Table: menu_jagabaya
-- Deskripsi: Menu items untuk Jagabaya
-- ================================================================
CREATE TABLE IF NOT EXISTS `menu_jagabaya` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `description` text,
  `url` varchar(500) DEFAULT NULL,
  `icon` varchar(10) DEFAULT '📄',
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_created_by` (`created_by`),
  CONSTRAINT `fk_jagabaya_user` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `menu_jagabaya` (`id`, `title`, `description`, `url`, `icon`, `created_by`) VALUES
(1, 'Keamanan Lingkungan', 'Program keamanan dan ketertiban lingkungan', 'pages/jagabaya/keamanan-lingkungan.html', '🛡️', 1),
(2, 'Siskamling', 'Sistem keamanan lingkungan masyarakat', 'pages/jagabaya/siskamling.html', '👮', 1),
(3, 'Laporan Kejadian', 'Pencatatan dan pelaporan kejadian di desa', 'pages/jagabaya/laporan-kejadian.html', '📋', 1);

-- ================================================================
-- Table: menu_uluulu
-- Deskripsi: Menu items untuk Ulu-Ulu
-- ================================================================
CREATE TABLE IF NOT EXISTS `menu_uluulu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `description` text,
  `url` varchar(500) DEFAULT NULL,
  `icon` varchar(10) DEFAULT '📄',
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_created_by` (`created_by`),
  CONSTRAINT `fk_uluulu_user` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `menu_uluulu` (`id`, `title`, `description`, `url`, `icon`, `created_by`) VALUES
(1, 'Program Pembangunan Infrastruktur', 'Proyek pembangunan infrastruktur desa', 'pages/uluulu/program-infrastruktur.html', '🏗️', 1),
(2, 'Pemberdayaan Masyarakat', 'Program pemberdayaan ekonomi masyarakat', 'pages/uluulu/pemberdayaan-masyarakat.html', '👥', 1),
(3, 'Pelatihan dan Workshop', 'Kegiatan pelatihan untuk meningkatkan skill warga', 'pages/uluulu/pelatihan-workshop.html', '🎓', 1);

-- ================================================================
-- Table: menu_kamituwa
-- Deskripsi: Menu items untuk Kamituwa
-- ================================================================
CREATE TABLE IF NOT EXISTS `menu_kamituwa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `description` text,
  `url` varchar(500) DEFAULT NULL,
  `icon` varchar(10) DEFAULT '📄',
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_created_by` (`created_by`),
  CONSTRAINT `fk_kamituwa_user` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `menu_kamituwa` (`id`, `title`, `description`, `url`, `icon`, `created_by`) VALUES
(1, 'Profil Kebudayaan', 'Dokumentasi budaya dan tradisi desa', 'pages/kamituwa/profil-kebudayaan.html', '🎭', 1),
(2, 'Daftar Kegiatan Budaya', 'Jadwal dan dokumentasi kegiatan budaya', 'pages/kamituwa/kegiatan-budaya.html', '📅', 1),
(3, 'Bantuan Sosial', 'Informasi dan pendaftaran bantuan sosial', 'pages/kamituwa/bantuan-sosial.html', '🤝', 1);

-- ================================================================
-- Table: menu_ppid
-- Deskripsi: Menu items untuk PPID
-- ================================================================
CREATE TABLE IF NOT EXISTS `menu_ppid` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `description` text,
  `url` varchar(500) DEFAULT NULL,
  `icon` varchar(10) DEFAULT '📄',
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_created_by` (`created_by`),
  CONSTRAINT `fk_ppid_user` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `menu_ppid` (`id`, `title`, `description`, `url`, `icon`, `created_by`) VALUES
(1, 'Alamat Kantor', 'Jl. Raya Wukirsari No. 123, Bantul, DIY', 'https://maps.app.goo.gl/vFRckEAkjArPxDiq6', '📍', 1),
(2, 'Nomor Telepon', '(0274) 123456', 'https://maps.app.goo.gl/vFRckEAkjArPxDiq6', '📞', 1),
(3, 'Email Resmi', 'info@wukirsari.desa.id', 'https://maps.app.goo.gl/vFRckEAkjArPxDiq6', '✉️', 1),
(4, 'Media Sosial', '@desawukirsari di Instagram dan Facebook', 'https://maps.app.goo.gl/vFRckEAkjArPxDiq6', '📱', 1);

-- ================================================================
-- Table: menu_cards
-- Deskripsi: Custom card titles and descriptions
-- ================================================================
CREATE TABLE IF NOT EXISTS `menu_cards` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menu_type` varchar(50) NOT NULL UNIQUE,
  `title` varchar(200) NOT NULL,
  `description` text,
  `updated_by` int(11) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_menu_type` (`menu_type`),
  KEY `idx_updated_by` (`updated_by`),
  CONSTRAINT `fk_cards_user` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- Table: activity_logs
-- Deskripsi: Logging semua aktivitas user
-- ================================================================
CREATE TABLE IF NOT EXISTS `activity_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `action` varchar(100) NOT NULL,
  `table_name` varchar(50) DEFAULT NULL,
  `record_id` int(11) DEFAULT NULL,
  `details` text,
  `ip_address` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_action` (`action`),
  KEY `idx_created_at` (`created_at`),
  CONSTRAINT `fk_logs_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- Views untuk kemudahan query
-- ================================================================

-- View untuk melihat user dengan session aktif
CREATE OR REPLACE VIEW `v_active_users` AS
SELECT 
    u.id,
    u.username,
    u.nama,
    u.email,
    u.role,
    s.session_token,
    s.login_time,
    s.last_activity,
    TIMESTAMPDIFF(MINUTE, s.last_activity, NOW()) as idle_minutes
FROM users u
INNER JOIN active_sessions s ON u.id = s.user_id
WHERE TIMESTAMPDIFF(MINUTE, s.last_activity, NOW()) < 30
ORDER BY s.last_activity DESC;

-- View untuk statistik aktivitas user
CREATE OR REPLACE VIEW `v_user_activity_stats` AS
SELECT 
    u.id,
    u.username,
    u.nama,
    u.role,
    COUNT(DISTINCT DATE(al.created_at)) as active_days,
    COUNT(al.id) as total_actions,
    MAX(al.created_at) as last_action
FROM users u
LEFT JOIN activity_logs al ON u.id = al.user_id
GROUP BY u.id, u.username, u.nama, u.role;

-- ================================================================
-- Stored Procedures
-- ================================================================

-- Procedure untuk cleanup expired sessions (otomatis hapus session > 30 menit)
DELIMITER $$
CREATE PROCEDURE `sp_cleanup_expired_sessions`()
BEGIN
    DELETE FROM active_sessions 
    WHERE TIMESTAMPDIFF(MINUTE, last_activity, NOW()) > 30;
END$$
DELIMITER ;

-- Procedure untuk get menu items dengan user info
DELIMITER $$
CREATE PROCEDURE `sp_get_menu_items`(IN p_menu_type VARCHAR(50))
BEGIN
    SET @sql = CONCAT('SELECT m.*, u.nama as creator_name, u.username as creator_username 
                       FROM menu_', p_menu_type, ' m 
                       LEFT JOIN users u ON m.created_by = u.id 
                       ORDER BY m.id ASC');
    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$
DELIMITER ;

-- Procedure untuk add activity log
DELIMITER $$
CREATE PROCEDURE `sp_add_activity_log`(
    IN p_user_id INT,
    IN p_action VARCHAR(100),
    IN p_table_name VARCHAR(50),
    IN p_record_id INT,
    IN p_details TEXT,
    IN p_ip_address VARCHAR(45)
)
BEGIN
    INSERT INTO activity_logs (user_id, action, table_name, record_id, details, ip_address)
    VALUES (p_user_id, p_action, p_table_name, p_record_id, p_details, p_ip_address);
END$$
DELIMITER ;

-- ================================================================
-- Triggers untuk automatic logging
-- ================================================================

-- Trigger untuk log insert pada menu_sekretariat
DELIMITER $$
CREATE TRIGGER `tr_sekretariat_insert` AFTER INSERT ON `menu_sekretariat`
FOR EACH ROW
BEGIN
    INSERT INTO activity_logs (user_id, action, table_name, record_id, details)
    VALUES (NEW.created_by, 'INSERT', 'menu_sekretariat', NEW.id, CONCAT('Added: ', NEW.title));
END$$
DELIMITER ;

-- Trigger untuk log update pada menu_sekretariat
DELIMITER $$
CREATE TRIGGER `tr_sekretariat_update` AFTER UPDATE ON `menu_sekretariat`
FOR EACH ROW
BEGIN
    INSERT INTO activity_logs (user_id, action, table_name, record_id, details)
    VALUES (NEW.created_by, 'UPDATE', 'menu_sekretariat', NEW.id, CONCAT('Updated: ', NEW.title));
END$$
DELIMITER ;

-- Trigger untuk log delete pada menu_sekretariat
DELIMITER $$
CREATE TRIGGER `tr_sekretariat_delete` BEFORE DELETE ON `menu_sekretariat`
FOR EACH ROW
BEGIN
    INSERT INTO activity_logs (user_id, action, table_name, record_id, details)
    VALUES (OLD.created_by, 'DELETE', 'menu_sekretariat', OLD.id, CONCAT('Deleted: ', OLD.title));
END$$
DELIMITER ;

-- ================================================================
-- Event Scheduler untuk cleanup otomatis
-- ================================================================

-- Enable event scheduler
SET GLOBAL event_scheduler = ON;

-- Event untuk cleanup expired sessions setiap 5 menit
CREATE EVENT IF NOT EXISTS `evt_cleanup_sessions`
ON SCHEDULE EVERY 5 MINUTE
DO
    CALL sp_cleanup_expired_sessions();

-- ================================================================
-- Default Admin Configuration
-- ================================================================

-- Insert default admin account info
INSERT INTO activity_logs (user_id, action, details) VALUES
(1, 'SYSTEM', 'Database initialized with default data');

-- ================================================================
-- Database Information & Statistics
-- ================================================================

SELECT 'Database created successfully!' as Status;
SELECT DATABASE() as 'Current Database';
SELECT COUNT(*) as 'Total Users' FROM users;
SELECT COUNT(*) as 'Total Menu Items (Sekretariat)' FROM menu_sekretariat;
SELECT COUNT(*) as 'Total Menu Items (Tatalaksana)' FROM menu_tatalaksana;
SELECT COUNT(*) as 'Total Menu Items (Danarta)' FROM menu_danarta;
SELECT COUNT(*) as 'Total Menu Items (Pangripta)' FROM menu_pangripta;
SELECT COUNT(*) as 'Total Menu Items (Jagabaya)' FROM menu_jagabaya;
SELECT COUNT(*) as 'Total Menu Items (Ulu-Ulu)' FROM menu_uluulu;
SELECT COUNT(*) as 'Total Menu Items (Kamituwa)' FROM menu_kamituwa;
SELECT COUNT(*) as 'Total Menu Items (PPID)' FROM menu_ppid;

-- ================================================================
-- END OF SQL SCRIPT
-- ================================================================
