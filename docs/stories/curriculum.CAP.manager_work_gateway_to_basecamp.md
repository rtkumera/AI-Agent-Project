# curriculum.CAP.manager_work_gateway_to_basecamp — Agent-to-human work gateway into the manager's real Basecamp queue

**CANDIDATE -- not started, not assigned.** This is one line on this domain's list of everything its agent could eventually do. It becomes real work only when the builder picks it and their manager agrees, at which point it opens as four stories. Until then it is deliberately inert, and the honest status of it is "not started" rather than "behind".

Work Dara hands to a human lands in the tool that human actually checks each day, with an idempotency key so a retry never creates a second todo, and a disclosure line so nobody mistakes it for a person's message.

**Built today:** implemented. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- the credential decision is explicitly open: whether to keep using the shared Basecamp credential or the CB System service account is recorded as an unresolved decision for Ali, not silently settled (ROLE_CHARTER_v1.md:67)
- no write allowlist existed anywhere in the codebase before this one, so there is no second implementation to compare it against (daraBasecampConfigService.ts:5-8)

Full build prompt is attached to this story.

**Release:** autonomy:R0 · Legacy migration plan (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Agent-to-human work gateway into the manager's real Basecamp queue
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.manager_work_gateway_to_basecamp`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** implemented · **Source:** inherited
## The business outcome
Work Dara hands to a human lands in the tool that human actually checks each day, with an idempotency key so a retry never creates a second todo, and a disclosure line so nobody mistakes it for a person's message.
Intended users: Swati Raman (accountable manager), Ali Muwwakkil (DRI, because the shared credential attributes writes to him).
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- Read the write-target allowlist; treat any missing or malformed field as not configured.
- Check the ledger for an existing write on the same idempotency key.
- POST the todo through the CB System identity with the disclosure line in the body.
- Record the outcome in the work ledger either way.
- Never throw: a gateway failure must not undo the internal ticket that is the real guarantee.
**Inputs**
- the handoff ticket id, title, student name and reason
- AiAgent.config.basecamp_gateway: one project id, one todolist id, one optional assignee
- the CB System service-account token
**Outputs**
- one Basecamp todo in the single allowlisted todolist, carrying a mandatory AI-disclosure line
- work_ledger_events rows recording the attempt and its outcome
- an unassigned todo when no assignee id is configured, rather than a fabricated one
**Exceptions that must be handled**
- Fail-closed: no config means no write, never a guessed project or todolist.
- The allowlist is deliberately one destination, not a general multi-project allowlist.
- The assignee is optional because a real lookup found no Swati Raman among the 15 people visible to that identity; an unassigned todo is the honest fallback.
- The shared credential carries no on-behalf-of header, so Basecamp attributes the write to Ali personally.
- A Basecamp outage is a missing secondary notification, never a lost unit of work.
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- basecamp_todo_write
- read_agent_config
- write_work_ledger_event
- emit_structured_log
**Application surfaces**
- Basecamp (Ali Personal, one dedicated todolist)
- outbound Basecamp API only; no inbound route
**Source modules**
- backend/src/services/curriculum/daraBasecampGatewayService.ts
- backend/src/services/curriculum/daraCbSystemBasecampClient.ts
- backend/src/services/curriculum/daraBasecampConfigService.ts
**Dependencies**
- a human supplying a real project, todolist and assignee id
- the CB System token being valid
- the internal agent_handoff ticket as the primary record
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R5**.
Why that ceiling: A real external write under a shared credential that misattributes authorship to a named person is the highest-consequence thing in this domain that is not learner-facing. R5 caps it at shadow comparison until the credential question Ali flagged as unresolved is actually resolved; R6 would require that resolution plus a separate pilot approval.

Not a human-reserved decision, but promotion is still evidence-based and one step at a time.
**First release behaviour (autonomy:R0)**
Record the single allowlisted destination, the idempotency key, the disclosure line and the fail-closed rule.

Acceptance: Swati names the destination and confirms the disclosure wording.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- the credential decision is explicitly open: whether to keep using the shared Basecamp credential or the CB System service account is recorded as an unresolved decision for Ali, not silently settled (ROLE_CHARTER_v1.md:67)
- no write allowlist existed anywhere in the codebase before this one, so there is no second implementation to compare it against (daraBasecampConfigService.ts:5-8)
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- backend/src/services/curriculum/daraBasecampGatewayService.ts:57
- backend/src/services/curriculum/daraBasecampConfigService.ts:34
- backend/src/services/curriculum/daraBasecampConfigService.ts:4
- backend/src/services/curriculum/daraCbSystemBasecampClient.ts:67
- backend/src/services/curriculum/daraHandoffService.ts:71
- docs/architecture/ai-workforce-management/employees/curriculum/ROLE_CHARTER_v1.md:67

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] Swati names the destination and confirms the disclosure wording.

When every box above is ticked, stop and show the demo.
