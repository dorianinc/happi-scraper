import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider, Modal } from "./context/ModalContext";
import ProductProvider from "./context/ProductContext";
import PaginationProvider from "./context/PaginationContext";
import GeneralProvider from "./context/GeneralContext";
import configureStore from "./store";
import * as sessionActions from "./store/session";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.sessionActions = sessionActions;
}

// Wrap the application with the Modal provider and render the Modal component
// after the App component so that all the Modal content will be layered as
// HTML elements on top of the all the other HTML elements:
function Root() {
  return (
    <ProductProvider>
      <ModalProvider>
        <PaginationProvider>
          <GeneralProvider>
            <Provider store={store}>
              <BrowserRouter>
                <App />
                <Modal />
              </BrowserRouter>
            </Provider>
          </GeneralProvider>
        </PaginationProvider>
      </ModalProvider>
    </ProductProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
