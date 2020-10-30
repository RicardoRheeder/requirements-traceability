import {
    SET_LOGGEDIN,
    UPDATE_TREEDATA,
    UPDATE_SELECTEDNODEID,
    SET_MODALOBJECT
} from './actionTypes';

import initialState from './initialState';

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGGEDIN:
            return { ...state, loggedIn: action.data };
        case UPDATE_TREEDATA:
            return { ...state, treeData: action.data };
        case UPDATE_SELECTEDNODEID:
            return { ...state, selectedID: action.data };
        case SET_MODALOBJECT:
            return { ...state, modalObject: action.data };
        default:
            return state;
    }
}
