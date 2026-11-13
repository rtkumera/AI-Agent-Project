# curriculum.CAP.curriculum_integrity_scan — Read-only curriculum integrity scan of the module and lesson tree

**CANDIDATE -- not started, not assigned.** This is one line on this domain's list of everything its agent could eventually do. It becomes real work only when the builder picks it and their manager agrees, at which point it opens as four stories. Until then it is deliberately inert, and the honest status of it is "not started" rather than "behind".

Structural defects in what students are about to be taught - an empty module, an untitled lesson, a lesson with no content, an out-of-order sequence - surface as typed findings before a learner hits them.

**Built today:** implemented. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- the registry row's trigger_type still advertises a cron that nothing schedules (agentRegistrySeed.ts:1058)
- no consumer renders the findings on a cadence, so a finding can be produced and seen by nobody

Full build prompt is attached to this story.

**Release:** autonomy:R0 · Legacy migration plan (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Read-only curriculum integrity scan of the module and lesson tree
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.curriculum_integrity_scan`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** implemented · **Source:** inherited
## The business outcome
Structural defects in what students are about to be taught - an empty module, an untitled lesson, a lesson with no content, an out-of-order sequence - surface as typed findings before a learner hits them.
Intended users: Swati Raman (accountable manager), curriculum staff, Dara (as her own callable tool).
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- Load the module tree ordered by module_number then lesson sort_order.
- Flag a module with no lessons as warn.
- Flag a lesson with no title as warn.
- Flag a lesson with neither mini-sections nor artifacts as warn.
- Flag a non-increasing sort_order as info.
- Return the array and write nothing; log activity tagged with Dara's real agent id.
**Inputs**
- curriculum_modules joined to curriculum_lessons, artifact_definitions and mini_sections
- optional moduleId to scope the scan to one module
**Outputs**
- a typed findings array of severity, location, description and evidence - never free text
- zero tickets, by contract
**Exceptions that must be handled**
- The scan has zero agent_runs in its history, so there is no baseline to compare a run against (COVERAGE_CONTRACT.md:42).
- An absent finding is not evidence of a healthy tree: the scan checks four structural rules only, never pedagogical quality.
- The registry row still carries a cron schedule it is never scheduled on, which made cron health alerting report a permanently missed job (RISK_REGISTER.md:8).
- It cannot see week decks or Experience Studio card content, which live outside the module and lesson tree.
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- scan_curriculum_integrity
- read_curriculum_modules
- emit_structured_log
**Application surfaces**
- /admin/orchestration (Experience Studio and Timeline editor tabs)
- dispatched via workGraph capability curriculum.qa_check; no dedicated HTTP route
**Source modules**
- backend/src/services/agents/curriculumQAAgent.ts
- backend/src/services/workGraph/capabilityRegistry.ts
**Dependencies**
- curriculum_modules and curriculum_lessons remaining the structural source of truth
- a caller willing to render the findings; today only the Talk tab consumes them
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R7**.
Why that ceiling: Genuinely read-only: the ticket write was deliberately removed and a test asserts zero tickets. R7 is permitted because producing this one report is a single explicitly nameable action class with no side effect. R8 and R9 are withheld: no handoff recipient exists and no monitoring or recovery story has been written for it.

Not a human-reserved decision, but promotion is still evidence-based and one step at a time.
**First release behaviour (autonomy:R0)**
Record the four rules, the two severities, and that this tool writes nothing.

Acceptance: Swati can name what the scan does and does not check.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- the registry row's trigger_type still advertises a cron that nothing schedules (agentRegistrySeed.ts:1058)
- no consumer renders the findings on a cadence, so a finding can be produced and seen by nobody
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- backend/src/services/agents/curriculumQAAgent.ts:49
- backend/src/services/agents/curriculumQAAgent.ts:36
- backend/src/services/agents/curriculumQAAgent.ts:123
- backend/src/services/workGraph/capabilityRegistry.ts:78
- backend/src/services/agentRegistrySeed.ts:1058
- backend/src/services/curriculum/repointLegacyBehaviors.ts:42
- backend/src/models/CurriculumModule.ts:135
- backend/src/models/CurriculumLesson.ts:167
- docs/architecture/ai-workforce-management/employees/curriculum/TOOL_CAPABILITY_DESIGN_v1.md:30

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] Swati can name what the scan does and does not check.

When every box above is ticked, stop and show the demo.
