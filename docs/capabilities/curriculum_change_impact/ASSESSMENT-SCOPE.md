# Impact assessment before a curriculum change reaches a cohort already mid-programme

**Capability:** `curriculum.curriculum_change_impact_on_live_cohorts` · **Agent:** Dara (curriculum) · **Accountable human:** Swati Raman
**Status:** scoping only. The requirement is `draft` and nothing here is built. **Ceiling:** `autonomy:R5`. **Today:** `autonomy:R0`.
**Written:** 2026-11-20, from the platform at commit `a284987c`.

Every platform path below is relative to `ColaberryEnterprise_AI_LeadershipAccelerator/backend/src/`. Every line number was checked against that commit. The capability record is `services/agentDomain/capabilities/curriculum.json`.

---

## 0. Boundary: what this capability is, and what it is not

**It is:** reading the records, assembling the assessment, and handing it to a human, who decides whether the change goes ahead.

**It is not:** making the change. Editing a blueprint, publishing or re-publishing a week, taking or promoting a snapshot, pruning old cards and recomputing readiness all belong to other capabilities. If the work starts to need any of these, it has crossed the line, and it stops.

| Out of bounds | Where it lives |
|---|---|
| Publishing a week to the Timeline | `services/composer/publishService.ts:42` (`publishBlueprint`) |
| Taking a curriculum snapshot | `POST /curriculum/versions/:blueprintId/snapshot`, `routes/admin/previewRoutes.ts:30` |
| Promoting a snapshot to live | `POST /preview/curriculum/:snapshotId/promote`, `routes/admin/previewRoutes.ts:65` |
| Rolling curriculum back | `services/curriculumVersioningService.ts:55` (`rollbackToSnapshot`) |
| Writing a readiness snapshot | `services/certPrep/certReadinessService.ts:289` (`recordReadinessSnapshot`) |

**Autonomy.** The ceiling is R5, and the record gives the reason: the assessment only reads, but it gates a change that reaches learners mid-programme, so a human decides. At R5, Dara produces the assessment in shadow mode beside a human reviewer's own judgment, and applies nothing. R0 is the ungraded default that every capability starts at; it is not a judgment of this one. The capability is `human_decision: true` at every level: no amount of evidence turns "proceed" into Dara's call.

---

## 1. What the assessment must answer

A reader holding the assessment should be able to decide whether a change is safe to release to a cohort that is already running. That decision needs these questions answered. Each question comes from the capability record's workflow, outputs or exceptions, as noted.

| # | Question | Where it comes from |
|---|---|---|
| Q1 | **What exactly is changing?** Is it a week blueprint revision, a curriculum type edit, an assessment or weight change, or a re-publish? Which weeks, cards and lessons does it touch? | workflow step 1; inputs |
| Q2 | **Which cohorts are mid-programme now?** Started, not finished, inside this programme. | workflow step 2 |
| Q3 | **Inside those cohorts, who has reached the changed span?** For each student: not yet reached, in progress, or completed. Give a count for each group. | workflow step 2; outputs; R2 behaviour ("every affected group is named with a count") |
| Q4 | **Does the change rename or remove a type slug, card or lesson that existing progress rows point to?** If it does, whose progress would be orphaned? | exception 1 (slug is an immutable foreign key) |
| Q5 | **Does the change move gating?** Who would become newly locked, newly unlocked, or stuck behind a prerequisite that no longer exists? | workflow step 3; outputs |
| Q6 | **Does it change an assessment, question set or weight?** Whose readiness figure would move, from what to what, and have they already seen the old one? | exception 3 |
| Q7 | **If it is a re-publish, would both versions be visible?** To whom, and until which named person prunes the old cards? | exception 2 |
| Q8 | **Which answers above are "unknown", and why?** "Unknown" is never reported as "no impact". | exception 5; R2 behaviour |
| Q9 | **Who decides, and what do they need in order to say yes or no?** | exception 4; workflow step 5 |

---

## 2. The records that answer them

The record says "the pieces exist in isolation". This section finds them. **Joinable** means a database foreign key connects the pieces. **By convention** means the link is a matching string or ID with nothing enforcing it. **Not traceable** means no record joins the pieces.

### The chain from a student to the curriculum

Two curriculum structures run side by side, and the assessment has to check both:

- **Timeline (the newer weekly cards).** `curriculum_blueprints` publishes cards into `timeline_cards` (it keeps the IDs in `published_card_ids`). Each card has rows in `timeline_card_progress`, which point to `enrollments`, and each enrollment points to `cohorts`.
- **Module and lesson tree (the older one).** `program_blueprints` holds `curriculum_modules`, which hold `curriculum_lessons`. Each lesson has rows in `lesson_instances`, which point to `enrollments`, and then to `cohorts`.

### Question by question

| Q | Table / file | Field(s) | Location | Link |
|---|---|---|---|---|
| Q1 | `curriculum_blueprints` | `week`, `cohort_id`, `status`, `published_card_ids` | `models/CurriculumBlueprint.ts:105-106, :136-137` | Joinable |
| Q1 | `blueprint_snapshots` and the versioning service | `snapshot_data`, `version_number`, `change_summary`; `diffSnapshots()` | `models/BlueprintSnapshot.ts:19-28`; `services/curriculumVersioningService.ts:93` | Joinable for the module/lesson tree only (see gap G2) |
| Q1 | `curriculum_type_definitions` | `slug` (unique) | `models/CurriculumTypeDefinition.ts:171-174, :307` | Joinable |
| Q1 | 13 week blueprints of the canonical programme | `CANONICAL_PROGRAM_ID` | `data/weekBlueprints.ts:26-27` | Code constant |
| Q2 | `cohorts` | `start_date`, `status` (`open` / `closed` / `completed`), `curriculum_version`, `program_id` | `models/Cohort.ts:57, :83, :93, :103` | Joinable |
| Q2 | `enrollments` | `cohort_id`, `status` (`active` / `completed` / `withdrawn` / `suspended`) | `models/Enrollment.ts:158, :217, :331` | Joinable |
| Q3 | `timeline_card_progress` | `card_id`, `enrollment_id`, `status`, `started_at`, `completed_at` | `models/TimelineCardProgress.ts:51-68, :74` | Joinable |
| Q3 | `lesson_instances` | `lesson_id`, `enrollment_id`, `status` (`locked` / `available` / `in_progress` / `completed`) | `models/LessonInstance.ts:44-57, :98` | Joinable |
| Q3 | `timeline_cards` | `week`, `visibility`, `release_date`, `cohort_id`, `program_id` | `models/TimelineCard.ts:150, :154-155, :172-173` | Joinable |
| Q4 | `timeline_cards.type` → `curriculum_type_definitions.slug` | `type` | `models/TimelineCard.ts:32` (comment: "FK-by-convention") | **By convention** (see gap G1) |
| Q4 | Curriculum modules and lessons | `curriculum_modules` → cohort and programme; `curriculum_lessons` → module | `models/CurriculumModule.ts:59, :64`; `models/CurriculumLesson.ts:66` | Joinable |
| Q5 | Card's own gating rules | `unlock_rules` | `models/TimelineCard.ts:156` | Joinable |
| Q5 | Section (bucket) gating rules | `program_id`, `bucket`, `rules`, `active` | `models/TimelineSectionRule.ts:41-44, :50` | Joinable |
| Q5 | The gating engine | `evaluateCardLock()`: a pure function that does no reads or writes, so it can be re-run against a proposed rule set | `services/timeline/timelineGatingService.ts:170` | Computed, never stored (see gap G4) |
| Q6 | `cert_readiness_snapshots` | `enrollment_id`, `blueprint_version`, `readiness_policy_version`, `overall_scaled`, `overall_state`, `domain_breakdown`, `computed_at` | `models/CertReadinessSnapshot.ts:77-88, :92` | Joinable |
| Q6 | Readiness history (snapshots are appended, never overwritten) | `listReadinessHistory()`; policy constant `READINESS_POLICY_VERSION` | `services/certPrep/certReadinessService.ts:33, :296, :321` | Joinable |
| Q6 | `cert_sessions` | `enrollment_id`, `cohort_id`, `form_version`, `blueprint_version`, `scoring_policy_version`, `status` | `models/CertSession.ts:92-104` | Joinable |
| Q6 | `cert_tracks` | `track_id`, `version`, `blueprint_version` | `models/CertTrack.ts:80-84` | Joinable |
| Q7 | The re-publish rule | A forced re-publish creates a new set of cards and leaves the old ones in place "for the author to prune" | `services/composer/publishService.ts:36-41` | Code behaviour |
| Q7 | Which cards a blueprint has published | `published_card_ids`, which accumulates on every re-publish | `services/composer/publishService.ts:84`; `models/CurriculumBlueprint.ts:137` | Joinable |
| Q8 | Section 3 below | | | |
| Q9 | The capability record | `accountable_human`, `human_decision: true`, `permissions_by_environment.production` ("decide whether to proceed; this is the human's decision") | `services/agentDomain/capabilities/curriculum.json` | Recorded |

**Tools this needs.** The record lists `read_learner_progress`, `read_timeline_cards`, `read_curriculum_blueprints`, `read_cert_sessions` and `emit_structured_log`. All five only read or log.

---

## 3. What I cannot see

An assessment that quietly leaves a factor out is worse than one that says the factor is unavailable. These are the gaps known today. The capability record already names G1, G2 and G9; the rest I found while reading.

| # | Gap | Effect on the assessment | Evidence |
|---|---|---|---|
| G1 | **No enforced link from a curriculum type slug to the students using it.** `timeline_cards.type` holds the slug as a plain string, not a foreign key. | For a type edit or a rename (Q4), the affected-student list is "unknown", not "empty". The record says this itself. | `models/TimelineCard.ts:32`; record `blocked_by[5]` |
| G2 | **The version diff can't be reached.** `GET /curriculum/versions/diff` is registered after `GET /curriculum/versions/:blueprintId`, so the second route catches the request first. The diff also covers only the module/lesson tree, not Timeline cards. | Q1 has to be answered by comparing the proposed change by hand. There's no working diff to cite. | `routes/admin/previewRoutes.ts:20, :75`; `services/curriculumVersioningService.ts:130-152` |
| G3 | **No record says which week a cohort is in.** A cohort has a start date and an `open` / `closed` / `completed` status, but no current-week field and no end date. | "Mid-programme" (Q2) has to be inferred from start date, status and the furthest progress row. The assessment must say it is inferred. | `models/Cohort.ts:57, :83` |
| G4 | **Gating is computed when a student loads a page, never stored, and any error unlocks the card.** | Who would be newly locked (Q5) can only be predicted by re-running the gating function. There's no stored "before" to compare against. A prediction may undercount, because errors count as unlocked. | `services/timeline/timelineGatingService.ts:13-17, :20-21` |
| G5 | **The main publish path creates cards with no programme or cohort.** `createCard(input)` passes neither field, although the topic-pack path does pass `program_id`. | It isn't clear which cohorts see a published week's cards. I haven't yet found where the student feed decides this, so cohort scope for Q3 is unknown until I do. | `services/composer/publishService.ts:81` vs `:113` |
| G6 | **Re-publish leaves both versions.** Old card IDs stay in `published_card_ids` and the cards stay live. | Q7 can say *that* both are visible. *Who* has actually seen each version depends on G5. | `services/composer/publishService.ts:36-41, :84` |
| G7 | **Dara holds none of the five required tools.** Its six granted tools are different ones. | Today the assessment can only be done by a person, by hand, or from code and the synced snapshot. Nothing here requests a tool. | `.colaberry/agent-domain.json` → `agent.tools_granted` |
| G8 | **No live data.** This scope was built from code and the synced snapshot, with no access to the production tables. | No count in this document is real yet. Section 4 is a template with no figures. | n/a |
| G9 | **The requirement isn't validated.** Swati hasn't confirmed scope, exceptions or success measures. | Everything here is a proposal until she does. | record `validation_dependency`; `blocked_by[1]` |
| G10 | **"AI Architect accelerator" isn't a programme name in the code.** "AI Architect" appears as a level name and a certification, and the canonical programme is a single ID that owns 13 week blueprints. | The assessment names the programme by ID until Swati confirms it is the same thing. | `config/env.ts:389`; `data/weekBlueprints.ts:26-27` |

---

## 4. What the assessment would look like

This is a template. Every value is a placeholder, because no real change has been assessed (G8).

> **Proposed change:** `<what>`, touching `<weeks / cards / lessons>`, raised by `<name>` on `<date>`
> **Programme:** `<program_id>` · **Cohorts mid-programme:** `<n>` (inferred, see G3)
>
> | Cohort | Students | Not reached | In progress | Completed | Progress orphaned | Gating moves | Readiness moves | Sees both versions |
> |---|---|---|---|---|---|---|---|---|
> | `<cohort>` | `<n>` | `<n>` | `<n>` | `<n>` | `<n / unknown>` | `<n / unknown>` | `<n / unknown>` | `<yes / no / unknown>` |
>
> **Unknown, and why:** `<each unknown, with its gap number>`
> **Sources read:** `<table / file : line>` for every figure
> **Decision:** `<named human>` decides whether to proceed. Dara has applied nothing.

---

## 5. Open questions for Swati

1. **The R0 acceptance question.** What would a slug rename do to students' progress, and who decides on a change? (This is the story's single criterion, and only Swati can satisfy it.)
2. **Scope.** Which changes count: all four kinds in Q1, or a subset to start with?
3. **Mid-programme.** Is "started and not completed" the right test, given G3?
4. **Success measure at R5.** Which real past changes would form the agreed set to compare Dara's assessment against a reviewer's?
5. **The programme.** Is the canonical programme (`data/weekBlueprints.ts:27`) the AI Architect accelerator?
