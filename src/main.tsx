import React from "react";
import { createRoot } from "react-dom/client";
import { defineCustomElements } from "@ionic/pwa-elements/loader";

import { App } from "@/App";

const container = document.getElementById("root");
const root = createRoot(container!);

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

root.render(app as any);

defineCustomElements(window);
