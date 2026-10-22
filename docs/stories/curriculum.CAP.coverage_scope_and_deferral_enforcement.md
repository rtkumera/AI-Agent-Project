# curriculum.CAP.coverage_scope_and_deferral_enforcement — Enforcing what this employee does and does not own, and tracking each deferral's precondition

Nothing curriculum-adjacent gets absorbed because it looked close enough: every deferred item carries the specific condition that must be true first, and every out-of-scope item has a named other owner.

**Built today:** partial. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- the contract defers LearningInnovationArchitect but repointLegacyBehaviors.ts:31-36 never absorbed it, so it has no parent_agent_id, record_kind or migration_status and still runs on its own cron: the contract and the code disagree
- CurriculumOptimizerAgent and EducationReportingAgent are contracted to be archived with enabled false, and whether that archive state was actually applied in production is unknown from the repository
- no employee-to-employee handoff protocol exists, so every cross-domain route ends at a human

Full build prompt is attached to this story.

**Release:** r2 · r2 (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Enforcing what this employee does and does not own, and tracking each deferral's precondition
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.coverage_scope_and_deferral_enforcement`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** partial · **Source:** manager_defined
## The business outcome
Nothing curriculum-adjacent gets absorbed because it looked close enough: every deferred item carries the specific condition that must be true first, and every out-of-scope item has a named other owner.
Intended users: Swati Raman (accountable manager), Ali Muwwakkil (DRI), the other domain owners.
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- Hold the four sets as the authoritative scope.
- For any proposed absorption, require the item to appear in the contract with its precondition met.
- Refuse inclusion inferred from curriculum adjacency.
- Route an out-of-scope finding to the named other owner rather than acting on it.
- Record a scope change as a human decision, never as a drift.
**Inputs**
- the absorbed set and its four items
- the deferred set and the precondition on each
- the retired set
- the out-of-scope set and its named other owner
**Outputs**
- a per-item ownership and status statement with its precondition
- a refusal when an item outside the contract is proposed for absorption
- the regression statement that nothing silent today starts speaking without the authorization chokepoint
**Exceptions that must be handled**
- Inclusion is never inferred from being curriculum-adjacent: each deferred and out-of-scope item needs its own future coverage decision.
- The regression contract is that nothing which is silent today may start speaking without the employee's authorization chokepoint, so a shadow comparison is a check that nothing new appeared rather than a diff of two outputs.
- Retire means archive, not delete: the row and its history are kept with migration_status archived and enabled false.
- No employee-to-employee handoff protocol exists, so a cross-domain finding reaches a human, not another agent.
- LearningInnovationArchitect is deferred but was never re-pointed onto Dara's identity, so the contract and the code disagree about it today.
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- read_agent_registry
- read_docs_repo
- emit_structured_log
**Application surfaces**
- /admin/agents/<Dara> overview and orphan surfaces
- /admin/workforce
- agentOrphanRoutes.ts
- agentEffectiveAccessRoutes.ts
**Source modules**
- backend/src/services/curriculum/repointLegacyBehaviors.ts
- backend/src/services/workforce/agentEffectiveAccessService.ts
- backend/src/services/governance/agentDepartmentClassifier.ts
**Dependencies**
- the approved coverage contract staying the single scope authority
- a named owner per out-of-scope domain
- a human to approve any scope change
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R2**.
Why that ceiling: Scope is a governance boundary and an agent must never be able to widen its own. R2 caps it at reporting from the approved contract. Charter boundary 5 forbids silently absorbing a deferred or out-of-scope item at any rung, so no higher level exists for this capability by design.

**THIS IS A HUMAN DECISION.** It stays human-required at every autonomy level, forever. An
agent may prepare, summarise and propose; it may never decide. No amount of evidence
promotes this into automation.
**First release behaviour (autonomy:R0)**
Record the four sets, the precondition per deferral, and the named owner per out-of-scope item.

Acceptance: Swati names one deferred item and its precondition, and one out-of-scope item and its owner.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- the contract defers LearningInnovationArchitect but repointLegacyBehaviors.ts:31-36 never absorbed it, so it has no parent_agent_id, record_kind or migration_status and still runs on its own cron: the contract and the code disagree
- CurriculumOptimizerAgent and EducationReportingAgent are contracted to be archived with enabled false, and whether that archive state was actually applied in production is unknown from the repository
- no employee-to-employee handoff protocol exists, so every cross-domain route ends at a human
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- docs/architecture/ai-workforce-management/employees/curriculum/COVERAGE_CONTRACT.md:16
- docs/architecture/ai-workforce-management/employees/curriculum/COVERAGE_CONTRACT.md:27
- docs/architecture/ai-workforce-management/employees/curriculum/COVERAGE_CONTRACT.md:36
- docs/architecture/ai-workforce-management/employees/curriculum/COVERAGE_CONTRACT.md:44
- docs/architecture/ai-workforce-management/employees/curriculum/ROLE_CHARTER_v1.md:53
- docs/architecture/ai-workforce-management/employees/curriculum/ROLE_CHARTER_v1.md:55
- docs/architecture/ai-workforce-management/employees/curriculum/ACCOUNTABILITY_v1.md:36
- backend/src/services/curriculum/repointLegacyBehaviors.ts:31
- backend/src/services/curriculum/repointLegacyBehaviors.ts:42

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] Swati names one deferred item and its precondition, and one out-of-scope item and its owner.

When every box above is ticked, stop and show the demo.
