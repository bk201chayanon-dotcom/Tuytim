// Runs the page's own answer-checking code against every card.
const fs = require('fs');
const path = require('path');
const S = path.resolve(__dirname, '..');
const app = fs.readFileSync(path.join(S, 'app.js'), 'utf8');
const start = app.indexOf('  const CONFUSABLE');
const end = app.indexOf('const passed = (g)');
const endLine = app.indexOf('\n', end);
const code = app.slice(start, endLine);
const api = new Function(code + '\nreturn { norm, gradeCard, gradeTyped, gradeDescribe, passed: (g) => g.state === "exact" || g.state === "typo" };')();
const { cards } = JSON.parse(fs.readFileSync(path.join(S, '../cards.json'), 'utf8'));
const byId = Object.fromEntries(cards.map((c) => [c.id, c]));
let fail = 0;
const bad = (...m) => { fail++; console.log('FAIL', ...m); };

// 1. every accepted answer passes its own card
for (const c of cards) {
  if (c.keywords) {
    const g = api.gradeCard(c, c.answers[0]);
    if (g.state !== 'exact') bad('model answer misses points', c.id, g.points.filter((p) => !p.found).map((p) => p.label));
    for (const v of c.keywords) for (const p of v) {
      const g1 = api.gradeDescribe([v], p);
      if (g1.state !== 'exact') bad('keyword variant not found in itself', c.id, p);
    }
  } else {
    for (const a of c.answers) {
      const g = api.gradeCard(c, a);
      if (!api.passed(g)) bad('accepted answer fails', c.id, JSON.stringify(a));
    }
  }
}

// 2. answers that must be rejected / accepted
const expect = (id, input, want) => {
  const c = byId[id];
  if (!c) return bad('no card', id);
  const g = api.gradeCard(c, input);
  const got = api.passed(g);
  if (got !== want) bad(`${id}: "${input}" expected ${want ? 'pass' : 'fail'} got ${g.state}`);
};
[
  ['hbv-D', 'anti-HBc', false], ['hbv-D', 'anti HBs', true], ['hbv-D', 'Anti-HBs', true],
  ['hbv-A', 'HBeAg', false], ['hbv-A', 'HBs Ag', true], ['hbv-B', 'IgG anti-HBc', false],
  ['hbv-B', 'anti-HBc IgM', true], ['hbv-B', 'IgM anti HBc', true], ['hbv-C', 'IgM anti-HBc', false],
  ['hbv-C', 'anti-HBc', true], ['rpr-A', 'nonreactive', false], ['rpr-A', 'Reactive', true],
  ['rpr-B', 'reactive', false], ['rpr-B', 'non-reactive', true], ['rpr-B', 'non reactive', true],
  ['rpr-titer', '1:16', false], ['rpr-titer', '1:4', false], ['rpr-titer', '1:8', true], ['rpr-titer', '1/8', true],
  ['graph-B', 'nontreponemal', false], ['graph-B', 'treponemal IgG', true], ['graph-A', 'treponemal IgG', false],
  ['tb-langhans', 'langerhans giant cell', false], ['tb-langhans', "Langhans' giant cell", true],
  ['hpv-virus', 'HBV', false], ['hpv-virus', 'HPV', true], ['cmv-yellow', 'intracytoplasmic inclusion', false],
  ['cmv-red', 'intranuclear inclusion', false], ['cmv-red', 'intracytoplasmic inclusions', true],
  ['mollusc-growth', 'exophytic growth', false], ['verruca-yellow', 'parakeratosis', false],
  ['fu-4fold', '2 fold', false], ['fu-4fold', 'four-fold', true], ['hbv-cutoff', '100 mIU/mL', false],
  ['hbv-cutoff', '≥10 mIU/mL', true], ['tb-afb-org', 'Mycobacterium tuberculsis', true],
  ['pcp-gms', 'Pneumocystis jirovecci', true], ['strongy-gastric', 'strongyloidiasis', true],
  ['strongy-gastric', 'strongyloides stercolaris', true], ['tb-gross', 'TB', true], ['tb-gross', 'TBC', false],
  ['algo-bfp', 'biological false positive', true], ['algo-active', 'false positive', false],
  ['rdt-which', '3', false], ['rdt-which', '1', true], ['case-mcq', 'b', false], ['case-mcq', 'C', true],
  ['hbv-acute', 'chronic HBV infection', false], ['hbv-chronic', 'acute hepatitis B', false],
  ['hbv-chronic', 'chronic hepatitis B', true], ['syph-palms', 'primary syphilis', false],
  ['syph-palms', 'secondary syphilis', true], ['syph-chancre', 'secondary syphilis', false],
  ['pneu-gross', 'lobar pneumonia from S. pneumoniae', false], ['pneu-gross', 'lobar pnuemonia', true], ['gu-organism', 'H.pylori', true],
  ['pmc-organism', 'C. diff', true], ['pmc-toxin', 'toxin A and B', true], ['pmc-toxin', 'toxin A', false],
  ['hbv-one-assay', 'HBsAg positive', false], ['hbv-one-assay', 'HBsAg reactive', true],
  ['lab-ntt', 'treponemal test', false], ['lab-tt', 'nontreponemal test', false], ['lab-tt', 'treponemal', true],
  ['tpha-A', 'nonreactive', false], ['tpha-B', 'nonreactive', true], ['hcv-A', 'anti-HCV', false],
  ['hcv-C', 'anti HCV', true], ['cysti-A', 'scolex', true], ['cysti-A', 'scolices', false],
  ['algo-active', 'syphilis unlikely', false], ['algo-active', 'not syphilis', false], ['rpr-A', 'false positive', false],
  ['fu-success', 'inadequate response', false], ['fu-failure', 'adequate response', false], ['tpha-test', 'TPPA', false],
  ['tpha-test', 'TPHA', true], ['case-mcq', 'TPHA', true], ['hcv-C', 'anti-HIV', false], ['fu-failure-next', 'anti-HCV', false],
  ['fu-failure-next', 'anti-HIV', true], ['hbv-acute', 'occult HBV infection', false], ['sens-late', 'latent syphilis', false],
  ['syph-latent', 'late syphilis', false], ['algo-trad', 'quantitative RPR', false], ['mucor-pas', 'Mucor spp.', true],
  ['entero-common', 'pin-worm', true], ['entero-common', 'pinworms', true], ['pmc-gross1', 'pseudo membranous colitis', true],
  ['myc-granule', 'sulfer granules', true], ['hbv-recovered', 'HSV infection', false], ['hbv-acute', 'auto infection', false],
  ['algo-treated', 'current syphilis', false], ['neuro-indication', 'not syphilis', false], ['cand-pas', 'oral candidiasis', false],
  ['tb-gross', 'mycobacterium tuberculosis', false], ['gu-dx', 'gastric cancer', false], ['hp-neoplasm', 'gastric ulcer', false],
  ['hbv-D', 'HBsAb', true], ['hbv-A', 'HBsAb', false], ['asp-A', 'transverse septum', false],
].forEach(([id, input, want]) => expect(id, input, want));

// 3. describe answers
const expectD = (id, input, want) => {
  const g = api.gradeCard(byId[id], input);
  if (g.state !== want) bad(`${id}: "${input}" expected ${want} got ${g.state} ${g.hit}/${g.total}`);
};
expectD('des-mucor', 'broad nonseptate hyphae with right angle branching', 'exact');
expectD('des-mucor', 'broad septate hyphae with acute angle branching', 'partial');
expectD('des-asp', 'septate hyphae with acute angle branching', 'exact');
expectD('des-asp', 'non-septate hyphae with right angle branching', 'wrong');
expectD('des-graph-D', 'nontreponemal antibody after treatment', 'exact');
expectD('des-graph-D', 'nontreponemal untreated', 'partial');
expectD('des-graph-C', 'non-treponemal antibody, untreated', 'exact');
expectD('des-koilocyte', 'enlarged hyperchromatic nuclei with perinuclear halo', 'exact');
expectD('des-chancre', 'painless clean-based ulcer', 'exact');
expectD('des-chancre', 'แผลไม่เจ็บ พื้นแผลสะอาด', 'exact');
expectD('des-tb-granuloma', 'epithelioid histiocytes, langhans giant cells, lymphocytes and caseous necrosis', 'exact');
expectD('des-crypto', 'yeast 5-10 um with thick capsule', 'exact');
expectD('des-hbv-nhso', 'HBsAg และ anti-HBs', 'exact');
expectD('des-hbv-nhso', 'HBsAg and anti-HBc', 'partial');

console.log(fail ? `\n${fail} failures` : 'all grading checks passed', `(${cards.length} cards)`);
process.exit(fail ? 1 : 0);
