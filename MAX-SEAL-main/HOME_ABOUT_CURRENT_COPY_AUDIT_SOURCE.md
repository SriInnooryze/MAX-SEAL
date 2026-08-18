# Home + About Current Copy Audit Source

Extraction only. Nothing in this document has been rewritten, improved, or altered from what currently exists in the codebase. Copy is quoted exactly as written in source, including capitalization and punctuation. This is a review source, not a marketing document.

Scope: Home page, About page, shared CTA copy that appears on either page, and Header/Footer text (kept in its own section at the end since it is site-wide, not page-specific).

---

## PART 1 — HOME PAGE

Page file: `src/pages/Home.jsx`. All Home sections are defined as local components inside this one file — Home does not import separate section components from elsewhere.

### 1.1 Video Hero

- **Page:** Home
- **Section:** Hero (`VideoHero`)
- **Component/file:** `src/pages/Home.jsx` (function `VideoHero`)
- **Copy:**
  - Eyebrow: `ENGINEERED FOR PERFORMANCE. BUILT FOR INDUSTRY.`
  - Title (h1): `Engineered Butterfly Valves. Built for Performance.`
  - Lead: `Max-Seal designs and manufactures high-quality butterfly valves and valve automation solutions for critical industrial applications. From standard service to severe-duty requirements, our engineered solutions deliver reliable performance, durability, and precise control.`
- **CTAs:**
  - Primary: `Explore Products` → `routes.products()` (`/products`)
  - Secondary: `Request a Quote` → `routes.enquiry({ intent: 'pricing' })`
  - Text link: `Ask a technical question` → `routes.enquiry({ intent: 'technical' })`
- **Notes:** Hardcoded in component, not sourced from a data file.

### 1.2 Product Preview ("What We Engineer")

- **Page:** Home
- **Section:** Product carousel (`ProductPreview`)
- **Component/file:** `src/pages/Home.jsx` (function `ProductPreview`) + `src/data/data.js` (`PRODUCT_STORIES`)
- **Section head copy:**
  - Eyebrow: `What We Engineer`
  - Heading (h2): `Flow control built around the conditions that matter`
  - Lead: `From everyday isolation duties to demanding process environments, Max-Seal combines valve design, automation, materials, and engineering expertise to deliver reliable flow-control solutions engineered for each application.`
- **Per-tile copy (from `PRODUCT_STORIES`, 7 items, each rendered as a tile with center-tile overlay):**
  1. `reliable-isolation` — title: `Reliable isolation`; teaser (shown in overlay): `Dependable shutoff for systems that run the same way every time. Resilient seated and high performance valves handle repeatable isolation, with automated packages where duties cycle often.`
  2. `performance-pressure` — title: `Performance under pressure`; teaser: `Some duties ask more than everyday service. High performance and triple offset designs are configured for demanding pressure and temperature, with seat and trim matched to the application.`
  3. `corrosive-service` — title: `Corrosive service`; teaser: `When media is aggressive, material choice decides valve life. PFA lined and special alloy constructions protect wetted parts, guided by the chemistry of your process.`
  4. `automated-control` — title: `Automated control`; teaser: `Control systems need valves that respond predictably. Max-Seal prepares valve and actuator packages around control, response and operating needs, with accessories suited to the duty.`
  5. `application-specific` — title: `Application-specific solutions`; teaser: `Not every requirement fits a standard configuration. Customized solutions are engineered to order with practical input, working from your application to the valve.`
  6. `engineered-support` — title: `Engineered support`; teaser: `Choosing the right valve is easier with engineering alongside it. We help match series, seat and trim to your service condition, from selection through configuration.`
  - (Note: `PRODUCT_STORIES` has a 7th field set — `line`/`story`/`app` — defined per item in `data.js` but only `title` and `teaser` are rendered by `ProductPreview`; `line`/`story`/`app` are unused by this component currently.)
- **Overlay CTA (per tile, via shared `TeaserActions`):**
  - `Explore Solutions` → `routes.products({ story: <id> })`
  - `Request a Quote` → `routes.enquiry({ intent: 'pricing' })`
  - `Ask a technical question` → `routes.enquiry({ intent: 'technical' })`
- **Notes:** Story titles/teasers sourced from `src/data/data.js` → `PRODUCT_STORIES`. Tile label above the title uses the product family name via `famShort()`, resolved from `FAMILIES`.

### 1.3 Industry Preview ("Where We Perform")

- **Page:** Home
- **Section:** Industry selector (`IndustryPreview`)
- **Component/file:** `src/pages/Home.jsx` (function `IndustryPreview`) + `src/data/data.js` (`INDUSTRY_STORIES`)
- **Section head copy:**
  - Eyebrow: `Where We Perform`
  - Heading (h2): `Engineered for the industries that depend on reliable flow control`
  - Lead: `Every industry brings different pressures, media, safety requirements, and operating conditions. Max-Seal provides dependable valve and automation solutions engineered to perform across demanding industrial environments.`
- **Per-story copy (from `INDUSTRY_STORIES`, 6 items — list item shows title + `line`; overlay shows title + `teaser` + sector/family tags):**
  1. `critical-infrastructure` — title: `Critical infrastructure`; line: `Flow control for sites that cannot afford downtime.`; teaser: `Critical facilities depend on cooling and water systems that cannot stop. Dependable isolation keeps these environments running around the clock, with automated packages supporting steady control.`; sectors: `Data centers, HVAC`
  2. `energy-refining` — title: `Energy and refining`; line: `Reliable valve solutions for demanding energy and refining applications.`; teaser: `Energy and refining work across a wide range of pressures and temperatures. Robust isolation and control are matched to each service condition for dependable performance.`; sectors: `Oil and gas, Refining, Power`
  3. `process-industries` — title: `Process industries`; line: `Engineered for demanding process and refining environments.`; teaser: `Process plants handle aggressive media and frequent cycling. Material and sealing choices are matched to the chemistry of each process, with lined and alloy options protecting wetted parts.`; sectors: `Petrochemical, Chemical processing, Pulp and paper`
  4. `food-life-sciences` — title: `Food and life sciences`; line: `Reliable flow control for food, beverage, pharmaceutical, and life science applications.`; teaser: `Production environments place careful demands on material selection and cleanliness. Valve choices support consistent, safe operation, matched to the needs of each process.`; sectors: `Food and beverage, Pharmaceuticals`
  5. `marine-transportation` — title: `Marine and transportation`; line: `Durable solutions for demanding marine and transportation systems.`; teaser: `Marine and transport systems face corrosion, vibration and heavy service. Corrosion aware materials and rugged construction are matched to the duty, with practical maintenance in mind.`; sectors: `Marine, Transportation, Mining`
  6. `industrial-automation` — title: `Industrial automation`; line: `Precision valve and automation solutions for integrated industrial systems.`; teaser: `Automated operations need flow control that integrates cleanly. Valve and actuator packages are prepared around control and response for reliable, repeatable operation.`; sectors: `Manufacturing, Automated systems`
  - (Note: `story` field also exists per item in `data.js` but is not rendered by `IndustryPreview`; only `title`, `line`, and `teaser` are shown.)
- **Overlay labels:** `Industries` (tag group label), `Related products` (tag group label), `Explore` (default-state cue)
- **Overlay CTA (via shared `TeaserActions`):**
  - `Explore Industries` → `routes.industries({ industry: <id> })`
  - `Request a Quote` → `routes.enquiry({ intent: 'pricing' })`
  - `Ask a technical question` → `routes.enquiry({ intent: 'technical' })`
- **Notes:** Sourced from `src/data/data.js` → `INDUSTRY_STORIES`.

### 1.4 Why Max-Seal

- **Page:** Home
- **Section:** `WhyMaxSeal`
- **Component/file:** `src/pages/Home.jsx` (function `WhyMaxSeal`) + `src/data/data.js` (`WHY`)
- **Copy:**
  - Image tag strip: `SINCE 2008`, `UNITED STATES`
  - Eyebrow: `WHY MAX-SEAL`
  - Heading (h2): `Engineering support behind every valve`
  - Intro: `From product selection to application requirements, Max-Seal combines valve expertise, engineering support, and responsive service to help customers find the right flow-control solution.`
  - Three points (from `WHY` in `data.js`, numbered 01–03):
    1. `ENGINEERING` — **Engineered for demanding applications** — `Custom valve designs, special materials, and engineering support for complex piping configurations and severe service conditions.`
    2. `EXPERTISE` — **Practical valve engineering support** — `Experienced valve professionals help customers select the right valve, materials, actuator, and configuration for their application.`
    3. `SERVICE` — **Responsive supply and support** — `A broad product inventory, automation capabilities, and technical sales support help keep projects moving from selection through delivery.`
  - Closing line: `A US-based valve manufacturer and supplier serving distributors and industrial customers with engineered flow-control solutions.`
- **CTA:** `More about Max-Seal` → `routes.about` (`/about`)
- **Notes:** The three points are sourced from `src/data/data.js` → `WHY`; everything else in this section is hardcoded directly in `WhyMaxSeal`.

### 1.5 Proof Story

- **Page:** Home
- **Section:** `ProofStory`
- **Component/file:** `src/pages/Home.jsx` (function `ProofStory`) + `src/data/data.js` (`PROOF`)
- **Copy:**
  - Eyebrow: `Proof`
  - Heading (h2): `Engineered solutions for demanding applications`
  - Card badge/type: `Project story`
  - Card tags: `Project story`, `Data Centers`, `Data Center Cooling Partner`
  - Card title: `Data Center Cooling Loop Valve Solution`
  - Card summary: `High-availability butterfly valve packages engineered for critical data center cooling loops, ensuring 100% uptime and bubble-tight isolation.`
  - Detail rows:
    - `Challenge` — `Maintain continuous cooling loop circulation with reliable isolation under strict uptime requirements.`
    - `Max-Seal support` — `Supplied high performance and resilient seated automated valve assemblies.`
    - `Outcome` — `Zero downtime and dependable automated flow control across primary cooling circuits.`
- **Notes:** Entirely sourced from `src/data/data.js` → `PROOF`. The source comment above `PROOF` in `data.js` reads: *"Featured proof story — clearly labelled placeholder until CMS content is approved."* No CTA in this section.

### 1.6 Resources Preview

- **Page:** Home
- **Section:** `ResourcesPreview`
- **Component/file:** `src/pages/Home.jsx` (function `ResourcesPreview`) + `src/data/data.js` (`RESOURCE_LIBS`)
- **Copy:**
  - Eyebrow: `Documents and Resources`
  - Heading (h2): `Catalog and marketing resources`
  - Header CTA: `All resources` → `routes.resources`
  - Catalog card: eyebrow `CATALOG`; title from data — `Resilient Seated Butterfly Valves — Performance Series`; spec labels `Family` / `Pages` with values from data (`Performance Series` / `4 pages`); actions `Preview` (opens catalog PDF in new tab) and `View Catalog` → `routes.catalog({ catalog: 'resilient-seated' })`
  - Global Partners card: eyebrow `Global Distribution Network`; title: `Built on strong global partnerships`; body: `Our global partnerships help Max-Seal deliver dependable valve solutions, technical support, and responsive service to customers across markets.`; action: `Explore Our Global Partners` → `routes.partners` (`/partners`)
- **Notes:** Catalog card fields (`latest`, `family`, `pages`, `fileType`) sourced from `src/data/data.js` → `RESOURCE_LIBS` (id `catalog`). The Global Partners card's title/body/CTA are hardcoded directly in `ResourcesPreview`, not pulled from `RESOURCE_LIBS`.

### 1.7 Company Story Preview

- **Page:** Home
- **Section:** `CompanyStoryPreview`
- **Component/file:** `src/pages/Home.jsx` (function `CompanyStoryPreview`)
- **Copy:**
  - Eyebrow: `About Our Team`
  - Heading (h2): `Leading Manufacturer of High-Performance Butterfly Valves`
  - Story paragraph: `Max-Seal is a leading manufacturer of high-performance butterfly valves, recognized for engineered valve solutions, fast turnaround times, customization capabilities, and reliable manual and automated valve products serving customers worldwide.`
  - Fact strip: `2008` / `Established`, `US` / `Based supplier`, `Worldwide` / `Distributor support`
  - Cue line: `Valve industry experience, with full technical information available online.`
- **CTA:** `Read the Full Story` → `routes.about`
- **Notes:** Hardcoded directly in the component, not sourced from a data file. **Flag for review:** this section's heading/story language ("leading manufacturer," "recognized for... fast turnaround times, customization capabilities") reads differently in tone and claim-strength from the rest of the site's copy (which generally avoids superlative claims) — worth checking against the same content-approval standard applied elsewhere.

### 1.8 Home Conversion CTA

- **Page:** Home
- **Section:** `Conversion` (final CTA before footer)
- **Component/file:** `src/pages/Home.jsx` (function `Conversion`)
- **Copy:**
  - Eyebrow: `Let's Talk`
  - Heading (h2): `Ready to discuss your valve requirement?`
  - Lead: `Share your application and our team will help you specify with confidence.`
- **CTAs:**
  - Primary: `Request a Quote` → `routes.enquiry({ intent: 'pricing' })`
  - Text link: `Ask a technical question` → `routes.enquiry({ intent: 'technical' })`
  - Text link: `General contact` → `routes.contact`
- **Notes:** See "Shared CTA Pattern" note below — this section and About's `ClosingCTA` both use the same `.convert` CSS pattern but have different copy and different link sets (Home has 3 CTAs incl. a lead paragraph; About has 2 CTAs, no lead paragraph).

---

## PART 2 — ABOUT PAGE

Page file: `src/pages/About.jsx`, which composes 9 section components from `src/components/about/`.

### 2.1 About Hero

- **Page:** About
- **Section:** Hero (`AboutHero`)
- **Component/file:** `src/components/about/AboutHero.jsx` (uses shared `src/components/PageHero.jsx`)
- **Copy:**
  - Kicker: `About Max-Seal`
  - Breadcrumb: `Home` / `About`
  - Title (h1): `Engineered butterfly valves for demanding industrial applications`
  - Lead: `Since 2008, Max-Seal has manufactured and supplied manual and automated butterfly valve solutions for distributors, OEMs and industrial customers across demanding process applications.`
- **CTAs:**
  - Primary: `Request a Quote` → `routes.enquiry({ intent: 'pricing' })`
  - Secondary: `Ask the Engineers` → `routes.enquiry({ intent: 'technical' })`
- **Notes:** Hardcoded in component. Hero media caption/placeholder text: `Max-Seal Team`.

### 2.2 Who We Are (Company Intro)

- **Page:** About
- **Section:** `CompanyIntro`, `id="who-we-are"` (About submenu anchor target)
- **Component/file:** `src/components/about/CompanyIntro.jsx`
- **Copy:**
  - Kicker: `WHO WE ARE`
  - Heading (h2): `A focused butterfly valve company with practical application support`
  - Lead paragraph: `Max-Seal Inc. was established in 2008 to manufacture and supply industrial butterfly valves for distributors and industrial customers. From facilities in Lumberton, North Carolina and Houston, Texas, the company supports manual and automated process valve requirements across a wide range of applications.`
  - Supporting paragraph: `Sales offices in Argentina, Chile and Mexico, together with partner relationships in key locations, help extend support beyond the United States.`
  - Proof card: `Established` / `2008` / `United States`
- **Notes:** Hardcoded in component, not sourced from a data file (values match `COMPANY` in `src/data/data.js` but are not pulled from it programmatically). No CTA in this section.

### 2.3 How the Company Grew (Timeline)

- **Page:** About
- **Section:** `HistoryTimeline`, `id="how-we-grew"` (About submenu anchor target)
- **Component/file:** `src/components/about/HistoryTimeline.jsx` + `src/components/about/TimelineItem.jsx` + `src/data/aboutData.js` (`ABOUT_TIMELINE`)
- **Section head copy:**
  - Kicker: `How the company grew`
  - Heading (h2): `From a focused start to worldwide supply`
- **Six milestones (from `ABOUT_TIMELINE` in `aboutData.js` — each has period/label, title, description, and an image alt text):**
  1. **2008** — *A dedicated valve company is founded* — `Max-Seal Inc. was established to design, manufacture and supply industrial butterfly valves for distributors and industrial customers.` (image alt: `Max-Seal team at the company's founding`)
  2. **Leadership** — *Decades of valve experience at the helm* — `President Martin Gibbons leads the company with 35+ years of valve industry experience, shaping how Max-Seal selects, configures and supports every valve.` (image alt: `Engineering leadership discussion around butterfly valve application support`)
  3. **United States** — *Manufacturing and supply in North Carolina and Texas* — `Operations are anchored by facilities in Lumberton, North Carolina and Houston, Texas, supporting both manual and automated process valve solutions.` (image alt: `United States industrial operations and valve supply facility`)
  4. **Latin America** — *Regional sales offices across the region* — `Sales offices in Argentina, Chile and Mexico bring local support to distributors and industrial teams across Latin America.` (image alt: `Latin America regional sales and distribution network`)
  5. **Worldwide** — *A growing distributor network* — `Distributor relationships across the United States and other regions extend Max-Seal supply and support to industrial customers worldwide.` (image alt: `Worldwide distributor network and global industrial supply routes`)
  6. **Today** — *Engineered solutions, supplied with support* — `Max-Seal continues to supply manual and automated butterfly valves, with customized solutions and practical engineering support for demanding applications.` (image alt: `Engineering workstation with valve CAD review and application support materials`)
- **Progress indicator copy (mobile sticky stage only):** `{n} / 6` (e.g. `1 / 6`)
- **Notes:** All six milestones sourced from `src/data/aboutData.js` → `ABOUT_TIMELINE`. Each milestone also has an unused `mediaPh` fallback caption (`"Early company or facility photo"`, etc.) that only renders if a milestone's image asset is missing — not currently shown, since all six have real images. No CTA in this section.

### 2.4 Leadership ("Engineering experience behind every valve")

- **Page:** About
- **Section:** `LeadershipSection`, `id="leadership"`
- **Component/file:** `src/components/about/LeadershipSection.jsx`
- **Copy:**
  - Kicker: `Leadership`
  - Heading (h2): `Engineering experience behind every valve`
  - Intro: `Max-Seal's management and engineering team brings decades of industrial butterfly valve experience, with the capability to support valve selection, automation, special materials and demanding service application`  *(note: this sentence has no closing period in source)*
  - Three proof points (hardcoded local `POINTS` array in this file, not from a shared data file):
    1. `ENGINEERING` — **Practical valve engineering** — `Experienced engineering support for complex piping configurations and severe-service applications.`
    2. `SOLUTIONS` — **Application-focused valve solutions** — `Support across manual valves, automation and special-alloy requirements.`
    3. `SUPPORT` — **Technical and field support** — `Technical sales, valve engineering and in-field sales and application personnel support customers through their requirements.`
  - Leadership card: initials badge `MG` (generated from name, decorative/aria-hidden) + name `Martin Gibbons` (from `COMPANY.president`) + role `President` (hardcoded, not from data) + line `35+ years of valve industry experience` (from `COMPANY.experience`)
- **Notes:** Name and experience line pulled from `src/data/data.js` → `COMPANY`; the three `POINTS` are local to this component, not shared. No CTA in this section.

### 2.5 Facts ("What We Can Confirm")

- **Page:** About
- **Section:** `FactsSection`, `id="facts"`
- **Component/file:** `src/components/about/FactsSection.jsx` + `src/data/aboutData.js` (`ABOUT_FACTS`)
- **Section head copy:**
  - Kicker: `The company at a glance`
  - Heading (h2): `What we can confirm`
- **Five fact cards (from `ABOUT_FACTS` in `aboutData.js` — value / label / supporting line):**
  1. `2008` — Established as a butterfly valve company — `Max-Seal, Inc. was established in 2008.`
  2. `35+` — Years of valve industry experience — `Led by experienced valve professionals with more than 35 years of valve industry experience.`
  3. `2` — U.S. facilities — `Main facilities in Lumberton, North Carolina and Houston, Texas.`
  4. `3` — Regional sales offices in Latin America — `Sales offices in Argentina, Chile and Mexico.`
  5. `Worldwide` — Partner support in key markets — `Partner relationships and industrial customers supported across multiple markets.`
- **CTA:** `See our global partner network` → `/about#global-partners`
- **Notes:** Sourced from `src/data/aboutData.js` → `ABOUT_FACTS`.

### 2.6 Team ("Leadership and people")

- **Page:** About
- **Section:** `TeamSection`, `id="team"`
- **Component/file:** `src/components/about/TeamSection.jsx` + `src/data/data.js` (`TEAM`)
- **Section head copy:**
  - Kicker: `LEADERSHIP AND PEOPLE`
  - Heading (h2): `Leadership and people`
- **Five team cards (from `TEAM` in `data.js` — initials badge (generated) / name / role / experience line where present):**
  1. `MG` — Martin Gibbons — President — `Over 35 years of valve industry experience.`
  2. `JF` — John Franklin — IVC Manager — *(no experience line in data)*
  3. `JV` — Jose Villa — General Manager — *(no experience line in data)*
  4. `KB` — Keith Britt — Inside/Outside Sales — *(no experience line in data)*
  5. `DS` — Dillan Skipper — Inside/Outside Sales — *(no experience line in data)*
- **Notes:** Sourced from `src/data/data.js` → `TEAM`. No CTA in this section.

### 2.7 Who We Serve

- **Page:** About
- **Section:** `EndUsersSection`, `id="who-we-serve"` (About submenu anchor target)
- **Component/file:** `src/components/about/EndUsersSection.jsx` + `src/data/data.js` (`INDUSTRIES`, subset)
- **Copy:**
  - Kicker: `WHO WE SERVE`
  - Heading (h2): `Supporting industrial teams across demanding markets`
  - Intro: `Max-Seal supports distributors, OEMs and industrial customers with butterfly valve solutions for process, infrastructure and industrial applications.`
  - Support note: `End-user names shown are examples from the current Max-Seal materials. For application-specific support, the Max-Seal team can help review valve requirements and route the request to the right contact.`
  - CTA prompt line: `Need support for a specific application?`
  - Panel label: `End users, selected examples`
  - End-user names (hardcoded local array, exactly 6): `3M`, `BASF`, `Cargill`, `Caterpillar`, `NASA`, `SpaceX`
  - Caption: `Distributor relationships also reach Saudi Arabia, Africa, Pakistan, Israel, South America and Canada.`
  - Panel label: `Markets served`
  - Market chips (8, each links to that industry's page) — from `INDUSTRIES` in `data.js`, filtered to this subset of ids: `oil-gas`, `power`, `data-centers`, `hvac`, `marine`, `petrochemical`, `refining`, `mining` → display names `Oil and Gas`, `Power`, `Data Centers`, `HVAC`, `Marine`, `Petrochemical`, `Refining`, `Mining`
- **CTA:** `Ask the Engineers` → `routes.enquiry({ intent: 'technical' })`
- **Notes:** `FEATURED_CUSTOMERS` (end-user names) is a local hardcoded array in this file, not in a shared data file. Market chip labels are sourced from `src/data/data.js` → `INDUSTRIES`.

### 2.8 Global Partners

- **Page:** About
- **Section:** `GlobalPartnersSection`, `id="global-partners"` (About submenu anchor target)
- **Component/file:** `src/components/about/GlobalPartnersSection.jsx` + `src/data/data.js` (`REGIONS`)
- **Copy:**
  - Kicker: `GLOBAL PARTNERS`
  - Heading (h2): `Partner support in key locations around the world`
  - Intro: `Max-Seal works through U.S. operations, regional sales offices and partner relationships to support distributors and industrial customers across key markets.`
  - Support note: `For location-specific support or distributor coordination, the Max-Seal team can help route the request to the right contact.`
  - Support pathway cards:
    - **Location support** — `Reach the right regional contact for a site.`
    - **Distributor coordination** — `Connect with the team on partner requests.`
  - Panel label: `Regional network`
  - Region selector (from `REGIONS` in `data.js`, 3 regions, each with a name, a one-line blurb, and its location list):
    1. **North America** (3 locations) — blurb: `Facilities and distributor partners across the United States.` — locations: `Facility, Lumberton, North Carolina, United States`; `Facility, Houston, Texas, United States`; `Distributors, Partners across multiple states, United States`
    2. **Latin America** (3 locations) — blurb: `Sales offices supporting distributors and industrial teams.` — locations: `Sales office, Regional support, Argentina`; `Sales office, Regional support, Chile`; `Sales office, Regional support, Mexico`
    3. **Other markets** (1 location) — blurb: `Distributor relationships in additional markets worldwide.` — location: `Distributors, Regional partner details connect through the CMS, Worldwide`
- **CTAs:**
  - `Ask the engineers` → `routes.enquiry({ intent: 'technical' })`
  - `View full partner directory` → `routes.partners` (`/partners`)
- **Notes:** Region/location data sourced from `src/data/data.js` → `REGIONS` (the same data used by the standalone `/partners` page, `src/pages/GlobalPartners.jsx`). Pathway cards and CTA copy are hardcoded in this component.

### 2.9 About Closing CTA

- **Page:** About
- **Section:** `ClosingCTA` (final CTA before footer)
- **Component/file:** `src/components/about/ClosingCTA.jsx`
- **Copy:**
  - Eyebrow: `Let's Talk`
  - Heading (h2): `Talk to the Max-Seal team`
- **CTAs:**
  - Primary: `Request a Quote` → `routes.enquiry({ intent: 'pricing' })`
  - Secondary: `Contact us` → `routes.contact`
- **Notes:** See "Shared CTA Pattern" note below.

---

## Shared CTA Pattern (appears on both Home and About)

Home's `Conversion` section (`src/pages/Home.jsx`) and About's `ClosingCTA` (`src/components/about/ClosingCTA.jsx`) both use the same underlying `.convert` CSS pattern (defined in `src/styles/home.css`) but each has its own distinct copy — there is no shared copy string between them:

| | Eyebrow | Heading | Lead paragraph | CTAs |
|---|---|---|---|---|
| **Home** | `Let's Talk` | `Ready to discuss your valve requirement?` | `Share your application and our team will help you specify with confidence.` | `Request a Quote` (primary button) + `Ask a technical question` + `General contact` (2 text links) |
| **About** | `Let's Talk` | `Talk to the Max-Seal team` | *(none)* | `Request a Quote` + `Contact us` (2 buttons) |

Also present on the About page, reusing the identical `Request a Quote` / `Ask the Engineers` (or `Ask a technical question`) CTA phrasing pattern used elsewhere:
- About Hero: `Request a Quote` + `Ask the Engineers`
- Who We Serve: `Ask the Engineers`
- Global Partners: `Ask the engineers` *(lowercase "the engineers" — inconsistent capitalization vs. the Hero's `Ask the Engineers`)*

---

## PART 3 — HEADER / FOOTER TEXT (site-wide, appears on Home and About; kept separate as requested)

### 3.1 Topbar (above main header)

- **File:** `src/components/Header.jsx`
- **Copy:** `US based manufacturer and supplier of industrial butterfly valves`
- **Links:** `Call`, `Email`, `WhatsApp` (all three point to `routes.contact`)

### 3.2 Main navigation

- **File:** `src/components/Header.jsx` + `src/data/data.js` (`NAV`)
- **Top-level labels:** `Home`, `Products`, `Industries`, `Solutions`, `Resources`, `About`, `Contact`
- **Header action button:** `Support` → `routes.enquiry({ intent: 'pricing' })`

### 3.3 About dropdown (desktop) — `src/components/DropdownContent.jsx`

Links now anchor into `/about#...` rather than separate pages:

| Label | Description | Destination |
|---|---|---|
| `Company` | `Overview, history and quality` | `/about#who-we-are` |
| `Team` | `How the company grew` | `/about#how-we-grew` |
| `End Users` | `Who we serve` | `/about#who-we-serve` |
| `Global Partners` | `Distributors worldwide` | `/about#global-partners` |

### 3.4 Mobile nav (About section) — `src/components/MobileNav.jsx`

Same four labels as the desktop dropdown (`Company`, `Team`, `End Users`, `Global Partners`), same four `/about#...` destinations, no description text (mobile sublinks show label only).

### 3.5 Footer — `src/components/Footer.jsx`

- **Tagline (under logo):** `Highly engineered butterfly valves and automation packages, supplied to distributors and industrial teams worldwide since 2008.`
- **Column headings:** `Products`, `Company`, `Resources`, `Support`
- **Company column links:** `About`, `Team` (→ `/about#how-we-grew`), `End Users` (→ `/about#who-we-serve`), `Global Partners` (→ `/about#global-partners`), `Contact`
- **Support column links:** `Request a Quote`, `Ask the Engineers`, `Contact`
- **Support column contact rows:** `Call our team`, `Email an enquiry`, `Message on WhatsApp`
- **Bottom bar:** `© 2026 Max-Seal Inc. All rights reserved.` / `Designed by InnooRyz` / `Terms and Conditions` / `Privacy Policy`

---

## Files Inspected

All files listed in the request were inspected. Additionally inspected (not in the original list but required to resolve data references):
- `src/components/PageHero.jsx` (shared hero shell used by `AboutHero.jsx`)
- `src/components/Header.jsx`, `src/components/Footer.jsx`, `src/components/DropdownContent.jsx`, `src/components/MobileNav.jsx` (Header/Footer text, kept in Part 3 as requested)

No files were modified. This document is extraction only.
