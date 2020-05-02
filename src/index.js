import React from "react";
import ReactDOM from "react-dom";
import MovieCard from "./app";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./app/_redux/store";

ReactDOM.render(
  <Provider store={store}>
    <MovieCard />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
