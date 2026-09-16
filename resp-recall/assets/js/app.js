/* ------------------------------------------------------------------
 * app.js — คิวคำถาม การแสดงผล และการบันทึกข้อมูลของเว็บ Active recall
 *
 * ไหลของหน้าทบทวน: ถาม → ผู้เรียนพิมพ์/เลือกคำตอบเอง → เปิดเฉลย
 * → เทียบทีละประเด็น → ให้คะแนนตัวเอง → Recall.schedule กำหนดว่าจะเจอใหม่เมื่อไร
 * ------------------------------------------------------------------ */

(() => {
  'use strict';

  const STORE_KEY = 'resp-recall-v1';
  const THEME_KEY = 'resp-recall-theme';
  const G = Recall.GRADE;

  /* ---------------- คลังคำถามแบนราบ ---------------- */

  const ALL = [];
  const TOPIC_BY_ID = {};
  TOPICS.forEach(topic => {
    TOPIC_BY_ID[topic.id] = topic;
    topic.qs.forEach((q, i) => {
      ALL.push(Object.assign({}, q, {
        id: topic.id + '-' + (i + 1),
        topicId: topic.id,
        topicName: topic.name
      }));
    });
  });
  const BY_ID = {};
  ALL.forEach(q => { BY_ID[q.id] = q; });

  const KIND = { qa: 'ปลายเปิด', fill: 'เติมคำ', mcq: 'ปรนัย' };

  /* ---------------- ข้อมูลที่บันทึกไว้ ---------------- */

  const defaults = () => ({
    progress: {},                 // id -> สถานะการทบทวน
    topics: TOPICS.map(t => t.id),// หัวข้อที่เลือกไว้
    settings: { newPerDay: 15, size: 20, mode: 'due', typeFirst: true },
    daily: { date: '', newDone: 0 },
    history: []                   // [{ d: 'YYYY-MM-DD', n, ok }]
  });

  let store = load();

  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return defaults();
      const parsed = JSON.parse(raw);
      const base = defaults();
      return {
        progress: parsed.progress || base.progress,
        topics: Array.isArray(parsed.topics) && parsed.topics.length ? parsed.topics : base.topics,
        settings: Object.assign(base.settings, parsed.settings || {}),
        daily: Object.assign(base.daily, parsed.daily || {}),
        history: Array.isArray(parsed.history) ? parsed.history : []
      };
    } catch (e) {
      return defaults();
    }
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); }
    catch (e) { toast('บันทึกความคืบหน้าไม่สำเร็จ — พื้นที่เก็บข้อมูลของเบราว์เซอร์อาจเต็ม'); }
  }

  const todayKey = (d = new Date()) => {
    const p = n => String(n).padStart(2, '0');
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
  };

  function rollDaily() {
    const t = todayKey();
    if (store.daily.date !== t) { store.daily = { date: t, newDone: 0 }; save(); }
  }

  function logAnswer(grade) {
    const t = todayKey();
    let row = store.history[store.history.length - 1];
    if (!row || row.d !== t) { row = { d: t, n: 0, ok: 0 }; store.history.push(row); }
    row.n++;
    if (grade === G.KNEW) row.ok++;
    if (store.history.length > 180) store.history = store.history.slice(-180);
  }

  const recOf = id => store.progress[id];

  /* ---------------- เครื่องมือเล็ก ๆ ---------------- */

  const $  = sel => document.querySelector(sel);
  const $$ = sel => Array.prototype.slice.call(document.querySelectorAll(sel));

  function el(tag, cls, html) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  const escapeHtml = s => String(s).replace(/[&<>"]/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  let toastTimer;
  function toast(msg) {
    const old = $('.toast');
    if (old) old.remove();
    const n = el('div', 'toast', escapeHtml(msg));
    document.body.appendChild(n);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => n.remove(), 2600);
  }

  /* ตัดช่องว่าง เครื่องหมายวรรคตอน และตัวพิมพ์ใหญ่ออก ก่อนเทียบคำตอบเติมคำ */
  const norm = s => String(s).toLowerCase()
    .replace(/[\s .,;:!?()[\]{}"'`_/\\-]+/g, '')
    .replace(/[–—]/g, '');

  function checkFill(input, accept) {
    const raw = String(input).toLowerCase();
    const a = norm(input);
    if (!a) return false;
    return accept.some(x => {
      const b = norm(x);
      if (!b) return false;
      if (a === b) return true;
      if (b.length <= 4) {
        /* คำตอบสั้น (มักเป็นตัวเลข) ต้องตรงทั้งคำ ไม่ใช่เป็นส่วนหนึ่งของเลขอื่น
           เช่น ตอบ "15 วัน" ไม่ควรนับว่าตรงกับเฉลย "5" */
        const esc = String(x).toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return new RegExp('(^|[^0-9a-z])' + esc + '([^0-9a-z]|$)').test(raw);
      }
      return a.includes(b) || b.includes(a);
    });
  }

  /* ---------------- ธีม ---------------- */

  function applyTheme(mode) {
    if (mode) document.documentElement.setAttribute('data-theme', mode);
    else document.documentElement.removeAttribute('data-theme');
  }
  applyTheme(localStorage.getItem(THEME_KEY));

  $('#themeBtn').addEventListener('click', () => {
    const dark = matchMedia('(prefers-color-scheme: dark)').matches;
    const cur = document.documentElement.getAttribute('data-theme') || (dark ? 'dark' : 'light');
    const next = cur === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* โหมดส่วนตัว */ }
    drawWave();
  });

  /* ---------------- การสลับหน้า ---------------- */

  const VIEWS = { home: renderHome, browse: renderBrowse, stats: renderStats, settings: renderSettings, study: null };
  let current = 'home';

  function go(name) {
    if (current === 'study' && name !== 'study') session = null;
    current = name;
    $$('.view').forEach(v => v.classList.toggle('on', v.id === name + 'View'));
    $$('.nav button').forEach(b => b.classList.toggle('on', b.dataset.go === name));
    if (VIEWS[name]) VIEWS[name]();
    window.scrollTo(0, 0);
  }

  $$('.nav button').forEach(b => b.addEventListener('click', () => go(b.dataset.go)));
  $('#brand').addEventListener('click', () => go('home'));

  /* ---------------- เส้นลมหายใจบนหัวเรื่อง ---------------- */

  function drawWave() {
    const c = $('#heroWave');
    if (!c) return;
    const ctx = c.getContext('2d');
    const w = c.width, h = c.height;
    ctx.clearRect(0, 0, w, h);
    const ink = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#0d7d84';
    ctx.strokeStyle = ink;
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.beginPath();
    for (let x = 0; x <= w; x++) {
      const t = x / w;
      /* หายใจเข้า-ออก 2 รอบ แล้วค่อย ๆ จางลงทางขวา */
      const y = h / 2 - Math.sin(t * Math.PI * 4) * (h / 3) * (1 - t * 0.55);
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.globalAlpha = 0.9;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  /* ---------------- หน้าเริ่มทบทวน ---------------- */

  function countsFor(ids) {
    const now = Date.now();
    let due = 0, fresh = 0, firm = 0;
    ids.forEach(id => {
      const r = recOf(id);
      if (!Recall.isSeen(r)) fresh++;
      else if (Recall.isDue(r, now)) due++;
      if (Recall.isFirm(r)) firm++;
    });
    return { due, fresh, firm, total: ids.length };
  }

  function selectedPool() {
    return ALL.filter(q => store.topics.indexOf(q.topicId) >= 0);
  }

  function renderHome() {
    rollDaily();
    drawWave();

    const all = countsFor(ALL.map(q => q.id));
    const seen = ALL.filter(q => Recall.isSeen(recOf(q.id))).length;
    $('#homeStats').innerHTML = [
      ['due',  all.due,   'ถึงกำหนด'],
      ['',     all.fresh, 'ยังไม่เคยเจอ'],
      ['firm', all.firm,  'แม่นแล้ว'],
      ['',     seen + '/' + ALL.length, 'เคยทบทวน']
    ].map(([cls, n, label]) =>
      '<div class="stat ' + cls + '"><span class="n">' + n + '</span><span class="l">' + label + '</span></div>'
    ).join('');

    const list = $('#topicList');
    list.innerHTML = '';
    TOPICS.forEach(t => {
      const ids = t.qs.map((q, i) => t.id + '-' + (i + 1));
      const c = countsFor(ids);
      const row = el('label', 'topic');
      row.innerHTML =
        '<input type="checkbox" value="' + t.id + '"' + (store.topics.indexOf(t.id) >= 0 ? ' checked' : '') + '>' +
        '<span class="name">' + escapeHtml(t.name) +
          '<span class="slides">' + escapeHtml(t.slides) + ' · ' + c.total + ' ข้อ</span></span>' +
        '<span class="counts">' +
          (c.due ? '<span class="count due" title="ถึงกำหนดทบทวน">' + c.due + '</span>' : '') +
          (c.firm ? '<span class="count firm" title="แม่นแล้ว">' + c.firm + '</span>' : '') +
          '<span class="count" title="ยังไม่เคยเจอ">' + c.fresh + '</span>' +
        '</span>';
      row.querySelector('input').addEventListener('change', e => {
        const id = e.target.value;
        const at = store.topics.indexOf(id);
        if (e.target.checked && at < 0) store.topics.push(id);
        if (!e.target.checked && at >= 0) store.topics.splice(at, 1);
        save();
        updateStartHint();
      });
      list.appendChild(row);
    });

    $('#modeSel').value = store.settings.mode;
    $('#sizeSel').value = String(store.settings.size);
    $('#typeFirst').checked = !!store.settings.typeFirst;
    updateStartHint();
  }

  function plannedQueue() {
    rollDaily();
    const left = Math.max(0, store.settings.newPerDay - store.daily.newDone);
    return Recall.buildQueue(selectedPool(), store.progress, {
      mode: store.settings.mode,
      size: store.settings.size,
      newLimit: store.settings.mode === 'due' ? left : Infinity
    });
  }

  function updateStartHint() {
    const n = plannedQueue().length;
    const hint = $('#startHint');
    const btn = $('#startBtn');
    btn.disabled = n === 0;
    if (!store.topics.length) hint.textContent = 'ยังไม่ได้เลือกหัวข้อ';
    else if (n === 0) {
      hint.textContent = store.settings.mode === 'due'
        ? 'ยังไม่มีข้อที่ถึงกำหนดในหัวข้อที่เลือก — ลองโหมด "สุ่มทุกข้อ" หรือกลับมาพรุ่งนี้'
        : 'ไม่มีคำถามที่ตรงเงื่อนไขของโหมดนี้';
    } else {
      hint.textContent = 'รอบนี้จะได้ ' + n + ' ข้อ จาก ' + store.topics.length + ' หัวข้อ';
    }
  }

  $('#modeSel').addEventListener('change', e => { store.settings.mode = e.target.value; save(); updateStartHint(); });
  $('#sizeSel').addEventListener('change', e => { store.settings.size = parseInt(e.target.value, 10); save(); updateStartHint(); });
  $('#typeFirst').addEventListener('change', e => { store.settings.typeFirst = e.target.checked; save(); });
  $('#pickAll').addEventListener('click', () => { store.topics = TOPICS.map(t => t.id); save(); renderHome(); });
  $('#pickNone').addEventListener('click', () => { store.topics = []; save(); renderHome(); });
  $('#pickDue').addEventListener('click', () => {
    const now = Date.now();
    store.topics = TOPICS.filter(t =>
      t.qs.some((q, i) => Recall.isDue(recOf(t.id + '-' + (i + 1)), now))
    ).map(t => t.id);
    if (!store.topics.length) toast('ยังไม่มีหัวข้อที่ถึงกำหนดทบทวน');
    save();
    renderHome();
  });
  $('#startBtn').addEventListener('click', startSession);

  /* ---------------- รอบทบทวน ---------------- */

  let session = null;

  function startSession() {
    const queue = plannedQueue();
    if (!queue.length) { toast('ไม่มีคำถามให้ทบทวนในเงื่อนไขนี้'); return; }
    session = {
      queue: queue.map(q => q.id),
      planned: queue.length,
      done: 0,
      right: 0,
      revealed: false,
      answer: '',
      picked: null,
      autoOk: null
    };
    go('study');
    renderCard();
  }

  function currentQuestion() {
    return session && session.queue.length ? BY_ID[session.queue[0]] : null;
  }

  function renderCard() {
    const q = currentQuestion();
    const wrap = $('#qCard');
    if (!q) { renderDone(); return; }

    const total = Math.max(session.planned, session.done + session.queue.length);
    $('#progressFill').style.width = Math.round(session.done / total * 100) + '%';
    $('#studyTopic').textContent = q.topicName;
    $('#studyCount').textContent = (session.done + 1) + '/' + total;

    const rec = recOf(q.id);
    const state = !Recall.isSeen(rec) ? 'ข้อใหม่'
      : Recall.isFirm(rec) ? 'ทบทวนซ้ำ' : 'กำลังจำ';

    wrap.innerHTML = '';
    const card = el('div', 'qcard');
    card.appendChild(el('div', 'card-head',
      '<span class="chip kind">' + KIND[q.t] + '</span><span class="chip">' + state + '</span>'));
    card.appendChild(el('div', 'prompt', q.q));

    if (q.t === 'mcq') {
      const box = el('div', 'choices');
      q.choices.forEach((c, i) => {
        const b = el('button', 'choice');
        b.type = 'button';
        b.innerHTML = '<span class="key">' + (i + 1) + '</span><span>' + escapeHtml(c) + '</span>';
        b.addEventListener('click', () => { session.picked = i; reveal(); });
        box.appendChild(b);
      });
      card.appendChild(box);
    } else if (q.t === 'fill') {
      card.appendChild(el('div', 'ask-hint', 'พิมพ์คำตอบลงในช่อง แล้วกดส่งคำตอบ'));
      const inp = el('input');
      inp.type = 'text';
      inp.id = 'answerBox';
      inp.autocomplete = 'off';
      inp.placeholder = 'คำตอบของคุณ…';
      card.appendChild(inp);
      card.appendChild(submitButton());
    } else {
      const n = q.points ? q.points.length : 0;
      card.appendChild(el('div', 'ask-hint',
        'นึกคำตอบในใจแล้วพิมพ์ออกมาให้ได้อย่างน้อย ' + n + ' ประเด็น ก่อนเปิดเฉลย'));
      const ta = el('textarea');
      ta.id = 'answerBox';
      ta.placeholder = 'เขียนสิ่งที่นึกออก… (ไม่ต้องสวย ขอให้ครบประเด็น)';
      card.appendChild(ta);
      card.appendChild(submitButton());
    }

    wrap.appendChild(card);
    const input = $('#answerBox');
    if (input) input.focus();
  }

  function submitButton() {
    const row = el('div', 'row');
    const b = el('button', 'btn btn-wide', 'ส่งคำตอบ แล้วดูเฉลย');
    b.type = 'button';
    b.addEventListener('click', reveal);
    row.appendChild(b);
    return row;
  }

  function reveal() {
    const q = currentQuestion();
    if (!q || session.revealed) return;

    const input = $('#answerBox');
    session.answer = input ? input.value.trim() : '';

    if (q.t !== 'mcq' && store.settings.typeFirst && !session.answer) {
      toast('ลองเขียนสิ่งที่นึกออกก่อน — การพยายามนึกคือหัวใจของ active recall');
      if (input) input.focus();
      return;
    }

    session.revealed = true;
    if (q.t === 'mcq') session.autoOk = session.picked === q.correct;
    else if (q.t === 'fill') session.autoOk = checkFill(session.answer, q.accept);
    else session.autoOk = null;

    renderReveal();
  }

  function renderReveal() {
    const q = currentQuestion();
    const card = $('#qCard .qcard');

    /* ข้อปรนัย: ระบายตัวเลือกถูก/ผิด แล้วปิดปุ่มไม่ให้กดซ้ำ */
    if (q.t === 'mcq') {
      $$('#qCard .choice').forEach((b, i) => {
        b.disabled = true;
        if (i === q.correct) b.classList.add('right');
        else if (i === session.picked) b.classList.add('wrong');
      });
    } else {
      const inp = $('#answerBox');
      if (inp) inp.disabled = true;
      const btn = $('#qCard .btn-wide');
      if (btn) btn.remove();
    }

    const box = el('div', 'reveal');

    if (session.autoOk !== null) {
      box.appendChild(el('div', 'verdict ' + (session.autoOk ? 'ok' : 'no'),
        session.autoOk ? '✓ ตอบถูก' : '✕ ยังไม่ตรง'));
    }

    if (q.t === 'qa' && session.answer) {
      box.appendChild(el('div', 'label', 'คำตอบของคุณ'));
      box.appendChild(el('div', 'your-answer', escapeHtml(session.answer)));
    }

    if (q.points && q.points.length) {
      box.appendChild(el('div', 'label', 'ประเด็นที่ต้องได้ — กดติ๊กข้อที่คุณนึกออก'));
      const ul = el('ul', 'points');
      q.points.forEach(p => {
        const li = el('li', '', escapeHtml(p));
        li.addEventListener('click', () => li.classList.toggle('hit'));
        ul.appendChild(li);
      });
      box.appendChild(ul);
    }

    box.appendChild(el('div', 'label', 'เฉลย'));
    box.appendChild(el('div', 'answer', q.a));
    box.appendChild(el('div', 'src', q.src));

    const rec = recOf(q.id) || Recall.fresh();
    const grades = el('div', 'grade-row');
    [[G.FORGOT, 'ลืม', 'g1'], [G.ALMOST, 'เกือบได้', 'g2'], [G.KNEW, 'จำได้', 'g3']].forEach(([g, label, cls]) => {
      const b = el('button', 'grade ' + cls,
        '<span>' + label + '</span><small>' + Recall.preview(rec, g) + '</small>');
      b.type = 'button';
      b.addEventListener('click', () => grade(g));
      grades.appendChild(b);
    });
    box.appendChild(grades);

    card.appendChild(box);
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function grade(g) {
    const q = currentQuestion();
    if (!q || !session.revealed) return;

    const before = recOf(q.id);
    const wasNew = !Recall.isSeen(before);
    store.progress[q.id] = Recall.schedule(before || Recall.fresh(), g);
    if (wasNew) { rollDaily(); store.daily.newDone++; }
    logAnswer(g);
    save();

    session.queue.shift();
    session.done++;
    if (g === G.KNEW) session.right++;
    /* ข้อที่ลืม วนกลับมาถามใหม่ในรอบนี้ หลังผ่านไปอีกไม่กี่ข้อ */
    if (g === G.FORGOT) {
      const at = Math.min(session.queue.length, 4);
      session.queue.splice(at, 0, q.id);
    }

    session.revealed = false;
    session.answer = '';
    session.picked = null;
    session.autoOk = null;
    renderCard();
  }

  function renderDone() {
    const pct = session.done ? Math.round(session.right / session.done * 100) : 0;
    $('#progressFill').style.width = '100%';
    $('#studyTopic').textContent = 'จบรอบ';
    $('#studyCount').textContent = session.done + ' ข้อ';

    const wrap = $('#qCard');
    wrap.innerHTML = '';
    const card = el('div', 'qcard done');
    card.innerHTML =
      '<div class="big">' + pct + '%</div>' +
      '<p class="subtitle">ตอบได้เต็ม ' + session.right + ' จาก ' + session.done + ' ครั้งที่ตอบในรอบนี้</p>' +
      '<p class="hint">ข้อที่ยังไม่แม่นถูกจัดคิวให้กลับมาเร็วขึ้นแล้ว</p>';
    const row = el('div', 'row');
    const again = el('button', 'btn', 'ทบทวนอีกรอบ');
    again.addEventListener('click', startSession);
    const home = el('button', 'btn btn-wide', 'กลับหน้าหลัก');
    home.addEventListener('click', () => go('home'));
    row.appendChild(again);
    card.appendChild(row);
    card.appendChild(home);
    wrap.appendChild(card);
    session.queue = [];
  }

  /* ---------------- แป้นพิมพ์ลัด ---------------- */

  document.addEventListener('keydown', e => {
    if (current !== 'study' || !session) return;
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);

    if (e.key === 'Escape') { go('home'); return; }

    if (!session.revealed) {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey || !typing)) { e.preventDefault(); reveal(); return; }
      const q = currentQuestion();
      if (q && q.t === 'mcq' && /^[1-9]$/.test(e.key)) {
        const i = parseInt(e.key, 10) - 1;
        if (i < q.choices.length) { session.picked = i; reveal(); }
      }
      return;
    }

    if (typing) return;
    if (e.key === '1') grade(G.FORGOT);
    if (e.key === '2') grade(G.ALMOST);
    if (e.key === '3' || e.key === 'Enter') grade(G.KNEW);
  });

  /* ---------------- คลังคำถาม ---------------- */

  function renderBrowse() {
    const sel = $('#browseTopic');
    if (sel.options.length === 1) {
      TOPICS.forEach(t => {
        const o = document.createElement('option');
        o.value = t.id;
        o.textContent = t.name;
        sel.appendChild(o);
      });
    }
    drawBrowseList();
  }

  function highlight(text, term) {
    const safe = escapeHtml(text);
    if (!term) return safe;
    const needle = escapeHtml(term).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return safe.replace(new RegExp(needle, 'gi'), m => '<mark>' + m + '</mark>');
  }

  function drawBrowseList() {
    const term = $('#searchBox').value.trim();
    const topic = $('#browseTopic').value;
    const plain = html => String(html).replace(/<[^>]+>/g, '');
    const hit = q => {
      if (topic && q.topicId !== topic) return false;
      if (!term) return true;
      const hay = [q.q, plain(q.a), (q.points || []).join(' '), (q.choices || []).join(' '),
                   (q.accept || []).join(' '), q.topicName].join(' ').toLowerCase();
      return hay.indexOf(term.toLowerCase()) >= 0;
    };

    const rows = ALL.filter(hit);
    $('#browseCount').textContent = rows.length + ' ข้อ จากทั้งหมด ' + ALL.length;

    const list = $('#browseList');
    list.innerHTML = '';
    if (!rows.length) {
      list.appendChild(el('div', 'empty', 'ไม่พบคำถามที่ตรงกับคำค้น'));
      return;
    }

    rows.forEach(q => {
      const r = recOf(q.id);
      const cls = Recall.isFirm(r) ? 'firm' : Recall.isSeen(r) ? 'seen' : '';
      const item = el('div', 'q-item');
      item.innerHTML =
        '<div class="q">' + highlight(q.q, term) + '</div>' +
        '<div class="meta"><span class="box-dot ' + cls + '"></span>' +
          '<span class="chip">' + escapeHtml(q.topicName) + '</span>' +
          '<span class="chip kind">' + KIND[q.t] + '</span>' +
          '<span class="chip">' + escapeHtml(q.src) + '</span></div>';
      const ans = el('div', 'a');
      ans.hidden = true;
      ans.innerHTML =
        (q.t === 'mcq' ? '<p><b>คำตอบ:</b> ' + escapeHtml(q.choices[q.correct]) + '</p>' : '') +
        (q.t === 'fill' ? '<p><b>คำตอบ:</b> ' + escapeHtml(q.accept[0]) + '</p>' : '') +
        (q.points ? '<ul class="points">' + q.points.map(p => '<li>' + escapeHtml(p) + '</li>').join('') + '</ul>' : '') +
        q.a;
      item.appendChild(ans);
      item.addEventListener('click', () => { ans.hidden = !ans.hidden; });
      list.appendChild(item);
    });
  }

  $('#searchBox').addEventListener('input', drawBrowseList);
  $('#browseTopic').addEventListener('change', drawBrowseList);

  /* ---------------- สถิติ ---------------- */

  function renderStats() {
    const body = $('#statsBody');
    const now = Date.now();
    const seen = ALL.filter(q => Recall.isSeen(recOf(q.id)));
    const firm = ALL.filter(q => Recall.isFirm(recOf(q.id)));
    const totals = seen.reduce((acc, q) => {
      const r = recOf(q.id);
      acc.right += r.right; acc.wrong += r.wrong;
      return acc;
    }, { right: 0, wrong: 0 });
    const answered = totals.right + totals.wrong;
    const acc = answered ? Math.round(totals.right / answered * 100) : 0;
    const dueNow = ALL.filter(q => Recall.isDue(recOf(q.id), now)).length;

    body.innerHTML = '';

    body.appendChild(el('div', 'stat-row',
      '<div class="stat"><span class="n">' + seen.length + '</span><span class="l">ข้อที่เคยทบทวน</span></div>' +
      '<div class="stat firm"><span class="n">' + firm.length + '</span><span class="l">แม่นแล้ว</span></div>' +
      '<div class="stat"><span class="n">' + acc + '%</span><span class="l">อัตราตอบได้เต็ม</span></div>' +
      '<div class="stat due"><span class="n">' + dueNow + '</span><span class="l">ถึงกำหนดตอนนี้</span></div>'));

    /* ความคืบหน้ารายหัวข้อ */
    const byTopic = el('div', 'panel');
    byTopic.appendChild(el('h2', null, 'ความคืบหน้ารายหัวข้อ'));
    const bars = el('div', 'bars');
    TOPICS.forEach(t => {
      const ids = t.qs.map((q, i) => t.id + '-' + (i + 1));
      const c = countsFor(ids);
      const seenN = c.total - c.fresh;
      const line = el('div', 'bar-line');
      line.innerHTML =
        '<div class="bar-top"><span>' + escapeHtml(t.name) + '</span>' +
          '<span class="n">' + c.firm + '/' + c.total + '</span></div>' +
        '<div class="bar">' +
          '<i class="firm" style="width:' + (c.firm / c.total * 100) + '%"></i>' +
          '<i class="seen" style="width:' + ((seenN - c.firm) / c.total * 100) + '%"></i>' +
        '</div>';
      bars.appendChild(line);
    });
    byTopic.appendChild(bars);
    byTopic.appendChild(el('div', 'legend',
      '<span><i class="firm"></i>แม่นแล้ว</span><span><i class="seen"></i>กำลังจำ</span><span><i class="new"></i>ยังไม่เคยเจอ</span>'));
    body.appendChild(byTopic);

    /* ภาระทบทวนล่วงหน้า 14 วัน */
    const fc = Recall.forecast(store.progress, 14, now);
    const max = Math.max.apply(null, fc.concat([1]));
    const fcPanel = el('div', 'panel');
    fcPanel.appendChild(el('h2', null, 'ภาระทบทวน 14 วันข้างหน้า'));
    const chart = el('div', 'forecast');
    fc.forEach((n, i) => {
      const bar = el('div');
      bar.style.height = Math.max(2, n / max * 100) + '%';
      bar.title = n + ' ข้อ';
      bar.innerHTML = '<span>' + (i === 0 ? 'วันนี้' : i) + '</span>';
      chart.appendChild(bar);
    });
    const wrap = el('div', 'forecast-wrap');
    wrap.appendChild(chart);
    fcPanel.appendChild(wrap);
    body.appendChild(fcPanel);

    /* ประวัติการทบทวนล่าสุด */
    const hist = store.history.slice(-10).reverse();
    const hPanel = el('div', 'panel');
    hPanel.appendChild(el('h2', null, 'สิบวันล่าสุด'));
    if (!hist.length) {
      hPanel.appendChild(el('div', 'empty', 'ยังไม่มีประวัติการทบทวน'));
    } else {
      const tb = el('table', 'keys');
      hist.forEach(row => {
        const tr = el('tr', null,
          '<td class="mono">' + row.d + '</td>' +
          '<td>' + row.n + ' ครั้ง · ตอบได้เต็ม ' + Math.round(row.ok / row.n * 100) + '%</td>');
        tb.appendChild(tr);
      });
      hPanel.appendChild(tb);
    }
    body.appendChild(hPanel);
  }

  /* ---------------- ตั้งค่า ---------------- */

  function renderSettings() {
    $('#newPerDay').value = store.settings.newPerDay;
    const seen = ALL.filter(q => Recall.isSeen(recOf(q.id))).length;
    rollDaily();
    $('#storeInfo').textContent =
      'บันทึกไว้ในเบราว์เซอร์นี้ · มีข้อมูลของ ' + seen + ' ข้อ · วันนี้ทบทวนข้อใหม่ไปแล้ว ' +
      store.daily.newDone + ' ข้อ';
  }

  $('#newPerDay').addEventListener('change', e => {
    const n = parseInt(e.target.value, 10);
    store.settings.newPerDay = isNaN(n) ? 15 : Math.max(0, Math.min(200, n));
    e.target.value = store.settings.newPerDay;
    save();
    toast('บันทึกแล้ว');
  });

  $('#exportBtn').addEventListener('click', () => {
    const data = JSON.stringify(store, null, 2);
    const name = 'resp-recall-' + todayKey() + '.json';
    let downloaded = false;
    try {
      const url = URL.createObjectURL(new Blob([data], { type: 'application/json' }));
      const a = document.createElement('a');
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      downloaded = true;
    } catch (e) { /* บางโฮสต์บล็อกการดาวน์โหลดที่หน้าเว็บสั่งเอง */ }

    /* สำรองไว้เสมอ: แสดงข้อความให้คัดลอกเองได้ */
    const box = $('#exportBox');
    box.hidden = false;
    box.value = data;
    box.select();
    toast(downloaded ? 'ส่งออกเป็นไฟล์แล้ว' : 'คัดลอกข้อความในกล่องด้านล่างไปเก็บไว้ได้');
  });

  $('#importBtn').addEventListener('click', () => $('#importFile').click());
  $('#importFile').addEventListener('change', e => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!data || typeof data.progress !== 'object') throw new Error('รูปแบบไม่ถูกต้อง');
        localStorage.setItem(STORE_KEY, JSON.stringify(data));
        store = load();
        toast('นำเข้าความคืบหน้าแล้ว');
        go('home');
      } catch (err) {
        toast('ไฟล์ไม่ถูกต้อง — ต้องเป็นไฟล์ที่ส่งออกจากเว็บนี้');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  });

  $('#resetBtn').addEventListener('click', () => {
    if (!confirm('ล้างความคืบหน้าทั้งหมดในเบราว์เซอร์นี้? ย้อนกลับไม่ได้')) return;
    store = defaults();
    save();
    toast('ล้างความคืบหน้าแล้ว');
    go('home');
  });

  /* ---------------- เริ่มทำงาน ---------------- */

  rollDaily();
  go('home');
  addEventListener('resize', drawWave);
})();
