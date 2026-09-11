/* ------------------------------------------------------------------
 * app.js — เชื่อม UI เข้ากับ Game: สลับหน้า, เล่นเกม, กระดานคะแนน, คลังเรื่อง
 * ------------------------------------------------------------------ */

(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const views = { home: $('#homeView'), play: $('#playView'), result: $('#resultView'), board: $('#boardView'), archive: $('#archiveView') };

  function goto(name) {
    Object.values(views).forEach(v => v.classList.remove('on'));
    views[name].classList.add('on');
    $$('.nav button').forEach(b => b.classList.toggle('on', b.dataset.go === name));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (name === 'home') refreshHome();
    if (name === 'board') renderBoard();
    if (name === 'archive') renderArchive();
  }

  $$('.nav button').forEach(b => b.addEventListener('click', () => goto(b.dataset.go)));
  $('#brand').addEventListener('click', () => goto('home'));

  // ---------- ธีมสว่าง/มืด ----------
  const THEME_KEY = 'guessAnime.theme';
  function applyTheme(t) {
    if (t) document.documentElement.setAttribute('data-theme', t);
    else document.documentElement.removeAttribute('data-theme');
  }
  applyTheme(localStorage.getItem(THEME_KEY));
  $('#themeBtn').addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const next = cur === 'dark' ? 'light' : cur === 'light' ? null : (sysDark ? 'light' : 'dark');
    if (next) localStorage.setItem(THEME_KEY, next); else localStorage.removeItem(THEME_KEY);
    applyTheme(next);
  });

  // ---------- หน้าแรก / ตั้งค่า ----------
  let setup = { mode: 'type', tier: 0, len: 10 };

  function segWire(id, key, parse) {
    const seg = $('#' + id);
    seg.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      $$('button', seg).forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      setup[key] = parse(btn.dataset[key]);
      refreshHome();
    });
  }
  segWire('modeSeg', 'mode', v => v);
  segWire('tierSeg', 'tier', v => Number(v));
  segWire('lenSeg', 'len', v => Number(v));

  function refreshHome() {
    const tier = setup.tier || null;
    const stats = Game.poolStats(tier);
    $('#poolTotal').textContent = stats.total;
    $('#poolLeft').textContent = stats.left;
    $('#poolUsed').textContent = stats.used;
    const warn = $('#poolWarn');
    if (stats.left < setup.len) {
      warn.hidden = false;
      warn.textContent = stats.left === 0
        ? 'เรื่องในระดับนี้ถูกถามครบหมดแล้ว กดล้างประวัติเพื่อเริ่มสุ่มใหม่ได้ทั้งหมด หรือเริ่มเล่นต่อได้เลย (ระบบจะเริ่มดึงเรื่องเก่ากลับมาให้)'
        : `เหลือให้สุ่มไม่ครบ ${setup.len} เรื่อง ระบบจะเติมเรื่องที่เคยออกแล้วมาให้เมื่อของใหม่หมด`;
    } else {
      warn.hidden = true;
    }
  }

  $('#resetPoolBtn').addEventListener('click', () => {
    if (!confirm('ล้างประวัติเรื่องที่เคยออกแล้วทั้งหมด? รอบถัดไปจะสุ่มได้ครบทุกเรื่องอีกครั้ง')) return;
    Game.resetUsedPool();
    refreshHome();
  });

  // ---------- สถานะรอบปัจจุบัน ----------
  let round = null; // { items, idx, score, hintsUsed, worth, answered, log, playerName, mode, tier }

  $('#startBtn').addEventListener('click', () => {
    const name = $('#playerName').value.trim() || 'ผู้เล่นนิรนาม';
    const { items } = Game.pickRound(setup.tier || null, setup.len);
    if (!items.length) {
      alert('ไม่มีเรื่องให้เล่นในระดับนี้ ลองเปลี่ยนระดับความยากดู');
      return;
    }
    round = {
      items, idx: 0, score: 0, playerName: name, mode: setup.mode, tier: setup.tier,
      hintsUsed: 0, log: [],
    };
    goto('play');
    renderQuestion();
  });

  function currentEntry() { return round.items[round.idx]; }

  function renderQuestion() {
    const entry = currentEntry();
    round.hintsUsed = 0;
    round.revealed = 1;
    round.answered = false;

    $('#qNo').textContent = `${round.idx + 1}/${round.items.length}`;
    $('#scoreVal').textContent = round.score;
    $('#whoVal').textContent = round.playerName;
    $('#qMeta').textContent = `ระดับ: ${tierLabel(entry.tier)} · แนว: ${entry.genre}`;
    updateWorth();

    renderClues();

    $('#verdict').hidden = true;
    $('#nextBtn').hidden = true;
    $('#hintBtn').disabled = false;
    $('#skipBtn').disabled = false;

    const typeBox = $('#typeBox');
    const choiceBox = $('#choiceBox');
    if (round.mode === 'choice') {
      typeBox.hidden = true;
      choiceBox.hidden = false;
      renderChoices(entry);
    } else {
      typeBox.hidden = false;
      choiceBox.hidden = true;
      const input = $('#answerInput');
      input.value = '';
      input.disabled = false;
      setTimeout(() => input.focus(), 50);
    }
  }

  function tierLabel(t) {
    return t === 1 ? 'ดังระดับโลก' : t === 2 ? 'รู้จักทั่วไป' : 'สายลึก';
  }

  function renderClues() {
    const entry = currentEntry();
    const list = $('#clueList');
    list.innerHTML = '';
    for (let i = 0; i < round.revealed; i++) {
      const li = document.createElement('li');
      const num = document.createElement('span');
      num.className = 'num';
      num.textContent = `#${i + 1}`;
      const txt = document.createElement('span');
      txt.textContent = entry.clues[i];
      li.appendChild(num);
      li.appendChild(txt);
      list.appendChild(li);
    }
  }

  function updateWorth() {
    round.worth = Game.worthAfterHints(round.hintsUsed);
    $('#worthVal').textContent = round.worth;
  }

  function renderChoices(entry) {
    const box = $('#choiceBox');
    box.innerHTML = '';
    const choices = Game.makeChoices(entry, round.tier || null);
    choices.forEach(c => {
      const btn = document.createElement('button');
      btn.textContent = c.title;
      btn.addEventListener('click', () => submitChoice(c, btn, choices));
      box.appendChild(btn);
    });
  }

  $('#hintBtn').addEventListener('click', () => {
    const entry = currentEntry();
    if (round.answered) return;
    if (round.revealed >= entry.clues.length) return;
    round.revealed += 1;
    round.hintsUsed += 1;
    updateWorth();
    renderClues();
    if (round.revealed >= entry.clues.length) $('#hintBtn').disabled = true;
  });

  $('#skipBtn').addEventListener('click', () => finishQuestion(false, null));

  $('#submitBtn').addEventListener('click', submitTyped);
  $('#answerInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submitTyped();
  });

  function submitTyped() {
    if (round.answered) return;
    const val = $('#answerInput').value;
    const entry = currentEntry();
    const ok = Game.checkAnswer(entry, val);
    finishQuestion(ok, val);
  }

  function submitChoice(choice, btn, allButtons) {
    if (round.answered) return;
    const entry = currentEntry();
    const ok = choice.id === entry.id;
    const boxButtons = $$('#choiceBox button');
    boxButtons.forEach((b, i) => {
      b.disabled = true;
      if (allButtons[i].id === entry.id) b.classList.add('pick-correct');
    });
    if (!ok) btn.classList.add('pick-wrong');
    finishQuestion(ok, choice.title);
  }

  function finishQuestion(ok, userAnswer) {
    if (round.answered) return;
    round.answered = true;
    const entry = currentEntry();
    const pts = ok ? round.worth : 0;
    round.score += pts;
    round.log.push({ entry, ok, userAnswer, pts });

    $('#hintBtn').disabled = true;
    $('#skipBtn').disabled = true;
    if (round.mode === 'type') $('#answerInput').disabled = true;

    // เผยคำใบ้ที่เหลือทั้งหมดเมื่อจบคำถาม
    round.revealed = entry.clues.length;
    renderClues();

    const v = $('#verdict');
    v.hidden = false;
    v.className = 'verdict ' + (ok ? 'ok' : 'no');
    v.innerHTML = ok
      ? `ถูกต้อง! ได้ <b>${pts}</b> คะแนน`
      : `ไม่ถูกต้อง`;
    const ansLine = document.createElement('span');
    ansLine.className = 'ans';
    ansLine.textContent = `คำตอบคือ ${entry.title}`;
    v.appendChild(ansLine);

    $('#scoreVal').textContent = round.score;
    $('#nextBtn').hidden = false;
    $('#nextBtn').focus();
  }

  $('#nextBtn').addEventListener('click', nextQuestion);
  document.addEventListener('keydown', (e) => {
    if (!views.play.classList.contains('on')) return;
    if (e.key === 'Enter' && round && round.answered) { nextQuestion(); return; }
    if (e.target.tagName === 'INPUT') return;
    if ((e.key === 'h' || e.key === 'H') && round && !round.answered) $('#hintBtn').click();
    if ((e.key === 's' || e.key === 'S') && round && !round.answered) $('#skipBtn').click();
  });

  function nextQuestion() {
    round.idx += 1;
    if (round.idx >= round.items.length) {
      finishRound();
    } else {
      renderQuestion();
    }
  }

  function finishRound() {
    const total = round.items.length;
    const correct = round.log.filter(l => l.ok).length;
    const perQuestion = Math.round(round.score / total);

    $('#finalScore').textContent = round.score;
    $('#resultLine').textContent = `ตอบถูก ${correct}/${total} ข้อ · เฉลี่ย ${perQuestion} คะแนนต่อข้อ`;
    $('#resultGrade').textContent = gradeText(correct / total);

    const recap = $('#recapList');
    recap.innerHTML = '';
    round.log.forEach((l, i) => {
      const li = document.createElement('li');
      li.className = l.ok ? 'right' : 'wrong';
      const left = document.createElement('div');
      left.innerHTML = `<div class="r-title">${i + 1}. ${l.entry.title}</div><div class="r-sub">${l.ok ? 'ตอบถูก' : (l.userAnswer ? 'ตอบว่า “' + escapeHtml(l.userAnswer) + '”' : 'ยอมแพ้')}</div>`;
      const pts = document.createElement('div');
      pts.className = 'r-pts';
      pts.textContent = l.ok ? `+${l.pts}` : '+0';
      li.appendChild(left);
      li.appendChild(pts);
      recap.appendChild(li);
    });

    Game.addBoardEntry({
      name: round.playerName,
      score: round.score,
      correct, total,
      perQuestion,
      when: new Date().toISOString(),
    });

    goto('result');
  }

  function gradeText(ratio) {
    if (ratio === 1) return 'ปรมาจารย์โอตาคุตัวจริง 🏆';
    if (ratio >= 0.8) return 'สายแข็งระดับหัวแถว';
    if (ratio >= 0.6) return 'ดูอนิเมะมาไม่น้อยเลย';
    if (ratio >= 0.4) return 'พอจะรู้จักอยู่บ้าง';
    return 'ต้องไปมาราธอนเพิ่มแล้วล่ะ';
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  $('#againBtn').addEventListener('click', () => {
    $('#playerName').value = '';
    goto('home');
  });
  $('#homeBtn').addEventListener('click', () => goto('home'));

  // ---------- กระดานคะแนน ----------
  function renderBoard() {
    const board = Game.getBoard();
    const body = $('#boardBody');
    body.innerHTML = '';
    $('#boardEmpty').hidden = board.length > 0;
    board.forEach((row, i) => {
      const tr = document.createElement('tr');
      const when = new Date(row.when);
      const whenStr = when.toLocaleString('th-TH', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
      tr.innerHTML = `<td>${i + 1}</td><td>${escapeHtml(row.name)}</td><td>${row.score}</td><td>${row.correct}/${row.total}</td><td>${row.perQuestion}</td><td class="wide">${whenStr}</td>`;
      body.appendChild(tr);
    });
  }

  $('#clearBoardBtn').addEventListener('click', () => {
    if (!confirm('ล้างกระดานคะแนนทั้งหมด?')) return;
    Game.clearBoard();
    renderBoard();
  });

  // ---------- คลังเรื่อง ----------
  let archFilter = 'used';
  $('#archSeg').addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    $$('button', $('#archSeg')).forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    archFilter = btn.dataset.arch;
    renderArchive();
  });
  $('#archSearch').addEventListener('input', renderArchive);

  function renderArchive() {
    const used = Game.usedIds();
    const q = $('#archSearch').value.trim().toLowerCase();
    let list = ANIME_POOL.slice();
    if (archFilter === 'used') list = list.filter(a => used.has(a.id));
    if (archFilter === 'left') list = list.filter(a => !used.has(a.id));
    if (q) list = list.filter(a => a.title.toLowerCase().includes(q) || a.aliases.some(al => al.toLowerCase().includes(q)));
    list.sort((a, b) => a.title.localeCompare(b.title));

    $('#archCount').textContent = `แสดง ${list.length} จากทั้งหมด ${ANIME_POOL.length} เรื่อง`;

    const ul = $('#archList');
    ul.innerHTML = '';
    list.forEach(a => {
      const li = document.createElement('li');
      const isUsed = used.has(a.id);
      li.innerHTML = `<div><div class="a-title">${escapeHtml(a.title)}</div><div class="a-genre">${escapeHtml(a.genre)} · ${tierLabel(a.tier)}</div></div><span class="a-tag ${isUsed ? 'used' : 'left'}">${isUsed ? 'ออกแล้ว' : 'ยังไม่ออก'}</span>`;
      ul.appendChild(li);
    });
  }

  // ---------- เริ่มต้น ----------
  refreshHome();
})();
