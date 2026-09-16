/* ------------------------------------------------------------------
 * questions.js — คลังคำถามทั้งหมดสำหรับการทบทวนแบบ Active recall
 *
 * ชนิดคำถาม (t)
 *   qa    ถาม–ตอบปลายเปิด ผู้เรียนนึกคำตอบเอง แล้วเทียบกับ points (ประเด็นที่ต้องได้)
 *   fill  เติมคำ ตรวจอัตโนมัติจากรายการ accept (ตรวจแบบหลวม ไม่สนตัวพิมพ์/ช่องว่าง)
 *   mcq   ปรนัย ตรวจอัตโนมัติจาก correct (ดัชนีเริ่มที่ 0)
 *
 * ทุกข้อมี a = คำอธิบายฉบับเต็ม และ src = ที่มาในสไลด์
 * id ของคำถามสร้างจาก <topicId>-<ลำดับในหัวข้อ> โดย app.js
 * การแทรกข้อกลางหัวข้อจะทำให้ id เลื่อน — ถ้าอยากรักษาความคืบหน้าเดิม ให้เพิ่มต่อท้าย
 * ------------------------------------------------------------------ */

const TOPICS = [

/* ============ 1. ภาพรวม & พื้นฐานสรีรวิทยา ============ */
{
  id: 'basic',
  name: 'ภาพรวม & พื้นฐานสรีรวิทยา',
  slides: 'สไลด์ 1–5',
  qs: [
    { t:'qa', src:'สไลด์ 2',
      q:'โรคของระบบทางเดินหายใจที่เรียนในคอร์สนี้แบ่งเป็นกลุ่มใหญ่อะไรบ้าง ยกตัวอย่างแต่ละกลุ่ม',
      points:['Obstructive: Asthma, COPD','Allergic/Infective: Allergic rhinitis, Common cold','อื่น ๆ: Pulmonary hypertension, การติดเชื้อทางเดินหายใจ, วัณโรค, มะเร็งปอด'],
      a:'แบ่งเป็น 3 กลุ่ม คือ (1) โรคอุดกั้นทางเดินหายใจ — Asthma, COPD (2) กลุ่มภูมิแพ้/ติดเชื้อ — Allergic rhinitis, Common cold และ (3) กลุ่มอื่น ๆ เช่น Pulmonary hypertension, URTI/LRTI, วัณโรค และมะเร็งปอด' },

    { t:'qa', src:'สไลด์ 4',
      q:'ระบบประสาทอัตโนมัติควบคุมกล้ามเนื้อเรียบหลอดลมอย่างไร ทั้งฝั่ง parasympathetic และ sympathetic',
      points:['Parasympathetic: vagus nerve → ACh → M3 receptor → หลอดลมหดเกร็ง','Sympathetic: catecholamine → beta2 receptor → หลอดลมคลายตัว'],
      a:'Parasympathetic ส่งสัญญาณผ่าน vagus nerve หลั่ง acetylcholine ไปจับ M3 receptor ทำให้หลอดลม<b>หดเกร็ง</b> ส่วน sympathetic ใช้ catecholamine กระตุ้น beta2 receptor ทำให้หลอดลม<b>คลายตัว</b> ยาแทบทุกกลุ่มในคอร์สนี้คือการเอียงสมดุลสองฝั่งนี้' },

    { t:'fill', src:'สไลด์ 4', accept:['M3','M3 receptor','muscarinic 3'],
      q:'Parasympathetic ปล่อย acetylcholine ไปจับตัวรับชนิด ______ บนกล้ามเนื้อเรียบหลอดลม จึงเกิด bronchoconstriction',
      a:'ตัวรับ <b>M3</b> (muscarinic type 3) คือตัวการหลักที่ทำให้หลอดลมหด จึงเป็นเป้าของยากลุ่ม antimuscarinic (ipratropium, tiotropium)' },

    { t:'qa', src:'สไลด์ 4',
      q:'Autacoids คืออะไร และเกี่ยวข้องกับโรคทางเดินหายใจอย่างไร ยกตัวอย่าง 3 ชนิด',
      points:['สารที่ร่างกายสร้างเองและออกฤทธิ์เฉพาะที่','ทำให้เกิดการอักเสบและหลอดลมหดเกร็ง','Histamine, leukotrienes, prostaglandins'],
      a:'Autacoids คือสารที่ร่างกายสร้างขึ้นเองและออกฤทธิ์เฉพาะที่ ได้แก่ histamine, leukotrienes, prostaglandins เป็นตัวการสำคัญที่ทำให้เกิดการอักเสบและการหดเกร็งของหลอดลม จึงเป็นเป้าหมายของยาต้านการอักเสบทั้งหมด' },

    { t:'mcq', src:'สไลด์ 5', correct:2,
      q:'นิยามของ Obstructive respiratory disorder คือข้อใด',
      choices:['ปริมาตรปอดลดลงจากพังผืดในเนื้อปอด','ความดันในหลอดเลือดปอดสูงขึ้น','มีการอุดกั้นทางเดินหายใจร่วมกับแรงต้านการไหลของอากาศเพิ่มขึ้น','การแลกเปลี่ยนแก๊สที่ถุงลมบกพร่องโดยไม่มีการอุดกั้น'],
      a:'โรคอุดกั้นทางเดินหายใจ = มีการอุดกั้นทางเดินหายใจ + increased airflow resistance ตัวแทนหลักคือ Asthma และ COPD' }
  ]
},

/* ============ 2. Asthma — พยาธิสรีรวิทยา ============ */
{
  id: 'asthma',
  name: 'Asthma — พยาธิสรีรวิทยา',
  slides: 'สไลด์ 6–13',
  qs: [
    { t:'qa', src:'สไลด์ 6',
      q:'นิยามของ Asthma คืออะไร และการอุดกั้นทางเดินหายใจเกิดจากกลไกอะไรบ้าง (3 อย่าง)',
      points:['Bronchial hypersensitivity + inflammation','Spasm of bronchial muscle — กล้ามเนื้อเรียบหดเกร็ง','Edematous swelling — ผนังหลอดลมบวมน้ำ','Increased secretion — เสมหะ/มูกเพิ่มขึ้น'],
      a:'Asthma คือโรคปอดที่มี <b>bronchial hypersensitivity</b> (หลอดลมไวเกิน) ร่วมกับ <b>inflammation</b> ทำให้เกิดการอุดกั้นโดยเฉพาะช่วงกำเริบ กลไกการอุดกั้นเกิดจาก 3 อย่างพร้อมกัน คือ spasm ของกล้ามเนื้อเรียบ, edema ของผนังหลอดลม และ increased secretion' },

    { t:'qa', src:'สไลด์ 7',
      q:'ทำไมการรักษาหืดจึงต้องใช้ทั้งยาขยายหลอดลมและยาต้านการอักเสบควบคู่กัน',
      points:['หลอดลมของผู้ป่วยหืดมีทั้ง bronchoconstriction และ inflammation พร้อมกัน','Bronchodilator แก้กล้ามเนื้อหดเกร็ง','Anti-inflammatory แก้บวม/มูก/หลอดลมไวเกิน'],
      a:'เพราะหลอดลมผู้ป่วยหืดมีทั้งกล้ามเนื้อหนาตัว-หดเกร็ง (ต้องใช้ bronchodilator) และการอักเสบ บวม มูกเหนียว (ต้องใช้ anti-inflammatory) แก้อย่างเดียวจึงไม่พอ' },

    { t:'qa', src:'สไลด์ 8',
      q:'แยก Signs และ Symptoms ของหืดให้ได้อย่างละอย่างน้อย 3 ข้อ',
      points:['Signs: dyspnea, airflow limitation, hyperinflation','Symptoms: breathlessness, wheezing, chest tightness'],
      a:'<b>Signs</b> (ตรวจพบ): dyspnea, airflow limitation, hyperinflation (ปอดพองเกินเพราะอากาศเข้าง่ายแต่ออกยาก) · <b>Symptoms</b> (ผู้ป่วยรู้สึก): breathlessness, wheezing, chest tightness' },

    { t:'qa', src:'สไลด์ 9',
      q:'ปัจจัยเสี่ยงของหืดแบ่งเป็น endogenous และ environmental อย่างไร',
      points:['Endogenous: พันธุกรรม เชื้อชาติ หลอดลมไวเกินโดยกำเนิด','Environmental: สารก่อภูมิแพ้ในบ้าน/นอกบ้าน บุหรี่มือสอง การติดเชื้อ อาหาร ยา ความเครียด'],
      a:'<b>Endogenous</b>: พันธุกรรม, เชื้อชาติ, ภาวะหลอดลมไวเกินโดยกำเนิด · <b>Environmental</b>: สารก่อภูมิแพ้ในบ้าน/นอกบ้าน, บุหรี่มือสอง, การติดเชื้อทางเดินหายใจ, อาหาร, ยา, ความเครียด' },

    { t:'qa', src:'สไลด์ 10',
      q:'อธิบายกลไก Allergic asthma (type 1 hypersensitivity) เป็นลำดับขั้น',
      points:['Allergen กระตุ้น B-cell ผ่าน T-helper cell → สร้าง IgE เพิ่ม','IgE เกาะผิว mast cell → เจอ allergen ซ้ำ → mast cell degranulation','ปล่อย histamine, leukotrienes, prostaglandins','Monocyte/eosinophil เคลื่อนเข้ามา + helper T cell เสริมการอักเสบต่อเนื่อง'],
      a:'(1) สัมผัส allergen → สร้าง IgE เพิ่มขึ้น (2) IgE เกาะผิว mast cell เมื่อเจอ allergen ซ้ำเกิด mast cell degranulation ปล่อย histamine, leukotrienes, prostaglandins (3) มี migration ของ monocyte/eosinophil และกระตุ้น helper T cell มาเสริมการอักเสบต่อเนื่อง' },

    { t:'qa', src:'สไลด์ 11',
      q:'Non-allergic asthma เกิดผ่านเส้นทางใด และมีตัวกระตุ้นอะไรบ้าง',
      points:['ไม่ผ่าน IgE','Irritant receptor → vagal nerve → ACh → M3 → bronchoconstriction','ตัวกระตุ้น: การติดเชื้อ ควันบุหรี่ อากาศเย็น NSAIDs'],
      a:'ไม่ผ่าน IgE แต่ irritant (การติดเชื้อ, ควันบุหรี่, อากาศเย็น, NSAIDs เช่น aspirin/ibuprofen) กระตุ้น irritant receptor โดยตรง → ส่งสัญญาณผ่าน vagal nerve → หลั่ง ACh → จับ M3 receptor → bronchoconstriction (และกระตุ้น mast cell degranulation ทางอ้อมได้)' },

    { t:'qa', src:'สไลด์ 11',
      q:'การที่หืดมี 2 เส้นทางกลไก อธิบายเรื่องกลุ่มยาที่ใช้รักษาอย่างไร',
      points:['IgE-mediated (ภูมิคุ้มกัน) → antihistamine, corticosteroid, LTRA, anti-IgE','Vagal/cholinergic → anticholinergic (บล็อก M3)'],
      a:'เพราะมีทั้งเส้นทางภูมิคุ้มกัน (IgE-mediated) และเส้นทางประสาท (vagal/cholinergic) ยารักษาจึงมีทั้งกลุ่มบล็อก M3 (anticholinergic) และกลุ่มยับยั้งภูมิแพ้/การอักเสบ (antihistamine, corticosteroid, leukotriene antagonist)' },

    { t:'qa', src:'สไลด์ 13',
      q:'Arachidonic acid pathway เริ่มต้นจากอะไร และแตกเป็นกี่เส้นทางหลัก อะไรบ้าง',
      points:['Cell membrane phospholipids → phospholipase → arachidonic acid','COX pathway → prostaglandin/thromboxane','5-Lipoxygenase pathway → leukotriene'],
      a:'เริ่มจาก cell membrane phospholipids ถูกย่อยโดย <b>phospholipase</b> ได้ arachidonic acid แล้วแยกเป็น 2 เส้นทาง คือ <b>COX</b> (→ PGG2/PGH2 → TXA2, PGI2, PGD2, PGE2) และ <b>5-LO</b> (→ 5-HPETE → LTA4 → LTB4 และ LTC4/D4/E4)' },

    { t:'qa', src:'สไลด์ 13',
      q:'ผลิตภัณฑ์จาก COX pathway มีอะไรบ้าง และออกฤทธิ์อย่างไร',
      points:['TXA2 — หดหลอดเลือด กระตุ้นเกล็ดเลือด','PGI2 (prostacyclin) — ขยายหลอดเลือด ยับยั้งเกล็ดเลือด','PGD2, PGE2 — ขยายหลอดเลือด เพิ่มการซึมผ่าน'],
      a:'PGG2/PGH2 แตกเป็น <b>TXA2</b> (หดหลอดเลือด กระตุ้นเกล็ดเลือด), <b>PGI2</b> (ขยายหลอดเลือด ยับยั้งเกล็ดเลือด) และ <b>PGD2/PGE2</b> (ขยายหลอดเลือด เพิ่ม vascular permeability)' },

    { t:'qa', src:'สไลด์ 13',
      q:'Cysteinyl leukotrienes (LTC4, D4, E4) ออกฤทธิ์อะไรบ้าง และ LTB4 ต่างออกไปอย่างไร',
      points:['CysLT: หดหลอดเลือด, bronchospasm, เพิ่มการซึมผ่านของหลอดเลือด','LTB4: chemotaxis ดึงเม็ดเลือดขาวมาที่จุดอักเสบ'],
      a:'LTC4/D4/E4 ทำให้หดหลอดเลือด, เกิด bronchospasm และเพิ่มการซึมผ่านของหลอดเลือด — เป็นเป้าของ leukotriene receptor antagonist ส่วน <b>LTB4</b> ทำหน้าที่ chemotaxis ดึงเม็ดเลือดขาวเข้าจุดอักเสบ (Lipoxin A4/B4 มีฤทธิ์ตรงข้าม คือยับยั้งการเกาะและ chemotaxis ของ neutrophil)' },

    { t:'qa', src:'สไลด์ 13–14',
      q:'Corticosteroid และ NSAIDs ยับยั้ง arachidonic acid pathway ที่จุดใด ต่างกันอย่างไร',
      points:['Steroid ยับยั้ง phospholipase (บนสุด) → ลดสารอักเสบครบทุกเส้นทาง','NSAIDs ยับยั้งเฉพาะ COX','NSAIDs อาจดัน arachidonic acid ไปทาง 5-LO มากขึ้น'],
      a:'Steroid บล็อก <b>phospholipase</b> ซึ่งอยู่บนสุด จึงลดสารอักเสบได้ครบทุกเส้นทาง ส่วน NSAIDs บล็อกเฉพาะ <b>COX</b> จึงอาจดัน arachidonic acid ไปทาง 5-LO มากขึ้น' },

    { t:'mcq', src:'สไลด์ 14', correct:1,
      q:'กลไกของ aspirin-induced asthma คือข้อใด',
      choices:['Aspirin กระตุ้นการสร้าง IgE ต่อ COX','NSAIDs บล็อก COX ทำให้ arachidonic acid ไหลไปทาง 5-LO มากขึ้น จึงเพิ่ม leukotriene','Aspirin จับกับ M3 receptor โดยตรง','Aspirin ยับยั้ง HDAC2 ทำให้ยีนอักเสบทำงานมากขึ้น'],
      a:'NSAIDs ยับยั้งเฉพาะ COX ทำให้ substrate เหลือไหลไปทาง 5-LO มากขึ้น → leukotriene เพิ่ม → เกิด bronchospasm ในผู้ป่วยบางราย' }
  ]
},

/* ============ 3. COPD ============ */
{
  id: 'copd',
  name: 'COPD',
  slides: 'สไลด์ 14–17',
  qs: [
    { t:'qa', src:'สไลด์ 14',
      q:'นิยามของ COPD คืออะไร และต่างจาก asthma ตรงจุดสำคัญอะไร',
      points:['Airflow limitation ที่ไม่ reversible เต็มที่','เป็นแบบ progressive ค่อยเป็นค่อยไป','สัมพันธ์กับการอักเสบผิดปกติต่อฝุ่นควัน/สารระคายเคือง','Asthma ส่วนใหญ่ reversible'],
      a:'COPD คือ airflow limitation ที่ <b>not fully reversible</b> มักเป็นแบบ progressive และสัมพันธ์กับการอักเสบผิดปกติของปอดต่อฝุ่นควัน/สารระคายเคือง จุดต่างสำคัญจาก asthma คือ asthma ส่วนใหญ่กลับคืนสภาพได้' },

    { t:'qa', src:'สไลด์ 15',
      q:'พยาธิสภาพของ COPD เกิดที่ตำแหน่งใดบ้าง และมีเซลล์อักเสบชนิดใดเพิ่มขึ้น',
      points:['ทางเดินหายใจ, เนื้อปอด (parenchyma), หลอดเลือดปอด','Neutrophils, eosinophils, macrophages','T-lymphocytes (Th1, Th2, Th17, cytotoxic T)'],
      a:'อักเสบเรื้อรังทั่วทางเดินหายใจ เนื้อปอด และหลอดเลือดปอด โดยมีเซลล์อักเสบเพิ่มขึ้นหลายชนิด ได้แก่ neutrophils, eosinophils, macrophages และ T-lymphocytes (Th1, Th2, Th17, cytotoxic T1/T2)' },

    { t:'mcq', src:'สไลด์ 15', correct:0,
      q:'เซลล์อักเสบที่เด่นใน COPD และอธิบายว่าทำไม COPD ตอบสนอง ICS น้อยกว่าหืด คือเซลล์ใด',
      choices:['Neutrophil','Eosinophil','Mast cell','Basophil'],
      a:'COPD เด่น <b>neutrophil</b> ต่างจาก asthma ที่เด่น eosinophil/mast cell ซึ่งตอบสนองต่อ corticosteroid ได้ดีกว่า จึงเป็นเหตุผลที่ COPD ตอบสนอง ICS น้อยกว่า' },

    { t:'qa', src:'สไลด์ 15',
      q:'อาการหลักและประวัติที่ชวนสงสัย COPD คืออะไร',
      points:['ไอเรื้อรัง','มีเสมหะ','หายใจลำบาก','ประวัติสูบบุหรี่หรือสัมผัสปัจจัยเสี่ยง'],
      a:'ไอเรื้อรัง มีเสมหะ หรือหายใจลำบาก ร่วมกับประวัติสูบบุหรี่หรือสัมผัสปัจจัยเสี่ยง' },

    { t:'fill', src:'สไลด์ 17', accept:['asthma-copd overlap','asthma copd overlap','overlap','acos'],
      q:'ผู้ป่วยบางรายมีลักษณะของทั้งหืดและ COPD ซ้อนทับกัน เรียกภาวะนี้ว่า ______',
      a:'<b>Asthma-COPD overlap</b> — พยาธิกลไกของสองโรคบางครั้งแยกกันไม่ขาด' }
  ]
},

/* ============ 4. เปรียบเทียบ & เป้าหมายการรักษา ============ */
{
  id: 'goals',
  name: 'Asthma vs COPD & เป้าหมายการรักษา',
  slides: 'สไลด์ 18–21',
  qs: [
    { t:'qa', src:'สไลด์ 18',
      q:'เปรียบเทียบ Asthma กับ COPD ใน 4 ประเด็น: อายุที่เริ่มเป็น, ลักษณะอาการ, ประวัติ และการกลับคืนของการอุดกั้น',
      points:['อายุ: หืดเริ่มตั้งแต่เด็ก / COPD เริ่มวัยกลางคน','อาการ: หืดผันแปรวันต่อวัน เป็นมากกลางคืน-เช้ามืด / COPD ค่อย ๆ แย่ลงเรื่อย ๆ','ประวัติ: หืดมีภูมิแพ้ rhinitis ประวัติครอบครัว / COPD สูบบุหรี่มานาน เหนื่อยตอนออกแรง','การอุดกั้น: หืด reversible / COPD irreversible'],
      a:'<b>Asthma</b>: เริ่มตั้งแต่เด็ก, อาการผันแปรวันต่อวันและเป็นมากกลางคืน/เช้ามืด, มีประวัติภูมิแพ้-rhinitis-ครอบครัว, การอุดกั้นส่วนใหญ่ reversible · <b>COPD</b>: เริ่มวัยกลางคน, อาการค่อย ๆ แย่ลงเรื่อย ๆ, ประวัติสูบบุหรี่มานานและเหนื่อยตอนออกแรง, การอุดกั้นส่วนใหญ่ irreversible' },

    { t:'qa', src:'สไลด์ 19',
      q:'แนวทางการจัดการทั่วไปของโรคอุดกั้นทางเดินหายใจมีอะไรบ้าง',
      points:['ให้ความรู้ผู้ป่วย','ประเมิน/ติดตามอาการและสมรรถภาพปอด (FEV1, PEF)','หลีกเลี่ยงปัจจัยเสี่ยง เช่น เลิกบุหรี่','วางแผนการใช้ยารายบุคคล','วางแผนรับมืออาการกำเริบและติดตามสม่ำเสมอ'],
      a:'ให้ความรู้ผู้ป่วย, ประเมินและติดตามทั้งอาการและสมรรถภาพปอด (FEV1, PEF), หลีกเลี่ยงปัจจัยเสี่ยง, วางแผนการใช้ยารายบุคคล, วางแผนรับมืออาการกำเริบ และติดตามผลสม่ำเสมอ' },

    { t:'qa', src:'สไลด์ 20',
      q:'เป้าหมายการรักษาหืด (Asthma) มีอะไรบ้าง',
      points:['ควบคุมอาการให้คงที่','ป้องกันการกำเริบเฉียบพลัน','รักษาสมรรถภาพปอดให้ใกล้เคียงปกติ','หลีกเลี่ยงผลข้างเคียงจากยา','ป้องกัน airflow limitation ถาวร และลดอัตราตาย'],
      a:'ควบคุมอาการให้คงที่, ป้องกันการกำเริบเฉียบพลัน, รักษาสมรรถภาพปอดให้ใกล้เคียงปกติที่สุด, หลีกเลี่ยงผลข้างเคียงจากยา, ป้องกันการเกิด airflow limitation แบบถาวร และลดอัตราตายจากหืด' },

    { t:'qa', src:'สไลด์ 21',
      q:'เป้าหมายการรักษา COPD มีอะไรบ้าง',
      points:['ชะลอการดำเนินโรค','บรรเทาอาการ','เพิ่มความทนต่อการออกกำลังกาย','เพิ่มคุณภาพชีวิต','ป้องกัน/รักษาภาวะแทรกซ้อนและการกำเริบ ลดอัตราตาย'],
      a:'ชะลอการดำเนินโรค, บรรเทาอาการ, เพิ่มความทนต่อการออกกำลังกาย, เพิ่มคุณภาพชีวิต, ป้องกันและรักษาภาวะแทรกซ้อน/อาการกำเริบ และลดอัตราตาย' },

    { t:'mcq', src:'สไลด์ 20–21', correct:3,
      q:'ปรัชญาการรักษาของหืดกับ COPD ต่างกันอย่างไร',
      choices:['หืดเน้นชะลอโรค COPD เน้นควบคุมอาการ','ทั้งสองโรคเน้นชะลอการเสื่อมของปอดเหมือนกัน','ทั้งสองโรคเน้นควบคุมอาการที่ผันผวนเหมือนกัน','หืดเน้นควบคุมอาการที่ผันผวน ส่วน COPD เน้นชะลอการเสื่อมที่ดำเนินไปเรื่อย ๆ'],
      a:'Asthma เน้น "ควบคุม" อาการที่ผันผวน ส่วน COPD เน้น "ชะลอ" การเสื่อมที่ดำเนินไปเรื่อย ๆ' }
  ]
},

/* ============ 5. การให้ยาทางสูดพ่น ============ */
{
  id: 'inhale',
  name: 'การให้ยาทางสูดพ่น (Inhaled route)',
  slides: 'สไลด์ 22–24',
  qs: [
    { t:'qa', src:'สไลด์ 22',
      q:'ข้อดีของการให้ยาทางสูดพ่นเทียบกับการกินคืออะไร',
      points:['ยาไปออกฤทธิ์ที่ทางเดินหายใจโดยตรง','ใช้ขนาดยาต่ำกว่ามากแต่ได้ผลการรักษา','ผลข้างเคียงทั่วร่างกาย (systemic) ต่ำกว่า'],
      a:'ยาไปออกฤทธิ์ที่ทางเดินหายใจโดยตรง ใช้ขนาดยาต่ำกว่าการกินมากแต่ยังได้ผลการรักษา และมีความเสี่ยงต่อ systemic side effect ต่ำกว่า' },

    { t:'fill', src:'สไลด์ 22', accept:['2-5','2–5','2 5','2-5 ไมครอน','2-5 micron','2-5 um'],
      q:'ขนาดอนุภาคยาที่เหมาะสมสำหรับไปถึงหลอดลมส่วนล่างคือ ______ ไมครอน',
      a:'<b>2–5 ไมครอน</b> — เล็กกว่านี้จะถูกหายใจออกมา ใหญ่กว่านี้จะติดอยู่แค่คอ/หลอดลมใหญ่' },

    { t:'qa', src:'สไลด์ 24',
      q:'pMDI ร่วมกับ spacer ช่วยแก้ปัญหาอะไรได้บ้าง',
      points:['ลดปัญหาการกดยาไม่พร้อมกับการหายใจเข้า','ลดยาตกค้างในช่องปาก/คอ (จึงลดเชื้อราและเสียงแหบเมื่อใช้ ICS)'],
      a:'ช่วยลดปัญหาการกดยาไม่พร้อมกับจังหวะหายใจเข้า และลดยาตกค้างในช่องปาก/คอ ซึ่งเป็นวิธีป้องกันผลข้างเคียงเฉพาะที่ของ ICS ด้วย' },

    { t:'qa', src:'สไลด์ 24',
      q:'Nebulizer และ DPI เหมาะกับผู้ป่วยกลุ่มใด และมีข้อจำกัดอะไร',
      points:['Nebulizer: เด็กเล็ก ผู้ที่สูดพ่นเองไม่ได้ หรืออาการกำเริบรุนแรง','DPI (Accuhaler, Ellipta, Turbuhaler): ต้องอาศัยแรงหายใจเข้าของผู้ป่วยเอง','DPI ไม่เหมาะกับผู้ที่แรงหายใจเข้าน้อยมาก'],
      a:'<b>Nebulizer</b> แปลงยาน้ำเป็นละอองฝอย เหมาะกับเด็กเล็ก ผู้ป่วยที่สูดพ่นเองไม่ได้ หรืออาการกำเริบรุนแรง · <b>DPI</b> (Accuhaler, Ellipta, Turbuhaler) ต้องใช้แรงหายใจเข้าของผู้ป่วยดึงผงยา จึงไม่เหมาะกับผู้ที่แรงหายใจเข้าน้อยมาก' },

    { t:'mcq', src:'สไลด์ 24', correct:2,
      q:'ผู้ป่วยหืดกำเริบรุนแรง หายใจเข้าได้แรงน้อยมาก ควรเลือกอุปกรณ์นำส่งยาแบบใด',
      choices:['DPI ชนิด Turbuhaler','DPI ชนิด Accuhaler','pMDI ร่วมกับ spacer หรือ nebulizer','ยาเม็ดรับประทานเท่านั้น'],
      a:'pMDI+spacer และ nebulizer ไม่ต้องพึ่งแรงหายใจเข้าแรง ๆ ของผู้ป่วย จึงเหมาะกับภาวะกำเริบรุนแรงหรือเด็กเล็ก' }
  ]
},

/* ============ 6. Beta2-agonists ============ */
{
  id: 'beta2',
  name: 'Beta2-agonists',
  slides: 'สไลด์ 26–34',
  qs: [
    { t:'fill', src:'สไลด์ 27', accept:['70','70%','70 %','ร้อยละ 70'],
      q:'ตัวรับ beta-adrenergic ในเยื่อบุทางเดินหายใจและถุงลม เป็นชนิด beta2 ประมาณ ______ เปอร์เซ็นต์',
      a:'<b>70%</b> ของ beta receptor ในทางเดินหายใจเป็นชนิด beta2 จึงเป็นเป้าหมายหลักของยากลุ่มนี้' },

    { t:'qa', src:'สไลด์ 27',
      q:'ทำไมยาขยายหลอดลมกลุ่มนี้จึงเลือกออกฤทธิ์ที่ beta2 ไม่ใช่ beta1',
      points:['beta2 เด่นที่กล้ามเนื้อเรียบหลอดลมและหลอดเลือด (70% ของ beta receptor ในทางเดินหายใจ)','beta1 อยู่ที่หัวใจเป็นหลัก','เลี่ยง beta1 เพื่อไม่ให้หัวใจเต้นเร็ว'],
      a:'เพราะ beta2 เด่นที่กล้ามเนื้อเรียบหลอดลม/หลอดเลือดและเยื่อบุทางเดินหายใจ ส่วน beta1 อยู่ที่หัวใจเป็นหลัก การเลือก beta2 จึงเลี่ยงผลกระตุ้นหัวใจ' },

    { t:'qa', src:'สไลด์ 28–29',
      q:'อธิบายกลไกการออกฤทธิ์ของ beta2-agonist ตั้งแต่จับตัวรับจนหลอดลมคลายตัว',
      points:['จับ beta2 receptor (GPCR ชนิด Gs)','กระตุ้น adenylate cyclase → ATP เป็น cAMP','cAMP กระตุ้น protein kinase A (PKA)','ผลปลายทาง: แคลเซียมในเซลล์ลดลง + ยับยั้ง MLCK','กล้ามเนื้อเรียบคลายตัว = bronchodilation'],
      a:'beta2-agonist จับ beta2 receptor (Gs-coupled) → กระตุ้น adenylate cyclase เปลี่ยน ATP เป็น <b>cAMP</b> → กระตุ้น <b>PKA</b> ซึ่งเพิ่ม Ca-activated K channel (hyperpolarize), ลด PLC-IP3-Ca pathway, เพิ่ม Na/Ca exchange และ Na,Ca-ATPase, และลดการทำงานของ <b>MLCK</b> → แคลเซียมในเซลล์ลดลง กล้ามเนื้อเรียบคลายตัว' },

    { t:'qa', src:'สไลด์ 29',
      q:'นอกจากขยายหลอดลม การกระตุ้น beta2 receptor ยังให้ผลอะไรอีก',
      points:['ยับยั้งการหลั่ง mediator จาก mast cell','ลดการซึมผ่านของหลอดเลือด (vascular permeability)','เปลี่ยนแปลงการทำงานของ mucociliary clearance'],
      a:'ยับยั้งการหลั่ง mediator จาก mast cell, ลด vascular permeability และเปลี่ยนแปลงการทำงานของ mucociliary clearance' },

    { t:'qa', src:'สไลด์ 28',
      q:'cAMP ถูกสลายโดยเอนไซม์ใด และยากลุ่มใดใช้ประโยชน์จากจุดนี้',
      points:['Phosphodiesterase (PDE) สลาย cAMP เป็น 5-AMP','Methylxanthine (theophylline) ยับยั้ง PDE','เสริมฤทธิ์ขยายหลอดลมไปทางเดียวกับ beta2-agonist'],
      a:'cAMP ถูกสลายโดย <b>phosphodiesterase (PDE)</b> เป็น 5-AMP ยากลุ่ม methylxanthine เช่น theophylline ยับยั้ง PDE ทำให้ cAMP อยู่นานขึ้น จึงเสริมฤทธิ์ไปในทิศทางเดียวกับ beta2-agonist' },

    { t:'qa', src:'สไลด์ 31',
      q:'SABA คืออะไร ออกฤทธิ์นานเท่าไร และมียาตัวใดบ้าง',
      points:['Short-Acting Beta2 Agonist','ออกฤทธิ์ 4–6 ชั่วโมง','Salbutamol, Terbutaline, Fenoterol, Pirbuterol, Procaterol'],
      a:'SABA = Short-Acting Beta2 Agonist ออกฤทธิ์ <b>4–6 ชั่วโมง</b> ได้แก่ salbutamol, terbutaline, fenoterol, pirbuterol, procaterol' },

    { t:'qa', src:'สไลด์ 31',
      q:'LABA คืออะไร ออกฤทธิ์นานเท่าไร และมียาตัวใดบ้าง',
      points:['Long-Acting Beta2 Agonist','ออกฤทธิ์นานกว่า 12 ชั่วโมง','Formoterol, Salmeterol, Arformoterol'],
      a:'LABA = Long-Acting Beta2 Agonist ออกฤทธิ์ <b>นานกว่า 12 ชั่วโมง</b> ได้แก่ formoterol, salmeterol, arformoterol' },

    { t:'qa', src:'สไลด์ 32',
      q:'บทบาทของ SABA ในการรักษาคืออะไร และใช้เมื่อใด',
      points:['ใช้เป็น reliever ยาบรรเทาอาการเฉียบพลัน','เป็นตัวเลือกแรกในการรักษา acute exacerbation','ใช้ป้องกันก่อนออกกำลังกายใน exercise-induced asthma','ไม่ควรใช้เป็นยาควบคุมระยะยาว'],
      a:'SABA เป็น <b>reliever</b> ใช้บรรเทาอาการกำเริบเฉียบพลันเป็นตัวเลือกแรก และใช้ป้องกันก่อนออกกำลังกายใน exercise-induced asthma แต่ไม่ควรใช้เป็นยาควบคุมระยะยาว' },

    { t:'qa', src:'สไลด์ 32',
      q:'ถ้าผู้ป่วยต้องใช้ SABA บ่อยขึ้นเรื่อย ๆ แปลว่าอะไร',
      points:['เป็นสัญญาณเตือนว่าโรคควบคุมไม่ดี','สมรรถภาพปอดแย่ลง','ควรทบทวนยาควบคุม (ICS)'],
      a:'เป็นสัญญาณเตือนว่าควบคุมโรคได้ไม่ดีและสมรรถภาพปอดแย่ลง ต้องทบทวนการรักษาด้วยยาควบคุม' },

    { t:'qa', src:'สไลด์ 33',
      q:'LABA ใช้เมื่อใด และทำไมจึงห้ามใช้ LABA เดี่ยว ๆ ในหืด',
      points:['ใช้เป็น controller เมื่อ ICS ขนาดต่ำอย่างเดียวคุมไม่ได้','ต้องใช้ร่วมกับ ICS เสมอ','LABA ไม่มีฤทธิ์ต้านการอักเสบ จึงไม่คุมการอักเสบที่เป็นต้นเหตุ'],
      a:'ใช้เป็น <b>controller</b> เมื่อ ICS ขนาดต่ำอย่างเดียวยังคุมอาการไม่ได้ และต้องใช้ร่วมกับ ICS เสมอ เพราะ LABA ขยายหลอดลมแต่ไม่คุมการอักเสบ' },

    { t:'qa', src:'สไลด์ 33',
      q:'ผลข้างเคียงเชิงระบบของ beta2-agonist มีอะไรบ้าง',
      points:['กระตุ้นหัวใจและหลอดเลือด (ใจสั่น หัวใจเต้นเร็ว)','มือสั่นจากกล้ามเนื้อลาย (skeletal muscle tremor)','โพแทสเซียมในเลือดต่ำ (hypokalemia)'],
      a:'กระตุ้นหัวใจและหลอดเลือด, skeletal muscle tremor (มือสั่น) และ hypokalemia — พบน้อยกว่าเมื่อให้ทางสูดพ่นเทียบกับยากิน' },

    { t:'mcq', src:'สไลด์ 31–34', correct:1,
      q:'ยาคู่ใดจัดเป็น SABA และ LABA ตามลำดับ',
      choices:['Salmeterol กับ Salbutamol','Salbutamol กับ Salmeterol','Ipratropium กับ Tiotropium','Theophylline กับ Formoterol'],
      a:'Salbutamol และ terbutaline เป็น SABA ส่วน salmeterol และ formoterol เป็น LABA (ipratropium/tiotropium เป็นกลุ่ม antimuscarinic)' }
  ]
},

/* ============ 7. Methylxanthines ============ */
{
  id: 'xanthine',
  name: 'Methylxanthines / Theophylline',
  slides: 'สไลด์ 35–39',
  qs: [
    { t:'qa', src:'สไลด์ 35',
      q:'Theophylline มีกลไกการออกฤทธิ์อย่างไร (2 กลไกหลัก)',
      points:['Non-selective PDE inhibitor (PDE-3, 4, 5) → cAMP ไม่ถูกสลาย → หลอดลมคลายตัว','Adenosine receptor antagonist → ลด bronchoconstriction จาก adenosine'],
      a:'(1) <b>Non-selective PDE inhibitor</b> (PDE-3, 4, 5) ในกล้ามเนื้อเรียบหลอดลมและเซลล์อักเสบ ทำให้ cAMP สลายช้าลง หลอดลมคลายตัว (2) <b>Adenosine receptor antagonist</b> — adenosine ปกติทำให้หลอดลมหด การบล็อกจึงช่วยขยายหลอดลมทางอ้อม' },

    { t:'qa', src:'สไลด์ 35',
      q:'ฤทธิ์ของ theophylline เปลี่ยนไปตามขนาดยาอย่างไร',
      points:['ขนาดสูง (>10 mg/L) → ฤทธิ์ขยายหลอดลม','ขนาดต่ำ (5–10 mg/L) → ฤทธิ์ต้านการอักเสบ'],
      a:'ขนาดสูง (มากกว่า 10 mg/L) ให้ฤทธิ์ <b>ขยายหลอดลม</b> ส่วนขนาดต่ำ (5–10 mg/L) ให้ฤทธิ์ <b>ต้านการอักเสบ</b>' },

    { t:'fill', src:'สไลด์ 37', accept:['cyp1a2','1a2'],
      q:'Theophylline ถูกเมตาบอลิซึมที่ตับผ่านเอนไซม์ ______',
      a:'<b>CYP1A2</b> — จึงไวต่อยาที่ยับยั้งหรือกระตุ้นเอนไซม์นี้มาก' },

    { t:'fill', src:'สไลด์ 37', accept:['10-15','10–15','10 15','10-15 mg/l'],
      q:'ระดับยา theophylline ในเลือดที่ต้องติดตามให้อยู่ในช่วง (steady state) คือ ______ mg/L',
      a:'<b>10–15 mg/L</b> — therapeutic range แคบมาก จึงต้องตรวจติดตามระดับยาเสมอ' },

    { t:'qa', src:'สไลด์ 38',
      q:'ยาใดทำให้ระดับ theophylline ในเลือดสูงขึ้น (เสี่ยง toxicity) และยาใดทำให้ต่ำลง',
      points:['เพิ่มระดับ (ยับยั้งเอนไซม์): cimetidine, macrolide, ciprofloxacin, enoxacin','ลดระดับ (กระตุ้นเอนไซม์): barbiturate, carbamazepine'],
      a:'<b>เพิ่มระดับยา</b> (ยับยั้ง CYP1A2): cimetidine, macrolide antibiotics, ciprofloxacin, enoxacin · <b>ลดระดับยา</b> (กระตุ้นเอนไซม์): barbiturate, carbamazepine' },

    { t:'qa', src:'สไลด์ 39',
      q:'อาการของภาวะเป็นพิษจาก theophylline มีอะไรบ้าง แยกตามระบบ',
      points:['ทางเดินอาหาร: คลื่นไส้ อาเจียน','CNS: กระสับกระส่าย นอนไม่หลับ ปวดศีรษะ ชัก','หัวใจ: เต้นเร็ว เต้นผิดจังหวะ','กระตุ้นศูนย์ควบคุมการหายใจ / รุนแรงถึงเสียชีวิต'],
      a:'GI: คลื่นไส้ อาเจียน · CNS: กระสับกระส่าย นอนไม่หลับ ปวดศีรษะ <b>ชัก</b> · CVS: หัวใจเต้นเร็ว/ผิดจังหวะ · กระตุ้นศูนย์ควบคุมการหายใจ และถ้ารุนแรงอาจเสียชีวิต' },

    { t:'qa', src:'สไลด์ 38',
      q:'ผู้ป่วยกลุ่มใดต้องระวังเป็นพิเศษเมื่อใช้ theophylline',
      points:['โรคลมชัก','ต่อมไทรอยด์เป็นพิษ','หัวใจเต้นผิดจังหวะ','โรคตับ','หญิงตั้งครรภ์'],
      a:'ผู้ป่วยโรคลมชัก, ต่อมไทรอยด์เป็นพิษ, หัวใจเต้นผิดจังหวะ, โรคตับ และหญิงตั้งครรภ์' },

    { t:'qa', src:'สไลด์ 37',
      q:'Theophylline ให้ทางใดได้บ้าง และมีบทบาทอย่างไรในการรักษา',
      points:['ให้ทางปากและทางหลอดเลือดดำ','ทางหลอดเลือดดำใช้บรรเทาอาการเฉียบพลัน','ชนิด sustained-release ใช้เป็น controller ระยะยาว'],
      a:'ให้ได้ทั้งทางปากและทางหลอดเลือดดำ (พาเรนเทอรัลใช้บรรเทาอาการเฉียบพลัน) ส่วนชนิดออกฤทธิ์นาน (sustained-release) ใช้เป็นยาควบคุมระยะยาวเพื่อคุมอาการและเพิ่มสมรรถภาพปอด' },

    { t:'mcq', src:'สไลด์ 38', correct:2,
      q:'ผู้ป่วยใช้ theophylline อยู่ แล้วได้รับ erythromycin (macrolide) เพิ่ม จะเกิดอะไรขึ้น',
      choices:['ระดับ theophylline ลดลง เสี่ยงคุมโรคไม่ได้','ไม่มีผลต่อกัน เพราะคนละเอนไซม์','ระดับ theophylline สูงขึ้น เสี่ยงเกิดพิษ เช่น ชักและหัวใจเต้นผิดจังหวะ','ทั้งสองตัวถูกขับออกเร็วขึ้นพร้อมกัน'],
      a:'Macrolide ยับยั้ง CYP1A2 ทำให้ theophylline ถูกทำลายช้าลง ระดับยาสูงขึ้นจนเสี่ยง toxicity ซึ่งอันตรายเพราะ therapeutic range แคบ' }
  ]
},

/* ============ 8. Muscarinic antagonists ============ */
{
  id: 'antimus',
  name: 'Muscarinic antagonists (Anticholinergics)',
  slides: 'สไลด์ 40–43',
  qs: [
    { t:'qa', src:'สไลด์ 41',
      q:'ตัวรับ muscarinic ในปอดมีชนิดย่อยอะไรบ้าง และแต่ละชนิดทำหน้าที่อะไร',
      points:['M1 — ที่ปมประสาท ช่วยส่งสัญญาณผ่าน ganglion','M2 — auto-receptor ยับยั้งการหลั่ง ACh เพิ่ม (negative feedback)','M3 — บนกล้ามเนื้อเรียบหลอดลม ทำให้ bronchoconstriction'],
      a:'<b>M1</b> อยู่ที่ post-ganglionic neuron ช่วยส่งสัญญาณผ่านปมประสาท, <b>M2</b> เป็น auto-receptor คอยยับยั้งการหลั่ง ACh เพิ่มเติม (negative feedback) และ <b>M3</b> อยู่บนกล้ามเนื้อเรียบหลอดลม เป็นตัวการหลักที่ทำให้หลอดลมหด' },

    { t:'qa', src:'สไลด์ 41',
      q:'อธิบายเส้นทาง parasympathetic จาก pre-ganglionic nerve จนถึงกล้ามเนื้อเรียบหลอดลม',
      points:['Pre-ganglionic nerve ปล่อย ACh จับ nicotinic receptor ที่ ganglion','Post-ganglionic nerve ปล่อย ACh อีกครั้ง','ACh จับ M3 บนกล้ามเนื้อเรียบ → bronchoconstriction'],
      a:'Pre-ganglionic nerve ปล่อย ACh ไปจับ <b>nicotinic receptor</b> ที่ parasympathetic ganglion → post-ganglionic nerve ปล่อย ACh อีกครั้งไปจับ <b>M3</b> บน airway smooth muscle → bronchoconstriction' },

    { t:'qa', src:'สไลด์ 40',
      q:'ยากลุ่ม antimuscarinic ออกฤทธิ์อย่างไร และมีข้อจำกัดสำคัญอะไร',
      points:['บล็อก M3 receptor แบบจำเพาะ','ยับยั้งฤทธิ์หดหลอดลมจาก ACh → bronchodilation','ไม่มีฤทธิ์ต้านการอักเสบ'],
      a:'บล็อก <b>M3 receptor</b> จึงยับยั้งฤทธิ์หดเกร็งหลอดลมจาก ACh เกิด bronchodilation แต่ <b>ไม่มีฤทธิ์ต้านการอักเสบ</b> ต่างจาก corticosteroid หรือ leukotriene modifier' },

    { t:'qa', src:'สไลด์ 42',
      q:'SAMA และ LAMA มียาตัวใดบ้าง และให้ทางใด',
      points:['SAMA: Ipratropium bromide, Oxitropium bromide','LAMA: Tiotropium bromide, Umeclidinium bromide','ให้ทางสูดพ่นเท่านั้น'],
      a:'<b>SAMA</b>: ipratropium bromide, oxitropium bromide · <b>LAMA</b>: tiotropium bromide, umeclidinium bromide — ให้ทางสูดพ่นเท่านั้น' },

    { t:'qa', src:'สไลด์ 42',
      q:'LAMA มีบทบาทอย่างไรในการรักษา COPD',
      points:['ใช้เป็น add-on therapy ร่วมกับ beta2-agonist','เป็นยาหลักตัวหนึ่งของ COPD','แต่ไม่มีฤทธิ์ต้านการอักเสบ'],
      a:'LAMA ใช้เป็น add-on therapy ร่วมกับ beta2-agonist และเป็นยาหลักตัวหนึ่งในการรักษา COPD แม้ไม่มีฤทธิ์ต้านการอักเสบ' },

    { t:'qa', src:'สไลด์ 42',
      q:'ผลข้างเคียงหลักของยากลุ่ม antimuscarinic ชนิดสูดพ่นคืออะไร',
      points:['ปากแห้ง','รสขมในปาก','เกิดจากฤทธิ์ antimuscarinic ตกค้างในช่องปาก'],
      a:'ปากแห้งและรสขมในปาก จากฤทธิ์ antimuscarinic ที่ตกค้างเฉพาะที่ในช่องปาก' },

    { t:'mcq', src:'สไลด์ 41', correct:1,
      q:'ตัวรับใดทำหน้าที่เป็น auto-receptor คอยยับยั้งการหลั่ง ACh เพิ่มเติม',
      choices:['M1','M2','M3','Nicotinic receptor'],
      a:'M2 เป็น auto-receptor ที่ให้ negative feedback ต่อการหลั่ง ACh ส่วน M3 คือตัวที่ทำให้หลอดลมหด' }
  ]
},

/* ============ 9. ยาขยายหลอดลมกลุ่มอื่น & PDE-4 ============ */
{
  id: 'novelbd',
  name: 'ยาขยายหลอดลมกลุ่มใหม่ & PDE-4 inhibitor',
  slides: 'สไลด์ 44–45',
  qs: [
    { t:'qa', src:'สไลด์ 44',
      q:'Magnesium sulfate ใช้ในสถานการณ์ใด ให้ทางใด และมีผลข้างเคียงอะไร',
      points:['ใช้เฉพาะอาการกำเริบเฉียบพลันรุนแรง','ให้ทางหลอดเลือดดำหรือพ่นละอองฝอย','ผลข้างเคียง: คลื่นไส้ ร้อนวูบวาบ (flushing)'],
      a:'ใช้เฉพาะ <b>acute severe exacerbation</b> ให้ทางหลอดเลือดดำหรือพ่นละอองฝอย ผลข้างเคียงคือคลื่นไส้และร้อนวูบวาบ — ไม่ใช่ยาควบคุมประจำ' },

    { t:'qa', src:'สไลด์ 44',
      q:'ANP และ VIP analog ทำให้หลอดลมคลายตัวผ่านสารตัวกลางใด',
      points:['ANP กระตุ้น guanylyl cyclase → เพิ่ม cGMP','VIP analog → เพิ่ม cAMP'],
      a:'<b>ANP</b> กระตุ้น guanylyl cyclase เพิ่ม <b>cGMP</b> ส่วน <b>VIP analog</b> เพิ่ม <b>cAMP</b> (คนละกลไกกับ beta2-agonist แต่ผลลัพธ์ทางเดียวกัน)' },

    { t:'qa', src:'สไลด์ 45',
      q:'PDE-4 พบเด่นในเซลล์ชนิดใด และการยับยั้งให้ผลอะไร',
      points:['พบในเซลล์อักเสบ: mast cell, eosinophil, neutrophil, T lymphocyte','ลดการแทรกซึมของ eosinophil','ลดการอักเสบ โดยเฉพาะใน COPD'],
      a:'PDE-4 เป็น isoform หลักในเซลล์อักเสบ (mast cell, eosinophil, neutrophil, T lymphocyte) การยับยั้งจึงลดการแทรกซึมของ eosinophil และลดการอักเสบ โดยเฉพาะใน COPD' },

    { t:'fill', src:'สไลด์ 45', accept:['roflumilast'],
      q:'ยา PDE-4 inhibitor ที่ใช้ใน COPD และมีผลข้างเคียงเด่นคือคลื่นไส้อาเจียนรุนแรง คือยาชื่อ ______',
      a:'<b>Roflumilast</b> (อีกตัวคือ apremilast) — ผลข้างเคียงเด่นคือคลื่นไส้อาเจียนรุนแรง' },

    { t:'mcq', src:'สไลด์ 44', correct:3,
      q:'ข้อใดถูกต้องเกี่ยวกับ MgSO4 ในโรคทางเดินหายใจ',
      choices:['ใช้เป็นยาควบคุมระยะยาวแทน ICS','ให้ทางปากวันละครั้ง','ออกฤทธิ์โดยบล็อก M3 receptor','ใช้เฉพาะอาการกำเริบเฉียบพลันรุนแรง ให้ทาง IV หรือพ่นละอองฝอย'],
      a:'MgSO4 สงวนไว้สำหรับอาการกำเริบเฉียบพลันรุนแรงเท่านั้น ให้ทางหลอดเลือดดำหรือพ่นละอองฝอย' }
  ]
},

/* ============ 10. Corticosteroids ============ */
{
  id: 'steroid',
  name: 'Corticosteroids',
  slides: 'สไลด์ 46–54',
  qs: [
    { t:'qa', src:'สไลด์ 46',
      q:'ยาต้านการอักเสบที่มีประสิทธิภาพสูงสุดสำหรับหืดคืออะไร และอยู่ในบทบาทใด',
      points:['Corticosteroid โดยเฉพาะรูปแบบสูดพ่น (ICS)','เป็นยา controller หลักของโรคหืด'],
      a:'<b>Corticosteroid</b> โดยเฉพาะ <b>Inhaled Corticosteroid (ICS)</b> ซึ่งเป็นยา controller หลักของโรคหืด' },

    { t:'qa', src:'สไลด์ 47–48',
      q:'อธิบายกลไกระดับโมเลกุลของ corticosteroid ตั้งแต่เข้าเซลล์จนกดยีนอักเสบ',
      points:['เข้าเซลล์ จับ glucocorticoid receptor (GR) ในไซโตพลาสซึม','GR-steroid complex เคลื่อนเข้านิวเคลียส','ดึง HDAC2 มา deacetylate histone','DNA ขดแน่นขึ้น → กดการแสดงออกของยีนอักเสบ'],
      a:'Steroid เข้าเซลล์จับ <b>glucocorticoid receptor (GR)</b> เกิด GR-steroid complex เคลื่อนเข้านิวเคลียส แล้วดึง <b>HDAC2</b> มา deacetylate histone ทำให้ DNA ขดแน่นขึ้น จึงกดการแสดงออกของยีนอักเสบ (gene repression)' },

    { t:'qa', src:'สไลด์ 47–48',
      q:'NF-kB เปิดยีนอักเสบได้อย่างไร (ตั้งแต่ inflammatory stimuli)',
      points:['IL-1beta / TNF-alpha กระตุ้น IKKbeta','IKKbeta กระตุ้น NF-kB (p65/p50)','NF-kB เข้านิวเคลียส จับ DNA ดึง coactivator CBP/HAT','Acetylation ของ histone → DNA คลายตัว → ถอดรหัสยีนอักเสบเพิ่ม'],
      a:'Inflammatory stimuli (IL-1beta, TNF-alpha) กระตุ้น <b>IKKbeta</b> → กระตุ้น <b>NF-kB</b> (p65/p50) → เข้านิวเคลียสจับ DNA และดึง coactivator <b>CBP/HAT</b> → acetylation ของ histone → DNA คลายตัว → เพิ่มการถอดรหัสยีนอักเสบ (cytokine, chemokine, adhesion molecule, enzyme)' },

    { t:'fill', src:'สไลด์ 48', accept:['hdac2','hdac-2','histone deacetylase 2'],
      q:'Corticosteroid กดยีนอักเสบโดยดึงเอนไซม์ ______ เข้ามา deacetylate histone',
      a:'<b>HDAC2</b> (histone deacetylase 2) — ตรงข้ามกับ NF-kB ที่เปิดยีนด้วยการ acetylate ผ่าน CBP/HAT' },

    { t:'qa', src:'สไลด์ 49–50',
      q:'Corticosteroid มีผลต่อเซลล์อักเสบชนิดใดบ้าง อย่างไร',
      points:['ลดจำนวน eosinophil (เพิ่ม apoptosis)','ลด cytokine จาก T-lymphocyte','ลดจำนวน mast cell','ลด cytokine จาก macrophage','ลดจำนวน dendritic cell'],
      a:'ลดจำนวน eosinophil โดยเพิ่ม apoptosis, ลด cytokine จาก T-lymphocyte และ macrophage, ลดจำนวน mast cell และ dendritic cell' },

    { t:'qa', src:'สไลด์ 50',
      q:'Corticosteroid มีผลต่อเซลล์โครงสร้าง (structural cells) อย่างไรบ้าง',
      points:['Epithelial cell: ลด cytokine/mediator','Endothelial cell: ลดการรั่วซึม','กล้ามเนื้อเรียบ: เพิ่มจำนวน beta2 receptor และลด cytokine','Mucus gland: ลดการหลั่งมูก'],
      a:'เยื่อบุผิวลด cytokine/mediator, เซลล์บุหลอดเลือดลดการรั่วซึม, กล้ามเนื้อเรียบหลอดลม <b>เพิ่มจำนวน beta2 receptor</b> และลด cytokine, ต่อมสร้างมูกลดการหลั่งมูก' },

    { t:'qa', src:'สไลด์ 50, 54',
      q:'ทำไมการใช้ ICS ร่วมกับ LABA จึงเสริมฤทธิ์กัน (synergy)',
      points:['Steroid เพิ่มจำนวน/ความไวของ beta2 receptor','beta2-agonist ช่วยเสริมการทำงานของ steroid กลับ','จึงมีการผลิตยาสูตรผสมในตัวเดียว'],
      a:'Corticosteroid เพิ่มจำนวนและความไวของ beta2 receptor ทำให้ LABA ออกฤทธิ์ดีขึ้น ขณะที่ beta2-agonist ก็ช่วยเสริมฤทธิ์ steroid กลับ จึงมีการผลิตเป็นยาสูตรผสมในตัวเดียว' },

    { t:'qa', src:'สไลด์ 51',
      q:'ยาในกลุ่ม ICS มีตัวใดบ้าง (ตอบให้ได้อย่างน้อย 4 ตัว)',
      points:['Beclomethasone dipropionate','Fluticasone propionate','Budesonide','Mometasone / Triamcinolone acetonide / Flunisolide / Ciclesonide'],
      a:'Beclomethasone dipropionate, fluticasone propionate, triamcinolone acetonide, mometasone, budesonide, flunisolide, ciclesonide' },

    { t:'qa', src:'สไลด์ 52',
      q:'ผลข้างเคียงเฉพาะที่ของ ICS มีอะไรบ้าง และป้องกันอย่างไร',
      points:['เชื้อราในช่องปาก/คอหอย (oropharyngeal candidiasis)','เสียงแหบ (dysphonia)','ไอ','ป้องกันด้วยการใช้ spacer และบ้วนปากหลังพ่นยา'],
      a:'เชื้อราในช่องปาก/คอหอย, เสียงแหบ (dysphonia) และไอ — ป้องกันได้ด้วยการใช้ <b>spacer</b> และ <b>บ้วนปากหลังพ่นยา</b>' },

    { t:'qa', src:'สไลด์ 52',
      q:'ผลข้างเคียงเชิงระบบของ corticosteroid (เมื่อใช้ขนาดสูง/นาน) มีอะไรบ้าง',
      points:['กดการทำงานของต่อมหมวกไต (adrenal suppression)','ยับยั้งการเจริญเติบโตในเด็ก','กระดูกพรุน','ต้อกระจก ต้อหิน','ความผิดปกติทางเมตาบอลิซึม (น้ำตาล อินซูลิน ไตรกลีเซอไรด์) และทางจิตเวช'],
      a:'Adrenal suppression, ยับยั้งการเจริญเติบโตในเด็ก, กระดูกพรุน, ต้อกระจก, ต้อหิน, ความผิดปกติทางเมตาบอลิซึมและทางจิตเวช' },

    { t:'qa', src:'สไลด์ 53',
      q:'ข้อควรระวังของการใช้ systemic corticosteroid มีอะไรบ้าง',
      points:['วัณโรค (TB) และการติดเชื้อปรสิต','กระดูกพรุน ต้อหิน','เบาหวาน','ซึมเศร้ารุนแรง แผลในกระเพาะอาหาร','ใช้ระยะยาวอาจกระตุ้น Herpes virus กำเริบ'],
      a:'ระวังในผู้ป่วยวัณโรค, การติดเชื้อปรสิต, กระดูกพรุน, ต้อหิน, เบาหวาน, ซึมเศร้ารุนแรง หรือแผลในกระเพาะอาหาร และการใช้ระยะยาวอาจกระตุ้นให้ Herpes virus กำเริบ' },

    { t:'qa', src:'สไลด์ 54',
      q:'ยาสูตรผสม ICS + LABA มีตัวอย่างอะไรบ้าง และมีข้อดีอย่างไร',
      points:['Fluticasone propionate/Salmeterol','Budesonide/Formoterol','สะดวก เพิ่ม adherence ของผู้ป่วย'],
      a:'เช่น fluticasone propionate/salmeterol และ budesonide/formoterol — รวมในอุปกรณ์เดียวเพื่อความสะดวกและเพิ่ม adherence' },

    { t:'mcq', src:'สไลด์ 47–48', correct:2,
      q:'ข้อใดอธิบายความต่างระหว่าง NF-kB กับ corticosteroid ในระดับยีนได้ถูกต้อง',
      choices:['ทั้งคู่ acetylate histone แต่คนละตำแหน่ง','NF-kB deacetylate เปิดยีน ส่วน steroid acetylate ปิดยีน','NF-kB เปิดยีนอักเสบด้วยการ acetylate ผ่าน CBP/HAT ส่วน steroid ปิดยีนด้วยการ deacetylate ผ่าน HDAC2','Steroid บล็อก NF-kB ที่ผิวเซลล์ก่อนเข้าไปในนิวเคลียส'],
      a:'NF-kB เปิดยีนอักเสบด้วย acetylation ผ่าน CBP/HAT ส่วน corticosteroid ปิดยีนด้วย deacetylation ผ่าน HDAC2' }
  ]
},

/* ============ 11. ยาต้าน mediator การอักเสบ ============ */
{
  id: 'mediator',
  name: 'Cromones & Leukotriene modifiers',
  slides: 'สไลด์ 55–60',
  qs: [
    { t:'qa', src:'สไลด์ 55',
      q:'Cromones มียาอะไรบ้าง และเชื่อว่าออกฤทธิ์อย่างไร',
      points:['Sodium cromoglycate, Nedocromil sodium','Non-specific chloride channel blocker','ทำให้เกิด mast cell membrane stabilization','ยับยั้งการหลั่งสารตัวกลางจากเซลล์อักเสบและยับยั้ง neuronal reflex ในปอด'],
      a:'Sodium cromoglycate และ nedocromil sodium เชื่อว่าเป็น non-specific chloride channel blocker ที่ทำให้เกิด <b>mast cell membrane stabilization</b> จึงยับยั้งการหลั่งสารตัวกลางจากเซลล์อักเสบหลายชนิดและยับยั้ง neuronal reflex ในปอด' },

    { t:'qa', src:'สไลด์ 56',
      q:'Cromones ใช้ในบทบาทใด และทำไมจึงใช้แก้อาการกำเริบเฉียบพลันไม่ได้',
      points:['ใช้เป็นยาป้องกัน (prophylaxis) และ controller ในหืดไม่รุนแรงถึงปานกลาง','ออกฤทธิ์ช้า จึงไม่ใช้กับอาการกำเริบเฉียบพลัน','ให้ทางสูดพ่น ดูดซึมน้อย ผลข้างเคียงน้อยมาก'],
      a:'ใช้เป็นยา <b>ป้องกัน</b> และ controller ในหืดไม่รุนแรงถึงปานกลาง ไม่ใช้รักษาอาการกำเริบเพราะออกฤทธิ์ช้า ให้ทางสูดพ่น ดูดซึมเข้าร่างกายน้อย ผลข้างเคียงพบน้อยมาก (บางครั้ง bronchospasm, ไอ, ระคายคอ) และไม่มีปฏิกิริยากับยาอื่น' },

    { t:'qa', src:'สไลด์ 57–58',
      q:'Leukotriene modifiers แบ่งเป็นกี่กลุ่มตามกลไก มีอะไรบ้าง',
      points:['CysLT1 receptor antagonist: montelukast, pranlukast, zafirlukast','5-Lipoxygenase inhibitor: zileuton (ถอนออกจากตลาดแล้ว)'],
      a:'(1) <b>CysLT1 receptor antagonist</b> — บล็อกไม่ให้ LTC4/D4/E4 จับตัวรับ ได้แก่ montelukast, pranlukast, zafirlukast (2) <b>5-LO inhibitor</b> — ยับยั้งการสร้างตั้งแต่ต้นทาง เช่น zileuton ซึ่งถอนออกจากตลาดแล้ว' },

    { t:'fill', src:'สไลด์ 58', accept:['montelukast'],
      q:'ยา leukotriene receptor antagonist ที่ใช้บ่อยที่สุดและให้ทางปากคือ ______',
      a:'<b>Montelukast</b> — บล็อก CysLT1 receptor ให้ทางปาก ผลข้างเคียงน้อย' },

    { t:'qa', src:'สไลด์ 59–60',
      q:'Leukotriene modifiers มีบทบาทอย่างไรในการรักษาหืด และมีข้อจำกัดอะไร',
      points:['ใช้เป็น add-on therapy ลดอาการ เพิ่มสมรรถภาพปอด ลดการกำเริบ','มีฤทธิ์ขยายหลอดลมได้บ้าง (แปรผัน)','ประสิทธิภาพน้อยกว่า ICS ขนาดต่ำ','ข้อดีคือให้ทางปาก สะดวกกว่าสูดพ่น ผลข้างเคียงน้อย'],
      a:'ใช้เป็น <b>add-on therapy</b> ช่วยลดอาการ เพิ่มสมรรถภาพปอด ลดการกำเริบ และช่วยลดขนาด steroid ที่ต้องใช้ แต่ประสิทธิภาพน้อยกว่า ICS ขนาดต่ำ ข้อดีคือให้ทางปากและทนต่อยาได้ดี' },

    { t:'mcq', src:'สไลด์ 55–58', correct:0,
      q:'ผู้ป่วยหืดไม่รุนแรง ต้องการยาป้องกันที่ทำให้ mast cell เสถียร ไม่ใช้แก้อาการเฉียบพลัน ควรเป็นยาข้อใด',
      choices:['Sodium cromoglycate','Salbutamol','Theophylline','Ipratropium'],
      a:'Cromones (sodium cromoglycate, nedocromil) ทำให้เยื่อหุ้ม mast cell เสถียร ใช้ป้องกันเท่านั้น ออกฤทธิ์ช้าจึงไม่ใช้กับอาการกำเริบ' }
  ]
},

/* ============ 12. Biologics ============ */
{
  id: 'biologic',
  name: 'Immunomodulatory therapy (Biologics)',
  slides: 'สไลด์ 61–67',
  qs: [
    { t:'qa', src:'สไลด์ 61',
      q:'Omalizumab คือยาอะไร ออกฤทธิ์อย่างไร ให้ทางใด และมีข้อจำกัดอะไร',
      points:['Humanized monoclonal antibody ต่อ IgE','จับส่วนของ IgE ที่ใช้เกาะตัวรับบน mast cell','ลดความรุนแรงของหืด ลดการใช้ corticosteroid ลดการกำเริบ','ให้ฉีดใต้ผิวหนัง (subcutaneous) · ราคาสูง'],
      a:'<b>Omalizumab</b> เป็น humanized monoclonal antibody ที่จำเพาะต่อส่วนของ IgE ที่ใช้จับตัวรับบน mast cell จึงยับยั้งการจับ IgE-mast cell ลดความรุนแรงของหืด ลดความจำเป็นในการใช้ corticosteroid และลดการกำเริบ ให้โดยฉีดใต้ผิวหนัง ข้อจำกัดคือราคาสูง' },

    { t:'qa', src:'สไลด์ 63–66',
      q:'ยา anti-IL-5 มีตัวใดบ้าง และเหมาะกับผู้ป่วยกลุ่มใด',
      points:['Mepolizumab, Benralizumab','ลด eosinophil โดยตรง เพราะ IL-5 เป็นตัวกระตุ้นหลักของ eosinophil','เหมาะกับ severe eosinophilic asthma'],
      a:'Mepolizumab และ benralizumab ลด eosinophil โดยตรง (IL-5 เป็นตัวกระตุ้นหลักของ eosinophil) จึงเหมาะกับ severe eosinophilic asthma' },

    { t:'qa', src:'สไลด์ 63–66',
      q:'ยา anti-IL-4/IL-13 มีตัวใดบ้าง และออกฤทธิ์ที่จุดใด',
      points:['Dupilumab, Lebrikizumab','บล็อกที่ตัวรับ IL-4R alpha / IL-13R alpha','ซึ่งส่งสัญญาณผ่าน transcription factor STAT-6'],
      a:'Dupilumab และ lebrikizumab บล็อกที่ตัวรับ IL-4Ralpha/IL-13Ralpha ซึ่งส่งสัญญาณผ่าน transcription factor <b>STAT-6</b>' },

    { t:'fill', src:'สไลด์ 63–66', accept:['tezepelumab'],
      q:'ยา anti-TSLP ที่บล็อกสารตั้งต้นซึ่งกระตุ้น T2 inflammation ทั้งวงจร คือ ______',
      a:'<b>Tezepelumab</b> — ต้าน thymic stromal lymphopoietin (TSLP) ส่วน anti-IL-33 คือ itepekimab' },

    { t:'qa', src:'สไลด์ 67',
      q:'ยากลุ่มใหม่ที่กำลังพัฒนาสำหรับ COPD และโรคทางเดินหายใจมีอะไรบ้าง',
      points:['PDE-4 inhibitor รุ่นใหม่: roflumilast, apremilast, cilomilast, tofimilast','Ensifentrine ยับยั้งทั้ง PDE-3 และ PDE-4','CRTh2 antagonist บล็อกตัวรับ chemotactic factor ของ Th2','Endothelin receptor antagonist เช่น bosentan (ใช้ใน pulmonary hypertension)'],
      a:'PDE-4 inhibitor รุ่นใหม่ (roflumilast, apremilast, cilomilast, tofimilast), ensifentrine (ยับยั้ง PDE-3 และ PDE-4 พร้อมกัน), CRTh2 antagonist และ endothelin receptor antagonist เช่น bosentan' },

    { t:'qa', src:'สไลด์ 61–67',
      q:'ยาชีวภาพ (biologics) ต่างจาก corticosteroid ในเชิงหลักการอย่างไร',
      points:['Biologics เป็น targeted therapy เจาะจง cytokine/chemokine ตัวใดตัวหนึ่ง','Corticosteroid ออกฤทธิ์กว้าง กดยีนอักเสบหลายทาง','Biologics ใช้ในผู้ป่วยหืดรุนแรงที่คุมด้วยยามาตรฐานไม่ได้'],
      a:'Biologics เป็น targeted therapy ที่เจาะจง cytokine/chemokine ตัวใดตัวหนึ่งในวงจร T2 inflammation ต่างจาก corticosteroid ที่กดการอักเสบอย่างกว้าง จึงสงวนไว้สำหรับหืดรุนแรงหรือ COPD ที่กำเริบบ่อย' },

    { t:'mcq', src:'สไลด์ 61–66', correct:3,
      q:'ผู้ป่วย severe eosinophilic asthma ที่ยังกำเริบบ่อยแม้ใช้ ICS/LABA เต็มที่ ยาชีวภาพกลุ่มใดตรงเป้าที่สุด',
      choices:['Anti-IgE (omalizumab)','Anti-TSLP (tezepelumab)','Anti-IL-13 (lebrikizumab)','Anti-IL-5 (mepolizumab หรือ benralizumab)'],
      a:'IL-5 เป็นตัวกระตุ้นหลักของ eosinophil การบล็อก IL-5 จึงลด eosinophil โดยตรง ตรงเป้าที่สุดกับ severe eosinophilic asthma' }
  ]
},

/* ============ 13. GINA & GOLD ============ */
{
  id: 'guideline',
  name: 'แนวทาง GINA & GOLD',
  slides: 'สไลด์ 68–72',
  qs: [
    { t:'qa', src:'สไลด์ 68',
      q:'GINA ใช้วงจรการดูแลผู้ป่วยแบบ personalized asthma management อย่างไร',
      points:['Assess — ประเมิน','Adjust — ปรับยา','Review — ทบทวนผล','ทำซ้ำเป็นวงจรต่อเนื่อง'],
      a:'ใช้วงจร <b>Assess → Adjust → Review</b> ซ้ำเป็นวงจรต่อเนื่อง เพื่อปรับการรักษาให้เหมาะกับผู้ป่วยแต่ละราย' },

    { t:'qa', src:'สไลด์ 68–70',
      q:'GINA แบ่งการรักษาเป็น 2 track อะไรบ้าง ต่างกันอย่างไร',
      points:['Track 1 (แนะนำหลัก): ICS-formoterol เป็นทั้ง controller และ reliever (MART)','Track 2 (ทางเลือก): SABA เป็น reliever ร่วมกับ ICS เป็น controller','ทั้งสอง track ไล่ระดับตาม Step 1–5'],
      a:'<b>Track 1</b> (แนะนำเป็นหลัก) ใช้ ICS-formoterol เป็นทั้งยาควบคุมและยาบรรเทาในตัวเดียว (MART: Maintenance And Reliever Therapy) ตั้งแต่ Step 1 แบบ as-needed ถึง Step 5 · <b>Track 2</b> (ทางเลือก) ใช้ SABA เป็น reliever ร่วมกับ ICS ขนาดต่าง ๆ เป็น controller' },

    { t:'fill', src:'สไลด์ 68–70', accept:['mart','maintenance and reliever therapy'],
      q:'การใช้ ICS-formoterol เป็นทั้งยาควบคุมและยาบรรเทาอาการในตัวเดียว เรียกว่าแนวทาง ______',
      a:'<b>MART</b> = Maintenance And Reliever Therapy ซึ่งเป็นแกนของ GINA Track 1' },

    { t:'qa', src:'สไลด์ 70',
      q:'ทำไมแนวทางปัจจุบันจึงไม่แนะนำให้ใช้ SABA เดี่ยว ๆ โดยไม่มี ICS',
      points:['เสี่ยงต่อการกำเริบรุนแรง','เสี่ยงเสียชีวิต','SABA ไม่คุมการอักเสบซึ่งเป็นต้นเหตุ','ต้องมี ICS ควบคู่เสมอไม่ว่า track ไหน'],
      a:'เพราะ SABA บรรเทาอาการแต่ไม่คุมการอักเสบที่เป็นต้นเหตุ การใช้เดี่ยว ๆ จึงเสี่ยงต่อการกำเริบรุนแรงและเสียชีวิต แนวทางปัจจุบันจึงต้องมี ICS ควบคู่เสมอ' },

    { t:'qa', src:'สไลด์ 68–70',
      q:'ที่ Step 5 ของ GINA มีการเพิ่มยาอะไรบ้าง',
      points:['เพิ่ม LAMA','พิจารณายาชีวภาพ: anti-IgE, anti-IL5/5R, anti-IL4Ralpha, anti-TSLP'],
      a:'เพิ่ม LAMA และพิจารณายา biologic ได้แก่ anti-IgE, anti-IL5/5R, anti-IL4Ralpha และ anti-TSLP' },

    { t:'fill', src:'สไลด์ 71', accept:['0.7','<0.7','0.70','70%'],
      q:'เกณฑ์วินิจฉัย COPD ตาม GOLD คือ post-bronchodilator FEV1/FVC น้อยกว่า ______',
      a:'<b>FEV1/FVC น้อยกว่า 0.7</b> หลังให้ยาขยายหลอดลม ยืนยันภาวะอุดกั้นถาวร' },

    { t:'qa', src:'สไลด์ 71',
      q:'GOLD แบ่งระดับความรุนแรงตามสมรรถภาพปอด (spirometric grade) อย่างไร',
      points:['GOLD 1: FEV1 มากกว่าหรือเท่ากับ 80%','GOLD 2: 50–79%','GOLD 3: 30–49%','GOLD 4: น้อยกว่า 30%'],
      a:'GOLD 1 (FEV1 ≥80%), GOLD 2 (50–79%), GOLD 3 (30–49%), GOLD 4 (<30%) ของค่าที่คาดคะเน' },

    { t:'qa', src:'สไลด์ 71',
      q:'GOLD จัดกลุ่มผู้ป่วยเป็น A, B, E ด้วยเกณฑ์อะไร',
      points:['ใช้ประวัติการกำเริบต่อปี','กำเริบ 0–1 ครั้งและไม่นอนโรงพยาบาล = กลุ่ม A หรือ B','กำเริบ ≥2 ครั้งหรือเข้าโรงพยาบาล = กลุ่ม E','ร่วมกับความรุนแรงของอาการ (mMRC, CAT score)'],
      a:'ใช้จำนวนครั้งการกำเริบต่อปี (0–1 ครั้งไม่นอนโรงพยาบาล = A/B, ≥2 ครั้งหรือเข้าโรงพยาบาล = E) ร่วมกับความรุนแรงของอาการที่วัดด้วย mMRC หรือ CAT score' }
  ]
},

/* ============ 14. Allergic rhinitis & Common cold ============ */
{
  id: 'rhinitis',
  name: 'Allergic rhinitis & Common cold',
  slides: 'สไลด์ 73–74',
  qs: [
    { t:'qa', src:'สไลด์ 73',
      q:'พยาธิกำเนิดของ allergic rhinitis เป็นอย่างไร',
      points:['Immediate hypersensitivity type 1 เหมือน allergic asthma','Allergen เช่น ฝุ่น ละอองเกสร ขนสัตว์','IgE-mediated mast cell degranulation ที่เยื่อบุจมูก','ปล่อย histamine เป็นหลัก'],
      a:'เป็นปฏิกิริยา immediate hypersensitivity type 1 เช่นเดียวกับ allergic asthma โดย allergen กระตุ้นให้เกิด IgE-mediated mast cell degranulation ที่เยื่อบุจมูก ปล่อย <b>histamine</b> เป็นหลัก' },

    { t:'qa', src:'สไลด์ 73',
      q:'Common cold เกิดจากอะไร และแยกจาก allergic rhinitis ทางคลินิกอย่างไร',
      points:['เกิดจากการติดเชื้อไวรัส โดยเฉพาะ Coronavirus และ Rhinovirus','ไข้หวัดมักมีไข้ ส่วนภูมิแพ้มักไม่มีไข้','อาการอื่นคล้ายกันมาก: น้ำมูกไหล คัดจมูก จาม ไอ'],
      a:'Common cold เกิดจากการติดเชื้อไวรัส โดยเฉพาะ <b>Coronavirus</b> และ <b>Rhinovirus</b> อาการคล้าย allergic rhinitis มาก (น้ำมูกไหล คัดจมูก น้ำตาไหล จาม ไอ ปวดศีรษะ) แต่ไข้หวัดมักมีไข้ ส่วนภูมิแพ้มักไม่มีไข้' },

    { t:'qa', src:'สไลด์ 74',
      q:'ยาที่ใช้ใน allergic rhinitis และ common cold แบ่งเป็น 4 กลุ่มตามอาการอะไรบ้าง',
      points:['Antihistamines — คัน จาม น้ำมูกไหล น้ำตาไหล','Nasal decongestants — คัดจมูก','Antitussives — ไอแห้ง','Expectorants และ mucolytics — ไอมีเสมหะ'],
      a:'(1) <b>Antihistamines</b> แก้คัน จาม น้ำมูกไหล น้ำตาไหล (2) <b>Nasal decongestants</b> แก้คัดจมูก (3) <b>Antitussives</b> แก้ไอแห้ง (4) <b>Expectorants/Mucolytics</b> ช่วยขับและลดความเหนียวของเสมหะ' },

    { t:'mcq', src:'สไลด์ 73–74', correct:1,
      q:'ผู้ป่วยมาด้วยจาม น้ำมูกใสไหล คันจมูกและตา ไม่มีไข้ มีประวัติแพ้ฝุ่น ยาที่ตรงกลไกที่สุดคือข้อใด',
      choices:['Nasal decongestant ชนิดหยอดจมูก','Antihistamine (H1 antagonist)','Antitussive กลุ่ม opioid','Mucolytic เช่น acetylcysteine'],
      a:'อาการคัน จาม น้ำมูกไหล เกิดจาก histamine ที่หลั่งจาก mast cell จึงตอบสนองดีต่อ H1 antagonist (decongestant ใช้เมื่ออาการเด่นคือคัดจมูก)' }
  ]
},

/* ============ 15. Antihistamines ============ */
{
  id: 'antihist',
  name: 'Antihistamines (H1 antagonists)',
  slides: 'สไลด์ 75–79',
  qs: [
    { t:'qa', src:'สไลด์ 75',
      q:'Histamine ที่จับ H1 receptor ทำให้เกิดอาการอะไรบ้าง',
      points:['หลอดเลือดขยายตัว','เพิ่มการซึมผ่านของหลอดเลือด (บวมน้ำ)','คัน จาม น้ำมูกไหล'],
      a:'Histamine จาก mast cell จับ H1 receptor ที่เยื่อบุจมูก หลอดเลือดและปลายประสาท ทำให้หลอดเลือดขยายตัว เพิ่มการซึมผ่าน (บวมน้ำ) คัน จาม และน้ำมูกไหล' },

    { t:'qa', src:'สไลด์ 75–76',
      q:'Antihistamine รุ่นแรกมีคุณสมบัติทางเภสัชจลนศาสตร์อย่างไร และทำไมจึงง่วง',
      points:['ดูดซึมจากทางเดินอาหารเร็วและเกือบสมบูรณ์','ละลายในไขมันดี จึงผ่านเข้า CNS ได้ → ง่วงซึม','ออกฤทธิ์สูงสุดใน 1–2 ชั่วโมง ระยะเวลาสั้น 4–6 ชั่วโมง','เมตาบอลิซึมผ่าน CYP3A4 ที่ตับ'],
      a:'ดูดซึมเร็วและเกือบสมบูรณ์ <b>ละลายในไขมันได้ดี</b> จึงผ่านเข้าสมองทำให้ง่วงซึมเด่นชัด ออกฤทธิ์สูงสุดใน 1–2 ชั่วโมง ระยะเวลาออกฤทธิ์สั้นเพียง <b>4–6 ชั่วโมง</b> เมตาบอลิซึมผ่าน cytochrome P450 3A4' },

    { t:'qa', src:'สไลด์ 76',
      q:'ยา antihistamine รุ่นแรกมีตัวใดบ้าง (ตอบให้ได้อย่างน้อย 4 ตัว)',
      points:['Chlorpheniramine (CPM)','Diphenhydramine','Dimenhydrinate','Hydroxyzine / Brompheniramine / Cyclizine / Cyproheptadine'],
      a:'Dimenhydrinate, diphenhydramine, chlorpheniramine, brompheniramine, hydroxyzine, cyclizine, cyproheptadine (ตัวหลังมีฤทธิ์เพิ่มความอยากอาหารด้วย)' },

    { t:'qa', src:'สไลด์ 77',
      q:'Antihistamine รุ่นที่สองต่างจากรุ่นแรกอย่างไร และมียาตัวใดบ้าง',
      points:['ละลายในไขมันน้อยกว่า เข้า CNS ได้น้อย จึงง่วงน้อยกว่ามาก','ออกฤทธิ์ยาว 12–24 ชั่วโมง กินวันละครั้งได้','Fexofenadine, Loratadine, Cetirizine'],
      a:'ละลายในไขมันน้อยกว่า เข้า CNS ได้น้อย จึงง่วงน้อยกว่ามาก และออกฤทธิ์นาน <b>12–24 ชั่วโมง</b> กินวันละครั้งได้ ตัวอย่าง piperidine derivative ได้แก่ fexofenadine, loratadine, cetirizine' },

    { t:'qa', src:'สไลด์ 78',
      q:'ผลข้างเคียงของ antihistamine มีอะไรบ้าง',
      points:['ง่วงซึม (มากในรุ่นแรก)','ปากแห้ง คอแห้ง ไอ','น้ำหนักเพิ่ม (ketotifen, cyproheptadine)','ในเด็กอาจเกิดการกระตุ้นและชัก','หัวใจเต้นผิดจังหวะ, ความดันต่ำเมื่อลุกยืน'],
      a:'ง่วงซึม (เด่นในรุ่นแรก), ปากแห้ง คอแห้ง ไอ, น้ำหนักเพิ่ม (ketotifen, cyproheptadine), ในเด็กอาจเกิด excitation และชักได้, หัวใจเต้นผิดจังหวะ และ postural hypotension' },

    { t:'qa', src:'สไลด์ 78',
      q:'Drug interaction สำคัญของ antihistamine รุ่นที่ 2 คืออะไร',
      points:['ใช้ร่วมกับ ketoconazole หรือ erythromycin','เพิ่มความเสี่ยงพิษต่อหัวใจ (cardiac toxicity)','เพราะแย่งเมตาบอลิซึมผ่านเอนไซม์ตัวเดียวกัน'],
      a:'ยารุ่นที่ 2 บางตัวเมื่อใช้ร่วมกับ <b>ketoconazole</b> หรือ <b>erythromycin</b> อาจเพิ่มความเสี่ยง cardiac toxicity เพราะแย่งเมตาบอลิซึมผ่านเอนไซม์ตัวเดียวกัน' },

    { t:'mcq', src:'สไลด์ 78', correct:2,
      q:'เด็กเล็กได้รับ antihistamine รุ่นแรกเกินขนาด อาการที่ต้องระวังเป็นพิเศษคือข้อใด',
      choices:['ง่วงซึมลึกจนหลับยาวเหมือนผู้ใหญ่','ความดันโลหิตสูงวิกฤต','การกระตุ้นระบบประสาท (excitation) และชัก','หลอดลมหดเกร็งเฉียบพลัน'],
      a:'ในเด็ก antihistamine อาจทำให้เกิด excitation และชักได้ ตรงข้ามกับผู้ใหญ่ที่มักง่วงซึม' },

    { t:'mcq', src:'สไลด์ 75–77', correct:1,
      q:'ผู้ป่วยเป็นคนขับรถ ต้องการยาแก้ภูมิแพ้ที่ง่วงน้อยและกินวันละครั้ง ควรเลือกข้อใด',
      choices:['Chlorpheniramine','Loratadine','Diphenhydramine','Hydroxyzine'],
      a:'Loratadine เป็นรุ่นที่ 2 ละลายไขมันน้อย เข้า CNS น้อย จึงง่วงน้อย และออกฤทธิ์ 12–24 ชั่วโมง ส่วนอีก 3 ตัวเป็นรุ่นแรกที่ง่วงมาก' }
  ]
},

/* ============ 16. Nasal decongestants ============ */
{
  id: 'decong',
  name: 'Nasal decongestants',
  slides: 'สไลด์ 80–85',
  qs: [
    { t:'qa', src:'สไลด์ 81',
      q:'ยาลดอาการคัดจมูกออกฤทธิ์อย่างไร',
      points:['เป็น alpha-adrenergic agonist (sympathomimetic)','จับ alpha receptor บนกล้ามเนื้อเรียบของหลอดเลือด','เกิด vasoconstriction ทั้งหลอดเลือดแดงและดำ','เลือดไปเลี้ยงเยื่อบุจมูกลดลง อาการบวม/คัดจมูกลดลง'],
      a:'เป็น alpha-adrenergic agonist จับ alpha receptor บนกล้ามเนื้อเรียบของหลอดเลือด ทำให้เกิด <b>vasoconstriction</b> เลือดคั่งที่เยื่อบุจมูกลดลง อาการบวมและคัดจมูกจึงลดลง' },

    { t:'qa', src:'สไลด์ 81',
      q:'นอกจากหลอดเลือดจมูก ยากลุ่ม decongestant ยังมีผลต่อระบบใดอีก',
      points:['กล้ามเนื้อม่านตา → ม่านตาขยาย (mydriasis)','กล้ามเนื้อมดลูก','เมตาบอลิซึม → เพิ่มระดับกลูโคสในเลือด'],
      a:'มีผลหดกล้ามเนื้อเรียบอื่น ๆ ด้วย เช่น กล้ามเนื้อม่านตา (ทำให้ม่านตาขยาย) และมดลูก รวมทั้งเพิ่มระดับกลูโคสในเลือด' },

    { t:'qa', src:'สไลด์ 80',
      q:'Decongestant แบ่งตามโครงสร้างเป็นกลุ่มใดบ้าง และกลุ่มใดแรงกว่า',
      points:['Phenylethylamine: ephedrine, pseudoephedrine, phenylephrine, phenylpropanolamine','Imidazoline: naphazoline, tetrahydrozoline, oxymetazoline, xylometazoline','Imidazoline แรงกว่าและออกฤทธิ์นานกว่า'],
      a:'<b>Phenylethylamine derivatives</b>: ephedrine, pseudoephedrine, phenylephrine, phenylpropanolamine, propylhexedrine, methoxamine · <b>Imidazoline derivatives</b>: naphazoline, tetrahydrozoline, oxymetazoline, xylometazoline ซึ่งแรงกว่าและออกฤทธิ์นานกว่า' },

    { t:'qa', src:'สไลด์ 82',
      q:'เปรียบเทียบการให้ decongestant แบบเฉพาะที่กับแบบรับประทาน',
      points:['Topical (หยอด/พ่นจมูก): ออกฤทธิ์เฉพาะที่ เริ่มเร็ว แต่สั้น','Oral: ออกฤทธิ์ทั่วร่างกาย เริ่มช้ากว่าแต่นานกว่า','Topical เสี่ยง rebound congestion / Oral เสี่ยงผลข้างเคียงทั่วร่างกาย'],
      a:'<b>Topical</b> (naphazoline, xylometazoline, oxymetazoline) ออกฤทธิ์เฉพาะที่ เริ่มเร็วแต่ระยะสั้น · <b>Oral</b> (phenylpropanolamine, phenylephrine, pseudoephedrine) ออกฤทธิ์ทั่วร่างกาย เริ่มช้ากว่าแต่นานกว่า' },

    { t:'fill', src:'สไลด์ 83', accept:['5','5 วัน','5 days','ห้าวัน'],
      q:'Rebound congestion จากยาหยอด/พ่นจมูกมักเกิดเมื่อใช้ติดต่อกันนานกว่า ______ วัน',
      a:'<b>5 วัน</b> — หลอดเลือดปรับตัวขยายกลับเมื่อยาหมดฤทธิ์ ทำให้ต้องใช้ยาถี่ขึ้นเรื่อย ๆ วนเป็นวงจร' },

    { t:'qa', src:'สไลด์ 83',
      q:'ผลข้างเคียงเชิงระบบของ decongestant มีอะไรบ้าง',
      points:['นอนไม่หลับ กระสับกระส่าย','หัวใจเต้นเร็ว/ผิดจังหวะ ความดันโลหิตสูง','คลื่นไส้อาเจียน เหงื่อออก','กระตุ้นหูรูดกระเพาะปัสสาวะ','เกินขนาดมากอาจกดระบบประสาทจนโคม่า'],
      a:'นอนไม่หลับ กระสับกระส่าย หัวใจเต้นเร็วและผิดจังหวะ ความดันโลหิตสูง คลื่นไส้อาเจียน เหงื่อออก กระตุ้นหูรูดกระเพาะปัสสาวะ และถ้าเกินขนาดมากอาจกดระบบประสาทจนโคม่า' },

    { t:'mcq', src:'สไลด์ 83', correct:2,
      q:'เด็กเล็กได้รับ naphazoline หรือ tetrahydrozoline เกินขนาด อาการที่ต้องเฝ้าระวังคือข้อใด',
      choices:['ความดันโลหิตสูงวิกฤตอย่างเดียว','หลอดลมหดเกร็งรุนแรง','การกดระบบประสาทส่วนกลางจนถึงขั้นโคม่า','ภาวะโพแทสเซียมในเลือดต่ำ'],
      a:'ในเด็ก imidazoline เกินขนาดอาจกดระบบประสาทส่วนกลางจนถึงขั้นโคม่า ตรงข้ามกับผู้ใหญ่ที่มักถูกกระตุ้น' },

    { t:'qa', src:'สไลด์ 84',
      q:'ข้อควรระวัง/ข้อห้ามใช้ของ decongestant มีกลุ่มใดบ้าง และ drug interaction ที่สำคัญคืออะไร',
      points:['เบาหวาน, ต่อมไทรอยด์เป็นพิษ, ความดันโลหิตสูง, angina','ต่อมลูกหมากโต, ต้อหิน','เด็กและผู้สูงอายุต้องระวังเป็นพิเศษ','DI: MAOI, theophylline, tricyclic antidepressant'],
      a:'ระวังในผู้ป่วยเบาหวาน ต่อมไทรอยด์เป็นพิษ ความดันโลหิตสูง โรคหลอดเลือดหัวใจตีบ ต่อมลูกหมากโต ต้อหิน ผู้ที่ใช้ TCA รวมถึงเด็กและผู้สูงอายุ · <b>DI สำคัญ</b>: MAOI, theophylline, tricyclic antidepressant' }
  ]
},

/* ============ 17. Antitussives ============ */
{
  id: 'antituss',
  name: 'ยาระงับไอ (Antitussives)',
  slides: 'สไลด์ 86–91',
  qs: [
    { t:'qa', src:'สไลด์ 86, 88',
      q:'อธิบายวงจรการไอ (cough reflex) เป็นลำดับ',
      points:['Cough receptor ที่ทางเดินหายใจรับสัญญาณระคายเคือง','ส่งผ่าน sensory (afferent) fiber','ไปยัง cough center ที่ก้านสมอง (medulla)','ส่งกลับผ่าน motor (efferent) fiber ไปยังกล้ามเนื้อที่ใช้ไอ'],
      a:'Cough receptor ที่ทางเดินหายใจ → sensory (afferent) fiber → <b>cough center</b> ที่ medulla → motor (efferent) fiber → กล้ามเนื้อที่เกี่ยวข้องกับการไอ' },

    { t:'qa', src:'สไลด์ 88',
      q:'ยาระงับไอออกฤทธิ์ยับยั้งได้ที่ตำแหน่งใดบ้าง ยกตัวอย่างยาแต่ละตำแหน่ง',
      points:['ที่ cough center (ส่วนกลาง): opioid, dextromethorphan','ที่ cough receptor (ส่วนปลาย): benzonatate (local anesthetic)'],
      a:'(1) ยับยั้งที่ <b>cough center</b> — กลไกส่วนกลาง เช่น codeine, dextromethorphan (2) ยับยั้งที่ <b>cough receptor</b> — กลไกส่วนปลาย เช่น benzonatate ซึ่งเป็น local anesthetic' },

    { t:'qa', src:'สไลด์ 86',
      q:'ข้อบ่งใช้และข้อห้ามสำคัญของยาระงับไอคืออะไร',
      points:['ใช้กับไอแห้ง (dry cough)','ห้ามใช้เมื่อไอมีเสมหะมาก','เพราะการกดการไอจะทำให้เสมหะคั่งค้าง'],
      a:'ใช้กับ <b>ไอแห้ง</b> ที่ไม่มีอันตรายจากการสะสมของเสมหะ ถ้าไอมีเสมหะมาก การกดการไอจะทำให้เสมหะคั่งค้าง จึงเป็นข้อห้ามใช้ที่สำคัญ' },

    { t:'qa', src:'สไลด์ 87, 89',
      q:'Codeine ออกฤทธิ์ระงับไออย่างไร มีฤทธิ์อื่นอะไร และผลข้างเคียงคืออะไร',
      points:['กดศูนย์ควบคุมการไอที่ก้านสมอง (medulla)','ขนาดสูงมีฤทธิ์ระงับปวด','กดศูนย์ควบคุมการหายใจด้วย','ผลข้างเคียง: คลื่นไส้ อาเจียน ท้องผูก เสพติดเมื่อใช้ระยะยาว'],
      a:'Codeine กดศูนย์ควบคุมการไอที่ medulla ที่ขนาดสูงมีฤทธิ์ระงับปวด แต่ <b>กดศูนย์ควบคุมการหายใจ</b> ด้วย ผลข้างเคียงคือคลื่นไส้ อาเจียน ท้องผูก และเสพติดได้เมื่อใช้ระยะยาว' },

    { t:'qa', src:'สไลด์ 89',
      q:'เภสัชจลนศาสตร์และข้อควรระวังของ codeine คืออะไร',
      points:['ดูดซึมทางเดินอาหารดี ออกฤทธิ์ใน 15–30 นาที นาน 4–6 ชั่วโมง','เมตาบอลิซึมที่ตับ','ระวังในผู้ป่วยหืดและ COPD (เสี่ยงกดการหายใจซ้ำเติม)','ระวังในผู้ที่ใช้ยาจิตเวช แอลกอฮอล์ หรือ MAOI'],
      a:'ดูดซึมทางเดินอาหารดี ออกฤทธิ์ใน 15–30 นาที นาน 4–6 ชั่วโมง เมตาบอลิซึมที่ตับ ระวังในผู้ป่วยหืด/COPD เพราะกดการหายใจซ้ำเติม และระวังเมื่อใช้ร่วมกับยาจิตเวช แอลกอฮอล์ หรือ MAOI' },

    { t:'qa', src:'สไลด์ 90',
      q:'Dextromethorphan ออกฤทธิ์อย่างไร และมีข้อดีเหนือ codeine อย่างไร',
      points:['เป็น d-isomer ของ codeine','เพิ่ม threshold ของ cough center ผ่าน NMDA receptor antagonist และ opioid receptor antagonist','ระงับไอได้ดีเทียบเท่า codeine','ไม่มีฤทธิ์ระงับปวด ไม่เสพติด ไม่กดการหายใจ'],
      a:'เป็น d-isomer ของ codeine เพิ่ม threshold ของ cough center ผ่านการเป็น <b>NMDA receptor antagonist</b> และ opioid receptor antagonist ประสิทธิภาพเทียบเท่า codeine แต่ไม่มีฤทธิ์ระงับปวด ไม่เสพติด และไม่กดการหายใจ ออกฤทธิ์ใน 15–30 นาที นาน 5–6 ชั่วโมง' },

    { t:'qa', src:'สไลด์ 91',
      q:'Benzonatate ต่างจากยาระงับไอตัวอื่นอย่างไร',
      points:['เป็นอนุพันธ์ polyglycol','กลไกเป็น local anesthetic','ออกฤทธิ์ที่ stretch receptor และ cough receptor ในปอดโดยตรง (afferent pathway)','ประสิทธิภาพเทียบเท่า codeine ออกฤทธิ์ 15–20 นาที นาน 3–8 ชั่วโมง'],
      a:'Benzonatate เป็นอนุพันธ์ polyglycol ที่ออกฤทธิ์แบบ <b>local anesthetic</b> ที่ stretch receptor และ cough receptor ในปอดโดยตรง (บล็อก afferent pathway) ต่างจากตัวอื่นที่ออกฤทธิ์ที่สมอง ผลข้างเคียงน้อย (ปวดศีรษะ เวียนศีรษะ ท้องผูก และกระตุ้น CNS ถ้าขนาดสูง)' },

    { t:'qa', src:'สไลด์ 91',
      q:'Noscapine และ Levopropoxyphene napsylate มีประสิทธิภาพอย่างไรเทียบกับ codeine',
      points:['Noscapine: อนุพันธ์ alkaloid จากฝิ่น ประสิทธิภาพเทียบเท่า codeine','Levopropoxyphene napsylate: ฤทธิ์น้อยกว่า codeine'],
      a:'Noscapine เป็น alkaloid จากฝิ่น ระงับไอได้เทียบเท่า codeine ส่วน levopropoxyphene napsylate มีฤทธิ์น้อยกว่า codeine' },

    { t:'mcq', src:'สไลด์ 86–90', correct:3,
      q:'ผู้ป่วย COPD มีอาการไอแห้งรบกวนการนอน ต้องการยาระงับไอที่เสี่ยงกดการหายใจน้อยที่สุด ควรเลือกข้อใด',
      choices:['Codeine','Hydrocodone','Hydromorphone','Dextromethorphan'],
      a:'Dextromethorphan ระงับไอได้เทียบเท่า codeine แต่ไม่กดการหายใจและไม่เสพติด จึงปลอดภัยกว่าในผู้ป่วยหืด/COPD (แต่ยังต้องระวังเมื่อใช้ร่วมกับยากดประสาทส่วนกลาง)' }
  ]
},

/* ============ 18. Expectorants & Mucolytics ============ */
{
  id: 'mucus',
  name: 'Expectorants & Mucolytics',
  slides: 'สไลด์ 92–99',
  qs: [
    { t:'qa', src:'สไลด์ 92',
      q:'Expectorant กับ Mucolytic ต่างกันอย่างไร',
      points:['Expectorant: เพิ่มปริมาณสารคัดหลั่งและทำให้มูกใสขึ้น ช่วยให้ไอขับออกง่าย','Mucolytic: เปลี่ยนคุณสมบัติทางเคมีฟิสิกส์ของมูก ทำให้ความหนืดลดลงโดยตรง','ทั้งคู่ใช้กับไอแบบมีเสมหะ (productive cough)'],
      a:'<b>Expectorant</b> เพิ่มปริมาณสารคัดหลั่งของหลอดลมและทำให้มูกใสขึ้น ช่วยให้เสมหะเคลื่อนตัวและถูกขับออกด้วยการไอ · <b>Mucolytic</b> เปลี่ยนคุณสมบัติทางเคมีฟิสิกส์ของมูกให้ความหนืดลดลงโดยตรง' },

    { t:'qa', src:'สไลด์ 93–94',
      q:'Guaifenesin ออกฤทธิ์อย่างไร',
      points:['กระตุ้นตัวรับที่กระเพาะอาหาร (gastric receptor)','กระตุ้น gastropulmonary mucokinetic vagal reflex','เพิ่มปริมาณสารคัดหลั่งที่เหลว','ไอขับเสมหะเหนียวออกง่ายขึ้น'],
      a:'กระตุ้น gastric receptor → กระตุ้น <b>gastropulmonary mucokinetic vagal reflex</b> → เพิ่มสารคัดหลั่งที่เหลวขึ้น ทำให้ไอขับเสมหะเหนียวออกได้ง่าย และการไอลดลงเมื่อเสมหะถูกขับหมด ผลข้างเคียงคือคลื่นไส้อาเจียนและระบบทางเดินอาหารแปรปรวน' },

    { t:'qa', src:'สไลด์ 95',
      q:'Potassium iodide ออกฤทธิ์อย่างไร และมีความเสี่ยงอะไร',
      points:['กลไกคล้าย guaifenesin — เพิ่ม gastropulmonary mucokinetic vagal reflex','ความเสี่ยงพิษจากไอโอไดด์: เลือดออกในทางเดินอาหาร หัวใจเต้นผิดจังหวะ','ภาวะไทรอยด์ต่ำ คอพอก และ iodism','DI: potassium-sparing diuretic, ยาต้านไทรอยด์'],
      a:'กลไกคล้าย guaifenesin คือเพิ่ม gastropulmonary mucokinetic vagal reflex แต่เสี่ยง <b>iodide toxicity</b> ได้แก่ เลือดออกในทางเดินอาหาร หัวใจเต้นผิดจังหวะ ไทรอยด์ต่ำ คอพอก และ iodism · ระวังในผู้ป่วยไทรอยด์เป็นพิษ โรคปอด โรคหัวใจ โรคไต และหญิงตั้งครรภ์' },

    { t:'qa', src:'สไลด์ 96',
      q:'หลักการของ mucolytics คืออะไร และมียาตัวใดบ้าง',
      points:['ทำลายพันธะไดซัลไฟด์ (disulfide bond) ระหว่างสาย glycoprotein ในมูก','โครงสร้างร่างแหของมูกหลวมลง มูกใสและหนืดน้อยลง','Bromhexine, Ambroxol, Acetylcysteine, Carbocisteine'],
      a:'เปลี่ยนคุณสมบัติทางเคมีฟิสิกส์ของสารคัดหลั่ง โดยเฉพาะการทำลาย <b>disulfide bond</b> ระหว่างสาย glycoprotein ในมูก ทำให้โครงสร้างร่างแหหลวมลง ยาหลักได้แก่ bromhexine, ambroxol, acetylcysteine, carbocisteine' },

    { t:'qa', src:'สไลด์ 97',
      q:'Bromhexine และ Ambroxol ต่างกันอย่างไร และ Ambroxol มีจุดเด่นพิเศษอะไร',
      points:['Bromhexine: ย่อยสลาย acidic mucopolysaccharide และกระตุ้นต่อม serous ให้หลั่งเพิ่ม','Ambroxol: เป็นเมแทบอไลต์หลักของ bromhexine ใช้ใน chronic bronchitis','Ambroxol มี surfactant effect ลดแรงตึงผิว ป้องกันถุงลมแฟบ'],
      a:'Bromhexine ย่อยสลาย acidic mucopolysaccharide และกระตุ้นเซลล์ต่อม serous ให้หลั่งเพิ่ม ความหนืดจึงลดลง · <b>Ambroxol</b> เป็นเมแทบอไลต์หลักของ bromhexine ใช้ในหลอดลมอักเสบเรื้อรัง และมี <b>surfactant effect</b> ลดแรงตึงผิว ช่วยป้องกันไม่ให้ถุงลมแฟบตอนหายใจออกสุด' },

    { t:'qa', src:'สไลด์ 98',
      q:'Acetylcysteine ออกฤทธิ์อย่างไร ทำงานดีที่สุดในสภาวะใด และมีผลข้างเคียงสำคัญอะไร',
      points:['เป็นอนุพันธ์ของกรดอะมิโน L-cysteine','ทำลายพันธะไดซัลไฟด์ระหว่าง mucoprotein โดยตรง (reducing agent)','ออกฤทธิ์ดีที่สุดที่ pH สูง 7–9','กระตุ้นให้เกิด bronchospasm โดยเฉพาะในผู้ป่วยหืด'],
      a:'เป็นอนุพันธ์ของ L-cysteine ทำหน้าที่เป็น <b>reducing agent</b> ทำลาย disulfide bond ระหว่าง mucoprotein โดยตรง ออกฤทธิ์ดีที่สุดที่ pH 7–9 ผลข้างเคียงสำคัญคือกระตุ้น <b>bronchospasm</b> โดยเฉพาะในผู้ป่วยหืด รวมถึงระบบทางเดินอาหารแปรปรวนและผื่นคัน' },

    { t:'qa', src:'สไลด์ 99',
      q:'Carbocisteine ต่างจาก acetylcysteine อย่างไร',
      points:['ออกฤทธิ์แบบ mucoregulatory — แทรกแซงการสังเคราะห์มูกตั้งแต่ต้นทาง','ทำให้ร่างกายสร้างมูกที่หนืดน้อยกว่าเดิม','ไม่ใช่ reducing agent จึงไม่ทำลาย disulfide bond','ช่วยลดการอักเสบของเยื่อบุหลอดลมด้วย'],
      a:'Carbocisteine เป็น <b>mucoregulator</b> คือไปแทรกแซงการสังเคราะห์มูกตั้งแต่ต้นทาง ทำให้สร้างมูกที่หนืดน้อยลง (แทนที่จะสลายมูกที่มีอยู่แล้ว) และช่วยลดการอักเสบของเยื่อบุหลอดลม ไม่ใช่ reducing agent · ระวังในผู้ป่วยแผลในกระเพาะอาหาร' },

    { t:'mcq', src:'สไลด์ 98', correct:1,
      q:'ผู้ป่วยหืดที่มีเสมหะเหนียว ต้องระวังยา mucolytic ตัวใดเป็นพิเศษเพราะอาจกระตุ้น bronchospasm',
      choices:['Carbocisteine','Acetylcysteine','Ambroxol','Guaifenesin'],
      a:'Acetylcysteine กระตุ้นให้เกิด bronchospasm ได้ โดยเฉพาะในผู้ป่วยหืด' }
  ]
},

/* ============ 19. Pulmonary arterial hypertension ============ */
{
  id: 'pah',
  name: 'Pulmonary arterial hypertension',
  slides: 'สไลด์ 100',
  qs: [
    { t:'qa', src:'สไลด์ 100',
      q:'PAH เกิดจากอะไร และนำไปสู่ภาวะใดในระยะท้าย',
      points:['การเพิ่มจำนวนเซลล์ผิดปกติของหลอดเลือดปอด (vascular proliferation)','แรงต้านในหลอดเลือดปอดเพิ่มขึ้น','ระยะท้ายเกิดภาวะหัวใจซีกขวาล้มเหลว (right heart failure)'],
      a:'เกิดจาก vascular proliferation ของหลอดเลือดปอดและแรงต้านในหลอดเลือดปอดที่เพิ่มขึ้น ซึ่งนำไปสู่ <b>right heart failure</b> ในระยะท้าย' },

    { t:'qa', src:'สไลด์ 100',
      q:'ยารักษา PAH กลุ่ม selective pulmonary vasodilator มีอะไรบ้าง',
      points:['Endothelin receptor antagonist: Bosentan, Ambrisentan','PDE-5 inhibitor'],
      a:'<b>Endothelin receptor antagonist</b> เช่น bosentan และ ambrisentan รวมถึงกลุ่ม <b>PDE-5 inhibitor</b> ซึ่งกลไกคล้ายยารักษาหย่อนสมรรถภาพทางเพศ แต่ใช้ขยายหลอดเลือดปอดโดยเฉพาะ' },

    { t:'mcq', src:'สไลด์ 100', correct:0,
      q:'Bosentan จัดอยู่ในยากลุ่มใด',
      choices:['Endothelin receptor antagonist','PDE-4 inhibitor','Leukotriene receptor antagonist','Muscarinic antagonist'],
      a:'Bosentan เป็น endothelin receptor antagonist ใช้ในภาวะความดันหลอดเลือดปอดสูง' }
  ]
},

/* ============ 20. ภาพรวมเชื่อมโยง ============ */
{
  id: 'bigpic',
  name: 'สรุปเชื่อมโยง (Big picture)',
  slides: 'ตารางสรุป & Big picture',
  qs: [
    { t:'qa', src:'Big picture 1',
      q:'สรุปว่าหลอดลมถูกควบคุมด้วยสองระบบตรงข้ามกันอย่างไร และยาขยายหลอดลมทุกตัวพยายามทำอะไร',
      points:['Sympathetic: beta2 → cAMP → คลายตัว','Parasympathetic: M3 → หดตัว','ยาขยายหลอดลมพยายามเอียงสมดุลไปทาง cAMP สูง / ACh ต่ำ'],
      a:'Sympathetic (beta2 → cAMP → คลายตัว) ตรงข้ามกับ parasympathetic (M3 → หดตัว) ยาขยายหลอดลมทุกตัวคือการเอียงสมดุลไปทาง cAMP สูงหรือ ACh ต่ำ ไม่ว่าจะโดย beta2-agonist, PDE inhibitor หรือ antimuscarinic' },

    { t:'qa', src:'Big picture 2–3',
      q:'เรียงลำดับวิวัฒนาการของยาต้านการอักเสบจากกว้างไปแคบ พร้อมตัวอย่าง',
      points:['Corticosteroid — บล็อกกว้างที่สุด (phospholipase, กดยีนอักเสบผ่าน HDAC2)','LTRA — บล็อกเฉพาะตัวรับ CysLT1 เช่น montelukast','Biologics — บล็อกเฉพาะ cytokine ตัวเดียว เช่น anti-IL5, anti-IgE'],
      a:'จากกว้างไปแคบ: <b>corticosteroid</b> (กดยีนอักเสบทั้งวง) → <b>leukotriene modifier</b> (บล็อกเฉพาะเส้นทาง 5-LO/CysLT1) → <b>biologics</b> (บล็อกเฉพาะ cytokine ตัวเดียว เช่น IL-5, IgE, TSLP)' },

    { t:'qa', src:'ตารางสรุป',
      q:'จับคู่กลไกกับกลุ่มยาให้ครบ: ยับยั้ง PDE + ต้าน adenosine / บล็อก M3 / กดยีนอักเสบผ่าน HDAC2 / บล็อก CysLT1',
      points:['ยับยั้ง PDE + ต้าน adenosine = Methylxanthine (theophylline)','บล็อก M3 = SAMA/LAMA (ipratropium, tiotropium)','กดยีนอักเสบผ่าน HDAC2 = ICS (budesonide, fluticasone)','บล็อก CysLT1 = LTRA (montelukast)'],
      a:'Methylxanthine = ยับยั้ง PDE + ต้าน adenosine · SAMA/LAMA = บล็อก M3 · ICS = กดยีนอักเสบผ่าน HDAC2 · LTRA = บล็อก CysLT1 receptor' },

    { t:'qa', src:'ตารางสรุป',
      q:'สรุปการเลือกยาตามลักษณะอาการไอ: ไอแห้ง vs ไอมีเสมหะ',
      points:['ไอแห้ง: antitussive — codeine (กด cough center), dextromethorphan, benzonatate','ไอมีเสมหะ: expectorant (guaifenesin, KI) และ mucolytic (bromhexine, acetylcysteine, carbocisteine)','ห้ามกดการไอเมื่อมีเสมหะมาก'],
      a:'<b>ไอแห้ง</b> ใช้ยาระงับไอ (codeine, dextromethorphan, benzonatate) · <b>ไอมีเสมหะ</b> ใช้ expectorant (guaifenesin, KI) หรือ mucolytic (bromhexine, ambroxol, acetylcysteine, carbocisteine) และห้ามกดการไอเพราะจะทำให้เสมหะคั่ง' }
  ]
}

];

/* ให้ใช้ได้ทั้งในเบราว์เซอร์และใน Node (สำหรับทดสอบคลังคำถาม) */
if (typeof module !== 'undefined' && module.exports) module.exports = { TOPICS };
