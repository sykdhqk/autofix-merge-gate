# Desktop acceptance

## Environment

- Application: iPolloWork
- Version: 0.50.12
- Platform: macOS 15.5 arm64
- Project: AI 热点交付验收 2026-09-14 (`ws_ae06a808c439`)
- Engine: OpenCode
- Model: task header displayed `GPT 5.6`; exact variant unverified because the detailed selector marked a different provider entry
- Package: `autofix-merge-gate-1.0.0.ipollowork-plugin`

## Installation

- File import accepted the `.ipollowork-plugin` package.
- Preview showed publisher `sykdhqk`, version `1.0.0`, one Skill, zero agents, zero commands, and zero MCP servers.
- The declarative safety check passed.
- Installation completed and both the plugin and Skill were enabled.
- The installed Skill directory contained `SKILL.md`, `references/decision-rules.md`, and `references/report-format.md`.

## Invocation

Input: `autofix-merge-gate-packet.md` in the dedicated acceptance project.

The first model attempt ended with `unknown certificate verification error`. A retry loaded the installed Skill and both references, read the packet, and created `autofix-merge-gate-acceptance.md`.

The output contains all eleven prescribed sections, preserves `A-184`, `A-191`, and `9e4d1c2`, gives each alert a row verdict, records the missing dependency review and human approval, returns an overall `blocked` verdict, and ends with the exact advisory boundary.

## Lifecycle checks

- Disable/re-enable: passed; the Skill switch changed to off and back to on.
- Project data: the input and output files remained in the dedicated project after reload.
- Same-version update: not attempted because `1.0.0` is immutable and no newer package exists.
- Uninstall/reinstall: not performed in this run; deleting an installed plugin was outside the non-destructive acceptance steps used for this scheduled run.

## Boundary

The run validates local file import, installation, resource loading, a real model invocation against the supplied packet, output structure, and reload. It does not validate live GitHub access, CodeQL execution, branch rules, deployment, Windows, Linux, or other engines.
