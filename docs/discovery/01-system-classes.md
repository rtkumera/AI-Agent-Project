# Five system classes, and where Curriculum, Learning & Certification (Dara) sits

**Story:** `curriculum.RESEARCH-1-SYSTEM-CLASSES` · **Accountable human:** Swati Raman · **Status:** draft for review

**Answer in one line:** Dara should be **one tool-using agent** that runs most of its capabilities as fixed workflows. It does **not** need a multi-agent system, and an agentic system is not justified yet.

Platform citations are to `ColaberryIntern/ColaberryEnterprise_AI_LeadershipAccelerator` at commit `6ba8530` (2026-10-21). Citations under `docs/stories/` are to this repository. The counts can be reproduced with the query in [Sources](#sources).

---

## The domain in numbers

| Figure | Value | Source |
|---|---|---|
| Candidate capabilities | **38** | `docs/stories/curriculum.CAP.*.md` (Q1) |
| Human-reserved at every level ("THIS IS A HUMAN DECISION") | **20 of 38** | Q1 |
| Not human-reserved | 18 of 38 | Q1 |
| Inherited legacy agent records | **8** (6 migrated into capabilities, 2 retired) | `docs/stories/curriculum.LEGACY-MIGRATION-PLAN.md:3-6` |
| Capabilities with a human-approved autonomy level today | **0 of 38**; every one starts at `autonomy:R0` | Q1; `autonomyLadder.ts:188-191` returns `null` / `no_approved_autonomy` |
| Highest autonomy ceiling on any capability | `autonomy:R7`, on 11 of 38 | Q1 |
| Capabilities whose ceiling reaches `autonomy:R8` (agent-to-agent handoff) | **0 of 38** | Q1 |

Ceilings split cleanly along the human-reserved line (Q1):

| | R0 | R2 | R4 | R5 | R6 | R7 | R8+ |
|---|---|---|---|---|---|---|---|
| Human-reserved (20) | 1 | 7 | 5 | 7 | – | – | – |
| Not reserved (18) | – | – | – | 1 | 6 | 11 | – |

The split is not a coincidence. `effectiveAuthority()` caps every human-decision capability at `autonomy:R5` (shadow evaluation), whatever level is approved (`autonomyLadder.ts:213-220`). So 20 of Dara's 38 capabilities can never act unsupervised in production.

---

## The five classes

The platform has no "system class" vocabulary of its own. The mapping of each class to the R0–R9 autonomy ladder (`autonomyLadder.ts:59-69`) is this document's interpretation, made so the classes can be compared with Dara's real ceilings.

### 1. Chatbot
A model answers questions from approved knowledge. It has no tools and no side effects. On the ladder this is `autonomy:R2`, "Answer questions using approved knowledge and records" (`autonomyLadder.ts:61`), and the platform enforces it: a capability with no tool grants is capped at R2 (`autonomyLadder.ts:208-211`).

### 2. Fixed workflow
Code fixes the steps in advance, triggered by a schedule or an event, and no model chooses what happens next. Dara's first release is exactly this: it absorbed 4 legacy behaviors that are "all deterministic, no LLM call" (`agentRegistrySeed.ts:2512-2514`). The video-link check, for example, is a cron at `20 6 * * *` (`agentRegistrySeed.ts:2564-2570`).

### 3. Tool-using agent
A model picks from a small set of granted tools, inside a loop with a hard cap. Dara's student DM surface is this: `tool_choice: 'auto'` with `escalate_to_human` available, and "at most one tool round" so the model cannot loop (`daraReplyService.ts:182-189`). On the ladder it covers R3–R5: sandbox tool operations, multi-step sandbox tasks, then shadow evaluation (`autonomyLadder.ts:62-64`).

### 4. Agentic system
A model plans and carries out multi-step work toward a goal, chaining actions with production side effects while a human supervises rather than approving each step. On the ladder that is R6–R7: a supervised production pilot, then automating "explicitly authorized action classes within limits" (`autonomyLadder.ts:65-66`).

### 5. Multi-agent system
Several agents with their own roles hand work to each other. On the ladder that is `autonomy:R8`, "Coordinate necessary, authorized handoffs with other agents" (`autonomyLadder.ts:67`).

---

## Recommendation: one tool-using agent, mostly running fixed workflows

These are the reasons, each tied to the domain's figures:

1. **20 of 38 capabilities sit permanently in tool-using-agent territory.** The human-reserved capabilities are capped at R5 (`autonomyLadder.ts:213-220`). No evidence can move them past preparing, drafting and proposing, so more than half the domain can never use what an agentic system adds.
2. **The other 18 top out at bounded automation.** Eleven have an R7 ceiling, which means automating named action classes within limits, not open-ended planning. Six stop at R6 and one at R5 (Q1). An R7 capability is a fixed workflow that has been allowed to run alone, and that doesn't take an agentic system.
3. **Nothing has been approved yet.** 0 of 38 capabilities has a human-approved autonomy level (`autonomyLadder.ts:188-191`). Of the 106 approval requests on record, none was decided by a person; every one is `decided_by: system:auto_approve_timeout` (`APPROVAL_DROP_QUEUE_2026-10-06.md:92`). Building for more autonomy than a human has ever granted would stack an unapproved class on an unapproved base.
4. **One agent, not eight.** The 8 inherited legacy records were separate registry agents, such as `CurriculumOptimizerAgent` (`agentRegistrySeed.ts:1070`) and `EducationReportingAgent` (`agentRegistrySeed.ts:1700`). The migration plan folds 6 of them into capabilities of a single employee and retires 2 (`curriculum.LEGACY-MIGRATION-PLAN.md:3-6`). Dara is registered as one `ai_employee` row (`agentRegistrySeed.ts:2502-2531`).
5. **It can't be just a chatbot or just fixed workflows.** 37 of 38 capabilities need at least one tool; only `da_curriculum_analytics_transition` lists none (Q1). So a chatbot (R2) is too little. The DM surface already reads free text and decides whether to escalate (`daraReplyService.ts:182-189`), which a fixed workflow can't do.

**How the answer moves with the numbers.** With 20 reserved, every chain that changes what students are taught runs into a human decision. For example: gap detection (not reserved, R7, `competency_coverage_gap_detection.md:72`) → video curation proposal (reserved, `coverage_gap_video_curation_proposal.md:77`) → publish to the live timeline (reserved, `blueprint_publish_to_live_timeline.md:81`). If the reserved count fell far enough that a content chain could run end to end without one, the recommendation would move up a class. If any ceiling were R8, multi-agent would be on the table, and today none is.

---

## Not needed: a multi-agent system

The domain explicitly does **not** need a multi-agent system.

- 0 of 38 capabilities has an R8 ceiling (Q1). The out-of-scope handoff story says "R8 is explicitly unavailable: no second AI employee has a matching capability" (`curriculum.CAP.out_of_scope_escalation_handoff.md:82`).
- The handoff code agrees: "no AI employee has a matching capability to hand off TO yet," and the only recipient is Swati (`daraHandoffService.ts:13-15`).
- "No employee-to-employee handoff protocol exists, so a cross-domain finding reaches a human, not another agent" (`curriculum.CAP.coverage_scope_and_deferral_enforcement.md:55`).
- Splitting Dara back into several agents would undo the consolidation the migration plan exists to finish (point 4 above).

**Unknown:** the registry holds a weekly digest from another agent, "sent as one WorkforceMessage to Curriculum" (`agentRegistrySeed.ts:2335`). Whether Dara reads that message is not shown anywhere I checked. If she does, that's a one-way feed, not coordination, and it doesn't change this conclusion.

---

## What would justify the next class up (agentic system)

The best candidate for Dara's first agentic chain is the path that uses no reserved decision: **daily gap flag → escalation to a named human → Basecamp work gateway.** All three are non-reserved (Q1). The step to an agentic system is justified only when **all** of these are true:

1. **The Basecamp credential question is resolved.** The gateway's ceiling is held at R5 because it writes externally "under a shared credential that misattributes authorship to a named person". R6 needs "that resolution plus a separate pilot approval" (`curriculum.CAP.manager_work_gateway_to_basecamp.md:74-75`).
2. **A human records `approved_autonomy` of at least `autonomy:R6`** on each capability in the chain. Today that's 0 of 3, and 0 of 38 domain-wide (`autonomyLadder.ts:188-191`). In production, R6 also needs its own pilot approval (`autonomyLadder.ts:203-205`).
3. **The escalation channel exists and is permitted.** The designed email channel is "unbuilt and, as live_email, default-denied to an agent" (`curriculum.CAP.escalation_reaches_a_named_human.md:77`).
4. **The authorization gate actually blocks.** `abac_enforcement` defaults to `shadow`, which evaluates and logs but never blocks (`agentAuthorizationService.ts:39-46`). An agentic chain relies on gates that can say no.
5. **At least one approval request is decided by a person**, not by the timeout (`APPROVAL_DROP_QUEUE_2026-10-06.md:92`).

For **multi-agent** after that, the condition is a second AI employee with a matching capability to receive a handoff, plus a capability ceiling raised to R8 by a human. Neither exists today (see above).

---

## Open questions (unknown)

- **Is Dara enabled in production right now?** The seed says `enabled: false` (`agentRegistrySeed.ts:2522`). The DM story says the surface "runs at effectively full autonomy in production" (`curriculum.CAP.student_curriculum_dm_support.md`, Blocked by). The seed only sets the starting value, so the live value can't be read from source. It would take a production query on Dara's agent row (`enabled`, `tools_granted`, autonomy level). **Unknown.**
- **Dara's recorded autonomy level.** The design records `act_audited` for the four original tools (`TOOL_CAPABILITY_DESIGN_v1.md:28`). The classifier treats any `_dm` tool as `communicate`, its top rung (`agentCapabilityClassifier.ts:44-56`), and `respond_to_curriculum_dm` is granted (`agentRegistrySeed.ts:2529`). So the array now classifies one rung higher than what was approved. Whether a human re-approved that is **unknown**: I found no record of it.

---

## Citation drift found while checking the brief

Several `file:line` citations in the capability briefs no longer point at the claim at commit `6ba8530`. The claims themselves still hold; the line numbers are stale.

| Brief cites | Claim | Where it is now |
|---|---|---|
| `autonomyLadder.ts:141-144` | `no_approved_autonomy` | `autonomyLadder.ts:188-191` |
| `agentAuthorizationService.ts:149-150` | ABAC defaults to shadow | `agentAuthorizationService.ts:39-46` (149-150 is now an unrelated comment) |
| `PLATFORM_STATE_2026-09-15.md:117` | shadow never denies | line 117 is now a table separator; I didn't find the new line |
| `APPROVAL_DROP_QUEUE_2026-10-06.md:92` | 106 rows, all timeout-decided | **still accurate** |
| `TOOL_CAPABILITY_DESIGN_v1.md:28` | Dara classified `act_audited` | **still accurate** |

---

## Sources

**Platform** (`ColaberryEnterprise_AI_LeadershipAccelerator` @ `6ba8530`):

- `backend/src/services/agentRegistrySeed.ts:1040-1078`: legacy curriculum agents (Architect, Artifact, QA, Optimizer)
- `backend/src/services/agentRegistrySeed.ts:1700`: `EducationReportingAgent`
- `backend/src/services/agentRegistrySeed.ts:2335`: weekly WorkforceMessage digest to Curriculum
- `backend/src/services/agentRegistrySeed.ts:2502-2531`: the Dara row, `enabled: false` at :2522, `tools_granted` at :2524-2530
- `backend/src/services/agentRegistrySeed.ts:2564-2570`: `CurriculumVideoLinkHealth` cron
- `backend/src/services/agentDomain/autonomyLadder.ts:59-69`: R0–R9 meanings
- `backend/src/services/agentDomain/autonomyLadder.ts:188-191`: no approved autonomy ⇒ `null`
- `backend/src/services/agentDomain/autonomyLadder.ts:203-205`: production R6+ needs separate pilot approval
- `backend/src/services/agentDomain/autonomyLadder.ts:208-211`: no tool grants ⇒ capped at R2
- `backend/src/services/agentDomain/autonomyLadder.ts:213-220`: human decision ⇒ capped at R5
- `backend/src/services/agentAuthorizationService.ts:39-46`: ABAC default `shadow`
- `backend/src/services/agentCapabilityClassifier.ts:44-56`: `communicate` tier includes `_dm`
- `backend/src/services/curriculum/daraReplyService.ts:182-189`: one bounded tool round
- `backend/src/services/curriculum/daraHandoffService.ts:13-15`: no AI recipient to hand off to
- `docs/architecture/ai-workforce-management/APPROVAL_DROP_QUEUE_2026-10-06.md:92`
- `docs/architecture/ai-workforce-management/employees/curriculum/TOOL_CAPABILITY_DESIGN_v1.md:28`

**This repository:**

- `docs/stories/curriculum.LEGACY-MIGRATION-PLAN.md:3-6`: 8 legacy records, 6 migrated, 2 retired
- `docs/stories/curriculum.CAP.out_of_scope_escalation_handoff.md:82`: R8 unavailable
- `docs/stories/curriculum.CAP.coverage_scope_and_deferral_enforcement.md:55`: no employee-to-employee protocol
- `docs/stories/curriculum.CAP.manager_work_gateway_to_basecamp.md:74-75`: gateway ceiling reason
- `docs/stories/curriculum.CAP.escalation_reaches_a_named_human.md:77`: escalation ceiling reason
- `docs/stories/curriculum.CAP.competency_coverage_gap_detection.md:72`, `curriculum.CAP.coverage_gap_video_curation_proposal.md:77`, `curriculum.CAP.blueprint_publish_to_live_timeline.md:81`: the example content chain

**Q1: capability counts.** Run from this repository's root:

```sh
cd docs/stories
ls curriculum.CAP.*.md | wc -l                                  # 38 capabilities
grep -l 'THIS IS A HUMAN DECISION' curriculum.CAP.*.md | wc -l  # 20 human-reserved
grep -h -o 'ceiling \*\*autonomy:R[0-9]\*\*' curriculum.CAP.*.md | sort | uniq -c   # ceiling distribution
grep -h -o 'Starting autonomy \*\*autonomy:R[0-9]\*\*' curriculum.CAP.*.md | sort | uniq -c  # all R0
```

Split ceilings by reserved and non-reserved by running the third line against `grep -l` / `grep -L 'THIS IS A HUMAN DECISION'`. Count tools per capability from the "Tools this capability requires" list in each file.
