# Panduan Instalasi & Setup Database

## 📋 Daftar Isi

1. [Persiapan](#persiapan)
2. [Instalasi Database](#instalasi-database)
3. [Konfigurasi PHP](#konfigurasi-php)
4. [Testing API](#testing-api)
5. [Default Credentials](#default-credentials)
6. [Troubleshooting](#troubleshooting)

---

## 🚀 Persiapan

### Requirements

- **XAMPP** atau **WAMP** atau **LAMP** (PHP 7.4+ dan MySQL 5.7+)
- **phpMyAdmin** (biasanya sudah termasuk dalam XAMPP/WAMP)
- Web Browser (Chrome, Firefox, Edge)

### Download & Install XAMPP (jika belum ada)

1. Download XAMPP dari: https://www.apachefriends.org/
2. Install XAMPP
3. Jalankan **Apache** dan **MySQL** dari XAMPP Control Panel

---

## 💾 Instalasi Database

### Langkah 1: Buka phpMyAdmin

1. Buka browser
2. Akses: `http://localhost/phpmyadmin`
3. Login dengan username: `root` (password: kosong/default)

### Langkah 2: Import Database

#### Cara 1: Import File SQL (Recommended)

1. Di phpMyAdmin, klik tab **"Import"**
2. Klik **"Choose File"**
3. Pilih file: `database/wukirsari.sql`
4. Klik **"Go"** atau **"Kirim"**
5. Tunggu hingga proses selesai
6. Database `wukirsari_db` akan terbuat otomatis

#### Cara 2: Manual SQL Query

1. Di phpMyAdmin, klik tab **"SQL"**
2. Buka file `database/wukirsari.sql` dengan text editor
3. Copy semua isi file
4. Paste ke SQL query box di phpMyAdmin
5. Klik **"Go"** atau **"Kirim"**

### Langkah 3: Verifikasi Database

Setelah import berhasil, pastikan database memiliki tabel-tabel berikut:

- ✅ users
- ✅ active_sessions
- ✅ menu_sekretariat
- ✅ menu_tatalaksana
- ✅ menu_danarta
- ✅ menu_pangripta
- ✅ menu_jagabaya
- ✅ menu_uluulu
- ✅ menu_kamituwa
- ✅ menu_ppid
- ✅ menu_cards
- ✅ activity_logs

---

## ⚙️ Konfigurasi PHP

### Langkah 1: Konfigurasi Database Connection

Edit file: `php/config/database.php`

```php
// Sesuaikan dengan konfigurasi MySQL Anda
define('DB_HOST', 'localhost');      // Host database
define('DB_USER', 'root');           // Username MySQL
define('DB_PASS', '');               // Password MySQL (kosongkan jika tidak ada)
define('DB_NAME', 'wukirsari_db');   // Nama database
```

### Langkah 2: Copy Folder ke htdocs (jika menggunakan XAMPP)

```bash
# Copy seluruh folder projek ke htdocs
C:\xampp\htdocs\projek_rev2
```

### Langkah 3: Test Koneksi Database

Buat file `test_connection.php` di folder `php/`:

```php
<?php
require_once 'config/database.php';

if (testConnection()) {
    echo "✅ Database connection successful!";
} else {
    echo "❌ Database connection failed!";
}
?>
```

Akses: `http://localhost/projek_rev2/php/test_connection.php`

---

## 🧪 Testing API

### 1. Test Auth API

#### Login

```bash
# Method: POST
# URL: http://localhost/projek_rev2/php/api/auth.php?action=login
# Body (JSON):
{
    "username": "admin",
    "password": "admin123"
}
```

**Test dengan cURL:**

```bash
curl -X POST http://localhost/projek_rev2/php/api/auth.php?action=login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

#### Check Session

```bash
# Method: GET
# URL: http://localhost/projek_rev2/php/api/auth.php?action=check
```

#### Logout

```bash
# Method: POST
# URL: http://localhost/projek_rev2/php/api/auth.php?action=logout
```

### 2. Test Menu API

#### Get All Menu Items

```bash
# Method: GET
# URL: http://localhost/projek_rev2/php/api/menu.php?action=getAll&menu_type=sekretariat
```

**Test dengan browser:**

```
http://localhost/projek_rev2/php/api/menu.php?action=getAll&menu_type=sekretariat
```

#### Create Menu Item

```bash
# Method: POST
# URL: http://localhost/projek_rev2/php/api/menu.php?action=create&menu_type=sekretariat
# Body (JSON):
{
    "title": "Test Menu",
    "description": "Deskripsi test",
    "url": "http://example.com",
    "icon": "📄"
}
```

#### Update Menu Item

```bash
# Method: POST
# URL: http://localhost/projek_rev2/php/api/menu.php?action=update&menu_type=sekretariat&id=1
# Body (JSON):
{
    "title": "Updated Menu",
    "description": "Updated description",
    "url": "http://example.com",
    "icon": "📝"
}
```

#### Delete Menu Item

```bash
# Method: POST/DELETE
# URL: http://localhost/projek_rev2/php/api/menu.php?action=delete&menu_type=sekretariat&id=1
```

### 3. Test Users API (Admin Only)

#### Get All Users

```bash
# Method: GET
# URL: http://localhost/projek_rev2/php/api/users.php?action=getAll
```

#### Create User

```bash
# Method: POST
# URL: http://localhost/projek_rev2/php/api/users.php?action=create
# Body (JSON):
{
    "username": "newuser",
    "password": "password123",
    "role": "user",
    "nama": "User Baru",
    "email": "newuser@example.com"
}
```

---

## 🔐 Default Credentials

### Admin Account

```
Username: admin
Password: admin123
Role: admin
```

### User Accounts

```
Username: user1  |  Password: user123  |  Role: user  |  Nama: Petugas Sekretariat
Username: user2  |  Password: user123  |  Role: user  |  Nama: Petugas Kamituwa
Username: user3  |  Password: user123  |  Role: user  |  Nama: Petugas Ulu-Ulu
Username: user4  |  Password: user123  |  Role: user  |  Nama: Petugas Danarta
Username: user5  |  Password: user123  |  Role: user  |  Nama: Petugas Jagabaya
```

---

## 🛠️ Troubleshooting

### Problem: Database connection failed

**Solusi:**

1. Pastikan MySQL service sudah berjalan
2. Cek kredensial di `php/config/database.php`
3. Pastikan database `wukirsari_db` sudah dibuat
4. Cek error log MySQL

### Problem: 404 Not Found saat akses API

**Solusi:**

1. Pastikan Apache sudah running
2. Pastikan folder projek di htdocs
3. Cek path URL sudah benar
4. Pastikan file PHP ada di folder yang benar

### Problem: Session tidak tersimpan

**Solusi:**

1. Cek `php.ini` untuk konfigurasi session
2. Pastikan `session_start()` dipanggil di `database.php`
3. Clear browser cookies
4. Restart Apache

### Problem: CORS Error

**Solusi:**
Headers CORS sudah di-set di setiap file API:

```php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
```

### Problem: MySQL Error 1064 (Syntax Error)

**Solusi:**

1. Pastikan menggunakan MySQL 5.7+
2. Cek delimiter di stored procedures
3. Import ulang database

### Problem: Permission Denied

**Solusi (Windows):**

```bash
# Run XAMPP as Administrator
```

**Solusi (Linux):**

```bash
sudo chmod -R 755 /var/www/html/projek_rev2
sudo chown -R www-data:www-data /var/www/html/projek_rev2
```

---

## 📊 Database Structure

### Tables Overview

```
wukirsari_db
├── users                    # User accounts
├── active_sessions          # User sessions tracking
├── menu_sekretariat        # Menu items Sekretariat
├── menu_tatalaksana        # Menu items Tata Laksana
├── menu_danarta            # Menu items Danarta
├── menu_pangripta          # Menu items Pangripta
├── menu_jagabaya           # Menu items Jagabaya
├── menu_uluulu             # Menu items Ulu-Ulu
├── menu_kamituwa           # Menu items Kamituwa
├── menu_ppid               # Menu items PPID
├── menu_cards              # Custom card configurations
└── activity_logs           # Activity logging
```

### Views

- `v_active_users` - Active user sessions
- `v_user_activity_stats` - User activity statistics

### Stored Procedures

- `sp_cleanup_expired_sessions()` - Auto cleanup expired sessions
- `sp_get_menu_items(menu_type)` - Get menu with user info
- `sp_add_activity_log(...)` - Add activity log

---

## 📝 Notes

1. **Security**: Password menggunakan MD5. Untuk production, gunakan `password_hash()` dengan bcrypt
2. **Session Timeout**: Default 30 menit idle time
3. **Auto Cleanup**: Event scheduler auto cleanup expired sessions setiap 5 menit
4. **Logging**: Semua CRUD operations otomatis ter-log via triggers
5. **Encoding**: Database menggunakan UTF-8 (utf8mb4)

---

## 🔗 API Endpoints Summary

| Endpoint                                | Method | Description         | Auth Required |
| --------------------------------------- | ------ | ------------------- | ------------- |
| `/api/auth.php?action=login`            | POST   | Login user          | No            |
| `/api/auth.php?action=logout`           | POST   | Logout user         | Yes           |
| `/api/auth.php?action=check`            | GET    | Check session       | No            |
| `/api/auth.php?action=getCurrentUser`   | GET    | Get current user    | Yes           |
| `/api/auth.php?action=getActiveUsers`   | GET    | Get active users    | Admin         |
| `/api/menu.php?action=getAll`           | GET    | Get all menu items  | No            |
| `/api/menu.php?action=getById`          | GET    | Get menu item by ID | No            |
| `/api/menu.php?action=create`           | POST   | Create menu item    | Yes           |
| `/api/menu.php?action=update`           | POST   | Update menu item    | Yes           |
| `/api/menu.php?action=delete`           | POST   | Delete menu item    | Yes           |
| `/api/users.php?action=getAll`          | GET    | Get all users       | Admin         |
| `/api/users.php?action=create`          | POST   | Create user         | Admin         |
| `/api/users.php?action=update`          | POST   | Update user         | Admin         |
| `/api/users.php?action=delete`          | POST   | Delete user         | Admin         |
| `/api/users.php?action=changePassword`  | POST   | Change password     | Yes           |
| `/api/users.php?action=getActivityLogs` | GET    | Get activity logs   | Admin         |
| `/api/users.php?action=getStats`        | GET    | Get user statistics | Admin         |

---

## 📞 Support

Jika mengalami masalah:

1. Cek error log Apache: `C:\xampp\apache\logs\error.log`
2. Cek error log MySQL: `C:\xampp\mysql\data\*.err`
3. Enable error reporting di PHP:
   ```php
   error_reporting(E_ALL);
   ini_set('display_errors', 1);
   ```

---

**Happy Coding! 🚀**
