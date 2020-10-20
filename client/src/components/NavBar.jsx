import React, { useEffect } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { LogoutButton } from './'

export default function NavBar() {
  useEffect(() => {
    const script = document.createElement('script')

    script.src = 'assets/js/agency.js'
    script.async = true

    document.body.appendChild(script)
  }, [])

  return (
    <div className="navbar-root">
      <nav
        className="navbar navbar-dark navbar-expand-lg fixed-top bg-dark mainNav"
        id="mainNav"
      >
        <div className="container">
          <a className="navbar-brand">{'{Doc Tracer Icon}'}</a>
          <div>
            <ul className="navbar-nav text-uppercase">
              <li className="nav-item">
                <NavLink to={'/'} id="NavToHome">
                  <a className="nav-link">Home</a>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={'/editor'} id="NavToEditor">
                  <a className="nav-link">Editor</a>
                </NavLink>
              </li>

              <li className="nav-item">
                <a className="nav-link">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Team</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Contact</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">
                  <LogoutButton />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
