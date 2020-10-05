import {
    SET_PROP,
    SET_LOGGEDIN,
} from './actionTypes';

export const setProp = (data) => ({ type: SET_PROP, data });

export const setLoggedIn = (data) => ({ type: SET_LOGGEDIN, data });

