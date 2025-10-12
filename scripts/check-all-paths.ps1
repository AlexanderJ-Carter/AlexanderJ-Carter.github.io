# 全面检查和报告所有HTML文件的资源路径
# 检查是否有404或路径错误

Write-Host "开始全面检查资源路径..." -ForegroundColor Green

$rootPath = "d:\Website\AlexanderJ-Carter.github.io"
$issues = @()

# 定义正确的路径规则
function Test-PathCorrect {
    param(
        [string]$filePath,
        [string]$resourcePath
    )
    
    $fileDir = Split-Path $filePath -Parent
    $relativeDepth = ($fileDir.Replace($rootPath, "").Split([IO.Path]::DirectorySeparatorChar) | Where-Object { $_ -ne "" }).Count
    
    # 检查路径前缀
    if ($resourcePath -match '^\.\./') {
        $prefixCount = ([regex]::Matches($resourcePath, '\.\./').Count)
        
        # 根目录文件不应该有 ../
        if ($relativeDepth -eq 0 -and $prefixCount -gt 0) {
            return $false, "根目录文件不应使用 ../ 前缀"
        }
        
        # 子目录文件应该有正确数量的 ../
        if ($relativeDepth -gt 0 -and $prefixCount -ne $relativeDepth) {
            return $false, "../ 数量不正确 (应该是 $relativeDepth 个，实际是 $prefixCount 个)"
        }
    }
    elseif ($relativeDepth -gt 0) {
        return $false, "子目录文件缺少 ../ 前缀"
    }
    
    return $true, "OK"
}

# 检查资源文件是否存在
function Test-ResourceExists {
    param(
        [string]$filePath,
        [string]$resourcePath
    )
    
    $fileDir = Split-Path $filePath -Parent
    
    # 处理 ../ 前缀
    $normalizedPath = $resourcePath
    $currentDir = $fileDir
    
    while ($normalizedPath -match '^\.\./') {
        $normalizedPath = $normalizedPath -replace '^\.\.\/', ''
        $currentDir = Split-Path $currentDir -Parent
    }
    
    $fullPath = Join-Path $currentDir $normalizedPath
    
    # 检查文件是否存在
    if (Test-Path $fullPath) {
        return $true, "存在"
    }
    else {
        return $false, "文件不存在: $fullPath"
    }
}

# 获取所有HTML文件
$htmlFiles = Get-ChildItem -Path $rootPath -Filter "*.html" -Recurse | Where-Object { 
    $_.FullName -notmatch '\\node_modules\\' -and 
    $_.FullName -notmatch '\\.git\\' 
}

Write-Host "找到 $($htmlFiles.Count) 个HTML文件" -ForegroundColor Cyan

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $relativePath = $file.FullName.Replace($rootPath + "\", "")
    
    # 检查 JS 引用
    $jsMatches = [regex]::Matches($content, 'src=["'']([^"'']+\.js)[""'']')
    foreach ($match in $jsMatches) {
        $jsPath = $match.Groups[1].Value
        if ($jsPath -match '^(http|https|//)') { continue }
        
        $pathCorrect, $pathMsg = Test-PathCorrect -filePath $file.FullName -resourcePath $jsPath
        if (-not $pathCorrect) {
            $issues += [PSCustomObject]@{
                File = $relativePath
                Resource = $jsPath
                Type = "JS"
                Issue = $pathMsg
            }
        }
        
        $exists, $existsMsg = Test-ResourceExists -filePath $file.FullName -resourcePath $jsPath
        if (-not $exists) {
            $issues += [PSCustomObject]@{
                File = $relativePath
                Resource = $jsPath
                Type = "JS"
                Issue = $existsMsg
            }
        }
    }
    
    # 检查 CSS 引用
    $cssMatches = [regex]::Matches($content, 'href=["'']([^"'']+\.css)[""'']')
    foreach ($match in $cssMatches) {
        $cssPath = $match.Groups[1].Value
        if ($cssPath -match '^(http|https|//)') { continue }
        
        $pathCorrect, $pathMsg = Test-PathCorrect -filePath $file.FullName -resourcePath $cssPath
        if (-not $pathCorrect) {
            $issues += [PSCustomObject]@{
                File = $relativePath
                Resource = $cssPath
                Type = "CSS"
                Issue = $pathMsg
            }
        }
        
        $exists, $existsMsg = Test-ResourceExists -filePath $file.FullName -resourcePath $cssPath
        if (-not $exists) {
            $issues += [PSCustomObject]@{
                File = $relativePath
                Resource = $cssPath
                Type = "CSS"
                Issue = $existsMsg
            }
        }
    }
    
    # 检查图片引用 (img src)
    $imgMatches = [regex]::Matches($content, '<img[^>]+src=["'']([^"'']+)[""'']')
    foreach ($match in $imgMatches) {
        $imgPath = $match.Groups[1].Value
        if ($imgPath -match '^(http|https|//|data:)') { continue }
        if ($imgPath -notmatch '\.(jpg|jpeg|png|gif|svg|webp|ico)$') { continue }
        
        $pathCorrect, $pathMsg = Test-PathCorrect -filePath $file.FullName -resourcePath $imgPath
        if (-not $pathCorrect) {
            $issues += [PSCustomObject]@{
                File = $relativePath
                Resource = $imgPath
                Type = "Image"
                Issue = $pathMsg
            }
        }
        
        $exists, $existsMsg = Test-ResourceExists -filePath $file.FullName -resourcePath $imgPath
        if (-not $exists) {
            $issues += [PSCustomObject]@{
                File = $relativePath
                Resource = $imgPath
                Type = "Image"
                Issue = $existsMsg
            }
        }
    }
}

# 输出结果
Write-Host "`n====== 检查结果 ======" -ForegroundColor Yellow

if ($issues.Count -eq 0) {
    Write-Host "✓ 所有资源路径都正确！" -ForegroundColor Green
}
else {
    Write-Host "✗ 发现 $($issues.Count) 个问题：" -ForegroundColor Red
    Write-Host ""
    
    $issues | Group-Object File | ForEach-Object {
        Write-Host "文件: $($_.Name)" -ForegroundColor Cyan
        $_.Group | ForEach-Object {
            Write-Host "  [$($_.Type)] $($_.Resource)" -ForegroundColor Yellow
            Write-Host "    问题: $($_.Issue)" -ForegroundColor Red
        }
        Write-Host ""
    }
    
    # 保存报告
    $reportPath = Join-Path $rootPath "path-check-report.txt"
    $issues | Format-Table -AutoSize | Out-File $reportPath -Encoding UTF8
    Write-Host "详细报告已保存到: path-check-report.txt" -ForegroundColor Cyan
}

Write-Host "`nCheck Complete!" -ForegroundColor Green
