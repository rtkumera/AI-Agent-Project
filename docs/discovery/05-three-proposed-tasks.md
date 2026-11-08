# Three proposed tasks for Dara, with boundaries and completion evidence

**Domain:** Curriculum, Learning & Certification (Dara) · **Story:** `curriculum.RESEARCH-5-THREE-PROPOSED-TASKS`
**Accountable human and approver for all three:** Swati Raman
**Status:** proposal only. Nothing here enables Dara, grants her a tool or sets an autonomy level. All three capabilities stay `draft` until Swati has reviewed them.
**Platform source:** [ColaberryEnterprise_AI_LeadershipAccelerator](https://github.com/ColaberryIntern/ColaberryEnterprise_AI_LeadershipAccelerator) at commit `a284987`. All `backend/…` and `docs/architecture/…` paths below are in that repository.

---

## 1. Answer in short

I chose three of Dara's 38 draft capabilities (`backend/src/services/agentDomain/capabilities/curriculum.json`). I picked one of each risk shape:

| # | Task (capability id) | What it touches | Human decision? | Start → ceiling | First rung I propose aiming for |
|---|---|---|---|---|---|
| A | Read-only curriculum integrity scan (`curriculum.curriculum_integrity_scan`) | Reads the module and lesson tree. Writes nothing. | No (`curriculum.json:360`) | `autonomy:R0` → `autonomy:R7` (`:361-362`) | `autonomy:R4` (unattended sandbox runs) |
| B | Out-of-scope question handed to Swati (`curriculum.out_of_scope_escalation_handoff`) | Writes a ticket and a Basecamp todo for a human. | No (`:743`) | `autonomy:R0` → `autonomy:R6` (`:744-745`) | `autonomy:R3` (sandbox, from fixtures) |
| C | Ranked curriculum improvement recommendations (`curriculum.curriculum_improvement_recommendations`) | Proposes changes to what students are taught. Never applies them. | **Yes** (`:1912`) | `autonomy:R0` → `autonomy:R5` (`:1913-1914`) | `autonomy:R2` (explain), then `autonomy:R5` (shadow) |

Every task starts at `autonomy:R0` because no capability has an approved level. `effectiveAuthority()` returns `null` with reason `no_approved_autonomy` (`backend/src/services/agentDomain/autonomyLadder.ts:188-191`). Each capability's `current_approved_autonomy` is `"unknown"` (`curriculum.json:358`, `:741`, `:1910`).

**One rule runs through every section below.** None of these count as evidence that a task worked: a story marked done, time passing, a conversation that went well, or a mocked test passing. That rule matters because all 106 approval rows on this platform were decided by `system:auto_approve_timeout` (`docs/architecture/ai-workforce-management/APPROVAL_DROP_QUEUE_2026-10-06.md:92`), which the same document calls "a 4.25-hour delay followed by an automatic yes" (`:95`). Every test that exists today for these three tasks is a unit test with mocks. Those tests are preconditions. **They are not completion evidence**, and the sections below don't use them as evidence.

## 2. How I chose, and what I left out

- **Why these three.** They cover the three ways a task can go wrong:
  - **A** can only be wrong about what it reports.
  - **B** can be wrong in a way a human has to clean up.
  - **C** can be wrong about what students are taught.

  All three are already implemented (`curriculum.json:296`, `:669`, `:1845`), so each one can be checked against real code, not against an idea.
- **Left out on purpose: student DM support** (`curriculum.student_curriculum_dm_support`). It reaches learners and is a human decision, and it already runs in production without supervision. That makes it a finding to raise with Swati, not a task to propose. It is covered by Q2 and Q8 in `04-manager-interview.md`.
- **Left out on purpose: the DA duty transition** (`curriculum.da_curriculum_analytics_transition`). Its ceiling is `autonomy:R0` until a duty list exists. See `03-role-and-da-transition.md` §8. A task over an undefined scope can't have completion evidence, so it fails this story's own test.
- **Ceilings are copied, not invented.** Each ceiling and its reason come from the capability's own `max_permitted_autonomy` and `max_autonomy_rationale`. I read each reason against what the rung means in `AUTONOMY_MEANINGS` (`autonomyLadder.ts:58-69`) and the cap rules in `effectiveAuthority()` (`:185-223`), and I explain each one in my own words. The "first rung I propose aiming for" column is my recommendation. Swati decides it.

### The ladder rungs used below (`autonomyLadder.ts:58-69`)

| Rung | Meaning (owner's words) |
|---|---|
| R0 | Define the workflow, requirements, risks and human decisions. |
| R1 | Prepare isolated development, fixtures and baseline tests. |
| R2 | Answer questions using approved knowledge and records. |
| R3 | Perform approved, user-initiated sandbox tool operations. |
| R4 | Execute and verify stateful, multi-step sandbox tasks. |
| R5 | Evaluate in shadow mode against approved reference outcomes. |
| R6 | Conduct a separately approved, supervised production pilot. |
| R7 | Automate only explicitly authorized action classes within limits. |
| R8 | Coordinate necessary, authorized handoffs with other agents. |
| R9 | Demonstrate reliable operation, monitoring, recovery and ownership. |

Three code rules matter for the ceilings:
- A capability with no tool grants is held at R2 (`:207-211`).
- A `human_decision` capability is capped at R5 forever (`:213-220`).
- Production at R6 or above is flagged as needing a separate pilot approval (`:202-205`).

---

## 3. Task A: read-only curriculum integrity scan

### 3.1 Completion evidence (written first)

The task worked when **all five** of these are true. Each one is a record someone can open:

| # | Evidence | Where it lives | Why it isn't timer-shaped |
|---|---|---|---|
| A-E1 | A sandbox module tree is seeded with known defects: one of each of the four rules, plus one clean module. Swati writes the expected finding list **before** the run. The scan's findings match that list exactly: same count, same locations, and zero findings on the clean module. | The fixture file plus Swati's expected list, both committed before the run, plus the scan output. | It's a comparison against a list a human wrote first. It runs on a real sandbox database, not the mocked `CurriculumModule.findAll` the unit tests use (`backend/src/services/agents/__tests__/curriculumQAAgent.test.ts`). |
| A-E2 | Two runs over an unchanged tree return identical finding sets. | Two stored outputs and a diff. | This is the capability's own R4 criterion (`curriculum.json:384`). |
| A-E3 | The ticket count is the same before and after every run. | A count on `tickets` in sandbox. | It checks the "zero tickets, by contract" rule (`curriculum.json:305`; `COVERAGE_CONTRACT.md:44`) against real data, not only the mocked `createTicket` assertion (test line 134). |
| A-E4 | Every run leaves an activity record tagged with Dara's real agent id. | `agent_runs` / activity log. | The baseline is zero `agent_runs` ever (`COVERAGE_CONTRACT.md:42`). Until a row exists, nobody can show the scan ran at all. |
| A-E5 | Swati reads at least one real finding and records, under her own name, whether it is a real defect or a false positive. | A note or ticket comment authored by Swati. | It's a named human judgment. No timer can produce it. |

**Not evidence for Task A:**
- The 10 passing tests in `curriculumQAAgent.test.ts`. They're mocked.
- A run that returns no findings. "An absent finding is not evidence of a healthy tree" (`curriculum.json:317`).
- The scan "running for a week".

### 3.2 The task

On request, Dara scans the curriculum module and lesson tree for four structural defects and returns typed findings:
- a module with no lessons (warn)
- a lesson with no title (warn)
- a lesson with neither mini-sections nor artifacts (warn)
- a lesson sort order that doesn't increase (info)

The workflow is in `curriculum.json:307-314`. The code is `backend/src/services/agents/curriculumQAAgent.ts:45`, `:121-122`.

### 3.3 Tools and data it needs

- **Tools** (`curriculum.json:335-339`): `scan_curriculum_integrity`, `read_curriculum_modules`, `emit_structured_log`.
- **Data** (`:299-302`): `curriculum_modules` joined to `curriculum_lessons`, `artifact_definitions` and `mini_sections`, plus an optional `moduleId`.
- **Dispatch:** through workGraph capability `curriculum.qa_check`. There is no HTTP route (`:328-330`).
- **For the evidence:** a sandbox database with a seeded fixture tree. Whether one exists today is **unknown**. I found none.

### 3.4 Boundary: what Dara must NOT do

- Must not write anything: no ticket, no row, no edit to a module or lesson. The only allowed write is its own activity log line.
- Must not fix a defect it finds. Fixing changes what students are taught, and that is a different capability.
- Must not say the curriculum is "healthy" or "fine" when there are no findings. It says which four rules were checked and that nothing else was (`curriculum.json:379`).
- Must not report on week decks or Experience Studio card content. The scan can't see them (`:319`).
- Must not run on a cron. The registry row advertises a schedule that nothing runs (`backend/src/services/agentRegistrySeed.ts:1060-1065`, `trigger_type: 'cron'`; `docs/architecture/ai-workforce-management/employees/curriculum/RISK_REGISTER.md:8`). Adding one is Swati's call.

### 3.5 Approval

- **Approver: Swati Raman** (`curriculum.json:279`, `:298`).
- Approval is required to confirm scope (`:298`), to approve each rung, and for R7, to authorize "that action class by name in writing" (`:389`).
- No approval is needed per run, because a run writes nothing.

### 3.6 Autonomy: start `autonomy:R0`, ceiling `autonomy:R7`

- **Why the ceiling is that high:**
  - The scan is the only one of the three tasks with no side effect at all.
  - R7 means automating "only explicitly authorized action classes". "Produce this one report" is a single nameable class (`curriculum.json:363`).
  - `human_decision` is `false` (`:360`), so the R5 cap doesn't apply.
- **Why not higher:**
  - R8 needs another agent to hand findings to, and none exists.
  - R9 needs monitoring and recovery, and nothing is written for that (`:363`).
- **Why I propose aiming for R4 first:**
  - Today, nothing anyone reads displays the findings on a schedule (`:368`). A scan at R7 would produce reports nobody sees.
  - R4 (unattended sandbox runs, A-E1 to A-E4) proves the scan is repeatable before anything reaches production.

### 3.7 Switch it off if

- Any write other than its own log line is attributed to the scan, above all a ticket. That breaks the contract in `COVERAGE_CONTRACT.md:44`.
- Two runs over an unchanged tree give different findings (A-E2 fails).
- A planted defect is missed, or the clean module gets a finding (A-E1 fails).
- Its output is described anywhere as "the curriculum is healthy".

**How to switch it off:** stop dispatching `curriculum.qa_check`, and set Dara's `enabled` flag to false. The workforce runtime gate refuses a disabled agent, an active kill switch and safe mode (`backend/src/services/workforce/workforceAgentRuntime.ts:69-71`). Whether the workGraph dispatch path for this scan goes through that gate is **unknown**. I didn't trace it. Swati shouldn't rely on the flag for this task until someone checks.

---

## 4. Task B: hand an out-of-scope student question to Swati

### 4.1 Completion evidence (written first)

| # | Evidence | Where it lives | Why it isn't timer-shaped |
|---|---|---|---|
| B-E1 | In sandbox, replaying the same triggering message twice gives exactly one `agent_handoff` ticket for that message id. | A ticket count where `entity_type='room_message'` and `entity_id` is that id. | It's a count of real rows. This is the capability's own R3 criterion (`curriculum.json:764`). |
| B-E2 | Removing the admin identity or the triggering message id gives `escalated:false` and zero tickets, and Dara's reply to the student does **not** say it escalated. | Tool output, ticket count, reply text. | It tests the "honest non-escalation" path (`backend/src/services/curriculum/daraTools.ts:76`, `:98`) against real rows and the real reply, not only the mocked test. |
| B-E3 | During the pilot, every `agent_handoff` ticket that is closed was closed by a named human user. The count of tickets closed by any `system:` actor or by elapsed time is zero. | Ticket close records (who closed, when). | It's the direct opposite of the 106 timer-decided rows. The code says a handoff is "never closed by elapsed time" (`daraHandoffService.ts:29-30`). |
| B-E4 | With `abac_enforcement` set to `enforce` for this path, a named human (not a timeout) decides at least one real request. | The authorization decision record. | It's the capability's own R6 criterion (`curriculum.json:769`). Today the default is `shadow`, which "evaluate[s] + log[s], never block[s]" (`backend/src/services/agentAuthorizationService.ts:39-46`). |
| B-E5 | Every Basecamp todo it creates carries the mandatory AI-disclosure line. | The todo bodies. | It's the only mitigation for todos being shown as written by Ali (`curriculum.json:752`). |

**Not evidence for Task B:**
- A ticket existing. A ticket nobody resolves is a comment nobody owns.
- A ticket being closed, if the closer isn't a named person.
- A student saying thanks.
- The passing mocked tests in `daraHandoffService.test.ts` and `daraTools.test.ts`.

### 4.2 The task

When a student asks Dara something outside her scope, she calls `escalate_to_human`, and the platform then:
1. Creates one standalone `agent_handoff` ticket with high priority, deduplicated on the triggering message id.
2. Comments the handoff id onto the conversation ticket.
3. Tries to create a Basecamp todo, which is best effort.
4. Returns the true outcome, so Dara can't claim an escalation that didn't happen.

The workflow is in `curriculum.json:683-691`. The code is `daraHandoffService.ts:7-30` and `daraTools.ts:25-27`.

### 4.3 Tools and data it needs

- **Tools** (`curriculum.json:716-722`): `escalate_to_human`, `create_internal_ticket`, `add_ticket_comment`, `basecamp_todo_write`, `emit_structured_log`.
- **Data** (`:672-676`):
  - the model's reason
  - the student enrollment id and triggering message id, bound on the server and never taken from the model
  - the conversation ticket id
- **Dependencies** (`:699-703`):
  - Dara's AdminUser identity
  - Dara's `reports_to` chain resolving to Swati
  - the Basecamp gateway config, which is optional and fails closed

### 4.4 Boundary: what Dara must NOT do

- Must not answer the out-of-scope question herself, before or after escalating.
- Must not tell the student a human has the question unless the tool returned `escalated:true`.
- Must not close, resolve or reassign a handoff ticket. Only a human closes one (`curriculum.json:758`).
- Must not take any recipient other than her `reports_to` human. There is no AI recipient (`:693`). R8 is unreachable by design.
- Must not send email. The email channel is unbuilt and default-denied to agents (`curriculum.json:3796`, `:3846`, under `escalation_reaches_a_named_human`).
- Must not create a Basecamp todo without the AI-disclosure line (`:752`).

### 4.5 Approval

- **Approver: Swati Raman**, who is also the person who receives every handoff (`daraHandoffService.ts:13-14`).
- **Approval is required:**
  - for scope
  - for each rung
  - for the R6 pilot, which needs its own written scope, a rollback condition, and enforcement switched on
- The path asks for R3 authorization on every call (`curriculum.json:684`), but that approval **isn't enforced today** (`:697`, `:750`). Every call is allowed while the platform runs in shadow mode.
- **Ali Muwwakkil** is the DRI (`:655`). He needs to answer the shared-credential question (`:752`) before the Basecamp half goes past sandbox. Whether he has answered it is **unknown**.

### 4.6 Autonomy: start `autonomy:R0`, ceiling `autonomy:R6`

- **Why it isn't capped at R5:** it doesn't decide what a student is taught, so `human_decision` is `false` (`curriculum.json:743`, `:746`).
- **Why R6 and not R7:**
  - It writes a real external side effect, a Basecamp todo, under a shared credential.
  - Its approval gate is advisory only.
  - Automating an action class while the gate can't block would automate it with no gate at all.
- **Why R8 is closed:** there is no second agent to hand off to (`:746`, `:753`).
- **Why I propose aiming for R3 first:** B-E1 and B-E2 can be proven in sandbox now. R6 (B-E3, B-E4) depends on `abac_enforcement` being switched to `enforce`. That is a platform change outside this domain.

### 4.7 Switch it off if

- Any handoff ticket is closed by anyone other than a named human (B-E3 fails).
- One triggering message produces two tickets (B-E1 fails).
- Dara tells a student a person has the question when the tool returned `escalated:false` (B-E2 fails).
- A Basecamp todo goes out without the disclosure line (B-E5 fails).
- During a pilot, `abac_enforcement` for this path falls back to `shadow`.

**How to switch it off:** the escalation runs inside Dara's DM reply path. Setting Dara's `enabled` flag to false stops that path before any work (`backend/src/services/curriculum/daraReplyService.ts:100-105`), which also stops her DM replies. There is no switch for escalation alone. Whether that should be built is a question for Swati.

---

## 5. Task C: ranked curriculum improvement recommendations

### 5.1 Completion evidence (written first)

| # | Evidence | Where it lives | Why it isn't timer-shaped |
|---|---|---|---|
| C-E1 | Shadow comparison. For an agreed set of real weeks, Swati (or a reviewer she names) writes her own list of recommended changes **first** and records it. Then Dara's ranked list is compared with hers: items in both, items only she found, items only Dara produced. | Swati's recorded list, Dara's output, and the comparison table. | The reference is authored by a person before seeing the agent's output. It's the capability's own R5 criterion (`curriculum.json:1937`). |
| C-E2 | For every patch applied during the window, the applier is a named human. Patches applied by an agent identity: zero. | An apply/decline record. **It doesn't exist yet**: "the engine has no record of which past recommendations were applied or declined" (`curriculum.json:1921`). That record has to be built before C-E2 can be shown. | It's a record of human decisions, not of the agent's output. |
| C-E3 | On a sample Swati picks, each recommendation's `why` traces to a real validation check or coverage gap id, and none claims a measured improvement in learning. | The sample, with the check or gap id written next to each item. | It's a human spot-check. Severity and rank are "rule-derived weights, not measured impact" (`:1868`). |
| C-E4 | An attempt to call `POST /api/admin/composer/blueprints/:id/apply-videos` or `/publish` with Dara's identity is refused. | Request log showing a 403. | Dara's role is `ai_staff` (`backend/src/services/curriculum/daraIdentitySeed.ts:99`). `requireAdmin` admits only `admin` and `super_admin` (`backend/src/middlewares/authMiddleware.ts:55`, `:68-70`). Today that's true only because of the role. No test asserts it. |

**Not evidence for Task C:**
- The deterministic engine test passing (`backend/src/services/composer/__tests__/composerEngines.test.ts:91`). It runs on fixtures.
- Swati saying the recommendations "look good".
- Any number of recommendations produced.
- A patch being applied, if no named person applied it.

### 5.2 The task

Dara runs the existing optimization engine over a week plan. The engine turns validation gaps, evidence shortfalls, dependency issues and coverage gaps into a ranked list. Each item has an area, a severity, a `why`, and a patch a human can apply. Then Dara stops, and a human applies or declines each one.

The workflow is in `curriculum.json:1857-1863`. The code is `backend/src/services/composer/optimizationEngine.ts:1-6`, `:26-27`. It is deterministic. "The LLM layer can add nuance later" (`:5`), and the capability forbids that layer from ever setting severity or rank (`curriculum.json:1865`).

### 5.3 Tools and data it needs

- **Tools** (`curriculum.json:1886-1891`): `read_curriculum_blueprints`, `run_validation_gate`, `propose_curriculum_patch`, `emit_structured_log`.
- **Data** (`:1848-1852`): the validated plan and its check results, the evidence estimate, dependency issues, and the coverage gap list.
- **A blocker:** no agent identity reaches the Composer today, because every Composer route is `requireAdmin` (`backend/src/routes/admin/composerRoutes.ts:15-30`; `curriculum.json:1919`). Dara has **no working read path** to this engine. Granting one is a tool grant, and this story doesn't do that.

### 5.4 Boundary: what Dara must NOT do

- Must not apply, accept or decline a patch, in production or anywhere a student can see it. In production the agent may "generate recommendations only; never apply a patch" (`curriculum.json:1905-1907`).
- Must not publish a week plan, or call `apply-videos` or `publish`.
- Must not set or change severity or rank with a model. They come from the deterministic rules only (`:1865`).
- Must not say a recommendation will improve learning outcomes. No measured link exists (`:1920`).
- Must not describe a structurally passing patch as pedagogically right (`:1867`).
- Must not treat a declined recommendation as an error to retry.

### 5.5 Approval

- **Approver: Swati Raman** (`curriculum.json:1830`, `:1847`). She approves the scope and each rung, and she (or a staff member she names) makes **every** apply or decline decision. This is permanent, because `human_decision` is `true` (`:1912`).
- Who on the curriculum staff may apply a patch besides Swati is **unknown**. `04-manager-interview.md` doesn't ask it directly (Q4 asks what stays human), so it should be added to the first weekly check-in.

### 5.6 Autonomy: start `autonomy:R0`, ceiling `autonomy:R5`

- **Why it's capped at R5:**
  - A recommendation is about what a student is taught, so the decision belongs to a human at every level.
  - `effectiveAuthority()` enforces this in code. A `human_decision` capability is capped at `autonomy:R5` whatever level is approved (`autonomyLadder.ts:213-220`; `curriculum.json:1915`).
- **What R5 means here:** shadow only. Dara's list runs beside the reviewer's own, and nothing she produces changes the curriculum.
- **Why R2 first:** with no tool grants, the code holds a capability at R2 (`autonomyLadder.ts:207-211`). Dara has no read path to the Composer (§5.3). So "explain a recommendation from its check" (`curriculum.json:1931-1932`) is the first rung she can actually reach.

### 5.7 Switch it off if

- Any patch is applied, accepted or declined by an agent identity (C-E2 fails).
- C-E4 fails, meaning Dara's identity is ever admitted to an `apply-videos` or `publish` route.
- A model, not the deterministic rules, changes severity or rank.
- A recommendation claims a learning-outcome improvement, or its `why` traces to no real check or gap (C-E3 fails).
- In the shadow comparison, Dara misses high-severity items Swati found. The miss rate that should trigger this is **unknown**. Swati sets it before C-E1 starts. It isn't chosen after the results are in.

**How to switch it off:** today there is nothing to switch, because Dara has no path to the engine. If a read grant is added later, removing that grant switches the task off. Dara's `enabled` flag only covers the paths that check it (§3.7, §4.7).

---

## 6. What all three share

| Blocker | Source | Effect on these tasks |
|---|---|---|
| No capability has an approved level | `autonomyLadder.ts:188-191`; `curriculum.json:358`, `:741`, `:1910` | All three start at `autonomy:R0` and stay there until Swati approves a rung. |
| Swati hasn't confirmed any requirement | `curriculum.json:748-749`, `:1917-1918` | Every scope, boundary and ceiling above is a draft for her to correct. |
| No approval has ever been decided by a person | `APPROVAL_DROP_QUEUE_2026-10-06.md:92-95` | Each task's evidence has to name a human decider, or it doesn't count. |
| Authorization is in shadow mode by default | `agentAuthorizationService.ts:6`, `:39-46` | Task B's approval gate doesn't block anything today. Task B can't reach R6 until that changes. |
| Swati reaches Dara's page only through a full admin account | `04-manager-interview.md` §2; `mgmtSectionGate.ts:248` | She can review this evidence today, but only through a side door. That needs fixing before it's relied on. |

## 7. What Swati needs to decide

1. Whether these are the right three, or which to swap. Her answer to Q2 in `04-manager-interview.md` picks which capability moves first, and it may replace one of these.
2. For each task, whether the "first rung" in §1 is the right one to aim for.
3. For Task A: whether the scan should ever run on a schedule, and who reads the findings.
4. For Task B: whether an escalation-only off switch should exist, separate from switching off all of Dara's DMs.
5. For Task C: who may apply a patch, which weeks go in the shadow set, and the miss rate that switches it off.

Until she answers, every field above that depends on her stays **unknown**, and every capability stays `draft`.

## Sources

All paths are in the platform repository at `a284987` unless marked as this repository.

- `backend/src/services/agentDomain/capabilities/curriculum.json`: entries at `:275-392` (A), `:649-772` (B), `:1826-1940` (C).
- `backend/src/services/agentDomain/autonomyLadder.ts`: `:58-69` meanings; `:185-223` `effectiveAuthority()`.
- `backend/src/services/agents/curriculumQAAgent.ts`; `backend/src/services/agents/__tests__/curriculumQAAgent.test.ts:48-156`.
- `backend/src/services/curriculum/daraHandoffService.ts:7-30`; `daraTools.ts:25-27`, `:76`, `:98`, `:112`; `daraReplyService.ts:100-105`; `daraIdentitySeed.ts:99`.
- `backend/src/services/curriculum/__tests__/daraHandoffService.test.ts`; `daraTools.test.ts`.
- `backend/src/services/composer/optimizationEngine.ts:1-27`; `backend/src/services/composer/__tests__/composerEngines.test.ts:91`.
- `backend/src/routes/admin/composerRoutes.ts:15-30`; `backend/src/middlewares/authMiddleware.ts:55-70`.
- `backend/src/services/agentAuthorizationService.ts:1-12`, `:37-46`.
- `backend/src/services/workforce/workforceAgentRuntime.ts:69-71`.
- `docs/architecture/ai-workforce-management/APPROVAL_DROP_QUEUE_2026-10-06.md:90-95`.
- `docs/architecture/ai-workforce-management/employees/curriculum/COVERAGE_CONTRACT.md:42-44`.
- This repository: `docs/discovery/03-role-and-da-transition.md`, `docs/discovery/04-manager-interview.md`.

### Citation drift found while writing

| Cited in `curriculum.json` | Actual at `a284987` |
|---|---|
| `autonomyLadder.ts:141-144` for `no_approved_autonomy` (`:365`, `:748`, `:1917`) | `autonomyLadder.ts:188-191` |
| `autonomyLadder.ts:169-173` for the human_decision cap (in `student_curriculum_dm_support`) | `autonomyLadder.ts:213-220` |
| `agentRegistrySeed.ts:1058` for the unscheduled cron (`:367`) | `agentRegistrySeed.ts:1060-1065`. Line 1058 is the end of the previous row. |
| `agentAuthorizationService.ts:149-150` for shadow-mode default (`:750`) | `agentAuthorizationService.ts:6`, `:39-46`. Lines 149-150 are now a comment about `autonomy_level_set_at`. |

I recorded the drift and didn't correct it. The platform repository is read-only for this work.
