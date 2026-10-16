# Report format

Use these sections in order.

## 1. Verdict

State exactly one: **ready**, **ready with changes**, or **blocked**. Give a two-sentence rationale naming the strongest passing evidence and the highest-priority gap.

## 2. Review boundary

Record repository, base branch, reviewed head commit, pull request state, alert count, packet timestamp, and evidence cutoff. Mark unknown fields as missing.

## 3. Alert-to-change matrix

Use the matrix from `decision-rules.md`. Preserve alert IDs and paths exactly. Give every row its own verdict.

## 4. Evidence ledger

| Claim | State | Evidence | Commit / timestamp | Review note |
|---|---|---|---|---|

Use only observed, reported, missing, or not applicable.

## 5. Patch assessment

Explain the trust boundary, fix mechanism, changed behavior, and any unrelated changes. Separate confirmed findings from hypotheses.

## 6. Validation assessment

Report scanner and behavioral evidence separately. Include the CodeQL or scanner conclusion and the relevant positive, negative, exploit, and regression test results.

## 7. Scope-risk gates

Cover dependency, workflow, permission, generated file, secret, configuration, and migration gates. Do not omit a gate; use not applicable with a reason.

## 8. Required actions

List owner, action, evidence needed, and whether it blocks merge. Use `None` only for a ready verdict.

## 9. Merge checklist

- reviewed head commit still matches;
- each alert row has passing evidence;
- scanner and behavioral checks pass;
- required human reviewer approved;
- rollout owner and observation are named;
- rollback action is usable;
- unresolved comments and checks are cleared.

## 10. Residual risk

Describe what remains outside the supplied evidence, including untested platforms, queries, integrations, and deployment conditions.

## 11. Advisory boundary

End with this exact sentence:

> This review is advisory and does not replace repository policy, security-owner approval, or independent validation of the reviewed commit.
