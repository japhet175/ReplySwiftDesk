import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProvider } from "./assets/context/AppContext";
import "./i18n"; // import i18next
import "./index.css"; // <-- Assure-toi que ton Tailwind CSS est importé ici

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
