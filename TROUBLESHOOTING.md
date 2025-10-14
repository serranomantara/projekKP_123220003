# 🔧 Troubleshooting Guide - Website Desa Wukirsari

Panduan mengatasi masalah umum yang mungkin terjadi.

## 🚨 Common Issues & Solutions

### 1. Login Tidak Berfungsi

**Gejala:**

- Tombol Login diklik tidak ada respon
- Form login tidak muncul
- Error di console

**Solusi:**

1. **Periksa JavaScript Load**

   - Buka Console (F12)
   - Pastikan tidak ada error saat load
   - Periksa apakah file `auth.js`, `database.js`, `crud.js` ter-load

2. **Clear Cache**

   ```
   Ctrl + Shift + Delete → Clear Cache
   ```

3. **Periksa Kredensial**

   - Username: `admin` (lowercase)
   - Password: `admin123`
   - Atau Username: `user`, Password: `user123`

4. **Periksa Console Error**
   - Jika ada error: `auth is not defined`
   - Berarti file `auth.js` tidak ter-load
   - Cek path file di `<script src="auth.js">`

---

### 2. Data Tidak Tersimpan / Hilang

**Gejala:**

- Setelah tambah item, data hilang saat refresh
- Item yang diedit kembali ke data lama
- LocalStorage tidak menyimpan

**Solusi:**

1. **Periksa LocalStorage**

   ```javascript
   // Buka Console, ketik:
   localStorage.getItem("menu_sekretariat");
   ```

   - Jika null, database tidak terinisialisasi
   - Refresh halaman untuk trigger `initDatabase()`

2. **Disable Private/Incognito Mode**

   - LocalStorage tidak persistent di mode private
   - Gunakan normal browsing mode

3. **Check Browser Storage**

   - F12 → Application tab → Local Storage
   - Pastikan ada data dengan key `menu_*`

4. **Clear & Reinitialize**
   ```javascript
   // Di Console:
   localStorage.clear();
   location.reload();
   ```

---

### 3. CRUD Buttons Tidak Muncul

**Gejala:**

- Login sebagai Admin, tapi tidak ada tombol "+ Tambah Item"
- Tidak ada tombol Edit & Delete di item

**Solusi:**

1. **Periksa Role**

   ```javascript
   // Di Console:
   const user = JSON.parse(localStorage.getItem("currentUser"));
   console.log(user);
   ```

   - Pastikan `role: "admin"`
   - Jika role "user", logout dan login sebagai admin

2. **Periksa Class CSS**

   - Tombol CRUD menggunakan class `.admin-only`
   - Body harus punya class `.admin-logged-in`
   - Periksa di Elements tab (F12)

3. **Refresh Setelah Login**

   - Logout
   - Refresh halaman (F5)
   - Login kembali sebagai admin

4. **Periksa JavaScript**
   ```javascript
   // Di Console:
   console.log(window.crud);
   console.log(window.auth);
   ```
   - Jika undefined, file tidak ter-load

---

### 4. Modal Tidak Menutup

**Gejala:**

- Klik X atau di luar modal, tidak tertutup
- ESC tidak berfungsi
- Modal stuck terbuka

**Solusi:**

1. **Force Close dengan Console**

   ```javascript
   document.getElementById("modalOverlay").classList.remove("active");
   document.body.style.overflow = "auto";
   ```

2. **Periksa Event Listener**

   - Mungkin ada JavaScript error yang mencegah close
   - Check console untuk error

3. **Refresh Halaman**
   - Jika stuck, refresh (F5)
   - Modal akan tertutup

---

### 5. Notifikasi Tidak Muncul

**Gejala:**

- Login berhasil tapi tidak ada notifikasi
- CRUD berhasil tapi tidak ada feedback

**Solusi:**

1. **Periksa CSS**

   - Pastikan `style.css` ter-load
   - Class `.notification` harus ada

2. **Periksa Z-Index**

   - Notifikasi menggunakan `z-index: 10002`
   - Mungkin tertutup elemen lain

3. **Manual Trigger**
   ```javascript
   // Di Console:
   auth.showNotification("Test", "success");
   ```

---

### 6. Animasi Tidak Smooth

**Gejala:**

- Card loading animation patah-patah
- Modal animasi lag
- Hover effect tidak smooth

**Solusi:**

1. **Enable Hardware Acceleration**

   - Chrome: Settings → System → Use hardware acceleration

2. **Clear Cache**

   - Ctrl + Shift + Delete

3. **Update Browser**

   - Pastikan browser up-to-date

4. **Reduce Motion (Accessibility)**
   - Jika PC lambat, gunakan CSS:
   ```css
   * {
     transition: none !important;
     animation: none !important;
   }
   ```

---

### 7. Tanggal/Waktu Tidak Update

**Gejala:**

- Jam di top bar tidak bergerak
- Tanggal tidak real-time

**Solusi:**

1. **Periksa JavaScript**

   - Fungsi `updateDateTime()` harus running
   - Interval `setInterval` harus aktif

2. **Refresh Halaman**

   - F5 untuk restart interval

3. **Check Console Error**
   - Error di `updateDateTime()` akan stop function

---

### 8. Responsive Layout Broken

**Gejala:**

- Di mobile, layout berantakan
- Cards tidak stack
- Tombol keluar layar

**Solusi:**

1. **Hard Refresh**

   - Ctrl + Shift + R
   - Clear cache CSS

2. **Check Viewport Meta**

   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   ```

3. **Disable Browser Zoom**
   - Ctrl + 0 (reset zoom)

---

### 9. Image Tidak Muncul

**Gejala:**

- Logo desa tidak muncul
- Icon menu kosong
- 404 error di console

**Solusi:**

1. **Periksa Path**

   - Path harus: `asset/logo_DesaCantik.png`
   - Case-sensitive

2. **Periksa File Exist**

   - Pastikan file ada di folder `asset/`

3. **Check Console**
   - F12 → Network tab
   - Lihat file mana yang 404

---

### 10. Form Tidak Bisa Submit

**Gejala:**

- Klik "Simpan" tidak ada respon
- Form validation error
- Data tidak ter-save

**Solusi:**

1. **Periksa Required Fields**

   - Judul wajib diisi
   - Field lain opsional

2. **Check Console Error**

   ```javascript
   // Periksa apakah ada error:
   // "crud.handleSubmit is not a function"
   ```

3. **Periksa Event Handler**

   ```html
   <form onsubmit="crud.handleSubmit(event)"></form>
   ```

4. **Manual Submit**
   ```javascript
   // Di Console:
   const form = document.getElementById("crudForm");
   console.log(form);
   ```

---

## 🔍 Debug Tools

### 1. Check All Variables

```javascript
// Paste di Console:
console.log("Database:", window.db);
console.log("Auth:", window.auth);
console.log("CRUD:", window.crud);
console.log("Current User:", localStorage.getItem("currentUser"));
console.log("Menu Data:", localStorage.getItem("menu_sekretariat"));
```

### 2. Reset Database

```javascript
// Hapus semua data dan reload:
localStorage.clear();
location.reload();
```

### 3. Force Login as Admin

```javascript
// Emergency admin login:
const admin = {
  id: 1,
  username: "admin",
  password: "admin123",
  nama: "Admin",
  role: "admin",
};
localStorage.setItem("currentUser", JSON.stringify(admin));
location.reload();
```

### 4. Check CRUD Manager

```javascript
// Test CRUD operations:
console.log(crud.getCurrentMenuType());
crud.loadMenuItems("sekretariat");
```

### 5. View All LocalStorage Data

```javascript
// List all keys:
Object.keys(localStorage).forEach((key) => {
  console.log(key, localStorage.getItem(key));
});
```

---

## 📱 Browser Compatibility

### ✅ Fully Supported

- Chrome 90+
- Firefox 88+
- Edge 90+
- Safari 14+

### ⚠️ Limited Support

- IE 11 (tidak support localStorage modern features)
- Opera Mini (limited JavaScript)

### ❌ Not Supported

- IE 10 and below
- UC Browser (legacy)

---

## 🆘 Emergency Reset

Jika semua gagal, lakukan **FULL RESET**:

```javascript
// 1. Clear ALL data
localStorage.clear();
sessionStorage.clear();

// 2. Clear browser cache
// Ctrl + Shift + Delete → All Time

// 3. Hard refresh
// Ctrl + Shift + R

// 4. Reopen browser
// Close all tabs → Restart browser

// 5. Test di Incognito
// Ctrl + Shift + N (Chrome)
// Ctrl + Shift + P (Firefox)
```

---

## 📞 Support Contacts

Jika masih ada masalah:

1. **Check README.md**

   - Baca dokumentasi lengkap

2. **Check TESTING_GUIDE.md**

   - Ikuti testing steps

3. **Screenshot Error**

   - F12 → Console tab
   - Screenshot error message
   - Screenshot Network tab (jika file 404)

4. **Contact Developer**
   - Email: [developer email]
   - Include:
     - Browser name & version
     - Device (desktop/mobile)
     - Screenshot error
     - Steps to reproduce

---

## ✅ Preventive Maintenance

### Daily Checks

- [ ] Buka Console, pastikan no error
- [ ] Test login/logout
- [ ] Check localStorage size (max 5-10MB)

### Weekly Checks

- [ ] Clear old data
- [ ] Test di multiple browsers
- [ ] Check responsive layout

### Monthly Checks

- [ ] Full backup localStorage data
- [ ] Update browser
- [ ] Test all CRUD operations

---

**Last Updated:** [Date]  
**Version:** 1.0
