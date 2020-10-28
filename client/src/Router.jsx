import React from 'react'

import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'

import { Home, NotFound, ReactPage, LandingPage, Editor } from './pages'

import { NavBar, ModalComponent } from './components'

import { useSelector } from 'react-redux'

import { useAuth0 } from '@auth0/auth0-react'

export default function Router() {
  const { isAuthenticated } = useAuth0()

  return (
    <div className="app-root">
      <HashRouter>
        <Switch>
          {!isAuthenticated ? (
            <Route path="*">
              <ModalComponent></ModalComponent>
              <NavBar />
              <LandingPage />
            </Route>
          ) : (
            <>
              <ModalComponent></ModalComponent>
              <NavBar />
              <Route exact={true} path="/" children={<Home />} />
              <Route exact={true} path="/editor" children={<Editor />} />
            </>
          )}
          {/* 
          <>
            <ModalComponent></ModalComponent>
            <NavBar />
            <Route exact={true} path="/" children={<Home />} />
            <Route exact={true} path="/editor" children={<Editor />} />
          </> */}
        </Switch>
      </HashRouter>
    </div>
  )
}
