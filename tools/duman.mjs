// Duman testi: ana ekran, oyuna giris, Yenilikler / Son kosular pencereleri ve telefon gorunumu.
// smoke.mjs "sayfa hatasiz aciliyor mu" sorusuna bakar; bu betik oyunun ekranlarinin calistigini dener.
//
// Kullanim: node tools/duman.mjs [index.html'in bulundugu klasor]
// Gerekenler: `playwright` paketi (depoya eklenmez; tools/ altinda `npm ci` ya da ust klasorde kurulu olabilir).
// DUMAN_BROWSER=<tarayici exe yolu> verilirse o tarayici acilir (Playwright'in kendi Chromium'u yoksa).
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { dirname, join, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = resolve(process.argv[2] || join(dirname(fileURLToPath(import.meta.url)), '..'));
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
const server = createServer((q, s) => {
  let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
  const f = join(root, p);
  if (f.startsWith(root) && existsSync(f) && statSync(f).isFile()) { s.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' }); s.end(readFileSync(f)); }
  else { s.writeHead(404); s.end(); }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const url = `http://127.0.0.1:${server.address().port}/`;

let failed = false;
const ok = (m) => console.log('ok   ' + m);
const bad = (m) => { failed = true; console.log('FAIL ' + m); };
const check = (c, m) => (c ? ok(m) : bad(m));
const IGNORED = /gc\.zgo\.at|goatcounter|fonts\.googleapis\.com|fonts\.gstatic\.com/;

const opts = { headless: true, args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] };
if (process.env.DUMAN_BROWSER) opts.executablePath = process.env.DUMAN_BROWSER;
const browser = await chromium.launch(opts);
try {
  for (const [ad, vp, mobil] of [['masaustu 1366x768', { width: 1366, height: 768 }, false], ['telefon 390x844', { width: 390, height: 844 }, true]]) {
    const ctx = await browser.newContext({ viewport: vp, isMobile: mobil, hasTouch: mobil });
    const page = await ctx.newPage(); const errs = [];
    await page.route(IGNORED, (r) => r.fulfill({ status: 200, body: '' }));
    page.on('pageerror', (e) => errs.push('pageerror: ' + e.message));
    page.on('console', (m) => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
    page.on('requestfailed', (r) => { if (!IGNORED.test(r.url())) errs.push('requestfailed: ' + r.url()); });
    await page.goto(url + '?lang=tr', { waitUntil: 'load' });
    await page.waitForFunction(() => { const b = document.getElementById('bPlay'); return b && !b.disabled; }, null, { timeout: 90000 });
    ok(`${ad}: ana ekran hazir`);
    check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${ad}: yatay tasma yok`);

    // Yenilikler penceresi
    const etiket = await page.textContent('#bNews');
    check(/v\d+\.\d+ · \S+ \d{4}/.test(etiket), `${ad}: surum etiketi gorunuyor (${etiket.trim()})`);
    await page.click('#bNews');
    check(await page.evaluate(() => !document.getElementById('infoM').classList.contains('hidden') && document.querySelectorAll('#inBody li').length >= 3), `${ad}: Yenilikler penceresi acildi`);
    await page.keyboard.press('Escape');
    check(await page.evaluate(() => document.getElementById('infoM').classList.contains('hidden')), `${ad}: Esc pencereyi kapatti`);

    // Son kosular: bos durum, sonra kayitli veri
    await page.click('#bRuns');
    check(await page.evaluate(() => document.getElementById('inBody').textContent.includes('Henüz')), `${ad}: Son kosular bos durumu`);
    await page.click('#inClose');
    await page.evaluate(() => localStorage.setItem('arena.simitfirini.runs', JSON.stringify([{ t: Date.now(), res: 'won', day: 17, lira: 5200, rep: 4.2, daily: false }, { t: Date.now(), res: 'bankrupt', day: 7, lira: -40, rep: 2.1, daily: true }])));
    await page.click('#bRuns');
    check(await page.evaluate(() => document.querySelectorAll('#inBody tbody tr').length === 2 && /2 oyun · 1 zafer/.test(document.getElementById('inBody').textContent)), `${ad}: Son kosular listesi doldu`);
    await page.click('#inClose');

    // Bozuk kayit coker mi
    await page.evaluate(() => localStorage.setItem('arena.simitfirini.runs', '{bozuk'));
    await page.click('#bRuns');
    check(await page.evaluate(() => !document.getElementById('infoM').classList.contains('hidden')), `${ad}: bozuk kayitta pencere yine acilir`);
    await page.click('#inClose');

    // Telefonda ayar/dil dugmeleri ilk ekranda
    if (mobil) check(await page.evaluate(() => { const r = document.getElementById('bSet').getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight; }), `${ad}: Ayarlar dugmesi kaydirmadan gorunuyor`);

    // Oyuna gecis: durum degisir
    await page.click('#bPlay');
    await page.waitForTimeout(2000);
    const durum = await page.evaluate(() => ({ inGame: !!(window.simitfirini && window.simitfirini.S), plan: !document.getElementById('planM').classList.contains('hidden'), baslik: document.getElementById('title').classList.contains('hidden') }));
    check(durum.baslik && durum.inGame, `${ad}: oyun basladi (ana ekran kapandi, durum var)`);
    check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${ad}: oyunda yatay tasma yok`);
    check(errs.length === 0, `${ad}: konsol/sayfa hatasi yok${errs.length ? ' -> ' + errs.slice(0, 3).join(' | ') : ''}`);
    await ctx.close();
  }
} catch (e) { bad('betik hatasi: ' + e.message); }
await browser.close(); server.close();
console.log(failed ? 'RESULT FAIL' : 'RESULT OK');
process.exit(failed ? 1 : 0);
