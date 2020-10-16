import {
    SET_LOGGEDIN,
    UPDATE_TREEDATA,
    UPDATE_SELECTEDNODEID,
} from './actionTypes';

export const setLoggedIn = (data) => ({ type: SET_LOGGEDIN, data });
export const updateDataTree = (data) => ({ type: UPDATE_TREEDATA, data });
export const updateSelectedNodeID = (data) => ({ type: UPDATE_SELECTEDNODEID, data });

