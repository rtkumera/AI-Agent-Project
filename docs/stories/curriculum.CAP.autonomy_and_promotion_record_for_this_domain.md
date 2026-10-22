# curriculum.CAP.autonomy_and_promotion_record_for_this_domain — A per-capability autonomy and promotion record for the curriculum employee

Every curriculum capability carries a level a named human approved, a ceiling, the evidence required to move up and the condition that moves it back down - so authority stops being inferred from the fact that something already runs.

**Built today:** absent. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- no column or table stores a per-capability approved autonomy: approved_autonomy and max_permitted_autonomy exist only as TypeScript interface fields and as strings in this run's capability files
- the promotion-criteria module the plan calls for does not exist in backend/src/services/agentDomain/
- resolveLevel() at agentAuthorizationService.ts:143-146 reads autonomy_level_set_at but not autonomy_level_source, so an auto-classification stamped by classifyAiAgentAutonomyLevels.ts:92 governs the gate exactly as a human decision would
- the four-rung level recorded for Dara is act_audited, derived before her student DM tool existed; her current tools_granted array classifies to communicate, the top rung, with no recorded human re-approval

Full build prompt is attached to this story.

**Release:** r2 · r2 (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# A per-capability autonomy and promotion record for the curriculum employee
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.autonomy_and_promotion_record_for_this_domain`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** absent · **Source:** proposed_new
## The business outcome
Every curriculum capability carries a level a named human approved, a ceiling, the evidence required to move up and the condition that moves it back down - so authority stops being inferred from the fact that something already runs.
Intended users: Swati Raman (accountable manager), Ali Muwwakkil (DRI), platform operators.
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- Map each capability onto the ladder independently; never take a maximum across the domain.
- Record only a level a human actually approved, and unknown otherwise.
- Apply the ceiling, the no-tool-grants cap and the human-decision cap.
- Require production above the pilot rung to carry its own separate approval.
- State the evidence each promotion needs and who evaluates it, before any promotion.
- Record the condition that downgrades or suspends the level.
**Inputs**
- this capability matrix
- a named human's approval decision per capability
- the evidence each promotion requires and who evaluates it
**Outputs**
- an approved_autonomy and max_permitted_autonomy per capability, namespaced autonomy:R0 through autonomy:R9
- the prerequisites, permitted and prohibited actions, measured thresholds and evaluator per rung
- the rollback, suspension and downgrade conditions
- unknown wherever no human has decided
**Exceptions that must be handled**
- Autonomy is mapped per capability, never per agent: one capability at a high rung must not raise another's or the agent's.
- Every stored value must be namespaced autonomy:Rn. A bare R3 is exactly the value that must never be stored, because the platform already uses bare R0-R5 for risk tiers, where R3 means an external side effect.
- The platform's only stored autonomy ladder is a different, four-rung one, and the authorization gate honours autonomy_level whenever autonomy_level_set_at is non-null without checking autonomy_level_source, so a machine auto-classification is indistinguishable from a human decision at the gate.
- Story completion, elapsed time, a successful conversation and passing mocked tests promote nothing.
- A capability already running in production is not thereby at a high rung; that is the inversion this record exists to correct.
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- read_agent_registry
- read_docs_repo
- emit_structured_log
**Application surfaces**
- /admin/agents/<Dara> autonomy and governance tabs
- /admin/trust surfaces
- unknown: no route exposes a per-capability approved autonomy today
**Source modules**
- backend/src/services/agentDomain/autonomyLadder.ts
- backend/src/services/agentAutonomy.ts
- backend/src/services/agentAuthorizationService.ts
**Dependencies**
- this matrix being reviewed by Swati
- a human evaluator per promotion
- a decision record that distinguishes an auto-classification from a human approval
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R2**.
Why that ceiling: An agent must never set or raise its own authority, which charter boundary 8 states directly. R2 caps it at reporting the record from approved knowledge. This capability exists to make the absence of an approved level visible rather than to grant one.

**THIS IS A HUMAN DECISION.** It stays human-required at every autonomy level, forever. An
agent may prepare, summarise and propose; it may never decide. No amount of evidence
promotes this into automation.
**First release behaviour (autonomy:R0)**
Define, per capability, the workflow, the risks and which decisions are a human's.

Acceptance: Swati signs each capability's scope, its ceiling and its human-decision flag; every unapproved level reads unknown.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- no column or table stores a per-capability approved autonomy: approved_autonomy and max_permitted_autonomy exist only as TypeScript interface fields and as strings in this run's capability files
- the promotion-criteria module the plan calls for does not exist in backend/src/services/agentDomain/
- resolveLevel() at agentAuthorizationService.ts:143-146 reads autonomy_level_set_at but not autonomy_level_source, so an auto-classification stamped by classifyAiAgentAutonomyLevels.ts:92 governs the gate exactly as a human decision would
- the four-rung level recorded for Dara is act_audited, derived before her student DM tool existed; her current tools_granted array classifies to communicate, the top rung, with no recorded human re-approval
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- backend/src/services/agentDomain/autonomyLadder.ts:112
- backend/src/services/agentDomain/autonomyLadder.ts:139
- backend/src/services/agentDomain/autonomyLadder.ts:58
- backend/src/services/agentDomain/autonomyLadder.ts:90
- backend/src/services/agentAutonomy.ts:12
- backend/src/services/agentAutonomy.ts:16
- backend/src/services/agentAuthorizationService.ts:143
- backend/src/scripts/classifyAiAgentAutonomyLevels.ts:92
- backend/src/db/ensureAiAgentAutonomyLevelSchema.ts:38
- docs/architecture/ai-workforce-management/employees/curriculum/TOOL_CAPABILITY_DESIGN_v1.md:28

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] Swati signs each capability's scope, its ceiling and its human-decision flag; every unapproved level reads unknown.

When every box above is ticked, stop and show the demo.
