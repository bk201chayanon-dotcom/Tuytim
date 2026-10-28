# -*- coding: utf-8 -*-
"""Topic 2 — Infectious immunodiagnosis: syphilis, hepatitis B and C serology
(handout "Infectious Immunodiag 69"; national guidelines quoted in the handout).
`src` gives the handout PDF page (two slides per page)."""

CARDS = []

def card(id, cat, q, answers, explain, img=None, kw=None, src=None, report=None):
    CARDS.append({'id': id, 'category': cat, 'question': q, 'answers': answers, 'explain': explain,
                  'imageRef': img, 'keywords': kw, 'src': src, 'report': report})

def slip(rows, note=None, title='Serology'):
    return {'title': title, 'rows': rows, 'note': note}

R, NR = 'Reactive', 'Nonreactive'
SEC = ["secondary syphilis", "secondary stage syphilis", "syphilis secondary stage"]
CLATA = ["condyloma lata", "condylomata lata", "condyloma latum"]

# ============================================================ Syphilis: stages and lesions
card('syph-chancre', 'syph-clin', 'จงให้การวินิจฉัยพร้อมระบุระยะของโรค (แผลที่ถุงอัณฑะ ไม่เจ็บ พื้นแผลสะอาด)',
     ["primary syphilis", "syphilitic chancre", "chancre", "hard chancre", "primary syphilis chancre"],
     'Primary syphilis: chancre เริ่มจาก painless papule แล้วกลายเป็น clean-based ulcer หายเองใน 3–6 สัปดาห์ ร่วมกับต่อมน้ำเหลืองขาหนีบโต ระยะฟักตัวเฉลี่ย 21 วัน (10–90+ วัน)',
     img='syph_chancre', src='หน้า 1–2')
card('des-chancre', 'syph-clin', 'จงบรรยายลักษณะของแผล chancre ใน primary syphilis',
     ["Painless papule that becomes a clean-based ulcer"],
     'สไลด์: chancre — painless papule → a clean based ulcer and regresses 3–6 weeks',
     img='syph_chancre', src='หน้า 1',
     kw=[["painless", "not painful", "ไม่เจ็บ"], ["clean base", "clean based", "พื้นแผลสะอาด"], ["ulcer", "แผล"]])
card('des-chancre-histo', 'syph-clin', 'ชิ้นเนื้อจากแผล chancre พบการอักเสบแบบใด และมีเซลล์อะไรบ้าง',
     ["Chronic inflammation: plasma cells, lymphocytes and macrophages, with organisms"],
     'สไลด์: microscopic — chronic inflammation (plasma cell, lymphocyte, macrophage) and organisms',
     img=None, src='หน้า 1',
     kw=[["chronic inflammation", "chronic"], ["plasma cell", "plasma cells"], ["lymphocyte", "lymphocytes"],
         ["macrophage", "macrophages", "histiocytes"]])
card('syph-incubation', 'syph-clin', 'ระยะฟักตัวของ primary syphilis โดยเฉลี่ยประมาณกี่วัน',
     ["21 days", "21", "21 วัน", "3 weeks", "3 สัปดาห์", "three weeks"],
     'Primary syphilis: incubation period 21 days (10–90+)',
     img=None, src='หน้า 1')
card('syph-ln', 'syph-clin', 'ใน primary syphilis ที่อวัยวะเพศ มักพบต่อมน้ำเหลืองบริเวณใดโต',
     ["inguinal lymph nodes", "inguinal", "inguinal lymphadenopathy", "ขาหนีบ"],
     'Primary syphilis: inguinal lymphadenopathy',
     img=None, src='หน้า 1')
card('syph-palms', 'syph-clin', 'จงให้การวินิจฉัยพร้อมระบุระยะของโรค (ผื่นที่ฝ่ามือทั้งสองข้างในวัยรุ่นที่มีเพศสัมพันธ์ไม่ป้องกัน)', SEC,
     'Secondary syphilis: ham-colored palmar macules — ผื่นที่ลำตัว แขนขา ฝ่ามือ ฝ่าเท้า ปรากฏ 2 สัปดาห์ถึง 6 เดือนหลังแผล chancre หาย ร่วมกับต่อมน้ำเหลืองโตทั่วตัว ไข้ อ่อนเพลีย',
     img='syph_palms', src='หน้า 1, 3')
card('syph-trunk', 'syph-clin', 'จงให้การวินิจฉัยพร้อมระบุระยะของโรค (ผื่นแดงรูปไข่มีขุยกระจายทั่วลำตัว)', SEC,
     'Multiple oval, erythematous, scaling plaques of various sizes over the trunk (secondary syphilis)',
     img='syph_trunk', src='หน้า 3')
card('syph-clata-perianal', 'syph-clin', 'จงบอกชื่อรอยโรค (ก้อนนูนแบน ผิวเรียบชื้น รอบทวารหนัก ในผู้ป่วยที่มีผื่นที่ฝ่ามือ)', CLATA,
     'Perianal condylomata lata ของ secondary syphilis — ต่างจาก condyloma acuminata (หูดหงอนไก่จาก HPV) ที่ผิวขรุขระคล้ายดอกกะหล่ำ',
     img='syph_clata_perianal', src='หน้า 3')
card('syph-clata-abc', 'syph-clin', 'จงบอกชื่อรอยโรค (ตุ่มแบนผิวถลอก เรียบ สีชมพูขาว ที่หน้าอก สะดือ และข้อพับเข่า)', CLATA,
     'Condyloma lata: multiple eroded, smooth, pink-white papules on the chest (A), umbilicus (B), popliteal fossa (C)',
     img='syph_clata_abc', src='หน้า 3')
card('des-clata-palate', 'syph-clin', 'จงบอกชื่อรอยโรคที่เพดานปาก (ตุ่ม papillary หลายตุ่ม) และระยะของซิฟิลิส',
     ["Condyloma lata of secondary syphilis"],
     'Condyloma lata: multiple papillary nodules of the soft and hard palate (secondary syphilis)',
     img='syph_clata_palate', src='หน้า 2',
     kw=[CLATA, ["secondary", "secondary syphilis", "ระยะที่ 2"]])
card('syph-mpatch-lip', 'syph-clin', 'จงบอกชื่อรอยโรค (แผ่นสีขาวเป็นทางยาวที่ด้านในริมฝีปากล่าง ในผู้ป่วยที่มีผื่นทั่วตัว)',
     ["mucous patch", "mucous patches", "snail track ulcer", "snail track ulcers", "mucous patch of secondary syphilis"],
     'Secondary syphilis-related oral mucous patches: whitish mucous patches with a "snail-track" appearance — พบได้ถึง 1/3 ของผู้ป่วยระยะที่ 2',
     img='syph_mpatch_lip', src='หน้า 1, 4')
card('des-mpatch-tongue', 'syph-clin', 'จงบอกชื่อรอยโรคที่ลิ้น และระยะของซิฟิลิส',
     ["Mucous patch of secondary syphilis"],
     'Secondary syphilis lesion: mucous patch lesion',
     img='syph_tongue', src='หน้า 4',
     kw=[["mucous patch", "mucous patches"], ["secondary", "secondary syphilis", "ระยะที่ 2"]])
card('syph-dfa', 'syph-clin', 'การตรวจในภาพนี้ (สิ่งส่งตรวจจาก mucous patch ส่องด้วยกล้อง fluorescence) คือการตรวจชนิดใด',
     ["direct fluorescent antibody test", "direct fluorescent antibody", "dfa", "dfa tp", "direct immunofluorescence",
      "direct fluorescent antibody test for t pallidum", "immunofluorescence"],
     'Direct immunofluorescence for T. pallidum from the mucous patches was positive — DFA-TP เป็น direct test (ตรวจหาตัวเชื้อ/แอนติเจน)',
     img='syph_dfa', src='หน้า 4, 8')
card('syph-dfa-org', 'syph-clin', 'เชื้อที่เรืองแสงสีเขียวในภาพนี้คืออะไร',
     ["treponema pallidum", "t pallidum", "treponema", "spirochete", "spirochetes", "spirochaete"],
     'Treponema pallidum (spirochete) — รูปเกลียว',
     img='syph_dfa', src='หน้า 1, 4')
card('syph-direct', 'syph-lab', 'การตรวจหาตัวเชื้อ T. pallidum จากรอยโรคโดยตรง (direct test) มีวิธีใดบ้าง (ตอบ 1 วิธี)',
     ["dark field microscopy", "darkfield microscopy", "dark field", "darkfield", "dfa", "direct fluorescent antibody",
      "dfa tp", "immunohistochemistry", "ihc", "naat", "nucleic acid amplification test", "pcr"],
     'Direct tests (organism/antigen/nucleic acid): dark field microscopic test (DF), direct fluorescence-antibody test (DFA-TP), immunohistochemistry (IHC), nucleic acid amplification (NAAT)',
     img=None, src='หน้า 8')
card('syph-gumma', 'syph-clin', 'จงให้การวินิจฉัยพร้อมระบุระยะของโรค (รอยโรคทำลายเนื้อเยื่อจมูกในผู้สูงอายุที่ติดเชื้อมานานไม่เคยรักษา)',
     ["tertiary syphilis", "gumma", "gummatous syphilis", "gummatous tertiary syphilis"],
     'Tertiary syphilis: gummatous syphilis with destructive lesions on the nose — gumma คือ granulomatous inflammation ได้ในทุกอวัยวะ เช่น ผิวหนัง กระดูก ตับ',
     img='syph_gumma', src='หน้า 2, 4')
card('syph-gumma-histo', 'syph-clin', 'Gumma ของ tertiary syphilis มีพยาธิสภาพทางจุลพยาธิวิทยาเป็นการอักเสบแบบใด',
     ["granulomatous inflammation", "granuloma", "granulomatous"],
     'Gumma: granulomatous inflammation in any organs e.g. skin, bone, liver',
     img='syph_gumma', src='หน้า 2')
card('syph-aortitis', 'syph-clin', 'จงให้การวินิจฉัย (aorta ของผู้ป่วยที่มีประวัติซิฟิลิสมานาน)',
     ["syphilitic aortitis", "syphilitic aortitis with aneurysm", "syphilitic aortic aneurysm", "syphilitic aneurysm",
      "cardiovascular syphilis", "luetic aortitis", "tertiary syphilis"],
     'Tertiary syphilis: syphilitic aortitis with aneurysm',
     img='syph_aortitis', src='หน้า 5')
card('syph-ar', 'syph-clin', 'ภาวะแทรกซ้อนต่อลิ้นหัวใจที่เกิดจากพยาธิสภาพในภาพนี้คืออะไร',
     ["aortic regurgitation", "aortic insufficiency", "ar", "aortic valve incompetence", "aortic incompetence"],
     'Syphilitic aortitis → aortic regurgitation, aneurysm — ภาพ (a): ascending aortic aneurysm with dilatation of the aortic sinuses and aortic valve incompetence',
     img='syph_aorta_ab', src='หน้า 2, 5')
card('syph-intima', 'syph-clin', 'ผิว intima ของ aorta ในภาพ (a) มีลักษณะอย่างไร',
     ["wrinkling", "wrinkled intima", "wrinkling of the intima", "tree bark", "tree bark appearance", "tree barking"],
     'สไลด์: "Note wrinkling of the intima without superimposed atherosclerosis" (มักเรียก tree-bark appearance)',
     img='syph_aorta_ab', src='หน้า 5')
card('syph-tertiary-frac', 'syph-clin', 'ผู้ป่วยซิฟิลิสที่ไม่ได้รับการรักษา ประมาณกี่ส่วนจะเข้าสู่ระยะ tertiary',
     ["1/3", "one third", "33%", "หนึ่งในสาม", "1 ใน 3"],
     'Tertiary syphilis: 1/3 of untreated patients develop tertiary syphilis',
     img=None, src='หน้า 2')
card('syph-tabes', 'syph-clin', 'Tabes dorsalis เกิดพยาธิสภาพที่ส่วนใดของไขสันหลัง',
     ["dorsal columns", "dorsal column", "posterior columns", "posterior column", "dorsal columns of spinal cord",
      "posterior column of spinal cord"],
     'Tabes dorsalis (myelopathy of the dorsal columns): weakness, sensory ataxia (tabetic gait), lancinating pain, hypoesthesia',
     img=None, src='หน้า 2, 15')
card('syph-latent', 'syph-clin', 'ระยะที่ไม่มีอาการหรืออาการแสดงของซิฟิลิสเลย เรียกว่าระยะใด',
     ["latent", "latent stage", "latent syphilis", "ระยะแฝง"],
     'Latent stage: period of time when there are no visible signs or symptoms of syphilis',
     img=None, src='หน้า 2')
card('syph-early-latent', 'syph-clin', 'Early latent syphilis หมายถึงติดเชื้อมาไม่เกินกี่เดือน',
     ["12 months", "12", "12 เดือน", "1 year", "1 ปี", "24 months", "24"],
     'Early latent syphilis: infection occurred within 12 (24) months; late latent: more than 12 (24) months',
     img=None, src='หน้า 2')
card('syph-infectious-stage', 'syph-clin', 'ตามแผนภาพ stages of syphilis ระยะ latent แบบใดที่ยังจัดเป็นระยะติดต่อ (infectious)',
     ["early latent", "early latent syphilis"],
     'แผนภาพ BMJ: primary, secondary และ early latent อยู่ในกลุ่ม infectious; late latent และ tertiary เป็น non-infectious',
     img=None, src='หน้า 7')

card('cong-infant', 'syph-clin', 'จงให้การวินิจฉัย (ทารกอายุ 1 เดือน มีผื่นทั่วตัว น้ำมูกไหล ตับโต มารดาไม่ได้ฝากครรภ์)',
     ["early congenital syphilis", "congenital syphilis", "ซิฟิลิสแต่กำเนิด"],
     'Early congenital syphilis (< 2 ปี): extensive cutaneous rash containing many spirochetes, rhinitis, hepatitis, thrombocytopenia',
     img='syph_infant', src='หน้า 6')
card('cong-hutch', 'syph-clin', 'จงบอกชื่อความผิดปกติของฟันในภาพ',
     ["hutchinson teeth", "hutchinsons teeth", "hutchinsonian teeth", "hutchinson incisors", "notched incisors",
      "notched central incisors"],
     'Hutchinson teeth: notched central incisors — หนึ่งใน Hutchinson triad ของ late congenital syphilis',
     img='syph_hutch', src='หน้า 6–7')
card('des-cong-hutch', 'syph-clin', 'ฟันลักษณะนี้พบในโรคใด และระยะใด',
     ["Late congenital syphilis (> 2 years)"],
     'Late congenital syphilis (> 2 ปี): Hutchinson triad — eighth nerve deafness, interstitial keratitis, notched central incisors',
     img='syph_hutch', src='หน้า 6',
     kw=[["congenital syphilis", "congenital", "แต่กำเนิด"], ["late", "late congenital"]])
card('cong-saddle', 'syph-clin', 'จงบอกชื่อความผิดปกติของจมูกในภาพ (ทารกแรกเกิดที่ติดเชื้อจากมารดา)',
     ["saddle nose", "saddle nose deformity"],
     'Saddle nose in a newborn with congenital syphilis',
     img='syph_saddle', src='หน้า 6–7')
card('cong-saddle-mech', 'syph-clin', 'Saddle nose ใน early congenital syphilis เกิดจากพยาธิสภาพใด',
     ["osteochondritis", "osteochondritis of the nose", "collapse of the bridge of the nose"],
     'Osteochondritis with collapse of the bridge of the nose (saddle nose)',
     img='syph_saddle', src='หน้า 6')
card('des-hutch-triad', 'syph-clin', 'Hutchinson triad ประกอบด้วยอะไรบ้าง',
     ["Eighth nerve deafness, interstitial keratitis and notched central incisors (Hutchinson teeth)"],
     'Late congenital syphilis (> 2 ปี): Hutchinson triad — eighth nerve deafness, interstitial keratitis (blindness), notched central incisors (Hutchinson teeth); ร่วมกับ frontal bossing, maxillary hypoplasia',
     img=None, src='หน้า 6',
     kw=[["eighth nerve deafness", "8th nerve deafness", "sensorineural deafness", "deafness", "hearing loss", "หูหนวก"],
         ["interstitial keratitis", "keratitis"],
         ["notched incisors", "notched central incisors", "hutchinson teeth", "hutchinsons teeth"]])
card('cong-tibia', 'syph-clin', 'ใน early congenital syphilis, periostitis ทำให้กระดูกใดโก่งงอ',
     ["tibia", "bowing of the tibia", "saber shin", "sabre shin", "กระดูกหน้าแข้ง"],
     'Periostitis with bowing of the tibia',
     img=None, src='หน้า 6')
card('cong-route', 'syph-clin', 'เชื้อซิฟิลิสผ่านจากมารดาสู่ทารกในครรภ์ทางใด',
     ["placenta", "transplacental", "via placenta", "ทางรก", "รก"],
     'Organisms transferred to fetus by placenta — ทำให้แท้งช่วงท้าย ทารกตายคลอด หรือเสียชีวิตหลังคลอดไม่นาน',
     img=None, src='หน้า 6')
card('des-cong-mom', 'syph-clin', 'มารดาที่เป็นซิฟิลิสระยะใดถ่ายทอดเชื้อสู่ทารกในครรภ์ได้บ่อย',
     ["Primary and secondary syphilis (many organisms)"],
     'Common in primary and secondary syphilis (many organisms) of pregnant women',
     img=None, src='หน้า 6',
     kw=[["primary"], ["secondary"]])
card('cong-age', 'syph-clin', 'การแบ่ง congenital syphilis เป็น early และ late ใช้อายุเท่าใดเป็นเกณฑ์',
     ["2 years", "2", "2 ปี", "two years"],
     'Early < 2 ปี, late > 2 ปี',
     img=None, src='หน้า 6')

# ============================================================ Syphilis: laboratory tests and interpretation
card('lab-ntt', 'syph-lab', 'VDRL และ RPR จัดเป็นการตรวจกลุ่มใด',
     ["nontreponemal test", "nontreponemal", "nontreponemal tests", "nontreponemal serologic test"],
     'Nontreponemal serologic test: VDRL, RPR — ตรวจแอนติบอดีต่อ cardiolipin โดยใช้ phospholipid antigen',
     img=None, src='หน้า 8–9')
card('lab-tt', 'syph-lab', 'TPHA, TPPA และ FTA-ABS จัดเป็นการตรวจกลุ่มใด',
     ["treponemal test", "treponemal", "treponemal tests", "antitreponemal test", "treponemal serologic test"],
     'Treponemal tests: conventional (FTA-ABS, TPPA, TPHA), labeled immunoassay (EIA, CLIA, CMIA, E-CLIA) และ rapid diagnostic tests',
     img=None, src='หน้า 8–9')
card('lab-ntt-antigen', 'syph-lab', 'Nontreponemal test ตรวจหาแอนติบอดีต่อแอนติเจนใด',
     ["cardiolipin", "anticardiolipin", "cardiolipin antigen", "phospholipid", "phospholipid antigen",
      "cardiolipin lecithin cholesterol"],
     'Detect Ab against cardiolipin (found in mitochondria and certain bacterial membranes) — การทดสอบใช้ phospholipid antigen',
     img=None, src='หน้า 9')
card('lab-tt-antigen', 'syph-lab', 'Treponemal test ตรวจหาแอนติบอดีต่ออะไร',
     ["treponema pallidum", "t pallidum", "t pallidum antigen", "treponema pallidum antigens"],
     'Antitreponemal serologic test: detect Ab against T. pallidum',
     img=None, src='หน้า 9')
card('des-ntt-use', 'syph-lab', 'Nontreponemal test (RPR/VDRL) ใช้ประโยชน์หลัก 2 อย่างคืออะไร',
     ["Screening and follow-up of treatment"],
     'Nontreponemal: screening test (1–4 wks after primary chancre found), follow-up',
     img=None, src='หน้า 9',
     kw=[["screening", "screen", "คัดกรอง"], ["follow up", "follow-up", "monitoring", "monitor", "ติดตาม"]])
card('lab-bfp-causes', 'syph-lab', 'จงยกตัวอย่างภาวะที่ทำให้ nontreponemal test ให้ผลบวกปลอม (ตอบ 1)',
     ["sle", "systemic lupus erythematosus", "lupus", "autoimmune disease", "autoimmune diseases", "hypergammaglobulinemia",
      "leprosy", "malaria", "hepatitis", "infectious mononucleosis", "viral infection", "pregnancy", "acute illness",
      "other treponemal diseases", "ตั้งครรภ์"],
     'False positive: SLE, autoimmune diseases, hypergammaglobulinemia, leprosy, acute illness such as malaria, hepatitis, infectious mononucleosis, other viral infection, pregnancy — และโรค treponemal อื่นก็ให้ผลบวกได้',
     img=None, src='หน้า 9')
card('lab-ntt-cure', 'syph-lab', 'หลังรักษาหาย ผล nontreponemal test จะเป็นอย่างไร',
     ["negative", "nonreactive", "becomes nonreactive", "becomes negative", "ผลลบ"],
     'Nontreponemal test: cure → negative result (titer ลดลงจนตรวจไม่พบ)',
     img=None, src='หน้า 9')
card('des-tt-after-cure', 'syph-lab', 'หลังรักษาหายแล้ว treponemal test มักให้ผลอย่างไร และใช้ติดตามผลการรักษาได้หรือไม่',
     ["Usually stays reactive after cure, so it cannot be used to follow treatment response"],
     'หมายเหตุข้อ 2 ของ reverse algorithm: "Treponemal antibodies จะตรวจพบด้วยวิธี TT ต่อไปได้หลังหายจากโรคแล้ว" และกราฟ treponemal IgG คงที่ราว 100% นานถึง 20 ปี จึงติดตามผลการรักษาด้วย nontreponemal titer แทน — สังเกต: สไลด์หน้า 9 มีบรรทัดเขียนว่า "positive until cure" ซึ่งขัดกับส่วนอื่นของบรรยาย ควรยึดตามตารางแปลผลและหมายเหตุ',
     img=None, src='หน้า 9–10, 12',
     kw=[["remains reactive", "remain reactive", "remains positive", "remain positive", "stays positive",
          "stays reactive", "persist", "persists", "lifelong", "for life", "ยังเป็นบวก"],
         ["cannot", "not useful", "not used", "ไม่ได้"]])
card('lab-tt-onset', 'syph-lab', 'Treponemal test เริ่มให้ผลบวกหลังติดเชื้อประมาณกี่สัปดาห์',
     ["4-6 weeks", "4-6", "4 to 6 weeks", "4-6 สัปดาห์"],
     'Treponemal: positive after infection 4–6 wks and continuous',
     img=None, src='หน้า 9')

card('rpr-A', 'syph-lab', 'RPR card test: วง A อ่านผลว่าอย่างไร',
     ["reactive", "positive"],
     'Reactive: เห็นอนุภาคผงถ่านจับกลุ่มเป็นก้อนดำกระจาย — Nonreactive: ผงถ่านกระจายเรียบไม่จับกลุ่ม มักไปรวมเป็นจุดหรือขีดตรงกลางวง',
     img='lab_rpr_qual', src='หน้า 8')
card('rpr-B', 'syph-lab', 'RPR card test: วง B อ่านผลว่าอย่างไร',
     ["nonreactive", "negative"],
     'Nonreactive: ไม่มีการจับกลุ่ม ผงถ่านรวมเป็นจุดหรือขีดตรงกลาง',
     img='lab_rpr_qual', src='หน้า 8')
card('rpr-titer', 'syph-lab', 'ทำ RPR แบบ semiquantitative โดยเจือจางซีรัม 1:2 ถึง 1:16 ได้ผลตามภาพ — titer ของผู้ป่วยรายนี้คือเท่าใด',
     ["1:8", "1/8"],
     'Endpoint titer = dilution สูงสุดที่ยังเห็นการจับกลุ่ม: 1:2 reactive, 1:4 weak reactive, 1:8 minimally reactive, 1:16 nonreactive → titer = 1:8',
     img='lab_rpr_titer', src='หน้า 8')
card('tpha-test', 'syph-lab', 'การทดสอบใน microplate นี้ใช้เม็ดเลือดแดงที่เคลือบแอนติเจนของ T. pallidum — คือการตรวจใด',
     ["tpha", "treponema pallidum hemagglutination", "treponema pallidum hemagglutination assay",
      "treponema pallidum haemagglutination", "mha tp", "microhemagglutination assay"],
     'Treponema pallidum hemagglutination (TPHA) เป็น conventional treponemal test',
     img='lab_tpha', src='หน้า 8–9')
card('tpha-A', 'syph-lab', 'TPHA: หลุม A อ่านผลว่าอย่างไร',
     ["reactive", "positive"],
     'หลักการอ่าน hemagglutination: เม็ดเลือดแดงจับกลุ่มกระจายเป็นแผ่นทั่วก้นหลุม (mat) = reactive; เม็ดเลือดแดงตกเป็นจุดกลมเล็กกลางหลุม (button) = nonreactive — แถวนี้เป็นการเจือจางซีรัมทีละสองเท่า หลุมแรก ๆ จึงเป็น mat แล้วเปลี่ยนเป็น button',
     img='lab_tpha', src='หน้า 8')
card('tpha-B', 'syph-lab', 'TPHA: หลุม B อ่านผลว่าอย่างไร',
     ["nonreactive", "negative"],
     'Button (จุดกลมเล็กกลางหลุม) = ไม่มีการจับกลุ่ม = nonreactive',
     img='lab_tpha', src='หน้า 8')
card('rdt-which', 'syph-lab', 'Rapid test สำหรับซิฟิลิส 3 ตลับในภาพ ตลับใดอ่านผลเป็น reactive (ตอบหมายเลข)',
     ["1", "ตลับที่ 1", "ตลับ 1", "cassette 1", "no 1", "number 1"],
     'ตลับ 1 มีแถบทั้งที่ C (control) และ B (test) = reactive; ตลับ 3 มีแถบที่ C เท่านั้น = nonreactive — ต้องเห็นแถบ control ทุกครั้งผลจึงใช้ได้',
     img='lab_rdt', src='หน้า 8')
card('rdt-control', 'syph-lab', 'แถบที่ตำแหน่ง C ของตลับ rapid test มีหน้าที่อะไร',
     ["control line", "control", "control band", "เส้นควบคุม"],
     'C = control line ต้องขึ้นทุกครั้ง ถ้าไม่ขึ้นแปลว่าการทดสอบใช้ไม่ได้ (invalid); A = หลุมใส่ตัวอย่าง',
     img='lab_rdt', src='หน้า 8')
card('rdt-class', 'syph-lab', 'Rapid diagnostic test สำหรับซิฟิลิสในภาพ จัดเป็น treponemal หรือ nontreponemal test',
     ["treponemal", "treponemal test"],
     'แผนภูมิ Laboratory Diagnosis for Syphilis จัด rapid diagnostic tests ไว้ใน treponemal tests',
     img='lab_rdt', src='หน้า 8')

card('graph-A', 'syph-lab', 'กราฟร้อยละของผู้ป่วยที่ตรวจพบแอนติบอดีตามเวลาหลังติดเชื้อซิฟิลิส — เส้น A คือแอนติบอดีชนิดใด',
     ["treponemal igm", "igm", "treponemal igm antibody", "igm treponemal"],
     'Treponemal IgM ขึ้นเร็วที่สุด สูงสุดช่วงสัปดาห์ที่ 8–10 แล้วลดลงจนหายไป',
     img='graph_syph', src='หน้า 10')
card('graph-B', 'syph-lab', 'จากกราฟเดิม เส้น B คือแอนติบอดีชนิดใด',
     ["treponemal igg", "treponemal igg antibody", "igg treponemal", "treponemal antibody", "treponemal"],
     'Treponemal IgG ขึ้นแล้วคงที่ราว 100% ไปตลอดถึง 20 ปี',
     img='graph_syph', src='หน้า 10')
card('des-graph-C', 'syph-lab', 'จากกราฟเดิม เส้น C (เส้นประ) คือแอนติบอดีชนิดใด ในผู้ป่วยกลุ่มใด',
     ["Nontreponemal IgM/IgG in patients who are untreated, failed treatment, or reinfected"],
     'Nontreponemal IgM/IgG (untreated, failed treatment, or reinfection) — ลดลงเพียงช้า ๆ และคงอยู่',
     img='graph_syph', src='หน้า 10',
     kw=[["nontreponemal", "rpr", "vdrl"], ["untreated", "not treated", "failed treatment", "reinfection", "ไม่ได้รักษา"]])
card('des-graph-D', 'syph-lab', 'จากกราฟเดิม เส้น D คือแอนติบอดีชนิดใด ในผู้ป่วยกลุ่มใด',
     ["Nontreponemal IgM/IgG in treated patients"],
     'Nontreponemal IgM/IgG (treated) — ลดลงชัดหลังการรักษา จึงใช้ติดตามผลการรักษา',
     img='graph_syph', src='หน้า 10',
     kw=[["nontreponemal", "rpr", "vdrl"], ["treated", "after treatment", "หลังรักษา"]])
card('sens-secondary', 'syph-lab', 'Nontreponemal test (VDRL/RPR) มีความไว (sensitivity) สูงสุด 100% ในระยะใด',
     ["secondary", "secondary syphilis", "secondary stage"],
     'ตาราง sensitivity: VDRL primary 78%, secondary 100%, latent 96%, late 71%; RPR 86, 100, 95, 73% — และสไลด์ระบุ NTT "positive in secondary syphilis"',
     img=None, src='หน้า 9, 11')
card('sens-late', 'syph-lab', 'VDRL มีความไวต่ำที่สุดในระยะใดของซิฟิลิส',
     ["late", "late syphilis", "tertiary", "tertiary syphilis"],
     'VDRL sensitivity: late 71% (37–94) ต่ำกว่าระยะอื่น ส่วน treponemal test ยังไวสูงในระยะ late (TPHA 99%, FTA-ABS 96%)',
     img=None, src='หน้า 11')

card('algo-trad', 'syph-lab', 'การตรวจคัดกรองซิฟิลิสแบบ traditional sequence algorithm เริ่มตรวจด้วยการตรวจกลุ่มใด',
     ["nontreponemal test", "nontreponemal", "rpr", "vdrl", "rpr or vdrl", "qualitative rpr"],
     'Traditional: qualitative RPR/VDRL ก่อน → ถ้า reactive ทำ quantitative titer และ treponemal test',
     img=None, src='หน้า 11')
card('algo-rev', 'syph-lab', 'การตรวจคัดกรองซิฟิลิสแบบ reverse sequence algorithm เริ่มตรวจด้วยการตรวจกลุ่มใด',
     ["treponemal test", "treponemal", "eia", "cia", "eia or cia", "clia", "treponemal immunoassay"],
     'Reverse: treponemal test (EIA หรือ CIA) ก่อน → ถ้า reactive ทำ qualitative RPR/VDRL',
     img=None, src='หน้า 12')
card('algo-rev-next', 'syph-lab', 'ผลตรวจตาม reverse algorithm เป็นดังรายงาน — ขั้นตอนถัดไปควรตรวจอะไร',
     ["second treponemal test", "different treponemal test", "another treponemal test", "alternative treponemal test",
      "treponemal test", "tppa", "tp pa", "tpha"],
     'Reverse algorithm: treponemal reactive แต่ RPR nonreactive → ตรวจ second treponemal test (ต่างวิธีจากครั้งแรก เช่น TPPA)',
     img=None, src='หน้า 12',
     report=slip([['Treponemal test (CLIA)', R], ['RPR (qualitative)', NR]], 'หญิง 28 ปี ตรวจคัดกรองก่อนแต่งงาน ไม่มีอาการ'))
card('algo-rev-unlikely', 'syph-lab', 'จงแปลผลการตรวจตาม reverse algorithm',
     ["syphilis unlikely", "no syphilis", "false positive treponemal test", "false positive initial treponemal test",
      "false positive clia", "false positive", "not syphilis"],
     'TT ตัวแรก reactive แต่ TT ตัวที่สอง nonreactive → syphilis unlikely (ผลบวกปลอมของ TT ตัวแรก) — reverse algorithm ให้ผลบวกปลอมสูงในประชากรความชุกต่ำ ถ้าผลไม่สอดคล้องให้ปรึกษาผู้เชี่ยวชาญและดูประวัติการรักษาทุกครั้ง',
     img=None, src='หน้า 12',
     report=slip([['Treponemal test (CLIA)', R], ['RPR (qualitative)', NR], ['TPPA (second treponemal test)', NR]],
                 'ชาย 35 ปี ตรวจสุขภาพประจำปี ไม่มีอาการ ไม่มีประวัติเสี่ยง'))
card('algo-rev-latent', 'syph-lab', 'ผู้ป่วยรายนี้ไม่ทราบว่าเคยได้รับการรักษาซิฟิลิสหรือไม่ และไม่มีอาการ — แพทย์อาจพิจารณาให้การรักษาเหมือนซิฟิลิสระยะใด',
     ["latent syphilis", "latent", "late latent syphilis", "late latent", "ระยะแฝง", "ซิฟิลิสระยะแฝง"],
     'หมายเหตุ reverse algorithm ข้อ 2: ถ้า initial TT reactive แต่ NTT nonreactive ให้พิจารณาประวัติการรักษาร่วมด้วยทุกครั้ง ถ้าไม่ทราบประวัติแพทย์อาจพิจารณาให้การรักษาเหมือนกับซิฟิลิสระยะแฝง',
     img=None, src='หน้า 12',
     report=slip([['Treponemal test (CLIA)', R], ['RPR (qualitative)', NR], ['TPPA (second treponemal test)', R]],
                 'ชาย 50 ปี จำประวัติการรักษาไม่ได้ ไม่มีอาการ'))
card('algo-active', 'syph-lab', 'จงแปลผล',
     ["active syphilis", "syphilis", "untreated syphilis", "previously treated or untreated syphilis", "current syphilis",
      "syphilis infection"],
     'NTT reactive + TT reactive = syphilis (active) หรือเพิ่งรักษาที่ titer ยังไม่ลด หรือรักษาแล้วแต่ titer ค้าง — titer สูง 1:128 เข้ากับโรคที่ยัง active',
     img=None, src='หน้า 11, 13–14',
     report=slip([['RPR (quantitative)', 'Reactive 1:128'], ['TPHA', R]], 'ชาย 24 ปี มีผื่นที่ลำตัวและฝ่ามือ'))
card('algo-bfp', 'syph-lab', 'จงแปลผล',
     ["biological false positive", "biologic false positive", "bfp", "false positive nontreponemal test",
      "false positive rpr", "false positive", "syphilis unlikely"],
     'NTT reactive แต่ TT nonreactive = biological false positive (BFP) — ภาวะที่ให้ผลบวกปลอม เช่น SLE โรคภูมิต้านตนเอง การตั้งครรภ์ การติดเชื้อไวรัส',
     img=None, src='หน้า 11, 13–14',
     report=slip([['RPR (quantitative)', 'Reactive 1:2'], ['TPPA', NR]], 'หญิง 30 ปี เป็น SLE ตรวจก่อนผ่าตัด'))
card('algo-treated', 'syph-lab', 'จงแปลผล',
     ["previously treated syphilis", "treated syphilis", "past syphilis", "past treated syphilis",
      "prior treated syphilis", "old treated syphilis", "past infection", "cured syphilis"],
     'TT reactive + NTT nonreactive ในผู้ที่มีประวัติรักษาครบ = เคยเป็นซิฟิลิสแต่รักษาหายแล้ว (treponemal antibody ยังตรวจพบได้หลังหาย)',
     img=None, src='หน้า 12–14',
     report=slip([['RPR (qualitative)', NR], ['TPHA', R]], 'ชาย 45 ปี เคยได้รับ benzathine penicillin รักษาซิฟิลิสครบเมื่อ 5 ปีก่อน'))
card('algo-window', 'syph-lab', 'ผู้ป่วยมีประวัติเสี่ยงเมื่อ 1 สัปดาห์ก่อน ผลตรวจเป็นดังรายงาน — ขั้นตอนต่อไปที่เหมาะสมคืออะไร',
     ["repeat test in 2 weeks", "repeat in 2 weeks", "retest in 2 weeks", "repeat after 2 weeks",
      "repeat serology in 2 weeks", "ตรวจซ้ำใน 2 สัปดาห์", "เจาะเลือดตรวจซ้ำ 2 สัปดาห์"],
     'หมายเหตุ reverse algorithm ข้อ 1: ถ้าผู้ป่วยมีประวัติเสี่ยงสัมผัสโรคมาไม่นาน และตรวจไม่พบแอนติบอดี ให้เจาะเลือดส่งตรวจซ้ำหลังจากตรวจครั้งแรก 2 สัปดาห์ — NTT และ TT nonreactive อาจเป็นระยะฟักตัว หรือ primary syphilis ช่วงแรกที่ยังไม่สร้างแอนติบอดี',
     img=None, src='หน้า 12–13',
     report=slip([['Treponemal test (CLIA)', NR], ['RPR (qualitative)', NR]], 'ชาย 22 ปี มีเพศสัมพันธ์ไม่ป้องกันเมื่อ 1 สัปดาห์ก่อน ไม่มีอาการ'))
card('algo-prozone', 'syph-lab', 'ผลที่ไม่สอดคล้องกับอาการของผู้ป่วยรายนี้น่าจะเกิดจากปรากฏการณ์ใด',
     ["prozone phenomenon", "prozone", "prozone effect", "prozone reaction"],
     'ตาราง NTT nonreactive / TT reactive: "โรคซิฟิลิสระยะที่ 2 มี Prozone phenomenon" — แอนติบอดีปริมาณมากเกินทำให้ซีรัมที่ไม่เจือจางไม่เกิดการจับกลุ่ม แก้ได้ด้วยการเจือจางซีรัมแล้วทดสอบใหม่',
     img=None, src='หน้า 13',
     report=slip([['RPR (qualitative, undiluted serum)', NR], ['TPHA', R]],
                 'ชาย 26 ปี มีผื่นทั่วตัว ฝ่ามือ ฝ่าเท้า และ condyloma lata รอบทวารหนัก'))
card('case-mcq', 'syph-lab',
     'จากผลตรวจนี้ ขั้นตอนต่อไปที่เหมาะสมที่สุดคือข้อใด — A. repeat ทั้ง EIA และ RPR  B. ส่ง nontreponemal test วิธีอื่น  C. ส่ง treponemal test วิธีอื่น  D. ไม่ต้องตรวจเพิ่ม',
     ["c", "c.", "alternative treponemal test", "send an alternative treponemal test", "second treponemal test",
      "treponemal test", "tppa", "tp pa", "tpha", "fta abs"],
     'ข้อ C — ตาม reverse algorithm: EIA (treponemal) reactive แต่ RPR nonreactive ต้องตรวจ treponemal test ตัวที่สองที่ต่างวิธี (เช่น TPPA) เพื่อแยกผลบวกปลอมของ EIA',
     img=None, src='หน้า 12, 20',
     report=slip([['T. pallidum EIA', 'Positive'], ['RPR (reflex)', NR], ['HIV, N. gonorrhoeae, C. trachomatis', 'Negative']],
                 'หญิง 31 ปี ตรวจคัดกรอง ไม่มีโรคประจำตัว คู่นอนคนเดียว 3 ปี ไม่เคยเป็น STI หรือรักษาซิฟิลิส ไม่มีอาการ ตรวจร่างกายปกติ'))

card('fu-test', 'syph-lab', 'หลังรักษาซิฟิลิส ใช้การตรวจใดติดตามผลการรักษา',
     ["rpr", "vdrl", "nontreponemal test", "quantitative rpr", "rpr titer", "nontreponemal titer",
      "quantitative nontreponemal test"],
     'Follow-up serology (RPR) at (1, 3), 6 and 12, (24) months — titer มักลดลงหลังรักษาได้ผล แต่อาจใช้เวลาหลายเดือนถึงหลายปี',
     img=None, src='หน้า 14')
card('fu-4fold', 'syph-lab', 'เกณฑ์ที่ถือว่ารักษาได้ผล คือ titer ของ nontreponemal test ลดลงอย่างน้อยกี่เท่า',
     ["4 fold", "4-fold", "fourfold", "four fold", "4", "4 เท่า"],
     'Successful treatment is usually considered with a fourfold decline in titers (e.g., from 1:32 to 1:8)',
     img=None, src='หน้า 14')
card('fu-success', 'syph-lab', 'จงแปลผลการตอบสนองต่อการรักษา',
     ["adequate response", "successful treatment", "treatment success", "good response", "appropriate response",
      "adequate treatment response", "response to treatment", "cured"],
     'Titer ลดลง 4 เท่า (1:32 → 1:8) = รักษาได้ผล',
     img=None, src='หน้า 14',
     report=slip([['RPR ก่อนรักษา', 'Reactive 1:32'], ['RPR 6 เดือนหลังรักษา', 'Reactive 1:8']],
                 'Secondary syphilis รักษาด้วย benzathine penicillin G'))
card('fu-failure', 'syph-lab', 'จงแปลผล',
     ["treatment failure", "failure", "inadequate response", "treatment failure or reinfection", "reinfection",
      "failed treatment"],
     'Failure to decline 4-fold within 6–12 months in 1st or 2nd syphilis may indicate treatment failure — ผู้ที่ titer ยัง reactive หลังรักษาควรตรวจ HIV และพิจารณา serofast, treatment failure (ตรวจ CSF หา neurosyphilis) หรือ reinfection',
     img=None, src='หน้า 14',
     report=slip([['RPR ก่อนรักษา', 'Reactive 1:64'], ['RPR 6 เดือนหลังรักษา', 'Reactive 1:32'],
                  ['RPR 12 เดือนหลังรักษา', 'Reactive 1:32']], 'Primary syphilis รักษาด้วย benzathine penicillin G'))
card('fu-failure-next', 'syph-lab', 'ผู้ป่วยที่ titer ไม่ลดลงตามเกณฑ์หลังรักษา ควรได้รับการตรวจอะไรเพิ่มเติม (ตอบ 1)',
     ["hiv test", "hiv", "anti hiv", "csf examination", "csf", "lumbar puncture", "csf vdrl", "เจาะน้ำไขสันหลัง"],
     'Patients whose nontreponemal antibody titers remain reactive after treatment should be evaluated for HIV infection; treatment failure → consider CSF test for neurosyphilis',
     img=None, src='หน้า 14')
card('fu-serofast', 'syph-lab', 'ภาวะที่ titer ของ nontreponemal test ยังคงเป็นบวกระดับต่ำคงที่ หลังรักษาครบแล้ว เรียกว่าอะไร',
     ["serofast", "serofast state", "serofast reaction", "serofast status"],
     'Serofast — หนึ่งในสาเหตุที่ NTT ยัง reactive หลังรักษา (ร่วมกับ treatment failure และ reinfection)',
     img=None, src='หน้า 14')
card('tx-drug', 'syph-lab', 'ยาหลักในการรักษาซิฟิลิสคืออะไร',
     ["penicillin g", "penicillin", "benzathine penicillin g", "benzathine penicillin", "penicillin g benzathine"],
     'Tx: Penicillin G (alternatives: ceftriaxone, doxycycline, azithromycin, erythromycin)',
     img=None, src='หน้า 14')
card('neuro-csf', 'syph-lab', 'การตรวจน้ำไขสันหลังที่ใช้ช่วยวินิจฉัย neurosyphilis (nontreponemal test ใน CSF) คืออะไร',
     ["csf vdrl", "vdrl", "reactive csf vdrl", "vdrl in csf"],
     'Diagnosis of neurosyphilis depends on a combination of CSF tests (CSF cell count, protein, or reactive CSF-VDRL) in the presence of reactive serologic tests and neurologic signs and symptoms',
     img=None, src='หน้า 15')
card('neuro-indication', 'syph-lab', 'จงบอกข้อบ่งชี้ในการเจาะตรวจ CSF ในผู้ป่วยซิฟิลิส (ตอบ 1)',
     ["neurologic symptoms", "neurological symptoms", "symptoms of neurosyphilis", "ocular symptoms", "ocular syphilis",
      "otosyphilis", "otic symptoms", "tertiary syphilis", "treatment failure", "inadequate treatment response"],
     'Indication of CSF test: symptoms of neuro-, ocular- or otosyphilis; tertiary syphilis; treatment failure or inadequate treatment response',
     img=None, src='หน้า 15')
card('neuro-type', 'syph-lab', 'Tabes dorsalis และ dementia paralytica จัดเป็น neurosyphilis ชนิดใด',
     ["parenchymatous", "parenchymatous neurosyphilis", "parenchymatous sequelae"],
     'Neurosyphilis เกิดได้ทุกระยะ: asymptomatic, meningovascular (meningitis, stroke), parenchymatous (dementia paralytica, tabes dorsalis), ocular/otosyphilis',
     img=None, src='หน้า 15')
card('neuro-stage', 'syph-lab', 'Neurosyphilis เกิดได้ในระยะใดของโรคซิฟิลิส',
     ["all stages", "any stage", "every stage", "ทุกระยะ"],
     'Neurosyphilis: can occur in all stages',
     img=None, src='หน้า 15')

# ============================================================ Hepatitis B and C
card('hbv-A', 'hep', 'กราฟการติดเชื้อ HBV เฉียบพลันที่หายเอง — เส้น A คือ marker ใด',
     ["hbsag", "hepatitis b surface antigen", "surface antigen"],
     'HBsAg ขึ้นเป็นตัวแรก (ราวสัปดาห์ที่ 4–8) และหายไปก่อนสัปดาห์ที่ 24 ในรายที่หาย',
     img='graph_hbv_acute', src='หน้า 15')
card('hbv-B', 'hep', 'จากกราฟเดิม เส้น B คือ marker ใด',
     ["igm anti hbc", "anti hbc igm", "igm hbc", "igm antibody to hbcag"],
     'IgM anti-HBc ขึ้นในช่วงมีอาการ แล้วค่อย ๆ ลดลงหายไป',
     img='graph_hbv_acute', src='หน้า 15')
card('hbv-C', 'hep', 'จากกราฟเดิม เส้น C คือ marker ใด',
     ["total anti hbc", "anti hbc", "anti hbc total", "igg anti hbc", "anti hbc igg"],
     'Total anti-HBc ขึ้นแล้วคงอยู่ตลอด (เป็นเครื่องหมายของการเคยติดเชื้อ ไม่เกิดจากวัคซีน)',
     img='graph_hbv_acute', src='หน้า 15')
card('hbv-D', 'hep', 'จากกราฟเดิม เส้น D คือ marker ใด',
     ["anti hbs", "hbsab", "hbs antibody", "antibody to hbsag", "anti hbsag"],
     'Anti-HBs ขึ้นหลัง HBsAg หายไป แสดงว่าหายและมีภูมิคุ้มกัน',
     img='graph_hbv_acute', src='หน้า 15')
card('hbv-window', 'hep', 'จากกราฟเดิม ช่วงสัปดาห์ที่ 24–32 ซึ่งตรวจไม่พบทั้ง HBsAg (A) และ anti-HBs (D) เรียกว่าอะไร',
     ["window period", "core window", "core window period", "window phase", "serologic window"],
     'Window period (core window): HBsAg ลดลงจนตรวจไม่พบ แต่ยังไม่สร้าง anti-HBs ในระดับที่ตรวจพบ ยังตรวจพบ IgM anti-HBc ได้',
     img='graph_hbv_acute', src='หน้า 15–16')
card('hbv-window-marker', 'hep', 'ในช่วง window period ของ HBV ตรวจพบ marker ใดที่บ่งชี้การติดเชื้อเฉียบพลัน',
     ["igm anti hbc", "anti hbc igm", "igm hbc"],
     'ตาราง 4.2.4: ระยะ core window ยังตรวจพบ anti-HBc IgM ได้ ควรตรวจซ้ำ anti-HBs ในอีก 1–2 เดือน',
     img='graph_hbv_acute', src='หน้า 16')
card('hbv-chronic-def', 'hep', 'HBsAg ที่ยังตรวจพบนานเกินกี่เดือน ถือว่าเป็น chronic HBV infection',
     ["6 months", "6", "6 เดือน", "more than 6 months", "six months"],
     'กราฟ chronic HBV: ระยะ acute 6 เดือน — HBsAg ที่คงอยู่เกินนี้เป็น chronic',
     img=None, src='หน้า 15')
card('hbv-chronic-A', 'hep', 'กราฟ chronic HBV infection — เส้น A คือ marker ใด',
     ["hbsag", "hepatitis b surface antigen"],
     'ใน chronic HBV, HBsAg คงอยู่เป็นปี ๆ (อาจค่อย ๆ ลดลงตามเวลา — เส้นประ)',
     img='graph_hbv_chronic', src='หน้า 15')
card('hbv-chronic-C', 'hep', 'จากกราฟ chronic HBV เดิม เส้น C ที่ขึ้นช่วงแรกแล้วกลับมามียอดแหลมเป็นพัก ๆ ในระยะ chronic คือ marker ใด',
     ["igm anti hbc", "anti hbc igm", "igm hbc"],
     'IgM anti-HBc associated with flares (often with symptoms) — IgM anti-HBc จึงพบได้ในช่วง flare ของ chronic HBV ไม่ได้มีเฉพาะ acute',
     img='graph_hbv_chronic', src='หน้า 15')
card('hbv-acute', 'hep', 'จงแปลผล',
     ["acute hbv infection", "acute hepatitis b", "acute infection", "acute hepatitis b infection", "acute hbv"],
     'ตาราง 4.2.3: HBsAg + / anti-HBs − / anti-HBc + และตรวจพบ anti-HBc IgM = ติดเชื้อเฉียบพลัน',
     img=None, src='หน้า 16',
     report=slip([['HBsAg', 'Positive'], ['IgM anti-HBc', 'Positive'], ['Anti-HBs', 'Negative']],
                 'ชาย 30 ปี ตัวเหลือง ตาเหลือง ALT สูงมาก 2 สัปดาห์'))
card('hbv-chronic', 'hep', 'จงแปลผล',
     ["chronic hbv infection", "chronic hepatitis b", "chronic infection", "chronic hepatitis b infection", "chronic hbv"],
     'HBsAg + / anti-HBc + / anti-HBs − และไม่พบ anti-HBc IgM = ติดเชื้อเรื้อรัง (CDC: HBsAg positive, anti-HBc positive, anti-HBs negative = chronic infection)',
     img=None, src='หน้า 16–17',
     report=slip([['HBsAg', 'Positive'], ['Anti-HBc (total)', 'Positive'], ['IgM anti-HBc', 'Negative'], ['Anti-HBs', 'Negative']],
                 'หญิง 45 ปี HBsAg positive ตั้งแต่ตรวจสุขภาพเมื่อ 3 ปีก่อน'))
card('hbv-recovered', 'hep', 'จงแปลผล',
     ["recovered from past infection and immune", "recovered with immunity", "recovered", "resolved infection",
      "past infection immune", "past infection", "immune due to natural infection", "natural immunity"],
     'HBsAg − / anti-HBs + / anti-HBc + = ฟื้นตัวจากการติดเชื้อและมีภูมิคุ้มกันป้องกันโรคได้ (recovered from past infection and immune)',
     img=None, src='หน้า 16–17',
     report=slip([['HBsAg', 'Negative'], ['Anti-HBc (total)', 'Positive'], ['Anti-HBs', 'Positive']],
                 'ชาย 52 ปี เคยตัวเหลืองตอนเด็ก ตรวจก่อนรับวัคซีน'))
card('hbv-vaccinated', 'hep', 'จงแปลผล',
     ["immune due to vaccination", "vaccinated", "vaccine immunity", "immune from vaccination", "vaccinated immune",
      "immune after vaccination", "hepatitis b vaccination"],
     'HBsAg − / anti-HBc − / anti-HBs + = immune ถ้า anti-HBs ≥ 10 mIU/mL หลังได้วัคซีนครบชุด (anti-HBc เป็นลบเพราะวัคซีนมีแค่ HBsAg)',
     img=None, src='หน้า 17',
     report=slip([['HBsAg', 'Negative'], ['Anti-HBc (total)', 'Negative'], ['Anti-HBs', 'Positive (85 mIU/mL)']],
                 'นักศึกษาแพทย์ ได้วัคซีนตับอักเสบบีครบ 3 เข็ม'))
card('hbv-susceptible', 'hep', 'จงแปลผล',
     ["never infected susceptible", "susceptible", "never infected", "not immune", "never infected and susceptible",
      "no infection no immunity"],
     'ทุก marker เป็นลบ = ไม่เคยติดเชื้อและไม่มีภูมิคุ้มกัน (susceptible) ควรได้รับวัคซีน — ข้อควรระวัง: ผู้ที่ได้วัคซีนมานานอาจตรวจไม่พบ anti-HBs',
     img=None, src='หน้า 16–17',
     report=slip([['HBsAg', 'Negative'], ['Anti-HBc (total)', 'Negative'], ['Anti-HBs', 'Negative']],
                 'หญิง 20 ปี ไม่เคยได้รับวัคซีน'))
card('hbv-isolated', 'hep', 'ผลตรวจแบบนี้เรียกรูปแบบว่าอะไร',
     ["isolated anti hbc", "isolated core antibody", "anti hbc alone", "isolated anti hbc positive"],
     'Isolated anti-HBc (core antibody) — เป็นได้จาก past infection (resolved), false positive, low-level chronic infection หรือ passive transfer จากแม่สู่ทารก',
     img=None, src='หน้า 16–17',
     report=slip([['HBsAg', 'Negative'], ['Anti-HBc (total)', 'Positive'], ['Anti-HBs', 'Negative']],
                 'ชาย 40 ปี ตรวจสุขภาพ ไม่มีอาการ'))
card('hbv-isolated-cause', 'hep', 'จงบอกสาเหตุที่เป็นไปได้ของผล isolated anti-HBc (HBsAg −, anti-HBs −, anti-HBc +) (ตอบ 1)',
     ["window period", "core window", "past infection", "resolved infection", "false positive", "occult hbv infection",
      "occult hbv", "low level chronic infection", "passive transfer", "maternal antibody", "hbv mutant",
      "coinfection with hcv", "coinfection with hdv"],
     'ตาราง 4.2.4: core window period, เคยติดเชื้อและหายนานแล้วจน anti-HBs ลดลง, occult HBV infection, HBV กลายพันธุ์ที่ "a" determinant, ติดเชื้อร่วม HCV/HDV, maternal antibody ในเด็ก < 18–24 เดือน หรือผลบวกปลอม',
     img=None, src='หน้า 16')
card('hbv-window-case', 'hep', 'จงแปลผล',
     ["window period", "core window period", "core window", "window phase", "resolving acute hbv infection"],
     'HBsAg หายไปแล้วแต่ยังไม่มี anti-HBs ขณะที่ IgM anti-HBc ยังบวก = core window period ของการติดเชื้อเฉียบพลันที่กำลังหาย — ตรวจ anti-HBs ซ้ำใน 1–2 เดือน',
     img=None, src='หน้า 16',
     report=slip([['HBsAg', 'Negative'], ['IgM anti-HBc', 'Positive'], ['Anti-HBs', 'Negative']],
                 'ชาย 28 ปี เป็นตับอักเสบเฉียบพลันเมื่อ 4 เดือนก่อน อาการดีขึ้นแล้ว'))
card('hbv-vaccine-transient', 'hep', 'จงแปลผล',
     ["transient hbsag after vaccination", "transient hbsag from vaccination", "recent vaccination", "post vaccination",
      "vaccine", "transient after vaccination", "from vaccine"],
     'HBsAg อาจตรวจพบชั่วคราวหลังฉีดวัคซีน (ภายใน 18 วัน หรือ 52 วันในผู้ป่วยฟอกไต) — CDC: HBsAg + เดี่ยว ๆ = early acute infection หรือ transient (up to 18 days) after vaccination',
     img=None, src='หน้า 17',
     report=slip([['HBsAg', 'Positive (weak)'], ['Anti-HBc (total)', 'Negative'], ['Anti-HBs', 'Negative']],
                 'พยาบาล 23 ปี ได้วัคซีนตับอักเสบบีเข็มแรกเมื่อ 7 วันก่อน ไม่มีอาการ'))
card('hbv-early-acute', 'hep', 'จงแปลผล',
     ["early acute infection", "early acute hbv infection", "early acute hepatitis b", "early infection",
      "early acute"],
     'ตาราง 4.2.3: HBsAg + / anti-HBs − / anti-HBc − = ติดเชื้อเฉียบพลันในระยะแรก ๆ (ร่างกายยังไม่สร้าง anti-HBc) — ควรตรวจ HBV DNA',
     img=None, src='หน้า 16–17',
     report=slip([['HBsAg', 'Positive'], ['Anti-HBc (total)', 'Negative'], ['Anti-HBs', 'Negative']],
                 'ชาย 26 ปี มีเพศสัมพันธ์กับผู้ติดเชื้อ HBV เมื่อ 5 สัปดาห์ก่อน ไม่เคยฉีดวัคซีน'))
card('hbv-hbig', 'hep', 'จงแปลผล',
     ["passive transfer", "passive immunity", "passive transfer from hbig", "from hbig", "passive antibody",
      "passive transfer after hbig"],
     'Anti-HBs + เดี่ยว ๆ หลังได้ HBIG = passive transfer (อยู่ได้ราว 3–6 เดือน)',
     img=None, src='หน้า 17',
     report=slip([['HBsAg', 'Negative'], ['Anti-HBc (total)', 'Negative'], ['Anti-HBs', 'Positive']],
                 'บุคลากรถูกเข็มตำจากผู้ป่วย HBsAg positive ได้ Hepatitis B immunoglobulin (HBIG) เมื่อ 2 เดือนก่อน ไม่เคยฉีดวัคซีน'))
card('hbv-cutoff', 'hep', 'หลังฉีดวัคซีนครบชุด anti-HBs ต้องมีระดับเท่าใดขึ้นไปจึงถือว่ามีภูมิคุ้มกัน',
     ["10 miu/ml", "10", "10 miu ml", ">=10 miu/ml", "≥10 miu/ml", "at least 10 miu/ml"],
     'Immune if anti-HBs concentration is 10 mIU/mL or greater after completing the vaccine series',
     img=None, src='หน้า 17')
card('hbv-vaccine-days', 'hep', 'หลังฉีดวัคซีนตับอักเสบบี อาจตรวจพบ HBsAg ชั่วคราวได้นานถึงประมาณกี่วัน (คนทั่วไป)',
     ["18 days", "18", "18 วัน"],
     'Transient (up to 18 days) after vaccination; ในผู้ป่วยฟอกไตอาจนานถึง 52 วัน',
     img=None, src='หน้า 17')
card('hbv-screen-old', 'hep', 'ประชากรกลุ่มเสี่ยงที่เกิดก่อน พ.ศ. 2535 แนะนำตรวจคัดกรองการติดเชื้อ HBV เรื้อรังด้วย marker ใดเพียงชนิดเดียวก็เพียงพอ',
     ["hbsag"],
     'แนวทางระดับชาติ 2568: ตรวจคัดกรองด้วย HBsAg เพียงชนิดเดียวก็เพียงพอ ถ้าพบให้ส่งเข้าระบบการรักษา',
     img=None, src='หน้า 18')
card('hbv-post-vaccine', 'hep', 'ผู้ที่ได้รับวัคซีนครบโดสแล้ว ควรตรวจ marker ใดเพียงชนิดเดียวใน 1 เดือนต่อมาเพื่อดูการตอบสนองต่อวัคซีน',
     ["anti hbs", "hbsab", "anti hbsag"],
     'ถ้าเคยได้รับวัคซีนมาแล้ว หลังได้รับวัคซีนครบโดสในเวลา 1 เดือนต่อมา แนะนำตรวจหา anti-HBs เพียงชนิดเดียว',
     img=None, src='หน้า 18')
card('des-hbv-nhso', 'hep', 'ตามนโยบายของคณะกรรมการหลักประกันสุขภาพแห่งชาติ การตรวจสถานภาพการติดเชื้อ HBV แนะนำให้ตรวจ marker ใดบ้าง',
     ["HBsAg and anti-HBs"],
     'ตามนโยบาย สปสช. แนะนำให้ตรวจเฉพาะ HBsAg และ anti-HBs (ไม่จำเป็นต้องตรวจ anti-HBc เพราะพบ isolated anti-HBc เพียงราวร้อยละ 3)',
     img=None, src='หน้า 18',
     kw=[["hbsag"], ["anti hbs", "hbsab"]])
card('hbv-one-assay', 'hep', 'ตรวจคัดกรอง HBsAg ด้วย one assay strategy ได้ผลดังรายงาน — ควรรายงานผลว่าอย่างไร',
     ["hbsag reactive", "reactive"],
     'แผนภูมิ 4.2.1: A1 reactive → รายงาน HBsAg = "Reactive" แล้วทำการทดสอบอื่นเพิ่ม เช่น HBV DNA — one assay strategy ใช้คัดกรองเท่านั้น ก่อนรักษาควรตรวจยืนยันด้วย molecular technique',
     img=None, src='หน้า 19',
     report=slip([['HBsAg (A1)', R]], 'ตรวจคัดกรองในพื้นที่ความชุกสูง (one assay strategy)'))
card('hbv-one-assay-confirm', 'hep', 'ผล HBsAg reactive จาก one assay strategy ก่อนเริ่มการรักษาควรตรวจยืนยันด้วยวิธีใด',
     ["hbv dna", "molecular technique", "molecular test", "pcr", "hbv viral load", "nucleic acid test"],
     'คำแนะนำ: ก่อนการรักษาควรตรวจยืนยันด้วย molecular technique (เช่น HBV DNA) ไม่ควรใช้ผลตรวจคัดกรองเพียงอย่างเดียวในการวินิจฉัย',
     img=None, src='หน้า 18–19')
card('hbv-two-pos', 'hep', 'ตรวจ HBsAg ด้วย two assays strategy ได้ผลดังรายงาน — ควรรายงานผลว่าอย่างไร',
     ["hbsag positive", "positive"],
     'แผนภูมิ 4.2.2: A1 reactive และ A2 reactive → รายงาน HBsAg = Positive',
     img=None, src='หน้า 19–20',
     report=slip([['HBsAg (A1)', R], ['HBsAg (A2, ชุดตรวจที่ต่างกัน)', R]], 'Two assays strategy'))
card('hbv-two-inconclusive', 'hep', 'ตรวจ HBsAg ด้วย two assays strategy ได้ผลดังรายงาน — ควรรายงานผลว่าอย่างไร',
     ["hbsag inconclusive", "inconclusive", "indeterminate"],
     'A1 reactive แต่ A2 nonreactive → รายงาน HBsAg = Inconclusive แล้วพิจารณาตรวจ anti-HBc, anti-HBs หรือ HBV DNA ประกอบ',
     img=None, src='หน้า 19–20',
     report=slip([['HBsAg (A1)', R], ['HBsAg (A2, ชุดตรวจที่ต่างกัน)', NR]], 'Two assays strategy'))
card('hbv-one-assay-when', 'hep', 'WHO แนะนำให้ใช้ one assay strategy ตรวจ HBsAg ในพื้นที่ที่มีความชุกของ HBsAg ตั้งแต่ร้อยละเท่าใดขึ้นไป',
     ["0.4%", "0.4", "≥0.4%", ">=0.4%", "0.4 percent", "ร้อยละ 0.4"],
     'One assay strategy: แนะนำในกรณีที่พื้นที่มีความชุก HBsAg สูงกว่าหรือเท่ากับร้อยละ 0.4 และชุดตรวจมีความไวและความจำเพาะสูง',
     img=None, src='หน้า 18')

card('hcv-A', 'hep', 'กราฟการติดเชื้อ HCV ที่หายเองได้ (self-resolving) — เส้น A คือ marker ใด',
     ["hcv rna", "rna", "hcv viral load"],
     'HCV RNA ตรวจพบเร็วที่สุดหลัง eclipse phase แล้วหายไปเมื่อ virus clearance',
     img='graph_hcv', src='หน้า 15')
card('hcv-B', 'hep', 'จากกราฟเดิม เส้น B คือ marker ใด',
     ["hcv ag", "hcv antigen", "hcv core antigen", "hcv core ag", "core antigen"],
     'HCV Ag (core antigen) ขึ้นช่วงสั้น ๆ ในระยะ serological window',
     img='graph_hcv', src='หน้า 15')
card('hcv-C', 'hep', 'จากกราฟเดิม เส้น C คือ marker ใด',
     ["anti hcv", "hcv antibody", "antibody to hcv"],
     'Anti-HCV ขึ้นช้ากว่า (ราวเดือนที่ 2–3) แล้วค่อย ๆ ลดลง (waning) จนอาจตรวจไม่พบ (seroreversion) ในรายที่หาย',
     img='graph_hcv', src='หน้า 15')
card('hcv-window', 'hep', 'ช่วงที่ตรวจพบ HCV RNA แต่ยังตรวจไม่พบ anti-HCV เรียกว่าอะไร',
     ["serological window", "serologic window", "window period", "seronegative window"],
     'Serological window — ช่วงนี้ตรวจ anti-HCV ไม่พบ ต้องอาศัย HCV RNA หรือ HCV Ag',
     img='graph_hcv', src='หน้า 15')
card('hcv-resolved', 'hep', 'จงแปลผล',
     ["resolved hcv infection", "resolved infection", "past infection", "past hcv infection", "self resolving infection",
      "cleared infection", "spontaneous clearance", "recovered"],
     'กราฟ A (self-resolving): HCV RNA หายไปหลัง virus clearance ขณะที่ anti-HCV ยังอยู่ระยะหนึ่ง = เคยติดเชื้อและหายแล้ว',
     img=None, src='หน้า 15',
     report=slip([['Anti-HCV', R], ['HCV RNA', 'Not detected']], 'ชาย 40 ปี ตรวจซ้ำ 2 ครั้งห่างกัน 6 เดือน ผลเหมือนเดิม'))
card('hcv-chronic', 'hep', 'จงแปลผล',
     ["chronic hcv infection", "chronic hepatitis c", "chronic infection", "chronic hcv"],
     'กราฟ B (chronic): ทั้ง anti-HCV และ HCV RNA ยังคงตรวจพบต่อเนื่อง = chronic HCV infection',
     img=None, src='หน้า 15',
     report=slip([['Anti-HCV', R], ['HCV RNA', 'Detected (2.1 × 10⁶ IU/mL)']],
                 'ชาย 48 ปี เคยใช้ยาเสพติดชนิดฉีด anti-HCV reactive มาแล้วมากกว่า 1 ปี'))
