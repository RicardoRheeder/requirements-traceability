import React, { Component } from 'react';

import {
    HashRouter,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import {
    Home,
    NotFound,
    ReactPage,
    LogIn
} from './pages';
import { connect } from './redux';

class Router extends Component {
    render() {
        const { SecureRoute } = this;
        const { loggedIn } = this.props;

        return (
            <div className="app-root">
                <HashRouter>
                    <Switch>
                        <SecureRoute
                            exact={true} path='/'
                            children={<Home />}
                        />
                        <Route
                            exact path='/login'
                            children={<LogIn />}
                        />
                        <SecureRoute
                            path="*"
                            children={<NotFound />}
                        />
                    </Switch>
                </HashRouter>
            </div>
        )
    }

    SecureRoute = (props) => {
        const DEFAULT_REDIRECT_PATH = '/login';
        const { isAuthorized = true, path, redirectTo = DEFAULT_REDIRECT_PATH, children, exact = false } = props;

        return (
            <Route exact={exact} path={path}>
                {
                    isAuthorized //&& this.props.loggedIn
                        ?
                        children
                        :
                        <Redirect to={redirectTo} />
                }
            </Route>
        )
    }
}

export default connect({
    props: {
        common: ["loggedIn"]
    },
    actions: {
        common: ["setLoggedIn"],
    }
})(Router);