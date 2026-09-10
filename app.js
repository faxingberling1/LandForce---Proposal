/**
 * LANDFORCE STRATEGIC PROPOSAL - INTERACTIVE CONTROLLER
 * Powering interactive simulators, budget calculators, carbon widgets & responsive state
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initMobileMenu();
  initAccordions();
  initBrandSandbox();
  initAudienceSimulator();
  initCarbonCalculator();
  initGanttChart();
  initBudgetCalculator();
  initPrintButton();
});

/* --------------------------------------------------------------------------
   0. MOBILE NAV DRAWER TOGGLE
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('navToggle');
  const drawer = document.getElementById('mobileDrawer');
  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    drawer.classList.toggle('open', !isOpen);
    toggleBtn.classList.toggle('active', !isOpen);
  });

  drawer.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggleBtn.classList.remove('active');
    });
  });
}

/* --------------------------------------------------------------------------
   1. SCROLL PROGRESS BAR & ACTIVE NAV
   -------------------------------------------------------------------------- */
function initScrollProgress() {
  const progressBar = document.getElementById('navProgressBar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    if (progressBar) {
      progressBar.style.width = `${Math.min(progress, 100)}%`;
    }

    // Active state highlighting
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. ACCORDIONS (METHODOLOGY WORKSTREAMS)
   -------------------------------------------------------------------------- */
function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const parentItem = header.parentElement;
      const wasActive = parentItem.classList.contains('active');
      
      // Optionally close others or allow multiple: we toggle the clicked one
      parentItem.classList.toggle('active', !wasActive);
    });
  });
}

/* --------------------------------------------------------------------------
   3. BRAND ARCHITECTURE SANDBOX
   -------------------------------------------------------------------------- */
const brandModelsData = {
  model1: {
    name: 'Option A: Pure Unified Monolith',
    badge: 'High Risk for Commercial Sales',
    summary: 'Everything operates solely under the "Landforce" name and logo. Workforce, Stewardship, and RWP have no distinct visual identity or names, only secondary descriptive subtitles.',
    pros: [
      'Absolute brand consolidation, every dollar invested markets "Landforce"',
      'Simplest possible internal governance and digital asset library',
      'No risk of audience confusion regarding the overarching 501(c)(3)'
    ],
    cons: [
      'Extremely high friction in commercial retail lumber & biochar sales',
      'Woodworkers and contractors often do not understand why they are buying timber from a "workforce nonprofit"',
      'Obscures the physical presence of The Mill in the East End',
      'RFP explicitly notes this is Landforce’s least preferred outcome without overwhelming data'
    ],
    commercialFit: 'Low (Poor retail credibility)',
    missionClarity: 'High for Funders, Low for Customers',
    recommendationRating: 'Not Recommended'
  },
  model2: {
    name: 'Option B: Endorsed Hybrid Architecture',
    badge: 'Recommended Strategic Choice',
    summary: 'Landforce serves as the authoritative Master Brand. Workforce Development is positioned as the foundational "root" connecting all activities. Land Stewardship operates as a recognized civic division, while Responsible Wood Production is branded with a distinct commercial mark: "The Mill by Landforce".',
    pros: [
      'Preserves 10 years of Landforce brand equity with donors, foundations, and public agencies',
      'Gives "The Mill" commercial credibility, retail flair, and distinct lumber grade branding',
      'Allows distinct transactional pathways without severing the inspirational mission connection',
      'Aligns directly with client RFP goals: distinction without costly fragmentation'
    ],
    cons: [
      'Requires disciplined brand guidelines to ensure the "By Landforce" endorsement is never dropped',
      'Slightly more complex collateral kit (two sub-brand lockup variations)'
    ],
    commercialFit: 'Optimal (Strong retail & contractor appeal)',
    missionClarity: 'Balanced & Cohesive across all 10 audiences',
    recommendationRating: 'Highly Recommended'
  },
  model3: {
    name: 'Option C: Fully Differentiated Independent Brands',
    badge: 'High Cost & Fragmentation Risk',
    summary: 'Three completely separate brands with independent names, distinct logos, separate websites, and autonomous social media channels (e.g., "Landforce Academy", "Iron City Stewardship", "East End Timber Co.").',
    pros: [
      'Maximum freedom for RWP to operate as a conventional commercial lumber yard',
      'No cross-contamination of public perception'
    ],
    cons: [
      'Catastrophic brand fragmentation, destroys the unique social enterprise story',
      'Triples website hosting, CMS maintenance, and administrative costs',
      'Unsustainable burden on Landforce’s lean staff to manage 3 distinct social media presences',
      'Threatens DCNR and foundation funding by hiding the workforce integration'
    ],
    commercialFit: 'High Commercial, Zero Mission Cross-Benefit',
    missionClarity: 'Severely Diluted & Confusing',
    recommendationRating: 'Strongly Advise Against'
  }
};

const mockupAssetsData = {
  vehicle: {
    title: 'Fleet Vehicle & Work Truck Decal System',
    render: (modelKey) => {
      if (modelKey === 'model1') {
        return `
          <div class="mockup-vehicle-canvas">
            <div class="truck-outline">
              <div class="truck-cab"></div>
              <div class="truck-bed">
                <div class="truck-logo-area">
                  <div class="logo-box">
                    <span class="truck-logo-text">LANDFORCE</span>
                    <span class="truck-sub">Environmental Social Enterprise</span>
                  </div>
                </div>
              </div>
            </div>
            <p class="mockup-caption">Single generic logo on all 4 trucks. Fails to promote lumber sales or highlight specific municipal contracting capabilities on active roads.</p>
          </div>
        `;
      } else if (modelKey === 'model2') {
        return `
          <div class="mockup-vehicle-canvas">
            <div class="truck-outline model2-truck">
              <div class="truck-cab"></div>
              <div class="truck-bed">
                <div class="truck-dual-brand">
                  <div class="brand-left">
                    <span class="truck-logo-text">LANDFORCE</span>
                    <span class="truck-sub-line">Land Stewardship & Ecological Services</span>
                  </div>
                  <div class="brand-divider"></div>
                  <div class="brand-right">
                    <span class="mill-logo-text">THE MILL</span>
                    <span class="mill-sub-line">Kiln-Dried Urban Hardwoods • By Landforce</span>
                  </div>
                </div>
              </div>
            </div>
            <p class="mockup-caption"><strong>Endorsed Co-Branded Fleet Wrap:</strong> Bold visual recognition on regional roads. Promotes stewardship contracting on the driver side and East End lumber availability on the commercial side, tied together with the unifying Landforce seal.</p>
          </div>
        `;
      } else {
        return `
          <div class="mockup-vehicle-canvas">
            <div class="truck-outline">
              <div class="truck-bed"><span class="truck-logo-text" style="color: #999;">3 Disjointed Vehicles</span></div>
            </div>
            <p class="mockup-caption">Requires trucks dedicated exclusively to either Landforce or The Mill, preventing cross-utilization of fleet vehicles.</p>
          </div>
        `;
      }
    }
  },
  uniform: {
    title: 'Crew Apparel, High-Vis Vests & Hardhat Decals',
    render: (modelKey) => {
      if (modelKey === 'model2') {
        return `
          <div class="mockup-uniform-canvas">
            <div class="uniform-display-grid">
              <div class="uniform-item">
                <div class="vest-shape">
                  <div class="vest-chest-patch">LANDFORCE</div>
                  <div class="vest-back-text">CREW MEMBER<br><span style="font-size: 8px;">Restoring Land. Building Careers.</span></div>
                </div>
                <span>Stewardship Field Vest</span>
              </div>
              <div class="uniform-item">
                <div class="vest-shape mill-apron">
                  <div class="vest-chest-patch" style="background:#8c4e18;">THE MILL</div>
                  <div class="vest-back-text">BY LANDFORCE<br><span style="font-size: 8px;">East End Urban Hardwoods</span></div>
                </div>
                <span>The Mill Work Apron / Shirt</span>
              </div>
              <div class="uniform-item">
                <div class="hardhat-shape">
                  <div class="helmet-sticker">LF • 2026</div>
                </div>
                <span>Safety Hardhat & Cert Badges</span>
              </div>
            </div>
            <p class="mockup-caption">Crew members wear the Landforce badge with dignity and pride. Mill crew wear 'The Mill by Landforce' apparel with technical certification badges earned in training.</p>
          </div>
        `;
      } else {
        return `
          <div class="mockup-uniform-canvas">
            <div class="uniform-item">
              <div class="vest-shape"><div class="vest-chest-patch">LANDFORCE</div></div>
            </div>
            <p class="mockup-caption">Single standard uniform or disconnected workwear.</p>
          </div>
        `;
      }
    }
  },
  lumber: {
    title: 'Kiln Lumber Tag & Biochar Retail Packaging',
    render: (modelKey) => {
      return `
        <div class="mockup-lumber-canvas">
          <div class="lumber-tag-specimen">
            <div class="tag-header">
              <span class="tag-brand-title">THE MILL</span>
              <span class="tag-sub">SALVAGED URBAN TIMBER • BY LANDFORCE</span>
            </div>
            <div class="tag-body">
              <div class="tag-field"><span>SPECIES:</span> <strong>Quarter-Sawn White Oak</strong></div>
              <div class="tag-field"><span>ORIGIN:</span> <strong>Frick Park Salvage (Pittsburgh)</strong></div>
              <div class="tag-field"><span>MOISTURE:</span> <strong>7.2% Vacuum Kiln Dried</strong></div>
              <div class="tag-field"><span>SEQUESTERED:</span> <strong>34.8 kg CO₂e Retained</strong></div>
              <div class="tag-barcode">||| | |||| || ||| ||||| LF-2026-883</div>
            </div>
          </div>
          <div class="biochar-bag-specimen">
            <div class="bag-header">
              <span>BIOCHAR PRO</span>
              <small>Horticultural Soil Conditioner</small>
            </div>
            <p>100% Regenerative Urban Biomass. Made in Pittsburgh at The Mill by Landforce.</p>
          </div>
          <p class="mockup-caption"><strong>Commercial Integrity:</strong> High-end woodworkers and landscape architects receive rigorous technical specs (moisture %, species, board-feet) alongside the inspiring provenance story of Pittsburgh urban salvage.</p>
        </div>
      `;
    }
  },
  signage: {
    title: 'The Mill Facility Exterior & Wayfinding Signage',
    render: (modelKey) => {
      return `
        <div class="mockup-signage-canvas">
          <div class="mill-exterior-sign">
            <div class="sign-wood-slab">
              <div class="sign-cutout">
                <h2>THE MILL</h2>
                <h3>URBAN WOOD RECOVERY & KILN DRIED LUMBER</h3>
                <div class="sign-endorse">A Social Enterprise of LANDFORCE</div>
              </div>
            </div>
          </div>
          <p class="mockup-caption">East End 10,000 sq. ft. Facility Signage: Prominent industrial architectural lettering on reclaimed timber substrate, visibly anchored by the Landforce endorsement mark.</p>
        </div>
      `;
    }
  }
};

function initBrandSandbox() {
  const tabs = document.querySelectorAll('#architectureTabs .sandbox-tab-btn');
  const viewport = document.getElementById('sandboxViewport');
  const modelLabel = document.getElementById('currentModelLabel');
  const assetButtons = document.querySelectorAll('#mockupAssetToggle .pill-btn');
  const mockupStage = document.getElementById('mockupStage');

  let currentModel = 'model2';
  let currentAsset = 'vehicle';

  function renderSandbox() {
    const data = brandModelsData[currentModel];
    modelLabel.textContent = data.name;

    viewport.innerHTML = `
      <div class="sandbox-active-card">
        <div class="sac-header">
          <div>
            <h3>${data.name}</h3>
            <span class="sac-badge ${currentModel === 'model2' ? 'badge-recom' : ''}">${data.badge}</span>
          </div>
          <div class="sac-ratings">
            <div class="rating-box">
              <span class="rb-label">Commercial Market Fit</span>
              <span class="rb-val">${data.commercialFit}</span>
            </div>
            <div class="rating-box">
              <span class="rb-label">Mission Coherence</span>
              <span class="rb-val">${data.missionClarity}</span>
            </div>
          </div>
        </div>

        <p class="sac-summary">${data.summary}</p>

        <div class="sac-pros-cons-grid">
          <div class="pro-box">
            <h5>Key Strategic Advantages</h5>
            <ul>
              ${data.pros.map(p => `<li>${p}</li>`).join('')}
            </ul>
          </div>
          <div class="con-box">
            <h5>Strategic Vulnerabilities & Risks</h5>
            <ul>
              ${data.cons.map(c => `<li>${c}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;

    renderMockup();
  }

  function renderMockup() {
    const asset = mockupAssetsData[currentAsset];
    if (asset && mockupStage) {
      mockupStage.innerHTML = `
        <div class="mockup-inner-wrap">
          <h5>${asset.title}</h5>
          ${asset.render(currentModel)}
        </div>
      `;
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentModel = tab.getAttribute('data-model');
      renderSandbox();
    });
  });

  assetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      assetButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentAsset = btn.getAttribute('data-asset');
      renderMockup();
    });
  });

  renderSandbox();
}

/* --------------------------------------------------------------------------
   4. AUDIENCE PATHWAY SIMULATOR
   -------------------------------------------------------------------------- */
const personasData = [
  {
    id: 'crew',
    icon: '👷',
    name: 'Prospective Crew Member',
    intent: 'Seeking stable, paid training & employment with certifications',
    mindset: 'May have experienced past employment barriers; needs clear wages, dignity, and low barrier intake',
    steps: [
      { num: 'Click 1', title: 'Home Hero or Top Nav', desc: 'Clicks bold "Paid Training & Jobs" callout with prominent $ hourly wage transparency.' },
      { num: 'Click 2', title: 'Workforce Cohort Page', desc: 'Reviews 8-week paid training, 7 industry certifications, and read alumni testimonials.' },
      { num: 'Click 3', title: 'Simple 90-Second Intake', desc: 'Fills out mobile-first, friction-free intake form or clicks direct SMS/phone line to recruiter.' }
    ],
    conversionGoal: 'Submits cohort interest form into Salesforce applicant queue; receives instant welcoming SMS confirmation.',
    frictionEliminated: 'No bureaucratic jargon, no deficit-based questions, no requirement to navigate municipal contracting.'
  },
  {
    id: 'contractor',
    icon: '🪵',
    name: 'Commercial Lumber Buyer / Woodworker',
    intent: 'Looking for kiln-dried urban hardwood slabs, dimensional lumber, or custom milling',
    mindset: 'Commercial buyer; cares about species, moisture content, thickness, board-foot price, and availability',
    steps: [
      { num: 'Click 1', title: 'Landforce Navigation', desc: 'Clicks "The Mill / Urban Wood" in primary menu or lands directly on landforcepgh.org/the-mill.' },
      { num: 'Click 2', title: 'Live Lumber Inventory', desc: 'Filters species (White Oak, Walnut, Cherry) by thickness and kiln moisture status.' },
      { num: 'Click 3', title: 'Quote & Hold Request', desc: 'Submits 30-second RFQ / Hold form for specific slab lot numbers with pick-up scheduling.' }
    ],
    conversionGoal: 'Lumber hold request captured in Salesforce CRM; notification sent to East End Mill inventory manager.',
    frictionEliminated: 'No need to dig through social enterprise mission text to find commercial wood inventory.'
  },
  {
    id: 'municipal',
    icon: '🏛️',
    name: 'Municipal / Park Partner (e.g. City DPW)',
    intent: 'Contracting ecological land stewardship, trail building, or green stormwater infrastructure',
    mindset: 'Public procurement officer needing proof of certifications, prevailing wage compliance, safety records, and local past performance',
    steps: [
      { num: 'Click 1', title: 'Primary Nav', desc: 'Clicks "Land Stewardship & Environmental Contracting".' },
      { num: 'Click 2', title: 'Capabilities & Case Studies', desc: 'Views municipal project sheets (e.g., Frick Park trails, GSI maintenance) with partner logos.' },
      { num: 'Click 3', title: 'Request for Qualifications (RFQ)', desc: 'Downloads Statement of Qualifications (SOQ) or submits project scope inquiry form.' }
    ],
    conversionGoal: 'Municipal RFQ packet submitted directly to Director of Stewardship with project parameters.',
    frictionEliminated: 'Instant verification of 10-year track record with 55 regional municipal partners.'
  },
  {
    id: 'logdonor',
    icon: '🚛',
    name: 'Urban Log Supplier / Tree Service',
    intent: 'Donating or delivering salvaged urban logs instead of paying landfill tipping fees',
    mindset: 'Arborist or municipal forester needing log size specs, drop-off location, and accepted species guidelines',
    steps: [
      { num: 'Click 1', title: 'The Mill Dropdown', desc: 'Selects "Log Donation & Supply Partnership".' },
      { num: 'Click 2', title: 'Log Acceptance Criteria', desc: 'Views clear visual infographic of minimum diameters (18"+), species accepted, and metal-screening.' },
      { num: 'Click 3', title: 'Schedule Delivery Form', desc: 'Uploads log photo, inputs species & dimensions, schedules East End Mill drop-off.' }
    ],
    conversionGoal: 'Log intake manifest generated; East End yard crew alerted for forklift receiving.',
    frictionEliminated: 'Prevents unannounced deliveries of unsuitable softwoods or brush.'
  },
  {
    id: 'funder',
    icon: '📊',
    name: 'Foundation Program Officer / Donor',
    intent: 'Evaluating Landforce for grant funding or multi-year capacity investment',
    mindset: 'Needs hard data: wage progression, carbon retention, equity practices, audited 990s, and scalable business lines',
    steps: [
      { num: 'Click 1', title: 'About & Impact Nav', desc: 'Navigates to "Our Model & Impact".' },
      { num: 'Click 2', title: 'Interactive Impact Dashboard', desc: 'Explores real-time workforce metrics, certifications, and carbon retention calculator.' },
      { num: 'Click 3', title: 'Grantmaker Toolkit & 990s', desc: 'Downloads audited financials, DCNR compliance reports, or completes secure major gift form.' }
    ],
    conversionGoal: 'Funders access verified data for board dockets; individual donors complete frictionless contribution.',
    frictionEliminated: 'Unified story shows how earned social enterprise revenue amplifies philanthropic ROI.'
  }
];

function initAudienceSimulator() {
  const grid = document.getElementById('personaGrid');
  const stage = document.getElementById('journeyStage');
  if (!grid || !stage) return;

  grid.innerHTML = personasData.map((p, idx) => `
    <button class="persona-btn ${idx === 0 ? 'active' : ''}" data-persona="${p.id}">
      <span>${p.icon}</span>
      <span>${p.name}</span>
    </button>
  `).join('');

  function renderPersona(personaId) {
    const p = personasData.find(item => item.id === personaId) || personasData[0];
    stage.innerHTML = `
      <div class="active-persona-brief">
        <div class="apb-header">
          <div class="apb-title">
            <span class="apb-icon">${p.icon}</span>
            <h4>${p.name}</h4>
          </div>
          <div class="apb-intent"><strong>Goal:</strong> ${p.intent}</div>
        </div>
        <div class="apb-mindset"><strong>Audience Context:</strong> ${p.mindset}</div>

        <div class="journey-step-grid">
          ${p.steps.map(step => `
            <div class="step-card">
              <span class="step-badge">${step.num}</span>
              <h5>${step.title}</h5>
              <p>${step.desc}</p>
            </div>
          `).join('')}
        </div>

        <div class="apb-footer-outcomes">
          <div class="outcome-box goal-box">
            <strong>🎯 Key Conversion Result:</strong> ${p.conversionGoal}
          </div>
          <div class="outcome-box friction-box">
            <strong>✨ Friction Eliminated:</strong> ${p.frictionEliminated}
          </div>
        </div>
      </div>
    `;
  }

  grid.querySelectorAll('.persona-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      grid.querySelectorAll('.persona-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPersona(btn.getAttribute('data-persona'));
    });
  });

  renderPersona('crew');
}

/* --------------------------------------------------------------------------
   5. CARBON SEQUESTRATION & IMPACT CALCULATOR
   -------------------------------------------------------------------------- */
function initCarbonCalculator() {
  const lumberSlider = document.getElementById('lumberSlider');
  const lumberDisplay = document.getElementById('lumberDisplay');
  const speciesSelect = document.getElementById('speciesSelect');
  const hoursSlider = document.getElementById('hoursSlider');
  const hoursDisplay = document.getElementById('hoursDisplay');

  const carbonVal = document.getElementById('carbonVal');
  const carbonEq = document.getElementById('carbonEq');
  const landfillVal = document.getElementById('landfillVal');
  const wagesVal = document.getElementById('wagesVal');
  const certVal = document.getElementById('certVal');
  const acresVal = document.getElementById('acresVal');

  if (!lumberSlider) return;

  function updateMath() {
    const bf = parseInt(lumberSlider.value, 10);
    const hours = parseInt(hoursSlider.value, 10);
    const species = speciesSelect.value;

    lumberDisplay.textContent = `${bf.toLocaleString()} BF`;
    hoursDisplay.textContent = `${hours.toLocaleString()} Hours`;

    // Conversion factor based on USDA Forest Products Lab:
    // Hardwood: ~1.17 kg CO2 / BF
    // Softwood: ~0.85 kg CO2 / BF
    // Biochar: ~2.4 kg CO2 / BF eq
    let factor = 1.17;
    if (species === 'softwood') factor = 0.85;
    if (species === 'biochar') factor = 2.45;

    const totalKgCO2 = bf * factor;
    const metricTons = (totalKgCO2 / 1000).toFixed(1);
    const carsEq = (metricTons / 4.6).toFixed(1); // avg gasoline car ~4.6 metric tons CO2/yr
    const landfillTons = Math.round(bf * 0.0024);

    carbonVal.textContent = metricTons;
    carbonEq.textContent = `Equivalent to removing ${carsEq} gasoline passenger vehicles from regional roads for 1 year`;
    landfillVal.textContent = `${landfillTons.toLocaleString()} Tons`;

    // Workforce calculations:
    const wages = (hours * 16.50).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
    const certifications = Math.round(hours / 240);
    const acres = Math.round(hours / 650);

    wagesVal.textContent = wages;
    certVal.textContent = `${certifications}+`;
    acresVal.textContent = `${acres}+ Acres`;
  }

  lumberSlider.addEventListener('input', updateMath);
  speciesSelect.addEventListener('change', updateMath);
  hoursSlider.addEventListener('input', updateMath);

  updateMath();
}

/* --------------------------------------------------------------------------
   6. GANTT ROADMAP & TIMELINE
   -------------------------------------------------------------------------- */
const ganttTasks = [
  { name: 'Kickoff & Stakeholder Alignment', phase: 'brand', start: 1, end: 3, label: 'Weeks 1–3 (Nov)' },
  { name: 'Crew & Alumni Listening Sessions (Compensated)', phase: 'brand', start: 2, end: 4, label: 'Weeks 2–4' },
  { name: 'Brand & Digital Audit + Landscape Review', phase: 'brand', start: 3, end: 5, label: 'Weeks 3–5' },
  { name: 'Brand Architecture & Naming Formulation', phase: 'brand', start: 5, end: 8, label: 'Weeks 5–8 (Dec)' },
  { name: 'Visual Identity System & Brand Guidelines', phase: 'brand', start: 7, end: 10, label: 'Weeks 7–10' },
  { name: 'Priority Physical Collateral (12 Pieces)', phase: 'brand', start: 9, end: 13, label: 'Weeks 9–13 (Jan)' },
  { name: 'Milestone Gate 1: Brand Architecture Approval', phase: 'brand', start: 13, end: 13, label: 'TARGET: Jan 31' },
  
  { name: 'Website Information Architecture & Wireframes', phase: 'web', start: 12, end: 15, label: 'Weeks 12–15' },
  { name: 'Directed Photography Sessions (3 Days)', phase: 'web', start: 13, end: 16, label: 'Weeks 13–16' },
  { name: 'Core Copywriting (20 Priority Pages)', phase: 'web', start: 14, end: 17, label: 'Weeks 14–17 (Feb)' },
  { name: 'Custom Block Theme CMS Development', phase: 'web', start: 15, end: 19, label: 'Weeks 15–19' },
  { name: 'Salesforce, Mailchimp & Inventory Integrations', phase: 'web', start: 17, end: 20, label: 'Weeks 17–20' },
  { name: 'WCAG 2.2 AA Accessibility & Cross-Device QA', phase: 'web', start: 19, end: 21, label: 'Weeks 19–21' },
  { name: 'Staff Training & Knowledgebase Delivery', phase: 'web', start: 20, end: 22, label: 'Weeks 20–22 (Mar)' },
  { name: 'Public Website Launch & DNS Cutover', phase: 'launch', start: 22, end: 22, label: 'TARGET: Mar 31' },
  { name: '60-Day Post-Launch Warranty Support', phase: 'launch', start: 22, end: 30, label: 'Through May 31' }
];

function initGanttChart() {
  const container = document.getElementById('ganttChart');
  const filterBtns = document.querySelectorAll('.gantt-filter-bar .pill-btn');
  if (!container) return;

  let currentFilter = 'all';

  function renderGantt() {
    const filtered = ganttTasks.filter(task => {
      if (currentFilter === 'all') return true;
      if (currentFilter === 'brand') return task.phase === 'brand';
      if (currentFilter === 'web') return task.phase === 'web' || task.phase === 'launch';
      return true;
    });

    const totalWeeks = 22;

    container.innerHTML = filtered.map(t => {
      const leftPct = ((t.start - 1) / totalWeeks) * 100;
      const widthPct = Math.max(((t.end - t.start + 1) / totalWeeks) * 100, 4.5);
      const barClass = t.phase === 'brand' ? 'gantt-brand' : t.phase === 'web' ? 'gantt-web' : 'gantt-launch';

      return `
        <div class="gantt-row">
          <div class="gantt-task-name">${t.name}</div>
          <div class="gantt-bar-track">
            <div class="gantt-bar-fill ${barClass}" style="margin-left: ${leftPct}%; width: ${widthPct}%;">
              ${t.label}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-gantt');
      renderGantt();
    });
  });

  renderGantt();
}

/* --------------------------------------------------------------------------
   7. INTERACTIVE BUDGET & APPENDIX A PRICING SCHEDULE
   -------------------------------------------------------------------------- */
const appendixBaseRows = [
  {
    category: 'Discovery, research, and stakeholder engagement',
    base: 5500,
    optional: 0,
    recurring: 0,
    notes: 'Includes project kickoff, comprehensive brand & digital audit, web traffic & analytics review, working sessions with Landforce leadership, and key institutional partner consultations.'
  },
  {
    category: 'Brand architecture, naming, identity, and brand guide',
    base: 7800,
    optional: 0,
    recurring: 0,
    notes: 'Endorsed hybrid model documentation, RWP/Mill product naming evaluation, USPTO trademark screen, complete logo vector lockups, typography, and practical brand guide.'
  },
  {
    category: 'Collateral, physical applications, and social media',
    base: 5000,
    optional: 0,
    recurring: 0,
    notes: '12 production-ready collateral files (pitch deck, fleet decals, uniforms, lumber tags, biochar packaging, Mill signage specs) + Canva/Figma social kit.'
  },
  {
    category: 'Website strategy, content architecture, and media integration',
    base: 6000,
    optional: 0,
    recurring: 0,
    notes: 'Information architecture, user journey testing, full rewriting of up to 20 priority core pages, and full curation/optimization of Landforce-supplied photography archives (turnkey directed on-site photography available as an add-on).'
  },
  {
    category: 'Website design, custom Next.js development, and headless CMS',
    base: 6900,
    optional: 0,
    recurring: 0,
    notes: 'Custom Next.js 15 (App Router) & TypeScript engineering, modern headless CMS with live visual editing, Cloudflare WAF/CDN edge security, WCAG 2.2 AA certification, and zero WordPress/page-builder bloat.'
  },
  {
    category: 'Forms, CRM integrations, impact dashboard, and RWP lumber catalog',
    base: 3000,
    optional: 0,
    recurring: 0,
    notes: 'Salesforce Non-Profit Cloud Web-to-Lead sync, Resend high-deliverability email automation (superior to Mailchimp), staff-maintainable carbon impact display, and live RWP lumber inventory / RFQ tool.'
  },
  {
    category: 'Testing, launch, training, and documentation',
    base: 2500,
    optional: 0,
    recurring: 0,
    notes: 'Cross-browser QA, 301 URL redirect migration, 3 recorded role-based staff video trainings, administrator reference manual, and 60-day post-launch warranty.'
  },
  {
    category: 'Hosting, licenses, maintenance, and post-launch support',
    base: 0,
    optional: 0,
    recurring: 0,
    notes: 'Base fee includes 60-day full warranty. Cloudflare edge & hosting configuration billed direct to client (~$20/mo) for 100% data ownership and zero markup.'
  },
  {
    category: 'Travel, incentives, fabrication, installation, and other expenses',
    base: 0,
    optional: 0,
    recurring: 0,
    notes: 'All client strategy sessions, working presentations, and virtual workshops included in base fee. On-site sessions scheduled in coordination with Landforce. Physical fabrication and printing billed directly to Landforce vendors.'
  }
];

const phasedAddons = [
  {
    id: 'photo_production',
    title: 'Turnkey On-Site Directed Photography Production',
    categoryIdx: 3,
    price: 3800,
    desc: 'Coordinated on-site professional shoots by vetted local commercial photographers: field stewardship crews, East End Mill operations, and dignified workforce portraits.',
    grantFit: 'Communications & Media Capacity Fund'
  },
  {
    id: 'e_commerce',
    title: 'Advanced RWP Lumber E-Commerce & Inventory Sync',
    categoryIdx: 5, // adds to category 6
    price: 6800,
    desc: 'Full digital shopping cart, credit card processing for kiln lumber & biochar, automated customer pickup slots, and live stock tracking.',
    grantFit: 'USDA Forest Service Wood Innovations / EDA Grant'
  },
  {
    id: 'carbon_widget',
    title: 'Custom Dynamic Carbon Sequestration & Canopy Map',
    categoryIdx: 5,
    price: 3200,
    desc: 'Interactive GIS map showing specific Pittsburgh neighborhoods where salvaged logs originated and exact board-foot carbon retained.',
    grantFit: 'Foundation Environmental Impact Grant'
  },
  {
    id: 'video_drone',
    title: 'Cinematic Drone Video & Social Reel Vignettes',
    categoryIdx: 3,
    price: 4500,
    desc: '4 high-definition video shorts (Mill operations, trail crews, crew member spotlight) edited for Instagram, LinkedIn, and foundation presentations.',
    grantFit: 'Foundation Capacity Grant'
  },
  {
    id: 'sign_fabrication',
    title: 'Physical Signage & Decal Print Production Management',
    categoryIdx: 2,
    price: 2800,
    desc: 'Direct vendor bidding, material sampling, and on-site installation oversight for East End Mill wayfinding and fleet truck vinyl decals.',
    grantFit: 'Landforce Capital Improvement Fund'
  },
  {
    id: 'multilingual',
    title: 'Bilingual Spanish Language Workforce Intake Portal',
    categoryIdx: 4,
    price: 3600,
    desc: 'Professional human translation, bilingual form routing, and Spanish accessibility audit to expand equitable crew recruitment.',
    grantFit: 'Workforce Diversity & Inclusion Grant'
  },
  {
    id: 'retainer_annual',
    title: 'Annual Priority SLA Maintenance & Support Retainer',
    categoryIdx: 7,
    price: 2400,
    desc: '12 months of monthly plugin security patching, accessibility compliance monitoring, and 4 hours/month of on-call developer support ($200/mo).',
    grantFit: 'Annual Operating Budget'
  }
];

function initBudgetCalculator() {
  const tableBody = document.getElementById('appendixTableBody');
  const enhancementsGrid = document.getElementById('enhancementsGrid');
  const addonTotalDisplay = document.getElementById('addonTotal');
  const addonCountDisplay = document.getElementById('addonCount');
  const grandTotalDisplay = document.getElementById('grandTotal');
  const footAddonTotal = document.getElementById('footAddonTotal');

  let selectedAddons = new Set();

  function renderTable() {
    let currentAddonTotal = 0;

    // Calculate addons per row
    const rowAddons = appendixBaseRows.map(() => 0);
    selectedAddons.forEach(addonId => {
      const item = phasedAddons.find(a => a.id === addonId);
      if (item) {
        rowAddons[item.categoryIdx] += item.price;
        currentAddonTotal += item.price;
      }
    });

    const baseTotal = appendixBaseRows.reduce((sum, row) => sum + row.base, 0);

    tableBody.innerHTML = appendixBaseRows.map((row, idx) => {
      const addVal = rowAddons[idx];
      return `
        <tr>
          <td><strong>${row.category}</strong></td>
          <td class="text-primary"><strong>$${row.base.toLocaleString()}</strong></td>
          <td class="text-accent">${addVal > 0 ? `+$${addVal.toLocaleString()}` : '$0'}</td>
          <td class="text-muted">$0</td>
          <td class="text-sm">${row.notes}</td>
        </tr>
      `;
    }).join('');

    const grandTotal = baseTotal + currentAddonTotal;
    addonTotalDisplay.textContent = `$${currentAddonTotal.toLocaleString()}.00`;
    addonCountDisplay.textContent = `${selectedAddons.size} Optional Add-on${selectedAddons.size === 1 ? '' : 's'} Selected`;
    grandTotalDisplay.textContent = `$${grandTotal.toLocaleString()}.00`;
    footAddonTotal.textContent = `+$${currentAddonTotal.toLocaleString()}`;
  }

  enhancementsGrid.innerHTML = phasedAddons.map(addon => `
    <div class="addon-card" data-id="${addon.id}">
      <input type="checkbox" class="addon-check" id="chk_${addon.id}">
      <div class="addon-info">
        <div class="addon-title-row">
          <label for="chk_${addon.id}" class="addon-title">${addon.title}</label>
          <span class="addon-price">+$${addon.price.toLocaleString()}</span>
        </div>
        <p class="addon-desc">${addon.desc}</p>
        <div style="font-size: 0.72rem; color: #2e694d; font-weight: 600; margin-top: 0.3rem;">
          Grant Fit: ${addon.grantFit}
        </div>
      </div>
    </div>
  `).join('');

  enhancementsGrid.querySelectorAll('.addon-card').forEach(card => {
    const id = card.getAttribute('data-id');
    const chk = card.querySelector('.addon-check');

    card.addEventListener('click', (e) => {
      if (e.target !== chk && e.target.tagName !== 'LABEL') {
        chk.checked = !chk.checked;
      }
      if (chk.checked) {
        selectedAddons.add(id);
        card.classList.add('selected');
      } else {
        selectedAddons.delete(id);
        card.classList.remove('selected');
      }
      renderTable();
    });

    chk.addEventListener('change', () => {
      if (chk.checked) {
        selectedAddons.add(id);
        card.classList.add('selected');
      } else {
        selectedAddons.delete(id);
        card.classList.remove('selected');
      }
      renderTable();
    });
  });

  renderTable();
}

/* --------------------------------------------------------------------------
   8. PRINT & EXPORT BUTTON
   -------------------------------------------------------------------------- */
function initPrintButton() {
  const btnPrint = document.getElementById('btnPrint');
  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      window.print();
    });
  }
}
