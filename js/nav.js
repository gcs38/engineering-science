// Sidebar navigation — injected into every page via:
// document.getElementById('sidebar').innerHTML = buildSidebar('n5');

function buildSidebar(level) {
  const n5 = `
    <div class="sb-section">
      <button class="sb-section-btn" onclick="toggleSection('ec-n5')">
        <span class="sb-section-title">Engineering contexts</span>
        <span class="sb-chevron open" id="ec-n5-chev">›</span>
      </button>
      <div class="sb-children open" id="ec-n5-children">
        <a class="sb-topic" href="../contexts/index.html">Overview</a>
        <a class="sb-subtopic" href="../contexts/systems.html">Engineering systems</a>
        <a class="sb-subtopic" href="../contexts/energy.html">Energy &amp; sustainability</a>
        <a class="sb-subtopic" href="../contexts/roles.html">Roles &amp; impacts</a>
      </div>
    </div>
    <div class="sb-section">
      <button class="sb-section-btn" onclick="toggleSection('elec-n5')">
        <span class="sb-section-title">Electronics &amp; control</span>
        <span class="sb-chevron open" id="elec-n5-chev">›</span>
      </button>
      <div class="sb-children open" id="elec-n5-children">
        <a class="sb-topic" href="../electronics/index.html">Overview</a>
        <a class="sb-subtopic" href="../electronics/analogue.html">Analogue electronics</a>
        <a class="sb-subtopic" href="../electronics/digital.html">Digital electronics</a>
        <a class="sb-subtopic" href="../electronics/microcontrollers.html">Microcontrollers</a>
      </div>
    </div>
    <div class="sb-section">
      <button class="sb-section-btn" onclick="toggleSection('mech-n5')">
        <span class="sb-section-title">Mechanisms &amp; structures</span>
        <span class="sb-chevron open" id="mech-n5-chev">›</span>
      </button>
      <div class="sb-children open" id="mech-n5-children">
        <a class="sb-topic" href="../mechanisms/index.html">Overview</a>
        <a class="sb-subtopic" href="../mechanisms/drive-systems.html">Drive systems</a>
        <a class="sb-subtopic" href="../mechanisms/converting-motion.html">Converting motion</a>
        <a class="sb-subtopic" href="../mechanisms/structures-forces.html">Structures &amp; forces</a>
        <a class="sb-subtopic" href="../mechanisms/materials.html">Materials</a>
      </div>
    </div>`;

  const higher = `
    <div class="sb-section">
      <button class="sb-section-btn" onclick="toggleSection('ec-h')">
        <span class="sb-section-title">Engineering contexts</span>
        <span class="sb-chevron open" id="ec-h-chev">›</span>
      </button>
      <div class="sb-children open" id="ec-h-children">
        <a class="sb-topic" href="../contexts/index.html">Overview</a>
        <a class="sb-subtopic" href="../contexts/systems.html">Engineering systems</a>
        <a class="sb-subtopic" href="../contexts/energy.html">Energy &amp; sustainability</a>
        <a class="sb-subtopic" href="../contexts/roles.html">Roles &amp; impacts</a>
      </div>
    </div>
    <div class="sb-section">
      <button class="sb-section-btn" onclick="toggleSection('elec-h')">
        <span class="sb-section-title">Electronics &amp; control</span>
        <span class="sb-chevron open" id="elec-h-chev">›</span>
      </button>
      <div class="sb-children open" id="elec-h-children">
        <a class="sb-topic" href="../electronics/index.html">Overview</a>
        <a class="sb-subtopic" href="../electronics/analogue.html">Analogue electronics</a>
        <a class="sb-subtopic" href="../electronics/digital.html">Digital electronics</a>
        <a class="sb-subtopic" href="../electronics/microcontrollers.html">Microcontrollers</a>
      </div>
    </div>
    <div class="sb-section">
      <button class="sb-section-btn" onclick="toggleSection('mech-h')">
        <span class="sb-section-title">Mechanisms &amp; structures</span>
        <span class="sb-chevron open" id="mech-h-chev">›</span>
      </button>
      <div class="sb-children open" id="mech-h-children">
        <a class="sb-topic" href="../mechanisms/index.html">Overview</a>
        <a class="sb-subtopic" href="../mechanisms/drive-systems.html">Drive systems</a>
        <a class="sb-subtopic" href="../mechanisms/converting-motion.html">Converting motion</a>
        <a class="sb-subtopic" href="../mechanisms/structures-forces.html">Structures &amp; forces</a>
        <a class="sb-subtopic" href="../mechanisms/materials.html">Materials</a>
      </div>
    </div>`;

  const ah = `
    <div class="sb-section">
      <button class="sb-section-btn" onclick="toggleSection('pm-ah')">
        <span class="sb-section-title">Project management</span>
        <span class="sb-chevron open" id="pm-ah-chev">›</span>
      </button>
      <div class="sb-children open" id="pm-ah-children">
        <a class="sb-topic" href="../project-management/index.html">Overview</a>
        <a class="sb-subtopic" href="../project-management/gantt.html">Gantt charts</a>
        <a class="sb-subtopic" href="../project-management/critical-path.html">Critical path analysis</a>
        <a class="sb-subtopic" href="../project-management/cost.html">Cost management</a>
      </div>
    </div>
    <div class="sb-section">
      <button class="sb-section-btn" onclick="toggleSection('elec-ah')">
        <span class="sb-section-title">Electronics &amp; control</span>
        <span class="sb-chevron open" id="elec-ah-chev">›</span>
      </button>
      <div class="sb-children open" id="elec-ah-children">
        <a class="sb-topic" href="../electronics/index.html">Overview</a>
        <a class="sb-subtopic" href="../electronics/kirchhoff.html">Kirchhoff's laws</a>
        <a class="sb-subtopic" href="../electronics/transistor.html">Transistor biasing</a>
        <a class="sb-subtopic" href="../electronics/op-amp-oscillators.html">Op-amp oscillators</a>
        <a class="sb-subtopic" href="../electronics/adc-dac.html">ADC &amp; DAC</a>
        <a class="sb-subtopic" href="../electronics/power.html">Power generation</a>
      </div>
    </div>
    <div class="sb-section">
      <button class="sb-section-btn" onclick="toggleSection('mech-ah')">
        <span class="sb-section-title">Mechanisms &amp; structures</span>
        <span class="sb-chevron open" id="mech-ah-chev">›</span>
      </button>
      <div class="sb-children open" id="mech-ah-children">
        <a class="sb-topic" href="../mechanisms/index.html">Overview</a>
        <a class="sb-subtopic" href="../mechanisms/shear-bending.html">Shear force &amp; bending moments</a>
        <a class="sb-subtopic" href="../mechanisms/second-moment.html">Second moment of area</a>
        <a class="sb-subtopic" href="../mechanisms/beam-deflection.html">Beam deflection</a>
      </div>
    </div>`;

  const map = { n5, higher, ah };
  return map[level] || n5;
}
