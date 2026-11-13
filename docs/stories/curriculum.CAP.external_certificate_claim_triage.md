# curriculum.CAP.external_certificate_claim_triage — Triaging a student's uploaded claim of an externally earned certification

**CANDIDATE -- not started, not assigned.** This is one line on this domain's list of everything its agent could eventually do. It becomes real work only when the builder picks it and their manager agrees, at which point it opens as four stories. Until then it is deliberately inert, and the honest status of it is "not started" rather than "behind".

A student's upload of a credential they earned elsewhere reaches a staff reviewer with the file, the credential id and the claimed date already laid out, so the human decision is quick and the rejected history is kept.

**Built today:** implemented. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- no issuer verification exists: a credential id is recorded, never checked against Anthropic
- student_certifications.enrollment_id has no foreign key (StudentCertification.ts:65)
- the review route is requireAdmin only, so no specific named reviewer is required

Full build prompt is attached to this story.

**Release:** autonomy:R0 · Legacy migration plan (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Triaging a student's uploaded claim of an externally earned certification
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.external_certificate_claim_triage`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** implemented · **Source:** existing_application
## The business outcome
A student's upload of a credential they earned elsewhere reaches a staff reviewer with the file, the credential id and the claimed date already laid out, so the human decision is quick and the rejected history is kept.
Intended users: Swati Raman (accountable manager), cert-prep and student-success staff, students (as claimants).
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- The student uploads their certificate in the portal.
- The claim lands as a pending row with the file and metadata.
- A staff member opens the file and decides.
- Only an approved row counts toward the Architect progression.
- A rejected claim can be resubmitted as a new row; the old one is kept.
**Inputs**
- the uploaded file, stored under a server-assigned filename never a client-chosen path
- the track (cca_f), an optional credential id and the claimed pass date
**Outputs**
- a student_certifications row moving pending to approved or rejected
- a certification_approved milestone latched on approval, keyed on the certification id
- a re-submittable new row after a rejection, leaving the bad upload's history intact
**Exceptions that must be handled**
- Colaberry approves a claim about a credential someone else issued. It does not issue, award or confer the credential, and must never describe itself as doing so.
- Cert Prep readiness is a different thing and never substitutes for an approved claim.
- A credential id printed on an uploaded file is not verified against the issuer by anything in this codebase.
- The filename is always server-assigned; a client-supplied path is never trusted.
- enrollment_id on this table has no foreign key, unlike every cert_* table, so an orphaned claim is possible.
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- read_uploaded_certificate_file
- read_enrollments
- prepare_claim_summary
- emit_structured_log
**Application surfaces**
- student portal Cert section upload
- /admin/cert-prep certifications review list
- POST /api/portal/certifications
- GET /api/portal/certifications
- GET /api/portal/certifications/:id/file
- GET /api/admin/cert-prep/certifications
- GET /api/admin/cert-prep/certifications/:id/file
- POST /api/admin/cert-prep/certifications/:id/review
**Source modules**
- backend/src/services/certification/studentCertificationService.ts
- backend/src/services/progression/milestoneService.ts
- backend/src/models/StudentCertification.ts
**Dependencies**
- a named staff reviewer
- the file store
- the progression milestone latch
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R4**.
Why that ceiling: The decision is a human one and it affects a student's record and progression, so it is permanently human-required. R4 permits the agent to do the stateful preparation work - reading the file, laying out the claim - in sandbox, but no rung lets it approve, and nothing here issues a credential at any rung.

**THIS IS A HUMAN DECISION.** It stays human-required at every autonomy level, forever. An
agent may prepare, summarise and propose; it may never decide. No amount of evidence
promotes this into automation.
**First release behaviour (autonomy:R0)**
Record that the credential is Anthropic's, that staff approve the claim, and that readiness never substitutes for one.

Acceptance: Swati states that Colaberry approves a claim and issues nothing.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- no issuer verification exists: a credential id is recorded, never checked against Anthropic
- student_certifications.enrollment_id has no foreign key (StudentCertification.ts:65)
- the review route is requireAdmin only, so no specific named reviewer is required
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- backend/src/models/StudentCertification.ts:5
- backend/src/models/StudentCertification.ts:8
- backend/src/models/StudentCertification.ts:18
- backend/src/models/StudentCertification.ts:83
- backend/src/services/certification/studentCertificationService.ts
- backend/src/routes/certificationRoutes.ts:38
- backend/src/routes/admin/certificationAdminRoutes.ts:65
- backend/src/services/progression/milestoneService.ts:235

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] Swati states that Colaberry approves a claim and issues nothing.

When every box above is ticked, stop and show the demo.
