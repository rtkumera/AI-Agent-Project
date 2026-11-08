# Legacy migration plan: Curriculum, Learning & Certification (Dara)

**Story:** `curriculum.LEGACY-MIGRATION-PLAN` · **Release:** r1 · **Accountable human:** Swati Raman · **DRI:** Ali Muwwakkil
**Status:** a plan for Swati to review. Nothing in it has been run. No agent row was changed, enabled, disabled or archived, and no capability left `draft`.
**Platform source:** [ColaberryEnterprise_AI_LeadershipAccelerator](https://github.com/ColaberryIntern/ColaberryEnterprise_AI_LeadershipAccelerator) at commit `a284987`. All `backend/…` and `docs/architecture/…` paths are in that repository. The disposition itself comes from `backend/src/services/agentDomain/capabilities/curriculum.json:4558-4623` (`legacy_dispositions`).

---

## 1. Answer in short

The brief gives Dara's domain **8 inherited legacy records**: 6 migrated to a capability and 2 retired. The count matches the source classification file (`docs/architecture/ai-workforce-management/LEGACY_AGENT_CLASSIFICATION.csv:30-37`). In code today, they sit in three different states:

| State in code at `a284987` | Records | What's left |
|---|---|---|
| **Merged into Dara: done** | WorkforceCurriculumDirector, WorkforceCertificationDirector, CurriculumQAAgent | One leftover: CurriculumQAAgent's registry row still claims a cron (§5, W3). |
| **Merged into Dara: planned, waiting on preconditions** | LearningInnovationArchitect, CurriculumArchitectAgent, ArtifactGenerationAgent | Each waits on preconditions that are written down but not met (`COVERAGE_CONTRACT.md:20-22`). |
| **Retired: planned, not performed** | CurriculumOptimizerAgent, EducationReportingAgent | No code archives either row (§5, W4). One of them was still `enabled: yes` in production at the last recorded read (`BASELINE_2026-09-15.md:15`). |

**What I think the brief gets wrong** (details in §5):
- The brief's list of 8 leaves out four nightly jobs that the domain's own plan says Dara owns. One of them emails Ali, and none of them has an off switch.
- Rebuilding the agent table from scratch would switch three of these 8 rows **on**, so the migration isn't replayable yet.
- One of the reasons given for a retirement doesn't hold in the current code.

**What has to happen first:** Swati confirms the two retirements, and someone with production access reports the actual state of four rows (§3, §7). Everything else in §7 waits on those two steps.

---

## 2. Disposition table: every inherited record

"Kept / merged / retired" uses the acceptance criterion's words. "Successor" is the capability that takes over the record's job.

| # | Legacy record | Kind in the CSV | Kept / merged / retired | Successor capability | Done in code? | Reason, with evidence |
|---|---|---|---|---|---|---|
| 1 | `WorkforceCurriculumDirector` | behavior | **Merged** (absorbed) | `curriculum.daily_curriculum_gap_flagging` | **Yes** | It's listed in `ABSORBED_BEHAVIOR_NAMES` (`backend/src/services/curriculum/repointLegacyBehaviors.ts:32`). Its daily 06:10 job now runs as `agentName: 'Dara'` (`backend/src/services/aiOpsScheduler.ts:367`). The row is kept, not renamed, and is now only a historical and audit record (`ROLE_CHARTER_v1.md:54`). |
| 2 | `WorkforceCertificationDirector` | behavior | **Merged** (absorbed) | `curriculum.daily_certification_readiness_flagging` | **Yes** | Same treatment (`repointLegacyBehaviors.ts:33`). Its 06:30 job runs as Dara (`aiOpsScheduler.ts:369`). It reports readiness for the certification and awards nothing. |
| 3 | `CurriculumQAAgent` | tool | **Merged** as a tool | `curriculum.curriculum_integrity_scan`, as the tool `scan_curriculum_integrity` | **Mostly** | Absorbed as a tool (`repointLegacyBehaviors.ts:42`). Its ticket writing was removed, and a test asserts it opens zero tickets (`backend/src/services/agents/__tests__/curriculumQAAgent.test.ts:134`). **Not done:** the contract says its registry row should become `on_demand` (`COVERAGE_CONTRACT.md:13`), but the row still says `trigger_type: 'cron'` (`agentRegistrySeed.ts:1064-1065`). |
| 4 | `LearningInnovationArchitect` | behavior | **Kept for now; merge later** | `curriculum.strategy_initiative_proposal` (ceiling `autonomy:R2`) | **No** | Deferred until three conditions are met (`COVERAGE_CONTRACT.md:20`). It is not in the absorbed list (`repointLegacyBehaviors.ts:31-36`) and still runs on its own every 6 hours (`aiOpsScheduler.ts:323`). Production showed it disabled since late August (`BASELINE_2026-09-15.md:9`). Its record: 175 tickets created, all cancelled; 175 initiatives, none ever moved past `planned` (`BASELINE_2026-09-15.md:35-36`). |
| 5 | `CurriculumArchitectAgent` | tool | **Kept for now; merge later** as a tool | `curriculum.module_and_artifact_drafting_for_human_approval`, as the tool `design_curriculum_module` | **No** | Deferred until three conditions are met: the half-finished-write bug fixed, a real agent id on its AI calls, and a replacement for its dead ticket loop (`COVERAGE_CONTRACT.md:21`). It is also the **catch-all handler for any curriculum ticket** (`backend/src/services/workGraph/capabilityRegistry.ts:107-112`, allowed up to risk tier `R4`). |
| 6 | `ArtifactGenerationAgent` | tool | **Kept for now; merge later** as a tool | Same drafting capability, as the tool `generate_lesson_artifact` | **No** | Same conditions. Only CurriculumArchitectAgent feeds it, so it moves together with #5 (`COVERAGE_CONTRACT.md:22`). |
| 7 | `CurriculumOptimizerAgent` | retire | **Retired** (archive, don't delete) | None. Its intent is restated as the new `curriculum.learner_outcome_to_curriculum_feedback_loop`, which starts from zero. | **No** | Nothing imports it, and no scheduler runs it. Its run function is referenced only in its own file (`backend/src/services/agents/curriculumOptimizerAgent.ts:18`). The contract says "retire" (`COVERAGE_CONTRACT.md:31`, `:34`), but no code does it (§5, W4). |
| 8 | `EducationReportingAgent` | retire | **Retired** (archive, don't delete) | None. Reporting is covered by `curriculum.cohort_certification_readiness_reporting`; neither successor inherits this row. | **No** | Nothing loads it, and no scheduler runs it (`backend/src/services/agentRegistryAuditClassification.ts:36-38`, listed under `REPORTING_UNWIRED`). Production showed it disabled (`BASELINE_2026-09-15.md:16`). No code archives it. |

**Totals:** 3 merged (done), 3 kept for now with a merge planned, 2 retired (planned). That's 8 of 8, matching the CSV.

---

## 3. Unknowns, and the single question that resolves each

None of the 8 rows is marked `unknown` in the brief's disposition. The unknowns are about **what production actually looks like** and **what lies outside the 8**. Each one blocks a step in §7.

| # | Unknown | The one question | Who can answer |
|---|---|---|---|
| U1 | Whether the two retirements actually happened in production. The contract requires it, but no code does it (`curriculum.json:4634`, item 4). | "In production today, what do the `enabled` and `migration_status` fields say for CurriculumOptimizerAgent and EducationReportingAgent?" | Ali Muwwakkil, or someone he names with production read access. The repo doesn't say who has that access. |
| U2 | Whether LearningInnovationArchitect is still off. The last record is 2026-09-15 (`BASELINE_2026-09-15.md:9`). | "Is LearningInnovationArchitect still `enabled: false` in production, and has it created any ticket or initiative since 2026-08-24?" | Same as U1. |
| U3 | Who owns the four nightly jobs that check for Anthropic changes. They aren't among the 8 (W1). | "Is the curriculum employee the owner of the four nightly Anthropic jobs, including the one that emails Ali?" | **Swati** confirms that ownership. **Ali** confirms he still wants the email. |
| U4 | Whether any curriculum ticket can reach CurriculumArchitectAgent today through the catch-all handler (`capabilityRegistry.ts:107-112`). Production showed "no evidence it was ever dispatched" (`BASELINE_2026-09-15.md:12`). | "Does the ticket routing system run in production, and has it ever sent a `curriculum` ticket to CurriculumArchitectAgent?" | Ali, or whoever owns the routing system. That owner isn't named in the repo. |
| U5 | Whether two of the 21 records with no owner are curriculum work. `SessionLifecycle` and `SessionReminders` are listed under "accelerator", and no domain rule matched them (`LEGACY_AGENT_CLASSIFICATION.csv:233-234`). This is a possibility, not a claim. | "Do class-session reminders and session status changes belong to curriculum?" | Swati says yes or no. If no, Ali assigns an owner. |
| U6 | Where the brief's figure "28 of 39 rows marked retire turned out live" comes from. The only place it appears in the platform repo is the template that writes the story (`backend/src/services/agentDomain/agentDomainStoryTemplates.ts:246`). | "Which three domains and which 39 rows does that figure count?" | Whoever wrote the story template. That person isn't named in the repo; ask Ali. |
| U7 | Whether Swati agrees with each retirement. The brief says each one needs her confirmation. | "Do you confirm that CurriculumOptimizerAgent and EducationReportingAgent can be archived?" | Swati. |

---

## 4. Citations I checked myself

I opened each one at `a284987`. ✓ means it says what the brief claims. ✗ means it doesn't.

| Citation in the brief | Claim | Result |
|---|---|---|
| `repointLegacyBehaviors.ts:31-36`, `:42` | The two Directors and CurriculumQAAgent are absorbed; LearningInnovationArchitect is not | ✓ The list also includes `CurriculumVideoLinkHealth` and `DaraPresenceHeartbeat`. Neither is one of the 8 (see W1). |
| `aiOpsScheduler.ts:323`, `:367`, `:369` | LearningInnovationArchitect still has its own schedule; both Director jobs run as Dara | ✓ |
| `COVERAGE_CONTRACT.md:20-22`, `:31-32`, `:34` | Three deferrals and two retirements; "retire = archived, enabled false, row kept" | ✓ |
| `__tests__/fixtures/cronRegistryBaseline.ts:52`, `:55` | Optimizer is a cron row nothing runs; EducationReporting is `confirmed_dead` | ✓ |
| `agentRegistryAuditClassification.ts:38` | EducationReportingAgent is `REPORTING_UNWIRED` | ✓ The list starts at `:36`. |
| `CoryStrategicAgent.ts:66` | Only a mention inside an AI prompt | ✓ The path is `backend/src/intelligence/agents/CoryStrategicAgent.ts`. |
| "Zero importers" (CurriculumOptimizerAgent) | Nothing imports it | ✓ Two other mentions, neither an import: an unused copy of the seed file (`agentRegistrySeed-Ali-AI.ts:888`, which nothing imports) and a code comment (`workLedger/evidenceExpectationService.ts:70`). |
| `capabilityRegistry.ts:78`, `:107` | CurriculumQAAgent handles `curriculum.qa_check`; CurriculumArchitectAgent is the catch-all | ✓ |
| `ROLE_CHARTER_v1.md:54` | The Director rows are kept, not renamed, as audit records | ✓ |
| Seed row line numbers (8 rows) | e.g., CurriculumOptimizerAgent at `agentRegistrySeed.ts:1068` | ✗ **All 8 are now 2 lines lower**: `:1040`, `:1050`, `:1060`, `:1070`, `:1700`, `:1985`, `:2251`, `:2273`. A small citation slip; it doesn't change the substance. |
| `agentRegistrySeed.ts:2522` (Dara's `tools_granted`) | Dara holds `scan_curriculum_integrity` | ✗ The line moved: Dara's row starts at `:2522`, and `tools_granted` is at `:2544`. |
| `RISK_REGISTER.md:8` | The fictional cron row "made cronHealthAlertService report a permanently missed job" | ✗ for current code. See W2. |
| `LEGACY_AGENT_CLASSIFICATION.csv` | 8 curriculum rows; 21 rows with an `unresolved` owner | ✓ Rows `:30-37` and `:227-247`. |

---

## 5. Where I think the brief is wrong or incomplete

### W1. The brief leaves out four nightly jobs that the plan says Dara owns
- **What the brief misses:** the 8 records come from a CSV that only lists rows that have a registry entry or exist only in production (CSV `source` column: 232 `registry`, 14 `production_only`). A scheduled job with **no registry row** is left out by design.
- **But the domain's own contract assigns one to this employee:** `AnthropicCurriculumImpactAgent` "(+ 3 Anthropic crons)" is listed as deferred and owned here (`COVERAGE_CONTRACT.md:23`).
- **Evidence:**
  - All four jobs run every night with **no registry row**: `AnthropicContentWatcher`, `AnthropicChangeDetector`, `AnthropicCurriculumImpactAgent` and `AnthropicCatalogScraper` (`backend/src/services/schedulerService.ts:3466`, `:3480`, `:3494`, `:3513`). `agentRegistrySeed.ts` contains zero mentions of "Anthropic".
  - The impact job "emails Ali for any events scoring 7+" (`schedulerService.ts:3490-3492`).
  - Jobs without a registry row "run every tick with no enabled/paused gate, no run_count, no activity log", and the missed-run alerts can't see them (`FLEET_RECONCILIATION_2026-09-15.md`, §5, rows 28-31).
- **Why it matters:** this is the domain's only legacy job that sends anything outward, and it has no off switch. It should be in this plan, as an unclassified record (§6), even though it isn't one of the 8.
- `CurriculumVideoLinkHealth` was in the same position. It has since been registered and absorbed (`agentRegistrySeed.ts:2575-2597`; `repointLegacyBehaviors.ts:34`), so it needs nothing here.

### W2. One reason given for retiring CurriculumOptimizerAgent doesn't hold in today's code
- **The claim:** the brief says its fictional cron row "made cronHealthAlertService report a permanently missed job" (from `RISK_REGISTER.md:8`).
- **What the code says:** the missed-run check fires only when the row has a `last_run_at` value (`backend/src/services/cronHealthAlertService.ts:90`: `if (input.schedule && input.lastRunAt)`). This row never ran: `run_count` 0, last run "never" (`BASELINE_2026-09-15.md:15`). So this code can't raise that alert for it.
- **What I didn't check:** I found no other missed-run alert path in `cronInstrumentation.ts` or `dashboardThresholdWatcherService.ts`, but I didn't trace every alert source. The claim might have been true for an older version of the evaluator. Whether it is is **unknown**.
- **Conclusion:** the retirement still stands on its other reasons (nothing imports it, no scheduler runs it). Swati should just not be told it is causing a live alert.

### W3. "Already absorbed" for CurriculumQAAgent is only half done
- **What the contract requires:** absorbing it includes "Registry row corrected (`trigger_type: on_demand`, fictional cron removed…)" (`COVERAGE_CONTRACT.md:13`).
- **What the code has:** the seed still says `trigger_type: 'cron'`, `schedule: '0 */6 * * *'` (`agentRegistrySeed.ts:1064-1065`). The seed loop rewrites `trigger_type` from the registry on **every boot** (`agentRegistrySeed.ts:3273`), so fixing it by hand in production wouldn't last.
- The capability record knows this (`curriculum.json:367`). The disposition's "Already absorbed" reads as if nothing is left to do.

### W4. Neither retirement is performed by any code, and the mechanism that exists doesn't include them
- **Archiving means two things:** setting `migration_status='archived'` and `enabled=false` (`COVERAGE_CONTRACT.md:34`).
  - **`migration_status`:** the only code that writes it is `repointLegacyBehaviors.ts:61`, `:85`, and it only ever writes `'absorbed'`.
  - **`enabled`:** the platform already has a replayable retirement mechanism, `RETIRED_AGENTS` plus `enforceRetiredAgents()`, which runs on every boot (`agentRegistrySeed.ts:3212-3249`, called at `:3308`). It lists only `StudentProgressMonitor` and `CompanyStrategicCycle`.
- The brief marks the production state as unknown. That's correct, and I can add the code side: **no code performs this retirement.**

### W5. Rebuilding from scratch would switch three rows on, so the migration isn't replayable as written
- **What the code does:**
  - The model's default for `enabled` is `true` (`backend/src/models/AiAgent.ts:423-427`).
  - `findOrCreate` applies registry values only when it **creates** a row (`agentRegistrySeed.ts:3252`).
  - The seed rows for LearningInnovationArchitect (`:1985-1995`), CurriculumOptimizerAgent (`:1070-1078`) and EducationReportingAgent (`:1700-1709`) set no `enabled` value.
- **What follows:** on a fresh database, all three would be created **enabled**, the opposite of what production showed for two of them (`BASELINE_2026-09-15.md:9`, `:16`). LearningInnovationArchitect would also start running every 6 hours (`aiOpsScheduler.ts:323`), with tools that create initiatives and tickets (`agentRegistrySeed.ts:1993`).
- **Why it matters:** "run it twice, same end state" holds on the current production database, but not on a rebuilt one. §6 fixes this.

### W6. "Five of them are live production rows" goes further than the source does
- The five `production_only` rows among the 21 with no owner are recorded as "enabled; no registry entry; **verify whether anything still runs it**" (`LEGACY_AGENT_CLASSIFICATION.csv:243-247`). The matrix calls for the same check (`MIGRATION_MATRIX.md:49`).
- "Enabled" is evidenced; "live" is not. Whether anything runs them is **unknown**.

### W7. Smaller line drift
All 8 seed line numbers moved by 2, and Dara's `tools_granted` moved from `:2522` to `:2544` (§4). In the same file's notes, the admin pass-through cited at `mgmtSectionGate.ts:188` is now at `:248` (already recorded in `docs/discovery/04-manager-interview.md`).

---

## 6. How the migration stays replayable

**The test:** running the migration twice leaves the same end state and creates no duplicate side effects, both on the current production data and on a database rebuilt from scratch.

| Step | What it does | What makes a second run a no-op | Exists today? |
|---|---|---|---|
| M1 Merge | Sets `parent_agent_id`, `record_kind`, `migration_status='absorbed'` and `reports_to` on the merged rows | Each field is written only if it's empty, so a second run makes zero writes and never overwrites a human's later change (`repointLegacyBehaviors.ts:27-30`, `:58-72`). A row it can't find is logged and skipped (`:53-56`). | **Yes** |
| M2 Retire | Adds CurriculumOptimizerAgent and EducationReportingAgent to `RETIRED_AGENTS` with a reason. Sets `migration_status='archived'` only if it's empty. Changes their registry entries to `on_demand`, so the boot-time rewrite (`:3273`) stops claiming a cron. The rows and their history are kept. | `enforceRetiredAgents()` skips any row that's already disabled (`agentRegistrySeed.ts:3240`). The "only if empty" guard follows the same pattern as M1. | **No.** Proposed. |
| M3 Pin the seed | Adds `enabled: false` to the seed rows for LearningInnovationArchitect and the two retired rows, so a rebuilt database matches production (W5). | It only matters when a row is created (`:3252`), so existing rows are untouched. | **No.** Proposed. |
| M4 Fix the QA row | Changes CurriculumQAAgent's seed row to `trigger_type: 'on_demand'`, `schedule: ''`, as the contract requires (W3). | The boot-time rewrite then keeps writing the correct value on every boot. | **No.** Proposed. |
| M5 Deferred rows | LearningInnovationArchitect, CurriculumArchitectAgent and ArtifactGenerationAgent: **no write** until their conditions are met. | Nothing is written, so there's nothing to duplicate. | Already true |

**Evidence that it's replayable.** Elapsed time and a passing mocked test don't count. These do:
1. On a sandbox copy, run the migration, take a snapshot of the 8 rows (`enabled`, `trigger_type`, `schedule`, `record_kind`, `migration_status`, `parent_agent_id`, `reports_to_type`, `reports_to_id`), run it again, and snapshot again. **The difference between the two snapshots is empty.**
2. During the second run, the number of new tickets, initiatives, alerts and emails is **zero**.
3. On a freshly built database, the same snapshot after one run **matches the production snapshot** from U1/U2.

M2–M4 are changes to the platform repository. This story doesn't make them. Whoever implements them needs Swati's confirmation (U7) and Ali's sign-off as DRI.

---

## 7. What happens to a record the migration can't classify

**Rule: an unclassified record is left untouched and reported. It is never given a default category.**

- The migration acts **only on names listed explicitly**: `ABSORBED_BEHAVIOR_NAMES`, `ABSORBED_TOOL_NAMES` and `RETIRED_AGENTS`. Any other row keeps `record_kind = null`, which the platform defines as "not yet classified", and every existing read path ignores it (`MIGRATION_MATRIX.md:15`).
- If a listed name isn't found, the step logs it and skips it rather than failing or inventing a row (`repointLegacyBehaviors.ts:53-56`; `agentRegistrySeed.ts:3239`).
- An unclassified record is **never** retired by default. The brief itself warns why: rows marked `retire` across the programme turned out to hold live code (the figure's source is unknown, U6).
- Each unclassified record goes on the **decision queue** reviewed in Swati's Monday check-in (`docs/discovery/04-manager-interview.md` §5), with four fields:
  - its name
  - what it does (`file:line`)
  - whether anything runs it (`unknown` until checked)
  - a proposed owner

  It stays there until Swati or Ali decides.
- **On that list today:**
  - The four Anthropic nightly jobs (W1, U3). Because one of them emails Ali with no off switch, the first proposed action is to **register** them, following the `CurriculumVideoLinkHealth` precedent (`agentRegistrySeed.ts:2575-2582`: "register the tracking row, change zero real behavior"). Classify them after that.
  - `SessionLifecycle` and `SessionReminders`, as possible curriculum work only (U5).
- **The 21 records with no owner** (`LEGACY_AGENT_CLASSIFICATION.csv:227-247`) belong to no domain and aren't in this plan. This plan names them so they aren't mistaken for covered.

---

## 8. Sequence: what has to be decided first, and what each decision unblocks

| Order | Decision or fact | Who | Unblocks | Blocked until then |
|---|---|---|---|---|
| 1 | Production state of the two retired rows and LearningInnovationArchitect (U1, U2) | Ali, or someone he names | Knowing whether anything is live that shouldn't be | M2, M3, and the replay-evidence comparison in §6 |
| 2 | Swati confirms both retirements (U7) | Swati | M2 (retire), M3 for those two rows | Archiving either row. Until then both stay as they are. |
| 3 | Ownership of the four Anthropic jobs (U3) | Swati, with Ali | Registering them (§7), so they get an off switch and run tracking | Any classification of them. The email to Ali keeps running without an off switch. |
| 4 | Fix CurriculumQAAgent's registry row (M4) | Developer, with Ali's sign-off | Finishes record #3's merge | Nothing beyond this step. It needs no further decision, only Swati's validation of the integrity-scan capability. |
| 5 | Whether the ticket routing system is live (U4) | Ali, or the routing owner | Knowing whether the deferred CurriculumArchitectAgent can be reached today | Merging records #5 and #6, which also need the three conditions in `COVERAGE_CONTRACT.md:21` |
| 6 | The three conditions for LearningInnovationArchitect (`COVERAGE_CONTRACT.md:20`), including "is the 175-planned / 175-cancelled history worth continuing at all" | Swati decides; Ali on the AI-call attribution fix | Merging record #4 | Its capability stays capped at `autonomy:R2` with no way to approve anything (`curriculum.json:4580`) |

Steps 1–3 can run in parallel. Nothing in steps 2–6 should be implemented before step 1 reports, because the plan's end state is defined relative to what production actually holds.

---

## Sources

All in the platform repository at `a284987` unless marked.

- `backend/src/services/agentDomain/capabilities/curriculum.json:4558-4623` (dispositions), `:4627-4634` (notes and unknowns)
- `backend/src/services/curriculum/repointLegacyBehaviors.ts:5-30`, `:31-42`, `:51-93`
- `backend/src/services/agentRegistrySeed.ts:1040`, `:1050`, `:1060-1065`, `:1070-1078`, `:1700-1709`, `:1985-1995`, `:2251`, `:2273`, `:2522`, `:2544`, `:2575-2597`, `:3212-3249`, `:3252`, `:3273`, `:3308`
- `backend/src/services/aiOpsScheduler.ts:323`, `:367`, `:369`
- `backend/src/services/schedulerService.ts:3462-3516`
- `backend/src/services/cronHealthAlertService.ts:57-120`, `:141-145`
- `backend/src/services/workGraph/capabilityRegistry.ts:76-79`, `:105-112`
- `backend/src/services/agentRegistryAuditClassification.ts:36-38`
- `backend/src/services/__tests__/fixtures/cronRegistryBaseline.ts:52`, `:55`
- `backend/src/intelligence/agents/CoryStrategicAgent.ts:66`
- `backend/src/models/AiAgent.ts:423-427`
- `backend/src/services/agentDomain/agentDomainStoryTemplates.ts:246`
- `docs/architecture/ai-workforce-management/LEGACY_AGENT_CLASSIFICATION.csv:30-37`, `:227-247`
- `docs/architecture/ai-workforce-management/MIGRATION_MATRIX.md:15`, `:49`
- `docs/architecture/ai-workforce-management/FLEET_RECONCILIATION_2026-09-15.md` §5
- `docs/architecture/ai-workforce-management/employees/curriculum/COVERAGE_CONTRACT.md:11-34`
- `docs/architecture/ai-workforce-management/employees/curriculum/BASELINE_2026-09-15.md:7-16`, `:35-36`
- `docs/architecture/ai-workforce-management/employees/curriculum/ROLE_CHARTER_v1.md:54`
- `docs/architecture/ai-workforce-management/employees/curriculum/RISK_REGISTER.md:8`
- This repository: `docs/discovery/04-manager-interview.md` §5
