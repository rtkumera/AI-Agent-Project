# curriculum.CAP.cohort_certification_readiness_reporting — Explainable cohort and per-student certification readiness reporting

Swati can see which students are building readiness, which are approaching it, which have sustained it, which have not started, and where the cohort is weakest - with every number explainable from its stored components.

**Built today:** implemented. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- the capability reports on a credential Colaberry does not issue, so any wording that implies issuance is a defect rather than a nuance
- no measured correlation exists between the readiness estimate and actual CCAR-F outcomes, because outcomes arrive as externally earned claims rather than as results

Full build prompt is attached to this story.

**Release:** r2 · r2 (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Explainable cohort and per-student certification readiness reporting
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.cohort_certification_readiness_reporting`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** implemented · **Source:** existing_application
## The business outcome
Swati can see which students are building readiness, which are approaching it, which have sustained it, which have not started, and where the cohort is weakest - with every number explainable from its stored components.
Intended users: Swati Raman (accountable manager), cert-prep staff, instructors.
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- Tally responses by Anthropic domain and weight them by the current blueprint.
- Blend knowledge with evidence, with knowledge dominant so evidence cannot carry the score.
- Derive the state, requiring sustained performance across more than one sitting for the top state.
- Persist the components alongside the score so the answer to why is never reconstructed.
- Report at cohort and per-student level.
**Inputs**
- completed cert_sessions and their cert_responses
- verified cert_evidence_mappings
- the current CCAR-F blueprint domain weights
**Outputs**
- a readiness snapshot per student with knowledge_scaled, evidence_coverage_pct and sample_confidence stored separately
- a state of not_measured, building, approaching or sustained
- cohort readiness, cohort domain weakness, and a not-started list
**Exceptions that must be handled**
- Every number is a Colaberry readiness estimate sharing an axis with the real exam so it can be compared to the same line; it is not a prediction of Anthropic's result.
- not_measured must be reported as not measured, never as a low score.
- The top state deliberately cannot be reached by one good run; a single passing sitting proves nothing.
- Blueprint weights must be usable; an unusable weight set makes the roll-up meaningless rather than merely imprecise.
- An unexplainable score is not something anyone should trust, which is why the components are persisted rather than derived on read.
- CCAR-F is Anthropic's credential: this capability prepares for, tracks readiness for or reports on it and issues, awards or confers nothing
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- read_cert_sessions
- read_cert_evidence
- compute_readiness_snapshot
- emit_structured_log
**Application surfaces**
- /admin/cert-prep cohort readiness, weakness and not-started views
- student portal cert-prep readiness view
- GET /api/admin/cert-prep/cohorts/:cohortId/readiness
- GET /api/admin/cert-prep/cohorts/:cohortId/weakness
- GET /api/admin/cert-prep/cohorts/:cohortId/not-started
- GET /api/admin/cert-prep/students/:enrollmentId/history
- GET /api/portal/cert-prep
- GET /api/portal/cert-prep/domains
**Source modules**
- backend/src/services/certPrep/certReadinessService.ts
- backend/src/services/certPrep/certScoring.ts
- backend/src/services/certPrep/certAdminService.ts
- backend/src/services/certPrep/certBlueprintService.ts
**Dependencies**
- cert_sessions and cert_responses as the knowledge signal
- verified evidence mappings as the secondary signal
- the current CertTrack blueprint and its domain weights
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R7**.
Why that ceiling: Reporting readiness is a computation over existing records with no learner-facing change and no credential effect, so R7 is permitted for producing the report. Acting on a weak cohort - changing what is taught or what is practised - is a separate human decision.

Not a human-reserved decision, but promotion is still evidence-based and one step at a time.
**First release behaviour (autonomy:R0)**
Record the four states, the knowledge-dominant policy, and that the score is an estimate and not a prediction.

Acceptance: Swati states what sustained requires and that Colaberry issues nothing.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- the capability reports on a credential Colaberry does not issue, so any wording that implies issuance is a defect rather than a nuance
- no measured correlation exists between the readiness estimate and actual CCAR-F outcomes, because outcomes arrive as externally earned claims rather than as results
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- backend/src/services/certPrep/certReadinessService.ts:11
- backend/src/services/certPrep/certReadinessService.ts:21
- backend/src/services/certPrep/certScoring.ts:28
- backend/src/models/CertReadinessSnapshot.ts:92
- backend/src/models/CertReadinessSnapshot.ts:29
- backend/src/services/certPrep/certAdminService.ts:56
- backend/src/services/certPrep/certAdminService.ts:99
- backend/src/routes/admin/certPrepAdminRoutes.ts:68
- backend/src/routes/admin/certPrepAdminRoutes.ts:89

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] Swati states what sustained requires and that Colaberry issues nothing.

When every box above is ticked, stop and show the demo.
