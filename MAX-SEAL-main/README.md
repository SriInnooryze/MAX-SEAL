# Max-Seal React Website

A production React + Vite implementation of the Max-Seal Inc. marketing and product site — an industrial butterfly valve manufacturer's public-facing catalog, industry/application matrix, resources library, and lead-generation enquiry system.

The project was originally exported from **Claude Website Builder** as a static, `window.*`-global prototype and has since been fully migrated into a modern, maintainable, single-page React application. See [Migration Summary](#migration-summary) for details.

## Technology Stack

- **React 19** — component architecture, hooks
- **Vite** — dev server and production bundler
- **React Router (react-router-dom v7)** — client-side routing, `useParams`/`useSearchParams`
- **JavaScript (ES Modules)** — no TypeScript, no JSX-precompiled bundles
- **CSS** — hand-authored design-system + site stylesheets (no CSS-in-JS, no Tailwind)

## Prerequisites

- Node.js 18+ and npm

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Starts the Vite dev server (default `http://localhost:5173`) with hot module replacement.

## Production Build

```bash
npm run build
```

Outputs a static, deployable bundle to `dist/`. Preview it locally with:

```bash
npm run preview
```

`public/_redirects` is copied into `dist/` automatically and rewrites every path to `index.html` — required so client-side routes (e.g. `/products/resilient`) don't 404 on a hard refresh when hosted on a static host (Render, Netlify, etc.). If your host doesn't honor `_redirects`, configure an equivalent catch-all rewrite rule (`/* → /index.html`) in its dashboard.

## Project Structure

```
src/
  components/     Shared, reusable UI building blocks
  components/ds/  Design-system form/data primitives (see below)
  pages/          One file per route — top-level page components
  hooks/          Shared React hooks
  data/           Static site content (single source of truth)
  icons/          SVG icon components
  router/         Route table and path-builder helpers
  assets/         Images imported directly by components
  styles/         Global CSS (see Design System below)
  App.jsx         Root component — renders the router
  main.jsx        Entry point — the only ReactDOM.createRoot() call,
                  and the global stylesheet import order
  image-slot.js   <image-slot> custom element (see below)
public/           Static files served as-is at the site root
                  (favicon, _redirects — never imported by JS)
_ds/              Legacy Claude Website Builder design-system export
                  (CSS foundation is still used; see below)
```

### `src/components`

Layout and chrome shared across most or all pages: `Header`, `Footer`, `MobileNav`, `DropdownContent` (desktop mega-menus), `PageHero` (the dark inner-page banner with breadcrumbs), `Slot` (thin wrapper around `<image-slot>`), `LegalPage` (shared Terms/Privacy template), `DocDrawer` (shared document-preview panel for Catalog/Marketing Resources).

`src/components/ds/` holds the design-system primitives actually consumed by the app — `Input`, `Select`, `Textarea`, `Checkbox` (used by the Enquiry form) and `Tabs`, `SpecTable`, `Badge` (used by Product Detail). These are plain ES-module ports of the equivalent components in the legacy `_ds_bundle.js`; only the ones the app actually renders were ported — see [Design System](#design-system).

### `src/pages`

One component per route, each a default export wired into `src/router/AppRouter.jsx`. A page composes `Header`/`Footer`/`PageHero` plus whatever section markup and local state it needs; nothing outside `main.jsx` calls `ReactDOM.createRoot`.

### `src/hooks`

`useSiteChrome` — sets up the scroll-reveal `IntersectionObserver` (`.reveal` elements fade/slide in) and adds the `.js` class to `<html>`. Called once per page that uses scroll reveals.

### `src/data`

`data.js` is the single source of truth for site content: navigation (`NAV`), product families (`FAMILIES`), facets, industries, homepage story copy, team/company facts, documents, price lists, enquiry intents, etc. Pages import only the slices they need — there is no global content object.

### `src/icons`

Every icon used on the site as a small, dependency-free SVG React component (2px-stroke, Lucide-style line icons). Import individually (`import { ArrowRight } from '../icons/icons'`) or as a namespace (`import * as Icons from '../icons/icons'`) where an icon needs to be looked up dynamically by name (see Products' guided-selection goals and Enquiry's intent list).

### `src/router`

`AppRouter.jsx` holds the full `<Routes>` table (wrapped in `BrowserRouter`, with a `ScrollToTop` helper so client-side navigation starts at the top of the page like a full reload would). `paths.js` exports a single `routes` object with a builder function per destination (`routes.productDetail(id)`, `routes.enquiry({ intent, product })`, etc.) — every internal `<Link>` in the app goes through this object so the URL scheme lives in exactly one place.

### `src/assets`

Images imported directly into components via ES module `import` (e.g. `import logo from '../assets/maxseal-logo.png'`), so Vite fingerprints and bundles them. Use this folder (not `public/`) for any image a component needs to reference.

### `public`

Files served verbatim at the site root and never imported from JS: `favicon.png` (the Max-Seal mark, referenced from `index.html`), `favicon.svg` (unused legacy icon, kept for now), `_redirects` (SPA rewrite rule for static hosts).

## Architecture Overview

This project was originally exported from **Claude Website Builder** as a set of script files (`shell.jsx`, `data.jsx`, `icons.jsx`, `home.jsx`, `products.jsx`, `pages1/2/3.jsx`, `enquiry.jsx`) that ran without a build step: every page called `ReactDOM.createRoot().render()` itself, and shared code was attached to `window.MS`, `window.Icons`, `window.Header`, `window.Footer`, `window.PageHero`, and `window.useSiteChrome`. It has since been migrated into a conventional Vite + React application with ES modules throughout, React Router for navigation, and zero application-level `window.*` globals (only standard browser APIs remain — see the Migration Summary).

### Component architecture

Shared chrome (`Header`/`Footer`/`MobileNav`/`PageHero`) lives in `src/components`; every page composes these the same way a page in any conventional React app would, importing exactly what it needs.

### Routing

`react-router-dom` (`BrowserRouter`) replaces the original per-file `.html` navigation. Routes with a single resource use a path param (`/products/:family`, `/industry/:id`, `/resources/document-preview/:doc`); pages that seed optional filter state from a link (Products' industry/application/type seeding, Search's query, Enquiry's intent/product) use query params via `useSearchParams`.

### Shared data

All site copy and structured content lives in `src/data/data.js` as named exports. Nothing is duplicated per-page — e.g. `FAMILIES` (the seven product lines) is the same array consulted by Products, Product Detail, Industries, the mega-menu, and the footer.

### Design System

The original prototype shipped alongside a companion "Claude Website Builder Design System" export (`_ds/max-seal-design-system-.../`) containing design tokens, a base CSS reset, and a component-primitive CSS/JS bundle. Its **CSS** (`styles.css` → `tokens/*.css` → `components/components.css`) is still loaded — it provides the `box-sizing` reset and the base `.ms-btn`/`.ms-iconbtn`/`.ms-field`/`.ms-input`/etc. rules that `src/styles/system.css` re-skins on top of. Its **JS component bundle** (`_ds/.../legacy/_ds_bundle.js`) is no longer loaded — the handful of components the app actually uses (`Input`, `Select`, `Textarea`, `Checkbox`, `Tabs`, `SpecTable`, `Badge`) were ported to plain ES modules in `src/components/ds/`, so the app has no runtime dependency on that legacy bundle. It's kept in the repo purely as historical reference.

`src/styles/system.css`, `home.css`, and `pages.css` are all loaded globally (every route) from `main.jsx`, in that order — see the comment block at the top of `main.jsx` for exactly why (in short: `home.css` also defines the shared `.page-hero`/breadcrumb styles every inner page depends on, despite its own internal comment suggesting it's Home-only).

### Image Slot component

`<image-slot>` (`src/image-slot.js`) is a framework-agnostic custom element (Web Component) carried over unmodified from the original export. It renders a placeholder with drag-and-drop image upload, plus pan/zoom "reframe" editing, and is registered once via a side-effect import in `main.jsx`. Pages use it directly as JSX (`<image-slot id="..." shape="rect" fit="cover" placeholder="..." />`) or through the thin `Slot` wrapper component where a `className` needs to be passed through.

### Hooks

See [`src/hooks`](#srchooks) above.

## Coding Standards

- Functional components only, one per file, default-exported from `pages/` and `components/`.
- Page-local content (arrays of copy, tab definitions, etc.) stays in the page file; anything reused by more than one page belongs in `src/data/data.js`.
- Every internal link goes through `routes.*` from `src/router/paths.js` — never hardcode a path string in a page or component.
- Icons are imported from `src/icons/icons.jsx`; add new icons there rather than inlining SVG in a page.
- No new `window.*` globals. If something needs to be shared across components, import/export it or lift it into `data.js`/a hook.

### How to add a new page

1. Create `src/pages/YourPage.jsx` exporting a default function component (compose `Header`/`Footer`, and `PageHero` if it's an inner page).
2. Add a route in `src/router/AppRouter.jsx`.
3. Add a path builder to the `routes` object in `src/router/paths.js` and use it everywhere you link to the page (don't hardcode the path string).
4. If it needs nav/footer entries, wire it into `NAV`/footer link arrays in `src/data/data.js`.

### How to add a new product

Add an entry to the `FAMILIES` array in `src/data/data.js` (id, code, name, description fields, and the facet arrays — `types`/`apps`/`industries`/`service`/`automation` — used by the Products filters and Industries matrix). No component changes are needed: Products, Product Detail, Industries, the mega-menu, and the footer all render from this one array.

### How to update navigation

Edit the `NAV` array in `src/data/data.js` for the desktop header; `MobileNav.jsx`'s `MOBILE_NAV` array mirrors it for the mobile drawer (kept separate because the mobile menu shows a flattened list of children, not a hover dropdown). Desktop dropdown contents live in `src/components/DropdownContent.jsx`.

### How to add new shared components

Put layout/chrome components used by multiple pages in `src/components/`; put design-system-style form/data primitives in `src/components/ds/`. Follow the existing pattern: plain function component, default export, styled via existing `.ms-*` classes from the design system where possible rather than new one-off CSS.

## Deployment

The app builds to a static `dist/` folder with `npm run build` — deploy it to any static host (Render, Netlify, Vercel, S3+CloudFront, etc.).

The one thing every static host needs configured is an SPA rewrite/fallback rule (serve `index.html` for any path that doesn't match a real file), since this is a client-side-routed single-page app:

- **Render / Netlify**: `public/_redirects` (already in the repo) is picked up automatically from the build output.
- **Vercel**: add a `vercel.json` rewrite (`{ "source": "/(.*)", "destination": "/index.html" }`).
- **Other static hosts**: configure an equivalent catch-all rewrite to `/index.html` in the host's dashboard/config.

## Migration Summary

The site was originally generated by Claude Website Builder as a no-build-step prototype: plain script files loaded via `<script type="text/babel">`-style tags, sharing state through `window.MS` (content), `window.Icons`, and `window.Header`/`Footer`/`PageHero`/`useSiteChrome`, with every page independently calling `ReactDOM.createRoot().render()`.

That prototype was migrated into this repository as a conventional Vite + React application:

- **Data** (`window.MS`) → named ES module exports from `src/data/data.js`.
- **Icons** (`window.Icons`) → named ES module exports from `src/icons/icons.jsx`.
- **Shared shell** (`window.Header`/`Footer`/`PageHero`, plus `MobileNav`/`DropdownContent`/`Slot`) → individual components under `src/components/`.
- **`useSiteChrome`** → a proper hook in `src/hooks/useSiteChrome.js`.
- **Every page** → a default-exported function component in `src/pages/`, with `ReactDOM.createRoot()` removed everywhere except `src/main.jsx`.
- **Navigation** → `react-router-dom`, with `.html?query=` links replaced by `routes.*` path builders and `<Link>`; query-string-driven pages (Products, Search, Enquiry) use `useSearchParams` instead of manually parsing `window.location.search`.
- **CSS** → preserved byte-for-byte from the original export; only the *load order/scope* was fixed (the design-system foundation CSS and `home.css`'s shared `.page-hero` rules were being skipped/mis-scoped, which was the cause of a since-resolved header/hero/mega-menu layout regression).
- **Optional design-system components** (`window.MaxSealDesignSystem_1e8afc`, used by the Enquiry form fields and Product Detail's tabs/spec table/badge) → ported into `src/components/ds/` as real ES modules and imported directly; the legacy bundle they used to come from is no longer loaded at runtime.

No UI, copy, layout, styling, animation, or business logic was changed during the migration — only the module system, build tooling, and routing.
