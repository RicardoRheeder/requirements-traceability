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
  SEND_TREE_START,
  SEND_TREE_FAILURE,
  SEND_TREE_SUCCESS,
  SEND_REQ_START,
  SEND_REQ_FAILURE,
  SEND_REQ_SUCCESS,
  COMMIT_TREE_START,
  COMMIT_TREE_FAILURE,
  COMMIT_TREE_SUCCESS,
  FETCH_DOC_START,
  FETCH_DOC_FAILURE,
  FETCH_DOC_SUCCESS,
  SET_STATUSES_START,
  SET_STATUSES_SUCCESS,
  SET_STATUSES_FAILURE,
  GET_STATUSES_START,
  GET_STATUSES_FAILURE,
  GET_STATUSES_SUCCESS,
  SET_DOC_TITLE_START,
  SET_DOC_TITLE_FAILURE,
  SET_DOC_TITLE_SUCCESS,
  SET_CURRENT_DOC,
  FETCH_DOC_COLLABORATORS_START,
  FETCH_DOC_COLLABORATORS_SUCCESS,
  FETCH_DOC_COLLABORATORS_FAILURE,
  SET_FETCHED_TREE,
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
      return { ...state, isFetching: false, fetchedTree: action.data }

    // action for setting fetched tree
    case SET_FETCHED_TREE:
      return { ...state, fetchedTree: action.data }

    // sending tree actions
    case SEND_TREE_START:
      return { ...state, isFetching: true }
    case SEND_TREE_FAILURE:
      return { ...state, isFetching: false, error: action.data }
    case SEND_TREE_SUCCESS:
      return { ...state, isFetching: false, fetchedTree: action.data }

    // sending requirement actions
    case SEND_REQ_START:
      return { ...state, isFetching: true }
    case SEND_REQ_FAILURE:
      return { ...state, isFetching: false, error: action.data }
    case SEND_REQ_SUCCESS:
      return { ...state, isFetching: false, fetchedTree: action.data }

    // committing tree actions
    case COMMIT_TREE_START:
      return { ...state, isFetching: true }
    case COMMIT_TREE_FAILURE:
      return { ...state, isFetching: false, error: action.data }
    case COMMIT_TREE_SUCCESS:
      return { ...state, isFetching: false }
    // return { ...state, isFetching: false, current_doc: action.data }

    // Getting a single doc
    case FETCH_DOC_COLLABORATORS_START:
      return { ...state, isFetching: true }
    case FETCH_DOC_COLLABORATORS_FAILURE:
      return { ...state, isFetching: false, error: action.data }
    case FETCH_DOC_COLLABORATORS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        current_document_collaborators: action.data,
      }

    // Getting a doc collaborators
    case FETCH_DOC_START:
      return { ...state, isFetching: true }
    case FETCH_DOC_FAILURE:
      return { ...state, isFetching: false, error: action.data }
    case FETCH_DOC_SUCCESS:
      return {
        ...state,
        isFetching: false,
        current_doc: action.data,
      }

    // setting the current doc
    case SET_CURRENT_DOC:
      return { ...state, isFetching: false, current_doc: action.data }

    // Getting the statuses array for a document
    case GET_STATUSES_START:
      return { ...state, isFetching: true }
    case GET_STATUSES_FAILURE:
      return { ...state, isFetching: false, error: action.data }
    case GET_STATUSES_SUCCESS:
      return { ...state, isFetching: false, fetchedStatuses: action.data }

    // Setting the statuses array for a document
    case SET_STATUSES_START:
      return { ...state, isFetching: true }
    case SET_STATUSES_FAILURE:
      return { ...state, isFetching: false, error: action.data }
    case SET_STATUSES_SUCCESS:
      return { ...state, isFetching: false, success: action.data }

    // Setting the document title
    case SET_DOC_TITLE_START:
      return { ...state, isFetching: true }
    case SET_DOC_TITLE_FAILURE:
      return { ...state, isFetching: false, error: action.data }
    case SET_DOC_TITLE_SUCCESS:
      return { ...state, isFetching: false, success: action.data }

    default:
      return state
  }
}
