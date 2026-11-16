/* ------------------------------------------------------------------
 * urine.js — ภาพวาดจำลองตะกอนปัสสาวะ (microscope field) แบบ SVG
 *
 *   URINE.draw(kind) -> SVG string
 *
 * ใช้แทนภาพถ่ายที่ไม่มีในเอกสาร (เช่น triple phosphate, cystine, casts)
 * รูปทรงวาดตามลักษณะในตำรา urinalysis: เน้นรูปร่างที่ใช้แยกชนิด
 * สุ่มตำแหน่งด้วย seed คงที่ต่อชนิด จึงได้ภาพเดิมทุกครั้ง
 * ------------------------------------------------------------------ */
(function () {
'use strict';

let uid = 0;
const C = 200;          // center
const R = 196;          // field radius

function rng(seedStr) {
  let h = 1779033703 ^ seedStr.length;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = h >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const f = n => Math.round(n * 10) / 10;
const rr = (r, a, b) => a + (b - a) * r();

function scatter(r, n, gap, maxR) {
  const pts = [];
  maxR = maxR || 160;
  let tries = 0;
  while (pts.length < n && tries < 3000) {
    tries++;
    const ang = r() * Math.PI * 2, d = Math.sqrt(r()) * maxR;
    const p = { x: C + Math.cos(ang) * d, y: C + Math.sin(ang) * d };
    if (pts.every(q => (q.x - p.x) ** 2 + (q.y - p.y) ** 2 > gap * gap)) pts.push(p);
  }
  return pts;
}
const g = (x, y, rot, s, inner) => `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)}) scale(${f(s * 100) / 100})">${inner}</g>`;

/* ---------- cells ---------- */
function rbc(r, rad) {
  rad = rad || 7;
  return `<circle r="${rad}" fill="#efd2b0" stroke="#b9865c" stroke-width="1"/><circle r="${f(rad * .45)}" fill="#f6e3cb" stroke="#d1a47c" stroke-width=".6"/>`;
}
function dysrbc(r) {
  let s = `<circle r="7" fill="#efd2b0" stroke="#a9764d" stroke-width="1"/>`;
  const k = 4 + Math.floor(r() * 3);
  for (let i = 0; i < k; i++) {
    const a = r() * Math.PI * 2;
    s += `<circle cx="${f(Math.cos(a) * 7)}" cy="${f(Math.sin(a) * 7)}" r="${f(rr(r, 1.6, 2.4))}" fill="#efd2b0" stroke="#a9764d" stroke-width=".9"/>`;
  }
  return s + `<circle r="2.6" fill="none" stroke="#d1a47c" stroke-width=".6"/>`;
}
function wbc(r, rad) {
  rad = rad || 10;
  let s = `<circle r="${rad}" fill="#ebe7dc" stroke="#8e8777" stroke-width="1.1"/>`;
  for (let i = 0; i < 14; i++) {
    const a = r() * 6.283, d = Math.sqrt(r()) * rad * .8;
    s += `<circle cx="${f(Math.cos(a) * d)}" cy="${f(Math.sin(a) * d)}" r=".6" fill="#a39b88"/>`;
  }
  const k = rad / 10;
  s += `<g transform="rotate(${f(r() * 360)}) scale(${f(k * 100) / 100})">`
    + `<ellipse cx="-3.4" cy="-1" rx="2.7" ry="2.3" fill="#bdb5a2" stroke="#7f786a" stroke-width=".6"/>`
    + `<ellipse cx="0" cy="1.6" rx="2.7" ry="2.3" fill="#bdb5a2" stroke="#7f786a" stroke-width=".6"/>`
    + `<ellipse cx="3.4" cy="-1" rx="2.7" ry="2.3" fill="#bdb5a2" stroke="#7f786a" stroke-width=".6"/></g>`;
  return s;
}
function squamous(r) {
  const n = 8, pts = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * 6.283 + rr(r, -.2, .2), d = rr(r, 44, 60);
    pts.push(`${f(Math.cos(a) * d)},${f(Math.sin(a) * d * .82)}`);
  }
  return `<polygon points="${pts.join(' ')}" fill="#f1ede3" stroke="#9a927f" stroke-width="1.2" stroke-linejoin="round"/>`
    + `<path d="M -30 18 Q -6 8 26 22" fill="none" stroke="#cbc3b0" stroke-width="1"/>`
    + `<path d="M 18 -30 Q 26 -12 40 -6" fill="none" stroke="#d3ccb9" stroke-width=".9"/>`
    + `<circle r="5" fill="#cfc6b2" stroke="#8a826f" stroke-width=".9"/>`;
}
function transitional() {
  return `<path d="M -16 0 C -16 -14 10 -16 18 -4 L 31 1 L 17 6 C 10 16 -16 14 -16 0 Z" fill="#ece7db" stroke="#8f8875" stroke-width="1.1" stroke-linejoin="round"/>`
    + `<circle cx="-1" cy="0" r="6" fill="#c4bba7" stroke="#7f7764" stroke-width=".8"/>`;
}
function rte(r) {
  let s = `<rect x="-12" y="-9" width="24" height="18" rx="5" fill="#e5dfd0" stroke="#867e6b" stroke-width="1"/>`;
  for (let i = 0; i < 10; i++) s += `<circle cx="${f(rr(r, -9, 2))}" cy="${f(rr(r, -6, 6))}" r=".55" fill="#9c937f"/>`;
  return s + `<circle cx="5" cy="-1" r="5.3" fill="#aba18c" stroke="#6f6754" stroke-width=".8"/>`;
}
function droplet(x, y, rad, id) {
  return `<circle cx="${f(x)}" cy="${f(y)}" r="${f(rad)}" fill="url(#${id}d)" stroke="#4f4836" stroke-width=".9"/>`
    + `<circle cx="${f(x - rad * .35)}" cy="${f(y - rad * .35)}" r="${f(rad * .3)}" fill="#ffffff" opacity=".85"/>`;
}
function ofb(r, id) {
  let s = `<circle r="17" fill="#ece5d2" stroke="#857c66" stroke-width="1"/>`;
  for (let i = 0; i < 15; i++) {
    const a = r() * 6.283, d = Math.sqrt(r()) * 12.5;
    s += droplet(Math.cos(a) * d, Math.sin(a) * d, rr(r, 2.1, 3.6), id);
  }
  return s;
}
function maltese(r) {
  const rad = rr(r, 7, 13);
  return `<circle r="${f(rad + 2.5)}" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="2"/>`
    + `<circle r="${f(rad)}" fill="#f4f1e6"/>`
    + `<rect x="${f(-rad)}" y="-1.4" width="${f(rad * 2)}" height="2.8" fill="#0b0b0d"/>`
    + `<rect x="-1.4" y="${f(-rad)}" width="2.8" height="${f(rad * 2)}" fill="#0b0b0d"/>`;
}
function yeast(r) {
  const bud = r() > .35;
  return `<ellipse rx="5" ry="3.8" fill="#eef0e4" stroke="#7e8470" stroke-width="1"/>`
    + (bud ? `<ellipse cx="7.4" cy="-1.5" rx="2.9" ry="2.3" fill="#eef0e4" stroke="#7e8470" stroke-width=".9"/>` : '');
}
function trich() {
  return `<path d="M 11 -2 q 8 -8 17 -6 M 11 -1 q 9 -3 18 1 M 11 1 q 9 3 17 8 M 11 2 q 7 7 13 13" fill="none" stroke="#7d7664" stroke-width=".8"/>`
    + `<line x1="-11" y1="0" x2="-22" y2="1" stroke="#7d7664" stroke-width="1"/>`
    + `<ellipse rx="12" ry="8.5" fill="#ece8dc" stroke="#7d7664" stroke-width="1.1"/>`
    + `<path d="M 9 -6 q -3 -4 -6 -1 q -3 3 -6 -1 q -3 -4 -6 0 q -3 3 -5 0" fill="none" stroke="#8f8774" stroke-width=".9"/>`
    + `<ellipse cx="5" cy="0" rx="3.2" ry="2.2" fill="#c7c0ad" stroke="#7d7664" stroke-width=".6"/>`;
}
const rod = () => `<rect x="-1.6" y="-.65" width="3.2" height="1.3" rx=".6" fill="#8b8473"/>`;

/* ---------- crystals ---------- */
function caoxD(s) {
  const h = s / 2;
  return `<rect x="${-h}" y="${-h}" width="${s}" height="${s}" fill="rgba(255,255,255,.4)" stroke="#57534a" stroke-width="1.2"/>`
    + `<path d="M ${-h} ${-h} L ${h} ${h} M ${h} ${-h} L ${-h} ${h}" stroke="#6b675d" stroke-width=".8"/>`;
}
function caoxM(r) {
  if (r() > .5) return `<ellipse rx="7.5" ry="4.2" fill="rgba(255,255,255,.45)" stroke="#57534a" stroke-width="1.1"/><line x1="-4" y1="0" x2="4" y2="0" stroke="#8a867b" stroke-width=".6"/>`;
  return `<path d="M -4 -3.6 A 3.6 3.6 0 1 0 -4 3.6 Q 0 1.7 4 3.6 A 3.6 3.6 0 1 0 4 -3.6 Q 0 -1.7 -4 -3.6 Z" fill="rgba(255,255,255,.45)" stroke="#57534a" stroke-width="1.1"/>`;
}
function triple(L, H) {
  const gg = L * .32, iy = H * .42, x1 = -L + gg, x2 = L - gg;
  return `<polygon points="${-L},0 ${x1},${-H} ${x2},${-H} ${L},0 ${x2},${H} ${x1},${H}" fill="rgba(255,255,255,.3)" stroke="#55524a" stroke-width="1.3" stroke-linejoin="round"/>`
    + `<path d="M ${x1} ${-iy} L ${x2} ${-iy} L ${x2} ${iy} L ${x1} ${iy} Z M ${-L} 0 L ${x1} ${-iy} M ${-L} 0 L ${x1} ${iy} M ${L} 0 L ${x2} ${-iy} M ${L} 0 L ${x2} ${iy} M ${x1} ${-iy} L ${x1} ${-H} M ${x2} ${-iy} L ${x2} ${-H} M ${x1} ${iy} L ${x1} ${H} M ${x2} ${iy} L ${x2} ${H}" fill="none" stroke="#7a766c" stroke-width=".8"/>`;
}
function whet(L, H, id) {
  return `<path d="M ${-L} 0 Q 0 ${-H * 2} ${L} 0 Q 0 ${H * 2} ${-L} 0 Z" fill="url(#${id}a)" stroke="#8a5a18" stroke-width="1"/>`
    + `<line x1="${f(-L * .6)}" y1="0" x2="${f(L * .6)}" y2="0" stroke="#f6dc9b" stroke-width=".7" opacity=".8"/>`;
}
function rhomb(L, H, id) {
  return `<polygon points="${-L},0 0,${-H} ${L},0 0,${H}" fill="url(#${id}a)" stroke="#8a5a18" stroke-width="1"/>`;
}
function rosette(r, id) {
  let s = '';
  const n = 7;
  for (let i = 0; i < n; i++) s += g(0, 0, (360 / n) * i + rr(r, -8, 8), 1, `<g transform="translate(9 0)">${whet(10, 3.6, id)}</g>`);
  return s;
}
function hexa(s, fill, stroke, w) {
  const p = [];
  for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; p.push(`${f(Math.cos(a) * s)},${f(Math.sin(a) * s)}`); }
  return `<polygon points="${p.join(' ')}" fill="${fill}" stroke="${stroke}" stroke-width="${w}"/>`;
}
function cholesterol(w, h, n) {
  return `<polygon points="${-w / 2},${-h / 2} ${w / 2},${-h / 2} ${w / 2},${h / 2 - n} ${w / 2 - n},${h / 2 - n} ${w / 2 - n},${h / 2} ${-w / 2},${h / 2}" fill="rgba(255,255,255,.2)" stroke="#78746a" stroke-width="1.1"/>`;
}
function sheaf(r) {
  let s = '';
  for (let i = 0; i < 18; i++) {
    const a = rr(r, -.38, .38), l1 = rr(r, 18, 34), l2 = rr(r, 18, 34), off = rr(r, -1.2, 1.2);
    s += `<line x1="${f(-Math.cos(a) * l1)}" y1="${f(-Math.sin(a) * l1 + off)}" x2="${f(Math.cos(a) * l2)}" y2="${f(Math.sin(a) * l2 + off)}" stroke="#93782a" stroke-width=".7" opacity=".9"/>`;
  }
  return s;
}
function leucine(r, id) {
  const rad = rr(r, 10, 15);
  let s = `<circle r="${f(rad)}" fill="url(#${id}l)" stroke="#7a531a" stroke-width="1.1"/>`;
  for (let i = 0; i < 12; i++) {
    const a = i * Math.PI / 6;
    s += `<line x1="${f(Math.cos(a) * rad * .35)}" y1="${f(Math.sin(a) * rad * .35)}" x2="${f(Math.cos(a) * rad * .92)}" y2="${f(Math.sin(a) * rad * .92)}" stroke="#a3742d" stroke-width=".5" opacity=".7"/>`;
  }
  return s + `<circle r="${f(rad * .66)}" fill="none" stroke="#8f6424" stroke-width=".7"/><circle r="${f(rad * .33)}" fill="none" stroke="#8f6424" stroke-width=".7"/>`;
}
function biurate(r, id) {
  let s = '';
  const n = 8 + Math.floor(r() * 4);
  for (let i = 0; i < n; i++) {
    const a = (i / n) * 6.283 + rr(r, -.2, .2), l = rr(r, 5, 10), b = .28;
    s += `<polygon points="${f(Math.cos(a - b) * 8)},${f(Math.sin(a - b) * 8)} ${f(Math.cos(a) * (9 + l))},${f(Math.sin(a) * (9 + l))} ${f(Math.cos(a + b) * 8)},${f(Math.sin(a + b) * 8)}" fill="#6b3f14" stroke="#3f240b" stroke-width=".6"/>`;
  }
  return s + `<circle r="9.5" fill="url(#${id}b)" stroke="#3f240b" stroke-width="1"/>`;
}

/* ---------- casts ---------- */
function castPath(L, W, b, blunt) {
  const h = W / 2, x1 = -L / 2 + h, x2 = L / 2 - h;
  if (blunt) {
    const xe = L / 2;
    return `M ${x1} ${-h} Q 0 ${-h + b} ${xe} ${-h} L ${xe - 3} ${f(-h * .2)} L ${xe} ${h} Q 0 ${h + b} ${x1} ${h} A ${h} ${h} 0 0 1 ${x1} ${-h} Z`;
  }
  return `M ${x1} ${-h} Q 0 ${-h + b} ${x2} ${-h} A ${h} ${h} 0 0 1 ${x2} ${h} Q 0 ${h + b} ${x1} ${h} A ${h} ${h} 0 0 1 ${x1} ${-h} Z`;
}
function cast(kind, r, id) {
  const L = 280, W = 44, b = 16;
  const d = castPath(L, W, b, kind === 'waxy');
  const cp = `${id}c`;
  let fill = 'rgba(255,255,255,.22)', stroke = '#a7a191', sw = .9, inner = '';
  const inside = (n, fn) => {
    let s = '';
    for (let i = 0; i < n; i++) {
      const x = rr(r, -L / 2 + 4, L / 2 - 4), t = (x / (L / 2)), yc = b * (1 - t * t) * .5;
      s += fn(x, yc + rr(r, -W / 2 + 3, W / 2 - 3), i);
    }
    return s;
  };
  if (kind === 'hyaline') {
    inner = `<circle cx="-30" cy="${b * .4}" r="1.2" fill="#b9b29f"/><circle cx="42" cy="${b * .3 + 4}" r=".9" fill="#b9b29f"/>`;
  } else if (kind === 'granular') {
    fill = 'rgba(205,190,140,.55)'; stroke = '#8d8160'; sw = 1;
    inner = inside(520, (x, y) => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(rr(r, .5, 1.3))}" fill="#7d6f45" opacity=".8"/>`);
  } else if (kind === 'rbccast') {
    fill = 'rgba(232,190,150,.45)'; stroke = '#a26c43'; sw = 1;
    inner = inside(50, (x, y) => `<g transform="translate(${f(x)} ${f(y)})"><circle r="6" fill="#e7a877" stroke="#a5623a" stroke-width=".8"/><circle r="2" fill="none" stroke="#c9845a" stroke-width=".5"/></g>`);
  } else if (kind === 'wbccast') {
    fill = 'rgba(230,226,214,.5)'; stroke = '#8e8777'; sw = 1;
    inner = inside(17, (x, y) => g(x, y, 0, 1, wbc(r, 8.5)));
  } else if (kind === 'fatty') {
    fill = 'rgba(255,255,255,.25)'; stroke = '#8f8977'; sw = 1;
    inner = inside(26, (x, y) => droplet(x, y, rr(r, 2.6, 6), id));
  } else if (kind === 'waxy') {
    fill = '#e7e1cf'; stroke = '#5d5745'; sw = 1.8;
    const notch = (x, top) => {
      const t = x / (L / 2), yc = b * (1 - t * t) * .5, y = top ? yc - W / 2 : yc + W / 2, dir = top ? 1 : -1;
      return `<path d="M ${f(x - 4)} ${f(y)} L ${f(x)} ${f(y + 8 * dir)} L ${f(x + 4)} ${f(y)}" fill="none" stroke="#5d5745" stroke-width="1.2"/>`;
    };
    inner = notch(-60, true) + notch(35, true) + notch(-10, false) + notch(80, false)
      + `<path d="M -90 ${b * .2 - 20} L -85 ${b * .3 + 20}" stroke="#7b7461" stroke-width="1"/>`
      + `<path d="M 18 ${b * .45 - 20} L 23 ${b * .45 + 20}" stroke="#7b7461" stroke-width="1"/>`
      + `<path d="M -100 ${b * .1 - 13} Q 0 ${b - 13} 100 ${b * .1 - 13}" fill="none" stroke="rgba(255,255,255,.75)" stroke-width="2.4"/>`;
  }
  return `<defs><clipPath id="${cp}"><path d="${d}"/></clipPath></defs>`
    + `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`
    + `<g clip-path="url(#${cp})">${inner}</g>`;
}

/* ---------- field composition ---------- */
const KINDS = {
  caox_d: 'Calcium oxalate dihydrate', caox_m: 'Calcium oxalate monohydrate', triple: 'Triple phosphate',
  uric: 'Uric acid', cystine: 'Cystine', cholesterol: 'Cholesterol', tyrosine: 'Tyrosine', leucine: 'Leucine',
  biurate: 'Ammonium biurate', hyaline: 'Hyaline cast', granular: 'Granular cast', rbccast: 'RBC cast',
  wbccast: 'WBC cast', waxy: 'Waxy cast', fatty: 'Fatty cast', rbc: 'RBC', dysrbc: 'Dysmorphic RBC', wbc: 'WBC',
  squamous: 'Squamous epithelial cell', transitional: 'Transitional epithelial cell', rte: 'Renal tubular epithelial cell',
  ofb: 'Oval fat body', maltese: 'Maltese cross (polarized)', yeast: 'Yeast', trich: 'Trichomonas vaginalis',
};

function compose(kind, r, id) {
  let s = '';
  const bgSpecks = (n) => {
    let t = '';
    for (let i = 0; i < n; i++) {
      const p = scatter(r, 1, 0, 185)[0];
      t += `<circle cx="${f(p.x)}" cy="${f(p.y)}" r="${f(rr(r, .4, 1.2))}" fill="#b9b29f" opacity=".55"/>`;
    }
    return t;
  };
  switch (kind) {
    case 'caox_d':
      s += bgSpecks(26);
      scatter(r, 9, 64).forEach(p => { s += g(p.x, p.y, rr(r, 0, 90), 1, caoxD(rr(r, 20, 42))); });
      scatter(r, 3, 60).forEach(p => { s += g(p.x, p.y, 0, 1, rbc(r)); });
      break;
    case 'caox_m':
      s += bgSpecks(26);
      scatter(r, 13, 48).forEach(p => { s += g(p.x, p.y, rr(r, 0, 180), rr(r, 2, 3.2), caoxM(r)); });
      break;
    case 'triple':
      for (let i = 0; i < 60; i++) { const p = scatter(r, 1, 0, 180)[0]; s += `<circle cx="${f(p.x)}" cy="${f(p.y)}" r="${f(rr(r, .5, 1.4))}" fill="#a8a291" opacity=".6"/>`; }
      scatter(r, 5, 112, 130).forEach(p => { const L = rr(r, 38, 64); s += g(p.x, p.y, rr(r, -60, 60), 1, triple(L, L * rr(r, .32, .42))); });
      break;
    case 'uric':
      s += bgSpecks(18);
      scatter(r, 7, 74, 140).forEach((p, i) => {
        s += i === 0 ? g(p.x, p.y, 0, 1.9, rosette(r, id))
          : g(p.x, p.y, rr(r, 0, 180), 1, i % 3 === 0 ? rhomb(rr(r, 20, 28), rr(r, 13, 17), id) : whet(rr(r, 22, 34), rr(r, 6, 9), id));
      });
      break;
    case 'cystine':
      s += bgSpecks(20);
      scatter(r, 6, 86, 140).forEach((p, i) => {
        const sz = rr(r, 22, 38);
        let t = hexa(sz, 'rgba(255,255,255,.3)', '#5f5b51', 1.1);
        if (i % 3 === 0) t += hexa(sz * .62, 'none', '#86827a', .8);
        if (i % 4 === 1) t += g(sz * .55, sz * .3, 0, 1, hexa(sz * .7, 'rgba(255,255,255,.25)', '#5f5b51', 1));
        s += g(p.x, p.y, rr(r, 0, 60), 1, t);
      });
      break;
    case 'cholesterol':
      s += bgSpecks(16);
      [[150, 140], [215, 200], [180, 265]].forEach(([x, y], k) => {
        for (let i = 0; i < 3; i++) s += g(x + i * 18, y + i * 15, k * 8 - 6, 1, cholesterol(rr(r, 100, 132), rr(r, 66, 88), rr(r, 16, 24)));
      });
      break;
    case 'tyrosine':
      s += bgSpecks(18);
      scatter(r, 4, 125, 120).forEach(p => { s += g(p.x, p.y, rr(r, 0, 180), 1.9, sheaf(r)); });
      break;
    case 'leucine':
      s += bgSpecks(18);
      scatter(r, 6, 74, 140).forEach(p => { s += g(p.x, p.y, 0, 1.55, leucine(r, id)); });
      break;
    case 'biurate':
      s += bgSpecks(24);
      scatter(r, 6, 88, 140).forEach(p => { s += g(p.x, p.y, rr(r, 0, 90), rr(r, 1.5, 2.1), biurate(r, id)); });
      break;
    case 'hyaline': case 'granular': case 'rbccast': case 'wbccast': case 'waxy': case 'fatty':
      s += bgSpecks(22);
      scatter(r, 5, 70, 178).forEach(p => {
        if (Math.abs(p.y - C) > 70) s += g(p.x, p.y, 0, .8, kind === 'rbccast' ? rbc(r) : wbc(r));
      });
      s += g(C, C, rr(r, -28, 28), 1, cast(kind, r, id));
      break;
    case 'rbc':
      s += bgSpecks(10);
      scatter(r, 34, 22).forEach(p => { s += g(p.x, p.y, 0, rr(r, 1.4, 1.7), rbc(r)); });
      break;
    case 'dysrbc':
      s += bgSpecks(10);
      scatter(r, 22, 34).forEach(p => { s += g(p.x, p.y, rr(r, 0, 360), rr(r, 1.6, 1.9), r() > .25 ? dysrbc(r) : rbc(r)); });
      break;
    case 'wbc':
      s += bgSpecks(12);
      scatter(r, 18, 34).forEach(p => { s += g(p.x, p.y, 0, rr(r, 1.4, 1.6), wbc(r)); });
      for (let i = 0; i < 40; i++) { const p = scatter(r, 1, 0, 180)[0]; s += g(p.x, p.y, rr(r, 0, 180), 1.3, rod()); }
      break;
    case 'squamous':
      s += bgSpecks(16);
      s += g(140, 160, 15, 1.3, squamous(r)) + g(262, 252, -20, 1.15, squamous(r));
      for (let i = 0; i < 26; i++) { const p = scatter(r, 1, 0, 180)[0]; s += g(p.x, p.y, rr(r, 0, 180), 1.3, rod()); }
      break;
    case 'transitional':
      s += bgSpecks(14);
      scatter(r, 6, 80, 140).forEach(p => { s += g(p.x, p.y, rr(r, 0, 360), rr(r, 1.5, 1.8), transitional()); });
      break;
    case 'rte':
      s += bgSpecks(14);
      scatter(r, 9, 56, 150).forEach(p => { s += g(p.x, p.y, rr(r, 0, 360), rr(r, 1.5, 1.8), rte(r)); });
      break;
    case 'ofb':
      s += bgSpecks(16);
      s += g(160, 175, 0, 2.6, ofb(r, id)) + g(262, 250, 0, 2.1, ofb(r, id));
      scatter(r, 10, 30, 175).forEach(p => {
        if ((p.x - 160) ** 2 + (p.y - 175) ** 2 > 3000 && (p.x - 262) ** 2 + (p.y - 250) ** 2 > 2400) s += droplet(p.x, p.y, rr(r, 2, 4), id);
      });
      break;
    case 'maltese':
      scatter(r, 14, 40, 165).forEach(p => { s += g(p.x, p.y, 0, rr(r, 1, 1.6), maltese(r)); });
      break;
    case 'yeast':
      s += bgSpecks(14);
      for (const p of scatter(r, 4, 110, 120)) {
        for (let i = 0; i < 6; i++) s += g(p.x + rr(r, -34, 34), p.y + rr(r, -34, 34), rr(r, 0, 360), 2.5, yeast(r));
      }
      break;
    case 'trich':
      s += bgSpecks(14);
      scatter(r, 4, 115, 120).forEach(p => { s += g(p.x, p.y, rr(r, 0, 360), 2.7, trich()); });
      scatter(r, 5, 60, 170).forEach(p => { s += g(p.x, p.y, 0, 1.4, wbc(r)); });
      break;
  }
  return s;
}

function draw(kind) {
  const id = 'u' + (++uid);
  const r = rng(kind);
  const pol = kind === 'maltese';
  const body = compose(kind, r, id);
  const bg = pol
    ? `<radialGradient id="${id}g"><stop offset="0" stop-color="#1b1a1f"/><stop offset="1" stop-color="#08080a"/></radialGradient>`
    : `<radialGradient id="${id}g"><stop offset="0" stop-color="#f4f0e4"/><stop offset=".75" stop-color="#e6dfcc"/><stop offset="1" stop-color="#cfc6ad"/></radialGradient>`;
  return `<svg viewBox="0 0 400 400" class="uf" role="img" aria-label="ภาพวาดจำลองตะกอนปัสสาวะ" xmlns="http://www.w3.org/2000/svg">`
    + `<defs>${bg}`
    + `<radialGradient id="${id}v"><stop offset=".72" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".32"/></radialGradient>`
    + `<radialGradient id="${id}d" cx=".38" cy=".38"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d9d0b6"/></radialGradient>`
    + `<linearGradient id="${id}a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f1cf7d"/><stop offset="1" stop-color="#c98b2c"/></linearGradient>`
    + `<radialGradient id="${id}l" cx=".4" cy=".4"><stop offset="0" stop-color="#f2d38a"/><stop offset="1" stop-color="#b8822f"/></radialGradient>`
    + `<radialGradient id="${id}b" cx=".38" cy=".38"><stop offset="0" stop-color="#b5763a"/><stop offset="1" stop-color="#5d3610"/></radialGradient>`
    + `<clipPath id="${id}f"><circle cx="${C}" cy="${C}" r="${R}"/></clipPath></defs>`
    + `<rect width="400" height="400" fill="#121014"/>`
    + `<circle cx="${C}" cy="${C}" r="${R}" fill="url(#${id}g)"/>`
    + `<g clip-path="url(#${id}f)">${body}</g>`
    + `<circle cx="${C}" cy="${C}" r="${R}" fill="url(#${id}v)"/>`
    + `</svg>`;
}

window.URINE = { draw, KINDS };
})();
