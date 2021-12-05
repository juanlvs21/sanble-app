import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { App } from "@/App";
import { store } from "@/store";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { StorageProvider } from "@/providers/StorageProvider";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <StorageProvider>
            <App />
          </StorageProvider>
          <ToastContainer />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
