# 🌐 Website Desa Wukirsari - PHP MySQL Version

Sistem Informasi Desa Wukirsari dengan database MySQL dan backend PHP.

## 📋 Deskripsi Proyek

Website ini adalah portal informasi resmi Desa Wukirsari yang menyediakan berbagai layanan dan informasi untuk masyarakat. Sistem ini telah dikonversi dari localStorage (JavaScript) ke database MySQL dengan backend PHP untuk skalabilitas dan keamanan yang lebih baik.

## ✨ Fitur Utama

### 🔐 Authentication & Authorization

- ✅ Login/Logout system dengan session management
- ✅ Role-based access (Admin & User)
- ✅ Session tracking & timeout (30 menit)
- ✅ Active user monitoring (Admin only)

### 📊 Menu Management (CRUD)

- ✅ 8 Kategori Menu: Sekretariat, Tata Laksana, Danarta, Pangripta, Jagabaya, Ulu-Ulu, Kamituwa, PPID
- ✅ Create, Read, Update, Delete menu items
- ✅ Custom icons & URLs untuk setiap menu
- ✅ Edit judul & deskripsi kartu menu

### 👥 User Management (Admin Only)

- ✅ Kelola user accounts
- ✅ Create, update, delete users
- ✅ Change password
- ✅ View user statistics & activity logs

### 📝 Activity Logging

- ✅ Automatic logging semua CRUD operations
- ✅ Track user activities
- ✅ IP address & timestamp logging
- ✅ Database triggers untuk auto-logging

### 🔄 Auto Cleanup

- ✅ Event scheduler untuk cleanup expired sessions
- ✅ Automatic session timeout after 30 minutes idle

## 🛠️ Tech Stack

### Frontend

- HTML5
- CSS3 (Custom styling with animations)
- Vanilla JavaScript
- AJAX untuk API calls

### Backend

- PHP 7.4+ (MySQLi)
- MySQL 5.7+ / MariaDB 10.3+
- Session-based authentication

### Tools

- phpMyAdmin (database management)
- XAMPP/WAMP/LAMP (development environment)

## 📁 Struktur Folder

```
projek_rev2/
├── database/
│   └── wukirsari.sql           # Database SQL file
├── php/
│   ├── config/
│   │   └── database.php        # Database configuration
│   ├── api/
│   │   ├── auth.php           # Authentication API
│   │   ├── menu.php           # Menu CRUD API
│   │   └── users.php          # User management API
│   └── test_connection.php    # Database connection test
├── pages/                      # HTML pages untuk setiap menu
├── asset/                      # Images & assets
├── index.html                  # Homepage
├── style.css                   # Main stylesheet
├── INSTALLATION_GUIDE.md       # Panduan instalasi lengkap
└── README.md                   # This file
```

## 🚀 Instalasi

### 1. Requirements

- XAMPP/WAMP (PHP 7.4+ & MySQL 5.7+)
- Web Browser
- Text Editor (VS Code, Sublime, dll)

### 2. Setup Database

#### a. Install XAMPP

1. Download dari https://www.apachefriends.org/
2. Install dan jalankan Apache + MySQL

#### b. Import Database

1. Buka `http://localhost/phpmyadmin`
2. Klik tab **Import**
3. Pilih file `database/wukirsari.sql`
4. Klik **Go/Kirim**

### 3. Konfigurasi

#### Edit file `php/config/database.php`:

```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');              // Kosongkan jika no password
define('DB_NAME', 'wukirsari_db');
```

### 4. Copy ke htdocs

```bash
# Windows
C:\xampp\htdocs\projek_rev2\

# Linux
/var/www/html/projek_rev2/
```

### 5. Test Connection

Akses: `http://localhost/projek_rev2/php/test_connection.php`

### 6. Buka Website

Akses: `http://localhost/projek_rev2/index.html`

## 🔑 Default Login Credentials

### Admin

```
Username: admin
Password: admin123
```

### Users

```
user1 / user123  - Petugas Sekretariat
user2 / user123  - Petugas Kamituwa
user3 / user123  - Petugas Ulu-Ulu
user4 / user123  - Petugas Danarta
user5 / user123  - Petugas Jagabaya
```

## 📡 API Endpoints

### Authentication API (`php/api/auth.php`)

| Endpoint                 | Method | Description      | Auth  |
| ------------------------ | ------ | ---------------- | ----- |
| `?action=login`          | POST   | Login user       | No    |
| `?action=logout`         | POST   | Logout user      | Yes   |
| `?action=check`          | GET    | Check session    | No    |
| `?action=getCurrentUser` | GET    | Get user data    | Yes   |
| `?action=getActiveUsers` | GET    | Get online users | Admin |

### Menu API (`php/api/menu.php`)

| Endpoint                                   | Method      | Description    | Auth |
| ------------------------------------------ | ----------- | -------------- | ---- |
| `?action=getAll&menu_type={type}`          | GET         | Get all items  | No   |
| `?action=getById&menu_type={type}&id={id}` | GET         | Get item by ID | No   |
| `?action=create&menu_type={type}`          | POST        | Create item    | Yes  |
| `?action=update&menu_type={type}&id={id}`  | POST        | Update item    | Yes  |
| `?action=delete&menu_type={type}&id={id}`  | POST/DELETE | Delete item    | Yes  |

**Menu Types:** sekretariat, tatalaksana, danarta, pangripta, jagabaya, uluulu, kamituwa, ppid

### Users API (`php/api/users.php`)

| Endpoint                         | Method      | Description         | Auth  |
| -------------------------------- | ----------- | ------------------- | ----- |
| `?action=getAll`                 | GET         | Get all users       | Admin |
| `?action=getById&id={id}`        | GET         | Get user by ID      | Admin |
| `?action=create`                 | POST        | Create user         | Admin |
| `?action=update&id={id}`         | POST        | Update user         | Admin |
| `?action=delete&id={id}`         | POST/DELETE | Delete user         | Admin |
| `?action=changePassword&id={id}` | POST        | Change password     | Yes   |
| `?action=getActivityLogs`        | GET         | Get activity logs   | Admin |
| `?action=getStats`               | GET         | Get user statistics | Admin |

## 🗃️ Database Schema

### Tables

#### users

```sql
id, username, password, role, nama, email, created_at, updated_at
```

#### active_sessions

```sql
id, user_id, session_token, ip_address, user_agent, login_time, last_activity
```

#### menu\_{type} (8 tables)

```sql
id, title, description, url, icon, created_by, created_at, updated_at
```

#### activity_logs

```sql
id, user_id, action, table_name, record_id, details, ip_address, created_at
```

### Views

- `v_active_users` - Active sessions dengan user info
- `v_user_activity_stats` - User activity statistics

### Stored Procedures

- `sp_cleanup_expired_sessions()` - Auto cleanup
- `sp_get_menu_items(menu_type)` - Get menu with creator info
- `sp_add_activity_log(...)` - Manual activity logging

### Triggers

- Auto logging untuk INSERT, UPDATE, DELETE operations

## 🎨 Fitur Frontend

- ✅ Responsive design (mobile-friendly)
- ✅ Modern UI/UX dengan animasi
- ✅ Loading screen
- ✅ Modal untuk detail menu
- ✅ Real-time clock & date
- ✅ Session indicator
- ✅ Role-based UI (show/hide admin features)
- ✅ Notification system
- ✅ CRUD forms dengan validasi

## 🔒 Security Features

- ✅ SQL Injection prevention (prepared statements)
- ✅ XSS protection (output escaping)
- ✅ Session-based authentication
- ✅ Session token validation
- ✅ Role-based access control
- ✅ IP address logging
- ✅ Auto session timeout
- ✅ CORS headers configured

## 📚 Dokumentasi Lengkap

Untuk panduan instalasi detail, lihat: [`INSTALLATION_GUIDE.md`](INSTALLATION_GUIDE.md)

## 🐛 Troubleshooting

### Database connection failed

```bash
# Cek MySQL service
# Windows: XAMPP Control Panel -> MySQL -> Start
# Linux: sudo service mysql start
```

### 404 Not Found

```bash
# Pastikan folder di htdocs
# Akses dengan path yang benar
# http://localhost/projek_rev2/index.html
```

### Session tidak tersimpan

```bash
# Clear browser cache & cookies
# Restart Apache
# Cek php.ini untuk session configuration
```

### CORS Error

```bash
# Headers sudah di-set di setiap API file
# Pastikan mengakses via http://localhost bukan file://
```

## 📞 Testing dengan Tools

### Postman

```
Import collection dengan endpoints di atas
Set Content-Type: application/json
```

### cURL

```bash
# Login
curl -X POST http://localhost/projek_rev2/php/api/auth.php?action=login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Get Menu
curl http://localhost/projek_rev2/php/api/menu.php?action=getAll&menu_type=sekretariat
```

### Browser

```
# Simple GET requests
http://localhost/projek_rev2/php/api/menu.php?action=getAll&menu_type=sekretariat
```

## 🔄 Migration dari localStorage

Proyek ini sebelumnya menggunakan localStorage (JavaScript). Berikut perubahan utama:

| Before (localStorage)      | After (MySQL + PHP)               |
| -------------------------- | --------------------------------- |
| Client-side storage        | Server-side database              |
| JavaScript only            | PHP backend + JavaScript frontend |
| Limited capacity (~5-10MB) | Unlimited database storage        |
| No real authentication     | Proper session-based auth         |
| No activity logging        | Complete audit trail              |
| Single-user                | Multi-user support                |

## 📊 Performance

- Database indexing untuk query optimization
- Session cleanup via event scheduler
- Efficient foreign key relationships
- Views untuk complex queries

## 🚀 Future Enhancements

- [ ] Password encryption dengan bcrypt
- [ ] JWT token authentication
- [ ] File upload untuk menu items
- [ ] Email notifications
- [ ] Advanced search & filtering
- [ ] Export data (PDF, Excel)
- [ ] Dashboard dengan charts
- [ ] Mobile app integration
- [ ] REST API documentation (Swagger)

## 📝 Changelog

### Version 2.0 (Current)

- ✅ Converted to PHP + MySQL
- ✅ Complete database implementation
- ✅ RESTful API endpoints
- ✅ Session management
- ✅ Activity logging
- ✅ Auto cleanup scheduler

### Version 1.0

- ✅ Initial release with localStorage
- ✅ Basic CRUD operations
- ✅ Client-side authentication

## 👨‍💻 Developer

**Website Desa Wukirsari Development Team**

## 📄 License

Copyright © 2025 Kalurahan Wukirsari. All Rights Reserved.

---

## 🎯 Quick Start

1. Install XAMPP
2. Start Apache + MySQL
3. Import `database/wukirsari.sql` ke phpMyAdmin
4. Copy folder ke `htdocs`
5. Akses `http://localhost/projek_rev2/php/test_connection.php`
6. Login dengan `admin` / `admin123`

**Happy Coding! 🚀**
