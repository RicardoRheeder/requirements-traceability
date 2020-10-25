import { fetchUserPostsFailure } from "../../../../../../Wrist-Shot/frontend/src/redux/user/user.actions";
import userActionTypes from "./user.type";
const axios = require("axios").default;
const url = "http://localhost:5000/";

// this function will store user information when the user logs in, if the user does not already exist in the DB

// fetching user information
export const fetchUserInfoStart = () => {
  return {
    type: userActionTypes.FETCH_USER_INFO_START,
  };
};

export const fetchUserInfoSuccess = (info) => {
  return {
    type: userActionTypes.FETCH_USER_INFO_SUCCESS,
    payload: info,
  };
};

export const fetchUserInfoFailure = (addMessage) => {
  return {
    type: userActionTypes.FETCH_USER_INFO_FAILURE,
    payload: addMessage,
  };
};

// // user creation
// export const userCreationStart = () => {
//   return {
//     type: userActionTypes.USER_CREATION_START,
//   };
// };

// export const userCreationSuccess = () => {
//   return {
//     type: userActionTypes.USER_CREATION_SUCCESS,
//   };
// };

// export const userCreationFailure = () => {
//   return {
//     type: userActionTypes.USER_CREATION_FAILURE,
//   };
// };

export const fetchUserInfoAsync = (user) => {
  return (dispatch) => {
    dispatch(fetchUserInfoStart());
    axios
      .get(`${url}/users/get/${user.sub}`)
      .then((info) => dispatch(fetchUserInfoSuccess(info)))
      .catch((error) => {
        // adding user since user does not already exist
        axios
          .post(`${url}/users/create-user`, {
            userID: user.sub,
            username: user.nickname,
            email: user.email,
          })
          .then((res) => dispatch(fetchUserInfoSuccess(res)))
          .catch((err) => console.log("failed to create user."));
      });
  };
};
