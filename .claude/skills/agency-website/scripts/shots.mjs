#!/usr/bin/env node
// Screenshot a page at agency breakpoints and report problems.
// Usage: node shots.mjs <url-or-html-file> [outdir=shots]
// Needs Playwright (require('playwright') or `npm i -D playwright` in the project).
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  try {
    ({ chromium } = require(require.resolve('playwright', { paths: [process.cwd()] })));
  } catch {
    console.error('Playwright not found. Run: npm i -D playwright && npx playwright install chromium');
    process.exit(1);
  }
}

const [target, outdir = 'shots'] = process.argv.slice(2);
if (!target) {
  console.error('Usage: node shots.mjs <url-or-html-file> [outdir]');
  process.exit(1);
}
// A local file is served over http from its folder (file:// blocks ES modules and fetch).
let server = null;
let url = target;
if (!/^https?:/.test(target)) {
  const file = path.resolve(target);
  const root = path.dirname(file);
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
    '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif',
    '.woff2': 'font/woff2', '.woff': 'font/woff', '.mp4': 'video/mp4', '.ico': 'image/x-icon', '.txt': 'text/plain' };
  server = http.createServer((req, res) => {
    const p = path.join(root, decodeURIComponent(req.url.split('?')[0]));
    if (!p.startsWith(root) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'content-type': types[path.extname(p).toLowerCase()] || 'application/octet-stream' });
    fs.createReadStream(p).pipe(res);
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  url = `http://127.0.0.1:${server.address().port}/${path.basename(file)}`;
}
const widths = [1440, 1024, 768, 390];
fs.mkdirSync(outdir, { recursive: true });

const browser = await chromium.launch();
let problems = 0;
for (const w of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(`console: ${m.text()}`));
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('requestfailed', (r) => errors.push(`request failed: ${r.url()}`));
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }).catch((e) => errors.push(`goto: ${e.message}`));
  // Let entrance animations settle and trigger lazy content.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += innerHeight) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
    scrollTo(0, 0);
  });
  await page.waitForTimeout(800);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  if (overflow > 1) errors.push(`horizontal overflow: ${overflow}px wider than viewport`);
  const brokenImgs = await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src));
  brokenImgs.forEach((s) => errors.push(`broken image: ${s}`));
  const missingAlt = await page.evaluate(() => [...document.images].filter((i) => !i.hasAttribute('alt')).length);
  if (missingAlt) errors.push(`${missingAlt} image(s) without alt`);
  const file = path.join(outdir, `${w}.png`);
  await page.screenshot({ path: file, fullPage: true });
  console.log(`${w}px -> ${file}${errors.length ? '' : '  OK'}`);
  errors.forEach((e) => console.log(`   ! ${e}`));
  problems += errors.length;
  await page.close();
}
await browser.close();
if (server) server.close();
console.log(problems ? `\n${problems} problem(s) found.` : '\nNo problems found.');
process.exit(problems ? 2 : 0);
