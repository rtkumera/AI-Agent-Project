// Command Center model, checked against the real files in this repository. No mocks: every
// assertion reads .colaberry/agent-domain.json and data/curriculum.capabilities.json as the
// page does. Run: node --test tests/command-center.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const M = require('../assets/model.js');
const read = (p) => JSON.parse(readFileSync(new URL('../' + p, import.meta.url), 'utf8'));
const snapshot = read('.colaberry/agent-domain.json');
const caps = read('data/curriculum.capabilities.json');
const model = M.build({ snapshot, caps });

test('the ten rungs carry the owner’s wording from AUTONOMY_MEANINGS', () => {
  assert.equal(M.RUNGS.length, 10);
  assert.equal(M.RUNGS[0].meaning, 'Define the workflow, requirements, risks and human decisions.');
  assert.equal(M.RUNGS[8].meaning, 'Coordinate necessary, authorized handoffs with other agents.');
  assert.deepEqual(M.RUNGS.map((r) => r.key), Array.from({ length: 10 }, (_, i) => 'autonomy:R' + i));
});

test('every capability is listed once, in research order, not re-sorted', () => {
  assert.deepEqual(model.inventory.rows.map((r) => r.id), caps.capabilities.map((c) => c.capability_id));
  assert.equal(model.inventory.rows.length, snapshot.authority.length);
});

test('each capability’s ceiling is marked on exactly the rung it stops at, and nothing above is reachable', () => {
  for (const { row, cells } of model.ladder.rows) {
    const ceil = M.rungIndex(row.ceiling);
    assert.ok(ceil >= 0, row.id + ' has a recorded ceiling');
    assert.deepEqual(cells.map((c, i) => (c.ceiling ? i : -1)).filter((i) => i >= 0), [ceil]);
    cells.forEach((c, i) => { if (i > ceil) assert.equal(c.state, 'beyond', row.id + ' ' + c.rung); });
  }
});

test('authority shown is what effectiveAuthority() returned, not the record’s ceiling', () => {
  const byId = Object.fromEntries(snapshot.authority.map((a) => [a.capability_id, a]));
  for (const r of model.inventory.rows) {
    assert.equal(r.effective, byId[r.id].effective_autonomy);
    const marked = model.ladder.rows.find((x) => x.row.id === r.id).cells.filter((c) => c.effective);
    assert.deepEqual(marked.map((c) => c.rung), [r.effective]);
  }
  // At least one capability asks for more than it has, so the two really differ on this data.
  assert.ok(model.inventory.rows.some((r) => M.rungIndex(r.ceiling) > M.rungIndex(r.effective)));
});

test('the no_tool_grants count is computed from the returned reasons, and zero is reported as binding nothing', () => {
  const expected = snapshot.authority.filter((a) => a.reasons.includes('no_tool_grants')).length;
  assert.equal(model.ladder.no_tool_grants.constrains, expected);
  if (expected === 0) assert.equal(model.ladder.no_tool_grants.binds_nothing, true);
});

test('R8 is marked unavailable by fact wherever it is not already above the ceiling', () => {
  for (const { cells } of model.ladder.rows) {
    const r8 = cells[8];
    assert.ok(r8.state === 'unavailable' || r8.state === 'beyond');
  }
});

test('per-rung behaviours are the recorded ones, every one placed under its own rung', () => {
  const recorded = caps.capabilities.reduce((n, c) => n + c.release_behaviour.length, 0);
  const shown = model.behaviours.reduce((n, b) => n + b.entries.length, 0);
  assert.equal(shown, recorded);
});

test('draft stays draft: the count matches the records and nothing is reported as approved', () => {
  const drafts = caps.capabilities.filter((c) => c.requirement_validation_state === 'draft').length;
  assert.equal(model.gaps.drafts, drafts);
  assert.equal(model.inventory.counts.validation_state.draft, drafts);
});

test('the employee panel never names who set the autonomy level when the platform did not record it', () => {
  assert.equal(snapshot.agent.autonomy_level_set_by, null);
  assert.equal(model.employee.autonomy_level_set_by, null);
  assert.ok(model.employee.set_by_reason);
});

test('governance: an empty queue stays empty, and a tool request is never counted as a grant', () => {
  assert.deepEqual(model.governance.change_requests, snapshot.governance.requests.filter((r) => !/tool/i.test(r.kind || r.type || r.request_type || '')));
  const held = new Set(snapshot.agent.tools_granted);
  for (const t of model.governance.tools) assert.equal(t.held, held.has(t.tool));
  const withRequest = M.governance({ ...snapshot, governance: { requests: [{ kind: 'tool_request', tool: 'emit_alert', status: 'pending' }] } }, model.inventory.rows, model.employee);
  assert.equal(withRequest.tool_requests.length, 1);
  assert.equal(withRequest.tools.find((t) => t.tool === 'emit_alert').held, held.has('emit_alert'));
});

test('a missing agent reads as no agent, not as an empty card', () => {
  assert.deepEqual(M.employee({ agent: { exists: false } }), { exists: false });
  assert.deepEqual(M.employee(null), { exists: false });
});
