# curriculum.CAP.escalation_reaches_a_named_human — Making sure a curriculum or certification finding actually reaches the accountable human

A real finding reaches Swati by a channel she actually reads, deduped on real severity rather than a timer, closing the known failure where an escalation was a comment nobody saw.

**Built today:** partial. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- the designed escalation mechanism - a direct transactional email to the manager - is still unbuilt: ACCOUNTABILITY_v1.md:30 records it as a Phase 2 design decision rather than a capability
- live_email is default-denied (backend/src/services/delivery/execution/executionPolicy.ts:33), so the email channel cannot be granted as an agent tool and needs a human-operated sender
- the Basecamp echo is attributed in Basecamp's own UI to Ali personally because the shared credential has no on-behalf-of header
- whether Swati reads either channel is not evidenced anywhere and is recorded as unknown

Full build prompt is attached to this story.

**Release:** r2 · r2 (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Making sure a curriculum or certification finding actually reaches the accountable human
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.escalation_reaches_a_named_human`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** partial · **Source:** manager_defined
## The business outcome
A real finding reaches Swati by a channel she actually reads, deduped on real severity rather than a timer, closing the known failure where an escalation was a comment nobody saw.
Intended users: Swati Raman (accountable manager), Ali Muwwakkil (DRI).
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- Produce the finding.
- Deliver it by a channel that reaches the named human, not a comment on a ticket nobody opens.
- Deduplicate on the real signal, never on elapsed time.
- Re-notify only when severity genuinely increased or the case is genuinely stale and unacknowledged.
- Never close a finding because time passed.
**Inputs**
- a real finding from any of the employee's capabilities
- its severity and whether it is still open
- the manager's real address and her real work queue
**Outputs**
- a notification on a channel the manager actually reads
- a re-notification only on a real severity increase or a genuinely stale unacknowledged case
**Exceptions that must be handled**
- The designed mechanism is a direct transactional email to the manager, deliberately not the executive-scoped alert subscription system whose email channel reads a fleet-wide admin setting and whose SMS and voice channels are scoped to Ali.
- The email mechanism is still a design decision rather than a built capability; what shipped instead is the handoff ticket plus the Basecamp todo, which is the only mechanism in the fleet that currently reaches a person at all.
- Live email is one of the eight default-denied capabilities, so the designed email channel cannot be an agent-held tool.
- A repeated or still-open finding must not re-escalate on a timer.
- Never close or mark a finding resolved based on elapsed time: a real closure re-derives the live signal it was opened under.
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- create_internal_ticket
- basecamp_todo_write
- emit_structured_log
**Application surfaces**
- /admin/agents/<Dara> findings and tickets
- Basecamp (the configured todolist)
- Swati's email
- none for the email path, which is unbuilt; the shipped path is the handoff ticket and the Basecamp gateway
**Source modules**
- backend/src/services/curriculum/daraHandoffService.ts
- backend/src/services/curriculum/daraBasecampGatewayService.ts
- backend/src/services/emailService.ts
**Dependencies**
- a channel the manager actually reads
- a severity signal worth deduping on
- a human-operated queue rather than an auto-approving timer
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R6**.
Why that ceiling: Delivering a finding to a named human is not itself a decision about what students are taught, so it is not human_decision. R6 caps it at a separately approved supervised pilot because the delivery is a real external side effect and the designed email channel is both unbuilt and, as live_email, default-denied to an agent.

Not a human-reserved decision, but promotion is still evidence-based and one step at a time.
**First release behaviour (autonomy:R0)**
Record the channel, the dedup rule, and the ban on time-based closure.

Acceptance: Swati confirms which channel she reads and that nothing closes on a timer.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- the designed escalation mechanism - a direct transactional email to the manager - is still unbuilt: ACCOUNTABILITY_v1.md:30 records it as a Phase 2 design decision rather than a capability
- live_email is default-denied (backend/src/services/delivery/execution/executionPolicy.ts:33), so the email channel cannot be granted as an agent tool and needs a human-operated sender
- the Basecamp echo is attributed in Basecamp's own UI to Ali personally because the shared credential has no on-behalf-of header
- whether Swati reads either channel is not evidenced anywhere and is recorded as unknown
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- docs/architecture/ai-workforce-management/employees/curriculum/ACCOUNTABILITY_v1.md:24
- docs/architecture/ai-workforce-management/employees/curriculum/ACCOUNTABILITY_v1.md:26
- docs/architecture/ai-workforce-management/employees/curriculum/ACCOUNTABILITY_v1.md:28
- docs/architecture/ai-workforce-management/employees/curriculum/ACCOUNTABILITY_v1.md:30
- docs/architecture/ai-workforce-management/employees/curriculum/RISK_REGISTER.md:14
- docs/architecture/ai-workforce-management/APPROVAL_DROP_QUEUE_2026-10-06.md:121
- backend/src/services/curriculum/daraHandoffService.ts:46
- backend/src/services/curriculum/daraBasecampGatewayService.ts:57

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] Swati confirms which channel she reads and that nothing closes on a timer.

When every box above is ticked, stop and show the demo.
