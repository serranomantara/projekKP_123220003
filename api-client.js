/**
 * API Client for PHP Backend
 * 
 * File ini berisi fungsi-fungsi untuk berkomunikasi dengan PHP API
 * Replace file database.js, auth.js, dan crud.js dengan file ini
 */

class APIClient {
    constructor() {
        this.baseURL = 'php/api/';
        this.currentUser = null;
    }

    /**
     * Generic API request function
     */
    async request(endpoint, options = {}) {
        try {
            const response = await fetch(this.baseURL + endpoint, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                credentials: 'include' // Include cookies for session
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API Error:', error);
            return {
                success: false,
                message: 'Network error: ' + error.message
            };
        }
    }

    // ============================================
    // AUTHENTICATION METHODS
    // ============================================

    /**
     * Login user
     */
    async login(username, password) {
        const response = await this.request('auth.php?action=login', {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });

        if (response.success) {
            this.currentUser = response.data;
            localStorage.setItem('currentUser', JSON.stringify(response.data));
        }

        return response;
    }

    /**
     * Logout user
     */
    async logout() {
        const response = await this.request('auth.php?action=logout', {
            method: 'POST'
        });

        if (response.success) {
            this.currentUser = null;
            localStorage.removeItem('currentUser');
        }

        return response;
    }

    /**
     * Check session
     */
    async checkSession() {
        const response = await this.request('auth.php?action=check');
        
        if (response.success && response.data.logged_in) {
            this.currentUser = response.data;
            localStorage.setItem('currentUser', JSON.stringify(response.data));
        } else {
            this.currentUser = null;
            localStorage.removeItem('currentUser');
        }

        return response;
    }

    /**
     * Get current user from session
     */
    async getCurrentUser() {
        const response = await this.request('auth.php?action=getCurrentUser');
        
        if (response.success) {
            this.currentUser = response.data;
            localStorage.setItem('currentUser', JSON.stringify(response.data));
        }

        return response;
    }

    /**
     * Get active users (Admin only)
     */
    async getActiveUsers() {
        return await this.request('auth.php?action=getActiveUsers');
    }

    /**
     * Check if user is logged in
     */
    isLoggedIn() {
        return this.currentUser !== null;
    }

    /**
     * Check if user is admin
     */
    isAdmin() {
        return this.currentUser && this.currentUser.role === 'admin';
    }

    // ============================================
    // MENU CRUD METHODS
    // ============================================

    /**
     * Get all menu items
     */
    async getMenuItems(menuType) {
        return await this.request(`menu.php?action=getAll&menu_type=${menuType}`);
    }

    /**
     * Get menu item by ID
     */
    async getMenuItemById(menuType, id) {
        return await this.request(`menu.php?action=getById&menu_type=${menuType}&id=${id}`);
    }

    /**
     * Create menu item
     */
    async createMenuItem(menuType, data) {
        return await this.request(`menu.php?action=create&menu_type=${menuType}`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    /**
     * Update menu item
     */
    async updateMenuItem(menuType, id, data) {
        return await this.request(`menu.php?action=update&menu_type=${menuType}&id=${id}`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    /**
     * Delete menu item
     */
    async deleteMenuItem(menuType, id) {
        return await this.request(`menu.php?action=delete&menu_type=${menuType}&id=${id}`, {
            method: 'POST'
        });
    }

    // ============================================
    // USER MANAGEMENT METHODS (Admin only)
    // ============================================

    /**
     * Get all users
     */
    async getAllUsers() {
        return await this.request('users.php?action=getAll');
    }

    /**
     * Get user by ID
     */
    async getUserById(id) {
        return await this.request(`users.php?action=getById&id=${id}`);
    }

    /**
     * Create user
     */
    async createUser(data) {
        return await this.request('users.php?action=create', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    /**
     * Update user
     */
    async updateUser(id, data) {
        return await this.request(`users.php?action=update&id=${id}`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    /**
     * Delete user
     */
    async deleteUser(id) {
        return await this.request(`users.php?action=delete&id=${id}`, {
            method: 'POST'
        });
    }

    /**
     * Change password
     */
    async changePassword(id, oldPassword, newPassword) {
        return await this.request(`users.php?action=changePassword&id=${id}`, {
            method: 'POST',
            body: JSON.stringify({
                old_password: oldPassword,
                new_password: newPassword
            })
        });
    }

    /**
     * Get activity logs
     */
    async getActivityLogs(userId = null, limit = 100) {
        let url = `users.php?action=getActivityLogs&limit=${limit}`;
        if (userId) {
            url += `&user_id=${userId}`;
        }
        return await this.request(url);
    }

    /**
     * Get user statistics
     */
    async getUserStats() {
        return await this.request('users.php?action=getStats');
    }
}

// Initialize API Client
const api = new APIClient();

// ============================================
// AUTHENTICATION SYSTEM (Replacement for auth.js)
// ============================================

class AuthSystem {
    constructor() {
        this.init();
    }

    async init() {
        // Check session on load
        await api.checkSession();
        this.updateUI();
    }

    async login(username, password) {
        const response = await api.login(username, password);
        
        if (response.success) {
            this.updateUI();
            this.showNotification(`Selamat datang, ${response.data.nama}!`, 'success');
            this.closeLoginModal();
            return true;
        } else {
            this.showNotification(response.message, 'error');
            return false;
        }
    }

    async logout() {
        const response = await api.logout();
        
        if (response.success) {
            this.updateUI();
            this.showNotification('Anda telah logout', 'info');
        }
    }

    updateUI() {
        const user = api.currentUser;
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

    toggleAdminFeatures(isAdmin) {
        const adminButtons = document.querySelectorAll('.admin-only');
        adminButtons.forEach(btn => {
            btn.style.display = isAdmin ? 'inline-flex' : 'none';
        });
        
        if (isAdmin) {
            document.body.classList.add('admin-mode');
        } else {
            document.body.classList.remove('admin-mode');
        }
    }

    openLoginModal() {
        const modal = document.getElementById('loginOverlay');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeLoginModal() {
        const modal = document.getElementById('loginOverlay');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            const loginForm = document.getElementById('loginForm');
            if (loginForm) {
                loginForm.reset();
            }
        }
    }

    showUserMenu(user) {
        const existingMenu = document.getElementById('userMenuOverlay');
        if (existingMenu) {
            existingMenu.remove();
        }

        const menuHTML = `
            <div class="user-menu-overlay" id="userMenuOverlay" onclick="if(event.target===this) auth.closeUserMenu()">
                <div class="user-menu" onclick="event.stopPropagation()">
                    <div class="user-menu-header">
                        <div class="user-menu-avatar">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                            </svg>
                        </div>
                        <h4>${user.nama}</h4>
                        <p>${user.email}</p>
                        <span class="user-role ${user.role}">${user.role === 'admin' ? 'Administrator' : 'User'}</span>
                    </div>
                    <div class="user-menu-actions">
                        ${user.role === 'admin' ? `
                        <button class="user-menu-btn monitor-btn" onclick="window.location.href='monitor-users.html'; auth.closeUserMenu();">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                            </svg>
                            Monitor User Online
                        </button>
                        ` : ''}
                        <button class="user-menu-btn logout-btn" onclick="auth.logout(); auth.closeUserMenu();">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
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

    closeUserMenu() {
        const menu = document.getElementById('userMenuOverlay');
        if (menu) {
            menu.classList.remove('active');
            setTimeout(() => menu.remove(), 300);
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `<div class="notification-content">${message}</div>`;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    isAdmin() {
        return api.isAdmin();
    }

    isLoggedIn() {
        return api.isLoggedIn();
    }
}

// ============================================
// CRUD MANAGER (Replacement for crud.js)
// ============================================

class CRUDManager {
    constructor() {
        this.currentMenu = null;
        this.editingItemId = null;
    }

    async loadMenuItems(menuType) {
        this.currentMenu = menuType;
        const response = await api.getMenuItems(menuType);
        
        if (!response.success) {
            console.error('Failed to load menu items:', response.message);
            return;
        }

        const items = response.data;
        const menuList = document.getElementById('modalMenuList');
        
        if (!menuList) {
            console.error('modalMenuList element not found!');
            return;
        }
        
        menuList.innerHTML = '';
        
        items.forEach(item => {
            const li = document.createElement('li');
            li.className = 'modal-menu-item';
            li.dataset.itemId = item.id;
            
            if (item.url) {
                li.classList.add('has-link');
            }
            
            const link = document.createElement('a');
            link.href = item.url || '#';
            if (item.url) {
                if (item.url.startsWith('pages/') || item.url.startsWith('./pages/') || item.url.startsWith('../pages/')) {
                    link.target = '_self';
                } else if (item.url.startsWith('http://') || item.url.startsWith('https://')) {
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                } else {
                    link.target = '_self';
                }
            } else {
                link.onclick = (e) => e.preventDefault();
            }
            
            const iconSpan = document.createElement('span');
            iconSpan.className = 'menu-item-icon';
            iconSpan.textContent = item.icon || '📄';
            link.appendChild(iconSpan);
            
            const textSpan = document.createElement('span');
            textSpan.className = 'menu-item-text';
            textSpan.textContent = item.title;
            link.appendChild(textSpan);
            
            li.appendChild(link);
            
            if (auth.isLoggedIn()) {
                const actionsDiv = document.createElement('div');
                actionsDiv.className = 'item-actions';
                
                const editBtn = document.createElement('button');
                editBtn.className = 'item-edit-btn';
                editBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    <span>Edit</span>
                `;
                editBtn.onclick = () => this.openEditForm(item);
                
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'item-delete-btn';
                deleteBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                    <span>Hapus</span>
                `;
                deleteBtn.onclick = () => this.deleteItem(item.id);
                
                actionsDiv.appendChild(editBtn);
                actionsDiv.appendChild(deleteBtn);
                li.appendChild(actionsDiv);
            }
            
            menuList.appendChild(li);
        });
        
        if (auth.isAdmin()) {
            const addBtn = document.createElement('button');
            addBtn.className = 'add-item-btn admin-only';
            addBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
                <span>Tambah Item Baru</span>
            `;
            addBtn.onclick = () => this.openAddForm();
            menuList.appendChild(addBtn);
        }
    }

    openAddForm() {
        const formHTML = `
            <div class="crud-form-overlay" id="crudFormOverlay">
                <div class="crud-form">
                    <button class="form-close" onclick="crud.closeForm()">&times;</button>
                    <h3>Tambah Item Baru</h3>
                    <form id="crudForm" onsubmit="crud.submitForm(event)">
                        <div class="form-group">
                            <label>Icon (Emoji)</label>
                            <input type="text" id="formIcon" placeholder="📋" maxlength="2">
                        </div>
                        <div class="form-group">
                            <label>Judul *</label>
                            <input type="text" id="formTitle" required placeholder="Masukkan judul">
                        </div>
                        <div class="form-group">
                            <label>Deskripsi</label>
                            <textarea id="formDescription" placeholder="Masukkan deskripsi" rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label>URL</label>
                            <input type="url" id="formUrl" placeholder="https://example.com">
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn-cancel" onclick="crud.closeForm()">Batal</button>
                            <button type="submit" class="btn-submit">Simpan</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', formHTML);
        setTimeout(() => {
            document.getElementById('crudFormOverlay').classList.add('active');
        }, 10);
    }

    openEditForm(item) {
        this.editingItemId = item.id;
        const formHTML = `
            <div class="crud-form-overlay" id="crudFormOverlay">
                <div class="crud-form">
                    <button class="form-close" onclick="crud.closeForm()">&times;</button>
                    <h3>Edit Item</h3>
                    <form id="crudForm" onsubmit="crud.submitForm(event)">
                        <div class="form-group">
                            <label>Icon (Emoji)</label>
                            <input type="text" id="formIcon" value="${item.icon || ''}" maxlength="2">
                        </div>
                        <div class="form-group">
                            <label>Judul *</label>
                            <input type="text" id="formTitle" value="${item.title}" required>
                        </div>
                        <div class="form-group">
                            <label>Deskripsi</label>
                            <textarea id="formDescription" rows="3">${item.description || ''}</textarea>
                        </div>
                        <div class="form-group">
                            <label>URL</label>
                            <input type="url" id="formUrl" value="${item.url || ''}">
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn-cancel" onclick="crud.closeForm()">Batal</button>
                            <button type="submit" class="btn-submit">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', formHTML);
        setTimeout(() => {
            document.getElementById('crudFormOverlay').classList.add('active');
        }, 10);
    }

    async submitForm(event) {
        event.preventDefault();
        
        const formData = {
            icon: document.getElementById('formIcon').value,
            title: document.getElementById('formTitle').value,
            description: document.getElementById('formDescription').value,
            url: document.getElementById('formUrl').value
        };
        
        let response;
        if (this.editingItemId) {
            response = await api.updateMenuItem(this.currentMenu, this.editingItemId, formData);
            this.editingItemId = null;
        } else {
            response = await api.createMenuItem(this.currentMenu, formData);
        }
        
        if (response.success) {
            auth.showNotification(response.message, 'success');
            this.closeForm();
            this.loadMenuItems(this.currentMenu);
        } else {
            auth.showNotification(response.message, 'error');
        }
    }

    async deleteItem(id) {
        if (confirm('Apakah Anda yakin ingin menghapus item ini?')) {
            const response = await api.deleteMenuItem(this.currentMenu, id);
            
            if (response.success) {
                auth.showNotification(response.message, 'success');
                this.loadMenuItems(this.currentMenu);
            } else {
                auth.showNotification(response.message, 'error');
            }
        }
    }

    closeForm() {
        const overlay = document.getElementById('crudFormOverlay');
        if (overlay) {
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 300);
        }
        this.editingItemId = null;
    }
}

// Initialize systems
const auth = new AuthSystem();
const crud = new CRUDManager();

// Make available globally
window.api = api;
window.auth = auth;
window.crud = crud;

console.log('API Client initialized successfully');
