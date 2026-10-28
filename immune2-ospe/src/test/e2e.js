// End-to-end check of the built page in Chromium (standalone file).
const { chromium } = require('playwright');
const path = require('path');
const S = path.resolve(__dirname, '..');
const FILE = 'file://' + path.join(S, '../index.html');
const SHOTS = path.join(S, 'out/shots');
require('fs').mkdirSync(SHOTS, { recursive: true });

const mockClaude = () => {
  // a stand-in for the claude.ai viewer: db + user capabilities backed by memory
  const docs = new Map(JSON.parse(sessionStorage.getItem('mockdb') || '[]'));
  const persist = () => sessionStorage.setItem('mockdb', JSON.stringify(Array.from(docs.entries())));
  window.__writes = [];
  const snap = (id, body) => ({ id, exists: body !== undefined, data: () => body, metadata: {} });
  const db = {
    collection: (p) => ({
      path: p,
      limit: () => ({ get: async () => ({ docs: Array.from(docs.entries()).filter(([k]) => k.startsWith(p + '/')).map(([k, v]) => snap(k.slice(p.length + 1), v)) }) }),
      doc: (id) => db.doc(p + '/' + id),
    }),
    doc: (p) => ({ set: async (body) => { window.__writes.push(p); docs.set(p, JSON.parse(JSON.stringify(body))); persist(); } }),
  };
  const user = { id: async () => 'u_test' };
  window.claude = { use: async (name) => (name === 'db' ? db : name === 'user' ? user : null) };
};

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 900 } });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  await page.route('**/fonts.googleapis.com/**', (r) => r.abort());
  await page.route('**/fonts.gstatic.com/**', (r) => r.abort());

  await page.goto(FILE);
  await page.waitForSelector('.slide');
  const slides = await page.$$eval('.slide', (els) => els.map((e) => e.innerText.replace(/\s+/g, ' ').trim()));
  console.log('slides:', slides);
  console.log('store note:', await page.textContent('#storeNote'));
  await page.screenshot({ path: path.join(SHOTS, 'home-desktop.png'), fullPage: true });

  // topic 2 + category chips
  await page.click('.slide[data-topic="dx"]');
  const chips = await page.$$eval('#homePanel .chip', (els) => els.map((e) => e.innerText.replace(/\s+/g, ' ')));
  console.log('dx chips:', chips);

  // study a lab-report card: pick category syph-lab and stations only
  await page.click('#homePanel .chip[data-cat="hep"]');
  await page.check('#stationsOnly');
  await page.click('#btnStudyAll');
  await page.waitForSelector('#studyInput');
  const q = await page.textContent('.question');
  const hasSlip = await page.$('.slip');
  console.log('study q:', q.trim().slice(0, 80), '| slip:', !!hasSlip, '| img:', !!(await page.$('.stage img')));
  await page.fill('#studyInput', 'definitely wrong answer');
  await page.keyboard.press('Enter');
  await page.waitForSelector('.result');
  console.log('result:', (await page.textContent('.result-title')).trim());
  await page.screenshot({ path: path.join(SHOTS, 'study-result.png'), fullPage: true });
  await page.keyboard.press('1');           // grade: forgot
  await page.waitForSelector('#studyInput');
  console.log('after grade, station:', (await page.textContent('.station-no')).trim());

  // answer one correctly via the card's own key
  const cardQ = (await page.textContent('.question')).trim();
  const key = await page.evaluate((qq) => {
    const seed = JSON.parse(document.getElementById('seed-data').textContent);
    const c = seed.cards.find((x) => qq.endsWith(x.question));
    return c ? (c.keywords ? c.answers[0] : c.answers[0]) : null;
  }, cardQ);
  await page.fill('#studyInput', key || 'x');
  await page.keyboard.press('Enter');
  await page.waitForSelector('.result');
  console.log('typed key:', key, '→', (await page.textContent('.result-title')).trim());
  await page.keyboard.press('Enter');        // suggested grade has focus
  await page.waitForTimeout(150);

  // describe card in topic 1
  await page.click('.tabs button[data-view="home"]');
  await page.click('.slide[data-topic="lab"]');
  await page.click('#homePanel .chip[data-cat="fungus"]');
  await page.uncheck('#stationsOnly');
  await page.evaluate(() => window.scrollTo(0, 0));

  // exam: 10 stations, answer the first two, quit the rest by fast timer
  await page.click('.tabs button[data-view="exam"]');
  await page.selectOption('#exTopic', 'dx');
  await page.selectOption('#exCount', '10');
  await page.selectOption('#exSec', '30');
  await page.click('#btnExamStart');
  await page.waitForSelector('#examInput');
  await page.screenshot({ path: path.join(SHOTS, 'exam-station.png'), fullPage: true });
  for (let i = 0; i < 10; i++) {
    await page.fill('#examInput', i % 2 ? 'syphilis' : 'reactive');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(60);
  }
  await page.waitForSelector('.score');
  console.log('exam score:', (await page.textContent('.score')).trim(), (await page.$$('.review-item')).length, 'items');
  await page.screenshot({ path: path.join(SHOTS, 'exam-summary.png'), fullPage: true });

  // manage: search, edit dialog, delete with in-page confirm
  await page.click('.tabs button[data-view="manage"]');
  await page.fill('#manageSearch', 'negri');
  await page.waitForTimeout(100);
  console.log('manage count:', (await page.textContent('#manageCount')).trim());
  await page.click('.item [data-act="edit"]');
  await page.waitForSelector('#editor');
  await page.click('#edCancel');
  await page.click('.item [data-act="del"]');
  await page.waitForSelector('[data-answer="yes"]');
  await page.click('[data-answer="yes"]');
  await page.waitForTimeout(100);
  console.log('after delete:', (await page.textContent('#manageCount')).trim());

  // backup text
  await page.click('.tabs button[data-view="io"]');
  await page.click('#btnShowExport');
  const exported = await page.inputValue('#exportText');
  const ex = JSON.parse(exported);
  console.log('export: progress', Object.keys(ex.progress).length, 'hidden', ex.hidden.length);
  await page.click('#btnRestoreSeed');
  await page.click('[data-answer="yes"]');
  await page.waitForTimeout(100);

  // reload: progress must survive in IndexedDB
  await page.reload();
  await page.waitForSelector('.slide');
  const after = await page.$$eval('.slide', (els) => els.map((e) => e.querySelector('.slide-meta').innerText.replace(/\s+/g, ' ')));
  console.log('after reload:', after);

  // cloud mode with a mocked viewer
  const ctx2 = await browser.newContext({ viewport: { width: 1200, height: 900 } });
  await ctx2.addInitScript(mockClaude);
  const p2 = await ctx2.newPage();
  p2.on('pageerror', (e) => errors.push('cloud pageerror: ' + e.message));
  await p2.route('**/fonts.g*/**', (r) => r.abort());
  await p2.goto(FILE);
  await p2.waitForFunction(() => document.querySelector('#storeNote .dot.cloud'));
  console.log('cloud note:', (await p2.textContent('#storeNote')).trim());
  await p2.click('#btnStudyAll');
  await p2.waitForSelector('#studyInput');
  await p2.fill('#studyInput', 'x');
  await p2.keyboard.press('Enter');
  await p2.waitForSelector('.result');
  await p2.keyboard.press('3');
  await p2.waitForTimeout(300);
  console.log('cloud writes:', await p2.evaluate(() => window.__writes));
  await p2.click('.tabs button[data-view="io"]');
  await p2.click('[data-reset="lab"]');
  await p2.click('[data-answer="yes"]');
  await p2.waitForTimeout(300);
  console.log('cloud writes after reset:', await p2.evaluate(() => window.__writes.slice(-1)));

  // phone, light and dark
  for (const scheme of ['light', 'dark']) {
    const c = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: scheme });
    const p = await c.newPage();
    p.on('pageerror', (e) => errors.push(scheme + ' pageerror: ' + e.message));
    await p.route('**/fonts.g*/**', (r) => r.abort());
    await p.goto(FILE);
    await p.waitForSelector('.slide');
    const overflow = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    await p.screenshot({ path: path.join(SHOTS, `phone-home-${scheme}.png`), fullPage: true });
    await p.click('.slide[data-topic="dx"]');
    await p.click('#homePanel .chip[data-cat="syph-lab"]');
    await p.check('#stationsOnly');
    await p.click('#btnStudyAll');
    await p.waitForSelector('#studyInput');
    const overflow2 = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    await p.screenshot({ path: path.join(SHOTS, `phone-study-${scheme}.png`), fullPage: true });
    console.log(scheme, 'horizontal overflow home/study:', overflow, overflow2);
    await c.close();
  }

  console.log(errors.length ? 'ERRORS:\n' + errors.join('\n') : 'no page errors');
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
