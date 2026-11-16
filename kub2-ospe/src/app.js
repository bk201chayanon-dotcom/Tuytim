/* ------------------------------------------------------------------
 * app.js — 2 LAB (Patho / Urine) × 5 หน้า (หน้าแรก / Atlas / ทบทวน / Exam / ข้อสอบเก่า)
 * hash: #patho-atlas, #urine-exam ฯลฯ · ความคืบหน้าเก็บใน localStorage ของเบราว์เซอร์นี้เท่านั้น
 * ------------------------------------------------------------------ */
(function () {
'use strict';

const { GROUPS, TOPICS, STATIONS, PAPERS } = window.KUB;
const URINE = window.URINE;
const GRP = {}; GROUPS.forEach(g => { GRP[g.id] = g; });
const TOP = {}; TOPICS.forEach(t => { TOP[t.id] = t; t.lab = GRP[t.g].lab; });
const STA = {}; STATIONS.forEach(s => { STA[s.id] = s; s.g = TOP[s.t].g; s.lab = TOP[s.t].lab; });
const OLD_IDS = new Set(PAPERS.flatMap(p => p.items.map(i => i.st)));
const inLab = lab => s => s.lab === lab;

/* ---------- LAB config ---------- */
const LABS = {
  patho: {
    id: 'patho', name: 'LAB Patho', short: 'Patho', defAtlas: 'adpkd', vs: true,
    eyebrow: 'Block KUB II · Lab urinary system · Pathology',
    h1: 'Patho <span>OSPE</span> สถานีละ 60 วินาที',
    lead: n => `ฝึกดู gross, museum, virtual slide และ immunofluorescence ${n} สถานี ครบทุกภาพใน Lecture LAB Patho (66 สไลด์) พร้อมข้อสอบเก่าส่วน pathology ปี 2563 และ MED NU23/NT15`,
    insights: [
      ['รูปแบบสถานี', ['ปี 2563 ส่วน pathology 10 สถานี (ข้อ 1–10) อีก 5 สถานีเป็นส่วน urine อยู่ใน LAB Urine', 'ทุกสถานีถาม 2 ข้อย่อย: <b>บรรยายพยาธิสภาพ + วินิจฉัย</b> หรือ <b>วินิจฉัย + สาเหตุ/risk/complication</b>', 'Histology ใช้ภาพหน้าจอ virtual slide']],
      ['ออกซ้ำทั้งสองปี', ['ADPKD + โรคนอกไต 2 อย่าง', 'Hydronephrosis (บรรยาย + diag)', 'Angiomyolipoma และ chronic pyelonephritis (virtual slide)', 'IF linear → Goodpasture']],
      ['ปีนี้ต้องระวัง', ['Virtual slide ใหม่ใน Lecture: ARPKD, ATN, diabetic nephropathy, von Brunn nest/cystitis cystica, Wilms, clear cell RCC, urothelial carcinoma', 'หัวข้อใหม่: malakoplakia, XGP, membranous, crescentic GN, renal infarction, horseshoe kidney']],
    ],
  },
  urine: {
    id: 'urine', name: 'LAB Urine', short: 'Urine', defAtlas: 'u-prep', vs: false,
    eyebrow: 'Block KUB II · Routine urinalysis · Clinical microscopy',
    h1: 'Urine <span>OSPE</span> สถานีละ 60 วินาที',
    lead: n => `ฝึกระบุเซลล์ cast ผลึก และหลักการแถบตรวจ ${n} สถานี จากภาพจริงใน Lecture LAB Urine (81 สไลด์) พร้อมข้อสอบเก่าส่วน urine analysis ปี 2563 และ MED NU23/NT15`,
    insights: [
      ['รูปแบบสถานี', ['ปี 2563 ส่วน urine analysis 5 สถานี (ข้อ 11–15)', 'ส่วนใหญ่ถามสั้น <b>"What is it?"</b> แล้วต่อด้วย pH หรือ probable diagnosis', 'มีข้อทฤษฎีขั้นตอนปั่นตะกอนทุกปี']],
      ['ออกซ้ำทั้งสองปี', ['Centrifuge 5 นาที · เหลือตะกอน 0.5–1 mL', 'Granular cast', 'Crystal ในด่าง (ammonium biurate, triple phosphate) และในกรด (uric acid, calcium oxalate)', 'เซลล์: WBC, squamous, oval fat body']],
      ['ปีนี้ต้องระวัง', ['Lecture เพิ่มหลักการและ false positive/negative ของแถบตรวจทุกช่อง (หน้า 10–23)', 'หน่วยรายงาน /LPF vs /HPF vs ระดับ', 'Cast → โรค (RBC, WBC, RTE, waxy, fatty) และภาพ 4 ช่องหน้า 61', 'Abnormal crystals: cystine, leucine, tyrosine, sulfonamide, cholesterol']],
    ],
  },
};
const LAB_IDS = Object.keys(LABS);

/* ---------- utils ---------- */
const $ = (s, el) => (el || document).querySelector(s);
const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const strip = h => String(h).replace(/<[^>]+>/g, '');
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
const band = s => s >= .8 ? 's-good' : s >= .4 ? 's-warn' : 's-bad';
const pct = x => Math.round(x * 100);

/* ---------- storage (per browser) ---------- */
const KEY = 'kub2-ospe.v1';
const S = { marks: {}, exams: [], secs: 60, lab: 'patho', atlasBy: {}, theme: '' };
try { const raw = localStorage.getItem(KEY); if (raw) Object.assign(S, JSON.parse(raw)); } catch (e) { /* storage blocked */ }
if (!LABS[S.lab]) S.lab = 'patho';
if (!S.atlasBy || typeof S.atlasBy !== 'object') S.atlasBy = {};
if (S.atlas && TOP[S.atlas] && !S.atlasBy[TOP[S.atlas].lab]) S.atlasBy[TOP[S.atlas].lab] = S.atlas;
delete S.atlas;
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage blocked */ } }
function mark(id, ok) {
  const m = S.marks[id] || { r: 0, w: 0 };
  ok ? m.r++ : m.w++;
  m.last = ok ? 'r' : 'w'; m.t = Date.now();
  S.marks[id] = m; save();
}

/* ---------- theme ---------- */
function applyTheme() { if (S.theme) document.documentElement.setAttribute('data-theme', S.theme); else document.documentElement.removeAttribute('data-theme'); }
applyTheme();
$('#themeBtn').addEventListener('click', () => {
  const sysDark = window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches;
  const cur = S.theme || (sysDark ? 'dark' : 'light');
  S.theme = cur === 'dark' ? 'light' : 'dark';
  applyTheme(); save();
});

/* ---------- toast ---------- */
let toastT;
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.hidden = false;
  clearTimeout(toastT); toastT = setTimeout(() => { t.hidden = true; }, 2200);
}

/* ======================================================================
 * Answer checking
 * ==================================================================== */
function norm(s) {
  return String(s || '').toLowerCase().normalize('NFKC')
    .replace(/[α]/g, 'alpha ').replace(/[β]/g, 'beta ')
    .replace(/[–—]/g, '-')
    .replace(/\.(?!\d)/g, ' ')
    .replace(/(\d)\s*-\s*(\d)/g, '$1~$2')
    .replace(/-/g, ' ')
    .replace(/~/g, '-')
    .replace(/[^a-z0-9฀-๿.\- ]+/g, ' ')
    .replace(/(\d)([a-z฀-๿])/g, '$1 $2')
    .replace(/([a-z฀-๿])(\d)/g, '$1 $2')
    .replace(/\s+/g, ' ').trim();
}
function lev(a, b) {
  if (a === b) return 0;
  const m = a.length, n = b.length;
  if (!m) return n; if (!n) return m;
  let prev = new Array(n + 1), cur = new Array(n + 1);
  for (let j = 0; j <= n; j++) prev[j] = j;
  for (let i = 1; i <= m; i++) {
    cur[0] = i;
    for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    [prev, cur] = [cur, prev];
  }
  return prev[n];
}
const isNum = w => /^[\d.\-]+$/.test(w);
const THAI = /[฀-๿]/;
/* คู่คำที่สะกดใกล้กันแต่ความหมายต่างกัน: ห้ามนับเป็นคำสะกดผิด */
const NOFUZZ = new Set(['nephrotic', 'nephritic', 'papillary', 'capillary', 'adpkd', 'arpkd', 'cystica', 'cystine', 'leucine', 'leukocyte']);
function wordEq(t, w) {
  if (t === w) return true;
  if (isNum(w) || w.length < 5) return false;
  if (t.startsWith(w)) return true;
  if (w.length < 6 || NOFUZZ.has(w) || NOFUZZ.has(t)) return false;
  return Math.abs(t.length - w.length) <= 1 && lev(t, w) <= 1;
}
function hasKey(inp, toks, key) {
  const k = norm(key);
  if (!k) return false;
  if (isNum(k)) return toks.some(t => t === k || (t.includes('-') && t.split('-').includes(k)));
  const kw = k.split(' ');
  if (kw.length === 1 && kw[0].length < 5 && !THAI.test(k)) return toks.some(t => t === k || t === k + 's' || (k.length >= 4 && t.startsWith(k)));
  if (inp.includes(k) && !(kw.length === 1 && kw[0].length < 5)) return true;
  if (THAI.test(k)) return inp.includes(k);
  for (let i = 0; i + kw.length <= toks.length; i++) {
    if (kw.every((w, j) => wordEq(toks[i + j], w))) return true;
  }
  return false;
}
function grade(p, ans) {
  const inp = norm(ans), toks = inp ? inp.split(' ') : [];
  const need = p.n || p.k.length;
  const hits = [], miss = [];
  p.k.forEach(grp => { (inp && grp.some(key => hasKey(inp, toks, key)) ? hits : miss).push(grp[0]); });
  return { score: inp ? Math.min(1, hits.length / need) : 0, hits, miss, need, empty: !inp };
}

/* ======================================================================
 * Rendering helpers
 * ==================================================================== */
function media(ref) {
  if (ref.startsWith('svg:')) return URINE.draw(ref.slice(4));
  return `<img src="img/${esc(ref)}.jpg" alt="ภาพประกอบ ${esc(ref)}" loading="lazy">`;
}
function fig(ref, tag, cap) {
  const sch = ref.startsWith('svg:');
  return `<figure class="fig" data-ref="${esc(ref)}" data-cap="${esc(strip(cap || ''))}">`
    + (tag ? `<span class="fig-tag">${tag}</span>` : '')
    + (sch ? `<span class="fig-sch">ภาพวาดจำลอง</span>` : '')
    + `<div class="fig-media" role="button" tabindex="0" aria-label="ขยายภาพ">${media(ref)}</div>`
    + (cap ? `<figcaption>${cap}</figcaption>` : '')
    + `</figure>`;
}
function stars(n) { return `<span class="stars" title="โอกาสออกสอบ ${n}/3">${'★'.repeat(n)}<span class="off">${'★'.repeat(3 - n)}</span></span>`; }
function srcChip(s) {
  if (OLD_IDS.has(s.id) || s.src === 'old') return `<span class="chip old">ข้อสอบเก่า</span>`;
  if (s.src === 'pred') return `<span class="chip warn">คาดการณ์</span>`;
  return `<span class="chip">Lecture</span>`;
}
function kindChip(s) { return `<span class="chip">${esc(s.kind)}</span>`; }
function labChip(lab) { return `<span class="chip lab-${lab}">${esc(LABS[lab].name)}</span>`; }
function strip_(n, pads, opts) {
  opts = opts || {};
  let h = `<div class="strip${opts.big ? ' big' : ''}${n > 24 ? ' dense' : ''}" role="img" aria-label="${esc(opts.label || 'แถบความคืบหน้า')}"><div class="strip-handle"></div><div class="strip-body">`;
  for (let i = 0; i < n; i++) h += `<span class="pad ${pads[i] || ''}"></span>`;
  return h + `</div></div>`;
}
const labHash = (v, lab) => `#${lab || S.lab}-${v}`;

/* ---------- lightbox ---------- */
const lb = $('#lb');
function openLb(ref, cap) {
  $('#lbInner').innerHTML = media(ref) + (cap ? `<div class="lb-cap">${esc(cap)}</div>` : '');
  setZoom(1);
  lb.hidden = false; $('#lbClose').focus();
}
function setZoom(z) {
  const el = $('#lbInner > img, #lbInner > svg');
  $('#lbInner').style.maxWidth = z === 1 ? '1200px' : 'none';
  $('#lbInner').style.width = z === 1 ? '100%' : (z * 100) + '%';
  if (el) el.style.width = '100%';
  $$('.lb-bar [data-z]').forEach(b => b.classList.toggle('on', +b.dataset.z === z));
}
$$('.lb-bar [data-z]').forEach(b => b.addEventListener('click', () => setZoom(+b.dataset.z)));
$('#lbClose').addEventListener('click', () => { lb.hidden = true; });
lb.addEventListener('click', e => { if (e.target === lb || e.target.classList.contains('lb-scroll')) lb.hidden = true; });
document.addEventListener('click', e => {
  const m = e.target.closest('.fig-media');
  if (!m) return;
  const f = m.closest('.fig');
  openLb(f.dataset.ref, f.dataset.cap);
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !lb.hidden) { lb.hidden = true; return; }
  if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('fig-media')) {
    e.preventDefault(); const f = e.target.closest('.fig'); openLb(f.dataset.ref, f.dataset.cap);
  }
});

/* ======================================================================
 * Router + LAB switch
 * ==================================================================== */
const VIEWS = ['home', 'atlas', 'practice', 'exam', 'papers'];
let view = '';
function applyLab() {
  document.documentElement.setAttribute('data-lab', S.lab);
  $$('#labSw [data-lab]').forEach(b => { const on = b.dataset.lab === S.lab; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
  $$('#tabs a').forEach(a => { a.href = labHash(a.dataset.v); });
  $('.brand').href = labHash('home');
}
function setLab(lab) {
  if (!LABS[lab] || lab === S.lab) return;
  S.lab = lab; save();
  P.queue = null; P.f = { g: 'all', src: 'all', topic: '', order: P.f.order };
  EX.report = null;
  applyLab();
}
function route() {
  const h = (location.hash || '').slice(1);
  let v = h, lab = S.lab;
  const m = h.match(/^(patho|urine)-([a-z]+)$/);
  if (m) { lab = m[1]; v = m[2]; }
  if (!VIEWS.includes(v)) v = 'home';
  if (EX.running && (v !== 'exam' || lab !== S.lab)) { location.hash = labHash('exam'); toast('กำลังสอบอยู่ — กด "ออกจากการสอบ" ก่อนถ้าจะไปหน้าอื่น'); return; }
  if (EX.running && view === 'exam') return;
  setLab(lab);
  view = v;
  /* only the active view keeps its DOM, so ids like #ans-0 stay unique between practice and exam */
  VIEWS.forEach(n => { const el = $('#v-' + n); el.hidden = n !== v; if (n !== v) el.innerHTML = ''; });
  $$('#tabs a').forEach(a => a.classList.toggle('on', a.dataset.v === v));
  document.title = `${LABS[S.lab].name} · KUB II OSPE`;
  RENDER[v]();
  window.scrollTo(0, 0);
}
function go(v, lab) {
  const target = labHash(v, lab);
  if (location.hash === target) route(); else location.hash = target;
}
window.addEventListener('hashchange', route);
document.addEventListener('click', e => {
  const sw = e.target.closest('#labSw [data-lab]');
  if (sw) { e.preventDefault(); go(view || 'home', sw.dataset.lab); return; }
  const b = e.target.closest('[data-go]');
  if (b) {
    e.preventDefault();
    const t = b.dataset.topic, lab = b.dataset.lab || (t ? TOP[t].lab : undefined);
    if (t) S.atlasBy[TOP[t].lab] = t;
    if (EX.report && lab && lab !== S.lab) EX.report = null;
    go(b.dataset.go, lab);
  }
});

/* ======================================================================
 * HOME
 * ==================================================================== */
function groupStats() {
  return GROUPS.filter(g => g.lab === S.lab).map(g => {
    const ids = STATIONS.filter(s => s.g === g.id).map(s => s.id);
    let r = 0, seen = 0;
    ids.forEach(id => { const m = S.marks[id]; if (m) { seen++; if (m.last === 'r') r++; } });
    return { g, total: ids.length, seen, acc: seen ? r / seen : null };
  });
}
function renderHome() {
  const L = LABS[S.lab];
  const gs = groupStats();
  const groups = gs.map(x => x.g);
  const pads = gs.map(x => x.acc == null ? '' : 's-' + (x.acc >= .8 ? 'good' : x.acc >= .5 ? 'warn' : 'bad'));
  const labSt = STATIONS.filter(inLab(S.lab));
  const seen = labSt.filter(s => S.marks[s.id]).length;
  const labExams = S.exams.filter(x => x.lab === S.lab || x.lab === 'both');
  const last = labExams[labExams.length - 1];
  const oldCount = PAPERS.reduce((a, p) => a + p.items.filter(i => STA[i.st].lab === S.lab).length, 0);
  const cols = L.vs ? 5 : 4;
  const rows = groups.map(g => {
    const ts = TOPICS.filter(t => t.g === g.id);
    return `<tr class="grp"><td colspan="${cols}">${esc(g.name)} <span class="muted small">· ${esc(g.th)}</span></td></tr>`
      + ts.map(t => {
        const e = (t.exam || []).join(' ');
        return `<tr><td><a class="tlink" href="${labHash('atlas')}" data-go="atlas" data-topic="${t.id}">${esc(t.en)}</a></td>`
          + `<td class="c">${/2563/.test(e) ? '<span class="mark-old" title="ออกสอบปี 2563"></span>' : ''}</td>`
          + `<td class="c">${/NU23/.test(e) ? '<span class="mark-old" title="ออกสอบ MED NU23"></span>' : ''}</td>`
          + (L.vs ? `<td class="c">${t.vs ? '<span class="mark-vs" title="อยู่ในรายการ virtual slide"></span>' : ''}</td>` : '')
          + `<td>${stars(t.star)}</td></tr>`;
      }).join('');
  }).join('');
  const hist = S.exams.slice(-6).reverse().map(x => `<div class="hist-row"><span>${new Date(x.t).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })} · ${x.n} สถานี · ${esc(x.label || '')}</span><span class="mono"><b>${x.pct}%</b></span></div>`).join('');
  const other = LABS[S.lab === 'patho' ? 'urine' : 'patho'];

  $('#v-home').innerHTML = `
  <section class="hero">
    <div>
      <div class="eyebrow">${esc(L.eyebrow)}</div>
      <h1>${L.h1}</h1>
      <p class="lead">${esc(L.lead(labSt.length))}</p>
      <div class="row">
        <a class="btn primary" href="${labHash('exam')}" data-go="exam">เริ่ม Exam จับเวลา</a>
        <a class="btn" href="${labHash('practice')}" data-go="practice">โหมดทบทวน</a>
        <a class="btn ghost" href="${labHash('atlas')}" data-go="atlas">เปิด Atlas</a>
      </div>
      <p class="small muted" style="margin-top:12px">อีกเรื่องหนึ่งในบล็อกนี้: <a href="${labHash('home', other.id)}" data-go="home" data-lab="${other.id}">${esc(other.name)} →</a></p>
    </div>
    <div class="bottle">
      <div class="bottle-h"><b>แถบตรวจความพร้อม · ${esc(L.short)}</b><span class="muted small mono">${seen}/${labSt.length} สถานี</span></div>
      ${strip_(groups.length, pads, { big: true, label: 'ความแม่นยำแยกตามหมวด' })}
      <div class="strip-labels">${groups.map(g => `<span title="${esc(g.name)}">${esc(g.name.split(' ')[0])}</span>`).join('')}</div>
      <div class="legend"><span><i style="background:var(--good)"></i>≥ 80%</span><span><i style="background:var(--warn)"></i>50–79%</span><span><i style="background:var(--bad)"></i>&lt; 50%</span><span><i style="background:var(--pad-empty)"></i>ยังไม่ได้ทำ</span></div>
      <p class="small muted">แต่ละช่องคือหนึ่งหมวด สีเปลี่ยนตามคำตอบล่าสุดของสถานีในหมวดนั้นจากโหมดทบทวนและ Exam</p>
    </div>
  </section>

  <section class="kpis">
    <div class="kpi"><div class="n">${labSt.length}</div><div class="l">สถานีใน ${esc(L.name)}</div></div>
    <div class="kpi"><div class="n">${oldCount}</div><div class="l">ข้อจากข้อสอบเก่า</div></div>
    <div class="kpi"><div class="n">${TOPICS.filter(t => t.lab === S.lab).length}</div><div class="l">หัวข้อใน Atlas</div></div>
    <div class="kpi"><div class="n">${last ? last.pct + '%' : '–'}</div><div class="l">${last ? 'Exam ล่าสุดของ LAB นี้' : 'ยังไม่เคยสอบ LAB นี้'}</div></div>
  </section>

  <section class="stack">
    <div class="sec-h"><h2>อ่านแนวข้อสอบเก่า</h2><span class="muted small">สรุปจากข้อสอบ LAB ปี 2563 และ MED NU23/NT15</span></div>
    <div class="insights">${L.insights.map(([h, li]) => `<div class="insight"><h3>${esc(h)}</h3><ul>${li.map(x => `<li>${x}</li>`).join('')}</ul></div>`).join('')}</div>
  </section>

  <section class="stack">
    <div class="sec-h"><h2>Blueprint รายหัวข้อ</h2><span class="legend"><span><span class="mark-old"></span> เคยออกสอบ</span>${L.vs ? '<span><span class="mark-vs"></span> virtual slide ใน Lecture</span>' : ''}<span>${stars(3)} โอกาสออกปีนี้</span></span></div>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>หัวข้อ</th><th>2563</th><th>NU23</th>${L.vs ? '<th>Virtual slide</th>' : ''}<th>โอกาสออก</th></tr></thead><tbody>${rows}</tbody></table></div>
  </section>

  ${hist ? `<section class="panel stack"><div class="sec-h"><h2>ประวัติ Exam</h2><span class="muted small">ทั้ง 2 LAB · 6 ครั้งล่าสุด</span></div><div class="hist">${hist}</div></section>` : ''}
  `;
}

/* ======================================================================
 * ATLAS summary tables (LAB Urine)
 * ==================================================================== */
const UA = {
  color: ['ตารางสีปัสสาวะ (Lecture หน้า 4)', `
  <div class="tbl-wrap"><table class="tbl"><thead><tr><th>สี</th><th>สาเหตุ</th><th>ข้อสังเกต</th></tr></thead><tbody>
    <tr><td>Colorless</td><td>Polyuria or DI</td><td>ปริมาตร 24 ชม. เพิ่ม</td></tr>
    <tr><td>Pale yellow</td><td>DM</td><td>SG สูง + glucose บวก</td></tr>
    <tr><td>Amber/Orange</td><td>Bilirubin · drugs</td><td>เขย่าแล้วมี<b>ฟองสีเหลือง</b></td></tr>
    <tr><td>Yellow-green/Yellow-brown</td><td>Bilirubin ถูก oxidize เป็น biliverdin</td><td>ฟองมีสีใน acid urine · ผล bilirubin ทางเคมีลบลวง</td></tr>
    <tr><td>Pink/Red</td><td>RBCs</td><td><b>ขุ่น</b></td></tr>
    <tr><td></td><td>Hemoglobin, myoglobin, porphyrins, beets, rifampin</td><td><b>ใส</b></td></tr>
    <tr><td></td><td>Menstrual contamination</td><td>ขุ่น</td></tr>
    <tr><td>Brown/Black</td><td>RBCs oxidized to methemoglobin, methemoglobin, methyldopa/levodopa, metronidazole (Flagyl)</td><td></td></tr>
  </tbody></table></div>`],
  turbid: ['สาเหตุความขุ่น (Lecture หน้า 6)', `
  <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Nonpathologic</th><th>Pathologic</th></tr></thead><tbody>
    <tr><td>Squamous epithelium</td><td>Red blood cells</td></tr><tr><td>Mucus</td><td>White blood cells</td></tr>
    <tr><td>Amorphous phosphate, carbonate, urate</td><td>Bacteria</td></tr><tr><td>Semen, spermatozoa</td><td>Yeast</td></tr>
    <tr><td>Fecal contamination</td><td>Nonsquamous cells</td></tr><tr><td>Radiologic contrast media</td><td>Abnormal crystals</td></tr>
    <tr><td>Powder</td><td>Lymph fluids</td></tr><tr><td>Vaginal creams</td><td>Lipid</td></tr>
  </tbody></table></div>`],
  strip: ['สรุปแถบตรวจ: หลักการ · บวกลวง · ลบลวง (Lecture หน้า 10–23)', `
  <div class="tbl-wrap"><table class="tbl"><thead><tr><th>ช่อง</th><th>หลักการ</th><th>บวกลวง</th><th>ลบลวง</th><th>อ่านที่</th></tr></thead><tbody>
    <tr><td>Protein</td><td>Protein error of pH indicators (ไวต่อ albumin)</td><td>Alkaline urine</td><td>Globulin, Bence Jones, mucoprotein จับได้น้อย</td><td>ยืนยัน SSA / Robert's</td></tr>
    <tr><td>Glucose</td><td>Glucose oxidase → H<sub>2</sub>O<sub>2</sub> → peroxidase + chromogen</td><td>Peroxide, strong oxidizing detergent</td><td><b>Ascorbic acid</b>; SG สูง, อุณหภูมิต่ำ</td><td class="mono">30 s</td></tr>
    <tr><td>Ketones</td><td>Sodium nitroprusside (acetoacetic acid + glycine, alkaline → violet)</td><td>อ่านผิดเวลา, ปัสสาวะสีเข้ม, SG สูง + pH ต่ำ, levodopa, sulfhydryl, phenylketones, phthalein</td><td>Acetone ระเหย, acetoacetic acid สลาย</td><td class="mono">40 s</td></tr>
    <tr><td>Blood</td><td>Pseudoperoxidase activity of hemoglobin</td><td>Menstrual, oxidizing detergent, vegetable peroxidase, bacterial enzyme</td><td><b>Ascorbic acid</b>; SG สูง (RBC ไม่แตก), formalin, captopril, high nitrite</td><td class="mono">60 s</td></tr>
    <tr><td>Specific gravity</td><td>pKa ของ polyelectrolyte เปลี่ยนใน alkaline medium</td><td>ปัสสาวะเข้มข้นสูง</td><td>Highly alkaline urine (pH &gt; 6.5)</td><td></td></tr>
    <tr><td>Nitrite</td><td>Greiss reaction (p-arsanilic acid → diazonium → pink) · 100,000 org/mL</td><td>เก็บรักษาไม่ถูก, ปัสสาวะสีเข้ม</td><td>Nonreductase bacteria, contact time ไม่พอ, <b>ascorbic acid</b>, SG สูง, nitrite → nitrogen</td><td class="mono">60 s</td></tr>
    <tr><td>Leukocyte esterase</td><td>Indoxyl/pyrrole ester + granulocytic esterase → diazonium → purple</td><td>Oxidizing agent, formalin, ปัสสาวะสีเข้ม, nitrofurantoin</td><td>Protein, glucose, oxalic acid, <b>ascorbic acid</b> สูง; gentamicin, cephalosporins, tetracyclines</td><td class="mono">2 min</td></tr>
  </tbody></table></div>`],
  uti: ['ความแม่นยำของการตรวจ UTI ในผู้หญิงที่มี dysuria (Lecture หน้า 31)', `
  <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Test</th><th>Sensitivity</th><th>Specificity</th><th>PPV</th><th>NPV</th></tr></thead><tbody>
    <tr><td>Culture: any coliforms</td><td class="mono">1.00</td><td class="mono">0.71</td><td class="mono">0.79</td><td class="mono">1.00</td></tr>
    <tr><td>Culture: &gt; 100 cfu/mL</td><td class="mono">0.95</td><td class="mono">0.85</td><td class="mono">0.88</td><td class="mono">0.94</td></tr>
    <tr><td>Culture: &gt; 100,000 cfu/mL</td><td class="mono">0.51</td><td class="mono">0.59</td><td class="mono">0.98</td><td class="mono">0.65</td></tr>
    <tr><td>Microscopy: &gt; 8 WBC/mm³</td><td class="mono">0.91</td><td class="mono">0.50</td><td class="mono">0.67</td><td class="mono">0.83</td></tr>
    <tr><td>Microscopy: &gt; 20 WBC/mm³</td><td class="mono">0.50</td><td class="mono">0.95</td><td class="mono">0.94</td><td class="mono">0.54</td></tr>
    <tr><td>Leukocyte esterase dipstick</td><td class="mono">0.75–0.90</td><td class="mono">0.95</td><td class="mono">0.50</td><td class="mono">0.92</td></tr>
    <tr><td>Nitrite dipstick</td><td class="mono">0.35–0.85</td><td class="mono">0.95</td><td class="mono">0.96</td><td class="mono">0.27–0.70</td></tr>
    <tr><td>LE and nitrite</td><td class="mono">0.75–0.90</td><td class="mono">0.70</td><td class="mono">0.75–0.93</td><td class="mono">0.41–0.95</td></tr>
  </tbody></table></div><p class="small muted">ที่มาในสไลด์: Urinary Tract Infections in Adults. Am Fam Physician 1999;59(5):1225–34</p>`],
  jaundice: ['Bilirubin และ urobilinogen ใน jaundice', `
  <div class="tbl-wrap"><table class="tbl"><thead><tr><th>ภาวะ</th><th>Urine bilirubin</th><th>Urobilinogen</th></tr></thead><tbody>
    <tr><td>Hemolysis (pre-hepatic)</td><td>ลบ</td><td><b>สูง</b></td></tr>
    <tr><td>Hepatocellular damage</td><td>บวก</td><td><b>สูง</b>/ปกติ</td></tr>
    <tr><td>Obstructive (post-hepatic)</td><td><b>บวก</b></td><td>ต่ำ/ไม่พบ</td></tr>
  </tbody></table></div>`],
  proc: ['ขั้นตอนเตรียมตะกอน (Lecture หน้า 25–27)', `
  <ol class="ua-steps">
    <li>เทปัสสาวะสด <span class="hl">10–15 mL</span> ใส่หลอดพลาสติก<b>ก้นแหลม</b> (conical tube)</li>
    <li>Centrifuge <span class="hl">5 นาที</span> ที่ RCF <span class="hl">400</span> (ในแลปตั้ง 1,500–2,000 รอบ/นาที)</li>
    <li>ดูดหรือเทส่วนใสทิ้ง เหลือตะกอน <span class="hl">0.5–1 mL</span> แล้วเคาะผสมให้เข้ากัน</li>
    <li>หยดบนสไลด์ ปิด coverslip</li>
    <li>ดู <b>low power (10×)</b> ก่อน หา cast และดูภาพรวม แล้วเปลี่ยน <b>high power (40×)</b> เมื่อเจอสิ่งที่ต้องระบุ — อย่างน้อย <span class="hl">10 fields</span></li>
  </ol>`],
  report: ['หน่วยที่ใช้รายงาน (Lecture หน้า 28–30)', `
  <div class="tbl-wrap"><table class="tbl"><thead><tr><th>วิธีรายงาน</th><th>สิ่งที่ตรวจ</th></tr></thead><tbody>
    <tr><td>ช่วงตัวเลข <b>/HPF</b> (40×)</td><td>WBC, RBC, epithelial cell, oval fat body, Trichomonas vaginalis</td></tr>
    <tr><td>ช่วงตัวเลข <b>/LPF</b> (10×)</td><td>Cast, cylindroid</td></tr>
    <tr><td>ระดับ (negative → numerous)</td><td>Crystal, amorphous, mucous thread, spermatozoa, yeast, bacteria, fat globules</td></tr>
  </tbody></table></div>
  <div class="tbl-wrap"><table class="tbl"><thead><tr><th>ระดับ</th><th>ความหมาย</th></tr></thead><tbody>
    <tr><td>Negative</td><td>ไม่พบ</td></tr><tr><td>Rare</td><td>พบน้อยกว่า 4 cells/slide</td></tr>
    <tr><td>Few</td><td>พบเล็กน้อย กระจายประปราย</td></tr><tr><td>Moderate</td><td>กระจายปานกลาง บางครั้งจับกลุ่มเล็ก ๆ</td></tr>
    <tr><td>Many</td><td>กระจายมากขึ้น จับกลุ่มใหญ่ขึ้น</td></tr><tr><td>Numerous</td><td>พบหนาทึบ บังตะกอนชนิดอื่น</td></tr>
  </tbody></table></div>
  <p class="small muted">ช่วงตัวเลข: Neg, rare, 0–1, 1–2, 2–3, 3–5, 5–10, 10–20, 20–30, 30–50, 50–100, &gt; 100</p>`],
  cell: ['ตารางสรุปเซลล์', `
  <div class="tbl-wrap"><table class="tbl"><thead><tr><th>เซลล์</th><th>ลักษณะ</th><th>ความสำคัญ</th></tr></thead><tbody>
    <tr><td>RBC</td><td>กลม ขอบเรียบ คล้ายโดนัท ไม่มี nucleus · crenated (เข้มข้น) · ghost (เจือจาง) · dysmorphic</td><td>ปกติ 0–2/HPF · dysmorphic/acanthocyte → glomerular</td></tr>
    <tr><td>WBC</td><td>~12 µm มีเม็ด nucleus แบ่ง lobe · glitter cell ในปัสสาวะเจือจาง</td><td>ปกติ &lt; 5/HPF · มากกว่า → UTI</td></tr>
    <tr><td>Squamous</td><td>ใหญ่ที่สุด แบน cytoplasm มากไม่เรียบ nucleus ≈ RBC</td><td>ปนเปื้อนจาก vagina/urethra · clue cell → Gardnerella</td></tr>
    <tr><td>Transitional</td><td>Spherical, polyhedral, caudate · N:C 1:4–1:5</td><td>รูปร่างผิดปกติ → malignancy/viral → cytology</td></tr>
    <tr><td>RTE</td><td>ใหญ่กว่า WBC เล็กน้อย nucleus eccentric · N:C ≈ 1:1</td><td><b>&gt; 2/HPF = tubular injury</b></td></tr>
    <tr><td>Oval fat body</td><td>RTE อมหยดไขมัน · Maltese cross ใต้ polarizer</td><td>Lipiduria: nephrotic, severe ATN, DM, trauma</td></tr>
  </tbody></table></div>`],
  cast: ['ตารางสรุป cast', `
  <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Cast</th><th>ลักษณะ</th><th>บ่งชี้</th></tr></thead><tbody>
    <tr><td>Hyaline</td><td>ใส ไม่มีสี ขอบขนาน ปลายมน · cylindroid ปลายเรียว</td><td>ปกติ 0–2/LPF; ออกกำลังกาย, dehydration, ร้อน, stress; AGN, pyelonephritis, CKD, CHF</td></tr>
    <tr><td>RBC</td><td>RBC อัดแน่น</td><td><b>Glomerulonephritis</b> (+ proteinuria, dysmorphic RBC); กีฬาปะทะ</td></tr>
    <tr><td>WBC</td><td>Neutrophil nucleus แบ่ง lobe (ยืนยันที่ HPF)</td><td><b>Pyelonephritis</b>, acute interstitial nephritis</td></tr>
    <tr><td>Epithelial (RTE)</td><td>RTE cells เรียงใน cast</td><td>Advanced tubular destruction: heavy metal, drug/chemical, viral, allograft rejection</td></tr>
    <tr><td>Fatty</td><td>หยดไขมันสะท้อนแสงสูง</td><td>Lipiduria (nephrotic syndrome)</td></tr>
    <tr><td>Mixed cellular</td><td>RBC + WBC · WBC + RTE · WBC + bacteria</td><td>GN · pyelonephritis</td></tr>
    <tr><td>Granular (coarse/fine)</td><td>เซลล์สลายหรือ serum protein ใน Tamm–Horsfall · muddy brown</td><td>ATN (muddy brown) · coarse/fine ไม่ต่างทางคลินิก</td></tr>
    <tr><td>Waxy</td><td>สะท้อนแสงสูง เรียบ ปลายทู่/หัก ขอบแตก</td><td>Granular cast เสื่อม → urine stasis, CKD</td></tr>
  </tbody></table></div>`],
  crystal: ['ตารางสรุปผลึก (Lecture หน้า 62–77)', `
  <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Crystal</th><th>pH</th><th>รูปร่างที่ใช้จำ</th><th>ความสำคัญ</th></tr></thead><tbody>
    <tr class="grp"><td colspan="4">Normal — acid urine</td></tr>
    <tr><td>Amorphous urates</td><td>กรด</td><td>เม็ดสีชมพูส้ม–น้ำตาลแดง "brick dust"</td><td>ปกติ</td></tr>
    <tr><td>Uric acid</td><td>กรด</td><td>Rhombic plates, prisms, lemon-shaped, wedges, rosettes · สีเหลือง–น้ำตาล</td><td>Gout, tumor lysis</td></tr>
    <tr><td>Calcium oxalate</td><td>กรด</td><td>Dihydrate: octahedron <b>"envelope"</b> · monohydrate: oval/biscuit</td><td>ปกติ; ethylene glycol (monohydrate)</td></tr>
    <tr class="grp"><td colspan="4">Normal — alkaline urine</td></tr>
    <tr><td>Amorphous phosphate</td><td>ด่าง</td><td>เม็ดใสละเอียด (Ca, Mg) ตะกอนขาว</td><td>ปกติ</td></tr>
    <tr><td>Triple phosphate</td><td>ด่าง</td><td>Prism ใส 3–6 ด้านปลายเฉียง <b>"coffin lid"</b></td><td>UTI (urease) → struvite stone</td></tr>
    <tr><td>Calcium phosphate</td><td>ด่าง</td><td>Prism เรียว ปลายแหลมข้างเดียว เรียงเป็น rosette</td><td>ปกติ</td></tr>
    <tr><td>Calcium carbonate</td><td>ด่าง</td><td>ทรงกลม/ดัมเบลเล็ก</td><td>ปกติ</td></tr>
    <tr><td>Ammonium biurate</td><td>ด่าง</td><td>ทรงกลมเหลืองน้ำตาลมีหนาม <b>"thorn apple"</b></td><td>ตัวอย่างเก่า</td></tr>
    <tr class="grp"><td colspan="4">Abnormal</td></tr>
    <tr><td>Cystine</td><td>กรด</td><td>แผ่น<b>หกเหลี่ยม</b>ใส</td><td>Cystinuria → cystine calculi</td></tr>
    <tr><td>Leucine</td><td>กรด</td><td>ทรงกลมเหลืองดูมัน วงซ้อน + ลาย radial</td><td>Severe liver disease</td></tr>
    <tr><td>Tyrosine</td><td>กรด</td><td>เข็มละเอียดเป็นมัด (sheaves)</td><td>Severe liver disease</td></tr>
    <tr><td>Sulfonamide</td><td>กรด</td><td>เหลืองน้ำตาล "sheaves of wheat"</td><td>ยาซัลฟา</td></tr>
    <tr><td>Ampicillin/amoxicillin</td><td>กรด</td><td>เข็มยาวบางใส</td><td>ยาขนาดสูง</td></tr>
    <tr><td>Cholesterol</td><td>กรด</td><td>แผ่นสี่เหลี่ยมมี<b>รอยบาก</b>ที่มุม</td><td>Nephrotic syndrome</td></tr>
  </tbody></table></div>`],
};
const UA_SHARED = new Set(['strip', 'cell', 'cast', 'crystal']);

function renderAtlas() {
  const L = LABS[S.lab];
  let id = S.atlasBy[S.lab];
  if (!TOP[id] || TOP[id].lab !== S.lab) id = L.defAtlas;
  const t = TOP[id];
  const list = TOPICS.filter(x => x.lab === S.lab);
  const groups = GROUPS.filter(g => g.lab === S.lab);
  const idx = list.indexOf(t);
  const prev = list[idx - 1], next = list[idx + 1];
  const nav = groups.map(g => `<div><h4>${esc(g.name)}</h4>` + list.filter(x => x.g === g.id).map(x =>
    `<button type="button" data-atlas="${x.id}" class="${x.id === t.id ? 'on' : ''}"><span>${esc(x.en)}</span><span class="dots">${x.exam ? '<span class="mark-old"></span>' : ''}${x.vs ? '<span class="mark-vs"></span>' : ''}</span></button>`).join('') + `</div>`).join('');
  const opts = groups.map(g => `<optgroup label="${esc(g.name)}">` + list.filter(x => x.g === g.id).map(x => `<option value="${x.id}"${x.id === t.id ? ' selected' : ''}>${esc(x.en)}</option>`).join('') + `</optgroup>`).join('');
  const nSt = STATIONS.filter(s => s.t === t.id).length;
  const badges = [
    `<span class="chip">${esc(GRP[t.g].name)}</span>`,
    `<span class="chip">${/\d/.test(t.pages) ? 'Lecture หน้า ' : ''}${esc(t.pages)}</span>`,
    ...(t.exam || []).map(e => `<span class="chip old">ข้อสอบ ${esc(e)}</span>`),
    t.vs ? `<span class="chip vs">Virtual slide</span>` : '',
    stars(t.star),
  ].join(' ');
  const tables = (t.html || []).map((k, i) => `<details class="sum"${i === 0 && !UA_SHARED.has(k) ? ' open' : ''}><summary>${esc(UA[k][0])}</summary><div class="sum-body">${UA[k][1]}</div></details>`).join('');

  $('#v-atlas').innerHTML = `
  <div class="atlas">
    <nav class="atlas-nav" aria-label="หัวข้อ">${nav}</nav>
    <div class="topic">
      <div class="atlas-mobile field"><label for="atlasSel">หัวข้อใน ${esc(L.name)}</label><select id="atlasSel">${opts}</select></div>
      <div class="topic-h">
        <div class="eyebrow">Atlas · ${esc(L.name)} · ${idx + 1}/${list.length}</div>
        <h2>${esc(t.en)}</h2>
        <div class="th">${esc(t.th)}</div>
        <div class="row">${badges}</div>
      </div>
      ${t.imgs.length ? `<div class="gallery">${t.imgs.map(([ref, cap]) => fig(ref, '', cap)).join('')}</div>` : ''}
      <div class="cols2">
        <div class="panel stack"><div class="eyebrow">จากสไลด์ Lecture</div><ul class="list">${t.lec.map(x => `<li>${x}</li>`).join('')}</ul></div>
        <div class="panel stack"><div class="eyebrow" style="color:var(--eosin)">อาจารย์เสริม — ต้องรู้เพิ่ม</div><ul class="list add">${t.add.map(x => `<li>${x}</li>`).join('')}</ul></div>
      </div>
      ${tables ? `<div class="stack">${tables}</div>` : ''}
      <div class="ospe-box"><div class="eyebrow">เขียนตอบใน OSPE แบบนี้</div><p>${t.ospe}</p></div>
      <div class="topic-nav">
        <button class="btn primary" type="button" data-practice-topic="${t.id}">ฝึกหัวข้อนี้ (${nSt} สถานี)</button>
        <span class="row">
          ${prev ? `<button class="btn" type="button" data-atlas="${prev.id}">← ${esc(prev.en)}</button>` : ''}
          ${next ? `<button class="btn" type="button" data-atlas="${next.id}">${esc(next.en)} →</button>` : ''}
        </span>
      </div>
    </div>
  </div>`;
  $('#atlasSel').addEventListener('change', e => { S.atlasBy[S.lab] = e.target.value; save(); renderAtlas(); window.scrollTo(0, 0); });
}
document.addEventListener('click', e => {
  const a = e.target.closest('[data-atlas]');
  if (a) { S.atlasBy[S.lab] = a.dataset.atlas; save(); renderAtlas(); window.scrollTo(0, 0); return; }
  const p = e.target.closest('[data-practice-topic]');
  if (p) { P.f = { g: 'all', src: 'all', topic: p.dataset.practiceTopic, order: 'seq' }; P.queue = null; go('practice'); }
});

/* ======================================================================
 * Station renderer (shared by practice + exam)
 * ==================================================================== */
function stationHTML(s, o) {
  const n = (s.im || []).length;
  const tags = n > 1 ? ['A', 'B', 'C', 'D'] : [''];
  const figs = (s.im || []).map((ref, i) => fig(ref, tags[i] || '', '')).join('');
  const parts = s.p.map((p, i) => `
    <div class="part">
      <label class="part-q" for="ans-${i}"><span class="pn">${i + 1}.</span>${esc(p.q)}</label>
      <input type="text" id="ans-${i}" data-i="${i}" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="พิมพ์คำตอบ">
      <div class="res-slot" id="res-${i}"></div>
    </div>`).join('');
  return `
  <article class="st">
    <div class="st-h">
      <div class="st-no">${o.title}</div>
      <div class="row">${o.chips || ''}</div>
    </div>
    <div class="bench${n ? '' : ' no-media'}">
      <div class="bench-media n${Math.min(n, 3)}${n ? '' : ' n0'}">${figs}</div>
      <div class="sheet">
        ${s.stem ? `<div class="stem">${esc(s.stem)}</div>` : ''}
        ${parts}
        <div class="st-actions" id="stActions">${o.actions || ''}</div>
        <div id="stExplain"></div>
      </div>
    </div>
  </article>`;
}
function resHTML(p, r, showKey) {
  const cls = r.empty ? 's-none' : band(r.score);
  const chips = r.empty ? '' : r.hits.map(h => `<span class="chip ok">✓ ${esc(h)}</span>`).join('')
    + (r.hits.length < r.need ? r.miss.slice(0, Math.max(2, r.need - r.hits.length)).map(m => `<span class="chip miss">✗ ${esc(m)}</span>`).join('') : '');
  return `<div class="res ${cls}">
    ${showKey ? `<div><span class="lbl">เฉลย</span> <span class="key">${esc(p.a)}</span></div>` : ''}
    ${r.empty ? `<div class="small muted">ไม่ได้ตอบ</div>` : `<div class="row between"><span class="lbl">ตรวจอัตโนมัติ ${Math.min(r.hits.length, r.need)}/${r.need} จุด</span><span class="mono small"><b>${pct(r.score)}%</b></span></div><div class="chips">${chips}</div>`}
  </div>`;
}
function explainHTML(s) {
  const t = TOP[s.t];
  return `<div class="explain">
    <div class="eyebrow">อาจารย์อธิบาย</div>
    <p>${s.x || ''}</p>
    ${s.am ? `<div class="ans-figs">${s.am.map(r => fig(r, '', 'ภาพเฉลย (มี label)')).join('')}</div>` : ''}
    <div class="row small muted"><span>${esc(s.ref)}</span>·<a href="${labHash('atlas', t.lab)}" data-go="atlas" data-topic="${t.id}">Atlas: ${esc(t.en)}</a></div>
  </div>`;
}
function wireInputs(onLastEnter) {
  const ins = $$('.sheet input[type="text"]');
  ins.forEach((inp, i) => {
    inp.addEventListener('keydown', e => {
      if (e.key !== 'Enter' || e.isComposing) return;
      e.preventDefault();
      if (e.ctrlKey || e.metaKey || i === ins.length - 1) onLastEnter(); else ins[i + 1].focus();
    });
  });
  return ins;
}

/* ======================================================================
 * PRACTICE
 * ==================================================================== */
const P = { f: { g: 'all', src: 'all', topic: '', order: 'shuffle' }, queue: null, i: 0, revealed: false, fOpen: window.innerWidth > 760 };
function practicePool() {
  const f = P.f;
  return STATIONS.filter(s => {
    if (s.lab !== S.lab) return false;
    if (f.topic) return s.t === f.topic;
    if (f.g !== 'all' && s.g !== f.g) return false;
    if (f.src === 'old' && !OLD_IDS.has(s.id)) return false;
    if (f.src === 'lec' && OLD_IDS.has(s.id)) return false;
    if (f.src === 'wrong') { const m = S.marks[s.id]; if (!m || m.last !== 'w') return false; }
    if (f.src === 'new' && S.marks[s.id]) return false;
    return true;
  });
}
function buildQueue() {
  if (P.f.topic && (!TOP[P.f.topic] || TOP[P.f.topic].lab !== S.lab)) P.f.topic = '';
  if (P.f.g !== 'all' && (!GRP[P.f.g] || GRP[P.f.g].lab !== S.lab)) P.f.g = 'all';
  const pool = practicePool().map(s => s.id);
  P.queue = P.f.order === 'shuffle' ? shuffle(pool) : pool;
  P.i = 0; P.revealed = false;
}
function renderPractice() {
  if (!P.queue) buildQueue();
  const f = P.f, L = LABS[S.lab];
  const segBtns = (name, items, cur) => items.map(([v, l]) => `<button type="button" data-pf="${name}" data-v="${v}" class="${cur === v ? 'on' : ''}">${l}</button>`).join('');
  const wrongN = STATIONS.filter(s => s.lab === S.lab && S.marks[s.id] && S.marks[s.id].last === 'w').length;
  const srcName = { all: 'ทุกแหล่ง', old: 'ข้อสอบเก่า', lec: 'Lecture + คาดการณ์', new: 'ยังไม่เคยทำ', wrong: 'ยังไม่แม่น' }[f.src];
  const bar = `
  <div class="panel stack">
    <div class="sec-h"><h2>โหมดทบทวน · ${esc(L.name)}</h2><span class="muted small">พิมพ์คำตอบ → ดูเฉลย → ให้คะแนนตัวเอง<span class="kbd"> · <span class="mono">Enter</span> ไปข้อย่อยถัดไป</span></span></div>
    ${f.topic ? `<div class="row"><span class="chip vs">เฉพาะหัวข้อ: ${esc(TOP[f.topic].en)}</span><button class="btn ghost" type="button" id="clearTopic">ดูทุกหัวข้อ</button></div>` : ''}
    <details class="pf" id="pf"${P.fOpen ? ' open' : ''}>
      <summary>ตัวกรอง · <span class="muted">${esc(f.topic ? TOP[f.topic].en : f.g === 'all' ? 'ทุกหมวด' : GRP[f.g].name)} · ${srcName} · ${f.order === 'shuffle' ? 'สุ่มลำดับ' : 'เรียงตามเนื้อหา'} · ${P.queue.length} สถานี</span></summary>
      <div class="stack" style="margin-top:10px">
      ${f.topic ? '' : `<div class="seg" aria-label="หมวด">${segBtns('g', [['all', 'ทุกหมวด'], ...GROUPS.filter(g => g.lab === S.lab).map(g => [g.id, g.name])], f.g)}</div>
      <div class="seg" aria-label="แหล่งข้อสอบ">${segBtns('src', [['all', 'ทุกแหล่ง'], ['old', 'ข้อสอบเก่า'], ['lec', 'Lecture + คาดการณ์'], ['new', 'ยังไม่เคยทำ'], ['wrong', `ยังไม่แม่น (${wrongN})`]], f.src)}</div>`}
      <div class="seg" aria-label="ลำดับ">${segBtns('order', [['shuffle', 'สุ่มลำดับ'], ['seq', 'เรียงตามเนื้อหา']], f.order)}</div>
      </div>
    </details>
  </div>`;
  const q = P.queue;
  if (!q.length) {
    $('#v-practice').innerHTML = bar + `<div class="panel"><p>ไม่มีสถานีที่ตรงกับตัวกรองนี้${f.src === 'wrong' ? ' — ยังไม่มีข้อที่ตอบผิดใน LAB นี้' : ''}</p></div>`;
    wirePracticeBar(); return;
  }
  if (P.i >= q.length) {
    $('#v-practice').innerHTML = bar + `<div class="panel stack"><h2>ครบ ${q.length} สถานีแล้ว</h2><p class="muted">ลองโหมด Exam จับเวลา หรือเลือก "ยังไม่แม่น" เพื่อทวนเฉพาะข้อที่พลาด</p><div class="row"><button class="btn primary" type="button" id="pAgain">เริ่มรอบใหม่</button><a class="btn" href="${labHash('exam')}" data-go="exam">ไป Exam</a></div></div>`;
    wirePracticeBar(); $('#pAgain').addEventListener('click', () => { buildQueue(); renderPractice(); }); return;
  }
  const s = STA[q[P.i]];
  const pads = q.map((id, i) => i === P.i ? 'cur' : (S.marks[id] ? 's-' + (S.marks[id].last === 'r' ? 'good' : 'bad') : ''));
  $('#v-practice').innerHTML = bar
    + `<div class="stack">${strip_(q.length, pads, { label: 'ความคืบหน้าในชุดนี้' })}</div>`
    + stationHTML(s, {
      title: `Station <span class="mono">${P.i + 1}/${q.length}</span>`,
      chips: kindChip(s) + srcChip(s),
      actions: `<button class="btn primary" type="button" id="pReveal">ดูเฉลย <span class="k kbd">Ctrl+Enter</span></button><button class="btn ghost" type="button" id="pSkip">ข้าม →</button>`,
    });
  wirePracticeBar();
  const ins = wireInputs(() => { if (P.revealed) { mark(s.id, !!P.auto); P.i++; P.revealed = false; renderPractice(); } else practiceReveal(); });
  $('#pReveal').addEventListener('click', practiceReveal);
  $('#pSkip').addEventListener('click', () => { P.i++; P.revealed = false; renderPractice(); });
  P.revealed = false;
  if (window.matchMedia && matchMedia('(pointer: fine)').matches && ins[0]) ins[0].focus({ preventScroll: true });
}
function wirePracticeBar() {
  const d = $('#pf');
  if (d) d.addEventListener('toggle', () => { P.fOpen = d.open; });
  $$('[data-pf]').forEach(b => b.addEventListener('click', () => { P.f[b.dataset.pf] = b.dataset.v; buildQueue(); renderPractice(); }));
  const c = $('#clearTopic');
  if (c) c.addEventListener('click', () => { P.f.topic = ''; buildQueue(); renderPractice(); });
}
function practiceReveal() {
  if (P.revealed) return;
  P.revealed = true;
  const s = STA[P.queue[P.i]];
  let tot = 0, any = false;
  s.p.forEach((p, i) => {
    const r = grade(p, $('#ans-' + i).value); tot += r.score; any = any || !r.empty;
    $('#res-' + i).innerHTML = resHTML(p, r, true);
  });
  const avg = tot / s.p.length;
  P.auto = any && avg >= .8;
  $('#stActions').innerHTML = `<span class="small muted">${any ? `ตรวจอัตโนมัติได้ <b class="mono">${pct(avg)}%</b> · ` : ''}ให้คะแนนตัวเอง:</span>
    <button class="btn good" type="button" id="pRight">✓ ตอบได้</button>
    <button class="btn bad" type="button" id="pWrong">✗ ยังไม่แม่น</button>
    <span class="spacer"></span><span class="small muted mono kbd">Ctrl+Enter = ${P.auto ? 'ตอบได้' : 'ยังไม่แม่น'} แล้วไปต่อ</span>`;
  $('#stExplain').innerHTML = explainHTML(s);
  $('#pRight').addEventListener('click', () => { mark(s.id, true); P.i++; P.revealed = false; renderPractice(); });
  $('#pWrong').addEventListener('click', () => { mark(s.id, false); P.i++; P.revealed = false; renderPractice(); });
}
document.addEventListener('keydown', e => {
  if (view === 'practice' && (e.ctrlKey || e.metaKey) && e.key === 'Enter' && document.activeElement.tagName !== 'INPUT') {
    if (!$('#pReveal') && !$('#pRight')) return;
    e.preventDefault();
    if (!P.revealed) practiceReveal(); else { mark(P.queue[P.i], !!P.auto); P.i++; P.revealed = false; renderPractice(); }
  }
});

/* ======================================================================
 * EXAM
 * ==================================================================== */
const EX = { running: false, ids: [], i: 0, ans: [], secs: 60, end: 0, raf: 0, label: '', lab: '', report: null, ctx: null };

function pickBalanced(pool, n) {
  const byTopic = {};
  shuffle(pool).forEach(s => { (byTopic[s.t] = byTopic[s.t] || []).push(s); });
  let order = [];
  Object.keys(byTopic).forEach(t => { for (let k = 0; k < TOP[t].star; k++) order.push(t); });
  order = shuffle(order).filter((t, i, a) => a.indexOf(t) === i);
  const out = [];
  while (out.length < n && order.some(t => byTopic[t].length)) {
    for (const t of order) { if (out.length >= n) break; const s = byTopic[t].shift(); if (s) out.push(s); }
  }
  return out;
}
function buildExam(count, src) {
  let pool = STATIONS.filter(s => src === 'both' || s.lab === S.lab);
  if (src === 'old') pool = pool.filter(s => OLD_IDS.has(s.id));
  if (src === 'lec') pool = pool.filter(s => !OLD_IDS.has(s.id));
  if (src === 'wrong') pool = pool.filter(s => S.marks[s.id] && S.marks[s.id].last === 'w');
  if (count === 'all') return shuffle(pool).map(s => s.id);
  count = +count;
  if (src === 'both') {
    const nu = Math.round(count / 3);
    const ua = pickBalanced(pool.filter(inLab('urine')), nu);
    const pa = pickBalanced(pool.filter(inLab('patho')), count - ua.length);
    return pa.concat(ua).map(s => s.id);
  }
  return pickBalanced(pool, count).map(s => s.id);
}
function renderExam() {
  if (EX.running) { renderExamStation(); return; }
  if (EX.report) { renderReport(); return; }
  const L = LABS[S.lab];
  const wrongN = STATIONS.filter(s => s.lab === S.lab && S.marks[s.id] && S.marks[s.id].last === 'w').length;
  const nLab = STATIONS.filter(inLab(S.lab)).length;
  $('#v-exam').innerHTML = `
  <div class="ex-setup">
    <div class="panel stack">
      <div class="eyebrow">Exam simulation · ${esc(L.name)}</div>
      <h2 style="font-size:1.5rem">จับเวลาสถานีละ ${S.secs} วินาที</h2>
      <p class="muted">เหมือนห้องสอบจริง: ย้อนกลับไม่ได้ หมดเวลาแล้วเลื่อนสถานีเองพร้อมเสียงสัญญาณ ตรวจคะแนนตอนจบ และแก้คะแนนเองได้ถ้าระบบตรวจพลาด</p>
      <form class="ex-form" id="exForm">
        <div class="field"><label for="exSrc">ชุดข้อสอบ</label>
          <select id="exSrc">
            <option value="all">${esc(L.name)}: ทุกแหล่ง (${nLab} สถานี)</option>
            <option value="old">${esc(L.name)}: ข้อสอบเก่าเท่านั้น</option>
            <option value="lec">${esc(L.name)}: Lecture + คาดการณ์</option>
            <option value="wrong">${esc(L.name)}: ข้อที่ยังไม่แม่น (${wrongN})</option>
            <option value="both">รวม 2 LAB แบบสอบจริง (Patho 2 : Urine 1)</option>
          </select></div>
        <div class="field"><label for="exCount">จำนวนสถานี</label>
          <select id="exCount"><option value="10">10 สถานี</option><option value="15" selected>15 สถานี (เท่าปี 2563)</option><option value="20">20 สถานี</option><option value="30">30 สถานี</option><option value="all">ทั้งหมดในชุด</option></select></div>
        <div class="field"><label for="exSecs">เวลาต่อสถานี</label>
          <select id="exSecs">${[45, 60, 90, 120].map(v => `<option value="${v}"${v === S.secs ? ' selected' : ''}>${v} วินาที${v === 60 ? ' (มาตรฐาน)' : ''}</option>`).join('')}</select></div>
        <div class="row"><button class="btn primary" type="submit">เริ่มสอบ</button><span class="small muted">เปิดเสียงเพื่อได้ยินสัญญาณเปลี่ยนสถานี</span></div>
      </form>
    </div>
    <div class="panel stack">
      <h3>ข้อสอบเก่าแบบเต็มชุด</h3>
      ${PAPERS.map(p => {
        const mine = p.items.filter(i => STA[i.st].lab === S.lab).length;
        return `<div class="stack" style="gap:6px"><b>${esc(p.title)}</b><span class="small muted">${esc(p.summary)} · ${p.items.length} ข้อ (ส่วน ${esc(L.short)} ${mine} ข้อ)</span><div class="row"><button class="btn" type="button" data-paper-exam="${p.id}" data-scope="lab"${mine ? '' : ' disabled'}>สอบส่วน ${esc(L.short)}</button><button class="btn ghost" type="button" data-paper-exam="${p.id}" data-scope="all">ทั้งชุด 2 LAB</button></div></div>`;
      }).join('<hr style="border:0;border-top:1px solid var(--line);margin:4px 0">')}
      <p class="small muted">ตรวจคำตอบจากคำสำคัญ (keyword) ยอมรับคำพ้องและสะกดผิดเล็กน้อย เขียนเป็นภาษาอังกฤษจะตรวจได้แม่นที่สุด</p>
    </div>
  </div>`;
  $('#exForm').addEventListener('submit', e => {
    e.preventDefault();
    S.secs = +$('#exSecs').value; save();
    const src = $('#exSrc').value;
    const ids = buildExam($('#exCount').value, src);
    if (!ids.length) { toast('ชุดนี้ยังไม่มีสถานี'); return; }
    startExam(ids, src === 'both' ? 'รวม 2 LAB' : `${L.short} · ${$('#exSrc').selectedOptions[0].textContent.split(': ')[1].replace(/\s*\(.*\)$/, '')}`, src === 'both' ? 'both' : S.lab);
  });
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-paper-exam]');
  if (!b || b.disabled) return;
  const p = PAPERS.find(x => x.id === b.dataset.paperExam);
  const all = b.dataset.scope === 'all';
  const ids = p.items.map(i => i.st).filter((v, i, a) => a.indexOf(v) === i).filter(id => all || STA[id].lab === S.lab);
  EX.report = null;
  if (view !== 'exam') {
    /* switch the visible view first so the exam renders into a live, unique DOM */
    view = 'exam';
    VIEWS.forEach(n => { const el = $('#v-' + n); el.hidden = n !== 'exam'; if (n !== 'exam') el.innerHTML = ''; });
    $$('#tabs a').forEach(a => a.classList.toggle('on', a.dataset.v === 'exam'));
    history.replaceState(null, '', labHash('exam'));
  }
  startExam(ids, all ? `${p.by} · ทั้งชุด` : `${p.by} · ส่วน ${LABS[S.lab].short}`, all ? 'both' : S.lab);
});
function beep(freq, dur) {
  try {
    const ctx = EX.ctx; if (!ctx) return;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.frequency.value = freq; o.type = 'sine';
    g.gain.setValueAtTime(.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(.25, ctx.currentTime + .02);
    g.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + dur);
    o.connect(g); g.connect(ctx.destination); o.start(); o.stop(ctx.currentTime + dur + .05);
  } catch (e) { /* audio unavailable */ }
}
function startExam(ids, label, lab) {
  try { EX.ctx = EX.ctx || new (window.AudioContext || window.webkitAudioContext)(); if (EX.ctx.resume) EX.ctx.resume(); } catch (e) { EX.ctx = null; }
  Object.assign(EX, { running: true, ids, i: 0, ans: ids.map(id => STA[id].p.map(() => '')), secs: S.secs, label, lab, report: null });
  $('#tabs').hidden = true; $('#labSw').hidden = true; $('#examLive').hidden = false;
  renderExamStation();
}
function renderExamStation() {
  const s = STA[EX.ids[EX.i]];
  const pads = EX.ids.map((_, i) => i < EX.i ? 'done' : i === EX.i ? 'cur' : '');
  $('#v-exam').innerHTML = `
  <div class="ex-bar">
    <div class="ring" id="ring"><svg viewBox="0 0 64 64" aria-hidden="true"><circle class="trk" cx="32" cy="32" r="27"/><circle class="val" id="ringVal" cx="32" cy="32" r="27" stroke-dasharray="169.6" stroke-dashoffset="0"/></svg><div class="t" id="ringT">${EX.secs}</div></div>
    <div class="ex-meta"><div class="row between"><b>สถานี ${EX.i + 1} จาก ${EX.ids.length}</b><span class="small muted">${esc(EX.label)}</span></div>${strip_(EX.ids.length, pads, { label: 'สถานีที่ทำแล้ว' })}</div>
  </div>`
  + stationHTML(s, {
    title: `Station <span class="mono">${EX.i + 1}</span>`,
    chips: (EX.lab === 'both' ? labChip(s.lab) : '') + kindChip(s),
    actions: `<button class="btn primary" type="button" id="exNext">${EX.i + 1 < EX.ids.length ? 'ส่งและไปสถานีถัดไป →' : 'ส่งข้อสุดท้าย'}</button><span class="small muted">หมดเวลาจะส่งให้อัตโนมัติ</span>`,
  });
  const ins = wireInputs(() => {
    const empty = ins.find(x => !x.value.trim());
    if (empty) empty.focus(); else examAdvance();
  });
  $('#exNext').addEventListener('click', examAdvance);
  if (ins[0]) ins[0].focus({ preventScroll: true });
  EX.end = performance.now() + EX.secs * 1000;
  EX.warned = false;
  cancelAnimationFrame(EX.raf);
  const tick = () => {
    const left = Math.max(0, EX.end - performance.now());
    const sec = Math.ceil(left / 1000);
    const t = $('#ringT'); if (!t) return;
    t.textContent = sec;
    $('#ringVal').setAttribute('stroke-dashoffset', (169.6 * (1 - left / (EX.secs * 1000))).toFixed(1));
    $('#ring').classList.toggle('low', sec <= 10);
    if (sec <= 10 && !EX.warned) { EX.warned = true; beep(660, .12); }
    if (left <= 0) { examAdvance(); return; }
    EX.raf = requestAnimationFrame(tick);
  };
  EX.raf = requestAnimationFrame(tick);
}
function examAdvance() {
  if (!EX.running) return;
  cancelAnimationFrame(EX.raf);
  EX.ans[EX.i] = STA[EX.ids[EX.i]].p.map((_, i) => { const el = $('#ans-' + i); return el ? el.value : ''; });
  beep(880, .22);
  EX.i++;
  if (EX.i < EX.ids.length) { renderExamStation(); window.scrollTo(0, 0); return; }
  finishExam();
}
function endExamUI() {
  EX.running = false;
  $('#tabs').hidden = false; $('#labSw').hidden = false; $('#examLive').hidden = true;
}
function finishExam() {
  endExamUI();
  const items = EX.ids.map((id, k) => ({ id, parts: STA[id].p.map((p, i) => ({ r: grade(p, EX.ans[k][i]), ov: null })) }));
  const rec = { t: Date.now(), n: items.length, label: EX.label, lab: EX.lab, pct: 0 };
  S.exams.push(rec);
  EX.report = { items, rec };
  items.forEach(it => { mark(it.id, stationScore(it) >= .6); });
  updateRecord();
  renderReport();
  window.scrollTo(0, 0);
}
function partScore(pt) { return pt.ov != null ? pt.ov : pt.r.score; }
function stationScore(it) { return it.parts.reduce((a, pt) => a + partScore(pt), 0) / it.parts.length; }
function updateRecord() {
  const R = EX.report;
  const tot = R.items.reduce((a, it) => a + stationScore(it), 0);
  R.rec.pct = Math.round(tot / R.items.length * 100);
  R.rec.score = Math.round(tot * 10) / 10;
  save();
}
function renderReport() {
  const R = EX.report;
  const tot = R.items.reduce((a, it) => a + stationScore(it), 0);
  const pads = R.items.map(it => band(stationScore(it)));
  const byG = GROUPS.map(g => {
    const its = R.items.filter(it => STA[it.id].g === g.id);
    return its.length ? { g, n: its.length, v: its.reduce((a, it) => a + stationScore(it), 0) / its.length } : null;
  }).filter(Boolean);
  const mixed = new Set(R.items.map(it => STA[it.id].lab)).size > 1;
  const list = R.items.map((it, k) => {
    const s = STA[it.id], sc = stationScore(it), t = TOP[s.t];
    const thumbRef = (s.im || [])[0];
    const thumb = !thumbRef ? `<span class="tx">TEXT</span>` : thumbRef.startsWith('svg:') ? URINE.draw(thumbRef.slice(4)) : `<img src="img/${thumbRef}.jpg" alt="" loading="lazy">`;
    const parts = s.p.map((p, i) => {
      const pt = it.parts[i], v = partScore(pt);
      return `<div class="rep-part">
        <div class="part-q"><span class="pn">${i + 1}.</span>${esc(p.q)}</div>
        <div class="yours"><span class="lbl">คุณตอบ</span>${pt.r.empty ? '<span class="muted">— ไม่ได้ตอบ —</span>' : esc(EX.ans[k][i])}</div>
        ${resHTML(p, pt.r, true)}
        <div class="ovr"><span class="small muted">ให้คะแนนเอง:</span>${[[1, 'เต็ม'], [.5, 'ครึ่ง'], [0, 'ศูนย์']].map(([val, l]) => `<button type="button" data-ovr="${k}:${i}:${val}" class="${pt.ov === val ? 'on' : ''}">${l}</button>`).join('')}${pt.ov != null ? `<button type="button" data-ovr="${k}:${i}:auto">ใช้คะแนนระบบ</button>` : ''}<span class="mono small" style="margin-left:auto">${pct(v)}%</span></div>
      </div>`;
    }).join('');
    return `<details class="rep-item"${sc < .6 ? ' open' : ''}>
      <summary><span class="rep-thumb">${thumb}</span><span><b>${k + 1}. ${esc(t.en)}</b><br><span class="small muted">${mixed ? esc(LABS[s.lab].short) + ' · ' : ''}${esc(s.kind)} · ${esc(s.ref)}</span></span><span class="rep-score ${band(sc)}">${pct(sc)}%</span></summary>
      <div class="rep-body">
        ${(s.im || []).length ? `<div class="ans-figs">${s.im.map((r, i) => fig(r, s.im.length > 1 ? 'ABCD'[i] : '', '')).join('')}</div>` : ''}
        ${parts}
        ${explainHTML(s)}
      </div>
    </details>`;
  }).join('');
  $('#v-exam').innerHTML = `
  <div class="panel stack">
    <div class="score-hero">
      <div class="score-big">${Math.round(tot * 10) / 10}<small> / ${R.items.length}</small></div>
      <div class="stack" style="gap:8px">
        <div class="row between"><b>${pct(tot / R.items.length)}% · ${esc(R.rec.label)}</b><span class="small muted">${new Date(R.rec.t).toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' })}</span></div>
        ${strip_(R.items.length, pads, { big: true, label: 'คะแนนรายสถานี' })}
        <div class="legend"><span><i style="background:var(--good)"></i>≥ 80%</span><span><i style="background:var(--warn)"></i>40–79%</span><span><i style="background:var(--bad)"></i>&lt; 40%</span></div>
      </div>
    </div>
    <div class="bygroup">${byG.map(x => `<div class="bg-row"><span>${esc(x.g.name)} <span class="muted small">(${x.n})</span></span><span class="bg-bar"><i style="width:${pct(x.v)}%"></i></span><span class="mono small">${pct(x.v)}%</span></div>`).join('')}</div>
    <div class="row"><button class="btn primary" type="button" id="exAgain">สอบใหม่</button><a class="btn" href="${labHash('practice')}" data-go="practice" id="exPractice">ทวนข้อที่ยังไม่แม่น (${esc(LABS[S.lab].short)})</a></div>
    <p class="small muted">ระบบตรวจจากคำสำคัญ ถ้าคำตอบถูกแต่ใช้คำต่างไป ให้กด "เต็ม" หรือ "ครึ่ง" เพื่อแก้คะแนน — คะแนนรวมและประวัติจะอัปเดตทันที</p>
  </div>
  <div class="stack">${list}</div>`;
  $('#exAgain').addEventListener('click', () => { EX.report = null; renderExam(); window.scrollTo(0, 0); });
  $('#exPractice').addEventListener('click', () => { P.f = { g: 'all', src: 'wrong', topic: '', order: 'shuffle' }; P.queue = null; });
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-ovr]');
  if (!b || !EX.report) return;
  const [k, i, v] = b.dataset.ovr.split(':');
  const it = EX.report.items[+k];
  it.parts[+i].ov = v === 'auto' ? null : +v;
  const m = S.marks[it.id];
  if (m) m.last = stationScore(it) >= .6 ? 'r' : 'w';
  updateRecord();
  const open = $$('.rep-item').map(d => d.open);
  const y = window.scrollY;
  renderReport();
  $$('.rep-item').forEach((d, j) => { d.open = open[j]; });
  window.scrollTo(0, y);
});
let quitArm = 0;
$('#examQuit').addEventListener('click', () => {
  if (Date.now() - quitArm > 3000) { quitArm = Date.now(); $('#examQuit').textContent = 'กดอีกครั้งเพื่อยืนยัน'; setTimeout(() => { $('#examQuit').textContent = 'ออกจากการสอบ'; }, 3000); return; }
  cancelAnimationFrame(EX.raf);
  endExamUI(); EX.report = null;
  $('#examQuit').textContent = 'ออกจากการสอบ';
  toast('ยกเลิกการสอบแล้ว ไม่บันทึกคะแนน');
  renderExam();
});

/* ======================================================================
 * PAPERS
 * ==================================================================== */
function renderPapers() {
  const L = LABS[S.lab];
  $('#v-papers').innerHTML = `
  <div class="panel stack">
    <div class="sec-h"><h2>ข้อสอบเก่า · ส่วน ${esc(L.name)}</h2><span class="muted small">ภาพที่มี label ถูกบังคำตอบไว้ เปิดเฉลยจะเห็นภาพต้นฉบับ</span></div>
    <div class="row"><button class="btn" type="button" id="openAll">เปิดเฉลยทั้งหมด</button><button class="btn ghost" type="button" id="closeAll">ซ่อนเฉลยทั้งหมด</button></div>
  </div>
  ${PAPERS.map(p => {
    const items = p.items.filter(it => STA[it.st].lab === S.lab);
    return `
  <section class="paper">
    <div class="paper-h">
      <div class="stack" style="gap:4px"><div class="eyebrow">${esc(p.by)}</div><h2>${esc(p.title)}</h2><span class="small muted">${esc(p.summary)} · แสดงส่วน ${esc(L.short)} ${items.length} จาก ${p.items.length} ข้อ</span></div>
      <div class="row"><button class="btn primary" type="button" data-paper-exam="${p.id}" data-scope="lab"${items.length ? '' : ' disabled'}>สอบส่วนนี้ · ${S.secs} วินาที/ข้อ</button><button class="btn ghost" type="button" data-paper-exam="${p.id}" data-scope="all">ทั้งชุด 2 LAB</button></div>
    </div>
    ${items.length ? '' : '<p class="muted">ชุดนี้ไม่มีข้อในส่วนนี้</p>'}
    ${items.map(it => {
      const s = STA[it.st];
      return (it.sec ? `<div class="q-sec">${esc(it.sec)}</div>` : '') + `
      <div class="q-item">
        <div class="q-no">${esc(it.no)}</div>
        <div class="q-body">
          ${s.stem ? `<div class="stem">${esc(s.stem)}</div>` : ''}
          ${(s.im || []).length ? `<div class="q-figs">${s.im.map((r, i) => fig(r, s.im.length > 1 ? 'ABCD'[i] : '', '')).join('')}</div>` : ''}
          ${s.p.map((q, i) => `<div><b>${esc(it.no)}.${i + 1}</b> ${esc(q.q)}</div>`).join('')}
          <details class="ans"><summary>ดูเฉลย</summary>
            <div class="stack" style="gap:6px">
              ${s.p.map((q, i) => `<div><b>${esc(it.no)}.${i + 1}</b> <span class="ans-line">${esc(q.a)}</span></div>`).join('')}
              ${s.am ? `<div class="q-figs">${s.am.map(r => fig(r, '', 'ภาพต้นฉบับ (มี label)')).join('')}</div>` : ''}
              <p class="small">${s.x || ''}</p>
            </div>
          </details>
          ${it.note ? `<div class="note">${esc(it.note)}</div>` : ''}
        </div>
      </div>`;
    }).join('')}
  </section>`;
  }).join('')}`;
  $('#openAll').addEventListener('click', () => $$('#v-papers details.ans').forEach(d => { d.open = true; }));
  $('#closeAll').addEventListener('click', () => $$('#v-papers details.ans').forEach(d => { d.open = false; }));
}

const RENDER = { home: renderHome, atlas: renderAtlas, practice: renderPractice, exam: renderExam, papers: renderPapers };
applyLab();
route();

/* expose the checker for quick console tests */
window.KUB_CHECK = { norm, grade, hasKey };
})();
