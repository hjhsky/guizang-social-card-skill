// 长页全页截图工具: Playwright 直驱系统 Chromium, 不下载浏览器包
// 用法: node shot.mjs <input.html> <output.png> [width=1080] [scale=2]
import { chromium } from 'playwright-core';
import { existsSync } from 'node:fs';

const [file, out, w = '1080', s = '2'] = process.argv.slice(2);
if (!file || !out) { console.error('usage: node shot.mjs <input.html> <output.png> [width] [scale]'); process.exit(1); }

const candidates = [
  process.env.CHROME_PATH,
  // macOS — Edge first: it is a Chromium build Playwright drives fine, and on
  // machines without Google Chrome it is the only system browser present.
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
  // Linux
  '/opt/meta-chromium/chrome',
  '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium', '/usr/bin/chromium-browser',
  '/usr/bin/microsoft-edge', '/usr/bin/microsoft-edge-stable',
  '/snap/bin/chromium',
].filter(Boolean);
const exe = candidates.find(p => existsSync(p));
if (!exe) { console.error('No Chrome/Chromium found. Set CHROME_PATH env to the browser executable.'); process.exit(1); }

const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'] });
const page = await browser.newPage({ viewport: { width: parseInt(w, 10), height: 1200 }, deviceScaleFactor: parseFloat(s) });
await page.goto('file://' + file, { waitUntil: 'load' });
await page.waitForTimeout(800);
await page.screenshot({ path: out, fullPage: true });
const size = await page.evaluate(() => ({ w: document.documentElement.scrollWidth, h: document.documentElement.scrollHeight }));
console.log('OK', out, JSON.stringify(size), 'x' + s);
await browser.close();
