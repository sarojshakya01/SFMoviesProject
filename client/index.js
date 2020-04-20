import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./components/serviceWorker";
import WebFontLoader from "webfontloader";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";

WebFontLoader.load({
  google: {
    families: ["Roboto:300,400,500,700", "Material Icons"],
  },
});

ReactDOM.render(
  <BrowserRouter>
    <Routes />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
