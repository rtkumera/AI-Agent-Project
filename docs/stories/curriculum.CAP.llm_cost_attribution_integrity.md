# curriculum.CAP.llm_cost_attribution_integrity — Honest attribution of curriculum LLM spend to the employee that incurred it

**CANDIDATE -- not started, not assigned.** This is one line on this domain's list of everything its agent could eventually do. It becomes real work only when the builder picks it and their manager agrees, at which point it opens as four stories. Until then it is deliberately inert, and the honest status of it is "not started" rather than "behind".

What the curriculum employee costs can be stated truthfully, because every model call in the domain carries an agent id instead of disappearing into a shared client.

**Built today:** partial. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- the shared assistant client leaves 3,687 calls and 12.27 dollars per 30 days unattributable, and fixing it for all callers is a Platform item (RISK_REGISTER.md:9)
- until attribution is fixed, every deferred LLM tool in the coverage contract stays blocked on this precondition

Full build prompt is attached to this story.

**Release:** autonomy:R0 · Legacy migration plan (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Honest attribution of curriculum LLM spend to the employee that incurred it
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.llm_cost_attribution_integrity`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** partial · **Source:** manager_defined
## The business outcome
What the curriculum employee costs can be stated truthfully, because every model call in the domain carries an agent id instead of disappearing into a shared client.
Intended users: Swati Raman (accountable manager), Ali Muwwakkil (DRI), platform operators.
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- Enumerate the domain's LLM call sites.
- Confirm each one constructs its client with a real agent_id.
- Report attributed spend per capability and unattributed spend as unattributed.
- Treat an unattributed call site as a blocker on absorbing the capability it belongs to.
**Inputs**
- every LLM call site in the curriculum domain
- the instrumented client's agent_id and workflow_id
- the ai_events cost records per workflow
**Outputs**
- a per-capability cost figure that is either real or explicitly unattributed
- a named list of call sites still running through the shared client
**Exceptions that must be handled**
- The shared assistant client carried 3,687 calls and 12.27 dollars in 30 days with agent_id null, so curriculum-adjacent spend cannot be shown honestly today.
- Every future LLM tool must pass agent_id from day one; the student chat and research surfaces already do.
- The monthly_cost_usd KPI reads zero for the four originally absorbed behaviours because they genuinely make no model call - that zero is real, not a measurement gap, and the two must never be conflated.
- Fixing the shared client for all callers is a Platform-scoped item, not this domain's to resolve.
- An unattributed figure must be reported as unattributed; a clean zero would be the dishonesty this capability prevents.
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- read_ai_events
- read_repo_curriculum_data
- emit_structured_log
**Application surfaces**
- /admin/agents/<Dara> cost surfaces
- /admin/orchestration HealthDashboardTab
- GET /api/admin/components/:slug/estimate
- GET /api/admin/components/analytics
**Source modules**
- backend/src/services/openaiInstrumented.ts
- backend/src/services/components/costEstimationService.ts
**Dependencies**
- the instrumented client being used at every call site
- ai_events coverage
- a Platform decision on the shared client
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R7**.
Why that ceiling: Reading call sites and cost events and reporting them has no side effect, so R7 is permitted for producing the report. Changing a call site to add an identity is a code change with its own review, and is excluded here.

Not a human-reserved decision, but promotion is still evidence-based and one step at a time.
**First release behaviour (autonomy:R0)**
Record every call site, its client construction and whether its spend is attributable.

Acceptance: Swati can distinguish a real zero cost from an unmeasured one.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- the shared assistant client leaves 3,687 calls and 12.27 dollars per 30 days unattributable, and fixing it for all callers is a Platform item (RISK_REGISTER.md:9)
- until attribution is fixed, every deferred LLM tool in the coverage contract stays blocked on this precondition
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- docs/architecture/ai-workforce-management/employees/curriculum/RISK_REGISTER.md:9
- docs/architecture/ai-workforce-management/employees/curriculum/ROLE_CHARTER_v1.md:38
- docs/architecture/ai-workforce-management/employees/curriculum/ROLE_CHARTER_v1.md:50
- backend/src/services/openaiInstrumented.ts
- backend/src/services/curriculum/daraReplyService.ts:33
- backend/src/services/components/costEstimationService.ts
- docs/architecture/ai-workforce-management/employees/curriculum/COVERAGE_CONTRACT.md:20

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] Swati can distinguish a real zero cost from an unmeasured one.

When every box above is ticked, stop and show the demo.
