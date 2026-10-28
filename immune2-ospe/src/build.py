"""Assemble OSPE Immune 2 into one HTML page.

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

TOPICS = [
    {'id': 'lab', 'no': 1, 'label': 'Lab infection', 'short': 'Lab infection',
     'sub': 'พยาธิวิทยาของโรคติดเชื้อ: แบคทีเรีย mycetoma เชื้อรา ไวรัส และปรสิต',
     'by': 'La-or Chompuk, M.D. · ภาควิชาพยาธิวิทยา'},
    {'id': 'dx', 'no': 2, 'label': 'Infectious immunodiagnosis', 'short': 'Immunodiagnosis',
     'sub': 'ซิฟิลิส ไวรัสตับอักเสบบีและซี: การตรวจทางน้ำเหลืองและการแปลผล',
     'by': 'Infectious Immunodiag 69 · แนวทางระดับชาติ 2564, 2568'},
]
CATEGORIES = [
    {'id': 'bact', 'label': 'Bacterial infection', 'topic': 'lab'},
    {'id': 'myc', 'label': 'Mycetoma & Splendore–Hoeppli', 'topic': 'lab'},
    {'id': 'fungus', 'label': 'Fungal infection', 'topic': 'lab'},
    {'id': 'virus', 'label': 'Viral infection', 'topic': 'lab'},
    {'id': 'parasite', 'label': 'Parasitic infection', 'topic': 'lab'},
    {'id': 'syph-clin', 'label': 'ซิฟิลิส: ระยะโรคและรอยโรค', 'topic': 'dx'},
    {'id': 'syph-lab', 'label': 'ซิฟิลิส: การตรวจและแปลผล', 'topic': 'dx'},
    {'id': 'hep', 'label': 'ไวรัสตับอักเสบ บี/ซี', 'topic': 'dx'},
]

cards = load('cards_lab') + load('cards_dx')
cat_ids = {c['id'] for c in CATEGORIES}
img_dir = os.path.join(HERE, 'images')
problems = []
seen = set()
for c in cards:
    if c['id'] in seen: problems.append(('duplicate id', c['id']))
    seen.add(c['id'])
    if c['category'] not in cat_ids: problems.append(('bad category', c['id']))
    if not c['answers'] or not all(isinstance(a, str) and a.strip() for a in c['answers']): problems.append(('answers', c['id']))
    if c.get('imageRef') and not os.path.exists(os.path.join(img_dir, c['imageRef'] + '.webp')):
        problems.append(('missing image', c['id'], c['imageRef']))
    kw = c.get('keywords')
    if kw is not None and not (isinstance(kw, list) and all(isinstance(v, list) and v for v in kw)):
        problems.append(('keywords', c['id']))
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
    if t and t[0].islower():
        t = t[0].upper() + t[1:]
    return t

for c in cards:
    seen_forms, shown = set(), []
    for a in c['answers']:
        p_ = pretty(a)
        if p_ not in seen_forms:
            seen_forms.add(p_)
            shown.append(p_)
    c['answers'] = shown

used = sorted({c['imageRef'] for c in cards if c.get('imageRef')})
images = {}
for key in used:
    with open(os.path.join(img_dir, key + '.webp'), 'rb') as f:
        images[key] = 'data:image/webp;base64,' + base64.b64encode(f.read()).decode()

def clean(c):
    out = {k: v for k, v in c.items() if v not in (None, [], '')}
    return out

seed = {'topics': TOPICS, 'categories': CATEGORIES, 'cards': [clean(c) for c in cards], 'images': images}
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
json.dump({'topics': TOPICS, 'categories': CATEGORIES, 'cards': cards}, open(os.path.join(SITE, 'cards.json'), 'w', encoding='utf-8'),
          ensure_ascii=False, indent=1)

from collections import Counter
print('cards', len(cards), dict(Counter(c['category'] for c in cards)))
print('images used', len(used), 'of', len([f for f in os.listdir(img_dir) if f.endswith('.webp')]))
print('artifact.html %.2f MB' % (len(artifact.encode()) / 1e6), '· index.html %.2f MB' % (len(standalone.encode()) / 1e6))
