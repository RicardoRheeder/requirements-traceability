import {
  CREATE_DOC_START,
  CREATE_DOC_FAILURE,
  CREATE_DOC_SUCCESS,
  DELETE_DOC_START,
  DELETE_DOC_FAILURE,
  DELETE_DOC_SUCCESS,
} from './actionTypes'

const axios = require('axios').default

const url = 'http://localhost:5000/documents'

/**
 * Function to start
 */
export const createDocStart = () => {
  return {
    type: CREATE_DOC_START,
  }
}

export const deleteDocStart = () => {
  return {
    type: DELETE_DOC_START,
  }
}

export const createDocSuccess = (doc) => {
  return {
    type: CREATE_DOC_SUCCESS,
    data: doc,
  }
}

export const deleteDocSuccess = (docs) => {
  return {
    type: DELETE_DOC_SUCCESS,
    data: docs,
  }
}

export const createDocFailure = (err) => {
  return {
    type: CREATE_DOC_SUCCESS,
    data: err,
  }
}

export const deleteDocFailure = (err) => {
  return {
    type: DELETE_DOC_FAILURE,
    data: err,
  }
}

export const createDocAsync = (doc) => {
  return (dispatch) => {
    dispatch(createDocStart())
    axios
      .post(`${url}/create-document`, { title: doc.title, admin: doc.admin })
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

export const deleteDocAsync = (doc) => {
  return (dispatch) => {
    dispatch(deleteDocStart())
    axios
      .delete(`${url}/delete/${doc.id}`, { user: doc.userID })
      .then((newList) => {
        dispatch(deleteDocSuccess(newList))
      })
      .catch((err) => {
        dispatch(deleteDocFailure(err))
      })
  }
}
