# curriculum.CAP.presence_availability_signal — Reachability signal for the curriculum AI employee

A student or manager about to ask Dara something can see whether she is actually reachable, and the signal itself has a kill switch and a run counter instead of being an untracked cron.

**Built today:** partial. **Requirement validated:** draft -- Swati Raman must confirm scope, exceptions and success measures

**Blocked by**
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- the presence signal is content-free, a disclosed gap carried over from REESE_STANDARD_AUDIT.md gap 10 and not fixed by the generic extraction (daraPresenceHeartbeat.ts:6-9)
- presence green does not imply the DM reply path works, and nothing today asserts the two together

Full build prompt is attached to this story.

**Release:** r2 · r2 (weeks 0–0)
**Owner:** 
**Blocked by:** nothing — you can start this now

## The requirement this satisfies

_No requirement linked._

## How to build it

# Reachability signal for the curriculum AI employee
**Domain:** Curriculum, Learning & Certification (Dara) · **Capability:** `curriculum.presence_availability_signal`
**Accountable human:** Swati Raman · **Validation state:** draft
**Built today:** partial · **Source:** inherited
## The business outcome
A student or manager about to ask Dara something can see whether she is actually reachable, and the signal itself has a kill switch and a run counter instead of being an untracked cron.
Intended users: students, Swati Raman (accountable manager), platform operators.
## The human-operable process, as it works now
This must be operable by a person before an agent touches it. If a human cannot do it by hand
against the surfaces below, the agent version has nothing to stand on.
**Workflow**
- Resolve Dara's community member row by email.
- Touch last_active_at.
- Send no message, create no ticket, make no model call.
**Inputs**
- Dara's email as the identity key
**Outputs**
- an updated last_active_at on Dara's own CommunityMember row, and nothing else
**Exceptions that must be handled**
- Content-free by design: it records that she is up, never what she is doing. This is a disclosed gap inherited from the Reese standard audit, not a fixed one.
- A green presence dot does not mean the reply path is healthy; the two are independent.
- Running every minute, a single failure is invisible against 1,439 successes.
## The tool interface
**Tools this capability requires** (none is one of the eight default-denied capabilities;
anything that would need one is listed under blockers instead)
- write_presence_heartbeat
- emit_structured_log
**Application surfaces**
- student portal People panel
- /admin/agents/<Dara> overview
- internal cron only
**Source modules**
- backend/src/services/curriculum/daraPresenceHeartbeat.ts
- backend/src/services/agentBlueprint/agentPresenceHeartbeat.ts
**Dependencies**
- the generic agentPresenceHeartbeat mechanic
- Dara's CommunityMember row existing
## The agent behaviour that uses it
Starting autonomy **autonomy:R0**; ceiling **autonomy:R7**.
Why that ceiling: One write to the agent's own row, affecting nobody else's data and conveying no curriculum. R7 is permitted for that single authorized action class. R9 is withheld because no monitoring, recovery or ownership story exists for it: the signal is content-free and a failure is indistinguishable from idleness.

Not a human-reserved decision, but promotion is still evidence-based and one step at a time.
**First release behaviour (autonomy:R0)**
Record what the signal does and does not mean.

Acceptance: Swati can state that green means the process ran, not that Dara can answer.
## Before you start
- no approved_autonomy exists for any capability: effectiveAuthority() returns null with reason no_approved_autonomy (backend/src/services/agentDomain/autonomyLadder.ts:141-144)
- Swati Raman has confirmed no requirement in this matrix; every row is draft
- the presence signal is content-free, a disclosed gap carried over from REESE_STANDARD_AUDIT.md gap 10 and not fixed by the generic extraction (daraPresenceHeartbeat.ts:6-9)
- presence green does not imply the DM reply path works, and nothing today asserts the two together
## Evidence this is done
Cite the real thing: a named passing test, a measured figure with its query, or a file:line.
**None of these count:** this story being marked complete, elapsed time, a conversation that
went well, or a mocked test passing. Swati Raman evaluates the evidence, and
nothing here is validated yet.
## Evidence this capability rests on
- backend/src/services/curriculum/daraPresenceHeartbeat.ts:10
- backend/src/services/agentRegistrySeed.ts:2537
- backend/src/services/schedulerService.ts:1731
- backend/src/services/curriculum/repointLegacyBehaviors.ts:35
- backend/src/services/agentBlueprint/agentPresenceHeartbeat.ts

## Failure paths you must handle


## Acceptance — your stop condition

Tick each box as it genuinely passes. This file is yours — the platform reads
the same criteria out of `.colaberry/progress.json`, which Claude Code keeps in
step (see the managed block in CLAUDE.md). Ticking something you have not
actually met only misleads you.

- [ ] Swati can state that green means the process ran, not that Dara can answer.

When every box above is ticked, stop and show the demo.
