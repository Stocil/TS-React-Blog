import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "./style/main.scss";
import App from "./components/App";
import { Theme } from "./Theme/Theme.tsx";
import { store } from "./store/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Theme>
        <App />
      </Theme>
    </Provider>
  </React.StrictMode>
);
