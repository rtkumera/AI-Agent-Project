# curriculum.CAP.curriculum_improvement_recommendations — Ranked, machine-applicable curriculum improvement recommendations

**CANDIDATE -- not started, not assigned.** This is one line on this domain's list of everything its agent could eventually do. It becomes real work only when the builder picks it and their manager agrees, at which point it opens as four stories. Until then it is deliberately inert, and the honest status of it is "not started" rather than "behind".

Validation gaps and evidence shortfalls arrive as ranked actions each carrying a patch a human can apply in one click and an explanation of why it improves the student's path, instead of a list of complaints.

**Built today:** implemented. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- no agent identity reaches the Composer today: every /api/admin/composer route is requireAdmin only (composerRoutes.ts:15-30)
- no measured link exists between a recommendation and any learning outcome, so severity and rank are rule weights rather than evidence
- the engine has no record of which past recommendations were applied or declined, so it cannot learn from a human's judgment

Full build prompt is attached to this story.

**Release:** autonomy:R0 · Legacy migration plan (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Ranked, machine-applicable curriculum improvement recommendations
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.curriculum_improvement_recommendations`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** implemented · **Source:** existing_application
## The business outcome
Validation gaps and evidence shortfalls arrive as ranked actions each carrying a patch a human can apply in one click and an explanation of why it improves the student's path, instead of a list of complaints.
Intended users: Swati Raman (accountable manager), curriculum staff.
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- Compute evidence, dependencies and coverage gaps for the plan.
- Emit dependency repairs first, as they block publishing.
- Emit evidence and coverage recommendations with their severity.
- Rank them and attach a patch the UI can apply without regenerating anything.
- Stop. A human applies the patch.
**Inputs**
- the validated plan and its check results
- the evidence estimate and dependency issues
- the coverage gap list
**Outputs**
- ranked recommendations with an area, a severity, a why, and a machine-applicable patch operation
- an add_videos patch carrying the specific gap competency ids
**Exceptions that must be handled**
- The deterministic core is the contract; the engine's own header notes an LLM layer could add nuance later, and that nuance must never set severity or rank.
- A recommendation is a proposal about what a student is taught, so applying one is a human decision.
- A patch that passes structurally can still be pedagogically wrong; structural counts cannot see repetition or redundancy.
- Severity and rank are rule-derived weights, not measured impact on learning outcomes.
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- read_curriculum_blueprints
- run_validation_gate
- propose_curriculum_patch
- emit_structured_log
**Application surfaces**
- /admin/orchestration composer recommendation panel
- POST /api/admin/composer/blueprints/:id/curate-videos
- POST /api/admin/composer/blueprints/:id/apply-videos
**Source modules**
- backend/src/services/composer/optimizationEngine.ts
- backend/src/services/composer/evidenceEngine.ts
**Dependencies**
- validationEngine, evidenceEngine, dependencyEngine and coverageGapEngine as the inputs
- a UI able to apply a patch
- typeRegistry for the card vocabulary a patch names
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R5**.
Why that ceiling: Generating a recommendation has no side effect, but the recommendation is about what a student is taught, which makes the decision permanently human-required and caps the capability at autonomy:R5 under effectiveAuthority(). The apply step is deliberately excluded: an agent may propose a patch and never apply one.

**THIS IS A HUMAN DECISION.** It stays human-required at every autonomy level, forever. An
agent may prepare, summarise and propose; it may never decide. No amount of evidence
promotes this into automation.
**First release behaviour (autonomy:R0)**
Record the recommendation areas, the severity rules, and that only a human applies a patch.

Acceptance: Swati states who applies a patch and what makes a recommendation high severity.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- no agent identity reaches the Composer today: every /api/admin/composer route is requireAdmin only (composerRoutes.ts:15-30)
- no measured link exists between a recommendation and any learning outcome, so severity and rank are rule weights rather than evidence
- the engine has no record of which past recommendations were applied or declined, so it cannot learn from a human's judgment
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- backend/src/services/composer/optimizationEngine.ts:1
- backend/src/services/composer/optimizationEngine.ts:27
- backend/src/services/composer/optimizationEngine.ts:20
- backend/src/services/composer/validationEngine.ts:26
- backend/src/services/composer/evidenceEngine.ts
- backend/src/services/composer/dependencyEngine.ts
- backend/src/routes/admin/composerRoutes.ts:26
- backend/src/routes/admin/composerRoutes.ts:27

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] Swati states who applies a patch and what makes a recommendation high severity.

When every box above is ticked, stop and show the demo.
