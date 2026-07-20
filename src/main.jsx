import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

/* Global stylesheet chain — order matters, do not reorder:
   1. Design-system foundation (tokens, reset, .ms-btn/.ms-iconbtn/form/badge/
      card base rules) — MUST load first; system.css only re-skins specific
      tokens on top of it (see system.css's own header comment).
   2. system.css — shared site chrome (header, footer, nav, buttons, layout
      utilities) used by every page.
   3. home.css — despite its internal "loads on Home ONLY" note (which refers
      only to its :root typography reset), this file also defines `.page-hero`,
      `.shead` and breadcrumb styles that inner pages depend on, so it is
      loaded globally rather than scoped to the Home route.
   4. pages.css — inner-page section styles; assumes `.page-hero` (above)
      already exists. */
import "../_ds/max-seal-design-system-1e8afc28-2ea4-4eed-b4bd-4cae42c4540f/styles.css";
import "./styles/system.css";
import "./styles/home.css";
import "./styles/pages.css";
import "./image-slot.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


