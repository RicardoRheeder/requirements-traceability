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
  UPDATE_CURRENT_DOCUMENT,
  ADD_USER_TO_DOC_START,
  ADD_USER_TO_DOC_FAILURE,
  ADD_USER_TO_DOC_SUCCESS,
  GET_TREE_START,
  GET_TREE_FAILURE,
  GET_TREE_SUCCESS,
  COMMIT_TREE_START,
  COMMIT_TREE_FAILURE,
  COMMIT_TREE_SUCCESS,
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
      return {
        ...state,
        isFetching: false,
        documents: [...state.documents, action.data],
      }

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
    case UPDATE_CURRENT_DOCUMENT:
      return { ...state, current_doc: action.data }

    // adding user to a document actions
    case ADD_USER_TO_DOC_START:
      return { ...state, isFetching: true }
    case ADD_USER_TO_DOC_FAILURE:
      return { ...state, isFetching: false, error: action.data }
    case ADD_USER_TO_DOC_SUCCESS:
      return { ...state, isFetching: false, success: action.data }

    // getting tree structure from database actions
    case GET_TREE_START:
      return { ...state, isFetching: true }
    case GET_TREE_FAILURE:
      return { ...state, isFetching: false, error: action.data }
    case GET_TREE_SUCCESS:
      return { ...state, isFetching: false, success: action.data }

    // committing tree actions
    case COMMIT_TREE_START:
      return { ...state, isFetching: true }
    case COMMIT_TREE_FAILURE:
      return { ...state, isFetching: false, error: action.data }
    case COMMIT_TREE_SUCCESS:
      return { ...state, isFetching: false }
    default:
      return state
  }
}
