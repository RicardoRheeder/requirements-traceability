import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { LogoutButton } from "./";
//import * from ""

export default function NavBar() {
  return (
    // <nav className="root-container">
    //   <span className="root-container-span root-container-home">
    //     <NavLink to={"/"} id="NavToHome">
    //       <span className="navbar-home text-title">AppName</span>
    //     </NavLink>
    //   </span>

    //   <span className="root-container-span root-container-project">
    //     <NavLink to={"/editor"} id="NavToEditor">
    //       <span className="navbar-project text-project">Editor</span>
    //     </NavLink>
    //   </span>

    //   <span>
    //     <LogoutButton />
    //   </span>
    // </nav>

<nav className="navbar navbar-dark navbar-expand-lg fixed-top bg-dark mainNav" id="mainNav" style={{minHeight: '100px',border: '1px solid #f96302' }}>
        <div className="container">
          <a className="navbar-brand" href="#page-top" style={{borderColor:'#2e2e2e',color: '#f96302'}}>
            {'{Doc Tracer Icon}'}
            </a>
            <button data-toggle="collapse" data-target="#navbarResponsive" className="navbar-toggler navbar-toggler-right" type="button" data-toogle="collapse"
                aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                  <i className="fa fa-bars"></i>
                  </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="nav navbar-nav ml-auto text-uppercase">
                    <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#about">Home</a></li>
                    <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#team">Editor</a></li>
                    <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#contact">About</a></li>
                    <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#about">Team</a></li>
                    <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#about">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>
  );
}
