---
name: autofix-merge-gate
description: Use when reviewing an AI or agent-generated security-fix pull request, especially GitHub agentic autofix or a batch of code-scanning alerts, to decide whether the change is ready, needs bounded repairs, or must be blocked.
---

# Autofix Merge Gate

Review an automated security-fix pull request as a human-owned change. Build an evidence trail from each alert to the changed code, verify what was actually rerun, identify risky scope expansion, and produce a bounded merge verdict.

## Inputs

Ask for or use the available parts of this review packet:

- pull request title, description, author, draft state, base branch, and changed-file list;
- alert IDs, rules, severities, locations, and affected branches;
- patch or diff, including dependency, workflow, permission, generated-file, and test changes;
- agent summary and claimed validation steps;
- CodeQL or other scanner run links, conclusions, timestamps, commits, and configurations;
- behavioral, unit, integration, or regression test results;
- unresolved review comments, checks, deployment constraints, rollback plan, and human owner.

Do not require a live GitHub connection. Review pasted text, exported JSON, Markdown, or files supplied by the user. If evidence is unavailable, mark it missing instead of inferring success.

## Workflow

1. Read `references/decision-rules.md` and `references/report-format.md`.
2. Establish the review boundary: base branch, reviewed head commit, alert set, repository area, and evidence timestamp. State if the packet contains one alert or a batch of up to 25 alerts.
3. Build an **alert-to-change matrix**. Create one row per alert with the alert ID, rule and severity, original location, changed paths, fix mechanism, validation evidence, and row verdict.
4. Build the evidence ledger. Classify each claim as **observed**, **reported**, **missing**, or **not applicable**. A link or summary without its result is reported evidence, not observed evidence.
5. Review the patch for minimality and semantic correctness. Trace changed conditions, data flow, escaping, authorization, validation, and error behavior. Flag unrelated changes and generated artifacts that cannot be tied to an alert.
6. Review scanner evidence. Confirm the rerun covers the reviewed head commit, relevant query or configuration, and default-branch alert. Record remaining or newly introduced findings. A successful CodeQL rerun does not prove behavioral regression safety.
7. Review behavioral test evidence. Require a positive path, a materially distinct negative or exploit path, and relevant regression coverage. Keep scanner validation and behavioral tests as separate gates.
8. Review scope-risk gates: dependency updates, workflow changes, permission changes, secret handling, generated files, configuration changes, and data migrations. Require an explicit reason and focused validation for each affected gate.
9. Confirm human ownership. Identify the human reviewer, remediation owner, rollout observation, and rollback path. Do not accept the agent as the accountable owner.
10. Apply the decision table and produce the report in the exact order from `references/report-format.md`. Preserve identifiers and numeric evidence exactly.

## Failure handling

- If the diff does not match the stated head commit, stop and return **blocked** with a request for a coherent packet.
- If an alert is missing from a multi-alert matrix, return **blocked**; do not average it into a batch score.
- If CodeQL is unavailable for a rule or language, request the most direct alternative scanner or reproduction evidence and label the substitution.
- If the security issue cannot be reproduced safely, explain the containment and review evidence required without generating a weaponized exploit.
- If only the agent-authored summary is available, distinguish every validation claim as reported and avoid a ready verdict.

## Output constraints

- Use `ready`, `ready with changes`, or `blocked` exactly.
- Give one overall verdict and one verdict for every alert row.
- Cite the packet path, check name, run URL, commit, or line range supporting each material conclusion.
- Never invent scanner results, policy status, billing data, test outcomes, or repository permissions.
- End with the advisory sentence specified in `references/report-format.md`.

## Dependencies

No external service, local executable, credential, or network connection is required. The Skill evaluates evidence supplied in the task context.
