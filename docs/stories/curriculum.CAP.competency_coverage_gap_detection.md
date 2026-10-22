# curriculum.CAP.competency_coverage_gap_detection — Competency coverage gap detection against the declared blueprint

The competencies a week promises but nothing in it actually teaches come out as a ranked, stable list, so a gap is a tracked item rather than something a reviewer notices by luck.

**Built today:** implemented. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- no agent identity reaches the Composer today: every /api/admin/composer route is requireAdmin only (composerRoutes.ts:15-30)
- a competency id outside the controlled crosswalk is silently unresolvable, so an invented id writes evidence that looks complete and credits zero skills (.claude/skills/build-curriculum-type/SKILL.md competencies section)
- nothing asserts per-card and per-content competencies against the crosswalk, only registry-level ones

Full build prompt is attached to this story.

**Release:** r2 · r2 (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Competency coverage gap detection against the declared blueprint
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.competency_coverage_gap_detection`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** implemented · **Source:** existing_application
## The business outcome
The competencies a week promises but nothing in it actually teaches come out as a ranked, stable list, so a gap is a tracked item rather than something a reviewer notices by luck.
Intended users: Swati Raman (accountable manager), curriculum staff.
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- Resolve every competency taught by a card or by the card's type.
- Add the week's session competencies.
- Walk the blueprint's declared competencies in declaration order.
- Emit each one not present, deduplicated, with its humanised label.
**Inputs**
- the blueprint's declared competencies
- the plan's cards and each card type's registry competencies
- session_competencies for the week
**Outputs**
- a stable, blueprint-declaration-ordered list of uncovered competencies with the blueprint's own wording
**Exceptions that must be handled**
- Pure and stable-ordered so identical inputs always yield identical gaps; a reordered gap list would be a defect.
- A competency id outside the controlled crosswalk resolves to nothing and therefore cannot be reported as covered or as a gap - it is invisible, which is the dangerous case.
- The engine detects an absence of declared coverage, never a weakness in coverage that exists.
- Filling a gap changes what a student is taught and is a separate, human-decided act.
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- read_curriculum_blueprints
- read_timeline_cards
- read_competency_crosswalk
- emit_structured_log
**Application surfaces**
- /admin/orchestration composer coverage panel
- /admin/orchestration SkillControlTab
- GET /api/admin/composer/blueprints/:id/validate
- GET /api/admin/cape/curriculum-skill-maps/card/:cardId
**Source modules**
- backend/src/services/composer/coverageGapEngine.ts
- backend/src/services/composer/competencyDictionary.ts
**Dependencies**
- competencySkillCrosswalk as the controlled vocabulary
- typeRegistry competencies per card type
- the blueprint actually declaring competencies
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R7**.
Why that ceiling: Pure read-only detection with a stable output and no side effect, so R7 is permitted for reporting the gap list. Filling a gap is excluded from this capability because it would change what a student is taught.

Not a human-reserved decision, but promotion is still evidence-based and one step at a time.
**First release behaviour (autonomy:R0)**
Record what counts as coverage, including the session-competency credit, and what an unresolvable id means.

Acceptance: Swati can state why a competency can be neither covered nor a gap.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- no agent identity reaches the Composer today: every /api/admin/composer route is requireAdmin only (composerRoutes.ts:15-30)
- a competency id outside the controlled crosswalk is silently unresolvable, so an invented id writes evidence that looks complete and credits zero skills (.claude/skills/build-curriculum-type/SKILL.md competencies section)
- nothing asserts per-card and per-content competencies against the crosswalk, only registry-level ones
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- backend/src/services/composer/coverageGapEngine.ts:1
- backend/src/services/composer/coverageGapEngine.ts:19
- backend/src/services/composer/competencyDictionary.ts
- backend/src/services/timeline/typeRegistry.ts
- backend/src/constants/competencySkillCrosswalk.ts
- backend/src/services/composer/videoCurationService.ts

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] Swati can state why a competency can be neither covered nor a gap.

When every box above is ticked, stop and show the demo.
