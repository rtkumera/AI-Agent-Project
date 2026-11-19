// Command Center model: pure functions from source documents to what each panel shows.
// No DOM, no fetch, no defaults. A value the sources do not carry comes back as null and the
// page labels it; nothing here invents a plausible example. Shared by the page and by
// tests/command-center.test.mjs, so the test exercises the same code the page runs.
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.CCModel = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // The owner's own words, copied from AUTONOMY_MEANINGS (autonomyLadder.ts:58-69).
  var RUNGS = [
    ['R0', 'Define the workflow, requirements, risks and human decisions.'],
    ['R1', 'Prepare isolated development, fixtures and baseline tests.'],
    ['R2', 'Answer questions using approved knowledge and records.'],
    ['R3', 'Perform approved, user-initiated sandbox tool operations.'],
    ['R4', 'Execute and verify stateful, multi-step sandbox tasks.'],
    ['R5', 'Evaluate in shadow mode against approved reference outcomes.'],
    ['R6', 'Conduct a separately approved, supervised production pilot.'],
    ['R7', 'Automate only explicitly authorized action classes within limits.'],
    ['R8', 'Coordinate necessary, authorized handoffs with other agents.'],
    ['R9', 'Demonstrate reliable operation, monitoring, recovery and ownership.'],
  ].map(function (r, i) { return { index: i, short: r[0], key: 'autonomy:' + r[0], meaning: r[1] }; });

  // promotionCriteria.ts:46-51. Shown so progress on this page is never read as authority.
  var NON_PROMOTING_SIGNALS = [
    ['story_completed', 'a story marked complete'],
    ['elapsed_time', 'time passing'],
    ['successful_conversation', 'a conversation that went well'],
    ['mocked_tests_passed', 'a mocked test passing'],
  ];

  // R8 needs a second agent to hand off to. None exists on the platform today
  // (daraHandoffService.ts:13-15), so the rung is unavailable by fact, not by anyone's choice.
  var UNAVAILABLE_BY_FACT = 'autonomy:R8';

  function rungIndex(key) {
    for (var i = 0; i < RUNGS.length; i++) if (RUNGS[i].key === key) return i;
    return -1;
  }

  function has(v) { return v !== null && v !== undefined && v !== ''; }

  function employee(snapshot) {
    var a = snapshot && snapshot.agent;
    if (!a || a.exists === false) return { exists: false };
    var notRecorded = (snapshot.not_recorded || []).filter(function (n) { return n.field === 'agent.autonomy_level_set_by'; })[0];
    return {
      exists: true,
      agent_id: has(a.agent_id) ? a.agent_id : null,
      display_name: has(a.display_name) ? a.display_name : null,
      enabled: typeof a.enabled === 'boolean' ? a.enabled : null,
      autonomy_level: has(a.autonomy_level) ? a.autonomy_level : null,
      autonomy_level_set_at: has(a.autonomy_level_set_at) ? a.autonomy_level_set_at : null,
      autonomy_level_source: has(a.autonomy_level_source) ? a.autonomy_level_source : null,
      autonomy_level_set_by: has(a.autonomy_level_set_by) ? a.autonomy_level_set_by : null,
      set_by_reason: notRecorded ? notRecorded.reason : null,
      tools_granted: Array.isArray(a.tools_granted) ? a.tools_granted.slice() : null,
      tools_granted_count: typeof a.tools_granted_count === 'number' ? a.tools_granted_count : null,
      agent_scale: snapshot.autonomy_models ? snapshot.autonomy_models.agent_level : null,
      scale_warning: snapshot.autonomy_models ? snapshot.autonomy_models.warning : null,
    };
  }

  function authorityById(snapshot) {
    var map = {};
    ((snapshot && snapshot.authority) || []).forEach(function (a) { map[a.capability_id] = a; });
    return map;
  }

  // One row per capability, in the order research recorded them. Authority is what
  // effectiveAuthority() returned (snapshot.authority), never the record's own request.
  function inventory(caps, snapshot) {
    var auth = authorityById(snapshot);
    return ((caps && caps.capabilities) || []).map(function (c, i) {
      var a = auth[c.capability_id] || null;
      return {
        n: i + 1,
        id: c.capability_id,
        name: has(c.name) ? c.name : null,
        classification: has(c.classification) ? c.classification : null,
        implementation_state: has(c.implementation_state) ? c.implementation_state : null,
        validation_state: has(c.requirement_validation_state) ? c.requirement_validation_state : null,
        starting_autonomy: has(c.starting_autonomy) ? c.starting_autonomy : null,
        ceiling: has(c.max_permitted_autonomy) ? c.max_permitted_autonomy : null,
        ceiling_reason: (a && has(a.ceiling_reason)) ? a.ceiling_reason : (has(c.max_autonomy_rationale) ? c.max_autonomy_rationale : null),
        human_decision: c.human_decision === true,
        effective: a ? a.effective_autonomy : null,
        approved: a ? a.approved_autonomy : null,
        reasons: a ? (a.reasons || []) : null,
        has_authority_row: !!a,
        required_tools: Array.isArray(c.required_tools) ? c.required_tools : [],
        release_behaviour: Array.isArray(c.release_behaviour) ? c.release_behaviour : [],
      };
    });
  }

  function countBy(rows, key) {
    var out = {};
    rows.forEach(function (r) { var k = r[key] === null ? 'not recorded' : String(r[key]); out[k] = (out[k] || 0) + 1; });
    return out;
  }

  // Each cell of the ladder matrix, for one capability.
  function ladderCells(row) {
    var ceil = rungIndex(row.ceiling);
    var eff = rungIndex(row.effective);
    return RUNGS.map(function (r) {
      var cell = { rung: r.key, effective: r.index === eff, ceiling: r.index === ceil };
      if (ceil < 0) cell.state = 'unknown';
      else if (r.index > ceil) cell.state = 'beyond';
      else cell.state = 'reachable';
      if (r.key === UNAVAILABLE_BY_FACT && cell.state !== 'beyond') cell.state = 'unavailable';
      return cell;
    });
  }

  function ladder(rows, snapshot) {
    var rule = (snapshot && snapshot.authority_rule) || null;
    var constrained = rows.filter(function (r) { return r.reasons && r.reasons.indexOf('no_tool_grants') !== -1; });
    return {
      rungs: RUNGS.map(function (r) {
        return {
          key: r.key, short: r.short, meaning: r.meaning,
          ceilings_here: rows.filter(function (x) { return x.ceiling === r.key; }).length,
          effective_here: rows.filter(function (x) { return x.effective === r.key; }).length,
          unavailable_by_fact: r.key === UNAVAILABLE_BY_FACT,
        };
      }),
      rows: rows.map(function (r) { return { row: r, cells: ladderCells(r) }; }),
      no_tool_grants: {
        rule: rule ? rule.rule : null,
        constrains: constrained.length,
        constrained_ids: constrained.map(function (r) { return r.id; }),
        approved_above_r2: rule && typeof rule.approved_above_r2 === 'number' ? rule.approved_above_r2 : null,
        binds_nothing: rule ? rule.binds_nothing === true : null,
        note: rule ? rule.note : null,
      },
      without_effective: rows.filter(function (r) { return !has(r.effective); }).map(function (r) { return r.id; }),
    };
  }

  function behaviours(rows) {
    return RUNGS.map(function (r) {
      var entries = [];
      rows.forEach(function (row) {
        row.release_behaviour.forEach(function (b) {
          if (b.autonomy === r.key) entries.push({ id: row.id, name: row.name, behaviour: b.behaviour, acceptance: b.acceptance_criteria });
        });
      });
      return { key: r.key, short: r.short, meaning: r.meaning, entries: entries };
    });
  }

  function isToolRequest(req) {
    var kind = String(req.kind || req.type || req.request_type || '').toLowerCase();
    return kind.indexOf('tool') !== -1;
  }

  function governance(snapshot, rows, emp) {
    var g = (snapshot && snapshot.governance) || null;
    var requests = g && Array.isArray(g.requests) ? g.requests : null;
    var granted = emp.exists && emp.tools_granted ? emp.tools_granted : [];
    var need = {};
    rows.forEach(function (r) {
      r.required_tools.forEach(function (t) { (need[t] = need[t] || []).push(r.name || r.id); });
    });
    var tools = Object.keys(need).map(function (t) {
      return { tool: t, needed_by: need[t], held: granted.indexOf(t) !== -1 };
    }).sort(function (a, b) { return b.needed_by.length - a.needed_by.length || (a.tool < b.tool ? -1 : 1); });
    return {
      known: !!g,
      disclosure: g ? g.disclosure : null,
      pending: g && typeof g.pending === 'number' ? g.pending : null,
      change_requests: requests ? requests.filter(function (r) { return !isToolRequest(r); }) : null,
      tool_requests: requests ? requests.filter(isToolRequest) : null,
      tools: tools,
      held_not_named: granted.filter(function (t) { return !need[t]; }),
    };
  }

  function gaps(rows, gov, emp) {
    var drafts = rows.filter(function (r) { return r.validation_state === 'draft'; });
    var emptyRb = rows.filter(function (r) { return r.release_behaviour.length === 0; });
    var r8able = rows.filter(function (r) { return rungIndex(r.ceiling) >= rungIndex(UNAVAILABLE_BY_FACT); });
    var stopsShort = rows.filter(function (r) {
      var top = -1;
      r.release_behaviour.forEach(function (b) { top = Math.max(top, rungIndex(b.autonomy)); });
      return r.release_behaviour.length > 0 && top < rungIndex(r.ceiling);
    }).map(function (r) {
      var top = -1;
      r.release_behaviour.forEach(function (b) { top = Math.max(top, rungIndex(b.autonomy)); });
      return { id: r.id, name: r.name, written_to: RUNGS[top].key, ceiling: r.ceiling };
    });
    var heldNeeded = gov.tools.filter(function (t) { return t.held; }).map(function (t) { return t.tool; });
    return {
      total: rows.length,
      drafts: drafts.length,
      empty_release_behaviour: emptyRb.map(function (r) { return r.id; }),
      ceilings_at_or_above_r8: r8able.length,
      stops_short: stopsShort,
      held_needed_tools: heldNeeded,
      agent_name_missing: emp.exists && !emp.display_name,
      set_by_missing: emp.exists && !emp.autonomy_level_set_by,
    };
  }

  function build(src) {
    var emp = employee(src.snapshot);
    var rows = inventory(src.caps, src.snapshot);
    var gov = governance(src.snapshot, rows, emp);
    return {
      employee: emp,
      inventory: {
        rows: rows,
        counts: {
          classification: countBy(rows, 'classification'),
          implementation_state: countBy(rows, 'implementation_state'),
          validation_state: countBy(rows, 'validation_state'),
          human_decision: rows.filter(function (r) { return r.human_decision; }).length,
        },
      },
      ladder: ladder(rows, src.snapshot),
      behaviours: behaviours(rows),
      governance: gov,
      gaps: gaps(rows, gov, emp),
    };
  }

  return {
    RUNGS: RUNGS,
    NON_PROMOTING_SIGNALS: NON_PROMOTING_SIGNALS,
    UNAVAILABLE_BY_FACT: UNAVAILABLE_BY_FACT,
    rungIndex: rungIndex,
    employee: employee,
    inventory: inventory,
    ladder: ladder,
    governance: governance,
    build: build,
  };
});
