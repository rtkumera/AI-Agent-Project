# curriculum.CAP.module_and_artifact_drafting_for_human_approv — Drafting curriculum module structures and lesson artifacts for a human to approve

A requested module or lesson artifact arrives as a reviewable draft with its structure and teaching materials attached, so a human spends their time judging it rather than producing it from nothing.

**Built today:** partial. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- deferred by the approved coverage contract with unmet preconditions (COVERAGE_CONTRACT.md:21-22)
- the architect leaves a partial write when the reports_to ticket gate throws (RISK_REGISTER.md:7)
- its capability registry entries carry maxRiskTier R4 and resourceScopePattern * purely to preserve legacy behaviour (capabilityRegistry.ts:60-62)
- anything drafted here reaching a learner needs push_to_protected_main and production_deploy, both default-denied (backend/src/services/delivery/execution/executionPolicy.ts:33)

Full build prompt is attached to this story.

**Release:** r2 · r2 (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Drafting curriculum module structures and lesson artifacts for a human to approve
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.module_and_artifact_drafting_for_human_approval`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** partial · **Source:** inherited
## The business outcome
A requested module or lesson artifact arrives as a reviewable draft with its structure and teaching materials attached, so a human spends their time judging it rather than producing it from nothing.
Intended users: Swati Raman (accountable manager), curriculum staff, mentors and instructors.
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- Route the ticket through the capability router to the matching capability entry.
- Draft the module and lesson structure, or the artifact for a lesson.
- Persist the draft and the sub-tickets.
- Stop. A human reviews and decides whether any of it reaches a learner.
**Inputs**
- a curriculum ticket carrying metadata.action design_module or generate_artifact
- the target module or lesson context
- an LLM content-generation call
**Outputs**
- a drafted module and lesson structure
- drafted slides, labs, exercises and assessments
- sub-tickets linking an artifact request to the module that needs it
**Exceptions that must be handled**
- Deferred with named preconditions: the partial-write hazard on the reports_to ticket gate must be fixed, the LLM call must carry a real agent_id, and the dead ticket loop must be replaced by a real dispatcher or an explicit tool call.
- The artifact generator's only feeder is the architect, so absorbing one without the other leaves a dead branch.
- What a student is taught is a human decision: nothing drafted here may be published without a named human approving it.
- A drafted assessment is especially consequential and must never be treated as ready because it parsed.
- Both registry rows carry maxRiskTier R4 and resourceScopePattern * in the capability registry, which preserves unrestricted legacy behaviour and is wider than this capability should be granted.
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- design_curriculum_module
- generate_lesson_artifact
- read_curriculum_modules
- openai_llm_completion
- create_internal_ticket
- emit_structured_log
**Application surfaces**
- /admin/orchestration (Experience Studio, Curriculum Composer)
- /admin/agents/<Dara>
- dispatched via workGraph capabilities curriculum.design_module, curriculum.generate_artifact and the curriculum.generic_fallback catch-all
**Source modules**
- backend/src/services/agents/curriculumArchitectAgent.ts
- backend/src/services/agents/artifactGenerationAgent.ts
- backend/src/services/workGraph/capabilityRegistry.ts
- backend/src/services/workGraph/capabilityRouter.ts
**Dependencies**
- a transactional or ticket-free loop so a failed draft leaves no partial write
- LLM cost attribution via Dara's agent_id
- a human reviewer with the authority to approve
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R4**.
Why that ceiling: Drafting is not publishing, so the drafting work itself can reach stateful multi-step sandbox tasks. It stops at autonomy:R4 rather than R5 because the output is curriculum a learner would be taught, which makes it a permanently human-required decision, and because the preconditions that make its write path safe are unmet: a shadow comparison against a reference outcome would be measuring a loop that still leaves partial writes.

**THIS IS A HUMAN DECISION.** It stays human-required at every autonomy level, forever. An
agent may prepare, summarise and propose; it may never decide. No amount of evidence
promotes this into automation.
**First release behaviour (autonomy:R0)**
Record what a draft is, who approves it, and that nothing drafted reaches a learner without a named human yes.

Acceptance: Swati names the approver and the review step for a drafted assessment specifically.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- deferred by the approved coverage contract with unmet preconditions (COVERAGE_CONTRACT.md:21-22)
- the architect leaves a partial write when the reports_to ticket gate throws (RISK_REGISTER.md:7)
- its capability registry entries carry maxRiskTier R4 and resourceScopePattern * purely to preserve legacy behaviour (capabilityRegistry.ts:60-62)
- anything drafted here reaching a learner needs push_to_protected_main and production_deploy, both default-denied (backend/src/services/delivery/execution/executionPolicy.ts:33)
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- backend/src/services/agents/curriculumArchitectAgent.ts:29
- backend/src/services/agents/artifactGenerationAgent.ts:17
- backend/src/services/workGraph/capabilityRegistry.ts:56
- backend/src/services/workGraph/capabilityRegistry.ts:67
- backend/src/services/workGraph/capabilityRegistry.ts:107
- backend/src/services/agentRegistrySeed.ts:1038
- backend/src/services/agentRegistrySeed.ts:1048
- backend/src/services/agentPermissionService.ts:73
- backend/src/services/workforce/agentEffectiveAccessService.ts:205
- docs/architecture/ai-workforce-management/employees/curriculum/COVERAGE_CONTRACT.md:21

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] Swati names the approver and the review step for a drafted assessment specifically.

When every box above is ticked, stop and show the demo.
