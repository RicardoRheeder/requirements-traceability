import {
    SET_LOGGEDIN,
    UPDATE_TREEDATA,
} from './actionTypes';

export const setLoggedIn = (data) => ({ type: SET_LOGGEDIN, data });
export const updateDataTree = (data) => ({ type: UPDATE_TREEDATA, data });

