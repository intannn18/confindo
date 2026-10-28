/**
 * CONFindo - Data Storage & Constants
 * Self-learning Public Speaking Platform
 */

const CONF_DATA = {
  // 1. Tutorial Categories & Items for the "Learn" Section
  categories: [
    { id: 'all', name: 'Semua Kategori' },
    { id: 'basic', name: 'Basic Public Speaking' },
    { id: 'confidence', name: 'Confidence' },
    { id: 'presentation', name: 'Presentation Skills' },
    { id: 'body-language', name: 'Body Language' },
    { id: 'voice', name: 'Voice & Intonation' },
    { id: 'storytelling', name: 'Storytelling' },
    { id: 'interview', name: 'Interview' },
    { id: 'speech-prep', name: 'Speech Preparation' },
    { id: 'nervousness', name: 'Handling Nervousness' }
  ],

  tutorials: [
    {
      id: 'tut-1',
      title: 'How to Stop Being Nervous When Speaking',
      category: 'nervousness',
      categoryName: 'Handling Nervousness',
      duration: '14 Menit',
      level: 'Pemula',
      speaker: 'Matt Abrahams (Stanford Graduate School of Business)',
      youtubeId: 'XIXvKKEQQJo',
      youtubeUrl: 'https://www.youtube.com/watch?v=XIXvKKEQQJo',
      youtube_url: 'https://www.youtube.com/watch?v=XIXvKKEQQJo',
      thumbnail: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
      description: 'Strategi praktis mengendalikan kecemasan, mengubah mindset dari "performance" menjadi "conversation", serta teknik mengelola adrenalin saat mulai berbicara.',
      takeaways: [
        'Ubah mindset dari "audisi panggung" menjadi "obrolan dua arah yang bermanfaat".',
        'Lakukan teknik pernapasan perut panjang sebelum mikrofon menyala.',
        'Fokus pada nilai yang ingin kamu bagikan ke pendengar, bukan pada kesempurnaan diri sendiri.'
      ]
    },
    {
      id: 'tut-2',
      title: 'Dasar-Dasar Public Speaking untuk Pemula yang Pemalu',
      category: 'basic',
      categoryName: 'Basic Public Speaking',
      duration: '11 Menit',
      level: 'Pemula',
      speaker: 'CONFindo Learning Series',
      youtubeId: 'i5mYphUoOCs',
      youtubeUrl: 'https://www.youtube.com/watch?v=i5mYphUoOCs',
      youtube_url: 'https://www.youtube.com/watch?v=i5mYphUoOCs',
      thumbnail: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
      description: 'Langkah awal membangun fondasi public speaking tanpa perlu bakat lahir. Kenali anatomi berbicara di depan umum secara santai dan runtut.',
      takeaways: [
        'Setiap pembicara handal dulunya adalah pemula yang sering gugup.',
        'Pahami aturan 3 detik pertama untuk merebut perhatian audiens.',
        'Gunakan kalimat pembuka yang sederhana dan tidak bertele-tele.'
      ]
    },
    {
      id: 'tut-3',
      title: 'Membangun Kepercayaan Diri Nyata di Depan Banyak Orang',
      category: 'confidence',
      categoryName: 'Confidence',
      duration: '18 Menit',
      level: 'Semua Tingkat',
      speaker: 'Amy Cuddy (Harvard Business School)',
      youtubeId: 'Ks-_Mh1QhMc',
      youtubeUrl: 'https://www.youtube.com/watch?v=Ks-_Mh1QhMc',
      youtube_url: 'https://www.youtube.com/watch?v=Ks-_Mh1QhMc',
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
      description: 'Bagaimana postur tubuh dan psikologi gestur dapat meningkatkan hormon percaya diri sebelum kamu melangkah maju ke podium atau panggung presentasi.',
      takeaways: [
        'Lakukan "Power Posing" selama 2 menit sebelum masuk ruangan presentasi.',
        'Perilaku tubuh mengirimkan sinyal rasa aman ke sistem syaraf otak.',
        'Kepercayaan diri dibangun melalui pengulangan kecil yang konsisten.'
      ]
    },
    {
      id: 'tut-4',
      title: 'How to Speak So That People Want to Listen',
      category: 'voice',
      categoryName: 'Voice & Intonation',
      duration: '10 Menit',
      level: 'Semua Tingkat',
      speaker: 'Julian Treasure (Sound Consultant & Author)',
      youtubeId: 'eIho2S0ZahI',
      youtubeUrl: 'https://www.youtube.com/watch?v=eIho2S0ZahI',
      youtube_url: 'https://www.youtube.com/watch?v=eIho2S0ZahI',
      thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
      description: 'Menguasai 4 instrumen vokal utama: register nada, warna suara, prosodi/intonasi, dan kekuatan jeda hening (the power of pause).',
      takeaways: [
        'Hindari 7 kebiasaan buruk yang membuat orang malas mendengarkan.',
        'Gunakan intonation dynamic agar presentasi tidak terdengar monoton seperti robot.',
        'Jeda hening jauh lebih elegan dan berwibawa daripada kata gumaman (filler words).'
      ]
    },
    {
      id: 'tut-5',
      title: 'Body Language Hacks: Gestur Alami yang Terlihat Karismatik',
      category: 'body-language',
      categoryName: 'Body Language',
      duration: '13 Menit',
      level: 'Menengah',
      speaker: 'Vanessa Van Edwards (Behavioral Investigator & Speaker)',
      youtubeId: 'cef35Fk7YD8',
      youtubeUrl: 'https://www.youtube.com/watch?v=cef35Fk7YD8',
      youtube_url: 'https://www.youtube.com/watch?v=cef35Fk7YD8',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
      description: 'Panduan visual meletakkan tangan, mengarahkan kontak mata ke audiens, serta menghindari gerakan cemas seperti menggoyang kaki atau memilin jari.',
      takeaways: [
        'Buka telapak tangan sedikit di atas pinggang (The Open Box Gesture).',
        'Tatap 3 titik audiens (kiri, tengah, kanan) bergantian secara wajar.',
        'Jaga bahu tetap rileks dan jangan masukkan tangan ke dalam saku celana.'
      ]
    },
    {
      id: 'tut-6',
      title: 'Rahasia Presentasi Memikat: Cara Terlihat Cerdas & Meyakinkan',
      category: 'presentation',
      categoryName: 'Presentation Skills',
      duration: '20 Menit',
      level: 'Semua Tingkat',
      speaker: 'Will Stephen (TEDx Speaker)',
      youtubeId: '8S0FDjFBj8o',
      youtubeUrl: 'https://www.youtube.com/watch?v=8S0FDjFBj8o',
      youtube_url: 'https://www.youtube.com/watch?v=8S0FDjFBj8o',
      thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      description: 'Prinsip penyampaian dan penguasaan panggung saat presentasi. Buat audiens fokus mendengarkan penjelasanmu dari awal hingga akhir.',
      takeaways: [
        'Hanya 1 pesan inti per slide presentasi.',
        'Gunakan kontras ukuran font dan gestur untuk memandu perhatian audiens.',
        'Slide adalah visual pembantu pembicara, bukan contekan naskah.'
      ]
    },
    {
      id: 'tut-7',
      title: 'Seni Storytelling: Mengubah Data Menjadi Cerita yang Mengikat',
      category: 'storytelling',
      categoryName: 'Storytelling',
      duration: '16 Menit',
      level: 'Menengah',
      speaker: 'Dananjaya Hettiarachchi (World Champion of Public Speaking)',
      youtubeId: 'bbz2boNSeL0',
      youtubeUrl: 'https://www.youtube.com/watch?v=bbz2boNSeL0',
      youtube_url: 'https://www.youtube.com/watch?v=bbz2boNSeL0',
      thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
      description: 'Formula struktur narasi: Hook emosional, konflik utama, transformasi, dan kesimpulan moral yang membuat pendengar terkesan lama.',
      takeaways: [
        'Orang melupakan angka statistik, tapi selalu mengingat cerita emosional.',
        'Mulai cerita langsung di tengah peristiwa (in media res).',
        'Gunakan detail sensorik (apa yang kamu lihat, dengar, dan rasakan).'
      ]
    },
    {
      id: 'tut-8',
      title: 'Teknik Menjawab Pertanyaan Interview Kerja dengan Metode STAR',
      category: 'interview',
      categoryName: 'Interview',
      duration: '15 Menit',
      level: 'Pemula & Fresh Grad',
      speaker: 'Career & Communication Insights',
      youtubeId: 'HG68Ymazo18',
      youtubeUrl: 'https://www.youtube.com/watch?v=HG68Ymazo18',
      youtube_url: 'https://www.youtube.com/watch?v=HG68Ymazo18',
      thumbnail: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
      description: 'Cara menjawab "Ceritakan tentang diri Anda" dan pertanyaan pengalaman sulit secara terstruktur, percaya diri, dan padat tanpa terbata-bata.',
      takeaways: [
        'Rumus STAR: Situation, Task, Action, Result nyata terukur.',
        'Batasi jawaban perkenalan maksimal 90 detik.',
        'Tunjukkan dampak kontribusi pribadimu secara jujur dan rendah hati.'
      ]
    },
    {
      id: 'tut-9',
      title: 'Cara Menyusun Naskah Pidato & Sambutan yang Berkesan',
      category: 'speech-prep',
      categoryName: 'Speech Preparation',
      duration: '12 Menit',
      level: 'Pemula',
      speaker: 'Patrick Winston (MIT Communication Series)',
      youtubeId: 'Unzc731iCUY',
      youtubeUrl: 'https://www.youtube.com/watch?v=Unzc731iCUY',
      youtube_url: 'https://www.youtube.com/watch?v=Unzc731iCUY',
      thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
      description: 'Template praktis menyusun pembukaan berkesan, 3 poin argumentasi inti, transisi mulus, dan kalimat penutup Call-to-Action yang kuat.',
      takeaways: [
        'Tentukan "One Sentence Core Message" sebelum menulis satu patah kata pun.',
        'Gunakan jembatan transisi kata sambung yang mengalir.',
        'Akhiri dengan ajakan aksi konkret, bukan sekadar ucapan terima kasih standar.'
      ]
    }
  ],

  // 2. Practice Topics for "1 Minute Speaking" & Random Generator
  practiceTopics: [
    {
      id: 'top-1',
      title: 'Introduce Yourself in 60 Seconds',
      category: 'Personal',
      prompt: 'Perkenalkan nama, latar belakang singkat, satu hal yang kamu minati saat ini, dan satu prinsip hidup yang kamu pegang teguh.'
    },
    {
      id: 'top-2',
      title: 'Talk About Your Favorite Food',
      category: 'Casual',
      prompt: 'Jelaskan makanan favoritmu: aromanya, rasa khasnya, dan memori masa lalu apa yang selalu kamu ingat saat memakannya.'
    },
    {
      id: 'top-3',
      title: 'Describe Your Dream Job',
      category: 'Career',
      prompt: 'Deskripsikan pekerjaan impianmu. Mengapa peran tersebut berarti bagimu dan bagaimana kamu ingin berkontribusi di lingkungan itu?'
    },
    {
      id: 'top-4',
      title: 'Tell Us About Your Weekend',
      category: 'Casual',
      prompt: 'Ceritakan kegiatan akhir pekan paling berkesan baru-baru ini. Apa hal tak terduga yang terjadi dan pelajaran apa yang kamu petik?'
    },
    {
      id: 'top-5',
      title: 'Why Consistency Beats Talent',
      category: 'Persuasive',
      prompt: 'Yakinkan pendengar bahwa konsistensi latihan sehari-hari jauh lebih berharga daripada sekadar bakat alami yang tidak diasah.'
    },
    {
      id: 'top-6',
      title: 'The Best Advice You Have Ever Received',
      category: 'Storytelling',
      prompt: 'Ceritakan satu nasihat terbaik yang pernah kamu terima dari siapa pun. Kapan itu diberikan dan bagaimana itu mengubah cara pandangmu?'
    },
    {
      id: 'top-7',
      title: 'Sell an Everyday Object (Pen / Water Bottle)',
      category: 'Impromptu',
      prompt: 'Pilih satu benda di mejamu (misal bolpoin atau botol air). Promosikan benda ini seolah-olah penemuan paling penting bagi mahasiswa dan pekerja!'
    },
    {
      id: 'top-8',
      title: 'A Mistake That Taught You a Huge Lesson',
      category: 'Personal',
      prompt: 'Ceritakan satu kegagalan atau kesalahan yang pernah kamu buat, bagaimana kamu mengatasinya, dan versi dirimu sekarang setelah kejadian itu.'
    },
    {
      id: 'top-9',
      title: 'Explain Your Favorite Book or Movie',
      category: 'Casual',
      prompt: 'Dalam 60 detik, rekomendasikan film atau buku favoritmu tanpa memberikan spoiler akhir ceritanya. Buat orang penasaran ingin menonton/membacanya.'
    },
    {
      id: 'top-10',
      title: 'What Would You Do With 1 Billion Rupiah?',
      category: 'Impromptu',
      prompt: 'Jika hari ini kamu menerima dana hibah 1 miliar rupiah tanpa syarat, ke mana saja dana itu akan kamu alokasikan dalam 3 prioritas utama?'
    }
  ],

  // 3. Store Products (Digital Products)
  products: [
    {
        "id": "prod-buku-ajar-public-speaking",
        "name": "Buku Ajar: Public Speaking",
        "title": "Buku Ajar: Public Speaking",
        "subtitle": "Buku Ajar Lengkap 217 Halaman karya Yerly A. Datu, S.Pd., M.Pd. (Ber-ISBN Resmi & Terdaftar IKAPI)",
        "category": "Store Digital & Panduan Utama",
        "badge": "Resmi IKAPI 🏆",
        "price": 15000,
        "original_price": 35000,
        "originalPrice": 35000,
        "rating": 5,
        "reviewCount": 420,
        "image": "assets/buku-ajar-cover.jpg",
        "coverImg": "assets/buku-ajar-cover.jpg",
        "pdf_filename": "buku-ajar-public-speaking.pdf",
        "download_file": "../assets/pdf/buku-ajar-public-speaking.pdf",
        "download_filename": "buku-ajar-public-speaking.pdf",
        "file_url": "../assets/pdf/buku-ajar-public-speaking.pdf",
        "file_format": "Buku Ajar PDF Digital Lengkap • XI + 217 Halaman Asli",
        "file_size": "1.75 MB (Buku Lengkap Ber-ISBN)",
        "fileSize": "1.75 MB",
        "format": "PDF Digital Resmi (Buku Ajar)",
        "pages_count": "217 Halaman (XI + 217 hlm)",
        "language": "Bahasa Indonesia",
        "license": "Lisensi Personal Resmi • Bebas Akses & Unduh Seumur Hidup",
        "author": "Yerly A. Datu, S.Pd., M.Pd.",
        "publisher": "PT Media Penerbit Indonesia (Anggota IKAPI No.088/SUT/2024)",
        "isbn": "978-623-8649-02-0",
        "description": "Buku Ajar \"Public Speaking\" resmi ber-ISBN 978-623-8649-02-0 karya akademisi Yerly A. Datu, S.Pd., M.Pd. yang diterbitkan oleh PT Media Penerbit Indonesia (Anggota IKAPI). Membahas tuntas 14 Bab mulai dari pengantar dan filosofi komunikasi lisan, etika komunikator, analisis audiens, berpikir kritis & logika pidato, manajemen kegugupan, penguasaan bahasa tubuh, hingga teknik persuasi dan berbicara informatif. Disertai latihan praktis dan glosarium di setiap akhir bab.",
        "includes": [
            "E-Book Lengkap 217 Halaman format PDF resmi resolusi tinggi (1.75 MB)",
            "Buku Terdaftar ISBN Resmi: 978-623-8649-02-0 (PT Media Penerbit Indonesia)",
            "Bab I: Pengantar Public Speaking & Anatomi Komunikasi Lisan",
            "Bab II: Etika Public Speaking & Tanggung Jawab Komunikator",
            "Bab III: Seni Membangun Pendahuluan & Kesimpulan yang Berkesan",
            "Bab IV: Analisis Mendalam Demografis & Psikografis Audiens",
            "Bab V: Berpikir Kritis & Penerapan Logika Deduksi-Induksi dalam Pidato",
            "Bab VI: Organisasi Materi & Pembuatan Kerangka Presentasi Efektif",
            "Bab VII: Review Materi & Pemanfaatan Umpan Balik Internal-Eksternal",
            "Bab VIII: Seni Mendengar Efektif & Menjawab Pertanyaan Audiens",
            "Bab IX: Kekuatan Diksi, Frasa, dan Menghindari Kesalahan Bahasa",
            "Bab X: Berbicara Percaya Diri, Mindfulness, & Bahasa Tubuh Terkontrol",
            "Bab XI: Persiapan Mental & Mengatasi Hambatan Tak Terduga saat Pidato",
            "Bab XII: Pemanfaatan Alat Bantu Visual (Slide, Multimedia, Whiteboard)",
            "Bab XIII: Berbicara Persuasif dengan Logos, Ethos, & Pathos",
            "Bab XIV: Berbicara Informatif yang Memikat & Struktur Presentasi",
            "Daftar Pustaka Lengkap, Glosarium Istilah Komunikasi, & Indeks Kata Kunci",
            "Akses Seumur Hidup + Akses Real-Time Online Reader"
        ],
        "features": [
            "E-Book Lengkap 217 Halaman format PDF resmi resolusi tinggi (1.75 MB)",
            "Buku Terdaftar ISBN Resmi: 978-623-8649-02-0 (PT Media Penerbit Indonesia)",
            "14 Bab Komprehensif Teori & Praktik Public Speaking",
            "Dilengkapi Soal Latihan Mandiri & Studi Kasus Tiap Bab",
            "Glosarium Istilah Komunikasi & Indeks Lengkap",
            "Format PDF High-Res Siap Cetak Mandiri / Baca di Semua Gadget",
            "Akses Seumur Hidup + Akses Real-Time Online Reader"
        ],
        "table_of_contents": [
            {
                "mod": "Bab I",
                "title": "Pengantar Public Speaking",
                "desc": "Definisi komunikasi lisan, pentingnya public speaking bagi kemajuan karir dan sosial, dasar-dasar penyampaian pesan, dan tujuan berbicara."
            },
            {
                "mod": "Bab II",
                "title": "Etika Public Speaking",
                "desc": "Prinsip etika komunikasi, kejujuran dan keterbukaan, etika sumber informasi, verifikasi fakta, serta tanggung jawab moral komunikator."
            },
            {
                "mod": "Bab III",
                "title": "Pendahuluan dan Kesimpulan",
                "desc": "Strategi membangun pembukaan yang memikat (anecdote, rhetorical question), menetapkan arah presentasi, dan teknik penutup yang berkesan."
            },
            {
                "mod": "Bab IV",
                "title": "Analisa Audiens",
                "desc": "Metode analisis demografis dan psikografis, pemetaan level pengetahuan audiens, serta adaptasi gaya komunikasi agar relevan."
            },
            {
                "mod": "Bab V",
                "title": "Berfikir Kritis dan Pemikiran",
                "desc": "Penerapan logika deduksi dan induksi, menghindari kesalahan logika (fallacies), serta menyusun argumentasi yang kokoh dan berbobot."
            },
            {
                "mod": "Bab VI",
                "title": "Organisasi dan Membuat Kerangka",
                "desc": "Struktur presentasi efektif (Opening, Body, Conclusion), penentuan poin utama, alur pemikiran logis, dan transisi kalimat yang mulus."
            },
            {
                "mod": "Bab VII",
                "title": "Review Materi dan Umpan Balik",
                "desc": "Pentingnya revisi naskah sebelum tampil, fleksibilitas persiapan, serta integrasi umpan balik internal diri sendiri dan umpan balik eksternal."
            },
            {
                "mod": "Bab VIII",
                "title": "Mendengar Efektif",
                "desc": "Peran mendengar dalam komunikasi dua arah, teknik mendengarkan aktif dan empatik, serta memberikan respon bijaksana atas pertanyaan audiens."
            },
            {
                "mod": "Bab IX",
                "title": "Menggunakan Bahasa dengan Baik",
                "desc": "Kekuatan kata berkonotasi positif, bahasa deskriptif, repetisi, variasi leksikal, serta cara menghindari kesalahan tata bahasa dan gaya monoton."
            },
            {
                "mod": "Bab X",
                "title": "Berbicara dengan Kepercayaan Diri",
                "desc": "Mindfulness, teknik pernapasan, visualisasi sukses, self-affirmation, penguasaan kontak mata, postur tubuh tegap, dan ekspresi wajah relevan."
            },
            {
                "mod": "Bab XI",
                "title": "Menyampaikan Pidato",
                "desc": "Persiapan mental sebelum naik panggung, antisipasi gangguan teknis dan fisik, serta tips menghadapi audiens yang berbeda pandangan."
            },
            {
                "mod": "Bab XII",
                "title": "Alat Bantu Visual",
                "desc": "Pemanfaatan slide presentasi, grafik data, diagram, video multimedia, flipchart/whiteboard, serta prinsip kesederhanaan desain visual."
            },
            {
                "mod": "Bab XIII",
                "title": "Berbicara dengan Persuasif",
                "desc": "Segitiga retorika Aristoteles (Logos, Ethos, Pathos), pengulangan konsep kunci, teknik storytelling emosional, dan Call to Action yang kuat."
            },
            {
                "mod": "Bab XIV",
                "title": "Berbicara dengan Informatif",
                "desc": "Kriteria ketepatan dan keterbacaan materi, perumusan tujuan jelas, memvisualisasikan data dengan narasi cerita, serta sesi tanya jawab."
            }
        ],
        "learning_outcomes": [
            "Memahami fondasi teoritis dan praktis public speaking berstandar akademik tinggi.",
            "Mampu mengatasi kegugupan panggung melalui protokol mindfulness dan olah pernapasan ilmiah.",
            "Menguasai logika penyusunan argumen deduktif-induktif serta struktur pidato yang memikat.",
            "Mampu mendesain slide visual dan memanfaatkan bahasa non-verbal (gestur, vokal, kontak mata) secara karismatik.",
            "Memiliki bekal lengkap 14 bab untuk kebutuhan kuliah, presentasi skripsi, interview kerja, hingga pidato resmi."
        ],
        "target_audience": [
            {
                "role": "Mahasiswa & Dosen",
                "reason": "Sebagai buku pegangan utama mata kuliah public speaking, komunikasi bisnis, dan persiapan sidang sarjana."
            },
            {
                "role": "Pelajar & Fresh Graduate",
                "reason": "Membangun kepercayaan diri berbicara di depan umum secara sistematis sejak dini."
            },
            {
                "role": "Praktisi, Trainer & Profesional",
                "reason": "Memperdalam etika komunikasi, retorika persuasif (Logos, Ethos, Pathos), dan kepemimpinan bicara."
            },
            {
                "role": "Umum & Pembelajar Otodidak",
                "reason": "Panduan terlengkap 217 halaman dengan harga sangat terjangkau (Rp 5.000) untuk siapa saja."
            }
        ],
        "faq": [
            {
                "q": "Apakah ini buku asli karya Ibu Yerly A. Datu?",
                "a": "Ya, ini adalah e-book resmi karya Yerly A. Datu, S.Pd., M.Pd. yang diterbitkan oleh PT Media Penerbit Indonesia dengan ISBN resmi 978-623-8649-02-0."
            },
            {
                "q": "Mengapa harganya sangat terjangkau Rp 5.000?",
                "a": "CONFindo berkomitmen menyediakan edukasi public speaking bermutu tinggi yang dapat diakses oleh semua kalangan pelajar dan mahasiswa di seluruh Indonesia tanpa hambatan biaya."
            },
            {
                "q": "Bagaimana cara membaca e-book ini setelah membeli?",
                "a": "Anda dapat langsung membaca seluruh 217 halaman di fitur Online Reader terintegrasi CONFindo atau mengunduh berkas PDF aslinya langsung ke HP, tablet, maupun laptop Anda."
            },
            {
                "q": "Apakah e-book ini bisa dicetak (print)?",
                "a": "Tentu saja! Dokumen berformat PDF resolusi tinggi siap cetak mandiri untuk keperluan belajar."
            }
        ],
        "reviews_list": [
            {
                "name": "Bambang Kurniawan",
                "role": "Mahasiswa Komunikasi, UNAIR",
                "rating": 5,
                "date": "2 hari lalu",
                "comment": "Buku ajar paling komprehensif! Penjelasan logika deduksi di Bab V dan teknik persuasi Aristoteles di Bab XIII bener-bener daging semua. Nggak nyangka e-book ber-ISBN setebal 217 halaman ini harganya cuma 5.000 perak di CONFindo. Mantap banget!"
            },
            {
                "name": "Ratna Dewanti",
                "role": "Guru & Trainer Komunikasi",
                "rating": 5,
                "date": "4 hari lalu",
                "comment": "Materi karya Bu Yerly sangat runtut dan sistematis. Soal latihan di tiap bab sangat membantu untuk evaluasi pemahaman siswa. Recommended banget buat siapa saja yang mau belajar public speaking secara serius."
            },
            {
                "name": "Fajar Sidik",
                "role": "Fresh Graduate",
                "rating": 5,
                "date": "1 minggu lalu",
                "comment": "Cocok banget buat referensi skripsi dan latihan presentasi di kantor. Format PDF-nya jernih banget, bisa langsung dibaca di web atau di-download. Terbaik!"
            }
        ]
    },
    {
        "id": "prod-presentation-template",
        "name": "Presentation Template Pro Bundle",
        "title": "Presentation Template Pro Bundle",
        "subtitle": "Panduan Master Desain 50+ Slide Minimalis, Visual Storytelling, & Blueprint Presentasi",
        "category": "Slide Blueprint / PPTX & Panduan",
        "badge": "Paling Populer 🔥",
        "price": 20000,
        "original_price": 45000,
        "originalPrice": 45000,
        "rating": 4.9,
        "reviewCount": 512,
        "image": "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
        "coverImg": "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
        "pdf_filename": "presentation-template-guide.pdf",
        "download_file": "../assets/templates/confindo-presentation-template-pro.pptx",
        "download_filename": "confindo-presentation-template-pro.pptx",
        "file_url": "../assets/templates/confindo-presentation-template-pro.pptx",
        "file_format": "File Master PowerPoint (.PPTX) & PDF Blueprint",
        "file_size": "35 KB (PowerPoint Master Template)",
        "fileSize": "35 KB",
        "format": "Master PPTX + PDF Blueprint",
        "pages_count": "Master Slide PPTX + PDF Guide",
        "language": "Bahasa Indonesia",
        "license": "Lisensi Komersial & Pribadi Bebas Duplikasi",
        "description": "Hemat puluhan jam mendesain slide. Koleksi 50+ slide siap pakai dengan hierarki tipografi modern, layout infografis, timeline, dan slide penutup yang berkesan. Disertai buku panduan PDF cara menyusun alur cerita (visual storytelling) serta tautan master duplikasi ke Canva Pro dan PowerPoint.",
        "includes": [
            "Buku Panduan PDF Desain Slide & Visual Storytelling beresolusi tinggi",
            "Tautan Akses Langsung Duplikasi Canva Pro / Free (50+ Slide)",
            "File Master PowerPoint (.PPTX) siap edit 100%",
            "Formula Aturan Emas 10-20-30 untuk Pitching & Laporan Kerja",
            "Kombinasi Skema Palet Warna Industri: Navy Blue, Dark Slate, Warm Sand",
            "Infografis data, roadmap, bagan perbandingan, dan diagram metrik",
            "Akses Seumur Hidup + Akses Real-Time Online Reader"
        ],
        "features": [
            "Buku Panduan PDF Desain Slide & Visual Storytelling beresolusi tinggi",
            "Tautan Akses Langsung Duplikasi Canva Pro / Free (50+ Slide)",
            "File Master PowerPoint (.PPTX) siap edit 100%",
            "Formula Aturan Emas 10-20-30 untuk Pitching & Laporan Kerja",
            "Kombinasi Skema Palet Warna Industri: Navy Blue, Dark Slate, Warm Sand",
            "Infografis data, roadmap, bagan perbandingan, dan diagram metrik",
            "Akses Seumur Hidup + Akses Real-Time Online Reader"
        ],
        "table_of_contents": [
            {
                "mod": "Bab 01",
                "title": "Arsitektur Slide Modern & Prinsip One Slide One Idea",
                "desc": "Membuat audiens tetap fokus mendengarkan penjelasan pembicara tanpa terdistraksi teks slide yang padat."
            },
            {
                "mod": "Bab 02",
                "title": "Aturan 10-20-30 & Manajemen Durasi Presentasi",
                "desc": "Struktur 10 slide esensial dalam 20 menit penyampaian dengan ukuran font minimal 30pt."
            },
            {
                "mod": "Bab 03",
                "title": "Hierarki Tipografi & Skema Warna Navy/Orange/Slate",
                "desc": "Pemilihan kontras warna yang nyaman di mata audiens dan memancarkan wibawa profesional."
            },
            {
                "mod": "Bab 04",
                "title": "Visual Storytelling & Desain Infografis Data",
                "desc": "Mengubah tabel angka rumit menjadi visual diagram yang langsung dimengerti dalam 5 detik."
            },
            {
                "mod": "Bab 05",
                "title": "Tautan Master Duplikasi Cloud (Canva & PPTX)",
                "desc": "Tautan satu klik untuk menduplikasi template ke workspace Canva atau mengunduh PPTX offline."
            }
        ],
        "learning_outcomes": [
            "Mendesain slide presentasi berkelas profesional dalam waktu kurang dari 30 menit.",
            "Menyajikan data statistik menjadi infografis visual yang persuasif.",
            "Menghilangkan slide yang membosankan dan penuh tumpukan paragraf teks.",
            "Memiliki template master presentasi serbaguna seumur hidup."
        ],
        "target_audience": [
            {
                "role": "Mahasiswa & Peneliti",
                "reason": "Presentasi skripsi, paper ilmiah, dan proposal kegiatan kampus."
            },
            {
                "role": "Start-up Founder & Marketer",
                "reason": "Pitch deck investor dan presentasi proposal kemitraan bisnis."
            },
            {
                "role": "Karyawan Perusahaan",
                "reason": "Laporan bulanan (monthly review), update KPI, dan townhall meeting."
            }
        ],
        "faq": [
            {
                "q": "Apakah template Canva bisa diedit dengan akun Canva gratis?",
                "a": "Bisa! Seluruh elemen desain kompatibel 100% dengan akun Canva gratis tanpa perlu langganan Canva Pro."
            },
            {
                "q": "Apakah saya bisa mengunduh file .PPTX offline?",
                "a": "Ya, tautan download file .PPTX dan panduan PDF langsung tersedia di dashboard setelah pembayaran selesai."
            }
        ],
        "reviews_list": [
            {
                "name": "Dimas Satrio",
                "role": "Business Development",
                "rating": 5,
                "date": "4 hari lalu",
                "comment": "Slide-nya beneran clean dan modern. Klien langsung puji pitch deck kami rapi banget. Panduan PDF-nya juga ngejelasin prinsip font hierarchy dengan jelas."
            },
            {
                "name": "Nadia Safitri",
                "role": "Mahasiswi Manajemen",
                "rating": 5,
                "date": "1 minggu lalu",
                "comment": "Langsung pakai template Canva-nya buat tugas akhir, nilainya dapet A! Template-nya fleksibel banget di-edit."
            }
        ]
    },
    {
        "id": "prod-speech-script",
        "name": "Speech Script Template Bundle",
        "title": "Speech Script Template Bundle",
        "subtitle": "Kumpulan 18 Naskah Pidato, Sambutan Acara, Elevator Pitch, & Transisi Bahasa Memikat",
        "category": "Script & Template Pidato",
        "badge": "Praktis ⏱️",
        "price": 15000,
        "original_price": 30000,
        "originalPrice": 30000,
        "rating": 4.8,
        "reviewCount": 247,
        "image": "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
        "coverImg": "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
        "pdf_filename": "speech-script-bundle.pdf",
        "download_file": "../assets/pdf/speech-script-bundle.pdf",
        "download_filename": "speech-script-bundle.pdf",
        "file_url": "../assets/pdf/speech-script-bundle.pdf",
        "file_format": "Dokumen PDF Digital Script & Master Docs Siap Edit",
        "file_size": "16 KB (Vector High-Res PDF)",
        "fileSize": "16 KB",
        "format": "PDF Script + Google Docs Template",
        "pages_count": "8 Halaman Naskah Siap Pakai",
        "language": "Bahasa Indonesia",
        "license": "Lisensi Personal Seumur Hidup",
        "description": "Jangan pernah bingung lagi saat ditunjuk mendadak memberikan kata sambutan, presentasi tugas, MC santai, atau elevator pitch. Berisi 18 variasi naskah teruji dengan ruang titik-titik yang siap Anda modifikasi sesuai nama, topik, dan institusi Anda dalam waktu 5 menit.",
        "includes": [
            "Buku Naskah PDF Digital 18 Skenario Pidato & Sambutan",
            "Script Elevator Pitch 30 Detik & 60 Detik untuk networking profesional",
            "Script Sambutan Ketua Panitia / Perwakilan Organisasi Mahasiswa",
            "Script Presentasi Tugas Akhir & Sidang Skripsi yang terstruktur",
            "20+ Template Kalimat Jembatan Transisi Mulus antar Topik Bahasan",
            "Script Penutupan Berkesan dengan Teknik Call-to-Action Kuat",
            "Akses Seumur Hidup + Akses Real-Time Online Reader"
        ],
        "features": [
            "Buku Naskah PDF Digital 18 Skenario Pidato & Sambutan",
            "Script Elevator Pitch 30 Detik & 60 Detik untuk networking profesional",
            "Script Sambutan Ketua Panitia / Perwakilan Organisasi Mahasiswa",
            "Script Presentasi Tugas Akhir & Sidang Skripsi yang terstruktur",
            "20+ Template Kalimat Jembatan Transisi Mulus antar Topik Bahasan",
            "Script Penutupan Berkesan dengan Teknik Call-to-Action Kuat",
            "Akses Seumur Hidup + Akses Real-Time Online Reader"
        ],
        "table_of_contents": [
            {
                "mod": "Bagian 01",
                "title": "Elevator Pitch 30s & 60s Networking",
                "desc": "Perkenalan diri singkat, padat, dan meninggalkan kesan mendalam saat bertemu relasi baru."
            },
            {
                "mod": "Bagian 02",
                "title": "Kata Sambutan Resmi & Non-Resmi",
                "desc": "Template sambutan ketua acara, perwakilan rekan kerja, dan pembukaan seminar edukatif."
            },
            {
                "mod": "Bagian 03",
                "title": "Naskah Presentasi Sidang & Ujian Akademik",
                "desc": "Alur kalimat pembuka, penjabaran metodologi, argumentasi hasil, dan kalimat penutup sidang."
            },
            {
                "mod": "Bagian 04",
                "title": "Bank Kalimat Transisi Mulus (Bridging Phrases)",
                "desc": "20+ jembatan kata untuk berpindah slide tanpa kaku atau terdiam bingung."
            }
        ],
        "learning_outcomes": [
            "Mampu berbicara spontan dalam hitungan menit tanpa rasa panik.",
            "Menyusun naskah pidato berwibawa dengan struktur alur yang mengalir.",
            "Menguasai kalimat transisi antar slide secara mulus.",
            "Percaya diri saat diminta memberikan kata sambutan dadakan."
        ],
        "target_audience": [
            {
                "role": "Ketua Panitia & Pengurus Organisasi",
                "reason": "Memberikan sambutan pembukaan dan penutupan kegiatan acara."
            },
            {
                "role": "Mahasiswa Tingkat Akhir",
                "reason": "Mempersiapkan naskah sidang skripsi dan presentasi seminar hasil."
            },
            {
                "role": "Profesional & Freelancer",
                "reason": "Mempersiapkan elevator pitch untuk networking dan pitching klien."
            }
        ],
        "faq": [
            {
                "q": "Apakah naskah ini bisa saya modifikasi dengan kata-kata sendiri?",
                "a": "Sangat bisa! Naskah dirancang modular dengan panduan kata kunci yang mudah disesuaikan dengan gaya bicara Anda."
            }
        ],
        "reviews_list": [
            {
                "name": "Fajar Nugroho",
                "role": "Ketua Himpunan Mahasiswa",
                "rating": 5,
                "date": "5 hari lalu",
                "comment": "Penyelamat banget waktu ditunjuk sambutan di depan dekanat. Naskahnya tinggal saya isi nama acara dan alurnya rapi banget."
            },
            {
                "name": "Kurniawan",
                "role": "Account Executive",
                "rating": 5,
                "date": "2 minggu lalu",
                "comment": "Elevator pitch 60 detiknya bener-bener impactful pas networking session event expo."
            }
        ]
    },
    {
        "id": "prod-interview-kit",
        "name": "Interview Preparation Kit",
        "title": "Interview Preparation Kit",
        "subtitle": "Panduan Menjawab 40+ Pertanyaan Wawancara Kerja HRD, Metode STAR, & 15 Pertanyaan Balik",
        "category": "Panduan Karir & Interview",
        "badge": "Rekomendasi Karir 💼",
        "price": 15000,
        "original_price": 30000,
        "originalPrice": 30000,
        "rating": 4.9,
        "reviewCount": 418,
        "image": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80",
        "coverImg": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80",
        "pdf_filename": "interview-prep-kit-star.pdf",
        "download_file": "../assets/pdf/interview-prep-kit-star.pdf",
        "download_filename": "interview-prep-kit-star.pdf",
        "file_url": "../assets/pdf/interview-prep-kit-star.pdf",
        "file_format": "Dokumen PDF Digital Workbook • Interaktif STAR Method",
        "file_size": "18 KB (Vector High-Res PDF)",
        "fileSize": "18 KB",
        "format": "PDF Workbook + Notion Template",
        "pages_count": "8 Halaman Workbook & Contoh Jawaban",
        "language": "Bahasa Indonesia",
        "license": "Lisensi Personal Seumur Hidup",
        "description": "Senjata rahasia fresh graduate dan profesional muda untuk tampil tenang, berwibawa, dan memikat di hadapan HRD dan user interviewer. Dilengkapi formula STAR (Situation, Task, Action, Result), bank 40+ pertanyaan jebakan beserta contoh jawaban ideal, checklist gestur wawancara online/offline, dan 15 pertanyaan berbobot untuk diajukan balik ke interviewer.",
        "includes": [
            "Buku Panduan PDF Workbook Metode STAR (Situation, Task, Action, Result)",
            "Bank 40+ Pertanyaan interview umum & jebakan beserta contoh jawaban kata-per-kata",
            "Panduan perkenalan diri 90 detik yang memorable dan tidak monoton",
            "15 Pertanyaan strategis berkualitas untuk diajukan balik ke interviewer di akhir sesi",
            "Checklist etiket & gestur wawancara online (Zoom/GMeet) vs offline meeting",
            "Panduan etika follow-up email pasca wawancara kerja",
            "Akses Seumur Hidup + Akses Real-Time Online Reader"
        ],
        "features": [
            "Buku Panduan PDF Workbook Metode STAR (Situation, Task, Action, Result)",
            "Bank 40+ Pertanyaan interview umum & jebakan beserta contoh jawaban kata-per-kata",
            "Panduan perkenalan diri 90 detik yang memorable dan tidak monoton",
            "15 Pertanyaan strategis berkualitas untuk diajukan balik ke interviewer di akhir sesi",
            "Checklist etiket & gestur wawancara online (Zoom/GMeet) vs offline meeting",
            "Panduan etika follow-up email pasca wawancara kerja",
            "Akses Seumur Hidup + Akses Real-Time Online Reader"
        ],
        "table_of_contents": [
            {
                "mod": "Modul 01",
                "title": "Fondasi Wawancara Kerja & Mindset Rekruter",
                "desc": "Memahami apa yang sebenarnya dicari oleh HRD di balik setiap pertanyaan wawancara."
            },
            {
                "mod": "Modul 02",
                "title": "Metode STAR (Situation, Task, Action, Result)",
                "desc": "Formula teruji menyusun cerita pengalaman proyek menjadi bukti nyata kapabilitas Anda."
            },
            {
                "mod": "Modul 03",
                "title": "Bedah Pertanyaan Jebakan Paling Sering Muncul",
                "desc": "Cara menjawab kelemahan diri, alasan pindah kerja, dan ekspektasi gaji secara cerdas."
            },
            {
                "mod": "Modul 04",
                "title": "15 Pertanyaan Balik Berkualitas Tinggi",
                "desc": "Pertanyaan strategis yang membuat interviewer terkesan dengan kedalaman analisis Anda."
            }
        ],
        "learning_outcomes": [
            "Menjawab pertanyaan perilaku (behavioral questions) dengan metode STAR yang runtut.",
            "Mengubah rasa gugup menjadi pembawaan profesional yang percaya diri.",
            "Menghindari jawaban klise yang sering ditolak oleh HRD.",
            "Meninggalkan impresi positif yang kuat di akhir sesi interview."
        ],
        "target_audience": [
            {
                "role": "Fresh Graduate",
                "reason": "Mempersiapkan wawancara pertama tanpa kebingungan menjawab pertanyaan pengalaman."
            },
            {
                "role": "Career Switcher",
                "reason": "Menjelaskan transisi karir dan relevansi keahlian lama ke industri baru."
            },
            {
                "role": "Karyawan yang Ingin Promosi",
                "reason": "Menghadapi wawancara internal kenaikan jabatan atau pindah divisi."
            }
        ],
        "faq": [
            {
                "q": "Apakah metode STAR ini cocok untuk yang belum punya pengalaman kerja?",
                "a": "Sangat cocok! Anda dapat menggunakan pengalaman tugas kuliah, kepanitiaan kampus, magang, atau organisasi sebagai studi kasus STAR."
            }
        ],
        "reviews_list": [
            {
                "name": "Sarah Amanda",
                "role": "Fresh Graduate UI/UX",
                "rating": 5,
                "date": "2 hari lalu",
                "comment": "Alhamdulillah lolos offer MT di unicorn berkat rumus STAR di PDF ini! Pertanyaan kelemahan diri yang dibahas bener-bener keluar pas user interview."
            },
            {
                "name": "Bayu Wicaksono",
                "role": "Software Engineer",
                "rating": 5,
                "date": "1 minggu lalu",
                "comment": "List 15 pertanyaan baliknya keren banget. Interviewer saya sampai senyum dan bilang \"pertanyaan yang sangat bagus\". Langsung di-invite tahap berikutnya!"
            }
        ]
    },
    {
        "id": "prod-practice-journal",
        "name": "Public Speaking Practice Journal",
        "title": "Public Speaking Practice Journal",
        "subtitle": "Digital Journal 90 Hari untuk Tracking Progres Latihan Mandiri & Eliminasi Filler Words",
        "category": "Journal & Evaluasi Mandiri",
        "badge": "Konsistensi 📅",
        "price": 15000,
        "original_price": 25000,
        "originalPrice": 25000,
        "rating": 4.8,
        "reviewCount": 195,
        "image": "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80",
        "coverImg": "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80",
        "pdf_filename": "public-speaking-practice-journal.pdf",
        "download_file": "../assets/pdf/public-speaking-practice-journal.pdf",
        "download_filename": "public-speaking-practice-journal.pdf",
        "file_url": "../assets/pdf/public-speaking-practice-journal.pdf",
        "file_format": "Dokumen PDF Digital Journal • Siap Cetak & Goodnotes/Notability",
        "file_size": "14 KB (Vector High-Res PDF)",
        "fileSize": "14 KB",
        "format": "PDF Hyperlinked & Printable Journal",
        "pages_count": "7 Halaman Format Jurnal Harian",
        "language": "Bahasa Indonesia",
        "license": "Lisensi Personal Seumur Hidup",
        "description": "Jurnal harian terstruktur untuk mencatat durasi latihan, topik yang dibahas, jumlah filler words yang terdeteksi, dan ruang refleksi diri harian. Kompatibel untuk diimpor ke aplikasi Goodnotes, Notability, Apple Books, maupun dicetak secara fisik untuk diletakkan di meja belajar Anda.",
        "includes": [
            "Template Jurnal 90 Hari Latihan Mandiri Berkelanjutan format PDF A4",
            "Lembar Formulir Harian Latihan 1-Minute Speaking",
            "Lembar Tracker Penurunan Filler Word mingguan",
            "Kolom skor evaluasi kepercayaan diri harian (skala 1-10)",
            "Quote motivasi pembicara kelas dunia untuk menjaga konsistensi latihan",
            "Format siap cetak (Print-Ready) dan siap impor ke Goodnotes/Notability",
            "Akses Seumur Hidup + Akses Real-Time Online Reader"
        ],
        "features": [
            "Template Jurnal 90 Hari Latihan Mandiri Berkelanjutan format PDF A4",
            "Lembar Formulir Harian Latihan 1-Minute Speaking",
            "Lembar Tracker Penurunan Filler Word mingguan",
            "Kolom skor evaluasi kepercayaan diri harian (skala 1-10)",
            "Quote motivasi pembicara kelas dunia untuk menjaga konsistensi latihan",
            "Format siap cetak (Print-Ready) dan siap impor ke Goodnotes/Notability",
            "Akses Seumur Hidup + Akses Real-Time Online Reader"
        ],
        "table_of_contents": [
            {
                "mod": "Bagian 01",
                "title": "Protokol Deliberate Practice 90 Hari",
                "desc": "Aturan latihan 1 menit per hari yang mengalahkan sesi seminar panjang tanpa praktik."
            },
            {
                "mod": "Bagian 02",
                "title": "Lembar Formulir Evaluasi Harian",
                "desc": "Mencatat topik bicara, durasi, jumlah kata gumaman, dan hal yang ingin diperbaiki."
            },
            {
                "mod": "Bagian 03",
                "title": "Grafik Monitor Penurunan Filler Word",
                "desc": "Melacak penurunan kata \"eee\" dan \"emm\" secara visual dari minggu ke minggu."
            },
            {
                "mod": "Bagian 04",
                "title": "Matriks Evaluasi Kepercayaan Diri 10-Point",
                "desc": "Mengukur perkembangan rasa percaya diri secara objektif dan terukur."
            }
        ],
        "learning_outcomes": [
            "Membangun kebiasaan latihan public speaking secara konsisten tanpa bolong.",
            "Melihat bukti perkembangan penurunan filler words secara nyata.",
            "Meningkatkan kesadaran vokal dan bahasa tubuh secara mandiri."
        ],
        "target_audience": [
            {
                "role": "Pembelajar Mandiri",
                "reason": "Yang ingin melacak progres latihan berbicara tanpa perlu coach fisik."
            },
            {
                "role": "Pengguna Tablet & iPad",
                "reason": "Menulis catatan jurnal di aplikasi Goodnotes atau Notability."
            }
        ],
        "faq": [
            {
                "q": "Apakah bisa dicetak di kertas HVS biasa?",
                "a": "Bisa banget! Desain menggunakan margin standar yang sangat rapi dan hemat tinta printer."
            }
        ],
        "reviews_list": [
            {
                "name": "Dewi Lestari",
                "role": "Content Creator",
                "rating": 5,
                "date": "1 minggu lalu",
                "comment": "Suka banget sama jurnalnya, simpel tapi bikin termotivasi latihan tiap malam sebelum tidur di studio CONFindo."
            }
        ]
    },
    {
        "id": "prod-checklist-pro",
        "name": "Presentation Checklist Pro",
        "title": "Presentation Checklist Pro",
        "subtitle": "Checklist 3 Fase Anti-Panik: H-3 Materi, H-1 Gladi Resik, dan Hari-H 15 Menit Sebelum Tampil",
        "category": "Checklist & Persiapan Cepat",
        "badge": "Hemat Waktu ⚡",
        "price": 15000,
        "original_price": 25000,
        "originalPrice": 25000,
        "rating": 4.7,
        "reviewCount": 164,
        "image": "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80",
        "coverImg": "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80",
        "pdf_filename": "presentation-checklist-pro.pdf",
        "download_file": "../assets/pdf/presentation-checklist-pro.pdf",
        "download_filename": "presentation-checklist-pro.pdf",
        "file_url": "../assets/pdf/presentation-checklist-pro.pdf",
        "file_format": "Dokumen PDF Digital Checklist • Interaktif & Printable",
        "file_size": "12 KB (Vector High-Res PDF)",
        "fileSize": "12 KB",
        "format": "Interactive Clickable PDF & Pocket Cheatsheet",
        "pages_count": "6 Halaman Checklist & Panduan Darurat",
        "language": "Bahasa Indonesia",
        "license": "Lisensi Personal Seumur Hidup",
        "description": "Lembar periksa komprehensif dari fase H-3 penyusunan ide, H-1 gladi resik mandiri, hingga 15 menit krusial sebelum kamu mulai berbicara. Dilengkapi rencana darurat menghadapi proyektor rusak, adaptor HDMI hilang, atau suara serak di hari-H presentasi.",
        "includes": [
            "Checklist terstruktur dalam 3 fase persiapan tanpa stres format PDF",
            "Daftar periksa teknis peralatan (mic, clicker wireless, converter HDMI/Type-C, audio slide)",
            "Checklist kesiapan vokal dan senam pemanasan otot lidah (A-I-U-E-O drill)",
            "Ukuran saku / wallpaper HP untuk pengecekan cepat di menit terakhir",
            "Format PDF interaktif dengan kotak centang klik langsung di layar",
            "Akses Seumur Hidup + Akses Real-Time Online Reader"
        ],
        "features": [
            "Checklist terstruktur dalam 3 fase persiapan tanpa stres format PDF",
            "Daftar periksa teknis peralatan (mic, clicker wireless, converter HDMI/Type-C, audio slide)",
            "Checklist kesiapan vokal dan senam pemanasan otot lidah (A-I-U-E-O drill)",
            "Ukuran saku / wallpaper HP untuk pengecekan cepat di menit terakhir",
            "Format PDF interaktif dengan kotak centang klik langsung di layar",
            "Akses Seumur Hidup + Akses Real-Time Online Reader"
        ],
        "table_of_contents": [
            {
                "mod": "Fase 01",
                "title": "H-3 Finalisasi Materi & Visual Slide",
                "desc": "Pengecekan ukuran font, kontras warna, dan sistem backup file multi-device."
            },
            {
                "mod": "Fase 02",
                "title": "H-1 Gladi Resik & Pengecekan Alat Teknis",
                "desc": "Simulasi waktu bicara, tes converter kabel, dan latihan artikulasi vokal."
            },
            {
                "mod": "Fase 03",
                "title": "Hari-H 15 Menit Sebelum Panggung",
                "desc": "Pernapasan diafragma, hidrasi suhu ruang, dan pengecekan mikrofon panggung."
            },
            {
                "mod": "Protokol Darurat",
                "title": "Disaster Recovery Plan Saat Alat Rusak",
                "desc": "Langkah taktis jika slide macet, mic berdengung, atau waktu presentasi dipotong panitia."
            }
        ],
        "learning_outcomes": [
            "Memastikan tidak ada satupun persiapan krusial yang terlewat sebelum naik panggung.",
            "Menghilangkan panik akibat masalah teknis yang tak terduga.",
            "Tampil dengan kesiapan fisik dan mental maksimal 100%."
        ],
        "target_audience": [
            {
                "role": "Semua Pembicara",
                "reason": "Siapapun yang ingin tampil tenang tanpa panik menit-menit terakhir sebelum presentasi."
            }
        ],
        "faq": [
            {
                "q": "Apakah checklist ini interaktif?",
                "a": "Ya, Anda dapat mencentang langsung di aplikasi PDF reader atau mencetaknya untuk dibawa ke lokasi acara."
            }
        ],
        "reviews_list": [
            {
                "name": "Tri Handoko",
                "role": "Dosen Pembimbing",
                "rating": 5,
                "date": "1 minggu lalu",
                "comment": "Sangat bagus untuk dibagikan ke mahasiswa sebelum sidang skripsi agar mereka tidak panik dengan persiapan teknis."
            }
        ]
    }
],

  // 4. Free Resources
  freeResources: [
    {
      id: 'free-1',
      title: 'Public Speaking Checklist Ringkas',
      description: 'Daftar periksa 10 poin dasar yang wajib kamu pastikan sebelum berbicara di depan kelas atau rapat kantor.',
      format: 'PDF • 2 Halaman',
      downloads: '4.8k+',
      icon: 'file-check'
    },
    {
      id: 'free-2',
      title: '30-Day Speaking Challenge Planner',
      description: 'Lembar rencana cetak (printable) untuk mencentang progres tantangan 30 hari meningkatkan percaya diri.',
      format: 'PDF Printable',
      downloads: '6.2k+',
      icon: 'calendar'
    },
    {
      id: 'free-3',
      title: '10 Contoh Speech Opening Memikat',
      description: 'Contoh kalimat pembuka nyata menggunakan teknik cerita, fakta mengejutkan, dan pertanyaan retoris.',
      format: 'PDF E-Cheatsheet',
      downloads: '8.1k+',
      icon: 'sparkles'
    },
    {
      id: 'free-4',
      title: 'Quick Presentation Tips untuk Mahasiswa',
      description: 'Tips singkat menyajikan presentasi kelompok atau sidang tugas akhir agar dinilai lugas dan meyakinkan oleh dosen.',
      format: 'PDF Guide',
      downloads: '5.5k+',
      icon: 'lightbulb'
    },
    {
      id: 'free-5',
      title: '25 Pertanyaan Wawancara Kerja Terpopuler',
      description: 'Daftar pertanyaan yang paling sering keluar saat interview HRD dan petunjuk poin apa yang sebenarnya mereka cari.',
      format: 'PDF Question Bank',
      downloads: '7.3k+',
      icon: 'briefcase'
    }
  ],

  // 5. 30-Day Challenge List
  challengeDays: [
    { day: 1, title: 'Introduce Yourself', instruction: 'Bicaralah selama 60 detik memperkenalkan nama, kesibukan, dan 1 hal unik tentangmu tanpa kata "eee".' },
    { day: 2, title: 'Talk About Your Hobby', instruction: 'Ceritakan hobimu dan mengapa kegiatan itu membuatmu bersemangat dan rileks.' },
    { day: 3, title: 'Explain Your Favorite Product', instruction: 'Jelaskan satu produk atau aplikasi favoritmu seolah-olah kamu merekomendasikannya ke teman dekat.' },
    { day: 4, title: 'Tell a Short Story', instruction: 'Ceritakan satu kejadian lucu atau tak terduga yang pernah kamu alami dalam waktu maksimal 90 detik.' },
    { day: 5, title: 'Give a 1-Minute Presentation', instruction: 'Pilih topik bebas (misal: "Manfaat bangun pagi" atau "Kopi vs Teh") dan sampaikan dalam 1 menit terstruktur.' },
    { day: 6, title: 'Explain a Concept Simply', instruction: 'Jelaskan satu konsep yang kamu pahami seolah-olah kamu menjelaskannya kepada anak usia 10 tahun.' },
    { day: 7, title: 'Share an Inspiring Quote', instruction: 'Sebutkan satu kutipan favoritmu dan ceritakan bagaimana kutipan itu memengaruhi tindakanmu.' },
    { day: 8, title: 'Talk About a Overcome Fear', instruction: 'Ceritakan satu ketakutan yang berhasil kamu hadapi dan apa yang kamu rasakan sesudahnya.' },
    { day: 9, title: 'Describe Your Dream City', instruction: 'Bayangkan kota impianmu untuk tinggal. Ceritakan suasananya, makanannya, dan orang-orangnya.' },
    { day: 10, title: 'Impromptu: The Item on Your Desk', instruction: 'Ambil benda apa saja di dekatmu dan bicaralah tentang pentingnya benda tersebut selama 60 detik tanpa persiapan.' },
    { day: 11, title: 'The Power of Pausing', instruction: 'Bicaralah selama 1 menit dan sengaja masukkan minimal 4 kali jeda hening selama 2 detik untuk menekankan poin.' },
    { day: 12, title: 'Practice High and Low Pitch', instruction: 'Latih intonasi: bacakan 1 paragraf berita dengan variasi nada ceria, lalu ulangi dengan nada formal berwibawa.' },
    { day: 13, title: 'Sell an Imaginary Invention', instruction: 'Promosikan alat khayalan (misal: jam tangan yang bisa memanjangkan waktu istirahat) selama 60 detik.' },
    { day: 14, title: 'Defend an Unpopular Opinion', instruction: 'Pilih satu pendapat yang tidak biasa dan jelaskan argumen logismu secara sopan dan tenang.' },
    { day: 15, title: 'Mid-Challenge Check: Elevator Pitch', instruction: 'Perkenalkan dirimu dan tujuan karir/belajarmu dalam format elevator pitch 45 detik yang padat.' },
    { day: 16, title: 'Speak Without Filler Words', instruction: 'Lakukan speaking 1 menit. Setiap kali ingin berkata "eee" atau "anu", tutup mulut dan gantikan dengan hening.' },
    { day: 17, title: 'Story with Strong Emotions', instruction: 'Ceritakan momen yang membuatmu sangat terharu atau bangga, gunakan intonasi yang menggambarkan perasaan itu.' },
    { day: 18, title: 'Explain How Something Works', instruction: 'Jelaskan cara kerja hal sederhana (misal: microwave, algoritma media sosial, atau cara menyeduh kopi manual).' },
    { day: 19, title: 'Talk to an Imaginary Audience of 500', instruction: 'Berdirilah tegap, gunakan suara proyeksi dada, dan sampaikan pidato pembuka penyambutan ke 500 orang audiens.' },
    { day: 20, title: 'Give Constructive Feedback', instruction: 'Latih kemampuan berbicara diplomatis: sampaikan masukan perbaikan untuk proyek imajiner secara santun.' },
    { day: 21, title: 'Speak About Someone You Admire', instruction: 'Jelaskan 3 sifat utama dari seseorang yang kamu kagumi dan bagaimana kamu meneladaninya.' },
    { day: 22, title: 'Overcoming a Difficult Decision', instruction: 'Ceritakan saat kamu harus memilih pilihan sulit dan bagaimana proses pertimbangan logismu.' },
    { day: 23, title: 'Story of Curiosity', instruction: 'Bicarakan hal baru yang akhir-akhir ini membuatmu penasaran dan bagaimana kamu mempelajarinya.' },
    { day: 24, title: 'Persuasive Speech: Healthy Habits', instruction: 'Yakinkan pendengar untuk mulai minum 2 liter air per hari atau jalan kaki 15 menit setiap pagi.' },
    { day: 25, title: 'Handling an Unexpected Question', instruction: 'Simulasikan sesi tanya jawab: buat pertanyaan sulit dari audiens lalu jawab langsung secara diplomatis.' },
    { day: 26, title: 'Body Language Alignment', instruction: 'Lakukan speaking sambil berdiri di depan cermin atau kamera dan latih posisi tangan terbuka (open gesture).' },
    { day: 27, title: 'Memorable Closing Technique', instruction: 'Latih hanya bagian penutup: berikan rangkuman kuat dan Call to Action yang menggetarkan selama 45 detik.' },
    { day: 28, title: 'Talk About Future Tech or Trends', instruction: 'Bagikan pandanganmu tentang masa depan teknologi, AI, atau dunia kerja dalam 5 tahun mendatang.' },
    { day: 29, title: 'Rehearse a 2-Minute Full Speech', instruction: 'Gabungkan Opening, 2 Poin Utama, dan Closing dalam satu naskah utuh berdurasi 2 menit lancar.' },
    { day: 30, title: 'Capstone: Speak with Confidence!', instruction: 'Rayakan hari terakhir! Bicaralah selama 3 menit tentang transformasi perjalanan belajarmu di CONFindo.' }
  ],

  // 6. Testimonials (No coaches / No mentors!)
  testimonials: [
    {
      name: 'Rian Pramudya',
      role: 'Mahasiswa Teknik Semester 6, UI',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
      comment: 'Dulu kalau disuruh presentasi tugas kelompok saya selalu lempar ke teman lain karena takut gemetar. Di CONFindo saya latihan mandiri pakai fitur 1 Minute Speaking dan Filler Word Tracker setiap malam. Sekarang pas sidang seminar proposal kemarin saya santai banget dan dapat nilai A!',
      tag: 'Mahasiswa'
    },
    {
      name: 'Sarah Amanda',
      role: 'Fresh Graduate & Job Seeker',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      comment: 'Interview Preparation Kit dan video tutorial di sini sangat praktis! Tanpa perlu bayar kelas mentoring jutaan rupiah, saya belajar menstruktur jawaban pakai metode STAR secara otodidak. Minggu lalu akhirnya lolos wawancara di perusahaan idaman.',
      tag: 'Fresh Graduate'
    },
    {
      name: 'Dimas Pratama',
      role: 'Junior Product Manager',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      comment: 'Template presentasinya sangat rapi dan slide-nya tidak membosankan. Fitur Speech Structure builder ngebantu saya nyusun materi sprint review mingguan ke stakeholder dalam hitungan menit. Desain platformnya modern dan gampang dipakai.',
      tag: 'Karyawan'
    },
    {
      name: 'Nabila Zahra',
      role: 'Sales & Business Development',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      comment: 'Yang paling saya suka adalah tantangan 30-Day Challenge-nya. Rasanya kayak game seru harian yang bikin kita dipaksa ngomong 1 menit tiap hari. Filler word "eee" dan "kayak" saya berkurang drastis setelah 2 minggu!',
      tag: 'Pekerja Muda'
    },
    {
      name: 'Kevin Alamsyah',
      role: 'Siswa SMA Kelas 12',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      comment: 'Membantu banget untuk persiapan seleksi wawancara beasiswa kuliah. Tools timer dan random topic-nya gratis dan langsung jalan di HP tanpa ribet. CONFindo bener-bener jadi teman latihan terbaik di kamar.',
      tag: 'Pelajar'
    },
    {
      name: 'Jessica Tan',
      role: 'Creative Freelancer & Content Creator',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      comment: 'Platform self-learning yang jujur dan to the point. Tidak ada janji muluk-muluk atau paksaan beli sesi konsultasi. Kita benar-benar dilatih untuk mandiri, disiplin, dan percaya sama kapasitas suara kita sendiri.',
      tag: 'Freelancer'
    }
  ]
};
