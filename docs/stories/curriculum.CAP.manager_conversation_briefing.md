# curriculum.CAP.manager_conversation_briefing — Direct manager conversation about the state of curriculum and certification

**CANDIDATE -- not started, not assigned.** This is one line on this domain's list of everything its agent could eventually do. It becomes real work only when the builder picks it and their manager agrees, at which point it opens as four stories. Until then it is deliberately inert, and the honest status of it is "not started" rather than "behind".

Swati can ask her AI employee what the curriculum and certification pipeline actually looks like today and get an evidence-first answer that says UNMEASURED where no metric exists, instead of a comfortable number.

**Built today:** implemented. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- /api/admin/agents is not mapped in PATH_SECTION (mgmtSectionGate.ts:21-148), so a scoped curriculum mgmt_role is still 403d on every agent route; Swati reaches the tab only because her admin_users row carries full role admin with no mgmt_role, which mgmtSectionGate passes untouched (mgmtSectionGate.ts:188)
- the M2 one-line mapping from MANAGER_ACCESS_PLAN.md:20 never landed, so the next domain owner given a scoped role will hit the same wall

Full build prompt is attached to this story.

**Release:** autonomy:R0 · Legacy migration plan (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Direct manager conversation about the state of curriculum and certification
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.manager_conversation_briefing`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** implemented · **Source:** inherited
## The business outcome
Swati can ask her AI employee what the curriculum and certification pipeline actually looks like today and get an evidence-first answer that says UNMEASURED where no metric exists, instead of a comfortable number.
Intended users: Swati Raman (accountable manager), Ali Muwwakkil (DRI).
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- Authorize the caller through requireAgentManagerOrAdmin: resolve their org_members row by email, then confirm the agent is in their downstream chain.
- Build the manager persona prompt from the stored system_prompt.
- Answer with the finding first and the evidence second.
- Say UNMEASURED and name why wherever a KPI has no metric behind it.
- Never present a deterministic rule's output as an LLM judgment, or the reverse.
**Inputs**
- AiAgent.system_prompt (DARA_PERSONA_BLOCK), persona_version 2026-09-17
- the conversation history
- scan findings and flag history when asked for them
**Outputs**
- a manager-facing reply in Dara's locked voice
- an explicit UNMEASURED answer with a named reason wherever no real metric exists
**Exceptions that must be handled**
- Four of six charter KPIs are UNMEASURED and must be reported that way, never estimated.
- A zero-activity goals score reads deceptively decent for a fresh employee, which the charter deliberately does not compound (RISK_REGISTER.md:11).
- Dara cannot approve her own charter, KPIs or memory; those stay manager-authored.
- An LLM reply about pipeline state can drift from the deterministic numbers it is describing.
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- openai_llm_completion
- read_agent_registry
- scan_curriculum_integrity
- read_workforce_tasks
- emit_structured_log
**Application surfaces**
- /admin/agents/<Dara> Talk tab (8-tab Agent Detail)
- /api/admin/agents/... manager conversation routes (agentManagerConversationRoutes.ts)
**Source modules**
- backend/src/services/curriculum/daraPersona.ts
- backend/src/services/agentBlueprint/agentManagerConversationPrompt.ts
- backend/src/middlewares/agentManagerAuthMiddleware.ts
**Dependencies**
- Swati's admin login
- requireAgentManagerOrAdmin resolving her org_members row by email
- an instrumented OpenAI client carrying Dara's agent_id
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R7**.
Why that ceiling: Answering the manager's own questions in her own thread has no side effect and no learner contact, so R7 is permitted for that one action class. It is nonetheless not at R7 today: nothing has been approved, and a successful conversation is explicitly not evidence of promotion.

Not a human-reserved decision, but promotion is still evidence-based and one step at a time.
**First release behaviour (autonomy:R0)**
Record which questions have a real metric and which are UNMEASURED and why.

Acceptance: Swati can name the two real metric keys and at least two UNMEASURED KPIs.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- /api/admin/agents is not mapped in PATH_SECTION (mgmtSectionGate.ts:21-148), so a scoped curriculum mgmt_role is still 403d on every agent route; Swati reaches the tab only because her admin_users row carries full role admin with no mgmt_role, which mgmtSectionGate passes untouched (mgmtSectionGate.ts:188)
- the M2 one-line mapping from MANAGER_ACCESS_PLAN.md:20 never landed, so the next domain owner given a scoped role will hit the same wall
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- backend/src/services/curriculum/daraPersona.ts:23
- backend/src/services/curriculum/daraPersona.ts:9
- backend/src/services/agentRegistrySeed.ts:2521
- backend/src/services/agentRegistrySeed.ts:2529
- backend/src/routes/admin/agentManagerConversationRoutes.ts
- backend/src/middlewares/agentManagerAuthMiddleware.ts:50
- docs/architecture/ai-workforce-management/employees/curriculum/ROLE_CHARTER_v1.md:50

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] Swati can name the two real metric keys and at least two UNMEASURED KPIs.

When every box above is ticked, stop and show the demo.
