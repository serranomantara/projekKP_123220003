# Script PowerShell untuk update semua halaman dummy

Write-Host "[UPDATE] Memulai update semua halaman dummy..." -ForegroundColor Cyan
Write-Host ""

$pagesPath = "d:\Kuliah\Semester 7\KP\projek_rev\pages"
$htmlFiles = Get-ChildItem -Path $pagesPath -Recurse -Filter "*.html"
$count = 0

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $changed = $false
    
    # 1. Fix CSS path
    if ($content -match '\.\.\/\.\.\/pages-style\.css') {
        $content = $content -replace '\.\.\/\.\.\/pages-style\.css', '../pages-style.css'
        $changed = $true
        Write-Host "[OK] Fixed CSS path: $($file.Name)" -ForegroundColor Green
    }
    
    # 2. Fix back button
    if ($content -match 'window\.history\.back\(\)') {
        $content = $content -replace 'window\.history\.back\(\)', "window.location.href='../../index.html'"
        $changed = $true
        Write-Host "[OK] Fixed back button: $($file.Name)" -ForegroundColor Green
    }
    
    # 3. Remove old script section
    $oldScriptPattern = '(?s)<script>.*?document\.querySelectorAll.*?view-btn.*?</script>'
    if ($content -match $oldScriptPattern) {
        $content = $content -replace $oldScriptPattern, ''
        $changed = $true
        Write-Host "[OK] Removed old script: $($file.Name)" -ForegroundColor Yellow
    }
    
    # 4. Add page-manager.js if not exists
    if ($content -notmatch 'page-manager\.js') {
        $content = $content -replace '</body>', "`n    <script src=`"../page-manager.js`"></script>`n</body>"
        $changed = $true
        Write-Host "[OK] Added page-manager.js: $($file.Name)" -ForegroundColor Cyan
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
