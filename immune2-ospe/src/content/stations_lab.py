# -*- coding: utf-8 -*-
"""Topic 1 — Lab infection (La-or Chompuk, M.D., Department of Pathology).

Each card is one OSPE station in the format of the old papers (MEDNU 23–26,
years 2562–2565): a picture and two or three short questions (ก ข ค).
Topics that appeared in those papers are grouped by how often they appeared.
A third group, "คาดว่าอาจออกปีนี้", holds lecture material no paper has used yet:
other pictures of the frequent topics and the lecture topics never asked.

`years`  the papers in which this topic appeared
`seen`   the paper that used this very picture (None = lecture picture only)
`group`  stations on one topic, so a mock exam never asks the same topic twice
`src`    lecture slide; "ข้อสอบปี 62" marks a picture taken from the old paper
"""

CARDS = []


def station(id, cat, parts, explain, img=None, stem='', years=(), seen=None, src=None, report=None, group=None):
    CARDS.append({'id': id, 'category': cat, 'question': stem, 'parts': parts, 'explain': explain,
                  'images': [img] if isinstance(img, str) else list(img or []),
                  'years': list(years), 'seen': seen, 'src': src, 'report': report, 'group': group})


def part(q, answers, kw=None):
    return {'q': q, 'answers': answers, 'keywords': kw}


DX = 'จงวินิจฉัยโรค'
DESCRIBE = 'จงบรรยายพยาธิสภาพที่พบดังรูป'
CAUSE = 'จงบอกชื่อเชื้อที่เป็นสาเหตุ'

# ------------------------------------------------------------------ answer lists
EUMYC = ['Eumycotic mycetoma', 'Eumycetoma', 'Fungal mycetoma', 'Eumycotic mycetomas']
PMC = ['Pseudomembranous colitis', 'Pseudomembranous enterocolitis', 'C. difficile colitis',
       'Clostridium difficile colitis', 'Clostridioides difficile colitis', 'Antibiotic associated colitis']
CDIFF = ['Clostridioides difficile', 'Clostridium difficile', 'C. difficile', 'C. diff']
ORAL_CAND = ['Oral candidiasis', 'Oral thrush', 'Thrush', 'Candidiasis', 'Oropharyngeal candidiasis', 'Oral candidosis']
CAND = ['Candidiasis', 'Candida infection', 'Candidosis', 'Candida', 'Candida albicans', 'Invasive candidiasis']
CALB = ['Candida albicans', 'C. albicans', 'Candida']
MOLL = ['Molluscum contagiosum', 'Molluscum contagiosum infection', 'Molluscum', 'หูดข้าวสุก']
MOLL_BODY = ['Molluscum bodies', 'Molluscum body', 'Henderson–Patterson bodies', 'Henderson–Patterson body']
ASP = ['Aspergillosis', 'Invasive aspergillosis', 'Aspergillus infection', 'Pulmonary aspergillosis', 'Aspergillus']
ASP_KW = [['septate', 'septate hyphae', 'septated', 'septa', 'septum'],
          ['acute angle', 'acute angle branching', 'dichotomous', '45 degree', '40 degree', 'มุมแหลม']]
HPV = ['Human papillomavirus', 'HPV', 'Human papilloma virus', 'HPV 6, 11', 'HPV type 6 and 11', 'HPV 6', 'HPV 11']
CONDY = ['Condyloma acuminatum', 'Condyloma acuminata', 'Condylomata acuminata', 'Anogenital wart', 'Anogenital warts',
         'Genital wart', 'Genital warts', 'Venereal wart', 'หูดหงอนไก่']
STRONGY = ['Strongyloidiasis', 'Strongyloides infection', 'Strongyloides stercoralis infection',
           'Strongyloides hyperinfection', 'Disseminated strongyloidiasis']
STRONGY_ORG = ['Strongyloides stercoralis', 'S. stercoralis', 'Strongyloides']
PNEU = ['Lobar pneumonia', 'Pneumococcal pneumonia', 'Acute lobar pneumonia', 'Bacterial lobar pneumonia']
SPN = ['Streptococcus pneumoniae', 'S. pneumoniae', 'Pneumococcus', 'Strep pneumoniae']
HSV = ['Herpes simplex virus infection', 'HSV infection', 'Herpes simplex infection', 'Herpes simplex',
       'Herpes labialis', 'HSV-1 infection', 'Herpes', 'เริม', 'โรคเริม']
HSV_KW = [['multinucleated', 'multinucleation', 'giant cell', 'giant cells'],
          ['glassy', 'ground glass', 'intranuclear inclusion', 'intranuclear', 'cowdry']]
CRYPTOSPOR = ['Cryptosporidiosis', 'Cryptosporidium', 'Cryptosporidium parvum', 'C. parvum', 'Cryptosporidium infection']
TRICH = ['Trichinellosis', 'Trichinosis', 'Trichiniasis', 'Trichinella infection', 'Trichinella spiralis infection']
TRICH_ORG = ['Trichinella spiralis', 'T. spiralis', 'Trichinella']
CRYPTO = ['Cryptococcosis', 'Cryptococcal infection', 'Cryptococcus neoformans infection', 'Cryptococcus',
          'Cryptococcus neoformans', 'C. neoformans']
CMV = ['Cytomegalovirus infection', 'CMV infection', 'CMV pneumonia', 'CMV pneumonitis', 'Cytomegalovirus pneumonia',
       'Cytomegalovirus', 'CMV']
CYSTI = ['Cysticercosis', 'Cysticercus cellulosae', 'Taenia solium cysticercosis', 'Cysticercus']
TALARO = ['Talaromycosis', 'Penicilliosis', 'Penicilliosis marneffei', 'Penicillosis', 'Talaromyces marneffei infection',
          'Talaromyces marneffei', 'Penicillium marneffei', 'T. marneffei', 'P. marneffei']
ENTERO = ['Enterobiasis', 'Enterobius vermicularis infection', 'Enterobius vermicularis', 'Pinworm infection', 'Pinworm',
          'Oxyuriasis', 'Enterobius']
RABIES = ['Rabies', 'Rabies virus infection', 'Rabies encephalitis', 'โรคพิษสุนัขบ้า']
MUCOR = ['Mucormycosis', 'Zygomycosis', 'Rhinocerebral mucormycosis', 'Mucor infection', 'Mucor']

ALL4 = (2562, 2563, 2564, 2565)

# ================================================================== ออกบ่อย (2–4 ปี)

# ---- Eumycotic mycetoma: every paper 2562–2565
station('s-eumyc-hyphae', 'lab-hot', [
    part(DESCRIBE, ['Pigmented fungal hyphae with suppurative granuloma'],
         kw=[['pigmented', 'brown', 'dark brown', 'dematiaceous', 'black'],
             ['hyphae', 'hypha', 'fungal hyphae', 'fungus', 'fungal'],
             ['suppurative', 'suppurative granuloma', 'granuloma', 'granulomatous', 'neutrophils', 'neutrophil', 'abscess']]),
    part(DX, EUMYC),
], 'เฉลยข้อสอบปี 65: ก. Pigmented fungal hyphae with suppurative granuloma ข. Eumycotic mycetoma — กลุ่มเส้นใยราสีน้ำตาลเข้ม '
   'อยู่กลาง suppurative granuloma (neutrophils ล้อมด้วย epithelioid histiocytes) · ถ้าเป็นกลุ่มแบคทีเรียจะเป็น actinomycotic mycetoma',
   img='eumyc_hyphae', years=ALL4, seen=2565, src='สไลด์ 13–14')

station('s-eumyc-sh', 'lab-hot', [
    part(DESCRIBE, ['Fungal hyphae with suppurative granuloma and Splendore–Hoeppli phenomenon'],
         kw=[['hyphae', 'hypha', 'fungal hyphae', 'fungus', 'fungal'],
             ['suppurative', 'suppurative granuloma', 'granuloma', 'granulomatous', 'neutrophils', 'neutrophil', 'abscess'],
             ['splendore hoeppli', 'splendore', 'hoeppli', 'eosinophilic material', 'asteroid body']]),
    part(DX, EUMYC),
], 'เฉลยข้อสอบปี 63: ก. Fungal hyphae with suppurative granuloma and Splendore–Hoeppli phenomenon ข. Eumycotic mycetoma — '
   'Splendore–Hoeppli = สาร eosinophilic (fibrin, antigen–antibody complexes, debris) ล้อมรอบกลุ่มเชื้อเป็นแฉก ทำให้เชื้อไม่ถูกกินและโรคเรื้อรัง',
   img='sh_low', years=ALL4, seen=2563, src='สไลด์ 15–16')

station('s-eumyc-dark', 'lab-hot', [
    part(DESCRIBE + ' (สิ่งที่ลูกศรชี้)', ['Dark brown pigmented fungal hyphae surrounded by neutrophils (suppurative inflammation)'],
         kw=[['pigmented', 'brown', 'dark brown', 'dematiaceous', 'black'],
             ['hyphae', 'hypha', 'fungal hyphae', 'fungus', 'fungal', 'grain'],
             ['neutrophils', 'neutrophil', 'suppurative', 'granuloma', 'granulomatous', 'abscess', 'inflammatory cells']]),
    part(DX, EUMYC),
], 'ภาพจากข้อสอบปี 62 (ป้ายในภาพเดิมเขียนว่า "Dark brown pigmented hyphae of eumycotic mycetoma") — '
   'กลุ่มเส้นใยราสีน้ำตาลเข้ม (grain) ล้อมรอบด้วย neutrophils = eumycotic mycetoma',
   img='x_eumyc_dark', years=ALL4, seen=2562, src='ข้อสอบปี 62')

# ---- Pseudomembranous colitis: every paper
station('s-pmc-a55', 'lab-hot', [part(DX, PMC), part(CAUSE, CDIFF)],
        'Hyperemic mucosa กับแผ่น pseudomembrane สีเหลืองเขียว = pseudomembranous colitis จาก Clostridioides difficile '
        '(ชื่อเดิม Clostridium difficile) มักเกิดหลังได้ยาปฏิชีวนะ · ก่อโรคผ่าน toxin A และ toxin B',
        img='pmc_gross1', years=ALL4, seen=2563, src='สไลด์ 24–25')
station('s-pmc-arrows', 'lab-hot', [part(DX, PMC), part(CAUSE, CDIFF)],
        'ภาพเดียวกับข้อสอบปี 65 — แผ่นนูนสีเหลืองเขียว (pseudomembrane) กระจายบนเยื่อบุลำไส้ใหญ่ที่แดงช้ำ',
        img='pmc_gross2', years=ALL4, seen=2565, src='สไลด์ 25')
station('s-pmc-histo', 'lab-hot', [part(DX, PMC), part(CAUSE, CDIFF)],
        'ข้อสอบปี 62 ถามจาก tissue biopsy — colonic mucosa with sloughed epithelium; exudate ของ fibrin, neutrophils และ mucin '
        'พุ่งออกจาก crypt ที่เสียหายเป็นรูปภูเขาไฟ (volcano lesion)',
        img='pmc_histo1', stem='ชิ้นเนื้อลำไส้ใหญ่ (tissue biopsy)', years=ALL4, src='สไลด์ 27')

# ---- Candidiasis: every paper
station('s-cand-thrush', 'lab-hot', [part(DX, ORAL_CAND), part(CAUSE, CALB)],
        'เฉลยข้อสอบปี 63: Oral candidiasis (oral thrush) / Candida albicans — คราบขาวเช็ดออกได้ เชื้อชอบที่อุ่นและชื้น',
        img='cand_thrush', years=ALL4, seen=2563, src='สไลด์ 31–32')
station('s-cand-tongue', 'lab-hot', [part(DX, ORAL_CAND), part(CAUSE, CALB)],
        'ภาพจากข้อสอบปี 65 (ปี 62 ก็ให้ภาพลิ้นแบบนี้) — เฉลย Candidiasis / Candida albicans',
        img='x_tongue', years=ALL4, seen=2565, src='ข้อสอบปี 65')
station('s-cand-histo', 'lab-hot', [
    part('จงบรรยายลักษณะของเชื้อที่พบ', ['Yeasts, budding yeasts and pseudohyphae'],
         kw=[['yeast', 'yeasts', 'budding yeast', 'budding yeasts', 'budding'],
             ['pseudohyphae', 'pseudohypha', 'pseudo hyphae']]),
    part(DX, CAND),
], 'เฉลยข้อสอบปี 64: Yeast, budding yeast, pseudohyphae → candidiasis (อาจพบ true septate hyphae ได้บ้าง)',
   img='cand_pas', stem='ชิ้นเนื้อ ย้อม PAS', years=ALL4, src='สไลด์ 31, 33')

# ---- Molluscum contagiosum: 2562, 2564, 2565
station('s-mollusc-bodies', 'lab-hot', [
    part('จงบอกชื่อเฉพาะของ inclusion ในภาพ', MOLL_BODY),
    part(DX, MOLL),
], 'เฉลยข้อสอบปี 62, 64, 65: Molluscum bodies / Molluscum contagiosum (หูดข้าวสุก) — '
   'molluscum body (Henderson–Patterson body) = intracytoplasmic inclusion ขนาดใหญ่ใน keratinocyte',
   img='mollusc_high', years=(2562, 2564, 2565), seen=2565, src='สไลด์ 65–66')
station('s-mollusc-low', 'lab-hot', [
    part(DX, MOLL),
    part('จงบอกชื่อเชื้อก่อโรค', ['Molluscum contagiosum virus', 'Poxvirus', 'Pox virus', 'MCV', 'Molluscipoxvirus']),
], 'Epidermis เจริญหวำลงไปในชั้นใต้ผิว (endophytic growth) เป็นก้อนรูปถ้วย เต็มไปด้วย molluscum bodies — '
   'เกิดจาก molluscum contagiosum virus (poxvirus) · คลินิก: umbilicated papule',
   img='mollusc_low', stem='ชิ้นเนื้อผิวหนัง', years=(2562, 2564, 2565), src='สไลด์ 65–66')

# ---- Aspergillosis: 2562, 2563, 2565
station('s-asp-gms-labels', 'lab-hot', [
    part(DESCRIBE, ['Septate hyphae with acute angle branching'], kw=ASP_KW),
    part(DX, ASP),
], 'เฉลยข้อสอบปี 65: Septate hyphae with acute angle branching / Aspergillosis — เส้นใยกว้าง 5–10 µm มีผนังกั้น (A) '
   'แตกแขนงมุมแหลม ~45° (B) ชอบลุกลามเข้าหลอดเลือดทำให้ hemorrhage · ต่างจาก Mucor (non-septate, มุมฉาก)',
   img='asp_gms2', stem='ย้อม GMS', years=(2562, 2563, 2565), seen=2565, src='สไลด์ 36, 39')
station('s-asp-gms', 'lab-hot', [
    part(DESCRIBE, ['Septate hyphae with acute angle branching'], kw=ASP_KW),
    part(DX, ASP),
], 'ภาพเดียวกับข้อสอบปี 63 — septate hyphae, acute angle (40–45°) branching = Aspergillus spp. (aspergillosis)',
   img='asp_gms1', stem='ย้อม GMS', years=(2562, 2563, 2565), seen=2563, src='สไลด์ 36, 38')

# ---- HPV: 2562 (koilocyte), 2563 (koilocyte), 2565 (condyloma)
station('s-koilocyte', 'lab-hot', [
    part('จงบรรยายลักษณะของเซลล์ที่ลูกศรชี้', ['Enlarged hyperchromatic nuclei with perinuclear halo'],
         kw=[['perinuclear halo', 'perinuclear clearing', 'clear halo', 'halo', 'perinuclear vacuolization', 'perinuclear cavitation'],
             ['hyperchromatic', 'hyperchromasia', 'dark nuclei', 'raisinoid']]),
    part('จงบอกชื่อเซลล์ที่ชี้', ['Koilocyte', 'Koilocytes', 'Koilocytosis', 'Koilocytic change', 'Koilocytic atypia']),
    part('เกิดจากเชื้อใด', HPV),
], 'ปี 63 ถาม: ชื่อเซลล์ (koilocyte) + เชื้อ (HPV) · ปี 62 ถาม: บรรยาย (hyperchromatic nuclei with perinuclear halo) + ชื่อเซลล์ — '
   'koilocyte: นิวเคลียสใหญ่ ติดสีเข้ม ขอบไม่เรียบ (raisinoid) มีช่องใสรอบนิวเคลียส',
   img='koilocyte', stem='ชิ้นเนื้อจาก cervix biopsy', years=(2562, 2563, 2565), seen=2563, src='สไลด์ 57, 60')
station('s-condy-perianal', 'lab-hot', [part(DX, CONDY), part(CAUSE, HPV)],
        'เฉลยข้อสอบปี 65: Condyloma acuminata / Human papillomavirus (type 6, 11) — ตุ่มผิวขรุขระคล้ายดอกกะหล่ำ '
        '· DDx: condyloma lata ของซิฟิลิสระยะที่ 2 ซึ่งแบน เรียบ ชื้น',
        img='hpv_perianal', years=(2562, 2563, 2565), seen=2565, src='สไลด์ 57–58')
station('s-condy-vulva', 'lab-hot', [part(DX, CONDY), part(CAUSE, HPV)],
        'Condyloma acuminata (หูดหงอนไก่) ที่อวัยวะเพศภายนอก จาก HPV type 6, 11',
        img='hpv_vulva', years=(2562, 2563, 2565), src='สไลด์ 57–58')

# ---- Strongyloidiasis: 2562, 2563, 2565
station('s-strongy-gastric', 'lab-hot', [part(DX, STRONGY), part('จงบอกชื่อพยาธิ', STRONGY_ORG)],
        'เฉลยข้อสอบปี 65: Strongyloidiasis — ตัวอ่อน (larvae) ชอนไชในเยื่อบุกระเพาะ พบในผู้ป่วยภูมิคุ้มกันบกพร่อง '
        'จาก uncontrolled autoinfection (disseminated) แทรกซ้อนด้วย sepsis จากแบคทีเรียในลำไส้',
        img='strongy_gastric', stem='ชิ้นเนื้อกระเพาะอาหารของผู้ป่วยที่ได้ยากดภูมิคุ้มกัน',
        years=(2562, 2563, 2565), seen=2565, src='สไลด์ 69, 71')
station('s-strongy-crypt', 'lab-hot', [part(DX, STRONGY), part('จงบอกชื่อ organism ในภาพ ข', STRONGY_ORG)],
        'ข้อสอบปี 63 ให้ 2 ภาพนี้ (ตัวอ่อนใน crypt ของลำไส้ + ตัวพยาธิ) เฉลย Strongyloidiasis · ปี 62 ถาม organism: Strongyloides stercoralis',
        img=['strongy_crypt', 'strongy_larva'], years=(2562, 2563, 2565), seen=2563, src='สไลด์ 69–70')

# ---- Lobar pneumonia: 2562, 2563 (gross + histo together both times)
station('s-lobar', 'lab-hot', [part(DX, PNEU), part('จงบอกเชื้อก่อโรคมา 1 ชนิด', SPN)],
        'เฉลยข้อสอบปี 62, 63: Lobar pneumonia / Streptococcus pneumoniae — gross: ปอดทั้ง lobe แข็ง สีขาวแน่น (consolidation) · '
        'histo: ถุงลมเต็มไปด้วย neutrophils ผนังถุงลมยังอยู่',
        img=['pneu_gross', 'pneu_histo'], years=(2562, 2563), seen=2563, src='สไลด์ 3–4')

# ---- HSV: 2563 (lip + Tzanck), 2565 (histology)
station('s-hsv-lip', 'lab-hot', [
    part(DESCRIBE, ['Group of small vesicles around the mouth; multinucleated giant cells with ground-glass intranuclear inclusions'],
         kw=[['vesicle', 'vesicles', 'blister', 'blisters', 'ตุ่มน้ำ']] + HSV_KW),
    part(DX, HSV),
], 'เฉลยข้อสอบปี 63: Group of small vesicles around mouth and multinucleated giant cells with ground-glass intranuclear inclusion / '
   'HSV infection — การขูดฐานตุ่มน้ำมาย้อมคือ Tzanck smear',
   img=['hsv_lip', 'hsv_tzanck'], years=(2563, 2565), seen=2563, src='สไลด์ 63–64')
station('s-hsv-histo', 'lab-hot', [
    part(DESCRIBE, ['Multinucleated giant cells with glassy intranuclear inclusions (Cowdry type A)'], kw=HSV_KW),
    part(DX, HSV),
], 'เฉลยข้อสอบปี 65: Multinucleated giant cells with glassy intranuclear inclusion (Cowdry type A) / HSV infection',
   img='hsv_histo', years=(2563, 2565), seen=2565, src='สไลด์ 64')

# ---- Cryptosporidiosis: 2562, 2563
station('s-cryptospor', 'lab-hot', [
    part(DESCRIBE, ['Small round organisms along the luminal border of the epithelium'],
         kw=[['small', 'organism', 'organisms', 'dots', 'round bodies'],
             ['luminal border', 'luminal surface', 'brush border', 'apical surface', 'surface', 'luminal', 'microvilli']]),
    part('จงวินิจฉัยโรค / บอกชื่อเชื้อ', CRYPTOSPOR),
], 'เฉลยข้อสอบปี 62, 63: small organism at luminal border = Cryptosporidiosis (Cryptosporidium parvum) — '
   'ท้องร่วงเป็นน้ำเรื้อรังในผู้ป่วย AIDS · ตรวจอุจจาระด้วย modified acid fast พบ oocyst',
   img='cryptospor', stem='ภาพชิ้นเนื้อจาก duodenal biopsy', years=(2562, 2563), seen=2563, src='สไลด์ 79–80')

# ---- Trichinellosis: 2562, 2563
station('s-trich-inflam', 'lab-hot', [part(DX, TRICH), part('จงบอกชื่อพยาธิ', TRICH_ORG)],
        'ภาพเดียวกับข้อสอบปี 63: encapsulated larva ในกล้ามเนื้อลาย = Trichinellosis (Trichinella spiralis) — '
        'ระวังสับสนกับ Trichuris trichiura (trichuriasis, พยาธิแส้ม้า) ซึ่งอยู่ในลำไส้ใหญ่',
        img='trich_inflam', stem='ชิ้นเนื้อกล้ามเนื้อลาย', years=(2562, 2563), seen=2563, src='สไลด์ 76–77')
station('s-trich-cyst', 'lab-hot', [
    part(DESCRIBE, ['Coiled larva encapsulated within skeletal muscle'],
         kw=[['larva', 'larvae', 'coiled', 'worm', 'parasite'],
             ['skeletal muscle', 'striated muscle', 'muscle fiber', 'muscle fibers', 'muscle'],
             ['capsule', 'encapsulated', 'encysted', 'cyst', 'nurse cell']]),
    part(DX, TRICH),
], 'Trichinellosis: encapsulated larvae in striated muscle — ระยะแรกตัวอ่อนทำลายกล้ามเนื้อ (myositis) มี eosinophils, '
   'ระยะสงบมีถุงหุ้มและแทบไม่มีการอักเสบ',
   img='trich_cyst', stem='ชิ้นเนื้อกล้ามเนื้อลาย', years=(2562, 2563), src='สไลด์ 76–77')

# ================================================================== เคยออก 1 ปี

station('s-crypto-bm', 'lab-once', [
    part(DESCRIBE, ['Yeast forms with thick gelatinous capsule'],
         kw=[['yeast', 'yeasts', 'yeast form'],
             ['capsule', 'gelatinous capsule', 'capsular', 'halo', 'encapsulated', 'clear halo']]),
    part(DX, CRYPTO),
], 'เฉลยข้อสอบปี 65: Yeast form with thick gelatinous capsule / Cryptococcosis — yeast 5–10 µm, capsule ไม่ติดสี H&E '
   'จึงเห็นเป็นวงใส · ย้อมเห็น capsule ด้วย mucicarmine, India ink',
   img='crypto_bm', years=(2565,), seen=2565, src='สไลด์ 43–45')
station('s-crypto-ink', 'lab-once', [
    part('การเตรียมสิ่งส่งตรวจในภาพนี้ใช้วิธีใด', ['India ink', 'India ink preparation', 'India ink stain', 'Nigrosin']),
    part('จงบอกชื่อเชื้อ', ['Cryptococcus neoformans', 'C. neoformans', 'Cryptococcus', 'Cryptococcosis']),
], 'India ink: หมึกไม่ซึมผ่าน capsule จึงเห็นวงใสรอบเชื้อบนพื้นดำ — Cryptococcus neoformans ทำให้เกิด meningoencephalitis '
   'ในผู้ป่วยภูมิคุ้มกันต่ำ',
   img='crypto_ink', stem='CSF ของผู้ป่วย AIDS ที่มีไข้และปวดศีรษะ', years=(2565,), src='สไลด์ 43–44')

station('s-cmv', 'lab-once', [
    part(DX, CMV),
    part('สิ่งที่ลูกศรสีเหลืองชี้คืออะไร', ['Intranuclear inclusion', "Owl's eye inclusion", 'Owl eye inclusion',
                                        'Intranuclear inclusion body', "Owl's eye", 'Owl eye']),
], 'เฉลยข้อสอบปี 65: Cytomegalovirus infection — เซลล์โต (cytomegaly) มี intranuclear inclusion ขนาดใหญ่สีม่วงล้อมด้วย clear halo '
   '(owl’s eye) และ basophilic intracytoplasmic inclusions เล็ก ๆ',
   img='cmv', stem='ชิ้นเนื้อปอดของผู้ป่วยหลังปลูกถ่ายไต', years=(2565,), seen=2565, src='สไลด์ 61–62')

station('s-cysticercus', 'lab-once', [
    part(DESCRIBE, ['Cyst formation surrounded by mixed inflammatory cells'],
         kw=[['cyst', 'cystic', 'cyst formation', 'cyst wall'],
             ['inflammatory cells', 'mixed inflammatory', 'inflammation', 'inflammatory', 'eosinophils', 'lymphocytes']]),
    part(DX, CYSTI),
    part('สิ่งที่ป้าย A ชี้คืออะไร', ['Scolex']),
], 'เฉลยข้อสอบปี 65: Cyst formation surrounded by mixed inflammatory cells / Cysticercosis — ตัวอ่อนของพยาธิตืดหมู '
   '(Taenia solium) ในถุงมี scolex (A) และ spiral canal (B)',
   img='cysticercus', years=(2565,), seen=2565, src='สไลด์ 81–82')

station('s-talaro', 'lab-once', [
    part(DX, TALARO),
    part('ลักษณะสำคัญของเชื้อที่ลูกศรสีเหลืองชี้คืออะไร', ['Transverse septum', 'Transverse septa', 'Binary fission',
                                                       'Central septum', 'Septum']),
], 'ภาพเดียวกับข้อสอบปี 62 (ในข้อสอบไม่มีลูกศร) — Talaromycosis (penicilliosis) จาก Talaromyces (Penicillium) marneffei: '
   'yeast 2–5 µm แบ่งตัวแบบ binary fission มี transverse septum ต่างจาก Histoplasma',
   img='talaro_yeast', stem='ผู้ป่วย AIDS มีตุ่มที่ผิวหนังกระจายทั่วตัว (ย้อม GMS)', years=(2562,), seen=2562, src='สไลด์ 50–51')

station('s-entero', 'lab-once', [
    part(DESCRIBE, ['Organism with bilateral alae in gut lumen'],
         kw=[['alae', 'ala', 'bilateral alae', 'lateral alae'],
             ['organism', 'worm', 'parasite', 'nematode', 'pinworm']]),
    part(DX, ENTERO),
], 'เฉลยข้อสอบปี 63: Organism with bilateral alae in gut lumen / Enterobiasis — Enterobius vermicularis (pinworm) '
   'ภาพ ข เป็นตัวเมียที่มีไข่อยู่ภายใน',
   img=['entero_alae', 'entero_eggs'], stem='ไส้ติ่งที่ผ่าตัดออก', years=(2563,), seen=2563, src='สไลด์ 72–75')

station('s-rabies', 'lab-once', [
    part('จงบอกชื่อของ inclusion body', ['Negri body', 'Negri bodies']),
    part(DX, RABIES),
], 'เฉลยข้อสอบปี 63: Negri body / Rabies virus infection — round to oval eosinophilic intracytoplasmic inclusion ใน neurons '
   '(pyramidal cells ของ hippocampus, Purkinje cells)',
   img='rabies', stem='สมองของผู้ป่วยที่กลัวน้ำ กลัวลม ก่อนเสียชีวิต', years=(2563,), seen=2563, src='สไลด์ 67–68')

station('s-mucor', 'lab-once', [
    part(DESCRIBE, ['Broad, non-septate hyphae with right angle branching'],
         kw=[['nonseptate', 'aseptate', 'pauciseptate', 'no septa', 'without septa'],
             ['broad', 'wide', 'ribbon', 'irregular'],
             ['right angle', '90 degree', 'perpendicular', 'มุมฉาก']]),
    part(DX, MUCOR),
], 'เฉลยข้อสอบปี 63: Broad, non-septate hyphae with right angle branching / Mucormycosis — เส้นใยกว้าง 6–50 µm '
   'ชอบลุกลามหลอดเลือด · rhinocerebral mucormycosis ในผู้ป่วยเบาหวาน',
   img='mucor_pas', stem='ชิ้นเนื้อโพรงจมูกของผู้ป่วยเบาหวาน', years=(2563,), seen=2563, src='สไลด์ 40–41')

# ================================================================== คาดว่าอาจออกปีนี้: หัวข้อที่ยังไม่เคยออก

station('s-tb', 'lab-new', [
    part(DESCRIBE, ['Granulomatous inflammation: epithelioid histiocytes, Langhans giant cells and lymphocytes'],
         kw=[['granuloma', 'granulomatous', 'granulomas'],
             ['giant cell', 'giant cells', 'langhans', 'multinucleated'],
             ['epithelioid', 'epithelioid histiocytes', 'epithelioid cells']]),
    part(DX, ['Tuberculosis', 'Pulmonary tuberculosis', 'TB', 'Mycobacterium tuberculosis infection', 'วัณโรค', 'วัณโรคปอด']),
], 'Granulomatous inflammation ของวัณโรค: epithelioid histiocytes, Langhans giant cell (นิวเคลียสเรียงเป็นเกือกม้า), '
   'lymphocytes และ caseous necrosis ตรงกลาง · ย้อม acid fast เห็น AFB สีแดง',
   img='tb_granuloma', stem='ชิ้นเนื้อปอด', src='สไลด์ 5–8')
station('s-hp', 'lab-new', [
    part('สิ่งที่ลูกศรสีน้ำเงินชี้ในชั้นเมือกคืออะไร', ['Helicobacter pylori', 'H. pylori', 'Hp']),
    part('เชื้อนี้ทำให้เกิดโรคใดของกระเพาะอาหาร (ตอบ 1 โรค)',
         ['Gastritis', 'Chronic gastritis', 'Active gastritis', 'Acute gastritis', 'Chronic active gastritis',
          'Peptic ulcer', 'Gastric ulcer', 'Peptic ulcer disease', 'Gastric adenocarcinoma', 'Gastric cancer',
          'MALT lymphoma', 'Gastric MALT lymphoma']),
], 'H. pylori: แบคทีเรียแกรมลบรูปแท่งโค้ง อยู่ในชั้นเมือกเหนือเยื่อบุ ไม่ลุกลามเข้าเนื้อเยื่อ — ทำให้ gastritis, peptic ulcer '
   'และเพิ่มความเสี่ยง gastric adenocarcinoma, MALT lymphoma · ยืนยันด้วย immunohistochemistry',
   img='hp_he', stem='ชิ้นเนื้อกระเพาะอาหาร ย้อม H&E', src='สไลด์ 20–22')
station('s-histo', 'lab-new', [
    part('จงบรรยายลักษณะของเชื้อที่พบ', ['Small thin-walled yeasts (3–5 µm) within macrophages'],
         kw=[['yeast', 'yeasts', 'small yeasts', 'small yeast'],
             ['macrophage', 'macrophages', 'histiocytes', 'intracellular', 'intracytoplasmic']]),
    part(DX, ['Histoplasmosis', 'Histoplasma capsulatum', 'Histoplasma', 'H. capsulatum']),
], 'Histoplasmosis: yeast เล็ก 3–5 µm อยู่เต็มไซโทพลาซึมของ macrophage — แยกจาก Talaromyces ที่มี transverse septum',
   img='histo_tissue', stem='ชิ้นเนื้อจากแผลในช่องปากของผู้ป่วย HIV', src='สไลด์ 47–48')
station('s-pcp', 'lab-new', [
    part(DX + ' (ภาพ ก)', ['Pneumocystis pneumonia', 'PCP', 'PJP', 'Pneumocystosis', 'Pneumocystis jirovecii pneumonia',
                          'Pneumocystis carinii pneumonia']),
    part('จงบอกชื่อเชื้อ (ภาพ ข ย้อม GMS)', ['Pneumocystis jirovecii', 'Pneumocystis jiroveci', 'P. jirovecii', 'Pneumocystis',
                                           'Pneumocystis carinii']),
], 'Pneumocystis pneumonia: ถุงลมเต็มไปด้วยสารสีชมพูเป็นฟอง (foamy exudate) · GMS เห็นเชื้อรูปถ้วย (cup shape) 4–6 µm',
   img=['pcp_he', 'pcp_gms2'], stem='ปอดของผู้ป่วย AIDS ที่มีไข้ ไอ หายใจเร็ว', src='สไลด์ 53–55')
station('s-verruca', 'lab-new', [
    part(DX, ['Verruca vulgaris', 'Common wart', 'Common warts', 'Wart', 'Viral wart', 'Verruca']),
    part(CAUSE, HPV),
    part('จงบอกพยาธิสภาพที่ลูกศรสีเขียวชี้', ['Papillomatosis', 'Papillomatous', 'Papillomatous hyperplasia']),
], 'Verruca vulgaris (common wart) จาก HPV: papillomatosis (ลูกศรเขียว — epidermis ยื่นออกเป็นแท่งคล้ายนิ้ว) '
   'และ hyperkeratosis (ลูกศรเหลือง) มี koilocytes ในชั้นบน',
   img='verruca_low', stem='ชิ้นเนื้อจากตุ่มนูนที่นิ้วมือ', src='สไลด์ 57, 59')

station('s-tb-gross', 'lab-new', [
    part(DX, ['Pulmonary tuberculosis', 'Tuberculosis', 'TB', 'Cavitary tuberculosis', 'Secondary tuberculosis',
              'Reactivation tuberculosis', 'Post primary tuberculosis', 'วัณโรคปอด', 'วัณโรค']),
    part('จงบอกชนิดของเนื้อตาย (necrosis) ที่เห็น', ['Caseous necrosis', 'Caseation necrosis', 'Caseation', 'Caseous']),
], 'วัณโรคปอด (secondary TB) มักเกิดที่ปอดกลีบบน หน้าตัดเห็นเนื้อตายสีเหลืองคล้ายเนย (caseous necrosis) และโพรง (cavity)',
   img='tb_gross', stem='ปอดของผู้ป่วยไอเรื้อรัง น้ำหนักลด', src='สไลด์ 6–7')
station('s-tb-miliary', 'lab-new', [
    part(DX, ['Miliary tuberculosis', 'Pulmonary miliary tuberculosis', 'Miliary TB', 'Disseminated tuberculosis']),
    part(CAUSE, ['Mycobacterium tuberculosis', 'M. tuberculosis', 'Tubercle bacilli', 'Mycobacterium']),
], 'Miliary tuberculosis: จุดเล็กสีขาวขนาดใกล้เคียงกันกระจายทั่วปอด เกิดจากเชื้อแพร่ไปตามกระแสเลือด',
   img='tb_miliary', stem='ผิวตัดปอด', src='สไลด์ 9')
station('s-tb-afb', 'lab-new', [
    part('ภาพนี้ย้อมด้วยสีพิเศษชนิดใด', ['Acid fast stain', 'Acid fast', 'Ziehl–Neelsen', 'Ziehl–Neelsen stain', 'AFB stain',
                                       'ZN stain', 'Kinyoun stain', 'Acid fast bacilli stain']),
    part('สิ่งที่ลูกศรชี้ (แท่งสีแดง) คืออะไร', ['Acid fast bacilli', 'AFB', 'Mycobacterium tuberculosis', 'M. tuberculosis',
                                            'Tubercle bacilli', 'Mycobacteria', 'Mycobacterium']),
], 'Acid fast stain (Ziehl–Neelsen): ผนังเซลล์ที่มี mycolic acid ทนต่อการล้างสีด้วยกรด-แอลกอฮอล์ เชื้อจึงติดสีแดง '
   '(acid-fast bacilli) บนพื้นสีฟ้า',
   img='tb_afb', src='สไลด์ 5, 8')
station('s-gastric-ulcer', 'lab-new', [
    part('จงวินิจฉัยรอยโรคที่ลูกศรชี้', ['Gastric ulcer', 'Peptic ulcer', 'Chronic peptic ulcer', 'Chronic gastric ulcer',
                                       'Peptic ulcer disease']),
    part('เชื้อแบคทีเรียที่สัมพันธ์กับรอยโรคนี้มากที่สุดคืออะไร', ['Helicobacter pylori', 'H. pylori', 'Hp']),
], 'Gastric (peptic) ulcer — H. pylori เรื้อรังสัมพันธ์กับ gastritis และ peptic ulcer (ทั้ง gastric และ duodenal) '
   'และเพิ่มความเสี่ยง gastric adenocarcinoma กับ MALT lymphoma',
   img='gastric_ulcer', stem='กระเพาะอาหารที่ผ่าตัดออก', src='สไลด์ 18–19', group='hp')
station('s-gastritis', 'lab-new', [
    part(DX, ['Acute gastritis', 'Active gastritis', 'Acute active gastritis', 'Chronic active gastritis', 'H. pylori gastritis',
              'Gastritis']),
    part('เซลล์อักเสบที่ลูกศรชี้คือเซลล์ชนิดใด', ['Neutrophils', 'Neutrophil', 'Polymorphonuclear leukocytes', 'PMN', 'PMNs']),
], 'มี neutrophils แทรกในเยื่อบุและต่อมของกระเพาะ = acute (active) gastritis จาก H. pylori',
   img='acute_gastritis', stem='ชิ้นเนื้อกระเพาะอาหารของผู้ติดเชื้อ H. pylori', src='สไลด์ 20', group='hp')
station('s-hp-ihc', 'lab-new', [
    part('ภาพนี้ใช้การย้อมวิธีใดยืนยันเชื้อ (เชื้อติดสีน้ำตาล)', ['Immunohistochemistry', 'IHC', 'Immunohistochemical stain',
                                                              'Immunostain', 'Immunoperoxidase stain']),
    part('จงบรรยายรูปร่างและตำแหน่งของเชื้อ', ['Rod-shaped (curved) bacteria at the mucosal surface'],
         kw=[['rod shape', 'rod', 'rods', 'rod shaped', 'bacilli', 'curved', 'spiral'],
             ['mucosal surface', 'surface', 'mucus', 'mucous layer', 'surface epithelium', 'lumen']]),
], 'Gastric mucosa: positive for H. pylori by immunohistochemistry — rod shape bacteria at mucosal surface ติดสีน้ำตาล',
   img='hp_ihc_zoom', stem='ชิ้นเนื้อกระเพาะอาหาร', src='สไลด์ 22–23')

# ================================================================== คาดว่าอาจออกปีนี้: ภาพหรือคำถามใหม่ของหัวข้อที่เคยออก
# The papers reuse the same topics with different lecture pictures (PMC: gross 63 and 65, biopsy 62;
# Candida: thrush 63, tongue 62/65, histology 64), so the remaining pictures of those topics are likely too.

station('s-eumyc-labels', 'lab-new', [
    part('จงบอกรูปแบบการอักเสบที่เห็นในภาพ', ['Suppurative granuloma', 'Suppurative granulomatous inflammation',
                                             'Suppurative granulomas']),
    part('เซลล์ที่ป้าย A ชี้คืออะไร', ['Epithelioid histiocytes', 'Epithelioid histiocyte', 'Epithelioid cells',
                                    'Epithelioid macrophages', 'Epithelioid']),
    part('สิ่งที่ป้าย B ชี้คืออะไร', ['Pigmented fungal hyphae', 'Pigmented hyphae', 'Dematiaceous hyphae', 'Fungal hyphae']),
], 'สไลด์ 13: Eumycotic mycetoma — suppurative granuloma: กลางเป็น pigmented fungal hyphae (B) และ neutrophils (C) '
   'ล้อมด้วย epithelioid histiocytes (A)',
   img='eumyc_granuloma', years=ALL4, src='สไลด์ 13')
station('s-sh-labels', 'lab-new', [
    part('สิ่งที่ป้าย B ชี้คืออะไร', ['Fungal hyphae', 'Hyphae', 'Fungal colony', 'Fungal grain', 'Fungus']),
    part('สิ่งที่ป้าย C ชี้คืออะไร', ['Eosinophilic material', 'Eosinophilic amorphous material', 'Splendore–Hoeppli material',
                                   'Splendore–Hoeppli phenomenon', 'Eosinophilic substance']),
    part('ปรากฏการณ์ที่เห็นนี้เรียกว่าอะไร', ['Splendore–Hoeppli phenomenon', 'Splendore–Hoeppli', 'Splendore–Hoeppli reaction']),
], 'Splendore–Hoeppli phenomenon: สาร eosinophilic (C) ล้อมรอบกลุ่มเชื้อ (B) เป็นแฉก ประกอบด้วย fibrin, antigen–antibody '
   'complexes และ debris — ทำให้เชื้อไม่ถูกกินและโรคเรื้อรัง · A = inflammatory cells',
   img='sh_high', years=ALL4, src='สไลด์ 15–17', group='eumyc')
station('s-myc-foot', 'lab-new', [
    part(DX + ' (ภาพ ก)', ['Mycetoma', 'Madura foot', 'Maduromycosis', 'Eumycotic mycetoma', 'Actinomycotic mycetoma',
                          'Eumycetoma', 'Actinomycetoma', 'โรคเท้าชาวนา']),
    part('เม็ดสีเหลืองที่ลูกศรชี้ในภาพ ข เรียกว่าอะไร', ['Sulfur granules', 'Sulfur granule', 'Sulphur granules', 'Sulphur granule',
                                                     'Grains', 'Grain', 'Granules']),
    part('โรคนี้เกิดจากเชื้อได้ 2 กลุ่ม คืออะไร', ['Bacteria (actinomycotic mycetoma) and fungi (eumycotic mycetoma)'],
         kw=[['bacteria', 'bacterial', 'actinomycotic', 'actinomycetes', 'แบคทีเรีย'],
             ['fungi', 'fungus', 'fungal', 'eumycotic', 'เชื้อรา']]),
], 'Mycetoma (Madura foot, โรคเท้าชาวนา): ก้อนแข็ง บวม ตะปุ่มตะป่ำ มีรูเปิด (sinus) ที่มีหนองและ grains/sulfur granules '
   '(= colonies ของเชื้อ) ไหลออกมา · actinomycotic จากแบคทีเรีย (Actinomadura, Streptomyces) · eumycotic จากเชื้อรา '
   '(Pseudallescheria boydii, Madurella)',
   img=['myc_foot', 'myc_granule'], stem='เท้าของชาวนา บวมแข็ง ตะปุ่มตะป่ำ มีรูเปิดหลายรู', years=ALL4, src='สไลด์ 10–11',
   group='eumyc')
station('s-pmc-labels', 'lab-new', [
    part('สิ่งที่ป้าย A ชี้ (ลูกศรสีดำ) คืออะไร', ['Necrotic gland', 'Necrotic glands', 'Necrotic crypt', 'Necrotic crypts']),
    part('สิ่งที่ป้าย B ชี้ (ลูกศรสีแดง) คืออะไร', ['Fibrin exudate', 'Fibrin', 'Fibrinous exudate', 'Fibrinopurulent exudate',
                                               'Pseudomembrane']),
    part(DX, PMC),
], 'Necrotic gland (A) และ fibrin exudate (B) พุ่งออกจาก crypt ที่เสียหายเป็น pseudomembrane — PMC จาก C. difficile '
   'ซึ่งก่อโรคผ่าน toxin A และ toxin B',
   img='pmc_histo2', stem='ชิ้นเนื้อลำไส้ใหญ่', years=ALL4, src='สไลด์ 28')
station('s-cand-labels', 'lab-new', [
    part('สิ่งที่ป้าย A ชี้คืออะไร', ['Pseudohyphae', 'Pseudohypha', 'Pseudohyphae of Candida']),
    part('สิ่งที่ป้าย B ชี้คืออะไร', ['Yeasts', 'Yeast', 'Yeast cells', 'Budding yeasts', 'Blastoconidia']),
    part(DX, CAND),
], 'Candidiasis (H&E): pseudohyphae (A) = yeast ที่แตกหน่อต่อกันเป็นสาย มีรอยคอดที่รอยต่อ และ yeasts (B) — '
   'ปี 64 ถามแบบบรรยาย: yeast, budding yeast, pseudohyphae',
   img='cand_he', stem='ชิ้นเนื้อ ย้อม H&E', years=ALL4, src='สไลด์ 34')
station('s-cand-diaper', 'lab-new', [
    part(DX, ['Candidiasis', 'Candidal diaper dermatitis', 'Diaper candidiasis', 'Cutaneous candidiasis', 'Candida diaper rash',
              'Diaper rash']),
    part(CAUSE, CALB),
], 'Diaper rash จาก Candida: ผื่นแดงในที่อับชื้นใต้ผ้าอ้อม มีตุ่มเล็ก ๆ กระจายรอบผื่นหลัก (satellite lesions)',
   img='cand_diaper', stem='ผื่นแดงบริเวณที่ใส่ผ้าอ้อมของทารก', years=ALL4, src='สไลด์ 32')
station('s-asp-ball', 'lab-new', [
    part('จงวินิจฉัยรอยโรคในโพรงของปอดนี้', ['Aspergilloma', 'Fungus ball', 'Fungal ball', 'Pulmonary aspergilloma',
                                            'Colonizing aspergillosis']),
    part('รอยโรคนี้ต่างจาก invasive aspergillosis อย่างไร', ['Fungus grows in a pre-existing cavity without tissue invasion'],
         kw=[['cavity', 'pre-existing cavity', 'โพรง'],
             ['no tissue invasion', 'no invasion', 'without tissue invasion', 'without invasion', 'not invade', 'noninvasive',
              'ไม่ลุกลาม']]),
], 'Aspergilloma (colonizing aspergillosis): colonies ของ Aspergillus อัดแน่นในโพรงเดิม ไม่ลุกลามเนื้อเยื่อ — '
   'ต่างจาก invasive aspergillosis ที่ลุกลามหลอดเลือดทำให้ hemorrhage',
   img='asp_ball', years=(2562, 2563, 2565), src='สไลด์ 36–37')
station('s-hsv-tzanck', 'lab-new', [
    part('เซลล์ในภาพนี้เรียกว่าอะไร', ['Multinucleated giant cells', 'Multinucleated giant cell', 'Multinucleated cells',
                                    'Tzanck cells', 'Multinucleated epithelial giant cells']),
    part('inclusion ในนิวเคลียสที่ใสเหมือนกระจกเรียกว่าอะไร', ['Cowdry type A', 'Cowdry A', 'Cowdry type A inclusion',
                                                            'Cowdry type A inclusions', 'Cowdry body']),
    part('การตรวจนี้เรียกว่าอะไร', ['Tzanck smear', 'Tzanck test', 'Tzanck preparation']),
], 'Tzanck smear: ขูดฐานตุ่มน้ำมาย้อม พบ multinucleated giant cells with glassy intranuclear inclusion (Cowdry type A) '
   '= HSV infection — ภาพเดียวกับข้อสอบปี 63 แต่ถามชื่อเซลล์และ inclusion',
   img='hsv_tzanck', stem='smear ที่ขูดจากฐานตุ่มน้ำที่ริมฝีปาก', years=(2563, 2565), src='สไลด์ 63–64')
station('s-mollusc-clin', 'lab-new', [
    part(DX, MOLL),
    part('ลักษณะเฉพาะของตุ่มที่ลูกศรชี้เรียกว่าอะไร', ['Umbilicated papule', 'Umbilicated papules', 'Umbilicated', 'Umbilication',
                                                    'Central umbilication', 'Central dimple']),
], 'Molluscum contagiosum (หูดข้าวสุก): umbilicated papule — ตุ่มนูนมีรอยบุ๋มตรงกลาง',
   img='mollusc_clin', stem='ตุ่มเล็ก ๆ หลายตุ่มที่ผิวหนัง', years=(2562, 2564, 2565), src='สไลด์ 65–66')
station('s-trich-labels', 'lab-new', [
    part('สิ่งที่ป้าย B ชี้คืออะไร', ['Capsule', 'Cyst wall', 'Capsule of larva', 'Nurse cell', 'Fibrous capsule']),
    part('สิ่งที่ป้าย C ชี้คืออะไร', ['Larva', 'Larvae', 'Trichinella larva', 'Coiled larva', 'Encysted larva',
                                   'Trichinella spiralis larva']),
    part(DX, TRICH),
], 'Trichinellosis: encapsulated larva (C) ใน capsule (B) ภายในกล้ามเนื้อลาย ล้อมด้วย inflammatory cells (A)',
   img='trich_labeled', stem='ชิ้นเนื้อกล้ามเนื้อลายของผู้ป่วยที่กินเนื้อหมูดิบ', years=(2562, 2563), src='สไลด์ 78')
station('s-crypto-muci', 'lab-new', [
    part('ภาพนี้ย้อมด้วยสีพิเศษใดเพื่อแสดง capsule (capsule ติดสีชมพูแดง)', ['Mucicarmine', 'Mucicarmine stain',
                                                                       'Mayer mucicarmine', 'Mucin stain']),
    part(DX, CRYPTO),
], 'Lung: cryptococcosis — capsule ติด mucicarmine เป็นสีชมพูแดง (ย้อมอื่น: PAS; India ink ใน CSF)',
   img='crypto_muci', stem='ชิ้นเนื้อปอด', years=(2565,), src='สไลด์ 46')
station('s-mucor-gms', 'lab-new', [
    part(DESCRIBE, ['Broad, non-septate hyphae with right angle branching'],
         kw=[['nonseptate', 'aseptate', 'pauciseptate', 'no septa', 'without septa'],
             ['broad', 'wide', 'ribbon', 'irregular'],
             ['right angle', '90 degree', 'perpendicular', 'มุมฉาก']]),
    part(DX, MUCOR),
], 'GMS: broad non-septate hyphae with right angle branching (ลูกศร) = Mucor spp. — เทียบกับ Aspergillus ที่ septate '
   'และแตกแขนงมุมแหลม',
   img='mucor_gms2', stem='ย้อม GMS', years=(2563,), src='สไลด์ 42')
station('s-entero-appendix', 'lab-new', [
    part(DX, ENTERO),
    part('พยาธินี้มีชื่อสามัญว่าอะไร', ['Pinworm', 'Pin worm', 'Threadworm', 'Thread worm', 'พยาธิเข็มหมุด']),
], 'Enterobius vermicularis ในไส้ติ่ง (กรอบสีเหลือง) — อาจพบร่วมกับไส้ติ่งอักเสบ ตัดขวางเห็น bilateral alae',
   img='entero_appendix', stem='ไส้ติ่งที่ผ่าตัดออก — ดูสิ่งที่อยู่ในกรอบสีเหลือง', years=(2563,), src='สไลด์ 72–73')
