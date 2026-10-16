import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const rules = readFileSync(new URL('../../skills/autofix-merge-gate/references/decision-rules.md', import.meta.url), 'utf8');

test('reviews dangerous scope expansion independently', () => {
  for (const marker of ['dependency', 'workflow', 'permission', 'generated file', 'secret']) assert.match(rules, new RegExp(marker, 'i'));
});

test('requires human ownership and rollback for merge readiness', () => {
  for (const marker of ['human reviewer', 'rollback', 'owner']) assert.match(rules, new RegExp(marker, 'i'));
});
