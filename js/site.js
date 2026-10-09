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
   UNIT TESTS
   Unit tests and their marking instructions are no longer on the
   website. They are kept in the restricted ESS Teacher Materials
   folder in Google Drive and shared directly with teachers.
   ============================================================ */


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
   ============================================================ */

var TEACHER_DOCS = {

  // ── Engineering Contexts ──────────────────────────────────

  'systems-approach': [
    { key: 'notes_pdf',         status: 'available', id: '', page: 'course-notes.pdf', label: 'Printable course notes \u2014 PDF',           icon: '\uD83D\uDDA8' },
    { key: 'notes_answers',     status: 'available', id: '', page: 'answers.html',     label: 'Answers to course notes',                   icon: '\u2705' },
    { key: 'ext_marking',       status: 'soon',      id: '',                              label: 'Marking instructions \u2014 extension tasks', icon: '\u2705' },
    { key: 'hw_marking',        status: 'soon',      id: '',                              label: 'Marking instructions \u2014 homework',        icon: '\u2705' },
  ],
  'energy-efficiency': [
    { key: 'notes_pdf',         status: 'available', id: '', page: 'course-notes.pdf', label: 'Printable course notes \u2014 PDF',           icon: '\uD83D\uDDA8' },
    { key: 'notes_answers',     status: 'available', id: '', page: 'answers.html',     label: 'Answers to course notes',                   icon: '\u2705' },
    { key: 'ext_marking',       status: 'soon',      id: '',                              label: 'Marking instructions \u2014 extension tasks', icon: '\u2705' },
    { key: 'hw_marking',        status: 'soon',      id: '',                              label: 'Marking instructions \u2014 homework',        icon: '\u2705' },
  ],
  'roles-disciplines': [
    { key: 'notes_pdf',         status: 'available', id: '', page: 'course-notes.pdf', label: 'Printable course notes \u2014 PDF',           icon: '\uD83D\uDDA8' },
    { key: 'notes_answers',     status: 'available', id: '', page: 'answers.html',     label: 'Answers to course notes',                   icon: '\u2705' },
    { key: 'ext_marking',       status: 'soon',      id: '',                              label: 'Marking instructions \u2014 extension tasks', icon: '\u2705' },
    { key: 'hw_marking',        status: 'soon',      id: '',                              label: 'Marking instructions \u2014 homework',        icon: '\u2705' },
  ],
  'impacts': [
    { key: 'notes_pdf',         status: 'available', id: '', page: 'course-notes.pdf', label: 'Printable course notes \u2014 PDF',           icon: '\uD83D\uDDA8' },
    { key: 'notes_answers',     status: 'available', id: '', page: 'answers.html',     label: 'Answers to course notes',                   icon: '\u2705' },
    { key: 'ext_marking',       status: 'soon',      id: '',                              label: 'Marking instructions \u2014 extension tasks', icon: '\u2705' },
    { key: 'hw_marking',        status: 'soon',      id: '',                              label: 'Marking instructions \u2014 homework',        icon: '\u2705' },
  ],

  // ── Electronics and Control ───────────────────────────────

  'analogue': [
    { key: 'notes_pdf',         status: 'available', id: '', page: 'course-notes.pdf', label: 'Printable course notes \u2014 PDF',           icon: '\uD83D\uDDA8' },
    { key: 'notes_answers',     status: 'available', id: '', page: 'answers.html',     label: 'Answers to course notes',                   icon: '\u2705' },
    { key: 'ext_marking',       status: 'soon',      id: '',                              label: 'Marking instructions \u2014 extension tasks', icon: '\u2705' },
    { key: 'hw_marking',        status: 'soon',      id: '',                              label: 'Marking instructions \u2014 homework',        icon: '\u2705' },
  ],
  'digital': [
    { key: 'notes_pdf',         status: 'available', id: '', page: 'course-notes.pdf', label: 'Printable course notes \u2014 PDF',           icon: '\uD83D\uDDA8' },
    { key: 'notes_answers',     status: 'available', id: '', page: 'answers.html',     label: 'Answers to course notes',                   icon: '\u2705' },
    { key: 'ext_marking',       status: 'soon',      id: '',                              label: 'Marking instructions \u2014 extension tasks', icon: '\u2705' },
    { key: 'hw_marking',        status: 'soon',      id: '',                              label: 'Marking instructions \u2014 homework',        icon: '\u2705' },
  ],
  'control': [
    { key: 'notes_pdf',         status: 'available', id: '', page: 'course-notes.pdf', label: 'Printable course notes \u2014 PDF',           icon: '\uD83D\uDDA8' },
    { key: 'notes_answers',     status: 'available', id: '', page: 'answers.html',     label: 'Answers to course notes',                   icon: '\u2705' },
    { key: 'ext_marking',       status: 'soon',      id: '',                              label: 'Marking instructions \u2014 extension tasks', icon: '\u2705' },
    { key: 'hw_marking',        status: 'soon',      id: '',                              label: 'Marking instructions \u2014 homework',        icon: '\u2705' },
  ],

  // ── Mechanisms and Structures ─────────────────────────────

  'drive-systems': [
    { key: 'notes_pdf',         status: 'available', id: '', page: 'course-notes.pdf', label: 'Printable course notes \u2014 PDF',           icon: '\uD83D\uDDA8' },
    { key: 'notes_answers',     status: 'available', id: '', page: 'answers.html',     label: 'Answers to course notes',                   icon: '\u2705' },
    { key: 'ext_marking',       status: 'soon', id: '', label: 'Marking instructions \u2014 extension tasks', icon: '\u2705' },
    { key: 'hw_marking',        status: 'soon',      id: '',                              label: 'Marking instructions \u2014 homework',        icon: '\u2705' },
  ],
  'pneumatics': [
    { key: 'notes_pdf',         status: 'available', id: '', page: 'course-notes.pdf', label: 'Printable course notes \u2014 PDF',           icon: '\uD83D\uDDA8' },
    { key: 'notes_answers',     status: 'available', id: '', page: 'answers.html',     label: 'Answers to course notes',                   icon: '\u2705' },
    { key: 'ext_marking',       status: 'soon',      id: '',                              label: 'Marking instructions \u2014 extension tasks', icon: '\u2705' },
    { key: 'hw_marking',        status: 'soon',      id: '',                              label: 'Marking instructions \u2014 homework',        icon: '\u2705' },
  ],
  'structures-forces': [
    { key: 'notes_pdf',         status: 'available', id: '', page: 'course-notes.pdf', label: 'Printable course notes \u2014 PDF',           icon: '\uD83D\uDDA8' },
    { key: 'notes_answers',     status: 'available', id: '', page: 'answers.html',     label: 'Answers to course notes',                   icon: '\u2705' },
    { key: 'ext_marking',       status: 'soon',      id: '',                              label: 'Marking instructions \u2014 extension tasks', icon: '\u2705' },
    { key: 'hw_marking',        status: 'soon',      id: '',                              label: 'Marking instructions \u2014 homework',        icon: '\u2705' },
  ],
  'materials': [
    { key: 'notes_pdf',         status: 'available', id: '', page: 'course-notes.pdf', label: 'Printable course notes \u2014 PDF',           icon: '\uD83D\uDDA8' },
    { key: 'notes_answers',     status: 'available', id: '', page: 'answers.html',     label: 'Answers to course notes',                   icon: '\u2705' },
    { key: 'ext_marking',       status: 'soon',      id: '',                              label: 'Marking instructions \u2014 extension tasks', icon: '\u2705' },
    { key: 'hw_marking',        status: 'soon',      id: '',                              label: 'Marking instructions \u2014 homework',        icon: '\u2705' },
  ]

};

/* ============================================================
   TOPIC PAGE CARDS
   Sets the Available / Not yet available badges on the
   Printable course notes and Answers to course notes cards on each
   topic index page.
   - Printable notes and Answers: set in TEACHER_DOCS below
     (keys notes_pdf and notes_answers). For a Google Drive file use
     id: 'FILE-ID'; for a page on this site (the locked HTML answers)
     use page: 'answers.html'. Then set status: 'available'.
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
    if (doc && doc.status === 'available' && doc.page && badge) {
      // A page on this site (e.g. the locked HTML answers)
      card.href = doc.page;
      if (/\.pdf$/i.test(doc.page)) card.target = '_blank';
      card.onclick = null;
      card.removeAttribute('onclick');
      markAvailable(card, badge);
    } else if (doc && doc.status === 'available' && doc.id && badge) {
      card.href = 'https://drive.google.com/file/d/' + doc.id + '/view';
      card.target = '_blank';
      card.onclick = null;
      card.removeAttribute('onclick');
      markAvailable(card, badge);
    }
  });


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
        '<div class="essfb-panel" style="max-height:90vh;overflow-y:auto;font-size:13.5px;width:min(680px,94vw);max-width:none;box-sizing:border-box;">' +
          '<button class="essfb-close" onclick="window.ESSAbout.close()" aria-label="Close">&times;</button>' +
          '<h3>About Engineering Science Scotland</h3>' +
          '<p>Engineering Science Scotland (ESS) is a free online resource for National 5 Engineering Science, written by three Engineering Science teachers to support teachers and pupils in schools across Scotland.</p>' +
          '<p>It brings together course notes, simulators, printable resources and answers, with the aim of making Engineering Science easier to teach, easier to learn, and open to more pupils in more schools.</p>' +
          '<p>The site has been developed thanks to the generous funders of the Edinburgh Computing &amp; Engineering Science in Schools (ECSES) project, which exists to broaden access to digital and engineering futures.</p>' +
          '<p>All materials are written to follow the Qualifications Scotland course specification for National 5 Engineering Science.</p>' +
          '<h4 style="margin:16px 0 6px;font-size:14px;">Get in touch</h4>' +
          '<p style="margin-bottom:6px;">We&rsquo;d love to hear from you, especially if:</p>' +
          '<ul style="margin:0 0 10px 18px;padding:0;font-size:13px;line-height:1.6;color:inherit;">' +
            '<li>you&rsquo;ve spotted a typo, a broken link, a confusing explanation or a mistake;</li>' +
            '<li>you have an idea for a resource, or a suggestion to improve the site;</li>' +
            '<li>you&rsquo;re using ESS with your classes and would like to tell us how it&rsquo;s going;</li>' +
            '<li><strong>you could help us develop materials for Higher and Advanced Higher</strong>, which are coming next.</li>' +
          '</ul>' +
          '<p>Every message is read.</p>' +
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
  // ---- User guide pop-out (same style as About ESS) ----
  function openGuidePanel(e) {
    if (e) e.preventDefault();
    injectFeedbackPanel();
    var overlay = document.getElementById('essug-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'essfb-overlay';
      overlay.id = 'essug-overlay';
      overlay.addEventListener('click', function(ev){ if (ev.target === overlay) closeGuidePanel(); });
      overlay.innerHTML =
        '<div class="essfb-panel essug-panel" style="max-height:90vh;overflow-y:auto;font-size:13.5px;width:min(760px,94vw);max-width:none;box-sizing:border-box;">' +
          '<button class="essfb-close" onclick="window.ESSGuide.close()" aria-label="Close">&times;</button>' +
          '<h3>User guide</h3><p>Engineering Science Scotland (ESS) is a free resource for National 5 Engineering Science. It covers all 11 topics, with everything a class needs to work through the course, and a password-protected area for teachers.</p><h4>The course notes: the heart of the site</h4><p>The online course notes are the main part of ESS. Each topic&rsquo;s notes take pupils through the content step by step, with explanations, diagrams, worked examples, built-in simulators, tasks and design challenges.</p><p><strong>They&rsquo;re designed to be taught from</strong> &mdash; shown on a projector or smartboard so you can talk the class through explanations, go over worked examples and demonstrate the simulators live, then set the tasks that follow. <strong>They also work for independent study:</strong> each topic is self-contained, so pupils can work through the notes on their own for catch-up, homework, working at their own pace or revision.</p><h4>Finding your way around</h4><p>Click <strong>National 5</strong> at the top of any page to see all 11 topics. Each topic page has up to four cards:</p><ul><li><strong>Course notes</strong> &mdash; the main online notes.</li><li><strong>Printable course notes</strong> &mdash; a PDF version for pupils without a device or who prefer paper.</li><li><strong>Simulator</strong> &mdash; for topics that have one (electronics, pneumatics, drive systems and structures).</li><li><strong>Answers to course notes</strong> &mdash; all the answers for the topic on one page, locked with a password.</li></ul><h4>Learning outcomes</h4><p>Each topic&rsquo;s course notes open with a <strong>Learning outcomes</strong> box: a list of &ldquo;I can&hellip;&rdquo; statements for the topic. Pupils tick each one when they feel confident, and the box shows how many they&rsquo;ve ticked. Each outcome has a <strong>Go to section</strong> link to the matching part of the notes. Outcomes that are not examined are shown in grey.</p><h4>How pupils complete the tasks</h4><ul><li><strong>Answers save automatically</strong> in the browser on that device, so pupils can close the page and carry on later on the same device.</li><li><strong>Handing in work:</strong> <strong>Download my answers (PDF)</strong> creates a PDF of the pupil&rsquo;s name and answers to submit through Teams, Google Classroom or email.</li><li><strong>Moving between devices:</strong> answers aren&rsquo;t stored online, but every downloaded answers PDF carries a hidden copy of all the pupil&rsquo;s answers and learning outcome ticks. On another device, pupils click <strong>Load my answers</strong> (in the &ldquo;Your answers to tasks&rdquo; box before the first task) and choose that PDF to carry on where they left off. Pupils should keep the original downloaded file &mdash; a PDF edited and re-saved in another app may lose its hidden answers.</li><li><strong>Shared devices:</strong> other pupils using the same browser profile could see saved answers, so ask pupils to download their answers at the end of each lesson.</li><li><strong>Simulators</strong> are built into many tasks; use the full-screen button for more space.</li></ul><h4>Checking answers</h4><p>Each topic has its own <strong>answers password</strong>, so teachers decide when pupils can check their work. Once a pupil enters it, they can:</p><ul><li>use the <strong>Show answer</strong> button that appears under each task in the course notes, to check their work as they go (pupils are asked to try a task before revealing its answer), or <strong>Show all</strong> answers at once &mdash; useful on the smartboard; or</li><li>open the <strong>Answers to course notes</strong> page for the whole topic.</li></ul><p>Teachers can find each topic&rsquo;s answers password at the top of the teacher copy of its answers in the Teacher area. Once a pupil knows a password it may spread around the class, so release it only when you&rsquo;re happy for everyone to see the answers.</p><h4>Printable notes</h4><p>Each topic&rsquo;s printable notes start with a <strong>cover sheet</strong>: space for the pupil&rsquo;s name and class, and the learning outcomes with tick boxes for pupils to track their progress. The cover also has a QR code to the online notes. Pupils without a device write their answers in their jotters; QR codes throughout the notes open each simulator on a phone or tablet.</p><h4>The Teacher area</h4><p>Click <strong>Teacher area</strong> (top right), then <strong>Open teacher resources</strong>, and enter the <strong>teacher password</strong> we send to verified teachers. For each topic you&rsquo;ll find the teacher copy of the answers (with the topic&rsquo;s answers password), a 25-mark unit test and its marking instructions, plus a summary of all the learning outcomes for course planning. <strong>Please never share the teacher password, or any of these files, with pupils.</strong></p><h4>Suggested ways to use ESS</h4><ul><li><strong>Teaching from the front</strong> with the course notes on the projector or smartboard.</li><li><strong>Classwork:</strong> pupils work through the tasks on their own devices, checking answers when you release the password.</li><li><strong>Independent study</strong> for catch-up, homework or working at their own pace.</li><li><strong>Self-assessment</strong> with the learning outcome ticks.</li><li><strong>End of topic:</strong> the unit test and marking instructions from the Teacher area.</li><li><strong>Revision</strong> with the printable notes.</li></ul><h4>Feedback and help</h4><p>If you spot a mistake, a broken link or anything confusing, or have an idea for something new, please use the <strong>Feedback</strong> button or email us. We&rsquo;d also love to hear from anyone who could help develop materials for <strong>Higher and Advanced Higher</strong>.</p>' +
          '<a class="essfb-email" href="mailto:' + FEEDBACK_EMAIL + '?subject=ESS%20user%20guide">&#x2709;&#xFE0F; ' + FEEDBACK_EMAIL + '</a>' +
        '</div>';
      var st = document.createElement('style');
      st.textContent = '.essug-panel h4{margin:16px 0 6px;font-size:14px;color:#0f766e;}.essug-panel ul{margin:0 0 10px 18px;padding:0;}.essug-panel li{margin:3px 0;line-height:1.55;}.essug-panel p{line-height:1.6;}';
      document.head.appendChild(st);
      document.body.appendChild(overlay);
    }
    overlay.classList.add('open');
    var pnl = overlay.querySelector('.essug-panel'); if (pnl) pnl.scrollTop = 0;
  }
  function closeGuidePanel() {
    var overlay = document.getElementById('essug-overlay');
    if (overlay) overlay.classList.remove('open');
  }
  window.ESSGuide = { open: openGuidePanel, close: closeGuidePanel };
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeGuidePanel(); });

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

    // Level tabs: National 5 opens the National 5 menu; Higher and Advanced Higher greyed out and not clickable
    document.querySelectorAll('.level-tab').forEach(function (tab) {
      var href  = tab.getAttribute('href') || '';
      var level = tab.getAttribute('data-level') || '';
      if (level === 'n5' || /(^|\/)n5\//.test(href)) tab.setAttribute('href', ESS_ROOT + 'n5/index.html');
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
      about.innerHTML = '<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.2" stroke="currentColor" stroke-width="1.3"/><path d="M8 7.2v4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><circle cx="8" cy="4.9" r="0.8" fill="currentColor"/></svg><span class="tb-label">About ESS</span>';
      about.addEventListener('click', openAboutPanel);
      right.insertBefore(about, right.firstChild);
      var guide = document.createElement('button');
      guide.type = 'button';
      guide.className = 'teacher-btn';
      guide.id = 'ess-guide-btn';
      guide.innerHTML = '<svg viewBox="0 0 16 16" fill="none"><path d="M3 2.5h7.5a2 2 0 012 2v9H5a2 2 0 01-2-2v-9z" stroke="currentColor" stroke-width="1.3"/><path d="M5.5 5.5h4.5M5.5 8h4.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg><span class="tb-label">User Guide</span>';
      guide.addEventListener('click', openGuidePanel);
      right.insertBefore(guide, about);
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){ setTimeout(tidyTopbar, 0); });
  } else {
    setTimeout(tidyTopbar, 0);
  }

})();


/* ============================================================
   COURSE NOTES: answer tools (load answers from a PDF on another
   device; reveal model answers after the topic password).
   The topics it is switched on for are listed in js/answer-tools.js.
   ============================================================ */
(function () {
  if (!/\/course-notes\.html$/.test(location.pathname)) return;
  function load() {
    var s = document.createElement('script');
    s.src = ESS_ROOT + 'js/answer-tools.js';
    document.body.appendChild(s);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', load); else load();
})();
