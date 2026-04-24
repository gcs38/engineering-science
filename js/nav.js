function buildSidebar(level, depth) {
  const d = depth || '../../';

  const n5 = `
    <div class="sb-section">
      <button class="sb-section-btn" onclick="toggleSection('ec-n5')">
        <span class="sb-section-title">Engineering contexts</span>
        <span class="sb-chevron open" id="ec-n5-chev">›</span>
      </button>
      <div class="sb-children open" id="ec-n5-children">
        <a class="sb-topic" href="${d}n5/contexts/index.html">Overview</a>
        <a class="sb-subtopic" href="${d}n5/contexts/systems/index.html">Engineering systems</a>
        <a class="sb-subtopic" href="${d}n5/contexts/energy/index.html">Energy &amp; sustainability</a>
        <a class="sb-subtopic" href="${d}n5/contexts/roles/index.html">Roles &amp; impacts</a>
      </div>
    </div>
    <div class="sb-section">
      <button class="sb-section-btn" onclick="toggleSection('elec-n5')">
        <span class="sb-section-title">Electronics &amp; control</span>
        <span class="sb-chevron open" id="elec-n5-chev">›</span>
      </button>
      <div class="sb-children open" id="elec-n5-children">
        <a class="sb-topic" href="${d}n5/electronics/index.html">Overview</a>
        <a class="sb-subtopic" href="${d}n5/electronics/analogue/index.html">Analogue electronics</a>
        <a class="sb-subtopic" href="${d}n5/electronics/digital/index.html">Digital electronics</a>
        <a class="sb-subtopic" href="${d}n5/electronics/microcontrollers/index.html">Microcontrollers</a>
      </div>
    </div>
    <div class="sb-section">
      <button class="sb-section-btn" onclick="toggleSection('mech-n5')">
        <span class="sb-section-title">Mechanisms &amp; structures</span>
        <span class="sb-chevron open" id="mech-n5-chev">›</span>
      </button>
      <div class="sb-children open" id="mech-n5-children">
        <a class="sb-topic" href="${d}n5/mechanisms/index.html">Overview</a>
        <a class="sb-subtopic" href="${d}n5/mechanisms/drive-systems/index.html">Drive systems</a>
        <a class="sb-subtopic" href="${d}n5/mechanisms/converting-motion/index.html">Converting motion</a>
        <a class="sb-subtopic" href="${d}n5/mechanisms/structures-forces/index.html">Structures &amp; forces</a>
        <a class="sb-subtopic" href="${d}n5/mechanisms/materials/index.html">Materials</a>
      </div>
    </div>`;

  const higher = `
    <div class="sb-section">
      <button class="sb-section-btn" onclick="toggleSection('ec-h')">
        <span class="sb-section-title">Engineering contexts</span>
        <span class="sb-chevron open" id="ec-h-chev">›</span>
      </button>
      <div class="sb-children open" id="ec-h-children">
        <a class="sb-topic" href="${d}higher/contexts/index.html">Overview</a>
        <a class="sb-subtopic" href="${d}higher/contexts/systems/index.html">Engineering systems</a>
        <a class="sb-subtopic" href="${d}higher/contexts/energy/index.html">Energy &amp; sustainability</a>
        <a class="sb-subtopic" href="${d}higher/contexts/roles/index.html">Roles &amp; impacts</a>
      </div>
    </div>
    <div class="sb-section">
      <button class="sb-section-btn" onclick="toggleSection('elec-h')">
        <span class="sb-section-title">Electronics &amp; control</span>
        <span class="sb-chevron open" id="elec-h-chev">›</span>
      </button>
      <div class="sb-children open" id="elec-h-children">
        <a class="sb-topic" href="${d}higher/electronics/index.html">Overview</a>
        <a class="sb-subtopic" href="${d}higher/electronics/analogue/index.html">Analogue electronics</a>
        <a class="sb-subtopic" href="${d}higher/electronics/digital/index.html">Digital electronics</a>
        <a class="sb-subtopic" href="${d}higher/electronics/microcontrollers/index.html">Microcontrollers</a>
      </div>
    </div>
    <div class="sb-section">
      <button class="sb-section-btn" onclick="toggleSection('mech-h')">
        <span class="sb-section-title">Mechanisms &amp; structures</span>
        <span class="sb-chevron open" id="mech-h-chev">›</span>
      </button>
      <div class="sb-children open" id="mech-h-children">
        <a class="sb-topic" href="${d}higher/mechanisms/index.html">Overview</a>
        <a class="sb-subtopic" href="${d}higher/mechanisms/drive-systems/index.html">Drive systems</a>
        <a class="sb-subtopic" href="${d}higher/mechanisms/converting-motion/index.html">Converting motion</a>
        <a class="sb-subtopic" href="${d}higher/mechanisms/structures-forces/index.html">Structures &amp; forces</a>
        <a class="sb-subtopic" href="${d}higher/mechanisms/materials/index.html">Materials</a>
      </div>
    </div>`;

  const ah = `
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
        <span class="sb-section-title">Electronics &amp; control</span>
        <span class="sb-chevron open" id="elec-ah-chev">›</span>
      </button>
      <div class="sb-children open" id="elec-ah-children">
        <a class="sb-topic" href="${d}ah/electronics/index.html">Overview</a>
        <a class="sb-subtopic" href="${d}ah/electronics/kirchhoff/index.html">Kirchhoff&#39;s laws</a>
        <a class="sb-subtopic" href="${d}ah/electronics/transistor/index.html">Transistor biasing</a>
        <a class="sb-subtopic" href="${d}ah/electronics/op-amp/index.html">Op-amp oscillators</a>
        <a class="sb-subtopic" href="${d}ah/electronics/adc-dac/index.html">ADC &amp; DAC</a>
        <a class="sb-subtopic" href="${d}ah/electronics/power/index.html">Power generation</a>
      </div>
    </div>
    <div class="sb-section">
      <button class="sb-section-btn" onclick="toggleSection('mech-ah')">
        <span class="sb-section-title">Mechanisms &amp; structures</span>
        <span class="sb-chevron open" id="mech-ah-chev">›</span>
      </button>
      <div class="sb-children open" id="mech-ah-children">
        <a class="sb-topic" href="${d}ah/mechanisms/index.html">Overview</a>
        <a class="sb-subtopic" href="${d}ah/mechanisms/shear-bending/index.html">Shear force &amp; bending</a>
        <a class="sb-subtopic" href="${d}ah/mechanisms/second-moment/index.html">Second moment of area</a>
        <a class="sb-subtopic" href="${d}ah/mechanisms/beam-deflection/index.html">Beam deflection</a>
      </div>
    </div>`;

  return { n5, higher, ah }[level] || n5;
}
