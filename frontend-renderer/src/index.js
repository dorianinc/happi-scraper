import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import ProductProvider from "./context/ProductContext";
import PaginationProvider from "./context/PaginationContext";
import GeneralProvider from "./context/GeneralContext";
import DarkModeProvider from "./context/DarkModeContext";
import configureStore from "./store";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
}

// Wrap the application with the Modal provider and render the Modal component
// after the App component so that all the Modal content will be layered as
// HTML elements on top of the all the other HTML elements:
function Root() {
  return (
    <ProductProvider>
        <PaginationProvider>
          <GeneralProvider>
            <Provider store={store}>
              <HashRouter>
                <DarkModeProvider>
                    <App />
                </DarkModeProvider>
              </HashRouter>
            </Provider>
          </GeneralProvider>
        </PaginationProvider>
    </ProductProvider>
  );
}

// ReactDOM.render(
//   <React.StrictMode>
//     <Root />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

const root = createRoot(document.getElementById("root"));

root.render(<Root />);
