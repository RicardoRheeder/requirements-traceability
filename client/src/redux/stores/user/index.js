import {
  FETCH_USER_INFO_START,
  FETCH_USER_INFO_SUCCESS,
  FETCH_USER_INFO_FAILURE,
} from "./actionTypes";
import initialState from "./initialState";

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_INFO_START:
      return { ...state, loggedIn: action.data };
    case FETCH_USER_INFO_SUCCESS:
      return { ...state, treeData: action.data };
    case FETCH_USER_INFO_FAILURE:
      return { ...state, selectedID: action.data };
    default:
      return state;
  }
};
