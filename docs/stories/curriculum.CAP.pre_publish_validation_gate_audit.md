# curriculum.CAP.pre_publish_validation_gate_audit — Deterministic pre-publish validation gate over a week plan

**CANDIDATE -- not started, not assigned.** This is one line on this domain's list of everything its agent could eventually do. It becomes real work only when the builder picks it and their manager agrees, at which point it opens as four stories. Until then it is deliberately inert, and the honest status of it is "not started" rather than "behind".

No week can reach students while a hard check fails, and every warn carries a specific detail, so the bar for publishable curriculum is a reproducible number rather than a reviewer's mood that day.

**Built today:** implemented. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- no agent identity reaches the Composer today: every /api/admin/composer route is requireAdmin only (composerRoutes.ts:15-30)
- coverage can be satisfied by session_competencies that no typed card carries, so a passing coverage number does not prove a typed activity teaches the competency (validationEngine.ts:21-22)
- no agreed threshold exists for what quality or readiness score a week must reach before shipping

Full build prompt is attached to this story.

**Release:** autonomy:R0 · Legacy migration plan (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Deterministic pre-publish validation gate over a week plan
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.pre_publish_validation_gate_audit`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** implemented · **Source:** existing_application
## The business outcome
No week can reach students while a hard check fails, and every warn carries a specific detail, so the bar for publishable curriculum is a reproducible number rather than a reviewer's mood that day.
Intended users: Swati Raman (accountable manager), curriculum staff.
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- Resolve each card's type against the registry.
- Check dependencies, evidence yield and competency and domain coverage against the blueprint.
- Score quality, coverage and readiness.
- Set publishable false if anything fails.
- Return every check with its detail, never a bare score.
**Inputs**
- the generated plan's cards
- the blueprint's declared competencies, architect domains, objectives, difficulty and hours
- session_competencies taught by a live session or Academy course but carried by no typed card
**Outputs**
- quality, coverage and readiness each 0-100
- a publishable boolean
- a pass, warn or fail per named check with a detail string
- workload hours and the difficulty mix
**Exceptions that must be handled**
- Pure and LLM-free by design, so the gate is reproducible and testable; an LLM opinion must never be allowed to set publishable.
- A warn does not block publishing, so a week can ship with known warnings and that is a human call.
- Coverage credits session_competencies, so a week can score well on coverage while no typed card teaches the competency.
- The gate validates structure and coverage, never whether the content is correct or current.
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- read_curriculum_blueprints
- read_timeline_cards
- run_validation_gate
- emit_structured_log
**Application surfaces**
- /admin/orchestration composer validation panel
- GET /api/admin/composer/blueprints/:id/validate
**Source modules**
- backend/src/services/composer/validationEngine.ts
- backend/src/services/composer/dependencyEngine.ts
- backend/src/services/composer/evidenceEngine.ts
- backend/src/services/composer/competencyDictionary.ts
**Dependencies**
- timeline typeRegistry resolving every card type
- competencyDictionary as the canonical competency resolver
- the blueprint declaring competencies at all; an empty declaration makes coverage meaningless
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R7**.
Why that ceiling: Running the gate is pure, deterministic and side-effect-free: it reads a plan and returns checks. R7 is permitted for that one authorized action class, reporting the result. Acting on the result - publishing anyway over a warn - is a separate capability and is human-decided.

Not a human-reserved decision, but promotion is still evidence-based and one step at a time.
**First release behaviour (autonomy:R0)**
Record every check, which ones block publishing, and who may ship over a warn.

Acceptance: Swati names the blocking checks and states who decides on a warn.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- no agent identity reaches the Composer today: every /api/admin/composer route is requireAdmin only (composerRoutes.ts:15-30)
- coverage can be satisfied by session_competencies that no typed card carries, so a passing coverage number does not prove a typed activity teaches the competency (validationEngine.ts:21-22)
- no agreed threshold exists for what quality or readiness score a week must reach before shipping
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- backend/src/services/composer/validationEngine.ts:1
- backend/src/services/composer/validationEngine.ts:26
- backend/src/services/composer/publishService.ts:1
- backend/src/services/composer/dependencyEngine.ts
- backend/src/services/composer/evidenceEngine.ts
- backend/src/services/composer/competencyDictionary.ts
- backend/src/routes/admin/composerRoutes.ts:23

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] Swati names the blocking checks and states who decides on a warn.

When every box above is ticked, stop and show the demo.
