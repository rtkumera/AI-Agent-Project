# curriculum.CAP.certification_item_rubric_review_and_improvem — Per-item rubric scoring, adversarial review and improvement drafting for the CCAR-F prep bank

Every practice item in the prep bank can be scored against a rubric, read adversarially by a different model family, and given a concrete improvement candidate, so bank quality is a driven number instead of an author's self-assessment.

**Built today:** implemented. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- certification prep question-bank stewardship is deferred by the approved coverage contract until the three operator scripts become attributed employee tools (docs/architecture/ai-workforce-management/employees/curriculum/COVERAGE_CONTRACT.md:25)
- a second model's opinion is not verification and must never be reported as one (certQuestionTriage.ts:17-21)
- the needs-human flag has no measured calibration: nothing records how often a human agreed with it

Full build prompt is attached to this story.

**Release:** r2 · r2 (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Per-item rubric scoring, adversarial review and improvement drafting for the CCAR-F prep bank
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.certification_item_rubric_review_and_improvement`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** implemented · **Source:** existing_application
## The business outcome
Every practice item in the prep bank can be scored against a rubric, read adversarially by a different model family, and given a concrete improvement candidate, so bank quality is a driven number instead of an author's self-assessment.
Intended users: Swati Raman (accountable manager), cert-prep staff, Ali Muwwakkil (DRI).
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- Score the item against the rubric and report which dimensions miss.
- Run one adversarial read and one blind answer attempt from a different model family.
- Draft an improvement candidate targeting the missing dimensions.
- Return all three. Persist nothing, approve nothing.
**Inputs**
- one item: stem, options, key and rationale
- the CCAR-F rubric and its reference exemplars
- a triage read from a different model family
**Outputs**
- a rubric score per dimension plus the achievable ceiling
- a triage verdict with concerns and a severity, and a needs-human flag
- an improvement candidate the caller may or may not persist
**Exceptions that must be handled**
- A model reviewing items Claude authored is a second opinion, not verification, and the modules are built so that distinction survives contact with a human reader.
- Triage and the improver import no model, no approval path and no database, and tests assert those imports are absent so the guarantee holds structurally rather than by memory.
- Some rubric dimensions are unachievable for a given item shape; the achievable ceiling must be used rather than the raw maximum.
- A high rubric score on every item does not make the bank sound: bank-level defects are invisible per item.
- CCAR-F is Anthropic's credential: this capability prepares for and reports on it and issues, awards or confers nothing
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- read_cert_bank
- openai_llm_completion
- score_item_rubric
- triage_item
- emit_structured_log
**Application surfaces**
- /admin/cert-prep bank and item review surfaces
- GET /api/admin/cert-prep/questions
- GET /api/admin/cert-prep/items
- GET /api/admin/cert-prep/bank
**Source modules**
- backend/src/services/certPrep/certQuestionRubric.ts
- backend/src/services/certPrep/certQuestionTriage.ts
- backend/src/services/certPrep/certQuestionImprover.ts
- backend/src/services/certPrep/certOptionLength.ts
**Dependencies**
- the CCAR-F blueprint and rubric data in data/certBlueprints
- an instrumented LLM client
- a human reviewer who decides what to persist
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R7**.
Why that ceiling: Scoring, triaging and drafting a candidate are read-only and provably write-free, which makes producing the review one nameable action class and R7 permissible. Persisting a revision or changing its status is a different capability and is human-decided. This capability touches preparation material only and nothing about it issues a credential.

Not a human-reserved decision, but promotion is still evidence-based and one step at a time.
**First release behaviour (autonomy:R0)**
Record what the rubric measures, what triage is and is not, and who persists a revision.

Acceptance: Swati states that a triage verdict is a second opinion and names who decides.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- certification prep question-bank stewardship is deferred by the approved coverage contract until the three operator scripts become attributed employee tools (docs/architecture/ai-workforce-management/employees/curriculum/COVERAGE_CONTRACT.md:25)
- a second model's opinion is not verification and must never be reported as one (certQuestionTriage.ts:17-21)
- the needs-human flag has no measured calibration: nothing records how often a human agreed with it
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- backend/src/services/certPrep/certQuestionRubric.ts:109
- backend/src/services/certPrep/certQuestionTriage.ts:15
- backend/src/services/certPrep/certQuestionTriage.ts:23
- backend/src/services/certPrep/certQuestionImprover.ts:17
- backend/src/services/certPrep/certQuestionImprover.ts:24
- backend/src/services/certPrep/certOptionLength.ts
- backend/src/data/certBlueprints/ccarRubric.ts
- backend/src/models/CertQuestionRevision.ts:144
- backend/src/routes/admin/certPrepAdminRoutes.ts:139

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] Swati states that a triage verdict is a second opinion and names who decides.

When every box above is ticked, stop and show the demo.
