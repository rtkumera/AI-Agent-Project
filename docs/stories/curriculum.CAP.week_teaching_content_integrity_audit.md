# curriculum.CAP.week_teaching_content_integrity_audit — Integrity audit of the shipped week decks, session plans and deep-dive guides

The teaching content students and instructors actually meet each week is checked for gaps and inconsistencies against the programme spine, instead of being trusted because it exists in the repo.

**Built today:** implemented. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- backend/src/services/delivery/execution/executionPolicy.ts:33 denies push_to_protected_main and production_deploy, so no remediation of a gap is available to an agent
- whether the missing week3 module under backend/src/data/weeks is a real gap or a deliberate structure is unknown and must not be asserted either way
- classTeachWeeks.ts at 556 KB is grandfathered past the repository's 500-line hard ceiling, so the next change to it must split it first

Full build prompt is attached to this story.

**Release:** r2 · r2 (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Integrity audit of the shipped week decks, session plans and deep-dive guides
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.week_teaching_content_integrity_audit`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** implemented · **Source:** existing_application
## The business outcome
The teaching content students and instructors actually meet each week is checked for gaps and inconsistencies against the programme spine, instead of being trusted because it exists in the repo.
Intended users: Swati Raman (accountable manager), instructors, curriculum staff.
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- Enumerate the weeks the programme spine declares.
- For each week, check for a session plan, teach content, a per-week module and a deep-dive guide.
- Report each missing piece as a named gap, never as a pass.
- Report unknown rather than inferring that an absent file means the week is intentionally empty.
**Inputs**
- the per-week session plan and teach content modules
- the canonical week blueprint spine
- the generated deep-dive guide blobs and the source HTML they are generated from
- the classroom week endpoint's view of what a student sees
**Outputs**
- an inventory of which weeks have a session plan, teach content, a per-week module and a deep-dive guide
- named gaps where one of those is missing
- unknown wherever the source of truth cannot be established
**Exceptions that must be handled**
- The deep-dive files are auto-generated base64 blobs of a source HTML guide and carry a do-not-hand-edit header, so they are build output rather than authored content; auditing them means auditing their source.
- backend/src/data/weeks contains 11 per-week modules and has no week3 and no week0, while week 3 teach content exists as two separate top-level files. Whether that is a real gap or a deliberate structure is unknown from the repo alone.
- classTeachWeeks.ts is a single 556 KB module, far past the repository's own 500-line hard ceiling, so a change to it is high blast radius.
- This audits presence and structure, never pedagogical quality or factual currency.
- Changing any of this content is publishing to learners and is a human decision.
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- read_repo_curriculum_data
- read_curriculum_modules
- emit_structured_log
**Application surfaces**
- student classroom week view
- /admin/orchestration SessionControlTab
- /admin/orchestration ProgramOverviewTab
- GET /api/portal/classroom/week/:weekNum
- GET /api/admin/accelerator/sessions/:id/curriculum
- GET /api/admin/accelerator/cohorts/:cohortId/curriculum/modules
**Source modules**
- backend/src/data/classSessionPlan.ts
- backend/src/data/classTeachWeeks.ts
- backend/src/data/weekBlueprints.ts
- backend/src/data/canonicalCourse.ts
**Dependencies**
- the canonical week spine in data/weekBlueprints.ts
- the deep-dive source guides under docs
- a human to decide whether a gap is real
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R7**.
Why that ceiling: A read-only inventory over repository content with no write path, so R7 is permitted for producing the report. Editing any of this content is publishing to learners, which is excluded from this capability entirely and would additionally need push_to_protected_main and production_deploy, both default-denied.

Not a human-reserved decision, but promotion is still evidence-based and one step at a time.
**First release behaviour (autonomy:R0)**
Record which artifacts a week must have, which are generated build output, and who decides on a gap.

Acceptance: Swati states the four per-week artifacts and that the deep-dive blobs are generated.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- backend/src/services/delivery/execution/executionPolicy.ts:33 denies push_to_protected_main and production_deploy, so no remediation of a gap is available to an agent
- whether the missing week3 module under backend/src/data/weeks is a real gap or a deliberate structure is unknown and must not be asserted either way
- classTeachWeeks.ts at 556 KB is grandfathered past the repository's 500-line hard ceiling, so the next change to it must split it first
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- backend/src/data/classSessionPlan.ts
- backend/src/data/classTeachWeeks.ts
- backend/src/data/weekBlueprints.ts
- backend/src/data/weeks
- backend/src/data/canonicalCourse.ts
- backend/src/data/deepDiveWeek1Html.ts:1
- backend/src/data/bookCurriculumMapping.json
- backend/src/data/lessonSkillMap.json
- backend/src/routes/participantRoutes.ts:798

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] Swati states the four per-week artifacts and that the deep-dive blobs are generated.

When every box above is ticked, stop and show the demo.
