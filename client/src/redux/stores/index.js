import { combineReducers } from 'redux';

import common from './common';
import documents from './documents';

export default combineReducers({
    common,
    documents
});
