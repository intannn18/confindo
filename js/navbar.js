/**
 * CONFindo - Universal Navbar & Footer Component
 * Automatically detects current page, renders active state, and injects consistent brand navigation
 */

(function () {
  // Determine root path prefix based on current location
  const path = window.location.pathname.replace(/\\/g, '/');
  let prefix = './';
  if (path.includes('/learn/') || path.includes('/practice/') || path.includes('/tools/') || 
      path.includes('/challenge/') || path.includes('/store/') || path.includes('/checkout/') || 
      path.includes('/dashboard/') || path.includes('/admin/') || path.includes('/login/') || 
      path.includes('/review/')) {
    prefix = '../';
  }

  // Active page detection
  let currentKey = 'home';
  if (path.includes('/learn')) currentKey = 'learn';
  else if (path.includes('/practice')) currentKey = 'practice';
  else if (path.includes('/tools')) currentKey = 'tools';
  else if (path.includes('/challenge')) currentKey = 'challenge';
  else if (path.includes('/store')) currentKey = 'store';
  else if (path.includes('/review')) currentKey = 'review';
  else if (path.includes('/dashboard')) currentKey = 'dashboard';
  else if (path.includes('/admin')) currentKey = 'admin';
  else if (path.includes('/login')) currentKey = 'login';
  else if (path.includes('/checkout')) currentKey = 'checkout';

  // Render Navbar
  function renderNavbar() {
    const navPlaceholder = document.getElementById('navbarContainer');
    if (!navPlaceholder) return;

    const user = window.confApi ? window.confApi.getCurrentUser() : null;

    navPlaceholder.innerHTML = `
      <header id="mainNavbar" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3 flex items-center justify-between">
          
          <!-- Logo with Original Brand Artwork -->
          <a href="${prefix}index.html" class="flex items-center gap-2 group">
            <img src="${prefix}assets/logo.png" alt="CONFindo Logo" class="h-10 sm:h-11 w-auto object-contain transition-transform group-hover:scale-102">
          </a>

          <!-- Desktop Navigation Menu (Separate Pages) -->
          <nav class="hidden md:flex items-center space-x-1 lg:space-x-1 text-sm font-semibold text-slate-600">
            <a href="${prefix}index.html" class="px-3 py-2 rounded-xl transition-all ${currentKey === 'home' ? 'text-blue-700 bg-blue-50/80 font-bold' : 'hover:text-blue-600 hover:bg-slate-50'}">
              Home
            </a>
            <a href="${prefix}learn/index.html" onclick="return window.checkAuthNav(event, 'learn', '${prefix}')" class="px-3 py-2 rounded-xl transition-all ${currentKey === 'learn' ? 'text-blue-700 bg-blue-50/80 font-bold' : 'hover:text-blue-600 hover:bg-slate-50'}">
              Learn
            </a>
            <a href="${prefix}practice/index.html" class="px-3 py-2 rounded-xl transition-all ${currentKey === 'practice' ? 'text-blue-700 bg-blue-50/80 font-bold' : 'hover:text-blue-600 hover:bg-slate-50'}">
              Practice
            </a>
            <a href="${prefix}tools/index.html" class="px-3 py-2 rounded-xl transition-all ${currentKey === 'tools' ? 'text-blue-700 bg-blue-50/80 font-bold' : 'hover:text-blue-600 hover:bg-slate-50'}">
              Tools
            </a>
            <a href="${prefix}challenge/index.html" class="px-3 py-2 rounded-xl transition-all ${currentKey === 'challenge' ? 'text-blue-700 bg-blue-50/80 font-bold' : 'hover:text-blue-600 hover:bg-slate-50'}">
              Challenge
            </a>
            <a href="${prefix}store/index.html" onclick="return window.checkAuthNav(event, 'store', '${prefix}')" class="px-3 py-2 rounded-xl transition-all flex items-center gap-1 ${currentKey === 'store' ? 'text-blue-700 bg-blue-50/80 font-bold' : 'hover:text-blue-600 hover:bg-slate-50'}">
              <span>Store Digital</span>
              <span class="text-[10px] font-extrabold bg-orange-100 text-orange-700 px-1.5 py-0.2 rounded-md">PRODUK</span>
            </a>
            <a href="${prefix}review/index.html" class="px-3 py-2 rounded-xl transition-all flex items-center gap-1 ${currentKey === 'review' ? 'text-blue-700 bg-blue-50/80 font-bold' : 'hover:text-blue-600 hover:bg-slate-50'}">
              <span>Review</span>
              <span class="text-[10px] font-extrabold bg-emerald-100 text-emerald-700 px-1.5 py-0.2 rounded-md">★ 4.9</span>
            </a>
          </nav>

          <!-- Right Action Items: Search & User / Login -->
          <div class="hidden sm:flex items-center gap-3">
            
            <!-- Global Search Trigger -->
            <button 
              type="button" 
              onclick="window.openGlobalSearchModal()"
              class="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 text-xs text-slate-500 transition-all shadow-2xs"
              title="Cari tutorial, tools, produk (Ctrl+K)"
            >
              <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <span class="hidden lg:inline">Search...</span>
              <span class="text-[10px] font-mono bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-400">Ctrl K</span>
            </button>

            <!-- User Auth Buttons -->
            ${user ? `
              <div class="flex items-center gap-2">
                ${user.role === 'admin' ? `
                  <a href="${prefix}admin/index.html" class="text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300 px-2.5 py-1.5 rounded-lg hover:bg-amber-100 transition-all">
                    Admin
                  </a>
                ` : ''}
                <a href="${prefix}dashboard/index.html" class="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:border-blue-400 text-xs font-bold text-slate-800 transition-all shadow-2xs">
                  <img src="${user.profile_image || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name)}" class="w-6 h-6 rounded-full object-cover">
                  <span>${user.name.split(' ')[0]}</span>
                </a>
              </div>
            ` : `
              <a href="${prefix}login/index.html" class="text-xs md:text-sm font-bold bg-[#0b5796] hover:bg-[#004070] text-white px-4 py-2 rounded-xl transition-all shadow-sm">
                Login / Sign Up
              </a>
            `}

          </div>

          <!-- Mobile Hamburger -->
          <div class="flex items-center gap-2 md:hidden">
            <button type="button" onclick="window.openGlobalSearchModal()" class="p-2 text-slate-600 hover:text-blue-600 rounded-lg">
              <svg class="w-5 h-5 fill-none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </button>
            <button id="mobileMenuBtn" type="button" class="p-2 text-slate-700 hover:text-blue-600 rounded-lg" onclick="document.getElementById('mobileMenuDrawer').classList.toggle('hidden')">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>

        </div>

        <!-- Mobile Drawer -->
        <div id="mobileMenuDrawer" class="hidden md:hidden bg-white border-b border-slate-200 px-5 pt-3 pb-6 space-y-2.5 shadow-xl">
          <a href="${prefix}index.html" class="block px-3 py-2 text-sm font-semibold rounded-lg ${currentKey === 'home' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-700'}">Home</a>
          <a href="${prefix}learn/index.html" onclick="return window.checkAuthNav(event, 'learn', '${prefix}')" class="block px-3 py-2 text-sm font-semibold rounded-lg ${currentKey === 'learn' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-700'}">Learn</a>
          <a href="${prefix}practice/index.html" class="block px-3 py-2 text-sm font-semibold rounded-lg ${currentKey === 'practice' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-700'}">Practice</a>
          <a href="${prefix}tools/index.html" class="block px-3 py-2 text-sm font-semibold rounded-lg ${currentKey === 'tools' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-700'}">Tools</a>
          <a href="${prefix}challenge/index.html" class="block px-3 py-2 text-sm font-semibold rounded-lg ${currentKey === 'challenge' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-700'}">Challenge</a>
          <a href="${prefix}store/index.html" onclick="return window.checkAuthNav(event, 'store', '${prefix}')" class="block px-3 py-2 text-sm font-semibold rounded-lg ${currentKey === 'store' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-700'}">Store Digital</a>
          <a href="${prefix}review/index.html" class="block px-3 py-2 text-sm font-semibold rounded-lg ${currentKey === 'review' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-700'}">Review & Ulasan</a>
          <div class="pt-3 border-t border-slate-100">
            ${user ? `
              <div class="flex items-center justify-between">
                <a href="${prefix}dashboard/index.html" class="text-xs font-bold text-blue-600">Buka Dashboard (${user.name}) →</a>
                <button type="button" onclick="window.confApi.logout(); location.reload();" class="text-xs text-rose-500 font-semibold">Logout</button>
              </div>
            ` : `
              <a href="${prefix}login/index.html" class="block w-full py-2.5 text-center text-xs font-bold bg-[#0b5796] text-white rounded-xl">Login / Sign Up</a>
            `}
          </div>
        </div>
      </header>
    `;
  }

  // Render Footer with exact Brand Rules
  function renderFooter() {
    const footerPlaceholder = document.getElementById('footerContainer');
    if (!footerPlaceholder) return;

    footerPlaceholder.innerHTML = `
      <footer class="bg-[#0b132b] text-slate-300 border-t border-slate-800 pt-16 pb-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
            
            <!-- Brand & Mission -->
            <div class="lg:col-span-2 space-y-4">
              <a href="${prefix}index.html" class="inline-block bg-white/95 px-3 py-1.5 rounded-xl shadow-sm">
                <img src="${prefix}assets/logo.png" alt="CONFindo Logo" class="h-9 w-auto">
              </a>
              <p class="text-sm font-medium text-slate-400">
                “Your companion for better public speaking.”
              </p>
              <p class="text-xs text-slate-400 leading-relaxed max-w-sm">
                Platform digital mandiri yang membantu pelajar, mahasiswa, fresh graduate, dan karyawan membangun rasa percaya diri berbicara tanpa coach mahal atau sesi konsultasi.
              </p>
            </div>

            <!-- Menu Halaman Terpisah -->
            <div class="space-y-3">
              <h4 class="text-xs font-bold uppercase tracking-wider text-white">Menu Utama</h4>
              <ul class="space-y-2 text-xs">
                <li><a href="${prefix}index.html" class="hover:text-white transition-colors">Home</a></li>
                <li><a href="${prefix}learn/index.html" class="hover:text-white transition-colors">Learn</a></li>
                <li><a href="${prefix}practice/index.html" class="hover:text-white transition-colors">Practice</a></li>
                <li><a href="${prefix}tools/index.html" class="hover:text-white transition-colors">Tools</a></li>
                <li><a href="${prefix}challenge/index.html" class="hover:text-white transition-colors">Challenge</a></li>
                <li><a href="${prefix}store/index.html" class="hover:text-white transition-colors">Store Digital</a></li>
                <li><a href="${prefix}review/index.html" class="hover:text-white transition-colors">Review</a></li>
              </ul>
            </div>

            <!-- Support -->
            <div class="space-y-3">
              <h4 class="text-xs font-bold uppercase tracking-wider text-white">Support & Legal</h4>
              <ul class="space-y-2 text-xs text-slate-400">
                <li><a href="javascript:void(0)" onclick="alert('CONFindo adalah platform self-learning untuk membantu Anda bersuara dengan percaya diri.')" class="hover:text-white transition-colors">About</a></li>
                <li><a href="https://wa.me/6285725957927?text=hallo%20confindo,%20aku%20mau%20penjelasan%20kebih%20lanjut" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">Contact Support</a></li>
                <li><a href="javascript:void(0)" onclick="alert('FAQ: Semua materi dapat dipelajari secara mandiri kapan saja.')" class="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="javascript:void(0)" onclick="alert('Kebijakan Privasi: Data latihan dan akun tersimpan aman.')" class="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="javascript:void(0)" onclick="alert('Syarat & Ketentuan: Pembelian produk digital berlaku lisensi seumur hidup.')" class="hover:text-white transition-colors">Terms & Conditions</a></li>
              </ul>
            </div>

            <!-- Social Media - STRICT RULE: ONLY WhatsApp, TikTok, Instagram -->
            <div class="space-y-3">
              <h4 class="text-xs font-bold uppercase tracking-wider text-white">Social Media</h4>
              <p class="text-xs text-slate-400">Ikuti tips harian public speaking kami di:</p>
              
              <div class="flex items-center gap-3 pt-1">
                <!-- 1. WhatsApp -->
                <a href="https://wa.me/6285725957927?text=hallo%20confindo,%20aku%20mau%20penjelasan%20kebih%20lanjut" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-sm" title="WhatsApp">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.06-2.146-.541-1.859-.77-3.048-2.658-3.14-2.782-.093-.124-.755-.996-.755-1.911 0-.915.48-1.365.65-1.55.17-.186.372-.232.496-.232.124 0 .248.002.356.007.114.006.267-.043.418.32.155.372.531 1.29.578 1.383.046.093.077.201.015.324-.062.124-.093.201-.186.31-.093.108-.196.242-.28.325-.093.093-.19.194-.082.38.109.186.483.797 1.036 1.29.712.635 1.312.832 1.498.924.186.093.294.077.402-.046.108-.124.465-.541.589-.727.124-.186.248-.155.418-.093.17.062 1.083.511 1.269.604.186.093.31.14.356.217.046.077.046.45-.098.855zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.436 5.176L2 22l4.981-1.396A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
                </a>

                <!-- 2. TikTok -->
                <a href="https://www.tiktok.com/@confin_do?_r=1&_t=ZS-9AUl4XZiZxE" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-xl bg-slate-800 hover:bg-black text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-sm" title="TikTok">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                </a>

                <!-- 3. Instagram -->
                <a href="https://instagram.com/confindo_?srtk=MXNsNTBmZmh1Z2c3ZQ%3D%3D" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-xl bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-sm" title="Instagram">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689-.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>

          </div>

          <!-- Bottom Copyright -->
          <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 2026 CONFindo. All rights reserved.</p>
            <p>Platform Self-Learning Public Speaking Mandiri.</p>
          </div>

        </div>
      </footer>
    `;
  }

  // Global search modal injection
  function injectSearchModal() {
    if (document.getElementById('globalSearchModal')) return;
    const div = document.createElement('div');
    div.id = 'globalSearchModal';
    div.className = 'fixed inset-0 z-50 hidden flex items-start justify-center pt-20 p-4 modal-backdrop';
    div.innerHTML = `
      <div class="bg-white rounded-2xl overflow-hidden max-w-xl w-full shadow-2xl modal-content-box border border-slate-200">
        <div class="p-4 border-b border-slate-200 flex items-center gap-3">
          <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input 
            id="globalSearchModalInput" 
            type="text" 
            placeholder="Cari tutorial YouTube, tools, atau produk digital..." 
            class="w-full text-sm text-slate-800 focus:outline-none placeholder:text-slate-400"
          />
          <button type="button" onclick="document.getElementById('globalSearchModal').classList.add('hidden')" class="text-xs text-slate-400 hover:text-slate-600">Esc</button>
        </div>
        <div id="globalSearchResults" class="max-h-96 overflow-y-auto p-2">
          <div class="p-6 text-center text-xs text-slate-400">Ketik kata kunci untuk mencari di seluruh website CONFindo...</div>
        </div>
      </div>
    `;
    document.body.appendChild(div);

    div.addEventListener('click', (e) => {
      if (e.target === div) div.classList.add('hidden');
    });

    const input = document.getElementById('globalSearchModalInput');
    input.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      const resultsEl = document.getElementById('globalSearchResults');
      if (!q) {
        resultsEl.innerHTML = `<div class="p-6 text-center text-xs text-slate-400">Ketik kata kunci untuk mencari di seluruh website CONFindo...</div>`;
        return;
      }
      
      const tutorials = window.confApi ? window.confApi.getTutorials('all', q) : [];
      const products = window.confApi ? window.confApi.getProducts().filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) : [];

      let html = '';
      if (tutorials.length > 0) {
        html += `<div class="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tutorial (${tutorials.length})</div>`;
        tutorials.forEach(t => {
          html += `
            <a href="${prefix}learn/index.html?watch=${t.id}" class="p-3 hover:bg-slate-50 rounded-xl flex items-center justify-between block">
              <div>
                <p class="text-xs font-bold text-slate-900">${t.title}</p>
                <p class="text-[11px] text-slate-500">${t.category} • ${t.duration}</p>
              </div>
              <span class="text-xs text-blue-600 font-semibold">Tonton →</span>
            </a>
          `;
        });
      }
      if (products.length > 0) {
        html += `<div class="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-2">Produk Digital (${products.length})</div>`;
        products.forEach(p => {
          html += `
            <a href="${prefix}store/product.html?id=${p.id}" class="p-3 hover:bg-slate-50 rounded-xl flex items-center justify-between block">
              <div>
                <p class="text-xs font-bold text-slate-900">${p.name}</p>
                <p class="text-[11px] text-orange-600 font-semibold">Rp ${Number(p.price).toLocaleString('id-ID')}</p>
              </div>
              <span class="text-xs text-blue-600 font-semibold">Lihat →</span>
            </a>
          `;
        });
      }
      if (!html) {
        html = `<div class="p-8 text-center text-xs text-slate-400">Tidak ada hasil ditemukan untuk "${q}".</div>`;
      }
      resultsEl.innerHTML = html;
    });
  }

  window.openGlobalSearchModal = function () {
    const m = document.getElementById('globalSearchModal');
    if (m) {
      m.classList.remove('hidden');
      const input = document.getElementById('globalSearchModalInput');
      if (input) {
        input.value = '';
        input.focus();
      }
    }
  };

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      window.openGlobalSearchModal();
    }
    if (e.key === 'Escape') {
      const m = document.getElementById('globalSearchModal');
      if (m) m.classList.add('hidden');
    }
  });

  // Login Required Modal Injection
  function injectLoginRequiredModal() {
    if (document.getElementById('loginRequiredModal')) return;
    const div = document.createElement('div');
    div.id = 'loginRequiredModal';
    div.className = 'fixed inset-0 z-50 hidden flex items-center justify-center p-4 modal-backdrop bg-slate-900/60 backdrop-blur-sm';
    div.innerHTML = `
      <div class="bg-white rounded-3xl overflow-hidden max-w-md w-full shadow-2xl modal-content-box border border-slate-200 text-center p-6 sm:p-8 space-y-5">
        <!-- Header Visual Badge -->
        <div class="relative w-16 h-16 mx-auto flex items-center justify-center">
          <div class="absolute inset-0 rounded-2xl bg-blue-100 animate-ping opacity-25"></div>
          <div class="relative z-10 w-16 h-16 rounded-2xl bg-blue-50 border-2 border-brand-blue text-brand-blue flex items-center justify-center text-2xl font-extrabold shadow-sm">
            🔐
          </div>
        </div>

        <div class="space-y-1.5">
          <span id="loginReqBadge" class="text-[10px] font-extrabold uppercase tracking-wider text-brand-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            Akses Terproteksi Akun
          </span>
          <h3 id="loginReqTitle" class="text-xl font-extrabold text-slate-900 mt-2">
            Silakan Login ke Web Terlebih Dahulu
          </h3>
          <p id="loginReqDesc" class="text-xs text-slate-500 leading-relaxed px-2">
            Untuk mengakses kurasi materi belajar <strong>Learn</strong> dan produk digital <strong>Store</strong>, silakan masuk atau daftarkan akun CONFindo Anda.
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-2.5 pt-2">
          <!-- Primary: Go to Login Page -->
          <a 
            id="loginReqGoLoginBtn" 
            href="${prefix}login/index.html" 
            class="block w-full py-3.5 rounded-xl bg-[#0B5796] hover:bg-[#084375] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>🔑 Masuk ke Akun Saya (Login)</span>
            <span>→</span>
          </a>

          <!-- Quick 1-Click Demo Login -->
          <button 
            type="button" 
            id="loginReqQuickDemoBtn" 
            onclick="window.quickDemoLoginAndRedirect('learn', '${prefix}')"
            class="w-full py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-brand-blue text-xs font-bold transition-all flex items-center justify-center gap-1.5"
          >
            <span>⚡ Masuk Cepat Demo (1-Klik Siswa)</span>
          </button>

          <!-- Register Link -->
          <div class="pt-1">
            <a 
              id="loginReqRegisterLink" 
              href="${prefix}login/index.html?tab=register" 
              class="text-xs font-bold text-brand-orange hover:text-orange-700 transition-colors inline-block"
            >
              Belum punya akun? Daftar Akun Baru Gratis →
            </a>
          </div>
        </div>

        <!-- Close button / Cancel -->
        <div class="pt-2 border-t border-slate-100">
          <button 
            type="button" 
            onclick="window.closeLoginRequiredModal('${prefix}')" 
            class="text-xs text-slate-400 hover:text-slate-600 font-semibold"
          >
            ✕ Nanti Saja (Kembali ke Beranda)
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(div);

    div.addEventListener('click', (e) => {
      if (e.target === div) window.closeLoginRequiredModal(prefix);
    });
  }

  // Global Auth Check & Interceptor
  window.checkAuthNav = function (event, target, prefix = './') {
    const user = window.confApi ? window.confApi.getCurrentUser() : null;
    if (!user) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      window.showLoginRequiredModal(target, prefix);
      return false;
    }
    return true;
  };

  window.showLoginRequiredModal = function (target = 'learn', prefix = './', customTitle, customDesc) {
    injectLoginRequiredModal();
    const modal = document.getElementById('loginRequiredModal');
    if (!modal) return;

    const titleEl = document.getElementById('loginReqTitle');
    const descEl = document.getElementById('loginReqDesc');
    const badgeEl = document.getElementById('loginReqBadge');
    const goLoginBtn = document.getElementById('loginReqGoLoginBtn');
    const quickBtn = document.getElementById('loginReqQuickDemoBtn');
    const regLink = document.getElementById('loginReqRegisterLink');

    if (target === 'learn') {
      badgeEl.innerText = 'Materi Belajar Terproteksi';
      titleEl.innerText = customTitle || 'Login untuk Membuka Halaman Learn';
      descEl.innerHTML = customDesc || 'Seluruh kurasi video tutorial YouTube, panduan vokal, dan struktur public speaking eksklusif hanya dapat diakses oleh akun terdaftar CONFindo.';
    } else if (target === 'store') {
      badgeEl.innerText = 'Store Digital Terproteksi';
      titleEl.innerText = customTitle || 'Login untuk Membuka Store Digital';
      descEl.innerHTML = customDesc || 'Katalog buku PDF, template slide PowerPoint asli, dan toolkit persiapan interview memerlukan akun aktif untuk mengaitkan lisensi dan akses unduhan resmi Anda.';
    } else if (target === 'checkout') {
      badgeEl.innerText = 'Checkout Terproteksi';
      titleEl.innerText = customTitle || 'Login untuk Membeli Produk Digital';
      descEl.innerHTML = customDesc || 'Silakan masuk atau daftar akun terlebih dahulu agar pesanan dan lisensi berkas digital Anda dapat tersimpan di akun Anda.';
    } else {
      badgeEl.innerText = 'Akses Terproteksi Akun';
      titleEl.innerText = customTitle || 'Silakan Login ke Web Terlebih Dahulu';
      descEl.innerHTML = customDesc || 'Silakan masuk ke akun CONFindo Anda untuk melanjutkan.';
    }

    if (goLoginBtn) goLoginBtn.href = `${prefix}login/index.html?redirect=${target}`;
    if (quickBtn) quickBtn.setAttribute('onclick', `window.quickDemoLoginAndRedirect('${target}', '${prefix}')`);
    if (regLink) regLink.href = `${prefix}login/index.html?tab=register&redirect=${target}`;

    modal.classList.remove('hidden');
  };

  window.closeLoginRequiredModal = function (prefix = './') {
    const modal = document.getElementById('loginRequiredModal');
    if (modal) modal.classList.add('hidden');
    const path = window.location.pathname.replace(/\\/g, '/');
    if (path.includes('/learn/') || path.includes('/store/')) {
      window.location.href = `${prefix}index.html`;
    }
  };

  window.quickDemoLoginAndRedirect = function (target = 'learn', prefix = './') {
    if (window.confApi) {
      const res = window.confApi.login('dimas@example.com', 'user123');
      if (res.success) {
        if (window.confAudio) confAudio.playSuccess();
        if (target === 'learn') {
          window.location.href = `${prefix}learn/index.html`;
        } else if (target === 'store') {
          window.location.href = `${prefix}store/index.html`;
        } else if (target === 'checkout') {
          window.location.reload();
        } else {
          window.location.reload();
        }
        return;
      }
    }
    window.location.href = `${prefix}login/index.html?redirect=${target}`;
  };

  // Init on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    renderNavbar();
    renderFooter();
    injectSearchModal();
    injectLoginRequiredModal();
  });
})();

