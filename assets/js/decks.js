/* ------------------------------------------------------------------
 * decks.js — เนื้อหาการ์ดทั้งหมด
 * สร้างจากสไลด์บรรยาย "Coronary artery disease"
 * Pongpun Jittham M.D., Division of Medicine, Faculty of Medicine,
 * Naresuan University.
 *
 * รูปแบบการ์ด
 *   { q, a }                     -> การ์ดถาม–ตอบปกติ
 *   { cloze: "... {{c1::x}} ..." } -> การ์ดเติมคำ
 *   note                          -> คำอธิบายเพิ่มเติม (แสดงใต้คำตอบ)
 *   src                           -> อ้างอิงหน้าสไลด์
 * ------------------------------------------------------------------ */

const DECKS = [
  {
    id: 'basics',
    name: 'พื้นฐาน & พยาธิกำเนิด',
    emoji: '🫀',
    desc: 'นิยาม CAD, สาเหตุ, atherosclerosis และกายวิภาคหลอดเลือดหัวใจ',
    cards: [
      {
        q: 'Coronary artery disease (CAD) แบ่งออกเป็นกลุ่มอาการใหญ่ ๆ กี่กลุ่ม อะไรบ้าง?',
        a: '<b>2 กลุ่ม</b><ol><li><b>Chronic / stable</b> — stable CAD, stable ischemic heart disease (SIHD), chronic coronary syndrome (CCS), chronic stable angina</li><li><b>Acute coronary syndrome (ACS)</b> — Unstable angina / NSTEMI และ STEMI</li></ol>',
        src: 'slide 2'
      },
      {
        q: 'สาเหตุของ CAD ที่พบบ่อยที่สุดคืออะไร?',
        a: '<b>Atherosclerosis</b>',
        note: 'CAD ไม่จำเป็นต้องเกิดจากขบวนการ atherosclerosis เสมอไป',
        src: 'slide 3'
      },
      {
        q: 'สาเหตุของ CAD ที่<u>ไม่ใช่</u> atherosclerosis มีอะไรบ้าง?',
        a: '<ul><li><b>Vasculitis</b> (large vessel) — Takayasu arteritis, Kawasaki disease</li><li><b>Dissection</b></li><li><b>Emboli</b></li><li><b>Trauma</b></li><li><b>Congenital</b> (ความผิดปกติแต่กำเนิด)</li></ul>',
        src: 'slide 3'
      },
      {
        cloze: 'Vasculitis ที่ทำให้เกิด CAD ในเด็กคือ {{c1::Kawasaki disease}} ส่วนที่พบในผู้ใหญ่คือ {{c1::Takayasu arteritis}}',
        src: 'slide 3'
      },
      {
        q: 'รอยโรคเริ่มต้น (initial lesion) ของ atherosclerosis คืออะไร?',
        a: 'การสะสมของ<b>ไขมันภายในชั้น intima</b> (fatty sequestration) แล้วเกิด <b>oxidative modification</b> ของไขมันนั้น',
        note: 'ตามด้วยการกระตุ้น local inflammatory response',
        src: 'slide 9'
      },
      {
        q: 'หลังเกิด oxidative modification ของไขมันในชั้น intima เซลล์เม็ดเลือดขาวชนิดใดถูกดึงเข้ามาเป็นด่านแรก และผ่านกลไกใด?',
        a: '<b>Monocytes</b> ถูก recruit เข้าสู่รอยโรคที่กำลังก่อตัว โดยอาศัยการเพิ่มการแสดงออกของ <b>adhesion molecules</b> ต่าง ๆ บน endothelium',
        src: 'slide 9–10'
      },
      {
        q: 'Atherosclerosis ดำเนินโรคอย่างไรในแง่ของอาการ?',
        a: 'เริ่มจากระยะ <b>asymptomatic</b> (สะสมมานานหลายปีโดยไม่มีอาการ) แล้วจึงกลายเป็น <b>symptomatic</b> เมื่อรอยโรคตีบมากพอ หรือเมื่อเกิด plaque rupture',
        src: 'slide 12'
      },
      {
        q: 'หลอดเลือดหัวใจหลัก (main epicardial vessels) มีกี่เส้น อะไรบ้าง?',
        a: '<b>3 เส้นหลัก</b> (+ left main)<ul><li><b>LAD</b> — left anterior descending</li><li><b>LCx</b> — left circumflex</li><li><b>RCA</b> — right coronary artery</li></ul>',
        src: 'slide 14'
      },
      {
        q: 'จงบอกแขนงสำคัญของหลอดเลือดหัวใจแต่ละเส้น',
        a: '<ul><li><b>LAD</b> → Diagonal (DG)</li><li><b>LCx</b> → Obtuse marginal (OM)</li><li><b>RCA</b> → RV branch, PDA (posterior descending), PL (posterolateral)</li></ul>',
        src: 'slide 14'
      },
      {
        q: 'ในผู้ป่วย ACS ของไทย (TRACS registry) กลุ่มใดมีอัตราตายสูงที่สุด?',
        a: '<b>STEMI</b> มีอัตราตายสูงที่สุด ทั้งขณะอยู่โรงพยาบาล ที่ 6 เดือน และที่ 12 เดือน รองลงมาคือ NSTEMI และต่ำที่สุดคือ unstable angina',
        note: 'Suphot Srimahachota, et al. Thai Registry in Acute Coronary Syndrome (TRACS). J Med Assoc Thai 2012;95(4):508-18.',
        src: 'slide 4'
      }
    ]
  },

  {
    id: 'ccs',
    name: 'Chronic Coronary Syndrome',
    emoji: '📉',
    desc: 'CCS / SIHD — นิยาม, angina pectoris, การวินิจฉัย และการรักษา',
    cards: [
      {
        q: 'นิยามของ Chronic coronary syndrome (CCS) คืออะไร?',
        a: 'ภาวะที่มี <b>episodes of reversible myocardial demand/supply mismatch</b> ซึ่งสัมพันธ์กับ ischaemia หรือ hypoxia ของกล้ามเนื้อหัวใจ',
        src: 'slide 16'
      },
      {
        cloze: 'การตีบที่ถือว่ามีนัยสำคัญใน CCS คือ ตีบ ≥ {{c1::50}}% ที่ left main และ ≥ {{c1::70}}% ในหลอดเลือดหัวใจหลักอย่างน้อย 1 เส้น',
        src: 'slide 16'
      },
      {
        q: 'ลักษณะการกระตุ้นให้เกิดอาการใน CCS เป็นอย่างไร?',
        a: 'ถูกกระตุ้นด้วย <b>stress</b> (ออกกำลังกาย, อารมณ์, อื่น ๆ) และ<b>เกิดซ้ำได้เหมือนเดิม (reproducible)</b> แต่บางครั้งอาจเกิดขึ้นเองได้ (spontaneous)',
        src: 'slide 16'
      },
      {
        cloze: 'CCS มีอัตราตายต่ำ ประมาณ {{c1::1.2–2.4}}% ต่อปี',
        src: 'slide 16'
      },
      {
        q: 'Angina pectoris คืออะไร?',
        a: 'อาการ<b>ปวดหรือไม่สบายบริเวณหน้าอกหรือบริเวณใกล้เคียง</b> ซึ่งเกิดจากเลือดไปเลี้ยงกล้ามเนื้อหัวใจไม่เพียงพอ',
        note: 'ไม่ใช่อาการเจ็บหน้าอกทุกแบบจะเป็น angina pectoris',
        src: 'slide 18'
      },
      {
        q: 'จงบอกลักษณะของ angina pectoris ครบทั้ง 5 ข้อ (ตำแหน่ง / ลักษณะ / ระยะเวลา / สิ่งกระตุ้น / สิ่งที่ทำให้ดีขึ้น)',
        a: '<ul><li><b>Location:</b> ที่หน้าอก บริเวณใกล้ sternum</li><li><b>Character:</b> แน่น บีบ ๆ หนัก ๆ (pressure, tightness, heaviness)</li><li><b>Duration:</b> ตั้งแต่ไม่ถึงนาที จนถึง &lt; 10 นาที</li><li><b>Exacerbation:</b> ออกกำลังกาย, กิจกรรมจำเพาะ, ความเครียดทางอารมณ์</li><li><b>Relief:</b> หายไปเร็วภายในไม่กี่นาทีเมื่อหยุดสิ่งกระตุ้น หรือเมื่อได้ nitrate</li></ul>',
        src: 'slide 18'
      },
      {
        q: 'ในผู้ป่วย CCS การซักประวัติควรเน้นเรื่องอะไร?',
        a: '<ul><li>อาการ <b>chest pain</b> และ <b>dyspnea on exertion</b></li><li><b>Atherosclerotic risk factors</b> (เบาหวาน ความดัน ไขมัน บุหรี่ ประวัติครอบครัว)</li></ul>',
        src: 'slide 17'
      },
      {
        q: 'การตรวจร่างกายในผู้ป่วย CCS มักพบอะไร?',
        a: '<ul><li>ส่วนใหญ่<b>ปกติ (within normal limits)</b></li><li>ถ้ามีภาวะแทรกซ้อน: <b>cardiomegaly, CHF</b></li><li>หลักฐานสนับสนุน: <b>eruptive xanthoma, acanthosis nigricans</b></li></ul>',
        src: 'slide 17'
      },
      {
        q: 'Resting EKG 12 leads ในผู้ป่วย stable CAD ให้ผลอย่างไร?',
        a: '<b>ปกติได้มากกว่า 50%</b> ของผู้ป่วย — EKG ปกติจึงตัดโรคไม่ได้<br>แต่บางครั้งช่วยวินิจฉัยได้ เช่น <b>poor R wave progression</b>, <b>pathological Q wave</b>',
        src: 'slide 21'
      },
      {
        q: 'การตรวจเพิ่มเติมเพื่อยืนยันการวินิจฉัย CCS มีอะไรบ้าง?',
        a: '<ul><li><b>Resting EKG 12 leads</b></li><li><b>Stress test</b> เช่น EST (exercise stress test)</li><li><b>Stress imaging</b> เช่น cardiac MRI, stress echocardiography</li></ul>',
        src: 'slide 21'
      },
      {
        q: 'Pre-test probability ของ CCS ขึ้นกับปัจจัยใดบ้าง?',
        a: '<b>อายุ (age), เพศ (sex) และลักษณะอาการเจ็บหน้าอก (chest pain feature)</b><br>ในตาราง — สีเขียว = ต้องตรวจเพิ่มเพื่อวินิจฉัย, สีขาว = ตัดการวินิจฉัยออกไปได้',
        src: 'slide 23'
      },
      {
        q: 'หลักการรักษา CCS โดยรวมเป็นอย่างไร?',
        a: '<ul><li><b>ผู้ป่วย SCAD ทุกราย:</b> lifestyle modification + ยา (optimal medical therapy, OMT)</li><li><b>กลุ่มเสี่ยงสูง:</b> ทำ CAG และ revascularization ซึ่ง<b>ช่วยเพิ่มอัตรารอดชีวิต</b></li></ul>',
        src: 'slide 26'
      },
      {
        q: 'Lifestyle modification ใน CCS: การออกกำลังกายและการเลิกบุหรี่มีคำแนะนำอย่างไร?',
        a: '<ul><li><b>Physical activity:</b> แอโรบิกความหนักปานกลางสม่ำเสมอ &gt; 30 นาที, &gt; 3 วัน/สัปดาห์ (ในผู้ป่วย post-MI)</li><li><b>Smoking:</b> การเลิกบุหรี่ลดอัตราตายได้ถึง <b>36%</b></li></ul>',
        src: 'slide 27'
      },
      {
        q: 'Lifestyle modification ใน CCS: เป้าหมายของน้ำหนัก อาหาร ไขมัน ความดัน และเบาหวาน คืออะไร?',
        a: '<ul><li><b>BW:</b> ลดน้ำหนัก คุม BMI &lt; 25 kg/m²</li><li><b>Diet:</b> healthy diet / Mediterranean diet</li><li><b>Lipid:</b> ให้ statin เพื่อลด LDL</li><li><b>BP:</b> &lt; 140/90 mmHg</li><li><b>DM:</b> HbA1c &lt; 7.0% โดยทั่วไป</li></ul>',
        src: 'slide 27'
      },
      {
        q: 'นอกจากอาหารและการออกกำลังกาย CCS ยังแนะนำอะไรอีก 2 ข้อ?',
        a: '<ul><li><b>Psychosocial factor:</b> หลีกเลี่ยง/รักษาภาวะซึมเศร้า วิตกกังวล ความเครียด</li><li><b>วัคซีนไข้หวัดใหญ่ทุกปี</b> (annual influenza vaccination)</li></ul>',
        src: 'slide 27'
      },
      {
        q: 'ยาที่ใช้ใน CCS แบ่งเป็นกลุ่มใดบ้าง?',
        a: '<ul><li><b>Anti-platelet</b></li><li><b>Statin</b></li><li><b>Anti-anginal:</b> beta blocker, short acting nitrate, CCB</li><li><b>Second line:</b> ivabradine, trimetazidine, ranolazine</li></ul>',
        src: 'slide 28'
      },
      {
        cloze: 'ยา anti-anginal กลุ่ม second line ใน CCS ได้แก่ {{c1::ivabradine, trimetazidine และ ranolazine}}',
        src: 'slide 28'
      },
      {
        q: 'อะไรคือเกณฑ์ของ "successful therapy" ใน stable CAD?',
        a: '<ul><li>หมดอาการเจ็บหน้าอกจาก angina</li><li>กลับไปทำกิจวัตรได้ตามปกติ</li><li>functional capacity อยู่ที่ <b>CCS class I angina</b></li><li>ผู้ป่วยให้ความร่วมมือดี — ผลข้างเคียงน้อย และคุ้มค่า (cost-effective)</li></ul>',
        note: 'เป้าหมายต้องปรับตามลักษณะทางคลินิกและความต้องการของผู้ป่วยแต่ละราย',
        src: 'slide 30'
      }
    ]
  },

  {
    id: 'acs',
    name: 'ACS & STEMI',
    emoji: '🚨',
    desc: 'Plaque rupture, อาการ, การวินิจฉัย STEMI และการรักษาเฉียบพลัน',
    cards: [
      {
        q: 'กลไกหลักที่ทำให้เกิด acute coronary syndrome คืออะไร?',
        a: '<b>Plaque rupture</b> — คราบไขมันแตก ทำให้เกิดการสร้างลิ่มเลือด (thrombus) อุดหลอดเลือดหัวใจอย่างเฉียบพลัน',
        src: 'slide 32–35'
      },
      {
        q: 'อาการเจ็บหน้าอกแบบฉบับของ ACS เป็นอย่างไร?',
        a: 'อาการ<b>แน่นหน้าอกใต้กระดูก sternum แบบกระจาย (diffuse substernal chest pressure)</b> ที่<b>ค่อย ๆ เริ่ม</b> ร้าวไปที่<b>กราม (jaw) หรือแขน</b> แย่ลงเมื่อออกแรง และดีขึ้นเมื่อพักหรือได้ nitroglycerin',
        src: 'slide 36'
      },
      {
        q: 'เป้าหมายหลักของการตรวจร่างกายในผู้ป่วย ACS คืออะไร?',
        a: '<ol><li>หา<b>สาเหตุกระตุ้น (precipitating causes)</b> ของ myocardial ischemia</li><li>ประเมิน<b>ผลกระทบทางระบบไหลเวียนโลหิต (hemodynamic consequences)</b></li></ol>',
        src: 'slide 37'
      },
      {
        q: 'สิ่งตรวจพบทางกายภาพที่บ่งชี้ว่า ischemia เป็นบริเวณกว้างและมีความเสี่ยงสูง มีอะไรบ้าง?',
        a: '<ul><li>เหงื่อแตก (diaphoresis), ผิวซีดและเย็น</li><li><b>Sinus tachycardia</b></li><li><b>Third or fourth heart sound</b> (S3, S4)</li><li><b>Basilar rales</b></li><li><b>Hypotension</b></li></ul>',
        src: 'slide 37'
      },
      {
        q: 'การวินิจฉัย STEMI ใช้อะไรบ้าง และจำเป็นต้องรอ cardiac marker หรือไม่?',
        a: 'วินิจฉัยจาก<b>อาการทางคลินิก + ECG 12 leads</b><br><b>ไม่จำเป็นต้องใช้ cardiac marker</b> ในการวินิจฉัย (ไม่ควรรอผล เพราะทำให้การเปิดหลอดเลือดล่าช้า)',
        src: 'slide 39'
      },
      {
        q: 'อาการแสดงแบบ atypical ของ STEMI ที่ต้องนึกถึงมีอะไรบ้าง?',
        a: '<b>Syncope</b> และ <b>cardiac arrest</b> (นอกเหนือจากอาการเจ็บหน้าอกซึ่งพบบ่อยที่สุด)',
        src: 'slide 39'
      },
      {
        q: 'ลักษณะ ECG ที่ใช้วินิจฉัย ST elevation ACS คืออะไร?',
        a: '<b>ST elevation</b> ใน leads ที่สัมพันธ์กับตำแหน่งกล้ามเนื้อหัวใจขาดเลือด ร่วมกับ <b>reciprocal change</b> (ST depression ใน leads ตรงข้าม)',
        src: 'slide 42'
      },
      {
        q: 'Supportive treatment เบื้องต้นของ STEMI มีอะไรบ้าง?',
        a: '<ul><li>ให้ <b>oxygen เมื่อ SpO₂ &lt; 90%</b> เท่านั้น</li><li><b>Monitor ECG</b> ต่อเนื่อง</li></ul>',
        src: 'slide 45'
      },
      {
        q: 'การรักษา STEMI ด้วยยาประกอบด้วยอะไรบ้าง?',
        a: '<ul><li><b>Anti-platelet</b> (dual antiplatelet)</li><li><b>Anticoagulant</b></li><li><b>Anti-anginal:</b> nitrate, opioid</li></ul>',
        src: 'slide 45'
      },
      {
        q: 'Reperfusion therapy ใน STEMI มีกี่วิธี อะไรบ้าง?',
        a: '<b>2 วิธี</b><ol><li><b>Thrombolysis / fibrinolysis</b></li><li><b>Percutaneous coronary intervention (PCI)</b></li></ol>',
        src: 'slide 45'
      },
      {
        cloze: 'ใน ACS ต้องให้ยาต้านเกล็ดเลือดแบบ {{c1::dual antiplatelet (DAPT)}} คือ aspirin ร่วมกับยากลุ่ม {{c1::P2Y12 inhibitor}}',
        src: 'slide 46'
      },
      {
        q: 'ขนาด loading dose ของ aspirin ใน ACS คือเท่าไร และให้อย่างไร?',
        a: '<b>Aspirin 300 mg เคี้ยว</b> (chew)',
        src: 'slide 46'
      },
      {
        q: 'Loading dose ของ clopidogrel ใน STEMI แตกต่างกันอย่างไรตามวิธีเปิดหลอดเลือด?',
        a: '<ul><li>ผู้ป่วยที่จะไป <b>PCI: 8 เม็ด</b> (600 mg)</li><li>ผู้ป่วยที่ได้ <b>fibrinolysis: 4 เม็ด</b> (300 mg)</li><li>แต่ถ้า<b>อายุ &gt; 75 ปี</b> และได้ fibrinolysis: <b>1 เม็ด</b> (75 mg)</li></ul>',
        src: 'slide 46'
      },
      {
        q: 'Loading dose ของ ticagrelor คือเท่าไร?',
        a: '<b>2 เม็ด (ขนาด 90 mg) รับประทาน = 180 mg</b>',
        src: 'slide 46'
      },
      {
        q: 'Loading dose ของ prasugrel คือเท่าไร และมีข้อห้ามใช้อะไรบ้าง?',
        a: '<b>6 เม็ด (ขนาด 10 mg) รับประทาน = 60 mg</b><br><b>ข้อห้ามใช้:</b><ul><li>อายุ &gt; 75 ปี</li><li>น้ำหนักตัว &lt; 60 kg</li><li>มีประวัติ stroke / TIA</li></ul>',
        src: 'slide 46'
      },
      {
        q: 'Stent ที่ใช้ใน PCI มีกี่ชนิด อะไรบ้าง?',
        a: '<b>2 ชนิด</b><ul><li><b>DES</b> — drug eluting stent</li><li><b>BMS</b> — bare metal stent</li></ul>',
        src: 'slide 54'
      },
      {
        q: 'หลังทำ revascularization ใน STEMI ต้องดูแลอะไรต่อบ้าง?',
        a: '<ul><li><b>Echocardiogram</b> เพื่อประเมิน LVEF</li><li><b>Lifestyle modification</b></li><li><b>ยา</b> (medication)</li><li><b>Cardiac rehabilitation</b></li><li>พิจารณา <b>revascularization ของหลอดเลือดเส้นอื่น</b></li></ul>',
        src: 'slide 58'
      },
      {
        q: 'ยาที่ผู้ป่วยควรได้รับหลัง STEMI มีอะไรบ้าง?',
        a: '<ul><li><b>Antiplatelet:</b> DAPT (aspirin + P2Y12 inhibitor) นาน <b>6–12 เดือน</b></li><li><b>Statin</b></li><li><b>ACEI / ARB</b></li><li><b>Beta blocker</b></li><li><b>Anti-anginal</b> ถ้ายัง revascularize ไม่ครบทุกเส้น</li><li>ยาบรรเทาอาการ เช่น ยานอนหลับ (sedative), ยาระบายอุจจาระ (stool softener)</li></ul>',
        src: 'slide 59'
      }
    ]
  },

  {
    id: 'nste',
    name: 'NSTE-ACS / Unstable angina',
    emoji: '📊',
    desc: 'พยาธิสภาพ, ECG, cardiac marker, risk score และการรักษา',
    cards: [
      {
        q: 'NSTE-ACS / unstable angina มีพยาธิสภาพต่างจาก STEMI อย่างไร?',
        a: '<b>พยาธิสภาพเหมือนกับ STEMI</b> (plaque rupture + thrombus) แต่<b>หลอดเลือดไม่ได้อุดตันสมบูรณ์</b> (without complete vessel obstruction)',
        src: 'slide 64'
      },
      {
        q: 'การวินิจฉัย NSTE-ACS อาศัยอะไรบ้าง (3 ข้อ)?',
        a: '<ol><li><b>Clinical:</b> อาการเจ็บหน้าอกแบบ typical angina</li><li><b>ECG:</b> การเปลี่ยนแปลงที่เข้าได้กับ MI</li><li><b>Cardiac marker:</b> มีการ<b>ขึ้นและลง (rise and fall)</b> ของ cardiac marker</li></ol>',
        src: 'slide 64'
      },
      {
        q: 'ถ้าผู้ป่วยมีอาการและ ECG เข้าได้กับ ACS แต่ cardiac marker ให้ผลลบ จะวินิจฉัยว่าอะไร?',
        a: '<b>Unstable angina</b>',
        src: 'slide 66'
      },
      {
        cloze: 'ใน UA/NSTEMI การมี ST depression ขนาด {{c1::0.1}} mV สัมพันธ์กับอัตราการเสียชีวิตและ MI ที่ 1 ปี ประมาณ {{c1::11}}%',
        src: 'slide 65'
      },
      {
        q: 'ST depression ขนาด 0.2 mV บ่งชี้ความเสี่ยงมากน้อยเพียงใด?',
        a: 'เพิ่มความเสี่ยงต่อการเสียชีวิต<b>ประมาณ 6 เท่า</b> (six-fold increased mortality risk)',
        src: 'slide 65'
      },
      {
        q: 'ลักษณะ ECG ใดใน UA/NSTEMI บ่งชี้กลุ่มเสี่ยงที่สูงยิ่งขึ้นไปอีก?',
        a: '<b>ST depression ร่วมกับ transient ST elevation</b>',
        src: 'slide 65'
      },
      {
        q: 'Deep symmetrical T wave inversion ใน anterior chest leads บ่งชี้รอยโรคที่ตำแหน่งใด?',
        a: 'มักสัมพันธ์กับการตีบอย่างมีนัยสำคัญของ <b>proximal LAD</b> หรือ <b>left main stem</b>',
        src: 'slide 65'
      },
      {
        q: 'Risk score ที่ใช้ประเมินผู้ป่วย NSTE-ACS มีอะไรบ้าง?',
        a: '<ul><li><b>GRACE risk score</b></li><li><b>TIMI score</b></li></ul>',
        note: 'ใช้จัดชั้นความเสี่ยงเพื่อกำหนดจังหวะเวลาการทำ CAG',
        src: 'slide 67–70'
      },
      {
        q: 'การรักษา NSTE-ACS ประกอบด้วยอะไรบ้าง?',
        a: 'คล้ายกับ STEMI ได้แก่<ul><li><b>Dual anti-platelet</b></li><li><b>Anticoagulant</b></li><li><b>Statin</b></li><li><b>Beta blocker</b></li><li><b>ACEI / ARB</b></li><li><b>Anti-anginal</b></li><li><b>Risk stratification</b> เพื่อกำหนดจังหวะเวลาการทำ CAG</li></ul>',
        src: 'slide 71'
      },
      {
        q: 'สิ่งใดคือความแตกต่างสำคัญในการรักษา NSTE-ACS เทียบกับ STEMI?',
        a: 'NSTE-ACS <b>ไม่ให้ fibrinolysis</b> — การเปิดหลอดเลือดใช้ CAG/PCI โดยกำหนดจังหวะเวลาตาม<b>ระดับความเสี่ยง</b> (risk stratification) ไม่ใช่รีบเปิดทันทีทุกรายเหมือน STEMI',
        src: 'slide 71–72'
      }
    ]
  },

  {
    id: 'secondary',
    name: 'ยา & Secondary prevention',
    emoji: '💊',
    desc: 'รายละเอียดยาแต่ละกลุ่มและเป้าหมายการป้องกันทุติยภูมิหลัง ACS',
    cards: [
      {
        q: 'Nitrates ใน ACS ออกฤทธิ์อย่างไร และมีข้อควรระวังอะไร?',
        a: '<b>ออกฤทธิ์:</b> ขยายหลอดเลือด ช่วยลดอาการแน่นหน้าอก มีทั้งแบบสเปรย์พ่นเยื่อบุช่องปากและแบบอมใต้ลิ้น<br><b>ข้อควรระวัง:</b> อาจทำให้<b>ความดันโลหิตต่ำ</b> และห้ามใช้ในผู้ป่วยที่ใช้ยากลุ่ม <b>phosphodiesterase type 5 inhibitor</b>',
        src: 'slide 80'
      },
      {
        q: 'Beta-blockers ใน ACS ออกฤทธิ์อย่างไร และมีเป้าหมายอัตราการเต้นหัวใจเท่าไร?',
        a: 'ลด <b>BP</b> และลด <b>myocardial contractility</b> → ลดความต้องการออกซิเจนของกล้ามเนื้อหัวใจ<br><b>เป้าหมาย: อัตราการเต้นหัวใจ 50–60 ครั้ง/นาที</b>',
        src: 'slide 80'
      },
      {
        cloze: 'ผู้ป่วยหลัง ACS ควรได้รับ {{c1::high-intensity}} statin และลดระดับ LDL cholesterol ให้ต่ำกว่า {{c1::70}} mg/dL',
        src: 'slide 81'
      },
      {
        q: 'ผู้ป่วยหลัง ACS กลุ่มใดควรได้รับ ACEI/ARB และ mineralocorticoid receptor antagonist?',
        a: 'ผู้ป่วยที่มี <b>LV dysfunction (LVEF ≤ 40%)</b>',
        src: 'slide 81'
      },
      {
        q: 'การคุมความดันโลหิตในผู้ป่วยหลัง ACS: เลือกยากลุ่มใดก่อน และเป้าหมายเท่าไร?',
        a: 'เลือกยากลุ่ม <b>ACE inhibitor, ARB หรือ beta-blocker</b> ก่อน<br>เป้าหมาย: <b>ความดันโลหิต &lt; 130/80 mmHg</b>',
        src: 'slide 82'
      },
      {
        cloze: 'ผู้ป่วยเบาหวานหลัง ACS ควรคุมระดับน้ำตาลสะสม (A1C) ไม่เกินร้อยละ {{c1::7}}',
        src: 'slide 82'
      },
      {
        q: 'คำแนะนำเรื่องการปรับพฤติกรรมในการป้องกันทุติยภูมิหลัง ACS มีอะไรบ้าง?',
        a: '<ul><li>ออกกำลังกายสม่ำเสมออย่างน้อย <b>30 นาทีต่อครั้ง และ ≥ 3 ครั้งต่อสัปดาห์</b></li><li><b>ลดน้ำหนัก</b></li><li><b>หยุดสูบบุหรี่</b></li><li>ควบคุมปัจจัยเสี่ยงอื่น ๆ</li></ul>',
        src: 'slide 79'
      },
      {
        q: 'ระยะเวลาของ DAPT หลังเกิด ACS โดยทั่วไปนานเท่าไร?',
        a: '<b>6–12 เดือน</b> (aspirin ร่วมกับ P2Y12 inhibitor) จากนั้นจึงลดเหลือยาต้านเกล็ดเลือดตัวเดียวต่อไปตลอดชีวิต — ระยะเวลาปรับตามความเสี่ยงต่อการเกิดเลือดออกและความเสี่ยงต่อ ischemia',
        src: 'slide 59, 83'
      },
      {
        q: 'สรุปเสาหลักของยาในการป้องกันทุติยภูมิหลัง ACS (5 กลุ่ม)',
        a: '<ol><li><b>Antiplatelet</b> (DAPT แล้วตามด้วย single)</li><li><b>Statin</b> — high intensity, LDL &lt; 70</li><li><b>Beta-blocker</b> — HR 50–60</li><li><b>ACEI / ARB</b> (± MRA ถ้า LVEF ≤ 40%)</li><li><b>Nitrate</b> / anti-anginal สำหรับควบคุมอาการ</li></ol>',
        src: 'slide 80–83'
      }
    ]
  }
];
