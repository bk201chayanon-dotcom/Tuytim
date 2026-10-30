// Runs the page's own answer-checking code against every part of every station.
const fs = require('fs');
const path = require('path');
const S = path.resolve(__dirname, '..');
const app = fs.readFileSync(path.join(S, 'app.js'), 'utf8');
const slice = (from, to) => app.slice(app.indexOf(from), app.indexOf('\n', app.indexOf(to)));
const code = slice('  function partsOf(card)', 'const isDescribe = ')
  + '\n' + slice('  const CONFUSABLE', 'const passed = (g)');
const api = new Function(code + '\nreturn { norm, gradeCard, gradePart, gradeTyped, gradeDescribe, passed };')();
const { cards } = JSON.parse(fs.readFileSync(path.join(S, '../cards.json'), 'utf8'));
const byId = Object.fromEntries(cards.map((c) => [c.id, c]));
let fail = 0;
const bad = (...m) => { fail++; console.log('FAIL', ...m); };

// 1. every accepted answer passes its own part; every model description hits all of its points
for (const c of cards) {
  c.parts.forEach((p, i) => {
    if (p.keywords) {
      const g = api.gradePart(p, p.answers[0]);
      if (g.state !== 'exact') bad('model answer misses points', c.id, i, g.points.filter((x) => !x.found).map((x) => x.label));
      for (const v of p.keywords) for (const w of v) {
        if (api.gradeDescribe([v], w).state !== 'exact') bad('keyword variant not found in itself', c.id, i, w);
      }
    } else {
      for (const a of p.answers) if (!api.passed(api.gradePart(p, a))) bad('accepted answer fails', c.id, i, JSON.stringify(a));
    }
  });
}

// 2. typed answers that must be accepted or rejected: [station, part, input, expected]
const expect = (id, i, input, want) => {
  const c = byId[id];
  if (!c || !c.parts[i]) return bad('no such part', id, i);
  const g = api.gradePart(c.parts[i], input);
  if (api.passed(g) !== want) bad(`${id}[${i}]: "${input}" expected ${want ? 'pass' : 'fail'} got ${g.state}`);
};
[
  ['s-sero-read-lab', 0, 'nonreactive', false], ['s-sero-read-lab', 0, 'Reactive', true], ['s-sero-read-lab', 1, 'reactive', false],
  ['s-sero-read-lab', 1, 'non-reactive', true], ['s-sero-read-lab', 1, 'non reactive', true], ['s-sero-read-lab', 3, 'nonreactive', true],
  ['s-sero-read-lab', 2, 'nonreactive', false], ['s-sero-read-62', 0, 'nonreactive', true], ['s-sero-read-62', 1, 'nonreactive', false],
  ['s-sero-read-62', 2, 'BFP', true], ['s-sero-read-62', 2, 'false negative', false],
  ['s-sero-titer', 0, '1:16', false], ['s-sero-titer', 0, '1:4', false], ['s-sero-titer', 0, '1:8', true], ['s-sero-titer', 0, '1/8', true],
  ['s-sero-titer', 1, '2 fold', false], ['s-sero-titer', 1, 'four-fold', true],
  ['s-sero-classify', 0, 'treponemal test', false], ['s-sero-classify', 0, 'non-treponema test', true],
  ['s-sero-classify', 1, 'nontreponemal', true], ['s-sero-classify', 2, 'nontreponemal test', false],
  ['s-sero-classify', 2, 'treponemal', true], ['s-sero-classify', 3, 'treponema test', true], ['s-sero-classify', 3, 'non treponemal', false],
  ['s-sero-bfp', 0, 'biological false positive', true], ['s-sero-bfp', 0, 'false negative', false], ['s-sero-bfp', 1, 'SLE', true],
  ['s-sero-bfp', 1, 'leprosy', true], ['s-sero-bfp', 1, 'malaria', true],
  ['s-sero-active', 0, 'false positive', false], ['s-sero-active', 0, 'syphilis unlikely', false], ['s-sero-active', 0, 'not syphilis', false],
  ['s-sero-active', 0, 'active syphilis', true], ['s-sero-treated', 0, 'current syphilis', false],
  ['s-sero-treated', 0, 'prior treated syphilis', true], ['s-sero-treated', 0, 'untreated syphilis', false],
  ['s-sero-early', 0, 'early primary syphilis', true], ['s-sero-early', 0, 'secondary syphilis', false],
  ['s-sero-early', 0, 'prozone phenomenon', false], ['s-sero-followup', 0, 'serofast', true], ['s-sero-followup', 0, 'reinfection', true],
  ['s-sero-followup', 0, 're-infection', true], ['s-sero-followup', 0, 'treatment failure', true], ['s-sero-followup', 1, 'RPR', true],
  ['s-sero-followup', 1, 'TPHA', false], ['s-sero-followup', 1, 'VDRL', true],
  ['s-sero-reverse-past', 0, 'syphilis past or present', true], ['s-sero-reverse-past', 0, 'syphilis unlikely', false],
  ['s-sero-reverse-past', 1, 'cured syphilis', true], ['s-sero-reverse-past', 1, 'untreated syphilis', false],
  ['s-sero-unlikely', 0, 'syphilis unlikely', true], ['s-sero-unlikely', 0, 'active syphilis', false],
  ['s-stage-palms', 0, 'primary syphilis', false], ['s-stage-palms', 0, 'secondary syphilis', true], ['s-stage-palms', 0, 'secondary', true],
  ['s-stage-palms', 0, 'secondary syphillis', true], ['s-stage-chancre', 0, 'secondary syphilis', false], ['s-stage-chancre', 0, 'primary', true],
  ['s-stage-chancre', 1, 'chancre', true], ['s-stage-chancre', 1, 'chancroid', false],
  ['s-stage-63', 1, 'tertiary syphilis', true], ['s-stage-63', 1, 'secondary syphilis', false], ['s-stage-62', 0, 'secondary', true],
  ['s-stage-congenital', 0, 'late congenital syphilis', false], ['s-stage-congenital', 0, 'early congenital syphilis', true],
  ['s-stage-congenital', 1, 'congenital syphilis', true], ['s-stage-congenital', 1, 'early congenital syphilis', false],
  ['s-stage-congenital', 2, "Hutchinson's teeth", true], ['s-stage-alopecia', 1, 'moth eaten alopecia', true],
  ['s-stage-alopecia', 1, 'alopecia areata', false], ['s-stage-clata', 0, 'condylomata lata', true],
  ['s-stage-clata', 0, 'condyloma acuminata', false],
  ['s-koilocyte', 2, 'HBV', false], ['s-koilocyte', 2, 'HPV', true], ['s-koilocyte', 1, 'koilocytes', true],
  ['s-condy-perianal', 0, 'condyloma lata', false], ['s-condy-perianal', 0, 'condyloma acuminatum', true], ['s-condy-perianal', 1, 'HSV', false],
  ['s-cmv', 1, 'intracytoplasmic inclusion', false], ['s-cmv', 1, "owl's eye inclusion", true], ['s-cmv', 0, 'CMV infection', true],
  ['s-cmv', 0, 'HSV infection', false],
  ['s-strongy-gastric', 0, 'strongyloidiasis', true], ['s-strongy-gastric', 1, 'strongyloides stercolaris', true],
  ['s-strongy-crypt', 1, 'Strongyloides stercoralis', true], ['s-strongy-crypt', 1, 'Enterobius vermicularis', false],
  ['s-lobar', 0, 'lobar pnuemonia', true], ['s-lobar', 0, 'lobar pneumonia from S. pneumoniae', false],
  ['s-lobar', 1, 'Streptococcus pneumoniae', true], ['s-lobar', 1, 'S.pneumoniae', true], ['s-lobar', 1, 'Staphylococcus aureus', false],
  ['s-pmc-a55', 1, 'C. diff', true], ['s-pmc-a55', 0, 'pseudo membranous colitis', true], ['s-pmc-a55', 1, 'Clostridium perfringens', false],
  ['s-pmc-histo', 0, 'pseudomembranous colitis', true],
  ['s-trich-inflam', 0, 'trichuriasis', false], ['s-trich-inflam', 0, 'trichinosis', true], ['s-trich-inflam', 0, 'trichinelosis', true],
  ['s-trich-inflam', 1, 'Trichuris spiralis', false], ['s-trich-inflam', 1, 'Trichinella spiralis', true],
  ['s-asp-gms', 1, 'aspergilloma', false], ['s-asp-gms', 1, 'aspergillosis', true], ['s-asp-gms', 1, 'mucormycosis', false],
  ['s-mucor', 1, 'Mucor spp.', true], ['s-mucor', 1, 'aspergillosis', false],
  ['s-eumyc-hyphae', 1, 'eumycotic mycetoma', true], ['s-eumyc-hyphae', 1, 'eumycetoma', true],
  ['s-eumyc-hyphae', 1, 'actinomycotic mycetoma', false], ['s-eumyc-hyphae', 1, 'mycetoma', false],
  ['s-cand-thrush', 0, 'oral candidiasis', true], ['s-cand-thrush', 0, 'oral thrush', true], ['s-cand-thrush', 1, 'candida albicans', true],
  ['s-cand-thrush', 1, 'candida tropicalis', false], ['s-cand-tongue', 0, 'candidiasis', true],
  ['s-mollusc-bodies', 0, 'molluscum bodies', true], ['s-mollusc-bodies', 0, 'Henderson-Patterson bodies', true],
  ['s-mollusc-bodies', 0, 'Negri bodies', false], ['s-mollusc-bodies', 1, 'molluscum contagiosum', true],
  ['s-mollusc-low', 1, 'poxvirus', true], ['s-rabies', 0, 'Negri body', true], ['s-rabies', 0, 'molluscum body', false],
  ['s-talaro', 0, 'talaromycosis', true], ['s-talaro', 0, 'penicilliosis', true], ['s-talaro', 0, 'maduromycosis', false],
  ['s-talaro', 0, 'histoplasmosis', false], ['s-talaro', 1, 'binary fission', true],
  ['s-cryptospor', 1, 'cryptosporidiosis', true], ['s-cryptospor', 1, 'cryptococcosis', false],
  ['s-crypto-bm', 1, 'cryptococcosis', true], ['s-crypto-bm', 1, 'cryptosporidiosis', false], ['s-crypto-ink', 0, 'India ink', true],
  ['s-entero', 1, 'enterobiasis', true], ['s-entero', 1, 'pin-worm', true],
  ['s-cysticercus', 2, 'scolex', true], ['s-cysticercus', 2, 'scolices', false], ['s-cysticercus', 1, 'cysticercosis', true],
  ['hbv-acute', 0, 'chronic HBV infection', false], ['hbv-chronic', 0, 'acute hepatitis B', false],
  ['hbv-chronic', 0, 'chronic hepatitis B', true], ['hbv-acute', 0, 'occult HBV infection', false],
  ['s-hp', 0, 'H.pylori', true], ['s-tb', 1, 'TB', true], ['s-tb', 1, 'TBC', false], ['s-pcp', 1, 'Pneumocystis jirovecci', true],
  // predicted stations
  ['s-myc-foot', 0, 'mycetoma', true], ['s-myc-foot', 0, 'madura foot', true], ['s-myc-foot', 1, 'sulphur granule', true],
  ['s-eumyc-labels', 0, 'suppurative granuloma', true], ['s-eumyc-labels', 1, 'epithelioid histiocytes', true],
  ['s-eumyc-labels', 1, 'neutrophils', false], ['s-eumyc-labels', 2, 'pigmented fungal hyphae', true],
  ['s-sh-labels', 1, 'eosinophilic material', true], ['s-sh-labels', 1, 'basophilic material', false],
  ['s-sh-labels', 2, 'Splendore Hoeppli phenomenon', true], ['s-pmc-labels', 0, 'necrotic gland', true], ['s-pmc-labels', 1, 'fibrin', true],
  ['s-cand-labels', 0, 'pseudohyphae', true], ['s-cand-labels', 0, 'true hyphae', false], ['s-cand-labels', 1, 'yeast', true],
  ['s-cand-diaper', 0, 'candidiasis', true], ['s-cand-diaper', 1, 'candida albicans', true],
  ['s-asp-ball', 0, 'aspergilloma', true], ['s-asp-ball', 0, 'aspergillosis', false], ['s-asp-ball', 0, 'fungus ball', true],
  ['s-hsv-tzanck', 1, 'Cowdry type A', true], ['s-hsv-tzanck', 1, 'Cowdry type B', false], ['s-hsv-tzanck', 2, 'Tzanck smear', true],
  ['s-mollusc-clin', 1, 'umbilicated papule', true], ['s-trich-labels', 0, 'capsule', true], ['s-trich-labels', 1, 'larva', true],
  ['s-crypto-muci', 0, 'mucicarmine', true], ['s-crypto-muci', 0, 'mucin stain', true], ['s-crypto-muci', 0, 'PAS', false],
  ['s-mucor-gms', 1, 'mucormycosis', true], ['s-entero-appendix', 1, 'pinworm', true],
  ['s-tb-gross', 1, 'caseous necrosis', true], ['s-tb-gross', 1, 'coagulative necrosis', false],
  ['s-tb-gross', 1, 'liquefactive necrosis', false], ['s-tb-afb', 0, 'Ziehl-Neelsen stain', true], ['s-tb-afb', 0, 'Gram stain', false],
  ['s-tb-afb', 1, 'AFB', true], ['s-tb-miliary', 0, 'miliary TB', true], ['s-tb-miliary', 0, 'pulmonary tuberculosis', false],
  ['s-gastric-ulcer', 0, 'peptic ulcer', true], ['s-gastric-ulcer', 1, 'H. pylori', true], ['s-gastritis', 0, 'acute gastritis', true],
  ['s-gastritis', 0, 'chronic gastritis', false], ['s-hp-ihc', 0, 'IHC', true], ['s-verruca', 2, 'papillomatosis', true],
  ['s-verruca', 2, 'hyperkeratosis', false],
  ['s-sero-rdt', 0, '1', true], ['s-sero-rdt', 0, '2', false], ['s-sero-rdt', 1, 'nonreactive', true], ['s-sero-rdt', 1, 'reactive', false],
  ['s-sero-rdt', 2, 'control line', true], ['s-sero-rdt', 3, 'treponemal', true], ['s-sero-rdt', 3, 'nontreponemal', false],
  ['s-sero-graph', 0, 'treponemal IgM', true], ['s-sero-graph', 0, 'treponemal IgG', false], ['s-sero-graph', 1, 'treponemal IgG', true],
  ['s-sero-graph', 1, 'nontreponemal', false], ['s-sero-graph', 2, 'nontreponemal antibodies', true],
  ['s-sero-graph', 2, 'treponemal antibody', false], ['s-sero-graph', 3, 'D', true], ['s-sero-graph', 3, 'C', false],
  ['s-sero-prozone', 0, 'prozone phenomenon', true], ['s-sero-window', 0, 'repeat test in 2 weeks', true],
  ['s-sero-window', 0, 'repeat test in 4 weeks', false], ['s-sero-dfa', 0, 'DFA', true], ['s-sero-dfa', 2, 'dark field microscopy', true],
  ['s-sero-dfa', 2, 'RPR', false], ['s-sero-neuro', 0, 'CSF-VDRL', true], ['s-sero-neuro', 0, 'CSF-FTA', false],
  ['s-sero-neuro', 1, 'all stages', true], ['s-sero-neuro', 1, 'tertiary', false],
  ['s-stage-cvs', 0, 'syphilitic aortitis', true], ['s-stage-cvs', 1, 'tertiary', true], ['s-stage-cvs', 1, 'secondary', false],
  ['s-stage-cvs', 2, 'aortic regurgitation', true], ['s-stage-cvs', 2, 'aortic stenosis', false],
  ['s-stage-tongue', 0, 'mucous patch', true], ['s-stage-clata-abc', 0, 'condyloma lata', true],
  ['s-hbv-graph-acute', 1, 'IgM anti-HBc', true], ['s-hbv-graph-acute', 2, 'IgM anti-HBc', false],
  ['s-hbv-graph-acute', 3, 'anti-HBc', false], ['s-hbv-graph-acute', 3, 'anti HBs', true], ['s-hbv-graph-acute', 0, 'HBeAg', false],
  ['s-hbv-graph-chronic', 2, 'IgM anti-HBc', true], ['s-hbv-graph-chronic', 1, 'total anti-HBc', true],
  ['s-hcv-graph', 0, 'HCV RNA', true], ['s-hcv-graph', 0, 'HCV DNA', false], ['s-hcv-graph', 2, 'anti-HCV', true],
  ['s-hcv-graph', 2, 'anti-HIV', false], ['s-hcv-graph', 3, 'serologic window', true],
  ['hbv-isolated', 0, 'isolated anti-HBc', true], ['hbv-isolated', 0, 'isolated anti-HBs', false], ['hbv-isolated', 1, 'occult HBV infection', true],
  // Hemato II
  ['h-cml-scan', 0, 'chronic myeloid leukaemia', true], ['h-cml-scan', 0, 'CML', true], ['h-cml-scan', 0, 'AML', false],
  ['h-cml-scan', 0, 'acute myeloid leukemia', false], ['h-cml-scan', 0, 'chronic lymphocytic leukemia', false],
  ['h-cml-scan', 1, 't(9;22)', true], ['h-cml-scan', 1, 't(9,22)', true], ['h-cml-scan', 1, 'philadelphia chromosome', true],
  ['h-cml-scan', 1, 't(14;18)', false], ['h-cml-scan', 1, 't(9;21)', false],
  ['h-mm-62', 0, 'multiple myeloma', true], ['h-mm-62', 0, 'plasma cell myeloma', true], ['h-mm-62', 0, 'CML', false],
  ['h-mm-62', 1, 'plasma cells', true], ['h-mm-62', 1, 'B cell', true], ['h-mm-62', 1, 'T cell', false],
  ['h-mm-63', 1, 'globulin', true], ['h-mm-63', 1, 'gamma globulin', true], ['h-mm-63', 1, 'albumin', false],
  ['h-lbl', 0, 'lymphoblasts', true], ['h-lbl', 0, 'lymphocytes', false], ['h-lbl', 0, 'myeloblasts', false],
  ['h-lbl', 1, 'T-lymphoblastic lymphoma', true], ['h-lbl', 1, 'T-ALL', true], ['h-lbl', 1, 'lymphocytic lymphoma', false],
  ['h-aml', 0, 'acute myelocytic leukemia', true], ['h-aml', 0, 'AML', true], ['h-aml', 0, 'ALL', false],
  ['h-aml', 0, 'acute lymphoblastic leukemia', false], ['h-aml', 1, 'myeloblasts', true], ['h-aml', 1, 'lymphoblasts', false],
  ['h-aml', 1, 'myelocytes', false], ['h-aml', 2, '20%', true], ['h-aml', 2, '30%', false],
  ['h-all', 0, 'acute lymphoblastic leukaemia', true], ['h-all', 0, 'acute lymphocytic leukemia', true],
  ['h-all', 0, 'acute myeloid leukemia', false], ['h-all', 0, 'chronic lymphocytic leukemia', false],
  ['h-blasts', 0, 'myeloblast', true], ['h-blasts', 1, 'myeloblasts', false], ['h-blasts', 1, 'lymphoblast', true],
  ['h-cll', 0, 'CLL', true], ['h-cll', 0, 'small lymphocytic lymphoma', true], ['h-cll', 0, 'chronic lymphoblastic leukemia', false],
  ['h-cll', 0, 'acute lymphocytic leukemia', false], ['h-cll', 2, 'small', true], ['h-cll', 2, 'large', false],
  ['h-bm-normal', 0, 'megakaryocyte', true], ['h-bm-normal', 0, 'myelocyte', false], ['h-bm-normal', 1, 'erythroid precursors', true],
  ['h-bm-normal', 1, 'granulocytic cells', false], ['h-bm-normal', 2, 'granulocytes', true], ['h-bm-normal', 2, 'erythroid cells', false],
  ['h-cml-high', 2, 'smaller than normal', true], ['h-cml-high', 2, 'dwarf megakaryocytes', true], ['h-cml-high', 2, 'larger', false],
  ['h-dlbcl', 0, 'diffuse large B cell lymphoma', true], ['h-dlbcl', 0, 'DLBCL', true], ['h-dlbcl', 0, 'diffuse large T cell lymphoma', false],
  ['h-dlbcl', 0, 'follicular lymphoma', false], ['h-dlbcl', 1, 'centroblasts', true], ['h-dlbcl', 1, 'immunoblast', true],
  ['h-dlbcl', 1, 'centrocytes', false],
  ['h-mantle', 0, 'mantle zone', true], ['h-mantle', 0, 'marginal zone', false], ['h-mantle', 0, 'germinal center', false],
  ['h-mantle', 1, 'mantle cell lymphoma', true], ['h-mantle', 1, 'marginal zone lymphoma', false],
  ['h-gc', 0, 'germinal centre', true], ['h-gc', 0, 'mantle zone', false],
  ['h-fl', 0, 'follicular lymphoma', true], ['h-fl', 0, 'follicular hyperplasia', false], ['h-fl', 1, 't(14;18)', true],
  ['h-fl', 1, 't(14:18)', true], ['h-fl', 1, 'BCL2 translocation', true], ['h-fl', 1, 't(9;22)', false], ['h-fl', 1, 't(11;14)', false],
  ['h-fl-cells', 0, 'centrocytes', true], ['h-fl-cells', 0, 'small cleaved cells', true], ['h-fl-cells', 0, 'centroblasts', false],
  ['h-fl-cells', 0, 'large noncleaved cells', false], ['h-fl-cells', 1, 'centroblast', true], ['h-fl-cells', 1, 'large non-cleaved cell', true],
  ['h-fl-cells', 1, 'centrocyte', false], ['h-fl-cells', 1, 'small cleaved cell', false],
  ['h-kikuchi', 0, 'Kikuchi-Fujimoto disease', true], ['h-kikuchi', 0, 'kikuchi lymphadenitis', true], ['h-kikuchi', 0, 'kimura disease', false],
  ['h-kikuchi', 1, 'benign', true], ['h-kikuchi', 1, 'malignant', false], ['h-kikuchi-cells', 2, 'karyorrhectic debris', true],
  ['h-hl-rs', 0, 'Reed Sternberg cells', true], ['h-hl-rs', 0, 'RS cell', true], ['h-hl-rs', 0, 'Langhans giant cell', false],
  ['h-hl-rs', 1, 'Hodgkin lymphoma', true], ['h-hl-rs', 1, "Hodgkin's lymphoma", true], ['h-hl-rs', 1, 'hodgkins disease', true],
  ['h-hl-rs', 1, 'non-Hodgkin lymphoma', false], ['h-hl-rs', 2, 'eosinophils', true], ['h-hl-rs', 2, 'neutrophils', false],
  ['h-met-scc', 0, 'keratin pearls', true], ['h-met-scc', 1, 'metastatic squamous cell carcinoma', true],
  ['h-met-scc', 1, 'metastatic adenocarcinoma', false], ['h-met-scc', 2, 'larynx', true], ['h-met-scc', 2, 'colon', false],
  ['h-met-scc', 2, 'breast', false],
  ['h-malt', 0, 'MALT lymphoma', true], ['h-malt', 0, 'MALToma', true], ['h-malt', 0, 'mantle cell lymphoma', false],
  ['h-malt', 1, 'low grade', true], ['h-malt', 1, 'high grade', false],
  ['h-kimura', 0, "Kimura's disease", true], ['h-kimura', 0, 'Kikuchi disease', false], ['h-kimura', 1, 'eosinophils', true],
  ['h-kimura', 1, 'neutrophils', false], ['h-kimura', 1, 'basophils', false],
  ['h-richter', 0, 'DLBCL', true], ['h-richter', 1, 'CLL', true], ['h-richter', 1, 'lymphoblastic lymphoma', false],
  ['h-gc-cells', 0, 'centroblast', true], ['h-gc-cells', 0, 'centrocyte', false], ['h-gc-cells', 2, 'tingible body macrophages', true],
  ['h-rh-zones', 0, 'mantle zone', true], ['h-rh-zones', 1, 'germinal center', true], ['h-rh-zones', 2, 'MCL', true],
  ['h-rh-zones', 2, 'follicular lymphoma', false],
  ['h-rh', 0, 'reactive follicular hyperplasia', true], ['h-rh', 0, 'follicular lymphoma', false],
  ['h-rh', 0, 'reactive lymphoid hypoplasia', false],
  ['h-hl-variants', 0, 'mononuclear variant', true], ['h-hl-variants', 0, 'lacunar cell', false], ['h-hl-variants', 1, 'lacunar cells', true],
  ['h-hl-variants', 1, 'mononuclear variant', false], ['h-hl-variants', 2, 'classic hodgkin lymphoma', true],
  ['h-hl-low', 0, 'fibrosis', true], ['h-hl-low', 0, 'fibrous bands', true],
  ['h-fl-follicles', 0, 'neoplastic follicles', true], ['h-fl-follicles', 0, 'reactive follicles', false],
  ['h-fl-follicles', 1, 'reactive follicles', true], ['h-fl-follicles', 1, 'neoplastic follicles', false],
  ['h-malt-cells', 1, 'monocytoid B cells', true], ['h-malt-cells', 1, 'plasma cells', false],
  ['h-origin', 0, 'MCL', true], ['h-origin', 1, 'SLL', true], ['h-origin', 1, 'small lymphocytic lymphoma', true],
  ['h-origin', 1, 'lymphoblastic lymphoma', false], ['h-origin', 2, 'MALT lymphoma', true], ['h-origin', 2, 'mantle cell lymphoma', false],
  ['h-origin', 3, 'peripheral T-cell lymphoma', true], ['h-origin', 3, 'B-cell lymphoma', false],
  ['h-dlbcl-low', 1, 'large', true], ['h-dlbcl-low', 1, 'small', false], ['h-dlbcl-low', 2, 'DLBCL', true],
  ['h-met-low', 1, 'tumour cells', true], ['h-met-low', 2, 'metastatic carcinoma', true],
].forEach(([id, i, input, want]) => expect(id, i, input, want));

// 3. described answers: [station, part, input, expected state]
[
  ['s-mucor', 0, 'broad nonseptate hyphae with right angle branching', 'exact'],
  ['s-mucor', 0, 'broad septate hyphae with acute angle branching', 'partial'],
  ['s-asp-gms', 0, 'septate hyphae with acute angle branching', 'exact'],
  ['s-asp-gms', 0, 'non-septate hyphae with right angle branching', 'wrong'],
  ['s-koilocyte', 0, 'enlarged hyperchromatic nuclei with perinuclear halo', 'exact'],
  ['s-eumyc-hyphae', 0, 'pigmented fungal hyphae with suppurative granuloma', 'exact'],
  ['s-eumyc-hyphae', 0, 'fungal hyphae', 'partial'],
  ['s-eumyc-sh', 0, 'fungal hyphae with suppurative granuloma and Splendore-Hoeppli phenomenon', 'exact'],
  ['s-eumyc-dark', 0, 'dark brown pigmented hyphae surrounded by neutrophils', 'exact'],
  ['s-hsv-histo', 0, 'multinucleated giant cells with ground glass intranuclear inclusions', 'exact'],
  ['s-hsv-histo', 0, 'multinucleated giant cells', 'partial'],
  ['s-hsv-lip', 0, 'group of vesicles around the mouth, multinucleated giant cells with glassy intranuclear inclusion', 'exact'],
  ['s-cryptospor', 0, 'small organisms at luminal border', 'exact'],
  ['s-crypto-bm', 0, 'yeast with thick gelatinous capsule', 'exact'],
  ['s-cand-histo', 0, 'yeast, budding yeast, pseudohyphae', 'exact'],
  ['s-cand-histo', 0, 'septate hyphae', 'wrong'],
  ['s-entero', 0, 'organism with bilateral alae in gut lumen', 'exact'],
  ['s-cysticercus', 0, 'cyst formation surrounded by mixed inflammatory cells', 'exact'],
  ['s-tb', 0, 'granuloma with epithelioid histiocytes and Langhans giant cells', 'exact'],
  ['s-trich-cyst', 0, 'coiled larva encapsulated in skeletal muscle', 'exact'],
  ['s-myc-foot', 2, 'bacteria and fungi', 'exact'], ['s-myc-foot', 2, 'fungi', 'partial'],
  ['s-asp-ball', 1, 'fungus ball in a pre-existing cavity without tissue invasion', 'exact'],
  ['s-sero-prozone', 1, 'dilute the serum and retest', 'exact'], ['s-hp-ihc', 1, 'curved rods at the mucosal surface', 'exact'],
  ['s-mucor-gms', 0, 'broad aseptate hyphae with right angle branching', 'exact'],
  ['h-cml-high', 1, 'granulocytes, mostly mature and band forms', 'exact'], ['h-cml-high', 1, 'granulocytic cells', 'partial'],
  ['h-all', 1, 'scanty cytoplasm, no granules', 'exact'],
  ['h-gc', 1, 'follicular lymphoma and Burkitt lymphoma', 'exact'], ['h-gc', 1, 'follicular lymphoma', 'partial'],
  ['h-starry', 0, 'Burkitt lymphoma, DLBCL', 'exact'],
  ['h-kikuchi-cells', 0, 'crescentic nuclei', 'exact'], ['h-kikuchi-cells', 1, 'transformed lymphoid cells', 'exact'],
  ['h-hl-low', 1, 'effaced architecture', 'exact'],
  ['h-fl-follicles', 2, 'back to back follicles with indistinct mantle zone', 'exact'], ['h-fl-follicles', 2, 'back to back', 'partial'],
  ['h-malt-cells', 0, 'invade all layers to serosa', 'exact'], ['h-dlbcl-low', 0, 'effacement of normal architecture', 'exact'],
].forEach(([id, i, input, want]) => {
  const g = api.gradePart(byId[id].parts[i], input);
  if (g.state !== want) bad(`${id}[${i}]: "${input}" expected ${want} got ${g.state} ${g.hit}/${g.total}`);
});

// 4. a whole station is graded part by part
const st = api.gradeCard(byId['s-lobar'], ['lobar pneumonia', 'staph aureus']);
if (st.length !== 2 || !api.passed(st[0]) || api.passed(st[1])) bad('gradeCard does not grade each part on its own');

const parts = cards.reduce((n, c) => n + c.parts.length, 0);
console.log(fail ? `\n${fail} failures` : 'all grading checks passed', `(${cards.length} stations, ${parts} parts)`);
process.exit(fail ? 1 : 0);
