# curriculum.CAP.certification_evidence_mapping_review — Proposing and reviewing build evidence mapped onto CCAR-F domains

A student's real build work can count toward their readiness in a specific Anthropic domain, but only after a human verifies the mapping, so the evidence half of the readiness score is trustworthy.

**Built today:** implemented. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- the match rules have no measured precision: nothing records how often a human rejected a proposed mapping
- the state route is requireAdmin only, so no specific verifier is required

Full build prompt is attached to this story.

**Release:** r2 · r2 (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Proposing and reviewing build evidence mapped onto CCAR-F domains
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.certification_evidence_mapping_review`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** implemented · **Source:** existing_application
## The business outcome
A student's real build work can count toward their readiness in a specific Anthropic domain, but only after a human verifies the mapping, so the evidence half of the readiness score is trustworthy.
Intended users: Swati Raman (accountable manager), cert-prep staff, students (as the evidence owners).
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- Propose candidate mappings from real completed work using the match rules.
- Present each candidate with its recommended action for a human.
- A human sets the mapping state.
- Only verified mappings feed the evidence half of readiness.
**Inputs**
- completed timeline cards and their artifacts as candidate evidence
- the CCAR-F match rules per domain
- a human's verify or reject decision
**Outputs**
- cert_evidence_mappings rows at state pending, verified or rejected
- a recommended action per candidate
- the evidence_coverage_pct component of the readiness score
**Exceptions that must be handled**
- A pending mapping must not count toward readiness; only a verified one does.
- Evidence moves readiness meaningfully but cannot carry it, by an explicit product decision.
- The match rules are heuristics over card and artifact metadata, not an assessment of the work's quality.
- A rejected mapping is kept, so the proposal history survives.
- CCAR-F is Anthropic's credential: this capability prepares for, tracks readiness for or reports on it and issues, awards or confers nothing
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- read_timeline_cards
- read_cert_evidence
- propose_evidence_mapping
- emit_structured_log
**Application surfaces**
- /admin/cert-prep evidence pending-review queue
- student portal cert-prep evidence view
- GET /api/admin/cert-prep/evidence/pending
- POST /api/admin/cert-prep/evidence/:id/state
- GET /api/portal/cert-prep/evidence
- POST /api/portal/cert-prep/evidence/refresh
**Source modules**
- backend/src/services/certPrep/certEvidenceService.ts
- backend/src/services/certPrep/certEvidenceFromCard.ts
- backend/src/models/CertEvidenceMapping.ts
**Dependencies**
- completed timeline cards and artifacts
- the CCAR-F domain set
- a human verifier
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R5**.
Why that ceiling: Proposing a mapping has no effect until a human verifies it, but the verified mapping changes a student's readiness score, so the decision is permanently human-required and capped at autonomy:R5. Proposal is the agent's whole role; setting a state is not available at any rung.

**THIS IS A HUMAN DECISION.** It stays human-required at every autonomy level, forever. An
agent may prepare, summarise and propose; it may never decide. No amount of evidence
promotes this into automation.
**First release behaviour (autonomy:R0)**
Record the three states, that only verified counts, and who verifies.

Acceptance: Swati states that a pending mapping counts for nothing.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- the match rules have no measured precision: nothing records how often a human rejected a proposed mapping
- the state route is requireAdmin only, so no specific verifier is required
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- backend/src/services/certPrep/certEvidenceService.ts:52
- backend/src/services/certPrep/certEvidenceService.ts:130
- backend/src/services/certPrep/certEvidenceService.ts:266
- backend/src/services/certPrep/certEvidenceService.ts:290
- backend/src/services/certPrep/certEvidenceFromCard.ts:67
- backend/src/models/CertEvidenceMapping.ts:96
- backend/src/models/CertEvidenceMapping.ts:34
- backend/src/routes/admin/certPrepAdminRoutes.ts:227
- backend/src/routes/admin/certPrepAdminRoutes.ts:240

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] Swati states that a pending mapping counts for nothing.

When every box above is ticked, stop and show the demo.
