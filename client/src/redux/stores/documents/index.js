import {
    SEND_DOC_START,
    SEND_DOC_FAILURE,
    SEND_DOC_SUCCESS
} from './actionType';

import initialState from './initialState';

export default (state = initialState, action) => {
    switch (action.type) {
        case SEND_DOC_START:
            return { ...state, isFetching: action.data };
        case SEND_DOC_FAILURE:
            return { ...state, isFetching: action.data, error: action.data };
        case SEND_DOC_SUCCESS:
            return { ...state, current_doc: action_data };
        default:
            return state;
    }
}