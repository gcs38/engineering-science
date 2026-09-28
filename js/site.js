// Site root, worked out from where this script is loaded (…/js/site.js)
var ESS_ROOT = (function () {
  var src = document.currentScript ? document.currentScript.src : '';
  return src ? src.replace(/js\/site\.js.*$/, '') : '/';
})();

// ── SIDEBAR TOGGLE ──
function toggleSection(id) {
  const children = document.getElementById(id + '-children');
  const chev = document.getElementById(id + '-chev');
  if (!children) return;
  const isOpen = children.classList.contains('open');
  children.classList.toggle('open', !isOpen);
  if (chev) chev.classList.toggle('open', !isOpen);
}

// ── ACTIVE NAV from URL ──
function setActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.sb-topic, .sb-subtopic').forEach(el => {
    const href = el.getAttribute('href') || '';
    const page = href.split('/').pop();
    if (page && path.endsWith(page)) {
      el.classList.add('active');
      const section = el.closest('.sb-children');
      if (section) {
        section.classList.add('open');
        const id = section.id.replace('-children', '');
        const chev = document.getElementById(id + '-chev');
        if (chev) chev.classList.add('open');
      }
    }
  });
}

// ── TEACHER AUTH ──
// The old password login has been retired: a password written in this file
// can be read by anyone. Teachers now request access by email (see
// teacher/login.html) and teacher documents are shared directly from
// Google Drive. Any old teacher page now sends visitors to that message.
function teacherLogin(event) { if (event) event.preventDefault(); }

function checkTeacherAuth() {
  window.location.href = ESS_ROOT + 'teacher/login.html';
}

function teacherLogout() {
  window.location.href = ESS_ROOT + 'index.html';
}

document.addEventListener('DOMContentLoaded', setActiveNav);

/* ============================================================
   RESOURCE STATUS
   Controls the Available / Not yet available badges on every
   topic index page.

   HOW TO UPDATE WHEN YOU UPLOAD A NEW RESOURCE:
   1. Open js/site.js in Notepad
   2. Find the topic below (e.g. 'pneumatics')
   3. Find the resource you've just uploaded (e.g. 'homework')
   4. Change 'soon' to 'available'
   5. Save the file and push via GitHub Desktop
   The badge on the index page updates automatically.

   RESOURCE KEYS:
   notes        = Course notes
   extension    = Extension tasks
   homework     = Homework assignment
   presentation = Teaching presentation
   practical    = Practical tasks and demonstrations
   ============================================================ */

var RESOURCE_STATUS = {
  'systems-approach':  { notes:'available', extension:'available', homework:'soon', presentation:'soon', practical:'soon' },
  'energy-efficiency': { notes:'available', extension:'available', homework:'soon', presentation:'soon', practical:'soon' },
  'roles-disciplines': { notes:'available', extension:'available', homework:'soon', presentation:'soon', practical:'soon' },
  'impacts':           { notes:'available', extension:'available', homework:'soon', presentation:'soon', practical:'soon' },
  'analogue':          { notes:'available', extension:'soon',      homework:'soon', presentation:'soon', practical:'soon' },
  'digital':           { notes:'available', extension:'soon',      homework:'soon', presentation:'soon', practical:'soon' },
  'control':           { notes:'available', extension:'soon',      homework:'soon', presentation:'soon', practical:'soon' },
  'drive-systems':     { notes:'available', extension:'soon',      homework:'soon', presentation:'soon', practical:'soon' },
  'pneumatics':        { notes:'available', extension:'soon',      homework:'soon', presentation:'available', practical:'soon' },
  'structures-forces': { notes:'available', extension:'soon',      homework:'soon', presentation:'soon', practical:'soon' },
  'materials':         { notes:'available', extension:'soon',      homework:'soon', presentation:'soon', practical:'soon' }
};

// Reads the TOPIC variable declared on each index page and sets badges accordingly
document.addEventListener('DOMContentLoaded', function () {
  if (typeof TOPIC === 'undefined') return;
  var status = RESOURCE_STATUS[TOPIC];
  if (!status) return;
  document.querySelectorAll('[data-resource]').forEach(function (card) {
    var key = card.getAttribute('data-resource');
    var badge = card.querySelector('.rtc-badge-auto');
    if (!badge || !status[key]) return;
    if (status[key] === 'available') {
      badge.className = 'rtc-badge';
      badge.textContent = 'Available';
    } else {
      badge.className = 'rtc-badge-unavailable';
      badge.textContent = 'Not yet available';
    }
  });
});

/* ============================================================
   UNIT TEST CONFIG
   Controls the password-protected unit tests on each topic page.

   HOW TO ACTIVATE A UNIT TEST FOR A TOPIC:
   1. Upload the test PDF to Google Drive
   2. Set sharing to "Anyone with the link can view"
   3. Copy the file ID from the share URL
      (it's the long string between /d/ and /view in the URL)
   4. Find the topic below
   5. Replace '' in id: '' with your file ID (keep the quotes)
   6. Replace '' in password: '' with the password for pupils
   7. Change status: 'soon' to status: 'available'
   8. Save and push via GitHub Desktop

   The password will appear automatically in the Teacher Area
   and the test will become accessible to pupils on the topic page.
   ============================================================ */

var UNIT_TEST_CONFIG = {

  // ── Engineering Contexts ──────────────────────────────────

  'systems-approach': {
    status:   'soon',
    id:       '',
    password: 'loop'               // ← add the pupil password here
  },
  'energy-efficiency': {
    status:   'soon',
    id:       '',              // ← paste Google Drive file ID here
    password: ''               // ← add the pupil password here
  },
  'roles-disciplines': {
    status:   'soon',
    id:       '',              // ← paste Google Drive file ID here
    password: ''               // ← add the pupil password here
  },
  'impacts': {
    status:   'soon',
    id:       '',              // ← paste Google Drive file ID here
    password: ''               // ← add the pupil password here
  },

  // ── Electronics and Control ───────────────────────────────

  'analogue': {
    status:   'soon',
    id:       '',
    password: 'voltage'
  },
  'digital': {
    status:   'soon',
    id:       '',
    password: 'hello'
  },
  'control': {
    status:   'soon',
    id:       '',              // ← paste Google Drive file ID here
    password: ''               // ← add the pupil password here
  },

  // ── Mechanisms and Structures ─────────────────────────────

  'drive-systems': {
    status:   'soon',
    id:       '',              // ← paste Google Drive file ID here
    password: ''               // ← add the pupil password here
  },
  'pneumatics': {
    status:   'soon',
    id:       '',              // ← paste Google Drive file ID here
    password: ''               // ← add the pupil password here
  },
  'structures-forces': {
    status:   'soon',
    id:       '',              // ← paste Google Drive file ID here
    password: ''               // ← add the pupil password here
  },
  'materials': {
    status:   'soon',
    id:       '',              // ← paste Google Drive file ID here
    password: ''               // ← add the pupil password here
  }

};

/* ============================================================
   TEACHER DOCUMENTS
   Controls the document cards on each Teacher Area topic page.

   HOW TO ADD A DOCUMENT:
   1. Upload the file to Google Drive
   2. Set sharing to "Anyone with the link can view"
   3. Copy the file ID from the share URL
   4. Find the topic and document key below
   5. Replace '' in id: '' with your file ID (keep the quotes)
   6. Change status: 'soon' to status: 'available'
   7. Save and push via GitHub Desktop

   DOCUMENT KEYS:
   notes_pdf         = Printable course notes (PDF)
   ext_marking       = Marking instructions — extension tasks
   hw_marking        = Marking instructions — homework
   unit_test_marking = Marking instructions — unit test
   ============================================================ */

var TEACHER_DOCS = {

  // ── Engineering Contexts ──────────────────────────────────

  'systems-approach': [
    { key: 'notes_pdf',         status: 'soon',      id: '',                              label: 'Printable course notes \u2014 PDF',           icon: '\u1F5A8' },
    { key: 'notes_answers',     status: 'soon',      id: '',                              label: 'Answers to course notes \u2014 PDF',         icon: '\u2705' },
    { key: 'ext_marking',       status: 'soon',      id: '',                              label: 'Marking instructions \u2014 extension tasks', icon: '\u2705' },
    { key: 'hw_marking',        status: 'soon',      id: '',                              label: 'Marking instructions \u2014 homework',        icon: '\u2705' },
    { key: 'unit_test_marking', status: 'soon',      id: '',                              label: 'Marking instructions \u2014 unit test',       icon: '\u2705' }
  ],
  'energy-efficiency': [
    { key: 'notes_pdf',         status: 'soon',      id: '',                              label: 'Printable course notes \u2014 PDF',           icon: '\u1F5A8' },
    { key: 'notes_answers',     status: 'soon',      id: '',                              label: 'Answers to course notes \u2014 PDF',         icon: '\u2705' },
    { key: 'ext_marking',       status: 'soon',      id: '',                              label: 'Marking instructions \u2014 extension tasks', icon: '\u2705' },
    { key: 'hw_marking',        status: 'soon',      id: '',                              label: 'Marking instructions \u2014 homework',        icon: '\u2705' },
    { key: 'unit_test_marking', status: 'soon',      id: '',                              label: 'Marking instructions \u2014 unit test',       icon: '\u2705' }
  ],
  'roles-disciplines': [
    { key: 'notes_pdf',         status: 'soon',      id: '',                              label: 'Printable course notes \u2014 PDF',           icon: '\u1F5A8' },
    { key: 'notes_answers',     status: 'soon',      id: '',                              label: 'Answers to course notes \u2014 PDF',         icon: '\u2705' },
    { key: 'ext_marking',       status: 'soon',      id: '',                              label: 'Marking instructions \u2014 extension tasks', icon: '\u2705' },
    { key: 'hw_marking',        status: 'soon',      id: '',                              label: 'Marking instructions \u2014 homework',        icon: '\u2705' },
    { key: 'unit_test_marking', status: 'soon',      id: '',                              label: 'Marking instructions \u2014 unit test',       icon: '\u2705' }
  ],
  'impacts': [
    { key: 'notes_pdf',         status: 'soon',      id: '',                              label: 'Printable course notes \u2014 PDF',           icon: '\u1F5A8' },
    { key: 'notes_answers',     status: 'soon',      id: '',                              label: 'Answers to course notes \u2014 PDF',         icon: '\u2705' },
    { key: 'ext_marking',       status: 'soon',      id: '',                              label: 'Marking instructions \u2014 extension tasks', icon: '\u2705' },
    { key: 'hw_marking',        status: 'soon',      id: '',                              label: 'Marking instructions \u2014 homework',        icon: '\u2705' },
    { key: 'unit_test_marking', status: 'soon',      id: '',                              label: 'Marking instructions \u2014 unit test',       icon: '\u2705' }
  ],

  // ── Electronics and Control ───────────────────────────────

  'analogue': [
    { key: 'notes_pdf',         status: 'soon',      id: '',                              label: 'Printable course notes \u2014 PDF',           icon: '\u1F5A8' },
    { key: 'notes_answers',     status: 'soon',      id: '',                              label: 'Answers to course notes \u2014 PDF',         icon: '\u2705' },
    { key: 'ext_marking',       status: 'soon',      id: '',                              label: 'Marking instructions \u2014 extension tasks', icon: '\u2705' },
    { key: 'hw_marking',        status: 'soon',      id: '',                              label: 'Marking instructions \u2014 homework',        icon: '\u2705' },
    { key: 'unit_test_marking', status: 'soon', id: '', label: 'Marking instructions \u2014 unit test', icon: '\u2705' }
  ],
  'digital': [
    { key: 'notes_pdf',         status: 'soon',      id: '',                              label: 'Printable course notes \u2014 PDF',           icon: '\u1F5A8' },
    { key: 'notes_answers',     status: 'soon',      id: '',                              label: 'Answers to course notes \u2014 PDF',         icon: '\u2705' },
    { key: 'ext_marking',       status: 'soon',      id: '',                              label: 'Marking instructions \u2014 extension tasks', icon: '\u2705' },
    { key: 'hw_marking',        status: 'soon',      id: '',                              label: 'Marking instructions \u2014 homework',        icon: '\u2705' },
    { key: 'unit_test_marking', status: 'soon', id: '', label: 'Marking instructions \u2014 unit test', icon: '\u2705' }
  ],
  'control': [
    { key: 'notes_pdf',         status: 'soon',      id: '',                              label: 'Printable course notes \u2014 PDF',           icon: '\u1F5A8' },
    { key: 'notes_answers',     status: 'soon',      id: '',                              label: 'Answers to course notes \u2014 PDF',         icon: '\u2705' },
    { key: 'ext_marking',       status: 'soon',      id: '',                              label: 'Marking instructions \u2014 extension tasks', icon: '\u2705' },
    { key: 'hw_marking',        status: 'soon',      id: '',                              label: 'Marking instructions \u2014 homework',        icon: '\u2705' },
    { key: 'unit_test_marking', status: 'soon',      id: '',                              label: 'Marking instructions \u2014 unit test',       icon: '\u2705' }
  ],

  // ── Mechanisms and Structures ─────────────────────────────

  'drive-systems': [
    { key: 'notes_pdf',         status: 'soon',      id: '',                              label: 'Printable course notes \u2014 PDF',           icon: '\u1F5A8' },
    { key: 'notes_answers',     status: 'soon',      id: '',                              label: 'Answers to course notes \u2014 PDF',         icon: '\u2705' },
    { key: 'ext_marking',       status: 'soon', id: '', label: 'Marking instructions \u2014 extension tasks', icon: '\u2705' },
    { key: 'hw_marking',        status: 'soon',      id: '',                              label: 'Marking instructions \u2014 homework',        icon: '\u2705' },
    { key: 'unit_test_marking', status: 'soon',      id: '',                              label: 'Marking instructions \u2014 unit test',       icon: '\u2705' }
  ],
  'pneumatics': [
    { key: 'notes_pdf',         status: 'soon',      id: '',                              label: 'Printable course notes \u2014 PDF',           icon: '\u1F5A8' },
    { key: 'notes_answers',     status: 'soon',      id: '',                              label: 'Answers to course notes \u2014 PDF',         icon: '\u2705' },
    { key: 'ext_marking',       status: 'soon',      id: '',                              label: 'Marking instructions \u2014 extension tasks', icon: '\u2705' },
    { key: 'hw_marking',        status: 'soon',      id: '',                              label: 'Marking instructions \u2014 homework',        icon: '\u2705' },
    { key: 'unit_test_marking', status: 'soon',      id: '',                              label: 'Marking instructions \u2014 unit test',       icon: '\u2705' }
  ],
  'structures-forces': [
    { key: 'notes_pdf',         status: 'soon',      id: '',                              label: 'Printable course notes \u2014 PDF',           icon: '\u1F5A8' },
    { key: 'notes_answers',     status: 'soon',      id: '',                              label: 'Answers to course notes \u2014 PDF',         icon: '\u2705' },
    { key: 'ext_marking',       status: 'soon',      id: '',                              label: 'Marking instructions \u2014 extension tasks', icon: '\u2705' },
    { key: 'hw_marking',        status: 'soon',      id: '',                              label: 'Marking instructions \u2014 homework',        icon: '\u2705' },
    { key: 'unit_test_marking', status: 'soon',      id: '',                              label: 'Marking instructions \u2014 unit test',       icon: '\u2705' }
  ],
  'materials': [
    { key: 'notes_pdf',         status: 'soon',      id: '',                              label: 'Printable course notes \u2014 PDF',           icon: '\u1F5A8' },
    { key: 'notes_answers',     status: 'soon',      id: '',                              label: 'Answers to course notes \u2014 PDF',         icon: '\u2705' },
    { key: 'ext_marking',       status: 'soon',      id: '',                              label: 'Marking instructions \u2014 extension tasks', icon: '\u2705' },
    { key: 'hw_marking',        status: 'soon',      id: '',                              label: 'Marking instructions \u2014 homework',        icon: '\u2705' },
    { key: 'unit_test_marking', status: 'soon',      id: '',                              label: 'Marking instructions \u2014 unit test',       icon: '\u2705' }
  ]

};

/* ============================================================
   TOPIC PAGE CARDS
   Sets the Available / Not yet available badges on the
   Printable course notes, Answers to course notes and Unit test
   cards on each topic index page.
   - Printable notes and Answers: set in TEACHER_DOCS below
     (keys notes_pdf and notes_answers)
   - Unit test: set in UNIT_TEST_CONFIG below
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  if (typeof TOPIC === 'undefined') return;

  function markAvailable(card, badge) {
    card.style.opacity = '1';
    badge.className = 'rtc-badge';
    badge.textContent = 'Available';
  }

  // Printable course notes + Answers to course notes (Google Drive PDFs)
  var docs = (typeof TEACHER_DOCS !== 'undefined') ? TEACHER_DOCS[TOPIC] : null;
  document.querySelectorAll('[data-doc]').forEach(function (card) {
    if (!docs) return;
    var key = card.getAttribute('data-doc');
    var doc = docs.find(function (d) { return d.key === key; });
    var badge = card.querySelector('.rtc-badge-unavailable');
    if (doc && doc.status === 'available' && doc.id && badge) {
      card.href = 'https://drive.google.com/file/d/' + doc.id + '/view';
      card.target = '_blank';
      card.onclick = null;
      card.removeAttribute('onclick');
      markAvailable(card, badge);
    }
  });

  // Unit test
  var utCard = document.getElementById('unit-test-card');
  var utBadge = document.getElementById('unit-test-badge');
  var ut = (typeof UNIT_TEST_CONFIG !== 'undefined') ? UNIT_TEST_CONFIG[TOPIC] : null;
  if (utCard && utBadge && ut && ut.status === 'available' && ut.id) {
    markAvailable(utCard, utBadge);
  }
});

function renderTeacherDocs(topicKey, containerId) {
  var container = document.getElementById(containerId);
  if (!container) return;
  var docs = TEACHER_DOCS[topicKey];
  if (!docs) return;
  var html = '';
  docs.forEach(function(doc) {
    var available = doc.status === 'available' && doc.id && doc.id !== 'REPLACE_WITH_DRIVE_ID';
    var href = available ? 'https://drive.google.com/file/d/' + doc.id + '/view' : '#';
    var badge = available
      ? '<span class="rtc-badge">Available</span>'
      : '<span class="rtc-badge-unavailable" style="display:inline-block;font-size:10px;font-weight:500;background:#fef2f2;color:#b91c1c;padding:2px 7px;border-radius:20px;margin-top:6px;">Not yet available</span>';
    html += '<a href="' + href + '" ' + (available ? 'target="_blank"' : '') + ' class="resource-type-card' + (available ? '' : ' teacher-only') + '" style="text-align:center;' + (available ? '' : 'opacity:0.5;pointer-events:none;') + '">' +
      '<div class="rtc-icon">' + doc.icon + '</div>' +
      '<div class="rtc-title">' + doc.label + '</div>' +
      badge +
      '</a>';
  });
  container.innerHTML = html;
}

/* ============================================================
   SITEWIDE UI
   Development banner, feedback button, and pop-out feedback panel.
   Set SHOW_BANNER = false when the site is complete.
   ============================================================ */

(function () {

  var SHOW_BANNER    = false;
  var FEEDBACK_EMAIL = 'engineeringsciencescotland@gmail.com';

  // ---- Pop-out feedback panel (shared by banner link and floating button) ----
  function injectFeedbackPanel() {
    if (document.getElementById('essfb-overlay')) return;

    var style = document.createElement('style');
    style.textContent =
      '.essfb-overlay{display:none;position:fixed;inset:0;background:rgba(15,23,42,.5);z-index:100000;align-items:center;justify-content:center;padding:20px;}' +
      '.essfb-overlay.open{display:flex;}' +
      '.essfb-panel{background:#fff;border-radius:14px;max-width:420px;width:100%;padding:28px 26px 24px;box-shadow:0 20px 60px rgba(0,0,0,.35);position:relative;font-family:inherit;}' +
      '.essfb-close{position:absolute;top:12px;right:14px;background:none;border:none;font-size:22px;line-height:1;color:#94a3b8;cursor:pointer;padding:4px 6px;}' +
      '.essfb-close:hover{color:#334155;}' +
      '.essfb-panel h3{margin:0 0 12px;font-size:18px;color:#0f766e;}' +
      '.essfb-panel p{margin:0 0 18px;font-size:14px;line-height:1.6;color:#475569;}' +
      '.essfb-email{display:flex;align-items:center;justify-content:center;gap:8px;background:#0f766e;color:#fff;font-size:14px;font-weight:700;padding:12px 18px;border-radius:9px;text-decoration:none;transition:background .15s;}' +
      '.essfb-email:hover{background:#0d9488;}';
    document.head.appendChild(style);

    var overlay = document.createElement('div');
    overlay.className = 'essfb-overlay';
    overlay.id = 'essfb-overlay';
    overlay.addEventListener('click', function(e){ if (e.target === overlay) closeFeedbackPanel(); });
    overlay.innerHTML =
      '<div class="essfb-panel">' +
        '<button class="essfb-close" onclick="window.ESSFeedback.close()" aria-label="Close">&times;</button>' +
        '<h3>Help us improve this site</h3>' +
        '<p>Spotted a typo, a broken link, a confusing explanation, or an outright mistake? Every report &mdash; however small &mdash; helps us make these notes better for every pupil and teacher who uses them. We read every message.</p>' +
        '<a class="essfb-email" href="mailto:' + FEEDBACK_EMAIL + '?subject=ESS%20Website%20Feedback">&#x2709;&#xFE0F; ' + FEEDBACK_EMAIL + '</a>' +
      '</div>';
    document.body.appendChild(overlay);
  }

  function openFeedbackPanel(e) {
    if (e) e.preventDefault();
    injectFeedbackPanel();
    document.getElementById('essfb-overlay').classList.add('open');
  }
  function closeFeedbackPanel() {
    var overlay = document.getElementById('essfb-overlay');
    if (overlay) overlay.classList.remove('open');
  }
  window.ESSFeedback = { open: openFeedbackPanel, close: closeFeedbackPanel };

  if (SHOW_BANNER) {
    var bannerStyle = [
      'display:flex', 'align-items:center', 'justify-content:center',
      'gap:12px', 'flex-wrap:wrap', 'background:#ffd000',
      'border-bottom:1px solid #e6bb00', 'padding:5px 20px',
      'font-size:12px', 'color:#5c3d00', 'font-family:inherit',
      'text-align:center', 'position:sticky', 'top:0', 'z-index:999',
      'width:100%', 'box-sizing:border-box'
    ].join(';');
    var linkStyle = 'color:#5c3d00;font-weight:normal;text-decoration:underline;cursor:pointer';
    var banner = document.createElement('div');
    banner.setAttribute('style', bannerStyle);
    banner.innerHTML =
      '<span>&#x1F6A7; This site is under active development &mdash; some resources are not yet available.</span>' +
      '<a href="#" onclick="window.ESSFeedback.open(event)" style="' + linkStyle + '">Spotted an issue? Let us know.</a>';
    var main = document.querySelector('.main');
    if (main) main.insertBefore(banner, main.firstChild);
  }

  var btnStyle = [
    'position:fixed', 'bottom:24px', 'right:24px', 'z-index:9999',
    'display:inline-flex', 'align-items:center', 'justify-content:center', 'gap:7px',
    'width:120px', 'box-sizing:border-box',
    'background:#0f766e', 'color:white', 'font-size:13px', 'font-weight:700',
    'font-family:inherit', 'padding:12px 14px', 'border-radius:999px',
    'box-shadow:0 4px 14px rgba(0,0,0,0.18)', 'text-decoration:none',
    'transition:background 0.2s, transform 0.15s', 'cursor:pointer', 'border:none'
  ].join(';');

  var feedbackBtn = document.createElement('a');
  feedbackBtn.href = '#';
  feedbackBtn.addEventListener('click', function(e){ window.ESSFeedback.open(e); });
  feedbackBtn.setAttribute('style', btnStyle);
  feedbackBtn.innerHTML = '&#x2709;&#xFE0F; Feedback';
  feedbackBtn.title = 'Report an issue or send feedback about this site';
  feedbackBtn.addEventListener('mouseover', function(){ this.style.background='#0d9488'; this.style.transform='translateY(-2px)'; });
  feedbackBtn.addEventListener('mouseout',  function(){ this.style.background='#0f766e'; this.style.transform='translateY(0)'; });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){ document.body.appendChild(feedbackBtn); });
  } else {
    document.body.appendChild(feedbackBtn);
  }

  // ---- About ESS pop-out (same style as the feedback panel) ----
  function openAboutPanel(e) {
    if (e) e.preventDefault();
    injectFeedbackPanel();              // makes sure the shared panel styles exist
    var overlay = document.getElementById('essab-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'essfb-overlay';
      overlay.id = 'essab-overlay';
      overlay.addEventListener('click', function(ev){ if (ev.target === overlay) closeAboutPanel(); });
      overlay.innerHTML =
        '<div class="essfb-panel">' +
          '<button class="essfb-close" onclick="window.ESSAbout.close()" aria-label="Close">&times;</button>' +
          '<h3>About Engineering Science Scotland</h3>' +
          '<p>Engineering Science Scotland (ESS) aims to improve access to Engineering Science in schools across Scotland.</p>' +
          '<p>The site has been created by three Engineering Science teachers to support teachers and pupils. All materials have been validated to meet Qualifications Scotland standards.</p>' +
          '<a class="essfb-email" href="mailto:' + FEEDBACK_EMAIL + '?subject=About%20ESS">&#x2709;&#xFE0F; ' + FEEDBACK_EMAIL + '</a>' +
        '</div>';
      document.body.appendChild(overlay);
    }
    overlay.classList.add('open');
  }
  function closeAboutPanel() {
    var overlay = document.getElementById('essab-overlay');
    if (overlay) overlay.classList.remove('open');
  }
  window.ESSAbout = { open: openAboutPanel, close: closeAboutPanel };
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') { closeAboutPanel(); closeFeedbackPanel(); }
  });

  // ---- Topbar tidy-up: logo, level tabs, About button ----
  // Runs after every other page script so nothing overwrites it.
  function tidyTopbar() {
    // Logo: same image and wording on every page
    var logoMark = document.querySelector('.topbar .logo-mark');
    if (logoMark) {
      var img = document.createElement('img');
      img.src = ESS_ROOT + 'images/logo.png';
      img.alt = 'Engineering Science Scotland logo';
      img.style.cssText = 'height:34px;width:auto;display:block;';
      logoMark.replaceWith(img);
    }
    var logoTitle = document.querySelector('.topbar .logo-title');
    var logoSub   = document.querySelector('.topbar .logo-sub');
    if (logoTitle) logoTitle.textContent = 'Engineering Science';
    if (logoSub) {
      logoSub.innerHTML = 'SCOTLAND'.split('').map(function(c){ return '<span>' + c + '</span>'; }).join('');
      logoSub.classList.add('logo-sub-spread');
      logoSub.setAttribute('aria-label', 'Scotland');
    }

    // Level tabs: Higher and Advanced Higher greyed out and not clickable
    document.querySelectorAll('.level-tab').forEach(function (tab) {
      var href  = tab.getAttribute('href') || '';
      var level = tab.getAttribute('data-level') || '';
      if (level === 'higher' || level === 'ah' || /(^|\/)(higher|ah)\//.test(href)) {
        tab.classList.remove('active');
        tab.classList.add('level-tab-disabled');
        tab.removeAttribute('href');
        tab.setAttribute('aria-disabled', 'true');
        tab.setAttribute('tabindex', '-1');
        tab.title = 'Coming soon';
      }
    });

    // About ESS button, to the left of the Teacher area button
    var right = document.querySelector('.topbar .topbar-right');
    if (right && !document.getElementById('ess-about-btn')) {
      var about = document.createElement('button');
      about.type = 'button';
      about.className = 'teacher-btn';
      about.id = 'ess-about-btn';
      about.innerHTML = '<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.2" stroke="currentColor" stroke-width="1.3"/><path d="M8 7.2v4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><circle cx="8" cy="4.9" r="0.8" fill="currentColor"/></svg>About ESS';
      about.addEventListener('click', openAboutPanel);
      right.insertBefore(about, right.firstChild);
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){ setTimeout(tidyTopbar, 0); });
  } else {
    setTimeout(tidyTopbar, 0);
  }

})();
