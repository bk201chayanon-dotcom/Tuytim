"""Assemble the OSPE lab practice site (Immune 2, Hemato II) into one HTML page.

  ../index.html      standalone page (open it directly, nothing else is needed)
  ../cards.json      card text without images, for review
  out/artifact.html  page content for the claude.ai Artifact tool (it adds the document skeleton)

Run: python3 build.py
"""
import base64, importlib.util, json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(HERE)
OUT = os.path.join(HERE, 'out')
os.makedirs(OUT, exist_ok=True)

def load(name):
    spec = importlib.util.spec_from_file_location(name, os.path.join(HERE, 'content', name + '.py'))
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m.CARDS

# A block is one course; each has its own topics, categories and real-exam recipe.
# exam.sections: stations drawn per category; each section is shuffled on its own and the
# sections follow each other, as the parts of the old papers did.
BLOCKS = [
    {'id': 'immune2', 'label': 'Immune 2', 'mark': 'IM2', 'topics': ['lab', 'dx'],
     'intro': 'จัดตามข้อสอบ Lab เก่าปี 2562–2565: หัวข้อที่ออกบ่อย หัวข้อที่เคยออก และหมวด “คาดว่าอาจออกปีนี้” '
              'จากบรรยายที่ยังไม่เคยออก',
     'exam': {'sections': [[['syph-stage', 2], ['syph-sero', 2], ['syph-new', 1]],
                           [['lab-hot', 6], ['lab-once', 2], ['lab-new', 2]]],
              'note': 'ซิฟิลิส 5 (บอกระยะ 2 + แปลผล 2 + คาดว่าอาจออก 1) แล้วต่อด้วย Lab infection 10 '
                      '(ออกบ่อย 6 + เคยออก 2 + คาดว่าอาจออก 2) สุ่มไม่ซ้ำหัวข้อ'}},
    {'id': 'hemato2', 'label': 'Hemato II', 'mark': 'HE2', 'topics': ['bm', 'ln'],
     'intro': 'จัดตามข้อสอบ Lab เก่าปี 2562–2564 (MEDNU 23–25): หัวข้อที่ออกบ่อย หัวข้อที่เคยออก และหมวด '
              '“คาดว่าอาจออกปีนี้” จากเอกสาร Lab ปี 2567 ที่ยังไม่เคยออก',
     'exam': {'sections': [[['bm-hot', 2], ['bm-once', 1], ['bm-new', 1], ['ln-hot', 6], ['ln-once', 1], ['ln-new', 2]]],
              'note': 'ไขกระดูก 4 (CML/myeloma 2 + เคยออก 1 + คาดว่าอาจออก 1) และต่อมน้ำเหลือง 9 '
                      '(ออกบ่อย 6 + เคยออก 1 + คาดว่าอาจออก 2) คละกัน สุ่มไม่ซ้ำหัวข้อ'}},
]
TOPICS = [
    {'id': 'lab', 'block': 'immune2', 'tag': 'เรื่องที่ 1', 'label': 'Lab infection', 'short': 'Lab infection',
     'sub': 'พยาธิวิทยาของโรคติดเชื้อ: แบคทีเรีย mycetoma เชื้อรา ไวรัส และปรสิต',
     'by': 'La-or Chompuk, M.D. · ภาควิชาพยาธิวิทยา'},
    {'id': 'dx', 'block': 'immune2', 'tag': 'เรื่องที่ 2', 'label': 'Infectious immunodiagnosis', 'short': 'Immunodiagnosis',
     'sub': 'ซิฟิลิส: บอกระยะโรคจากภาพและแปลผลการตรวจ (ไวรัสตับอักเสบบี/ซีเป็นส่วนเสริม)',
     'by': 'Infectious Immunodiag 69 · แนวทางระดับชาติ 2564, 2568'},
    {'id': 'bm', 'block': 'hemato2', 'tag': 'ส่วนที่ 1', 'label': 'Bone marrow', 'short': 'Bone marrow',
     'sub': 'ไขกระดูก: CML, multiple myeloma, acute leukemia, CLL และไขกระดูกปกติ',
     'by': 'Peerayut Sitthichaiyakul, M.D. · ภาควิชาพยาธิวิทยา'},
    {'id': 'ln', 'block': 'hemato2', 'tag': 'ส่วนที่ 2', 'label': 'Lymph node', 'short': 'Lymph node',
     'sub': 'ต่อมน้ำเหลือง: lymphoma, reactive lymphadenopathy และ metastatic carcinoma',
     'by': 'Peerayut Sitthichaiyakul, M.D. · ภาควิชาพยาธิวิทยา'},
]
# Categories follow the old papers (2562–2565): how often a topic was asked, not the lecture order.
# The "คาดว่าอาจออกปีนี้" categories hold lecture material no paper has used yet (`optional`: drawn with a
# dashed chip; the real-exam mock takes only one or two stations from them).
CATEGORIES = [
    {'id': 'lab-hot', 'label': 'ออกบ่อย (2–4 ปี)', 'topic': 'lab',
     'note': 'Eumycotic mycetoma, pseudomembranous colitis, candidiasis ออกทุกปี · molluscum, aspergillosis, HPV, '
             'strongyloidiasis ออก 3 ปี · lobar pneumonia, HSV, cryptosporidiosis, trichinellosis ออก 2 ปี'},
    {'id': 'lab-once', 'label': 'เคยออก 1 ปี', 'topic': 'lab',
     'note': 'Cryptococcosis, CMV, cysticercosis (65) · talaromycosis (62) · enterobiasis, rabies, mucormycosis (63)'},
    {'id': 'lab-new', 'label': 'คาดว่าอาจออกปีนี้', 'topic': 'lab', 'optional': True,
     'note': 'ยังไม่เคยออกในข้อสอบเก่า: ภาพอื่นในบรรยายของหัวข้อที่ออกบ่อย (ป้าย A/B/C, ภาพคลินิก, สีย้อมอื่น) '
             'และหัวข้อที่ยังไม่เคยถาม — TB, H. pylori/gastric ulcer, histoplasmosis, PCP, verruca'},
    {'id': 'syph-stage', 'label': 'ซิฟิลิส: บอกระยะจากภาพ', 'topic': 'dx',
     'note': 'ออกทุกปีที่มีบันทึก (62, 63, 65): ให้ภาพรอยโรคแล้วถามว่าเป็น primary, secondary, tertiary หรือ congenital'},
    {'id': 'syph-sero', 'label': 'ซิฟิลิส: แปลผลการตรวจ', 'topic': 'dx',
     'note': 'ออกทุกปีที่มีบันทึก: NTT− TT+ (เคยรักษา), NTT+ TT− (ผลบวกปลอม), RPR ไม่ขึ้นช่วงแรก, รักษาแล้ว RPR ไม่ลด, จัดกลุ่มการตรวจ'},
    {'id': 'syph-new', 'label': 'ซิฟิลิส: คาดว่าอาจออกปีนี้', 'topic': 'dx', 'optional': True,
     'note': 'อยู่ในเอกสารปีนี้แต่ยังไม่เคยออก: rapid test, กราฟแอนติบอดี, prozone, window period, DFA และ direct test, '
             'neurosyphilis และภาพระยะโรคที่ยังไม่เคยใช้ (aortitis, condylomata lata, mucous patch ที่ลิ้น)'},
    {'id': 'hep', 'label': 'ไวรัสตับอักเสบ บี/ซี (คาดว่าอาจออก)', 'topic': 'dx', 'optional': True,
     'note': 'อยู่ในเอกสารปีนี้แต่ไม่เคยออกในข้อสอบ Lab เก่า — รูปแบบผลตรวจหลักและกราฟ marker'},
    {'id': 'bm-hot', 'label': 'ออกทุกปี (CML, myeloma)', 'topic': 'bm',
     'note': 'ข้อสอบปี 62, 63, 64 ถามทั้ง CML (วินิจฉัย, t(9;22)) และ multiple myeloma (วินิจฉัย, plasma cell, globulin สูง) ทุกปี'},
    {'id': 'bm-once', 'label': 'เคยออก 1 ปี', 'topic': 'bm',
     'note': 'ปี 64: ภาพ lymphoblast ที่ย้อม TdT และ CD3 ติด → lymphoblastic lymphoma'},
    {'id': 'bm-new', 'label': 'คาดว่าอาจออกปีนี้', 'topic': 'bm', 'optional': True,
     'note': 'อยู่ในเอกสารแต่ยังไม่เคยออก: ไขกระดูกปกติ, AML, ALL, CLL และภาพอื่นของ CML กับ myeloma'},
    {'id': 'ln-hot', 'label': 'ออกบ่อย (2–3 ปี)', 'topic': 'ln',
     'note': 'DLBCL และ mantle zone → mantle cell lymphoma ออกทุกปี · germinal center, follicular lymphoma, starry sky, Kikuchi, '
             'Reed–Sternberg cell, metastatic SCC, MALT lymphoma ออก 2 ปี'},
    {'id': 'ln-once', 'label': 'เคยออก 1 ปี', 'topic': 'ln',
     'note': 'ปี 62: Kimura lymphadenopathy, Richter syndrome และเซลล์ใน germinal center (centroblast เป็น large lymphoid cell)'},
    {'id': 'ln-new', 'label': 'คาดว่าอาจออกปีนี้', 'topic': 'ln', 'optional': True,
     'note': 'ยังไม่เคยออก: reactive lymphoid hyperplasia, Reed–Sternberg variants, fibrosis ใน HL, follicles ของ FL เทียบ reactive, '
             'monocytoid cells ของ MALT, ต้นกำเนิดของ lymphoma แต่ละชนิด และภาพอื่นของ DLBCL กับ metastasis'},
]

cards = load('stations_lab') + load('stations_dx') + load('stations_hemato')
topic_ids = {t['id'] for t in TOPICS}
for b in BLOCKS:
    assert all(t in topic_ids for t in b['topics']), b['id']
    for section in b['exam']['sections']:
        for cat, n in section:
            assert any(c['id'] == cat for c in CATEGORIES), cat
cat_ids = {c['id'] for c in CATEGORIES}
img_dir = os.path.join(HERE, 'images')
problems = []
seen = set()
for c in cards:
    if c['id'] in seen: problems.append(('duplicate id', c['id']))
    seen.add(c['id'])
    if c['category'] not in cat_ids: problems.append(('bad category', c['id']))
    if not c['parts'] or len(c['parts']) > 6: problems.append(('parts', c['id']))
    for p in c['parts']:
        if not p['answers'] or not all(isinstance(a, str) and a.strip() for a in p['answers']): problems.append(('answers', c['id']))
        if len(c['parts']) > 1 and not p['q']: problems.append(('part without a question', c['id']))
        kw = p.get('keywords')
        if kw is not None and not (isinstance(kw, list) and all(isinstance(v, list) and v for v in kw)):
            problems.append(('keywords', c['id']))
    if not c['question'] and not c['parts'][0]['q']: problems.append(('no question', c['id']))
    for key in c['images']:
        if not os.path.exists(os.path.join(img_dir, key + '.webp')):
            problems.append(('missing image', c['id'], key))
    # stations on one topic share a group so the real-exam mock never picks two of them
    c['group'] = c.get('group') or (c['id'].split('-')[1] if c['category'].startswith('lab') else c['id'])
if problems:
    for p in problems: print('PROBLEM', p)
    sys.exit(1)

# ---- display form of answers: matching ignores case and punctuation, so the
# answers can be shown the way they are written in a report (HBsAg, IgM anti-HBc,
# Candida albicans, Ziehl–Neelsen) without changing what is accepted
import re
TOKENS = {
    'hbsag': 'HBsAg', 'hbeag': 'HBeAg', 'hbcag': 'HBcAg', 'hbsab': 'HBsAb', 'igm': 'IgM', 'igg': 'IgG',
    'hcv': 'HCV', 'hbv': 'HBV', 'hiv': 'HIV', 'hpv': 'HPV', 'hsv': 'HSV', 'cmv': 'CMV', 'hdv': 'HDV',
    'rna': 'RNA', 'dna': 'DNA', 'ag': 'Ag', 'rpr': 'RPR', 'vdrl': 'VDRL', 'csf': 'CSF', 'tpha': 'TPHA',
    'tppa': 'TPPA', 'eia': 'EIA', 'cia': 'CIA', 'clia': 'CLIA', 'gms': 'GMS', 'pas': 'PAS', 'ihc': 'IHC',
    'dfa': 'DFA', 'naat': 'NAAT', 'pcr': 'PCR', 'sle': 'SLE', 'afb': 'AFB', 'pcp': 'PCP', 'pjp': 'PJP',
    'tb': 'TB', 'bfp': 'BFP', 'hbig': 'HBIG', 'ar': 'AR', 'dm': 'DM', 'cns': 'CNS', 'pmn': 'PMN',
    'pmns': 'PMNs', 'zn': 'ZN', 'aids': 'AIDS', 'malt': 'MALT', 'ebv': 'EBV', 'mha': 'MHA', 'tp': 'TP',
    'abs': 'ABS', 'fta': 'FTA', 'ii': 'II', 'langhans': 'Langhans', 'langhan': 'Langhan', 'negri': 'Negri',
    'cowdry': 'Cowdry', 'hutchinson': 'Hutchinson', 'hutchinsons': "Hutchinson's", 'hutchinsonian': 'Hutchinsonian',
    'india': 'India', 'purkinje': 'Purkinje', 'kinyoun': 'Kinyoun', 'grocott': 'Grocott', 'gomori': 'Gomori',
    'mayer': 'Mayer', 'madura': 'Madura', 'henderson': 'Henderson', 'patterson': 'Patterson',
    'splendore': 'Splendore', 'hoeppli': 'Hoeppli', 'ziehl': 'Ziehl', 'neelsen': 'Neelsen', 'gram': 'Gram',
    'lyme': 'Lyme', 'serodia': 'Serodia',
}
GENUS = ['streptococcus', 'helicobacter', 'mycobacterium', 'clostridioides', 'clostridium', 'candida',
         'aspergillus', 'mucor', 'rhizopus', 'cryptococcus', 'histoplasma', 'talaromyces', 'penicillium',
         'pneumocystis', 'treponema', 'strongyloides', 'enterobius', 'trichinella', 'cryptosporidium', 'taenia',
         'actinomadura', 'streptomyces', 'nocardia', 'pseudallescheria', 'madurella', 'scedosporium', 'strep']
PHRASES = [
    (r'\banti hbs\b', 'anti-HBs'), (r'\banti hbc\b', 'anti-HBc'), (r'\banti hbe\b', 'anti-HBe'),
    (r'\banti hcv\b', 'anti-HCV'), (r'\banti hiv\b', 'anti-HIV'), (r'\banti hbsag\b', 'anti-HBsAg'),
    (r'\bfta abs\b', 'FTA-ABS'), (r'\bmha tp\b', 'MHA-TP'), (r'\btp pa\b', 'TP-PA'), (r'\bcsf vdrl\b', 'CSF-VDRL'),
    (r'\bdfa tp\b', 'DFA-TP'), (r'\bsplendore hoeppli\b', 'Splendore–Hoeppli'), (r'\bziehl neelsen\b', 'Ziehl–Neelsen'),
    (r'\bhenderson patterson\b', 'Henderson–Patterson'), (r'\bmiu/ml\b', 'mIU/mL'), (r'\bmiu ml\b', 'mIU/mL'),
    (r'\bcowdry type a\b', 'Cowdry type A'), (r'\bcowdry a\b', 'Cowdry A'), (r'\btoxins? a\b', lambda m: m.group(0)[:-1] + 'A'),
    (r'\btoxin b\b', 'toxin B'), (r'\band b\b', 'and B'), (r'\ba b\b', 'A B'), (r'^a and b$', 'A and B'),
    (r'\bhpv 6 11\b', 'HPV 6, 11'), (r'\bhpv type 6 and 11\b', 'HPV type 6 and 11'), (r'\bt pallidum\b', 'T. pallidum'),
    (r'\bh pylori\b', 'H. pylori'), (r'\bh\. pylori\b', 'H. pylori'), (r'\bs pneumoniae\b', 'S. pneumoniae'),
    (r'\bs\. pneumoniae\b', 'S. pneumoniae'), (r'\bc difficile\b', 'C. difficile'), (r'\bc\. difficile\b', 'C. difficile'),
    (r'\bc diff\b', 'C. diff'), (r'\bm tuberculosis\b', 'M. tuberculosis'), (r'\bc albicans\b', 'C. albicans'),
    (r'\ba fumigatus\b', 'A. fumigatus'), (r'\bc neoformans\b', 'C. neoformans'), (r'\bh capsulatum\b', 'H. capsulatum'),
    (r'\bt marneffei\b', 'T. marneffei'), (r'\bp marneffei\b', 'P. marneffei'), (r'\bp jirovecii\b', 'P. jirovecii'),
    (r'\be vermicularis\b', 'E. vermicularis'), (r'\bt spiralis\b', 'T. spiralis'), (r'\bc parvum\b', 'C. parvum'),
    (r'\bt solium\b', 'T. solium'), (r'\ba madurae\b', 'A. madurae'), (r'\ba pelletieri\b', 'A. pelletieri'),
    (r'\bp boydii\b', 'P. boydii'), (r'\bowls eye\b', "owl's eye"),
    (r'\bhepatitis b\b', 'hepatitis B'), (r'\bhepatitis c\b', 'hepatitis C'),
]

def pretty(a):
    if re.search(r'[A-Z]', a) or re.search(r'[\u0E00-\u0E7F]', a):
        return a                              # already written with care (Thai or mixed case)
    t = a
    for pat, rep in PHRASES:
        t = re.sub(pat, rep, t)
    t = re.sub(r"[a-z][a-z']*", lambda m: TOKENS.get(m.group(0), m.group(0).capitalize() if m.group(0) in GENUS else m.group(0)), t)
    if t and t[0].islower() and not re.match(r'(t|del|inv)\(', t):   # karyotypes stay lower case: t(9;22)
        t = t[0].upper() + t[1:]
    return t

for c in cards:
    for p in c['parts']:
        seen_forms, shown = set(), []
        for a in p['answers']:
            p_ = pretty(a)
            if p_ not in seen_forms:
                seen_forms.add(p_)
                shown.append(p_)
        p['answers'] = shown

used = sorted({k for c in cards for k in c['images']})
images = {}
for key in used:
    with open(os.path.join(img_dir, key + '.webp'), 'rb') as f:
        images[key] = 'data:image/webp;base64,' + base64.b64encode(f.read()).decode()

def clean(c):
    out = {k: v for k, v in c.items() if v not in (None, [], '')}
    out['parts'] = [{k: v for k, v in p.items() if v not in (None, [], '')} for p in c['parts']]
    return out

seed = {'blocks': BLOCKS, 'topics': TOPICS, 'categories': CATEGORIES, 'cards': [clean(c) for c in cards], 'images': images}
seed_json = json.dumps(seed, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')

head = open(os.path.join(HERE, 'head.html'), encoding='utf-8').read()
body = open(os.path.join(HERE, 'body.html'), encoding='utf-8').read()
app = open(os.path.join(HERE, 'app.js'), encoding='utf-8').read()
tail = f'<script id="seed-data" type="application/json">{seed_json}</script>\n<script>\n{app}</script>\n'

artifact = head + '\n' + body + '\n' + tail
standalone = ('<!DOCTYPE html>\n<html lang="th">\n<head>\n<meta charset="utf-8">\n'
              '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
              + head + '\n</head>\n<body>\n' + body + '\n' + tail + '</body>\n</html>\n')
open(os.path.join(OUT, 'artifact.html'), 'w', encoding='utf-8').write(artifact)
open(os.path.join(SITE, 'index.html'), 'w', encoding='utf-8').write(standalone)
json.dump({'blocks': BLOCKS, 'topics': TOPICS, 'categories': CATEGORIES, 'cards': cards}, open(os.path.join(SITE, 'cards.json'), 'w', encoding='utf-8'),
          ensure_ascii=False, indent=1)

from collections import Counter
print('stations', len(cards), dict(Counter(c['category'] for c in cards)), '·', sum(len(c['parts']) for c in cards), 'parts')
print('images used', len(used), 'of', len([f for f in os.listdir(img_dir) if f.endswith('.webp')]))
print('artifact.html %.2f MB' % (len(artifact.encode()) / 1e6), '· index.html %.2f MB' % (len(standalone.encode()) / 1e6))
