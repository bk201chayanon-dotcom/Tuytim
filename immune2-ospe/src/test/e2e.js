// End-to-end check of the built page in Chromium (standalone file).
const { chromium } = require('playwright');
const path = require('path');
const S = path.resolve(__dirname, '..');
const FILE = 'file://' + path.join(S, '../index.html');
const SHOTS = path.join(S, 'out/shots');
require('fs').mkdirSync(SHOTS, { recursive: true });
const SEED = JSON.parse(require('fs').readFileSync(path.join(S, '../cards.json'), 'utf8'));
const byId = Object.fromEntries(SEED.cards.map((c) => [c.id, c]));

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

// type into every part, moving on with Enter; the last Enter submits
async function answerStation(page, prefix, answers) {
  const n = await page.$$eval(`[id^="${prefix}"]`, (els) => els.length);
  for (let i = 0; i < n; i++) {
    await page.fill(`#${prefix}${i}`, answers[i] || '');
    await page.focus(`#${prefix}${i}`);
    await page.keyboard.press('Enter');
  }
  return n;
}
// the hidden study and exam screens both keep their last station, so look inside the visible one
const currentCard = (page, view = 'study') => page.getAttribute(`#view-${view} .station[data-card]`, 'data-card');
const keysOf = (id) => byId[id].parts.map((p) => p.answers[0]);
// grading saves first and then draws the next station, so wait until the old result is gone
async function gradeAndNext(page, key) {
  await page.keyboard.press(key);
  await page.waitForFunction(() => !document.querySelector('#view-study .result'));
}

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
  console.log('lab chips:', await page.$$eval('#homePanel .chip', (els) => els.map((e) => e.innerText.replace(/\s+/g, ' '))));
  await page.screenshot({ path: path.join(SHOTS, 'home-desktop.png'), fullPage: true });

  // topic 2, serology: a wrong station, then one answered from its own key
  await page.click('.slide[data-topic="dx"]');
  console.log('dx chips:', await page.$$eval('#homePanel .chip', (els) => els.map((e) => e.innerText.replace(/\s+/g, ' '))));
  await page.click('#homePanel .chip[data-cat="syph-sero"]');
  console.log('category note:', (await page.textContent('.cat-note')).trim().slice(0, 60));
  await page.click('#btnStudyAll');
  await page.waitForSelector('#studyInput0');
  let id = await currentCard(page);
  const n1 = await answerStation(page, 'studyInput', byId[id].parts.map(() => 'definitely wrong'));
  await page.waitForSelector('.result');
  console.log(`study ${id}: ${n1} parts, focus moved by Enter → ${(await page.$$('.part-result')).length || 1} part results,`,
    (await page.textContent('.result-title')).trim());
  await page.screenshot({ path: path.join(SHOTS, 'study-wrong.png'), fullPage: true });
  await gradeAndNext(page, '1');
  await page.waitForSelector('#studyInput0');
  id = await currentCard(page);
  await answerStation(page, 'studyInput', keysOf(id));
  await page.waitForSelector('.result');
  console.log(`study ${id} with its key →`, (await page.textContent('.result .result-title')).trim(),
    '| suggested:', (await page.textContent('.grade.suggested')).trim().split('\n')[0]);
  await gradeAndNext(page, 'Enter');

  // a partly right station and the per-part override
  await page.click('.tabs button[data-view="home"]');
  await page.click('.slide[data-topic="lab"]');
  await page.click('#homePanel .chip[data-cat="lab-hot"]');
  await page.click('#btnStudyAll');
  await page.waitForSelector('#studyInput0');
  id = await currentCard(page);
  const keys = keysOf(id);
  await answerStation(page, 'studyInput', [keys[0]].concat(keys.slice(1).map(() => 'not this one')));
  await page.waitForSelector('.result');
  const multiTitle = (await page.textContent('.result .result-title')).trim();
  const overrideBtns = await page.$$('[data-override]');
  if (overrideBtns.length) await overrideBtns[0].click();
  console.log(`partly right ${id}: "${multiTitle}" → after override:`, (await page.textContent('.result .result-title')).trim());
  await page.screenshot({ path: path.join(SHOTS, 'study-partial.png'), fullPage: true });

  // a station with two pictures
  await page.evaluate(() => { window.scrollTo(0, 0); });
  await page.click('.tabs button[data-view="manage"]');
  await page.fill('#manageSearch', 's-lobar');
  await page.waitForTimeout(100);

  // exam shaped like the real paper
  await page.click('.tabs button[data-view="exam"]');
  console.log('exam avail:', (await page.textContent('#exAvail')).trim());
  await page.screenshot({ path: path.join(SHOTS, 'exam-setup.png'), fullPage: true });
  await page.selectOption('#exSec', '60');
  await page.click('#btnExamStart');
  await page.waitForSelector('#examInput0');
  const order = [];
  for (let i = 0; i < 40; i++) {
    if (await page.$('.score')) break;
    const cid = await currentCard(page, 'exam');
    order.push(cid);
    if (i === 0) await page.screenshot({ path: path.join(SHOTS, 'exam-station.png'), fullPage: true });
    if ((await page.$$('.stage-multi')).length && !order.multiShot) {
      order.multiShot = true;
      await page.screenshot({ path: path.join(SHOTS, 'exam-two-pictures.png'), fullPage: true });
    }
    await answerStation(page, 'examInput', i % 3 ? keysOf(cid) : []);
    await page.waitForTimeout(40);
  }
  await page.waitForSelector('.score');
  const topics = order.map((c) => byId[c].category);
  const groups = order.map((c) => byId[c].group);
  console.log('real exam:', order.length, 'stations ·', topics.join(' '));
  const tally = topics.reduce((m, c) => Object.assign(m, { [c]: (m[c] || 0) + 1 }), {});
  console.log('  dx first then lab:', topics.slice(0, 5).every((c) => c.startsWith('syph')) && topics.slice(5).every((c) => c.startsWith('lab-')),
    '· no repeated topic:', new Set(groups).size === groups.length, '· mix:', JSON.stringify(tally));
  console.log('  score:', (await page.textContent('.score')).trim(), (await page.textContent('.panel .mono')).trim());
  await page.screenshot({ path: path.join(SHOTS, 'exam-summary.png'), fullPage: true });

  // custom exam
  await page.click('#btnExamNew');
  await page.check('input[name="exMode"][value="custom"]');
  await page.selectOption('#exTopic', 'lab');
  await page.selectOption('#exCat', 'lab-once');
  await page.selectOption('#exCount', '10');
  console.log('custom avail:', (await page.textContent('#exAvail')).trim());
  await page.click('#btnExamStart');
  await page.waitForSelector('#examInput0');
  let k = 0;
  while (!(await page.$('.score')) && k++ < 20) { await answerStation(page, 'examInput', ['x']); await page.waitForTimeout(30); }
  console.log('custom exam items:', (await page.$$('.review-item')).length);

  // manage: search, edit a seed station (parts editor), delete with in-page confirm
  await page.click('.tabs button[data-view="manage"]');
  await page.fill('#manageSearch', 'negri');
  await page.waitForTimeout(100);
  console.log('manage count:', (await page.textContent('#manageCount')).trim());
  await page.click('.item [data-act="edit"]');
  await page.waitForSelector('#editor');
  const fieldsets = await page.$$eval('.ed-part', (els) => els.length);
  await page.click('#edAddPart');
  await page.fill('#edPq2', 'ไวรัสนี้ติดต่อทางใด');
  await page.click('[data-remove="2"]');
  const afterRemove = await page.$$eval('.ed-part', (els) => els.length);
  await page.fill('#edPa1', (await page.inputValue('#edPa1')) + '\nRabid');
  await page.click('#editor button[type="submit"]');
  await page.waitForTimeout(150);
  console.log('editor parts:', fieldsets, '→ add/remove →', afterRemove, '| saved badge:', !!(await page.$('.item .badge')));
  await page.click('.item [data-act="del"]');
  await page.waitForSelector('[data-answer="yes"]');
  await page.click('[data-answer="yes"]');
  await page.waitForTimeout(100);
  console.log('after delete:', (await page.textContent('#manageCount')).trim());

  // a new two-part card
  await page.fill('#manageSearch', '');
  await page.click('#btnNewCard');
  await page.waitForSelector('#editor');
  await page.fill('#edQ', 'ชิ้นเนื้อทดสอบ');
  await page.fill('#edPq0', 'จงวินิจฉัยโรค');
  await page.fill('#edPa0', 'Test disease');
  await page.click('#edAddPart');
  await page.fill('#edPq1', 'จงบอกชื่อเชื้อ');
  await page.fill('#edPa1', 'Testococcus');
  await page.click('#editor button[type="submit"]');
  await page.waitForTimeout(150);
  await page.fill('#manageSearch', 'testococcus');
  await page.waitForTimeout(100);
  console.log('new card listed:', (await page.textContent('#manageList')).replace(/\s+/g, ' ').trim().slice(0, 90));

  // backup text
  await page.click('.tabs button[data-view="io"]');
  await page.click('#btnShowExport');
  const exported = JSON.parse(await page.inputValue('#exportText'));
  console.log('export: version', exported.version, '· progress', Object.keys(exported.progress).length,
    '· custom', exported.custom.length, exported.custom[0] && exported.custom[0].parts.length + ' parts',
    '· hidden', exported.hidden.length, '· overrides', Object.keys(exported.overrides).length);
  await page.click('#btnRestoreSeed');
  await page.click('[data-answer="yes"]');
  await page.waitForTimeout(100);

  // reload: progress and the custom card survive in IndexedDB
  await page.reload();
  await page.waitForSelector('.slide');
  const after = await page.$$eval('.slide', (els) => els.map((e) => e.querySelector('.slide-meta').innerText.replace(/\s+/g, ' ')));
  console.log('after reload:', after);
  await page.click('.tabs button[data-view="manage"]');
  await page.fill('#manageSearch', 'testococcus');
  await page.waitForTimeout(100);
  console.log('custom card after reload:', (await page.textContent('#manageCount')).trim());

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
  await p2.waitForSelector('#studyInput0');
  const cid = await currentCard(p2);
  await answerStation(p2, 'studyInput', keysOf(cid));
  await p2.waitForSelector('.result');
  await gradeAndNext(p2, '3');
  await p2.waitForTimeout(300);
  console.log('cloud writes:', await p2.evaluate(() => window.__writes), 'for', cid);
  await p2.click('.tabs button[data-view="io"]');
  await p2.click('[data-reset="lab"]');
  await p2.click('[data-answer="yes"]');
  await p2.waitForTimeout(300);
  console.log('cloud writes after reset:', await p2.evaluate(() => window.__writes.slice(-1)));

  // phone, light and dark: home, a two-picture station, exam setup
  for (const scheme of ['light', 'dark']) {
    const c = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: scheme });
    const p = await c.newPage();
    p.on('pageerror', (e) => errors.push(scheme + ' pageerror: ' + e.message));
    await p.route('**/fonts.g*/**', (r) => r.abort());
    await p.goto(FILE);
    await p.waitForSelector('.slide');
    const o1 = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    await p.screenshot({ path: path.join(SHOTS, `phone-home-${scheme}.png`), fullPage: true });
    await p.click('.slide[data-topic="dx"]');
    await p.click('#homePanel .chip[data-cat="syph-stage"]');
    await p.click('#btnStudyAll');
    await p.waitForSelector('#studyInput0');
    for (let i = 0; i < 9 && !(await p.$('.stage-multi')); i++) {
      await answerStation(p, 'studyInput', ['x']);
      await p.waitForSelector('.result');
      await gradeAndNext(p, '2');
      await p.waitForSelector('#studyInput0');
    }
    await answerStation(p, 'studyInput', ['secondary', 'tertiary', 'x']);
    await p.waitForSelector('.result');
    const o2 = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    await p.screenshot({ path: path.join(SHOTS, `phone-study-${scheme}.png`), fullPage: true });
    await p.click('.tabs button[data-view="exam"]');
    const o3 = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    await p.screenshot({ path: path.join(SHOTS, `phone-exam-${scheme}.png`), fullPage: true });
    console.log(scheme, 'horizontal overflow home/study/exam:', o1, o2, o3);
    await c.close();
  }

  console.log(errors.length ? 'ERRORS:\n' + errors.join('\n') : 'no page errors');
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
