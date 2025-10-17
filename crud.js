 // CRUD Operations Manager
class CRUDManager {
    constructor() {
        this.currentMenu = null;
        this.editingItemId = null;
    }

    // Load menu items ke modal
    loadMenuItems(menuType) {
        this.currentMenu = menuType;
        const items = db.getMenuItems(menuType);
        const menuList = document.getElementById('modalMenuList');
        
        console.log('loadMenuItems called with:', menuType);
        console.log('Items found:', items.length);
        
        if (!menuList) {
            console.error('modalMenuList element not found!');
            return;
        }
        
        menuList.innerHTML = '';
        
        items.forEach(item => {
            const li = document.createElement('li');
            li.className = 'modal-menu-item';
            li.dataset.itemId = item.id;
            
            // Add has-link class if item has URL
            if (item.url) {
                li.classList.add('has-link');
            }
            
            // Create link wrapper
            const link = document.createElement('a');
            link.href = item.url || '#';
            if (item.url) {
                // Check if URL is internal (starts with 'pages/') or external
                if (item.url.startsWith('pages/') || item.url.startsWith('./pages/') || item.url.startsWith('../pages/')) {
                    // Internal link - open in same window
                    link.target = '_self';
                } else if (item.url.startsWith('http://') || item.url.startsWith('https://')) {
                    // External link - open in new tab
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                } else {
                    // Default for relative paths - open in same window
                    link.target = '_self';
                }
            } else {
                link.onclick = (e) => e.preventDefault();
            }
            
            // Add icon
            const iconSpan = document.createElement('span');
            iconSpan.className = 'menu-item-icon';
            iconSpan.textContent = item.icon || '📄';
            link.appendChild(iconSpan);
            
            // Add text
            const textSpan = document.createElement('span');
            textSpan.className = 'menu-item-text';
            textSpan.textContent = item.title;
            link.appendChild(textSpan);
            
            li.appendChild(link);
            
            // Add CRUD controls for both admin and user
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
                editBtn.title = 'Edit Item';
                editBtn.onclick = () => this.openEditForm(item);
                
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'item-delete-btn';
                deleteBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                    <span>Hapus</span>
                `;
                deleteBtn.title = 'Hapus Item';
                deleteBtn.onclick = () => this.deleteItem(item.id);
                
                actionsDiv.appendChild(editBtn);
                actionsDiv.appendChild(deleteBtn);
                li.appendChild(actionsDiv);
            }
            
            menuList.appendChild(li);
        });
        
        // Add button untuk menambah item baru (admin only)
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

    // Open form untuk menambah item
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

    // Open form untuk edit item
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

    // Submit form (add or edit)
    submitForm(event) {
        event.preventDefault();
        
        const formData = {
            icon: document.getElementById('formIcon').value,
            title: document.getElementById('formTitle').value,
            description: document.getElementById('formDescription').value,
            url: document.getElementById('formUrl').value,
            created_by: db.getCurrentUser().id
        };
        
        if (this.editingItemId) {
            // Update existing item
            db.updateMenuItem(this.currentMenu, this.editingItemId, formData);
            auth.showNotification('Item berhasil diupdate!', 'success');
            this.editingItemId = null;
        } else {
            // Add new item
            db.addMenuItem(this.currentMenu, formData);
            auth.showNotification('Item berhasil ditambahkan!', 'success');
        }
        
        this.closeForm();
        this.loadMenuItems(this.currentMenu);
    }

    // Delete item
    deleteItem(id) {
        if (confirm('Apakah Anda yakin ingin menghapus item ini?')) {
            db.deleteMenuItem(this.currentMenu, id);
            auth.showNotification('Item berhasil dihapus!', 'success');
            this.loadMenuItems(this.currentMenu);
        }
    }

    // Close form
    closeForm() {
        const overlay = document.getElementById('crudFormOverlay');
        if (overlay) {
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 300);
        }
        this.editingItemId = null;
    }

    // Open Card Edit Form (untuk edit judul dan deskripsi card utama)
    openCardEditForm(menuType) {
        const card = document.querySelector(`.menu-card[data-menu="${menuType}"]`);
        if (!card) return;

        const title = card.querySelector('.card-title').textContent;
        const description = card.querySelector('.card-description').textContent;

        const formHTML = `
            <div class="crud-form-overlay active" id="cardEditFormOverlay" onclick="crud.handleOverlayClick(event)">
                <div class="crud-form card-edit-form">
                    <div class="crud-form-header">
                        <div class="header-content">
                            <div class="header-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                </svg>
                            </div>
                            <div>
                                <h3>Edit Kartu Menu</h3>
                                <p class="form-subtitle">Kustomisasi tampilan menu layanan publik</p>
                            </div>
                        </div>
                        <button class="close-form-btn" onclick="crud.closeCardEditForm()" type="button">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    
                    <form id="cardEditForm" onsubmit="crud.handleCardEdit(event, '${menuType}')">
                        <div class="form-group">
                            <label class="form-label">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
                                </svg>
                                Judul Menu
                            </label>
                            <input type="text" id="cardTitle" class="form-input" value="${title}" required placeholder="Contoh: SEKRETARIAT">
                            <span class="form-hint">Nama utama yang akan ditampilkan pada kartu menu</span>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                </svg>
                                Deskripsi Menu
                            </label>
                            <textarea id="cardDescription" class="form-input" required placeholder="Masukkan deskripsi singkat tentang menu ini..." rows="3">${description}</textarea>
                            <span class="form-hint">Penjelasan singkat tentang fungsi menu (maks. 150 karakter)</span>
                        </div>
                        
                        <div class="form-actions">
                            <button type="button" class="btn-cancel" onclick="crud.closeCardEditForm()">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                                Batal
                            </button>
                            <button type="submit" class="btn-submit">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                                </svg>
                                Simpan Perubahan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', formHTML);
    }

    // Handle card edit submit
    handleCardEdit(event, menuType) {
        event.preventDefault();
        
        const title = document.getElementById('cardTitle').value;
        const description = document.getElementById('cardDescription').value;

        const card = document.querySelector(`.menu-card[data-menu="${menuType}"]`);
        if (card) {
            card.querySelector('.card-title').textContent = title;
            card.querySelector('.card-description').textContent = description;

            // Simpan ke localStorage
            const cardData = JSON.parse(localStorage.getItem('menuCards') || '{}');
            cardData[menuType] = { 
                title, 
                description
            };
            localStorage.setItem('menuCards', JSON.stringify(cardData));

            auth.showNotification('Kartu menu berhasil diperbarui!', 'success');
            this.closeCardEditForm();
        }
    }

    // Close card edit form
    closeCardEditForm() {
        const overlay = document.getElementById('cardEditFormOverlay');
        if (overlay) {
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 300);
        }
    }

    // Handle overlay click to close
    handleOverlayClick(event) {
        if (event.target.id === 'cardEditFormOverlay') {
            this.closeCardEditForm();
        }
    }

    // Load saved card data
    loadCardData() {
        const cardData = JSON.parse(localStorage.getItem('menuCards') || '{}');
        
        Object.keys(cardData).forEach(menuType => {
            const card = document.querySelector(`.menu-card[data-menu="${menuType}"]`);
            if (card && cardData[menuType]) {
                if (cardData[menuType].title) {
                    card.querySelector('.card-title').textContent = cardData[menuType].title;
                }
                if (cardData[menuType].description) {
                    card.querySelector('.card-description').textContent = cardData[menuType].description;
                }
            }
        });
    }
}

// Initialize CRUD manager
const crud = new CRUDManager();

// Make CRUD available globally
window.crud = crud;

// Load saved card data on page load
window.addEventListener('DOMContentLoaded', () => {
    crud.loadCardData();
    console.log('CRUD Manager initialized and loaded card data');
});
