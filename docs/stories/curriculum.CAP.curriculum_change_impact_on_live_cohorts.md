# curriculum.CAP.curriculum_change_impact_on_live_cohorts — Impact assessment before a curriculum change reaches a cohort already mid-programme

**CANDIDATE -- not started, not assigned.** This is one line on this domain's list of everything its agent could eventually do. It becomes real work only when the builder picks it and their manager agrees, at which point it opens as four stories. Until then it is deliberately inert, and the honest status of it is "not started" rather than "behind".

Before a week, type or assessment changes, the students already part-way through it are identified along with what the change does to their progress, gating and readiness - so the change is made with its consequences known.

**Built today:** absent. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- backend/src/services/delivery/execution/executionPolicy.ts:33 denies push_to_protected_main and production_deploy, which applying any such change ultimately requires
- the curriculum version diff endpoint appears unreachable: GET /curriculum/versions/diff is registered after GET /curriculum/versions/:blueprintId in the same router, so the parameterised route shadows it (backend/src/routes/admin/previewRoutes.ts:20, :75)
- those version and preview routes are mounted at the application root with no /api/admin prefix, which makes them easy to miss when reasoning about the admin surface
- no reliable join exists today from a curriculum type slug to the students positioned on it, so the affected-student list is unknown rather than empty

Full build prompt is attached to this story.

**Release:** autonomy:R0 · Legacy migration plan (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Impact assessment before a curriculum change reaches a cohort already mid-programme
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.curriculum_change_impact_on_live_cohorts`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** absent · **Source:** proposed_new
## The business outcome
Before a week, type or assessment changes, the students already part-way through it are identified along with what the change does to their progress, gating and readiness - so the change is made with its consequences known.
Intended users: Swati Raman (accountable manager), curriculum staff, instructors, students (as the affected party).
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- Identify the span the change touches.
- Find every cohort and student currently positioned in or past it.
- Trace what the change does to their progress records, gating and readiness.
- Report the consequence per affected group.
- Hand the assessment to a human, who decides whether to proceed.
**Inputs**
- the proposed change: a blueprint revision, a type edit, an assessment change or a re-publish
- the cohorts and students currently positioned in the affected span
- the gating rules and readiness snapshots that depend on it
**Outputs**
- a named list of affected cohorts and students with where each one stands
- the gating, progress and readiness consequence of the change
- unknown wherever the dependency cannot be traced
**Exceptions that must be handled**
- A slug is an immutable foreign key: a rename orphans real student progress, and this assessment is where that must be caught rather than after the fact.
- A forced re-publish leaves the previously published cards in place, so students can see both versions until a human prunes - the assessment must say so.
- A changed assessment or weight retroactively moves readiness snapshots that students have already seen.
- Proceeding is a human decision because it changes what a student in the middle of the programme is taught.
- Where a dependency cannot be traced, the assessment must say unknown rather than report no impact.
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- read_learner_progress
- read_timeline_cards
- read_curriculum_blueprints
- read_cert_sessions
- emit_structured_log
**Application surfaces**
- /admin/orchestration TimelineEditorTab
- /admin/orchestration GatingControlTab
- /admin/orchestration curriculum version and preview surfaces
- GET /curriculum/versions/:blueprintId
- POST /curriculum/versions/:blueprintId/snapshot
- GET /preview/curriculum/:snapshotId
**Source modules**
- backend/src/services/curriculumVersioningService.ts
- backend/src/services/timeline/timelineGatingService.ts
- backend/src/services/composer/publishService.ts
**Dependencies**
- a reliable join from a curriculum artifact to the students positioned on it
- the gating rules being inspectable
- a human to decide whether to proceed
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R5**.
Why that ceiling: The assessment is read-only, but it exists to gate a change that reaches learners mid-programme, which makes it human-decided and caps it at autonomy:R5. At R5 the agent produces the assessment and a human decides; applying the change is a different capability and needs default-denied capabilities to reach production.

**THIS IS A HUMAN DECISION.** It stays human-required at every autonomy level, forever. An
agent may prepare, summarise and propose; it may never decide. No amount of evidence
promotes this into automation.
**First release behaviour (autonomy:R0)**
Record what a change can break, who is affected, and that proceeding is a human decision.

Acceptance: Swati states what a slug rename would do to student progress and who decides on a change.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- backend/src/services/delivery/execution/executionPolicy.ts:33 denies push_to_protected_main and production_deploy, which applying any such change ultimately requires
- the curriculum version diff endpoint appears unreachable: GET /curriculum/versions/diff is registered after GET /curriculum/versions/:blueprintId in the same router, so the parameterised route shadows it (backend/src/routes/admin/previewRoutes.ts:20, :75)
- those version and preview routes are mounted at the application root with no /api/admin prefix, which makes them easy to miss when reasoning about the admin surface
- no reliable join exists today from a curriculum type slug to the students positioned on it, so the affected-student list is unknown rather than empty
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- backend/src/models/LessonInstance.ts:54
- backend/src/models/TimelineCardProgress.ts
- backend/src/models/CurriculumTypeDefinition.ts:307
- backend/src/services/timeline/timelineGatingService.ts
- backend/src/services/composer/publishService.ts:42
- backend/src/models/CertReadinessSnapshot.ts:92
- backend/src/services/curriculumVersioningService.ts
- backend/src/routes/admin/previewRoutes.ts:47

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] Swati states what a slug rename would do to student progress and who decides on a change.

When every box above is ticked, stop and show the demo.
