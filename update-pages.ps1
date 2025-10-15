# Script PowerShell untuk update semua halaman dummy
# 1. Fix back button
# 2. Fix CSS path  
# 3. Add page-manager.js script

Write-Host "🔧 Memulai update semua halaman dummy..." -ForegroundColor Cyan
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
        Write-Host "  ✅ Fixed CSS path: $($file.Name)" -ForegroundColor Green
    }
    
    # 2. Fix back button - method 1
    if ($content -match 'onclick="window\.history\.back\(\)"') {
        $content = $content -replace 'onclick="window\.history\.back\(\)"', 'onclick="window.location.href=''../../index.html''"'
        $changed = $true
        Write-Host "  ✅ Fixed back button: $($file.Name)" -ForegroundColor Green
    }
    
    # 3. Fix back button - method 2
    if ($content -match 'window\.history\.back\(\)') {
        $content = $content -replace 'window\.history\.back\(\)', "window.location.href='../../index.html'"
        $changed = $true
        Write-Host "  ✅ Fixed back button (alt): $($file.Name)" -ForegroundColor Green
    }
    
    # 4. Remove old script section
    $oldScriptPattern = '(?s)<script>.*?document\.querySelectorAll\(.*?view-btn.*?\).*?</script>'
    if ($content -match $oldScriptPattern) {
        $content = $content -replace $oldScriptPattern, ''
        $changed = $true
        Write-Host "  ✅ Removed old script: $($file.Name)" -ForegroundColor Yellow
    }
    
    # 5. Add page-manager.js if not exists
    if ($content -notmatch 'page-manager\.js') {
        $bodyEndPattern = '</body>'
        $replacement = @"
    
    <script src="../page-manager.js"></script>
</body>
"@
        $content = $content -replace $bodyEndPattern, $replacement
        $changed = $true
        Write-Host "  ✅ Added page-manager.js: $($file.Name)" -ForegroundColor Cyan
    }
    
    # Save if changed
    if ($changed) {
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        $count++
    }
}

Write-Host ""
Write-Host "✨ Selesai! Total $count file diupdate." -ForegroundColor Cyan
Write-Host ""
