/**
 * 扫描 public/music 目录，生成 manifest.json 供音乐播放器使用。
 * 支持本地文件 + 在线直播流（Jazz24、WRTI 古典/爵士等）。
 * 新增歌曲文件后无需改代码，构建时会自动识别。
 * 运行：node scripts/generate-music-manifest.js（或在 build 前自动执行）
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MUSIC_DIR = path.join(__dirname, '..', 'public', 'music');
const MANIFEST_PATH = path.join(MUSIC_DIR, 'manifest.json');
const AUDIO_EXT = new Set([
  '.mp3',
  '.ogg',
  '.flac',
  '.opus', // preferred: ~5-10x smaller than FLAC at transparent quality
  '.m4a',
  '.wav',
  '.webm',
  '.aac',
]);

/** 在线直播流预设（高质量免费音乐电台） */
const LIVE_STREAMS = [
  {
    file: 'https://live.amperwave.net/direct/ppm-jazz24mp3-ibc1',
    title: 'Jazz24 爵士电台',
    artist: 'Jazz24 (Seattle)',
    cover: '',
    type: 'live',
    description: '24小时爵士',
  },
  {
    file: 'https://wrti-live.streamguys1.com/classical-mp3',
    title: 'WRTI 古典音乐',
    artist: 'WRTI Philadelphia',
    cover: '',
    type: 'live',
    description: '古典直播',
  },
  {
    file: 'https://wrti-live.streamguys1.com/jazz-mp3',
    title: 'WRTI 爵士音乐',
    artist: 'WRTI Philadelphia',
    cover: '',
    type: 'live',
    description: '爵士直播',
  },
  {
    file: 'https://ice2.somafm.com/groovesalad-128-mp3',
    title: 'SomaFM Groove Salad',
    artist: 'SomaFM',
    cover: '',
    type: 'live',
    description: '轻松氛围',
  },
  {
    file: 'https://ice2.somafm.com/dronezone-128-mp3',
    title: 'SomaFM Drone Zone',
    artist: 'SomaFM',
    cover: '',
    type: 'live',
    description: '空灵感',
  },
  {
    file: 'https://ice2.somafm.com/spacestation-128-mp3',
    title: 'SomaFM Space Station',
    artist: 'SomaFM',
    cover: '',
    type: 'live',
    description: '太空氛围',
  },
  {
    file: 'https://ice2.somafm.com/lush-128-mp3',
    title: 'SomaFM Lush',
    artist: 'SomaFM',
    cover: '',
    type: 'live',
    description: '柔和人声',
  },
  {
    file: 'https://ice2.somafm.com/deepspaceone-128-mp3',
    title: 'SomaFM Deep Space One',
    artist: 'SomaFM',
    cover: '',
    type: 'live',
    description: '深空氛围',
  },
  {
    file: 'https://ice2.somafm.com/indiepop-128-mp3',
    title: 'SomaFM Indie Pop Rocks',
    artist: 'SomaFM',
    cover: '',
    type: 'live',
    description: '独立流行',
  },
];

/** 根据文件夹名返回默认封面 emoji */
function coverForFolder(dirName) {
  const lower = (dirName || '').toLowerCase();
  if (lower.includes('classical')) return '🏰';
  if (lower.includes('piano')) return '🎹';
  if (lower.includes('traditional') || lower.includes('folk')) return '🌙';
  if (lower.includes('jazz')) return '🎷';
  if (lower.includes('rock') || lower.includes('pop')) return '🎸';
  if (lower.includes('ambient')) return '🌊';
  if (lower.includes('cinematic')) return '🎬';
  if (lower.includes('nature')) return '🌿';
  return '🎵';
}

/** 将文件名转为可读标题，如 "castle-in-sky" -> "Castle In Sky" */
function filenameToTitle(baseName) {
  return (
    baseName
      .replace(/\s+/g, ' ')
      .split(/[-_.]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
      .trim() || baseName
  );
}

function scanDir(dir, basePath = '') {
  const entries = [];
  if (!fs.existsSync(dir)) return entries;

  const items = fs.readdirSync(dir, { withFileTypes: true });
  const dirs = items
    .filter((d) => d.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name));
  const files = items
    .filter((d) => d.isFile())
    .sort((a, b) => a.name.localeCompare(b.name));

  for (const file of files) {
    const ext = path.extname(file.name).toLowerCase();
    if (!AUDIO_EXT.has(ext)) continue;
    const baseName = path.basename(file.name, ext);
    const relativePath = path.join(basePath, file.name).replace(/\\/g, '/');
    const webPath = '/music/' + relativePath;
    const folderName = basePath ? path.basename(basePath) : path.basename(dir);
    entries.push({
      file: webPath,
      title: filenameToTitle(baseName),
      artist: '未知',
      cover: coverForFolder(folderName),
      type: 'local',
    });
  }

  for (const d of dirs) {
    const subDir = path.join(dir, d.name);
    const subBase = basePath ? path.join(basePath, d.name) : d.name;
    entries.push(...scanDir(subDir, subBase));
  }

  return entries;
}

function main() {
  const localTracks = scanDir(MUSIC_DIR);

  // 合并本地文件 + 在线直播流
  const tracks = [...localTracks, ...LIVE_STREAMS];

  const manifest = {
    generatedAt: new Date().toISOString(),
    totalTracks: tracks.length,
    localTracks: localTracks.length,
    liveStreams: LIVE_STREAMS.length,
    tracks,
  };

  fs.writeFileSync(
    MANIFEST_PATH,
    `${JSON.stringify(manifest, null, 2)}\n`,
    'utf8'
  );
  console.log(
    `[music-manifest] 已生成 ${tracks.length} 首歌曲 (${localTracks.length} 本地 + ${LIVE_STREAMS.length} 直播) -> public/music/manifest.json`
  );
  console.log('\n📻 在线直播流:');
  LIVE_STREAMS.forEach((s) => {
    console.log(`   ${s.cover} ${s.title} - ${s.description}`);
  });
  console.log(
    '\n💡 提示: 可从 https://pixabay.com/music 下载更多免费音乐到 public/music/ 目录'
  );
}

main();
