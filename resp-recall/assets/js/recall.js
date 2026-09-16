/* ------------------------------------------------------------------
 * recall.js — ตัวจัดตารางทบทวนแบบกล่อง (Leitner) สำหรับการถามตอบ
 *
 * แนวคิด: ทุกคำถามอยู่ใน "กล่อง" (box) 0–6 ตอบได้เลื่อนขึ้นกล่องถัดไป
 * ระยะห่างจะยาวขึ้นเรื่อย ๆ ตอบไม่ได้ตกกลับกล่อง 0 และถามซ้ำในรอบเดียวกัน
 *
 * ระดับการให้คะแนนตัวเอง (grade)
 *   1 = ลืม       ตกกลับกล่อง 0 และวนกลับมาถามใหม่ในรอบนี้
 *   2 = เกือบได้  อยู่กล่องเดิม เจอใหม่เร็วกว่าปกติ
 *   3 = จำได้     เลื่อนขึ้นกล่องถัดไป
 *
 * ฟังก์ชันทั้งหมดเป็น pure function (ไม่แก้ของเดิม) จึงทดสอบแยกด้วย Node ได้
 * ------------------------------------------------------------------ */

const Recall = (() => {
  const DAY = 24 * 60 * 60 * 1000;

  /* ระยะห่าง (วัน) ของแต่ละกล่อง — กล่อง 0 คือ "ถามซ้ำในรอบนี้" */
  const BOXES = [0, 1, 3, 7, 16, 35, 90];
  const TOP_BOX = BOXES.length - 1;

  /* ตั้งแต่กล่องนี้ขึ้นไปถือว่า "แม่นแล้ว" */
  const FIRM_BOX = 4;

  const GRADE = { FORGOT: 1, ALMOST: 2, KNEW: 3 };

  function fresh() {
    return { box: 0, due: 0, reps: 0, right: 0, wrong: 0, lapses: 0, last: 0 };
  }

  /* กระจายวันครบกำหนดเล็กน้อย เพื่อไม่ให้คำถามกองมาวันเดียวกันหมด */
  function fuzz(days, rnd = Math.random) {
    if (days < 4) return days;
    const spread = Math.max(1, Math.round(days * 0.12));
    return days + Math.floor(rnd() * (spread * 2 + 1)) - spread;
  }

  /**
   * คำนวณสถานะถัดไปของคำถาม — คืนค่าเป็นวัตถุใหม่เสมอ
   * ใช้ทั้งตอนบันทึกคำตอบจริง และตอนแสดงตัวอย่างระยะเวลาบนปุ่มให้คะแนน
   */
  function schedule(rec, grade, now = Date.now(), rnd = Math.random) {
    const r = Object.assign(fresh(), rec);
    const next = Object.assign({}, r, { reps: r.reps + 1, last: now });

    if (grade === GRADE.FORGOT) {
      if (r.reps > 0) next.lapses = r.lapses + 1;
      next.wrong = r.wrong + 1;
      next.box = 0;
      next.due = now;                       // วนกลับมาถามใหม่ในรอบนี้
      return next;
    }

    if (grade === GRADE.ALMOST) {
      next.wrong = r.wrong + 1;
      next.box = Math.max(0, r.box);
      const days = Math.max(1, Math.round(BOXES[next.box] / 2));   // เจอใหม่เร็วกว่าตอบได้เต็ม
      next.due = now + days * DAY;
      return next;
    }

    next.right = r.right + 1;
    next.box = Math.min(TOP_BOX, r.box + 1);
    next.due = now + Math.max(1, fuzz(BOXES[next.box], rnd)) * DAY;
    return next;
  }

  /* ข้อความบนปุ่มให้คะแนน เช่น "1 วัน" หรือ "ในรอบนี้" */
  function preview(rec, grade, now = Date.now()) {
    const next = schedule(rec, grade, now, () => 0.5);
    const days = Math.round((next.due - now) / DAY);
    if (days <= 0) return 'ในรอบนี้';
    if (days === 1) return 'พรุ่งนี้';
    if (days < 30) return days + ' วัน';
    return Math.round(days / 30) + ' เดือน';
  }

  const isDue  = (rec, now = Date.now()) => !!rec && rec.reps > 0 && rec.due <= now;
  const isFirm = rec => !!rec && rec.box >= FIRM_BOX;
  const isSeen = rec => !!rec && rec.reps > 0;

  /* คำถามที่ยังไม่แม่น: เคยตอบผิด/เกือบได้ และยังอยู่กล่องต้น ๆ */
  const isWeak = rec => isSeen(rec) && (rec.box < 2 || rec.wrong > rec.right);

  /**
   * จัดคิวคำถามของรอบทบทวน
   *   pool   รายการคำถามทั้งหมดที่เลือกไว้ (มี id)
   *   progress  ตารางความคืบหน้า { id: rec }
   *   opts   { mode, size, newLimit, now, rnd }
   */
  function buildQueue(pool, progress, opts = {}) {
    const now = opts.now || Date.now();
    const rnd = opts.rnd || Math.random;
    const size = opts.size || 0;
    const newLimit = opts.newLimit == null ? 15 : opts.newLimit;
    const mode = opts.mode || 'due';
    const rec = id => progress[id];

    const shuffle = arr => {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(rnd() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    };

    let queue;
    if (mode === 'all') {
      queue = shuffle(pool);
    } else if (mode === 'unseen') {
      queue = shuffle(pool.filter(q => !isSeen(rec(q.id))));
    } else if (mode === 'weak') {
      queue = shuffle(pool.filter(q => isWeak(rec(q.id))));
    } else {
      const due = pool.filter(q => isDue(rec(q.id), now))
                      .sort((a, b) => rec(a.id).due - rec(b.id).due);
      const fresh_ = shuffle(pool.filter(q => !isSeen(rec(q.id)))).slice(0, Math.max(0, newLimit));
      queue = due.concat(fresh_);
    }

    return size > 0 ? queue.slice(0, size) : queue;
  }

  /* ภาระทบทวนล่วงหน้า n วัน นับจากวันนี้ */
  function forecast(progress, days = 14, now = Date.now()) {
    const out = new Array(days).fill(0);
    const start = new Date(now); start.setHours(0, 0, 0, 0);
    Object.keys(progress).forEach(id => {
      const r = progress[id];
      if (!r || !r.reps) return;
      const d = Math.floor((r.due - start.getTime()) / DAY);
      if (d < 0) out[0]++;
      else if (d < days) out[d]++;
    });
    return out;
  }

  return { BOXES, TOP_BOX, FIRM_BOX, GRADE, DAY, fresh, schedule, preview,
           isDue, isFirm, isSeen, isWeak, buildQueue, forecast };
})();

if (typeof module !== 'undefined' && module.exports) module.exports = Recall;
