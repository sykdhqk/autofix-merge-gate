import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const skill = () => readFileSync(new URL('../../skills/autofix-merge-gate/SKILL.md', import.meta.url), 'utf8');
const rules = () => readFileSync(new URL('../../skills/autofix-merge-gate/references/decision-rules.md', import.meta.url), 'utf8');

test('maps every alert to changed code and validation evidence', () => {
  assert.match(skill(), /alert-to-change matrix/i);
  for (const marker of ['alert ID', 'changed paths', 'fix mechanism', 'validation evidence']) assert.match(rules(), new RegExp(marker, 'i'));
});

test('handles multi-alert pull requests without hiding partial failures', () => {
  const text = rules();
  assert.match(text, /up to 25/i);
  assert.match(text, /each alert/i);
  assert.match(text, /partial/i);
});
