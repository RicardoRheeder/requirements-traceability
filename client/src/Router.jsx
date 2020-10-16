import React from "react";

import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

import { Home, NotFound, ReactPage, LandingPage, Editor } from "./pages";

import { NavBar } from "./components";

import { useSelector } from "react-redux";

import { useAuth0 } from "@auth0/auth0-react";

export default function Router() {
  // const loggedIn = useSelector((state) => state.common.loggedIn);
  const { user, isAuthenticated } = useAuth0();
  //   console.log(user);

  return (
    <div className="app-root">
      <HashRouter>
        <Switch>
          {/* {!user ? (
            <Route path="*">
              <LandingPage />
            </Route>
          ) : (
            <>
              <NavBar />
              <Route exact={true} path="/" children={<Home />} />
              <Route exact={true} path="/editor" children={<Editor />} />
            </>
          )} */}

          <>
            <NavBar />
            <Route exact={true} path="/" children={<Home />} />
            <Route exact={true} path="/editor" children={<Editor />} />
          </>
        </Switch>
      </HashRouter>
    </div>
  );
}
