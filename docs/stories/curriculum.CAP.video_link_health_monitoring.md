# curriculum.CAP.video_link_health_monitoring — Curriculum video-link health monitoring

A broken or removed video inside live curriculum is caught by a real provider check and alerted on, rather than discovered by the student who clicked it.

**Built today:** implemented. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- CURRICULUM_VIDEO_HEALTH_ENABLED is off by default in production, so the capability's real effectiveness is unknown
- alert fan-out recipients are the executive-scoped admin_notification_emails setting, not Swati specifically (ACCOUNTABILITY_v1.md:26)

Full build prompt is attached to this story.

**Release:** r2 · r2 (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Curriculum video-link health monitoring
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.video_link_health_monitoring`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** implemented · **Source:** inherited
## The business outcome
A broken or removed video inside live curriculum is caught by a real provider check and alerted on, rather than discovered by the student who clicked it.
Intended users: Swati Raman (accountable manager), curriculum staff, students (indirect beneficiaries).
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- Probe each curriculum video link through the provider API.
- Classify the result (reachable, removed, restricted, unknown).
- Assess impact: which weeks and cards the breakage touches.
- Emit an alert only for a real classified breakage.
- Do nothing at all when the env flag is unset.
**Inputs**
- video URLs attached to curriculum content and timeline cards
- YouTube Data API responses
- CURRICULUM_VIDEO_HEALTH_ENABLED environment flag
**Outputs**
- classified link states and an impact assessment
- alert rows via the alert service on real breakage
**Exceptions that must be handled**
- Env-gated off by default, so there is no production number to report while it is off (ROLE_CHARTER_v1.md:43).
- An unknown classification is reported as unknown, never as healthy.
- Provider rate limiting or an API outage is a probe failure, not a broken video.
- It only sees links the curriculum records; a video embedded inside generated body_html is outside its reach.
- The agent never edits or replaces the link; substituting curriculum content is a human decision.
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- youtube_data_api_read
- read_curriculum_modules
- read_timeline_cards
- emit_alert
- emit_structured_log
**Application surfaces**
- /admin/orchestration
- /admin/workforce
- internal cron only (schedulerService)
**Source modules**
- backend/src/services/curriculumHealth/videoLinkHealthService.ts
- backend/src/services/curriculumHealth/videoLinkProbe.ts
- backend/src/services/curriculumHealth/videoLinkAbsenceProbe.ts
**Dependencies**
- YouTube Data API availability and quota
- CURRICULUM_VIDEO_HEALTH_ENABLED
- alertService fan-out targets
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R6**.
Why that ceiling: Detection is read-only but the alert fan-out is a real production side effect with named recipients, and RISK_REGISTER.md:16 rates that fan-out as high impact if absorbed carelessly. R6 therefore caps it at a separately approved supervised pilot. Replacing a broken video is excluded from this capability entirely because it would alter live curriculum.

Not a human-reserved decision, but promotion is still evidence-based and one step at a time.
**First release behaviour (autonomy:R0)**
Record the probe, the classification set, the env gate and the fact that no link is ever edited.

Acceptance: Swati can state what is alerted on and who receives it.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- CURRICULUM_VIDEO_HEALTH_ENABLED is off by default in production, so the capability's real effectiveness is unknown
- alert fan-out recipients are the executive-scoped admin_notification_emails setting, not Swati specifically (ACCOUNTABILITY_v1.md:26)
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- backend/src/services/agentRegistrySeed.ts:2561
- backend/src/services/curriculum/repointLegacyBehaviors.ts:34
- backend/src/services/curriculumHealth/videoLinkHealthService.ts
- backend/src/services/curriculumHealth/videoLinkApiClient.ts
- backend/src/services/curriculumHealth/videoLinkClassifier.ts
- backend/src/services/curriculumHealth/videoLinkImpact.ts
- docs/architecture/ai-workforce-management/employees/curriculum/COVERAGE_CONTRACT.md:14
- docs/architecture/ai-workforce-management/employees/curriculum/ROLE_CHARTER_v1.md:28

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] Swati can state what is alerted on and who receives it.

When every box above is ticked, stop and show the demo.
