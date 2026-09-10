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
  initHeroPdfViewer();
});

/* --------------------------------------------------------------------------
   0. MOBILE NAV DRAWER TOGGLE
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('navToggle');
  const drawer = document.getElementById('mobileDrawer');
  if (!toggleBtn || !drawer) return;

  function setDrawerState(open) {
    drawer.classList.toggle('open', open);
    toggleBtn.classList.toggle('active', open);
    toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = drawer.classList.contains('open');
    setDrawerState(!isOpen);
  });

  // Close when clicking any link in drawer
  drawer.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', () => {
      setDrawerState(false);
    });
  });

  // Close when tapping outside drawer
  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('open') && !drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
      setDrawerState(false);
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      setDrawerState(false);
    }
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
    title: 'Fleet Vehicle & Work Truck Livery Decal System',
    render: (modelKey) => {
      const isModel1 = modelKey === 'model1';
      const isModel2 = modelKey === 'model2';
      const isModel3 = modelKey === 'model3';

      return `
        <div class="mockup-vehicle-canvas">
          <div class="mockup-stage-badge-row">
            <span class="ms-status-pill ${isModel2 ? 'ms-status-recom' : 'ms-status-warn'}">
              ${isModel2 ? '★ Option B (Recommended): Co-Branded Dual-Revenue Livery' : isModel1 ? '⚠️ Option A: 100% Monolithic Fleet Wrap' : '⚠️ Option C: Split Disjointed Fleet'}
            </span>
            <span class="ms-asset-type">Asset Type: Heavy Duty Crew-Cab Utility Truck (Class 3/4)</span>
          </div>

          <div class="truck-illustration-wrapper">
            <svg viewBox="0 0 760 260" class="truck-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Work truck with brand decal application">
              <defs>
                <linearGradient id="truckCabGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#ffffff"/>
                  <stop offset="100%" stop-color="#e2e8f0"/>
                </linearGradient>
                <linearGradient id="lfGreenGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#1f4734"/>
                  <stop offset="100%" stop-color="#132b20"/>
                </linearGradient>
                <linearGradient id="millTimberGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#3d1f0e"/>
                  <stop offset="50%" stop-color="#542c13"/>
                  <stop offset="100%" stop-color="#2a1408"/>
                </linearGradient>
                <linearGradient id="chromeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#f8fafc"/>
                  <stop offset="50%" stop-color="#cbd5e1"/>
                  <stop offset="100%" stop-color="#64748b"/>
                </linearGradient>
                <linearGradient id="tireGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#334155"/>
                  <stop offset="100%" stop-color="#090d16"/>
                </linearGradient>
                <linearGradient id="rimGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#f1f5f9"/>
                  <stop offset="100%" stop-color="#64748b"/>
                </linearGradient>
                <linearGradient id="windshieldGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.5"/>
                  <stop offset="40%" stop-color="#0284c7" stop-opacity="0.75"/>
                  <stop offset="100%" stop-color="#0f172a" stop-opacity="0.95"/>
                </linearGradient>
                <filter id="truckShadow" x="-10%" y="-10%" width="120%" height="140%">
                  <feGaussianBlur stdDeviation="5"/>
                </filter>
              </defs>

              <!-- Ground Shadow -->
              <ellipse cx="380" cy="242" rx="350" ry="10" fill="rgba(15,23,42,0.22)" filter="url(#truckShadow)"/>

              <!-- Front Bumper -->
              <rect x="20" y="178" width="34" height="36" rx="6" fill="url(#chromeGrad)" stroke="#475569" stroke-width="1.5"/>
              <rect x="20" y="196" width="22" height="14" rx="3" fill="#1e293b"/>

              <!-- Hood & Front Grill -->
              <path d="M 38 184 L 38 126 Q 48 118 95 116 L 175 116 L 196 52 Q 202 46 216 46 L 325 46 L 336 50 L 336 186 Z" fill="url(#truckCabGrad)" stroke="#334155" stroke-width="2"/>
              <!-- Front Headlight -->
              <rect x="40" y="128" width="16" height="24" rx="4" fill="#fef08a" stroke="#ca8a04" stroke-width="1"/>
              <rect x="40" y="154" width="16" height="10" rx="2" fill="#f97316"/>

              <!-- Front Windshield -->
              <path d="M 198 112 L 210 56 Q 215 52 225 52 L 318 52 L 318 112 Z" fill="url(#windshieldGrad)" stroke="#334155" stroke-width="1.5"/>
              <path d="M 230 56 L 212 108" stroke="#ffffff" stroke-width="2" stroke-opacity="0.5" stroke-linecap="round"/>

              <!-- Side Mirror -->
              <rect x="178" y="98" width="14" height="26" rx="4" fill="#1e293b"/>
              <line x1="192" y1="106" x2="202" y2="110" stroke="#0f172a" stroke-width="3"/>

              <!-- Cab Door Seam -->
              <path d="M 200 116 L 200 186" stroke="#94a3b8" stroke-width="1.5"/>
              <rect x="290" y="122" width="18" height="6" rx="2" fill="#1e293b"/>

              <!-- Front Cab Door Decal Panel -->
              <rect x="204" y="118" width="124" height="66" rx="4" fill="${isModel1 ? '#1f4734' : isModel2 ? 'url(#lfGreenGrad)' : '#334155'}" stroke="${isModel2 ? '#4ade80' : '#475569'}" stroke-width="1"/>
              
              <!-- Cab Door Brand Graphic -->
              <g transform="translate(210, 130)">
                <path d="M 6 12 Q 10 2 20 2 Q 22 10 16 16 Q 10 20 6 12 Z" fill="#4ade80"/>
                <path d="M 8 16 Q 2 12 3 6 Q 10 7 12 14 Z" fill="#86efac"/>
                <text x="26" y="12" font-family="'Space Grotesk', sans-serif" font-size="11" font-weight="900" fill="#ffffff" letter-spacing="1">LANDFORCE</text>
                <text x="26" y="24" font-family="'Plus Jakarta Sans', sans-serif" font-size="7" font-weight="700" fill="#86efac">${isModel2 ? 'LAND STEWARDSHIP' : isModel1 ? 'WORKFORCE DEV' : 'FIELD CREW'}</text>
                <text x="26" y="34" font-family="'Plus Jakarta Sans', sans-serif" font-size="6" font-weight="500" fill="#d1fae5">Pittsburgh, PA • Certified</text>
              </g>

              <!-- Heavy Duty Utility Body (Cargo Bed / Commercial Box) -->
              <path d="M 336 46 L 710 46 Q 724 46 724 60 L 724 190 L 336 190 Z" fill="${isModel1 ? '#1f4734' : isModel2 ? 'url(#millTimberGrad)' : '#e2e8f0'}" stroke="#334155" stroke-width="2"/>
              <!-- Upper Tool Rack / Ladder Rail -->
              <rect x="330" y="34" width="395" height="8" rx="2" fill="url(#chromeGrad)" stroke="#475569" stroke-width="1"/>
              <line x1="360" y1="42" x2="360" y2="46" stroke="#334155" stroke-width="3"/>
              <line x1="520" y1="42" x2="520" y2="46" stroke="#334155" stroke-width="3"/>
              <line x1="680" y1="42" x2="680" y2="46" stroke="#334155" stroke-width="3"/>

              <!-- Utility Bed Branding Graphics -->
              ${isModel2 ? `
                <!-- Option B: Endorsed Hybrid The Mill Decal -->
                <rect x="350" y="58" width="355" height="120" rx="6" fill="rgba(0,0,0,0.3)" stroke="#c87a32" stroke-width="1.5"/>
                <rect x="350" y="58" width="355" height="24" rx="6" fill="#c87a32"/>
                <text x="365" y="74" font-family="'Space Grotesk', sans-serif" font-size="9" font-weight="900" fill="#ffffff" letter-spacing="1.5">★ COMMERCIAL WOOD PRODUCTION & RETAIL</text>
                
                <g transform="translate(365, 94)">
                  <circle cx="20" cy="20" r="16" fill="#c87a32"/>
                  <circle cx="20" cy="20" r="8" fill="#2a1408"/>
                  <path d="M 12 20 L 28 20 M 20 12 L 20 28" stroke="#ffffff" stroke-width="2"/>
                  
                  <text x="46" y="16" font-family="'Space Grotesk', sans-serif" font-size="20" font-weight="900" fill="#fef08a" letter-spacing="2">THE MILL</text>
                  <text x="146" y="16" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="800" fill="#ffffff">BY LANDFORCE</text>
                  <text x="46" y="32" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="700" fill="#fde68a">Kiln-Dried Urban Hardwoods • Custom Milling • Biochar</text>
                  <text x="46" y="44" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" font-weight="500" fill="#fed7aa">East End Facility • (412) 555-WOOD • landforcepgh.org/the-mill</text>
                </g>
              ` : isModel1 ? `
                <g transform="translate(370, 95)">
                  <text x="0" y="20" font-family="'Space Grotesk', sans-serif" font-size="22" font-weight="900" fill="#ffffff" letter-spacing="2">LANDFORCE</text>
                  <text x="0" y="40" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700" fill="#86efac">Environmental Social Enterprise & Workforce Program</text>
                  <text x="0" y="58" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="500" fill="#cbd5e1">landforcepgh.org • Pittsburgh, PA</text>
                  <rect x="-10" y="66" width="340" height="20" rx="3" fill="#ef4444" fill-opacity="0.25" stroke="#ef4444" stroke-width="1"/>
                  <text x="0" y="80" font-family="'Plus Jakarta Sans', sans-serif" font-size="8.5" font-weight="700" fill="#fca5a5">⚠️ Zero lumber / commercial mill branding visible to passing contractors</text>
                </g>
              ` : `
                <g transform="translate(370, 90)">
                  <text x="0" y="18" font-family="'Space Grotesk', sans-serif" font-size="18" font-weight="900" fill="#713f12">THE INDEPENDENT MILL</text>
                  <text x="0" y="34" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="600" fill="#9a3412">Separate Commercial Operation</text>
                  <rect x="-10" y="48" width="340" height="34" rx="4" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/>
                  <text x="0" y="62" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" font-weight="700" fill="#b91c1c">⚠️ DUAL FLEET REQUIRED: Field crews cannot drive this truck.</text>
                  <text x="0" y="74" font-family="'Plus Jakarta Sans', sans-serif" font-size="7.5" font-weight="500" fill="#7f1d1d">Requires purchasing duplicate vehicles for Landforce and The Mill ($120k+ overhead).</text>
                </g>
              `}

              <!-- Rear Step & Tail light -->
              <rect x="724" y="156" width="8" height="24" rx="2" fill="#ef4444" stroke="#991b1b" stroke-width="1"/>
              <rect x="712" y="192" width="22" height="12" rx="3" fill="url(#chromeGrad)" stroke="#475569" stroke-width="1"/>

              <!-- Front Wheel Well & Wheel -->
              <path d="M 105 190 A 48 48 0 0 1 205 190 Z" fill="#0f172a"/>
              <circle cx="155" cy="210" r="42" fill="url(#tireGrad)" stroke="#0f172a" stroke-width="2"/>
              <circle cx="155" cy="210" r="38" fill="none" stroke="#475569" stroke-width="1.5" stroke-dasharray="3,3"/>
              <circle cx="155" cy="210" r="26" fill="url(#rimGrad)" stroke="#1e293b" stroke-width="1.5"/>
              <circle cx="155" cy="210" r="10" fill="#0f172a"/>
              <circle cx="155" cy="194" r="2.5" fill="#f8fafc"/>
              <circle cx="155" cy="226" r="2.5" fill="#f8fafc"/>
              <circle cx="139" cy="210" r="2.5" fill="#f8fafc"/>
              <circle cx="171" cy="210" r="2.5" fill="#f8fafc"/>

              <!-- Rear Wheel Well & Dual Wheels -->
              <path d="M 550 190 A 54 54 0 0 1 665 190 Z" fill="#0f172a"/>
              <circle cx="608" cy="210" r="44" fill="url(#tireGrad)" stroke="#0f172a" stroke-width="2"/>
              <circle cx="608" cy="210" r="40" fill="none" stroke="#475569" stroke-width="1.5" stroke-dasharray="3,3"/>
              <circle cx="608" cy="210" r="28" fill="url(#rimGrad)" stroke="#1e293b" stroke-width="1.5"/>
              <circle cx="608" cy="210" r="12" fill="#0f172a"/>
              <circle cx="608" cy="192" r="2.5" fill="#f8fafc"/>
              <circle cx="608" cy="228" r="2.5" fill="#f8fafc"/>
              <circle cx="590" cy="210" r="2.5" fill="#f8fafc"/>
              <circle cx="626" cy="210" r="2.5" fill="#f8fafc"/>
              <rect x="656" y="206" width="8" height="34" rx="2" fill="#0f172a"/>
            </svg>
          </div>

          <div class="mockup-strategic-card">
            <div class="msc-header">
              <span class="msc-title">Why Fleet Livery Resolves RFP Section 5.B:</span>
              <span class="msc-badge ${isModel2 ? 'badge-recom' : ''}">
                ${isModel2 ? 'Recommended Strategic Choice' : isModel1 ? 'Commercial Visibility Flaw' : 'Capital Cost Hazard'}
              </span>
            </div>
            <div class="msc-grid">
              <div class="msc-col">
                <div class="msc-icon">🏛️</div>
                <strong>Municipal Contracting Recognition</strong>
                <p>${isModel2 
                  ? 'City DPW and Allegheny County park managers immediately identify the trusted Landforce brand on the cab, preserving 10 years of civic reputation and public procurement eligibility.' 
                  : isModel1 
                  ? 'Municipal recognition is preserved, but commercial wood inventory remains 100% invisible to regional buyers.' 
                  : 'Stewardship crews driving The Mill vehicles confuse municipal site inspectors regarding prevailing wage contracts.'}
                </p>
              </div>
              <div class="msc-col">
                <div class="msc-icon">🪵</div>
                <strong>Commercial Retail Impact (The Mill)</strong>
                <p>${isModel2 
                  ? 'Woodworkers, furniture builders, and contractors see "THE MILL by Landforce" in traffic and immediately recognize a local supplier for kiln-dried urban hardwoods and custom milling.' 
                  : isModel1 
                  ? 'Contractors assume Landforce only does trail maintenance and never realize 10,000 sq ft of kiln-dried urban timber is available.' 
                  : 'Forces full duplicate investment into separate brand marketing and duplicate delivery trucks.'}
                </p>
              </div>
              <div class="msc-col">
                <div class="msc-icon">🚜</div>
                <strong>One Shared Fleet (Zero Duplication)</strong>
                <p>${isModel2 
                  ? 'Zero fleet duplication: Landforce operates a single shared 4-truck fleet that moves stewardship field gear by day and delivers lumber orders by afternoon.' 
                  : isModel1 
                  ? 'Single fleet, but missed revenue potential for commercial timber operations.' 
                  : 'Requires purchasing dedicated separate trucks for field and mill, adding $120,000+ in unnecessary capital cost.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  },
  uniform: {
    title: 'Crew Apparel, High-Vis Vests & Safety Certification Gear',
    render: (modelKey) => {
      const isModel2 = modelKey === 'model2';
      return `
        <div class="mockup-uniform-canvas">
          <div class="mockup-stage-badge-row">
            <span class="ms-status-pill ${isModel2 ? 'ms-status-recom' : ''}">
              ${isModel2 ? '★ Dignity-Centered & Role-Specific Workwear System' : 'Uniform Apparel Application'}
            </span>
            <span class="ms-asset-type">Asset Type: ANSI Class 2 Field Vest • The Mill Workshop Apron • OSHA Hardhat</span>
          </div>

          <div class="uniform-vector-stage">
            <svg viewBox="0 0 740 240" class="uniform-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Field safety vest, workshop apron, and safety hardhat">
              <defs>
                <linearGradient id="hiVisGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#facc15"/>
                  <stop offset="100%" stop-color="#eab308"/>
                </linearGradient>
                <linearGradient id="reflectiveGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#e2e8f0"/>
                  <stop offset="50%" stop-color="#ffffff"/>
                  <stop offset="100%" stop-color="#cbd5e1"/>
                </linearGradient>
                <linearGradient id="apronGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#542c13"/>
                  <stop offset="100%" stop-color="#3d1f0e"/>
                </linearGradient>
                <linearGradient id="hardhatGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#ffffff"/>
                  <stop offset="100%" stop-color="#e2e8f0"/>
                </linearGradient>
              </defs>

              <!-- 1. High-Vis Field Vest -->
              <g transform="translate(40, 20)">
                <!-- Vest Body Outline -->
                <path d="M 45 10 L 80 10 L 100 45 L 120 10 L 155 10 L 175 60 L 175 180 Q 175 190 165 190 L 35 190 Q 25 190 25 180 L 25 60 Z" fill="url(#hiVisGrad)" stroke="#ca8a04" stroke-width="2"/>
                <!-- Neck V-Cutout -->
                <path d="M 80 10 Q 100 70 120 10 Z" fill="#0f172a" opacity="0.15"/>
                <!-- 3M Reflective Horizontal Stripes -->
                <rect x="25" y="115" width="150" height="20" fill="url(#reflectiveGrad)" stroke="#94a3b8" stroke-width="1"/>
                <rect x="25" y="145" width="150" height="20" fill="url(#reflectiveGrad)" stroke="#94a3b8" stroke-width="1"/>
                <!-- 3M Reflective Vertical Shoulder Straps -->
                <rect x="52" y="10" width="18" height="105" fill="url(#reflectiveGrad)" stroke="#94a3b8" stroke-width="1"/>
                <rect x="130" y="10" width="18" height="105" fill="url(#reflectiveGrad)" stroke="#94a3b8" stroke-width="1"/>
                <!-- Center Zipper -->
                <line x1="100" y1="70" x2="100" y2="190" stroke="#1e293b" stroke-width="2.5" stroke-dasharray="2,2"/>
                <!-- Chest Patch -->
                <rect x="36" y="76" width="50" height="22" rx="3" fill="#163024" stroke="#4ade80" stroke-width="1"/>
                <text x="61" y="90" font-family="'Space Grotesk', sans-serif" font-size="6.5" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">LANDFORCE</text>
                <text x="61" y="96" font-family="'Plus Jakarta Sans', sans-serif" font-size="4.5" font-weight="700" fill="#86efac" text-anchor="middle">CREW</text>
                <!-- Radio loop / pen slot -->
                <rect x="136" y="80" width="12" height="14" rx="2" fill="#1e293b" opacity="0.4"/>
                <text x="100" y="212" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="#1e293b" text-anchor="middle">Field Stewardship Vest</text>
                <text x="100" y="226" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="500" fill="#64748b" text-anchor="middle">ANSI Class 2 • Strengths-Based</text>
              </g>

              <!-- 2. The Mill Workshop Apron -->
              <g transform="translate(275, 20)">
                <!-- Apron Body -->
                <path d="M 60 15 L 140 15 L 155 70 L 175 190 Q 175 198 165 198 L 35 198 Q 25 198 25 190 L 45 70 Z" fill="url(#apronGrad)" stroke="#27140b" stroke-width="2"/>
                <!-- Neck Strap -->
                <path d="M 65 15 Q 100 -5 135 15" fill="none" stroke="#78350f" stroke-width="6"/>
                <!-- Brass Rivets -->
                <circle cx="65" cy="18" r="3.5" fill="#facc15" stroke="#92400e" stroke-width="1"/>
                <circle cx="135" cy="18" r="3.5" fill="#facc15" stroke="#92400e" stroke-width="1"/>
                <!-- Stamped Leather Chest Badge -->
                <rect x="52" y="32" width="96" height="34" rx="4" fill="#78350f" stroke="#ca8a04" stroke-width="1.2"/>
                <text x="100" y="47" font-family="'Space Grotesk', sans-serif" font-size="11" font-weight="900" fill="#fef08a" text-anchor="middle" letter-spacing="1">THE MILL</text>
                <text x="100" y="58" font-family="'Plus Jakarta Sans', sans-serif" font-size="7" font-weight="800" fill="#ffffff" text-anchor="middle">BY LANDFORCE</text>
                <!-- Large Tool Pocket with Rule -->
                <rect x="45" y="115" width="110" height="60" rx="3" fill="#3f2212" stroke="#78350f" stroke-width="1.5"/>
                <line x1="100" y1="115" x2="100" y2="175" stroke="#27140b" stroke-width="1.5" stroke-dasharray="3,3"/>
                <!-- Woodworker Pencil in Pocket -->
                <rect x="135" y="98" width="6" height="30" rx="1" fill="#ea580c" stroke="#9a3412" stroke-width="0.8"/>
                <polygon points="135,98 141,98 138,90" fill="#fde047"/>
                <text x="100" y="212" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="#1e293b" text-anchor="middle">The Mill Work Apron</text>
                <text x="100" y="226" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="500" fill="#64748b" text-anchor="middle">Heavy Waxed Canvas • Urban Wood</text>
              </g>

              <!-- 3. OSHA Certified Safety Hardhat -->
              <g transform="translate(520, 25)">
                <!-- Hardhat Dome -->
                <path d="M 25 125 C 25 50 155 50 155 125 Q 165 130 170 134 Q 165 142 145 142 L 35 142 Q 15 142 10 134 Q 15 130 25 125 Z" fill="url(#hardhatGrad)" stroke="#64748b" stroke-width="2"/>
                <!-- Top Ridge -->
                <path d="M 80 56 Q 90 48 100 56 L 100 125 L 80 125 Z" fill="#cbd5e1" opacity="0.6"/>
                <!-- Front Green Safety Cross Badge -->
                <circle cx="90" cy="95" r="15" fill="#163024" stroke="#4ade80" stroke-width="1.5"/>
                <path d="M 86 95 L 94 95 M 90 91 L 90 99" stroke="#4ade80" stroke-width="3" stroke-linecap="round"/>
                <!-- Certified Training Stickers -->
                <rect x="36" y="112" width="28" height="12" rx="2" fill="#22c55e"/>
                <text x="50" y="121" font-family="'Space Grotesk', sans-serif" font-size="5" font-weight="800" fill="#ffffff" text-anchor="middle">OSHA 10</text>
                <rect x="116" y="112" width="30" height="12" rx="2" fill="#0284c7"/>
                <text x="131" y="121" font-family="'Space Grotesk', sans-serif" font-size="5" font-weight="800" fill="#ffffff" text-anchor="middle">CHAINSAW</text>
                <text x="90" y="212" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="#1e293b" text-anchor="middle">OSHA Safety Hardhat</text>
                <text x="90" y="226" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="500" fill="#64748b" text-anchor="middle">Industry Certifications Displayed</text>
              </g>
            </svg>
          </div>

          <div class="mockup-strategic-card">
            <div class="msc-header">
              <span class="msc-title">Trauma-Informed & Strengths-Based Storytelling Protocol:</span>
              <span class="msc-badge badge-recom">Dignity-Centered Design</span>
            </div>
            <div class="msc-grid">
              <div class="msc-col">
                <div class="msc-icon">👷</div>
                <strong>Crew Member Dignity</strong>
                <p>Crew members are presented as skilled, certified environmental practitioners and tradespeople—not "charity cases." All uniform branding reinforces professional pride.</p>
              </div>
              <div class="msc-col">
                <div class="msc-icon">🦺</div>
                <strong>Role Distinction Without Division</strong>
                <p>Field crews wear Landforce high-vis safety gear, while Mill staff wear durable artisanal shop aprons branded "The Mill by Landforce"—unifying both divisions under one mission.</p>
              </div>
              <div class="msc-col">
                <div class="msc-icon">📜</div>
                <strong>Transparent Consent Protocol</strong>
                <p>Per RFP Section 5, crew photography and video require signed release, fair honorariums, and crew review before digital publication.</p>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  },
  lumber: {
    title: 'Kiln Lumber Lot Tag & Biochar Retail Specimen',
    render: (modelKey) => {
      return `
        <div class="mockup-lumber-canvas">
          <div class="mockup-stage-badge-row">
            <span class="ms-status-pill ms-status-recom">★ Commercial Retail Integrity & Traceability</span>
            <span class="ms-asset-type">Asset Type: Live-Edge Urban Hardwood Slab + Kiln Inspection Tag + Retail Biochar Packaging</span>
          </div>

          <div class="lumber-vector-stage">
            <svg viewBox="0 0 740 240" class="lumber-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Urban hardwood slab with attached inspection tag and biochar bag">
              <defs>
                <!-- Wood Grain Gradient -->
                <linearGradient id="slabGrain" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#451a03"/>
                  <stop offset="5%" stop-color="#78350f"/>
                  <stop offset="25%" stop-color="#9a3412"/>
                  <stop offset="45%" stop-color="#78350f"/>
                  <stop offset="70%" stop-color="#b45309"/>
                  <stop offset="90%" stop-color="#9a3412"/>
                  <stop offset="100%" stop-color="#451a03"/>
                </linearGradient>
                <linearGradient id="tagPaper" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#fefce8"/>
                  <stop offset="100%" stop-color="#fef08a"/>
                </linearGradient>
                <linearGradient id="biocharGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#27272a"/>
                  <stop offset="100%" stop-color="#09090b"/>
                </linearGradient>
              </defs>

              <!-- Wood Slab Body with Live Edge Profile -->
              <path d="M 30 50 Q 50 38 120 40 Q 240 44 380 38 Q 440 42 470 50 L 470 190 Q 420 198 320 194 Q 180 200 80 194 Q 40 196 30 190 Z" fill="url(#slabGrain)" stroke="#27140b" stroke-width="2.5"/>
              <!-- Wood Grain Rings / Rays -->
              <path d="M 40 65 Q 180 60 460 65 M 35 95 Q 220 88 465 95 M 40 125 Q 240 120 460 125 M 35 155 Q 200 150 465 155 M 40 180 Q 250 176 460 180" stroke="#451a03" stroke-width="1.2" opacity="0.6" fill="none"/>
              <!-- Bark Edge Texture -->
              <path d="M 30 50 Q 22 120 30 190" stroke="#1c0d02" stroke-width="4" fill="none"/>

              <!-- Branded Mill Hot-Iron Stamp on Timber -->
              <g transform="translate(60, 105)" opacity="0.85">
                <circle cx="28" cy="28" r="24" fill="none" stroke="#27140b" stroke-width="2" stroke-dasharray="4,2"/>
                <text x="28" y="24" font-family="'Space Grotesk', sans-serif" font-size="8" font-weight="900" fill="#27140b" text-anchor="middle">THE MILL</text>
                <text x="28" y="34" font-family="'Plus Jakarta Sans', sans-serif" font-size="5.5" font-weight="800" fill="#27140b" text-anchor="middle">BY LANDFORCE</text>
                <text x="28" y="42" font-family="'Space Grotesk', sans-serif" font-size="5" font-weight="700" fill="#27140b" text-anchor="middle">PGH URBAN SALVAGE</text>
              </g>

              <!-- Fastening Wire & Eyelet -->
              <line x1="310" y1="52" x2="330" y2="78" stroke="#ca8a04" stroke-width="2"/>
              <circle cx="310" cy="52" r="3" fill="#ca8a04"/>

              <!-- Attached Inspection Certificate Tag -->
              <g transform="translate(170, 68)">
                <polygon points="160,0 270,0 270,140 120,140 120,40" fill="url(#tagPaper)" stroke="#ca8a04" stroke-width="1.5" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))"/>
                <circle cx="138" cy="20" r="4.5" fill="#ca8a04"/>
                <circle cx="138" cy="20" r="2.5" fill="#fef08a"/>

                <!-- Tag Header -->
                <text x="195" y="20" font-family="'Space Grotesk', sans-serif" font-size="11" font-weight="900" fill="#713f12" text-anchor="middle" letter-spacing="1">THE MILL</text>
                <text x="195" y="28" font-family="'Plus Jakarta Sans', sans-serif" font-size="5.5" font-weight="800" fill="#a16207" text-anchor="middle">BY LANDFORCE • SALVAGED TIMBER</text>
                <line x1="128" y1="33" x2="262" y2="33" stroke="#ca8a04" stroke-width="1"/>

                <!-- Tag Specs -->
                <text x="128" y="45" font-family="'Plus Jakarta Sans', sans-serif" font-size="6.5" font-weight="700" fill="#713f12">SPECIES: <tspan font-weight="800" fill="#451a03">White Oak (Quarter-Sawn)</tspan></text>
                <text x="128" y="57" font-family="'Plus Jakarta Sans', sans-serif" font-size="6.5" font-weight="700" fill="#713f12">ORIGIN: <tspan font-weight="800" fill="#451a03">Frick Park Storm Salvage</tspan></text>
                <text x="128" y="69" font-family="'Plus Jakarta Sans', sans-serif" font-size="6.5" font-weight="700" fill="#713f12">MOISTURE: <tspan font-weight="800" fill="#15803d">7.2% Vacuum Kiln Dried</tspan></text>
                <text x="128" y="81" font-family="'Plus Jakarta Sans', sans-serif" font-size="6.5" font-weight="700" fill="#713f12">DIMENSIONS: <tspan font-weight="800" fill="#451a03">8/4 (2") × 18" × 8 Ft (24 BF)</tspan></text>
                <text x="128" y="93" font-family="'Plus Jakarta Sans', sans-serif" font-size="6.5" font-weight="700" fill="#713f12">CARBON: <tspan font-weight="800" fill="#15803d">🌱 34.8 kg CO₂e Sequestered</tspan></text>

                <!-- Barcode & QR Stamp -->
                <rect x="128" y="100" width="80" height="18" fill="#ffffff" stroke="#e2e8f0" stroke-width="0.8"/>
                <text x="168" y="112" font-family="'Space Grotesk', monospace" font-size="6" font-weight="800" fill="#1e293b" text-anchor="middle" letter-spacing="1">||| | |||| || ||| LF-883</text>
                <!-- QR Code Block -->
                <rect x="220" y="98" width="22" height="22" fill="#ffffff" stroke="#ca8a04" stroke-width="1"/>
                <rect x="223" y="101" width="6" height="6" fill="#1e293b"/>
                <rect x="233" y="101" width="6" height="6" fill="#1e293b"/>
                <rect x="223" y="111" width="6" height="6" fill="#1e293b"/>
                <rect x="231" y="109" width="3" height="3" fill="#1e293b"/>
                <text x="195" y="132" font-family="'Plus Jakarta Sans', sans-serif" font-size="5" font-weight="700" fill="#854d0e" text-anchor="middle">Scan QR for Live Board-Foot Inventory</text>
              </g>

              <!-- Biochar Bag Specimen Alongside -->
              <g transform="translate(520, 35)">
                <path d="M 20 20 L 160 20 L 175 180 Q 175 190 165 190 L 15 190 Q 5 190 5 180 Z" fill="url(#biocharGrad)" stroke="#3f3f46" stroke-width="1.5"/>
                <!-- Sealed Top Fold -->
                <polygon points="15,20 165,20 170,10 10,10" fill="#52525b" stroke="#71717a" stroke-width="1"/>
                <!-- Green Accent Ribbon -->
                <rect x="10" y="32" width="155" height="12" fill="#4ade80"/>
                <text x="87" y="41" font-family="'Space Grotesk', sans-serif" font-size="7" font-weight="900" fill="#064e3b" text-anchor="middle">100% REGENERATIVE URBAN BIOMASS</text>
                <!-- Biochar Branding -->
                <text x="87" y="75" font-family="'Space Grotesk', sans-serif" font-size="18" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">BIOCHAR PRO</text>
                <text x="87" y="90" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" font-weight="700" fill="#a1a1aa" text-anchor="middle">Horticultural Soil Amendment</text>
                <!-- Mill Seal -->
                <circle cx="87" cy="120" r="18" fill="#18181b" stroke="#4ade80" stroke-width="1"/>
                <text x="87" y="118" font-family="'Space Grotesk', sans-serif" font-size="6" font-weight="800" fill="#4ade80" text-anchor="middle">THE MILL</text>
                <text x="87" y="126" font-family="'Plus Jakarta Sans', sans-serif" font-size="5" font-weight="700" fill="#ffffff" text-anchor="middle">BY LANDFORCE</text>
                <text x="87" y="160" font-family="'Plus Jakarta Sans', sans-serif" font-size="7" font-weight="600" fill="#d4d4d8" text-anchor="middle">Made in Pittsburgh, PA</text>
                <text x="87" y="172" font-family="'Plus Jakarta Sans', sans-serif" font-size="6" font-weight="500" fill="#a1a1aa" text-anchor="middle">Net Wt. 20 Lbs • Carbon Negative</text>
              </g>
            </svg>
          </div>

          <div class="mockup-strategic-card">
            <div class="msc-header">
              <span class="msc-title">Commercial Credibility for Custom Woodworkers & Architects:</span>
              <span class="msc-badge badge-recom">B2B Commercial Bridge</span>
            </div>
            <div class="msc-grid">
              <div class="msc-col">
                <div class="msc-icon">📊</div>
                <strong>Technical Specifications First</strong>
                <p>Makers and contractors require precise moisture readings (&lt;8%) and species certification before purchasing. The Mill branding conveys commercial precision, not hobbyist charity.</p>
              </div>
              <div class="msc-col">
                <div class="msc-icon">🌱</div>
                <strong>Carbon Story as Premium Value</strong>
                <p>Every slab tracks carbon sequestered (e.g. 34.8 kg CO₂e) and Pittsburgh park salvage provenance, commanding higher margins from sustainability-minded clients.</p>
              </div>
              <div class="msc-col">
                <div class="msc-icon">📱</div>
                <strong>Digital-to-Physical QR Integration</strong>
                <p>Contractors scan the slab's physical tag to view live stock on landforcepgh.org/the-mill, check thickness options, and submit a 30-second quote or hold request.</p>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  },
  signage: {
    title: 'The Mill Facility Exterior & Wayfinding Monument Signage',
    render: (modelKey) => {
      return `
        <div class="mockup-signage-canvas">
          <div class="mockup-stage-badge-row">
            <span class="ms-status-pill ms-status-recom">★ East End Physical Facility Presence</span>
            <span class="ms-asset-type">Asset Type: Heavy-Timber Monument Sign with Steel I-Beam Ground Anchors</span>
          </div>

          <div class="signage-vector-stage">
            <svg viewBox="0 0 740 230" class="signage-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Architectural facility monument sign for The Mill by Landforce">
              <defs>
                <linearGradient id="beamSteel" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#18181b"/>
                  <stop offset="50%" stop-color="#3f3f46"/>
                  <stop offset="100%" stop-color="#18181b"/>
                </linearGradient>
                <linearGradient id="signWood" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#3d1f0e"/>
                  <stop offset="100%" stop-color="#1f0f07"/>
                </linearGradient>
                <linearGradient id="bronzeLetter" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#fef08a"/>
                  <stop offset="50%" stop-color="#f59e0b"/>
                  <stop offset="100%" stop-color="#b45309"/>
                </linearGradient>
              </defs>

              <!-- Concrete Ground Foundation / Landscaped Bed -->
              <rect x="80" y="200" width="580" height="24" rx="4" fill="#94a3b8" stroke="#64748b" stroke-width="1.5"/>
              <ellipse cx="370" cy="208" rx="280" ry="6" fill="#475569" opacity="0.4"/>
              <!-- River Rock / Mulch Accents -->
              <circle cx="120" cy="208" r="4" fill="#64748b"/>
              <circle cx="140" cy="210" r="5" fill="#475569"/>
              <circle cx="610" cy="209" r="4.5" fill="#64748b"/>
              <circle cx="630" cy="211" r="5" fill="#475569"/>

              <!-- Left Steel I-Beam Post -->
              <rect x="130" y="20" width="30" height="185" fill="url(#beamSteel)" stroke="#09090b" stroke-width="1.5"/>
              <circle cx="145" cy="40" r="3" fill="#71717a"/>
              <circle cx="145" cy="180" r="3" fill="#71717a"/>

              <!-- Right Steel I-Beam Post -->
              <rect x="580" y="20" width="30" height="185" fill="url(#beamSteel)" stroke="#09090b" stroke-width="1.5"/>
              <circle cx="595" cy="40" r="3" fill="#71717a"/>
              <circle cx="595" cy="180" r="3" fill="#71717a"/>

              <!-- Heavy Timber Live-Edge Signboard -->
              <path d="M 120 40 Q 370 34 620 40 L 620 170 Q 370 176 120 170 Z" fill="url(#signWood)" stroke="#1a0802" stroke-width="3" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.35))"/>
              <!-- Timber End-Grains & Texture -->
              <line x1="120" y1="40" x2="120" y2="170" stroke="#000000" stroke-width="4"/>
              <line x1="620" y1="40" x2="620" y2="170" stroke="#000000" stroke-width="4"/>
              <path d="M 135 60 Q 370 54 605 60 M 135 150 Q 370 156 605 150" stroke="#542c13" stroke-width="1" opacity="0.4" fill="none"/>

              <!-- Dimensional Lettering: THE MILL -->
              <g transform="translate(370, 84)">
                <!-- Drop shadow for dimensional effect -->
                <text x="2" y="2" font-family="'Space Grotesk', sans-serif" font-size="34" font-weight="900" fill="#000000" text-anchor="middle" letter-spacing="4" opacity="0.6">THE MILL</text>
                <text x="0" y="0" font-family="'Space Grotesk', sans-serif" font-size="34" font-weight="900" fill="url(#bronzeLetter)" text-anchor="middle" letter-spacing="4">THE MILL</text>
              </g>

              <!-- Subtitle: Urban Wood Recovery -->
              <text x="370" y="106" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="800" fill="#fde68a" text-anchor="middle" letter-spacing="2">URBAN WOOD RECOVERY & KILN DRIED HARDWOODS</text>
              
              <!-- Endorsement Sub-Plaque -->
              <rect x="230" y="120" width="280" height="24" rx="12" fill="#163024" stroke="#4ade80" stroke-width="1.2"/>
              <g transform="translate(245, 126)">
                <path d="M 6 8 Q 9 2 15 2 Q 17 8 12 12 Q 8 15 6 8 Z" fill="#4ade80"/>
                <text x="22" y="9" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="800" fill="#ffffff">A SOCIAL ENTERPRISE OF </text>
                <text x="148" y="9" font-family="'Space Grotesk', sans-serif" font-size="10" font-weight="900" fill="#86efac" letter-spacing="1">LANDFORCE</text>
              </g>

              <!-- Facility Address -->
              <text x="370" y="160" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="600" fill="#fed7aa" text-anchor="middle">East End Pittsburgh • 10,000 Sq. Ft. Processing & Retail Yard</text>
            </svg>
          </div>

          <div class="mockup-strategic-card">
            <div class="msc-header">
              <span class="msc-title">Physical Facility Wayfinding & Community Presence:</span>
              <span class="msc-badge badge-recom">Retail Destination</span>
            </div>
            <div class="msc-grid">
              <div class="msc-col">
                <div class="msc-icon">🏢</div>
                <strong>Inviting Commercial Footprint</strong>
                <p>Prominent industrial architectural monument signage establishes The Mill as a premier destination for woodworkers, makers, and architects seeking salvaged urban timber in Pittsburgh's East End.</p>
              </div>
              <div class="msc-col">
                <div class="msc-icon">🤝</div>
                <strong>Uncompromising Endorsement</strong>
                <p>The "A Social Enterprise of Landforce" badge anchors the facility in Landforce's 501(c)(3) mission, reinforcing workforce training and environmental stewardship to every customer.</p>
              </div>
              <div class="msc-col">
                <div class="msc-icon">📍</div>
                <strong>Civic Community Pride</strong>
                <p>The facility stands as a tangible civic symbol of Pittsburgh's circular economy: transforming fallen city storm trees into valuable local lumber while employing regional workers.</p>
              </div>
            </div>
          </div>
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
  { name: 'Milestone Gate 1: Brand Architecture Approval', phase: 'milestone', start: 13, end: 13, label: 'TARGET: Jan 31', isMilestone: true },
  
  { name: 'Website Information Architecture & Wireframes', phase: 'web', start: 12, end: 15, label: 'Weeks 12–15' },
  { name: 'Directed Photography Sessions (3 Days)', phase: 'web', start: 13, end: 16, label: 'Weeks 13–16' },
  { name: 'Core Copywriting (20 Priority Pages)', phase: 'web', start: 14, end: 17, label: 'Weeks 14–17 (Feb)' },
  { name: 'Custom Block Theme CMS Development', phase: 'web', start: 15, end: 19, label: 'Weeks 15–19' },
  { name: 'Salesforce, Mailchimp & Inventory Integrations', phase: 'web', start: 17, end: 20, label: 'Weeks 17–20' },
  { name: 'WCAG 2.2 AA Accessibility & Cross-Device QA', phase: 'web', start: 19, end: 21, label: 'Weeks 19–21' },
  { name: 'Staff Training & Knowledgebase Delivery', phase: 'web', start: 20, end: 22, label: 'Weeks 20–22 (Mar)' },
  { name: 'Public Website Launch & DNS Cutover', phase: 'milestone', start: 22, end: 22, label: 'TARGET: Mar 31', isMilestone: true },
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
      if (currentFilter === 'brand') return task.phase === 'brand' || (task.isMilestone && task.start <= 13);
      if (currentFilter === 'web') return task.phase === 'web' || task.phase === 'launch' || (task.isMilestone && task.start > 13);
      return true;
    });

    const totalWeeks = 30;

    const headerHtml = `
      <div class="gantt-header-row">
        <div class="gantt-header-col-name">Deliverable / Workstream</div>
        <div class="gantt-header-col-track">
          <div class="gantt-month-grid">
            <span style="width: 13.33%">Nov '26</span>
            <span style="width: 13.33%">Dec '26</span>
            <span style="width: 16.67%">Jan '27</span>
            <span style="width: 13.33%">Feb '27</span>
            <span style="width: 16.67%">Mar '27</span>
            <span style="width: 26.67%">Apr – May '27</span>
          </div>
        </div>
        <div class="gantt-header-col-date">Scheduled Timing</div>
      </div>
    `;

    const rowsHtml = filtered.map(t => {
      const leftPct = ((t.start - 1) / totalWeeks) * 100;
      const widthPct = Math.max(((t.end - t.start + 1) / totalWeeks) * 100, t.isMilestone ? 2.5 : 4.5);
      
      let barClass = 'gantt-brand';
      let badgeClass = 'badge-brand';
      if (t.isMilestone) {
        barClass = 'gantt-milestone milestone-bar';
        badgeClass = 'badge-milestone';
      } else if (t.phase === 'web') {
        barClass = 'gantt-web';
        badgeClass = 'badge-web';
      } else if (t.phase === 'launch') {
        barClass = 'gantt-launch';
        badgeClass = 'badge-launch';
      }

      return `
        <div class="gantt-row ${t.isMilestone ? 'row-milestone' : ''}">
          <div class="gantt-task-name">${t.name}</div>
          <div class="gantt-bar-track">
            <div class="gantt-bar-fill ${barClass}" style="margin-left: ${leftPct}%; width: ${widthPct}%;" title="${t.name}: ${t.label}">
              ${widthPct >= 13 ? `<span class="gantt-bar-inner-label">${t.label}</span>` : ''}
            </div>
          </div>
          <div class="gantt-date-badge ${badgeClass}">
            ${t.label}
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = headerHtml + rowsHtml;
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
  // Retain print capability for footer button if needed
}

/* --------------------------------------------------------------------------
   9. HERO ATTACHED PDF VIEWER (Direct In-Page Landforce RFP Overview)
   -------------------------------------------------------------------------- */
function initHeroPdfViewer() {
  const frame = document.getElementById('heroPdfFrame');
  const pillsTrack = document.getElementById('heroPdfQuickPills');
  const expandBtn = document.getElementById('btnHeroPdfExpand');

  // Modal elements
  const modal = document.getElementById('heroPdfModal');
  const modalBackdrop = document.getElementById('heroPdfModalBackdrop');
  const modalCloseBtn = document.getElementById('btnHeroPdfModalClose');
  const modalFrame = document.getElementById('heroPdfModalFrame');
  const modalTitle = document.getElementById('modalDocTitle');
  const modalDownloadBtn = document.getElementById('modalDownloadBtn');

  if (!frame) return;

  const RFP_DOC = {
    file: 'Landforce_RFP_Official_Document.pdf',
    title: 'Landforce Official RFP (13 Pages)',
    pills: [
      { page: 1, label: 'Pg 1: Summary' },
      { page: 2, label: 'Pg 2: Challenge' },
      { page: 4, label: 'Pg 4: Audiences' },
      { page: 5, label: 'Pg 5: Scope' },
      { page: 9, label: 'Pg 9: Budget' },
      { page: 11, label: 'Pg 11: Criteria' },
      { page: 13, label: 'Pg 13: Pricing Form' }
    ]
  };

  function jumpToPage(page) {
    const cleanUrl = `${RFP_DOC.file}#page=${page}&view=FitH&toolbar=1`;
    frame.src = cleanUrl;

    if (modal && modal.classList.contains('open') && modalFrame) {
      modalFrame.src = cleanUrl;
    }
  }

  function renderPills() {
    if (!pillsTrack) return;
    pillsTrack.innerHTML = '';
    RFP_DOC.pills.forEach((p, idx) => {
      const btn = document.createElement('button');
      btn.className = `pdf-quick-btn ${idx === 0 ? 'active' : ''}`;
      btn.textContent = p.label;
      btn.dataset.page = p.page;
      btn.addEventListener('click', () => {
        pillsTrack.querySelectorAll('.pdf-quick-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        jumpToPage(p.page);
      });
      pillsTrack.appendChild(btn);
    });
  }

  // Fullscreen Modal Open
  expandBtn?.addEventListener('click', () => {
    if (!modal) return;
    if (modalTitle) modalTitle.textContent = `${RFP_DOC.title} — In-Page Fullscreen Overview`;
    if (modalDownloadBtn) {
      modalDownloadBtn.href = RFP_DOC.file;
      modalDownloadBtn.download = RFP_DOC.file;
    }
    if (modalFrame) {
      modalFrame.src = frame.src || `${RFP_DOC.file}#page=1&view=FitH&toolbar=1`;
    }
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalCloseBtn?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('open')) {
      closeModal();
    }
  });

  // Top navigation PDF button (#btnPrint) smooth-scrolls directly to this inline PDF viewer
  const btnPrint = document.getElementById('btnPrint');
  if (btnPrint) {
    btnPrint.addEventListener('click', (e) => {
      e.preventDefault();
      const widget = document.getElementById('heroPdfWidget');
      if (widget) {
        widget.scrollIntoView({ behavior: 'smooth', block: 'center' });
        widget.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        widget.style.transform = 'scale(1.02)';
        widget.style.boxShadow = '0 0 45px rgba(74, 222, 128, 0.45)';
        setTimeout(() => {
          widget.style.transform = '';
          widget.style.boxShadow = '';
        }, 1200);
      }
    });
  }

  // Initialize pills for Landforce RFP document
  renderPills();
}

