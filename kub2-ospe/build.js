#!/usr/bin/env node
/* ------------------------------------------------------------------
 * build.js — ประกอบ src/ เป็นหน้าเว็บ
 *
 *   node kub2-ospe/build.js
 *
 *   index.html  เอกสาร HTML เต็ม เปิดได้ทันที (ภาพโหลดจาก img/ ข้าง ๆ)
 *   embed.html  ตัด <html>/<head>/<body> ออก สำหรับโฮสต์ที่ห่อโครงเอกสารให้เอง
 * แก้เนื้อหาที่ src/data.js ที่เดียว แล้วรันคำสั่งนี้ใหม่
 * ------------------------------------------------------------------ */
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const read = p => fs.readFileSync(path.join(dir, 'src', p), 'utf8');

const shell = read('shell.html');
const [, afterHead] = shell.split('<!--HEAD-->');
let [head, body] = afterHead.split('<!--BODY-->');

const css = read('style.css');
const js = ['data.js', 'data-urine.js', 'urine.js', 'app.js'].map(read).join('\n');

head = head.replace('/*STYLE*/', () => css).trim();
body = body.replace('/*SCRIPTS*/', () => js).trim();

// sanity: every image the data refers to must exist
const sandbox = { window: {} };
require('vm').runInNewContext(read('data.js') + '\n' + read('data-urine.js'), sandbox);
const K = sandbox.window.KUB;
const refs = new Set();
K.TOPICS.forEach(t => t.imgs.forEach(([r]) => refs.add(r)));
K.STATIONS.forEach(st => [...(st.im || []), ...(st.am || [])].forEach(r => refs.add(r)));
const missing = [...refs].filter(r => !r.startsWith('svg:') && !fs.existsSync(path.join(dir, 'img', r + '.jpg')));
if (missing.length) {
  console.error('ไม่พบไฟล์ภาพ:', missing.join(', '));
  process.exit(1);
}
const unused = fs.readdirSync(path.join(dir, 'img')).map(f => f.replace(/\.jpg$/, '')).filter(f => !refs.has(f));
if (unused.length) console.log('ภาพที่ยังไม่ได้ใช้:', unused.join(', '));

const full = `<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${head}
</head>
<body>
${body}
</body>
</html>
`;
fs.writeFileSync(path.join(dir, 'index.html'), full);
fs.writeFileSync(path.join(dir, 'embed.html'), `${head}\n${body}\n`);
console.log(`index.html ${(full.length / 1024).toFixed(0)} KB · ภาพที่อ้างถึง ${refs.size} ไฟล์`);
