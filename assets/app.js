// Command Center renderer. Reads three files in this repository, runs them through
// assets/model.js, and draws six panels. Each panel is in exactly one of four states:
// loading, ok, empty (the source answered with nothing) or error (the source could not be read).
(function () {
  'use strict';
  var M = window.CCModel;

  var FILES = {
    snapshot: '.colaberry/agent-domain.json',
    manifest: '.colaberry/manifest.json',
    caps: 'data/curriculum.capabilities.json',
  };

  // ?state=loading|empty|error shows what each state looks like. It replaces every source, says
  // so in a banner, and shows no figures. It exists so the states can be checked by eye.
  var demo = (new URLSearchParams(location.search).get('state') || '').toLowerCase();

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  // The platform's own prose marks code with backticks; show those as code, everything else as text.
  function prose(s) { return esc(s).replace(/`([^`]+)`/g, '<code>$1</code>'); }
  function short(rung) { return rung ? String(rung).replace('autonomy:', '') : ''; }
  function when(iso) {
    var d = new Date(iso);
    if (isNaN(d)) return esc(iso);
    var mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getUTCMonth()];
    var hh = String(d.getUTCHours()).padStart(2, '0'), mm = String(d.getUTCMinutes()).padStart(2, '0');
    return d.getUTCDate() + ' ' + mon + ' ' + d.getUTCFullYear() + ', ' + hh + ':' + mm + ' UTC';
  }
  function plural(n, one, many) { return n + ' ' + (n === 1 ? one : (many || one + 's')); }

  function panel(id) { return document.getElementById(id); }
  function setState(id, state, html) {
    var p = panel(id);
    p.setAttribute('data-state', state);
    p.setAttribute('aria-busy', state === 'loading' ? 'true' : 'false');
    p.querySelector('.pb').innerHTML = html;
  }
  function addVia(id, html) {
    var r = panel(id).querySelector('.reads');
    var old = r.querySelector('.via');
    if (old) old.remove();
    r.insertAdjacentHTML('beforeend', '<span class="via">' + html + '</span>');
  }
  function loadingHtml(what) {
    return '<div class="state-loading" role="status"><span class="label">Loading — reading ' + esc(what) + '…</span><i></i><i></i><i></i></div>';
  }
  function emptyHtml(title, body) {
    return '<div class="state-empty"><h3>' + esc(title) + '</h3><p>' + body + '</p></div>';
  }
  function errorHtml(file, err) {
    return '<div class="state-error"><h3>Could not read ' + esc(file) + '</h3><p>' + esc(err) +
      '. Nothing is shown in its place. If you opened this file directly from disk, serve the repository folder over HTTP instead (for example <code>python3 -m http.server</code>), because browsers block file reads from a page opened that way.</p></div>';
  }

  var IDS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'];
  var WHAT = {
    p1: FILES.snapshot, p2: FILES.caps, p3: FILES.caps + ' and ' + FILES.snapshot,
    p4: FILES.caps, p5: FILES.snapshot, p6: 'every source',
  };
  IDS.forEach(function (id) { setState(id, 'loading', loadingHtml(WHAT[id])); });

  function get(path) {
    return fetch(path, { cache: 'no-store' }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status + ' for ' + path);
      return r.json();
    });
  }
  function settle(p) {
    return p.then(function (data) { return { ok: true, data: data }; },
      function (e) { return { ok: false, error: e && e.message ? e.message : String(e) }; });
  }

  function demoSources() {
    if (demo === 'empty') {
      return Promise.resolve([
        { ok: true, data: { agent: { exists: false }, authority: [], authority_rule: null, governance: { requests: [], pending: 0, disclosure: null } } },
        { ok: true, data: {} },
        { ok: true, data: { capabilities: [] } },
      ]);
    }
    if (demo === 'error') {
      return Promise.all(['__missing__/agent-domain.json', '__missing__/manifest.json', '__missing__/capabilities.json'].map(function (f) { return settle(get(f)); }));
    }
    return null;
  }

  var banner = document.getElementById('demo-banner');
  if (demo === 'loading' || demo === 'empty' || demo === 'error') {
    banner.hidden = false;
    banner.textContent = {
      loading: 'State check: every panel is held in its loading state. Nothing has been read.',
      empty: 'State check: every source has been replaced with an empty answer. Nothing below came from the platform.',
      error: 'State check: every source points at a file that does not exist. Nothing below came from the platform.',
    }[demo];
  }
  if (demo === 'loading') return;

  var sources = demoSources() || Promise.all([settle(get(FILES.snapshot)), settle(get(FILES.manifest)), settle(get(FILES.caps))]);
  sources.then(function (res) { render(res[0], res[1], res[2]); });

  function render(snap, man, caps) {
    var changed = man.ok && man.data.generated_at ? when(man.data.generated_at) : null;
    var capSrc = caps.ok && caps.data.source ? caps.data.source : null;
    var model = M.build({ snapshot: snap.ok ? snap.data : null, caps: caps.ok ? caps.data : null });

    var snapVia = 'via <code>' + FILES.snapshot + '</code>, which the platform writes into this repository on each sync' +
      (changed ? ' · last changed ' + changed : ' · last-changed time not available');
    var capVia = capSrc
      ? 'via <code>' + FILES.caps + '</code>, an extract of <code>' + esc(capSrc.file) + '</code> at platform commit <code>' + esc(capSrc.platform_commit) + '</code>, the file both handlers load (<code>' + esc(capSrc.loaded_by) + '</code>)'
      : 'via <code>' + FILES.caps + '</code>';

    meta(man, caps);
    progressRule();

    // ---------- 1. Employee ----------
    addVia('p1', snapVia);
    if (!snap.ok) setState('p1', 'error', errorHtml(FILES.snapshot, snap.error));
    else if (!model.employee.exists) {
      setState('p1', 'empty', emptyHtml('No agent appears for this domain',
        '<code>GET /api/admin/agent-domains-mine</code> returned no agent for <code>curriculum</code>. That is the answer, not a delay in loading.'));
    } else setState('p1', 'ok', employeeHtml(model.employee, caps.ok ? caps.data.agent_name : null));

    // ---------- 2. Inventory ----------
    addVia('p2', capVia);
    if (!caps.ok) setState('p2', 'error', errorHtml(FILES.caps, caps.error));
    else if (!model.inventory.rows.length) {
      setState('p2', 'empty', emptyHtml('No capabilities recorded',
        'The capability record for <code>curriculum</code> lists none. Nothing is drawn in their place.'));
    } else setState('p2', 'ok', inventoryHtml(model, snap.ok));

    // ---------- 3. Ladder ----------
    addVia('p3', capVia + '; effective authority ' + snapVia);
    if (!caps.ok) setState('p3', 'error', errorHtml(FILES.caps, caps.error));
    else if (!snap.ok) setState('p3', 'error', errorHtml(FILES.snapshot, snap.error));
    else if (!model.inventory.rows.length) {
      setState('p3', 'empty', emptyHtml('No capabilities to place on the ladder',
        'The ladder has ten rungs, but no capability is recorded, so there is no ceiling or effective rung to mark.') + rungsHtml(model));
    } else setState('p3', 'ok', ladderHtml(model));

    // ---------- 4. Behaviour ----------
    addVia('p4', capVia);
    if (!caps.ok) setState('p4', 'error', errorHtml(FILES.caps, caps.error));
    else if (!model.inventory.rows.length) {
      setState('p4', 'empty', emptyHtml('No per-rung behaviour recorded',
        'With no capabilities there is no <code>release_behaviour[]</code> to show.'));
    } else { setState('p4', 'ok', behaviourHtml(model)); wireBehaviour(model); }

    // ---------- 5. Governance ----------
    addVia('p5', snapVia);
    if (!snap.ok) setState('p5', 'error', errorHtml(FILES.snapshot, snap.error));
    else if (!model.governance.known) setState('p5', 'error', errorHtml(FILES.snapshot, 'The file has no governance block'));
    else {
      var g = model.governance;
      var none = !g.change_requests.length && !g.tool_requests.length;
      setState('p5', none ? 'empty' : 'ok', governanceHtml(g));
    }

    // ---------- 6. Gaps ----------
    if (!snap.ok || !caps.ok) {
      setState('p6', 'error', errorHtml(!snap.ok ? FILES.snapshot : FILES.caps, !snap.ok ? snap.error : caps.error));
    } else setState('p6', 'ok', gapsHtml(model, changed, capSrc));

    sourcesList(capSrc, changed);
  }

  function meta(man, caps) {
    var bits = [];
    if (caps.ok && caps.data.agent_name) bits.push('Employee <b>' + esc(caps.data.agent_name) + '</b>');
    if (caps.ok && caps.data.accountable_human) bits.push('Accountable human <b>' + esc(caps.data.accountable_human) + '</b>');
    if (caps.ok && caps.data.researched_at) bits.push('Capabilities researched <b>' + esc(caps.data.researched_at) + '</b>');
    if (man.ok && man.data.generated_at) bits.push('Platform data last changed <b>' + when(man.data.generated_at) + '</b>');
    document.getElementById('meta').innerHTML = bits.length
      ? bits.map(function (b) { return '<span>' + b + '</span>'; }).join('')
      : (man.ok || caps.ok ? 'The records read carry no domain details. See each panel.' : 'The platform\u2019s records could not be read. See each panel.');
  }

  function progressRule() {
    var list = M.NON_PROMOTING_SIGNALS.map(function (s) { return s[1]; });
    document.getElementById('rule-progress').innerHTML =
      'Four things never promote anything (<code>NON_PROMOTING_SIGNALS</code>): ' + esc(list.join(', ')) +
      '. A named human promotes, one rung at a time, on evidence.';
  }

  // ---------------------------------------------------------------- panel 1
  function fact(k, v, p, opts) {
    opts = opts || {};
    return '<div class="fact' + (opts.unrecorded ? ' unrecorded' : '') + '"><span class="k">' + esc(k) + '</span><span class="v' +
      (opts.mono ? ' mono' : '') + '">' + v + '</span>' + (p ? '<p>' + p + '</p>' : '') + '</div>';
  }
  function employeeHtml(e, recordName) {
    var html = '<div class="facts">';
    html += e.display_name
      ? fact('Agent name', esc(e.display_name))
      : fact('Agent name', 'Not set', '<code>display_name</code> is null in this response.' +
        (recordName ? ' The capability record names the employee <b>' + esc(recordName) + '</b>.' : ''), { unrecorded: true });
    html += e.enabled === null ? fact('Enabled', 'Not recorded', null, { unrecorded: true })
      : fact('Enabled', e.enabled ? 'Yes' : 'No', e.enabled ? 'The agent row is switched on.' : 'The agent row is switched off.');
    html += e.autonomy_level ? fact('Agent autonomy level', esc(e.autonomy_level),
      'On the employee scale' + (e.agent_scale ? ' (' + esc(e.agent_scale.split(' -- ')[0]) + ')' : '') + '. It is <b>not</b> a rung on the R0–R9 ladder in panel 3.')
      : fact('Agent autonomy level', 'Not recorded', null, { unrecorded: true });
    html += e.tools_granted_count === null ? fact('Tools granted', 'Not recorded', null, { unrecorded: true })
      : fact('Tools granted', String(e.tools_granted_count), 'Held by the agent row today. See panel 5 for which ones your capabilities name.');
    html += e.autonomy_level_set_at ? fact('Autonomy level last set', when(e.autonomy_level_set_at),
      e.autonomy_level_source ? 'Source recorded as <code>' + esc(e.autonomy_level_source) + '</code>.' : null)
      : fact('Autonomy level last set', 'Not recorded', null, { unrecorded: true });
    html += e.autonomy_level_set_by ? fact('Set by', esc(e.autonomy_level_set_by))
      : fact('Set by', 'Not recorded', e.set_by_reason ? prose(e.set_by_reason) : 'The response carries no name.', { unrecorded: true });
    html += e.agent_id ? fact('Agent id', esc(e.agent_id), null, { mono: true }) : '';
    html += '</div>';
    if (e.tools_granted && e.tools_granted.length) {
      html += '<p class="tally"><b>The ' + plural(e.tools_granted.length, 'granted tool') + ':</b> ' +
        e.tools_granted.map(function (t) { return '<code>' + esc(t) + '</code>'; }).join(' ') + '</p>';
    }
    return html;
  }

  // ---------------------------------------------------------------- panel 2
  function tallyLine(label, counts) {
    return '<span><b>' + esc(label) + ':</b> ' + Object.keys(counts).map(function (k) {
      return esc(k) + ' ' + counts[k];
    }).join(' · ') + '</span>';
  }
  function inventoryHtml(model, haveAuth) {
    var inv = model.inventory, rows = inv.rows;
    var html = '<div class="tally">' +
      '<span><b>' + rows.length + '</b> capabilities, in the order research recorded them</span>' +
      tallyLine('Validation', inv.counts.validation_state) +
      '<span><b>Human decision:</b> ' + inv.counts.human_decision + ' of ' + rows.length + '</span>' +
      tallyLine('Implementation', inv.counts.implementation_state) +
      tallyLine('Classification', inv.counts.classification) + '</div>';
    html += '<div class="tbox"><table class="inv"><thead><tr><th>#</th><th>Capability</th><th>Classification</th><th>Implementation</th><th>Validation</th><th>Starts</th><th>Ceiling</th><th>Effective authority</th><th>Human decision</th></tr></thead><tbody>';
    rows.forEach(function (r) {
      html += '<tr><td class="n">' + r.n + '</td><td>' + (r.name ? esc(r.name) : '<em>no name recorded</em>') + '<span class="id">' + esc(r.id) + '</span></td>' +
        '<td>' + cellText(r.classification) + '</td><td>' + cellText(r.implementation_state) + '</td>' +
        '<td>' + validationChip(r.validation_state) + '</td>' +
        '<td class="rung">' + cellText(short(r.starting_autonomy)) + '</td><td class="rung">' + cellText(short(r.ceiling)) + '</td>' +
        '<td class="rung">' + effectiveText(r, haveAuth) + '</td>' +
        '<td>' + (r.human_decision ? '<span class="chip human">Human decides</span>' : '<span class="muted">—</span>') + '</td></tr>';
    });
    html += '</tbody></table></div>';
    return html;
  }
  function cellText(v) { return v ? esc(v) : '<em class="muted">not recorded</em>'; }
  function validationChip(v) {
    if (v === 'draft') return '<span class="chip draft">draft · not agreed</span>';
    return v ? '<span class="chip plain">' + esc(v) + '</span>' : '<em class="muted">not recorded</em>';
  }
  function effectiveText(r, haveAuth) {
    if (!haveAuth) return '<em class="muted">not read</em>';
    if (!r.has_authority_row) return '<em class="muted">no authority row</em>';
    if (!r.effective) return 'none' + (r.reasons && r.reasons.length ? ' <span class="id">' + esc(r.reasons.join(', ')) + '</span>' : '');
    return esc(short(r.effective));
  }

  // ---------------------------------------------------------------- panel 3
  function rungsHtml(model) {
    var html = '<div class="rungs">';
    model.ladder.rungs.forEach(function (r) {
      html += '<div class="rungrow' + (r.unavailable_by_fact ? ' fact-off' : '') + '"><span class="rk">' + r.short + '</span><span>' + esc(r.meaning) + '</span>' +
        '<span class="rc">' + (r.ceilings_here === 1 ? '1 ceiling stops' : r.ceilings_here + ' ceilings stop') + ' here · ' + r.effective_here + ' effectively here</span>' +
        (r.unavailable_by_fact ? '<span class="why">Unavailable by fact, not by choice: there is no second agent on the platform to hand off to (daraHandoffService.ts:13-15).</span>' : '') +
        '</div>';
    });
    return html + '</div>';
  }
  function ladderHtml(model) {
    var L = model.ladder, n = L.rows.length, nt = L.no_tool_grants;
    var html = '<div class="note info"><b>The <code>no_tool_grants</code> rule constrains ' + plural(nt.constrains, 'capability', 'capabilities') + ' of ' + n + ' today.</b> ';
    if (nt.constrains === 0) {
      html += 'It binds nothing, because no capability in this domain has been approved above R2' +
        (nt.approved_above_r2 !== null ? ' (approved above R2: ' + nt.approved_above_r2 + ')' : '') +
        '. That is the real reason, not a missing rule or a panel that failed to load. ';
    } else {
      html += 'Each of these was approved above R2 with no tools granted and is held at R2: ' + nt.constrained_ids.map(function (i) { return '<code>' + esc(i) + '</code>'; }).join(', ') + '. ';
    }
    html += 'The rule, in <code>effectiveAuthority()</code> (autonomyLadder.ts:207-211): a capability approved above R2 with no tools granted is forced back down to R2.</div>';
    html += '<div class="note"><b>Your employee has no rung on this ladder.</b> Rungs belong to capabilities. The employee’s own level (panel 1) is on a separate scale, and the platform’s record says never to place one on the other. What is marked below is each capability’s effective rung: the authority <code>effectiveAuthority()</code> returned, not what the capability asks for.</div>';
    html += rungsHtml(model);
    html += '<div class="legend">' +
      '<span><i class="cell reachable"><i class="dot"></i></i>effective rung today</span>' +
      '<span><i class="cell reachable ceiling"></i>ceiling: where it stops</span>' +
      '<span><i class="cell reachable"></i>below the ceiling</span>' +
      '<span><i class="cell beyond"></i>above the ceiling: unreachable for this capability</span>' +
      '<span><i class="cell unavailable"></i>R8: unavailable by fact</span></div>';
    html += '<p class="muted" style="font-size:14px">Open a capability’s name to read why its ceiling is where it is.</p>';
    html += '<div class="tbox"><table class="matrix"><thead><tr><th class="cap">Capability</th><th class="eff">Effective</th>' +
      M.RUNGS.map(function (r) { return '<th class="r' + (r.key === M.UNAVAILABLE_BY_FACT ? ' off' : '') + '">' + r.short + '</th>'; }).join('') + '</tr></thead><tbody>';
    L.rows.forEach(function (x) {
      var r = x.row;
      html += '<tr><td class="cap"><details><summary>' + esc(r.name || r.id) + (r.human_decision ? ' <span class="chip human">Human decides</span>' : '') + '</summary>' +
        '<p><b>Ceiling ' + esc(short(r.ceiling) || 'not recorded') + '.</b> ' + (r.ceiling_reason ? prose(r.ceiling_reason) : 'No reason recorded.') + '</p></details></td>' +
        '<td class="eff">' + effectiveText(r, true) + '</td>';
      x.cells.forEach(function (c) {
        var label = c.rung.replace('autonomy:', '') + ': ' + (c.effective ? 'effective now; ' : '') + (c.ceiling ? 'ceiling; ' : '') + c.state;
        html += '<td class="c"><span class="cell ' + c.state + (c.ceiling ? ' ceiling' : '') + '" title="' + esc(label) + '" aria-label="' + esc(label) + '">' + (c.effective ? '<i class="dot"></i>' : '') + '</span></td>';
      });
      html += '</tr>';
    });
    html += '</tbody></table></div>';
    return html;
  }

  // ---------------------------------------------------------------- panel 4
  function behaviourHtml(model) {
    var opts = '<option value="">All ' + model.inventory.rows.length + ' capabilities</option>' +
      model.inventory.rows.map(function (r) { return '<option value="' + esc(r.id) + '">' + esc(r.name || r.id) + '</option>'; }).join('');
    var total = model.behaviours.reduce(function (n, b) { return n + b.entries.length; }, 0);
    return '<p class="tally"><span><b>' + total + '</b> per-rung behaviours, each with its own acceptance criteria, already written into the capability records. None is invented here.</span></p>' +
      '<div class="filter"><label for="rb-filter">Show</label><select id="rb-filter">' + opts + '</select></div>' +
      '<div id="rb-next"></div><div class="rbs" id="rb-list"></div>';
  }
  function wireBehaviour(model) {
    var sel = document.getElementById('rb-filter');
    function draw() {
      var id = sel.value, html = '';
      var row = model.inventory.rows.filter(function (r) { return r.id === id; })[0];
      var next = document.getElementById('rb-next');
      if (row) {
        var eff = M.rungIndex(row.effective);
        var ahead = row.release_behaviour.filter(function (b) { return M.rungIndex(b.autonomy) > eff; })
          .sort(function (a, b) { return M.rungIndex(a.autonomy) - M.rungIndex(b.autonomy); })[0];
        var atNow = row.release_behaviour.filter(function (b) { return b.autonomy === row.effective; })[0];
        next.innerHTML = '<div class="note info"><b>Effective now: ' + esc(short(row.effective) || 'none') + '.</b> ' +
          (atNow ? 'Its ' + esc(short(row.effective)) + ' behaviour is written below, and nobody has approved it yet. ' : '') +
          (ahead ? 'The next written rung above that is <b>' + esc(short(ahead.autonomy)) + '</b>. ' : 'No rung above it has a behaviour written. Defining one is the first piece of work. ') +
          'Ceiling: ' + esc(short(row.ceiling) || 'not recorded') + '.</div>';
      } else next.innerHTML = '';
      model.behaviours.forEach(function (b, i) {
        var entries = id ? b.entries.filter(function (e) { return e.id === id; }) : b.entries;
        var fact = b.key === M.UNAVAILABLE_BY_FACT;
        html += '<details class="rb"' + ((i === 0 && !id) || (id && entries.length) ? ' open' : '') + '><summary>' + b.short +
          '<span class="m">' + esc(b.meaning) + '</span><span class="ct">' + plural(entries.length, 'behaviour') + '</span></summary>';
        if (entries.length) {
          html += '<ol>' + entries.map(function (e) {
            return '<li>' + (id ? '' : '<span class="who">' + esc(e.name || e.id) + '</span>') + esc(e.behaviour) +
              '<span class="ac"><b>Acceptance:</b> ' + esc(e.acceptance) + '</span></li>';
          }).join('') + '</ol>';
        } else {
          html += '<p class="none">' + (fact ? 'Nothing is written for R8, and nothing can be: it needs a second agent that does not exist.'
            : (id ? 'This capability has no behaviour written for this rung.' : 'No capability has a behaviour written for this rung.')) + '</p>';
        }
        html += '</details>';
      });
      document.getElementById('rb-list').innerHTML = html;
    }
    sel.addEventListener('change', draw);
    draw();
  }

  // ---------------------------------------------------------------- panel 5
  function reqTable(list, tool) {
    var html = '<div class="tbox"><table><thead><tr>' + (tool ? '<th>Tool asked for</th>' : '<th>Change</th>') +
      '<th>Status</th><th>Proposed by</th><th>Decided by</th><th>Decided</th></tr></thead><tbody>';
    list.forEach(function (r) {
      var what = r.tool || r.tool_name || r.title || r.summary || r.capability_id || r.id;
      html += '<tr><td>' + cellText(what) + (tool ? '<span class="id">A request. Filing it granted nothing.</span>' : '') + '</td>' +
        '<td>' + cellText(r.status) + '</td><td>' + cellText(r.proposed_by || r.requested_by) + '</td>' +
        '<td>' + (r.decided_by ? esc(r.decided_by) : '<em class="muted">nobody yet</em>') + '</td>' +
        '<td>' + (r.decided_at ? when(r.decided_at) : '<em class="muted">—</em>') + '</td></tr>';
    });
    return html + '</tbody></table></div>';
  }
  function governanceHtml(g) {
    var html = '';
    if (g.disclosure) html += '<div class="note info"><b>The platform’s own words:</b> ' + prose(g.disclosure) + '</div>';
    html += '<div class="split"><div><h3 class="sub">Change requests</h3>';
    html += g.change_requests.length ? reqTable(g.change_requests, false)
      : emptyHtml('None filed', 'The endpoint returned no change requests. Nothing is waiting on a human because nothing has been asked.');
    html += '</div><div><h3 class="sub">Tool requests</h3>';
    html += g.tool_requests.length ? reqTable(g.tool_requests, true)
      : emptyHtml('None filed', 'The endpoint returned no tool requests. A tool request asks a human for a tool; filing one grants nothing.');
    html += '</div></div>';

    var held = g.tools.filter(function (t) { return t.held; });
    html += '<h3 class="sub">Tools your capabilities name, against what the agent row holds</h3>';
    html += '<p>This is not a request list, and nothing in it was granted by a request. “Held” comes from the agent row in panel 1. Getting any tool marked “not held” means filing a tool request that a human decides.</p>';
    html += '<p class="tally"><span><b>' + g.tools.length + '</b> distinct tools named across the capabilities</span><span><b>' + held.length + '</b> of them held by the agent row</span>' +
      (g.held_not_named.length ? '<span><b>' + g.held_not_named.length + '</b> held tools no capability names: ' + g.held_not_named.map(function (t) { return '<code>' + esc(t) + '</code>'; }).join(' ') + '</span>' : '') + '</p>';
    html += '<details class="more"><summary>Show all ' + g.tools.length + ' tools</summary><div class="tbox"><table><thead><tr><th>Tool</th><th>Named by</th><th>Agent row</th></tr></thead><tbody>' +
      g.tools.map(function (t) {
        return '<tr><td><code>' + esc(t.tool) + '</code></td><td>' + plural(t.needed_by.length, 'capability', 'capabilities') + '</td><td>' +
          (t.held ? '<span class="chip yes">held</span>' : '<span class="chip no">not held</span>') + '</td></tr>';
      }).join('') + '</tbody></table></div></details>';
    return html;
  }

  // ---------------------------------------------------------------- panel 6
  function gapsHtml(model, changed, capSrc) {
    var G = model.gaps, html = '<ul class="gaps">';
    html += '<li><h3>R8 is unreachable by fact, not by choice</h3><p>Coordinated handoff between two agents does not exist on this platform. Dara can hand work only to a human (daraHandoffService.ts:13-15). So R8 is not incomplete work. It cannot be reached by anyone, and ' +
      (G.ceilings_at_or_above_r8 === 0 ? 'no capability’s ceiling reaches it.' : plural(G.ceilings_at_or_above_r8, 'capability', 'capabilities') + ' have a ceiling at or above it.') + '</p></li>';
    html += '<li><h3>' + G.drafts + ' of ' + G.total + ' capabilities are draft</h3><p>Draft means nobody has agreed it. Every row in panel 2 is a proposal from research, not a requirement a manager signed.</p></li>';
    html += G.empty_release_behaviour.length
      ? '<li><h3>' + plural(G.empty_release_behaviour.length, 'capability has', 'capabilities have') + ' no defined next rung</h3><p>Their <code>release_behaviour[]</code> is empty, so defining one is the first piece of work.</p><ul>' +
        G.empty_release_behaviour.map(function (i) { return '<li><code>' + esc(i) + '</code></li>'; }).join('') + '</ul></li>'
      : '<li class="ok"><h3>No capability has an empty <code>release_behaviour[]</code></h3><p>Checked on all ' + G.total + ': each has at least one rung written.</p></li>';
    if (G.stops_short.length) {
      html += '<li class="unk"><h3>' + G.stops_short.length + ' of ' + G.total + ' capabilities have no behaviour written at their own ceiling</h3><p>Their written rungs stop below the ceiling, so the higher rungs have nothing defined yet.</p>' +
        '<details class="more"><summary>Show them</summary><ul>' + G.stops_short.map(function (s) {
          return '<li>' + esc(s.name || s.id) + ': written up to ' + esc(short(s.written_to)) + ', ceiling ' + esc(short(s.ceiling)) + '</li>';
        }).join('') + '</ul></details></li>';
    }
    if (G.held_needed_tools.length) {
      html += '<li class="unk"><h3>The story brief and the agent row disagree about tools</h3><p>The story brief lists the tools your capabilities need and says none is granted. The agent row holds ' +
        G.held_needed_tools.length + ' tools that your capabilities name: ' + G.held_needed_tools.map(function (t) { return '<code>' + esc(t) + '</code>'; }).join(', ') +
        '. This page shows the agent row. Which one is right is for Ali or Swati to settle.</p></li>';
    }
    html += '<li class="unk"><h3>Left blank rather than filled in</h3><ul>' +
      (G.set_by_missing ? '<li>Who set the agent’s autonomy level: the platform does not store it.</li>' : '') +
      (G.agent_name_missing ? '<li>The agent’s display name: null in the response.</li>' : '') +
      '<li>Who approved each capability’s level: the response gives a level for each but names no approver.</li>' +
      '<li>Live responses. This page reads the platform’s synced copy (last changed ' + (changed || 'unknown') + ') and an extract of the capability file at <code>' + esc(capSrc ? capSrc.platform_commit : 'unknown') + '</code>, not the endpoints themselves. Anything that changed on the platform since then is not shown.</li>' +
      '<li>The columns of a filed request. None has been filed, so the field names in panel 5 are untested against a real row.</li>' +
      '</ul></li>';
    return html + '</ul>';
  }

  function sourcesList(capSrc, changed) {
    var items = [
      '<code>' + FILES.snapshot + '</code>: the agent, authority and governance blocks, synced by the platform from the three <code>GET</code> endpoints it names' + (changed ? ' (last changed ' + changed + ', from <code>' + FILES.manifest + '</code>)' : ''),
      '<code>' + FILES.caps + '</code>' + (capSrc ? ': extracted by <code>scripts/extract_capabilities.py</code> from <code>' + esc(capSrc.file) + '</code> at <code>' + esc(capSrc.platform_commit) + '</code>, sha256 <code>' + esc(capSrc.sha256.slice(0, 12)) + '…</code>' : ''),
      'Rung wording: <code>AUTONOMY_MEANINGS</code>, autonomyLadder.ts:58-69 · Non-promoting signals: promotionCriteria.ts:46-51 · Authority rule: autonomyLadder.ts:185-223',
    ];
    document.getElementById('sources').innerHTML = items.map(function (i) { return '<li>' + i + '</li>'; }).join('');
  }
})();
