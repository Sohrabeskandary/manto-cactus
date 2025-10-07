import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Import App instead of all individual components
import App from "./App.jsx";
import "./index.css"; // Make sure to keep your global styles

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Render the App component */}
    <App />
  </StrictMode>
);
