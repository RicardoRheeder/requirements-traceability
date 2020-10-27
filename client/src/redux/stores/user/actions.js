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

export const fetchUserInfoFailure = (addMessage) => {
  return {
    type: FETCH_USER_INFO_FAILURE,
    payload: addMessage,
  }
}

export const fetchUserInfoAsync = (user) => {
  // slicing the user id to remove "auth0|"
  const oldId = user.sub
  const newID = oldId.slice(6, oldId.length)

  return (dispatch) => {
    dispatch(fetchUserInfoStart())
    // getting the user if they exist otherwise creating a user
    axios
      .get(`${url}/get/${newID}`)
      .then((info) => {
        if (info.data) {
          dispatch(fetchUserInfoSuccess(info.data))
        } else if (info.data === null) {
          // adding user since user does not already exist
          axios
            .post(`${url}/create-user`, {
              _id: newID,
              username: user.nickname,
              email: user.email,
            })
            .then((res) => dispatch(fetchUserInfoSuccess(res)))
            .catch((err) => console.log(err))
        }
      })
      .catch((error) => {
        console.log('Error: ' + error)
      })
  }
}
