import React from 'react'

import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'

import { Home, NotFound, ReactPage, LandingPage, Editor } from './pages'

import { NavBar, ModalComponent } from './components'

import { useSelector } from 'react-redux'

import { useAuth0 } from '@auth0/auth0-react'

import { css } from '@emotion/core'
import PropagateLoader from 'react-spinners/PropagateLoader'

export default function Router() {
  const { isAuthenticated, isLoading } = useAuth0()

  const override = css`
    display: block;
    margin: auto auto;
    border-color: red;
    background-color: #000000 !important;
  `

  return (
    <div className="app-root">
      <HashRouter>
        <Switch>
          {!isAuthenticated ? (
            <Route path="*">
              <NavBar />
              <LandingPage />
            </Route>
          ) : (
            <>
              {true ? (
                <>
                  <div className="loader-container">
                    <PropagateLoader
                      css={override}
                      size={150}
                      color={'#f96302'}
                      loading={true}
                    />
                  </div>
                  <ModalComponent />
                  <NavBar />
                  <Route exact={true} path="/" children={<Home />} />
                  <Route exact={true} path="/editor" children={<Editor />} />
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </Switch>
      </HashRouter>
    </div>
  )
}
