const fs = require('fs');
const path = require('path');
const pptxgen = require('pptxgenjs');

const outputDir = path.join(__dirname, '..', 'assets', 'templates');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateMasterPptx() {
  console.log('Generating authentic Presentation Template Pro PPTX...');
  const pptx = new pptxgen();

  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'CONFindo Public Speaking Academy';
  pptx.company = 'CONFindo Platform';
  pptx.title = 'CONFindo Master Presentation Template Pro';

  // Theme Colors
  const COLOR_NAVY = '0B172A';
  const COLOR_BLUE = '0B5796';
  const COLOR_ORANGE = 'E65C00';
  const COLOR_WHITE = 'FFFFFF';
  const COLOR_SLATE = '64748B';
  const COLOR_LIGHT_BG = 'F8FAFC';
  const COLOR_CARD_BG = 'FFFFFF';

  // =========================================================================
  // SLIDE 1: Title Slide (Dark Hero)
  // =========================================================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: COLOR_NAVY };

    // Decorative shape top
    slide.addShape(pptx.shapes.RECTANGLE, {
      x: 0.8, y: 0.8, w: 2.2, h: 0.35,
      fill: { color: COLOR_ORANGE },
      line: { color: COLOR_ORANGE }
    });
    slide.addText('CONFINDO MASTER TEMPLATE', {
      x: 0.8, y: 0.8, w: 2.2, h: 0.35,
      fontSize: 10, bold: true, color: COLOR_WHITE,
      align: 'center', valign: 'middle'
    });

    slide.addText('Speak with Confidence', {
      x: 0.8, y: 1.6, w: 10.5, h: 1.6,
      fontSize: 44, bold: true, color: COLOR_WHITE,
      fontFace: 'Helvetica'
    });

    slide.addText('50+ Master Slide Framework for High-Impact Presentations & Pitching', {
      x: 0.8, y: 3.3, w: 9.5, h: 0.8,
      fontSize: 18, color: '94A3B8',
      fontFace: 'Helvetica'
    });

    // Divider line
    slide.addShape(pptx.shapes.LINE, {
      x: 0.8, y: 4.5, w: 11.5, h: 0,
      line: { color: COLOR_BLUE, width: 2 }
    });

    slide.addText('Edisi Resmi 2026 • Dirancang Khusus Mahasiswa, Karyawan & Profesional', {
      x: 0.8, y: 4.8, w: 8.0, h: 0.5,
      fontSize: 12, color: 'CBD5E1', bold: true
    });
  }

  // =========================================================================
  // SLIDE 2: Agenda & Structure
  // =========================================================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: COLOR_LIGHT_BG };

    slide.addText('PRESENTATION ROADMAP', {
      x: 0.8, y: 0.6, w: 5.0, h: 0.3,
      fontSize: 11, bold: true, color: COLOR_ORANGE
    });
    slide.addText('Alur Struktur Pembahasan', {
      x: 0.8, y: 0.9, w: 8.0, h: 0.6,
      fontSize: 28, bold: true, color: COLOR_NAVY
    });

    const pillars = [
      { num: '01', title: 'UNDERSTAND', desc: 'Psikologi audiens, pemetaan masalah, & sasaran pesan utama presentasi.' },
      { num: '02', title: 'PREPARE', desc: 'Arsitektur naskah, aturan visual 10-20-30, & hierarki slide data.' },
      { num: '03', title: 'PRACTICE', desc: 'Latihan vokal diafragma, eliminasi filler word, & penguasaan jeda hening.' },
      { num: '04', title: 'PERFORM', desc: 'Bahasa tubuh alami, tatapan 3 titik ramah, & teknik closing berdampak kuat.' }
    ];

    pillars.forEach((p, idx) => {
      const xPos = 0.8 + (idx * 2.85);
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: xPos, y: 1.8, w: 2.65, h: 4.2,
        fill: { color: COLOR_CARD_BG },
        line: { color: 'E2E8F0', width: 1.5 }
      });
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: xPos + 0.2, y: 2.1, w: 0.7, h: 0.7,
        fill: { color: idx === 0 ? COLOR_BLUE : 'F1F5F9' },
        line: { color: 'CBD5E1' }
      });
      slide.addText(p.num, {
        x: xPos + 0.2, y: 2.1, w: 0.7, h: 0.7,
        fontSize: 14, bold: true,
        color: idx === 0 ? COLOR_WHITE : COLOR_BLUE,
        align: 'center', valign: 'middle'
      });
      slide.addText(p.title, {
        x: xPos + 0.2, y: 3.1, w: 2.25, h: 0.4,
        fontSize: 14, bold: true, color: COLOR_NAVY
      });
      slide.addText(p.desc, {
        x: xPos + 0.2, y: 3.6, w: 2.25, h: 2.0,
        fontSize: 11, color: COLOR_SLATE
      });
    });
  }

  // =========================================================================
  // SLIDE 3: Key Metrics & Data Dashboard
  // =========================================================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: COLOR_LIGHT_BG };

    slide.addText('KEY IMPACT METRICS', {
      x: 0.8, y: 0.6, w: 5.0, h: 0.3,
      fontSize: 11, bold: true, color: COLOR_ORANGE
    });
    slide.addText('Dampak Latihan Terarah & Slide Modern', {
      x: 0.8, y: 0.9, w: 8.0, h: 0.6,
      fontSize: 28, bold: true, color: COLOR_NAVY
    });

    const metrics = [
      { val: '+94%', label: 'Peningkatan Rasa Percaya Diri', sub: 'Berdasarkan evaluasi mandiri 30-Day Challenge' },
      { val: '1 MENIT', label: 'Latihan Rutin Harian Terarah', sub: 'Membangun kebiasaan bicara tanpa rasa tertekan' },
      { val: '-80%', label: 'Penurunan Filler Words', sub: 'Mengganti kata gumaman dengan jeda hening wibawa' }
    ];

    metrics.forEach((m, idx) => {
      const xPos = 0.8 + (idx * 3.8);
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: xPos, y: 1.8, w: 3.6, h: 2.5,
        fill: { color: COLOR_CARD_BG },
        line: { color: 'E2E8F0', width: 1.5 }
      });
      slide.addText(m.val, {
        x: xPos + 0.3, y: 2.1, w: 3.0, h: 0.9,
        fontSize: 38, bold: true, color: COLOR_BLUE
      });
      slide.addText(m.label, {
        x: xPos + 0.3, y: 3.0, w: 3.0, h: 0.4,
        fontSize: 13, bold: true, color: COLOR_NAVY
      });
      slide.addText(m.sub, {
        x: xPos + 0.3, y: 3.4, w: 3.0, h: 0.7,
        fontSize: 10, color: COLOR_SLATE
      });
    });

    // Pro Tip Box bottom
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.8, y: 4.7, w: 11.4, h: 1.5,
      fill: { color: 'EFF6FF' },
      line: { color: 'BFDBFE', width: 1 }
    });
    slide.addText('TIPS DESAIN SLIDE PROFESIONAL (ATURAN 10-20-30):', {
      x: 1.1, y: 4.9, w: 10.5, h: 0.3,
      fontSize: 11, bold: true, color: COLOR_BLUE
    });
    slide.addText('Hanya gunakan 1 ide utama per slide. Jangan pernah memindahkan naskah paragraf penuh ke dalam slide. Slide berfungsi sebagai alat bantu visual pendukung, bukan contekan baca pembicara.', {
      x: 1.1, y: 5.3, w: 10.5, h: 0.7,
      fontSize: 11, color: COLOR_NAVY
    });
  }

  // =========================================================================
  // SLIDE 4: Call-To-Action & Closing Slide
  // =========================================================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: COLOR_NAVY };

    slide.addText('“Your voice deserves to be heard.”', {
      x: 1.0, y: 1.8, w: 11.0, h: 1.2,
      fontSize: 36, bold: true, color: COLOR_WHITE,
      align: 'center', fontFace: 'Helvetica'
    });

    slide.addText('Terima Kasih & Selamat Berlatih Bersama CONFindo!', {
      x: 1.0, y: 3.0, w: 11.0, h: 0.6,
      fontSize: 16, color: COLOR_ORANGE, bold: true,
      align: 'center'
    });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 4.2, y: 4.2, w: 4.6, h: 0.7,
      fill: { color: COLOR_BLUE },
      line: { color: COLOR_BLUE }
    });
    slide.addText('Kunjungi: https://confindo.my.id', {
      x: 4.2, y: 4.2, w: 4.6, h: 0.7,
      fontSize: 12, bold: true, color: COLOR_WHITE,
      align: 'center', valign: 'middle'
    });
  }

  const filePath = path.join(outputDir, 'confindo-presentation-template-pro.pptx');
  await pptx.writeFile({ fileName: filePath });
  console.log(`Saved PPTX: ${filePath}`);
  return filePath;
}

generateMasterPptx().catch(err => {
  console.error('Error generating PPTX:', err);
  process.exit(1);
});
