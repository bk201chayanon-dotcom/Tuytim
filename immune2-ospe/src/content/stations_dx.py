# -*- coding: utf-8 -*-
"""Topic 2 — Infectious immunodiagnosis (handout "Infectious Immunodiag 69").

The old papers (2562, 2563, 2565; อ.ทศพล) asked only about syphilis: the stage
from a clinical picture, which tests are treponemal, and how to read a pair of
results. Handout material no paper has used yet sits in "คาดว่าอาจออกปีนี้":
other stage pictures, the rapid test, the antibody graph, prozone, window period,
direct tests and neurosyphilis. Hepatitis B/C never appeared and has its own
category. `src` gives the handout page.
"""

CARDS = []


def station(id, cat, parts, explain, img=None, stem='', years=(), seen=None, src=None, report=None, group=None):
    CARDS.append({'id': id, 'category': cat, 'question': stem, 'parts': parts, 'explain': explain,
                  'images': [img] if isinstance(img, str) else list(img or []),
                  'years': list(years), 'seen': seen, 'src': src, 'report': report, 'group': group})


def part(q, answers, kw=None):
    return {'q': q, 'answers': answers, 'keywords': kw}


def slip(rows, note=None, title='Serology'):
    return {'title': title, 'rows': rows, 'note': note}


R, NR = 'Reactive', 'Nonreactive'
STAGE = 'จงบอกระยะของซิฟิลิส (primary, secondary, tertiary, congenital)'
SYPH_YEARS = (2562, 2563, 2565)

PRIM = ['Primary syphilis', 'Primary', 'Primary stage', 'Primary stage syphilis', 'Syphilis primary stage']
SEC = ['Secondary syphilis', 'Secondary', 'Secondary stage', 'Secondary stage syphilis', 'Syphilis secondary stage']
TERT = ['Tertiary syphilis', 'Tertiary', 'Tertiary stage', 'Tertiary stage syphilis', 'Gummatous syphilis',
        'Late benign syphilis']
CONG_EARLY = ['Congenital syphilis', 'Early congenital syphilis', 'Congenital', 'ซิฟิลิสแต่กำเนิด']
CONG_LATE = ['Congenital syphilis', 'Late congenital syphilis', 'Congenital', 'ซิฟิลิสแต่กำเนิด']
NTT = ['Nontreponemal test', 'Nontreponemal', 'Non-treponema test', 'Nontreponemal serologic test', 'NTT']
TT = ['Treponemal test', 'Treponemal', 'Treponema test', 'Antitreponemal test', 'Treponemal serologic test', 'TT']
BFP = ['Biological false positive', 'Biologic false positive', 'BFP', 'False positive', 'False positive nontreponemal test',
       'False positive RPR', 'False positive VDRL', 'Biological false positive reaction']
BFP_CAUSE = ['SLE', 'Systemic lupus erythematosus', 'Lupus', 'Autoimmune disease', 'Autoimmune diseases',
             'Hypergammaglobulinemia', 'Leprosy', 'Malaria', 'Hepatitis', 'Infectious mononucleosis', 'Viral infection',
             'Pregnancy', 'Acute illness', 'Other treponemal diseases', 'ตั้งครรภ์']
TREATED = ['Prior treated syphilis', 'Previously treated syphilis', 'Treated syphilis', 'Past treated syphilis',
           'Cured syphilis', 'Past syphilis', 'Old treated syphilis', 'Past infection',
           'Syphilis (past or present)', 'Past or present syphilis']

# ================================================================== บอกระยะจากภาพ (ทุกปีที่มีบันทึก)

station('s-stage-chancre', 'syph-stage', [
    part(STAGE, PRIM),
    part('จงบอกชื่อรอยโรค', ['Chancre', 'Hard chancre', 'Syphilitic chancre', 'Painless ulcer']),
], 'ภาพจากข้อสอบปี 65 (ข้อ 1.1 เฉลย Primary syphilis) — chancre: painless papule กลายเป็น clean-based ulcer '
   'หายเองใน 3–6 สัปดาห์ ร่วมกับต่อมน้ำเหลืองขาหนีบโต',
   img='x_chancre_penis', years=SYPH_YEARS, seen=2565, src='หน้า 1 · ข้อสอบปี 65')

station('s-stage-chancre-palms', 'syph-stage', [
    part(STAGE + ' — ภาพ ก', PRIM),
    part(STAGE + ' — ภาพ ข', SEC),
], 'ภาพ ก: chancre ที่ถุงอัณฑะ = primary · ภาพ ข: ham-colored palmar macules = secondary (ผื่นที่ลำตัว แขนขา ฝ่ามือ ฝ่าเท้า '
   'ขึ้น 2 สัปดาห์–6 เดือนหลัง chancre หาย)',
   img=['syph_chancre', 'syph_palms'], years=SYPH_YEARS, src='หน้า 1–3')

station('s-stage-palms', 'syph-stage', [part(STAGE, SEC)],
        'ภาพจากข้อสอบปี 65 (ข้อ 2.1 เฉลย Secondary syphilis) — ผื่นเป็นขุยที่ฝ่ามือทั้งสองข้าง',
        img='x_palms', years=SYPH_YEARS, seen=2565, src='ข้อสอบปี 65')

station('s-stage-alopecia', 'syph-stage', [
    part(STAGE, SEC),
    part('จงบอกชื่อรอยโรค', ['Alopecia', 'Moth-eaten alopecia', 'Syphilitic alopecia', 'Patchy alopecia', 'ผมร่วง']),
], 'ภาพจากข้อสอบปี 65 (ข้อ 2.2 เฉลย Secondary syphilis) — ผมร่วงเป็นหย่อม ๆ แบบ moth-eaten · handout: secondary syphilis '
   'มี generalized lymphadenopathy, fever, malaise, pharyngitis, alopecia, arthralgia',
   img='x_alopecia', years=SYPH_YEARS, seen=2565, src='หน้า 1 · ข้อสอบปี 65')

station('s-stage-63', 'syph-stage', [
    part(STAGE + ' — ภาพ ก', SEC),
    part(STAGE + ' — ภาพ ข', TERT),
], 'ข้อสอบปี 63 (ภาพคล้ายกัน): ก. mucous patch ที่ริมฝีปาก = Secondary · ข. gumma ที่หน้าผาก = Tertiary '
   '(gumma = granulomatous inflammation ทำลายเนื้อเยื่อ เกิดได้ทุกอวัยวะ)',
   img=['syph_mpatch_lip', 'x_gumma_forehead'], years=SYPH_YEARS, seen=2563, src='หน้า 1–4 · ข้อสอบปี 63')

station('s-stage-62', 'syph-stage', [
    part(STAGE + ' — ภาพ ก', SEC),
    part(STAGE + ' — ภาพ ข', TERT),
], 'ข้อสอบปี 62 ถามแบบเดียวกัน: ผื่นแดงรูปไข่มีขุยทั่วลำตัว = Secondary · รอยโรคทำลายเนื้อเยื่อจมูกในผู้สูงอายุ (gumma) = Tertiary',
   img=['x_trunk', 'syph_gumma'], years=SYPH_YEARS, seen=2562, src='หน้า 2–4 · ข้อสอบปี 62')

station('s-stage-clata', 'syph-stage', [
    part('จงบอกชื่อรอยโรค', ['Condyloma lata', 'Condylomata lata', 'Condyloma latum']),
    part(STAGE, SEC),
], 'Condylomata lata รอบทวารหนัก: ก้อนนูนแบน ผิวเรียบชื้น เต็มไปด้วยเชื้อ = secondary syphilis — ต่างจาก condyloma acuminata '
   '(HPV) ที่ขรุขระคล้ายดอกกะหล่ำ · ข้อสอบปี 65 ข้อ 1.2 เป็นรอยโรครอบทวารหนัก เฉลย Secondary',
   img='syph_clata_perianal', years=SYPH_YEARS, src='หน้า 3')

station('s-stage-congenital', 'syph-stage', [
    part(STAGE + ' — ภาพ ก (ทารกอายุ 1 เดือน)', CONG_EARLY),
    part(STAGE + ' — ภาพ ข', CONG_LATE),
    part('ความผิดปกติของฟันในภาพ ข เรียกว่าอะไร', ['Hutchinson teeth', "Hutchinson's teeth", 'Hutchinsonian teeth',
                                                  'Hutchinson incisors', 'Notched incisors', 'Notched central incisors']),
], 'Early congenital (< 2 ปี): ผื่นทั่วตัว rhinitis ตับอักเสบ · Late congenital (> 2 ปี): Hutchinson triad — '
   'notched central incisors, interstitial keratitis, eighth nerve deafness',
   img=['syph_infant', 'syph_hutch'], years=SYPH_YEARS, src='หน้า 6–7')

station('s-stage-saddle', 'syph-stage', [
    part(STAGE, CONG_EARLY),
    part('ความผิดปกติของจมูกในภาพเรียกว่าอะไร', ['Saddle nose', 'Saddle nose deformity']),
], 'Saddle nose ในทารกที่ติดเชื้อจากมารดาผ่านรก — เกิดจาก osteochondritis ของกระดูกอ่อนจมูก',
   img='syph_saddle', years=SYPH_YEARS, src='หน้า 6–7')

# ================================================================== แปลผลการตรวจซิฟิลิส

station('s-sero-classify', 'syph-sero', [
    part('Rapid plasma reagin (RPR)', NTT),
    part('Venereal Disease Research Laboratory (VDRL)', NTT),
    part('Treponema pallidum hemagglutination (TPHA)', TT),
    part('Fluorescent treponemal antibody absorption (FTA-ABS)', TT),
], 'เฉลยข้อสอบปี 63 — Nontreponemal: RPR, VDRL (ตรวจแอนติบอดีต่อ cardiolipin) · Treponemal: TPHA, TPPA, FTA-ABS, '
   'EIA/CLIA และ rapid test (ตรวจแอนติบอดีต่อ T. pallidum)',
   stem='จงบอกว่าการตรวจต่อไปนี้เป็น nontreponemal test หรือ treponemal test',
   years=SYPH_YEARS, seen=2563, src='หน้า 8–9')

station('s-sero-reverse-past', 'syph-sero', [
    part('จงแปลผล', ['Syphilis (past or present)', 'Past or present syphilis', 'Past or current syphilis',
                     'Previous or current syphilis', 'Past syphilis', 'Previously treated syphilis', 'Prior treated syphilis',
                     'Treated or untreated latent syphilis', 'Latent syphilis']),
    part('จงบอกสาเหตุที่ทำให้เกิดผลข้างต้น (1 อย่าง)',
         ['Cured syphilis', 'Treated syphilis', 'Previously treated syphilis', 'Prior treatment', 'Treated', 'Cured',
          'Late latent syphilis', 'Latent syphilis', 'Late syphilis', 'Early primary syphilis']),
], 'เฉลยข้อสอบปี 65: ก. Syphilis (past or present) ข. Cured syphilis — treponemal antibody ยังตรวจพบได้หลังหาย ส่วน NTT '
   'ลดลงจนเป็นลบหลังรักษา · สาเหตุอื่น: late/late latent syphilis (NTT ลดลงเอง) หรือ primary ระยะแรกมาก · ถ้าไม่ทราบประวัติ '
   'อาจให้การรักษาแบบซิฟิลิสระยะแฝง',
   report=slip([['EIA (treponemal)', R], ['RPR', NR], ['TP-PA', R]], 'ตรวจคัดกรองแบบ reverse sequence algorithm'),
   years=SYPH_YEARS, seen=2565, src='หน้า 9, 12', group='sero-past')

station('s-sero-treated', 'syph-sero', [part('จงแปลผล', TREATED)],
        'เฉลยข้อสอบปี 62, 63: Prior treated syphilis — NTT nonreactive + TT reactive ในผู้ที่เคยรักษาครบ (TT ยังบวกต่อหลังหาย)',
        report=slip([['RPR', NR], ['TPHA', R]], 'ชาย 45 ปี เคยรักษาซิฟิลิสครบเมื่อ 5 ปีก่อน'),
        years=SYPH_YEARS, seen=2563, src='หน้า 9, 12–14', group='sero-past')

station('s-sero-bfp', 'syph-sero', [
    part('จงแปลผล', BFP),
    part('จงยกตัวอย่างโรคหรือภาวะที่ทำให้เกิดผลนี้ (1 อย่าง)', BFP_CAUSE),
], 'เฉลยข้อสอบปี 62, 63: False positive nontreponemal test — พบใน SLE, autoimmune diseases, hypergammaglobulinemia, leprosy, '
   'acute illness เช่น malaria, hepatitis, infectious mononucleosis, การติดเชื้อไวรัส, การตั้งครรภ์',
   report=slip([['RPR', 'Reactive 1:2'], ['TPPA', NR]], 'หญิง 30 ปี ตรวจก่อนผ่าตัด ไม่มีอาการ'),
   years=SYPH_YEARS, seen=2563, src='หน้า 9, 11', group='sero-bfp')

station('s-sero-read-62', 'syph-sero', [
    part('ภาพ ก (TPPA) อ่านผลว่าอย่างไร', [NR, 'Non reactive', 'Negative']),
    part('ภาพ ข (RPR card test) อ่านผลว่าอย่างไร', [R, 'Positive']),
    part('จงแปลผล', BFP),
], 'ข้อสอบปี 62: RPR reactive + TPPA nonreactive = false positive (เช่น SLE, leprosy, malaria) — TPPA: เม็ดตกเป็นจุดกลมกลางหลุม '
   '(button) = nonreactive · RPR: ผงถ่านจับกลุ่มเป็นก้อนดำ = reactive',
   img=['x_tppa', 'x_rpr'], years=SYPH_YEARS, seen=2562, src='หน้า 8 · ข้อสอบปี 62', group='sero-bfp')

station('s-sero-read-lab', 'syph-sero', [
    part('RPR (ภาพ ก) วง A', [R, 'Positive']),
    part('RPR (ภาพ ก) วง B', [NR, 'Negative']),
    part('TPHA (ภาพ ข) หลุม A', [R, 'Positive']),
    part('TPHA (ภาพ ข) หลุม B', [NR, 'Negative']),
], 'RPR: reactive = ผงถ่านจับกลุ่มเป็นก้อนดำ; nonreactive = ผงถ่านรวมเป็นจุดหรือขีดกลางวง · TPHA: mat (เม็ดเลือดแดงปูทั่วก้นหลุม) '
   '= reactive; button (จุดกลมกลางหลุม) = nonreactive',
   img=['lab_rpr_qual', 'lab_tpha'], stem='จงอ่านผล (reactive หรือ nonreactive)', years=SYPH_YEARS, src='หน้า 8')

station('s-sero-early', 'syph-sero', [
    part('ทำไมตอนแรกจึงตรวจ RPR ไม่ขึ้น', ['Early primary syphilis', 'Early syphilis', 'Primary syphilis',
                                         'Early infection', 'Window period', 'Antibody not yet detectable']),
], 'เฉลยข้อสอบปี 65: early or primary syphilis — NTT เริ่มบวก 1–4 สัปดาห์หลังเกิด chancre จึงอาจยังเป็นลบช่วงแรก '
   '(ต่างจาก prozone ที่พบใน secondary syphilis ซึ่ง titer สูงมากจนซีรัมที่ไม่เจือจางไม่จับกลุ่ม)',
   report=slip([['RPR ครั้งแรก (วันที่มาด้วยแผลที่อวัยวะเพศ)', NR], ['RPR ครั้งที่ 2 (3 สัปดาห์ต่อมา)', 'Reactive 1:16']]),
   years=SYPH_YEARS, seen=2565, src='หน้า 9', group='sero-early')

station('s-sero-followup', 'syph-sero', [
    part('รักษาแล้วแต่ RPR ไม่ลดลง จงบอกสาเหตุ 1 อย่าง', ['Serofast', 'Serofast state', 'Serofast reaction', 'Reinfection',
                                                       'Treatment failure', 'Failed treatment', 'Inadequate treatment']),
    part('จงบอกชื่อการตรวจที่ใช้ follow up syphilis (ตอบย่อได้)', ['RPR', 'VDRL', 'Nontreponemal test', 'Quantitative RPR',
                                                                  'RPR titer', 'Rapid plasma reagin', 'Quantitative nontreponemal test']),
], 'เฉลยข้อสอบปี 65: serofast, reinfection, treatment failure / RPR — ถือว่ารักษาได้ผลเมื่อ titer ลดลง ≥ 4 เท่าใน 6–12 เดือน '
   '· ถ้า titer ยัง reactive หลังรักษาควรตรวจ HIV และพิจารณาตรวจ CSF หา neurosyphilis',
   report=slip([['RPR ก่อนรักษา', 'Reactive 1:16'], ['RPR 12 เดือนหลังรักษา', 'Reactive 1:16']], 'Secondary syphilis รักษาด้วย benzathine penicillin G'),
   years=SYPH_YEARS, seen=2565, src='หน้า 14')

station('s-sero-titer', 'syph-sero', [
    part('titer ของผู้ป่วยรายนี้คือเท่าใด', ['1:8', '1/8']),
    part('หลังรักษา titer ต้องลดลงอย่างน้อยกี่เท่าจึงถือว่ารักษาได้ผล', ['4 fold', '4-fold', 'Fourfold', 'Four fold', '4', '4 เท่า']),
], 'Endpoint titer = dilution สูงสุดที่ยังจับกลุ่ม (1:8) · รักษาได้ผลเมื่อลดลง 4 เท่า เช่น 1:32 → 1:8',
   img='lab_rpr_titer', stem='RPR แบบ semiquantitative เจือจางซีรัม 1:2, 1:4, 1:8, 1:16 (ซ้ายไปขวา)', years=SYPH_YEARS, src='หน้า 8, 14')

station('s-sero-active', 'syph-sero', [
    part('จงแปลผล', ['Active syphilis', 'Current syphilis', 'Untreated syphilis', 'Active infection', 'Current infection',
                     'Syphilis infection', 'Syphilis']),
], 'NTT reactive + TT reactive = syphilis ที่ยัง active (หรือเพิ่งรักษาที่ titer ยังไม่ลด) — titer สูงเข้ากับ secondary syphilis',
   report=slip([['RPR', 'Reactive 1:128'], ['TPHA', R]], 'ชาย 24 ปี มีผื่นที่ลำตัวและฝ่ามือ'),
   years=SYPH_YEARS, src='หน้า 11, 13–14')

station('s-sero-unlikely', 'syph-sero', [
    part('จงแปลผล', ['Syphilis unlikely', 'Not syphilis', 'No syphilis', 'False positive EIA', 'False positive treponemal test',
                     'False positive initial treponemal test']),
], 'Reverse algorithm: TT ตัวแรก reactive แต่ RPR และ TT ตัวที่สอง nonreactive = syphilis unlikely (ผลบวกปลอมของ TT ตัวแรก)',
   report=slip([['EIA (treponemal)', R], ['RPR', NR], ['TP-PA', NR]], 'ตรวจคัดกรองแบบ reverse sequence algorithm ไม่มีอาการ ไม่มีความเสี่ยง'),
   years=SYPH_YEARS, src='หน้า 12')

# ================================================================== คาดว่าอาจออกปีนี้

station('s-stage-cvs', 'syph-new', [
    part('จงวินิจฉัย', ['Syphilitic aortitis', 'Syphilitic aortitis with aneurysm', 'Syphilitic aortic aneurysm',
                        'Syphilitic aneurysm', 'Cardiovascular syphilis', 'Luetic aortitis']),
    part(STAGE, TERT),
    part('ภาวะแทรกซ้อนต่อลิ้นหัวใจที่พบได้คืออะไร', ['Aortic regurgitation', 'Aortic insufficiency', 'AR',
                                                  'Aortic valve incompetence', 'Aortic incompetence']),
], 'Tertiary (cardiovascular) syphilis: syphilitic aortitis with aneurysm → aortic regurgitation · intima ย่น '
   '(wrinkling, tree-bark) ทั้งที่ไม่มี atherosclerosis',
   img='syph_aortitis', stem='aorta ของผู้ป่วยที่มีประวัติซิฟิลิสมานาน', years=SYPH_YEARS, src='หน้า 2, 5')

station('s-stage-clata-abc', 'syph-new', [
    part('จงบอกชื่อรอยโรค', ['Condyloma lata', 'Condylomata lata', 'Condyloma latum']),
    part(STAGE, SEC),
], 'Condylomata lata: ตุ่มแบน ผิวถลอก เรียบ สีชมพูขาว ที่หน้าอก (A) สะดือ (B) และข้อพับเข่า (C) = secondary syphilis',
   img='syph_clata_abc', years=SYPH_YEARS, src='หน้า 3')

station('s-stage-tongue', 'syph-new', [
    part('จงบอกชื่อรอยโรคที่ลิ้น', ['Mucous patch', 'Mucous patches', 'Mucous patch of secondary syphilis']),
    part(STAGE, SEC),
], 'Mucous patch: พบได้ถึง 1/3 ของผู้ป่วย secondary syphilis — ภาพที่ริมฝีปากเคยออกปี 63',
   img='syph_tongue', years=SYPH_YEARS, src='หน้า 1, 4')

station('s-sero-rdt', 'syph-new', [
    part('ตลับใดอ่านผลเป็น reactive (ตอบหมายเลข)', ['1', 'ตลับที่ 1', 'ตลับ 1', 'Cassette 1', 'No 1', 'Number 1']),
    part('ตลับที่ 3 อ่านผลว่าอย่างไร', [NR, 'Non reactive', 'Negative']),
    part('แถบที่ตำแหน่ง C มีหน้าที่อะไร', ['Control line', 'Control', 'Control band', 'เส้นควบคุม']),
    part('rapid test นี้จัดเป็น treponemal หรือ nontreponemal test', TT),
], 'ตลับ 1 มีแถบทั้ง C (control) และ B (test) = reactive · ตลับ 2 และ 3 มีแถบ C อย่างเดียว = nonreactive · '
   'ถ้าแถบ C ไม่ขึ้นผลใช้ไม่ได้ (invalid) · rapid diagnostic test จัดอยู่ในกลุ่ม treponemal test',
   img='lab_rdt', stem='Rapid test สำหรับซิฟิลิส 3 ตลับ', src='หน้า 8')

station('s-sero-graph', 'syph-new', [
    part('เส้น A คือแอนติบอดีชนิดใด', ['Treponemal IgM', 'Treponemal IgM antibody', 'IgM treponemal', 'IgM']),
    part('เส้น B คือแอนติบอดีชนิดใด', ['Treponemal IgG', 'Treponemal IgG antibody', 'IgG treponemal', 'Treponemal antibody',
                                     'Treponemal']),
    part('เส้น C และ D คือแอนติบอดีกลุ่มใด', ['Nontreponemal antibodies', 'Nontreponemal antibody', 'Nontreponemal',
                                            'Nontreponemal IgM and IgG', 'Reagin', 'Anticardiolipin antibodies']),
    part('เส้นใด (C หรือ D) เป็นของผู้ป่วยที่ได้รับการรักษาแล้ว', ['D', 'เส้น D', 'Line D']),
], 'Treponemal IgM (A) ขึ้นเร็วแล้วหายไป · treponemal IgG (B) คงที่ราว 100% นานถึง 20 ปี จึงยังบวกหลังรักษาหาย · '
   'nontreponemal: C = ไม่ได้รักษา รักษาล้มเหลว หรือติดเชื้อซ้ำ, D = รักษาแล้ว titer ลดลง จึงใช้ติดตามผลการรักษา',
   img='graph_syph', stem='กราฟร้อยละของผู้ป่วยที่ตรวจพบแอนติบอดีตามเวลาหลังติดเชื้อซิฟิลิส', src='หน้า 10')

station('s-sero-prozone', 'syph-new', [
    part('ผลที่ไม่สอดคล้องกับอาการของผู้ป่วยรายนี้เกิดจากปรากฏการณ์ใด', ['Prozone phenomenon', 'Prozone', 'Prozone effect',
                                                                      'Prozone reaction']),
    part('ควรแก้ไขอย่างไร', ['Dilute the serum and repeat the RPR'],
         kw=[['dilute', 'dilution', 'diluted', 'diluting', 'เจือจาง']]),
], 'Secondary syphilis มีแอนติบอดีปริมาณมากเกิน (prozone phenomenon) ซีรัมที่ไม่เจือจางจึงไม่จับกลุ่ม → เจือจางซีรัมแล้วทดสอบใหม่',
   report=slip([['RPR (qualitative, undiluted serum)', NR], ['TPHA', R]],
               'ชาย 26 ปี มีผื่นทั่วตัว ฝ่ามือ ฝ่าเท้า และ condyloma lata รอบทวารหนัก'),
   src='หน้า 13')

station('s-sero-window', 'syph-new', [
    part('ขั้นตอนต่อไปที่เหมาะสมคืออะไร', ['Repeat test in 2 weeks', 'Repeat in 2 weeks', 'Retest in 2 weeks',
                                          'Repeat after 2 weeks', 'Repeat test after 2 weeks', 'Repeat serology in 2 weeks',
                                          'ตรวจซ้ำใน 2 สัปดาห์', 'เจาะเลือดตรวจซ้ำ 2 สัปดาห์']),
], 'หมายเหตุ reverse algorithm ข้อ 1: เสี่ยงมาไม่นานและตรวจไม่พบแอนติบอดี ให้เจาะเลือดตรวจซ้ำ 2 สัปดาห์หลังครั้งแรก — '
   'อาจยังอยู่ในระยะฟักตัวหรือ primary ช่วงแรกที่ยังไม่สร้างแอนติบอดี',
   report=slip([['EIA (treponemal)', NR], ['RPR', NR]], 'ชาย 22 ปี มีเพศสัมพันธ์ไม่ป้องกันเมื่อ 1 สัปดาห์ก่อน ไม่มีอาการ'),
   src='หน้า 12–13', group='sero-early')

station('s-sero-dfa', 'syph-new', [
    part('การตรวจในภาพนี้คือการตรวจชนิดใด', ['Direct fluorescent antibody test', 'Direct fluorescent antibody', 'DFA', 'DFA-TP',
                                            'Direct immunofluorescence', 'Immunofluorescence']),
    part('เชื้อที่เรืองแสงสีเขียวคืออะไร', ['Treponema pallidum', 'T. pallidum', 'Treponema', 'Spirochete', 'Spirochetes']),
    part('การตรวจหาตัวเชื้อโดยตรง (direct test) อีก 1 วิธี', ['Dark field microscopy', 'Darkfield microscopy', 'Dark field',
                                                            'Darkfield', 'Immunohistochemistry', 'IHC', 'NAAT',
                                                            'Nucleic acid amplification test', 'PCR']),
], 'Direct tests ตรวจหาตัวเชื้อ แอนติเจน หรือสารพันธุกรรมจากรอยโรค: dark field microscopy, DFA-TP, immunohistochemistry, '
   'NAAT — ต่างจาก serologic tests ที่ตรวจแอนติบอดี',
   img='syph_dfa', stem='สิ่งส่งตรวจจาก mucous patch ส่องด้วยกล้อง fluorescence', src='หน้า 4, 8')

station('s-sero-neuro', 'syph-new', [
    part('ควรตรวจน้ำไขสันหลังด้วยการตรวจใดเพื่อช่วยวินิจฉัย neurosyphilis', ['CSF-VDRL', 'VDRL', 'Reactive CSF-VDRL',
                                                                          'VDRL in CSF', 'CSF VDRL test']),
    part('Neurosyphilis เกิดได้ในระยะใดของโรคซิฟิลิส', ['All stages', 'Any stage', 'Every stage', 'ทุกระยะ']),
], 'วินิจฉัย neurosyphilis จาก CSF (cell count, protein, reactive CSF-VDRL) ร่วมกับ serology ที่ reactive และอาการทางระบบประสาท · '
   'ข้อบ่งชี้เจาะ CSF: อาการ neuro-, ocular- หรือ otosyphilis, tertiary syphilis, treatment failure',
   report=slip([['RPR', 'Reactive 1:32'], ['TPHA', R]], 'ชาย 58 ปี ไม่เคยรักษาซิฟิลิส เดินเซ ปวดแปลบที่ขา ตอบสนองต่อแสงผิดปกติ'),
   src='หน้า 15')

# ================================================================== ไวรัสตับอักเสบ บี/ซี (ยังไม่เคยออก)

def hep(id, answers, explain, rows, note, src):
    station(id, 'hep', [part('จงแปลผล', answers)], explain, report=slip(rows, note), src=src)


hep('hbv-acute', ['Acute HBV infection', 'Acute hepatitis B', 'Acute infection', 'Acute hepatitis B infection', 'Acute HBV'],
    'HBsAg + และ IgM anti-HBc + = ติดเชื้อเฉียบพลัน',
    [['HBsAg', 'Positive'], ['IgM anti-HBc', 'Positive'], ['Anti-HBs', 'Negative']], 'ชาย 30 ปี ตัวเหลือง ALT สูงมาก 2 สัปดาห์', 'หน้า 16')
hep('hbv-chronic', ['Chronic HBV infection', 'Chronic hepatitis B', 'Chronic infection', 'Chronic hepatitis B infection', 'Chronic HBV'],
    'HBsAg + / anti-HBc + / IgM anti-HBc − / anti-HBs − (HBsAg นานเกิน 6 เดือน) = ติดเชื้อเรื้อรัง',
    [['HBsAg', 'Positive'], ['Anti-HBc (total)', 'Positive'], ['IgM anti-HBc', 'Negative'], ['Anti-HBs', 'Negative']],
    'หญิง 45 ปี HBsAg positive ตั้งแต่ 3 ปีก่อน', 'หน้า 16–17')
hep('hbv-recovered', ['Recovered from past infection and immune', 'Recovered with immunity', 'Recovered', 'Resolved infection',
                      'Past infection immune', 'Past infection', 'Immune due to natural infection', 'Natural immunity'],
    'HBsAg − / anti-HBc + / anti-HBs + = ฟื้นตัวจากการติดเชื้อและมีภูมิคุ้มกัน',
    [['HBsAg', 'Negative'], ['Anti-HBc (total)', 'Positive'], ['Anti-HBs', 'Positive']], 'ชาย 52 ปี เคยตัวเหลืองตอนเด็ก', 'หน้า 16–17')
hep('hbv-vaccinated', ['Immune due to vaccination', 'Vaccinated', 'Vaccine immunity', 'Immune from vaccination',
                       'Immune after vaccination'],
    'HBsAg − / anti-HBc − / anti-HBs ≥ 10 mIU/mL = มีภูมิจากวัคซีน (วัคซีนมีแต่ HBsAg จึงไม่เกิด anti-HBc)',
    [['HBsAg', 'Negative'], ['Anti-HBc (total)', 'Negative'], ['Anti-HBs', 'Positive (85 mIU/mL)']], 'ได้วัคซีนตับอักเสบบีครบ 3 เข็ม', 'หน้า 17')
hep('hbv-susceptible', ['Never infected susceptible', 'Susceptible', 'Never infected', 'Not immune', 'Never infected and susceptible'],
    'ทุก marker เป็นลบ = ไม่เคยติดเชื้อและไม่มีภูมิ ควรได้วัคซีน',
    [['HBsAg', 'Negative'], ['Anti-HBc (total)', 'Negative'], ['Anti-HBs', 'Negative']], 'หญิง 20 ปี ไม่เคยได้วัคซีน', 'หน้า 16–17')
hep('hbv-window-case', ['Window period', 'Core window period', 'Core window', 'Window phase', 'Resolving acute HBV infection'],
    'HBsAg หายแล้วแต่ยังไม่มี anti-HBs ขณะที่ IgM anti-HBc ยังบวก = core window period',
    [['HBsAg', 'Negative'], ['IgM anti-HBc', 'Positive'], ['Anti-HBs', 'Negative']], 'ตับอักเสบเฉียบพลันเมื่อ 4 เดือนก่อน อาการดีขึ้นแล้ว', 'หน้า 16')
hep('hcv-resolved', ['Resolved HCV infection', 'Resolved infection', 'Past infection', 'Past HCV infection', 'Cleared infection',
                     'Spontaneous clearance', 'Recovered'],
    'Anti-HCV + แต่ HCV RNA ตรวจไม่พบซ้ำ = เคยติดเชื้อและหายแล้ว',
    [['Anti-HCV', R], ['HCV RNA', 'Not detected']], 'ตรวจซ้ำ 2 ครั้งห่างกัน 6 เดือน ผลเหมือนเดิม', 'หน้า 15')
hep('hcv-chronic', ['Chronic HCV infection', 'Chronic hepatitis C', 'Chronic infection', 'Chronic HCV'],
    'Anti-HCV + และ HCV RNA + ต่อเนื่องนานกว่า 6 เดือน = chronic HCV infection',
    [['Anti-HCV', R], ['HCV RNA', 'Detected (2.1 × 10⁶ IU/mL)']], 'anti-HCV reactive มานานกว่า 1 ปี', 'หน้า 15')

HBSAG = ['HBsAg', 'Hepatitis B surface antigen', 'Surface antigen']
IGM_HBC = ['IgM anti-HBc', 'Anti-HBc IgM', 'IgM HBc', 'IgM antibody to HBcAg']
TOTAL_HBC = ['Total anti-HBc', 'Anti-HBc', 'Anti-HBc total', 'IgG anti-HBc', 'Anti-HBc IgG']

station('s-hbv-graph-acute', 'hep', [
    part('เส้น A คือ marker ใด', HBSAG), part('เส้น B คือ marker ใด', IGM_HBC),
    part('เส้น C คือ marker ใด', TOTAL_HBC),
    part('เส้น D คือ marker ใด', ['Anti-HBs', 'HBsAb', 'HBs antibody', 'Antibody to HBsAg', 'Anti-HBsAg']),
], 'HBsAg (A) ขึ้นก่อนและหายไปในรายที่หาย · IgM anti-HBc (B) ขึ้นช่วงมีอาการแล้วหายไป · total anti-HBc (C) คงอยู่ตลอด '
   '(บอกว่าเคยติดเชื้อ วัคซีนไม่ทำให้เกิด) · anti-HBs (D) ขึ้นหลัง HBsAg หาย = หายและมีภูมิ · ช่วงที่ไม่พบทั้ง A และ D = window period',
   img='graph_hbv_acute', stem='กราฟการติดเชื้อ HBV เฉียบพลันที่หายเอง', src='หน้า 15')
station('s-hbv-graph-chronic', 'hep', [
    part('เส้น A คือ marker ใด', HBSAG), part('เส้น B คือ marker ใด', TOTAL_HBC),
    part('เส้น C ที่ขึ้นช่วงแรกแล้วกลับมามียอดแหลมเป็นพัก ๆ คือ marker ใด', IGM_HBC),
], 'Chronic HBV: HBsAg (A) คงอยู่เกิน 6 เดือน · total anti-HBc (B) บวกตลอด · IgM anti-HBc (C) กลับมาในช่วง flare '
   'จึงไม่ได้พบเฉพาะ acute infection',
   img='graph_hbv_chronic', stem='กราฟ chronic HBV infection', src='หน้า 15')
station('s-hcv-graph', 'hep', [
    part('เส้น A คือ marker ใด', ['HCV RNA', 'RNA', 'HCV viral load']),
    part('เส้น B คือ marker ใด', ['HCV Ag', 'HCV antigen', 'HCV core antigen', 'HCV core Ag', 'Core antigen']),
    part('เส้น C คือ marker ใด', ['Anti-HCV', 'HCV antibody', 'Antibody to HCV']),
    part('ช่วงที่พบ HCV RNA แต่ยังไม่พบ anti-HCV เรียกว่าอะไร', ['Serological window', 'Serologic window', 'Window period',
                                                               'Seronegative window']),
], 'HCV RNA (A) พบเร็วที่สุดหลัง eclipse phase · HCV Ag (B) ขึ้นช่วงสั้น ๆ ใน serological window · anti-HCV (C) ขึ้นราวเดือนที่ 2–3 '
   'แล้วค่อย ๆ ลดลงในรายที่หาย — ช่วง window ต้องอาศัย HCV RNA หรือ HCV Ag',
   img='graph_hcv', stem='กราฟการติดเชื้อ HCV ที่หายเองได้ (self-resolving)', src='หน้า 15')
station('hbv-isolated', 'hep', [
    part('ผลแบบนี้เรียกว่าอะไร', ['Isolated anti-HBc', 'Isolated core antibody', 'Anti-HBc alone', 'Isolated anti-HBc positive']),
    part('จงบอกสาเหตุที่เป็นไปได้ (1 อย่าง)', ['Window period', 'Core window', 'Past infection', 'Resolved infection',
                                              'False positive', 'Occult HBV infection', 'Occult HBV', 'Low level chronic infection',
                                              'Passive transfer', 'Maternal antibody', 'HBV mutant']),
], 'Isolated anti-HBc: core window period, เคยติดเชื้อและหายนานจน anti-HBs ลดลง, occult HBV infection, HBV กลายพันธุ์, '
   'maternal antibody ในเด็ก < 18–24 เดือน หรือผลบวกปลอม',
   report=slip([['HBsAg', 'Negative'], ['Anti-HBc (total)', 'Positive'], ['Anti-HBs', 'Negative']], 'ชาย 40 ปี ตรวจสุขภาพ ไม่มีอาการ'),
   src='หน้า 16–17')
