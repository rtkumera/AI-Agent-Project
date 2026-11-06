# Swati Raman's role, and which Data Analyst responsibilities transition

**Story:** `curriculum.RESEARCH-3-ROLE-AND-DA-TRANSITION` · **Domain:** Curriculum, Learning & Certification (Dara)
**Accountable human:** Swati Raman · **Written for:** Swati Raman, to review
**Researched:** 2026-11-05 against the platform repository
[ColaberryEnterprise_AI_LeadershipAccelerator](https://github.com/ColaberryIntern/ColaberryEnterprise_AI_LeadershipAccelerator) at commit `a284987`.
Every platform path below is in that repository. Every claim carries a `file:line` source or the word **unknown**.

**Status: draft.** Nothing here has been reviewed or agreed by Swati. Every row in the capability matrix this document reads is `draft` (`backend/src/services/agentDomain/capabilities/curriculum.json`, `requirement_validation_state` on all 38 rows), and no capability has an approved autonomy level: `effectiveAuthority()` returns `null` with reason `no_approved_autonomy` (`backend/src/services/agentDomain/autonomyLadder.ts:188-191`).

---

## The answer in short

| Question | Answer | Source |
|---|---|---|
| Who is accountable for this domain? | **Swati Raman**, `swati@colaberry.com`, team Operations | `docs/architecture/ai-workforce-management/employees/curriculum/ACCOUNTABILITY_v1.md:7`; confirmed by Ali 2026-09-15 at `MANAGER_ACCESS_PLAN.md:3` |
| What Data Analyst duties exist in this domain? | **Unknown. The source does not exist.** No document in either repository lists them; see the search record below. | §1 |
| Is a Data Analyst assigned to curriculum? | **Unknown.** No record names one. | `curriculum.json:4113`, `:4147`, `:4180` |
| Which DA duties transition to AI? | **None can be named honestly** until the duty list is written. The DA capability is held at ceiling `autonomy:R0` for exactly this reason. | `curriculum.json:4109-4185` |
| What *can* be classified today? | The 38 capabilities the matrix proposes for Dara: **18 transition to AI**, **19 split** (Dara prepares, Swati decides), **1 stays human** (the DA duty list itself). All 38 are proposals, not agreements. | §3–§5 |

Two things are kept apart on purpose. **Swati's role** and **Dara's proposed capabilities** are sourced, so they can be classified. **The Data Analyst's duties** are not sourced, so they cannot be, and §6 outlines the document that would have to be written first.

---

## 1. What was searched, and what was found

This search was run on 2026-11-05. It backs the brief's warning with evidence instead of repeating it.

| # | What was searched | Where | Result |
|---|---|---|---|
| 1 | `data analyst`, case-insensitive | Whole platform repo, excluding `node_modules` and `.git` | **40 files.** None is a duty list. They fall into the groups below. |
| 1a | — the domain capability files | `backend/src/services/agentDomain/capabilities/*.json` (10 files) | Each *proposes* a DA-transition capability or mentions DA as context. The curriculum one says outright the list does not exist (`curriculum.json:4116`, `:4139`). |
| 1b | — the "Data Analyst Agent" | `backend/src/intelligence/assistant/agents/dataAnalystAgent.ts:1-5`; `docs/agent-catalog/assistant/data-analyst-agent.md:1-5` | An unrelated, deterministic SQL-label helper with no LLM call and no reporting duties. **It is not the Data Analyst role.** |
| 1c | — course teaching content | e.g. `backend/src/data/weeks/week2.ts:227`, `backend/src/data/architectMindsetScenario.ts:299`, `docs/architect-mindset/02-curriculum-specification.md:328` | "Data analyst" appears as a persona *taught to students* (a stakeholder in a scenario), not as a Colaberry employee. |
| 1d | — sales, marketing and bid material | e.g. `backend/src/scripts/sendMiladInterviewPrep.js:98`, `gov-bid-builds/*/requirements.md`, `frontend/public/knowledge/design/templates/*` | Career advice, brochure copy and external bids. Not duties. |
| 1e | — prompt and story templates | `backend/src/services/agentDomain/agentDomainStoryTemplates.ts:166`, `agentDomainResearchPrompts.ts` | The text of *this* story's prompt. Not a source. |
| 2 | `data analyst`, `DA`, `duties`, `duty list` | `docs/architecture/ai-workforce-management/` (**36 files**) | **Zero** DA hits. The only match is the word "duties" about a cron job (`SUPERVISOR_HEALTH_AUDIT_2026-10-06.md:201`). |
| 3 | the same terms | `docs/architecture/ai-workforce-management/employees/curriculum/` (10 files: charter, accountability, coverage contract, discovery, risk register, and others) | **Zero** hits. |
| 4 | `scope amendment` (the document the brief says DA work comes from) | Whole platform repo | Only the capability JSONs mention it, and the curriculum one says it is **"not in the repository and was not attached"** (`curriculum.json:4179`). The cited `.loop-architect/runs/20261007-school-agent-factory/execution-contract.md` **does not exist in the clone** (the `.loop-architect/` directory is absent). |
| 5 | the persona label the brief cites | `docs/admin-knowledge-ops-mockup.html:884` | "DA Admissions" is a label on **Roselen Cruz** in an admin mockup. It belongs to admissions, not curriculum, and it is a label, not a list of responsibilities. |
| 6 | the reporting substrate | `docs/architecture/ai-workforce-management/REPORTING_MAP.md:15` | **Confirmed absent:** there is no object that combines what to report, who receives it, how often, in which timezone and over which channel. So no existing report definition could stand in for a duty list. |
| 7 | `data analyst` in this project repo | `rtkumera/AI-Agent-Project`, excluding the zip | Only the story briefs and `plan.json` restating the absence, plus `curriculum.json`, which is byte-identical to the platform copy. |
| 8 | the DA capability in **other** domains | `capabilities/{admissions,executive,internship,learner_success,sales}.json` | Each proposes its own DA transition, and each states the duty list or role document is missing (e.g. `learner_success`, `sales`: "the duty list itself does not exist in the repository"). This matches the brief: **no domain** has one. |

**Conclusion:** the Data Analyst duty list for curriculum is **absent**, and so is the source the plan names for DA work (the scope amendment). The absence is evidenced by searches 1–8, not assumed.

---

## 2. Swati Raman's role, as the repository records it

These are the only sourced statements about what Swati does. Most are **labels in scripts**. Whether they still describe her job, and how she actually spends her week, is **unknown**. That is a question for the interview in `curriculum.RESEARCH-4-MANAGER-INTERVIEW`, and it is not answered here.

| What | Recorded value | Source | Confidence |
|---|---|---|---|
| Accountable human for Dara | Swati Raman; `org_members.id 5db87b51-…`; team Operations | `employees/curriculum/ACCOUNTABILITY_v1.md:7`; `backend/src/scripts/assignOrgDepartments20260819.ts:107` | Sourced, confirmed by Ali (`MANAGER_ACCESS_PLAN.md:3`) |
| Role label | "Curriculum + Compliance" | `backend/src/scripts/lib/launchPmoTeam.js:46` | Label only |
| Her "hats" | Curriculum review · Documentation · TWC registration · Compliance · Approval workflows | `launchPmoTeam.js:47` | Label only |
| Role label and domain | "Curriculum Lead + TWC Compliance"; "Curriculum review & design, TWC registration + compliance, training intensive design" | `backend/src/scripts/generateAiArchitectRubricsSpreadsheet.js:183-184` | Label only |
| Systems she uses | Basecamp, Skilljar (Anthropic courses), CCPP, TWC documentation, Gmail | `generateAiArchitectRubricsSpreadsheet.js:185` | Label only |
| Targets attached to her in that script | TWC compliance "Green"; 3+ curriculum modules per sprint; curriculum NPS 70+; instructor utilisation 80%+; AI Architect curriculum 100% by 2026-07-10 | `generateAiArchitectRubricsSpreadsheet.js:187-191` | **Whether these are her agreed KPIs is unknown.** They are inputs to a rubric spreadsheet generator. |
| A decision she owns in practice | Policy owner for replacing curriculum videos. No replacement is uploaded before she approves it. | `directives/govern-curriculum-video-sources.md:3`, `:8`, `:36-37`, `:61` | Sourced decision, dated 2026-08-24 |
| Authority over Dara's charter | Charter, KPIs and memory changes are manager-authored only (Swati or Ali) | `employees/curriculum/ROLE_CHARTER_v1.md:52` | Sourced |
| Where Dara escalates to | Swati, directly | `ACCOUNTABILITY_v1.md:26-28` | Designed. The email channel is unbuilt (`curriculum.json` capability `escalation_reaches_a_named_human`). |
| Can she log in to manage Dara? | **Conflicting records.** The 2026-09-15 docs say she had no `admin_users` row (`ACCOUNTABILITY_v1.md:15`; `RISK_REGISTER.md:10`). The matrix researched 2026-10-09 cites one: "Swati's admin_users row 8a067218-…, role admin" (`curriculum.json:3544`). Production today: **unknown**. | — | Unresolved |
| What "TWC" stands for, and what TWC compliance involves day to day | **Unknown.** No source in either repository expands it. | — | — |

---

## 3. How each responsibility is classified

There's no DA duty list, so the responsibilities classified here are the 38 capabilities the matrix proposes for Dara (`curriculum.json`, `capabilities[]`). Each one already carries two facts that decide its column:

- **`human_decision`.** When it is `true`, the decision "stays human-required at every autonomy level, forever", and `effectiveAuthority()` caps the capability at `autonomy:R5` (`autonomyLadder.ts:214-218`).
- **`permissions_by_environment.production`.** This lists what the human does and what the agent does, which is where the line falls.

| Column | Rule used | Count |
|---|---|---|
| **Transitions to AI** | `human_decision: false`. Dara may do the work itself, up to its ceiling, once Swati approves a level. | **18** |
| **Splits** | `human_decision: true`. Dara prepares, drafts or proposes; Swati decides. | **19** |
| **Stays human** | Nothing on the agent side at all. | **1** (`da_curriculum_analytics_transition`) |

In all three columns the agent side is a **proposal**. Today Dara holds **no approved level for anything** (`autonomyLadder.ts:188-191`). Each "Evidence it is ready" cell below quotes the matrix's own acceptance criterion for the named rung (`release_behaviour[]`). An evidence line counts only when it is a named passing test, a measured figure with its query, or a file:line, and Swati is the one who evaluates it.

---

## 4. Responsibilities proposed to transition to AI (18)

"Ceiling" is the highest rung the matrix permits. It is not a level Dara holds.

| # | Responsibility (capability) | Ceiling | Why it can transition | Evidence that would show Dara is ready |
|---|---|---|---|---|
| 1 | Daily curriculum-quality gap flag (`daily_curriculum_gap_flagging`) | R6 | Internal queue write that a human acts on; not learner-facing | R2: every flag's *why* traces to a threshold and a cited number. R6: Swati signs the pilot scope, and a rollback condition is written before it starts. |
| 2 | Daily cohort certification-readiness flag (`daily_certification_readiness_flagging`) | R6 | Internal flag, no credential effect | R2: every explanation cites persisted components. R6: written scope, named approver, rollback condition. |
| 3 | Read-only curriculum integrity scan (`curriculum_integrity_scan`) | R7 | Read-only; a test asserts zero tickets | R4: two runs over an unchanged tree return identical findings. R7: Swati authorises the action class by name, in writing. |
| 4 | Video-link health monitoring (`video_link_health_monitoring`) | R6 | Detection is read-only. *Replacing* a video is excluded and stays with Swati. | R1: a fixture test for every classification branch. R6: Swati approves the recipient list before any alert fires. |
| 5 | Out-of-scope escalation handoff (`out_of_scope_escalation_handoff`) | R6 | Routes a question; does not decide what is taught | R3: a replayed tool call makes exactly one ticket. R6: ABAC set to enforce, and a named human (not a timeout) decides a real request. |
| 6 | Per-student certification-risk sweep (`targeted_certification_risk_research_sweep`) | R6 | Writes internal tasks; never contacts a student | R4: a re-run on unchanged data flags zero extra students. R6: Swati approves cohort and cap before the sweep runs. |
| 7 | Work gateway into Swati's Basecamp (`manager_work_gateway_to_basecamp`) | R5 | Internal todo, but under a shared credential that misattributes authorship | R3: a replayed write makes one todo. R5: measured against her posted items, **and** the credential question answered first. |
| 8 | Manager conversation briefing (`manager_conversation_briefing`) | R7 | Answers Swati's own questions; no side effect | R2: every answer cites a record or says UNMEASURED. R7: Swati authorises by name. |
| 9 | Presence/reachability signal (`presence_availability_signal`) | R7 | Writes only Dara's own row | R7: authorised by name, and a gap in the signal raises a real alert. |
| 10 | Pre-publish validation gate (`pre_publish_validation_gate_audit`) | R7 | Pure, deterministic check. *Publishing over a warning* stays with Swati. | R2: every explanation quotes a real check. R7: a test asserts Dara holds no publish path. |
| 11 | Competency coverage gap detection (`competency_coverage_gap_detection`) | R7 | Read-only detection. *Filling* a gap stays with Swati. | R2: an unresolvable id is never reported as covered. R7: a self-test injects an uncovered competency and the detector reports it. |
| 12 | Prep-item rubric review and improvement drafts (`certification_item_rubric_review_and_improvem`) | R7 | Scores and drafts; persists nothing | R2: no model verdict presented as verification. R7: a test asserts no approval path and no model import. |
| 13 | Bank-level answer-key audit (`certification_bank_level_distribution_audit`) | R7 | Read-only audit | R2: cites the best-one-letter score and threshold. R7: a mutation test injects a skewed key and the audit reports it. |
| 14 | Cohort readiness reporting (`cohort_certification_readiness_reporting`) | R7 | Computation over existing records | R2: `not_measured` is never rendered as a low score. R7: a test asserts no write path to student records. |
| 15 | Week teaching-content integrity audit (`week_teaching_content_integrity_audit`) | R7 | Read-only inventory | R2: an unestablished source is answered "unknown". R7: a self-test removes one artifact and the audit reports it missing. |
| 16 | LLM-generated card governance audit (`generated_card_content_governance_audit`) | R7 | Reads call sites and events | R2: unattributed spend reported as unattributed. R7: the count of identity-less paths is grep-verifiable. |
| 17 | Escalation reaches a named human (`escalation_reaches_a_named_human`) | R6 | Delivers a finding; not a teaching decision | R3: one notification per replayed delivery. R6: Swati acknowledges a real delivery in her own words. |
| 18 | Curriculum LLM cost attribution (`llm_cost_attribution_integrity`) | R7 | Read-and-report only | R2: a real zero is never conflated with unattributed. R7: the unattributed call-site count is grep-verifiable. |

Every row also starts with an R0 criterion that only Swati can satisfy: she states the scope, recipients or thresholds in her own words. For example, row 1's R0 criterion is "Swati can state, unprompted, what makes a day produce a flag and what makes it produce nothing." No row can move past R0 until she has done that.

---

## 5. Responsibilities that split (19): where the line falls

In each split, **Dara holds the left side and Swati holds the right side.** The line is quoted from the matrix's production permissions. "Ceiling" applies to Dara's side only, because Swati's side is never automated.

| # | Responsibility (capability) | Dara's side | Swati's side | Ceiling | Evidence that Dara's side is ready |
|---|---|---|---|---|---|
| 1 | Student DM support on curriculum (`student_curriculum_dm_support`) | Reply in a student room under Dara's identity | Read transcripts; take over a thread | R5 | R2: on a human-authored adversarial set, zero out-of-scope answers. R5: measured against a human reviewer's sent answers. **Note:** this already runs unsupervised in production, which the matrix records as a finding, not a justification. |
| 2 | Strategy initiative proposals (`strategy_initiative_proposal`) | Draft proposals with evidence (none today; deferred) | Adopt or decline | R2 | R2: zero initiatives created; every answer cites a real health signal. |
| 3 | Module and lesson drafting (`module_and_artifact_drafting_for_human_approv`) | Draft (none today; tools deferred) | Approve or reject; publishing stays human | R4 | R1: a forced mid-draft failure leaves no partial row. R4: the same request gives the same end state, never published. |
| 4 | Week blueprint authoring and scoring (`week_blueprint_authoring_and_quality_scoring`) | Propose blueprint edits | Author and approve the blueprint | R4 | R1: score maths pinned by tests. R4: status never advances past draft without a human. |
| 5 | Improvement recommendations (`curriculum_improvement_recommendations`) | Generate recommendations; never apply | Apply or decline a patch | R5 | R5: measured against her review list; Dara applies nothing. |
| 6 | Publishing a week to the live timeline (`blueprint_publish_to_live_timeline`) | Prepare the publish packet only | **Approve and publish** | R5 | R1: a test proves the gate blocks a failing plan. R5: a test asserts Dara has no publish path. |
| 7 | Curriculum type draft authoring (`curriculum_type_draft_authoring`) | Author drafts; never approve | Approval stays separate | R4 | R4: re-running is a no-op; `approved` stays false. |
| 8 | Curriculum type approval and promotion (`curriculum_type_approval_and_promotion`) | Prepare the promotion diff | **Approve and promote** | R5 | R5: a test asserts Dara holds no approval or promotion path. |
| 9 | Prep-item status transitions (`certification_item_review_status_transition`) | Recommend only | **Set the status** | R2 | R2: zero status writes by Dara, asserted by a test. |
| 10 | External certificate claim triage (`external_certificate_claim_triage`) | Summarise the claim | **Approve or reject** | R4 | R4: same summary on re-run; Dara writes no status, asserted by a test. |
| 11 | Build-evidence mapping to CCAR-F (`certification_evidence_mapping_review`) | Propose candidate mappings | **Verify or reject** | R5 | R3: no duplicate on replay. R5: measured on her verify/reject record. |
| 12 | Video curation for a coverage gap (`coverage_gap_video_curation_proposal`) | Curate candidates; never apply | **Apply the video** (matches her 2026-08-24 directive) | R5 | R3: candidates for every gap, or "unmatched"; zero cards created. |
| 13 | Charter and KPI stewardship (`charter_and_kpi_stewardship`) | Report against the KPIs | **Author and approve charter and KPIs** | R2 | R2: Dara writes no charter, goal or memory row, asserted by a test. |
| 14 | Manager access and decision queue (`manager_access_and_decision_queue_integrity`) | Report access state | Open the agent page and decide | R2 | R2: never claims access that has not been evidenced. |
| 15 | Scope and deferral enforcement (`coverage_scope_and_deferral_enforcement`) | Report scope state | **Approve a scope change** | R2 | R2: every answer cites the contract row; out-of-scope proposals refused. |
| 16 | Autonomy and promotion record (`autonomy_and_promotion_record_for_this_domain`) | Report the record | **Approve a level per capability** | R2 | R0: Swati signs each capability's scope, ceiling and human-decision flag. |
| 17 | CCAR-F drift tracking (`ccarf_prep_alignment_drift_tracking`) | Report drift | **Approve any blueprint/weight change** | R2 | R2: every difference cites both sides; unverified weights reported as unverified. |
| 18 | Learner-outcome feedback loop (`learner_outcome_to_curriculum_feedback_loop`) | Report findings | Decide whether a finding changes the curriculum | R4 | R4: every finding carries its sample size; below-minimum findings are suppressed and logged. |
| 19 | Change impact on live cohorts (`curriculum_change_impact_on_live_cohorts`) | Build the impact assessment | **Decide whether to proceed** | R5 | R2: no "no impact" answer for an untraceable dependency. R5: measured against her judgement on real changes. |

Source for every row: `curriculum.json`, the capability's `permissions_by_environment.production`, `max_permitted_autonomy`, `max_autonomy_rationale` and `release_behaviour`.

---

## 6. Responsibilities that stay human, and why

These are kept separate from the splits on purpose. Nothing below transitions at any rung.

| Responsibility | Why it is reserved | Source |
|---|---|---|
| **Writing the Data Analyst duty list** for curriculum | An autonomy ceiling over an undefined scope "would be a fabrication". This capability's ceiling is `autonomy:R0` and its whole job is a human interview. | `curriculum.json:4109-4185` (capability `da_curriculum_analytics_transition`) |
| Every decision on Swati's side of the 19 splits in §5 (publish, approve, promote, set status, apply, verify, adopt) | Each one decides what a student is taught or what lands on a student's record. `human_decision: true` keeps it human at every level. | `autonomyLadder.ts:214-218`; each row's `max_autonomy_rationale` |
| Approving Dara's autonomy level, `reports_to` and risk tier | An agent must never set or raise its own authority | `ROLE_CHARTER_v1.md:56` (boundary 8) |
| Approving Dara's charter, KPIs and memory | Manager-authored only (Swati or Ali) | `ROLE_CHARTER_v1.md:52` (boundary 4) |
| Widening Dara's scope, or absorbing a deferred item | Each item needs its own coverage decision; adjacency never implies inclusion | `ROLE_CHARTER_v1.md:53` (boundary 5) |
| Approving a replacement curriculum video | Swati's explicit 2026-08-24 decision: no replacement before she reviews it | `directives/govern-curriculum-video-sources.md:36-37`, `:61` |
| **TWC registration and compliance** | No capability covers it: `curriculum.json` contains zero mentions of TWC. It stays human because nothing proposes otherwise. Whether it *should* ever transition is **unknown**. | `launchPmoTeam.js:47`; search of `curriculum.json` |
| **Training intensive design** | No capability covers it: zero mentions in `curriculum.json`. It stays human by default. Whether it should transition is **unknown**. | `generateAiArchitectRubricsSpreadsheet.js:184` |

---

## 7. The document that would have to be written

The missing source is a **Curriculum Data Analyst duty register**. Until it exists, the DA part of this story can't be answered, and the capability at `curriculum.json:4109` stays at R0 with every field unknown.

**Who writes it.** The Data Analyst for curriculum, if one exists, writes it with Swati. Whether a DA is assigned at all is **unknown** (`curriculum.json:4147`). Ali Muwwakkil, as DRI, would have to confirm that first. Swati signs it. It comes from a human interview, never from a job title.

**Outline**

1. **Who.** The name of the Data Analyst (or "none assigned"), their reporting line, and the share of their time spent on curriculum and certification.
2. **The register.** One row per recurring report or analysis, with:
   - its name and what question it answers;
   - its data source (table, system or export);
   - its recipient (a named person);
   - its cadence and **timezone** (no per-user timezone exists in the platform today: `REPORTING_MAP.md:24`);
   - its channel (email is the only wired channel: `REPORTING_MAP.md:19-20`);
   - who produces it today, and how long it takes;
   - the decision it feeds, and what breaks if it is late or wrong.
3. **Ad-hoc requests.** Who asks, how often, and an example of each.
4. **Classification.** Each row marked stays human / transitions / splits, with the reason and, for a split, the exact line.
5. **Readiness evidence.** For each row that moves, the test or measured comparison that would show Dara can hold it.
6. **Sign-off.** Swati's name and the date. Until then, every row is draft.

**What it unblocks.** The DA capability can be scoped and given a ceiling above R0, and RESEARCH-5 can draw a proposed task from real duties instead of guessed ones.

---

## 8. Citation drift found while checking the brief

| The brief or matrix cites | Actual at `a284987` |
|---|---|
| `autonomyLadder.ts:141-144` for `no_approved_autonomy` | `autonomyLadder.ts:188-191` (function starts at `:185`) |
| `autonomyLadder.ts:169-173` for the human-decision R5 cap | `autonomyLadder.ts:214-218` |
| `docs/admin-knowledge-ops-mockup.html:883` | The "DA Admissions" label is at `:884` |
| "the 34 files of `docs/architecture/ai-workforce-management`" | **36** files today |
| `.loop-architect/runs/20261007-school-agent-factory/execution-contract.md:45` and `capabilities/sales.json:3770` | **Not in the repository.** The `.loop-architect/` directory is absent, so these can't be checked. The internship matrix cites the same contract at `:47` instead. |

---

## 9. Not done here, on purpose

- No message was sent and no interview was arranged. Arranging one is a human action, and it is planned in RESEARCH-4.
- No agent was enabled, no tool was granted and no autonomy level was raised. All 38 capabilities remain `draft`.
- No DA duty was inferred from the title "Data Analyst".
