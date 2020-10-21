import React, { Component } from 'react'
import ReactDOM from 'react-dom'

// Root Stylesheet
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> a2e2d6d3dee3f5a1b3ed14f636dc6873b49eb04a
import './sass/main.scss'
import 'react-sortable-tree/style.css' // This only needs to be imported once in your app
=======
import './sass/main.scss';
>>>>>>> added .test for app, app currently fails .test
=======
import './sass/main.scss'
import 'react-sortable-tree/style.css' // This only needs to be imported once in your app
>>>>>>> adding snapshot testing framework and early integration testing

import Router from './Router'

// Redux Config
import { configureStore } from './redux'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history'
const store = configureStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
    }
  }
ReactDOM.render(
  <BrowserRouter>
    <Auth0ProviderWithHistory>
      <App />
     </Auth0ProviderWithHistory>
   </BrowserRouter>
  ,document.getElementById('root')
)
