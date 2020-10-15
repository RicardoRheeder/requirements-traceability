import React, { Component } from "react";

import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

import { Home, NotFound, ReactPage, LogIn, Editor } from "./pages";

import { NavBar } from "./components";

import { connect } from "./redux";

// auth0 hook
import { useAuth0 } from "@auth0/auth0-react";

class Router extends Component {
  render() {
    const { SecureRoute } = this;
    const { loggedIn } = this.props;
    // const { user } = useAuth0();
    // console.log(user);

    return (
      <div className="app-root">
        <HashRouter>
          <Switch>
            {!loggedIn ? (
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
}

export default connect({
  props: {
    common: ["loggedIn"],
  },
  actions: {
    common: ["setLoggedIn"],
  },
})(Router);
