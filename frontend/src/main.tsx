import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// 🔎 DEBUG ENV VALUES
console.log("ENV API", import.meta.env.VITE_API_BASE_URL);
console.log("ENV MOCK", import.meta.env.VITE_ENABLE_MOCK_DATA);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
