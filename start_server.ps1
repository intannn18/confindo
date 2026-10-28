# ==============================================================================
# CONFindo - Full-Stack Web & REST API Server
# Built with PowerShell .NET HttpListener (Zero Dependencies Required)
# ==============================================================================

$port = 8080
$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$port/"
$listener.Prefixes.Add($prefix)

$dbPath = Join-Path $PSScriptRoot "data\db.json"

function Get-Db {
    if (Test-Path $dbPath) {
        $content = Get-Content $dbPath -Raw -Encoding UTF8
        return ConvertFrom-Json $content
    }
    return @{}
}

function Save-Db($dbObj) {
    $json = ConvertTo-Json $dbObj -Depth 10
    Set-Content -Path $dbPath -Value $json -Encoding UTF8
}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".txt"  = "text/plain; charset=utf-8"
    ".pdf"  = "application/pdf"
    ".pptx" = "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    ".zip"  = "application/zip"
}

try {
    $listener.Start()
    Write-Host "==========================================================" -ForegroundColor Cyan
    Write-Host "   CONFindo Full-Stack Platform Berjalan!" -ForegroundColor Green
    Write-Host "   Identitas: Biru (#0B5796) & Oranye (#E65C00)" -ForegroundColor Yellow
    Write-Host "   Buka di Browser: $prefix" -ForegroundColor White
    Write-Host "   Halaman: /, /learn, /practice, /tools, /challenge, /store, /dashboard, /admin" -ForegroundColor Gray
    Write-Host "   REST API: $prefix" -NoNewline; Write-Host "api/* aktif" -ForegroundColor Green
    Write-Host "   Tekan Ctrl+C untuk menghentikan server" -ForegroundColor Gray
    Write-Host "==========================================================" -ForegroundColor Cyan
    
    Start-Process $prefix
} catch {
    Write-Host "Port $port sedang digunakan. Membuka index.html langsung di browser..." -ForegroundColor Yellow
    Start-Process "index.html"
    exit
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $method = $request.HttpMethod
        $rawUrl = $request.Url.LocalPath

        # Enable CORS
        $response.AddHeader("Access-Control-Allow-Origin", "*")
        $response.AddHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        $response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")

        if ($method -eq "OPTIONS") {
            $response.StatusCode = 200
            $response.OutputStream.Close()
            continue
        }

        # -------------------------------------------------------------
        # REST API HANDLERS (/api/*)
        # -------------------------------------------------------------
        if ($rawUrl.StartsWith("/api/")) {
            $response.ContentType = "application/json; charset=utf-8"
            $db = Get-Db

            # 1. GET /api/health
            if ($rawUrl -eq "/api/health") {
                $resJson = "{`"status`":`"ok`",`"platform`":`"CONFindo`",`"version`":`"2.0`"}"
            }
            # 2. GET /api/tutorials
            elseif ($rawUrl -eq "/api/tutorials" -and $method -eq "GET") {
                $resJson = ConvertTo-Json $db.tutorials -Depth 5
            }
            # 3. GET /api/products
            elseif ($rawUrl -eq "/api/products" -and $method -eq "GET") {
                $resJson = ConvertTo-Json $db.products -Depth 5
            }
            # 4. GET /api/challenges
            elseif ($rawUrl -eq "/api/challenges" -and $method -eq "GET") {
                $resJson = ConvertTo-Json $db.challenges -Depth 5
            }
            # 5. GET /api/admin/stats
            elseif ($rawUrl -eq "/api/admin/stats" -and $method -eq "GET") {
                $totalUsers = if ($db.users) { $db.users.Count } else { 0 }
                $totalProducts = if ($db.products) { $db.products.Count } else { 0 }
                $totalOrders = if ($db.orders) { $db.orders.Count } else { 0 }
                $totalRevenue = 0
                if ($db.orders) {
                    foreach ($o in $db.orders) {
                        if ($o.payment_status -eq "paid") {
                            $totalRevenue += [double]$o.total
                        }
                    }
                }
                $stats = @{
                    totalUsers = $totalUsers
                    totalProducts = $totalProducts
                    totalOrders = $totalOrders
                    totalRevenue = $totalRevenue
                }
                $resJson = ConvertTo-Json $stats
            }
            else {
                $resJson = "{`"message`":`"API endpoint ready`"}"
            }

            $bytes = [System.Text.Encoding]::UTF8.GetBytes($resJson)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            $response.OutputStream.Close()
            continue
        }

        # -------------------------------------------------------------
        # MULTI-PAGE CLEAN ROUTING & STATIC FILE SERVER
        # -------------------------------------------------------------
        $cleanPath = $rawUrl.Trim('/')
        if ([string]::IsNullOrWhiteSpace($cleanPath)) {
            $cleanPath = "index.html"
        }

        # Route rewrites
        if ($cleanPath -eq "learn" -or $cleanPath -eq "learn/") { $cleanPath = "learn/index.html" }
        elseif ($cleanPath -eq "practice" -or $cleanPath -eq "practice/") { $cleanPath = "practice/index.html" }
        elseif ($cleanPath -eq "tools" -or $cleanPath -eq "tools/") { $cleanPath = "tools/index.html" }
        elseif ($cleanPath -eq "challenge" -or $cleanPath -eq "challenge/") { $cleanPath = "challenge/index.html" }
        elseif ($cleanPath -eq "store" -or $cleanPath -eq "store/") { $cleanPath = "store/index.html" }
        elseif ($cleanPath.StartsWith("store/product")) { $cleanPath = "store/product.html" }
        elseif ($cleanPath.StartsWith("store/viewer") -or $cleanPath.StartsWith("store/pdf-viewer")) { $cleanPath = "store/viewer.html" }
        elseif ($cleanPath.StartsWith("store/download")) { $cleanPath = "store/download.html" }
        elseif ($cleanPath -eq "checkout" -or $cleanPath -eq "checkout/") { $cleanPath = "checkout/index.html" }
        elseif ($cleanPath -eq "dashboard" -or $cleanPath -eq "dashboard/") { $cleanPath = "dashboard/index.html" }
        elseif ($cleanPath -eq "admin" -or $cleanPath -eq "admin/") { $cleanPath = "admin/index.html" }
        elseif ($cleanPath -eq "login" -or $cleanPath -eq "login/") { $cleanPath = "login/index.html" }
        elseif ($cleanPath -eq "review" -or $cleanPath -eq "review/") { $cleanPath = "review/index.html" }

        $localFile = Join-Path $PSScriptRoot $cleanPath

        if (Test-Path $localFile -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($localFile).ToLower()
            $contentType = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
            $response.ContentType = $contentType
            
            $bytes = [System.IO.File]::ReadAllBytes($localFile)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $notFoundMsg = [System.Text.Encoding]::UTF8.GetBytes("404 Halaman Tidak Ditemukan - CONFindo")
            $response.OutputStream.Write($notFoundMsg, 0, $notFoundMsg.Length)
        }
        $response.OutputStream.Close()
    } catch {
        # Catch and continue on transient socket close
    }
}
