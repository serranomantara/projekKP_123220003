# 🎯 Quick Start Guide - Website Desa Wukirsari

Panduan cepat untuk memulai menggunakan sistem CRUD.

---

## 🚀 5 Menit Tutorial

### Step 1: Buka Website

```
📂 Lokasi: d:\Kuliah\Semester 7\KP\projek_rev
📄 File: index.html
🖱️ Action: Double-click index.html
```

**Expected:**

- Website terbuka di browser
- Loading screen animation
- 8 menu cards muncul

---

### Step 2: Login sebagai Admin

```
🎯 Klik: Tombol "Login" (pojok kanan atas)
```

**Form Login:**

```
👤 Username: admin
🔒 Password: admin123
✅ Submit: Klik "Login"
```

**Expected:**

- ✅ Modal tertutup
- ✅ Notifikasi hijau: "Selamat datang, Admin!"
- ✅ Status berubah: Guest → Admin
- ✅ Badge merah "ADMIN" muncul
- ✅ Tombol "Login" → "Admin"

---

### Step 3: Buka Menu

```
🎯 Klik: Kartu "Sekretariat"
```

**Expected:**

- ✅ Modal terbuka
- ✅ Judul: "SEKRETARIAT"
- ✅ Deskripsi muncul
- ✅ Daftar 10 items muncul
- ✅ Tombol "+ Tambah Item" terlihat (admin only)

---

### Step 4: Tambah Item Baru

```
🎯 Klik: "+ Tambah Item"
```

**Form Input:**

```
📝 Judul: Test Item
📄 Deskripsi: Ini adalah test item (opsional)
🔗 URL: https://google.com (opsional)
📎 Icon: 📄 (opsional)
✅ Submit: Klik "Simpan"
```

**Expected:**

- ✅ Form tertutup
- ✅ Notifikasi: "Item berhasil ditambahkan!"
- ✅ Item baru muncul di list
- ✅ Tombol Edit & Delete muncul

---

### Step 5: Edit Item

```
🎯 Hover: Pada item "Test Item"
🎯 Klik: Tombol "Edit" (biru)
```

**Form Edit:**

```
📝 Judul: Test Item (EDITED)
📄 Deskripsi: Item sudah diedit
✅ Submit: Klik "Simpan"
```

**Expected:**

- ✅ Form tertutup
- ✅ Notifikasi: "Item berhasil diupdate!"
- ✅ Item ter-update di list

---

### Step 6: Hapus Item

```
🎯 Hover: Pada item "Test Item (EDITED)"
🎯 Klik: Tombol "Hapus" (merah)
🎯 Konfirmasi: OK
```

**Expected:**

- ✅ Dialog konfirmasi muncul
- ✅ Item hilang dari list
- ✅ Notifikasi: "Item berhasil dihapus!"

---

### Step 7: Logout

```
🎯 Klik: Nama "Admin" (pojok kanan atas)
🎯 Klik: Tombol "Logout"
```

**Expected:**

- ✅ User menu tertutup
- ✅ Notifikasi: "Anda telah logout"
- ✅ Status: Admin → Guest
- ✅ Tombol: "Admin" → "Login"
- ✅ Tombol CRUD hilang

---

## 🎓 Tutorial Lengkap

### A. Sebagai Guest (Tanpa Login)

#### Yang Bisa Dilakukan:

- ✅ Lihat semua menu
- ✅ Klik menu untuk lihat items
- ✅ Klik item dengan link (buka di tab baru)

#### Yang TIDAK Bisa:

- ❌ Tambah item
- ❌ Edit item
- ❌ Hapus item

**Flow:**

```
1. Buka website
2. Klik menu card
3. Lihat items
4. Klik item (jika ada link)
```

---

### B. Sebagai User (Read-Only)

#### Login:

```
Username: user
Password: user123
```

#### Yang Bisa Dilakukan:

- ✅ Semua yang Guest bisa
- ✅ Status menampilkan "User" dengan badge biru

#### Yang TIDAK Bisa:

- ❌ Tambah item
- ❌ Edit item
- ❌ Hapus item

**Flow:**

```
1. Klik "Login"
2. Input: user / user123
3. Klik "Login"
4. Browse semua menu
5. Klik "User" → "Logout"
```

---

### C. Sebagai Admin (Full Access)

#### Login:

```
Username: admin
Password: admin123
```

#### Yang Bisa Dilakukan:

- ✅ Semua yang User bisa
- ✅ Tambah item baru
- ✅ Edit item existing
- ✅ Hapus item
- ✅ Manage semua 8 menu

#### CRUD Flow:

**CREATE:**

```
1. Login sebagai admin
2. Buka menu
3. Klik "+ Tambah Item"
4. Isi form
5. Klik "Simpan"
```

**READ:**

```
1. Klik menu card
2. Lihat semua items
```

**UPDATE:**

```
1. Hover pada item
2. Klik "Edit"
3. Ubah data
4. Klik "Simpan"
```

**DELETE:**

```
1. Hover pada item
2. Klik "Hapus"
3. Konfirmasi OK
```

---

## 📊 Visual Flow Diagram

```
┌─────────────────────┐
│   Buka Website      │
└──────────┬──────────┘
           │
           ▼
    ┌──────────────┐
    │ Guest Mode   │
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │ Klik Login   │
    └──────┬───────┘
           │
           ▼
    ┌──────────────────────────┐
    │  Input Credentials       │
    │  ┌────────┬────────┐    │
    │  │ Admin  │  User  │    │
    │  └────────┴────────┘    │
    └──────┬───────────────────┘
           │
           ▼
    ┌──────────────────────────┐
    │   Role Check             │
    │   ┌────────┬────────┐   │
    │   │ Admin  │  User  │   │
    │   │  CRUD  │  View  │   │
    │   └────────┴────────┘   │
    └──────────────────────────┘
```

---

## 🔑 Keyboard Shortcuts

```
ESC         = Close modal
F5          = Refresh page
F12         = Open DevTools
Ctrl+Shift+R = Hard refresh
Ctrl+0      = Reset zoom
```

---

## 💡 Pro Tips

### 1. Testing CRUD

```
✨ Tip: Gunakan data dummy untuk testing
📝 Example:
   - Judul: TEST_[number]
   - URL: https://google.com
   - Icon: 🧪
```

### 2. Debug Mode

```
✨ Tip: Buka Console (F12) untuk monitoring
📊 Check:
   - console.log(window.db)
   - console.log(window.auth)
   - console.log(window.crud)
```

### 3. Data Persistence

```
✨ Tip: Data tersimpan di localStorage
🔄 To reset:
   - localStorage.clear()
   - location.reload()
```

### 4. Quick Admin Access

```
✨ Tip: Bookmark admin login
🔖 Atau buat shortcut:
   javascript:auth.login('admin','admin123')
```

---

## ⚠️ Common Mistakes

### ❌ WRONG

```
Username: Admin (capital A)
Password: Admin123
```

**Error:** Username atau password salah!

### ✅ CORRECT

```
Username: admin (lowercase)
Password: admin123
```

---

### ❌ WRONG

```
Mencoba edit item sebagai User
```

**Result:** Tombol Edit tidak muncul

### ✅ CORRECT

```
Login sebagai Admin terlebih dahulu
```

---

### ❌ WRONG

```
Refresh saat form CRUD terbuka
```

**Result:** Data form hilang

### ✅ CORRECT

```
Simpan atau Batal sebelum refresh
```

---

## 📚 Menu Overview

### 1. Sekretariat

```
📋 10 items default
🎯 Topics: Surat, Undangan, Registrasi
```

### 2. Tata Laksana

```
📋 5 items default
🎯 Topics: Kependudukan, Layanan
```

### 3. Danarta

```
📋 3 items default
🎯 Topics: Keuangan, Anggaran
```

### 4. Pangripta

```
📋 4 items default
🎯 Topics: Pembangunan, Perencanaan
```

### 5. Jagabaya

```
📋 4 items default
🎯 Topics: Keamanan, Ketertiban
```

### 6. Ulu Ulu

```
📋 4 items default
🎯 Topics: Pemberdayaan Masyarakat
```

### 7. Kamituwa

```
📋 3 items default
🎯 Topics: Budaya, Kearifan Lokal
```

### 8. PPID

```
📋 4 items default
🎯 Topics: Informasi Publik
```

---

## 🎯 Success Criteria

Anda berhasil menggunakan sistem jika:

- [ ] ✅ Bisa login sebagai Admin
- [ ] ✅ Bisa login sebagai User
- [ ] ✅ Bisa tambah item baru
- [ ] ✅ Bisa edit item
- [ ] ✅ Bisa hapus item
- [ ] ✅ Bisa logout
- [ ] ✅ Data tersimpan setelah refresh
- [ ] ✅ Tombol CRUD hanya muncul untuk Admin

---

## 📞 Need Help?

### 1. Baca Dokumentasi

```
📖 README.md - Fitur lengkap
🧪 TESTING_GUIDE.md - Testing steps
🔧 TROUBLESHOOTING.md - Problem solving
📊 SUMMARY.md - Overview project
```

### 2. Check Console

```
F12 → Console tab
Lihat error messages
```

### 3. Reset Database

```javascript
localStorage.clear();
location.reload();
```

---

## 🎉 Congratulations!

Anda sekarang siap menggunakan Website Desa Wukirsari CRUD System!

**Happy Managing! 🚀**

---

**Quick Access:**

- 📖 [README.md](README.md) - Full Documentation
- 🧪 [TESTING_GUIDE.md](TESTING_GUIDE.md) - Testing Guide
- 🔧 [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Debug Guide
- 📊 [SUMMARY.md](SUMMARY.md) - Project Summary
