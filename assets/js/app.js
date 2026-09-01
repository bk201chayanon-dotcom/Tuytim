/* ------------------------------------------------------------------
 * app.js — ตัวควบคุมหน้าเว็บ: คิวทบทวน, การแสดงผล, การบันทึกความคืบหน้า
 * ------------------------------------------------------------------ */

(() => {
  'use strict';

  const STORE_KEY = 'anki-cad:v1';
  const $  = sel => document.querySelector(sel);
  const $$ = sel => [...document.querySelectorAll(sel)];
  const esc = s => String(s).replace(/[&<>"]/g, m =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));

  /* ---------- คลังการ์ด: แปลง DECKS ให้เป็นรายการแบนพร้อม id ---------- */

  const stripTags = html => String(html)
    .replace(/<[^>]*>/g, ' ')
    .replace(/\{\{c\d+::(.+?)\}\}/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();

  const CARDS = [];
  DECKS.forEach(deck => {
    deck.cards.forEach((c, i) => {
      CARDS.push({
        ...c,
        id: `${deck.id}-${i}`,
        deckId: deck.id,
        deckName: deck.name,
        // ดัชนีข้อความล้วนสำหรับค้นหา — ตัดแท็ก HTML ออกเพื่อไม่ให้ขวางการจับคู่วลี
        plain: stripTags(`${c.cloze || ''} ${c.q || ''} ${c.a || ''} ${c.note || ''}`).toLowerCase()
      });
    });
  });
  const CARD_BY_ID = Object.fromEntries(CARDS.map(c => [c.id, c]));

  /* ---------- ข้อมูลที่บันทึกไว้ ---------- */

  const defaults = () => ({
    progress: {},                     // id -> สถานะ SRS
    log: [],                          // [{t, id, grade}]
    newPerDay: 15,
    theme: 'dark',
    daily: { date: '', newDone: 0 }
  });

  let db = load();

  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) return { ...defaults(), ...JSON.parse(raw) };
    } catch (e) { /* โหมดส่วนตัว หรือข้อมูลเสียหาย -> เริ่มใหม่ */ }
    return defaults();
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(db)); }
    catch (e) { /* เขียนไม่ได้ก็ยังใช้งานต่อได้ในรอบนี้ */ }
  }

  const stateOf = id => db.progress[id] || SRS.fresh();

  function todayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }

  function rollDaily() {
    const k = todayKey();
    if (db.daily.date !== k) { db.daily = { date: k, newDone: 0 }; save(); }
  }

  /* ---------- การนับสถานะ ---------- */

  function bucket(card, now = Date.now()) {
    const s = stateOf(card.id);
    if (s.state === 'new') return 'new';
    if (s.state === 'learning' || s.state === 'relearning')
      return s.due <= now ? 'learn' : 'later';
    return s.due <= now ? 'review' : 'later';
  }

  function countsFor(cards) {
    const c = { new: 0, learn: 0, review: 0, later: 0 };
    const now = Date.now();
    cards.forEach(card => c[bucket(card, now)]++);
    return c;
  }

  const deckCards = deckId => CARDS.filter(c => c.deckId === deckId);

  /* ---------- คิวทบทวน ---------- */

  const session = { queue: [], total: 0, deckId: null, current: null, shown: false, answered: 0 };

  function buildQueue(deckId) {
    rollDaily();
    const pool = deckId ? deckCards(deckId) : CARDS;
    const now = Date.now();

    const due = [], learn = [], fresh = [];
    pool.forEach(card => {
      const b = bucket(card, now);
      if (b === 'review') due.push(card);
      else if (b === 'learn') learn.push(card);
      else if (b === 'new') fresh.push(card);
    });

    const budget = newBudget();
    shuffle(due); shuffle(fresh);
    learn.sort((a, b) => stateOf(a.id).due - stateOf(b.id).due);

    // สลับการ์ดใหม่แทรกไปกับการ์ดที่ถึงกำหนด เพื่อไม่ให้เจอของใหม่รวดเดียว
    const q = [...learn, ...interleave(due, fresh.slice(0, budget))];
    session.queue = q;
    session.total = q.length;
    session.answered = 0;
    session.deckId = deckId;
    return q;
  }

  function interleave(a, b) {
    if (!b.length) return a;
    if (!a.length) return b;
    const out = [];
    const step = Math.max(1, Math.round(a.length / b.length));
    let bi = 0;
    a.forEach((item, i) => {
      out.push(item);
      if (bi < b.length && (i + 1) % step === 0) out.push(b[bi++]);
    });
    while (bi < b.length) out.push(b[bi++]);
    return out;
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /* ---------- การแสดงผลเนื้อหาการ์ด ---------- */

  /* เนื้อหาการ์ดใน decks.js เป็น HTML ที่เราเขียนเอง จึงแสดงผลได้โดยตรง
     ส่วนข้อความจากผู้ใช้ (เช่น คำค้น) ยังต้องผ่าน esc() เสมอ */

  function frontHTML(card) {
    if (card.cloze) return renderCloze(card.cloze, false);
    return card.q;
  }

  function backHTML(card) {
    return card.cloze ? '' : card.a;
  }

  function renderCloze(text, reveal) {
    return text.replace(/\{\{c\d+::(.+?)\}\}/g, (_, inner) =>
      `<span class="cloze${reveal ? '' : ' hidden'}">${inner}</span>`);
  }

  /* ---------- หน้าหลัก ---------- */

  /** จำนวนการ์ดใหม่ที่ยังเหลือให้เรียนได้ในวันนี้ */
  function newBudget() {
    rollDaily();
    return Math.max(0, db.newPerDay - db.daily.newDone);
  }

  function renderHome() {
    rollDaily();
    const all = countsFor(CARDS);
    const budget = newBudget();
    // จำนวนที่จะได้เจอจริงถูกจำกัดด้วยโควตาการ์ดใหม่ต่อวัน
    const newToday = Math.min(all.new, budget);

    $('#homeStats').innerHTML = `
      <div class="stat new"><div class="n">${newToday}</div><div class="l">การ์ดใหม่วันนี้</div></div>
      <div class="stat learn"><div class="n">${all.learn}</div><div class="l">กำลังเรียน</div></div>
      <div class="stat review"><div class="n">${all.review}</div><div class="l">ถึงกำหนดทบทวน</div></div>
      <div class="stat"><div class="n">${all.new}</div><div class="l">ยังไม่เคยเรียน</div></div>`;

    $('#deckList').innerHTML = DECKS.map(d => {
      const c = countsFor(deckCards(d.id));
      const n = Math.min(c.new, budget);
      const ready = n + c.learn + c.review;
      return `
        <div class="deck">
          <div class="emoji">${d.emoji}</div>
          <div class="meta">
            <h3>${esc(d.name)}</h3>
            <p>${esc(d.desc)} · ${d.cards.length} การ์ด</p>
          </div>
          <div class="counts">
            <span class="pill ${n ? 'new' : 'zero'}" title="การ์ดใหม่วันนี้">${n}</span>
            <span class="pill ${c.learn ? 'learn' : 'zero'}" title="กำลังเรียน">${c.learn}</span>
            <span class="pill ${c.review ? 'review' : 'zero'}" title="ถึงกำหนดทบทวน">${c.review}</span>
          </div>
          <button class="btn" data-study="${d.id}" ${ready ? '' : 'disabled'}>
            ${ready ? 'ทบทวน' : 'เรียบร้อย'}
          </button>
        </div>`;
    }).join('');

    const totalReady = newToday + all.learn + all.review;
    const noneLeft = all.new + all.learn + all.review === 0;
    $('#studyAll').disabled = totalReady === 0;
    $('#studyAll').textContent = totalReady
      ? `ทบทวนทุกสำรับ (${totalReady} การ์ด)`
      : (noneLeft ? 'ทบทวนครบแล้ววันนี้ 🎉' : 'ครบโควตาการ์ดใหม่ของวันนี้แล้ว');
  }

  /* ---------- หน้าทบทวน ---------- */

  function startStudy(deckId) {
    buildQueue(deckId);
    go('study');
    nextCard();
  }

  function nextCard() {
    const now = Date.now();

    if (!session.queue.length) {
      // ยังมีการ์ดในขั้นเรียนที่รอเวลาอยู่หรือไม่
      const pool = session.deckId ? deckCards(session.deckId) : CARDS;
      const waiting = pool.filter(c => {
        const s = stateOf(c.id);
        return (s.state === 'learning' || s.state === 'relearning') && s.due > now;
      });
      return renderDone(waiting.length);
    }

    session.current = session.queue.shift();
    session.shown = false;
    renderCard();
  }

  function renderCard() {
    const card = session.current;
    const s = stateOf(card.id);
    const b = s.state === 'new' ? 'new'
            : (s.state === 'review' ? 'review' : 'learn');
    const label = { new: 'ใหม่', learn: 'กำลังเรียน', review: 'ทบทวน' }[b];

    const done = session.total - session.queue.length - 1;
    const pct = session.total ? (done / session.total) * 100 : 0;

    $('#studyView').innerHTML = `
      <div class="study-head">
        <span class="name">${esc(card.deckName)}</span>
        <span class="pill ${b}">${label}</span>
        <div class="queue">
          <span class="pill">${session.queue.length + 1} เหลือ</span>
          <button class="btn ghost" id="quitBtn">ออก</button>
        </div>
      </div>
      <div class="progress"><i style="width:${pct}%"></i></div>
      <div class="card">
        <div class="front" id="frontEl">${frontHTML(card)}</div>
        <div id="backWrap"></div>
      </div>
      <div class="answer-area" id="answerArea">
        <button class="show-btn" id="showBtn">
          แสดงคำตอบ<small>กด Space หรือ Enter</small>
        </button>
      </div>`;

    $('#showBtn').onclick = reveal;
    $('#quitBtn').onclick = () => { go('home'); renderHome(); };
  }

  function reveal() {
    if (session.shown) return;
    session.shown = true;
    const card = session.current;

    if (card.cloze) {
      $('#frontEl').innerHTML = renderCloze(card.cloze, true);
    } else {
      $('#backWrap').innerHTML = `
        <div class="divider"></div>
        <div class="back">${backHTML(card)}</div>`;
    }
    if (card.note) {
      $('#backWrap').insertAdjacentHTML('beforeend',
        `<div class="note">${card.note}</div>`);
    }
    if (card.src) {
      $('#backWrap').insertAdjacentHTML('beforeend',
        `<div class="src">${esc(card.src)}</div>`);
    }

    const s = stateOf(card.id);
    const names = { 1: 'ลืม', 2: 'ยาก', 3: 'ได้', 4: 'ง่าย' };
    $('#answerArea').innerHTML = `<div class="grades">` + [1, 2, 3, 4].map(g => `
      <button class="grade" data-g="${g}">
        <div class="g">${names[g]}</div>
        <div class="i">${SRS.intervalLabel(s, g)}</div>
        <div class="k">${g}</div>
      </button>`).join('') + `</div>`;

    $$('#answerArea .grade').forEach(btn => {
      btn.onclick = () => grade(Number(btn.dataset.g));
    });
  }

  function grade(g) {
    if (!session.shown) return;
    const card = session.current;
    const prev = stateOf(card.id);
    const next = SRS.schedule(prev, g);

    if (prev.state === 'new') db.daily.newDone++;
    db.progress[card.id] = next;
    db.log.push({ t: Date.now(), id: card.id, grade: g });
    if (db.log.length > 3000) db.log = db.log.slice(-3000);
    session.answered++;
    save();

    // การ์ดที่ยังไม่จบขั้นเรียนและถึงกำหนดภายในรอบนี้ ให้วนกลับเข้าคิว
    const soon = next.due - Date.now() < 20 * SRS.MIN;
    if ((next.state === 'learning' || next.state === 'relearning') && soon) {
      const pos = Math.min(session.queue.length, g === 1 ? 3 : 8);
      session.queue.splice(pos, 0, card);
    }

    nextCard();
  }

  function renderDone(waiting) {
    session.current = null;
    $('#studyView').innerHTML = `
      <div class="done">
        <div class="big">🎉</div>
        <h2>จบรอบทบทวนแล้ว</h2>
        <p>
          ตอบไป ${session.answered} การ์ดในรอบนี้
          ${waiting ? `<br>ยังมี ${waiting} การ์ดในขั้นเรียนที่จะกลับมาอีกในไม่กี่นาที` : ''}
        </p>
        <button class="btn" id="backHome">กลับหน้าหลัก</button>
      </div>`;
    $('#backHome').onclick = () => { go('home'); renderHome(); };
  }

  /* ---------- หน้าเรียกดูการ์ด ---------- */

  function renderBrowse() {
    const q = $('#searchInput').value.trim().toLowerCase();
    const deckId = $('#deckFilter').value;
    const now = Date.now();

    const rows = CARDS.filter(c => {
      if (deckId && c.deckId !== deckId) return false;
      if (!q) return true;
      return c.plain.includes(q);
    });

    $('#cardCount').textContent = `${rows.length} การ์ด`;

    if (!rows.length) {
      $('#cardRows').innerHTML = `<div class="empty">ไม่พบการ์ดที่ตรงกับคำค้น</div>`;
      return;
    }

    $('#cardRows').innerHTML = rows.map(c => {
      const s = stateOf(c.id);
      const b = s.state === 'new' ? 'new' : (s.state === 'review' ? 'review' : 'learn');
      const label = { new: 'ใหม่', learn: 'เรียน', review: 'ทบทวน' }[b];
      const due = s.state === 'new' ? '—'
        : (s.due <= now ? 'ถึงกำหนด' : relTime(s.due - now));
      const front = c.cloze ? renderCloze(c.cloze, true) : c.q;
      const back  = c.cloze ? '' : c.a;
      return `
        <div class="row" data-id="${c.id}">
          <span class="tag ${b}">${label}</span>
          <div class="q">
            ${front}
            ${back ? `<div class="a">${back}</div>` : ''}
          </div>
          <span class="due">${due}</span>
        </div>`;
    }).join('');

    $$('#cardRows .row').forEach(r => {
      r.onclick = () => r.classList.toggle('open');
    });
  }

  function relTime(ms) {
    const m = ms / SRS.MIN;
    if (m < 60) return `อีก ${Math.round(m)} นาที`;
    if (m < 1440) return `อีก ${Math.round(m / 60)} ชม.`;
    const d = Math.round(m / 1440);
    if (d < 30) return `อีก ${d} วัน`;
    return `อีก ${(d / 30).toFixed(1)} เดือน`;
  }

  /* ---------- หน้าสถิติ ---------- */

  function renderStats() {
    const c = countsFor(CARDS);
    const studied = CARDS.filter(x => stateOf(x.id).state !== 'new').length;
    const reviews = db.log.length;
    const correct = db.log.filter(l => l.grade >= 3).length;
    const retention = reviews ? Math.round((correct / reviews) * 100) : 0;
    const mature = CARDS.filter(x => stateOf(x.id).interval >= 21).length;

    $('#statCards').innerHTML = `
      <div class="stat"><div class="n">${studied}/${CARDS.length}</div><div class="l">เริ่มเรียนแล้ว</div></div>
      <div class="stat review"><div class="n">${mature}</div><div class="l">การ์ดโตเต็มวัย (≥21 วัน)</div></div>
      <div class="stat"><div class="n">${reviews}</div><div class="l">จำนวนครั้งที่ตอบ</div></div>
      <div class="stat"><div class="n">${retention}%</div><div class="l">อัตราตอบถูก</div></div>`;

    // พยากรณ์การ์ดที่จะถึงกำหนดใน 14 วันข้างหน้า
    const days = 14;
    const buckets = new Array(days).fill(0);
    const start = new Date(); start.setHours(0, 0, 0, 0);
    CARDS.forEach(card => {
      const s = stateOf(card.id);
      if (s.state === 'new') return;
      const idx = Math.floor((s.due - start.getTime()) / SRS.DAY);
      if (idx < 0) buckets[0]++;
      else if (idx < days) buckets[idx]++;
    });

    if (!buckets.some(Boolean)) {
      $('#forecast').innerHTML =
        '<div class="empty" style="margin:auto">ยังไม่มีการ์ดที่ถูกจัดตารางไว้ — เริ่มทบทวนสักรอบก่อน</div>';
      $('#queueBreakdown').textContent =
        `ตอนนี้: ใหม่ ${c.new} · กำลังเรียน ${c.learn} · ถึงกำหนด ${c.review} · ยังไม่ถึงกำหนด ${c.later}`;
      return;
    }

    const max = Math.max(1, ...buckets);
    const names = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];
    $('#forecast').innerHTML = buckets.map((n, i) => {
      const d = new Date(start.getTime() + i * SRS.DAY);
      return `<div class="bar">
        <b>${n || ''}</b>
        <i style="height:${(n / max) * 100}%"></i>
        <span>${i === 0 ? 'วันนี้' : names[d.getDay()]}</span>
      </div>`;
    }).join('');

    $('#queueBreakdown').textContent =
      `ตอนนี้: ใหม่ ${c.new} · กำลังเรียน ${c.learn} · ถึงกำหนด ${c.review} · ยังไม่ถึงกำหนด ${c.later}`;
  }

  /* ---------- หน้าตั้งค่า ---------- */

  function renderSettings() {
    $('#newPerDay').value = db.newPerDay;
    $('#todayNew').textContent =
      `วันนี้เรียนการ์ดใหม่ไปแล้ว ${db.daily.newDone} ใบ`;
  }

  function resetProgress() {
    if (!confirm('ล้างความคืบหน้าทั้งหมด? การกระทำนี้ย้อนกลับไม่ได้')) return;
    db = defaults();
    db.theme = document.documentElement.dataset.theme;
    save();
    renderHome(); renderSettings();
    toast('ล้างความคืบหน้าเรียบร้อย');
  }

  function exportProgress() {
    const blob = new Blob([JSON.stringify(db, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'anki-cad-progress.json';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast('ดาวน์โหลดไฟล์ความคืบหน้าแล้ว');
  }

  function importProgress(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!data || typeof data.progress !== 'object') throw new Error('bad file');
        db = { ...defaults(), ...data };
        save();
        applyTheme(db.theme);
        renderHome(); renderSettings();
        toast('นำเข้าความคืบหน้าเรียบร้อย');
      } catch (e) {
        toast('ไฟล์ไม่ถูกต้อง');
      }
    };
    reader.readAsText(file);
  }

  /* ---------- ธีมและการนำทาง ---------- */

  function applyTheme(t) {
    document.documentElement.dataset.theme = t;
    $('#themeBtn').textContent = t === 'dark' ? '☀️' : '🌙';
  }

  function toggleTheme() {
    db.theme = db.theme === 'dark' ? 'light' : 'dark';
    applyTheme(db.theme);
    save();
  }

  function go(view) {
    $$('.view').forEach(v => v.classList.toggle('on', v.id === `${view}View`));
    $$('.nav button').forEach(b => b.classList.toggle('on', b.dataset.go === view));
    if (view === 'home')     renderHome();
    if (view === 'browse')   renderBrowse();
    if (view === 'stats')    renderStats();
    if (view === 'settings') renderSettings();
  }

  let toastTimer;
  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('on'), 2200);
  }

  /* ---------- แป้นพิมพ์ลัด ---------- */

  document.addEventListener('keydown', e => {
    if (/^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName)) return;
    if (!$('#studyView').classList.contains('on')) return;
    if (!session.current) return;

    if (!session.shown && (e.code === 'Space' || e.code === 'Enter')) {
      e.preventDefault();
      reveal();
    } else if (session.shown) {
      if (['1', '2', '3', '4'].includes(e.key)) { e.preventDefault(); grade(Number(e.key)); }
      else if (e.code === 'Space' || e.code === 'Enter') { e.preventDefault(); grade(3); }
    }
  });

  /* ---------- เริ่มทำงาน ---------- */

  function init() {
    applyTheme(db.theme);
    rollDaily();

    $('#deckFilter').innerHTML = '<option value="">ทุกสำรับ</option>' +
      DECKS.map(d => `<option value="${d.id}">${esc(d.name)}</option>`).join('');

    $$('.nav button').forEach(b => b.onclick = () => go(b.dataset.go));
    $('#brand').onclick = () => go('home');
    $('#themeBtn').onclick = toggleTheme;
    $('#studyAll').onclick = () => startStudy(null);

    $('#deckList').addEventListener('click', e => {
      const btn = e.target.closest('[data-study]');
      if (btn && !btn.disabled) startStudy(btn.dataset.study);
    });

    $('#searchInput').oninput = renderBrowse;
    $('#deckFilter').onchange = renderBrowse;

    $('#newPerDay').onchange = e => {
      db.newPerDay = Math.max(0, Math.min(200, Number(e.target.value) || 0));
      e.target.value = db.newPerDay;
      save();
      toast('บันทึกแล้ว');
    };
    $('#resetBtn').onclick = resetProgress;
    $('#exportBtn').onclick = exportProgress;
    $('#importInput').onchange = e => {
      if (e.target.files[0]) importProgress(e.target.files[0]);
      e.target.value = '';
    };

    go('home');
  }

  document.addEventListener('DOMContentLoaded', init);
})();
