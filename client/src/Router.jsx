import React from 'react'

import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'

import { Home, NotFound, ReactPage, LandingPage, Editor, About } from './pages'

import { NavBar, ModalComponent } from './components'

import { useSelector } from 'react-redux'

import { useAuth0 } from '@auth0/auth0-react'

import { css } from '@emotion/core'
import PacmanLoader from 'react-spinners/PacmanLoader'

export default function Router() {
  const { isAuthenticated, isLoading } = useAuth0()

  const override = css`
    display: block;
    margin: auto auto;
    border-color: red;
    background-color: #000000 !important;
    position: relative;
    top: 45% !important;
    right: auto !important;
    bottom: auto !important;
    height: 50%;
  `

  const loaderObject = () => {
    return isLoading ? (
      <div className={isLoading ? 'loader-container' : ''}>
        <PacmanLoader
          css={override}
          size={60}
          color={'#f96302'}
          loading={isLoading}
        />
      </div>
    ) : (
      <></>
    )
  }

  return (
    <div className="app-root">
      <HashRouter>
        <Switch>
          {!isAuthenticated ? (
            <Route path="*">
              {loaderObject()}
              <NavBar />
              <LandingPage />
            </Route>
          ) : (
            <>
              {loaderObject()}
              <ModalComponent />
              <NavBar />
              <Route exact={true} path="/" children={<Home />} />
              <Route exact={true} path="/editor" children={<Editor />} />
              <Route exact={true} path="/about" children={<About />} />
            </>
          )}
        </Switch>
      </HashRouter>
    </div>
  )
}
