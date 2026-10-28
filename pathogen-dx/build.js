#!/usr/bin/env node
/* ------------------------------------------------------------------
 * build.js — รวม Pathogen Dx Recall ให้เป็นไฟล์ HTML ไฟล์เดียว
 *
 *   node pathogen-dx/build.js
 *
 * ผลลัพธ์ใน pathogen-dx/dist/
 *   pathogen-dx.html        ไฟล์เดียวจบ เปิดหรือส่งต่อให้ใช้แบบออฟไลน์ได้
 *   pathogen-dx.embed.html  ตัดแท็ก <html>/<head>/<body> ออก สำหรับโฮสต์ที่ห่อโครงเอกสารให้เอง
 *   pathogen-dx-anki.txt    ไฟล์นำเข้า Anki (คั่นด้วย tab, เปิด HTML, มีแท็กตามสำรับ/หัวข้อ/โจทย์เก่า)
 * เนื้อหาทั้งหมดยังคงมาจาก assets/ จึงไม่มีการแก้สองที่
 * ------------------------------------------------------------------ */

const fs = require('fs');
const path = require('path');

const root = __dirname;
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const dist = path.join(root, 'dist');

let html = read('index.html');

// แทนที่ stylesheet ภายในด้วยเนื้อ CSS จริง
html = html.replace(
  /<link rel="stylesheet" href="assets\/styles\.css">/,
  () => `<style>\n${read('assets/styles.css')}\n</style>`
);

// แทนที่สคริปต์ภายในด้วยเนื้อสคริปต์จริง (เรียงตามลำดับเดิม)
html = html.replace(/<script src="(assets\/[^"]+)"><\/script>/g,
  (_, src) => `<script>\n${read(src)}\n</script>`);

if (/(href|src)="assets\//.test(html)) {
  console.error('ยังมีไฟล์ภายนอกที่ยังไม่ถูกฝัง — ตรวจสอบ index.html');
  process.exit(1);
}

fs.mkdirSync(dist, { recursive: true });

// 1) ไฟล์เดี่ยวแบบเปิดได้ทันที
fs.writeFileSync(path.join(dist, 'pathogen-dx.html'), html);

// 2) เวอร์ชันสำหรับโฮสต์ที่ห่อ <html>/<head>/<body> ให้เองอยู่แล้ว
const fragment = html
  .replace(/^[\s\S]*?<title>/, '<title>')
  .replace(/<\/head>\s*<body>/, '')
  .replace(/<\/body>\s*<\/html>\s*$/, '')
  .replace(/^<link rel="icon".*\n/m, '')   // โฮสต์กำหนดไอคอนเอง
  .trim() + '\n';

if (/<(!doctype|html|head|body)\b/i.test(fragment)) {
  console.error('เวอร์ชันฝังยังมีแท็กโครงเอกสารหลงเหลืออยู่');
  process.exit(1);
}

fs.writeFileSync(path.join(dist, 'pathogen-dx.embed.html'), fragment);

// 3) ไฟล์นำเข้า Anki — ด้านหน้า = อาการ, ด้านหลัง = เชื้อ + ข้อมูลสำคัญ
const decks = require('./assets/cards.js');
const oneLine = s => String(s).replace(/[\t\r\n]+/g, ' ').trim();
const examText = list => list.map(e => e.replace('-', ' ข้อ ')).join(' · ');

const lines = ['#separator:tab', '#html:true', '#tags column:3'];
let count = 0;
decks.forEach(deck => {
  deck.cards.forEach(c => {
    const back = [
      `<b>${c.org}</b>`,
      `<div>${c.dz}</div>`,
      `<ul>${c.keys.map(k => `<li>${k}</li>`).join('')}</ul>`,
      `<small>${deck.lecture} · ${c.src}${c.exam ? ` · ★ โจทย์เก่า ${examText(c.exam)}` : ''}</small>`
    ].join('');
    const tags = [`PathogenDx::${deck.name}::${c.g}`, ...(c.exam || []), c.hl ? 'ไฮไลต์ในชีท' : '']
      .filter(Boolean).join(' ');
    lines.push([c.clue, back, tags].map(oneLine).join('\t'));
    count++;
  });
});
fs.writeFileSync(path.join(dist, 'pathogen-dx-anki.txt'), lines.join('\n') + '\n');

const kb = b => (Buffer.byteLength(b) / 1024).toFixed(1);
console.log(`เขียน dist/pathogen-dx.html (${kb(html)} KB), dist/pathogen-dx.embed.html (${kb(fragment)} KB) และ dist/pathogen-dx-anki.txt (${count} การ์ด)`);
