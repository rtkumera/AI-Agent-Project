# curriculum.CAP.learner_outcome_to_curriculum_feedback_loop — Turning real learner outcomes back into evidenced curriculum findings

**CANDIDATE -- not started, not assigned.** This is one line on this domain's list of everything its agent could eventually do. It becomes real work only when the builder picks it and their manager agrees, at which point it opens as four stories. Until then it is deliberately inert, and the honest status of it is "not started" rather than "behind".

Where students actually stall, score badly or stop is fed back into named curriculum findings, so the decision to change a week rests on learner evidence instead of opinion.

**Built today:** absent. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- the retired CurriculumOptimizerAgent had zero importers and no scheduler entry, so there is no historical baseline for this analysis (COVERAGE_CONTRACT.md:31)
- no metric key exists on the goals model for any learner-outcome measure, so none of this can be a measured KPI today
- whether current cohort sizes are large enough for a non-noisy signal is unknown and must be established before any finding is acted on

Full build prompt is attached to this story.

**Release:** autonomy:R0 · Legacy migration plan (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Turning real learner outcomes back into evidenced curriculum findings
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.learner_outcome_to_curriculum_feedback_loop`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** absent · **Source:** proposed_new
## The business outcome
Where students actually stall, score badly or stop is fed back into named curriculum findings, so the decision to change a week rests on learner evidence instead of opinion.
Intended users: Swati Raman (accountable manager), curriculum staff, instructors.
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- Read real learner progress, assessment and completion data.
- Identify where students stall, score badly or stop, per card and per week.
- Attach the real counts and the cohort size to every finding.
- Report the finding; never change the curriculum.
- State explicitly when the data cannot separate a curriculum cause from a cohort or delivery cause.
**Inputs**
- timeline card progress and lesson instance states per student
- assessment attempts and scores
- cohort completion and drop-off points
**Outputs**
- named curriculum findings carrying the learner evidence behind them
- a per-week or per-card signal a human can act on
- unknown wherever the data cannot distinguish a curriculum problem from a cohort problem
**Exceptions that must be handled**
- A drop-off is not by itself evidence of a curriculum defect: cohort composition, delivery, timing and life circumstances all produce the same shape, and the finding must say so.
- A small cohort produces a signal too noisy to act on; a finding must carry its sample size or it is not a finding.
- The retired agent that intended this was never wired and produced nothing, so there is no historical baseline to compare against.
- Acting on a finding means changing what students are taught, which is a human decision handled by the publish capability.
- No metric key exists for any of this on the goals model, so none of it can be a measured KPI today.
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- read_learner_progress
- read_assessment_attempts
- read_timeline_cards
- emit_structured_log
**Application surfaces**
- /admin/accelerator curriculum completion and week breakdown views
- /admin/orchestration AnalyticsTab
- GET /api/admin/accelerator/cohorts/:cohortId/curriculum-completion
- GET /api/admin/accelerator/students/:enrollmentId/week-breakdown
- GET /api/admin/accelerator/enrollments/:enrollmentId/curriculum-progress
**Source modules**
- backend/src/models/TimelineCardProgress.ts
- backend/src/models/LessonInstance.ts
- backend/src/models/StudentAssessment.ts
**Dependencies**
- real learner progress and assessment data at sufficient volume
- a card-level and week-level join that is reliable
- a human to decide whether a finding is a curriculum cause
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R4**.
Why that ceiling: Producing the finding is read-only, but the finding exists to inform a change to what students are taught, which makes the decision permanently human-required. R4 permits the stateful multi-step analysis in sandbox; R5 is withheld because no approved reference finding set exists to shadow against, and a drop-off cannot yet be separated from its cause.

**THIS IS A HUMAN DECISION.** It stays human-required at every autonomy level, forever. An
agent may prepare, summarise and propose; it may never decide. No amount of evidence
promotes this into automation.
**First release behaviour (autonomy:R0)**
Record the data sources, the confounds, the minimum sample, and that a finding is not a cause.

Acceptance: Swati states what a drop-off does and does not prove, and the minimum cohort size for a finding.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- the retired CurriculumOptimizerAgent had zero importers and no scheduler entry, so there is no historical baseline for this analysis (COVERAGE_CONTRACT.md:31)
- no metric key exists on the goals model for any learner-outcome measure, so none of this can be a measured KPI today
- whether current cohort sizes are large enough for a non-noisy signal is unknown and must be established before any finding is acted on
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- backend/src/services/agents/curriculumOptimizerAgent.ts:11
- backend/src/services/agentRegistrySeed.ts:1068
- docs/architecture/ai-workforce-management/employees/curriculum/COVERAGE_CONTRACT.md:31
- backend/src/models/TimelineCardProgress.ts
- backend/src/models/LessonInstance.ts:98
- backend/src/models/StudentAssessment.ts:113
- backend/src/models/AssessmentAttempt.ts:76
- backend/src/services/composer/validationEngine.ts:26
- docs/architecture/ai-workforce-management/employees/curriculum/ROLE_CHARTER_v1.md:40

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] Swati states what a drop-off does and does not prove, and the minimum cohort size for a finding.

When every box above is ticked, stop and show the demo.
