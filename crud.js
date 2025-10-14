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
        
        if (!menuList) return;
        
        menuList.innerHTML = '';
        
        items.forEach(item => {
            const li = document.createElement('li');
            li.className = 'modal-menu-item';
            li.dataset.itemId = item.id;
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'item-content';
            
            if (item.icon) {
                const iconSpan = document.createElement('span');
                iconSpan.className = 'item-icon';
                iconSpan.textContent = item.icon;
                contentDiv.appendChild(iconSpan);
            }
            
            const textDiv = document.createElement('div');
            textDiv.className = 'item-text';
            
            const titleSpan = document.createElement('span');
            titleSpan.className = 'item-title';
            titleSpan.textContent = item.title;
            textDiv.appendChild(titleSpan);
            
            if (item.description) {
                const descSpan = document.createElement('span');
                descSpan.className = 'item-description';
                descSpan.textContent = item.description;
                textDiv.appendChild(descSpan);
            }
            
            contentDiv.appendChild(textDiv);
            
            // Add link if URL exists
            if (item.url) {
                const linkBtn = document.createElement('a');
                linkBtn.href = item.url;
                linkBtn.target = '_blank';
                linkBtn.className = 'item-link-btn';
                linkBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                `;
                linkBtn.title = 'Buka Link';
                contentDiv.appendChild(linkBtn);
            }
            
            li.appendChild(contentDiv);
            
            // Add admin controls
            if (auth.isAdmin()) {
                const actionsDiv = document.createElement('div');
                actionsDiv.className = 'item-actions admin-only';
                
                const editBtn = document.createElement('button');
                editBtn.className = 'item-edit-btn';
                editBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                `;
                editBtn.title = 'Edit';
                editBtn.onclick = () => this.openEditForm(item);
                
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'item-delete-btn';
                deleteBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                `;
                deleteBtn.title = 'Hapus';
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
}

// Initialize CRUD manager
const crud = new CRUDManager();
