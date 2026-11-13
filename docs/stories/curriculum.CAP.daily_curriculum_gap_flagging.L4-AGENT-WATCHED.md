# curriculum.CAP.daily_curriculum_gap_flagging.L4-AGENT-WATCHED — Daily curriculum-quality gap flag for the accountable manager · 4 · agent does it, watched

**Let the agent do it at its starting rung, with a human approving every run.**

Only start this once step 3 has a recorded decision and the tool exists. The agent now does the capability at **R0**, its own starting rung, with a named human approving every single run before it takes effect.

**The behaviour to reach**
Record the rule, its two thresholds, the dedup key and the fact that only a human closes the task.

**How it is judged**
Swati can state, unprompted, what makes a day produce a flag and what makes it produce nothing.

**Measure it against your run log, not against a feeling.** Same inputs, same outcome, and the exceptions from step 1 handled the way you handled them. A run that differs is evidence, and it belongs in the record whether or not it is convenient.

**This capability's ceiling is autonomy:R6.** An internal queue write a human must act on, not a learner-facing change. R6 (separately approved supervised production pilot) is the ceiling because it already writes in production and the honest next step is a supervised pilot with a named approver, not automation. R7 is withheld: no action class has been explicitly authorized on this ladder.

Higher rungs are not part of this story and are not tasks. A rung is earned by a named human on evidence, after this one is working and has a record behind it.

**When this passes, the capability is done and the next one starts.** One at a time is the point: pick the next capability with your manager and open its step 1.

**Release:** autonomy:R0 · Legacy migration plan (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Daily curriculum-quality gap flag for the accountable manager · R0
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
**This story is one rung: autonomy:R0**
Record the rule, its two thresholds, the dedup key and the fact that only a human closes the task.

Acceptance: Swati can state, unprompted, what makes a day produce a flag and what makes it produce nothing.

**Satisfying this does not promote anything.** It makes autonomy:R0 *eligible*. A named human promotes the capability one step, on this evidence. Story completion, elapsed time, a conversation that went well and a passing mocked test are all recorded as non-promoting signals, so none of them moves the rung.
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

- [ ] Swati can state, unprompted, what makes a day produce a flag and what makes it produce nothing.
- [ ] The agent produced the same outcome as the step 1 run log, on the same inputs, including the exceptions recorded there.
- [ ] Every run in the evidence window was approved by a named human before it took effect, and the record shows who.

When every box above is ticked, stop and show the demo.
