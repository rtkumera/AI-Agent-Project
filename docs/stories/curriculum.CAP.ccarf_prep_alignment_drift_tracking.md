# curriculum.CAP.ccarf_prep_alignment_drift_tracking — Tracking drift between Anthropic's published CCAR-F requirements and Colaberry's prep material

**CANDIDATE -- not started, not assigned.** This is one line on this domain's list of everything its agent could eventually do. It becomes real work only when the builder picks it and their manager agrees, at which point it opens as four stories. Until then it is deliberately inert, and the honest status of it is "not started" rather than "behind".

When Anthropic changes what its credential covers, the gap between that and what Colaberry's prep bank and curriculum actually teach is a dated, evidenced report rather than something noticed when students start failing.

**Built today:** absent. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- backend/src/services/delivery/execution/executionPolicy.ts:33 denies unbounded_network, so the agent cannot fetch Anthropic's published requirement itself; the source must be human-supplied
- no alignment check exists today between the stored blueprint and Anthropic's published requirement
- the certificationReadiness DOMAIN_MAP has no recorded cross-check against the stored CertTrack blueprint, so two definitions of the domain set coexist with no assertion that they agree
- the curriculum-specific Anthropic consumer is deferred (COVERAGE_CONTRACT.md:23)

Full build prompt is attached to this story.

**Release:** autonomy:R0 · Legacy migration plan (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Tracking drift between Anthropic's published CCAR-F requirements and Colaberry's prep material
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.ccarf_prep_alignment_drift_tracking`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** absent · **Source:** proposed_new
## The business outcome
When Anthropic changes what its credential covers, the gap between that and what Colaberry's prep bank and curriculum actually teach is a dated, evidenced report rather than something noticed when students start failing.
Intended users: Swati Raman (accountable manager), cert-prep staff, Ali Muwwakkil (DRI).
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- Read the stored blueprint and its weight source, which already distinguishes official from community and unverified.
- Compare against Anthropic's published requirement as confirmed by a human.
- Report each difference with its consequence for the bank and the curriculum.
- Never silently update the stored blueprint; a weight change moves every student's readiness score.
**Inputs**
- the stored CCAR-F blueprint, its domains and their weights
- Anthropic's currently published requirement, which must come from a human-verified source
- the prep bank's per-domain item coverage and the curriculum's competency map
**Outputs**
- a dated alignment report naming each domain where the stored blueprint and the published requirement differ
- the prep-bank and curriculum coverage consequence of each difference
- unknown wherever the published requirement cannot be verified
**Exceptions that must be handled**
- CCAR-F is Anthropic's credential. This capability tracks alignment with their requirement and reports readiness; it issues, awards or confers nothing, and a domain change must never be described as a change to a Colaberry credential.
- Every on-screen or reported claim about what the credential requires must trace to a verifiable source; a model's recollection of Anthropic's requirements is not a source.
- The blueprint already records whether a weight source is official, community or unverified, and an unverified weight must be reported as unverified rather than treated as the requirement.
- Changing a stored weight retroactively changes every readiness snapshot, so it is a human decision.
- The curriculum-specific Anthropic consumer is deferred until its digest email sits behind the authorization chokepoint and its LLM spend is attributed.
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- read_cert_bank
- read_repo_curriculum_data
- read_published_requirement_source
- emit_structured_log
**Application surfaces**
- /admin/cert-prep blueprint and bank surfaces
- /admin/agents/<Dara>
- GET /api/admin/cert-prep/bank
- GET /api/admin/cert-prep/audit
**Source modules**
- backend/src/services/certPrep/certBlueprintService.ts
- backend/src/data/certBlueprints/ccarFoundations.ts
- backend/src/services/runtime/certificationReadiness.ts
**Dependencies**
- a human-verified source for Anthropic's published requirement
- the deferred Anthropic monitoring consumer being absorbed with attribution
- a human to approve any weight change
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R2**.
Why that ceiling: A weight or domain change propagates into every student's readiness score and into what the prep bank must cover, so the change is permanently human-required. R2 is the ceiling because the input - what Anthropic currently publishes - cannot be agent-verified: it needs a human-confirmed source, and an unbounded network fetch is default-denied.

**THIS IS A HUMAN DECISION.** It stays human-required at every autonomy level, forever. An
agent may prepare, summarise and propose; it may never decide. No amount of evidence
promotes this into automation.
**First release behaviour (autonomy:R0)**
Record the stored blueprint, its weight source, who verifies Anthropic's published requirement, and that Colaberry issues nothing.

Acceptance: Swati names the verification source and confirms that a weight change is her decision.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- backend/src/services/delivery/execution/executionPolicy.ts:33 denies unbounded_network, so the agent cannot fetch Anthropic's published requirement itself; the source must be human-supplied
- no alignment check exists today between the stored blueprint and Anthropic's published requirement
- the certificationReadiness DOMAIN_MAP has no recorded cross-check against the stored CertTrack blueprint, so two definitions of the domain set coexist with no assertion that they agree
- the curriculum-specific Anthropic consumer is deferred (COVERAGE_CONTRACT.md:23)
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- backend/src/data/certBlueprints/ccarFoundations.ts
- backend/src/data/certBlueprints/ccarRubric.ts
- backend/src/data/certBlueprints/typeCertificationMap.ts
- backend/src/models/CertTrack.ts:104
- backend/src/models/CertTrack.ts:23
- backend/src/models/CertDomain.ts:23
- backend/src/services/certPrep/certBlueprintService.ts:50
- backend/src/services/runtime/certificationReadiness.ts:9
- backend/src/services/anthropicCurriculumImpactAgent.ts
- docs/architecture/ai-workforce-management/employees/curriculum/COVERAGE_CONTRACT.md:23

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] Swati names the verification source and confirms that a weight change is her decision.

When every box above is ticked, stop and show the demo.
