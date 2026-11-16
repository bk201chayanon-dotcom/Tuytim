# KUB II Lab OSPE

เว็บฝึก OSPE บล็อก KUB II แยกเป็น 2 LAB ตาม Lecture

| LAB | Lecture | สถานี | หัวข้อ Atlas |
|---|---|---|---|
| **Patho** | *Lab urinary system* (66 สไลด์) | 69 | 21 |
| **Urine** | *Routine urinalysis* (81 สไลด์) | 65 | 22 |

ข้อสอบเก่า **LAB 499316 ปีการศึกษา 2563 (MED24 ST16)** และ **Lab KUB2 MED NU23 & NT15**
ถูกแยกเข้าแต่ละ LAB ตามหมวด (ปี 2563: ข้อ 1–10 = Patho, ข้อ 11–15 = Urine)

## เปิดใช้งาน

เปิด `index.html` ได้ทันที (ภาพโหลดจากโฟลเดอร์ `img/` ข้าง ๆ) หรือเสิร์ฟทั้งโฟลเดอร์:

```bash
python3 -m http.server 8000   # แล้วเปิด http://localhost:8000/kub2-ospe/
```

สลับ LAB ด้วยปุ่ม **Patho / Urine** บนแถบด้านบน (Patho = สีม่วง, Urine = สีอำพัน)
ลิงก์แต่ละหน้าบอก LAB ไว้ใน hash เช่น `#urine-atlas`, `#patho-exam`

## มีอะไรบ้าง (ทุกหน้าแยกตาม LAB ที่เลือก)

| หน้า | ใช้ทำอะไร |
|---|---|
| **หน้าแรก** | สรุปแนวข้อสอบเก่าของ LAB นั้น, blueprint รายหัวข้อ, แถบ dipstick บอกความแม่นยำรายหมวด |
| **Atlas** | ครบทุกภาพใน Lecture: bullet จากสไลด์ + ส่วนที่อาจารย์เสริม + "เขียนตอบใน OSPE แบบนี้" · LAB Urine มีตารางสรุป (สี, แถบตรวจ FP/FN, หน่วยรายงาน, cell, cast, crystal) |
| **ทบทวน** | พิมพ์คำตอบ → ดูเฉลย (ตรวจ keyword อัตโนมัติ) → ให้คะแนนตัวเอง กรองตามหมวด/ข้อสอบเก่า/ข้อที่ยังไม่แม่น |
| **Exam** | จับเวลาสถานีละ 60 วินาที (ปรับ 45/90/120 ได้) ย้อนกลับไม่ได้ หมดเวลาเลื่อนเองพร้อมเสียง · เลือกสอบ LAB เดียว หรือ **รวม 2 LAB แบบสอบจริง** (Patho 2 : Urine 1) |
| **ข้อสอบเก่า** | แสดงเฉพาะข้อของ LAB ที่เลือกพร้อมเฉลย · สอบเฉพาะส่วนนั้นหรือทั้งชุด 2 LAB ได้ |

## ภาพ

- `img/Lxx*.jpg` — Lecture LAB Patho หน้า xx (`L39ic` / `L39pi` / `L39gbm` = IF สามแบบในหน้า 39)
- `img/Uxx*.jpg` — Lecture LAB Urine หน้า xx (`U51a`–`U51d` = ภาพที่ 1–4 ของหน้า 51)
- `img/X63-*.jpg` — ข้อสอบปี 2563, `img/N23-*.jpg` — ข้อสอบ NU23
- ไฟล์ลงท้าย `-a` คือภาพต้นฉบับที่มี label คำตอบ ใช้ตอนเปิดเฉลยเท่านั้น ตัวที่ใช้ตั้งคำถามถูกลบ label
  ด้วย inpainting (Patho: ARPKD หน้า 10, DM หน้า 29, ฉลาก museum หน้า 20, ข้อสอบ 2563 ข้อ 7,
  virtual slide AML และ chronic pyelonephritis · Urine: "squamous cell" หน้า 40, "Oval fat bodies and WBCs" หน้า 46)
- ภาพวาดจำลอง SVG (`src/urine.js`) เหลือใช้แค่ 2 อย่างที่ Lecture ไม่มีภาพ: Trichomonas vaginalis และ Maltese cross

## แก้เนื้อหา

แก้ที่ `src/` แล้วรัน `node kub2-ospe/build.js` เพื่อสร้าง `index.html` (เอกสารเต็ม) และ
`embed.html` (ไม่มี `<html>/<head>/<body>` สำหรับโฮสต์ที่ห่อให้เอง) build ตรวจว่าภาพที่อ้างถึงมีครบ

- `src/data.js` — LAB Patho + ข้อสอบเก่าทั้ง 2 ชุด (คีย์ตรวจ `k` = กลุ่มคำพ้อง, `n` = จำนวนจุดที่ต้องได้)
- `src/data-urine.js` — LAB Urine (เติมหมวด หัวข้อ และสถานีเข้าไปใน `window.KUB`)
- `src/app.js` — การทำงานทุกหน้าและตารางสรุป urinalysis · `src/style.css` · `src/shell.html` · `src/urine.js`

ความคืบหน้าและประวัติสอบเก็บใน `localStorage` ของเบราว์เซอร์ที่ใช้เท่านั้น

> หมายเหตุเนื้อหา: หน้า 17 ของ LAB Patho ไม่มีชื่อสไลด์ จัดเป็น histology ของ renal infarction ตามลำดับสไลด์ ·
> หัวข้อ bilirubin/urobilinogen ใน LAB Urine มาจากข้อสอบ NU23 ข้อ 15.2 (Lecture มีแค่ตารางสี) ·
> ข้อย่อยเรื่อง ethylene glycol และ isosthenuria เป็นความรู้เสริมจากตำรา ไม่ได้อยู่ในสไลด์
