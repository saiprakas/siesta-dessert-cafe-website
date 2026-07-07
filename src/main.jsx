import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Home.jsx";
import "./styles/base.css";

/* Static website — a single page, no routing, no backend. */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
