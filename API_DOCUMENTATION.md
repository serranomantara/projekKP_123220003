# 📡 API Documentation - Website Desa Wukirsari

Dokumentasi lengkap untuk semua API endpoint yang tersedia.

## 📋 Base URL

```
http://localhost/projek_rev2/php/api/
```

## 🔑 Authentication

Semua request menggunakan **session-based authentication**. Session akan otomatis dibuat saat login berhasil dan akan expire setelah 30 menit tidak ada aktivitas.

### Headers

```
Content-Type: application/json
```

---

## 🔐 Authentication API

Base: `auth.php`

### 1. Login

Login user dan membuat session.

**Endpoint:** `POST /auth.php?action=login`

**Request Body:**

```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response Success (200):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "admin",
    "role": "admin",
    "nama": "Administrator Desa",
    "email": "admin@wukirsari.desa.id",
    "session_token": "abc123...",
    "login_time": "2025-10-19 10:30:00"
  },
  "message": "Login berhasil",
  "timestamp": "2025-10-19 10:30:00"
}
```

**Response Error (200):**

```json
{
  "success": false,
  "data": null,
  "message": "Username atau password salah",
  "timestamp": "2025-10-19 10:30:00"
}
```

---

### 2. Logout

Logout user dan hapus session.

**Endpoint:** `POST /auth.php?action=logout`

**Authentication Required:** Yes

**Response:**

```json
{
  "success": true,
  "data": null,
  "message": "Logout berhasil",
  "timestamp": "2025-10-19 11:00:00"
}
```

---

### 3. Check Session

Cek apakah user masih login.

**Endpoint:** `GET /auth.php?action=check`

**Response (Logged In):**

```json
{
  "success": true,
  "data": {
    "logged_in": true,
    "user_id": 1,
    "username": "admin",
    "role": "admin",
    "nama": "Administrator Desa"
  },
  "message": "Session aktif",
  "timestamp": "2025-10-19 10:35:00"
}
```

**Response (Not Logged In):**

```json
{
  "success": true,
  "data": {
    "logged_in": false
  },
  "message": "Tidak ada session",
  "timestamp": "2025-10-19 10:35:00"
}
```

---

### 4. Get Current User

Ambil data user yang sedang login.

**Endpoint:** `GET /auth.php?action=getCurrentUser`

**Authentication Required:** Yes

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "admin",
    "role": "admin",
    "nama": "Administrator Desa",
    "email": "admin@wukirsari.desa.id",
    "created_at": "2025-01-01 00:00:00",
    "login_time": "2025-10-19 10:30:00"
  },
  "message": "User data retrieved",
  "timestamp": "2025-10-19 10:35:00"
}
```

---

### 5. Get Active Users

Ambil daftar user yang sedang online (Admin only).

**Endpoint:** `GET /auth.php?action=getActiveUsers`

**Authentication Required:** Admin

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "username": "admin",
      "nama": "Administrator Desa",
      "email": "admin@wukirsari.desa.id",
      "role": "admin",
      "session_token": "abc123...",
      "login_time": "2025-10-19 10:30:00",
      "last_activity": "2025-10-19 10:35:00",
      "idle_minutes": 5
    }
  ],
  "message": "Active users retrieved",
  "timestamp": "2025-10-19 10:35:00"
}
```

---

## 📋 Menu API

Base: `menu.php`

Menu Types: `sekretariat`, `tatalaksana`, `danarta`, `pangripta`, `jagabaya`, `uluulu`, `kamituwa`, `ppid`

### 1. Get All Menu Items

Ambil semua item dari menu tertentu.

**Endpoint:** `GET /menu.php?action=getAll&menu_type={menuType}`

**Example:** `GET /menu.php?action=getAll&menu_type=sekretariat`

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Surat Masuk",
      "description": "Pengelolaan surat masuk dari masyarakat dan instansi",
      "url": "pages/sekretariat/surat-masuk.html",
      "icon": "📨",
      "created_by": 1,
      "created_at": "2025-01-01 00:00:00",
      "updated_at": "2025-01-01 00:00:00",
      "creator_name": "Administrator Desa",
      "creator_username": "admin"
    }
  ],
  "message": "Menu items retrieved successfully",
  "timestamp": "2025-10-19 10:35:00"
}
```

---

### 2. Get Menu Item by ID

Ambil detail satu item menu.

**Endpoint:** `GET /menu.php?action=getById&menu_type={menuType}&id={id}`

**Example:** `GET /menu.php?action=getById&menu_type=sekretariat&id=1`

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Surat Masuk",
    "description": "Pengelolaan surat masuk dari masyarakat dan instansi",
    "url": "pages/sekretariat/surat-masuk.html",
    "icon": "📨",
    "created_by": 1,
    "created_at": "2025-01-01 00:00:00",
    "updated_at": "2025-01-01 00:00:00",
    "creator_name": "Administrator Desa",
    "creator_username": "admin"
  },
  "message": "Menu item retrieved successfully",
  "timestamp": "2025-10-19 10:35:00"
}
```

---

### 3. Create Menu Item

Tambah item menu baru.

**Endpoint:** `POST /menu.php?action=create&menu_type={menuType}`

**Authentication Required:** Yes

**Request Body:**

```json
{
  "title": "Test Menu",
  "description": "Deskripsi test",
  "url": "http://example.com",
  "icon": "📄"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 6,
    "title": "Test Menu",
    "description": "Deskripsi test",
    "url": "http://example.com",
    "icon": "📄",
    "created_by": 1,
    "created_at": "2025-10-19 10:40:00",
    "updated_at": "2025-10-19 10:40:00"
  },
  "message": "Menu item created successfully",
  "timestamp": "2025-10-19 10:40:00"
}
```

---

### 4. Update Menu Item

Update item menu yang sudah ada.

**Endpoint:** `POST /menu.php?action=update&menu_type={menuType}&id={id}`

**Authentication Required:** Yes

**Request Body:**

```json
{
  "title": "Updated Menu",
  "description": "Updated description",
  "url": "http://example.com/updated",
  "icon": "📝"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 6,
    "title": "Updated Menu",
    "description": "Updated description",
    "url": "http://example.com/updated",
    "icon": "📝",
    "created_by": 1,
    "created_at": "2025-10-19 10:40:00",
    "updated_at": "2025-10-19 10:45:00"
  },
  "message": "Menu item updated successfully",
  "timestamp": "2025-10-19 10:45:00"
}
```

---

### 5. Delete Menu Item

Hapus item menu.

**Endpoint:** `POST /menu.php?action=delete&menu_type={menuType}&id={id}`

**Authentication Required:** Yes

**Response:**

```json
{
  "success": true,
  "data": null,
  "message": "Menu item deleted successfully",
  "timestamp": "2025-10-19 10:50:00"
}
```

---

## 👥 Users API

Base: `users.php`

**All endpoints require Admin authentication**

### 1. Get All Users

Ambil daftar semua user.

**Endpoint:** `GET /users.php?action=getAll`

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "username": "admin",
      "role": "admin",
      "nama": "Administrator Desa",
      "email": "admin@wukirsari.desa.id",
      "created_at": "2025-01-01 00:00:00",
      "updated_at": "2025-01-01 00:00:00"
    }
  ],
  "message": "Users retrieved successfully",
  "timestamp": "2025-10-19 10:35:00"
}
```

---

### 2. Get User by ID

Ambil detail user tertentu.

**Endpoint:** `GET /users.php?action=getById&id={id}`

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "admin",
    "role": "admin",
    "nama": "Administrator Desa",
    "email": "admin@wukirsari.desa.id",
    "created_at": "2025-01-01 00:00:00",
    "updated_at": "2025-01-01 00:00:00"
  },
  "message": "User retrieved successfully",
  "timestamp": "2025-10-19 10:35:00"
}
```

---

### 3. Create User

Buat user baru.

**Endpoint:** `POST /users.php?action=create`

**Request Body:**

```json
{
  "username": "newuser",
  "password": "password123",
  "role": "user",
  "nama": "User Baru",
  "email": "newuser@example.com"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 7,
    "username": "newuser",
    "role": "user",
    "nama": "User Baru",
    "email": "newuser@example.com",
    "created_at": "2025-10-19 11:00:00"
  },
  "message": "User created successfully",
  "timestamp": "2025-10-19 11:00:00"
}
```

---

### 4. Update User

Update data user.

**Endpoint:** `POST /users.php?action=update&id={id}`

**Request Body:**

```json
{
  "username": "updateduser",
  "role": "admin",
  "nama": "Updated Name",
  "email": "updated@example.com"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 7,
    "username": "updateduser",
    "role": "admin",
    "nama": "Updated Name",
    "email": "updated@example.com",
    "created_at": "2025-10-19 11:00:00",
    "updated_at": "2025-10-19 11:05:00"
  },
  "message": "User updated successfully",
  "timestamp": "2025-10-19 11:05:00"
}
```

---

### 5. Delete User

Hapus user (tidak bisa delete diri sendiri).

**Endpoint:** `POST /users.php?action=delete&id={id}`

**Response:**

```json
{
  "success": true,
  "data": null,
  "message": "User deleted successfully",
  "timestamp": "2025-10-19 11:10:00"
}
```

---

### 6. Change Password

Ganti password (user bisa ganti password sendiri, admin bisa ganti semua).

**Endpoint:** `POST /users.php?action=changePassword&id={id}`

**Request Body (Non-Admin):**

```json
{
  "old_password": "oldpass123",
  "new_password": "newpass123"
}
```

**Request Body (Admin):**

```json
{
  "new_password": "newpass123"
}
```

**Response:**

```json
{
  "success": true,
  "data": null,
  "message": "Password changed successfully",
  "timestamp": "2025-10-19 11:15:00"
}
```

---

### 7. Get Activity Logs

Ambil log aktivitas user.

**Endpoint:** `GET /users.php?action=getActivityLogs&user_id={userId}&limit={limit}`

**Query Parameters:**

- `user_id` (optional): Filter by user ID
- `limit` (optional): Max records, default 100

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "action": "LOGIN",
      "table_name": null,
      "record_id": null,
      "details": "User logged in",
      "ip_address": "127.0.0.1",
      "created_at": "2025-10-19 10:30:00",
      "username": "admin",
      "nama": "Administrator Desa"
    }
  ],
  "message": "Activity logs retrieved successfully",
  "timestamp": "2025-10-19 11:20:00"
}
```

---

### 8. Get User Statistics

Ambil statistik user dan aktivitas.

**Endpoint:** `GET /users.php?action=getStats`

**Response:**

```json
{
  "success": true,
  "data": {
    "total_users": 6,
    "total_admin": 1,
    "total_regular_users": 5,
    "active_sessions": 3,
    "user_activity": [
      {
        "id": 1,
        "username": "admin",
        "nama": "Administrator Desa",
        "role": "admin",
        "active_days": 10,
        "total_actions": 150,
        "last_action": "2025-10-19 11:20:00"
      }
    ]
  },
  "message": "User statistics retrieved successfully",
  "timestamp": "2025-10-19 11:20:00"
}
```

---

## ❌ Error Responses

Semua error akan return dengan format berikut:

```json
{
  "success": false,
  "data": null,
  "message": "Error message here",
  "timestamp": "2025-10-19 10:35:00"
}
```

### Common Error Messages

| Message                                | Description                    |
| -------------------------------------- | ------------------------------ |
| `Invalid action`                       | Action parameter tidak valid   |
| `Invalid menu type`                    | Menu type tidak ada dalam list |
| `Unauthorized - Please login`          | User belum login               |
| `Unauthorized - Admin access required` | Butuh akses admin              |
| `Username atau password salah`         | Login gagal                    |
| `Menu item not found`                  | Item tidak ditemukan           |
| `User not found`                       | User tidak ada                 |
| `Username already exists`              | Username sudah dipakai         |
| `All fields are required`              | Ada field yang kosong          |
| `Network error`                        | Koneksi gagal                  |

---

## 🧪 Testing dengan cURL

### Login

```bash
curl -X POST http://localhost/projek_rev2/php/api/auth.php?action=login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' \
  -c cookies.txt
```

### Get Menu (with session)

```bash
curl http://localhost/projek_rev2/php/api/menu.php?action=getAll&menu_type=sekretariat \
  -b cookies.txt
```

### Create Menu Item (with session)

```bash
curl -X POST http://localhost/projek_rev2/php/api/menu.php?action=create&menu_type=sekretariat \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Test desc","url":"http://test.com","icon":"📄"}' \
  -b cookies.txt
```

### Logout

```bash
curl -X POST http://localhost/projek_rev2/php/api/auth.php?action=logout \
  -b cookies.txt
```

---

## 📝 Notes

1. Semua timestamp menggunakan timezone Asia/Jakarta
2. Password di-hash menggunakan MD5 (untuk production, gunakan bcrypt)
3. Session timeout: 30 menit idle
4. Auto cleanup expired sessions setiap 5 menit
5. Semua CRUD operations otomatis ter-log
6. CORS enabled untuk development

---

**Happy Coding! 🚀**
