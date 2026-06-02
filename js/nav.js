function buildSidebar(level, depth) {
  var d = depth || "../../";

  // Inject hamburger button into topbar (mobile only)
  // Runs after DOM is ready; safe to call multiple times
  document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('mob-menu-btn')) return; // already added

    // Replace SVG logo-mark with custom logo image
    var logoMark = document.querySelector('.logo-mark');
    if (logoMark) {
      var img = document.createElement('img');
      img.src = d + 'images/logo.png';
      img.alt = 'Engineering Science Scotland logo';
      img.style.cssText = 'height:34px;width:auto;display:block;';
      logoMark.replaceWith(img);
    }

    // Update logo text: "Engineering Science" on top, "S C O T L A N D" below
    var logoTitle = document.querySelector('.logo-title');
    var logoSub   = document.querySelector('.logo-sub');
    if (logoTitle) logoTitle.textContent = 'Engineering Science';
    if (logoSub)   logoSub.textContent   = 'S C O T L A N D';

    // Create overlay
    var overlay = document.createElement('div');
    overlay.className = 'mob-overlay';
    overlay.id = 'mob-overlay';
    overlay.addEventListener('click', closeMobileMenu);
    document.body.appendChild(overlay);

    // Create hamburger button and insert at start of topbar
    var btn = document.createElement('button');
    btn.className = 'mob-menu-btn';
    btn.id = 'mob-menu-btn';
    btn.setAttribute('aria-label', 'Open navigation menu');
    btn.innerHTML = '<span></span>';
    btn.addEventListener('click', toggleMobileMenu);
    var topbar = document.querySelector('.topbar');
    if (topbar) topbar.insertBefore(btn, topbar.firstChild);
  });

  function toggleMobileMenu() {
    var sidebar = document.querySelector('.sidebar');
    var overlay = document.getElementById('mob-overlay');
    if (!sidebar || !overlay) return;
    var isOpen = sidebar.classList.contains('mob-open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      sidebar.classList.add('mob-open');
      overlay.classList.add('open');
    }
  }

  function closeMobileMenu() {
    var sidebar = document.querySelector('.sidebar');
    var overlay = document.getElementById('mob-overlay');
    if (sidebar) sidebar.classList.remove('mob-open');
    if (overlay) overlay.classList.remove('open');
  }

  // Close drawer when any sidebar link is tapped
  document.addEventListener('click', function(e) {
    if (e.target.closest && e.target.closest('.sidebar a')) {
      closeMobileMenu();
    }
  });

  var n5 = `
    <div class="sb-section">
      <button class="sb-section-btn" onclick="toggleSection('ctx-n5')">
        <span class="sb-section-title">Engineering contexts</span>
        <span class="sb-chevron open" id="ctx-n5-chev">›</span>
      </button>
      <div class="sb-children open" id="ctx-n5-children">
        <a class="sb-topic" href="${d}n5/contexts/index.html">Overview</a>
        <a class="sb-subtopic" href="${d}n5/contexts/systems-approach/index.html">The systems approach</a>
        <a class="sb-subtopic" href="${d}n5/contexts/energy-efficiency/index.html">Energy and efficiency</a>
        <a class="sb-subtopic" href="${d}n5/contexts/roles-disciplines/index.html">Engineering roles and disciplines</a>
        <a class="sb-subtopic" href="${d}n5/contexts/impacts/index.html">Impacts of engineering</a>
      </div>
    </div>
    <div class="sb-section">
      <button class="sb-section-btn" onclick="toggleSection('elec-n5')">
        <span class="sb-section-title">Electronics and control</span>
        <span class="sb-chevron open" id="elec-n5-chev">›</span>
      </button>
      <div class="sb-children open" id="elec-n5-children">
        <a class="sb-topic" href="${d}n5/electronics/index.html">Overview</a>
        <a class="sb-subtopic" href="${d}n5/electronics/analogue/index.html">Analogue electronics</a>
        <a class="sb-subtopic" href="${d}n5/electronics/digital/index.html">Digital electronics</a>
        <a class="sb-subtopic" href="${d}n5/electronics/control/index.html">Control systems</a>
      </div>
    </div>
    <div class="sb-section">
      <button class="sb-section-btn" onclick="toggleSection('mech-n5')">
        <span class="sb-section-title">Mechanisms and structures</span>
        <span class="sb-chevron open" id="mech-n5-chev">›</span>
      </button>
      <div class="sb-children open" id="mech-n5-children">
        <a class="sb-topic" href="${d}n5/mechanisms/index.html">Overview</a>
        <a class="sb-subtopic" href="${d}n5/mechanisms/drive-systems/index.html">Drive systems</a>
        <a class="sb-subtopic" href="${d}n5/mechanisms/pneumatics/index.html">Pneumatics</a>
        <a class="sb-subtopic" href="${d}n5/mechanisms/structures-forces/index.html">Structures and forces</a>
        <a class="sb-subtopic" href="${d}n5/mechanisms/materials/index.html">Materials</a>
      </div>
    </div>`;

  var higher = `
    <div class="sb-section">
      <button class="sb-section-btn" onclick="toggleSection('ctx-h')">
        <span class="sb-section-title">Engineering contexts</span>
        <span class="sb-chevron open" id="ctx-h-chev">›</span>
      </button>
      <div class="sb-children open" id="ctx-h-children">
        <a class="sb-topic" href="${d}higher/contexts/index.html">Overview</a>
        <a class="sb-subtopic" href="${d}higher/contexts/systems-approach/index.html">The systems approach</a>
        <a class="sb-subtopic" href="${d}higher/contexts/energy-efficiency/index.html">Energy and efficiency</a>
        <a class="sb-subtopic" href="${d}higher/contexts/roles-disciplines/index.html">Engineering roles and disciplines</a>
        <a class="sb-subtopic" href="${d}higher/contexts/impacts/index.html">Impacts of engineering</a>
      </div>
    </div>
    <div class="sb-section">
      <button class="sb-section-btn" onclick="toggleSection('elec-h')">
        <span class="sb-section-title">Electronics and control</span>
        <span class="sb-chevron open" id="elec-h-chev">›</span>
      </button>
      <div class="sb-children open" id="elec-h-children">
        <a class="sb-topic" href="${d}higher/electronics/index.html">Overview</a>
        <a class="sb-subtopic" href="${d}higher/electronics/analogue/index.html">Analogue Electronics</a>
        <a class="sb-subtopic" href="${d}higher/electronics/digital/index.html">Digital electronics</a>
        <a class="sb-subtopic" href="${d}higher/electronics/control/index.html">Control systems</a>
      </div>
    </div>
    <div class="sb-section">
      <button class="sb-section-btn" onclick="toggleSection('mech-h')">
        <span class="sb-section-title">Mechanisms and structures</span>
        <span class="sb-chevron open" id="mech-h-chev">›</span>
      </button>
      <div class="sb-children open" id="mech-h-children">
        <a class="sb-topic" href="${d}higher/mechanisms/index.html">Overview</a>
        <a class="sb-subtopic" href="${d}higher/mechanisms/drive-systems/index.html">Drive systems</a>
        <a class="sb-subtopic" href="${d}higher/mechanisms/pneumatics/index.html">Pneumatics</a>
        <a class="sb-subtopic" href="${d}higher/mechanisms/structures-forces/index.html">Structures and forces</a>
        <a class="sb-subtopic" href="${d}higher/mechanisms/materials/index.html">Materials</a>
      </div>
    </div>`;

  var ah = `
    <div class="sb-section">
      <button class="sb-section-btn" onclick="toggleSection('pm-ah')">
        <span class="sb-section-title">Project management</span>
        <span class="sb-chevron open" id="pm-ah-chev">›</span>
      </button>
      <div class="sb-children open" id="pm-ah-children">
        <a class="sb-topic" href="${d}ah/project-management/index.html">Overview</a>
        <a class="sb-subtopic" href="${d}ah/project-management/gantt/index.html">Gantt charts</a>
        <a class="sb-subtopic" href="${d}ah/project-management/critical-path/index.html">Critical path analysis</a>
        <a class="sb-subtopic" href="${d}ah/project-management/cost/index.html">Cost management</a>
      </div>
    </div>
    <div class="sb-section">
      <button class="sb-section-btn" onclick="toggleSection('elec-ah')">
        <span class="sb-section-title">Electronics and control</span>
        <span class="sb-chevron open" id="elec-ah-chev">›</span>
      </button>
      <div class="sb-children open" id="elec-ah-children">
        <a class="sb-topic" href="${d}ah/electronics/index.html">Overview</a>
        <a class="sb-subtopic" href="${d}ah/electronics/kirchhoff/index.html">Kirchhoff's laws</a>
        <a class="sb-subtopic" href="${d}ah/electronics/transistor/index.html">Transistor biasing</a>
        <a class="sb-subtopic" href="${d}ah/electronics/op-amp/index.html">Op-amp oscillators</a>
        <a class="sb-subtopic" href="${d}ah/electronics/adc-dac/index.html">ADC and DAC</a>
        <a class="sb-subtopic" href="${d}ah/electronics/power/index.html">Power generation</a>
      </div>
    </div>
    <div class="sb-section">
      <button class="sb-section-btn" onclick="toggleSection('mech-ah')">
        <span class="sb-section-title">Mechanisms and structures</span>
        <span class="sb-chevron open" id="mech-ah-chev">›</span>
      </button>
      <div class="sb-children open" id="mech-ah-children">
        <a class="sb-topic" href="${d}ah/mechanisms/index.html">Overview</a>
        <a class="sb-subtopic" href="${d}ah/mechanisms/shear-bending/index.html">Shear force and bending moments</a>
        <a class="sb-subtopic" href="${d}ah/mechanisms/second-moment/index.html">Second moment of area</a>
        <a class="sb-subtopic" href="${d}ah/mechanisms/beam-deflection/index.html">Beam deflection</a>
      </div>
    </div>`;

  var map = {n5: n5, higher: higher, ah: ah};
  return map[level] || n5;
}
