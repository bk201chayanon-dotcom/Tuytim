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
  const STORE = 'anime-title-quiz.v1';

  /* ---------------- ค่าที่ผู้เล่นตั้งไว้ ---------------- */

  const defaults = { deck: ALL, time: 100, sound: true, best: {}, seen: [] };
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

  /* ---------------- ประวัติชื่อที่เคยเจอ ----------------
   * ชื่อที่เคยขึ้นจอแล้ว ไม่ว่าจะตอบถูกหรือกดข้าม จะไม่ถูกสุ่มมาอีก
   * จนกว่าจะเจอครบทุกชื่อในชุดนั้น แล้วจึงเริ่มนับรอบใหม่
   * เก็บเป็นรายชื่อ ไม่ใช่ดัชนี ย้ายลำดับในคลังคำถามได้โดยประวัติไม่เพี้ยน
   */

  const seen = new Set(Array.isArray(cfg.seen) ? cfg.seen : []);

  function persistSeen() {
    cfg.seen = Array.from(seen);
    save();
  }

  function forget(items) {
    items.forEach(it => seen.delete(it.a));
  }

  /* ---------------- คลังชื่อ ---------------- */

  function itemsOf(d) {
    return d.items.map(name => ({ a: name, deck: d.name, hue: d.hue }));
  }

  const ALL_ITEMS = DECKS.flatMap(itemsOf);

  function poolOf(deckId) {
    const d = DECK_INDEX[deckId];
    return d ? itemsOf(d) : ALL_ITEMS.slice();
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
    ok()    { tone(560, 0.07, 'square', 0.14); setTimeout(() => tone(940, 0.14, 'triangle', 0.18), 60); },
    skip()  { tone(150, 0.14, 'sine', 0.16); },
    tick()  { tone(1500, 0.03, 'sine', 0.09); },
    go()    { tone(480, 0.11, 'square', 0.12); },
    start() { tone(900, 0.2, 'square', 0.16); },
    end()   { tone(300, 0.8, 'sawtooth', 0.15, 80); }
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
    const cards = [{ id: ALL, name: 'รวมทุกหมวด', en: 'EVERYTHING', hue: '',
                     blurb: 'สุ่มปนกันทั้ง 5 หมวด', n: ALL_ITEMS.length }]
      .concat(DECKS.map(d => ({ id: d.id, name: d.name, en: d.en, hue: d.hue,
                                blurb: d.blurb, n: d.items.length })));

    list.innerHTML = cards.map(c => `
      <button class="deck${c.id === ALL ? ' wide' : ''}" type="button"
              data-deck="${c.id}" data-hue="${c.hue}" aria-pressed="${c.id === cfg.deck}">
        <span class="den">${c.en}</span>
        <span class="dn">${c.name}</span>
        <span class="db">${c.blurb}</span>
        <span class="dc">${c.n} เรื่อง</span>
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
      ? `สถิติสูงสุดของชุดนี้ที่ ${cfg.time} วินาที — <b>${b} คะแนน</b>`
      : 'ยังไม่มีสถิติของชุดนี้ — ตั้งไว้เลย';
    paintProgress();
  }

  function paintProgress() {
    const all = poolOf(cfg.deck);
    const left = all.filter(it => !seen.has(it.a)).length;
    const done = all.length - left;
    $('progText').innerHTML = done
      ? `ยังไม่เคยเจอ <b>${left}</b> จาก ${all.length} เรื่อง · รอบต่อไปจะได้เรื่องใหม่ทั้งหมด`
      : `ยังไม่เคยเจอสักเรื่องในชุดนี้ — ทั้ง ${all.length} เรื่องยังใหม่หมด`;
    $('btnReset').hidden = !done;
  }

  /* ---------------- สถานะระหว่างเล่น ---------------- */

  const state = {
    all: [],        /* ชื่อทั้งหมดของชุดที่เลือก */
    pool: [],       /* คิวที่สับแล้วของรอบนี้ */
    used: new Set(),/* ชื่อที่ขึ้นจอไปแล้วในรอบนี้ */
    cycled: false,  /* รอบนี้เจอครบชุดจนต้องเริ่มนับใหม่หรือยัง */
    i: 0, ok: 0, skip: 0, log: [], endAt: 0, raf: 0, lastTick: -1, locked: false
  };

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

    $('play').dataset.hue = it.hue;
    $('tab').textContent = it.deck;

    const el = $('name');
    el.className = 'name ' + lenClass(it.a);
    /* ห่อทีละคำ เพื่อไม่ให้เบราว์เซอร์ตัดชื่อทับศัพท์กลางคำ */
    el.textContent = '';
    it.a.split(' ').forEach((tok, i) => {
      if (i) el.appendChild(document.createTextNode(' '));
      const span = document.createElement('span');
      span.className = 'tok';
      span.textContent = tok;
      el.appendChild(span);
    });
    fit();
  }

  /* ชื่อเรื่องบางเรื่องยาวกว่าที่จอจะรับไหว — ย่อลงจนพอดีก่อนโชว์
   * ต้องดูทั้งความสูงและความกว้าง: คำเดียวยาว ๆ อย่าง "มหัศจรรย์ความลับคนตัวจิ๋ว"
   * ถูกสั่งห้ามตัดกลางคำไว้ ถ้าวัดแต่ความสูงมันจะล้นขอบขวาออกไปเฉย ๆ */
  function fit() {
    const stage = document.querySelector('.stage');
    const el = $('name');
    el.style.fontSize = '';
    const cs = getComputedStyle(stage);
    const roomH = stage.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    const roomW = stage.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    if (roomH <= 0 || roomW <= 0) return;
    const tooBig = () => el.getBoundingClientRect().height > roomH || el.scrollWidth > roomW + 1;
    for (let i = 0; i < 40 && tooBig(); i++) {
      el.style.fontSize = (parseFloat(getComputedStyle(el).fontSize) * 0.92) + 'px';
    }
  }

  function impact(kind) {
    const f = $('flash');
    f.className = 'flash ' + kind;
    void f.offsetWidth;              /* บังคับให้เบราว์เซอร์เริ่มอนิเมชันใหม่ */
    f.classList.add('fire');
    if (kind === 'ok') {
      const s = $('speed');
      s.classList.remove('fire');
      void s.offsetWidth;
      s.classList.add('fire');
    }
  }

  function answer(correct) {
    if (state.locked) return;
    const it = state.pool[state.i];
    if (!it) return;

    seen.add(it.a);
    state.used.add(it.a);
    state.log.push({ a: it.a, deck: it.deck, hue: it.hue, hit: correct });
    if (correct) { state.ok++; sfx.ok(); buzz(30); }
    else { state.skip++; sfx.skip(); buzz(15); }

    $('tallyOk').textContent = state.ok;
    $('tallySkip').textContent = state.skip;
    impact(correct ? 'ok' : 'sk');

    state.i++;
    if (state.i >= state.pool.length) {
      /* ชื่อที่ยังไม่เคยเจอหมดกลางรอบ — เริ่มนับรอบใหม่ แต่ยังต้องไม่ซ้ำ
         กับชื่อที่เพิ่งขึ้นจอไปในรอบนี้ */
      forget(state.all);
      state.used.forEach(name => seen.add(name));
      state.cycled = true;
      let next = state.all.filter(x => !state.used.has(x.a));
      if (!next.length) next = state.all.slice();   /* ชุดเล็กจนเล่นครบในรอบเดียว */
      state.pool = shuffle(next);
      state.i = 0;
    }
    paintCard();
  }

  /* ---------------- นาฬิกา ---------------- */

  function loop() {
    const left = Math.max(0, state.endAt - Date.now());
    const secs = Math.ceil(left / 1000);

    $('gaugeFill').style.transform = 'scaleX(' + (left / (cfg.time * 1000)) + ')';
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
    const all = poolOf(cfg.deck);
    let fresh = all.filter(it => !seen.has(it.a));
    state.cycled = false;
    if (!fresh.length) {
      /* เจอครบทุกชื่อในชุดนี้แล้ว — ล้างประวัติของชุดนี้แล้วเริ่มนับรอบใหม่ */
      forget(all);
      fresh = all.slice();
      state.cycled = true;
    }
    state.all = all;
    state.pool = shuffle(fresh);
    state.used = new Set();
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
      show('play');
      paintCard();
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
    persistSeen();
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
    const note = record && score > 0
      ? 'สถิติใหม่ของชุดนี้ · เดิม ' + prev + ' คะแนน'
      : 'ผ่านไป ' + state.log.length + ' เรื่อง · ข้าม ' + state.skip + ' เรื่อง' +
        (prev ? ' · สถิติสูงสุด ' + prev : '');
    $('verdictSub').textContent = state.cycled
      ? note + ' · เจอครบทุกเรื่องในชุดนี้แล้ว เริ่มนับรอบใหม่'
      : note;

    const rows = state.log.map(r =>
      `<div class="row ${r.hit ? 'hit' : 'miss'}" data-hue="${r.hue}">
         <span class="mk">${r.hit ? '✓' : '—'}</span>
         <span class="tx">${r.a}</span>
         <span class="sr">${r.deck}</span>
       </div>`).join('');

    $('recap').innerHTML = state.log.length
      ? '<h2>เรื่องที่ผ่านไป</h2>' + rows
      : '<h2>ยังไม่ได้ตอบสักเรื่อง</h2>';

    show('over');
  }

  function rank(score, time) {
    const rate = score / (time / 60);          /* คะแนนต่อหนึ่งนาที */
    if (score === 0) return 'รอบนี้หมดเวลาก่อน';
    if (rate < 4)  return 'เพิ่งเปิดตอนแรก';
    if (rate < 8)  return 'ดูตามกระแสอยู่บ้าง';
    if (rate < 12) return 'คออนิเมะตัวจริง';
    if (rate < 17) return 'ดูมาแล้วทุกซีซั่น';
    if (rate < 22) return 'สายโอตาคุขั้นเทพ';
    return 'นี่มันสารานุกรมอนิเมะเดินได้';
  }

  /* ---------------- ปุ่มและคีย์ลัด ---------------- */

  $('btnStart').addEventListener('click', begin);
  $('btnAgain').addEventListener('click', begin);
  $('btnHome').addEventListener('click', () => { show('home'); paintBest(); });

  $('btnReset').addEventListener('click', () => {
    forget(poolOf(cfg.deck));
    persistSeen();
    paintProgress();
  });
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
