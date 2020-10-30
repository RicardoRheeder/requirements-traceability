let navIcon = { backgroundImage: 'url(/assets/images/Doc_Tracer_Icon_2.png)' }

import React, { useEffect } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { LogoutButton } from './'
import { useAuth0 } from '@auth0/auth0-react'

export default function NavBar() {
  const { isAuthenticated } = useAuth0()

  useEffect(() => {
    const script = document.createElement('script')

    script.src = 'assets/js/agency.js'
    script.async = true

    document.body.appendChild(script)
  }, [])

  return (
    <div className="navbar-root topnav fixed-top">
      <img
        className="nav-icon"
        src="/assets/images/Doc_Tracer_Icon_1_gradient.png"
      ></img>

      <div className="navbar-options-container">
        <ul className="navbar-option text-uppercase">
          {isAuthenticated ? (
            <li className="nav-item">
              <NavLink to={'/home'} id="NavToHome">
                <div className="nav-link">Home</div>
              </NavLink>
            </li>
          ) : (
            <></>
          )}
          {isAuthenticated ? (
            <li className="nav-item">
              <NavLink to={'/editor'} id="NavToEditor">
                <div className="nav-link">Editor</div>
              </NavLink>
            </li>
          ) : (
            <></>
          )}

          <li className="nav-item">
            <NavLink to={'/about'} id="NavToAbout">
              <div className="nav-link">About</div>
            </NavLink>
          </li>

          {isAuthenticated ? (
            <li className="nav-item">
              <a className="nav-link">
                <LogoutButton />
              </a>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </div>
    </div>
    // <div className="navbar-root topnav fixed-top">
    //     <div className="container">
    //       <a className="navbar-brand">
    //
    //       </a>
    //       <div className="navbar-options-container">
    //         <ul className="navbar-nav text-uppercase">
    //

    //           <li className="nav-item">
    //             <a className="nav-link">About</a>
    //           </li>
    //           <li className="nav-item">
    //             <a className="nav-link">Team</a>
    //           </li>
    //           <li className="nav-item">
    //             <a className="nav-link">Contact</a>
    //           </li>

    //         </ul>
    //       </div>
    //     </div>
    //   </div>
  )
}
