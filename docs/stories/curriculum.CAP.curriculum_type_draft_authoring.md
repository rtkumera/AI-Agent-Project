# curriculum.CAP.curriculum_type_draft_authoring — Authoring a curriculum type as a draft Experience Studio component

**CANDIDATE -- not started, not assigned.** This is one line on this domain's list of everything its agent could eventually do. It becomes real work only when the builder picks it and their manager agrees, at which point it opens as four stories. Until then it is deliberately inert, and the honest status of it is "not started" rather than "behind".

A new kind of learning activity can be defined once - its parts, its generation prompt, its contracts, its render band - as a draft that is reviewable before any student sees it, instead of being improvised per week.

**Built today:** implemented. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- the slug is an immutable FK: a rename orphans real student data, and nothing in the schema prevents one
- the boot type seeder re-asserts registry metadata for the canonical slugs and silently reverts API edits, so a draft can be undone by a restart (.claude/skills/build-curriculum-type/SKILL.md durability section)
- preview caps at 1800 tokens while the real student path uses 3200 and returns a different field subset, so preview is not the student runtime
- nothing asserts per-content competencies against the controlled crosswalk

Full build prompt is attached to this story.

**Release:** autonomy:R0 · Legacy migration plan (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Authoring a curriculum type as a draft Experience Studio component
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.curriculum_type_draft_authoring`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** implemented · **Source:** existing_application
## The business outcome
A new kind of learning activity can be defined once - its parts, its generation prompt, its contracts, its render band - as a draft that is reviewable before any student sees it, instead of being improvised per week.
Intended users: Swati Raman (accountable manager), curriculum staff, Ali Muwwakkil (DRI).
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- GET the slug first; a 404 means create, a 200 means read the existing label and render band before touching anything.
- Create at status draft, or update only the whitelisted editable fields.
- Write every JSONB contract explicitly, never omitted.
- Preview against a real week and read the render in the drawer's actual shape.
- Stop at draft. Approval and promotion are a separate capability.
**Inputs**
- a name, which slugifies to the immutable idempotency key, and a one-line intent
- a render band that already has a renderer
- the week blueprint context injected into the generation prompt
- competency ids from the controlled crosswalk
**Outputs**
- a curriculum_type_definitions row at status draft, approved false
- an auto-snapshotted prior version and a bumped component_version on update
- the parts, generation prompt, input and output contracts and completion rules
**Exceptions that must be handled**
- The slug is an immutable foreign key for timeline_cards.type and all analytics; renaming one orphans real student data.
- A display label can diverge from its slug, so the slug must be read before assuming a type is new.
- A new row in the type registry carries five obligations, four of which only fail in CI and one - a real thumbnail file on disk - which cannot be deferred at all.
- A competency id outside the controlled crosswalk maps to nothing and credits zero skills while looking complete.
- A brand-new visual experience is code, not data, and must not be faked inside body_html.
- status is an unconstrained STRING(20) with its legal values only in a comment.
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- component_api_read
- component_api_write_draft
- read_competency_crosswalk
- openai_llm_completion
- render_component_preview
- emit_structured_log
**Application surfaces**
- /admin/orchestration Experience Studio tab
- /admin/orchestration CurriculumTypesTab
- /admin/orchestration studio sandbox and student preview
- POST and GET /api/admin/components
- GET and PUT /api/admin/components/:slug
- POST /api/admin/components/generate
- POST /api/admin/components/:slug/preview
- POST /api/admin/components/:slug/codesign
- GET /api/admin/components/:slug/versions
- POST /api/admin/orchestration/curriculum-types
**Source modules**
- backend/src/services/components/componentService.ts
- backend/src/services/components/componentAiService.ts
- backend/src/services/timeline/typeRegistry.ts
- backend/src/seeds/seedComponentAuthoring.ts
**Dependencies**
- timeline typeRegistry, which re-asserts registry metadata for the canonical slugs on boot and silently reverts API edits
- the CAPE policy group assignment
- competencySkillCrosswalk
- a thumbnail asset on disk
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R4**.
Why that ceiling: A type definition determines the shape of a learning activity, so it is human-decided. R4 permits stateful multi-step draft authoring in sandbox, which is genuinely where this work lives. R5 is withheld because the preview is a lower-fidelity approximation of the real student card, so a shadow comparison would be measuring the wrong artifact.

**THIS IS A HUMAN DECISION.** It stays human-required at every autonomy level, forever. An
agent may prepare, summarise and propose; it may never decide. No amount of evidence
promotes this into automation.
**First release behaviour (autonomy:R0)**
Record the five registry obligations, the slug immutability rule, and that draft is where the agent stops.

Acceptance: Swati states why a slug can never be renamed and who approves a type.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- the slug is an immutable FK: a rename orphans real student data, and nothing in the schema prevents one
- the boot type seeder re-asserts registry metadata for the canonical slugs and silently reverts API edits, so a draft can be undone by a restart (.claude/skills/build-curriculum-type/SKILL.md durability section)
- preview caps at 1800 tokens while the real student path uses 3200 and returns a different field subset, so preview is not the student runtime
- nothing asserts per-content competencies against the controlled crosswalk
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- backend/src/models/CurriculumTypeDefinition.ts:307
- backend/src/models/CurriculumTypeDefinition.ts:278
- backend/src/models/CurriculumTypeDefinition.ts:240
- backend/src/services/components/componentService.ts
- backend/src/services/components/componentAiService.ts
- backend/src/services/components/versionDiffService.ts
- backend/src/routes/admin/componentRoutes.ts:44
- backend/src/routes/admin/componentRoutes.ts:51
- .claude/skills/build-curriculum-type/SKILL.md

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] Swati states why a slug can never be renamed and who approves a type.

When every box above is ticked, stop and show the demo.
