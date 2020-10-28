import {
    CREATE_DOC_START,
    CREATE_DOC_FAILURE,
    CREATE_DOC_SUCCESS,
    DELETE_DOC_START,
    DELETE_DOC_FAILURE,
    DELETE_DOC_SUCCESS
} from './actionTypes';

import initialState from './initialState';

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_DOC_START:
            return { ...state, isFetching: action.data };
        case CREATE_DOC_FAILURE:
            return { ...state, isFetching: action.data, error: action.data };
        case CREATE_DOC_SUCCESS:
            return { ...state, current_doc: action.data };
        case DELETE_DOC_START:
            return { ...state, isFetching: action.data };
        case DELETE_DOC_FAILURE:
            return { ...state, isFetching: action.data, error: action.data};
        case DELETE_DOC_SUCCESS:
                return { ...state, documents: action.data };
        default:
            return state;
    }
}
