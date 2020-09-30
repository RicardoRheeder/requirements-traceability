import React, { Component } from 'react';
import { connect } from '../redux';
import { withRouter } from "react-router-dom";

class LogIn extends Component {

    LogIn = () => {
        this.props.setLoggedIn(true);
        setTimeout(() => {
            this.props.history.push('/');
        }, 100);
    }

    render() {
        return (
            <div>
                <button onClick={() => { this.LogIn(); }}>
                    Log in
                </button>
            </div>
        )
    }
}

export default withRouter(connect({
    props: {
        common: ["loggedIn"]
    },
    actions: {
        common: ["setLoggedIn"],
    }
})(LogIn));
