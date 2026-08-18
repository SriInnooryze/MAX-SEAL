# Home + About Visual QA Report

Visual QA pass only. No code was changed as part of this task. All findings below are from direct visual inspection of screenshots captured against the running dev build after the copy rewrite.

## 1. Overall Readiness Score — Home

**9/10 — client-review ready.**

Every section (hero, product preview, industry preview, Why Max-Seal, Application Focus, Resources, Company Story, closing CTA, footer) reads as premium, industrial, and well-aligned at every tested viewport. Copy fits cleanly with no clipping, no awkward wraps, no overflow. The one point held back is a pre-existing image-asset inconsistency (see P1-1) that is outside this task's scope to fix but worth flagging before client delivery.

## 2. Overall Readiness Score — About

**9/10 — client-review ready.**

Hero, Who We Are, Timeline (desktop and mobile), Leadership, Facts, Team, Who We Serve, Global Partners (including live region-switch interaction), and the closing CTA all render correctly and consistently across desktop, tablet, and mobile. Anchor navigation from the About submenu lands correctly on all four target sections at every width tested. Same single point held back as Home (P1-1, shared asset).

## 3. P0 Blockers

**None found.**

Specifically verified and clean:
- No horizontal overflow at any of the 8 required viewports on either page (1440/1280/1024/850/768/430/390/844×390 landscape)
- No broken images anywhere
- No clipped CTA buttons at any width (hero, closing CTA, Who We Serve, Global Partners all stack/wrap cleanly on mobile)
- No section heading hidden under the sticky header — all four About anchors (`#who-we-are`, `#how-we-grew`, `#who-we-serve`, `#global-partners`) land with the heading fully clear of the header at 1440/768/390px
- No timeline card disappearing — desktop sticky stage and mobile step-card stage both confirmed mid-scroll with the correct active card and no blank state
- No Global Partners blank state — clicked into "Latin America" live and confirmed both the node indicator and the location cards updated correctly, no flash of empty content
- No mobile layout break in any section reviewed

## 4. P1 Client-Visible Issues

**P1-1: Global Partners / "Worldwide" imagery reads as a generic global-network graphic that overstates the company's actual footprint, and resembles the "AI-looking network visual" style the project has previously and deliberately avoided elsewhere.**

- Where: Home → Resources Preview → "Partner support in key markets" card image; About → Timeline → "Worldwide" and "Latin America" milestone photos
- What: These are pre-existing image assets (not touched by the copy rewrite, and image assets are out of scope for this task) showing a stylized world map with glowing markers across many countries — United States, UK/Europe, Middle East, China, Japan, India, Mexico, and more.
- Why it's now more noticeable: the surrounding copy is now written very precisely and modestly ("U.S. operations, regional sales offices... Argentina, Chile, Mexico... partner relationships in key locations"). The image visually implies a much larger global network than the copy claims, and stylistically resembles the kind of "AI-looking global network visual" that was explicitly called out and avoided when the About page's own Global Partners section was redesigned earlier in this project.
- Not fixable in this pass (image assets are out of scope), but flagging now so it's a deliberate decision rather than an oversight before Monday.
- Evidence: `closeup-home-resources-1440.png`, `about-timeline-desktop-midscroll-1440.png`

No other P1 items were found. Everything else checked (text density, alignment, wrapping, sizing, theme consistency) held up well across all reviewed viewports.

## 5. P2 Polish Items

- **P2-1:** On the Home "What We Engineer" product carousel, the shortest tile label ("Engineering support") sits in a side tile with noticeably more empty vertical space around the product photo than the center/active tile. Purely a proportion observation, not a defect — carousel side-tiles are intentionally de-emphasized.
- **P2-2:** In the Who We Serve end-user grid, "3M" (2 characters) creates a visually sparser tile than "CATERPILLAR" (11 characters) sitting next to it. Minor rhythm inconsistency inherent to using real, unequal-length approved names as uppercase wordmark tiles — not something to invent around.
- **P2-3:** The video hero's pause/play control (bottom-right) is a small, low-contrast square against the dark video background. Pre-existing UI element, unrelated to the copy rewrite; worth a glance in a future accessibility/contrast pass.

## 6. Screenshot File Paths Created

All screenshots are saved under `qa-screenshots/home-about/` (53 files total).

**Primary matrix (as requested), named `home-{width}.png` / `about-{width}.png`:**
```
home-1440.png            about-1440.png
home-1280.png             about-1280.png
home-1024.png             about-1024.png
home-850.png               about-850.png
home-768.png                about-768.png
home-430.png                 about-430.png
home-390.png                  about-390.png
home-844x390-landscape.png    about-844x390-landscape.png
```

**About anchor pages** (`about-{section}-{width}.png`, at 1440/768/390 each):
```
about-who-we-are-1440.png      about-who-we-are-768.png      about-who-we-are-390.png
about-how-we-grew-1440.png     about-how-we-grew-768.png     about-how-we-grew-390.png
about-who-we-serve-1440.png    about-who-we-serve-768.png    about-who-we-serve-390.png
about-global-partners-1440.png about-global-partners-768.png about-global-partners-390.png
```

**Interaction / behavior evidence:**
```
about-global-partners-latam-1440.png     — Global Partners after clicking "Latin America" (no blank state)
about-timeline-desktop-midscroll-1440.png — desktop sticky stage mid-scroll, correct active card
about-timeline-mobile-midscroll-390.png   — mobile step-card stage mid-scroll, "4 / 6" progress, correct card
```

**Section close-ups** (desktop 1440 unless noted), prefixed `closeup-`:
```
closeup-home-product-preview-1440.png    closeup-about-who-we-are-1440.png
closeup-home-industry-preview-1440.png   closeup-about-leadership-1440.png
closeup-home-why-1440.png                closeup-about-facts-1440.png
closeup-home-application-focus-1440.png  closeup-about-team-1440.png
closeup-home-resources-1440.png          closeup-about-who-we-serve-1440.png
closeup-home-company-story-1440.png      closeup-about-leadership-850.png
closeup-home-closing-cta-1440.png        closeup-about-timeline-850.png
closeup-home-footer-1440.png
closeup-home-hero-cta-390.png            closeup-about-serve-logos-390.png
closeup-home-facts-strip-390.png         closeup-about-facts-390.png
closeup-home-resources-390.png           closeup-about-team-390.png
closeup-home-closing-cta-390.png
```

## 7. Recommended Next Fix Batch

Given zero P0s and a single P1 that is explicitly an image-asset decision (not a copy or layout defect), **no urgent fix batch is required before Monday delivery** on Home or About.

If there is time before delivery, in priority order:
1. Decide on P1-1 (Global Partners / Worldwide imagery) — either accept as-is, source a more modest/specific replacement image, or crop the existing map tighter to de-emphasize the number of visible markers. This is a content/asset decision for the client or design lead, not a code fix.
2. P2 items can wait for the final polish pass after Monday; none are visible enough to affect the client's first impression.

---

*Methodology note: initial full-page captures showed large blank sections due to the site's scroll-triggered reveal animations (`IntersectionObserver`-driven fade-ins) not firing under Playwright's instant full-page composite. This was identified as a capture artifact (confirmed via direct DOM inspection) and corrected by simulating a real gradual scroll-through before each capture — the screenshots and findings above reflect what an actual visitor scrolling the page would see.*
