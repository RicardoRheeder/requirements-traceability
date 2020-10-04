import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Root Stylesheet
import './sass/main';

import Router from './Router';

// Redux Config
import { configureStore } from './redux';
import { Provider } from 'react-redux';
const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router/>
      </Provider>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
