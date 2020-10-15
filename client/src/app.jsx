import React, { Component } from "react";
import ReactDOM from "react-dom";
// auth0 SDK
import { Auth0Provider } from "@auth0/auth0-react";

// Root Stylesheet
import "./sass/main";
import "react-sortable-tree/style.css"; // This only needs to be imported once in your app

import Router from "./Router";

// Redux Config
import { configureStore } from "./redux";
import { Provider } from "react-redux";
const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
