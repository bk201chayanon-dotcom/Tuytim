/* ------------------------------------------------------------------
 * game.js — ตรรกะเกม: จัดการพูล (ไม่ให้ชื่อซ้ำข้ามรอบ/ข้ามผู้เล่น),
 * การให้คะแนน, การตรวจคำตอบ, และการเก็บกระดานคะแนน
 * ทุกอย่างเก็บใน localStorage คีย์ "guessAnime.v1"
 * ------------------------------------------------------------------ */

const Game = (() => {
  const STORE_KEY = 'guessAnime.v1';
  const HINT_PENALTY = 20;
  const MIN_WORTH = 20;
  const BASE_WORTH = 100;

  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return { used: [], board: [] };
      const data = JSON.parse(raw);
      return {
        used: Array.isArray(data.used) ? data.used : [],
        board: Array.isArray(data.board) ? data.board : [],
      };
    } catch {
      return { used: [], board: [] };
    }
  }

  function save(state) {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(state));
    } catch { /* พื้นที่เก็บข้อมูลเต็มหรือถูกบล็อก — เล่นต่อได้โดยไม่บันทึก */ }
  }

  let state = load();

  function norm(s) {
    return String(s || '')
      .toLowerCase()
      .normalize('NFKC')
      .replace(/[!.,'’":;\-_()\[\]!?]/g, '')
      .replace(/\s+/g, '')
      .trim();
  }

  function usedIds() { return new Set(state.used); }

  function poolStats(tier) {
    const all = tier ? ANIME_POOL.filter(a => a.tier === tier) : ANIME_POOL.slice();
    const used = usedIds();
    const left = all.filter(a => !used.has(a.id));
    return { total: all.length, left: left.length, used: all.length - left.length };
  }

  function shuffled(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function pickRound(tier, length) {
    const all = tier ? ANIME_POOL.filter(a => a.tier === tier) : ANIME_POOL.slice();
    const used = usedIds();
    let pool = shuffled(all.filter(a => !used.has(a.id)));
    let usedFallback = false;
    if (pool.length < length) {
      usedFallback = true;
      const extra = shuffled(all.filter(a => used.has(a.id)));
      pool = pool.concat(extra);
    }
    const picked = pool.slice(0, Math.min(length, pool.length));
    picked.forEach(a => {
      if (!state.used.includes(a.id)) state.used.push(a.id);
    });
    save(state);
    return { items: picked, usedFallback };
  }

  function resetUsedPool() {
    state.used = [];
    save(state);
  }

  function checkAnswer(entry, guess) {
    const g = norm(guess);
    if (!g) return false;
    return entry.aliases.some(a => norm(a) === g) || norm(entry.title) === g;
  }

  function makeChoices(entry, tier) {
    const sameGroup = ANIME_POOL.filter(a => a.id !== entry.id && (!tier || a.tier === tier));
    const pool = sameGroup.length >= 3 ? sameGroup : ANIME_POOL.filter(a => a.id !== entry.id);
    const distractors = shuffled(pool).slice(0, 3);
    return shuffled([entry, ...distractors]);
  }

  function worthAfterHints(hintsUsed) {
    return Math.max(MIN_WORTH, BASE_WORTH - hintsUsed * HINT_PENALTY);
  }

  function addBoardEntry(row) {
    state.board.push(row);
    state.board.sort((a, b) => b.perQuestion - a.perQuestion || b.score - a.score);
    save(state);
  }

  function clearBoard() {
    state.board = [];
    save(state);
  }

  function getBoard() { return state.board.slice(); }

  return {
    BASE_WORTH, MIN_WORTH, HINT_PENALTY,
    poolStats, pickRound, resetUsedPool, checkAnswer, makeChoices,
    worthAfterHints, addBoardEntry, clearBoard, getBoard, usedIds,
  };
})();
