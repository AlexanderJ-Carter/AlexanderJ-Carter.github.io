#!/usr/bin/env node

/**
 * 图片优化脚本
 * 将 JPG 转换为 WebP 和 AVIF，并生成多种尺寸
 *
 * AVIF 比 WebP 小 50%，比 JPEG 小 70%
 *
 * 使用前请安装: npm install --save-dev sharp
 */

import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, parse } from 'path';
import { existsSync } from 'fs';

const INPUT_DIR = './public/img/gallery';
const OUTPUT_DIR = './public/img/gallery-optimized';

// 响应式图片尺寸
const SIZES = [
  { width: 400, suffix: '-sm' }, // 移动端
  { width: 800, suffix: '-md' }, // 平板
  { width: 1200, suffix: '-lg' }, // 桌面
  { width: 1920, suffix: '-xl' }, // 大屏
];

// 输出格式配置
const FORMATS = [
  {
    format: 'avif',
    options: { quality: 65, effort: 6 },
    description: 'AVIF (最新格式，体积最小)',
  },
  {
    format: 'webp',
    options: { quality: 85, effort: 6 },
    description: 'WebP (兼容性好)',
  },
];

async function optimizeImages() {
  console.log('🖼️  开始图片优化...\n');

  // 创建输出目录
  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true });
  }

  const files = await readdir(INPUT_DIR);
  const jpgFiles = files.filter(
    (f) => f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png')
  );

  console.log(`找到 ${jpgFiles.length} 张图片需要优化\n`);

  for (const file of jpgFiles) {
    const inputPath = join(INPUT_DIR, file);
    const { name } = parse(file);
    const stats = await sharp(inputPath).metadata();

    console.log(`处理: ${file} (${stats.width}x${stats.height})`);

    // 生成多种格式
    for (const { format, options, description } of FORMATS) {
      const outputPath = join(OUTPUT_DIR, `${name}.${format}`);
      await sharp(inputPath)[format](options).toFile(outputPath);
      console.log(`  ✅ ${name}.${format} - ${description}`);
    }

    // 生成响应式尺寸
    for (const size of SIZES) {
      if (stats.width >= size.width) {
        for (const { format, options } of FORMATS) {
          const sizePath = join(OUTPUT_DIR, `${name}${size.suffix}.${format}`);
          await sharp(inputPath)
            .resize(size.width, null, { withoutEnlargement: true })
            [format](options)
            .toFile(sizePath);
        }
        console.log(`  ✅ ${name}${size.suffix}.[avif/webp] (${size.width}px)`);
      }
    }
  }

  console.log('\n✨ 优化完成！');
  console.log(`输出目录: ${OUTPUT_DIR}`);
  console.log('\n💡 使用示例:');
  console.log('<picture>');
  console.log('  <source srcset="image.avif" type="image/avif">');
  console.log('  <source srcset="image.webp" type="image/webp">');
  console.log('  <img src="image.jpg" alt="Fallback" loading="lazy">');
  console.log('</picture>');
}

optimizeImages().catch(console.error);
