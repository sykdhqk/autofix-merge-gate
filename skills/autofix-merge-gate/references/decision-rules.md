# Decision rules

## Evidence states

Use one state for every material claim:

- **observed**: the packet contains the result and enough identity to tie it to the reviewed head commit or artifact;
- **reported**: a person or agent claims the result, or provides a link without the result needed for review;
- **missing**: required evidence is absent, stale, mismatched, or cannot be tied to the reviewed change;
- **not applicable**: the gate cannot affect this change, with a short reason.

Reported evidence cannot satisfy a blocking gate by itself. Never silently promote reported evidence to observed.

## Alert-to-change matrix

Create one row for **each alert**. GitHub agentic autofix may group up to 25 alerts into one pull request; partial success must remain visible. Use these columns:

| Alert ID | Rule / severity | Original location | Changed paths | Fix mechanism | Validation evidence | Row verdict |
|---|---|---|---|---|---|---|

The fix mechanism must describe the security property restored, not merely repeat the file name. Changed paths must include tests and configuration that materially participate in the fix. Validation evidence must identify the check, commit, and result.

Mark a row **blocked** when its alert has no changed-code mapping, no credible alternative mitigation, a failed or missing required scanner rerun, an unresolved exploit path, or a materially incomplete fix. Do not hide blocked rows behind a passing batch summary.

## Patch review

Check that the patch:

1. changes the vulnerable data or control path identified by the alert;
2. enforces the security property at the correct trust boundary;
3. handles malformed, empty, encoded, and boundary inputs relevant to the rule;
4. does not move the vulnerability to another path;
5. avoids unrelated refactors that make review harder;
6. keeps logging and error messages free of secrets and sensitive payloads.

## Scanner and behavioral validation

A successful CodeQL rerun shows that the covered query did not reproduce the alert in that configuration and commit. CodeQL does not prove regression safety, runtime correctness, authorization behavior, or absence of vulnerabilities outside its coverage.

Keep these evidence classes separate:

- scanner: check name, configuration, database or language scope, head commit, conclusion, remaining alerts;
- behavioral test: positive path, materially distinct negative or exploit path, regression tests, test command, head commit, result;
- review: unresolved comments, required approvals, branch protection, and draft state;
- deployment: rollout owner, observation signal, and rollback action.

At least one behavioral test must exercise the security boundary changed by the fix. A snapshot or scanner-only assertion is not a behavioral test.

## Scope-risk gates

Review each gate independently and mark it observed, reported, missing, or not applicable:

- **dependency**: new package, version, lockfile, registry, integrity, license, or transitive-risk change;
- **workflow**: GitHub Actions triggers, third-party actions, token exposure, artifact handling, or unpinned references;
- **permission**: repository, cloud, file, process, network, role, scope, or authorization changes;
- **generated file**: generated code, vendored output, schema, minified bundle, or lockfile matches its source and generator;
- **secret**: no credential is added to code, logs, tests, fixtures, URLs, or examples;
- **configuration or migration**: secure defaults, backward compatibility, staged rollout, and rollback.

Unexplained sensitive scope expansion is blocking. A justified low-risk documentation or generated-file correction can be a required change when its source remains verifiable.

## Human control

A merge-ready packet names a **human reviewer** and an accountable **owner** for rollout or remediation. It also states a usable **rollback** action and the signal that would trigger it. The automated agent, bot account, or scanner is evidence-producing machinery, not the accountable owner.

## Verdicts

- **ready**: every alert row passes; blocking gates are observed; the reviewed head commit is coherent; behavioral and scanner evidence pass; sensitive scope changes are absent or justified; a human reviewer, owner, rollout observation, and rollback are identified.
- **ready with changes**: no alert or security gate is failing, but bounded non-security corrections remain, such as clearer release notes, a named rollout observer, or a small nonblocking test-description fix. List each required change and the evidence needed to close it.
- **blocked**: any alert row is blocked; a required evidence item is missing or only reported; the head commit is mismatched; a relevant check fails; exploit or regression coverage is inadequate; sensitive scope expands without justification; a required approval is absent; or no accountable human owner and rollback path exist.

Do not compute an average score to override a blocking condition.
