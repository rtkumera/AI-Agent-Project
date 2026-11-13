# curriculum.CAP.da_curriculum_analytics_transition — Data Analyst curriculum and certification reporting duties transitioning to AI

**CANDIDATE -- not started, not assigned.** This is one line on this domain's list of everything its agent could eventually do. It becomes real work only when the builder picks it and their manager agrees, at which point it opens as four stories. Until then it is deliberately inert, and the honest status of it is "not started" rather than "behind".

unknown: the business outcome cannot be stated because the duties this capability would absorb have never been written down

**Built today:** unknown. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- the Data Analyst duty list for this domain does not exist in the repository: this capability cannot be scoped, sized or promoted until the interview happens
- the scope amendment document the execution contract cites as the source for DA transition work is not in the repository and was not attached
- no Data Analyst is identified as assigned to the curriculum domain anywhere

Full build prompt is attached to this story.

**Release:** autonomy:R0 · Legacy migration plan (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Data Analyst curriculum and certification reporting duties transitioning to AI
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.da_curriculum_analytics_transition`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** unknown · **Source:** proposed_new
## The business outcome
unknown: the business outcome cannot be stated because the duties this capability would absorb have never been written down
Intended users: Swati Raman (accountable manager), unknown: the Data Analyst for this domain is not identified in the repository.
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- Interview the Data Analyst and Swati and enumerate each recurring curriculum or certification report by name.
- For each, record its recipient, its cadence, its timezone and its channel.
- Only then decide which are candidates for AI and which stay human.
**Inputs**
- unknown: the Data Analyst duty list for the curriculum domain does not exist in the repository
**Outputs**
- unknown: cannot be stated without the duty list
**Exceptions that must be handled**
- No document in this repository enumerates Data Analyst duties for the curriculum domain, or for any domain. This was independently verified across the 34 files of docs/architecture/ai-workforce-management, every curriculum employee doc, and the whole docs tree.
- A Data Analyst Agent does exist in the repository but it is an unrelated deterministic SQL-label enrichment helper, not an owner of reporting duties, and must not be mistaken for this capability.
- No report-definition object exists anywhere that combines what to report on, who receives it, how often, in what timezone and over which channel.
- The only Data-Analyst-to-person link in the repository is a persona label in a mockup, which is not a responsibility list.
- Until the duty list exists, no scope, no count and no autonomy ceiling above R0 can be set honestly.
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
_none recorded_
**Application surfaces**
- unknown
- unknown
**Source modules**
- unknown
**Dependencies**
- a human interview that produces the duty list
- unknown: whether a Data Analyst is assigned to this domain at all
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R0**.
Why that ceiling: An autonomy ceiling over an undefined scope would be a fabrication. autonomy:R0 is deliberately the lowest ceiling in this matrix and stays there until a human interview produces the duty list. R0 is itself the work: define the workflow, the risks and the human decisions.

**THIS IS A HUMAN DECISION.** It stays human-required at every autonomy level, forever. An
agent may prepare, summarise and propose; it may never decide. No amount of evidence
promotes this into automation.
**First release behaviour (autonomy:R0)**
Interview the Data Analyst and Swati; enumerate each recurring curriculum and certification report with its recipient, cadence, timezone and channel.

Acceptance: A written duty list exists, authored from a human interview, naming each report and its recipient. Until it does, every field of this capability stays unknown.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- the Data Analyst duty list for this domain does not exist in the repository: this capability cannot be scoped, sized or promoted until the interview happens
- the scope amendment document the execution contract cites as the source for DA transition work is not in the repository and was not attached
- no Data Analyst is identified as assigned to the curriculum domain anywhere
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- docs/architecture/ai-workforce-management/REPORTING_MAP.md:15
- .loop-architect/runs/20261007-school-agent-factory/capabilities/sales.json:3770
- .loop-architect/runs/20261007-school-agent-factory/execution-contract.md:45
- docs/agent-catalog/assistant/data-analyst-agent.md:1
- docs/admin-knowledge-ops-mockup.html:883

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] A written duty list exists, authored from a human interview, naming each report and its recipient. Until it does, every field of this capability stays unknown.

When every box above is ticked, stop and show the demo.
