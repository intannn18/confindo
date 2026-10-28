const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

const outputDir = path.join(__dirname, '..', 'assets', 'pdf');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Brand Colors
const COLOR_BLUE = rgb(11 / 255, 87 / 255, 150 / 255);       // #0B5796
const COLOR_DARK_BLUE = rgb(8 / 255, 67 / 255, 117 / 255);   // #084375
const COLOR_ORANGE = rgb(230 / 255, 92 / 255, 0 / 255);      // #E65C00
const COLOR_SLATE_900 = rgb(15 / 255, 23 / 255, 42 / 255);  // #0F172A
const COLOR_SLATE_700 = rgb(51 / 255, 65 / 255, 85 / 255);  // #334155
const COLOR_SLATE_500 = rgb(100 / 255, 116 / 255, 139 / 255); // #64748B
const COLOR_LIGHT_BG = rgb(248 / 255, 250 / 255, 252 / 255); // #F8FAFC
const COLOR_BORDER = rgb(226 / 255, 232 / 255, 240 / 255);  // #E2E8F0
const COLOR_WHITE = rgb(1, 1, 1);
const COLOR_EMERALD = rgb(16 / 255, 185 / 255, 129 / 255);

function cleanAscii(str) {
  if (!str) return '';
  return String(str)
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/[\u2022]/g, '-')
    .replace(/[^\x20-\x7E\t\n\r]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Helper to wrap text into lines fitting max width
function wrapText(text, font, size, maxWidth) {
  const sanitized = cleanAscii(text);
  const words = sanitized.split(' ');
  const lines = [];
  let currentLine = '';

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const testLine = currentLine ? currentLine + ' ' + word : word;
    const width = font.widthOfTextAtSize(testLine, size);
    if (width <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

// PDF Builder Class
class PdfBookBuilder {
  constructor(title, subtitle, category, badge, fileName) {
    this.title = title;
    this.subtitle = subtitle;
    this.category = category;
    this.badge = badge;
    this.fileName = fileName;
    this.pages = [];
  }

  async init() {
    this.pdfDoc = await PDFDocument.create();
    this.fontBold = await this.pdfDoc.embedFont(StandardFonts.HelveticaBold);
    this.fontRegular = await this.pdfDoc.embedFont(StandardFonts.Helvetica);
    this.fontOblique = await this.pdfDoc.embedFont(StandardFonts.HelveticaOblique);

    const origAddPage = this.pdfDoc.addPage.bind(this.pdfDoc);
    this.pdfDoc.addPage = (...args) => {
      const page = origAddPage(...args);
      const origDrawText = page.drawText.bind(page);
      page.drawText = (text, options) => {
        return origDrawText(cleanAscii(text), options);
      };
      return page;
    };
  }

  addCoverPage() {
    const page = this.pdfDoc.addPage([595.28, 841.89]); // A4
    const { width, height } = page.getSize();

    // Background Top Banner
    page.drawRectangle({
      x: 0,
      y: height - 260,
      width: width,
      height: 260,
      color: COLOR_BLUE
    });

    // Accent line
    page.drawRectangle({
      x: 0,
      y: height - 268,
      width: width,
      height: 8,
      color: COLOR_ORANGE
    });

    // Brand tag
    page.drawText('CONFINDO DIGITAL STORE & ACADEMY', {
      x: 48,
      y: height - 60,
      size: 11,
      font: this.fontBold,
      color: COLOR_WHITE
    });

    // Badge
    page.drawRectangle({
      x: 48,
      y: height - 105,
      width: 140,
      height: 24,
      color: COLOR_ORANGE
    });
    // Sanitize badge and texts for WinAnsi
    const cleanBadge = (this.badge || '').replace(/[^\x00-\x7F]/g, '').trim() || 'BEST SELLER';
    page.drawText(cleanBadge.toUpperCase(), {
      x: 58,
      y: height - 98,
      size: 10,
      font: this.fontBold,
      color: COLOR_WHITE
    });

    // Category
    page.drawText(`Kategori: ${this.category} • Edisi 2026`, {
      x: 200,
      y: height - 96,
      size: 10,
      font: this.fontRegular,
      color: rgb(219 / 255, 234 / 255, 254 / 255)
    });

    // Main Cover Title (wrapped)
    const titleLines = wrapText(this.title, this.fontBold, 26, width - 96);
    let titleY = height - 150;
    titleLines.forEach(line => {
      page.drawText(line, {
        x: 48,
        y: titleY,
        size: 26,
        font: this.fontBold,
        color: COLOR_WHITE
      });
      titleY -= 32;
    });

    // Subtitle in lower white section
    let subY = height - 320;
    const subLines = wrapText(this.subtitle, this.fontRegular, 13, width - 96);
    subLines.forEach(line => {
      page.drawText(line, {
        x: 48,
        y: subY,
        size: 13,
        font: this.fontRegular,
        color: COLOR_SLATE_700
      });
      subY -= 20;
    });

    // Decorative highlight card
    page.drawRectangle({
      x: 48,
      y: 130,
      width: width - 96,
      height: 140,
      color: COLOR_LIGHT_BG,
      borderColor: COLOR_BORDER,
      borderWidth: 1.5
    });

    page.drawText('HAK AKSES RESMI & LISENSI DIGITAL', {
      x: 70,
      y: 240,
      size: 11,
      font: this.fontBold,
      color: COLOR_BLUE
    });

    const licenseTexts = [
      '• Terdaftar resmi sebagai lisensi digital personal seumur hidup (Lifetime Access).',
      '• Bebas dicetak untuk penggunaan mandiri dan latihan berulang.',
      '• Akses update materi tanpa biaya tambahan melalui akun CONFindo Anda.',
      '• Platform Mandiri: Dirancang untuk dipraktikkan tanpa perlu kehadiran mentor fisik.'
    ];

    let licY = 215;
    licenseTexts.forEach(txt => {
      page.drawText(txt, {
        x: 70,
        y: licY,
        size: 9.5,
        font: this.fontRegular,
        color: COLOR_SLATE_700
      });
      licY -= 20;
    });

    // Cover Footer
    page.drawText('CONFindo — Speak with Confidence', {
      x: 48,
      y: 60,
      size: 11,
      font: this.fontBold,
      color: COLOR_SLATE_900
    });
    page.drawText('https://confindo.id • Dokumen Asli Terverifikasi Pasca Pembayaran', {
      x: 48,
      y: 44,
      size: 9,
      font: this.fontRegular,
      color: COLOR_SLATE_500
    });

    return page;
  }

  createContentPage(chapterTitle) {
    const page = this.pdfDoc.addPage([595.28, 841.89]);
    const { width, height } = page.getSize();
    const pageNumber = this.pdfDoc.getPageCount();

    // Top Header
    page.drawText(this.title.toUpperCase(), {
      x: 48,
      y: height - 42,
      size: 8.5,
      font: this.fontBold,
      color: COLOR_SLATE_500
    });
    page.drawText(`CONFindo Store Digital PDF`, {
      x: width - 180,
      y: height - 42,
      size: 8.5,
      font: this.fontRegular,
      color: COLOR_SLATE_500
    });
    page.drawLine({
      start: { x: 48, y: height - 48 },
      end: { x: width - 48, y: height - 48 },
      thickness: 1,
      color: COLOR_BORDER
    });

    // Bottom Footer
    page.drawLine({
      start: { x: 48, y: 50 },
      end: { x: width - 48, y: 50 },
      thickness: 1,
      color: COLOR_BORDER
    });
    page.drawText('Lisensi Eksklusif Pembeli • CONFindo Self-Learning Public Speaking', {
      x: 48,
      y: 35,
      size: 8.5,
      font: this.fontRegular,
      color: COLOR_SLATE_500
    });
    page.drawText(`Halaman ${pageNumber}`, {
      x: width - 100,
      y: 35,
      size: 9,
      font: this.fontBold,
      color: COLOR_BLUE
    });

    // Chapter Header Banner
    let currentY = height - 85;
    if (chapterTitle) {
      page.drawRectangle({
        x: 48,
        y: currentY - 6,
        width: 6,
        height: 24,
        color: COLOR_ORANGE
      });
      page.drawText(chapterTitle, {
        x: 62,
        y: currentY,
        size: 16,
        font: this.fontBold,
        color: COLOR_SLATE_900
      });
      currentY -= 35;
    }

    return { page, width, height, currentY };
  }

  // Draw a styled callout box
  drawCallout(page, x, y, width, height, title, body, bgColor = COLOR_LIGHT_BG, borderColor = COLOR_BLUE) {
    page.drawRectangle({
      x,
      y,
      width,
      height,
      color: bgColor,
      borderColor: borderColor,
      borderWidth: 1.5
    });

    page.drawText(title, {
      x: x + 16,
      y: y + height - 22,
      size: 11,
      font: this.fontBold,
      color: COLOR_BLUE
    });

    const lines = wrapText(body, this.fontRegular, 9.5, width - 32);
    let textY = y + height - 40;
    lines.forEach(line => {
      page.drawText(line, {
        x: x + 16,
        y: textY,
        size: 9.5,
        font: this.fontRegular,
        color: COLOR_SLATE_700
      });
      textY -= 15;
    });
  }

  async save() {
    const pdfBytes = await this.pdfDoc.save();
    const filePath = path.join(outputDir, this.fileName);
    fs.writeFileSync(filePath, pdfBytes);
    console.log(`Saved: ${filePath} (${(pdfBytes.length / 1024).toFixed(1)} KB)`);
    return filePath;
  }
}

// Generator functions for each product
async function generateAllPdfs() {
  console.log('Generating authentic high-quality CONFindo PDF digital products...');

  // 1. PUBLIC SPEAKING STARTER KIT
  {
    const b = new PdfBookBuilder(
      'Public Speaking Starter Kit',
      'Panduan Komprehensif Mengatasi Demam Panggung, Formula Hook Pembuka, dan Teknik Pernapasan Percaya Diri',
      'E-Book / Panduan Utama',
      'Best Seller ⭐',
      'public-speaking-starter-kit.pdf'
    );
    await b.init();
    b.addCoverPage();

    // Page 2: Daftar Isi & Pengantar
    {
      const { page, width, height } = b.createContentPage('DAFTAR ISI & STRUKTUR PANDUAN');
      let y = height - 120;
      
      const tocItems = [
        { num: 'MODUL 01', title: 'Psikologi Rasa Gugup & Rahasia Adrenalin Panggung', hal: 'Hal 03' },
        { num: 'MODUL 02', title: 'Formula 3 Langkah Menjinakkan Demam Panggung (3-Minute Calm)', hal: 'Hal 04' },
        { num: 'MODUL 03', title: 'Teknik Pernapasan Diafragma 4-7-8 & Pelenturan Pita Suara', hal: 'Hal 05' },
        { num: 'MODUL 04', title: '10 Template Hook Pembuka Pidato & Presentasi yang Menghentak', hal: 'Hal 06' },
        { num: 'MODUL 05', title: 'Kamus Mini Sinonim & Eliminasi Kata Gumaman (Filler Words)', hal: 'Hal 07' },
        { num: 'MODUL 06', title: 'Weekly Evaluation Worksheet & Action Plan 7 Hari', hal: 'Hal 08' }
      ];

      tocItems.forEach(item => {
        page.drawRectangle({
          x: 48,
          y: y - 10,
          width: width - 96,
          height: 38,
          color: COLOR_LIGHT_BG,
          borderColor: COLOR_BORDER,
          borderWidth: 1
        });
        page.drawText(item.num, { x: 60, y: y + 8, size: 9, font: b.fontBold, color: COLOR_ORANGE });
        page.drawText(item.title, { x: 130, y: y + 8, size: 10, font: b.fontBold, color: COLOR_SLATE_900 });
        page.drawText(item.hal, { x: width - 100, y: y + 8, size: 10, font: b.fontBold, color: COLOR_BLUE });
        y -= 48;
      });

      b.drawCallout(
        page, 48, y - 90, width - 96, 85,
        'MENGAPA PLATFORM INI DIRANCANG MANDIRI?',
        'Banyak orang mengira menjadi pembicara handal harus memiliki pelatih pribadi berbiaya jutaan rupiah. Faktanya, 90% rasa percaya diri lahir dari repetisi terarah, penguasaan jeda hening, dan kesadaran gestur tubuh sendiri. Kit ini memberi Anda fondasi teruji yang langsung dapat dipraktikkan di kamar Anda hari ini.',
        COLOR_LIGHT_BG, COLOR_BLUE
      );
    }

    // Page 3: Modul 01 - Psikologi Rasa Gugup
    {
      const { page, width, height } = b.createContentPage('MODUL 01: PSIKOLOGI RASA GUGUP');
      let y = height - 120;

      const p1 = 'Gugup atau kecemasan berbicara di depan umum (glossophobia) adalah respon evolusioner alami otak manusia saat merasa diamati atau dievaluasi oleh kelompok sosial. Detak jantung meningkat, telapak tangan berkeringat, dan suara bergetar adalah tanda bahwa tubuh memompa hormon adrenalin untuk melindungi diri.';
      wrapText(p1, b.fontRegular, 10, width - 96).forEach(l => { page.drawText(l, { x: 48, y, size: 10, font: b.fontRegular, color: COLOR_SLATE_700 }); y -= 16; });
      y -= 10;

      page.drawText('Tiga Paradigma Keliru tentang Gugup:', { x: 48, y, size: 11, font: b.fontBold, color: COLOR_SLATE_900 });
      y -= 22;

      const myths = [
        '1. "Orang percaya diri tidak pernah gugup" -> Pembicara kelas dunia seperti Barack Obama atau Steve Jobs tetap merasakan adrenalin, namun mereka mengubahnya menjadi energi ekspresi.',
        '2. "Audiens menunggu kesalahan saya" -> Faktanya, 95% audiens menginginkan pembicara berhasil karena mereka ingin mendapatkan informasi bermanfaat dan tidak ingin merasa bosan.',
        '3. "Saya harus tampil sempurna tanpa cela" -> Perfeksionisme justru memicu kepanikan. Audiens menyukai pembicara yang otentik dan bersahabat daripada robot yang kaku.'
      ];
      myths.forEach(m => {
        wrapText(m, b.fontRegular, 9.5, width - 96).forEach(l => {
          page.drawText(l, { x: 58, y, size: 9.5, font: b.fontRegular, color: COLOR_SLATE_700 });
          y -= 15;
        });
        y -= 6;
      });

      b.drawCallout(
        page, 48, 80, width - 96, 95,
        'KUNCI EMAS REFLEKSI MANDIRI',
        'Ubah kalimat batin Anda dari "Saya sedang diuji di panggung" menjadi "Saya sedang membagikan satu solusi berharga kepada teman-teman yang mendengarkan". Orientasi memberi (service-oriented) seketika menurunkan kadar hormon kortisol hingga 40%.',
        rgb(254 / 255, 243 / 255, 199 / 255), COLOR_ORANGE
      );
    }

    // Page 4: Modul 02 - Formula 3 Langkah
    {
      const { page, width, height } = b.createContentPage('MODUL 02: FORMULA 3-MINUTE CALM');
      let y = height - 120;

      const steps = [
        {
          title: 'Langkah 1: Grounding Fisik (Menit ke-1)',
          desc: 'Berdiri tegak dengan kedua telapak kaki menapak rata selebar bahu. Tekan ibu jari kaki ke sol sepatu selama 5 detik lalu lepaskan. Ini mengalirkan fokus sensorik dari kepala kembali ke seluruh tubuh bagian bawah, mencegah sensasi melayang atau lutut gemetar.'
        },
        {
          title: 'Langkah 2: Visualisasi 3 Titik Ramah (Menit ke-2)',
          desc: 'Sebelum berbicara, tentukan 3 titik di ruangan: satu orang di sisi kiri yang berwajah ramah, satu di baris tengah, dan satu di sisi kanan. Anggap ketiga orang ini sebagai pendukung utama Anda. Arahkan kontak mata bergantian pada mereka.'
        },
        {
          title: 'Langkah 3: Satu Tarikan Napas Sebelum Kata Pertama (Menit ke-3)',
          desc: 'Saat nama Anda dipanggil dan Anda berdiri di depan, JANGAN LANGSUNG BICARA. Tersenyum, tarik napas perlahan selama 3 detik, hembuskan, lalu tatap audiens dengan tenang. 3 detik hening ini menciptakan wibawa dan menunjukkan kendali panggung penuh.'
        }
      ];

      steps.forEach(st => {
        page.drawRectangle({
          x: 48, y: y - 55, width: width - 96, height: 70,
          color: COLOR_LIGHT_BG, borderColor: COLOR_BORDER, borderWidth: 1
        });
        page.drawText(st.title, { x: 60, y: y + 2, size: 10.5, font: b.fontBold, color: COLOR_BLUE });
        let ty = y - 16;
        wrapText(st.desc, b.fontRegular, 9, width - 120).forEach(l => {
          page.drawText(l, { x: 60, y: ty, size: 9, font: b.fontRegular, color: COLOR_SLATE_700 });
          ty -= 13;
        });
        y -= 85;
      });

      b.drawCallout(
        page, 48, 80, width - 96, 75,
        'CATATAN PRAKTIK HARIAN',
        'Gunakan timer 1-Menit di studio latihan CONFindo untuk mengulang proses 3-Minute Calm ini sebelum memulai rekaman suara Anda.',
        COLOR_LIGHT_BG, COLOR_EMERALD
      );
    }

    // Page 5: Modul 03 - Pernapasan 4-7-8
    {
      const { page, width, height } = b.createContentPage('MODUL 03: PERNAPASAN DIAFRAGMA 4-7-8');
      let y = height - 120;

      const pDesc = 'Pernapasan dada (shallow breathing) mempersempit pita suara dan membuat nada bicara menjadi melengking serta terengah-engah. Sebaliknya, pernapasan diafragma mengaktifkan sistem syaraf parasimpatis yang memperlambat denyut nadi secara alami.';
      wrapText(pDesc, b.fontRegular, 10, width - 96).forEach(l => { page.drawText(l, { x: 48, y, size: 10, font: b.fontRegular, color: COLOR_SLATE_700 }); y -= 16; });
      y -= 15;

      page.drawText('Protokol Latihan 4-7-8 (Ulangi 4 Siklus):', { x: 48, y, size: 11, font: b.fontBold, color: COLOR_SLATE_900 });
      y -= 25;

      const cycles = [
        { sec: '4 DETIK', act: 'Hirup Napas melalui Hidung', note: 'Dorong rongga perut ke depan, biarkan diafragma mengembang tanpa mengangkat kedua bahu.' },
        { sec: '7 DETIK', act: 'Tahan Napas di Diafragma', note: 'Kunci udara dengan rileks, biarkan oksigen berdifusi ke seluruh peredaran darah Anda.' },
        { sec: '8 DETIK', act: 'Hembuskan Halus melalui Mulut', note: 'Keluarkan udara perlahan seperti meniup lilin tanpa memadamkan apinya hingga perut kempis.' }
      ];

      cycles.forEach(c => {
        page.drawRectangle({
          x: 48, y: y - 45, width: width - 96, height: 60,
          color: rgb(240 / 255, 249 / 255, 255 / 255), borderColor: rgb(186 / 255, 230 / 255, 253 / 255), borderWidth: 1
        });
        page.drawText(c.sec, { x: 62, y: y + 2, size: 13, font: b.fontBold, color: COLOR_BLUE });
        page.drawText(c.act, { x: 150, y: y + 4, size: 10.5, font: b.fontBold, color: COLOR_SLATE_900 });
        page.drawText(c.note, { x: 150, y: y - 14, size: 8.5, font: b.fontRegular, color: COLOR_SLATE_700 });
        y -= 75;
      });
    }

    // Page 6: Modul 04 - 10 Template Hook
    {
      const { page, width, height } = b.createContentPage('MODUL 04: 10 TEMPLATE HOOK PEMBUKA');
      let y = height - 120;

      const hooks = [
        { no: '01', type: 'Statistik Mengejutkan', ex: '"Tahukah Anda bahwa 78% karyawan merasa presentasi mingguan mereka sia-sia hanya karena 1 menit pembukaan yang membosankan?"' },
        { no: '02', type: 'Pertanyaan Provokatif', ex: '"Bayangkan jika besok pagi Anda bangun, dan rasa takut berbicara di depan umum hilang 100%. Apa hal pertama yang akan Anda lakukan?"' },
        { no: '03', type: 'Cerita Singkat (In Media Res)', ex: '"Tiga tahun lalu, saya berdiri di panggung ini dengan mikrofon gemetar dan kertas catatan basah oleh keringat dingin..."' },
        { no: '04', type: 'Pernyataan Kontra-Intuisi', ex: '"Kebanyakan orang mengira bakat adalah kunci public speaking. Hari ini saya akan buktikan mengapa bakat justru sering menjadi bumerang."' }
      ];

      hooks.forEach(h => {
        page.drawRectangle({
          x: 48, y: y - 55, width: width - 96, height: 68,
          color: COLOR_LIGHT_BG, borderColor: COLOR_BORDER, borderWidth: 1
        });
        page.drawText(`HOOK #${h.no}: ${h.type.toUpperCase()}`, { x: 60, y: y + 2, size: 10, font: b.fontBold, color: COLOR_ORANGE });
        let ty = y - 16;
        wrapText(h.ex, b.fontOblique, 9, width - 120).forEach(l => {
          page.drawText(l, { x: 60, y: ty, size: 9, font: b.fontOblique, color: COLOR_SLATE_900 });
          ty -= 13;
        });
        y -= 80;
      });
    }

    // Page 7: Modul 05 - Eliminasi Filler Words
    {
      const { page, width, height } = b.createContentPage('MODUL 05: ELIMINASI FILLER WORDS');
      let y = height - 120;

      const introF = 'Filler words seperti "eee", "emm", "kayak", "jadi", dan "anu" muncul ketika otak Anda sedang memproses kata berikutnya namun mulut Anda takut pada keheningan. Rahasia terbesar pembicara karismatik bukan tidak pernah berpikir, melainkan mereka mengganti kata gumaman dengan JEDA HENING.';
      wrapText(introF, b.fontRegular, 10, width - 96).forEach(l => { page.drawText(l, { x: 48, y, size: 10, font: b.fontRegular, color: COLOR_SLATE_700 }); y -= 16; });
      y -= 20;

      page.drawText('Kamus Pengganti Kalimat Gumaman:', { x: 48, y, size: 11, font: b.fontBold, color: COLOR_SLATE_900 });
      y -= 25;

      const words = [
        { bad: 'Eee... sebenarnya...', good: '[Tatap audiens + Jeda 1.5 detik hening]', why: 'Jeda menciptakan antisipasi dan wibawa.' },
        { bad: 'Kayak... apa ya namanya...', good: '"Hal menarik yang perlu digarisbawahi adalah..."', why: 'Mengalihkan fokus ke substansi.' },
        { bad: 'Jadi ya begitulah pokoknya...', good: '"Kesimpulan yang dapat kita petik bersama adalah..."', why: 'Memberikan penutup yang tegas dan jelas.' },
        { bad: 'Mungkin saya salah, tapi...', good: '"Berdasarkan temuan data yang kami amati..."', why: 'Menghilangkan kesan ragu dan tidak siap.' }
      ];

      words.forEach(w => {
        page.drawRectangle({
          x: 48, y: y - 50, width: width - 96, height: 60,
          color: COLOR_LIGHT_BG, borderColor: COLOR_BORDER, borderWidth: 1
        });
        page.drawText(`HINDARI: ${w.bad}`, { x: 60, y: y + 2, size: 9.5, font: b.fontBold, color: rgb(225 / 255, 29 / 255, 72 / 255) });
        page.drawText(`GUNAKAN: ${w.good}`, { x: 60, y: y - 14, size: 9.5, font: b.fontBold, color: COLOR_BLUE });
        page.drawText(`Alasan: ${w.why}`, { x: 60, y: y - 30, size: 8.5, font: b.fontRegular, color: COLOR_SLATE_500 });
        y -= 72;
      });
    }

    // Page 8: Modul 06 - Lembar Evaluasi Mingguan
    {
      const { page, width, height } = b.createContentPage('MODUL 06: EVALUATION WORKSHEET');
      let y = height - 120;

      page.drawText('Printable Self-Evaluation Sheet (Latihan 1-Menit Harian):', { x: 48, y, size: 11, font: b.fontBold, color: COLOR_SLATE_900 });
      y -= 25;

      const checks = [
        '[  ] 1. Kontak Mata: Saya menatap kamera / 3 titik audiens selama 80% durasi bicara.',
        '[  ] 2. Volume Suara: Intonasi terdengar jelas tanpa terputus-putus atau berbisik.',
        '[  ] 3. Postur Tubuh: Bahu tegak rileks, tangan tidak masuk ke saku atau menyilang rapat.',
        '[  ] 4. Kecepatan Bicara: Kalimat mengalir tenang, tidak terburu-buru mengejar waktu.',
        '[  ] 5. Gestur Alami: Tangan bergerak sinkron dengan penekanan kata kunci materi.',
        '[  ] 6. Nol Filler Words: Kurang dari 2 kata "eee" / "emm" selama 60 detik berbicara.'
      ];

      checks.forEach(c => {
        page.drawRectangle({
          x: 48, y: y - 15, width: width - 96, height: 30,
          color: COLOR_WHITE, borderColor: COLOR_BORDER, borderWidth: 1
        });
        page.drawText(c, { x: 60, y: y - 4, size: 9, font: b.fontRegular, color: COLOR_SLATE_700 });
        y -= 38;
      });

      b.drawCallout(
        page, 48, 80, width - 96, 90,
        'SELAMAT MEMPRAKTIKKAN!',
        'Kemampuan public speaking bukan tentang kesempurnaan vokal, melainkan keberanian Anda untuk terus membagikan cerita dan gagasan berharga. Rekam latihan Anda di studio CONFindo setiap hari dan rasakan transformasinya dalam 30 hari!',
        rgb(236 / 255, 253 / 255, 245 / 255), COLOR_EMERALD
      );
    }

    await b.save();
  }

  // 2. PRESENTATION TEMPLATE PRO BUNDLE GUIDE
  {
    const b = new PdfBookBuilder(
      'Presentation Template Pro & Slide Design Guide',
      'Panduan Master Desain 50+ Slide Minimalis, Visual Storytelling, & Hierarki Tipografi Profesional',
      'Slide Blueprint / PDF',
      'Paling Populer 🔥',
      'presentation-template-guide.pdf'
    );
    await b.init();
    b.addCoverPage();

    // Page 2: Arsitektur Presentasi Modern
    {
      const { page, width, height } = b.createContentPage('BAB 1: ARSITEKTUR SLIDE MODERN');
      let y = height - 120;

      const p1 = 'Slide presentasi bukanlah dokumen laporan kerja yang dipindahkan ke proyektor. Slide adalah katalis visual yang mendukung penjelasan Anda. Aturan emas desain slide profesional adalah: "Satu Slide, Satu Pesan Inti (One Slide, One Idea)".';
      wrapText(p1, b.fontRegular, 10, width - 96).forEach(l => { page.drawText(l, { x: 48, y, size: 10, font: b.fontRegular, color: COLOR_SLATE_700 }); y -= 16; });
      y -= 15;

      page.drawText('Struktur Formula 10-20-30:', { x: 48, y, size: 11, font: b.fontBold, color: COLOR_SLATE_900 });
      y -= 25;

      const rules = [
        { code: '10 SLIDE', title: 'Jumlah Ideal untuk Pitch & Laporan', desc: 'Audiens tidak dapat memproses lebih dari 10 konsep inti dalam satu sesi tanpa kehilangan atensi.' },
        { code: '20 MENIT', title: 'Batas Durasi Penyampaian Optimal', desc: 'Sisakan waktu 10-15 menit sisanya untuk diskusi interaktif, tanya jawab, atau simulasi langsung.' },
        { code: '30 POINT', title: 'Ukuran Minimal Tipografi Teks', desc: 'Memaksa Anda membuang paragraf panjang dan hanya menampilkan kata kunci penting di layar.' }
      ];

      rules.forEach(r => {
        page.drawRectangle({
          x: 48, y: y - 50, width: width - 96, height: 62,
          color: COLOR_LIGHT_BG, borderColor: COLOR_BORDER, borderWidth: 1
        });
        page.drawText(r.code, { x: 60, y: y + 2, size: 12, font: b.fontBold, color: COLOR_BLUE });
        page.drawText(r.title, { x: 150, y: y + 4, size: 10, font: b.fontBold, color: COLOR_SLATE_900 });
        page.drawText(r.desc, { x: 150, y: y - 14, size: 8.5, font: b.fontRegular, color: COLOR_SLATE_700 });
        y -= 75;
      });
    }

    // Page 3: Palet Warna & Tipografi
    {
      const { page, width, height } = b.createContentPage('BAB 2: PALET WARNA & TIPOGRAFI');
      let y = height - 120;

      page.drawText('Skema Warna Standar Industri CONFindo Pro:', { x: 48, y, size: 11, font: b.fontBold, color: COLOR_SLATE_900 });
      y -= 25;

      const colors = [
        { hex: '#0B5796', name: 'Navy Blue Core', usage: 'Warna dominan latar, judul utama, kartu fokus, melambangkan otoritas dan rasa percaya.' },
        { hex: '#E65C00', name: 'Energetic Orange', usage: 'Warna aksen tombol Call-to-Action, metrik utama, highlight angka penting.' },
        { hex: '#0F172A', name: 'Dark Slate', usage: 'Warna teks paragraf tajam, kontras tinggi di atas latar putih bersih.' },
        { hex: '#F8FAFC', name: 'Light Snow Background', usage: 'Latar belakang kanvas yang ramah mata tanpa menyilaukan penonton di ruangan gelap.' }
      ];

      colors.forEach(c => {
        page.drawRectangle({
          x: 48, y: y - 40, width: width - 96, height: 50,
          color: COLOR_LIGHT_BG, borderColor: COLOR_BORDER, borderWidth: 1
        });
        page.drawText(c.hex, { x: 60, y: y - 4, size: 11, font: b.fontBold, color: COLOR_BLUE });
        page.drawText(c.name, { x: 150, y: y + 4, size: 10, font: b.fontBold, color: COLOR_SLATE_900 });
        page.drawText(c.usage, { x: 150, y: y - 14, size: 8.5, font: b.fontRegular, color: COLOR_SLATE_700 });
        y -= 60;
      });

      b.drawCallout(
        page, 48, 80, width - 96, 85,
        'LINK AKSES TEMPLATE CLOUD (CANVA & POWERPOINT)',
        'Sebagai pembeli resmi CONFindo Store, Anda mendapatkan link master template di Canva Pro & file .PPTX siap duplikasi: Tautan telah aktif di dashboard akun Anda pada tab "My Purchases". Cukup klik dan simpan salinan langsung ke Google Drive / akun Canva Anda.',
        COLOR_LIGHT_BG, COLOR_BLUE
      );
    }

    await b.save();
  }

  // 3. SPEECH SCRIPT TEMPLATE BUNDLE
  {
    const b = new PdfBookBuilder(
      'Speech Script Template Bundle',
      'Kumpulan 18 Naskah Pidato, Sambutan Acara, Elevator Pitch, & Transisi Bahasa Memikat',
      'Script & Template / PDF',
      'Praktis ⏱️',
      'speech-script-bundle.pdf'
    );
    await b.init();
    b.addCoverPage();

    // Page 2: Elevator Pitch 60-Detik
    {
      const { page, width, height } = b.createContentPage('NASKAH 01: ELEVATOR PITCH 60 DETIK');
      let y = height - 120;

      const pDesc = 'Format standar perkenalan diri profesional dalam acara networking, wawancara singkat, atau pembukaan pitching.';
      wrapText(pDesc, b.fontRegular, 10, width - 96).forEach(l => { page.drawText(l, { x: 48, y, size: 10, font: b.fontRegular, color: COLOR_SLATE_700 }); y -= 16; });
      y -= 15;

      const pitchLines = [
        '"Halo rekan-rekan sekalian, perkenalkan saya [NAMA LENGKAP], [PERAN / JABATAN SAAT INI]."',
        '"Selama [X TAHUN], fokus utama saya adalah membantu [TARGET AUDIENS] untuk mengatasi [MASALAH UTAMA] melalui pendekatan [SOLUSI / METODE KHUSUS]."',
        '"Salah satu pencapaian yang paling berkesan adalah saat kami berhasil [HASIL NYATA / METRIK PRESTASI]."',
        '"Hari ini, visi saya adalah memperluas dampak tersebut dengan berkolaborasi bersama para profesional di bidang [BIDANG MINAT]."',
        '"Saya sangat antusias untuk berdiskusi lebih lanjut dengan Anda setelah sesi ini. Terima kasih!"'
      ];

      pitchLines.forEach(pl => {
        page.drawRectangle({
          x: 48, y: y - 35, width: width - 96, height: 42,
          color: COLOR_LIGHT_BG, borderColor: COLOR_BORDER, borderWidth: 1
        });
        wrapText(pl, b.fontRegular, 9, width - 120).forEach(l => {
          page.drawText(l, { x: 60, y: y - 6, size: 9, font: b.fontRegular, color: COLOR_SLATE_900 });
        });
        y -= 52;
      });
    }

    // Page 3: Naskah Sambutan Ketua Acara / Kuliah
    {
      const { page, width, height } = b.createContentPage('NASKAH 02: KATA SAMBUTAN KETUA ACARA');
      let y = height - 120;

      const speechScript = [
        '1. SALAM & PENGHORMATAN: "Selamat pagi / siang rekan-rekan dan dewan pembimbing yang saya hormati. Kehadiran Anda hari ini merupakan energi terbesar bagi terselenggaranya acara [NAMA ACARA]."',
        '2. TUJUAN INTI: "Acara ini kami inisiasi bukan sekadar agenda seremonial, melainkan ruang belajar bersama untuk mempertemukan ide-ide segar tentang [TEMA UTAMA]."',
        '3. APRESIASI TIM: "Apresiasi setinggi-tingginya kepada seluruh panitia yang telah mendedikasikan waktu dan tenaga tanpa kenal lelah selama [X MINGGU] terakhir."',
        '4. AJAKAN AKSI: "Saya mengajak kita semua untuk tidak hanya menjadi pendengar pasif, tetapi aktif mengajukan pertanyaan dan membuka jejaring pertemanan baru hari ini."',
        '5. PENUTUP RESMI: "Dengan mengucap rasa syukur, sesi [NAMA ACARA] resmi kami buka. Selamat belajar dan mari saling menginspirasi!"'
      ];

      speechScript.forEach(sc => {
        page.drawRectangle({
          x: 48, y: y - 48, width: width - 96, height: 58,
          color: COLOR_LIGHT_BG, borderColor: COLOR_BORDER, borderWidth: 1
        });
        let ty = y + 2;
        wrapText(sc, b.fontRegular, 9, width - 120).forEach(l => {
          page.drawText(l, { x: 60, y: ty, size: 9, font: b.fontRegular, color: COLOR_SLATE_700 });
          ty -= 13;
        });
        y -= 70;
      });
    }

    await b.save();
  }

  // 4. INTERVIEW PREPARATION KIT (STAR METHOD)
  {
    const b = new PdfBookBuilder(
      'Interview Preparation Kit & STAR Method Workbook',
      'Panduan Menjawab 40+ Pertanyaan Wawancara Kerja HRD & User, Metode STAR, dan 15 Pertanyaan Balik Strategis',
      'Career Toolkit / PDF',
      'Rekomendasi Karir 💼',
      'interview-prep-kit-star.pdf'
    );
    await b.init();
    b.addCoverPage();

    // Page 2: Formula STAR
    {
      const { page, width, height } = b.createContentPage('BAB 1: FORMULA METODE STAR');
      let y = height - 120;

      const starPoints = [
        { letter: 'S', title: 'SITUATION (Situasi)', desc: 'Jelaskan konteks latar belakang permasalahan, peran Anda saat itu, dan tantangan apa yang sedang dihadapi tim secara ringkas (15 detik).' },
        { letter: 'T', title: 'TASK (Tugas / Target)', desc: 'Sebutkan ekspektasi atau target terukur apa yang harus Anda selesaikan dalam batasan waktu yang ada (15 detik).' },
        { letter: 'A', title: 'ACTION (Aksi Nyata Anda)', desc: 'Fokus pada kata ganti "SAYA", bukan "KAMI". Uraikan 2-3 langkah logis spesifik yang Anda ambil untuk menyelesaikan masalah (45 detik).' },
        { letter: 'R', title: 'RESULT (Hasil Terukur)', desc: 'Tutup dengan hasil konkret (persentase peningkatan, waktu yang dihemat, penghargaan tim, atau pelajaran berharga yang dipetik) (15 detik).' }
      ];

      starPoints.forEach(sp => {
        page.drawRectangle({
          x: 48, y: y - 55, width: width - 96, height: 68,
          color: COLOR_LIGHT_BG, borderColor: COLOR_BORDER, borderWidth: 1
        });
        page.drawText(sp.letter, { x: 62, y: y + 2, size: 22, font: b.fontBold, color: COLOR_BLUE });
        page.drawText(sp.title, { x: 100, y: y + 4, size: 10.5, font: b.fontBold, color: COLOR_SLATE_900 });
        let ty = y - 14;
        wrapText(sp.desc, b.fontRegular, 8.5, width - 160).forEach(l => {
          page.drawText(l, { x: 100, y: ty, size: 8.5, font: b.fontRegular, color: COLOR_SLATE_700 });
          ty -= 12;
        });
        y -= 80;
      });
    }

    // Page 3: 5 Pertanyaan Jebakan Paling Sering Muncul
    {
      const { page, width, height } = b.createContentPage('BAB 2: MENJAWAB PERTANYAAN JEBAKAN HRD');
      let y = height - 120;

      const questions = [
        {
          q: '"Ceritakan apa kelemahan terbesar Anda?"',
          tip: 'Jangan gunakan kelemahan palsu ("Saya terlalu perfeksionis"). Pilih kelemahan nyata non-kritis dan tunjukkan langkah perbaikan nyata yang sudah Anda lakukan.'
        },
        {
          q: '"Mengapa kami harus menerima Anda dibanding kandidat lain?"',
          tip: 'Tautkan keahlian unik Anda dengan kebutuhan paling mendesak di departemen mereka, tunjukkan antusiasme dan komitmen belajar cepat.'
        },
        {
          q: '"Bagaimana cara Anda menghadapi konflik dengan rekan kerja?"',
          tip: 'Fokus pada komunikasi dua arah yang tenang, memisahkan emosi pribadi dari objektif proyek, dan kompromi profesional.'
        }
      ];

      questions.forEach(q => {
        page.drawRectangle({
          x: 48, y: y - 55, width: width - 96, height: 68,
          color: COLOR_LIGHT_BG, borderColor: COLOR_BORDER, borderWidth: 1
        });
        page.drawText(q.q, { x: 60, y: y + 2, size: 10, font: b.fontBold, color: COLOR_ORANGE });
        let ty = y - 16;
        wrapText(q.tip, b.fontRegular, 8.5, width - 120).forEach(l => {
          page.drawText(l, { x: 60, y: ty, size: 8.5, font: b.fontRegular, color: COLOR_SLATE_700 });
          ty -= 12;
        });
        y -= 80;
      });
    }

    await b.save();
  }

  // 5. PUBLIC SPEAKING PRACTICE JOURNAL
  {
    const b = new PdfBookBuilder(
      'Public Speaking Practice Journal',
      'Jurnal Pelacak Progres 90 Hari, Monitor Filler Words, dan Skala Kepercayaan Diri Mandiri',
      'Digital Journal / PDF',
      'Konsistensi 📅',
      'public-speaking-practice-journal.pdf'
    );
    await b.init();
    b.addCoverPage();

    // Page 2: Lembar Jurnal Harian Siap Cetak
    {
      const { page, width, height } = b.createContentPage('LEMBAR TRACKING HARIAN LATIHAN');
      let y = height - 120;

      page.drawText('Formulir Evaluasi Latihan 1-Minute Speaking:', { x: 48, y, size: 11, font: b.fontBold, color: COLOR_SLATE_900 });
      y -= 25;

      const fields = [
        'Tanggal Latihan : ___________________   Hari ke- : [   ] dari 90 Hari',
        'Topik Bahasan  : ____________________________________________________',
        'Durasi Bicara  : [   ] 60 Detik   [   ] 3 Menit   [   ] 5 Menit',
        'Jumlah Filler Words yang Terdeteksi ("eee", "emm", dll) : [       ] Kali',
        'Skala Kepercayaan Diri Pribadi Sesi Ini (1 - 10) : [       ] / 10',
        'Satu Hal yang Sudah Bagus : ________________________________________',
        'Satu Hal yang Ingin Diperbaiki Besok : ______________________________'
      ];

      fields.forEach(f => {
        page.drawRectangle({
          x: 48, y: y - 20, width: width - 96, height: 35,
          color: COLOR_LIGHT_BG, borderColor: COLOR_BORDER, borderWidth: 1
        });
        page.drawText(f, { x: 60, y: y - 6, size: 9, font: b.fontRegular, color: COLOR_SLATE_900 });
        y -= 45;
      });

      b.drawCallout(
        page, 48, 80, width - 96, 80,
        'TIPS KONSISTENSI 90 HARI',
        'Simpan jurnal ini di tablet (Goodnotes/Notability) atau cetak sebanyak 30 lembar. Mencatat evaluasi setelah 1 menit berbicara terbukti melipatgandakan retensi perbaikan hingga 3x lipat.',
        COLOR_LIGHT_BG, COLOR_BLUE
      );
    }

    await b.save();
  }

  // 6. PRESENTATION CHECKLIST PRO
  {
    const b = new PdfBookBuilder(
      'Presentation Checklist Pro',
      'Checklist 3 Fase Anti-Panik: H-3 Materi, H-1 Gladi Resik, dan Hari-H 15 Menit Sebelum Tampil',
      'Interactive Checklist / PDF',
      'Hemat Waktu ⚡',
      'presentation-checklist-pro.pdf'
    );
    await b.init();
    b.addCoverPage();

    // Page 2: Checklist 3 Fase Lengkap
    {
      const { page, width, height } = b.createContentPage('CHECKLIST 3 FASE ANTI-PANIK');
      let y = height - 120;

      const phases = [
        {
          title: 'FASE 1: H-3 MATERI & VISUAL',
          items: [
            '[  ] Slide bersih dari paragraf panjang, ukuran font minimal 28pt.',
            '[  ] Backup file di 3 tempat berbeda: Flashdisk, Google Drive, & WhatsApp.',
            '[  ] Naskah pembukaan dan penutupan dihafal di luar kepala.'
          ]
        },
        {
          title: 'FASE 2: H-1 GLADI RESIK & PERALATAN',
          items: [
            '[  ] Cek converter HDMI/Type-C ke proyektor.',
            '[  ] Latih vokal dengan senam lidah & artikulasi A-I-U-E-O selama 5 menit.',
            '[  ] Siapkan pakaian formal yang rapi dan nyaman bernapas.'
          ]
        },
        {
          title: 'FASE 3: HARI-H 15 MENIT SEBELUM TAMPIL',
          items: [
            '[  ] Minum 2 teguk air putih bersuhu ruangan (hindari air es atau manis).',
            '[  ] Lakukan pernapasan diafragma 4-7-8 sebanyak 4 siklus tenang.',
            '[  ] Periksa clicker wireless dan lakukan tes mikrofon singkat.'
          ]
        }
      ];

      phases.forEach(ph => {
        page.drawText(ph.title, { x: 48, y, size: 10.5, font: b.fontBold, color: COLOR_ORANGE });
        y -= 16;
        ph.items.forEach(it => {
          page.drawRectangle({
            x: 48, y: y - 12, width: width - 96, height: 26,
            color: COLOR_LIGHT_BG, borderColor: COLOR_BORDER, borderWidth: 1
          });
          page.drawText(it, { x: 60, y: y - 4, size: 8.5, font: b.fontRegular, color: COLOR_SLATE_700 });
          y -= 32;
        });
        y -= 10;
      });
    }

    await b.save();
  }

  console.log('All 6 real PDF digital products generated successfully!');
}

generateAllPdfs().catch(err => {
  console.error('Error generating PDFs:', err);
  process.exit(1);
});
