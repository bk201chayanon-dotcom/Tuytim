// Feeds every card the answers of all other cards. A pass that is not one of the
// card's own accepted answers means the fuzzy match is too lenient.
const fs = require('fs');
const path = require('path');
const S = path.resolve(__dirname, '..');
const app = fs.readFileSync(path.join(S, 'app.js'), 'utf8');
const start = app.indexOf('  const CONFUSABLE');
const endLine = app.indexOf('\n', app.indexOf('const passed = (g)'));
const api = new Function(app.slice(start, endLine) + '\nreturn { norm, gradeCard };')();
const { cards } = JSON.parse(fs.readFileSync(path.join(S, '../cards.json'), 'utf8'));
const allAnswers = new Set();
cards.forEach((c) => c.answers.forEach((a) => allAnswers.add(a)));
let n = 0;
for (const c of cards) {
  if (c.keywords) continue;
  const own = new Set(c.answers.map(api.norm));
  for (const a of allAnswers) {
    if (own.has(api.norm(a))) continue;
    const g = api.gradeCard(c, a);
    if (g.state === 'exact' || g.state === 'typo') { n++; console.log(`${c.id}: accepts "${a}" via "${g.target}"`); }
  }
}
console.log(n ? `${n} lenient matches` : 'no lenient cross matches');
