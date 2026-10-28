<?php
// ==============================================================================
// CONFindo Native Backend API (InfinityFree / cPanel PHP)
// Menyimpan dan membaca transaksi secara terpusat langsung di hosting sendiri
// ==============================================================================

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$requestMethod = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : 'GET';
if ($requestMethod === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dataDir = __DIR__ . '/data';
$ordersFile = $dataDir . '/orders_live.json';

// Pastikan folder data ada
if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0755, true);
}

// Data awal jika file belum pernah dibuat di server
if (!file_exists($ordersFile)) {
    $initialOrders = [
        [
            'id' => 'ord-1793166552528',
            'user_id' => 'usr-admin-01',
            'buyer_name' => 'Admin CONFindo',
            'buyer_email' => 'admin@confindo.id',
            'buyer_phone' => '085725957927',
            'product_name' => 'Public Speaking Starter Kit',
            'total' => 15000,
            'payment_status' => 'paid',
            'payment_method' => 'QRIS',
            'created_at' => date('c')
        ],
        [
            'id' => 'ord-1793153861904',
            'user_id' => 'usr-customer-02',
            'buyer_name' => 'Gabriel',
            'buyer_email' => 'gabriel.gaby1277@gmail.com',
            'buyer_phone' => '085725957927',
            'product_name' => 'Speech Script Template Bundle',
            'total' => 12000,
            'payment_status' => 'paid',
            'payment_method' => 'QRIS',
            'created_at' => date('c')
        ],
        [
            'id' => 'ord-2026-001',
            'user_id' => 'usr-dimas-02',
            'buyer_name' => 'Dimas Pratama',
            'buyer_email' => 'dimas@example.com',
            'buyer_phone' => '081234567890',
            'product_name' => 'Public Speaking Starter Kit',
            'total' => 15000,
            'payment_status' => 'paid',
            'payment_method' => 'QRIS',
            'created_at' => '2026-02-02T11:20:00Z'
        ]
    ];
    @file_put_contents($ordersFile, json_encode($initialOrders, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

$action = isset($_GET['action']) ? $_GET['action'] : '';

// 1. TEST KONEKSI
if ($action === 'test') {
    echo json_encode([
        'success' => true,
        'message' => 'API PHP CONFindo Aktif di Server Hosting 🚀',
        'php_version' => phpversion()
    ]);
    exit;
}

// 2. SIMPAN TRANSAKSI BARU (POST)
if ($action === 'create_order' || ($requestMethod === 'POST' && $action !== 'login')) {
    $rawInput = file_get_contents('php://input');
    $newOrder = json_decode($rawInput, true);

    if (!$newOrder || !isset($newOrder['id'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Data order tidak valid.']);
        exit;
    }

    $content = @file_get_contents($ordersFile);
    $orders = json_decode($content, true);
    if (!is_array($orders)) {
        $orders = [];
    }

    // Cek jika order sudah ada (hindari duplikasi)
    $exists = false;
    foreach ($orders as &$o) {
        if (isset($o['id']) && $o['id'] === $newOrder['id']) {
            $o = $newOrder; // update
            $exists = true;
            break;
        }
    }
    unset($o);

    if (!$exists) {
        array_unshift($orders, $newOrder);
    }

    @file_put_contents($ordersFile, json_encode($orders, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    echo json_encode([
        'success' => true,
        'message' => 'Pesanan berhasil disimpan di server hosting.',
        'order' => $newOrder
    ]);
    exit;
}

// 3. BACA SEMUA TRANSAKSI (GET)
$content = @file_get_contents($ordersFile);
$orders = json_decode($content, true);
if (!is_array($orders)) {
    $orders = [];
}

echo json_encode($orders, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
exit;
