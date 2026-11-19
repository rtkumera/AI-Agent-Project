# STORY-000 evidence: Command Center (curriculum)

For Swati Raman to evaluate. Each criterion points at a named passing test, a screenshot taken beside the source it was built from, or a file:line. Nothing here relies on the story being marked complete, on elapsed time, on a conversation, or on a mocked test.

**Page:** `index.html`, rendered from `assets/model.js` (logic) and `assets/app.js` (drawing).
**Run it:** from the repository root, run `python3 -m http.server`, then open `http://localhost:8000/`. Opening the file straight from disk makes every panel show its error state, because browsers block file reads from a page opened that way.
**Tests:** `node --test tests/command-center.test.mjs`. There are 11 tests and all pass. They read the real files below; nothing is mocked.

## What the page was built from

| Panel | Endpoint the brief names | What this repo actually holds |
|---|---|---|
| 1 Employee | `GET /api/admin/agent-domains-mine` | `.colaberry/agent-domain.json` → `agent`, synced by the platform |
| 2 Inventory | `GET /api/admin/agent-domains/curriculum`, `…/coverage` | `data/curriculum.capabilities.json`: an extract of `backend/src/services/agentDomain/capabilities/curriculum.json` at platform `a284987c0`, the file both handlers load (`capabilityRecord.ts:117`, `:133-135`), made by `scripts/extract_capabilities.py` |
| 3 Ladder | the same two, plus authority | the capability extract for ceilings; `.colaberry/agent-domain.json` → `authority[]` for what `effectiveAuthority()` returned |
| 4 Per-rung behaviour | `GET /api/admin/agent-domains/curriculum` | `release_behaviour[]` in the capability extract |
| 5 Governance | `GET /api/admin/agent-domain-change-requests-mine` | `.colaberry/agent-domain.json` → `governance` |
| 6 Not available | all of the above | all of the above |

The page doesn't call the endpoints live. They need an admin token on the platform's own origin, so the page reads the copies above and says so on every panel.

## Criteria

1. **All six panels render, and each names the endpoint it read.** See `01-page-top.png` through `05-06-governance-gaps.png`. Each panel has a "Reads GET …" line with a "via" line under it.
2. **An empty answer is said in words and looks different from loading.** Compare `state-loading.png` (grey bars, "Loading — reading …") with `state-empty.png` (dashed border, "∅ No agent appears for this domain"). The real governance queue is empty, and panel 5 shows "None filed" in the empty style (`05-06-governance-gaps.png`). `state-error.png` shows the third state.
3. **All ten rungs, in the owner's wording, with each ceiling marked.** See `03-ladder.png`. Tests: *the ten rungs carry the owner's wording from AUTONOMY_MEANINGS* and *each capability's ceiling is marked on exactly the rung it stops at, and nothing above is reachable*.
4. **Effective authority, not the requested level, and the `no_tool_grants` count stated in words when it is zero.** See `03-ladder.png`: "The no_tool_grants rule constrains 0 capabilities of 38 today. It binds nothing, because…". Tests: *authority shown is what effectiveAuthority() returned, not the record's ceiling* and *the no_tool_grants count is computed from the returned reasons…*. Rule: `autonomyLadder.ts:207-211`.
5. **Nothing implies that filing a tool request granted anything.** See `05-06-governance-gaps.png`. Every tool-request row reads "A request. Filing it granted nothing." (`assets/app.js`, `reqTable`). The tools table says it is not a request list. Test: *governance: an empty queue stays empty, and a tool request is never counted as a grant*.
6. **No panel shows a number, grant, rung or result the domain hasn't produced.** Every figure is computed from the files in the table above; there is no sample data (the old `assets/sample.js` was deleted). Values that aren't recorded render as "Not recorded" or "Not set". Panel 6 lists what was left blank. Test: *the employee panel never names who set the autonomy level when the platform did not record it*.

## Found while building

- **The brief and the agent row disagree about tools.** The brief says none of the listed tools is granted. The agent row holds `escalate_to_human` and `scan_curriculum_integrity`, and both are named by capabilities. The page shows the agent row and flags the disagreement in panel 6.
- **The employee isn't marked on the R0–R9 ladder.** The brief asks for the employee's rung to be marked. The platform's own record (`agent-domain.json` → `autonomy_models.warning`) says the employee level (`communicate`) is on a different scale and must never be placed on the capability ladder. The page follows the record and says so in panel 3.
- **The data was a snapshot.** Data last changed 13 Nov 2026, 22:49 UTC (`.colaberry/manifest.json`). The capability extract is from platform commit `a284987c0`.
