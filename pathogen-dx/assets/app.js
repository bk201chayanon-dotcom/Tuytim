/* ------------------------------------------------------------------
 * app.js — ตัวควบคุมหน้าเว็บ Pathogen Dx Recall
 *
 * โหมด
 *   card   อ่านอาการแล้วนึกชื่อเชื้อ → ดูคำตอบ → ให้คะแนนตัวเอง
 *   quiz   เลือกเชื้อจาก 5 ตัวเลือกแบบข้อสอบ (ตัวลวงมาจากหัวข้อเดียวกันก่อน)
 *   list   รายการทั้งหมดพร้อมค้นหา ใช้ทวนก่อนสอบ
 *
 * ความคืบหน้า (จำได้ / ยังไม่แม่น) เก็บใน localStorage ของเบราว์เซอร์นี้
 * ------------------------------------------------------------------ */

(() => {
  'use strict';

  const STORE_KEY = 'pathogen-dx:v1';
  const MODES = ['card', 'quiz', 'list'];
  const LETTERS = 'ABCDE';

  const $ = (sel, root = document) => root.querySelector(sel);
  const strip = html => String(html || '').replace(/<[^>]*>/g, ' ')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ').trim();
  const esc = s => String(s).replace(/[&<>"]/g, m =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));

  function shuffle(list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /* ---------- คลังการ์ด: แปลง PDX_DECKS เป็นรายการแบน ---------- */

  const DECK_BY_ID = Object.fromEntries(PDX_DECKS.map(d => [d.id, d]));
  const CARDS = [];
  PDX_DECKS.forEach(deck => {
    deck.cards.forEach((c, i) => {
      CARDS.push({
        ...c,
        deck: deck.id,
        no: `${deck.code}·${String(i + 1).padStart(2, '0')}`,
        groupName: deck.groups[c.g],
        // เชื้อเดียวกันใช้ key เดียวกัน เพื่อไม่ให้โผล่เป็นตัวลวงของกันและกัน
        key: (c.k || strip(c.opt || c.org)).toLowerCase(),
        plain: strip([c.clue, c.org, c.opt, c.tax, ...PDX_FACTS.map(([f]) => c[f]),
          ...(c.keys || []), ...(c.exam || [])].join(' ')).toLowerCase()
      });
    });
  });
  const CARD_BY_ID = Object.fromEntries(CARDS.map(c => [c.id, c]));

  /* ---------- ข้อมูลที่บันทึกไว้ ---------- */

  const defaults = () => ({ status: {}, deck: 'viral', mode: 'card', shuffle: true });
  let db = load();

  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) return { ...defaults(), ...JSON.parse(raw) };
    } catch (e) { /* โหมดส่วนตัวหรือข้อมูลเสียหาย → เริ่มใหม่ */ }
    return defaults();
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(db)); }
    catch (e) { /* เขียนไม่ได้ก็ยังใช้งานต่อได้ในรอบนี้ */ }
  }

  const statusOf = id => db.status[id] || 'new';

  function setStatus(id, value) {
    db.status[id] = value;
    save();
  }

  /* ---------- สถานะของหน้า ---------- */

  const ui = {
    deck: db.deck === 'all' || DECK_BY_ID[db.deck] ? db.deck : 'viral',
    mode: MODES.includes(db.mode) ? db.mode : 'card',
    group: 'all',
    examOnly: false,
    weakOnly: false,
    query: ''
  };

  function pool() {
    return CARDS.filter(c =>
      (ui.deck === 'all' || c.deck === ui.deck) &&
      (ui.group === 'all' || c.g === ui.group) &&
      (!ui.examOnly || (c.exam && c.exam.length > 0)) &&
      (!ui.weakOnly || statusOf(c.id) !== 'known'));
  }

  const examText = list => list
    .map(e => { const [set, n] = e.split('-'); return `${set} ข้อ ${n}`; })
    .join(' · ');

  /* ---------- ชิ้นส่วนการ์ดที่ใช้ร่วมกัน ---------- */

  function labelHTML(c) {
    const deck = DECK_BY_ID[c.deck];
    const st = statusOf(c.id);
    const tags = [
      c.exam ? `<span class="tag tag-exam" title="เชื้อนี้เคยเป็นคำตอบในโจทย์เก่า">★ ${examText(c.exam)}</span>` : '',
      c.hl ? '<span class="tag" title="ข้อความนี้ถูกไฮไลต์ไว้ในชีท">✎ ไฮไลต์ในชีท</span>' : '',
      st === 'known' ? '<span class="tag tag-known">✓ จำได้</span>' : '',
      st === 'again' ? '<span class="tag tag-again">↺ ยังไม่แม่น</span>' : ''
    ].join('');
    return `
      <div class="label">
        <span class="label-deck">${deck.name}</span>
        <span class="label-no">${c.no}</span>
        <span class="label-group">${esc(c.groupName)}</span>
        <span class="label-tags">${tags}</span>
      </div>`;
  }

  function sourceHTML(c) {
    const exam = c.exam ? ` · ★ โจทย์เก่า ${examText(c.exam)}` : '';
    return `<p class="src">${esc(DECK_BY_ID[c.deck].lecture)} · ${esc(c.src)}${exam}</p>`;
  }

  // เนื้อหาการ์ดมาจาก cards.js ของเราเอง จึงแทรกเป็น HTML ได้ตรง ๆ

  /* กล่องข้อมูล โรค · อาการ · Sign · พาหะ · ที่พบ — แสดงเฉพาะช่องที่การ์ดมีข้อมูล */
  function factsHTML(c, skip = []) {
    const rows = PDX_FACTS
      .filter(([f]) => c[f] && !skip.includes(f))
      .map(([f, name, sub]) => `
        <div class="fact fact-${f}"><dt>${name}<small>${sub}</small></dt><dd>${c[f]}</dd></div>`)
      .join('');
    return rows ? `<dl class="facts">${rows}</dl>` : '';
  }

  const keysHTML = c => c.keys && c.keys.length
    ? `<ul class="keys" aria-label="ข้อมูลสำคัญที่มักออกสอบ">${c.keys.map(k => `<li>${k}</li>`).join('')}</ul>`
    : '';

  function answerHTML(c) {
    return `
      <div class="answer">
        <div class="org-block">
          <p class="org">${c.org}</p>
          ${c.tax ? `<p class="tax">${c.tax}</p>` : ''}
        </div>
        ${factsHTML(c)}
        ${keysHTML(c)}
        ${sourceHTML(c)}
      </div>`;
  }

  function trackHTML(good, bad, total) {
    const pct = n => total ? (n / total * 100).toFixed(2) : 0;
    return `<span class="track" aria-hidden="true"><i class="k" style="width:${pct(good)}%"></i><i class="a" style="width:${pct(bad)}%"></i></span>`;
  }

  function emptyHTML() {
    return `
      <section class="panel">
        <h2>ไม่มีการ์ดตามตัวกรองนี้</h2>
        <p>ลองเลือกหัวข้ออื่น หรือปิดตัวกรอง “เฉพาะที่เคยออกสอบ” / “เฉพาะที่ยังไม่แม่น”</p>
        <div class="actions"><button type="button" class="btn btn-primary" data-act="clear" data-autofocus>ล้างตัวกรอง</button></div>
      </section>`;
  }

  /* หลังวาดใหม่ ถ้าผู้ใช้กำลังโฟกัสอยู่ในส่วนนี้ ให้โฟกัสปุ่มหลักต่อ (ใช้แป้นพิมพ์ต่อได้) */
  function paint(view, html) {
    const hadFocus = view.contains(document.activeElement);
    view.innerHTML = html;
    if (hadFocus) {
      const target = view.querySelector('[data-autofocus]');
      if (target) target.focus({ preventScroll: true });
    }
  }

  /* ---------- โหมดการ์ด ---------- */

  const run = { queue: [], i: 0, shown: false, results: {} };

  function startRun(cards) {
    run.queue = db.shuffle ? shuffle(cards) : cards.slice();
    run.i = 0;
    run.shown = false;
    run.results = {};
    renderCard();
  }

  function renderCard() {
    const view = $('#cardView');
    const total = run.queue.length;
    if (!total) { paint(view, emptyHTML()); return; }
    if (run.i >= total) { paint(view, roundEndHTML()); return; }

    const c = run.queue[run.i];
    const results = Object.values(run.results);
    const good = results.filter(v => v === true).length;
    const bad = results.filter(v => v === false).length;

    const grade = run.shown
      ? `<button type="button" class="btn btn-again" data-act="again">↺ ยังไม่แม่น <kbd>1</kbd></button>
         <button type="button" class="btn btn-known" data-act="known" data-autofocus>✓ จำได้ <kbd>2</kbd></button>`
      : `<button type="button" class="btn btn-primary" data-act="reveal" data-autofocus>ดูคำตอบ <kbd>Space</kbd></button>`;

    paint(view, `
      <div class="runbar">
        <span>${run.i + 1} / ${total}</span>
        ${trackHTML(good, bad, total)}
        <span>✓ ${good} · ↺ ${bad}</span>
      </div>
      <article class="slide d-${c.deck}" aria-label="การ์ด ${c.no}">
        ${labelHTML(c)}
        <div class="glass">
          <p class="eyebrow">อาการ · keyword</p>
          <div class="clue">${c.clue}</div>
          ${run.shown ? answerHTML(c) : ''}
          <div class="actions">
            ${grade}
            <span class="spacer"></span>
            <button type="button" class="btn btn-ghost" data-act="prev" aria-label="การ์ดก่อนหน้า" ${run.i === 0 ? 'disabled' : ''}>←</button>
            <button type="button" class="btn btn-ghost" data-act="skip">ข้าม →</button>
          </div>
        </div>
      </article>`);
  }

  function roundEndHTML() {
    const good = run.queue.filter(c => run.results[c.id] === true).length;
    const bad = run.queue.filter(c => run.results[c.id] === false).length;
    const skipped = run.queue.length - good - bad;
    const left = bad + skipped;
    return `
      <section class="panel">
        <h2>จบรอบแล้ว ${run.queue.length} ใบ</h2>
        <div class="tally">
          <div class="is-known"><b>${good}</b><span>จำได้</span></div>
          <div><b>${bad}</b><span>ยังไม่แม่น</span></div>
          <div><b>${skipped}</b><span>ข้าม</span></div>
        </div>
        <div class="actions">
          ${left ? `<button type="button" class="btn btn-primary" data-act="retry" data-autofocus>ทวนอีกรอบเฉพาะ ${left} ใบที่ยังไม่แม่นหรือข้าม</button>` : ''}
          <button type="button" class="btn" data-act="restart" ${left ? '' : 'data-autofocus'}>เริ่มใหม่ทั้งชุด</button>
        </div>
      </section>`;
  }

  function cardAct(act) {
    const c = run.queue[run.i];
    switch (act) {
      case 'reveal':
        if (!c || run.shown) return;
        run.shown = true;
        break;
      case 'again':
      case 'known':
        if (!c || !run.shown) return;
        run.results[c.id] = act === 'known';
        setStatus(c.id, act);
        run.i++;
        run.shown = false;
        renderDecks();
        break;
      case 'prev':
        if (run.i === 0) return;
        run.i--;
        run.shown = false;
        break;
      case 'skip':
        if (!c) return;
        run.i++;
        run.shown = false;
        break;
      case 'retry':
        startRun(run.queue.filter(x => run.results[x.id] !== true));
        return;
      case 'restart':
        startRun(pool());
        return;
      case 'clear':
        clearFilters();
        return;
      default:
        return;
    }
    renderCard();
  }

  /* ---------- โหมด 5 ตัวเลือก ---------- */

  const quiz = { queue: [], i: 0, options: [], picked: null, right: 0, done: 0, missed: [] };

  function buildOptions(card) {
    const seen = new Set([card.key]);
    const sameGroup = [];
    const others = [];
    shuffle(CARDS.filter(c => c.deck === card.deck && c.mcq !== false)).forEach(c => {
      if (seen.has(c.key)) return;
      seen.add(c.key);
      (c.g === card.g ? sameGroup : others).push(c);
    });
    const picks = sameGroup.concat(others).slice(0, 4);
    return shuffle([card, ...picks]).map(c => ({ html: c.opt || c.org, correct: c === card }));
  }

  function startQuiz(cards) {
    const eligible = cards.filter(c => c.mcq !== false);
    quiz.queue = db.shuffle ? shuffle(eligible) : eligible;
    quiz.i = 0;
    quiz.picked = null;
    quiz.right = 0;
    quiz.done = 0;
    quiz.missed = [];
    quiz.options = quiz.queue.length ? buildOptions(quiz.queue[0]) : [];
    renderQuiz();
  }

  function renderQuiz() {
    const view = $('#quizView');
    const total = quiz.queue.length;
    if (!total) { paint(view, emptyHTML()); return; }
    if (quiz.i >= total) { paint(view, quizEndHTML()); return; }

    const c = quiz.queue[quiz.i];
    const answered = quiz.picked !== null;
    const options = quiz.options.map((o, i) => {
      const state = !answered ? '' : o.correct ? 'is-correct' : i === quiz.picked ? 'is-wrong' : 'is-dim';
      return `
        <li><button type="button" class="opt ${state}" data-opt="${i}" ${answered ? 'disabled' : ''}>
          <span class="letter">${LETTERS[i]}</span><span class="opt-name">${o.html}</span>
        </button></li>`;
    }).join('');

    paint(view, `
      <div class="runbar">
        <span>ข้อ ${quiz.i + 1} / ${total}</span>
        ${trackHTML(quiz.right, quiz.done - quiz.right, total)}
        <span>ถูก ${quiz.right} / ${quiz.done}</span>
      </div>
      <article class="slide d-${c.deck}" aria-label="ข้อ ${quiz.i + 1}" tabindex="-1" ${answered ? '' : 'data-autofocus'}>
        ${labelHTML(c)}
        <div class="glass">
          <p class="eyebrow">เลือกเชื้อที่ตรงที่สุด</p>
          <div class="clue">${c.clue}</div>
          <ol class="options">${options}</ol>
          ${answered ? answerHTML(c) : ''}
          ${answered ? `<div class="actions"><button type="button" class="btn btn-primary" data-act="next" data-autofocus>${quiz.i + 1 < total ? 'ข้อต่อไป' : 'ดูคะแนน'} <kbd>Enter</kbd></button></div>` : ''}
        </div>
      </article>`);
  }

  function quizEndHTML() {
    const pct = quiz.done ? Math.round(quiz.right / quiz.done * 100) : 0;
    return `
      <section class="panel">
        <h2>ได้ ${quiz.right} จาก ${quiz.done} ข้อ (${pct}%)</h2>
        <div class="tally">
          <div class="is-known"><b>${quiz.right}</b><span>ตอบถูก</span></div>
          <div><b>${quiz.done - quiz.right}</b><span>ตอบผิด</span></div>
          <div><b>${quiz.queue.length}</b><span>ข้อทั้งหมด</span></div>
        </div>
        <div class="actions">
          ${quiz.missed.length ? `<button type="button" class="btn btn-primary" data-act="quiz-missed" data-autofocus>ทำใหม่เฉพาะ ${quiz.missed.length} ข้อที่ผิด</button>` : ''}
          <button type="button" class="btn" data-act="quiz-restart" ${quiz.missed.length ? '' : 'data-autofocus'}>สุ่มชุดใหม่</button>
        </div>
      </section>`;
  }

  function pick(i) {
    const c = quiz.queue[quiz.i];
    if (!c || quiz.picked !== null || !quiz.options[i]) return;
    const correct = quiz.options[i].correct;
    quiz.picked = i;
    quiz.done++;
    if (correct) quiz.right++;
    else quiz.missed.push(c);
    setStatus(c.id, correct ? 'known' : 'again');
    renderQuiz();
    renderDecks();
  }

  function quizAct(act) {
    switch (act) {
      case 'next':
        if (quiz.picked === null) return;
        quiz.i++;
        quiz.picked = null;
        quiz.options = quiz.i < quiz.queue.length ? buildOptions(quiz.queue[quiz.i]) : [];
        renderQuiz();
        break;
      case 'quiz-missed':
        startQuiz(quiz.missed);
        break;
      case 'quiz-restart':
        startQuiz(pool());
        break;
      case 'clear':
        clearFilters();
        break;
    }
  }

  /* ---------- โหมดรายการ ---------- */

  function rowHTML(c) {
    const st = statusOf(c.id);
    const label = st === 'known' ? 'จำได้' : st === 'again' ? 'ยังไม่แม่น' : 'ยังไม่ได้ทวน';
    const meta = `${c.exam ? '★ ' : ''}${c.hl ? '✎ ' : ''}${c.no}`;
    return `
      <details class="row d-${c.deck}">
        <summary>
          <span class="status-dot ${st}" role="img" aria-label="${label}" title="${label}"></span>
          <span class="row-main"><span class="row-org">${c.org}</span><span class="row-dz">${c.dz}</span></span>
          <span class="row-meta">${meta}</span>
        </summary>
        <div class="row-body">
          <div class="clue">${c.clue}</div>
          ${c.tax ? `<p class="tax">${c.tax}</p>` : ''}
          ${factsHTML(c, ['dz'])}
          ${keysHTML(c)}
          ${sourceHTML(c)}
        </div>
      </details>`;
  }

  function renderList() {
    const q = ui.query.trim().toLowerCase();
    const cards = pool().filter(c => !q || c.plain.includes(q));
    $('#listCount').textContent = `${cards.length} ใบ`;

    if (!cards.length) {
      $('#rows').innerHTML = `<p class="empty-note">ไม่พบการ์ดที่ตรงกับ “${esc(ui.query)}”</p>`;
      return;
    }

    const html = [];
    PDX_DECKS.forEach(deck => {
      Object.entries(deck.groups).forEach(([g, name]) => {
        const items = cards.filter(c => c.deck === deck.id && c.g === g);
        if (!items.length) return;
        const title = ui.deck === 'all' ? `${deck.name} · ${name}` : name;
        html.push(`<h3 class="list-group d-${deck.id}">${esc(title)}</h3><div class="rows">${items.map(rowHTML).join('')}</div>`);
      });
    });
    $('#rows').innerHTML = html.join('');
  }

  /* ---------- สำรับ หัวข้อ ตัวกรอง ---------- */

  function deckStats(deckId) {
    const cards = deckId === 'all' ? CARDS : CARDS.filter(c => c.deck === deckId);
    const known = cards.filter(c => statusOf(c.id) === 'known').length;
    return { total: cards.length, known };
  }

  function renderDecks() {
    const tabs = [...PDX_DECKS.map(d => ({ id: d.id, name: d.name, th: d.th })), { id: 'all', name: 'ทั้งหมด', th: '' }];
    $('#decks').innerHTML = tabs.map(t => {
      const s = deckStats(t.id);
      const pct = s.total ? (s.known / s.total * 100).toFixed(1) : 0;
      return `
        <button type="button" role="tab" class="deck-tab d-${t.id}" data-deck="${t.id}" aria-selected="${ui.deck === t.id}">
          <span class="deck-dot" aria-hidden="true"></span>
          <span class="deck-name">${t.name}${t.th ? `<small>${t.th}</small>` : ''}</span>
          <span class="deck-meter" aria-hidden="true"><i style="width:${pct}%"></i></span>
          <span class="deck-count">จำได้ ${s.known} / ${s.total}</span>
        </button>`;
    }).join('');
  }

  function renderChips() {
    const chips = $('#chips');
    if (ui.deck === 'all') { chips.innerHTML = ''; return; }
    const deck = DECK_BY_ID[ui.deck];
    const count = g => deck.cards.filter(c => g === 'all' || c.g === g).length;
    const items = [['all', 'ทุกหัวข้อ'], ...Object.entries(deck.groups)];
    chips.innerHTML = items.map(([g, name]) =>
      `<button type="button" class="chip" data-group="${g}" aria-pressed="${ui.group === g}">${esc(name)}<span class="n">${count(g)}</span></button>`
    ).join('');
  }

  function renderToolbar() {
    $('#app').className = `app d-${ui.deck}`;
    MODES.forEach(m => {
      const tab = $(`#mode-${m}`);
      tab.setAttribute('aria-selected', String(ui.mode === m));
      $(`#${m}View`).hidden = ui.mode !== m;
    });
    $('#examOnly').setAttribute('aria-pressed', String(ui.examOnly));
    $('#weakOnly').setAttribute('aria-pressed', String(ui.weakOnly));
    $('#shuffle').setAttribute('aria-pressed', String(db.shuffle));
    $('#shuffle').hidden = ui.mode === 'list';
    $('#shownCount').textContent = ui.mode === 'list' ? '' : `${pool().length} ใบตามตัวกรอง`;
    const deckName = ui.deck === 'all' ? 'ทุกสำรับ' : `สำรับ ${DECK_BY_ID[ui.deck].name}`;
    $('#resetBtn').textContent = `ล้างความคืบหน้าของ${deckName}`;
  }

  /* เริ่มเซสชันใหม่ของโหมดปัจจุบันจากตัวกรองล่าสุด */
  function refresh() {
    renderToolbar();
    if (ui.mode === 'card') startRun(pool());
    else if (ui.mode === 'quiz') startQuiz(pool());
    else renderList();
  }

  function clearFilters() {
    ui.group = 'all';
    ui.examOnly = false;
    ui.weakOnly = false;
    renderChips();
    refresh();
  }

  /* ---------- เหตุการณ์ ---------- */

  /* คลิกด้วยเมาส์/นิ้วบนแถบเครื่องมือแล้วปล่อยโฟกัส เพื่อให้ Space / Enter
     ไปที่การ์ดแทนการกดปุ่มเดิมซ้ำ (ผู้ใช้แป้นพิมพ์ e.detail = 0 ยังคงโฟกัสไว้) */
  function releasePointerFocus(e) {
    if (e.detail > 0 && document.activeElement && document.activeElement.blur) document.activeElement.blur();
  }

  $('#decks').addEventListener('click', e => {
    releasePointerFocus(e);
    const tab = e.target.closest('[data-deck]');
    if (!tab || tab.dataset.deck === ui.deck) return;
    ui.deck = tab.dataset.deck;
    ui.group = 'all';
    db.deck = ui.deck;
    save();
    renderDecks();
    renderChips();
    $('#chips').scrollLeft = 0;
    refresh();
  });

  $('#modes').addEventListener('click', e => {
    releasePointerFocus(e);
    const tab = e.target.closest('[data-mode]');
    if (!tab || tab.dataset.mode === ui.mode) return;
    ui.mode = tab.dataset.mode;
    db.mode = ui.mode;
    save();
    refresh();
  });

  $('#chips').addEventListener('click', e => {
    releasePointerFocus(e);
    const chip = e.target.closest('[data-group]');
    if (!chip || chip.dataset.group === ui.group) return;
    ui.group = chip.dataset.group;
    renderChips();
    refresh();
  });

  $('#examOnly').addEventListener('click', e => { releasePointerFocus(e); ui.examOnly = !ui.examOnly; refresh(); });
  $('#weakOnly').addEventListener('click', e => { releasePointerFocus(e); ui.weakOnly = !ui.weakOnly; refresh(); });
  $('#shuffle').addEventListener('click', e => { releasePointerFocus(e); db.shuffle = !db.shuffle; save(); refresh(); });

  $('#cardView').addEventListener('click', e => {
    const btn = e.target.closest('[data-act]');
    if (btn) { cardAct(btn.dataset.act); return; }
    // แตะที่ตัวการ์ดเพื่อดูคำตอบ (สะดวกบนมือถือ) — ไม่นับการลากเลือกข้อความ
    const selecting = String(window.getSelection ? window.getSelection() : '').length > 0;
    if (!run.shown && !selecting && e.target.closest('.slide')) cardAct('reveal');
  });

  $('#quizView').addEventListener('click', e => {
    const opt = e.target.closest('[data-opt]');
    if (opt) { pick(Number(opt.dataset.opt)); return; }
    const btn = e.target.closest('[data-act]');
    if (btn) quizAct(btn.dataset.act);
  });

  $('#search').addEventListener('input', e => {
    ui.query = e.target.value;
    renderList();
  });

  let resetTimer = 0;
  $('#resetBtn').addEventListener('click', e => {
    const btn = e.currentTarget;
    if (!btn.hasAttribute('data-armed')) {
      btn.setAttribute('data-armed', '');
      btn.textContent = 'กดอีกครั้งเพื่อยืนยันการล้าง';
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => { btn.removeAttribute('data-armed'); renderToolbar(); }, 4000);
      return;
    }
    clearTimeout(resetTimer);
    btn.removeAttribute('data-armed');
    CARDS.forEach(c => { if (ui.deck === 'all' || c.deck === ui.deck) delete db.status[c.id]; });
    save();
    renderDecks();
    refresh();
  });

  document.addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.target.closest('input, textarea, select, summary')) return;
    // Space / Enter บนปุ่มที่โฟกัสอยู่ ให้เบราว์เซอร์กดปุ่มนั้นเอง
    const onButton = !!e.target.closest('button');
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    const confirmKey = key === ' ' || key === 'Enter';

    if (ui.mode === 'card') {
      if (run.i >= run.queue.length) return;
      if (confirmKey && !onButton) {
        e.preventDefault();
        cardAct(run.shown ? 'known' : 'reveal');
      } else if (key === '1' && run.shown) cardAct('again');
      else if (key === '2' && run.shown) cardAct('known');
      else if (key === 'ArrowRight') cardAct('skip');
      else if (key === 'ArrowLeft') cardAct('prev');
    } else if (ui.mode === 'quiz') {
      if (quiz.i >= quiz.queue.length) return;
      const index = 'abcde'.indexOf(key) >= 0 ? 'abcde'.indexOf(key) : '12345'.indexOf(key);
      if (quiz.picked === null && index >= 0 && key !== ' ') pick(index);
      else if (quiz.picked !== null && ((confirmKey && !onButton) || key === 'ArrowRight')) {
        e.preventDefault();
        quizAct('next');
      }
    }
  });

  /* ---------- เริ่มต้น ---------- */

  function start(saved) {
    const examCount = new Set(CARDS.flatMap(c => c.exam || [])).size;
    $('#library').textContent = `${CARDS.length} การ์ด · ครอบคลุมโจทย์เก่า ${examCount} ข้อ`;

    if (saved && saved.ui) Object.assign(ui, saved.ui);
    renderDecks();
    renderChips();
    renderToolbar();

    const restored = saved && saved.run && saved.run.ids && saved.run.ids.every(id => CARD_BY_ID[id]);
    if (ui.mode === 'card' && restored) {
      run.queue = saved.run.ids.map(id => CARD_BY_ID[id]);
      run.i = saved.run.i || 0;
      run.shown = !!saved.run.shown;
      run.results = saved.run.results || {};
      renderCard();
    } else {
      refresh();
    }
  }

  // ให้หน้าที่เปิดค้างไว้ไม่เสียตำแหน่งการทบทวนเมื่อมีการอัปเดตเวอร์ชัน
  const hot = window.claude && window.claude.hot;
  if (hot && hot.snapshot) {
    hot.snapshot(() => ({
      ui: { ...ui },
      run: { ids: run.queue.map(c => c.id), i: run.i, shown: run.shown, results: run.results }
    }));
  }
  if (hot && hot.ready) hot.ready(start);
  else start((hot && hot.data) || {});
})();
