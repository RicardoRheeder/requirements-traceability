import {
    SET_PROP,
    SET_LOGGEDIN,
} from './actionTypes';

import initialState from './initialState';

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PROP:
            return { ...state, prop: action.data };
        case SET_LOGGEDIN:
            return { ...state, loggedIn: action.data };
        default:
            return state;
    }
}
