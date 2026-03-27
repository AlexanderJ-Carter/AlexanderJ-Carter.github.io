#!/usr/bin/env node

/**
 * 图片优化脚本
 * 将 JPG 转换为 WebP，并生成多种尺寸
 *
 * 使用前请安装: npm install --save-dev sharp imagemin imagemin-webp
 */

import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, parse } from 'path';
import { existsSync } from 'fs';

const INPUT_DIR = './public/img/gallery';
const OUTPUT_DIR = './public/img/gallery-optimized';

// 响应式图片尺寸
const SIZES = [
  { width: 400, suffix: '-sm' },   // 移动端
  { width: 800, suffix: '-md' },   // 平板
  { width: 1200, suffix: '-lg' },  // 桌面
  { width: 1920, suffix: '-xl' },  // 大屏
];

async function optimizeImages() {
  console.log('🖼️  开始图片优化...\n');

  // 创建输出目录
  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true });
  }

  const files = await readdir(INPUT_DIR);
  const jpgFiles = files.filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg'));

  console.log(`找到 ${jpgFiles.length} 张图片需要优化\n`);

  for (const file of jpgFiles) {
    const inputPath = join(INPUT_DIR, file);
    const { name } = parse(file);
    const stats = await sharp(inputPath).metadata();

    console.log(`处理: ${file} (${stats.width}x${stats.height})`);

    // 生成原始尺寸的 WebP（质量 85%）
    const outputPath = join(OUTPUT_DIR, `${name}.webp`);
    await sharp(inputPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);

    console.log(`  ✅ ${name}.webp`);

    // 生成响应式尺寸
    for (const size of SIZES) {
      if (stats.width >= size.width) {
        const sizePath = join(OUTPUT_DIR, `${name}${size.suffix}.webp`);
        await sharp(inputPath)
          .resize(size.width, null, { withoutEnlargement: true })
          .webp({ quality: 85, effort: 6 })
          .toFile(sizePath);

        console.log(`  ✅ ${name}${size.suffix}.webp (${size.width}px)`);
      }
    }
  }

  console.log('\n✨ 优化完成！');
  console.log(`输出目录: ${OUTPUT_DIR}`);
}

optimizeImages().catch(console.error);
