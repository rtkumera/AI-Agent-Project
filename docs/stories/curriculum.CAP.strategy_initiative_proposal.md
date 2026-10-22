# curriculum.CAP.strategy_initiative_proposal — Proposing curriculum and learning strategy initiatives for human decision

A standing, evidence-backed proposal stream for how the curriculum should change - new content methods, new outcome measures - that a human either adopts or declines, rather than 175 strategic tickets nobody ever closed.

**Built today:** partial. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- deferred by the approved coverage contract with three unmet preconditions (COVERAGE_CONTRACT.md:20)
- LearningInnovationArchitect is the one legacy behavior row in this slice that repointLegacyBehaviors.ts does NOT absorb: it is absent from ABSORBED_BEHAVIOR_NAMES (repointLegacyBehaviors.ts:31-36), so it still has no parent_agent_id, record_kind or migration_status and remains cron-wired independently of Dara
- Initiative.status has no write path, so a proposal has no terminal state
- LLM spend runs through the shared assistant client with agent_id null (RISK_REGISTER.md:9)

Full build prompt is attached to this story.

**Release:** r2 · r2 (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Proposing curriculum and learning strategy initiatives for human decision
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.strategy_initiative_proposal`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** partial · **Source:** inherited
## The business outcome
A standing, evidence-backed proposal stream for how the curriculum should change - new content methods, new outcome measures - that a human either adopts or declines, rather than 175 strategic tickets nobody ever closed.
Intended users: Swati Raman (accountable manager), Ali Muwwakkil (DRI), curriculum staff.
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- Evaluate department health for education.
- Identify strategic opportunities.
- Create a strategic initiative and generate its tickets.
- Hand every proposal to a human; the agent adopts nothing itself.
**Inputs**
- department health signals for the education department
- the existing Initiative and strategic ticket history
- an LLM strategy analysis call
**Outputs**
- strategic initiatives and their generated tickets
- today: tickets that stay open indefinitely, because Initiative.status has no write path in this codebase
**Exceptions that must be handled**
- Explicitly deferred: the charter lists this as not yet a responsibility, and the coverage contract names three preconditions - a charter and approval path for proposing an initiative, the shared-client LLM attribution fix, and a judgment on whether the strategy-architect template is worth continuing at all.
- Its own seed description states no recurring resolver is registered because Initiative.status has no write path, so tickets stay open until a genuine terminal signal exists and are never closed on a timer.
- The template's history is 175 planned and 175 cancelled initiatives, which is the reason the precondition about continuing at all exists.
- This capability proposes; it never alters curriculum. Adoption is a human decision.
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- read_department_health
- openai_llm_completion
- create_internal_ticket
- emit_structured_log
**Application surfaces**
- /admin/agents/<Dara>
- /admin/workforce initiative surfaces
- internal cron 26 */6 * * *; no HTTP route
**Source modules**
- backend/src/services/agents/strategy/strategyArchitectAgent.ts
- backend/src/services/aiOrchestrator.ts
**Dependencies**
- a real approval path for an initiative, which does not exist
- LLM cost attribution through Dara's agent_id rather than the shared assistant client
- a write path for Initiative.status
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R2**.
Why that ceiling: A proposal to change what Colaberry teaches is a human decision at every level, which effectiveAuthority() treats as permanently human-required. R2 is the ceiling rather than R5 because the capability has no approval path at all today: until a human can actually adopt or decline a proposal, anything above answering from approved knowledge would manufacture work that cannot be acted on, which is precisely the 175-cancelled-initiative failure mode.

**THIS IS A HUMAN DECISION.** It stays human-required at every autonomy level, forever. An
agent may prepare, summarise and propose; it may never decide. No amount of evidence
promotes this into automation.
**First release behaviour (autonomy:R0)**
Record what a proposal is, who decides it, and the three preconditions blocking absorption.

Acceptance: Swati states who adopts or declines a proposal and what happens to one that is declined.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- deferred by the approved coverage contract with three unmet preconditions (COVERAGE_CONTRACT.md:20)
- LearningInnovationArchitect is the one legacy behavior row in this slice that repointLegacyBehaviors.ts does NOT absorb: it is absent from ABSORBED_BEHAVIOR_NAMES (repointLegacyBehaviors.ts:31-36), so it still has no parent_agent_id, record_kind or migration_status and remains cron-wired independently of Dara
- Initiative.status has no write path, so a proposal has no terminal state
- LLM spend runs through the shared assistant client with agent_id null (RISK_REGISTER.md:9)
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- backend/src/services/agentRegistrySeed.ts:1983
- backend/src/services/agentRegistrySeed.ts:1991
- backend/src/services/aiOpsScheduler.ts:323
- backend/src/services/aiOrchestrator.ts:800
- backend/src/services/agents/strategy/strategyArchitectAgent.ts
- backend/src/services/agentBlueprint/ticketCreatorIdentitySeed.ts:225
- docs/architecture/ai-workforce-management/employees/curriculum/COVERAGE_CONTRACT.md:20
- docs/architecture/ai-workforce-management/employees/curriculum/ROLE_CHARTER_v1.md:30

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] Swati states who adopts or declines a proposal and what happens to one that is declined.

When every box above is ticked, stop and show the demo.
