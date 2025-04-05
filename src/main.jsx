import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GlobalProvider } from "./GlobalContext/GlobalState.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </StrictMode>
);
