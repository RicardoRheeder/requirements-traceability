import { combineReducers } from "redux";

import common from './common';
import user from "./user";
import documents from "./documents";

export default combineReducers({
    common,
    user,
    documents
});
