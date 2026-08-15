/**
 * Verify the deployed-help payload integrity:
 *   1. dist/help.b64 is valid base64 and round-trips to UTF-8 cleanly.
 *   2. The decoded bytes match src/site-help.js byte-for-byte (drift check).
 *
 * Drift = the encoded artifact is stale relative to the source. This catches
 * "edited the worker but forgot `npm run encode:help` before deploy" before
 * it ships an old assumption set to production.
 *
 * Run: node ops-portal/scripts/check-help-payload.cjs
 * Exit 0 on pass, 1 on any failure (CI gate).
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const srcPath = path.join(root, 'src', 'site-help.js');
const b64Path = path.join(root, 'dist', 'help.b64');

function fail(msg) {
  console.error('✖ ' + msg);
  process.exit(1);
}

if (!fs.existsSync(srcPath)) fail('site-help source not found: ' + srcPath);
if (!fs.existsSync(b64Path)) {
  fail(
    'dist/help.b64 missing — run `npm run encode:help` first (node ops-portal/scripts/encode-site-help.cjs)'
  );
}

const b64 = fs.readFileSync(b64Path, 'utf8').trim();
const ok = /^[A-Za-z0-9+/=\r\n]+$/.test(b64) && b64.length % 4 === 0;
if (!ok) fail('dist/help.b64 is not valid base64 (length % 4 !== 0 or invalid chars)');

let decoded;
try {
  decoded = Buffer.from(b64, 'base64').toString('utf8');
} catch (e) {
  fail('dist/help.b64 did not decode to UTF-8: ' + e.message);
}

const source = fs.readFileSync(srcPath, 'utf8');

if (decoded !== source) {
  fail(
    'DRIFT: dist/help.b64 does not match src/site-help.js.\n' +
      '  source: ' +
      source.length +
      ' bytes\n' +
      '  decoded: ' +
      decoded.length +
      ' bytes\n' +
      'Run `npm run encode:help` to re-encode, then re-deploy.'
  );
}

// Keep the legacy mcp-help-payload.json dump for tooling that reads it.
const mcpHelpTxt = path.join(root, 'dist', 'mcp-help-only.txt');
if (fs.existsSync(mcpHelpTxt)) {
  const code = fs.readFileSync(mcpHelpTxt, 'utf8');
  fs.writeFileSync(
    path.join(root, 'dist', 'mcp-help-payload.json'),
    JSON.stringify({ code })
  );
}

console.log(
  JSON.stringify({
    ok: true,
    sourceBytes: source.length,
    b64Bytes: b64.length,
    match: true,
  })
);
