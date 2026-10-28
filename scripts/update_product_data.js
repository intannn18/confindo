const fs = require('fs');
const path = require('path');

const detailedProducts = [
  {
  id: 'prod-buku-ajar-public-speaking',
  name: 'Buku Ajar: Public Speaking',
  title: 'Buku Ajar: Public Speaking',
  subtitle: 'Buku Ajar Lengkap 217 Halaman karya Yerly A. Datu, S.Pd., M.Pd. (Ber-ISBN Resmi & Terdaftar IKAPI)',
  category: 'Store Digital & Panduan Utama',
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
},
  {
    id: 'prod-starter-kit',
    name: 'Public Speaking Starter Kit',
    title: 'Public Speaking Starter Kit',
    subtitle: 'Panduan Komprehensif Berbicara Percaya Diri & Menjinakkan Demam Panggung',
    category: 'E-Book & Panduan Utama',
    badge: 'Best Seller ⭐',
    price: 15000,
    original_price: 30000,
    originalPrice: 30000,
    rating: 4.9,
    reviewCount: 382,
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    coverImg: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    pdf_filename: 'public-speaking-starter-kit.pdf',
    download_file: '../assets/pdf/public-speaking-starter-kit.pdf',
    download_filename: 'public-speaking-starter-kit.pdf',
    file_url: '../assets/pdf/public-speaking-starter-kit.pdf',
    file_format: 'Dokumen PDF Digital Interaktif • 8 Halaman Lengkap',
    file_size: '14 KB (Vector High-Res PDF)',
    fileSize: '14 KB',
    format: 'PDF Digital Interaktif',
    pages_count: '8 Halaman A4 Lengkap',
    language: 'Bahasa Indonesia',
    license: 'Lisensi Personal Seumur Hidup • Bebas Print Mandiri',
    description: 'Panduan terlengkap yang dirancang khusus untuk mahasiswa, pelajar, dan pemula yang sering merasa gugup, blank, atau gemetar saat berbicara di depan umum. Kit ini merangkum psikologi ketakutan panggung, teknik pernapasan diafragma 4-7-8, 10 formula hook pembuka, hingga eliminasi kata gumaman (filler words) ke dalam format PDF yang langsung bisa dibaca dan dipraktikkan seketika setelah pembayaran.',
    includes: [
      '8 Halaman E-Book format PDF resolusi tinggi (siap baca di HP, tablet, laptop)',
      'Modul 01: Psikologi Rasa Gugup & Rahasia Adrenalin Panggung',
      'Modul 02: Formula 3 Langkah Menjinakkan Demam Panggung (3-Minute Calm)',
      'Modul 03: Protokol Pernapasan Diafragma 4-7-8 dengan panduan siklus',
      'Modul 04: 10 Template Hook Pembuka Pidato & Presentasi yang Menghentak',
      'Modul 05: Kamus Mini Sinonim & Eliminasi Kata Gumaman (Filler Words)',
      'Modul 06: Printable Weekly Self-Evaluation Worksheet & Checklist',
      'Akses Seumur Hidup + Akses Real-Time Online Reader'
    ],
    features: [
      '8 Halaman E-Book format PDF resolusi tinggi (siap baca di HP, tablet, laptop)',
      'Modul 01: Psikologi Rasa Gugup & Rahasia Adrenalin Panggung',
      'Modul 02: Formula 3 Langkah Menjinakkan Demam Panggung (3-Minute Calm)',
      'Modul 03: Protokol Pernapasan Diafragma 4-7-8 dengan panduan siklus',
      'Modul 04: 10 Template Hook Pembuka Pidato & Presentasi yang Menghentak',
      'Modul 05: Kamus Mini Sinonim & Eliminasi Kata Gumaman (Filler Words)',
      'Modul 06: Printable Weekly Self-Evaluation Worksheet & Checklist',
      'Akses Seumur Hidup + Akses Real-Time Online Reader'
    ],
    table_of_contents: [
      { mod: 'Modul 01', title: 'Psikologi Rasa Gugup & Respon Adrenalin', desc: 'Memahami mengapa otak bereaksi cemas saat diamati banyak orang dan cara mengonversi kecemasan menjadi energi karismatik.' },
      { mod: 'Modul 02', title: 'Formula 3-Minute Calm Sebelum Tampil', desc: 'Tiga langkah grounding fisik, visualisasi 3 titik ramah, dan teknik 3 detik hening sebelum kata pertama.' },
      { mod: 'Modul 03', title: 'Teknik Pernapasan Diafragma 4-7-8', desc: 'Latihan pernapasan perut terpandu untuk menurunkan denyut jantung dan memperdalam resonansi suara.' },
      { mod: 'Modul 04', title: '10 Variasi Hook Pembuka Pidato & Presentasi', desc: 'Formula opening mulai dari statistik mengejutkan, pertanyaan provokatif, hingga cerita in media res.' },
      { mod: 'Modul 05', title: 'Kamus Mini Pengganti Filler Words ("eee", "emm")', desc: 'Strategi mengganti kata gumaman dengan jeda hening berwibawa dan kalimat transisi yang elegan.' },
      { mod: 'Modul 06', title: 'Weekly Self-Evaluation Worksheet', desc: 'Lembar penilaian mandiri 6 parameter evaluasi (kontak mata, vokal, postur, tempo, gestur, filler word).' }
    ],
    learning_outcomes: [
      'Mampu meredakan demam panggung dan tremor suara dalam 3 menit pertama.',
      'Membuat audiens langsung menyimak sejak kalimat pembuka Anda diucapkan.',
      'Menghilangkan kebiasaan bergumam "eee", "emm", "anu" secara permanen.',
      'Memiliki rasa percaya diri alami tanpa harus menghafal kata per kata.'
    ],
    target_audience: [
      { role: 'Mahasiswa & Pelajar', reason: 'Menghadapi presentasi tugas kuliah, seminar proposal, dan sidang skripsi tanpa rasa minder.' },
      { role: 'Fresh Graduate & Job Seeker', reason: 'Mempersiapkan perkenalan diri dan wawancara kerja yang meyakinkan di hadapan recruiter.' },
      { role: 'Karyawan & Profesional Muda', reason: 'Tampil tenang dan kredibel saat memimpin rapat tim atau presentasi update proyek.' },
      { role: 'Pemalu & Introvert', reason: 'Membangun rasa percaya diri dari kamar sendiri melalui latihan mandiri terarah.' }
    ],
    faq: [
      { q: 'Kapan saya bisa mengakses file PDF ini?', a: 'Langsung detik itu juga (real-time) setelah pembayaran selesai! Anda dapat membacanya langsung di Online Reader atau mengunduh file PDF aslinya ke HP/laptop Anda.' },
      { q: 'Apakah file PDF ini bisa dicetak (print)?', a: 'Sangat bisa! Dokumen dibuat dalam format A4 beresolusi tinggi dengan tata letak yang bersih, ramah dicetak maupun dibaca di tablet/HP.' },
      { q: 'Apakah saya membutuhkan mentor untuk mempelajari isi kit ini?', a: 'Tidak perlu. Seluruh materi dirancang khusus dengan metodologi self-learning mandiri yang runtut dan praktis.' }
    ],
    reviews_list: [
      { name: 'Alifia Zahra', role: 'Mahasiswi Tingkat Akhir, UI', rating: 5, date: '3 hari lalu', comment: 'Formula 3-Minute Calm-nya beneran manjur pas sidang sempro kemarin! Biasanya suara saya bergetar parah, tapi setelah tarik napas diafragma 4-7-8 jadi jauh lebih tenang. Worth it banget 15 ribu!' },
      { name: 'Rian Hendrawan', role: 'Management Trainee', rating: 5, date: '1 minggu lalu', comment: 'Hook pembukanya aplikatif banget untuk meeting mingguan di kantor. Boss saya sampai notice presentasi saya jauh lebih terstruktur dan nggak banyak "eee"-nya.' },
      { name: 'Bunga Pertiwi', role: 'Fresh Graduate', rating: 5, date: '2 minggu lalu', comment: 'PDF-nya rapi banget dan langsung bisa dibaca online habis bayar QRIS. Lembar evaluasi checklist-nya selalu saya pakai tiap latihan sendiri.' }
    ]
  },
  {
    id: 'prod-presentation-template',
    name: 'Presentation Template Pro Bundle',
    title: 'Presentation Template Pro Bundle',
    subtitle: 'Panduan Master Desain 50+ Slide Minimalis, Visual Storytelling, & Blueprint Presentasi',
    category: 'Slide Blueprint / PDF & Canva',
    badge: 'Paling Populer 🔥',
    price: 20000,
    original_price: 45000,
    originalPrice: 45000,
    rating: 4.9,
    reviewCount: 512,
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
    coverImg: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
    pdf_filename: 'presentation-template-guide.pdf',
    download_file: '../assets/templates/confindo-presentation-template-pro.pptx',
    download_filename: 'confindo-presentation-template-pro.pptx',
    file_url: '../assets/templates/confindo-presentation-template-pro.pptx',
    file_format: 'File Master PowerPoint (.PPTX) & PDF Blueprint',
    file_size: '35 KB (PowerPoint Master Template)',
    fileSize: '35 KB',
    format: 'Master PPTX + PDF Blueprint',
    pages_count: 'Master Slide PPTX + PDF Guide',
    language: 'Bahasa Indonesia',
    license: 'Lisensi Komersial & Pribadi Bebas Duplikasi',
    description: 'Hemat puluhan jam mendesain slide. Koleksi 50+ slide siap pakai dengan hierarki tipografi modern, layout infografis, timeline, dan slide penutup yang berkesan. Disertai buku panduan PDF cara menyusun alur cerita (visual storytelling) serta tautan master duplikasi ke Canva Pro dan PowerPoint.',
    includes: [
      'Buku Panduan PDF Desain Slide & Visual Storytelling beresolusi tinggi',
      'Tautan Akses Langsung Duplikasi Canva Pro / Free (50+ Slide)',
      'File Master PowerPoint (.PPTX) siap edit 100%',
      'Formula Aturan Emas 10-20-30 untuk Pitching & Laporan Kerja',
      'Kombinasi Skema Palet Warna Industri: Navy Blue, Dark Slate, Warm Sand',
      'Infografis data, roadmap, bagan perbandingan, dan diagram metrik',
      'Akses Seumur Hidup + Akses Real-Time Online Reader'
    ],
    features: [
      'Buku Panduan PDF Desain Slide & Visual Storytelling beresolusi tinggi',
      'Tautan Akses Langsung Duplikasi Canva Pro / Free (50+ Slide)',
      'File Master PowerPoint (.PPTX) siap edit 100%',
      'Formula Aturan Emas 10-20-30 untuk Pitching & Laporan Kerja',
      'Kombinasi Skema Palet Warna Industri: Navy Blue, Dark Slate, Warm Sand',
      'Infografis data, roadmap, bagan perbandingan, dan diagram metrik',
      'Akses Seumur Hidup + Akses Real-Time Online Reader'
    ],
    table_of_contents: [
      { mod: 'Bab 01', title: 'Arsitektur Slide Modern & Prinsip One Slide One Idea', desc: 'Membuat audiens tetap fokus mendengarkan penjelasan pembicara tanpa terdistraksi teks slide yang padat.' },
      { mod: 'Bab 02', title: 'Aturan 10-20-30 & Manajemen Durasi Presentasi', desc: 'Struktur 10 slide esensial dalam 20 menit penyampaian dengan ukuran font minimal 30pt.' },
      { mod: 'Bab 03', title: 'Hierarki Tipografi & Skema Warna Navy/Orange/Slate', desc: 'Pemilihan kontras warna yang nyaman di mata audiens dan memancarkan wibawa profesional.' },
      { mod: 'Bab 04', title: 'Visual Storytelling & Desain Infografis Data', desc: 'Mengubah tabel angka rumit menjadi visual diagram yang langsung dimengerti dalam 5 detik.' },
      { mod: 'Bab 05', title: 'Tautan Master Duplikasi Cloud (Canva & PPTX)', desc: 'Tautan satu klik untuk menduplikasi template ke workspace Canva atau mengunduh PPTX offline.' }
    ],
    learning_outcomes: [
      'Mendesain slide presentasi berkelas profesional dalam waktu kurang dari 30 menit.',
      'Menyajikan data statistik menjadi infografis visual yang persuasif.',
      'Menghilangkan slide yang membosankan dan penuh tumpukan paragraf teks.',
      'Memiliki template master presentasi serbaguna seumur hidup.'
    ],
    target_audience: [
      { role: 'Mahasiswa & Peneliti', reason: 'Presentasi skripsi, paper ilmiah, dan proposal kegiatan kampus.' },
      { role: 'Start-up Founder & Marketer', reason: 'Pitch deck investor dan presentasi proposal kemitraan bisnis.' },
      { role: 'Karyawan Perusahaan', reason: 'Laporan bulanan (monthly review), update KPI, dan townhall meeting.' }
    ],
    faq: [
      { q: 'Apakah template Canva bisa diedit dengan akun Canva gratis?', a: 'Bisa! Seluruh elemen desain kompatibel 100% dengan akun Canva gratis tanpa perlu langganan Canva Pro.' },
      { q: 'Apakah saya bisa mengunduh file .PPTX offline?', a: 'Ya, tautan download file .PPTX dan panduan PDF langsung tersedia di dashboard setelah pembayaran selesai.' }
    ],
    reviews_list: [
      { name: 'Dimas Satrio', role: 'Business Development', rating: 5, date: '4 hari lalu', comment: 'Slide-nya beneran clean dan modern. Klien langsung puji pitch deck kami rapi banget. Panduan PDF-nya juga ngejelasin prinsip font hierarchy dengan jelas.' },
      { name: 'Nadia Safitri', role: 'Mahasiswi Manajemen', rating: 5, date: '1 minggu lalu', comment: 'Langsung pakai template Canva-nya buat tugas akhir, nilainya dapet A! Template-nya fleksibel banget di-edit.' }
    ]
  },
  {
    id: 'prod-speech-script',
    name: 'Speech Script Template Bundle',
    title: 'Speech Script Template Bundle',
    subtitle: 'Kumpulan 18 Naskah Pidato, Sambutan Acara, Elevator Pitch, & Transisi Bahasa Memikat',
    category: 'Script & Outline / PDF & Docs',
    badge: 'Praktis ⏱️',
    price: 12000,
    original_price: 25000,
    originalPrice: 25000,
    rating: 4.8,
    reviewCount: 247,
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
    coverImg: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
    pdf_filename: 'speech-script-bundle.pdf',
    download_file: '../assets/pdf/speech-script-bundle.pdf',
    download_filename: 'speech-script-bundle.pdf',
    file_url: '../assets/pdf/speech-script-bundle.pdf',
    file_format: 'Dokumen PDF Digital Script & Master Docs Siap Edit',
    file_size: '16 KB (Vector High-Res PDF)',
    fileSize: '16 KB',
    format: 'PDF Script + Google Docs Template',
    pages_count: '8 Halaman Naskah Siap Pakai',
    language: 'Bahasa Indonesia',
    license: 'Lisensi Personal Seumur Hidup',
    description: 'Jangan pernah bingung lagi saat ditunjuk mendadak memberikan kata sambutan, presentasi tugas, MC santai, atau elevator pitch. Berisi 18 variasi naskah teruji dengan ruang titik-titik yang siap Anda modifikasi sesuai nama, topik, dan institusi Anda dalam waktu 5 menit.',
    includes: [
      'Buku Naskah PDF Digital 18 Skenario Pidato & Sambutan',
      'Script Elevator Pitch 30 Detik & 60 Detik untuk networking profesional',
      'Script Sambutan Ketua Panitia / Perwakilan Organisasi Mahasiswa',
      'Script Presentasi Tugas Akhir & Sidang Skripsi yang terstruktur',
      '20+ Template Kalimat Jembatan Transisi Mulus antar Topik Bahasan',
      'Script Penutupan Berkesan dengan Teknik Call-to-Action Kuat',
      'Akses Seumur Hidup + Akses Real-Time Online Reader'
    ],
    features: [
      'Buku Naskah PDF Digital 18 Skenario Pidato & Sambutan',
      'Script Elevator Pitch 30 Detik & 60 Detik untuk networking profesional',
      'Script Sambutan Ketua Panitia / Perwakilan Organisasi Mahasiswa',
      'Script Presentasi Tugas Akhir & Sidang Skripsi yang terstruktur',
      '20+ Template Kalimat Jembatan Transisi Mulus antar Topik Bahasan',
      'Script Penutupan Berkesan dengan Teknik Call-to-Action Kuat',
      'Akses Seumur Hidup + Akses Real-Time Online Reader'
    ],
    table_of_contents: [
      { mod: 'Bagian 01', title: 'Elevator Pitch 30s & 60s Networking', desc: 'Perkenalan diri singkat, padat, dan meninggalkan kesan mendalam saat bertemu relasi baru.' },
      { mod: 'Bagian 02', title: 'Kata Sambutan Resmi & Non-Resmi', desc: 'Template sambutan ketua acara, perwakilan rekan kerja, dan pembukaan seminar edukatif.' },
      { mod: 'Bagian 03', title: 'Naskah Presentasi Sidang & Ujian Akademik', desc: 'Alur kalimat pembuka, penjabaran metodologi, argumentasi hasil, dan kalimat penutup sidang.' },
      { mod: 'Bagian 04', title: 'Bank Kalimat Transisi Mulus (Bridging Phrases)', desc: '20+ jembatan kata untuk berpindah slide tanpa kaku atau terdiam bingung.' }
    ],
    learning_outcomes: [
      'Mampu berbicara spontan dalam hitungan menit tanpa rasa panik.',
      'Menyusun naskah pidato berwibawa dengan struktur alur yang mengalir.',
      'Menguasai kalimat transisi antar slide secara mulus.',
      'Percaya diri saat diminta memberikan kata sambutan dadakan.'
    ],
    target_audience: [
      { role: 'Ketua Panitia & Pengurus Organisasi', reason: 'Memberikan sambutan pembukaan dan penutupan kegiatan acara.' },
      { role: 'Mahasiswa Tingkat Akhir', reason: 'Mempersiapkan naskah sidang skripsi dan presentasi seminar hasil.' },
      { role: 'Profesional & Freelancer', reason: 'Mempersiapkan elevator pitch untuk networking dan pitching klien.' }
    ],
    faq: [
      { q: 'Apakah naskah ini bisa saya modifikasi dengan kata-kata sendiri?', a: 'Sangat bisa! Naskah dirancang modular dengan panduan kata kunci yang mudah disesuaikan dengan gaya bicara Anda.' }
    ],
    reviews_list: [
      { name: 'Fajar Nugroho', role: 'Ketua Himpunan Mahasiswa', rating: 5, date: '5 hari lalu', comment: 'Penyelamat banget waktu ditunjuk sambutan di depan dekanat. Naskahnya tinggal saya isi nama acara dan alurnya rapi banget.' },
      { name: 'Kurniawan', role: 'Account Executive', rating: 5, date: '2 minggu lalu', comment: 'Elevator pitch 60 detiknya bener-bener impactful pas networking session event expo.' }
    ]
  },
  {
    id: 'prod-interview-kit',
    name: 'Interview Preparation Kit',
    title: 'Interview Preparation Kit',
    subtitle: 'Panduan Menjawab 40+ Pertanyaan Wawancara Kerja HRD, Metode STAR, & 15 Pertanyaan Balik',
    category: 'Career Toolkit / PDF & Notion',
    badge: 'Rekomendasi Karir 💼',
    price: 15000,
    original_price: 35000,
    originalPrice: 35000,
    rating: 4.9,
    reviewCount: 418,
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
    coverImg: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
    pdf_filename: 'interview-prep-kit-star.pdf',
    download_file: '../assets/pdf/interview-prep-kit-star.pdf',
    download_filename: 'interview-prep-kit-star.pdf',
    file_url: '../assets/pdf/interview-prep-kit-star.pdf',
    file_format: 'Dokumen PDF Digital Workbook • Interaktif STAR Method',
    file_size: '18 KB (Vector High-Res PDF)',
    fileSize: '18 KB',
    format: 'PDF Workbook + Notion Template',
    pages_count: '8 Halaman Workbook & Contoh Jawaban',
    language: 'Bahasa Indonesia',
    license: 'Lisensi Personal Seumur Hidup',
    description: 'Senjata rahasia fresh graduate dan profesional muda untuk tampil tenang, berwibawa, dan memikat di hadapan HRD dan user interviewer. Dilengkapi formula STAR (Situation, Task, Action, Result), bank 40+ pertanyaan jebakan beserta contoh jawaban ideal, checklist gestur wawancara online/offline, dan 15 pertanyaan berbobot untuk diajukan balik ke interviewer.',
    includes: [
      'Buku Panduan PDF Workbook Metode STAR (Situation, Task, Action, Result)',
      'Bank 40+ Pertanyaan interview umum & jebakan beserta contoh jawaban kata-per-kata',
      'Panduan perkenalan diri 90 detik yang memorable dan tidak monoton',
      '15 Pertanyaan strategis berkualitas untuk diajukan balik ke interviewer di akhir sesi',
      'Checklist etiket & gestur wawancara online (Zoom/GMeet) vs offline meeting',
      'Panduan etika follow-up email pasca wawancara kerja',
      'Akses Seumur Hidup + Akses Real-Time Online Reader'
    ],
    features: [
      'Buku Panduan PDF Workbook Metode STAR (Situation, Task, Action, Result)',
      'Bank 40+ Pertanyaan interview umum & jebakan beserta contoh jawaban kata-per-kata',
      'Panduan perkenalan diri 90 detik yang memorable dan tidak monoton',
      '15 Pertanyaan strategis berkualitas untuk diajukan balik ke interviewer di akhir sesi',
      'Checklist etiket & gestur wawancara online (Zoom/GMeet) vs offline meeting',
      'Panduan etika follow-up email pasca wawancara kerja',
      'Akses Seumur Hidup + Akses Real-Time Online Reader'
    ],
    table_of_contents: [
      { mod: 'Modul 01', title: 'Fondasi Wawancara Kerja & Mindset Rekruter', desc: 'Memahami apa yang sebenarnya dicari oleh HRD di balik setiap pertanyaan wawancara.' },
      { mod: 'Modul 02', title: 'Metode STAR (Situation, Task, Action, Result)', desc: 'Formula teruji menyusun cerita pengalaman proyek menjadi bukti nyata kapabilitas Anda.' },
      { mod: 'Modul 03', title: 'Bedah Pertanyaan Jebakan Paling Sering Muncul', desc: 'Cara menjawab kelemahan diri, alasan pindah kerja, dan ekspektasi gaji secara cerdas.' },
      { mod: 'Modul 04', title: '15 Pertanyaan Balik Berkualitas Tinggi', desc: 'Pertanyaan strategis yang membuat interviewer terkesan dengan kedalaman analisis Anda.' }
    ],
    learning_outcomes: [
      'Menjawab pertanyaan perilaku (behavioral questions) dengan metode STAR yang runtut.',
      'Mengubah rasa gugup menjadi pembawaan profesional yang percaya diri.',
      'Menghindari jawaban klise yang sering ditolak oleh HRD.',
      'Meninggalkan impresi positif yang kuat di akhir sesi interview.'
    ],
    target_audience: [
      { role: 'Fresh Graduate', reason: 'Mempersiapkan wawancara pertama tanpa kebingungan menjawab pertanyaan pengalaman.' },
      { role: 'Career Switcher', reason: 'Menjelaskan transisi karir dan relevansi keahlian lama ke industri baru.' },
      { role: 'Karyawan yang Ingin Promosi', reason: 'Menghadapi wawancara internal kenaikan jabatan atau pindah divisi.' }
    ],
    faq: [
      { q: 'Apakah metode STAR ini cocok untuk yang belum punya pengalaman kerja?', a: 'Sangat cocok! Anda dapat menggunakan pengalaman tugas kuliah, kepanitiaan kampus, magang, atau organisasi sebagai studi kasus STAR.' }
    ],
    reviews_list: [
      { name: 'Sarah Amanda', role: 'Fresh Graduate UI/UX', rating: 5, date: '2 hari lalu', comment: 'Alhamdulillah lolos offer MT di unicorn berkat rumus STAR di PDF ini! Pertanyaan kelemahan diri yang dibahas bener-bener keluar pas user interview.' },
      { name: 'Bayu Wicaksono', role: 'Software Engineer', rating: 5, date: '1 minggu lalu', comment: 'List 15 pertanyaan baliknya keren banget. Interviewer saya sampai senyum dan bilang "pertanyaan yang sangat bagus". Langsung di-invite tahap berikutnya!' }
    ]
  },
  {
    id: 'prod-practice-journal',
    name: 'Public Speaking Practice Journal',
    title: 'Public Speaking Practice Journal',
    subtitle: 'Digital Journal 90 Hari untuk Tracking Progres Latihan Mandiri & Eliminasi Filler Words',
    category: 'Digital Journal / PDF & Goodnotes',
    badge: 'Konsistensi 📅',
    price: 10000,
    original_price: 20000,
    originalPrice: 20000,
    rating: 4.8,
    reviewCount: 195,
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80',
    coverImg: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80',
    pdf_filename: 'public-speaking-practice-journal.pdf',
    download_file: '../assets/pdf/public-speaking-practice-journal.pdf',
    download_filename: 'public-speaking-practice-journal.pdf',
    file_url: '../assets/pdf/public-speaking-practice-journal.pdf',
    file_format: 'Dokumen PDF Digital Journal • Siap Cetak & Goodnotes/Notability',
    file_size: '14 KB (Vector High-Res PDF)',
    fileSize: '14 KB',
    format: 'PDF Hyperlinked & Printable Journal',
    pages_count: '7 Halaman Format Jurnal Harian',
    language: 'Bahasa Indonesia',
    license: 'Lisensi Personal Seumur Hidup',
    description: 'Jurnal harian terstruktur untuk mencatat durasi latihan, topik yang dibahas, jumlah filler words yang terdeteksi, dan ruang refleksi diri harian. Kompatibel untuk diimpor ke aplikasi Goodnotes, Notability, Apple Books, maupun dicetak secara fisik untuk diletakkan di meja belajar Anda.',
    includes: [
      'Template Jurnal 90 Hari Latihan Mandiri Berkelanjutan format PDF A4',
      'Lembar Formulir Harian Latihan 1-Minute Speaking',
      'Lembar Tracker Penurunan Filler Word mingguan',
      'Kolom skor evaluasi kepercayaan diri harian (skala 1-10)',
      'Quote motivasi pembicara kelas dunia untuk menjaga konsistensi latihan',
      'Format siap cetak (Print-Ready) dan siap impor ke Goodnotes/Notability',
      'Akses Seumur Hidup + Akses Real-Time Online Reader'
    ],
    features: [
      'Template Jurnal 90 Hari Latihan Mandiri Berkelanjutan format PDF A4',
      'Lembar Formulir Harian Latihan 1-Minute Speaking',
      'Lembar Tracker Penurunan Filler Word mingguan',
      'Kolom skor evaluasi kepercayaan diri harian (skala 1-10)',
      'Quote motivasi pembicara kelas dunia untuk menjaga konsistensi latihan',
      'Format siap cetak (Print-Ready) dan siap impor ke Goodnotes/Notability',
      'Akses Seumur Hidup + Akses Real-Time Online Reader'
    ],
    table_of_contents: [
      { mod: 'Bagian 01', title: 'Protokol Deliberate Practice 90 Hari', desc: 'Aturan latihan 1 menit per hari yang mengalahkan sesi seminar panjang tanpa praktik.' },
      { mod: 'Bagian 02', title: 'Lembar Formulir Evaluasi Harian', desc: 'Mencatat topik bicara, durasi, jumlah kata gumaman, dan hal yang ingin diperbaiki.' },
      { mod: 'Bagian 03', title: 'Grafik Monitor Penurunan Filler Word', desc: 'Melacak penurunan kata "eee" dan "emm" secara visual dari minggu ke minggu.' },
      { mod: 'Bagian 04', title: 'Matriks Evaluasi Kepercayaan Diri 10-Point', desc: 'Mengukur perkembangan rasa percaya diri secara objektif dan terukur.' }
    ],
    learning_outcomes: [
      'Membangun kebiasaan latihan public speaking secara konsisten tanpa bolong.',
      'Melihat bukti perkembangan penurunan filler words secara nyata.',
      'Meningkatkan kesadaran vokal dan bahasa tubuh secara mandiri.'
    ],
    target_audience: [
      { role: 'Pembelajar Mandiri', reason: 'Yang ingin melacak progres latihan berbicara tanpa perlu coach fisik.' },
      { role: 'Pengguna Tablet & iPad', reason: 'Menulis catatan jurnal di aplikasi Goodnotes atau Notability.' }
    ],
    faq: [
      { q: 'Apakah bisa dicetak di kertas HVS biasa?', a: 'Bisa banget! Desain menggunakan margin standar yang sangat rapi dan hemat tinta printer.' }
    ],
    reviews_list: [
      { name: 'Dewi Lestari', role: 'Content Creator', rating: 5, date: '1 minggu lalu', comment: 'Suka banget sama jurnalnya, simpel tapi bikin termotivasi latihan tiap malam sebelum tidur di studio CONFindo.' }
    ]
  },
  {
    id: 'prod-checklist-pro',
    name: 'Presentation Checklist Pro',
    title: 'Presentation Checklist Pro',
    subtitle: 'Checklist 3 Fase Anti-Panik: H-3 Materi, H-1 Gladi Resik, dan Hari-H 15 Menit Sebelum Tampil',
    category: 'Interactive Checklist / PDF',
    badge: 'Hemat Waktu ⚡',
    price: 8000,
    original_price: 15000,
    originalPrice: 15000,
    rating: 4.7,
    reviewCount: 164,
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80',
    coverImg: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80',
    pdf_filename: 'presentation-checklist-pro.pdf',
    download_file: '../assets/pdf/presentation-checklist-pro.pdf',
    download_filename: 'presentation-checklist-pro.pdf',
    file_url: '../assets/pdf/presentation-checklist-pro.pdf',
    file_format: 'Dokumen PDF Digital Checklist • Interaktif & Printable',
    file_size: '12 KB (Vector High-Res PDF)',
    fileSize: '12 KB',
    format: 'Interactive Clickable PDF & Pocket Cheatsheet',
    pages_count: '6 Halaman Checklist & Panduan Darurat',
    language: 'Bahasa Indonesia',
    license: 'Lisensi Personal Seumur Hidup',
    description: 'Lembar periksa komprehensif dari fase H-3 penyusunan ide, H-1 gladi resik mandiri, hingga 15 menit krusial sebelum kamu mulai berbicara. Dilengkapi rencana darurat menghadapi proyektor rusak, adaptor HDMI hilang, atau suara serak di hari-H presentasi.',
    includes: [
      'Checklist terstruktur dalam 3 fase persiapan tanpa stres format PDF',
      'Daftar periksa teknis peralatan (mic, clicker wireless, converter HDMI/Type-C, audio slide)',
      'Checklist kesiapan vokal dan senam pemanasan otot lidah (A-I-U-E-O drill)',
      'Ukuran saku / wallpaper HP untuk pengecekan cepat di menit terakhir',
      'Format PDF interaktif dengan kotak centang klik langsung di layar',
      'Akses Seumur Hidup + Akses Real-Time Online Reader'
    ],
    features: [
      'Checklist terstruktur dalam 3 fase persiapan tanpa stres format PDF',
      'Daftar periksa teknis peralatan (mic, clicker wireless, converter HDMI/Type-C, audio slide)',
      'Checklist kesiapan vokal dan senam pemanasan otot lidah (A-I-U-E-O drill)',
      'Ukuran saku / wallpaper HP untuk pengecekan cepat di menit terakhir',
      'Format PDF interaktif dengan kotak centang klik langsung di layar',
      'Akses Seumur Hidup + Akses Real-Time Online Reader'
    ],
    table_of_contents: [
      { mod: 'Fase 01', title: 'H-3 Finalisasi Materi & Visual Slide', desc: 'Pengecekan ukuran font, kontras warna, dan sistem backup file multi-device.' },
      { mod: 'Fase 02', title: 'H-1 Gladi Resik & Pengecekan Alat Teknis', desc: 'Simulasi waktu bicara, tes converter kabel, dan latihan artikulasi vokal.' },
      { mod: 'Fase 03', title: 'Hari-H 15 Menit Sebelum Panggung', desc: 'Pernapasan diafragma, hidrasi suhu ruang, dan pengecekan mikrofon panggung.' },
      { mod: 'Protokol Darurat', title: 'Disaster Recovery Plan Saat Alat Rusak', desc: 'Langkah taktis jika slide macet, mic berdengung, atau waktu presentasi dipotong panitia.' }
    ],
    learning_outcomes: [
      'Memastikan tidak ada satupun persiapan krusial yang terlewat sebelum naik panggung.',
      'Menghilangkan panik akibat masalah teknis yang tak terduga.',
      'Tampil dengan kesiapan fisik dan mental maksimal 100%.'
    ],
    target_audience: [
      { role: 'Semua Pembicara', reason: 'Siapapun yang ingin tampil tenang tanpa panik menit-menit terakhir sebelum presentasi.' }
    ],
    faq: [
      { q: 'Apakah checklist ini interaktif?', a: 'Ya, Anda dapat mencentang langsung di aplikasi PDF reader atau mencetaknya untuk dibawa ke lokasi acara.' }
    ],
    reviews_list: [
      { name: 'Tri Handoko', role: 'Dosen Pembimbing', rating: 5, date: '1 minggu lalu', comment: 'Sangat bagus untuk dibagikan ke mahasiswa sebelum sidang skripsi agar mereka tidak panik dengan persiapan teknis.' }
    ]
  }
];

// Update data/db.json
const dbPath = path.join(__dirname, '..', 'data', 'db.json');
if (fs.existsSync(dbPath)) {
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  db.products = detailedProducts;
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
  console.log('Updated data/db.json with detailed products.');
}

// Update js/data.js
const dataJsPath = path.join(__dirname, '..', 'js', 'data.js');
if (fs.existsSync(dataJsPath)) {
  let content = fs.readFileSync(dataJsPath, 'utf8');
  const startMarker = '// 3. Store Products (Digital Products)';
  const endMarker = '// 4. Free Resources';
  
  const startIndex = content.indexOf(startMarker);
  const endIndex = content.indexOf(endMarker);
  
  if (startIndex !== -1 && endIndex !== -1) {
    const productsJsonString = '  products: ' + JSON.stringify(detailedProducts, null, 4) + ',\n\n  ';
    const newContent = content.substring(0, startIndex) + startMarker + '\n' + productsJsonString + content.substring(endIndex);
    fs.writeFileSync(dataJsPath, newContent, 'utf8');
    console.log('Updated js/data.js with detailed products.');
  } else {
    console.warn('Could not find markers in js/data.js');
  }
}
