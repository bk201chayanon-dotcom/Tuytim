#!/usr/bin/env node
/* ------------------------------------------------------------------
 * build.js — รวมเว็บร้าน neafy shop ให้เป็นไฟล์ HTML ไฟล์เดียว
 *
 *   node neafy-shop/build.js
 *
 * ผลลัพธ์:
 *   dist/neafy-shop.html        ไฟล์เดี่ยว เปิดได้ทันที ส่งต่อได้ ใช้ออฟไลน์ได้
 *   dist/neafy-shop.embed.html  สำหรับโฮสต์ที่ห่อ <html>/<head>/<body> ให้เองแล้ว
 *
 * CSS, JS และรูปสินค้า ถูกฝังลงไปในไฟล์ทั้งหมด เนื้อหายังมาจากไฟล์ต้นทางเดิม
 * จึงไม่ต้องแก้สองที่
 * ------------------------------------------------------------------ */

const fs = require('fs');
const path = require('path');

const root = __dirname;
const read = p => fs.readFileSync(path.join(root, p), 'utf8');

const MIME = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
               '.gif': 'image/gif', '.svg': 'image/svg+xml', '.webp': 'image/webp' };

// รูปสินค้า -> data: URI (ไฟล์เดียวจบ ไม่ต้องพกโฟลเดอร์ images ไปด้วย)
function dataUri(rel) {
  const ext = path.extname(rel).toLowerCase();
  const mime = MIME[ext];
  if (!mime) throw new Error(`ไม่รองรับไฟล์ชนิด ${ext} (${rel})`);
  return `data:${mime};base64,${fs.readFileSync(path.join(root, rel)).toString('base64')}`;
}

let html = read('index.html');

html = html.replace(
  /<link rel="stylesheet" href="assets\/css\/shop\.css">/,
  `<style>\n${read('assets/css/shop.css')}\n</style>`
);

html = html.replace(/<script src="(assets\/js\/[^"]+)"><\/script>/g, (_, src) => {
  let js = read(src);
  // ฝังรูปที่อ้างถึงใน products.js
  js = js.replace(/'(images\/[^']+)'/g, (m, rel) =>
    fs.existsSync(path.join(root, rel)) ? `'${dataUri(rel)}'` : m);
  return `<script>\n${js}\n</script>`;
});

if (/(href|src)="(assets|images)\//.test(html)) {
  console.error('ยังมีไฟล์ภายนอกที่ยังไม่ถูกฝัง — ตรวจสอบ index.html');
  process.exit(1);
}

const outDir = path.join(root, '..', 'dist');
fs.mkdirSync(outDir, { recursive: true });

// 1) ไฟล์เดี่ยวแบบเปิดได้ทันที
fs.writeFileSync(path.join(outDir, 'neafy-shop.html'), html);

// 2) เวอร์ชันสำหรับฝังในโฮสต์ที่ห่อโครงเอกสารให้เองอยู่แล้ว
const fragment = html
  .replace(/^[\s\S]*?<title>/, '<title>')
  .replace(/<\/head>\s*<body>/, '')
  .replace(/<\/body>\s*<\/html>\s*$/, '')
  .replace(/<title>[^<]*<\/title>/, '<title>neafy shop</title>')
  .replace(/^<link rel="icon".*\n/m, '')   // โฮสต์กำหนดไอคอนเอง
  .trim() + '\n';

if (/<(!doctype|html|head|body)\b/i.test(fragment)) {
  console.error('เวอร์ชันฝังยังมีแท็กโครงเอกสารหลงเหลืออยู่');
  process.exit(1);
}
fs.writeFileSync(path.join(outDir, 'neafy-shop.embed.html'), fragment);

const kb = b => (Buffer.byteLength(b) / 1024).toFixed(1);
console.log(`เขียน dist/neafy-shop.html (${kb(html)} KB) และ dist/neafy-shop.embed.html (${kb(fragment)} KB)`);
