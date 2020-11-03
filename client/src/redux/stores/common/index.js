import {
    SET_LOGGEDIN,
    UPDATE_TREEDATA,
    UPDATE_SELECTEDNODEID,
    SET_MODALOBJECT,
    SET_SELECTED_DOCUMENTPANEL_OBJECT
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
        case SET_SELECTED_DOCUMENTPANEL_OBJECT:
            return { ...state, selectedDocumentPanelObject: action.data };
        default:
            return state;
    }
}
