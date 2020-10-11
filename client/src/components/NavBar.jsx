import React, { Component } from 'react'
import { NavLink, withRouter } from "react-router-dom";

export default class NavBar extends Component {
    render() {
        return (
            <nav className="root-container">
                <span className="root-container-span root-container-home">
                    <NavLink
                        to={"/"}
                        id="NavToHome"
                    >
                        <span className="navbar-home text-title">AppName</span>
                    </NavLink>
                </span>

                <span className="root-container-span root-container-project">
                    <NavLink
                        to={"/editor"}
                        id="NavToEditor"
                    >
                        <span className="navbar-project text-project">Editor</span>
                    </NavLink>
                </span>
            </nav>
        )
    }
}
