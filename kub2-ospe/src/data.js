/* ------------------------------------------------------------------
 * data.js — เนื้อหาทั้งหมดของ KUB II Patho OSPE
 *
 *   GROUPS    หมวดใหญ่
 *   TOPICS    เนื้อหา Atlas ต่อโรค (ภาพจาก Lecture + bullet จากสไลด์ + ส่วนเสริม)
 *   STATIONS  ข้อสอบแบบ OSPE (ภาพ + คำถามย่อย + คีย์ตรวจอัตโนมัติ + คำอธิบาย)
 *   PAPERS    ข้อสอบเก่า 2 ชุด (อ้างถึง STATIONS)
 *
 * รูปภาพ: 'L05' = img/L05.jpg (Lecture หน้า 5), 'X63-07' = ข้อสอบ 2563,
 *         'N23-06' = ข้อสอบ MED NU23/NT15, 'svg:triple' = ภาพวาดจำลองตะกอนปัสสาวะ
 * คีย์ตรวจ k: อาร์เรย์ของ "กลุ่มคำ" — ตอบตรงคำใดคำหนึ่งในกลุ่มนับเป็น 1 จุด
 *         n = จำนวนจุดที่ต้องได้เพื่อได้คะแนนเต็มของคำถามย่อยนั้น (ค่าเริ่มต้น = ทุกกลุ่ม)
 * ไฟล์นี้คือ LAB Patho — ส่วน LAB Urine อยู่ใน data-urine.js (เติมเข้า KUB ต่อท้าย)
 * ------------------------------------------------------------------ */
(function () {
'use strict';

/* ---------- กลุ่มคำวินิจฉัยที่ใช้ซ้ำ ---------- */
const DX = {
  uc:    ['Urothelial (transitional cell) carcinoma', 'urothelial carcinoma', 'transitional cell carcinoma', 'TCC', 'transitional carcinoma', 'urothelial ca', 'transitional cell ca', 'มะเร็งเยื่อบุทางเดินปัสสาวะ'],
  adpkd: ['ADPKD', 'autosomal dominant polycystic', 'adult polycystic', 'adult type polycystic', 'adult onset polycystic'],
  arpkd: ['ARPKD', 'autosomal recessive polycystic', 'infantile polycystic', 'childhood polycystic', 'perinatal polycystic'],
  hydro: ['Hydronephrosis', 'ไตบวมน้ำ', 'hydronephrotic'],
  atn:   ['Acute tubular necrosis', 'ATN', 'shock kidney', 'tubular necrosis', 'acute tubular injury'],
  inf:   ['Renal infarction', 'infarction', 'infarct'],
  cpn:   ['Chronic pyelonephritis'],
  xgp:   ['Xanthogranulomatous pyelonephritis', 'xanthogranulomatous', 'XGP'],
  dm:    ['Diabetic nephropathy', 'diabetic glomerulosclerosis', 'diabetic kidney', 'kimmelstiel', 'DM nephropathy', 'nodular glomerulosclerosis', 'diabetic nephrosclerosis'],
  mn:    ['Membranous nephropathy', 'membranous glomerulonephritis', 'membranous glomerulopathy', 'membranous gn', 'membranous'],
  cgn:   ['Crescentic glomerulonephritis', 'crescentic gn', 'crescentic', 'RPGN', 'rapidly progressive'],
  mala:  ['Malakoplakia', 'malacoplakia'],
  aml:   ['Angiomyolipoma', 'AML'],
  rcc:   ['Renal cell carcinoma', 'RCC', 'clear cell carcinoma', 'hypernephroma', 'grawitz'],
  ccrcc: ['Clear cell renal cell carcinoma', 'clear cell RCC', 'renal cell carcinoma', 'RCC', 'clear cell carcinoma'],
  wilms: ['Wilms tumor', 'wilms', 'nephroblastoma'],
  smoke: ['Smoking', 'smoke', 'smoker', 'cigarette', 'tobacco', 'บุหรี่'],
  goodp: ['Goodpasture syndrome', 'goodpasture', 'anti GBM', 'antiGBM', 'anti glomerular basement membrane'],
};

const GROUPS = [
  { id: 'cyst', lab: 'patho', name: 'Congenital & cystic', th: 'ความผิดปกติแต่กำเนิดและถุงน้ำ' },
  { id: 'vasc', lab: 'patho', name: 'Vascular & tubular', th: 'หลอดเลือดและท่อไต' },
  { id: 'obs',  lab: 'patho', name: 'Obstruction & infection', th: 'การอุดกั้นและการติดเชื้อ' },
  { id: 'glom', lab: 'patho', name: 'Glomerular disease', th: 'โรคของโกลเมอรูลัส' },
  { id: 'blad', lab: 'patho', name: 'Urinary bladder', th: 'กระเพาะปัสสาวะ' },
  { id: 'tum',  lab: 'patho', name: 'Tumors', th: 'เนื้องอก' },
];

/* ======================================================================
 * TOPICS — Atlas
 * exam: ข้อสอบเก่าที่เคยออก, vs: อยู่ในรายการ virtual slide ของ Lecture,
 * star: โอกาสออกสอบปีนี้ (1–3) ประเมินจากข้อสอบเก่า + virtual slide + เนื้อหา Lecture
 * ==================================================================== */
const TOPICS = [
{
  id: 'horseshoe', g: 'cyst', en: 'Horseshoe kidney', th: 'ไตรูปเกือกม้า', pages: '4', star: 2,
  imgs: [['L04', 'Gross: ไตสองข้างเชื่อมกันที่ขั้วล่าง (fusion at lower pole)']],
  lec: ['Fusion at lower pole'],
  add: [
    'ไตสองข้างเชื่อมกันเป็นรูปตัว U — ประมาณ 90% เชื่อมที่ <b>lower pole</b> ด้วย isthmus (เนื้อไตหรือ fibrous band)',
    'Isthmus ติดใต้ inferior mesenteric artery ไตจึงขึ้นไปตำแหน่งปกติไม่ได้ (อยู่ต่ำกว่าปกติ) และ hilum หันมาด้านหน้า',
    'พบร่วมกับ Turner syndrome (45,X) และ trisomy 18',
    'ภาวะแทรกซ้อน: UPJ obstruction → hydronephrosis, นิ่ว, UTI ซ้ำ ๆ, เสี่ยงบาดเจ็บจาก blunt trauma',
  ],
  ospe: 'Two kidneys fused at the lower poles forming a U-shaped mass → <b>Horseshoe kidney</b>',
},
{
  id: 'adpkd', g: 'cyst', en: 'ADPKD', th: 'Autosomal dominant (adult) polycystic kidney disease', pages: '5–7', star: 3,
  exam: ['2563 ข้อ 5', 'NU23 ข้อ 1'],
  imgs: [
    ['L05', 'Gross (ตัดครึ่ง): cyst หลายขนาดแทนที่เนื้อไต — ภาพเดียวกับข้อสอบปี 2563'],
    ['L06a', 'Cut surface: cyst ทั้ง cortex และ medulla'],
    ['L06b', 'External surface: ไตโต ผิวขรุขระเต็มไปด้วย cyst ใส'],
    ['L07', 'Museum: liver cysts (บน) + renal cysts (ล่าง)'],
  ],
  lec: [
    'Autosomal dominant (adult) polycystic kidney disease',
    '<i>PKD1</i> and <i>PKD2</i> gene mutation',
    'Multiple cortical cysts',
    'Associated with cysts in liver, pancreas, spleen, or berry aneurysm',
    'Hematuria, flank pain, UTI',
    'Chronic renal failure at 40–60 y',
  ],
  add: [
    '<i>PKD1</i> (chr 16p, polycystin-1) ~85% รุนแรงกว่า · <i>PKD2</i> (chr 4q, polycystin-2) ~15%',
    'Gross: ไตโตมาก<b>ทั้งสองข้าง</b> (อาจหนักข้างละหลายกิโลกรัม) ผิวเป็นตะปุ่ม cyst หลายขนาดทั้ง cortex และ medulla ภายในมี serous fluid ใส สีน้ำตาล หรือเลือด',
    'นอกไต: <b>polycystic liver disease</b> (พบบ่อยสุด), <b>berry aneurysm</b> ที่ circle of Willis → subarachnoid hemorrhage, mitral valve prolapse, colonic diverticula, cyst ที่ pancreas/spleen',
    'Clinical: hypertension, hematuria, flank pain, UTI, นิ่ว → ESRD ช่วงอายุ 40–60 ปี',
  ],
  ospe: 'Bilaterally enlarged kidneys with numerous variable-sized cysts replacing the renal parenchyma (cortex and medulla) → <b>ADPKD</b>. Extrarenal: liver cysts, berry aneurysm',
},
{
  id: 'arpkd', g: 'cyst', en: 'ARPKD', th: 'Autosomal recessive (childhood) polycystic kidney disease', pages: '8–12', star: 3, vs: true,
  imgs: [
    ['L08', 'Gross: ไตโต ผิวเรียบ (smooth) หน้าตัดมี cyst เล็ก ๆ เรียงตั้งฉากกับผิว cortex'],
    ['L09', 'Museum: numerous small cysts, sponge-like appearance'],
    ['L10-a', 'Histo (low power): dilated collecting ducts lined by flattened cells; longitudinal cysts from cortex to medulla'],
    ['L11', 'Histo: ท่อขยายยาวเรียงจาก cortex ลงไป medulla'],
    ['L12', 'Histo (high power): cyst บุด้วย cuboidal/flattened epithelium ชั้นเดียว'],
  ],
  lec: [
    'Enlarged kidneys with smooth surface',
    'Small cysts in cortex and medulla',
    'Dilated channels are perpendicular to cortical surface',
    'Cysts are present in medulla (collecting ducts)',
    'Numerous small cysts, sponge-like appearance',
    'Histo: dilated collecting ducts lined by flattened cells; longitudinal cysts from cortex to medulla',
  ],
  add: [
    'ยีน <i>PKHD1</i> (fibrocystin) · autosomal recessive · พบในทารก/เด็ก (perinatal, neonatal, infantile, juvenile)',
    'จุดแยกจาก ADPKD: <b>ผิวไตเรียบ</b>, cyst เล็กสม่ำเสมอ <b>เรียงแนวรัศมี (radial)</b> และไม่มี cyst ก้อนใหญ่',
    'พบร่วมกับ <b>congenital hepatic fibrosis</b> (ductal plate malformation) เกือบทุกราย → portal hypertension ในเด็กที่รอด',
    'Perinatal form → oligohydramnios → Potter sequence, pulmonary hypoplasia',
  ],
  ospe: 'Bilaterally enlarged kidneys with smooth external surface; numerous small elongated cysts radially arranged perpendicular to the cortical surface (sponge-like). Micro: cystically dilated collecting ducts lined by flattened–cuboidal epithelium, oriented from cortex to medulla → <b>ARPKD</b>',
},
{
  id: 'atn', g: 'vasc', en: 'Shock kidney / Acute tubular necrosis', th: 'ไตจากภาวะช็อก / ท่อไตตายเฉียบพลัน', pages: '13–14', star: 3, vs: true,
  exam: ['2563 ข้อ 6'],
  imgs: [
    ['L13', 'Shock kidney: pale cortex + medullary congestion'],
    ['L14', 'ATN: tubular epithelium ตาย หลุดลอก มี cast; glomeruli ปกติ'],
    ['X63-06', 'ข้อสอบปี 2563 ข้อ 6 (ATN)'],
  ],
  lec: [
    'Shock kidney: pale cortex from coagulative necrosis',
    'Medullary congestion',
    'Acute tubular necrosis (histology)',
  ],
  add: [
    'ATN = สาเหตุ acute kidney injury ที่พบบ่อยที่สุด',
    'สาเหตุ 2 กลุ่ม: <b>Ischemic</b> (shock, hypotension, sepsis, hemorrhage) และ <b>Nephrotoxic</b> (aminoglycoside, contrast media, heavy metals, myoglobin จาก rhabdomyolysis, hemoglobin)',
    'Micro: tubular epithelial cell necrosis — nuclei หาย, เซลล์บวม/หลุดลอกเข้า lumen, basement membrane โล่ง (denuded), eosinophilic/granular casts, interstitial edema — <b>glomeruli ปกติ</b>',
    'Ischemic: patchy ที่ straight PT + thick ascending limb มี tubulorrhexis (BM แตก) · Nephrotoxic: PCT ต่อเนื่องเป็นแนว BM intact',
    'ตะกอนปัสสาวะ: <b>muddy brown granular casts</b>, renal tubular epithelial cells',
  ],
  ospe: 'Gross: swollen kidney with pale cortex and congested dark medulla. Micro: necrosis of tubular epithelial cells with loss of nuclei and sloughing into lumens, tubular casts, intact glomeruli → <b>Acute tubular necrosis (shock kidney)</b>. Causes: ischemia (prolonged shock), nephrotoxins',
},
{
  id: 'infarct', g: 'vasc', en: 'Renal infarction', th: 'ไตขาดเลือดตาย', pages: '15–17', star: 2,
  imgs: [
    ['L15', 'Gross: pale wedge-shaped infarct, base ที่ผิว cortex'],
    ['L16', 'Museum: white infarction ทั้งสองซีก ขอบเขตชัด'],
    ['L17', 'Histo (สไลด์ต่อจาก renal infarction): coagulative necrosis — เห็นโครงร่าง tubules/glomerulus แต่ไม่มี nuclei'],
  ],
  lec: [
    'Causes — Emboli: mural thrombi in myocardial infarction, vegetative endocarditis, aortic aneurysm, atherosclerosis',
    'Causes — Thrombosis; Acute vasculitis (PAN)',
    'White infarction',
    'Wedge shape, pale area — base against cortical surface, apex pointing toward medulla',
    'Sharply demarcated',
  ],
  add: [
    'ไตเป็น end-arterial organ → เป็น <b>white (anemic) infarct</b>',
    'Necrosis ชนิด <b>coagulative necrosis</b>: เห็น ghost outline ของ tubules และ glomeruli แต่ไม่มี nuclei; ระยะแรกมี hyperemic rim ล้อมรอบ',
    'ระยะหลังกลายเป็น scar รูป V บุ๋มลงที่ผิวไต',
    'สาเหตุที่พบบ่อยสุดคือ embolism จาก mural thrombus ใน left atrium (AF) หรือ left ventricle หลัง MI',
  ],
  ospe: 'Wedge-shaped, pale (white), sharply demarcated area with its base at the cortical surface and apex toward the medulla → <b>Renal infarction</b> (coagulative necrosis)',
},
{
  id: 'bns', g: 'vasc', en: 'Benign nephrosclerosis', th: 'ไตแข็งจากความดันโลหิตสูง', pages: 'Contents', star: 3,
  exam: ['2563 ข้อ 8'],
  imgs: [
    ['X63-08a', 'Gross (ข้อสอบ 2563): ไตเล็ก ผิว fine granular'],
    ['X63-08b', 'Histo (ข้อสอบ 2563): hyaline arteriolosclerosis'],
  ],
  lec: ['อยู่ใน Contents ของ Lecture (Benign nephrosclerosis) — ภาพนำมาจากข้อสอบเก่าปี 2563'],
  add: [
    'สัมพันธ์กับ hypertension, DM และอายุที่มากขึ้น',
    'Gross: ไตเล็กลง<b>สมมาตรทั้งสองข้าง</b> ผิว <b>fine granular</b> (grain leather) cortex บาง',
    'Micro: <b>hyaline arteriolosclerosis</b> (ผนัง arteriole หนาเป็นเนื้อชมพูเนียน lumen แคบ), fibroelastic hyperplasia ของ interlobular artery, ischemic glomerulosclerosis, tubular atrophy, interstitial fibrosis',
    'แยกจาก malignant nephrosclerosis: flea-bitten kidney (petechiae), hyperplastic arteriolosclerosis (onion-skin), fibrinoid necrosis',
    'แยกจาก chronic pyelonephritis: CPN มี scar ใหญ่ไม่สมมาตรเหนือ calyx ที่ผิดรูป',
  ],
  ospe: 'Gross: small kidney with finely granular cortical surface (cortical atrophy). Micro: hyaline arteriolosclerosis — homogeneous eosinophilic thickening of arteriolar walls with narrowed lumens → <b>Benign nephrosclerosis</b>',
},
{
  id: 'hydro', g: 'obs', en: 'Hydronephrosis & stone', th: 'ไตบวมน้ำและนิ่ว', pages: '18–20', star: 3,
  exam: ['2563 ข้อ 3', 'NU23 ข้อ 2'],
  imgs: [
    ['L18', 'Hydronephrosis: pelvis และ calyces ขยาย เนื้อไตบาง'],
    ['L19a', 'Museum: pelvicalyceal system ขยายเป็นถุง'],
    ['L19b', 'Hydronephrosis: ขยายมากจนเนื้อไตเหลือเป็นแผ่นบาง'],
    ['L20a-a', 'Hydronephrosis with renal stone (museum)'],
    ['L20b', 'Hydronephrosis with stone: นิ่วอุดที่ pelvis'],
    ['X63-03', 'ข้อสอบปี 2563 ข้อ 3'],
  ],
  lec: [
    'Obstruction of urine outflow — stone, tumor',
    'Dilation of pelvis and calyces',
    'Progressive atrophy of kidney → thin cortex',
    'Hydronephrosis with stone: renal stone / renal calculi, obstruction',
  ],
  add: [
    'สาเหตุอื่น: BPH, urethral/ureteral stricture, congenital UPJ obstruction, pregnancy, tumor (urothelial carcinoma, CA cervix)',
    'Gross: pelvis และ calyces ขยายเป็นถุง, papillae แบน (blunted), เนื้อไตบางเป็นแผ่น (<b>paper-thin cortex</b>)',
    'Micro: tubular atrophy, interstitial fibrosis, glomeruli ยังพอเหลือในระยะแรก',
    'Bilateral complete obstruction → anuria · unilateral อาจไม่มีอาการนานเพราะไตอีกข้างทำงานแทน',
  ],
  ospe: 'Markedly dilated renal pelvis and calyces with thinning (paper-thin) of the renal cortex/parenchyma (± stone obstructing the pelvis) → <b>Hydronephrosis</b>',
},
{
  id: 'cpn', g: 'obs', en: 'Chronic pyelonephritis', th: 'กรวยไตอักเสบเรื้อรัง', pages: '21–23', star: 3, vs: true,
  exam: ['2563 ข้อ 2', 'NU23 ข้อ 8'],
  imgs: [
    ['L21', 'Histo: sclerotic glomeruli + dense lymphoid infiltrate + interstitial fibrosis'],
    ['L22', 'Histo: tubular thyroidization — ท่อขยายมี colloid cast สีชมพูคล้ายต่อมไทรอยด์'],
    ['N23-08-a', 'Virtual slide (ข้อสอบเก่า, มี label): sclerotic glomeruli, lymphoid aggregation, thyroidization, interstitial fibrosis'],
  ],
  lec: [
    'Sclerotic glomeruli',
    'Tubular thyroidization (filled with colloid casts), tubular atrophy',
    'Interstitial fibrosis and inflammation',
  ],
  add: [
    'Gross: <b>irregular, asymmetric corticomedullary scars</b> เหนือ calyx ที่ blunted/ผิดรูป (ต่างจาก benign nephrosclerosis ที่สมมาตรและเป็น fine granular)',
    'สาเหตุหลัก: chronic obstruction และ vesicoureteral reflux (reflux nephropathy)',
    'Lymphoid aggregates (บางครั้งมี germinal center), periglomerular fibrosis',
    '<b>Thyroidization</b> = tubules ขยาย ผนังบาง เต็มไปด้วย eosinophilic hyaline (colloid) casts หน้าตาเหมือน thyroid follicles',
  ],
  ospe: 'Sclerotic glomeruli, tubular atrophy with thyroidization (dilated tubules filled with eosinophilic colloid casts), interstitial fibrosis and chronic inflammatory (lymphoid) infiltrate → <b>Chronic pyelonephritis</b>',
},
{
  id: 'apn', g: 'obs', en: 'Acute pyelonephritis / Renal abscess', th: 'กรวยไตอักเสบเฉียบพลัน / ฝีในไต', pages: 'ข้อสอบเก่า', star: 2,
  exam: ['2563 ข้อ 7'],
  imgs: [['X63-07-a', 'ข้อสอบปี 2563 ข้อ 7 (มี label): WBC casts + interstitial neutrophil infiltration']],
  lec: ['ไม่มีในสไลด์ Lecture ชุดนี้ — ออกในข้อสอบปี 2563 (โจทย์ระบุ Renal abscess)'],
  add: [
    'สาเหตุ: แบคทีเรีย ส่วนใหญ่ <b>ascending infection</b> ด้วย <b>gram-negative bacilli</b> (E. coli พบบ่อยสุด, Proteus, Klebsiella, Enterobacter); hematogenous พบน้อย (S. aureus)',
    'Micro: patchy suppurative interstitial inflammation (neutrophils), neutrophils อัดใน tubular lumen = <b>WBC casts</b>, abscess formation; glomeruli มักไม่ถูกกระทบ',
    'Gross: ฝีสีเหลืองนูนกระจายบนผิวไต',
    'ปัสสาวะ: pyuria + WBC casts (ช่วยแยกจาก lower UTI)',
    'Risk: obstruction, VUR, instrumentation, DM, pregnancy, เพศหญิง',
  ],
  ospe: 'Interstitial neutrophilic infiltration with neutrophils filling tubular lumens (WBC casts), ± abscess → <b>Acute pyelonephritis / renal abscess</b>; cause: ascending gram-negative bacterial infection (E. coli)',
},
{
  id: 'staghorn', g: 'obs', en: 'Staghorn (struvite) stone', th: 'นิ่วเขากวาง', pages: '24', star: 3,
  exam: ['2563 ข้อ 9'],
  imgs: [
    ['L24', 'Staghorn stone อุด pelvis ยื่นเข้าหลาย calyces'],
    ['X63-09', 'ข้อสอบปี 2563 ข้อ 9: นิ่วรูปเขากวาง (หล่อตามรูป pelvicalyceal system)'],
  ],
  lec: [
    'Magnesium ammonium phosphate',
    'Involve > 1 calyx',
    'Urease-producing pathogens (convert urea to ammonia): Proteus, Pseudomonas, Klebsiella, Staphylococcus',
  ],
  add: [
    '= <b>Struvite stone</b> (triple phosphate) เกิดในปัสสาวะด่าง: urease → ammonia → pH สูง',
    'นิ่วที่พบบ่อยที่สุดโดยรวมคือ calcium oxalate แต่ staghorn ส่วนใหญ่เป็น struvite',
    'Crystal ในปัสสาวะที่สัมพันธ์: <b>triple phosphate ("coffin lid")</b>',
    'ภาวะแทรกซ้อน: obstruction → hydronephrosis, chronic pyelonephritis, xanthogranulomatous pyelonephritis, pyonephrosis',
  ],
  ospe: 'Large branching stone filling the renal pelvis and extending into more than one calyx (cast of the pelvicalyceal system) → <b>Staghorn (struvite) calculus</b> = magnesium ammonium phosphate',
},
{
  id: 'xgp', g: 'obs', en: 'Xanthogranulomatous pyelonephritis', th: 'XGP', pages: '25–27', star: 2,
  imgs: [
    ['L25', 'Gross: สารสีเหลืองรอบ pelvicalyceal system'],
    ['L26', 'Histo (low power): sheets ของ foamy macrophages แทนที่เนื้อไต เหลือ tubules/glomeruli บางส่วน'],
    ['L27', 'Histo (high power): foamy (lipid-laden) macrophages ปนกับ lymphocytes'],
  ],
  lec: [
    'Rare form of chronic pyelonephritis',
    'Chronic consequence of nephrolithiasis or infections',
    'Yellow material deposit around pelvicalyceal system',
    'Accumulation of foamy macrophages and lymphocytes',
  ],
  add: [
    'มักพบร่วมกับ staghorn stone + การติดเชื้อเรื้อรัง (Proteus, E. coli)',
    'Foamy macrophages ปนกับ plasma cells, lymphocytes, neutrophils, giant cells',
    '"Great mimicker": ก้อนสีเหลือง + เซลล์ใส ๆ คล้าย <b>clear cell RCC</b> — ระวังสับสน',
  ],
  ospe: 'Gross: yellow friable material/nodules around a dilated pelvicalyceal system (± stone). Micro: sheets of foamy (lipid-laden) macrophages admixed with lymphocytes and plasma cells → <b>Xanthogranulomatous pyelonephritis</b>',
},
{
  id: 'dm', g: 'glom', en: 'Diabetic nephropathy', th: 'โรคไตจากเบาหวาน', pages: '28–30', star: 3, vs: true,
  imgs: [
    ['L29-a', 'Histo: Kimmelstiel-Wilson nodule + peritubular sclerosis (ลูกศร)'],
    ['L30', 'Histo: nodular glomerulosclerosis + hyaline arteriolosclerosis'],
  ],
  lec: [
    'Increase mesangial matrix with nodule formation (Kimmelstiel-Wilson nodule)',
    'Hyaline arteriolosclerosis',
    'Glomerular basement membrane thickening',
    'ภาพ: peritubular sclerosis',
  ],
  add: [
    '<b>KW nodule</b> = nodular glomerulosclerosis: ก้อน acellular mesangial matrix กลม PAS-positive ในกลาง lobule — ลักษณะเด่นของ DM',
    'Diffuse mesangial sclerosis มาก่อน nodular',
    'Hyaline arteriolosclerosis ทั้ง afferent และ <b>efferent</b> arteriole (efferent ค่อนข้างจำเพาะต่อ DM)',
    'Tubular basement membrane หนา (peritubular sclerosis), interstitial fibrosis',
    'อื่น ๆ ใน DM: papillary necrosis, pyelonephritis',
    'Clinical: microalbuminuria → overt proteinuria/nephrotic syndrome → CKD',
  ],
  ospe: 'Glomeruli with increased mesangial matrix forming nodules (Kimmelstiel-Wilson nodules), thickened GBM, hyaline arteriolosclerosis and thickened tubular basement membranes → <b>Diabetic nephropathy</b>',
},
{
  id: 'mn', g: 'glom', en: 'Membranous nephropathy', th: 'Membranous nephropathy', pages: '31–35', star: 2,
  imgs: [
    ['L32', 'Silver stain: GBM หนา มี "spikes"'],
    ['L33', 'Silver stain: spikes and holes'],
    ['L34', 'PAS: capillary wall หนาทั่ว ๆ (diffuse) ไม่มี cell เพิ่ม'],
    ['L35', 'IF: granular capillary wall staining (IgG, C3)'],
  ],
  lec: [
    'LM: GBM thickening with spikes and holes',
    'IF: Granular capillary wall staining for IgG and C3',
    'EM: Subepithelial deposits',
  ],
  add: [
    'สาเหตุ nephrotic syndrome ที่พบบ่อยในผู้ใหญ่',
    'Primary (~75%): <b>anti-PLA2R antibody</b> (phospholipase A2 receptor บน podocyte)',
    'Secondary: HBV, SLE (class V), ยา (NSAIDs, penicillamine, gold), malignancy (lung, colon), autoimmune thyroiditis',
    'Silver (Jones) stain: <b>spikes</b> = GBM ยื่นแทรกระหว่าง deposits; มองหน้าตรงเห็นเป็น <b>holes</b>',
    'ปัสสาวะ: proteinuria, oval fat bodies, fatty casts',
  ],
  ospe: 'Diffuse uniform thickening of glomerular capillary walls without hypercellularity; silver stain shows subepithelial spikes; IF granular IgG/C3 along capillary walls → <b>Membranous nephropathy</b> (EM: subepithelial deposits)',
},
{
  id: 'cgn', g: 'glom', en: 'Crescentic GN & Goodpasture', th: 'Crescentic glomerulonephritis', pages: '36–39', star: 3,
  exam: ['2563 ข้อ 10 (IF linear)', 'NU23 (IF linear)'],
  imgs: [
    ['L37', 'Crescentic GN (low power): crescents หลาย glomeruli'],
    ['L38', 'Crescent (high power): parietal epithelial cells + macrophages เต็ม Bowman space, GBM ขาด'],
    ['L39ic', 'IF แบบ immune complex: granular'],
    ['L39pi', 'IF แบบ pauci-immune: แทบไม่ติดสี'],
    ['L39gbm', 'IF แบบ anti-GBM: linear'],
    ['X63-10', 'ข้อสอบปี 2563 ข้อ 10: IF anti-IgG linear → Goodpasture'],
  ],
  lec: [
    'Clinical RPGN',
    'Immune complex: lupus nephritis, IgA nephropathy, infectious related glomerulonephritis',
    'Anti-GBM antibody (Goodpasture syndrome)',
    'Pauci-immune: associated with ANCA — GPA (Wegener granulomatosis), MPA, EGPA (Churg-Strauss syndrome)',
    'IF: immune complex = granular · pauci-immune = negative · anti-GBM = linear',
  ],
  add: [
    '<b>Crescent</b> = proliferation ของ parietal epithelial cells + monocytes/macrophages ใน Bowman space ร่วมกับ fibrin กด glomerular tuft; silver stain เห็น GBM ขาด (rupture)',
    'Cellular → fibrocellular → fibrous crescent',
    'RPGN: ไตเสื่อมเร็วภายในสัปดาห์–เดือน ร่วมกับ nephritic picture',
    '<b>Goodpasture</b>: antibody ต่อ type IV collagen (α3 chain, NC1 domain) → lung hemorrhage (hemoptysis) + RPGN; IF <b>linear IgG</b> ตาม GBM',
  ],
  ospe: 'Glomeruli with crescents — proliferation of parietal epithelial cells and macrophages filling Bowman space and compressing the tuft (with fibrin, GBM rupture) → <b>Crescentic GN</b> (clinical RPGN). IF linear IgG along GBM → <b>Anti-GBM disease / Goodpasture syndrome</b>',
},
{
  id: 'fsgs', g: 'glom', en: 'FSGS', th: 'Focal segmental glomerulosclerosis', pages: 'ข้อสอบเก่า', star: 1,
  exam: ['NU23 ข้อ 9'],
  imgs: [['N23-09', 'ข้อสอบ NU23 ข้อ 9: glomerulus มี segmental sclerosis']],
  lec: ['ไม่มีในสไลด์ Lecture ชุดนี้ — ออกในข้อสอบ MED NU23'],
  add: [
    '<b>Focal</b> (บาง glomeruli) + <b>segmental</b> (บางส่วนของ glomerulus) sclerosis ± hyalinosis',
    'ข้อสอบเก่าเฉลยว่า "glomerulo<i>nephritis</i>" ที่ถูกต้องคือ glomerulo<b>sclerosis</b> — เขียนผิดคำนี้เสียคะแนน',
    'สาเหตุ nephrotic syndrome ในผู้ใหญ่; primary (podocytopathy) หรือ secondary: HIV (collapsing variant), heroin, obesity, reflux nephropathy, sickle cell, nephron mass ลดลง',
    'IF: IgM, C3 แบบ nonspecific ในบริเวณ sclerosis · EM: foot process effacement',
  ],
  ospe: 'Glomerulus with segmental sclerosis (part of the capillary tuft obliterated by matrix ± hyalinosis) while other segments are preserved → <b>Focal segmental glomerulosclerosis (FSGS)</b>',
},
{
  id: 'mala', g: 'blad', en: 'Malakoplakia', th: 'Malakoplakia', pages: '40–42', star: 2,
  imgs: [
    ['L40', 'Gross: white-yellow soft plaques บน mucosa กระเพาะปัสสาวะ'],
    ['L41', 'H&E: ลูกศรชี้ Michaelis-Gutmann body ใน histiocyte'],
    ['L42a', 'H&E (high power): MG bodies รูป target ซ้อนชั้น'],
    ['L42b', 'Von Kossa stain: MG bodies ติดสีดำ (calcium)'],
  ],
  lec: [
    'Chronic inflammation',
    'Recurrent urinary tract infection',
    '<i>E. coli</i> and other gram-negative bacilli',
    'White-yellow soft plaques on mucosal surface; ± mass forming',
    'Histiocytes containing basophilic intracytoplasmic inclusion: <b>Michaelis-Gutmann bodies</b>',
    'Laminated deposit of calcium: positive for <b>Von Kossa</b>',
  ],
  add: [
    'กลไก: phagolysosome ของ macrophage ทำงานบกพร่อง ย่อยแบคทีเรียไม่หมด → เกิด mineralization (calcium, iron) เป็น MG bodies',
    'Histiocytes ใหญ่ cytoplasm eosinophilic granular = von Hansemann cells',
    'MG body: laminated/targetoid, PAS+, Von Kossa+ (calcium), Prussian blue+ (iron)',
    'พบบ่อยในผู้หญิงและผู้ที่ภูมิคุ้มกันต่ำ (เช่น transplant)',
  ],
  ospe: 'Gross: multiple soft yellow-white plaques on the bladder mucosa. Micro: sheets of histiocytes with granular eosinophilic cytoplasm containing basophilic laminated (targetoid) Michaelis-Gutmann bodies, Von Kossa positive → <b>Malakoplakia</b>',
},
{
  id: 'meta', g: 'blad', en: 'Metaplastic lesions (von Brunn nests)', th: 'Cystitis glandularis / cystitis cystica', pages: '43–44', star: 3, vs: true,
  imgs: [
    ['L43', 'von Brunn nests: nests ของ urothelium ยื่นลงใน lamina propria'],
    ['L44a', 'Cystitis glandularis: nest มี gland บุด้วย cuboidal/columnar cells'],
    ['L44b', 'Cystitis cystica: cystic spaces บุด้วย flattened urothelium มี eosinophilic fluid'],
  ],
  lec: [
    'Chronic mucosal irritation, inflammation',
    'Reactive process, mimics invasive carcinoma',
    'Nests of urothelium grow downward into lamina propria: "von Brunn nests"',
    'Epithelial cells in the nest undergo metaplasia — cuboidal, columnar: <b>cystitis glandularis</b>',
    'Cystic space lined by flattened urothelium: <b>cystitis cystica</b>',
    'Virtual slide: florid von Brunn nest with cystitis cystica',
  ],
  add: [
    'แยกจาก invasive carcinoma: nests ขอบกลมเรียบ อยู่ระดับเดียวกันใน lamina propria เซลล์ไม่มี atypia/mitosis และไม่มี stromal reaction',
    'Cystitis cystica: lumen มี eosinophilic fluid สีชมพู',
    'Intestinal-type cystitis glandularis (มี goblet cells) สัมพันธ์กับ adenocarcinoma ได้บ้าง',
  ],
  ospe: 'Nests of benign urothelium (von Brunn nests) in the lamina propria, some with central cystic spaces filled with eosinophilic fluid and lined by flattened urothelium (cystitis cystica) or glands lined by cuboidal/columnar cells (cystitis glandularis); no atypia → <b>reactive metaplastic lesion</b>',
},
{
  id: 'aml', g: 'tum', en: 'Angiomyolipoma', th: 'Angiomyolipoma', pages: '45–49', star: 3, vs: true,
  exam: ['2563 ข้อ 4', 'NU23 ข้อ 6'],
  imgs: [
    ['L45', 'Gross: circumscribed unencapsulated yellow-tan mass, pushing border'],
    ['L46', 'Histo: thick-walled blood vessels'],
    ['L47', 'Histo: mature adipose tissue'],
    ['L48', 'Histo: myoid spindle (smooth muscle) cells'],
    ['N23-06-a', 'Virtual slide (ข้อสอบเก่า, มี label): fatty tissue, smooth muscle proliferation, vascular proliferation, normal kidney'],
  ],
  lec: [
    'Benign mesenchymal neoplasm',
    'Associated with tuberous sclerosis',
    'Gross: circumscribed unencapsulated yellow-tan mass with pushing border',
    '3 components: thick wall blood vessels, myoid spindle cells, mature adipose tissue',
  ],
  add: [
    'กลุ่ม PEComa — IHC: HMB-45+, Melan-A+ ร่วมกับ SMA+',
    'Tuberous sclerosis (<i>TSC1</i> hamartin / <i>TSC2</i> tuberin) → มักเป็นหลายก้อนทั้งสองข้าง',
    'ภาวะแทรกซ้อนสำคัญ: spontaneous retroperitoneal hemorrhage (ก้อน > 4 cm)',
    'Vessels ผนังหนา hyalinized ผิดรูป (dysmorphic) และมี smooth muscle แผ่ออกจากผนังหลอดเลือด',
  ],
  ospe: 'Triphasic benign tumor composed of mature adipose tissue, thick-walled dysmorphic blood vessels and smooth muscle (myoid spindle) cell proliferation → <b>Angiomyolipoma</b>',
},
{
  id: 'rcc', g: 'tum', en: 'Renal cell carcinoma, clear cell type', th: 'มะเร็งไตชนิด clear cell', pages: '50–52', star: 3, vs: true,
  imgs: [
    ['L50', 'Gross: yellow renal mass with necrosis and hemorrhage'],
    ['L51', 'Gross: ก้อนสีเหลืองทอง variegated มีเลือดออกและเนื้อตาย ที่ขั้วล่าง'],
    ['L52', 'Histo: nests ของเซลล์ cytoplasm ใส + delicate branching vessels'],
  ],
  lec: [
    'Malignant tumor',
    'Risk factors: cigarette smoking, ESRD, CKD',
    'Von Hippel-Lindau (VHL) syndrome',
    'Infiltrative mass; yellow renal mass with necrosis and hemorrhage',
    'Histo: nested, tubular, solid growth; round or polygonal shape; abundant clear cytoplasm (glycogen and lipid); hyperchromatic nuclei; delicate branching blood vessels',
  ],
  add: [
    'Clear cell RCC = ชนิดพบบ่อยสุด (~70%) กำเนิดจาก proximal tubule',
    '<i>VHL</i> gene (chromosome 3p) — VHL syndrome: RCC หลายก้อนทั้งสองข้าง, hemangioblastoma (cerebellum, retina), pheochromocytoma',
    'Risk อื่น: obesity, hypertension, cadmium, acquired cystic disease จากการฟอกไต',
    'สี<b>เหลืองทอง</b>จาก lipid; ชอบลุกลามเข้า renal vein → IVC',
    'Clinical: hematuria, flank pain, palpable mass; paraneoplastic: polycythemia (EPO), hypercalcemia (PTHrP), hypertension (renin)',
  ],
  ospe: 'Gross: golden-yellow variegated renal mass with hemorrhage and necrosis. Micro: nests/sheets of polygonal cells with abundant clear cytoplasm (glycogen, lipid) separated by delicate branching vessels → <b>Clear cell renal cell carcinoma</b>',
},
{
  id: 'wilms', g: 'tum', en: 'Wilms tumor', th: 'Nephroblastoma', pages: '53–56', star: 3, vs: true,
  imgs: [
    ['L53', 'Gross: large, solitary, circumscribed tan-gray mass'],
    ['L54', 'Gross: ก้อนใหญ่ homogeneous tan เบียดเนื้อไตที่เหลือเป็นแถบบาง'],
    ['L55', 'Histo: triphasic — blastema, epithelial (tubules), stroma'],
  ],
  lec: [
    'Malignant embryonal tumor; occurs in children',
    'Large, solitary, circumscribed mass; homogeneous tan-gray; foci of hemorrhage, necrosis',
    'Histology 3 components — blastema: small blue round cells; epithelial: glandular formation; stromal: spindle cells',
  ],
  add: [
    'มะเร็งไตที่พบบ่อยที่สุดในเด็ก อายุ 2–5 ปี มาด้วยก้อนในท้องขนาดใหญ่',
    'Syndromes: <b>WAGR</b> (Wilms, Aniridia, Genital anomalies, mental Retardation; WT1 deletion), <b>Denys-Drash</b> (WT1 mutation), <b>Beckwith-Wiedemann</b> (WT2/IGF2; organomegaly, macroglossia, hemihypertrophy)',
    'Precursor: nephrogenic rests · Anaplasia (TP53) = unfavorable histology',
  ],
  ospe: 'Gross: large, solitary, well-circumscribed soft tan-gray (fish-flesh) mass with hemorrhage/necrosis in a child’s kidney. Micro: triphasic — blastemal small round blue cells, epithelial tubules/glands and spindle stromal cells → <b>Wilms tumor (nephroblastoma)</b>',
},
{
  id: 'uc', g: 'tum', en: 'Urothelial (transitional cell) carcinoma', th: 'มะเร็งเยื่อบุทางเดินปัสสาวะ', pages: '57–64', star: 3, vs: true,
  exam: ['2563 ข้อ 1'],
  imgs: [
    ['L57', 'Renal pelvis: infiltrative gray mass + hydronephrosis'],
    ['L58', 'Renal pelvis: papillary tumor เต็ม pelvis'],
    ['L59', 'Urinary bladder: exophytic gray mass + hemorrhage (ภาพเดียวกับข้อสอบปี 2563)'],
    ['L60', 'Urinary bladder: irregular papillary grey-tan mass with focal hemorrhage'],
    ['L61', 'Ureter: exophytic/papillary mass อุด ureter → hydronephrosis'],
    ['L62', 'Histo (low power): complex papillary pattern'],
    ['L63', 'Histo (high power): nuclear atypia, mitoses'],
    ['X63-01b', 'ข้อสอบปี 2563 ข้อ 1: papillary urothelial carcinoma'],
  ],
  lec: [
    'Location: renal calyx, pelvis, ureter, urinary bladder',
    'Risk factors: smoking, aniline dye',
    'Renal pelvis: infiltrative gray mass in renal pelvis; hydronephrosis',
    'Urinary bladder: exophytic gray mass at urinary bladder wall; hemorrhage; irregular papillary grey-tan mass with focal hemorrhage',
    'Ureter: exophytic/papillary tan mass; proximal ureter obstruction causing hydronephrosis',
    'Histology: complex papillary pattern; nuclear atypia; increased mitotic activity',
    'Virtual slides: non-invasive papillary urothelial carcinoma, invasive urothelial carcinoma',
  ],
  add: [
    'Risk อื่น: cyclophosphamide, phenacetin, arsenic, chronic irritation · Schistosoma haematobium สัมพันธ์กับ squamous cell carcinoma มากกว่า',
    'Aniline dye/aromatic amines (β-naphthylamine): อาชีพย้อมสี ยาง หนัง',
    'Clinical: <b>painless gross hematuria</b>; เป็น field effect → multifocal และกลับเป็นซ้ำบ่อย',
    'Non-invasive papillary (low/high grade) vs invasive (lamina propria → muscularis propria = จุดสำคัญของ staging)',
    'Papillae มี fibrovascular core คลุมด้วย urothelium หนาหลายชั้น',
  ],
  ospe: 'Gross: exophytic papillary grey-tan mass with hemorrhage in the bladder/renal pelvis/ureter. Micro: complex papillae with fibrovascular cores lined by thickened atypical urothelium with increased mitoses → <b>Urothelial (transitional cell) carcinoma</b>. Risks: smoking, aniline dye',
},
];

/* ======================================================================
 * STATIONS
 * src: old = ข้อสอบเก่า · lec = จากภาพ Lecture · pred = สถานีบูรณาการที่คาดว่าจะออก
 * ==================================================================== */
const STATIONS = [
/* ---------------- ข้อสอบเก่า 2563 (MED24 ST16) ---------------- */
{ id: 'X63-1', t: 'uc', src: 'old', ref: 'ข้อสอบ 2563 ข้อ 1', kind: 'Gross + Micro', im: ['L59', 'X63-01b'],
  p: [
    { q: 'จงให้การวินิจฉัย', a: 'Transitional cell carcinoma (urothelial carcinoma) of urinary bladder', k: [DX.uc] },
    { q: 'Risk factors (2 causes)', a: 'Smoking, aniline dye', n: 2, k: [DX.smoke, ['Aniline dye', 'aniline', 'aromatic amine', 'naphthylamine', 'dye', 'สีย้อม'], ['cyclophosphamide'], ['phenacetin', 'analgesic'], ['arsenic'], ['schistosoma', 'schistosomiasis']] },
  ],
  x: 'Gross: ก้อน exophytic สีเทาขรุขระ มีเลือดออก บนผนังกระเพาะปัสสาวะ · Micro: papillary fronds มี fibrovascular core คลุมด้วย urothelium หนาหลายชั้น — ตอบแค่ "bladder cancer" ไม่พอ ต้องระบุชนิดเซลล์' },
{ id: 'X63-2', t: 'cpn', src: 'old', ref: 'ข้อสอบ 2563 ข้อ 2 · NU23 ข้อ 8', kind: 'Virtual slide', im: ['N23-08'], am: ['N23-08-a'],
  p: [
    { q: 'จงบรรยายพยาธิสภาพ', a: 'Sclerotic glomeruli, lymphoid cell aggregation, tubular atrophy with thyroidization, interstitial fibrosis', n: 3,
      k: [['Sclerotic glomeruli', 'sclerotic glomerul', 'glomerulosclerosis', 'sclerosis'], ['Thyroidization', 'thyroidisation', 'thyroidization of tubules', 'colloid cast', 'thyroid like'], ['Lymphoid aggregation', 'lymphoid', 'lymphocyte', 'chronic inflammat', 'mononuclear'], ['Interstitial fibrosis', 'fibrosis'], ['Tubular atrophy', 'atrophy']] },
    { q: 'จงให้การวินิจฉัย', a: 'Chronic pyelonephritis', k: [DX.cpn] },
  ],
  x: 'ภาพ virtual slide เดียวกับที่ใช้สอบทั้งปี 2563 และ NU23 (ปี NU23 เฉลยเพิ่ม interstitial edema) — เฉลยเปิดภาพที่มี label ให้ดูตำแหน่ง: กลุ่ม lymphoid รอบ sclerotic glomeruli และท่อไตที่มี pink colloid' },
{ id: 'X63-3', t: 'hydro', src: 'old', ref: 'ข้อสอบ 2563 ข้อ 3', kind: 'Gross', im: ['X63-03'],
  p: [
    { q: 'จงบรรยายพยาธิสภาพ', a: 'Paper-thin cortex, dilated calyces, dilated renal pelvis', n: 3,
      k: [['Paper-thin cortex', 'paper thin', 'thin cortex', 'cortical thinning', 'thinning of cortex', 'cortical atrophy', 'thin parenchyma'], ['Dilated calyces', 'dilated calyces', 'dilated calyx', 'dilated calyc', 'calyceal dilat', 'dilatation of calyces', 'dilated pelvicalyceal', 'pelvicalyceal dilat'], ['Dilated renal pelvis', 'dilated pelvis', 'dilated renal pelvis', 'pelvic dilat', 'dilatation of pelvis', 'dilated pelvicalyceal', 'pelvicalyceal dilat']] },
    { q: 'จงให้การวินิจฉัย', a: 'Hydronephrosis', k: [DX.hydro] },
  ],
  x: 'บรรยายให้ครบ 3 จุด: pelvis ขยาย, calyces ขยาย, cortex บาง ถ้าเห็น ureter ขยายด้วยบอกได้ว่าอุดต่ำกว่า UPJ (hydroureteronephrosis)' },
{ id: 'X63-4', t: 'aml', src: 'old', ref: 'ข้อสอบ 2563 ข้อ 4 · NU23 ข้อ 6', kind: 'Virtual slide', im: ['N23-06'], am: ['N23-06-a'],
  p: [
    { q: 'จงบรรยายพยาธิสภาพ', a: 'Fatty tissue, smooth muscle cell proliferation, vascular proliferation (thick-walled vessels)', n: 3,
      k: [['Mature adipose tissue', 'fat', 'fatty', 'adipose', 'adipocyte', 'lipo'], ['Smooth muscle proliferation', 'smooth muscle', 'spindle', 'myoid', 'muscle'], ['Thick-walled vessels', 'vessel', 'vascular', 'thick wall', 'thick walled']] },
    { q: 'จงให้การวินิจฉัย', a: 'Angiomyolipoma', k: [DX.aml] },
  ],
  x: 'ออกทั้ง 2 ปี — ชื่อโรคบอกองค์ประกอบครบ: <b>angio</b> (vessels) + <b>myo</b> (smooth muscle) + <b>lipo</b> (fat) บรรยายได้ 3 คำ ได้คะแนนเต็ม' },
{ id: 'X63-5', t: 'adpkd', src: 'old', ref: 'ข้อสอบ 2563 ข้อ 5', kind: 'Gross', im: ['L05'],
  p: [
    { q: 'จงให้การวินิจฉัย', a: 'Adult polycystic kidney disease (ADPKD)', k: [DX.adpkd] },
    { q: 'Complication in other organs (at least 2)', a: 'Polycystic liver disease, cerebral berry aneurysm', n: 2,
      k: [['Liver cysts', 'liver', 'hepatic', 'polycystic liver', 'ตับ'], ['Berry aneurysm', 'berry', 'aneurysm', 'subarachnoid', 'SAH'], ['Pancreatic cysts', 'pancrea'], ['Splenic cysts', 'spleen', 'splenic'], ['Mitral valve prolapse', 'mitral valve prolapse', 'MVP'], ['Colonic diverticula', 'diverticul']] },
  ],
  x: 'ตอบ "polycystic kidney disease" เฉย ๆ ยังไม่พอ ต้องบอก autosomal dominant/adult — เพราะ ARPKD ก็เป็น polycystic เหมือนกัน · ภาวะนอกไตที่ต้องจำ: liver cysts (บ่อยสุด) และ berry aneurysm (อันตรายสุด)' },
{ id: 'X63-6', t: 'atn', src: 'old', ref: 'ข้อสอบ 2563 ข้อ 6', kind: 'Micro', im: ['X63-06'],
  p: [
    { q: 'จงให้การวินิจฉัย', a: 'Shock kidney / acute tubular necrosis', k: [DX.atn] },
    { q: 'สาเหตุ', a: 'Ischemic (prolonged shock), nephrotoxic', n: 2,
      k: [['Ischemia (prolonged shock)', 'ischemi', 'ischaemi', 'shock', 'hypotension', 'hypoperfusion', 'sepsis', 'hemorrhage'], ['Nephrotoxin', 'nephrotoxi', 'toxic', 'toxin', 'aminoglycoside', 'contrast', 'drug', 'myoglobin', 'heavy metal', 'rhabdomyolysis']] },
  ],
  x: 'มองหา tubules ที่ epithelium หลุดลอก nuclei หาย มี debris/cast ใน lumen ขณะที่ glomerulus ยังปกติ · สาเหตุมี 2 กลุ่ม ต้องตอบให้ครบทั้ง ischemic และ nephrotoxic' },
{ id: 'X63-7', t: 'apn', src: 'old', ref: 'ข้อสอบ 2563 ข้อ 7', kind: 'Micro', im: ['X63-07'], am: ['X63-07-a'], stem: 'โจทย์จริงระบุหัวข้อว่า "Renal abscess"',
  p: [
    { q: 'จงบรรยายพยาธิสภาพ', a: 'WBC casts in tubules, neutrophil infiltration in interstitium', n: 2,
      k: [['WBC casts', 'wbc cast', 'white cell cast', 'neutrophil cast', 'leukocyte cast', 'pus cast', 'neutrophils in tubul', 'neutrophil in tubul'], ['Interstitial neutrophil infiltration', 'interstitial neutrophil', 'neutrophil infiltrat', 'neutrophil', 'suppurative', 'PMN', 'polymorphonuclear']] },
    { q: 'สาเหตุ', a: 'Gram-negative bacterial infection (ascending)', k: [['Gram-negative bacteria', 'gram negative', 'e coli', 'escherichia', 'bacteria', 'bacterial', 'ascending infection']] },
  ],
  x: 'Acute pyelonephritis: neutrophils ใน interstitium + อัดอยู่ใน tubular lumen (WBC casts) — สาเหตุหลัก ascending infection ด้วย gram-negative bacilli โดยเฉพาะ <i>E. coli</i>' },
{ id: 'X63-8', t: 'bns', src: 'old', ref: 'ข้อสอบ 2563 ข้อ 8', kind: 'Gross + Micro', im: ['X63-08a', 'X63-08b'],
  p: [
    { q: 'จงบรรยายพยาธิสภาพ', a: 'Fine granular surface, atrophic change, hyalinosis of arterioles', n: 3,
      k: [['Fine granular surface', 'granular', 'fine granular', 'finely granular'], ['Atrophic (small) kidney', 'atroph', 'small kidney', 'shrunken', 'contracted'], ['Hyaline arteriolosclerosis', 'hyalin', 'arteriolosclerosis', 'arteriolar sclerosis']] },
    { q: 'จงให้การวินิจฉัย', a: 'Benign nephrosclerosis', k: [['Benign nephrosclerosis', 'benign nephrosclerosis', 'nephrosclerosis', 'hypertensive nephrosclerosis', 'arterionephrosclerosis']] },
  ],
  x: 'ภาพ A: ไตเล็ก ผิว fine granular · ภาพ B: arteriole ผนังหนาเป็นเนื้อชมพูเนียน (hyaline) lumen แคบ — คู่นี้ = benign nephrosclerosis (ความดันสูง/DM/อายุ)' },
{ id: 'X63-9', t: 'staghorn', src: 'old', ref: 'ข้อสอบ 2563 ข้อ 9', kind: 'Gross', im: ['X63-09'],
  p: [
    { q: 'จงให้การวินิจฉัย', a: 'Staghorn stone', k: [['Staghorn stone', 'staghorn', 'stag horn', 'struvite', 'นิ่วเขากวาง']] },
    { q: 'นิ่วเกิดจากสารอะไร', a: 'Magnesium ammonium phosphate', k: [['Magnesium ammonium phosphate', 'magnesium ammonium phosphate', 'struvite', 'triple phosphate', 'mg nh4 po4', 'MAP']] },
  ],
  x: 'นิ่วหล่อเป็นรูปของ pelvis + calyces (> 1 calyx) = staghorn · ส่วนประกอบ struvite เกิดจากเชื้อที่สร้าง urease (Proteus) ทำให้ปัสสาวะเป็นด่าง' },
{ id: 'X63-10', t: 'cgn', src: 'old', ref: 'ข้อสอบ 2563 ข้อ 10 · NU23', kind: 'Immunofluorescence', im: ['X63-10'], stem: 'ภาพ immunofluorescence ย้อม IgG',
  p: [
    { q: 'จงบรรยายพยาธิสภาพ', a: 'Linear pattern (along GBM)', k: [['Linear pattern', 'linear', 'เส้นตรง', 'ribbon']] },
    { q: 'จงให้การวินิจฉัย', a: 'Goodpasture syndrome (anti-GBM disease)', k: [DX.goodp] },
  ],
  x: 'IgG ติดเป็นเส้นเรียบต่อเนื่องตาม GBM = <b>linear</b> → anti-GBM antibody · ถ้าเป็นจุด ๆ ก้อน ๆ = granular (immune complex) · ถ้าแทบไม่ติด = pauci-immune (ANCA)' },
/* ---------------- ข้อสอบเก่า MED NU23 & NT15 ---------------- */
{ id: 'N23-1', t: 'adpkd', src: 'old', ref: 'ข้อสอบ NU23 ข้อ 1', kind: 'Museum', im: ['L07'], stem: 'Museum specimen',
  p: [
    { q: 'วินิจฉัยโรค', a: 'Autosomal dominant (adult) polycystic kidney disease', k: [DX.adpkd] },
    { q: 'โรคที่พบร่วมมา 2 ชื่อ', a: 'Polycystic liver disease (liver cysts), berry aneurysm', n: 2,
      k: [['Liver cysts', 'liver', 'hepatic', 'polycystic liver', 'ตับ'], ['Berry aneurysm', 'berry', 'aneurysm', 'subarachnoid', 'SAH'], ['Pancreatic cysts', 'pancrea'], ['Splenic cysts', 'spleen', 'splenic'], ['Mitral valve prolapse', 'mitral valve prolapse', 'MVP'], ['Colonic diverticula', 'diverticul']] },
  ],
  x: 'ในขวด museum นี้มีตับ (ด้านบน) ที่เต็มไปด้วย cyst มาด้วย — ใบ้คำตอบข้อ 2 ไว้แล้ว: polycystic liver + อีกอันที่ต้องจำคือ berry aneurysm' },
{ id: 'N23-2', t: 'hydro', src: 'old', ref: 'ข้อสอบ NU23 ข้อ 2', kind: 'Museum', im: ['L19a'],
  p: [
    { q: 'บรรยายพยาธิสภาพ', a: 'Dilated renal pelvis and calyces, thin (atrophic) cortex', n: 2,
      k: [['Dilated pelvis & calyces', 'dilated', 'dilatation', 'pelvicalyceal', 'calyc', 'pelvis'], ['Thin cortex', 'thin', 'atroph', 'paper']] },
    { q: 'Diag', a: 'Hydronephrosis', k: [DX.hydro] },
  ],
  x: 'ไตกลายเป็นถุงผนังบาง pelvis/calyces พองออก — อย่าลืมบอกเนื้อไตบาง (paper-thin cortex)' },
{ id: 'N23-9', t: 'fsgs', src: 'old', ref: 'ข้อสอบ NU23 ข้อ 9', kind: 'Micro', im: ['N23-09'],
  p: [{ q: 'จงวินิจฉัย', a: 'Focal segmental glomerulosclerosis (FSGS)', k: [['Focal segmental glomerulosclerosis', 'focal segmental glomerulosclerosis', 'FSGS', 'focal segmental']] }],
  x: 'บาง segment ของ tuft ถูกแทนที่ด้วย matrix (sclerosis) ส่วนอื่นยังปกติ · ระวัง: เฉลยเก่าเขียน "glomerulonephritis" — ที่ถูกคือ glomerulo<b>sclerosis</b>' },
/* ---------------- Lecture: congenital & cystic ---------------- */
{ id: 'L-04', t: 'horseshoe', src: 'lec', ref: 'Lecture หน้า 4', kind: 'Gross', im: ['L04'],
  p: [
    { q: 'จงให้การวินิจฉัย', a: 'Horseshoe kidney', k: [['Horseshoe kidney', 'horseshoe', 'horse shoe', 'เกือกม้า']] },
    { q: 'ตำแหน่งที่ไตเชื่อมกัน', a: 'Lower pole (~90%)', k: [['Lower pole', 'lower pole', 'inferior pole', 'lower', 'ขั้วล่าง']] },
    { q: 'ภาวะแทรกซ้อน 1 อย่าง', a: 'Obstruction/hydronephrosis, stone, recurrent UTI', n: 1, k: [['Obstruction', 'obstruct', 'hydronephrosis'], ['Stone', 'stone', 'calcul', 'นิ่ว'], ['UTI', 'infection', 'UTI']] },
  ],
  x: 'ไต 2 ข้างเชื่อมเป็นรูปตัว U ที่ lower pole · isthmus ติด inferior mesenteric artery ทำให้ไตอยู่ต่ำ · พบใน Turner syndrome' },
{ id: 'L-06a', t: 'adpkd', src: 'lec', ref: 'Lecture หน้า 6', kind: 'Gross', im: ['L06a'],
  p: [
    { q: 'จงให้การวินิจฉัย', a: 'ADPKD', k: [DX.adpkd] },
    { q: 'ยีนที่เกี่ยวข้อง 2 ยีน', a: 'PKD1, PKD2', n: 2, k: [['PKD1', 'pkd1', 'polycystin 1', 'polycystin1'], ['PKD2', 'pkd2', 'polycystin 2', 'polycystin2']] },
  ],
  x: 'Cyst หลายขนาดทั่วทั้งไต ทั้ง cortex และ medulla · PKD1 (chr 16, polycystin-1) พบบ่อยและรุนแรงกว่า PKD2 (chr 4)' },
{ id: 'L-06b', t: 'adpkd', src: 'lec', ref: 'Lecture หน้า 6', kind: 'Gross', im: ['L06b'],
  p: [
    { q: 'จงให้การวินิจฉัย', a: 'ADPKD', k: [DX.adpkd] },
    { q: 'อาการทางคลินิก 2 อย่าง', a: 'Hematuria, flank pain, UTI, hypertension', n: 2, k: [['Hematuria', 'hematuria', 'haematuria'], ['Flank pain', 'flank', 'pain'], ['UTI', 'UTI', 'infection'], ['Hypertension', 'hypertension', 'HTN'], ['Renal failure', 'renal failure', 'CKD', 'ESRD', 'kidney failure']] },
    { q: 'ไตวายเรื้อรังมักเกิดช่วงอายุใด', a: '40–60 ปี', k: [['40–60 ปี', '40-60', '40', '50', '60']] },
  ],
  x: 'ผิวนอกไตโตเป็นตะปุ่มด้วย cyst ใสจำนวนมาก · ADPKD เป็นโรคผู้ใหญ่ ไตวายอายุ 40–60 ปี' },
{ id: 'L-08', t: 'arpkd', src: 'lec', ref: 'Lecture หน้า 8', kind: 'Gross', im: ['L08'], stem: 'ไตทั้งสองข้างของทารกแรกเกิด',
  p: [
    { q: 'จงบรรยายพยาธิสภาพ', a: 'Enlarged kidneys, smooth surface, numerous small cysts in cortex and medulla arranged perpendicular to the cortical surface', n: 3,
      k: [['Smooth surface', 'smooth'], ['Enlarged', 'enlarge', 'large', 'โต'], ['Numerous small cysts', 'small cyst', 'tiny cyst', 'numerous cyst', 'multiple cyst', 'cyst'], ['Radially arranged (perpendicular)', 'perpendicular', 'radial', 'radially']] },
    { q: 'จงให้การวินิจฉัย', a: 'ARPKD', k: [DX.arpkd] },
  ],
  x: 'ไตโตแต่<b>ผิวเรียบ</b> หน้าตัดมี cyst เล็ก ๆ เรียงเป็นเส้นตั้งฉากกับผิว — ต่างจาก ADPKD ที่ผิวขรุขระและ cyst ใหญ่ไม่เท่ากัน' },
{ id: 'L-09', t: 'arpkd', src: 'lec', ref: 'Lecture หน้า 9', kind: 'Museum', im: ['L09'], stem: 'Museum specimen จากเด็ก',
  p: [
    { q: 'ลักษณะหน้าตัดไต', a: 'Numerous small cysts — sponge-like appearance', k: [['Sponge-like, numerous small cysts', 'sponge', 'spongy', 'small cyst', 'numerous cyst', 'honeycomb']] },
    { q: 'จงให้การวินิจฉัย', a: 'ARPKD', k: [DX.arpkd] },
    { q: 'รอยโรคที่ตับที่พบร่วม', a: 'Congenital hepatic fibrosis', k: [['Congenital hepatic fibrosis', 'hepatic fibrosis', 'liver fibrosis', 'fibrosis', 'ductal plate']] },
  ],
  x: 'หน้าตัดเหมือนฟองน้ำ (sponge-like) เพราะ collecting ducts ขยายทั่วทั้งไต · ARPKD มาคู่กับ congenital hepatic fibrosis' },
{ id: 'L-10', t: 'arpkd', src: 'lec', ref: 'Lecture หน้า 10 · virtual slide', kind: 'Virtual slide', im: ['L10'], am: ['L10-a'],
  p: [
    { q: 'จงบรรยายพยาธิสภาพ', a: 'Dilated collecting ducts lined by flattened cells; longitudinal (elongated) cysts from cortex to medulla', n: 2,
      k: [['Dilated collecting ducts', 'collecting duct', 'dilated duct', 'dilated tubul', 'cystic dilat'], ['Lined by flattened cells', 'flatten', 'cuboidal', 'lined by'], ['Longitudinal cysts cortex→medulla', 'longitudinal', 'elongated', 'cortex to medulla', 'radial', 'perpendicular']] },
    { q: 'จงให้การวินิจฉัย', a: 'ARPKD', k: [DX.arpkd] },
  ],
  x: 'อยู่ในรายการ virtual slide — กรอบสีเขียวคือ cysts ยาวเรียงจาก cortex ลง medulla และลูกศรชี้ collecting ducts ที่ขยาย บุด้วยเซลล์แบน' },
{ id: 'L-12', t: 'arpkd', src: 'lec', ref: 'Lecture หน้า 12', kind: 'Micro', im: ['L11', 'L12'], stem: 'ไตทารก: A = low power, B = high power',
  p: [
    { q: 'Cyst บุด้วยเซลล์ลักษณะใด', a: 'Single layer of flattened to cuboidal epithelium (collecting duct)', k: [['Flattened/cuboidal epithelium', 'flatten', 'cuboidal', 'single layer', 'simple']] },
    { q: 'จงให้การวินิจฉัย', a: 'ARPKD', k: [DX.arpkd] },
  ],
  x: 'ช่องว่างยาวจำนวนมากบุด้วย epithelium ชั้นเดียว (cuboidal–flattened) ไม่มี atypia — เป็น collecting duct ที่ขยาย' },

/* ---------------- Lecture: vascular & tubular ---------------- */
{ id: 'L-13', t: 'atn', src: 'lec', ref: 'Lecture หน้า 13', kind: 'Gross', im: ['L13'],
  p: [
    { q: 'จงบรรยายพยาธิสภาพ', a: 'Pale (swollen) cortex, congested dark medulla', n: 2, k: [['Pale cortex', 'pale'], ['Medullary congestion', 'congest', 'dark medulla', 'red medulla', 'hyperemi']] },
    { q: 'จงให้การวินิจฉัย', a: 'Shock kidney (acute tubular necrosis)', k: [DX.atn] },
  ],
  x: 'Cortex ซีดจาก coagulative necrosis ของท่อไต ส่วน medulla แดงคล้ำจาก congestion — ภาพคลาสสิกของ shock kidney' },
{ id: 'L-14', t: 'atn', src: 'lec', ref: 'Lecture หน้า 14 · virtual slide', kind: 'Micro', im: ['L14'],
  p: [
    { q: 'จงบรรยายพยาธิสภาพ', a: 'Necrosis of tubular epithelial cells (loss of nuclei, sloughing), tubular casts, glomeruli intact', n: 2,
      k: [['Tubular epithelial necrosis', 'necrosis', 'necrotic', 'loss of nucle', 'anucleate', 'denuded', 'slough', 'desquamat'], ['Tubular casts/debris', 'cast', 'debris'], ['Glomeruli spared', 'glomeruli normal', 'normal glomerul', 'intact glomerul', 'glomeruli intact', 'spared']] },
    { q: 'จงให้การวินิจฉัย', a: 'Acute tubular necrosis', k: [DX.atn] },
    { q: 'สาเหตุ 2 กลุ่ม', a: 'Ischemic, nephrotoxic', n: 2, k: [['Ischemic', 'ischemi', 'ischaemi', 'shock', 'hypotension', 'hypoperfusion', 'sepsis'], ['Nephrotoxic', 'nephrotoxi', 'toxic', 'toxin', 'aminoglycoside', 'contrast', 'drug', 'myoglobin', 'heavy metal']] },
  ],
  x: 'Tubules เป็นสีชมพูเข้ม ไม่มี nuclei มี cast/debris แต่ glomeruli 4 อันในภาพยังปกติ — virtual slide ตัวนี้อยู่ในรายการ' },
{ id: 'L-15', t: 'infarct', src: 'lec', ref: 'Lecture หน้า 15', kind: 'Gross', im: ['L15'],
  p: [
    { q: 'จงบรรยายพยาธิสภาพ', a: 'Wedge-shaped pale (white) area, base at cortical surface, apex toward medulla, sharply demarcated', n: 3,
      k: [['Wedge shape', 'wedge', 'triangular', 'รูปลิ่ม'], ['Pale/white', 'pale', 'white', 'yellow'], ['Base at cortical surface', 'base', 'cortical surface', 'subcapsular', 'apex'], ['Sharply demarcated', 'sharp', 'demarcat', 'well defined', 'well circumscribed']] },
    { q: 'จงให้การวินิจฉัย', a: 'Renal infarction', k: [DX.inf] },
    { q: 'สาเหตุ 2 อย่าง', a: 'Emboli (mural thrombus in MI, vegetative endocarditis, aortic aneurysm, atherosclerosis), thrombosis, vasculitis (PAN)', n: 2,
      k: [['Emboli', 'embol', 'mural thromb', 'endocarditis', 'vegetation', 'atrial fibrillation'], ['Thrombosis', 'thrombosis', 'thrombus'], ['Vasculitis (PAN)', 'vasculitis', 'PAN', 'polyarteritis'], ['Atherosclerosis / aortic aneurysm', 'atheroscl', 'aortic aneurysm', 'atheroma']] },
  ],
  x: 'Infarct รูปลิ่มสีซีด ฐานอยู่ที่ผิว cortex ปลายชี้เข้า medulla ขอบเขตชัด — ไตเป็น end-arterial organ จึงเป็น white infarct' },
{ id: 'L-16', t: 'infarct', src: 'lec', ref: 'Lecture หน้า 16', kind: 'Museum', im: ['L16'],
  p: [
    { q: 'จงให้การวินิจฉัย', a: 'Renal infarction (white infarct)', k: [DX.inf] },
    { q: 'Infarct ชนิดใด (สี)', a: 'White (pale, anemic) infarct', k: [['White (anemic)', 'white', 'pale', 'anemic', 'anaemic']] },
    { q: 'Necrosis ชนิดใด', a: 'Coagulative necrosis', k: [['Coagulative necrosis', 'coagulative']] },
  ],
  x: 'บริเวณสีซีดรูปลิ่มหลายจุดที่ขอบไต ขอบเขตชัด = white infarction · ทุก solid organ ที่ขาดเลือดยกเว้นสมอง = coagulative necrosis' },
{ id: 'L-17', t: 'infarct', src: 'lec', ref: 'Lecture หน้า 17', kind: 'Micro (special stain)', im: ['L17'], stem: 'ชิ้นเนื้อไตจากผู้ป่วย atrial fibrillation (ภาพสไลด์ต่อจาก renal infarction)',
  p: [
    { q: 'Necrosis ชนิดใด', a: 'Coagulative necrosis', k: [['Coagulative necrosis', 'coagulative']] },
    { q: 'ลักษณะที่ใช้บอก', a: 'Ghost outlines of tubules and glomeruli are preserved but nuclei are lost', k: [['Ghost outline, loss of nuclei', 'ghost', 'loss of nucle', 'no nucle', 'anucleate', 'outline', 'architecture preserved', 'preserved architecture']] },
    { q: 'จงให้การวินิจฉัย', a: 'Renal infarction', k: [DX.inf] },
  ],
  x: 'โครงร่างท่อไตและ glomerulus ยังอยู่ (basement membrane ติดสีดำ) แต่ไม่มี nuclei = coagulative necrosis — AF ทำให้เกิด thromboembolism ไปไต' },
{ id: 'P-6', t: 'bns', src: 'pred', ref: 'คาดการณ์ (Contents: benign nephrosclerosis)', kind: 'Micro', im: ['X63-08b'], stem: 'ผู้ป่วยความดันโลหิตสูงมานาน 20 ปี',
  p: [
    { q: 'รอยโรคของหลอดเลือดในภาพคืออะไร', a: 'Hyaline arteriolosclerosis', k: [['Hyaline arteriolosclerosis', 'hyaline arteriolosclerosis', 'hyalin', 'arteriolosclerosis']] },
    { q: 'ผิวไตจะเห็นลักษณะใด', a: 'Small kidney with finely granular surface', k: [['Fine granular surface', 'granular']] },
    { q: 'โรคไตที่เกิดคือ', a: 'Benign nephrosclerosis', k: [['Benign nephrosclerosis', 'nephrosclerosis', 'arterionephrosclerosis']] },
  ],
  x: 'ผนัง arteriole หนาเป็นเนื้อ homogeneous pink lumen แคบ = hyaline arteriolosclerosis (HTN, DM, aging) → ischemia → ไตเล็ก ผิว fine granular' },

/* ---------------- Lecture: obstruction & infection ---------------- */
{ id: 'L-18', t: 'hydro', src: 'lec', ref: 'Lecture หน้า 18', kind: 'Gross', im: ['L18'],
  p: [
    { q: 'จงบรรยายพยาธิสภาพ', a: 'Dilated renal pelvis and calyces, thin atrophic cortex', n: 2, k: [['Dilated pelvis/calyces', 'dilat', 'pelvicalyceal', 'calyc'], ['Thin cortex', 'thin', 'atroph', 'paper']] },
    { q: 'จงให้การวินิจฉัย', a: 'Hydronephrosis', k: [DX.hydro] },
    { q: 'สาเหตุ 2 อย่าง', a: 'Stone, tumor (BPH, stricture, UPJ obstruction)', n: 2, k: [['Stone', 'stone', 'calcul', 'นิ่ว'], ['Tumor', 'tumor', 'tumour', 'carcinoma', 'cancer', 'mass', 'neoplasm'], ['BPH', 'BPH', 'prostat'], ['Stricture', 'stricture'], ['UPJ obstruction', 'UPJ', 'ureteropelvic'], ['Pregnancy', 'pregnan']] },
  ],
  x: 'Obstruction ทำให้ปัสสาวะคั่ง pelvis/calyces ขยาย กดเนื้อไตจนฝ่อบาง · สาเหตุใน Lecture: stone และ tumor' },
{ id: 'L-19b', t: 'hydro', src: 'lec', ref: 'Lecture หน้า 19', kind: 'Gross', im: ['L19b'],
  p: [
    { q: 'จงบรรยายพยาธิสภาพ', a: 'Markedly dilated pelvicalyceal system with paper-thin renal parenchyma', n: 2, k: [['Dilated pelvicalyceal system', 'dilat', 'pelvicalyceal', 'calyc', 'pelvis'], ['Paper-thin parenchyma', 'thin', 'atroph', 'paper']] },
    { q: 'จงให้การวินิจฉัย', a: 'Hydronephrosis', k: [DX.hydro] },
  ],
  x: 'ระยะท้าย เนื้อไตเหลือเป็นผนังบางล้อมถุงน้ำหลายช่องที่เชื่อมกับ pelvis — แยกจาก polycystic kidney ได้เพราะช่องทุกช่องต่อกับ pelvis' },
{ id: 'L-20a', t: 'hydro', src: 'lec', ref: 'Lecture หน้า 20', kind: 'Museum', im: ['L20a'], am: ['L20a-a'],
  p: [
    { q: 'รอยโรคที่เห็น (2 อย่าง)', a: 'Hydronephrosis with renal stone (calculus)', n: 2, k: [['Hydronephrosis', 'hydronephrosis', 'ไตบวมน้ำ'], ['Renal stone', 'stone', 'calcul', 'นิ่ว']] },
    { q: 'กลไกที่ทำให้เกิด', a: 'Obstruction of urine outflow by the stone', k: [['Obstruction', 'obstruct', 'อุดตัน', 'อุดกั้น']] },
  ],
  x: 'ก้อนสีดำคือนิ่วอุดที่ pelvis ทำให้ calyces ขยายเป็นถุง · ฉลาก museum เดิมเขียนว่า "Hydronephrosis with renal stone"' },
{ id: 'L-20b', t: 'hydro', src: 'lec', ref: 'Lecture หน้า 20', kind: 'Gross', im: ['L20b'],
  p: [
    { q: 'จงให้การวินิจฉัย', a: 'Hydronephrosis with renal stone', n: 2, k: [['Hydronephrosis', 'hydronephrosis', 'ไตบวมน้ำ'], ['Renal stone', 'stone', 'calcul', 'นิ่ว']] },
    { q: 'นิ่วที่พบบ่อยที่สุดคือชนิดใด', a: 'Calcium oxalate (± calcium phosphate)', k: [['Calcium oxalate', 'calcium oxalate', 'calcium']] },
  ],
  x: 'นิ่วสีเทาดำอุด pelvis + calyces ขยายใสเป็นถุง · นิ่วที่พบบ่อยที่สุดคือ calcium oxalate (~70–80%)' },
{ id: 'L-21', t: 'cpn', src: 'lec', ref: 'Lecture หน้า 21 · virtual slide', kind: 'Micro', im: ['L21'],
  p: [
    { q: 'จงบรรยายพยาธิสภาพ', a: 'Sclerotic glomeruli, dense interstitial chronic inflammation (lymphocytes), interstitial fibrosis, tubular atrophy', n: 2,
      k: [['Sclerotic glomeruli', 'sclerotic glomerul', 'glomerulosclerosis', 'sclerosis', 'hyalinized glomerul'], ['Chronic interstitial inflammation', 'lymphocyte', 'lymphoid', 'chronic inflam', 'mononuclear', 'plasma cell'], ['Interstitial fibrosis', 'fibrosis'], ['Tubular atrophy', 'atrophy', 'thyroidization']] },
    { q: 'จงให้การวินิจฉัย', a: 'Chronic pyelonephritis', k: [DX.cpn] },
  ],
  x: 'วงกลมชมพูเนียน 3 วง = glomeruli ที่ sclerosis ทั้งหมด ล้อมด้วย lymphocytes หนาแน่นและ fibrosis' },
{ id: 'L-22', t: 'cpn', src: 'lec', ref: 'Lecture หน้า 22', kind: 'Micro', im: ['L22'],
  p: [
    { q: 'การเปลี่ยนแปลงของท่อไตที่เห็นเรียกว่าอะไร', a: 'Thyroidization', k: [['Thyroidization', 'thyroidization', 'thyroidisation', 'thyroid like', 'thyroid-like']] },
    { q: 'ใน lumen ของท่อไตมีอะไร', a: 'Eosinophilic colloid (hyaline) casts', k: [['Colloid casts', 'colloid', 'hyaline cast', 'eosinophilic cast', 'protein cast', 'cast']] },
    { q: 'จงให้การวินิจฉัย', a: 'Chronic pyelonephritis', k: [DX.cpn] },
  ],
  x: 'ท่อไตขยายผนังบาง เต็มไปด้วย pink colloid cast เหมือน thyroid follicle = thyroidization — คำนี้ออกทั้งปี 2563 และ NU23' },
{ id: 'L-24', t: 'staghorn', src: 'lec', ref: 'Lecture หน้า 24', kind: 'Museum', im: ['L24'],
  p: [
    { q: 'จงให้การวินิจฉัย', a: 'Staghorn (struvite) stone', k: [['Staghorn stone', 'staghorn', 'stag horn', 'struvite']] },
    { q: 'ส่วนประกอบของนิ่ว', a: 'Magnesium ammonium phosphate', k: [['Magnesium ammonium phosphate', 'magnesium ammonium phosphate', 'struvite', 'triple phosphate']] },
    { q: 'เชื้อที่เกี่ยวข้อง 2 ชนิด', a: 'Urease producers: Proteus, Pseudomonas, Klebsiella, Staphylococcus', n: 2, k: [['Proteus', 'proteus'], ['Pseudomonas', 'pseudomonas'], ['Klebsiella', 'klebsiella'], ['Staphylococcus', 'staphylococ', 'staph']] },
  ],
  x: 'นิ่วสีน้ำตาลแตกแขนงอุด pelvis และ calyces หลายอัน · เชื้อที่สร้าง urease เปลี่ยน urea → ammonia → ปัสสาวะด่าง → struvite' },
{ id: 'L-25', t: 'xgp', src: 'lec', ref: 'Lecture หน้า 25', kind: 'Museum', im: ['L25'],
  p: [
    { q: 'จงบรรยายพยาธิสภาพ', a: 'Yellow material deposited around the pelvicalyceal system', n: 2, k: [['Yellow material', 'yellow'], ['Around pelvicalyceal system', 'pelvicalyceal', 'calyc', 'pelvis', 'pelvic']] },
    { q: 'จงให้การวินิจฉัย', a: 'Xanthogranulomatous pyelonephritis', k: [DX.xgp] },
    { q: 'ภาวะที่มักพบร่วม', a: 'Nephrolithiasis (staghorn stone) / chronic infection', k: [['Stone / infection', 'stone', 'nephrolithiasis', 'calcul', 'staghorn', 'infection', 'proteus']] },
  ],
  x: 'สารสีเหลืองรอบ calyces = กลุ่ม foamy macrophages · เป็นผลเรื้อรังจากนิ่วร่วมกับการติดเชื้อ' },
{ id: 'L-26', t: 'xgp', src: 'lec', ref: 'Lecture หน้า 26–27', kind: 'Micro', im: ['L26', 'L27'], stem: 'A = low power, B = high power',
  p: [
    { q: 'จงบรรยายพยาธิสภาพ', a: 'Sheets of foamy (lipid-laden) macrophages with lymphocytes/plasma cells replacing renal parenchyma', n: 2,
      k: [['Foamy macrophages', 'foamy', 'foam cell', 'lipid laden', 'xanthoma', 'histiocyte'], ['Lymphocytes/plasma cells', 'lymphocyte', 'plasma cell', 'chronic inflam', 'mononuclear']] },
    { q: 'จงให้การวินิจฉัย', a: 'Xanthogranulomatous pyelonephritis', k: [DX.xgp] },
    { q: 'ต้องแยกจากมะเร็งชนิดใด', a: 'Clear cell renal cell carcinoma', k: [['Clear cell RCC', 'clear cell', 'renal cell carcinoma', 'RCC']] },
  ],
  x: 'เซลล์ cytoplasm ฟองใสจำนวนมาก (foamy histiocytes) ปนกับ lymphocytes · gross สีเหลืองและเซลล์ใส ๆ ทำให้ถูกเข้าใจผิดเป็น clear cell RCC' },

/* ---------------- Lecture: glomerular ---------------- */
{ id: 'L-29', t: 'dm', src: 'lec', ref: 'Lecture หน้า 29 · virtual slide', kind: 'Micro', im: ['L29'], am: ['L29-a'],
  p: [
    { q: 'จงบรรยายพยาธิสภาพ', a: 'Nodular mesangial expansion (Kimmelstiel-Wilson nodule), hyaline arteriolosclerosis, thickened GBM and tubular basement membranes (peritubular sclerosis)', n: 2,
      k: [['KW nodule / mesangial matrix ↑', 'kimmelstiel', 'nodule', 'nodular', 'mesangial matrix', 'mesangial expansion', 'mesangial sclerosis'], ['Hyaline arteriolosclerosis', 'hyalin', 'arteriolosclerosis'], ['Basement membrane thickening', 'basement membrane', 'GBM thick', 'TBM', 'peritubular sclerosis', 'thickened']] },
    { q: 'จงให้การวินิจฉัย', a: 'Diabetic nephropathy', k: [DX.dm] },
  ],
  x: 'Glomerulus ตรงกลางมี nodule ของ mesangial matrix · ลูกศรใน Lecture ชี้ tubular basement membrane ที่หนา (peritubular sclerosis)' },
{ id: 'L-30', t: 'dm', src: 'lec', ref: 'Lecture หน้า 30', kind: 'Micro', im: ['L30'], stem: 'ผู้ป่วยเบาหวาน 15 ปี มี proteinuria',
  p: [
    { q: 'รอยโรคใน glomerulus ชื่ออะไร', a: 'Kimmelstiel-Wilson nodule (nodular glomerulosclerosis)', k: [['Kimmelstiel-Wilson nodule', 'kimmelstiel', 'KW nodule', 'nodular glomerulosclerosis', 'nodular sclerosis']] },
    { q: 'รอยโรคของ arteriole', a: 'Hyaline arteriolosclerosis (afferent & efferent)', k: [['Hyaline arteriolosclerosis', 'hyalin', 'arteriolosclerosis']] },
    { q: 'จงให้การวินิจฉัย', a: 'Diabetic nephropathy', k: [DX.dm] },
  ],
  x: 'Nodule ชมพูไม่มีเซลล์ในกลาง lobule ของ glomerulus = KW nodule · hyalinosis ของ efferent arteriole ค่อนข้างจำเพาะต่อ DM' },
{ id: 'L-32', t: 'mn', src: 'lec', ref: 'Lecture หน้า 32–33', kind: 'Special stain', im: ['L32', 'L33'], stem: 'Silver (Jones) stain ของ glomerulus ในผู้ใหญ่ที่มี nephrotic syndrome',
  p: [
    { q: 'ลักษณะเด่นของ GBM ที่เห็น', a: 'GBM thickening with spikes (and holes)', k: [['Spikes', 'spike', 'holes', 'hole']] },
    { q: 'จงให้การวินิจฉัย', a: 'Membranous nephropathy', k: [DX.mn] },
    { q: 'EM จะพบ deposit ตำแหน่งใด', a: 'Subepithelial deposits', k: [['Subepithelial', 'subepithelial', 'sub epithelial']] },
  ],
  x: 'GBM (สีดำ) หนาขึ้นและมี spikes ยื่นออกด้าน epithelium แทรกระหว่าง deposits · มองหน้าตรงเห็นเป็น holes' },
{ id: 'L-34', t: 'mn', src: 'lec', ref: 'Lecture หน้า 34', kind: 'Special stain', im: ['L34'], stem: 'PAS stain, ผู้ป่วย nephrotic syndrome อายุ 50 ปี',
  p: [
    { q: 'จงบรรยายพยาธิสภาพ', a: 'Diffuse uniform thickening of glomerular capillary walls without hypercellularity', n: 1, k: [['Thickened capillary walls (GBM)', 'thick', 'GBM thick', 'capillary wall thick', 'basement membrane thick']] },
    { q: 'จงให้การวินิจฉัย', a: 'Membranous nephropathy', k: [DX.mn] },
    { q: 'Primary form มี autoantibody ต่ออะไร', a: 'PLA2R (phospholipase A2 receptor)', k: [['PLA2R', 'pla2r', 'pla 2 r', 'phospholipase']] },
  ],
  x: 'Capillary loops หนาทั่วกันเหมือนกันหมด ไม่มีเซลล์เพิ่ม — ในผู้ใหญ่ nephrotic = นึกถึง membranous ก่อน · primary ~75% มี anti-PLA2R' },
{ id: 'L-35', t: 'mn', src: 'lec', ref: 'Lecture หน้า 35', kind: 'Immunofluorescence', im: ['L35'], stem: 'Immunofluorescence ย้อม IgG',
  p: [
    { q: 'Pattern ที่เห็น', a: 'Granular capillary wall staining', k: [['Granular', 'granular']] },
    { q: 'จงให้การวินิจฉัย', a: 'Membranous nephropathy', k: [DX.mn] },
    { q: 'กลุ่มอาการทางคลินิก', a: 'Nephrotic syndrome', k: [['Nephrotic syndrome', 'nephrotic']] },
  ],
  x: 'IgG ติดเป็นเม็ดละเอียดเรียงตาม capillary wall ทุก loop (granular) — เทียบกับ Goodpasture ที่เป็นเส้นเรียบ (linear)' },
{ id: 'L-37', t: 'cgn', src: 'lec', ref: 'Lecture หน้า 37–38', kind: 'Special stain', im: ['L37', 'L38'], stem: 'ผู้ป่วยมี creatinine เพิ่มจาก 1.0 เป็น 6.0 mg/dL ใน 4 สัปดาห์ (A = low power, B = high power)',
  p: [
    { q: 'รอยโรคใน Bowman space (ภาพ B) คืออะไร', a: 'Crescent — proliferation of parietal epithelial cells and macrophages', k: [['Crescent', 'crescent']] },
    { q: 'จงให้การวินิจฉัย', a: 'Crescentic glomerulonephritis', k: [DX.cgn] },
    { q: 'กลุ่มอาการทางคลินิก', a: 'Rapidly progressive glomerulonephritis (RPGN)', k: [['RPGN', 'RPGN', 'rapidly progressive']] },
  ],
  x: 'เซลล์จำนวนมากเต็ม Bowman space รูปพระจันทร์เสี้ยว กด tuft และ GBM (สีดำ) ขาด = crescent · ไตเสื่อมเร็วในสัปดาห์ = RPGN' },
{ id: 'L-38', t: 'cgn', src: 'lec', ref: 'Lecture หน้า 36–38', kind: 'Special stain', im: ['L38'],
  p: [
    { q: 'จงบรรยายพยาธิสภาพ', a: 'Crescent: proliferation of parietal epithelial cells and macrophages (with fibrin) in Bowman space compressing the tuft; GBM rupture', n: 2,
      k: [['Crescent', 'crescent'], ['Parietal epithelial proliferation', 'parietal', 'epithelial', 'proliferat'], ['Macrophages/monocytes', 'macrophage', 'monocyte'], ['Bowman space', 'bowman'], ['GBM rupture / fibrin', 'rupture', 'break', 'fibrin']] },
    { q: 'สาเหตุ 3 กลุ่มใหญ่', a: 'Immune complex, anti-GBM (Goodpasture), pauci-immune (ANCA)', n: 3,
      k: [['Immune complex', 'immune complex', 'lupus', 'IgA', 'post infectious', 'postinfectious'], ['Anti-GBM', 'anti GBM', 'antiGBM', 'goodpasture'], ['Pauci-immune (ANCA)', 'pauci', 'ANCA']] },
  ],
  x: '3 กลุ่ม = 3 IF patterns: immune complex (granular), anti-GBM (linear), pauci-immune (negative)' },
{ id: 'L-39', t: 'cgn', src: 'pred', ref: 'Lecture หน้า 39', kind: 'Immunofluorescence', im: ['L39ic', 'L39pi', 'L39gbm'], stem: 'Immunofluorescence ของ crescentic GN 3 ราย (A, B, C)',
  p: [
    { q: 'ภาพ A: pattern และกลุ่มสาเหตุ', a: 'Granular — immune complex', n: 2, k: [['Granular', 'granular'], ['Immune complex', 'immune complex']] },
    { q: 'ภาพ B: pattern และกลุ่มสาเหตุ', a: 'Negative/scant — pauci-immune (ANCA)', n: 2, k: [['Negative/scant', 'negative', 'scant', 'no staining', 'little', 'minimal', 'pauci'], ['Pauci-immune', 'pauci', 'ANCA']] },
    { q: 'ภาพ C: pattern และโรค', a: 'Linear — anti-GBM (Goodpasture)', n: 2, k: [['Linear', 'linear'], ['Anti-GBM', 'anti GBM', 'antiGBM', 'goodpasture']] },
  ],
  x: 'สถานีบูรณาการที่น่าออก: เอา 3 ภาพจากสไลด์เดียวกันมาให้จับคู่ — A ก้อน ๆ ไม่เรียบ, B มืดเกือบหมด, C เส้นเรียบตาม GBM' },
{ id: 'L-39c', t: 'cgn', src: 'lec', ref: 'Lecture หน้า 39', kind: 'Immunofluorescence', im: ['L39gbm'], stem: 'ชายอายุ 25 ปี ไอเป็นเลือด ร่วมกับ RPGN',
  p: [
    { q: 'Pattern ที่เห็น', a: 'Linear IgG along GBM', k: [['Linear', 'linear']] },
    { q: 'จงให้การวินิจฉัย', a: 'Goodpasture syndrome (anti-GBM disease)', k: [DX.goodp] },
    { q: 'Antigen เป้าหมาย', a: 'Type IV collagen (α3 chain, NC1 domain)', k: [['Type IV collagen', 'type iv collagen', 'collagen iv', 'collagen type iv', 'type 4 collagen', 'alpha 3', 'alpha3']] },
  ],
  x: 'Lung hemorrhage + RPGN + linear IgG = Goodpasture · antibody จับ α3 chain ของ type IV collagen ซึ่งพบทั้งใน GBM และ alveolar BM' },
{ id: 'L-39b', t: 'cgn', src: 'lec', ref: 'Lecture หน้า 39', kind: 'Immunofluorescence', im: ['L39pi'], stem: 'Crescentic GN, serum c-ANCA (PR3) positive',
  p: [
    { q: 'IF pattern', a: 'Negative / scanty (pauci-immune)', k: [['Pauci-immune (negative)', 'negative', 'scant', 'pauci', 'no staining', 'minimal']] },
    { q: 'โรคในกลุ่มนี้ 2 โรค', a: 'GPA (Wegener), MPA, EGPA (Churg-Strauss)', n: 2, k: [['GPA', 'GPA', 'granulomatosis with polyangiitis', 'wegener'], ['MPA', 'MPA', 'microscopic polyangiitis'], ['EGPA', 'EGPA', 'churg', 'eosinophilic granulomatosis']] },
  ],
  x: 'Pauci-immune = แทบไม่มี immune deposit · สัมพันธ์กับ ANCA: GPA (c-ANCA/PR3), MPA และ EGPA (p-ANCA/MPO)' },

/* ---------------- Lecture: bladder ---------------- */
{ id: 'L-40', t: 'mala', src: 'lec', ref: 'Lecture หน้า 40', kind: 'Gross', im: ['L40'], stem: 'หญิง 45 ปี ปลูกถ่ายไต มี UTI ซ้ำหลายครั้ง',
  p: [
    { q: 'จงบรรยายพยาธิสภาพ', a: 'Multiple soft white-yellow plaques on the bladder mucosa', n: 2, k: [['Plaques', 'plaque', 'nodule'], ['White-yellow', 'yellow', 'white']] },
    { q: 'จงให้การวินิจฉัย', a: 'Malakoplakia', k: [DX.mala] },
    { q: 'เชื้อที่เกี่ยวข้อง', a: 'E. coli and other gram-negative bacilli', k: [['E. coli / gram-negative bacilli', 'e coli', 'escherichia', 'gram negative']] },
  ],
  x: 'Plaques นุ่มสีเหลืองขาวกระจายบน mucosa · malakoplakia = "soft plaque" ในภาษากรีก' },
{ id: 'L-41', t: 'mala', src: 'lec', ref: 'Lecture หน้า 41', kind: 'Micro', im: ['L41'], stem: 'ลูกศรสีแดง',
  p: [
    { q: 'ลูกศรชี้อะไร', a: 'Michaelis-Gutmann body', k: [['Michaelis-Gutmann body', 'michaelis', 'gutmann', 'MG body']] },
    { q: 'อยู่ในเซลล์ชนิดใด', a: 'Histiocyte (von Hansemann cell)', k: [['Histiocyte / macrophage', 'histiocyte', 'macrophage', 'hansemann']] },
    { q: 'จงให้การวินิจฉัย', a: 'Malakoplakia', k: [DX.mala] },
  ],
  x: 'Inclusion กลมสีม่วงเข้มซ้อนชั้นใน histiocyte ที่ cytoplasm เป็นเม็ดชมพู = Michaelis-Gutmann body' },
{ id: 'L-42', t: 'mala', src: 'lec', ref: 'Lecture หน้า 42', kind: 'Special stain', im: ['L42a', 'L42b'], stem: 'A = H&E, B = special stain',
  p: [
    { q: 'ภาพ B ย้อมด้วย special stain อะไร', a: 'Von Kossa stain', k: [['Von Kossa', 'kossa', 'von kossa']] },
    { q: 'ย้อมติดสารใด', a: 'Calcium', k: [['Calcium', 'calcium', 'แคลเซียม']] },
    { q: 'จงให้การวินิจฉัย', a: 'Malakoplakia', k: [DX.mala] },
  ],
  x: 'MG bodies เป็น laminated calcium deposit จึงติด Von Kossa เป็นสีดำ (ติด PAS และ iron stain ได้ด้วย)' },
{ id: 'L-43', t: 'meta', src: 'lec', ref: 'Lecture หน้า 43', kind: 'Micro', im: ['L43'],
  p: [
    { q: 'กลุ่มเซลล์ urothelium ใน lamina propria เรียกว่าอะไร', a: 'von Brunn nests', k: [['von Brunn nests', 'brunn']] },
    { q: 'เป็นรอยโรคประเภทใด', a: 'Reactive (benign) process from chronic irritation — mimics invasive carcinoma', k: [['Reactive / benign', 'reactive', 'benign', 'metaplas', 'mimic']] },
  ],
  x: 'Nests ขอบเรียบกลม เซลล์ไม่มี atypia อยู่ระดับเดียวกันใน lamina propria → reactive ไม่ใช่ invasive carcinoma' },
{ id: 'L-44a', t: 'meta', src: 'lec', ref: 'Lecture หน้า 44', kind: 'Micro', im: ['L44a'],
  p: [
    { q: 'จงบรรยายพยาธิสภาพ', a: 'von Brunn nest with glandular lumens lined by cuboidal/columnar cells', n: 1, k: [['Glands lined by cuboidal/columnar cells', 'gland', 'cuboidal', 'columnar'], ['von Brunn nest', 'brunn', 'nest']] },
    { q: 'จงให้การวินิจฉัย', a: 'Cystitis glandularis', k: [['Cystitis glandularis', 'cystitis glandularis', 'glandularis']] },
  ],
  x: 'เซลล์ใน nest เปลี่ยนเป็น cuboidal/columnar ล้อม lumen ต่อม = cystitis glandularis' },
{ id: 'L-44b', t: 'meta', src: 'lec', ref: 'Lecture หน้า 44 · virtual slide', kind: 'Micro', im: ['L44b'],
  p: [
    { q: 'จงบรรยายพยาธิสภาพ', a: 'Cystic spaces lined by flattened urothelium, filled with eosinophilic fluid', n: 2, k: [['Cystic spaces', 'cyst', 'cystic'], ['Lined by flattened urothelium', 'flatten', 'urotheli', 'lined'], ['Eosinophilic fluid', 'eosinophilic', 'pink', 'fluid', 'proteinaceous']] },
    { q: 'จงให้การวินิจฉัย', a: 'Cystitis cystica', k: [['Cystitis cystica', 'cystitis cystica', 'cystica']] },
  ],
  x: 'Virtual slide ในรายการคือ "florid von Brunn nest with cystitis cystica" — ช่อง cyst ใหญ่มี pink fluid บุด้วย urothelium แบน' },

/* ---------------- Lecture: tumors ---------------- */
{ id: 'L-45', t: 'aml', src: 'lec', ref: 'Lecture หน้า 45', kind: 'Gross', im: ['L45'],
  p: [
    { q: 'จงบรรยายพยาธิสภาพ', a: 'Circumscribed, unencapsulated yellow-tan mass with pushing border', n: 2, k: [['Yellow-tan', 'yellow', 'tan'], ['Circumscribed', 'circumscribed', 'well defined', 'well demarcated'], ['Unencapsulated / pushing border', 'unencapsulated', 'no capsule', 'non encapsulated', 'pushing']] },
    { q: 'จงให้การวินิจฉัย', a: 'Angiomyolipoma', k: [DX.aml] },
    { q: 'Syndrome ที่สัมพันธ์', a: 'Tuberous sclerosis', k: [['Tuberous sclerosis', 'tuberous', 'TSC']] },
  ],
  x: 'ก้อนสีเหลืองจาก fat ขอบชัดแต่ไม่มี capsule · ถ้าหลายก้อนทั้งสองข้าง นึกถึง tuberous sclerosis' },
{ id: 'L-46', t: 'aml', src: 'lec', ref: 'Lecture หน้า 46–49 · virtual slide', kind: 'Micro', im: ['L46', 'L47', 'L48'], stem: 'สามภาพจากก้อนเดียวกันในไต',
  p: [
    { q: 'ส่วนประกอบในภาพ A, B, C', a: 'A: thick-walled blood vessels · B: mature adipose tissue · C: myoid spindle (smooth muscle) cells', n: 3,
      k: [['A: thick-walled vessels', 'vessel', 'vascular', 'thick wall', 'thick walled'], ['B: mature fat', 'fat', 'fatty', 'adipose', 'adipocyte', 'lipo'], ['C: smooth muscle/spindle', 'smooth muscle', 'spindle', 'myoid', 'muscle']] },
    { q: 'จงให้การวินิจฉัย', a: 'Angiomyolipoma', k: [DX.aml] },
  ],
  x: '3 components = angio + myo + lipo · IHC: HMB-45 positive (PEComa)' },
{ id: 'L-50', t: 'rcc', src: 'lec', ref: 'Lecture หน้า 50', kind: 'Gross', im: ['L50'], stem: 'ชาย 60 ปี สูบบุหรี่ มีปัสสาวะเป็นเลือด',
  p: [
    { q: 'จงให้การวินิจฉัย', a: 'Renal cell carcinoma (clear cell type)', k: [DX.rcc] },
    { q: 'Risk factors 2 อย่าง', a: 'Cigarette smoking, ESRD/CKD (obesity, hypertension)', n: 2, k: [DX.smoke, ['ESRD/CKD', 'ESRD', 'CKD', 'chronic kidney', 'dialysis', 'acquired cystic'], ['Obesity', 'obesity', 'obese'], ['Hypertension', 'hypertension', 'HTN'], ['VHL', 'VHL', 'von hippel']] },
    { q: 'Hereditary syndrome ที่สัมพันธ์', a: 'Von Hippel-Lindau (VHL) syndrome', k: [['Von Hippel-Lindau', 'von hippel', 'hippel', 'VHL']] },
  ],
  x: 'ก้อนสีเหลือง มี necrosis/hemorrhage ที่ขั้วล่างของไต · VHL gene อยู่บน chromosome 3p' },
{ id: 'L-51', t: 'rcc', src: 'lec', ref: 'Lecture หน้า 51', kind: 'Gross', im: ['L51'],
  p: [
    { q: 'จงบรรยายพยาธิสภาพ', a: 'Large variegated golden-yellow mass with hemorrhage and necrosis', n: 3, k: [['Golden yellow', 'yellow', 'golden', 'orange'], ['Hemorrhage', 'hemorrhag', 'haemorrhag', 'bleed'], ['Necrosis', 'necros'], ['Variegated / circumscribed mass', 'variegat', 'circumscribed', 'mass']] },
    { q: 'จงให้การวินิจฉัย', a: 'Renal cell carcinoma, clear cell type', k: [DX.rcc] },
  ],
  x: 'หน้าตัดสีเหลืองทองสลับแดงน้ำตาล (variegated) = clear cell RCC (lipid + hemorrhage + necrosis)' },
{ id: 'L-52', t: 'rcc', src: 'lec', ref: 'Lecture หน้า 52 · virtual slide', kind: 'Micro', im: ['L52'],
  p: [
    { q: 'จงบรรยายพยาธิสภาพ', a: 'Nests/solid sheets of polygonal cells with abundant clear cytoplasm, delicate branching vessels', n: 2,
      k: [['Clear cytoplasm', 'clear'], ['Nested/solid/tubular growth', 'nest', 'solid', 'tubular', 'alveolar', 'sheet'], ['Delicate branching vessels', 'vessel', 'vascular', 'capillar', 'vasculature']] },
    { q: 'จงให้การวินิจฉัย', a: 'Clear cell renal cell carcinoma', k: [DX.ccrcc] },
    { q: 'Cytoplasm ใสเพราะมีสารอะไร', a: 'Glycogen and lipid', n: 1, k: [['Glycogen', 'glycogen'], ['Lipid', 'lipid', 'fat']] },
  ],
  x: 'เซลล์ cytoplasm ใสเรียงเป็น nests แบ่งด้วยเส้นเลือดฝอยละเอียด ("chicken-wire") — glycogen + lipid ละลายระหว่างทำสไลด์' },
{ id: 'L-53', t: 'wilms', src: 'lec', ref: 'Lecture หน้า 53', kind: 'Gross', im: ['L53'], stem: 'เด็กอายุ 3 ปี คลำได้ก้อนในท้อง',
  p: [
    { q: 'จงบรรยายพยาธิสภาพ', a: 'Large solitary circumscribed homogeneous tan-gray mass (± hemorrhage, necrosis)', n: 2, k: [['Large solitary circumscribed', 'solitary', 'circumscribed', 'large', 'well defined'], ['Homogeneous tan-gray', 'tan', 'gray', 'grey', 'fish', 'homogen'], ['Hemorrhage/necrosis', 'hemorrhag', 'necros']] },
    { q: 'จงให้การวินิจฉัย', a: 'Wilms tumor (nephroblastoma)', k: [DX.wilms] },
  ],
  x: 'เด็ก + ก้อนใหญ่ก้อนเดียวขอบชัด สี tan-gray ในไต = Wilms tumor' },
{ id: 'L-54', t: 'wilms', src: 'lec', ref: 'Lecture หน้า 54', kind: 'Gross', im: ['L54'],
  p: [
    { q: 'จงให้การวินิจฉัย', a: 'Wilms tumor', k: [DX.wilms] },
    { q: 'กลุ่มอายุที่พบบ่อย', a: 'เด็ก 2–5 ปี', k: [['Children (2–5 y)', 'child', 'pediatric', 'paediatric', 'เด็ก', 'infant', '2-5', '3']] },
    { q: 'Syndrome ที่สัมพันธ์ 1 อย่าง', a: 'WAGR, Denys-Drash, Beckwith-Wiedemann', n: 1, k: [['WAGR', 'WAGR', 'aniridia'], ['Denys-Drash', 'denys', 'drash'], ['Beckwith-Wiedemann', 'beckwith', 'wiedemann']] },
  ],
  x: 'ก้อนใหญ่สี tan เบียดเนื้อไตที่เหลือเป็นแถบบาง (ซ้ายล่าง) · syndromes: WAGR/Denys-Drash (WT1), Beckwith-Wiedemann (WT2)' },
{ id: 'L-55', t: 'wilms', src: 'lec', ref: 'Lecture หน้า 55–56 · virtual slide', kind: 'Micro', im: ['L55'], stem: 'ก้อนในไตของเด็กอายุ 4 ปี',
  p: [
    { q: 'ส่วนประกอบ 3 อย่าง', a: 'Blastema (small blue round cells), epithelial (tubules/glands), stroma (spindle cells)', n: 3,
      k: [['Blastema', 'blastem', 'small blue round', 'small round blue'], ['Epithelial (tubules)', 'epitheli', 'gland', 'tubul'], ['Stroma (spindle)', 'strom', 'spindle']] },
    { q: 'จงให้การวินิจฉัย', a: 'Wilms tumor (nephroblastoma)', k: [DX.wilms] },
  ],
  x: 'Triphasic: แผ่นเซลล์เล็กสีน้ำเงิน (blastema) + tubules (epithelial) + แถบ spindle cells สีชมพู (stroma) — อย่าลืมคำว่า triphasic' },
{ id: 'L-57', t: 'uc', src: 'lec', ref: 'Lecture หน้า 57', kind: 'Gross', im: ['L57'],
  p: [
    { q: 'จงบรรยายพยาธิสภาพ', a: 'Infiltrative gray mass in the renal pelvis with hydronephrosis', n: 2, k: [['Mass in renal pelvis', 'pelvis', 'pelvic'], ['Hydronephrosis', 'hydronephrosis', 'dilated calyc']] },
    { q: 'จงให้การวินิจฉัย', a: 'Urothelial (transitional cell) carcinoma of renal pelvis', k: [DX.uc] },
    { q: 'Risk factors 2 อย่าง', a: 'Smoking, aniline dye', n: 2, k: [DX.smoke, ['Aniline dye', 'aniline', 'aromatic amine', 'dye'], ['Cyclophosphamide', 'cyclophosphamide'], ['Phenacetin', 'phenacetin', 'analgesic']] },
  ],
  x: 'ก้อนเทาเนื้อแน่นใน renal pelvis อุดทางออก ทำให้ calyces ขยาย — urothelium บุตั้งแต่ calyx ถึง urethra จึงเกิด UC ได้ทุกตำแหน่ง' },
{ id: 'L-58', t: 'uc', src: 'lec', ref: 'Lecture หน้า 58', kind: 'Gross', im: ['L58'],
  p: [
    { q: 'จงบรรยายพยาธิสภาพ', a: 'Papillary (cauliflower-like) tan mass filling the renal pelvis', n: 2, k: [['Papillary/exophytic', 'papillary', 'exophytic', 'cauliflower', 'friable'], ['Renal pelvis', 'pelvis', 'calyc', 'calyx']] },
    { q: 'จงให้การวินิจฉัย', a: 'Urothelial carcinoma of renal pelvis', k: [DX.uc] },
  ],
  x: 'ก้อน papillary เป็นติ่งเล็ก ๆ จำนวนมากเต็ม renal pelvis แยกจาก RCC ที่เกิดจากเนื้อ cortex และมีสีเหลือง' },
{ id: 'L-60', t: 'uc', src: 'lec', ref: 'Lecture หน้า 60', kind: 'Gross', im: ['L60'], stem: 'ชาย 65 ปี ทำงานโรงงานย้อมสี ปัสสาวะเป็นเลือดไม่เจ็บ',
  p: [
    { q: 'จงบรรยายพยาธิสภาพ', a: 'Irregular papillary grey-tan mass of urinary bladder with focal hemorrhage', n: 2, k: [['Papillary/exophytic mass', 'papillary', 'exophytic', 'mass'], ['Hemorrhage', 'hemorrhag', 'haemorrhag', 'bleed'], ['Bladder', 'bladder']] },
    { q: 'จงให้การวินิจฉัย', a: 'Urothelial carcinoma of urinary bladder', k: [DX.uc] },
    { q: 'Risk factor จากอาชีพ', a: 'Aniline dye (aromatic amines)', k: [['Aniline dye', 'aniline', 'aromatic amine', 'naphthylamine', 'dye']] },
  ],
  x: 'Painless hematuria + โรงงานสีย้อม = aniline dye → urothelial carcinoma' },
{ id: 'L-61', t: 'uc', src: 'lec', ref: 'Lecture หน้า 61', kind: 'Museum', im: ['L61'],
  p: [
    { q: 'จงบรรยายพยาธิสภาพ', a: 'Exophytic/papillary tan mass in the ureter with proximal dilatation (hydroureter, hydronephrosis)', n: 2, k: [['Papillary mass in ureter', 'papillary', 'exophytic', 'mass', 'ureter'], ['Hydronephrosis/hydroureter', 'hydronephrosis', 'hydroureter', 'dilat', 'obstruct']] },
    { q: 'จงให้การวินิจฉัย', a: 'Urothelial carcinoma of ureter', k: [DX.uc] },
  ],
  x: 'ก้อนใน ureter อุดทางเดิน ทำให้ ureter ส่วนต้นและ pelvis/calyces ขยาย (hydronephrosis)' },
{ id: 'L-62', t: 'uc', src: 'lec', ref: 'Lecture หน้า 62–64 · virtual slide', kind: 'Micro', im: ['L62', 'L63'], stem: 'A = low power, B = high power จากก้อนในกระเพาะปัสสาวะ',
  p: [
    { q: 'จงบรรยายพยาธิสภาพ', a: 'Complex papillary architecture with fibrovascular cores; urothelium shows nuclear atypia and increased mitoses', n: 2,
      k: [['Complex papillae (fibrovascular cores)', 'papillary', 'papillae', 'fibrovascular'], ['Nuclear atypia', 'atypi', 'pleomorph', 'hyperchromat'], ['Increased mitoses', 'mitos', 'mitotic']] },
    { q: 'จงให้การวินิจฉัย', a: 'Papillary urothelial carcinoma', k: [DX.uc] },
    { q: 'สิ่งที่ต้องดูเพื่อบอกว่าเป็น invasive', a: 'Invasion into lamina propria / muscularis propria (detrusor)', k: [['Invasion into lamina propria/muscularis propria', 'lamina propria', 'muscularis', 'detrusor', 'muscle', 'stroma', 'invasion']] },
  ],
  x: 'Virtual slide มี 2 แบบ: non-invasive papillary และ invasive — invasive ต้องเห็นเซลล์มะเร็งทะลุ basement membrane ลง lamina propria/muscularis propria' },

/* ---------------- คาดการณ์: สถานีบูรณาการ ---------------- */
{ id: 'P-1', t: 'arpkd', src: 'pred', ref: 'คาดการณ์ (เปรียบเทียบ ADPKD vs ARPKD)', kind: 'Gross', im: ['L06a', 'L08'],
  p: [
    { q: 'ภาพ A วินิจฉัย', a: 'ADPKD', k: [DX.adpkd] },
    { q: 'ภาพ B วินิจฉัย', a: 'ARPKD', k: [DX.arpkd] },
    { q: 'ข้อแตกต่างของผิวไต/รูปแบบ cyst', a: 'A: irregular bosselated surface, variable large cysts · B: smooth surface, small uniform radially arranged cysts', n: 1, k: [['Smooth vs irregular', 'smooth', 'irregular', 'bosselated', 'lumpy', 'radial', 'perpendicular', 'size']] },
  ],
  x: 'ADPKD: ผู้ใหญ่ cyst ใหญ่เล็กไม่เท่ากัน ผิวขรุขระ · ARPKD: ทารก ผิวเรียบ cyst เล็กเรียงตามแนวรัศมี' },
{ id: 'P-2', t: 'xgp', src: 'pred', ref: 'คาดการณ์ (great mimicker)', kind: 'Micro', im: ['L52', 'L27'],
  p: [
    { q: 'ภาพ A วินิจฉัย', a: 'Clear cell renal cell carcinoma', k: [DX.ccrcc] },
    { q: 'ภาพ B วินิจฉัย', a: 'Xanthogranulomatous pyelonephritis (foamy macrophages)', k: [DX.xgp] },
    { q: 'เซลล์ใสใน B คือเซลล์อะไร', a: 'Foamy (lipid-laden) macrophages', k: [['Foamy macrophages', 'foamy', 'macrophage', 'histiocyte', 'foam cell']] },
  ],
  x: 'A: เซลล์ใสเรียงเป็น nests มีเส้นเลือดละเอียดคั่น (epithelial tumor) · B: foamy histiocytes ปน lymphocytes ไม่มีรูปแบบ nest (inflammation)' },
{ id: 'P-3', t: 'staghorn', src: 'pred', ref: 'คาดการณ์ (บูรณาการ patho + urinalysis)', kind: 'Gross + Urine', im: ['L24', 'U69a'],
  p: [
    { q: 'ภาพ A คืออะไร', a: 'Staghorn (struvite) stone', k: [['Staghorn stone', 'staghorn', 'struvite']] },
    { q: 'ภาพ B (ตะกอนปัสสาวะผู้ป่วยรายเดียวกัน) คือ crystal อะไร', a: 'Triple phosphate', k: [['Triple phosphate', 'triple phosphate', 'struvite', 'magnesium ammonium phosphate']] },
    { q: 'pH ของปัสสาวะ', a: 'Alkaline', k: [['Alkaline', 'alkal', 'basic', 'ด่าง']] },
  ],
  x: 'Urease-producing bacteria (Proteus) → ammonia → ปัสสาวะด่าง → triple phosphate crystal และนิ่ว struvite' },
{ id: 'P-4', t: 'aml', src: 'pred', ref: 'คาดการณ์ (AML + tuberous sclerosis)', kind: 'Gross + Micro', im: ['L45', 'L46'], stem: 'ผู้ป่วยมีชักและ facial angiofibroma ตรวจพบก้อนในไตทั้งสองข้าง',
  p: [
    { q: 'จงให้การวินิจฉัย', a: 'Angiomyolipoma', k: [DX.aml] },
    { q: 'Syndrome', a: 'Tuberous sclerosis complex', k: [['Tuberous sclerosis', 'tuberous', 'TSC']] },
    { q: 'ภาวะแทรกซ้อนเฉียบพลันที่อันตรายของก้อนนี้', a: 'Spontaneous (retroperitoneal) hemorrhage', k: [['Hemorrhage', 'hemorrhag', 'haemorrhag', 'bleed', 'rupture', 'wunderlich']] },
  ],
  x: 'Seizure + angiofibroma + bilateral renal AML = tuberous sclerosis · thick-walled dysmorphic vessels เปราะ → แตกเลือดออกได้เอง' },
{ id: 'P-5', t: 'bns', src: 'pred', ref: 'คาดการณ์ (BNS vs CPN)', kind: 'Gross + Micro', im: ['X63-08a', 'L22'],
  p: [
    { q: 'ภาพ A (ไตเล็ก ผิว fine granular สองข้างเท่ากัน) วินิจฉัย', a: 'Benign nephrosclerosis', k: [['Benign nephrosclerosis', 'nephrosclerosis']] },
    { q: 'ภาพ B วินิจฉัย', a: 'Chronic pyelonephritis', k: [DX.cpn] },
    { q: 'Gross ของโรคในภาพ B ต่างจาก A อย่างไร', a: 'B: irregular asymmetric coarse corticomedullary scars over deformed (blunted) calyces', k: [['Irregular asymmetric scars over blunted calyces', 'asymmetric', 'irregular', 'coarse', 'scar', 'blunt', 'calyc']] },
  ],
  x: 'ไตฝ่อทั้งสองโรค: BNS = สมมาตร fine granular (ปัญหาหลอดเลือด) · CPN = แผลเป็นใหญ่ไม่สมมาตร calyx ผิดรูป (ปัญหาจาก pelvis)' },

];

/* ======================================================================
 * PAPERS — ข้อสอบเก่า
 * ==================================================================== */
const PAPERS = [
  {
    id: 'y63', title: 'ข้อสอบ LAB 499316 ระบบขับถ่ายปัสสาวะ 2 ปีการศึกษา 2563', by: 'MED24 ST16',
    summary: 'Pathology 10 สถานี + Urine analysis 5 สถานี (15 สถานี)',
    items: [
      { no: '1', st: 'X63-1' }, { no: '2', st: 'X63-2', note: 'ภาพจริงเป็น virtual slide ตัวเดียวกับข้อสอบ NU23 ข้อ 8' },
      { no: '3', st: 'X63-3' }, { no: '4', st: 'X63-4', note: 'ภาพจริงเป็น virtual slide ตัวเดียวกับข้อสอบ NU23 ข้อ 6' },
      { no: '5', st: 'X63-5' }, { no: '6', st: 'X63-6' }, { no: '7', st: 'X63-7' }, { no: '8', st: 'X63-8' },
      { no: '9', st: 'X63-9' }, { no: '10', st: 'X63-10' },
      { no: '11', st: 'X63-11', sec: 'Urine analysis' }, { no: '12', st: 'X63-12' }, { no: '13', st: 'X63-13' },
      { no: '14', st: 'X63-14', note: 'ข้อสอบจริงถามแค่ "What is it?" — ข้อย่อยที่ 2 เพิ่มเพื่อฝึก' },
      { no: '15', st: 'X63-15', note: 'ข้อสอบจริงถามแค่ "What is it?" — ข้อย่อยที่ 2 เพิ่มเพื่อฝึก' },
    ],
  },
  {
    id: 'n23', title: 'Lab KUB2 MED NU 23 & NT 15', by: 'MED NU23 · NT15',
    summary: 'ข้อที่จำได้จากรุ่นพี่ (ไม่ครบทุกข้อ) — ภาพบางข้อใช้ภาพจาก Lecture หรือภาพวาดจำลองแทน',
    items: [
      { no: '1', st: 'N23-1', note: 'ใช้ภาพ museum ADPKD จาก Lecture หน้า 7' },
      { no: '2', st: 'N23-2', note: 'ใช้ภาพ museum hydronephrosis จาก Lecture หน้า 19' },
      { no: '6', st: 'X63-4' }, { no: '8', st: 'X63-2', note: 'เฉลยรุ่นพี่: tubular atrophy, thyroidization, sclerotic glomeruli, interstitial edema' },
      { no: '9', st: 'N23-9', note: 'เฉลยเดิมเขียน "Focal segmental glomerulonephritis" — ชื่อที่ถูกคือ glomerulosclerosis' },
      { no: '11', st: 'N23-11', sec: 'Urine analysis', note: 'เอกสารไม่มีภาพ — ภาพ A ใช้ squamous cell จาก Lecture LAB Urine ภาพ B ใช้ granular cast จากข้อสอบปี 2563' },
      { no: '12', st: 'N23-12', note: 'เอกสารไม่มีภาพ — ใช้ภาพจาก Lecture LAB Urine หน้า 69 และ 67' },
      { no: '14', st: 'X63-11' },
      { no: '15', st: 'N23-15', note: 'ภาพจาก Lecture LAB Urine หน้า 46 · เฉลยรุ่นพี่: เจอ cell นี้ในโรค nephrotic syndrome; urobilinogen สูงพบใน hepatocellular damage ด้วย' },
      { no: '–', st: 'X63-10', note: 'ข้อ Goodpasture (ไม่ระบุเลขข้อ) ภาพ IF linear เหมือนปี 2563' },
    ],
  },
];

window.KUB = { GROUPS, TOPICS, STATIONS, PAPERS, DX };
})();
