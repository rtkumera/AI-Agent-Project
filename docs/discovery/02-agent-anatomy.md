# Dara's anatomy: nine elements, what runs, and what anyone approved

**Story:** `curriculum.RESEARCH-2-AGENT-ANATOMY` · **Accountable human:** Swati Raman · **Status:** draft for review

## Headline

| | Count | Elements |
|---|---|---|
| **Unknown**: the deciding fact lives only in production data that no source records | **5 of 9** | reasoning, memory, procedures, safeguards, verification |
| Known to be **absent** | 1 of 9 | coordination |
| Known from source | 3 of 9 | inputs, communication, tools |
| **Approved by Swati Raman**, the accountable human | **0 of 9** | none; every recorded approval is Ali's (see [Who approved what](#who-approved-what)) |

**The finding the brief asks for:** Dara already runs. She answers students over DM, opens handoff tickets, writes Basecamp to-dos and runs three daily scans. Every authorization behind that came from the DRI (Ali). The accountable manager has approved none of it, and none of Dara's 38 capabilities has a human-approved autonomy level (`autonomyLadder.ts:189`). The gap between what she *does* and what Swati has *approved* covers all nine elements.

Platform citations are to `ColaberryIntern/ColaberryEnterprise_AI_LeadershipAccelerator` at commit `a284987` (2026-10-26); paths are relative to `backend/src/services/` unless shown in full. Design docs are under `docs/architecture/ai-workforce-management/employees/curriculum/` in that repo.

### One question that sits above all nine: is Dara switched on?

- The registry seed sets `enabled: false` (`agentRegistrySeed.ts:2542`).
- The charter's v1.5 entry records "Real production state … `enabled: true`" as of 2026-09-17 (`ROLE_CHARTER_v1.md:68`).
- The seed is only the starting value. **Today's live value is unknown.** It would take a production read of Dara's `AiAgent` row (`enabled`, `config`, `tools_granted`).

The rest of this document describes what the code does *when she is enabled*.

---

## 1. Reasoning

**Exists today.** One LLM call per student message: the model is `process.env.AI_MODEL`, defaulting to `gpt-4o-mini`, at `temperature: 0.7` and `max_tokens: 500` (`curriculum/daraReplyService.ts:39`, `:177-184`). If the student attaches an image, it switches to `DARA_VISION_MODEL`, default `gpt-4o` (`:176`). The three daily scans don't use an LLM: they apply rules from `ops/directors.ts` (`workforce/directorActions.ts:41-45`), and the charter keeps them LLM-free (`ROLE_CHARTER_v1.md:50`).

**Approved.** The charter boundary keeping the deterministic duties LLM-free was approved by Ali (`ROLE_CHARTER_v1.md:50`, `:63`). No document approves a model, a temperature, or a production `AI_MODEL` value.

**Missing.** **Unknown:** which model production actually runs, since `AI_MODEL` lives in the environment, not in source. Nothing between the model's answer and the student checks whether the curriculum content is correct (`curriculum.CAP.student_curriculum_dm_support.md`, Blocked by).

**First honest version.** Record the production model and settings in Dara's charter, with Swati's sign-off. Add one rule: a reply that states a certification requirement must cite the curriculum record it came from, or say it doesn't know.

## 2. Memory

**Exists today.**
- **Within a conversation:** the last 20 messages in the room (`daraReplyService.ts:40`, `:119-123`).
- **Across conversations:** manager-approved `AgentMemoryProposal` rows are injected into every prompt, read fresh each call, and only when `status = 'approved'` (`agentBlueprint/agentSystemPrompt.ts:118`; `agentMemoryProposalService.ts:132-135`).

**Approved.** Dara can't approve her own memory; only Swati or Ali can (`ROLE_CHARTER_v1.md:52`).

**Missing.** **Unknown:** how many approved memory rows exist for Dara. It's a production table, with no record in either repo. If there are none, Dara has no memory across conversations at all. Whether Swati has ever reviewed a proposal is also **unknown**.

**First honest version.** Query `AgentMemoryProposal` for Dara's `agent_id`, grouped by status, and put the result in front of Swati. The first approved memory should be the in-scope and out-of-scope lists she confirms, so the contract lives in a record she owns, not only in a code constant.

## 3. Inputs

**Exists today.**
- **Student DM:** the student's new message, the last 20 room messages (`daraReplyService.ts:119-125`), the learner context from `getLearnerContextBlock(enrollmentId)` (`agentSystemPrompt.ts:129`), and any attachments (`daraReplyService.ts:148-161`).
- **Research sweep:** each pilot-cohort student's `studentSignals` and the result of `computeCertificationReadiness()`, with at-risk set at pass probability below 0.55 (`curriculum/daraSignalService.ts:18`, `:31-36`).
- **Daily flags:** `gatherSignals()` and `runDirectors()` (`workforce/directorActions.ts:41-45`).

**Approved.** The pilot cohort is a human setting. The gate fails closed when it's empty (`curriculum/daraEligibilityService.ts:33-44`). The charter records Ali setting it to "Cohort - July 2026" (`ROLE_CHARTER_v1.md:68`). Swati didn't choose it.

**Missing.** There's no input that tells Dara whether the curriculum content she describes is correct; the DM story says she conveys curriculum but doesn't validate it.

**First honest version.** This is already the most complete element. Swati only needs to confirm the pilot cohort and the 0.55 threshold, which is borrowed from the existing director rule (`daraSignalService.ts:12-18`), as her own.

## 4. Communication

**Exists today.**
- **Student-facing:** replies in the same DM thread through the same `sendDmMessage()` path a human uses (`daraReplyService.ts:257-260`). She only ever replies to a message: there is no scheduler call site for this path (`:26-29`).
- **Failure fallback:** if the model fails twice, the student gets one fixed apology, never silence (`:71-72`, `:310-317`).
- **Manager-facing:** the Talk tab, using a separate persona block (`curriculum/daraPersona.ts:9-11`, `:23-61`).
- **To humans by work item:** an `agent_handoff` ticket (`curriculum/daraHandoffService.ts:57-69`), a Basecamp to-do (`:71`), and a `WorkforceTask` from the research sweep (`curriculum/daraResearchService.ts:93-103`).

**Approved.** Ali lifted the original "no outbound communication" boundary on 2026-09-17 (`ROLE_CHARTER_v1.md:49`).

**Missing.**
- The designed escalation channel was an email to Swati (`ACCOUNTABILITY_v1.md:26`), and it was never built (`:30`). What actually goes out is a ticket plus a Basecamp to-do.
- According to the charter, that Basecamp to-do lands in a list inside "Ali Personal" (`ROLE_CHARTER_v1.md:68`), not in a Swati-owned queue. **Unknown:** whether Swati sees escalations at all.

**First honest version.** Send escalations somewhere Swati actually checks, then confirm with her that she has seen one real escalation arrive.

## 5. Tools

**Exists today.**
- **Function tools the model can call:** exactly one, `escalate_to_human` (`curriculum/daraTools.ts:33-55`). It has a real side effect: an `agent_handoff` ticket.
- **Attachments:** `read_attachments` is granted through a code constant, `dara: ['read_attachments']` (`agents/tools/agentToolRegistry.ts:25`), and checked with `agentHasTool` (`daraReplyService.ts:148`).
- **Security:** the model can never supply a student or ticket id; the server binds them (`daraTools.ts:29-31`).

**Approved.** The registry's `tools_granted` lists six names: `flag_curriculum_content_gaps`, `flag_certification_readiness`, `scan_curriculum_integrity`, `monitor_curriculum_video_health`, `respond_to_curriculum_dm` and `escalate_to_human` (`agentRegistrySeed.ts:2544-2550`). The original four were designed as `act_audited` (`TOOL_CAPABILITY_DESIGN_v1.md:28`).

**Missing.**
- **What `tools_granted` says differs from what actually runs.** `read_attachments` is used at runtime but missing from `tools_granted`, and four of the six listed names aren't model-callable tools at all. The array works as a classification label, and the runtime grant comes from elsewhere.
- Under the classifier, `respond_to_curriculum_dm` pushes the array up to `communicate`, its top rung. **Unknown:** whether a human approved that rung after the DM surface was added (`curriculum.CAP.student_curriculum_dm_support.md`, Blocked by).

**First honest version.** Keep one list of the tools Dara can actually invoke, with read_attachments and escalate_to_human the only model-facing ones. Have Swati approve that list and its `communicate` rung explicitly.

## 6. Procedures

**Exists today.** Each prompt is assembled in this order:
1. platform safety rules (`agentSystemPrompt.ts:105`)
2. role charter (`:108`)
3. persona, with the scope and escalation contract (`curriculum/daraPersona.ts:93-102`)
4. manager directives (`agentSystemPrompt.ts:115`)
5. approved memory (`:118`)
6. reliability state (`:125`)
7. learner context (`:129`)
8. a closing rule: never claim an escalation that didn't happen (`curriculum/daraSystemPrompt.ts:29-36`)

The research sweep has a fixed procedure: eligibility check, then signal, then dedup on `source_rec_key`, capped at 5 flags per sweep (`daraResearchService.ts:36`, `:54-106`).

**Approved.** The charter, persona and scope contract are all approved by Ali (`ROLE_CHARTER_v1.md:63-68`). Swati has confirmed no requirement in the capability matrix (`curriculum.CAP.student_curriculum_dm_support.md`, Blocked by).

**Missing.** **Unknown:** whether any active `ManagerDirective` exists for Dara. It's a production table. Directives can only narrow what Dara does, never grant anything (`agentSystemPrompt.ts:28-32`). Even so, any directive that exists shapes every reply without appearing in source.

**First honest version.** Swati restates the scope boundary in her own words and names one question she expects to be escalated (`curriculum.CAP.student_curriculum_dm_support.md`, Acceptance). That restatement becomes her first directive.

## 7. Coordination

**Exists today: nothing between agents.**
- Every handoff goes to a human. "No AI employee has a matching capability to hand off TO yet" (`curriculum/daraHandoffService.ts:13-18`), and "no handoff protocol between AI employees exists yet" (`ACCOUNTABILITY_v1.md:43`).
- The four legacy rows Dara absorbed (two directors, video-link health, heartbeat) aren't peers. They're behaviors re-parented under her, with `record_kind: 'behavior'` (`curriculum/repointLegacyBehaviors.ts:31-36`, `:59-61`).
- Other agents do write `WorkforceMessage` rows addressed `to_slug: 'curriculum'` (`workforce/directorActions.ts:143`; `workforce/workforceService.ts:167`). The accountability doc says Dara "subscribes" (`ACCOUNTABILITY_v1.md:41`), but no code in `curriculum/` reads them. **Unknown:** whether any UI shows them to a human.

**Approved.** Nothing. There is nothing here to approve.

**Missing.** Real coordination would need all of these, and none exists:
- a second AI employee with a matching capability to receive a handoff
- a message contract between employees (sender, receiver, dedup key, what "done" means)
- a consumer in Dara's code for messages addressed to `curriculum`
- a capability with a ceiling of `autonomy:R8`, approved by a human (0 of 38 today; see `docs/discovery/01-system-classes.md`)

**First honest version.** Don't build coordination. Decide what happens to the `to_slug: 'curriculum'` messages: route them to Swati, or stop writing them. Right now they reach nobody who is shown to act on them.

## 8. Safeguards

**Exists today.**
- **Kill switch:** the `enabled` flag is read fresh on every call (`curriculum/daraIdentitySeed.ts:47-53`; `daraReplyService.ts:105`).
- **Loop guard:** Dara never replies to her own messages (`daraReplyService.ts:112`).
- **Room scope:** she only replies in rooms she's a member of (`:114-117`).
- **Bounded retries:** one model retry (`:48-64`) and at most one tool round (`:186-212`).
- **Honest non-escalation:** if the handoff can't be recorded, she says so instead of claiming it (`daraTools.ts:72-77`, `:95-98`).
- **Authorization:** checks run before every send and every escalation (`daraReplyService.ts:231-253`; `daraTools.ts:85-99`).
- **Platform safety rules** come first in every prompt (`agentBlueprint/platformSafetyRules.ts:33-40`).

**Approved.** Charter boundaries 3, 4 and 8: Dara can't authorize her own writes, approve her own memory, or change her own autonomy level (`ROLE_CHARTER_v1.md:51`, `:52`, `:56`).

**Missing.** Several safeguards are advisory or fail open:
- The authorization check is "unconditionally true in shadow mode" (`workLedger/agentActionAuthorizationBridge.ts:102`), and shadow is the default (`agentAuthorizationService.ts:39-46`).
- A bridge error defaults to `allowed: true` (`agentActionAuthorizationBridge.ts:107-115`).
- `isDaraEnabled()` returns `true` when Dara's row is missing (`daraIdentitySeed.ts:52`).
- If ticket linking fails, the authorization check is skipped and the reply still sends (`daraReplyService.ts:217-224`, `:231`).

**Unknown:** the live `abac_enforcement` setting. If it's `enforce`, the gates block; if it's `shadow`, they only log.

**First honest version.** Read the live `abac_enforcement` value and report it to Swati. Until it's `enforce` for Dara, describe the gates as monitoring, not protection.

## 9. Verification

**Exists today.** 121 unit tests across 14 files in `curriculum/__tests__/`; `daraReplyService.test.ts` alone has 20 (see Q2). Every reply and failure is logged under Dara's own agent id (`daraReplyService.ts:264-273`, `:291-300`). Each conversation and escalation is backed by a ticket (`:132`; `daraHandoffService.ts:57-69`).

**Approved.** Nothing. No capability has a human-approved autonomy level (`autonomyLadder.ts:189`). The approval queue has never been decided by a person: all 106 rows are `system:auto_approve_timeout` (`APPROVAL_DROP_QUEUE_2026-10-06.md:92`).

**Missing.**
- **No evaluation of what Dara says.** I found no reference set, golden answers or shadow comparison for Dara anywhere in `backend/src` (Q2). The tests prove the plumbing works. Nothing measures whether her curriculum answers are correct, whether she escalates the right questions, or whether escalations reach Swati.
- **Unknown:** whether the 121 tests pass on the current commit. I didn't run them, because the brief authorizes reading only.

**First honest version.** Swati writes 10 real student questions with the answer she expects, including at least 3 that should be escalated. Each Dara reply is scored against them in shadow, which is the `autonomy:R5` rung. That gives the first measured number this domain has.

---

## Who approved what

| Decision | Approved by | Source |
|---|---|---|
| Role charter v1, name "Dara" | Ali | `ROLE_CHARTER_v1.md:63` |
| Accountability contract, Swati as reports-to | Ali | `ACCOUNTABILITY_v1.md:3`, `:50` |
| Lifting "no outbound communication" | Ali | `ROLE_CHARTER_v1.md:49`, `:65` |
| Production enablement, pilot cohort, Basecamp target | Ali | `ROLE_CHARTER_v1.md:68` |
| Swati's admin login | Ali | `ACCOUNTABILITY_v1.md:17` |
| Any requirement, capability, autonomy level, memory or directive | **Swati: none found** | Q3; `curriculum.CAP.student_curriculum_dm_support.md`, Blocked by |

Swati had no working login until 2026-09-16 (`ROLE_CHARTER_v1.md:65`). That was one day before Dara's student surface shipped (`:66-68`).

## Stale statements found in the source

These don't change any conclusion above, but a reviewer reading the source should know they're out of date:

- `daraIdentitySeed.ts:83-84` says "this release has zero LLM calls"; the DM path makes them (`daraReplyService.ts:177`).
- `PERSONALITY_PROFILE_v1.md:66` says Dara "has no student-facing surface"; the surface was superseded on 2026-09-17 (`ROLE_CHARTER_v1.md:49`).
- `ROLE_CHARTER_v1.md:49` still says "**Not yet built**"; its own v1.5 entry says the surfaces are live (`:68`).
- The registry moved about 20 lines between `6ba8530` and `a284987`: Dara is at `agentRegistrySeed.ts:2522` now, versus `:2502` as cited in `01-system-classes.md`.

---

## Sources

**Platform code** (`backend/src/services/`, @ `a284987`):

- `curriculum/daraReplyService.ts:26-29, 39-40, 48-64, 71-72, 105, 112, 114-125, 132, 148-161, 176-184, 186-212, 217-253, 257-260, 264-273, 291-300, 310-317`
- `curriculum/daraSystemPrompt.ts:29-36`
- `curriculum/daraPersona.ts:9-11, 23-61, 93-102`
- `curriculum/daraTools.ts:29-31, 33-55, 72-77, 85-99`
- `curriculum/daraIdentitySeed.ts:47-53, 83-84`
- `curriculum/daraHandoffService.ts:13-18, 57-69, 71`
- `curriculum/daraSignalService.ts:12-18, 31-36`
- `curriculum/daraResearchService.ts:36, 54-106`
- `curriculum/daraEligibilityService.ts:33-44`
- `curriculum/repointLegacyBehaviors.ts:31-36, 59-61`
- `agentBlueprint/agentSystemPrompt.ts:28-32, 105, 108, 115, 118, 125, 129`
- `agentBlueprint/platformSafetyRules.ts:33-40`
- `agentMemoryProposalService.ts:132-135`
- `agents/tools/agentToolRegistry.ts:25`
- `workLedger/agentActionAuthorizationBridge.ts:102, 107-115`
- `agentAuthorizationService.ts:39-46`
- `agentDomain/autonomyLadder.ts:189`
- `workforce/directorActions.ts:41-45, 143`; `workforce/workforceService.ts:167`
- `aiOpsScheduler.ts:367, 369, 375` (Dara's three daily crons: 06:10, 06:30, 06:15)
- `agentRegistrySeed.ts:2522-2551` (Dara row: `enabled` at :2542, `tools_granted` at :2544-2550)

**Platform docs** (`docs/architecture/ai-workforce-management/`):

- `employees/curriculum/ROLE_CHARTER_v1.md:49-56, 63-68`
- `employees/curriculum/ACCOUNTABILITY_v1.md:3, 17, 26, 30, 41, 43, 50`
- `employees/curriculum/TOOL_CAPABILITY_DESIGN_v1.md:28`
- `employees/curriculum/PERSONALITY_PROFILE_v1.md:66`
- `APPROVAL_DROP_QUEUE_2026-10-06.md:92`

**This repository:** `docs/stories/curriculum.CAP.student_curriculum_dm_support.md` (Blocked by, Acceptance); `docs/discovery/01-system-classes.md`.

**Queries** (run from the platform repo root):

```sh
# Q2: unit tests per file, and any Dara evaluation material
grep -c -E "^\s*(it|test)\(" backend/src/services/curriculum/__tests__/*.ts     # sums to 121
grep -rli dara backend/src | grep -iE "eval|golden|reference|shadow"             # no Dara eval set
# Q3: any approval attributed to Swati
grep -n -i swati docs/architecture/ai-workforce-management/employees/curriculum/*.md | grep -iE "approv|confirm|decid|sign"
```

**Production queries still to run** (each one resolves an **unknown** above; this story authorizes none of them):

- Dara's `AiAgent` row: `enabled`, `config.pilot_cohort_ids`, `tools_granted`, autonomy level
- `AgentMemoryProposal` rows for Dara's `agent_id`, by `status`
- active `ManagerDirective` rows for Dara's `agent_id`
- the `abac_enforcement` setting, and any `abac_mode_override` on Dara's row
- the production `AI_MODEL` and `DARA_VISION_MODEL` environment values
