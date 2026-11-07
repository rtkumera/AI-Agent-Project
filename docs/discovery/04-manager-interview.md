# A 30-minute interview with Swati Raman, and a proposed weekly check-in

**Story:** `curriculum.RESEARCH-4-MANAGER-INTERVIEW` · **Domain:** Curriculum, Learning & Certification (Dara)
**Accountable human:** Swati Raman · **Written for:** Swati Raman, to review before any meeting
**Researched:** 2026-11-07 against the platform repository
[ColaberryEnterprise_AI_LeadershipAccelerator](https://github.com/ColaberryIntern/ColaberryEnterprise_AI_LeadershipAccelerator) at commit `a284987`.
Every platform path below is in that repository. Every claim carries a `file:line` source or the word **unknown**.

> **This is an agenda, not a booking.** No meeting has been arranged. Nothing has been sent, and no invitation or link exists. Whether and when to meet is for Swati to decide, outside this project.

**Status: draft.** Every question below asks Swati to decide something that no one has decided yet. Today all 38 of Dara's capabilities are `draft`, and none has an approved autonomy level (`backend/src/services/agentDomain/autonomyLadder.ts:188-191`).

---

## 1. The agenda: 30 minutes

| Time | Section | Minutes | Questions |
|---|---|---|---|
| 0:00 – 0:02 | Why this meeting: Dara already runs, and nothing she does has been approved by you | 2 | — |
| 0:02 – 0:06 | **Raise:** how you reach Dara today (§2) | 4 | Q1 |
| 0:06 – 0:12 | A. Which capabilities you want first | 6 | Q2, Q3 |
| 0:12 – 0:17 | B. What must stay human forever | 5 | Q4, Q5 |
| 0:17 – 0:22 | C. What "good" looks like, in numbers | 5 | Q6, Q7 |
| 0:22 – 0:27 | D. What you'd switch off immediately | 5 | Q8, Q9 |
| 0:27 – 0:30 | The weekly check-in proposal (§5), and what happens next | 3 | — |
| | **Total** | **30** | 9 questions |

**If it runs long:** drop Q7, then Q3. Both are covered later: Q7 by the first check-in, and Q3 by a separate Data Analyst conversation. Q1, Q2, Q4 and Q8 must not be cut, because without those answers nothing in the build can move.

---

## 2. Raise, don't fix: how Swati reaches Dara

The brief says Swati "can reach the agent surface today". The code agrees, but only by a side door, and that is worth four minutes of her time. A manager who can't reliably reach the page can't validate what she's being asked to validate.

| Fact | Source |
|---|---|
| She holds a full `admin` account with **no** curriculum-scoped role. The section gate lets any token without `mgmt_role` straight through. | `curriculum.json` (capability `manager_access_and_decision_queue_integrity`, `inputs`: "admin_users row 8a067218-…, role admin"); `backend/src/middlewares/mgmtSectionGate.ts:248` |
| The planned fix (step M2: map `/api/admin/agents` for scoped roles) **never landed**. The path appears 0 times in `PATH_SECTION`. | `MANAGER_ACCESS_PLAN.md:20`; `mgmtSectionGate.ts:21` onward |
| So a curriculum-scoped account, which is what the access plan designed for her (M1), would get a 403 error on every agent page. | `MANAGER_ACCESS_PLAN.md:19`; `curriculum.json:1105` |
| Whether she has actually opened Dara's page with her own login is **unknown**. Nothing in the repository records it. | `curriculum.json`, `manager_access_and_decision_queue_integrity.blocked_by` |
| No person has ever decided an approval request: all 106 were closed by `system:auto_approve_timeout`. | `docs/architecture/ai-workforce-management/APPROVAL_DROP_QUEUE_2026-10-06.md:92` |

**What to say in the meeting:** state these facts and ask Q1. **Do not fix it in the meeting.** The M2 mapping is a code change, and the account choice is an access decision. Both go to the DRI, Ali Muwwakkil, after the meeting. Who makes that change is **unknown** in the repository.

---

## 3. The questions

Each question names the fact that makes it specific to Dara, and **what changes in the build depending on the answer**. The answer box for each one is in §6.

### Raise first

**Q1. Have you opened Dara's Agent page and Talk tab with your own login? And for running Dara long-term, do you want a full admin account or a curriculum-only one?**
*Why:* §2. Her access today comes from full admin rights, not from the curriculum role designed for her.
*What the answer changes:*
- **Opened it:** her own words become the evidence for the R0 criterion of `manager_access_and_decision_queue_integrity` ("Swati confirms she can open the page, in her own words").
- **Not opened:** the first weekly check-in starts with opening it together.
- **Curriculum-only:** M2 becomes a blocker raised with Ali, before any scoped account is issued.

### A. Which capabilities first

**Q2. Dara already does four things without your sign-off: a curriculum-gap flag every day at 06:10, a per-student certification-risk sweep at 06:15, a readiness flag at 06:30 (all Central time), and replies to students' DMs. Which of these do you read today, and which one do you want to validate first?**
*Sources:* `backend/src/services/aiOpsScheduler.ts:367`, `:369`, `:375` (timezone `:559`); `curriculum.json`, `student_curriculum_dm_support` ("already runs unsupervised in production").
*What the answer changes:*
- The chosen capability gets the first R0 sign-off (scope, ceiling and human-decision flag), the step `autonomy_and_promotion_record_for_this_domain` requires.
- It also becomes task 1 in RESEARCH-5.
- Anything she says she never reads goes on the first check-in agenda as "output nobody acts on".

**Q3. Is a Data Analyst assigned to curriculum? If so, which recurring reports do they produce for you?**
*Why:* no document names a curriculum DA or lists their duties (`docs/discovery/03-role-and-da-transition.md` §1; `curriculum.json:4147`).
*What the answer changes:*
- **Yes:** the DA duty register outlined in Report 3 §7 can be written, from a separate interview with that person, and `da_curriculum_analytics_transition` can be scoped above R0.
- **No:** that capability is recorded as having nothing to absorb, and it stays at R0 until someone is assigned.

### B. What must stay human forever

**Q4. The plan marks 20 of Dara's jobs as your decision forever, among them publishing a week to students, approving a curriculum type, moving a prep item to "approved", and accepting an external certificate claim. Is there one you would actually delegate? And is anything missing? For example, TWC registration and compliance, which no capability covers.**
*Sources:* `curriculum.json` (`human_decision: true` on 20 rows); `autonomyLadder.ts:214-218` caps them at R5; `curriculum.json` mentions TWC 0 times, while `backend/src/scripts/lib/launchPmoTeam.js:47` lists it as one of her hats.
*What the answer changes:*
- A `human_decision` flag changes only with her signed agreement, recorded against that capability.
- Anything missing is added to Report 3's stays-human list and to the scope record (`coverage_scope_and_deferral_enforcement`) as out of scope for Dara.

**Q5. Today the approval gate turns into an automatic "yes" after a timeout (all 106 requests so far). For curriculum, should a timeout ever count as approval? If you're away, who decides instead?**
*Sources:* `APPROVAL_DROP_QUEUE_2026-10-06.md:92`; `curriculum.json`, `out_of_scope_escalation_handoff` R6 criterion ("a named human, not a timeout, decides").
*What the answer changes:*
- **"Never":** "timeout means no, and escalate" becomes a written requirement on the escalation capabilities before they can reach R6.
- **A named backup:** that person is added to `ACCOUNTABILITY_v1.md` as the backup decider. Who is allowed to name one is **unknown**.

### C. What "good" looks like, in numbers

**Q6. The daily gap flag fires when a course area has no blueprints or its average blueprint quality falls below 65. The readiness flag fires when average pass probability falls below 55. Are those your thresholds? Over a week, how many flags would be useful, and how many would be noise?**
*Sources:* `ROLE_CHARTER_v1.md:25-26` (citing `ops/directors.ts:45-46`, `:52-54`).
*What the answer changes:*
- Her thresholds become the R0 criterion for `daily_curriculum_gap_flagging` and `daily_certification_readiness_flagging`. If she changes either number, that is a reviewed code change, not a setting.
- Her "useful per week" number becomes the measure for the R5 shadow window.

**Q7. Four of Dara's six KPIs are UNMEASURED. One is "curriculum-gap tasks Swati acts on within a stated window". What is that window: a day, a week? And what counts as "acted on"?**
*Source:* `ROLE_CHARTER_v1.md:40-41`. No field records time-to-action, and only two real metric keys exist (`monthly_cost_usd`, `open_ticket_count`, `ROLE_CHARTER_v1.md:34`).
*What the answer changes:*
- The window becomes the KPI's first stated target.
- A new requirement is raised to record when a task is acted on, because nothing records that today. Until it exists, the KPI stays UNMEASURED and is reported that way.

### D. What you'd switch off immediately

**Q8. Dara's DM replies are already reaching students in the pilot cohort. What one kind of wrong answer would make you want them switched off immediately? Do you want them running before you've read a week of transcripts?**
*Sources:* `curriculum.json`, `student_curriculum_dm_support` (ceiling R5; R2 needs "an agreed adversarial set authored by a human"); `daraEligibilityService.ts:14-19` (`pilot_cohort_ids`).
*What the answer changes:*
- Her example becomes the first case in the human-written test set that the R2 criterion requires.
- **"Not before I've read them":** pausing becomes a request to an admin to set Dara's `enabled` flag to false, which stops the DM path at `daraReplyService.ts:105`. That is a human action after the meeting, and this document does not perform it.

**Q9. If anything Dara writes looks wrong, the platform has three switches: Dara's own `enabled`/`paused` flag, a global kill switch, and safe mode. Which should you be able to flip yourself? What would make you flip one?**
*Sources:* `backend/src/services/workforce/workforceAgentRuntime.ts:69-71`; video-link alerts are off unless `CURRICULUM_VIDEO_HEALTH_ENABLED=true` (`backend/src/services/schedulerService.ts:2648`).
*What the answer changes:*
- Each trigger she names becomes the written rollback condition the R6 pilot criteria require ("a rollback condition is written before it starts").
- Who can flip each switch gets recorded in `ACCOUNTABILITY_v1.md`. Whether she can flip them today, through her admin account, is **unknown** and should be confirmed in the first check-in.

### Drafted and cut

Questions that were drafted but cut, so that 30 minutes holds:
- "Which LLM model should Dara use?" This is a production-config read first (Report 2, Reasoning), so it waits for the first check-in.
- "What's your career-long vision for AI in curriculum?" Cut because it isn't specific to Dara.
- "Rate Dara 1–10." Cut because a good conversation is not evidence.
- Video-link alert recipients. This is already the R6 criterion of `video_link_health_monitoring`, and it comes up only once that feature is switched on.

---

## 4. What happens to the answers

The meeting only matters if its answers change the build. The table shows where each answer goes.

| Answer to | Goes into | Changes |
|---|---|---|
| Q1 | `manager_access_and_decision_queue_integrity` R0 evidence; an M2 blocker raised with Ali | Whether Dara can be validated through Swati's own access |
| Q2 | The first capability's R0 sign-off; RESEARCH-5 task 1 | Which capability moves first |
| Q3 | Report 3 §7 duty register, or the DA capability marked "nothing to absorb" | Whether DA work exists to transition |
| Q4 | `human_decision` flags; Report 3 §6; the scope record | What can never be delegated |
| Q5 | A requirement on the escalation capabilities; `ACCOUNTABILITY_v1.md` | Whether a timeout can ever be a "yes" |
| Q6 | R0 thresholds and the R5 measure for both daily flags | What counts as a correct flag |
| Q7 | The first measured KPI target; a new requirement to record time-to-action | Whether any KPI can leave UNMEASURED |
| Q8 | The first case in the DM test set; a possible pause request | Whether student DMs keep running |
| Q9 | Rollback conditions for every R6 pilot; who owns each switch | How Dara gets stopped |

The answers don't approve anything on their own. A capability changes state only when Swati signs it and that signature is recorded against it.

---

## 5. Proposed weekly check-in

| | Proposal | Why |
|---|---|---|
| **Day** | **Monday** | Dara's three daily jobs run every morning (`aiOpsScheduler.ts:367`, `:369`, `:375`), and the weekly research digest is sent to Curriculum on **Sunday at 07:00** (`agentRegistrySeed.ts:2333`, schedule `0 7 * * 0`). Monday is the first day a full week is complete. |
| **Duration** | **20 minutes** | Three fixed items, about six minutes each, plus a short close. |
| **Time of day** | **Unknown: Swati picks it** | No per-manager timezone exists on the platform, and every cron runs on America/Chicago time (`REPORTING_MAP.md:24`). |
| **Where it's recorded** | One `AgentOneOnOne` row per week, with the agenda and then outcome notes | `backend/src/models/AgentOneOnOne.ts:54-63`. The model has **no repeating schedule** (`:14-16`), so a person creates each week's row. Nothing creates it automatically. |

### The three things it reviews

1. **What Dara wrote this week, and what happened to it.** This covers every `workforce_tasks` row from the gap flag, the readiness flag and the research sweep, plus every handoff ticket and Basecamp to-do. For each one: acted on, closed, or ignored? Something nobody acts on is noise, and that feeds Q6 and Q7.
   *Surface:* `/admin/workforce` (`curriculum.json`, `daily_curriculum_gap_flagging.application_pages`).
2. **A sample of student DM transcripts, and every escalation.** Look for any answer outside the agreed scope, and any escalation Dara claimed that didn't actually happen. This builds the test set from Q8 week by week.
   *Surface:* Dara's Agent page and Talk tab, reachable by Swati as long as her admin account stands (§2).
3. **The decision queue.** This covers anything waiting for Swati: memory proposals, change requests, and the next capability's sign-off. It also checks whether any decision that week was made by a timeout instead of by her. One capability's autonomy record moves forward, or is recorded as not moving and why.
   *Surface:* `/api/admin/agent-domains-mine` and `/api/admin/agent-domains` are mapped for her sections (`mgmtSectionGate.ts:126`, `:128`).

The check-in is a proposal for Swati to accept, change or decline. This document doesn't put it in anyone's calendar.

---

## 6. Answers (to be filled in after the interview)

*Leave this empty until the conversation has happened. Write Swati's own words, not a summary. If a question went unanswered, write "not answered", so this file becomes the record.*

**Held on:**

| Q | Swati's answer | Action taken from it (link to the commit or record) |
|---|---|---|
| Q1 | | |
| Q2 | | |
| Q3 | | |
| Q4 | | |
| Q5 | | |
| Q6 | | |
| Q7 | | |
| Q8 | | |
| Q9 | | |

**Weekly check-in:** accepted / changed / declined:

---

## Sources

Platform `ColaberryEnterprise_AI_LeadershipAccelerator` @ `a284987`:
- `backend/src/middlewares/mgmtSectionGate.ts:21` (PATH_SECTION; `/api/admin/agents` 0 occurrences), `:126`, `:128`, `:248`
- `backend/src/services/agentDomain/capabilities/curriculum.json`: `manager_access_and_decision_queue_integrity` (inputs, blocked_by), `student_curriculum_dm_support`, `daily_*_flagging`, `out_of_scope_escalation_handoff`, `:1105`, `:4147`; 20 rows with `human_decision: true`
- `backend/src/services/agentDomain/autonomyLadder.ts:188-191`, `:214-218`
- `backend/src/services/aiOpsScheduler.ts:367`, `:369`, `:375`, `:559` · `backend/src/services/agentRegistrySeed.ts:2333`
- `backend/src/services/workforce/workforceAgentRuntime.ts:69-71` · `backend/src/services/curriculum/daraReplyService.ts:105` · `daraEligibilityService.ts:14-19` · `backend/src/services/schedulerService.ts:2648`
- `backend/src/models/AgentOneOnOne.ts:14-16`, `:54-63`
- `docs/architecture/ai-workforce-management/employees/curriculum/ROLE_CHARTER_v1.md:25-26`, `:34`, `:40-41` · `MANAGER_ACCESS_PLAN.md:19-20`
- `docs/architecture/ai-workforce-management/APPROVAL_DROP_QUEUE_2026-10-06.md:92` · `REPORTING_MAP.md:24`
- `backend/src/scripts/lib/launchPmoTeam.js:47`

This project: `docs/discovery/03-role-and-da-transition.md` §1, §6, §7.

**Citation drift:** the capability record cites `mgmtSectionGate.ts:188` for the admin pass-through. At `a284987` that line is a comment, and the check is at `:248`.
