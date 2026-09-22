# OSPE Flashcards — GI, Liver, Biliary and Pancreas

เว็บ flashcard สำหรับติวสอบ OSPE วิชาพยาธิวิทยา **ระบบทางเดินอาหาร ตับ ทางเดินน้ำดี และตับอ่อน**
เป็นไฟล์ HTML ไฟล์เดียว เปิดออฟไลน์ได้ทันที
เป็นคนละวิชากับ [`ospe-flashcards/`](../ospe-flashcards/) (CVS) และ
[`respi-flashcards/`](../respi-flashcards/) (ระบบหายใจ) — แยกฐานข้อมูลกันคนละชุด
ความคืบหน้าไม่ปนกัน

ที่มาเนื้อหา — รวมจาก 3 ไฟล์บรรยาย:

- **Laboratory Gastrointestinal tract** — Raksit Channarakbumrung, MD.
- **Gross & Microscopic study "Liver, Bile duct system, and Pancreas"** — Julintorn Somran, MD.
- **ปฏิบัติการจุลพยาธิวิทยา Hepatobiliary system and Exocrine Pancreas** — ผศ.พญ.จุลินทร สำราญ

## คุณสมบัติ

- **คำถาม 4 แนว**: วินิจฉัย (Dx) · histology finding ที่สำคัญ ·
  **etiology (สาเหตุของโรค)** · และบรรยายพยาธิสภาพ
- **โจทย์บรรยายพยาธิสภาพ** ที่ยกคำเฉลยมาจากคำบรรยายในสไลด์และคู่มือปฏิบัติการโดยตรง
  ตรวจแบบแยกเป็น "ประเด็นที่ต้องพูดถึง" ทีละข้อ ไม่ได้เทียบทั้งประโยค
- **ปิดคำตอบในภาพแล้ว** ป้ายกำกับที่พิมพ์ติดมากับรูปถูกแถบดำทับ
  และไม่แสดงชื่อหมวดเหนือรูประหว่างตอบ
- **ตอบด้วยการพิมพ์** ตรวจสะกดยืดหยุ่นด้วย Levenshtein พร้อมไฮไลต์จุดที่สะกดผิด
- **Spaced repetition แบบ SM-2**, เพิ่ม/แก้/ลบการ์ดเองได้, นำเข้า/ส่งออก JSON
- **โหมดจำลองสอบ** จับเวลา 60 วินาทีต่อข้อ

## ปรับตามแนวข้อสอบจริง

อ้างอิงข้อสอบเก่า **GI 2 Lab MedNU19/NT11** และ **MedNU23/NT15** ซึ่งให้ภาพแล้วถาม 2 ตอน
(ก. จงให้การวินิจฉัย → ข. คำถามต่อยอด) การ์ดในชุดนี้จึงใช้สำนวนเดียวกับข้อสอบ
— *จงให้การวินิจฉัย · จงบอกสาเหตุ · จงบอกพยาธิสภาพที่เห็นในภาพ · จงบรรยายพยาธิสภาพ* —
และเพิ่มคำถามตอน ข. แบบที่ออกสอบจริง ได้แก่ อาการทางคลินิก · ชื่อเรียกทาง gross ·
เซลล์ต้นกำเนิด · benign หรือ malignant · เกิด neoplasm อะไรตามมาได้ ·
พยาธิสภาพที่ลูกศรชี้ · differential diagnosis · staging

## แนวคำถาม

| แนว | ตัวอย่าง |
|---|---|
| Dx | ดูภาพแล้วตอบชื่อโรค |
| Histology finding | keratin pearl, signet ring cell, Rokitansky-Aschoff sinus, Mallory body |
| Etiology (29 ใบ) | mucocele เกิดจาก trauma ที่ท่อต่อมน้ำลาย · นิ่วในท่อน้ำลายกับ chronic sialadenitis · NSAIDs กับ H. pylori · ยีน CDH1 และ APC · Echinococcus granulosus · พยาธิใบไม้ตับกับ cholangiocarcinoma · นิ่วอุด cystic duct |
| Etiology จากยีน | ยีนทุกตัวที่พิมพ์อยู่ในแผนภาพของสไลด์: APC ที่ 5q21 และ β-catenin · K-RAS ที่ 12p12 · TP53 ที่ 17p13 · LOH 18q21 (SMAD 2/4) · COX-2 · MLH1/MSH2/MSH6/PMS1/PMS2 · TGFBR2, BAX, BRAF, TCF4, IGF2R · CDH1 กับ GAPPS · KIT |
| บรรยายพยาธิสภาพ | พิมพ์บรรยายเป็นภาษาอังกฤษ ตรวจทีละประเด็น |

## หมวดการ์ด

| หมวด | เนื้อหา |
|---|---|
| ช่องปากและต่อมน้ำลาย | mucocele, pleomorphic adenoma, Warthin tumor, adenoid cystic carcinoma, chronic sialadenitis |
| กระเพาะอาหาร | peptic ulcer, H. pylori, gastric adenocarcinoma, signet ring cell carcinoma, GIST |
| ลำไส้เล็ก | hemorrhagic necrosis, TB ileum, malignant lymphoma |
| ลำไส้ใหญ่และทวารหนัก | amebic colitis, strongyloidiasis, polyp ทุกชนิด, adenoma, colonic adenocarcinoma, hemorrhoid |
| ถุงน้ำดีและท่อน้ำดี | acute/chronic cholecystitis, gallstones, carcinoma of gallbladder และ ampulla |
| ตับอ่อน | acute pancreatitis, enzymatic fat necrosis |
| ตับ (ไม่ใช่เนื้องอก) | polycystic liver, hydatid cyst, nutmeg liver, fatty change, hemosiderosis, cirrhosis, alcoholic hepatitis, shock liver |
| เนื้องอกตับและท่อน้ำดี | HCC, cholangiocarcinoma, metastatic adenocarcinoma, metastatic squamous cell carcinoma |

## หมายเหตุ

- ใช้ฐานข้อมูลชื่อ `ospe-gi-flashcards` แยกจากวิชาอื่น เปิดหลายวิชาพร้อมกันได้
- ข้อมูลอยู่ในเบราว์เซอร์เครื่องที่เปิดไฟล์นี้ — **ควรส่งออกไฟล์สำรองเป็นระยะ**
- สไลด์บางหน้าเป็นตาราง staging (AJCC) และแผนภาพกลไกโรคซึ่งเป็นตัวหนังสือล้วน
  จึงไม่ได้ทำเป็นการ์ด เพราะปิดคำตอบแล้วตอบไม่ได้
