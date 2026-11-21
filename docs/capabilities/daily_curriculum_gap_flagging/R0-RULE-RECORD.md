# Daily curriculum-quality gap flag: what makes a day produce a flag, and what makes it produce nothing

**Capability:** `curriculum.daily_curriculum_gap_flagging` · **Agent:** Dara (curriculum) · **Accountable human:** Swati Raman
**Release:** `autonomy:R0`. The R0 behaviour is to record the rule, its two thresholds, the dedup key, and the fact that only a human closes the task.
**Status:** the code is implemented and inherited. The requirement is still `draft`. **Ceiling:** `autonomy:R6`.
**Written:** 2026-11-20, from the platform at commit `a284987c`.

Code paths below are relative to `ColaberryEnterprise_AI_LeadershipAccelerator/backend/src/`. Paths that start with `docs/` are relative to `ColaberryEnterprise_AI_LeadershipAccelerator/`. Every line number was checked against that commit. This record describes what the code does. Where the story or the charter says something different, section 6 lists the difference.

---

## 1. The rule in one paragraph

Every morning at 06:10 Chicago time, the platform computes two school-wide numbers: how many curriculum blueprints exist, and their average quality score. **If there are no blueprints at all**, it flags "Compose the first curriculum blueprint". **Otherwise, if the average quality is above 0 and below 65**, it flags "Improve low-quality curriculum". In any other case it writes nothing. It never writes more than one flag, and it doesn't write one if a flag with the same key is already open. A flag is a task in Swati's workforce queue. Dara only ever creates the task; a human moves or closes it.

## 2. The rule, exactly

Source: `services/ops/directors.ts:52-53`.

| Check, in order | Threshold | Flag written | Dedup key (`source_rec_key`) | Severity |
|---|---|---|---|---|
| 1. Blueprint count | `= 0` | "Compose the first curriculum blueprint" | `curriculum.first` | medium |
| 2. Average quality (only when check 1 didn't fire) | `> 0` **and** `< 65` | "Improve low-quality curriculum" | `curriculum.improve` | medium |
| Neither | | **nothing**, with reason `no_signal_today` | | |

**The two thresholds are 0 blueprints and an average quality below 65.** The rule is deterministic and makes no LLM call.

### How the two numbers are computed

Source: `services/ops/schoolSignals.ts:86, :105`, with helpers at `:34-35`.

- **Blueprint count:** every row in `curriculum_blueprints`, with no filter. Drafts and published blueprints count alike, across every programme and cohort.
- **Average quality:** the mean of `quality_score` over all those rows, **rounded to one decimal before it is compared**.
- `quality_score` is an `INTEGER`, `NOT NULL`, with a default of `0` (`models/CurriculumBlueprint.ts:133`). A blueprint that has never been scored therefore counts as 0.

### Days that produce nothing

| Day | Why nothing is written |
|---|---|
| At least one blueprint, and average 65.0 or higher | The rule doesn't fire. |
| Average 64.95 to 64.99 | Rounds to 65.0 before the comparison, so it doesn't fire. |
| At least one blueprint, but the average is **exactly 0** (every blueprint scores 0, or none has been scored) | The `> 0` guard stops the flag. **This is the worst state, and it is silent.** |
| The same flag is already open | The duplicate check skips the write: `already_flagged` (§4). |
| Dara is switched off or paused, or the curriculum director's own row is, or the kill switch or safe mode is on | A gate stops the run before the rule is applied (§3). |

## 3. The path from timer to task

Each step must pass before the next one runs.

| # | Step | What stops it | Location |
|---|---|---|---|
| 1 | The timer fires at `10 6 * * *`, Chicago time, registered under the name `Dara` | The governance schedule row for `Dara` is disabled, so the task is never scheduled | `services/aiOpsScheduler.ts:367, :559`; enabled check at `:749-756` |
| 2 | Outer wrapper `instrumentCronJob('Dara')` | **Dara's own row** has `enabled = false` or `status = 'paused'`, so the run is skipped with a warning log | `services/cronInstrumentation.ts:46-52` |
| 3 | Gather the signals and apply the rule; take only the top recommendation | No recommendation, so the run ends with `no_signal_today` and writes nothing | `services/workforce/directorActions.ts:42-45` |
| 4 | Inner gate on the **`WorkforceCurriculumDirector`** row | The row is missing, disabled or paused, or the kill switch or safe mode is on | `services/workforce/workforceAgentRuntime.ts:66-73` |
| 5 | Duplicate check | An open task with the same key exists, so the run ends with `already_flagged` | `services/workforce/workforceAgentRuntime.ts:155-158` |
| 6 | Permission allow-list | The table isn't `workforce_tasks`, or the operation isn't `flag_curriculum` | `services/agentPermissionService.ts:91`; checked at `workforceAgentRuntime.ts:160-166` |
| 7 | **Write one task** | | `services/workforce/directorActions.ts:55-63` |
| 8 | Log it, emit an event, and mirror a ticket | A failed ticket mirror is logged and swallowed, and the task still stands | `services/workforce/workforceAgentRuntime.ts:170-195` |

**The task that gets written:**
- `employee_slug: 'curriculum'`
- `status: 'assigned'`
- `priority: 'medium'`
- `approver: 'chief_of_staff'`
- `source_rec_key`: one of the two keys above
- `description`: the rule's "why", followed by its evidence. For example: "Average blueprint quality is below the bar… (avg quality 58.3)".

## 4. The duplicate check

Source: `services/workforce/directorActions.ts:22-27`.

- **Key:** `source_rec_key`. Only two values exist: `curriculum.first` and `curriculum.improve`.
- **What counts as open:** status `assigned`, `planning`, `working` or `needs_approval`.
- **Effect:** at most one open flag of each kind. A re-run on the same day, or on any later day while the task is still open, writes nothing.
- **After a human closes it:** if the condition still holds the next morning, a **new** task is written. Closing a task without fixing the curriculum brings it back the next day.
- **Status is free text** (`models/WorkforceTask.ts:26`, `STRING(20)`, no fixed list). Any status other than those four, including a typo, counts as closed, and the flag would come back.

## 5. Only a human closes the task

- Dara writes exactly one status, `'assigned'` (`directorActions.ts:59`).
- I searched the platform's services for any code that changes a workforce task's status afterwards and found none. I did not trace the admin screen a human uses to move a task, so this record doesn't describe that screen.
- No field records when a task was acted on. That's why the charter marks "tasks Swati acts on within a stated window" as **UNMEASURED** (`docs/architecture/ai-workforce-management/employees/curriculum/ROLE_CHARTER_v1.md:40`).

## 6. Where the code and the written record disagree

For Swati and Ali to settle. None of these was changed.

| # | What is written | What the code does | Evidence |
|---|---|---|---|
| 1 | Story: "Dara's `AiAgent.enabled` false makes the write a no-op … (`isDaraEnabled`)" | It's true that switching Dara off stops it, but **through the outer cron wrapper**, not `isDaraEnabled`, which this path never calls. There is also a **second switch**: the inner gate checks the legacy `WorkforceCurriculumDirector` row. Both must be on for a task to be written. | `cronInstrumentation.ts:46-52`; `directorActions.ts:71`; `workforceAgentRuntime.ts:66-69` |
| 2 | Scheduler comment: "directorActions.ts passes agentName: 'Dara' to the inner write gate" | It passes `'WorkforceCurriculumDirector'`. The coverage contract says this behaviour "keeps its own row and kill switch", so the code follows the contract and **the comment is out of date**. | `aiOpsScheduler.ts:124-125`, compared with `directorActions.ts:71`; `COVERAGE_CONTRACT.md:11` |
| 3 | Story: "quality_score is an unconstrained STRING-backed score" | It is an `INTEGER`, `NOT NULL`, default `0`. The other half of that exception does hold: `program_id` and `cohort_id` are plain nullable UUIDs with no foreign key. | `models/CurriculumBlueprint.ts:104-105, :133` |
| 4 | Story: "one **specific** … gap per day". Charter: "when **a course area** has zero blueprints or average … below 65" | The rule uses **one school-wide average**. The task never names a week, blueprint or programme; its only evidence is the average itself. | `directors.ts:53`; `schoolSignals.ts:105`; `ROLE_CHARTER_v1.md:25` |
| 5 | Neither document mentions it | Unscored blueprints count as 0, which pulls the average down. That can raise a flag when the scored blueprints are fine, and it hides the worst case (an average of exactly 0 → no flag). | `CurriculumBlueprint.ts:133`; `schoolSignals.ts:105`; `directors.ts:53` |
| 6 | Story: run and error counts pool on one row | Confirmed. All three of Dara's morning timers (06:10, 06:15, 06:30) record against the single `Dara` row, so a silent failure of this one can't be told apart from the other two succeeding. | `docs/architecture/ai-workforce-management/SUPERVISOR_HEALTH_AUDIT_2026-10-06.md:181-205` |

## 7. What would answer the acceptance criterion

> Swati can state, unprompted, what makes a day produce a flag and what makes it produce nothing.

This has to come from Swati, not from this document. A complete answer covers:
- the two triggers (0 blueprints; an average above 0 and below 65)
- the silent cases (65 and over, an average of exactly 0, an already-open flag, a switch off)
- that the average is school-wide and counts unscored blueprints as 0
- that only a human closes the task, and that a closed task comes back the next day if nothing changed

Until she says it, the criterion stays unticked.
