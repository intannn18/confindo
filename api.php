<?php
// ==============================================================================
// CONFindo Native Backend API (InfinityFree / cPanel PHP)
// Menyimpan dan membaca transaksi & pengguna secara terpusat langsung di hosting
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
$usersFile = $dataDir . '/users_live.json';

// Pastikan folder data ada
if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0755, true);
}

// Data awal pengguna jika file belum ada
if (!file_exists($usersFile)) {
    $initialUsers = [
        [
            'id' => 'usr-admin-01',
            'name' => 'Admin CONFindo',
            'email' => 'admin@confindo.id',
            'password_hash' => 'Admin#CONFindo2026!',
            'role' => 'admin',
            'profile_image' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            'created_at' => '2026-01-15T08:00:00Z'
        ],
        [
            'id' => 'usr-dimas-02',
            'name' => 'Dimas Pratama',
            'email' => 'dimas@example.com',
            'password_hash' => 'user123',
            'role' => 'user',
            'profile_image' => 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
            'created_at' => '2026-02-01T10:30:00Z'
        ],
        [
            'id' => 'usr-gabriel-03',
            'name' => 'Gabriel',
            'email' => 'gabriel.gaby1277@gmail.com',
            'password_hash' => 'user123',
            'role' => 'user',
            'profile_image' => 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
            'created_at' => '2026-10-28T11:11:01+07:00'
        ]
    ];
    @file_put_contents($usersFile, json_encode($initialUsers, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

// Data awal pesanan jika file belum pernah dibuat di server
if (!file_exists($ordersFile)) {
    $initialOrders = [
        [
            'id' => 'ord-1793166552528',
            'user_id' => 'usr-admin-01',
            'buyer_name' => 'Admin CONFindo',
            'buyer_email' => 'admin@confindo.id',
            'buyer_phone' => '085725957927',
            'buyer_notes' => 'Pesanan demo admin',
            'product_name' => 'Public Speaking Starter Kit',
            'total' => 15000,
            'payment_status' => 'paid',
            'payment_method' => 'QRIS',
            'payment_reference' => 'QRIS-ID1026614998627-889123',
            'created_at' => '2026-10-28T14:42:32+07:00'
        ],
        [
            'id' => 'ord-1793153861904',
            'user_id' => 'usr-gabriel-03',
            'buyer_name' => 'Gabriel',
            'buyer_email' => 'gabriel.gaby1277@gmail.com',
            'buyer_phone' => '085725957927',
            'buyer_notes' => 'Order via Mobile Device',
            'product_name' => 'Speech Script Template Bundle',
            'total' => 12000,
            'payment_status' => 'paid',
            'payment_method' => 'QRIS',
            'payment_reference' => 'QRIS-ID1026614998627-441209',
            'created_at' => '2026-10-28T11:11:01+07:00'
        ],
        [
            'id' => 'ORD-CONF-2026-001',
            'user_id' => 'usr-dimas-02',
            'buyer_name' => 'Dimas Pratama',
            'buyer_email' => 'dimas@example.com',
            'buyer_phone' => '081234567890',
            'buyer_notes' => '',
            'product_name' => 'Public Speaking Starter Kit',
            'total' => 15000,
            'payment_status' => 'paid',
            'payment_method' => 'QRIS',
            'payment_reference' => 'QRIS-ID1026614998627',
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

// 2. GET SEMUA DATA TERPADU (ORDERS + USERS)
if ($action === 'get_all_data') {
    $ordersContent = @file_get_contents($ordersFile);
    $orders = json_decode($ordersContent, true);
    if (!is_array($orders)) $orders = [];

    $usersContent = @file_get_contents($usersFile);
    $users = json_decode($usersContent, true);
    if (!is_array($users)) $users = [];

    echo json_encode([
        'success' => true,
        'orders' => $orders,
        'users' => $users
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

// 3. GET SEMUA PENGGUNA (USERS)
if ($action === 'get_users') {
    $content = @file_get_contents($usersFile);
    $users = json_decode($content, true);
    if (!is_array($users)) $users = [];
    echo json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

// 4. SIMPAN PENGGUNA BARU (POST create_user)
if ($action === 'create_user' && $requestMethod === 'POST') {
    $rawInput = file_get_contents('php://input');
    $newUser = json_decode($rawInput, true);
    if ($newUser && isset($newUser['email'])) {
        $content = @file_get_contents($usersFile);
        $users = json_decode($content, true);
        if (!is_array($users)) $users = [];
        $exists = false;
        foreach ($users as &$u) {
            if (isset($u['email']) && strtolower($u['email']) === strtolower($newUser['email'])) {
                $u = array_merge($u, $newUser);
                $exists = true;
                break;
            }
        }
        unset($u);
        if (!$exists) {
            $users[] = $newUser;
        }
        @file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        echo json_encode(['success' => true, 'user' => $newUser, 'users' => $users]);
        exit;
    }
}

// 5. HAPUS SATU TRANSAKSI (delete_order)
if ($action === 'delete_order') {
    $rawInput = file_get_contents('php://input');
    $inputData = json_decode($rawInput, true);
    $delId = isset($_GET['id']) ? $_GET['id'] : (isset($inputData['id']) ? $inputData['id'] : '');

    if (!empty($delId)) {
        $content = @file_get_contents($ordersFile);
        $orders = json_decode($content, true);
        if (!is_array($orders)) $orders = [];
        $orders = array_values(array_filter($orders, function($o) use ($delId) {
            return isset($o['id']) && $o['id'] !== $delId;
        }));
        @file_put_contents($ordersFile, json_encode($orders, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        echo json_encode(['success' => true, 'deleted' => $delId, 'orders' => $orders]);
        exit;
    }
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'ID pesanan tidak ditemukan.']);
    exit;
}

// 6. HAPUS SATU PENGGUNA (delete_user)
if ($action === 'delete_user') {
    $rawInput = file_get_contents('php://input');
    $inputData = json_decode($rawInput, true);
    $delId = isset($_GET['id']) ? $_GET['id'] : (isset($inputData['id']) ? $inputData['id'] : '');

    if (!empty($delId)) {
        $content = @file_get_contents($usersFile);
        $users = json_decode($content, true);
        if (!is_array($users)) $users = [];
        $users = array_values(array_filter($users, function($u) use ($delId) {
            if (isset($u['role']) && $u['role'] === 'admin') return true;
            return isset($u['id']) && $u['id'] !== $delId;
        }));
        @file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        echo json_encode(['success' => true, 'deleted' => $delId, 'users' => $users]);
        exit;
    }
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'ID pengguna tidak ditemukan.']);
    exit;
}

// 7. OVERWRITE / SINKRONKAN SEMUA ORDER (POST sync_all)
if ($action === 'sync_all' && $requestMethod === 'POST') {
    $rawInput = file_get_contents('php://input');
    $allOrders = json_decode($rawInput, true);
    if (is_array($allOrders)) {
        @file_put_contents($ordersFile, json_encode($allOrders, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        echo json_encode(['success' => true, 'count' => count($allOrders), 'orders' => $allOrders]);
        exit;
    }
}

// 8. SIMPAN TRANSAKSI BARU (POST create_order)
if ($action === 'create_order' || ($requestMethod === 'POST' && $action !== 'login' && $action !== 'sync_all' && $action !== 'create_user' && $action !== 'delete_order' && $action !== 'delete_user')) {
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

    // Jika ada data pembeli baru, otomatis simpan ke users jika belum ada
    if (!empty($newOrder['buyer_email'])) {
        $uContent = @file_get_contents($usersFile);
        $uList = json_decode($uContent, true);
        if (!is_array($uList)) $uList = [];
        $foundUser = false;
        foreach ($uList as $eu) {
            if (isset($eu['email']) && strtolower($eu['email']) === strtolower($newOrder['buyer_email'])) {
                $foundUser = true;
                break;
            }
        }
        if (!$foundUser) {
            $uList[] = [
                'id' => $newOrder['user_id'] ? $newOrder['user_id'] : ('usr-' . time()),
                'name' => !empty($newOrder['buyer_name']) ? $newOrder['buyer_name'] : 'Customer',
                'email' => strtolower($newOrder['buyer_email']),
                'password_hash' => 'user123',
                'role' => 'user',
                'profile_image' => 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
                'created_at' => date('c')
            ];
            @file_put_contents($usersFile, json_encode($uList, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        }
    }

    echo json_encode([
        'success' => true,
        'message' => 'Pesanan berhasil disimpan di server hosting.',
        'order' => $newOrder
    ]);
    exit;
}

// 7. DEFAULT: BACA SEMUA TRANSAKSI (GET get_orders)
$content = @file_get_contents($ordersFile);
$orders = json_decode($content, true);
if (!is_array($orders)) {
    $orders = [];
}

echo json_encode($orders, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
exit;
