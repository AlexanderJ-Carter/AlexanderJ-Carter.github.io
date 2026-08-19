const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'dist', 'mcp-help-only.txt');
const c = fs.readFileSync(file, 'utf8');
const m = c.match(/atob\("([^"]+)"\)/);
if (!m) {
  console.error('no_atob');
  process.exit(1);
}
const decoded = Buffer.from(m[1], 'base64').toString('utf8');
const ok =
  decoded.includes('perMinute: 8') &&
  decoded.includes('perHour: 40') &&
  c.includes('HELP_RATE') &&
  c.includes("workers/scripts/site-help");
console.log(
  JSON.stringify({
    len: c.length,
    b64len: m[1].length,
    ok,
    hasLlmMode: decoded.includes("'llm'"),
  })
);
if (!ok) process.exit(2);
