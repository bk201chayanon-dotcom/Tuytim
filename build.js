#!/usr/bin/env node
/* ------------------------------------------------------------------
 * build.js — รวมเว็บแต่ละชุดให้เป็นไฟล์ HTML ไฟล์เดียว
 *
 *   node build.js
 *
 * ผลลัพธ์อยู่ใน dist/ (ฝัง CSS และ JS ไว้ในไฟล์เดียวกัน)
 * ใช้สำหรับเผยแพร่เป็นหน้าเดียว หรือส่งต่อให้คนอื่นเปิดแบบออฟไลน์
 * เนื้อหาทั้งหมดยังคงมาจากไฟล์ต้นทางเดิม จึงไม่มีการแก้สองที่
 * ------------------------------------------------------------------ */

const fs = require('fs');
const path = require('path');

const root = __dirname;

/* เว็บแต่ละชุดที่จะรวมไฟล์ — base คือโฟลเดอร์ที่ index.html อ้างไฟล์ assets ภายใน */
const APPS = [
  { base: '.',           out: 'anki-cad',    title: 'Anki CAD' },
  { base: 'resp-recall', out: 'resp-recall', title: 'Active Recall — ยาระบบทางเดินหายใจ' }
];

const kb = s => (s.length / 1024).toFixed(1);

function bundle(app) {
  const read = p => fs.readFileSync(path.join(root, app.base, p), 'utf8');
  let html = read('index.html');

  // แทนที่ลิงก์ stylesheet ภายในด้วยเนื้อ CSS จริง
  html = html.replace(
    /<link rel="stylesheet" href="(assets\/css\/[^"]+)">/g,
    (_, src) => `<style>\n${read(src)}\n</style>`
  );

  // แทนที่แท็ก script ภายในด้วยเนื้อสคริปต์จริง (เรียงตามลำดับเดิม)
  html = html.replace(/<script src="(assets\/js\/[^"]+)"><\/script>/g,
    (_, src) => `<script>\n${read(src)}\n</script>`);

  if (/(href|src)="assets\//.test(html)) {
    console.error(`ยังมีไฟล์ภายนอกที่ยังไม่ถูกฝัง — ตรวจสอบ ${app.base}/index.html`);
    process.exit(1);
  }

  // 1) ไฟล์เดี่ยวแบบเปิดได้ทันที
  fs.writeFileSync(path.join(root, 'dist', `${app.out}.html`), html);

  // 2) เวอร์ชันสำหรับฝังในโฮสต์ที่ห่อ <html>/<head>/<body> ให้เองอยู่แล้ว
  const fragment = html
    .replace(/^[\s\S]*?<title>/, '<title>')
    .replace(/<\/head>\s*<body>/, '')
    .replace(/<\/body>\s*<\/html>\s*$/, '')
    .replace(/<title>[^<]*<\/title>/, `<title>${app.title}</title>`)
    .replace(/^<link rel="icon".*\n/m, '')   // โฮสต์กำหนดไอคอนเอง
    .trim() + '\n';

  if (/<(!doctype|html|head|body)\b/i.test(fragment)) {
    console.error(`เวอร์ชันฝังของ ${app.out} ยังมีแท็กโครงเอกสารหลงเหลืออยู่`);
    process.exit(1);
  }

  fs.writeFileSync(path.join(root, 'dist', `${app.out}.embed.html`), fragment);
  console.log(`เขียน dist/${app.out}.html (${kb(html)} KB) และ dist/${app.out}.embed.html (${kb(fragment)} KB)`);
}

fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
APPS.forEach(bundle);
