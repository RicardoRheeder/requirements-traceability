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
  FETCH_USER_NOTIFICATIONS_START,
  FETCH_USER_NOTIFICATIONS_SUCCESS,
  FETCH_USER_NOTIFICATIONS_FAILURE,
  UPDATE_USER_NOTIFICATIONS_START,
  UPDATE_USER_NOTIFICATIONS_SUCCESS,
  UPDATE_USER_NOTIFICATIONS_FAILURE,
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
    payload: info.data.response,
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
    payload: errorMessage.data.message,
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
        if (info.data.response) {
          dispatch(fetchUserInfoSuccess(info))
        } else if (info.data.response === null) {
          // adding user since user does not already exist
          axios
            .post(`${url}/create-user`, {
              username: user.nickname,
              email: user.email,
            })
            .then((info) => dispatch(fetchUserInfoSuccess(info)))
            .catch((err) => dispatch(fetchUserInfoFailure(err)))
        }
      })
      .catch((err) => dispatch(fetchUserInfoFailure(err)))
  }
}

// Actions for fetching recent docs ***********************************
export const fetchUserRecentDocsStart = () => {
  return {
    type: FETCH_USER_RECENT_DOCS_START,
  }
}
export const fetchUserRecentDocsSuccess = (docs) => {
  return {
    type: FETCH_USER_RECENT_DOCS_SUCCESS,
    payload: docs.data.response,
  }
}
export const fetchUserRecentDocsFailure = (errorMessage) => {
  return {
    type: FETCH_USER_RECENT_DOCS_FAILURE,
    payload: errorMessage.data.message,
  }
}

export const fetchUserRecentDocsAsync = (user_email) => {
  return (dispatch) => {
    dispatch(fetchUserRecentDocsStart())
    // making a get request for recent docs
    axios
      .get(`${url}/get/recent-docs-with-email/${user_email}`)
      .then((docs) => dispatch(fetchUserRecentDocsSuccess(docs)))
      .catch((err) => dispatch(fetchUserRecentDocsFailure(err)))
  }
}

// Actions for updating recent docs ***********************************
export const UpdateUserRecentDocsStart = () => {
  return {
    type: UPDATE_USER_RECENT_DOCS_START,
  }
}
export const UpdateUserRecentDocsSuccess = (docs) => {
  return {
    type: UPDATE_USER_RECENT_DOCS_SUCCESS,
    payload: docs.data.response,
  }
}
export const UpdateUserRecentDocsFailure = (errorMessage) => {
  return {
    type: UPDATE_USER_RECENT_DOCS_FAILURE,
    payload: errorMessage.data.message,
  }
}

export const UpdateUserRecentDocsAsync = (user_email, doc_id) => {
  return (dispatch) => {
    dispatch(fetchUserRecentDocsStart())
    // making a get request for recent docs
    axios
      .patch(`${url}/update/recent-docs/${user_email}`, { id: doc_id })
      .then(() => dispatch(UpdateUserRecentDocsSuccess()))
      .catch((err) => dispatch(UpdateUserRecentDocsFailure(err)))
  }
}

// Actions for fetching notification docs ***********************************
export const fetchUserNotificationsStart = () => {
  return {
    type: FETCH_USER_NOTIFICATIONS_START,
  }
}
export const fetchUserNotificationsSuccess = (notifications) => {
  return {
    type: FETCH_USER_NOTIFICATIONS_SUCCESS,
    payload: notifications.data.response,
  }
}
export const fetchUserNotificationsFailure = (errorMessage) => {
  return {
    type: FETCH_USER_NOTIFICATIONS_FAILURE,
    payload: errorMessage.data.message,
  }
}

export const fetchUserNotificationsAsync = (user_email) => {
  return (dispatch) => {
    dispatch(fetchUserNotificationsStart())
    // making a get request for recent docs
    axios
      .get(`${url}/get/recent-notifications-with-email/${user_email}`)
      .then((notifications) =>
        dispatch(fetchUserNotificationsSuccess(notifications))
      )
      .catch((err) => dispatch(fetchUserNotificationsFailure(err)))
  }
}

// // Actions for updating notifications  ***********************************
export const UpdateUserNotificationsStart = () => {
  return {
    type: UPDATE_USER_NOTIFICATIONS_START,
  }
}
export const UpdateUserNotificationsSuccess = (notifications) => {
  return {
    type: UPDATE_USER_NOTIFICATIONS_SUCCESS,
    payload: notifications.data.response,
  }
}
export const UpdateUserNotificationsFailure = (errorMessage) => {
  return {
    type: UPDATE_USER_NOTIFICATIONS_FAILURE,
    payload: errorMessage.data.message,
  }
}

export const UpdateUserNotificationsAsync = (
  user_email,
  notificationString
) => {
  return (dispatch) => {
    dispatch(UpdateUserNotificationsStart())
    // making a get request for recent docs
    axios
      .patch(`${url}/update/recent-notifications/${user_email}`, {
        notificationString: notificationString,
      })
      .then((notifications) =>
        dispatch(UpdateUserNotificationsSuccess(notifications))
      )
      .catch((err) => dispatch(UpdateUserNotificationsFailure(err)))
  }
}
