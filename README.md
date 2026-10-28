# CONFindo — Speak with Confidence
> **Platform Pembelajaran Public Speaking Mandiri (Self-Learning Platform)**

**CONFindo** adalah platform web modern yang dirancang untuk membantu mahasiswa, pelajar, fresh graduate, pencari kerja, dan karyawan mengasah kemampuan public speaking, presentasi, dan wawancara kerja secara mandiri tanpa coach atau mentor.

---

## 🌟 Konsep Utama & Nilai Kunci

- **100% Self-Learning:** Bukan platform konsultasi, tidak ada coach, mentor, atau booking sesi personal. Semua latihan dirancang mandiri.
- **Learn • Practice • Improve:** Kurasi materi YouTube terarah, studio latihan 1 menit dengan audio timer interaktif, dan alat persiapan pidato.
- **Monetisasi Produk Digital:** CONFindo Store menyediakan starter kit e-book, master slide template, naskah speech siap pakai, dan jurnal latihan.
- **Desain EdTech Modern:** Palet warna Navy Blue (`#0F172A`, `#2563EB`) dan putih bersih dengan aksen amber/emerald, font *Plus Jakarta Sans*, tata letak responsif desktop & mobile.

---

## 🚀 Fitur Unggulan

1. **Sticky Navbar Glassmorphism:**
   - Navigasi cepat: Home, Belajar, Latihan, Tools, Store, Free Resources, 30-Day Challenge.
   - Global Search (`Ctrl+K`) real-time mencari tutorial, tools, dan produk.
   - Login / Sign Up terhubung ke User Dashboard interaktif.

2. **Hero Section:**
   - Headline: *"Speak with Confidence."*
   - Subheadline: *"Belajar public speaking, latihan, dan persiapkan dirimu untuk berbicara lebih percaya diri."*
   - Tombol *Mulai Belajar* & *Lihat Produk*.
   - Visual panggung presentasi dengan badge metrik floating (+94% percaya diri, 1 menit/hari).

3. **Public Speaking Roadmap (4 Tahapan):**
   - **01 — Understand:** Kenali dasar-dasar public speaking & psikologi rasa gugup.
   - **02 — Prepare:** Cara mempersiapkan outline, naskah, dan slide visual.
   - **03 — Practice:** Latih suara, intonasi, ekspresi wajah, dan gestur tubuh.
   - **04 — Perform:** Terapkan dalam presentasi, interview kerja, rapat, dan seminar.

4. **Learn Section (Tutorials & YouTube):**
   - Filter 9 kategori: *Basic Public Speaking, Confidence, Presentation Skills, Body Language, Voice & Intonation, Storytelling, Interview, Speech Preparation, Handling Nervousness*.
   - Pemutar modal YouTube dengan *Key Takeaways* praktis dan tombol simpan ke dashboard.

5. **Practice Section:**
   - **1 Minute Speaking:** Timer circular SVG 60 detik dengan Web Audio synthesizer (chime 30s & countdown 10s), simulator visualizer gelombang audio, dan scratchpad topik acak.
   - **Random Topic Generator:** Generate topik latihan spontan dengan shuffle animation.
   - **Practice Checklist:** 6 evaluasi mandiri (*Eye Contact, Clear Voice, Good Posture, Don't Speak Too Fast, Use Natural Gestures, Avoid Filler Words*) dengan feedback skor dinamis.

6. **Tools Section:**
   - **Speech Timer:** Countdown preset 1m, 3m pitch, 5m presentasi, 10m dengan bel alarm.
   - **Random Topic Generator:** Tool terpisah dengan topik-topik impromptu.
   - **Presentation Checklist:** 3 fase persiapan (*H-3 Materi, H-1 Gladi Resik, Hari-H 15 Menit Sebelum*).
   - **Speech Structure Builder:** Template *Opening → Main Point → Example → Conclusion* dengan pembuat naskah otomatis, copy ke clipboard, dan unduh `.txt`.
   - **Filler Word Tracker:** Counter tap interaktif untuk *"eee"*, *"emm"*, *"anu"*, *"kayak"*, *"jadi"* dengan kalkulasi total & tips eliminasi kata gumaman.

7. **CONFindo Store (Digital Products):**
   - *Public Speaking Starter Kit* (PDF E-Book 68 hal)
   - *Presentation Template Pro* (PowerPoint & Canva)
   - *Speech Script Template Bundle* (DOCX & PDF)
   - *Interview Preparation Kit* (STAR Method workbook)
   - *Public Speaking Practice Journal* (Digital Journal 90 Hari)
   - *Presentation Checklist Pro* (Interactive Printable PDF)
   - Modal detail produk & simulasi checkout QRIS / Virtual Account dengan unduhan instan.

8. **Free Resources:**
   - 5 file materi gratis yang dapat langsung diunduh secara instan.

9. **30-Day Challenge ("30 Days to Speak with Confidence"):**
   - Kalender 30 hari interaktif dengan checkbox penyelesaian, progress bar dinamis, dan integrasi langsung ke timer latihan.

10. **Testimonials (Kisah Nyata Rekan Pembelajar):**
    - Cerita dari mahasiswa, fresh graduate, dan karyawan (tanpa menampilkan coach atau mentor).

11. **User Dashboard & Penyimpanan Lokal (LocalStorage):**
    - Menyimpan hari challenge yang sudah selesai, bookmark video favorit, riwayat sesi latihan, dan koleksi produk digital yang dibeli.

---

## 💻 Cara Menjalankan Website

Platform ini dibangun dengan teknologi web murni tanpa ketergantungan node_modules atau kompilasi rumit:

### Opsi 1: Buka Langsung (Paling Cepat)
Cukup klik dua kali file `index.html` di file explorer Anda, atau klik kanan lalu pilih **Open with Google Chrome / Microsoft Edge / Firefox**.

### Opsi 2: Jalankan via PowerShell Server Bawaan
Buka PowerShell di folder project dan jalankan:
```powershell
.\start_server.ps1
```
Browser default Anda akan otomatis terbuka di `http://localhost:8080/`.

---

## 📁 Struktur Direktori

```
CONFINDO/
├── index.html          # Halaman utama dengan 12 section lengkap & modals
├── css/
│   └── styles.css      # Styling kustom, animasi, micro-interactions, timer ring
├── js/
│   ├── data.js         # Dataset tutorial, produk store, topik latihan, challenge
│   ├── audio.js        # Web Audio API synthesizer bel timer tanpa file eksternal
│   └── app.js          # Logika aplikasi, state localStorage, timer, modals, search
├── start_server.ps1    # Server lokal PowerShell otomatis
└── README.md           # Dokumentasi lengkap
```
