#!/usr/bin/env node
/* ------------------------------------------------------------------
 * build.js — รวมเกมทั้งชุดให้เป็นไฟล์ HTML ไฟล์เดียว
 *
 *   node football-quiz/build.js
 *
 * ผลลัพธ์:
 *   dist/football-quiz.html        เปิดด้วยเบราว์เซอร์ได้ทันที ส่งต่อให้เพื่อนได้
 *   dist/football-quiz.embed.html  สำหรับโฮสต์ที่ห่อ <html>/<head>/<body> ให้เองแล้ว
 *
 * เนื้อหาทั้งหมดยังมาจากไฟล์ต้นทางเดิม จึงไม่ต้องแก้สองที่
 * ------------------------------------------------------------------ */

const fs = require('fs');
const path = require('path');

const root = __dirname;
const read = p => fs.readFileSync(path.join(root, p), 'utf8');

let html = read('index.html');

html = html.replace(
  /<link rel="stylesheet" href="assets\/css\/styles\.css">/,
  `<style>\n${read('assets/css/styles.css')}\n</style>`
);

html = html.replace(/<script src="(assets\/js\/[^"]+)"><\/script>/g,
  (_, src) => `<script>\n${read(src)}\n</script>`);

if (/(href|src)="assets\//.test(html)) {
  console.error('ยังมีไฟล์ภายนอกที่ยังไม่ถูกฝัง — ตรวจสอบ index.html');
  process.exit(1);
}

fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
fs.writeFileSync(path.join(root, 'dist', 'football-quiz.html'), html);

// เวอร์ชันฝัง: ตัดโครงเอกสารออก เหลือ <title>, <link> ฟอนต์, <style> และเนื้อหน้า
const fragment = html
  .replace(/^[\s\S]*?<title>/, '<title>')
  .replace(/<\/head>\s*<body>/, '')
  .replace(/<\/body>\s*<\/html>\s*$/, '')
  .replace(/^<link rel="icon".*\n/m, '')      // โฮสต์กำหนดไอคอนเอง
  .trim() + '\n';

if (/<(!doctype|html|head|body)\b/i.test(fragment)) {
  console.error('เวอร์ชันฝังยังมีแท็กโครงเอกสารหลงเหลืออยู่');
  process.exit(1);
}

fs.writeFileSync(path.join(root, 'dist', 'football-quiz.embed.html'), fragment);

const kb = s => (Buffer.byteLength(s) / 1024).toFixed(1);
console.log(`เขียน dist/football-quiz.html (${kb(html)} KB) และ dist/football-quiz.embed.html (${kb(fragment)} KB)`);
