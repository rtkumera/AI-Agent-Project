# Evidence: scoping the curriculum change impact assessment

For Ali and Swati Raman. Capability: `curriculum.curriculum_change_impact_on_live_cohorts`. The scope document is [`docs/capabilities/curriculum_change_impact/ASSESSMENT-SCOPE.md`](../../capabilities/curriculum_change_impact/ASSESSMENT-SCOPE.md).

Every platform reference below points at code in `ColaberryEnterprise_AI_LeadershipAccelerator/backend/src/`, at commit `a284987c`, checked line by line. Nothing here relies on a story being marked complete, on a conversation, or on a mocked test.

## Ali's three asks

| Ask | Where it is answered | What backs it |
|---|---|---|
| 1. Define what the assessment must answer, not how to build it | Section 1: nine questions, Q1–Q9 | Each question cites the part of the capability record it comes from (workflow, outputs, exceptions or R2 behaviour) |
| 2. Name the records, by table or file | Section 2: one row per record, with fields and file:line | 14 tables and 4 services, each with a model file and line number. Each row says whether the link is joinable, by convention, or not traceable |
| 3. Say what you cannot see | Section 3: gaps G1–G10 | Each gap has its effect on the assessment and its file:line. Three come from the record's own `blocked_by`; seven were found while reading |

**Boundary (Ali: "never the change itself").** Section 0 names the five places where a change would actually be made (publish, snapshot, promote, rollback, write readiness), with their file:lines, and marks them out of bounds. Nothing in this work calls, edits or requests any of them.

## The story's acceptance criterion

> Swati states what a slug rename would do to student progress and who decides on a change.

**Not met, and not ticked.** Only Swati can meet it. The scope gives her what she needs to answer: Q4, G1 (`models/TimelineCard.ts:32`, where the type slug is a foreign key by convention only), Q9, and open question 1 in section 5. `.colaberry/progress.json` leaves it `passed: false`.

## What did not change

- No agent, tool grant or autonomy level was touched. The capability stays `draft` at `autonomy:R0`, and its ceiling stays `autonomy:R5`.
- Nothing was sent to anyone.
- No platform code was run. The platform was read only.
- No figure in the document is a real count. Section 4 is a template with placeholders, because no live data was read (G8).
