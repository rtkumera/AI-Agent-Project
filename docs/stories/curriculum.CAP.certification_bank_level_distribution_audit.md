# curriculum.CAP.certification_bank_level_distribution_audit — Bank-level audit of answer-key distribution and mock supportability

Defects no single item can have - a key distribution that lets a student score well by always picking the same letter - are caught at the bank level, in CI and against the live database, before students sit a practice exam on it.

**Built today:** implemented. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- certification prep question-bank stewardship is deferred by the approved coverage contract until the three operator scripts become attributed employee tools (docs/architecture/ai-workforce-management/employees/curriculum/COVERAGE_CONTRACT.md:25)
- the audit must run against the database after every bank change, not only in CI, or the same class of defect can sit in production for a day (certBankRubric.ts:20-23)

Full build prompt is attached to this story.

**Release:** r2 · r2 (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Bank-level audit of answer-key distribution and mock supportability
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.certification_bank_level_distribution_audit`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** implemented · **Source:** existing_application
## The business outcome
Defects no single item can have - a key distribution that lets a student score well by always picking the same letter - are caught at the bank level, in CI and against the live database, before students sit a practice exam on it.
Intended users: Swati Raman (accountable manager), cert-prep staff, Ali Muwwakkil (DRI).
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- Load the entire approved bank.
- Compute the score a student would get by always answering one letter.
- Check whether the bank can support the configured mock forms per domain.
- Report against the thresholds; run the same definition in CI and against the live database.
**Inputs**
- the whole approved item set, from the repo files in CI and from the database after any bank change
- the mock demand per domain
**Outputs**
- a best-one-letter mock score, which is the real measure of the defect
- whether the configured mocks are supportable by the approved bank
- a formatted bank audit and a health summary
**Exceptions that must be handled**
- This exists because 150 generated items shipped with the key at A in 144 of them while every per-item gate passed: the defect was in the bank, not in any question.
- A bank-level check that runs in only one of the two places is the exact gap this closes, so a green CI run is not sufficient evidence about the live bank.
- A passing distribution does not mean the items are good; the per-item rubric is a separate concern.
- CCAR-F is Anthropic's credential: this capability prepares for and reports on it and issues, awards or confers nothing
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- read_cert_bank
- audit_bank_distribution
- emit_structured_log
**Application surfaces**
- /admin/cert-prep bank health and audit surfaces
- GET /api/admin/cert-prep/bank
- GET /api/admin/cert-prep/audit
**Source modules**
- backend/src/services/certPrep/certBankRubric.ts
- backend/src/services/certPrep/certAdminService.ts
**Dependencies**
- the approved item set in both the repo and the database
- the CCAR-F blueprint's domain weights
- the mock demand configuration
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R7**.
Why that ceiling: A pure read-only audit over the whole bank with no write path, so R7 is permitted for producing the audit. Withdrawing or regenerating a failing bank is a separate human decision because it changes the material students practise on.

Not a human-reserved decision, but promotion is still evidence-based and one step at a time.
**First release behaviour (autonomy:R0)**
Record the bank-level thresholds, the two places the check must run, and who acts on a failure.

Acceptance: Swati states why a per-item green does not imply a healthy bank.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- certification prep question-bank stewardship is deferred by the approved coverage contract until the three operator scripts become attributed employee tools (docs/architecture/ai-workforce-management/employees/curriculum/COVERAGE_CONTRACT.md:25)
- the audit must run against the database after every bank change, not only in CI, or the same class of defect can sit in production for a day (certBankRubric.ts:20-23)
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- backend/src/services/certPrep/certBankRubric.ts:10
- backend/src/services/certPrep/certBankRubric.ts:95
- backend/src/services/certPrep/certBankRubric.ts:123
- backend/src/services/certPrep/certBankRubric.ts:147
- backend/src/data/certBlueprints/ccarFoundations.ts
- backend/src/data/certBlueprints/items
- backend/src/routes/admin/certPrepAdminRoutes.ts:98
- backend/src/services/certPrep/certAdminService.ts:255

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] Swati states why a per-item green does not imply a healthy bank.

When every box above is ticked, stop and show the demo.
