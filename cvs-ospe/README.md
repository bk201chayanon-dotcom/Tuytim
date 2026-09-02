# CVS Pathology OSPE Recall

Flashcard app for drilling gross/micro specimen recognition ahead of the CVS
pathology OSPE, built from `LAB CVS-med3-69.pdf` (La-or Chompuk, M.D., Dept. of Pathology).

## Run it

Open `index.html` directly in a browser (double-click, or `file://...`), or serve the
folder with any static server, e.g.:

```
python3 -m http.server 8000
# then open http://localhost:8000/index.html
```

All logic (study flow, SM-2 spaced repetition, Levenshtein spell-checking, exam
mode, card CRUD, review workflow, import/export) lives in the single
`index.html` file — no build step, no server-side code, no external API calls.
Card metadata is embedded directly in the HTML; all state (SRS progress, your
edits, approvals) is stored in this browser's IndexedDB (`cvsOspeDB`).

**Why images aren't inlined too:** the 94 extracted specimen photos total ~94 MB
at full lossless resolution (deliberately not downscaled, since micro detail
matters for OSPE recall). Base64-inlining that into the HTML would triple
load time for no benefit, so images stay as separate files in `images/cvs/`
next to `index.html`, loaded by relative path. **Export** (Import/Export tab)
still produces one fully self-contained JSON file with every image embedded
as base64, so a classmate can receive a single file and re-import it with no
missing assets.

## First run: Review before studying

Every extracted card starts in `pending` review status and is **excluded**
from Study and Exam mode until approved. Open the **Review** tab first:

- Grid of every extracted image (77 total: 72 diagnosis cards + 5
  diagram/table cards excluded from the diagnosis flow).
- Click a thumbnail to toggle cropped vs. original image (useful for cards
  where a burned-in label was cropped/masked out).
- `answerVisible` badge = this card's image had a leak that was cropped or
  redacted (label boxes filled in, not just hidden with CSS).
- `reviewNeeded` badge = diagnosis/etiology inferred from slide context
  rather than explicit lecture text — double check before trusting it (4
  cards: CVS-008, CVS-023, CVS-024, CVS-046).
- Approve individually, or "Approve ทั้งหมดที่เหลือ" to bulk-approve everything
  not already rejected.

## Content notes / known gaps

- All 77 images were manually viewed and checked for burned-in answer text
  (diagnosis captions, arrow labels, textbook figure legends). Where found,
  the leaking pixels were cropped or painted over — never hidden with CSS.
  See `reviewStatus`/`answerVisible` in the Review tab.
- Multi-panel/multi-lesion slides were split into separate cropped images
  (MI histology timeline, hyalinosis vs. fibrinoid necrosis field, mechanical
  vs. tissue valve, etc.) so each card tests one specimen.
- 5 cards are tagged `cardType: "diagram"` or `"table"` (vessel-wall diagram,
  RHD pathogenesis schematic, hypertrophy comparison diagram, pacemaker
  diagram, endocarditis vegetation-type table) — these are pre-labeled
  reference figures, not blind specimens, so they're excluded from the
  diagnosis/SRS flow. They're visible in Browse/Review for reference.
- A few gross MI photos (pages 21/22) and one mitral/aortic stenosis slide
  (page 45) had no explicit lecture caption; their diagnosis was inferred
  from slide order and is flagged `reviewNeeded`.
- `etiology`/`pathology` fields are left blank where the lecture slide gave
  none, rather than inventing content — fill them in via the card editor if
  you want them.

## Card schema

See `cards.json` for the seed data (same shape used internally, plus a
`reviewStatus` field added by the app at runtime). Key fields: `diagnosis.answer`
+ `acceptedAnswers`, `keyFeatures` (`essential`/`important`), `etiology`,
`pathology`, `srs` (SM-2 state), `topic`, `highYield`.
