/* ------------------------------------------------------------------
 * OSPE lab practice — one block per course (Immune 2, Hemato II), each
 * with its own topics, categories and real-exam recipe.
 *
 * Each card is one OSPE station shaped like the old papers: one or more
 * pictures (or a lab report slip) and one or more parts ก ข ค, each with
 * its own typed or described answer.
 *
 * Seed cards and images ship inside this page, so content fixes reach
 * everyone on the next load. Only personal data is stored:
 *   progress  SM-2 state per card (claude.ai account when the page runs
 *             as an artifact, otherwise IndexedDB, otherwise memory)
 *   custom    cards the user added, overrides of seed cards, hidden seed
 *             cards, per-topic reset times (IndexedDB, exported as JSON)
 * ------------------------------------------------------------------ */
(function () {
  'use strict';

  /* ================================================================ utilities */

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const esc = (s) => (s == null ? '' : String(s)).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const now = () => Date.now();
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const DAY = 86400000;

  function uid() {
    if (window.crypto && crypto.randomUUID) return 'u-' + crypto.randomUUID();
    return 'u-' + now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  let toastTimer = null;
  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
  }

  function days(n) {
    if (n < 1) return 'วันนี้';
    if (n < 30) return n + ' วัน';
    if (n < 365) return Math.round(n / 30) + ' เดือน';
    return (n / 365).toFixed(1).replace(/\.0$/, '') + ' ปี';
  }

  /* ================================================================ seed */

  const SEED = (() => {
    try { return JSON.parse($('#seed-data').textContent); }
    catch (e) { return { topics: [], categories: [], cards: [], images: {} }; }
  })();
  const TOPICS = SEED.topics;
  const BLOCKS = SEED.blocks && SEED.blocks.length ? SEED.blocks
    : [{ id: 'main', label: '', mark: '', topics: TOPICS.map((t) => t.id), intro: '', exam: null }];
  const blockById = Object.fromEntries(BLOCKS.map((b) => [b.id, b]));
  const CATS = SEED.categories;
  const IMAGES = SEED.images || {};
  const catById = Object.fromEntries(CATS.map((c) => [c.id, c]));
  const topicById = Object.fromEntries(TOPICS.map((t) => [t.id, t]));
  const zeroResets = () => Object.fromEntries(TOPICS.map((t) => [t.id, 0]));
  const seedById = Object.fromEntries(SEED.cards.map((c) => [c.id, c]));

  const topicOf = (card) => card.topic || (catById[card.category] || {}).topic || 'lab';
  const LETTERS = ['ก', 'ข', 'ค', 'ง', 'จ', 'ฉ'];
  const MAX_PARTS = LETTERS.length;

  // cards saved before stations had parts keep answers/keywords on the card itself
  function partsOf(card) {
    if (Array.isArray(card.parts) && card.parts.length) return card.parts;
    return [{ q: '', answers: card.answers || [], keywords: card.keywords || null }];
  }
  const isDescribe = (part) => !!(part.keywords && part.keywords.length);
  // an uploaded picture replaces the seed pictures; `images` lists seed image keys
  function imagesOf(card) {
    if (card.image) return [card.image];
    const keys = Array.isArray(card.images) ? card.images : card.imageRef ? [card.imageRef] : [];
    return keys.map((k) => IMAGES[k]).filter(Boolean);
  }
  const isStation = (card) => imagesOf(card).length > 0 || !!card.report;
  const titleOf = (card) => card.question || partsOf(card).map((p) => p.q).filter(Boolean).join(' · ');
  const shortYear = (y) => String(y).slice(-2);

  /* ================================================================ answer checking
   * Typed answers are compared word by word. Each word may carry a small typo
   * (none for words of 3 letters or fewer, one for 4–7 letters, about 20% for
   * longer words), and two words typed together or one word split in two still
   * count. The answer must have the same words — no extra or missing ones — so
   * "syphilis unlikely" never passes for "syphilis". Guards on top:
   *   numbers must match exactly (1:8 is not 1:16, 4-fold is not 2-fold)
   *   confusable words never pass for each other (anti-HBs/anti-HBc, IgM/IgG,
   *   reactive/nonreactive, TPHA/TPPA, adequate/inadequate, Langhans/Langerhans …)
   * Describe answers: the slide's description is split into points; each point
   * has several accepted phrasings and is searched for anywhere in the answer. */

  const CONFUSABLE = [
    ['reactive', 'nonreactive'], ['positive', 'negative'], ['treponemal', 'nontreponemal'],
    ['treated', 'untreated'], ['igm', 'igg'], ['hbsag', 'hbeag', 'hbcag'],
    ['acute', 'chronic'], ['early', 'late'],
    ['primary', 'secondary', 'tertiary'], ['septate', 'nonseptate', 'aseptate'],
    ['intranuclear', 'intracytoplasmic'], ['endophytic', 'exophytic'],
    ['hpv', 'hbv', 'hcv', 'hsv', 'hiv', 'cmv', 'ebv', 'hbs', 'hbc', 'hbe'],
    ['antihbs', 'antihbc', 'antihbe', 'antihcv', 'antihiv'], ['langhans', 'langhan', 'langerhans', 'langerhan'],
    ['hyperkeratosis', 'parakeratosis'], ['rna', 'dna'], ['ag', 'ab'], ['tpha', 'tppa'],
    ['hyperchromatic', 'hypochromatic'], ['eosinophilic', 'basophilic'], ['adequate', 'inadequate'],
    ['qualitative', 'quantitative'], ['latent', 'late'], ['occult', 'acute'],
    ['maduromycosis', 'talaromycosis'], ['mycetoma', 'eumycetoma', 'actinomycetoma', 'myeloma'],
    ['aspergilloma', 'aspergillosis'], ['brain', 'grain'],
    ['trichinellosis', 'trichinosis', 'trichiniasis', 'trichuriasis'], ['trichinella', 'trichuris'],
    ['lymphoblastic', 'lymphocytic', 'nonlymphocytic'], ['lymphoid', 'myeloid'], ['all', 'anll', 'aml', 'cml', 'cll', 'sll'],
    ['lymphoblast', 'lymphocyte', 'myeloblast', 'myelocyte'], ['lymphoblasts', 'lymphocytes', 'myeloblasts', 'myelocytes'],
    ['centrocyte', 'centroblast'], ['centrocytes', 'centroblasts'], ['cleaved', 'noncleaved'],
    ['hodgkin', 'nonhodgkin'], ['hodgkins', 'nonhodgkins'], ['mantle', 'marginal'],
    ['hyperplasia', 'hypoplasia', 'aplasia'], ['hypercellular', 'hypocellular', 'normocellular'],
    ['regular', 'irregular'], ['interfollicular', 'intrafollicular'],
  ];
  const GROUP = new Map();
  CONFUSABLE.forEach((g, i) => g.forEach((w) => GROUP.set(w, i)));

  function norm(s) {
    let t = (s == null ? '' : String(s)).normalize('NFC').toLowerCase();
    t = t.replace(/[‘’`´"“”']/g, '');
    t = t.replace(/\.(?!\d)/g, ' ');
    t = t.replace(/[-–—_,;()[\]{}!?]/g, ' ');
    t = t.replace(/([a-z\u0E00-\u0E7F])\/(?=[a-z\u0E00-\u0E7F])/g, '$1 ');
    t = t.replace(/\bnon\s+/g, 'non').replace(/\banti\s+/g, 'anti');
    t = t.replace(/\bhb\s*([sec])\s*ag\b/g, 'hb$1ag').replace(/\bhb\s*([sec])\s*ab\b/g, 'antihb$1');
    t = t.replace(/\bantitreponemal\b/g, 'treponemal').replace(/\bspp?\b/g, ' ');
    return t.replace(/\s+/g, ' ').trim();
  }
  const words = (s) => (s ? s.split(' ') : []);
  const nums = (s) => (s.match(/\d+/g) || []).join(' ');
  const wordTol = (len) => (len <= 3 ? 0 : len <= 7 ? 1 : Math.min(3, Math.round(len * 0.2)));

  function conflicts(inputWords, answerWords) {
    for (const g of CONFUSABLE) {
      const a = answerWords.filter((w) => g.includes(w));
      if (!a.length) continue;
      const i = inputWords.filter((w) => g.includes(w));
      if (i.length && !a.some((w) => i.includes(w))) return true;
    }
    return false;
  }

  const confused = (a, b) => a !== b && GROUP.has(a) && GROUP.get(a) === GROUP.get(b);

  function wordOk(a, b) {
    if (a === b) return true;
    if (confused(a, b)) return false;
    return nums(a) === nums(b) && osa(a, b) <= wordTol(b.length);
  }

  const joinOk = (a, b) => a === b || (!confused(a, b) && nums(a) === nums(b) && osa(a, b) <= 1);

  // same words in the same order; a pair of words may stand for one word (a missing or extra space),
  // but a one-letter word is never absorbed that way (toxin A is not toxin A and B)
  const joinable = (a, b) => a.length > 1 && b.length > 1;
  function wordsMatch(iw, aw) {
    const tried = new Set();
    const go = (i, j) => {
      if (i === iw.length || j === aw.length) return i === iw.length && j === aw.length;
      const key = i + ',' + j;
      if (tried.has(key)) return false;
      tried.add(key);
      if (wordOk(iw[i], aw[j]) && go(i + 1, j + 1)) return true;
      if (i + 1 < iw.length && joinable(iw[i], iw[i + 1]) && joinOk(iw[i] + iw[i + 1], aw[j]) && go(i + 2, j + 1)) return true;
      if (j + 1 < aw.length && joinable(aw[j], aw[j + 1]) && joinOk(iw[i], aw[j] + aw[j + 1]) && go(i + 1, j + 2)) return true;
      return false;
    };
    return go(0, 0);
  }

  // optimal string alignment distance (a swapped pair of letters costs 1)
  function osa(a, b) {
    const m = a.length, n = b.length;
    if (!m) return n;
    if (!n) return m;
    const d = [];
    for (let i = 0; i <= m; i++) { d.push(new Array(n + 1).fill(0)); d[i][0] = i; }
    for (let j = 0; j <= n; j++) d[0][j] = j;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        let v = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) v = Math.min(v, d[i - 2][j - 2] + 1);
        d[i][j] = v;
      }
    }
    return d[m][n];
  }

  // character alignment for showing where the typed answer differs
  function align(a, b) {
    const m = a.length, n = b.length;
    const dp = [];
    for (let i = 0; i <= m; i++) { dp.push(new Array(n + 1).fill(0)); dp[i][0] = i; }
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
    const ops = [];
    let i = m, j = n;
    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && a[i - 1] === b[j - 1] && dp[i][j] === dp[i - 1][j - 1]) { ops.push(['eq', a[i - 1], b[j - 1]]); i--; j--; }
      else if (i > 0 && j > 0 && dp[i][j] === dp[i - 1][j - 1] + 1) { ops.push(['sub', a[i - 1], b[j - 1]]); i--; j--; }
      else if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) { ops.push(['extra', a[i - 1], '']); i--; }
      else { ops.push(['miss', '', b[j - 1]]); j--; }
    }
    return ops.reverse();
  }

  function gradeTyped(answers, input) {
    const ni = norm(input);
    if (!ni) return { kind: 'typed', state: 'empty' };
    const iw = words(ni);
    let best = null, bestOk = null;
    for (const raw of answers) {
      const na = norm(raw);
      if (!na) continue;
      if (na === ni) return { kind: 'typed', state: 'exact', target: raw, dist: 0 };
      const aw = words(na);
      const cand = { raw, na, dist: osa(ni, na) };
      if (wordsMatch(iw, aw) && !conflicts(iw, aw) && (!bestOk || cand.dist < bestOk.dist)) bestOk = cand;
      if (!best || cand.dist < best.dist) best = cand;
    }
    if (bestOk) return { kind: 'typed', state: 'typo', target: bestOk.raw, dist: bestOk.dist };
    return { kind: 'typed', state: 'wrong', target: best ? best.raw : answers[0], dist: best ? best.dist : Infinity };
  }

  function phraseFound(iw, ni, phrase) {
    const np = norm(phrase);
    if (!np) return false;
    if (/[\u0E00-\u0E7F]/.test(np)) return ni.includes(np);
    if ((' ' + ni + ' ').includes(' ' + np + ' ')) return true;
    const pw = words(np);
    for (let w = Math.max(1, pw.length - 1); w <= pw.length + 1; w++) {
      for (let i = 0; i + w <= iw.length; i++) {
        const win = iw.slice(i, i + w);
        if (wordsMatch(win, pw) && !conflicts(win, pw)) return true;
      }
    }
    return false;
  }

  function gradeDescribe(concepts, input) {
    const ni = norm(input), iw = words(ni);
    const points = concepts.map((v) => {
      const list = Array.isArray(v) ? v : [v];
      return { label: list[0], found: !!ni && list.some((p) => phraseFound(iw, ni, p)) };
    });
    const hit = points.filter((p) => p.found).length;
    const state = !ni ? 'empty' : hit === points.length ? 'exact' : hit ? 'partial' : 'wrong';
    return { kind: 'describe', state, points, hit, total: points.length };
  }

  const gradePart = (part, input) => (isDescribe(part)
    ? gradeDescribe(part.keywords, input) : gradeTyped(part.answers, input));
  const gradeCard = (card, inputs) => partsOf(card).map((p, i) => gradePart(p, inputs[i] || ''));
  const passed = (g) => g.state === 'exact' || g.state === 'typo';

  /* ================================================================ spaced repetition (SM-2)
   * quality: 0 forgot · 3 hard · 4 good · 5 easy. Easy and hard change the first
   * two intervals too, so the four buttons always preview different gaps. */

  const blankSrs = () => ({ ef: 2.5, interval: 0, reps: 0, lapses: 0, due: 0, last: null, seen: 0, t: 0 });

  function sm2(prev, q) {
    const s = Object.assign(blankSrs(), prev || {});
    let { ef, interval, reps, lapses } = s;
    if (q < 3) {
      reps = 0;
      interval = 1;
      lapses += 1;
    } else {
      reps += 1;
      if (reps === 1) interval = q === 5 ? 3 : 1;
      else if (reps === 2) interval = q === 3 ? 3 : q === 4 ? 6 : 8;
      else interval = Math.max(interval + 1, Math.round(interval * (q === 3 ? 1.2 : q === 4 ? ef : ef * 1.3)));
      ef = Math.max(1.3, ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
    }
    const t = now();
    return { ef: Math.round(ef * 1000) / 1000, interval, reps, lapses, due: t + interval * DAY, last: q, seen: s.seen + 1, t };
  }

  const srsOf = (card) => state.progress[card.id] || null;
  const isNew = (card) => { const s = srsOf(card); return !s || !s.seen; };
  const isDue = (card) => { const s = srsOf(card); return !s || !s.seen || s.due <= now(); };
  const isMastered = (card) => { const s = srsOf(card); return !!(s && s.interval >= 21); };

  /* ================================================================ app state */

  const state = {
    view: 'home',
    block: BLOCKS[0].id,
    topic: BLOCKS[0].topics[0],  // a topic of the current block, or 'all' for the whole block
    category: 'all',
    blockPrefs: {},          // { blockId: { topic, category } } — restored when switching back
    cards: [],
    progress: {},
    custom: [],
    overrides: {},
    hidden: [],
    resetAt: zeroResets(),
    study: null,             // { queue, index, reviewed, again: {id: n}, mode, answered: {grades, overridden, inputs} }
    exam: null,              // { queue, index, results, seconds, endsAt, timer, running, finished }
    manage: { q: '', topic: 'all', category: 'all', limit: 60 },
  };

  function buildCards() {
    const hidden = new Set(state.hidden);
    const seed = SEED.cards.filter((c) => !hidden.has(c.id)).map((c) => {
      const o = state.overrides[c.id];
      const card = Object.assign({}, c, o || {}, { custom: false, edited: !!o });
      card.topic = topicOf(card);
      return card;
    });
    const custom = state.custom.map((c) => Object.assign({}, c, { custom: true, topic: c.topic || topicOf(c) }));
    state.cards = seed.concat(custom);
  }

  const cardById = (id) => state.cards.find((c) => c.id === id);

  const curBlock = () => blockById[state.block] || BLOCKS[0];
  const blockTopics = () => curBlock().topics.map((id) => topicById[id]).filter(Boolean);
  const slotOf = (topicId) => curBlock().topics.indexOf(topicId) + 1;

  // 'all' means every topic of the current block
  function pool(topic, category) {
    const topics = topic === 'all' ? curBlock().topics : [topic];
    return state.cards.filter((c) => topics.includes(c.topic) && (category === 'all' || c.category === category));
  }

  /* ================================================================ storage
   * Local: IndexedDB stores progress, custom and meta. Cloud: the viewer's own
   * private subtree data/users/<id>/ in the artifact's db — one document per card
   * plus _meta for reset times. Every review is written to both; on load the
   * newer copy of each card wins. */

  const store = { mode: 'memory', local: null, cloud: null, cloudNote: '' };

  function memoryBackend() {
    const data = { progress: new Map(), custom: new Map(), meta: new Map() };
    return {
      all: async (s) => Array.from(data[s].values()),
      put: async (s, obj) => { data[s].set(obj.id, obj); },
      putMany: async (s, arr) => { arr.forEach((o) => data[s].set(o.id, o)); },
      del: async (s, id) => { data[s].delete(id); },
      clear: async (s) => { data[s].clear(); },
    };
  }

  function idbBackend() {
    return new Promise((resolve, reject) => {
      let req;
      try { req = indexedDB.open('ospe-immune2', 1); } catch (e) { reject(e); return; }
      req.onupgradeneeded = () => {
        const db = req.result;
        ['progress', 'custom', 'meta'].forEach((n) => {
          if (!db.objectStoreNames.contains(n)) db.createObjectStore(n, { keyPath: 'id' });
        });
      };
      req.onerror = () => reject(req.error);
      req.onblocked = () => reject(new Error('blocked'));
      req.onsuccess = () => {
        const db = req.result;
        const tx = (s, fn) => new Promise((res, rej) => {
          const t = db.transaction(s, 'readwrite');
          fn(t.objectStore(s));
          t.oncomplete = () => res();
          t.onerror = () => rej(t.error);
          t.onabort = () => rej(t.error);
        });
        resolve({
          all: (s) => new Promise((res, rej) => {
            const r = db.transaction(s, 'readonly').objectStore(s).getAll();
            r.onsuccess = () => res(r.result || []);
            r.onerror = () => rej(r.error);
          }),
          put: (s, obj) => tx(s, (os) => os.put(obj)),
          putMany: (s, arr) => tx(s, (os) => arr.forEach((o) => os.put(o))),
          del: (s, id) => tx(s, (os) => os.delete(id)),
          clear: (s) => tx(s, (os) => os.clear()),
        });
      };
    });
  }

  async function localSafe(fn) {
    try { return await fn(store.local); } catch (e) { console.warn('local storage', e); return undefined; }
  }

  async function saveMeta(id, value) { await localSafe((l) => l.put('meta', { id, value })); }

  async function cloudConnect() {
    if (!window.claude || typeof window.claude.use !== 'function') return null;
    try {
      const [db, user] = await Promise.all([window.claude.use('db'), window.claude.use('user')]);
      if (!db || !user) return null;
      const id = await user.id();
      if (!id) return null;
      const base = 'data/users/' + id;
      return { col: db.collection(base), meta: db.doc(base + '/_meta') };
    } catch (e) {
      return null;
    }
  }

  const cloudQueue = new Map();
  const cloudBusy = new Set();

  function cloudPut(id, body) {
    if (!store.cloud) return;
    cloudQueue.set(id, body);
    if (!cloudBusy.has(id)) pumpCloud(id);
  }

  async function pumpCloud(id) {
    cloudBusy.add(id);
    try {
      while (store.cloud && cloudQueue.has(id)) {
        const body = cloudQueue.get(id);
        cloudQueue.delete(id);
        await cloudWrite(id, body);
      }
    } finally {
      cloudBusy.delete(id);
    }
  }

  async function cloudWrite(id, body) {
    for (let attempt = 0; attempt < 3; attempt++) {
      if (!store.cloud) return;
      const ref = id === '_meta' ? store.cloud.meta : store.cloud.col.doc(id);
      try {
        await ref.set(body);
        return;
      } catch (e) {
        const code = e && e.code;
        if ((code === 'unavailable' || code === 'resource_exhausted') && attempt < 2) {
          await sleep(700 + Math.random() * 1500 * (attempt + 1));
          continue;
        }
        cloudOff(code === 'quota_exceeded'
          ? 'พื้นที่บนบัญชีเต็ม ความคืบหน้าจะบันทึกในเบราว์เซอร์นี้แทน'
          : 'บันทึกลงบัญชีไม่ได้ (เช่น เปิดด้วยสิทธิ์ดูอย่างเดียว) ความคืบหน้าจะบันทึกในเบราว์เซอร์นี้แทน');
        return;
      }
    }
  }

  function cloudOff(note) {
    if (!store.cloud) return;
    store.cloud = null;
    store.mode = store.local ? 'local' : 'memory';
    store.cloudNote = note;
    cloudQueue.clear();
    renderStoreNote();
    toast(note);
  }

  function liveEntry(id, rec) {
    if (!rec || !rec.t) return false;
    const card = cardById(id) || seedById[id];
    const topic = card ? topicOf(card) : null;
    return !topic || rec.t > (state.resetAt[topic] || 0);
  }

  async function loadLocal() {
    try {
      store.local = await Promise.race([idbBackend(), sleep(4000).then(() => { throw new Error('IndexedDB timeout'); })]);
      store.mode = 'local';
    } catch (e) {
      store.local = memoryBackend();
      store.mode = 'memory';
    }
    const [progress, custom, meta] = await Promise.all([
      localSafe((l) => l.all('progress')), localSafe((l) => l.all('custom')), localSafe((l) => l.all('meta')),
    ]);
    const m = Object.fromEntries((meta || []).map((r) => [r.id, r.value]));
    state.overrides = m.overrides || {};
    state.hidden = m.hidden || [];
    state.resetAt = Object.assign(zeroResets(), m.resetAt || {});
    const prefs = m.prefs || {};
    if (prefs.block && blockById[prefs.block]) state.block = prefs.block;
    if (prefs.blocks && typeof prefs.blocks === 'object') state.blockPrefs = prefs.blocks;
    state.topic = prefs.topic === 'all' || curBlock().topics.includes(prefs.topic) ? prefs.topic : curBlock().topics[0];
    if (prefs.category && (prefs.category === 'all' || catById[prefs.category])) state.category = prefs.category;
    state.custom = custom || [];
    buildCards();
    state.progress = {};
    (progress || []).forEach((r) => { if (liveEntry(r.id, r)) state.progress[r.id] = stripId(r); });
  }

  const stripId = (r) => { const o = Object.assign({}, r); delete o.id; return o; };

  async function connectCloud() {
    const cloud = await cloudConnect();
    if (!cloud) { renderStoreNote(); return; }
    let snap;
    try {
      snap = await cloud.col.limit(1000).get();
    } catch (e) {
      store.cloudNote = 'เชื่อมต่อบัญชีไม่สำเร็จ ความคืบหน้าบันทึกในเบราว์เซอร์นี้';
      renderStoreNote();
      return;
    }
    store.cloud = cloud;
    store.mode = 'cloud';
    const remote = {};
    snap.docs.forEach((d) => {
      const body = d.data() || {};
      if (d.id === '_meta') {
        const r = body.resetAt || {};
        Object.keys(r).forEach((k) => { state.resetAt[k] = Math.max(state.resetAt[k] || 0, Number(r[k]) || 0); });
      } else {
        remote[d.id] = body;
      }
    });
    await saveMeta('resetAt', state.resetAt);
    const toLocal = [];
    Object.keys(remote).forEach((id) => {
      const r = remote[id];
      if (!liveEntry(id, r)) return;
      const l = state.progress[id];
      if (!l || (r.t || 0) > (l.t || 0)) {
        state.progress[id] = Object.assign(blankSrs(), r);
        toLocal.push(Object.assign({ id }, state.progress[id]));
      }
    });
    Object.keys(state.progress).forEach((id) => {
      if (!liveEntry(id, state.progress[id])) { delete state.progress[id]; return; }
      const r = remote[id];
      if (!r || (state.progress[id].t || 0) > (r.t || 0)) cloudPut(id, Object.assign({}, state.progress[id]));
    });
    if (toLocal.length) await localSafe((l) => l.putMany('progress', toLocal));
    renderStoreNote();
    if (state.view === 'home') renderHome();
  }

  async function saveProgress(card, srs) {
    state.progress[card.id] = srs;
    await localSafe((l) => l.put('progress', Object.assign({ id: card.id }, srs)));
    cloudPut(card.id, Object.assign({}, srs));
  }

  function savePrefs() {
    state.blockPrefs[state.block] = { topic: state.topic, category: state.category };
    saveMeta('prefs', { block: state.block, topic: state.topic, category: state.category, blocks: state.blockPrefs });
  }

  function renderStoreNote() {
    const el = $('#storeNote');
    let dot = 'none', text;
    if (store.mode === 'cloud') {
      dot = 'cloud';
      text = 'ความคืบหน้าบันทึกในบัญชี claude.ai ของคุณ เปิดจากเครื่องไหนก็ทบทวนต่อได้';
    } else if (store.mode === 'local') {
      dot = 'local';
      text = (store.cloudNote ? store.cloudNote + ' — ' : '') + 'ความคืบหน้าบันทึกในเบราว์เซอร์เครื่องนี้ ควรบันทึกไฟล์สำรองเป็นระยะ';
    } else {
      text = 'เบราว์เซอร์นี้ไม่ยอมให้เก็บข้อมูล ความคืบหน้าจะหายเมื่อปิดหน้า — บันทึกไฟล์สำรองก่อนปิด';
    }
    el.innerHTML = `<span class="dot ${dot}"></span><span>${esc(text)}</span>`;
  }

  /* ================================================================ dialogs, lightbox */

  function ask({ title, body, ok = 'ยืนยัน', cancel = 'ยกเลิก', danger = false }) {
    return new Promise((resolve) => {
      const layer = $('#layer');
      layer.innerHTML = `
        <div class="overlay" data-backdrop>
          <div class="dialog narrow" role="dialog" aria-modal="true" aria-labelledby="askTitle">
            <h2 id="askTitle">${esc(title)}</h2>
            ${body ? `<p class="muted" style="margin:0">${esc(body)}</p>` : ''}
            <div class="dialog-foot">
              <button type="button" class="btn" data-answer="no">${esc(cancel)}</button>
              <button type="button" class="btn ${danger ? 'btn-danger' : 'btn-primary'}" data-answer="yes">${esc(ok)}</button>
            </div>
          </div>
        </div>`;
      const overlay = $('.overlay', layer);
      const finish = (v) => {
        document.removeEventListener('keydown', onKey, true);
        layer.innerHTML = '';
        resolve(v);
      };
      const onKey = (e) => { if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); finish(false); } };
      document.addEventListener('keydown', onKey, true);
      overlay.addEventListener('click', (e) => {
        const b = e.target.closest('[data-answer]');
        if (b) finish(b.dataset.answer === 'yes');
        else if (e.target === overlay) finish(false);
      });
      $('[data-answer="yes"]', layer).focus();
    });
  }

  function openLightbox(src) {
    const layer = $('#layer');
    layer.innerHTML = `
      <div class="lightbox fit" id="lightbox" role="dialog" aria-modal="true" aria-label="ภาพขยาย">
        <img src="${src}" alt="ภาพขยาย">
      </div>
      <div class="lightbox-bar">
        <button type="button" id="lbToggle">ขนาดจริง</button>
        <button type="button" id="lbClose">ปิด</button>
      </div>`;
    const lb = $('#lightbox');
    const close = () => { document.removeEventListener('keydown', onKey, true); layer.innerHTML = ''; };
    const onKey = (e) => { if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); } };
    document.addEventListener('keydown', onKey, true);
    $('#lbClose').addEventListener('click', close);
    $('#lbToggle').addEventListener('click', () => {
      const fit = lb.classList.toggle('fit');
      $('#lbToggle').textContent = fit ? 'ขนาดจริง' : 'พอดีจอ';
    });
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
    $('#lbClose').focus();
  }

  document.addEventListener('click', (e) => {
    const img = e.target.closest('img[data-zoom]');
    if (img) openLightbox(img.getAttribute('src'));
  });

  /* ================================================================ navigation */

  function show(view) {
    state.view = view;
    $$('[data-view-panel]').forEach((p) => { p.hidden = p.dataset.viewPanel !== view; });
    $$('.tabs button').forEach((b) => {
      if (b.dataset.view === view) b.setAttribute('aria-current', 'page');
      else b.removeAttribute('aria-current');
    });
    if (view === 'home') renderHome();
    else if (view === 'study') renderStudy();
    else if (view === 'exam') renderExam();
    else if (view === 'manage') renderManage();
    else if (view === 'io') renderIO();
    window.scrollTo(0, 0);
  }

  $$('.tabs button').forEach((b) => b.addEventListener('click', () => show(b.dataset.view)));

  /* ================================================================ blocks */

  function renderBlockChrome() {
    const b = curBlock();
    $('#brandMark').textContent = b.mark || 'OSPE';
    $('#brandSub').textContent = blockTopics().map((t) => t.short).join(' · ');
    const sw = $('#blockSwitch');
    sw.hidden = BLOCKS.length < 2;
    sw.innerHTML = BLOCKS.map((x) => `<button type="button" data-block="${esc(x.id)}" aria-pressed="${x.id === b.id}">${esc(x.label)}</button>`).join('');
  }

  // study queues, exam results and manage filters belong to one block, so a switch starts them over
  function setBlock(id) {
    if (!blockById[id] || id === state.block) return;
    if (state.exam && state.exam.running) { toast('จบหรือออกจากการจำลองสอบก่อน แล้วค่อยเปลี่ยนบล็อก'); return; }
    state.blockPrefs[state.block] = { topic: state.topic, category: state.category };
    state.block = id;
    const p = state.blockPrefs[id] || {};
    state.topic = p.topic === 'all' || curBlock().topics.includes(p.topic) ? p.topic : curBlock().topics[0];
    state.category = p.category && catsFor(state.topic).some((c) => c.id === p.category) ? p.category : 'all';
    state.study = null;
    state.exam = null;
    state.manage = { q: '', topic: 'all', category: 'all', limit: 60 };
    savePrefs();
    renderBlockChrome();
    show(state.view === 'study' ? 'home' : state.view);
  }

  $('#blockSwitch').addEventListener('click', (e) => {
    const b = e.target.closest('[data-block]');
    if (b) setBlock(b.dataset.block);
  });

  /* ================================================================ home */

  function countLine(cards) {
    return {
      total: cards.length,
      due: cards.filter((c) => !isNew(c) && isDue(c)).length,
      fresh: cards.filter(isNew).length,
      mastered: cards.filter(isMastered).length,
    };
  }

  function catsFor(topic) { return CATS.filter((c) => (topic === 'all' ? curBlock().topics.includes(c.topic) : c.topic === topic)); }

  function renderHome() {
    const both = state.topic === 'all';
    $('#bothTopics').checked = both;
    $('#homeTitle').textContent = 'ติว Lab OSPE — ' + curBlock().label;
    $('#homeIntro').textContent = curBlock().intro + ' ทำเป็นสถานีแบบ ก/ข เหมือนข้อสอบจริง พิมพ์คำตอบเอง '
      + 'ระบบตรวจตัวสะกดแบบยืดหยุ่น และจัดคิวทบทวนแบบ SM-2 ให้อัตโนมัติ';
    $('#topicSlides').innerHTML = blockTopics().map((t) => {
      const n = countLine(pool(t.id, 'all'));
      const pressed = both || state.topic === t.id;
      return `
        <button type="button" class="slide" data-topic="${t.id}" data-slot="${slotOf(t.id)}" aria-pressed="${pressed}">
          <span class="slide-label">
            <span class="lec">${esc(t.tag)}</span>
            <span class="count">${n.total}<small>สถานี</small></span>
          </span>
          <span class="slide-glass">
            <h2>${esc(t.label)}</h2>
            <p>${esc(t.sub)}</p>
            <span class="slide-meta">
              <span>ถึงกำหนด <b>${n.due}</b></span>
              <span>ยังไม่เคยทำ <b>${n.fresh}</b></span>
              <span>จำได้แม่น <b>${n.mastered}</b></span>
            </span>
            <span class="small muted">${esc(t.by)}</span>
          </span>
          <span class="slide-check" aria-hidden="true">${pressed ? '✓' : ''}</span>
        </button>`;
    }).join('');

    const cats = catsFor(state.topic);
    if (state.category !== 'all' && !cats.some((c) => c.id === state.category)) state.category = 'all';
    const current = pool(state.topic, state.category);
    const n = countLine(current);
    const dueNow = current.filter(isDue).length;
    const topicName = both ? 'ทุกเรื่องใน ' + curBlock().label : topicById[state.topic].tag + ' · ' + topicById[state.topic].short;
    const cat = catById[state.category];

    $('#homePanel').innerHTML = `
      <h3>${esc(topicName)}${cat ? ' · ' + esc(cat.label) : ''}</h3>
      <div class="stats">
        <div class="stat"><div class="n">${n.total}</div><div class="l">สถานีในชุดนี้</div></div>
        <div class="stat"><div class="n">${n.due}</div><div class="l">ถึงกำหนดทบทวน</div></div>
        <div class="stat"><div class="n">${n.fresh}</div><div class="l">ยังไม่เคยทำ</div></div>
        <div class="stat"><div class="n">${n.mastered}</div><div class="l">จำได้แม่น (≥ 21 วัน)</div></div>
      </div>
      <div class="chips" role="group" aria-label="หมวด">
        <button type="button" class="chip" data-cat="all" aria-pressed="${state.category === 'all'}">ทุกหมวด<span class="k">${pool(state.topic, 'all').length}</span></button>
        ${cats.map((c) => `<button type="button" class="chip ${c.optional ? 'optional' : ''}" data-cat="${esc(c.id)}" aria-pressed="${state.category === c.id}">${esc(c.label)}<span class="k">${pool(state.topic, c.id).length}</span></button>`).join('')}
      </div>
      ${cat && cat.note ? `<p class="small muted cat-note">${esc(cat.note)}</p>` : ''}
      <div class="actions">
        <button type="button" class="btn btn-primary" id="btnStudyDue" ${dueNow ? '' : 'disabled'}>เริ่มทบทวน (${dueNow} สถานี)</button>
        <button type="button" class="btn" id="btnStudyAll" ${current.length ? '' : 'disabled'}>ทบทวนทั้งหมดในชุดนี้</button>
        <button type="button" class="btn" id="btnGoExam">จำลองสอบ</button>
      </div>`;

    $$('.slide', $('#topicSlides')).forEach((b) => b.addEventListener('click', () => {
      state.topic = b.dataset.topic;
      state.category = 'all';
      savePrefs();
      renderHome();
    }));
    $$('.chip', $('#homePanel')).forEach((b) => b.addEventListener('click', () => {
      state.category = b.dataset.cat;
      savePrefs();
      renderHome();
    }));
    $('#btnStudyDue').addEventListener('click', () => startStudy('due'));
    $('#btnStudyAll').addEventListener('click', () => startStudy('all'));
    $('#btnGoExam').addEventListener('click', () => { state.exam = state.exam && state.exam.running ? state.exam : null; show('exam'); });
  }

  $('#bothTopics').addEventListener('change', (e) => {
    state.topic = e.target.checked ? 'all' : curBlock().topics[0];
    state.category = 'all';
    savePrefs();
    renderHome();
  });

  /* ================================================================ shared station rendering */

  function slipHTML(report) {
    const rows = (report.rows || []).map((r) => `<tr><td>${esc(r[0])}</td><td class="res">${esc(r[1])}</td></tr>`).join('');
    return `
      <div class="slip-wrap">
        <div class="slip">
          <div class="slip-head"><b>ใบรายงานผลตรวจ</b><span>${esc(report.title || 'Laboratory')}</span></div>
          ${report.note ? `<div class="slip-note">${esc(report.note)}</div>` : ''}
          <table><thead><tr><th>การตรวจ</th><th>ผล</th></tr></thead><tbody>${rows}</tbody></table>
        </div>
      </div>`;
  }

  function mediaHTML(card) {
    const imgs = imagesOf(card);
    let html = '';
    if (imgs.length === 1) {
      html = `<div class="stage"><img src="${imgs[0]}" alt="ภาพประกอบโจทย์" data-zoom><span class="zoom-hint">แตะเพื่อขยาย</span></div>`;
    } else if (imgs.length > 1) {
      html = `<div class="stage stage-multi">${imgs.map((src, i) => `
        <figure><img src="${src}" alt="ภาพ ${LETTERS[i]}" data-zoom><figcaption>ภาพ ${LETTERS[i]}</figcaption></figure>`).join('')}
        <span class="zoom-hint">แตะเพื่อขยาย</span></div>`;
    }
    if (card.report) html += slipHTML(card.report);
    return html;
  }

  // which old papers asked this topic, and whether this very picture was used
  function yearsHTML(card) {
    const cat = catById[card.category];
    if (card.years && card.years.length) {
      const pic = card.seen ? ` · ภาพนี้ปี ${[].concat(card.seen).map(shortYear).join(', ')}` : cat && cat.optional ? ' · ภาพหรือคำถามใหม่' : '';
      return `<span class="years">ข้อสอบเก่า ${card.years.map(shortYear).join(' · ')}${pic ? `<b>${pic}</b>` : ''}</span>`;
    }
    return cat && cat.optional ? '<span class="years none">ยังไม่เคยออกสอบ</span>' : '';
  }

  function tagHTML(card, right) {
    const t = topicById[card.topic] || {};
    return `
      <div class="station-tag">
        <span class="tag-left"><span class="tag-topic" data-slot="${slotOf(card.topic)}">${esc(t.tag || '')} · ${esc(t.short || '')}</span>${yearsHTML(card)}</span>
        <span class="mono">${right}</span>
      </div>`;
  }

  function stemHTML(card) {
    const kind = isStation(card) ? '' : '<span class="kind k-text">ความรู้</span>';
    return card.question || kind ? `<p class="question">${kind}${esc(card.question || '')}</p>` : '';
  }

  function fieldHTML(part, id, i, last) {
    const common = `id="${id}" aria-label="คำตอบข้อ ${LETTERS[i]}" autocomplete="off" spellcheck="false" enterkeyhint="${last ? 'done' : 'next'}"`;
    if (isDescribe(part)) return `<textarea ${common} rows="2" placeholder="พิมพ์คำบรรยายเป็นภาษาอังกฤษ…"></textarea>`;
    return `<input type="text" ${common} autocapitalize="off" placeholder="พิมพ์คำตอบ…">`;
  }

  // every part gets its own field; Enter moves to the next part and submits from the last one
  function stationFormHTML(card, formId, prefix, submitLabel) {
    const parts = partsOf(card);
    const multi = parts.length > 1;
    const rows = parts.map((p, i) => {
      const head = (multi ? `<span class="pl">${LETTERS[i]}.</span>` : '')
        + (isDescribe(p) ? '<span class="kind k-describe">บรรยาย</span>' : '') + esc(p.q || '');
      const label = multi || p.q || isDescribe(p) ? `<label class="part-q" for="${prefix}${i}">${head}</label>` : '';
      return `<div class="part">${label}${fieldHTML(p, prefix + i, i, i === parts.length - 1)}</div>`;
    }).join('');
    return `
      <form id="${formId}" class="parts" autocomplete="off">
        ${rows}
        <div class="row"><button type="submit" class="btn btn-primary">${submitLabel}</button>${multi ? '<span class="small muted">Enter = ข้อถัดไป · Shift+Enter = ขึ้นบรรทัด</span>' : ''}</div>
      </form>`;
  }

  function bindParts(form, fields) {
    fields.forEach((f, i) => f.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' || e.isComposing || (f.tagName === 'TEXTAREA' && e.shiftKey)) return;
      e.preventDefault();
      if (i < fields.length - 1) fields[i + 1].focus();
      else form.requestSubmit();
    }));
  }

  function diffHTML(input, target) {
    let you = '', key = '';
    const ops = align(input.trim().toLowerCase().replace(/\s+/g, ' '), target.toLowerCase());
    for (const [op, a, b] of ops) {
      if (op === 'eq') { you += `<span class="eq">${esc(a)}</span>`; key += `<span class="eq">${esc(b)}</span>`; }
      else if (op === 'sub') { you += `<span class="sub">${esc(a)}</span>`; key += `<span class="sub">${esc(b)}</span>`; }
      else if (op === 'extra') { you += `<span class="sub">${esc(a)}</span>`; }
      else { you += '<span class="miss" title="ขาดตัวอักษร">‸</span>'; key += `<span class="sub">${esc(b)}</span>`; }
    }
    return `
      <div class="diff"><span class="lbl">คุณตอบ</span>${you || '<span class="muted">(ว่าง)</span>'}</div>
      <div class="diff"><span class="lbl">เทียบกับ</span>${key}</div>`;
  }

  function verdictOf(grade, overridden) {
    if (overridden) return '✓ นับว่าถูก (ตัดสินเอง)';
    if (grade.kind === 'describe' && grade.state === 'exact') return '✓ บรรยายครบทุกประเด็น';
    if (grade.state === 'partial') return `△ บรรยายได้ ${grade.hit} จาก ${grade.total} ประเด็น`;
    if (grade.state === 'exact') return '✓ ถูกต้อง';
    if (grade.state === 'typo') return '✓ ถูกต้อง (สะกดคลาดเคลื่อนเล็กน้อย)';
    if (grade.state === 'empty') return '— ไม่ได้ตอบ';
    return '✗ ยังไม่ถูก';
  }

  function gradeDetailHTML(grade, input) {
    if (grade.kind === 'describe') {
      return `<ul class="points">${grade.points.map((p) => `<li class="${p.found ? 'got' : 'miss'}"><span class="m">${p.found ? '✓' : '✗'}</span>${esc(p.label)}</li>`).join('')}</ul>`;
    }
    if (grade.state === 'typo' || (grade.state === 'wrong' && grade.dist <= Math.max(2, grade.target.length * 0.45))) {
      return diffHTML(input || '', grade.target);
    }
    if (grade.state === 'wrong') return `<div class="diff"><span class="lbl">คุณตอบ</span>${esc(input)}</div>`;
    return '';
  }

  const keyHTML = (part) => (isDescribe(part)
    ? `<div class="key"><b>คำตอบตัวอย่าง:</b> ${esc(part.answers[0])}</div>`
    : `<div class="key"><b>คำตอบที่ยอมรับ:</b> ${part.answers.map(esc).join(' · ')}</div>`);

  // answered = { grades, overridden: [bool per part], inputs }; override buttons only while studying
  function resultHTML(card, answered, allowOverride) {
    const parts = partsOf(card);
    const { grades, overridden, inputs } = answered;
    const oks = grades.map((g, i) => !!overridden[i] || passed(g));
    const right = oks.filter(Boolean).length;
    const multi = parts.length > 1;
    const blocks = parts.map((p, i) => {
      const g = grades[i];
      const override = allowOverride && !oks[i] && g.state !== 'empty'
        ? `<div class="row"><button type="button" class="btn btn-sm" data-override="${i}" title="กดเมื่อมั่นใจว่าความหมายถูก เช่น ใช้คำพ้องที่ไม่อยู่ในรายการ">ตอบถูกแล้ว แต่ระบบตรวจไม่ผ่าน</button></div>` : '';
      const body = gradeDetailHTML(g, inputs[i]) + keyHTML(p) + override;
      if (!multi) return `<div class="result-title">${verdictOf(g, overridden[i])}</div>${body}`;
      return `
        <div class="part-result ${oks[i] ? 'ok' : 'no'}">
          <div class="part-head"><span class="pl">${LETTERS[i]}.</span><span class="pq">${esc(p.q || '')}</span></div>
          <div class="pv">${verdictOf(g, overridden[i])}</div>
          ${body}
        </div>`;
    }).join('');
    const t = topicById[card.topic] || {};
    const cat = catById[card.category];
    return `
      <div class="result ${right === parts.length ? 'ok' : 'no'}" aria-live="polite">
        ${multi ? `<div class="result-title">${right === parts.length ? `✓ ถูกครบทั้ง ${parts.length} ข้อ` : `ถูก ${right} จาก ${parts.length} ข้อ`}</div>` : ''}
        ${blocks}
        ${card.explain ? `<div class="explain">${esc(card.explain)}</div>` : ''}
        <div class="src">${esc(t.short || '')}${cat ? ' · ' + esc(cat.label) : ''}${card.src ? ' · ' + esc(card.src) : ''}${card.custom ? ' · การ์ดที่เพิ่มเอง' : ''}</div>
      </div>`;
  }

  /* ================================================================ study */

  function startStudy(mode, ids) {
    let cards;
    if (ids) cards = ids.map(cardById).filter(Boolean);
    else {
      cards = pool(state.topic, state.category);
      if (mode === 'due') cards = cards.filter(isDue);
    }
    if (!cards.length) { toast('ไม่มีการ์ดให้ทบทวนในชุดนี้'); return; }
    const due = shuffle(cards.filter((c) => !isNew(c)));
    const fresh = shuffle(cards.filter(isNew));
    state.study = { queue: due.concat(fresh).map((c) => c.id), index: 0, reviewed: 0, again: {}, mode, answered: null };
    show('study');
  }

  function renderStudy() {
    const area = $('#view-study');
    const s = state.study;
    if (!s) {
      area.innerHTML = `
        <div class="station"><div class="done">
          <h2>ยังไม่ได้เริ่มรอบทบทวน</h2>
          <p class="muted" style="margin:0">เลือกเรื่องและหมวดที่หน้าหลัก แล้วเริ่มทบทวน</p>
          <div class="row"><button type="button" class="btn btn-primary" id="btnStudyStart">ทบทวนชุดที่เลือกไว้</button>
          <button type="button" class="btn" id="btnStudyHome">ไปหน้าหลัก</button></div>
        </div></div>`;
      $('#btnStudyStart').addEventListener('click', () => startStudy('due'));
      $('#btnStudyHome').addEventListener('click', () => show('home'));
      return;
    }
    while (s.index < s.queue.length && !cardById(s.queue[s.index])) s.index++;
    if (s.index >= s.queue.length) {
      area.innerHTML = `
        <div class="station"><div class="done">
          <h2>ครบรอบแล้ว</h2>
          <p class="muted" style="margin:0">ทบทวนไป ${s.reviewed} ครั้งในรอบนี้</p>
          <div class="row"><button type="button" class="btn btn-primary" id="btnStudyHome">กลับหน้าหลัก</button>
          <button type="button" class="btn" id="btnStudyAgain">ทบทวนอีกรอบ</button></div>
        </div></div>`;
      $('#btnStudyHome').addEventListener('click', () => { state.study = null; show('home'); });
      $('#btnStudyAgain').addEventListener('click', () => startStudy(s.mode));
      return;
    }
    const card = cardById(s.queue[s.index]);
    const pct = Math.round((s.index / s.queue.length) * 100);
    area.innerHTML = `
      <div class="station-bar">
        <span class="station-no">สถานี ${s.index + 1} / ${s.queue.length}</span>
        <div class="meter" aria-hidden="true"><span style="width:${pct}%"></span></div>
        <button type="button" class="btn btn-ghost btn-sm" id="btnStudyExit">ออก</button>
      </div>
      <article class="station" data-card="${esc(card.id)}">
        ${tagHTML(card, isNew(card) ? 'ใหม่' : 'ทบทวน')}
        ${mediaHTML(card)}
        <div class="station-body">
          ${stemHTML(card)}
          ${stationFormHTML(card, 'studyForm', 'studyInput', 'ตรวจคำตอบ')}
          <div id="studyResult"></div>
        </div>
      </article>`;
    const form = $('#studyForm');
    const fields = $$('input, textarea', form);
    bindParts(form, fields);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (s.answered) return;
      const inputs = fields.map((f) => f.value);
      s.answered = { grades: gradeCard(card, inputs), overridden: inputs.map(() => false), inputs };
      fields.forEach((f) => { f.readOnly = true; });
      $('button[type="submit"]', form).disabled = true;
      renderStudyResult(card);
    });
    $('#btnStudyExit').addEventListener('click', () => { state.study = null; show('home'); });
    s.answered = null;
    if (state.view === 'study' && fields[0]) fields[0].focus({ preventScroll: true });
  }

  // a station counts as remembered only when every part is right
  function renderStudyResult(card) {
    const s = state.study;
    const { grades, overridden } = s.answered;
    const ok = grades.every((g, i) => overridden[i] || passed(g));
    const suggested = !ok ? 0 : overridden.some(Boolean) ? 3 : 4;
    const prev = srsOf(card);
    const defs = [[0, 'again', 'ลืม'], [3, 'hard', 'ยาก'], [4, 'good', 'จำได้'], [5, 'easy', 'ง่าย']];
    $('#studyResult').innerHTML = `
      ${resultHTML(card, s.answered, true)}
      <div class="grades" style="margin-top:.8rem" role="group" aria-label="ให้คะแนนความจำ">
        ${defs.map(([q, cls, label], i) => `<button type="button" class="grade ${cls} ${q === suggested ? 'suggested' : ''}" data-q="${q}">${label}<small>${i + 1} · ${days(sm2(prev, q).interval)}</small></button>`).join('')}
      </div>`;
    $$('.grade', $('#studyResult')).forEach((b) => b.addEventListener('click', () => gradeStudy(card, Number(b.dataset.q))));
    $$('[data-override]', $('#studyResult')).forEach((b) => b.addEventListener('click', () => {
      s.answered.overridden[Number(b.dataset.override)] = true;
      renderStudyResult(card);
    }));
    const sug = $(`.grade[data-q="${suggested}"]`, $('#studyResult'));
    if (sug) sug.focus({ preventScroll: true });
    $('#studyResult').scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  async function gradeStudy(card, q) {
    const s = state.study;
    if (!s || !s.answered) return;
    s.answered = null;
    await saveProgress(card, sm2(srsOf(card), q));
    s.reviewed++;
    if (q === 0 && (s.again[card.id] || 0) < 2) {
      s.again[card.id] = (s.again[card.id] || 0) + 1;
      s.queue.splice(Math.min(s.queue.length, s.index + 6), 0, card.id);
    }
    s.index++;
    renderStudy();
  }

  document.addEventListener('keydown', (e) => {
    if (state.view !== 'study' || !state.study || !state.study.answered) return;
    if (e.ctrlKey || e.metaKey || e.altKey || $('#layer').children.length) return;
    const tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' && !e.target.readOnly) return;
    if (tag === 'TEXTAREA' && !e.target.readOnly) return;
    const map = { 1: 0, 2: 3, 3: 4, 4: 5 };
    if (map[e.key] !== undefined) {
      e.preventDefault();
      const card = cardById(state.study.queue[state.study.index]);
      if (card) gradeStudy(card, map[e.key]);
    }
  });

  /* ================================================================ exam */

  function renderExam() {
    const ex = state.exam;
    if (ex && ex.running) { runStation(); return; }
    if (ex && ex.finished) { renderExamSummary(); return; }
    const area = $('#view-exam');
    const topics = [['all', 'ทุกเรื่องใน ' + curBlock().label]].concat(blockTopics().map((t) => [t.id, t.tag + ' · ' + t.short]));
    const topic = state.topic;
    const recipe = curBlock().exam;
    const realCount = recipe ? recipe.sections.flat().reduce((n, r) => n + r[1], 0) : 0;
    area.innerHTML = `
      <div class="panel setup">
        <h2>จำลองสอบ OSPE</h2>
        <p class="muted" style="margin:0">จับเวลาทีละสถานี หมดเวลาแล้วไปสถานีถัดไปทันที ไม่เฉลยระหว่างสอบ — สรุปผลพร้อมเฉลยเมื่อครบทุกสถานี และผลจะถูกนำไปจัดคิวทบทวน</p>
        <div class="modes" role="radiogroup" aria-label="รูปแบบการสอบ">
          ${recipe ? `<label class="mode"><input type="radio" name="exMode" value="real" checked>
            <span><b>เหมือนข้อสอบจริง · ${curBlock().label} · ${realCount} สถานี</b>
            <small>${esc(recipe.note)}</small></span></label>` : ''}
          <label class="mode"><input type="radio" name="exMode" value="custom" ${recipe ? '' : 'checked'}>
            <span><b>กำหนดเอง</b><small>เลือกเรื่อง หมวด และจำนวนสถานี</small></span></label>
        </div>
        <div class="setup-grid" id="exCustom" hidden>
          <div class="field"><label for="exTopic">เรื่อง</label>
            <select id="exTopic">${topics.map(([id, l]) => `<option value="${id}" ${id === topic ? 'selected' : ''}>${esc(l)}</option>`).join('')}</select></div>
          <div class="field"><label for="exCat">หมวด</label><select id="exCat"></select></div>
          <div class="field"><label for="exCount">จำนวนสถานี</label>
            <select id="exCount"><option value="10">10 สถานี</option><option value="15" selected>15 สถานี</option><option value="25">25 สถานี</option><option value="all">ทั้งหมดในชุดนี้</option></select></div>
        </div>
        <div class="setup-grid">
          <div class="field"><label for="exSec">เวลาต่อสถานี</label>
            <select id="exSec"><option value="60">60 วินาที</option><option value="90" selected>90 วินาที</option><option value="120">2 นาที</option></select></div>
        </div>
        <p class="small muted" id="exAvail" style="margin:0"></p>
        <div class="row"><button type="button" class="btn btn-primary" id="btnExamStart">เริ่มจับเวลา</button></div>
      </div>`;
    const mode = () => $('input[name="exMode"]:checked').value;
    const fillCats = () => {
      const tp = $('#exTopic').value;
      $('#exCat').innerHTML = [['all', 'ทุกหมวด']].concat(catsFor(tp).map((c) => [c.id, c.label]))
        .map(([id, l]) => `<option value="${esc(id)}">${esc(l)}</option>`).join('');
      updateAvail();
    };
    const updateAvail = () => {
      const real = mode() === 'real';
      $('#exCustom').hidden = real;
      const n = real ? realExamQueue().length : pool($('#exTopic').value, $('#exCat').value).length;
      $('#exAvail').textContent = real ? `สุ่มได้ ${n} สถานี` : `มีสถานีที่ใช้ได้ ${n} สถานี`;
      $('#btnExamStart').disabled = !n;
    };
    $$('input[name="exMode"]').forEach((r) => r.addEventListener('change', updateAvail));
    $('#exTopic').addEventListener('change', fillCats);
    $('#exCat').addEventListener('change', updateAvail);
    fillCats();
    $('#btnExamStart').addEventListener('click', () => {
      let cards;
      if (mode() === 'real') cards = realExamQueue();
      else {
        cards = shuffle(pool($('#exTopic').value, $('#exCat').value).slice());
        const count = $('#exCount').value;
        if (count !== 'all') cards = cards.slice(0, Number(count));
      }
      if (!cards.length) { toast('ไม่มีสถานีในชุดนี้'); return; }
      state.exam = {
        queue: cards.map((c) => c.id), index: 0, results: [], seconds: Number($('#exSec').value),
        endsAt: 0, timer: null, running: true, finished: false,
      };
      runStation();
    });
  }

  // The block's recipe (from the seed) lists sections of [category, count]; each section is shuffled on its
  // own and the sections follow each other, like the parts of the old papers. A station or two from the
  // predicted categories stands in for the new items each paper has added. Never two stations on one
  // topic (two pseudomembranous colitis pictures, say).
  function realExamQueue() {
    const recipe = curBlock().exam;
    if (!recipe) return [];
    const used = new Set();
    const out = [];
    recipe.sections.forEach((rows) => {
      const section = [];
      rows.forEach(([category, n]) => {
        let taken = 0;
        for (const c of shuffle(state.cards.filter((x) => x.category === category))) {
          if (taken >= n) break;
          const g = c.group || c.id;
          if (used.has(g)) continue;
          used.add(g);
          section.push(c);
          taken++;
        }
      });
      out.push(...shuffle(section));
    });
    return out;
  }

  function runStation() {
    const ex = state.exam;
    const area = $('#view-exam');
    if (ex.index >= ex.queue.length) { finishExam(); return; }
    const card = cardById(ex.queue[ex.index]);
    if (!card) { ex.index++; runStation(); return; }
    if (!ex.endsAt) ex.endsAt = now() + ex.seconds * 1000;
    const left = Math.max(0, Math.ceil((ex.endsAt - now()) / 1000));
    area.innerHTML = `
      <div class="station-bar">
        <span class="station-no">สถานี ${ex.index + 1} / ${ex.queue.length}</span>
        <div class="meter" aria-hidden="true"><span style="width:${Math.round((ex.index / ex.queue.length) * 100)}%"></span></div>
        <span class="timer ${left <= 10 ? 'low' : ''}" id="examTimer" aria-label="เวลาที่เหลือ">${left}</span>
      </div>
      <article class="station" data-card="${esc(card.id)}">
        ${tagHTML(card, ex.seconds + ' วินาที')}
        ${mediaHTML(card)}
        <div class="station-body">
          ${stemHTML(card)}
          ${stationFormHTML(card, 'examForm', 'examInput', 'ส่ง → สถานีถัดไป')}
        </div>
      </article>
      <div class="actions"><button type="button" class="btn btn-ghost" id="btnExamQuit">ยกเลิกการสอบ</button></div>`;
    const form = $('#examForm');
    const fields = $$('input, textarea', form);
    const values = () => fields.map((f) => f.value);
    bindParts(form, fields);
    form.addEventListener('submit', (e) => { e.preventDefault(); submitStation(card, values(), false); });
    $('#btnExamQuit').addEventListener('click', async () => {
      if (await ask({ title: 'ยกเลิกการสอบ?', body: 'สถานีที่ทำไปแล้วจะไม่ถูกสรุปผล', ok: 'ยกเลิกการสอบ', cancel: 'สอบต่อ', danger: true })) {
        clearInterval(ex.timer);
        state.exam = null;
        show('home');
      }
    });
    if (state.view === 'exam' && fields[0]) fields[0].focus({ preventScroll: true });
    clearInterval(ex.timer);
    ex.timer = setInterval(() => {
      const remain = Math.max(0, Math.ceil((ex.endsAt - now()) / 1000));
      const el = $('#examTimer');
      if (el) { el.textContent = remain; el.classList.toggle('low', remain <= 10); }
      if (remain <= 0) {
        clearInterval(ex.timer);
        submitStation(card, values(), true);
      }
    }, 250);
  }

  // each part scores one point; a station counts as passed (and as remembered) only when all parts are right
  async function submitStation(card, inputs, timedOut) {
    const ex = state.exam;
    if (!ex || !ex.running || ex.queue[ex.index] !== card.id) return;
    clearInterval(ex.timer);
    const grades = gradeCard(card, inputs);
    const right = grades.filter(passed).length;
    const ok = right === grades.length;
    ex.results.push({ id: card.id, inputs, grades, right, total: grades.length, ok, timedOut });
    ex.index++;
    ex.endsAt = 0;
    saveProgress(card, sm2(srsOf(card), ok ? 4 : 0));
    runStation();
  }

  function finishExam() {
    const ex = state.exam;
    clearInterval(ex.timer);
    ex.running = false;
    ex.finished = true;
    renderExamSummary();
  }

  function renderExamSummary() {
    const ex = state.exam;
    const area = $('#view-exam');
    const sum = (rs, k) => rs.reduce((n, r) => n + r[k], 0);
    const points = sum(ex.results, 'right'), possible = sum(ex.results, 'total');
    const stationsRight = ex.results.filter((r) => r.ok).length;
    const pct = possible ? Math.round((points / possible) * 100) : 0;
    const byTopic = TOPICS.map((t) => {
      const rs = ex.results.filter((r) => { const c = cardById(r.id); return c && c.topic === t.id; });
      return rs.length ? `<span>${esc(t.short)}: <b class="mono">${sum(rs, 'right')}/${sum(rs, 'total')}</b> ข้อ</span>` : '';
    }).filter(Boolean).join(' · ');
    const items = ex.results.map((r, i) => {
      const c = cardById(r.id);
      if (!c) return '';
      const imgs = imagesOf(c);
      const thumb = imgs.length ? `<img src="${imgs[0]}" alt="" loading="lazy">` : `<span class="ph">${c.report ? 'LAB' : 'Q'}</span>`;
      const parts = partsOf(c);
      const lines = parts.map((p, k) => {
        const g = r.grades[k], given = (r.inputs[k] || '').trim();
        const partial = g.kind === 'describe' && g.state === 'partial' ? ` (${g.hit}/${g.total} ประเด็น)` : '';
        return `
          <div class="a"><span class="${passed(g) ? 'ok' : 'no'}">${passed(g) ? '✓' : '✗'}</span>
            ${parts.length > 1 ? `<b>${LETTERS[k]}.</b> ` : ''}${given ? esc(given) : '<span class="muted">(ไม่ได้ตอบ)</span>'}${partial}
            <span class="muted"> → ${esc(p.answers[0])}</span></div>`;
      }).join('');
      return `
        <div class="review-item">
          ${thumb}
          <div>
            <div class="q">${i + 1}. ${esc(titleOf(c) || (topicById[c.topic] || {}).short || '')}${r.timedOut ? ' <span class="muted">· หมดเวลา</span>' : ''}</div>
            ${lines}
          </div>
          <span class="verdict ${r.ok ? 'ok' : 'no'}">${r.right}/${r.total}</span>
        </div>`;
    }).join('');
    const wrong = ex.results.filter((r) => !r.ok).map((r) => r.id);
    area.innerHTML = `
      <div class="panel">
        <h2>สรุปผลจำลองสอบ</h2>
        <div class="row" style="margin-top:.6rem;align-items:baseline">
          <span class="score">${pct}%</span>
          <span class="mono">${points}/${possible} ข้อ · ถูกครบ ${stationsRight}/${ex.results.length} สถานี</span>
        </div>
        ${byTopic ? `<p class="small muted" style="margin:.4rem 0 0">${byTopic}</p>` : ''}
        <div class="actions">
          ${wrong.length ? `<button type="button" class="btn btn-primary" id="btnReviewWrong">ทบทวนสถานีที่ยังไม่ครบ (${wrong.length})</button>` : ''}
          <button type="button" class="btn" id="btnExamNew">ตั้งค่าสอบใหม่</button>
          <button type="button" class="btn btn-ghost" id="btnExamHome">กลับหน้าหลัก</button>
        </div>
        <div class="review-list">${items}</div>
      </div>`;
    if (wrong.length) $('#btnReviewWrong').addEventListener('click', () => { state.exam = null; startStudy('all', wrong); });
    $('#btnExamNew').addEventListener('click', () => { state.exam = null; renderExam(); });
    $('#btnExamHome').addEventListener('click', () => { state.exam = null; show('home'); });
  }

  /* ================================================================ manage cards */

  function renderManage() {
    const m = state.manage;
    if (m.topic !== 'all' && !curBlock().topics.includes(m.topic)) m.topic = 'all';
    $('#manageTopic').innerHTML = [['all', 'ทุกเรื่องใน ' + curBlock().label]].concat(blockTopics().map((t) => [t.id, t.tag + ' · ' + t.short]))
      .map(([id, l]) => `<option value="${id}" ${id === m.topic ? 'selected' : ''}>${esc(l)}</option>`).join('');
    const cats = catsFor(m.topic);
    if (m.category !== 'all' && !cats.some((c) => c.id === m.category)) m.category = 'all';
    $('#manageCategory').innerHTML = [['all', 'ทุกหมวด']].concat(cats.map((c) => [c.id, c.label]))
      .map(([id, l]) => `<option value="${esc(id)}" ${id === m.category ? 'selected' : ''}>${esc(l)}</option>`).join('');
    $('#manageSearch').value = m.q;
    renderManageList();
  }

  function renderManageList() {
    const m = state.manage;
    const q = norm(m.q);
    let list = pool(m.topic, m.category);
    if (q) {
      list = list.filter((c) => norm(titleOf(c)).includes(q) || norm(c.id).includes(q)
        || partsOf(c).some((p) => p.answers.some((a) => norm(a).includes(q))));
    }
    const hidden = state.hidden.filter((id) => seedById[id]).length;
    $('#manageCount').textContent = `${list.length} สถานี${hidden ? ` · ซ่อนการ์ดตั้งต้นไว้ ${hidden} ใบ` : ''}`;
    const shown = list.slice(0, m.limit);
    $('#manageList').innerHTML = shown.map((c) => {
      const imgs = imagesOf(c);
      const thumb = imgs.length ? `<img src="${imgs[0]}" alt="" loading="lazy">` : `<span class="ph">${c.report ? 'LAB' : 'Q'}</span>`;
      const cat = catById[c.category];
      const flag = c.custom ? '<span class="badge">เพิ่มเอง</span> ' : c.edited ? '<span class="badge">แก้ไขแล้ว</span> ' : '';
      const parts = partsOf(c);
      const key = parts.map((p, i) => (parts.length > 1 ? LETTERS[i] + '. ' : '') + (p.answers[0] || '')).join(' · ');
      const years = c.years && c.years.length ? ' · ออกสอบ ' + c.years.map(shortYear).join(' ') : '';
      return `
        <div class="item" data-id="${esc(c.id)}">
          ${thumb}
          <div style="min-width:0">
            <div class="q">${esc(titleOf(c) || key)}</div>
            <div class="sub">${flag}<span class="mono">${esc(c.id)}</span> · ${esc(cat ? cat.label : c.category)}${years} · ${esc(key)}</div>
          </div>
          <div class="acts">
            <button type="button" class="btn btn-sm" data-act="edit">แก้ไข</button>
            <button type="button" class="btn btn-sm btn-danger" data-act="del">ลบ</button>
          </div>
        </div>`;
    }).join('') || '<p class="muted">ไม่พบการ์ดที่ตรงเงื่อนไข</p>';
    $('#manageMore').innerHTML = list.length > shown.length
      ? `<button type="button" class="btn" id="btnMore">แสดงเพิ่ม (${list.length - shown.length})</button>` : '';
    if (list.length > shown.length) $('#btnMore').addEventListener('click', () => { m.limit += 60; renderManageList(); });
  }

  $('#manageList').addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    const id = b.closest('.item').dataset.id;
    if (b.dataset.act === 'edit') openEditor(id);
    else deleteCard(id);
  });
  $('#manageSearch').addEventListener('input', (e) => { state.manage.q = e.target.value; state.manage.limit = 60; renderManageList(); });
  $('#manageTopic').addEventListener('change', (e) => { state.manage.topic = e.target.value; state.manage.category = 'all'; renderManage(); });
  $('#manageCategory').addEventListener('change', (e) => { state.manage.category = e.target.value; renderManageList(); });
  $('#btnNewCard').addEventListener('click', () => openEditor(null));

  async function deleteCard(id) {
    const card = cardById(id);
    if (!card) return;
    const ok = await ask({
      title: 'ลบการ์ดนี้?',
      body: card.custom ? titleOf(card) : titleOf(card) + ' — การ์ดตั้งต้นจะถูกซ่อน กู้คืนได้ที่ “สำรองข้อมูล › คืนค่าการ์ดตั้งต้น”',
      ok: 'ลบ', danger: true,
    });
    if (!ok) return;
    if (card.custom) {
      state.custom = state.custom.filter((c) => c.id !== id);
      await localSafe((l) => l.del('custom', id));
    } else {
      state.hidden = Array.from(new Set(state.hidden.concat(id)));
      await saveMeta('hidden', state.hidden);
    }
    buildCards();
    renderManageList();
    toast('ลบการ์ดแล้ว');
  }

  function openEditor(id) {
    const card = id ? cardById(id) : null;
    const layer = $('#layer');
    const topic = card ? card.topic : (state.manage.topic !== 'all' ? state.manage.topic : curBlock().topics[0]);
    let image = card ? (card.image || null) : null;
    const seedImages = card && !card.custom ? imagesOf(Object.assign({}, card, { image: null })) : [];
    let dropSeedImage = false;
    // the parts as editable text; read back from the form before every redraw so nothing typed is lost
    let parts = partsOf(card || { parts: [{ q: '', answers: [], keywords: null }] }).map((p) => ({
      q: p.q || '',
      answers: (p.answers || []).join('\n'),
      keywords: p.keywords ? p.keywords.map((v) => (Array.isArray(v) ? v : [v]).join(' | ')).join('\n') : '',
    }));
    layer.innerHTML = `
      <div class="overlay" data-backdrop>
        <form class="dialog" id="editor" role="dialog" aria-modal="true" aria-labelledby="edTitle">
          <h2 id="edTitle">${card ? 'แก้ไขการ์ด' : 'เพิ่มการ์ดใหม่'}</h2>
          ${card && !card.custom ? '<p class="small muted" style="margin:0">การ์ดตั้งต้น: การแก้ไขเก็บไว้ในเบราว์เซอร์นี้ และคืนค่าเดิมได้จากหน้าสำรองข้อมูล</p>' : ''}
          <div class="setup-grid">
            <div class="field"><label for="edTopic">เรื่อง</label>
              <select id="edTopic">${blockTopics().map((t) => `<option value="${t.id}" ${t.id === topic ? 'selected' : ''}>${esc(t.tag)} · ${esc(t.short)}</option>`).join('')}</select></div>
            <div class="field"><label for="edCat">หมวด</label><select id="edCat"></select></div>
          </div>
          <div class="field"><span class="label">รูปภาพ <span class="hint">— ไม่บังคับ</span></span>
            <div class="img-pick" id="edImgBox"></div>
            <input type="file" id="edImg" accept="image/*" hidden>
          </div>
          <div class="field"><label for="edQ">โจทย์หลัก <span class="hint">— บริบทของสถานี เช่น “ชิ้นเนื้อจาก cervix biopsy” (ไม่บังคับถ้ามีคำถามย่อย)</span></label>
            <textarea id="edQ" rows="2">${esc(card ? card.question || '' : '')}</textarea></div>
          <div class="ed-parts" id="edParts"></div>
          <div class="row"><button type="button" class="btn btn-sm" id="edAddPart">+ เพิ่มข้อย่อย</button></div>
          <div class="field"><label for="edE">คำอธิบายหลังเฉลย <span class="hint">— ไม่บังคับ</span></label>
            <textarea id="edE">${esc(card && card.explain ? card.explain : '')}</textarea></div>
          <div class="dialog-foot">
            ${card ? '<button type="button" class="btn btn-danger spacer" id="edDel">ลบการ์ดนี้</button>' : ''}
            <button type="button" class="btn" id="edCancel">ยกเลิก</button>
            <button type="submit" class="btn btn-primary">บันทึก</button>
          </div>
        </form>
      </div>`;
    const fillCat = () => {
      const tp = $('#edTopic').value;
      const cur = card && card.topic === tp ? card.category : null;
      $('#edCat').innerHTML = catsFor(tp).map((c) => `<option value="${esc(c.id)}" ${c.id === cur ? 'selected' : ''}>${esc(c.label)}</option>`).join('');
    };
    const drawImage = () => {
      const srcs = image ? [image] : !dropSeedImage ? seedImages : [];
      $('#edImgBox').innerHTML = srcs.length
        ? `<div class="img-row">${srcs.map((s) => `<img src="${s}" alt="ภาพของการ์ด">`).join('')}</div><div class="row" style="justify-content:center"><button type="button" class="btn btn-sm" id="edPick">เปลี่ยนรูป</button><button type="button" class="btn btn-sm btn-danger" id="edNoImg">ไม่ใช้รูป</button></div>`
        : '<button type="button" class="btn btn-sm" id="edPick">เลือกรูปจากเครื่อง</button>';
      $('#edPick').addEventListener('click', () => $('#edImg').click());
      const none = $('#edNoImg');
      if (none) none.addEventListener('click', () => { image = null; dropSeedImage = true; drawImage(); });
    };
    const readParts = () => {
      parts = $$('.ed-part', layer).map((fs) => ({
        q: $('[data-f="q"]', fs).value, answers: $('[data-f="answers"]', fs).value, keywords: $('[data-f="keywords"]', fs).value,
      }));
    };
    const drawParts = () => {
      const multi = parts.length > 1;
      $('#edParts').innerHTML = parts.map((p, i) => `
        <fieldset class="ed-part">
          <legend>${multi ? 'ข้อ ' + LETTERS[i] + '.' : 'คำถามและคำตอบ'}</legend>
          <div class="field"><label for="edPq${i}">คำถามย่อย ${multi ? '' : '<span class="hint">— ไม่บังคับถ้ามีโจทย์หลัก</span>'}</label>
            <input type="text" id="edPq${i}" data-f="q" value="${esc(p.q)}" placeholder="เช่น จงวินิจฉัยโรค"></div>
          <div class="field"><label for="edPa${i}">คำตอบที่ยอมรับ <span class="hint">— บรรทัดละ 1 แบบ เช่น ชื่อเต็ม ตัวย่อ ชื่อพ้อง (บรรทัดแรกคือเฉลยหลัก)</span></label>
            <textarea id="edPa${i}" data-f="answers" rows="3">${esc(p.answers)}</textarea></div>
          <div class="field"><label for="edPk${i}">ประเด็นที่ต้องบรรยาย <span class="hint">— ใส่เฉพาะข้อบรรยาย บรรทัดละประเด็น คั่นคำพ้องด้วย |</span></label>
            <textarea id="edPk${i}" data-f="keywords" rows="2" placeholder="septate | septate hyphae&#10;acute angle | 45 degree">${esc(p.keywords)}</textarea></div>
          ${multi ? `<div class="row"><button type="button" class="btn btn-sm btn-danger" data-remove="${i}">ลบข้อ ${LETTERS[i]}</button></div>` : ''}
        </fieldset>`).join('');
      $('#edAddPart').disabled = parts.length >= MAX_PARTS;
    };
    fillCat();
    drawImage();
    drawParts();
    $('#edTopic').addEventListener('change', fillCat);
    $('#edImg').addEventListener('change', () => {
      const f = $('#edImg').files[0];
      if (!f) return;
      const r = new FileReader();
      r.onload = () => { image = r.result; dropSeedImage = false; drawImage(); };
      r.readAsDataURL(f);
    });
    $('#edAddPart').addEventListener('click', () => {
      readParts();
      if (parts.length >= MAX_PARTS) return;
      parts.push({ q: '', answers: '', keywords: '' });
      drawParts();
      $(`#edPq${parts.length - 1}`).focus();
    });
    $('#edParts').addEventListener('click', (e) => {
      const b = e.target.closest('[data-remove]');
      if (!b) return;
      readParts();
      parts.splice(Number(b.dataset.remove), 1);
      drawParts();
    });
    const close = () => { document.removeEventListener('keydown', onKey, true); layer.innerHTML = ''; };
    const onKey = (e) => { if (e.key === 'Escape') { e.preventDefault(); close(); } };
    document.addEventListener('keydown', onKey, true);
    $('#edCancel').addEventListener('click', close);
    if (card) $('#edDel').addEventListener('click', async () => { close(); await deleteCard(card.id); });
    $('#editor').addEventListener('submit', async (e) => {
      e.preventDefault();
      readParts();
      const question = $('#edQ').value.trim();
      const out = parts.map((p) => {
        const keywords = p.keywords.split('\n').map((l) => l.split('|').map((s) => s.trim()).filter(Boolean)).filter((v) => v.length);
        return { q: p.q.trim(), answers: p.answers.split('\n').map((s) => s.trim()).filter(Boolean), keywords: keywords.length ? keywords : null };
      });
      if (out.some((p) => !p.answers.length)) { toast('ทุกข้อต้องมีคำตอบอย่างน้อย 1 แบบ'); return; }
      if (out.length > 1 && out.some((p) => !p.q)) { toast('ใส่คำถามของทุกข้อย่อย'); return; }
      if (!question && !out[0].q) { toast('ใส่โจทย์หลักหรือคำถามย่อย'); return; }
      const fields = {
        topic: $('#edTopic').value, category: $('#edCat').value, question, parts: out,
        answers: null, keywords: null, explain: $('#edE').value.trim() || null,
      };
      if (card && !card.custom) {
        const o = Object.assign({}, state.overrides[card.id] || {}, fields);
        if (image) o.image = image;
        else delete o.image;
        if (dropSeedImage) { o.images = []; o.imageRef = null; }
        state.overrides[card.id] = o;
        await saveMeta('overrides', state.overrides);
      } else {
        const rec = Object.assign({ id: card ? card.id : uid(), src: null, report: null, images: card && card.images ? card.images : [] },
          fields, { image: image || null });
        if (dropSeedImage) rec.images = [];
        state.custom = state.custom.filter((c) => c.id !== rec.id).concat(rec);
        await localSafe((l) => l.put('custom', rec));
      }
      buildCards();
      close();
      renderManageList();
      toast(card ? 'บันทึกการแก้ไขแล้ว' : 'เพิ่มการ์ดแล้ว');
    });
    $('#edQ').focus();
  }

  /* ================================================================ backup & restore */

  function exportPayload() {
    return {
      app: 'ospe-immune2', version: 2, exportedAt: new Date().toISOString(),
      progress: state.progress, custom: state.custom, overrides: state.overrides,
      hidden: state.hidden, resetAt: state.resetAt,
    };
  }

  function renderIO() {
    $('#exportText').hidden = true;
    $$('[data-reset]').forEach((b) => b.remove());
    $('#btnRestoreSeed').insertAdjacentHTML('beforebegin', blockTopics().map((t) =>
      `<button type="button" class="btn btn-danger" data-reset="${esc(t.id)}">ล้างความคืบหน้า ${esc(t.tag)} · ${esc(t.short)}</button>`).join(''));
  }

  $('#btnExport').addEventListener('click', async () => {
    const text = JSON.stringify(exportPayload());
    const filename = 'ospe-lab-backup-' + new Date().toISOString().slice(0, 10) + '.json';
    let dl = null;
    try { dl = window.claude && window.claude.use ? await window.claude.use('downloads') : null; } catch (e) { dl = null; }
    if (dl) {
      try { await dl.save({ filename, data: text }); toast('บันทึกไฟล์สำรองแล้ว'); return; }
      catch (e) {
        if (e && e.code === 'declined') return;
        if (e && e.code === 'rate_limited') { toast('มีหน้าต่างบันทึกเปิดอยู่แล้ว ลองอีกครั้ง'); return; }
      }
    }
    try {
      const url = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
      const a = document.createElement('a');
      a.href = url; a.download = filename;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
      toast('ถ้าไฟล์ไม่ถูกดาวน์โหลด ใช้ “แสดงเป็นข้อความ” แล้วคัดลอกเก็บไว้');
    } catch (e) {
      showExportText(text);
    }
  });

  function showExportText(text) {
    const ta = $('#exportText');
    ta.value = text || JSON.stringify(exportPayload());
    ta.hidden = false;
    ta.focus();
    ta.select();
  }

  $('#btnShowExport').addEventListener('click', async () => {
    showExportText();
    try { await navigator.clipboard.writeText($('#exportText').value); toast('คัดลอกข้อมูลสำรองแล้ว'); }
    catch (e) { toast('เลือกข้อความไว้แล้ว กดคัดลอกเองได้เลย'); }
  });

  async function importPayload(p) {
    if (!p || p.app !== 'ospe-immune2') { toast('ไฟล์นี้ไม่ใช่ข้อมูลสำรองของเว็บ OSPE Lab นี้'); return; }
    let n = 0;
    const toLocal = [];
    Object.keys(p.progress || {}).forEach((id) => {
      const r = p.progress[id];
      if (!r || typeof r !== 'object') return;
      const cur = state.progress[id];
      if (!cur || (r.t || 0) > (cur.t || 0)) {
        const rec = Object.assign(blankSrs(), r);
        const card = cardById(id) || seedById[id];
        const topic = card ? topicOf(card) : null;
        if (topic && rec.t <= (state.resetAt[topic] || 0)) rec.t = now();
        state.progress[id] = rec;
        toLocal.push(Object.assign({ id }, rec));
        cloudPut(id, Object.assign({}, rec));
        n++;
      }
    });
    if (toLocal.length) await localSafe((l) => l.putMany('progress', toLocal));
    if (Array.isArray(p.custom)) {
      const hasAnswers = (x) => x && Array.isArray(x.answers) && x.answers.length;
      const valid = p.custom.filter((c) => c && c.id
        && (Array.isArray(c.parts) && c.parts.length ? c.parts.every(hasAnswers) : hasAnswers(c)));
      const ids = new Set(valid.map((c) => c.id));
      state.custom = state.custom.filter((c) => !ids.has(c.id)).concat(valid);
      if (valid.length) await localSafe((l) => l.putMany('custom', valid));
    }
    if (p.overrides && typeof p.overrides === 'object') {
      state.overrides = Object.assign({}, state.overrides, p.overrides);
      await saveMeta('overrides', state.overrides);
    }
    if (Array.isArray(p.hidden)) {
      state.hidden = Array.from(new Set(state.hidden.concat(p.hidden)));
      await saveMeta('hidden', state.hidden);
    }
    buildCards();
    toast(`นำเข้าแล้ว — อัปเดตความคืบหน้า ${n} ใบ`);
  }

  $('#importFile').addEventListener('change', () => {
    const f = $('#importFile').files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = async () => {
      try { await importPayload(JSON.parse(r.result)); }
      catch (e) { toast('อ่านไฟล์ไม่ได้ — ต้องเป็นไฟล์ JSON ที่บันทึกจากหน้านี้'); }
      $('#importFile').value = '';
    };
    r.readAsText(f);
  });

  $('#btnImportText').addEventListener('click', async () => {
    const text = $('#importText').value.trim();
    if (!text) { toast('วางข้อความ JSON ก่อน'); return; }
    try { await importPayload(JSON.parse(text)); $('#importText').value = ''; }
    catch (e) { toast('ข้อความนี้ไม่ใช่ JSON ที่ถูกต้อง'); }
  });

  $('#resetRow').addEventListener('click', async (e) => {
    const b = e.target.closest('[data-reset]');
    if (!b) return;
    const topic = b.dataset.reset;
    const t = topicById[topic];
    const name = `${t.tag} · ${t.short}`;
    const ok = await ask({
      title: `ล้างความคืบหน้า ${name}?`,
      body: `${t.label}: ทุกการ์ดจะกลับเป็น “ยังไม่เคยทำ” การ์ดและการแก้ไขยังอยู่ครบ`,
      ok: 'ล้างความคืบหน้า', danger: true,
    });
    if (!ok) return;
    state.resetAt[topic] = now();
    const ids = Object.keys(state.progress).filter((id) => { const c = cardById(id) || seedById[id]; return c && topicOf(c) === topic; });
    ids.forEach((id) => { delete state.progress[id]; });
    await Promise.all(ids.map((id) => localSafe((l) => l.del('progress', id))));
    await saveMeta('resetAt', state.resetAt);
    cloudPut('_meta', { resetAt: Object.assign({}, state.resetAt) });
    toast(`ล้างความคืบหน้า ${name} แล้ว`);
  });

  $('#btnRestoreSeed').addEventListener('click', async () => {
    const n = state.hidden.length + Object.keys(state.overrides).length;
    if (!n) { toast('การ์ดตั้งต้นครบและยังไม่ถูกแก้ไข'); return; }
    const ok = await ask({
      title: 'คืนค่าการ์ดตั้งต้น?',
      body: `การ์ดตั้งต้นที่ลบหรือแก้ไขไว้ ${n} ใบจะกลับเป็นแบบเดิม การ์ดที่เพิ่มเองและความคืบหน้ายังอยู่`,
      ok: 'คืนค่า',
    });
    if (!ok) return;
    state.hidden = [];
    state.overrides = {};
    await saveMeta('hidden', []);
    await saveMeta('overrides', {});
    buildCards();
    toast('คืนค่าการ์ดตั้งต้นแล้ว');
  });

  /* ================================================================ start */

  function snapshot() {
    const s = state.study;
    return {
      view: state.view,
      study: s ? { queue: s.queue, index: s.index, reviewed: s.reviewed, again: s.again, mode: s.mode } : null,
    };
  }

  async function start(saved) {
    renderStoreNote();
    try {
      await loadLocal();
    } catch (e) {
      console.error(e);
      store.local = memoryBackend();
      store.mode = 'memory';
      buildCards();
    }
    renderBlockChrome();
    if (saved && saved.study && Array.isArray(saved.study.queue)) {
      state.study = Object.assign({ answered: null }, saved.study);
    }
    show(saved && saved.view && saved.view !== 'exam' ? saved.view : 'home');
    renderStoreNote();
    connectCloud();
  }

  const hot = window.claude && window.claude.hot;
  if (hot && typeof hot.snapshot === 'function') hot.snapshot(snapshot);
  if (hot && typeof hot.ready === 'function') hot.ready(start);
  else start((hot && hot.data) || {});
})();
