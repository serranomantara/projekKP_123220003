# 🧪 Panduan Testing - Website Desa Wukirsari CRUD System

Panduan lengkap untuk menguji semua fitur website.

## 📋 Checklist Testing

### ✅ 1. Loading & Initial Setup

**Test Steps:**

1. Buka `index.html` di browser
2. Tunggu loading screen selesai
3. Periksa apakah semua kartu menu muncul (8 kartu)

**Expected Result:**

- Loading animation berjalan smooth
- 8 menu cards terlihat dengan animasi fade-in
- Top bar menampilkan tanggal/waktu real-time
- User status menampilkan "Guest" dengan dot oranye
- Tombol "Login" terlihat di pojok kanan atas

**Pass/Fail:** ****\_\_\_****

---

### ✅ 2. Database Initialization

**Test Steps:**

1. Buka Browser Console (F12 → Console tab)
2. Ketik: `localStorage.getItem('menu_sekretariat')`
3. Periksa apakah ada data JSON

**Expected Result:**

- Data JSON muncul di console
- Berisi array dengan dummy data items
- Setiap item memiliki: id, title, description, url, icon, created_by, created_at

**Pass/Fail:** ****\_\_\_****

---

### ✅ 3. Login Functionality - Admin

**Test Steps:**

1. Klik tombol "Login" di pojok kanan atas
2. Modal login muncul
3. Masukkan:
   - Username: `admin`
   - Password: `admin123`
4. Klik "Login"

**Expected Result:**

- Modal login muncul dengan animasi smooth
- Form bisa diisi
- Setelah login berhasil:
  - Modal tertutup otomatis
  - Notifikasi hijau muncul: "Selamat datang, Admin!"
  - User status berubah menjadi "Admin" dengan dot hijau
  - Tombol "Login" berubah menjadi nama "Admin" dengan icon user
  - Badge "ADMIN" merah muncul

**Pass/Fail:** ****\_\_\_****

---

### ✅ 4. Login Functionality - User

**Test Steps:**

1. Logout terlebih dahulu (klik "Admin" → Logout)
2. Login kembali dengan:
   - Username: `user`
   - Password: `user123`

**Expected Result:**

- Login berhasil
- Notifikasi: "Selamat datang, User!"
- Status: "User" dengan dot hijau
- Badge "USER" biru muncul
- Tidak ada tombol "Tambah Item" di modal (user tidak bisa CRUD)

**Pass/Fail:** ****\_\_\_****

---

### ✅ 5. Login Error Handling

**Test Steps:**

1. Logout
2. Coba login dengan credentials salah:
   - Username: `wrong`
   - Password: `wrong123`

**Expected Result:**

- Login gagal
- Notifikasi merah muncul: "Username atau password salah!"
- Modal login tetap terbuka
- Form tidak di-reset

**Pass/Fail:** ****\_\_\_****

---

### ✅ 6. View Menu Items (Guest/User)

**Test Steps:**

1. Logout (sebagai Guest) atau Login sebagai User
2. Klik kartu "Sekretariat"
3. Modal terbuka menampilkan daftar item

**Expected Result:**

- Modal terbuka dengan animasi
- Judul: "SEKRETARIAT"
- Deskripsi muncul
- Daftar item muncul dengan data dummy
- Item dengan link bisa diklik (buka di tab baru)
- Tidak ada tombol Edit/Delete (karena bukan admin)
- Tombol "Tambah Item" tidak muncul

**Pass/Fail:** ****\_\_\_****

---

### ✅ 7. CRUD - Create (Admin Only)

**Test Steps:**

1. Login sebagai Admin
2. Buka menu "Sekretariat"
3. Klik tombol "+ Tambah Item"
4. Isi form:
   - Judul: "Test Item Baru"
   - Deskripsi: "Ini adalah test item"
   - URL: "https://google.com"
   - Icon: "📄"
5. Klik "Simpan"

**Expected Result:**

- Form CRUD muncul dengan animasi
- Semua field bisa diisi
- Setelah "Simpan":
  - Form tertutup
  - Notifikasi hijau: "Item berhasil ditambahkan!"
  - Item baru muncul di list paling bawah
  - Item bisa diklik (buka URL)
  - Tombol Edit & Delete muncul di item baru

**Pass/Fail:** ****\_\_\_****

---

### ✅ 8. CRUD - Read (View Items)

**Test Steps:**

1. Masih sebagai Admin
2. Buka setiap menu satu per satu:
   - Sekretariat
   - Tata Laksana
   - Danarta
   - Pangripta
   - Jagabaya
   - Ulu Ulu
   - Kamituwa
   - PPID

**Expected Result:**

- Setiap menu menampilkan data dummy
- Data konsisten dengan database
- Tombol "Tambah Item" muncul di semua menu
- Item dengan URL bisa diklik
- Hover pada item menampilkan tombol Edit & Delete

**Pass/Fail:** ****\_\_\_****

---

### ✅ 9. CRUD - Update (Admin Only)

**Test Steps:**

1. Login sebagai Admin
2. Buka menu "Sekretariat"
3. Hover pada "Test Item Baru" (item yang tadi dibuat)
4. Klik tombol "Edit" (biru)
5. Ubah:
   - Judul: "Test Item Edited"
   - Deskripsi: "Deskripsi sudah diubah"
6. Klik "Simpan"

**Expected Result:**

- Form CRUD muncul dengan data terisi
- Judul form: "Edit Item"
- Setelah "Simpan":
  - Form tertutup
  - Notifikasi hijau: "Item berhasil diupdate!"
  - Item di list ter-update dengan data baru
  - Perubahan tersimpan di localStorage

**Pass/Fail:** ****\_\_\_****

---

### ✅ 10. CRUD - Delete (Admin Only)

**Test Steps:**

1. Masih sebagai Admin
2. Buka menu "Sekretariat"
3. Hover pada "Test Item Edited"
4. Klik tombol "Hapus" (merah)
5. Konfirmasi penghapusan (OK di dialog confirm)

**Expected Result:**

- Dialog konfirmasi muncul: "Yakin ingin menghapus item ini?"
- Setelah OK:
  - Item hilang dari list
  - Notifikasi hijau: "Item berhasil dihapus!"
  - Data terhapus dari localStorage
  - Jumlah item berkurang 1

**Pass/Fail:** ****\_\_\_****

---

### ✅ 11. Role-Based Access Control

**Test Steps:**

1. Login sebagai Admin → Buka menu → Periksa tombol CRUD
2. Logout
3. Login sebagai User → Buka menu → Periksa tombol CRUD
4. Logout
5. Sebagai Guest → Buka menu → Periksa tombol CRUD

**Expected Result:**

- **Admin**: Tombol "+ Tambah Item" muncul, tombol Edit & Delete muncul
- **User**: Tidak ada tombol CRUD sama sekali
- **Guest**: Tidak ada tombol CRUD sama sekali

**Pass/Fail:** ****\_\_\_****

---

### ✅ 12. User Menu & Logout

**Test Steps:**

1. Login sebagai Admin
2. Klik nama "Admin" di pojok kanan atas
3. User menu dropdown muncul
4. Klik tombol "Logout"

**Expected Result:**

- User menu muncul dengan animasi dropdown
- Menampilkan:
  - Nama: "Admin"
  - Username: "admin"
  - Badge: "ADMIN" (merah)
  - Tombol "Logout"
- Setelah logout:
  - Menu tertutup
  - Notifikasi: "Anda telah logout"
  - Status kembali ke "Guest"
  - Tombol kembali ke "Login"
  - Semua tombol CRUD hilang

**Pass/Fail:** ****\_\_\_****

---

### ✅ 13. Data Persistence

**Test Steps:**

1. Login sebagai Admin
2. Tambah 1 item di menu "Danarta"
3. Refresh halaman (F5)
4. Buka menu "Danarta" lagi

**Expected Result:**

- Setelah refresh, status login hilang (kembali Guest)
- Data item yang ditambahkan TETAP ADA
- Item tersimpan di localStorage
- Setelah login lagi sebagai Admin, bisa edit/delete item tersebut

**Pass/Fail:** ****\_\_\_****

---

### ✅ 14. Close Modal & Overlay

**Test Steps:**

1. Buka menu "Sekretariat"
2. Coba close dengan 3 cara:
   - Klik tombol X
   - Klik di luar modal (overlay)
   - Tekan tombol ESC
3. Buka form CRUD (+ Tambah Item)
4. Coba close dengan:
   - Klik "Batal"
   - Klik di luar form

**Expected Result:**

- Semua cara menutup modal berfungsi
- Modal tertutup dengan animasi smooth
- Body scroll kembali normal
- Form ter-reset setelah ditutup

**Pass/Fail:** ****\_\_\_****

---

### ✅ 15. Notification System

**Test Steps:**

1. Trigger berbagai notifikasi:
   - Login berhasil (success - hijau)
   - Login gagal (error - merah)
   - Tambah item (success - hijau)
   - Edit item (success - hijau)
   - Hapus item (success - hijau)
   - Logout (info - biru)

**Expected Result:**

- Notifikasi muncul di pojok kanan atas
- Animasi slide dari kanan
- Auto-dismiss setelah 3 detik
- Warna sesuai tipe (success/error/info)
- Icon check (✓) untuk success, X (✕) untuk error

**Pass/Fail:** ****\_\_\_****

---

### ✅ 16. Responsive Design - Mobile

**Test Steps:**

1. Buka Developer Tools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Pilih device: iPhone 12 Pro
4. Test semua fitur

**Expected Result:**

- Layout responsive
- Menu cards stack 1 kolom
- Login modal fit di layar
- Tombol masih clickable
- Font size readable
- Notifikasi tidak keluar layar

**Pass/Fail:** ****\_\_\_****

---

### ✅ 17. Browser Console - No Errors

**Test Steps:**

1. Buka Console (F12)
2. Lakukan semua operasi (login, CRUD, logout)
3. Periksa apakah ada error

**Expected Result:**

- Tidak ada error merah di console
- Hanya log info jika ada
- Semua JavaScript load tanpa error
- Tidak ada 404 untuk file

**Pass/Fail:** ****\_\_\_****

---

### ✅ 18. Cross-Browser Testing

**Test Steps:**

1. Test di Chrome
2. Test di Firefox
3. Test di Edge

**Expected Result:**

- Semua fitur berfungsi di semua browser
- Layout konsisten
- Animasi smooth
- LocalStorage berfungsi

**Pass/Fail:** ****\_\_\_****

---

## 🐛 Bug Report Template

Jika menemukan bug, gunakan template ini:

```
**Bug Title:** [Judul singkat]

**Severity:** Critical / High / Medium / Low

**Steps to Reproduce:**
1.
2.
3.

**Expected Result:**


**Actual Result:**


**Browser:** Chrome / Firefox / Edge
**Device:** Desktop / Mobile
**Screenshot:** [Attach if available]
```

---

## 📊 Test Summary

**Total Tests:** 18  
**Passed:** **\_**  
**Failed:** **\_**  
**Pass Rate:** **\_**%

**Tested By:** ********\_********  
**Date:** ********\_********  
**Browser:** ********\_********  
**Device:** ********\_********

---

## ✅ Final Checklist

- [ ] All 18 tests passed
- [ ] No console errors
- [ ] Responsive on mobile
- [ ] Cross-browser compatible
- [ ] Data persists after refresh
- [ ] CRUD operations work correctly
- [ ] Role-based access control working
- [ ] Login/Logout functioning
- [ ] Notifications display correctly
- [ ] All 8 menus have dummy data

**Status:** ✅ Ready for Production / ⚠️ Needs Fixes / ❌ Not Ready

---

**Notes:**
