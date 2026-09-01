#!/usr/bin/env node
/* ------------------------------------------------------------------
 * build.js — รวมเว็บทั้งชุดให้เป็นไฟล์ HTML ไฟล์เดียว
 *
 *   node build.js
 *
 * ผลลัพธ์: dist/anki-cad.html  (ฝัง CSS และ JS ไว้ในไฟล์เดียวกัน)
 * ใช้สำหรับเผยแพร่เป็นหน้าเดียว หรือส่งต่อให้คนอื่นเปิดแบบออฟไลน์
 * เนื้อหาทั้งหมดยังคงมาจากไฟล์ต้นทางเดิม จึงไม่มีการแก้สองที่
 * ------------------------------------------------------------------ */

const fs = require('fs');
const path = require('path');

const root = __dirname;
const read = p => fs.readFileSync(path.join(root, p), 'utf8');

let html = read('index.html');

// แทนที่ลิงก์ stylesheet ภายในด้วยเนื้อ CSS จริง
html = html.replace(
  /<link rel="stylesheet" href="assets\/css\/styles\.css">/,
  `<style>\n${read('assets/css/styles.css')}\n</style>`
);

// แทนที่แท็ก script ภายในด้วยเนื้อสคริปต์จริง (เรียงตามลำดับเดิม)
html = html.replace(/<script src="(assets\/js\/[^"]+)"><\/script>/g,
  (_, src) => `<script>\n${read(src)}\n</script>`);

if (/(href|src)="assets\//.test(html)) {
  console.error('ยังมีไฟล์ภายนอกที่ยังไม่ถูกฝัง — ตรวจสอบ index.html');
  process.exit(1);
}

fs.mkdirSync(path.join(root, 'dist'), { recursive: true });

// 1) ไฟล์เดี่ยวแบบเปิดได้ทันที
const full = path.join(root, 'dist', 'anki-cad.html');
fs.writeFileSync(full, html);

// 2) เวอร์ชันสำหรับฝังในโฮสต์ที่ห่อ <html>/<head>/<body> ให้เองอยู่แล้ว
const fragment = html
  .replace(/^[\s\S]*?<title>/, '<title>')
  .replace(/<\/head>\s*<body>/, '')
  .replace(/<\/body>\s*<\/html>\s*$/, '')
  .replace(/<title>[^<]*<\/title>/, '<title>Anki CAD</title>')
  .replace(/^<link rel="icon".*\n/m, '')   // โฮสต์กำหนดไอคอนเอง
  .trim() + '\n';

if (/<(!doctype|html|head|body)\b/i.test(fragment)) {
  console.error('เวอร์ชันฝังยังมีแท็กโครงเอกสารหลงเหลืออยู่');
  process.exit(1);
}

const frag = path.join(root, 'dist', 'anki-cad.embed.html');
fs.writeFileSync(frag, fragment);

const kb = b => (b.length / 1024).toFixed(1);
console.log(`เขียน dist/anki-cad.html (${kb(html)} KB) และ dist/anki-cad.embed.html (${kb(fragment)} KB)`);
