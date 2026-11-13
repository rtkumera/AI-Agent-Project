# curriculum.CAP.certification_item_review_status_transition — Moving a prep item between draft, in review, approved and retired

**CANDIDATE -- not started, not assigned.** This is one line on this domain's list of everything its agent could eventually do. It becomes real work only when the builder picks it and their manager agrees, at which point it opens as four stories. Until then it is deliberately inert, and the honest status of it is "not started" rather than "behind".

Only items a human has actually approved are served to students, with a revision history that keeps the rejected versions rather than overwriting them.

**Built today:** implemented. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- certification prep question-bank stewardship is deferred by the approved coverage contract until the three operator scripts become attributed employee tools (docs/architecture/ai-workforce-management/employees/curriculum/COVERAGE_CONTRACT.md:25)
- no named reviewer is required by the system: the status route is requireAdmin only (certPrepAdminRoutes.ts:206)
- nothing records whether a human agreed with a recommendation, so recommendation quality is UNMEASURED

Full build prompt is attached to this story.

**Release:** autonomy:R0 · Legacy migration plan (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Moving a prep item between draft, in review, approved and retired
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.certification_item_review_status_transition`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** implemented · **Source:** existing_application
## The business outcome
Only items a human has actually approved are served to students, with a revision history that keeps the rejected versions rather than overwriting them.
Intended users: Swati Raman (accountable manager), cert-prep staff, students (as the recipients of served items).
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- Validate the revision.
- A human sets the target status.
- Only an approved, servable revision is picked for a student session.
**Inputs**
- a question key and revision
- a target review status
- the validation result for that revision
**Outputs**
- an updated review_status on the revision
- a servable or non-servable determination used at session build time
**Exceptions that must be handled**
- This decides what a student actually sees in a practice exam, so it is a human decision at every level, permanently.
- A draft revision is kept rather than overwritten, so the history of a rejected item survives.
- An approved item can still be a bad item: approval is a human judgment, not a rubric threshold.
- The route is requireAdmin only, so the system does not require a specific named reviewer.
- CCAR-F is Anthropic's credential: this capability prepares for and reports on it and issues, awards or confers nothing
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- read_cert_bank
- prepare_review_recommendation
- emit_structured_log
**Application surfaces**
- /admin/cert-prep question review surface
- POST /api/admin/cert-prep/questions/:key/:rev/status
**Source modules**
- backend/src/services/certPrep/certQuestionBankService.ts
- backend/src/models/CertQuestionRevision.ts
**Dependencies**
- a named human reviewer
- the per-item rubric and triage output as inputs to the human's judgment
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R2**.
Why that ceiling: Approving an assessment item is exactly the human decision this matrix protects, and it reaches learners directly. R2 is the ceiling rather than R5 because the agent has no legitimate role beyond answering from approved knowledge and recommending: a shadow comparison against human approvals would normalise an agent opinion on whether an item is fit to serve.

**THIS IS A HUMAN DECISION.** It stays human-required at every autonomy level, forever. An
agent may prepare, summarise and propose; it may never decide. No amount of evidence
promotes this into automation.
**First release behaviour (autonomy:R0)**
Record the four statuses, what servable means, and that only a human approves an item.

Acceptance: Swati names the reviewer and states that an approved item is a human judgment.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- certification prep question-bank stewardship is deferred by the approved coverage contract until the three operator scripts become attributed employee tools (docs/architecture/ai-workforce-management/employees/curriculum/COVERAGE_CONTRACT.md:25)
- no named reviewer is required by the system: the status route is requireAdmin only (certPrepAdminRoutes.ts:206)
- nothing records whether a human agreed with a recommendation, so recommendation quality is UNMEASURED
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- backend/src/services/certPrep/certQuestionBankService.ts:421
- backend/src/services/certPrep/certQuestionBankService.ts:355
- backend/src/services/certPrep/certQuestionBankService.ts:392
- backend/src/services/certPrep/certQuestionBankService.ts:119
- backend/src/models/CertQuestionRevision.ts:29
- backend/src/models/CertQuestionRevision.ts:144
- backend/src/routes/admin/certPrepAdminRoutes.ts:206

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] Swati names the reviewer and states that an approved item is a human judgment.

When every box above is ticked, stop and show the demo.
