# curriculum.CAP.daily_curriculum_gap_flagging.L1-BY-HAND — Daily curriculum-quality gap flag for the accountable manager · 1 · do it by hand

**Understand the work by doing it yourself, before anything automates it.**

Do this capability yourself, by hand, once, end to end. Not a simulation and not a description -- the real task, with the real inputs, producing the real outcome.

**The outcome you are producing**
Swati gets one specific, evidence-carrying curriculum-quality gap per day as an actionable internal task instead of discovering a weak week after students have sat through it.

**The workflow as it was recorded during research.** Treat this as a claim to be tested, not as instructions. Where it is wrong or incomplete, that difference is the single most valuable thing this story produces.
- Gather the school-wide signal snapshot.
- Run the deterministic curriculum director rules (zero blueprints, or avg quality below 65).
- Take the top-ranked recommendation only; never fan out.
- Check for an already-open task on the same source_rec_key and stop if one exists.
- Write one workforce_tasks row with the rule's why and evidence attached.
- A human moves the task; the agent never closes it.

**What goes in**
- gatherSignals() school-wide signal snapshot (backend/src/services/ops/schoolSignals.ts)
- curriculum_blueprints rows: blueprint count and avg quality_score
- the existing open WorkforceTask set, for source_rec_key dedup

**What comes out**
- one workforce_tasks row per real finding, employee_slug 'curriculum', approver 'chief_of_staff'
- a mirrored ticket under Dara's identity
- no row at all when the day has no signal (reason 'no_signal_today')

**Exceptions the research expects you to hit**
- No signal today is a valid outcome and writes nothing, never a manufactured finding.
- An already-open flag on the same rec key is skipped, so a re-run is a no-op.
- Dara's AiAgent.enabled false makes the write a no-op by design (isDaraEnabled, charter boundary 6).
- Blueprint quality_score is an unconstrained STRING-backed score with no FK to program or cohort (CurriculumBlueprint.ts:104-105), so a gap attributed to the wrong program cannot be ruled out.

**Write a run log.** It is the deliverable of this story and every later step cites it. Record the date, how long it actually took, each step you really performed, every judgment call you made and what you based it on, and at least one thing that was harder, slower or more ambiguous than the workflow above implies.

While you work, keep asking which parts are mechanical and which need judgment. That split is what the tool request in step 3 will be argued from.

The four steps of this capability run in order. A later step opened before its predecessor is complete is the thing this ladder exists to prevent -- say so and go back rather than working ahead.

**Release:** autonomy:R0 · Legacy migration plan (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Daily curriculum-quality gap flag for the accountable manager
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.daily_curriculum_gap_flagging`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** implemented · **Source:** inherited
## The business outcome
Swati gets one specific, evidence-carrying curriculum-quality gap per day as an actionable internal task instead of discovering a weak week after students have sat through it.
Intended users: Swati Raman (accountable manager), curriculum staff, Ali Muwwakkil (DRI).
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- Gather the school-wide signal snapshot.
- Run the deterministic curriculum director rules (zero blueprints, or avg quality below 65).
- Take the top-ranked recommendation only; never fan out.
- Check for an already-open task on the same source_rec_key and stop if one exists.
- Write one workforce_tasks row with the rule's why and evidence attached.
- A human moves the task; the agent never closes it.
**Inputs**
- gatherSignals() school-wide signal snapshot (backend/src/services/ops/schoolSignals.ts)
- curriculum_blueprints rows: blueprint count and avg quality_score
- the existing open WorkforceTask set, for source_rec_key dedup
**Outputs**
- one workforce_tasks row per real finding, employee_slug 'curriculum', approver 'chief_of_staff'
- a mirrored ticket under Dara's identity
- no row at all when the day has no signal (reason 'no_signal_today')
**Exceptions that must be handled**
- No signal today is a valid outcome and writes nothing, never a manufactured finding.
- An already-open flag on the same rec key is skipped, so a re-run is a no-op.
- Dara's AiAgent.enabled false makes the write a no-op by design (isDaraEnabled, charter boundary 6).
- Blueprint quality_score is an unconstrained STRING-backed score with no FK to program or cohort (CurriculumBlueprint.ts:104-105), so a gap attributed to the wrong program cannot be ruled out.
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- read_curriculum_blueprints
- create_workforce_task
- create_internal_ticket
- emit_structured_log
**Application surfaces**
- /admin/workforce (mapped to section 'program', mgmtSectionGate.ts:71)
- internal cron only; no HTTP route triggers this
**Source modules**
- backend/src/services/workforce/directorActions.ts
- backend/src/services/workforce/workforceAgentRuntime.ts
- backend/src/services/ops/directors.ts
- backend/src/services/ops/schoolSignals.ts
**Dependencies**
- ops/directors.ts rule thresholds staying the single definition of 'a gap'
- workforceAgentRuntime write gate (registry row, enabled, not paused, kill switch, safe mode, table allow-list)
- Swati actually working the task queue, which no field measures
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R6**.
Why that ceiling: An internal queue write a human must act on, not a learner-facing change. R6 (separately approved supervised production pilot) is the ceiling because it already writes in production and the honest next step is a supervised pilot with a named approver, not automation. R7 is withheld: no action class has been explicitly authorized on this ladder.

Not a human-reserved decision, but promotion is still evidence-based and one step at a time.
**First release behaviour (autonomy:R0)**
Record the rule, its two thresholds, the dedup key and the fact that only a human closes the task.

Acceptance: Swati can state, unprompted, what makes a day produce a flag and what makes it produce nothing.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- run_count and error_count for all three of Dara's timers pool on one AiAgent row, so a silent failure of this one is indistinguishable from the other two succeeding (docs/architecture/ai-workforce-management/SUPERVISOR_HEALTH_AUDIT_2026-10-06.md:181-205)
- no field records time-to-action on a WorkforceTask, so the stated KPI is UNMEASURED (ROLE_CHARTER_v1.md:40)
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- backend/src/services/agentRegistrySeed.ts:2249
- backend/src/services/aiOpsScheduler.ts:367
- backend/src/services/workforce/directorActions.ts:70
- backend/src/services/workforce/directorActions.ts:41
- backend/src/services/ops/directors.ts:52
- backend/src/services/ops/directors.ts:54
- backend/src/services/agentPermissionService.ts:88
- backend/src/services/curriculum/repointLegacyBehaviors.ts:32
- docs/architecture/ai-workforce-management/employees/curriculum/ROLE_CHARTER_v1.md:25
- docs/architecture/ai-workforce-management/employees/curriculum/COVERAGE_CONTRACT.md:11

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] The capability was performed end to end by hand, producing its real outcome on real inputs.
- [ ] A run log exists recording the date, the elapsed time, each step actually performed, every judgment call made, and at least one way the recorded workflow differed from what the work was really like.

When every box above is ticked, stop and show the demo.
