# Max-Seal Design System

A premium, project-specific design direction for the Max-Seal Inc. website redesign. This system is the single source of truth for tokens, components, and full-screen UI kits used to prototype and later build the production static site (HTML, CSS, JS) and a future reusable CMS.

---

## Company context

**Max-Seal Inc.** is a US-based industrial butterfly valve manufacturer and supplier, established 2008. It provides:

- Resilient Seated Butterfly Valves
- High Performance Butterfly Valves
- Triple Offset Butterfly Valves
- PFA Lined Butterfly Valves
- Special Alloy Butterfly Valves
- Automated Packages
- Customized Solutions

Max-Seal serves distributors and industrial customers worldwide across data centers, oil and gas, refining, petrochemical, chemical processing, pulp and paper, mining, transportation, food and beverage, pharmaceuticals, marine, HVAC, and power.

**Audience:** distributors, engineers, procurement teams, maintenance teams, and industrial buyers, with worldwide reach.

**Project goal:** a complete redesign focused on modern product discovery, full technical product information shown online (not only in PDFs), lead generation, downloadable catalogs, marketing resources, price lists, and long-term maintainability with a future CMS.

### Primary actions (sitewide)
- **Support** — primary CTA button in the global header and mobile navigation drawer (renamed from "Request a Quote").
- **Request a Quote** — all other page-level/content-level CTA buttons (e.g. inside heroes, product cards, sections) intentionally remain "Request a Quote" to preserve contextual intent and user expectations.
- **Ask the Engineers** — secondary CTA
- Quick contact: call, email, WhatsApp

### Site Architecture & Navigation Structure
The website uses a consistent navigation system with the following primary order:
1. **Home** — Site homepage (`Max-Seal Homepage.html`)
2. **Products** — Interactive product catalog (`Products.html`) with dropdown menus.
3. **Industries** — Industry application matrix (`Industries.html`) with dropdown menus.
4. **Solutions** — Application-specific and custom engineered categories (`Solutions.html`, NEW).
5. **Resources** — Shared materials portal (`Resources.html`) with catalog, marketing, and pricelist links.
6. **About** — Overview, team, and global partner directory (`About.html`) with dropdown menus.
7. **Contact** — Shared enquiry forms (`Contact.html`).

### Top-level site areas (kept visible and separate)
`Products` · `Catalog` · `Marketing` · `Pricelists`
Catalog, Marketing, and Pricelists are deliberately **not** merged into a single Resources page.

---

## Sources given

- `uploads/maxseal-logo.png` — the existing Max-Seal logo (retained). Copied to `assets/maxseal-logo.png`.
- Direction brief from the client (premium modern industrial redesign).
- Visual references named by the client: **Aalberts IPS** (strongest reference), Flowserve and Legend Valve (secondary), Flo-Tite (taste only). No codebase or Figma file was provided. If one exists, attach it and this system can be aligned to it.

> No production codebase or Figma link was supplied. The visual direction here is an original interpretation built to the brief, not a copy of any reference site.

---

## CONTENT FUNDAMENTALS

How Max-Seal copy is written.

- **Voice:** concise, natural, professional English. Plain and direct. We sound like an experienced engineering supplier, not a marketing department.
- **Person:** speak about the product and the customer's application. Use "you" for the reader ("built for your service window"), "we"/"Max-Seal" for the company. Avoid first-person singular.
- **Casing:** Sentence case for headlines and buttons ("Request a quote", "Triple offset series"). Product family names use Title Case ("Triple Offset Butterfly Valve"). Mono eyebrows are UPPERCASE and tracked.
- **Tone:** confident, precise, factual. Lead with capability and proof, not adjectives.
- **Numbers and specs:** always concrete. Sizes as `DN50–DN1200`, ratings as `PN10–PN40 / 150–300#`, temperatures with units. Use tabular figures (mono).
- **Punctuation rules (hard constraints):** no em dashes, no double dashes, no jargon, no exaggerated marketing language. Do not write copy that sounds AI-generated.
- **Emoji:** never. This is an industrial B2B brand.
- **Examples**
  - Hero: "Highly engineered butterfly valves, built for performance, reliability, and demanding applications."
  - CTA pair: "Support" / "Ask the Engineers"
  - Product line: "Metal-seated, bidirectional, zero-leakage shutoff for severe service."
  - Avoid: "Revolutionary next-gen valve solutions that empower your journey." (marketing fluff, banned)

---

## VISUAL FOUNDATIONS

The look: premium, precise, industrial, engineered, trustworthy, modern, easy to use. Reference point is Aalberts IPS — clean, lots of structured white space, confident type, restrained color, technical product imagery.

- **Color:** warm white pages (`--paper-50` #F8F6F1), deep navy structure (`--navy-800` #0A1F37), graphite ink for text (`--graphite-900`), steel grey neutrals for borders and secondary text, and a single bright highlight — **Pantone 2995 C azure** (`--azure-500` #009FDA). Metallics appear only as restrained hairline sheens, never as large chrome panels. Roughly: 70% warm white/paper, 18% navy/graphite, 8% steel, 4% azure. Azure is a highlight, not a background.
- **Backgrounds:** mostly flat warm white and flat navy. The signature texture is a faint **blueprint grid** (azure + white hairlines) used only on dark sections and product media on hover. No glassmorphism, no busy gradients, no stock office photos. Product imagery sits on soft radial studio gradients. Imagery vibe is cool, clean, neutral-to-cool grey for products and a dark engineered navy for hero/industrial scenes.
- **Type:** Archivo (engineered grotesque) for display and UI, Hanken Grotesk for body, IBM Plex Mono for technical data, eyebrows, and part numbers. Tight negative tracking on big display, generous 1.62 line height on body. Mono uses tabular figures.
- **Spacing:** 4px base grid. Generous section rhythm (`--section-y`), tight internal detail. Structured, aligned, lots of breathing room.
- **Corner radii:** deliberately small and engineered — 2–8px on most surfaces, never large "startup" rounding. Pills reserved for filter chips only.
- **Cards:** flat warm-white surface, 1px steel hairline border, very subtle cool-tinted shadow (`--shadow-xs`). On hover, product cards lift 2px, shadow deepens to `--shadow-lg`, image zooms ~6%, and a faint blueprint grid fades in. No colored left-border accent cards.
- **Borders / dividers:** 1px steel hairlines (`--color-border`). Section accents use a short 2px azure rule before eyebrows.
- **Shadows:** cool navy-alpha, crisp, low-spread, layered (xs → xl). Engineered, never soft or glowy. One inset hairline-top for metallic panels.
- **Animation:** restrained and mechanical. Standard ease `cubic-bezier(0.4,0,0.2,1)`, slow precise reveals for hero motion. Durations 120–520ms. No bounce, no infinite decorative loops, no excessive motion. Hero may use slow pan / controlled zoom / layered depth / technical line animation only.
- **Hover states:** primary buttons darken (azure 500 → 600 → 700 on press); outline buttons gain a navy border and faint paper fill; links shift azure and nudge their arrow 3px. Press states translate 1px down. No scale-bounce on buttons.
- **Focus:** 3px azure focus ring (`--shadow-focus`) on all interactive elements.
- **Transparency / blur:** used very sparingly — only subtle white overlays on dark buttons. No frosted glass.
- **Layout rules:** sticky slim header, max content width 1280px, fluid gutters. Hero is asymmetric (text left, product visual right), not a centered template hero.

---

## ICONOGRAPHY

- **System:** [Lucide](https://lucide.dev) — consistent 2px stroke, rounded line caps. It matches the precise, engineered line language and the blueprint motif. Loaded from CDN in prototypes (`https://unpkg.com/lucide@latest`), drawn at 18–22px.
- **Why Lucide:** clean outline icons, no fills, no cartoon style, broad coverage (arrows, search, phone, mail, download, file, settings, check, chevrons). This is a **substitution** — no brand icon set was provided. Flag for the client if they have a preferred set.
- **Usage:** icons are line-only, inherit `currentColor`, and pair with text. Arrows/chevrons/check marks used as control affordances are inline SVG. WhatsApp/phone/mail use their Lucide equivalents for quick-contact.
- **Emoji:** never used.
- **Unicode:** the multiplication sign and en dash for ranges in data are fine; en/em dashes are never used in prose.
- **No hand-drawn illustrations.** The only "drawn" brand element is the CSS blueprint grid and concentric-ring product placeholders, which stand in for real photography.

---

## Index / manifest

**Root**
- `styles.css` — global entry point, imports only. Consumers link this one file.
- `readme.md` — this guide.
- `SKILL.md` — Agent Skill wrapper for use in Claude Code.

**Tokens** (`tokens/`)
- `colors.css`, `typography.css`, `spacing.css`, `radius-shadow-motion.css`, `base.css`, `fonts.css`

**Components** (`components/`) — React primitives, namespace `window.MaxSealDesignSystem_*`
- `forms/` — Button, IconButton, Input, Textarea, Select, Checkbox
- `data/` — Badge, Tag, Stat, SpecTable, ProductCard
- `disclosure/` — Tabs, Accordion
- `layout/` — SectionHeading
- `components.css` — shared component styling (shipped via styles.css)

**Foundation cards** (`guidelines/`) — specimen cards for the Design System tab (Colors, Type, Spacing, Brand).

**UI kits** (`ui_kits/`)
- `website/` — full-screen click-through of the Max-Seal site: Home, Product category, Product detail, Catalog, Enquiry.

**Assets** (`assets/`)
- `maxseal-logo.png` — retained brand logo
- `hero-valve.png`, `application-band.png` — placeholder hero / application imagery
- `product-*.png` — placeholder product studio images (replace with real photography)

---

## Caveats / open items

- **Fonts** are loaded from Google Fonts CDN (Archivo, Hanken Grotesk, IBM Plex Mono). For production, self-host these and replace the `@import` in `tokens/fonts.css` with local `@font-face` rules. If the client has licensed brand fonts, supply them and they will be swapped in.
- **Product, hero, and application imagery are placeholders.** Replace with real Max-Seal product photography and application photography.
- **Icons** use Lucide as a substitution. Confirm or replace with a client-preferred set.
- No codebase or Figma was provided, so the direction is original to the brief.
