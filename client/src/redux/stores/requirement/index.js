import {
    UPDATE_REQ_NAME_START,
    UPDATE_REQ_NAME_FAILURE,
    UPDATE_REQ_NAME_SUCCESS
} from './actionTypes';

import initialState from './initialState';

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_REQ_NAME_START:
            return { ...state, isFetching: action.data };
        case UPDATE_REQ_NAME_FAILURE:
            return { ...state, isFetching: action.data, error: action.data };
        case UPDATE_REQ_NAME_SUCCESS:
            return { ...state, current_doc: action.data };
        default:
            return state;
    }
}
