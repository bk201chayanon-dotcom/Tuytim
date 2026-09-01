/* ------------------------------------------------------------------
 * game.js — วงจรของเกม: เลือกหมวด → นับถอยหลัง → เล่น → สรุปผล
 *
 * ทุกอย่างทำงานในเบราว์เซอร์ ไม่มีการเรียกเซิร์ฟเวอร์
 * ค่าที่ตั้งไว้และคะแนนสูงสุดเก็บใน localStorage แบบกันพังไว้แล้ว
 * ------------------------------------------------------------------ */

(function () {
  'use strict';

  const $ = id => document.getElementById(id);

  const TIMES = [60, 100, 150];
  const ALL = 'all';
  const STORE = 'bleach-quiz.v1';

  /* ---------------- ค่าที่ผู้เล่นตั้งไว้ ---------------- */

  const defaults = { deck: ALL, time: 100, sound: true, best: {} };
  let cfg = load();

  function load() {
    try {
      const raw = localStorage.getItem(STORE);
      if (raw) return Object.assign({}, defaults, JSON.parse(raw));
    } catch (e) { /* โหมดส่วนตัวหรือปิดการเก็บข้อมูล — ใช้ค่าเริ่มต้นไป */ }
    return Object.assign({}, defaults);
  }

  function save() {
    try { localStorage.setItem(STORE, JSON.stringify(cfg)); } catch (e) { /* ไม่เป็นไร */ }
  }

  /* ---------------- คลังคำถาม ---------------- */

  const ALL_ITEMS = DECKS.flatMap(d => d.items.map(a => ({ a: a, deck: d.name })));

  function poolOf(deckId) {
    if (deckId === ALL) return ALL_ITEMS.slice();
    const d = DECK_INDEX[deckId];
    if (!d) return ALL_ITEMS.slice();
    return d.items.map(a => ({ a: a, deck: d.name }));
  }

  function deckName(deckId) {
    return deckId === ALL ? 'รวมทุกหมวด' : (DECK_INDEX[deckId] || {}).name || 'รวมทุกหมวด';
  }

  function shuffle(list) {
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }

  /* ---------------- เสียง (สังเคราะห์สด ไม่ต้องโหลดไฟล์) ---------------- */

  let actx = null;

  function audio() {
    if (!cfg.sound) return null;
    try {
      if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === 'suspended') actx.resume();
      return actx;
    } catch (e) { return null; }
  }

  function tone(freq, dur, type, gain, slideTo) {
    const ac = audio();
    if (!ac) return;
    const t = ac.currentTime;
    const osc = ac.createOscillator();
    const amp = ac.createGain();
    osc.type = type || 'triangle';
    osc.frequency.setValueAtTime(freq, t);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    amp.gain.setValueAtTime(0.0001, t);
    amp.gain.exponentialRampToValueAtTime(gain || 0.18, t + 0.012);
    amp.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(amp).connect(ac.destination);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  const sfx = {
    ok()    { tone(680, 0.09, 'triangle', 0.2); setTimeout(() => tone(1020, 0.13, 'triangle', 0.18), 70); },
    skip()  { tone(190, 0.13, 'square', 0.12); },
    tick()  { tone(1400, 0.035, 'sine', 0.1); },
    go()    { tone(520, 0.12, 'triangle', 0.16); },
    start() { tone(880, 0.22, 'triangle', 0.2); },
    end()   { tone(320, 0.85, 'sawtooth', 0.16, 90); }
  };

  function buzz(ms) {
    try { if (navigator.vibrate) navigator.vibrate(ms); } catch (e) { /* ไม่รองรับ */ }
  }

  /* ---------------- ไม่ให้จอดับระหว่างเล่น ---------------- */

  let wake = null;

  async function keepAwake() {
    try {
      if ('wakeLock' in navigator) wake = await navigator.wakeLock.request('screen');
    } catch (e) { /* บางเบราว์เซอร์ไม่ให้ — ปล่อยผ่าน */ }
  }

  function releaseAwake() {
    try { if (wake) { wake.release(); wake = null; } } catch (e) { /* ไม่เป็นไร */ }
  }

  /* ---------------- สลับฉาก ---------------- */

  const screens = ['home', 'ready', 'play', 'over'];

  function show(name) {
    screens.forEach(s => $(s).classList.toggle('on', s === name));
    /* สองฉากนี้กินเต็มจอพอดี ห้ามให้เลื่อนหน้าไปมาระหว่างกดปุ่ม */
    document.body.style.overflow = (name === 'play' || name === 'ready') ? 'hidden' : '';
    if (name === 'home' || name === 'over') window.scrollTo(0, 0);
  }

  /* ---------------- หน้าปก ---------------- */

  function paintDecks() {
    const list = $('deckList');
    const cards = [{ id: ALL, name: 'รวมทุกหมวด', kanji: '全', blurb: 'สุ่มจากทุกหมวดปนกัน', n: ALL_ITEMS.length }]
      .concat(DECKS.map(d => ({ id: d.id, name: d.name, kanji: d.kanji, blurb: d.blurb, n: d.items.length })));

    list.innerHTML = cards.map(c => `
      <button class="deck${c.id === ALL ? ' wide' : ''}" type="button" data-deck="${c.id}" aria-pressed="${c.id === cfg.deck}">
        <span class="dk" aria-hidden="true">${c.kanji}</span>
        <span class="dn">${c.name}</span>
        <span class="db">${c.blurb}</span>
        <span class="dc">${c.n} ข้อ</span>
      </button>`).join('');

    list.querySelectorAll('.deck').forEach(b => {
      b.addEventListener('click', () => {
        cfg.deck = b.dataset.deck;
        save();
        paintDecks();
        paintBest();
      });
    });
  }

  function paintTimes() {
    const seg = $('segTime');
    seg.innerHTML = TIMES.map(t =>
      `<button type="button" data-time="${t}" aria-pressed="${t === cfg.time}">${t} วิ</button>`).join('');
    seg.querySelectorAll('button').forEach(b => {
      b.addEventListener('click', () => {
        cfg.time = Number(b.dataset.time);
        save();
        paintTimes();
        paintBest();
        $('startSub').textContent = cfg.time + ' วินาที';
      });
    });
    $('startSub').textContent = cfg.time + ' วินาที';
  }

  function paintToggle(segId, key, attr) {
    const seg = $(segId);
    seg.querySelectorAll('button').forEach(b => {
      const val = b.dataset[attr] === '1';
      b.setAttribute('aria-pressed', String(val === cfg[key]));
      b.onclick = () => { cfg[key] = val; save(); paintToggle(segId, key, attr); };
    });
  }

  function bestKey() { return cfg.deck + ':' + cfg.time; }

  function paintBest() {
    const b = cfg.best[bestKey()];
    $('bestLine').innerHTML = b
      ? `สถิติสูงสุดของหมวดนี้ที่ ${cfg.time} วินาที — <b>${b} คะแนน</b>`
      : 'ยังไม่มีสถิติของหมวดนี้ — ตั้งไว้เลย';
  }

  /* ---------------- สถานะระหว่างเล่น ---------------- */

  const state = { pool: [], i: 0, ok: 0, skip: 0, log: [], endAt: 0, raf: 0, lastTick: -1, locked: false };

  function lenClass(text) {
    const n = text.length;
    if (n <= 9) return '';
    if (n <= 15) return 'len-m';
    if (n <= 24) return 'len-l';
    return 'len-x';
  }

  function paintCard() {
    const it = state.pool[state.i];
    if (!it) { finish(); return; }
    const w = $('word');
    w.className = 'word ' + lenClass(it.a);
    /* ห่อทีละคำ เพื่อไม่ให้เบราว์เซอร์ตัดชื่อทับศัพท์กลางคำ */
    w.textContent = '';
    it.a.split(' ').forEach((tok, i) => {
      if (i) w.appendChild(document.createTextNode(' '));
      const span = document.createElement('span');
      span.className = 'tok';
      span.textContent = tok;
      w.appendChild(span);
    });
    $('cat').textContent = it.deck;
    fit();
  }

  /* คำบางคำยาวกว่าที่จอเตี้ย ๆ จะรับไหว — ย่อลงจนพอดีก่อนโชว์ */
  function fit() {
    const stage = document.querySelector('.stage');
    const card = document.querySelector('.card');
    const w = $('word');
    w.style.fontSize = '';
    const pad = parseFloat(getComputedStyle(stage).paddingTop) +
                parseFloat(getComputedStyle(stage).paddingBottom);
    const room = stage.clientHeight - pad;
    if (room <= 0) return;
    for (let i = 0; i < 24 && card.getBoundingClientRect().height > room; i++) {
      w.style.fontSize = (parseFloat(getComputedStyle(w).fontSize) * 0.92) + 'px';
    }
  }

  function flash(kind) {
    const f = $('flash');
    f.className = 'flash ' + kind;
    void f.offsetWidth;              /* บังคับให้เบราว์เซอร์เริ่มอนิเมชันใหม่ */
    f.classList.add('fire');
    if (kind === 'ok') {
      const s = $('slash');
      s.classList.remove('fire');
      void s.offsetWidth;
      s.classList.add('fire');
    }
  }

  function answer(correct) {
    if (state.locked) return;
    const it = state.pool[state.i];
    if (!it) return;

    state.log.push({ a: it.a, hit: correct });
    if (correct) { state.ok++; sfx.ok(); buzz(30); }
    else { state.skip++; sfx.skip(); buzz(15); }

    $('tallyOk').textContent = state.ok;
    $('tallySkip').textContent = state.skip;
    flash(correct ? 'ok' : 'sk');

    state.i++;
    if (state.i >= state.pool.length) {
      /* คำถามหมดก่อนเวลา — สับใหม่แล้วเล่นต่อ ไม่ตัดจบกลางคัน */
      state.pool = shuffle(poolOf(cfg.deck));
      state.i = 0;
    }
    paintCard();
  }

  /* ---------------- นาฬิกา ---------------- */

  function loop() {
    const left = Math.max(0, state.endAt - Date.now());
    const secs = Math.ceil(left / 1000);
    const frac = left / (cfg.time * 1000);

    $('gaugeFill').style.transform = 'scaleX(' + frac + ')';
    if (secs !== state.lastTick) {
      state.lastTick = secs;
      $('clock').textContent = secs;
      const low = secs <= 10;
      $('clock').classList.toggle('low', low);
      $('gauge').classList.toggle('low', low);
      if (low && secs > 0) sfx.tick();
    }

    if (left <= 0) { finish(); return; }
    state.raf = requestAnimationFrame(loop);
  }

  /* ---------------- เริ่มเกม ---------------- */

  function begin() {
    state.pool = shuffle(poolOf(cfg.deck));
    state.i = 0;
    state.ok = 0;
    state.skip = 0;
    state.log = [];
    state.lastTick = -1;
    state.locked = false;

    $('tallyOk').textContent = '0';
    $('tallySkip').textContent = '0';
    $('clock').textContent = cfg.time;
    $('clock').classList.remove('low');
    $('gauge').classList.remove('low');
    $('gaugeFill').style.transform = 'scaleX(1)';

    show('ready');
    keepAwake();

    let n = 3;
    $('countNum').textContent = n;
    sfx.go();

    const beat = setInterval(() => {
      n--;
      if (n > 0) {
        const el = $('countNum');
        el.textContent = n;
        el.style.animation = 'none';
        void el.offsetWidth;
        el.style.animation = '';
        sfx.go();
        return;
      }
      clearInterval(beat);
      sfx.start();
      paintCard();
      show('play');
      state.endAt = Date.now() + cfg.time * 1000;
      state.raf = requestAnimationFrame(loop);
    }, 1000);
  }

  /* ---------------- จบเกม ---------------- */

  function finish() {
    if (state.locked) return;
    state.locked = true;
    cancelAnimationFrame(state.raf);
    releaseAwake();
    sfx.end();
    buzz([60, 60, 120]);

    const score = state.ok;
    const key = bestKey();
    const prev = cfg.best[key] || 0;
    const record = score > prev;
    if (record) { cfg.best[key] = score; save(); }

    $('overDeck').textContent = deckName(cfg.deck) + ' · ' + cfg.time + ' วินาที';
    $('finalScore').innerHTML = score + '<sub>คะแนน</sub>';
    $('verdict').textContent = rank(score, cfg.time);
    $('verdictSub').textContent = record && score > 0
      ? 'สถิติใหม่ของหมวดนี้ · เดิม ' + prev + ' คะแนน'
      : 'ผ่านไป ' + state.log.length + ' ข้อ · ข้าม ' + state.skip + ' ข้อ' +
        (prev ? ' · สถิติสูงสุด ' + prev : '');

    const rows = state.log.map(r =>
      `<div class="row ${r.hit ? 'hit' : 'miss'}">
         <span class="mk">${r.hit ? '✓' : '—'}</span>
         <span class="tx">${r.a}</span>
       </div>`).join('');

    $('recap').innerHTML = state.log.length
      ? '<h2>ข้อที่ผ่านไป</h2>' + rows
      : '<h2>ยังไม่ได้ตอบสักข้อ</h2>';

    show('over');
  }

  function rank(score, time) {
    const rate = score / (time / 60);          /* คะแนนต่อหนึ่งนาที */
    if (score === 0) return 'รอบนี้เรอิอัตสึหมดก่อน';
    if (rate < 4)  return 'ยังอยู่ชั้นรูคงไก';
    if (rate < 8)  return 'สอบผ่านโรงเรียนชินโอแล้ว';
    if (rate < 12) return 'ระดับรองหัวหน้าหน่วย';
    if (rate < 17) return 'ปลดบันไคได้แล้ว';
    if (rate < 22) return 'ระดับหัวหน้าหน่วยเต็มตัว';
    return 'นี่มันหน่วยศูนย์ชัด ๆ';
  }

  /* ---------------- ปุ่มและคีย์ลัด ---------------- */

  $('btnStart').addEventListener('click', begin);
  $('btnAgain').addEventListener('click', begin);
  $('btnHome').addEventListener('click', () => { show('home'); paintBest(); });
  $('btnOk').addEventListener('click', () => answer(true));
  $('btnSkip').addEventListener('click', () => answer(false));

  document.addEventListener('keydown', e => {
    if ($('play').classList.contains('on')) {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') { e.preventDefault(); answer(true); }
      else if (e.key === 'ArrowLeft' || e.key === 'Backspace') { e.preventDefault(); answer(false); }
      else if (e.key === 'Escape') { finish(); }
    } else if ($('home').classList.contains('on') || $('over').classList.contains('on')) {
      if (e.key === 'Enter') { e.preventDefault(); begin(); }
    }
  });

  /* หมุนจอหรือย่อหน้าต่างระหว่างเล่น ให้คำนวณขนาดตัวอักษรใหม่ */
  window.addEventListener('resize', () => {
    if ($('play').classList.contains('on')) fit();
  });

  /* คืนจอไม่ให้ดับ เมื่อผู้เล่นสลับกลับมาที่แท็บนี้ */
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && $('play').classList.contains('on')) keepAwake();
  });

  /* ---------------- เปิดหน้าครั้งแรก ---------------- */

  paintDecks();
  paintTimes();
  paintToggle('segSound', 'sound', 'sound');
  paintBest();
  $('poolCount').textContent = ALL_ITEMS.length;
})();
