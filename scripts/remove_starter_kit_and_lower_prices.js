const fs = require('fs');
const path = require('path');

// 1. Load and process db.json
const dbPath = path.join(__dirname, '..', 'data', 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Filter out prod-starter-kit
db.products = db.products.filter(p => p.id !== 'prod-starter-kit');

// Update prices to be very cheap and affordable for kalangan menengah ke bawah
const priceUpdates = {
  'prod-buku-ajar-public-speaking': { price: 5000, original_price: 15000, originalPrice: 15000, category: 'Store Digital & Panduan Utama' },
  'prod-presentation-template': { price: 7000, original_price: 15000, originalPrice: 15000, category: 'Slide Blueprint / PPTX & Panduan' },
  'prod-speech-script': { price: 5000, original_price: 10000, originalPrice: 10000, category: 'Script & Template Pidato' },
  'prod-interview-kit': { price: 5000, original_price: 10000, originalPrice: 10000, category: 'Panduan Karir & Interview' },
  'prod-practice-journal': { price: 5000, original_price: 10000, originalPrice: 10000, category: 'Journal & Evaluasi Mandiri' },
  'prod-checklist-pro': { price: 5000, original_price: 10000, originalPrice: 10000, category: 'Checklist & Persiapan Cepat' }
};

db.products = db.products.map(p => {
  if (priceUpdates[p.id]) {
    return {
      ...p,
      ...priceUpdates[p.id]
    };
  }
  return p;
});

// Update sample order for Dimas Pratama
if (Array.isArray(db.order_items)) {
  db.order_items = db.order_items.map(item => {
    if (item.product_id === 'prod-starter-kit') {
      return {
        ...item,
        product_id: 'prod-buku-ajar-public-speaking',
        price: 5000
      };
    }
    return item;
  });
}
if (Array.isArray(db.orders)) {
  db.orders = db.orders.map(ord => {
    if (ord.id === 'ord-2026-001') {
      return {
        ...ord,
        total: 5000,
        payment_reference: 'QRIS-ID1026614998627',
        payment_method: 'QRIS'
      };
    }
    return ord;
  });
}

// Write to data/db.json
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Updated data/db.json successfully.');

// Write to confindo-siap-upload/data/db.json
const uploadDbPath = path.join(__dirname, '..', 'confindo-siap-upload', 'data', 'db.json');
if (fs.existsSync(path.dirname(uploadDbPath))) {
  fs.writeFileSync(uploadDbPath, JSON.stringify(db, null, 2), 'utf8');
  console.log('Updated confindo-siap-upload/data/db.json successfully.');
}

// 2. Update js/data.js
function updateDataJsFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  const startMarker = '// 3. Store Products (Digital Products)';
  const endMarker = '// 4. Free Resources';

  const startIndex = content.indexOf(startMarker);
  const endIndex = content.indexOf(endMarker);

  if (startIndex !== -1 && endIndex !== -1) {
    const productsJsonString = '  products: ' + JSON.stringify(db.products, null, 4) + ',\n\n  ';
    const newContent = content.substring(0, startIndex) + startMarker + '\n' + productsJsonString + content.substring(endIndex);
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${filePath} successfully.`);
  } else {
    console.warn(`Could not find markers in ${filePath}`);
  }
}

updateDataJsFile(path.join(__dirname, '..', 'js', 'data.js'));
updateDataJsFile(path.join(__dirname, '..', 'confindo-siap-upload', 'js', 'data.js'));

console.log('All product data updated.');
