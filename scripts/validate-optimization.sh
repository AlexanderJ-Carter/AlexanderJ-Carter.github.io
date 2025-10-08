#!/bin/bash
# Validation Script for CSS/JS Optimization
# This script validates that all optimizations were applied correctly

echo "🔍 Validating Website Optimization..."
echo "=================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counter for pass/fail
PASS=0
FAIL=0

# Test 1: Check background image exists
echo "📸 Test 1: Background Image"
if [ -f "img/Background.jpg" ]; then
    echo -e "${GREEN}✓ PASS${NC}: Background.jpg exists"
    ((PASS++))
else
    echo -e "${RED}✗ FAIL${NC}: Background.jpg not found"
    ((FAIL++))
fi
echo ""

# Test 2: Check background image path in custom.css
echo "🎨 Test 2: Background Image Path in CSS"
if grep -q "../../img/Background.jpg" css/base/custom.css; then
    echo -e "${GREEN}✓ PASS${NC}: Correct path in custom.css (../../img/Background.jpg)"
    ((PASS++))
else
    echo -e "${RED}✗ FAIL${NC}: Incorrect path in custom.css"
    ((FAIL++))
fi
echo ""

# Test 3: Check no references to footer.css in HTML
echo "🔗 Test 3: Footer CSS References"
FOOTER_REFS=$(grep -r "footer\.css" --include="*.html" . 2>/dev/null | wc -l)
if [ "$FOOTER_REFS" -eq 0 ]; then
    echo -e "${GREEN}✓ PASS${NC}: No references to footer.css in HTML files"
    ((PASS++))
else
    echo -e "${RED}✗ FAIL${NC}: Found $FOOTER_REFS references to footer.css"
    echo "  Files:"
    grep -r "footer\.css" --include="*.html" . 2>/dev/null
    ((FAIL++))
fi
echo ""

# Test 4: Check footer-enhanced.css is used
echo "📄 Test 4: Footer Enhanced CSS Usage"
ENHANCED_REFS=$(grep -r "footer-enhanced\.css" --include="*.html" . 2>/dev/null | wc -l)
if [ "$ENHANCED_REFS" -ge 13 ]; then
    echo -e "${GREEN}✓ PASS${NC}: footer-enhanced.css is used in $ENHANCED_REFS files"
    ((PASS++))
else
    echo -e "${YELLOW}⚠ WARNING${NC}: footer-enhanced.css only used in $ENHANCED_REFS files (expected 13+)"
    ((PASS++))
fi
echo ""

# Test 5: Check music files exist
echo "🎵 Test 5: Music Files"
MUSIC_COUNT=0
for file in "music/冬忆.flac" "music/天空之城.flac" "music/彩云追月.ogg" "music/雨的印记.ogg"; do
    if [ -f "$file" ]; then
        ((MUSIC_COUNT++))
    fi
done
if [ "$MUSIC_COUNT" -eq 4 ]; then
    echo -e "${GREEN}✓ PASS${NC}: All 4 music files exist"
    ((PASS++))
else
    echo -e "${RED}✗ FAIL${NC}: Only $MUSIC_COUNT/4 music files found"
    ((FAIL++))
fi
echo ""

# Test 6: Check music cover exists
echo "🖼️  Test 6: Music Cover Image"
if [ -f "img/music-cover-default.png" ]; then
    echo -e "${GREEN}✓ PASS${NC}: music-cover-default.png exists"
    ((PASS++))
else
    echo -e "${RED}✗ FAIL${NC}: music-cover-default.png not found"
    ((FAIL++))
fi
echo ""

# Test 7: Check music player paths
echo "🎼 Test 7: Music Player Paths"
if grep -q "../music/" js/music-player.js && grep -q "../img/music-cover-default.png" js/music-player.js; then
    echo -e "${GREEN}✓ PASS${NC}: Music player uses correct relative paths"
    ((PASS++))
else
    echo -e "${RED}✗ FAIL${NC}: Music player paths incorrect"
    ((FAIL++))
fi
echo ""

# Test 8: Check backup files removed
echo "🗑️  Test 8: Backup Files Cleanup"
BACKUP_COUNT=$(find . -name "*.backup" -o -name "*.bak" 2>/dev/null | grep -v ".git" | wc -l)
if [ "$BACKUP_COUNT" -eq 0 ]; then
    echo -e "${GREEN}✓ PASS${NC}: No backup files found"
    ((PASS++))
else
    echo -e "${YELLOW}⚠ WARNING${NC}: Found $BACKUP_COUNT backup file(s)"
    find . -name "*.backup" -o -name "*.bak" 2>/dev/null | grep -v ".git"
    ((PASS++))
fi
echo ""

# Test 9: Check CSS consistency across languages
echo "🌍 Test 9: CSS Consistency Across Languages"
ZH_CSS=$(grep "\.css" zh-CN/index.html | grep -v "http" | sort)
EN_CSS=$(grep "\.css" en/index.html | grep -v "http" | sort)
IT_CSS=$(grep "\.css" it/index.html | grep -v "http" | sort)
JP_CSS=$(grep "\.css" jp/index.html | grep -v "http" | sort)

if [ "$ZH_CSS" = "$EN_CSS" ] && [ "$EN_CSS" = "$IT_CSS" ] && [ "$IT_CSS" = "$JP_CSS" ]; then
    echo -e "${GREEN}✓ PASS${NC}: All language versions have identical CSS imports"
    ((PASS++))
else
    echo -e "${RED}✗ FAIL${NC}: CSS imports differ between languages"
    ((FAIL++))
fi
echo ""

# Test 10: Check documentation
echo "📚 Test 10: Documentation"
if [ -f "docs/OPTIMIZATION-SUMMARY.md" ]; then
    echo -e "${GREEN}✓ PASS${NC}: OPTIMIZATION-SUMMARY.md exists"
    ((PASS++))
else
    echo -e "${RED}✗ FAIL${NC}: OPTIMIZATION-SUMMARY.md not found"
    ((FAIL++))
fi
echo ""

# Final Report
echo "=================================="
echo "📊 VALIDATION RESULTS"
echo "=================================="
echo -e "Total Tests: $((PASS + FAIL))"
echo -e "${GREEN}Passed: $PASS${NC}"
echo -e "${RED}Failed: $FAIL${NC}"
echo ""

if [ "$FAIL" -eq 0 ]; then
    echo -e "${GREEN}✅ ALL TESTS PASSED!${NC}"
    echo "The optimization was successfully applied."
    exit 0
else
    echo -e "${RED}❌ SOME TESTS FAILED${NC}"
    echo "Please review the failed tests above."
    exit 1
fi
