import os
import sys
import subprocess
import time

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Landforce | Request for Proposals</title>
  <style>
    @page {
      size: letter;
      margin: 0.6in 0.7in;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1e293b;
      line-height: 1.5;
      font-size: 11pt;
      margin: 0;
      padding: 0;
    }
    .page-header {
      display: flex;
      justify-content: flex-end;
      font-size: 8.5pt;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 1.5px solid #2e694d;
      padding-bottom: 4px;
      margin-bottom: 25px;
    }
    .page-footer {
      font-size: 8pt;
      color: #94a3b8;
      text-align: center;
      margin-top: 30px;
      padding-top: 10px;
      border-top: 1px solid #e2e8f0;
    }
    .page-break {
      page-break-after: always;
      break-after: page;
      padding-top: 10px;
    }
    .cover-title {
      font-size: 24pt;
      font-weight: 800;
      color: #1e293b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 60px;
      margin-bottom: 15px;
      text-align: center;
    }
    .cover-subtitle {
      font-size: 14pt;
      font-weight: 700;
      color: #2e694d;
      text-align: center;
      margin-bottom: 50px;
    }
    .meta-table {
      width: 100%;
      border-collapse: collapse;
      margin: 40px 0;
    }
    .meta-table td {
      padding: 10px 14px;
      border-bottom: 1px solid #e2e8f0;
    }
    .meta-table tr:nth-child(even) {
      background: #f8fafc;
    }
    .meta-table td:first-child {
      font-weight: 700;
      color: #334155;
      width: 32%;
    }
    h2 {
      font-size: 14pt;
      font-weight: 800;
      color: #1e293b;
      margin-top: 20px;
      margin-bottom: 10px;
    }
    h3 {
      font-size: 11.5pt;
      font-weight: 700;
      color: #0f172a;
      margin-top: 14px;
      margin-bottom: 6px;
    }
    p {
      margin-bottom: 10px;
      color: #334155;
    }
    ul, ol {
      margin: 8px 0 12px 20px;
      color: #334155;
    }
    li {
      margin-bottom: 5px;
    }
    table.data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 9.5pt;
      margin: 14px 0;
    }
    table.data-table th, table.data-table td {
      border: 1px solid #cbd5e1;
      padding: 7px 10px;
      text-align: left;
    }
    table.data-table th {
      background: #2e694d;
      color: #ffffff;
      font-weight: 700;
    }
    table.data-table tr:nth-child(even) {
      background: #f8fafc;
    }
    .logo-container {
      text-align: center;
      margin-top: 40px;
      margin-bottom: 30px;
    }
    .logo-container img {
      max-width: 220px;
      height: auto;
    }
    .notice-box {
      background: #f0fdf4;
      border-left: 4px solid #22c55e;
      padding: 12px 16px;
      margin: 16px 0;
      font-size: 9.5pt;
    }
  </style>
</head>
<body>

  <!-- PAGE 1 -->
  <div class="page-header">LANDFORCE | REQUEST FOR PROPOSALS</div>
  <div class="logo-container">
    <img src="assets/landforce-logo.png" alt="Landforce Logo">
  </div>
  <div class="cover-title">REQUEST FOR PROPOSALS</div>
  <div class="cover-subtitle">Strategic Landforce Program / Business Line Branding &amp; Organizational Web-Design</div>

  <table class="meta-table">
    <tr><td>RFP issued</td><td>September 8th, 2026</td></tr>
    <tr><td>Questions due</td><td>September 23rd, 2026</td></tr>
    <tr><td>Proposals due</td><td>October 7th, 2026</td></tr>
    <tr><td>Anticipated project period</td><td>November 2nd, 2026 to March 31st, 2027</td></tr>
    <tr><td>Lead consultant budget</td><td>$40,000 (for proposals in excess of this amount, please suggest a phased approach since active fundraising is ongoing.)</td></tr>
    <tr><td>Submission contact</td><td>Elijah Johnson, elijah@landforcepgh.org</td></tr>
  </table>
  <div class="page-footer">Landforce | Brand Development + Website Redesign | Page 1 •</div>
  <div class="page-break"></div>

  <!-- PAGE 2 -->
  <div class="page-header">LANDFORCE | REQUEST FOR PROPOSALS</div>
  <h2>1. Invitation and Project Summary</h2>
  <p>Landforce invites proposals from qualified branding and website strategy, design, and development firms or consultant teams to lead a multi-phase, organization-wide brand development and website redesign process.</p>
  <p>Landforce is an employment social enterprise nonprofit that connects workforce development with environmental work. Through paid training and transitional employment, participants build skills and experience while working within our two social enterprises: Land Stewardship and Responsible Wood Production.</p>
  <p>The first phase of this project will help us clarify how Workforce Development, Land Stewardship, and Responsible Wood Production fit together within the Landforce identity. Building upon our existing brand, the selected partner will help us determine how each part should be described, imaged, whether the parts need to be renamed, and whether (and how) any of this impacts our social channels. Once these decisions are made, this phase will include developing any naming, visual identity systems, and priority physical collateral, including signage and sales-related visuals, needed to put that brand architecture into practice.</p>
  <p>Once that work is complete, the project will move into an organization-wide website redesign. The new website must clearly communicate how Landforce's different parts connect while allowing our varied audiences to quickly find the information they need and take action.</p>

  <h3>The Central Challenge</h3>
  <p>Landforce's work is deeply interconnected, but it is not always easy to communicate as a coherent whole. Workforce Development is central to everything we do, while Land Stewardship and Responsible Wood Production provide distinct forms of paid transitional employment, environmental impact, services, and earned revenue. Each part has its own audiences, activities, and communications needs, yet all three are expressions of the same Landforce mission. The central branding challenge is to make these relationships clear: determining what should remain unified, what may benefit from a re-envisioned name or visual expression, and how the individual parts can be distinguished while, crucially, maintaining a unified identity.</p>
  <p>The website must translate brand architecture into a clear and intuitive experience for people arriving with very different goals. A prospective Crew Member or referral partner should be able to understand Landforce's employment opportunities and how to apply. A customer should be able to purchase lumber, inquire about biochar or ground crew services, or donate logs. A municipality, public agency, nonprofit, or private client should be able to understand and request Land Stewardship services. Employers, donors, funders, and community or corporate partners should each be able to quickly find relevant information and take action.</p>
  <div class="page-footer">Landforce | Brand Development + Website Redesign | Page 2 •</div>
  <div class="page-break"></div>

  <!-- PAGE 3 -->
  <div class="page-header">LANDFORCE | REQUEST FOR PROPOSALS</div>
  <h2>2. About Landforce</h2>
  <p><strong>Vision:</strong> Landforce is committed to building a just world, where everyone belongs, lives in a healthy environment and surpasses their greatest dreams.</p>
  <p><strong>Mission:</strong> We nourish a culture of self-empowerment for people aspiring towards meaningful and stable employment as we protect and improve the environment.</p>

  <h3>Values and communications approach</h3>
  <p>Landforce believes in a just and equitable world where our environment and all people are respected and nurtured. Our communications should be people-first, strengths-based, respectful, and clear. Crew members are not problems to be solved, but individuals who are working to forge their own paths. Landforce provides paid opportunities, connections, skills, resources, coaching, and a bridge to meaningful employment.</p>

  <h3>Our model</h3>
  <p>Landforce provides training, workforce development and paid transitional employment for people who have historically been excluded from stable, family-sustaining employment. The organization now operates through two connected business lines where workforce readiness skills can be practiced in reality:</p>
  <ul>
    <li><strong>Land Stewardship:</strong> crews complete environmental work that improves public spaces and communities, including habitat restoration / invasive plant maintenance, tree planting and care, trail construction and maintenance, green stormwater infrastructure maintenance, vacant lot improvements, and basic carpentry.</li>
    <li><strong>Responsible Wood Production (RWP):</strong> Landforce gives fallen and salvaged urban trees a second life through lumber and, as this work develops, biochar, ground crew services, carpentry or related products and services.</li>
  </ul>
  <p>Since 2016, Landforce has trained more than 220 people, employed more than 160 people on projects, and completed work in 83 neighborhoods with 55 partners. Participants have completed more than 91,000 hours of stewardship work and more than 34,000 hours of training.</p>
  <div class="page-footer">Landforce | Brand Development + Website Redesign | Page 3 •</div>
  <div class="page-break"></div>

  <!-- PAGE 4 -->
  <div class="page-header">LANDFORCE | REQUEST FOR PROPOSALS</div>
  <h2>3. Audiences, Needs, and Priority Actions</h2>
  <table class="data-table">
    <thead>
      <tr><th>Area</th><th>Audience / User</th><th>Likely Need or Action</th></tr>
    </thead>
    <tbody>
      <tr><td>Workforce Development</td><td>Prospective Crew Members</td><td>Understand paid training and employment, eligibility, certifications, supports, timing, and how to apply.</td></tr>
      <tr><td>Workforce Development</td><td>Referral and workforce partners</td><td>Understand program fit, pathways, referral timing and process, and whom to contact.</td></tr>
      <tr><td>Workforce Development</td><td>Employers</td><td>Understand participant preparation and how to recruit, provide career exposure, or partner with Landforce.</td></tr>
      <tr><td>Land Stewardship</td><td>Current and prospective clients</td><td>Understand capabilities, experience, project types, service area, and how to request or continue work.</td></tr>
      <tr><td>Land Stewardship</td><td>Public, nonprofit, community partners</td><td>View project outcomes and explore opportunities to plan, implement, or expand environmental work.</td></tr>
      <tr><td>Responsible Wood Production</td><td>Log suppliers and partners</td><td>Understand accepted material, delivery or collection, and how to donate logs or establish a supply relationship.</td></tr>
      <tr><td>Responsible Wood Production</td><td>Customers and service clients</td><td>Find lumber, biochar, ground crew, and other product or service info; inquire, quote, reserve, or purchase.</td></tr>
      <tr><td>Organization-wide</td><td>Donors, funders, public partners</td><td>Understand Landforce's integrated model, results, needs, and opportunities for investment.</td></tr>
    </tbody>
  </table>

  <h2>4. Project Goals and Measures of Success</h2>
  <ol>
    <li>Clarify how Workforce Development, Land Stewardship, and Responsible Wood Production work together within one coherent Landforce story.</li>
    <li>Establish and document an organization-wide brand architecture, including any naming, messaging, visual identity, and degree of differentiation.</li>
    <li>Translate the approved architecture into practical, maintainable collateral, including uniforms, signage, product displays, vehicle decals, and sustainable social media.</li>
    <li>Create intuitive website pathways and calls to action for Landforce's varied audiences without requiring users to understand its internal structure.</li>
    <li>Deliver an accessible, secure, mobile-responsive, and staff-maintainable website targeting WCAG 2.2 AA.</li>
    <li>Present Landforce's workforce and environmental outcomes credibly and establish analytics for applications, inquiries, engagement, sales, and donations.</li>
  </ol>
  <div class="page-footer">Landforce | Brand Development + Website Redesign | Page 4 •</div>
  <div class="page-break"></div>

  <!-- PAGE 5 -->
  <div class="page-header">LANDFORCE | REQUEST FOR PROPOSALS</div>
  <h2>5. Scope of Work (Phases &amp; Workstreams)</h2>
  <h3>A. Discovery, Research, and Alignment</h3>
  <ul>
    <li>Kickoff and review organizational, programmatic, brand, communications, web, and analytics materials.</li>
    <li>Stakeholder engagement with leadership, staff, Crew Members, alumni, board, and external partners.</li>
    <li>Audits of current brand, current website, social media, and competitive landscape.</li>
  </ul>

  <h3>B. Organization-Wide Brand Strategy and Architecture</h3>
  <p>The selected partner must help Landforce determine how Workforce Development, Land Stewardship, and Responsible Wood Production should be understood and represented within the larger Landforce identity:</p>
  <ul>
    <li><strong>A unified Landforce brand:</strong> All parts operate under the Landforce name and visual identity.</li>
    <li><strong>A differentiated or endorsed system:</strong> Parts receive distinct descriptors or sub-brands while remaining visibly endorsed by Landforce.</li>
    <li><strong>A hybrid architecture:</strong> Different levels of distinction based on history, audiences, and functions (e.g. The Mill retail identity endorsed by Landforce).</li>
  </ul>
  <div class="notice-box">
    <strong>Client Preference:</strong> Landforce is not seeking three separate brands simply for the sake of differentiation. The partner should recommend the degree of distinction that improves understanding without fragmenting the organization.
  </div>
  <div class="page-footer">Landforce | Brand Development + Website Redesign | Page 5 •</div>
  <div class="page-break"></div>

  <!-- PAGE 6 -->
  <div class="page-header">LANDFORCE | REQUEST FOR PROPOSALS</div>
  <h3>C. Brand Applications, Collateral, and Social Media</h3>
  <p>Translate the approved brand architecture into practical, production-ready deliverables:</p>
  <ul>
    <li>Organization-wide presentation and report templates, signage, uniforms, gear, and vehicle decals.</li>
    <li>Workforce recruitment collateral, explaining training, certifications, coaching, and outcomes.</li>
    <li>Land Stewardship qualifications, project sheets, case studies, and job-site signage.</li>
    <li>RWP Mill signage, product labels, lumber tags, biochar packaging, and marketing materials.</li>
    <li>Social media channel recommendations, content conventions, cross-promotion, and reusable templates.</li>
  </ul>

  <h3>D. Website Strategy and Information Architecture</h3>
  <ul>
    <li>Recommend how the three divisions are organized and presented within landforcepgh.org.</li>
    <li>Content inventory, user-centered sitemap, wireframes, and prototypes for key page types.</li>
    <li>User journeys for priority audiences ensuring 3 clicks or fewer to action.</li>
  </ul>
  <div class="page-footer">Landforce | Brand Development + Website Redesign | Page 6 •</div>
  <div class="page-break"></div>

  <!-- PAGE 7 -->
  <div class="page-header">LANDFORCE | REQUEST FOR PROPOSALS</div>
  <h3>E. Content Strategy, Writing, Photography, and Migration</h3>
  <ul>
    <li>Website content strategy grounded in strengths-based, dignity-centered voice.</li>
    <li>Write, edit, or substantially rewrite priority pages.</li>
    <li>Professional photography plan for crew members, training, stewardship sites, The Mill, and products.</li>
    <li>Content migration including metadata, internal/external links, redirects, and accessible alt-text.</li>
  </ul>

  <h3>F. Visual and Interaction Design</h3>
  <ul>
    <li>Cohesive organization-wide digital design system based on the approved brand architecture.</li>
    <li>Responsive page templates and reusable components for priority content and transactions.</li>
  </ul>
  <div class="page-footer">Landforce | Brand Development + Website Redesign | Page 7 •</div>
  <div class="page-break"></div>

  <!-- PAGE 8 -->
  <div class="page-header">LANDFORCE | REQUEST FOR PROPOSALS</div>
  <h3>G. Website Development and Functional Requirements</h3>
  <ul>
    <li>Responsive, staff-manageable CMS targeting WCAG 2.2 Level AA accessibility standards.</li>
    <li>Secure routed forms for crew applications, referrals, municipal RFQs, donations, and sales inquiries.</li>
    <li>Integration with Salesforce CRM and Mailchimp.</li>
    <li>Impact dashboard presenting workforce outcomes and RWP carbon-retention measures.</li>
    <li>SEO strategy for national visibility and local discoverability in Pittsburgh.</li>
  </ul>

  <h3>H. Testing, Launch, Training, and Support</h3>
  <ul>
    <li>Cross-browser quality assurance, usability testing, and accessibility verification.</li>
    <li>Content migration and DNS launch procedures with rollback monitoring.</li>
    <li>Role-based staff training sessions and comprehensive video documentation.</li>
    <li>Warranty period and ongoing maintenance options.</li>
  </ul>
  <div class="page-footer">Landforce | Brand Development + Website Redesign | Page 8 •</div>
  <div class="page-break"></div>

  <!-- PAGE 9 -->
  <div class="page-header">LANDFORCE | REQUEST FOR PROPOSALS</div>
  <h2>6. Project Approach and Collaboration</h2>
  <p>Landforce seeks a collaborative partner that can guide decisions, explain tradeoffs plainly, and conduct a rigorous process without placing an unrealistic burden on staff.</p>

  <h2>7. Budget and Schedule</h2>
  <p><strong>Available Budget:</strong> Landforce currently has <strong>$40,000</strong> available for this engagement. Respondents should propose the strongest integrated base scope that can be completed within that budget while establishing a coherent foundation for future work.</p>
  <p>Recommended enhancements that exceed the base budget (advanced ecommerce, extra video, expanded collateral) should be separately priced as phased add-ons.</p>
  <div class="page-footer">Landforce | Brand Development + Website Redesign | Page 9 •</div>
  <div class="page-break"></div>

  <!-- PAGE 10 -->
  <div class="page-header">LANDFORCE | REQUEST FOR PROPOSALS</div>
  <h2>8. Qualifications</h2>
  <ul>
    <li>Experience leading organization-wide brand architecture, naming, and messaging across interconnected social enterprises.</li>
    <li>Ability to translate strategy into practical physical, digital, and retail applications.</li>
    <li>Track record in accessible, complex, multi-audience web design and CMS development.</li>
    <li>People-first, strengths-based, and equity-centered communication philosophy.</li>
  </ul>

  <h2>9. Proposal Requirements (Required Structure)</h2>
  <ol>
    <li>Understanding of Landforce's integrated model and central challenges.</li>
    <li>Recommended approach to brand architecture, website, content, and photography.</li>
    <li>Preliminary work plan showing phases, milestones, schedule, and staff requirements.</li>
    <li>Three relevant case studies and client references.</li>
    <li>Itemized pricing by phase and deliverable, payment schedule, and allowances.</li>
    <li>Technology and operational approach (CMS, hosting, accessibility, security).</li>
    <li>Photography and social media approach.</li>
    <li>Landforce responsibilities and conflict of interest disclosure.</li>
  </ol>

  <div class="notice-box">
    <strong>Grant Compliance Note:</strong> This project is funded in whole or in part by the Pennsylvania Department of Conservation and Natural Resources (DCNR) Bureau of Recreation and Conservation through the Inflation Reduction Act Community Conservation Partnership Program.
  </div>
  <div class="page-footer">Landforce | Brand Development + Website Redesign | Page 10 •</div>
  <div class="page-break"></div>

  <!-- PAGE 11 -->
  <div class="page-header">LANDFORCE | REQUEST FOR PROPOSALS</div>
  <h2>10. Evaluation and Selection Criteria</h2>
  <table class="data-table">
    <thead>
      <tr><th>Criterion</th><th>Weight</th></tr>
    </thead>
    <tbody>
      <tr><td>Understanding of Landforce's integrated model and strategic challenges</td><td>15%</td></tr>
      <tr><td>Strength of brand architecture, naming, applications, and social approach</td><td>20%</td></tr>
      <tr><td>Strength of website strategy, content, design, technology, and launch</td><td>20%</td></tr>
      <tr><td>Relevant experience, quality of comparable work, and team capabilities</td><td>15%</td></tr>
      <tr><td>People-first, equitable, accessible, and participatory approach</td><td>10%</td></tr>
      <tr><td>Project management, capacity, schedule, collaboration, and risk management</td><td>10%</td></tr>
      <tr><td>Budget clarity, feasibility, and overall value</td><td>10%</td></tr>
      <tr style="font-weight: 800; background: #e2e8f0;"><td>Total</td><td>100%</td></tr>
    </tbody>
  </table>

  <h2>11. Procurement Schedule &amp; Deadlines</h2>
  <table class="data-table">
    <thead>
      <tr><th>Milestone</th><th>Date</th></tr>
    </thead>
    <tbody>
      <tr><td>RFP issued</td><td>September 8th, 2026</td></tr>
      <tr><td>Deadline for written questions</td><td>September 23rd, 2026</td></tr>
      <tr><td>Responses to questions distributed</td><td>September 30th, 2026</td></tr>
      <tr><td>Proposals due</td><td>October 7th, 2026</td></tr>
      <tr><td>Initial proposal review</td><td>October 7th to 20th, 2026</td></tr>
      <tr><td>Finalist interviews</td><td>October 23rd and October 26th, 2026</td></tr>
      <tr><td>Notice of selection</td><td>October 30th, 2026</td></tr>
      <tr><td>Anticipated kickoff</td><td>November 1st, 2026</td></tr>
      <tr><td>Target completion of brand-development phase</td><td>January 31, 2027</td></tr>
      <tr><td>Target website launch</td><td>March 31, 2027</td></tr>
    </tbody>
  </table>
  <div class="page-footer">Landforce | Brand Development + Website Redesign | Page 11 •</div>
  <div class="page-break"></div>

  <!-- PAGE 12 -->
  <div class="page-header">LANDFORCE | REQUEST FOR PROPOSALS</div>
  <h2>12. Submission Instructions and Contact</h2>
  <p>Proposals must be submitted electronically to:</p>
  <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; margin: 15px 0;">
    <strong>Elijah Johnson</strong><br>
    Communications Manager, Landforce<br>
    Email: <a href="mailto:elijah@landforcepgh.org">elijah@landforcepgh.org</a><br>
    Proposal deadline: <strong>October 7th, 2026 at 11:59 pm Eastern Time</strong><br>
    Subject line: <em>Landforce Brand and Website RFP Proposal – [RESPONDENT NAME]</em>
  </div>
  <p>Proposals should be submitted as a single PDF unless otherwise approved in advance. Respondents are responsible for confirming successful delivery.</p>
  <div class="page-footer">Landforce | Brand Development + Website Redesign | Page 12 •</div>
  <div class="page-break"></div>

  <!-- PAGE 13 -->
  <div class="page-header">LANDFORCE | REQUEST FOR PROPOSALS</div>
  <h2>Appendix A. Vendor Pricing Schedule Format</h2>
  <p>We would appreciate respondents following the format below so that Landforce can compare costs across proposals. Add rows or explanatory notes where necessary.</p>
  <table class="data-table">
    <thead>
      <tr><th>Cost Category</th><th>Base Fee</th><th>Optional / Allowance</th><th>Recurring Cost</th></tr>
    </thead>
    <tbody>
      <tr><td>Discovery, research, and stakeholder engagement</td><td>$</td><td>$</td><td>$</td></tr>
      <tr><td>Brand architecture, naming, identity, and brand guide</td><td>$</td><td>$</td><td>$</td></tr>
      <tr><td>Collateral, physical applications, and social media</td><td>$</td><td>$</td><td>$</td></tr>
      <tr><td>Website strategy, content, migration, and photography</td><td>$</td><td>$</td><td>$</td></tr>
      <tr><td>Website design, development, and CMS</td><td>$</td><td>$</td><td>$</td></tr>
      <tr><td>Forms, integrations, impact dashboard, RWP commerce</td><td>$</td><td>$</td><td>$</td></tr>
      <tr><td>Testing, launch, training, and documentation</td><td>$</td><td>$</td><td>$</td></tr>
      <tr><td>Hosting, licenses, maintenance, and post-launch support</td><td>$</td><td>$</td><td>$</td></tr>
      <tr><td>Travel, incentives, fabrication, installation, other</td><td>$</td><td>$</td><td>$</td></tr>
      <tr style="font-weight: 800; background: #e2e8f0;"><td>Total</td><td>$</td><td>$</td><td>$</td></tr>
    </tbody>
  </table>
  <div class="page-footer">Landforce | Brand Development + Website Redesign | Page 13 •</div>

</body>
</html>
"""

with open("Landforce_RFP_Official_Document.html", "w", encoding="utf-8") as f:
    f.write(html_content)

print("HTML written, converting to PDF...")
browser = None
candidates = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"
]
for p in candidates:
    if os.path.exists(p):
        browser = p
        break

if not browser:
    print("No Chrome/Edge browser found")
    sys.exit(1)

html_path = os.path.abspath("Landforce_RFP_Official_Document.html")
pdf_path = os.path.abspath("Landforce_RFP_Official_Document.pdf")

cmd = [
    browser,
    "--headless=new",
    "--no-pdf-header-footer",
    f"--print-to-pdf={pdf_path}",
    f"file:///{html_path}"
]

subprocess.run(cmd, check=True)
print("Landforce_RFP_Official_Document.pdf successfully generated! Size:", os.path.getsize(pdf_path))
