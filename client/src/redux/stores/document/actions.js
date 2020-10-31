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
} from './actionTypes'

const axios = require('axios').default

const url = 'http://localhost:5000'

// action to start creating doc
export const createDocStart = () => {
  return {
    type: CREATE_DOC_START,
  }
}
// action to start deleting doc
export const deleteDocStart = () => {
  return {
    type: DELETE_DOC_START,
  }
}
// action to finish making a doc
export const createDocSuccess = (doc) => {
  return {
    type: CREATE_DOC_SUCCESS,
    data: doc,
  }
}
// action to finish deleting doc
export const deleteDocSuccess = (docs) => {
  return {
    type: DELETE_DOC_SUCCESS,
    data: docs,
  }
}
// action when creating doc fails
export const createDocFailure = (err) => {
  return {
    type: CREATE_DOC_FAILURE,
    data: err,
  }
}
// action when deleting doc fails
export const deleteDocFailure = (err) => {
  return {
    type: DELETE_DOC_FAILURE,
    data: err,
  }
}
// action for async creating doc
export const createDocAsync = (doc) => {
  return (dispatch) => {
    dispatch(createDocStart())
    axios
      .post(`${url}/documents/create-document`, {
        title: doc.title,
        admin: doc.admin,
      })
      .then((doc) => {
        console.log(doc)
        dispatch(createDocSuccess(doc))
      })
      .catch((err) => {
        console.log(err)
        dispatch(createDocFailure(err))
      })
  }
}
// action for async deleting doc
export const deleteDocAsync = (doc) => {
  return (dispatch) => {
    dispatch(deleteDocStart())
    axios
      .delete(`${url}/documents/delete/${doc.id}`, { user: doc.userID })
      .then((newList) => {
        dispatch(deleteDocSuccess(newList))
      })
      .catch((err) => {
        dispatch(deleteDocFailure(err))
      })
  }
}

// Fetching user documents *********************************************************
export const fetchUserDocsStart = () => {
  return {
    type: FETCH_USER_DOCS_START,
  }
}
export const fetchUserDocsSuccess = (documents) => {
  return {
    type: FETCH_USER_DOCS_SUCCESS,
    payload: documents,
  }
}
export const fetchUserDocsFailure = (error) => {
  return {
    type: FETCH_USER_DOCS_FAILURE,
    payload: error,
  }
}

export const fetchUserDocsAsync = (user) => {
  console.log(user)
  return (dispatch) => {
    dispatch(fetchUserDocsStart())
    // getting user docs
    axios
      .get(`${url}/users/get/documents-with-email/${user.email}`)
      .then((docs) => dispatch(fetchUserDocsSuccess(docs.data)))
      .catch((err) => dispatch(fetchUserDocsFailure(err)))
  }
}
