import {
  FETCH_USER_INFO_START,
  FETCH_USER_INFO_SUCCESS,
  FETCH_USER_INFO_FAILURE,
} from './actionTypes'

const axios = require('axios').default
const url = 'http://localhost:5000/users'

// fetching user information
export const fetchUserInfoStart = () => {
  return {
    type: FETCH_USER_INFO_START,
  }
}

export const fetchUserInfoSuccess = (info) => {
  return {
    type: FETCH_USER_INFO_SUCCESS,
    payload: info,
  }
}

export const fetchUserInfoFailure = (errorMessage) => {
  return {
    type: FETCH_USER_INFO_FAILURE,
    payload: errorMessage,
  }
}

export const fetchUserInfoAsync = (user) => {
  return (dispatch) => {
    dispatch(fetchUserInfoStart())
    // getting the user by the email if they exist otherwise creating a user
    axios
      .get(`${url}/get-by-email/${user.email}`)
      .then((info) => {
        if (info.data) {
          dispatch(fetchUserInfoSuccess(info.data))
        } else if (info.data === null) {
          // adding user since user does not already exist
          axios
            .post(`${url}/create-user`, {
              username: user.nickname,
              email: user.email,
            })
            .then((info) => dispatch(fetchUserInfoSuccess(info.data)))
            .catch((err) => dispatch(fetchUserInfoFailure(err)))
        }
      })
      .catch((err) => dispatch(fetchUserInfoFailure(err)))
  }
}
