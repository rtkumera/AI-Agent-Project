# curriculum.CAP.charter_and_kpi_stewardship — Keeping the curriculum employee's charter and KPIs honest and manager-authored

**CANDIDATE -- not started, not assigned.** This is one line on this domain's list of everything its agent could eventually do. It becomes real work only when the builder picks it and their manager agrees, at which point it opens as four stories. Until then it is deliberately inert, and the honest status of it is "not started" rather than "behind".

Swati owns a charter and KPI set she authored, where every measure either maps to a real metric or says UNMEASURED with a reason, so the employee can never look more established than the evidence supports.

**Built today:** partial. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- only two real AgentGoal metric keys exist, so four of six charter KPIs are permanently UNMEASURED until a Platform schema decision adds one (ROLE_CHARTER_v1.md:40-43)
- no field records time-to-action on a WorkforceTask, so the two manager-responsiveness KPIs cannot be measured
- the charter records an autonomy level of act_audited that predates Dara's student DM surface and has not been revisited

Full build prompt is attached to this story.

**Release:** autonomy:R0 · Legacy migration plan (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Keeping the curriculum employee's charter and KPIs honest and manager-authored
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.charter_and_kpi_stewardship`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** partial · **Source:** manager_defined
## The business outcome
Swati owns a charter and KPI set she authored, where every measure either maps to a real metric or says UNMEASURED with a reason, so the employee can never look more established than the evidence supports.
Intended users: Swati Raman (accountable manager), Ali Muwwakkil (DRI).
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- Swati authors or revises the charter and the KPI set; the agent never does.
- Each proposed KPI is checked against the real AgentGoal metric keys.
- A KPI with no metric key is recorded as UNMEASURED with the reason, never as a target.
- The agent may report against the KPIs and may flag a KPI that has gone stale.
- Any change to the charter, KPIs or memory is applied by a human.
**Inputs**
- the approved charter: role title, mission, responsibilities, KPIs and the eight boundaries
- the two real AgentGoal metric keys that exist: monthly_cost_usd and open_ticket_count
- the manager's own decisions in the Talk tab and one-on-ones
**Outputs**
- an AgentRoleCharter row reflecting the approved charter
- AgentGoal rows only for KPIs with a real metric key behind them
- an explicit UNMEASURED entry, with its reason, for every KPI that has none
**Exceptions that must be handled**
- Only two real metric keys exist, so four of the six charter KPIs are UNMEASURED and must stay that way until a metric exists.
- WorkforceTask status transitions are human-only and no field records time-to-action, so the two manager-responsiveness KPIs cannot be measured at all.
- A zero-activity goals score already reads deceptively decent for a fresh employee, so an invented KPI number would compound a known distortion.
- The agent cannot approve its own charter, KPIs or memory - this is charter boundary 4 - and cannot change its own reports_to, risk tier or autonomy level, which is boundary 8.
- Adding a new metric key is a Platform-scoped schema decision, not this domain's to make.
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- read_agent_registry
- read_workforce_tasks
- report_against_kpis
- emit_structured_log
**Application surfaces**
- /admin/agents/<Dara> Charter tab
- /admin/agents/<Dara> Goals tab
- /admin/agents/<Dara> one-on-one surface
- agentRoleCharterRoutes.ts
- agentGoalRoutes.ts
- agentOneOnOneRoutes.ts
- agentMemoryProposalRoutes.ts
**Source modules**
- backend/src/models/AgentGoal.ts
- backend/src/services/agentBlueprint/agentRoleCharterService.ts
**Dependencies**
- a real metric key per measurable KPI
- Swati's admin login and her Talk tab access
- the manager-authored tables: AgentGoal, AgentOneOnOne, AgentReportSubscription, AgentMemoryProposal, ManagerDirective
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R2**.
Why that ceiling: Charter boundary 4 makes this manager-authored only, permanently: the agent may report against its own KPIs but may never approve them, and boundary 8 forbids it changing its own autonomy level. R2 is therefore the ceiling - answering from approved knowledge - and no higher rung is coherent for a capability whose whole point is that a human holds the pen.

**THIS IS A HUMAN DECISION.** It stays human-required at every autonomy level, forever. An
agent may prepare, summarise and propose; it may never decide. No amount of evidence
promotes this into automation.
**First release behaviour (autonomy:R0)**
Record the charter, the eight boundaries, and which KPIs are UNMEASURED and why.

Acceptance: Swati restates the boundaries in her own words and names the UNMEASURED KPIs.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- only two real AgentGoal metric keys exist, so four of six charter KPIs are permanently UNMEASURED until a Platform schema decision adds one (ROLE_CHARTER_v1.md:40-43)
- no field records time-to-action on a WorkforceTask, so the two manager-responsiveness KPIs cannot be measured
- the charter records an autonomy level of act_audited that predates Dara's student DM surface and has not been revisited
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- docs/architecture/ai-workforce-management/employees/curriculum/ROLE_CHARTER_v1.md:34
- docs/architecture/ai-workforce-management/employees/curriculum/ROLE_CHARTER_v1.md:45
- docs/architecture/ai-workforce-management/employees/curriculum/ROLE_CHARTER_v1.md:52
- docs/architecture/ai-workforce-management/employees/curriculum/RISK_REGISTER.md:11
- backend/src/models/AgentGoal.ts:24
- backend/src/routes/admin/agentRoleCharterRoutes.ts
- backend/src/routes/admin/agentGoalRoutes.ts
- backend/src/routes/admin/agentOneOnOneRoutes.ts
- backend/src/routes/admin/agentMemoryProposalRoutes.ts

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] Swati restates the boundaries in her own words and names the UNMEASURED KPIs.

When every box above is ticked, stop and show the demo.
