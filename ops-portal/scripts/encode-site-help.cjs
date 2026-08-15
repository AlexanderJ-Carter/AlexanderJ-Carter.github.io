/**
 * Encode ops-portal/src/site-help.js → dist/help.b64 (+ help.b64) for the
 * existing gen-mcp-deploy / gen-split-mcp upload pipeline.
 *
 * Run: node ops-portal/scripts/encode-site-help.cjs
 * Then deploy with the existing gen-mcp-deploy.cjs (which reads dist/help.b64).
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const src = path.join(root, 'src', 'site-help.js');
const distDir = path.join(root, 'dist');

if (!fs.existsSync(src)) {
  console.error('site-help source not found:', src);
  process.exit(1);
}

const code = fs.readFileSync(src, 'utf8');
const b64 = Buffer.from(code, 'utf8').toString('base64');

fs.mkdirSync(distDir, { recursive: true });
// gen-mcp-deploy.cjs reads dist/help.b64; gen-split-mcp.cjs reads help.b64.
fs.writeFileSync(path.join(distDir, 'help.b64'), b64);
fs.writeFileSync(path.join(root, 'help.b64'), b64);

console.log(
  `encoded site-help.js (${code.length} bytes) → help.b64 (${b64.length} bytes)`
);
console.log('  -', path.join(distDir, 'help.b64'));
console.log('  -', path.join(root, 'help.b64'));
