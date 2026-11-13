# curriculum.CAP.daily_curriculum_gap_flagging.L3-TOOL-REQUEST — Daily curriculum-quality gap flag for the accountable manager · 3 · request the tool

**Ask for the tool, and let a human decide whether the agent may have it.**

File a tool request for this capability, and let it be decided. This is a real governance gate with a real human on the other side of it, not paperwork.

**How to file it.** Open the Change Requests page in the admin and file one against `curriculum`, the domain you own. It posts to `POST /api/admin/agent-domain-change-requests-mine`. Swati Raman or an admin decides it at `POST /api/admin/agent-domain-change-requests/:id/decide`. You cannot decide your own.

**The tools this capability was recorded as needing**
- read_curriculum_blueprints
- create_workforce_task
- create_internal_ticket
- emit_structured_log

**What the request has to say**, and all of it comes from work you have already done:
- The exact thing the tool would do, in one sentence.
- Why it is needed, citing your step 1 run log -- what was slow, repetitive or error-prone.
- What you proved in step 2: that the product can already produce this outcome by hand, or exactly which gap stops it.
- The scope: what the tool may touch and what it must never touch.
- Who approves a run, and what happens when the tool is wrong.

Say explicitly which parts of the work the tool takes and which stay with a person.

**A declined request is a completed story.** The decision is the outcome, not the approval. Record what was decided and why, and if it was declined, what would have to change.

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

- [ ] A change request for a tool exists against this domain, filed by the builder, naming the tool, its scope, what it must never touch, and who approves a run.
- [ ] The request cites the step 1 run log and the step 2 result as its evidence.
- [ ] A named human other than the builder has recorded a decision on it. A decline counts; an undecided request does not.

When every box above is ticked, stop and show the demo.
