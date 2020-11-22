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
  UPDATE_CURRENT_DOCUMENT,
  ADD_USER_TO_DOC_START,
  ADD_USER_TO_DOC_FAILURE,
  ADD_USER_TO_DOC_SUCCESS,
  GET_TREE_START,
  GET_TREE_FAILURE,
  GET_TREE_SUCCESS,
  SEND_DOC_START,
  SEND_DOC_FAILURE,
  SEND_DOC_SUCCESS,
  COMMIT_TREE_START,
  COMMIT_TREE_FAILURE,
  COMMIT_TREE_SUCCESS,
  FETCH_COLLABS_START,
  FETCH_COLLABS_FAILURE,
  FETCH_COLLABS_SUCCESS
} from './actionTypes'

const axios = require('axios').default

const url = 'http://localhost:5000'

// Create doc actions ***********************************************
// action to start creating doc
export const createDocStart = () => {
  return {
    type: CREATE_DOC_START,
  }
}

// action to finish making a doc
export const createDocSuccess = (doc) => {
  console.log(doc)
  return {
    type: CREATE_DOC_SUCCESS,
    data: doc.data.response,
  }
}

// action when creating doc fails
export const createDocFailure = (err) => {
  return {
    type: CREATE_DOC_FAILURE,
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

// Delete doc actions ***********************************************
// action to start deleting doc
export const deleteDocStart = () => {
  return {
    type: DELETE_DOC_START,
  }
}

// action to finish deleting doc
export const deleteDocSuccess = (docs) => {
  return {
    type: DELETE_DOC_SUCCESS,
    data: docs.data.response,
  }
}

// action when deleting doc fails
export const deleteDocFailure = (err) => {
  return {
    type: DELETE_DOC_FAILURE,
    data: err,
  }
}

// action for async deleting doc
export const deleteDocAsync = (doc) => {
  return (dispatch) => {
    console.log({ user: doc.user })
    dispatch(deleteDocStart())
    axios
      .delete(`${url}/documents/delete/${doc.id}`, { data: { user: doc.user } })
      .then((newList) => {
        dispatch(deleteDocSuccess(newList))
      })
      .catch((err) => {
        dispatch(deleteDocFailure(err))
      })
  }
}

// Fetching user documents *********************************************************
// action for fetching user docs start
export const fetchUserDocsStart = () => {
  return {
    type: FETCH_USER_DOCS_START,
  }
}

// action for fetching user docs success
export const fetchUserDocsSuccess = (documents) => {
  return {
    type: FETCH_USER_DOCS_SUCCESS,
    payload: documents,
  }
}

// action for when fetching user docs fails
export const fetchUserDocsFailure = (error) => {
  return {
    type: FETCH_USER_DOCS_FAILURE,
    payload: error,
  }
}

// async action for fetching user docs
export const fetchUserDocsAsync = (user) => {
  return (dispatch) => {
    dispatch(fetchUserDocsStart())
    // getting user docs
    axios
      .get(`${url}/users/get/documents-with-email/${user.email}`)
      .then((docs) => dispatch(fetchUserDocsSuccess(docs.data)))
      .catch((err) => dispatch(fetchUserDocsFailure(err)))
  }
}

export const updateCurrentDocument = (data) => ({
  type: UPDATE_CURRENT_DOCUMENT,
  data,
})
// Adding user to document ********************************************
// action to start adding a user to a doc
export const addUserToDocStart = () => {
  return {
    type: ADD_USER_TO_DOC_START,
  }
}

// action for adding user to a doc on success
export const addUserToDocSuccess = (doc) => {
  return {
    type: ADD_USER_TO_DOC_SUCCESS,
    data: doc,
  }
}

// action for adding user to a doc on failure
export const addUserToDocFailure = (error) => {
  return {
    type: ADD_USER_TO_DOC_FAILURE,
    data: error,
  }
}

// async action for adding user to a doc
export const addUserToDocAsync = (request) => {
  return (dispatch) => {
    dispatch(addUserToDocStart())
    // adding user to a document
    axios
      .patch(`${url}/documents/add-user/${request.documentID}`, {
        email: request.email,
        userId: request.userId,
      })
      .then((doc) => dispatch(addUserToDocSuccess(doc.data)))
      .catch((err) => dispatch(addUserToDocFailure(err)))
  }
}

// Getting tree from database ********************************************
// action to start getting the tree structure
export const getTreeStart = () => {
  return {
    type: GET_TREE_START,
  }
}

// action for getting tree on success
export const getTreeSuccess = (doc) => {
  console.log(doc)
  return {
    type: GET_TREE_SUCCESS,
    data: doc,
  }
}

// action for getting tree on failure
export const getTreeFailure = (error) => {
  return {
    type: GET_TREE_FAILURE,
    data: error,
  }
}

// async action for getting tree structure
export const getTreeAsync = (request) => {
  //console.log(request._id)
  return (dispatch) => {
    dispatch(getTreeStart())
    axios
      .get(`${url}/documents/get-tree/${request._id}`)
      .then((doc) => dispatch(getTreeSuccess(doc.data)))
      .catch((err) => dispatch(getTreeFailure(err)))
  }
}
// Committing tree to database *******************************
export const commitTreeStart = () => {
  return {
    type: COMMIT_TREE_START,
  }
}

export const commitTreeSuccess = (doc) => {
  return {
    type: COMMIT_TREE_SUCCESS,
    data: doc,
  }
}

export const commitTreeFailure = (err) => {
  return {
    type: COMMIT_TREE_FAILURE,
    data: err,
  }
}

export const commitTreeAsync = (doc, docID, versionName) => {
  return (dispatch) => {
    dispatch(commitTreeStart())
    axios
      .patch(`${url}/documents/commit-doc/${docID._id}`, {
        tree: doc.tree,
        name: versionName,
      })
      .then((doc) => {
        console.log(doc)
        dispatch(commitTreeSuccess(doc))
      })
      .catch((err) => {
        console.log(err)
        dispatch(commitTreeFailure(err))
      })
  }}

  //Getting collaborators for a document *************************
  // action to start the fetch of collaborators
  export const getCollabsStart = () => {
    return {
      type: FETCH_COLLABS_START,
    }
  }

  // action for getting collabs on failure
  export const getCollabsFailure = (error) => {
    return {
      type: FETCH_COLLABS_FAILURE,
      data: error.data.message,
    }
  }

  // action for getting collabs on success
  export const getCollabsSuccess = (collabs) => {
    return {
      type: FETCH_COLLABS_SUCCESS,
      data: collabs.data.response,
    }
  }

  // Get the collaborators asynchronously
  export const getCollabsAsync = (request) => {
    return (dispatch) => {
      dispatch(getCollabsStart())
      axios.get(`${url}/documents/get-collabs/${request._id}`)

      .then((collabs)=>dispatch(getCollabsSuccess(collabs)))
      .catch((error)=>dispatch(getCollabsFailure(error)))
    }
  }

