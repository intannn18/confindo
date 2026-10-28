const fs = require('fs');
const path = require('path');

const priceUpdates = {
  'prod-buku-ajar-public-speaking': { price: 15000, original_price: 35000, originalPrice: 35000 },
  'prod-presentation-template': { price: 20000, original_price: 45000, originalPrice: 45000 },
  'prod-speech-script': { price: 15000, original_price: 30000, originalPrice: 30000 },
  'prod-interview-kit': { price: 15000, original_price: 30000, originalPrice: 30000 },
  'prod-practice-journal': { price: 15000, original_price: 25000, originalPrice: 25000 },
  'prod-checklist-pro': { price: 15000, original_price: 25000, originalPrice: 25000 }
};

// 1. Update data/db.json
const dbPath = path.join(__dirname, '..', 'data', 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

db.products = db.products.map(p => {
  if (priceUpdates[p.id]) {
    return { ...p, ...priceUpdates[p.id] };
  }
  return p;
});

// Update sample orders
if (Array.isArray(db.orders)) {
  db.orders = db.orders.map(o => {
    if (o.id === 'ord-2026-001') {
      return { ...o, total: 15000 };
    }
    return o;
  });
}
if (Array.isArray(db.order_items)) {
  db.order_items = db.order_items.map(oi => {
    if (oi.order_id === 'ord-2026-001') {
      return { ...oi, price: 15000 };
    }
    return oi;
  });
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Updated data/db.json');

// Update confindo-siap-upload/data/db.json
const uploadDbPath = path.join(__dirname, '..', 'confindo-siap-upload', 'data', 'db.json');
if (fs.existsSync(uploadDbPath)) {
  fs.writeFileSync(uploadDbPath, JSON.stringify(db, null, 2), 'utf8');
  console.log('Updated confindo-siap-upload/data/db.json');
}

// 2. Update js/data.js
function updateDataJs(targetPath) {
  if (!fs.existsSync(targetPath)) return;
  let content = fs.readFileSync(targetPath, 'utf8');
  const startMarker = '// 3. Store Products (Digital Products)';
  const endMarker = '// 4. Free Resources';
  const startIndex = content.indexOf(startMarker);
  const endIndex = content.indexOf(endMarker);
  if (startIndex !== -1 && endIndex !== -1) {
    const productsJsonString = '  products: ' + JSON.stringify(db.products, null, 4) + ',\n\n  ';
    const newContent = content.substring(0, startIndex) + startMarker + '\n' + productsJsonString + content.substring(endIndex);
    fs.writeFileSync(targetPath, newContent, 'utf8');
    console.log(`Updated ${targetPath}`);
  }
}

updateDataJs(path.join(__dirname, '..', 'js', 'data.js'));
updateDataJs(path.join(__dirname, '..', 'confindo-siap-upload', 'js', 'data.js'));
