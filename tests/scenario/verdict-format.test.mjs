import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const format = readFileSync(new URL('../../skills/autofix-merge-gate/references/report-format.md', import.meta.url), 'utf8');

test('uses bounded verdicts and ordered sections', () => {
  for (const marker of ['ready', 'ready with changes', 'blocked', 'Alert-to-change matrix', 'Evidence ledger', 'Merge checklist', 'Residual risk']) assert.match(format, new RegExp(marker, 'i'));
});

test('ends with an explicit advisory boundary', () => {
  assert.match(format, /advisory/i);
  assert.match(format, /does not replace/i);
});
