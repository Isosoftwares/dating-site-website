import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { MaterialTailwindControllerProvider } from "./context/sidenav-context/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MaterialTailwindControllerProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MaterialTailwindControllerProvider>
  </React.StrictMode>
);
