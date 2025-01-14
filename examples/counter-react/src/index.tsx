import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./components/App";
import "./index.scss";

const rootEl = document.getElementById("root");

if (!rootEl) {
  throw new Error('HTML element with an ID of "root" was not found.');
}

const root = createRoot(rootEl);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
