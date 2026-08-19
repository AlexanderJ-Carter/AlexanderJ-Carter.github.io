/** Page-level headers for HTML responses on the apex Worker. */

export const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://pagead2.googlesyndication.com https://www.googletagmanager.com https://partner.googleadservices.com https://googleads.g.doubleclick.net https://static.cloudflareinsights.com https://sdk.jinrishici.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https:",
  "media-src 'self' https://ice2.somafm.com https://live.amperwave.net https://wrti-live.streamguys1.com blob:",
  "connect-src 'self' https://api.open-meteo.com https://open.er-api.com https://api.github.com https://api.qrserver.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://static.cloudflareinsights.com https://ice2.somafm.com https://live.amperwave.net https://wrti-live.streamguys1.com https://v2.jinrishici.com https://sdk.jinrishici.com",
  'frame-src https://challenges.cloudflare.com https://googleads.g.doubleclick.net https://td.doubleclick.net',
  "base-uri 'self'",
  "form-action 'self' mailto:",
  "frame-ancestors 'none'",
].join('; ');

const PAGE_HEADERS = {
  'Content-Security-Policy': CONTENT_SECURITY_POLICY,
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy':
    'accelerometer=(), camera=(), geolocation=(self), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
};

const API_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};

export function applyPageSecurityHeaders(headers) {
  for (const [name, value] of Object.entries(PAGE_HEADERS)) {
    headers.set(name, value);
  }
}

export function applyApiSecurityHeaders(headers) {
  for (const [name, value] of Object.entries(API_HEADERS)) {
    headers.set(name, value);
  }
}

export function isHtmlContentType(contentType) {
  return (contentType || '').toLowerCase().includes('text/html');
}
