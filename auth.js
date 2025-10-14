// Authentication & Authorization System
class AuthSystem {
    constructor() {
        this.checkLoginStatus();
    }

    // Cek status login saat halaman dimuat
    checkLoginStatus() {
        const user = db.getCurrentUser();
        if (user) {
            this.updateUI(user);
        } else {
            this.updateUI(null);
        }
    }

    // Login function
    login(username, password) {
        console.log('Attempting login for:', username);
        
        const user = db.authenticateUser(username, password);
        
        console.log('Authentication result:', user ? 'Success' : 'Failed');
        
        if (user) {
            db.setCurrentUser(user);
            this.updateUI(user);
            this.showNotification(`Selamat datang, ${user.nama}!`, 'success');
            this.closeLoginModal();
            return true;
        } else {
            this.showNotification('Username atau password salah!', 'error');
            return false;
        }
    }

    // Logout function
    logout() {
        db.logout();
        this.updateUI(null);
        this.showNotification('Anda telah logout', 'info');
    }

    // Update UI berdasarkan status login
    updateUI(user) {
        const loginBtn = document.getElementById('loginBtn');
        const statusIndicator = document.getElementById('userStatus');
        
        if (user) {
            // User logged in
            loginBtn.innerHTML = `
                <svg class="login-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                <span>${user.nama}</span>
            `;
            loginBtn.classList.add('logged-in');
            loginBtn.onclick = () => this.showUserMenu(user);
            
            if (statusIndicator) {
                statusIndicator.innerHTML = `
                    <div class="status-dot ${user.role}"></div>
                    <span>${user.role === 'admin' ? 'Admin' : 'User'} - ${user.nama}</span>
                `;
                statusIndicator.classList.add('logged-in');
                if (user.role === 'admin') {
                    statusIndicator.classList.add('admin');
                }
            }
            
            // Show/hide admin features
            this.toggleAdminFeatures(user.role === 'admin');
        } else {
            // Guest mode
            loginBtn.innerHTML = `
                <svg class="login-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                </svg>
                <span>Login</span>
            `;
            loginBtn.classList.remove('logged-in');
            loginBtn.onclick = () => this.openLoginModal();
            
            if (statusIndicator) {
                statusIndicator.innerHTML = `
                    <div class="status-dot"></div>
                    <span>Mode Guest</span>
                `;
                statusIndicator.classList.remove('logged-in', 'admin');
            }
            
            this.toggleAdminFeatures(false);
        }
    }

    // Toggle fitur admin
    toggleAdminFeatures(isAdmin) {
        const adminButtons = document.querySelectorAll('.admin-only');
        adminButtons.forEach(btn => {
            btn.style.display = isAdmin ? 'inline-flex' : 'none';
        });
        
        // Update body class untuk styling
        if (isAdmin) {
            document.body.classList.add('admin-mode');
        } else {
            document.body.classList.remove('admin-mode');
        }
    }

    // Open login modal
    openLoginModal() {
        const modal = document.getElementById('loginOverlay');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // Close login modal
    closeLoginModal() {
        const modal = document.getElementById('loginOverlay');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            // Reset form
            const loginForm = document.getElementById('loginForm');
            if (loginForm) {
                loginForm.reset();
            }
        }
    }

    // Show user menu
    showUserMenu(user) {
        // Remove existing menu
        const existingMenu = document.getElementById('userMenuOverlay');
        if (existingMenu) {
            existingMenu.remove();
        }

        const menuHTML = `
            <div class="user-menu-overlay" id="userMenuOverlay" onclick="if(event.target===this) auth.closeUserMenu()">
                <div class="user-menu" onclick="event.stopPropagation()">
                    <div class="user-info">
                        <div class="user-avatar ${user.role}">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                            </svg>
                        </div>
                        <div class="user-details">
                            <h3>${user.nama}</h3>
                            <p class="user-role">${user.role === 'admin' ? 'Administrator' : 'User'}</p>
                            <p class="user-email">${user.email}</p>
                        </div>
                    </div>
                    <div class="user-menu-actions">
                        <button class="user-menu-btn" onclick="auth.logout(); auth.closeUserMenu();">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', menuHTML);
        setTimeout(() => {
            document.getElementById('userMenuOverlay').classList.add('active');
        }, 10);
    }

    // Close user menu
    closeUserMenu() {
        const menu = document.getElementById('userMenuOverlay');
        if (menu) {
            menu.classList.remove('active');
            setTimeout(() => menu.remove(), 300);
        }
    }

    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <svg class="notification-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    ${type === 'success' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>' :
                      type === 'error' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>' :
                      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>'}
                </svg>
                <span>${message}</span>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // Check if user has admin access
    isAdmin() {
        const user = db.getCurrentUser();
        return user && user.role === 'admin';
    }

    // Check if user is logged in
    isLoggedIn() {
        return db.getCurrentUser() !== null;
    }
}

// Initialize auth system
const auth = new AuthSystem();

// Global functions untuk onclick handlers di HTML
function closeLoginModal() {
    auth.closeLoginModal();
}

function openLoginModal() {
    auth.openLoginModal();
}

// Event listener untuk close modal saat klik di luar
document.addEventListener('DOMContentLoaded', function() {
    const loginOverlay = document.getElementById('loginOverlay');
    if (loginOverlay) {
        loginOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                closeLoginModal();
            }
        });
    }
});
