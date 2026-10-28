# -*- coding: utf-8 -*-
"""Topic 1 — Lab infection (La-or Chompuk, M.D., Department of Pathology, Naresuan University).
Every answer and explanation is taken from the slide named in `src`."""

CARDS = []

def card(id, cat, q, answers, explain, img=None, kw=None, src=None):
    CARDS.append({'id': id, 'category': cat, 'question': q, 'answers': answers,
                  'explain': explain, 'imageRef': img, 'keywords': kw, 'src': src})

PNEU = ["lobar pneumonia", "pneumococcal pneumonia", "acute lobar pneumonia", "bacterial lobar pneumonia"]
TB = ["pulmonary tuberculosis", "tuberculosis", "tb", "cavitary tuberculosis", "secondary tuberculosis",
      "reactivation tuberculosis", "post primary tuberculosis", "วัณโรคปอด", "วัณโรค"]
MYC = ["mycetoma", "madura foot", "maduromycosis", "eumycetoma", "actinomycetoma", "eumycotic mycetoma",
       "actinomycotic mycetoma", "โรคเท้าชาวนา"]
HP = ["helicobacter pylori", "h pylori", "hp", "h. pylori"]
PMC = ["pseudomembranous colitis", "pseudomembranous enterocolitis", "c difficile colitis", "clostridium difficile colitis",
       "clostridioides difficile colitis", "antibiotic associated colitis"]
CAND = ["candidiasis", "candida", "candida albicans", "candida infection", "candida spp"]
ASP = ["aspergillus", "aspergillus spp", "aspergillus fumigatus", "aspergillosis", "invasive aspergillosis"]
MUC = ["mucor", "mucor spp", "mucormycosis", "zygomycosis", "rhizopus", "mucorales", "zygomycetes"]
CRY = ["cryptococcosis", "cryptococcus neoformans", "cryptococcus", "c neoformans", "cryptococcal infection"]
HIS = ["histoplasmosis", "histoplasma capsulatum", "histoplasma", "h capsulatum"]
TAL = ["talaromyces marneffei", "penicillium marneffei", "talaromycosis", "penicilliosis", "penicillosis",
       "t marneffei", "p marneffei", "talaromyces"]
PCP = ["pneumocystis pneumonia", "pcp", "pjp", "pneumocystosis", "pneumocystis jirovecii pneumonia",
       "pneumocystis carinii pneumonia", "pneumocystis jiroveci pneumonia"]
CONDY = ["condyloma acuminatum", "condyloma acuminata", "condylomata acuminata", "anogenital wart", "anogenital warts",
         "genital wart", "genital warts", "venereal wart", "หูดหงอนไก่"]
CMV = ["cytomegalovirus infection", "cmv infection", "cmv pneumonia", "cmv pneumonitis", "cytomegalovirus pneumonia",
       "cytomegalovirus", "cmv"]
HSV = ["herpes simplex virus infection", "hsv infection", "herpes simplex", "herpes labialis", "herpes", "hsv",
       "cold sore", "เริม", "โรคเริม"]
MOL = ["molluscum contagiosum", "molluscum", "หูดข้าวสุก"]
STR = ["strongyloidiasis", "strongyloides stercoralis", "strongyloides", "strongyloides hyperinfection",
       "disseminated strongyloidiasis"]
ENT = ["enterobiasis", "enterobius vermicularis", "enterobius", "pinworm", "pin worm", "threadworm", "oxyuriasis"]
TRI = ["trichinellosis", "trichinosis", "trichinella spiralis", "trichinella", "trichiniasis"]
CSP = ["cryptosporidiosis", "cryptosporidium", "cryptosporidium parvum", "c parvum"]
CYS = ["cysticercosis", "cysticercus", "cysticercus cellulosae", "taenia solium cysticercosis"]
NEUT = ["neutrophils", "neutrophil", "polymorphonuclear leukocytes", "pmn", "pmns", "neutrophil infiltration"]

# ============================================================ Bacterial infection
card('pneu-gross', 'bact', 'จงให้การวินิจฉัย (ปอดจากการชันสูตรศพ)', PNEU,
     'ปอดทั้ง lobe แข็งและเป็นสีขาวแน่น (consolidation) จำกัดอยู่ในขอบเขตของ lobe — ลักษณะของ lobar pneumonia ซึ่งมักเกิดจาก Streptococcus pneumoniae',
     img='pneu_gross', src='สไลด์ 4')
card('pneu-organism', 'bact', 'เชื้อก่อโรคที่พบบ่อยที่สุดของรอยโรคในภาพนี้คืออะไร',
     ["streptococcus pneumoniae", "s pneumoniae", "pneumococcus", "s. pneumoniae", "strep pneumoniae"],
     'โรคปอดบวมแบบ lobar pneumonia มักเกิดจาก Streptococcus pneumoniae — แบคทีเรียแกรมบวก รูปร่างกลม อยู่เป็นคู่ (diplococci) หรือเป็นสาย',
     img='pneu_gross', src='สไลด์ 3–4')
card('pneu-cell', 'bact', 'เซลล์อักเสบที่อยู่เต็มถุงลมในภาพนี้คือเซลล์ชนิดใด', NEUT,
     'ถุงลมเต็มไปด้วย neutrophil (acute inflammatory exudate) ขณะที่ผนังถุงลมยังคงอยู่ เป็นลักษณะของปอดบวมจากแบคทีเรีย',
     img='pneu_histo', src='สไลด์ 4')
card('pneu-histo', 'bact', 'จงให้การวินิจฉัย (ชิ้นเนื้อปอด)',
     PNEU + ["acute bacterial pneumonia", "bacterial pneumonia", "acute pneumonia", "bronchopneumonia", "pneumonia"],
     'ถุงลมเต็มไปด้วย neutrophil = acute bacterial pneumonia สไลด์ใช้ภาพนี้คู่กับ gross ของ lobar pneumonia (การแยก lobar กับ bronchopneumonia ดูจาก gross ว่ากินทั้ง lobe หรือเป็นหย่อมรอบหลอดลม)',
     img='pneu_histo', src='สไลด์ 4')
card('des-pneumococcus', 'bact', 'จงบอกการติดสีแกรมและรูปร่างของเชื้อ Streptococcus pneumoniae',
     ["Gram-positive diplococci (or cocci in chain)"],
     'สไลด์: S. pneumoniae เป็นเชื้อแบคทีเรียแกรมบวก รูปร่างกลม อยู่กันเป็นคู่ (diplococci) หรือเป็นสาย (gram positive cocci in chain)',
     img='pneu_gross', src='สไลด์ 3',
     kw=[["gram positive", "gram +", "แกรมบวก"], ["diplococci", "diplococcus", "cocci", "cocci in pairs", "cocci in chain", "รูปกลม"]])

card('tb-gross', 'bact', 'จงให้การวินิจฉัย (ปอดของผู้ป่วยไอเรื้อรัง น้ำหนักลด)', TB,
     'วัณโรคปอดมักเกิดที่ปอดกลีบบน หน้าตัดเห็นเนื้อตายสีเหลืองคล้ายเนย (caseous necrosis) และเกิดเป็นโพรง (cavity)',
     img='tb_gross', src='สไลด์ 7')
card('tb-caseous', 'bact', 'จงบอกชนิดของเนื้อตาย (necrosis) ที่เห็นในปอดนี้',
     ["caseous necrosis", "caseation necrosis", "caseation", "caseous"],
     'Caseous necrosis: เนื้อตายสีขาวเทาหรือเหลืองคล้ายเนย พบที่ตรงกลางรอยโรคของวัณโรค',
     img='tb_gross', src='สไลด์ 6–7')
card('tb-granuloma', 'bact', 'จงบอกชนิดของการอักเสบที่เห็นในภาพ (ชิ้นเนื้อปอด)',
     ["granulomatous inflammation", "chronic granulomatous inflammation", "granuloma", "granulomatous",
      "caseating granulomatous inflammation", "caseating granuloma"],
     'Granulomatous inflammation: กลุ่ม epithelioid histiocytes ร่วมกับ Langhans giant cell และ lymphocyte — พยาธิสภาพหลักของวัณโรค',
     img='tb_granuloma', src='สไลด์ 8')
card('tb-langhans', 'bact', 'จงบอกชื่อเซลล์ที่ลูกศรชี้',
     ["langhans giant cell", "langhan giant cell", "langhans giant cells", "langhans type giant cell",
      "multinucleated giant cell", "multinucleated giant cells"],
     'Langhans giant cell เกิดจาก macrophage หลายตัวรวมกัน นิวเคลียสเรียงเป็นรูปเกือกม้าที่ขอบเซลล์ (อย่าสับสนกับ Langerhans cell ซึ่งเป็น dendritic cell)',
     img='tb_granuloma', src='สไลด์ 8')
card('tb-afb-stain', 'bact', 'ภาพนี้ย้อมด้วยสีพิเศษชนิดใด',
     ["acid fast stain", "acid fast", "ziehl neelsen", "ziehl neelsen stain", "afb stain", "zn stain", "kinyoun stain",
      "acid fast bacilli stain"],
     'การย้อม acid-fast (เช่น Ziehl–Neelsen) ใช้สี carbol fuchsin เชื้อที่ผนังเซลล์มี mycolic acid จะทนต่อการล้างสีด้วยกรด-แอลกอฮอล์จึงติดสีแดง พื้นหลังติดสีฟ้า',
     img='tb_afb', src='สไลด์ 5, 8')
card('tb-afb-org', 'bact', 'สิ่งที่ลูกศรชี้ (แท่งสีแดง) คืออะไร',
     ["acid fast bacilli", "afb", "mycobacterium tuberculosis", "m tuberculosis", "tubercle bacilli", "mycobacteria",
      "mycobacterium"],
     'เชื้อ Mycobacterium tuberculosis เป็นแบคทีเรียรูปแท่ง ต้องการออกซิเจน ติดสีแดงเมื่อย้อม acid fast จึงเรียกว่า acid-fast bacilli (AFB)',
     img='tb_afb', src='สไลด์ 5, 8')
card('tb-mycolic', 'bact', 'ส่วนประกอบใดในผนังเซลล์ของ Mycobacterium ที่ทำให้เชื้อทนต่อการล้างสีด้วยกรดหรือแอลกอฮอล์',
     ["mycolic acid", "mycolic acids"],
     'ผนังเซลล์เป็นไขมันหนา ประกอบด้วย mycolic acid เมื่อย้อมด้วย carbol fuchsin แล้วจะทนต่อการล้างสีออกด้วยกรดหรือแอลกอฮอล์ (acid fast)',
     img='tb_afb', src='สไลด์ 5')
card('tb-miliary', 'bact', 'จงให้การวินิจฉัย (ผิวตัดปอด)',
     ["miliary tuberculosis", "pulmonary miliary tuberculosis", "miliary tb", "miliary", "disseminated tuberculosis"],
     'Pulmonary miliary tuberculosis: จุดเล็ก ๆ สีขาวขนาดใกล้เคียงกันกระจายไปทั่วปอด เกิดจากเชื้อแพร่ไปตามกระแสเลือด',
     img='tb_miliary', src='สไลด์ 9')
card('des-tb-granuloma', 'bact', 'จงบรรยายองค์ประกอบของ granuloma ในวัณโรคเป็นภาษาอังกฤษ',
     ["Epithelioid histiocytes, Langhans (multinucleated) giant cells, lymphocytes/plasma cells and central caseous necrosis"],
     'สไลด์: granulomatous inflammation — กลางรอยโรคเป็น caseous necrosis มี macrophage ที่เปลี่ยนรูปคล้ายเยื่อบุผิว (epithelioid histiocytes), multinucleated giant cells และเซลล์อักเสบเรื้อรัง (lymphocytes, plasma cells)',
     img='tb_granuloma', src='สไลด์ 6, 8',
     kw=[["epithelioid histiocytes", "epithelioid cells", "epithelioid histiocyte", "epithelioid"],
         ["langhans giant cell", "multinucleated giant cell", "giant cells", "giant cell"],
         ["lymphocytes", "lymphocyte", "plasma cells", "chronic inflammatory cells"],
         ["caseous necrosis", "caseation", "caseating", "central necrosis"]])

card('gu-dx', 'bact', 'จงให้การวินิจฉัยรอยโรคที่ลูกศรชี้ (กระเพาะอาหารที่ผ่าตัดออก)',
     ["gastric ulcer", "peptic ulcer", "chronic peptic ulcer", "chronic gastric ulcer", "peptic ulcer disease"],
     'Gastric (peptic) ulcer — การติดเชื้อ H. pylori เรื้อรังสัมพันธ์กับ gastritis และ peptic ulcer ทั้ง gastric ulcer และ duodenal ulcer',
     img='gastric_ulcer', src='สไลด์ 18–19')
card('gu-organism', 'bact', 'เชื้อแบคทีเรียที่สัมพันธ์กับรอยโรคนี้มากที่สุดคืออะไร', HP,
     'Helicobacter pylori เป็นแบคทีเรียแกรมลบรูปแท่ง ไม่ลุกลามเนื้อเยื่อ (noninvasive) และไม่สร้างสปอร์ การติดเชื้อเรื้อรังทำให้เกิด gastritis, peptic ulcer และเพิ่มความเสี่ยง adenocarcinoma กับ lymphoma ของกระเพาะ',
     img='gastric_ulcer', src='สไลด์ 18')
card('gastritis-dx', 'bact', 'จงให้การวินิจฉัย (ชิ้นเนื้อกระเพาะอาหารของผู้ติดเชื้อ H. pylori)',
     ["acute gastritis", "active gastritis", "acute active gastritis", "chronic active gastritis", "h pylori gastritis",
      "gastritis"],
     'มี neutrophil แทรกในเยื่อบุและต่อมของกระเพาะ = acute (active) gastritis',
     img='acute_gastritis', src='สไลด์ 20')
card('gastritis-cell', 'bact', 'เซลล์อักเสบที่ลูกศรชี้คือเซลล์ชนิดใด', NEUT,
     'Neutrophil infiltration ในเยื่อบุกระเพาะเป็นเครื่องบอกการอักเสบที่ active',
     img='acute_gastritis', src='สไลด์ 20')
card('hp-he', 'bact', 'สิ่งที่ลูกศรสีน้ำเงินชี้ในชั้นเมือกเหนือเยื่อบุผิวคืออะไร (ย้อม H&E)', HP,
     'H. pylori อยู่ในชั้นเมือกเหนือเยื่อบุผิวของกระเพาะ (ไม่ลุกลามเข้าเนื้อเยื่อ) เห็นเป็นแท่งเล็ก ๆ โค้ง',
     img='hp_he', src='สไลด์ 21')
card('hp-ihc', 'bact', 'ภาพนี้ใช้การย้อมวิธีใดยืนยันเชื้อ (เชื้อติดสีน้ำตาล)',
     ["immunohistochemistry", "ihc", "immunohistochemical stain", "immunostain", "immunoperoxidase stain"],
     'Gastric mucosa: positive for H. pylori by immunohistochemistry — เชื้อติดสีน้ำตาลบริเวณผิวเยื่อบุ',
     img='hp_ihc', src='สไลด์ 22')
card('hp-ihc-org', 'bact', 'จงบอกชื่อเชื้อที่ติดสีน้ำตาลในภาพ (ชิ้นเนื้อกระเพาะอาหาร)', HP,
     'Rod shape bacteria at mucosal surface ที่ย้อม IHC ติดสีน้ำตาล = H. pylori',
     img='hp_ihc_zoom', src='สไลด์ 22–23')
card('des-hp', 'bact', 'จงบรรยายรูปร่างและตำแหน่งของเชื้อในภาพนี้',
     ["Rod-shaped (curved) bacteria at the mucosal surface"],
     'สไลด์บรรยายว่า "Rod shape bacteria at mucosal surface"',
     img='hp_ihc_zoom', src='สไลด์ 22',
     kw=[["rod shape", "rod", "rods", "rod shaped", "bacilli", "curved", "spiral"],
         ["mucosal surface", "surface", "mucus", "mucous layer", "surface epithelium", "lumen"]])
card('des-hp-gram', 'bact', 'H. pylori ติดสีแกรมอะไร และมีรูปร่างแบบใด',
     ["Gram-negative bacilli"],
     'สไลด์: H. pylori เป็นแบคทีเรียชนิดแกรมลบรูปแท่ง (gram negative bacilli) ไม่ลุกลามเนื้อเยื่อ และไม่สร้างสปอร์',
     img='hp_he', src='สไลด์ 18',
     kw=[["gram negative", "แกรมลบ"], ["bacilli", "bacillus", "rod", "rods", "rod shaped", "curved", "spiral", "รูปแท่ง"]])
card('hp-neoplasm', 'bact', 'การติดเชื้อนี้แบบเรื้อรังเพิ่มความเสี่ยงต่อเนื้องอกของกระเพาะอาหารชนิดใด (ตอบ 1 ชนิด)',
     ["gastric adenocarcinoma", "adenocarcinoma", "gastric lymphoma", "malt lymphoma", "lymphoma", "gastric cancer",
      "gastric carcinoma"],
     'สไลด์: H. pylori อาจทำให้เกิดมะเร็งกระเพาะอาหารชนิด adenocarcinoma และเนื้องอกชนิด lymphoma ของกระเพาะ',
     img='hp_he', src='สไลด์ 18')

card('pmc-gross1', 'bact', 'จงให้การวินิจฉัย (ลำไส้ใหญ่ของผู้ป่วยที่ได้รับยาปฏิชีวนะแล้วท้องร่วงรุนแรง)', PMC,
     'Hyperemic mucosa and green-yellow exudate — pseudomembranous colitis จาก Clostridioides difficile',
     img='pmc_gross1', src='สไลด์ 25')
card('pmc-gross2', 'bact', 'จงให้การวินิจฉัย (ลำไส้ใหญ่)', PMC,
     'Yellow-green plaques and nodules on the colonic mucosa = pseudomembrane',
     img='pmc_gross2', src='สไลด์ 26')
card('pmc-membrane', 'bact', 'แผ่นนูนสีเหลืองเขียวที่ลูกศรชี้บนเยื่อบุลำไส้เรียกว่าอะไร',
     ["pseudomembrane", "pseudomembranes", "pseudomembranous plaques", "yellow green plaques"],
     'Pseudomembrane คือหนอง เนื้อตาย fibrin และเมือกที่สะสมเป็นแผ่นบนเยื่อบุที่อักเสบ ไม่ใช่เยื่อบุจริง',
     img='pmc_gross2', src='สไลด์ 24, 26')
card('pmc-organism', 'bact', 'เชื้อก่อโรคนี้คืออะไร',
     ["clostridioides difficile", "clostridium difficile", "c difficile", "c. difficile", "c diff"],
     'Clostridioides difficile (ชื่อเดิม Clostridium difficile) เป็นสาเหตุ 10–20% ของ antibiotic-associated diarrhea และเป็นสาเหตุเกือบทั้งหมดของ pseudomembranous colitis',
     img='pmc_gross1', src='สไลด์ 24')
card('pmc-toxin', 'bact', 'เชื้อนี้ไม่ได้ทำลายลำไส้โดยตรง แต่ก่อโรคผ่านสารพิษชนิดใด (ตอบให้ครบ 2 ชนิด)',
     ["toxin a and toxin b", "toxin a and b", "toxins a and b", "toxin a toxin b", "toxin a b", "a and b", "a b"],
     'Toxin A เป็น enterotoxin กระตุ้น macrophage และ mast cell ให้เกิดการอักเสบ มี fluid secretion และเพิ่ม mucosal permeability ส่วน toxin B มี enterotoxic activity น้อยกว่า A — toxin ทำให้เกิด leukocyte chemotaxis จน colitis แย่ลง มี focal ulceration และหนองกับเนื้อตายสะสมเป็น pseudomembrane',
     img='pmc_gross2', src='สไลด์ 24')
card('pmc-histo', 'bact', 'จงให้การวินิจฉัย (ชิ้นเนื้อลำไส้ใหญ่)', PMC,
     'Colonic mucosa with sloughed epithelium, neutrophils, mucin, fibrin deposition on the surface and crypts',
     img='pmc_histo1', src='สไลด์ 27')
card('des-pmc', 'bact', 'จงบรรยายพยาธิสภาพที่เห็นบนผิวเยื่อบุลำไส้ใหญ่ในภาพนี้',
     ["Colonic mucosa with sloughed epithelium, neutrophils, mucin, fibrin deposition on the surface and crypts"],
     'คำบรรยายใต้ภาพในสไลด์ — exudate ที่ประกอบด้วย fibrin, neutrophil และ mucin พุ่งออกจาก crypt ที่เสียหาย',
     img='pmc_histo1', src='สไลด์ 27',
     kw=[["neutrophils", "neutrophil", "inflammatory cells", "pmn"], ["fibrin", "fibrinous"], ["mucin", "mucus"],
         ["sloughed epithelium", "sloughed", "necrotic epithelium", "necrosis", "necrotic"]])
card('pmc-A', 'bact', 'สิ่งที่ป้าย A ชี้ (ลูกศรสีดำ) คืออะไร',
     ["necrotic gland", "necrotic glands", "necrotic crypt", "necrotic crypts"],
     'Necrotic gland: ต่อม (crypt) ที่ตายและขยายตัว เต็มไปด้วยเซลล์อักเสบและเมือก',
     img='pmc_histo2', src='สไลด์ 28')
card('pmc-B', 'bact', 'สิ่งที่ป้าย B ชี้ (ลูกศรสีแดง) คืออะไร',
     ["fibrin exudate", "fibrin", "fibrinous exudate", "fibrinopurulent exudate", "pseudomembrane"],
     'Fibrin exudate บนผิวเยื่อบุ เป็นส่วนประกอบของ pseudomembrane',
     img='pmc_histo2', src='สไลด์ 28')

# ============================================================ Mycetoma & Splendore-Hoeppli
card('myc-foot', 'myc', 'จงให้การวินิจฉัย (เท้าของชาวนา บวมแข็ง ตะปุ่มตะป่ำ มีรูเปิดหลายรู)', MYC,
     'Mycetoma (Madura foot, โรคเท้าชาวนา) — ก้อนแข็ง บวม ตะปุ่มตะป่ำ มีรูเปิด (sinus) ที่มีหนองและโคโลนีของเชื้อ (grains, granules) หลายสีหลายขนาดไหลออกมา เกิดได้ทั้งจากแบคทีเรียและเชื้อรา',
     img='myc_foot', src='สไลด์ 10–11')
card('myc-granule', 'myc', 'เม็ดสีเหลืองที่ลูกศรชี้ ซึ่งออกมาพร้อมหนองจากรูเปิดของรอยโรคนี้ เรียกว่าอะไร',
     ["sulfur granules", "sulfur granule", "sulphur granules", "sulphur granule", "grains", "grain", "granules"],
     'Sulfur granules สีเหลือง พบในหนองและเนื้อเยื่อที่ติดเชื้อ',
     img='myc_granule', src='สไลด์ 11')
card('myc-granule-what', 'myc', 'เม็ด grains/granules ที่ออกมาจากรูเปิดของ mycetoma แท้จริงแล้วคืออะไร',
     ["colonies of the organism", "colonies", "colony", "microcolonies", "colonies of organisms", "bacterial colonies",
      "fungal colonies", "โคโลนีของเชื้อ"],
     'สไลด์: sulfur granules สีเหลือง "ซึ่งเป็น colonies ของเชื้อ"',
     img='myc_granule', src='สไลด์ 11')
card('myc-histo', 'myc', 'จงให้การวินิจฉัย (ชิ้นเนื้อจากรอยโรคเรื้อรังที่เท้าซึ่งมีรูเปิดหลายรู)', MYC,
     'กลุ่มเชื้อ (grain) ขนาดใหญ่ล้อมรอบด้วยเซลล์อักเสบ ในบริบทรอยโรคที่เท้า = mycetoma',
     img='myc_grain', src='สไลด์ 11')
card('myc-neut', 'myc', 'เซลล์อักเสบที่ล้อมรอบกลุ่มเชื้อในภาพนี้เป็นเซลล์ชนิดใด', NEUT,
     'สไลด์: Mycetoma เห็นเส้นใยของเชื้อรา ล้อมรอบด้วยเซลล์อักเสบชนิด neutrophils',
     img='myc_neut', src='สไลด์ 12')
card('myc-eumyc-name', 'myc', 'mycetoma ที่เกิดจากเชื้อรา เรียกว่าอะไร',
     ["eumycotic mycetoma", "eumycetoma", "eumycotic"],
     'Eumycotic mycetoma เกิดจากเชื้อรา ส่วน actinomycotic mycetoma เกิดจากแบคทีเรีย',
     img='eumyc_hyphae', src='สไลด์ 10')
card('myc-actino-name', 'myc', 'mycetoma ที่เกิดจากเชื้อแบคทีเรีย เรียกว่าอะไร',
     ["actinomycotic mycetoma", "actinomycetoma", "actinomycotic"],
     'Actinomycotic mycetoma เกิดจากแบคทีเรีย เช่น Actinomadura madurae, A. pelletieri, Streptomyces somaliensis',
     img='myc_grain', src='สไลด์ 10')
card('myc-actino-org', 'myc', 'จงยกตัวอย่างเชื้อแบคทีเรียที่ก่อ actinomycotic mycetoma (ตอบ 1 ชนิด)',
     ["actinomadura madurae", "actinomadura pelletieri", "streptomyces somaliensis", "a madurae", "a pelletieri",
      "actinomadura", "streptomyces", "nocardia"],
     'ตัวอย่างในสไลด์: Actinomadura madurae, A. pelletieri, Streptomyces somaliensis',
     img=None, src='สไลด์ 10')
card('myc-eumyc-org', 'myc', 'จงยกตัวอย่างเชื้อราที่ก่อ eumycotic mycetoma (ตอบ 1 ชนิด)',
     ["pseudallescheria boydii", "madurella grisea", "madurella mycetomatis", "madurella", "p boydii",
      "scedosporium apiospermum"],
     'ตัวอย่างในสไลด์: Pseudallescheria boydii, Madurella grisea, M. mycetomatis',
     img=None, src='สไลด์ 10')
card('myc-class', 'myc', 'Madura foot จัดเป็นการติดเชื้อรากลุ่มใด (แบ่งตามตำแหน่งที่ติดเชื้อบนร่างกาย)',
     ["cutaneous and subcutaneous mycoses", "subcutaneous mycoses", "subcutaneous mycosis", "subcutaneous",
      "cutaneous and subcutaneous mycosis"],
     'การติดเชื้อราที่ผิวหนังและใต้ผิวหนัง (Cutaneous and Subcutaneous mycoses) ได้แก่ โรคเท้าชาวนา (Madura foot)',
     img=None, src='สไลด์ 30')
card('des-myc-clinical', 'myc', 'จงบอกลักษณะทางคลินิก 3 อย่างของ mycetoma',
     ["Hard swelling (nodules), draining sinuses, and grains/granules in the pus"],
     'สไลด์: ก้อนแข็ง บวม ตะปุ่มตะป่ำ มีรูเปิด (sinus) ซึ่งมีหนองและโคโลนีของเชื้อ (grains, granules) ออกมา',
     img='myc_foot', src='สไลด์ 10',
     kw=[["swelling", "hard mass", "mass", "nodules", "nodule", "tumefaction", "ก้อน", "บวม"],
         ["sinus", "sinuses", "draining sinus", "sinus tracts", "รูเปิด"],
         ["grains", "granules", "grain", "granule", "sulfur granules"]])
card('eumyc-pattern', 'myc', 'จงบอกรูปแบบการอักเสบที่เห็นในภาพ (ชิ้นเนื้อจาก eumycotic mycetoma)',
     ["suppurative granuloma", "suppurative granulomatous inflammation", "suppurative granulomas",
      "suppurative granulomatous"],
     'Eumycotic mycetoma: suppurative granuloma — ตรงกลางเป็นกลุ่มเส้นใยราและ neutrophil (หนอง) ล้อมรอบด้วย epithelioid histiocytes',
     img='eumyc_granuloma', src='สไลด์ 13')
card('eumyc-A', 'myc', 'เซลล์ที่ป้าย A ชี้คืออะไร',
     ["epithelioid histiocytes", "epithelioid histiocyte", "epithelioid cells", "epithelioid macrophages", "epithelioid"],
     'ชั้นนอกของ suppurative granuloma เป็น epithelioid histiocytes',
     img='eumyc_granuloma', src='สไลด์ 13')
card('eumyc-B', 'myc', 'สิ่งที่ป้าย B ชี้คืออะไร',
     ["pigmented fungal hyphae", "fungal hyphae", "pigmented hyphae", "dematiaceous hyphae", "fungal grain"],
     'Pigmented fungal hyphae อยู่ตรงกลาง granuloma',
     img='eumyc_granuloma', src='สไลด์ 13')
card('eumyc-C', 'myc', 'เซลล์ที่ป้าย C ชี้คืออะไร', NEUT,
     'Neutrophil ล้อมรอบกลุ่มเส้นใยรา ทำให้ granuloma นี้เป็นแบบ suppurative',
     img='eumyc_granuloma', src='สไลด์ 13')
card('eumyc-hyphae', 'myc', 'สิ่งที่ลูกศรชี้ (กลุ่มสีน้ำตาลเข้ม) คืออะไร',
     ["pigmented fungal hyphae", "fungal hyphae", "pigmented hyphae", "dematiaceous hyphae", "dematiaceous fungal hyphae"],
     'Eumycotic mycetoma: pigmented fungal hyphae',
     img='eumyc_hyphae', src='สไลด์ 14')
card('sh-name', 'myc', 'ปรากฏการณ์ที่มีสาร eosinophilic ล้อมรอบกลุ่มเชื้อเป็นแฉก (radiating) แบบในภาพนี้เรียกว่าอะไร',
     ["splendore hoeppli phenomenon", "splendore hoeppli", "splendore hoeppli reaction", "splendore hoeppli material"],
     'Splendore–Hoeppli phenomenon: เชื้อ (แบคทีเรีย ปรสิต เชื้อรา) หรือสารเฉื่อย ถูกล้อมรอบด้วยสาร eosinophilic amorphous material เป็นแฉก กระบอง หรือวงแหวน',
     img='sh_low', src='สไลด์ 15–16')
card('sh-B', 'myc', 'สิ่งที่ป้าย B ชี้คืออะไร',
     ["fungal hyphae", "hyphae", "fungal colony", "fungal grain", "fungus"],
     'กลุ่มเส้นใยรา (fungal hyphae) อยู่ตรงกลาง ล้อมรอบด้วยสาร eosinophilic',
     img='sh_high', src='สไลด์ 17')
card('sh-C', 'myc', 'สิ่งที่ป้าย C ชี้คืออะไร',
     ["eosinophilic material", "eosinophilic amorphous material", "splendore hoeppli material",
      "splendore hoeppli phenomenon", "eosinophilic substance"],
     'Eosinophilic material ที่ขอบกลุ่มเชื้อ = Splendore–Hoeppli phenomenon',
     img='sh_high', src='สไลด์ 17')
card('sh-A', 'myc', 'สิ่งที่ป้าย A ชี้คืออะไร',
     ["inflammatory cells", "inflammatory cell", "neutrophils", "inflammatory infiltrate"],
     'เซลล์อักเสบรอบกลุ่มเชื้อ',
     img='sh_high', src='สไลด์ 17')
card('des-sh-composition', 'myc', 'สาร eosinophilic ใน Splendore-Hoeppli phenomenon เชื่อว่าประกอบด้วยอะไรบ้าง',
     ["Fibrin, antigen-antibody complexes and debris"],
     'สไลด์: "The eosinophilic material is thought to be composed of fibrin, antigen-antibody complexes and debris"',
     img='sh_high', src='สไลด์ 15',
     kw=[["antigen antibody complexes", "antigen antibody complex", "immune complexes", "immune complex"],
         ["fibrin"], ["debris", "cellular debris"]])
card('des-sh-effect', 'myc', 'Splendore-Hoeppli phenomenon มีผลต่อการติดเชื้ออย่างไร',
     ["Prevents phagocytosis and leads to chronicity of infection"],
     'สไลด์: "Prevents phagocytosis and leads to chronicity of infection"',
     img='sh_low', src='สไลด์ 15',
     kw=[["prevents phagocytosis", "prevent phagocytosis", "inhibits phagocytosis", "resist phagocytosis",
          "ป้องกันการถูกจับกิน"],
         ["chronicity", "chronic infection", "chronic", "เรื้อรัง"]])

# ============================================================ Fungal infection
card('fungi-forms', 'fungus', 'เชื้อราเจริญเติบโตได้ 2 รูปแบบ คืออะไร',
     ["Budding yeast and filamentous hyphae (mold)"],
     'สไลด์: เชื้อราเจริญได้ 2 แบบ คือ ยีสต์ที่แบ่งตัว (budding yeast) และสายรา (filamentous hyphae, mold)',
     img=None, src='สไลด์ 29',
     kw=[["yeast", "yeasts", "budding yeast", "ยีสต์"], ["hyphae", "mold", "mould", "filamentous", "สายรา"]])
card('fungi-dimorphic', 'fungus', 'เชื้อราที่เปลี่ยนรูปตามอุณหภูมิ — เป็นสายราที่อุณหภูมิห้อง และเป็น yeast ที่อุณหภูมิร่างกาย — เรียกว่าอะไร',
     ["dimorphic fungi", "dimorphic fungus", "dimorphic", "thermally dimorphic fungi"],
     'เชื้อราก่อโรคที่สำคัญทางคลินิกมักเป็น dimorphic fungi',
     img=None, src='สไลด์ 29')
card('fungi-superficial', 'fungus', 'โรคเกลื้อน (tinea versicolor) และโรคกลาก (dermatophytosis) จัดเป็นการติดเชื้อรากลุ่มใด',
     ["superficial mycoses", "superficial mycosis", "superficial"],
     'การติดเชื้อราที่ผิวชั้นบน (Superficial mycoses)',
     img=None, src='สไลด์ 30')
card('fungi-systemic', 'fungus', 'Candidiasis, cryptococcosis, aspergillosis, mucormycosis, pneumocystosis และ histoplasmosis จัดเป็นการติดเชื้อรากลุ่มใด',
     ["systemic mycoses", "deep mycoses", "systemic mycosis", "deep mycosis", "systemic", "deep"],
     'การติดเชื้อราในอวัยวะภายใน (Systemic mycoses หรือ Deep mycoses)',
     img=None, src='สไลด์ 30')

card('cand-thrush', 'fungus', 'จงให้การวินิจฉัย (คราบขาวบนลิ้นของทารก)',
     ["oral thrush", "oral candidiasis", "thrush", "candidiasis", "oropharyngeal candidiasis"],
     'Oral thrush จาก Candida albicans — เชื้อเจริญได้ดีในที่อุ่นและชื้น จึงมักทำให้เกิด oral thrush, vaginitis, diaper rash',
     img='cand_thrush', src='สไลด์ 31–32')
card('cand-diaper', 'fungus', 'จงให้การวินิจฉัย (ผื่นแดงบริเวณที่ใส่ผ้าอ้อมของทารก มีตุ่มกระจายรอบผื่นหลัก)',
     ["candidiasis", "candidal diaper dermatitis", "diaper candidiasis", "cutaneous candidiasis", "diaper rash",
      "candida diaper rash"],
     'Diaper rash จาก Candida — ที่อับชื้นใต้ผ้าอ้อม มีผื่นแดงและตุ่มเล็ก ๆ กระจายรอบ (satellite lesions)',
     img='cand_diaper', src='สไลด์ 32')
card('cand-nail', 'fungus', 'จงให้การวินิจฉัย (เล็บมือ)',
     ["onychomycosis", "candidal onychomycosis", "candida onychomycosis"],
     'Onychomycosis — สไลด์จัดไว้ในกลุ่มรอยโรคของ candidiasis',
     img='cand_nail', src='สไลด์ 32')
card('cand-organism', 'fungus', 'เชื้อก่อโรคที่พบบ่อยที่สุดของรอยโรคนี้คืออะไร',
     ["candida albicans", "c albicans", "candida"],
     'Candida albicans ทำให้เกิดโรคตั้งแต่ superficial lesions ไปจนถึง disseminated infections',
     img='cand_thrush', src='สไลด์ 31')
card('cand-risk', 'fungus', 'ผู้ป่วยกลุ่มใดมีโอกาสติดเชื้อ Candida ได้ง่าย (ตอบ 1 กลุ่ม)',
     ["diabetes mellitus", "diabetes", "dm", "burns", "burn", "leukopenia", "neutropenia", "immunocompromised",
      "เบาหวาน", "แผลไฟไหม้", "เม็ดเลือดขาวต่ำ"],
     'สไลด์: ผู้ป่วยเบาหวาน แผลไฟไหม้ และผู้ที่มีเม็ดเลือดขาวต่ำ (leukopenia)',
     img='cand_diaper', src='สไลด์ 31')
card('cand-pas', 'fungus', 'จงบอกชื่อเชื้อรา (ย้อม PAS)', CAND,
     'Candida spp.: yeasts และ pseudohyphae',
     img='cand_pas', src='สไลด์ 33')
card('cand-gms-stain', 'fungus', 'ภาพนี้ย้อมด้วยสีพิเศษใด (เชื้อราติดสีดำบนพื้นเขียว)',
     ["gms", "grocott methenamine silver", "gomori methenamine silver", "methenamine silver", "silver stain", "grocott"],
     'GMS (Grocott–Gomori methenamine silver) ย้อมผนังเชื้อราเป็นสีดำบนพื้นสีเขียว ใช้กับเชื้อราแทบทุกชนิดรวมถึง Pneumocystis',
     img='cand_gms', src='สไลด์ 33')
card('cand-he', 'fungus', 'จงให้การวินิจฉัย (ชิ้นเนื้อ ย้อม H&E)', CAND,
     'Candidiasis: เห็นทั้ง yeasts และ pseudohyphae',
     img='cand_he', src='สไลด์ 34')
card('cand-A', 'fungus', 'สิ่งที่ป้าย A ชี้คืออะไร',
     ["pseudohyphae", "pseudohypha", "pseudohyphae of candida"],
     'Pseudohyphae: yeast ที่แตกหน่อต่อกันเป็นสายยาว มีรอยคอดที่รอยต่อ ต่างจาก true hyphae ที่มีผนังกั้นตรง',
     img='cand_he', src='สไลด์ 34')
card('cand-B', 'fungus', 'สิ่งที่ป้าย B ชี้คืออะไร',
     ["yeasts", "yeast", "yeast cells", "budding yeasts", "blastoconidia"],
     'Yeasts ของ Candida',
     img='cand_he', src='สไลด์ 34')
card('cand-budding', 'fungus', 'สิ่งที่ลูกศรชี้คืออะไร',
     ["budding yeasts", "budding yeast", "yeasts", "blastoconidia"],
     'Budding yeasts ของ Candida',
     img='cand_budding', src='สไลด์ 35')
card('des-candida', 'fungus', 'จงบรรยายรูปร่างของเชื้อ Candida ที่พบในเนื้อเยื่อ',
     ["Yeasts, budding yeasts and pseudohyphae (rare true septate hyphae)"],
     'สไลด์: Morphology — yeast, budding yeasts, pseudohyphae, rare true septate hyphae',
     img='cand_pas', src='สไลด์ 31',
     kw=[["yeast", "yeasts", "budding yeast", "budding yeasts"], ["pseudohyphae", "pseudohypha"]])

card('asp-ball', 'fungus', 'จงให้การวินิจฉัยรอยโรคในโพรงของปอดนี้',
     ["aspergilloma", "fungus ball", "fungal ball", "pulmonary aspergilloma", "colonizing aspergillosis"],
     'Aspergilloma: เห็นเป็นโพรงที่มี colonies ของเชื้อราอัดแน่น (colonizing aspergillosis) — เชื้อเจริญในโพรงเดิม ไม่ลุกลามเข้าเนื้อเยื่อ',
     img='asp_ball', src='สไลด์ 36–37')
card('des-asp-ball', 'fungus', 'Aspergilloma (colonizing aspergillosis) ต่างจาก invasive aspergillosis อย่างไร',
     ["Growth of fungus in a cavity, no tissue invasion"],
     'สไลด์: Colonizing/Aspergilloma — growth of fungus in cavity, no tissue invasion',
     img='asp_ball', src='สไลด์ 36',
     kw=[["cavity", "pre-existing cavity", "โพรง"],
         ["no tissue invasion", "no invasion", "without tissue invasion", "without invasion", "not invade",
          "noninvasive", "ไม่ลุกลาม"]])
card('asp-org', 'fungus', 'จงบอกชื่อเชื้อรา (ชิ้นเนื้อ ย้อม GMS)', ASP,
     'Aspergillus spp.: septate hyphae with acute angle branching',
     img='asp_gms2', src='สไลด์ 39')
card('asp-org2', 'fungus', 'จงบอกชื่อเชื้อรา (ย้อม GMS)', ASP,
     'Aspergillus spp. — septate hyphae with acute angle branching',
     img='asp_gms1', src='สไลด์ 38')
card('asp-A', 'fungus', 'โครงสร้างที่ป้าย A ชี้ (ลูกศรสีแดง) คืออะไร',
     ["septum", "septa", "septation"],
     'Septum (ผนังกั้น) — Aspergillus เป็น septate hyphae',
     img='asp_gms2', src='สไลด์ 39')
card('asp-B', 'fungus', 'เส้นใยที่ป้าย B ชี้แตกแขนงเป็นมุมแบบใด',
     ["acute angle branching", "acute angle", "acute angle branch", "dichotomous branching", "45 degree", "40 degree",
      "มุมแหลม"],
     'Acute angle (ประมาณ 40–45°) branching — ต่างจาก Mucor ที่แตกแขนงเป็นมุมฉาก',
     img='asp_gms2', src='สไลด์ 36, 39')
card('des-asp', 'fungus', 'จงบรรยายลักษณะของเส้นใยเชื้อราในภาพนี้',
     ["Septate hyphae (5–10 µm) with acute angle (40°) branching"],
     'สไลด์: invasive aspergillosis — septate hyphae, 5–10 µm thick, branching at acute angle (40 degree), tendency to invade blood vessel, hemorrhage',
     img='asp_gms1', src='สไลด์ 36, 38',
     kw=[["septate", "septate hyphae", "septated", "septa"],
         ["acute angle", "acute angle branching", "dichotomous", "45 degree", "40 degree", "มุมแหลม"]])
card('asp-species', 'fungus', 'Aspergillus species ที่ก่อโรคบ่อยที่สุดคืออะไร',
     ["aspergillus fumigatus", "a fumigatus", "fumigatus"],
     'Aspergillus fumigatus พบบ่อยที่สุด ก่อโรค sinusitis, pneumonia และ disseminated infection',
     img='asp_gms1', src='สไลด์ 36')
card('asp-vessel', 'fungus', 'invasive aspergillosis มักลุกลามเข้าหลอดเลือด ทำให้เกิดพยาธิสภาพใดในเนื้อเยื่อ',
     ["hemorrhage", "haemorrhage", "hemorrhagic infarction", "infarction", "thrombosis", "necrosis"],
     'สไลด์: tendency to invade blood vessel, hemorrhage — การลุกลามหลอดเลือดทำให้เลือดออกและเนื้อตายจากการขาดเลือด',
     img='asp_gms2', src='สไลด์ 36')

card('mucor-org', 'fungus', 'จงบอกชื่อเชื้อรา (ย้อม GMS)', MUC,
     'Mucor spp.: broad non-septate hyphae with right angle branching',
     img='mucor_gms2', src='สไลด์ 42')
card('des-mucor', 'fungus', 'จงบรรยายลักษณะของเส้นใยเชื้อราในภาพนี้',
     ["Broad, irregular, non-septate hyphae (6–50 µm) with right angle branching"],
     'สไลด์: nonseptate irregular wide (6–50 µm) fungal hyphae with right angle branching, tendency to invade blood vessels',
     img='mucor_gms2', src='สไลด์ 40, 42',
     kw=[["nonseptate", "aseptate", "pauciseptate", "no septa", "without septa"],
         ["broad", "wide", "ribbon", "irregular", "6-50"],
         ["right angle", "90 degree", "perpendicular", "มุมฉาก"]])
card('mucor-pas', 'fungus', 'จงให้การวินิจฉัย (ชิ้นเนื้อโพรงจมูกของผู้ป่วยเบาหวาน ย้อม PAS)',
     ["mucormycosis", "zygomycosis", "rhinocerebral mucormycosis", "mucor", "mucor infection"],
     'Broad non-septate hyphae, right angle branching = Mucor spp. (mucormycosis)',
     img='mucor_pas', src='สไลด์ 41')
card('mucor-dm', 'fungus', 'ผู้ป่วยเบาหวานต้องระวังการติดเชื้อรานี้ในรูปแบบใด',
     ["rhinocerebral mucormycosis", "rhinocerebral", "rhino orbital cerebral mucormycosis", "rhinoorbitocerebral mucormycosis"],
     'สไลด์: ในผู้ป่วยเบาหวานต้องระวัง rhinocerebral mucormycosis — โรคนี้มักเกิดในคนภูมิคุ้มกันต่ำ พบที่ sinus, lung, GI tract',
     img='mucor_gms1', src='สไลด์ 40')
card('mucor-name', 'fungus', 'Mucormycosis มีชื่อเรียกอีกชื่อหนึ่งว่าอะไร',
     ["zygomycosis"],
     'Others name: Zygomycosis',
     img='mucor_gms1', src='สไลด์ 40')

card('crypto-ink', 'fungus', 'การเตรียมสิ่งส่งตรวจ (CSF) ในภาพนี้ใช้วิธีใด',
     ["india ink", "india ink preparation", "india ink stain", "nigrosin"],
     'India ink preparation: หมึกไม่ซึมผ่าน capsule จึงเห็นวงใสรอบเชื้อบนพื้นดำ',
     img='crypto_ink', src='สไลด์ 43–44')
card('crypto-ink-org', 'fungus', 'จงบอกชื่อเชื้อ (CSF ของผู้ป่วย AIDS ที่มีไข้และปวดศีรษะ)', CRY,
     'Cryptococcus neoformans: encapsulated yeast ทำให้เกิด meningoencephalitis โดยเฉพาะในผู้ที่ภูมิคุ้มกันต่ำ',
     img='crypto_ink', src='สไลด์ 43–44')
card('crypto-bm', 'fungus', 'จงให้การวินิจฉัย (ไขกระดูก ย้อม H&E)', CRY,
     'Bone marrow: cryptococcosis — yeasts with capsule',
     img='crypto_bm', src='สไลด์ 45')
card('des-crypto-bm', 'fungus', 'สิ่งที่ลูกศรสีเขียวชี้คืออะไร (บรรยายสั้น ๆ)',
     ["Yeasts with capsule"],
     'สไลด์: "Yeasts with capsule" — capsule ไม่ติดสี H&E จึงเห็นเป็นวงใสรอบเชื้อ',
     img='crypto_bm', src='สไลด์ 45',
     kw=[["yeast", "yeasts"], ["capsule", "capsules", "capsular", "halo", "encapsulated"]])
card('crypto-muci', 'fungus', 'ภาพนี้ย้อมด้วยสีพิเศษใดเพื่อแสดง capsule ของเชื้อ (capsule ติดสีชมพูแดง)',
     ["mucicarmine", "mucicarmine stain", "mayer mucicarmine", "mucin stain"],
     'Lung: cryptococcosis — mucin/mucicarmine stain for capsule',
     img='crypto_muci', src='สไลด์ 46')
card('crypto-muci-dx', 'fungus', 'จงให้การวินิจฉัย (ชิ้นเนื้อปอด ย้อม mucicarmine)', CRY,
     'Capsule ของ Cryptococcus ติด mucicarmine เป็นสีชมพูแดง',
     img='crypto_muci', src='สไลด์ 46')
card('crypto-pas', 'fungus', 'จงบอกชื่อเชื้อ (ย้อม PAS)', CRY,
     'Yeast ขนาด 5–10 µm มี capsule หนาเป็นวงรอบตัว — Cryptococcus',
     img='crypto_pas', src='สไลด์ 44')
card('crypto-cns', 'fungus', 'Cryptococcus neoformans ก่อโรคที่ระบบใดบ่อยที่สุดในผู้ที่ภูมิคุ้มกันต่ำ',
     ["meningoencephalitis", "meningitis", "cryptococcal meningitis", "central nervous system", "cns", "brain"],
     'ทำให้เกิด meningoencephalitis โดยเฉพาะในผู้ที่ภูมิคุ้มกันต่ำ บาง serotype ทำให้เกิด skin lesion, lung lesion, disseminated',
     img='crypto_ink', src='สไลด์ 43')
card('crypto-budding', 'fungus', 'จากภาพวาดของเชื้อนี้ การแตกหน่อ (budding) มีลักษณะอย่างไร',
     ["narrow based budding", "narrow based unequal budding", "narrow based", "narrow neck budding"],
     'Cryptococcus: 5–10 µm yeasts with wide capsular halo, narrow-based unequal budding',
     img='crypto_drawing', src='สไลด์ 44')
card('des-crypto', 'fungus', 'จงบรรยายลักษณะของเชื้อ Cryptococcus (ขนาด รูปร่าง และสิ่งที่ล้อมรอบ)',
     ["Yeast 5–10 µm with a thick gelatinous capsule"],
     'สไลด์: Morphology — yeast form 5–10 µm with thick gelatinous capsule; ย้อมได้ด้วย PAS, Mucicarmine, India ink preparation',
     img='crypto_drawing', src='สไลด์ 43–44',
     kw=[["yeast", "yeasts"], ["capsule", "gelatinous capsule", "capsular halo", "halo"], ["5-10"]])

card('histo-dx', 'fungus', 'จงให้การวินิจฉัย (ชิ้นเนื้อจากแผลในช่องปากของผู้ป่วย HIV — สังเกตเซลล์ที่ลูกศรสีแดงชี้)', HIS,
     'Histoplasmosis: yeasts ขนาดเล็ก 3–5 µm อยู่เต็มไซโทพลาซึมของ macrophage — แยกจาก Talaromyces ที่ yeast มีผนังกั้นตามขวาง (transverse septum)',
     img='histo_tissue', src='สไลด์ 47–48')
card('histo-smear', 'fungus', 'สิ่งที่ลูกศรชี้ภายในไซโทพลาซึมของ macrophage คืออะไร',
     ["histoplasma capsulatum", "histoplasma", "histoplasma yeasts", "small yeasts", "yeasts", "yeast"],
     'Histoplasmosis, 3–5 µm yeasts in macrophages',
     img='histo_smear', src='สไลด์ 48')
card('histo-gastric', 'fungus', 'จงให้การวินิจฉัย (ชิ้นเนื้อกระเพาะอาหารของผู้ป่วยภูมิคุ้มกันบกพร่อง)', HIS,
     'Gastric mucosa: histoplasmosis — yeasts ขนาด 3–5 µm อยู่ใน lamina propria (ลูกศร)',
     img='histo_gastric', src='สไลด์ 49')
card('des-histo', 'fungus', 'จงบรรยายลักษณะของเชื้อที่เห็น (ขนาด และตำแหน่งที่พบ)',
     ["Thin-walled yeasts 3–5 µm within macrophages"],
     'สไลด์: Histoplasma capsulatum — 3–5 µm thin-walled yeast; ภาพแสดง yeasts in macrophages',
     img='histo_tissue', src='สไลด์ 47–48',
     kw=[["yeast", "yeasts", "thin walled yeast", "small yeasts"], ["3-5"],
         ["macrophage", "macrophages", "histiocytes", "intracellular"]])
card('histo-sites', 'fungus', 'Histoplasma capsulatum ทำให้เกิดรอยโรคที่อวัยวะใดได้บ้าง (ตอบ 1)',
     ["lung", "mediastinum", "adrenal gland", "adrenal", "liver", "meninges", "disseminated", "ปอด"],
     'สไลด์: Lung lesion, mediastinum, adrenal gland, liver, meninges, disseminated',
     img=None, src='สไลด์ 47')

card('talaro-org', 'fungus', 'จงบอกชื่อเชื้อ (ผู้ป่วย AIDS มีตุ่มที่ผิวหนังกระจายทั่วตัว)', TAL,
     'Penicillosis (ชื่อใหม่ Talaromycosis) จาก Penicillium marneffei (ชื่อใหม่ Talaromyces marneffei) — yeast with binary fission / transverse septa',
     img='talaro_yeast', src='สไลด์ 50–51')
card('talaro-septum', 'fungus', 'ลักษณะสำคัญของเชื้อที่ลูกศรสีเหลืองชี้คืออะไร',
     ["transverse septum", "transverse septa", "binary fission", "central septum", "septum"],
     'Yeasts with binary fission or transverse septa (septum divides cell in 2 parts) ขนาด 2–5 µm',
     img='talaro_yeast', src='สไลด์ 50–51')
card('talaro-gms', 'fungus', 'จงบอกชื่อเชื้อ (ย้อม GMS)', TAL,
     'Penicillium: GMS stain shows binary fission',
     img='talaro_gms', src='สไลด์ 52')
card('talaro-name', 'fungus', 'ปัจจุบัน Penicillium marneffei เปลี่ยนชื่อเป็นอะไร',
     ["talaromyces marneffei", "t marneffei", "talaromyces"],
     'Penicillium marneffei → Talaromyces marneffei; โรค Penicillosis → Talaromycosis',
     img='talaro_gms', src='สไลด์ 50')
card('des-talaro', 'fungus', 'จงบรรยายลักษณะทางจุลพยาธิวิทยาของเชื้อนี้',
     ["Yeasts (2–5 µm) with binary fission or transverse septa"],
     'สไลด์: พบ yeasts with binary fission or transverse septa (septum divides cell in 2 parts) ขนาด 2–5 µm มักเกิดในคนที่ภูมิคุ้มกันต่ำ',
     img='talaro_gms', src='สไลด์ 50',
     kw=[["yeast", "yeasts"], ["binary fission", "transverse septum", "transverse septa", "septum", "septa"]])

card('pcp-he', 'fungus', 'จงให้การวินิจฉัย (ปอดของผู้ป่วย AIDS ที่มีไข้ ไอ หายใจเร็ว)', PCP + ["pneumocystis"],
     'Pneumocystis pneumonia: ถุงลมเต็มไปด้วยสารสีชมพูเป็นฟอง ผนังถุงลมหนามี monocytes, plasma cells และ histiocytes',
     img='pcp_he', src='สไลด์ 53–54')
card('des-pcp-he', 'fungus', 'จงบรรยายลักษณะของสารที่อยู่เต็มถุงลมในภาพนี้',
     ["Pink, foamy material filling the alveolar spaces"],
     'สไลด์: พบสารสีชมพู เป็นฟอง บรรจุเต็มในช่องว่างถุงลม และผนังถุงลมหนา',
     img='pcp_he', src='สไลด์ 53',
     kw=[["foamy", "frothy", "bubbly", "ฟอง"], ["pink", "eosinophilic", "ชมพู"]])
card('pcp-gms', 'fungus', 'จงบอกชื่อเชื้อ (ชิ้นเนื้อปอด ย้อม GMS)',
     ["pneumocystis jirovecii", "pneumocystis jiroveci", "pneumocystis", "p jirovecii", "pneumocystis carinii"],
     'Lung: Pneumocystis jiroveci — yeasts with cup shape',
     img='pcp_gms2', src='สไลด์ 55')
card('pcp-shape', 'fungus', 'เชื้อที่ลูกศรสีแดงชี้มีรูปร่างแบบใด',
     ["cup shape", "cup shaped", "boat shape", "boat shaped", "crushed ping pong ball", "helmet shape"],
     'เมื่อย้อม GMS จะพบรูปร่างคล้ายถ้วย (cup) หรือเรือ (boat shape) ขนาด 4–6 µm',
     img='pcp_gms1', src='สไลด์ 53–54')
card('pcp-cxr', 'fungus', 'ภาพรังสีทรวงอกของผู้ป่วย HIV ที่มีไข้ ไอ หายใจเร็ว — นึกถึงการติดเชื้อราชนิดใดมากที่สุด', PCP + ["pneumocystis"],
     'Pneumocystis jirovecii เป็น opportunistic fungus ผู้ป่วยมีไข้ ไอ หายใจเร็ว; gross ปอดทั้งสองข้างแข็ง หน้าตัดเป็นตุ่มนูนเล็ก ๆ (granular surface)',
     img='pcp_cxr', src='สไลด์ 53–54')
card('des-pcp-gross', 'fungus', 'จงบรรยายลักษณะ gross ของปอดในโรค Pneumocystis pneumonia',
     ["Both lungs firm with a granular cut surface"],
     'สไลด์: ปอดทั้งสองข้างแข็ง หน้าตัดเป็นตุ่มนูนเล็ก ๆ (granular surface) ปอดจมน้ำทั้งสองข้าง',
     img=None, src='สไลด์ 53',
     kw=[["both lungs", "bilateral", "ทั้งสองข้าง"], ["firm", "heavy", "consolidated", "แข็ง"],
         ["granular", "granular surface", "ตุ่มนูน"]])

# ============================================================ Viral infection
card('virus-cells', 'virus', 'เนื้อเยื่อที่ติดเชื้อไวรัส มักพบเซลล์อักเสบชนิดใดเป็นส่วนใหญ่',
     ["lymphocytes and macrophages", "lymphocytes", "lymphocyte", "mononuclear cells", "macrophages",
      "mononuclear inflammatory cells"],
     'ไวรัสเป็น obligate intracellular organism เนื้อเยื่อที่ติดเชื้อมักมีเซลล์อักเสบชนิด lymphocytes และ macrophages เป็นส่วนใหญ่',
     img=None, src='สไลด์ 56')
card('hpv-vulva', 'virus', 'จงให้การวินิจฉัย (รอยโรคที่อวัยวะเพศภายนอก)', CONDY,
     'Condyloma acuminata (หูดหงอนไก่) — หูดจาก HPV บริเวณอวัยวะสืบพันธุ์ ผิวขรุขระคล้ายดอกกะหล่ำ (ต่างจาก condyloma lata ของ secondary syphilis ที่แบนและผิวเรียบชื้น)',
     img='hpv_vulva', src='สไลด์ 57–58')
card('hpv-perianal', 'virus', 'จงให้การวินิจฉัย (รอยโรครอบทวารหนัก)', CONDY,
     'Condyloma acuminata รอบทวารหนัก — ตุ่มผิวขรุขระหลายตุ่ม (DDx: condyloma lata ของซิฟิลิสระยะที่ 2 ซึ่งแบน เรียบ ชื้น)',
     img='hpv_perianal', src='สไลด์ 58')
card('hpv-penis', 'virus', 'จงให้การวินิจฉัย (รอยโรคที่องคชาต)', CONDY,
     'Condyloma acuminata (anogenital warts)',
     img='hpv_penis', src='สไลด์ 58')
card('hpv-virus', 'virus', 'เชื้อก่อโรคของรอยโรคนี้คืออะไร',
     ["human papillomavirus", "hpv", "human papilloma virus", "hpv 6 11", "hpv type 6 and 11"],
     'Human papillomavirus (HPV) ทำให้เซลล์เยื่อบุ squamous เพิ่มจำนวนจนเป็นตุ่มนูน เรียกว่าหูด (wart)',
     img='hpv_vulva', src='สไลด์ 57')
card('verruca-dx', 'virus', 'จงให้การวินิจฉัย (ชิ้นเนื้อจากตุ่มนูนที่นิ้วมือ)',
     ["verruca vulgaris", "common wart", "common warts", "wart", "viral wart", "verruca"],
     'Verruca vulgaris (common wart) พบที่มือและส่วนอื่นของร่างกาย',
     img='verruca_low', src='สไลด์ 57, 59')
card('verruca-green', 'virus', 'จงบอกพยาธิสภาพที่ลูกศรสีเขียวชี้',
     ["papillomatosis", "papillomatous", "papillomatous hyperplasia"],
     'Papillomatosis: epidermis หนาขึ้นและยื่นออกไป (exophytic growth) คล้ายนิ้วมือ',
     img='verruca_low', src='สไลด์ 59')
card('verruca-yellow', 'virus', 'จงบอกพยาธิสภาพที่ลูกศรสีเหลืองชี้',
     ["hyperkeratosis", "hyperkeratotic"],
     'Hyperkeratosis: ผิวหนังชั้นนอกสุด (keratin) หนาตัวขึ้น',
     img='verruca_high', src='สไลด์ 59')
card('koilocyte', 'virus', 'เซลล์ที่ลูกศรสีเหลืองชี้เรียกว่าอะไร (ชิ้นเนื้อปากมดลูก)',
     ["koilocyte", "koilocytes", "koilocytosis", "koilocytic change", "koilocytic atypia"],
     'Koilocyte: เซลล์ที่ติด HPV มีช่องว่างใสรอบนิวเคลียส นิวเคลียสติดสีเข้ม ขนาดใหญ่ขึ้น ขอบไม่เรียบ',
     img='koilocyte', src='สไลด์ 57, 60')
card('des-koilocyte', 'virus', 'จงบรรยายลักษณะของเซลล์ที่ลูกศรชี้',
     ["Large hyperchromatic, irregular nuclei with a perinuclear halo"],
     'สไลด์: Cervix: koilocyte — large hyperchromatic nuclei, perinuclear halo (และขอบนิวเคลียสไม่เรียบ)',
     img='koilocyte', src='สไลด์ 57, 60',
     kw=[["perinuclear halo", "perinuclear clearing", "clear halo", "halo", "perinuclear vacuolization"],
         ["hyperchromatic", "hyperchromasia", "dark nuclei"],
         ["large nuclei", "enlarged nuclei", "nuclear enlargement", "enlarged", "large"]])
card('hpv-plantar', 'virus', 'หูดที่พบบริเวณฝ่าเท้าเรียกว่าอะไร',
     ["plantar wart", "plantar warts", "verruca plantaris"],
     'Plantar warts เป็นหูดที่พบบริเวณฝ่าเท้า; common warts (verruca vulgaris) ที่มือ; anogenital warts (condyloma acuminata) ที่อวัยวะสืบพันธุ์',
     img=None, src='สไลด์ 57')

card('cmv-dx', 'virus', 'จงให้การวินิจฉัย (ชิ้นเนื้อปอดของผู้ป่วยหลังปลูกถ่ายไต)', CMV,
     'Lung: cytomegalovirus infection — เซลล์ขนาดใหญ่ มี intranuclear inclusion ขนาดใหญ่สีม่วง ล้อมรอบด้วย clear halo และมี basophilic intracytoplasmic inclusions ขนาดเล็ก',
     img='cmv', src='สไลด์ 61–62')
card('cmv-yellow', 'virus', 'สิ่งที่ลูกศรสีเหลืองชี้คืออะไร',
     ["intranuclear inclusion", "intranuclear inclusions", "intranuclear inclusion body", "owl eye inclusion",
      "owls eye inclusion", "owl eye"],
     'Intranuclear inclusion ขนาดใหญ่สีม่วง (ลักษณะ owl’s eye)',
     img='cmv', src='สไลด์ 62')
card('cmv-red', 'virus', 'สิ่งที่ลูกศรสีแดงชี้คืออะไร',
     ["intracytoplasmic inclusions", "intracytoplasmic inclusion", "basophilic intracytoplasmic inclusions",
      "cytoplasmic inclusions"],
     'Basophilic intracytoplasmic inclusions ขนาดเล็ก',
     img='cmv', src='สไลด์ 62')
card('cmv-green', 'virus', 'บริเวณใสที่ลูกศรสีเขียวชี้ (รอบ inclusion ในนิวเคลียส) เรียกว่าอะไร',
     ["perinuclear halo", "halo", "clear halo", "perinuclear clearing"],
     'สไลด์ระบุว่า perinuclear halo (green) — คือวงใสที่ล้อมรอบ intranuclear inclusion',
     img='cmv', src='สไลด์ 62')
card('des-cmv', 'virus', 'จงบรรยายลักษณะของเซลล์ที่ติดเชื้อในภาพนี้',
     ["Enlarged cells with a large purple intranuclear inclusion surrounded by a clear halo, and small basophilic intracytoplasmic inclusions"],
     'สไลด์: เซลล์ที่ติดเชื้อ CMV มีขนาดใหญ่ขึ้น มี large purple intranuclear inclusion ล้อมรอบด้วย clear halo และอาจพบ basophilic intracytoplasmic inclusions ขนาดเล็ก',
     img='cmv', src='สไลด์ 61',
     kw=[["enlarged", "cytomegaly", "large cell", "large cells", "enlarged cells"],
         ["intranuclear inclusion", "intranuclear"], ["halo", "clear halo", "perinuclear halo"],
         ["intracytoplasmic inclusion", "intracytoplasmic", "cytoplasmic inclusions"]])
card('cmv-host', 'virus', 'CMV ทำให้เกิด systemic infection ในผู้ป่วยกลุ่มใด',
     ["immunocompromised", "immunocompromised patients", "immunocompromised host", "transplant recipients", "aids",
      "hiv", "ภูมิคุ้มกันบกพร่อง"],
     'ในคนภูมิคุ้มกันปกติ CMV ทำให้เกิดการติดเชื้อแบบไม่มีอาการหรือ mononucleosis-like infection แต่ในผู้ป่วยภูมิคุ้มกันบกพร่องทำให้เกิด systemic infection ก่อโรคได้ในเซลล์ทุกชนิดของอวัยวะนั้น',
     img=None, src='สไลด์ 61')

card('hsv-lip', 'virus', 'จงให้การวินิจฉัย (ตุ่มน้ำใสเป็นกลุ่มที่ริมฝีปาก เจ็บ)', HSV,
     'Herpes simplex virus infection (โรคเริม) — กลุ่มตุ่มน้ำใส (vesicle group) ที่มักแตกเป็นแผลที่ผิวหนังและเยื่อบุ อาจเจ็บ',
     img='hsv_lip', src='สไลด์ 63–64')
card('hsv-tzanck', 'virus', 'เซลล์ในภาพนี้ (smear ที่ขูดจากฐานตุ่มน้ำ) เรียกว่าอะไร',
     ["multinucleated giant cells", "multinucleated giant cell", "multinucleated cells", "tzanck cells",
      "multinucleated epithelial giant cells"],
     'เมื่อขูดรอยโรคไปดูจะพบเซลล์ที่ติดเชื้อมารวมกันเป็น multinucleated giant cells with glassy intranuclear inclusion (Cowdry type A) — การตรวจนี้เรียกว่า Tzanck smear',
     img='hsv_tzanck', src='สไลด์ 63–64')
card('hsv-cowdry', 'virus', 'inclusion ในนิวเคลียสลักษณะใสเหมือนกระจก (glassy) ของเซลล์ที่ติดเชื้อนี้ เรียกว่าอะไร',
     ["cowdry type a", "cowdry a", "cowdry type a inclusion", "cowdry type a inclusions", "cowdry body"],
     'Glassy intranuclear inclusion (Cowdry type A) ใน multinucleated giant cells',
     img='hsv_tzanck', src='สไลด์ 63')
card('hsv-histo', 'virus', 'จงให้การวินิจฉัย (ชิ้นเนื้อจากแผล — ดูเซลล์ที่ลูกศรสีเขียวชี้)', HSV,
     'เซลล์ multinucleated ที่มี glassy intranuclear inclusion บนขอบแผล = HSV infection',
     img='hsv_histo', src='สไลด์ 64')
card('des-hsv', 'virus', 'จงบรรยายลักษณะของเซลล์ที่ติดเชื้อนี้',
     ["Multinucleated giant cells with glassy intranuclear inclusions (Cowdry type A)"],
     'สไลด์: Multinucleated giant cells with glassy intranuclear inclusion (Cowdry type A)',
     img='hsv_tzanck', src='สไลด์ 63',
     kw=[["multinucleated", "multinucleation", "giant cell", "giant cells"],
         ["glassy", "ground glass", "intranuclear inclusion", "cowdry"]])
card('hsv-pattern', 'virus', 'HSV ทำให้เกิดการอักเสบแบบใด',
     ["necrotizing inflammation", "necrotizing", "necrotising inflammation"],
     'HSV ทำให้เกิดการอักเสบและการตายของเนื้อเยื่อที่ติดเชื้อ (necrotizing inflammation)',
     img=None, src='สไลด์ 63')

card('mollusc-clin', 'virus', 'จงให้การวินิจฉัย (ตุ่มเล็ก ๆ หลายตุ่มที่ผิวหนัง)', MOL,
     'Molluscum contagiosum (หูดข้าวสุก): ตุ่มที่มีรอยบุ๋มตรงกลาง (umbilicated papule)',
     img='mollusc_clin', src='สไลด์ 65–66')
card('mollusc-umbilicated', 'virus', 'ลักษณะเฉพาะของตุ่มที่ลูกศรชี้เรียกว่าอะไร',
     ["umbilicated papule", "umbilicated", "umbilication", "central umbilication", "central dimple"],
     'Umbilicated papule — ตุ่มมีรอยบุ๋มตรงกลาง',
     img='mollusc_clin', src='สไลด์ 65–66')
card('mollusc-low', 'virus', 'จงให้การวินิจฉัย (ชิ้นเนื้อผิวหนัง)', MOL,
     'Epithelium เจริญหวำลงไปในเนื้อเยื่อด้านล่าง (endophytic growth) และพบ molluscum bodies',
     img='mollusc_low', src='สไลด์ 65–66')
card('mollusc-growth', 'virus', 'รูปแบบการเจริญของ epidermis ที่ลูกศรชี้เรียกว่าอะไร',
     ["endophytic growth", "endophytic", "endophytic proliferation"],
     'Endophytic growth — ตรงข้ามกับหูดจาก HPV ที่ยื่นออกไปด้านนอก (exophytic)',
     img='mollusc_low', src='สไลด์ 65–66')
card('mollusc-bodies', 'virus', 'สิ่งที่ลูกศรชี้คืออะไร',
     ["molluscum bodies", "molluscum body", "henderson patterson bodies", "henderson patterson body",
      "intracytoplasmic inclusions", "intracytoplasmic inclusion bodies"],
     'Molluscum bodies = intracytoplasmic inclusion of keratinocyte',
     img='mollusc_high', src='สไลด์ 65–66')
card('des-mollusc-body', 'virus', 'Molluscum body คือ inclusion ชนิดใด และอยู่ในเซลล์ใด',
     ["Intracytoplasmic inclusion of keratinocytes"],
     'สไลด์: Molluscum bodies (intracytoplasmic inclusion of keratinocyte)',
     img='mollusc_high', src='สไลด์ 65',
     kw=[["intracytoplasmic", "cytoplasmic"], ["keratinocyte", "keratinocytes", "squamous cells", "epidermal cells"]])

card('rabies-dx', 'virus', 'จงให้การวินิจฉัย (สมองของผู้ป่วยที่มีอาการกลัวน้ำ กลัวลม ก่อนเสียชีวิต)',
     ["rabies", "rabies encephalitis", "rabies virus infection", "โรคพิษสุนัขบ้า"],
     'Rabies (โรคพิษสุนัขบ้า) จาก rabies virus — microscopy พบ Negri bodies',
     img='rabies', src='สไลด์ 67–68')
card('rabies-negri', 'virus', 'สิ่งที่ลูกศรชี้คืออะไร',
     ["negri body", "negri bodies"],
     'Negri body: round to oval shaped eosinophilic intracytoplasmic inclusion in pyramidal cells',
     img='rabies', src='สไลด์ 68')
card('des-negri', 'virus', 'จงบรรยายลักษณะของสิ่งที่ลูกศรชี้',
     ["Round to oval, eosinophilic, intracytoplasmic inclusions in neurons"],
     'สไลด์: Negri bodies — round to oval intracytoplasmic, eosinophilic inclusions พบใน neurons โดยเฉพาะ pyramidal cells ของ hippocampus และ Purkinje cells ใน cerebellum',
     img='rabies', src='สไลด์ 67–68',
     kw=[["round", "oval", "round to oval"], ["eosinophilic", "pink"], ["intracytoplasmic", "cytoplasmic"],
         ["neuron", "neurons", "pyramidal cells", "purkinje cells", "neuronal"]])
card('rabies-site', 'virus', 'Negri bodies พบได้บ่อยในเซลล์ประสาทชนิดใด (ตอบ 1)',
     ["pyramidal cells of hippocampus", "pyramidal cells", "pyramidal neurons", "purkinje cells",
      "purkinje cells of cerebellum", "hippocampus", "cerebellum"],
     'โดยเฉพาะ pyramidal cells ของ hippocampus และ Purkinje cells ใน cerebellum',
     img='rabies', src='สไลด์ 67')

# ============================================================ Parasitic infection
card('strongy-gastric', 'parasite', 'จงให้การวินิจฉัย (ชิ้นเนื้อกระเพาะอาหารของผู้ป่วยที่ได้ยากดภูมิคุ้มกัน)', STR,
     'Gastric mucosa with Strongyloid larvae — ในผู้ป่วยภูมิคุ้มกันบกพร่อง ตัวอ่อนแพร่กระจาย (disseminated) จาก uncontrolled autoinfection',
     img='strongy_gastric', src='สไลด์ 69, 71')
card('strongy-arrow', 'parasite', 'สิ่งที่ลูกศรชี้คืออะไร',
     ["larvae", "larva", "strongyloides larvae", "strongyloid larvae", "filariform larvae", "rhabditiform larvae"],
     'Strongyloid larvae ที่ลุกลามเข้าเนื้อเยื่อ (Morphology: invasion of larvae in tissues)',
     img='strongy_gastric', src='สไลด์ 69, 71')
card('strongy-crypt', 'parasite', 'จงให้การวินิจฉัย (ชิ้นเนื้อลำไส้ — ดูสิ่งที่หัวลูกศรชี้ใน crypt)', STR,
     'ตัวอ่อนของ Strongyloides stercoralis อยู่ใน crypt ของลำไส้',
     img='strongy_crypt', src='สไลด์ 70')
card('strongy-auto', 'parasite', 'ในผู้ป่วยภูมิคุ้มกันบกพร่อง พยาธินี้แพร่กระจายทั่วร่างกายได้เพราะกลไกใด',
     ["uncontrolled autoinfection", "autoinfection", "auto infection", "hyperinfection"],
     'Immunocompromised: disseminated worms due to uncontrolled autoinfection, complicated by sepsis from intestinal bacteria',
     img='strongy_larva', src='สไลด์ 69')
card('strongy-sepsis', 'parasite', 'ภาวะแทรกซ้อนรุนแรงของ disseminated strongyloidiasis ที่เกิดจากแบคทีเรียในลำไส้คืออะไร',
     ["sepsis", "gram negative sepsis", "bacterial sepsis", "septicemia", "bacteremia", "septic shock"],
     'Sepsis from intestinal bacteria — ตัวอ่อนนำแบคทีเรียจากลำไส้เข้ากระแสเลือด',
     img=None, src='สไลด์ 69')
card('strongy-normal', 'parasite', 'ในคนภูมิคุ้มกันปกติ การติดเชื้อ Strongyloides stercoralis ทำให้เกิดอาการอะไร (ตอบ 1)',
     ["diarrhea", "diarrhoea", "malabsorption", "ท้องเสีย", "ท้องร่วง"],
     'Immunocompetent: diarrhea, malabsorption',
     img=None, src='สไลด์ 69')

card('entero-appendix', 'parasite', 'จงให้การวินิจฉัย (ไส้ติ่งที่ผ่าตัดออก — ดูสิ่งที่อยู่ในกรอบสีเหลือง)', ENT,
     'Enterobius vermicularis in appendix — พยาธิตัวกลม (pin worm/thread worm) อาจพบร่วมกับไส้ติ่งอักเสบ',
     img='entero_appendix', src='สไลด์ 72–73')
card('entero-alae', 'parasite', 'โครงสร้างที่ลูกศรสีเหลืองชี้ (สันที่ยื่นออกด้านข้างทั้งสองข้างของตัวพยาธิ) เรียกว่าอะไร',
     ["lateral alae", "bilateral alae", "alae", "lateral ala", "ala"],
     'Bilateral (lateral) alae — ลักษณะเฉพาะของ Enterobius เมื่อตัดตามขวาง',
     img='entero_alae', src='สไลด์ 74')
card('entero-org', 'parasite', 'จงบอกชื่อพยาธิ (ตัดขวางพยาธิตัวเมียที่มีไข่อยู่ภายใน)',
     ["enterobius vermicularis", "enterobius", "pinworm", "pin worm", "e vermicularis", "threadworm"],
     'Enterobius with bilateral alae — ภายในมีไข่จำนวนมาก',
     img='entero_eggs', src='สไลด์ 75')
card('entero-common', 'parasite', 'Enterobius vermicularis มีชื่อสามัญว่าอะไร',
     ["pinworm", "pin worm", "threadworm", "thread worm", "พยาธิเข็มหมุด"],
     'Enterobiasis (pin worm / thread worm)',
     img=None, src='สไลด์ 72')
card('entero-cells', 'parasite', 'บริเวณที่อักเสบจากตัวพยาธิที่ตายหรือไข่พยาธิ (Enterobius) มักพบเซลล์อักเสบชนิดใด',
     ["eosinophils", "eosinophil"],
     'Microscopy: พบเซลล์ eosinophils พร้อมกับตัวพยาธิที่ตายหรือไข่พยาธิปะปนในบริเวณที่อักเสบ',
     img=None, src='สไลด์ 72')
card('entero-sites', 'parasite', 'นอกจากลำไส้และไส้ติ่งแล้ว พยาธิ Enterobius ตัวเมียอาจพบได้ที่ใด (ตอบ 1)',
     ["perianal", "perianal region", "vagina", "uterus", "fallopian tube", "ovary", "รอบทวารหนัก", "ช่องคลอด",
      "มดลูก", "ปีกมดลูก", "รังไข่"],
     'สไลด์: อาจพบตัวแก่เพศเมียได้ที่รอบทวารหนัก ช่องคลอด มดลูก ปีกมดลูก หรือรังไข่ ทำให้เกิดการอักเสบในอวัยวะเหล่านั้น',
     img=None, src='สไลด์ 72')

card('trich-dx', 'parasite', 'จงให้การวินิจฉัย (ชิ้นเนื้อกล้ามเนื้อลายของผู้ป่วยที่กินเนื้อหมูดิบ มีไข้ ปวดกล้ามเนื้อ)', TRI,
     'Trichinellosis: encapsulated larvae in striated muscle',
     img='trich_labeled', src='สไลด์ 76, 78')
card('trich-A', 'parasite', 'สิ่งที่ป้าย A ชี้คืออะไร',
     ["inflammatory cells", "inflammatory cell", "inflammatory infiltrate", "eosinophils", "lymphocytes",
      "eosinophils and lymphocytes"],
     'Inflammatory cells รอบ capsule',
     img='trich_labeled', src='สไลด์ 78')
card('trich-B', 'parasite', 'สิ่งที่ป้าย B ชี้คืออะไร',
     ["capsule", "cyst wall", "capsule of larva", "nurse cell", "fibrous capsule"],
     'Capsule ที่หุ้มตัวอ่อน (encapsulated larvae)',
     img='trich_labeled', src='สไลด์ 78')
card('trich-C', 'parasite', 'สิ่งที่ป้าย C ชี้คืออะไร',
     ["larva", "larvae", "trichinella larva", "coiled larva", "encysted larva", "trichinella spiralis larva"],
     'Larvae ของ Trichinella spiralis ขดอยู่ใน capsule',
     img='trich_labeled', src='สไลด์ 78')
card('trich-org', 'parasite', 'จงบอกชื่อพยาธิ (ชิ้นเนื้อกล้ามเนื้อลาย)',
     ["trichinella spiralis", "trichinella", "t spiralis"],
     'Trichinella spiralis — encapsulated larvae in striated muscle',
     img='trich_cyst', src='สไลด์ 76–77')
card('trich-myositis', 'parasite', 'ในระยะแรก ตัวอ่อนทำลายเส้นใยกล้ามเนื้อลาย ทำให้เกิดภาวะใด',
     ["myositis", "acute myositis", "กล้ามเนื้ออักเสบ"],
     'Early stage cause myositis, because larvae destroy skeletal muscle fibers and eosinophils, lymphocytes infiltrate',
     img='trich_inflam', src='สไลด์ 76–77')
card('trich-cells', 'parasite', 'เซลล์อักเสบที่แทรกในกล้ามเนื้อระยะ myositis คือเซลล์ชนิดใด (ตอบ 1)',
     ["eosinophils", "eosinophil", "lymphocytes", "lymphocyte"],
     'Eosinophils และ lymphocytes infiltrate',
     img='trich_inflam', src='สไลด์ 76')
card('trich-dormant', 'parasite', 'ในระยะสงบ (dormant stage) รอบตัวอ่อนที่มีถุงหุ้ม มีปฏิกิริยาการอักเสบหรือไม่',
     ["no", "ไม่มี", "lack of inflammation", "no inflammation", "absent", "lack of inflammatory reaction"],
     'Lack of inflammatory reaction in dormant stage',
     img='trich_cyst', src='สไลด์ 76')

card('cryptospor-dx', 'parasite', 'จงให้การวินิจฉัย (ชิ้นเนื้อลำไส้เล็กส่วนต้นของผู้ป่วย AIDS ที่ท้องร่วงเป็นน้ำเรื้อรัง)', CSP,
     'Duodenum: small organism at luminal border = Cryptosporidium',
     img='cryptospor', src='สไลด์ 79–80')
card('cryptospor-arrow', 'parasite', 'สิ่งที่ลูกศรสีเขียวชี้ (ตามขอบ luminal border ของเยื่อบุ) คืออะไร',
     ["cryptosporidium", "cryptosporidium parvum", "cryptosporidium organisms", "c parvum"],
     'Small organism at luminal border — Cryptosporidium',
     img='cryptospor', src='สไลด์ 80')
card('cryptospor-stain', 'parasite', 'การตรวจอุจจาระเพื่อหาเชื้อ Cryptosporidium ใช้การย้อมสีวิธีใด',
     ["modified acid fast", "modified ziehl neelsen", "modified zn", "modified acid fast stain", "acid fast",
      "kinyoun"],
     'Dx: ตรวจอุจจาระโดยย้อมสี acid fast วิธี modified Ziehl–Neelsen จะพบ oocyst เส้นผ่าศูนย์กลางประมาณ 5 ไมโครเมตร',
     img=None, src='สไลด์ 79')
card('cryptospor-oocyst', 'parasite', 'เมื่อย้อมอุจจาระด้วย modified acid fast จะพบระยะใดของเชื้อ Cryptosporidium',
     ["oocyst", "oocysts"],
     'Oocyst ขนาดประมาณ 5 µm',
     img=None, src='สไลด์ 79')
card('cryptospor-clin', 'parasite', 'ผู้ป่วยกลุ่มใดมีอาการท้องร่วงจาก Cryptosporidium รุนแรง (ตอบ 1)',
     ["children", "immunocompromised", "immunocompromised patients", "aids", "hiv", "เด็ก", "ภูมิคุ้มกันบกพร่อง"],
     'คนปกติมักหายเองใน 1–2 สัปดาห์ แต่ในเด็กและคนภูมิคุ้มกันบกพร่องอาการท้องร่วงจะรุนแรง ถ่ายบ่อย (อุจจาระเป็นน้ำหรือมีมูก ไม่มีเลือด)',
     img=None, src='สไลด์ 79')

card('cysti-dx', 'parasite', 'จงให้การวินิจฉัย (ก้อนใต้ผิวหนัง)', CYS,
     'Cysticercosis in tissue: cyst formation surrounded by mixed inflammatory cells — ตัวอ่อน (cysticerci) ของพยาธิตืดหมู',
     img='cysticercus', src='สไลด์ 81–82')
card('cysti-A', 'parasite', 'สิ่งที่ป้าย A ชี้คืออะไร', ["scolex"],
     'Scolex ติดกับผนังของถุง',
     img='cysticercus', src='สไลด์ 82')
card('cysti-B', 'parasite', 'สิ่งที่ป้าย B ชี้คืออะไร',
     ["spiral canal", "convoluted spiral canal", "folding of spiral canal", "convoluted folding of spiral canal"],
     'Convoluted/extensive folding of spiral canal',
     img='cysticercus', src='สไลด์ 82')
card('cysti-C', 'parasite', 'สิ่งที่ป้าย C ชี้คืออะไร',
     ["cyst wall", "thin cyst wall", "thin wall of the cyst", "wall of cyst", "bladder wall"],
     'Thin wall of the cyst (attached to the host tissue)',
     img='cysticercus', src='สไลด์ 82')
card('cysti-org', 'parasite', 'Cysticercosis เกิดจากตัวอ่อนของพยาธิชนิดใด',
     ["taenia solium", "t solium", "pork tapeworm", "พยาธิตืดหมู"],
     'ตัวอ่อน (cysticerci) ของพยาธิตืดหมู (Taenia solium) ไปฝังตัวตามอวัยวะ เช่น subcutaneous tissue กล้ามเนื้อ สมอง ตับ ปอด และเยื่อบุช่องท้อง',
     img='cysticercus', src='สไลด์ 81')
card('des-cysti-dead', 'parasite', 'เมื่อตัวอ่อนในถุง (cysticercus) ตาย จะเกิดการเปลี่ยนแปลงรอบถุงอย่างไร',
     ["Fibrosis with many inflammatory cells (neutrophils, eosinophils, lymphocytes, epithelioid cells, giant cells) and calcification"],
     'สไลด์: มี fibrous เพิ่มขึ้นรอบถุง มีเซลล์อักเสบ (neutrophils, eosinophils, lymphocytes, epithelioid cell, giant cells) จำนวนมาก และแคลเซียมมาเกาะ ทำให้คลำได้เป็นตุ่มแข็งหรือเห็นได้จากภาพเอกซเรย์',
     img=None, src='สไลด์ 81',
     kw=[["fibrosis", "fibrous", "fibrous tissue"],
         ["inflammatory cells", "eosinophils", "neutrophils", "lymphocytes", "giant cells", "epithelioid"],
         ["calcification", "calcified", "แคลเซียม"]])
card('des-cysti-live', 'parasite', 'จงบรรยายลักษณะของถุง cysticercus ในระยะแรกขณะตัวอ่อนยังมีชีวิต',
     ["Thin, clear, white round cyst about 1 cm with clear fluid and a scolex attached to the wall, little inflammation"],
     'สไลด์: ถุงบางใส สีขาว กลม ขนาดประมาณ 1 ซม. ภายในมีน้ำใสพร้อม scolex ติดกับผนังถุง รอบ ๆ มีเซลล์อักเสบเพียงเล็กน้อย',
     img=None, src='สไลด์ 81',
     kw=[["thin", "clear", "translucent", "บางใส"], ["scolex"], ["little inflammation", "minimal inflammation",
          "few inflammatory cells", "เพียงเล็กน้อย"]])
