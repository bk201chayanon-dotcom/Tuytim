// Feeds every typed part the answers of all other parts. A pass that is not one of the
// part's own accepted answers means the fuzzy match is too lenient.
const fs = require('fs');
const path = require('path');
const S = path.resolve(__dirname, '..');
const app = fs.readFileSync(path.join(S, 'app.js'), 'utf8');
const slice = (from, to) => app.slice(app.indexOf(from), app.indexOf('\n', app.indexOf(to)));
const code = slice('  function partsOf(card)', 'const isDescribe = ')
  + '\n' + slice('  const CONFUSABLE', 'const passed = (g)');
const api = new Function(code + '\nreturn { norm, gradePart };')();
const { cards } = JSON.parse(fs.readFileSync(path.join(S, '../cards.json'), 'utf8'));
const allAnswers = new Set();
cards.forEach((c) => c.parts.forEach((p) => p.answers.forEach((a) => allAnswers.add(a))));
let n = 0;
for (const c of cards) {
  c.parts.forEach((p, i) => {
    if (p.keywords) return;
    const own = new Set(p.answers.map(api.norm));
    for (const a of allAnswers) {
      if (own.has(api.norm(a))) continue;
      const g = api.gradePart(p, a);
      if (g.state === 'exact' || g.state === 'typo') { n++; console.log(`${c.id}[${i}]: accepts "${a}" via "${g.target}"`); }
    }
  });
}
console.log(n ? `${n} lenient matches` : 'no lenient cross matches');
