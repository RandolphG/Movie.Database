import React from "react";
import ReactDOM from "react-dom";
import MovieCard from "./app";
import { Provider } from "react-redux";
import store from "./app/_redux/store";

ReactDOM.render(
  <Provider store={store}>
    <MovieCard />
  </Provider>,
  document.getElementById("root")
);
