// Database Management System menggunakan localStorage
// 
// Default Users (Demo Credentials):
// 1. Admin Account:
//    - Username: admin
//    - Password: admin123
//    - Role: admin
//    - Access: Full CRUD operations
//
// 2. User Account:
//    - Username: user
//    - Password: user123
//    - Role: user
//    - Access: Read-only
//
class Database {
    constructor() {
        this.initDatabase();
    }

    // Inisialisasi database dengan data dummy
    initDatabase() {
        // Users
        if (!localStorage.getItem('users')) {
            const defaultUsers = [
                {
                    id: 1,
                    username: 'admin',
                    password: 'admin123',
                    role: 'admin',
                    nama: 'Administrator Desa',
                    email: 'admin@wukirsari.desa.id',
                    created_at: new Date().toISOString()
                },
                {
                    id: 2,
                    username: 'user',
                    password: 'user123',
                    role: 'user',
                    nama: 'Petugas Desa',
                    email: 'user@wukirsari.desa.id',
                    created_at: new Date().toISOString()
                }
            ];
            localStorage.setItem('users', JSON.stringify(defaultUsers));
        }

        // Menu Content - Sekretariat
        if (!localStorage.getItem('menu_sekretariat')) {
            const sekretariatData = [
                {
                    id: 1,
                    title: 'Surat Masuk',
                    description: 'Pengelolaan surat masuk dari masyarakat dan instansi',
                    url: 'pages/sekretariat/surat-masuk.html',
                    icon: '📨',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 2,
                    title: 'Surat Keluar',
                    description: 'Pengelolaan surat keluar untuk masyarakat dan instansi',
                    url: 'pages/sekretariat/surat-keluar.html',
                    icon: '📤',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 3,
                    title: 'Undangan Masuk',
                    description: 'Daftar undangan yang diterima oleh desa',
                    url: 'pages/sekretariat/undangan-masuk.html',
                    icon: '📬',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 4,
                    title: 'Undangan Keluar',
                    description: 'Undangan yang dikeluarkan oleh pemerintah desa',
                    url: 'pages/sekretariat/undangan-keluar.html',
                    icon: '📮',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 5,
                    title: 'Registrasi Peraturan Kalurahan',
                    description: 'Database peraturan dan regulasi desa',
                    url: 'pages/sekretariat/registrasi-peraturan.html',
                    icon: '📋',
                    created_by: 1,
                    created_at: new Date().toISOString()
                }
            ];
            localStorage.setItem('menu_sekretariat', JSON.stringify(sekretariatData));
        }

        // Menu Content - Tata Laksana
        if (!localStorage.getItem('menu_tatalaksana')) {
            const tatalaksanaData = [
                {
                    id: 1,
                    title: 'Profil Kependudukan Bulanan',
                    description: 'Data statistik kependudukan per bulan',
                    url: 'pages/tatalaksana/profil-kependudukan.html',
                    icon: '📊',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 2,
                    title: 'Jumlah Layanan',
                    description: 'Total layanan administrasi yang diberikan',
                    url: 'pages/tatalaksana/jumlah-layanan.html',
                    icon: '🔢',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 3,
                    title: 'Analisis Data Kependudukan',
                    description: 'Analisis mendalam data kependudukan desa',
                    url: 'pages/tatalaksana/analisis-data.html',
                    icon: '📈',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 4,
                    title: 'Penggunaan Ruangan',
                    description: 'Jadwal dan statistik penggunaan ruangan kantor desa',
                    url: 'pages/tatalaksana/penggunaan-ruangan.html',
                    icon: '🏢',
                    created_by: 1,
                    created_at: new Date().toISOString()
                }
            ];
            localStorage.setItem('menu_tatalaksana', JSON.stringify(tatalaksanaData));
        }

        // Menu Content - Danarta
        if (!localStorage.getItem('menu_danarta')) {
            const danartaData = [
                {
                    id: 1,
                    title: 'Registrasi Pencarian SPP',
                    description: 'Sistem pencarian dan registrasi SPP',
                    url: 'pages/danarta/registrasi-spp.html',
                    icon: '🔍',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 2,
                    title: 'Dana Bantuan Sosial',
                    description: 'Informasi bantuan sosial untuk masyarakat',
                    url: 'pages/danarta/dana-bantuan.html',
                    icon: '💰',
                    created_by: 1,
                    created_at: new Date().toISOString()
                }
            ];
            localStorage.setItem('menu_danarta', JSON.stringify(danartaData));
        }

        // Menu Content - Pangripta
        if (!localStorage.getItem('menu_pangripta')) {
            const pangriptaData = [
                {
                    id: 1,
                    title: 'RPJM Desa',
                    description: 'Rencana Pembangunan Jangka Menengah Desa',
                    url: 'pages/pangripta/rpjm-desa.html',
                    icon: '📝',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 2,
                    title: 'Profil Kelurahan',
                    description: 'Profil lengkap Kalurahan Wukirsari',
                    url: 'pages/pangripta/profil-kelurahan.html',
                    icon: '🏘️',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 3,
                    title: 'Publikasi Potensi Kalurahan',
                    description: 'Dokumentasi potensi dan keunggulan desa',
                    url: 'pages/pangripta/publikasi-potensi.html',
                    icon: '📚',
                    created_by: 1,
                    created_at: new Date().toISOString()
                }
            ];
            localStorage.setItem('menu_pangripta', JSON.stringify(pangriptaData));
        }

        // Menu Content - Jagabaya
        if (!localStorage.getItem('menu_jagabaya')) {
            const jagabayaData = [
                {
                    id: 1,
                    title: 'Keamanan Lingkungan',
                    description: 'Program keamanan dan ketertiban lingkungan',
                    url: 'pages/jagabaya/keamanan-lingkungan.html',
                    icon: '🛡️',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 2,
                    title: 'Siskamling',
                    description: 'Sistem keamanan lingkungan masyarakat',
                    url: 'pages/jagabaya/siskamling.html',
                    icon: '👮',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 3,
                    title: 'Laporan Kejadian',
                    description: 'Pencatatan dan pelaporan kejadian di desa',
                    url: 'pages/jagabaya/laporan-kejadian.html',
                    icon: '📋',
                    created_by: 1,
                    created_at: new Date().toISOString()
                }
            ];
            localStorage.setItem('menu_jagabaya', JSON.stringify(jagabayaData));
        }

        // Menu Content - Ulu Ulu
        if (!localStorage.getItem('menu_uluulu')) {
            const uluuluData = [
                {
                    id: 1,
                    title: 'Program Pembangunan Infrastruktur',
                    description: 'Proyek pembangunan infrastruktur desa',
                    url: 'pages/uluulu/program-infrastruktur.html',
                    icon: '🏗️',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 2,
                    title: 'Pemberdayaan Masyarakat',
                    description: 'Program pemberdayaan ekonomi masyarakat',
                    url: 'pages/uluulu/pemberdayaan-masyarakat.html',
                    icon: '👥',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 3,
                    title: 'Pelatihan dan Workshop',
                    description: 'Kegiatan pelatihan untuk meningkatkan skill warga',
                    url: 'pages/uluulu/pelatihan-workshop.html',
                    icon: '🎓',
                    created_by: 1,
                    created_at: new Date().toISOString()
                }
            ];
            localStorage.setItem('menu_uluulu', JSON.stringify(uluuluData));
        }

        // Menu Content - Kamituwa
        if (!localStorage.getItem('menu_kamituwa')) {
            const kamituwaData = [
                {
                    id: 1,
                    title: 'Profil Kebudayaan',
                    description: 'Dokumentasi budaya dan tradisi desa',
                    url: 'pages/kamituwa/profil-kebudayaan.html',
                    icon: '🎭',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 2,
                    title: 'Daftar Kegiatan Budaya',
                    description: 'Jadwal dan dokumentasi kegiatan budaya',
                    url: 'pages/kamituwa/kegiatan-budaya.html',
                    icon: '📅',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 3,
                    title: 'Bantuan Sosial',
                    description: 'Informasi dan pendaftaran bantuan sosial',
                    url: 'pages/kamituwa/bantuan-sosial.html',
                    icon: '🤝',
                    created_by: 1,
                    created_at: new Date().toISOString()
                }
            ];
            localStorage.setItem('menu_kamituwa', JSON.stringify(kamituwaData));
        }

        // Menu Content - PPID
        if (!localStorage.getItem('menu_ppid')) {
            const ppidData = [
                {
                    id: 1,
                    title: 'Alamat Kantor',
                    description: 'Jl. Raya Wukirsari No. 123, Bantul, DIY',
                    url: 'https://maps.app.goo.gl/U6667dGAosFB7qJT9',
                    icon: '📍',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 2,
                    title: 'Nomor Telepon',
                    description: '(0274) 123456',
                    url: 'https://maps.app.goo.gl/U6667dGAosFB7qJT9',
                    icon: '📞',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 3,
                    title: 'Email Resmi',
                    description: 'info@wukirsari.desa.id',
                    url: 'https://maps.app.goo.gl/U6667dGAosFB7qJT9',
                    icon: '✉️',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 4,
                    title: 'Media Sosial',
                    description: '@desawukirsari di Instagram dan Facebook',
                    url: 'https://maps.app.goo.gl/U6667dGAosFB7qJT9',
                    icon: '📱',
                    created_by: 1,
                    created_at: new Date().toISOString()
                }
            ];
            localStorage.setItem('menu_ppid', JSON.stringify(ppidData));
        }
    }

    // CRUD Operations untuk Menu Items
    getMenuItems(menuType) {
        const data = localStorage.getItem(`menu_${menuType}`);
        return data ? JSON.parse(data) : [];
    }

    addMenuItem(menuType, item) {
        const items = this.getMenuItems(menuType);
        const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
        
        const newItem = {
            ...item,
            id: newId,
            created_at: new Date().toISOString()
        };
        
        items.push(newItem);
        localStorage.setItem(`menu_${menuType}`, JSON.stringify(items));
        return newItem;
    }

    updateMenuItem(menuType, id, updates) {
        const items = this.getMenuItems(menuType);
        const index = items.findIndex(item => item.id === id);
        
        if (index !== -1) {
            items[index] = {
                ...items[index],
                ...updates,
                updated_at: new Date().toISOString()
            };
            localStorage.setItem(`menu_${menuType}`, JSON.stringify(items));
            return items[index];
        }
        return null;
    }

    deleteMenuItem(menuType, id) {
        const items = this.getMenuItems(menuType);
        const filtered = items.filter(item => item.id !== id);
        localStorage.setItem(`menu_${menuType}`, JSON.stringify(filtered));
        return true;
    }

    // User Management
    getUsers() {
        const data = localStorage.getItem('users');
        return data ? JSON.parse(data) : [];
    }

    getUserById(id) {
        const users = this.getUsers();
        return users.find(user => user.id === id);
    }

    authenticateUser(username, password) {
        const users = this.getUsers();
        console.log('Users in database:', users);
        console.log('Trying to authenticate:', { username, password });
        
        const user = users.find(user => 
            user.username === username && user.password === password
        );
        
        console.log('Found user:', user);
        return user;
    }

    // Session Management
    setCurrentUser(user) {
        const userSession = {
            id: user.id,
            username: user.username,
            role: user.role,
            nama: user.nama,
            email: user.email,
            loginTime: new Date().toISOString()
        };
        localStorage.setItem('currentUser', JSON.stringify(userSession));
    }

    getCurrentUser() {
        const data = localStorage.getItem('currentUser');
        return data ? JSON.parse(data) : null;
    }

    logout() {
        localStorage.removeItem('currentUser');
    }

    // Reset database to default
    resetDatabase() {
        const keys = [
            'users', 
            'menu_sekretariat', 
            'menu_tatalaksana', 
            'menu_danarta',
            'menu_pangripta', 
            'menu_jagabaya', 
            'menu_uluulu',
            'menu_kamituwa', 
            'menu_ppid',
            'currentUser'
        ];
        keys.forEach(key => localStorage.removeItem(key));
        this.initDatabase();
    }
}

// Inisialisasi database
const db = new Database();

// Make database available globally
window.db = db;

console.log('Database initialized with', Object.keys(localStorage).filter(k => k.startsWith('menu_')).length, 'menu collections');
