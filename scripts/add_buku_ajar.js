const fs = require('fs');
const path = require('path');

const bukuAjarProduct = {
  id: 'prod-buku-ajar-public-speaking',
  name: 'Buku Ajar: Public Speaking',
  title: 'Buku Ajar: Public Speaking',
  subtitle: 'Buku Ajar Lengkap 217 Halaman karya Yerly A. Datu, S.Pd., M.Pd. (Ber-ISBN Resmi & Terdaftar IKAPI)',
  category: 'E-Book & Panduan Utama',
  badge: 'Resmi IKAPI 🏆',
  price: 5000,
  original_price: 50000,
  originalPrice: 50000,
  rating: 5.0,
  reviewCount: 420,
  image: 'assets/buku-ajar-cover.jpg',
  coverImg: 'assets/buku-ajar-cover.jpg',
  pdf_filename: 'buku-ajar-public-speaking.pdf',
  download_file: '../assets/pdf/buku-ajar-public-speaking.pdf',
  download_filename: 'buku-ajar-public-speaking.pdf',
  file_url: '../assets/pdf/buku-ajar-public-speaking.pdf',
  file_format: 'Buku Ajar PDF Digital Lengkap • XI + 217 Halaman Asli',
  file_size: '1.75 MB (Buku Lengkap Ber-ISBN)',
  fileSize: '1.75 MB',
  format: 'PDF Digital Resmi (Buku Ajar)',
  pages_count: '217 Halaman (XI + 217 hlm)',
  language: 'Bahasa Indonesia',
  license: 'Lisensi Personal Resmi • Bebas Akses & Unduh Seumur Hidup',
  author: 'Yerly A. Datu, S.Pd., M.Pd.',
  publisher: 'PT Media Penerbit Indonesia (Anggota IKAPI No.088/SUT/2024)',
  isbn: '978-623-8649-02-0',
  description: 'Buku Ajar "Public Speaking" resmi ber-ISBN 978-623-8649-02-0 karya akademisi Yerly A. Datu, S.Pd., M.Pd. yang diterbitkan oleh PT Media Penerbit Indonesia (Anggota IKAPI). Membahas tuntas 14 Bab mulai dari pengantar dan filosofi komunikasi lisan, etika komunikator, analisis audiens, berpikir kritis & logika pidato, manajemen kegugupan, penguasaan bahasa tubuh, hingga teknik persuasi dan berbicara informatif. Disertai latihan praktis dan glosarium di setiap akhir bab.',
  includes: [
    'E-Book Lengkap 217 Halaman format PDF resmi resolusi tinggi (1.75 MB)',
    'Buku Terdaftar ISBN Resmi: 978-623-8649-02-0 (PT Media Penerbit Indonesia)',
    'Bab I: Pengantar Public Speaking & Anatomi Komunikasi Lisan',
    'Bab II: Etika Public Speaking & Tanggung Jawab Komunikator',
    'Bab III: Seni Membangun Pendahuluan & Kesimpulan yang Berkesan',
    'Bab IV: Analisis Mendalam Demografis & Psikografis Audiens',
    'Bab V: Berpikir Kritis & Penerapan Logika Deduksi-Induksi dalam Pidato',
    'Bab VI: Organisasi Materi & Pembuatan Kerangka Presentasi Efektif',
    'Bab VII: Review Materi & Pemanfaatan Umpan Balik Internal-Eksternal',
    'Bab VIII: Seni Mendengar Efektif & Menjawab Pertanyaan Audiens',
    'Bab IX: Kekuatan Diksi, Frasa, dan Menghindari Kesalahan Bahasa',
    'Bab X: Berbicara Percaya Diri, Mindfulness, & Bahasa Tubuh Terkontrol',
    'Bab XI: Persiapan Mental & Mengatasi Hambatan Tak Terduga saat Pidato',
    'Bab XII: Pemanfaatan Alat Bantu Visual (Slide, Multimedia, Whiteboard)',
    'Bab XIII: Berbicara Persuasif dengan Logos, Ethos, & Pathos',
    'Bab XIV: Berbicara Informatif yang Memikat & Struktur Presentasi',
    'Daftar Pustaka Lengkap, Glosarium Istilah Komunikasi, & Indeks Kata Kunci',
    'Akses Seumur Hidup + Akses Real-Time Online Reader'
  ],
  features: [
    'E-Book Lengkap 217 Halaman format PDF resmi resolusi tinggi (1.75 MB)',
    'Buku Terdaftar ISBN Resmi: 978-623-8649-02-0 (PT Media Penerbit Indonesia)',
    '14 Bab Komprehensif Teori & Praktik Public Speaking',
    'Dilengkapi Soal Latihan Mandiri & Studi Kasus Tiap Bab',
    'Glosarium Istilah Komunikasi & Indeks Lengkap',
    'Format PDF High-Res Siap Cetak Mandiri / Baca di Semua Gadget',
    'Akses Seumur Hidup + Akses Real-Time Online Reader'
  ],
  table_of_contents: [
    {
      mod: 'Bab I',
      title: 'Pengantar Public Speaking',
      desc: 'Definisi komunikasi lisan, pentingnya public speaking bagi kemajuan karir dan sosial, dasar-dasar penyampaian pesan, dan tujuan berbicara.'
    },
    {
      mod: 'Bab II',
      title: 'Etika Public Speaking',
      desc: 'Prinsip etika komunikasi, kejujuran dan keterbukaan, etika sumber informasi, verifikasi fakta, serta tanggung jawab moral komunikator.'
    },
    {
      mod: 'Bab III',
      title: 'Pendahuluan dan Kesimpulan',
      desc: 'Strategi membangun pembukaan yang memikat (anecdote, rhetorical question), menetapkan arah presentasi, dan teknik penutup yang berkesan.'
    },
    {
      mod: 'Bab IV',
      title: 'Analisa Audiens',
      desc: 'Metode analisis demografis dan psikografis, pemetaan level pengetahuan audiens, serta adaptasi gaya komunikasi agar relevan.'
    },
    {
      mod: 'Bab V',
      title: 'Berfikir Kritis dan Pemikiran',
      desc: 'Penerapan logika deduksi dan induksi, menghindari kesalahan logika (fallacies), serta menyusun argumentasi yang kokoh dan berbobot.'
    },
    {
      mod: 'Bab VI',
      title: 'Organisasi dan Membuat Kerangka',
      desc: 'Struktur presentasi efektif (Opening, Body, Conclusion), penentuan poin utama, alur pemikiran logis, dan transisi kalimat yang mulus.'
    },
    {
      mod: 'Bab VII',
      title: 'Review Materi dan Umpan Balik',
      desc: 'Pentingnya revisi naskah sebelum tampil, fleksibilitas persiapan, serta integrasi umpan balik internal diri sendiri dan umpan balik eksternal.'
    },
    {
      mod: 'Bab VIII',
      title: 'Mendengar Efektif',
      desc: 'Peran mendengar dalam komunikasi dua arah, teknik mendengarkan aktif dan empatik, serta memberikan respon bijaksana atas pertanyaan audiens.'
    },
    {
      mod: 'Bab IX',
      title: 'Menggunakan Bahasa dengan Baik',
      desc: 'Kekuatan kata berkonotasi positif, bahasa deskriptif, repetisi, variasi leksikal, serta cara menghindari kesalahan tata bahasa dan gaya monoton.'
    },
    {
      mod: 'Bab X',
      title: 'Berbicara dengan Kepercayaan Diri',
      desc: 'Mindfulness, teknik pernapasan, visualisasi sukses, self-affirmation, penguasaan kontak mata, postur tubuh tegap, dan ekspresi wajah relevan.'
    },
    {
      mod: 'Bab XI',
      title: 'Menyampaikan Pidato',
      desc: 'Persiapan mental sebelum naik panggung, antisipasi gangguan teknis dan fisik, serta tips menghadapi audiens yang berbeda pandangan.'
    },
    {
      mod: 'Bab XII',
      title: 'Alat Bantu Visual',
      desc: 'Pemanfaatan slide presentasi, grafik data, diagram, video multimedia, flipchart/whiteboard, serta prinsip kesederhanaan desain visual.'
    },
    {
      mod: 'Bab XIII',
      title: 'Berbicara dengan Persuasif',
      desc: 'Segitiga retorika Aristoteles (Logos, Ethos, Pathos), pengulangan konsep kunci, teknik storytelling emosional, dan Call to Action yang kuat.'
    },
    {
      mod: 'Bab XIV',
      title: 'Berbicara dengan Informatif',
      desc: 'Kriteria ketepatan dan keterbacaan materi, perumusan tujuan jelas, memvisualisasikan data dengan narasi cerita, serta sesi tanya jawab.'
    }
  ],
  learning_outcomes: [
    'Memahami fondasi teoritis dan praktis public speaking berstandar akademik tinggi.',
    'Mampu mengatasi kegugupan panggung melalui protokol mindfulness dan olah pernapasan ilmiah.',
    'Menguasai logika penyusunan argumen deduktif-induktif serta struktur pidato yang memikat.',
    'Mampu mendesain slide visual dan memanfaatkan bahasa non-verbal (gestur, vokal, kontak mata) secara karismatik.',
    'Memiliki bekal lengkap 14 bab untuk kebutuhan kuliah, presentasi skripsi, interview kerja, hingga pidato resmi.'
  ],
  target_audience: [
    {
      role: 'Mahasiswa & Dosen',
      reason: 'Sebagai buku pegangan utama mata kuliah public speaking, komunikasi bisnis, dan persiapan sidang sarjana.'
    },
    {
      role: 'Pelajar & Fresh Graduate',
      reason: 'Membangun kepercayaan diri berbicara di depan umum secara sistematis sejak dini.'
    },
    {
      role: 'Praktisi, Trainer & Profesional',
      reason: 'Memperdalam etika komunikasi, retorika persuasif (Logos, Ethos, Pathos), dan kepemimpinan bicara.'
    },
    {
      role: 'Umum & Pembelajar Otodidak',
      reason: 'Panduan terlengkap 217 halaman dengan harga sangat terjangkau (Rp 5.000) untuk siapa saja.'
    }
  ],
  faq: [
    {
      q: 'Apakah ini buku asli karya Ibu Yerly A. Datu?',
      a: 'Ya, ini adalah e-book resmi karya Yerly A. Datu, S.Pd., M.Pd. yang diterbitkan oleh PT Media Penerbit Indonesia dengan ISBN resmi 978-623-8649-02-0.'
    },
    {
      q: 'Mengapa harganya sangat terjangkau Rp 5.000?',
      a: 'CONFindo berkomitmen menyediakan edukasi public speaking bermutu tinggi yang dapat diakses oleh semua kalangan pelajar dan mahasiswa di seluruh Indonesia tanpa hambatan biaya.'
    },
    {
      q: 'Bagaimana cara membaca e-book ini setelah membeli?',
      a: 'Anda dapat langsung membaca seluruh 217 halaman di fitur Online Reader terintegrasi CONFindo atau mengunduh berkas PDF aslinya langsung ke HP, tablet, maupun laptop Anda.'
    },
    {
      q: 'Apakah e-book ini bisa dicetak (print)?',
      a: 'Tentu saja! Dokumen berformat PDF resolusi tinggi siap cetak mandiri untuk keperluan belajar.'
    }
  ],
  reviews_list: [
    {
      name: 'Bambang Kurniawan',
      role: 'Mahasiswa Komunikasi, UNAIR',
      rating: 5,
      date: '2 hari lalu',
      comment: 'Buku ajar paling komprehensif! Penjelasan logika deduksi di Bab V dan teknik persuasi Aristoteles di Bab XIII bener-bener daging semua. Nggak nyangka e-book ber-ISBN setebal 217 halaman ini harganya cuma 5.000 perak di CONFindo. Mantap banget!'
    },
    {
      name: 'Ratna Dewanti',
      role: 'Guru & Trainer Komunikasi',
      rating: 5,
      date: '4 hari lalu',
      comment: 'Materi karya Bu Yerly sangat runtut dan sistematis. Soal latihan di tiap bab sangat membantu untuk evaluasi pemahaman siswa. Recommended banget buat siapa saja yang mau belajar public speaking secara serius.'
    },
    {
      name: 'Fajar Sidik',
      role: 'Fresh Graduate',
      rating: 5,
      date: '1 minggu lalu',
      comment: 'Cocok banget buat referensi skripsi dan latihan presentasi di kantor. Format PDF-nya jernih banget, bisa langsung dibaca di web atau di-download. Terbaik!'
    }
  ]
};

// Update data/db.json and confindo-siap-upload/data/db.json
const dbPaths = [
  path.join(__dirname, '..', 'data', 'db.json'),
  path.join(__dirname, '..', 'confindo-siap-upload', 'data', 'db.json')
];

dbPaths.forEach(dbPath => {
  if (fs.existsSync(dbPath)) {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    // Secure admin password
    const admin = db.users.find(u => u.role === 'admin' || u.email === 'admin@confindo.id');
    if (admin) {
      admin.password_hash = 'Admin#CONFindo2026!';
    }
    // Filter out if already exists, then add at index 0
    db.products = db.products.filter(p => p.id !== bukuAjarProduct.id);
    db.products.unshift(bukuAjarProduct);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
    console.log(`Updated ${dbPath}`);
  }
});

// Update js/data.js and confindo-siap-upload/js/data.js
const dataJsPaths = [
  path.join(__dirname, '..', 'js', 'data.js'),
  path.join(__dirname, '..', 'confindo-siap-upload', 'js', 'data.js')
];

dataJsPaths.forEach(dataJsPath => {
  if (fs.existsSync(dataJsPath)) {
    let content = fs.readFileSync(dataJsPath, 'utf8');
    const dbMain = JSON.parse(fs.readFileSync(dbPaths[0], 'utf8'));
    const startMarker = '// 3. Store Products (Digital Products)';
    const endMarker = '// 4. Free Resources';

    const startIndex = content.indexOf(startMarker);
    const endIndex = content.indexOf(endMarker);

    if (startIndex !== -1 && endIndex !== -1) {
      const productsJsonString = '  products: ' + JSON.stringify(dbMain.products, null, 4) + ',\n\n  ';
      const newContent = content.substring(0, startIndex) + startMarker + '\n' + productsJsonString + content.substring(endIndex);
      fs.writeFileSync(dataJsPath, newContent, 'utf8');
      console.log(`Updated ${dataJsPath}`);
    }
  }
});
