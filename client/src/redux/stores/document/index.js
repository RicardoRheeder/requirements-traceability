import {
  CREATE_DOC_START,
  CREATE_DOC_FAILURE,
  CREATE_DOC_SUCCESS,
  DELETE_DOC_START,
  DELETE_DOC_FAILURE,
  DELETE_DOC_SUCCESS,
  FETCH_USER_DOCS_START,
  FETCH_USER_DOCS_SUCCESS,
  FETCH_USER_DOCS_FAILURE,
} from './actionTypes'

import initialState from './initialState'

export default (state = initialState, action) => {
  switch (action.type) {
    // create doc actions
    case CREATE_DOC_START:
      return { ...state, isFetching: true }
    case CREATE_DOC_FAILURE:
      return { ...state, isFetching: false, error: action.data }
    case CREATE_DOC_SUCCESS:
      return { ...state, isFetching: false, current_doc: action.data }
    // delete doc actions
    case DELETE_DOC_START:
      return { ...state, isFetching: true }
    case DELETE_DOC_FAILURE:
      return { ...state, isFetching: false, error: action.data }
    case DELETE_DOC_SUCCESS:
      return { ...state, isFetching: false, documents: action.data }
    // fetching user docs actions
    case FETCH_USER_DOCS_START:
      return { ...state, isFetching: true }
    case FETCH_USER_DOCS_SUCCESS:
      return { ...state, isFetching: false, documents: action.payload }
    case FETCH_USER_DOCS_FAILURE:
      return { ...state, isFetching: false, errorMessage: action.payload }
    default:
      return state
  }
}
