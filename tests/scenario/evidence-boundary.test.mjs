import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const rules = readFileSync(new URL('../../skills/autofix-merge-gate/references/decision-rules.md', import.meta.url), 'utf8');

test('separates reported evidence from reviewer-observed evidence', () => {
  for (const marker of ['observed', 'reported', 'missing', 'not applicable']) assert.match(rules, new RegExp(marker, 'i'));
});

test('does not equate a CodeQL rerun with regression safety', () => {
  assert.match(rules, /CodeQL.*does not prove|does not prove.*CodeQL/is);
  assert.match(rules, /regression/i);
  assert.match(rules, /behavioral test/i);
});
