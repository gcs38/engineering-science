/* ============================================================
   ESS ANSWER TOOLS (course notes pages)
   1. Every "Download my answers (PDF)" file also carries a hidden
      copy of the pupil's answers. "Load my answers" reads that PDF
      back on any device and restores the answers.
   2. Once the topic's answers password is entered, a "Show answer"
      button appears under each task, revealing the model answer.
   Loaded automatically by site.js on course-notes pages.
   Switch a topic on by adding its folder to ENABLED below.
   ============================================================ */
(function () {
  var ENABLED = ['n5/contexts/systems-approach', 'n5/contexts/energy-efficiency', 'n5/contexts/roles-disciplines', 'n5/contexts/impacts',
                 'n5/electronics/analogue', 'n5/electronics/digital', 'n5/electronics/control',
                 'n5/mechanisms/drive-systems', 'n5/mechanisms/pneumatics', 'n5/mechanisms/structures-forces', 'n5/mechanisms/materials'];

  var m = location.pathname.match(/(n5|higher|ah)\/[a-z-]+\/[a-z-]+(?=\/course-notes\.html$)/);
  if (!m || ENABLED.indexOf(m[0]) < 0) return;
  var TOPIC = m[0].split('/').pop();
  var PREFIX = 'ess_answers_';
  var MARK = 'ESSDATA1:', END = ':ESSEND';
  var PW_KEY = 'ess-answers-pw-' + TOPIC;

  // ── styles ──
  var css = document.createElement('style');
  css.textContent = [
    '.ess-tools{background:#f0fdfa;border:1px solid #99f6e4;border-radius:10px;padding:14px 16px;margin:0 0 26px;font-size:13.5px;line-height:1.5;color:#134e4a;}',
    '.ess-tools h3{font-size:14px;margin:0 0 8px;color:#0f766e;}',
    '.ess-tools-row{display:flex;flex-wrap:wrap;align-items:center;gap:8px 10px;padding:6px 0;}',
    '.ess-tools-row + .ess-tools-row{border-top:1px dashed #99f6e4;}',
    '.ess-tools-row[hidden]{display:none;}',
    '.ess-tools-row span.t{flex:1 1 260px;}',
    '.ess-tbtn{font-family:inherit;font-size:12.5px;font-weight:600;padding:7px 12px;border-radius:8px;border:1px solid #0f766e;background:#fff;color:#0f766e;cursor:pointer;white-space:nowrap;}',
    '.ess-tbtn.primary{background:#0f766e;color:#fff;}',
    '.ess-tbtn:disabled{opacity:.6;cursor:wait;}',
    '.ess-pw{font-family:inherit;font-size:13px;padding:7px 10px;border:1px solid #99f6e4;border-radius:8px;width:150px;}',
    '.ess-msg{font-size:12px;width:100%;}',
    '.ess-msg.err{color:#b91c1c;}',
    '.ess-reveal{margin:6px 0 12px;}',
    '.ess-reveal-btn{font-family:inherit;font-size:12px;font-weight:600;padding:5px 11px;border-radius:7px;border:1px solid #0f766e;background:#fff;color:#0f766e;cursor:pointer;}',
    '.ess-model{display:none;margin-top:8px;padding:10px 14px;border-left:4px solid #0f766e;background:#f0fdfa;border-radius:6px;font-size:13.5px;line-height:1.6;color:#0f172a;}',
    '.ess-model.open{display:block;}',
    '.ess-model-h{font-size:11px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:#0f766e;margin-bottom:6px;}',
    '.ess-model-q{font-size:12px;font-weight:600;color:#475569;margin:8px 0 3px;}',
    '.ess-model p{margin:0 0 6px;} .ess-model ol,.ess-model ul{margin:0 0 6px 20px;}',
    '.ess-model .ans-diagram{width:100%;max-width:640px;height:auto;display:block;margin:6px 0;background:#fff;}',
    '.ess-model .ans-note{font-size:12px;color:#64748b;font-style:italic;}',
    '.ess-model .ans-calc{padding:6px 10px;background:#fff;border-left:3px solid #2dd4bf;border-radius:4px;margin:2px 0 6px;}',
    '.ess-model .ans-final{font-weight:700;color:#085041;}',
    '.ess-model table{border-collapse:collapse;font-size:12.5px;width:100%;}',
    '.ess-model th,.ess-model td{border:1px solid #cbd5e1;padding:5px 8px;text-align:left;vertical-align:top;}',
    '.ess-model th{background:#e1f5ee;}',
    '.ess-model .ob{text-decoration:overline;}',
    '@media print{.ess-tools,.ess-reveal{display:none!important;}}'
  ].join('\n');
  document.head.appendChild(css);

  // ── helpers ──
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function boxes() { return [].slice.call(document.querySelectorAll('[contenteditable="true"][data-key]')); }
  function toB64(str) { return btoa(unescape(encodeURIComponent(str))); }
  function fromB64(b) { return decodeURIComponent(escape(atob(b))); }
  function b64bytes(s) { var b = atob(s), u = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; }
  function nameKey() {
    if (typeof NAME_KEY !== 'undefined') return NAME_KEY;
    if (typeof PUPIL_NAME_KEY !== 'undefined') return PUPIL_NAME_KEY;
    if (typeof SF_NAME_KEY !== 'undefined') return SF_NAME_KEY;
    return null;
  }
  function pageKeys() {
    var seen = {}, out = [];
    document.querySelectorAll('[data-key]').forEach(function (el) { var k = el.dataset.key; if (k && !seen[k]) { seen[k] = 1; out.push(k); } });
    return out;
  }

  // ════════ 1. answers travel inside the downloaded PDF ════════
  function snapshot() {
    var answers = {};
    pageKeys().forEach(function (k) {
      var el = document.querySelector('[contenteditable="true"][data-key="' + k + '"]'), v = '';
      if (el) v = el.innerHTML;
      if (!v || !v.replace(/<br\s*\/?>|&nbsp;|\s/g, '')) { try { v = localStorage.getItem(PREFIX + k) || ''; } catch (e) { v = ''; } }
      if (v && v.replace(/<br\s*\/?>|&nbsp;|\s/g, '')) answers[k] = v;
    });
    var nk = nameKey(), name = '';
    try { name = nk ? (localStorage.getItem(nk) || '') : ''; } catch (e) {}
    return { v: 1, topic: TOPIC, saved: new Date().toISOString(), name: name, answers: answers };
  }
  // Every PDF the page makes gets a hidden copy of the answers (wraps the PDF library's save).
  function patchPdf() {
    var lib = window.jspdf;
    if (!lib || !lib.jsPDF || lib.jsPDF._ess) return !!(lib && lib.jsPDF && lib.jsPDF._ess);
    var Orig = lib.jsPDF;
    var Wrapped = function () {
      var doc = new (Function.prototype.bind.apply(Orig, [null].concat([].slice.call(arguments))))();
      var save = doc.save;
      doc.save = function () {
        try { doc.setProperties({ title: 'Engineering Science Scotland — my answers', subject: 'ESS answers (' + TOPIC + ')',
                                  keywords: MARK + toB64(JSON.stringify(snapshot())) + END }); } catch (e) {}
        return save.apply(doc, arguments);
      };
      return doc;
    };
    for (var k in Orig) { try { Wrapped[k] = Orig[k]; } catch (e) {} }
    Wrapped.API = Orig.API; Wrapped.prototype = Orig.prototype; Wrapped._ess = true;
    lib.jsPDF = Wrapped;
    return true;
  }
  if (!patchPdf()) { var tries = 0, t = setInterval(function () { if (patchPdf() || ++tries > 40) clearInterval(t); }, 250); }

  function loadFromFile(file, msgEl) {
    var r = new FileReader();
    r.onload = function () {
      var bytes = new Uint8Array(r.result), text = '';
      for (var i = 0; i < bytes.length; i += 65536) text += String.fromCharCode.apply(null, bytes.subarray(i, i + 65536));
      var a = text.indexOf(MARK), z = a >= 0 ? text.indexOf(END, a) : -1;
      if (a < 0 || z < 0) { say(msgEl, 'This file doesn’t contain saved answers. Choose a PDF made with a “Download my answers” button in these notes.', true); return; }
      var data;
      try { data = JSON.parse(fromB64(text.slice(a + MARK.length, z))); } catch (e) { say(msgEl, 'Sorry, the answers in this file could not be read.', true); return; }
      if (data.topic !== TOPIC) { say(msgEl, 'This PDF holds answers for a different topic (' + data.topic.replace(/-/g, ' ') + '). Open that topic’s notes to load it.', true); return; }
      var keys = Object.keys(data.answers || {});
      var when = new Date(data.saved).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
      if (!keys.length) { say(msgEl, 'This PDF was saved before any answers had been typed.', true); return; }
      if (!confirm('Load ' + keys.length + ' answer' + (keys.length > 1 ? 's' : '') + ' saved on ' + when + (data.name ? ' by ' + data.name : '') +
                   '?\n\nAny answers to the same questions on this device will be replaced.')) return;
      var n = 0;
      keys.forEach(function (k) { try { localStorage.setItem(PREFIX + k, data.answers[k]); n++; } catch (e) {} });
      var nk = nameKey();
      if (nk && data.name) { try { localStorage.setItem(nk, data.name); } catch (e) {} }
      try { sessionStorage.setItem('ess-loaded-msg', '✅ ' + n + ' answer' + (n === 1 ? '' : 's') + ' loaded and saved on this device.'); } catch (e) {}
      location.reload();
    };
    r.readAsArrayBuffer(file);
  }
  function say(el, text, err) { el.textContent = text; el.className = 'ess-msg' + (err ? ' err' : ''); }

  // ════════ 2. model answers revealed in place ════════
  var answersDoc = null;
  async function unlock(pw) {
    var html = await (await fetch('answers.html', { cache: 'no-cache' })).text();
    var mm = html.match(/var ESS_ANSWERS = (\{.*?\});/);
    if (!mm) throw new Error('nodata');
    var p = JSON.parse(mm[1]);
    var base = await crypto.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveKey']);
    var key = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt: b64bytes(p.s), iterations: p.it, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
    var plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64bytes(p.i) }, key, b64bytes(p.c));
    answersDoc = new DOMParser().parseFromString('<div id="r">' + new TextDecoder().decode(plain) + '</div>', 'text/html');
  }

  function modelFor(keys) {
    var els = keys.map(function (k) { return answersDoc.querySelector('[data-key="' + k + '"]'); }).filter(Boolean);
    if (!els.length) return '';
    var tbl = els[0].closest('table');
    if (tbl && els.every(function (e) { return e.closest('table') === tbl; })) {
      // only the rows that hold these answers (plus the header row)
      var t = tbl.cloneNode(true);
      [].slice.call(t.rows).forEach(function (row, i) {
        if (i === 0 && row.querySelector('th')) return;
        if (!keys.some(function (k) { return row.querySelector('[data-key="' + k + '"]'); })) row.remove();
      });
      var wrap = tbl.closest('.ans-table-wrap') || tbl, intro = wrap.previousElementSibling, note = wrap.nextElementSibling;
      return (intro && intro.classList.contains('ans-q') ? '<div class="ess-model-q">' + intro.innerHTML + '</div>' : '') + t.outerHTML +
             (note && note.classList.contains('ans-note') ? note.outerHTML : '');
    }
    if (els.length === 1) { var a = els[0].querySelector('.ans-a'); return a ? a.innerHTML : els[0].innerHTML; }
    return els.map(function (e) {
      var q = e.querySelector('.ans-q'), a = e.querySelector('.ans-a');
      return (q && q.textContent.trim() ? '<div class="ess-model-q">' + esc(q.textContent) + '</div>' : '') + (a ? a.innerHTML : e.innerHTML);
    }).join('');
  }
  function anchorFor(el) {
    var item = el.closest('.task-item'), a = el;
    if (item) { while (a.parentElement && a.parentElement !== item) a = a.parentElement; return a; }
    var svg = el.closest('svg'); if (svg) a = svg;
    var tbl = a.closest('table'); if (tbl) a = tbl.closest('.table-wrap, .data-table-wrap') || tbl;
    return a;
  }

  function addRevealButtons() {
    document.querySelectorAll('.ess-reveal').forEach(function (e) { e.remove(); });
    var groups = [], byAnchor = new Map();
    document.querySelectorAll('[data-key]').forEach(function (b) {
      var k = b.dataset.key;
      if (!k || !answersDoc.querySelector('[data-key="' + k + '"]') || b.closest('.ess-tools, .ess-reveal')) return;
      var a = anchorFor(b);
      if (!byAnchor.has(a)) { var g = { anchor: a, keys: [], boxes: [] }; byAnchor.set(a, g); groups.push(g); }
      var g2 = byAnchor.get(a); if (g2.keys.indexOf(k) < 0) { g2.keys.push(k); g2.boxes.push(b); }
    });
    groups.forEach(function (g) {
      var html = modelFor(g.keys);
      if (!html) return;
      var w = document.createElement('div'); w.className = 'ess-reveal';
      w.innerHTML = '<button type="button" class="ess-reveal-btn">&#x1F441;&#xFE0F; Show answer</button>' +
                    '<div class="ess-model"><div class="ess-model-h">Model answer</div>' + html + '</div>';
      var btn = w.querySelector('button'), box = w.querySelector('.ess-model');
      btn.addEventListener('click', function () {
        var open = box.classList.contains('open');
        if (!open) {
          var tried = g.boxes.some(function (b) { return (b.innerText || '').trim() || b.querySelector('img'); });
          if (!tried && !document.body.classList.contains('ess-show-all') && !confirm('You haven’t answered this yet. Show the answer anyway?')) return;
        }
        box.classList.toggle('open', !open);
        btn.innerHTML = open ? '&#x1F441;&#xFE0F; Show answer' : '&#x1F648; Hide answer';
      });
      g.anchor.parentNode.insertBefore(w, g.anchor.nextSibling);
    });
  }
  function setAll(open) {
    document.querySelectorAll('.ess-reveal').forEach(function (w) {
      w.querySelector('.ess-model').classList.toggle('open', open);
      w.querySelector('button').innerHTML = open ? '&#x1F648; Hide answer' : '&#x1F441;&#xFE0F; Show answer';
    });
  }

  // ════════ 3. learning outcomes (collapsible box at the top of the notes) ════════
  var OUTCOMES = {"systems-approach": {"title": "The Systems Approach", "items": [["I can describe a system in terms of its inputs, process and outputs, and draw a universal system diagram.", "section-1", 0], ["I can identify wanted and unwanted outputs of a system.", "section-1", 0], ["I can draw a sub-system diagram, showing the system boundary, input devices, control unit, output drivers and output devices.", "section-2", 0], ["I can explain the purpose of the system boundary.", "section-2", 0], ["I can describe the function of input, process (control) and output sub-systems, including output drivers.", "section-2", 0], ["I can describe the difference between open-loop and closed-loop control.", "section-3", 0], ["I can explain how feedback is used in a closed-loop system to keep the output at a set level.", "section-3", 0], ["I can identify whether everyday systems use open-loop or closed-loop control.", "section-3", 0], ["I can describe, using the correct terms, how the sub-systems of a product work together.", "section-4", 0], ["I can apply the systems approach to analyse and design a system from a specification.", "section-6", 0]]}, "energy-efficiency": {"title": "Energy and Efficiency", "items": [["I can identify forms of energy (potential, kinetic, electrical, heat, light, sound, strain) in everyday systems.", "section-1", 0], ["I can describe the energy changes that take place in a system, including energy lost (wasted).", "section-1", 0], ["I can calculate work done using E<sub>w</sub> = Fd.", "section-2", 0], ["I can calculate potential energy using E<sub>p</sub> = mgh.", "section-3", 0], ["I can calculate kinetic energy using E<sub>k</sub> = ½mv².", "section-4", 0], ["I can calculate electrical energy using E<sub>e</sub> = VIt.", "section-5", 0], ["I can calculate heat energy using E<sub>h</sub> = cmΔT.", "section-6", 0], ["I can complete an energy audit for a system, showing the energy in, useful energy out and energy lost.", "section-7", 0], ["I can calculate efficiency, and rearrange the formula to find input or output energy or power.", "section-8", 0], ["I can calculate power using P = E/t.", "section-9", 0], ["I can describe how renewable energy sources work, and explain their limitations.", "section-10", 0], ["I can explain why a mix of energy sources is needed to give a reliable supply.", "section-10", 1]]}, "roles-disciplines": {"title": "Engineering Roles and Disciplines", "items": [["I can describe what engineers do and why engineering matters to society.", "section-1", 0], ["I can describe the work of civil, structural, mechanical, electrical, electronic, chemical and environmental engineers.", "section-2", 0], ["I can give examples of projects that each branch of engineering works on.", "section-2", 0], ["I can identify the branch of engineering responsible for a given task in a project.", "section-3", 0], ["I can explain how engineers from different disciplines work together on a large project.", "section-3", 0], ["I can describe the roles of engineers at each stage of a project: designing, implementing, testing and operating.", "section-4", 0], ["I can explain why engineers follow a code of conduct, and name a professional engineering body.", "section-4", 0], ["I can describe the qualifications and career paths that lead to a job in engineering.", "section-5", 1], ["I can describe specific roles that engineers would carry out in a given context.", "section-6", 0]]}, "impacts": {"title": "Impacts of Engineering", "items": [["I can describe positive and negative social impacts of engineering projects.", "section-2", 0], ["I can describe positive and negative economic impacts of engineering projects.", "section-3", 0], ["I can describe positive and negative environmental impacts of engineering projects.", "section-4", 0], ["I can classify an impact as social, economic or environmental.", "section-1", 0], ["I can explain what is meant by sustainable engineering, and give examples.", "section-4", 0], ["I can explain the causes and effects of climate change.", "section-5", 0], ["I can describe how engineering solutions can help to tackle climate change.", "section-5", 0], ["I can explain the possible impacts of an emerging technology.", "section-6", 0], ["I can evaluate an engineering project by weighing up its positive and negative impacts.", "section-7", 0]]}, "analogue": {"title": "Analogue Electronics", "items": [["I can describe current, voltage and resistance, and state their units.", "section-1", 0], ["I can recognise and draw the symbols for common electronic components.", "section-2", 0], ["I can use Ohm's law (V = IR) to calculate voltage, current or resistance.", "section-3", 0], ["I can calculate total resistance, current and voltages in series circuits.", "section-4", 0], ["I can calculate total resistance and branch currents in parallel circuits.", "section-6", 0], ["I can carry out calculations on circuits with series and parallel parts combined.", "section-7", 0], ["I can read the resistance of an LDR or thermistor from a graph.", "section-8", 0], ["I can calculate V<sub>out</sub> from a voltage divider.", "section-8", 0], ["I can explain how a voltage divider with an LDR or thermistor works as a light, dark, hot or cold sensor.", "section-8", 0], ["I can describe how a transistor acts as a switch, including the switching voltage (about 0.7 V).", "section-9", 0], ["I can explain why a relay is used to switch high-voltage or high-current devices.", "section-10", 0], ["I can explain why a diode is needed to protect a transistor when switching a motor, relay or solenoid.", "section-10", 0]]}, "digital": {"title": "Digital Electronics", "items": [["I can describe the difference between analogue and digital signals, and give examples of each.", "section-1", 0], ["I can recognise and draw the symbols for AND, OR and NOT gates, and complete their truth tables.", "section-2", 0], ["I can choose the correct logic gate for a given situation.", "section-2", 0], ["I can complete truth tables for combinational logic circuits, including intermediate outputs.", "section-3", 0], ["I can write a Boolean expression for a logic circuit.", "section-4", 0], ["I can draw a logic circuit from a Boolean expression.", "section-4", 0], ["I can write a Boolean expression from a truth table.", "section-5", 0], ["I can design a logic circuit from a written specification.", "section-6", 0], ["I can identify the logic gate ICs needed for a circuit, and state why the power pins must be connected.", "section-7", 0], ["I can apply logic gates to solve real-world control problems.", "section-8", 0]]}, "control": {"title": "Control Systems", "items": [["I can describe what a microcontroller is, and explain the advantages of microcontroller-based control systems over hard-wired circuits.", "section-2", 0], ["I can identify input and output devices used with a microcontroller, and describe the difference between digital and analogue inputs.", "section-8", 0], ["I can recognise and use the correct flowchart symbols: start/stop, input/output, process and decision.", "section-3", 0], ["I can draw a flowchart from a specification, switching outputs on and off and including time delays with units.", "section-4", 0], ["I can use a continuous loop to make a sequence repeat.", "section-4", 0], ["I can use decision boxes to respond to inputs, including waiting for a switch to be pressed.", "section-5", 0], ["I can use decision boxes to give AND and OR control.", "section-5", 0], ["I can use a counter (finite loop) to repeat part of a sequence a set number of times.", "section-6", 0], ["I can read a flowchart, describe what it does, and find and correct errors in it.", "section-7", 0], ["I can use a pin table to identify the input and output pin numbers in a flowchart.", "section-8", 0], ["I can describe how a flowchart is turned into program code.", "section-9", 0], ["I can explain why an output driver is needed between a microcontroller and devices such as motors.", "section-9b", 0]]}, "drive-systems": {"title": "Drive Systems", "items": [["I can identify rotary, linear, reciprocating and oscillating motion.", "section-1", 0], ["I can describe how simple gear trains change speed and direction of rotation.", "section-2", 0], ["I can calculate velocity ratio and output speed for a simple gear train.", "section-3", 0], ["I can explain the purpose of an idler gear.", "section-4", 0], ["I can calculate velocity ratio and output speed for a compound gear train.", "section-5", 0], ["I can explain why a compound gear train is used for a large change in speed.", "section-5", 0], ["I can describe how a worm and wheel works.", "section-6", 1], ["I can calculate velocity ratio and speeds for belt and chain drives.", "section-7", 1], ["I can describe how cams, cranks and sliders, and racks and pinions convert motion.", "section-9", 1]]}, "pneumatics": {"title": "Pneumatics", "items": [["I can describe the advantages and disadvantages of pneumatic systems, and the main safety rules.", "section-1", 0], ["I can recognise and draw the symbols for pneumatic components.", "section-2", 0], ["I can describe how a 3/2 valve works, including the functions of ports 1, 2 and 3.", "section-2", 0], ["I can describe how a single-acting cylinder (SAC) is controlled by a 3/2 valve.", "section-2", 0], ["I can design circuits using a T-piece, AND control (valves in series) and OR control (a shuttle valve).", "section-3", 0], ["I can explain how a uni-directional restrictor controls the speed of a cylinder.", "section-6", 0], ["I can describe how an air bleed circuit works.", "section-7", 0], ["I can describe how a double-acting cylinder (DAC) is controlled by a 5/2 valve.", "section-8", 0], ["I can describe the operation of semi-automatic and fully automatic circuits.", "section-9", 0], ["I can explain how a reservoir and restrictor create a time delay.", "section-11", 0], ["I can describe the difference between pilot-operated and solenoid-operated valves.", "section-12", 0], ["I can calculate pressure, force and area, including the instroke force of a double-acting cylinder.", "section-13", 0]]}, "structures-forces": {"title": "Structures and Forces", "items": [["I can identify tension, compression, bending, shear and torsion, and give examples of each.", "section-1", 0], ["I can draw a free-body diagram showing the forces acting on a structure.", "section-2", 0], ["I can identify the fulcrum, load and effort in a lever.", "section-3", 1], ["I can state the principle of moments, and calculate moments and torque.", "section-4", 0], ["I can calculate an unknown force or distance using the principle of moments.", "section-4", 0], ["I can calculate the reaction forces at the supports of a beam.", "section-5", 0], ["I can state the conditions for a structure to be in equilibrium.", "section-6", 0], ["I can find the size and direction of an unknown force using a scale drawing (triangle of forces).", "section-6", 0]]}, "materials": {"title": "Materials", "items": [["I can classify materials as metals, polymers, ceramics or composites.", "section-1", 1], ["I can describe the material properties strength, ductility, conductivity and corrosion resistance.", "section-2", 0], ["I can select a suitable material for a product and justify my choice using its properties.", "section-3", 0], ["I can calculate stress using σ = F/A, including finding the area of a circular cross-section.", "section-4", 0], ["I can rearrange the stress formula to find force or area.", "section-4", 0], ["I can calculate strain using ε = Δl/l, including changing units.", "section-5", 0], ["I can rearrange the strain formula to find the change in length or the original length.", "section-5", 0], ["I can use stress and strain calculations to decide whether a design meets its specification.", "section-6", 0]]}};
  function buildOutcomes() {
    var lo = OUTCOMES[TOPIC]; if (!lo) return;
    var host = document.querySelector('.notes-wrap') || document.querySelector('.content'); if (!host) return;
    var st = document.createElement('style');
    st.textContent = '.ess-lo{border:1px solid #99f6e4;border-radius:10px;background:#fff;margin:0 0 24px;}' +
      '.ess-lo summary{cursor:pointer;list-style:none;padding:12px 16px;font-weight:700;color:#0f766e;font-size:15px;display:flex;justify-content:space-between;align-items:center;gap:10px;}' +
      '.ess-lo summary::-webkit-details-marker{display:none;}' +
      '.ess-lo summary .c{font-size:12px;font-weight:600;color:#475569;background:#f0fdfa;border-radius:20px;padding:3px 10px;white-space:nowrap;}' +
      '.ess-lo summary:after{content:"\\25BC";font-size:11px;color:#0f766e;margin-left:6px;} .ess-lo[open] summary:after{content:"\\25B2";}' +
      '.ess-lo-body{padding:0 16px 12px;} .ess-lo-hint{font-size:12.5px;color:#475569;margin:0 0 10px;}' +
      '.ess-lo-item{display:flex;gap:10px;align-items:flex-start;padding:7px 0;border-top:1px solid #f1f5f9;font-size:13.5px;line-height:1.45;}' +
      '.ess-lo-item input{width:18px;height:18px;margin:1px 0 0;accent-color:#0f766e;flex:0 0 auto;cursor:pointer;}' +
      '.ess-lo-item label{flex:1;cursor:pointer;} .ess-lo-item a{font-size:12px;color:#0f766e;white-space:nowrap;text-decoration:none;}' +
      '.ess-lo-item a:hover{text-decoration:underline;} .ess-lo-item.ne label{color:#94a3b8;} .ess-lo-item .ne-tag{font-size:11px;color:#94a3b8;font-style:italic;}' +
      '@media print{.ess-lo{display:none!important;}}';
    document.head.appendChild(st);
    var d = document.createElement('details'); d.className = 'ess-lo';
    var html = '<summary><span>&#x1F3AF; Learning outcomes</span><span class="c"></span></summary><div class="ess-lo-body">' +
      '<p class="ess-lo-hint">Tick each outcome when you feel confident you can do it. Your ticks are saved on this device and included in your downloaded answers PDF.</p>';
    lo.items.forEach(function (it, i) {
      var id = 'ess-lo-' + i, key = 'lo-' + i, sec = document.getElementById(it[1]);
      html += '<div class="ess-lo-item' + (it[2] ? ' ne' : '') + '"><input type="checkbox" id="' + id + '" data-key="' + key + '">' +
              '<label for="' + id + '">' + it[0] + (it[2] ? ' <span class="ne-tag">(not examined)</span>' : '') + '</label>' +
              (sec ? '<a href="#' + it[1] + '">Go to section &rarr;</a>' : '') + '</div>';
    });
    d.innerHTML = html + '</div>';
    host.insertBefore(d, host.firstChild);
    function count() {
      var all = d.querySelectorAll('input'), on = d.querySelectorAll('input:checked');
      d.querySelector('.c').textContent = on.length + ' of ' + all.length + ' ticked';
    }
    d.querySelectorAll('input').forEach(function (cb) {
      var k = PREFIX + cb.dataset.key;
      try { cb.checked = localStorage.getItem(k) === '1'; } catch (e) {}
      cb.addEventListener('change', function () { try { if (cb.checked) localStorage.setItem(k, '1'); else localStorage.removeItem(k); } catch (e) {} count(); });
    });
    d.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) { var t = document.querySelector(a.getAttribute('href')); if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); } });
    });
    count();
  }

  // ── tools panel ──
  function build() {
    // sits immediately before the first task (falls back to the top of the notes)
    var firstTask = document.querySelector('.assignment');
    var host = document.querySelector('.notes-wrap') || document.querySelector('.content');
    if (!firstTask && !host) return;
    var p = document.createElement('div'); p.className = 'ess-tools';
    p.innerHTML =
      '<h3>Your answers to tasks</h3>' +
      '<div class="ess-tools-row"><span class="t">&#x1F4BE; Answers save on this device only. <strong>Using a different device?</strong> Load the PDF you downloaded last time (any &ldquo;Download my answers&rdquo; PDF from these notes) to carry on where you left off.</span>' +
      '<button type="button" class="ess-tbtn" data-act="load">&#x1F4C2; Load my answers</button><input type="file" accept=".pdf,application/pdf" hidden>' +
      '<div class="ess-msg" data-msg="load"></div></div>' +
      '<div class="ess-tools-row" data-row="lock"><span class="t">&#x1F512; <strong>Model answers</strong> &mdash; enter the password from your teacher to show the answer under each task.</span>' +
      '<input class="ess-pw" type="password" placeholder="Answers password" aria-label="Answers password"><button type="button" class="ess-tbtn primary" data-act="unlock">Unlock</button>' +
      '<div class="ess-msg" data-msg="lock"></div></div>' +
      '<div class="ess-tools-row" data-row="open" hidden><span class="t">&#x2705; <strong>Model answers unlocked.</strong> Use the &ldquo;Show answer&rdquo; button under each task.</span>' +
      '<button type="button" class="ess-tbtn" data-act="all">Show all</button><button type="button" class="ess-tbtn" data-act="none">Hide all</button><button type="button" class="ess-tbtn" data-act="lock">&#x1F512; Lock</button></div>';
    if (firstTask) firstTask.parentNode.insertBefore(p, firstTask); else host.insertBefore(p, host.firstChild);

    var fileIn = p.querySelector('input[type=file]'), loadMsg = p.querySelector('[data-msg=load]'), lockMsg = p.querySelector('[data-msg=lock]');
    try { var lm = sessionStorage.getItem('ess-loaded-msg'); if (lm) { say(loadMsg, lm, false); sessionStorage.removeItem('ess-loaded-msg'); } } catch (e) {}
    p.querySelector('[data-act=load]').addEventListener('click', function () { fileIn.value = ''; fileIn.click(); });
    fileIn.addEventListener('change', function () { if (fileIn.files[0]) loadFromFile(fileIn.files[0], loadMsg); });

    // also offer "Load my answers" beside "Download ALL my answers" at the end of the notes
    var bar = document.querySelector('.controls-bar');
    if (bar) {
      var lb = document.createElement('button'); lb.type = 'button'; lb.className = 'ctrl-btn'; lb.innerHTML = '&#x1F4C2; Load my answers';
      lb.addEventListener('click', function () { fileIn.value = ''; fileIn.click(); p.scrollIntoView({ behavior: 'smooth' }); });
      bar.appendChild(lb);
    }

    var pwIn = p.querySelector('.ess-pw'), ub = p.querySelector('[data-act=unlock]');
    async function doUnlock(pw, quiet) {
      ub.disabled = true; if (!quiet) say(lockMsg, 'Checking…', false);
      try {
        await unlock(pw.trim().toLowerCase());
        addRevealButtons();
        p.querySelector('[data-row=lock]').hidden = true; p.querySelector('[data-row=open]').hidden = false;
        say(lockMsg, '', false);
        try { sessionStorage.setItem(PW_KEY, pw.trim().toLowerCase()); } catch (e) {}
      } catch (e) {
        say(lockMsg, quiet ? '' : (e.message === 'nodata' ? 'Model answers are not available for this topic yet.' : 'That password is not correct. Please try again.'), !quiet);
        try { sessionStorage.removeItem(PW_KEY); } catch (e2) {}
      }
      ub.disabled = false;
    }
    ub.addEventListener('click', function () { doUnlock(pwIn.value); });
    pwIn.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); doUnlock(pwIn.value); } });
    p.querySelector('[data-act=all]').addEventListener('click', function () { document.body.classList.add('ess-show-all'); setAll(true); });
    p.querySelector('[data-act=none]').addEventListener('click', function () { document.body.classList.remove('ess-show-all'); setAll(false); });
    p.querySelector('[data-act=lock]').addEventListener('click', function () {
      document.querySelectorAll('.ess-reveal').forEach(function (e) { e.remove(); });
      answersDoc = null; pwIn.value = ''; document.body.classList.remove('ess-show-all');
      try { sessionStorage.removeItem(PW_KEY); } catch (e) {}
      p.querySelector('[data-row=lock]').hidden = false; p.querySelector('[data-row=open]').hidden = true;
    });
    var saved = null; try { saved = sessionStorage.getItem(PW_KEY); } catch (e) {}
    if (saved) doUnlock(saved, true);
  }
  function start() { buildOutcomes(); build(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
