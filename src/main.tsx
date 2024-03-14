import React from "react";
import ReactDOM from "react-dom/client";
import "./style/main.scss";
import App from "./components/App";
import { Theme } from "./Theme/Theme.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme>
      <App />
    </Theme>
  </React.StrictMode>,
);
