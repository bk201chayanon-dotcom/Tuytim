# -*- coding: utf-8 -*-
"""Hemato II — Pathology of Hematologic System, lab (Peerayut Sitthichaiyakul, M.D.,
Department of Pathology; handout 2567).

Stations follow the three old lab papers: MEDNU23 (2562), MEDNU24 (2563) and
MEDNU25 (2564). Topics are grouped by how often they were asked; the
"คาดว่าอาจออกปีนี้" groups hold handout material no paper has used yet.

`years`  the papers in which this topic appeared
`seen`   the paper(s) that used this very picture
`group`  stations on one topic, so a mock exam never asks the same topic twice
`src`    handout slide (two slides per page); "ข้อสอบปี 62" marks a picture from the recall
"""

CARDS = []


def station(id, cat, parts, explain, img=None, stem='', years=(), seen=None, src=None, report=None, group=None):
    CARDS.append({'id': id, 'category': cat, 'question': stem, 'parts': parts, 'explain': explain,
                  'images': [img] if isinstance(img, str) else list(img or []),
                  'years': list(years), 'seen': seen, 'src': src, 'report': report, 'group': group})


def part(q, answers, kw=None):
    return {'q': q, 'answers': answers, 'keywords': kw}


DX = 'จงให้การวินิจฉัย'
ALL3 = (2562, 2563, 2564)

# ------------------------------------------------------------------ answer lists
CML = ['Chronic myeloid leukemia', 'CML', 'Chronic myelogenous leukemia', 'Chronic myelocytic leukemia',
       'Chronic granulocytic leukemia']
T922 = ['t(9;22)', 't(9:22)', 't(9;22)(q34;q11)', 'Philadelphia chromosome', 'Ph chromosome', 'BCR-ABL', 'BCR-ABL1',
        'BCR-ABL fusion']
MM = ['Multiple myeloma', 'Plasma cell myeloma', 'Myeloma', 'MM']
PLASMA = ['Plasma cell', 'Plasma cells', 'Neoplastic plasma cells', 'B cell', 'B cells', 'B lymphocyte']
GLOB = ['Globulin', 'Globulins', 'Serum globulin', 'Gamma globulin', 'Immunoglobulin', 'M protein', 'Monoclonal protein',
        'Paraprotein', 'Total protein', 'Monoclonal immunoglobulin']
LBL = ['Lymphoblastic lymphoma', 'T-lymphoblastic lymphoma', 'T-lymphoblastic leukemia/lymphoma', 'T-lymphoblastic leukemia',
       'Precursor T-lymphoblastic lymphoma', 'T-LBL', 'T-ALL', 'Acute lymphoblastic leukemia', 'ALL',
       'T-cell acute lymphoblastic leukemia']
AML = ['Acute myeloid leukemia', 'AML', 'Acute myelogenous leukemia', 'Acute myeloblastic leukemia',
       'Acute myelocytic leukemia', 'Acute granulocytic leukemia', 'Acute non-lymphocytic leukemia', 'ANLL']
ALL = ['Acute lymphoblastic leukemia', 'ALL', 'Acute lymphocytic leukemia', 'Acute lymphoid leukemia', 'Lymphoblastic leukemia']
CLL = ['Chronic lymphocytic leukemia', 'CLL', 'Chronic lymphocytic leukemia/small lymphocytic lymphoma', 'CLL/SLL',
       'Small lymphocytic lymphoma', 'SLL']
DLBCL = ['Diffuse large B-cell lymphoma', 'DLBCL', 'Diffuse large cell lymphoma']
MCL = ['Mantle cell lymphoma', 'MCL']
MANTLE = ['Mantle zone', 'Mantle', 'Mantle layer']
GC = ['Germinal center', 'Germinal centre', 'Germinal centers']
FL = ['Follicular lymphoma', 'FL']
T1418 = ['t(14;18)', 't(14:18)', 't(14;18)(q32;q21)', 'IGH-BCL2', 'BCL2 rearrangement', 'BCL2 translocation']
CENTROCYTE = ['Centrocyte', 'Centrocytes', 'Small cleaved cell', 'Small cleaved cells']
CENTROBLAST = ['Centroblast', 'Centroblasts', 'Large noncleaved cell', 'Large noncleaved cells']
TBM = ['Tingible-body macrophage', 'Tingible-body macrophages', 'Tingible body macrophage', 'Tingible body macrophages']
KIKUCHI = ['Kikuchi lymphadenopathy', 'Kikuchi lymphadenitis', 'Kikuchi disease', 'Kikuchi-Fujimoto disease',
           'Histiocytic necrotizing lymphadenitis', 'Kikuchi']
KIMURA = ['Kimura lymphadenopathy', 'Kimura disease', "Kimura's disease", 'Kimura']
RS = ['Reed-Sternberg cell', 'Reed-Sternberg cells', 'RS cell', 'Classic Reed-Sternberg cell']
HL = ['Hodgkin lymphoma', 'Classic Hodgkin lymphoma', 'Classical Hodgkin lymphoma', "Hodgkin's lymphoma", 'Hodgkin disease',
      "Hodgkin's disease", 'HL']
MALT = ['MALT lymphoma', 'Extranodal marginal zone lymphoma', 'Extranodal marginal zone B-cell lymphoma',
        'Marginal zone lymphoma', 'MALToma']
SIZE_REF = ['Endothelial cell', 'Endothelial cells', 'Histiocyte', 'Histiocytes', 'Endothelial nucleus']
REACTIVE = ['Reactive lymphoid hyperplasia', 'Reactive follicular hyperplasia', 'Reactive lymphadenopathy',
            'Follicular hyperplasia', 'Reactive hyperplasia', 'Reactive lymph node']
SMALL = ['Small', 'Small cell', 'Small cells', 'Small lymphoid cells', 'ขนาดเล็ก', 'เล็ก']
LARGE = ['Large', 'Large cell', 'Large cells', 'Large lymphoid cells', 'ขนาดใหญ่', 'ใหญ่']
EFFACED = [['effaced', 'effacement', 'loss', 'lost', 'obliterated', 'destroyed', 'disappeared', 'diffuse', 'หายไป', 'ไม่เหลือ']]

# ================================================================== ไขกระดูก · ออกทุกปี (CML, myeloma)

station('h-cml-scan', 'bm-hot', [part(DX, CML), part('จงบอก translocation ที่พบในโรคนี้', T922)],
        'เฉลยปี 62, 63: Chronic myeloid leukemia · ปี 63, 64: t(9;22) (Philadelphia chromosome) — ไขกระดูกเต็มไปด้วย '
        'hematopoietic cells โดยเฉพาะ granulocytic cells ระยะ mature และ band form พบ myeloblasts น้อย megakaryocytes '
        'มักเล็กกว่าปกติ erythroid cells พบน้อยหรือไม่พบเลย',
        img='h_cml_scan', years=ALL3, seen=[2562, 2563], src='สไลด์ 14–16', group='cml')
station('h-mm-62', 'bm-hot', [
    part(DX, MM),
    part('เซลล์ที่เพิ่มขึ้นในภาพ originate มาจากเซลล์ใด', PLASMA),
], 'เฉลยปี 62: Multiple myeloma / plasma cell — ไขกระดูกเต็มไปด้วย plasma cells ซึ่งลักษณะเหมือน plasma cell ปกติ '
   'แต่จำนวนมากผิดปกติ',
   img='x_h_mm62', stem='หญิงไทยอายุ 70 ปี เจาะไขกระดูก', years=ALL3, seen=2562, src='สไลด์ 21–23 · ข้อสอบปี 62', group='mm')
station('h-mm-63', 'bm-hot', [
    part('พยาธิสภาพจากไขกระดูก ' + DX, MM),
    part('ผลตรวจทางห้องปฏิบัติการที่จะพบสูงได้ในโรคนี้ (albumin, globulin หรือ Hct)', GLOB),
], 'เฉลยปี 63 และ 64: globulin สูง — plasma cells จำนวนมากสร้าง immunoglobulin (monoclonal) ออกมาในเลือด',
   img='x_h_mm', years=ALL3, seen=2563, src='สไลด์ 21–23 · ข้อสอบปี 63', group='mm')

# ================================================================== ไขกระดูก · เคยออก 1 ปี

station('h-lbl', 'bm-once', [
    part('เซลล์ที่เพิ่มขึ้นในภาพคือเซลล์ใด', ['Lymphoblasts', 'Lymphoblast', 'Blasts', 'Blast cells']),
    part(DX, LBL),
], 'เฉลยปี 64: lymphoblasts ที่ย้อม TdT (เซลล์ตัวอ่อน) และ CD3 (T cell) ติด = (T-)lymphoblastic lymphoma — '
   'lymphoblasts นิวเคลียสใหญ่เกือบเต็มเซลล์ ไซโทพลาซึมน้อย ไม่มีแกรนูล',
   img='h_all_high', stem='ย้อม immunohistochemistry: TdT positive และ CD3 positive', years=(2564,), src='สไลด์ 11–13',
   group='lbl')

# ================================================================== ไขกระดูก · คาดว่าอาจออกปีนี้

station('h-bm-normal', 'bm-new', [
    part('เซลล์ที่ลูกศรสีเขียวชี้คือเซลล์ใด', ['Megakaryocyte', 'Megakaryocytes']),
    part('เซลล์ที่ลูกศรสีแดงชี้คือเซลล์กลุ่มใด', ['Erythroid cells', 'Erythroid cell', 'Erythroid precursors', 'Erythroid series',
                                             'Normoblasts', 'Normoblast', 'Erythroblasts', 'Erythroid']),
    part('เซลล์ที่ลูกศรสีเหลืองชี้คือเซลล์กลุ่มใด', ['Granulocytic cells', 'Granulocytic cell', 'Granulocytes', 'Granulocyte',
                                               'Granulocytic series', 'Myeloid cells', 'Myeloid series', 'Myelocytes']),
], 'ไขกระดูกปกติ: กระดูก (bone trabeculae) และ marrow ซึ่งมี hematopoietic elements กับ fat — hematopoietic cells 3 กลุ่ม: '
   'granulocytic cells (เหลือง), erythroid cells (แดง), megakaryocytes (เขียว)',
   img='h_bm_cells', stem='ไขกระดูกปกติ', src='สไลด์ 4–7', group='normal')
station('h-mm', 'bm-new', [
    part(DX, MM),
    part('เซลล์ที่เพิ่มขึ้นส่วนใหญ่คือเซลล์ใด', PLASMA),
    part('ผลตรวจทางห้องปฏิบัติการที่จะพบสูงได้ในโรคนี้', GLOB),
], 'ภาพในบรรยาย (ข้อสอบเก่าใช้ภาพอื่น): Multiple myeloma — plasma cells เพิ่มขึ้นเต็ม marrow ลักษณะเหมือน plasma cell ปกติ',
   img='h_mm_high', stem='ชิ้นเนื้อไขกระดูก', years=ALL3, src='สไลด์ 21–23', group='mm')
station('h-cml-high', 'bm-new', [
    part(DX, CML),
    part('เซลล์กลุ่มใดเพิ่มขึ้นมากที่สุด และส่วนใหญ่อยู่ในระยะใด', ['Granulocytic cells, mostly mature and band forms'],
         kw=[['granulocytic', 'granulocytes', 'granulocyte', 'myeloid', 'neutrophils', 'neutrophil'],
             ['mature', 'band', 'bands', 'band form', 'band forms', 'mature form', 'mature forms']]),
    part('megakaryocytes ในโรคนี้มีขนาดอย่างไรเมื่อเทียบกับปกติ', ['Small', 'Smaller', 'Smaller than normal', 'Small megakaryocytes',
                                                                 'Dwarf megakaryocytes', 'Dwarf', 'ขนาดเล็ก', 'เล็กกว่าปกติ']),
], 'CML: myeloid cells จำนวนมาก โดยเฉพาะ granulocytic cells ระยะ mature form และ band form ส่วนเซลล์ตัวอ่อน (myeloblasts, '
   'metamyelocytes) พบน้อย · megakaryocytes มักเล็กกว่าปกติ · erythroid cells พบน้อยหรือไม่พบ',
   img='h_cml_high', stem='ชิ้นเนื้อไขกระดูก (กำลังขยายสูง)', years=ALL3, src='สไลด์ 15–16', group='cml')
station('h-aml', 'bm-new', [
    part(DX, AML),
    part('เซลล์ที่เพิ่มขึ้นเต็มไขกระดูกคือเซลล์ใด', ['Myeloblasts', 'Myeloblast']),
    part('เกณฑ์การวินิจฉัย: พบเซลล์นี้มากกว่ากี่เปอร์เซ็นต์ในไขกระดูก', ['20%', '20 %', '20', 'มากกว่า 20%', 'More than 20%']),
], 'AML: myeloblasts มากกว่า 20% มักเกือบเต็ม marrow — myeloblasts เป็นเซลล์ขนาดใหญ่ นิวเคลียสใหญ่ โครมาตินติดสีจาง '
   'มี nucleoli สีชมพูขนาดเล็ก ไซโทพลาซึมปานกลางสีชมพู อาจพบแกรนูล',
   img=['h_aml_low', 'h_aml_high'], src='สไลด์ 8–10', group='aml')
station('h-all', 'bm-new', [
    part(DX, ALL),
    part('ไซโทพลาซึมของ lymphoblasts ต่างจาก myeloblasts อย่างไร', ['Scant cytoplasm without granules'],
         kw=[['scant', 'scanty', 'little', 'small amount', 'minimal', 'less', 'น้อย'],
             ['no granules', 'no granule', 'agranular', 'without granules', 'without granule', 'ไม่มีแกรนูล', 'ไม่พบแกรนูล']]),
], 'ALL: lymphoblasts จำนวนมากเต็มไขกระดูก นิวเคลียสคล้าย myeloblasts แต่ไซโทพลาซึมน้อย มักสังเกตได้ยาก และไม่พบแกรนูล',
   img=['h_all_low', 'h_all_high'], src='สไลด์ 11–13', group='lbl')
station('h-blasts', 'bm-new', [
    part('ภาพ ก เซลล์ที่เพิ่มขึ้นคือเซลล์ใด', ['Myeloblasts', 'Myeloblast']),
    part('ภาพ ข เซลล์ที่เพิ่มขึ้นคือเซลล์ใด', ['Lymphoblasts', 'Lymphoblast']),
    part(DX + 'ของภาพ ก', AML),
], 'ภาพ ก: myeloblasts ไซโทพลาซึมปานกลางสีชมพู อาจมีแกรนูล = AML · ภาพ ข: lymphoblasts ไซโทพลาซึมน้อย ไม่มีแกรนูล = ALL',
   img=['h_aml_high', 'h_all_high'], stem='ไขกระดูก 2 ราย', src='สไลด์ 10, 13', group='aml')
station('h-cll', 'bm-new', [
    part(DX, CLL),
    part('เซลล์ที่ลูกศรชี้ใช้เทียบขนาดเซลล์มะเร็ง คือเซลล์ใด', ['Endothelial cell', 'Endothelial cells', 'Endothelium']),
    part('เซลล์มะเร็งเป็นเซลล์ขนาดเล็กหรือใหญ่', SMALL),
], 'CLL: neoplastic small lymphoid cells เพิ่มขึ้นมากในไขกระดูก นิวเคลียสขนาดเท่าความกว้างของ endothelial cell (ลูกศร) '
   'โครมาตินติดสีเข้ม มองไม่เห็น nucleoli ขอบนิวเคลียสไม่เรียบ — ข้อสอบปี 62 ถามว่าใช้ cell ใดเทียบขนาด: endothelial cell',
   img='h_cll_high', stem='ชิ้นเนื้อไขกระดูก', src='สไลด์ 17–20', group='cll')

# ================================================================== ต่อมน้ำเหลือง · ออกบ่อย (2–3 ปี)

station('h-dlbcl', 'ln-hot', [
    part(DX, DLBCL),
    part('lymphoma ชนิดนี้มีเซลล์ต้นกำเนิดจากเซลล์ใด', ['Centroblast', 'Centroblasts', 'Immunoblast', 'Immunoblasts',
                                                     'Germinal center B cell', 'Germinal center B cells']),
    part('ลูกศรสีเขียวชี้เซลล์ที่ใช้เทียบขนาด คือเซลล์ใด', SIZE_REF),
], 'เฉลยปี 62, 64: DLBCL · ปี 63: เซลล์ต้นกำเนิด centroblast — lymphoma cells ขนาดใหญ่ (ลูกศรเหลือง) นิวเคลียสเท่าหรือใหญ่กว่า'
   'นิวเคลียสของ histiocyte หรือ endothelial cell (ลูกศรเขียว) · centroblasts → FL, DLBCL, Burkitt; immunoblasts → DLBCL',
   img='h_dlbcl_big', years=ALL3, seen=2562, src='สไลด์ 43–46', group='dlbcl')
station('h-mantle', 'ln-hot', [
    part('บริเวณที่ลูกศรชี้เรียกว่าอะไร', MANTLE),
    part('ยกตัวอย่าง lymphoma ที่เจริญมาจากเซลล์ในบริเวณนี้', MCL),
], 'เฉลยปี 62, 63, 64: mantle zone → mantle cell lymphoma — mantle zone คือแถบเซลล์ติดสีเข้มล้อมรอบ germinal center',
   img='x_h_mantle', years=ALL3, seen=2562, src='สไลด์ 26, 30 · ข้อสอบปี 62', group='mantle')
station('h-gc', 'ln-hot', [
    part('บริเวณที่ลูกศรชี้เรียกว่าอะไร', GC),
    part('บอก lymphoid neoplasm ที่เกิดจากเซลล์ในบริเวณนี้มา 2 ชื่อ', ['Follicular lymphoma, Burkitt lymphoma (or DLBCL)'],
         kw=[['follicular lymphoma', 'follicular', 'fl'],
             ['burkitt', 'burkitt lymphoma', 'diffuse large b cell lymphoma', 'dlbcl']]),
], 'เฉลยปี 62: follicular lymphoma · ปี 63: follicular lymphoma และ Burkitt lymphoma — germinal center มี centrocytes '
   '(→ FL), centroblasts (→ FL, DLBCL, Burkitt) และ tingible-body macrophages',
   img='x_h_gc', years=(2562, 2563), seen=2562, src='สไลด์ 26–30 · ข้อสอบปี 62', group='gc')
station('h-fl', 'ln-hot', [part(DX, FL), part('การเปลี่ยนแปลงทาง genetic ที่พบในโรคนี้', T1418)],
        'เฉลยปี 62 (virtual slide): t(14;18) — follicular lymphoma: neoplastic lymphoid follicles ติดชิดกันทั่วต่อมน้ำเหลือง '
        'mantle zone ไม่ชัด',
        img='h_fl_scan', years=(2562, 2564), seen=2562, src='สไลด์ 48–50', group='fl')
station('h-fl-cells', 'ln-hot', [
    part('เซลล์ขนาดเล็กที่ลูกศรสีเหลืองชี้คือเซลล์ใด', CENTROCYTE),
    part('เซลล์ขนาดใหญ่ที่ลูกศรสีเขียวชี้คือเซลล์ใด', CENTROBLAST),
    part(DX, FL),
], 'เฉลยปี 64: centrocyte และ centroblast — follicular lymphoma ประกอบด้วย centrocytes (เล็ก) และ centroblasts (ใหญ่) '
   'มักไม่พบ tingible-body macrophages ซึ่งต่างจาก reactive follicular hyperplasia',
   img='h_fl_high', stem='ต่อมน้ำเหลือง ตรวจพบ t(14;18)', years=(2562, 2564), src='สไลด์ 51', group='fl')
station('h-kikuchi', 'ln-hot', [
    part(DX, KIKUCHI),
    part('เป็น benign หรือ malignant', ['Benign', 'Benign lesion', 'Not malignant', 'Non-neoplastic', 'Reactive']),
], 'เฉลยปี 62: Kikuchi lymphadenitis / benign — histiocytic necrotizing lymphadenitis: หย่อมเนื้อตายสีจางกระจายทั่วต่อมน้ำเหลือง',
   img='h_kikuchi_scan', years=(2562, 2564), seen=2562, src='สไลด์ 31–32', group='kikuchi')
station('h-kikuchi-cells', 'ln-hot', [
    part('ลักษณะเด่นของ macrophages ในโรคนี้', ['Crescent-shaped nuclei (crescent macrophages)'],
         kw=[['crescent', 'crescentic', 'crescent shaped']]),
    part('ลักษณะเด่นของ lymphoid cells ในโรคนี้', ['Transformed (large) lymphoid cells'],
         kw=[['transformed', 'large', 'immunoblast', 'immunoblasts', 'ขนาดใหญ่', 'ตัวใหญ่']]),
    part('เศษที่ลูกศรชี้เรียกว่าอะไร', ['Karyorrhectic bodies', 'Karyorrhectic body', 'Karyorrhectic debris', 'Nuclear debris',
                                    'Karyorrhexis', 'Apoptotic debris', 'Apoptotic bodies']),
    part(DX, KIKUCHI),
], 'เฉลยปี 64: crescent-shaped macrophage และ transformed lymphoid cell (ตัวใหญ่) — บริเวณสีจางพบเศษนิวเคลียส '
   '(nuclear debris, karyorrhectic bodies) macrophages ที่มีนิวเคลียสรูปพระจันทร์เสี้ยว และ reactive lymphoid cells ขนาดใหญ่',
   img='h_kikuchi_high', years=(2562, 2564), src='สไลด์ 33', group='kikuchi')
station('h-hl-rs', 'ln-hot', [
    part('เซลล์ที่ลูกศรชี้คือเซลล์ใด', RS),
    part(DX, HL),
    part('เซลล์ใน background ของโรคนี้ (ยกตัวอย่าง 1 ชนิด)', ['Eosinophils', 'Eosinophil', 'Lymphocytes', 'Lymphocyte',
                                                           'Plasma cells', 'Plasma cell']),
], 'เฉลยปี 62, 64: Reed–Sternberg cell — เซลล์ใหญ่ ไซโทพลาซึมมาก 2 นิวเคลียส แต่ละนิวเคลียสมี nucleolus ขนาดใหญ่ '
   '(classic type) บน background ของ eosinophils, lymphocytes และ plasma cells',
   img='h_hl_rs', years=(2562, 2564), seen=2562, src='สไลด์ 38–40', group='hl')
station('h-met-scc', 'ln-hot', [
    part('สิ่งที่ลูกศรชี้คืออะไร', ['Keratin pearl', 'Keratin pearls', 'Squamous pearl', 'Squamous pearls']),
    part('จงวินิจฉัยโรคให้จำเพาะที่สุด', ['Metastatic squamous cell carcinoma', 'Metastatic SCC',
                                         'Metastatic squamous cell carcinoma to lymph node']),
    part('primary tumor น่าจะมาจากอวัยวะใด (colon, breast, larynx, stomach, appendix, thyroid gland)',
         ['Larynx', 'Laryngeal', 'Laryngeal carcinoma']),
], 'เฉลยปี 62: larynx · ปี 64: metastatic squamous cell carcinoma — tumor cells มี intercellular bridges สร้าง keratin '
   'รวมกันเป็น keratin pearls (ลูกศร) · ในตัวเลือกมีแต่ larynx ที่บุด้วย squamous epithelium',
   img='h_met_high', stem='ต่อมน้ำเหลืองที่คอของชายอายุ 50 ปี', years=(2562, 2564), seen=[2562, 2564], src='สไลด์ 56–58',
   group='met')
station('h-malt', 'ln-hot', [
    part(DX, MALT),
    part('เป็น low grade หรือ high grade lymphoma', ['Low grade', 'Low grade lymphoma', 'Low']),
], 'เฉลยปี 63: MALT lymphoma / low grade — extranodal marginal zone lymphoma ของ mucosa-associated lymphoid tissue: '
   'lymphoma cells แทรกผนังลำไส้ตั้งแต่ mucosa, submucosa, muscular layer จนถึง serosa',
   img='h_malt_scan', stem='virtual slide ของลำไส้', years=(2563, 2564), seen=2563, src='สไลด์ 53–55', group='malt')
station('h-starry', 'ln-hot', [
    part('บอกชื่อ lymphoid neoplasm ที่มี starry sky pattern มา 2 ชื่อ',
         ['Burkitt lymphoma, diffuse large B-cell lymphoma, lymphoblastic lymphoma'],
         kw=[['burkitt', 'burkitt lymphoma'],
             ['diffuse large b cell lymphoma', 'dlbcl', 'lymphoblastic lymphoma', 'lymphoblastic']]),
    part('"ดาว" ใน starry sky pattern คือเซลล์ใด', TBM),
], 'เฉลยปี 62: Burkitt, lymphoblastic lymphoma · ปี 63: Burkitt, DLBCL — tumor with tingible-body macrophages (starry sky): '
   'Burkitt lymphoma, DLBCL, lymphoblastic lymphoma · ภาวะ reactive ที่พบ tingible-body macrophages คือ germinal center '
   'ของ reactive lymphoid follicles',
   years=(2562, 2563), src='สไลด์ 52', group='starry')

# ================================================================== ต่อมน้ำเหลือง · เคยออก 1 ปี

station('h-kimura', 'ln-once', [
    part(DX, KIMURA),
    part('ภาพ ข พบการรวมกลุ่มของเซลล์ใดจำนวนมากใน interfollicular area', ['Eosinophils', 'Eosinophil',
                                                                       'Eosinophilic microabscess', 'Eosinophilic microabscesses']),
], 'เฉลยปี 62: Kimura lymphadenopathy — reactive follicular hyperplasia ร่วมกับ eosinophils จำนวนมากรวมกลุ่มเป็น '
   'eosinophilic microabscess ใน interfollicular area',
   img=['h_kimura_scan', 'h_kimura_eos'], years=(2562,), seen=2562, src='สไลด์ 34–36', group='kimura')
station('h-richter', 'ln-once', [
    part('Richter syndrome คือการเปลี่ยนจาก low-grade lymphoma ไปเป็น lymphoma ชนิดใด', DLBCL),
    part('ยกตัวอย่าง low-grade lymphoma ที่เปลี่ยนแปลงได้ (1 ชนิด)', ['Small lymphocytic lymphoma', 'SLL',
                                                                    'Chronic lymphocytic leukemia', 'CLL', 'CLL/SLL',
                                                                    'Marginal zone lymphoma', 'MALT lymphoma']),
], 'เฉลยปี 62: DLBCL ที่ transform มาจาก lymphoid cell ตัวเล็ก — DLBCL ส่วนใหญ่เกิดขึ้นใหม่ (de novo) แต่บางรายเปลี่ยนมาจาก '
   'low-grade lymphoma เช่น small lymphocytic lymphoma, marginal zone lymphoma',
   years=(2562,), src='สไลด์ 47', group='richter')
station('h-gc-cells', 'ln-once', [
    part('เซลล์ขนาดใหญ่ที่ลูกศรสีเขียวชี้ (large lymphoid cell) คือเซลล์ใด', CENTROBLAST),
    part('เซลล์ที่ลูกศรสีเหลืองชี้คือเซลล์ใด', CENTROCYTE),
    part('เซลล์ที่ลูกศรสีแดงชี้คือเซลล์ใด', TBM),
], 'ปี 62 ถาม "cell ใดเป็น large lymphoid cell" → centroblast — germinal center มี centrocytes (เหลือง), centroblasts (เขียว) '
   'และ tingible-body macrophages (แดง: เซลล์ใหญ่ ไซโทพลาซึมใส มีเศษนิวเคลียสอยู่ภายใน)',
   img='h_gc_cells_big', stem='germinal center ของ reactive lymphoid follicle', years=(2562,), src='สไลด์ 27–28', group='gc')

# ================================================================== ต่อมน้ำเหลือง · คาดว่าอาจออกปีนี้

station('h-rh-zones', 'ln-new', [
    part('บริเวณที่ลูกศรสีเหลืองชี้เรียกว่าอะไร', MANTLE),
    part('บริเวณที่ลูกศรสีเขียวชี้เรียกว่าอะไร', GC),
    part('lymphoma ที่เกิดจากเซลล์ในบริเวณลูกศรสีเหลือง', MCL),
], 'Reactive lymphoid hyperplasia: follicle มีตรงกลางสีจาง = germinal center (เขียว) ล้อมด้วยแถบเซลล์ติดสีเข้ม = mantle zone '
   '(เหลือง) — ข้อสอบทุกปีถาม mantle zone หรือ germinal center ด้วยภาพแบบนี้',
   img='h_rh_zones', years=ALL3, src='สไลด์ 24–26', group='mantle')
station('h-rh', 'ln-new', [
    part(DX + ' (ภาพ ก)', REACTIVE),
    part('เซลล์ที่ลูกศรสีแดงในภาพ ข ชี้คือเซลล์ใด', TBM),
], 'Reactive lymphoid hyperplasia: reactive lymphoid follicles จำนวนมาก · tingible-body macrophages ใน germinal center '
   'เป็นลักษณะของ reactive follicles (มักไม่พบใน follicular lymphoma)',
   img=['h_rh_low', 'h_gc_cells'], src='สไลด์ 24–27', group='rh')
station('h-hl-variants', 'ln-new', [
    part('เซลล์ที่ลูกศรชี้ในภาพ ก (นิวเคลียสเดียว) คือ Reed–Sternberg cell แบบใด',
         ['Mononuclear variant', 'Mononuclear', 'Hodgkin cell', 'Mononuclear Hodgkin cell', 'Mononuclear Reed-Sternberg cell']),
    part('เซลล์ที่ลูกศรชี้ในภาพ ข (ไซโทพลาซึมใส) เรียกว่าอะไร', ['Lacunar cell', 'Lacunar cells', 'Lacunar variant',
                                                               'Lacunar Reed-Sternberg cell', 'Lacunar']),
    part(DX, HL),
], 'Reed–Sternberg cell อาจมี 3 นิวเคลียสหรือนิวเคลียสเดียว (mononuclear variant) · lacunar variant = เซลล์ขนาดใหญ่ '
   'ไซโทพลาซึมใส',
   img=['h_hl_mono', 'h_hl_lacunar'], years=(2562, 2564), src='สไลด์ 41–42', group='hl')
station('h-hl-low', 'ln-new', [
    part('สิ่งที่ลูกศรชี้คืออะไร', ['Fibrous tissue', 'Fibrosis', 'Fibrous bands', 'Fibrous band', 'Collagen bands', 'Sclerosis',
                                  'Fibrous septa']),
    part('โครงสร้างของต่อมน้ำเหลืองปกติเป็นอย่างไร', ['Normal architecture is effaced (lost)'], kw=EFFACED),
    part(DX, HL),
], 'Hodgkin lymphoma: ลักษณะของต่อมน้ำเหลืองปกติหายไป และมี fibrous tissue แทรกอยู่ในต่อมน้ำเหลือง (ลูกศร)',
   img='h_hl_low', years=(2562, 2564), src='สไลด์ 38–39', group='hl')
station('h-fl-follicles', 'ln-new', [
    part('ลูกศรสีเขียวในภาพ ก ชี้ follicle ชนิดใด', ['Neoplastic follicles', 'Neoplastic follicle', 'Neoplastic lymphoid follicles',
                                                 'Neoplastic lymphoid follicle']),
    part('ลูกศรสีเหลืองในภาพ ก ชี้ follicle ชนิดใด', ['Reactive lymphoid follicles', 'Reactive lymphoid follicle',
                                                  'Reactive follicles', 'Reactive follicle']),
    part('จากภาพ ข follicles ของโรคนี้ต่างจาก reactive follicles อย่างไร',
         ['Neoplastic follicles are back-to-back and the mantle zone is indistinct'],
         kw=[['back to back', 'closely packed', 'crowded', 'packed', 'ติดชิดกัน', 'ชิดกัน'], ['mantle zone', 'mantle']]),
    part(DX, FL),
], 'Follicular lymphoma: มีทั้ง reactive lymphoid follicles (เหลือง) และ neoplastic follicles (เขียว) — neoplastic follicles '
   'ติดชิดกัน mantle zone ไม่ชัดเหมือน reactive follicles และมักไม่พบ tingible-body macrophages',
   img=['h_fl_low_arrows', 'h_fl_low'], years=(2562, 2564), src='สไลด์ 49–51', group='fl')
station('h-malt-cells', 'ln-new', [
    part('ภาพ ก lymphoma cells แทรกซึมลึกถึงชั้นใดของผนังลำไส้', ['Through all layers, from mucosa to serosa'],
         kw=[['serosa', 'all layers', 'transmural', 'full thickness', 'ทุกชั้น']]),
    part('เซลล์มะเร็งในภาพ ข (ขนาดเล็กถึงกลาง ไซโทพลาซึมใส) เรียกว่าเซลล์อะไร',
         ['Monocytoid cells', 'Monocytoid cell', 'Monocytoid B cells', 'Marginal zone cells', 'Marginal zone B cells']),
    part(DX, MALT),
], 'MALT lymphoma: lymphoma cells แทรกผนังลำไส้ตั้งแต่ mucosa, submucosa, muscular layer จนถึง serosa · เซลล์ขนาดเล็กถึงกลาง '
   'ไซโทพลาซึมใส เรียก monocytoid cells หรือ marginal zone cells',
   img=['h_malt_low', 'h_malt_high'], years=(2563, 2564), src='สไลด์ 54–55', group='malt')
station('h-origin', 'ln-new', [
    part('Mantle cells', MCL),
    part('Memory B-cells (interfollicular area)', ['Small lymphocytic lymphoma', 'SLL', 'CLL/SLL',
                                                  'Chronic lymphocytic leukemia/small lymphocytic lymphoma']),
    part('Marginal zone B-cells', ['Marginal zone lymphoma', 'MALT lymphoma', 'Extranodal marginal zone lymphoma', 'MZL']),
    part('T-cells (paracortical area)', ['Peripheral T-cell lymphoma', 'PTCL', 'T-cell lymphoma']),
], 'สไลด์ 30: mantle cells → mantle cell lymphoma · centrocytes → FL · centroblasts → FL, DLBCL, Burkitt · memory B-cells → '
   'small lymphocytic lymphoma · marginal zone B-cells → marginal zone lymphoma, MALT lymphoma · immunoblasts → DLBCL · '
   'T-cells → peripheral T-cell lymphoma',
   stem='จงบอก lymphoma ที่เกิดจากเซลล์ต่อไปนี้', years=ALL3, src='สไลด์ 29–30', group='origin')
station('h-dlbcl-low', 'ln-new', [
    part('ภาพ ก (กำลังขยายต่ำ) โครงสร้างของต่อมน้ำเหลืองเป็นอย่างไร', ['Normal lymph node architecture is effaced'], kw=EFFACED),
    part('ภาพ ข lymphoma cells มีขนาดเล็กหรือใหญ่', LARGE),
    part(DX, DLBCL),
], 'DLBCL: โครงสร้างของต่อมน้ำเหลืองปกติหายไป มี lymphoma cells ขนาดใหญ่กระจายทั่วไป นิวเคลียสใหญ่เท่าหรือใหญ่กว่า'
   'นิวเคลียสของ histiocyte หรือ endothelial cell',
   img=['h_dlbcl_low', 'h_dlbcl_high'], years=ALL3, src='สไลด์ 43–46', group='dlbcl')
station('h-met-low', 'ln-new', [
    part('ภาพ ข ลูกศรสีเหลืองชี้บริเวณใด', ['Normal lymphoid tissue', 'Residual lymphoid tissue', 'Lymphoid tissue',
                                         'Normal lymph node tissue', 'Residual lymph node']),
    part('ภาพ ข ลูกศรสีเขียวชี้อะไร', ['Tumor', 'Tumor cells', 'Tumor nests', 'Metastatic tumor', 'Metastatic carcinoma',
                                     'Carcinoma', 'Cancer cells', 'Malignant cells']),
    part(DX, ['Metastatic carcinoma to lymph node', 'Metastatic carcinoma', 'Metastatic squamous cell carcinoma', 'Metastatic SCC',
              'Lymph node metastasis', 'Metastatic tumor']),
], 'Metastatic carcinoma to lymph node: normal lymphoid tissue เหลืออยู่บริเวณขอบของต่อมน้ำเหลือง (เหลือง) บริเวณอื่นมี'
   'เซลล์มะเร็งลุกลามเป็นผืนใหญ่ (เขียว) — ปี 62 ให้ภาพนี้แล้วเฉลย metastatic squamous cell carcinoma',
   img=['h_met_scan', 'h_met_low'], years=(2562, 2564), seen=2562, src='สไลด์ 56–57', group='met')
