import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import {thunk} from "redux-thunk";
import productsReducer from "./productsReducer";
import matchesReducer from "./matchReducer";
import scriptsReducer from "./scriptsReducer";
import settingsReducer from "./settingsReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  matches: matchesReducer,
  script: scriptsReducer,
  settings: settingsReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
