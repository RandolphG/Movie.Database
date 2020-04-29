import thunk from "redux-thunk";
import { applyMiddleware, compose, createStore } from "redux";
import { createLogger } from "redux-logger";

// -- reducers
import reducers from "./reducers/reducers";

const loggerMiddleware = createLogger();

// -- middleware
const middleware = applyMiddleware(thunk, loggerMiddleware);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// -- store
const store = createStore(reducers, composeEnhancer(middleware));
export default store;
