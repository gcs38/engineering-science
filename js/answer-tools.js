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
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
