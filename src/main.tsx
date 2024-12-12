import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { initGA, initGTM } from "./utils/analytics";
import Analytics from "./components/Analytics";
import "./index.css";
import App from "./App.tsx";

// Initialize analytics
initGTM();
initGA();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Analytics />
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
