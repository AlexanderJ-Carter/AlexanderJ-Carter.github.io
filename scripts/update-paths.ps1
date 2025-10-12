# 更新所有HTML文件中的资源路径引用
# 用于第二阶段重组后的路径更新

Write-Host "开始更新资源路径引用..." -ForegroundColor Green

$rootPath = "d:\Website\AlexanderJ-Carter.github.io"

# 定义路径映射 (旧路径 -> 新路径)
$imagePaths = @{
    'img/Background.jpg' = 'img/backgrounds/main-bg.jpg'
    'img/AboutMe.jpg' = 'img/profile/about-me.jpg'
    'img/University.jpg' = 'img/profile/university.jpg'
    'img/Photo1.jpg' = 'img/profile/portrait-01.jpg'
    'img/Photo2.jpg' = 'img/profile/portrait-02.jpg'
    'img/Photo3.jpg' = 'img/profile/portrait-03.jpg'
    'img/Photo4.jpg' = 'img/profile/portrait-04.jpg'
    'img/Logo.jpg' = 'img/misc/logo-legacy.jpg'
    'img/logo.png' = 'img/branding/logo.png'
    'img/logo0.png' = 'img/icons/blog-logo.png'
    'img/Blog-Logo.png' = 'img/icons/blog-logo.png'
    'img/favicon.ico' = 'img/branding/favicon.ico'
    'img/apple-touch-icon.png' = 'img/branding/apple-touch-icon.png'
    'img/github-icon.png' = 'img/icons/github.png'
    'img/qq-icon.png' = 'img/icons/qq.png'
    'img/wechat-icon.png' = 'img/icons/wechat.png'
    'img/AI.png' = 'img/misc/ai-banner.png'
    'img/music-cover-default.png' = 'img/misc/music-cover-default.png'
    'img/gallery-hero-bg.jpg' = 'img/backgrounds/gallery-hero-bg.jpg'
    'img/Flower1.jpg' = 'img/gallery/nature-flower-01.jpg'
    'img/Flower2.jpg' = 'img/gallery/nature-flower-02.jpg'
    'img/Food1.jpg' = 'img/gallery/food-01.jpg'
    'img/Food2.jpg' = 'img/gallery/food-02.jpg'
    'img/Food3.jpg' = 'img/gallery/food-03.jpg'
    'img/WebPhoto (1).jpg' = 'img/gallery/landscape-01.jpg'
    'img/WebPhoto (2).jpg' = 'img/gallery/landscape-02.jpg'
    'img/WebPhoto (3).jpg' = 'img/gallery/landscape-03.jpg'
    'img/WebPhoto (4).jpg' = 'img/gallery/landscape-04.jpg'
    'img/WebPhoto (5).jpg' = 'img/gallery/landscape-05.jpg'
    'img/WebPhoto (6).jpg' = 'img/gallery/landscape-06.jpg'
    'img/WebPhoto (7).jpg' = 'img/gallery/landscape-07.jpg'
    'img/WebPhoto (8).jpg' = 'img/gallery/landscape-08.jpg'
    'img/WebPhoto (9).jpg' = 'img/gallery/landscape-09.jpg'
    'img/WebPhoto (10).jpg' = 'img/gallery/landscape-10.jpg'
    'img/WebPhoto (11).jpg' = 'img/gallery/landscape-11.jpg'
    'img/WebPhoto (12).jpg' = 'img/gallery/landscape-12.jpg'
    'img/WebPhoto (13).jpg' = 'img/gallery/landscape-13.jpg'
}

$jsPaths = @{
    'js/error-handler-simple.js' = 'js/core/error-handler.js'
    'js/navigation.js' = 'js/core/navigation.js'
    'js/lang-redirect.js' = 'js/core/lang-redirect.js'
    'js/music-player.js' = 'js/components/music-player.js'
    'js/chatbot.js' = 'js/components/chatbot.js'
    'js/cookie-consent.js' = 'js/components/cookie-consent.js'
    'js/share.js' = 'js/components/share.js'
    'js/homepage-main.js' = 'js/pages/homepage.js'
    'js/gallery.js' = 'js/pages/gallery.js'
    'js/calendar.js' = 'js/pages/calendar.js'
    'js/currency.js' = 'js/pages/currency.js'
    'js/time.js' = 'js/pages/time.js'
    'js/profile.js' = 'js/pages/profile.js'
    'js/contact.js' = 'js/pages/contact.js'
    'js/ads.js' = 'js/pages/ads.js'
    'js/privacy.js' = 'js/pages/privacy.js'
    'js/terms.js' = 'js/pages/terms.js'
    'js/poem.js' = 'js/features/poem.js'
    'js/comments.js' = 'js/features/comments.js'
    'js/newyear.js' = 'js/features/newyear.js'
    'js/lunar.js' = 'js/features/lunar.js'
    'js/error-game.js' = 'js/features/error-game.js'
    'js/show.js' = 'js/features/show.js'
    'js/verification.js' = 'js/auth/verification.js'
    'js/verify.js' = 'js/auth/verify-page.js'
    'js/financial-dashboard.js' = 'js/financial/dashboard.js'
    'js/display.js' = 'js/utils/display.js'
    'js/enhanced.js' = 'js/utils/enhanced.js'
    'js/perf.js' = 'js/utils/perf.js'
    'js/bootstrap.bundle.min.js' = 'js/vendor/bootstrap.bundle.min.js'
    'js/glightbox.min.js' = 'js/vendor/glightbox.min.js'
}

$musicPaths = @{
    'music/天空之城.flac' = 'music/classical/castle-in-sky.flac'
    'music/冬忆.flac' = 'music/piano/winter-memory.flac'
    'music/雨的印记.ogg' = 'music/piano/kiss-the-rain.ogg'
    'music/彩云追月.ogg' = 'music/traditional/colorful-clouds-chasing-moon.ogg'
}

# 获取所有HTML文件
$htmlFiles = Get-ChildItem -Path $rootPath -Filter "*.html" -Recurse

$totalFiles = $htmlFiles.Count
$processedFiles = 0
$modifiedFiles = 0

foreach ($file in $htmlFiles) {
    $processedFiles++
    Write-Progress -Activity "更新HTML文件" -Status "处理 $($file.Name)" -PercentComplete (($processedFiles / $totalFiles) * 100)
    
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    $modified = $false
    
    # 更新图片路径
    foreach ($oldPath in $imagePaths.Keys) {
        $newPath = $imagePaths[$oldPath]
        
        # 处理不同的路径前缀 (../, ./, 或无前缀)
        $patterns = @(
            $oldPath,
            "../$oldPath",
            "../../$oldPath",
            "../../../$oldPath"
        )
        
        foreach ($pattern in $patterns) {
            if ($content -match [regex]::Escape($pattern)) {
                # 计算正确的相对路径
                $relPath = [System.IO.Path]::GetDirectoryName($file.FullName)
                $depth = ($relPath.Replace($rootPath, "").Split([IO.Path]::DirectorySeparatorChar) | Where-Object { $_ -ne "" }).Count
                
                $prefix = ""
                if ($depth -gt 0) {
                    $prefix = "../" * $depth
                }
                
                $targetPath = $prefix + $newPath
                $content = $content -replace [regex]::Escape($pattern), $targetPath
                $modified = $true
            }
        }
    }
    
    # 更新JS路径
    foreach ($oldPath in $jsPaths.Keys) {
        $newPath = $jsPaths[$oldPath]
        
        $patterns = @(
            $oldPath,
            "../$oldPath",
            "../../$oldPath",
            "../../../$oldPath"
        )
        
        foreach ($pattern in $patterns) {
            if ($content -match [regex]::Escape($pattern)) {
                $relPath = [System.IO.Path]::GetDirectoryName($file.FullName)
                $depth = ($relPath.Replace($rootPath, "").Split([IO.Path]::DirectorySeparatorChar) | Where-Object { $_ -ne "" }).Count
                
                $prefix = ""
                if ($depth -gt 0) {
                    $prefix = "../" * $depth
                }
                
                $targetPath = $prefix + $newPath
                $content = $content -replace [regex]::Escape($pattern), $targetPath
                $modified = $true
            }
        }
    }
    
    # 更新音乐路径
    foreach ($oldPath in $musicPaths.Keys) {
        $newPath = $musicPaths[$oldPath]
        
        if ($content -match [regex]::Escape($oldPath)) {
            $content = $content -replace [regex]::Escape($oldPath), $newPath
            $modified = $true
        }
    }
    
    # 如果内容有修改，保存文件
    if ($modified) {
        $modifiedFiles++
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "✓ 已更新: $($file.FullName.Replace($rootPath, ''))" -ForegroundColor Cyan
    }
}

Write-Host "`n完成!" -ForegroundColor Green
Write-Host "总共处理: $totalFiles 个文件" -ForegroundColor Yellow
Write-Host "已修改: $modifiedFiles 个文件" -ForegroundColor Yellow
