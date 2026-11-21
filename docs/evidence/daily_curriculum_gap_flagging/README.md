# Evidence: daily curriculum-quality gap flag, R0

For Swati Raman. Capability: `curriculum.daily_curriculum_gap_flagging`. The record is [`docs/capabilities/daily_curriculum_gap_flagging/R0-RULE-RECORD.md`](../../capabilities/daily_curriculum_gap_flagging/R0-RULE-RECORD.md).

All 28 file:line references in the record were checked one by one against the platform at commit `a284987c`. Nothing here relies on the story being marked complete, on a conversation, or on a mocked test.

## What R0 asks to be recorded

| Item | Where in the record | Source |
|---|---|---|
| The rule | §1 (plain), §2 (exact) | `services/ops/directors.ts:52-53` |
| Its two thresholds: 0 blueprints; average quality > 0 and < 65 | §2 table | `directors.ts:52`, `:53` |
| How the average is computed: school-wide, unscored counts as 0, rounded before comparing | §2 | `services/ops/schoolSignals.ts:86, :105, :35`; `models/CurriculumBlueprint.ts:133` |
| The dedup key: `source_rec_key`, `curriculum.first` / `curriculum.improve`, four open statuses | §4 | `services/workforce/directorActions.ts:22-27` |
| Only a human closes the task | §5 | `directorActions.ts:59` (writes `assigned` only); no service code found that changes the status afterwards |
| What produces nothing | §2 "Days that produce nothing", §3 gates | `directorActions.ts:45`; `workforceAgentRuntime.ts:66-73, :155-158`; `cronInstrumentation.ts:46-52` |

## The acceptance criterion

> Swati can state, unprompted, what makes a day produce a flag and what makes it produce nothing.

**Not met, and not ticked.** Only Swati can meet it. §7 lists what a complete answer covers. `.colaberry/progress.json` leaves it `passed: false`.

## Found while recording

Six differences between the written record and the code are in §6. The two that change what Swati would say:
- **There are two on-switches.** Dara's own row and the legacy `WorkforceCurriculumDirector` row both have to be on.
- **An average of exactly 0 produces no flag**, even though it's the worst state. Unscored blueprints count as 0.

## What did not change

- No agent, switch, tool grant or autonomy level was touched. The capability stays `draft` at `autonomy:R0`.
- No task was written, and no timer was run.
- No platform code was run. The platform was read only.
- Nothing was sent to anyone.
