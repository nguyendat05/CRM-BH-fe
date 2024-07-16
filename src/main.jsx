import "./index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Provider from "./store/Provider.jsx";

import { LicenseManager } from "ag-grid-enterprise";
LicenseManager.setLicenseKey(import.meta.env.VITE_AG_GRID_KEY);

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider>
      <App />
    </Provider>
  </BrowserRouter>
);

