import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

/* Design-system foundation (tokens, reset, .ms-btn/.ms-iconbtn/form/badge/card
   base rules) — MUST load before system.css, which only re-skins specific
   tokens on top of it (see system.css's own header comment). */
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


