# Repo rules: access-control layer (ISCL working name)

## Mission
Maintain a default-deny access diagnostics layer. Nothing runs without a contract. Nothing continues without a rule. Unknown situations halt.

## Source of truth
- JSON Schema (access.schema.json) is canonical.
- TypeScript types are generated into packages/shared-types. Never hand-edit generated files.
- Adapters are JSON records registered in registry.json. Adding a service adds a record, never a new pipeline.
- tasks.mf is JSON validated by the same schema. Markdown and PDF are generated views only.

## Pipeline (script.py)
validate -> gen -> probe (read-only dry run, markdown report) -> gate (human approval) -> activate (config state only).

## Hard rules
- Fail closed: no valid contract, expired contract, or no matching rule means halt.
- Probes are read-only. Never bypass CAPTCHA, MFA or security challenges; a challenge is a stop condition.
- Never read, store, log or commit passwords, tokens or raw cookies. Metadata only, redacted.
- Agents cannot write or extend their own contracts. Only a human gate issues them.
- Every run has an ID, attempt budget, cooldown, stop conditions and an audit record.
- Auth is PASETO v4 Ed25519. No JWT.

## Working method
- Evidence first: inspect, compare and measure before changing anything.
- Never rewrite working code because a cleaner design exists. Justify every change.
- Small diffs. One concern per pull request. No new files without a stated need.
- Text first, Deaf-first: plain-language errors and reports, no voice-only flows.
- Mark anything unverified as unconfirmed. Do not invent versions, numbers or facts.