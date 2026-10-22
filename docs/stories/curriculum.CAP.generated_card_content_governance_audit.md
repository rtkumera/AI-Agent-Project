# curriculum.CAP.generated_card_content_governance_audit — Governance audit of LLM-generated student card content

Every path that generates content a student reads is accounted for: what triggered it, under whose identity, with which kill switch and at what cost - closing the case where a student simply opening a card triggers an unattributed model write.

**Built today:** partial. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- the identity-less student-triggered generation path is an unresolved recorded risk and the stated precondition for absorbing the Experience Studio tools (COVERAGE_CONTRACT.md:24)
- the shared assistant client makes curriculum-adjacent LLM spend unattributable today, so the cost half of this audit returns unattributed rather than a number (RISK_REGISTER.md:9)
- fixing the shared client is recorded as a Platform-scoped item, not this domain's to resolve

Full build prompt is attached to this story.

**Release:** r2 · r2 (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Governance audit of LLM-generated student card content
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.generated_card_content_governance_audit`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** partial · **Source:** existing_application
## The business outcome
Every path that generates content a student reads is accounted for: what triggered it, under whose identity, with which kill switch and at what cost - closing the case where a student simply opening a card triggers an unattributed model write.
Intended users: Swati Raman (accountable manager), Ali Muwwakkil (DRI), platform operators.
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- Enumerate every path that generates content a student reads.
- For each, record the trigger, the acting identity, the kill switch and whether the cost is attributed.
- Flag any path where a student action triggers a model write with no identity.
- Report unattributed spend as unattributed, never as zero.
**Inputs**
- every call site that generates card content
- the instrumented client's agent_id and workflow_id tags
- the ai_events and cost records per workflow
**Outputs**
- an inventory of generation call sites with, for each, its trigger, its identity, its kill switch and its attribution
- a named list of paths that generate student-facing content with no identity
- unknown wherever a call site's trigger cannot be established
**Exceptions that must be handled**
- A student view triggering an LLM write with no identity and no switch is a recorded, unresolved risk, and the coverage contract makes giving it an identity and a kill switch the precondition for absorbing the Experience Studio tools at all.
- The shared assistant client carried 3,687 calls and 12.27 dollars in 30 days with agent_id null, so curriculum-adjacent spend cannot currently be attributed honestly.
- Unattributed spend must be reported as unattributed; reporting a clean zero would be the dishonesty this audit exists to prevent.
- The audit inventories and reports; it does not change a generation path, because changing one changes what students read.
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- read_ai_events
- read_component_registry
- read_repo_curriculum_data
- emit_structured_log
**Application surfaces**
- /admin/orchestration PromptControlTab
- /admin/orchestration HealthDashboardTab
- /admin/trust surfaces
- GET /api/admin/components/:slug/estimate
- GET /api/admin/components/:slug/analytics
- GET /api/admin/components/analytics
**Source modules**
- backend/src/services/timeline/cardContentService.ts
- backend/src/services/components/componentAiService.ts
- backend/src/services/openaiInstrumented.ts
**Dependencies**
- the instrumented OpenAI client being used at every call site
- ai_events coverage
- a human to decide on an unattributed path
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R7**.
Why that ceiling: The audit itself only reads call sites and event records, so R7 is permitted for producing the inventory. Remediating a path - giving it an identity, a switch, or turning it off - changes what students read and is a human decision handled elsewhere.

Not a human-reserved decision, but promotion is still evidence-based and one step at a time.
**First release behaviour (autonomy:R0)**
Record every generation call site, its trigger, its identity and its switch; mark unknowns as unknown.

Acceptance: Swati can name which paths generate student content without an identity.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- the identity-less student-triggered generation path is an unresolved recorded risk and the stated precondition for absorbing the Experience Studio tools (COVERAGE_CONTRACT.md:24)
- the shared assistant client makes curriculum-adjacent LLM spend unattributable today, so the cost half of this audit returns unattributed rather than a number (RISK_REGISTER.md:9)
- fixing the shared client is recorded as a Platform-scoped item, not this domain's to resolve
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- backend/src/services/timeline/cardContentService.ts
- backend/src/services/timeline/generatedContentRetention.ts
- backend/src/services/components/componentAiService.ts
- backend/src/services/timeline/cardBodyHtmlSanitizer.ts
- backend/src/services/timeline/cardCompletenessGate.ts
- backend/src/services/openaiInstrumented.ts
- docs/architecture/ai-workforce-management/employees/curriculum/RISK_REGISTER.md:15
- docs/architecture/ai-workforce-management/employees/curriculum/RISK_REGISTER.md:9

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] Swati can name which paths generate student content without an identity.

When every box above is ticked, stop and show the demo.
