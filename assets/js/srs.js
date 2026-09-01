/* ------------------------------------------------------------------
 * srs.js — เครื่องมือจัดตารางทบทวนแบบ SM-2 (ชุดย่อยของอัลกอริทึม Anki)
 *
 * สถานะของการ์ด (state)
 *   new        ยังไม่เคยเรียน
 *   learning   กำลังเรียนรอบแรก เดินตาม LEARNING_STEPS
 *   review     จบขั้นเรียนแล้ว ระยะห่างเป็นวัน
 *   relearning ตอบผิดในสถานะ review กลับมาเดิน RELEARN_STEPS
 *
 * ระดับการตอบ (grade)
 *   1 = ลืม (Again)   2 = ยาก (Hard)   3 = ได้ (Good)   4 = ง่าย (Easy)
 * ------------------------------------------------------------------ */

const SRS = (() => {
  const MIN = 60 * 1000;
  const DAY = 24 * 60 * MIN;

  const CFG = {
    learningSteps: [1, 10],      // นาที
    relearnSteps: [10],          // นาที
    graduatingInterval: 1,       // วัน — เมื่อจบขั้นเรียนด้วย "ได้"
    easyInterval: 4,             // วัน — เมื่อจบขั้นเรียนด้วย "ง่าย"
    startEase: 2.5,
    minEase: 1.3,
    easyBonus: 1.3,
    hardFactor: 1.2,
    lapseMultiplier: 0.5,
    maxInterval: 365 * 3         // วัน
  };

  const GRADE = { AGAIN: 1, HARD: 2, GOOD: 3, EASY: 4 };

  function fresh() {
    return {
      state: 'new',
      step: 0,
      ease: CFG.startEase,
      interval: 0,       // วัน (ใช้เฉพาะสถานะ review)
      due: 0,            // timestamp ที่ถึงกำหนดทบทวน
      reps: 0,
      lapses: 0,
      last: 0
    };
  }

  const clampEase = e => Math.max(CFG.minEase, Math.round(e * 100) / 100);
  const clampIvl = d => Math.min(CFG.maxInterval, Math.max(1, Math.round(d)));

  /* กระจายวันครบกำหนดเล็กน้อย เพื่อไม่ให้การ์ดกองมาวันเดียวกันหมด */
  function fuzz(days) {
    if (days < 3) return days;
    const spread = Math.max(1, Math.round(days * 0.05));
    return days + Math.floor(Math.random() * (spread * 2 + 1)) - spread;
  }

  /**
   * คำนวณสถานะถัดไปของการ์ด — เป็นฟังก์ชันบริสุทธิ์ (ไม่แก้ของเดิม)
   * ใช้ทั้งตอนบันทึกคำตอบจริง และตอนแสดงตัวอย่างระยะเวลาบนปุ่ม
   */
  function schedule(card, grade, now = Date.now()) {
    const c = { ...card };
    const inLearning = c.state === 'new' || c.state === 'learning';
    const steps = c.state === 'relearning' ? CFG.relearnSteps : CFG.learningSteps;

    if (inLearning || c.state === 'relearning') {
      const relearning = c.state === 'relearning';
      // การ์ดที่ตอบผิดมาจากรอบทบทวนได้ลดระยะห่างไว้แล้วตอนเกิด lapse
      const graduated = relearning
        ? clampIvl(Math.max(1, card.interval || CFG.graduatingInterval))
        : CFG.graduatingInterval;

      if (grade === GRADE.AGAIN) {
        c.state = relearning ? 'relearning' : 'learning';
        c.step = 0;
        c.due = now + steps[0] * MIN;
      } else if (grade === GRADE.HARD) {
        c.state = relearning ? 'relearning' : 'learning';
        c.due = now + steps[Math.min(c.step, steps.length - 1)] * MIN;
      } else if (grade === GRADE.GOOD) {
        const next = c.step + 1;
        if (next >= steps.length) {
          // จบขั้นเรียน -> เข้าสู่รอบทบทวนเป็นวัน
          c.state = 'review';
          c.step = 0;
          c.interval = graduated;
          c.due = now + c.interval * DAY;
        } else {
          c.state = relearning ? 'relearning' : 'learning';
          c.step = next;
          c.due = now + steps[next] * MIN;
        }
      } else { // EASY — ข้ามขั้นเรียนที่เหลือทั้งหมด
        c.state = 'review';
        c.step = 0;
        c.interval = relearning ? graduated : CFG.easyInterval;
        c.due = now + c.interval * DAY;
      }
    } else {
      // สถานะ review
      const ivl = Math.max(1, c.interval || 1);
      if (grade === GRADE.AGAIN) {
        c.lapses += 1;
        c.ease = clampEase(c.ease - 0.2);
        c.state = 'relearning';
        c.step = 0;
        c.interval = clampIvl(ivl * CFG.lapseMultiplier);
        c.due = now + CFG.relearnSteps[0] * MIN;
      } else {
        if (grade === GRADE.HARD) {
          c.ease = clampEase(c.ease - 0.15);
          c.interval = clampIvl(fuzz(ivl * CFG.hardFactor));
        } else if (grade === GRADE.GOOD) {
          c.interval = clampIvl(fuzz(ivl * c.ease));
        } else {
          c.ease = clampEase(c.ease + 0.15);
          c.interval = clampIvl(fuzz(ivl * c.ease * CFG.easyBonus));
        }
        c.state = 'review';
        c.due = now + c.interval * DAY;
      }
    }

    c.reps = (card.reps || 0) + 1;
    c.last = now;
    return c;
  }

  /** ข้อความบอกระยะเวลาที่จะเจอการ์ดนี้อีกครั้ง เช่น "10 นาที", "3 วัน" */
  function intervalLabel(card, grade, now = Date.now()) {
    const next = schedule(card, grade, now);
    const ms = next.due - now;
    if (ms < 60 * MIN) return `${Math.max(1, Math.round(ms / MIN))} นาที`;
    if (ms < DAY) return `${Math.round(ms / (60 * MIN))} ชม.`;
    const days = Math.round(ms / DAY);
    if (days < 30) return `${days} วัน`;
    if (days < 365) return `${(days / 30).toFixed(days < 180 ? 1 : 0)} เดือน`;
    return `${(days / 365).toFixed(1)} ปี`;
  }

  const isDue = (card, now = Date.now()) =>
    card.state !== 'new' && card.due <= now;

  return { CFG, GRADE, fresh, schedule, intervalLabel, isDue, DAY, MIN };
})();

if (typeof module !== 'undefined') module.exports = SRS;
