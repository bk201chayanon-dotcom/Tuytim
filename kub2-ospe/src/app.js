/* ------------------------------------------------------------------
 * app.js — หน้าแรก / Atlas / ทบทวน / Exam / ข้อสอบเก่า
 * ความคืบหน้าเก็บใน localStorage ของเบราว์เซอร์นี้เท่านั้น
 * ------------------------------------------------------------------ */
(function () {
'use strict';

const { GROUPS, TOPICS, STATIONS, PAPERS } = window.KUB;
const URINE = window.URINE;
const TOP = {}; TOPICS.forEach(t => { TOP[t.id] = t; });
const STA = {}; STATIONS.forEach(s => { STA[s.id] = s; s.g = TOP[s.t].g; });
const GRP = {}; GROUPS.forEach(g => { GRP[g.id] = g; });
const OLD_IDS = new Set(PAPERS.flatMap(p => p.items.map(i => i.st)));

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
const S = { marks: {}, exams: [], secs: 60, atlas: 'adpkd', theme: '' };
try { const raw = localStorage.getItem(KEY); if (raw) Object.assign(S, JSON.parse(raw)); } catch (e) { /* storage blocked */ }
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
/* คู่คำที่สะกดใกล้กันแต่ความหมายต่างกัน: ห้ามนับเป็นคำสะกดผิด */
const NOFUZZ = new Set(['nephrotic', 'nephritic', 'papillary', 'capillary', 'adpkd', 'arpkd', 'cystica', 'cystine']);
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
  if (isNum(k)) return toks.includes(k);
  const kw = k.split(' ');
  if (kw.length === 1 && kw[0].length < 5 && !/[฀-๿]/.test(k)) return toks.some(t => t === k || t === k + 's' || (k.length >= 4 && t.startsWith(k)));
  if (inp.includes(k) && !(kw.length === 1 && kw[0].length < 5)) return true;
  if (/[฀-๿]/.test(k)) return inp.includes(k);
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
const ZOOM_ICON = '<svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';
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
function kindChip(s) { return `<span class="chip${s.g === 'ua' ? ' ua' : ''}">${esc(s.kind)}</span>`; }
function strip_(n, pads, opts) {
  opts = opts || {};
  let h = `<div class="strip${opts.big ? ' big' : ''}${n > 24 ? ' dense' : ''}" role="img" aria-label="${esc(opts.label || 'แถบความคืบหน้า')}"><div class="strip-handle"></div><div class="strip-body">`;
  for (let i = 0; i < n; i++) h += `<span class="pad ${pads[i] || ''}"></span>`;
  return h + `</div></div>`;
}

/* ---------- lightbox ---------- */
const lb = $('#lb');
let lbZoom = 1;
function openLb(ref, cap) {
  $('#lbInner').innerHTML = media(ref) + (cap ? `<div class="lb-cap">${esc(cap)}</div>` : '');
  lbZoom = 1; setZoom(1);
  lb.hidden = false; $('#lbClose').focus();
}
function setZoom(z) {
  lbZoom = z;
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
 * Router
 * ==================================================================== */
const VIEWS = ['home', 'atlas', 'practice', 'exam', 'papers'];
let view = '';
function route() {
  let v = (location.hash || '').slice(1);
  if (!VIEWS.includes(v)) v = 'home';
  if (EX.running && v !== 'exam') { location.hash = 'exam'; toast('กำลังสอบอยู่ — กด "ออกจากการสอบ" ก่อนถ้าจะไปหน้าอื่น'); return; }
  if (EX.running && view === 'exam') return;
  view = v;
  VIEWS.forEach(n => { $('#v-' + n).hidden = n !== v; });
  $$('#tabs a').forEach(a => a.classList.toggle('on', a.dataset.v === v));
  RENDER[v]();
  window.scrollTo(0, 0);
}
function go(v) { if (location.hash.slice(1) === v) route(); else location.hash = v; }
window.addEventListener('hashchange', route);
document.addEventListener('click', e => {
  const b = e.target.closest('[data-go]');
  if (b) { e.preventDefault(); const t = b.dataset.topic; if (t) S.atlas = t; go(b.dataset.go); }
});

/* ======================================================================
 * HOME
 * ==================================================================== */
function groupStats() {
  return GROUPS.map(g => {
    const ids = STATIONS.filter(s => s.g === g.id).map(s => s.id);
    let r = 0, w = 0, seen = 0;
    ids.forEach(id => { const m = S.marks[id]; if (m) { seen++; m.last === 'r' ? r++ : w++; } });
    return { g, total: ids.length, seen, acc: seen ? r / seen : null };
  });
}
function renderHome() {
  const gs = groupStats();
  const pads = gs.map(x => x.acc == null ? '' : 's-' + (x.acc >= .8 ? 'good' : x.acc >= .5 ? 'warn' : 'bad'));
  const seen = Object.keys(S.marks).filter(id => STA[id]).length;
  const last = S.exams[S.exams.length - 1];
  const oldCount = PAPERS.reduce((a, p) => a + p.items.length, 0);
  const rows = GROUPS.map(g => {
    const ts = TOPICS.filter(t => t.g === g.id);
    return `<tr class="grp"><td colspan="5">${esc(g.name)} <span class="muted small">· ${esc(g.th)}</span></td></tr>`
      + ts.map(t => {
        const e = (t.exam || []).join(' ');
        return `<tr><td><a class="tlink" href="#atlas" data-go="atlas" data-topic="${t.id}">${esc(t.en)}</a></td>`
          + `<td class="c">${/2563/.test(e) ? '<span class="mark-old" title="ออกสอบปี 2563"></span>' : ''}</td>`
          + `<td class="c">${/NU23/.test(e) ? '<span class="mark-old" title="ออกสอบ MED NU23"></span>' : ''}</td>`
          + `<td class="c">${t.vs ? '<span class="mark-vs" title="อยู่ในรายการ virtual slide"></span>' : ''}</td>`
          + `<td>${stars(t.star)}</td></tr>`;
      }).join('');
  }).join('');
  const hist = S.exams.slice(-5).reverse().map(x => `<div class="hist-row"><span>${new Date(x.t).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })} · ${x.n} สถานี · ${esc(x.label || '')}</span><span class="mono"><b>${x.pct}%</b></span></div>`).join('');

  $('#v-home').innerHTML = `
  <section class="hero">
    <div>
      <div class="eyebrow">Block KUB II · Lab urinary system · Pathology</div>
      <h1>Patho <span>OSPE</span> สถานีละ 60 วินาที</h1>
      <p class="lead">ฝึกดู gross, virtual slide, immunofluorescence และตะกอนปัสสาวะ ${STATIONS.length} สถานี ครบทุกภาพใน Lecture LAB พร้อมข้อสอบเก่าปี 2563 และ MED NU23/NT15 ตรวจคำตอบอัตโนมัติ</p>
      <div class="row">
        <a class="btn primary" href="#exam" data-go="exam">เริ่ม Exam จับเวลา</a>
        <a class="btn" href="#practice" data-go="practice">โหมดทบทวน</a>
        <a class="btn ghost" href="#atlas" data-go="atlas">เปิด Atlas</a>
      </div>
    </div>
    <div class="bottle">
      <div class="bottle-h"><b>แถบตรวจความพร้อม</b><span class="muted small mono">${seen}/${STATIONS.length} สถานี</span></div>
      ${strip_(GROUPS.length, pads, { big: true, label: 'ความแม่นยำแยกตามหมวด' })}
      <div class="strip-labels">${GROUPS.map(g => `<span title="${esc(g.name)}">${esc(g.name.split(' ')[0])}</span>`).join('')}</div>
      <div class="legend"><span><i style="background:var(--good)"></i>≥ 80%</span><span><i style="background:var(--warn)"></i>50–79%</span><span><i style="background:var(--bad)"></i>&lt; 50%</span><span><i style="background:var(--pad-empty)"></i>ยังไม่ได้ทำ</span></div>
      <p class="small muted">แต่ละช่องคือหนึ่งหมวด สีเปลี่ยนตามคำตอบล่าสุดของสถานีในหมวดนั้นจากโหมดทบทวนและ Exam</p>
    </div>
  </section>

  <section class="kpis">
    <div class="kpi"><div class="n">${STATIONS.length}</div><div class="l">สถานีทั้งหมด</div></div>
    <div class="kpi"><div class="n">${oldCount}</div><div class="l">ข้อจากข้อสอบเก่า 2 ชุด</div></div>
    <div class="kpi"><div class="n">${TOPICS.length}</div><div class="l">หัวข้อใน Atlas</div></div>
    <div class="kpi"><div class="n">${last ? last.pct + '%' : '–'}</div><div class="l">${last ? 'Exam ล่าสุด' : 'ยังไม่เคยสอบ'}</div></div>
  </section>

  <section class="stack">
    <div class="sec-h"><h2>อ่านแนวข้อสอบเก่า</h2><span class="muted small">สรุปจากข้อสอบ LAB ปี 2563 และ MED NU23/NT15</span></div>
    <div class="insights">
      <div class="insight"><h3>รูปแบบสถานี</h3><ul>
        <li>ปี 2563 = pathology 10 + urine analysis 5 รวม 15 สถานี</li>
        <li>ทุกสถานีถาม 2 ข้อย่อย: <b>บรรยายพยาธิสภาพ + วินิจฉัย</b> หรือ <b>วินิจฉัย + สาเหตุ/risk/complication</b></li>
        <li>Histology ใช้ภาพหน้าจอ virtual slide</li></ul></div>
      <div class="insight"><h3>ออกซ้ำทั้งสองปี</h3><ul>
        <li>ADPKD + โรคนอกไต 2 อย่าง</li><li>Hydronephrosis (บรรยาย + diag)</li>
        <li>Angiomyolipoma และ chronic pyelonephritis (virtual slide)</li>
        <li>IF linear → Goodpasture</li><li>Centrifuge 5 นาที · ตะกอน 0.5–1 mL</li></ul></div>
      <div class="insight"><h3>ปีนี้ต้องระวัง</h3><ul>
        <li>Virtual slide ใหม่ใน Lecture: ARPKD, ATN, diabetic nephropathy, von Brunn nest/cystitis cystica, Wilms, clear cell RCC, urothelial carcinoma</li>
        <li>หัวข้อใหม่: malakoplakia, XGP, membranous, crescentic GN, renal infarction, horseshoe kidney</li></ul></div>
    </div>
  </section>

  <section class="stack">
    <div class="sec-h"><h2>Blueprint รายหัวข้อ</h2><span class="legend"><span><span class="mark-old"></span> เคยออกสอบ</span><span><span class="mark-vs"></span> virtual slide ใน Lecture</span><span>${stars(3)} โอกาสออกปีนี้</span></span></div>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>หัวข้อ</th><th>2563</th><th>NU23</th><th>Virtual slide</th><th>โอกาสออก</th></tr></thead><tbody>${rows}</tbody></table></div>
  </section>

  ${hist ? `<section class="panel stack"><div class="sec-h"><h2>ประวัติ Exam</h2><span class="muted small">5 ครั้งล่าสุด</span></div><div class="hist">${hist}</div></section>` : ''}
  `;
}

/* ======================================================================
 * ATLAS
 * ==================================================================== */
const UA_HTML = {
  proc: `
  <div class="cols2">
    <div class="panel stack"><h3>เตรียม urine sediment</h3>
      <ol class="ua-steps">
        <li>ใช้ปัสสาวะสด (ตรวจภายใน 1–2 ชม.) ผสมให้เข้ากัน เทใส่หลอดปั่นก้นแหลม ~10–12 mL</li>
        <li>Centrifuge 1,500–2,000 rpm (~400–450 g) นาน <span class="hl">5 นาที</span></li>
        <li>เทส่วนใส (supernatant) ทิ้ง เหลือตะกอน <span class="hl">0.5–1 mL</span></li>
        <li>เคาะผสม resuspend หยดบนสไลด์ (~20 µL) ปิด coverslip</li>
        <li>Low power (10×, LPF) หา cast และ crystal โดยลดแสง; high power (40×, HPF) ระบุและนับเซลล์</li>
        <li>รายงาน cast เป็น /LPF; RBC, WBC, epithelial เป็น /HPF; crystal เป็น few/moderate/many</li>
      </ol>
      <p class="small muted">ค่าปกติโดยประมาณ: RBC 0–2/HPF, WBC 0–5/HPF, hyaline cast 0–2/LPF · ตัวเลขขั้นตอนเป็นวิธีมาตรฐานทั่วไป ข้อสอบเก่าถามเวลาปั่นและปริมาตรตะกอน</p>
    </div>
    <div class="panel stack"><h3>Jaundice กับ dipstick</h3>
      <div class="tbl-wrap"><table class="tbl"><thead><tr><th>ภาวะ</th><th>Bilirubin</th><th>Urobilinogen</th></tr></thead><tbody>
        <tr><td>Hemolysis (pre-hepatic)</td><td>ลบ</td><td><b>สูง</b></td></tr>
        <tr><td>Hepatocellular damage</td><td>บวก</td><td><b>สูง</b>/ปกติ</td></tr>
        <tr><td>Obstructive (post-hepatic)</td><td><b>บวก</b></td><td>ต่ำ/ไม่พบ</td></tr>
      </tbody></table></div>
      <p class="small muted">ข้อสอบ NU23: urobilinogen สูง → hemolysis (และ hepatocellular damage)</p>
    </div>
  </div>
  <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Dipstick</th><th>หลักการ / ค่าปกติ</th><th>ผลผิดปกติพบใน</th></tr></thead><tbody>
    <tr><td>Specific gravity</td><td>1.003–1.030</td><td>สูง: dehydration, glucosuria, contrast · คงที่ 1.010 = isosthenuria (CKD)</td></tr>
    <tr><td>pH</td><td>4.5–8.0 (เฉลี่ย ~6)</td><td>ด่าง: UTI จากเชื้อสร้าง urease, ตั้งทิ้งไว้นาน, มังสวิรัติ · กรด: acidosis, high-protein diet</td></tr>
    <tr><td>Protein</td><td>Protein error of indicator (ไวต่อ albumin)</td><td>Glomerular disease, nephrotic syndrome · ผลบวกลวงในปัสสาวะด่างมาก</td></tr>
    <tr><td>Glucose</td><td>Glucose oxidase–peroxidase</td><td>DM, renal glycosuria (เกิน renal threshold ~180 mg/dL)</td></tr>
    <tr><td>Ketone</td><td>Nitroprusside (acetoacetate, acetone; ไม่ตรวจ β-hydroxybutyrate)</td><td>DKA, starvation, อาเจียนมาก</td></tr>
    <tr><td>Blood</td><td>Pseudoperoxidase ของ heme</td><td>Hematuria, hemoglobinuria (hemolysis), myoglobinuria (rhabdomyolysis)</td></tr>
    <tr><td>Bilirubin</td><td>เฉพาะ conjugated bilirubin</td><td>Obstructive jaundice, hepatocellular disease</td></tr>
    <tr><td>Urobilinogen</td><td>ปกติ 0.2–1 mg/dL</td><td>สูง: hemolysis, hepatocellular damage · ไม่พบ: complete biliary obstruction</td></tr>
    <tr><td>Nitrite</td><td>Griess: แบคทีเรีย reduce nitrate → nitrite (ต้องค้างในกระเพาะ ≥ 4 ชม.)</td><td>UTI จาก gram-negative bacteria (E. coli)</td></tr>
    <tr><td>Leukocyte esterase</td><td>Esterase จาก neutrophil</td><td>Pyuria — UTI, sterile pyuria (เช่น TB)</td></tr>
  </tbody></table></div>`,
  crystal: `
  <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Crystal</th><th>pH</th><th>รูปร่างที่ใช้จำ</th><th>ความสำคัญ</th></tr></thead><tbody>
    <tr class="grp"><td colspan="4">Normal — acid urine</td></tr>
    <tr><td>Uric acid</td><td>กรด</td><td>แผ่น rhomboid/whetstone/rosette สีเหลือง–น้ำตาล หลายรูปแบบ</td><td>Gout, cell turnover สูง (leukemia, tumor lysis)</td></tr>
    <tr><td>Amorphous urates</td><td>กรด</td><td>เม็ดละเอียดสีเหลืองน้ำตาล ตะกอนสีชมพู "brick dust"</td><td>ปกติ, เก็บในตู้เย็น</td></tr>
    <tr><td>Calcium oxalate</td><td>กรด/กลาง</td><td>Dihydrate: สี่เหลี่ยมมีกากบาท <b>"envelope"</b> · Monohydrate: รูปไข่/ดัมเบล</td><td>ปกติ (อาหาร oxalate, vit C), hypercalciuria, <b>ethylene glycol</b></td></tr>
    <tr class="grp"><td colspan="4">Normal — alkaline urine</td></tr>
    <tr><td>Triple phosphate (struvite)</td><td>ด่าง</td><td>Prism ใสปลายเฉียง <b>"coffin lid"</b>; รูปขนนกเมื่อกำลังละลาย</td><td>UTI จากเชื้อสร้าง urease (Proteus) → staghorn stone</td></tr>
    <tr><td>Amorphous phosphate</td><td>ด่าง</td><td>เม็ดใสละเอียด ตะกอนสีขาว</td><td>ปกติ</td></tr>
    <tr><td>Calcium carbonate</td><td>ด่าง</td><td>ทรงกลม/ดัมเบลเล็ก ๆ</td><td>ปกติ</td></tr>
    <tr><td>Ammonium biurate</td><td>ด่าง</td><td>ทรงกลมสีน้ำตาลเหลืองมีหนาม <b>"thorny apple"</b></td><td>ตัวอย่างตั้งทิ้งไว้นาน (old specimen)</td></tr>
    <tr class="grp"><td colspan="4">Abnormal</td></tr>
    <tr><td>Cystine</td><td>กรด</td><td>แผ่น<b>หกเหลี่ยม</b>ใส ซ้อนกันได้</td><td>Cystinuria → นิ่ว</td></tr>
    <tr><td>Cholesterol</td><td>กรด</td><td>แผ่นสี่เหลี่ยมใสบาง มี<b>รอยบากที่มุม</b> ซ้อนเป็นขั้นบันได</td><td>Nephrotic syndrome</td></tr>
    <tr><td>Tyrosine</td><td>กรด</td><td>เข็มเล็กละเอียดเป็นมัด สีเหลือง</td><td>โรคตับรุนแรง, tyrosinemia</td></tr>
    <tr><td>Leucine</td><td>กรด</td><td>ทรงกลมสีเหลืองน้ำตาล วงซ้อน + ลายรัศมี</td><td>โรคตับรุนแรง</td></tr>
    <tr><td>Bilirubin</td><td>กรด</td><td>เข็ม/เม็ดสีเหลือง</td><td>โรคตับ</td></tr>
    <tr><td>Sulfonamide และยาอื่น</td><td>กรด</td><td>มัดเข็ม รูปพัด</td><td>ได้ยาร่วมกับ dehydration</td></tr>
  </tbody></table></div>`,
  cast: `
  <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Cast</th><th>ลักษณะ</th><th>บ่งชี้</th></tr></thead><tbody>
    <tr><td>Hyaline</td><td>ใสจาง มีแต่ Tamm-Horsfall protein ต้องลดแสง</td><td>คนปกติ 0–2/LPF, ออกกำลังกาย, dehydration, ไข้, diuretics</td></tr>
    <tr><td>RBC cast</td><td>อัดแน่นด้วย RBC สีส้มแดง</td><td><b>Glomerulonephritis</b> (nephritic)</td></tr>
    <tr><td>WBC cast</td><td>มี neutrophils nucleus เป็น lobe</td><td><b>Pyelonephritis</b>, acute interstitial nephritis</td></tr>
    <tr><td>Renal tubular epithelial cast</td><td>มี RTE cells nucleus กลม</td><td>ATN, toxin, viral, rejection</td></tr>
    <tr><td>Granular (fine/coarse)</td><td>เม็ดจากเซลล์สลาย/โปรตีน · แบบ muddy brown</td><td><b>ATN</b>; จำนวนน้อยหลังออกกำลังกาย</td></tr>
    <tr><td>Waxy</td><td>หนา สะท้อนแสง ขอบคม มีรอยแตก/บาก ปลายทู่</td><td><b>Advanced CKD</b>, urine stasis</td></tr>
    <tr><td>Fatty</td><td>มีหยดไขมันสะท้อนแสง (Maltese cross ใต้ polarizer)</td><td><b>Nephrotic syndrome</b></td></tr>
    <tr><td>Broad</td><td>กว้างมาก เกิดใน tubule/collecting duct ที่ขยาย</td><td>ESRD ("renal failure cast")</td></tr>
  </tbody></table></div>`,
  cell: `
  <div class="tbl-wrap"><table class="tbl"><thead><tr><th>เซลล์/เชื้อ</th><th>ลักษณะ</th><th>ความสำคัญ</th></tr></thead><tbody>
    <tr><td>RBC</td><td>แผ่นกลมใส ~7 µm ไม่มี nucleus · crenated ในปัสสาวะเข้มข้น · ghost cell ในปัสสาวะเจือจาง</td><td>&gt; 2/HPF = hematuria · <b>dysmorphic RBC/acanthocyte</b> = glomerular</td></tr>
    <tr><td>WBC</td><td>~10–12 µm cytoplasm เป็นเม็ด nucleus แบ่ง lobe · glitter cell ในปัสสาวะเจือจาง</td><td>&gt; 5/HPF = pyuria → <b>UTI</b></td></tr>
    <tr><td>Squamous epithelial</td><td>ใหญ่สุด แบน เหลี่ยม nucleus เล็กตรงกลาง</td><td>ปนเปื้อนจาก vagina/distal urethra · clue cell (Gardnerella)</td></tr>
    <tr><td>Transitional (urothelial)</td><td>กลม/รูปลูกแพร์มีหาง (caudate) nucleus กลางเซลล์ อาจมี 2 nuclei</td><td>ปกติพบน้อย · หลังใส่สายสวน · จำนวนมาก/atypia → malignancy</td></tr>
    <tr><td>Renal tubular epithelial</td><td>ใหญ่กว่า WBC เล็กน้อย เหลี่ยม nucleus กลมค่อนไปข้างหนึ่ง</td><td><b>สำคัญที่สุด</b>: tubular injury (ATN, pyelonephritis, rejection)</td></tr>
    <tr><td>Oval fat body</td><td>RTE cell/macrophage อมหยดไขมัน · Maltese cross ใต้ polarized light · Sudan III/Oil red O +</td><td><b>Nephrotic syndrome</b></td></tr>
    <tr><td>Yeast</td><td>รูปไข่แตกหน่อ ± pseudohyphae</td><td>DM, ภูมิคุ้มกันต่ำ, ปนเปื้อนจากช่องคลอด</td></tr>
    <tr><td>Trichomonas vaginalis</td><td>รูปลูกแพร์ flagella 4 เส้นด้านหน้า undulating membrane เคลื่อนที่กระตุก</td><td>Trichomoniasis (ต้องดูในปัสสาวะสด)</td></tr>
    <tr><td>Bacteria</td><td>แท่ง/กลมเล็กมาก</td><td>UTI เมื่อพบมากร่วมกับ WBC ในตัวอย่างสด</td></tr>
  </tbody></table></div>`,
};

function renderAtlas() {
  if (!TOP[S.atlas]) S.atlas = TOPICS[0].id;
  const t = TOP[S.atlas];
  const idx = TOPICS.indexOf(t);
  const prev = TOPICS[idx - 1], next = TOPICS[idx + 1];
  const nav = GROUPS.map(g => `<div><h4>${esc(g.name)}</h4>` + TOPICS.filter(x => x.g === g.id).map(x =>
    `<button type="button" data-atlas="${x.id}" class="${x.id === t.id ? 'on' : ''}"><span>${esc(x.en)}</span><span class="dots">${x.exam ? '<span class="mark-old"></span>' : ''}${x.vs ? '<span class="mark-vs"></span>' : ''}</span></button>`).join('') + `</div>`).join('');
  const opts = GROUPS.map(g => `<optgroup label="${esc(g.name)}">` + TOPICS.filter(x => x.g === g.id).map(x => `<option value="${x.id}"${x.id === t.id ? ' selected' : ''}>${esc(x.en)}</option>`).join('') + `</optgroup>`).join('');
  const nSt = STATIONS.filter(s => s.t === t.id).length;
  const badges = [
    `<span class="chip">${esc(GRP[t.g].name)}</span>`,
    `<span class="chip">Lecture หน้า ${esc(t.pages)}</span>`,
    ...(t.exam || []).map(e => `<span class="chip old">ข้อสอบ ${esc(e)}</span>`),
    t.vs ? `<span class="chip vs">Virtual slide</span>` : '',
    stars(t.star),
  ].join(' ');

  $('#v-atlas').innerHTML = `
  <div class="atlas">
    <nav class="atlas-nav" aria-label="หัวข้อ">${nav}</nav>
    <div class="topic">
      <div class="atlas-mobile field"><label for="atlasSel">หัวข้อ</label><select id="atlasSel">${opts}</select></div>
      <div class="topic-h">
        <div class="eyebrow">Atlas · ${idx + 1}/${TOPICS.length}</div>
        <h2>${esc(t.en)}</h2>
        <div class="th">${esc(t.th)}</div>
        <div class="row">${badges}</div>
      </div>
      ${t.imgs.length ? `<div class="gallery">${t.imgs.map(([ref, cap]) => fig(ref, '', cap)).join('')}</div>` : ''}
      <div class="cols2">
        <div class="panel stack"><div class="eyebrow">จากสไลด์ Lecture</div><ul class="list">${t.lec.map(x => `<li>${x}</li>`).join('')}</ul></div>
        <div class="panel stack"><div class="eyebrow" style="color:var(--eosin)">อาจารย์เสริม — ต้องรู้เพิ่ม</div><ul class="list add">${t.add.map(x => `<li>${x}</li>`).join('')}</ul></div>
      </div>
      ${t.html ? UA_HTML[t.html] : ''}
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
  $('#atlasSel').addEventListener('change', e => { S.atlas = e.target.value; save(); renderAtlas(); window.scrollTo(0, 0); });
}
document.addEventListener('click', e => {
  const a = e.target.closest('[data-atlas]');
  if (a) { S.atlas = a.dataset.atlas; save(); renderAtlas(); window.scrollTo(0, 0); return; }
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
    ${r.empty ? `<div class="small muted">ไม่ได้ตอบ</div>` : `<div class="row between"><span class="lbl">ตรวจอัตโนมัติ ${r.hits.length >= r.need ? r.need : r.hits.length}/${r.need} จุด</span><span class="mono small"><b>${pct(r.score)}%</b></span></div><div class="chips">${chips}</div>`}
  </div>`;
}
function explainHTML(s) {
  const t = TOP[s.t];
  return `<div class="explain">
    <div class="eyebrow">อาจารย์อธิบาย</div>
    <p>${s.x || ''}</p>
    ${s.am ? `<div class="ans-figs">${s.am.map(r => fig(r, '', 'ภาพเฉลย (มี label)')).join('')}</div>` : ''}
    <div class="row small muted"><span>${esc(s.ref)}</span>·<a href="#atlas" data-go="atlas" data-topic="${t.id}">Atlas: ${esc(t.en)}</a></div>
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
  const pool = practicePool().map(s => s.id);
  P.queue = P.f.order === 'shuffle' ? shuffle(pool) : pool;
  P.i = 0; P.revealed = false;
}
function renderPractice() {
  if (!P.queue) buildQueue();
  const f = P.f;
  const segBtns = (name, items, cur) => items.map(([v, l]) => `<button type="button" data-pf="${name}" data-v="${v}" class="${cur === v ? 'on' : ''}">${l}</button>`).join('');
  const wrongN = STATIONS.filter(s => S.marks[s.id] && S.marks[s.id].last === 'w').length;
  const bar = `
  <div class="panel stack">
    <div class="sec-h"><h2>โหมดทบทวน</h2><span class="muted small">พิมพ์คำตอบ → ดูเฉลย → ให้คะแนนตัวเอง<span class="kbd"> · <span class="mono">Enter</span> ไปข้อย่อยถัดไป</span></span></div>
    ${f.topic ? `<div class="row"><span class="chip vs">เฉพาะหัวข้อ: ${esc(TOP[f.topic].en)}</span><button class="btn ghost" type="button" id="clearTopic">ดูทุกหัวข้อ</button></div>` : ''}
    <details class="pf" id="pf"${P.fOpen ? ' open' : ''}>
      <summary>ตัวกรอง · <span class="muted">${esc(f.topic ? TOP[f.topic].en : f.g === 'all' ? 'ทุกหมวด' : GRP[f.g].name)} · ${{ all: 'ทุกแหล่ง', old: 'ข้อสอบเก่า', lec: 'Lecture + คาดการณ์', new: 'ยังไม่เคยทำ', wrong: 'ยังไม่แม่น' }[f.src]} · ${f.order === 'shuffle' ? 'สุ่มลำดับ' : 'เรียงตามเนื้อหา'} · ${P.queue.length} สถานี</span></summary>
      <div class="stack" style="margin-top:10px">
      ${f.topic ? '' : `<div class="seg" aria-label="หมวด">${segBtns('g', [['all', 'ทุกหมวด'], ...GROUPS.map(g => [g.id, g.name])], f.g)}</div>
      <div class="seg" aria-label="แหล่งข้อสอบ">${segBtns('src', [['all', 'ทุกแหล่ง'], ['old', 'ข้อสอบเก่า'], ['lec', 'Lecture + คาดการณ์'], ['new', 'ยังไม่เคยทำ'], ['wrong', `ยังไม่แม่น (${wrongN})`]], f.src)}</div>`}
      <div class="seg" aria-label="ลำดับ">${segBtns('order', [['shuffle', 'สุ่มลำดับ'], ['seq', 'เรียงตามเนื้อหา']], f.order)}</div>
      </div>
    </details>
  </div>`;
  const q = P.queue;
  if (!q.length) {
    $('#v-practice').innerHTML = bar + `<div class="panel"><p>ไม่มีสถานีที่ตรงกับตัวกรองนี้${f.src === 'wrong' ? ' — ยังไม่มีข้อที่ตอบผิด' : ''}</p></div>`;
    wirePracticeBar(); return;
  }
  if (P.i >= q.length) {
    $('#v-practice').innerHTML = bar + `<div class="panel stack"><h2>ครบ ${q.length} สถานีแล้ว</h2><p class="muted">ลองโหมด Exam จับเวลา หรือเลือก "ยังไม่แม่น" เพื่อทวนเฉพาะข้อที่พลาด</p><div class="row"><button class="btn primary" type="button" id="pAgain">เริ่มรอบใหม่</button><a class="btn" href="#exam" data-go="exam">ไป Exam</a></div></div>`;
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
  const ins = wireInputs(() => { P.revealed ? practiceNext() : practiceReveal(); });
  $('#pReveal').addEventListener('click', practiceReveal);
  $('#pSkip').addEventListener('click', practiceNext);
  P.revealed = false;
  if (window.matchMedia && matchMedia('(pointer: fine)').matches) ins[0] && ins[0].focus({ preventScroll: true });
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
    const v = $('#ans-' + i).value;
    const r = grade(p, v); tot += r.score; any = any || !r.empty;
    $('#res-' + i).innerHTML = resHTML(p, r, true);
  });
  const avg = tot / s.p.length;
  $('#stActions').innerHTML = `<span class="small muted">${any ? `ตรวจอัตโนมัติได้ <b class="mono">${pct(avg)}%</b> · ` : ''}ให้คะแนนตัวเอง:</span>
    <button class="btn good" type="button" id="pRight">✓ ตอบได้</button>
    <button class="btn bad" type="button" id="pWrong">✗ ยังไม่แม่น</button>
    <span class="spacer"></span><span class="small muted mono kbd">Ctrl+Enter = ${any && avg >= .8 ? 'ตอบได้' : 'ยังไม่แม่น'} แล้วไปต่อ</span>`;
  $('#stExplain').innerHTML = explainHTML(s);
  P.auto = any && avg >= .8;
  $('#pRight').addEventListener('click', () => { mark(s.id, true); practiceNext(); });
  $('#pWrong').addEventListener('click', () => { mark(s.id, false); practiceNext(); });
}
function practiceNext() {
  if (P.revealed && document.activeElement && document.activeElement.tagName === 'INPUT') {
    const s = STA[P.queue[P.i]]; mark(s.id, !!P.auto);
  }
  P.i++; P.revealed = false; renderPractice();
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
const EX = { running: false, ids: [], i: 0, ans: [], secs: 60, end: 0, raf: 0, label: '', report: null, ctx: null };

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
  let pool = STATIONS.slice();
  if (src === 'old') pool = pool.filter(s => OLD_IDS.has(s.id));
  if (src === 'lec') pool = pool.filter(s => !OLD_IDS.has(s.id) && s.g !== 'ua');
  if (src === 'ua') pool = pool.filter(s => s.g === 'ua');
  if (src === 'wrong') pool = pool.filter(s => S.marks[s.id] && S.marks[s.id].last === 'w');
  if (count === 'all') return shuffle(pool).map(s => s.id);
  count = +count;
  if (src === 'mix') {
    const nu = Math.round(count / 3);
    const ua = pickBalanced(pool.filter(s => s.g === 'ua'), nu);
    const pa = pickBalanced(pool.filter(s => s.g !== 'ua'), count - ua.length);
    return pa.concat(ua).map(s => s.id);
  }
  return pickBalanced(pool, count).map(s => s.id);
}
function renderExam() {
  if (EX.running) { renderExamStation(); return; }
  if (EX.report) { renderReport(); return; }
  const wrongN = STATIONS.filter(s => S.marks[s.id] && S.marks[s.id].last === 'w').length;
  $('#v-exam').innerHTML = `
  <div class="ex-setup">
    <div class="panel stack">
      <div class="eyebrow">Exam simulation</div>
      <h2 style="font-size:1.5rem">จับเวลาสถานีละ ${S.secs} วินาที</h2>
      <p class="muted">เหมือนห้องสอบจริง: ย้อนกลับไม่ได้ หมดเวลาแล้วเลื่อนสถานีเองพร้อมเสียงสัญญาณ ตรวจคะแนนตอนจบ และแก้คะแนนเองได้ถ้าระบบตรวจพลาด</p>
      <form class="ex-form" id="exForm">
        <div class="field"><label for="exSrc">ชุดข้อสอบ</label>
          <select id="exSrc">
            <option value="mix">ผสมแบบสอบจริง (pathology 2 : urinalysis 1)</option>
            <option value="old">ข้อสอบเก่าเท่านั้น</option>
            <option value="lec">Lecture + คาดการณ์ (pathology)</option>
            <option value="ua">Urinalysis เท่านั้น</option>
            <option value="wrong">ข้อที่ยังไม่แม่น (${wrongN})</option>
          </select></div>
        <div class="field"><label for="exCount">จำนวนสถานี</label>
          <select id="exCount"><option value="15">15 สถานี (เท่าปี 2563)</option><option value="10">10 สถานี</option><option value="20">20 สถานี</option><option value="30">30 สถานี</option><option value="all">ทั้งหมดในชุด</option></select></div>
        <div class="field"><label for="exSecs">เวลาต่อสถานี</label>
          <select id="exSecs">${[45, 60, 90, 120].map(v => `<option value="${v}"${v === S.secs ? ' selected' : ''}>${v} วินาที${v === 60 ? ' (มาตรฐาน)' : ''}</option>`).join('')}</select></div>
        <div class="row"><button class="btn primary" type="submit">เริ่มสอบ</button><span class="small muted">เปิดเสียงเพื่อได้ยินสัญญาณเปลี่ยนสถานี</span></div>
      </form>
    </div>
    <div class="panel stack">
      <h3>ข้อสอบเก่าแบบเต็มชุด</h3>
      ${PAPERS.map(p => `<div class="stack" style="gap:6px"><b>${esc(p.title)}</b><span class="small muted">${esc(p.summary)} · ${p.items.length} ข้อ</span><div><button class="btn" type="button" data-paper-exam="${p.id}">สอบชุดนี้</button></div></div>`).join('<hr style="border:0;border-top:1px solid var(--line);margin:4px 0">')}
      <p class="small muted">ตรวจคำตอบจากคำสำคัญ (keyword) ยอมรับคำพ้องและสะกดผิดเล็กน้อย เขียนเป็นภาษาอังกฤษจะตรวจได้แม่นที่สุด</p>
    </div>
  </div>`;
  $('#exForm').addEventListener('submit', e => {
    e.preventDefault();
    S.secs = +$('#exSecs').value; save();
    const src = $('#exSrc').value;
    const ids = buildExam($('#exCount').value, src);
    if (!ids.length) { toast('ชุดนี้ยังไม่มีสถานี'); return; }
    startExam(ids, $('#exSrc').selectedOptions[0].textContent.replace(/\s*\(.*\)$/, ''));
  });
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-paper-exam]');
  if (!b) return;
  const p = PAPERS.find(x => x.id === b.dataset.paperExam);
  const ids = p.items.map(i => i.st).filter((v, i, a) => a.indexOf(v) === i);
  EX.report = null;
  if (view !== 'exam') { location.hash = 'exam'; }
  startExam(ids, p.by);
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
function startExam(ids, label) {
  try { EX.ctx = EX.ctx || new (window.AudioContext || window.webkitAudioContext)(); EX.ctx.resume && EX.ctx.resume(); } catch (e) { EX.ctx = null; }
  Object.assign(EX, { running: true, ids, i: 0, ans: ids.map(id => STA[id].p.map(() => '')), secs: S.secs, label, report: null });
  $('#tabs').hidden = true; $('#examLive').hidden = false;
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
    chips: kindChip(s),
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
function finishExam() {
  EX.running = false;
  $('#tabs').hidden = false; $('#examLive').hidden = true;
  const items = EX.ids.map((id, k) => {
    const s = STA[id];
    const parts = s.p.map((p, i) => { const r = grade(p, EX.ans[k][i]); return { r, ov: null }; });
    return { id, parts };
  });
  const rec = { t: Date.now(), n: items.length, label: EX.label, pct: 0 };
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
  const list = R.items.map((it, k) => {
    const s = STA[it.id], sc = stationScore(it), t = TOP[s.t];
    const thumbRef = (s.im || [])[0];
    const thumb = !thumbRef ? `<span class="tx">TEXT</span>` : thumbRef.startsWith('svg:') ? URINE.draw(thumbRef.slice(4)) : `<img src="img/${thumbRef}.jpg" alt="" loading="lazy">`;
    const parts = s.p.map((p, i) => {
      const pt = it.parts[i];
      const v = partScore(pt);
      return `<div class="rep-part">
        <div class="part-q"><span class="pn">${i + 1}.</span>${esc(p.q)}</div>
        <div class="yours"><span class="lbl">คุณตอบ</span>${pt.r.empty ? '<span class="muted">— ไม่ได้ตอบ —</span>' : esc(EX_ANS(k, i))}</div>
        ${resHTML(p, pt.r, true)}
        <div class="ovr"><span class="small muted">ให้คะแนนเอง:</span>${[[1, 'เต็ม'], [.5, 'ครึ่ง'], [0, 'ศูนย์']].map(([val, l]) => `<button type="button" data-ovr="${k}:${i}:${val}" class="${pt.ov === val ? 'on' : ''}">${l}</button>`).join('')}${pt.ov != null ? `<button type="button" data-ovr="${k}:${i}:auto">ใช้คะแนนระบบ</button>` : ''}<span class="mono small" style="margin-left:auto">${pct(v)}%</span></div>
      </div>`;
    }).join('');
    return `<details class="rep-item"${sc < .6 ? ' open' : ''}>
      <summary><span class="rep-thumb">${thumb}</span><span><b>${k + 1}. ${esc(t.en)}</b><br><span class="small muted">${esc(s.kind)} · ${esc(s.ref)}</span></span><span class="rep-score ${band(sc)}">${pct(sc)}%</span></summary>
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
    <div class="row"><button class="btn primary" type="button" id="exAgain">สอบใหม่</button><a class="btn" href="#practice" data-go="practice" id="exPractice">ทวนข้อที่ยังไม่แม่น</a></div>
    <p class="small muted">ระบบตรวจจากคำสำคัญ ถ้าคำตอบถูกแต่ใช้คำต่างไป ให้กด "เต็ม" หรือ "ครึ่ง" เพื่อแก้คะแนน — คะแนนรวมและประวัติจะอัปเดตทันที</p>
  </div>
  <div class="stack">${list}</div>`;
  $('#exAgain').addEventListener('click', () => { EX.report = null; renderExam(); window.scrollTo(0, 0); });
  $('#exPractice').addEventListener('click', () => { P.f = { g: 'all', src: 'wrong', topic: '', order: 'shuffle' }; P.queue = null; });
}
function EX_ANS(k, i) { return EX.ans[k][i]; }
document.addEventListener('click', e => {
  const b = e.target.closest('[data-ovr]');
  if (!b || !EX.report) return;
  const [k, i, v] = b.dataset.ovr.split(':');
  const it = EX.report.items[+k];
  it.parts[+i].ov = v === 'auto' ? null : +v;
  const s = STA[it.id], m = S.marks[s.id];
  if (m) { m.last = stationScore(it) >= .6 ? 'r' : 'w'; }
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
  EX.running = false; EX.report = null;
  $('#tabs').hidden = false; $('#examLive').hidden = true;
  $('#examQuit').textContent = 'ออกจากการสอบ';
  toast('ยกเลิกการสอบแล้ว ไม่บันทึกคะแนน');
  renderExam();
});

/* ======================================================================
 * PAPERS
 * ==================================================================== */
function renderPapers() {
  $('#v-papers').innerHTML = `
  <div class="panel stack">
    <div class="sec-h"><h2>ข้อสอบเก่า</h2><span class="muted small">ภาพที่มี label ถูกบังคำตอบไว้ เปิดเฉลยจะเห็นภาพต้นฉบับ</span></div>
    <div class="row"><button class="btn" type="button" id="openAll">เปิดเฉลยทั้งหมด</button><button class="btn ghost" type="button" id="closeAll">ซ่อนเฉลยทั้งหมด</button></div>
  </div>
  ${PAPERS.map(p => `
  <section class="paper">
    <div class="paper-h">
      <div class="stack" style="gap:4px"><div class="eyebrow">${esc(p.by)}</div><h2>${esc(p.title)}</h2><span class="small muted">${esc(p.summary)}</span></div>
      <button class="btn primary" type="button" data-paper-exam="${p.id}">สอบชุดนี้ · ${S.secs} วินาที/ข้อ</button>
    </div>
    ${p.items.map(it => {
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
  </section>`).join('')}`;
  $('#openAll').addEventListener('click', () => $$('#v-papers details.ans').forEach(d => { d.open = true; }));
  $('#closeAll').addEventListener('click', () => $$('#v-papers details.ans').forEach(d => { d.open = false; }));
}

const RENDER = { home: renderHome, atlas: renderAtlas, practice: renderPractice, exam: renderExam, papers: renderPapers };
route();

/* expose the checker for quick console tests */
window.KUB_CHECK = { norm, grade, hasKey };
})();
