import {
  FETCH_USER_INFO_START,
  FETCH_USER_INFO_SUCCESS,
  FETCH_USER_INFO_FAILURE,
} from "./actionTypes";

const axios = require("axios").default;
const url = "http://localhost:5000/";

// fetching user information
export const fetchUserInfoStart = () => {
  return {
    type: actionTypes.FETCH_USER_INFO_START,
  };
};

export const fetchUserInfoSuccess = (info) => {
  return {
    type: actionTypes.FETCH_USER_INFO_SUCCESS,
    payload: info,
  };
};

export const fetchUserInfoFailure = (addMessage) => {
  return {
    type: actionTypes.FETCH_USER_INFO_FAILURE,
    payload: addMessage,
  };
};

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

// // user creation
// export const userCreationStart = () => {
//   return {
//     type: actionTypes.USER_CREATION_START,
//   };
// };

// export const userCreationSuccess = () => {
//   return {
//     type: actionTypes.USER_CREATION_SUCCESS,
//   };
// };

// export const userCreationFailure = () => {
//   return {
//     type: actionTypes.USER_CREATION_FAILURE,
//   };
// };
