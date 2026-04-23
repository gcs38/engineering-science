// ── SIDEBAR TOGGLE ──
function toggleSection(id) {
  const children = document.getElementById(id + '-children');
  const chev = document.getElementById(id + '-chev');
  if (!children) return;
  const isOpen = children.classList.contains('open');
  children.classList.toggle('open', !isOpen);
  if (chev) chev.classList.toggle('open', !isOpen);
}

// ── ACTIVE STATE from URL ──
function setActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.sb-topic, .sb-subtopic').forEach(el => {
    const href = el.getAttribute('href');
    if (href && path.endsWith(href.replace('./', '').replace('../', ''))) {
      el.classList.add('active');
      // open parent section
      const section = el.closest('.sb-children');
      if (section) {
        section.classList.add('open');
        const chev = document.getElementById(section.id.replace('-children', '-chev'));
        if (chev) chev.classList.add('open');
      }
    }
  });
  // active level tab
  document.querySelectorAll('.level-tab').forEach(tab => {
    if (path.includes(tab.dataset.level)) tab.classList.add('active');
  });
}

// ── TEACHER AUTH ──
// NOTE: This is a simple client-side password for convenience.
// For sensitive content, use a proper server-side auth solution.
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
    window.location.href = 'login.html';
  }
}

function teacherLogout() {
  sessionStorage.removeItem(SESSION_KEY);
  window.location.href = '../index.html';
}

// ── PDF EMBED helper ──
// Pass a Google Drive file ID to embed the PDF
function embedDrivePDF(fileId, containerId) {
  const url = `https://drive.google.com/file/d/${fileId}/preview`;
  const iframe = document.getElementById(containerId);
  if (iframe) iframe.src = url;
}

document.addEventListener('DOMContentLoaded', setActiveNav);
