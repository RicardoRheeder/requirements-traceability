import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// restricting extension in production using process.env.NODE_ENV which is set 'production'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

import store from './stores';

const enhancer = (process.env.NODE_ENV == 'development')
               ? composeWithDevTools(applyMiddleware(thunk))
               : applyMiddleware(thunk);

export default () => createStore(store, enhancer);
