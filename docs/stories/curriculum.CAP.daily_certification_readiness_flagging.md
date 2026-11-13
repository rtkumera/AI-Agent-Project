# curriculum.CAP.daily_certification_readiness_flagging — Daily cohort certification-readiness risk flag

**CANDIDATE -- not started, not assigned.** This is one line on this domain's list of everything its agent could eventually do. It becomes real work only when the builder picks it and their manager agrees, at which point it opens as four stories. Until then it is deliberately inert, and the honest status of it is "not started" rather than "behind".

When the active cohort's estimated CCAR-F pass probability drops below the agreed bar, Swati gets one task naming the weak Anthropic domains, instead of finding out at exam time.

**Built today:** implemented. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- run_count/error_count for Dara's three timers pool on one AiAgent row (docs/architecture/ai-workforce-management/SUPERVISOR_HEALTH_AUDIT_2026-10-06.md:181-205)
- the DOMAIN_MAP at certificationReadiness.ts:9-16 has no recorded cross-check against Anthropic's current published CCAR-F domain list

Full build prompt is attached to this story.

**Release:** autonomy:R0 · Legacy migration plan (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Daily cohort certification-readiness risk flag
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.daily_certification_readiness_flagging`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** implemented · **Source:** inherited
## The business outcome
When the active cohort's estimated CCAR-F pass probability drops below the agreed bar, Swati gets one task naming the weak Anthropic domains, instead of finding out at exam time.
Intended users: Swati Raman (accountable manager), cert-prep staff, Ali Muwwakkil (DRI).
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- Gather the aggregate certification signal.
- Compare avg_pass_prob to the 55 bar.
- Take the top recommendation only.
- Dedup on source_rec_key cert.boost.
- Write one task naming the weak domains.
- A human acts; the agent never closes it.
**Inputs**
- gatherSignals() aggregate certification signal (avg_pass_prob, exam_ready count)
- computeCertificationReadiness() per-student competency mapping onto the six Anthropic domains
- open WorkforceTask set for source_rec_key dedup
**Outputs**
- one workforce_tasks row when avg_pass_prob is under 55, carrying the real number and the exam-ready count
- no row when the aggregate is at or above the bar
**Exceptions that must be handled**
- This reports readiness for Anthropic's CCAR-F credential; it never issues, awards or confers anything.
- pass_probability is a Colaberry estimate on a shared axis, not a prediction of Anthropic's result (certReadinessService.ts:33 READINESS_POLICY_VERSION).
- A cohort with no completed sittings yields not_measured, which must not be reported as a low score.
- Dara disabled makes the write a no-op.
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- read_cert_sessions
- read_student_competencies
- create_workforce_task
- create_internal_ticket
- emit_structured_log
**Application surfaces**
- /admin/workforce
- /admin/cert-prep surfaces under section program
- internal cron only
**Source modules**
- backend/src/services/workforce/directorActions.ts
- backend/src/services/ops/directors.ts
- backend/src/services/runtime/certificationReadiness.ts
- backend/src/services/certPrep/certReadinessService.ts
**Dependencies**
- ops/directors.ts 55 threshold as the single definition of risk
- certificationReadiness.ts DOMAIN_MAP staying aligned with Anthropic's published CCAR-F domains
- workforceAgentRuntime write gate
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R6**.
Why that ceiling: Internal queue write about readiness, not a credential decision and not learner-facing. R6 is the ceiling for the same reason as the curriculum flag: it already writes in production, so the honest next rung is a separately approved supervised pilot. No issuance of any kind is in scope at any rung.

Not a human-reserved decision, but promotion is still evidence-based and one step at a time.
**First release behaviour (autonomy:R0)**
Record the 55 bar, the six domains, and that a certification is never issued here.

Acceptance: Swati can name the bar and confirm in her own words that nothing is awarded.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- run_count/error_count for Dara's three timers pool on one AiAgent row (docs/architecture/ai-workforce-management/SUPERVISOR_HEALTH_AUDIT_2026-10-06.md:181-205)
- the DOMAIN_MAP at certificationReadiness.ts:9-16 has no recorded cross-check against Anthropic's current published CCAR-F domain list
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- backend/src/services/agentRegistrySeed.ts:2271
- backend/src/services/aiOpsScheduler.ts:369
- backend/src/services/workforce/directorActions.ts:73
- backend/src/services/ops/directors.ts:45
- backend/src/services/ops/directors.ts:46
- backend/src/services/runtime/certificationReadiness.ts:28
- backend/src/services/agentPermissionService.ts:90
- backend/src/services/curriculum/repointLegacyBehaviors.ts:33
- docs/architecture/ai-workforce-management/employees/curriculum/ROLE_CHARTER_v1.md:26

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] Swati can name the bar and confirm in her own words that nothing is awarded.

When every box above is ticked, stop and show the demo.
