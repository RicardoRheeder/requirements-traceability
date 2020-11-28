import {
  FETCH_USER_INFO_START,
  FETCH_USER_INFO_SUCCESS,
  FETCH_USER_INFO_FAILURE,
  FETCH_USER_RECENT_DOCS_START,
  FETCH_USER_RECENT_DOCS_SUCCESS,
  FETCH_USER_RECENT_DOCS_FAILURE,
  UPDATE_USER_RECENT_DOCS_START,
  UPDATE_USER_RECENT_DOCS_SUCCESS,
  UPDATE_USER_RECENT_DOCS_FAILURE,
} from './actionTypes'
import initialState from './initialState'

export default (state = initialState, action) => {
  switch (action.type) {
    // fetching user info actions
    case FETCH_USER_INFO_START:
      return { ...state, isFetching: true }
    case FETCH_USER_INFO_SUCCESS:
      return { ...state, isFetching: false, info: action.payload }
    case FETCH_USER_INFO_FAILURE:
      return { ...state, isFetching: false, errorMessage: action.payload }

    // fetching user recent docs actions
    case FETCH_USER_RECENT_DOCS_START:
      return { ...state, isFetching: true }
    case FETCH_USER_RECENT_DOCS_SUCCESS:
      return { ...state, isFetching: false, recent_docs: action.payload }
    case FETCH_USER_RECENT_DOCS_FAILURE:
      return { ...state, isFetching: false, errorMessage: action.payload }

    // fetching user recent docs actions
    case UPDATE_USER_RECENT_DOCS_START:
      return { ...state, isFetching: true }
    case UPDATE_USER_RECENT_DOCS_SUCCESS:
      return { ...state, isFetching: false }
    case UPDATE_USER_RECENT_DOCS_FAILURE:
      return { ...state, isFetching: false, errorMessage: action.payload }
    default:
      return state
  }
}
