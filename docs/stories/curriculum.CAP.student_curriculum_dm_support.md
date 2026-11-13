# curriculum.CAP.student_curriculum_dm_support — Student direct-message support on curriculum content and certification requirements

**CANDIDATE -- not started, not assigned.** This is one line on this domain's list of everything its agent could eventually do. It becomes real work only when the builder picks it and their manager agrees, at which point it opens as four stories. Until then it is deliberately inert, and the honest status of it is "not started" rather than "behind".

A student asking what a lesson covers, how a module fits the path, or what CCAR-F actually requires gets a grounded answer in the thread they are already in, and an honest handoff when the question is not Dara's to answer.

**Built today:** implemented. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- the R3 approval gate on this path is advisory only: abac_enforcement defaults to shadow and shadow never denies (backend/src/services/agentAuthorizationService.ts:149-150, docs/architecture/ai-workforce-management/PLATFORM_STATE_2026-09-15.md:117)
- the approval queue has never been decided by a person: decided_by has one distinct value across all 106 rows, system:auto_approve_timeout (docs/architecture/ai-workforce-management/APPROVAL_DROP_QUEUE_2026-10-06.md:92)
- the only recorded autonomy level for Dara is the 4-rung act_audited (TOOL_CAPABILITY_DESIGN_v1.md:28), which was derived before this surface existed; the live tools_granted array now classifies to communicate, the top rung, with no recorded human re-approval
- Dara's DM surface runs at effectively full autonomy in production today while no human-approved autonomy level for it is recorded anywhere - this is the clearest case in the domain of live behaviour outrunning recorded approval
- no curriculum-correctness check sits between the model's answer and the student

Full build prompt is attached to this story.

**Release:** autonomy:R0 · Legacy migration plan (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Student direct-message support on curriculum content and certification requirements
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.student_curriculum_dm_support`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** implemented · **Source:** inherited
## The business outcome
A student asking what a lesson covers, how a module fits the path, or what CCAR-F actually requires gets a grounded answer in the thread they are already in, and an honest handoff when the question is not Dara's to answer.
Intended users: students in the pilot cohort, Swati Raman (accountable manager), Ali Muwwakkil (DRI).
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- Fire only from sendDmMessage, in direct response to a real inbound message.
- No-op if the sender is Dara's own identity (loop guard) or if Dara is not a room member.
- No-op if Dara's AiAgent.enabled is false, read fresh on every call.
- Build the student persona prompt plus learner context.
- Call the model with the escalate_to_human tool available, one bounded retry on a transient failure.
- Ensure the room's ticket exists and log both sides of the exchange.
- Send the reply; on total failure send the one honest deterministic fallback, never silence.
**Inputs**
- the student's inbound RoomMessage, just persisted
- up to 20 messages of room history
- the student's learner context via buildAgentSystemPrompt
- attachment refs on the message
**Outputs**
- one Dara-authored DM in the same room
- a curriculum_support ticket for the room, so Swati can see who Dara is talking to and why
- a ticket activity entry per side of the exchange
- one deterministic failure fallback message when the model call fails twice
**Exceptions that must be handled**
- An out-of-scope question (homework, billing, anything not confidently curriculum-scoped) must be escalated, never guessed.
- If the escalation could not actually be recorded, the reply must not claim an escalation happened.
- A student-consent mechanism does not exist anywhere in the codebase, which is why Dara is reactive only and never initiates contact (daraResearchService.ts:9-16).
- The curriculum content Dara describes may itself be wrong; this capability conveys curriculum, it does not validate it.
- An LLM answer about what a certification requires can drift from Anthropic's actual published requirement.
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- openai_llm_completion
- read_room_messages
- send_room_dm
- read_attachments
- create_internal_ticket
- escalate_to_human
- emit_structured_log
**Application surfaces**
- student portal DM thread (frontend/src/pages/portal/today/ChatDock.tsx)
- the DM send path in communityRooms; no dedicated admin route
**Source modules**
- backend/src/services/curriculum/daraReplyService.ts
- backend/src/services/curriculum/daraSystemPrompt.ts
- backend/src/services/curriculum/daraPersona.ts
- backend/src/services/curriculum/daraTools.ts
- backend/src/services/curriculum/daraTicketLinkService.ts
**Dependencies**
- community rooms DM infrastructure and room membership
- an instrumented OpenAI client carrying Dara's real agent_id for cost attribution
- Dara's AdminUser identity for ticket attribution
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R5**.
Why that ceiling: This reaches a learner and conveys curriculum content, so what it says is a human decision and effectiveAuthority() caps a human_decision capability at autonomy:R5 (autonomyLadder.ts:169-173). It already runs unsupervised in production, which is a finding rather than a justification: a passing conversation proves nothing and cannot promote it.

**THIS IS A HUMAN DECISION.** It stays human-required at every autonomy level, forever. An
agent may prepare, summarise and propose; it may never decide. No amount of evidence
promotes this into automation.
**First release behaviour (autonomy:R0)**
Record the in-scope and out-of-scope lists, the escalation contract and the honesty rule about claimed escalations.

Acceptance: Swati restates the scope boundary in her own words and names one question she expects to be escalated.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- the R3 approval gate on this path is advisory only: abac_enforcement defaults to shadow and shadow never denies (backend/src/services/agentAuthorizationService.ts:149-150, docs/architecture/ai-workforce-management/PLATFORM_STATE_2026-09-15.md:117)
- the approval queue has never been decided by a person: decided_by has one distinct value across all 106 rows, system:auto_approve_timeout (docs/architecture/ai-workforce-management/APPROVAL_DROP_QUEUE_2026-10-06.md:92)
- the only recorded autonomy level for Dara is the 4-rung act_audited (TOOL_CAPABILITY_DESIGN_v1.md:28), which was derived before this surface existed; the live tools_granted array now classifies to communicate, the top rung, with no recorded human re-approval
- Dara's DM surface runs at effectively full autonomy in production today while no human-approved autonomy level for it is recorded anywhere - this is the clearest case in the domain of live behaviour outrunning recorded approval
- no curriculum-correctness check sits between the model's answer and the student
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- backend/src/services/curriculum/daraReplyService.ts:98
- backend/src/services/curriculum/daraReplyService.ts:16
- backend/src/services/curriculum/daraSystemPrompt.ts:18
- backend/src/services/curriculum/daraPersona.ts:78
- backend/src/services/communityRooms/dmService.ts:226
- backend/src/services/agentRegistrySeed.ts:2522
- backend/src/services/curriculum/daraIdentitySeed.ts:35
- backend/src/services/curriculum/daraTicketLinkService.ts:19
- docs/architecture/ai-workforce-management/employees/curriculum/ROLE_CHARTER_v1.md:66

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] Swati restates the scope boundary in her own words and names one question she expects to be escalated.

When every box above is ticked, stop and show the demo.
