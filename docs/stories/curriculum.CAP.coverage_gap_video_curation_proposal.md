# curriculum.CAP.coverage_gap_video_curation_proposal — Proposing curated videos to close a specific competency coverage gap

A competency a week promises but nothing teaches gets concrete, reviewed video candidates attached to it, so closing a gap is a decision a human makes from real options rather than a search they run themselves.

**Built today:** implemented. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- backend/src/services/delivery/execution/executionPolicy.ts:33 denies push_to_protected_main and production_deploy, which the apply half ultimately depends on to reach real students
- no measured relevance signal exists: nothing records whether a human applied or rejected a proposed video
- a third-party video's continued availability is outside Colaberry's control, which is why link health is monitored separately

Full build prompt is attached to this story.

**Release:** r2 · r2 (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Proposing curated videos to close a specific competency coverage gap
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.coverage_gap_video_curation_proposal`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** implemented · **Source:** existing_application
## The business outcome
A competency a week promises but nothing teaches gets concrete, reviewed video candidates attached to it, so closing a gap is a decision a human makes from real options rather than a search they run themselves.
Intended users: Swati Raman (accountable manager), curriculum staff, students (as the eventual recipients).
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- Take the ranked gap list as the only input for what to search for.
- Search and rank candidates per gap competency.
- Present candidates to a human; curate and apply are deliberately two separate calls.
- On apply, publish the new video cards through the same audited publish bridge.
**Inputs**
- the ranked coverage gap list for the blueprint
- YouTube search results
- the week's topic and level
**Outputs**
- candidate videos per gap competency
- on a human's apply, new video cards published to the timeline
**Exceptions that must be handled**
- Curate and apply are separate endpoints on purpose: proposing a video and putting it in front of students are different acts.
- Applying a video card is publishing curriculum to learners and is a human decision.
- A third-party video can be removed, age out, or change meaning after it is applied, which is why video link health monitoring exists as a separate capability.
- A video that matches a competency keyword is not evidence that it teaches the competency well.
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- youtube_data_api_read
- read_curriculum_blueprints
- propose_curriculum_patch
- emit_structured_log
**Application surfaces**
- /admin/orchestration composer video curation panel
- POST /api/admin/composer/blueprints/:id/curate-videos
- POST /api/admin/composer/blueprints/:id/apply-videos
**Source modules**
- backend/src/services/composer/videoCurationService.ts
- backend/src/services/composer/youtubeClient.ts
- backend/src/services/composer/publishService.ts
**Dependencies**
- the coverage gap list
- YouTube Data API availability and quota
- the publish bridge
- a human to apply
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R5**.
Why that ceiling: The curate half is a read-only proposal, but the apply half puts third-party content in front of learners, which makes the capability human-decided and caps it at autonomy:R5. The agent's role ends at the proposal; applying needs the publish path, which itself needs default-denied capabilities.

**THIS IS A HUMAN DECISION.** It stays human-required at every autonomy level, forever. An
agent may prepare, summarise and propose; it may never decide. No amount of evidence
promotes this into automation.
**First release behaviour (autonomy:R0)**
Record that curate and apply are separate acts and that only a human applies.

Acceptance: Swati states who applies a video and what happens if it is later removed.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- backend/src/services/delivery/execution/executionPolicy.ts:33 denies push_to_protected_main and production_deploy, which the apply half ultimately depends on to reach real students
- no measured relevance signal exists: nothing records whether a human applied or rejected a proposed video
- a third-party video's continued availability is outside Colaberry's control, which is why link health is monitored separately
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- backend/src/services/composer/videoCurationService.ts
- backend/src/services/composer/youtubeClient.ts
- backend/src/services/composer/coverageGapEngine.ts:19
- backend/src/services/composer/publishService.ts:98
- backend/src/services/composer/optimizationEngine.ts:20
- backend/src/routes/admin/composerRoutes.ts:26
- backend/src/routes/admin/composerRoutes.ts:27
- backend/src/services/timeline/networkVideoService.ts

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] Swati states who applies a video and what happens if it is later removed.

When every box above is ticked, stop and show the demo.
