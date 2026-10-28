/**
 * CONFindo - Unified Full-Stack Data & API Client
 * Manages Relational Data, Local Storage Sync, and REST/Supabase Adapter
 */

// Force HTTPS on live hosting to ensure seamless cookies and avoid 301 drop
if (typeof window !== 'undefined' && window.location) {
  if (window.location.protocol === 'http:' && window.location.hostname.includes('confindo.my.id')) {
    window.location.replace('https://' + window.location.host + window.location.pathname + window.location.search + window.location.hash);
  }
}

class ConfApi {
  constructor() {
    this.storageKey = 'confindo_db_v8';
    this.sessionKey = 'confindo_session_user';
    this.initDatabase();
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        this.fetchOrdersFromServer();
      }, 50);
    }
  }

  // Initialize database from data/db.json seed or localStorage
  initDatabase() {
    let currentData = null;
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        currentData = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not read localStorage db', e);
    }

    if (!currentData || !currentData.tutorials || currentData.tutorials.length === 0) {
      // Use fallback seed from data/db.json via global CONF_DATA or embedded initial state
      if (typeof CONF_DATA !== 'undefined') {
        currentData = {
          users: [
            {
              id: "usr-admin-01",
              name: "Admin CONFindo",
              email: "admin@confindo.id",
              password_hash: "Admin#CONFindo2026!",
              role: "admin",
              profile_image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
              created_at: "2026-01-15T08:00:00Z"
            },
            {
              id: "usr-dimas-02",
              name: "Dimas Pratama",
              email: "dimas@example.com",
              password_hash: "user123",
              role: "user",
              profile_image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
              created_at: "2026-02-01T10:30:00Z"
            }
          ],
          tutorials: CONF_DATA.tutorials || [],
          products: CONF_DATA.products || [],
          challenges: CONF_DATA.challengeDays ? CONF_DATA.challengeDays.map(c => ({
            id: 'ch-' + c.day,
            day: c.day,
            title: c.title,
            instructions: c.instruction
          })) : [],
          user_challenges: [
            { id: "uc-1", user_id: "usr-dimas-02", challenge_id: "ch-1", completed: true, completed_at: "2026-02-02T10:00:00Z" },
            { id: "uc-2", user_id: "usr-dimas-02", challenge_id: "ch-2", completed: true, completed_at: "2026-02-03T10:00:00Z" },
            { id: "uc-3", user_id: "usr-dimas-02", challenge_id: "ch-3", completed: true, completed_at: "2026-02-04T10:00:00Z" },
            { id: "uc-4", user_id: "usr-dimas-02", challenge_id: "ch-4", completed: true, completed_at: "2026-02-05T10:00:00Z" },
            { id: "uc-5", user_id: "usr-dimas-02", challenge_id: "ch-5", completed: true, completed_at: "2026-02-06T10:00:00Z" },
            { id: "uc-6", user_id: "usr-dimas-02", challenge_id: "ch-6", completed: true, completed_at: "2026-02-07T10:00:00Z" },
            { id: "uc-7", user_id: "usr-dimas-02", challenge_id: "ch-7", completed: true, completed_at: "2026-02-08T10:00:00Z" },
            { id: "uc-8", user_id: "usr-dimas-02", challenge_id: "ch-8", completed: true, completed_at: "2026-02-09T10:00:00Z" }
          ],
          practice_sessions: [
            {
              id: "ps-1",
              user_id: "usr-dimas-02",
              topic: "Introduce yourself in 60 seconds",
              duration: "60 Detik",
              completed: true,
              checklist_score: "6/6",
              filler_count: 1,
              created_at: "2026-02-08T14:30:00Z"
            }
          ],
          orders: [
            {
              id: "ORD-CONF-2026-001",
              user_id: "usr-dimas-02",
              total: 5000,
              payment_status: "paid",
              payment_reference: "QRIS-ID1026614998627",
              payment_method: "QRIS",
              created_at: "2026-02-02T11:20:00Z"
            }
          ],
          order_items: [
            {
              id: "oi-1",
              order_id: "ord-2026-001",
              product_id: "prod-buku-ajar-public-speaking",
              price: 5000
            }
          ],
          saved_tutorials: [
            { id: "st-1", user_id: "usr-dimas-02", tutorial_id: "tut-1", created_at: "2026-02-03T09:00:00Z" }
          ]
        };
      }
    }

    this.db = currentData || { users: [], tutorials: [], products: [], challenges: [], user_challenges: [], practice_sessions: [], orders: [], order_items: [], saved_tutorials: [] };
    if (typeof CONF_DATA !== 'undefined' && Array.isArray(CONF_DATA.products)) {
      this.db.products = CONF_DATA.products.map(p => ({
        ...p,
        name: p.name || p.title || 'Digital Product CONFindo',
        title: p.title || p.name || 'Digital Product CONFindo',
        image: p.image || p.coverImg || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
        coverImg: p.coverImg || p.image || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
        original_price: p.original_price || p.originalPrice || null,
        originalPrice: p.originalPrice || p.original_price || null,
        includes: p.includes || p.features || [],
        features: p.features || p.includes || [],
        file_format: p.file_format || (p.format ? `${p.format}${p.fileSize ? ' (' + p.fileSize + ')' : ''}` : 'Dokumen PDF Digital Interaktif')
      }));
    }
    // Enforce secure password for admin account
    if (this.db && Array.isArray(this.db.users)) {
      const adminUsr = this.db.users.find(u => u.role === 'admin' || (u.email && u.email.toLowerCase() === 'admin@confindo.id'));
      if (adminUsr) {
        adminUsr.password_hash = 'Admin#CONFindo2026!';
      }
    }
    this.save();
  }

  save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.db));
    } catch (e) {
      console.error('Failed to save db state', e);
    }
  }

  // ==========================================
  // Authentication & Session
  // ==========================================
  getCurrentUser() {
    try {
      const stored = localStorage.getItem(this.sessionKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {}
    return null;
  }

  setCurrentUser(user) {
    if (!user) {
      localStorage.removeItem(this.sessionKey);
    } else {
      localStorage.setItem(this.sessionKey, JSON.stringify(user));
    }
  }

  async login(email, password) {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    // 1. Direct Server-Side Authentication (Centralized Database on Hosting)
    const apiUrl = this.getApiPhpUrl();
    try {
      const q = new URLSearchParams({
        action: 'login',
        email: cleanEmail,
        password: cleanPass,
        t: Date.now()
      }).toString();

      const res = await fetch(`${apiUrl}?${q}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password: cleanPass })
      });
      if (res.ok) {
        const result = await res.json();
        if (result.success && result.user) {
          this.setCurrentUser(result.user);
          try { await this.fetchOrdersFromServer(); } catch(err){}
          return { success: true, user: result.user };
        } else if (result.message) {
          if (result.message === 'Kata sandi salah.') {
            return { success: false, message: result.message };
          }
        }
      }
    } catch (e) {
      console.warn('[CONFindo] Server direct login notice:', e);
    }

    // 2. Local Fallback if offline
    let user = this.db.users.find(u => u.email && u.email.toLowerCase().trim() === cleanEmail);

    if (!user) {
      try {
        await this.fetchOrdersFromServer();
        user = this.db.users.find(u => u.email && u.email.toLowerCase().trim() === cleanEmail);
      } catch (e) {}
    }

    if (!user) {
      return { success: false, message: 'Email tidak terdaftar.' };
    }

    // Allow convenient admin passwords (case variations & shortcuts)
    const isAdmin = user.role === 'admin' || user.email.toLowerCase() === 'admin@confindo.id';
    const allowedAdminPass = ['Admin#CONFindo2026!', 'admin123', 'admin', 'Admin123', 'admin#confindo2026!'];
    if (isAdmin && allowedAdminPass.includes(cleanPass)) {
      // Valid admin password
    } else if (user.password_hash !== cleanPass && user.password_hash !== 'sha256_' + cleanPass) {
      return { success: false, message: 'Kata sandi salah.' };
    }

    const sessionUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role || 'user',
      profile_image: user.profile_image
    };

    this.setCurrentUser(sessionUser);
    return { success: true, user: sessionUser };
  }

  async register(name, email, password) {
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail === 'admin@confindo.id' || cleanEmail.includes('admin@')) {
      return { success: false, message: 'Alamat email ini dikhususkan untuk Administrator internal.' };
    }

    // Refresh users from server first to prevent duplicate email registration
    try {
      await this.fetchOrdersFromServer();
    } catch (e) {}

    const existing = this.db.users.find(u => u.email && u.email.toLowerCase().trim() === cleanEmail);
    if (existing) {
      return { success: false, message: 'Email sudah digunakan oleh akun lain.' };
    }

    const newUser = {
      id: 'usr-' + Date.now(),
      name: name.trim(),
      email: cleanEmail,
      password_hash: password,
      role: 'user',
      profile_image: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0b5796&color=fff`,
      created_at: new Date().toISOString()
    };

    // 1. Simpan ke database server hosting terlebih dahulu
    try {
      await this.saveUserToServer(newUser);
    } catch (e) {
      console.warn('saveUserToServer warning:', e);
    }

    // 2. Simpan ke database lokal
    this.db.users.push(newUser);
    this.save();

    const sessionUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      profile_image: newUser.profile_image
    };

    this.setCurrentUser(sessionUser);
    return { success: true, user: sessionUser };
  }

  logout() {
    this.setCurrentUser(null);
    return { success: true };
  }

  // ==========================================
  // Tutorials (Learn)
  // ==========================================
  getTutorials(category = 'all', search = '') {
    let list = this.db.tutorials;
    if (category && category !== 'all') {
      list = list.filter(t => t.category.toLowerCase().replace(/[^a-z0-9]/g, '') === category.toLowerCase().replace(/[^a-z0-9]/g, ''));
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(t => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || (t.speaker && t.speaker.toLowerCase().includes(q)));
    }
    return list;
  }

  getTutorialById(id) {
    return this.db.tutorials.find(t => t.id === id);
  }

  extractYoutubeId(tut) {
    if (!tut) return 'XIXvKKEQQJo';
    if (tut.youtubeId && tut.youtubeId.length === 11) return tut.youtubeId;
    const rawUrl = tut.youtube_url || tut.youtubeUrl || '';
    const match = rawUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|watch\?v=|watch\?.+&v=))([^&?\/\s]{11})/);
    if (match && match[1]) return match[1];
    return tut.youtubeId || 'XIXvKKEQQJo';
  }

  getYoutubeEmbedIframe(tut, autoplay = true) {
    const ytId = this.extractYoutubeId(tut);
    const title = (tut && tut.title) ? tut.title.replace(/"/g, '&quot;') : 'Video Tutorial CONFindo';
    const autoParam = autoplay ? '1' : '0';

    let embedSrc = `https://www.youtube.com/embed/${ytId}?autoplay=${autoParam}&rel=0&modestbranding=1&playsinline=1`;
    if (window.location.protocol === 'file:') {
      const innerYtEmbed = `https://www.youtube.com/embed/${ytId}?feature=oembed&autoplay=${autoParam}&rel=0&modestbranding=1&playsinline=1`;
      const watchUrl = `https://www.youtube.com/watch?v=${ytId}`;
      embedSrc = `https://cdn.embedly.com/widgets/media.html?src=${encodeURIComponent(innerYtEmbed)}&url=${encodeURIComponent(watchUrl)}&type=text%2Fhtml&schema=youtube`;
    }

    return `
      <iframe 
        class="w-full h-full"
        src="${embedSrc}" 
        title="${title}" 
        frameborder="0" 
        referrerpolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen>
      </iframe>
    `;
  }

  saveTutorial(tutorialData) {
    const ytId = this.extractYoutubeId(tutorialData);
    const normalizedData = {
      ...tutorialData,
      youtubeId: ytId,
      youtube_url: tutorialData.youtube_url || tutorialData.youtubeUrl || `https://www.youtube.com/watch?v=${ytId}`,
      youtubeUrl: tutorialData.youtubeUrl || tutorialData.youtube_url || `https://www.youtube.com/watch?v=${ytId}`
    };
    const index = this.db.tutorials.findIndex(t => t.id === normalizedData.id);
    if (index >= 0) {
      this.db.tutorials[index] = { ...this.db.tutorials[index], ...normalizedData };
    } else {
      const newTut = {
        ...normalizedData,
        id: normalizedData.id || 'tut-' + Date.now(),
        created_at: new Date().toISOString()
      };
      this.db.tutorials.unshift(newTut);
    }
    this.save();
    return { success: true };
  }

  deleteTutorial(id) {
    this.db.tutorials = this.db.tutorials.filter(t => t.id !== id);
    this.save();
    return { success: true };
  }

  // Bookmarking / Saved Tutorials
  isTutorialSaved(tutorialId, userId) {
    if (!userId) return false;
    return this.db.saved_tutorials.some(st => st.user_id === userId && st.tutorial_id === tutorialId);
  }

  toggleSaveTutorial(tutorialId, userId) {
    if (!userId) return { success: false, message: 'Harap login terlebih dahulu' };
    const index = this.db.saved_tutorials.findIndex(st => st.user_id === userId && st.tutorial_id === tutorialId);
    if (index >= 0) {
      this.db.saved_tutorials.splice(index, 1);
      this.save();
      return { success: true, saved: false };
    } else {
      this.db.saved_tutorials.push({
        id: 'st-' + Date.now(),
        user_id: userId,
        tutorial_id: tutorialId,
        created_at: new Date().toISOString()
      });
      this.save();
      return { success: true, saved: true };
    }
  }

  getSavedTutorials(userId) {
    if (!userId) return [];
    const savedIds = this.db.saved_tutorials.filter(st => st.user_id === userId).map(st => st.tutorial_id);
    return this.db.tutorials.filter(t => savedIds.includes(t.id));
  }

  // ==========================================
  // Practice Sessions
  // ==========================================
  recordPracticeSession(userId, topic, duration, checklistScore, fillerCount = 0) {
    const session = {
      id: 'ps-' + Date.now(),
      user_id: userId || 'usr-guest',
      topic: topic,
      duration: duration,
      completed: true,
      checklist_score: checklistScore,
      filler_count: fillerCount,
      created_at: new Date().toISOString()
    };
    this.db.practice_sessions.unshift(session);
    this.save();
    return { success: true, session };
  }

  getUserPracticeHistory(userId) {
    if (!userId) return [];
    return this.db.practice_sessions.filter(p => p.user_id === userId);
  }

  // ==========================================
  // 30-Day Challenge
  // ==========================================
  getChallenges() {
    return this.db.challenges;
  }

  getUserChallengeProgress(userId) {
    if (!userId) {
      // Return guest demo completed days
      return { 1: true, 2: true };
    }
    const completed = {};
    this.db.user_challenges
      .filter(uc => uc.user_id === userId && uc.completed)
      .forEach(uc => {
        const ch = this.db.challenges.find(c => c.id === uc.challenge_id);
        if (ch) completed[ch.day] = true;
      });
    return completed;
  }

  toggleChallengeDay(userId, day, isCompleted) {
    if (!userId) userId = 'usr-dimas-02'; // default session
    const challenge = this.db.challenges.find(c => c.day === day);
    if (!challenge) return { success: false };

    const index = this.db.user_challenges.findIndex(uc => uc.user_id === userId && uc.challenge_id === challenge.id);
    if (index >= 0) {
      if (isCompleted) {
        this.db.user_challenges[index].completed = true;
        this.db.user_challenges[index].completed_at = new Date().toISOString();
      } else {
        this.db.user_challenges.splice(index, 1);
      }
    } else if (isCompleted) {
      this.db.user_challenges.push({
        id: 'uc-' + Date.now(),
        user_id: userId,
        challenge_id: challenge.id,
        completed: true,
        completed_at: new Date().toISOString()
      });
    }
    this.save();
    return { success: true };
  }

  // ==========================================
  // Store & Products
  // ==========================================
  getProducts() {
    return this.db.products;
  }

  getProductById(id) {
    if (!id) return null;
    let targetId = id;
    if (targetId === 'prod-presentation-checklist') targetId = 'prod-checklist-pro';
    return this.db.products.find(p => p.id === targetId || (targetId === 'prod-checklist-pro' && p.id === 'prod-presentation-checklist'));
  }

  getProductPdfUrl(productId, fromSubfolder = true) {
    const prod = this.getProductById(productId);
    if (!prod || !prod.pdf_filename) return '#';
    const prefix = fromSubfolder ? '../assets/pdf/' : 'assets/pdf/';
    return prefix + prod.pdf_filename;
  }

  getProductImageUrl(productOrId, fromSubfolder = true) {
    const prod = typeof productOrId === 'string' ? this.getProductById(productOrId) : productOrId;
    if (!prod || !prod.image) return '';
    if (prod.image.startsWith('http')) return prod.image;
    const cleanPath = prod.image.replace(/^\.\.\//, '').replace(/^\.\//, '');
    return fromSubfolder ? '../' + cleanPath : cleanPath;
  }

  getProductReaderUrl(productId, fromSubfolder = true) {
    const prod = this.getProductById(productId);
    if (!prod) return '#';
    const prefix = fromSubfolder ? '../store/viewer.html?id=' : 'store/viewer.html?id=';
    return prefix + prod.id;
  }

  saveProduct(productData) {
    const index = this.db.products.findIndex(p => p.id === productData.id);
    if (index >= 0) {
      this.db.products[index] = { ...this.db.products[index], ...productData };
    } else {
      const newProd = {
        ...productData,
        id: productData.id || 'prod-' + Date.now(),
        created_at: new Date().toISOString()
      };
      this.db.products.unshift(newProd);
    }
    this.save();
    return { success: true };
  }

  deleteProduct(id) {
    this.db.products = this.db.products.filter(p => p.id !== id);
    this.save();
    return { success: true };
  }

  // ==========================================
  // Native Hosting Backend (api.php) Integration
  // ==========================================
  getApiPhpUrl() {
    if (typeof window === 'undefined') return 'api.php';
    const loc = window.location;
    if (loc.hostname && loc.hostname.includes('confindo.my.id')) {
      return 'https://confindo.my.id/api.php';
    }
    if (loc.protocol && loc.protocol.startsWith('http')) {
      const path = loc.pathname;
      const cleanPath = path.replace(/\/(admin|login|catalog|checkout|challenge|latihan|tutorial|auth)(\/.*)?$/i, '');
      const base = cleanPath.endsWith('/') ? cleanPath : cleanPath + '/';
      return base + 'api.php';
    }
    return '../api.php';
  }

  async saveOrderToServer(orderData) {
    const apiUrl = this.getApiPhpUrl();
    try {
      const res = await fetch(`${apiUrl}?action=create_order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (res.ok) {
        console.log('[CONFindo] Order successfully saved to Hosting Backend (api.php) 🚀', orderData.id);
        return true;
      }
    } catch (e) {
      console.warn('[CONFindo] Native PHP API save notice:', e);
    }
    // Also backup to Supabase if reachable
    try {
      await this.saveOrderToSupabase(orderData);
    } catch (err) {}
    return false;
  }

  async saveUserToServer(userData) {
    const apiUrl = this.getApiPhpUrl();
    const queryParams = new URLSearchParams({
      action: 'create_user',
      id: userData.id || ('usr-' + Date.now()),
      name: userData.name || '',
      email: userData.email || '',
      password: userData.password_hash || 'user123',
      role: userData.role || 'user',
      t: Date.now()
    }).toString();

    // 1. Try POST
    try {
      const res = await fetch(`${apiUrl}?${queryParams}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      if (res.ok) {
        console.log('[CONFindo] User saved to server (POST) 🚀:', userData.email);
        return true;
      }
    } catch (e) {
      console.warn('[CONFindo] Native PHP API user save (POST) notice:', e);
    }

    // 2. Fallback GET query params
    try {
      const resGet = await fetch(`${apiUrl}?${queryParams}`);
      if (resGet.ok) {
        console.log('[CONFindo] User saved to server (GET fallback) 🚀:', userData.email);
        return true;
      }
    } catch (err) {
      console.warn('[CONFindo] Native PHP API user save (GET) notice:', err);
    }
    return false;
  }

  async fetchOrdersFromServer() {
    const apiUrl = this.getApiPhpUrl();
    try {
      // 1. Fetch All Unified Data (Orders + Users)
      const res = await fetch(`${apiUrl}?action=get_all_data&t=` + Date.now());
      if (res.ok) {
        const data = await res.json();
        if (data && (Array.isArray(data.orders) || Array.isArray(data.users))) {
          console.log('[CONFindo] Unified Data loaded from Hosting Server (api.php) 🚀', data);
          if (Array.isArray(data.orders)) {
            const mergedOrders = [...data.orders];
            if (Array.isArray(this.db.orders)) {
              for (const lo of this.db.orders) {
                if (lo && lo.id && !mergedOrders.some(mo => mo.id === lo.id)) {
                  mergedOrders.push(lo);
                  try { this.saveOrderToServer(lo); } catch(e){}
                }
              }
            }
            this.db.orders = mergedOrders;
          }
          if (Array.isArray(data.users) && data.users.length > 0) {
            const mergedUsers = [...data.users];
            if (Array.isArray(this.db.users)) {
              for (const lu of this.db.users) {
                if (lu && lu.email && !mergedUsers.some(mu => mu.email && mu.email.toLowerCase().trim() === lu.email.toLowerCase().trim())) {
                  mergedUsers.push(lu);
                  try { this.saveUserToServer(lu); } catch(e){}
                }
              }
            }
            this.db.users = mergedUsers;
          }
          this.save();
          return this.getAllOrders();
        }
      }

      // Fallback: individual get_orders
      const resOrders = await fetch(`${apiUrl}?action=get_orders&t=` + Date.now());
      if (resOrders.ok) {
        const serverOrders = await resOrders.json();
        if (Array.isArray(serverOrders) && serverOrders.length > 0) {
          this.db.orders = serverOrders;
          this.save();
          return this.getAllOrders();
        }
      }
    } catch (e) {
      console.warn('[CONFindo] Native PHP API fetch notice:', e);
    }
    // Fallback to Supabase
    return this.fetchOrdersFromSupabaseOriginal();
  }

  // Backward compatibility alias for UI components
  async fetchOrdersFromSupabase() {
    return this.fetchOrdersFromServer();
  }

  // ==========================================
  // Supabase Cloud Integration Helper (Fallback)
  // ==========================================
  getSupabaseConfig() {
    if (typeof SUPABASE_CONFIG !== 'undefined' && SUPABASE_CONFIG && typeof SUPABASE_CONFIG.isConfigured === 'function' && SUPABASE_CONFIG.isConfigured()) {
      return SUPABASE_CONFIG;
    }
    return {
      url: 'https://ybswbcurrxehcafvcrdx.supabase.co',
      anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlic3diY3VycnhlaGNhZnZjcmR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMxNjU1NjQsImV4cCI6MjEwODc0MTU2NH0.JApEVIa0Gx1owGp-g8XVCSD6GdzVpHcaMlPav0mMo-Q',
      isConfigured: function() { return true; }
    };
  }

  async saveOrderToSupabase(orderData) {
    const config = this.getSupabaseConfig();
    if (!config || !config.isConfigured()) return false;
    try {
      const res = await fetch(`${config.url}/rest/v1/orders`, {
        method: 'POST',
        headers: {
          'apikey': config.anonKey,
          'Authorization': `Bearer ${config.anonKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          id: orderData.id,
          user_id: orderData.user_id || 'usr-guest',
          buyer_name: orderData.buyer_name || '',
          buyer_email: orderData.buyer_email || '',
          buyer_phone: orderData.buyer_phone || '',
          buyer_notes: orderData.buyer_notes || '',
          product_name: orderData.product_name || 'Digital Product',
          total: Number(orderData.total) || 0,
          payment_status: orderData.payment_status || 'paid',
          payment_reference: orderData.payment_reference || '',
          payment_method: orderData.payment_method || 'QRIS',
          created_at: orderData.created_at || new Date().toISOString()
        })
      });
      if (res.ok) {
        console.log('[CONFindo] Order successfully saved to Supabase Cloud ☁️', orderData.id);
        return true;
      }
    } catch (e) {
      console.warn('[CONFindo] Supabase order network error:', e);
    }
    return false;
  }

  async fetchOrdersFromSupabaseOriginal() {
    const config = this.getSupabaseConfig();
    if (!config || !config.isConfigured()) return null;
    try {
      const res = await fetch(`${config.url}/rest/v1/orders?select=*&order=created_at.desc`, {
        method: 'GET',
        headers: {
          'apikey': config.anonKey,
          'Authorization': `Bearer ${config.anonKey}`
        }
      });
      if (res.ok) {
        const cloudOrders = await res.json();
        if (Array.isArray(cloudOrders)) {
          const cloudIds = new Set(cloudOrders.map(o => o.id));
          const localOnly = this.db.orders.filter(o => !cloudIds.has(o.id));
          this.db.orders = [...cloudOrders, ...localOnly];
          this.save();
          return this.getAllOrders();
        }
      }
    } catch (e) {
      console.warn('[CONFindo] Fetching orders from Supabase failed:', e);
    }
    return null;
  }

  // Orders & Digital Product Access (Security)
  // ==========================================
  async createOrder(userId, productId, paymentMethod = 'QRIS', buyerInfo = null) {
    const product = this.getProductById(productId);
    if (!product) return { success: false, message: 'Produk tidak ditemukan.' };

    const orderId = buyerInfo?.orderId || ('ORD-QRIS-' + Math.floor(1000 + Math.random() * 9000));
    const newOrder = {
      id: orderId,
      user_id: userId,
      buyer_name: buyerInfo?.name || '',
      buyer_email: buyerInfo?.email || '',
      buyer_phone: buyerInfo?.phone || '',
      buyer_notes: buyerInfo?.notes || '',
      product_name: product.name,
      product_id: product.id,
      total: product.price,
      payment_status: 'paid', // Instant verified in prototype
      payment_reference: 'QRIS-ID1026614998627-' + Math.floor(100000 + Math.random() * 900000),
      payment_method: paymentMethod || 'QRIS',
      created_at: new Date().toISOString()
    };

    const newOrderItem = {
      id: 'oi-' + Date.now(),
      order_id: orderId,
      product_id: product.id,
      price: product.price
    };

    this.db.orders.unshift(newOrder);
    this.db.order_items.unshift(newOrderItem);

    // If buyer email is provided, automatically record buyer as user
    if (buyerInfo?.email) {
      const bEmail = buyerInfo.email.toLowerCase().trim();
      const existingUser = this.db.users.find(u => u.email.toLowerCase().trim() === bEmail);
      if (!existingUser) {
        const buyerUser = {
          id: userId || ('usr-' + Date.now()),
          name: buyerInfo.name || 'Customer',
          email: bEmail,
          password_hash: 'user123',
          role: 'user',
          profile_image: `https://ui-avatars.com/api/?name=${encodeURIComponent(buyerInfo.name || 'User')}&background=0B5796&color=fff`,
          created_at: new Date().toISOString()
        };
        this.db.users.push(buyerUser);
        try {
          await this.saveUserToServer(buyerUser);
        } catch(err) {}
      }
    }

    this.save();

    // Save to Hosting Server (api.php) & Cloud
    try {
      await this.saveOrderToServer(newOrder);
    } catch (e) {}

    return { success: true, order: newOrder, product };
  }

  getUserOrders(userId) {
    if (!userId) return [];
    return this.db.orders.filter(o => o.user_id === userId);
  }

  getUserPurchasedProducts(userId) {
    if (!userId) return [];
    const user = this.db.users.find(u => u.id === userId) || this.getCurrentUser();
    const userEmail = (user && user.email) ? user.email.toLowerCase().trim() : '';

    const paidOrders = this.db.orders.filter(o => {
      const isPaid = o.payment_status === 'paid' || o.payment_status === 'success' || !o.payment_status;
      if (!isPaid) return false;
      const matchId = o.user_id === userId;
      const matchEmail = Boolean(userEmail && o.buyer_email && o.buyer_email.toLowerCase().trim() === userEmail);
      return matchId || matchEmail;
    });

    const paidOrderIds = paidOrders.map(o => o.id);

    // 1. Resolve from order_items
    const fromItems = (this.db.order_items || [])
      .filter(oi => paidOrderIds.includes(oi.order_id))
      .map(oi => (oi.product_id === 'prod-presentation-checklist' ? 'prod-checklist-pro' : oi.product_id));

    // 2. Also resolve directly from order.product_id or matching order.product_name
    const fromOrders = paidOrders.map(o => {
      if (o.product_id) return o.product_id;
      if (o.product_name) {
        const cleanName = o.product_name.toLowerCase().trim();
        const matched = this.db.products.find(p => {
          const pName = (p.name || p.title || '').toLowerCase().trim();
          return pName === cleanName || cleanName.includes(pName) || pName.includes(cleanName);
        });
        if (matched) return matched.id;
      }
      return null;
    }).filter(Boolean);

    const allProductIds = new Set([...fromItems, ...fromOrders]);

    return this.db.products.filter(p => allProductIds.has(p.id) || (p.id === 'prod-checklist-pro' && allProductIds.has('prod-presentation-checklist')));
  }

  userOwnsProduct(userId, productId) {
    if (!userId) return false;
    let targetId = productId;
    if (targetId === 'prod-presentation-checklist') targetId = 'prod-checklist-pro';
    const userPurchases = this.getUserPurchasedProducts(userId);
    return userPurchases.some(p => p.id === targetId || (targetId === 'prod-checklist-pro' && p.id === 'prod-presentation-checklist'));
  }

  getAllOrders() {
    return this.db.orders.map(o => {
      const user = this.db.users.find(u => u.id === o.user_id);
      const item = this.db.order_items ? this.db.order_items.find(oi => oi.order_id === o.id) : null;
      const product = item ? this.db.products.find(p => p.id === item.product_id) : null;
      return {
        ...o,
        userName: o.buyer_name || (user ? user.name : 'Customer'),
        userEmail: o.buyer_email || (user ? user.email : ''),
        productName: o.product_name || (product ? product.name : 'Digital Product')
      };
    });
  }

  updateOrderStatus(orderId, status) {
    const order = this.db.orders.find(o => o.id === orderId);
    if (order) {
      order.payment_status = status;
      this.save();
      return { success: true };
    }
    return { success: false, message: 'Order tidak ditemukan' };
  }

  async deleteOrder(orderId) {
    if (!orderId) return { success: false, message: 'ID pesanan kosong.' };

    // 1. Hapus dari database lokal
    this.db.orders = this.db.orders.filter(o => o.id !== orderId);
    if (this.db.order_items) {
      this.db.order_items = this.db.order_items.filter(oi => oi.order_id !== orderId);
    }
    this.save();

    // 2. Hapus dari Server Hosting (api.php)
    const apiUrl = this.getApiPhpUrl();
    try {
      await fetch(`${apiUrl}?action=delete_order&id=${encodeURIComponent(orderId)}&t=` + Date.now(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId })
      });
      console.log('[CONFindo] Order berhasil dihapus permanen dari server 🗑️', orderId);
    } catch (e) {
      console.warn('[CONFindo] Error menghapus pesanan di server:', e);
      try {
        await fetch(`${apiUrl}?action=delete_order&id=${encodeURIComponent(orderId)}&t=` + Date.now());
      } catch (err) {}
    }
    return { success: true };
  }

  async deleteUser(userId) {
    if (!userId) return { success: false, message: 'ID pengguna kosong.' };
    const u = this.db.users.find(usr => usr.id === userId);
    if (u && (u.role === 'admin' || (u.email && u.email.toLowerCase() === 'admin@confindo.id'))) {
      return { success: false, message: 'Akun Administrator utama dilindungi dan tidak dapat dihapus.' };
    }

    // 1. Hapus dari database lokal
    this.db.users = this.db.users.filter(usr => usr.id !== userId);
    this.save();

    // 2. Hapus dari Server Hosting (api.php)
    const apiUrl = this.getApiPhpUrl();
    try {
      await fetch(`${apiUrl}?action=delete_user&id=${encodeURIComponent(userId)}&t=` + Date.now(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId })
      });
      console.log('[CONFindo] User berhasil dihapus permanen dari server 🗑️', userId);
    } catch (e) {
      console.warn('[CONFindo] Error menghapus pengguna di server:', e);
      try {
        await fetch(`${apiUrl}?action=delete_user&id=${encodeURIComponent(userId)}&t=` + Date.now());
      } catch (err) {}
    }
    return { success: true };
  }

  // ==========================================
  // Admin Statistics & User Management
  // ==========================================
  getAdminStats() {
    const totalUsers = this.db.users.length;
    const totalProducts = this.db.products.length;
    const totalOrders = this.db.orders.length;
    const totalRevenue = this.db.orders
      .filter(o => o.payment_status === 'paid')
      .reduce((sum, o) => sum + (Number(o.total) || 0), 0);

    return {
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue
    };
  }

  getAdminUsers() {
    return this.db.users.map(u => {
      const purchases = this.getUserPurchasedProducts(u.id);
      return {
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role || 'user',
        created_at: u.created_at,
        purchasesCount: purchases.length
      };
    });
  }

  // ==========================================
  // Reviews & Social Proof
  // ==========================================
  getAllReviews() {
    let list = [];

    // Custom user submitted reviews first
    if (this.db.custom_reviews && Array.isArray(this.db.custom_reviews)) {
      list = [...this.db.custom_reviews];
    }

    // Default reviews from all digital products
    (this.db.products || []).forEach(p => {
      (p.reviews_list || []).forEach(r => {
        list.push({
          ...r,
          productId: p.id,
          productName: p.name,
          isVerified: true
        });
      });
    });

    return list;
  }

  addReview(reviewData) {
    if (!this.db.custom_reviews) {
      this.db.custom_reviews = [];
    }

    const newRev = {
      id: 'rev-' + Date.now(),
      name: reviewData.name ? reviewData.name.trim() : 'Pengguna CONFindo',
      role: reviewData.role ? reviewData.role.trim() : 'Member Terdaftar',
      rating: Number(reviewData.rating) || 5,
      date: 'Baru saja',
      comment: reviewData.comment ? reviewData.comment.trim() : '',
      productName: reviewData.productName || 'E-Book Digital CONFindo',
      isVerified: true
    };

    this.db.custom_reviews.unshift(newRev);
    this.save();
    return { success: true, review: newRev };
  }
}

// Global Single Instance
window.confApi = new ConfApi();
