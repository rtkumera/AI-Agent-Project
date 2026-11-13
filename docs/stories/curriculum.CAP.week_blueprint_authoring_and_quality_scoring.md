# curriculum.CAP.week_blueprint_authoring_and_quality_scoring — Week and session blueprint authoring with a real quality, coverage and readiness score

**CANDIDATE -- not started, not assigned.** This is one line on this domain's list of everything its agent could eventually do. It becomes real work only when the builder picks it and their manager agrees, at which point it opens as four stories. Until then it is deliberately inert, and the honest status of it is "not started" rather than "behind".

Every span of the programme has one authored blueprint carrying its objectives, competencies, architect domains and workload, with three scores a human can drive up, instead of a week that exists only as whatever cards happen to be scheduled.

**Built today:** implemented. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- no agent identity reaches the Composer today: every /api/admin/composer route is requireAdmin only (composerRoutes.ts:15-30)
- CurriculumBlueprint.status has no database constraint and no FK on program_id or cohort_id (CurriculumBlueprint.ts:104-105, :136)
- no agreed definition of a good blueprint exists beyond the three computed scores

Full build prompt is attached to this story.

**Release:** autonomy:R0 · Legacy migration plan (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Week and session blueprint authoring with a real quality, coverage and readiness score
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.week_blueprint_authoring_and_quality_scoring`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** implemented · **Source:** existing_application
## The business outcome
Every span of the programme has one authored blueprint carrying its objectives, competencies, architect domains and workload, with three scores a human can drive up, instead of a week that exists only as whatever cards happen to be scheduled.
Intended users: Swati Raman (accountable manager), curriculum staff, instructors.
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- Create or update the blueprint for a span.
- Declare its competencies, architect domains, objectives and success criteria.
- Generate a plan against it.
- Recompute the hours rollup from the real card set.
- Advance status only when the validation gate permits it.
**Inputs**
- a scope (lesson through program), a week number, a program and cohort id
- learning objectives, competencies, architect domains, session competencies, bloom levels
- the canonical week blueprint data in data/weekBlueprints.ts
**Outputs**
- a curriculum_blueprints row with status draft, generated, validated or published
- quality_score, coverage_score and readiness_score
- a rolled-up estimated_hours
**Exceptions that must be handled**
- status is an unconstrained STRING(20) whose four legal values exist only in a comment, unlike the real ENUMs on CurriculumModule and LessonInstance, so an invalid status cannot be rejected by the database.
- program_id and cohort_id are bare UUIDs with no foreign key, so a blueprint can reference a program that does not exist.
- A blueprint with a high quality_score and no published cards teaches nobody; the score is about the design, not the delivery.
- Authoring the blueprint is upstream of publishing; nothing here reaches a learner on its own.
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- read_curriculum_blueprints
- write_curriculum_blueprint_draft
- read_timeline_cards
- openai_llm_completion
- emit_structured_log
**Application surfaces**
- /admin/orchestration ProgramBlueprintTab
- /admin/orchestration BlueprintDefaults
- /admin/orchestration composer
- GET and POST /api/admin/composer/blueprints
- GET, PUT and DELETE /api/admin/composer/blueprints/:id
- POST /api/admin/composer/blueprints/:id/generate
- GET /api/admin/orchestration/timeline/blueprint-context
**Source modules**
- backend/src/services/composer/blueprintService.ts
- backend/src/services/composer/blueprintRollup.ts
- backend/src/services/composer/curriculumDna.ts
- backend/src/models/CurriculumBlueprint.ts
**Dependencies**
- timeline typeRegistry for the component vocabulary
- competencySkillCrosswalk as the controlled competency vocabulary
- data/weekBlueprints.ts as the canonical program spine
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R4**.
Why that ceiling: A blueprint is the declaration of what a week teaches, so its content is a human decision and is permanently human-required. R4 permits stateful multi-step authoring of drafts in sandbox; R5 is withheld because there is no approved reference blueprint set to shadow against, and inventing one would be the fabrication this matrix exists to avoid.

**THIS IS A HUMAN DECISION.** It stays human-required at every autonomy level, forever. An
agent may prepare, summarise and propose; it may never decide. No amount of evidence
promotes this into automation.
**First release behaviour (autonomy:R0)**
Record the four statuses, the three scores, and who may advance a blueprint.

Acceptance: Swati states what each score means and who advances status.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- no agent identity reaches the Composer today: every /api/admin/composer route is requireAdmin only (composerRoutes.ts:15-30)
- CurriculumBlueprint.status has no database constraint and no FK on program_id or cohort_id (CurriculumBlueprint.ts:104-105, :136)
- no agreed definition of a good blueprint exists beyond the three computed scores
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- backend/src/models/CurriculumBlueprint.ts:141
- backend/src/models/CurriculumBlueprint.ts:136
- backend/src/models/CurriculumBlueprint.ts:133
- backend/src/services/composer/blueprintService.ts:90
- backend/src/services/composer/blueprintRollup.ts:41
- backend/src/services/composer/curriculumDna.ts
- backend/src/data/weekBlueprints.ts
- backend/src/services/timeline/blueprintContext.ts
- backend/src/routes/admin/composerRoutes.ts:21
- backend/src/routes/admin/composerRoutes.ts:29

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] Swati states what each score means and who advances status.

When every box above is ticked, stop and show the demo.
