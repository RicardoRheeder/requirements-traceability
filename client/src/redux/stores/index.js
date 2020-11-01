import { combineReducers } from 'redux'

import common from './common'
import user from './user'
import document from './document'

export default combineReducers({
  common,
  document,
  user,
})
