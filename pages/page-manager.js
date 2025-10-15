/**
 * Universal Pagination & Filter System
 * For all dummy pages with tables
 */

class PageManager {
    constructor(options = {}) {
        this.itemsPerPage = options.itemsPerPage || 5;
        this.currentPage = 1;
        this.allData = [];
        this.filteredData = [];
        this.tableSelector = options.tableSelector || '.data-table tbody';
        this.paginationSelector = options.paginationSelector || '.pagination';
        this.searchSelector = options.searchSelector || '.search-box input';
        this.filterSelectors = options.filterSelectors || ['.filter-select'];
        
        this.init();
    }

    init() {
        // Get all data from table
        this.loadData();
        
        // Setup event listeners
        this.setupSearch();
        this.setupFilters();
        
        // Initial render
        this.render();
    }

    loadData() {
        const tbody = document.querySelector(this.tableSelector);
        if (!tbody) return;
        
        const rows = tbody.querySelectorAll('tr');
        this.allData = Array.from(rows).map(row => ({
            element: row.cloneNode(true),
            text: row.textContent.toLowerCase()
        }));
        
        this.filteredData = [...this.allData];
    }

    setupSearch() {
        const searchInput = document.querySelector(this.searchSelector);
        if (!searchInput) return;
        
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            this.filterData(query);
        });
    }

    setupFilters() {
        this.filterSelectors.forEach(selector => {
            const filters = document.querySelectorAll(selector);
            filters.forEach(filter => {
                filter.addEventListener('change', () => {
                    this.applyFilters();
                });
            });
        });
    }

    filterData(query) {
        if (!query) {
            this.filteredData = [...this.allData];
        } else {
            this.filteredData = this.allData.filter(item => 
                item.text.includes(query)
            );
        }
        
        this.currentPage = 1;
        this.render();
    }

    applyFilters() {
        const filters = document.querySelectorAll('.filter-select');
        let filtered = [...this.allData];
        
        filters.forEach(filter => {
            const value = filter.value.toLowerCase();
            if (value && value !== 'semua' && value !== 'semua status' && value !== 'bulan ini') {
                filtered = filtered.filter(item => item.text.includes(value));
            }
        });
        
        this.filteredData = filtered;
        this.currentPage = 1;
        this.render();
    }

    render() {
        this.renderTable();
        this.renderPagination();
    }

    renderTable() {
        const tbody = document.querySelector(this.tableSelector);
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        const pageData = this.filteredData.slice(start, end);
        
        if (pageData.length === 0) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td colspan="100%" style="text-align: center; padding: 40px; color: #95a5a6;">
                    <div style="font-size: 48px; margin-bottom: 10px;">🔍</div>
                    <div style="font-size: 18px; font-weight: 600;">Data tidak ditemukan</div>
                    <div style="font-size: 14px; margin-top: 5px;">Coba ubah filter atau kata kunci pencarian</div>
                </td>
            `;
            tbody.appendChild(tr);
        } else {
            pageData.forEach(item => {
                tbody.appendChild(item.element.cloneNode(true));
            });
        }
    }

    renderPagination() {
        const paginationContainer = document.querySelector(this.paginationSelector);
        if (!paginationContainer) return;
        
        const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
        
        if (totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }
        
        let html = '';
        
        // Previous button
        html += `
            <button class="page-btn" ${this.currentPage === 1 ? 'disabled' : ''} 
                    onclick="pageManager.goToPage(${this.currentPage - 1})">
                Previous
            </button>
        `;
        
        // Page numbers
        const maxVisible = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);
        
        if (endPage - startPage < maxVisible - 1) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }
        
        if (startPage > 1) {
            html += `<button class="page-btn" onclick="pageManager.goToPage(1)">1</button>`;
            if (startPage > 2) {
                html += `<span class="page-dots">...</span>`;
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            html += `
                <button class="page-btn ${i === this.currentPage ? 'active' : ''}" 
                        onclick="pageManager.goToPage(${i})">
                    ${i}
                </button>
            `;
        }
        
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                html += `<span class="page-dots">...</span>`;
            }
            html += `<button class="page-btn" onclick="pageManager.goToPage(${totalPages})">${totalPages}</button>`;
        }
        
        // Next button
        html += `
            <button class="page-btn" ${this.currentPage === totalPages ? 'disabled' : ''} 
                    onclick="pageManager.goToPage(${this.currentPage + 1})">
                Next
            </button>
        `;
        
        paginationContainer.innerHTML = html;
    }

    goToPage(page) {
        const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
        
        if (page < 1 || page > totalPages) return;
        
        this.currentPage = page;
        this.render();
        
        // Scroll to top of table
        const table = document.querySelector('.table-container');
        if (table) {
            table.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

// Initialize when DOM is ready
let pageManager;
document.addEventListener('DOMContentLoaded', () => {
    // Check if page has table
    if (document.querySelector('.data-table')) {
        pageManager = new PageManager({
            itemsPerPage: 5,
            tableSelector: '.data-table tbody',
            paginationSelector: '.pagination',
            searchSelector: '.search-box input',
            filterSelectors: ['.filter-select']
        });
    }
});

// Back to Home function
function backToHome() {
    window.location.href = '../../index.html';
}
