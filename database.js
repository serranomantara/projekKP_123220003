// Database Management System menggunakan localStorage
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
                    url: 'https://docs.google.com/spreadsheets/d/1fgwTnO3BAc7NJZTLFUJb_rXPXZRZVTTYDv2-WA3r_K4/edit?gid=0#gid=0',
                    icon: '📨',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 2,
                    title: 'Surat Keluar',
                    description: 'Pengelolaan surat keluar untuk masyarakat dan instansi',
                    url: 'https://docs.google.com/spreadsheets/d/1PyEK15hUXySAfg71lEdTLbX4X5UvHRTOkXIQv-jGl9Y/edit?gid=0#gid=0',
                    icon: '📤',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 3,
                    title: 'Undangan Masuk',
                    description: 'Daftar undangan yang diterima oleh desa',
                    url: 'https://docs.google.com/spreadsheets/d/1aEtD4f3aWmnArxQBlhTpR0NYYxrvkxw2rDhaX8uy2kc/edit?gid=0#gid=0',
                    icon: '📬',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 4,
                    title: 'Undangan Keluar',
                    description: 'Undangan yang dikeluarkan oleh pemerintah desa',
                    url: 'https://docs.google.com/spreadsheets/d/1_l4veMaYIGuPvOvHMIKW8QPeI8cjqS2PwsRJ_-7VpBI/edit?gid=0#gid=0',
                    icon: '📮',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 5,
                    title: 'Registrasi Peraturan Kalurahan',
                    description: 'Database peraturan dan regulasi desa',
                    url: 'https://docs.google.com/spreadsheets/d/1pxaKMXOtvwTjAdqV3Y9_AuXcF095KBzXrhhAwX_VU4k/edit?gid=0#gid=0',
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
                    url: '',
                    icon: '📊',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 2,
                    title: 'Jumlah Layanan',
                    description: 'Total layanan administrasi yang diberikan',
                    url: '',
                    icon: '🔢',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 3,
                    title: 'Analisis Data Kependudukan',
                    description: 'Analisis mendalam data kependudukan desa',
                    url: 'https://drive.google.com/file/d/1r66qRwn5jHppVvJcLZaeKnV--YOoJit6/view',
                    icon: '📈',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 4,
                    title: 'Penggunaan Ruangan',
                    description: 'Jadwal dan statistik penggunaan ruangan kantor desa',
                    url: 'https://docs.google.com/spreadsheets/d/16wlgmE-P1wMRsHhqG2aFGKNcC6VB_CRV1kzpxxYsJCw/edit?gid=0#gid=0',
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
                    url: '',
                    icon: '🔍',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 2,
                    title: 'Dana Bantuan Sosial',
                    description: 'Informasi bantuan sosial untuk masyarakat',
                    url: '',
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
                    url: '',
                    icon: '📝',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 2,
                    title: 'Profil Kelurahan',
                    description: 'Profil lengkap Kalurahan Wukirsari',
                    url: '',
                    icon: '🏘️',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 3,
                    title: 'Publikasi Potensi Kalurahan',
                    description: 'Dokumentasi potensi dan keunggulan desa',
                    url: 'https://drive.google.com/file/d/1zKQln1sTnIlplpRSos88Zb1K-0LPRG5S/view',
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
                    url: '',
                    icon: '🛡️',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 2,
                    title: 'Siskamling',
                    description: 'Sistem keamanan lingkungan masyarakat',
                    url: '',
                    icon: '👮',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 3,
                    title: 'Laporan Kejadian',
                    description: 'Pencatatan dan pelaporan kejadian di desa',
                    url: '',
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
                    url: '',
                    icon: '🏗️',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 2,
                    title: 'Pemberdayaan Masyarakat',
                    description: 'Program pemberdayaan ekonomi masyarakat',
                    url: '',
                    icon: '👥',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 3,
                    title: 'Pelatihan dan Workshop',
                    description: 'Kegiatan pelatihan untuk meningkatkan skill warga',
                    url: '',
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
                    url: '',
                    icon: '🎭',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 2,
                    title: 'Daftar Kegiatan Budaya',
                    description: 'Jadwal dan dokumentasi kegiatan budaya',
                    url: '',
                    icon: '📅',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 3,
                    title: 'Bantuan Sosial',
                    description: 'Informasi dan pendaftaran bantuan sosial',
                    url: '',
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
                    url: '',
                    icon: '📍',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 2,
                    title: 'Nomor Telepon',
                    description: '(0274) 123456',
                    url: '',
                    icon: '📞',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 3,
                    title: 'Email Resmi',
                    description: 'info@wukirsari.desa.id',
                    url: '',
                    icon: '✉️',
                    created_by: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 4,
                    title: 'Media Sosial',
                    description: '@desawukirsari di Instagram dan Facebook',
                    url: '',
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
        return users.find(user => 
            user.username === username && user.password === password
        );
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
