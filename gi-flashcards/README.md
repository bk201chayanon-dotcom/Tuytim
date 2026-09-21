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

- **เน้นคำถามวินิจฉัย (Dx) และ histology finding ที่สำคัญ** เหมือนชุดระบบหายใจ
- **โจทย์บรรยายพยาธิสภาพ** ที่ยกคำเฉลยมาจากคำบรรยายในสไลด์และคู่มือปฏิบัติการโดยตรง
  ตรวจแบบแยกเป็น "ประเด็นที่ต้องพูดถึง" ทีละข้อ ไม่ได้เทียบทั้งประโยค
- **ปิดคำตอบในภาพแล้ว** ป้ายกำกับที่พิมพ์ติดมากับรูปถูกแถบดำทับ
  และไม่แสดงชื่อหมวดเหนือรูประหว่างตอบ
- **ตอบด้วยการพิมพ์** ตรวจสะกดยืดหยุ่นด้วย Levenshtein พร้อมไฮไลต์จุดที่สะกดผิด
- **Spaced repetition แบบ SM-2**, เพิ่ม/แก้/ลบการ์ดเองได้, นำเข้า/ส่งออก JSON
- **โหมดจำลองสอบ** จับเวลา 60 วินาทีต่อข้อ

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
