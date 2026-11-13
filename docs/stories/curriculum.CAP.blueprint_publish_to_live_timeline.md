# curriculum.CAP.blueprint_publish_to_live_timeline — Publishing an approved week plan to the live student timeline

**CANDIDATE -- not started, not assigned.** This is one line on this domain's list of everything its agent could eventually do. It becomes real work only when the builder picks it and their manager agrees, at which point it opens as four stories. Until then it is deliberately inert, and the honest status of it is "not started" rather than "behind".

An approved week becomes real cards students can open, through one audited bridge that a failing validation gate can stop, rather than by hand-editing the timeline.

**Built today:** implemented. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- backend/src/services/delivery/execution/executionPolicy.ts:33 denies push_to_protected_main and production_deploy, both of which publishing to live students requires
- a forced re-publish leaves prior published cards in place, so duplicate curriculum can be visible to students until a human prunes it (publishService.ts:37-40)
- no named approver is recorded on a publish today: the route is requireAdmin only (composerRoutes.ts:24)

Full build prompt is attached to this story.

**Release:** autonomy:R0 · Legacy migration plan (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Publishing an approved week plan to the live student timeline
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.blueprint_publish_to_live_timeline`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** implemented · **Source:** existing_application
## The business outcome
An approved week becomes real cards students can open, through one audited bridge that a failing validation gate can stop, rather than by hand-editing the timeline.
Intended users: Swati Raman (accountable manager), curriculum staff, students (as the recipients).
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- Assess the plan; refuse to publish if any check fails.
- Filter to approved component slugs only.
- Create each card exclusively through timelineAdminService.createCard, never a direct card write.
- Record the created card ids on the blueprint.
- On a forced re-publish, leave the previously published cards in place for a human to prune.
**Inputs**
- the blueprint's generated plan
- the validation gate result
- the approved component slug set
- an explicit force flag
**Outputs**
- real timeline_cards rows with visibility published
- published_card_ids recorded back onto the blueprint
- a quality score on the publish result
**Exceptions that must be handled**
- This is the moment curriculum reaches learners, so it is a human decision with a named approver, at every autonomy level, permanently.
- Publishing never silently deletes published curriculum; a forced re-publish leaves the old cards for a human to prune, which can leave duplicates visible to students.
- An unapproved component slug cannot be scheduled, so approval status is a functional gate rather than a label.
- A validation warn does not block publishing, so a week can reach students with known warnings.
- Reaching real students in production also requires a deploy: a database edit alone is environment-local.
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- read_curriculum_blueprints
- run_validation_gate
- propose_publish_packet
- emit_structured_log
**Application surfaces**
- /admin/orchestration composer publish action
- /admin/orchestration TimelineEditorTab
- student classroom timeline
- POST /api/admin/composer/blueprints/:id/publish
**Source modules**
- backend/src/services/composer/publishService.ts
- backend/src/services/timeline/timelineAdminService.ts
**Dependencies**
- the validation gate passing
- timelineAdminService as the only card writer
- the component approval flag
- a named human approver
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R5**.
Why that ceiling: This is the capability that puts curriculum in front of learners, so it is human-decided forever and effectiveAuthority() caps it at autonomy:R5. Even R5 is shadow only: the agent prepares a publish packet and a named human publishes. Reaching real students additionally needs push_to_protected_main and production_deploy, both default-denied, so no automation rung is reachable at all.

**THIS IS A HUMAN DECISION.** It stays human-required at every autonomy level, forever. An
agent may prepare, summarise and propose; it may never decide. No amount of evidence
promotes this into automation.
**First release behaviour (autonomy:R0)**
Record who approves a publish, what a forced re-publish leaves behind, and that a warn does not block.

Acceptance: Swati names the approver and states what happens to the old cards on a re-publish.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- backend/src/services/delivery/execution/executionPolicy.ts:33 denies push_to_protected_main and production_deploy, both of which publishing to live students requires
- a forced re-publish leaves prior published cards in place, so duplicate curriculum can be visible to students until a human prunes it (publishService.ts:37-40)
- no named approver is recorded on a publish today: the route is requireAdmin only (composerRoutes.ts:24)
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- backend/src/services/composer/publishService.ts:1
- backend/src/services/composer/publishService.ts:42
- backend/src/services/composer/publishService.ts:98
- backend/src/services/timeline/timelineAdminService.ts
- backend/src/models/TimelineCard.ts:191
- backend/src/models/CurriculumBlueprint.ts:137
- backend/src/routes/admin/composerRoutes.ts:24
- backend/src/services/composer/validationEngine.ts:1

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] Swati names the approver and states what happens to the old cards on a re-publish.

When every box above is ticked, stop and show the demo.
