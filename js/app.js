/**
 * CONFindo - Main Application Logic
 * Self-learning Public Speaking Platform
 */

class ConfApp {
  constructor() {
    this.state = {
      user: null,
      bookmarks: [],
      completedChallenges: {},
      purchases: [],
      practiceHistory: [],
      activeCategory: 'all',
      // 1 Minute Speaking State
      speakingTimer: {
        duration: 60,
        timeLeft: 60,
        isRunning: false,
        intervalId: null,
        activeTopic: null
      },
      // Speech Timer Tool State
      speechTimer: {
        totalTime: 300,
        timeLeft: 300,
        isRunning: false,
        intervalId: null
      },
      // Filler words counts
      fillerCounts: {
        eee: 0,
        emm: 0,
        anu: 0,
        like: 0,
        jadi: 0,
        lainnya: 0
      }
    };

    this.init();
  }

  init() {
    this.loadStateFromStorage();
    this.bindGlobalEvents();
    this.renderRoadmap();
    this.renderCategoryFilter();
    this.renderTutorials();
    this.initPracticeSection();
    this.initToolsSection();
    this.renderStore();
    this.renderFreeResources();
    this.render30DayChallenge();
    this.renderTestimonials();
    this.updateDashboardUI();
    this.checkScrollNavbar();
  }

  // ==========================================
  // Storage & State Persistence
  // ==========================================
  loadStateFromStorage() {
    try {
      const storedUser = localStorage.getItem('confindo_user');
      if (storedUser) {
        this.state.user = JSON.parse(storedUser);
      } else {
        // Default guest / demo user
        this.state.user = {
          name: 'Tamu Pembelajar',
          email: 'guest@confindo.id',
          isLoggedIn: false,
          streakDays: 3,
          points: 120
        };
      }

      const storedBookmarks = localStorage.getItem('confindo_bookmarks');
      if (storedBookmarks) {
        this.state.bookmarks = JSON.parse(storedBookmarks);
      }

      const storedChallenges = localStorage.getItem('confindo_challenges');
      if (storedChallenges) {
        this.state.completedChallenges = JSON.parse(storedChallenges);
      } else {
        // Pre-mark Day 1 & Day 2 for nice initial demo feel
        this.state.completedChallenges = { 1: true, 2: true };
      }

      const storedPurchases = localStorage.getItem('confindo_purchases');
      if (storedPurchases) {
        this.state.purchases = JSON.parse(storedPurchases);
      }

      const storedHistory = localStorage.getItem('confindo_history');
      if (storedHistory) {
        this.state.practiceHistory = JSON.parse(storedHistory);
      }
    } catch (e) {
      console.error('Failed to load localStorage', e);
    }
  }

  saveState() {
    try {
      localStorage.setItem('confindo_user', JSON.stringify(this.state.user));
      localStorage.setItem('confindo_bookmarks', JSON.stringify(this.state.bookmarks));
      localStorage.setItem('confindo_challenges', JSON.stringify(this.state.completedChallenges));
      localStorage.setItem('confindo_purchases', JSON.stringify(this.state.purchases));
      localStorage.setItem('confindo_history', JSON.stringify(this.state.practiceHistory));
    } catch (e) {
      console.error('Failed to save localStorage', e);
    }
    this.updateDashboardUI();
  }

  // ==========================================
  // Navigation & UI Events
  // ==========================================
  bindGlobalEvents() {
    // Sticky navbar on scroll
    window.addEventListener('scroll', () => this.checkScrollNavbar());

    // Mobile menu toggle
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
    }

    // Close mobile menu when links are clicked
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (mobileMenu) mobileMenu.classList.add('hidden');
      });
    });

    // Keyboard shortcut for search (Cmd+K or Ctrl+K)
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        this.openSearchModal();
      }
      if (e.key === 'Escape') {
        this.closeAllModals();
      }
    });

    // Global Search button
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
      searchBtn.addEventListener('click', () => this.openSearchModal());
    }

    // Auth Buttons
    const authBtn = document.getElementById('navAuthBtn');
    if (authBtn) {
      authBtn.addEventListener('click', () => {
        if (this.state.user && this.state.user.isLoggedIn) {
          this.openDashboardModal();
        } else {
          this.openAuthModal();
        }
      });
    }

    // Modal background close
    document.querySelectorAll('.modal-container').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeAllModals();
        }
      });
    });
  }

  checkScrollNavbar() {
    const navbar = document.getElementById('mainNavbar');
    if (!navbar) return;
    if (window.scrollY > 20) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  }

  showToast(message, type = 'success') {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-item ${type}`;

    let icon = `<svg class="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`;
    if (type === 'warning') {
      icon = `<svg class="w-5 h-5 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`;
    } else if (type === 'error') {
      icon = `<svg class="w-5 h-5 text-rose-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`;
    }

    toast.innerHTML = `
      ${icon}
      <div class="text-sm font-medium text-slate-100 flex-1">${message}</div>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  closeAllModals() {
    document.querySelectorAll('.modal-container').forEach(m => m.classList.add('hidden'));
    // Stop YouTube video if modal closed
    const ytContainer = document.getElementById('youtubeIframeContainer');
    if (ytContainer) ytContainer.innerHTML = '';
  }

  // ==========================================
  // Section 3: Roadmap
  // ==========================================
  renderRoadmap() {
    const container = document.getElementById('roadmapGrid');
    if (!container) return;

    const steps = [
      {
        num: '01',
        title: 'Understand',
        tagline: 'Kenali dasar-dasar public speaking',
        desc: 'Pahami pola pikir pembicara percaya diri, anatomi struktur bicara, dan psikologi mengatasi demam panggung.',
        icon: `<svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>`,
        badge: 'Tahap 1'
      },
      {
        num: '02',
        title: 'Prepare',
        tagline: 'Mempersiapkan materi dan presentasi',
        desc: 'Susun outline gagasan, formula pembuka (hook), slide visual yang bersih, serta antisipasi pertanyaan audiens.',
        icon: `<svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`,
        badge: 'Tahap 2'
      },
      {
        num: '03',
        title: 'Practice',
        tagline: 'Latih suara, ekspresi, dan bahasa tubuh',
        desc: 'Gunakan latihan 1 menit mandiri, kendalikan tempo bicara, hilangkan filler words, dan latih kontak mata.',
        icon: `<svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z"/></svg>`,
        badge: 'Tahap 3'
      },
      {
        num: '04',
        title: 'Perform',
        tagline: 'Terapkan dalam berbagai situasi nyata',
        desc: 'Tampil tenang dan percaya diri dalam presentasi kuliah, interview kerja, rapat kantor, hingga speech seminar.',
        icon: `<svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>`,
        badge: 'Tahap 4'
      }
    ];

    container.innerHTML = steps.map(s => `
      <div class="relative bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-sm card-hover flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 font-extrabold text-lg shadow-sm">
              ${s.num}
            </span>
            <span class="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
              ${s.badge}
            </span>
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-1">${s.title}</h3>
          <p class="text-sm font-semibold text-blue-600 mb-3">${s.tagline}</p>
          <p class="text-slate-600 text-sm leading-relaxed">${s.desc}</p>
        </div>
        <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <a href="#learn" class="text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors">
            Jelajahi Materi
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </a>
          <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
        </div>
      </div>
    `).join('');
  }

  // ==========================================
  // Section 4: Learn (Tutorials & YouTube)
  // ==========================================
  renderCategoryFilter() {
    const container = document.getElementById('tutorialCategoryTabs');
    if (!container) return;

    container.innerHTML = CONF_DATA.categories.map(cat => `
      <button 
        type="button" 
        data-cat-id="${cat.id}"
        class="cat-tab-btn px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
          this.state.activeCategory === cat.id 
            ? 'bg-blue-600 text-white shadow-sm' 
            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
        }"
      >
        ${cat.name}
      </button>
    `).join('');

    container.querySelectorAll('.cat-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const catId = e.currentTarget.getAttribute('data-cat-id');
        this.state.activeCategory = catId;
        this.renderCategoryFilter();
        this.renderTutorials();
      });
    });
  }

  renderTutorials() {
    const grid = document.getElementById('tutorialsGrid');
    if (!grid) return;

    let items = CONF_DATA.tutorials;
    if (this.state.activeCategory !== 'all') {
      items = items.filter(t => t.category === this.state.activeCategory);
    }

    if (items.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
          <p class="text-slate-500 font-medium">Materi untuk kategori ini segera ditambahkan.</p>
          <button type="button" class="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg" onclick="confApp.setCategory('all')">Lihat Semua Kategori</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map(tut => {
      const isSaved = this.state.bookmarks.includes(tut.id);
      return `
        <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm card-hover flex flex-col justify-between group">
          <div>
            <div class="relative overflow-hidden aspect-video bg-slate-900 cursor-pointer" onclick="confApp.openVideoModal('${tut.id}')">
              <img src="${tut.thumbnail}" alt="${tut.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" loading="lazy">
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-center justify-center">
                <div class="w-12 h-12 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-blue-600 transition-all">
                  <svg class="w-5 h-5 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
              <span class="absolute bottom-3 right-3 text-[11px] font-bold bg-black/80 text-white px-2 py-0.5 rounded backdrop-blur-sm">
                ${tut.duration}
              </span>
              <span class="absolute top-3 left-3 text-[11px] font-semibold bg-white/90 text-slate-800 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                ${tut.categoryName}
              </span>
            </div>

            <div class="p-5">
              <div class="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span class="font-medium truncate max-w-[200px] text-slate-600">${tut.speaker}</span>
                <span class="text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-semibold text-[10px]">${tut.level}</span>
              </div>
              <h4 class="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2 cursor-pointer" onclick="confApp.openVideoModal('${tut.id}')">
                ${tut.title}
              </h4>
              <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                ${tut.description}
              </p>
            </div>
          </div>

          <div class="px-5 pb-5 pt-0 flex items-center justify-between border-t border-slate-100 pt-3">
            <button 
              type="button" 
              onclick="confApp.openVideoModal('${tut.id}')"
              class="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group/btn"
            >
              Watch Tutorial 
              <span class="group-hover/btn:translate-x-1 transition-transform">→</span>
            </button>
            <button 
              type="button" 
              onclick="confApp.toggleBookmark('${tut.id}', event)"
              class="text-slate-400 hover:text-blue-600 p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
              title="${isSaved ? 'Hapus dari Tersimpan' : 'Simpan Materi'}"
            >
              <svg class="w-4 h-4 ${isSaved ? 'text-blue-600 fill-current' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  setCategory(catId) {
    this.state.activeCategory = catId;
    this.renderCategoryFilter();
    this.renderTutorials();
  }

  toggleBookmark(tutId, event) {
    if (event) event.stopPropagation();
    const idx = this.state.bookmarks.indexOf(tutId);
    if (idx > -1) {
      this.state.bookmarks.splice(idx, 1);
      this.showToast('Materi dihapus dari daftar tersimpan');
    } else {
      this.state.bookmarks.push(tutId);
      this.showToast('Materi berhasil disimpan ke Dashboard!');
    }
    this.saveState();
    this.renderTutorials();
  }

  openVideoModal(tutId) {
    const tut = CONF_DATA.tutorials.find(t => t.id === tutId);
    if (!tut) return;

    const modal = document.getElementById('videoModal');
    const container = document.getElementById('youtubeIframeContainer');
    const title = document.getElementById('videoModalTitle');
    const speaker = document.getElementById('videoModalSpeaker');
    const desc = document.getElementById('videoModalDesc');
    const takeaways = document.getElementById('videoModalTakeaways');
    const externalLink = document.getElementById('videoModalExternalLink');
    const markCompleteBtn = document.getElementById('videoModalMarkBtn');

    if (!modal) return;

    title.innerText = tut.title;
    speaker.innerText = `${tut.speaker} • ${tut.duration}`;
    desc.innerText = tut.description;
    if (externalLink) externalLink.classList.add('hidden');

    // Embed YouTube directly
    let embedSrc = `https://www.youtube.com/embed/${tut.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
    if (window.location.protocol === 'file:') {
      const innerYtEmbed = `https://www.youtube.com/embed/${tut.youtubeId}?feature=oembed&autoplay=1&rel=0&modestbranding=1&playsinline=1`;
      const watchUrl = `https://www.youtube.com/watch?v=${tut.youtubeId}`;
      embedSrc = `https://cdn.embedly.com/widgets/media.html?src=${encodeURIComponent(innerYtEmbed)}&url=${encodeURIComponent(watchUrl)}&type=text%2Fhtml&schema=youtube`;
    }
    container.innerHTML = `
      <iframe 
        class="w-full h-full"
        src="${embedSrc}" 
        title="${tut.title}" 
        frameborder="0" 
        referrerpolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen>
      </iframe>
    `;

    // Takeaways
    takeaways.innerHTML = tut.takeaways.map(t => `
      <li class="flex items-start gap-2.5 text-xs md:text-sm text-slate-700">
        <svg class="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
        <span>${t}</span>
      </li>
    `).join('');

    // Mark complete status
    const isCompleted = this.state.bookmarks.includes(tut.id);
    markCompleteBtn.innerHTML = isCompleted ? '✓ Tersimpan di Dashboard' : '+ Simpan ke Dashboard';
    markCompleteBtn.onclick = () => {
      this.toggleBookmark(tut.id);
      const updated = this.state.bookmarks.includes(tut.id);
      markCompleteBtn.innerHTML = updated ? '✓ Tersimpan di Dashboard' : '+ Simpan ke Dashboard';
    };

    modal.classList.remove('hidden');
  }

  // ==========================================
  // Section 5: Practice (Interactive Features)
  // ==========================================
  initPracticeSection() {
    // Generate initial random topic
    this.generateNewPracticeTopic(false);

    // Topic Generator Button
    const newTopicBtn = document.getElementById('generateTopicBtn');
    if (newTopicBtn) {
      newTopicBtn.addEventListener('click', () => {
        confAudio.playClick();
        this.generateNewPracticeTopic(true);
      });
    }

    // 1-Minute Timer Controls
    const startTimerBtn = document.getElementById('startSpeakingBtn');
    const pauseTimerBtn = document.getElementById('pauseSpeakingBtn');
    const resetTimerBtn = document.getElementById('resetSpeakingBtn');

    if (startTimerBtn) startTimerBtn.addEventListener('click', () => this.startSpeakingTimer());
    if (pauseTimerBtn) pauseTimerBtn.addEventListener('click', () => this.pauseSpeakingTimer());
    if (resetTimerBtn) resetTimerBtn.addEventListener('click', () => this.resetSpeakingTimer());

    // Practice Checklist items
    document.querySelectorAll('.practice-chk').forEach(chk => {
      chk.addEventListener('change', () => this.updatePracticeChecklistScore());
    });

    const resetChecklistBtn = document.getElementById('resetPracticeChecklistBtn');
    if (resetChecklistBtn) {
      resetChecklistBtn.addEventListener('click', () => {
        document.querySelectorAll('.practice-chk').forEach(c => c.checked = false);
        this.updatePracticeChecklistScore();
        this.showToast('Checklist telah direset');
      });
    }
  }

  generateNewPracticeTopic(animate = true) {
    const topics = CONF_DATA.practiceTopics;
    const randomIndex = Math.floor(Math.random() * topics.length);
    const selected = topics[randomIndex];
    this.state.speakingTimer.activeTopic = selected;

    const titleEl = document.getElementById('practiceTopicTitle');
    const promptEl = document.getElementById('practiceTopicPrompt');
    const catEl = document.getElementById('practiceTopicCat');

    if (titleEl && promptEl) {
      if (animate) {
        titleEl.classList.add('opacity-0');
        promptEl.classList.add('opacity-0');
        setTimeout(() => {
          titleEl.innerText = selected.title;
          promptEl.innerText = selected.prompt;
          if (catEl) catEl.innerText = selected.category;
          titleEl.classList.remove('opacity-0');
          promptEl.classList.remove('opacity-0');
        }, 150);
      } else {
        titleEl.innerText = selected.title;
        promptEl.innerText = selected.prompt;
        if (catEl) catEl.innerText = selected.category;
      }
    }
  }

  startSpeakingTimer() {
    if (this.state.speakingTimer.isRunning) return;

    confAudio.playStart();
    this.state.speakingTimer.isRunning = true;

    // UI Updates
    const startBtn = document.getElementById('startSpeakingBtn');
    const pauseBtn = document.getElementById('pauseSpeakingBtn');
    const waveContainer = document.getElementById('audioWaveVisualizer');

    if (startBtn) startBtn.classList.add('hidden');
    if (pauseBtn) pauseBtn.classList.remove('hidden');
    if (waveContainer) waveContainer.classList.add('speaking-active');

    this.state.speakingTimer.intervalId = setInterval(() => {
      this.state.speakingTimer.timeLeft--;
      this.updateSpeakingTimerDisplay();

      // Sound notifications at milestones
      if (this.state.speakingTimer.timeLeft === 30) {
        confAudio.playTone(600, 'sine', 0.15, 0.15); // Halfway notice
      } else if (this.state.speakingTimer.timeLeft === 10) {
        confAudio.playWarning(); // 10s countdown warning
      }

      if (this.state.speakingTimer.timeLeft <= 0) {
        this.finishSpeakingTimer();
      }
    }, 1000);
  }

  pauseSpeakingTimer() {
    if (!this.state.speakingTimer.isRunning) return;

    clearInterval(this.state.speakingTimer.intervalId);
    this.state.speakingTimer.isRunning = false;

    const startBtn = document.getElementById('startSpeakingBtn');
    const pauseBtn = document.getElementById('pauseSpeakingBtn');
    const waveContainer = document.getElementById('audioWaveVisualizer');

    if (startBtn) {
      startBtn.classList.remove('hidden');
      startBtn.innerText = 'Lanjutkan';
    }
    if (pauseBtn) pauseBtn.classList.add('hidden');
    if (waveContainer) waveContainer.classList.remove('speaking-active');
  }

  resetSpeakingTimer() {
    clearInterval(this.state.speakingTimer.intervalId);
    this.state.speakingTimer.isRunning = false;
    this.state.speakingTimer.timeLeft = 60;

    const startBtn = document.getElementById('startSpeakingBtn');
    const pauseBtn = document.getElementById('pauseSpeakingBtn');
    const waveContainer = document.getElementById('audioWaveVisualizer');

    if (startBtn) {
      startBtn.classList.remove('hidden');
      startBtn.innerText = 'Mulai Latihan';
    }
    if (pauseBtn) pauseBtn.classList.add('hidden');
    if (waveContainer) waveContainer.classList.remove('speaking-active');

    this.updateSpeakingTimerDisplay();
  }

  finishSpeakingTimer() {
    clearInterval(this.state.speakingTimer.intervalId);
    this.state.speakingTimer.isRunning = false;
    confAudio.playSuccess();

    const startBtn = document.getElementById('startSpeakingBtn');
    const pauseBtn = document.getElementById('pauseSpeakingBtn');
    const waveContainer = document.getElementById('audioWaveVisualizer');

    if (startBtn) {
      startBtn.classList.remove('hidden');
      startBtn.innerText = 'Latihan Lagi';
    }
    if (pauseBtn) pauseBtn.classList.add('hidden');
    if (waveContainer) waveContainer.classList.remove('speaking-active');

    // Record to history
    const topicTitle = this.state.speakingTimer.activeTopic ? this.state.speakingTimer.activeTopic.title : '1 Minute Speaking';
    this.recordPracticeSession('1 Minute Speaking', topicTitle, '60 Detik');

    this.showToast('🎉 Hebat! Kamu berhasil berbicara selama 1 menit penuh!');
    this.state.speakingTimer.timeLeft = 60;
    this.updateSpeakingTimerDisplay();
  }

  updateSpeakingTimerDisplay() {
    const textEl = document.getElementById('speakingTimerText');
    const circle = document.getElementById('speakingProgressCircle');
    const seconds = this.state.speakingTimer.timeLeft;

    if (textEl) {
      const mins = Math.floor(seconds / 60);
      const remSecs = seconds % 60;
      textEl.innerText = `${mins.toString().padStart(2, '0')}:${remSecs.toString().padStart(2, '0')}`;
    }

    if (circle) {
      // Circumference = 2 * PI * r = 2 * 3.14159 * 88 = 552.92
      const totalCircumference = 552.92;
      const progressFraction = (60 - seconds) / 60;
      const offset = totalCircumference * (1 - progressFraction);
      circle.style.strokeDashoffset = offset;

      if (seconds <= 10) {
        circle.classList.add('danger');
        circle.classList.remove('warning');
      } else if (seconds <= 30) {
        circle.classList.add('warning');
        circle.classList.remove('danger');
      } else {
        circle.classList.remove('warning', 'danger');
      }
    }
  }

  updatePracticeChecklistScore() {
    const checkboxes = document.querySelectorAll('.practice-chk');
    let checkedCount = 0;
    checkboxes.forEach(c => { if (c.checked) checkedCount++; });

    const scoreEl = document.getElementById('checklistScoreText');
    const feedbackEl = document.getElementById('checklistFeedbackText');

    if (scoreEl) scoreEl.innerText = `${checkedCount} / ${checkboxes.length}`;

    if (feedbackEl) {
      if (checkedCount === 6) {
        feedbackEl.innerHTML = '<span class="text-emerald-600 font-bold">Luar biasa! 6/6 kriteria terpenuhi dengan sangat baik. 🌟</span>';
      } else if (checkedCount >= 4) {
        feedbackEl.innerHTML = '<span class="text-blue-600 font-medium">Bagus sekali! Pertahankan kontak mata dan kurangi filler words.</span>';
      } else if (checkedCount >= 2) {
        feedbackEl.innerHTML = '<span class="text-amber-600 font-medium">Awal yang baik! Terus latih postur dan ritme bicara santai.</span>';
      } else {
        feedbackEl.innerHTML = '<span class="text-slate-500">Centang poin yang berhasil kamu terapkan selama latihan.</span>';
      }
    }
  }

  recordPracticeSession(type, topic, duration) {
    const session = {
      id: 'sess-' + Date.now(),
      type: type,
      topic: topic,
      duration: duration,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    this.state.practiceHistory.unshift(session);
    if (this.state.practiceHistory.length > 20) this.state.practiceHistory.pop();
    this.saveState();
  }

  // ==========================================
  // Section 6: Tools
  // ==========================================
  initToolsSection() {
    this.initSpeechTimerTool();
    this.initFillerWordTracker();
    this.initSpeechStructureBuilder();
  }

  // Tool 1: Speech Timer
  initSpeechTimerTool() {
    const displayEl = document.getElementById('speechToolTimerDisplay');
    const startBtn = document.getElementById('speechToolStartBtn');
    const pauseBtn = document.getElementById('speechToolPauseBtn');
    const resetBtn = document.getElementById('speechToolResetBtn');

    // Preset buttons
    document.querySelectorAll('.timer-preset-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const seconds = parseInt(e.currentTarget.getAttribute('data-seconds'), 10);
        this.setSpeechTimerPreset(seconds);
      });
    });

    if (startBtn) {
      startBtn.addEventListener('click', () => {
        if (this.state.speechTimer.isRunning) return;
        confAudio.playStart();
        this.state.speechTimer.isRunning = true;
        startBtn.classList.add('hidden');
        if (pauseBtn) pauseBtn.classList.remove('hidden');

        this.state.speechTimer.intervalId = setInterval(() => {
          this.state.speechTimer.timeLeft--;
          this.updateSpeechToolTimerDisplay();

          if (this.state.speechTimer.timeLeft === 10) {
            confAudio.playWarning();
          }

          if (this.state.speechTimer.timeLeft <= 0) {
            clearInterval(this.state.speechTimer.intervalId);
            this.state.speechTimer.isRunning = false;
            confAudio.playSuccess();
            this.showToast('⏱️ Waktu presentasi selesai!');
            if (startBtn) {
              startBtn.classList.remove('hidden');
              startBtn.innerText = 'Mulai';
            }
            if (pauseBtn) pauseBtn.classList.add('hidden');
            this.state.speechTimer.timeLeft = this.state.speechTimer.totalTime;
            this.updateSpeechToolTimerDisplay();
          }
        }, 1000);
      });
    }

    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        clearInterval(this.state.speechTimer.intervalId);
        this.state.speechTimer.isRunning = false;
        if (startBtn) {
          startBtn.classList.remove('hidden');
          startBtn.innerText = 'Lanjut';
        }
        pauseBtn.classList.add('hidden');
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        clearInterval(this.state.speechTimer.intervalId);
        this.state.speechTimer.isRunning = false;
        this.state.speechTimer.timeLeft = this.state.speechTimer.totalTime;
        if (startBtn) {
          startBtn.classList.remove('hidden');
          startBtn.innerText = 'Mulai';
        }
        if (pauseBtn) pauseBtn.classList.add('hidden');
        this.updateSpeechToolTimerDisplay();
      });
    }
  }

  setSpeechTimerPreset(seconds) {
    clearInterval(this.state.speechTimer.intervalId);
    this.state.speechTimer.isRunning = false;
    this.state.speechTimer.totalTime = seconds;
    this.state.speechTimer.timeLeft = seconds;

    const startBtn = document.getElementById('speechToolStartBtn');
    const pauseBtn = document.getElementById('speechToolPauseBtn');
    if (startBtn) {
      startBtn.classList.remove('hidden');
      startBtn.innerText = 'Mulai';
    }
    if (pauseBtn) pauseBtn.classList.add('hidden');

    this.updateSpeechToolTimerDisplay();
    confAudio.playClick();
  }

  updateSpeechToolTimerDisplay() {
    const el = document.getElementById('speechToolTimerDisplay');
    if (!el) return;
    const secs = this.state.speechTimer.timeLeft;
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    el.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  // Tool 2: Filler Word Tracker
  initFillerWordTracker() {
    const buttons = document.querySelectorAll('.filler-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const type = e.currentTarget.getAttribute('data-filler');
        if (type && this.state.fillerCounts[type] !== undefined) {
          this.state.fillerCounts[type]++;
          confAudio.playClick();
          e.currentTarget.classList.add('counter-tap-animate');
          setTimeout(() => e.currentTarget.classList.remove('counter-tap-animate'), 250);
          this.updateFillerUI();
        }
      });
    });

    const resetBtn = document.getElementById('resetFillerBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        Object.keys(this.state.fillerCounts).forEach(k => this.state.fillerCounts[k] = 0);
        this.updateFillerUI();
        this.showToast('Penghitung filler word direset.');
      });
    }
  }

  updateFillerUI() {
    Object.keys(this.state.fillerCounts).forEach(key => {
      const el = document.getElementById(`fillerCount_${key}`);
      if (el) el.innerText = this.state.fillerCounts[key];
    });

    const total = Object.values(this.state.fillerCounts).reduce((a, b) => a + b, 0);
    const totalEl = document.getElementById('fillerTotalCount');
    if (totalEl) totalEl.innerText = total;

    const adviceEl = document.getElementById('fillerAdviceText');
    if (adviceEl) {
      if (total === 0) {
        adviceEl.innerText = 'Klik tombol setiap kali kamu mendengar dirimu mengucapkan kata gumaman.';
      } else if (total <= 3) {
        adviceEl.innerText = 'Sangat terkendali! Jeda hening 1 detik membantumu terdengar lebih tenang.';
      } else if (total <= 8) {
        adviceEl.innerText = 'Perhatikan kata yang paling sering muncul. Tarik napas pelan sebelum pindah poin.';
      } else {
        adviceEl.innerText = 'Gantikan filler words dengan berhenti sejenak (pause). Keheningan itu wajar dan berwibawa!';
      }
    }
  }

  // Tool 3: Speech Structure Builder
  initSpeechStructureBuilder() {
    const copyBtn = document.getElementById('copySpeechScriptBtn');
    const loadSampleBtn = document.getElementById('loadSampleScriptBtn');
    const downloadBtn = document.getElementById('downloadSpeechScriptBtn');

    if (loadSampleBtn) {
      loadSampleBtn.addEventListener('click', () => {
        document.getElementById('structOpening').value = 'Pernahkah Anda merasa ide brilian Anda diabaikan dalam rapat hanya karena cara penyampaian yang kurang percaya diri? Hari ini, saya ingin menunjukkan 3 prinsip sederhana agar setiap kata yang Anda sampaikan didengar dengan sungguh-sungguh.';
        document.getElementById('structMainPoint').value = '1. Mulai dengan satu pesan kunci yang jelas.\n2. Sederhanakan bahasa—hindari istilah rumit yang membingungkan.\n3. Berikan jeda hening agar audiens sempat memproses pesan.';
        document.getElementById('structExample').value = 'Sebagai contoh, Steve Jobs saat memperkenalkan iPod tidak berkata "alat pemutar audio 5GB", melainkan "1.000 lagu di dalam saku Anda". Cerita nyata selalu mengalahkan jargon teknis.';
        document.getElementById('structConclusion').value = 'Mulai hari ini, saat Anda berbicara, fokuslah pada pendengar Anda, bukan pada kecemasan diri sendiri. Suara Anda layak untuk didengar. Terima kasih.';
        this.showToast('Contoh naskah berhasil dimuat!');
      });
    }

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const text = this.getFullSpeechText();
        if (!text.trim()) {
          this.showToast('Silakan isi naskah terlebih dahulu', 'warning');
          return;
        }
        navigator.clipboard.writeText(text).then(() => {
          this.showToast('Naskah berhasil disalin ke Clipboard! 📋');
        });
      });
    }

    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        const text = this.getFullSpeechText();
        if (!text.trim()) {
          this.showToast('Silakan isi naskah terlebih dahulu', 'warning');
          return;
        }
        this.downloadTextFile('naskah-speech-confindo.txt', text);
        this.showToast('File naskah berhasil diunduh!');
      });
    }
  }

  getFullSpeechText() {
    const opening = document.getElementById('structOpening')?.value || '';
    const main = document.getElementById('structMainPoint')?.value || '';
    const example = document.getElementById('structExample')?.value || '';
    const conclusion = document.getElementById('structConclusion')?.value || '';

    return `=== NASKAH PUBLIC SPEAKING (CONFindo Template) ===\n\n` +
           `[1. OPENING / PEMBUKAAN]\n${opening}\n\n` +
           `[2. MAIN POINTS / ISI UTAMA]\n${main}\n\n` +
           `[3. EXAMPLE / CONTOH CERITA]\n${example}\n\n` +
           `[4. CONCLUSION / PENUTUP & CTA]\n${conclusion}\n\n` +
           `Dibuat dengan CONFindo Tools • Speak with Confidence.`;
  }

  downloadTextFile(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  // ==========================================
  // Section 7: Store (CONFindo Store)
  // ==========================================
  renderStore() {
    const container = document.getElementById('storeProductsGrid');
    if (!container) return;

    container.innerHTML = CONF_DATA.products.map(prod => {
      const isOwned = this.state.purchases.includes(prod.id);
      return `
        <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm card-hover flex flex-col justify-between group">
          <div>
            <div class="relative overflow-hidden aspect-[16/10] bg-slate-100 cursor-pointer" onclick="confApp.openProductModal('${prod.id}')">
              <img src="${prod.coverImg}" alt="${prod.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
              <span class="absolute top-3 left-3 text-xs font-bold bg-blue-600 text-white px-3 py-1 rounded-full shadow-sm">
                ${prod.badge}
              </span>
              <span class="absolute bottom-3 right-3 text-[11px] font-semibold bg-white/90 text-slate-800 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                ${prod.category}
              </span>
            </div>

            <div class="p-6">
              <div class="flex items-center gap-1.5 text-xs text-amber-500 font-semibold mb-2">
                <span>★ ${prod.rating}</span>
                <span class="text-slate-400">(${prod.reviewCount} pembeli)</span>
              </div>
              <h4 class="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1 cursor-pointer" onclick="confApp.openProductModal('${prod.id}')">
                ${prod.title}
              </h4>
              <p class="text-xs text-slate-500 font-medium mb-3">${prod.subtitle}</p>
              <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                ${prod.description}
              </p>
            </div>
          </div>

          <div class="p-6 pt-0 border-t border-slate-100 pt-4 flex items-center justify-between">
            <div>
              <span class="text-[11px] text-slate-400 line-through block">Rp ${prod.originalPrice.toLocaleString('id-ID')}</span>
              <span class="text-base font-extrabold text-slate-900">Rp ${prod.price.toLocaleString('id-ID')}</span>
            </div>
            <button 
              type="button" 
              onclick="confApp.openProductModal('${prod.id}')"
              class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isOwned 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                  : 'bg-blue-600 text-white hover:bg-blue-700 btn-hover'
              }"
            >
              ${isOwned ? '✓ Sudah Dibeli' : 'View Product'}
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  openProductModal(prodId) {
    const prod = CONF_DATA.products.find(p => p.id === prodId);
    if (!prod) return;

    const modal = document.getElementById('productDetailModal');
    if (!modal) return;

    const isOwned = this.state.purchases.includes(prod.id);

    document.getElementById('modalProdTitle').innerText = prod.title;
    document.getElementById('modalProdSubtitle').innerText = prod.subtitle;
    document.getElementById('modalProdBadge').innerText = prod.badge;
    document.getElementById('modalProdImg').src = prod.coverImg;
    document.getElementById('modalProdDesc').innerText = prod.description;
    document.getElementById('modalProdFormat').innerText = `${prod.format} (${prod.fileSize})`;
    document.getElementById('modalProdOriginalPrice').innerText = `Rp ${prod.originalPrice.toLocaleString('id-ID')}`;
    document.getElementById('modalProdPrice').innerText = `Rp ${prod.price.toLocaleString('id-ID')}`;

    const featuresList = document.getElementById('modalProdFeatures');
    featuresList.innerHTML = prod.features.map(f => `
      <li class="flex items-start gap-2 text-xs md:text-sm text-slate-700">
        <svg class="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
        <span>${f}</span>
      </li>
    `).join('');

    const buyBtn = document.getElementById('modalProdBuyBtn');
    if (isOwned) {
      buyBtn.innerText = 'Unduh Produk (Sudah Dimiliki)';
      buyBtn.className = 'w-full py-3.5 rounded-xl text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all';
      buyBtn.onclick = () => {
        this.downloadProductItem(prod);
      };
    } else {
      buyBtn.innerText = `Buy Now — Rp ${prod.price.toLocaleString('id-ID')}`;
      buyBtn.className = 'w-full py-3.5 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 btn-hover transition-all';
      buyBtn.onclick = () => {
        modal.classList.add('hidden');
        this.openCheckoutModal(prod);
      };
    }

    modal.classList.remove('hidden');
  }

  openCheckoutModal(prod) {
    const modal = document.getElementById('checkoutModal');
    if (!modal) return;

    document.getElementById('checkoutProdTitle').innerText = prod.title;
    document.getElementById('checkoutProdPrice').innerText = `Rp ${prod.price.toLocaleString('id-ID')}`;
    document.getElementById('checkoutTotal').innerText = `Rp ${prod.price.toLocaleString('id-ID')}`;

    const payBtn = document.getElementById('checkoutPayBtn');
    payBtn.onclick = () => {
      this.simulatePaymentSuccess(prod);
    };

    modal.classList.remove('hidden');
  }

  simulatePaymentSuccess(prod) {
    const modal = document.getElementById('checkoutModal');
    if (modal) modal.classList.add('hidden');

    if (!this.state.purchases.includes(prod.id)) {
      this.state.purchases.push(prod.id);
    }
    this.saveState();
    this.renderStore();
    confAudio.playSuccess();

    this.showToast(`🎉 Pembayaran Berhasil! Akses ${prod.title} telah aktif.`);

    // Automatically trigger digital product download simulation
    setTimeout(() => {
      this.downloadProductItem(prod);
    }, 800);
  }

  downloadProductItem(prod) {
    const content = `========================================================\n` +
                    ` CONFINDO DIGITAL PRODUCT DOWNLOAD\n` +
                    ` Produk: ${prod.title}\n` +
                    ` Lisensi: Penggunaan Pribadi Seumur Hidup\n` +
                    `========================================================\n\n` +
                    `Terima kasih telah berinvestasi pada kemampuan bicaramu!\n\n` +
                    `DESKRIPSI:\n${prod.description}\n\n` +
                    `ISI MATERI TERMASUK:\n` +
                    prod.features.map((f, i) => `${i + 1}. ${f}`).join('\n') +
                    `\n\n--------------------------------------------------------\n` +
                    `Tautan Akses Cloud & Template Canva/PowerPoint:\n` +
                    `https://drive.confindo.id/dl/${prod.id}?token=CONF-${Date.now()}\n\n` +
                    `Jika ada pertanyaan, kunjungi https://confindo.id atau hubungi support@confindo.id.\n` +
                    `Speak with Confidence!\n`;

    this.downloadTextFile(`${prod.id}-confindo-access.txt`, content);
    this.showToast(`File panduan akses ${prod.title} telah diunduh!`);
  }

  // ==========================================
  // Section 8: Free Resources
  // ==========================================
  renderFreeResources() {
    const container = document.getElementById('freeResourcesGrid');
    if (!container) return;

    container.innerHTML = CONF_DATA.freeResources.map(res => `
      <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm card-hover flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            </span>
            <span class="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
              ${res.downloads} diunduh
            </span>
          </div>
          <h4 class="text-base font-bold text-slate-900 mb-2">${res.title}</h4>
          <p class="text-xs text-slate-600 leading-relaxed mb-4">${res.description}</p>
        </div>
        <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span class="text-[11px] font-semibold text-slate-500">${res.format}</span>
          <button 
            type="button" 
            onclick="confApp.downloadFreeResource('${res.id}')"
            class="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <span>Get Free Resource</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
          </button>
        </div>
      </div>
    `).join('');
  }

  downloadFreeResource(resId) {
    const res = CONF_DATA.freeResources.find(r => r.id === resId);
    if (!res) return;

    confAudio.playClick();
    const content = `========================================================\n` +
                    ` CONFINDO FREE LEARNING RESOURCE\n` +
                    ` Judul: ${res.title}\n` +
                    `========================================================\n\n` +
                    `Deskripsi:\n${res.description}\n\n` +
                    `PANDUAN SINGKAT DARI CONFINDO:\n` +
                    `1. Persiapan mental: Sadari bahwa gugup adalah respons biologis normal; ubah menjadi antusiasme.\n` +
                    `2. Struktur bicara: Selalu mulai dengan Hook -> Masalah -> Solusi -> Call-to-action.\n` +
                    `3. Vokal & Kecepatan: Beri jeda 1-2 detik setelah poin penting. Jangan takut hening.\n` +
                    `4. Kontak mata: Tatap audiens secara bergantian dalam blok 3 detik.\n` +
                    `5. Konsistensi: Latihan 1 menit setiap hari lebih efektif daripada 1 jam sekali sebulan.\n\n` +
                    `Selamat belajar mandiri! Kunjungi https://confindo.id untuk tools interaktif lainnya.\n`;

    this.downloadTextFile(`${res.id}-confindo-resource.txt`, content);
    this.showToast(`📥 Berhasil mengunduh "${res.title}"!`);
  }

  // ==========================================
  // Section 9: 30-Day Challenge
  // ==========================================
  render30DayChallenge() {
    const container = document.getElementById('challengeCardsGrid');
    const progressBar = document.getElementById('challengeProgressBar');
    const progressText = document.getElementById('challengeProgressText');
    const badgeText = document.getElementById('challengeBadgeText');

    if (!container) return;

    const completedCount = Object.keys(this.state.completedChallenges).filter(k => this.state.completedChallenges[k]).length;
    const percent = Math.round((completedCount / 30) * 100);

    if (progressBar) progressBar.style.width = `${percent}%`;
    if (progressText) progressText.innerText = `Day ${completedCount.toString().padStart(2, '0')} / 30`;
    if (badgeText) badgeText.innerText = `${percent}% Selesai`;

    container.innerHTML = CONF_DATA.challengeDays.map(item => {
      const isDone = !!this.state.completedChallenges[item.day];
      return `
        <div class="p-4 rounded-xl border transition-all ${
          isDone 
            ? 'bg-blue-50/70 border-blue-200 shadow-sm' 
            : 'bg-white border-slate-200 hover:border-blue-300'
        } flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-extrabold ${isDone ? 'text-blue-700' : 'text-slate-400'}">
                Day ${item.day.toString().padStart(2, '0')}
              </span>
              <input 
                type="checkbox" 
                class="custom-checkbox" 
                ${isDone ? 'checked' : ''} 
                onchange="confApp.toggleChallengeDay(${item.day}, this.checked)"
                title="Tandai selesai"
              />
            </div>
            <h5 class="text-xs font-bold text-slate-900 mb-1 line-clamp-1">${item.title}</h5>
            <p class="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-3">${item.instruction}</p>
          </div>
          <button 
            type="button" 
            onclick="confApp.loadChallengeToTimer(${item.day})"
            class="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 self-start"
          >
            Latih di Timer →
          </button>
        </div>
      `;
    }).join('');
  }

  toggleChallengeDay(day, isChecked) {
    if (isChecked) {
      this.state.completedChallenges[day] = true;
      confAudio.playSuccess();
      this.showToast(`🔥 Day ${day} Challenge berhasil diselesaikan! Semangat terus!`);
    } else {
      delete this.state.completedChallenges[day];
    }
    this.saveState();
    this.render30DayChallenge();
  }

  loadChallengeToTimer(day) {
    const item = CONF_DATA.challengeDays.find(d => d.day === day);
    if (!item) return;

    this.state.speakingTimer.activeTopic = {
      title: `Day ${item.day}: ${item.title}`,
      prompt: item.instruction,
      category: 'Challenge'
    };

    const titleEl = document.getElementById('practiceTopicTitle');
    const promptEl = document.getElementById('practiceTopicPrompt');
    const catEl = document.getElementById('practiceTopicCat');

    if (titleEl) titleEl.innerText = `Day ${item.day}: ${item.title}`;
    if (promptEl) promptEl.innerText = item.instruction;
    if (catEl) catEl.innerText = '30-Day Challenge';

    // Scroll smoothly to Practice section
    const practiceSec = document.getElementById('practice');
    if (practiceSec) {
      practiceSec.scrollIntoView({ behavior: 'smooth' });
    }
    this.showToast(`Topik Day ${day} telah dimasukkan ke timer latihan!`);
  }

  // ==========================================
  // Section 10: Testimonials
  // ==========================================
  renderTestimonials() {
    const container = document.getElementById('testimonialsGrid');
    if (!container) return;

    container.innerHTML = CONF_DATA.testimonials.map(item => `
      <div class="bg-white rounded-2xl border border-slate-200 p-6 md:p-7 shadow-sm card-hover flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-1 text-amber-400 mb-4">
            ${'★'.repeat(5)}
          </div>
          <p class="text-xs md:text-sm text-slate-600 leading-relaxed mb-6 italic">
            "${item.comment}"
          </p>
        </div>
        <div class="flex items-center gap-3 pt-4 border-t border-slate-100">
          <img src="${item.avatar}" alt="${item.name}" class="w-10 h-10 rounded-full object-cover border border-slate-200" loading="lazy">
          <div>
            <h5 class="text-xs md:text-sm font-bold text-slate-900">${item.name}</h5>
            <span class="text-[11px] text-slate-500 block">${item.role}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // ==========================================
  // Global Search
  // ==========================================
  openSearchModal() {
    const modal = document.getElementById('searchModal');
    const input = document.getElementById('globalSearchInput');
    if (modal) modal.classList.remove('hidden');
    if (input) {
      input.value = '';
      input.focus();
      this.handleSearch('');
      input.oninput = (e) => this.handleSearch(e.target.value);
    }
  }

  handleSearch(query) {
    const resultsContainer = document.getElementById('searchResultsContainer');
    if (!resultsContainer) return;

    const q = query.trim().toLowerCase();
    if (!q) {
      resultsContainer.innerHTML = `
        <div class="p-6 text-center text-xs text-slate-400">
          Ketik kata kunci seperti "nervous", "intro", "slide", "starter kit", atau "timer"...
        </div>
      `;
      return;
    }

    const matchedTutorials = CONF_DATA.tutorials.filter(t => 
      t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.speaker.toLowerCase().includes(q)
    );

    const matchedProducts = CONF_DATA.products.filter(p => 
      p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );

    const matchedTopics = CONF_DATA.practiceTopics.filter(top => 
      top.title.toLowerCase().includes(q) || top.prompt.toLowerCase().includes(q)
    );

    let html = '';

    if (matchedTutorials.length > 0) {
      html += `<div class="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tutorial & Video (${matchedTutorials.length})</div>`;
      matchedTutorials.forEach(t => {
        html += `
          <div class="p-3 hover:bg-slate-50 rounded-xl cursor-pointer flex items-center justify-between" onclick="confApp.closeAllModals(); confApp.openVideoModal('${t.id}')">
            <div>
              <p class="text-xs font-bold text-slate-900">${t.title}</p>
              <p class="text-[11px] text-slate-500">${t.categoryName} • ${t.duration}</p>
            </div>
            <span class="text-xs text-blue-600 font-semibold">Tonton →</span>
          </div>
        `;
      });
    }

    if (matchedProducts.length > 0) {
      html += `<div class="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-3">Produk Store (${matchedProducts.length})</div>`;
      matchedProducts.forEach(p => {
        html += `
          <div class="p-3 hover:bg-slate-50 rounded-xl cursor-pointer flex items-center justify-between" onclick="confApp.closeAllModals(); confApp.openProductModal('${p.id}')">
            <div>
              <p class="text-xs font-bold text-slate-900">${p.title}</p>
              <p class="text-[11px] text-slate-500">Rp ${p.price.toLocaleString('id-ID')}</p>
            </div>
            <span class="text-xs text-blue-600 font-semibold">Lihat →</span>
          </div>
        `;
      });
    }

    if (matchedTopics.length > 0) {
      html += `<div class="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-3">Topik Latihan (${matchedTopics.length})</div>`;
      matchedTopics.forEach(top => {
        html += `
          <div class="p-3 hover:bg-slate-50 rounded-xl cursor-pointer flex items-center justify-between" onclick="confApp.closeAllModals(); location.href='#practice';">
            <div>
              <p class="text-xs font-bold text-slate-900">${top.title}</p>
              <p class="text-[11px] text-slate-500 line-clamp-1">${top.prompt}</p>
            </div>
            <span class="text-xs text-blue-600 font-semibold">Latihan →</span>
          </div>
        `;
      });
    }

    if (!html) {
      html = `
        <div class="p-8 text-center text-xs text-slate-500">
          Tidak ditemukan hasil untuk "${query}". Coba kata kunci lainnya.
        </div>
      `;
    }

    resultsContainer.innerHTML = html;
  }

  // ==========================================
  // Auth & Dashboard
  // ==========================================
  openAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.remove('hidden');
  }

  handleLogin(name, email) {
    this.state.user = {
      name: name || 'Siswa Mandiri',
      email: email || 'siswa@confindo.id',
      isLoggedIn: true,
      streakDays: 4,
      points: 240
    };
    this.saveState();
    this.closeAllModals();
    this.showToast(`Selamat datang, ${this.state.user.name}! 👋`);
  }

  handleLogout() {
    this.state.user = {
      name: 'Tamu Pembelajar',
      email: 'guest@confindo.id',
      isLoggedIn: false,
      streakDays: 0,
      points: 0
    };
    this.saveState();
    this.closeAllModals();
    this.showToast('Anda telah keluar dari akun.');
  }

  openDashboardModal() {
    const modal = document.getElementById('dashboardModal');
    if (!modal) return;
    this.updateDashboardUI();
    modal.classList.remove('hidden');
  }

  updateDashboardUI() {
    // Nav Button Update
    const navBtn = document.getElementById('navAuthBtn');
    if (navBtn) {
      if (this.state.user && this.state.user.isLoggedIn) {
        navBtn.innerHTML = `
          <span class="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-extrabold mr-1.5">
            ${this.state.user.name.charAt(0)}
          </span>
          <span>${this.state.user.name.split(' ')[0]}</span>
        `;
        navBtn.className = "flex items-center text-xs md:text-sm font-semibold text-slate-700 hover:text-blue-600 px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:border-blue-400 transition-all";
      } else {
        navBtn.innerText = 'Login / Sign Up';
        navBtn.className = "text-xs md:text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-xl transition-all shadow-sm";
      }
    }

    // Modal Content Update
    const nameEl = document.getElementById('dashUserName');
    const emailEl = document.getElementById('dashUserEmail');
    const challengeCountEl = document.getElementById('dashChallengeProgress');
    const challengeBar = document.getElementById('dashChallengeBar');
    const bookmarkCountEl = document.getElementById('dashBookmarkCount');
    const purchasesList = document.getElementById('dashPurchasesList');
    const historyList = document.getElementById('dashHistoryList');

    const completedChallengesCount = Object.keys(this.state.completedChallenges).filter(k => this.state.completedChallenges[k]).length;

    if (nameEl) nameEl.innerText = this.state.user ? this.state.user.name : 'Tamu';
    if (emailEl) emailEl.innerText = this.state.user ? this.state.user.email : '';
    if (challengeCountEl) challengeCountEl.innerText = `Day ${completedChallengesCount} / 30`;
    if (challengeBar) challengeBar.style.width = `${Math.round((completedChallengesCount / 30) * 100)}%`;
    if (bookmarkCountEl) bookmarkCountEl.innerText = `${this.state.bookmarks.length} Materi`;

    // Render Purchases in Dashboard
    if (purchasesList) {
      if (this.state.purchases.length === 0) {
        purchasesList.innerHTML = `
          <div class="text-center py-6 bg-slate-50 rounded-xl border border-slate-100 p-4">
            <p class="text-xs text-slate-500 mb-2">Belum ada produk digital yang dibeli.</p>
            <a href="#store" onclick="confApp.closeAllModals()" class="text-xs font-bold text-blue-600 hover:underline">Jelajahi CONFindo Store →</a>
          </div>
        `;
      } else {
        purchasesList.innerHTML = this.state.purchases.map(pId => {
          const prod = CONF_DATA.products.find(p => p.id === pId);
          if (!prod) return '';
          return `
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <p class="text-xs font-bold text-slate-900">${prod.title}</p>
                <span class="text-[11px] text-emerald-600 font-semibold">Akses Aktif</span>
              </div>
              <button 
                type="button" 
                onclick="confApp.downloadProductItem(CONF_DATA.products.find(p => p.id === '${prod.id}'))"
                class="px-3 py-1 bg-white hover:bg-blue-600 text-blue-600 hover:text-white border border-slate-200 rounded-lg text-xs font-bold transition-colors"
              >
                Unduh File
              </button>
            </div>
          `;
        }).join('');
      }
    }

    // Render Practice History
    if (historyList) {
      if (this.state.practiceHistory.length === 0) {
        historyList.innerHTML = `<p class="text-xs text-slate-400 py-3">Belum ada sesi latihan tercatat.</p>`;
      } else {
        historyList.innerHTML = this.state.practiceHistory.slice(0, 5).map(item => `
          <div class="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between text-xs">
            <div>
              <p class="font-bold text-slate-800">${item.topic}</p>
              <span class="text-[10px] text-slate-400">${item.type} • ${item.duration}</span>
            </div>
            <span class="text-[10px] text-slate-500">${item.date}</span>
          </div>
        `).join('');
      }
    }
  }
}

// Global App Instance
let confApp = null;
document.addEventListener('DOMContentLoaded', () => {
  confApp = new ConfApp();
});
