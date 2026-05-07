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
// Called directly from each index page after TOPIC is declared
function applyResourceBadges() {
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
}

/* ============================================================
   DEVELOPMENT BANNER + FEEDBACK BUTTON
   Paste this block at the bottom of js/site.js
   ============================================================ */

(function () {

  /* ----------------------------------------------------------
     1. SITEWIDE DEVELOPMENT BANNER
     Appears below the topbar on every page.
     Remove or set SHOW_BANNER = false when site is complete.
  ---------------------------------------------------------- */

  var SHOW_BANNER = true;
  var FEEDBACK_EMAIL = 'g.sanderson@gwc.org.uk'; // ← replace with your actual email address

  if (SHOW_BANNER) {
    var bannerStyle = [
      'display:flex',
      'align-items:center',
      'justify-content:center',
      'gap:12px',
      'flex-wrap:wrap',
      'background:#ffd000',
      'border-bottom:1px solid #e6bb00',
      'padding:5px 20px',
      'font-size:12px',
      'color:#5c3d00',
      'font-family:inherit',
      'text-align:center',
      'position:sticky',
      'top:0',
      'z-index:999',
      'width:100%',
      'box-sizing:border-box'
    ].join(';');

    var linkStyle = [
      'color:#5c3d00',
      'font-weight:normal',
      'text-decoration:underline',
      'cursor:pointer'
    ].join(';');

    var banner = document.createElement('div');
    banner.setAttribute('style', bannerStyle);
    banner.innerHTML =
      '<span>&#x1F6A7; This site is under active development &mdash; some resources are not yet available.</span>' +
      '<a href="mailto:' + FEEDBACK_EMAIL + '?subject=ESS%20Website%20Feedback" style="' + linkStyle + '">Spotted an issue? Let us know.</a>';

    // Insert as first child of .main so it sits in normal flow below the fixed topbar
    var main = document.querySelector('.main');
    if (main) {
      main.insertBefore(banner, main.firstChild);
    }
  }


  /* ----------------------------------------------------------
     2. FLOATING FEEDBACK BUTTON
     Fixed in the bottom-right corner of every page.
     Opens a mailto link with a pre-filled subject line.
  ---------------------------------------------------------- */

  var btnStyle = [
    'position:fixed',
    'bottom:24px',
    'right:24px',
    'z-index:9999',
    'display:inline-flex',
    'align-items:center',
    'gap:7px',
    'background:#0f766e',
    'color:white',
    'font-size:13px',
    'font-weight:600',
    'font-family:inherit',
    'padding:10px 16px',
    'border-radius:999px',
    'box-shadow:0 4px 14px rgba(0,0,0,0.18)',
    'text-decoration:none',
    'transition:background 0.2s, transform 0.15s',
    'cursor:pointer',
    'border:none'
  ].join(';');

  var feedbackBtn = document.createElement('a');
  feedbackBtn.href = 'mailto:' + FEEDBACK_EMAIL + '?subject=ESS%20Website%20Feedback';
  feedbackBtn.setAttribute('style', btnStyle);
  feedbackBtn.innerHTML = '&#x2709;&#xFE0F; Feedback';
  feedbackBtn.title = 'Report an issue or send feedback about this site';

  feedbackBtn.addEventListener('mouseover', function () {
    this.style.background = '#0d9488';
    this.style.transform = 'translateY(-2px)';
  });
  feedbackBtn.addEventListener('mouseout', function () {
    this.style.background = '#0f766e';
    this.style.transform = 'translateY(0)';
  });

  // Add to page once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      document.body.appendChild(feedbackBtn);
    });
  } else {
    document.body.appendChild(feedbackBtn);
  }

})();