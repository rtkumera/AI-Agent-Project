# curriculum.CAP.manager_access_and_decision_queue_integrity — Keeping the accountable manager actually able to reach and decide for her AI employee

The person accountable for the curriculum employee can open its page, read its findings and make a real decision - and the moment she cannot, that is a tracked blocker rather than a footnote.

**Built today:** partial. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- the M2 one-line PATH_SECTION mapping from MANAGER_ACCESS_PLAN.md:20 never landed, so a scoped curriculum role is still 403d on /api/admin/agents
- no human has ever decided an approval request in production: 106 of 106 were system:auto_approve_timeout
- whether Swati has in fact opened Dara's page is not evidenced in the repository and is recorded here as unknown

Full build prompt is attached to this story.

**Release:** r2 · r2 (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Keeping the accountable manager actually able to reach and decide for her AI employee
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.manager_access_and_decision_queue_integrity`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** partial · **Source:** manager_defined
## The business outcome
The person accountable for the curriculum employee can open its page, read its findings and make a real decision - and the moment she cannot, that is a tracked blocker rather than a footnote.
Intended users: Swati Raman (accountable manager), Ali Muwwakkil (DRI), other domain owners in the same position.
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- Resolve the manager's org_members row from her login email.
- Confirm the agent is in her human downstream chain.
- Verify, with evidence rather than wiring, that she actually opens the page.
- Track any remaining access blocker as an item, not a note.
- Ensure an approval request reaching her queue is decided by her.
**Inputs**
- Swati's admin_users row 8a067218-0419-4666-92e6-4f7b88a94514, role admin
- her org_members row 5db87b51-4554-4e52-93d7-c61f9887352c
- the PATH_SECTION map and the agent-manager chain check
**Outputs**
- a verified, evidenced statement that she can open Dara's Agent Detail and Talk tab
- a named blocker when she cannot
- a decision queue where a human, not a timeout, resolves an approval request
**Exceptions that must be handled**
- The 2026-09-15 ownership map records her as having no admin login; that is now stale. She holds an admin_users row with role admin, so mgmtSectionGate passes her untouched because that gate only restricts bridge-minted tokens carrying an mgmt_role.
- M2 never landed: /api/admin/agents is still absent from PATH_SECTION, so the next domain owner given a scoped curriculum role will be 403d on every agent route even though the curriculum sections are mapped.
- Manager instructions may only restrict the agent, never expand its authority.
- No human has ever decided an approval request: decided_by has one distinct value across all 106 production rows, system:auto_approve_timeout. A timer is not a human in the loop.
- Verification must be that she opened the page, not that the wiring is theoretically correct.
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- read_agent_registry
- read_approval_requests
- emit_structured_log
**Application surfaces**
- /admin/agents/<Dara> (all eight tabs)
- /admin/workforce
- /admin/cert-prep
- /admin/orchestration
- requireAgentManagerOrAdmin on the agent routes
- approvalRequestRoutes.ts
**Source modules**
- backend/src/middlewares/agentManagerAuthMiddleware.ts
- backend/src/middlewares/mgmtSectionGate.ts
- backend/src/services/access/mgmtRoles.ts
**Dependencies**
- her admin_users row persisting
- requireAgentManagerOrAdmin resolving her by email
- the M2 PATH_SECTION mapping for any future scoped-role owner
- an approval queue a person actually works
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R2**.
Why that ceiling: Who may reach and decide for an AI employee is a governance decision for a human, and an agent reporting on its own access must never be able to affect it. R2 caps it at answering from approved knowledge; granting access is excluded at every rung, consistent with the rule that manager instructions may only restrict an agent.

**THIS IS A HUMAN DECISION.** It stays human-required at every autonomy level, forever. An
agent may prepare, summarise and propose; it may never decide. No amount of evidence
promotes this into automation.
**First release behaviour (autonomy:R0)**
Record the three gates, who holds which login, and what evidence counts as her having reached the page.

Acceptance: Swati confirms she can open the page, in her own words, and the stale ownership-map row is corrected.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- the M2 one-line PATH_SECTION mapping from MANAGER_ACCESS_PLAN.md:20 never landed, so a scoped curriculum role is still 403d on /api/admin/agents
- no human has ever decided an approval request in production: 106 of 106 were system:auto_approve_timeout
- whether Swati has in fact opened Dara's page is not evidenced in the repository and is recorded here as unknown
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- docs/architecture/ai-workforce-management/employees/curriculum/MANAGER_ACCESS_PLAN.md:9
- docs/architecture/ai-workforce-management/employees/curriculum/MANAGER_ACCESS_PLAN.md:20
- docs/architecture/ai-workforce-management/employees/curriculum/RISK_REGISTER.md:10
- docs/architecture/ai-workforce-management/HUMAN_OWNERSHIP_MAP.md:14
- docs/architecture/ai-workforce-management/HUMAN_OWNERSHIP_MAP.md:46
- backend/src/middlewares/mgmtSectionGate.ts:188
- backend/src/services/access/mgmtRoles.ts:51
- backend/src/middlewares/agentManagerAuthMiddleware.ts:50
- docs/architecture/ai-workforce-management/APPROVAL_DROP_QUEUE_2026-10-06.md:92

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] Swati confirms she can open the page, in her own words, and the stale ownership-map row is corrected.

When every box above is ticked, stop and show the demo.
