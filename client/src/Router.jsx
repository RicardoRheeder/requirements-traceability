import React from "react";

import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

import { Home, NotFound, ReactPage, LogIn, Editor } from "./pages";

import { NavBar } from "./components";

import { useSelector } from "react-redux";

import { useAuth0 } from "@auth0/auth0-react";

export default function Router() {
  const loggedIn = useSelector((state) => state.common.loggedIn);
  const { user } = useAuth0();
  //   console.log(user);

  return (
    <div className="app-root">
      <HashRouter>
        <Switch>
          {!user ? (
            <Route path="*">
              <LogIn />
              {/** Shows logging in page */}
            </Route>
          ) : (
            <>
              <NavBar />
              <Route exact={true} path="/" children={<Home />} />
              <Route exact={true} path="/editor" children={<Editor />} />
              {/* <Route
                                    path="*"
                                    children={<NotFound />}
                                /> */}
            </>
          )}
        </Switch>
      </HashRouter>
    </div>
  );
}
