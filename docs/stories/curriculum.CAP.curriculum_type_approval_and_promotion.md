# curriculum.CAP.curriculum_type_approval_and_promotion — Approving a curriculum type and promoting it so it can reach students

A learning activity type becomes schedulable only when a named human has approved it and it has been promoted into committed code, so nothing a student meets exists only as an environment-local database edit.

**Built today:** implemented. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- backend/src/services/delivery/execution/executionPolicy.ts:33 denies push_to_protected_main and production_deploy, both of which promotion requires
- approved_by exists as a column but the route is requireAdmin only, so no specific approver is required by the system (componentRoutes.ts:42)
- the boot type seeder re-asserts registry metadata, so an approved type's metadata can revert on restart unless it is in the seed files

Full build prompt is attached to this story.

**Release:** r2 · r2 (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Approving a curriculum type and promoting it so it can reach students
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.curriculum_type_approval_and_promotion`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** implemented · **Source:** existing_application
## The business outcome
A learning activity type becomes schedulable only when a named human has approved it and it has been promoted into committed code, so nothing a student meets exists only as an environment-local database edit.
Intended users: Swati Raman (accountable manager), Ali Muwwakkil (DRI), students (as the eventual recipients).
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- A human reviews the type on all three real surfaces: the tile, the drawer and the workspace.
- The human approves; scaffoldPlan then includes the slug and the type becomes schedulable.
- Promote by committing the two seed files, which is the step that actually ships it.
- Verify by re-reading the slug and type-checking any code change.
**Inputs**
- a drafted, previewed type
- a named human's approval decision
- the two seed files that carry it to another environment
**Outputs**
- approved true with approved_at and approved_by recorded
- a lifecycle stage transition
- committed seed entries so the type survives a deploy to another environment
**Exceptions that must be handled**
- Approval is functional, not cosmetic: an unapproved type cannot be scheduled at all.
- A database edit through the component API is environment-local and does not reach another environment; getting this wrong means the work silently never ships.
- A type can look correct in the drawer and render broken in the workspace, because the workspace is not the same CSS container.
- What a student is taught is a human decision; this capability is the decision point and cannot be automated at any rung.
- approved and slug are deliberately not editable through the update route.
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- component_api_read
- render_component_preview
- prepare_promotion_diff
- emit_structured_log
**Application surfaces**
- /admin/orchestration Experience Studio approval control
- /admin/orchestration LifecycleStepper
- /admin/orchestration studio VersionCompare
- PUT /api/admin/components/:slug/approval
- GET and PUT /api/admin/components/:slug/lifecycle
- GET /api/admin/components/:slug/estimate
**Source modules**
- backend/src/services/components/componentService.ts
- backend/src/services/components/lifecycleService.ts
- backend/src/seeds/seedComponentAuthoring.ts
**Dependencies**
- a named human approver
- the two committed seed files
- a deploy to carry the promotion to another environment
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R5**.
Why that ceiling: Approval is the gate between a draft and something a student can be scheduled into, so it is permanently human-required and capped at autonomy:R5. Even at R5 the agent only prepares the promotion diff. Promotion itself needs push_to_protected_main and production_deploy, both default-denied, so there is no automation path.

**THIS IS A HUMAN DECISION.** It stays human-required at every autonomy level, forever. An
agent may prepare, summarise and propose; it may never decide. No amount of evidence
promotes this into automation.
**First release behaviour (autonomy:R0)**
Record who approves, what approval unlocks, and that a database edit is not a promotion.

Acceptance: Swati states that an unapproved type cannot be scheduled and names who signs off.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- backend/src/services/delivery/execution/executionPolicy.ts:33 denies push_to_protected_main and production_deploy, both of which promotion requires
- approved_by exists as a column but the route is requireAdmin only, so no specific approver is required by the system (componentRoutes.ts:42)
- the boot type seeder re-asserts registry metadata, so an approved type's metadata can revert on restart unless it is in the seed files
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- backend/src/models/CurriculumTypeDefinition.ts:293
- backend/src/routes/admin/componentRoutes.ts:42
- backend/src/services/composer/composerAi.ts:81
- backend/src/services/timeline/typeRegistry.ts
- backend/src/seeds/seedComponentAuthoring.ts
- backend/src/services/components/lifecycleService.ts
- backend/src/routes/admin/componentRoutes.ts:40
- .claude/skills/build-curriculum-type/SKILL.md

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] Swati states that an unapproved type cannot be scheduled and names who signs off.

When every box above is ticked, stop and show the demo.
