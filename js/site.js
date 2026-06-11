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
const TEACHER_PASSWORD = 'engsciteacher2025';
const SESSION_KEY = 'ess_teacher_auth';

function teacherLogin(event) {
  event.preventDefault();
  const pw = document.getElementById('teacher-pw').value;
  const err = document.getElementById('login-error');
  if (pw === TEACHER_PASSWORD) {
    sessionStorage.setItem(SESSION_KEY, 'true');
    window.location.href = 'dashboard.html';
  } else {
    err.style.display = 'block';
    err.textContent = 'Incorrect password. Please try again.';
    document.getElementById('teacher-pw').value = '';
  }
}

function checkTeacherAuth() {
  if (sessionStorage.getItem(SESSION_KEY) !== 'true') {
    window.location.href = '../teacher/login.html';
  }
}

function teacherLogout() {
  sessionStorage.removeItem(SESSION_KEY);
  window.location.href = '../index.html';
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
    status:   'available',
    id:       '1m6HBJ_8YqNvhZiMKLtgyoRpp7RpCvl1O',
    password: ''               // ← add the pupil password here
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
    status:   'available',
    id:       '1ksmCiJ7COA8cocOkVRW9VT1cgUqnPvqI',
    password: 'voltage'
  },
  'digital': {
    status:   'available',
    id:       '1Z8IMiFjI_ZuDo7GsLg-vJ2RGj7JvZuJW',
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
    { key: 'ext_marking',       status: 'soon',      id: '',                              label: 'Marking instructions \u2014 extension tasks', icon: '\u2705' },
    { key: 'hw_marking',        status: 'soon',      id: '',                              label: 'Marking instructions \u2014 homework',        icon: '\u2705' },
    { key: 'unit_test_marking', status: 'soon',      id: '',                              label: 'Marking instructions \u2014 unit test',       icon: '\u2705' }
  ],
  'energy-efficiency': [
    { key: 'notes_pdf',         status: 'soon',      id: '',                              label: 'Printable course notes \u2014 PDF',           icon: '\u1F5A8' },
    { key: 'ext_marking',       status: 'soon',      id: '',                              label: 'Marking instructions \u2014 extension tasks', icon: '\u2705' },
    { key: 'hw_marking',        status: 'soon',      id: '',                              label: 'Marking instructions \u2014 homework',        icon: '\u2705' },
    { key: 'unit_test_marking', status: 'soon',      id: '',                              label: 'Marking instructions \u2014 unit test',       icon: '\u2705' }
  ],
  'roles-disciplines': [
    { key: 'notes_pdf',         status: 'soon',      id: '',                              label: 'Printable course notes \u2014 PDF',           icon: '\u1F5A8' },
    { key: 'ext_marking',       status: 'soon',      id: '',                              label: 'Marking instructions \u2014 extension tasks', icon: '\u2705' },
    { key: 'hw_marking',        status: 'soon',      id: '',                              label: 'Marking instructions \u2014 homework',        icon: '\u2705' },
    { key: 'unit_test_marking', status: 'soon',      id: '',                              label: 'Marking instructions \u2014 unit test',       icon: '\u2705' }
  ],
  'impacts': [
    { key: 'notes_pdf',         status: 'soon',      id: '',                              label: 'Printable course notes \u2014 PDF',           icon: '\u1F5A8' },
    { key: 'ext_marking',       status: 'soon',      id: '',                              label: 'Marking instructions \u2014 extension tasks', icon: '\u2705' },
    { key: 'hw_marking',        status: 'soon',      id: '',                              label: 'Marking instructions \u2014 homework',        icon: '\u2705' },
    { key: 'unit_test_marking', status: 'soon',      id: '',                              label: 'Marking instructions \u2014 unit test',       icon: '\u2705' }
  ],

  // ── Electronics and Control ───────────────────────────────

  'analogue': [
    { key: 'notes_pdf',         status: 'soon',      id: '',                              label: 'Printable course notes \u2014 PDF',           icon: '\u1F5A8' },
    { key: 'ext_marking',       status: 'soon',      id: '',                              label: 'Marking instructions \u2014 extension tasks', icon: '\u2705' },
    { key: 'hw_marking',        status: 'soon',      id: '',                              label: 'Marking instructions \u2014 homework',        icon: '\u2705' },
    { key: 'unit_test_marking', status: 'available', id: '1mcgBs_DMMMGNJg0P5YflEmc6oeOnqj0N', label: 'Marking instructions \u2014 unit test', icon: '\u2705' }
  ],
  'digital': [
    { key: 'notes_pdf',         status: 'soon',      id: '',                              label: 'Printable course notes \u2014 PDF',           icon: '\u1F5A8' },
    { key: 'ext_marking',       status: 'soon',      id: '',                              label: 'Marking instructions \u2014 extension tasks', icon: '\u2705' },
    { key: 'hw_marking',        status: 'soon',      id: '',                              label: 'Marking instructions \u2014 homework',        icon: '\u2705' },
    { key: 'unit_test_marking', status: 'available', id: '1Drs8da8RmrLYyEUX2p5o7quAtrzvLCv6', label: 'Marking instructions \u2014 unit test', icon: '\u2705' }
  ],
  'control': [
    { key: 'notes_pdf',         status: 'soon',      id: '',                              label: 'Printable course notes \u2014 PDF',           icon: '\u1F5A8' },
    { key: 'ext_marking',       status: 'soon',      id: '',                              label: 'Marking instructions \u2014 extension tasks', icon: '\u2705' },
    { key: 'hw_marking',        status: 'soon',      id: '',                              label: 'Marking instructions \u2014 homework',        icon: '\u2705' },
    { key: 'unit_test_marking', status: 'soon',      id: '',                              label: 'Marking instructions \u2014 unit test',       icon: '\u2705' }
  ],

  // ── Mechanisms and Structures ─────────────────────────────

  'drive-systems': [
    { key: 'notes_pdf',         status: 'available',      id: '1N0rdDlKFbWYQ1blq7sMei49DFuuKXqJX',                              label: 'Printable course notes \u2014 PDF',           icon: '\u1F5A8' },
    { key: 'ext_marking',       status: 'available', id: '1UVduGkmJ_b479Ru9qu0MJOM_74FzYu_I', label: 'Marking instructions \u2014 extension tasks', icon: '\u2705' },
    { key: 'hw_marking',        status: 'soon',      id: '',                              label: 'Marking instructions \u2014 homework',        icon: '\u2705' },
    { key: 'unit_test_marking', status: 'soon',      id: '',                              label: 'Marking instructions \u2014 unit test',       icon: '\u2705' }
  ],
  'pneumatics': [
    { key: 'notes_pdf',         status: 'soon',      id: '',                              label: 'Printable course notes \u2014 PDF',           icon: '\u1F5A8' },
    { key: 'ext_marking',       status: 'soon',      id: '',                              label: 'Marking instructions \u2014 extension tasks', icon: '\u2705' },
    { key: 'hw_marking',        status: 'soon',      id: '',                              label: 'Marking instructions \u2014 homework',        icon: '\u2705' },
    { key: 'unit_test_marking', status: 'soon',      id: '',                              label: 'Marking instructions \u2014 unit test',       icon: '\u2705' }
  ],
  'structures-forces': [
    { key: 'notes_pdf',         status: 'soon',      id: '',                              label: 'Printable course notes \u2014 PDF',           icon: '\u1F5A8' },
    { key: 'ext_marking',       status: 'soon',      id: '',                              label: 'Marking instructions \u2014 extension tasks', icon: '\u2705' },
    { key: 'hw_marking',        status: 'soon',      id: '',                              label: 'Marking instructions \u2014 homework',        icon: '\u2705' },
    { key: 'unit_test_marking', status: 'soon',      id: '',                              label: 'Marking instructions \u2014 unit test',       icon: '\u2705' }
  ],
  'materials': [
    { key: 'notes_pdf',         status: 'soon',      id: '',                              label: 'Printable course notes \u2014 PDF',           icon: '\u1F5A8' },
    { key: 'ext_marking',       status: 'soon',      id: '',                              label: 'Marking instructions \u2014 extension tasks', icon: '\u2705' },
    { key: 'hw_marking',        status: 'soon',      id: '',                              label: 'Marking instructions \u2014 homework',        icon: '\u2705' },
    { key: 'unit_test_marking', status: 'soon',      id: '',                              label: 'Marking instructions \u2014 unit test',       icon: '\u2705' }
  ]

};

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
   Development banner and feedback button.
   Set SHOW_BANNER = false when the site is complete.
   ============================================================ */

(function () {

  var SHOW_BANNER    = true;
  var FEEDBACK_EMAIL = 'g.sanderson@gwc.org.uk';

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
      '<a href="mailto:' + FEEDBACK_EMAIL + '?subject=ESS%20Website%20Feedback" style="' + linkStyle + '">Spotted an issue? Let us know.</a>';
    var main = document.querySelector('.main');
    if (main) main.insertBefore(banner, main.firstChild);
  }

  var btnStyle = [
    'position:fixed', 'bottom:24px', 'right:24px', 'z-index:9999',
    'display:inline-flex', 'align-items:center', 'gap:7px',
    'background:#0f766e', 'color:white', 'font-size:13px', 'font-weight:600',
    'font-family:inherit', 'padding:10px 16px', 'border-radius:999px',
    'box-shadow:0 4px 14px rgba(0,0,0,0.18)', 'text-decoration:none',
    'transition:background 0.2s, transform 0.15s', 'cursor:pointer', 'border:none'
  ].join(';');

  var feedbackBtn = document.createElement('a');
  feedbackBtn.href = 'mailto:' + FEEDBACK_EMAIL + '?subject=ESS%20Website%20Feedback';
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

})();
