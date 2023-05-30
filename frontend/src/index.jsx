import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./slices/index.js";
import "./i18n";
import { Provider as RollbarProvider, ErrorBoundary } from "@rollbar/react";

const rollbarConfig = {
  accessToken: "0acfa198449f4a2ca9057cb86f63c3c0",
  environment: "testenv",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </RollbarProvider>
);
