import {
  FETCH_USER_INFO_START,
  FETCH_USER_INFO_SUCCESS,
  FETCH_USER_INFO_FAILURE,
} from './actionTypes'

const axios = require('axios').default
const url = 'http://localhost:5000/users'

/**
 * function to init the fetching of user info
 */
export const fetchUserInfoStart = () => {
  return {
    type: FETCH_USER_INFO_START,
  }
}

/**
 * function to be called when user info is successfully received
 * @param {object} info
 * @returns {object} type of action and the info as the payload
 */
export const fetchUserInfoSuccess = (info) => {
  return {
    type: FETCH_USER_INFO_SUCCESS,
    payload: info,
  }
}

/**
 * function to be called when user can't be received or created, probably due to an invalid request
 * @param {object} errorMessage
 * @returns {object} error message object
 */
export const fetchUserInfoFailure = (errorMessage) => {
  return {
    type: FETCH_USER_INFO_FAILURE,
    payload: errorMessage,
  }
}

/**
 * Async function that will get user info if they exist otherwise they will add the user to the DB
 * @param {object} user
 * @returns {object} info for the user (email, username, creation date, etc.)
 */
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
