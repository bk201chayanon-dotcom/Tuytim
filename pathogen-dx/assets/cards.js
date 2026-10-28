/* ------------------------------------------------------------------
 * cards.js — เนื้อหาการ์ดทั้งหมด (แก้ไขการ์ดที่ไฟล์นี้ไฟล์เดียว)
 *
 * สรุปจากสไลด์บรรยาย Viral diseases 69, Bacterial disease 69,
 * Parasitic infection และโจทย์เก่า MED23–MED29 (หัวข้อ 5–7)
 *
 * รูปแบบการ์ด
 *   id     รหัสถาวรของการ์ด ใช้เก็บความคืบหน้า — ห้ามเปลี่ยนเมื่อมีผู้ใช้แล้ว
 *   g      รหัสหัวข้อย่อย (ดู groups ของแต่ละสำรับ)
 *   clue   ด้านหน้า: อาการ + keyword ที่ใช้วินิจฉัย (<b> = keyword สำคัญ)
 *   org    ด้านหลัง: ชื่อเชื้อ (<i> = ชื่อวิทยาศาสตร์แบบ binomial)
 *   dz     โรค / กลุ่มเชื้อ
 *   keys   ข้อมูลสำคัญที่มักออกสอบ
 *   exam   โจทย์เก่าที่ใช้เชื้อนี้เป็นคำตอบ เช่น 'MED23-10' = MED23 ข้อ 10
 *   src    หน้าใน PDF สไลด์ของสำรับนั้น
 *   hl     true = ข้อความนี้ถูกไฮไลต์ไว้ในชีท Parasite
 *   k      รหัสเชื้อ ใช้กันไม่ให้เชื้อเดียวกันโผล่เป็นตัวลวงในโหมด 5 ตัวเลือก
 *   opt    ชื่อเชื้อแบบสั้นสำหรับตัวเลือก (ถ้าไม่ระบุใช้ org)
 *   mcq    false = ไม่ใช้การ์ดนี้ในโหมด 5 ตัวเลือก (การ์ดสรุป/ตีความผลแล็บ)
 * ------------------------------------------------------------------ */

const PDX_DECKS = [
  /* ================================================================
   * VIRAL
   * ================================================================ */
  {
    id: 'viral',
    name: 'Viral',
    th: 'ไวรัส',
    code: 'V',
    lecture: 'Viral diseases 69',
    groups: {
      resp: 'ทางเดินหายใจ',
      kids: 'ไข้ออกผื่น · โรคเด็ก',
      skin: 'ตุ่มน้ำ · ผิวหนัง',
      cns: 'สมอง · ยุงนำโรค',
      mono: 'IM · HIV · ภูมิต่ำ',
      liver: 'ทางเดินอาหาร · ตับ'
    },
    cards: [
      {
        id: 'v-flu', g: 'resp',
        clue: 'ไข้<b>เฉียบพลันทันที</b> + <b>ปวดกล้ามเนื้อ ปวดศีรษะ อ่อนเพลียมาก</b> ร่วมกับอาการหวัด (ฟักตัว ~2 วัน) — ระวัง <b>secondary bacterial pneumonia</b> และ <b>Reye syndrome</b>; รักษาด้วย <b>neuraminidase inhibitor</b>',
        org: 'Influenza virus (A, B)', opt: 'Influenza virus',
        dz: 'ไข้หวัดใหญ่ · Orthomyxoviridae, segmented (−)ssRNA',
        keys: [
          'แบ่ง subtype ตาม <b>HA และ NA</b>; Influenza B มี 2 clade คือ Yamagata และ Victoria',
          '<b>Antigenic drift</b> = point mutation สะสม · <b>Antigenic shift</b> = reassortment ของ genome segment (Influenza A ติดได้ทั้งนกและสัตว์เลี้ยงลูกด้วยนม)',
          'ภาวะแทรกซ้อน: secondary infection จาก <i>S. aureus</i>, <i>S. pneumoniae</i>; pericarditis, myocarditis, myositis, rhabdomyolysis, Reye syndrome, transverse myelitis, aseptic meningitis',
          'ยา: oseltamivir, peramivir, zanamivir (NA inhibitor) · <b>baloxavir</b> (cap-dependent endonuclease inhibitor)',
          'Rapid antigen test ไวน้อยกว่า molecular assay'
        ],
        src: 'หน้า 2–3'
      },
      {
        id: 'v-piv', g: 'resp',
        clue: 'เด็กเล็กมีไข้หวัดนำมา แล้ว<b>ไอเสียงก้อง (barking cough)</b> + <b>inspiratory stridor</b> = <b>croup (laryngotracheitis)</b> — ไวรัสที่เป็นสาเหตุเกือบ<b>ครึ่งหนึ่ง</b>ของ croup',
        org: 'Parainfluenza virus (PIV-1)', opt: 'Parainfluenza virus',
        dz: 'Croup · Paramyxoviridae',
        keys: [
          'Croup ส่วนใหญ่เกิดจาก <b>PIV-1</b> · bronchiolitis และ pneumonia ส่วนใหญ่เกิดจาก <b>PIV-3</b>',
          'มี 4 species; ฟักตัว 2–6 วัน; ~15% ลงทางเดินหายใจส่วนล่าง (มักในเด็ก)',
          'Severe LRTI ในเด็กเล็กและผู้สูงอายุ',
          'ไม่มียาจำเพาะ → supportive'
        ],
        src: 'หน้า 4'
      },
      {
        id: 'v-rsv', g: 'resp',
        clue: 'ทารก โดยเฉพาะ<b>คลอดก่อนกำหนด</b> หายใจเร็ว <b>wheezing</b> = <b>bronchiolitis</b>; พยาธิพบ <b>multinucleated syncytial cells</b> ที่มี <b>inclusion กลมสีชมพูในไซโทพลาสซึม</b>; เด็กกลุ่มเสี่ยงป้องกันด้วย <b>palivizumab</b>',
        org: 'Respiratory syncytial virus (RSV)', opt: 'Respiratory syncytial virus',
        dz: 'Bronchiolitis / pneumonia ในทารก · Pneumoviridae',
        keys: [
          'ติดต่อทาง <b>large droplets</b> จาก nasopharyngeal secretions',
          'รุนแรงที่สุดใน premature newborn เพราะ terminal airway แคบ; ผู้สูงอายุและผู้ป่วยภูมิต่ำก็รุนแรงได้; ติดซ้ำได้แต่มักเบากว่า',
          'แยกจาก Adenovirus: RSV = syncytia + inclusion <b>ในไซโทพลาสซึม</b> · Adeno = smudge cell inclusion <b>ในนิวเคลียส</b> (MED28 ข้อ 1 เฉลย Adenovirus)',
          'รักษา: supportive + O<sub>2</sub>; <b>ribavirin</b> (aerosol/IV)'
        ],
        src: 'หน้า 4–5'
      },
      {
        id: 'v-hmpv', g: 'resp',
        clue: 'ไวรัสทางเดินหายใจที่ติดได้<b>ทุกวัย</b> ส่วนใหญ่เป็น URTI หายเองหรือไม่มีอาการ แต่พบใน <b>13% ของ severe LRTI ในเด็กที่ต้องนอนโรงพยาบาล</b> (สหรัฐฯ); ไม่มียาจำเพาะ',
        org: 'Human metapneumovirus (hMPV)', opt: 'Human metapneumovirus',
        dz: 'Pneumoviridae (ญาติใกล้ชิดของ RSV)',
        keys: [
          'เด็กและผู้ใหญ่สุขภาพดีมักไม่มีอาการ หรือเป็น URTI ไม่รุนแรง',
          'รักษาแบบ supportive'
        ],
        src: 'หน้า 5'
      },
      {
        id: 'v-rhino', g: 'resp',
        clue: '<b>Common cold</b>: <b>น้ำมูกใสไหลมาก</b> หลังฟักตัว 2–3 วัน; ภาวะแทรกซ้อนที่พบบ่อยคือ <b>หูชั้นกลางอักเสบ (AOM)</b> และ<b>ไซนัสอักเสบ</b>',
        org: 'Rhinovirus',
        dz: 'Picornaviridae · สาเหตุอันดับ 1 ของหวัดธรรมดาทั่วโลก',
        keys: [
          'สาเหตุที่พบบ่อยที่สุดของ respiratory viral infection ทั่วโลก',
          '<b>Rhinovirus C</b> → severe LRTI ในเด็กเล็ก ผู้สูงอายุ ผู้ป่วยภูมิต่ำ และผู้มีโรคปอด เช่น <b>asthma</b>'
        ],
        src: 'หน้า 6'
      },
      {
        id: 'v-adeno-pcf', g: 'resp', k: 'adeno',
        clue: '<b>ระบาดในหอพักโรงเรียนประจำ / ค่ายทหาร / สระว่ายน้ำ</b>: ไข้ต่ำ + <b>เจ็บคอ</b> + <b>เยื่อบุตาอักเสบแบบ follicular ทั้งสองข้าง</b> + น้ำมูกใส, ต่อมน้ำเหลือง preauricular โต',
        org: 'Adenovirus',
        dz: 'Pharyngoconjunctival fever · Adenoviridae (dsDNA, ไม่มี envelope)',
        keys: [
          'ระบาดในที่แออัด เช่น <b>military recruits</b>; ติดต่อทาง aerosol droplet หรือ <b>direct conjunctival inoculation</b>',
          '<b>Keratoconjunctivitis (pink eye)</b> มีหรือไม่มีอาการหวัดก็ได้',
          'เด็ก: สาเหตุสำคัญของท้องเสีย (<b>species F type 40, 41</b>)',
          'ผู้ป่วยกลุ่มเสี่ยง → severe pneumonia'
        ],
        exam: ['MED29-10'],
        src: 'หน้า 6'
      },
      {
        id: 'v-adeno-smudge', g: 'resp', k: 'adeno',
        clue: 'เด็ก 2 ปี ไข้ต่ำ น้ำมูก หายใจเร็ว wheezing; ชิ้นเนื้อพบ <b>necrotizing bronchiolitis</b> และเซลล์เยื่อบุมี <b>basophilic intranuclear inclusion ขนาดใหญ่จนบดบังขอบนิวเคลียส (smudge cells)</b>',
        org: 'Adenovirus',
        dz: 'Necrotizing bronchitis / bronchiolitis · DNA virus',
        keys: [
          'Smudge cell = inclusion <b>ในนิวเคลียส สีม่วงน้ำเงิน</b> (basophilic) ± multinucleated giant cells',
          'แยกจาก <b>RSV</b>: syncytial cells + inclusion <b>ในไซโทพลาสซึม</b>',
          'แยกจาก <b>CMV</b>: เซลล์โตมาก + <b>owl’s eye</b> intranuclear inclusion + perinuclear halo'
        ],
        exam: ['MED28-1'],
        src: 'หน้า 6 · โจทย์เก่า'
      },
      {
        id: 'v-covid', g: 'resp',
        clue: 'ไอ ปวดศีรษะ ปวดกล้ามเนื้อ + <b>สูญเสียการรับกลิ่น/รส</b> ± ท้องเสีย; รายรุนแรง: pneumonia, <b>ARDS</b>, ลิ่มเลือดอุดตัน, <b>MIS-C</b> ที่คล้าย Kawasaki; lab: <b>lymphopenia</b>, CRP สูง',
        org: 'SARS-CoV-2',
        dz: 'COVID-19 · Coronaviridae (กล้อง EM เห็น spike รอบอนุภาคคล้ายมงกุฎ)',
        keys: [
          'ติดต่อทาง droplets, direct contact, aerosol และอาจ fecal-oral',
          'ระยะฟักตัวเฉลี่ย <b>5–6 วัน</b> (>97% มีอาการภายใน 14 วัน); ~40% ไม่มีอาการ; รุนแรง 15–20%',
          'R0: สายพันธุ์ดั้งเดิม 2.5 · Delta ~7 · Omicron สูงถึง ~10',
          'เสี่ยงรุนแรง: ผู้สูงอายุ เบาหวาน CKD โรคหัวใจ COPD อ้วน (BMI ≥30)',
          'Human coronavirus 7 สายพันธุ์ — 4 สายพันธุ์ทำให้หวัดธรรมดา (NL63, 229E, OC43, HKU1)'
        ],
        src: 'หน้า 50–52'
      },

      {
        id: 'v-measles', g: 'kids',
        clue: 'เด็กไม่ได้รับวัคซีน ไข้สูง + <b>3Cs: cough, coryza, conjunctivitis</b> → จุดขาวเล็กบนพื้นแดงที่กระพุ้งแก้มตรงฟันกรามล่าง (<b>Koplik spots</b>) → <b>ผื่น maculopapular เริ่มที่หน้า/หลังหู/ไรผม แล้วรวมกันลามลงลำตัวและแขนขา</b>',
        org: 'Measles virus (Measles morbillivirus)', opt: 'Measles virus',
        dz: 'หัด (Measles) · Paramyxoviridae, enveloped (−)ssRNA',
        keys: [
          'ติดง่ายมาก: ~<b>90%</b> ของคนไม่มีภูมิที่สัมผัสจะติด; droplet + aerosol; ฟักตัว 11–13 วัน',
          'พยาธิ: <b>Warthin-Finkeldey giant cells</b> (eosinophilic intranuclear + intracytoplasmic inclusions) ในต่อมน้ำเหลือง และอาจพบใน sputum',
          'ภาวะแทรกซ้อน: <b>giant cell pneumonia</b>, ท้องเสีย, encephalitis (APME, MIBE, <b>SSPE</b> — เกิดได้ถึง 15 ปีหลังติด), keratitis/ตาบอด (ขาดวิตามิน A)',
          'Dx: serum IgM (ไว 91% ใน 0–3 วันหลังผื่น → 100% เมื่อ >7 วัน), RT-PCR (throat/NP, urine, serum)',
          'รักษา: supportive + <b>vitamin A</b> + รักษา secondary bacterial infection'
        ],
        exam: ['MED23-10'],
        src: 'หน้า 8–10'
      },
      {
        id: 'v-rubella', g: 'kids',
        clue: 'ผื่น<b>สีชมพูละเอียด ไม่รวมกัน (non-coalescing)</b> เริ่มที่หน้า/คอ ลามทั้งตัวใน 24 ชม. และ<b>หายใน 3 วัน</b>; อาจมีจุดแดงที่เพดานอ่อน (<b>Forchheimer spots</b>); ถ้าแม่ติดไตรมาสแรก ทารกมี <b>ต้อกระจก + หูหนวก + หัวใจพิการ</b>',
        org: 'Rubella virus',
        dz: 'หัดเยอรมัน (German / three-day measles) · enveloped (+)ssRNA',
        keys: [
          'ติดต่อทาง droplet / direct contact กับสารคัดหลั่งจากโพรงจมูก',
          'แม่มักมีอาการเบาไม่จำเพาะ; ความพิการแต่กำเนิดสูงสุดเมื่อติด<b>ไตรมาสแรก (~85%)</b>',
          '<b>Congenital rubella syndrome</b>: ทารกตัวเล็ก (SGA) + <b>cataracts, sensorineural hearing loss, cardiac defects</b>',
          'ไม่มียาต้านไวรัสที่ได้ผล; CRS รักษาแบบประคับประคอง'
        ],
        src: 'หน้า 10–11'
      },
      {
        id: 'v-hhv6', g: 'kids',
        clue: 'ทารก/เด็กเล็ก <b>ไข้สูงหลายวัน พอไข้ลงผื่นขึ้น</b>: ผื่น macular/maculopapular <b>ไม่คัน กดจาง เริ่มที่ลำตัว</b> แล้วลามไปคอ หน้า แขนขา',
        org: 'Human herpesvirus 6 (HHV-6; HHV-7 พบน้อยกว่า)', opt: 'Human herpesvirus 6',
        dz: 'Roseola infantum / Exanthem subitum / <b>Sixth disease</b>',
        keys: [
          'ผื่นเริ่มที่<b>ลำตัว</b>แล้วลามออก (ต่างจากหัดที่เริ่มที่หน้าแล้วลามลง)',
          'Reactivation ใน <b>transplant recipient</b> → posttransplant fever, encephalitis, pneumonitis',
          'Dx: <b>qPCR</b> ในเลือด/CSF (ปริมาณไวรัสช่วยบอกความสำคัญทางคลินิกและติดตามการรักษา)'
        ],
        src: 'หน้า 11–12'
      },
      {
        id: 'v-b19', g: 'kids', k: 'b19',
        clue: 'เด็กไข้ต่ำ แล้วมี<b>ผื่นแดงสดที่แก้มสองข้างเหมือนถูกตบ (slapped cheek)</b> ตามด้วย<b>ผื่นลายร่างแห/ลูกไม้ (lacy, reticular)</b> ที่ลำตัวและแขนขา; ผู้ใหญ่มี<b>ปวดข้อ</b>',
        org: 'Parvovirus B19',
        dz: 'Erythema infectiosum (<b>Fifth disease</b>) · Parvoviridae (ssDNA)',
        keys: [
          'ชอบติดเชื้อ <b>erythroid progenitor cells</b> (ผ่าน P antigen)',
          'ผู้มี hemolytic anemia → <b>transient aplastic crisis</b>; ภูมิคุ้มกันต่ำ → <b>pure red cell aplasia</b> (ไขกระดูกพบ giant pronormoblasts)',
          'หญิงตั้งครรภ์ → <b>hydrops fetalis</b>, แท้ง (อยู่ในกลุ่ม TORCH: “Other”)'
        ],
        src: 'หน้า 12–13'
      },
      {
        id: 'v-b19-crisis', g: 'kids', k: 'b19',
        clue: 'ชาย 60 ปี เป็น <b>hereditary spherocytosis</b> ซีด อ่อนเพลีย เหนื่อยง่ายเฉียบพลัน; <b>normocytic anemia รุนแรง + absolute reticulocytopenia</b>; หลานชายเพิ่งหายจากไข้ที่มี<b>แก้มแดงและผื่นลายลูกไม้</b>',
        org: 'Parvovirus B19',
        dz: 'Transient aplastic crisis ในผู้ป่วย hemolytic anemia',
        keys: [
          'ไวรัสหยุดการสร้างเม็ดเลือดแดงชั่วคราว → คนที่ RBC อายุสั้นอยู่แล้ว (spherocytosis, sickle cell) ซีดลงเร็ว',
          'เบาะแส: reticulocyte ต่ำมาก + มีคนใกล้ชิดเป็น fifth disease'
        ],
        exam: ['MED29-9'],
        src: 'หน้า 12 · โจทย์เก่า'
      },
      {
        id: 'v-hfmd', g: 'kids', k: 'coxsackie',
        clue: 'เด็กเล็ก ไข้ + <b>ตุ่มน้ำ/แผลในปาก</b> + ผื่นหรือตุ่มน้ำที่<b>ฝ่ามือ ฝ่าเท้า</b> แขนขา และก้น',
        org: 'Coxsackievirus A16 / A6, Enterovirus A71', opt: 'Coxsackievirus / Enterovirus A71',
        dz: 'Hand-foot-and-mouth disease (HFMD) · Picornaviridae (Enterovirus)',
        keys: [
          'ภาวะแทรกซ้อนทางสมองและหัวใจ (พบน้อย) สัมพันธ์กับ <b>EV-A71</b> และ <b>Coxsackie A6</b>',
          'Enterovirus (Coxsackie B และ A) ทำให้ <b>acute myocarditis</b> ได้'
        ],
        src: 'หน้า 14–15'
      },
      {
        id: 'v-coxsackie-myo', g: 'kids', k: 'coxsackie',
        clue: 'เด็ก 4 ขวบ ไข้ + ตุ่มน้ำขอบแดงที่กระพุ้งแก้ม ฝ่ามือ ฝ่าเท้า → <b>2 สัปดาห์ต่อมา</b> ซึม เหนื่อย หัวใจเต้นเร็ว; echo พบ <b>LV hypokinesia (acute myocarditis)</b> — ไวรัสตัวเดียวที่อธิบายได้ทั้งผื่นและหัวใจ',
        org: 'Coxsackievirus',
        dz: 'HFMD ตามด้วย viral myocarditis',
        keys: [
          'Coxsackie B (และ A) เป็นสาเหตุสำคัญของ viral myocarditis',
          'HFMD เกิดจาก Coxsackie A16, A6 และ EV-A71'
        ],
        exam: ['MED27-13'],
        src: 'หน้า 14 · โจทย์เก่า'
      },
      {
        id: 'v-herpangina', g: 'kids', k: 'coxsackie',
        clue: 'เด็ก<b>ไข้สูงเฉียบพลัน</b> คอแดง + <b>ตุ่ม/แผลสีเหลืองเทาที่เจ็บในช่องปาก-คอหอย</b> แต่<b>ไม่มีผื่นที่ผิวหนัง</b> (มือเท้าปกติ)',
        org: 'Enterovirus (เช่น Coxsackievirus A)', opt: 'Enterovirus (Coxsackie A)',
        dz: 'Herpangina · Picornaviridae',
        keys: [
          'ต่างจาก HFMD ตรงที่<b>ไม่มี cutaneous lesion</b>',
          'สายพันธุ์ enterovirus ที่เป็นสาเหตุแตกต่างกันตามภูมิภาค'
        ],
        src: 'หน้า 14–15'
      },
      {
        id: 'v-mumps', g: 'kids',
        clue: 'เด็ก 10 ปี<b>ไม่ได้รับวัคซีน</b> ไข้ต่ำ + <b>ต่อมพาโรติดบวมเจ็บทั้งสองข้างจนมุมขากรรไกรหายไป</b> → 10 วันต่อมา<b>อัณฑะบวมเจ็บมาก</b>',
        org: 'Mumps virus',
        dz: 'คางทูม (Mumps) → orchitis · Paramyxoviridae',
        keys: [
          'ชายหลังวัยเจริญพันธุ์: orchitis (tunica albuginea บวมอักเสบ) → <b>testicular atrophy</b> และ<b>มีบุตรยาก</b>',
          'ไม่มีในสไลด์บรรยาย — มาจากโจทย์เก่า'
        ],
        exam: ['MED24-16'],
        src: 'โจทย์เก่า'
      },

      {
        id: 'v-varicella', g: 'skin', k: 'vzv',
        clue: 'เด็กไข้ต่ำ + ผื่น<b>คัน</b> เริ่มที่ลำตัว/หน้าแล้วกระจายออก; เห็น<b>ผื่นหลายระยะพร้อมกัน</b> (macule, papule, vesicle, crust) — ตุ่มน้ำใสบนฐานแดง “<b>dewdrops on a rose petal</b>”',
        org: 'Varicella-zoster virus (VZV, HHV-3)', opt: 'Varicella-zoster virus',
        dz: 'อีสุกอีใส (Varicella / chickenpox)',
        keys: [
          'ติดต่อทาง direct contact และสูดละอองจากผิวหนัง/น้ำในตุ่ม',
          'หลังติดเชื้อแฝงตัวที่ <b>sensory (dorsal root) ganglia</b> → กลับมาเป็น <b>herpes zoster</b>: ตุ่มน้ำเจ็บเรียงตาม dermatome ข้างเดียว',
          'Tzanck smear: multinucleated giant cells (เหมือน HSV)'
        ],
        exam: ['MED25-20'],
        src: 'หน้า 15–16'
      },
      {
        id: 'v-zoster', g: 'skin', k: 'vzv',
        clue: 'ผู้ใหญ่<b>ปวดแสบ/ชาตามแนว dermatome ข้างเดียว</b>นำมาก่อน แล้วมี<b>ตุ่มน้ำเป็นกลุ่มบนฐานแดง</b>; ถ้าขึ้นที่หน้าผาก เปลือกตา และ<b>ปลายจมูก (Hutchinson sign)</b> = เส้นประสาท V1',
        org: 'Varicella-zoster virus (reactivation)', opt: 'Varicella-zoster virus',
        dz: 'Herpes zoster (งูสวัด) / Herpes zoster ophthalmicus',
        keys: [
          'Reactivation จาก <b>trigeminal ganglion</b> → HZO; Hutchinson sign บอกว่าตามีโอกาสถูกเกี่ยวข้อง',
          'อาจมี cranial neuropathy / facial nerve palsy ร่วม',
          'ภาวะแทรกซ้อน: <b>postherpetic neuralgia</b>, โรคตา, meningoencephalitis, vasculitis',
          'ให้ยาต้านไวรัสเร็ว ลดความเสี่ยง postherpetic neuralgia'
        ],
        exam: ['MED23-11'],
        src: 'หน้า 15–16'
      },
      {
        id: 'v-ramsay', g: 'skin', k: 'vzv',
        clue: '<b>หน้าเบี้ยวข้างเดียว (ipsilateral facial paralysis)</b> + <b>ปวดหู</b> + <b>ตุ่มน้ำที่ใบหู/ช่องหู</b>',
        org: 'Varicella-zoster virus',
        dz: 'Ramsay Hunt syndrome (herpes zoster oticus) — geniculate ganglion ของ CN VII',
        keys: [
          'Triad: facial paralysis + otalgia + vesicles ใกล้หูและช่องหู'
        ],
        src: 'หน้า 17'
      },
      {
        id: 'v-hsv1', g: 'skin', k: 'hsv1',
        clue: '<b>ตุ่มน้ำใสเป็นกลุ่ม เจ็บ</b> ที่ขอบริมฝีปาก <b>กลับเป็นซ้ำเวลาเครียด</b>; ขูดก้นตุ่มทำ <b>Tzanck smear</b> พบ <b>multinucleated giant cells</b>',
        org: 'Herpes simplex virus type 1 (HSV-1)', opt: 'Herpes simplex virus type 1',
        dz: 'Herpes labialis (cold sore, เริมที่ปาก)',
        keys: [
          'HSV-1 ติดทางน้ำลายตั้งแต่เด็ก (non-sexual); primary: <b>gingivostomatitis</b> ในเด็ก, pharyngitis ในวัยรุ่น',
          'ส่วนใหญ่ไม่มีอาการ; เมื่อกลับเป็นซ้ำ = cold sore',
          'พยาธิ: <b>Cowdry type A</b> intranuclear inclusion (ชมพู-ม่วง) + <b>chromatin margination</b> + ballooning degeneration',
          'HSV-1, HSV-2, VZV ดูเหมือนกันทางพยาธิ ต้องแยกด้วยอาการ'
        ],
        exam: ['MED28-10'],
        src: 'หน้า 18–20'
      },
      {
        id: 'v-hsv2', g: 'skin', k: 'hsv2',
        clue: 'วัยรุ่น/ผู้ใหญ่หลังมีเพศสัมพันธ์: <b>ตุ่มน้ำและแผลเจ็บที่อวัยวะเพศ</b> กลับเป็นซ้ำได้ (เบากว่าครั้งแรก)',
        org: 'Herpes simplex virus type 2 (HSV-2)', opt: 'Herpes simplex virus type 2',
        dz: 'Genital herpes (เริมที่อวัยวะเพศ)',
        keys: [
          'ติดต่อทางเพศสัมพันธ์เป็นหลัก (ทับซ้อนกับ HSV-1 ได้)',
          'แม่สู่ลูกช่วงคลอด → <b>neonatal HSV</b> (encephalitis จาก HSV-2 ในทารกแรกเกิด)',
          'แยกแผลที่อวัยวะเพศ: chancroid เจ็บ ก้นสกปรก · syphilis ไม่เจ็บ'
        ],
        src: 'หน้า 18'
      },
      {
        id: 'v-molluscum', g: 'skin',
        clue: 'เด็กนักเรียน ตุ่ม<b>นูนรูปโดม สีเนื้อ ผิวมันวาว มีรอยบุ๋มตรงกลาง (central umbilication)</b> บีบแล้วได้<b>สารขาวข้นคล้ายเนยแข็ง</b> ไม่เจ็บ เป็นมา 6 เดือน เพื่อนที่โรงเรียนเป็นด้วย',
        org: 'Molluscum contagiosum virus',
        dz: 'หูดข้าวสุก · <b>Poxviridae</b>',
        keys: [
          'คนเป็น reservoir เดียว (หลังกำจัด smallpox); แบ่งตัวเฉพาะใน <b>epidermis</b>',
          'พบในเด็ก; ผู้ใหญ่ติดทางเพศสัมพันธ์ หรือเป็นกระจายมากในภูมิคุ้มกันต่ำ',
          'ขนาด 3–5 mm; วินิจฉัยทางคลินิก ± biopsy',
          'หายเองใน ~2 เดือน แต่การเกาทำให้ autoinoculation ยืดเป็น 8–13 เดือน',
          'Poxvirus จากสัตว์ที่ติดคนได้: monkeypox, cowpox, orf'
        ],
        exam: ['MED28-4'],
        src: 'หน้า 21–22'
      },
      {
        id: 'v-hpv-wart', g: 'skin', k: 'hpv',
        clue: 'ติดต่อทางเพศสัมพันธ์: รอยโรค<b>นูนเป็นตะปุ่มตะป่ำเหมือนดอกกะหล่ำ (verrucous, cauliflower)</b> ที่อวัยวะเพศ/รอบทวาร = <b>หูดหงอนไก่ (condyloma acuminata)</b>',
        org: 'Human papillomavirus type 6, 11 (low-risk)', opt: 'Human papillomavirus',
        dz: 'Anogenital warts · Papillomaviridae',
        keys: [
          'หูดทั่วไป: hyperkeratotic flesh-colored papules; ติดโดยการสัมผัส ส่วนใหญ่หายเอง',
          'Low-risk HPV ผ่านช่องคลอดตอนคลอด → <b>recurrent respiratory papillomatosis</b> ในเด็ก',
          'HPV-5, 8 (beta) → cutaneous SCC ในผู้ป่วย <b>epidermodysplasia verruciformis</b>'
        ],
        src: 'หน้า 21–23'
      },
      {
        id: 'v-hpv-ca', g: 'skin', k: 'hpv',
        clue: 'ไวรัสก่อมะเร็ง<b>ปากมดลูก</b> ทวารหนัก และ <b>oropharynx</b> ผ่าน oncoprotein <b>E6 ยับยั้ง p53</b> และ <b>E7 ยับยั้ง Rb</b>; คัดกรองมะเร็งปากมดลูกด้วยการตรวจหาเชื้อด้วย PCR',
        org: 'High-risk HPV (16, 18 …)', opt: 'Human papillomavirus',
        dz: 'Cervical / anogenital / oropharyngeal carcinoma',
        keys: [
          '>12 genotypes จัดเป็น group I carcinogen: 16, 18, 31, 33, 35, 39, 45, 51, 52, 56, 58, 59',
          'ผู้ติดเชื้อ HIV เสี่ยง malignant transformation สูงกว่าแม้ได้ ART',
          'hrHPV test เป็นหลักของโปรแกรมคัดกรองมะเร็งปากมดลูก'
        ],
        src: 'หน้า 21'
      },

      {
        id: 'v-hse', g: 'cns', k: 'hsv1',
        clue: 'ไข้เฉียบพลัน + <b>focal neurologic signs</b>: สับสน ชัก cranial nerve palsy <b>พูดและพฤติกรรมผิดปกติ</b>; CSF lymphocytic pleocytosis, protein สูง และ<b>เม็ดเลือดแดงสูงที่ไม่ลดลงในหลอดถัด ๆ ไป</b>',
        org: 'Herpes simplex virus type 1 (HSV-1)', opt: 'Herpes simplex virus type 1',
        dz: 'HSV encephalitis (HSE) — ทารกแรกเกิดอาจเกิดจาก HSV-2',
        keys: [
          'สาเหตุอันดับ 1 ของ <b>sporadic fatal encephalitis</b> ทั่วโลก',
          'Dx: <b>CSF PCR</b> (viral culture ไวเพียง ~5%)',
          'รักษา: <b>IV acyclovir</b>; ผู้รอดชีวิตราวครึ่งหนึ่งมีความพิการปานกลางถึงรุนแรง'
        ],
        src: 'หน้า 18'
      },
      {
        id: 'v-jev', g: 'cns',
        clue: '<b>ชาวนา</b> ไข้สูงเฉียบพลัน ปวดหัว อาเจียน → สับสน ชัก focal deficit movement disorder; วงจรโรคคือ <b>ยุงรำคาญ (Culex tritaeniorhynchus) — นกน้ำ — หมู (amplifying host)</b>',
        org: 'Japanese encephalitis virus (JEV)', opt: 'Japanese encephalitis virus',
        dz: 'Japanese encephalitis · <b>Flaviviridae</b>',
        keys: [
          'คนเป็น accidental host — viremia ต่ำ จึงแพร่ต่อไม่ได้ และ virus isolation/NAAT ไม่ไว',
          'Dx: <b>virus-specific IgM ใน CSF หรือ serum</b> (ตรวจพบได้ ~3 วันหลังเริ่มอาการ)',
          'CSF: lymphocytic pleocytosis, protein สูงเล็กน้อย, glucose ratio ปกติ',
          'อัตราตาย ~30%; ผู้รอด 30–50% มีความผิดปกติทางระบบประสาท สติปัญญา หรือจิตเวช'
        ],
        exam: ['MED29-20'],
        src: 'หน้า 24'
      },
      {
        id: 'v-nipah', g: 'cns',
        clue: 'ไข้ + <b>สมองอักเสบ และ/หรือ ปอดอักเสบรุนแรง</b> อัตราตาย 40–90%; ระบาดครั้งแรกปี 1999 ที่<b>มาเลเซีย-สิงคโปร์</b> ในคนที่<b>สัมผัสหมู</b>; แหล่งรังโรคคือ<b>ค้างคาวแม่ไก่ (Pteropus)</b>',
        org: 'Nipah virus (Henipavirus)', opt: 'Nipah virus',
        dz: 'Paramyxoviridae · zoonosis',
        keys: [
          'ติดต่อคนสู่คนจากการสัมผัสใกล้ชิดกับสารคัดหลั่งทางเดินหายใจและสารน้ำในร่างกาย',
          'Dx: serology, RT-PCR (ยังไม่แพร่หลาย)'
        ],
        src: 'หน้า 24'
      },
      {
        id: 'v-rabies', g: 'cns',
        clue: 'สมองอักเสบหลัง<b>ถูกสุนัข ค้างคาว หรือสัตว์ป่ากัด</b> (แค่สัมผัสน้ำลายก็ติดได้) <b>กลัวน้ำ กลัวลม</b>; สมองพบ <b>Negri bodies</b> = eosinophilic inclusion <b>ในไซโทพลาสซึมของ Purkinje cell</b>',
        org: 'Rabies virus',
        dz: 'โรคพิษสุนัขบ้า · Rhabdoviridae (Lyssavirus)',
        keys: [
          'ไวรัสเพิ่มจำนวนที่กล้ามเนื้อบริเวณแผล แล้วเดินทาง<b>ย้อนตามเส้นประสาท</b>เข้าสู่ CNS',
          'สัตว์นำโรค: สุนัข แมว ค้างคาว แรคคูน สุนัขจิ้งจอก'
        ],
        src: 'หน้า 25 · Bacteria หน้า 49'
      },
      {
        id: 'v-dengue', g: 'cns',
        clue: 'ไข้สูงลอย 2–7 วัน <b>หน้าแดง ปวดกระบอกตา</b> ปวดเมื่อยกล้ามเนื้อ <b>tourniquet test บวก</b> มี petechiae → <b>ไข้ลงแต่อาการแย่ลง</b>: ปวดท้อง อาเจียน <b>มือเท้าเย็น pulse pressure แคบ</b>; <b>Hct เพิ่ม ≥20%</b>, เกล็ดเลือด ~25,000, WBC ต่ำ',
        org: 'Dengue virus (DENV)', opt: 'Dengue virus',
        dz: 'Dengue hemorrhagic fever → Dengue shock syndrome · Flaviviridae, ยุงลาย (Aedes)',
        keys: [
          'หัวใจของ DHF = <b>plasma leakage</b> (Hct ↑ ≥20%, pleural effusion, ascites) → shock ใน <b>critical phase ช่วงไข้ลง</b>',
          'Spectrum: asymptomatic → undifferentiated fever (ทารก/เด็กเล็ก ไข้ + MP rash) → DF → DHF/DSS → expanded dengue syndrome (encephalitis, liver/renal failure)',
          'Dx: ไข้ 1–5 วัน → <b>NS1 antigen หรือ RT-PCR</b> · ไข้ >5 วันหรือไข้ลงแล้ว → IgM/IgG (paired sera)',
          'Probable dengue: หลังวันที่ 5 มี IgM บวกหรือ IgG สูงใน serum ครั้งเดียว'
        ],
        exam: ['MED27-22'],
        src: 'หน้า 26, 28–30'
      },
      {
        id: 'v-zika', g: 'cns',
        clue: 'ทารกแรกเกิด<b>ศีรษะเล็ก (microcephaly)</b> + <b>หินปูนในสมองแถว periventricular/subcortical</b> + แผลเป็นที่จอประสาทตา; แม่ช่วง<b>ไตรมาสแรก</b>ไปเขตร้อน มีผื่น ไข้ต่ำ ปวดกระบอกตาหลังยุงกัด',
        org: 'Zika virus (ZIKV)', opt: 'Zika virus',
        dz: 'Congenital Zika syndrome · Flaviviridae, ยุงลาย (Aedes)',
        keys: [
          'ติดต่อ: ยุง (หลัก), <b>เพศสัมพันธ์</b>, แม่สู่ลูก',
          'ผู้ใหญ่: ไข้ไม่รุนแรง 3–14 วันหลังติดเชื้อ; ภาวะแทรกซ้อน <b>Guillain-Barré syndrome</b>',
          'ไวรัสผ่านรกไปทำลาย <b>neural progenitor cells</b>',
          'Dx: RT-PCR ใน serum + urine (คู่กัน) สัปดาห์แรก และ IgM; ตรวจ TORCHS เพื่อแยกโรค'
        ],
        exam: ['MED27-12'],
        src: 'หน้า 26–27'
      },
      {
        id: 'v-chik', g: 'cns',
        clue: 'นักเดินทางกลับจากเขตร้อน: <b>ไข้สูง + ปวดข้อหลายข้ออย่างรุนแรง (severe polyarthralgia)</b> หลังฟักตัวเฉลี่ย 3 วันจากยุงลายกัด',
        org: 'Chikungunya virus (CHIKV)', opt: 'Chikungunya virus',
        dz: 'ไข้ปวดข้อยุงลาย · Togaviridae (alphavirus), ยุงลาย (Aedes)',
        keys: [
          'Dx: RT-PCR ในสัปดาห์แรก, IgM ตรวจพบหลังวันที่ 5',
          'DENV, ZIKV, CHIKV ใช้ยุงลายเหมือนกัน และอาการ/ระบาดวิทยาซ้อนกันมาก'
        ],
        src: 'หน้า 26–27'
      },

      {
        id: 'v-ebv', g: 'mono', k: 'ebv',
        clue: 'นักศึกษาปี 1 (<b>kissing disease</b>): อ่อนเพลีย ไข้ <b>เจ็บคอ ทอนซิลโตมีฝ้าขาว</b> + <b>ต่อมน้ำเหลืองคอด้านหลังโต</b> + <b>จุดเลือดออกที่เพดานอ่อน</b> + ม้ามโต; ได้ <b>amoxicillin แล้วผื่นขึ้น</b>',
        org: 'Epstein-Barr virus (EBV, HHV-4)', opt: 'Epstein-Barr virus',
        dz: 'Infectious mononucleosis (glandular fever)',
        keys: [
          'Triad: <b>pharyngitis + fever + lymphadenopathy</b>; ~90% ของ IM เกิดจาก primary EBV',
          'ติด oral epithelium และ <b>B cells</b>; แฝงตัวใน memory B cell แบบ episome',
          'Lab: lymphocytosis (>4,500/µL หรือ >50%) + <b>atypical lymphocytes >10%</b>',
          '<b>Heterophile antibody (IgM)</b> agglutinate RBC แกะ/ม้า (monospot) — ไว <40% ในเด็ก ≤4 ปี',
          'Serology: <b>VCA IgM</b> (หายใน ~3 เดือน), VCA IgG (อยู่ตลอดชีวิต), EBNA-1, EA',
          'รักษา supportive; ไม่ให้ steroid หรือ acyclovir ยกเว้นทางเดินหายใจอุดกั้นจึงให้ steroid'
        ],
        exam: ['MED28-5'],
        src: 'หน้า 31–33'
      },
      {
        id: 'v-ebv-ca', g: 'mono', k: 'ebv',
        clue: 'ไวรัสที่สัมพันธ์กับ <b>Burkitt lymphoma, Hodgkin lymphoma, nasopharyngeal carcinoma</b>, peripheral T-cell lymphoma, gastric carcinoma และ <b>PTLD</b> หลังปลูกถ่ายอวัยวะ',
        org: 'Epstein-Barr virus (EBV)', opt: 'Epstein-Barr virus',
        dz: 'Latent EBV → malignancies',
        keys: [
          'ผู้ป่วยปลูกถ่ายที่เสี่ยง PTLD ติดตามด้วย <b>qPCR viral load</b> ในเลือด'
        ],
        src: 'หน้า 32'
      },
      {
        id: 'v-cmv-cong', g: 'mono', k: 'cmv',
        clue: 'ทารกตัวเล็ก (SGA) + <b>microcephaly + chorioretinitis + หูหนวก (sensorineural hearing loss)</b>; แม่ติดเชื้อครั้งแรกหรือ reactivation ระหว่างตั้งครรภ์; ทารกส่วนใหญ่ (85–90%) <b>ไม่มีอาการตอนเกิด</b>',
        org: 'Cytomegalovirus (CMV, HHV-5)', opt: 'Cytomegalovirus',
        dz: 'Congenital CMV (cCMV)',
        keys: [
          'ติดต่อทางน้ำลายหรือปัสสาวะ; primary CMV ในผู้ใหญ่ = ไข้ไม่รุนแรง หรือ <b>mononucleosis-like</b>',
          'มีอาการตอนเกิดเพียง ~10–15%; 40–60% ของทารกที่มีอาการจะมีความพิการถาวร',
          'รักษาทารกที่มีอาการ (หรือไม่มีอาการแต่ภูมิคุ้มกันบกพร่อง) ด้วย <b>valganciclovir</b>'
        ],
        src: 'หน้า 34'
      },
      {
        id: 'v-cmv-tx', g: 'mono', k: 'cmv',
        clue: 'ผู้ป่วย<b>ปลูกถ่ายอวัยวะ</b> มีไข้ + <b>pneumonitis</b>/enteritis/hepatitis/<b>retinitis</b>; เซลล์ติดเชื้อ<b>ขยายใหญ่</b> มี <b>intranuclear inclusion แบบตานกฮูก (owl’s eye)</b> + perinuclear halo',
        org: 'Cytomegalovirus (CMV)', opt: 'Cytomegalovirus',
        dz: 'CMV disease ในผู้ป่วยปลูกถ่าย / ภูมิคุ้มกันต่ำ',
        keys: [
          'มักมาด้วย<b>ไข้ไม่ทราบสาเหตุ</b>ก่อน',
          'ป้องกัน reactivation ด้วย <b>ganciclovir / valganciclovir</b>; ใช้ viral load ชี้นำ preemptive therapy',
          'พบ inclusion ใหญ่ใน renal tubular epithelium ได้; CMV retinitis'
        ],
        src: 'หน้า 34–35'
      },
      {
        id: 'v-mono-other', g: 'mono', mcq: false,
        clue: 'อาการเหมือน infectious mononucleosis แต่<b>ไม่ใช่ EBV</b> (~10% ของ IM) — มีเชื้ออะไรบ้าง?',
        org: 'CMV · HHV-6 · HSV-1 · Adenovirus · HIV-1 · <i>S. pyogenes</i> · <i>Toxoplasma gondii</i>',
        dz: 'Mononucleosis-like illness',
        keys: [
          'ไวรัส: primary CMV, HHV-6, HSV-1, adenovirus, HIV-1 (acute)',
          'แบคทีเรีย: Group A β-hemolytic <i>Streptococcus pyogenes</i>',
          'ปรสิต: primary <i>Toxoplasma gondii</i>'
        ],
        src: 'หน้า 36'
      },
      {
        id: 'v-hiv', g: 'mono',
        clue: 'ระยะเฉียบพลันหลังติดเชื้อ: <b>ไข้ ต่อมน้ำเหลืองโต เจ็บคอ ผื่น น้ำหนักลด</b> (คล้าย mono); viremia สูงมาก ตรวจพบ <b>p24 antigen</b> ก่อนแอนติบอดี',
        org: 'Human immunodeficiency virus (HIV-1)', opt: 'Human immunodeficiency virus',
        dz: 'Acute retroviral syndrome · Retroviridae',
        keys: [
          'HIV-1 ระบาดทั่วโลก; HIV-2 พบน้อย จำกัดใน <b>West Africa</b>',
          '<b>Eclipse period</b> ~10 วัน = ก่อน NAAT ตรวจพบ · <b>Window period</b> = ก่อน immunoassay บวก (16 วันสำหรับ Ag/Ab combo, >3 สัปดาห์สำหรับ antibody-only)',
          'ระยะเฉียบพลัน viremia สูง → แพร่เชื้อได้ง่าย; 50–90% มี acute retroviral syndrome',
          'จากนั้นเข้าสู่ viral set point → latent phase; ไม่รักษา CD4 ลดลง → AIDS ใน ~10 ปี'
        ],
        src: 'หน้า 37–38'
      },
      {
        id: 'v-bk', g: 'mono',
        clue: 'ผู้ป่วย<b>ปลูกถ่ายไต</b>มี graft dysfunction จาก <b>nephropathy</b> หรือผู้ป่วยปลูกถ่ายไขกระดูก (HCT) มี <b>hemorrhagic cystitis</b>',
        org: 'BK polyomavirus',
        dz: 'Polyomavirus ในผู้ป่วยภูมิคุ้มกันต่ำ',
        keys: [
          'พบได้ถึง 15% ของผู้ป่วยปลูกถ่ายไต',
          'ติดตามด้วย <b>qPCR viral load ใน plasma</b> (สัมพันธ์กับการเกิด nephropathy)'
        ],
        src: 'หน้า 50'
      },
      {
        id: 'v-jc', g: 'mono',
        clue: 'ผู้ป่วยภูมิคุ้มกันต่ำ (เช่น HIV หลังเริ่ม ART) มี <b>focal neurologic deficit</b> ค่อยเป็นค่อยไป: แขนขาอ่อนแรง hemiparesis aphasia จาก <b>focal demyelination</b>',
        org: 'JC polyomavirus (John Cunningham virus)', opt: 'JC polyomavirus',
        dz: '<b>Progressive multifocal leukoencephalopathy (PML)</b> — มักเสียชีวิต',
        keys: [
          'เกิดได้จาก immune reconstitution หลังเริ่ม ART',
          'Dx definitive: brain biopsy; <b>JC DNA PCR ใน CSF</b> เป็นหลักฐานหนักแน่น (โดยเฉพาะเมื่อ viral load สูง)'
        ],
        src: 'หน้า 50'
      },

      {
        id: 'v-rota', g: 'liver',
        clue: 'เด็ก<b>อายุ <5 ปี</b>: <b>อาเจียน + ไข้ 2–3 วันนำมาก่อน</b> แล้ว<b>ถ่ายเหลวเป็นน้ำปริมาณมาก 4–5 วัน</b> ขาดน้ำ — สาเหตุการตายจากท้องเสียอันดับ 1 ในเด็ก <5 ปีทั่วโลก',
        org: 'Rotavirus',
        dz: 'Viral gastroenteritis · dsRNA ไม่มี envelope',
        keys: [
          'ติดต่อ fecal-oral (สัมผัสอุจจาระโดยตรง หรือ fomites); ปล่อยเชื้อ 6–10 วัน',
          'Villi สั้นลง เยื่อบุเสียหาย → malabsorption',
          'ภาวะแทรกซ้อน: ขาดน้ำ/เกลือแร่ → cardiac failure, ชัก, aspiration pneumonia',
          '<b>Intussusception</b> = ภาวะแทรกซ้อนที่พบได้ (น้อย) จาก<b>วัคซีน</b>'
        ],
        src: 'หน้า 40'
      },
      {
        id: 'v-noro', g: 'liver',
        clue: '<b>ระบาดเป็นกลุ่ม</b>จากอาหาร ในชุมชน และ<b>ในโรงพยาบาล</b> — อาเจียนและท้องเสียเฉียบพลัน; การระบาดใน รพ. แพร่ทาง<b>อากาศ</b>ได้; ผู้สูงอายุอาจเสียชีวิต ผู้ป่วยภูมิต่ำเป็นเรื้อรัง',
        org: 'Norovirus (Norwalk virus)', opt: 'Norovirus',
        dz: 'Viral gastroenteritis · Caliciviridae',
        keys: [
          'ไวรัสลำไส้อื่น: sapovirus, adenovirus species F (type 40, 41), astrovirus',
          'ไม่มียาต้านไวรัสจำเพาะ → supportive',
          'ส่วนใหญ่เป็นไวรัสไม่มี envelope ติดทาง fecal-oral จากอาหาร น้ำ พื้นผิว'
        ],
        src: 'หน้า 39–41'
      },
      {
        id: 'v-hav', g: 'liver',
        clue: 'ตับอักเสบเฉียบพลัน ตัวเหลืองตาเหลือง หลังกิน<b>อาหารหรือน้ำปนเปื้อน (fecal-oral)</b>; <b>ไม่เป็นเรื้อรัง</b>; ตรวจพบ <b>anti-HAV IgM</b> ตั้งแต่เริ่มมีอาการ',
        org: 'Hepatitis A virus (HAV)', opt: 'Hepatitis A virus',
        dz: 'Picornaviridae',
        keys: [
          'ส่วนใหญ่หายเอง (คิดเป็นเพียง 0.5% ของการตายจาก viral hepatitis)',
          'anti-HAV IgG ตรวจพบ ~2 สัปดาห์หลังสัมผัส',
          'มีวัคซีน monovalent; PEP ด้วยวัคซีน (± HAV Ig) ภายใน 2 สัปดาห์หลังสัมผัส ในผู้อายุ ≥12 เดือน'
        ],
        src: 'หน้า 41–42'
      },
      {
        id: 'v-hbv-carrier', g: 'liver', k: 'hbv',
        clue: 'ชายไม่มีอาการ ตรวจสุขภาพพบ <b>HBsAg +</b>, <b>anti-HBc (total) +</b>, <b>anti-HBs −</b> โดย HBsAg บวกนานเกิน 6 เดือน',
        org: 'Hepatitis B virus — chronic infection (carrier)', opt: 'Hepatitis B virus',
        dz: 'Hepadnaviridae (DNA)',
        keys: [
          'Chronic HBV = <b>HBsAg บวก ≥6 เดือน</b>',
          'Acute HBV = HBsAg + <b>IgM anti-HBc</b>; ช่วง window period ใช้ HBV PCR',
          'บอก infectivity ด้วย <b>HBeAg</b> และ HBV viral load',
          'เคยฉีดวัคซีน = <b>anti-HBs บวกเดี่ยว ๆ</b> (anti-HBc ลบ)'
        ],
        exam: ['MED23-12'],
        src: 'หน้า 43'
      },
      {
        id: 'v-hbv-age', g: 'liver', k: 'hbv',
        clue: 'ไวรัสตับอักเสบที่โอกาสกลายเป็นเรื้อรัง<b>ขึ้นกับอายุตอนติดเชื้อ</b>: ทารกแรกเกิด ~90% vs ผู้ใหญ่ ~5%; ก่อ<b>มะเร็งตับ (HCC)</b>; ติดได้ทั้ง<b>แม่สู่ลูก เพศสัมพันธ์ เข็มฉีดยา</b>; ฟักตัวเฉลี่ย 90 วัน',
        org: 'Hepatitis B virus (HBV)', opt: 'Hepatitis B virus',
        dz: 'Hepadnaviridae (DNA) · oncogenic virus',
        keys: [
          'ติดในวัยเด็ก → เรื้อรังได้ถึง 95% · ผู้ใหญ่ 3–5%',
          'ทารกที่แม่มี HBV: ให้ <b>HBIG ภายใน 12 ชม.</b>หลังคลอด',
          'รักษา chronic: <b>tenofovir, entecavir</b>, telbivudine; acute ส่วนใหญ่ supportive',
          'ตรวจ genotype เพื่อพยากรณ์โรคและวางแผนการรักษา'
        ],
        exam: ['MED29-7'],
        src: 'หน้า 43–46'
      },
      {
        id: 'v-hbv-tolerant', g: 'liver', mcq: false,
        clue: 'หญิงติด HBV <b>ตั้งแต่แรกเกิด (perinatal)</b> ไม่มีอาการ: <b>HBsAg +, HBeAg +</b>, <b>HBV DNA สูงมาก (>10<sup>7</sup> IU/mL)</b> แต่ <b>ALT ปกติ</b> และตับอักเสบหรือพังผืดน้อยมาก — อยู่ในระยะใด?',
        org: 'HBV — Immune-tolerant phase',
        dz: 'HBeAg-positive chronic infection',
        keys: [
          'ระยะ 1 <b>Immune tolerant</b>: HBeAg+, DNA สูงมาก, ALT ปกติ (พบในผู้ติดแต่กำเนิด)',
          'ระยะ 2 <b>Immune clearance</b>: HBeAg+, ALT สูง มีการอักเสบ ± พังผืด',
          'ระยะ 3 <b>Inactive carrier</b>: HBeAg− / anti-HBe+, DNA <2,000 IU/mL, ALT ปกติ',
          'ระยะ 4 <b>HBeAg-negative CHB</b> (reactivation): DNA ขึ้นลง, ALT สูง',
          'ระยะ 5 <b>HBsAg-negative / occult HBV</b>: anti-HBc+ ± anti-HBs+'
        ],
        exam: ['MED29-8'],
        src: 'หน้า 45–46'
      },
      {
        id: 'v-hcv', g: 'liver',
        clue: 'ประวัติ<b>ใช้เข็มฉีดยาร่วมกัน (IVDU)</b> 10 ปีก่อน; อ่อนเพลีย ปวดชายโครงขวา ตาเหลืองเล็กน้อย; <b>anti-HCV +</b> และตรวจพบ <b>viral RNA</b> (anti-HBs + แต่ anti-HBc − = เคยฉีดวัคซีนตับอักเสบบี)',
        org: 'Hepatitis C virus (HCV)', opt: 'Hepatitis C virus',
        dz: 'Flaviviridae (RNA)',
        keys: [
          'ติดต่อทาง percutaneous เป็นหลัก, เพศสัมพันธ์, แม่สู่ลูก',
          'กลายเป็นเรื้อรัง <b>55–85%</b>; 20–30% เป็น cirrhosis ใน 30 ปี; HCC 1–4% ต่อปี',
          'Dx: anti-HCV → ยืนยันด้วย <b>HCV RNA</b> หรือ core antigen; genotype ใช้วางแผนการรักษา',
          'รักษาด้วย <b>DAAs</b> → เป้าหมาย SVR (ไม่พบไวรัสที่ 12 สัปดาห์หลังหยุดยา)'
        ],
        exam: ['MED25-18'],
        src: 'หน้า 47'
      },
      {
        id: 'v-hdv', g: 'liver',
        clue: 'ไวรัส<b>บกพร่อง (defective / satellite)</b> ต้องอาศัย<b>เปลือกนอก (HBsAg) ของ HBV</b> จึงแบ่งตัวได้; ติดพร้อม HBV (<b>coinfection</b>) เสี่ยง <b>fulminant hepatic failure</b> สูงสุด',
        org: 'Hepatitis D virus (HDV, delta)', opt: 'Hepatitis D virus',
        dz: 'Satellite virus ของ HBV',
        keys: [
          'รูปแบบ: acute HBV/HDV coinfection · HDV superinfection บน chronic HBV · chronic HDV',
          'Coinfection กลายเป็นเรื้อรัง<b>น้อยกว่า</b> superinfection',
          'Dx: total anti-HDV (IgM + IgG), HDV PCR (ยืนยัน)'
        ],
        src: 'หน้า 48'
      },
      {
        id: 'v-hev', g: 'liver',
        clue: 'ตับอักเสบเฉียบพลันจาก<b>อาหารหรือน้ำปนเปื้อน</b>; รุนแรงมากใน<b>หญิงตั้งครรภ์ไตรมาส 3</b> และผู้มีโรคตับเดิม; เป็นเรื้อรังได้ในผู้ป่วยภูมิคุ้มกันต่ำ (<b>genotype 3, 4</b>)',
        org: 'Hepatitis E virus (HEV)', opt: 'Hepatitis E virus',
        dz: 'Enterically transmitted hepatitis',
        keys: [
          'ติดทางการให้เลือด (ในพื้นที่ระบาด) และแม่สู่ลูกได้',
          'Dx: <b>anti-HEV IgM</b>; HEV RNA ใช้ยืนยันหรือในผู้ป่วยภูมิต่ำ',
          'รักษา supportive ± ลดยากดภูมิ'
        ],
        src: 'หน้า 48–49'
      }
    ]
  },

  /* ================================================================
   * BACTERIA
   * ================================================================ */
  {
    id: 'bacteria',
    name: 'Bacteria',
    th: 'แบคทีเรีย',
    code: 'B',
    lecture: 'Bacterial disease 69',
    groups: {
      gpc: 'Gram+ cocci',
      gpr: 'Gram+ rods · Anaerobe',
      resp: 'เด็ก · ทางเดินหายใจ · สมอง',
      std: 'STDs · Chlamydia',
      gi: 'ทางเดินอาหาร',
      zoo: 'สัตว์ · แมลงนำโรค',
      gnb: 'Gram− ใน รพ. · ภูมิต่ำ',
      myco: 'Mycobacteria'
    },
    cards: [
      {
        id: 'b-sa-skin', g: 'gpc', k: 'saureus',
        clue: '<b>ฝีรอบรูขุมขน (furuncle)</b> ที่หนังศีรษะ หน้า รักแร้ · <b>carbuncle</b> = ฝีหลายหัวมีโพรงหนองที่ต้นคอ · <b>hidradenitis suppurativa</b> (ต่อมเหงื่อ) · ฝีเต้านมในแม่ที่ให้นมบุตร',
        org: '<i>Staphylococcus aureus</i>',
        dz: 'Gram+ cocci เป็นกลุ่ม · catalase + · <b>coagulase +</b>',
        keys: [
          'ลุกลามได้แทบทุกอวัยวะ: abscess, paronychia, <b>osteomyelitis</b>, <b>septic arthritis</b> (พบบ่อยในเด็กก่อนวัยรุ่น)',
          'Pneumonia: สาเหตุสำคัญของ nosocomial pneumonia (สำลักเชื้อจากโพรงจมูก-คอ)',
          'ฝีเต้านมในทารก: <i>S. aureus</i>, Group B strep'
        ],
        src: 'หน้า 1–4'
      },
      {
        id: 'b-sa-tss', g: 'gpc', k: 'saureus',
        clue: 'ใช้<b>ผ้าอนามัยแบบสอด (tampon)</b> / nasal packing / มีแผลผ่าตัด แล้ว<b>ไข้สูง คลื่นไส้อาเจียน ช็อก</b>',
        org: '<i>Staphylococcus aureus</i>',
        dz: 'Toxic shock syndrome (TSS)',
        keys: [
          'เกิดจาก toxin (superantigen) ไม่ใช่การลุกลามของเชื้อ',
          'เทียบ Streptococcal TSS: bacteremia หายใจล้มเหลว ช็อก MOF มักมาจาก soft tissue infection'
        ],
        src: 'หน้า 3'
      },
      {
        id: 'b-sa-food', g: 'gpc', k: 'saureus',
        clue: 'อาหารเป็นพิษ <b>คลื่นไส้ อาเจียน ท้องเสีย เริ่มเร็วภายใน 4–6 ชม.</b>หลังกินอาหาร จาก toxin ที่สร้างไว้ก่อนในอาหาร',
        org: '<i>Staphylococcus aureus</i>',
        dz: 'Staphylococcal food poisoning (preformed enterotoxin)',
        keys: [
          'Toxin สร้างไว้ก่อนในอาหาร → อาการเร็ว ไม่มีไข้สูง',
          'เทียบ <i>B. cereus</i> emetic type: ข้าวผัดอุ่นซ้ำ อาเจียนใน 1–6 ชม. (cereulide)'
        ],
        src: 'หน้า 3'
      },
      {
        id: 'b-ssss', g: 'gpc', k: 'saureus',
        clue: 'ทารก/เด็กเล็ก ผิวหนัง<b>แดงทั่วตัว → ตุ่มพองเหี่ยว (flaccid bullae) → หลุดลอกเหลือผิวถลอกเหมือนน้ำร้อนลวก</b>; ถูเบา ๆ ผิวเลื่อนหลุด = <b>Nikolsky sign บวก</b>',
        org: '<i>Staphylococcus aureus</i>',
        dz: 'Staphylococcal scalded skin syndrome (Ritter disease / pemphigus neonatorum)',
        keys: [
          '<b>Exfoliatin</b> (exfoliative toxin) ทำลาย <b>desmoglein-1</b> → epidermis ชั้นบนหลุดลอก'
        ],
        src: 'หน้า 3–4'
      },
      {
        id: 'b-sepi', g: 'gpc',
        clue: 'ใส่<b>ลิ้นหัวใจเทียม</b>มา 9 เดือน: ไข้ต่ำ เบื่ออาหาร น้ำหนักลด ม้ามโต; TEE พบ vegetation รอบ sewing ring; เพาะเชื้อได้ GPC เป็นกลุ่ม <b>coagulase −, novobiocin-sensitive</b> สร้าง <b>slime / biofilm</b>',
        org: '<i>Staphylococcus epidermidis</i>',
        dz: 'Prosthetic valve endocarditis · coagulase-negative staphylococci',
        keys: [
          'สาเหตุอันดับ 1 ของ prosthetic valve endocarditis <b>ภายใน 1 ปีแรก</b>หลังผ่าตัด',
          'ติดเชื้อฉวยโอกาสใน<b>ผู้ใส่สายสวน</b> ลิ้นหัวใจเทียม และผู้ใช้ยาเสพติดทางเส้นเลือด',
          'Novobiocin: <i>S. epidermidis</i> <b>sensitive</b> · <i>S. saprophyticus</i> <b>resistant</b>'
        ],
        exam: ['MED27-21'],
        src: 'หน้า 5'
      },
      {
        id: 'b-ssap', g: 'gpc',
        clue: '<b>หญิงสาวที่มีเพศสัมพันธ์</b>: ปัสสาวะแสบ บ่อย กดเจ็บเหนือหัวหน่าว ไม่มีตกขาว (UTI); เพาะเชื้อได้ GPC เป็นกลุ่ม non-hemolytic <b>catalase +, coagulase −, novobiocin-resistant</b>',
        org: '<i>Staphylococcus saprophyticus</i>',
        dz: 'UTI ในหญิงวัยเจริญพันธุ์ · coagulase-negative staphylococci',
        keys: [
          'เป็นสาเหตุที่พบบ่อยของ UTI ในหญิงสาว',
          'จุดแยก: <b>novobiocin-resistant</b> (ต่างจาก <i>S. epidermidis</i>)'
        ],
        exam: ['MED23-9'],
        src: 'หน้า 5'
      },
      {
        id: 'b-spn-mening', g: 'gpc', k: 'spn',
        clue: 'ชาย 45 ปี มี<b>กะโหลกฐานแตก + น้ำไขสันหลังรั่วทางจมูก</b>เมื่อ 3 สัปดาห์ก่อน → ไข้สูง ซึม คอแข็ง; CSF ขุ่น neutrophil สูง protein สูง glucose ต่ำ; Gram พบ <b>Gram+ lancet-shaped diplococci</b>',
        org: '<i>Streptococcus pneumoniae</i>',
        dz: 'Post-traumatic bacterial meningitis · α-hemolytic streptococci',
        keys: [
          'α-hemolysis, <b>optochin sensitive</b>, <b>bile soluble</b>, มี capsule → <b>Quellung reaction</b>',
          'Normal flora ทางเดินหายใจส่วนบน: CAP, meningitis ผู้ใหญ่, sinusitis, otitis media',
          'Community-acquired bacterial meningitis: <i>S. pneumoniae</i> ~50% (ผู้ใหญ่ >20 ปี)'
        ],
        exam: ['MED25-5'],
        src: 'หน้า 6, 29–30'
      },
      {
        id: 'b-spn-opsi', g: 'gpc', k: 'spn',
        clue: 'ผู้ป่วย<b>ตัดม้าม</b>หลังอุบัติเหตุ (หรือเป็น <b>sickle cell anemia</b>): ไข้สูง หนาวสั่น ไอมีเสมหะเป็นหนอง ปอดมี consolidation → ติดเชื้อในกระแสเลือดรุนแรง — เชื้อที่พบบ่อยที่สุด',
        org: '<i>Streptococcus pneumoniae</i>',
        dz: 'Overwhelming post-splenectomy infection (OPSI)',
        keys: [
          'ม้ามกรอง encapsulated bacteria ที่ถูก opsonize (opsonic IgG)',
          'Encapsulated ที่เสี่ยง: <i>S. pneumoniae</i>, <i>H. influenzae</i>, <i>N. meningitidis</i>'
        ],
        exam: ['MED23-15'],
        src: 'หน้า 6, 53'
      },
      {
        id: 'b-viridans', g: 'gpc',
        clue: 'ผู้ป่วย <b>mitral valve prolapse</b> <b>ถอนฟัน</b>โดยไม่ได้ยาป้องกัน → 4 สัปดาห์ต่อมา ไข้ต่ำ เหงื่อออกกลางคืน อ่อนเพลีย <b>murmur ใหม่</b>; เพาะเชื้อได้ GPC chains <b>α-hemolytic, optochin-resistant</b>, catalase −',
        org: 'Viridans group streptococci (เช่น <i>S. mitis</i>, <i>S. sanguinis</i>)', opt: 'Viridans group streptococci',
        dz: 'Subacute bacterial endocarditis',
        keys: [
          'Normal flora ในช่องปาก; สร้าง <b>dextran</b> ยึดเกาะลิ้นหัวใจที่ผิดปกติเดิม',
          '<i>S. mutans</i> สร้าง polysaccharide → <b>ฟันผุ</b>',
          '6 กลุ่ม: mutans, salivarius, anginosus, mitis, sanguinis, bovis',
          'Optochin: viridans <b>resistant</b> · pneumococcus <b>sensitive</b>'
        ],
        exam: ['MED27-5'],
        src: 'หน้า 6'
      },
      {
        id: 'b-ssuis', g: 'gpc',
        clue: 'กิน<b>หมูดิบ / ลาบหมูดิบ</b> หรือชำแหละหมู → <b>meningitis</b> (มัก<b>หูหนวก</b>ตามมา), arthritis, endocarditis, pneumonia และ septicemia เสียชีวิตเฉียบพลัน',
        org: '<i>Streptococcus suis</i>',
        dz: 'Streptococcal zoonosis จากหมู',
        keys: [
          'อยู่ในกลุ่ม α-hemolytic streptococci ในสไลด์',
          'นึกถึงในผู้ป่วยไทยที่เป็น meningitis และมีประวัติกินหมูดิบ'
        ],
        src: 'หน้า 6'
      },
      {
        id: 'b-gas-pharyn', g: 'gpc', k: 'spy',
        clue: 'ผู้ใหญ่: <b>คอหอยและทอนซิลแดงจัด มีหนอง (exudate)</b> ไข้ ต่อมน้ำเหลืองคอโต · เด็กเล็ก: nasopharyngitis กึ่งเฉียบพลันที่ลามไปหูชั้นกลาง mastoid และเยื่อหุ้มสมอง',
        org: '<i>Streptococcus pyogenes</i> (Group A)', opt: '<i>Streptococcus pyogenes</i>',
        dz: 'Streptococcal pharyngitis · β-hemolytic, <b>bacitracin sensitive</b>',
        keys: [
          'อยู่ที่คอและผิวหนัง: pharyngitis, scarlet fever, erysipelas, cellulitis, impetigo',
          'ภาวะแทรกซ้อน: <b>ARF</b> (หลัง pharyngitis เท่านั้น) · <b>APSGN</b> (หลัง pharyngitis หรือ impetigo)'
        ],
        src: 'หน้า 5, 7'
      },
      {
        id: 'b-scarlet', g: 'gpc', k: 'spy',
        clue: 'ไข้ เจ็บคอ → 1–3 วัน<b>ผื่นแดงทั่วตัว กดจาง ผิวสากเหมือนกระดาษทราย</b> + <b>Pastia lines</b> ตามข้อพับ + <b>ลิ้นสตรอว์เบอร์รี่ขาว → แดง</b> แล้วผิวลอก',
        org: '<i>Streptococcus pyogenes</i> (Group A)', opt: '<i>Streptococcus pyogenes</i>',
        dz: 'Scarlet fever — erythrogenic toxin',
        keys: [
          'Streptococcal TSS กับ scarlet fever อาการซ้อนกันได้',
          'Strep TSS: bacteremia, respiratory failure, shock, multiorgan failure มักมาจาก soft tissue infection'
        ],
        src: 'หน้า 10–11'
      },
      {
        id: 'b-erysipelas', g: 'gpc', k: 'spy',
        clue: 'ผื่นแดง<b>ขอบชัด นูน ลามเร็ว (rapidly advancing margin)</b> โดยเฉพาะที่<b>แก้มทั้งสองข้าง</b>; พบมากในผู้สูงอายุ ทารก เบาหวาน ติดสุรา หรือการระบายน้ำเหลืองไม่ดี',
        org: '<i>Streptococcus pyogenes</i> (Group A)', opt: '<i>Streptococcus pyogenes</i>',
        dz: 'Erysipelas (ติดเชื้อชั้น dermis เฉียบพลัน)',
        keys: [
          'Cellulitis = ติดเชื้อที่ deep dermis ผ่านแผล ขอบไม่ชัด วินิจฉัยทางคลินิก',
          'Paronychia ที่นิ้วเท้าลามเป็น cellulitis ได้'
        ],
        src: 'หน้า 9–10'
      },
      {
        id: 'b-impetigo', g: 'gpc', k: 'spy',
        clue: 'เด็ก 4 ปี ตุ่มแดงรอบจมูกและปาก แตกเป็น<b>สะเก็ดสีน้ำผึ้ง (honey-colored crusts)</b> บนแผลถลอกตื้น ๆ ไม่มีอาการทั่วไป (non-bullous impetigo) — ภาวะแทรกซ้อนทางภูมิคุ้มกันที่สัมพันธ์มากที่สุดคืออะไร?',
        org: '<i>Streptococcus pyogenes</i> → APSGN', opt: '<i>Streptococcus pyogenes</i>',
        dz: 'Impetigo → acute post-streptococcal glomerulonephritis',
        keys: [
          'M protein บางชนิด (nephritogenic strains) → <b>glomerulonephritis</b> แต่<b>ไม่ค่อย</b>ทำให้ rheumatic fever',
          'APSGN: immune complex บน GBM, ฟักตัว <b>2–3 สัปดาห์</b>, ส่วนใหญ่หายสนิท',
          'ติดเชื้อที่ผิวหนัง → APSGN ได้ แต่<b>ไม่</b>ทำให้ ARF'
        ],
        exam: ['MED28-15'],
        src: 'หน้า 8, 12'
      },
      {
        id: 'b-arf', g: 'gpc', k: 'spy',
        clue: 'เด็ก 8 ปี <b>ข้ออักเสบย้ายที่ (migratory polyarthritis)</b> + <b>subcutaneous nodules</b> + <b>chorea</b> + ไข้ต่ำ ~2 สัปดาห์หลัง<b>คออักเสบที่ไม่ได้รักษา</b>',
        org: '<i>Streptococcus pyogenes</i> → acute rheumatic fever', opt: '<i>Streptococcus pyogenes</i>',
        dz: 'Post-infectious autoimmune (molecular mimicry)',
        keys: [
          'Antigen ของเชื้อ cross-react กับเนื้อเยื่อหัวใจ (<b>molecular mimicry</b>); เริ่มมีอาการ 1–4 สัปดาห์',
          'ผลร้ายที่สุด: ลิ้นและกล้ามเนื้อหัวใจเสียหาย → <b>rheumatic heart disease</b> (mitral valve หนา หดรั้ง มีหินปูน)',
          'กลับเป็นซ้ำเมื่อติดเชื้อใหม่ → ให้ <b>penicillin prophylaxis</b>'
        ],
        exam: ['MED29-19'],
        src: 'หน้า 13–14'
      },
      {
        id: 'b-gbs', g: 'gpc',
        clue: '<b>ทารกแรกเกิด (<1 เดือน)</b> มี <b>meningitis</b> หรือติดเชื้อในกระแสเลือด; แม่มีถุงน้ำคร่ำอักเสบ (chorioamnionitis)',
        org: '<i>Streptococcus agalactiae</i> (Group B)', opt: '<i>Streptococcus agalactiae</i>',
        dz: 'Neonatal meningitis / sepsis · β-hemolytic, <b>bacitracin resistant</b>',
        keys: [
          'Neonatal meningitis: <b>GBS</b> และ <i>Listeria monocytogenes</i>',
          'Group B strep ~15% ของ community-acquired bacterial meningitis'
        ],
        src: 'หน้า 5, 15, 30'
      },
      {
        id: 'b-entero', g: 'gpc',
        clue: '<b>UTI และ subacute endocarditis</b> จากเชื้อประจำถิ่นในลำไส้ใหญ่ (Group D) ที่<b>ดื้อ cephalosporin โดยธรรมชาติ</b>; <i>E. faecium</i> ดื้อยาสูงมาก',
        org: '<i>Enterococcus</i> spp. (<i>E. faecalis</i>, <i>E. faecium</i>)', opt: '<i>Enterococcus faecalis</i>',
        dz: 'Group D streptococci · γ-hemolysis (บางครั้ง α หรือ β)',
        keys: [
          'Intrinsic resistance: cephalosporins, penicillinase-resistant penicillins, monobactam'
        ],
        src: 'หน้า 5, 15'
      },

      {
        id: 'b-cperf', g: 'gpr',
        clue: 'แผลปนเปื้อน<b>ดินหรืออุจจาระ</b> → ใน 1–3 วัน <b>กล้ามเนื้อตายลุกลามเร็ว มีแก๊ส คลำได้กรอบแกรบ (crepitation)</b> น้ำเหลืองกลิ่นเหม็น ไข้ ช็อก',
        org: '<i>Clostridium perfringens</i>',
        dz: 'Gas gangrene (clostridial myonecrosis) · large anaerobic Gram+ rods',
        keys: [
          'มักพบ Gram− rods และ cocci อื่นปนด้วย',
          'ทำให้อาหารเป็นพิษได้',
          '<b>Necrotizing enteritis</b>: enterotoxin ของ type C → ลำไส้เล็กตายและเลือดออก ถ่ายเป็นเลือด อาจเสียชีวิตใน 24 ชม.'
        ],
        src: 'หน้า 16, 21'
      },
      {
        id: 'b-ctet', g: 'gpr',
        clue: '<b>ตะปูเป็นสนิมตำเท้า</b> 10 วันก่อน → <b>อ้าปากไม่ได้ (trismus, lockjaw)</b>, <b>ยิ้มแสยะ (risus sardonicus)</b>, กล้ามเนื้อเกร็งกระตุกเจ็บ หลังแอ่น + <b>ระบบประสาทอัตโนมัติแปรปรวน</b> (BP แกว่ง หัวใจเต้นช้าสลับเร็ว เหงื่อออกมาก)',
        org: '<i>Clostridium tetani</i>',
        dz: 'บาดทะยัก (Tetanus) — spastic paralysis',
        keys: [
          'Tetanospasmin เดินทางย้อนตามเส้นประสาทไปไขสันหลัง → ยับยั้งการหลั่ง <b>GABA และ glycine</b> จาก inhibitory neurons',
          '<b>Dysautonomia</b> เป็นลักษณะเด่น (ไม่ใช่ flaccid paralysis)',
          'ทารก: neonatal tetanus ตัวแข็งเกร็ง',
          'รักษา: <b>human tetanus immunoglobulin (TIG)</b>, tetanus antitoxin (TAT — ต้องทำ skin test ก่อน)'
        ],
        exam: ['MED29-5'],
        src: 'หน้า 17–18'
      },
      {
        id: 'b-cbot', g: 'gpr',
        clue: 'กิน<b>อาหารกระป๋องหรือถนอมอาหารเองที่ทำไม่ถูกวิธี</b> (เช่น หน่อไม้ปี๊บ) → <b>อัมพาตแบบอ่อนปวกเปียก</b> เริ่มจากกล้ามเนื้อตาและคอ ลามจนหายใจล้มเหลว',
        org: '<i>Clostridium botulinum</i>',
        dz: 'Botulism — flaccid paralysis',
        keys: [
          'สร้าง toxin ที่แรงที่สุดที่รู้จัก; ยับยั้งการหลั่ง <b>acetylcholine</b> (light chain ตัด SNARE proteins)',
          'Food botulism = กิน <b>preformed toxin</b>',
          '<b>Infant botulism</b> = เชื้อสร้าง toxin ในลำไส้ทารก · wound botulism'
        ],
        src: 'หน้า 19'
      },
      {
        id: 'b-cdiff', g: 'gpr',
        clue: 'หลังได้ <b>clindamycin หรือยาปฏิชีวนะออกฤทธิ์กว้าง</b> (เช่น pip-tazo, cephalosporin) ~10 วัน → ถ่ายเหลวบ่อย ปวดบิด WBC สูง; ส่องกล้องพบ<b>แผ่นนูนสีเหลืองขาวกระจายบนเยื่อบุลำไส้ใหญ่</b>',
        org: '<i>Clostridioides difficile</i>',
        dz: 'Pseudomembranous colitis (antibiotic-associated diarrhea)',
        keys: [
          'ยาฆ่าเชื้อทำลาย normal gut flora → เชื้อโตและสร้าง <b>Toxin A (enterotoxin)</b> กับ <b>Toxin B (cytotoxin)</b>',
          'Dx: ตรวจ toxin ในอุจจาระ, PCR, culture — ขั้นแรก <b>GDH + toxin A/B EIA</b> ถ้าผลไม่ตรงกันส่ง NAAT/toxigenic culture',
          'รักษา: <b>vancomycin</b> (กิน) หรือ metronidazole; ติดต่อ fecal-oral'
        ],
        exam: ['MED23-14'],
        src: 'หน้า 20–21'
      },
      {
        id: 'b-bcereus', g: 'gpr',
        clue: '<b>อาเจียนรุนแรงเฉียบพลันภายใน 1–6 ชม.</b> หลังกิน<b>ข้าวผัดที่เก็บไว้แล้วอุ่นซ้ำ</b> ท้องเสีย ปวดบิด ไม่มีไข้สูง หายเองใน 24 ชม.',
        org: '<i>Bacillus cereus</i> (emetic type)', opt: '<i>Bacillus cereus</i>',
        dz: 'Food poisoning — <b>cereulide</b> (heat-stable, preformed)',
        keys: [
          'Diarrheal type: ท้องเสียปวดท้อง <b>8–16 ชม.</b>หลังกิน',
          'สร้าง spore ที่ทนความร้อน',
          'Keratitis/endophthalmitis รุนแรงหลังสิ่งแปลกปลอมเข้าตา; endocarditis/osteomyelitis ในผู้ใช้ยาเสพติดหรือมีอุปกรณ์การแพทย์'
        ],
        exam: ['MED24-13'],
        src: 'หน้า 22'
      },
      {
        id: 'b-anthrax-cut', g: 'gpr', k: 'anthrax',
        clue: 'คนเลี้ยงหรือชำแหละ<b>แพะ แกะ วัว</b>: ตุ่ม<b>ไม่เจ็บ</b> → ตุ่มน้ำ → <b>แผลมีสะเก็ดดำ (black eschar)</b> + ต่อมน้ำเหลืองใกล้เคียงโต',
        org: '<i>Bacillus anthracis</i>',
        dz: 'Cutaneous anthrax (~95%)',
        keys: [
          'Spores อยู่ในดินและซากสัตว์; เข้าทางแผลแล้วเกิดตุ่มใน 1–7 วัน',
          'ส่วนใหญ่หาย แต่ ~20% ลุกลามเป็น sepsis ได้',
          'Lab: non-hemolytic colonies, PCR · รักษา ciprofloxacin, doxycycline, penicillin'
        ],
        src: 'หน้า 22–23'
      },
      {
        id: 'b-anthrax-inh', g: 'gpr', k: 'anthrax',
        clue: 'สูด <b>spores</b> เข้าไป → <b>mediastinum กว้างบน CXR (hemorrhagic mediastinitis)</b> → เสียชีวิตเฉียบพลัน',
        org: '<i>Bacillus anthracis</i>',
        dz: 'Inhalational anthrax',
        keys: [
          'GI anthrax (พบน้อย): กินเนื้อที่ปนเปื้อน spores → อาการทางเดินอาหาร อัตราตายสูง',
          'Reservoir: แพะ แกะ วัว สุนัข หมู'
        ],
        src: 'หน้า 22–23'
      },
      {
        id: 'b-actino', g: 'gpr',
        clue: 'หลัง<b>ฟันหักหรือถอนฟัน</b>: ก้อนแข็งบวมที่ใบหน้า-ขากรรไกร มี <b>draining sinus tract</b> หนองมี<b>เม็ดสีเหลือง (sulfur granules)</b>; Gram พบ <b>Gram+ branching filaments, non-acid-fast</b>',
        org: '<i>Actinomyces israelii</i>',
        dz: 'Cervicofacial actinomycosis',
        keys: [
          '<b>Anaerobe</b> เป็น normal flora ในช่องปาก (ไม่พบในสิ่งแวดล้อม)',
          'ย้อม Gomori methenamine silver (<b>GMS</b>) ติด',
          'ต่างจาก <i>Nocardia</i>: aerobe อยู่ในดิน ย้อม partial acid-fast ติด'
        ],
        exam: ['MED25-9'],
        src: 'หน้า 24'
      },
      {
        id: 'b-nocardia', g: 'gpr',
        clue: 'ผู้ป่วย<b>ภูมิคุ้มกันต่ำ</b>: ปอดอักเสบ + <b>ฝีในสมองและไต</b>; เชื้อเป็นเส้นแตกแขนงที่มาจาก<b>ดิน</b> ย้อม <b>partial (modified) acid-fast บวก</b>',
        org: '<i>Nocardia asteroides</i>',
        dz: 'Nocardiosis · Actinomycetes (aerobic)',
        keys: [
          'Actinomycetes = แบคทีเรียที่โตเป็นเส้นสายแตกกิ่งคล้ายเชื้อรา'
        ],
        src: 'หน้า 24'
      },
      {
        id: 'b-listeria', g: 'gpr',
        clue: 'Meningitis ใน<b>ทารกแรกเกิด</b> หรือ<b>ผู้สูงอายุ/ภูมิคุ้มกันต่ำ</b> (~10% ของ community-acquired bacterial meningitis) จาก Gram+ rod',
        org: '<i>Listeria monocytogenes</i>',
        dz: 'Neonatal & elderly meningitis',
        keys: [
          'ทารก <1 เดือน: GBS + <i>Listeria</i>',
          'ผู้สูงอายุหรือผู้ป่วยภูมิต่ำ: <i>Listeria</i>'
        ],
        src: 'หน้า 29–30'
      },

      {
        id: 'b-diphtheria', g: 'resp',
        clue: 'เด็ก<b>ไม่ได้รับวัคซีน</b>: ไข้ เจ็บคอ เสียงแหบ stridor; <b>คอบวมใหญ่ (bull-neck)</b>; <b>แผ่นเยื่อสีเทาสกปรก (dirty-grey pseudomembrane)</b> ติดแน่นที่ทอนซิล-คอหอย <b>ลอกแล้วเลือดออก</b>',
        org: '<i>Corynebacterium diphtheriae</i>',
        dz: 'คอตีบ (Diphtheria) · Gram+ club-shaped rods',
        keys: [
          '<b>AB exotoxin → ADP-ribosylation ของ EF-2</b> → ยับยั้งการสร้างโปรตีน เซลล์ตาย',
          'Toxin ทำลายหัวใจ (myocarditis) เส้นประสาท ตับ ไต; pseudomembrane อุดทางเดินหายใจ',
          'ตรวจ toxigenicity ด้วย <b>Elek test</b>',
          'รักษา: <b>antitoxin</b> + penicillin G หรือ erythromycin (ยาไม่ทดแทน antitoxin)',
          'Toxoid vaccine ไม่ป้องกัน colonization แต่ป้องกันผลของ toxin'
        ],
        exam: ['MED24-1', 'MED28-13'],
        src: 'หน้า 25–27'
      },
      {
        id: 'b-pertussis', g: 'resp',
        clue: 'เด็ก <5 ปี ฟักตัว ~2 สัปดาห์: <b>catarrhal stage</b> ไอจามเล็กน้อย → <b>paroxysmal stage</b> ไอเป็นชุดแล้ว<b>หายใจเข้าเสียงวู้ป (whoop)</b> อาเจียนหลังไอ เขียว ชัก',
        org: '<i>Bordetella pertussis</i>',
        dz: 'ไอกรน (Whooping cough) · Gram− coccobacilli',
        keys: [
          '<i>B. parapertussis</i> ทำให้อาการคล้ายกัน',
          'Laryngotracheobronchitis: mucosal erosion, hyperemia, mucopurulent exudate มาก',
          'พบน้อย: encephalitis ถึงเสียชีวิต',
          'เพาะเชื้อบน Regan-Lowe (RL) / Bordet-Gengou medium'
        ],
        src: 'หน้า 25, 28'
      },
      {
        id: 'b-hib', g: 'resp',
        clue: 'เด็ก 4 ปี<b>ไม่ได้รับวัคซีน</b>: ไข้สูง เจ็บคอ <b>น้ำลายไหล</b> <b>หายใจเข้าเสียงดัง (stridor)</b> กลืนลำบาก นั่ง<b>โน้มตัวไปข้างหน้า (tripod)</b>; lateral neck X-ray พบ <b>thumb sign</b>',
        org: '<i>Haemophilus influenzae</i> type b (Hib)', opt: '<i>Haemophilus influenzae</i> type b',
        dz: 'Acute epiglottitis · Gram− coccobacilli',
        keys: [
          'มี 6 serotypes (a–f); <b>type b</b> รุนแรงที่สุด',
          'โรค: pneumonia, <b>meningitis</b> (เด็ก), otitis media, sinusitis, epiglottitis',
          'มี capsule → เสี่ยงในผู้ตัดม้าม'
        ],
        exam: ['MED24-14'],
        src: 'หน้า 29'
      },
      {
        id: 'b-nmen', g: 'resp',
        clue: 'เด็กโต/วัยรุ่น (2–20 ปี) ไข้ คอแข็ง + <b>ผื่นจุดเลือด petechiae/purpura</b> ลุกลามเป็นจ้ำเลือด ปลายนิ้วตาย ช็อก; ชันสูตรพบ<b>ต่อมหมวกไตเลือดออก</b>; smear พบ <b>intracellular Gram− diplococci</b>',
        org: '<i>Neisseria meningitidis</i>',
        dz: 'Meningococcemia / meningitis — Waterhouse-Friderichsen syndrome',
        keys: [
          '~25% ของ community-acquired bacterial meningitis; สาเหตุหลักในอายุ 2–20 ปี',
          'Meningeal signs: nuchal rigidity, <b>Brudzinski sign</b>, กระหม่อมโป่งในทารก; ฟักตัว 1–10 วัน',
          'มี capsule → เสี่ยงในผู้ตัดม้าม'
        ],
        src: 'หน้า 29–31'
      },
      {
        id: 'b-mening-age', g: 'resp', mcq: false,
        clue: 'สาเหตุ bacterial meningitis ตามอายุ: <b>ทารก <1 เดือน</b> · <b>2–20 ปี</b> · <b>ผู้ใหญ่ >20 ปี</b> · <b>ผู้สูงอายุ/ภูมิต่ำ</b>',
        org: 'GBS + <i>Listeria</i> → <i>N. meningitidis</i> → <i>S. pneumoniae</i> → <i>Listeria</i>',
        dz: 'Bacterial meningitis แยกตามอายุ',
        keys: [
          'ภาพรวม: <i>S. pneumoniae</i> 50% · <i>N. meningitidis</i> 25% · GBS 15% · <i>Listeria</i> 10% · Hib <10%',
          'ผู้ใหญ่: ปัจจัยเสี่ยงสำคัญคือ pneumococcal pneumonia'
        ],
        src: 'หน้า 29–30'
      },
      {
        id: 'b-mpneu', g: 'resp',
        clue: 'ชาย 23 ปี <b>ไอแห้ง ไข้ต่ำ 3 สัปดาห์ ยังเดินไปมาได้ (walking pneumonia)</b>; CXR <b>bilateral reticulonodular infiltrates มากเกินกว่าที่ตรวจร่างกายพบ</b>; เลือดในหลอดแช่น้ำแข็ง<b>เกาะกลุ่ม แล้วหายเมื่ออุ่นที่ 37°C</b>',
        org: '<i>Mycoplasma pneumoniae</i>',
        dz: 'Atypical pneumonia — cold agglutinin',
        keys: [
          '<b>ไม่มี cell wall</b> → ย้อม Gram ไม่ติด (β-lactam ไม่ได้ผล)',
          'Cold agglutinin = <b>IgM ต่อ I antigen</b> บน RBC; titer ≥1:64',
          'พบบ่อยในเด็กและผู้ใหญ่ตอนต้น: pharyngitis, sinusitis, laryngotracheobronchitis, atypical pneumonia',
          'รักษา: tetracyclines หรือ erythromycin'
        ],
        exam: ['MED27-20'],
        src: 'หน้า 64'
      },
      {
        id: 'b-psittaci', g: 'resp',
        clue: '<b>เลี้ยงนก / สัมผัสมูลนกแห้ง</b> → ตั้งแต่ไม่มีอาการ ไข้หวัด atypical pneumonia จนถึงปอดอักเสบรุนแรงและ sepsis (ฟักตัว ~10 วัน)',
        org: '<i>Chlamydophila psittaci</i>',
        dz: 'Psittacosis',
        keys: [
          'Dx: serology, PCR, antigen detection'
        ],
        src: 'หน้า 63'
      },
      {
        id: 'b-cpneu', g: 'resp',
        clue: 'Atypical pneumonia ที่ติดต่อ<b>คนสู่คนทางอากาศ</b>; Dx ด้วย <b>microimmunofluorescence serology</b> หรือตรวจ elementary bodies ในสิ่งส่งตรวจ',
        org: '<i>Chlamydophila pneumoniae</i>',
        dz: 'Upper & lower respiratory tract infection',
        keys: [
          'รักษา: macrolides, tetracyclines, fluoroquinolones บางตัว'
        ],
        src: 'หน้า 63'
      },

      {
        id: 'b-gc', g: 'std',
        clue: 'ชาย: <b>ปัสสาวะแสบมีหนองข้นไหล (urethritis)</b>, epididymitis · หญิง: cervicitis, PID · ทารก: <b>เยื่อบุตาอักเสบจนอาจตาบอด</b>; Gram พบ <b>Gram− diplococci</b> และเพาะขึ้นบน <b>Thayer-Martin agar</b>',
        org: '<i>Neisseria gonorrhoeae</i>',
        dz: 'หนองใน (Gonorrhea)',
        keys: [
          'อื่น ๆ: septic arthritis, septicemia, proctitis, pharyngitis',
          'รักษา: <b>ceftriaxone</b> (ดื้อ tetracycline และ quinolone เพิ่มขึ้น)'
        ],
        src: 'หน้า 32'
      },
      {
        id: 'b-chancroid', g: 'std',
        clue: '<b>แผลที่อวัยวะเพศหลายแผล เจ็บมาก ก้นแผลสกปรก (soft chancre)</b> + ต่อมน้ำเหลืองขาหนีบอักเสบเป็นหนอง (<b>bubo</b>) ~50%',
        org: '<i>Haemophilus ducreyi</i>',
        dz: 'แผลริมอ่อน (Chancroid) · Gram− bacilli',
        keys: [
          'DDx: syphilis (แผลไม่เจ็บ), herpes simplex, lymphogranuloma venereum',
          'รักษา: IM ceftriaxone'
        ],
        src: 'หน้า 33'
      },
      {
        id: 'b-donovan', g: 'std',
        clue: 'ตุ่ม<b>ไม่เจ็บ</b>ที่อวัยวะเพศ โตช้า ๆ เป็นแผล; ต่อมน้ำเหลืองโต<b>พบน้อย (pseudobubo)</b>; Giemsa ของชิ้นเนื้อพบ <b>Donovan bodies</b> สีดำอยู่ในเซลล์',
        org: '<i>Klebsiella</i> (<i>Calymmatobacterium</i>) <i>granulomatis</i>', opt: '<i>Klebsiella granulomatis</i>',
        dz: 'Granuloma inguinale (Donovanosis)',
        keys: [
          'Gram− coccobacilli ที่เพาะเลี้ยงไม่ได้'
        ],
        src: 'หน้า 34'
      },
      {
        id: 'b-syphilis', g: 'std',
        clue: '<b>แผลเดี่ยวที่อวัยวะเพศ ไม่เจ็บ ขอบแข็ง (hard chancre)</b>; ส่องกล้อง <b>dark-field</b> เห็น spirochete',
        org: '<i>Treponema pallidum</i>',
        dz: 'Primary syphilis',
        keys: [
          'ในสไลด์มีแค่ชื่ออยู่ในหัวข้อ STDs และเป็น DDx ของ chancroid',
          'แยกแผลที่อวัยวะเพศ: syphilis ไม่เจ็บ · chancroid เจ็บ ก้นสกปรก · HSV ตุ่มน้ำเป็นกลุ่มเจ็บ'
        ],
        src: 'หน้า 32–33'
      },
      {
        id: 'b-lgv', g: 'std', k: 'ct',
        clue: 'แผลเล็กที่อวัยวะเพศ<b>ไม่เจ็บ หายเอง</b> → ต่อมา<b>ต่อมน้ำเหลืองขาหนีบโต อักเสบเป็นหนอง</b>; เกิดจาก serovar <b>L1–L3</b> ของแบคทีเรียภายในเซลล์ชนิดเดียวกับที่ทำให้ trachoma',
        org: '<i>Chlamydia trachomatis</i> L1–L3', opt: '<i>Chlamydia trachomatis</i>',
        dz: 'Lymphogranuloma venereum (LGV)',
        keys: [
          'เป็น DDx ของ chancroid',
          'Serovar: A–C trachoma · D–K urogenital / neonatal · L1–L3 LGV'
        ],
        src: 'หน้า 33, 61'
      },
      {
        id: 'b-ct-neonate', g: 'std', k: 'ct',
        clue: 'หญิงตั้งครรภ์ 38 สัปดาห์ ตกขาวเป็นหนอง; Gram พบ PMN แต่<b>ไม่พบ Gram− diplococci</b>, Thayer-Martin <b>ไม่ขึ้น</b>; DFA พบ <b>intracytoplasmic inclusion ที่มี elementary bodies</b> — ทารกที่คลอดทางช่องคลอดเสี่ยงอะไรที่สุด?',
        org: '<i>Chlamydia trachomatis</i> (serovar D–K)', opt: '<i>Chlamydia trachomatis</i>',
        dz: '→ Neonatal inclusion conjunctivitis (5–14 วัน) + interstitial pneumonia (staccato cough)',
        keys: [
          'D–K: nongonococcal urethritis, cervicitis, PID (→ มีบุตรยาก), acute inclusion conjunctivitis',
          'Dx: DFA / ELISA, PCR; neonatal pneumonia ตรวจ IgM antibody',
          'รักษา: doxycycline, azithromycin'
        ],
        exam: ['MED28-14'],
        src: 'หน้า 61'
      },
      {
        id: 'b-trachoma', g: 'std', k: 'ct',
        clue: 'เยื่อบุตาอักเสบเรื้อรังแบบเป็นเม็ด (granular conjunctivitis) → <b>แผลเป็นที่ tarsal plate</b> → <b>ขนตาม้วนเข้า (trichiasis)</b> ขูดกระจกตา → กระจกตาขุ่น → <b>ตาบอด</b>',
        org: '<i>Chlamydia trachomatis</i> (serovar A, B, Ba, C)', opt: '<i>Chlamydia trachomatis</i>',
        dz: 'Trachoma',
        keys: [
          'WHO แบ่งระยะ เช่น trachomatous scarring (TS), trichiasis (TT), corneal opacity (CO)'
        ],
        src: 'หน้า 61–62'
      },

      {
        id: 'b-typhoid', g: 'gi',
        clue: '<b>ไข้สูงลอยที่ค่อย ๆ ขึ้น</b> ปวดหัวด้านหน้ามาก <b>ชีพจรช้ากว่าไข้ (relative bradycardia)</b> + <b>rose spots</b> ที่หน้าท้อง; <b>สัปดาห์ที่ 3</b> ปวดท้องรุนแรง peritonitis จาก<b>แผลที่ Peyer patches ของ terminal ileum ทะลุ</b>',
        org: '<i>Salmonella enterica</i> serovar Typhi', opt: '<i>Salmonella</i> Typhi',
        dz: 'ไข้ไทฟอยด์ (Typhoid / enteric fever)',
        keys: [
          'ติดจากอาหารหรือน้ำปนเปื้อนอุจจาระของ<b>พาหะ (carrier)</b>',
          'สัปดาห์ 1: septicemia ไข้ขึ้นแล้วลอยสูง · สัปดาห์ 2: เชื้อเพิ่มใน macrophage ของ Peyer patches · สัปดาห์ 3: แผลในลำไส้ ถ่ายมูกเลือด เลือดออกหรือทะลุ',
          'Micro: necrotic epithelium, <b>erythrophagocytosis</b>',
          'Rose spots = ตุ่มสีชมพู 2–4 mm เป็นกลุ่มที่ลำตัว (พบน้อย)'
        ],
        exam: ['MED24-15'],
        src: 'หน้า 35–37'
      },
      {
        id: 'b-nts', g: 'gi',
        clue: 'คลื่นไส้อาเจียน <b>ถ่ายเหลวมากแต่เม็ดเลือดขาวในอุจจาระน้อย</b> หายใน 2–3 วัน; bacteremia พบน้อยยกเว้นภูมิคุ้มกันบกพร่อง; ถูก<b>สัตว์เลื้อยคลาน</b>กัดก็ติดได้',
        org: 'Non-typhoidal <i>Salmonella</i> (<i>S.</i> Enteritidis, <i>S.</i> Typhimurium)', opt: '<i>Salmonella</i> Enteritidis',
        dz: 'Salmonella enterocolitis',
        keys: [
          'มีมากกว่า 1,400 serogroups',
          'สัตว์เลื้อยคลานกัด → enteric Gram− bacilli (Salmonella)'
        ],
        src: 'หน้า 35, 49'
      },
      {
        id: 'b-cholera', g: 'gi',
        clue: 'หลังกินอาหารทะเลดิบ: <b>ถ่ายเหลวเป็นน้ำซาวข้าว (rice-water stool)</b> ปริมาณมหาศาล อาเจียน ขาดน้ำรุนแรง; เชื้อ <b>Gram− รูปจุลภาค (comma) เคลื่อนที่เร็วมาก</b>',
        org: '<i>Vibrio cholerae</i> (O1, O139)', opt: '<i>Vibrio cholerae</i>',
        dz: 'อหิวาตกโรค (Cholera)',
        keys: [
          'Cholera toxin (A-B) → <b>ADP-ribosylation ของ Gs α</b> → adenylate cyclase ทำงานตลอด → <b>cAMP สูง</b> → หลั่ง Cl<sup>−</sup> และน้ำออกสู่ลำไส้',
          'ฟักตัว 1–4 วัน',
          'Dx: phase contrast เห็นเชื้อเคลื่อนที่เร็ว, เพาะเชื้อ · รักษา: ให้น้ำเกลือ + tetracycline'
        ],
        exam: ['MED23-2'],
        src: 'หน้า 38–39'
      },
      {
        id: 'b-vpara', g: 'gi',
        clue: 'กระเพาะลำไส้อักเสบหลัง<b>กินอาหารทะเลไม่สุก</b> (รุนแรงน้อยกว่าอหิวาต์); เชื้อ<b>ชอบเกลือ (halophilic)</b>',
        org: '<i>Vibrio parahaemolyticus</i>',
        dz: 'Seafood-associated gastroenteritis',
        keys: [
          'ในโจทย์เก่ามักเป็นตัวลวงของ <i>V. vulnificus</i> และ <i>V. cholerae</i>'
        ],
        src: 'หน้า 38'
      },
      {
        id: 'b-vvul', g: 'gi',
        clue: 'ชาย 58 ปี <b>ตับแข็งจากสุรา</b> กิน<b>หอยนางรมดิบ</b> 18 ชม. → ไข้สูง <b>ตุ่มน้ำเลือด (hemorrhagic bullae)</b> + necrotizing cellulitis ขาทั้งสองข้าง + <b>septic shock</b>; เพาะเชื้อได้ Gram− รูปโค้ง <b>ชอบเกลือ และหมัก lactose ได้</b>',
        org: '<i>Vibrio vulnificus</i>',
        dz: 'Primary septicemia / necrotizing soft-tissue infection',
        keys: [
          'เสี่ยงมากในโรคตับ ภาวะเหล็กเกิน (hemochromatosis) และภูมิคุ้มกันต่ำ',
          'ติดได้ทั้งจากการกินอาหารทะเลดิบ และแผลที่สัมผัสน้ำทะเล',
          'อัตราตายสูงมาก'
        ],
        exam: ['MED24-11'],
        src: 'หน้า 38'
      },
      {
        id: 'b-etec', g: 'gi',
        clue: '<b>Traveler’s diarrhea</b>: ถ่ายเหลวเป็นน้ำจากอาหาร/น้ำ ด้วย <b>cholera-like toxin</b> โดยเชื้อ<b>ไม่ invade</b>',
        org: 'Enterotoxigenic <i>E. coli</i> (ETEC)',
        dz: 'Watery diarrhea',
        keys: [
          '<i>E. coli</i> ทุกกลุ่มทำให้เกิด traveler’s diarrhea ได้',
          '<i>E. coli</i> ยังเป็นสาเหตุของ UTI, meningitis, pneumonia'
        ],
        src: 'หน้า 40–41'
      },
      {
        id: 'b-ehec', g: 'gi',
        clue: 'กิน<b>แฮมเบอร์เกอร์ / เนื้อวัวไม่สุก</b> → <b>ถ่ายเป็นเลือด</b> → 5 วันต่อมาปัสสาวะออกน้อย บวม BP สูง ชัก; lab: <b>ไตวายเฉียบพลัน + เกล็ดเลือดต่ำ + schistocytes</b>',
        org: 'Enterohemorrhagic <i>E. coli</i> (EHEC) O157:H7', opt: 'Enterohemorrhagic <i>E. coli</i> O157:H7',
        dz: 'Hemorrhagic colitis → <b>Hemolytic uremic syndrome (HUS)</b>',
        keys: [
          '<b>Shiga-like toxin (verotoxin)</b> ทำลาย endothelium; เชื้อไม่ invade',
          'HUS = microangiopathic hemolytic anemia + thrombocytopenia + acute renal failure',
          'มีการระบาดของ <i>E. coli</i> O104:H4 ด้วย'
        ],
        exam: ['MED29-2'],
        src: 'หน้า 40–41'
      },
      {
        id: 'b-epec', g: 'gi',
        clue: 'ท้องเสียเป็นน้ำใน<b>ทารกและเด็กวัยเตาะแตะ</b> จากอาหารช่วงหย่านมหรือน้ำ; เชื้อ<b>เกาะและทำลายผิวเยื่อบุ (attach & efface)</b> แต่ไม่ invade',
        org: 'Enteropathogenic <i>E. coli</i> (EPEC)',
        dz: 'Infant watery diarrhea',
        keys: [
          'กลไกคือ attachment + effacement ไม่ได้อาศัย toxin แบบ ETEC/EHEC'
        ],
        src: 'หน้า 40–41'
      },
      {
        id: 'b-eiec', g: 'gi',
        clue: 'ไข้ ปวดท้อง <b>ถ่ายมูกเลือด (dysentery)</b> คล้ายโรคบิดจาก Shigella; เชื้อ <b>invade และลามเฉพาะที่</b>; ติดจากเนยแข็ง น้ำ หรือคนสู่คน',
        org: 'Enteroinvasive <i>E. coli</i> (EIEC)',
        dz: 'Dysentery (Shigella-like)',
        keys: [
          'เทียบ: ETEC น้ำ · EHEC เลือด + HUS · EPEC ทารก · EIEC บิดมูกเลือด'
        ],
        src: 'หน้า 40–41'
      },
      {
        id: 'b-campy', g: 'gi',
        clue: 'ดื่ม<b>นมดิบไม่พาสเจอร์ไรซ์</b>หรือเนยแข็ง (หรือกินสัตว์ปีกไม่สุก) 3 วันก่อน: ไข้สูง ปวดบิด <b>ถ่ายมูกเลือด เบ่งไม่สุด</b>; อุจจาระมี PMN และ RBC มาก; Gram พบ <b>Gram− รูปปีกนกนางนวล (gull-wing) เคลื่อนที่แบบพุ่ง (darting)</b>',
        org: '<i>Campylobacter jejuni</i>',
        dz: 'Inflammatory enteritis · comma-shaped Gram−',
        keys: [
          'เป็น flora ของวัวและสัตว์ปีก ติดจากอาหารปนเปื้อน',
          'Micro: ulcer, neutrophils; fecal leukocytes มาก',
          'ภาวะแทรกซ้อน: <b>reactive arthritis</b>, <b>Guillain-Barré syndrome</b>'
        ],
        exam: ['MED27-10'],
        src: 'หน้า 42–43'
      },
      {
        id: 'b-hpylori', g: 'gi',
        clue: '<b>Antral gastritis, duodenal ulcer</b> (พบใน ~90% ของ DU), gastric ulcer, <b>มะเร็งกระเพาะอาหาร</b> และ <b>gastric lymphoma</b>; เชื้อ Gram− รูปโค้งที่<b>สร้าง urease มาก</b>',
        org: '<i>Helicobacter pylori</i>',
        dz: 'Curvilinear Gram− bacilli',
        keys: [
          'พบใน 50–80% ของผู้ป่วย gastric ulcer',
          'Dx: <b>rapid urease test</b> จากชิ้นเนื้อสด (นิยม), serology, silver stain (Steiner)',
          'รักษา: <b>triple therapy</b> = PPI (omeprazole) + amoxicillin + clarithromycin'
        ],
        src: 'หน้า 44'
      },

      {
        id: 'b-pa-burn', g: 'gnb', k: 'pa',
        clue: 'ผู้ป่วย<b>แผลไฟไหม้ลึก 45% TBSA</b> วันที่ 4: ไข้สูง 39.5°C BP ต่ำ หายใจเร็ว; แผลมี<b>หนองสีเขียวอมฟ้า กลิ่นหวานคล้ายองุ่น</b>; Gram− bacilli <b>oxidase +</b>',
        org: '<i>Pseudomonas aeruginosa</i>',
        dz: 'Burn wound sepsis · nosocomial Gram− bacilli',
        keys: [
          'Pigment: <b>pyocyanin</b> (น้ำเงิน) + <b>pyoverdine</b> (เขียว)',
          'พบบ่อยใน: แผลไฟไหม้, <b>cystic fibrosis</b>, เม็ดเลือดขาวต่ำ, UTI',
          'Necrotizing pneumonia; ลิ้นหัวใจติดเชื้อในผู้ใช้ยาเสพติดทางเส้นเลือด',
          '<b>Ecthyma gangrenosum</b> ในแผลไฟไหม้หรือผู้ป่วย neutropenia'
        ],
        exam: ['MED25-19'],
        src: 'หน้า 50'
      },
      {
        id: 'b-pa-kerat', g: 'gnb', k: 'pa',
        clue: '<b>ผู้ใส่คอนแทคเลนส์</b>: ตาแดงรุนแรงเฉียบพลัน <b>มองไม่ชัดอย่างรวดเร็ว</b> มี<b>หนองข้นสีเขียว</b>ภายใน 24 ชม.; แผลกระจกตาลุกลามเร็ว liquefactive necrosis; Gram− rods oxidase + สร้าง pigment สีเขียวฟ้า',
        org: '<i>Pseudomonas aeruginosa</i>',
        dz: 'Bacterial keratitis (fulminant corneal ulcer)',
        keys: [
          '<b>Elastase</b> + <b>exotoxin A</b> ทำลายกระจกตาอย่างรวดเร็ว',
          'เทียบ <i>Acanthamoeba</i>: ปวดมากเกินรอยโรค, ring infiltrate, ไม่พบแบคทีเรีย'
        ],
        exam: ['MED27-9'],
        src: 'หน้า 50'
      },
      {
        id: 'b-pa-ear', g: 'gnb', k: 'pa',
        clue: '<b>หูชั้นนอกอักเสบหลังว่ายน้ำ (swimmer’s ear)</b> มีหนองเหลืองเขียว; ในผู้ป่วยภูมิคุ้มกันต่ำลุกลามเป็น <b>malignant otitis externa</b>',
        org: '<i>Pseudomonas aeruginosa</i>',
        dz: 'Otitis externa',
        keys: [
          'Nosocomial infection ที่พบบ่อย: แผลไฟไหม้, cystic fibrosis, UTI, keratitis จากคอนแทคเลนส์'
        ],
        src: 'หน้า 50'
      },
      {
        id: 'b-acineto', g: 'gnb',
        clue: '<b>ปอดอักเสบจากเครื่องช่วยหายใจ (VAP)</b> และ UTI จากสายสวนในผู้ป่วยนอนโรงพยาบาล; Gram− coccobacilli ตัวเล็ก <b>ดื้อยาฆ่าเชื้อสูงมาก</b>',
        org: '<i>Acinetobacter baumannii</i>',
        dz: 'Nosocomial / ventilator-associated pneumonia',
        keys: [
          'ปอดอักเสบในผู้ป่วยภูมิต่ำ สูบบุหรี่ ติดสุรา เบาหวาน หรือมีโรคปอด'
        ],
        src: 'หน้า 51'
      },
      {
        id: 'b-melioid', g: 'gnb',
        clue: 'ชาวนาใน<b>เอเชียตะวันออกเฉียงใต้หรือออสเตรเลียตอนเหนือ</b> (มักเป็น<b>เบาหวาน</b>) มีแผลถลอกสัมผัสดิน/น้ำ: ไข้ WBC สูง <b>ปอดกลีบบนเป็น consolidation</b> ต่อมาไข้ลด ภาพ CXR <b>คล้ายวัณโรค</b> หรือ sepsis รุนแรง',
        org: '<i>Burkholderia pseudomallei</i>',
        dz: 'Melioidosis (Whitmore’s disease) · small aerobic Gram− bacillus ที่อยู่ในดิน',
        keys: [
          'ติดทางแผลถลอก อาจกินหรือสูดหายใจ',
          'เป็นได้ทั้ง acute, subacute, chronic; รูปแบบปอดพบบ่อยที่สุด',
          'อัตราตายสูงถ้าไม่รักษา — นึกถึงในคนจากพื้นที่ระบาดที่มี upper lobe pneumonia รุนแรงหรือโรคทั่วร่างกายที่หาสาเหตุไม่ได้'
        ],
        src: 'หน้า 51'
      },
      {
        id: 'b-kleb', g: 'gnb',
        clue: '<b>ผู้ติดสุราหรือเบาหวาน</b> มี aspiration pneumonia (เสมหะเหนียวสีแดงคล้ายวุ้นลูกเกด), CAP, nosocomial infection, UTI; Gram− rod <b>มีแคปซูล</b>',
        org: '<i>Klebsiella pneumoniae</i>',
        dz: 'Encapsulated Gram− rod',
        keys: [
          'การรักษาขึ้นกับระบบอวัยวะที่ติดเชื้อ'
        ],
        src: 'หน้า 52'
      },
      {
        id: 'b-hacek', g: 'gnb',
        clue: 'Infective endocarditis จากแบคทีเรีย Gram− ที่<b>โตช้า เลี้ยงยาก (fastidious)</b> กลุ่มที่เรียกด้วยตัวย่อ 5 ตัว',
        org: 'HACEK group',
        dz: '<i>Haemophilus</i> (<i>Aggregatibacter</i>), <i>Actinobacillus</i>, <i>Cardiobacterium</i>, <i>Eikenella</i>, <i>Kingella</i>',
        keys: [
          'เพาะเชื้อขึ้นช้า จึงทำให้ blood culture ขึ้นช้าหรือไม่ขึ้นในผู้ป่วย IE'
        ],
        src: 'หน้า 45'
      },

      {
        id: 'b-plague', g: 'zoo',
        clue: 'หลังเดินทางไปพื้นที่ระบาด: ไข้สูง หนาวสั่น BP ต่ำ + <b>ต่อมน้ำเหลืองขาหนีบโตมากและเจ็บมาก (bubo)</b>; เพาะเชื้อได้ Gram− bacilli oxidase − ติดสีแบบ <b>bipolar “safety-pin”</b>',
        org: '<i>Yersinia pestis</i>',
        dz: 'กาฬโรค (Plague) — bubonic / septicemic / pneumonic',
        keys: [
          'Vector: <b>หมัดหนู (<i>Xenopsylla cheopis</i>)</b>',
          'สูดละอองฝอย → primary pneumonic plague'
        ],
        exam: ['MED29-1'],
        src: 'หน้า 46'
      },
      {
        id: 'b-lepto', g: 'zoo',
        clue: 'เกษตรกร<b>ลุยน้ำท่วม แช่น้ำที่ปนเปื้อนฉี่หนูหรือวัว</b> 1–2 สัปดาห์: ไข้สูง ปวดศีรษะ <b>ปวดกล้ามเนื้อ (โดยเฉพาะน่อง)</b> ตาแดง; รายรุนแรง <b>ตัวเหลืองมาก + ไตวาย + เลือดออก</b>',
        org: '<i>Leptospira interrogans</i>',
        dz: 'โรคฉี่หนู (Leptospirosis) · spirochete, zoonosis',
        keys: [
          'Reservoir: หนู วัว แมว สุนัข ขับเชื้อทางปัสสาวะ; เข้าทางแผล เยื่อบุ หรือการกิน',
          'Anicteric: <b>leptospiremic phase</b> (ไข้ ปวดหัว ปวดกล้ามเนื้อ ตับม้ามโต) → <b>leptospiruric phase</b> (aseptic meningitis)',
          'Severe = <b>Weil’s syndrome</b>: ดีซ่านรุนแรง ตับม้ามโต ไตวาย เลือดออกในทางเดินอาหาร ผิวหนัง สมอง',
          'Dx: dark-field, agglutination antibody · รักษา: penicillin, ampicillin, amoxicillin, erythromycin'
        ],
        src: 'หน้า 47'
      },
      {
        id: 'b-bartonella', g: 'zoo',
        clue: 'ถูก<b>ลูกแมวข่วน</b> 3–4 สัปดาห์ก่อน: มีตุ่มแดงที่รอยข่วน + ไข้ต่ำ + <b>ต่อมน้ำเหลืองโตเจ็บข้างเดียวกัน</b> (ใต้คางหรือรักแร้); ตัดต่อมพบ <b>stellate necrotizing granuloma</b> ล้อมด้วย palisading histiocytes มี neutrophil microabscess ตรงกลาง',
        org: '<i>Bartonella henselae</i>',
        dz: 'Cat-scratch disease · Gram− bacilli',
        keys: [
          'พยาธิ: granulomatous inflammation + abscess (<b>suppurative granuloma</b>)',
          'ต่างจาก <i>Pasteurella multocida</i> ที่ทำให้ cellulitis เร็วภายใน 24 ชม.หลังถูกกัด'
        ],
        exam: ['MED23-5', 'MED28-9'],
        src: 'หน้า 48'
      },
      {
        id: 'b-pasteurella', g: 'zoo',
        clue: '<b>ถูกแมวหรือสุนัขกัด</b> → ปวด แดง บวมมาก<b>อย่างรวดเร็วภายใน 8 ชม. (ปกติ 2–24 ชม.)</b> มีน้ำเหลืองปนเลือด + ท่อน้ำเหลืองอักเสบ; Gram พบ <b>Gram− coccobacilli เล็ก ติดสีหัวท้าย (bipolar)</b>',
        org: '<i>Pasteurella multocida</i>',
        dz: 'Animal bite cellulitis',
        keys: [
          'รักษา: <b>amoxicillin-clavulanate</b>, fluoroquinolones, tetracycline',
          'คนกัด: <i>Eikenella</i>, anaerobes, strep, staph · สัตว์เลื้อยคลาน: enteric Gram− (Salmonella)'
        ],
        exam: ['MED25-15'],
        src: 'หน้า 49'
      },
      {
        id: 'b-eikenella', g: 'zoo',
        clue: 'แผล<b>คนกัด</b> (รวมถึงแผลที่ข้อนิ้วจากการต่อยปากคู่กรณี) ติดเชื้อ — แบคทีเรีย Gram− จากช่องปากคน ที่มักพบร่วมกับ anaerobes, strep, staph',
        org: '<i>Eikenella corrodens</i>',
        dz: 'Human bite infection · กลุ่ม HACEK',
        keys: [
          'เป็นหนึ่งในกลุ่ม HACEK ที่ทำให้ infective endocarditis ได้'
        ],
        src: 'หน้า 45, 49'
      },
      {
        id: 'b-rmsf', g: 'zoo',
        clue: 'ถูก<b>เห็บ (tick)</b> กัด: ไข้ ปวดกล้ามเนื้อ + ผื่น maculopapular <b>เริ่มที่ปลายแขนขา ฝ่ามือ ฝ่าเท้า แล้วลามเข้าหาลำตัว</b> → sepsis',
        org: '<i>Rickettsia rickettsii</i>',
        dz: 'Rocky Mountain spotted fever (spotted fever group)',
        keys: [
          'Rickettsia ทำลาย arteriole และ capillary → <b>necrotizing vasculitis</b>',
          'Spotted fever และ scrub typhus group <b>มี eschar</b> · typhus group <b>ไม่มี eschar</b>',
          'รักษา: <b>doxycycline</b>'
        ],
        src: 'หน้า 65–66'
      },
      {
        id: 'b-akari', g: 'zoo',
        clue: 'โรคกลุ่ม <b>spotted fever</b> ที่ติดจาก<b>ไรหนู (mite)</b> กัด ไม่ใช่เห็บ — มี eschar ได้',
        org: '<i>Rickettsia akari</i>',
        dz: 'Rickettsialpox',
        keys: [
          'Spotted fever group มี eschar ได้'
        ],
        src: 'หน้า 65'
      },
      {
        id: 'b-prowazekii', g: 'zoo',
        clue: 'Typhus ที่ติดจาก<b>อุจจาระเหา (<i>Pediculus humanus</i>)</b> — หายแล้วกลับเป็นซ้ำได้อีกหลายปีต่อมาเรียกว่า <b>Brill-Zinsser disease</b>; ไม่มี eschar',
        org: '<i>Rickettsia prowazekii</i>',
        dz: 'Epidemic typhus',
        keys: [
          'Typhus group ไม่มี eschar'
        ],
        src: 'หน้า 66'
      },
      {
        id: 'b-rtyphi', g: 'zoo',
        clue: 'Typhus ที่ติดจาก<b>อุจจาระหมัดหนู (rat flea)</b>; อยู่ในกลุ่ม typhus จึงไม่มี eschar',
        org: '<i>Rickettsia typhi</i>',
        dz: 'Murine (endemic) typhus',
        keys: [
          'เป็นตัวลวงในโจทย์ scrub typhus (MED27 ข้อ 11)'
        ],
        src: 'หน้า 66–67'
      },
      {
        id: 'b-scrub', g: 'zoo',
        clue: 'เจ้าหน้าที่ป่าไม้กลับจาก<b>เดินป่าในป่าละเมาะ (scrub jungle)</b> 10 วัน: ไข้สูง ปวดหัวรุนแรง ต่อมน้ำเหลืองโตทั่วตัว ผื่น MP ที่ลำตัว + <b>แผลสะเก็ดดำไม่เจ็บ 6 mm มีขอบแดง (eschar)</b> ที่ขาหนีบ',
        org: '<i>Orientia tsutsugamushi</i>',
        dz: 'ไข้รากสาดใหญ่ (Scrub typhus)',
        keys: [
          'Vector: <b>ตัวอ่อนไรอ่อน (chigger, larval trombiculid mite)</b>; อาการเริ่ม 7–10 วันหลังถูกกัด',
          'รายรุนแรง: pneumonitis, meningitis, myocarditis, multiorgan failure',
          'Dx: <b>indirect fluorescent antibody (IFA)</b> เป็นหลัก'
        ],
        exam: ['MED27-11'],
        src: 'หน้า 68–70'
      },

      {
        id: 'b-tb-primary', g: 'myco', k: 'mtb',
        clue: 'การติดเชื้อปฐมภูมิที่ปอด: รอยโรคใต้เยื่อหุ้มปอดที่<b>ส่วนล่างของกลีบบนหรือส่วนบนของกลีบล่าง (Ghon focus)</b> + <b>ต่อมน้ำเหลือง hilar มี caseation</b> = <b>Ghon complex</b>; 90% ไม่ดำเนินโรคต่อ',
        org: '<i>Mycobacterium tuberculosis</i>',
        dz: 'Primary pulmonary tuberculosis',
        keys: [
          'M. tuberculosis complex: <i>M. tuberculosis</i>, <i>M. bovis</i>, <i>M. africanum</i>, <i>M. microti</i>',
          'อาการ: อ่อนเพลีย น้ำหนักลด ไข้; ส่วนใหญ่หายเป็นแผลเป็น',
          '<b>Miliary TB</b>: แพร่ทางน้ำเหลืองหรือเลือดไปตับ ม้าม ฯลฯ โดยเฉพาะในผู้ป่วยภูมิต่ำ'
        ],
        src: 'หน้า 54–57'
      },
      {
        id: 'b-tb-secondary', g: 'myco', k: 'mtb',
        clue: 'ไข้ต่ำ <b>ไอเรื้อรัง เสมหะอาจมีเลือดปน เหงื่อออกกลางคืน น้ำหนักลด</b> เบื่ออาหาร; CXR พบ<b>โพรง (cavity) ที่ยอดปอดทั้งสองข้าง</b>',
        org: '<i>Mycobacterium tuberculosis</i>',
        dz: 'Secondary (reactivation) pulmonary TB',
        keys: [
          'Reactivation หรือ reinfection; ชอบ O<sub>2</sub> สูงที่ apex ปอด → ทำลายเนื้อปอดเป็นโพรง',
          'Extrapulmonary: <b>TB lymphadenitis</b> พบบ่อยที่สุด'
        ],
        src: 'หน้า 56–58'
      },
      {
        id: 'b-mac', g: 'myco',
        clue: 'ผู้ป่วย <b>AIDS ที่ CD4 <50 cells/µL</b>: ติดเชื้อกระจายที่ปอด ทางเดินอาหาร กระดูก; ต่อมน้ำเหลืองพบ <b>macrophage อัดแน่นด้วย acid-fast bacilli</b>',
        org: '<i>Mycobacterium avium</i> complex (MAC)', opt: '<i>Mycobacterium avium</i> complex',
        dz: 'Nontuberculous mycobacteria (<i>M. avium</i>, <i>M. intracellulare</i>)',
        keys: [
          'พบในภูมิคุ้มกันต่ำ เช่น AIDS, leukemia; gross ไม่จำเพาะ',
          'รักษา: <b>clarithromycin หรือ azithromycin + ethambutol</b>'
        ],
        src: 'หน้า 58–59'
      },
      {
        id: 'b-lep-tuberc', g: 'myco', k: 'leprae',
        clue: 'Plaque <b>ขอบชัดนูนแดง ตรงกลางแบนจาง ด่างขาว ชา ไม่มีเหงื่อ ขนร่วง</b> จำนวนน้อย ไม่สมมาตร; ชิ้นเนื้อเป็น granuloma พบเชื้อน้อยมาก',
        org: '<i>Mycobacterium leprae</i>',
        dz: 'Tuberculoid leprosy',
        keys: [
          'ติดต่อทางการหายใจ; ดำเนินโรคช้า มีกล้ามเนื้อลีบ แผล ข้อติด',
          'Dx: ขูดรอยโรคย้อม <b>Ziehl-Neelsen</b>',
          'รักษา: dapsone, rifampin, clofazimine'
        ],
        src: 'หน้า 59–61'
      },
      {
        id: 'b-lep-leprom', g: 'myco', k: 'leprae',
        clue: 'รอยโรค<b>ผื่นและตุ่มจำนวนมาก กระจายสมมาตร ขอบไม่ชัด</b> ทั่วตัว ใบหน้าหนาเป็นปุ่ม กล้ามเนื้อลีบ; ชิ้นเนื้อพบ <b>macrophage อัดแน่นด้วยเชื้อ (AFB)</b>',
        org: '<i>Mycobacterium leprae</i>',
        dz: 'Lepromatous leprosy (รุนแรงกว่า tuberculoid)',
        keys: [
          'Tuberculoid = รอยโรคน้อย มี granuloma เชื้อน้อย · Lepromatous = รอยโรคมาก สมมาตร เชื้อเต็ม macrophage'
        ],
        src: 'หน้า 60–61'
      }
    ]
  },

  /* ================================================================
   * PARASITE
   * ================================================================ */
  {
    id: 'parasite',
    name: 'Parasite',
    th: 'ปรสิต',
    code: 'P',
    lecture: 'Parasitic infection',
    groups: {
      cns: 'สมอง · ตา',
      blood: 'เลือด · น้ำเหลือง',
      nema: 'พยาธิตัวกลมลำไส้',
      cest: 'พยาธิตัวตืด',
      proto: 'โปรโตซัวลำไส้',
      trem: 'พยาธิใบไม้',
      tissue: 'เนื้อเยื่อ · ผิวหนัง · STD'
    },
    cards: [
      {
        id: 'p-naegleria', g: 'cns',
        clue: '<b>ว่ายน้ำหรือดำน้ำในแหล่งน้ำจืดที่อุ่น</b> → ไม่กี่วันต่อมา meningoencephalitis รุนแรง<b>เสียชีวิตเร็ว</b>; CSF เหมือน bacterial meningitis (glucose ต่ำ protein สูง WBC สูง) แต่พบ trophozoite',
        org: '<i>Naegleria fowleri</i>',
        dz: 'Primary amebic meningoencephalitis (PAM) — พบน้อยแต่ตายสูง',
        keys: [
          'มี 3 ระยะ: ameboid trophozoite, flagellate, cyst',
          'Dx: trophozoite/cyst ใน CSF, PCR, histology (เห็น trophozoite ในเนื้อสมอง)'
        ],
        src: 'หน้า 1–2'
      },
      {
        id: 'p-acanth-gae', g: 'cns', k: 'acanth',
        clue: 'ผู้ป่วย<b>ภูมิคุ้มกันต่ำ</b>มี encephalitis แบบ<b>ก้อน (mass lesion)</b> ค่อยเป็นค่อยไป จากการแพร่ทางเลือดจากปอด ผิวหนัง หรือแผล',
        org: '<i>Acanthamoeba</i> spp.',
        dz: 'Granulomatous amebic encephalitis (GAE)',
        keys: [
          'พบในน้ำและดิน; ติดผิวหนัง ปอด ต่อมหมวกไตได้'
        ],
        src: 'หน้า 2'
      },
      {
        id: 'p-acanth-kerat', g: 'cns', k: 'acanth',
        clue: '<b>ผู้ใส่คอนแทคเลนส์ที่ล้างหรือแช่เลนส์ด้วยน้ำประปา</b>: ปวดตารุนแรง<b>เกินกว่ารอยโรค</b> กลัวแสง ตามัว; กระจกตามี <b>ring-shaped stromal infiltrate</b>; Gram ไม่พบแบคทีเรีย; Giemsa พบ <b>polygonal double-walled cysts</b> + trophozoite มีหนาม (acanthopodia)',
        org: '<i>Acanthamoeba castellanii</i>',
        dz: 'Acanthamoeba keratitis',
        keys: [
          'ปัจจัยเสี่ยงสำคัญที่สุด: คอนแทคเลนส์ + น้ำประปาหรือน้ำเกลือที่ปนเปื้อน',
          'Dx: corneal scraping, indirect IF, culture',
          'เทียบ <i>Pseudomonas</i> keratitis: หนองเขียว ลุกลามเร็วใน 24 ชม. พบ Gram− rods'
        ],
        exam: ['MED23-16', 'MED27-8'],
        src: 'หน้า 2'
      },
      {
        id: 'p-toxo-cong', g: 'cns', k: 'toxo', hl: true,
        clue: 'ทารกแรกเกิด <b>hydrocephalus + chorioretinitis + หินปูนในสมอง (cerebral calcification)</b>; แม่ช่วงตั้งครรภ์ไม่มีอาการ เลี้ยงแมวหรือเปลี่ยนทรายแมว',
        org: '<i>Toxoplasma gondii</i>',
        dz: 'Congenital toxoplasmosis — TORCH (“T”)',
        keys: [
          'ติดผ่านรก; แม่มักไม่มีอาการ; ลูกอาจมีอาการทางตาหรือสมองภายหลัง',
          'TORCH: Toxoplasma, Other (Parvovirus B19, Zika, syphilis), Rubella, CMV, HSV',
          'Dx: amniotic fluid (immunology, PCR); ตา: PCR aqueous/vitreous humor, <b>Goldmann-Witmer coefficient</b>'
        ],
        src: 'หน้า 4–5'
      },
      {
        id: 'p-toxo-hiv', g: 'cns', k: 'toxo', hl: true,
        clue: 'ผู้ป่วย <b>HIV</b> มี <b>focal neurological signs</b>; MRI พบ <b>ring-enhancing lesion</b> มี edema และ mass effect (reactivation)',
        org: '<i>Toxoplasma gondii</i>',
        dz: 'Toxoplasmic encephalitis',
        keys: [
          'CSF PCR ไม่ไวแต่จำเพาะ; serology มักเป็น <b>IgG+ / IgM−</b>',
          'Smear: tachyzoite รูป<b>พระจันทร์เสี้ยว</b> และเซลล์ที่มี tachyzoite จำนวนมาก',
          'ยืนยันด้วย histology ของเนื้อสมองได้'
        ],
        src: 'หน้า 4–5'
      },
      {
        id: 'p-toxo-acute', g: 'cns', k: 'toxo', hl: true,
        clue: 'คนภูมิปกติ: อาการคล้าย <b>infectious mononucleosis</b> — ต่อมน้ำเหลืองอักเสบ ไข้ ปวดหัว อ่อนเพลีย หลัง<b>กินเนื้อดิบที่มี tissue cyst</b> หรือ<b>สัมผัสกระบะทราย/ทรายแมว (oocysts)</b>',
        org: '<i>Toxoplasma gondii</i>',
        dz: 'Acute toxoplasmosis (คนภูมิปกติส่วนใหญ่ไม่มีอาการ)',
        keys: [
          '<b>แมว = definitive host</b> (sexual reproduction ในลำไส้แมว → oocysts) · หนู = intermediate host',
          'Tachyzoite = ระยะแบ่งตัวเร็ว · bradyzoite = อยู่ใน tissue cyst (latent)',
          'ติดทางการให้เลือดหรือปลูกถ่ายอวัยวะได้; chronic: hepatitis, myocarditis, encephalitis, retinochoroiditis'
        ],
        src: 'หน้า 3–4'
      },
      {
        id: 'p-angio', g: 'cns',
        clue: 'กิน<b>หอยโข่ง (Pila) ดิบ</b> กุ้งน้ำจืด หรือปู → 2 สัปดาห์ต่อมาปวดหัวรุนแรง อาเจียน คอแข็ง; CSF พบ <b>eosinophil 45%</b>, protein สูง, <b>glucose ปกติ</b> (eosinophilic meningitis)',
        org: '<i>Angiostrongylus cantonensis</i>',
        dz: 'Eosinophilic meningitis (พยาธิปอดหนู)',
        keys: [
          '<b>หนู = definitive host</b>, คน = incidental host',
          'Dx: CSF (มักไม่เห็นตัวพยาธิ), serology',
          'รักษา: supportive + ค่อย ๆ เจาะระบาย CSF (ตัวอ่อนตายเอง)',
          'CSF จากปรสิต: OP สูง, eosinophil เด่น, protein สูง, glucose ปกติ'
        ],
        exam: ['MED24-7'],
        src: 'หน้า 6–7'
      },
      {
        id: 'p-csf', g: 'cns', mcq: false,
        clue: 'เทียบ CSF: <b>eosinophil เด่น + glucose ปกติ</b> · <b>neutrophil ≥1,000 + glucose ≤40</b> · <b>lymphocyte <100 + glucose ปกติ</b> · <b>lymphocyte + glucose ต่ำ</b> — แต่ละแบบคือเชื้อกลุ่มใด?',
        org: 'Parasite · Bacterial · Viral · TB/Fungal',
        dz: 'Typical CSF findings in meningitis',
        keys: [
          'Parasite: OP สูง, WBC แปรผัน, <b>eosinophil</b>, protein สูง, glucose ปกติ',
          'Bacterial: OP สูง, WBC ≥1,000/µL, <b>neutrophil</b>, protein สูงมาก, glucose ≤40 mg/dL',
          'Viral: OP มักปกติ, WBC <100/µL, <b>lymphocyte</b> (PMN ช่วงแรก), glucose ปกติ',
          'Fungal / TB: lymphocyte, protein สูง, <b>glucose ต่ำ</b> (TB อาจ <45 mg/dL)',
          'PAM จาก <i>Naegleria</i> CSF เหมือน bacterial'
        ],
        src: 'หน้า 7'
      },

      {
        id: 'p-chagas', g: 'blood', hl: true,
        clue: 'กลับจาก<b>อเมริกาใต้/กลาง หรือเม็กซิโก</b>: ไข้ หนาวสั่น ปวดกล้ามเนื้อ + <b>ตุ่มแดงเจ็บตรงรอยกัด (chagoma)</b> หรือ<b>ตาบวมข้างเดียว + เยื่อบุตาอักเสบ (Romaña sign)</b> + acute myocarditis; เลือดพบ <b>trypomastigote</b> กล้ามเนื้อหัวใจพบ <b>amastigote</b>',
        org: '<i>Trypanosoma cruzi</i>',
        dz: 'Chagas disease (American trypanosomiasis)',
        keys: [
          'Vector: <b>Triatomine (reduviid, kissing) bug</b> เช่น <i>Triatoma infestans</i>, <i>Rhodnius prolixus</i> — เชื้ออยู่ใน<b>อุจจาระแมลง</b> เข้าทางเยื่อบุตาหรือรอยเกา',
          'Reservoir: แมว สุนัข; ติดทางเลือดหรือปลูกถ่ายอวัยวะได้',
          'Amastigote อยู่ในเซลล์กล้ามเนื้อหัวใจ glial cells และ RE cells',
          'Chronic (10–30%): <b>cardiomyopathy, arrhythmia, megacolon, megaesophagus</b>',
          'Dx: Giemsa blood smear, histology, serology (IIF, ELISA) · รักษา: benznidazole, nifurtimox'
        ],
        exam: ['MED25-4'],
        src: 'หน้า 8–9, 12'
      },
      {
        id: 'p-sleeping', g: 'blood', hl: true,
        clue: 'กลับจาก<b>แอฟริกาใต้ซาฮารา</b> ถูก<b>แมลงวัน tsetse</b> กัด: <b>chancre</b> ตรงรอยกัด ไข้เป็นพัก ๆ ปวดกล้ามเนื้อ <b>ต่อมน้ำเหลืองคอด้านหลังโต (Winterbottom’s sign)</b> → ต่อมา<b>วงจรการนอนผิดปกติ</b> มีอาการทางจิตประสาท → coma',
        org: '<i>Trypanosoma brucei</i> (<i>gambiense</i> / <i>rhodesiense</i>)', opt: '<i>Trypanosoma brucei</i>',
        dz: 'African trypanosomiasis (sleeping sickness)',
        keys: [
          'ไม่มีระยะในเซลล์ แต่<b>เปลี่ยนแอนติเจนผิว</b>หลบภูมิคุ้มกัน',
          '<i>gambiense</i> = West Africa (ดำเนินโรคเป็นเดือนถึงปี) · <i>rhodesiense</i> = East Africa รุนแรงและเร็วกว่า อาจไม่มี Winterbottom; reservoir คือวัวและสัตว์ป่า',
          'Dx: trypomastigote ใน blood smear, ต่อมน้ำเหลือง, chancre, CSF',
          'รักษา: suramin, melarsoprol, pentamidine, eflornithine; ไม่รักษาเสียชีวิต'
        ],
        src: 'หน้า 10–12'
      },
      {
        id: 'p-leish-cut', g: 'blood', k: 'leish',
        clue: 'ทหารกลับจาก<b>อิรัก/ตะวันออกกลาง</b>: ตุ่มแดงแข็ง<b>ไม่เจ็บ</b> → <b>แผลขอบนูน ตรงกลางเป็นหลุม</b> ที่ใบหูหรือใบหน้า; biopsy พบ <b>amastigote รูปไข่ไม่มีแส้ มี kinetoplast รูปแท่ง</b> อยู่ใน macrophage',
        org: '<i>Leishmania</i> spp.',
        dz: 'Cutaneous leishmaniasis (Oriental sore)',
        keys: [
          'Vector: <b>ริ้นฝอยทราย (Phlebotomine sand fly)</b> ฉีด promastigote',
          'พบใน South Asia, Middle East, Africa, Central/South America',
          'Amastigote ของ <i>Leishmania</i> แยกจาก <i>T. cruzi</i> ด้วยรูปร่าง<b>ไม่ได้</b>',
          'Dx: Giemsa touch-prep, tissue, culture หา promastigote, PCR'
        ],
        exam: ['MED24-8'],
        src: 'หน้า 13–14'
      },
      {
        id: 'p-leish-visc', g: 'blood', k: 'leish',
        clue: 'ไข้เรื้อรัง <b>น้ำหนักลด ตับม้ามโตมาก</b> ต่อมน้ำเหลืองโต + <b>pancytopenia</b> + <b>albumin ต่ำ</b>; ไขกระดูกพบ amastigote ใน macrophage',
        org: '<i>Leishmania</i> spp. (visceral)', opt: '<i>Leishmania</i> spp.',
        dz: 'Visceral leishmaniasis (kala-azar)',
        keys: [
          '3 รูปแบบ: cutaneous, mucocutaneous, visceral',
          'Dx: bone marrow, serology, molecular (แยก species), isoenzyme analysis'
        ],
        src: 'หน้า 13'
      },
      {
        id: 'p-pf', g: 'blood',
        clue: 'ไข้หนาวสั่นสูงถึง 41°C ~2 สัปดาห์หลังยุงกัด <b>ไข้ต่อเนื่องไม่เป็นรอบชัด</b> ซีด ม้ามโต + <b>ซึม ชัก (cerebral malaria)</b>, <b>ปัสสาวะสีดำ (blackwater fever)</b>, ปอดบาดเจ็บเฉียบพลัน',
        org: '<i>Plasmodium falciparum</i>',
        dz: 'Severe (falciparum) malaria',
        keys: [
          'ทำให้<b>หลอดเลือดฝอยอุดตัน</b> → อันตรายถึงชีวิตถ้าไม่รักษา',
          'ไข้แบบ tertian แต่อาจต่อเนื่องหรือลดลงเพียงสั้น ๆ',
          'Dx: <b>thick and thin Giemsa smear</b> ซ้ำทุก 6–12 ชม. จนครบ 48 ชม., serology, PCR'
        ],
        src: 'หน้า 16–17'
      },
      {
        id: 'p-pv', g: 'blood', hl: true,
        clue: 'มาลาเรียแบบ <b>tertian (ไข้วันเว้นวัน)</b> หายแล้ว<b>กลับเป็นซ้ำได้อีกหลายปีต่อมา</b> จาก <b>hypnozoites ที่แฝงอยู่ในตับ</b>',
        org: '<i>Plasmodium vivax</i> / <i>P. ovale</i>',
        dz: 'Relapsing malaria',
        keys: [
          'มาลาเรียชนิดที่ไม่ใช่ falciparum มักหายเอง อัตราตายต่ำ',
          'ต้องให้ยาที่กำจัด hypnozoite (เช่น primaquine) เพื่อป้องกัน relapse'
        ],
        src: 'หน้า 16–17'
      },
      {
        id: 'p-pm', g: 'blood',
        clue: 'มาลาเรียแบบ <b>quartan</b> — ไข้<b>ทุก 72 ชม.</b> (จันทร์ไข้ อังคาร-พุธไม่ไข้ พฤหัสไข้)',
        org: '<i>Plasmodium malariae</i>',
        dz: 'Quartan malaria',
        keys: [
          'Tertian (ทุก 48 ชม.): <i>P. vivax</i>, <i>P. ovale</i>, <i>P. falciparum</i>'
        ],
        src: 'หน้า 16'
      },
      {
        id: 'p-babesia', g: 'blood',
        clue: 'ไข้คล้ายมาลาเรีย + hemolytic anemia + เกล็ดเลือดต่ำ ใน<b>ผู้ตัดม้าม</b>หรือผู้สูงอายุ หลังถูก<b>เห็บกวาง (<i>Ixodes scapularis</i>)</b> กัดในสหรัฐฯ; Giemsa พบ <b>merozoite 4 ตัวเรียงเป็นกากบาท (Maltese cross)</b> มี ring form แต่<b>ไม่มีรงควัตถุสีน้ำตาล</b>',
        org: '<i>Babesia microti</i>',
        dz: 'Babesiosis',
        keys: [
          'เห็บระยะ nymph; หนู white-footed mice เป็นรังโรค',
          'ติดทางการให้เลือดหรือผ่านรกได้ (พบน้อย)',
          'Dx: Giemsa blood film, serology (IFA), PCR'
        ],
        src: 'หน้า 17'
      },
      {
        id: 'p-wb', g: 'blood', hl: true,
        clue: '<b>ชายแดนไทย-พม่า</b> ยุงลายป่า (<b>Aedes niveus group</b>) ยุงลายเสือ หรือยุงรำคาญ: <b>ขาโตแบบเท้าช้างเหนือเข่า</b>; เจาะเลือด<b>ตอนกลางคืน</b>ทำ thick smear พบ microfilariae',
        org: '<i>Wuchereria bancrofti</i>',
        dz: 'Lymphatic filariasis (โรคเท้าช้าง)',
        keys: [
          'พยาธิตัวเต็มวัยในต่อมน้ำเหลือง → อักเสบ → ท่อน้ำเหลืองอุดตัน',
          'ยุงพาหะ: <i>Aedes niveus</i> group (ยุงลายป่า), <i>Mansonia dives</i> (ยุงลายเสือ), <i>Culex quinquefasciatus</i> (ยุงรำคาญ)',
          'รักษา: <b>diethylcarbamazine (DEC)</b> ฆ่าได้เฉพาะ microfilariae'
        ],
        src: 'หน้า 18'
      },
      {
        id: 'p-bm', g: 'blood',
        clue: '<b>ภาคใต้ของไทย</b> ยุงลายเสือ (<i>Mansonia</i> spp.) หรือยุงก้นปล่อง: <b>ขาโตแบบเท้าช้างใต้เข่า</b>; พบ microfilariae ในเลือดตอนกลางคืน',
        org: '<i>Brugia malayi</i>',
        dz: 'Lymphatic filariasis (โรคเท้าช้าง)',
        keys: [
          'เทียบ <i>W. bancrofti</i>: ชายแดนไทย-พม่า ขาโตเหนือเข่า'
        ],
        src: 'หน้า 18'
      },

      {
        id: 'p-ascaris', g: 'nema',
        clue: 'เด็กกินดินปนเปื้อน<b>ไข่พยาธิ</b>: ปวดท้อง <b>ลำไส้ ไส้ติ่ง หรือท่อน้ำดีอุดตัน</b>จากตัวพยาธิ; ช่วงตัวอ่อนผ่านปอดเกิด <b>Löffler’s syndrome</b>; ไข่ขอบหยัก<b>เป็นคลื่น (scalloped)</b>',
        org: '<i>Ascaris lumbricoides</i>',
        dz: 'พยาธิไส้เดือน · nematode ลำไส้เล็ก',
        keys: [
          'Löffler’s syndrome (eosinophilic pneumonitis): <i>Ascaris</i>, hookworm, <i>Strongyloides</i>',
          'ไข่มีทั้ง fertilized (เปลือกหยัก), decorticated และ infertile'
        ],
        src: 'หน้า 18–21, 40'
      },
      {
        id: 'p-hook', g: 'nema',
        clue: 'เด็ก<b>เดินเท้าเปล่าบนดิน</b>: ซีด อ่อนเพลีย ไม่สบายท้อง; <b>microcytic hypochromic iron-deficiency anemia</b> (Hb 7.2); คันที่เท้า (ground itch); อุจจาระพบ<b>ไข่รูปไข่ เปลือกบางใส</b>',
        org: 'Hookworm (<i>Necator americanus</i> / <i>Ancylostoma duodenale</i>)', opt: 'Hookworm (<i>Necator</i> / <i>Ancylostoma</i>)',
        dz: 'พยาธิปากขอ · nematode ลำไส้เล็ก',
        keys: [
          'ติดโดย <b>filariform larva ไชผ่านผิวหนัง</b> → ปอด (Löffler) → กลืนลงลำไส้เล็ก → ดูดเลือด',
          'ทำให้ larva migrans (ground itch)'
        ],
        exam: ['MED23-19'],
        src: 'หน้า 19–20, 22'
      },
      {
        id: 'p-strongy', g: 'nema',
        clue: 'ผู้ป่วยได้ <b>steroid หรือยากดภูมิ</b>: ปวดท้อง ท้องเสีย อาเจียน + ผื่นคืบเร็ว (<b>larva currens</b>) → <b>hyperinfection / disseminated</b> ไปปอด สมอง + ติดเชื้อ Gram− ในกระแสเลือดจากลำไส้; อุจจาระพบ <b>rhabditiform larva</b>',
        org: '<i>Strongyloides stercoralis</i>',
        dz: 'Strongyloidiasis / hyperinfection syndrome',
        keys: [
          'ตัวอ่อนในดินไชผิวหนัง; <b>autoinfection</b> (internal/external) ทำให้อยู่ในร่างกายได้นาน',
          'Rhabditiform larva: <b>genital primordium เด่น, buccal cavity สั้น</b>',
          'Dx: serial stool, duodenal aspirate, BAL/sputum, serology (ไวกว่าแต่ cross-react)',
          '<b>ควรตรวจก่อนให้ยากดภูมิคุ้มกัน</b>'
        ],
        src: 'หน้า 19–20, 22'
      },
      {
        id: 'p-entero', g: 'nema',
        clue: 'เด็กอนุบาล<b>คันรอบทวารหนักมากตอนกลางคืน</b> นอนไม่หลับ หงุดหงิด เพื่อนในห้องเป็นด้วย; <b>scotch tape test ตอนเช้า</b> พบไข่<b>แบนด้านหนึ่ง นูนอีกด้าน</b> มีตัวอ่อนอยู่ข้างใน',
        org: '<i>Enterobius vermicularis</i>',
        dz: 'พยาธิเข็มหมุด (pinworm) · nematode ลำไส้ใหญ่',
        keys: [
          'ติดทางกินไข่ (มือ-ปาก, retroinfection), ติดกันในครอบครัวหรือคนสู่คน และติดซ้ำบ่อย',
          'อาจทำให้ช่องคลอดอักเสบ (vulvovaginitis)',
          'ไม่ผ่านปอด'
        ],
        exam: ['MED25-13'],
        src: 'หน้า 19–20, 23'
      },
      {
        id: 'p-trichuris', g: 'nema',
        clue: 'เด็กชนบท ปวดบิดท้องน้อย <b>ถ่ายมูกเลือด เบ่งไม่สุด</b> ซีด ขาดอาหาร + <b>ลำไส้ตรงปลิ้น (rectal prolapse)</b>; ไข่<b>รูปถังเบียร์มีจุกใสสองข้าง (bipolar plugs)</b>',
        org: '<i>Trichuris trichiura</i>',
        dz: 'พยาธิแส้ม้า (whipworm) · nematode ลำไส้ใหญ่',
        keys: [
          'ติดจากกินไข่ในดิน; ไม่ผ่านปอด'
        ],
        exam: ['MED27-18'],
        src: 'หน้า 19–20, 23'
      },
      {
        id: 'p-capillaria', g: 'nema',
        clue: 'กิน<b>ปลาน้ำจืดดิบ (ก้อยปลา)</b>: <b>ท้องเสียเรื้อรังรุนแรง</b> น้ำหนักลด บวม จาก <b>protein-losing enteropathy</b> อาจผอมแห้งจนเสียชีวิต; ไข่<b>รูปถั่วลิสง เปลือกมีลายเส้น จุกสองข้างแบน</b>',
        org: '<i>Capillaria philippinensis</i>',
        dz: 'Intestinal capillariasis · nematode ลำไส้เล็ก',
        keys: [
          'เป็นพยาธิของ<b>นกที่กินปลา</b>',
          '<b>Autoinfection</b>: ตัวอ่อนไชกลับเข้าเยื่อบุลำไส้ได้',
          'ไม่ผ่านปอด'
        ],
        exam: ['MED23-20'],
        src: 'หน้า 18–21'
      },

      {
        id: 'p-tsolium', g: 'cest', hl: true,
        clue: 'กิน<b>หมูดิบ</b>หรือกลืนไข่พยาธิ → <b>cysticercosis</b> (ถุงซีสต์ในกล้ามเนื้อหรือสมอง); scolex มี<b>ทั้ง sucker และ hooks</b>; gravid proglottid มีแขนงมดลูก<b>น้อยกว่า</b>ตืดวัว',
        org: '<i>Taenia solium</i>',
        dz: 'พยาธิตืดหมู · Taeniasis / cysticercosis',
        keys: [
          '<b>Cysticercosis เกิดจากตืดหมู</b> (จุดที่ไฮไลต์ไว้ในชีท)',
          'Cysticercus = ถุงน้ำขนาดเม็ดถั่วที่มี scolex พับอยู่ข้างใน',
          'ตัวเต็มวัยอยู่ใน<b>ลำไส้เล็ก</b>; ไข่และปล้องออกมาในอุจจาระหลังติด ≥2 เดือน',
          'Dx: proglottid/ไข่ในอุจจาระ (ตรวจซ้ำ ใช้ concentration), serology (<i>T. solium</i>), coproantigen, PCR'
        ],
        src: 'หน้า 24–25'
      },
      {
        id: 'p-tsaginata', g: 'cest',
        clue: 'กิน<b>เนื้อวัวดิบ</b> (ลาบหรือก้อยเนื้อ) ที่มี cysticerci → พยาธิตัวเต็มวัยในลำไส้เล็ก คลื่นไส้ ปวดท้อง ท้องเสีย (หรือไม่มีอาการ) มี<b>ปล้องพยาธิหลุดออกมากับอุจจาระ</b>',
        org: '<i>Taenia saginata</i>',
        dz: 'พยาธิตืดวัว',
        keys: [
          'Scolex ไม่มี hooks; แขนงมดลูกใน gravid proglottid มากกว่าตืดหมู',
          'ไม่ทำให้ cysticercosis ในคน'
        ],
        src: 'หน้า 24–25'
      },
      {
        id: 'p-hnana', g: 'cest', hl: true,
        clue: 'พยาธิตัวตืดที่พบ<b>บ่อยที่สุดในสหรัฐฯ (dwarf tapeworm)</b>; <b>ไข่ติดสู่คนได้โดยตรง → autoinfection</b>; หรือติดจากกิน cysticercoid ใน<b>หมัดหรือด้วงในธัญพืช</b>',
        org: '<i>Hymenolepis nana</i>',
        dz: 'Hymenolepiasis',
        keys: [
          'มักไม่มีอาการ หรือไม่สบายท้อง',
          'Dx: ไข่ในอุจจาระ — ไข่ <i>H. diminuta</i> ใหญ่กว่า 2 เท่าและไม่มี polar filaments'
        ],
        src: 'หน้า 25'
      },
      {
        id: 'p-echino', g: 'cest',
        clue: 'เลี้ยง<b>สุนัขและแกะ</b> กินอาหารปนเปื้อนอุจจาระสุนัข → <b>ถุงน้ำในตับ</b> (ปอด กระดูก สมอง); ถุงแตก → <b>anaphylactic shock</b>; ในถุงพบ <b>brood capsule ที่มี protoscolices</b>',
        org: '<i>Echinococcus granulosus</i>',
        dz: 'Hydatid disease (dog tapeworm)',
        keys: [
          'คน = accidental intermediate host · แกะ = intermediate host ทั่วไป · สุนัข = definitive host',
          '<i>E. multilocularis</i> → multilocular cyst (พบน้อยกว่า)',
          'Dx: ภาพรังสี, กล้องจุลทรรศน์, serology (IFA)'
        ],
        src: 'หน้า 26, 40'
      },
      {
        id: 'p-dlatum', g: 'cest', hl: true,
        clue: 'กิน<b>ปลาดิบหรือปลาไม่สุก</b>ที่มีตัวอ่อน (plerocercoid / sparganum) → ไม่สบายท้อง ท้องเสีย + <b>megaloblastic anemia จากขาดวิตามิน B12</b>',
        org: '<i>Diphyllobothrium latum</i>',
        dz: 'Fish tapeworm',
        keys: [
          'ตัวเต็มวัยเกาะผนังลำไส้เล็ก แย่ง B12',
          'Dx: ไข่ในอุจจาระ'
        ],
        src: 'หน้า 27'
      },

      {
        id: 'p-ehisto', g: 'proto', k: 'ehisto',
        clue: 'ปวดบิดท้องน้อย เบ่งไม่สุด <b>ถ่ายมูกเลือด</b> 2 สัปดาห์; ส่องกล้องพบ<b>แผลรูปขวดคอแคบ (flask-shaped ulcers)</b> ที่ cecum; อุจจาระพบ <b>trophozoite ที่กลืนเม็ดเลือดแดง (erythrophagocytosis)</b>',
        org: '<i>Entamoeba histolytica</i>',
        dz: 'Amebic dysentery / colitis',
        keys: [
          'ติดจากกิน <b>cyst (4 nuclei)</b> ทาง fecal-oral',
          'พยาธิ: <b>liquefactive necrosis</b> กว้าง เซลล์อักเสบน้อย (protease, amoebapore)',
          'Dx: stool (แยกจาก <i>E. dispar</i>), fecal antigen, PCR, serology'
        ],
        exam: ['MED23-6'],
        src: 'หน้า 28–29'
      },
      {
        id: 'p-ehisto-liver', g: 'proto', k: 'ehisto',
        clue: 'ไข้ ปวดชายโครงขวา ตับโต พบ<b>ฝีในตับ</b> — โปรโตซัวลำไส้ที่แพร่ไปตับ (หรือสมอง) หลังเคยถ่ายมูกเลือด',
        org: '<i>Entamoeba histolytica</i>',
        dz: 'Amebic liver abscess',
        keys: [
          'Dx: serology (<i>E. histolytica</i> titer), ภาพรังสี, histology'
        ],
        src: 'หน้า 28'
      },
      {
        id: 'p-giardia', g: 'proto',
        clue: '<b>ดื่มน้ำลำธารบนเขาโดยไม่ต้ม</b> (ตั้งแคมป์) 3 สัปดาห์ก่อน: ท้องเสียเป็นน้ำ <b>กลิ่นเหม็น มันลอย (steatorrhea)</b> ท้องอืด ผายลม malabsorption; อุจจาระพบ trophozoite <b>รูปลูกแพร์ 2 นิวเคลียส มีแส้ และ sucking disk</b>',
        org: '<i>Giardia duodenalis</i> (<i>lamblia</i>)', opt: '<i>Giardia duodenalis</i>',
        dz: 'Giardiasis',
        keys: [
          'กลุ่มเสี่ยง: เด็กในสถานรับเลี้ยง นักเดินทาง',
          'ลำไส้เล็กอักเสบเล็กน้อย <b>villous atrophy</b>',
          'Trophozoite: 2 nuclei, แส้ 4 คู่, suction disk · Cyst: ผนังหนา 4 nuclei มี internal fibers',
          'Dx: stool, stool antigen (ELISA), PCR'
        ],
        exam: ['MED25-14'],
        src: 'หน้า 30–31'
      },
      {
        id: 'p-balantidium', g: 'proto',
        clue: 'เลี้ยงหรือสัมผัส<b>หมู</b>: ท้องเสีย ลำไส้อักเสบเป็นแผล; อุจจาระพบ <b>trophozoite ขนาดใหญ่ที่มี cilia</b> หรือ cyst ใหญ่ที่มี<b>นิวเคลียสรูปตัว V</b>',
        org: '<i>Balantidium coli</i>',
        dz: 'Balantidiasis — โปรโตซัวที่มีขน (ciliate)',
        keys: [
          'หมูเป็นรังโรค; ไม่พบรอยโรคนอกลำไส้'
        ],
        src: 'หน้า 30'
      },
      {
        id: 'p-blasto', g: 'proto',
        clue: 'ท้องเสีย ผายลม; trichrome stain พบ<b>ระยะคล้ายซีสต์ที่มี vacuole ใหญ่ตรงกลาง</b>; บทบาทก่อโรคยังไม่ชัดเจน',
        org: '<i>Blastocystis hominis</i>',
        dz: 'Blastocystosis',
        keys: [
          'ติดจากกิน cyst; มักรักษาได้ผลดี'
        ],
        src: 'หน้า 29'
      },
      {
        id: 'p-crypto', g: 'proto',
        clue: 'ท้องเสียเป็นน้ำ อาเจียน ขาดน้ำ — <b>ระบาดจากสระว่ายน้ำ (ทนคลอรีน)</b>; ใน<b>ผู้ป่วย AIDS เป็นเรื้อรังรุนแรง</b>; modified AFB พบ oocyst <b>เล็กมาก 4–5 µm</b> ติดสีไม่สม่ำเสมอ (“ghost”)',
        org: '<i>Cryptosporidium</i> spp. (<i>C. parvum</i>, <i>C. hominis</i>)', opt: '<i>Cryptosporidium parvum</i>',
        dz: 'Cryptosporidiosis',
        keys: [
          'Oocyst ติดเชื้อได้ทันทีที่ออกมา → ติดคนสู่คนได้',
          'อาศัยในเยื่อบุลำไส้เล็ก (และทางเดินอาหารส่วนอื่น เยื่อบุตา ปอด)',
          'Dx: modified AFB, fluorochrome, antigen detection, PCR'
        ],
        src: 'หน้า 31–32'
      },
      {
        id: 'p-cyclospora', g: 'proto',
        clue: '<b>ระบาดหลังงานเลี้ยง</b> (ผักหรือผลไม้สด) ~7 วันต่อมา: ท้องเสียเป็นน้ำ ปวดบิด อ่อนเพลีย ไข้ต่ำ; modified AFB พบ oocyst <b>8–10 µm ติดสีไม่สม่ำเสมอ</b> + <b>เรืองแสงเองใต้ UV (autofluorescence)</b>',
        org: '<i>Cyclospora cayetanensis</i>',
        dz: 'Cyclosporiasis',
        keys: [
          'Oocyst ต้อง sporulate นอกร่างกาย → <b>ไม่ติดคนสู่คน</b>',
          'ขนาด oocyst: <i>Cryptosporidium</i> 4–5 µm < <b><i>Cyclospora</i> 8–10 µm</b> < <i>Cystoisospora</i> 20–30 µm',
          'อาการ: ท้องเสียไม่มีเลือด malabsorption น้ำหนักลด อุจจาระมีไขมัน; รุนแรงในผู้ป่วยภูมิต่ำและทารก'
        ],
        exam: ['MED23-17'],
        src: 'หน้า 32–33'
      },
      {
        id: 'p-cystoiso', g: 'proto',
        clue: 'ผู้ป่วยภูมิคุ้มกันต่ำ ท้องเสียไม่มีเลือด อุจจาระมีไขมัน + <b>eosinophilia</b> (ซึ่งโปรโตซัวลำไส้ตัวอื่นมักไม่ทำ); modified AFB พบ oocyst <b>ใหญ่รูปรี 20–30 µm</b>',
        org: '<i>Cystoisospora</i> (<i>Isospora</i>) <i>belli</i>', opt: '<i>Cystoisospora belli</i>',
        dz: 'Cystoisosporiasis',
        keys: [
          'ผนัง oocyst เรืองแสงใต้ UV ได้เช่นกัน',
          'ติดจากอาหารหรือน้ำที่ปนเปื้อน oocyst ไม่ติดคนสู่คน'
        ],
        src: 'หน้า 32'
      },
      {
        id: 'p-sarco', g: 'proto',
        clue: 'กิน<b>เนื้อวัวหรือหมูดิบ</b>ที่มี sarcocysts (เอเชียตะวันออกเฉียงใต้ มาเลเซีย): ท้องเสีย ไข้ต่ำ (คน = definitive host) หรือ<b>กล้ามเนื้ออักเสบ ปวดกล้ามเนื้อ ไข้</b> (คน = intermediate host); muscle biopsy พบ sarcocysts',
        org: '<i>Sarcocystis</i> spp.',
        dz: 'Intestinal / muscular sarcocystosis',
        keys: [
          '<i>S. hominis</i> (วัว), <i>S. suihominis</i> (หมู) → intestinal sarcocystosis',
          'Stool: oocyst 15–20 µm มี 2 sporocysts หรือ sporocyst (เรืองแสง)'
        ],
        src: 'หน้า 33–34'
      },

      {
        id: 'p-ov', g: 'trem',
        clue: '<b>ภาคอีสาน ลาว กัมพูชา</b> กิน<b>ปลาน้ำจืดดิบหรือหมักเกลือ (ก้อยปลา ปลาร้า)</b>: ท้องอืด ปวดท้อง → ท่อน้ำดีอักเสบ ถุงน้ำดีอักเสบ ตับโต → <b>มะเร็งท่อน้ำดี (cholangiocarcinoma)</b>',
        org: '<i>Opisthorchis viverrini</i>',
        dz: 'พยาธิใบไม้ตับ (Opisthorchiasis)',
        keys: [
          'Metacercaria อยู่ในเนื้อหรือใต้เกล็ดปลา',
          'ไข่: <b>opercular shoulder + abopercular knob</b>',
          'กลไกเกิด CCA: chronic inflammation, periductal fibrosis, nitrosamines จากอาหารหมัก'
        ],
        src: 'หน้า 35–36'
      },
      {
        id: 'p-fasciola', g: 'trem',
        clue: 'ชาวนา<b>ภาคเหนือ</b> กิน<b>ผักน้ำดิบ (ผักบุ้ง ผักกระเฉด watercress)</b> เป็นประจำ: ปวดชายโครงขวา ไข้ต่ำ <b>ตัวเหลืองมากขึ้น</b> (DB, ALP สูง); อุจจาระพบไข่<b>มีฝาปิด ใหญ่มาก ~140×70 µm</b> สีเหลืองน้ำตาล',
        org: '<i>Fasciola hepatica</i> / <i>F. gigantica</i>', opt: '<i>Fasciola hepatica</i>',
        dz: 'Fascioliasis (พยาธิใบไม้ตับขนาดใหญ่)',
        keys: [
          'ตัวเต็มวัยอยู่ใน<b>ท่อน้ำดี</b>; วัว หมู แกะ เป็นโฮสต์และถ่ายลงแหล่งน้ำ',
          'อาการ: ไข้ คลื่นไส้ ปวดท้อง ตับโต ผื่น; เรื้อรัง → ตับอักเสบเรื้อรังและพังผืด',
          'ไข่ปลาย abopercular ขรุขระ คล้ายไข่ <i>Fasciolopsis</i>'
        ],
        exam: ['MED24-6'],
        src: 'หน้า 39–40'
      },
      {
        id: 'p-fbuski', g: 'trem', hl: true,
        clue: 'กิน<b>พืชน้ำดิบ เช่น กระจับ (water chestnut)</b> → ปวดท้อง ท้องเสียเรื้อรัง <b>ลำไส้อุดตัน</b> (หรือไม่มีอาการ); พยาธิใบไม้<b>ลำไส้</b>ขนาดใหญ่ที่อยู่ในลำไส้เล็กของคนและหมู',
        org: '<i>Fasciolopsis buski</i>',
        dz: 'พยาธิใบไม้ลำไส้ขนาดใหญ่ (Fasciolopsiasis)',
        keys: [
          'Dx: ไข่ในอุจจาระ (เกือบเหมือนไข่ <i>Fasciola hepatica</i>)'
        ],
        src: 'หน้า 38'
      },
      {
        id: 'p-echinostoma', g: 'trem',
        clue: 'กิน<b>หอย หอยกาบ หรือปลาดิบ</b> (metacercaria): ปวดท้อง ท้องเสีย ไข้ (หรือไม่มีอาการ); ไข่มีฝา ปลาย abopercular <b>หนาขึ้น</b>',
        org: '<i>Echinostoma</i> spp.',
        dz: 'Echinostomiasis (พยาธิใบไม้ลำไส้)',
        keys: [
          'โฮสต์กึ่งกลาง: นกน้ำ สัตว์ฟันแทะ สัตว์กินเนื้อ',
          'ไข่คล้ายไข่ <i>Fasciolopsis</i>'
        ],
        src: 'หน้า 37'
      },
      {
        id: 'p-paragonimus', g: 'trem',
        clue: 'ชาวชนบทกิน<b>ปูน้ำตกหรือปูป่าดิบ</b> (หรือ crayfish): ไอเรื้อรัง เจ็บหน้าอก ไข้ต่ำ <b>เสมหะสีสนิมเหล็ก</b>; CXR มี ring shadow <b>คล้ายวัณโรคแต่ AFB ลบ</b>; เสมหะพบ<b>ไข่มีฝาสีน้ำตาลทอง</b>',
        org: '<i>Paragonimus</i> spp. (<i>P. heterotremus</i>, <i>P. westermani</i>)', opt: '<i>Paragonimus westermani</i>',
        dz: 'พยาธิใบไม้ปอด (pulmonary distomiasis)',
        keys: [
          'ในไทยพบ <i>P. heterotremus</i> มากที่สุด',
          'ตัวอ่อนฟักในลำไส้ → ไชผ่านผนังลำไส้ → ช่องท้อง → กะบังลม → ปอด; ไปสมอง → ชัก',
          'Eosinophilia, lung fibrosis',
          'Dx: เสมหะ (ไข่มีเปลือกหนาตรงข้าม operculum), อุจจาระ (กลืนเสมหะ), CXR'
        ],
        exam: ['MED23-18'],
        src: 'หน้า 40–41'
      },
      {
        id: 'p-smansoni', g: 'trem',
        clue: 'ชาวนา<b>อียิปต์</b> (แอฟริกา อเมริกาใต้) ท้องโต <b>ม้ามโตมาก</b> อาเจียนเป็นเลือดจาก<b>เส้นเลือดขอดหลอดอาหาร</b>; ชิ้นเนื้อตับพบพังผืดรอบ portal เป็นแถบ = <b>Symmers pipe-stem fibrosis</b>',
        org: '<i>Schistosoma mansoni</i>',
        dz: 'Hepatosplenic schistosomiasis → presinusoidal portal hypertension',
        keys: [
          'ไข่ที่ติดค้างกระตุ้น CMI → <b>chronic granulomatous inflammation</b> + พังผืดรอบ portal vein',
          'ตัวเต็มวัยอยู่ใน mesenteric venules ของ colon → ไข่ออกทางอุจจาระ (ไข่มี<b>หนามด้านข้าง</b>)',
          'ติดจาก <b>cercariae ไชผิวหนัง</b>ขณะลงน้ำจืด'
        ],
        exam: ['MED24-2'],
        src: 'หน้า 45–47'
      },
      {
        id: 'p-shaem', g: 'trem',
        clue: 'เคยอยู่<b>แอฟริกาใต้ซาฮารา</b> ว่ายน้ำหรืออาบน้ำในทะเลสาบ-แม่น้ำ: <b>ปัสสาวะเป็นเลือดช่วงท้าย (terminal hematuria)</b> ปัสสาวะแสบ ปวดเหนือหัวหน่าว; ปัสสาวะพบไข่<b>ไม่มีฝา มีหนามที่ปลาย (terminal spine)</b>',
        org: '<i>Schistosoma haematobium</i>',
        dz: 'Urinary schistosomiasis',
        keys: [
          'ตัวเต็มวัยอยู่ใน <b>vesical venous plexus</b>',
          'แทรกซ้อนด้วย UTI จากแบคทีเรีย',
          'ติดจาก <b>cercariae ไชผ่านผิวหนัง</b>ในน้ำจืดที่มีหอย'
        ],
        exam: ['MED27-7'],
        src: 'หน้า 45–47'
      },
      {
        id: 'p-sjapon', g: 'trem',
        clue: '<b>ลุ่มน้ำโขง (ลาว-กัมพูชา) จีน ฟิลิปปินส์</b>: เลือดออกทางเดินอาหาร ตับโต <b>ม้ามโตมาก</b>; พยาธิใบไม้เลือดที่อยู่ใน mesenteric venules',
        org: '<i>Schistosoma japonicum</i> / <i>S. mekongi</i>', opt: '<i>Schistosoma japonicum</i>',
        dz: 'Intestinal / hepatosplenic schistosomiasis',
        keys: [
          'Dx: ตรวจอุจจาระและปัสสาวะแบบเข้มข้น, histodiagnosis',
          'ไข่กลม มีหนามด้านข้างเล็กมาก'
        ],
        src: 'หน้า 45–47'
      },

      {
        id: 'p-trichinella', g: 'tissue',
        clue: 'กิน<b>ลาบหมูดิบหรือเนื้อหมูป่า</b>: ท้องเสีย ปวดท้อง 1–2 สัปดาห์ก่อน → ไข้สูง <b>หนังตาบวมสองข้าง</b> <b>ปวดกล้ามเนื้อรุนแรง</b> ผื่น splinter hemorrhage; <b>eosinophil 35%</b>',
        org: '<i>Trichinella spiralis</i>',
        dz: 'Trichinellosis',
        keys: [
          'ติดจากกินเนื้อที่มี encysted larvae; ตัวอ่อนไปฝังในกล้ามเนื้อลาย',
          'Dx: <b>muscle biopsy</b> (deltoid, gastrocnemius) พบ <b>nurse cell</b> + ตัวอ่อนขด, serology, molecular',
          'ภาวะแทรกซ้อน: myocarditis, CNS, pneumonitis, thromboembolism',
          'รักษา: mebendazole หรือ albendazole'
        ],
        exam: ['MED28-12', 'MED27-19'],
        src: 'หน้า 42–43'
      },
      {
        id: 'p-gnatho', g: 'tissue',
        clue: 'กิน<b>ปลาน้ำจืดดิบ (ปลาดุก ปลาช่อน) กบ งู หรือไก่ดิบ</b>: <b>ก้อนบวมเคลื่อนที่ได้ เป็น ๆ หาย ๆ เจ็บและคัน</b> หรือรอยนูนแดงคดเคี้ยว + <b>eosinophilia สูง (40%)</b>',
        org: '<i>Gnathostoma spinigerum</i>',
        dz: 'พยาธิตัวจี๊ด — cutaneous / visceral larva migrans',
        keys: [
          'Definitive host: แมว สุนัข; คนติดจากกิน L3',
          'ตัวอ่อนไชไปอวัยวะอื่นได้ (visceral larva migrans)',
          'Dx: serology, histology'
        ],
        exam: ['MED27-23'],
        src: 'หน้า 44–45'
      },
      {
        id: 'p-scabies', g: 'tissue',
        clue: '<b>คันมากโดยเฉพาะกลางคืน</b> ผื่นและรอยไชเป็นเส้นที่<b>ง่ามนิ้ว ข้อมือด้านใน ข้อศอก ก้น รักแร้ เต้านม</b>; คนในบ้านเป็นด้วย; ผู้สูงอายุหรือผู้ป่วยภูมิต่ำมี<b>สะเก็ดหนา (crusted / Norwegian)</b>',
        org: '<i>Sarcoptes scabiei</i>',
        dz: 'หิด (Scabies)',
        keys: [
          'ติดต่อโดยสัมผัสใกล้ชิด เกิดได้ทุกวัยทุกฐานะ',
          'Dx: <b>skin scraping</b> (ขุดตัวไรเพศเมียจากรูไช), dermoscopy, serology, molecular'
        ],
        src: 'หน้า 48–49'
      },
      {
        id: 'p-trichomonas', g: 'tissue',
        clue: 'หญิง: <b>ตกขาวสีเขียวเหลือง เป็นฟอง กลิ่นแรง</b> คัน แสบขัด; ตรวจพบ<b>ปากมดลูกเป็นจุดแดงเหมือนสตรอว์เบอร์รี่ (strawberry cervix)</b>; ชายส่วนใหญ่ไม่มีอาการ',
        org: '<i>Trichomonas vaginalis</i>',
        dz: 'Trichomoniasis (STD)',
        keys: [
          'ชาย: urethritis, prostatitis — ส่วนใหญ่เป็นพาหะไม่มีอาการ',
          'Dx: <b>wet prep</b> เห็นตัวเคลื่อนที่มีแส้ (POCT), NAAT',
          'รักษาคู่นอนพร้อมกัน; ถุงยางอนามัยป้องกันได้'
        ],
        src: 'หน้า 49–50'
      }
    ]
  }
];

if (typeof module !== 'undefined') module.exports = PDX_DECKS;
