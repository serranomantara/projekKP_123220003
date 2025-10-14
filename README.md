# Website Desa Wukirsari - CRUD System

Portal informasi resmi Desa Wukirsari dengan sistem CRUD lengkap dan manajemen pengguna berbasis role (Admin & User).

## 🚀 Fitur Utama

### 1. **Sistem Autentikasi**

- Login dengan role Admin dan User
- Logout functionality
- Status pengguna real-time
- Role-based access control

### 2. **Database Dummy (LocalStorage)**

- Menggunakan browser localStorage sebagai database
- Data persisten di browser
- Auto-initialize dengan data dummy

### 3. **CRUD Operations (Admin Only)**

- **Create**: Tambah item menu baru
- **Read**: Tampilkan semua item menu
- **Update**: Edit item menu yang ada
- **Delete**: Hapus item menu

### 4. **8 Menu Kategori**

1. **Sekretariat** - Administrasi dan pelayanan
2. **Tata Laksana** - Prosedur dan tata cara
3. **Danarta** - Keuangan dan anggaran
4. **Pangripta** - Pembangunan dan perencanaan
5. **Jagabaya** - Keamanan dan ketertiban
6. **Ulu Ulu** - Pemberdayaan masyarakat
7. **Kamituwa** - Budaya dan kearifan lokal
8. **PPID** - Informasi publik dan dokumentasi

## 👥 Kredensial Login

### Admin

- **Username**: `admin`
- **Password**: `admin123`
- **Hak Akses**:
  - Menambah item menu
  - Mengedit item menu
  - Menghapus item menu
  - Melihat semua konten

### User

- **Username**: `user`
- **Password**: `user123`
- **Hak Akses**:
  - Melihat semua konten
  - Tidak bisa edit/tambah/hapus

## 📁 Struktur File

```
projek_rev/
│
├── index.html          # Halaman utama
├── style.css           # Styling lengkap (termasuk login & CRUD)
├── database.js         # Database management & dummy data
├── auth.js             # Authentication system
├── crud.js             # CRUD operations manager
├── README.md           # Dokumentasi
│
└── asset/              # Folder gambar
    ├── logo_DesaCantik.png
    ├── logo_PemkalWukirsari.png
    ├── sekretariat.png
    ├── tata laksana.png
    ├── danarta.png
    ├── pangripta.png
    ├── jagabaya.png
    ├── ulu ulu.png
    ├── kamituwa.png
    └── ppid.png
```

## 🛠️ Cara Penggunaan

### 1. Buka Website

Buka file `index.html` di browser (Chrome, Firefox, Edge, dll.)

### 2. Login

1. Klik tombol **"Login"** di pojok kanan atas
2. Masukkan username dan password (lihat kredensial di atas)
3. Klik **"Masuk"**
4. Status akan berubah menampilkan nama dan role Anda

### 3. Lihat Menu

1. Klik salah satu dari 8 kartu menu
2. Modal akan terbuka menampilkan daftar item
3. Setiap item bisa diklik untuk membuka link (jika ada)

### 4. CRUD Operations (Admin Only)

#### Tambah Item Baru

1. Login sebagai Admin
2. Buka salah satu menu
3. Klik tombol **"+ Tambah Item"**
4. Isi form:
   - **Judul**: Nama item
   - **Deskripsi**: Penjelasan item
   - **URL**: Link tujuan (opsional)
   - **Icon**: Emoji atau simbol (opsional)
5. Klik **"Simpan"**

#### Edit Item

1. Hover pada item menu
2. Klik tombol **"Edit"** berwarna biru
3. Ubah data yang diinginkan
4. Klik **"Simpan"**

#### Hapus Item

1. Hover pada item menu
2. Klik tombol **"Hapus"** berwarna merah
3. Konfirmasi penghapusan
4. Item akan terhapus

### 5. Logout

1. Klik username Anda di pojok kanan atas
2. Klik tombol **"Logout"**
3. Status kembali ke Guest

## 💾 Data Dummy

Setiap menu kategori sudah memiliki data dummy:

### Sekretariat

- Surat Masuk
- Surat Keluar
- Undangan Masuk
- Undangan Keluar
- Registrasi Peraturan Kalurahan
- Dan lainnya...

### Tata Laksana

- Profil Kependudukan
- Data Layanan
- Analisis Kependudukan
- Penggunaan Ruangan

### (Menu lainnya juga memiliki data dummy masing-masing)

## 🔧 Teknologi yang Digunakan

- **HTML5**: Struktur halaman
- **CSS3**: Styling dan animasi
- **JavaScript (Vanilla)**: Logika aplikasi
- **LocalStorage**: Database browser

## 📱 Responsive Design

Website ini fully responsive dan dapat diakses dengan baik di:

- 💻 Desktop
- 📱 Tablet
- 📱 Mobile

## 🎨 Fitur UI/UX

1. **Animasi Smooth**

   - Fade in cards
   - Modal slide animations
   - Hover effects
   - Loading screen

2. **Notifikasi**

   - Success notifications (hijau)
   - Error notifications (merah)
   - Auto-dismiss after 3 seconds

3. **User Feedback**

   - Real-time status indicator
   - Role badge (Admin/User)
   - Visual confirmation untuk setiap aksi

4. **Modern Design**
   - Gradient backgrounds
   - Glassmorphism effects
   - Box shadows
   - Smooth transitions

## 🔒 Keamanan

- Password validation
- Role-based access control
- Session management
- Input sanitization
- XSS protection

## 🐛 Troubleshooting

### Login tidak berfungsi

- Pastikan JavaScript enabled di browser
- Clear browser cache
- Gunakan kredensial yang benar

### Data tidak tersimpan

- Pastikan browser mendukung localStorage
- Jangan gunakan mode Private/Incognito
- Check browser console untuk error

### CRUD tidak muncul

- Login sebagai Admin (bukan User)
- Refresh halaman setelah login
- Check console untuk JavaScript errors

## 📝 Catatan Penting

1. **Data Persistence**: Data tersimpan di localStorage browser. Jika cache dibersihkan, data akan hilang dan kembali ke data dummy.

2. **Database Dummy**: Ini adalah simulasi database. Untuk production, gunakan database server seperti MySQL, PostgreSQL, atau MongoDB.

3. **Security**: Untuk production, password harus di-hash dan disimpan di server, bukan di localStorage.

4. **Browser Compatibility**: Tested di Chrome, Firefox, Edge, Safari.

## 🚀 Pengembangan Selanjutnya

Untuk implementasi production, pertimbangkan:

1. **Backend Server**

   - Node.js + Express
   - PHP + Laravel
   - Python + Django

2. **Database Real**

   - MySQL
   - PostgreSQL
   - MongoDB

3. **API Integration**

   - RESTful API
   - GraphQL
   - WebSocket untuk real-time updates

4. **Security Enhancement**

   - JWT tokens
   - Password hashing (bcrypt)
   - HTTPS
   - CSRF protection
   - Rate limiting

5. **Additional Features**
   - File upload
   - Image management
   - Search & filter
   - Pagination
   - Export data (PDF, Excel)
   - User management (register, forgot password)

## 📞 Support

Untuk pertanyaan atau bantuan, silakan hubungi:

- Email: [email desa]
- Telp: [nomor telepon]

## 📄 Lisensi

© 2024 Desa Wukirsari. All rights reserved.

---

**Developed with ❤️ for Desa Wukirsari**
