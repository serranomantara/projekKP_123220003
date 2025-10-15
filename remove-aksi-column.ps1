# Script untuk menghapus kolom AKSI dari semua halaman

Write-Host "[UPDATE] Menghapus kolom Aksi dari semua halaman..." -ForegroundColor Cyan
Write-Host ""

$pagesPath = "d:\Kuliah\Semester 7\KP\projek_rev\pages"
$htmlFiles = Get-ChildItem -Path $pagesPath -Recurse -Filter "*.html"
$count = 0

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $changed = $false
    
    # 1. Remove <th>Aksi</th> or <th>AKSI</th>
    if ($content -match '<th>Aksi</th>') {
        $content = $content -replace '<th>Aksi</th>', ''
        $changed = $true
        Write-Host "[OK] Removed Aksi header: $($file.Name)" -ForegroundColor Green
    }
    
    if ($content -match '<th>AKSI</th>') {
        $content = $content -replace '<th>AKSI</th>', ''
        $changed = $true
        Write-Host "[OK] Removed AKSI header: $($file.Name)" -ForegroundColor Green
    }
    
    # 2. Remove <td> with action button
    $actionButtonPattern = '(?s)<td>\s*<button class="action-btn.*?</button>\s*</td>'
    if ($content -match $actionButtonPattern) {
        $content = $content -replace $actionButtonPattern, ''
        $changed = $true
        Write-Host "[OK] Removed action buttons: $($file.Name)" -ForegroundColor Yellow
    }
    
    # 3. Alternative pattern for Detail button
    $detailButtonPattern = '(?s)<td>\s*<button.*?Detail.*?</button>\s*</td>'
    if ($content -match $detailButtonPattern) {
        $content = $content -replace $detailButtonPattern, ''
        $changed = $true
        Write-Host "[OK] Removed detail buttons: $($file.Name)" -ForegroundColor Yellow
    }
    
    # Save if changed
    if ($changed) {
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        $count++
    }
}

Write-Host ""
Write-Host "[DONE] Total $count file diupdate." -ForegroundColor Green
Write-Host ""
