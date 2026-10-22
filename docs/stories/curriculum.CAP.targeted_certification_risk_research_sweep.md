# curriculum.CAP.targeted_certification_risk_research_sweep — Per-student certification-risk research sweep, human-mediated

A specific pilot-cohort student whose certification readiness has fallen below the bar becomes a named task for Swati, with the weak domains and the real probability attached, rather than a cohort average that hides them.

**Built today:** implemented. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- MAX_FLAGGED_PER_SWEEP is a disclosed guess, explicitly flagged for revisiting with a human (daraResearchService.ts:30-33)
- no field measures whether Swati acts on these tasks, so the capability's effect is UNMEASURED (ROLE_CHARTER_v1.md:41)
- run and error counts share one AiAgent row with Dara's two director timers

Full build prompt is attached to this story.

**Release:** r2 · r2 (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Per-student certification-risk research sweep, human-mediated
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.targeted_certification_risk_research_sweep`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** implemented · **Source:** inherited
## The business outcome
A specific pilot-cohort student whose certification readiness has fallen below the bar becomes a named task for Swati, with the weak domains and the real probability attached, rather than a cohort average that hides them.
Intended users: Swati Raman (accountable manager), cert-prep staff.
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- Read the pilot cohort ids; stop entirely if none are configured.
- Query candidate active enrollments in those cohorts.
- Re-verify eligibility per student independently of the candidate query.
- Evaluate the certification-risk signal; skip when at or above 0.55 or when no weak domain can be named.
- Skip any student with an already-open flag on the same rec key.
- Write one task per remaining student, capped at five per sweep.
- Never message the student; a human is the recipient.
**Inputs**
- AiAgent.config.pilot_cohort_ids, which a human must set and which starts empty
- active enrollments in those cohorts
- computeCertificationReadiness() per student
- open WorkforceTask set keyed dara.certification_risk.<enrollmentId>
**Outputs**
- up to five workforce_tasks rows per sweep, each naming one student, their pass probability and weak domains
- a skipped-reason tally so a sweep that flags nothing says why
- ran:false with reason no_pilot_cohort_configured when no cohort is set
**Exceptions that must be handled**
- Fail-closed by design: no pilot cohort, student not found, or student not active all resolve to not eligible.
- Below the threshold with no specific weak domain is deliberately not flagged, because an unactionable flag is noise.
- The five-per-sweep cap is a disclosed default, not a measured limit.
- Dara deliberately does not contact the student: no consent mechanism exists anywhere in the codebase, confirmed by direct research.
- This reports readiness for Anthropic's credential and issues nothing.
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- read_enrollments
- read_cert_sessions
- read_student_competencies
- create_workforce_task
- emit_structured_log
**Application surfaces**
- /admin/workforce
- /admin/cert-prep cohort readiness views
- internal cron 15 6 * * *; no HTTP route
**Source modules**
- backend/src/services/curriculum/daraResearchService.ts
- backend/src/services/curriculum/daraEligibilityService.ts
- backend/src/services/curriculum/daraSignalService.ts
**Dependencies**
- a human setting pilot_cohort_ids
- certificationReadiness staying the single readiness definition
- WorkforceTask source_rec_key dedup
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R6**.
Why that ceiling: It writes per-student internal tasks a human acts on and never contacts the learner, so it is not itself a human_decision capability. R6 is the ceiling because it already runs in production against real student data and the honest next rung is a separately approved supervised pilot, not automation of an unmeasured flag.

Not a human-reserved decision, but promotion is still evidence-based and one step at a time.
**First release behaviour (autonomy:R0)**
Record the fail-closed gate, the 0.55 bar, the five-per-sweep cap and the no-student-contact rule.

Acceptance: Swati confirms the cohort, the cap and that no student is contacted.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- MAX_FLAGGED_PER_SWEEP is a disclosed guess, explicitly flagged for revisiting with a human (daraResearchService.ts:30-33)
- no field measures whether Swati acts on these tasks, so the capability's effect is UNMEASURED (ROLE_CHARTER_v1.md:41)
- run and error counts share one AiAgent row with Dara's two director timers
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- backend/src/services/curriculum/daraResearchService.ts:54
- backend/src/services/curriculum/daraResearchService.ts:36
- backend/src/services/curriculum/daraResearchService.ts:93
- backend/src/services/curriculum/daraEligibilityService.ts:40
- backend/src/services/curriculum/daraSignalService.ts:31
- backend/src/services/curriculum/daraSignalService.ts:18
- backend/src/services/aiOpsScheduler.ts:375
- docs/architecture/ai-workforce-management/employees/curriculum/ROLE_CHARTER_v1.md:68

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] Swati confirms the cohort, the cap and that no student is contacted.

When every box above is ticked, stop and show the demo.
