# curriculum.CAP.out_of_scope_escalation_handoff — Mandatory ticket-backed handoff of an out-of-scope student question to the accountable human

A question Dara should not answer becomes a tracked, assignable unit of work for Swati with the triggering message attached, instead of a comment nobody owns or an answer that should never have been given.

**Built today:** implemented. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- the R3 approval gate on this path is advisory only: abac_enforcement defaults to shadow and shadow never denies (backend/src/services/agentAuthorizationService.ts:149-150, docs/architecture/ai-workforce-management/PLATFORM_STATE_2026-09-15.md:117)
- the approval queue has never been decided by a person: decided_by has one distinct value across all 106 rows, system:auto_approve_timeout (docs/architecture/ai-workforce-management/APPROVAL_DROP_QUEUE_2026-10-06.md:92)
- every Basecamp write goes through a shared credential with no on-behalf-of header, so Basecamp's own UI attributes the todo to Ali personally; a mandatory AI-disclosure line in the todo body is the only mitigation (ROLE_CHARTER_v1.md:67)
- no agent-to-agent handoff protocol exists, so autonomy:R8 is unreachable by design today (ACCOUNTABILITY_v1.md:43)

Full build prompt is attached to this story.

**Release:** r2 · r2 (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Mandatory ticket-backed handoff of an out-of-scope student question to the accountable human
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.out_of_scope_escalation_handoff`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** implemented · **Source:** inherited
## The business outcome
A question Dara should not answer becomes a tracked, assignable unit of work for Swati with the triggering message attached, instead of a comment nobody owns or an answer that should never have been given.
Intended users: Swati Raman (accountable manager), students (as the party awaiting a human answer), Ali Muwwakkil (DRI).
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- Authorize the action through the real chokepoint with risk tier R3 before doing anything.
- Refuse to proceed without both an AdminUser identity and a triggering message id.
- Create the standalone agent_handoff ticket keyed on the triggering message.
- Comment the handoff id onto the conversation ticket.
- Attempt the Basecamp todo; its failure never undoes the ticket.
- Return the real outcome so the model cannot claim an escalation that did not occur.
- Leave the ticket open until a human resolves it; never close it on elapsed time.
**Inputs**
- the model's escalation reason
- the server-bound student enrollment id and triggering message id, never values from the model
- the conversation ticket id when one exists
**Outputs**
- one standalone agent_handoff ticket, priority high, deduped on the triggering room_message id
- a cross-reference comment on the conversation ticket
- a best-effort Basecamp todo as a secondary notification
- an honest escalated:false payload when the handoff could not be recorded
**Exceptions that must be handled**
- There is no AI recipient to hand off to: Swati is the only real recipient today (daraHandoffService.ts:14-18).
- A held authorization verdict is an honest non-escalation, never a fabricated one.
- No recurring resolver exists, deliberately: an agent_handoff ticket has no automated terminal-state signal.
- A retried tool call on the same message dedupes to the same ticket; a later question creates a new one.
- The R3 approval this path requests is not actually enforced today.
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- escalate_to_human
- create_internal_ticket
- add_ticket_comment
- basecamp_todo_write
- emit_structured_log
**Application surfaces**
- /admin/agents/<Dara> ticket surfaces
- Basecamp (Ali Personal todolist)
- invoked as an LLM tool inside the DM path; no HTTP route
**Source modules**
- backend/src/services/curriculum/daraTools.ts
- backend/src/services/curriculum/daraHandoffService.ts
- backend/src/services/workLedger/agentActionAuthorizationBridge.ts
**Dependencies**
- ticketService createTicket and its enforceReportsToGate, which needs Dara's reports_to chain to resolve to a human
- Dara's AdminUser identity
- the Basecamp gateway config, which is fail-closed and optional
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R6**.
Why that ceiling: It does not decide what a student is taught, so it is not a human_decision capability; but it writes a real external Basecamp side effect at risk tier R3, so automation is withheld and R6 (separately approved supervised pilot) is the ceiling. R8 is explicitly unavailable: no second AI employee has a matching capability to hand off to.

Not a human-reserved decision, but promotion is still evidence-based and one step at a time.
**First release behaviour (autonomy:R0)**
Record the dedup key, the no-resolver rule, and that only a human closes a handoff.

Acceptance: Swati confirms she is the recipient and that nothing closes on a timer.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- the R3 approval gate on this path is advisory only: abac_enforcement defaults to shadow and shadow never denies (backend/src/services/agentAuthorizationService.ts:149-150, docs/architecture/ai-workforce-management/PLATFORM_STATE_2026-09-15.md:117)
- the approval queue has never been decided by a person: decided_by has one distinct value across all 106 rows, system:auto_approve_timeout (docs/architecture/ai-workforce-management/APPROVAL_DROP_QUEUE_2026-10-06.md:92)
- every Basecamp write goes through a shared credential with no on-behalf-of header, so Basecamp's own UI attributes the todo to Ali personally; a mandatory AI-disclosure line in the todo body is the only mitigation (ROLE_CHARTER_v1.md:67)
- no agent-to-agent handoff protocol exists, so autonomy:R8 is unreachable by design today (ACCOUNTABILITY_v1.md:43)
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- backend/src/services/curriculum/daraTools.ts:37
- backend/src/services/curriculum/daraTools.ts:85
- backend/src/services/curriculum/daraHandoffService.ts:46
- backend/src/services/curriculum/daraHandoffService.ts:7
- backend/src/models/Ticket.ts:51
- backend/src/services/workLedger/agentActionAuthorizationBridge.ts:4
- docs/architecture/ai-workforce-management/employees/curriculum/ACCOUNTABILITY_v1.md:24
- docs/architecture/ai-workforce-management/APPROVAL_DROP_QUEUE_2026-10-06.md:121

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] Swati confirms she is the recipient and that nothing closes on a timer.

When every box above is ticked, stop and show the demo.
